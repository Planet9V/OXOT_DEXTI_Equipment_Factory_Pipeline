
import { generateAllCards } from '../scripts/generate_dexpi_cards';

describe('DEXPI Equipment Card Generation', () => {
    let cards: any[];

    beforeAll(() => {
        cards = generateAllCards();
    });

    it('should generate a non-empty list of equipment cards', () => {
        expect(cards.length).toBeGreaterThan(0);
        console.log(`Generated ${cards.length} cards for verification.`);
    });

    it('should have all required fields in a sample card', () => {
        const card = cards[0];
        expect(card).toHaveProperty('tag');
        expect(card).toHaveProperty('name');
        expect(card).toHaveProperty('componentClass');
        expect(card).toHaveProperty('dexpiType');
        expect(card).toHaveProperty('rdlUri');
        expect(card).toHaveProperty('operatingConditions');
        expect(card).toHaveProperty('specifications');
        expect(card).toHaveProperty('design');
        expect(card).toHaveProperty('materials');
        expect(card).toHaveProperty('nozzles');
        expect(card).toHaveProperty('standards');
        expect(card).toHaveProperty('image_prompt');
    });

    it('should have valid nozzles for all cards', () => {
        cards.forEach(card => {
            expect(Array.isArray(card.nozzles)).toBe(true);
            expect(card.nozzles.length).toBeGreaterThan(0);
            card.nozzles.forEach((nozzle: any) => {
                expect(nozzle).toHaveProperty('id');
                expect(nozzle).toHaveProperty('name');
                expect(nozzle).toHaveProperty('service');
                expect(nozzle).toHaveProperty('size');
            });
        });
    });

    it('should have specific materials (not just "Steel")', () => {
        cards.forEach(card => {
            const materials = Object.values(card.materials);
            const hasGenericSteel = materials.some((m: any) => m === 'Steel');
            expect(hasGenericSteel).toBe(false);

            // Check for specific ASTM specs if applicable
            if (card.componentClass.includes('Pump')) {
                 expect(card.materials).toHaveProperty('casing');
                 expect(card.materials.casing).toContain('ASTM');
            }
        });
    });
});
