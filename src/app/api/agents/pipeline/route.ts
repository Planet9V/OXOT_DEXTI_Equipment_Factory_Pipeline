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
import type { PipelineV2Params, PipelineV2BatchParams } from '@/lib/agents/types';

/**
 * POST /api/agents/pipeline — Submit a new pipeline run.
 *
 * Supports two modes:
 * - **Batch mode**: `{ equipmentNames: string[], sectorHint?, minQualityScore? }`
 * - **Legacy mode**: `{ sector, subSector, facility, equipmentClass, quantity }`
 *
 * @param request - JSON body.
 * @returns JSON with runId.
 */
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const pipeline = getPipelineV2();

        // ── Batch mode (Equipment Factory) ──
        if (body.equipmentNames && Array.isArray(body.equipmentNames)) {
            const batchParams: PipelineV2BatchParams = {
                equipmentNames: body.equipmentNames.map((n: string) => n.trim()).filter((n: string) => n),
                sectorHint: body.sectorHint || undefined,
                minQualityScore: body.minQualityScore || undefined,
            };

            if (batchParams.equipmentNames.length === 0) {
                return NextResponse.json(
                    { error: 'equipmentNames must contain at least one non-empty entry' },
                    { status: 400 },
                );
            }

            if (batchParams.equipmentNames.length > 100) {
                return NextResponse.json(
                    { error: 'Maximum 100 equipment names per batch run' },
                    { status: 400 },
                );
            }

            const runId = await pipeline.submitBatchRun(batchParams);

            return NextResponse.json({
                success: true,
                runId,
                mode: 'batch',
                itemCount: batchParams.equipmentNames.length,
                message: `Batch pipeline submitted for ${batchParams.equipmentNames.length} equipment items`,
            });
        }

        // ── Legacy single-item mode ──
        const params = body as PipelineV2Params;
        const required: (keyof PipelineV2Params)[] = ['sector', 'subSector', 'facility', 'equipmentClass', 'quantity'];
        for (const field of required) {
            if (!params[field]) {
                return NextResponse.json(
                    { error: `Missing required field: ${field}` },
                    { status: 400 },
                );
            }
        }

        if (params.quantity < 1 || params.quantity > 50) {
            return NextResponse.json(
                { error: 'Quantity must be between 1 and 50' },
                { status: 400 },
            );
        }

        const runId = await pipeline.submitRun(params);

        return NextResponse.json({
            success: true,
            runId,
            mode: 'single',
            message: `Pipeline run submitted for ${params.equipmentClass}`,
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
