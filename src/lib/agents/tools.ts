/**
 * Agent Tool Definitions & Handlers.
 *
 * Defines the tools available to the DEXPI AI Agent. Each tool has:
 * - A JSON Schema definition (OpenAI function-calling format)
 * - An async handler that executes the tool and returns a string result
 *
 * Tools provide the agent with access to Memgraph, web search, CVE lookup,
 * standards validation, and equipment management.
 *
 * @module agents/tools
 */

import type { ToolDefinition } from './types';
import { runQuery } from '../memgraph';
import * as pca from '../pca-sparql';
import * as graphSchema from '../graph-schema';
import * as perplexityClient from './perplexity-client';

/* ═══════════════════════════════════════════════════════════════════════════
   TOOL DEFINITIONS
   ═══════════════════════════════════════════════════════════════════════════ */

/** All tool definitions available to the agent. */
export const TOOL_DEFINITIONS: ToolDefinition[] = [
    {
        type: 'function',
        function: {
            name: 'query_memgraph',
            description:
                'Execute a read-only Cypher query against the Memgraph knowledge graph. Returns JSON results. Only MATCH queries are allowed — no mutations.',
            parameters: {
                type: 'object',
                properties: {
                    cypher: {
                        type: 'string',
                        description: 'A read-only Cypher MATCH query to execute.',
                    },
                },
                required: ['cypher'],
            },
        },
    },
    {
        type: 'function',
        function: {
            name: 'search_equipment',
            description:
                'Search for equipment in the knowledge graph by component class, sector, or facility. Returns matching equipment cards.',
            parameters: {
                type: 'object',
                properties: {
                    componentClass: {
                        type: 'string',
                        description: 'Equipment class to search for (e.g., Pump, Transformer).',
                    },
                    sector: {
                        type: 'string',
                        description: 'Sector code to filter by (e.g., ENER, CHEM).',
                    },
                    facility: {
                        type: 'string',
                        description: 'Facility code to filter by.',
                    },
                },
            },
        },
    },
    {
        type: 'function',
        function: {
            name: 'validate_class_uri',
            description:
                'Validate a DEXPI / POSC Caesar RDL URI for an equipment class. Returns the label if valid, or null if not found.',
            parameters: {
                type: 'object',
                properties: {
                    uri: {
                        type: 'string',
                        description: 'The RDL URI to validate (e.g., http://data.posccaesar.org/rdl/RDS1234).',
                    },
                },
                required: ['uri'],
            },
        },
    },
    {
        type: 'function',
        function: {
            name: 'search_standards',
            description:
                'Search the POSC Caesar RDL for equipment classes by name. Returns matching URIs and labels.',
            parameters: {
                type: 'object',
                properties: {
                    query: {
                        type: 'string',
                        description: 'Equipment class name to search for (e.g., "centrifugal pump").',
                    },
                },
                required: ['query'],
            },
        },
    },
    {
        type: 'function',
        function: {
            name: 'search_web',
            description:
                'Search the web for real-time information using Tavily or Brave. Use for technical specifications, manufacturer data, or industry news.',
            parameters: {
                type: 'object',
                properties: {
                    query: {
                        type: 'string',
                        description: 'Search query string.',
                    },
                    engine: {
                        type: 'string',
                        description: 'Search engine to use.',
                        enum: ['tavily', 'brave'],
                    },
                },
                required: ['query'],
            },
        },
    },
    {
        type: 'function',
        function: {
            name: 'search_news',
            description:
                'Search for recent industry news related to equipment, safety incidents, or regulatory changes using NewsAPI.',
            parameters: {
                type: 'object',
                properties: {
                    query: {
                        type: 'string',
                        description: 'News search query.',
                    },
                    from_date: {
                        type: 'string',
                        description: 'Start date in YYYY-MM-DD format (optional).',
                    },
                },
                required: ['query'],
            },
        },
    },
    {
        type: 'function',
        function: {
            name: 'lookup_cve',
            description:
                'Search the NIST National Vulnerability Database for CVEs related to industrial equipment, SCADA, or ICS systems.',
            parameters: {
                type: 'object',
                properties: {
                    keyword: {
                        type: 'string',
                        description: 'Keyword to search for (e.g., "transformer SCADA", "circuit breaker ICS").',
                    },
                    severity: {
                        type: 'string',
                        description: 'Minimum severity level.',
                        enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
                    },
                },
                required: ['keyword'],
            },
        },
    },
    {
        type: 'function',
        function: {
            name: 'lookup_chemical',
            description:
                'Look up chemical-protein interactions using the STITCH database. Useful for chemical process equipment safety analysis.',
            parameters: {
                type: 'object',
                properties: {
                    chemical: {
                        type: 'string',
                        description: 'Chemical name or STITCH identifier.',
                    },
                },
                required: ['chemical'],
            },
        },
    },
    {
        type: 'function',
        function: {
            name: 'search_perplexity',
            description:
                'Search the Perplexity Sonar API for real-time industrial equipment specifications, standards, and manufacturer data. Returns results with source citations.',
            parameters: {
                type: 'object',
                properties: {
                    query: {
                        type: 'string',
                        description: 'The research query to search for.',
                    },
                    domain: {
                        type: 'string',
                        description: 'Domain filter preset for focused results.',
                        enum: ['industrial', 'standards', 'safety', 'general'],
                    },
                },
                required: ['query'],
            },
        },
    },
    {
        type: 'function',
        function: {
            name: 'write_to_graph',
            description:
                'Insert or update an equipment node in the Neo4j knowledge graph. Creates the node with DEXPI 2.0 properties and optionally assigns it to a facility.',
            parameters: {
                type: 'object',
                properties: {
                    tag: {
                        type: 'string',
                        description: 'Equipment ISA-5.1 tag (e.g., P-1001).',
                    },
                    componentClass: {
                        type: 'string',
                        description: 'DEXPI component class name.',
                    },
                    componentClassURI: {
                        type: 'string',
                        description: 'PCA RDL or DEXPI URI for the component class.',
                    },
                    displayName: {
                        type: 'string',
                        description: 'Human-readable display name.',
                    },
                    category: {
                        type: 'string',
                        description: 'Equipment category.',
                    },
                    facility: {
                        type: 'string',
                        description: 'Facility code to assign the equipment to (optional).',
                    },
                },
                required: ['tag', 'componentClass', 'componentClassURI', 'displayName', 'category'],
            },
        },
    },
    {
        type: 'function',
        function: {
            name: 'validate_dexpi_compliance',
            description:
                'Run DEXPI 2.0 rule-based validation on an equipment card. Checks tag format, URI validity, required fields, and specification plausibility.',
            parameters: {
                type: 'object',
                properties: {
                    tag: {
                        type: 'string',
                        description: 'Equipment tag to validate.',
                    },
                    componentClass: {
                        type: 'string',
                        description: 'Component class name.',
                    },
                    componentClassURI: {
                        type: 'string',
                        description: 'Component class URI.',
                    },
                    specCount: {
                        type: 'string',
                        description: 'Number of specifications on the card.',
                    },
                },
                required: ['tag', 'componentClass'],
            },
        },
    },
];

