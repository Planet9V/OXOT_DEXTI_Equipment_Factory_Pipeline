import * as fs from 'fs';
import * as path from 'path';

describe('Nuclear Sector Registry', () => {
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

        const types = new Set(registry.equipment.map((e: any) => e.type));
        expect(types.size).toBe(registry.equipment.length);
    });

    test('All equipment items should have required fields', () => {
        registry.equipment.forEach((item: any) => {
            expect(item).toHaveProperty('type');
            expect(typeof item.type).toBe('string');
            expect(item.type.length).toBeGreaterThan(0);

            expect(item).toHaveProperty('category');
            expect(['rotating', 'static', 'heat-transfer', 'piping', 'instrumentation', 'electrical']).toContain(item.category);

            expect(item).toHaveProperty('tags');
            expect(Array.isArray(item.tags)).toBe(true);
            expect(item.tags.length).toBeGreaterThan(0);

            expect(item).toHaveProperty('description');
            expect(typeof item.description).toBe('string');
            expect(item.description.length).toBeGreaterThan(0);
        });
    });
});
