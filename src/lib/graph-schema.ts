/**
 * DEXPI 2.0 Knowledge Graph Schema for Memgraph.
 *
 * Defines the graph schema aligned to the DEXPI 2.0 specification, including
 * multi-label nodes, typed relationships, constraint indexes, and seed data.
 * The schema follows the DEXPI equipment hierarchy: TaggedPlantItem → Equipment,
 * with POSC Caesar RDL URI mappings and ISO 15926 alignment.
 *
 * @module graph-schema
 */
import neo4j from 'neo4j-driver';

import crypto from 'crypto';
import { runQuery, runWrite, runBatchWrite } from './memgraph';
import { getAllSectors } from './sectors';
import type { DexpiSector, DexpiEquipmentType } from './sectors/types';

export { runQuery, runWrite, runBatchWrite };

// =============================================================================
// Schema Constants
// =============================================================================

/** DEXPI equipment categories aligned to ISO 10628 groups. */
export const EQUIPMENT_CATEGORIES = [
    'rotating',
    'static',
    'heat-transfer',
    'instrumentation',
    'electrical',
    'piping',
] as const;

export type EquipmentCategory = (typeof EQUIPMENT_CATEGORIES)[number];

/** Core DEXPI 2.0 relationship types. */
export const RELATIONSHIP_TYPES = [
    'HAS_SUBSECTOR',
    'HAS_FACILITY',
    'CONTAINS_EQUIPMENT',
    'HAS_NOZZLE',
    'HAS_SPECIFICATION',
    'MADE_OF',
    'CONFORMS_TO',
    'MANUFACTURED_BY',
    'CONNECTS_TO',
    'UPSTREAM_OF',
    'DOWNSTREAM_OF',
    'GENERATED_BY_PIPELINE',
    'HAS_VENDOR_VARIATION',
    'BELONGS_TO_SECTOR',
    'PART_OF',
] as const;

// =============================================================================
// Schema Initialization
// =============================================================================

/**
 * Creates constraint indexes for optimal query performance.
 *
 * Memgraph supports unique constraints and label+property indexes.
 * These are idempotent — safe to run on every startup.
 */
export async function createIndexes(): Promise<void> {
    const indexes = [
        'CREATE INDEX ON :Sector(code)',
        'CREATE INDEX ON :SubSector(code)',
        'CREATE INDEX ON :Facility(code)',
        'CREATE INDEX ON :Equipment(tag)',
        'CREATE INDEX ON :Equipment(componentClass)',
        'CREATE INDEX ON :Nozzle(id)',
        'CREATE INDEX ON :Manufacturer(name)',
        'CREATE INDEX ON :Standard(code)',
        'CREATE INDEX ON :Material(name)',
        'CREATE INDEX ON :WikiPage(slug)',
        'CREATE INDEX ON :PipelineRun(id)',
        'CREATE INDEX ON :VendorVariation(id)',
        // Composite indexes for hierarchical queries and faceted search
        'CREATE INDEX ON :Equipment(facilityCode, tag)',
        'CREATE INDEX ON :Equipment(category, validationScore)',
    ];

    for (const idx of indexes) {
        try {
            await runWrite(idx);
        } catch (err: unknown) {
            // Index may already exist — this is fine
            const msg = err instanceof Error ? err.message : String(err);
            if (!msg.includes('already exists') && !msg.includes('already exist')) {
                console.error(`[graph-schema] Index creation warning: ${msg}`);
            }
        }
    }
    console.log('[graph-schema] Indexes ensured.');
}

/**
 * Initializes the full DEXPI 2.0 graph schema in Memgraph.
 *
 * Creates indexes, then seeds the complete sector hierarchy (16 sectors,
 * 68 sub-sectors, 74 facilities) and all equipment definitions from the
 * static sectors data module. This is idempotent — uses MERGE to avoid
 * duplicates. Safe to call on every startup.
 */
export async function initializeSchema(): Promise<void> {
    await createIndexes();
    const seeded = await seedSectorHierarchy();
    if (seeded) {
        console.log('[graph-schema] Schema initialization complete — graph seeded.');
    } else {
        console.log('[graph-schema] Schema initialization complete — indexes only (Memgraph may be offline).');
    }
}

/**
 * Seeds the full CISA sector hierarchy into Memgraph.
 *
 * Iterates through all 16 sectors → sub-sectors → facilities and creates
 * the complete node + relationship structure. Equipment definitions from
 * each facility are batch-merged for efficiency.
 *
 * All operations use MERGE so this is idempotent — safe to call on every startup.
 *
 * @returns True if seeding succeeded, false if Memgraph is unavailable.
 */
