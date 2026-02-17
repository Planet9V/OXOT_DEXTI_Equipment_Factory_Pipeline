import fs from 'fs';
import path from 'path';
import { ENERGY_SECTOR } from '../src/lib/sectors/energy';
import { getDefaults, REFERENCE_DEFAULTS } from '../src/lib/agents/reference-defaults';
import * as URI from '../src/lib/sectors/uris';

// Define the output interface based on User Schema
interface DexpiCard {
    tag: string;
    name: string;
    componentClass: string;
    dexpiType: string;
    rdlUri: string;
    description: string;
    operatingConditions: {
        pressureMax: { value: number; unit: string; source?: string };
        pressureMin: { value: number; unit: string };
        pressureDesign: { value: number; unit: string };
        pressureOperating: { value: number; unit: string };
        temperatureMax: { value: number; unit: string };
        temperatureMin: { value: number; unit: string };
        temperatureDesign: { value: number; unit: string };
        temperatureOperating: { value: number; unit: string };
        flowRateDesign: { value: number; unit: string };
        flowRateOperating: { value: number; unit: string };
    };
    specifications: Record<string, { value: number | string; unit: string; source?: string }>;
    design: {
        weight: { value: number; unit: string };
        length: { value: number; unit: string };
        width: { value: number; unit: string };
        height: { value: number; unit: string };
    };
    materials: Record<string, string>;
    nozzles: Array<{
        id: string;
        name: string;
        service: string;
        size: string;
        rating?: string;
        facing?: string;
        position?: string;
    }>;
    standards: string[];
    image_prompt: string;
}

// Helper to expand simplified materials into detailed schema
function expandMaterials(componentClass: string, defaults: any): Record<string, string> {
    const materials: Record<string, string> = {};
    const base = defaults.materials || {};

    // Assign base values
    materials['casing'] = base.body || 'Carbon Steel';

    // Component specific logic
    if (componentClass.toLowerCase().includes('pump')) {
        materials['impeller'] = base.internals || 'SS 316';
        materials['shaft'] = 'AISI 4140';
        materials['seals'] = 'Mechanical Seal (API 682)';
        materials['baseplate'] = 'Carbon Steel ASTM A36';
    } else if (componentClass.toLowerCase().includes('valve')) {
        materials['body'] = base.body;
        materials['trim'] = base.internals;
        materials['stem'] = 'SS 316';
        materials['seat'] = 'Stellite 6';
    } else if (['vessel', 'tank', 'column', 'reactor', 'separator', 'drum'].some(t => componentClass.toLowerCase().includes(t))) {
        materials['shell'] = base.body;
        materials['heads'] = base.body;
        materials['internals'] = base.internals;
        materials['supports'] = 'Carbon Steel';
    } else if (componentClass.toLowerCase().includes('heat exchanger') || componentClass.toLowerCase().includes('condenser') || componentClass.toLowerCase().includes('cooler')) {
        materials['shell'] = base.body;
        materials['tubes'] = base.internals;
        materials['tubeSheet'] = base.body; // Simplified
        materials['baffles'] = 'Carbon Steel';
    } else {
        // Generic fallback
        materials['body'] = base.body;
        materials['internals'] = base.internals;
    }

    materials['gaskets'] = base.gaskets || 'Spiral Wound SS/Graphite';
    materials['bolting'] = base.bolting || 'ASTM A193 B7';

    // Remove undefined values
    Object.keys(materials).forEach(key => materials[key] === undefined && delete materials[key]);

    return materials;
}

// Helper to generate nozzles
function generateNozzles(defaults: any): any[] {
    const template = defaults.nozzleTemplate || [];
    if (template.length === 0) {
        // Fallback nozzle if none defined
        return [{ id: 'N1', name: 'Connection', service: 'Process', size: '2"', rating: '150#', facing: 'RF', position: 'Standard' }];
    }
    return template.map((n: any) => ({
        id: n.id,
        name: n.service || n.id,
        service: n.service,
        size: n.size,
        rating: n.rating !== '-' ? n.rating : undefined,
        facing: n.facing !== '-' ? n.facing : undefined,
        position: 'Standard' // Placeholder
    }));
}

function generateImagePrompt(equipment: any): string {
    return `Detailed 3D engineering model of a ${equipment.displayName} (${equipment.componentClass}), industrial style, metallic textures, clear view of nozzles and connections, neutral background, high resolution, photorealistic.`;
}

function cleanUnit(u: string): string {
    if (!u) return '';
    if (u === 'barg') return 'bar';
    if (u === '°C') return 'C';
    return u;
}

