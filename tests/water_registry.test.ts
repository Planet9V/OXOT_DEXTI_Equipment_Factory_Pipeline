import fs from 'fs';
import path from 'path';

describe('Water Equipment Registry', () => {
    const registryPath = path.join(__dirname, '../src/lib/resources/water_registry.json');

    it('should exist', () => {
        expect(fs.existsSync(registryPath)).toBe(true);
    });

    it('should contain valid JSON with required fields', () => {
        const content = fs.readFileSync(registryPath, 'utf-8');
        const registry = JSON.parse(content);

        expect(registry).toHaveProperty('sector', 'WATR');
        expect(registry).toHaveProperty('subSector', 'WATR-ALL');
        expect(Array.isArray(registry.equipment)).toBe(true);
    });

    it('should have at least 50 unique equipment types', () => {
        const content = fs.readFileSync(registryPath, 'utf-8');
        const registry = JSON.parse(content);

        const types = new Set(registry.equipment.map((e: any) => e.type));
        expect(types.size).toBeGreaterThanOrEqual(50);
        expect(registry.equipment.length).toEqual(types.size); // Check for no duplicates
    });

    it('should have required fields in equipment items', () => {
        const content = fs.readFileSync(registryPath, 'utf-8');
        const registry = JSON.parse(content);

        registry.equipment.forEach((item: any) => {
            expect(item).toHaveProperty('type');
            expect(item).toHaveProperty('category');
            expect(item).toHaveProperty('tags');
            expect(Array.isArray(item.tags)).toBe(true);
            expect(item).toHaveProperty('description');
        });
    });

    it('should verify category validity', () => {
         const content = fs.readFileSync(registryPath, 'utf-8');
         const registry = JSON.parse(content);

         const validCategories = ['static', 'rotating', 'piping', 'instrumentation', 'electrical', 'heat-transfer'];

         registry.equipment.forEach((item: any) => {
             expect(validCategories).toContain(item.category);
         });
    });
});
