/**
 * Unit Tests for Specialist Agents.
 *
 * Tests the deterministic specialist agents: ComplianceAgent (rule engine),
 * QualityGateAgent (10-dimension scoring), EnrichmentAgent (field backfill),
 * and AuditLogger (hash chain integrity).
 *
 * @module tests/agents
 */

import { describe, it, expect, beforeEach } from '@jest/globals';
import { AuditLogger } from '@/lib/agents/audit-logger';
import { ComplianceAgent } from '@/lib/agents/specialist/compliance-agent';
import { QualityGateAgent, type QualityGateInput } from '@/lib/agents/specialist/quality-gate-agent';
import { EnrichmentAgent, type EnrichmentInput } from '@/lib/agents/specialist/enrichment-agent';
import type { EquipmentCard } from '@/lib/types';
import type { ResearchReport } from '@/lib/agents/types';

/* ─── Test Fixtures ─────────────────────────────────────────────────────── */

/**
 * Creates a minimal valid equipment card for testing.
 *
 * @param overrides - Optional field overrides.
 * @returns A test equipment card.
 */
function createTestCard(overrides: Partial<EquipmentCard> = {}): EquipmentCard {
    return {
        tag: 'P-1001',
        componentClass: 'CentrifugalPump',
        componentClassURI: 'http://data.posccaesar.org/rdl/RDS1234',
        displayName: 'Process Feed Pump P-1001',
        category: 'Rotating Equipment',
        description: 'Centrifugal pump for process feed service in refinery crude distillation unit, ASME B73.1 compliant.',
        sector: 'CHEM',
        subSector: 'PETRO',
        facility: 'REFINERY-01',
        specifications: {
            capacity: { value: 500, unit: 'm³/h' },
            head: { value: 120, unit: 'm' },
            power: { value: 250, unit: 'kW' },
            efficiency: { value: 82, unit: '%' },
            npshRequired: { value: 3.5, unit: 'm' },
        },
        operatingConditions: {
            designPressure: 25,
            operatingPressure: 18,
            designTemperature: 200,
            operatingTemperature: 150,
            flowRate: 500,
        },
        materials: {
            body: 'ASTM A216 WCB',
            internals: 'AISI 316L',
            gaskets: 'Spiral-wound PTFE',
            bolting: 'ASTM A193 B7',
        },
        standards: ['ASME B73.1', 'API 610', 'ISO 5199'],
        manufacturers: ['Sulzer', 'KSB', 'Flowserve'],
        nozzles: [
            { id: 'N1', size: '6" 150#', rating: 'ANSI 150', facing: 'RF', service: 'Suction' },
            { id: 'N2', size: '4" 300#', rating: 'ANSI 300', facing: 'RF', service: 'Discharge' },
        ],
        metadata: {
            version: 1,
            source: 'pipeline-v2',
            createdAt: new Date().toISOString(),
            validationScore: 0,
        },
        ...overrides,
    } as EquipmentCard;
}

/**
 * Creates a test research report.
 *
 * @returns A test research report.
 */
function createTestResearchReport(): ResearchReport {
    return {
        equipmentClass: 'CentrifugalPump',
        specifications: {
            capacity: { value: 500, unit: 'm³/h' },
            head: { value: 120, unit: 'm' },
        },
        manufacturers: ['Sulzer', 'KSB', 'Flowserve', 'Grundfos'],
        standards: ['ASME B73.1', 'API 610', 'ISO 5199', 'API 682'],
        pcaUri: 'http://data.posccaesar.org/rdl/RDS1234',
        isaTagPrefix: 'P',
        citations: ['https://api.org/610', 'https://asme.org/b73'],
        materials: { body: 'ASTM A216 WCB', internals: 'AISI 316L' },
        nozzleConfigs: [
            { id: 'N1', size: '6" 150#', rating: 'ANSI 150', service: 'Suction' },
        ],
    };
}

/* ─── AuditLogger Tests ─────────────────────────────────────────────────── */

