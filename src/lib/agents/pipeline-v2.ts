/**
 * Pipeline V2 — Agent-Orchestrated Deterministic Pipeline.
 *
 * Replaces the Gemini-powered DexpiPipeline with a 7-stage deterministic
 * pipeline where each step is executed by a specialist agent. Full audit
 * trail and typed outputs at every stage. Includes audit-fix remediation
 * loop for rejected cards (max 3 attempts per card).
 *
 * Flow: Research → Generate → Validate → Enrich → Quality Gate → Audit/Fix → Write
 *
 * @module agents/pipeline-v2
 */

import crypto from 'crypto';
import { AuditLogger, getAuditLogger } from './audit-logger';
import { ResearchAgent } from './specialist/research-agent';
import { GeneratorAgent } from './specialist/generator-agent';
import { ComplianceAgent } from './specialist/compliance-agent';
import { EnrichmentAgent, type EnrichmentInput } from './specialist/enrichment-agent';
import { QualityGateAgent, type QualityGateInput } from './specialist/quality-gate-agent';
import { GraphWriterAgent, type GraphWriterInput } from './specialist/graph-writer-agent';
import { AuditAgent } from './specialist/audit-agent';
import type {
    PipelineV2Params,
    PipelineV2BatchParams,
    PipelineV2Result,
    PipelineV2Stage,
    ResearchReport,
    ComplianceReport,
    QualityReport,
    WriteReport,
    GeneratorInput,
    AuditInput,
    RemediationPlan,
} from './types';
import type { EquipmentCard } from '../types';

/* ─── Pipeline V2 ───────────────────────────────────────────────────────── */

/**
 * Agent-orchestrated deterministic pipeline for DEXPI equipment processing.
 *
 * Each run produces a full audit trail of every agent operation, with
 * typed inputs/outputs at every stage. The pipeline is cancellable and
 * provides real-time progress callbacks.
 */
export class PipelineV2 {
    private runs: Map<string, PipelineV2Result> = new Map();
    private cancelled: Set<string> = new Set();
    private audit: AuditLogger;

    // Specialist agents (lazy-init singletons)
    private researchAgent = new ResearchAgent();
    private generatorAgent = new GeneratorAgent();
    private complianceAgent = new ComplianceAgent();
    private enrichmentAgent = new EnrichmentAgent();
    private qualityGateAgent = new QualityGateAgent();
    private graphWriterAgent = new GraphWriterAgent();
    private auditAgent = new AuditAgent();

    /** Maximum remediation attempts per card before dropping. */
    private static readonly MAX_REMEDIATION_ATTEMPTS = 3;

    /**
     * Creates a new Pipeline V2 instance.
     *
     * @param audit - Optional audit logger instance.
     */
    constructor(audit?: AuditLogger) {
        this.audit = audit || getAuditLogger();
    }

    /**
     * Submits a new pipeline run for execution.
     *
     * @param params - Pipeline input parameters.
     * @returns The unique run identifier.
     */
    async submitRun(params: PipelineV2Params): Promise<string> {
        const runId = crypto.randomUUID();
        const defaultStageStatus = {
            status: 'pending' as const,
        };

        const result: PipelineV2Result = {
            runId,
            status: 'queued',
            params,
            stages: {
                research: { ...defaultStageStatus },
                generate: { ...defaultStageStatus },
                validate: { ...defaultStageStatus },
                enrich: { ...defaultStageStatus },
                'quality-gate': { ...defaultStageStatus },
                audit: { ...defaultStageStatus },
                write: { ...defaultStageStatus },
            },
            results: {
                researched: false,
                generated: 0,
                validated: 0,
                enriched: 0,
                approved: 0,
                remediationAttempts: 0,
                written: 0,
                duplicatesSkipped: 0,
                averageScore: 0,
            },
            createdAt: new Date().toISOString(),
        };

        this.runs.set(runId, result);

        // Execute pipeline asynchronously
        this.executePipeline(result).catch(async (err) => {
            result.status = 'failed';
            await this.audit.log(
                runId, 'pipeline-v2', 'Pipeline failed', 'failure',
                params, { error: err.message }, 0,
            );
        });

        return runId;
    }

    /**
     * Returns the current state of a pipeline run.
     *
     * @param runId - Pipeline run identifier.
     * @returns The run result, or null if not found.
     */
    getRun(runId: string): PipelineV2Result | null {
        return this.runs.get(runId) || null;
    }

