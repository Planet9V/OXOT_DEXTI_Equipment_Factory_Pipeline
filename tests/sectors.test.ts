/**
 * Unit tests for the CISA sector taxonomy.
 *
 * Validates structural integrity, data completeness, and consistency
 * of all 16 CISA sectors.
 */

import {
    SECTORS,
    getAllSectors,
    getSectorByCode,
    getTotalSubSectors,
    getTotalFacilities,
    getTotalEquipmentTypes,
} from '@/lib/sectors';

describe('CISA Sector Taxonomy', () => {
    test('should have exactly 16 sectors', () => {
        expect(SECTORS).toHaveLength(16);
    });

    test('every sector should have a unique code', () => {
        const codes = SECTORS.map((s) => s.code);
        expect(new Set(codes).size).toBe(16);
    });

    test('every sector should have required fields', () => {
        for (const sector of SECTORS) {
            expect(sector.code).toBeTruthy();
            expect(sector.name).toBeTruthy();
            expect(sector.icon).toBeTruthy();
            expect(sector.description.length).toBeGreaterThan(20);
            expect(sector.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
            expect(sector.srma).toBeTruthy();
            expect(sector.subSectors.length).toBeGreaterThanOrEqual(1);
        }
    });

    test('every sub-sector should have at least one facility', () => {
        for (const sector of SECTORS) {
            for (const sub of sector.subSectors) {
                expect(sub.code).toBeTruthy();
                expect(sub.name).toBeTruthy();
                expect(sub.description).toBeTruthy();
                expect(sub.facilities.length).toBeGreaterThanOrEqual(1);
            }
        }
    });

    test('every facility should have at least one equipment entry', () => {
        for (const sector of SECTORS) {
            for (const sub of sector.subSectors) {
                for (const fac of sub.facilities) {
                    expect(fac.code).toBeTruthy();
                    expect(fac.name).toBeTruthy();
                    expect(fac.description).toBeTruthy();
                    expect(fac.equipment.length).toBeGreaterThanOrEqual(1);
                }
            }
        }
    });

    test('every equipment should have valid category and URI', () => {
        const validCategories = ['static', 'rotating', 'heat-transfer', 'electrical', 'piping', 'instrumentation'];
        for (const sector of SECTORS) {
            for (const sub of sector.subSectors) {
                for (const fac of sub.facilities) {
                    for (const eq of fac.equipment) {
                        expect(eq.componentClass).toBeTruthy();
                        expect(eq.componentClassURI).toMatch(/^http:\/\/(data\.posccaesar\.org|sandbox\.dexpi\.org)\/rdl\//);
                        expect(eq.displayName).toBeTruthy();
                        expect(validCategories).toContain(eq.category);
                        expect(eq.typicalQuantity.min).toBeLessThanOrEqual(eq.typicalQuantity.max);
                        expect(eq.typicalQuantity.min).toBeGreaterThanOrEqual(0);
                    }
                }
            }
        }
    });

    test('getAllSectors returns a deep clone', () => {
        const clone = getAllSectors();
        expect(clone).toHaveLength(16);
        expect(clone[0]).not.toBe(SECTORS[0]);
        expect(clone[0].name).toBe(SECTORS[0].name);
    });

    test('getSectorByCode finds existing sectors', () => {
        expect(getSectorByCode('ENER')?.name).toBe('Energy');
        expect(getSectorByCode('WATR')?.name).toBe('Water and Wastewater Systems');
        expect(getSectorByCode('INVALID')).toBeUndefined();
    });

    test('aggregate functions return positive numbers', () => {
        expect(getTotalSubSectors()).toBeGreaterThan(30);
        expect(getTotalFacilities()).toBeGreaterThan(30);
        expect(getTotalEquipmentTypes()).toBeGreaterThan(20);
    });

    test('all 16 official CISA sector names are represented', () => {
        const names = SECTORS.map((s) => s.name);
        expect(names).toContain('Chemical');
        expect(names).toContain('Commercial Facilities');
        expect(names).toContain('Communications');
        expect(names).toContain('Critical Manufacturing');
        expect(names).toContain('Dams');
        expect(names).toContain('Defense Industrial Base');
        expect(names).toContain('Emergency Services');
        expect(names).toContain('Energy');
        expect(names).toContain('Financial Services');
        expect(names).toContain('Food and Agriculture');
        expect(names).toContain('Government Facilities');
        expect(names).toContain('Healthcare and Public Health');
        expect(names).toContain('Information Technology');
        expect(names).toContain('Nuclear Reactors, Materials, and Waste');
        expect(names).toContain('Transportation Systems');
        expect(names).toContain('Water and Wastewater Systems');
    });
});
