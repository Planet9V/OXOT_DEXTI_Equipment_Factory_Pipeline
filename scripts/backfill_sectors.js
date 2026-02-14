/**
 * Backfill NULL sector/subSector on Equipment nodes.
 *
 * Uses the `facilityCode` property (e.g. "CHEM-BC-PETRO") to derive
 * the sector and subSector codes, then sets them on the node.
 *
 * Safe to run multiple times (idempotent — only updates nodes with
 * null sector/subSector).
 *
 * Usage: node scripts/backfill_sectors.js
 *
 * @module scripts/backfill_sectors
 */

const neo4j = require('neo4j-driver');

const URI = process.env.MEMGRAPH_URI || 'bolt://localhost:7687';

/**
 * Mapping from facilityCode prefix to { sector, subSector }.
 *
 * Derived from the CISA sector taxonomy in src/lib/sectors/*.ts.
 */
const FACILITY_PREFIX_MAP = {
    'CHEM-BC': { sector: 'CHEMICAL', subSector: 'BASIC_CHEMICALS' },
    'CHEM-SC': { sector: 'CHEMICAL', subSector: 'SPECIALTY_CHEMICALS' },
    'CHEM-AG': { sector: 'CHEMICAL', subSector: 'AGRICULTURAL_CHEMICALS' },
    'CHEM-PH': { sector: 'CHEMICAL', subSector: 'PHARMACEUTICALS' },
    'CHEM-CP': { sector: 'CHEMICAL', subSector: 'CONSUMER_PRODUCTS' },
    'ENER-OG': { sector: 'ENERGY', subSector: 'OIL_GAS' },
    'ENER-EG': { sector: 'ENERGY', subSector: 'ELECTRIC_GRID' },
    'ENER-RE': { sector: 'ENERGY', subSector: 'RENEWABLES' },
    'ENER-NG': { sector: 'ENERGY', subSector: 'NATURAL_GAS' },
    'ENER-CL': { sector: 'ENERGY', subSector: 'COAL' },
    'NUCL-NP': { sector: 'NUCLEAR', subSector: 'NUCLEAR_POWER' },
    'NUCL-FC': { sector: 'NUCLEAR', subSector: 'FUEL_CYCLE' },
    'NUCL-WM': { sector: 'NUCLEAR', subSector: 'WASTE_MANAGEMENT' },
    'NUCL-RR': { sector: 'NUCLEAR', subSector: 'RESEARCH_REACTORS' },
    'WATR-DW': { sector: 'WATER', subSector: 'DRINKING_WATER' },
    'WATR-WW': { sector: 'WATER', subSector: 'WASTEWATER' },
    'WATR-SW': { sector: 'WATER', subSector: 'STORMWATER' },
    'FOOD-FP': { sector: 'FOOD_AGRICULTURE', subSector: 'FOOD_PROCESSING' },
    'FOOD-BV': { sector: 'FOOD_AGRICULTURE', subSector: 'BEVERAGE' },
    'FOOD-AG': { sector: 'FOOD_AGRICULTURE', subSector: 'AGRICULTURE' },
    'FOOD-DS': { sector: 'FOOD_AGRICULTURE', subSector: 'DISTRIBUTION_STORAGE' },
    'HLTH-HP': { sector: 'HEALTHCARE', subSector: 'HOSPITALS' },
    'HLTH-PH': { sector: 'HEALTHCARE', subSector: 'PHARMACEUTICALS_MFG' },
    'HLTH-MD': { sector: 'HEALTHCARE', subSector: 'MEDICAL_DEVICES' },
    'HLTH-BL': { sector: 'HEALTHCARE', subSector: 'BLOOD_SUPPLY' },
    'MFGR-MM': { sector: 'MANUFACTURING', subSector: 'METALS_MACHINERY' },
    'MFGR-EL': { sector: 'MANUFACTURING', subSector: 'ELECTRICAL_EQUIPMENT' },
    'MFGR-TR': { sector: 'MANUFACTURING', subSector: 'TRANSPORTATION_EQUIPMENT' },
    'TRAN-AV': { sector: 'TRANSPORTATION', subSector: 'AVIATION' },
    'TRAN-MR': { sector: 'TRANSPORTATION', subSector: 'MARITIME' },
    'TRAN-RL': { sector: 'TRANSPORTATION', subSector: 'RAIL' },
    'TRAN-PP': { sector: 'TRANSPORTATION', subSector: 'PIPELINE' },
    'INFR-DC': { sector: 'INFRASTRUCTURE', subSector: 'DATA_CENTERS' },
    'INFR-TL': { sector: 'INFRASTRUCTURE', subSector: 'TELECOM' },
    'INFR-BM': { sector: 'INFRASTRUCTURE', subSector: 'BUILDING_MANAGEMENT' },
    'INFR-WM': { sector: 'INFRASTRUCTURE', subSector: 'WASTE_MANAGEMENT' },
    'INFR-CL': { sector: 'INFRASTRUCTURE', subSector: 'CLEARINGHOUSE' },
    'FINC-DC': { sector: 'FINANCIAL', subSector: 'DATA_CENTERS' },
    'FINC-TR': { sector: 'FINANCIAL', subSector: 'TRADING' },
    'SVCS-DC': { sector: 'SERVICES', subSector: 'DATA_CENTERS' },
    'SVCS-BM': { sector: 'SERVICES', subSector: 'BUILDING_MANAGEMENT' },
    'SVCS-CG': { sector: 'SERVICES', subSector: 'COGENERATION' },
};

