/**
 * Obsidian Export Pipeline Orchestrator.
 *
 * Runs the 3 specialist agents sequentially:
 *   1. ContentExtractor — TSX → Markdown with frontmatter + wikilinks
 *   2. DiagramConverter — ASCII art → Mermaid diagrams
 *   3. AuditAgent — Completeness + Obsidian compliance validation
 *
 * If the audit returns corrections, those are used as the final output.
 *
 * @module agents/obsidian/pipeline
 */

import { extractContent } from './content-extractor';
import { convertDiagrams } from './diagram-converter';
import { auditExport } from './audit-agent';
import type { ObsidianExportInput, ObsidianExportOutput } from './types';

/**
 * Runs the full Obsidian export pipeline.
 *
 * @param input - Wiki page source and metadata.
 * @returns The validated Obsidian Markdown, filename, audit results, and timing.
 */
export async function runObsidianExportPipeline(
    input: ObsidianExportInput,
): Promise<ObsidianExportOutput> {
    const pipelineStart = Date.now();

    /* ─── Stage 1: Content Extraction ───────────────────────────────────── */
    console.log(`[obsidian-pipeline] Stage 1: Extracting content from ${input.slug}...`);
    const extractStart = Date.now();
    const extraction = await extractContent(input);
    const extractMs = Date.now() - extractStart;
    console.log(
        `[obsidian-pipeline] Stage 1 complete: ${extraction.sectionCount} sections, ` +
        `${extraction.tableCount} tables, ${extraction.linkCount} wikilinks (${extractMs}ms)`,
    );

    /* ─── Stage 2: Diagram Conversion ───────────────────────────────────── */
    console.log(`[obsidian-pipeline] Stage 2: Converting diagrams...`);
    const diagramStart = Date.now();
    const diagrams = await convertDiagrams(extraction.markdown);
    const diagramMs = Date.now() - diagramStart;
    console.log(
        `[obsidian-pipeline] Stage 2 complete: ${diagrams.mermaidCount} mermaid, ` +
        `${diagrams.textBlockCount} text blocks (${diagramMs}ms)`,
    );

    /* ─── Stage 3: Audit ────────────────────────────────────────────────── */
    console.log(`[obsidian-pipeline] Stage 3: Auditing export...`);
    const auditStart = Date.now();
    const audit = await auditExport(input.tsxSource, diagrams.markdown);
    const auditMs = Date.now() - auditStart;
    console.log(
        `[obsidian-pipeline] Stage 3 complete: ${audit.passed ? 'PASSED' : 'FAILED'} ` +
        `(score: ${audit.score}/100, issues: ${audit.issues.length}) (${auditMs}ms)`,
    );

    /* ─── Assemble Output ───────────────────────────────────────────────── */
    const finalMarkdown = audit.correctedMarkdown || diagrams.markdown;
    const totalMs = Date.now() - pipelineStart;

    // Derive filename from title
    const filename = `${extraction.title.replace(/[/\\?%*:|"<>]/g, '').trim()}.md`;

    console.log(
        `[obsidian-pipeline] Pipeline complete for "${extraction.title}" (${totalMs}ms total)`,
    );

    return {
        markdown: finalMarkdown,
        filename,
        audit,
        timing: {
            extractMs,
            diagramMs,
            auditMs,
            totalMs,
        },
    };
}
