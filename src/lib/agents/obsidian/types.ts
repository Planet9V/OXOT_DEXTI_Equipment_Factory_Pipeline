/**
 * Obsidian Export Pipeline — Shared Types.
 *
 * Type definitions shared across the three specialist agents
 * (ContentExtractor, DiagramConverter, AuditAgent) in the
 * Obsidian export pipeline.
 *
 * @module agents/obsidian/types
 */

/* ─── Pipeline I/O ──────────────────────────────────────────────────────── */

/** Input to the Obsidian export pipeline. */
export interface ObsidianExportInput {
    /** Wiki page slug, e.g. 'energy/smart-homes'. */
    slug: string;
    /** Raw TSX source code of the page. */
    tsxSource: string;
    /** Full URL path of the page, e.g. '/wiki/energy/smart-homes'. */
    urlPath: string;
}

/** Final output from the pipeline — the validated Obsidian Markdown. */
export interface ObsidianExportOutput {
    /** The complete Obsidian-compatible Markdown string. */
    markdown: string;
    /** Filename for download, e.g. 'Smart Homes.md'. */
    filename: string;
    /** Audit results from the validation stage. */
    audit: AuditResult;
    /** Per-agent timing in milliseconds. */
    timing: {
        extractMs: number;
        diagramMs: number;
        auditMs: number;
        totalMs: number;
    };
}

/* ─── Agent-Level Types ─────────────────────────────────────────────────── */

/** Output from the ContentExtractor agent. */
export interface ContentExtractionResult {
    /** Extracted Markdown with YAML frontmatter and wikilinks. */
    markdown: string;
    /** Page title extracted from h1. */
    title: string;
    /** Tags derived from content. */
    tags: string[];
    /** Number of sections extracted. */
    sectionCount: number;
    /** Number of tables converted. */
    tableCount: number;
    /** Number of links converted to wikilinks. */
    linkCount: number;
}

/** Output from the DiagramConverter agent. */
export interface DiagramConversionResult {
    /** Markdown with ASCII art replaced by Mermaid blocks. */
    markdown: string;
    /** Number of diagrams converted to Mermaid. */
    mermaidCount: number;
    /** Number of code blocks left as text (non-diagrammatic). */
    textBlockCount: number;
}

/** Output from the AuditAgent. */
export interface AuditResult {
    /** Whether the export passed all checks. */
    passed: boolean;
    /** Overall confidence score 0–100. */
    score: number;
    /** List of issues found (empty if passed). */
    issues: AuditIssue[];
    /** Corrected markdown (only set if corrections were needed). */
    correctedMarkdown?: string;
}

/** A single audit issue. */
export interface AuditIssue {
    /** Category: 'completeness' | 'frontmatter' | 'wikilink' | 'mermaid' | 'heading' | 'formatting'. */
    category: string;
    /** Severity: 'error' | 'warning'. */
    severity: 'error' | 'warning';
    /** Human-readable description. */
    message: string;
    /** Suggested fix (if applicable). */
    fix?: string;
}