/* ═══════════════════════════════════════════════════════════════════════════
   TOOL HANDLERS
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Executes a read-only Cypher query against Memgraph.
 *
 * @param args - Must contain `cypher` string.
 * @returns JSON string of query results.
 */
async function handleQueryMemgraph(args: Record<string, unknown>): Promise<string> {
    const cypher = String(args.cypher || '');

    // Security: block mutations
    const upper = cypher.toUpperCase().trim();
    if (/\b(CREATE|MERGE|SET|DELETE|REMOVE|DROP|DETACH)\b/.test(upper)) {
        return JSON.stringify({ error: 'Only read-only MATCH queries are permitted.' });
    }

    try {
        const records = await runQuery(cypher);
        const results = records.map(r => {
            const obj: Record<string, unknown> = {};
            r.keys.forEach((key: PropertyKey) => {
                const val = r.get(key as string);
                obj[String(key)] = val?.toNumber ? val.toNumber() : val;
            });
            return obj;
        });
        return JSON.stringify({ count: results.length, results: results.slice(0, 50) });
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        return JSON.stringify({ error: msg });
    }
}

/**
 * Searches for equipment nodes in Memgraph.
 *
 * @param args - Optional componentClass, sector, facility filters.
 * @returns JSON string of matching equipment.
 */
