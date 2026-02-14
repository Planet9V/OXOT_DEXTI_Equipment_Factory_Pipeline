const neo4j = require('neo4j-driver');
const fs = require('fs');
const path = require('path');

// Configuration
const URI = process.env.MEMGRAPH_URI || 'bolt://localhost:7687';
const USER = process.env.MEMGRAPH_USER || '';
const PASS = process.env.MEMGRAPH_PASSWORD || '';
const BACKUP_FILE = process.argv[2] || 'memgraph_backup.cypher';

const driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASS));

const formatProp = (value) => {
    if (value === null || value === undefined) return 'null';
    if (typeof value === 'string') return JSON.stringify(value);
    if (typeof value === 'boolean') return value.toString();
    if (neo4j.isInt(value)) return value.toNumber();
    if (Array.isArray(value)) return `[${value.map(formatProp).join(', ')}]`;
    if (typeof value === 'object') {
        // Handle maps/dictionaries recursively
        return `{${Object.entries(value).map(([k, v]) => `\`${k}\`: ${formatProp(v)}`).join(', ')}}`;
    }
    return JSON.stringify(value);
};

const propsToCypher = (props) => {
    if (!props || Object.keys(props).length === 0) return '';
    const entries = Object.entries(props)
        .map(([key, value]) => `\`${key}\`: ${formatProp(value)}`);
    return `{${entries.join(', ')}}`;
};

async function backup() {
    const session = driver.session();
    try {
        console.log(`🔌 Connecting to ${URI}...`);
        const resultNodes = await session.run('MATCH (n) RETURN id(n) as id, labels(n) as labels, properties(n) as props');
        const resultRels = await session.run('MATCH (n)-[r]->(m) RETURN id(n) as source, id(m) as target, type(r) as type, properties(r) as props');

        let cypher = '// Memgraph Backup Generated ' + new Date().toISOString() + '\n';
        cypher += '// Run MATCH (n) DETACH DELETE n; manually before loading if needed.\n\n';

        console.log(`📦 Exporting ${resultNodes.records.length} nodes...`);
        const nodeMap = new Set(); // To track valid nodes if needed

        resultNodes.records.forEach(record => {
            const id = record.get('id').toNumber();
            const labels = record.get('labels').map(l => `:\`${l}\``).join('');
            const props = record.get('props');
            nodeMap.add(id);
            cypher += `CREATE (v${id}${labels} ${propsToCypher(props)})\n`;
        });

        cypher += '\n';
        console.log(`🔗 Exporting ${resultRels.records.length} relationships...`);

        resultRels.records.forEach(record => {
            const source = record.get('source').toNumber();
            const target = record.get('target').toNumber();
            const type = record.get('type');
            const props = record.get('props');

            if (nodeMap.has(source) && nodeMap.has(target)) {
                cypher += `CREATE (v${source})-[:\`${type}\` ${propsToCypher(props)}]->(v${target})\n`;
            }
        });

        fs.writeFileSync(BACKUP_FILE, cypher);
        console.log(`✅ Backup saved to ${BACKUP_FILE}`);
        console.log(`   Size: ${(fs.statSync(BACKUP_FILE).size / 1024).toFixed(2)} KB`);

    } catch (error) {
        console.error('❌ Backup failed:', error);
        process.exit(1);
    } finally {
        await session.close();
        await driver.close();
    }
}

backup();
