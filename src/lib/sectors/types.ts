/**
 * DEXPI 2.0 Sector Taxonomy Types.
 *
 * Type definitions for the 16 CISA Critical Infrastructure Sectors,
 * aligned to Presidential Policy Directive 21 (PPD-21) and the
 * DEXPI 2.0 equipment classification standard.
 *
 * References:
 *   - PPD-21: Presidential Policy Directive — Critical Infrastructure
 *     Security and Resilience (2013).
 *   - CISA (2024). Critical Infrastructure Sectors. Retrieved from
 *     https://www.cisa.gov/topics/critical-infrastructure-security-and-resilience/critical-infrastructure-sectors
 *   - DEXPI e.V. (2025). DEXPI 2.0 Specification. Retrieved from
 *     https://dexpi.org/specifications/
 *
 * @module sectors/types
 */

/** Equipment category aligned to ISO 10628 classification groups. */
export type EquipmentCategory =
    | 'rotating'
    | 'static'
    | 'heat-transfer'
    | 'instrumentation'
    | 'electrical'
    | 'piping';

/**
 * DEXPI equipment type definition with POSC Caesar RDL URI mapping.
 *
 * Each equipment type corresponds to a class in the DEXPI Equipment package,
 * inheriting from TaggedPlantItem → Equipment in the DEXPI UML model.
 */
export interface DexpiEquipmentType {
    /** DEXPI componentClass name (e.g., "CentrifugalPump"). */
    componentClass: string;
    /** POSC Caesar Reference Data Library URI for ISO 15926 Part 4 mapping. */
    componentClassURI: string;
    /** Human-readable display name. */
    displayName: string;
    /** ISO 10628 equipment category. */
    category: EquipmentCategory;
    /** Typical quantity range found in this facility type. */
    typicalQuantity: { min: number; max: number };
}

/**
 * Facility type within a sub-sector.
 *
 * Represents a specific type of industrial plant, site, or installation
 * within a CISA sub-sector classification.
 */
export interface DexpiFacilityType {
    /** Hierarchical facility code (e.g., "ENER-EL-CCGT"). */
    code: string;
    /** Facility type name. */
    name: string;
    /** Engineering description of the facility's purpose and operations. */
    description: string;
    /** DEXPI equipment types typically found in this facility. */
    equipment: DexpiEquipmentType[];
}

/**
 * Sub-sector within a CISA Critical Infrastructure Sector.
 *
 * Sub-sectors represent major industry segments as defined by CISA
 * Sector-Specific Plans and Sector Risk Management Agencies (SRMAs).
 */
export interface DexpiSubSector {
    /** Hierarchical sub-sector code (e.g., "ENER-EL"). */
    code: string;
    /** Sub-sector name. */
    name: string;
    /** Description of the sub-sector scope and operations. */
    description: string;
    /** Facility types within this sub-sector. */
    facilities: DexpiFacilityType[];
}

/**
 * CISA Critical Infrastructure Sector as defined by PPD-21.
 *
 * Each of the 16 sectors is designated by Presidential Policy Directive 21
 * with a corresponding Sector Risk Management Agency (SRMA) responsible
 * for sector-specific risk management, coordination, and resilience.
 */
export interface DexpiSector {
    /** Short uppercase sector code (e.g., "ENER"). */
    code: string;
    /** URL slug matching the wiki directory name (e.g., "energy"). */
    slug: string;
    /** Official PPD-21 sector name. */
    name: string;
    /** Lucide icon name for UI rendering. */
    icon: string;
    /** Sector description. */
    description: string;
    /** Theme color (hex). */
    color: string;
    /** Sector Risk Management Agency. */
    srma: string;
    /** Sub-sectors within this sector. */
    subSectors: DexpiSubSector[];
}
