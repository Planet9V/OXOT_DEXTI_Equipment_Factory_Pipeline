import { NextRequest, NextResponse } from 'next/server';
import * as storage from '@/lib/storage';

type Params = { params: Promise<{ sector: string; subsector: string; facility: string; tag: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { sector, subsector, facility, tag } = await params;
  try {
    const card = await storage.getEquipment(sector, subsector, facility, tag);
    if (!card) return NextResponse.json({ success: false, error: 'Equipment not found', timestamp: new Date().toISOString() }, { status: 404 });
    const vendors = await storage.listVendorVariations(sector, subsector, facility, tag);
    return NextResponse.json({ success: true, data: { ...card, vendorVariations: vendors }, timestamp: new Date().toISOString() });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message, timestamp: new Date().toISOString() }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  const { sector, subsector, facility, tag } = await params;
  try {
    const existing = await storage.getEquipment(sector, subsector, facility, tag);
    if (!existing) return NextResponse.json({ success: false, error: 'Equipment not found', timestamp: new Date().toISOString() }, { status: 404 });
    const updates = await req.json();
    const updated = { ...existing, ...updates, tag: existing.tag, id: existing.id, metadata: { ...existing.metadata, version: existing.metadata.version + 1, updatedAt: new Date().toISOString() } };
    await storage.saveEquipment(updated);
    return NextResponse.json({ success: true, data: updated, timestamp: new Date().toISOString() });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message, timestamp: new Date().toISOString() }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { sector, subsector, facility, tag } = await params;
  try {
    const deleted = await storage.deleteEquipment(sector, subsector, facility, tag);
    if (!deleted) return NextResponse.json({ success: false, error: 'Equipment not found', timestamp: new Date().toISOString() }, { status: 404 });
    return NextResponse.json({ success: true, data: { deleted: tag }, timestamp: new Date().toISOString() });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message, timestamp: new Date().toISOString() }, { status: 500 });
  }
}
