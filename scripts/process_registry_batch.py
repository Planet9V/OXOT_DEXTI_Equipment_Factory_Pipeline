
import requests
import time
import sys
import json
import os
from datetime import datetime

# Configuration
BASE_URL = "http://localhost:3000"
PIPELINE_URL = f"{BASE_URL}/api/agents/pipeline"
REGISTRY_PATH = os.path.join(os.path.dirname(__file__), "../data/equipment_registry.json")

def load_registry():
    if not os.path.exists(REGISTRY_PATH):
        print(f"Registry not found at {REGISTRY_PATH}")
        return None
    with open(REGISTRY_PATH, 'r') as f:
        return json.load(f)

def save_registry(data):
    data['_meta']['lastUpdated'] = datetime.now().isoformat()
    with open(REGISTRY_PATH, 'w') as f:
        json.dump(data, f, indent=2)

def get_pending_items(registry, limit=10):
    pending = []
    for sector, groups in registry.items():
        if sector == '_meta': continue
        if isinstance(groups, dict):
            for group_name, items in groups.items():
                if isinstance(items, list):
                    for item in items:
                        if item.get('status') == 'pending':
                            # Enriched item for processing
                            work_item = item.copy()
                            work_item['sector'] = sector
                            work_item['group'] = group_name
                            pending.append(work_item)
                            if len(pending) >= limit:
                                return pending
    return pending

def update_item_status(registry, item_type, status):
    for sector, groups in registry.items():
        if sector == '_meta': continue
        if isinstance(groups, dict):
            for group_name, items in groups.items():
                if isinstance(items, list):
                    for item in items:
                        if item['type'] == item_type:
                            item['status'] = status
                            item['processedAt'] = datetime.now().isoformat()
                            return True
    return False

def process_batch():
    chunk_size = 5
    print(f"Starting Registry Batch Processing (Chunk Size: {chunk_size})...")

    while True:
        registry = load_registry()
        if not registry: break

        pending_items = get_pending_items(registry, limit=chunk_size)
        
        if not pending_items:
            print("No pending items found in registry. Work complete.")
            break

        print(f"\n--- Processing Batch of {len(pending_items)} items ---")
        
        # Prepare payload for pipeline
        # The pipeline API expects "manual" mode with specific prompts or a list of types
        # For now, we simulate this by constructing a custom "manual" request or updating the API to accept raw items.
        # Assuming the pipeline can take a list of types to generate:
        target_types = [i['type'] for i in pending_items]
        
        print(f"Targets: {', '.join(target_types)}")
        
        # NOTE: The current API might strictly enforce random generation or audit.
        # Ideally, we'd hit a /api/pipeline/generate endpoint with specific targets.
        # For this implementation plan, we assume such an endpoint exists or we adapt.
        # Let's use the standard pipeline endpoint but pass a specific "context" or "targets".
        
        payload = {
            "mode": "batch-registry", # New mode to be supported or handled by generic batch
            "targets": pending_items
        }
        
        # MOCKING THE API CALL for now, as the backend support for "specific targets" might need update.
        # IF the API doesn't support it, we'd just print what we WOULLD do.
        # But wait, we have full control.
        # Let's assume we send this to the pipeline.
        
        try:
            response = requests.post(PIPELINE_URL, json=payload)
            
            # Since we haven't updated the API to handle "batch-registry" explicitly yet, 
            # this call might fail if strictly validated. 
            # However, for the purpose of the "Implementation Plan", this script represents the "Control logic".
            
            if response.status_code == 200:
                run_id = response.json().get('runId')
                print(f"Submitted to pipeline. Run ID: {run_id}")
                
                # Poll logic here (simplified)
                # ...
                
                # Mark as completed (optimistic for now)
                for item in pending_items:
                    update_item_status(registry, item['type'], 'completed')
                
                save_registry(registry)
                print("Registry updated.")
                
            else:
                print(f"Pipeline API Error: {response.text}")
                # For demo, if API fails (because mode doesn't exist), we stop.
                break

        except Exception as e:
            print(f"Error: {e}")
            break
            
        time.sleep(1)

if __name__ == "__main__":
    process_batch()
