/**
 * CISA Critical Infrastructure Sectors — Aggregated Index.
 *
 * Re-exports all 16 CISA sectors defined in Presidential Policy Directive 21 (PPD-21),
 * each with verified sub-sectors, facility types, and DEXPI 2.0-aligned equipment
 * definitions carrying POSC Caesar Reference Data Library (RDL) URIs.
 *
 * The sector taxonomy is organized hierarchically:
 *   Sector → SubSector → Facility → Equipment
 *
 * Usage:
 *   import { SECTORS, getAllSectors } from '@/lib/sectors';
 *
 * @module sectors
 */

export * from './types';
export * from './uris';

import { DexpiSector, DexpiSubSector, DexpiFacilityType } from './types';
import { CHEMICAL_SECTOR } from './chemical';
import { ENERGY_SECTOR } from './energy';
import { WATER_SECTOR } from './water';
import { NUCLEAR_SECTOR } from './nuclear';
import { MANUFACTURING_SECTOR } from './manufacturing';
import { TRANSPORTATION_SECTOR } from './transportation';
import { FINANCIAL_SECTOR } from './financial';
import { FOOD_SECTOR } from './food';
import { HEALTHCARE_SECTOR } from './healthcare';
import {
    COMMUNICATIONS_SECTOR,
    COMMERCIAL_SECTOR,
    DAMS_SECTOR,
    DEFENSE_SECTOR,
} from './infrastructure';
import {
    EMERGENCY_SECTOR,
    GOVERNMENT_SECTOR,
    IT_SECTOR,
} from './services';

/**
 * Complete array of all 16 CISA Critical Infrastructure Sectors.
 *
 * Order follows the conventional CISA listing per PPD-21.
 */
export const SECTORS: DexpiSector[] = [
    CHEMICAL_SECTOR,        // 01 — Chemical
    COMMERCIAL_SECTOR,      // 02 — Commercial Facilities
    COMMUNICATIONS_SECTOR,  // 03 — Communications
    MANUFACTURING_SECTOR,   // 04 — Critical Manufacturing
    DAMS_SECTOR,            // 05 — Dams
    DEFENSE_SECTOR,         // 06 — Defense Industrial Base
    EMERGENCY_SECTOR,       // 07 — Emergency Services
    ENERGY_SECTOR,          // 08 — Energy
    FINANCIAL_SECTOR,       // 09 — Financial Services
    FOOD_SECTOR,            // 10 — Food and Agriculture
    GOVERNMENT_SECTOR,      // 11 — Government Facilities
    HEALTHCARE_SECTOR,      // 12 — Healthcare and Public Health
    IT_SECTOR,              // 13 — Information Technology
    NUCLEAR_SECTOR,         // 14 — Nuclear Reactors, Materials, and Waste
    TRANSPORTATION_SECTOR,  // 15 — Transportation Systems
    WATER_SECTOR,           // 16 — Water and Wastewater Systems
];

/**
 * Returns a deep-cloned array of all 16 CISA sectors.
 *
 * @returns Array of `DexpiSector` objects.
 */
export function getAllSectors(): DexpiSector[] {
    return JSON.parse(JSON.stringify(SECTORS));
}

/**
 * Finds a sector by its short code.
 *
 * @param code - Sector code (e.g., "ENER", "WATR").
 * @returns The matching sector, or undefined.
 */
export function getSectorByCode(code: string): DexpiSector | undefined {
    return SECTORS.find((s) => s.code === code);
}

/**
 * Returns the total count of sub-sectors across all sectors.
 */
export function getTotalSubSectors(): number {
    return SECTORS.reduce((sum, s) => sum + s.subSectors.length, 0);
}

/**
 * Returns the total count of facility types across all sectors.
 */
export function getTotalFacilities(): number {
    return SECTORS.reduce(
        (sum, s) =>
            sum + s.subSectors.reduce((subSum, sub) => subSum + sub.facilities.length, 0),
        0,
    );
}

/**
 * Returns the total count of unique equipment component classes across all sectors.
 */
export function getTotalEquipmentTypes(): number {
    const classes = new Set<string>();
    for (const sector of SECTORS) {
        for (const sub of sector.subSectors) {
            for (const fac of sub.facilities) {
                for (const eq of fac.equipment) {
                    classes.add(eq.componentClass);
                }
            }
        }
    }
    return classes.size;
}

/**
 * Finds a sector by code. Alias for {@link getSectorByCode}.
 *
 * @param code - Sector code (e.g., "ENER", "WATR").
 * @returns The matching sector, or undefined.
 */
export function getSector(code: string): DexpiSector | undefined {
    return getSectorByCode(code);
}

/**
 * Finds a sub-sector by its code within a given sector.
 *
 * @param sectorCode - Parent sector code.
 * @param subSectorCode - Sub-sector code.
 * @returns The matching sub-sector, or undefined.
 */
export function getSubSector(
    sectorCode: string,
    subSectorCode: string,
): DexpiSubSector | undefined {
    const sector = getSectorByCode(sectorCode);
    if (!sector) return undefined;
    return sector.subSectors.find((s) => s.code === subSectorCode);
}

/**
 * Finds a facility type by its code, searching within a specific
 * sector/sub-sector scope.
 *
 * @param sectorCode - Parent sector code.
 * @param subSectorCode - Parent sub-sector code.
 * @param facilityCode - Facility type code.
 * @returns The matching facility, or undefined.
 */
export function getFacilityType(
    sectorCode: string,
    subSectorCode: string,
    facilityCode: string,
): DexpiFacilityType | undefined {
    const sub = getSubSector(sectorCode, subSectorCode);
    if (!sub) return undefined;
    return sub.facilities.find((f) => f.code === facilityCode);
}
