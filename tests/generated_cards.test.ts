
import { generateAllCards } from '../scripts/generate_dexpi_cards';

describe('Generated Equipment Cards', () => {
    // Generate cards in memory
    const data = generateAllCards();

    it('should be a valid array with items', () => {
        expect(Array.isArray(data)).toBe(true);
        expect(data.length).toBeGreaterThan(0);
    });

    it('should have required DEXPI fields', () => {
        data.forEach((item: any) => {
            expect(item).toHaveProperty('tag');
            expect(item).toHaveProperty('name');
            expect(item).toHaveProperty('componentClass');
            expect(item).toHaveProperty('dexpiType');
            expect(item).toHaveProperty('rdlUri');
            expect(item).toHaveProperty('operatingConditions');
            expect(item).toHaveProperty('specifications');
            expect(item).toHaveProperty('design');
            expect(item).toHaveProperty('materials');
            expect(item).toHaveProperty('nozzles');
            expect(item).toHaveProperty('standards');
            expect(item).toHaveProperty('image_prompt');

            // Check nested
            expect(item.operatingConditions).toHaveProperty('pressureDesign');
            expect(Array.isArray(item.nozzles)).toBe(true);
            expect(Array.isArray(item.standards)).toBe(true);

            // Check new materials fields
            expect(item.materials).toHaveProperty('shaft');
            expect(item.materials).toHaveProperty('seals');
        });
    });
});
