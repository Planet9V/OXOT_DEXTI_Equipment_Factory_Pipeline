/**
 * Script to find real-world vendor variations for a given reference equipment JSON file.
 *
 * Usage:
 *   npx ts-node scripts/find_vendor_variations.ts [path/to/reference_equipment.json]
 */

import * as fs from 'fs';
import * as path from 'path';
import { DexpiAgent } from '../src/lib/agents/agent';
import { VendorVariation } from '../src/lib/agents/types';

async function main() {
    const args = process.argv.slice(2);
    const filePath = args[0] || 'reference_equipment.json';

    console.log(`Reading reference equipment from: ${filePath}`);

    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const referenceEquipment = JSON.parse(fileContent);

        console.log('Reference Equipment:', referenceEquipment.displayName || referenceEquipment.tag || 'Unknown');
        console.log('---');

        if (!process.env.OPENROUTER_API_KEY) {
            console.warn('WARNING: OPENROUTER_API_KEY is not set. Using mock response.');
            const mockVariations: VendorVariation[] = [
                {
                    vendor: "Grundfos",
                    model: "NB/NBGE Series",
                    referenceId: referenceEquipment.tag || "REF",
                    description: "End-suction close-coupled pumps for water supply and industrial applications.",
                    differentiators: [
                        "Optimized hydraulics for high efficiency",
                        "O-ring seal between pump housing and cover",
                        "Corrosion-resistant coating"
                    ],
                    specifications: {
                        "Max Flow": "1000 m3/h",
                        "Max Head": "150 m",
                        "Temperature Range": "-25 to 140 degC"
                    },
                    documents: [
                        { "title": "Product Guide", "url": "https://product-selection.grundfos.com" }
                    ]
                },
                {
                    vendor: "KSB",
                    model: "Etanorm",
                    referenceId: referenceEquipment.tag || "REF",
                    description: "Standardized water pump to EN 733 for reliable operation.",
                    differentiators: [
                        "Energy-saving impeller design",
                        "Large variety of materials available",
                        "Service-friendly design"
                    ],
                    specifications: {
                        "Max Flow": "660 m3/h",
                        "Max Head": "160 m",
                        "Temperature Range": "-30 to 140 degC"
                    },
                    documents: [
                        { "title": "Type Series Booklet", "url": "https://www.ksb.com" }
                    ]
                },
                {
                    vendor: "Sulzer",
                    model: "Ahlstar",
                    referenceId: referenceEquipment.tag || "REF",
                    description: "Process pump for demanding industrial applications.",
                    differentiators: [
                        "High reliability and efficiency",
                        "Low life cycle costs",
                        "Versatile sealing options"
                    ],
                    specifications: {
                        "Max Flow": "2000 m3/h",
                        "Max Head": "180 m",
                        "Temperature Range": "Up to 180 degC"
                    },
                    documents: [
                        { "title": "Brochure", "url": "https://www.sulzer.com" }
                    ]
                }
            ];
            console.log(JSON.stringify(mockVariations, null, 2));
            return;
        }

        console.log('Initializing DexpiAgent...');
        const agent = new DexpiAgent();

        console.log('Searching for vendor variations...');
        const variations = await agent.findVendorVariations(referenceEquipment);

        console.log(`Found ${variations.length} variations.`);
        console.log(JSON.stringify(variations, null, 2));

    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

main();
