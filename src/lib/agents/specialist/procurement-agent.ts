/**
 * Procurement Specialist Agent.
 *
 * Responsible for finding real-world vendor models for a given reference equipment card.
 * Uses web search and Perplexity to source 3 distinct vendor variations.
 *
 * @module agents/specialist/procurement-agent
 */

import { BaseSpecialist, type SpecialistConfig } from './base-specialist';
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
- Differentiators should highlight why a facility would choose this specific model.
- Use the provided tools (search_web, search_perplexity) to verify information and prevent hallucinated data.`;

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

        // Construct the dynamic prompt payload locally to avoid mutating shared state
        let dynamicSystemPrompt = this.config.systemPrompt;
        if (dynamicSystemPrompt.includes('[REFERENCE_EQUIPMENT_JSON]')) {
            dynamicSystemPrompt = dynamicSystemPrompt.replace(/\[REFERENCE_EQUIPMENT_JSON\]/g, () => JSON.stringify(equipment, null, 2));
        }
        if (dynamicSystemPrompt.includes('[REFERENCE_TAG]')) {
            dynamicSystemPrompt = dynamicSystemPrompt.replace(/\[REFERENCE_TAG\]/g, String(equipment.tag || 'REF'));
        }

        const userMessage = `Find 3 distinct real-world vendor models for this Reference Equipment.
Ensure the models are compatible with the specifications provided in the context. Return ONLY a valid JSON array.`;

        // We override this.config.systemPrompt temporarily, or just call chatWithTools directly?
        // Let's create a local copy of config and use callLLM if it allows systemPrompt override.
        // BaseSpecialist doesn't have an override for systemPrompt in callLLM, so we temporarily replace it
        // BUT wait, to avoid concurrency issues, we shouldn't mutate this.config.systemPrompt.
        // Let's override callLLM locally for this class to pass the dynamic system prompt.
        const response = await this.callLLMWithDynamicPrompt(userMessage, dynamicSystemPrompt);

        // The BaseSpecialist.parseJSON returns Record<string, unknown>, but we expect an array.
        // If the LLM returns an object wrapping the array, the constraint says we strictly enforce JSON array outputs by throwing an error.

        let variations: VendorVariationResult[] = [];

        if (Array.isArray(response)) {
            variations = response as unknown as VendorVariationResult[];
        } else {
             throw new Error('Output format invalid: Expected a JSON array of vendor variations, but received an object.');
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

    /**
     * Calls OpenRouter with a dynamic system prompt.
     */
    private async callLLMWithDynamicPrompt(userMessage: string, systemPrompt: string): Promise<Record<string, unknown> | unknown[]> {
        const { chatWithTools } = await import('../openrouter-client');

        const messages: import('../types').ChatMessage[] = [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage },
        ];

        const options: import('../types').CompletionOptions = {
            temperature: 0.3,
            max_tokens: 4096,
            ...this.config.completionOptions,
        };

        const { response } = await chatWithTools(
            messages,
            this.config.tools,
            this.config.toolHandlers,
            options,
            this.config.maxIterations || 10,
        );

        const content = response.choices?.[0]?.message?.content || '';
        return this.parseJSONWithArraySupport(content);
    }

    private parseJSONWithArraySupport(text: string): Record<string, unknown> | unknown[] {
        // Strip markdown code fences
        let cleaned = text
            .replace(/```json\n?/g, '')
            .replace(/```\n?/g, '')
            .trim();

        // Try to extract JSON object or array
        const jsonMatch = cleaned.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
        if (jsonMatch) {
            cleaned = jsonMatch[1];
        }

        try {
            return JSON.parse(cleaned);
        } catch {
            throw new Error(`Failed to parse JSON from agent response: ${text.substring(0, 200)}`);
        }
    }
}
