/**
 * Memgraph Audit Script.
 *
 * Queries the graph database directly to produce a comprehensive
 * statistics report: node counts by label, relationship counts by type,
 * property keys, and Equipment-specific breakdowns.
 *
 * Usage: node scripts/memgraph_audit.js
 *
 * @module scripts/memgraph_audit
 */

const neo4j = require('neo4j-driver');

const URI = process.env.MEMGRAPH_URI || 'bolt://localhost:7687';

async function main() {
    const driver = neo4j.driver(URI, neo4j.auth.basic('', ''));
    const session = driver.session();

    try {
        console.log('=== MEMGRAPH DATABASE AUDIT ===');
        console.log(`URI: ${URI}`);
        console.log(`Time: ${new Date().toISOString()}\n`);

        // ── 1. Total Node Count ──
        const totalRes = await session.run('MATCH (n) RETURN count(n) as total');
        const totalNodes = toNum(totalRes.records[0].get('total'));
        console.log(`[1] Total Nodes: ${totalNodes}`);

        // ── 2. Nodes by Label ──
        console.log('\n[2] Nodes by Label:');
        const labelRes = await session.run(`
      MATCH (n)
      WITH labels(n) AS lbls
      UNWIND lbls AS label
      RETURN label, count(*) AS count
      ORDER BY count DESC
    `);
        const labelTable = [];
        for (const r of labelRes.records) {
            labelTable.push({ Label: r.get('label'), Count: toNum(r.get('count')) });
        }
        console.table(labelTable);

        // ── 3. Total Relationship Count ──
        const relTotalRes = await session.run('MATCH ()-[r]->() RETURN count(r) as total');
        const totalRels = toNum(relTotalRes.records[0].get('total'));
        console.log(`\n[3] Total Relationships: ${totalRels}`);

        // ── 4. Relationships by Type ──
        console.log('\n[4] Relationships by Type:');
        const relRes = await session.run(`
      MATCH ()-[r]->()
      RETURN type(r) AS relType, count(r) AS count
      ORDER BY count DESC
    `);
        const relTable = [];
        for (const r of relRes.records) {
            relTable.push({ Type: r.get('relType'), Count: toNum(r.get('count')) });
        }
        console.table(relTable);

        // ── 5. Equipment Node Breakdown ──
        console.log('\n[5] Equipment Nodes:');
        const eqRes = await session.run(`
      MATCH (e:Equipment)
      RETURN count(e) AS total,
             count(DISTINCT e.tag) AS uniqueTags,
             count(DISTINCT e.componentClass) AS uniqueClasses,
             count(DISTINCT e.sector) AS distinctSectors,
             count(DISTINCT e.subSector) AS distinctSubSectors
    `);
        const eqRec = eqRes.records[0];
        console.log(`  Total Equipment Nodes:      ${toNum(eqRec.get('total'))}`);
        console.log(`  Unique Tags:                ${toNum(eqRec.get('uniqueTags'))}`);
        console.log(`  Unique Component Classes:   ${toNum(eqRec.get('uniqueClasses'))}`);
        console.log(`  Distinct Sectors:           ${toNum(eqRec.get('distinctSectors'))}`);
        console.log(`  Distinct SubSectors:        ${toNum(eqRec.get('distinctSubSectors'))}`);

        // ── 6. Equipment by Sector ──
        console.log('\n[6] Equipment by Sector:');
        const sectorRes = await session.run(`
      MATCH (e:Equipment)
      RETURN e.sector AS sector, count(e) AS count
      ORDER BY count DESC
    `);
        const sectorTable = [];
        for (const r of sectorRes.records) {
            sectorTable.push({ Sector: r.get('sector') || '(null)', Count: toNum(r.get('count')) });
        }
        console.table(sectorTable);

        // ── 7. Equipment by Component Class (Top 20) ──
        console.log('\n[7] Top 20 Equipment by Component Class:');
        const classRes = await session.run(`
      MATCH (e:Equipment)
      RETURN e.componentClass AS class, count(e) AS count
      ORDER BY count DESC
      LIMIT 20
    `);
        const classTable = [];
        for (const r of classRes.records) {
            classTable.push({ ComponentClass: r.get('class'), Count: toNum(r.get('count')) });
        }
        console.table(classTable);

        // ── 8. Sample Equipment Properties ──
        console.log('\n[8] Sample Equipment Node (first found):');
        const sampleRes = await session.run('MATCH (e:Equipment) RETURN e LIMIT 1');
        if (sampleRes.records.length > 0) {
            const props = sampleRes.records[0].get('e').properties;
            for (const [key, val] of Object.entries(props)) {
                const display = typeof val === 'object' && val.toNumber ? val.toNumber() : val;
                console.log(`  ${key}: ${display}`);
            }
        }

        // ── 9. Schema Indices ──
        console.log('\n[9] Database Indices:');
        try {
            const idxRes = await session.run('SHOW INDEX INFO');
            if (idxRes.records.length === 0) {
                console.log('  No indices found.');
            } else {
                for (const r of idxRes.records) {
                    const fields = r.keys.map(k => `${k}=${r.get(k)}`).join(', ');
                    console.log(`  ${fields}`);
                }
            }
        } catch {
            console.log('  (SHOW INDEX INFO not supported — checking via storage info)');
            try {
                const storageRes = await session.run('SHOW STORAGE INFO');
                for (const r of storageRes.records) {
                    console.log(`  ${r.get('storage info')}: ${r.get('value')}`);
                }
            } catch {
                console.log('  (Storage info query not available)');
            }
        }

        console.log('\n=== AUDIT COMPLETE ===');

    } catch (err) {
        console.error('[Audit Error]:', err.message);
    } finally {
        await session.close();
        await driver.close();
    }
}

function toNum(val) {
    if (val && val.toNumber) return val.toNumber();
    if (val && val.low !== undefined) return val.low;
    return val;
}

main();
