# TS-002 — Graph Data Integrity

| Field | Value |
|-------|-------|
| **ID** | TS-002 |
| **Type** | Script (automated via Node.js) |
| **Runner** | `node scripts/memgraph_audit.js` |
| **Estimated Duration** | < 10 seconds |

## Description

Validates the structural integrity of the Memgraph knowledge graph by checking:
- Total node and relationship counts
- Label consistency (all 16 CISA sectors present)
- Sector code correctness (short codes match taxonomy)
- Equipment nodes have required properties
- Index existence

## Pre-Conditions

| # | Condition | Check Command |
|---|-----------|---------------|
| 1 | Docker running | `docker ps` |
| 2 | Memgraph container healthy | `docker inspect dexpi-memgraph --format='{{.State.Health.Status}}'` → `healthy` |
| 3 | Port 7687 accessible | `curl -s bolt://localhost:7687 || echo "port open"` |

## When to Use

- **After container restart** — verify persistence worked
- **After running backfill/migration scripts** — confirm data integrity
- **After schema changes** to `graph-schema.ts` — verify no corruption
- **Weekly health check** — scheduled verification

## Steps

### Step 1 — Run Audit Script

```bash
node scripts/memgraph_audit.js
```

### Step 2 — Verify Expected Counts

Check the output against these baseline numbers:

| Metric | Expected | Check |
|--------|----------|-------|
| Total Nodes | ≥ 588 | Should not decrease |
| Equipment Nodes | ≥ 419 | Must match audit list |
| Sector Nodes | 16 | Exactly 16 CISA sectors |
| SubSector Nodes | 68 | All taxonomy subsectors |
| Facility Nodes | 84 | All taxonomy facilities |
| CONTAINS_EQUIPMENT rels | ≥ 416 | Equipment→Facility links |
| HAS_FACILITY rels | 84 | SubSector→Facility links |
| HAS_SUBSECTOR rels | 68 | Sector→SubSector links |

### Step 3 — Verify Sector Codes

```bash
node scripts/diagnose_null_sectors.js
```

**Pass Criteria**: Output should show 0 entries (no NULL sectors).

### Step 4 — Verify Naming Convention

Check that all sector values use short codes (e.g. `CHEM`, not `CHEMICAL`):

```bash
node -e "
const neo4j = require('neo4j-driver');
const d = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('',''));
const s = d.session();
s.run('MATCH (e:Equipment) RETURN DISTINCT e.sector AS s ORDER BY s')
  .then(r => { r.records.forEach(rec => console.log(rec.get('s'))); s.close(); d.close(); });
"
```

**Pass Criteria**: All values are 4-character short codes (see `docs/NAMING_CONVENTION.md`).

## Expected Results

```
=== MEMGRAPH DATABASE AUDIT ===
[1] Total Nodes: 588
[2] Nodes by Label:
  Equipment: 419
  Sector: 16
  SubSector: 68
  Facility: 84
...
=== AUDIT COMPLETE ===
```

## Failure Actions

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| Connection refused | Memgraph not running | `docker compose up -d` |
| Equipment < 419 | Data loss after restart | Run `node scripts/populate_graph.js` |
| NULL sectors found | New equipment added without sector | Run `node scripts/backfill_sectors_v2.js` then `node scripts/fix_sector_codes.js` |
| Long sector names | Migration script not run | Run `node scripts/fix_sector_codes.js` |
