/**
 * DEXPI AI Application Assistant — Multi-Persona Agent.
 *
 * Orchestrates multiple expert personas working in parallel to research,
 * generate, validate, and review DEXPI 2.0 compliant equipment. Each
 * persona has a specialized system prompt and can invoke tools.
 *
 * Personas:
 * - Process Engineer: Equipment specs, operating conditions, materials
 * - Standards Expert: DEXPI 2.0 compliance, PCA/RDL URIs, ISA tagging
 * - Safety Analyst: CVE risks, hazard analysis, protective equipment
 * - Quality Reviewer: Validation scores, data completeness, production quality
 *
 * @module agents/agent
 */

import { chatWithTools, testOpenRouterConnection } from './openrouter-client';
import { TOOL_DEFINITIONS, TOOL_HANDLERS } from './tools';
import type {
    ChatMessage,
    AgentContext,
    AgentResponse,
    CompletionOptions,
    ResearchParams,
    ResearchResult,
    ReviewResult,
    CoverageAnalysis,
    ToolTrace,
    VendorVariation,
} from './types';

/* ─── Expert Persona System Prompts ─────────────────────────────────────── */

const PERSONAS = {
    coordinator: `You are the DEXPI Equipment Factory AI Assistant — a senior industrial engineer coordinating a team of expert personas. You help users research, generate, validate, and manage DEXPI 2.0 compliant equipment data for critical infrastructure sectors.

You have access to tools for:
- Querying the Memgraph knowledge graph (equipment, sectors, facilities)
- Searching POSC Caesar RDL for standard equipment class URIs
- Web search (Tavily/Brave) for real-time technical data
- NIST NVD for cybersecurity vulnerability assessment
- NewsAPI for industry news and incident reports
- STITCH for chemical interaction data

Always provide structured, factual responses. When generating equipment data, ensure DEXPI 2.0 compliance with proper component class URIs, ISA tag prefixes, and complete specifications.`,

    processEngineer: `You are a Senior Process Engineer with 25+ years of experience in industrial equipment design and specification. Your expertise covers:
- Equipment sizing and selection for all CISA critical infrastructure sectors
- Operating conditions (pressure, temperature, flow) and design margins
- Materials of construction selection (ASME, ASTM standards)
- Manufacturer evaluation and vendor qualification
- Nozzle configurations and piping connections

Provide detailed, technically accurate specifications. Always cite applicable standards (ASME, API, IEEE, IEC). Use your tools to verify data against the knowledge graph and web sources.`,

    standardsExpert: `You are a DEXPI 2.0 and ISO 15926 Standards Expert. Your specialization:
- DEXPI 2.0 proteus XML schema compliance
- POSC Caesar Reference Data Library (RDL) URI assignment
- ISA-5.1 instrument and equipment tag naming conventions
- ISO 15926-4 reference data classification
- Component class taxonomy and hierarchy

Every equipment card MUST have a valid componentClassURI from POSC Caesar RDL. Use the search_standards and validate_class_uri tools to verify all URIs. Assign correct ISA tag prefixes.`,

    safetyAnalyst: `You are a Critical Infrastructure Safety Analyst specializing in:
- NIST Cybersecurity Framework for industrial control systems (ICS/SCADA)
- CVE assessment for equipment with digital interfaces
- Safety Integrity Level (SIL) classification per IEC 61508/61511
- HAZOP and risk assessment methodology
- Protective equipment specification (relief valves, arrestors, protection relays)

Use the lookup_cve tool to check for known vulnerabilities. Flag any equipment that interfaces with SCADA/DCS systems. Recommend protective measures.`,

    qualityReviewer: `You are a Quality Assurance Engineer for DEXPI 2.0 equipment data. Your role:
- Validate equipment card completeness (all required fields populated)
- Check data consistency (units, ranges, cross-references)
- Verify production-level quality (no placeholder data, realistic specs)
- Score cards on a 0-100 scale based on completeness and accuracy
- Flag missing or suspicious data

A production-quality card must have: valid tag, componentClassURI, specifications with units, operating conditions, at least 2 manufacturers, applicable standards, and material selections.`,

    procurementOfficer: `You are "The Procurement Officer," responsible for sourcing specific vendor equipment.
Your task is to find 3 distinct real-world vendor models for Reference Equipment.
Models must be REAL and currently (or recently) manufactured.
Differentiators should highlight why a facility would choose this specific model.

You have access to web search tools to find real-world data. Use them to verify models and specifications.`,
};

