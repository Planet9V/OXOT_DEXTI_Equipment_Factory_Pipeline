import { promises as fs } from 'fs';
import path from 'path';
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

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), 'data');

// ----- Path helpers -----

function sectorPath(sector: string): string {
  return path.join(DATA_DIR, 'sectors', sector.toUpperCase());
}

function subSectorPath(sector: string, subSector: string): string {
  return path.join(sectorPath(sector), subSector.toUpperCase());
}

function facilityPath(sector: string, subSector: string, facility: string): string {
  return path.join(subSectorPath(sector, subSector), facility.toUpperCase());
}

function equipmentDir(sector: string, subSector: string, facility: string): string {
  return path.join(facilityPath(sector, subSector, facility), 'equipment');
}

function vendorDir(
  sector: string,
  subSector: string,
  facility: string,
  equipmentTag: string,
): string {
  return path.join(facilityPath(sector, subSector, facility), 'vendors', equipmentTag);
}

function contentHash(obj: object): string {
  return crypto
    .createHash('sha256')
    .update(JSON.stringify(obj))
    .digest('hex')
    .slice(0, 16);
}

// ----- Initialization -----

export async function initializeDataDir(): Promise<void> {
  await fs.mkdir(path.join(DATA_DIR, 'sectors'), { recursive: true });
  await fs.mkdir(path.join(DATA_DIR, 'pipeline-runs'), { recursive: true });
  await fs.mkdir(path.join(DATA_DIR, 'exports'), { recursive: true });
}

// ----- Sector / SubSector / Facility CRUD -----

export async function createSector(
  code: string,
  name: string,
  description: string,
): Promise<void> {
  const dir = sectorPath(code);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(
    path.join(dir, '_meta.json'),
    JSON.stringify(
      {
        code: code.toUpperCase(),
        name,
        description,
        createdAt: new Date().toISOString(),
      },
      null,
      2,
    ),
  );
}

export async function createSubSector(
  sector: string,
  code: string,
  name: string,
  description: string,
): Promise<void> {
  const dir = subSectorPath(sector, code);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(
    path.join(dir, '_meta.json'),
    JSON.stringify(
      {
        code: code.toUpperCase(),
        name,
        description,
        parentSector: sector.toUpperCase(),
        createdAt: new Date().toISOString(),
      },
      null,
      2,
    ),
  );
}

export async function createFacility(
  sector: string,
  subSector: string,
  code: string,
  name: string,
  description: string,
): Promise<void> {
  const eqDir = equipmentDir(sector, subSector, code);
  const vDir = path.join(facilityPath(sector, subSector, code), 'vendors');
  await fs.mkdir(eqDir, { recursive: true });
  await fs.mkdir(vDir, { recursive: true });
  await fs.writeFile(
    path.join(facilityPath(sector, subSector, code), '_meta.json'),
    JSON.stringify(
      {
        code: code.toUpperCase(),
        name,
        description,
        parentSector: sector.toUpperCase(),
        parentSubSector: subSector.toUpperCase(),
        createdAt: new Date().toISOString(),
      },
      null,
      2,
    ),
  );
}

export async function renameSector(oldCode: string, newCode: string): Promise<void> {
  await fs.rename(sectorPath(oldCode), sectorPath(newCode));
  const metaPath = path.join(sectorPath(newCode), '_meta.json');
  const meta = JSON.parse(await fs.readFile(metaPath, 'utf-8'));
  meta.code = newCode.toUpperCase();
  meta.updatedAt = new Date().toISOString();
  await fs.writeFile(metaPath, JSON.stringify(meta, null, 2));
}

export async function renameSubSector(
  sector: string,
  oldCode: string,
  newCode: string,
): Promise<void> {
  await fs.rename(subSectorPath(sector, oldCode), subSectorPath(sector, newCode));
  const metaPath = path.join(subSectorPath(sector, newCode), '_meta.json');
  const meta = JSON.parse(await fs.readFile(metaPath, 'utf-8'));
  meta.code = newCode.toUpperCase();
  meta.updatedAt = new Date().toISOString();
  await fs.writeFile(metaPath, JSON.stringify(meta, null, 2));
}

export async function renameFacility(
  sector: string,
  subSector: string,
  oldCode: string,
  newCode: string,
): Promise<void> {
  await fs.rename(
    facilityPath(sector, subSector, oldCode),
    facilityPath(sector, subSector, newCode),
  );
  const metaPath = path.join(facilityPath(sector, subSector, newCode), '_meta.json');
  const meta = JSON.parse(await fs.readFile(metaPath, 'utf-8'));
  meta.code = newCode.toUpperCase();
  meta.updatedAt = new Date().toISOString();
  await fs.writeFile(metaPath, JSON.stringify(meta, null, 2));
}

export async function deleteSector(code: string): Promise<void> {
  await fs.rm(sectorPath(code), { recursive: true, force: true });
}

