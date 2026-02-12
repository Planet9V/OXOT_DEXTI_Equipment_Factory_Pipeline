/**
 * DEXPI 2.0 Compliance Specialist Agent.
 *
 * Validates equipment cards against DEXPI 2.0 specification rules using a
 * hybrid approach: deterministic rule engine + AI-augmented edge case review.
 * Produces a typed ComplianceReport with scored violations.
 *
 * @module agents/specialist/compliance-agent
 */

import { BaseSpecialist } from './base-specialist';
import * as pca from '../../pca-sparql';
import type { ComplianceReport, ComplianceViolation } from '../types';
import type { EquipmentCard } from '../../types';

/* ─── DEXPI 2.0 Validation Rules ────────────────────────────────────────── */

/** Rule definition for deterministic validation. */
interface ValidationRule {
    /** Rule identifier. */
    id: string;
    /** Human-readable description. */
    description: string;
    /** Severity if violated. */
    severity: ComplianceViolation['severity'];
    /** Field being checked. */
    field: string;
    /** Weight for scoring (higher = more important). */
    weight: number;
    /** Validation function. */
    check: (card: EquipmentCard) => boolean;
}

/**
 * DEXPI 2.0 compliance rules.
 *
 * Each rule maps to a specific DEXPI 2.0 specification requirement.
 * Rules are deterministic and repeatable — no AI involvement.
 */
const DEXPI_RULES: ValidationRule[] = [
    {
        id: 'DEXPI-TAG-001',
        description: 'Tag must follow ISA-5.1 format: 1-4 uppercase letters + dash + 3-4 digits + optional letter suffix',
        severity: 'critical',
        field: 'tag',
        weight: 15,
        check: (card) => /^[A-Z]{1,4}-\d{3,4}[A-Z]?$/.test(card.tag),
    },
    {
        id: 'DEXPI-CLASS-001',
        description: 'componentClass must be a non-empty string',
        severity: 'critical',
        field: 'componentClass',
        weight: 10,
        check: (card) => !!card.componentClass && card.componentClass.length > 0,
    },
    {
        id: 'DEXPI-URI-001',
        description: 'componentClassURI must be a valid PCA RDL or DEXPI URI',
        severity: 'critical',
        field: 'componentClassURI',
        weight: 20,
        check: (card) => !!card.componentClassURI &&
            /^http:\/\/(data\.posccaesar\.org|sandbox\.dexpi\.org)\/rdl\//.test(card.componentClassURI),
    },
    {
        id: 'DEXPI-DESC-001',
        description: 'Description must be at least 20 characters',
        severity: 'medium',
        field: 'description',
        weight: 5,
        check: (card) => !!card.description && card.description.length >= 20,
    },
    {
        id: 'DEXPI-SPEC-001',
        description: 'At least 3 specifications must be provided',
        severity: 'high',
        field: 'specifications',
        weight: 15,
        check: (card) => Object.keys(card.specifications || {}).length >= 3,
    },
    {
        id: 'DEXPI-SPEC-002',
        description: 'All specification values must include units',
        severity: 'medium',
        field: 'specifications',
        weight: 5,
        check: (card) => {
            const specs = card.specifications || {};
            return Object.values(specs).every((sv) => sv && sv.unit);
        },
    },
    {
        id: 'DEXPI-COND-001',
        description: 'Design pressure and operating pressure must be provided',
        severity: 'high',
        field: 'operatingConditions',
        weight: 10,
        check: (card) => {
            const oc = card.operatingConditions || {};
            return oc.designPressure != null && oc.operatingPressure != null;
        },
    },
    {
        id: 'DEXPI-COND-002',
        description: 'Design pressure must be >= operating pressure',
        severity: 'critical',
        field: 'operatingConditions',
        weight: 10,
        check: (card) => {
            const oc = card.operatingConditions || {};
            if (oc.designPressure == null || oc.operatingPressure == null) return true;
            return oc.designPressure >= oc.operatingPressure;
        },
    },
    {
        id: 'DEXPI-COND-003',
        description: 'Design temperature and operating temperature must be provided',
        severity: 'high',
        field: 'operatingConditions',
        weight: 5,
        check: (card) => {
            const oc = card.operatingConditions || {};
            return oc.designTemperature != null && oc.operatingTemperature != null;
        },
    },
    {
        id: 'DEXPI-MAT-001',
        description: 'At least body material must be specified',
        severity: 'medium',
        field: 'materials',
        weight: 5,
        check: (card) => !!card.materials?.body,
    },
    {
        id: 'DEXPI-STD-001',
        description: 'At least 2 applicable standards must be listed',
        severity: 'medium',
        field: 'standards',
        weight: 5,
        check: (card) => (card.standards || []).length >= 2,
    },
    {
        id: 'DEXPI-MFG-001',
        description: 'At least 2 manufacturers must be listed',
        severity: 'medium',
        field: 'manufacturers',
        weight: 5,
        check: (card) => (card.manufacturers || []).length >= 2,
    },
    {
        id: 'DEXPI-NOZ-001',
        description: 'At least 1 nozzle configuration must be provided',
        severity: 'low',
        field: 'nozzles',
        weight: 5,
        check: (card) => (card.nozzles || []).length >= 1,
    },
];

