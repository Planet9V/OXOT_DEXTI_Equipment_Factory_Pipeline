/**
 * Perplexity Sonar API Client.
 *
 * Provides a research-oriented API client for the Perplexity Sonar model,
 * optimised for industrial equipment specification lookups with citation
 * tracking. Falls back gracefully when no API key is configured.
 *
 * @module agents/perplexity-client
 */

const PERPLEXITY_BASE_URL = 'https://api.perplexity.ai/chat/completions';
const MAX_RETRIES = 3;
const RETRY_BASE_DELAY_MS = 2000;

/* ─── Types ─────────────────────────────────────────────────────────────── */

/** Domain filter presets for focused research. */
export type DomainPreset = 'industrial' | 'standards' | 'safety' | 'general';

/** A citation returned by the Perplexity API. */
export interface PerplexityCitation {
    url: string;
    title?: string;
}

/** Research result with citations. */
export interface PerplexityResult {
    /** The model's response content. */
    content: string;
    /** Source citations. */
    citations: PerplexityCitation[];
    /** Model used. */
    model: string;
    /** Token usage. */
    usage?: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
}

/* ─── Domain Filters ────────────────────────────────────────────────────── */

const DOMAIN_FILTERS: Record<DomainPreset, string[] | undefined> = {
    industrial: [
        'asme.org', 'api.org', 'iso.org', 'nace.org',
        'iec.ch', 'ieee.org', 'nfpa.org', 'osha.gov',
    ],
    standards: [
        'iso.org', 'asme.org', 'api.org', 'iec.ch',
        'data.posccaesar.org', 'dexpi.org',
    ],
    safety: [
        'osha.gov', 'nfpa.org', 'cisa.gov', 'nist.gov',
        'iec.ch',
    ],
    general: undefined,
};

/* ─── Client Functions ──────────────────────────────────────────────────── */

/**
 * Returns the Perplexity API key from environment, or null if not configured.
 *
 * @returns The API key string or null.
 */
function getApiKey(): string | null {
    return process.env.PERPLEXITY_API_KEY || null;
}

/**
 * Checks if the Perplexity API is configured.
 *
 * @returns True if PERPLEXITY_API_KEY is set.
 */
export function isPerplexityConfigured(): boolean {
    return !!getApiKey();
}

/**
 * Searches the Perplexity Sonar API with optional domain filtering.
 *
 * Retries up to 3 times with exponential backoff per Rule 6.
 * Returns null if no API key is configured (graceful degradation).
 *
 * @param query   - The search query.
 * @param preset  - Domain filter preset (default: 'general').
 * @param options - Additional options (temperature, max_tokens).
 * @returns Research result with citations, or null if unavailable.
 */
export async function searchWithCitations(
    query: string,
    preset: DomainPreset = 'general',
    options: { temperature?: number; maxTokens?: number } = {},
): Promise<PerplexityResult | null> {
    const apiKey = getApiKey();
    if (!apiKey) {
        console.warn('[perplexity-client] No PERPLEXITY_API_KEY configured, skipping');
        return null;
    }

    const domainFilter = DOMAIN_FILTERS[preset];
    const body: Record<string, unknown> = {
        model: 'sonar',
        messages: [
            {
                role: 'system',
                content: 'You are an industrial equipment research specialist. Provide detailed, factual specifications with source citations. Always include applicable standards (ASME, API, ISO, IEC) and manufacturer references.',
            },
            { role: 'user', content: query },
        ],
        temperature: options.temperature ?? 0.2,
        max_tokens: options.maxTokens ?? 2048,
        top_p: 0.9,
        return_citations: true,
    };

    if (domainFilter) {
        body.search_domain_filter = domainFilter;
    }

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
        try {
            const response = await fetch(PERPLEXITY_BASE_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                const errText = await response.text().catch(() => response.statusText);
                if (response.status === 429 || response.status >= 500) {
                    // Retryable error
                    if (attempt < MAX_RETRIES - 1) {
                        const delay = RETRY_BASE_DELAY_MS * Math.pow(2, attempt);
                        console.warn(`[perplexity-client] Attempt ${attempt + 1} failed (${response.status}), retrying in ${delay}ms`);
                        await sleep(delay);
                        continue;
                    }
                }
                throw new Error(`Perplexity API error ${response.status}: ${errText}`);
            }

            const data = await response.json() as {
                choices: Array<{ message: { content: string } }>;
                citations?: string[];
                model?: string;
                usage?: { prompt_tokens: number; completion_tokens: number; total_tokens: number };
            };

            const content = data.choices?.[0]?.message?.content || '';
            const citations: PerplexityCitation[] = (data.citations || []).map((url: string) => ({
                url,
            }));

            return {
                content,
                citations,
                model: data.model || 'sonar',
                usage: data.usage,
            };
        } catch (err) {
            if (attempt === MAX_RETRIES - 1) {
                console.error(`[perplexity-client] All ${MAX_RETRIES} attempts failed: ${err instanceof Error ? err.message : String(err)}`);
                return null;
            }
            const delay = RETRY_BASE_DELAY_MS * Math.pow(2, attempt);
            await sleep(delay);
        }
    }

    return null;
}

/**
 * Performs a focused equipment specification search.
 *
 * Wrapper around `searchWithCitations` with the 'industrial' preset
 * and a structured query template.
 *
 * @param equipmentClass - The equipment type (e.g. 'CentrifugalPump').
 * @param sector         - Industry sector for context.
 * @returns Research result or null.
 */
export async function searchEquipmentSpecs(
    equipmentClass: string,
    sector: string,
): Promise<PerplexityResult | null> {
    const query = `Provide detailed technical specifications for ${equipmentClass} equipment used in the ${sector} sector. Include:
1. Design pressure and temperature ranges
2. Common materials of construction (ASTM/ASME grades)
3. Standard sizes and capacities
4. Major manufacturers (at least 3 with model numbers)
5. Applicable standards (ASME, API, ISO codes)
6. Common nozzle configurations
7. Typical operating conditions
8. DEXPI 2.0 component class classification`;

    return searchWithCitations(query, 'industrial');
}

/**
 * Tests connectivity to the Perplexity API.
 *
 * @returns True if the API responds successfully.
 */
export async function testPerplexityConnection(): Promise<boolean> {
    const result = await searchWithCitations('test', 'general', { maxTokens: 10 });
    return result !== null;
}

/* ─── Internal Helpers ──────────────────────────────────────────────────── */

/** Async sleep helper. */
function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
