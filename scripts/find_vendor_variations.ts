/**
 * Script to find real-world vendor variations for a reference equipment.
 *
 * Usage:
 *   npx ts-node -T scripts/find_vendor_variations.ts [path/to/reference_equipment.json]
 *
 * If no file is provided, uses a default example.
 * If OPENROUTER_API_KEY is missing, mocks the response for demonstration.
 */

import * as fs from 'fs';
import * as path from 'path';
import { DexpiAgent } from '../src/lib/agents/agent';
import { VendorVariation } from '../src/lib/agents/types';

// Mock data for fallback
const MOCK_VARIATIONS: VendorVariation[] = [
    {
        vendor: "Siemens",
        model: "Simotics SD",
        referenceId: "P-1001",
        description: "Severe Duty motor for aggressive environments.",
        differentiators: [
            "Cast Iron Frame",
            "IE4 Super Premium Efficiency",
            "IP55 Protection"
        ],
        specifications: {
            "Power": "45 kW",
            "Speed": "2975 rpm",
            "Voltage": "400 V"
        },
        documents: [
            { "title": "Datasheet", "url": "https://www.siemens.com/global/en/products/drives/motors/low-voltage-motors/severe-duty-motors.html" },
            { "title": "Manual", "url": "https://cache.industry.siemens.com/dl/files/466/109782466/att_1034479/v1/A5E50269382A_AA_001_en-US.pdf" }
        ]
    },
    {
        vendor: "ABB",
        model: "M3BP Process Performance",
        referenceId: "P-1001",
        description: "Process performance cast iron motor for continuous duty.",
        differentiators: [
            "Robust design for harsh conditions",
            "High reliability",
            "Global support network"
        ],
        specifications: {
            "Power": "45 kW",
            "Frame Size": "225",
            "Efficiency": "IE3"
        },
        documents: [
            { "title": "Product Page", "url": "https://new.abb.com/motors-generators/iec-low-voltage-motors/process-performance-motors" }
        ]
    },
    {
        vendor: "WEG",
        model: "W22 Super Premium",
        referenceId: "P-1001",
        description: "High efficiency motor exceeding IE4 levels.",
        differentiators: [
            "WISE insulation system",
            "Low noise levels",
            "Reduced operating temperature"
        ],
        specifications: {
            "Power": "45 kW",
            "Mounting": "B3",
            "Cooling": "IC411"
        },
        documents: [
            { "title": "Catalog", "url": "https://static.weg.net/medias/downloadcenter/h60/h15/WEG-w22-electric-motor-technical-catalog-market-50039989-catalogue-english.pdf" }
        ]
    }
];

async function main() {
    const args = process.argv.slice(2);
    let referenceEquipment: Record<string, unknown>;

    if (args.length > 0) {
        const filePath = args[0];
        try {
            const absolutePath = path.resolve(process.cwd(), filePath);
            const fileContent = fs.readFileSync(absolutePath, 'utf-8');
            referenceEquipment = JSON.parse(fileContent);
            console.log(`Loaded reference equipment from ${filePath}`);
        } catch (error) {
            console.error(`Error reading file ${filePath}:`, error);
            process.exit(1);
        }
    } else {
        console.log('No file provided. Using default example (Centrifugal Pump).');
        referenceEquipment = {
            tag: 'P-1001',
            componentClass: 'Centrifugal Pump',
            displayName: 'Feed Water Pump',
            specifications: {
                'Design Pressure': '10 bar',
                'Flow Rate': '50 m3/h',
                'Head': '40 m'
            },
            facility: 'FAC-01'
        };
    }

    console.log('--- Reference Equipment ---');
    console.log(JSON.stringify(referenceEquipment, null, 2));
    console.log('---------------------------\n');

    const agent = new DexpiAgent();

    // Check for API Key
    if (!process.env.OPENROUTER_API_KEY) {
        console.warn('WARNING: OPENROUTER_API_KEY not found in environment.');
        console.warn('Running in DEMO mode with mock data.\n');

        // Mock the findVendorVariations method for demo
        agent.findVendorVariations = async () => {
            console.log('(Mocking API call to find vendor variations...)');
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
            return MOCK_VARIATIONS;
        };
    } else {
        console.log('Connecting to OpenRouter API...');
    }

    try {
        console.log('Searching for vendor variations...');
        const variations = await agent.findVendorVariations(referenceEquipment);

        console.log('\n--- Vendor Variations Found ---');
        console.log(JSON.stringify(variations, null, 2));
        console.log('-------------------------------');

    } catch (error) {
        console.error('Error finding vendor variations:', error);
    }
}

main();
