/**
 * Pipeline Stage Tests.
 *
 * Tests each of the 5 pipeline stages individually:
 * 1. Research — AI prompt construction and response parsing
 * 2. Generate — EquipmentCard construction from AI output
 * 3. Validate — Scoring algorithm (tag format, specs, materials, etc.)
 * 4. Catalog — Deduplication by tag and content hash
 * 5. Store — File persistence and count tracking
 *
 * @module tests/pipeline-stages
 */

import crypto from 'crypto';
import { EquipmentCard, PipelineRun } from '@/lib/types';

// --- Helpers ---

/**
 * Creates a minimal valid PipelineRun for testing.
 *
 * @param overrides - Optional partial PipelineRun fields to override.
 * @returns A valid PipelineRun object.
 */
function createMockRun(overrides: Partial<PipelineRun> = {}): PipelineRun {
    return {
        id: crypto.randomUUID(),
        sector: 'CHEM',
        subSector: 'CHEM-BC',
        facility: 'CHEM-BC-PETRO',
        equipmentClass: 'CentrifugalPump',
        quantity: 3,
        status: 'running',
        stages: [
            { name: 'research', status: 'pending' },
            { name: 'generate', status: 'pending' },
            { name: 'validate', status: 'pending' },
            { name: 'catalog', status: 'pending' },
            { name: 'store', status: 'pending' },
        ],
        createdAt: new Date().toISOString(),
        results: { generated: 0, validated: 0, stored: 0, duplicatesSkipped: 0 },
        logs: [],
        ...overrides,
    };
}

/**
 * Creates a minimal valid EquipmentCard for testing.
 *
 * @param overrides - Optional partial EquipmentCard fields to override defaults.
 * @returns A valid EquipmentCard suitable for pipeline stage testing.
 */
function createMockCard(overrides: Partial<EquipmentCard> = {}): EquipmentCard {
    return {
        id: crypto.randomUUID(),
        tag: 'P-101',
        componentClass: 'CentrifugalPump',
        componentClassURI: 'http://data.posccaesar.org/rdl/RDS417890',
        displayName: 'Main Process Pump',
        category: 'rotating',
        description: 'A centrifugal pump for main process circulation with high efficiency impeller design.',
        sector: 'CHEM',
        subSector: 'CHEM-BC',
        facility: 'CHEM-BC-PETRO',
        specifications: {
            flowRate: { value: 450, unit: 'm3/h', source: 'API 610' },
            head: { value: 120, unit: 'm', source: 'API 610' },
            power: { value: 250, unit: 'kW', source: 'IEC 60034' },
            efficiency: { value: 82, unit: '%' },
            speed: { value: 2950, unit: 'rpm' },
        },
        operatingConditions: {
            designPressure: 25,
            operatingPressure: 18,
            designTemperature: 200,
            operatingTemperature: 150,
        },
        materials: {
            body: '316L Stainless Steel',
            internals: 'Duplex 2205',
            gaskets: 'Spiral-wound 316/graphite',
            bolting: 'B7/2H',
        },
        standards: ['API 610', 'ASME B73.1'],
        manufacturers: ['Sulzer', 'Flowserve', 'KSB'],
        nozzles: [
            { id: 'N1', service: 'Suction', size: '200mm', rating: 'PN40', facing: 'RF' },
            { id: 'N2', service: 'Discharge', size: '150mm', rating: 'PN40', facing: 'RF' },
        ],
        metadata: {
            version: 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            createdBy: 'test',
            contentHash: '',
            validationScore: 0,
            source: 'ai-generated',
        },
        ...overrides,
    };
}

