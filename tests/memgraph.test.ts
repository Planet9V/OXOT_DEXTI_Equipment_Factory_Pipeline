/**
 * Unit tests for the Memgraph connection module.
 *
 * Tests the singleton driver pattern, query helpers, and error handling.
 */

// Mock neo4j-driver before importing the module
const mockSession = {
    run: jest.fn(),
    close: jest.fn(),
};

const mockDriver = {
    session: jest.fn(() => mockSession),
    close: jest.fn(),
    verifyConnectivity: jest.fn(),
};

jest.mock('neo4j-driver', () => ({
    driver: jest.fn(() => mockDriver),
    auth: {
        basic: jest.fn(() => ({ scheme: 'basic' })),
    },
}));

import {
    getDriver,
    runQuery,
    runWrite,
    runBatchWrite,
    testConnection,
    closeDriver,
    getCircuitBreakerState,
    resetCircuitBreaker,
} from '@/lib/memgraph';

describe('Memgraph Connection Module', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        resetCircuitBreaker(); // Prevent failure state leaking between tests
    });

    test('getDriver returns consistent singleton', () => {
        const d1 = getDriver();
        const d2 = getDriver();
        expect(d1).toBe(d2);
    });

    test('runQuery executes Cypher and returns records', async () => {
        const mockRecords = [{ get: jest.fn(() => 'test') }];
        mockSession.run.mockResolvedValue({ records: mockRecords });

        const result = await runQuery('MATCH (n) RETURN n LIMIT 1');
        expect(result).toEqual(mockRecords);
        expect(mockSession.run).toHaveBeenCalledWith('MATCH (n) RETURN n LIMIT 1', {});
        expect(mockSession.close).toHaveBeenCalled();
    });

    test('runQuery retries on transient failure', async () => {
        const error = new Error('Connection reset');
        mockSession.run
            .mockRejectedValueOnce(error)
            .mockRejectedValueOnce(error)
            .mockResolvedValue({ records: [] });

        const result = await runQuery('RETURN 1');
        expect(result).toEqual([]);
        expect(mockSession.run).toHaveBeenCalledTimes(3);
    });

    test('runQuery throws after 3 retries', async () => {
        const error = new Error('Persistent failure');
        mockSession.run.mockRejectedValue(error);

        await expect(runQuery('RETURN 1')).rejects.toThrow('Persistent failure');
        expect(mockSession.run).toHaveBeenCalledTimes(3);
    });

    test('runWrite executes Cypher and returns summary', async () => {
        const mockSummary = { counters: { nodesCreated: 1 } };
        mockSession.run.mockResolvedValue({ summary: mockSummary });

        const result = await runWrite('CREATE (n:Test)');
        expect(result).toEqual(mockSummary);
        expect(mockSession.close).toHaveBeenCalled();
    });

    test('runWrite retries on transient failure', async () => {
        const error = new Error('Connection reset');
        mockSession.run
            .mockRejectedValueOnce(error)
            .mockResolvedValue({ summary: {} });

        const result = await runWrite('CREATE (n:Test)');
        expect(result).toEqual({});
        expect(mockSession.run).toHaveBeenCalledTimes(2);
    });

    test('runWrite throws after 3 retries', async () => {
        const error = new Error('Write failure');
        mockSession.run.mockRejectedValue(error);

        await expect(runWrite('CREATE (n:Bad)')).rejects.toThrow('Write failure');
        expect(mockSession.run).toHaveBeenCalledTimes(3);
    });

    test('runBatchWrite processes items in chunks', async () => {
        mockSession.run.mockResolvedValue({ summary: {} });

        const batch = Array.from({ length: 5 }, (_, i) => ({ id: i, name: `item-${i}` }));
        const result = await runBatchWrite(
            'MERGE (n:Test {id: row.id}) SET n.name = row.name',
            batch,
            3, // batch size of 3 → 2 chunks
        );

        expect(result.processed).toBe(5);
        expect(result.failed).toBe(0);
        expect(result.errors).toHaveLength(0);
        // 2 chunks: [0,1,2] and [3,4]
        expect(mockSession.run).toHaveBeenCalledTimes(2);
    });

    test('runBatchWrite returns zero counts for empty batch', async () => {
        const result = await runBatchWrite('MERGE (n:Test)', []);
        expect(result.processed).toBe(0);
        expect(result.failed).toBe(0);
        expect(result.errors).toHaveLength(0);
        expect(mockSession.run).not.toHaveBeenCalled();
    });

    test('runBatchWrite tracks partial failures across chunks', async () => {
        // First chunk succeeds, second chunk fails
        mockSession.run
            .mockResolvedValueOnce({ summary: {} })  // chunk 1 write
            .mockRejectedValueOnce(new Error('Connection lost'))  // chunk 2 attempt 1
            .mockRejectedValueOnce(new Error('Connection lost'))  // chunk 2 attempt 2
            .mockRejectedValueOnce(new Error('Connection lost')); // chunk 2 attempt 3

        // Reset circuit breaker so retries don't trip it
        resetCircuitBreaker();

        const batch = Array.from({ length: 5 }, (_, i) => ({ id: i }));
        const result = await runBatchWrite('MERGE (n:T {id: row.id})', batch, 3);

        expect(result.processed).toBe(3); // chunk 1 succeeded
        expect(result.failed).toBe(2);    // chunk 2 failed
        expect(result.errors).toHaveLength(1);
        expect(result.errors[0].message).toBe('Connection lost');
    });

    test('testConnection verifies driver connectivity', async () => {
        mockDriver.verifyConnectivity.mockResolvedValue(undefined);
        mockSession.run.mockResolvedValue({ records: [{ get: jest.fn(() => 1) }] });

        const result = await testConnection();
        expect(result).toBe(true);
        expect(mockDriver.verifyConnectivity).toHaveBeenCalled();
    });

    test('testConnection returns false on failure', async () => {
        mockDriver.verifyConnectivity.mockRejectedValue(new Error('Refused'));

        const result = await testConnection();
        expect(result).toBe(false);
    });

    test('closeDriver closes the driver', async () => {
        mockDriver.close.mockResolvedValue(undefined);
        await closeDriver();
        expect(mockDriver.close).toHaveBeenCalled();
    });
});

