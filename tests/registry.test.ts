import fs from 'fs';
import path from 'path';

describe('Equipment Registry', () => {
    const resourcesDir = path.join(__dirname, '../src/lib/resources');
    const files = fs.readdirSync(resourcesDir).filter(f => f.endsWith('_registry.json'));

    files.forEach(file => {
        describe(`Registry: ${file}`, () => {
            const registryPath = path.join(resourcesDir, file);

            it('should exist', () => {
                expect(fs.existsSync(registryPath)).toBe(true);
            });

            it('should contain valid JSON with required fields', () => {
                const content = fs.readFileSync(registryPath, 'utf-8');
                const registry = JSON.parse(content);

                expect(registry).toHaveProperty('sector');
                expect(registry).toHaveProperty('subSector');
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
                    expect(item).toHaveProperty('category');
                    expect(item).toHaveProperty('tags');
                    expect(Array.isArray(item.tags)).toBe(true);
                    expect(item).toHaveProperty('description');
                });
            });
        });
    });
});
