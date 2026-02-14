/**
 * Graph Population Script with Checkpoint/Resume.
 *
 * Populates the Memgraph graph database with the full CISA sector taxonomy:
 * Sector → SubSector → Facility → Equipment hierarchy.
 *
 * Uses MERGE for idempotent writes (safe to re-run).
 * Tracks progress in a checkpoint file so it resumes from where it left off
 * if the process is interrupted.
 *
 * Usage:
 *   node scripts/populate_graph.js              # Full population
 *   node scripts/populate_graph.js --dry-run    # Preview without writing
 *   node scripts/populate_graph.js --sector CHEM  # Process one sector
 *   node scripts/populate_graph.js --reset      # Clear checkpoint and restart
 *
 * @module scripts/populate_graph
 */

const neo4j = require('neo4j-driver');
const fs = require('fs');
const path = require('path');

// ── Config ──
const URI = process.env.MEMGRAPH_URI || 'bolt://localhost:7687';
const CHECKPOINT_FILE = path.join(process.cwd(), 'data', 'populate_checkpoint.json');
const SECTOR_DIR = path.join(process.cwd(), 'src', 'lib', 'sectors');

// ── CLI Args ──
const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const RESET = args.includes('--reset');
const SECTOR_FILTER = args.includes('--sector') ? args[args.indexOf('--sector') + 1] : null;

/**
 * Loads checkpoint state from disk.
 *
 * @returns {Object} checkpoint state or empty default
 */
function loadCheckpoint() {
    if (RESET) {
        console.log('[Checkpoint] Reset requested — starting fresh.');
        return { completedSectors: [], totalWritten: 0, startedAt: new Date().toISOString() };
    }

    try {
        if (fs.existsSync(CHECKPOINT_FILE)) {
            const data = JSON.parse(fs.readFileSync(CHECKPOINT_FILE, 'utf-8'));
            console.log(`[Checkpoint] Resuming from checkpoint. ${data.completedSectors?.length || 0} sectors already done.`);
            return data;
        }
    } catch (err) {
        console.warn('[Checkpoint] Could not read checkpoint, starting fresh:', err.message);
    }

    return { completedSectors: [], totalWritten: 0, startedAt: new Date().toISOString() };
}

/**
 * Saves checkpoint state to disk.
 *
 * @param {Object} checkpoint - The current checkpoint state
 */
function saveCheckpoint(checkpoint) {
    try {
        const dir = path.dirname(CHECKPOINT_FILE);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        checkpoint.updatedAt = new Date().toISOString();
        fs.writeFileSync(CHECKPOINT_FILE, JSON.stringify(checkpoint, null, 2));
    } catch (err) {
        console.error('[Checkpoint] Failed to save:', err.message);
    }
}

/**
 * Parses sector TypeScript files to extract the taxonomy.
 *
 * Uses regex to extract the static data structures since we can't
 * import TypeScript directly in a Node.js CJS context.
 *
 * @returns {Array} Array of sector objects
 */
function parseSectorFiles() {
    const sectorFiles = fs.readdirSync(SECTOR_DIR)
        .filter(f => f.endsWith('.ts') && !['index.ts', 'types.ts', 'uris.ts'].includes(f));

    const sectors = [];

    for (const file of sectorFiles) {
        const content = fs.readFileSync(path.join(SECTOR_DIR, file), 'utf-8');

        // Extract sector code and name
        const codeMatch = content.match(/code:\s*['"]([^'"]+)['"]/);
        const nameMatch = content.match(/name:\s*['"]([^'"]+)['"]/);

        if (!codeMatch || !nameMatch) {
            console.warn(`[Parse] Skipping ${file} — no code/name found`);
            continue;
        }

        const sector = { code: codeMatch[1], name: nameMatch[1], subSectors: [] };

        // Extract subSectors using a simplified pattern
        const subSectorBlocks = content.match(/\{\s*code:\s*['"][^'"]+['"],\s*name:\s*['"][^'"]+['"],[\s\S]*?facilities:\s*\[[\s\S]*?\]\s*\}/g) || [];

        for (const block of subSectorBlocks) {
            const ssCode = block.match(/code:\s*['"]([^'"]+)['"]/);
            const ssName = block.match(/name:\s*['"]([^'"]+)['"]/);

            if (!ssCode || !ssName) continue;

            const subSector = { code: ssCode[1], name: ssName[1], facilities: [] };

            // Extract facilities
            const facilityBlocks = block.match(/\{\s*code:\s*['"][^'"]+['"],\s*name:\s*['"][^'"]+['"],\s*equipment:\s*\[[\s\S]*?\]\s*\}/g) || [];

            for (const fb of facilityBlocks) {
                const fCode = fb.match(/code:\s*['"]([^'"]+)['"]/);
                const fName = fb.match(/name:\s*['"]([^'"]+)['"]/);

                if (!fCode || !fName) continue;

                const facility = { code: fCode[1], name: fName[1], equipment: [] };

                // Extract equipment entries
                const equipRegex = /componentClass:\s*['"]([^'"]+)['"]/g;
                let eqMatch;
                while ((eqMatch = equipRegex.exec(fb)) !== null) {
                    facility.equipment.push({ componentClass: eqMatch[1] });
                }

                subSector.facilities.push(facility);
            }

            sector.subSectors.push(subSector);
        }

        sectors.push(sector);
    }

    return sectors;
}