    /**
     * Cancels a running pipeline.
     *
     * @param runId - Pipeline run identifier.
     */
    cancelRun(runId: string): void {
        this.cancelled.add(runId);
        const run = this.runs.get(runId);
        if (run) {
            run.status = 'cancelled';
        }
    }

    /**
     * Submits a batch run for multiple equipment names.
     *
     * Each equipment name is processed sequentially through the full
     * 6-stage pipeline. Results are aggregated into a single run.
     *
     * @param batchParams - Batch input parameters.
     * @returns The unique run identifier.
     */
    async submitBatchRun(batchParams: PipelineV2BatchParams): Promise<string> {
        // Create a synthetic PipelineV2Params for the first item to bootstrap the run
        const firstItem = batchParams.equipmentNames[0] || 'Unknown';
        const syntheticParams: PipelineV2Params = {
            sector: batchParams.sectorHint || 'STANDALONE',
            subSector: 'STANDALONE',
            facility: 'STANDALONE',
            equipmentClass: firstItem,
            quantity: 1,
            minQualityScore: batchParams.minQualityScore || 80,
        };

        const runId = crypto.randomUUID();
        const defaultStageStatus = { status: 'pending' as const };

        const result: PipelineV2Result = {
            runId,
            status: 'queued',
            params: syntheticParams,
            stages: {
                research: { ...defaultStageStatus },
                generate: { ...defaultStageStatus },
                validate: { ...defaultStageStatus },
                enrich: { ...defaultStageStatus },
                'quality-gate': { ...defaultStageStatus },
                audit: { ...defaultStageStatus },
                write: { ...defaultStageStatus },
            },
            results: {
                researched: false,
                generated: 0,
                validated: 0,
                enriched: 0,
                approved: 0,
                remediationAttempts: 0,
                written: 0,
                duplicatesSkipped: 0,
                averageScore: 0,
            },
            createdAt: new Date().toISOString(),
        };

        this.runs.set(runId, result);

        // Execute batch pipeline asynchronously
        this.executeBatchPipeline(result, batchParams).catch(async (err) => {
            result.status = 'failed';
            await this.audit.log(
                runId, 'pipeline-v2-batch', 'Batch pipeline failed', 'failure',
                batchParams, { error: err instanceof Error ? err.message : String(err) }, 0,
            );
        });

        return runId;
    }

    /**
     * Lists all pipeline runs.
     *
     * @returns Array of pipeline results.
     */
    listRuns(): PipelineV2Result[] {
        return Array.from(this.runs.values());
    }

    /* ─── Private Pipeline Execution ────────────────────────────────────── */