/**
 * Derives sector and subSector from a facilityCode.
 *
 * @param {string} facilityCode - e.g. "CHEM-BC-PETRO"
 * @returns {{ sector: string, subSector: string } | null}
 */
function deriveSector(facilityCode) {
    if (!facilityCode) return null;
    // Try longest prefix first: "CHEM-BC" from "CHEM-BC-PETRO"
    const parts = facilityCode.split('-');
    if (parts.length >= 2) {
        const prefix = `${parts[0]}-${parts[1]}`;
        if (FACILITY_PREFIX_MAP[prefix]) {
            return FACILITY_PREFIX_MAP[prefix];
        }
    }
    return null;
}

async function main() {
    const driver = neo4j.driver(URI, neo4j.auth.basic('', ''));
    const session = driver.session();

    try {
        console.log('=== Backfill NULL Sectors ===\n');

        // 1. Find all equipment with null sector
        const findRes = await session.run(`
      MATCH (e:Equipment)
      WHERE e.sector IS NULL OR e.sector = ''
      RETURN e.tag AS tag, e.facilityCode AS facilityCode, id(e) AS nodeId
    `);

        const toUpdate = [];
        const noMatch = [];

        for (const rec of findRes.records) {
            const tag = rec.get('tag');
            const facilityCode = rec.get('facilityCode');
            const nodeId = rec.get('nodeId');
            const derived = deriveSector(facilityCode);

            if (derived) {
                toUpdate.push({ nodeId, tag, facilityCode, ...derived });
            } else {
                noMatch.push({ tag, facilityCode });
            }
        }

        console.log(`Nodes needing backfill: ${findRes.records.length}`);
        console.log(`  Can derive sector:    ${toUpdate.length}`);
        console.log(`  No match (manual):    ${noMatch.length}`);

        if (noMatch.length > 0 && noMatch.length <= 10) {
            console.log('\n  Unmatched:', noMatch.map(n => `${n.tag} (${n.facilityCode})`).join(', '));
        }

        // 2. Batch update
        if (toUpdate.length > 0) {
            console.log(`\nUpdating ${toUpdate.length} nodes...`);

            const updateRes = await session.run(`
        UNWIND $batch AS row
        MATCH (e:Equipment) WHERE id(e) = row.nodeId
        SET e.sector = row.sector, e.subSector = row.subSector
        RETURN count(e) AS updated
      `, { batch: toUpdate.map(u => ({ nodeId: u.nodeId.toNumber ? u.nodeId.toNumber() : u.nodeId, sector: u.sector, subSector: u.subSector })) });

            const updated = updateRes.records[0].get('updated');
            console.log(`Updated: ${updated.toNumber ? updated.toNumber() : updated} nodes`);
        }

        // 3. Verify
        const verifyRes = await session.run(`
      MATCH (e:Equipment)
      WHERE e.sector IS NULL OR e.sector = ''
      RETURN count(e) AS remaining
    `);
        const remaining = verifyRes.records[0].get('remaining');
        console.log(`\nRemaining NULL sector nodes: ${remaining.toNumber ? remaining.toNumber() : remaining}`);
        console.log('=== Backfill Complete ===');

    } catch (err) {
        console.error('[Backfill Error]:', err.message);
    } finally {
        await session.close();
        await driver.close();
    }
}

main();