export async function seedSectorHierarchy(): Promise<boolean> {
    try {
        const sectors = getAllSectors();
        let sectorCount = 0;
        let subSectorCount = 0;
        let facilityCount = 0;
        let equipmentCount = 0;

        for (const sector of sectors) {
            await mergeSector({
                code: sector.code,
                name: sector.name,
                icon: sector.icon,
                description: sector.description,
                color: sector.color,
                srma: sector.srma,
            });
            sectorCount++;

            for (const sub of sector.subSectors) {
                await mergeSubSector(sector.code, {
                    code: sub.code,
                    name: sub.name,
                    description: sub.description,
                });
                subSectorCount++;

                for (const fac of sub.facilities) {
                    await mergeFacility(sub.code, {
                        code: fac.code,
                        name: fac.name,
                        description: fac.description,
                    });
                    facilityCount++;

                    // Seed equipment for this facility
                    for (const eq of fac.equipment) {
                        const tag = generateEquipmentTag(eq, fac.code);
                        await mergeEquipment(fac.code, {
                            tag,
                            componentClass: eq.componentClass,
                            componentClassURI: eq.componentClassURI,
                            displayName: eq.displayName,
                            category: eq.category,
                            description: `${eq.displayName} — ${eq.componentClass} equipment for ${fac.name}`,
                            sector: sector.code,
                            subSector: sub.code,
                            metadata: { source: 'seed', validationScore: 85 },
                        });
                        equipmentCount++;
                    }
                }
            }
        }

        // Seed a SchemaVersion node for tracking
        await runWrite(
            `MERGE (v:SchemaVersion {id: 'dexpi'})
             SET v.version = '4.2.0',
                 v.standard = 'DEXPI 2.0',
                 v.alignment = 'POSC Caesar RDL + ISO 15926',
                 v.sectors = $sectorCount,
                 v.subSectors = $subSectorCount,
                 v.facilities = $facilityCount,
                 v.equipment = $equipmentCount,
                 v.updatedAt = timestamp()`,
            { sectorCount, subSectorCount, facilityCount, equipmentCount },
        );

        console.log(
            `[graph-schema] Seeded ${sectorCount} sectors, ${subSectorCount} sub-sectors, ` +
            `${facilityCount} facilities, ${equipmentCount} equipment items.`,
        );
        return true;
    } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(`[graph-schema] Seed failed (Memgraph may be offline): ${msg}`);
        return false;
    }
}

/**
 * ISA/DEXPI tag prefix mapping — authoritative source.
 *
 * This map MUST stay in sync with ISA_TAG_PREFIX in pipeline.ts.
 * The seed system and pipeline system must produce identical tags for the
 * same (componentClass, facilityCode) pair to ensure MERGE deduplication.
 *
 * Includes both legacy names and official DEXPI 2.0 ComponentClass names.
 */
const ISA_SEED_TAG_PREFIX: Record<string, string> = {
    // Rotating equipment
    Pump: 'P', CentrifugalPump: 'P', Compressor: 'C', CentrifugalCompressor: 'C',
    Turbine: 'T', SteamTurbine: 'ST', GasTurbine: 'GT', Fan: 'FN', Blower: 'BL',
    Agitator: 'AG', Centrifuge: 'CF', Conveyor: 'CNV', Mixer: 'MX',

    // Static equipment
    PressureVessel: 'V', Vessel: 'V', Tank: 'TK', StorageTank: 'TK',
    Column: 'COL', ProcessColumn: 'COL', Reactor: 'R', Drum: 'D',
    Separator: 'SEP', Filter: 'FL', Scrubber: 'SCR', Silo: 'SI',
    Thickener: 'TH', Clarifier: 'CL', Autoclave: 'AC',
    Hopper: 'HOP', Bin: 'BIN',

    // Heat transfer
    HeatExchanger: 'E', ShellTubeHeatExchanger: 'E', ShellAndTubeHeatExchanger: 'E',
    AirCooledHeatExchanger: 'E',
    Boiler: 'BLR', Furnace: 'H', Heater: 'H', Condenser: 'CND', Cooler: 'CLR',
    Evaporator: 'EV', CoolingTower: 'CT', Dryer: 'DR', Deaerator: 'DA', Kiln: 'KN',

    // Electrical
    Generator: 'G', ElectricGenerator: 'G', Motor: 'M', Transformer: 'XF',
    Switchgear: 'SWG', CircuitBreaker: 'CB', UPS: 'UPS', VFD: 'VFD',
    Electrolyzer: 'EL',

    // Piping
    ControlValve: 'CV', ShutoffValve: 'XV', SafetyValve: 'PSV', GateValve: 'GV',
    CheckValve: 'CKV',
    Pipe: 'PIPE', FlareStack: 'FLR', Strainer: 'STR', Cyclone: 'CY',
    Nozzle: 'NZ',

    // Instrumentation
    Transmitter: 'TT', Analyzer: 'AT', FlowMeter: 'FE', GasAnalyzer: 'AT',
    LevelIndicator: 'LI',
};

