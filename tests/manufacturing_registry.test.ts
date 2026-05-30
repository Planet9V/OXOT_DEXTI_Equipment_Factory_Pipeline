import fs from 'fs';
import path from 'path';

describe('Manufacturing Equipment Registry', () => {
    const registryPath = path.join(__dirname, '../src/lib/resources/manufacturing_registry.json');

    it('should exist', () => {
        expect(fs.existsSync(registryPath)).toBe(true);
    });

    it('should contain valid JSON with required fields', () => {
        const content = fs.readFileSync(registryPath, 'utf-8');
        const registry = JSON.parse(content);

        expect(registry).toHaveProperty('sector', 'CMAN');
        expect(registry).toHaveProperty('subSector', 'CMAN-ALL');
        expect(Array.isArray(registry.equipment)).toBe(true);
    });

    it('should have at least 50 unique equipment types', () => {
        const content = fs.readFileSync(registryPath, 'utf-8');
        const registry = JSON.parse(content);

        const types = new Set(registry.equipment.map((e: any) => e.type));
        expect(types.size).toBeGreaterThanOrEqual(50);
    });

    it('should have required fields in equipment items', () => {
        const content = fs.readFileSync(registryPath, 'utf-8');
        const registry = JSON.parse(content);

        registry.equipment.forEach((item: any) => {
            expect(item).toHaveProperty('type');
            expect(typeof item.type).toBe('string');
            expect(item).toHaveProperty('category');
            expect(typeof item.category).toBe('string');
            expect(item).toHaveProperty('tags');
            expect(Array.isArray(item.tags)).toBe(true);
            expect(item).toHaveProperty('description');
            expect(typeof item.description).toBe('string');
        });
    });

    it('should categorize equipment correctly', () => {
        const content = fs.readFileSync(registryPath, 'utf-8');
        const registry = JSON.parse(content);

        const categories = new Set(registry.equipment.map((e: any) => e.category));

        // Check for expected categories based on script
        expect(categories.has('static')).toBe(true);
        expect(categories.has('rotating')).toBe(true);
        expect(categories.has('heat-transfer')).toBe(true);
        expect(categories.has('electrical')).toBe(true);
        expect(categories.has('instrumentation')).toBe(true);
    });
});
