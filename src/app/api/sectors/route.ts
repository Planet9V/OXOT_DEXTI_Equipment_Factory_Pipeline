import { NextRequest, NextResponse } from 'next/server';
import { getAllSectors } from '@/lib/sectors-data';
import * as storage from '@/lib/storage';

/**
 * Returns all 16 CISA sectors with equipment counts.
 *
 * Merges static sector definitions with live Memgraph counts when available.
 * Gracefully falls back to static equipment counts when Memgraph is offline.
 */
export async function GET() {
  const ts = new Date().toISOString();

  try {
    const sectors = getAllSectors();

    // Try to merge with live graph data; fall back to static counts
    let tree: any[] = [];
    try {
      tree = await storage.getDirectoryTree();
    } catch {
      // Memgraph offline — use static counts from sector definitions
      console.warn('[api/sectors] Memgraph unavailable, using static equipment counts');
    }

    const merged = sectors.map(s => {
      const dir = tree.find(d => d.name === s.code);
      const staticEqCount = s.subSectors.reduce(
        (a, sub) => a + sub.facilities.reduce((b, f) => b + f.equipment.length, 0),
        0,
      );
      return {
        ...s,
        equipmentCount: dir?.equipmentCount || staticEqCount,
        vendorCount: dir?.vendorCount || 0,
      };
    });

    return NextResponse.json({ success: true, data: merged, timestamp: ts });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message, timestamp: ts },
      { status: 500 },
    );
  }
}

/**
 * Creates a new sector in the graph database.
 */
export async function POST(req: NextRequest) {
  const ts = new Date().toISOString();

  try {
    const body = await req.json();
    const { code, name, description } = body;

    if (!code || !name) {
      return NextResponse.json(
        { success: false, error: 'code and name required', timestamp: ts },
        { status: 400 },
      );
    }

    await storage.createSector(code, name, description || '');
    return NextResponse.json(
      { success: true, data: { code, name, description }, timestamp: ts },
      { status: 201 },
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message, timestamp: ts },
      { status: 500 },
    );
  }
}
