import { NextRequest, NextResponse } from 'next/server';
import { getSector } from '@/lib/sectors-data';
import * as storage from '@/lib/storage';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ sector: string }> }) {
  const { sector } = await params;
  try {
    const sectorData = getSector(sector);
    const tree = await storage.getDirectoryTree();
    const sectorDir = tree.find(d => d.name === sector.toUpperCase());
    return NextResponse.json({ success: true, data: { defined: sectorData?.subSectors || [], onDisk: sectorDir?.children || [] }, timestamp: new Date().toISOString() });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message, timestamp: new Date().toISOString() }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ sector: string }> }) {
  const { sector } = await params;
  try {
    const { code, name, description } = await req.json();
    if (!code || !name) return NextResponse.json({ success: false, error: 'code and name required', timestamp: new Date().toISOString() }, { status: 400 });
    await storage.createSubSector(sector, code, name, description || '');
    return NextResponse.json({ success: true, data: { sector, code, name }, timestamp: new Date().toISOString() }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message, timestamp: new Date().toISOString() }, { status: 500 });
  }
}
