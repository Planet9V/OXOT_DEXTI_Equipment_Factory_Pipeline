
import * as fs from 'fs';
import * as path from 'path';
import { ENERGY_SECTOR } from '../src/lib/sectors/energy';
import { DexpiEquipmentType } from '../src/lib/sectors/types';

// Interface for the output card
export interface DexpiCard {
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

// Helper functions for generation

function round(num: number): number {
    return Math.round(num * 100) / 100;
}

function generateOperatingConditions(type: string) {
    const pressure = 10 + Math.floor(Math.random() * 40); // 10-50 bar
    const temp = 50 + Math.floor(Math.random() * 150); // 50-200 C
    const flow = 100 + Math.floor(Math.random() * 400); // 100-500 m3/h

    return {
        pressureMax: { value: round(pressure * 1.5), unit: "bar", source: "API 610" },
        pressureMin: { value: 0, unit: "bar" },
        pressureDesign: { value: round(pressure * 1.2), unit: "bar" },
        pressureOperating: { value: pressure, unit: "bar" },
        temperatureMax: { value: temp + 50, unit: "C" },
        temperatureMin: { value: -20, unit: "C" },
        temperatureDesign: { value: temp + 20, unit: "C" },
        temperatureOperating: { value: temp, unit: "C" },
        flowRateDesign: { value: round(flow * 1.1), unit: "m3/h" },
        flowRateOperating: { value: flow, unit: "m3/h" }
    };
}

function generateSpecifications(componentClass: string) {
    const specs: any = {
        power: { value: 50 + Math.floor(Math.random() * 200), unit: "kW", source: "IEC 60034" },
        efficiency: { value: 75 + Math.floor(Math.random() * 20), unit: "%" }
    };

    if (componentClass.includes('Pump')) {
        specs.head = { value: 50 + Math.floor(Math.random() * 100), unit: "m" };
        specs.NPSHr = { value: round(3 + Math.random() * 5), unit: "m" };
        specs.rotationalSpeed = { value: 2950, unit: "rpm" };
        specs.dutyPoint = { value: "Continuous", unit: "" };
    } else if (componentClass.includes('Compressor') || componentClass.includes('Turbine')) {
        specs.rotationalSpeed = { value: 3000 + Math.floor(Math.random() * 7000), unit: "rpm" };
    } else if (componentClass.includes('HeatExchanger') || componentClass.includes('Boiler') || componentClass.includes('Furnace')) {
        specs.heatTransferArea = { value: 50 + Math.floor(Math.random() * 500), unit: "m2" };
        specs.duty = { value: 1000 + Math.floor(Math.random() * 5000), unit: "kW" };
    } else if (componentClass.includes('Vessel') || componentClass.includes('Tank') || componentClass.includes('Column') || componentClass.includes('Reactor')) {
        specs.volume = { value: 10 + Math.floor(Math.random() * 100), unit: "m3" };
        specs.orientation = { value: "Vertical", unit: "" };
    } else if (componentClass.includes('Valve')) {
        specs.cv = { value: 50 + Math.floor(Math.random() * 500), unit: "" };
        specs.leakageClass = { value: "IV", unit: "" };
    }

    return specs;
}

function generateDesign() {
    return {
        weight: { value: 500 + Math.floor(Math.random() * 2000), unit: "kg" },
        length: { value: 1000 + Math.floor(Math.random() * 2000), unit: "mm" },
        width: { value: 800 + Math.floor(Math.random() * 1000), unit: "mm" },
        height: { value: 1200 + Math.floor(Math.random() * 2000), unit: "mm" }
    };
}

function generateMaterials(componentClass: string) {
    const mats: any = {
        bolting: "ASTM A193 Gr. B7",
        gaskets: "Spiral Wound SS316/Graphite"
    };

    if (componentClass.includes('Pump') || componentClass.includes('Valve')) {
        mats.casing = "ASTM A216 WCB";
        mats.impeller = "ASTM A351 CF8M"; // For pumps
        mats.trim = "SS316"; // For valves
        mats.shaft = "ASTM A276 Type 410";
        mats.seals = "Mechanical Seal API 682";
    } else if (componentClass.includes('Vessel') || componentClass.includes('Tank') || componentClass.includes('Column') || componentClass.includes('Reactor') || componentClass.includes('HeatExchanger')) {
        mats.shell = "ASTM A516 Gr. 70";
        mats.head = "ASTM A516 Gr. 70";
        mats.tubes = "ASTM A213 TP316"; // For HX
        mats.tubesheet = "ASTM A266 Cl. 2"; // For HX
        mats.internals = "SS316";
    } else {
        mats.body = "ASTM A216 WCB";
        mats.internals = "SS316";
    }

    return mats;
}

function generateNozzles(componentClass: string) {
    if (componentClass.includes('Pump')) {
        return [
            { id: "N1", name: "Suction", service: "Process Inlet", size: "DN150", rating: "PN16", facing: "RF", position: "End" },
            { id: "N2", name: "Discharge", service: "Process Outlet", size: "DN100", rating: "PN40", facing: "RF", position: "Top" },
            { id: "N3", name: "Drain", service: "Drain", size: "DN25", rating: "PN16", facing: "RF" },
            { id: "N4", name: "Vent", service: "Vent", size: "DN25", rating: "PN16", facing: "RF" }
        ];
    } else if (componentClass.includes('Compressor')) {
        return [
            { id: "N1", name: "Suction", service: "Process Inlet", size: "DN300", rating: "PN16", facing: "RF" },
            { id: "N2", name: "Discharge", service: "Process Outlet", size: "DN250", rating: "PN40", facing: "RF" },
            { id: "N3", name: "Lube Oil In", service: "Utility", size: "DN50" },
            { id: "N4", name: "Lube Oil Out", service: "Utility", size: "DN50" }
        ];
    } else if (componentClass.includes('HeatExchanger') || componentClass.includes('Cooler') || componentClass.includes('Condenser') || componentClass.includes('Boiler') || componentClass.includes('Furnace')) {
        return [
            { id: "N1", name: "Inlet", service: "Process Inlet", size: "DN200", rating: "PN16" },
            { id: "N2", name: "Outlet", service: "Process Outlet", size: "DN200", rating: "PN16" },
            { id: "N3", name: "Utility Inlet", service: "Utility Inlet", size: "DN150", rating: "PN16" },
            { id: "N4", name: "Utility Outlet", service: "Utility Outlet", size: "DN150", rating: "PN16" }
        ];
    } else if (componentClass.includes('Vessel') || componentClass.includes('Tank') || componentClass.includes('Column') || componentClass.includes('Reactor') || componentClass.includes('Separator')) {
        return [
            { id: "N1", name: "Inlet", service: "Process Inlet", size: "DN200", rating: "PN16" },
            { id: "N2", name: "Outlet", service: "Process Outlet", size: "DN200", rating: "PN16" },
            { id: "N3", name: "Vent", service: "Vent", size: "DN50" },
            { id: "N4", name: "Drain", service: "Drain", size: "DN50" },
            { id: "M1", name: "Manway", service: "Access", size: "DN600", rating: "PN16" }
        ];
    } else if (componentClass.includes('Valve')) {
        return [
            { id: "N1", name: "Inlet", service: "Process", size: "DN150", rating: "PN40", facing: "RF" },
            { id: "N2", name: "Outlet", service: "Process", size: "DN150", rating: "PN40", facing: "RF" }
        ];
    }

    // Default
    return [
         { id: "N1", name: "Connection 1", service: "Process", size: "DN50", rating: "PN16" },
         { id: "N2", name: "Connection 2", service: "Process", size: "DN50", rating: "PN16" }
    ];
}

function generateStandards(componentClass: string) {
    if (componentClass.includes('Pump')) return ["API 610", "ISO 5199", "ASME B73.1"];
    if (componentClass.includes('Compressor')) return ["API 617", "ISO 10439"];
    if (componentClass.includes('HeatExchanger')) return ["TEMA R", "API 660", "ASME VIII Div 1"];
    if (componentClass.includes('Vessel') || componentClass.includes('Tank') || componentClass.includes('Column') || componentClass.includes('Reactor')) return ["ASME VIII Div 1", "API 650"];
    if (componentClass.includes('Valve')) return ["API 600", "ASME B16.34", "ISO 10434"];
    if (componentClass.includes('Motor') || componentClass.includes('Generator') || componentClass.includes('Transformer')) return ["IEC 60034", "NEMA MG1"];
    return ["ISO 9001", "ASME B31.3"];
}

export function generateAllCards(): DexpiCard[] {
    const oilGasSector = ENERGY_SECTOR.subSectors.find(s => s.code === 'ENER-OG');

    if (!oilGasSector) {
        console.error('ENER-OG sub-sector not found!');
        return [];
    }

    const uniqueEquipment = new Map<string, DexpiEquipmentType>();

    for (const facility of oilGasSector.facilities) {
        if (facility.equipment) {
            for (const eq of facility.equipment) {
                if (!uniqueEquipment.has(eq.displayName)) {
                    uniqueEquipment.set(eq.displayName, eq);
                }
            }
        }
    }

    const cards: DexpiCard[] = [];
    let counter = 1;

    for (const eq of uniqueEquipment.values()) {
        // Generate a code based on displayName (e.g. "Atmospheric Distillation Column" -> "ADC" or similar)
        // For simplicity, let's use initials
        const initials = eq.displayName.split(' ').map(w => w[0]).join('').toUpperCase().substring(0, 4);
        const tag = `Generic-${initials}-${String(counter).padStart(3, '0')}`;
        counter++;

        // Determine DEXPI type from URI or Component Class
        // Assuming componentClass is a valid DEXPI type for now, or we might need mapping
        const dexpiType = eq.componentClass;

        const card: DexpiCard = {
            tag: tag,
            name: eq.displayName,
            componentClass: eq.componentClass,
            dexpiType: dexpiType,
            rdlUri: eq.componentClassURI,
            description: `Reference configuration for ${eq.displayName} compliant with DEXPI 2.0 and relevant industry standards.`,
            operatingConditions: generateOperatingConditions(dexpiType),
            specifications: generateSpecifications(eq.componentClass),
            design: generateDesign(),
            materials: generateMaterials(eq.componentClass),
            nozzles: generateNozzles(eq.componentClass),
            standards: generateStandards(eq.componentClass),
            image_prompt: `High-fidelity 3D engineering rendering of a ${eq.displayName} (${eq.componentClass}) with industrial metallic finish, visible flanges, and realistic lighting.`
        };

        cards.push(card);
    }

    return cards;
}

// Execute if run directly
if (require.main === module) {
    const cards = generateAllCards();
    const outputDir = path.join(__dirname, '../src/lib/resources');

    // Ensure directory exists
    if (!fs.existsSync(outputDir)){
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, 'dexpi-equipment-cards.json');
    fs.writeFileSync(outputPath, JSON.stringify(cards, null, 2));
    console.log(`Successfully generated ${cards.length} equipment cards at: ${outputPath}`);
}
