
import fs from 'fs';
import path from 'path';
import { ENERGY_SECTOR } from '../src/lib/sectors/energy';

const subSectorCode = 'ENER-OG';
const outputDir = path.join(__dirname, '../src/lib/resources');
const outputFile = path.join(outputDir, 'oil_gas_registry.json');

const subSector = ENERGY_SECTOR.subSectors.find(s => s.code === subSectorCode);

if (!subSector) {
    console.error(`Sub-sector ${subSectorCode} not found`);
    process.exit(1);
}

// Helper to infer tags from category/class
function inferTags(category: string, displayName: string, componentClass: string): string[] {
    const tags = new Set<string>();

    // Category tags
    if (category === 'rotating') tags.add('KINETIC');
    if (category === 'static') tags.add('STATIC');
    if (category === 'heat-transfer') tags.add('HEAT_TRANSFER');
    if (category === 'piping') tags.add('PIPING');
    if (category === 'instrumentation') tags.add('INSTRUMENTATION');
    if (category === 'electrical') tags.add('ELECTRICAL');

    // Keyword tags
    const name = displayName.toUpperCase();
    const cls = componentClass.toUpperCase();

    if (name.includes('PUMP') || cls.includes('PUMP')) tags.add('PUMP');
    if (name.includes('COMPRESSOR') || cls.includes('COMPRESSOR')) tags.add('COMPRESSOR');
    if (name.includes('TURBINE') || cls.includes('TURBINE')) tags.add('TURBINE');
    if (name.includes('TANK') || cls.includes('TANK')) tags.add('TANK');
    if (name.includes('VESSEL') || cls.includes('VESSEL')) tags.add('VESSEL');
    if (name.includes('COLUMN') || cls.includes('COLUMN')) tags.add('COLUMN');
    if (name.includes('HEAT EXCHANGER') || cls.includes('HEATEXCHANGER')) tags.add('EXCHANGER');
    if (name.includes('VALVE') || cls.includes('VALVE')) tags.add('VALVE');
    if (name.includes('METER') || cls.includes('METER')) tags.add('METER');
    if (name.includes('SENSOR') || cls.includes('SENSOR')) tags.add('SENSOR');
    if (name.includes('TRANSMITTER') || cls.includes('TRANSMITTER')) tags.add('TRANSMITTER');
    if (name.includes('ANALYZER') || cls.includes('ANALYZER')) tags.add('ANALYZER');
    if (name.includes('REACTOR') || cls.includes('REACTOR')) tags.add('REACTOR');

    return Array.from(tags);
}

const uniqueEquipment = new Map<string, any>();

subSector.facilities.forEach(fac => {
    fac.equipment.forEach(eq => {
        if (!uniqueEquipment.has(eq.displayName)) {
            uniqueEquipment.set(eq.displayName, {
                type: eq.displayName,
                category: eq.category,
                tags: inferTags(eq.category, eq.displayName, eq.componentClass),
                description: `Standard ${eq.displayName} used in ${fac.name}.`
            });
        }
    });
});

const equipmentList = Array.from(uniqueEquipment.values());

if (equipmentList.length < 50) {
    console.error(`Error: Only found ${equipmentList.length} unique equipment types. 50 required.`);
}

const registry = {
    sector: ENERGY_SECTOR.code,
    subSector: subSectorCode,
    equipment: equipmentList
};

if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(outputFile, JSON.stringify(registry, null, 2));

console.log(`Successfully wrote ${equipmentList.length} unique types to ${outputFile}`);
// console.log(JSON.stringify(registry, null, 2)); // Too verbose for logs, just count is enough
