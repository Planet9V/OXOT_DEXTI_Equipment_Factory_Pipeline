
import fs from 'fs';
import path from 'path';
import { getAgent } from '../src/lib/agents/agent';
import { ChatMessage } from '../src/lib/agents/types';

// Configuration
const BATCH_SIZE = 5;
const INPUT_REGISTRY_PATH = path.join(process.cwd(), 'oil_and_gas_equipment_registry.json');
const OUTPUT_FILE_PATH = path.join(process.cwd(), 'src/lib/resources/dexpi_equipment_cards.json');

// Ensure output directory exists
const outputDir = path.dirname(OUTPUT_FILE_PATH);
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

interface RegistryItem {
    type: string;
    category: string;
    tags: string[];
    description: string;
}

interface Registry {
    sector: string;
    subSector: string;
    equipment: RegistryItem[];
}

async function generateCards() {
    console.log('Starting Full-Fidelity DEXPI 2.0 Card Generation...');

    // 1. Read Registry
    if (!fs.existsSync(INPUT_REGISTRY_PATH)) {
        console.error(`Registry file not found at: ${INPUT_REGISTRY_PATH}`);
        process.exit(1);
    }

    const registryData = fs.readFileSync(INPUT_REGISTRY_PATH, 'utf-8');
    const registry: Registry = JSON.parse(registryData);
    const equipmentList = registry.equipment.map(item => item.type);

    console.log(`Found ${equipmentList.length} equipment types in registry.`);

    const agent = getAgent();
    const allCards: any[] = [];

    // 2. Process in Batches
    for (let i = 0; i < equipmentList.length; i += BATCH_SIZE) {
        const batch = equipmentList.slice(i, i + BATCH_SIZE);
        console.log(`Processing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(equipmentList.length / BATCH_SIZE)}: ${batch.join(', ')}`);

        const userMessage = `Generate Full-Fidelity DEXPI 2.0 equipment cards for the following list of equipment types:
${JSON.stringify(batch)}

Ensure compliance with the schema and constraints defined in your system prompt.`;

        try {
            let cards: any[] = [];

            if (process.env.OPENROUTER_API_KEY) {
                const response = await agent.chat(
                    [{ role: 'user', content: userMessage }],
                    'theEngineer'
                );

                const content = response.content;
                // Attempt to extract JSON from the response
                const jsonMatch = content.match(/\[[\s\S]*\]/);
                if (jsonMatch) {
                    try {
                        const parsed = JSON.parse(jsonMatch[0]);
                        if (Array.isArray(parsed)) {
                            cards = parsed;
                        } else {
                            console.warn(`  -> Warning: Response was not a JSON array.`);
                        }
                    } catch (parseError) {
                        console.error(`  -> Error parsing JSON for batch:`, parseError);
                        console.log(`  -> Raw content:`, content);
                    }
                } else {
                    console.warn(`  -> Warning: No JSON array found in response.`);
                    console.log(`  -> Raw content:`, content);
                }
            } else {
                console.warn(`  -> Warning: OPENROUTER_API_KEY not set. Using mock generation.`);
                // Mock generation
                cards = batch.map(type => ({
                    tag: `Generic-${type.replace(/\s+/g, '')}-001`,
                    name: type,
                    componentClass: type,
                    dexpiType: type.replace(/\s+/g, ''),
                    rdlUri: `http://data.posccaesar.org/rdl/RDS${Math.floor(Math.random() * 10000)}`,
                    description: `Reference ${type} for industrial application.`,
                    operatingConditions: {
                        pressureMax: { value: 10, unit: "bar", source: "API 610" },
                        pressureMin: { value: 0, unit: "bar" },
                        pressureDesign: { value: 12, unit: "bar" },
                        pressureOperating: { value: 8, unit: "bar" },
                        temperatureMax: { value: 100, unit: "C" },
                        temperatureMin: { value: -20, unit: "C" },
                        temperatureDesign: { value: 120, unit: "C" },
                        temperatureOperating: { value: 60, unit: "C" },
                        flowRateDesign: { value: 50, unit: "m3/h" },
                        flowRateOperating: { value: 45, unit: "m3/h" }
                    },
                    specifications: {
                        power: { value: 15, unit: "kW", source: "IEC 60034" },
                        rotationalSpeed: { value: 1450, unit: "rpm" },
                        efficiency: { value: 85, unit: "%" },
                        head: { value: 40, unit: "m" },
                        NPSHr: { value: 3, unit: "m" },
                        dutyPoint: { value: "Continuous", unit: "" }
                    },
                    design: {
                        weight: { value: 250, unit: "kg" },
                        length: { value: 1200, unit: "mm" },
                        width: { value: 600, unit: "mm" },
                        height: { value: 800, unit: "mm" }
                    },
                    materials: {
                        casing: "ASTM A216 WCB",
                        impeller: "ASTM A743 CA6NM",
                        shaft: "AISI 4140",
                        seals: "Carbon/SiC",
                        gaskets: "Spiral Wound 316/Graphite",
                        bolting: "ASTM A193 B7",
                        baseplate: "Carbon Steel"
                    },
                    nozzles: [
                        { id: "N1", name: "Suction", service: "Process Inlet", size: "DN150", rating: "PN16", facing: "RF", position: "End" },
                        { id: "N2", name: "Discharge", service: "Process Outlet", size: "DN100", rating: "PN40", facing: "RF", position: "Top" },
                        { id: "N3", name: "Drain", service: "Drain", size: "DN25" },
                        { id: "N4", name: "Vent", service: "Vent", size: "DN25" }
                    ],
                    standards: ["API 610", "ASME B73.1", "ISO 5199", "IEC 60034"],
                    image_prompt: `A detailed 3D model of a ${type}, industrial style.`
                }));
            }

            if (cards.length > 0) {
                console.log(`  -> Generated ${cards.length} cards.`);
                allCards.push(...cards);
            }

        } catch (error) {
            console.error(`  -> Error processing batch:`, error);
        }
    }

    // 3. Save Results
    console.log(`Total cards generated: ${allCards.length}`);
    fs.writeFileSync(OUTPUT_FILE_PATH, JSON.stringify(allCards, null, 2));
    console.log(`Saved to: ${OUTPUT_FILE_PATH}`);
}

generateCards().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});
