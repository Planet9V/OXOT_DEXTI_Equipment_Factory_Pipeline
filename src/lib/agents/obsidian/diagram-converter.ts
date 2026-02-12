/**
 * Diagram Converter Agent.
 *
 * Specialist agent that finds ASCII art blocks in Markdown and converts
 * appropriate ones to Mermaid diagram syntax for Obsidian rendering.
 * Non-diagrammatic blocks are preserved as \`\`\`text code fences.
 *
 * @module agents/obsidian/diagram-converter
 */

import { chatCompletion } from '../openrouter-client';
import type { ChatMessage, CompletionOptions } from '../types';
import type { DiagramConversionResult } from './types';

/* ─── System Prompt ─────────────────────────────────────────────────────── */

const SYSTEM_PROMPT = `You are an expert diagram conversion agent. Your job is to convert ASCII art diagrams in Markdown to Mermaid diagram syntax that renders correctly in Obsidian.

## Rules

### What to Convert
Convert ASCII art that depicts:
- Flow diagrams (arrows like →, ──►, ──>, │, ├, └)
- Network topology diagrams
- Process sequences (numbered steps with arrows)
- Architecture layouts (boxes, layers, connections)

### What NOT to Convert
Leave as \`\`\`text code blocks:
- Simple tabular data already in text format
- Step-by-step procedures without visual connections
- Code snippets or configuration examples
- Lists of rates/schedules (e.g., TOU pricing tables)

### Mermaid Syntax Guidelines
- Use \`graph TD\` or \`graph LR\` for flowcharts
- Use \`sequenceDiagram\` for sequential interactions
- Use \`flowchart TB\` for hierarchical diagrams
- Quote node labels containing special characters: \`id["Label (info)"]\`
- Use subgraph for grouping related nodes
- Add styling with classDef where needed
- NEVER use HTML tags in Mermaid labels
- Ensure all node IDs are unique within a diagram

### Output
Return the COMPLETE Markdown document with all code blocks processed — converted diagrams use \`\`\`mermaid fences, non-diagram blocks use \`\`\`text fences. Return ONLY the complete document, no commentary.`;

/* ─── Agent ──────────────────────────────────────────────────────────────── */

const MAX_RETRIES = 3;

/**
 * Converts ASCII art blocks to Mermaid diagrams in Obsidian Markdown.
 *
 * @param markdown - The extracted Markdown containing ASCII art code blocks.
 * @returns Markdown with Mermaid diagrams replacing convertible ASCII art.
 */
export async function convertDiagrams(
    markdown: string,
): Promise<DiagramConversionResult> {
    // Quick check: if no code blocks exist, skip LLM call
    const codeBlockCount = (markdown.match(/```/g) || []).length / 2;
    if (codeBlockCount === 0) {
        return {
            markdown,
            mermaidCount: 0,
            textBlockCount: 0,
        };
    }

    const userMessage = `Process this Obsidian Markdown document. Find all fenced code blocks (especially \`\`\`text blocks) and determine which ones contain ASCII art diagrams that should be converted to Mermaid syntax. Convert appropriate ones to \`\`\`mermaid blocks and leave the rest as \`\`\`text blocks.

MARKDOWN DOCUMENT:
${markdown}`;

    const messages: ChatMessage[] = [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userMessage },
    ];

    const options: CompletionOptions = {
        temperature: 0.2,
        max_tokens: 16384,
    };

    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            const response = await chatCompletion(messages, options);
            const result = response.choices?.[0]?.message?.content || '';

            if (!result.trim()) {
                throw new Error('[diagram-converter] Empty response from LLM');
            }

            const mermaidCount = (result.match(/```mermaid/g) || []).length;
            const textBlockCount = (result.match(/```text/g) || []).length;

            return {
                markdown: result,
                mermaidCount,
                textBlockCount,
            };
        } catch (err) {
            lastError = err instanceof Error ? err : new Error(String(err));
            console.error(
                `[diagram-converter] Attempt ${attempt}/${MAX_RETRIES} failed: ${lastError.message}`,
            );
            if (attempt < MAX_RETRIES) {
                await new Promise((r) => setTimeout(r, 2000 * attempt));
            }
        }
    }

    throw lastError || new Error('[diagram-converter] Failed after retries');
}