/**
 * Generates a unique, deterministic ISA-standard equipment tag.
 *
 * Uses the ISA_SEED_TAG_PREFIX map (synchronized with pipeline.ts ISA_TAG_PREFIX)
 * to ensure seed tags and pipeline-generated tags use the same prefix for the
 * same componentClass. This prevents duplicate equipment nodes from MERGE mismatches.
 *
 * @param eq - Equipment type definition.
 * @param facilityCode - Parent facility code.
 * @returns A unique tag like "P-347" per equipment type per facility.
 */
function generateEquipmentTag(eq: DexpiEquipmentType, facilityCode: string): string {
    // Use ISA prefix if available, otherwise create unique abbreviation from componentClass
    const prefix = ISA_SEED_TAG_PREFIX[eq.componentClass]
        || eq.componentClass.replace(/[a-z]/g, '').substring(0, 4)
        || eq.componentClass.substring(0, 3).toUpperCase();
    // Create a deterministic numeric suffix from full componentClass + facilityCode
    const hash = Array.from(facilityCode + '::' + eq.componentClass)
        .reduce((sum, ch, i) => sum + ch.charCodeAt(0) * (i + 1), 0);
    const num = String((hash % 900) + 100);
    return `${prefix}-${num}`;
}

// =============================================================================
// Sector Graph Operations
// =============================================================================

/**
 * Merges a Sector node into the graph with multiple labels.
 *
 * @param sector - Sector data object.
 */
export async function mergeSector(sector: {
    code: string;
    name: string;
    icon: string;
    description: string;
    color: string;
    srma?: string;
}): Promise<void> {
    await runWrite(
        `MERGE (s:Sector:CriticalInfrastructure {code: $code})
     SET s.name = $name,
         s.icon = $icon,
         s.description = $description,
         s.color = $color,
         s.srma = $srma,
         s.updatedAt = timestamp()`,
        sector,
    );
}

/**
 * Deletes a Sector and all its descendants (SubSectors, Facilities, Equipment).
 *
 * @param code - Sector code.
 */
export async function deleteSectorNode(code: string): Promise<void> {
    await runWrite(
        `MATCH (s:Sector {code: $code})
         OPTIONAL MATCH (s)-[:HAS_SUBSECTOR]->(sub)
         OPTIONAL MATCH (sub)-[:HAS_FACILITY]->(f)
         OPTIONAL MATCH (f)-[:CONTAINS_EQUIPMENT]->(e)
         OPTIONAL MATCH (e)-[:HAS_NOZZLE|HAS_VENDOR_VARIATION]->(child)
         DETACH DELETE s, sub, f, e, child`,
        { code },
    );
}

/**
 * Merges a SubSector node and links it to its parent Sector.
 *
 * @param sectorCode - Parent sector code.
 * @param subSector - SubSector data object.
 */
export async function mergeSubSector(
    sectorCode: string,
    subSector: {
        code: string;
        name: string;
        description: string;
    },
): Promise<void> {
    await runWrite(
        `MATCH (s:Sector {code: $sectorCode})
     MERGE (sub:SubSector:IndustrySegment {code: $code})
     SET sub.name = $name,
         sub.description = $description,
         sub.updatedAt = timestamp()
     MERGE (s)-[:HAS_SUBSECTOR]->(sub)`,
        { sectorCode, ...subSector },
    );
}

/**
 * Deletes a SubSector and its descendants.
 */
export async function deleteSubSectorNode(code: string): Promise<void> {
    await runWrite(
        `MATCH (sub:SubSector {code: $code})
         OPTIONAL MATCH (sub)-[:HAS_FACILITY]->(f)
         OPTIONAL MATCH (f)-[:CONTAINS_EQUIPMENT]->(e)
         DETACH DELETE sub, f, e`,
        { code },
    );
}

/**
 * Merges a Facility node and links it to its parent SubSector.
 *
 * @param subSectorCode - Parent sub-sector code.
 * @param facility - Facility data object.
 */
export async function mergeFacility(
    subSectorCode: string,
    facility: {
        code: string;
        name: string;
        description: string;
    },
): Promise<void> {
    await runWrite(
        `MATCH (sub:SubSector {code: $subSectorCode})
     MERGE (f:Facility:PlantSite {code: $code})
     SET f.name = $name,
         f.description = $description,
         f.updatedAt = timestamp()
     MERGE (sub)-[:HAS_FACILITY]->(f)`,
        { subSectorCode, ...facility },
    );
}

/**
 * Deletes a Facility and its equipment.
 */
export async function deleteFacilityNode(code: string): Promise<void> {
    await runWrite(
        `MATCH (f:Facility {code: $code})
         OPTIONAL MATCH (f)-[:CONTAINS_EQUIPMENT]->(e)
         DETACH DELETE f, e`,
        { code },
    );
}

