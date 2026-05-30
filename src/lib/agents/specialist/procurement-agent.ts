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
import { chatWithTools } from '../openrouter-client';
import type { ChatMessage, CompletionOptions } from '../types';
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
        // passing it directly to chatWithTools instead of mutating the shared this.config.systemPrompt
        const systemPrompt = this.config.systemPrompt
            .replace('[REFERENCE_EQUIPMENT_JSON]', JSON.stringify(equipment, null, 2))
            .replace('[REFERENCE_TAG]', equipment.tag || 'REF');

        const messages: ChatMessage[] = [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: 'Please provide the 3 vendor variations as a JSON array.' },
        ];

        const options: CompletionOptions = {
            temperature: 0.4,
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

        // Extract JSON array string
        let cleaned = content
            .replace(/```json\n?/g, '')
            .replace(/```\n?/g, '')
            .trim();

        let parsed: unknown;
        try {
            parsed = JSON.parse(cleaned);
        } catch {
            throw new Error(`Failed to parse JSON from agent response: ${content.substring(0, 200)}`);
        }

        // Strictly enforce JSON array output by throwing an error if the LLM response is wrapped in an object
        if (!Array.isArray(parsed)) {
             throw new Error('Output format invalid: Expected a JSON array of vendor variations.');
        }

        let variations: VendorVariationResult[] = parsed as unknown as VendorVariationResult[];

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
