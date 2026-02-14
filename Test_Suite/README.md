# Test Suite — Master Index

> **Location**: `Test_Suite/`
> **Runner**: Jest (`npm test`) for unit tests, manual scripts for integration/E2E
> **Convention**: All procedures use `TS-NNN_snake_case.md` naming

## Quick Start

```bash
# Run all unit tests (TS-001)
npm test

# Run a single test file
npm test -- tests/memgraph.test.ts

# Run with coverage report
npm test -- --coverage
```

## Naming Convention

| Pattern | Meaning |
|---------|---------|
| `TS-001` – `TS-099` | Unit / Component tests (automated) |
| `TS-100` – `TS-199` | Integration tests (requires Docker) |
| `TS-200` – `TS-299` | End-to-End tests (requires full stack) |

Each procedure file contains:
- **Description** — What this test validates
- **Pre-Conditions** — What must be running or configured before executing
- **When to Use** — Trigger events that require this test
- **Steps** — Exact commands or browser actions
- **Expected Results** — Pass/fail criteria

## Test Procedures

| ID | Name | Type | Pre-Conditions |
|----|------|------|----------------|
| [TS-001](TS-001_unit_tests.md) | Unit Tests (Jest) | Automated | `npm install` |
| [TS-002](TS-002_graph_integrity.md) | Graph Data Integrity | Script | Docker + Memgraph running |
| [TS-003](TS-003_api_smoke_tests.md) | API Smoke Tests | Script | Dev server running |
| [TS-004](TS-004_persistence_validation.md) | Docker Persistence | Manual | Docker Compose running |
| [TS-005](TS-005_coverage_accuracy.md) | Coverage Accuracy | Script | Dev server + Memgraph |
| [TS-006](TS-006_pipeline_e2e.md) | Pipeline End-to-End | Manual | Full stack + API key |

## Pre-Condition Reference

| Condition | How to Satisfy |
|-----------|---------------|
| `npm install` | `cd OXOT_DEXTI_Equipment_Factory_Pipeline && npm install` |
| Docker running | `docker compose up -d` |
| Memgraph running | Container `dexpi-memgraph` healthy on port 7687 |
| Dev server running | `npm run dev` → `http://localhost:3000` |
| API key set | `GEMINI_API_KEY` in `.env.local` |

## Existing Jest Test Files

| File | Covers |
|------|--------|
| `tests/memgraph.test.ts` | Connection singleton, retry, circuit breaker, batch write |
| `tests/graph-schema.test.ts` | Schema init, indexes, seed hierarchy |
| `tests/sectors.test.ts` | 16 CISA sector taxonomy, codes, fields, aggregates |
| `tests/equipment-standalone.test.ts` | CRUD, assignments, standalone equipment |
| `tests/pipeline-batch.test.ts` | Batch processing, chunking, rate limits |
| `tests/pipeline-agents.test.ts` | Agent stage orchestration |
| `tests/agent.test.ts` | Individual agent unit tests |
| `tests/agents/specialist-agents.test.ts` | Specialist agent variants |
| `tests/dexpi-export.test.ts` | DEXPI XML export |
| `tests/obsidian-export.test.ts` | Obsidian markdown export |
| `tests/pca-sparql.test.ts` | POSC Caesar SPARQL queries |

## Related Documentation

- [Naming Convention](../docs/NAMING_CONVENTION.md) — Canonical sector codes used in tests
- [README.md](../README.md) — Project overview and API reference
- [CLAUDE.md](../CLAUDE.md) — Agent instructions (references this Test Suite)
- [AGENTS.md](../AGENTS.md) — Generic agent instructions