    /**
     * Executes the full 6-step pipeline sequentially.
     *
     * @param run - Pipeline run result to populate.
     */
    private async executePipeline(run: PipelineV2Result): Promise<void> {
        run.status = 'running';
        const { runId, params } = run;
        const minScore = params.minQualityScore || 80;

        console.log(`[pipeline-v2] Starting run ${runId}: ${params.equipmentClass} in ${params.sector}/${params.subSector}/${params.facility}`);

        // ── Step 1: Research ──────────────────────────────────────────────
        if (this.isCancelled(runId)) return;
        this.setStage(run, 'research', 'running');

        let researchReport: ResearchReport;
        try {
            researchReport = await this.researchAgent.run(
                { sector: params.sector, subSector: params.subSector, facility: params.facility, equipmentClass: params.equipmentClass },
                runId,
            );
            run.results.researched = true;
            this.setStage(run, 'research', 'completed', `Found ${researchReport.standards.length} standards, ${researchReport.manufacturers.length} manufacturers`);
        } catch (err) {
            this.setStage(run, 'research', 'failed', err instanceof Error ? err.message : String(err));
            run.status = 'failed';
            return;
        }

        // ── Step 2: Generate (via Generator Agent) ───────────────────────
        if (this.isCancelled(runId)) return;
        this.setStage(run, 'generate', 'running');

        let generatedCards: EquipmentCard[];
        try {
            const generatorInput: GeneratorInput = {
                params: {
                    equipmentClass: params.equipmentClass,
                    quantity: params.quantity,
                    sector: params.sector,
                    subSector: params.subSector,
                    facility: params.facility,
                },
                research: researchReport,
            };
            generatedCards = await this.generatorAgent.run(generatorInput, runId);
            run.results.generated = generatedCards.length;
            this.setStage(run, 'generate', 'completed', `Generated ${generatedCards.length} cards`);
        } catch (err) {
            this.setStage(run, 'generate', 'failed', err instanceof Error ? err.message : String(err));
            run.status = 'failed';
            return;
        }

        // ── Step 3: Validate ─────────────────────────────────────────────
        if (this.isCancelled(runId)) return;
        this.setStage(run, 'validate', 'running');

        const validatedCards: EquipmentCard[] = [];
        const complianceReports: ComplianceReport[] = [];
        try {
            for (const card of generatedCards) {
                const report = await this.complianceAgent.run(card, runId);
                complianceReports.push(report);
                if (report.passed) {
                    card.metadata = { ...card.metadata, validationScore: report.score };
                    validatedCards.push(card);
                }
            }
            run.results.validated = validatedCards.length;
            this.setStage(run, 'validate', 'completed', `${validatedCards.length}/${generatedCards.length} passed compliance`);
        } catch (err) {
            this.setStage(run, 'validate', 'failed', err instanceof Error ? err.message : String(err));
            run.status = 'failed';
            return;
        }

        if (validatedCards.length === 0) {
            this.setStage(run, 'enrich', 'skipped', 'No cards passed validation');
            this.setStage(run, 'quality-gate', 'skipped', 'No cards to evaluate');
            this.setStage(run, 'write', 'skipped', 'No approved cards');
            run.status = 'completed';
            run.completedAt = new Date().toISOString();
            return;
        }

        // ── Step 4: Enrich ───────────────────────────────────────────────
        if (this.isCancelled(runId)) return;
        this.setStage(run, 'enrich', 'running');

        const enrichedCards: EquipmentCard[] = [];
        try {
            for (const card of validatedCards) {
                const enrichInput: EnrichmentInput = { card, research: researchReport };
                const enriched = await this.enrichmentAgent.run(enrichInput, runId);
                enrichedCards.push(enriched);
            }
            run.results.enriched = enrichedCards.length;
            this.setStage(run, 'enrich', 'completed', `${enrichedCards.length} cards enriched`);
        } catch (err) {
            this.setStage(run, 'enrich', 'failed', err instanceof Error ? err.message : String(err));
            run.status = 'failed';
            return;
        }

        // ── Step 5: Quality Gate + Audit-Fix Loop ────────────────────────
        if (this.isCancelled(runId)) return;
        this.setStage(run, 'quality-gate', 'running');

        const approvedCards: EquipmentCard[] = [];
        const qualityReports: QualityReport[] = [];
        let cardsToGate = [...enrichedCards];
        let totalRemediationAttempts = 0;

        try {
            // Cards enter the quality gate; rejected cards enter the audit-fix loop
            while (cardsToGate.length > 0) {
                if (this.isCancelled(runId)) return;

                const rejectedCards: Array<{ card: EquipmentCard; report: QualityReport }> = [];

                for (const card of cardsToGate) {
                    const gateInput: QualityGateInput = { card, minScore };
                    const report = await this.qualityGateAgent.run(gateInput, runId);
                    qualityReports.push(report);
                    if (report.approved) {
                        approvedCards.push(card);
                    } else {
                        rejectedCards.push({ card, report });
                    }
                }

                // No rejections or all approved — done
                if (rejectedCards.length === 0) break;

                // Check if we've hit max remediation attempts
                totalRemediationAttempts++;
                if (totalRemediationAttempts >= PipelineV2.MAX_REMEDIATION_ATTEMPTS) {
                    console.log(
                        `[pipeline-v2] Run ${runId}: Max remediation attempts (${PipelineV2.MAX_REMEDIATION_ATTEMPTS}) reached, ` +
                        `dropping ${rejectedCards.length} cards`,
                    );
                    await this.audit.log(
                        runId, 'pipeline', `Dropped ${rejectedCards.length} cards after max remediation attempts`,
                        'partial', { droppedTags: rejectedCards.map((r) => r.card.tag) }, undefined, 0,
                    );
                    break;
                }

                // ── Audit-Fix Loop ────────────────────────────────────────
                this.setStage(run, 'audit', 'running', `Remediating ${rejectedCards.length} rejected cards (attempt ${totalRemediationAttempts}/${PipelineV2.MAX_REMEDIATION_ATTEMPTS})`);

                const remediatedCards: EquipmentCard[] = [];
                for (const { card, report } of rejectedCards) {
                    if (this.isCancelled(runId)) return;

                    try {
                        // Step 5b: Audit — produce remediation plan
                        const auditInput: AuditInput = { card, qualityReport: report, research: researchReport };
                        const remediationPlan: RemediationPlan = await this.auditAgent.run(auditInput, runId);

                        console.log(
                            `[pipeline-v2] Run ${runId}: Audit of ${card.tag} — ${remediationPlan.fixes.length} fixes, ` +
                            `confidence ${remediationPlan.confidence}%`,
                        );

                        // Step 5c: Fix — re-generate with remediation plan
                        const fixInput: GeneratorInput = {
                            params: {
                                equipmentClass: params.equipmentClass,
                                quantity: 1,
                                sector: params.sector,
                                subSector: params.subSector,
                                facility: params.facility,
                            },
                            research: researchReport,
                            remediationPlan,
                        };
                        const fixedCards = await this.generatorAgent.run(fixInput, runId);

                        if (fixedCards.length > 0) {
                            // Step 5d: Re-validate the fixed card
                            const fixedCard = fixedCards[0];
                            const complianceReport = await this.complianceAgent.run(fixedCard, runId);
                            if (complianceReport.passed) {
                                fixedCard.metadata = { ...fixedCard.metadata, validationScore: complianceReport.score };
                                // Step 5e: Re-enrich
                                const reEnrichInput: EnrichmentInput = { card: fixedCard, research: researchReport };
                                const reEnriched = await this.enrichmentAgent.run(reEnrichInput, runId);
                                remediatedCards.push(reEnriched);
                            } else {
                                console.log(`[pipeline-v2] Run ${runId}: Fixed card ${fixedCard.tag} still failed compliance`);
                            }
                        }
                    } catch (err) {
                        console.error(
                            `[pipeline-v2] Run ${runId}: Remediation failed for ${card.tag}: ` +
                            `${err instanceof Error ? err.message : String(err)}`,
                        );
                    }
                }

                // Re-enter the loop with remediated cards for quality gate
                cardsToGate = remediatedCards;
                this.setStage(run, 'audit', 'completed', `Remediation attempt ${totalRemediationAttempts}: ${remediatedCards.length}/${rejectedCards.length} cards fixed`);
            }

            run.results.approved = approvedCards.length;
            run.results.remediationAttempts = totalRemediationAttempts;
            const totalScore = qualityReports.reduce((s, r) => s + r.score, 0);
            run.results.averageScore = qualityReports.length > 0 ? Math.round(totalScore / qualityReports.length) : 0;
            this.setStage(run, 'quality-gate', 'completed',
                `${approvedCards.length} approved (avg score: ${run.results.averageScore})` +
                (totalRemediationAttempts > 0 ? ` after ${totalRemediationAttempts} remediation rounds` : ''),
            );
        } catch (err) {
            this.setStage(run, 'quality-gate', 'failed', err instanceof Error ? err.message : String(err));
            run.status = 'failed';
            return;
        }

        if (approvedCards.length === 0) {
            this.setStage(run, 'write', 'skipped', 'No cards met quality threshold');
            run.status = 'completed';
            run.completedAt = new Date().toISOString();
            return;
        }

        // ── Step 6: Write ────────────────────────────────────────────────
        if (this.isCancelled(runId)) return;
        this.setStage(run, 'write', 'running');

        try {
            const writeInput: GraphWriterInput = { cards: approvedCards, verify: true };
            const writeReport: WriteReport = await this.graphWriterAgent.run(writeInput, runId);
            run.results.written = writeReport.nodesCreated;
            run.results.duplicatesSkipped = writeReport.duplicatesSkipped;
            this.setStage(run, 'write', 'completed', `${writeReport.nodesCreated} nodes, ${writeReport.relationshipsCreated} relationships`);
        } catch (err) {
            this.setStage(run, 'write', 'failed', err instanceof Error ? err.message : String(err));
            run.status = 'failed';
            return;
        }

        run.status = 'completed';
        run.completedAt = new Date().toISOString();
        console.log(`[pipeline-v2] Run ${runId} completed: ${run.results.written} cards written (${totalRemediationAttempts} remediation rounds)`);
    }

