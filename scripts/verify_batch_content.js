
const neo4j = require('neo4j-driver');

const driver = neo4j.driver(
    process.env.MEMGRAPH_URI || 'bolt://localhost:7687',
    neo4j.auth.basic(process.env.MEMGRAPH_USER || '', process.env.MEMGRAPH_PASSWORD || '')
);

async function verify() {
    const session = driver.session();
    try {
        console.log('Verifying equipment AC-179...');
        const result = await session.run(
            `MATCH (e:Equipment {tag: $tag}) 
             RETURN e.tag, labels(e) as labels, e.componentClass, e.sector, e.card`,
            { tag: 'AC-179' }
        );

        if (result.records.length === 0) {
            console.error('❌ AC-179 NOT FOUND in database.');
            process.exit(1);
        }

        const record = result.records[0];
        const card = JSON.parse(record.get('e.card'));
        const labels = record.get('labels');

        console.log('✅ Found AC-179');
        console.log(`- Labels: ${labels.join(', ')}`);

        if (!labels.includes('OX_DEXPI2')) {
            console.error('❌ Missing OX_DEXPI2 label!');
            process.exit(1);
        } else {
            console.log('✅ Has OX_DEXPI2 label');
        }

        console.log(`- Class: ${record.get('e.componentClass')}`);
        console.log(`- Sector: ${record.get('e.sector')}`); // Should be 'Reference Standards'
        console.log(`- Specs: ${JSON.stringify(card.specifications, null, 2)}`);

    } catch (error) {
        console.error('Verification failed:', error);
    } finally {
        await session.close();
        await driver.close();
    }
}

verify();
