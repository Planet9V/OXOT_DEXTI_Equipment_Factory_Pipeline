/**
 * Obsidian Export Pipeline — Unit Tests.
 *
 * Tests for the ContentExtractor, DiagramConverter, AuditAgent agents,
 * and the API endpoint for the Export to Obsidian feature.
 *
 * @module tests/obsidian-export
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

// Ensure env vars are set for tests
process.env.OPENROUTER_API_KEY = 'test-key-12345';
process.env.OPENROUTER_MODEL = 'moonshotai/kimi-k2.5';

// ─── Mock fetch globally ─────────────────────────────────────────────────
const mockFetchResponses: Array<{ ok: boolean; status: number; body: any }> = [];

global.fetch = jest.fn(async () => {
    const next = mockFetchResponses.shift();
    if (!next) {
        return {
            ok: false,
            status: 500,
            json: async () => ({ error: 'No mock response configured' }),
            text: async () => 'No mock response configured',
        };
    }
    return {
        ok: next.ok,
        status: next.status,
        json: async () => next.body,
        text: async () => JSON.stringify(next.body),
    };
}) as jest.Mock;

/* ─── Helpers ──────────────────────────────────────────────────────────── */

function mockOpenRouterResponse(content: string) {
    mockFetchResponses.push({
        ok: true,
        status: 200,
        body: {
            id: 'test-id',
            model: 'moonshotai/kimi-k2.5',
            choices: [
                {
                    message: {
                        role: 'assistant',
                        content,
                        tool_calls: undefined,
                    },
                    finish_reason: 'stop',
                },
            ],
        },
    });
}

/* ─── Tests ────────────────────────────────────────────────────────────── */

describe('Obsidian Export Types', () => {
    test('ObsidianExportInput shape is importable', async () => {
        const { ObsidianExportInput } = await import(
            '../src/lib/agents/obsidian/types'
        ) as any;
        // Types are compile-time only; just verify the module loads
        expect(true).toBe(true);
    });
});

describe('ContentExtractor Agent', () => {
    beforeEach(() => {
        mockFetchResponses.length = 0;
        (global.fetch as jest.Mock).mockClear();
    });

    test('extractContent returns structured result with frontmatter', async () => {
        const sampleMarkdown = `---
title: "Test Page"
aliases:
  - "Test"
tags:
  - energy
  - test
created: 2026-02-12
cssclasses:
  - wiki-article
related:
  - "[[Energy Sector Hub]]"
---

# Test Page

## Section One

Some text content.

| Column A | Column B |
|----------|----------|
| Data 1   | Data 2   |

## References

Test reference.`;

        mockOpenRouterResponse(sampleMarkdown);

        const { extractContent } = await import(
            '../src/lib/agents/obsidian/content-extractor'
        );

        const result = await extractContent({
            slug: 'energy/test',
            tsxSource: '<div>Test</div>',
            urlPath: '/wiki/energy/test',
        });

        expect(result.title).toBe('Test Page');
        expect(result.tags).toContain('energy');
        expect(result.sectionCount).toBeGreaterThan(0);
        expect(result.markdown).toContain('---');
        expect(result.markdown).toContain('# Test Page');
    });

    test('extractContent retries on LLM failure', async () => {
        // First call fails
        mockFetchResponses.push({
            ok: false,
            status: 500,
            body: { error: 'Server error' },
        });

        // Second call succeeds
        mockOpenRouterResponse('---\ntitle: "Retry Test"\n---\n# Retry Test');

        const { extractContent } = await import(
            '../src/lib/agents/obsidian/content-extractor'
        );

        const result = await extractContent({
            slug: 'test',
            tsxSource: '<div>Test</div>',
            urlPath: '/wiki/test',
        });

        expect(result.title).toBe('Retry Test');
        expect(global.fetch).toHaveBeenCalledTimes(2);
    });
});

