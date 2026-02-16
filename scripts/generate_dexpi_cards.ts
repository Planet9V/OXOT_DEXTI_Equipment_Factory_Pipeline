
import * as fs from 'fs';
import * as path from 'path';
import * as URIs from '../src/lib/sectors/uris';
import { getDefaults, ReferenceDefaults, ReferenceSpec } from '../src/lib/agents/reference-defaults';

// Output path
const OUTPUT_PATH = path.join(__dirname, '../src/lib/resources/dexpi-equipment-cards.json');

// Helper to convert URI constant name to readable name
function formatName(key: string): string {
    return key
        .replace(/_URI$/, '')
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

// Helper to get DEXPI Type from URI key (e.g. CENTRIFUGAL_PUMP_URI -> CentrifugalPump)
function getDexpiType(key: string): string {
    return key
        .replace(/_URI$/, '')
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('');
}

// Helper to generate dimensions if missing
function generateDimensions(type: string): { weight: any, length: any, width: any, height: any } {
    // Basic defaults
    return {
        weight: { value: 500, unit: "kg" },
        length: { value: 1200, unit: "mm" },
        width: { value: 800, unit: "mm" },
        height: { value: 1000, unit: "mm" }
    };
}

export function generateCard(key: string, uri: string) {
    const dexpiType = getDexpiType(key);
    const defaults = getDefaults(dexpiType);
    const name = formatName(key);
    const tag = `Generic-${dexpiType.substring(0, 4).toUpperCase()}-001`;

    // Map Operating Conditions
    const op = defaults.operatingConditions;
    const operatingConditions: any = {
        pressureMax: { value: op.designPressure.max, unit: op.designPressure.unit, source: "API/ASME" },
        pressureMin: { value: op.operatingPressure.min, unit: op.operatingPressure.unit },
        pressureDesign: { value: op.designPressure.typical, unit: op.designPressure.unit },
        pressureOperating: { value: op.operatingPressure.typical, unit: op.operatingPressure.unit },
        temperatureMax: { value: op.designTemperature.max, unit: op.designTemperature.unit },
        temperatureMin: { value: op.designTemperature.min, unit: op.designTemperature.unit },
        temperatureDesign: { value: op.designTemperature.typical, unit: op.designTemperature.unit },
        temperatureOperating: { value: op.operatingTemperature.typical, unit: op.operatingTemperature.unit },
    };

    if (op.flowRate) {
        operatingConditions.flowRateDesign = { value: op.flowRate.typical, unit: op.flowRate.unit };
        operatingConditions.flowRateOperating = { value: op.flowRate.typical * 0.8, unit: op.flowRate.unit };
    }

    // Map Specifications
    const specifications: any = {};
    for (const [k, v] of Object.entries(defaults.specifications)) {
        specifications[k] = { value: v.value, unit: v.unit };
    }
    // Ensure "dutyPoint" exists if relevant, or just add generic
    specifications.dutyPoint = { value: "Continuous", unit: "" };

    // Map Mechanical Design (Dimensions)
    // check if specs have dimensions, else generate
    const design = generateDimensions(dexpiType);
    if (defaults.specifications.weight) design.weight = { value: defaults.specifications.weight.value, unit: defaults.specifications.weight.unit };
    // Try to find L/W/H in specs or defaults (often not there, so keep generated defaults)

    // Map Materials
    const materials: any = {
        casing: defaults.materials.body,
        internals: defaults.materials.internals,
        gaskets: defaults.materials.gaskets,
        bolting: defaults.materials.bolting,
        baseplate: "Carbon Steel ASTM A36",
        // Add shaft/seals defaults
        shaft: "SS 410",
        seals: "Mechanical Seal API 682"
    };
    // Adjust keys for specific types if needed (e.g. Pump uses impeller)
    if (defaults.category === 'Pump') {
        materials.impeller = defaults.materials.internals;
        delete materials.internals;
        // Pump specific logic for shaft/seals if needed, but defaults are fine
    }

    // Map Nozzles
    const nozzles = defaults.nozzleTemplate.map(n => ({
        id: n.id,
        name: n.service,
        service: n.service,
        size: n.size,
        rating: n.rating,
        facing: n.facing,
        position: "Standard"
    }));

    return {
        tag,
        name,
        componentClass: defaults.category,
        dexpiType,
        rdlUri: uri,
        description: `Standard ${name} for ${defaults.category} service.`,
        operatingConditions,
        specifications,
        design,
        materials,
        nozzles,
        standards: defaults.standards,
        image_prompt: `Photorealistic 3D render of a ${name} (${dexpiType}), industrial engineering context, ${defaults.materials.body} material finish, studio lighting, white background, high detail.`
    };
}

export function generateAllCards() {
    const cards = [];
    console.log("Generating equipment cards...");

    // Iterate over all exported URIs
    for (const [key, uri] of Object.entries(URIs)) {
        if (typeof uri === 'string') {
            try {
                const card = generateCard(key, uri);
                cards.push(card);
                console.log(`Generated: ${card.name}`);
            } catch (error) {
                console.error(`Error generating card for ${key}:`, error);
            }
        }
    }
    return cards;
}

function main() {
    const cards = generateAllCards();
    const dir = path.dirname(OUTPUT_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(cards, null, 2));
    console.log(`\nSuccessfully generated ${cards.length} equipment cards in ${OUTPUT_PATH}`);
}

if (require.main === module) {
    main();
}
