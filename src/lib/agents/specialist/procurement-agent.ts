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
import type { EquipmentCard } from '../../types';
import type { ChatMessage } from '../types';

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

        // Construct the system prompt by replacing placeholders
        const dynamicSystemPrompt = this.config.systemPrompt
            .replace('[REFERENCE_EQUIPMENT_JSON]', JSON.stringify(equipment, null, 2))
            .replace(/\[REFERENCE_TAG\]/g, equipment.tag || 'Unknown');

        const userMessage = `Find 3 distinct real-world vendor models for this Reference Equipment. Ensure the models are compatible with the specifications provided in the context. Return ONLY a valid JSON array.`;

        const messages: ChatMessage[] = [
            { role: 'system', content: dynamicSystemPrompt },
            { role: 'user', content: userMessage }
        ];

        // Call the LLM with tools
        const { response } = await chatWithTools(
            messages,
            this.config.tools,
            this.config.toolHandlers,
            {
                temperature: this.config.completionOptions?.temperature || 0.4,
                max_tokens: this.config.completionOptions?.max_tokens || 4096,
            },
            this.config.maxIterations || 10
        );

        const content = response.choices?.[0]?.message?.content || '';

        // First try parsing it entirely
        let parsedContent;
        try {
            parsedContent = JSON.parse(content);
        } catch {
            // If it's not valid JSON out of the box, try regex extraction
            const arrayMatch = content.match(/\[[\s\S]*\]/);
            if (!arrayMatch) {
                 throw new Error('Output format invalid: Expected a JSON array of vendor variations.');
            }
            try {
                parsedContent = JSON.parse(arrayMatch[0]);
            } catch {
                throw new Error('Output format invalid: Failed to parse JSON array of vendor variations.');
            }
        }

        // Must be an array
        if (!Array.isArray(parsedContent)) {
             throw new Error('Output format invalid: Expected a JSON array of vendor variations.');
        }

        let variations: VendorVariationResult[] = parsedContent;

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
