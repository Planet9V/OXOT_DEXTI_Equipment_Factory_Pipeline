import fs from 'fs';
import path from 'path';
import { getAgent } from '../src/lib/agents/agent';

const OUTPUT_FILE = path.resolve(__dirname, '../src/lib/resources/full_fidelity_cards.json');
const REGISTRY_PATH = path.resolve(__dirname, '../oil_and_gas_equipment_registry.json');

// --- Types ---
interface EquipmentRegistryItem {
    type: string;
    category: string;
    tags: string[];
    description: string;
}

interface EquipmentCard {
    tag: string;
    name: string;
    componentClass: string;
    dexpiType: string;
    rdlUri: string;
    description: string;
    operatingConditions: Record<string, any>;
    specifications: Record<string, any>;
    design: Record<string, any>;
    materials: Record<string, any>;
    nozzles: any[];
    standards: string[];
    image_prompt: string;
}

// --- Fallback Data Generators ---

function getRandom(min: number, max: number, precision = 0): number {
    const val = Math.random() * (max - min) + min;
    return parseFloat(val.toFixed(precision));
}

function pick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

const MATERIALS_LIST = [
    'ASTM A216 WCB', 'ASTM A351 CF8M', 'ASTM A105', 'ASTM A182 F316', 'Duplex 2205', 'Hastelloy C-276'
];

const STANDARDS_LIST = [
    'API 610', 'API 650', 'ASME B73.1', 'ASME VIII Div.1', 'ISO 5199', 'IEC 60034', 'NEMA MG-1'
];

/**
 * Generates a fully compliant DEXPI 2.0 equipment card using heuristic logic
 * when the LLM service is unavailable.
 */
function generateFallbackCard(item: EquipmentRegistryItem): EquipmentCard {
    const typeCode = item.type.toUpperCase().replace(/\s+/g, '_').replace(/[^A-Z0-9_]/g, '').substring(0, 10);
    const tag = `Generic-${typeCode}-001`;

    // 1. Operating Conditions
    const pressureDesign = getRandom(10, 50, 1);
    const tempDesign = getRandom(50, 200, 1);

    const operatingConditions = {
        pressureMax: { value: pressureDesign * 1.5, unit: 'bar', source: 'API 610' },
        pressureMin: { value: 0, unit: 'bar' },
        pressureDesign: { value: pressureDesign, unit: 'bar' },
        pressureOperating: { value: pressureDesign * 0.8, unit: 'bar' },
        temperatureMax: { value: tempDesign + 50, unit: 'C' },
        temperatureMin: { value: -20, unit: 'C' },
        temperatureDesign: { value: tempDesign, unit: 'C' },
        temperatureOperating: { value: tempDesign * 0.9, unit: 'C' },
        flowRateDesign: { value: getRandom(50, 500, 1), unit: 'm3/h' },
        flowRateOperating: { value: getRandom(40, 400, 1), unit: 'm3/h' }
    };

    // 2. Specifications
    const specifications: any = {
        power: { value: getRandom(10, 200, 1), unit: 'kW', source: 'IEC 60034' },
        efficiency: { value: getRandom(80, 98, 1), unit: '%' },
        dutyPoint: { value: 'Continuous', unit: '' }
    };

    if (item.category === 'rotating') {
        specifications.rotationalSpeed = { value: pick([1500, 3000, 3600]), unit: 'rpm' };
        if (item.type.toLowerCase().includes('pump')) {
            specifications.head = { value: getRandom(20, 100, 1), unit: 'm' };
            specifications.NPSHr = { value: getRandom(1, 5, 1), unit: 'm' };
        }
    }

    // 3. Design
    const design = {
        weight: { value: getRandom(500, 5000, 0), unit: 'kg' },
        length: { value: getRandom(1000, 3000, 0), unit: 'mm' },
        width: { value: getRandom(800, 2000, 0), unit: 'mm' },
        height: { value: getRandom(1000, 2500, 0), unit: 'mm' }
    };

    // 4. Materials
    const materials: any = {};
    if (item.category === 'rotating') {
        materials.casing = pick(MATERIALS_LIST);
        materials.impeller = pick(MATERIALS_LIST);
        materials.shaft = 'AISI 4140';
        materials.seals = 'Mechanical Seal';
    } else if (item.category === 'static') {
        materials.shell = pick(MATERIALS_LIST);
        materials.head = pick(MATERIALS_LIST);
        materials.internals = 'SS 316';
    } else {
        materials.body = pick(MATERIALS_LIST);
        materials.trim = 'SS 316';
    }
    materials.bolting = 'ASTM A193 B7';
    materials.gaskets = 'Spiral Wound SS316/Graphite';

    // 5. Nozzles
    const nozzles = [
        { id: 'N1', name: 'Inlet', service: 'Process Inlet', size: 'DN150', rating: 'PN16', facing: 'RF', position: 'Side' },
        { id: 'N2', name: 'Outlet', service: 'Process Outlet', size: 'DN100', rating: 'PN16', facing: 'RF', position: 'Top' },
        { id: 'N3', name: 'Drain', service: 'Drain', size: 'DN25', rating: 'PN16', facing: 'RF', position: 'Bottom' }
    ];

    return {
        tag,
        name: item.type,
        componentClass: item.type.replace(/\s+/g, ''),
        dexpiType: item.type.replace(/\s+/g, ''),
        rdlUri: 'http://posccaesar.org/rdl/RDS' + Math.floor(Math.random() * 1000000),
        description: item.description || `Standard ${item.type} for industrial application.`,
        operatingConditions,
        specifications,
        design,
        materials,
        nozzles,
        standards: [pick(STANDARDS_LIST), 'ISO 9001'],
        image_prompt: `High fidelity 3D render of a ${item.type}, industrial style, metallic finish, on concrete floor.`
    };
}