/**
 * Merges an Equipment node into the graph with DEXPI 2.0 multi-label structure.
 *
 * Equipment nodes carry the labels :Equipment:TaggedPlantItem and are linked to
 * their parent Facility, plus any associated Nozzles, Materials, Standards, etc.
 *
 * @param facilityCode - Parent facility code.
 * @param equipment - Equipment data aligned to DEXPI EquipmentCard.
 */
export async function mergeEquipment(
    facilityCode: string,
    equipment: {
        tag: string;
        componentClass: string;
        componentClassURI: string;
        displayName: string;
        category: string;
        description?: string;
        id?: string;
        sector?: string;
        subSector?: string;
        metadata?: any;
        specifications?: any;
        operatingConditions?: any;
        materials?: any;
        standards?: string[];
        manufacturers?: string[];
    },
): Promise<void> {
    // We store the full card as a serialized JSON property for easy retrieval, 
    // while also extracting key fields for graph traversal.
    const cardJson = JSON.stringify(equipment);

    const records = await runQuery(
        `MATCH (f:Facility {code: $facilityCode})
     MERGE (e:Equipment:TaggedPlantItem {tag: $tag, facilityCode: $facilityCode})
     SET e.componentClass = $componentClass,
         e.componentClassURI = $componentClassURI,
         e.displayName = $displayName,
         e.category = $category,
         e.description = $description,
         e.source = $source,
         e.validationScore = $validationScore,
         e.card = $cardJson,
         e.updatedAt = timestamp()
     MERGE (f)-[:CONTAINS_EQUIPMENT]->(e)
     RETURN f.code AS matched`,
        {
            facilityCode,
            ...equipment,
            source: equipment.metadata?.source || 'manual',
            validationScore: equipment.metadata?.validationScore || 0,
            cardJson
        },
    );

    if (records.length === 0) {
        console.warn(
            `[graph-schema] mergeEquipment skipped: Facility '${facilityCode}' not found. ` +
            `Equipment '${equipment.tag}' was NOT created.`,
        );
    }
}

/**
 * Retrieves a single Equipment card by tag and facility.
 */
export async function getEquipmentNode(tag: string, facilityCode: string): Promise<any | null> {
    const records = await runQuery(
        `MATCH (e:Equipment {tag: $tag, facilityCode: $facilityCode})
         RETURN e.card AS card`,
        { tag, facilityCode },
    );
    if (records.length === 0) return null;
    try {
        return JSON.parse(records[0].get('card'));
    } catch {
        console.error(`[graph-schema] Corrupted card JSON for tag=${tag}, facility=${facilityCode}`);
        return null;
    }
}

/**
 * Lists all equipment cards in a facility.
 */
export async function listEquipmentNodes(facilityCode: string): Promise<any[]> {
    const records = await runQuery(
        `MATCH (f:Facility {code: $facilityCode})-[:CONTAINS_EQUIPMENT]->(e:Equipment)
         RETURN e.card AS card`,
        { facilityCode },
    );
    return records
        .map(r => {
            try {
                return JSON.parse(r.get('card'));
            } catch {
                console.error(`[graph-schema] Corrupted card JSON in facility=${facilityCode}`);
                return null;
            }
        })
        .filter(Boolean);
}

/**
 * Deletes an equipment node and its child components (nozzles, etc.).
 */
export async function deleteEquipmentNode(tag: string, facilityCode: string): Promise<void> {
    await runWrite(
        `MATCH (e:Equipment {tag: $tag, facilityCode: $facilityCode})
         OPTIONAL MATCH (e)-[:HAS_NOZZLE|HAS_VENDOR_VARIATION]->(child)
         DETACH DELETE e, child`,
        { tag, facilityCode },
    );
}

// =============================================================================
// Standalone Equipment Operations (Equipment-First Architecture)
// =============================================================================

/**
 * Creates a standalone Equipment node with a UUID primary key.
 *
 * Equipment exists independently — no Facility parent required.
 * Use `assignEquipmentToFacility` to optionally group equipment.
 *
 * @param equipment - DEXPI 2.0 equipment data.
 * @returns The created equipment ID.
 */
