/**
 * Sector Data — Re-export Facade.
 *
 * This file re-exports the full sector taxonomy from the modular
 * `sectors/` directory structure for backward compatibility with
 * existing imports throughout the application.
 *
 * @module sectors-data
 * @deprecated Import directly from '@/lib/sectors' instead.
 */

export {
  SECTORS,
  getAllSectors,
  getSectorByCode,
  getSector,
  getSubSector,
  getFacilityType,
  getTotalSubSectors,
  getTotalFacilities,
  getTotalEquipmentTypes,
} from './sectors/index';

export type {
  DexpiSector,
  DexpiSubSector,
  DexpiFacilityType,
  DexpiEquipmentType,
  EquipmentCategory,
} from './sectors/types';