// =============================================================================
// Circuit Breaker Tests (L1)
// =============================================================================

describe('Circuit Breaker', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        resetCircuitBreaker();
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    /**
     * Helper: triggers a single failing runQuery and advances all retry timers.
     * Each query has 3 retries with increasing delays (1s, 2s, 3s).
     */
    async function triggerFailedQuery(): Promise<void> {
        const queryPromise = runQuery('RETURN 1').catch(() => { });
        // Advance through all 3 retry delays (1s + 2s inner waits)
        await jest.advanceTimersByTimeAsync(10000);
        await queryPromise;
    }

    test('starts in CLOSED state', () => {
        const state = getCircuitBreakerState();
        expect(state.state).toBe('CLOSED');
        expect(state.failureCount).toBe(0);
    });

    test('transitions to OPEN after 5 failed queries', async () => {
        mockSession.run.mockRejectedValue(new Error('DB down'));

        for (let i = 0; i < 5; i++) {
            await triggerFailedQuery();
        }

        const state = getCircuitBreakerState();
        expect(state.state).toBe('OPEN');
        expect(state.failureCount).toBe(5);
    });

    test('OPEN state blocks queries immediately', async () => {
        mockSession.run.mockRejectedValue(new Error('DB down'));
        for (let i = 0; i < 5; i++) {
            await triggerFailedQuery();
        }

        jest.clearAllMocks();
        await expect(runQuery('RETURN 1')).rejects.toThrow('Circuit breaker OPEN');
        expect(mockSession.run).not.toHaveBeenCalled();
    });

    test('resetCircuitBreaker restores CLOSED state', async () => {
        mockSession.run.mockRejectedValue(new Error('DB down'));
        for (let i = 0; i < 5; i++) {
            await triggerFailedQuery();
        }
        expect(getCircuitBreakerState().state).toBe('OPEN');

        resetCircuitBreaker();
        expect(getCircuitBreakerState().state).toBe('CLOSED');
        expect(getCircuitBreakerState().failureCount).toBe(0);
    });

    test('success resets failure count', async () => {
        mockSession.run.mockRejectedValue(new Error('DB down'));
        for (let i = 0; i < 4; i++) {
            await triggerFailedQuery();
        }
        expect(getCircuitBreakerState().failureCount).toBe(4);

        // One success resets to 0
        mockSession.run.mockResolvedValue({ records: [] });
        await runQuery('RETURN 1');
        expect(getCircuitBreakerState().failureCount).toBe(0);
        expect(getCircuitBreakerState().state).toBe('CLOSED');
    });
});
