/**
 * AI Agent Type Definitions.
 *
 * Core types for the DEXPI AI Application Assistant including chat messages,
 * tool definitions, tool call results, and agent responses.
 *
 * @module agents/types
 */

/** Agent persona names. */
export type PersonaName = 'coordinator' | 'processEngineer' | 'standardsExpert' | 'safetyAnalyst' | 'qualityReviewer' | 'procurementOfficer' | 'theEngineer';

/* ─── Chat Messages ─────────────────────────────────────────────────────── */

/** Roles supported by the OpenRouter / OpenAI chat API. */
export type ChatRole = 'system' | 'user' | 'assistant' | 'tool';

/** A single message in the conversation. */
export interface ChatMessage {
    role: ChatRole;
    content: string | null;
    /** Present when the assistant invokes tools. */
    tool_calls?: ToolCall[];
    /** Present when role === 'tool' — links result back to a tool_call. */
    tool_call_id?: string;
    /** Display name (optional). */
    name?: string;
}

/* ─── Tool Definitions (OpenAI Function-Calling Schema) ─────────────────── */

/** JSON Schema for a tool's parameters. */
export interface ToolParameterSchema {
    type: 'object';
    properties: Record<string, {
        type: string;
        description: string;
        enum?: string[];
    }>;
    required?: string[];
}

/** A tool the agent can invoke. */
export interface ToolDefinition {
    type: 'function';
    function: {
        name: string;
        description: string;
        parameters: ToolParameterSchema;
    };
}

/** A tool call issued by the model. */
export interface ToolCall {
    id: string;
    type: 'function';
    function: {
        name: string;
        arguments: string;
    };
}

/** Result of executing a tool handler. */
export interface ToolResult {
    tool_call_id: string;
    content: string;
}

/* ─── Agent Configuration ───────────────────────────────────────────────── */

/** OpenRouter completion options. */
export interface CompletionOptions {
    temperature?: number;
    max_tokens?: number;
    stream?: boolean;
    stop?: string[];
    /** OpenRouter-specific: JSON schema enforcement. */
    response_format?: { type: 'json_object' } | { type: 'text' };
}

/** Optional context injected into the agent's system prompt. */
export interface AgentContext {
    sector?: string;
    subSector?: string;
    facility?: string;
    equipmentClass?: string;
    /** Extra instructions appended to system prompt. */
    additionalInstructions?: string;
}

/* ─── Agent Responses ───────────────────────────────────────────────────── */

/** Trace of a single tool invocation for debugging / observability. */
export interface ToolTrace {
    toolName: string;
    input: Record<string, unknown>;
    output: string;
    durationMs: number;
}

/** Full agent response returned to the caller. */
export interface AgentResponse {
    /** The assistant's final text reply. */
    content: string;
    /** Tool calls executed during this turn. */
    toolTraces: ToolTrace[];
    /** Model used. */
    model: string;
    /** Token usage (if reported by the provider). */
    usage?: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
}

/* ─── Research & Review Results ──────────────────────────────────────────── */

/** Vendor model variation. */
export interface VendorVariation {
    vendor: string;
    model: string;
    referenceId: string;
    description: string;
    differentiators: string[];
    specifications: Record<string, string | number>;
    documents: Array<{ title: string; url: string }>;
}

/** Parameters for equipment research. */
export interface ResearchParams {
    sector: string;
    subSector: string;
    facility: string;
    equipmentClass: string;
}

/** Structured research output. */
export interface ResearchResult {
    equipmentClass: string;
    specifications: Record<string, unknown>;
    manufacturers: string[];
    standards: string[];
    webSources: string[];
    cveRisks: string[];
}

/** Equipment card review output. */
export interface ReviewResult {
    score: number;
    issues: string[];
    suggestions: string[];
    improvedCard?: Record<string, unknown>;
}

/** Coverage analysis output. */
export interface CoverageAnalysis {
    facility: string;
    expectedTypes: string[];
    existingTypes: string[];
    missingTypes: string[];
    coveragePercent: number;
    recommendations: string[];
}

/* ─── Pipeline V2 Specialist Agent Types ────────────────────────────────── */

/** Research report produced by the ResearchAgent. */
export interface ResearchReport {
    /** Equipment class researched. */
    equipmentClass: string;
    /** Technical specifications with units. */
    specifications: Record<string, { value: string | number; unit: string; source?: string }>;
    /** Manufacturer names. */
    manufacturers: string[];
    /** Applicable standards (ASME, API, ISO, etc.). */
    standards: string[];
    /** PCA RDL URI resolved for this equipment class. */
    pcaUri: string;
    /** ISA-5.1 tag prefix. */
    isaTagPrefix: string;
    /** Source citations from Perplexity / web search. */
    citations: string[];
    /** Materials of construction. */
    materials: Record<string, string>;
    /** Nozzle configurations. */
    nozzleConfigs: Array<{ id: string; size: string; rating: string; service: string }>;
}

/** Compliance violation found during validation. */
export interface ComplianceViolation {
    /** Rule identifier (e.g. 'DEXPI-TAG-001'). */
    ruleId: string;
    /** Severity level. */
    severity: 'critical' | 'high' | 'medium' | 'low';
    /** Human-readable description. */
    message: string;
    /** Field path that failed validation. */
    field: string;
}

