/**
 * Health Check API Route.
 *
 * Returns the current status of the Memgraph connection, circuit breaker state,
 * and graph statistics. This endpoint is designed for monitoring and liveness probes.
 *
 * @module api/health
 */

import { NextResponse } from 'next/server';
import { testConnection, getCircuitBreakerState, runQuery } from '@/lib/memgraph';
import { testOpenRouterConnection } from '@/lib/agents/openrouter-client';

/**
 * GET /api/health
 *
 * Returns a JSON health report including:
 * - Memgraph connection status
 * - Circuit breaker state
 * - Node/relationship counts (if connected)
 * - Schema version
 */
export async function GET() {
    const circuitBreaker = getCircuitBreakerState();

    let memgraphConnected = false;
    let nodeCount = 0;
    let relationshipCount = 0;
    let schemaVersion = 'unknown';

    try {
        memgraphConnected = await testConnection();

        if (memgraphConnected) {
            // Get node count
            const nodeResult = await runQuery('MATCH (n) RETURN count(n) AS cnt');
            nodeCount = nodeResult[0]?.get('cnt')?.toNumber?.() ?? nodeResult[0]?.get('cnt') ?? 0;

            // Get relationship count
            const relResult = await runQuery('MATCH ()-[r]->() RETURN count(r) AS cnt');
            relationshipCount = relResult[0]?.get('cnt')?.toNumber?.() ?? relResult[0]?.get('cnt') ?? 0;

            // Get schema version
            try {
                const versionResult = await runQuery(
                    "MATCH (v:SchemaVersion {id: 'dexpi'}) RETURN v.version AS version",
                );
                schemaVersion = versionResult[0]?.get('version') ?? 'not seeded';
            } catch {
                schemaVersion = 'not seeded';
            }
        }
    } catch {
        memgraphConnected = false;
    }

    let agentConnected = false;
    try {
        agentConnected = await testOpenRouterConnection();
    } catch {
        agentConnected = false;
    }

    const health = {
        status: memgraphConnected ? 'healthy' : 'degraded',
        memgraph: {
            connected: memgraphConnected,
            nodeCount,
            relationshipCount,
            schemaVersion,
        },
        circuitBreaker: {
            state: circuitBreaker.state,
            failureCount: circuitBreaker.failureCount,
        },
        agent: {
            connected: agentConnected,
            model: process.env.OPENROUTER_MODEL || 'moonshotai/kimi-k2.5',
        },
        timestamp: new Date().toISOString(),
    };

    return NextResponse.json(health, {
        status: memgraphConnected ? 200 : 503,
    });
}
