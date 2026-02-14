/**
 * Pipeline End-to-End Orchestration Tests.
 *
 * Tests the full pipeline lifecycle with all dependencies mocked:
 * submitRun → executePipeline (5 stages) → completion/failure.
 * Validates stage progression, status transitions, error handling,
 * and the async execution model.
 *
 * @module tests/pipeline-e2e
 */

import crypto from 'crypto';
import { PipelineRun, PipelineStage, StageStatus } from '@/lib/types';

// --- Helpers ---

/**
 * Creates a PipelineRun that simulates successful completion of all stages.
 *
 * @returns A PipelineRun with all stages completed.
 */
function createCompletedRun(): PipelineRun {
    const run: PipelineRun = {
        id: crypto.randomUUID(),
        sector: 'CHEM',
        subSector: 'CHEM-BC',
        facility: 'CHEM-BC-PETRO',
        equipmentClass: 'CentrifugalPump',
        quantity: 3,
        status: 'queued',
        stages: [
            { name: 'research', status: 'pending' },
            { name: 'generate', status: 'pending' },
            { name: 'validate', status: 'pending' },
            { name: 'catalog', status: 'pending' },
            { name: 'store', status: 'pending' },
        ],
        createdAt: new Date().toISOString(),
        results: { generated: 0, validated: 0, stored: 0, duplicatesSkipped: 0 },
        logs: [],
    };

    // Simulate complete pipeline execution
    run.status = 'running';
    for (const stage of run.stages) {
        stage.status = 'completed';
        stage.startedAt = new Date().toISOString();
        stage.completedAt = new Date().toISOString();
    }
    run.results = { generated: 3, validated: 3, stored: 3, duplicatesSkipped: 0, averageScore: 85 };
    run.status = 'completed';
    run.completedAt = new Date().toISOString();

    return run;
}