async function handleSearchEquipment(args: Record<string, unknown>): Promise<string> {
    const conditions: string[] = [];
    const params: Record<string, unknown> = {};

    if (args.componentClass) {
        conditions.push('e.componentClass = $componentClass');
        params.componentClass = String(args.componentClass);
    }
    if (args.sector) {
        conditions.push('e.sector = $sector');
        params.sector = String(args.sector);
    }
    if (args.facility) {
        conditions.push('e.facilityCode = $facility');
        params.facility = String(args.facility);
    }

    const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    const cypher = `MATCH (e:Equipment) ${where} RETURN e LIMIT 25`;

    try {
        const records = await runQuery(cypher, params);
        const equipment = records.map(r => {
            const node = r.get('e');
            return node.properties || node;
        });
        return JSON.stringify({ count: equipment.length, equipment });
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        return JSON.stringify({ error: msg });
    }
}

/**
 * Validates a POSC Caesar RDL URI.
 *
 * @param args - Must contain `uri` string.
 * @returns JSON with label if valid, null otherwise.
 */
async function handleValidateClassUri(args: Record<string, unknown>): Promise<string> {
    try {
        const label = await pca.validateClassUri(String(args.uri || ''));
        return JSON.stringify({ uri: args.uri, valid: label !== null, label });
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        return JSON.stringify({ error: msg });
    }
}

/**
 * Searches the POSC Caesar RDL for equipment classes.
 *
 * @param args - Must contain `query` string.
 * @returns JSON list of matching classes with URIs.
 */
async function handleSearchStandards(args: Record<string, unknown>): Promise<string> {
    try {
        const results = await pca.searchEquipmentClass(String(args.query || ''));
        return JSON.stringify({ count: results.length, results });
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        return JSON.stringify({ error: msg });
    }
}

/**
 * Searches the web via Tavily or Brave.
 *
 * @param args - Must contain `query`, optional `engine` ('tavily'|'brave').
 * @returns JSON search results.
 */
async function handleSearchWeb(args: Record<string, unknown>): Promise<string> {
    const query = String(args.query || '');
    const engine = String(args.engine || 'tavily');

    try {
        if (engine === 'brave') {
            const apiKey = process.env.BRAVE_API_KEY;
            if (!apiKey) return JSON.stringify({ error: 'BRAVE_API_KEY not set' });

            const response = await fetch(
                `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}&count=5`,
                { headers: { 'X-Subscription-Token': apiKey, 'Accept': 'application/json' } },
            );
            if (!response.ok) {
                return JSON.stringify({ error: `Brave API ${response.status}` });
            }
            const data = await response.json();
            const results = (data.web?.results || []).slice(0, 5).map((r: Record<string, string>) => ({
                title: r.title,
                url: r.url,
                description: r.description,
            }));
            return JSON.stringify({ engine: 'brave', count: results.length, results });
        }

        // Default: Tavily
        const apiKey = process.env.TAVILY_API_KEY;
        if (!apiKey) return JSON.stringify({ error: 'TAVILY_API_KEY not set' });

        const response = await fetch('https://api.tavily.com/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ api_key: apiKey, query, max_results: 5, search_depth: 'advanced' }),
        });
        if (!response.ok) {
            return JSON.stringify({ error: `Tavily API ${response.status}` });
        }
        const data = await response.json();
        const results = (data.results || []).slice(0, 5).map((r: Record<string, string>) => ({
            title: r.title,
            url: r.url,
            content: r.content?.substring(0, 300),
        }));
        return JSON.stringify({ engine: 'tavily', count: results.length, results });
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        return JSON.stringify({ error: msg });
    }
}

