import { NextRequest, NextResponse } from 'next/server';
import { getAllSectors } from '@/lib/sectors-data';
import * as storage from '@/lib/storage';

export async function GET() {
  try {
    const sectors = getAllSectors();
    const tree = await storage.getDirectoryTree();
    const merged = sectors.map(s => {
      const dir = tree.find(d => d.name === s.code);
      return { ...s, equipmentCount: dir?.equipmentCount || 0, vendorCount: dir?.vendorCount || 0 };
    });
    return NextResponse.json({ success: true, data: merged, timestamp: new Date().toISOString() });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message, timestamp: new Date().toISOString() }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code, name, description } = body;
    if (!code || !name) return NextResponse.json({ success: false, error: 'code and name required', timestamp: new Date().toISOString() }, { status: 400 });
    await storage.createSector(code, name, description || '');
    return NextResponse.json({ success: true, data: { code, name, description }, timestamp: new Date().toISOString() }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message, timestamp: new Date().toISOString() }, { status: 500 });
  }
}
