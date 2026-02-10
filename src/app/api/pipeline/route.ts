import { NextRequest, NextResponse } from 'next/server';
import { getPipeline } from '@/lib/pipeline';

export async function GET() {
  try {
    const pipeline = getPipeline();
    const runs = pipeline.getRunHistory();
    return NextResponse.json({ success: true, data: runs, timestamp: new Date().toISOString() });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message, timestamp: new Date().toISOString() }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sector, subSector, facility, equipmentClass, quantity } = body;
    if (!sector || !subSector || !facility || !equipmentClass) {
      return NextResponse.json({ success: false, error: 'sector, subSector, facility, equipmentClass required', timestamp: new Date().toISOString() }, { status: 400 });
    }
    const pipeline = getPipeline();
    const runId = await pipeline.submitRun({ sector, subSector, facility, equipmentClass, quantity: quantity || 5 });
    return NextResponse.json({ success: true, data: { runId }, timestamp: new Date().toISOString() }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message, timestamp: new Date().toISOString() }, { status: 500 });
  }
}
