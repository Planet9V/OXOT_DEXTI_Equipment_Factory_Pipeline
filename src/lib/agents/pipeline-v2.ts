/**
 * Pipeline V2 — Agent-Orchestrated Deterministic Pipeline.
 *
 * Replaces the Gemini-powered DexpiPipeline with a 6-step deterministic
 * pipeline where each step is executed by a specialist agent. Full audit
 * trail and typed outputs at every stage.
 *
 * Flow: Research → Generate → Validate → Enrich → Quality Gate → Write
 *
 * @module agents/pipeline-v2
 */

import crypto from 'crypto';
import { AuditLogger, getAuditLogger } from './audit-logger';
import { chatWithTools } from './openrouter-client';
import { TOOL_DEFINITIONS, TOOL_HANDLERS } from './tools';
import { ResearchAgent } from './specialist/research-agent';
import { ComplianceAgent } from './specialist/compliance-agent';
import { EnrichmentAgent, type EnrichmentInput } from './specialist/enrichment-agent';
import { QualityGateAgent, type QualityGateInput } from './specialist/quality-gate-agent';
import { GraphWriterAgent, type GraphWriterInput } from './specialist/graph-writer-agent';
import type {
    PipelineV2Params,
    PipelineV2Result,
    PipelineV2Stage,
    ResearchReport,
    ComplianceReport,
    QualityReport,
    WriteReport,
    ChatMessage,
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
    private complianceAgent = new ComplianceAgent();
    private enrichmentAgent = new EnrichmentAgent();
    private qualityGateAgent = new QualityGateAgent();
    private graphWriterAgent = new GraphWriterAgent();

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
                write: { ...defaultStageStatus },
            },
            results: {
                researched: false,
                generated: 0,
                validated: 0,
                enriched: 0,
                approved: 0,
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

        // ── Step 2: Generate ─────────────────────────────────────────────
        if (this.isCancelled(runId)) return;
        this.setStage(run, 'generate', 'running');

        let generatedCards: EquipmentCard[];
        try {
            generatedCards = await this.generateEquipmentCards(params, researchReport, runId);
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

        // ── Step 5: Quality Gate ─────────────────────────────────────────
        if (this.isCancelled(runId)) return;
        this.setStage(run, 'quality-gate', 'running');

        const approvedCards: EquipmentCard[] = [];
        const qualityReports: QualityReport[] = [];
        try {
            for (const card of enrichedCards) {
                const gateInput: QualityGateInput = { card, minScore };
                const report = await this.qualityGateAgent.run(gateInput, runId);
                qualityReports.push(report);
                if (report.approved) {
                    approvedCards.push(card);
                }
            }
            run.results.approved = approvedCards.length;
            const totalScore = qualityReports.reduce((s, r) => s + r.score, 0);
            run.results.averageScore = qualityReports.length > 0 ? Math.round(totalScore / qualityReports.length) : 0;
            this.setStage(run, 'quality-gate', 'completed', `${approvedCards.length}/${enrichedCards.length} approved (avg score: ${run.results.averageScore})`);
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
        console.log(`[pipeline-v2] Run ${runId} completed: ${run.results.written} cards written`);
    }

    /* ─── Generate via OpenRouter ────────────────────────────────────────── */

    /**
     * Generates equipment cards using OpenRouter LLM.
     *
     * @param params  - Pipeline parameters.
     * @param research - Research report for context.
     * @param runId   - Pipeline run identifier.
     * @returns Array of generated equipment cards.
     */
    private async generateEquipmentCards(
        params: PipelineV2Params,
        research: ResearchReport,
        runId: string,
    ): Promise<EquipmentCard[]> {
        const startTime = Date.now();

        const systemPrompt = `You are a DEXPI 2.0 Equipment Card Generator. Generate realistic, standards-compliant equipment cards.

CRITICAL REQUIREMENTS:
- Tags MUST follow ISA-5.1 format: e.g. P-1001, E-2001, V-3001
- componentClassURI MUST use PCA RDL format: http://data.posccaesar.org/rdl/...
- All specifications MUST include units
- Design conditions MUST exceed operating conditions
- Include at least 3 manufacturers, 3 standards, and 3 specifications

Return a JSON array of equipment card objects.`;

        const userPrompt = `Generate ${params.quantity} equipment cards for "${params.equipmentClass}" in:
- Sector: ${params.sector}
- Sub-sector: ${params.subSector}
- Facility: ${params.facility}

## Research Data:
${JSON.stringify(research, null, 2)}

Return a JSON array of ${params.quantity} cards, each with this structure:
{
  "tag": "string (ISA-5.1 format, e.g. ${research.isaTagPrefix}-${1001})",
  "componentClass": "${params.equipmentClass}",
  "componentClassURI": "${research.pcaUri || 'http://data.posccaesar.org/rdl/...'}",
  "displayName": "string",
  "category": "string",
  "description": "string (50+ chars)",
  "sector": "${params.sector}",
  "subSector": "${params.subSector}",
  "facility": "${params.facility}",
  "specifications": { "key": { "value": "number|string", "unit": "string" } },
  "operatingConditions": {
    "designPressure": number, "operatingPressure": number,
    "designTemperature": number, "operatingTemperature": number,
    "flowRate": number
  },
  "materials": { "body": "string", "internals": "string", "gaskets": "string", "bolting": "string" },
  "standards": ["string"],
  "manufacturers": ["string"],
  "nozzles": [{ "id": "string", "size": "string", "rating": "string", "facing": "RF", "service": "string" }],
  "metadata": { "version": 1, "source": "pipeline-v2", "createdAt": "ISO-8601", "validationScore": 0 }
}

Return ONLY the JSON array.`;

        const messages: ChatMessage[] = [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
        ];

        const { response } = await chatWithTools(
            messages,
            TOOL_DEFINITIONS,
            TOOL_HANDLERS,
            { temperature: 0.4, max_tokens: 8192, response_format: { type: 'json_object' } },
            5,
        );

        const content = response.choices?.[0]?.message?.content || '';
        let cards: EquipmentCard[];

        try {
            const cleaned = content
                .replace(/```json\n?/g, '')
                .replace(/```\n?/g, '')
                .trim();
            const parsed = JSON.parse(cleaned);
            cards = Array.isArray(parsed) ? parsed : (parsed.cards || parsed.equipment || [parsed]);
        } catch {
            throw new Error(`Failed to parse generated cards: ${content.substring(0, 200)}`);
        }

        // Ensure metadata on each card
        cards = cards.map((card, i) => ({
            ...card,
            sector: params.sector,
            subSector: params.subSector,
            facility: params.facility,
            metadata: {
                ...card.metadata,
                version: card.metadata?.version ?? 1,
                source: card.metadata?.source ?? 'pipeline-v2',
                createdAt: card.metadata?.createdAt ?? new Date().toISOString(),
                validationScore: card.metadata?.validationScore ?? 0,
            },
        }));

        const durationMs = Date.now() - startTime;
        await this.audit.log(
            runId, 'generator', `Generated ${cards.length} equipment cards`,
            'success', params, { cardCount: cards.length }, durationMs,
        );

        return cards;
    }

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
