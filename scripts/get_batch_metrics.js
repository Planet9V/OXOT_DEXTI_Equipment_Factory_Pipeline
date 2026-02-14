
const neo4j = require('neo4j-driver');
const fs = require('fs');
const path = require('path');

const driver = neo4j.driver(
    process.env.MEMGRAPH_URI || 'bolt://localhost:7687',
    neo4j.auth.basic(process.env.MEMGRAPH_USER || '', process.env.MEMGRAPH_PASSWORD || '')
);

async function getMetrics() {
    const session = driver.session();
    try {
        // 1. Database Metrics
        const countResult = await session.run(
            `MATCH (e:Equipment:OX_DEXPI2) 
             RETURN count(e) as total, avg(e.validationScore) as avgScore`
        );

        const totalProcessed = countResult.records[0].get('total').toNumber();
        const avgScore = countResult.records[0].get('avgScore') || 0;

        // 2. Log Analysis
        const logPath = path.join(__dirname, '../logs/audit_batch.log');
        let errorCount = 0;
        let batchTimes = [];

        if (fs.existsSync(logPath)) {
            const logContent = fs.readFileSync(logPath, 'utf-8');
            const lines = logContent.split('\n');

            // Count errors
            errorCount = lines.filter(l => l.includes('Error') || l.includes('Exception')).length;

            // Estimate time per batch (diff between "Batch submitted" logs if timestamps exist, 
            // but the python script output doesn't seem to have timestamps in the print statements.
            // We can perhaps infer from the "Status: completed" lines if we had them with time.)
            // The python script prints "Batch submitted..." then polls. 
            // We can look for "Batch finished with status: completed" and count them.
            // The polling interval is 2s. 
            // Let's count completed batches.
            const completedBatches = lines.filter(l => l.includes('Batch finished with status: completed')).length;

            // Total items is roughly completedBatches * 10 (chunk size)
            // We can compare this with DB count.

            console.log(JSON.stringify({
                db: {
                    totalProcessed,
                    avgScore: Math.round(avgScore * 10) / 10,
                },
                logs: {
                    completedBatches,
                    estimatedItemsFromLogs: completedBatches * 10,
                    errorCount
                }
            }, null, 2));

        } else {
            console.log(JSON.stringify({ error: "Log file not found" }));
        }

    } catch (error) {
        console.error('Metrics failed:', error);
    } finally {
        await session.close();
        await driver.close();
    }
}

getMetrics();