/** Persona names. */
export type PersonaName = keyof typeof PERSONAS;

/* ─── DexpiAgent Class ──────────────────────────────────────────────────── */

/**
 * Multi-persona AI agent for DEXPI equipment management.
 *
 * Supports both direct chat (single persona) and parallel expert consultation
 * (multiple personas working concurrently on different aspects of a task).
 */
export class DexpiAgent {
    private defaultOptions: CompletionOptions;

    constructor(options?: Partial<CompletionOptions>) {
        this.defaultOptions = {
            temperature: 0.7,
            max_tokens: 4096,
            ...options,
        };
    }

    /**
     * Chat with a single persona.
     *
     * @param messages - Conversation history.
     * @param persona  - Which expert persona to use (default: coordinator).
     * @param context  - Optional domain context.
     * @returns Agent response with tool traces.
     */
    async chat(
        messages: ChatMessage[],
        persona: PersonaName = 'coordinator',
        context?: AgentContext,
    ): Promise<AgentResponse> {
        const systemPrompt = this.buildSystemPrompt(persona, context);

        const fullMessages: ChatMessage[] = [
            { role: 'system', content: systemPrompt },
            ...messages,
        ];

        const { response, toolTraces } = await chatWithTools(
            fullMessages,
            TOOL_DEFINITIONS,
            TOOL_HANDLERS,
            this.defaultOptions,
        );

        const choice = response.choices[0];

        return {
            content: choice?.message?.content || '',
            toolTraces,
            model: response.model || process.env.OPENROUTER_MODEL || 'moonshotai/kimi-k2.5',
            usage: response.usage,
        };
    }

    /**
     * Consult multiple expert personas in parallel.
     *
     * Sends the same user query to multiple personas concurrently.
     * Each persona applies their expertise and tools independently.
     *
     * @param query    - The user's question or task.
     * @param personas - Which personas to consult (default: all 4 experts).
     * @param context  - Optional domain context.
     * @returns Map of persona name → response.
     */
    async consultExperts(
        query: string,
        personas: PersonaName[] = ['processEngineer', 'standardsExpert', 'safetyAnalyst', 'qualityReviewer'],
        context?: AgentContext,
    ): Promise<Record<string, AgentResponse>> {
        const results: Record<string, AgentResponse> = {};

        const promises = personas.map(async (persona) => {
            try {
                const response = await this.chat(
                    [{ role: 'user', content: query }],
                    persona,
                    context,
                );
                results[persona] = response;
            } catch (err: unknown) {
                const errMsg = err instanceof Error ? err.message : String(err);
                console.error(`[agent] Persona ${persona} failed: ${errMsg}`);
                results[persona] = {
                    content: `[ERROR] ${persona} failed: ${errMsg}`,
                    toolTraces: [],
                    model: 'error',
                };
            }
        });

        await Promise.all(promises);
        return results;
    }

