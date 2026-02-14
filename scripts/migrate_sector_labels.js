
const neo4j = require('neo4j-driver');

// Reuse existing connection logic or env vars
const driver = neo4j.driver(
    process.env.MEMGRAPH_URI || 'bolt://localhost:7687',
    neo4j.auth.basic(process.env.MEMGRAPH_USER || '', process.env.MEMGRAPH_PASSWORD || '')
);

function toLabel(str) {
    if (!str) return '';
    return str.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase();
}

async function migrate() {
    const session = driver.session();
    try {
        console.log('Starting Sector/SubSector label migration...');

        // 1. Fetch all equipment with OX_DEXPI2 label
        const result = await session.run(`
            MATCH (e:Equipment:OX_DEXPI2) 
            RETURN e.id as id, e.sector as sector, e.subSector as subSector
        `);

        const updates = [];
        for (const record of result.records) {
            const id = record.get('id');
            const sector = record.get('sector');
            const subSector = record.get('subSector');

            if (!sector && !subSector) continue;

            const labelsToAdd = [];
            if (sector) labelsToAdd.push(`Sector_${toLabel(sector)}`);
            if (subSector) labelsToAdd.push(`SubSector_${toLabel(subSector)}`);

            if (labelsToAdd.length > 0) {
                updates.push({ id, labels: labelsToAdd });
            }
        }

        console.log(`Found ${updates.length} nodes to label out of ${result.records.length} items.`);

        // 2. Apply labels in batches
        const BATCH_SIZE = 100;
        for (let i = 0; i < updates.length; i += BATCH_SIZE) {
            const batch = updates.slice(i, i + BATCH_SIZE);
            const query = `
                UNWIND $batch as item
                MATCH (e:Equipment {id: item.id})
                CALL apoc.create.addLabels(e, item.labels) YIELD node
                RETURN count(node)
            `;

            // Fallback if APOC not available: dynamic Cypher string construction
            // Since Memgraph has limited APOC, let's use a safer approach:
            // Iterate and set labels via dynamic Cypher if needed, 
            // OR assumes Memgraph's util modules are loaded.
            // Safest: Generate a giant SET query or one-by-one.
            // Let's try one-by-one for safety in this script, or group by label set.

            // Optimization: Group by label signature
            // But for 400 items, one-by-one is fast enough (~1-2s).

            // Let's retry with a simple query per item to be safe against missing APOC.
        }

        // Re-implementation: Simple iteration for maximum compatibility
        let processed = 0;
        for (const update of updates) {
            const labelString = update.labels.map(l => `\`${l}\``).join(':');
            await session.run(`
                MATCH (e:Equipment {id: $id})
                SET e:${labelString}
            `, { id: update.id });
            processed++;
            if (processed % 50 === 0) process.stdout.write('.');
        }

        console.log(`\nMigration complete. Labeled ${processed} nodes.`);

    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        await session.close();
        await driver.close();
    }
}

migrate();