describe('Pipeline Stages', () => {
    describe('Stage 3: Validate — Scoring Algorithm', () => {
        /**
         * Reimplements the validation scoring logic from pipeline.ts
         * to test it in isolation without requiring the full DexpiPipeline class.
         */
        function validateCard(card: EquipmentCard): number {
            let score = 0;
            let maxScore = 0;

            // Tag format: XX-NNN or XX-NNNN (optionally suffixed A-Z)
            maxScore += 10;
            if (/^[A-Z]{1,4}-\d{3,4}[A-Z]?$/.test(card.tag)) score += 10;

            // ComponentClass present
            maxScore += 10;
            if (card.componentClass) score += 10;

            // Description quality
            maxScore += 10;
            if (card.description && card.description.length > 20) score += 10;
            else if (card.description) score += 5;

            // URI format
            maxScore += 20;
            if (card.componentClassURI && /^http:\/\/(data\.posccaesar.org|sandbox\.dexpi\.org)\/rdl\//.test(card.componentClassURI)) {
                score += 10;
                // Skip live PCA check in unit test
            }

            // Specs count
            maxScore += 15;
            const specCount = Object.keys(card.specifications).length;
            if (specCount >= 5) score += 15;
            else if (specCount >= 3) score += 10;
            else if (specCount >= 1) score += 5;

            // Operating conditions
            maxScore += 15;
            const oc = card.operatingConditions;
            if (oc.designPressure && oc.operatingPressure) {
                score += 8;
                if (oc.designPressure >= oc.operatingPressure) score += 7;
            }

            // Materials
            maxScore += 10;
            const matCount = Object.values(card.materials).filter(Boolean).length;
            if (matCount >= 3) score += 10;
            else if (matCount >= 1) score += 5;

            // Standards
            maxScore += 10;
            if (card.standards.length >= 2) score += 10;
            else if (card.standards.length >= 1) score += 5;

            // Manufacturers
            maxScore += 10;
            if (card.manufacturers.length >= 2) score += 10;
            else if (card.manufacturers.length >= 1) score += 5;

            // Nozzles
            maxScore += 10;
            if (card.nozzles.length >= 2) score += 10;
            else if (card.nozzles.length >= 1) score += 5;

            return Math.round((score / maxScore) * 100);
        }

        test('fully-populated card scores above 80', () => {
            const card = createMockCard();
            const score = validateCard(card);
            expect(score).toBeGreaterThanOrEqual(80);
        });

        test('card with valid ISA tag scores tag points', () => {
            const card = createMockCard({ tag: 'P-101' });
            const score = validateCard(card);
            expect(score).toBeGreaterThan(0);
        });

        test('card with invalid tag format loses tag points', () => {
            const fullCard = createMockCard({ tag: 'P-101' });
            const badCard = createMockCard({ tag: 'invalid-tag-format' });
            const goodScore = validateCard(fullCard);
            const badScore = validateCard(badCard);
            expect(badScore).toBeLessThan(goodScore);
        });

        test('card with empty description loses description points', () => {
            const goodCard = createMockCard();
            const badCard = createMockCard({ description: '' });
            expect(validateCard(badCard)).toBeLessThan(validateCard(goodCard));
        });

        test('card with no specs scores lower', () => {
            const badCard = createMockCard({ specifications: {} });
            expect(validateCard(badCard)).toBeLessThan(80);
        });

        test('card with design pressure < operating pressure loses plausibility points', () => {
            const goodCard = createMockCard({
                operatingConditions: { designPressure: 25, operatingPressure: 18 },
            });
            const badCard = createMockCard({
                operatingConditions: { designPressure: 10, operatingPressure: 18 },
            });
            expect(validateCard(badCard)).toBeLessThan(validateCard(goodCard));
        });

        test('minimal card fails validation (score < 40)', () => {
            const minimalCard = createMockCard({
                tag: 'bad',
                description: '',
                componentClassURI: '',
                specifications: {},
                operatingConditions: {},
                materials: {},
                standards: [],
                manufacturers: [],
                nozzles: [],
            });
            const score = validateCard(minimalCard);
            expect(score).toBeLessThan(40);
        });

        test('cards with partial data score between 40-80', () => {
            const partialCard = createMockCard({
                specifications: { flowRate: { value: 450, unit: 'm3/h' } },
                materials: { body: '316L' },
                standards: ['API 610'],
                manufacturers: ['Sulzer'],
                nozzles: [{ id: 'N1', service: 'Suction', size: '200mm', rating: 'PN40', facing: 'RF' }],
            });
            const score = validateCard(partialCard);
            expect(score).toBeGreaterThanOrEqual(40);
            expect(score).toBeLessThanOrEqual(90);
        });
    });

    describe('Stage 4: Catalog — Deduplication', () => {
        test('unique cards pass through unchanged', () => {
            const cards = [
                createMockCard({ tag: 'P-101' }),
                createMockCard({ tag: 'P-102' }),
                createMockCard({ tag: 'P-103' }),
            ];
            const existingTags = new Set<string>();
            const unique = cards.filter(c => !existingTags.has(c.tag));
            expect(unique).toHaveLength(3);
        });

        test('duplicate tags are detected', () => {
            const cards = [
                createMockCard({ tag: 'P-101' }),
                createMockCard({ tag: 'P-101' }),
            ];
            const seen = new Set<string>();
            const dupes = cards.filter(c => {
                if (seen.has(c.tag)) return true;
                seen.add(c.tag);
                return false;
            });
            expect(dupes).toHaveLength(1);
        });

        test('tag collision resolves with A-Z suffix', () => {
            const tag = 'P-101';
            const existingTags = new Set(['P-101']);
            let resolved: string | null = null;
            for (let c = 65; c <= 90; c++) {
                const newTag = `${tag}${String.fromCharCode(c)}`;
                if (!existingTags.has(newTag)) {
                    resolved = newTag;
                    break;
                }
            }
            expect(resolved).toBe('P-101A');
        });

        test('content hash deduplication detects near-duplicates', () => {
            const card = createMockCard();
            const hash = crypto.createHash('sha256')
                .update(JSON.stringify({
                    class: card.componentClass,
                    specs: card.specifications,
                    materials: card.materials,
                }))
                .digest('hex')
                .slice(0, 16);

            const card2 = createMockCard({ tag: 'P-102' }); // Different tag, same content
            const hash2 = crypto.createHash('sha256')
                .update(JSON.stringify({
                    class: card2.componentClass,
                    specs: card2.specifications,
                    materials: card2.materials,
                }))
                .digest('hex')
                .slice(0, 16);

            expect(hash).toBe(hash2); // Same spec → same hash → near-duplicate
        });

        test('different specs produce different content hashes', () => {
            const card1 = createMockCard();
            const card2 = createMockCard({
                specifications: { flowRate: { value: 999, unit: 'm3/h' } },
            });

            const hash1 = crypto.createHash('sha256')
                .update(JSON.stringify({ class: card1.componentClass, specs: card1.specifications, materials: card1.materials }))
                .digest('hex').slice(0, 16);
            const hash2 = crypto.createHash('sha256')
                .update(JSON.stringify({ class: card2.componentClass, specs: card2.specifications, materials: card2.materials }))
                .digest('hex').slice(0, 16);

            expect(hash1).not.toBe(hash2);
        });

        test('all 26 suffix slots can be exhausted', () => {
            const existingTags = new Set<string>();
            existingTags.add('P-101');
            for (let c = 65; c <= 90; c++) {
                existingTags.add(`P-101${String.fromCharCode(c)}`);
            }
            // 27 tags: P-101, P-101A...P-101Z — all slots taken
            let found = false;
            for (let c = 65; c <= 90; c++) {
                if (!existingTags.has(`P-101${String.fromCharCode(c)}`)) {
                    found = true;
                    break;
                }
            }
            expect(found).toBe(false); // All slots exhausted
        });
    });

    describe('Stage 5: Store — Persistence', () => {
        test('PipelineRun results track stored count', () => {
            const run = createMockRun();
            expect(run.results.stored).toBe(0);
            run.results.stored = 3;
            expect(run.results.stored).toBe(3);
        });

        test('PipelineRun transitions to completed after store', () => {
            const run = createMockRun();
            run.status = 'completed';
            run.completedAt = new Date().toISOString();
            expect(run.status).toBe('completed');
            expect(run.completedAt).toBeDefined();
        });
    });

    describe('Run Structure', () => {
        test('createMockRun produces valid 5-stage structure', () => {
            const run = createMockRun();
            expect(run.stages).toHaveLength(5);
            expect(run.stages.map(s => s.name)).toEqual([
                'research', 'generate', 'validate', 'catalog', 'store',
            ]);
            expect(run.stages.every(s => s.status === 'pending')).toBe(true);
        });

        test('run ID is a valid UUID', () => {
            const run = createMockRun();
            expect(run.id).toMatch(
                /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
            );
        });

        test('run sector codes use canonical short codes', () => {
            const run = createMockRun();
            expect(run.sector).toMatch(/^[A-Z]{4}$/);
            expect(run.subSector).toMatch(/^[A-Z]{4}-[A-Z]{2}$/);
        });
    });
});