    /* ─── NOTE: Generation is now handled by GeneratorAgent ──────────────── */
    /* The inline generateEquipmentCards() method has been replaced by the  */
    /* GeneratorAgent specialist (specialist/generator-agent.ts).           */

    /* ─── Helpers ────────────────────────────────────────────────────────── */

    /**
     * Checks if a run has been cancelled.
     *
     * @param runId - Pipeline run identifier.
     * @returns True if cancelled.
     */
    private isCancelled(runId: string): boolean {
        if (this.cancelled.has(runId)) {
            const run = this.runs.get(runId);
            if (run) run.status = 'cancelled';
            return true;
        }
        return false;
    }

    /**
     * Updates the status of a pipeline stage.
     *
     * @param run     - Pipeline run result.
     * @param stage   - Stage to update.
     * @param status  - New status.
     * @param message - Optional status message.
     */
    private setStage(
        run: PipelineV2Result,
        stage: PipelineV2Stage,
        status: 'pending' | 'running' | 'completed' | 'failed' | 'skipped',
        message?: string,
    ): void {
        const stageInfo = run.stages[stage];
        stageInfo.status = status;
        if (status === 'running') stageInfo.startedAt = new Date().toISOString();
        if (['completed', 'failed', 'skipped'].includes(status)) stageInfo.completedAt = new Date().toISOString();
        if (message) stageInfo.message = message;
    }

