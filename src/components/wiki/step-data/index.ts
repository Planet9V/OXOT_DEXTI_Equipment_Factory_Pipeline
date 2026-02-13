import { SectorSummary } from '../SectorStepViewer';
import { getChemicalSummary } from './chemical';
import { getCommercialSummary } from './commercial';
import { getCommunicationsSummary } from './communications';
import { getDamsSummary } from './dams';
import { getDefenseSummary } from './defense';
import { getEmergencySummary } from './emergency';
import { getEnergySummary } from './energy';
import { getFinancialSummary } from './financial';
import { getFoodSummary } from './food';
import { getGovernmentSummary } from './government';
import { getHealthcareSummary } from './healthcare';
import { getITSummary } from './it';
import { getManufacturingSummary } from './manufacturing';
import { getNuclearSummary } from './nuclear';
import { getTransportationSummary } from './transportation';
import { getWaterSummary } from './water';

/**
 * Registry of sector summary generators by sector code.
 */
const SUMMARY_MAP: Record<string, () => SectorSummary> = {
    CHEM: getChemicalSummary,
    COMM: getCommercialSummary,
    CMSN: getCommunicationsSummary,
    DAMS: getDamsSummary,
    DFNS: getDefenseSummary,
    EMRG: getEmergencySummary,
    ENER: getEnergySummary,
    FINS: getFinancialSummary,
    FOOD: getFoodSummary,
    GOVT: getGovernmentSummary,
    HLTH: getHealthcareSummary,
    ITSC: getITSummary,
    MNFG: getManufacturingSummary,
    NUCL: getNuclearSummary,
    TRNS: getTransportationSummary,
    WATR: getWaterSummary,
};

/**
 * Returns the architecture summary for a given sector code.
 *
 * @param code - Sector code (e.g., 'ENER').
 * @returns SectorSummary if found, otherwise undefined.
 */
export function getSectorSummary(code: string): SectorSummary | undefined {
    const generator = SUMMARY_MAP[code];
    if (!generator) return undefined;
    return generator();
}
