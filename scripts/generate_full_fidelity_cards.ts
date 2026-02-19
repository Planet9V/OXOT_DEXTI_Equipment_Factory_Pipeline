import * as fs from 'fs';
import * as path from 'path';

// Define the output interface matching the schema
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

// Read the registry
const registryPath = path.join(__dirname, '../oil_and_gas_equipment_registry.json');
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

function generateOperatingConditions(type: string, category: string) {
    let pressure = 10;
    let temp = 50;
    let flow = 100;

    if (type.includes('Pump')) {
        pressure = 20;
    } else if (type.includes('Compressor')) {
        pressure = 50;
    } else if (type.includes('Reactor')) {
        pressure = 30;
        temp = 150;
    } else if (type.includes('Fired Heater')) {
        temp = 350;
    } else if (type.includes('Distillation')) {
        pressure = 5;
        temp = 120;
    }

    return {
        pressureMax: { value: parseFloat((pressure * 1.5).toFixed(2)), unit: "bar", source: "Process Data" },
        pressureMin: { value: 0, unit: "bar" },
        pressureDesign: { value: parseFloat((pressure * 1.3).toFixed(2)), unit: "bar" },
        pressureOperating: { value: pressure, unit: "bar" },
        temperatureMax: { value: temp + 50, unit: "C" },
        temperatureMin: { value: -20, unit: "C" },
        temperatureDesign: { value: temp + 30, unit: "C" },
        temperatureOperating: { value: temp, unit: "C" },
        flowRateDesign: { value: parseFloat((flow * 1.1).toFixed(2)), unit: "m3/h" },
        flowRateOperating: { value: flow, unit: "m3/h" }
    };
}

function generateSpecifications(type: string, category: string) {
    const specs: any = {
        power: { value: 75, unit: "kW", source: "IEC 60034" },
        efficiency: { value: 85, unit: "%" },
        dutyPoint: { value: "Continuous", unit: "" }
    };

    if (type.includes('Pump')) {
        specs.head = { value: 120, unit: "m" };
        specs.NPSHr = { value: 3.5, unit: "m" };
        specs.rotationalSpeed = { value: 2950, unit: "rpm" };
    } else if (type.includes('Compressor')) {
        specs.power.value = 500;
        specs.rotationalSpeed = { value: 12000, unit: "rpm" };
        specs.flow = { value: 5000, unit: "Nm3/h" };
    } else if (category === 'heat-transfer') {
        specs.heatTransferArea = { value: 250, unit: "m2" };
        specs.duty = { value: 1500, unit: "kW" };
        delete specs.power;
        delete specs.efficiency;
        delete specs.dutyPoint;
    } else if (category === 'static' || category === 'piping') {
         // Static equipment generally doesn't have power/speed
        delete specs.power;
        delete specs.rotationalSpeed;
        delete specs.efficiency;
        if (type.includes('Tank') || type.includes('Vessel')) {
             specs.volume = { value: 50, unit: "m3" };
             specs.orientation = { value: "Vertical", unit: "" };
        }
    }

    return specs;
}

function generateDesign(type: string) {
    return {
        weight: { value: 1500, unit: "kg" },
        length: { value: 2500, unit: "mm" },
        width: { value: 1200, unit: "mm" },
        height: { value: 1800, unit: "mm" }
    };
}

function generateMaterials(type: string, category: string) {
    const mats: any = {
        bolting: "ASTM A193 Gr. B7",
        gaskets: "Spiral Wound SS316/Graphite",
        baseplate: "ASTM A36 Carbon Steel"
    };

    if (type.includes('Pump') || type.includes('Valve')) {
        mats.casing = "ASTM A216 WCB";
        mats.impeller = "ASTM A351 CF8M"; // SS316
        mats.shaft = "ASTM A276 Type 410"; // SS410
        mats.seals = "Mechanical Seal API 682 Plan 53A";
        mats.trim = "API Trim 8 (13Cr/HF)";
    } else if (category === 'heat-transfer') {
        mats.shell = "ASTM A516 Gr. 70";
        mats.channels = "ASTM A216 WCB";
        mats.tubes = "ASTM A213 TP316";
        mats.tubesheet = "ASTM A266 Cl. 2";
    } else if (type.includes('Tank') || type.includes('Vessel')) {
        mats.shell = "ASTM A516 Gr. 70";
        mats.heads = "ASTM A516 Gr. 70";
        mats.internals = "SS304";
        mats.legs = "ASTM A36";
    } else {
        mats.body = "ASTM A216 WCB";
        mats.internals = "SS316";
    }

    return mats;
}

