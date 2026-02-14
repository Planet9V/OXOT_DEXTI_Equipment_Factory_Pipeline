# TS-005 — Coverage Accuracy Validation

| Field | Value |
|-------|-------|
| **ID** | TS-005 |
| **Type** | Script |
| **Runner** | Node.js + curl |
| **Estimated Duration** | < 1 minute |

## Description

Validates that the Coverage API (`/api/coverage`) returns accurate data
that matches both the source taxonomy (`src/lib/sectors/*.ts`) and the
actual graph database state. Catches mismatches between defined sectors
and DB sector codes.

## Pre-Conditions

| # | Condition | Check Command |
|---|-----------|---------------|
| 1 | Dev server running | `curl -s http://localhost:3000/api/tree` |
| 2 | Memgraph healthy | `docker inspect dexpi-memgraph --format='{{.State.Health.Status}}'` |
| 3 | Sector codes are short codes | Run TS-002 first |

## When to Use

- **After modifying `api/coverage/route.ts`** — validate query logic
- **After running sector backfill scripts** — verify coverage matches
- **After adding new equipment** via pipeline — check coverage increases
- **After modifying sector taxonomy** — validate counts update

## Steps

### Step 1 — API vs. DB Cross-Check

```bash
# Get coverage API totals
curl -sf http://localhost:3000/api/coverage | python3 -c "
import sys, json
d = json.load(sys.stdin)
s = d['data']['summary']
print(f'API Total Equipment: {s[\"totalExisting\"]}')
print(f'API Total Facilities: {s[\"totalFacilities\"]}')
print(f'API Coverage: {s[\"overallCoverage\"]}%')
"
```

### Step 2 — Direct DB Count

```bash
node -e "
const neo4j = require('neo4j-driver');
const d = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('',''));
const s = d.session();
s.run('MATCH (e:Equipment:OX_DEXPI2) RETURN count(e) AS cnt')
  .then(r => { console.log('DB Equipment:', r.records[0].get('cnt').toString()); s.close(); d.close(); });
"
```

### Step 3 — Compare

**Pass Criteria**: `API Total Equipment` must equal `DB Equipment` count.

### Step 4 — Sector-Level Spot Check

```bash
# Check CHEM sector specifically
curl -sf 'http://localhost:3000/api/coverage?sector=CHEM' | python3 -c "
import sys, json
d = json.load(sys.stdin)
reports = d['data']['reports']
total_eq = sum(r['equipmentCount'] for r in reports)
total_fac = len(reports)
print(f'CHEM facilities: {total_fac}')
print(f'CHEM equipment: {total_eq}')
for r in reports:
    status = '✓' if r['coveragePercent'] == 100 else f'⚠ {r[\"coveragePercent\"]}%'
    print(f'  {r[\"facility\"]}: {status} ({len(r[\"existingTypes\"])}/{len(r[\"expectedTypes\"])} types)')
"
```

## Expected Results

| Check | Expected |
|-------|----------|
| API Equipment = DB Equipment | Numbers match exactly |
| Coverage % | ≥ 80% overall |
| CHEM spot check | All facilities show 100% |
| All sector codes | 4-char short codes (not long names) |

## Failure Actions

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| API ≠ DB count | Coverage query has wrong filters | Check `e.sector = $filter` in `route.ts` |
| 0% coverage | Sector codes mismatch | Run `node scripts/fix_sector_codes.js` |
| `success: false` | `toNumber` error | See coverage API fix in `route.ts` |
