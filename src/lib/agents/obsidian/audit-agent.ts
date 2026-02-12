/**
 * Audit Agent.
 *
 * Specialist agent that validates Obsidian Markdown exports for
 * content completeness and Obsidian specification compliance.
 * Returns a pass/fail result with issues list, and optionally
 * provides corrected Markdown on failure.
 *
 * @module agents/obsidian/audit-agent
 */

import { chatCompletion } from '../openrouter-client';
import type { ChatMessage, CompletionOptions } from '../types';
import type { AuditResult } from './types';

/* ─── System Prompt ─────────────────────────────────────────────────────── */

const SYSTEM_PROMPT = `You are an expert Obsidian Markdown audit agent. You perform two validation passes on an exported wiki page and return structured results.

## Pass 1: Content Completeness
Compare the ORIGINAL TSX source against the CONVERTED Markdown and verify:
- All section headings are present (h1, h2, h3)
- All table data is preserved (every row and column)
- All list items are present
- All code/diagram blocks are preserved
- All citations/references are present
- All "See Also" links are converted to [[wikilinks]]
- No text content has been truncated or omitted

## Pass 2: Obsidian Specification Compliance
Verify:
- Valid YAML frontmatter with required fields (title, aliases, tags, created, cssclasses, related)
- Frontmatter enclosed in --- delimiters
- All internal links use [[wikilink]] format (not [text](url))
- Mermaid blocks use \`\`\`mermaid fence syntax
- Single # heading (title) appears exactly once after frontmatter
- Heading hierarchy is correct (no skipped levels like # → ###)
- Tables have proper header separator rows (|---|---|)
- No raw HTML remains in the output
- No JSX/React syntax remains

## Output Format
Return a JSON object:
{
  "passed": true/false,
  "score": 0-100,
  "issues": [
    {
      "category": "completeness|frontmatter|wikilink|mermaid|heading|formatting",
      "severity": "error|warning",
      "message": "description of issue",
      "fix": "suggested fix or null"
    }
  ],
  "correctedMarkdown": "full corrected markdown if any errors found, or null if passed"
}

If score >= 90 and no errors (only warnings), set passed = true.
If you provide correctedMarkdown, it must be the COMPLETE document with all fixes applied.`;

/* ─── Agent ──────────────────────────────────────────────────────────────── */

const MAX_RETRIES = 3;

/**
 * Audits an Obsidian Markdown export for completeness and compliance.
 *
 * @param originalTsx - The original TSX source code.
 * @param markdown - The converted Obsidian Markdown to audit.
 * @returns Audit results with pass/fail, score, issues, and optional corrections.
 */
export async function auditExport(
    originalTsx: string,
    markdown: string,
): Promise<AuditResult> {
    const userMessage = `Audit this Obsidian Markdown export against its original TSX source.

ORIGINAL TSX SOURCE:
\`\`\`tsx
${originalTsx}
\`\`\`

CONVERTED OBSIDIAN MARKDOWN:
\`\`\`markdown
${markdown}
\`\`\`

Return your audit results as a JSON object with the schema described in your system prompt.`;

    const messages: ChatMessage[] = [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userMessage },
    ];

    const options: CompletionOptions = {
        temperature: 0.1,
        max_tokens: 16384,
        response_format: { type: 'json_object' },
    };

    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            const response = await chatCompletion(messages, options);
            const content = response.choices?.[0]?.message?.content || '';

            if (!content.trim()) {
                throw new Error('[audit-agent] Empty response from LLM');
            }

            const parsed = parseAuditResponse(content);
            return parsed;
        } catch (err) {
            lastError = err instanceof Error ? err : new Error(String(err));
            console.error(
                `[audit-agent] Attempt ${attempt}/${MAX_RETRIES} failed: ${lastError.message}`,
            );
            if (attempt < MAX_RETRIES) {
                await new Promise((r) => setTimeout(r, 2000 * attempt));
            }
        }
    }

    throw lastError || new Error('[audit-agent] Failed after retries');
}

/**
 * Parses the LLM's JSON response into a typed AuditResult.
 *
 * @param text - Raw JSON text from the LLM.
 * @returns Parsed AuditResult.
 * @throws Error if JSON is invalid or missing required fields.
 */
function parseAuditResponse(text: string): AuditResult {
    // Strip markdown code fences if present
    let cleaned = text
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();

    const jsonMatch = cleaned.match(/(\{[\s\S]*\})/);
    if (jsonMatch) {
        cleaned = jsonMatch[1];
    }

    try {
        const parsed = JSON.parse(cleaned);

        return {
            passed: Boolean(parsed.passed),
            score: typeof parsed.score === 'number' ? parsed.score : 0,
            issues: Array.isArray(parsed.issues)
                ? parsed.issues.map((issue: Record<string, unknown>) => ({
                    category: String(issue.category || 'formatting'),
                    severity: issue.severity === 'warning' ? 'warning' as const : 'error' as const,
                    message: String(issue.message || 'Unknown issue'),
                    fix: issue.fix ? String(issue.fix) : undefined,
                }))
                : [],
            correctedMarkdown: parsed.correctedMarkdown
                ? String(parsed.correctedMarkdown)
                : undefined,
        };
    } catch {
        throw new Error(
            `[audit-agent] Failed to parse audit JSON: ${text.substring(0, 200)}`,
        );
    }
}
