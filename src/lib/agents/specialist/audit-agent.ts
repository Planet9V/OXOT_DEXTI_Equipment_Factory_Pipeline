/**
 * Audit Specialist Agent.
 *
 * Reviews rejected equipment cards against DEXPI 2.0 specifications and
 * reference defaults. Produces a structured remediation plan that the
 * generator agent uses to fix specific fields. Sits between the quality
 * gate rejection and the fix re-generation loop.
 *
 * @module agents/specialist/audit-agent
 */

import { BaseSpecialist } from './base-specialist';
import { getDefaults, checkConditionRanges } from '../reference-defaults';
import type { ReferenceDefaults } from '../reference-defaults';
import type { QualityReport, RemediationPlan, RemediationFix, AuditInput } from '../types';
import type { EquipmentCard } from '../../types';

/* ─── System Prompt ─────────────────────────────────────────────────────── */

const SYSTEM_PROMPT = `You are a DEXPI 2.0 Specification Auditor — a senior compliance engineer reviewing equipment data sheets that have failed quality gate checks.

# YOUR ROLE
You receive a rejected equipment card along with:
1. The quality gate report (rejection reasons, per-dimension scores)
2. Reference baseline values for the equipment category
3. Plausibility violations (values outside acceptable ranges)

Your job is to produce a PRECISE remediation plan. For EVERY issue:
- Identify the EXACT field that needs fixing
- State the CURRENT value that is wrong
- Provide the SPECIFIC value to use as replacement
- Explain WHY the fix is needed

# RULES
1. Be SPECIFIC — don't say "fix the tag", say "change tag from 'pump1' to 'P-1001'"
2. Use the reference baseline values when research data is unavailable
3. Design conditions MUST exceed operating conditions (1.1-1.5x operating pressure, +25-50°C temperature)
4. All spec values MUST include units
5. URIs MUST match PCA RDL format: http://data.posccaesar.org/rdl/...
6. Tags MUST follow ISA-5.1: 1-4 uppercase letters + dash + 3-4 digits

# OUTPUT FORMAT
Return ONLY a valid JSON object:
{
  "cardTag": "string — the equipment tag",
  "fixes": [
    {
      "field": "field.path (e.g. 'operatingConditions.designPressure')",
      "currentValue": "current value or null",
      "suggestedValue": "the corrected value",
      "reason": "why this fix is needed"
    }
  ],
  "confidence": 0-100,
  "canAutoFix": true/false
}`;

/* ─── Audit Agent ───────────────────────────────────────────────────────── */

/**
 * Audit specialist agent.
 *
 * Analyses rejected equipment cards and produces structured remediation
 * plans. Combines deterministic checks (reference range validation) with
 * AI-augmented analysis for edge cases.
 */
export class AuditAgent extends BaseSpecialist<AuditInput, RemediationPlan> {
    constructor() {
        super({
            agentId: 'audit-agent',
            displayName: 'Audit Agent',
            systemPrompt: SYSTEM_PROMPT,
            tools: [],
            toolHandlers: {},
            completionOptions: { temperature: 0.1, max_tokens: 4096 },
        });
    }

    /**
     * Audits a rejected equipment card and produces a remediation plan.
     *
     * Phase 1: Deterministic — checks values against reference ranges.
     * Phase 2: AI-augmented — LLM analyses edge cases and proposes fixes.
     *
     * @param input - Audit input with card, quality report, and optionally research.
     * @param runId - Pipeline run identifier.
     * @returns Structured remediation plan.
     */
    async execute(input: AuditInput, runId: string): Promise<RemediationPlan> {
        const { card, qualityReport } = input;
        const defaults = getDefaults(card.componentClass);

        // Phase 1: Deterministic range checks
        const deterministicFixes = this.runDeterministicChecks(card, defaults);

        // Phase 2: AI-augmented analysis
        const aiPlan = await this.runAIAnalysis(card, qualityReport, defaults, deterministicFixes);

        // Merge deterministic fixes with AI suggestions (dedup by field)
        const fixMap = new Map<string, RemediationFix>();
        for (const fix of deterministicFixes) {
            fixMap.set(fix.field, fix);
        }
        for (const fix of aiPlan.fixes) {
            if (!fixMap.has(fix.field)) {
                fixMap.set(fix.field, fix);
            }
        }

        const mergedFixes = Array.from(fixMap.values());
        const canAutoFix = mergedFixes.every((f) => f.suggestedValue != null);

        const plan: RemediationPlan = {
            cardTag: card.tag,
            fixes: mergedFixes,
            confidence: aiPlan.confidence,
            canAutoFix,
        };

        console.log(
            `[audit-agent] Run ${runId}: ${card.tag} — ${mergedFixes.length} fixes, ` +
            `confidence ${plan.confidence}%, autoFix=${plan.canAutoFix}`,
        );

        return plan;
    }

