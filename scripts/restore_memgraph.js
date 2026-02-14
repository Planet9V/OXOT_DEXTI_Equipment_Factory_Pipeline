const neo4j = require('neo4j-driver');
const fs = require('fs');
const path = require('path');

// Configuration
const URI = process.env.MEMGRAPH_URI || 'bolt://localhost:7687';
const USER = process.env.MEMGRAPH_USER || '';
const PASS = process.env.MEMGRAPH_PASSWORD || '';
const BACKUP_FILE = process.argv[2] || 'memgraph_backup.cypher';

const driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASS));

async function restore() {
    const session = driver.session();
    try {
        console.log(`🔌 Connecting to ${URI}...`);

        if (!fs.existsSync(BACKUP_FILE)) {
            console.error(`❌ Backup file not found: ${BACKUP_FILE}`);
            process.exit(1);
        }

        const cypherValues = fs.readFileSync(BACKUP_FILE, 'utf8');
        console.log(`📄 Read backup file: ${(cypherValues.length / 1024).toFixed(2)} KB`);

        console.log('🧹 Clearing database...');
        await session.run('MATCH (n) DETACH DELETE n');

        console.log('⏳ Restoring data (this may take a moment)...');
        // Execute the entire backup file content as a single query
        // This relies on the backup file being a valid single Cypher statement (series of CREATEs)
        await session.run(cypherValues);

        console.log('✅ Restore complete!');

        // Verify count
        const countRes = await session.run('MATCH (n) RETURN count(n) as count');
        console.log(`📊 Nodes in database: ${countRes.records[0].get('count').toNumber()}`);

    } catch (error) {
        console.error('❌ Restore failed:', error);
        process.exit(1);
    } finally {
        await session.close();
        await driver.close();
    }
}

restore();
