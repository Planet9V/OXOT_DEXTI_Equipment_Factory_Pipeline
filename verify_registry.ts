
import { CHEMICAL_SECTOR } from './src/lib/sectors/chemical';

const facility = CHEMICAL_SECTOR.subSectors
  .find(s => s.code === 'CHEM-BC')
  ?.facilities.find(f => f.code === 'CHEM-BC-PETRO');

if (!facility) {
  console.error('Facility not found');
  process.exit(1);
}

console.log(`Equipment count: ${facility.equipment.length}`);

const uniqueTypes = new Set(facility.equipment.map(e => e.componentClass));
console.log(`Unique types: ${uniqueTypes.size}`);

const registry = {
  sector: CHEMICAL_SECTOR.code,
  subSector: 'CHEM-BC',
  equipment: facility.equipment.map(e => ({
    type: e.componentClass, // Using componentClass as "type"
    category: e.category,
    tags: [e.displayName.toUpperCase().replace(/\s+/g, '_')], // Generating tags
    description: e.displayName // Using displayName as description since existing description is not per-equipment
  }))
};

console.log(JSON.stringify(registry, null, 2));
