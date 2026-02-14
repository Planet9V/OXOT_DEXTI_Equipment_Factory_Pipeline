/**
 * Complete Sector Backfill — uses the FIRST segment of facilityCode.
 *
 * Since facilityCode follows the pattern "SECTOR-SUBSECTOR-FACILITY",
 * we map the first 4-char prefix (CHEM, ENER, NUCL, etc.) to the
 * canonical sector name, and the first 2 segments to the subSector.
 *
 * @module scripts/backfill_sectors_v2
 */

const neo4j = require('neo4j-driver');
const URI = process.env.MEMGRAPH_URI || 'bolt://localhost:7687';

/**
 * Maps the FIRST segment of facilityCode to the canonical sector name.
 */
const SECTOR_MAP = {
    'CHEM': 'CHEMICAL',
    'ENER': 'ENERGY',
    'NUCL': 'NUCLEAR',
    'WATR': 'WATER',
    'FOOD': 'FOOD_AGRICULTURE',
    'HLTH': 'HEALTHCARE',
    'CMAN': 'CRITICAL_MANUFACTURING',
    'TRAN': 'TRANSPORTATION',
    'ITEC': 'INFORMATION_TECHNOLOGY',
    'FINA': 'FINANCIAL_SERVICES',
    'COMU': 'COMMUNICATIONS',
    'COMM': 'COMMERCIAL_FACILITIES',
    'DAMS': 'DAMS',
    'DEFN': 'DEFENSE_INDUSTRIAL_BASE',
    'GOVT': 'GOVERNMENT_FACILITIES',
    'EMER': 'EMERGENCY_SERVICES',
};

async function main() {
    const driver = neo4j.driver(URI, neo4j.auth.basic('', ''));
    const session = driver.session();

    try {
        console.log('=== Backfill NULL Sectors (V2 — Full Coverage) ===\n');

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

            if (!facilityCode) {
                noMatch.push({ tag, facilityCode: '(none)' });
                continue;
            }

            const parts = facilityCode.split('-');
            const sectorPrefix = parts[0];
            const subSectorPrefix = parts.length >= 2 ? `${parts[0]}-${parts[1]}` : sectorPrefix;

            const sector = SECTOR_MAP[sectorPrefix];

            if (sector) {
                toUpdate.push({
                    nodeId: nodeId.toNumber ? nodeId.toNumber() : nodeId,
                    sector,
                    subSector: subSectorPrefix,
                });
            } else {
                noMatch.push({ tag, facilityCode });
            }
        }

        console.log(`Nodes needing backfill: ${findRes.records.length}`);
        console.log(`  Can derive sector:    ${toUpdate.length}`);
        console.log(`  No match:             ${noMatch.length}`);

        if (noMatch.length > 0 && noMatch.length <= 20) {
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
      `, { batch: toUpdate });

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

        // 4. Final breakdown
        const breakdownRes = await session.run(`
      MATCH (e:Equipment)
      RETURN e.sector AS sector, count(e) AS count
      ORDER BY count DESC
    `);
        console.log('\n--- Final Sector Distribution ---');
        for (const r of breakdownRes.records) {
            const s = r.get('sector') || '(null)';
            const c = r.get('count').toNumber ? r.get('count').toNumber() : r.get('count');
            console.log(`  ${s}: ${c}`);
        }

        console.log('\n=== Backfill V2 Complete ===');
    } catch (err) {
        console.error('[Backfill Error]:', err.message);
    } finally {
        await session.close();
        await driver.close();
    }
}

main();
