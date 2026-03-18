/**
 * Procurement Specialist Agent.
 *
 * Responsible for finding real-world vendor models for a given reference equipment card.
 * Uses web search and Perplexity to source 3 distinct vendor variations.
 *
 * @module agents/specialist/procurement-agent
 */

import { BaseSpecialist, type SpecialistConfig } from './base-specialist';
import { chatWithTools } from '../openrouter-client';
import { TOOL_DEFINITIONS, TOOL_HANDLERS } from '../tools';
import type { EquipmentCard } from '../../types';

/* ─── Types ─────────────────────────────────────────────────────────────── */

/** Input payload for the Procurement Agent. */
export interface ProcurementInput {
    /** The reference equipment card to source vendors for. */
    equipment: EquipmentCard;
}

/** Output payload: A list of vendor variations. */
export type ProcurementOutput = VendorVariationResult[];

/** Structure of a single vendor variation result. */
export interface VendorVariationResult {
    /** Manufacturer Name. */
    vendor: string;
    /** Model Number/Series. */
    model: string;
    /** Reference Tag from the input card. */
    referenceId: string;
    /** Vendor marketing description. */
    description: string;
    /** List of differentiators (e.g., "High Efficiency IE4 Motor"). */
    differentiators: string[];
    /** Specific simplified specs that differ from reference or define this model. */
    specifications: Record<string, string | number | boolean>;
    /** Associated documents (Datasheets, Manuals). */
    documents: Array<{ title: string; url: string }>;
}

/* ─── Agent Configuration ───────────────────────────────────────────────── */

const SYSTEM_PROMPT = `Role: You are "The Procurement Officer," responsible for sourcing specific vendor equipment.

Task: Find 3 distinct real-world vendor models for the following Reference Equipment:
Context: [REFERENCE_EQUIPMENT_JSON]

For each model (e.g., Siemens, ABB, Rockwell, Emerson, Flowserve), generate a "Vendor Variation" card:

Output Format (JSON Array):
[
  {
    "vendor": "[Manufacturer Name]",
    "model": "[Model Number/Series]",
    "referenceId": "[REFERENCE_TAG]",
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
- Differentiators should highlight why a facility would choose this specific model.`;

/* ─── Implementation ────────────────────────────────────────────────────── */

export class ProcurementAgent extends BaseSpecialist<ProcurementInput, ProcurementOutput> {
    constructor() {
        const config: SpecialistConfig = {
            agentId: 'procurement-agent',
            displayName: 'Procurement Officer',
            systemPrompt: SYSTEM_PROMPT,
            tools: TOOL_DEFINITIONS, // Grant access to all tools, especially search
            toolHandlers: TOOL_HANDLERS,
            completionOptions: {
                temperature: 0.4, // Slightly creative but grounded
            },
        };
        super(config);
    }

    /**
     * Executes the procurement task.
     *
     * @param input - The reference equipment card.
     * @param runId - The pipeline run ID.
     * @returns A list of 3 vendor variations.
     */
    async execute(input: ProcurementInput, runId: string): Promise<ProcurementOutput> {
        const { equipment } = input;

        // Dynamically construct the system prompt substituting [REFERENCE_EQUIPMENT_JSON] and [REFERENCE_TAG]
        const dynamicSystemPrompt = this.config.systemPrompt
            .replace('[REFERENCE_EQUIPMENT_JSON]', JSON.stringify(equipment, null, 2))
            .replace('[REFERENCE_TAG]', equipment.tag || 'REF');

        // We don't need a specific user message since the task is fully defined in the system prompt
        const userMessage = "Begin procurement research for the reference equipment provided in the context.";

        // Use chatWithTools directly to pass the dynamic system prompt
        const messages = [
            { role: 'system', content: dynamicSystemPrompt },
            { role: 'user', content: userMessage },
        ] as import('../types').ChatMessage[];

        const options = {
            temperature: this.config.completionOptions?.temperature ?? 0.4,
            max_tokens: this.config.completionOptions?.max_tokens ?? 4096,
        };

        const { response: openRouterResponse } = await chatWithTools(
            messages,
            this.config.tools,
            this.config.toolHandlers,
            options,
            this.config.maxIterations || 10
        );

        const content = openRouterResponse.choices?.[0]?.message?.content || '';

        // Strip markdown code fences before strict parsing
        const cleanedContent = content
            .replace(/```json\n?/gi, '')
            .replace(/```\n?/g, '')
            .trim();

        // Strict JSON.parse directly on the content, rejecting invalid object wrappers
        let variations: VendorVariationResult[] = [];
        try {
            const parsed = JSON.parse(cleanedContent);
            if (!Array.isArray(parsed)) {
                throw new Error('Output format invalid: Expected a JSON array of vendor variations.');
            }
            variations = parsed as unknown as VendorVariationResult[];
        } catch (err: unknown) {
            throw new Error(`Failed to parse JSON from agent response: ${err instanceof Error ? err.message : String(err)}`);
        }

        // Validate basic structure of items
        const validated = variations.map(v => ({
            vendor: String(v.vendor || 'Unknown'),
            model: String(v.model || 'Unknown'),
            referenceId: String(v.referenceId || equipment.tag || 'Unknown'),
            description: String(v.description || ''),
            differentiators: Array.isArray(v.differentiators) ? v.differentiators.map(String) : [],
            specifications: v.specifications || {},
            documents: Array.isArray(v.documents) ? v.documents.map(d => ({
                title: String(d.title || 'Document'),
                url: String(d.url || '')
            })) : []
        }));

        return validated;
    }
}
