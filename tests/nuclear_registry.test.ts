import { describe, it, expect, jest, beforeEach } from '@jest/globals';
const vi = jest;

import * as fs from 'fs';
import * as path from 'path';

/**
 * Validates the Nuclear sector equipment registry.
 *
 * @module tests/nuclear_registry.test
 */

describe('Nuclear Equipment Registry', () => {
    const registryPath = path.join(__dirname, '../src/lib/resources/nuclear_registry.json');
    let registryData: any;

    beforeEach(() => {
        if (fs.existsSync(registryPath)) {
            const rawData = fs.readFileSync(registryPath, 'utf8');
            registryData = JSON.parse(rawData);
        }
    });

    it('should exist', () => {
        expect(fs.existsSync(registryPath)).toBe(true);
    });

    it('should contain valid JSON with required fields', () => {
        expect(registryData).toBeDefined();
        expect(registryData).toHaveProperty('sector');
        expect(registryData.sector).toBe('NUCL');
        expect(registryData).toHaveProperty('subSector');
        expect(registryData).toHaveProperty('equipment');
        expect(Array.isArray(registryData.equipment)).toBe(true);
    });

    it('should have at least 50 unique equipment types', () => {
        expect(registryData.equipment.length).toBeGreaterThanOrEqual(50);

        const uniqueTypes = new Set(registryData.equipment.map((e: any) => e.type));
        expect(uniqueTypes.size).toBe(registryData.equipment.length);
    });

    it('should have required fields in equipment items', () => {
        const categories = new Set(['static', 'heat-transfer', 'rotating', 'mechanical', 'electrical', 'instrumentation', 'piping', 'package']);

        for (const item of registryData.equipment) {
            expect(item).toHaveProperty('type');
            expect(typeof item.type).toBe('string');
            expect(item.type.length).toBeGreaterThan(0);

            expect(item).toHaveProperty('category');
            expect(categories.has(item.category)).toBe(true);

            expect(item).toHaveProperty('tags');
            expect(Array.isArray(item.tags)).toBe(true);
            expect(item.tags.length).toBeGreaterThan(0);

            expect(item).toHaveProperty('description');
            expect(typeof item.description).toBe('string');
            expect(item.description.length).toBeGreaterThan(0);
        }
    });
});