describe('AuditLogger', () => {
    let logger: AuditLogger;

    beforeEach(() => {
        logger = new AuditLogger('/tmp/test-audit-' + Date.now());
    });

    it('should log an entry and return it', async () => {
        const entry = await logger.log(
            'test-run', 'test-agent', 'test-action', 'success',
            { input: 'data' }, { output: 'data' }, 100,
        );

        expect(entry.runId).toBe('test-run');
        expect(entry.agentId).toBe('test-agent');
        expect(entry.status).toBe('success');
        expect(entry.durationMs).toBe(100);
        expect(entry.entryHash).toBeTruthy();
        expect(entry.entryHash.length).toBe(64);
    });

    it('should build a hash chain across entries', async () => {
        const entry1 = await logger.log('run1', 'agent1', 'a1', 'success', {}, {}, 50);
        const entry2 = await logger.log('run1', 'agent2', 'a2', 'success', {}, {}, 75);

        expect(entry2.previousHash).toBe(entry1.entryHash);
    });

    it('should verify integrity of a valid chain', async () => {
        await logger.log('run1', 'a1', 'action1', 'success', {}, {}, 10);
        await logger.log('run1', 'a2', 'action2', 'success', {}, {}, 20);
        await logger.log('run1', 'a3', 'action3', 'success', {}, {}, 30);

        const trail = logger.getTrail('run1');
        expect(logger.verifyIntegrity(trail)).toBe(true);
    });

    it('should detect tampering in the chain', async () => {
        await logger.log('run1', 'a1', 'action1', 'success', {}, {}, 10);
        await logger.log('run1', 'a2', 'action2', 'success', {}, {}, 20);

        const trail = logger.getTrail('run1');
        // Tamper with an entry
        trail[0].action = 'tampered';
        expect(logger.verifyIntegrity(trail)).toBe(false);
    });

    it('should filter trail by runId', async () => {
        await logger.log('run-a', 'a1', 'action1', 'success', {}, {}, 10);
        await logger.log('run-b', 'a2', 'action2', 'success', {}, {}, 20);
        await logger.log('run-a', 'a3', 'action3', 'success', {}, {}, 30);

        expect(logger.getTrail('run-a')).toHaveLength(2);
        expect(logger.getTrail('run-b')).toHaveLength(1);
    });

    it('should track size correctly', async () => {
        expect(logger.size).toBe(0);
        await logger.log('r1', 'a1', 'a1', 'success', {}, {}, 10);
        expect(logger.size).toBe(1);
    });
});

/* ─── ComplianceAgent Tests ─────────────────────────────────────────────── */

describe('ComplianceAgent', () => {
    const agent = new ComplianceAgent();

    it('should pass a fully valid card', async () => {
        const card = createTestCard();
        const report = await agent.execute(card, 'test-run');

        expect(report.score).toBeGreaterThanOrEqual(60);
        expect(report.passed).toBe(true);
        expect(report.violations.filter((v: { severity: string }) => v.severity === 'critical')).toHaveLength(0);
    });

    it('should fail a card with invalid tag', async () => {
        const card = createTestCard({ tag: 'invalid-tag' });
        const report = await agent.execute(card, 'test-run');

        const tagViolation = report.violations.find((v: { ruleId: string }) => v.ruleId === 'DEXPI-TAG-001');
        expect(tagViolation).toBeTruthy();
        expect(tagViolation?.severity).toBe('critical');
    });

    it('should fail a card with invalid URI', async () => {
        const card = createTestCard({ componentClassURI: 'not-a-valid-uri' });
        const report = await agent.execute(card, 'test-run');

        const uriViolation = report.violations.find((v: { ruleId: string }) => v.ruleId === 'DEXPI-URI-001');
        expect(uriViolation).toBeTruthy();
    });

    it('should fail a card with insufficient specifications', async () => {
        const card = createTestCard({ specifications: { capacity: { value: 1, unit: 'm³/h' } } });
        const report = await agent.execute(card, 'test-run');

        const specViolation = report.violations.find((v: { ruleId: string }) => v.ruleId === 'DEXPI-SPEC-001');
        expect(specViolation).toBeTruthy();
    });

    it('should flag when design pressure < operating pressure', async () => {
        const card = createTestCard({
            operatingConditions: {
                designPressure: 10,
                operatingPressure: 20,
                designTemperature: 200,
                operatingTemperature: 150,
                flowRate: 100,
            },
        });
        const report = await agent.execute(card, 'test-run');

        const condViolation = report.violations.find((v: { ruleId: string }) => v.ruleId === 'DEXPI-COND-002');
        expect(condViolation).toBeTruthy();
        expect(condViolation?.severity).toBe('critical');
    });
});

