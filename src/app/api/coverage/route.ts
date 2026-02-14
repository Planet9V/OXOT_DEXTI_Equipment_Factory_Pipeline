import { NextRequest, NextResponse } from 'next/server';
import { runQuery } from '@/lib/memgraph';
import { getAllSectors } from '@/lib/sectors-data';
import * as storage from '@/lib/storage';

export async function GET(req: NextRequest) {
  try {
    const sectorFilter = req.nextUrl.searchParams.get('sector');

    // Efficient Aggregation Query
    // Calculates coverage based on expected facility types vs found equipment
    // Note: "Expected" is derived from the static configuration unless user wants it from DB.
    // User asked for "Real Sectors and SubSectors Labels... inquire the label for Sector".
    // 
    // We will query the DB for the "Actual" state.
    // And join it with the "Expected" state from getAllSectors() for gap analysis.

    const dbStatsQuery = `
      MATCH (e:Equipment:OX_DEXPI2)
      WHERE ($filter IS NULL OR e.sector = $filter)
      RETURN 
        e.sector as sector,
        e.subSector as subSector,
        e.facilityCode as facility,
        count(e) as equipmentCount,
        collect(distinct e.componentClass) as existingTypes
    `;

    const dbResults = await runQuery(dbStatsQuery, { filter: sectorFilter || null });

    // Transform DB results into a lookup map
    const actualMap = new Map<string, { equipmentCount: number, existingTypes: Set<string> }>();

    // Also track improved summary metrics
    const distinctFacilities = new Set<string>();
    let totalEquipmentCount = 0;

    for (const record of dbResults as any[]) {
      const sector = record.get ? record.get('sector') : record.sector;
      const subSector = record.get ? record.get('subSector') : record.subSector;
      const facility = record.get ? record.get('facility') : record.facility;
      const rawCount = record.get ? record.get('equipmentCount') : record.equipmentCount;
      const rawTypes = record.get ? record.get('existingTypes') : record.existingTypes;

      const count = rawCount?.toNumber ? rawCount.toNumber() : Number(rawCount || 0);
      const key = `${sector}|${subSector}|${facility}`;

      actualMap.set(key, {
        equipmentCount: count,
        existingTypes: new Set(rawTypes || [])
      });

      if (facility) distinctFacilities.add(facility);
      totalEquipmentCount += count;
    }

    // Now iterate the "Expected" definition (Source of Truth for what SHOULD exist)
    // and overlay the actual data.
    const definedSectors = sectorFilter ? [getAllSectors().find(s => s.code === sectorFilter)].filter(Boolean) : getAllSectors();
    const reports = [];

    let totalExpectedTypesCount = 0;
    let totalExistingTypesCount = 0;

    for (const sector of definedSectors) {
      if (!sector) continue;
      for (const sub of sector.subSectors) {
        for (const fac of sub.facilities) {
          const key = `${sector.code}|${sub.code}|${fac.code}`;
          const actual = actualMap.get(key) || { equipmentCount: 0, existingTypes: new Set() };

          const expectedTypes = fac.equipment.map(e => e.componentClass);
          const missingTypes = expectedTypes.filter(t => !actual.existingTypes.has(t));

          const coveragePercent = expectedTypes.length > 0
            ? Math.round((actual.existingTypes.size / expectedTypes.length) * 100)
            : 100;

          reports.push({
            sector: sector.code,
            subSector: sub.code,
            facility: fac.code,
            expectedTypes,
            existingTypes: Array.from(actual.existingTypes),
            missingTypes,
            coveragePercent,
            equipmentCount: actual.equipmentCount
          });

          totalExpectedTypesCount += expectedTypes.length;
          totalExistingTypesCount += actual.existingTypes.size;
        }
      }
    }

    const overallCoverage = totalExpectedTypesCount > 0 ? Math.round((totalExistingTypesCount / totalExpectedTypesCount) * 100) : 0;

    return NextResponse.json({
      success: true,
      data: {
        reports,
        summary: {
          totalExpected: totalExpectedTypesCount,
          totalExisting: totalEquipmentCount, // User requested "Total Equipment" here, not just types count
          overallCoverage,
          totalFacilities: distinctFacilities.size
        }
      },
      timestamp: new Date().toISOString()
    });

  } catch (err: any) {
    console.error("Coverage API Error:", err);
    return NextResponse.json({ success: false, error: err.message, timestamp: new Date().toISOString() }, { status: 500 });
  }
}
