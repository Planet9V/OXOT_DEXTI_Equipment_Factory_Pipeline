
import * as fs from 'fs';
import * as path from 'path';

describe('Nuclear Registry Validation', () => {
    const registryPath = path.join(__dirname, '../src/lib/resources/nuclear_registry.json');
    let registry: any;

    beforeAll(() => {
        if (fs.existsSync(registryPath)) {
            const content = fs.readFileSync(registryPath, 'utf-8');
            registry = JSON.parse(content);
        }
    });

    test('Registry file should exist', () => {
        expect(fs.existsSync(registryPath)).toBe(true);
    });

    test('Registry should have correct sector codes', () => {
        expect(registry.sector).toBe('NUCL');
        expect(registry.subSector).toBe('NUCL-ALL');
    });

    test('Registry should contain at least 50 unique equipment types', () => {
        expect(registry.equipment.length).toBeGreaterThanOrEqual(50);
    });

    test('All equipment items should have required fields', () => {
        registry.equipment.forEach((item: any) => {
            expect(item).toHaveProperty('type');
            expect(item).toHaveProperty('category');
            expect(item).toHaveProperty('tags');
            expect(item).toHaveProperty('description');

            expect(typeof item.type).toBe('string');
            expect(typeof item.category).toBe('string');
            expect(Array.isArray(item.tags)).toBe(true);
            expect(typeof item.description).toBe('string');
        });
    });

    test('Equipment types should be unique', () => {
        const types = registry.equipment.map((e: any) => e.type);
        const uniqueTypes = new Set(types);
        expect(uniqueTypes.size).toBe(types.length);
    });

    test('Categories should be valid', () => {
        const validCategories = ['static', 'rotating', 'mechanical', 'heat-transfer', 'piping', 'instrumentation', 'electrical'];
        registry.equipment.forEach((item: any) => {
            expect(validCategories).toContain(item.category);
        });
    });
});
