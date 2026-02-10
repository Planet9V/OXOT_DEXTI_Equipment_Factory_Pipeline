import { NextResponse } from 'next/server';
import * as storage from '@/lib/storage';
import { getAllSectors } from '@/lib/sectors-data';

export async function POST() {
  try {
    await storage.initializeDataDir();
    const sectors = getAllSectors();
    let created = 0;

    for (const sector of sectors) {
      await storage.createSector(sector.code, sector.name, sector.description).catch(() => {});
      for (const sub of sector.subSectors) {
        await storage.createSubSector(sector.code, sub.code, sub.name, sub.description).catch(() => {});
        for (const fac of sub.facilities) {
          await storage.createFacility(sector.code, sub.code, fac.code, fac.name, fac.description).catch(() => {});
          created++;
        }
      }
    }

    return NextResponse.json({ success: true, data: { message: 'Data directory initialized', facilitiesCreated: created }, timestamp: new Date().toISOString() });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message, timestamp: new Date().toISOString() }, { status: 500 });
  }
}