export async function createEquipmentStandalone(
    equipment: {
        id?: string;
        tag: string;
        componentClass: string;
        componentClassURI: string;
        displayName: string;
        category: string;
        description?: string;
        sector?: string;
        subSector?: string;
        facility?: string;
        metadata?: any;
        specifications?: any;
        operatingConditions?: any;
        materials?: any;
        standards?: string[];
        manufacturers?: string[];
    },
): Promise<string> {
    const id = equipment.id || crypto.randomUUID();
    const cardJson = JSON.stringify({ ...equipment, id });

    await runWrite(
        `MERGE (e:Equipment:TaggedPlantItem {id: $id})
         SET e.tag = $tag,
             e.componentClass = $componentClass,
             e.componentClassURI = $componentClassURI,
             e.displayName = $displayName,
             e.category = $category,
             e.description = $description,
             e.sector = $sector,
             e.subSector = $subSector,
             e.source = $source,
             e.validationScore = $validationScore,
             e.card = $cardJson,
             e.createdAt = COALESCE(e.createdAt, timestamp()),
             e.updatedAt = timestamp()`,
        {
            id,
            tag: equipment.tag,
            componentClass: equipment.componentClass,
            componentClassURI: equipment.componentClassURI,
            displayName: equipment.displayName,
            category: equipment.category,
            description: equipment.description || '',
            sector: equipment.sector || '',
            subSector: equipment.subSector || '',
            source: equipment.metadata?.source || 'manual',
            validationScore: equipment.metadata?.validationScore || 0,
            cardJson,
        },
    );

    // If a facility was specified, also create the assignment
    if (equipment.facility) {
        await assignEquipmentToFacility(id, equipment.facility);
    }

    return id;
}

/**
 * Retrieves an Equipment node by its UUID.
 *
 * @param id - Equipment UUID.
 * @returns Parsed equipment card with assignment info, or null.
 */
export async function getEquipmentById(id: string): Promise<any | null> {
    const records = await runQuery(
        `MATCH (e:Equipment {id: $id})
         OPTIONAL MATCH (e)-[:ASSIGNED_TO]->(f:Facility)
         RETURN e.card AS card, collect(f.code) AS facilities`,
        { id },
    );
    if (records.length === 0) return null;
    try {
        const card = JSON.parse(records[0].get('card'));
        card.assignments = records[0].get('facilities') || [];
        return card;
    } catch {
        console.error(`[graph-schema] Corrupted card JSON for id=${id}`);
        return null;
    }
}

/**
 * Updates an existing Equipment node's properties.
 *
 * @param id - Equipment UUID.
 * @param updates - Partial equipment data to update.
 * @returns True if equipment was found and updated.
 */
export async function updateEquipmentNode(
    id: string,
    updates: Record<string, any>,
): Promise<boolean> {
    // Build the current card, merge updates, and re-serialize
    const existing = await getEquipmentById(id);
    if (!existing) return false;

    const merged = { ...existing, ...updates, id };
    delete merged.assignments; // Don't store assignments in the card JSON
    const cardJson = JSON.stringify(merged);

    // Build dynamic SET clauses for indexed properties
    await runWrite(
        `MATCH (e:Equipment {id: $id})
         SET e.tag = $tag,
             e.componentClass = $componentClass,
             e.componentClassURI = $componentClassURI,
             e.displayName = $displayName,
             e.category = $category,
             e.description = $description,
             e.sector = $sector,
             e.subSector = $subSector,
             e.source = $source,
             e.validationScore = $validationScore,
             e.card = $cardJson,
             e.updatedAt = timestamp()`,
        {
            id,
            tag: merged.tag || '',
            componentClass: merged.componentClass || '',
            componentClassURI: merged.componentClassURI || '',
            displayName: merged.displayName || '',
            category: merged.category || '',
            description: merged.description || '',
            sector: merged.sector || '',
            subSector: merged.subSector || '',
            source: merged.metadata?.source || 'manual',
            validationScore: merged.metadata?.validationScore || 0,
            cardJson,
        },
    );
    return true;
}

/**
 * Deletes an Equipment node by UUID and all its child components.
 *
 * @param id - Equipment UUID.
 */
export async function deleteEquipmentById(id: string): Promise<void> {
    await runWrite(
        `MATCH (e:Equipment {id: $id})
         OPTIONAL MATCH (e)-[:HAS_NOZZLE|HAS_VENDOR_VARIATION]->(child)
         DETACH DELETE e, child`,
        { id },
    );
}

/**
 * Assigns an Equipment node to a Facility via an ASSIGNED_TO relationship.
 *
 * Equipment can be assigned to multiple facilities (many-to-many).
 * Uses MERGE so assigning twice is idempotent.
 *
 * @param equipmentId - Equipment UUID.
 * @param facilityCode - Facility code.
 * @returns True if both nodes exist and the assignment was created.
 */
export async function assignEquipmentToFacility(
    equipmentId: string,
    facilityCode: string,
): Promise<boolean> {
    const summary = await runWrite(
        `MATCH (e:Equipment {id: $equipmentId})
         MATCH (f:Facility {code: $facilityCode})
         MERGE (e)-[:ASSIGNED_TO]->(f)
         RETURN e.id AS eid`,
        { equipmentId, facilityCode },
    );
    const counters = summary.counters?.updates?.() ?? {};
    const created = (counters as Record<string, number>).relationshipsCreated ?? 0;
    if (created === 0) {
        console.warn(
            `[graph-schema] assignEquipment failed: Equipment '${equipmentId}' or ` +
            `Facility '${facilityCode}' not found.`,
        );
        return false;
    }
    return true;
}

