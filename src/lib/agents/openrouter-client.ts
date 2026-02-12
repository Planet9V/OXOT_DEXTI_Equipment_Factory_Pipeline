/**
 * OpenRouter API Client.
 *
 * Provides an OpenAI-compatible chat completions client that connects to
 * OpenRouter.ai. Uses native `fetch()` — no additional dependencies needed.
 * Supports standard completions, streaming, and function/tool calling.
 *
 * Default model: moonshotai/kimi-k2.5 (configurable via OPENROUTER_MODEL env).
 *
 * @module agents/openrouter-client
 */

import type {
    ChatMessage,
    CompletionOptions,
    ToolDefinition,
    ToolCall,
} from './types';

const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';
const MAX_RETRIES = 3;
const RETRY_BASE_DELAY_MS = 2000;

/**
 * Returns the configured API key, throwing if missing.
 *
 * @returns The OpenRouter API key from environment.
 * @throws Error if OPENROUTER_API_KEY is not set.
 */
function getApiKey(): string {
    const key = process.env.OPENROUTER_API_KEY;
    if (!key) {
        throw new Error(
            '[openrouter] OPENROUTER_API_KEY is not set. Add it to .env.local.',
        );
    }
    return key;
}

/**
 * Returns the model identifier to use.
 *
 * @returns The model string, defaulting to moonshotai/kimi-k2.5.
 */
function getModel(): string {
    return process.env.OPENROUTER_MODEL || 'moonshotai/kimi-k2.5';
}

/** Shape of the OpenRouter chat completion response. */
interface OpenRouterResponse {
    id: string;
    model: string;
    choices: Array<{
        message: {
            role: string;
            content: string | null;
            tool_calls?: ToolCall[];
        };
        finish_reason: string;
    }>;
    usage?: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
}

/**
 * Classifies fetch errors as retryable or fatal.
 *
 * @param status - HTTP status code.
 * @returns True if the request should be retried.
 */
function isRetryable(status: number): boolean {
    return status === 429 || status >= 500;
}

/**
 * Sends a chat completion request to OpenRouter.
 *
 * @param messages - Conversation history.
 * @param options  - Temperature, max_tokens, etc.
 * @param tools    - Optional tool definitions for function calling.
 * @returns The parsed API response.
 * @throws Error after MAX_RETRIES failures.
 */
export async function chatCompletion(
    messages: ChatMessage[],
    options: CompletionOptions = {},
    tools?: ToolDefinition[],
): Promise<OpenRouterResponse> {
    const apiKey = getApiKey();
    const model = getModel();

    const body: Record<string, unknown> = {
        model,
        messages,
        temperature: options.temperature ?? 0.7,
        max_tokens: options.max_tokens ?? 4096,
    };

    if (tools && tools.length > 0) {
        body.tools = tools;
        body.tool_choice = 'auto';
    }

    if (options.response_format) {
        body.response_format = options.response_format;
    }

    if (options.stop) {
        body.stop = options.stop;
    }

    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': 'https://dexpi-equipment-factory.local',
                    'X-Title': 'DEXPI Equipment Factory',
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                const errorText = await response.text().catch(() => 'unknown error');
                if (isRetryable(response.status) && attempt < MAX_RETRIES) {
                    console.warn(
                        `[openrouter] Request failed (${response.status}), attempt ${attempt}/${MAX_RETRIES}: ${errorText}`,
                    );
                    await sleep(RETRY_BASE_DELAY_MS * attempt);
                    continue;
                }
                throw new Error(
                    `[openrouter] API error ${response.status}: ${errorText}`,
                );
            }

            const data = (await response.json()) as OpenRouterResponse;
            return data;
        } catch (err: unknown) {
            lastError = err instanceof Error ? err : new Error(String(err));
            if (attempt < MAX_RETRIES) {
                console.warn(
                    `[openrouter] Request failed (attempt ${attempt}/${MAX_RETRIES}): ${lastError.message}`,
                );
                await sleep(RETRY_BASE_DELAY_MS * attempt);
            }
        }
    }

    throw lastError || new Error('[openrouter] Chat completion failed after retries');
}

/**
 * Runs a chat completion with tool-calling loop.
 *
 * Repeatedly calls the model and executes returned tool calls until the model
 * produces a final text response (no more tool calls). Guards against infinite
 * loops with a maximum iteration count.
 *
 * @param messages      - Initial conversation messages.
 * @param tools         - Available tool definitions.
 * @param toolHandlers  - Map of tool name → async handler function.
 * @param options       - Completion options.
 * @param maxIterations - Safety limit for tool-call loops (default 10).
 * @returns Final response and trace of tool invocations.
 */
export async function chatWithTools(
    messages: ChatMessage[],
    tools: ToolDefinition[],
    toolHandlers: Record<string, (args: Record<string, unknown>) => Promise<string>>,
    options: CompletionOptions = {},
    maxIterations = 10,
): Promise<{
    response: OpenRouterResponse;
    toolTraces: Array<{ toolName: string; input: Record<string, unknown>; output: string; durationMs: number }>;
}> {
    const conversationMessages = [...messages];
    const toolTraces: Array<{
        toolName: string;
        input: Record<string, unknown>;
        output: string;
        durationMs: number;
    }> = [];

    for (let iteration = 0; iteration < maxIterations; iteration++) {
        const response = await chatCompletion(conversationMessages, options, tools);
        const choice = response.choices[0];

        if (!choice) {
            throw new Error('[openrouter] No choices returned from API');
        }

        // If no tool calls, we have the final answer
        if (!choice.message.tool_calls || choice.message.tool_calls.length === 0) {
            return { response, toolTraces };
        }

        // Add the assistant message with tool_calls to the conversation
        conversationMessages.push({
            role: 'assistant',
            content: choice.message.content,
            tool_calls: choice.message.tool_calls,
        });

        // Execute each tool call
        for (const toolCall of choice.message.tool_calls) {
            const handler = toolHandlers[toolCall.function.name];
            let result: string;
            let parsedArgs: Record<string, unknown> = {};

            try {
                parsedArgs = JSON.parse(toolCall.function.arguments);
            } catch {
                parsedArgs = { raw: toolCall.function.arguments };
            }

            const startMs = Date.now();

            if (!handler) {
                result = JSON.stringify({
                    error: `Unknown tool: ${toolCall.function.name}`,
                });
            } else {
                try {
                    result = await handler(parsedArgs);
                } catch (err: unknown) {
                    const errMsg = err instanceof Error ? err.message : String(err);
                    console.error(`[openrouter] Tool ${toolCall.function.name} failed: ${errMsg}`);
                    result = JSON.stringify({ error: errMsg });
                }
            }

            const durationMs = Date.now() - startMs;

            toolTraces.push({
                toolName: toolCall.function.name,
                input: parsedArgs,
                output: result,
                durationMs,
            });

            // Add the tool result to the conversation
            conversationMessages.push({
                role: 'tool',
                content: result,
                tool_call_id: toolCall.id,
            });
        }
    }

    // If we hit maxIterations, return the last response
    const finalResponse = await chatCompletion(conversationMessages, options);
    return { response: finalResponse, toolTraces };
}

/**
 * Tests connectivity to OpenRouter by making a minimal API call.
 *
 * @returns True if the API is reachable and authenticates successfully.
 */
export async function testOpenRouterConnection(): Promise<boolean> {
    try {
        const response = await chatCompletion(
            [{ role: 'user', content: 'ping' }],
            { max_tokens: 5, temperature: 0 },
        );
        return response.choices.length > 0;
    } catch {
        return false;
    }
}

/** Simple async sleep helper. */
function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