    /**
     * Runs deterministic checks against reference defaults.
     *
     * Checks operating condition ranges, tag format, URI format,
     * spec units, and design-vs-operating condition margins.
     *
     * @param card - Equipment card to check.
     * @param defaults - Reference defaults for the category.
     * @returns Array of deterministic fixes.
     */
    private runDeterministicChecks(card: EquipmentCard, defaults: ReferenceDefaults): RemediationFix[] {
        const fixes: RemediationFix[] = [];

        // 1. Tag format check
        if (!/^[A-Z]{1,4}-\d{3,4}[A-Z]?$/.test(card.tag)) {
            fixes.push({
                field: 'tag',
                currentValue: card.tag,
                suggestedValue: this.suggestTag(card),
                reason: 'Tag must follow ISA-5.1 format: 1-4 uppercase letters + dash + 3-4 digits',
            });
        }

        // 2. URI format check
        if (!card.componentClassURI || !/^http:\/\/(data\.posccaesar\.org|sandbox\.dexpi\.org)\/rdl\//.test(card.componentClassURI)) {
            fixes.push({
                field: 'componentClassURI',
                currentValue: card.componentClassURI || null,
                suggestedValue: `http://data.posccaesar.org/rdl/${card.componentClass}`,
                reason: 'URI must be a valid PCA RDL or DEXPI sandbox URI',
            });
        }

        // 3. Operating condition range checks — extract only numeric fields
        const oc = card.operatingConditions || {};
        const numericConditions: Record<string, number | undefined> = {
            designPressure: oc.designPressure,
            operatingPressure: oc.operatingPressure,
            designTemperature: oc.designTemperature,
            operatingTemperature: oc.operatingTemperature,
            flowRate: oc.flowRate,
        };
        const conditionIssues = checkConditionRanges(
            numericConditions,
            defaults,
        );
        for (const issue of conditionIssues) {
            fixes.push({
                field: `operatingConditions.${issue.field}`,
                currentValue: issue.value,
                suggestedValue: issue.range.typical,
                reason: issue.message,
            });
        }

        // 4. Design > operating check
        const ocRaw = card.operatingConditions || {};
        if (ocRaw.designPressure != null && ocRaw.operatingPressure != null && ocRaw.designPressure < ocRaw.operatingPressure) {
            fixes.push({
                field: 'operatingConditions.designPressure',
                currentValue: ocRaw.designPressure,
                suggestedValue: Math.round(ocRaw.operatingPressure * 1.25),
                reason: 'Design pressure must be >= operating pressure (typically 1.25x)',
            });
        }
        if (ocRaw.designTemperature != null && ocRaw.operatingTemperature != null && ocRaw.designTemperature < ocRaw.operatingTemperature) {
            fixes.push({
                field: 'operatingConditions.designTemperature',
                currentValue: ocRaw.designTemperature,
                suggestedValue: ocRaw.operatingTemperature + 50,
                reason: 'Design temperature must be >= operating temperature (typically +50°C margin)',
            });
        }

        // 5. Minimum spec count
        const specCount = Object.keys(card.specifications || {}).length;
        if (specCount < 3) {
            const missingSpecs: Record<string, { value: string | number; unit: string }> = {};
            const specKeys = Object.keys(defaults.specifications);
            for (const key of specKeys.slice(0, 5 - specCount)) {
                if (!(card.specifications && key in card.specifications)) {
                    const ref = defaults.specifications[key];
                    missingSpecs[key] = { value: ref.value, unit: ref.unit };
                }
            }
            fixes.push({
                field: 'specifications',
                currentValue: `${specCount} specifications (minimum 3 required)`,
                suggestedValue: missingSpecs,
                reason: 'At least 5 specifications required with units',
            });
        }

        // 6. Missing materials
        if (!card.materials?.body) {
            fixes.push({
                field: 'materials.body',
                currentValue: null,
                suggestedValue: defaults.materials.body,
                reason: 'Body material of construction is required',
            });
        }

        // 7. Missing description or too short
        if (!card.description || card.description.length < 20) {
            fixes.push({
                field: 'description',
                currentValue: card.description || null,
                suggestedValue: `${card.displayName || card.componentClass} — ${defaults.category} equipment for ${card.sector}/${card.facility} service. ${defaults.standards[0] || ''}`,
                reason: 'Description must be at least 50 characters with technical detail',
            });
        }

        return fixes;
    }

