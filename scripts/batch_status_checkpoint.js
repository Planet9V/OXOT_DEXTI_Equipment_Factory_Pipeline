
const fs = require('fs');
const path = require('path');
const neo4j = require('neo4j-driver');

// 1. Config
const MEMGRAPH_URI = process.env.MEMGRAPH_URI || 'bolt://localhost:7687';
const SOURCE_FILE = path.join(process.cwd(), 'src/app/wiki/docs/equipment_to_be_initially_processed_2026_2_13.md');

async function main() {
    const driver = neo4j.driver(MEMGRAPH_URI, neo4j.auth.basic('', ''));
    const session = driver.session();

    try {
        // 2. Parse Source File
        console.log(`[Checkpoint] Reading source: ${SOURCE_FILE}...`);
        const content = fs.readFileSync(SOURCE_FILE, 'utf-8');
        const lines = content.split('\n');

        // Parse tags identifying the "Short Name" column (index 1)
        const targetTags = lines
            .slice(2) // Skip header
            .filter(line => line.trim().startsWith('|'))
            .map(line => {
                const parts = line.split('|').map(s => s.trim());
                return parts[1]; // Short Name
            })
            .filter(tag => tag && tag !== 'Short Name' && !tag.includes('---'));

        const totalTargets = targetTags.length;
        console.log(`[Checkpoint] Total Targets in File: ${totalTargets}`);

        // 3. Query Database
        // We break into chunks if needed, but 419 is small enough for one query.
        console.log(`[Checkpoint] Querying Memgraph for ${totalTargets} tags...`);

        const cypher = `
      MATCH (e:Equipment)
      WHERE e.tag IN $tags
      RETURN count(e) as count, collect(e.tag) as foundTags
    `;

        const result = await session.run(cypher, { tags: targetTags });
        const record = result.records[0];

        const count = record.get('count').toNumber ? record.get('count').toNumber() : record.get('count');
        const foundTags = record.get('foundTags');

        // 4. Report
        const percent = ((count / totalTargets) * 100).toFixed(1);
        const missing = totalTargets - count;

        console.log('\n=== PIPELINE CHECKPOINT STATUS ===');
        console.log(`Target List Size:   ${totalTargets}`);
        console.log(`Completed in DB:    ${count}`);
        console.log(`Remaining:          ${missing}`);
        console.log(`Progress:           ${percent}%`);
        console.log('==================================');

        if (missing > 0 && missing < 5) {
            // If almost done, maybe list what's left
            const foundSet = new Set(foundTags);
            const missingTags = targetTags.filter(t => !foundSet.has(t));
            console.log('Missing items:', missingTags);
        }

    } catch (err) {
        console.error('[Checkpoint] Error:', err);
    } finally {
        await session.close();
        await driver.close();
    }
}

main();