function generateNozzles(type: string, category: string) {
    const nozzles = [];

    if (type.includes('Pump')) {
        nozzles.push(
            { id: "N1", name: "Suction", service: "Process Inlet", size: "DN150", rating: "PN16", facing: "RF", position: "End" },
            { id: "N2", name: "Discharge", service: "Process Outlet", size: "DN100", rating: "PN40", facing: "RF", position: "Top" },
            { id: "N3", name: "Drain", service: "Drain", size: "DN25", rating: "PN16", facing: "RF" },
            { id: "N4", name: "Vent", service: "Vent", size: "DN25", rating: "PN16", facing: "RF" }
        );
    } else if (type.includes('Compressor')) {
        nozzles.push(
            { id: "N1", name: "Suction", service: "Gas Inlet", size: "DN300", rating: "PN16", facing: "RF" },
            { id: "N2", name: "Discharge", service: "Gas Outlet", size: "DN250", rating: "PN40", facing: "RF" },
            { id: "N3", name: "Lube Oil In", service: "Utility", size: "DN50", rating: "PN16" },
            { id: "N4", name: "Lube Oil Out", service: "Utility", size: "DN50", rating: "PN16" }
        );
    } else if (category === 'heat-transfer') {
         nozzles.push(
            { id: "N1", name: "Shell Inlet", service: "Process Inlet", size: "DN200", rating: "PN16", facing: "RF" },
            { id: "N2", name: "Shell Outlet", service: "Process Outlet", size: "DN200", rating: "PN16", facing: "RF" },
            { id: "N3", name: "Tube Inlet", service: "Utility Inlet", size: "DN150", rating: "PN16", facing: "RF" },
            { id: "N4", name: "Tube Outlet", service: "Utility Outlet", size: "DN150", rating: "PN16", facing: "RF" }
        );
    } else if (type.includes('Tank') || type.includes('Vessel') || type.includes('Column')) {
        nozzles.push(
            { id: "N1", name: "Inlet", service: "Process Inlet", size: "DN200", rating: "PN16", facing: "RF" },
            { id: "N2", name: "Outlet", service: "Process Outlet", size: "DN200", rating: "PN16", facing: "RF" },
            { id: "M1", name: "Manway", service: "Access", size: "DN600", rating: "PN16", facing: "RF" },
            { id: "N3", name: "Vent", service: "Vent", size: "DN50", rating: "PN16", facing: "RF" },
            { id: "N4", name: "Drain", service: "Drain", size: "DN50", rating: "PN16", facing: "RF" }
        );
    } else if (category.includes('piping') || type.includes('Valve')) {
        nozzles.push(
            { id: "N1", name: "Inlet", service: "Process", size: "DN100", rating: "PN40", facing: "RF" },
            { id: "N2", name: "Outlet", service: "Process", size: "DN100", rating: "PN40", facing: "RF" }
        );
    } else {
        // Fallback
        nozzles.push(
             { id: "N1", name: "Connection 1", service: "Process", size: "DN50", rating: "PN16", facing: "RF" },
             { id: "N2", name: "Connection 2", service: "Process", size: "DN50", rating: "PN16", facing: "RF" }
        );
    }
    return nozzles;
}

function generateStandards(type: string, category: string) {
    if (type.includes('Pump')) return ["API 610", "ISO 5199", "ASME B73.1"];
    if (type.includes('Compressor')) return ["API 617", "ISO 10439"];
    if (type.includes('Heat Exchanger')) return ["TEMA R", "API 660", "ASME VIII Div 1"];
    if (type.includes('Fired Heater')) return ["API 560"];
    if (type.includes('Tank')) return ["API 650"];
    if (type.includes('Vessel') || type.includes('Reactor') || type.includes('Column')) return ["ASME VIII Div 1"];
    if (type.includes('Valve')) return ["API 600", "ASME B16.34", "ISO 10434"];
    if (type.includes('Motor')) return ["IEC 60034", "NEMA MG1"];
    if (category === 'electrical') return ["IEC 60076", "IEEE C57"];
    if (category === 'instrumentation') return ["ISA-5.1", "IEC 61508"];
    return ["ISO 9001", "ASME B31.3"];
}

function generateCard(item: any): DexpiCard {
    const type = item.type;
    const category = item.category;

    // Generate a code (e.g. "CP-001")
    const initials = type.split(' ').map((w: string) => w[0]).join('').toUpperCase().substring(0, 4);
    const tag = `Generic-${initials}-001`;

    // Map componentClassURI if possible (simplified here)
    const rdlUri = `http://posccaesar.org/rdl/${initials}123456`;

    // Determine DEXPI type (simplified)
    const dexpiType = type.replace(/\s+/g, '');

    return {
        tag: tag,
        name: type,
        componentClass: type, // Using type name as class for now
        dexpiType: dexpiType,
        rdlUri: rdlUri,
        description: item.description,
        operatingConditions: generateOperatingConditions(type, category),
        specifications: generateSpecifications(type, category),
        design: generateDesign(type),
        materials: generateMaterials(type, category),
        nozzles: generateNozzles(type, category),
        standards: generateStandards(type, category),
        image_prompt: `High-fidelity 3D engineering rendering of a ${type} with industrial metallic finish, visible flanges, and realistic lighting.`
    };
}

// Generate all cards
const cards = registry.equipment.map((item: any) => generateCard(item));

// Write output
const outputDir = path.join(__dirname, '../src/lib/resources');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const outputPath = path.join(outputDir, 'dexpi_equipment_cards.json');
fs.writeFileSync(outputPath, JSON.stringify(cards, null, 2));

console.log(`Generated ${cards.length} full-fidelity equipment cards to ${outputPath}`);
