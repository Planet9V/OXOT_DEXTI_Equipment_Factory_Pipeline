/**
 * Agent Unit Tests.
 *
 * Tests for the DEXPI AI Application Assistant including:
 * - OpenRouter client: auth headers, retry logic, error handling
 * - Tool handlers: Memgraph query security, web search, CVE lookup
 * - Agent: multi-persona routing, context building
 *
 * @module tests/agent
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

// ─── Mocks ─────────────────────────────────────────────────────────────────

// Mock environment variables
process.env.OPENROUTER_API_KEY = 'test-key-12345';
process.env.OPENROUTER_MODEL = 'moonshotai/kimi-k2.5';
process.env.TAVILY_API_KEY = 'test-tavily-key';
process.env.BRAVE_API_KEY = 'test-brave-key';
process.env.NEWSAPI_KEY = 'test-newsapi-key';
process.env.NIST_CVE_API_KEY = 'test-nist-key';

// Mock fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch as any;

// Mock memgraph
jest.mock('../src/lib/memgraph', () => ({
    runQuery: jest.fn().mockResolvedValue([]),
    testConnection: jest.fn().mockResolvedValue(true),
    getCircuitBreakerState: jest.fn().mockReturnValue({ state: 'CLOSED', failureCount: 0 }),
}));

// Mock pca-sparql
jest.mock('../src/lib/pca-sparql', () => ({
    validateClassUri: jest.fn().mockResolvedValue('Test Equipment'),
    searchEquipmentClass: jest.fn().mockResolvedValue([
        { uri: 'http://data.posccaesar.org/rdl/RDS1234', label: 'Test Equipment' },
    ]),
}));

import { TOOL_DEFINITIONS, TOOL_HANDLERS } from '../src/lib/agents/tools';
import { DexpiAgent } from '../src/lib/agents/agent';
import { runQuery } from '../src/lib/memgraph';
import type { ChatMessage } from '../src/lib/agents/types';

const MAX_RETRIES = 3;

// ─── Tool Definition Tests ─────────────────────────────────────────────────

describe('Agent Tool Definitions', () => {
    test('should define 11 tools', () => {
        expect(TOOL_DEFINITIONS).toHaveLength(11);
    });

    test('each tool has valid JSON Schema', () => {
        for (const tool of TOOL_DEFINITIONS) {
            expect(tool.type).toBe('function');
            expect(tool.function.name).toBeTruthy();
            expect(tool.function.description).toBeTruthy();
            expect(tool.function.parameters.type).toBe('object');
        }
    });

    test('all tool definitions have matching handlers', () => {
        for (const tool of TOOL_DEFINITIONS) {
            expect(TOOL_HANDLERS[tool.function.name]).toBeDefined();
            expect(typeof TOOL_HANDLERS[tool.function.name]).toBe('function');
        }
    });

    test('tool names match expected set', () => {
        const names = TOOL_DEFINITIONS.map(t => t.function.name).sort();
        expect(names).toEqual([
            'lookup_chemical',
            'lookup_cve',
            'query_memgraph',
            'search_equipment',
            'search_news',
            'search_perplexity',
            'search_standards',
            'search_web',
            'validate_class_uri',
            'validate_dexpi_compliance',
            'write_to_graph',
        ]);
    });
});

// ─── Tool Handler Tests ────────────────────────────────────────────────────

describe('Agent Tool Handlers', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockFetch.mockReset();
    });

    describe('query_memgraph', () => {
        test('blocks mutation queries', async () => {
            const result = await TOOL_HANDLERS.query_memgraph({ cypher: 'CREATE (n:Test)' });
            const parsed = JSON.parse(result);
            expect(parsed.error).toContain('read-only');
        });

        test('blocks DELETE queries', async () => {
            const result = await TOOL_HANDLERS.query_memgraph({
                cypher: 'MATCH (n) DELETE n',
            });
            const parsed = JSON.parse(result);
            expect(parsed.error).toContain('read-only');
        });

        test('blocks MERGE queries', async () => {
            const result = await TOOL_HANDLERS.query_memgraph({
                cypher: 'MERGE (n:Test {id: 1})',
            });
            const parsed = JSON.parse(result);
            expect(parsed.error).toContain('read-only');
        });

        test('allows MATCH queries', async () => {
            (runQuery as jest.Mock).mockResolvedValueOnce([]);
            const result = await TOOL_HANDLERS.query_memgraph({
                cypher: 'MATCH (n) RETURN count(n) AS cnt',
            });
            const parsed = JSON.parse(result);
            expect(parsed.error).toBeUndefined();
            expect(parsed.count).toBe(0);
        });
    });

    describe('search_equipment', () => {
        test('builds correct Cypher query with filters', async () => {
            (runQuery as jest.Mock).mockResolvedValueOnce([]);
            await TOOL_HANDLERS.search_equipment({
                componentClass: 'Transformer',
                sector: 'ENER',
            });
            expect(runQuery).toHaveBeenCalledWith(
                expect.stringContaining('e.componentClass = $componentClass'),
                expect.objectContaining({ componentClass: 'Transformer', sector: 'ENER' }),
            );
        });
    });

    describe('validate_class_uri', () => {
        test('returns validation result', async () => {
            const result = await TOOL_HANDLERS.validate_class_uri({
                uri: 'http://data.posccaesar.org/rdl/RDS1234',
            });
            const parsed = JSON.parse(result);
            expect(parsed.valid).toBe(true);
            expect(parsed.label).toBe('Test Equipment');
        });
    });

    describe('search_web', () => {
        test('calls Tavily API correctly', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ results: [{ title: 'Test', url: 'http://test.com', content: 'Test content' }] }),
            });

            const result = await TOOL_HANDLERS.search_web({ query: 'transformer specs' });
            const parsed = JSON.parse(result);
            expect(parsed.engine).toBe('tavily');
            expect(parsed.count).toBe(1);
        });

        test('calls Brave API when engine=brave', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ web: { results: [{ title: 'Test', url: 'http://test.com', description: 'Desc' }] } }),
            });

            const result = await TOOL_HANDLERS.search_web({ query: 'transformer', engine: 'brave' });
            const parsed = JSON.parse(result);
            expect(parsed.engine).toBe('brave');
        });
    });

    describe('lookup_cve', () => {
        test('calls NIST NVD API', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    vulnerabilities: [{
                        cve: {
                            id: 'CVE-2024-1234',
                            descriptions: [{ value: 'Test vulnerability' }],
                            published: '2024-01-01',
                        },
                    }],
                }),
            });

            const result = await TOOL_HANDLERS.lookup_cve({ keyword: 'SCADA transformer' });
            const parsed = JSON.parse(result);
            expect(parsed.count).toBe(1);
            expect(parsed.vulnerabilities[0].id).toBe('CVE-2024-1234');
        });
    });

    describe('search_news', () => {
        test('calls NewsAPI', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    articles: [{ title: 'Industry news', url: 'http://news.com', publishedAt: '2024-01-01' }],
                }),
            });

            const result = await TOOL_HANDLERS.search_news({ query: 'transformer safety' });
            const parsed = JSON.parse(result);
            expect(parsed.count).toBe(1);
        });
    });
});

// ─── Agent Tests ───────────────────────────────────────────────────────────

describe('DexpiAgent', () => {
    let agent: DexpiAgent;

    beforeEach(() => {
        agent = new DexpiAgent();
        mockFetch.mockReset();
    });

    test('getPersonas returns all 7 personas', () => {
        const personas = agent.getPersonas();
        expect(personas).toHaveLength(7);
        const names = personas.map(p => p.name);
        expect(names).toContain('coordinator');
        expect(names).toContain('processEngineer');
        expect(names).toContain('standardsExpert');
        expect(names).toContain('safetyAnalyst');
        expect(names).toContain('qualityReviewer');
        expect(names).toContain('procurementOfficer');
        expect(names).toContain('theEngineer');
    });

    test('findVendorVariations returns parsed array', async () => {
        const fakeVariations = [
            { vendor: 'Test Vendor', model: 'Model-X', referenceId: 'P-101' },
        ];

        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                choices: [{ message: { role: 'assistant', content: JSON.stringify(fakeVariations) }, finish_reason: 'stop' }],
            }),
        });

        const card = { tag: 'P-101', componentClass: 'Pump' };
        const result = await agent.findVendorVariations(card);

        expect(result).toHaveLength(1);
        expect(result[0].vendor).toBe('Test Vendor');

        // Verify correct persona was used
        const fetchCall = mockFetch.mock.calls[0];
        const fetchBody = JSON.parse(fetchCall[1].body);
        expect(fetchBody.messages[0].content).toContain('The Procurement Officer');
        expect(fetchBody.messages[1].content).toContain('P-101');
    });

    test('each persona has a description', () => {
        const personas = agent.getPersonas();
        for (const p of personas) {
            expect(p.description.length).toBeGreaterThan(10);
        }
    });

    test('chat sends correct model and auth headers', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                id: 'test-1',
                model: 'moonshotai/kimi-k2.5',
                choices: [{ message: { role: 'assistant', content: 'Hello!' }, finish_reason: 'stop' }],
                usage: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
            }),
        });

        const messages: ChatMessage[] = [{ role: 'user', content: 'Hello' }];
        const response = await agent.chat(messages);

        expect(response.content).toBe('Hello!');
        expect(response.model).toBe('moonshotai/kimi-k2.5');

        // Verify fetch called with correct headers
        const fetchCall = mockFetch.mock.calls[0];
        expect(fetchCall[0]).toBe('https://openrouter.ai/api/v1/chat/completions');

        const fetchOptions = fetchCall[1];
        expect(fetchOptions.headers['Authorization']).toBe('Bearer test-key-12345');
        expect(fetchOptions.headers['Content-Type']).toBe('application/json');

        const fetchBody = JSON.parse(fetchOptions.body);
        expect(fetchBody.model).toBe('moonshotai/kimi-k2.5');
        expect(fetchBody.messages[0].role).toBe('system'); // system prompt injected
        expect(fetchBody.messages[1]).toEqual({ role: 'user', content: 'Hello' });
    });

    test('chat injects context into system prompt', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                choices: [{ message: { role: 'assistant', content: 'OK' }, finish_reason: 'stop' }],
            }),
        });

        await agent.chat(
            [{ role: 'user', content: 'Hi' }],
            'processEngineer',
            { sector: 'ENER', facility: 'Transmission Station' },
        );

        const fetchBody = JSON.parse(mockFetch.mock.calls[0][1].body);
        const systemMsg = fetchBody.messages[0].content;
        expect(systemMsg).toContain('Senior Process Engineer');
        expect(systemMsg).toContain('Sector: ENER');
        expect(systemMsg).toContain('Facility: Transmission Station');
    });

    test('testConnection returns boolean', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                choices: [{ message: { role: 'assistant', content: 'pong' }, finish_reason: 'stop' }],
            }),
        });

        const connected = await agent.testConnection();
        expect(connected).toBe(true);
    });

    test('testConnection returns false on error', async () => {
        jest.useFakeTimers();
        mockFetch.mockRejectedValue(new Error('Network error'));

        const connectionPromise = agent.testConnection();

        // Advance through all retry delays (2s + 4s + 6s = 12s)
        for (let i = 0; i < MAX_RETRIES; i++) {
            await jest.advanceTimersByTimeAsync(10000);
        }

        const connected = await connectionPromise;
        expect(connected).toBe(false);
        jest.useRealTimers();
    }, 15000);

    test('findVendorVariations parses JSON response', async () => {
        const mockVariations = [
            {
                vendor: 'Test Vendor',
                model: 'Model X',
                referenceId: 'P-101',
                description: 'A test pump',
                differentiators: ['Fast'],
                specifications: { Power: '10kW' },
                documents: []
            }
        ];

        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                choices: [{ message: { role: 'assistant', content: JSON.stringify(mockVariations) }, finish_reason: 'stop' }],
            }),
        });

        const variations = await agent.findVendorVariations({ tag: 'P-101', componentClass: 'Pump' });
        expect(variations).toHaveLength(1);
        expect(variations[0].vendor).toBe('Test Vendor');
        expect(variations[0].model).toBe('Model X');

        // Verify correct persona was used
        const fetchBody = JSON.parse(mockFetch.mock.calls[0][1].body);
        const systemMsg = fetchBody.messages[0].content;
        expect(systemMsg).toContain('The Procurement Officer');
    });
});
