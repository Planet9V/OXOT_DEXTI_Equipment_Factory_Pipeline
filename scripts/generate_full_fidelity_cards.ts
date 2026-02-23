
import * as fs from 'fs';
import * as path from 'path';
import { DexpiAgent } from '../src/lib/agents/agent';
import * as URIs from '../src/lib/sectors/uris';

// Define types
interface EquipmentRegistryItem {
    type: string;
    category: string;
    tags: string[];
    description: string;
}

interface EquipmentRegistry {
    sector: string;
    subSector: string;
    equipment: EquipmentRegistryItem[];
}

interface DexpiCard {
    tag: string;
    name: string;
    componentClass: string;
    dexpiType: string;
    rdlUri: string;
    description: string;
    operatingConditions: any;
    specifications: any;
    design: any;
    materials: any;
    nozzles: any[];
    standards: string[];
    image_prompt: string;
}

// Fallback generator
function generateFallbackCard(item: EquipmentRegistryItem): DexpiCard {
    const typeName = item.type;
    const cleanName = typeName.replace(/\s+/g, '');
    let componentClass = 'Equipment';
    let dexpiType = cleanName;

    // Simple heuristic mapping
    if (typeName.includes('Pump')) componentClass = 'Pump';
    else if (typeName.includes('Compressor')) componentClass = 'Compressor';
    else if (typeName.includes('Turbine')) componentClass = 'Turbine';
    else if (typeName.includes('Valve')) componentClass = 'Valve';
    else if (typeName.includes('Heat Exchanger') || typeName.includes('Cooler') || typeName.includes('Condenser') || typeName.includes('Reboiler') || typeName.includes('Heater')) componentClass = 'HeatExchanger';
    else if (typeName.includes('Tank') || typeName.includes('Vessel') || typeName.includes('Drum') || typeName.includes('Separator') || typeName.includes('Column') || typeName.includes('Reactor')) componentClass = 'Vessel';
    else if (typeName.includes('Motor') || typeName.includes('Generator') || typeName.includes('Transformer') || typeName.includes('Switchgear')) componentClass = 'Electrical';

    // Find URI
    let uri = 'http://sandbox.dexpi.org/rdl/' + dexpiType;
    for (const [key, val] of Object.entries(URIs)) {
        if (key.replace('_URI', '').replace(/_/g, '').toLowerCase() === cleanName.toLowerCase()) {
            uri = val as string;
            break;
        }
    }

    // Determine specific URI based on type name keywords
    if (typeName.includes('Centrifugal Pump')) uri = URIs.CENTRIFUGAL_PUMP_URI;
    else if (typeName.includes('Reciprocating Pump')) uri = URIs.PD_PUMP_URI;
    else if (typeName.includes('Centrifugal Compressor')) uri = URIs.COMPRESSOR_URI; // Approximation
    else if (typeName.includes('Shell and Tube')) uri = URIs.SHELL_TUBE_HX_URI;
    else if (typeName.includes('Plate and Frame')) uri = URIs.PLATE_HX_URI;
    else if (typeName.includes('Gate Valve')) uri = URIs.GATE_VALVE_URI;
    else if (typeName.includes('Globe Valve')) uri = URIs.GLOBE_VALVE_URI;
    else if (typeName.includes('Ball Valve')) uri = URIs.BALL_VALVE_URI;
    else if (typeName.includes('Check Valve')) uri = URIs.CHECK_VALVE_URI;

    // Generators for sections (simplified version of generate_reference_cards.ts logic)
    const getOperatingConditions = () => {
        const pressure = 10 + Math.floor(Math.random() * 40);
        const temp = 50 + Math.floor(Math.random() * 150);
        const flow = 100 + Math.floor(Math.random() * 400);
        return {
            pressureMax: { value: pressure * 1.5, unit: "bar", source: "API 610" },
            pressureMin: { value: 0, unit: "bar" },
            pressureDesign: { value: pressure * 1.2, unit: "bar" },
            pressureOperating: { value: pressure, unit: "bar" },
            temperatureMax: { value: temp + 50, unit: "C" },
            temperatureMin: { value: -20, unit: "C" },
            temperatureDesign: { value: temp + 20, unit: "C" },
            temperatureOperating: { value: temp, unit: "C" },
            flowRateDesign: { value: flow * 1.1, unit: "m3/h" },
            flowRateOperating: { value: flow, unit: "m3/h" }
        };
    };

    const getSpecifications = () => {
         const specs: any = {
            power: { value: 50 + Math.floor(Math.random() * 200), unit: "kW", source: "IEC 60034" },
            efficiency: { value: 75 + Math.floor(Math.random() * 20), unit: "%" }
        };
        if (componentClass === 'Pump') {
            specs.head = { value: 50 + Math.floor(Math.random() * 100), unit: "m" };
            specs.NPSHr = { value: 3 + Math.random() * 5, unit: "m" };
            specs.rotationalSpeed = { value: 2950, unit: "rpm" };
            specs.dutyPoint = { value: "Continuous", unit: "" };
        }
        return specs;
    };

    const getMaterials = () => {
         if (componentClass === 'Pump' || componentClass === 'Valve') {
            return {
                casing: "ASTM A216 WCB",
                impeller: "ASTM A351 CF8M",
                shaft: "ASTM A276 Type 410",
                seals: "Mechanical Seal API 682",
                gaskets: "Spiral Wound SS316/Graphite",
                bolting: "ASTM A193 Gr. B7",
                baseplate: "Carbon Steel"
            };
        }
        return {
            body: "ASTM A216 WCB",
            internals: "SS316"
        };
    };

    const getNozzles = () => {
        if (componentClass === 'Pump') {
            return [
                { id: "N1", name: "Suction", service: "Process Inlet", size: "DN150", rating: "PN16", facing: "RF", position: "End" },
                { id: "N2", name: "Discharge", service: "Process Outlet", size: "DN100", rating: "PN40", facing: "RF", position: "Top" },
                { id: "N3", name: "Drain", service: "Drain", size: "DN25", rating: "PN16", facing: "RF" },
                { id: "N4", name: "Vent", service: "Vent", size: "DN25", rating: "PN16", facing: "RF" }
            ];
        }
        return [
             { id: "N1", name: "Connection 1", service: "Process", size: "DN50", rating: "PN16" },
             { id: "N2", name: "Connection 2", service: "Process", size: "DN50", rating: "PN16" }
        ];
    };

    return {
        tag: `Generic-${dexpiType.substring(0, 4).toUpperCase()}-001`,
        name: `Standard ${typeName}`,
        componentClass: componentClass,
        dexpiType: dexpiType,
        rdlUri: uri,
        description: item.description,
        operatingConditions: getOperatingConditions(),
        specifications: getSpecifications(),
        design: {
            weight: { value: 500 + Math.floor(Math.random() * 2000), unit: "kg" },
            length: { value: 1000 + Math.floor(Math.random() * 2000), unit: "mm" },
            width: { value: 800 + Math.floor(Math.random() * 1000), unit: "mm" },
            height: { value: 1200 + Math.floor(Math.random() * 2000), unit: "mm" }
        },
        materials: getMaterials(),
        nozzles: getNozzles(),
        standards: ["API 610", "ASME B73.1", "ISO 5199"],
        image_prompt: `High-fidelity 3D engineering rendering of a ${typeName}`
    };
}

