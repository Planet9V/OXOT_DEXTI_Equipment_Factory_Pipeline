
import * as fs from 'fs';
import * as path from 'path';
import * as URIs from '../src/lib/sectors/uris';

// Interface for the output card
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

// Helper to determine component class and DEXPI type from URI key
function parseType(key: string, uri: string): { componentClass: string, dexpiType: string } {
    // Remove _URI suffix
    let base = key.replace('_URI', '');

    // Convert SCREAMING_SNAKE to CamelCase or PascalCase
    // e.g. CENTRIFUGAL_PUMP -> CentrifugalPump
    let words = base.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
    let dexpiType = words.join('');

    // Determine Component Class (Parent)
    let componentClass = dexpiType;
    if (dexpiType.endsWith('Pump')) componentClass = 'Pump';
    else if (dexpiType.endsWith('Compressor')) componentClass = 'Compressor';
    else if (dexpiType.endsWith('Turbine')) componentClass = 'Turbine';
    else if (dexpiType.endsWith('Valve')) componentClass = 'Valve';
    else if (dexpiType.endsWith('HeatExchanger') || dexpiType.endsWith('HX')) componentClass = 'HeatExchanger';
    else if (dexpiType.includes('Tank') || dexpiType.includes('Vessel') || dexpiType.includes('Column') || dexpiType.includes('Reactor')) componentClass = 'Vessel';

    // Specific overrides
    if (dexpiType === 'ShellTubeHx') dexpiType = 'ShellTubeHeatExchanger';
    if (dexpiType === 'PlateHx') dexpiType = 'PlateHeatExchanger';
    if (dexpiType === 'AirCooledHx') dexpiType = 'AirCooledHeatExchanger';

    return { componentClass, dexpiType };
}

// Generators for specific sections
function getOperatingConditions(type: string) {
    // Randomize slightly for "Reference" feel
    const pressure = 10 + Math.floor(Math.random() * 40); // 10-50 bar
    const temp = 50 + Math.floor(Math.random() * 150); // 50-200 C
    const flow = 100 + Math.floor(Math.random() * 400); // 100-500 m3/h

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
}

function getSpecifications(type: string, componentClass: string) {
    const specs: any = {
        power: { value: 50 + Math.floor(Math.random() * 200), unit: "kW", source: "IEC 60034" },
        efficiency: { value: 75 + Math.floor(Math.random() * 20), unit: "%" }
    };

    if (componentClass === 'Pump') {
        specs.head = { value: 50 + Math.floor(Math.random() * 100), unit: "m" };
        specs.NPSHr = { value: 3 + Math.random() * 5, unit: "m" };
        specs.rotationalSpeed = { value: 2950, unit: "rpm" };
        specs.dutyPoint = { value: "Continuous", unit: "" };
    } else if (componentClass === 'Compressor') {
        specs.capacity = { value: 1000 + Math.floor(Math.random() * 5000), unit: "m3/h" };
        specs.compressionRatio = { value: 2 + Math.random() * 3, unit: "" };
        specs.rotationalSpeed = { value: 10000 + Math.floor(Math.random() * 5000), unit: "rpm" };
    } else if (componentClass === 'HeatExchanger') {
        specs.heatTransferArea = { value: 50 + Math.floor(Math.random() * 500), unit: "m2" };
        specs.duty = { value: 1000 + Math.floor(Math.random() * 5000), unit: "kW" };
    } else if (componentClass === 'Vessel') {
        specs.volume = { value: 10 + Math.floor(Math.random() * 100), unit: "m3" };
        specs.orientation = { value: "Vertical", unit: "" };
    } else if (componentClass === 'Valve') {
        specs.cv = { value: 50 + Math.floor(Math.random() * 500), unit: "" };
        specs.leakageClass = { value: "IV", unit: "" };
    }

    return specs;
}

function getDesign(type: string) {
    return {
        weight: { value: 500 + Math.floor(Math.random() * 2000), unit: "kg" },
        length: { value: 1000 + Math.floor(Math.random() * 2000), unit: "mm" },
        width: { value: 800 + Math.floor(Math.random() * 1000), unit: "mm" },
        height: { value: 1200 + Math.floor(Math.random() * 2000), unit: "mm" }
    };
}