export async function deleteSubSector(sector: string, code: string): Promise<void> {
  await fs.rm(subSectorPath(sector, code), { recursive: true, force: true });
}

export async function deleteFacility(
  sector: string,
  subSector: string,
  code: string,
): Promise<void> {
  await fs.rm(facilityPath(sector, subSector, code), { recursive: true, force: true });
}

// ----- Equipment CRUD -----

export async function saveEquipment(card: EquipmentCard): Promise<void> {
  const dir = equipmentDir(card.sector, card.subSector, card.facility);
  await fs.mkdir(dir, { recursive: true });
  card.metadata.contentHash = contentHash({ ...card, metadata: undefined });
  card.metadata.updatedAt = new Date().toISOString();
  await fs.writeFile(
    path.join(dir, `${card.tag}.json`),
    JSON.stringify(card, null, 2),
  );
}

export async function getEquipment(
  sector: string,
  subSector: string,
  facility: string,
  tag: string,
): Promise<EquipmentCard | null> {
  try {
    const filePath = path.join(equipmentDir(sector, subSector, facility), `${tag}.json`);
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data) as EquipmentCard;
  } catch {
    return null;
  }
}

export async function listEquipment(
  sector: string,
  subSector: string,
  facility: string,
): Promise<EquipmentCard[]> {
  try {
    const dir = equipmentDir(sector, subSector, facility);
    const files = await fs.readdir(dir);
    const cards: EquipmentCard[] = [];
    for (const file of files) {
      if (file.endsWith('.json')) {
        const data = await fs.readFile(path.join(dir, file), 'utf-8');
        cards.push(JSON.parse(data));
      }
    }
    return cards;
  } catch {
    return [];
  }
}

