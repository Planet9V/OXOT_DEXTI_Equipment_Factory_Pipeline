/**
 * Graph-based Storage Layer.
 *
 * Implements the storage interface using Memgraph/Neo4j instead of the local filesystem.
 * This module ensures persistence of the DEXPI hierarchy and provides faceted search
 * and directory tree generation via Cypher queries.
 *
 * @module storage
 */

import crypto from 'crypto';
import {
  EquipmentCard,
  VendorVariation,
  DirectoryInfo,
  EquipmentFilter,
  PaginatedResult,
  CoverageReport,
  PipelineRun,
} from './types';
import * as schema from './graph-schema';

// ----- Initialization -----

export async function initializeDataDir(): Promise<void> {
  await schema.initializeSchema();
}

// ----- Sector / SubSector / Facility CRUD -----

export async function createSector(
  code: string,
  name: string,
  description: string,
): Promise<void> {
  await schema.mergeSector({
    code: code.toUpperCase(),
    name,
    description,
    icon: 'Folder', // Default icon
    color: '#3b82f6', // Default color
  });
}

export async function createSubSector(
  sector: string,
  code: string,
  name: string,
  description: string,
): Promise<void> {
  await schema.mergeSubSector(sector.toUpperCase(), {
    code: code.toUpperCase(),
    name,
    description,
  });
}

export async function createFacility(
  sector: string,
  subSector: string,
  code: string,
  name: string,
  description: string,
): Promise<void> {
  await schema.mergeFacility(subSector.toUpperCase(), {
    code: code.toUpperCase(),
    name,
    description,
  });
}

/**
 * Renames a sector and cascades the change to all equipment referencing the old code.
 *
 * @param oldCode - Current sector code.
 * @param newCode - New sector code.
 */
export async function renameSector(oldCode: string, newCode: string): Promise<void> {
  await schema.runWrite(
    `MATCH (s:Sector {code: $oldCode})
     SET s.code = $newCode
     WITH s
     OPTIONAL MATCH (e:Equipment)
     WHERE e.sector = $oldCode
     SET e.sector = $newCode`,
    { oldCode: oldCode.toUpperCase(), newCode: newCode.toUpperCase() }
  );
}

/**
 * Renames a sub-sector and cascades the change to all equipment referencing the old code.
 *
 * @param sector - Parent sector code.
 * @param oldCode - Current sub-sector code.
 * @param newCode - New sub-sector code.
 */
export async function renameSubSector(
  sector: string,
  oldCode: string,
  newCode: string,
): Promise<void> {
  await schema.runWrite(
    `MATCH (s:SubSector {code: $oldCode})
     SET s.code = $newCode
     WITH s
     OPTIONAL MATCH (e:Equipment)
     WHERE e.subSector = $oldCode
     SET e.subSector = $newCode`,
    { oldCode: oldCode.toUpperCase(), newCode: newCode.toUpperCase() }
  );
}

/**
 * Renames a facility and cascades the change to all equipment facilityCode references.
 *
 * @param sector - Parent sector code.
 * @param subSector - Parent sub-sector code.
 * @param oldCode - Current facility code.
 * @param newCode - New facility code.
 */
export async function renameFacility(
  sector: string,
  subSector: string,
  oldCode: string,
  newCode: string,
): Promise<void> {
  await schema.runWrite(
    `MATCH (f:Facility {code: $oldCode})
     SET f.code = $newCode
     WITH f
     OPTIONAL MATCH (e:Equipment {facilityCode: $oldCode})
     SET e.facilityCode = $newCode`,
    { oldCode: oldCode.toUpperCase(), newCode: newCode.toUpperCase() }
  );
}

export async function deleteSector(code: string): Promise<void> {
  await schema.deleteSectorNode(code.toUpperCase());
}

export async function deleteSubSector(sector: string, code: string): Promise<void> {
  await schema.deleteSubSectorNode(code.toUpperCase());
}

export async function deleteFacility(
  sector: string,
  subSector: string,
  code: string,
): Promise<void> {
  await schema.deleteFacilityNode(code.toUpperCase());
}

// ----- Equipment CRUD -----

export async function saveEquipment(card: EquipmentCard): Promise<void> {
  const facilityCode = card.facility.toUpperCase();

  // 1. Merge the main equipment node
  await schema.mergeEquipment(facilityCode, card);

  // 2. Merge Nozzles
  for (const nozzle of card.nozzles) {
    await schema.mergeNozzle(card.tag, facilityCode, nozzle);
  }

  // 3. Merge Materials
  for (const [usage, material] of Object.entries(card.materials)) {
    if (material) {
      await schema.mergeEquipmentMaterial(card.tag, facilityCode, material, usage);
    }
  }

  // 4. Merge Standards
  for (const std of card.standards) {
    await schema.mergeEquipmentStandard(card.tag, facilityCode, std);
  }
}

export async function getEquipment(
  sector: string,
  subSector: string,
  facility: string,
  tag: string,
): Promise<EquipmentCard | null> {
  return await schema.getEquipmentNode(tag, facility.toUpperCase());
}