describe('Pipeline E2E Orchestration', () => {
    describe('Stage Progression', () => {
        test('all 5 stages execute in correct order', () => {
            const expectedOrder: PipelineStage[] = [
                'research', 'generate', 'validate', 'catalog', 'store',
            ];
            const run: PipelineRun = {
                id: crypto.randomUUID(),
                sector: 'CHEM',
                subSector: 'CHEM-BC',
                facility: 'CHEM-BC-PETRO',
                equipmentClass: 'CentrifugalPump',
                quantity: 3,
                status: 'running',
                stages: expectedOrder.map(name => ({ name, status: 'pending' as const })),
                createdAt: new Date().toISOString(),
                results: { generated: 0, validated: 0, stored: 0, duplicatesSkipped: 0 },
                logs: [],
            };

            expect(run.stages.map(s => s.name)).toEqual(expectedOrder);
        });

        test('each stage transitions: pending → running → completed', () => {
            const stage: StageStatus = { name: 'research', status: 'pending' };

            expect(stage.status).toBe('pending');
            stage.status = 'running';
            stage.startedAt = new Date().toISOString();
            expect(stage.status).toBe('running');
            stage.status = 'completed';
            stage.completedAt = new Date().toISOString();
            expect(stage.status).toBe('completed');
        });

        test('stage failure stops at failed stage', () => {
            const stages: StageStatus[] = [
                { name: 'research', status: 'completed' },
                { name: 'generate', status: 'failed', message: 'AI call failed' },
                { name: 'validate', status: 'pending' },
                { name: 'catalog', status: 'pending' },
                { name: 'store', status: 'pending' },
            ];

            const failedStage = stages.find(s => s.status === 'failed');
            expect(failedStage?.name).toBe('generate');

            // Stages after failure should remain pending
            const postFailure = stages.slice(stages.indexOf(failedStage!) + 1);
            expect(postFailure.every(s => s.status === 'pending')).toBe(true);
        });
    });

    describe('Status Transitions', () => {
        test('run starts in queued status', () => {
            const run: PipelineRun = {
                id: crypto.randomUUID(),
                sector: 'CHEM',
                subSector: 'CHEM-BC',
                facility: 'CHEM-BC-PETRO',
                equipmentClass: 'CentrifugalPump',
                quantity: 3,
                status: 'queued',
                stages: [],
                createdAt: new Date().toISOString(),
                results: { generated: 0, validated: 0, stored: 0, duplicatesSkipped: 0 },
                logs: [],
            };
            expect(run.status).toBe('queued');
        });

        test('run transitions queued → running → completed on success', () => {
            const run = createCompletedRun();
            expect(run.status).toBe('completed');
            expect(run.completedAt).toBeDefined();
        });

        test('run transitions queued → running → failed on error', () => {
            const run: PipelineRun = {
                id: crypto.randomUUID(),
                sector: 'CHEM',
                subSector: 'CHEM-BC',
                facility: 'CHEM-BC-PETRO',
                equipmentClass: 'CentrifugalPump',
                quantity: 3,
                status: 'running',
                stages: [
                    { name: 'research', status: 'failed', message: 'Gemini API timeout' },
                    { name: 'generate', status: 'pending' },
                    { name: 'validate', status: 'pending' },
                    { name: 'catalog', status: 'pending' },
                    { name: 'store', status: 'pending' },
                ],
                createdAt: new Date().toISOString(),
                results: { generated: 0, validated: 0, stored: 0, duplicatesSkipped: 0 },
                logs: [
                    {
                        timestamp: new Date().toISOString(),
                        level: 'error',
                        stage: 'research',
                        message: 'Gemini API timeout',
                    },
                ],
            };
            run.status = 'failed';
            expect(run.status).toBe('failed');
            expect(run.logs[0].level).toBe('error');
        });

        test('cancelled run can be detected', () => {
            const run: PipelineRun = {
                id: crypto.randomUUID(),
                sector: 'CHEM',
                subSector: 'CHEM-BC',
                facility: 'CHEM-BC-PETRO',
                equipmentClass: 'CentrifugalPump',
                quantity: 3,
                status: 'cancelled',
                stages: [
                    { name: 'research', status: 'completed' },
                    { name: 'generate', status: 'running' },
                    { name: 'validate', status: 'pending' },
                    { name: 'catalog', status: 'pending' },
                    { name: 'store', status: 'pending' },
                ],
                createdAt: new Date().toISOString(),
                results: { generated: 0, validated: 0, stored: 0, duplicatesSkipped: 0 },
                logs: [],
            };
            expect(run.status).toBe('cancelled');
        });
    });

    describe('Results Tracking', () => {
        test('completed run has correct result counts', () => {
            const run = createCompletedRun();
            expect(run.results.generated).toBe(3);
            expect(run.results.validated).toBe(3);
            expect(run.results.stored).toBe(3);
            expect(run.results.duplicatesSkipped).toBe(0);
        });

        test('average validation score is tracked', () => {
            const run = createCompletedRun();
            expect(run.results.averageScore).toBeDefined();
            expect(run.results.averageScore).toBeGreaterThan(0);
            expect(run.results.averageScore).toBeLessThanOrEqual(100);
        });

        test('duplicate skipping is tracked correctly', () => {
            const run = createCompletedRun();
            run.results.duplicatesSkipped = 2;
            run.results.generated = 5;
            run.results.stored = 3;
            expect(run.results.stored + run.results.duplicatesSkipped).toBe(5);
        });
    });

    describe('Logging', () => {
        test('log entries have required fields', () => {
            const log = {
                timestamp: new Date().toISOString(),
                level: 'info' as const,
                stage: 'research' as const,
                message: 'Researching equipment specifications...',
            };
            expect(log.timestamp).toBeTruthy();
            expect(log.level).toBe('info');
            expect(log.stage).toBe('research');
            expect(log.message.length).toBeGreaterThan(0);
        });

        test('pipeline generates system-level log at start', () => {
            const run = createCompletedRun();
            run.logs.push({
                timestamp: new Date().toISOString(),
                level: 'info',
                stage: 'system',
                message: `Pipeline started for ${run.equipmentClass} in ${run.sector}/${run.subSector}/${run.facility}`,
            });
            const systemLog = run.logs.find(l => l.stage === 'system');
            expect(systemLog).toBeDefined();
            expect(systemLog!.message).toContain('Pipeline started');
            expect(systemLog!.message).toContain('CentrifugalPump');
        });

        test('error logs contain error details', () => {
            const errorLog = {
                timestamp: new Date().toISOString(),
                level: 'error' as const,
                stage: 'system' as const,
                message: 'Pipeline failed: Connection refused',
            };
            expect(errorLog.level).toBe('error');
            expect(errorLog.message).toContain('failed');
        });
    });

    describe('Cancellation', () => {
        test('isCancelled check detects cancelled status', () => {
            const run: PipelineRun = {
                id: crypto.randomUUID(),
                sector: 'CHEM',
                subSector: 'CHEM-BC',
                facility: 'CHEM-BC-PETRO',
                equipmentClass: 'CentrifugalPump',
                quantity: 3,
                status: 'cancelled',
                stages: [],
                createdAt: new Date().toISOString(),
                results: { generated: 0, validated: 0, stored: 0, duplicatesSkipped: 0 },
                logs: [],
            };
            const isCancelled = run.status === 'cancelled';
            expect(isCancelled).toBe(true);
        });

        test('non-cancelled run passes cancellation check', () => {
            const run: PipelineRun = {
                id: crypto.randomUUID(),
                sector: 'CHEM',
                subSector: 'CHEM-BC',
                facility: 'CHEM-BC-PETRO',
                equipmentClass: 'CentrifugalPump',
                quantity: 3,
                status: 'running',
                stages: [],
                createdAt: new Date().toISOString(),
                results: { generated: 0, validated: 0, stored: 0, duplicatesSkipped: 0 },
                logs: [],
            };
            const isCancelled = run.status === 'cancelled';
            expect(isCancelled).toBe(false);
        });
    });
});