/* ─── System Prompt ─────────────────────────────────────────────────────── */

const SYSTEM_PROMPT = `You are a DEXPI 2.0 Compliance Auditor. Review equipment cards for specification compliance.

Your ONLY task is to review the rule-based validation results and provide AI-augmented analysis:
1. Confirm or challenge rule violations
2. Identify edge cases the rules missed
3. Check unit consistency (e.g., pressure in barg, temperature in °C)
4. Verify data plausibility (realistic ranges for the equipment type)

Return ONLY a JSON object:
{
  "aiNotes": "string — your analysis summary",
  "additionalWarnings": ["string — any issues the rules missed"]
}`;

/* ─── Compliance Agent ──────────────────────────────────────────────────── */

/**
 * DEXPI 2.0 Compliance Agent.
 *
 * Runs deterministic rule-based validation, then optionally augments
 * with AI review for edge cases. Produces a scored ComplianceReport.
 */
export class ComplianceAgent extends BaseSpecialist<EquipmentCard, ComplianceReport> {
    constructor() {
        super({
            agentId: 'compliance-agent',
            displayName: 'Compliance Agent',
            systemPrompt: SYSTEM_PROMPT,
            tools: [],
            toolHandlers: {},
            completionOptions: { temperature: 0.1, max_tokens: 2048 },
        });
    }

    /**
     * Validates an equipment card against DEXPI 2.0 rules.
     *
     * @param input - Equipment card to validate.
     * @param runId - Pipeline run identifier.
     * @returns Compliance report with score and violations.
     */
    async execute(input: EquipmentCard, runId: string): Promise<ComplianceReport> {
        // Phase 1: Deterministic rule validation
        const violations: ComplianceViolation[] = [];
        let earnedWeight = 0;
        let totalWeight = 0;

        for (const rule of DEXPI_RULES) {
            totalWeight += rule.weight;
            const passed = rule.check(input);
            if (passed) {
                earnedWeight += rule.weight;
            } else {
                violations.push({
                    ruleId: rule.id,
                    severity: rule.severity,
                    message: rule.description,
                    field: rule.field,
                });
            }
        }

        // Phase 2: Live PCA URI verification
        const warnings: string[] = [];
        if (input.componentClassURI) {
            try {
                const pcaLabel = await pca.validateClassUri(input.componentClassURI);
                if (pcaLabel) {
                    earnedWeight += 5; // Bonus for live-verified URI
                    totalWeight += 5;
                } else {
                    warnings.push(`URI ${input.componentClassURI} not found in live PCA RDL — may be a sandbox or deprecated URI`);
                }
            } catch (err) {
                warnings.push(`Could not verify URI against PCA RDL: ${err instanceof Error ? err.message : String(err)}`);
            }
        }

        const score = totalWeight > 0 ? Math.round((earnedWeight / totalWeight) * 100) : 0;
        const hasCritical = violations.some((v) => v.severity === 'critical');
        const passed = score >= 60 && !hasCritical;

        // Phase 3: AI-augmented review (optional, for edge cases)
        let aiNotes = '';
        try {
            const aiResult = await this.callLLM(
                `Review this equipment card validation:\n\n` +
                `Equipment: ${input.tag} (${input.componentClass})\n` +
                `Score: ${score}/100\n` +
                `Violations: ${JSON.stringify(violations)}\n` +
                `Card data: ${JSON.stringify(input, null, 2)}`,
            );
            aiNotes = (aiResult.aiNotes as string) || '';
            const additionalWarnings = (aiResult.additionalWarnings as string[]) || [];
            warnings.push(...additionalWarnings);
        } catch {
            aiNotes = 'AI review skipped due to error';
        }

        const report: ComplianceReport = {
            score,
            passed,
            violations,
            warnings,
            aiNotes,
        };

        console.log(`[compliance-agent] Run ${runId}: ${input.tag} — score ${score}, ${violations.length} violations, passed=${passed}`);
        return report;
    }
}