async function main() {
    console.log('=== Graph Population Script ===');
    console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`);
    if (SECTOR_FILTER) console.log(`Filter: ${SECTOR_FILTER}`);
    console.log('');

    const checkpoint = loadCheckpoint();
    const sectors = parseSectorFiles();

    console.log(`[Parse] Found ${sectors.length} sectors\n`);

    if (DRY_RUN) {
        let totalEquipment = 0;
        for (const s of sectors) {
            let sCount = 0;
            for (const ss of s.subSectors) {
                for (const f of ss.facilities) {
                    sCount += f.equipment.length;
                }
            }
            totalEquipment += sCount;
            console.log(`  ${s.code} (${s.name}): ${s.subSectors.length} subsectors, ${sCount} equipment`);
        }
        console.log(`\n  Total equipment entries: ${totalEquipment}`);
        console.log('\n[Dry Run] No writes performed.');
        return;
    }

    const driver = neo4j.driver(URI, neo4j.auth.basic('', ''));
    const session = driver.session();

    try {
        for (const sector of sectors) {
            if (SECTOR_FILTER && sector.code !== SECTOR_FILTER) continue;
            if (checkpoint.completedSectors.includes(sector.code)) {
                console.log(`[Skip] ${sector.code} — already completed`);
                continue;
            }

            console.log(`\n[Processing] ${sector.code} — ${sector.name}`);

            // MERGE Sector
            await session.run(`
        MERGE (s:Sector:CriticalInfrastructure {code: $code})
        SET s.name = $name
      `, { code: sector.code, name: sector.name });

            for (const subSector of sector.subSectors) {
                // MERGE SubSector
                await session.run(`
          MERGE (ss:SubSector:IndustrySegment {code: $code})
          SET ss.name = $name
          WITH ss
          MATCH (s:Sector {code: $sectorCode})
          MERGE (s)-[:HAS_SUBSECTOR]->(ss)
        `, { code: subSector.code, name: subSector.name, sectorCode: sector.code });

                for (const facility of subSector.facilities) {
                    // MERGE Facility
                    await session.run(`
            MERGE (f:Facility:PlantSite {code: $code})
            SET f.name = $name
            WITH f
            MATCH (ss:SubSector {code: $ssCode})
            MERGE (ss)-[:HAS_FACILITY]->(f)
          `, { code: facility.code, name: facility.name, ssCode: subSector.code });

                    // MERGE Equipment (batch)
                    if (facility.equipment.length > 0) {
                        await session.run(`
              UNWIND $equipment AS eq
              MATCH (f:Facility {code: $facilityCode})
              MERGE (e:Equipment {componentClass: eq.componentClass, facilityCode: $facilityCode})
              ON CREATE SET
                e.source = 'taxonomy',
                e.sector = $sectorCode,
                e.subSector = $ssCode,
                e.createdAt = timestamp()
              MERGE (f)-[:CONTAINS_EQUIPMENT]->(e)
            `, {
                            equipment: facility.equipment,
                            facilityCode: facility.code,
                            sectorCode: sector.code,
                            ssCode: subSector.code,
                        });

                        checkpoint.totalWritten += facility.equipment.length;
                    }
                }
            }

            // Mark sector complete in checkpoint
            checkpoint.completedSectors.push(sector.code);
            saveCheckpoint(checkpoint);
            console.log(`  ✓ ${sector.code} complete (total written: ${checkpoint.totalWritten})`);
        }

        console.log(`\n=== Population Complete ===`);
        console.log(`Total written: ${checkpoint.totalWritten}`);

    } catch (err) {
        console.error('[Population Error]:', err.message);
        saveCheckpoint(checkpoint); // Save progress even on error
    } finally {
        await session.close();
        await driver.close();
    }
}

main();