function main() {
    const uniqueTypes = new Map<string, any>();

    // Collect unique types from Energy Sector
    ENERGY_SECTOR.subSectors.forEach(sub => {
        sub.facilities.forEach(fac => {
            fac.equipment.forEach(eq => {
                if (!uniqueTypes.has(eq.componentClass)) {
                    uniqueTypes.set(eq.componentClass, eq);
                }
            });
        });
    });

    const cards: DexpiCard[] = [];

    uniqueTypes.forEach((eq, type) => {
        const defaults = getDefaults(type);
        const op = defaults.operatingConditions || {
            designPressure: { min: 0, max: 10, typical: 5, unit: 'bar' },
            operatingPressure: { min: 0, max: 8, typical: 3, unit: 'bar' },
            designTemperature: { min: 0, max: 100, typical: 50, unit: 'C' },
            operatingTemperature: { min: 0, max: 80, typical: 40, unit: 'C' }
        };

        // Map operating conditions
        const operatingConditions = {
            pressureMax: { value: op.designPressure.max, unit: cleanUnit(op.designPressure.unit), source: 'API Limit' },
            pressureMin: { value: 0, unit: cleanUnit(op.designPressure.unit) },
            pressureDesign: { value: op.designPressure.typical, unit: cleanUnit(op.designPressure.unit) },
            pressureOperating: { value: op.operatingPressure.typical, unit: cleanUnit(op.operatingPressure.unit) },
            temperatureMax: { value: op.designTemperature.max, unit: cleanUnit(op.designTemperature.unit) },
            temperatureMin: { value: op.designTemperature.min, unit: cleanUnit(op.designTemperature.unit) },
            temperatureDesign: { value: op.designTemperature.typical, unit: cleanUnit(op.designTemperature.unit) },
            temperatureOperating: { value: op.operatingTemperature.typical, unit: cleanUnit(op.operatingTemperature.unit) },
            flowRateDesign: { value: op.flowRate ? op.flowRate.typical : 0, unit: op.flowRate ? cleanUnit(op.flowRate.unit) : 'm3/h' },
            flowRateOperating: { value: op.flowRate ? op.flowRate.typical * 0.8 : 0, unit: op.flowRate ? cleanUnit(op.flowRate.unit) : 'm3/h' }
        };

        // Map specifications with key renaming and source field
        const specifications: Record<string, any> = {};
        if (defaults.specifications) {
            for (const [key, spec] of Object.entries(defaults.specifications)) {
                let schemaKey = key;
                let source = 'Manufacturer Data';

                if (key === 'speed') {
                    schemaKey = 'rotationalSpeed';
                    source = 'IEC 60034';
                } else if (key === 'npshRequired') {
                    schemaKey = 'NPSHr';
                    source = 'Pump Curve';
                } else if (key === 'power') {
                    source = 'IEC 60034';
                } else if (key === 'efficiency') {
                    source = 'Performance Test';
                } else if (key === 'head') {
                    source = 'Hydraulic Design';
                } else if (key === 'capacity') {
                    // Sometimes capacity is flow rate, sometimes duty. Keep as is or map?
                    // Schema example for pump uses "flowRateDesign" in op conditions, but defaults puts capacity in specs.
                    // I will keep capacity in specs as well.
                }

                specifications[schemaKey] = {
                    value: spec.value,
                    unit: cleanUnit(spec.unit),
                    source: source
                };
            }
        }
        // Add Duty Point
        specifications['dutyPoint'] = { value: 'Continuous', unit: '' };

        // Mock mechanical design
        const design = {
            weight: { value: 1000, unit: 'kg' }, // Placeholder
            length: { value: 2000, unit: 'mm' },
            width: { value: 1000, unit: 'mm' },
            height: { value: 1500, unit: 'mm' }
        };

        // Expand materials
        const materials = expandMaterials(type, defaults);

        // Generate nozzles
        const nozzles = generateNozzles(defaults);

        const card: DexpiCard = {
            tag: `Generic-${type.toUpperCase()}-001`,
            name: eq.displayName,
            componentClass: type,
            dexpiType: type,
            rdlUri: eq.componentClassURI,
            description: `Standard ${eq.displayName} for industrial applications.`,
            operatingConditions,
            specifications,
            design,
            materials,
            nozzles,
            standards: defaults.standards || [],
            image_prompt: generateImagePrompt(eq)
        };

        cards.push(card);
    });

    const outputPath = path.join(__dirname, '../src/lib/resources/dexpi-equipment-cards.json');
    fs.writeFileSync(outputPath, JSON.stringify(cards, null, 2));
    console.log(`Generated ${cards.length} equipment cards at ${outputPath}`);
}

main();