/**
 * Removes the ASSIGNED_TO relationship between equipment and a facility.
 *
 * Does NOT delete either node — only the relationship.
 *
 * @param equipmentId - Equipment UUID.
 * @param facilityCode - Facility code.
 * @returns True if the relationship existed and was removed.
 */
export async function removeEquipmentFromFacility(
    equipmentId: string,
    facilityCode: string,
): Promise<boolean> {
    const summary = await runWrite(
        `MATCH (e:Equipment {id: $equipmentId})-[r:ASSIGNED_TO]->(f:Facility {code: $facilityCode})
         DELETE r
         RETURN e.id AS eid`,
        { equipmentId, facilityCode },
    );
    const counters = summary.counters?.updates?.() ?? {};
    return ((counters as Record<string, number>).relationshipsDeleted ?? 0) > 0;
}

/**
 * Lists all equipment, optionally filtered by assignment status.
 *
 * @param unassignedOnly - If true, only returns equipment not assigned to any facility.
 * @returns Array of equipment cards.
 */
export async function listAllEquipment(unassignedOnly = false): Promise<any[]> {
    const query = unassignedOnly
        ? `MATCH (e:Equipment)
           WHERE NOT (e)-[:ASSIGNED_TO]->(:Facility)
           RETURN e.card AS card
           ORDER BY e.updatedAt DESC`
        : `MATCH (e:Equipment)
           RETURN e.card AS card
           ORDER BY e.updatedAt DESC`;

    const records = await runQuery(query, {});
    return records
        .map(r => {
            try {
                return JSON.parse(r.get('card'));
            } catch {
                return null;
            }
        })
        .filter(Boolean);
}

/**
 * Merges a Nozzle node and links it to its parent Equipment.
 *
 * @param equipmentTag - Parent equipment tag.
 * @param facilityCode - Parent facility code.
 * @param nozzle - Nozzle specification data.
 */
export async function mergeNozzle(
    equipmentTag: string,
    facilityCode: string,
    nozzle: {
        id: string;
        size: string;
        rating: string;
        facing: string;
        service: string;
    },
): Promise<void> {
    await runWrite(
        `MATCH (e:Equipment {tag: $equipmentTag, facilityCode: $facilityCode})
     MERGE (n:Nozzle:Connection {id: $nozzleId, equipmentTag: $equipmentTag})
     SET n.size = $size,
         n.rating = $rating,
         n.facing = $facing,
         n.service = $service
     MERGE (e)-[:HAS_NOZZLE]->(n)`,
        {
            equipmentTag,
            facilityCode,
            nozzleId: nozzle.id,
            size: nozzle.size,
            rating: nozzle.rating,
            facing: nozzle.facing,
            service: nozzle.service,
        },
    );
}

/**
 * Links an Equipment node to a Material node.
 *
 * @param equipmentTag - Equipment tag.
 * @param facilityCode - Facility code.
 * @param materialName - Material name (e.g., "316L Stainless Steel").
 * @param usage - Usage role (e.g., "body", "internals", "gaskets").
 */
export async function mergeEquipmentMaterial(
    equipmentTag: string,
    facilityCode: string,
    materialName: string,
    usage: string,
): Promise<void> {
    await runWrite(
        `MATCH (e:Equipment {tag: $equipmentTag, facilityCode: $facilityCode})
     MERGE (m:Material:Substance {name: $materialName})
     MERGE (e)-[:MADE_OF {usage: $usage}]->(m)`,
        { equipmentTag, facilityCode, materialName, usage },
    );
}

/**
 * Links Equipment to a Standard reference (ISO, API, IEC, etc.).
 *
 * @param equipmentTag - Equipment tag.
 * @param facilityCode - Facility code.
 * @param standardCode - Standard code (e.g., "API 610").
 */
export async function mergeEquipmentStandard(
    equipmentTag: string,
    facilityCode: string,
    standardCode: string,
): Promise<void> {
    await runWrite(
        `MATCH (e:Equipment {tag: $equipmentTag, facilityCode: $facilityCode})
     MERGE (st:Standard:Reference {code: $standardCode})
     MERGE (e)-[:CONFORMS_TO]->(st)`,
        { equipmentTag, facilityCode, standardCode },
    );
}

// =============================================================================
// Vendor Variation Graph Operations
// =============================================================================

/**
 * Merges a Vendor Variation node and links it to base Equipment.
 */
export async function mergeVendorVariationNode(
    tag: string,
    facilityCode: string,
    variation: any,
): Promise<void> {
    const variationJson = JSON.stringify(variation);
    await runWrite(
        `MATCH (e:Equipment {tag: $tag, facilityCode: $facilityCode})
         MERGE (v:VendorVariation {id: $variationId})
         SET v.manufacturer = $manufacturer,
             v.model = $model,
             v.card = $variationJson,
             v.updatedAt = timestamp()
         MERGE (e)-[:HAS_VENDOR_VARIATION]->(v)`,
        {
            tag,
            facilityCode,
            variationId: variation.id,
            manufacturer: variation.manufacturer,
            model: variation.model,
            variationJson,
        },
    );
}

