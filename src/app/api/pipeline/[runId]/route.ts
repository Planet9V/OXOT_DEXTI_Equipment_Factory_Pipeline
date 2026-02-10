import { NextRequest, NextResponse } from 'next/server';
import { getPipeline } from '@/lib/pipeline';
import * as storage from '@/lib/storage';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ runId: string }> }) {
  const { runId } = await params;
  try {
    const pipeline = getPipeline();
    let run = pipeline.getRunStatus(runId);
    if (!run) run = await storage.getPipelineRun(runId) || undefined;
    if (!run) return NextResponse.json({ success: false, error: 'Run not found', timestamp: new Date().toISOString() }, { status: 404 });
    return NextResponse.json({ success: true, data: run, timestamp: new Date().toISOString() });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message, timestamp: new Date().toISOString() }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ runId: string }> }) {
  const { runId } = await params;
  try {
    const pipeline = getPipeline();
    const cancelled = pipeline.cancelRun(runId);
    return NextResponse.json({ success: true, data: { cancelled }, timestamp: new Date().toISOString() });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message, timestamp: new Date().toISOString() }, { status: 500 });
  }
}
