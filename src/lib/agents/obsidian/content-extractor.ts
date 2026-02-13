/**
 * Content Extractor Agent.
 *
 * Specialist agent that parses TSX wiki page source and converts it to
 * Obsidian-compatible Markdown with full YAML frontmatter, [[wikilinks]],
 * pipe-delimited tables, and structured heading hierarchy.
 *
 * @module agents/obsidian/content-extractor
 */

import { chatCompletion } from '../openrouter-client';
import type { ChatMessage, CompletionOptions } from '../types';
import type { ObsidianExportInput, ContentExtractionResult } from './types';

/* ─── System Prompt ─────────────────────────────────────────────────────── */

const SYSTEM_PROMPT = `You are an expert content extraction agent. Your job is to convert React/TSX wiki page source code into Obsidian-compatible Markdown.

## Rules

### YAML Frontmatter
Generate a YAML frontmatter block with these fields:
- \`title\`: The page's main heading (from the <h1> element)
- \`aliases\`: 2-4 alternate names for the page
- \`tags\`: 5-10 relevant tags derived from the content (lowercase, hyphenated)
- \`created\`: Today's date in ISO format (YYYY-MM-DD)
- \`cssclasses\`: ["wiki-article"]
- \`related\`: Array of related pages as Obsidian [[wikilinks]], extracted from the "See Also" section or any internal links

### Content Conversion
- Extract ALL visible text content from the TSX — do NOT skip any section
- Convert <h1> to # heading, <h2> to ## heading, <h3> to ### heading
- Convert <table> structures to pipe-delimited Markdown tables with header separators
- Convert <ul>/<li> to Markdown bullet lists
- Convert <ol>/<li> to numbered lists
- Preserve ALL emphasis: <span className="text-white"> → **bold**, <em> → *italic*
- Convert <code> and code blocks to backtick markdown code
- Convert <pre> blocks to fenced code blocks (use \`\`\`text for now — diagrams will be converted later)

### Link Conversion
- Convert internal href links (e.g., '/wiki/energy/bess') to [[wikilinks]]
- Use the page title as the display text: [[Battery Energy Storage|BESS]]
- A complete slug-to-title mapping is provided in the user message — always use it for wikilink resolution

### References
- Preserve all APA citations in a ## References section
- Each citation on its own line

### Output Format
Return ONLY the complete Markdown document — frontmatter + content. No commentary.`;

/* ─── Slug-to-Title Map ─────────────────────────────────────────────────── */

const SLUG_TITLE_MAP: Record<string, string> = {
    /* ─── Wiki Home ────────────────────────────────────────────────────── */
    '/wiki': 'Wiki Home',

    /* ─── Energy Sector ────────────────────────────────────────────────── */
    '/wiki/energy': 'Energy Sector Hub',
    '/wiki/energy/transmission': 'Transmission Facilities',
    '/wiki/energy/distribution': 'Distribution Facilities',
    '/wiki/energy/distribution-points': 'Distribution Points',
    '/wiki/energy/microgrids': 'Microgrids',
    '/wiki/energy/smart-homes': 'Smart Homes',
    '/wiki/energy/bess': 'Battery Energy Storage',
    '/wiki/energy/vpp-derms': 'VPP DERMS',

    /* ─── Water Sector ─────────────────────────────────────────────────── */
    '/wiki/water': 'Water & Wastewater Systems',
    '/wiki/water/treatment-plants': 'Surface Water Treatment Plants',
    '/wiki/water/distribution': 'Water Distribution Networks',
    '/wiki/water/pump-stations': 'Pump Stations',
    '/wiki/water/wastewater': 'Wastewater Treatment (POTW)',
    '/wiki/water/collection-systems': 'Collection Systems',
    '/wiki/water/stormwater': 'Stormwater Management Facilities',

    /* ─── DEXPI 2.0 ───────────────────────────────────────────────────── */
    '/wiki/dexpi': 'DEXPI 2.0 Standard',
    '/wiki/dexpi/data-model': 'Data Model',
    '/wiki/dexpi/equipment-classes': 'Equipment Classes',
    '/wiki/dexpi/xml-schema': 'DEXPI 2.0 XML Schema',
    '/wiki/dexpi/standards': 'Engineering Standards',

    /* ─── Neo4j ────────────────────────────────────────────────────────── */
    '/wiki/neo4j': 'Neo4j Graph Database',
    '/wiki/neo4j/docker-setup': 'Docker Setup',
    '/wiki/neo4j/cypher-guide': 'Cypher Query Language',
    '/wiki/neo4j/data-model': 'Data Model & Schema',
    '/wiki/neo4j/migration-guide': 'Migration from Memgraph',
    '/wiki/neo4j/javascript-driver': 'JavaScript Driver',
    '/wiki/neo4j/api-integration': 'API Integration',
    '/wiki/neo4j/example-queries': 'Example Queries',

    /* ─── Chemical Sector ─────────────────────────────────────────────── */
    '/wiki/chemical': 'Chemical Sector Hub',
    '/wiki/chemical/petrochemical': 'Petrochemical Complex',
    '/wiki/chemical/chlor-alkali': 'Chlor-Alkali Plants',
    '/wiki/chemical/batch-processing': 'Batch Chemical Processing',
    '/wiki/chemical/ammonia-fertilizer': 'Ammonia & Fertilizer Complex',
    '/wiki/chemical/api-manufacturing': 'API Manufacturing Plant',
    '/wiki/chemical/consumer-formulation': 'Consumer Chemical Formulation Plant',

    /* ─── AI Pipeline ──────────────────────────────────────────────────── */
    '/wiki/pipeline': 'AI Pipeline V2',

    /* ─── CISA Critical Infrastructure Sector Pages ────────────────────── */
    '/wiki/sectors/CHEM': 'Chemical Sector',
    '/wiki/sectors/COMM': 'Commercial Facilities Sector',
    '/wiki/sectors/COMU': 'Communications Sector',
    '/wiki/sectors/CMAN': 'Critical Manufacturing Sector',
    '/wiki/sectors/DAMS': 'Dams Sector',
    '/wiki/sectors/DEFN': 'Defense Industrial Base Sector',
    '/wiki/sectors/EMER': 'Emergency Services Sector',
    '/wiki/sectors/ENER': 'Energy Sector Overview',
    '/wiki/sectors/FINA': 'Financial Services Sector',
    '/wiki/sectors/FOOD': 'Food and Agriculture Sector',
    '/wiki/sectors/GOVT': 'Government Facilities Sector',
    '/wiki/sectors/HLTH': 'Healthcare and Public Health Sector',
    '/wiki/sectors/ITEC': 'Information Technology Sector',
    '/wiki/sectors/NUCL': 'Nuclear Reactors, Materials, and Waste Sector',
    '/wiki/sectors/TRAN': 'Transportation Systems Sector',
    '/wiki/sectors/WATR': 'Water and Wastewater Systems Sector',
};

