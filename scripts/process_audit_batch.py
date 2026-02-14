
import requests
import time
import sys
import json

BASE_URL = "http://localhost:3000"
API_URL = f"{BASE_URL}/api/admin/batch-audit"
PIPELINE_URL = f"{BASE_URL}/api/agents/pipeline"
CHUNK_SIZE = 10  # Process 10 items at a time
START_OFFSET = 0

def process_batch():
    offset = START_OFFSET
    total_processed = 0

    print(f"Starting batch processing with chunk size {CHUNK_SIZE}...")

    while True:
        print(f"\n--- Batch Payload: Offset {offset}, Limit {CHUNK_SIZE} ---")
        
        # 1. Trigger Batch
        try:
            response = requests.post(API_URL, json={"offset": offset, "limit": CHUNK_SIZE})
            if response.status_code != 200:
                print(f"Error triggering batch: {response.text}")
                break
            
            data = response.json()
            
            if data.get("count", 0) == 0:
                print("No more items to process. Work complete.")
                break
            
            run_id = data.get("runId")
            items = data.get("items", [])
            print(f"Batch submitted. Run ID: {run_id}")
            print(f"Processing {len(items)} items: {', '.join(items[:3])}...")

            # 2. Poll for Completion
            while True:
                status_res = requests.get(f"{PIPELINE_URL}?runId={run_id}")
                if status_res.status_code != 200:
                    print(f"Error checking status: {status_res.text}")
                    time.sleep(5)
                    continue
                
                status_data = status_res.json()
                run_status = status_data.get("run", {}).get("status")
                results = status_data.get("run", {}).get("results", {})
                
                sys.stdout.write(f"\rStatus: {run_status} | Generated: {results.get('generated')} | Written: {results.get('written')}")
                sys.stdout.flush()

                if run_status in ["completed", "failed", "cancelled"]:
                    print(f"\nBatch finished with status: {run_status}")
                    break
                
                time.sleep(2) # Poll every 2 seconds

            offset += CHUNK_SIZE
            total_processed += len(items)
            
            # Rate limit safety buffer
            print("Cooling down for 2 seconds...")
            time.sleep(2)

        except Exception as e:
            print(f"\nException occurred: {e}")
            break

    print(f"\nTotal items processed: {total_processed}")

if __name__ == "__main__":
    process_batch()
