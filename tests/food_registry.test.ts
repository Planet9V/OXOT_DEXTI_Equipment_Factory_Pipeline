import fs from 'fs';
import path from 'path';

describe('Food Equipment Registry', () => {
  const registryPath = path.join(process.cwd(), 'food_equipment_registry.json');

  test('registry file should exist', () => {
    expect(fs.existsSync(registryPath)).toBe(true);
  });

  test('registry should contain valid JSON', () => {
    const content = fs.readFileSync(registryPath, 'utf-8');
    expect(() => JSON.parse(content)).not.toThrow();
  });

  test('registry should have correct sector and subsector', () => {
    const content = fs.readFileSync(registryPath, 'utf-8');
    const registry = JSON.parse(content);
    expect(registry.sector).toBe('FOOD');
    expect(registry.subSector).toBe('FOOD-FP');
  });

  test('registry should contain at least 50 unique equipment types', () => {
    const content = fs.readFileSync(registryPath, 'utf-8');
    const registry = JSON.parse(content);
    expect(registry.equipment.length).toBeGreaterThanOrEqual(50);

    const types = registry.equipment.map((e: any) => e.type);
    const uniqueTypes = new Set(types);
    expect(uniqueTypes.size).toBe(registry.equipment.length);
  });

  test('each equipment item should have required fields', () => {
    const content = fs.readFileSync(registryPath, 'utf-8');
    const registry = JSON.parse(content);

    registry.equipment.forEach((item: any) => {
      expect(item.type).toBeTruthy();
      expect(typeof item.type).toBe('string');

      expect(item.category).toBeTruthy();
      expect(typeof item.category).toBe('string');

      expect(item.tags).toBeTruthy();
      expect(Array.isArray(item.tags)).toBe(true);
      expect(item.tags.length).toBeGreaterThan(0);

      expect(item.description).toBeTruthy();
      expect(typeof item.description).toBe('string');
    });
  });
});
