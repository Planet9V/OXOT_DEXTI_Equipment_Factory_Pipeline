import { NextRequest, NextResponse } from 'next/server';
import * as storage from '@/lib/storage';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ sector: string; subsector: string }> }) {
  const { sector, subsector } = await params;
  try {
    const { newCode } = await req.json();
    if (!newCode) return NextResponse.json({ success: false, error: 'newCode required', timestamp: new Date().toISOString() }, { status: 400 });
    await storage.renameSubSector(sector, subsector, newCode);
    return NextResponse.json({ success: true, data: { oldCode: subsector, newCode }, timestamp: new Date().toISOString() });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message, timestamp: new Date().toISOString() }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ sector: string; subsector: string }> }) {
  const { sector, subsector } = await params;
  try {
    await storage.deleteSubSector(sector, subsector);
    return NextResponse.json({ success: true, data: { deleted: subsector }, timestamp: new Date().toISOString() });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message, timestamp: new Date().toISOString() }, { status: 500 });
  }
}
