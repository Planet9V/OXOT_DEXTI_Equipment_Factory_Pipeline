/**
 * Script to verify the Procurement Officer persona and findVendorVariations method.
 *
 * Usage:
 *   npx ts-node -T scripts/test_vendor_variations.ts
 */

import { DexpiAgent } from '../src/lib/agents/agent';

async function main() {
    console.log('Initializing DexpiAgent...');
    const agent = new DexpiAgent();

    // Dummy Reference Equipment (Centrifugal Pump)
    const referenceEquipment = {
        tag: 'P-1001',
        componentClass: 'Centrifugal Pump',
        componentClassURI: 'http://data.posccaesar.org/rdl/RDS123456',
        displayName: 'Feed Water Pump',
        category: 'Rotating Equipment',
        specifications: {
            'Design Pressure': '10 bar',
            'Design Temperature': '60 degC',
            'Flow Rate': '50 m3/h',
            'Head': '40 m',
            'Material': 'Stainless Steel 316'
        },
        facility: 'FAC-01'
    };

    console.log('Searching for vendor variations for:', referenceEquipment.displayName);
    console.log('---');

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
