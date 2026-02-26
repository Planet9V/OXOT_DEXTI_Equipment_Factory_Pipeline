/**
 * Script to find vendor variations for a given reference equipment.
 *
 * Usage:
 *   npx ts-node -T scripts/find_vendor_variations.ts [path/to/reference_equipment.json]
 */

import fs from 'fs';
import path from 'path';
import { DexpiAgent } from '../src/lib/agents/agent';
import type { VendorVariation } from '../src/lib/agents/types';

async function main() {
    const args = process.argv.slice(2);
    const filepath = args[0] || 'reference_equipment.json';

    if (!fs.existsSync(filepath)) {
        console.error(`Error: File not found: ${filepath}`);
        process.exit(1);
    }

    const referenceEquipment = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
    console.log(`Finding vendor variations for: ${referenceEquipment.displayName || referenceEquipment.tag}`);
    console.log('---');

    const apiKey = process.env.OPENROUTER_API_KEY;

    let variations: VendorVariation[] = [];

    if (apiKey) {
        console.log('Using DexpiAgent with OpenRouter...');
        const agent = new DexpiAgent();
        try {
            variations = await agent.findVendorVariations(referenceEquipment);
        } catch (error) {
            console.error('Error running findVendorVariations:', error);
            process.exit(1);
        }
    } else {
        console.warn('WARNING: OPENROUTER_API_KEY not set. Using mocked real-world data.');

        // Mocked real-world data based on manual research for Centrifugal Pump
        // Specs: 50 m3/h, 40m head, SS316
        variations = [
            {
                vendor: "Grundfos",
                model: "NB 50-200/219",
                referenceId: referenceEquipment.tag || "REF",
                description: "Single-stage, non-self-priming, centrifugal pump with axial suction port and radial discharge port.",
                differentiators: [
                    "High efficiency IE3/IE4 motor options",
                    "Back pull-out design for easy service",
                    "Optimized hydraulics for low NPSH"
                ],
                specifications: {
                    "Flow Rate": "Up to 100 m3/h",
                    "Head": "Up to 60 m",
                    "Max Pressure": "16 bar",
                    "Liquid Temp": "-25 to 140 degC"
                },
                documents: [
                    { "title": "Product Guide", "url": "https://product-selection.grundfos.com/us/products/nb-nbg/nb-50-200-219-98975924" }
                ]
            },
            {
                vendor: "KSB",
                model: "Etanorm 050-032-200",
                referenceId: referenceEquipment.tag || "REF",
                description: "Horizontal volute casing pump, single-stage, with ratings and main dimensions to EN 733.",
                differentiators: [
                    "Replaceable casing wear rings",
                    "Energy-efficient hydraulic system",
                    "Service-friendly design"
                ],
                specifications: {
                    "Flow Rate": "Up to 70 m3/h",
                    "Head": "Up to 55 m",
                    "Max Pressure": "16 bar",
                    "Material": "Stainless Steel 1.4408 (316)"
                },
                documents: [
                    { "title": "Datasheet", "url": "https://www.ksb.com/en-global/product/etanorm" }
                ]
            },
            {
                vendor: "Flowserve",
                model: "Durco Mark 3 ISO 50-32-200",
                referenceId: referenceEquipment.tag || "REF",
                description: "ISO 2858/5199 compliant chemical process pump designed for global applications.",
                differentiators: [
                    "Reverse Vane impeller for efficiency and low NPSHr",
                    "SealSentry seal chambers for extended seal life",
                    "Micrometer impeller adjustment"
                ],
                specifications: {
                    "Flow Rate": "Up to 80 m3/h",
                    "Head": "Up to 60 m",
                    "Max Pressure": "25 bar",
                    "Standard": "ISO 2858 / ISO 5199"
                },
                documents: [
                    { "title": "Brochure", "url": "https://www.flowserve.com/en/products/pumps/chemical-process-pumps/durco-mark-3-iso-chemical-process-pump/" }
                ]
            }
        ];
    }

    console.log(JSON.stringify(variations, null, 2));
}

main();
