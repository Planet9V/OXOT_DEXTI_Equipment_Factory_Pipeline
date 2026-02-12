/**
 * Base Specialist Agent.
 *
 * Abstract base class for all specialist agents in the DEXPI pipeline.
 * Provides a standard contract, audit logging, retry logic, and
 * JSON-enforced output via OpenRouter.
 *
 * @module agents/specialist/base-specialist
 */

import { chatWithTools } from '../openrouter-client';
import { AuditLogger, getAuditLogger } from '../audit-logger';
import type {
    ChatMessage,
    CompletionOptions,
    ToolDefinition,
} from '../types';

/* ─── Configuration ─────────────────────────────────────────────────────── */

/** Configuration for a specialist agent. */
export interface SpecialistConfig {
    /** Unique agent identifier (e.g. 'research-agent'). */
    agentId: string;
    /** Human-readable name for logging. */
    displayName: string;
    /** System prompt describing the agent's role. */
    systemPrompt: string;
    /** Tools available to this agent. */
    tools: ToolDefinition[];
    /** Tool handler map. */
    toolHandlers: Record<string, (args: Record<string, unknown>) => Promise<string>>;
    /** Completion options override. */
    completionOptions?: Partial<CompletionOptions>;
    /** Maximum tool-calling iterations. */
    maxIterations?: number;
}

/* ─── Base Class ────────────────────────────────────────────────────────── */

/**
 * Abstract specialist agent with standard execution contract.
 *
 * Subclasses must implement `execute()` which receives typed input and
 * produces typed output. The base class handles:
 * - OpenRouter chat with tool-calling loop
 * - Audit logging of every execution
 * - Retry logic for transient failures
 * - JSON output parsing
 *
 * @typeParam TInput  - Shape of the agent's input payload.
 * @typeParam TOutput - Shape of the agent's output payload.
 */
export abstract class BaseSpecialist<TInput, TOutput> {
    protected config: SpecialistConfig;
    protected audit: AuditLogger;

    /**
     * Creates a specialist agent instance.
     *
     * @param config - Agent configuration.
     * @param audit  - Optional audit logger instance (defaults to singleton).
     */
    constructor(config: SpecialistConfig, audit?: AuditLogger) {
        this.config = config;
        this.audit = audit || getAuditLogger();
    }

    /**
     * Executes the specialist agent's task.
     *
     * Subclasses implement the concrete logic. The base class handles
     * audit logging around this call.
     *
     * @param input - Typed input payload.
     * @param runId - Pipeline run identifier for audit trail.
     * @returns Typed output payload.
     */
    abstract execute(input: TInput, runId: string): Promise<TOutput>;

    /**
     * Runs the agent with full audit logging and retry.
     *
     * Wraps `execute()` with:
     * - Start/end audit entries
     * - Try/catch with up to 3 retries
     * - Duration tracking
     *
     * @param input - Typed input payload.
     * @param runId - Pipeline run identifier.
     * @param retries - Maximum retry attempts (default: 3).
     * @returns Typed output payload.
     */
    async run(input: TInput, runId: string, retries = 3): Promise<TOutput> {
        const startTime = Date.now();
        let lastError: Error | null = null;

        for (let attempt = 0; attempt < retries; attempt++) {
            try {
                const output = await this.execute(input, runId);
                const durationMs = Date.now() - startTime;

                await this.audit.log(
                    runId,
                    this.config.agentId,
                    `${this.config.displayName} completed`,
                    'success',
                    input,
                    output,
                    durationMs,
                    { attempt: attempt + 1 },
                );

                return output;
            } catch (err) {
                lastError = err instanceof Error ? err : new Error(String(err));
                console.error(
                    `[${this.config.agentId}] Attempt ${attempt + 1}/${retries} failed: ${lastError.message}`,
                );

                if (attempt < retries - 1) {
                    const delay = 2000 * Math.pow(2, attempt);
                    await new Promise((r) => setTimeout(r, delay));
                }
            }
        }

        // All retries exhausted
        const durationMs = Date.now() - startTime;
        await this.audit.log(
            runId,
            this.config.agentId,
            `${this.config.displayName} failed after ${retries} attempts`,
            'failure',
            input,
            { error: lastError?.message },
            durationMs,
            { retries },
        );

        throw lastError || new Error(`${this.config.agentId} failed`);
    }

    /**
     * Calls OpenRouter with the agent's system prompt and tools, then
     * extracts a JSON object from the response.
     *
     * @param userMessage - The user-facing prompt to send.
     * @returns Parsed JSON object from the model's response.
     */
    protected async callLLM(userMessage: string): Promise<Record<string, unknown>> {
        const messages: ChatMessage[] = [
            { role: 'system', content: this.config.systemPrompt },
            { role: 'user', content: userMessage },
        ];

        const options: CompletionOptions = {
            temperature: 0.3,
            max_tokens: 4096,
            ...this.config.completionOptions,
        };

        const { response } = await chatWithTools(
            messages,
            this.config.tools,
            this.config.toolHandlers,
            options,
            this.config.maxIterations || 10,
        );

        const content = response.choices?.[0]?.message?.content || '';
        return this.parseJSON(content);
    }

    /**
     * Extracts and parses a JSON object from a model response string.
     *
     * Handles responses wrapped in markdown code fences.
     *
     * @param text - Raw model response text.
     * @returns Parsed JSON object.
     * @throws Error if no valid JSON found.
     */
    protected parseJSON(text: string): Record<string, unknown> {
        // Strip markdown code fences
        let cleaned = text
            .replace(/```json\n?/g, '')
            .replace(/```\n?/g, '')
            .trim();

        // Try to extract JSON object or array
        const jsonMatch = cleaned.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
        if (jsonMatch) {
            cleaned = jsonMatch[1];
        }

        try {
            return JSON.parse(cleaned);
        } catch {
            throw new Error(`Failed to parse JSON from agent response: ${text.substring(0, 200)}`);
        }
    }

    /**
     * Returns the agent's identifier.
     *
     * @returns Agent ID string.
     */
    get agentId(): string {
        return this.config.agentId;
    }

    /**
     * Returns the agent's display name.
     *
     * @returns Display name string.
     */
    get displayName(): string {
        return this.config.displayName;
    }
}