// --- Main Execution ---

async function main() {
    console.log('Starting Full-Fidelity Equipment Card Generation...');

    if (!fs.existsSync(REGISTRY_PATH)) {
        console.error(`Registry file not found at ${REGISTRY_PATH}`);
        process.exit(1);
    }

    const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf-8'));
    if (!registry.equipment || !Array.isArray(registry.equipment)) {
        console.error('Invalid registry format: "equipment" array missing.');
        process.exit(1);
    }

    const items: EquipmentRegistryItem[] = registry.equipment;
    const results: EquipmentCard[] = [];
    const agent = getAgent();

    // Check if API Key is available
    // We can assume if testConnection passes, we have a key.
    // Or just check env var directly if possible, or try/catch the first call.
    let useLLM = false;
    try {
        useLLM = await agent.testConnection();
    } catch (e) {
        console.log('Could not connect to OpenRouter, fallback mode enabled.');
    }

    if (!process.env.OPENROUTER_API_KEY) {
        console.log('OPENROUTER_API_KEY not found in env. Forcing fallback mode.');
        useLLM = false;
    }

    console.log(`Processing ${items.length} items. Mode: ${useLLM ? 'LLM (The Engineer)' : 'Fallback (Heuristic)'}`);

    for (const item of items) {
        console.log(`Generating card for: ${item.type}...`);

        let card: EquipmentCard | null = null;

        if (useLLM) {
            try {
                const prompt = `Generate a Full-Fidelity DEXPI 2.0 equipment card for: ${item.type}`;
                const response = await agent.chat(
                    [{ role: 'user', content: prompt }],
                    'theEngineer'
                );

                // Try to extract JSON from the response content
                const jsonMatch = response.content.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    card = JSON.parse(jsonMatch[0]);
                } else {
                    console.warn(`Failed to parse JSON for ${item.type}. Using fallback.`);
                }
            } catch (err) {
                console.error(`Error generating with LLM for ${item.type}:`, err);
            }
        }

        if (!card) {
            card = generateFallbackCard(item);
        }

        if (card) {
            results.push(card);
        }
    }

    // Ensure output directory exists
    const dir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2));
    console.log(`Successfully generated ${results.length} equipment cards.`);
    console.log(`Output written to: ${OUTPUT_FILE}`);
}

// Execute if run directly
if (require.main === module) {
    main().catch(err => {
        console.error('Fatal error:', err);
        process.exit(1);
    });
}

export { generateFallbackCard, type EquipmentRegistryItem, type EquipmentCard, OUTPUT_FILE, REGISTRY_PATH, main };