export async function listEquipment(
  sector: string,
  subSector: string,
  facility: string,
): Promise<EquipmentCard[]> {
  return await schema.listEquipmentNodes(facility.toUpperCase());
}

export async function deleteEquipment(
  sector: string,
  subSector: string,
  facility: string,
  tag: string,
): Promise<boolean> {
  try {
    await schema.deleteEquipmentNode(tag, facility.toUpperCase());
    return true;
  } catch {
    return false;
  }
}

export async function copyEquipment(
  source: { sector: string; subSector: string; facility: string; tag: string },
  dest: { sector: string; subSector: string; facility: string; tag: string },
): Promise<EquipmentCard | null> {
  const card = await getEquipment(source.sector, source.subSector, source.facility, source.tag);
  if (!card) return null;
  const newCard: EquipmentCard = {
    ...card,
    id: crypto.randomUUID(),
    tag: dest.tag,
    sector: dest.sector,
    subSector: dest.subSector,
    facility: dest.facility,
    metadata: {
      ...card.metadata,
      version: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      source: 'manual',
    },
  };
  await saveEquipment(newCard);
  return newCard;
}

// ----- Vendor Variations -----

export async function saveVendorVariation(
  sector: string,
  subSector: string,
  facility: string,
  equipmentTag: string,
  variation: VendorVariation,
): Promise<void> {
  await schema.mergeVendorVariationNode(equipmentTag, facility.toUpperCase(), variation);
}

export async function listVendorVariations(
  sector: string,
  subSector: string,
  facility: string,
  equipmentTag: string,
): Promise<VendorVariation[]> {
  return await schema.listVendorVariationNodes(equipmentTag, facility.toUpperCase());
}

export async function deleteVendorVariation(
  sector: string,
  subSector: string,
  facility: string,
  equipmentTag: string,
  variationId: string,
): Promise<boolean> {
  try {
    await schema.runWrite(
      `MATCH (v:VendorVariation {id: $variationId}) DETACH DELETE v`,
      { variationId }
    );
    return true;
  } catch {
    return false;
  }
}

// ----- Search & Filter -----

export async function searchEquipment(
  filter: EquipmentFilter,
  page = 1,
  pageSize = 50,
): Promise<PaginatedResult<EquipmentCard>> {
  const { items, total } = await schema.searchEquipmentNodes(filter, page, pageSize);

  return {
    items,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

// ----- Directory Info -----

export async function getDirectoryTree(): Promise<DirectoryInfo[]> {
  const flatTree = await schema.getGraphTree();
  const sectorsMap = new Map<string, DirectoryInfo>();

  for (const item of flatTree) {
    // Ensure Sector
    if (!sectorsMap.has(item.sector)) {
      sectorsMap.set(item.sector, {
        path: item.sector,
        name: item.sectorName,
        type: 'sector',
        children: [],
        equipmentCount: 0,
        vendorCount: 0,
      });
    }
    const sector = sectorsMap.get(item.sector)!;

    // Ensure SubSector
    let subSector = sector.children.find(c => c.path === `${item.sector}/${item.subSector}`);
    if (!subSector) {
      subSector = {
        path: `${item.sector}/${item.subSector}`,
        name: item.subSectorName,
        type: 'subsector',
        children: [],
        equipmentCount: 0,
        vendorCount: 0,
      };
      sector.children.push(subSector);
    }

    // Add Facility
    subSector.children.push({
      path: `${item.sector}/${item.subSector}/${item.facility}`,
      name: item.facilityName,
      type: 'facility',
      children: [],
      equipmentCount: item.equipmentCount,
      vendorCount: 0, // Simplified for now
    });

    // Update aggregation
    subSector.equipmentCount += item.equipmentCount;
    sector.equipmentCount += item.equipmentCount;
  }

  return Array.from(sectorsMap.values());
}

// ----- Coverage Analysis -----

export async function getCoverageReport(
  sector: string,
  subSector: string,
  facility: string,
  expectedTypes: string[],
): Promise<CoverageReport> {
  const cards = await listEquipment(sector, subSector, facility);
  const existingTypes = [...new Set(cards.map((c) => c.componentClass))];
  const missingTypes = expectedTypes.filter((t) => !existingTypes.includes(t));

  return {
    sector,
    subSector,
    facility,
    expectedTypes,
    existingTypes,
    missingTypes,
    coveragePercent:
      expectedTypes.length > 0
        ? Math.round((existingTypes.length / expectedTypes.length) * 100)
        : 100,
  };
}

// ----- Pipeline Run Persistence -----

export async function savePipelineRun(run: PipelineRun): Promise<void> {
  await schema.mergePipelineRunNode(run);
}

export async function getPipelineRun(id: string): Promise<PipelineRun | null> {
  return await schema.getPipelineRunNode(id);
}

export async function listPipelineRuns(): Promise<PipelineRun[]> {
  return await schema.listPipelineRunNodes();
}