/**
 * Memgraph connection module.
 *
 * Provides a singleton Neo4j-compatible driver for connecting to the in-container
 * Memgraph instance via the Bolt protocol. All Cypher queries flow through this
 * module's helper functions which include automatic retry logic.
 *
 * @module memgraph
 */

import neo4j, { Driver, Session, Record as Neo4jRecord } from 'neo4j-driver';

const MEMGRAPH_HOST = process.env.MEMGRAPH_HOST || 'localhost';
const MEMGRAPH_PORT = process.env.MEMGRAPH_PORT || '7687';
const BOLT_URI = `bolt://${MEMGRAPH_HOST}:${MEMGRAPH_PORT}`;

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

let driver: Driver | null = null;

// Dev-mode HMR-safe singleton key on globalThis
const GLOBAL_KEY = '__MEMGRAPH_DRIVER__' as const;

/**
 * Returns a singleton Neo4j driver instance connected to Memgraph.
 *
 * Uses globalThis to survive Next.js hot module reloading in development.
 * In production, the module-level `driver` variable is the singleton.
 *
 * @returns The Neo4j driver connected to the local Memgraph instance.
 */
export function getDriver(): Driver {
  // Check module-level cache first (fastest path)
  if (driver) return driver;

  // In dev mode, check globalThis to survive HMR reloads
  const globalDriver = (globalThis as Record<string, unknown>)[GLOBAL_KEY] as Driver | undefined;
  if (globalDriver) {
    driver = globalDriver;
    return driver;
  }

  driver = neo4j.driver(BOLT_URI, neo4j.auth.basic('', ''), {
    maxConnectionPoolSize: 50,
    connectionAcquisitionTimeout: 10000,
    connectionTimeout: 5000,
  });

  // Persist on globalThis so HMR reloads reuse the same driver
  (globalThis as Record<string, unknown>)[GLOBAL_KEY] = driver;

  return driver;
}

/**
 * Returns a new Memgraph session for running queries.
 *
 * @returns A Neo4j session.
 */
export function getSession(): Session {
  return getDriver().session();
}

/**
 * Executes a Cypher query against Memgraph with automatic retry logic.
 *
 * Wraps the query in a try/catch with up to 3 retries and exponential backoff.
 * All errors are logged to stderr.
 *
 * @param cypher - The Cypher query string.
 * @param params - Optional parameter map for the query.
 * @returns Array of Neo4j records.
 */
export async function runQuery(
  cypher: string,
  params: Record<string, unknown> = {},
): Promise<Neo4jRecord[]> {
  if (isCircuitOpen()) {
    throw new Error('[memgraph] Circuit breaker OPEN — Memgraph unavailable');
  }

  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const session = getSession();
    try {
      const result = await session.run(cypher, params);
      recordSuccess();
      return result.records;
    } catch (err: unknown) {
      lastError = err instanceof Error ? err : new Error(String(err));
      console.error(
        `[memgraph] Query failed (attempt ${attempt}/${MAX_RETRIES}): ${lastError.message}`,
      );
      if (attempt < MAX_RETRIES) {
        await sleep(RETRY_DELAY_MS * attempt);
      }
    } finally {
      await session.close();
    }
  }

  // Record ONE failure per query (not per retry) to prevent premature circuit open
  recordFailure();
  throw lastError || new Error('[memgraph] Query failed after max retries');
}

/**
 * Executes a write transaction with automatic retry logic.
 *
 * Wraps the query in a try/catch with up to 3 retries and exponential backoff,
 * matching the reliability guarantees of {@link runQuery}.
 *
 * @param cypher - The Cypher query string.
 * @param params - Optional parameter map.
 * @returns The Neo4j result summary.
 */
export async function runWrite(
  cypher: string,
  params: Record<string, unknown> = {},
) {
  if (isCircuitOpen()) {
    throw new Error('[memgraph] Circuit breaker OPEN — Memgraph unavailable');
  }

  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const session = getSession();
    try {
      const result = await session.run(cypher, params);
      recordSuccess();
      return result.summary;
    } catch (err: unknown) {
      lastError = err instanceof Error ? err : new Error(String(err));
      console.error(
        `[memgraph] Write failed (attempt ${attempt}/${MAX_RETRIES}): ${lastError.message}`,
      );
      if (attempt < MAX_RETRIES) {
        await sleep(RETRY_DELAY_MS * attempt);
      }
    } finally {
      await session.close();
    }
  }

  // Record ONE failure per write (not per retry) to prevent premature circuit open
  recordFailure();
  throw lastError || new Error('[memgraph] Write failed after max retries');
}

// =============================================================================
// Circuit Breaker
// =============================================================================

const circuitBreaker = {
  state: 'CLOSED' as 'CLOSED' | 'OPEN' | 'HALF_OPEN',
  failureCount: 0,
  lastFailureTime: 0,
  THRESHOLD: 5,
  TIMEOUT_MS: 30000,
};

