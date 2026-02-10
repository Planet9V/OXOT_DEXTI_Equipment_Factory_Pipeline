import { NextRequest, NextResponse } from 'next/server';
import { getSector } from '@/lib/sectors-data';
import * as storage from '@/lib/storage';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ sector: string }> }) {
  const { sector } = await params;
  try {
    const sectorData = getSector(sector);
    const equipment = await storage.searchEquipment({ sector });
    return NextResponse.json({ success: true, data: { ...sectorData, equipment: equipment.items }, timestamp: new Date().toISOString() });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message, timestamp: new Date().toISOString() }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ sector: string }> }) {
  const { sector } = await params;
  try {
    const { newCode } = await req.json();
    if (!newCode) return NextResponse.json({ success: false, error: 'newCode required', timestamp: new Date().toISOString() }, { status: 400 });
    await storage.renameSector(sector, newCode);
    return NextResponse.json({ success: true, data: { oldCode: sector, newCode }, timestamp: new Date().toISOString() });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message, timestamp: new Date().toISOString() }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ sector: string }> }) {
  const { sector } = await params;
  try {
    await storage.deleteSector(sector);
    return NextResponse.json({ success: true, data: { deleted: sector }, timestamp: new Date().toISOString() });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message, timestamp: new Date().toISOString() }, { status: 500 });
  }
}