/**
 * Lists vendor variations for a specific piece of equipment.
 */
export async function listVendorVariationNodes(tag: string, facilityCode: string): Promise<any[]> {
    const records = await runQuery(
        `MATCH (e:Equipment {tag: $tag, facilityCode: $facilityCode})-[:HAS_VENDOR_VARIATION]->(v:VendorVariation)
         RETURN v.card AS card`,
        { tag, facilityCode },
    );
    return records.map(r => JSON.parse(r.get('card')));
}

// =============================================================================
// Pipeline Run Graph Operations
// =============================================================================

/**
 * Merges a PipelineRun node.
 */
export async function mergePipelineRunNode(run: any): Promise<void> {
    const runJson = JSON.stringify(run);
    await runWrite(
        `MERGE (p:PipelineRun {id: $id})
         SET p.status = $status,
             p.createdAt = $createdAt,
             p.sector = $sector,
             p.facility = $facility,
             p.data = $runJson,
             p.updatedAt = timestamp()`,
        {
            id: run.id,
            status: run.status,
            createdAt: run.createdAt,
            sector: run.sector,
            facility: run.facility,
            runJson,
        },
    );
}

/**
 * Retrieves a pipeline run by ID.
 */
export async function getPipelineRunNode(id: string): Promise<any | null> {
    const records = await runQuery(
        `MATCH (p:PipelineRun {id: $id})
         RETURN p.data AS data`,
        { id },
    );
    if (records.length === 0) return null;
    return JSON.parse(records[0].get('data'));
}

/**
 * Lists all pipeline runs, sorted by creation date (desc).
 */
export async function listPipelineRunNodes(): Promise<any[]> {
    const records = await runQuery(
        `MATCH (p:PipelineRun)
         RETURN p.data AS data
         ORDER BY p.createdAt DESC`,
    );
    return records.map(r => JSON.parse(r.get('data')));
}

// =============================================================================
// Search Graph Operations
// =============================================================================

/**
 * Performs a faceted search for Equipment nodes.
 *
 * @param filter - Search criteria.
 * @param page - Page number (1-based).
 * @param pageSize - Items per page.
 */
export async function searchEquipmentNodes(
    filter: any,
    page = 1,
    pageSize = 50,
): Promise<{ items: any[]; total: number }> {
    const skip = Math.max(0, Math.floor((page - 1) * pageSize));
    const params: any = { skip: neo4j.int(skip), limit: neo4j.int(Math.floor(pageSize)) };
    const whereClauses: string[] = [];

    // Base Pattern — match standalone equipment or equipment linked to facilities
    let matchPattern = '(e:Equipment)';
    let usesHierarchy = false;

    // Hierarchical Filters
    if (filter.sector || filter.subSector || filter.facility) {
        usesHierarchy = true;
        matchPattern = '(s:Sector)-[:HAS_SUBSECTOR]->(sub:SubSector)-[:HAS_FACILITY]->(f:Facility)-[:CONTAINS_EQUIPMENT]->(e:Equipment)';
        // Note: also handle ASSIGNED_TO via UNION-like approach or WHERE in the future
        // For now, CONTAINS_EQUIPMENT covers the primary use case
        if (filter.sector) {
            whereClauses.push('s.code = $sector');
            params.sector = filter.sector.toUpperCase();
        }
        if (filter.subSector) {
            whereClauses.push('sub.code = $subSector');
            params.subSector = filter.subSector.toUpperCase();
        }
        if (filter.facility) {
            whereClauses.push('f.code = $facility');
            params.facility = filter.facility.toUpperCase();
        }
    }

    // Attribute Filters
    if (filter.category) {
        whereClauses.push('e.category = $category');
        params.category = filter.category;
    }
    if (filter.componentClass) {
        whereClauses.push('e.componentClass = $componentClass');
        params.componentClass = filter.componentClass;
    }
    if (filter.source) {
        whereClauses.push('e.source = $source');
        params.source = filter.source;
    }
    if (filter.minValidationScore) {
        whereClauses.push('e.validationScore >= $minScore');
        params.minScore = filter.minValidationScore;
    }

    // Keyword Search
    if (filter.searchTerm) {
        whereClauses.push('(toLower(e.tag) CONTAINS toLower($term) OR toLower(e.displayName) CONTAINS toLower($term) OR toLower(e.description) CONTAINS toLower($term))');
        params.term = filter.searchTerm;
    }

    const whereStr = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

    // --- Count query (Memgraph doesn't support OVER() window functions) ---
    const countQuery = `
        MATCH ${matchPattern}
        ${whereStr}
        RETURN count(e) AS total
    `;
    const countRecords = await runQuery(countQuery, params);
    const total = countRecords.length > 0
        ? (typeof countRecords[0].get('total') === 'object'
            ? (countRecords[0].get('total') as any).toNumber()
            : Number(countRecords[0].get('total')))
        : 0;

    // --- Paginated results query ---
    const dataQuery = `
        MATCH ${matchPattern}
        ${whereStr}
        RETURN e.card AS card
        ORDER BY e.tag ASC
        SKIP $skip LIMIT $limit
    `;
    const records = await runQuery(dataQuery, params);
    const items = records.map(r => {
        try { return JSON.parse(r.get('card')); } catch { return null; }
    }).filter(Boolean);

    return { items, total };
}

