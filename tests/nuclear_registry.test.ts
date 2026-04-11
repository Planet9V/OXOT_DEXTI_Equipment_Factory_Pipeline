import * as fs from 'fs';
import * as path from 'path';

describe('Nuclear Equipment Registry', () => {
    const registryPath = path.join(__dirname, '../src/lib/resources/nuclear_registry.json');

    it('should exist', () => {
        expect(fs.existsSync(registryPath)).toBe(true);
    });

    it('should contain valid JSON with required fields', () => {
        const content = fs.readFileSync(registryPath, 'utf-8');
        const registry = JSON.parse(content);

        expect(registry).toHaveProperty('sector', 'NUCL');
        expect(Array.isArray(registry.equipment)).toBe(true);
    });

    it('should have at least 50 unique equipment types', () => {
        const content = fs.readFileSync(registryPath, 'utf-8');
        const registry = JSON.parse(content);

        const types = new Set(registry.equipment.map((e: any) => e.type));
        expect(types.size).toBeGreaterThanOrEqual(50);
    });
});
