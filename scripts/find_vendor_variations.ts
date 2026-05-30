/**
 * Script to find real-world vendor variations for a given reference equipment JSON file.
 * This script uses the 'procurementOfficer' persona to find models.
 *
 * Usage:
 *   npx ts-node -T scripts/find_vendor_variations.ts <path_to_reference_equipment.json>
 */

import { DexpiAgent } from '../src/lib/agents/agent';
import { readFileSync } from 'fs';
import path from 'path';

async function main() {
    const args = process.argv.slice(2);
    if (args.length !== 1) {
        console.error('Usage: npx ts-node -T scripts/find_vendor_variations.ts <path_to_reference_equipment.json>');
        process.exit(1);
    }

    const filepath = args[0];
    const absolutePath = path.resolve(process.cwd(), filepath);

    try {
        console.log(`Reading reference equipment from: ${absolutePath}`);
        const content = readFileSync(absolutePath, 'utf8');
        const referenceEquipment = JSON.parse(content);

        console.log('--- Reference Equipment ---');
        console.log(`Tag: ${referenceEquipment.tag || 'N/A'}`);
        console.log(`Class: ${referenceEquipment.componentClass || 'N/A'}`);
        console.log('---------------------------');

        console.log('Initializing DexpiAgent...');
        const agent = new DexpiAgent();

        console.log('Searching for vendor variations (this may take a moment)...');
        const variations = await agent.findVendorVariations(referenceEquipment);

        console.log('\n--- Vendor Variations ---');
        if (variations.length === 0) {
            console.log('No variations found. Check if OPENROUTER_API_KEY is set and valid.');
        } else {
            console.log(JSON.stringify(variations, null, 2));
        }

    } catch (error) {
        console.error('Error:', error instanceof Error ? error.message : String(error));
        process.exit(1);
    }
}

main();
