/**
 * Script to verify the Procurement Officer persona and findVendorVariations method.
 *
 * Usage:
 *   npx ts-node -T scripts/test_vendor_variations.ts
 */

import { DexpiAgent } from '../src/lib/agents/agent';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
    console.log('Initializing DexpiAgent...');
    const agent = new DexpiAgent();

    // Check for API Key
    if (!process.env.OPENROUTER_API_KEY) {
        console.warn('\nWARNING: OPENROUTER_API_KEY is not set.');
        console.warn('The script will simulate the prompt construction but cannot call the API.\n');
    }

    // Load Real Reference Equipment (Process Pump)
    const registryPath = path.join(__dirname, '../src/lib/resources/dexpi-equipment-cards.json');
    let referenceEquipment;

    try {
        if (fs.existsSync(registryPath)) {
            const fileContent = fs.readFileSync(registryPath, 'utf-8');
            const equipmentList = JSON.parse(fileContent);
            // Find the specific pump used in the prompt example (Generic-PP-008)
            referenceEquipment = equipmentList.find((e: any) => e.tag === 'Generic-PP-008');

            if (!referenceEquipment) {
                 console.warn('Warning: Generic-PP-008 not found in registry. Using first item.');
                 referenceEquipment = equipmentList[0];
            }
        } else {
             console.error(`Error: Registry file not found at ${registryPath}`);
             process.exit(1);
        }
    } catch (error) {
        console.error('Error loading equipment registry:', error);
        process.exit(1);
    }

    console.log('Searching for vendor variations for:', referenceEquipment.displayName || referenceEquipment.name);
    console.log('Context (Reference Equipment):');
    console.log(JSON.stringify(referenceEquipment, null, 2));
    console.log('---');

    if (!process.env.OPENROUTER_API_KEY) {
        console.log('Skipping API call due to missing key.');
        return;
    }

    try {
        const variations = await agent.findVendorVariations(referenceEquipment);

        console.log(`Found ${variations.length} variations.`);
        console.log(JSON.stringify(variations, null, 2));

        if (variations.length > 0) {
             console.log('\nSUCCESS: Vendor variations found.');
        } else {
             console.log('\nWARNING: No variations found (or JSON parsing failed). Check agent output.');
        }

    } catch (error) {
        console.error('Error running findVendorVariations:', error);
    }
}

main();
