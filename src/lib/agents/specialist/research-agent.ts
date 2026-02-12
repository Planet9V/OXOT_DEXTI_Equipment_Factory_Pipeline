/**
 * Research Specialist Agent.
 *
 * Gathers equipment specifications, standards, and manufacturer data using
 * Perplexity API, PCA SPARQL, and web search in parallel. Produces a typed
 * ResearchReport for downstream agents.
 *
 * @module agents/specialist/research-agent
 */

import { BaseSpecialist } from './base-specialist';
import * as perplexity from '../perplexity-client';
import * as pca from '../../pca-sparql';
import type { ResearchReport, ResearchParams } from '../types';
import { TOOL_DEFINITIONS, TOOL_HANDLERS } from '../tools';

/* ─── ISA Tag Prefix Map ────────────────────────────────────────────────── */

const ISA_TAG_PREFIX: Record<string, string> = {
    Pump: 'P', CentrifugalPump: 'P', Compressor: 'C', CentrifugalCompressor: 'C',
    Turbine: 'T', SteamTurbine: 'ST', GasTurbine: 'GT', Fan: 'FN', Blower: 'BL',
    Agitator: 'AG', Centrifuge: 'CF', Conveyor: 'CNV', Mixer: 'MX',
    PressureVessel: 'V', Vessel: 'V', Tank: 'TK', StorageTank: 'TK',
    Column: 'COL', ProcessColumn: 'COL', Reactor: 'R', Drum: 'D',
    Separator: 'SEP', Filter: 'FL', Scrubber: 'SCR', Silo: 'SI',
    HeatExchanger: 'E', ShellTubeHeatExchanger: 'E', AirCooledHeatExchanger: 'E',
    Boiler: 'BLR', Furnace: 'H', Heater: 'H', Condenser: 'CND', Cooler: 'CLR',
    Generator: 'G', ElectricGenerator: 'G', Motor: 'M', Transformer: 'XF',
    ControlValve: 'CV', ShutoffValve: 'XV', SafetyValve: 'PSV', GateValve: 'GV',
    Transmitter: 'TT', Analyzer: 'AT', FlowMeter: 'FE',
};

/* ─── System Prompt ─────────────────────────────────────────────────────── */

const SYSTEM_PROMPT = `You are an Industrial Equipment Research Specialist with expertise in:
- DEXPI 2.0 specification data models
- POSC Caesar Reference Data Library (RDL)
- Industrial equipment sizing, materials, and standards (ASME, API, ISO, IEC)
- Manufacturer databases and product lines

Your task is to research equipment and produce a structured JSON report.
You MUST use available tools to gather real data — never fabricate specifications.
Always search PCA RDL for the correct componentClassURI.
Always search for applicable standards codes.

Return ONLY valid JSON matching this exact schema:
{
  "equipmentClass": "string",
  "specifications": { "key": { "value": "string|number", "unit": "string" } },
  "manufacturers": ["string"],
  "standards": ["string"],
  "pcaUri": "string",
  "isaTagPrefix": "string",
  "citations": ["string"],
  "materials": { "body": "string", "internals": "string" },
  "nozzleConfigs": [{ "id": "string", "size": "string", "rating": "string", "service": "string" }]
}`;

/* ─── Research Agent ────────────────────────────────────────────────────── */

/**
 * Research specialist agent.
 *
 * Runs Perplexity, PCA SPARQL, and web search in parallel to build
 * a comprehensive research report for an equipment class.
 */
export class ResearchAgent extends BaseSpecialist<ResearchParams, ResearchReport> {
    constructor() {
        const researchTools = TOOL_DEFINITIONS.filter((t) =>
            ['search_web', 'search_standards', 'validate_class_uri', 'search_news'].includes(t.function.name),
        );

        super({
            agentId: 'research-agent',
            displayName: 'Research Agent',
            systemPrompt: SYSTEM_PROMPT,
            tools: researchTools,
            toolHandlers: TOOL_HANDLERS,
            completionOptions: { temperature: 0.2, max_tokens: 4096 },
        });
    }

    /**
     * Researches an equipment class using multiple data sources in parallel.
     *
     * @param input - Research parameters (sector, facility, equipmentClass).
     * @param runId - Pipeline run identifier.
     * @returns Structured research report.
     */
    async execute(input: ResearchParams, runId: string): Promise<ResearchReport> {
        // Run parallel data gathering
        const [perplexityResult, pcaResults] = await Promise.all([
            this.searchPerplexity(input),
            this.searchPCA(input.equipmentClass),
        ]);

        // Resolve PCA URI
        const pcaUri = pcaResults.length > 0
            ? pcaResults[0].uri
            : '';

        // Build LLM prompt with gathered data
        const contextData = {
            perplexityResearch: perplexityResult?.content || 'No Perplexity data available',
            pcaResults,
            equipmentClass: input.equipmentClass,
            sector: input.sector,
            facility: input.facility,
        };

        const prompt = `Research the equipment class "${input.equipmentClass}" for use in a ${input.facility} facility in the ${input.sector} sector.

## Pre-gathered Research Data:
${JSON.stringify(contextData, null, 2)}

## PCA RDL URI: ${pcaUri || 'Not found — use search_standards tool to find it'}

Use your tools to fill any gaps. Return the complete research report as JSON.`;

        const result = await this.callLLM(prompt);

        // Build typed report with fallbacks
        const report: ResearchReport = {
            equipmentClass: input.equipmentClass,
            specifications: (result.specifications as Record<string, { value: string | number; unit: string }>) || {},
            manufacturers: (result.manufacturers as string[]) || [],
            standards: (result.standards as string[]) || [],
            pcaUri: (result.pcaUri as string) || pcaUri,
            isaTagPrefix: ISA_TAG_PREFIX[input.equipmentClass] || input.equipmentClass.slice(0, 2).toUpperCase(),
            citations: [
                ...(perplexityResult?.citations.map((c) => c.url) || []),
                ...((result.citations as string[]) || []),
            ],
            materials: (result.materials as Record<string, string>) || {},
            nozzleConfigs: (result.nozzleConfigs as ResearchReport['nozzleConfigs']) || [],
        };

        console.log(`[research-agent] Run ${runId}: Researched ${input.equipmentClass} — ${report.manufacturers.length} manufacturers, ${report.standards.length} standards`);
        return report;
    }

    /**
     * Searches Perplexity API for equipment specifications.
     *
     * @param input - Research parameters.
     * @returns Perplexity result or null.
     */
    private async searchPerplexity(input: ResearchParams) {
        try {
            return await perplexity.searchEquipmentSpecs(input.equipmentClass, input.sector);
        } catch (err) {
            console.warn(`[research-agent] Perplexity search failed: ${err instanceof Error ? err.message : String(err)}`);
            return null;
        }
    }

    /**
     * Searches PCA RDL SPARQL endpoint for equipment class URIs.
     *
     * @param equipmentClass - Equipment class name.
     * @returns Array of matching PCA classes.
     */
    private async searchPCA(equipmentClass: string) {
        try {
            return await pca.searchEquipmentClass(equipmentClass);
        } catch (err) {
            console.warn(`[research-agent] PCA SPARQL search failed: ${err instanceof Error ? err.message : String(err)}`);
            return [];
        }
    }
}