/* ─── Agent ──────────────────────────────────────────────────────────────── */

const MAX_RETRIES = 3;

/**
 * Extracts content from a TSX wiki page and converts it to Obsidian Markdown.
 *
 * @param input - The wiki page source and metadata.
 * @returns Extracted Markdown with frontmatter, tables, and wikilinks.
 */
export async function extractContent(
    input: ObsidianExportInput,
): Promise<ContentExtractionResult> {
    const userMessage = `Convert this TSX wiki page to Obsidian-compatible Markdown. The page URL path is: ${input.urlPath}
Today's date is: ${new Date().toISOString().split('T')[0]}

Here is the slug-to-title mapping for wikilinks:
${Object.entries(SLUG_TITLE_MAP).map(([k, v]) => `${k} → ${v}`).join('\n')}

TSX SOURCE:
\`\`\`tsx
${input.tsxSource}
\`\`\``;

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
            const markdown = response.choices?.[0]?.message?.content || '';

            if (!markdown.trim()) {
                throw new Error('[content-extractor] Empty response from LLM');
            }

            // Parse metrics from the output
            const title = extractTitle(markdown);
            const tags = extractTags(markdown);
            const sectionCount = (markdown.match(/^#{1,3} /gm) || []).length;
            const tableCount = (markdown.match(/^\|/gm) || []).length > 0
                ? (markdown.match(/^\|[-:| ]+\|$/gm) || []).length
                : 0;
            const linkCount = (markdown.match(/\[\[/g) || []).length;

            return {
                markdown,
                title,
                tags,
                sectionCount,
                tableCount,
                linkCount,
            };
        } catch (err) {
            lastError = err instanceof Error ? err : new Error(String(err));
            console.error(
                `[content-extractor] Attempt ${attempt}/${MAX_RETRIES} failed: ${lastError.message}`,
            );
            if (attempt < MAX_RETRIES) {
                await new Promise((r) => setTimeout(r, 2000 * attempt));
            }
        }
    }

    throw lastError || new Error('[content-extractor] Failed after retries');
}

/**
 * Extracts the title from YAML frontmatter.
 *
 * @param markdown - The complete markdown string.
 * @returns The page title.
 */
function extractTitle(markdown: string): string {
    const match = markdown.match(/^title:\s*["']?(.+?)["']?\s*$/m);
    if (match) return match[1];

    const h1Match = markdown.match(/^# (.+)$/m);
    return h1Match ? h1Match[1] : 'Untitled';
}

/**
 * Extracts tags from YAML frontmatter.
 *
 * @param markdown - The complete markdown string.
 * @returns Array of tags.
 */
function extractTags(markdown: string): string[] {
    const frontmatterMatch = markdown.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) return [];

    const frontmatter = frontmatterMatch[1];
    const tagsSection = frontmatter.match(/tags:\n((?:\s+-\s+.+\n?)*)/);
    if (!tagsSection) return [];

    return tagsSection[1]
        .split('\n')
        .map((line) => line.replace(/^\s+-\s+/, '').trim())
        .filter(Boolean);
}