    /**
     * Research a specific equipment class using multiple expert personas.
     *
     * Runs the process engineer, standards expert, and safety analyst in parallel,
     * then has the coordinator synthesise their findings.
     *
     * @param params - Sector, facility, and equipment class to research.
     * @returns Structured research result.
     */
    async researchEquipment(params: ResearchParams): Promise<ResearchResult> {
        const context: AgentContext = {
            sector: params.sector,
            subSector: params.subSector,
            facility: params.facility,
            equipmentClass: params.equipmentClass,
        };

        const researchQuery = `Research the equipment class "${params.equipmentClass}" for use in a ${params.facility} facility within the ${params.sector} / ${params.subSector} sector.

Provide:
1. Detailed technical specifications (design pressure, temperature, materials)
2. Major manufacturers (at least 3)
3. Applicable standards (ASME, API, IEEE, IEC, etc.)
4. DEXPI 2.0 component class URI from POSC Caesar RDL
5. ISA tag prefix
6. Typical operating conditions
7. Known CVE risks for ICS/SCADA-connected variants
8. Nozzle / connection configurations

Return structured JSON.`;

        // Run 3 experts in parallel
        const expertResults = await this.consultExperts(
            researchQuery,
            ['processEngineer', 'standardsExpert', 'safetyAnalyst'],
            context,
        );

        // Synthesise with coordinator
        const synthesisPrompt = `You are synthesising research from three expert personas about "${params.equipmentClass}" equipment.

## Process Engineer Report:
${expertResults.processEngineer?.content || 'No data'}

## Standards Expert Report:
${expertResults.standardsExpert?.content || 'No data'}

## Safety Analyst Report:
${expertResults.safetyAnalyst?.content || 'No data'}

Combine these into a single structured JSON response with these exact fields:
{
  "equipmentClass": "${params.equipmentClass}",
  "specifications": { /* key-value with units */ },
  "manufacturers": [ /* at least 3 */ ],
  "standards": [ /* applicable standards */ ],
  "webSources": [ /* URLs referenced */ ],
  "cveRisks": [ /* relevant CVE IDs or risk descriptions */ ]
}

Return ONLY valid JSON, no markdown.`;

        const synthesis = await this.chat(
            [{ role: 'user', content: synthesisPrompt }],
            'coordinator',
            context,
        );

        try {
            // Extract JSON from response
            const jsonMatch = synthesis.content.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]) as ResearchResult;
            }
        } catch {
            console.warn('[agent] Failed to parse synthesis JSON, returning raw');
        }

        return {
            equipmentClass: params.equipmentClass,
            specifications: {},
            manufacturers: [],
            standards: [],
            webSources: [],
            cveRisks: [],
        };
    }

    /**
     * Find real-world vendor variations for a given reference equipment.
     *
     * @param referenceEquipment - The reference equipment data.
     * @returns Array of vendor variations.
     */
    async findVendorVariations(referenceEquipment: Record<string, unknown>): Promise<VendorVariation[]> {
        const prompt = `Task: Find 3 distinct real-world vendor models for the following Reference Equipment:
Context: ${JSON.stringify(referenceEquipment, null, 2)}

For each model (e.g., Siemens, ABB, Rockwell, Emerson, Flowserve), generate a "Vendor Variation" card:

Output Format (JSON Array):
[
  {
    "vendor": "[Manufacturer Name]",
    "model": "[Model Number/Series]",
    "referenceId": "${referenceEquipment.tag || 'REF'}",
    "description": "[Vendor marketing description]",
    "differentiators": [
      "High Efficiency IE4 Motor",
      "Integrated Condition Monitoring",
      "Corrosion Resistant Coating"
    ],
    "specifications": {
      // Specific simplified specs that differ from reference or define this model
    },
    "documents": [
      { "title": "Datasheet", "url": "[Real URL if found]" },
      { "title": "Manual", "url": "..." }
    ]
  }
]

Constraint:
- Models must be REAL and currently (or recently) manufactured.
- Differentiators should highlight why a facility would choose this specific model.
- Return ONLY valid JSON array, no markdown.`;

        const result = await this.chat(
            [{ role: 'user', content: prompt }],
            'procurementOfficer'
        );

        try {
            const jsonMatch = result.content.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]) as VendorVariation[];
            }
        } catch {
            console.warn('[agent] Failed to parse vendor variations JSON');
        }

        return [];
    }

    /**
     * Review an equipment card for production quality using the quality reviewer.
     *
     * @param card - Equipment card to review.
     * @returns Review result with score, issues, and suggestions.
     */
    async reviewEquipmentCard(card: Record<string, unknown>): Promise<ReviewResult> {
        const reviewPrompt = `Review this DEXPI 2.0 equipment card for production quality:

${JSON.stringify(card, null, 2)}

Score it 0-100 and provide:
1. Issues found (missing fields, invalid data, etc.)
2. Improvement suggestions
3. An improved version of the card if score < 80

Return JSON:
{
  "score": <number>,
  "issues": ["..."],
  "suggestions": ["..."],
  "improvedCard": { /* only if score < 80 */ }
}`;

        const result = await this.chat(
            [{ role: 'user', content: reviewPrompt }],
            'qualityReviewer',
        );

        try {
            const jsonMatch = result.content.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]) as ReviewResult;
            }
        } catch {
            console.warn('[agent] Failed to parse review JSON');
        }

        return { score: 0, issues: ['Failed to parse review'], suggestions: [] };
    }


    /**
     * Analyse equipment coverage for a facility.
     *
     * @param facility   - Facility code.
     * @param sectorCode - Sector code.
     * @returns Coverage analysis with gaps and recommendations.
     */
    async analyzeCoverage(facility: string, sectorCode: string): Promise<CoverageAnalysis> {
        const prompt = `Analyse equipment coverage for facility "${facility}" in sector "${sectorCode}".

Use the query_memgraph tool to check what equipment already exists, then compare against typical equipment requirements for this facility type.

Return JSON:
{
  "facility": "${facility}",
  "expectedTypes": ["..."],
  "existingTypes": ["..."],
  "missingTypes": ["..."],
  "coveragePercent": <number>,
  "recommendations": ["..."]
}`;

        const result = await this.chat(
            [{ role: 'user', content: prompt }],
            'coordinator',
            { sector: sectorCode, facility },
        );

        try {
            const jsonMatch = result.content.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]) as CoverageAnalysis;
            }
        } catch {
            console.warn('[agent] Failed to parse coverage JSON');
        }

        return {
            facility,
            expectedTypes: [],
            existingTypes: [],
            missingTypes: [],
            coveragePercent: 0,
            recommendations: [],
        };
    }

    /**
     * Tests if the agent can connect to OpenRouter.
     *
     * @returns True if OpenRouter is reachable.
     */
    async testConnection(): Promise<boolean> {
        return testOpenRouterConnection();
    }

    /**
     * Lists available personas.
     *
     * @returns Array of persona names and descriptions.
     */
    getPersonas(): Array<{ name: string; description: string }> {
        return Object.entries(PERSONAS).map(([name, prompt]) => ({
            name,
            description: prompt.split('\n')[0],
        }));
    }

    /**
     * Builds the full system prompt for a persona with optional context.
     */
    private buildSystemPrompt(persona: PersonaName, context?: AgentContext): string {
        let prompt = PERSONAS[persona];

        if (context) {
            const parts: string[] = [];
            if (context.sector) parts.push(`Sector: ${context.sector}`);
            if (context.subSector) parts.push(`Sub-sector: ${context.subSector}`);
            if (context.facility) parts.push(`Facility: ${context.facility}`);
            if (context.equipmentClass) parts.push(`Equipment class: ${context.equipmentClass}`);

            if (parts.length > 0) {
                prompt += `\n\n## Current Context\n${parts.join('\n')}`;
            }

            if (context.additionalInstructions) {
                prompt += `\n\n## Additional Instructions\n${context.additionalInstructions}`;
            }
        }

        return prompt;
    }
}

/* ─── Singleton ─────────────────────────────────────────────────────────── */

let agentInstance: DexpiAgent | null = null;

/**
 * Returns the singleton DexpiAgent instance.
 *
 * @returns The shared agent instance.
 */
export function getAgent(): DexpiAgent {
    if (!agentInstance) {
        agentInstance = new DexpiAgent();
    }
    return agentInstance;
}