/**
 * Searches NewsAPI for recent industry news.
 *
 * @param args - Must contain `query`, optional `from_date`.
 * @returns JSON news articles.
 */
async function handleSearchNews(args: Record<string, unknown>): Promise<string> {
    const apiKey = process.env.NEWSAPI_KEY;
    if (!apiKey) return JSON.stringify({ error: 'NEWSAPI_KEY not set' });

    const query = String(args.query || '');
    const fromDate = args.from_date ? `&from=${args.from_date}` : '';

    try {
        const response = await fetch(
            `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}${fromDate}&pageSize=5&sortBy=relevancy`,
            { headers: { 'X-Api-Key': apiKey } },
        );
        if (!response.ok) {
            return JSON.stringify({ error: `NewsAPI ${response.status}` });
        }
        const data = await response.json();
        const articles = (data.articles || []).slice(0, 5).map((a: Record<string, string>) => ({
            title: a.title,
            source: a.source,
            url: a.url,
            publishedAt: a.publishedAt,
            description: a.description,
        }));
        return JSON.stringify({ count: articles.length, articles });
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        return JSON.stringify({ error: msg });
    }
}

/**
 * Searches the NIST NVD for CVEs.
 *
 * @param args - Must contain `keyword`, optional `severity`.
 * @returns JSON CVE results.
 */
async function handleLookupCve(args: Record<string, unknown>): Promise<string> {
    const apiKey = process.env.NIST_CVE_API_KEY;
    const keyword = String(args.keyword || '');
    const severity = args.severity ? `&cvssV3Severity=${args.severity}` : '';

    try {
        const headers: Record<string, string> = { 'Accept': 'application/json' };
        if (apiKey) {
            headers['apiKey'] = apiKey;
        }

        const response = await fetch(
            `https://services.nvd.nist.gov/rest/json/cves/2.0?keywordSearch=${encodeURIComponent(keyword)}${severity}&resultsPerPage=5`,
            { headers },
        );
        if (!response.ok) {
            return JSON.stringify({ error: `NIST NVD API ${response.status}` });
        }
        const data = await response.json();
        const vulnerabilities = (data.vulnerabilities || []).slice(0, 5).map((v: Record<string, Record<string, unknown>>) => {
            const cve = v.cve || {};
            return {
                id: cve.id,
                description: ((cve.descriptions as Array<Record<string, string>>) || [])[0]?.value?.substring(0, 200),
                severity: (cve.metrics as Record<string, unknown>)?.cvssMetricV31
                    ? 'see metrics'
                    : 'unknown',
                published: cve.published,
            };
        });
        return JSON.stringify({ count: vulnerabilities.length, vulnerabilities });
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        return JSON.stringify({ error: msg });
    }
}

/**
 * Looks up chemical interactions via STITCH.
 *
 * @param args - Must contain `chemical` name.
 * @returns JSON interaction data.
 */
async function handleLookupChemical(args: Record<string, unknown>): Promise<string> {
    const chemical = String(args.chemical || '');

    try {
        const response = await fetch(
            `http://stitch.embl.de/api/json/interactionsList?identifiers=${encodeURIComponent(chemical)}&species=9606&limit=5`,
        );
        if (!response.ok) {
            return JSON.stringify({ error: `STITCH API ${response.status}` });
        }
        const data = await response.json();
        return JSON.stringify({ chemical, interactions: data.slice?.(0, 5) || data });
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        return JSON.stringify({ error: msg });
    }
}

