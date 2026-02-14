
const { runQuery } = require('./src/lib/memgraph');
const { getDriver } = require('./src/lib/memgraph');

async function checkProgress() {
    try {
        const result = await runQuery('MATCH (n:Equipment) RETURN count(n) as count');
        console.log('Total Equipment Count:', result[0].count.toNumber ? result[0].count.toNumber() : result[0].count);
    } catch (err) {
        console.error('Error:', err);
    } finally {
        const driver = getDriver();
        await driver.close();
    }
}

checkProgress();
