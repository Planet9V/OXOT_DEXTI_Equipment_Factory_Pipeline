/**
 * DEXPI XML Export Module — Test Suite.
 *
 * @module tests/dexpi-export
 */
import {
    escapeXml,
    nozzleToXml,
    equipmentToXml,
    cardsToPlantModelXml,
    cardsToJsonExport,
    validateForExport,
    getExportSummary,
} from '../src/lib/dexpi-export';
import { EquipmentCard, NozzleSpec } from '../src/lib/types';

const mockNozzle: NozzleSpec = {
    id: 'N1',
    size: '4"',
    rating: '150#',
    facing: 'RF',
    service: 'Process Inlet',
};

function createMockCard(overrides: Partial<EquipmentCard> = {}): EquipmentCard {
    return {
        id: 'eq-001',
        tag: 'E-101',
        componentClass: 'ShellTubeHeatExchanger',
        componentClassURI: 'http://data.posccaesar.org/rdl/RDS304199',
        displayName: 'Feed/Effluent Exchanger',
        category: 'heat-transfer',
        description: 'Shell and tube heat exchanger.',
        sector: 'ENER',
        subSector: 'OIL_GAS',
        facility: 'REFINERY',
        specifications: {
            ShellDiameter: { value: '36', unit: 'in' },
        },
        operatingConditions: {
            designPressure: 150,
            designTemperature: 750,
            units: { designPressure: 'psig', designTemperature: '°F' },
        },
        materials: { body: '316L SS', internals: 'Inconel 625' },
        standards: ['API 660', 'ASME VIII'],
        manufacturers: ['Alfa Laval'],
        nozzles: [mockNozzle],
        metadata: {
            version: 1,
            createdAt: '2026-01-01T00:00:00Z',
            updatedAt: '2026-01-01T00:00:00Z',
            createdBy: 'test',
            contentHash: 'abc123',
            validationScore: 0.95,
            source: 'ai-generated',
        },
        ...overrides,
    };
}

describe('escapeXml', () => {
    test('escapes all 5 XML entities', () => {
        const r = escapeXml('A&B <C> "D" \'E\'');
        expect(r).toContain('&amp;');
        expect(r).toContain('&lt;');
        expect(r).toContain('&gt;');
        expect(r).toContain('&quot;');
        expect(r).toContain('&apos;');
    });

    test('returns empty string for empty input', () => {
        expect(escapeXml('')).toBe('');
    });
});

describe('nozzleToXml', () => {
    test('generates Nozzle element with attributes', () => {
        const xml = nozzleToXml(mockNozzle);
        expect(xml).toContain('<Nozzle');
        expect(xml).toContain('ID="N1"');
        expect(xml).toContain('NominalDiameter');
        expect(xml).toContain('PressureRating');
    });

    test('self-closing for empty nozzle', () => {
        const n: NozzleSpec = { id: 'N2', size: '', rating: '', facing: '', service: '' };
        const xml = nozzleToXml(n);
        expect(xml).toContain('/>');
    });
});

describe('equipmentToXml', () => {
    test('generates Equipment with all sections', () => {
        const xml = equipmentToXml(createMockCard());
        expect(xml).toContain('ComponentClass="ShellTubeHeatExchanger"');
        expect(xml).toContain('ComponentClassURI=');
        expect(xml).toContain('TagName="E-101"');
        expect(xml).toContain('Set="DexpiEquipmentAttributes"');
        expect(xml).toContain('Set="OperatingConditions"');
        expect(xml).toContain('Set="MaterialSpecification"');
        expect(xml).toContain('Set="StandardsConformance"');
        expect(xml).toContain('Set="ManufacturerInfo"');
        expect(xml).toContain('<Nozzle');
        expect(xml).toContain('</Equipment>');
    });

    test('omits empty sections', () => {
        const xml = equipmentToXml(createMockCard({ specifications: {}, nozzles: [] }));
        expect(xml).not.toContain('Set="DexpiEquipmentAttributes"');
        expect(xml).not.toContain('<Nozzle');
    });
});

describe('cardsToPlantModelXml', () => {
    test('wraps equipment in PlantModel', () => {
        const xml = cardsToPlantModelXml([createMockCard()], {
            facilityCode: 'REF', sectorCode: 'ENER', subSectorCode: 'OG',
            date: '2026-01-01', time: '12:00:00',
        });
        expect(xml).toContain('<?xml version="1.0"');
        expect(xml).toContain('<PlantModel');
        expect(xml).toContain('SchemaVersion="3.2.0"');
        expect(xml).toContain('</PlantModel>');
    });

    test('handles empty array', () => {
        const xml = cardsToPlantModelXml([], {
            facilityCode: 'X', sectorCode: 'Y', subSectorCode: 'Z',
        });
        expect(xml).toContain('Equipment Count: 0');
    });
});

describe('cardsToJsonExport', () => {
    test('produces valid JSON with metadata', () => {
        const json = cardsToJsonExport([createMockCard()], {
            facilityCode: 'REF', sectorCode: 'ENER', subSectorCode: 'OG',
        });
        const parsed = JSON.parse(json);
        expect(parsed.exportMetadata.format).toBe('DEXPI-JSON');
        expect(parsed.equipment).toHaveLength(1);
    });
});

describe('validateForExport', () => {
    test('valid for complete card', () => {
        expect(validateForExport(createMockCard()).valid).toBe(true);
    });

    test('detects missing fields', () => {
        const r = validateForExport(createMockCard({ id: '', tag: '' }));
        expect(r.valid).toBe(false);
        expect(r.errors.length).toBeGreaterThanOrEqual(2);
    });

    test('detects invalid URI', () => {
        const r = validateForExport(createMockCard({ componentClassURI: 'bad' }));
        expect(r.valid).toBe(false);
    });
});

describe('getExportSummary', () => {
    test('calculates correct stats', () => {
        const cards = [
            createMockCard({ id: 'a', category: 'heat-transfer' }),
            createMockCard({ id: 'b', category: 'rotating', componentClass: 'Pump' }),
            createMockCard({ id: '', tag: '' }),
        ];
        const s = getExportSummary(cards);
        expect(s.totalCards).toBe(3);
        expect(s.validCards).toBe(2);
        expect(s.invalidCards).toBe(1);
    });
});
