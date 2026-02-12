/**
 * Immutable Audit Logger for Agent Operations.
 *
 * Provides a structured, append-only audit trail for all specialist agent
 * operations. Each entry is hashed for tamper detection and stored as JSONL.
 *
 * @module agents/audit-logger
 */

import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';

/* ─── Types ─────────────────────────────────────────────────────────────── */

/** Status of an audited operation. */
export type AuditStatus = 'success' | 'failure' | 'partial' | 'skipped';

/** A single audit log entry. */
export interface AuditEntry {
    /** Unique entry ID. */
    id: string;
    /** ISO-8601 timestamp. */
    timestamp: string;
    /** Pipeline run ID this entry belongs to. */
    runId: string;
    /** Agent that produced this entry. */
    agentId: string;
    /** Human-readable action description. */
    action: string;
    /** Outcome status. */
    status: AuditStatus;
    /** SHA-256 hash of the input payload. */
    inputHash: string;
    /** SHA-256 hash of the output payload. */
    outputHash: string;
    /** Wall-clock duration in milliseconds. */
    durationMs: number;
    /** Structured details (agent-specific). */
    details: Record<string, unknown>;
    /** Previous entry hash for chain integrity. */
    previousHash: string;
    /** SHA-256 hash of this entry (computed after all fields set). */
    entryHash: string;
}

/* ─── Helpers ───────────────────────────────────────────────────────────── */

/**
 * Computes a SHA-256 hex digest of arbitrary data.
 *
 * @param data - Any serializable value.
 * @returns 64-character hex hash string.
 */
function sha256(data: unknown): string {
    const payload = typeof data === 'string' ? data : JSON.stringify(data);
    return crypto.createHash('sha256').update(payload).digest('hex');
}

/* ─── AuditLogger Class ─────────────────────────────────────────────────── */

/**
 * Append-only, hash-chained audit logger.
 *
 * Each log entry references the hash of the previous entry, forming an
 * immutable chain. Entries are persisted as JSONL files grouped by run ID.
 */
export class AuditLogger {
    private logDir: string;
    private lastHash: string = '0'.repeat(64);
    private entries: AuditEntry[] = [];

    /**
     * Creates a new AuditLogger instance.
     *
     * @param logDir - Directory path for JSONL audit files.
     */
    constructor(logDir?: string) {
        this.logDir = logDir || path.join(process.cwd(), 'data', 'audit');
    }

    /**
     * Logs an agent operation with full audit metadata.
     *
     * @param runId   - Pipeline run identifier.
     * @param agentId - Specialist agent name (e.g. 'research-agent').
     * @param action  - Human-readable action (e.g. 'research_equipment_specs').
     * @param status  - Outcome status.
     * @param input   - The input payload (hashed, not stored raw).
     * @param output  - The output payload (hashed, not stored raw).
     * @param durationMs - Execution duration in milliseconds.
     * @param details - Additional structured data.
     * @returns The created audit entry.
     */
    async log(
        runId: string,
        agentId: string,
        action: string,
        status: AuditStatus,
        input: unknown,
        output: unknown,
        durationMs: number,
        details: Record<string, unknown> = {},
    ): Promise<AuditEntry> {
        const entry: AuditEntry = {
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString(),
            runId,
            agentId,
            action,
            status,
            inputHash: sha256(input),
            outputHash: sha256(output),
            durationMs,
            details,
            previousHash: this.lastHash,
            entryHash: '', // computed below
        };

        // Compute entry hash (excludes entryHash field itself)
        const { entryHash: _, ...hashable } = entry;
        entry.entryHash = sha256(hashable);
        this.lastHash = entry.entryHash;
        this.entries.push(entry);

        // Persist to JSONL file
        try {
            await fs.mkdir(this.logDir, { recursive: true });
            const filePath = path.join(this.logDir, `${runId}.jsonl`);
            await fs.appendFile(filePath, JSON.stringify(entry) + '\n', 'utf-8');
        } catch (err) {
            console.error(`[audit-logger] Failed to persist entry: ${err instanceof Error ? err.message : String(err)}`);
        }

        return entry;
    }

    /**
     * Returns the full in-memory audit trail for a given run.
     *
     * @param runId - Pipeline run identifier.
     * @returns Array of audit entries for the run.
     */
    getTrail(runId: string): AuditEntry[] {
        return this.entries.filter((e) => e.runId === runId);
    }

    /**
     * Loads audit trail from disk for a given run.
     *
     * @param runId - Pipeline run identifier.
     * @returns Array of persisted audit entries.
     */
    async loadTrail(runId: string): Promise<AuditEntry[]> {
        try {
            const filePath = path.join(this.logDir, `${runId}.jsonl`);
            const content = await fs.readFile(filePath, 'utf-8');
            return content
                .trim()
                .split('\n')
                .filter(Boolean)
                .map((line) => JSON.parse(line) as AuditEntry);
        } catch {
            return [];
        }
    }

    /**
     * Verifies the integrity of an audit trail by checking hash chains.
     *
     * @param entries - Ordered array of audit entries.
     * @returns True if all hashes are valid and chain is unbroken.
     */
    verifyIntegrity(entries: AuditEntry[]): boolean {
        let expectedPrevHash = '0'.repeat(64);

        for (const entry of entries) {
            // Check chain linkage
            if (entry.previousHash !== expectedPrevHash) {
                console.error(`[audit-logger] Chain broken at entry ${entry.id}`);
                return false;
            }

            // Recompute entry hash
            const { entryHash: _, ...hashable } = entry;
            const computed = sha256(hashable);
            if (computed !== entry.entryHash) {
                console.error(`[audit-logger] Tampered entry detected: ${entry.id}`);
                return false;
            }

            expectedPrevHash = entry.entryHash;
        }

        return true;
    }

    /**
     * Returns the total number of entries logged in this session.
     *
     * @returns Entry count.
     */
    get size(): number {
        return this.entries.length;
    }
}

/* ─── Singleton ─────────────────────────────────────────────────────────── */

let loggerInstance: AuditLogger | null = null;

/**
 * Returns the singleton AuditLogger instance.
 *
 * @returns Shared audit logger.
 */
export function getAuditLogger(): AuditLogger {
    if (!loggerInstance) {
        loggerInstance = new AuditLogger();
    }
    return loggerInstance;
}
