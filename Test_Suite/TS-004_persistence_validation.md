# TS-004 — Docker Persistence Validation

| Field | Value |
|-------|-------|
| **ID** | TS-004 |
| **Type** | Manual |
| **Runner** | Human operator |
| **Estimated Duration** | 5–10 minutes |

## Description

Validates that all data persists across Docker container restarts and rebuilds.
Covers Memgraph graph data, application file storage, and log volumes.

## Pre-Conditions

| # | Condition | Check Command |
|---|-----------|---------------|
| 1 | Docker Compose running | `docker compose ps` → both services `Up` |
| 2 | Graph populated | `node scripts/memgraph_audit.js` → Equipment ≥ 419 |
| 3 | App data exists | `docker exec dexpi-equipment-factory ls /data/sectors` |

## When to Use

- **After modifying `docker-compose.yml`** — verify volume mounts
- **After upgrading Memgraph image** — confirm snapshot recovery
- **After adding persistence flags** — validate they take effect
- **Before production deployment** — mandatory validation

## Steps

### Step 1 — Record Baseline

```bash
# Record current node count
node -e "
const neo4j = require('neo4j-driver');
const d = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('',''));
const s = d.session();
s.run('MATCH (n) RETURN count(n) AS cnt')
  .then(r => { console.log('BEFORE:', r.records[0].get('cnt').toString()); s.close(); d.close(); });
"
```

Write down the count: `BEFORE: ___`

### Step 2 — Restart Containers

```bash
docker compose down
docker compose up -d
```

Wait for health checks to pass (30–60 seconds):

```bash
docker compose ps   # Both services should show "healthy"
```

### Step 3 — Verify Data Survived

```bash
# Same query as Step 1
node -e "
const neo4j = require('neo4j-driver');
const d = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('',''));
const s = d.session();
s.run('MATCH (n) RETURN count(n) AS cnt')
  .then(r => { console.log('AFTER:', r.records[0].get('cnt').toString()); s.close(); d.close(); });
"
```

### Step 4 — Verify App Data

```bash
docker exec dexpi-equipment-factory ls /data/sectors | head -5
```

### Step 5 — Verify Volumes

```bash
docker volume ls | grep -E "memgraph|dexpi|app-logs"
```

**Pass Criteria**: All 4 volumes exist:
- `oxot_dexti_equipment_factory_pipeline_memgraph-data`
- `oxot_dexti_equipment_factory_pipeline_memgraph-log`
- `oxot_dexti_equipment_factory_pipeline_dexpi-data`
- `oxot_dexti_equipment_factory_pipeline_app-logs`

## Expected Results

| Check | Expected |
|-------|----------|
| BEFORE count | ≥ 588 |
| AFTER count | Same as BEFORE (± 0) |
| App `/data/sectors` | Lists sector directories |
| 4 Docker volumes | All present |

## Failure Actions

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| AFTER < BEFORE | Memgraph persistence flags missing | Verify `docker-compose.yml` has `--storage-recover-on-startup=true` |
| No `/data/sectors` | Volume not mounted | Verify `dexpi-data:/data` in compose |
| Missing volumes | Compose config broken | Run `docker compose config` to validate |
