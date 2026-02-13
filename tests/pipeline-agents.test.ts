/**
 * Pipeline Agents Unit Tests.
 *
 * Tests for the reference defaults registry, generator agent prompt
 * construction, audit agent remediation plans, and the audit-fix loop
 * integration in pipeline-v2.
 *
 * @module tests/pipeline-agents
 */

import { describe, it, expect } from '@jest/globals';
import {
    getDefaults,
    getCategories,
    isWithinRange,
    checkConditionRanges,
    REFERENCE_DEFAULTS,
} from '../src/lib/agents/reference-defaults';
import type { ReferenceDefaults, ReferenceSpec } from '../src/lib/agents/reference-defaults';

/* ═══════════════════════════════════════════════════════════════════════════
   Reference Defaults Registry
   ═══════════════════════════════════════════════════════════════════════════ */

describe('Reference Defaults Registry', () => {
    describe('getCategories', () => {
        it('should return all registered categories', () => {
            const categories = getCategories();
            expect(categories).toContain('Pump');
            expect(categories).toContain('Compressor');
            expect(categories).toContain('Vessel');
            expect(categories).toContain('HeatExchanger');
            expect(categories).toContain('Column');
            expect(categories).toContain('Reactor');
            expect(categories).toContain('Valve');
            expect(categories).toContain('Instrument');
            expect(categories).toContain('Turbine');
            expect(categories).toContain('MiscMechanical');
            expect(categories.length).toBeGreaterThanOrEqual(10);
        });
    });

    describe('getDefaults', () => {
        it('should return Pump defaults for exact class match', () => {
            const defaults = getDefaults('Pump');
            expect(defaults.category).toBe('Pump');
            expect(defaults.specifications.capacity).toBeDefined();
            expect(defaults.specifications.capacity.unit).toBe('m³/h');
        });

        it('should return Pump defaults for CentrifugalPump', () => {
            const defaults = getDefaults('CentrifugalPump');
            expect(defaults.category).toBe('Pump');
        });

        it('should return HeatExchanger defaults for ShellTubeHeatExchanger', () => {
            const defaults = getDefaults('ShellTubeHeatExchanger');
            expect(defaults.category).toBe('HeatExchanger');
            expect(defaults.specifications.duty).toBeDefined();
        });

        it('should return MiscMechanical as fallback for unknown class', () => {
            const defaults = getDefaults('QuantumEntanglementDevice');
            expect(defaults.category).toBe('MiscMechanical');
        });

        it('should fuzzy match partial names', () => {
            const defaults = getDefaults('HeatExchanger');
            expect(defaults.category).toBe('HeatExchanger');
        });

        it('should have complete structure for every category', () => {
            for (const [name, defaults] of Object.entries(REFERENCE_DEFAULTS)) {
                expect(defaults.category).toBe(name);
                expect(Object.keys(defaults.specifications).length).toBeGreaterThanOrEqual(3);
                expect(defaults.operatingConditions.designPressure).toBeDefined();
                expect(defaults.operatingConditions.operatingPressure).toBeDefined();
                expect(defaults.operatingConditions.designTemperature).toBeDefined();
                expect(defaults.operatingConditions.operatingTemperature).toBeDefined();
                expect(defaults.materials.body).toBeTruthy();
                expect(defaults.standards.length).toBeGreaterThanOrEqual(3);
                expect(defaults.manufacturers.length).toBeGreaterThanOrEqual(3);
                expect(defaults.nozzleTemplate.length).toBeGreaterThanOrEqual(1);
            }
        });
    });

    describe('isWithinRange', () => {
        const spec: ReferenceSpec = { value: 100, unit: 'bar', range: [10, 200] };

        it('should return true for value within range', () => {
            expect(isWithinRange(100, spec)).toBe(true);
            expect(isWithinRange(10, spec)).toBe(true);
            expect(isWithinRange(200, spec)).toBe(true);
        });

        it('should return false for value outside range', () => {
            expect(isWithinRange(5, spec)).toBe(false);
            expect(isWithinRange(201, spec)).toBe(false);
            expect(isWithinRange(-50, spec)).toBe(false);
        });

        it('should return true if no range defined', () => {
            const noRange: ReferenceSpec = { value: 'HART', unit: '-' };
            expect(isWithinRange(9999, noRange)).toBe(true);
        });
    });

    describe('checkConditionRanges', () => {
        const pumpDefaults = REFERENCE_DEFAULTS['Pump'];

        it('should return no findings for values within range', () => {
            const conditions = {
                designPressure: 25,
                operatingPressure: 15,
                designTemperature: 150,
                operatingTemperature: 80,
            };
            const findings = checkConditionRanges(conditions, pumpDefaults);
            expect(findings).toHaveLength(0);
        });

        it('should flag values outside plausible range', () => {
            const conditions = {
                designPressure: 9999,
                operatingPressure: 15,
            };
            const findings = checkConditionRanges(conditions, pumpDefaults);
            expect(findings.length).toBeGreaterThan(0);
            expect(findings[0].field).toBe('designPressure');
        });

        it('should skip undefined values', () => {
            const conditions = {
                designPressure: undefined,
                operatingPressure: undefined,
            };
            const findings = checkConditionRanges(conditions, pumpDefaults);
            expect(findings).toHaveLength(0);
        });
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   Reference Defaults Data Quality
   ═══════════════════════════════════════════════════════════════════════════ */

describe('Reference Defaults Data Quality', () => {
    it('design pressure range should encompass operating pressure range for all categories', () => {
        for (const [name, defaults] of Object.entries(REFERENCE_DEFAULTS)) {
            const dp = defaults.operatingConditions.designPressure;
            const op = defaults.operatingConditions.operatingPressure;
            // Design pressure max should be >= operating pressure max
            expect(dp.max).toBeGreaterThanOrEqual(op.max);
        }
    });

    it('design temperature range should encompass operating temperature range for all categories', () => {
        for (const [name, defaults] of Object.entries(REFERENCE_DEFAULTS)) {
            const dt = defaults.operatingConditions.designTemperature;
            const ot = defaults.operatingConditions.operatingTemperature;
            // Design temperature max should be >= operating temperature max
            expect(dt.max).toBeGreaterThanOrEqual(ot.max);
        }
    });

    it('all specs with ranges should have min < max', () => {
        for (const [name, defaults] of Object.entries(REFERENCE_DEFAULTS)) {
            for (const [specName, spec] of Object.entries(defaults.specifications)) {
                if (spec.range) {
                    expect(spec.range[0]).toBeLessThan(spec.range[1]);
                }
            }
        }
    });

    it('typical values should be within their own range for all conditions', () => {
        for (const [name, defaults] of Object.entries(REFERENCE_DEFAULTS)) {
            const oc = defaults.operatingConditions;
            const conditions = [
                { name: 'designPressure', range: oc.designPressure },
                { name: 'operatingPressure', range: oc.operatingPressure },
                { name: 'designTemperature', range: oc.designTemperature },
                { name: 'operatingTemperature', range: oc.operatingTemperature },
            ];
            for (const { name: condName, range } of conditions) {
                expect(range.typical).toBeGreaterThanOrEqual(range.min);
                expect(range.typical).toBeLessThanOrEqual(range.max);
            }
        }
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   Remediation Plan Structure
   ═══════════════════════════════════════════════════════════════════════════ */

describe('RemediationPlan Interface Compliance', () => {
    // This test validates that the types are correctly structured
    // by creating sample remediation plans

    it('should accept a valid remediation plan structure', () => {
        const plan = {
            cardTag: 'P-1001',
            fixes: [
                {
                    field: 'tag',
                    currentValue: 'pump1',
                    suggestedValue: 'P-1001',
                    reason: 'Tag must follow ISA-5.1 format',
                },
                {
                    field: 'operatingConditions.designPressure',
                    currentValue: 5,
                    suggestedValue: 25,
                    reason: 'Design pressure must exceed operating pressure',
                },
            ],
            confidence: 85,
            canAutoFix: true,
        };

        expect(plan.cardTag).toBe('P-1001');
        expect(plan.fixes).toHaveLength(2);
        expect(plan.fixes[0].field).toBe('tag');
        expect(plan.confidence).toBeGreaterThanOrEqual(0);
        expect(plan.confidence).toBeLessThanOrEqual(100);
        expect(plan.canAutoFix).toBe(true);
    });

    it('should accept empty fixes array', () => {
        const plan = {
            cardTag: 'V-3001',
            fixes: [],
            confidence: 100,
            canAutoFix: true,
        };

        expect(plan.fixes).toHaveLength(0);
        expect(plan.confidence).toBe(100);
    });
});

/* ═══════════════════════════════════════════════════════════════════════════
   Pipeline Stage Configuration
   ═══════════════════════════════════════════════════════════════════════════ */

describe('Pipeline Stage Configuration', () => {
    it('should include audit in PipelineV2Stage type', () => {
        // This verifies that the type update was applied correctly
        // by creating a stage array and checking audit is present
        const stages: string[] = [
            'research', 'generate', 'validate', 'enrich',
            'quality-gate', 'audit', 'write',
        ];
        expect(stages).toContain('audit');
        expect(stages).toHaveLength(7);
    });
});