export async function deleteEquipment(
  sector: string,
  subSector: string,
  facility: string,
  tag: string,
): Promise<boolean> {
  try {
    await fs.unlink(path.join(equipmentDir(sector, subSector, facility), `${tag}.json`));
    // Also delete associated vendor variations
    try {
      await fs.rm(vendorDir(sector, subSector, facility, tag), {
        recursive: true,
        force: true,
      });
    } catch {
      // Vendor dir may not exist — acceptable
    }
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
  const dir = vendorDir(sector, subSector, facility, equipmentTag);
  await fs.mkdir(dir, { recursive: true });
  variation.metadata.updatedAt = new Date().toISOString();
  const filename = `${variation.manufacturer}-${variation.model}`.replace(
    /[^a-zA-Z0-9_-]/g,
    '_',
  );
  await fs.writeFile(path.join(dir, `${filename}.json`), JSON.stringify(variation, null, 2));
}

export async function listVendorVariations(
  sector: string,
  subSector: string,
  facility: string,
  equipmentTag: string,
): Promise<VendorVariation[]> {
  try {
    const dir = vendorDir(sector, subSector, facility, equipmentTag);
    const files = await fs.readdir(dir);
    const variations: VendorVariation[] = [];
    for (const f of files) {
      if (f.endsWith('.json')) {
        variations.push(JSON.parse(await fs.readFile(path.join(dir, f), 'utf-8')));
      }
    }
    return variations;
  } catch {
    return [];
  }
}

export async function deleteVendorVariation(
  sector: string,
  subSector: string,
  facility: string,
  equipmentTag: string,
  variationId: string,
): Promise<boolean> {
  try {
    const dir = vendorDir(sector, subSector, facility, equipmentTag);
    const files = await fs.readdir(dir);
    for (const f of files) {
      const data = JSON.parse(await fs.readFile(path.join(dir, f), 'utf-8'));
      if (data.id === variationId) {
        await fs.unlink(path.join(dir, f));
        return true;
      }
    }
    return false;
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
  const allCards: EquipmentCard[] = [];
  const sectorsDir = path.join(DATA_DIR, 'sectors');

  try {
    const sectors = filter.sector
      ? [filter.sector.toUpperCase()]
      : await fs.readdir(sectorsDir);

    for (const sec of sectors) {
      const secPath = path.join(sectorsDir, sec);
      const secStat = await fs.stat(secPath).catch(() => null);
      if (!secStat?.isDirectory()) continue;

      const subSectors = filter.subSector
        ? [filter.subSector.toUpperCase()]
        : (await fs.readdir(secPath)).filter((f) => !f.startsWith('_'));

      for (const sub of subSectors) {
        const subPath = path.join(secPath, sub);
        const subStat = await fs.stat(subPath).catch(() => null);
        if (!subStat?.isDirectory()) continue;

        const facilities = filter.facility
          ? [filter.facility.toUpperCase()]
          : (await fs.readdir(subPath)).filter((f) => !f.startsWith('_'));

        for (const fac of facilities) {
          const eqDir = path.join(subPath, fac, 'equipment');
          try {
            const files = await fs.readdir(eqDir);
            for (const file of files) {
              if (!file.endsWith('.json')) continue;
              const card: EquipmentCard = JSON.parse(
                await fs.readFile(path.join(eqDir, file), 'utf-8'),
              );

              if (filter.category && card.category !== filter.category) continue;
              if (filter.componentClass && card.componentClass !== filter.componentClass)
                continue;
              if (filter.source && card.metadata.source !== filter.source) continue;
              if (
                filter.minValidationScore &&
                card.metadata.validationScore < filter.minValidationScore
              )
                continue;
              if (filter.searchTerm) {
                const term = filter.searchTerm.toLowerCase();
                const matches =
                  card.tag.toLowerCase().includes(term) ||
                  card.displayName.toLowerCase().includes(term) ||
                  card.description.toLowerCase().includes(term) ||
                  card.componentClass.toLowerCase().includes(term);
                if (!matches) continue;
              }

              allCards.push(card);
            }
          } catch {
            // No equipment directory for this facility — skip
          }
        }
      }
    }
  } catch {
    // Sectors directory does not exist yet
  }

  const total = allCards.length;
  const start = (page - 1) * pageSize;
  const items = allCards.slice(start, start + pageSize);

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
  const result: DirectoryInfo[] = [];
  const sectorsDir = path.join(DATA_DIR, 'sectors');

  try {
    const sectors = await fs.readdir(sectorsDir);
    for (const sec of sectors) {
      const secPath = path.join(sectorsDir, sec);
      const stat = await fs.stat(secPath);
      if (!stat.isDirectory()) continue;

      const sectorInfo: DirectoryInfo = {
        path: sec,
        name: sec,
        type: 'sector',
        children: [],
        equipmentCount: 0,
        vendorCount: 0,
      };

      const subs = (await fs.readdir(secPath)).filter(
        (f) => !f.startsWith('_') && !f.startsWith('.'),
      );
      for (const sub of subs) {
        const subPath = path.join(secPath, sub);
        const subStat = await fs.stat(subPath).catch(() => null);
        if (!subStat?.isDirectory()) continue;

        const subInfo: DirectoryInfo = {
          path: `${sec}/${sub}`,
          name: sub,
          type: 'subsector',
          children: [],
          equipmentCount: 0,
          vendorCount: 0,
        };

        const facs = (await fs.readdir(subPath)).filter(
          (f) => !f.startsWith('_') && !f.startsWith('.'),
        );
        for (const fac of facs) {
          const facPath = path.join(subPath, fac);
          const facStat = await fs.stat(facPath).catch(() => null);
          if (!facStat?.isDirectory()) continue;

          let eqCount = 0;
          let vendorCount = 0;
          try {
            eqCount = (await fs.readdir(path.join(facPath, 'equipment'))).filter((f) =>
              f.endsWith('.json'),
            ).length;
          } catch {
            // No equipment directory yet
          }
          try {
            const vendorDirs = await fs.readdir(path.join(facPath, 'vendors'));
            for (const vd of vendorDirs) {
              try {
                vendorCount += (
                  await fs.readdir(path.join(facPath, 'vendors', vd))
                ).filter((f) => f.endsWith('.json')).length;
              } catch {
                // Empty vendor subdirectory
              }
            }
          } catch {
            // No vendors directory yet
          }

          const facInfo: DirectoryInfo = {
            path: `${sec}/${sub}/${fac}`,
            name: fac,
            type: 'facility',
            children: [],
            equipmentCount: eqCount,
            vendorCount,
          };
          subInfo.children.push(facInfo);
          subInfo.equipmentCount += eqCount;
          subInfo.vendorCount += vendorCount;
        }

        sectorInfo.children.push(subInfo);
        sectorInfo.equipmentCount += subInfo.equipmentCount;
        sectorInfo.vendorCount += subInfo.vendorCount;
      }

      result.push(sectorInfo);
    }
  } catch {
    // Sectors directory does not exist yet
  }

  return result;
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
  const dir = path.join(DATA_DIR, 'pipeline-runs');
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, `${run.id}.json`), JSON.stringify(run, null, 2));
}

export async function getPipelineRun(id: string): Promise<PipelineRun | null> {
  try {
    const data = await fs.readFile(
      path.join(DATA_DIR, 'pipeline-runs', `${id}.json`),
      'utf-8',
    );
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export async function listPipelineRuns(): Promise<PipelineRun[]> {
  try {
    const dir = path.join(DATA_DIR, 'pipeline-runs');
    const files = await fs.readdir(dir);
    const runs: PipelineRun[] = [];
    for (const f of files) {
      if (f.endsWith('.json')) {
        runs.push(JSON.parse(await fs.readFile(path.join(dir, f), 'utf-8')));
      }
    }
    return runs.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  } catch {
    return [];
  }
}
