
const neo4j = require('neo4j-driver');

const driver = neo4j.driver(
    process.env.MEMGRAPH_URI || 'bolt://localhost:7687',
    neo4j.auth.basic(process.env.MEMGRAPH_USER || '', process.env.MEMGRAPH_PASSWORD || '')
);

async function migrate() {
    const session = driver.session();
    try {
        console.log('Starting migration: Adding :OX_DEXPI2 label to all Equipment nodes...');

        const result = await session.run(
            `MATCH (e:Equipment)
             WHERE NOT e:OX_DEXPI2
             SET e:OX_DEXPI2
             RETURN count(e) as updated`
        );

        const updated = result.records[0].get('updated').toNumber();
        console.log(`✅ Migration complete. Updated ${updated} nodes.`);

    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        await session.close();
        await driver.close();
    }
}

migrate();