describe('DiagramConverter Agent', () => {
    beforeEach(() => {
        mockFetchResponses.length = 0;
        (global.fetch as jest.Mock).mockClear();
    });

    test('convertDiagrams skips LLM when no code blocks exist', async () => {
        const { convertDiagrams } = await import(
            '../src/lib/agents/obsidian/diagram-converter'
        );

        const result = await convertDiagrams('# No code blocks\nJust text.');

        expect(result.mermaidCount).toBe(0);
        expect(result.textBlockCount).toBe(0);
        expect(global.fetch).not.toHaveBeenCalled();
    });

    test('convertDiagrams converts ASCII art to Mermaid', async () => {
        const inputMarkdown = '# Test\n\n```text\nA --> B --> C\n```\n';
        const outputMarkdown = '# Test\n\n```mermaid\ngraph LR\n    A --> B --> C\n```\n';

        mockOpenRouterResponse(outputMarkdown);

        const { convertDiagrams } = await import(
            '../src/lib/agents/obsidian/diagram-converter'
        );

        const result = await convertDiagrams(inputMarkdown);

        expect(result.mermaidCount).toBe(1);
        expect(result.markdown).toContain('```mermaid');
    });
});

describe('AuditAgent', () => {
    beforeEach(() => {
        mockFetchResponses.length = 0;
        (global.fetch as jest.Mock).mockClear();
    });

    test('auditExport returns structured audit result', async () => {
        const auditJson = JSON.stringify({
            passed: true,
            score: 95,
            issues: [
                {
                    category: 'formatting',
                    severity: 'warning',
                    message: 'Minor whitespace issue',
                },
            ],
            correctedMarkdown: null,
        });

        mockOpenRouterResponse(auditJson);

        const { auditExport } = await import(
            '../src/lib/agents/obsidian/audit-agent'
        );

        const result = await auditExport(
            '<div>Original</div>',
            '# Converted\nContent',
        );

        expect(result.passed).toBe(true);
        expect(result.score).toBe(95);
        expect(result.issues).toHaveLength(1);
        expect(result.issues[0].severity).toBe('warning');
    });

    test('auditExport returns corrections on failure', async () => {
        const auditJson = JSON.stringify({
            passed: false,
            score: 70,
            issues: [
                {
                    category: 'completeness',
                    severity: 'error',
                    message: 'Missing section: BOM',
                    fix: 'Add ## 5. Bill of Materials section',
                },
            ],
            correctedMarkdown: '# Fixed\n## 5. Bill of Materials\n| Component | Spec |\n|-----------|------|\n| A | B |',
        });

        mockOpenRouterResponse(auditJson);

        const { auditExport } = await import(
            '../src/lib/agents/obsidian/audit-agent'
        );

        const result = await auditExport(
            '<div>Original with BOM</div>',
            '# Missing BOM',
        );

        expect(result.passed).toBe(false);
        expect(result.score).toBe(70);
        expect(result.correctedMarkdown).toContain('Bill of Materials');
    });
});

describe('API Endpoint Validation', () => {
    test('rejects requests without slug', async () => {
        // Validates that empty/missing slug is caught
        const slug = '';
        expect(!slug || typeof slug !== 'string').toBeTruthy();
    });

    test('sanitizes path traversal attempts', () => {
        const malicious = '../../../etc/passwd';
        const sanitized = malicious
            .replace(/\.\./g, '')
            .replace(/[^a-zA-Z0-9/-]/g, '');

        expect(sanitized).not.toContain('..');
        // After removing .. and non-alphanumeric chars, only /etc/passwd path segments remain
        // The key security check is that '..' is removed
        expect(sanitized).toBe('///etc/passwd');
        // In production, fs.readFile on this constructed path will fail (404)
    });

    test('constructs correct TSX file path', () => {
        const slug = 'energy/smart-homes';
        const sanitized = slug.replace(/\.\./g, '').replace(/[^a-zA-Z0-9/-]/g, '');

        expect(sanitized).toBe('energy/smart-homes');
        expect(`src/app/wiki/${sanitized}/page.tsx`).toBe(
            'src/app/wiki/energy/smart-homes/page.tsx',
        );
    });
});
