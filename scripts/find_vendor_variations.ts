/**
 * Script to find vendor variations for a given reference equipment JSON file.
 *
 * Usage:
 *   npx ts-node -T scripts/find_vendor_variations.ts [path/to/reference_equipment.json]
 */

import { DexpiAgent } from '../src/lib/agents/agent';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
    // Get file path from args or default
    const args = process.argv.slice(2);
    const filePath = args[0] || 'reference_equipment.json';

    console.log(`Reading reference equipment from: ${filePath}`);

    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const referenceEquipment = JSON.parse(fileContent);

        console.log('Initializing DexpiAgent...');
        const agent = new DexpiAgent();

        console.log('Searching for vendor variations...');
        console.log('---');

        // Check for API Key
        if (!process.env.OPENROUTER_API_KEY) {
             console.log("WARNING: OPENROUTER_API_KEY is not set. Using mocked data for demonstration.");

             // Mock data if no key is present (for environment where keys are restricted)
             // Only return pump mocks if the input is actually a pump
             if (!referenceEquipment.componentClass?.toLowerCase().includes('pump')) {
                 console.log("No mock data available for this equipment type.");
                 return;
             }

             const mockedVariations = [
                  {
                    "vendor": "Grundfos",
                    "model": "CR 45-3",
                    "referenceId": referenceEquipment.tag || "P-1001",
                    "description": "Vertical multistage centrifugal pump designed for industrial water supply and pressure boosting.",
                    "differentiators": [
                      "High-efficiency IE5 motor",
                      "Laser-welded impellers for durability",
                      "Available with various seal options"
                    ],
                    "specifications": {
                      "Flow Rate": "45 m3/h",
                      "Head": "60 m",
                      "Max Pressure": "25 bar"
                    },
                    "documents": [
                      { "title": "Datasheet", "url": "https://product-selection.grundfos.com/us/products/cr/cr-45" },
                      { "title": "Manual", "url": "https://net.grundfos.com/qr/i/96531589" }
                    ]
                  },
                  {
                    "vendor": "KSB",
                    "model": "MegaCPK",
                    "referenceId": referenceEquipment.tag || "P-1001",
                    "description": "Standardized chemical pump for aggressive organic and inorganic fluids.",
                    "differentiators": [
                      "Energy-saving hydraulic system",
                      "Modular design for easy maintenance",
                      "ATEX-compliant versions available"
                    ],
                    "specifications": {
                      "Flow Rate": "55 m3/h",
                      "Head": "42 m",
                      "Temperature Range": "-40 to +400 degC"
                    },
                    "documents": [
                      { "title": "Datasheet", "url": "https://www.ksb.com/en-global/products/pumps/centrifugal-pumps/megacpk" },
                      { "title": "Operating Manual", "url": "https://www.ksb.com/en-global/download/file/12345" }
                    ]
                  },
                  {
                    "vendor": "Flowserve",
                    "model": "Durco Mark 3",
                    "referenceId": referenceEquipment.tag || "P-1001",
                    "description": "ASME B73.1 chemical process pump recognized worldwide for durability.",
                    "differentiators": [
                      "SealSentry seal chamber technology",
                      "Reverse vane impeller for efficiency",
                      "Micrometer impeller adjustment"
                    ],
                    "specifications": {
                      "Flow Rate": "60 m3/h",
                      "Head": "45 m",
                      "Design Pressure": "18 bar"
                    },
                    "documents": [
                      { "title": "Brochure", "url": "https://www.flowserve.com/sites/default/files/2016-10/fpd-100-ea4.pdf" },
                      { "title": "User Instructions", "url": "https://www.flowserve.com/sites/default/files/2020-02/fpd-1100-en.pdf" }
                    ]
                  }
             ];

             console.log(`Found ${mockedVariations.length} variations (MOCKED).`);
             console.log(JSON.stringify(mockedVariations, null, 2));
             return;
        }

        const variations = await agent.findVendorVariations(referenceEquipment);

        console.log(`Found ${variations.length} variations.`);
        console.log(JSON.stringify(variations, null, 2));

        if (variations.length > 0) {
             console.log('\nSUCCESS: Vendor variations found.');
        } else {
             console.log('\nWARNING: No variations found.');
        }

    } catch (error) {
        console.error('Error:', error instanceof Error ? error.message : String(error));
        process.exit(1);
    }
}

main();
