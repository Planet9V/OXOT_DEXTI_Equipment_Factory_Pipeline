/**
 * Pipeline V2 API Route.
 *
 * Dedicated REST endpoint for the agent-orchestrated equipment pipeline.
 * Provides submit, status, and cancellation operations.
 *
 * @module api/agents/pipeline
 */

import { NextResponse } from 'next/server';
import { getPipelineV2 } from '@/lib/agents/pipeline-v2';
import { getAuditLogger } from '@/lib/agents/audit-logger';
import type { PipelineV2Params } from '@/lib/agents/types';

/**
 * POST /api/agents/pipeline — Submit a new pipeline run.
 *
 * @param request - JSON body with PipelineV2Params.
 * @returns JSON with runId.
 */
export async function POST(request: Request) {
    try {
        const body = (await request.json()) as PipelineV2Params;

        // Validate required fields
        const required: (keyof PipelineV2Params)[] = ['sector', 'subSector', 'facility', 'equipmentClass', 'quantity'];
        for (const field of required) {
            if (!body[field]) {
                return NextResponse.json(
                    { error: `Missing required field: ${field}` },
                    { status: 400 },
                );
            }
        }

        if (body.quantity < 1 || body.quantity > 50) {
            return NextResponse.json(
                { error: 'Quantity must be between 1 and 50' },
                { status: 400 },
            );
        }

        const pipeline = getPipelineV2();
        const runId = await pipeline.submitRun(body);

        return NextResponse.json({
            success: true,
            runId,
            message: `Pipeline run submitted for ${body.equipmentClass}`,
        });
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error('[api/agents/pipeline] POST error:', message);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

/**
 * GET /api/agents/pipeline — Get run status or list all runs.
 *
 * @param request - Query params: runId (optional).
 * @returns JSON with run status or list.
 */
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const runId = searchParams.get('runId');
        const pipeline = getPipelineV2();

        if (runId) {
            const run = pipeline.getRun(runId);
            if (!run) {
                return NextResponse.json(
                    { error: `Run ${runId} not found` },
                    { status: 404 },
                );
            }

            // Include audit trail if requested
            const includeAudit = searchParams.get('audit') === 'true';
            let auditTrail = null;
            if (includeAudit) {
                const logger = getAuditLogger();
                auditTrail = logger.getTrail(runId);
            }

            return NextResponse.json({ run, auditTrail });
        }

        // List all runs
        const runs = pipeline.listRuns();
        return NextResponse.json({ runs, count: runs.length });
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error('[api/agents/pipeline] GET error:', message);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

/**
 * DELETE /api/agents/pipeline — Cancel a running pipeline.
 *
 * @param request - Query params: runId.
 * @returns JSON confirmation.
 */
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const runId = searchParams.get('runId');

        if (!runId) {
            return NextResponse.json(
                { error: 'runId query parameter is required' },
                { status: 400 },
            );
        }

        const pipeline = getPipelineV2();
        pipeline.cancelRun(runId);

        return NextResponse.json({
            success: true,
            message: `Run ${runId} cancelled`,
        });
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error('[api/agents/pipeline] DELETE error:', message);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
