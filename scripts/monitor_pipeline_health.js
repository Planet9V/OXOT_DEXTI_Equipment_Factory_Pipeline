
const neo4j = require('neo4j-driver');
const fs = require('fs');
const path = require('path');

const driver = neo4j.driver(
    process.env.MEMGRAPH_URI || 'bolt://localhost:7687',
    neo4j.auth.basic(process.env.MEMGRAPH_USER || '', process.env.MEMGRAPH_PASSWORD || '')
);

async function monitorHealth() {
    const session = driver.session();
    try {
        console.log("=== Pipeline Health Check ===");
        console.log(`Time: ${new Date().toISOString()}`);

        // 1. Valid Inventory Count
        const countResult = await session.run(
            `MATCH (e:Equipment:OX_DEXPI2) 
             RETURN count(e) as total`
        );
        const totalProcessed = countResult.records[0].get('total').toNumber();

        console.log(`\n[Inventory]`);
        console.log(`- Total Valid Items: ${totalProcessed}`);

        // 2. Recent Activity (Last 10 mins) - approx via logs or updated timestamps if possible
        // querying nodes updated recently
        const recentResult = await session.run(
            `MATCH (e:Equipment:OX_DEXPI2) 
              WHERE e.updatedAt > (timestamp() - 600000)
              RETURN count(e) as recent`
        );
        const recentCount = recentResult.records[0].get('recent').toNumber();
        console.log(`- Items Processed (Last 10m): ${recentCount}`);
        console.log(`- Throughput: ${(recentCount / 10).toFixed(2)} items/min`);

        // 3. Log Analysis
        const logPath = path.join(__dirname, '../logs/audit_batch.log');
        let errors = [];

        if (fs.existsSync(logPath)) {
            const logs = fs.readFileSync(logPath, 'utf-8').split('\n');
            errors = logs.filter(l => l.includes('Error') || l.includes('Exception'));
            const recentErrors = errors.slice(-5); // Last 5 errors

            console.log(`\n[System Logs]`);
            console.log(`- Log File: ${logPath}`);
            console.log(`- Total Errors Found: ${errors.length}`);

            if (recentErrors.length > 0) {
                console.log(`- Recent Errors:`);
                recentErrors.forEach(e => console.log(`  > ${e.substring(0, 100)}...`));
            } else {
                console.log(`- Recent Errors: None`);
            }
        } else {
            console.log(`\n[System Logs] Log file not found.`);
        }

        // 4. Status Interpretation
        let status = 'HEALTHY';
        if (typeof errors !== 'undefined' && errors.length > 10) status = 'DEGRADED';
        if (recentCount === 0 && totalProcessed < 5000) status = 'STALLED';

        console.log(`\n[Overall Status]: ${status}`);

    } catch (error) {
        console.error('Health Check Failed:', error);
    } finally {
        await session.close();
        await driver.close();
    }
}

monitorHealth();