/** Compliance report produced by the ComplianceAgent. */
export interface ComplianceReport {
    /** Validation score 0-100. */
    score: number;
    /** Whether the card passed validation. */
    passed: boolean;
    /** List of violations found. */
    violations: ComplianceViolation[];
    /** Non-blocking warnings. */
    warnings: string[];
    /** AI reviewer notes (if augmented). */
    aiNotes: string;
}

/** Quality gate report produced by QualityGateAgent. */
export interface QualityReport {
    /** Final quality score 0-100. */
    score: number;
    /** Whether the card is approved for ingestion. */
    approved: boolean;
    /** Reasons for rejection (if any). */
    rejectionReasons: string[];
    /** Improvement suggestions. */
    suggestions: string[];
    /** Per-dimension scores. */
    dimensions: Record<string, number>;
}

/** Write report produced by GraphWriterAgent. */
export interface WriteReport {
    /** Number of equipment nodes created. */
    nodesCreated: number;
    /** Number of relationships created. */
    relationshipsCreated: number;
    /** Number of duplicates skipped. */
    duplicatesSkipped: number;
    /** IDs of written equipment. */
    equipmentIds: string[];
    /** Read-back verification passed. */
    verified: boolean;
}

/** Input for the generator agent. */
export interface GeneratorInput {
    /** Pipeline parameters. */
    params: {
        equipmentClass: string;
        quantity: number;
        sector: string;
        subSector: string;
        facility: string;
        tag?: string;
    };
    /** Research report for grounding. */
    research: ResearchReport;
    /** Optional remediation plan from audit agent (for fix loop). */
    remediationPlan?: RemediationPlan;
}

/** A single field-level fix in a remediation plan. */
export interface RemediationFix {
    /** Field path (e.g. 'operatingConditions.designPressure'). */
    field: string;
    /** Current value that is wrong. */
    currentValue: unknown;
    /** Suggested replacement value. */
    suggestedValue: unknown;
    /** Reason for the fix. */
    reason: string;
}

/** Structured remediation plan from the audit agent. */
export interface RemediationPlan {
    /** Equipment tag being remediated. */
    cardTag: string;
    /** List of specific fixes. */
    fixes: RemediationFix[];
    /** Confidence score 0-100. */
    confidence: number;
    /** True if all fixes can be applied automatically. */
    canAutoFix: boolean;
}

/** Input for the audit agent. */
export interface AuditInput {
    /** Equipment card that was rejected. */
    card: import('../types').EquipmentCard;
    /** Quality gate report with rejection reasons. */
    qualityReport: QualityReport;
    /** Optional research data for context. */
    research?: ResearchReport;
}

/** Input parameters for Pipeline V2. */
export interface PipelineV2Params {
    /** CISA sector code. */
    sector: string;
    /** Sub-sector code. */
    subSector: string;
    /** Facility code. */
    facility: string;
    /** DEXPI equipment class name. */
    equipmentClass: string;
    /** Number of cards to generate. */
    quantity: number;
    /** Minimum quality score to accept (default: 80). */
    minQualityScore?: number;
    /** Optional explicit tag override (e.g. "AC-179"). */
    tag?: string;
}

/** Input parameters for Pipeline V2 batch mode (equipment factory). */
export interface PipelineV2BatchParams {
    /** List of equipment to generate. Can be strings (names only) or objects (name + tag). */
    items: Array<string | { equipmentClass: string; tag: string }>;
    /** Optional sector hint for better research accuracy. */
    sectorHint?: string;
    /** CISA sector code (e.g. 'ENERGY'). */
    sector?: string;
    /** Sub-sector code (e.g. 'OIL_GAS'). */
    subSector?: string;
    /** Facility code (e.g. 'FAC-01'). */
    facility?: string;
    /** Minimum quality score to accept (default: 80). */
    minQualityScore?: number;
}

/** Stage status for Pipeline V2. */
export type PipelineV2Stage = 'research' | 'generate' | 'validate' | 'enrich' | 'quality-gate' | 'audit' | 'write';

/** Full result from a Pipeline V2 run. */
export interface PipelineV2Result {
    /** Unique run identifier. */
    runId: string;
    /** Run status. */
    status: 'queued' | 'running' | 'completed' | 'failed' | 'cancelled';
    /** Input parameters. */
    params: PipelineV2Params;
    /** Per-stage status. */
    stages: Record<PipelineV2Stage, {
        status: 'pending' | 'running' | 'completed' | 'failed' | 'skipped';
        startedAt?: string;
        completedAt?: string;
        message?: string;
    }>;
    /** Aggregated results. */
    results: {
        researched: boolean;
        generated: number;
        validated: number;
        enriched: number;
        approved: number;
        remediationAttempts: number;
        written: number;
        duplicatesSkipped: number;
        averageScore: number;
    };
    /** ISO-8601 creation timestamp. */
    createdAt: string;
    /** ISO-8601 completion timestamp. */
    completedAt?: string;
}