// =============================================================================
// Wiki Page Graph Operations
// =============================================================================

/**
 * Merges a WikiPage node into the graph for the internal wiki system.
 *
 * @param page - Wiki page data.
 */
export async function mergeWikiPage(page: {
    slug: string;
    title: string;
    section: string;
    level: number;
    parentSlug?: string;
    content?: string;
}): Promise<void> {
    await runWrite(
        `MERGE (w:WikiPage {slug: $slug})
     SET w.title = $title,
         w.section = $section,
         w.level = $level,
         w.updatedAt = timestamp()`,
        page,
    );

    if (page.parentSlug) {
        await runWrite(
            `MATCH (parent:WikiPage {slug: $parentSlug})
       MATCH (child:WikiPage {slug: $slug})
       MERGE (parent)-[:HAS_CHILD]->(child)
       MERGE (child)-[:CHILD_OF]->(parent)`,
            { parentSlug: page.parentSlug, slug: page.slug },
        );
    }
}

/**
 * Creates a backlink relationship between two wiki pages.
 *
 * @param fromSlug - Source page slug.
 * @param toSlug - Target page slug.
 */
export async function addWikiBacklink(
    fromSlug: string,
    toSlug: string,
): Promise<void> {
    await runWrite(
        `MATCH (a:WikiPage {slug: $fromSlug})
     MATCH (b:WikiPage {slug: $toSlug})
     MERGE (a)-[:LINKS_TO]->(b)`,
        { fromSlug, toSlug },
    );
}

/**
 * Retrieves all backlinks pointing to a wiki page.
 *
 * @param slug - The target page slug.
 * @returns Array of page slugs that link to the given page.
 */
export async function getWikiBacklinks(slug: string): Promise<string[]> {
    const records = await runQuery(
        `MATCH (source:WikiPage)-[:LINKS_TO]->(target:WikiPage {slug: $slug})
     RETURN source.slug AS slug, source.title AS title`,
        { slug },
    );
    return records.map((r) => r.get('slug'));
}

// =============================================================================
// Query Helpers
// =============================================================================

/**
 * Returns the full sector → subsector → facility → equipment tree from the graph.
 *
 * @returns Nested tree structure.
 */
export async function getGraphTree() {
    const records = await runQuery(
        `MATCH (s:Sector)-[:HAS_SUBSECTOR]->(sub:SubSector)-[:HAS_FACILITY]->(f:Facility)
     OPTIONAL MATCH (f)-[:CONTAINS_EQUIPMENT]->(e1:Equipment)
     OPTIONAL MATCH (f)<-[:ASSIGNED_TO]-(e2:Equipment)
     WITH s, sub, f,
          count(DISTINCT e1) + count(DISTINCT e2) AS equipmentCount
     RETURN s.code AS sector, s.name AS sectorName,
            sub.code AS subSector, sub.name AS subSectorName,
            f.code AS facility, f.name AS facilityName,
            equipmentCount
     ORDER BY s.code, sub.code, f.code`,
    );

    return records.map((r) => ({
        sector: r.get('sector'),
        sectorName: r.get('sectorName'),
        subSector: r.get('subSector'),
        subSectorName: r.get('subSectorName'),
        facility: r.get('facility'),
        facilityName: r.get('facilityName'),
        equipmentCount:
            typeof r.get('equipmentCount') === 'object'
                ? (r.get('equipmentCount') as { toNumber(): number }).toNumber()
                : Number(r.get('equipmentCount')),
    }));
}

/**
 * Counts total nodes and relationships in the graph.
 *
 * @returns Object with nodeCount and relCount.
 */
export async function getGraphStats(): Promise<{
    nodeCount: number;
    relCount: number;
}> {
    const nodeRec = await runQuery('MATCH (n) RETURN count(n) AS c');
    const relRec = await runQuery('MATCH ()-[r]->() RETURN count(r) AS c');
    const toNum = (v: unknown) =>
        typeof v === 'object' && v !== null && 'toNumber' in v
            ? (v as { toNumber(): number }).toNumber()
            : Number(v);
    return {
        nodeCount: toNum(nodeRec[0]?.get('c')),
        relCount: toNum(relRec[0]?.get('c')),
    };
}
