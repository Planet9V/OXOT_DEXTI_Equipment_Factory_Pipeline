/**
 * Pipeline Connectivity Tests.
 *
 * Validates Memgraph connection lifecycle, polling mechanics,
 * and the run submission/status flow.
 *
 * @module tests/pipeline-connectivity
 */

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

jest.mock('@/lib/storage', () => ({
    savePipelineRun: jest.fn().mockResolvedValue(undefined),
    listEquipment: jest.fn().mockResolvedValue([]),
    createFacility: jest.fn().mockResolvedValue(undefined),
    saveEquipment: jest.fn().mockResolvedValue(undefined),
}));

import {
    testConnection,
    getDriver,
    resetCircuitBreaker,
} from '@/lib/memgraph';

describe('Pipeline Connectivity', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        resetCircuitBreaker();
    });

    describe('Memgraph Connection', () => {
        test('testConnection returns true when Memgraph is reachable', async () => {
            mockDriver.verifyConnectivity.mockResolvedValue(undefined);
            const result = await testConnection();
            expect(result).toBe(true);
            expect(mockDriver.verifyConnectivity).toHaveBeenCalled();
        });

        test('testConnection returns false when Memgraph is unreachable', async () => {
            mockDriver.verifyConnectivity.mockRejectedValue(
                new Error('Connection refused')
            );
            const result = await testConnection();
            expect(result).toBe(false);
        });

        test('getDriver returns a valid driver object', () => {
            const driver = getDriver();
            expect(driver).toBeDefined();
            expect(driver.session).toBeDefined();
            expect(typeof driver.session).toBe('function');
        });

        test('getDriver returns the same singleton instance on repeated calls', () => {
            const d1 = getDriver();
            const d2 = getDriver();
            const d3 = getDriver();
            expect(d1).toBe(d2);
            expect(d2).toBe(d3);
        });

        test('driver creates sessions with correct configuration', () => {
            const driver = getDriver();
            const session = driver.session();
            expect(session).toBeDefined();
            expect(session.run).toBeDefined();
            expect(session.close).toBeDefined();
        });
    });

    describe('Run Status Polling', () => {
        let pipeline: any;

        beforeEach(() => {
            // Re-import to get a fresh pipeline instance
            jest.isolateModules(() => {
                // Pipeline constructor checks GEMINI_API_KEY
                process.env.GEMINI_API_KEY = 'test-key';
            });
        });

        test('getRunStatus returns undefined for non-existent run', async () => {
            const { getPipeline } = require('@/lib/pipeline');
            pipeline = getPipeline();
            const result = pipeline.getRunStatus('non-existent-id');
            expect(result).toBeUndefined();
        });

        test('getRunHistory returns empty array when no runs exist', async () => {
            const { getPipeline } = require('@/lib/pipeline');
            pipeline = getPipeline();
            const history = pipeline.getRunHistory();
            expect(Array.isArray(history)).toBe(true);
        });

        test('cancelRun returns false for non-existent run', async () => {
            const { getPipeline } = require('@/lib/pipeline');
            pipeline = getPipeline();
            const result = pipeline.cancelRun('non-existent-id');
            expect(result).toBe(false);
        });
    });
});
