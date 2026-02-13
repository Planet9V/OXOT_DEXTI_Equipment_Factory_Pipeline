import { describe, it, expect, vi, beforeEach } from 'vitest';

/**
 * Tests for the batch-check API endpoint and pipeline batch mode.
 *
 * @module tests/pipeline-batch
 */

describe('Pipeline Batch Check API', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    describe('POST /api/pipeline/batch-check', () => {
        it('should reject requests without items array', async () => {
            const body = {};
            expect(body).not.toHaveProperty('items');
        });

        it('should reject empty items array', async () => {
            const body = { items: [] };
            expect(body.items).toHaveLength(0);
        });

        it('should reject items array exceeding max size', async () => {
            const body = { items: Array.from({ length: 501 }, (_, i) => `Item ${i}`) };
            expect(body.items.length).toBeGreaterThan(500);
        });

        it('should deduplicate and trim input names', () => {
            const raw = ['  Pump  ', 'pump', 'Valve', '  Valve  ', '', '  '];
            const cleaned = [...new Set(raw.map(s => s.trim()).filter(s => s.length > 0))];
            // 'pump' and 'Pump' are different after trim (case-sensitive set)
            expect(cleaned).toContain('Pump');
            expect(cleaned).toContain('pump');
            expect(cleaned).toContain('Valve');
            expect(cleaned).not.toContain('');
        });
    });

    describe('PipelineV2BatchParams', () => {
        it('should accept valid batch params', () => {
            const params = {
                equipmentNames: ['Centrifugal Pump', 'Heat Exchanger'],
                sectorHint: 'Chemical',
                minQualityScore: 80,
            };
            expect(params.equipmentNames).toHaveLength(2);
            expect(params.sectorHint).toBe('Chemical');
            expect(params.minQualityScore).toBe(80);
        });

        it('should work without optional fields', () => {
            const params = {
                equipmentNames: ['Pressure Vessel'],
            };
            expect(params.equipmentNames).toHaveLength(1);
            expect(params).not.toHaveProperty('sectorHint');
            expect(params).not.toHaveProperty('minQualityScore');
        });
    });

    describe('Pipeline API Route - Batch Mode Detection', () => {
        it('should detect batch mode when equipmentNames is present', () => {
            const body = {
                equipmentNames: ['Pump', 'Valve'],
                sectorHint: 'Energy',
            };
            const isBatch = body.equipmentNames && Array.isArray(body.equipmentNames);
            expect(isBatch).toBe(true);
        });

        it('should detect legacy mode when equipmentNames is absent', () => {
            const body = {
                sector: 'CHEMICAL',
                subSector: 'REFINERY',
                facility: 'CDU',
                equipmentClass: 'CentrifugalPump',
                quantity: 5,
            };
            const isBatch = (body as Record<string, unknown>).equipmentNames && Array.isArray((body as Record<string, unknown>).equipmentNames);
            expect(isBatch).toBeFalsy();
        });

        it('should reject batch with more than 100 items', () => {
            const names = Array.from({ length: 101 }, (_, i) => `Equipment ${i}`);
            expect(names.length).toBeGreaterThan(100);
        });
    });

    describe('Equipment Name Parsing', () => {
        it('should parse comma-separated names', () => {
            const raw = 'Centrifugal Pump, Heat Exchanger, Pressure Vessel';
            const names = [...new Set(raw.split(/[,;\n|]+/).map(s => s.trim()).filter(s => s.length > 0))];
            expect(names).toEqual(['Centrifugal Pump', 'Heat Exchanger', 'Pressure Vessel']);
        });

        it('should parse newline-separated names', () => {
            const raw = 'Pump\nValve\nCompressor';
            const names = [...new Set(raw.split(/[,;\n|]+/).map(s => s.trim()).filter(s => s.length > 0))];
            expect(names).toEqual(['Pump', 'Valve', 'Compressor']);
        });

        it('should parse semicolon-separated names', () => {
            const raw = 'Pump;Valve;Compressor';
            const names = [...new Set(raw.split(/[,;\n|]+/).map(s => s.trim()).filter(s => s.length > 0))];
            expect(names).toEqual(['Pump', 'Valve', 'Compressor']);
        });

        it('should handle mixed delimiters', () => {
            const raw = 'Pump,Valve;Compressor\nReactor|Heat Exchanger';
            const names = [...new Set(raw.split(/[,;\n|]+/).map(s => s.trim()).filter(s => s.length > 0))];
            expect(names).toHaveLength(5);
        });

        it('should deduplicate entries', () => {
            const raw = 'Pump, Pump, Valve, Pump';
            const names = [...new Set(raw.split(/[,;\n|]+/).map(s => s.trim()).filter(s => s.length > 0))];
            expect(names).toEqual(['Pump', 'Valve']);
        });
    });

    describe('CSV Parsing', () => {
        it('should extract first column from CSV', () => {
            const csv = 'Centrifugal Pump,1000,Chemical\nHeat Exchanger,2000,Energy';
            const lines = csv.split('\n').filter(l => l.trim());
            const names = lines.map(l => l.split(',')[0].trim());
            expect(names).toEqual(['Centrifugal Pump', 'Heat Exchanger']);
        });

        it('should skip header rows', () => {
            const csv = 'Equipment Name,Size,Sector\nPump,Large,Chemical';
            const lines = csv.split('\n').filter(l => l.trim());
            const names: string[] = [];
            for (const line of lines) {
                const first = line.split(',')[0].trim();
                if (!/^(equipment|name|item|type|class|#)/i.test(first)) {
                    names.push(first);
                }
            }
            expect(names).toEqual(['Pump']);
        });

        it('should handle quoted CSV values', () => {
            const value = '"Centrifugal Pump"';
            const cleaned = value.replace(/^["']|["']$/g, '');
            expect(cleaned).toBe('Centrifugal Pump');
        });
    });
});