/**
 * Searches Perplexity Sonar API for industrial research.
 *
 * @param args - Must contain `query`, optional `domain` preset.
 * @returns JSON string of research results with citations.
 */
async function handleSearchPerplexity(args: Record<string, unknown>): Promise<string> {
    const query = String(args.query || '');
    const domain = (args.domain as perplexityClient.DomainPreset) || 'general';

    try {
        const result = await perplexityClient.searchWithCitations(query, domain);
        if (!result) {
            return JSON.stringify({ error: 'Perplexity API not configured or unavailable.' });
        }
        return JSON.stringify({
            content: result.content,
            citations: result.citations.map((c) => c.url),
            model: result.model,
        });
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        return JSON.stringify({ error: msg });
    }
}

/**
 * Writes an equipment node to the Neo4j knowledge graph.
 *
 * @param args - Equipment properties (tag, componentClass, etc.).
 * @returns JSON string with created equipment ID.
 */
async function handleWriteToGraph(args: Record<string, unknown>): Promise<string> {
    try {
        const id = await graphSchema.createEquipmentStandalone({
            tag: String(args.tag || ''),
            componentClass: String(args.componentClass || ''),
            componentClassURI: String(args.componentClassURI || ''),
            displayName: String(args.displayName || ''),
            category: String(args.category || ''),
            description: String(args.description || ''),
            facility: args.facility ? String(args.facility) : undefined,
        });
        return JSON.stringify({ success: true, equipmentId: id });
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        return JSON.stringify({ error: msg });
    }
}

/**
 * Validates an equipment card against DEXPI 2.0 rules.
 *
 * @param args - Equipment fields to validate.
 * @returns JSON string with validation results.
 */
async function handleValidateDexpiCompliance(args: Record<string, unknown>): Promise<string> {
    const tag = String(args.tag || '');
    const componentClass = String(args.componentClass || '');
    const componentClassURI = String(args.componentClassURI || '');
    const specCount = parseInt(String(args.specCount || '0'), 10);

    const violations: Array<{ rule: string; message: string }> = [];

    // Tag format check
    if (!/^[A-Z]{1,4}-\d{3,4}[A-Z]?$/.test(tag)) {
        violations.push({ rule: 'DEXPI-TAG-001', message: 'Tag must follow ISA-5.1 format' });
    }

    // Component class check
    if (!componentClass) {
        violations.push({ rule: 'DEXPI-CLASS-001', message: 'componentClass is required' });
    }

    // URI format check
    if (componentClassURI && !/^http:\/\/(data\.posccaesar\.org|sandbox\.dexpi\.org)\/rdl\//.test(componentClassURI)) {
        violations.push({ rule: 'DEXPI-URI-001', message: 'URI must be a valid PCA RDL or DEXPI URI' });
    }

    // Spec count check
    if (specCount < 3) {
        violations.push({ rule: 'DEXPI-SPEC-001', message: 'At least 3 specifications required' });
    }

    const score = Math.max(0, 100 - (violations.length * 20));
    return JSON.stringify({
        tag,
        componentClass,
        score,
        passed: violations.length === 0,
        violations,
    });
}

/* ═══════════════════════════════════════════════════════════════════════════
   HANDLER MAP
   ═══════════════════════════════════════════════════════════════════════════ */

/** Maps tool names to their handler functions. */
export const TOOL_HANDLERS: Record<
    string,
    (args: Record<string, unknown>) => Promise<string>
> = {
    query_memgraph: handleQueryMemgraph,
    search_equipment: handleSearchEquipment,
    validate_class_uri: handleValidateClassUri,
    search_standards: handleSearchStandards,
    search_web: handleSearchWeb,
    search_news: handleSearchNews,
    lookup_cve: handleLookupCve,
    lookup_chemical: handleLookupChemical,
    search_perplexity: handleSearchPerplexity,
    write_to_graph: handleWriteToGraph,
    validate_dexpi_compliance: handleValidateDexpiCompliance,
};