async function main() {
    const registryPath = path.join(process.cwd(), 'oil_and_gas_equipment_registry.json');
    const outputPath = path.join(process.cwd(), 'src/lib/resources/oil_and_gas_cards.json');

    if (!fs.existsSync(registryPath)) {
        console.error(`Registry file not found: ${registryPath}`);
        process.exit(1);
    }

    const registry: EquipmentRegistry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));
    const cards: DexpiCard[] = [];
    const agent = new DexpiAgent();
    const useAgent = !!process.env.OPENROUTER_API_KEY;

    console.log(`Generating cards for ${registry.equipment.length} items using ${useAgent ? 'DexpiAgent' : 'Fallback'}...`);

    for (const item of registry.equipment) {
        // console.log(`Processing: ${item.type}`);
        let card: DexpiCard | null = null;

        if (useAgent) {
            try {
                const prompt = `Generate a Full-Fidelity DEXPI 2.0 equipment card for: ${item.type}. Description: ${item.description}.`;
                // Cast to any to bypass potential type mismatch if agent types aren't fully reloaded by ts-node yet,
                // though usually valid if types.ts is updated.
                const response = await agent.chat([{ role: 'user', content: prompt }], 'theEngineer' as any);

                // Try to extract JSON array
                const jsonMatch = response.content.match(/\[[\s\S]*\]/);
                if (jsonMatch) {
                    const parsed = JSON.parse(jsonMatch[0]);
                    if (Array.isArray(parsed) && parsed.length > 0) {
                        card = parsed[0];
                    }
                } else {
                    // Try to extract single JSON object
                    const jsonObjMatch = response.content.match(/\{[\s\S]*\}/);
                    if (jsonObjMatch) {
                         card = JSON.parse(jsonObjMatch[0]);
                    }
                }

                if (!card) {
                    console.warn(`Failed to parse JSON for ${item.type}, using fallback.`);
                }
            } catch (err) {
                console.error(`Agent failed for ${item.type}: ${err}`);
            }
        }

        if (!card) {
            card = generateFallbackCard(item);
        }

        if (card) {
            cards.push(card);
        }
    }

    // Ensure directory exists
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(outputPath, JSON.stringify(cards, null, 2));
    console.log(`Successfully generated ${cards.length} cards at ${outputPath}`);
}

main().catch(console.error);