/**
 * Checks if the circuit breaker allows execution.
 *
 * @returns True if execution should proceed.
 */
function isCircuitOpen(): boolean {
  if (circuitBreaker.state === 'CLOSED') return false;
  if (circuitBreaker.state === 'OPEN') {
    if (Date.now() - circuitBreaker.lastFailureTime > circuitBreaker.TIMEOUT_MS) {
      circuitBreaker.state = 'HALF_OPEN';
      console.log('[memgraph] Circuit breaker → HALF_OPEN (testing recovery)');
      return false;
    }
    return true;
  }
  return false; // HALF_OPEN allows one attempt
}

/**
 * Records a failure in the circuit breaker.
 */
function recordFailure(): void {
  circuitBreaker.failureCount++;
  circuitBreaker.lastFailureTime = Date.now();
  if (circuitBreaker.failureCount >= circuitBreaker.THRESHOLD) {
    circuitBreaker.state = 'OPEN';
    console.error(`[memgraph] Circuit breaker → OPEN after ${circuitBreaker.failureCount} failures`);
  }
}

/**
 * Records a success, resetting the circuit breaker.
 */
function recordSuccess(): void {
  if (circuitBreaker.state === 'HALF_OPEN' || circuitBreaker.failureCount > 0) {
    console.log('[memgraph] Circuit breaker → CLOSED (recovered)');
  }
  circuitBreaker.failureCount = 0;
  circuitBreaker.state = 'CLOSED';
}

/**
 * Returns the current circuit breaker state for health monitoring.
 */
export function getCircuitBreakerState(): typeof circuitBreaker {
  return { ...circuitBreaker };
}

/**
 * Resets the circuit breaker to CLOSED state.
 *
 * Useful for testing and manual recovery via admin endpoints.
 */
export function resetCircuitBreaker(): void {
  circuitBreaker.state = 'CLOSED';
  circuitBreaker.failureCount = 0;
  circuitBreaker.lastFailureTime = 0;
}

// =============================================================================
// Batch Write Operations
// =============================================================================

/** Result of a batch write operation with partial failure tracking. */
export interface BatchWriteResult {
  /** Total items successfully processed. */
  processed: number;
  /** Total items that failed. */
  failed: number;
  /** Errors from failed chunks. */
  errors: Error[];
}

/**
 * Executes a batch write operation using Memgraph UNWIND for bulk imports.
 *
 * Splits the batch into chunks and processes each chunk in a single Cypher
 * UNWIND transaction. Tracks partial failures instead of aborting the entire
 * batch — chunks after a failure still execute.
 *
 * @param cypher - Cypher template referencing `row` (from UNWIND). Do NOT include
 *                 the `UNWIND $batch AS row` prefix — it is added automatically.
 * @param batch - Array of parameter objects, each becoming a `row`.
 * @param batchSize - Number of items per chunk (default: 100).
 * @returns BatchWriteResult with processed/failed/errors.
 *
 * @example
 * ```typescript
 * const result = await runBatchWrite(
 *   'MERGE (e:Equipment {tag: row.tag}) SET e.name = row.name',
 *   [{ tag: 'P-001', name: 'Pump' }, { tag: 'V-001', name: 'Vessel' }],
 * );
 * console.log(`Processed: ${result.processed}, Failed: ${result.failed}`);
 * ```
 */
export async function runBatchWrite(
  cypher: string,
  batch: Record<string, unknown>[],
  batchSize: number = 100,
): Promise<BatchWriteResult> {
  const result: BatchWriteResult = { processed: 0, failed: 0, errors: [] };
  if (batch.length === 0) return result;

  const fullCypher = `UNWIND $batch AS row ${cypher}`;

  for (let i = 0; i < batch.length; i += batchSize) {
    const chunk = batch.slice(i, i + batchSize);
    try {
      await runWrite(fullCypher, { batch: chunk });
      result.processed += chunk.length;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      result.errors.push(error);
      result.failed += chunk.length;
      console.error(
        `[memgraph] Batch chunk ${Math.floor(i / batchSize) + 1} failed: ${error.message}`,
      );
    }
  }

  console.log(
    `[memgraph] Batch write complete: ${result.processed} processed, ${result.failed} failed.`,
  );
  return result;
}

// =============================================================================
// Connection Management
// =============================================================================

/**
 * Tests the Memgraph connection by verifying driver connectivity.
 *
 * @returns True if the connection is alive.
 */
export async function testConnection(): Promise<boolean> {
  try {
    const d = getDriver();
    await d.verifyConnectivity();
    return true;
  } catch {
    return false;
  }
}

/**
 * Gracefully closes the Memgraph driver connection pool.
 */
export async function closeDriver(): Promise<void> {
  if (driver) {
    await driver.close();
    driver = null;
  }
}

/** Simple sleep utility. */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