    /**
     * Executes the batch pipeline: processes each equipment name through the
     * full 6-stage pipeline sequentially, aggregating results.
     *
     * @param run - Pipeline run result to populate.
     * @param batchParams - Batch input parameters.
     */
    private async executeBatchPipeline(
        run: PipelineV2Result,
        batchParams: PipelineV2BatchParams,
    ): Promise<void> {
        run.status = 'running';
        const { runId } = run;
        const names = batchParams.equipmentNames;
        const minScore = batchParams.minQualityScore || 80;
        const total = names.length;

        console.log(`[pipeline-v2-batch] Starting batch run ${runId}: ${total} items`);

        let totalScore = 0;
        let scoreCount = 0;

        for (let idx = 0; idx < names.length; idx++) {
            const equipmentName = names[idx];
            const progress = `[${idx + 1}/${total}]`;

            if (this.isCancelled(runId)) return;

            // ── Research ──
            this.setStage(run, 'research', 'running', `${progress} Researching ${equipmentName}...`);
            let researchReport: ResearchReport;
            try {
                researchReport = await this.researchAgent.run(
                    {
                        sector: batchParams.sectorHint || 'General',
                        subSector: 'General',
                        facility: 'Standalone',
                        equipmentClass: equipmentName,
                    },
                    runId,
                );
                run.results.researched = true;
                this.setStage(run, 'research', 'completed', `${progress} ${equipmentName}: ${researchReport.standards.length} standards found`);
            } catch (err) {
                this.setStage(run, 'research', 'completed', `${progress} ${equipmentName}: research failed, continuing...`);
                console.warn(`[batch] Research failed for ${equipmentName}:`, err);
                continue;
            }

            if (this.isCancelled(runId)) return;

            // ── Generate ──
            this.setStage(run, 'generate', 'running', `${progress} Generating card for ${equipmentName}...`);
            const itemParams: PipelineV2Params = {
                sector: batchParams.sectorHint || 'STANDALONE',
                subSector: 'STANDALONE',
                facility: 'STANDALONE',
                equipmentClass: equipmentName,
                quantity: 1,
                minQualityScore: minScore,
            };

            let generatedCards: EquipmentCard[];
            try {
                const batchGenInput: GeneratorInput = {
                    params: {
                        equipmentClass: itemParams.equipmentClass,
                        quantity: 1,
                        sector: itemParams.sector,
                        subSector: itemParams.subSector,
                        facility: itemParams.facility,
                    },
                    research: researchReport,
                };
                generatedCards = await this.generatorAgent.run(batchGenInput, runId);
                run.results.generated += generatedCards.length;
                this.setStage(run, 'generate', 'completed', `${progress} ${equipmentName}: ${generatedCards.length} card(s) generated`);
            } catch (err) {
                this.setStage(run, 'generate', 'completed', `${progress} ${equipmentName}: generation failed, continuing...`);
                console.warn(`[batch] Generate failed for ${equipmentName}:`, err);
                continue;
            }

            if (this.isCancelled(runId)) return;

            // ── Validate ──
            this.setStage(run, 'validate', 'running', `${progress} Validating ${equipmentName}...`);
            const validatedCards: EquipmentCard[] = [];
            try {
                for (const card of generatedCards) {
                    const report = await this.complianceAgent.run(card, runId);
                    if (report.passed) {
                        card.metadata = { ...card.metadata, validationScore: report.score };
                        validatedCards.push(card);
                        totalScore += report.score;
                        scoreCount++;
                    }
                }
                run.results.validated += validatedCards.length;
                this.setStage(run, 'validate', 'completed', `${progress} ${equipmentName}: ${validatedCards.length} passed`);
            } catch (err) {
                this.setStage(run, 'validate', 'completed', `${progress} ${equipmentName}: validation failed, continuing...`);
                continue;
            }

            if (validatedCards.length === 0) continue;
            if (this.isCancelled(runId)) return;

            // ── Enrich ──
            this.setStage(run, 'enrich', 'running', `${progress} Enriching ${equipmentName}...`);
            const enrichedCards: EquipmentCard[] = [];
            try {
                for (const card of validatedCards) {
                    const enriched = await this.enrichmentAgent.run({ card, research: researchReport }, runId);
                    enrichedCards.push(enriched);
                }
                run.results.enriched += enrichedCards.length;
                this.setStage(run, 'enrich', 'completed', `${progress} ${equipmentName}: enriched`);
            } catch (err) {
                this.setStage(run, 'enrich', 'completed', `${progress} ${equipmentName}: enrichment failed, continuing...`);
                continue;
            }

            if (this.isCancelled(runId)) return;

            // ── Quality Gate ──
            this.setStage(run, 'quality-gate', 'running', `${progress} Quality gate for ${equipmentName}...`);
            const approvedCards: EquipmentCard[] = [];
            try {
                for (const card of enrichedCards) {
                    const report = await this.qualityGateAgent.run({ card, minScore }, runId);
                    if (report.approved) approvedCards.push(card);
                }
                run.results.approved += approvedCards.length;
                this.setStage(run, 'quality-gate', 'completed', `${progress} ${equipmentName}: ${approvedCards.length} approved`);
            } catch (err) {
                this.setStage(run, 'quality-gate', 'completed', `${progress} ${equipmentName}: quality gate failed, continuing...`);
                continue;
            }

            if (approvedCards.length === 0) continue;
            if (this.isCancelled(runId)) return;

            // ── Write ──
            this.setStage(run, 'write', 'running', `${progress} Writing ${equipmentName} to graph...`);
            try {
                const writeInput = {
                    cards: approvedCards,
                    sector: batchParams.sectorHint || 'STANDALONE',
                    subSector: 'STANDALONE',
                    facility: 'STANDALONE',
                };
                const report = await this.graphWriterAgent.run(writeInput, runId);
                run.results.written += report.nodesCreated;
                run.results.duplicatesSkipped += report.duplicatesSkipped;
                this.setStage(run, 'write', 'completed', `${progress} ${equipmentName}: ${report.nodesCreated} written`);
            } catch (err) {
                this.setStage(run, 'write', 'completed', `${progress} ${equipmentName}: write failed, continuing...`);
                continue;
            }

            // Update average score
            if (scoreCount > 0) {
                run.results.averageScore = Math.round(totalScore / scoreCount);
            }
        }

        // Final status
        if (!this.isCancelled(runId)) {
            run.status = 'completed';
            run.completedAt = new Date().toISOString();

            // Update stage messages with final totals
            this.setStage(run, 'write', 'completed',
                `Batch complete: ${run.results.written} cards written, ${run.results.duplicatesSkipped} duplicates skipped`);
        }

        console.log(`[pipeline-v2-batch] Run ${runId} complete: ${run.results.written} written from ${total} inputs`);
    }
}

/* ─── Singleton ─────────────────────────────────────────────────────────── */

let pipelineInstance: PipelineV2 | null = null;

/**
 * Returns the singleton PipelineV2 instance.
 *
 * @returns Shared pipeline instance.
 */
export function getPipelineV2(): PipelineV2 {
    if (!pipelineInstance) {
        pipelineInstance = new PipelineV2();
    }
    return pipelineInstance;
}
