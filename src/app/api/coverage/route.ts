import { NextRequest, NextResponse } from 'next/server';
import * as storage from '@/lib/storage';
import { getAllSectors } from '@/lib/sectors-data';

export async function GET(req: NextRequest) {
  try {
    const sectorFilter = req.nextUrl.searchParams.get('sector');
    const sectors = sectorFilter ? [getAllSectors().find(s => s.code === sectorFilter)].filter(Boolean) : getAllSectors();
    const reports = [];

    for (const sector of sectors) {
      if (!sector) continue;
      for (const sub of sector.subSectors) {
        for (const fac of sub.facilities) {
          const expectedTypes = fac.equipment.map(e => e.componentClass);
          const report = await storage.getCoverageReport(sector.code, sub.code, fac.code, expectedTypes);
          reports.push(report);
        }
      }
    }

    const totalExpected = reports.reduce((sum, r) => sum + r.expectedTypes.length, 0);
    const totalExisting = reports.reduce((sum, r) => sum + r.existingTypes.length, 0);
    const overallCoverage = totalExpected > 0 ? Math.round((totalExisting / totalExpected) * 100) : 0;

    return NextResponse.json({ success: true, data: { reports, summary: { totalExpected, totalExisting, overallCoverage, totalFacilities: reports.length } }, timestamp: new Date().toISOString() });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message, timestamp: new Date().toISOString() }, { status: 500 });
  }
}
