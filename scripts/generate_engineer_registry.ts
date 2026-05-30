import * as fs from 'fs';
import * as path from 'path';
import { getDefaults } from '../src/lib/agents/reference-defaults';

async function main() {
    const registryPath = path.join(__dirname, '../oil_and_gas_equipment_registry.json');
    const outputPath = path.join(__dirname, '../src/lib/resources/dexpi-equipment-cards.json');

    console.log(`Reading registry from ${registryPath}`);
    const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));

    const cards = [];

    let count = 1;

    for (const eq of registry.equipment) {
        let typeCode = "EQ";
        if (eq.tags && eq.tags.length > 0) {
            typeCode = eq.tags[0];
        }
        let tag = "Generic-" + typeCode + "-" + String(count).padStart(3, '0');

        let dexpiType = eq.type.replace(/\s+/g, '');

        // Get dynamic reference defaults for this equipment
        const defaults = getDefaults(dexpiType);

        // Map specs
        const specs: any = {};
        for (const [key, spec] of Object.entries(defaults.specifications)) {
            // Apply some variation based on typical value
            let val = spec.value;
            if (typeof val === 'number') {
                // Vary by up to 10%
                const factor = 0.9 + (Math.random() * 0.2);
                val = Math.round(val * factor * 10) / 10;
            }
            specs[key] = {
                value: val,
                unit: spec.unit
            };
        }

        // Add standard "power" and "efficiency" for electrical items
        if (eq.category === 'electrical' && !specs.power) {
            specs.power = { value: 250, unit: "kW" };
            specs.voltage = { value: 480, unit: "V" };
        }

        // Map conditions
        const oc = defaults.operatingConditions;
        const opPress = oc.operatingPressure.typical;
        const desPress = oc.designPressure.typical > opPress ? oc.designPressure.typical : Math.round(opPress * 1.1 * 10) / 10;
        const opTemp = oc.operatingTemperature.typical;
        const desTemp = oc.designTemperature.typical > opTemp ? oc.designTemperature.typical : Math.round(opTemp + 25);

        const operatingConditions: any = {
            pressureOperating: { value: opPress, unit: oc.operatingPressure.unit },
            pressureDesign: { value: desPress, unit: oc.designPressure.unit },
            pressureMin: { value: oc.operatingPressure.min, unit: oc.operatingPressure.unit },
            pressureMax: { value: oc.designPressure.max, unit: oc.designPressure.unit, source: "API Standard" },
            temperatureOperating: { value: opTemp, unit: oc.operatingTemperature.unit },
            temperatureDesign: { value: desTemp, unit: oc.designTemperature.unit },
            temperatureMin: { value: oc.operatingTemperature.min, unit: oc.operatingTemperature.unit },
            temperatureMax: { value: oc.designTemperature.max, unit: oc.designTemperature.unit },
        };

        if (oc.flowRate) {
            operatingConditions.flowRateOperating = { value: oc.flowRate.typical, unit: oc.flowRate.unit };
            operatingConditions.flowRateDesign = { value: Math.round(oc.flowRate.typical * 1.2), unit: oc.flowRate.unit };
        }

        // Convert nozzles format
        const nozzles = defaults.nozzleTemplate.map(n => ({
            id: n.id,
            name: n.service,
            service: n.service,
            size: n.size,
            rating: n.rating,
            facing: n.facing
        }));

        // Provide fallback nozzles if empty
        if (nozzles.length === 0) {
            nozzles.push({ id: "N1", name: "Inlet", service: "Inlet", size: "DN50", rating: "PN16", facing: "RF" });
        }

        let materials: any = {};
        if (defaults.materials) {
            materials = {
                casing: defaults.materials.body,
                internals: defaults.materials.internals,
                gaskets: defaults.materials.gaskets,
                bolting: defaults.materials.bolting
            };
        } else {
            materials = {
                casing: "ASTM A216 WCB",
                internals: "ASTM A743 CA6NM",
                gaskets: "Spiral Wound SS316/Graphite",
                bolting: "ASTM A193 B7"
            };
        }

        let card = {
            "tag": tag,
            "name": eq.type,
            "componentClass": eq.type,
            "dexpiType": dexpiType,
            "rdlUri": "http://data.posccaesar.org/rdl/RDS12345",
            "description": eq.description,
            "operatingConditions": operatingConditions,
            "specifications": specs,
            "design": {
                "weight": { "value": 1200, "unit": "kg" },
                "length": { "value": 1500, "unit": "mm" },
                "width": { "value": 800, "unit": "mm" },
                "height": { "value": 900, "unit": "mm" }
            },
            "materials": materials,
            "nozzles": nozzles,
            "standards": defaults.standards && defaults.standards.length > 0 ? defaults.standards : ["API 610", "ASME B73.1", "ISO 5199", "IEC 60034"],
            "image_prompt": "Detailed 3D industrial render of a " + eq.type + " used in oil and gas."
        };

        cards.push(card);
        count++;
    }

    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(outputPath, JSON.stringify(cards, null, 2), 'utf8');
    console.log(`Generated ${cards.length} cards to ${outputPath}`);
}
main().catch(console.error);