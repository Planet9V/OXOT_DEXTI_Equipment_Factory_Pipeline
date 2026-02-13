/**
 * Generator Specialist Agent.
 *
 * Production-grade DEXPI 2.0 equipment card generator. Uses reference
 * defaults as baseline configuration and produces realistic, specification-
 * compliant equipment cards. Replaces the inline generateEquipmentCards()
 * method that was previously in pipeline-v2.ts.
 *
 * @module agents/specialist/generator-agent
 */

import { BaseSpecialist } from './base-specialist';
import { getDefaults } from '../reference-defaults';
import type { ReferenceDefaults } from '../reference-defaults';
import type { ResearchReport, GeneratorInput } from '../types';
import type { EquipmentCard } from '../../types';
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

const SYSTEM_PROMPT = `You are a DEXPI 2.0 Equipment Data Sheet Generator — a senior industrial process engineer creating realistic equipment cards for a knowledge graph.

# YOUR ROLE
You generate equipment cards that are TECHNICALLY ACCURATE and SPECIFICATION-COMPLIANT. You act as if you are filling out a real industrial equipment data sheet, not generating test data.

# DEXPI 2.0 MANDATORY FIELD REQUIREMENTS

Every equipment card MUST have ALL of these fields:

## 1. TAG (ISA-5.1 Format — CRITICAL)
- Format: 1-4 uppercase letters + dash + 3-4 digits + optional letter suffix
- Examples: P-1001, E-2001A, V-3001, CV-4002B
- The letter prefix identifies the equipment type (P=Pump, E=Exchanger, V=Vessel, etc.)
- Tag numbers should be realistic: use 1000-series for the first unit, 2000 for second, etc.

## 2. componentClass
- The DEXPI 2.0 equipment class name (e.g. "CentrifugalPump", "ShellTubeHeatExchanger")
- Must exactly match a recognized DEXPI 2.0 class

## 3. componentClassURI
- MUST be a valid POSC Caesar RDL URI: http://data.posccaesar.org/rdl/RDS...
- OR a DEXPI sandbox URI: http://sandbox.dexpi.org/rdl/...
- If unsure, use the search_standards tool to find the correct URI

## 4. displayName
- Human-readable name (e.g. "Reactor Feed Pump A", "Process Air Compressor")
- Should describe the equipment's function in the facility

## 5. description
- Minimum 50 characters
- Technical description of the equipment's purpose and key features
- Include operating context within the facility

## 6. specifications
- EVERY value MUST include a unit
- Format: { "key": { "value": number|string, "unit": "string" } }
- Minimum 5 specifications per card
- Use the Reference Baseline values as starting points — vary them realistically

## 7. operatingConditions
- designPressure: MUST be > operatingPressure (typically 1.1-1.5x operating)
- designTemperature: MUST be > operatingTemperature (typically 25-50°C margin)
- All values in standard units (barg for pressure, °C for temperature)
- flowRate: include where applicable

## 8. materials
- body: The primary material of construction (e.g. "Carbon Steel SA-516 Gr.70")
- internals: Internal components material
- gaskets: Gasket material specification
- bolting: Bolt material specification

## 9. standards
- Minimum 3 applicable standards
- Use real standard codes (API, ASME, ISO, IEC, etc.)
- Include the standard title in parentheses

## 10. manufacturers
- Minimum 3 real manufacturers who make this type of equipment
- Must be actual companies that exist

## 11. nozzles
- At least 2 nozzle configurations
- Each: { "id": "N1", "size": "6\\"", "rating": "150#", "facing": "RF", "service": "Suction" }
- Nozzle sizes and ratings must be consistent with the operating conditions

## 12. metadata
- version: 1
- source: "pipeline-v2"
- createdAt: ISO-8601 timestamp
- validationScore: 0 (will be set by quality gate)

# RULES FOR REALISTIC DATA
1. NEVER use placeholder values like "TBD", "N/A", or "string"
2. Design conditions ALWAYS exceed operating conditions
3. Materials must be appropriate for the operating conditions
4. Specifications must be internally consistent (e.g. pump head and pressure match)
5. Use the Reference Baseline as your starting point — vary values ±20-50% for realism
6. If you have research data, prefer research values over reference baseline

# OUTPUT FORMAT
Return ONLY a valid JSON array of equipment card objects. No markdown fences, no commentary.`;

