import { NextResponse } from 'next/server';
import * as storage from '@/lib/storage';
import { getAllSectors } from '@/lib/sectors-data';

/**
 * Returns the sector → subsector → facility directory tree.
 *
 * Falls back to static SECTORS data when Memgraph is offline or empty,
 * ensuring the Dashboard always renders meaningful content.
 */
export async function GET() {
  const ts = new Date().toISOString();

  try {
    const tree = await storage.getDirectoryTree();

    if (tree.length > 0) {
      return NextResponse.json({ success: true, data: tree, source: 'graph', timestamp: ts });
    }

    // Memgraph returned empty — fall back to static sector data
    const staticTree = buildStaticTree();
    return NextResponse.json({ success: true, data: staticTree, source: 'static', timestamp: ts });
  } catch (err: any) {
    // Memgraph is offline — fall back to static sector data
    console.error('[api/tree] Memgraph unavailable, using static fallback:', err.message);
    const staticTree = buildStaticTree();
    return NextResponse.json({ success: true, data: staticTree, source: 'static-fallback', timestamp: ts });
  }
}

/**
 * Builds a directory tree from the static SECTORS constant.
 *
 * This ensures the Dashboard and related pages always show the 16 CISA
 * sectors with accurate equipment counts, even without a running Memgraph.
 */
function buildStaticTree() {
  const sectors = getAllSectors();
  return sectors.map(s => ({
    path: s.code,
    name: s.code,
    type: 'sector' as const,
    children: s.subSectors.map(sub => ({
      path: `${s.code}/${sub.code}`,
      name: sub.code,
      type: 'subsector' as const,
      children: sub.facilities.map(f => ({
        path: `${s.code}/${sub.code}/${f.code}`,
        name: f.code,
        type: 'facility' as const,
        children: [],
        equipmentCount: f.equipment.length,
        vendorCount: 0,
      })),
      equipmentCount: sub.facilities.reduce((a, f) => a + f.equipment.length, 0),
      vendorCount: 0,
    })),
    equipmentCount: s.subSectors.reduce(
      (a, sub) => a + sub.facilities.reduce((b, f) => b + f.equipment.length, 0),
      0,
    ),
    vendorCount: 0,
  }));
}
