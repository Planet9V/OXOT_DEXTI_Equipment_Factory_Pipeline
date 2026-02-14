# TS-006 — Pipeline End-to-End Test

| Field | Value |
|-------|-------|
| **ID** | TS-006 |
| **Type** | Manual / Semi-automated |
| **Runner** | Human operator via browser + terminal |
| **Estimated Duration** | 5–15 minutes |

## Description

Validates the full AI pipeline cycle: user submits an equipment generation
request via the Pipeline page, the system processes it through all 5 stages
(Research → Generate → Validate → Catalog → Store), and the resulting
equipment card appears in the graph database and coverage report.

## Pre-Conditions

| # | Condition | Check Command |
|---|-----------|---------------|
| 1 | Dev server running | `http://localhost:3000` loads |
| 2 | Memgraph healthy | `docker inspect dexpi-memgraph --format='{{.State.Health.Status}}'` |
| 3 | `GEMINI_API_KEY` set | Check `.env.local` contains valid key |
| 4 | API smoke tests pass | Run TS-003 first |
| 5 | Internet access | Required for Gemini API calls |

> **⚠️ Cost Notice**: Each pipeline run makes Gemini API calls which may incur charges.

## When to Use

- **After modifying pipeline code** (`pipeline.ts`, `pipeline-v2.ts`)
- **After changing agent prompts** (`src/lib/agents/`)
- **After Gemini API key rotation** — validate authentication
- **Pre-release smoke test** — full stack validation

## Steps

### Step 1 — Open Pipeline Page

Navigate to `http://localhost:3000/pipeline` in browser.

### Step 2 — Configure Run

1. **Sector**: Select `CHEM` (Chemical)
2. **Sub-Sector**: Select `CHEM-BC` (Basic Chemicals)
3. **Facility**: Select `CHEM-BC-PETRO` (Petrochemical Complex)
4. **Equipment Class**: Enter `CentrifugalPump`
5. **Quantity**: `1`

### Step 3 — Submit

Click **Run Pipeline**. The pipeline status card should appear showing stages 1–5.

### Step 4 — Monitor Progress

- Stage 1 (Research): 10–30 seconds
- Stage 2 (Generate): 10–30 seconds
- Stage 3 (Validate): < 5 seconds
- Stage 4 (Catalog): < 5 seconds
- Stage 5 (Store): < 5 seconds

### Step 5 — Verify in Database

```bash
node -e "
const neo4j = require('neo4j-driver');
const d = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('',''));
const s = d.session();
s.run('MATCH (e:Equipment {componentClass: \"CentrifugalPump\", facilityCode: \"CHEM-BC-PETRO\"}) RETURN e.tag, e.displayName, e.validationScore ORDER BY e.updatedAt DESC LIMIT 3')
  .then(r => { r.records.forEach(rec => console.log(rec.get('e.tag'), rec.get('e.displayName'), rec.get('e.validationScore')?.toString())); s.close(); d.close(); });
"
```

### Step 6 — Verify in Coverage

```bash
curl -sf 'http://localhost:3000/api/coverage?sector=CHEM' | python3 -c "
import sys, json
d = json.load(sys.stdin)
petro = [r for r in d['data']['reports'] if r['facility'] == 'CHEM-BC-PETRO'][0]
print(f'PETRO coverage: {petro[\"coveragePercent\"]}%')
print(f'Equipment count: {petro[\"equipmentCount\"]}')
assert 'CentrifugalPump' in petro['existingTypes'], 'CentrifugalPump not found!'
print('✓ PASS — CentrifugalPump in coverage')
"
```

## Expected Results

| Check | Expected |
|-------|----------|
| Pipeline completes | All 5 stages show ✓ green |
| Equipment in DB | `CentrifugalPump` node exists with facilityCode `CHEM-BC-PETRO` |
| Validation score | ≥ 50 |
| Coverage updated | `CentrifugalPump` appears in existing types |

## Failure Actions

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| Stage 1 fails | Invalid/expired API key | Check `.env.local` `GEMINI_API_KEY` |
| Stage 3 rejects | Schema validation failure | Check Zod schema in `validation.ts` |
| Equipment missing from DB | Facility code mismatch | Verify sector codes match `docs/NAMING_CONVENTION.md` |
| Timeout | Gemini rate limit | Wait 60s and retry |