/* ─── QualityGateAgent Tests ────────────────────────────────────────────── */

describe('QualityGateAgent', () => {
    const agent = new QualityGateAgent();

    it('should approve a high-quality card with score >= 80', async () => {
        const input: QualityGateInput = { card: createTestCard(), minScore: 80 };
        const report = await agent.execute(input, 'test-run');

        expect(report.score).toBeGreaterThanOrEqual(80);
        expect(report.approved).toBe(true);
        expect(report.rejectionReasons).toHaveLength(0);
    });

    it('should reject a low-quality card', async () => {
        const card = createTestCard({
            tag: '',
            componentClassURI: '',
            description: '',
            specifications: {},
            operatingConditions: {},
            materials: {},
            standards: [],
            manufacturers: [],
            nozzles: [],
            metadata: { version: 0, source: 'manual', createdAt: '', updatedAt: '', createdBy: '', contentHash: '', validationScore: 0 },
        });
        const input: QualityGateInput = { card, minScore: 80 };
        const report = await agent.execute(input, 'test-run');

        expect(report.score).toBeLessThan(80);
        expect(report.approved).toBe(false);
        expect(report.rejectionReasons.length).toBeGreaterThan(0);
    });

    it('should score each dimension independently', async () => {
        const input: QualityGateInput = { card: createTestCard(), minScore: 0 };
        const report = await agent.execute(input, 'test-run');

        expect(report.dimensions).toHaveProperty('tag');
        expect(report.dimensions).toHaveProperty('componentClassURI');
        expect(report.dimensions).toHaveProperty('specifications');
        expect(report.dimensions).toHaveProperty('operatingConditions');
        expect(Object.keys(report.dimensions).length).toBe(10);
    });

    it('should respect custom minScore threshold', async () => {
        const card = createTestCard();
        const lowThreshold: QualityGateInput = { card, minScore: 10 };
        const highThreshold: QualityGateInput = { card, minScore: 101 };

        const lowReport = await agent.execute(lowThreshold, 'test-run');
        const highReport = await agent.execute(highThreshold, 'test-run');

        expect(lowReport.approved).toBe(true);
        expect(highReport.approved).toBe(false);
    });
});

/* ─── EnrichmentAgent Tests ─────────────────────────────────────────────── */

describe('EnrichmentAgent', () => {
    const agent = new EnrichmentAgent();

    it('should backfill missing manufacturers from research', async () => {
        const card = createTestCard({ manufacturers: [] });
        const research = createTestResearchReport();
        const input: EnrichmentInput = { card, research };
        const enriched = await agent.execute(input, 'test-run');

        expect(enriched.manufacturers!.length).toBeGreaterThanOrEqual(3);
    });

    it('should backfill missing standards from research', async () => {
        const card = createTestCard({ standards: ['API 610'] });
        const research = createTestResearchReport();
        const input: EnrichmentInput = { card, research };
        const enriched = await agent.execute(input, 'test-run');

        expect(enriched.standards!.length).toBeGreaterThan(1);
    });

    it('should fix tag prefix based on component class', async () => {
        const card = createTestCard({ tag: 'XX-1001', componentClass: 'CentrifugalPump' });
        const research = createTestResearchReport();
        const input: EnrichmentInput = { card, research };
        const enriched = await agent.execute(input, 'test-run');

        expect(enriched.tag).toBe('P-1001');
    });

    it('should not overwrite existing valid data', async () => {
        const card = createTestCard();
        const research = createTestResearchReport();
        const input: EnrichmentInput = { card, research };
        const enriched = await agent.execute(input, 'test-run');

        expect(enriched.componentClassURI).toBe(card.componentClassURI);
    });

    it('should generate substantive description if missing', async () => {
        const card = createTestCard({ description: '' });
        const research = createTestResearchReport();
        const input: EnrichmentInput = { card, research };
        const enriched = await agent.execute(input, 'test-run');

        expect(enriched.description!.length).toBeGreaterThanOrEqual(20);
    });
});
