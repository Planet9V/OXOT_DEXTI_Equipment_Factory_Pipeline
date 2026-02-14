/**
 * Diagnose unmatched facilityCode prefixes.
 *
 * Finds all distinct facilityCode prefixes in Equipment nodes
 * that still have NULL sectors, so we can complete the backfill mapping.
 *
 * @module scripts/diagnose_null_sectors
 */

const neo4j = require('neo4j-driver');
const URI = process.env.MEMGRAPH_URI || 'bolt://localhost:7687';

async function main() {
    const driver = neo4j.driver(URI, neo4j.auth.basic('', ''));
    const session = driver.session();

    try {
        const res = await session.run(`
      MATCH (e:Equipment)
      WHERE e.sector IS NULL OR e.sector = ''
      RETURN e.facilityCode AS fc, count(e) AS cnt
      ORDER BY cnt DESC
    `);

        console.log('=== NULL Sector Equipment by facilityCode ===\n');
        for (const r of res.records) {
            const fc = r.get('fc') || '(no facilityCode)';
            const cnt = r.get('cnt').toNumber ? r.get('cnt').toNumber() : r.get('cnt');
            console.log(`  ${fc}: ${cnt}`);
        }
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await session.close();
        await driver.close();
    }
}

main();