/* ─── Generator Agent ───────────────────────────────────────────────────── */

/**
 * Generator specialist agent.
 *
 * Generates DEXPI 2.0 compliant equipment cards using reference defaults
 * as baseline configuration and research data for grounding. Produces
 * realistic, specification-compliant cards with proper ISA tags, PCA URIs,
 * and engineering data.
 */
export class GeneratorAgent extends BaseSpecialist<GeneratorInput, EquipmentCard[]> {
    constructor() {
        const generatorTools = TOOL_DEFINITIONS.filter((t) =>
            ['search_perplexity', 'search_standards', 'validate_class_uri', 'search_web'].includes(t.function.name),
        );

        super({
            agentId: 'generator-agent',
            displayName: 'Generator Agent',
            systemPrompt: SYSTEM_PROMPT,
            tools: generatorTools,
            toolHandlers: TOOL_HANDLERS,
            completionOptions: { temperature: 0.4, max_tokens: 8192 },
        });
    }

    /**
     * Generates equipment cards for the given input.
     *
     * Injects reference defaults and research data into the prompt,
     * then calls the LLM to produce DEXPI 2.0 compliant cards.
     *
     * @param input - Generator input with params, research, and optional remediation plan.
     * @param runId - Pipeline run identifier.
     * @returns Array of generated equipment cards.
     */
    async execute(input: GeneratorInput, runId: string): Promise<EquipmentCard[]> {
        const { params, research, remediationPlan } = input;
        const defaults = getDefaults(params.equipmentClass);
        const tagPrefix = ISA_TAG_PREFIX[params.equipmentClass] || params.equipmentClass.slice(0, 2).toUpperCase();

        const userPrompt = this.buildPrompt(params, research, defaults, tagPrefix, remediationPlan);

        const result = await this.callLLM(userPrompt);

        // Parse result — could be array directly or wrapped in an object
        let cards: EquipmentCard[];
        if (Array.isArray(result)) {
            cards = result as unknown as EquipmentCard[];
        } else {
            const arr = result.cards || result.equipment || result.data;
            if (Array.isArray(arr)) {
                cards = arr as unknown as EquipmentCard[];
            } else {
                cards = [result as unknown as EquipmentCard];
            }
        }

        // Stamp metadata on each card
        cards = cards.map((card) => ({
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

        console.log(`[generator-agent] Run ${runId}: Generated ${cards.length} cards for ${params.equipmentClass}`);
        return cards;
    }

    /**
     * Builds the user prompt with reference defaults, research data,
     * and optional remediation instructions.
     *
     * @param params - Pipeline parameters.
     * @param research - Research report.
     * @param defaults - Reference defaults for the equipment category.
     * @param tagPrefix - ISA tag prefix.
     * @param remediationPlan - Optional remediation plan from audit agent (for fix loop).
     * @returns Complete user prompt string.
     */
    private buildPrompt(
        params: { equipmentClass: string; quantity: number; sector: string; subSector: string; facility: string },
        research: ResearchReport,
        defaults: ReferenceDefaults,
        tagPrefix: string,
        remediationPlan?: unknown,
    ): string {
        const sections: string[] = [];

        // Header
        sections.push(`Generate ${params.quantity} equipment card(s) for "${params.equipmentClass}" in:`);
        sections.push(`- Sector: ${params.sector}`);
        sections.push(`- Sub-sector: ${params.subSector}`);
        sections.push(`- Facility: ${params.facility}`);
        sections.push(`- Tag prefix: ${tagPrefix} (e.g. ${tagPrefix}-1001, ${tagPrefix}-1002)`);

        // Reference baseline
        sections.push('');
        sections.push('## REFERENCE BASELINE CONFIGURATION');
        sections.push('Use these as starting values. Vary them ±20-50% for realism.');
        sections.push('');
        sections.push('### Specifications');
        for (const [key, spec] of Object.entries(defaults.specifications)) {
            const rangeInfo = spec.range ? ` [plausible range: ${spec.range[0]}–${spec.range[1]}]` : '';
            sections.push(`- ${key}: ${spec.value} ${spec.unit}${rangeInfo}`);
        }

        sections.push('');
        sections.push('### Operating Conditions');
        const oc = defaults.operatingConditions;
        sections.push(`- Design Pressure: ${oc.designPressure.typical} ${oc.designPressure.unit} [range: ${oc.designPressure.min}–${oc.designPressure.max}]`);
        sections.push(`- Operating Pressure: ${oc.operatingPressure.typical} ${oc.operatingPressure.unit} [range: ${oc.operatingPressure.min}–${oc.operatingPressure.max}]`);
        sections.push(`- Design Temperature: ${oc.designTemperature.typical} ${oc.designTemperature.unit} [range: ${oc.designTemperature.min}–${oc.designTemperature.max}]`);
        sections.push(`- Operating Temperature: ${oc.operatingTemperature.typical} ${oc.operatingTemperature.unit} [range: ${oc.operatingTemperature.min}–${oc.operatingTemperature.max}]`);
        if (oc.flowRate) {
            sections.push(`- Flow Rate: ${oc.flowRate.typical} ${oc.flowRate.unit} [range: ${oc.flowRate.min}–${oc.flowRate.max}]`);
        }

        sections.push('');
        sections.push('### Materials');
        sections.push(`- Body: ${defaults.materials.body}`);
        sections.push(`- Internals: ${defaults.materials.internals}`);
        sections.push(`- Gaskets: ${defaults.materials.gaskets}`);
        sections.push(`- Bolting: ${defaults.materials.bolting}`);

        sections.push('');
        sections.push('### Standards');
        defaults.standards.forEach((std) => sections.push(`- ${std}`));

        sections.push('');
        sections.push('### Manufacturers');
        defaults.manufacturers.forEach((mfg) => sections.push(`- ${mfg}`));

        sections.push('');
        sections.push('### Nozzle Template');
        defaults.nozzleTemplate.forEach((n) => {
            sections.push(`- ${n.id}: ${n.size} ${n.rating} ${n.facing} — ${n.service}`);
        });

        // Research data
        sections.push('');
        sections.push('## RESEARCH DATA (from Perplexity + PCA RDL)');
        sections.push('Prefer these values over the reference baseline where available.');
        sections.push('');
        sections.push(`- PCA RDL URI: ${research.pcaUri || 'Use search_standards tool to find it'}`);
        sections.push(`- ISA Tag Prefix: ${research.isaTagPrefix}`);
        if (research.manufacturers.length > 0) {
            sections.push(`- Manufacturers: ${research.manufacturers.join(', ')}`);
        }
        if (research.standards.length > 0) {
            sections.push(`- Standards: ${research.standards.join(', ')}`);
        }
        if (Object.keys(research.specifications).length > 0) {
            sections.push('- Specifications:');
            for (const [key, val] of Object.entries(research.specifications)) {
                sections.push(`  - ${key}: ${val.value} ${val.unit}`);
            }
        }
        if (Object.keys(research.materials).length > 0) {
            sections.push('- Materials:');
            for (const [key, val] of Object.entries(research.materials)) {
                sections.push(`  - ${key}: ${val}`);
            }
        }
        if (research.nozzleConfigs.length > 0) {
            sections.push('- Nozzle configs:');
            research.nozzleConfigs.forEach((nc) => {
                sections.push(`  - ${nc.id}: ${nc.size} ${nc.rating} — ${nc.service}`);
            });
        }
        if (research.citations.length > 0) {
            sections.push('- Citations:');
            research.citations.slice(0, 5).forEach((c) => sections.push(`  - ${c}`));
        }

        // Remediation instructions (for fix loop)
        if (remediationPlan) {
            sections.push('');
            sections.push('## ⚠️ REMEDIATION INSTRUCTIONS (FIX REQUIRED)');
            sections.push('The previous attempt was rejected. You MUST fix these specific issues:');
            sections.push('');
            sections.push(JSON.stringify(remediationPlan, null, 2));
            sections.push('');
            sections.push('Apply ALL fixes above. Do NOT repeat the same mistakes.');
        }

        // Output instruction
        sections.push('');
        sections.push(`Return ONLY a valid JSON array of ${params.quantity} equipment card(s). No markdown, no commentary.`);

        return sections.join('\n');
    }
}
