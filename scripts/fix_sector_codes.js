/**
 * Fix Sector/SubSector codes to match the canonical taxonomy.
 *
 * The backfill_sectors_v2.js script wrote LONG NAMES (e.g. "CHEMICAL")
 * but the canonical taxonomy uses SHORT CODES (e.g. "CHEM").
 * This script corrects them to ensure consistency with:
 *   - src/lib/sectors/*.ts (taxonomy source of truth)
 *   - api/coverage/route.ts (queries by sector.code)
 *   - graph-schema.ts seedSectorHierarchy (uses sector.code)
 *   - pipeline/page.tsx (dropdown values use sector.code)
 *
 * @module scripts/fix_sector_codes
 */

const neo4j = require('neo4j-driver');
const URI = process.env.MEMGRAPH_URI || 'bolt://localhost:7687';

/**
 * Maps long sector names (from backfill v2) to canonical short codes
 * matching src/lib/sectors/*.ts.
 */
const LONG_TO_SHORT = {
    'CHEMICAL': 'CHEM',
    'ENERGY': 'ENER',
    'NUCLEAR': 'NUCL',
    'WATER': 'WATR',
    'FOOD_AGRICULTURE': 'FOOD',
    'HEALTHCARE': 'HLTH',
    'CRITICAL_MANUFACTURING': 'CMAN',
    'TRANSPORTATION': 'TRAN',
    'INFORMATION_TECHNOLOGY': 'ITEC',
    'FINANCIAL_SERVICES': 'FINA',
    'COMMUNICATIONS': 'COMU',
    'COMMERCIAL_FACILITIES': 'COMM',
    'DAMS': 'DAMS',
    'DEFENSE_INDUSTRIAL_BASE': 'DEFN',
    'GOVERNMENT_FACILITIES': 'GOVT',
    'EMERGENCY_SERVICES': 'EMER',
    // V1 backfill wrote these (partial match)
    'BASIC_CHEMICALS': 'CHEM-BC',
    'SPECIALTY_CHEMICALS': 'CHEM-SC',
    'AGRICULTURAL_CHEMICALS': 'CHEM-AG',
    'PHARMACEUTICALS': 'CHEM-PH',
    'CONSUMER_PRODUCTS': 'CHEM-CP',
    'OIL_GAS': 'ENER-OG',
    'ELECTRIC_GRID': 'ENER-EG',
    'RENEWABLES': 'ENER-RE',
    'NATURAL_GAS': 'ENER-NG',
    'COAL': 'ENER-CL',
    'NUCLEAR_POWER': 'NUCL-PR',
    'FUEL_CYCLE': 'NUCL-NM',
    'WASTE_MANAGEMENT': 'NUCL-RW',
    'RESEARCH_REACTORS': 'NUCL-RR',
    'DRINKING_WATER': 'WATR-DW',
    'WASTEWATER': 'WATR-WW',
    'STORMWATER': 'WATR-SW',
    'FOOD_PROCESSING': 'FOOD-FD',
    'BEVERAGE': 'FOOD-BV',
    'AGRICULTURE': 'FOOD-AN',
    'DISTRIBUTION_STORAGE': 'FOOD-DS',
    'HOSPITALS': 'HLTH-DC',
    'PHARMACEUTICALS_MFG': 'HLTH-LB',
    'MEDICAL_DEVICES': 'HLTH-MD',
    'BLOOD_SUPPLY': 'HLTH-BS',
    'METALS_MACHINERY': 'CMAN-PM',
    'ELECTRICAL_EQUIPMENT': 'CMAN-EE',
    'TRANSPORTATION_EQUIPMENT': 'CMAN-TE',
    'AVIATION': 'TRAN-AV',
    'MARITIME': 'TRAN-MT',
    'RAIL': 'TRAN-RL',
    'PIPELINE': 'TRAN-PL',
    'DATA_CENTERS': 'ITEC-CL',
    'TELECOM': 'COMU-CB',
    'BUILDING_MANAGEMENT': 'COMM-RE',
    'CLEARINGHOUSE': 'FINA-BK',
    'TRADING': 'FINA-SM',
    'COGENERATION': 'ENER-CG',
};

async function main() {
    const driver = neo4j.driver(URI, neo4j.auth.basic('', ''));
    const session = driver.session();

    try {
        console.log('=== Fix Sector Codes (Long → Short) ===\n');

        // 1. Fix sectors
        const sectorRes = await session.run(`
      MATCH (e:Equipment)
      RETURN DISTINCT e.sector AS sector, count(e) AS cnt
      ORDER BY cnt DESC
    `);

        console.log('Current sectors in DB:');
        let fixCount = 0;
        for (const r of sectorRes.records) {
            const sector = r.get('sector');
            const cnt = r.get('cnt').toNumber ? r.get('cnt').toNumber() : r.get('cnt');
            const shortCode = LONG_TO_SHORT[sector];
            const status = shortCode ? `→ ${shortCode}` : (sector && sector.length <= 4 ? '✓ OK' : '⚠ UNKNOWN');
            console.log(`  ${sector}: ${cnt} ${status}`);
            if (shortCode) fixCount += cnt;
        }

        // 2. Apply fixes for sectors
        console.log(`\nFixing ${fixCount} sector values...`);
        for (const [longName, shortCode] of Object.entries(LONG_TO_SHORT)) {
            await session.run(`
        MATCH (e:Equipment) WHERE e.sector = $longName
        SET e.sector = $shortCode
      `, { longName, shortCode });
        }

        // 3. Fix subSectors — use facilityCode prefix
        console.log('Fixing subSector values from facilityCode...');
        await session.run(`
      MATCH (e:Equipment)
      WHERE e.facilityCode IS NOT NULL
        AND size(e.facilityCode) > 4
      WITH e, split(e.facilityCode, '-') AS parts
      WHERE size(parts) >= 2
      SET e.subSector = parts[0] + '-' + parts[1]
    `);

        // 4. Verify
        const verifyRes = await session.run(`
      MATCH (e:Equipment)
      RETURN e.sector AS sector, e.subSector AS subSector, count(e) AS cnt
      ORDER BY cnt DESC
    `);

        console.log('\n--- Final Distribution ---');
        for (const r of verifyRes.records) {
            const s = r.get('sector') || '(null)';
            const ss = r.get('subSector') || '(null)';
            const c = r.get('cnt').toNumber ? r.get('cnt').toNumber() : r.get('cnt');
            console.log(`  ${s} / ${ss}: ${c}`);
        }

        console.log('\n=== Fix Complete ===');
    } catch (err) {
        console.error('[Fix Error]:', err.message);
    } finally {
        await session.close();
        await driver.close();
    }
}

main();
