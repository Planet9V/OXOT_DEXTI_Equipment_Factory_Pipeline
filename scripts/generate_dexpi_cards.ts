import * as fs from 'fs';
import * as path from 'path';
import * as URIs from '../src/lib/sectors/uris';
import { getDefaults } from '../src/lib/agents/reference-defaults';

const OUTPUT_DIR = path.join(__dirname, '../data');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'dexpi_equipment_cards.json');

// Helper to convert SCREAMING_SNAKE_CASE to PascalCase
function toPascalCase(str: string): string {
    return str.split('_').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join('');
}

// Helper to normalize specific abbreviations
function normalizeType(type: string): string {
    let normalized = type;
    normalized = normalized.replace(/Hx$/, 'HeatExchanger');
    normalized = normalized.replace(/^Pd/, 'PositiveDisplacement');
    return normalized;
}

function generateCard(key: string, uri: string) {
    const rawType = key.replace(/_URI$/, '');
    const pascalType = toPascalCase(rawType);
    const dexpiType = normalizeType(pascalType);

    // Get defaults based on the type
    const defaults = getDefaults(dexpiType);

    // Generate the card
    const card: any = {
        tag: `Generic-${dexpiType}-001`,
        name: dexpiType.replace(/([A-Z])/g, ' $1').trim(), // Add spaces for name
        componentClass: dexpiType, // Using the type as class for now
        dexpiType: dexpiType,
        rdlUri: uri,
        description: `Standard ${defaults.category} - ${dexpiType}`,

        operatingConditions: {
            pressureMax: { value: defaults.operatingConditions.operatingPressure.max, unit: defaults.operatingConditions.operatingPressure.unit, source: "API 610" },
            pressureMin: { value: defaults.operatingConditions.operatingPressure.min, unit: defaults.operatingConditions.operatingPressure.unit },
            pressureDesign: { value: defaults.operatingConditions.designPressure.typical, unit: defaults.operatingConditions.designPressure.unit },
            pressureOperating: { value: defaults.operatingConditions.operatingPressure.typical, unit: defaults.operatingConditions.operatingPressure.unit },
            temperatureMax: { value: defaults.operatingConditions.operatingTemperature.max, unit: defaults.operatingConditions.operatingTemperature.unit },
            temperatureMin: { value: defaults.operatingConditions.operatingTemperature.min, unit: defaults.operatingConditions.operatingTemperature.unit },
            temperatureDesign: { value: defaults.operatingConditions.designTemperature.typical, unit: defaults.operatingConditions.designTemperature.unit },
            temperatureOperating: { value: defaults.operatingConditions.operatingTemperature.typical, unit: defaults.operatingConditions.operatingTemperature.unit },
            flowRateDesign: { value: defaults.operatingConditions.flowRate ? defaults.operatingConditions.flowRate.typical : 0, unit: defaults.operatingConditions.flowRate ? defaults.operatingConditions.flowRate.unit : 'm3/h' },
            flowRateOperating: { value: defaults.operatingConditions.flowRate ? defaults.operatingConditions.flowRate.typical * 0.8 : 0, unit: defaults.operatingConditions.flowRate ? defaults.operatingConditions.flowRate.unit : 'm3/h' }
        },

        specifications: {}, // Will be populated dynamically

        design: {
            weight: { value: defaults.specifications.weight ? defaults.specifications.weight.value : 1000, unit: 'kg' },
            length: { value: 1000, unit: 'mm' }, // Placeholder
            width: { value: 1000, unit: 'mm' }, // Placeholder
            height: { value: 1000, unit: 'mm' }  // Placeholder
        },

        materials: {
            casing: defaults.materials.body,
            impeller: defaults.materials.internals,
            shaft: "SS 410",
            seals: "Mechanical Seal",
            gaskets: defaults.materials.gaskets,
            bolting: defaults.materials.bolting,
            baseplate: "Carbon Steel"
        },

        nozzles: defaults.nozzleTemplate.map((n, i) => ({
             id: n.id,
             name: n.service,
             service: n.service,
             size: n.size,
             rating: n.rating,
             facing: n.facing,
             position: "Standard"
        })),

        standards: defaults.standards,
        image_prompt: `High fidelity 3D render of a ${dexpiType} ${defaults.category}, industrial engineering style, white background`
    };

    // Populate specifications dynamically from defaults
    for (const [specKey, specVal] of Object.entries(defaults.specifications)) {
        // Map common spec names to schema names if needed
        let schemaKey = specKey;
        if (specKey === 'npshRequired') schemaKey = 'NPSHr';
        if (specKey === 'speed') schemaKey = 'rotationalSpeed';

        card.specifications[schemaKey] = {
            value: specVal.value,
            unit: specVal.unit
        };
    }

    // Ensure mandatory specifications from schema are present
    if (!card.specifications.power) card.specifications.power = { value: 10, unit: 'kW' };
    if (!card.specifications.rotationalSpeed) card.specifications.rotationalSpeed = { value: 1500, unit: 'rpm' };
    if (!card.specifications.efficiency) card.specifications.efficiency = { value: 75, unit: '%' };

    // Add specific fields for Pump if applicable
    if (defaults.category === 'Pump') {
         if (!card.specifications.head) card.specifications.head = { value: 50, unit: 'm' };
         if (!card.specifications.NPSHr) card.specifications.NPSHr = { value: 3, unit: 'm' };
    }

    card.specifications.dutyPoint = { value: "Continuous", unit: "" };

    return card;
}

const cards = [];
for (const [key, uri] of Object.entries(URIs)) {
    if (key.endsWith('_URI')) {
        try {
            const card = generateCard(key, uri as string);
            cards.push(card);
        } catch (e) {
            console.error(`Error generating card for ${key}:`, e);
        }
    }
}

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(cards, null, 2));
console.log(`Generated ${cards.length} equipment cards in ${OUTPUT_FILE}`);