    /**
     * Runs AI-augmented analysis for edge cases the deterministic
     * checks might miss.
     *
     * @param card - Equipment card.
     * @param qualityReport - Quality gate rejection report.
     * @param defaults - Reference defaults.
     * @param deterministicFixes - Already-identified fixes from deterministic phase.
     * @returns AI-generated remediation plan.
     */
    private async runAIAnalysis(
        card: EquipmentCard,
        qualityReport: QualityReport,
        defaults: ReferenceDefaults,
        deterministicFixes: RemediationFix[],
    ): Promise<RemediationPlan> {
        try {
            const prompt = `Review this REJECTED equipment card and produce a remediation plan.

## Equipment Card
${JSON.stringify(card, null, 2)}

## Quality Gate Report (REJECTION)
- Score: ${qualityReport.score}/100
- Rejection reasons: ${JSON.stringify(qualityReport.rejectionReasons)}
- Per-dimension scores: ${JSON.stringify(qualityReport.dimensions)}
- Suggestions: ${JSON.stringify(qualityReport.suggestions)}

## Reference Baseline (${defaults.category})
### Operating Condition Ranges
- Design Pressure: ${defaults.operatingConditions.designPressure.min}–${defaults.operatingConditions.designPressure.max} ${defaults.operatingConditions.designPressure.unit}
- Operating Pressure: ${defaults.operatingConditions.operatingPressure.min}–${defaults.operatingConditions.operatingPressure.max} ${defaults.operatingConditions.operatingPressure.unit}
- Design Temperature: ${defaults.operatingConditions.designTemperature.min}–${defaults.operatingConditions.designTemperature.max} ${defaults.operatingConditions.designTemperature.unit}
- Operating Temperature: ${defaults.operatingConditions.operatingTemperature.min}–${defaults.operatingConditions.operatingTemperature.max} ${defaults.operatingConditions.operatingTemperature.unit}

### Materials
- Body: ${defaults.materials.body}
- Internals: ${defaults.materials.internals}

### Standards
${defaults.standards.join('\n')}

## Already Identified Issues (Deterministic)
${deterministicFixes.length > 0 ? JSON.stringify(deterministicFixes, null, 2) : 'None found by deterministic checks'}

## Your Task
Identify any ADDITIONAL issues the deterministic checks missed. Focus on:
1. Data plausibility (are the values realistic for this equipment type?)
2. Internal consistency (do specifications agree with operating conditions?)
3. Missing or inadequate data (description quality, standard relevance)
4. Material compatibility with operating conditions

Return your remediation plan as JSON.`;

            const result = await this.callLLM(prompt);

            return {
                cardTag: (result.cardTag as string) || card.tag,
                fixes: (result.fixes as RemediationFix[]) || [],
                confidence: (result.confidence as number) || 70,
                canAutoFix: (result.canAutoFix as boolean) ?? false,
            };
        } catch (err) {
            console.warn(`[audit-agent] AI analysis failed: ${err instanceof Error ? err.message : String(err)}`);
            return {
                cardTag: card.tag,
                fixes: [],
                confidence: 50,
                canAutoFix: deterministicFixes.length > 0,
            };
        }
    }

    /**
     * Suggests a corrected ISA-5.1 tag based on the equipment class.
     *
     * @param card - Equipment card with invalid tag.
     * @returns Suggested tag string.
     */
    private suggestTag(card: EquipmentCard): string {
        const prefixMap: Record<string, string> = {
            Pump: 'P', CentrifugalPump: 'P', Compressor: 'C',
            Vessel: 'V', PressureVessel: 'V', Tank: 'TK',
            HeatExchanger: 'E', ShellTubeHeatExchanger: 'E',
            Column: 'COL', Reactor: 'R', ControlValve: 'CV',
            SafetyValve: 'PSV', Transmitter: 'TT',
        };

        const prefix = prefixMap[card.componentClass] || card.componentClass.slice(0, 2).toUpperCase();
        // Extract any numbers from the existing tag
        const numMatch = card.tag?.match(/\d+/);
        const num = numMatch ? numMatch[0].padStart(4, '0') : '1001';

        return `${prefix}-${num}`;
    }
}
