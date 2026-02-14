# TS-003 — API Smoke Tests

| Field | Value |
|-------|-------|
| **ID** | TS-003 |
| **Type** | Script (curl-based) |
| **Runner** | Bash / Terminal |
| **Estimated Duration** | < 1 minute |

## Description

Hits every major API endpoint and verifies each returns a success response
with valid JSON. Catches connection errors, 500s, and malformed responses.

## Pre-Conditions

| # | Condition | Check Command |
|---|-----------|---------------|
| 1 | Dev server running | `curl -s http://localhost:3000/api/tree \| head -1` → `{` |
| 2 | Memgraph running | `docker inspect dexpi-memgraph --format='{{.State.Health.Status}}'` |
| 3 | Schema initialized | At least 1 sector exists in DB |

## When to Use

- **After deploying new API routes** — validates endpoints are live
- **After updating `graph-schema.ts`** — ensures API can query the graph
- **After Docker restart** — confirms full stack is healthy
- **Before running TS-006 pipeline E2E** — validates API layer is functional

## Steps

Run each command and verify the output matches the expected results.

### Core Endpoints

```bash
# 1. Health check — must return JSON tree
curl -sf http://localhost:3000/api/tree | python3 -m json.tool | head -5

# 2. Sectors — must return 16 sectors
curl -sf http://localhost:3000/api/sectors | python3 -c "
import sys,json; d=json.load(sys.stdin)
print(f'Sectors: {len(d.get(\"data\",[]))}')
assert len(d.get('data',[])) == 16, 'Expected 16 sectors'
print('✓ PASS')
"

# 3. Coverage — must return success:true with reports
curl -sf http://localhost:3000/api/coverage | python3 -c "
import sys,json; d=json.load(sys.stdin)
assert d.get('success') == True, f'Expected success:true, got {d}'
print(f'Reports: {len(d[\"data\"][\"reports\"])}')
print(f'Coverage: {d[\"data\"][\"summary\"][\"overallCoverage\"]}%')
print('✓ PASS')
"

# 4. Equipment search — must return paginated results
curl -sf 'http://localhost:3000/api/equipment?page=1' | python3 -c "
import sys,json; d=json.load(sys.stdin)
print(f'Equipment returned: {len(d.get(\"data\",[]))}')
print('✓ PASS')
"

# 5. Pipeline list — must return array
curl -sf http://localhost:3000/api/pipeline | python3 -c "
import sys,json; d=json.load(sys.stdin)
print(f'Pipeline runs: {len(d.get(\"data\",[]))}')
print('✓ PASS')
"
```

### Coverage Filtered

```bash
# Filter by sector
curl -sf 'http://localhost:3000/api/coverage?sector=CHEM' | python3 -c "
import sys,json; d=json.load(sys.stdin)
reports = d['data']['reports']
assert all(r['sector']=='CHEM' for r in reports), 'Filter broken'
print(f'CHEM reports: {len(reports)}')
print('✓ PASS')
"
```

## Expected Results

All commands should print `✓ PASS`. No `500`, `404`, or connection refused errors.

## Failure Actions

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| `Connection refused` | Dev server not running | `npm run dev` |
| `500 Internal Server Error` | Memgraph down or schema not initialized | `docker compose up -d`, then visit `http://localhost:3000` |
| `success: false` | API code bug | Check server console logs |
| Sectors ≠ 16 | `getAllSectors()` missing exports | Verify `src/lib/sectors/index.ts` |