function getMaterials(type: string, componentClass: string) {
    const mats: any = {
        bolting: "ASTM A193 Gr. B7",
        gaskets: "Spiral Wound SS316/Graphite"
    };

    if (componentClass === 'Pump' || componentClass === 'Valve') {
        mats.casing = "ASTM A216 WCB";
        mats.impeller = "ASTM A351 CF8M"; // For pumps
        mats.trim = "SS316"; // For valves
        mats.shaft = "ASTM A276 Type 410";
        mats.seals = "Mechanical Seal API 682";
    } else if (componentClass === 'Vessel' || componentClass === 'HeatExchanger') {
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

function getNozzles(componentClass: string) {
    if (componentClass === 'Pump') {
        return [
            { id: "N1", name: "Suction", service: "Process Inlet", size: "DN150", rating: "PN16", facing: "RF", position: "End" },
            { id: "N2", name: "Discharge", service: "Process Outlet", size: "DN100", rating: "PN40", facing: "RF", position: "Top" },
            { id: "N3", name: "Drain", service: "Drain", size: "DN25", rating: "PN16", facing: "RF" },
            { id: "N4", name: "Vent", service: "Vent", size: "DN25", rating: "PN16", facing: "RF" }
        ];
    } else if (componentClass === 'Compressor') {
        return [
            { id: "N1", name: "Suction", service: "Process Inlet", size: "DN300", rating: "PN16", facing: "RF" },
            { id: "N2", name: "Discharge", service: "Process Outlet", size: "DN250", rating: "PN40", facing: "RF" },
            { id: "N3", name: "Lube Oil In", service: "Utility", size: "DN50" },
            { id: "N4", name: "Lube Oil Out", service: "Utility", size: "DN50" }
        ];
    } else if (componentClass === 'HeatExchanger') {
        return [
            { id: "N1", name: "Shell Inlet", service: "Process Inlet", size: "DN200", rating: "PN16" },
            { id: "N2", name: "Shell Outlet", service: "Process Outlet", size: "DN200", rating: "PN16" },
            { id: "N3", name: "Tube Inlet", service: "Utility Inlet", size: "DN150", rating: "PN16" },
            { id: "N4", name: "Tube Outlet", service: "Utility Outlet", size: "DN150", rating: "PN16" }
        ];
    } else if (componentClass === 'Vessel') {
        return [
            { id: "N1", name: "Inlet", service: "Process Inlet", size: "DN200", rating: "PN16" },
            { id: "N2", name: "Outlet", service: "Process Outlet", size: "DN200", rating: "PN16" },
            { id: "N3", name: "Vent", service: "Vent", size: "DN50" },
            { id: "N4", name: "Drain", service: "Drain", size: "DN50" },
            { id: "M1", name: "Manway", service: "Access", size: "DN600", rating: "PN16" }
        ];
    } else if (componentClass === 'Valve') {
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

function getStandards(componentClass: string) {
    if (componentClass === 'Pump') return ["API 610", "ISO 5199", "ASME B73.1"];
    if (componentClass === 'Compressor') return ["API 617", "ISO 10439"];
    if (componentClass === 'HeatExchanger') return ["TEMA R", "API 660", "ASME VIII Div 1"];
    if (componentClass === 'Vessel') return ["ASME VIII Div 1", "API 650"];
    if (componentClass === 'Valve') return ["API 600", "ASME B16.34", "ISO 10434"];
    if (componentClass === 'Electrical') return ["IEC 60034", "NEMA MG1"];
    return ["ISO 9001", "ASME B31.3"];
}

// Main logic
const outputCards: DexpiCard[] = [];

console.log('Generating Equipment Cards...');

for (const [key, uri] of Object.entries(URIs)) {
    const { componentClass, dexpiType } = parseType(key, uri as string);
    const tag = `Generic-${dexpiType.substring(0, 4).toUpperCase()}-001`;

    const card: DexpiCard = {
        tag: tag,
        name: `Standard ${dexpiType}`,
        componentClass: componentClass,
        dexpiType: dexpiType,
        rdlUri: uri as string,
        description: `Reference configuration for ${dexpiType} compliant with DEXPI 2.0 and relevant industry standards.`,
        operatingConditions: getOperatingConditions(dexpiType),
        specifications: getSpecifications(dexpiType, componentClass),
        design: getDesign(dexpiType),
        materials: getMaterials(dexpiType, componentClass),
        nozzles: getNozzles(componentClass),
        standards: getStandards(componentClass),
        image_prompt: `High-fidelity 3D engineering rendering of a ${dexpiType} (${componentClass}) with industrial metallic finish, visible flanges, and realistic lighting.`
    };

    outputCards.push(card);
}

const outputPath = path.join(__dirname, 'generated_equipment_cards.json');
fs.writeFileSync(outputPath, JSON.stringify(outputCards, null, 2));

console.log(`Successfully generated ${outputCards.length} equipment cards at: ${outputPath}`);
