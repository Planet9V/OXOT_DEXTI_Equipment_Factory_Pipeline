# TS-001 — Unit Tests (Jest)

| Field | Value |
|-------|-------|
| **ID** | TS-001 |
| **Type** | Automated |
| **Runner** | Jest via `npm test` |
| **Estimated Duration** | < 30 seconds |

## Description

Executes the full Jest unit test suite covering all core library modules:
Memgraph connection, graph schema, sector taxonomy, equipment CRUD,
pipeline batch processing, agent orchestration, and export functions.

## Pre-Conditions

| # | Condition | Check Command |
|---|-----------|---------------|
| 1 | Node.js 18+ installed | `node --version` |
| 2 | Dependencies installed | `npm install` (if `node_modules/` missing) |
| 3 | No Docker required | Tests use mocked Memgraph driver |

> **Note**: Memgraph does NOT need to be running. All database calls are mocked via `jest.mock('neo4j-driver')`.

## When to Use

- **Before every commit** — validates no regressions
- **After modifying** `src/lib/*.ts` — ensures core logic is correct
- **After adding new sector files** in `src/lib/sectors/` — taxonomy validation
- **CI/CD pipeline** — required gate before merge

## Steps

### Run All Tests

```bash
npm test
```

### Run Specific Test File

```bash
npm test -- tests/memgraph.test.ts
npm test -- tests/sectors.test.ts
npm test -- tests/graph-schema.test.ts
```

### Run With Coverage

```bash
npm test -- --coverage
```

Coverage output will appear in `coverage/` directory.

### Run in Watch Mode (Development)

```bash
npm test -- --watch
```

## Expected Results

```
PASS  tests/sectors.test.ts
PASS  tests/memgraph.test.ts
PASS  tests/graph-schema.test.ts
PASS  tests/equipment-standalone.test.ts
PASS  tests/pipeline-batch.test.ts
PASS  tests/pipeline-connectivity.test.ts
PASS  tests/pipeline-stages.test.ts
PASS  tests/pipeline-graph-writes.test.ts
PASS  tests/pipeline-e2e.test.ts
...

Test Suites: 15 passed, 15 total
Tests:       194 passed, 194 total
```

## Failure Actions

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| `Cannot find module '@/lib/...'` | Missing `moduleNameMapper` in jest config | Verify `jest.config.js` has `'^@/(.*)$': '<rootDir>/src/$1'` |
| `SECTORS.toHaveLength(16)` fails | New sector added without updating `index.ts` | Add export to `src/lib/sectors/index.ts` |
| Timeout errors | Async test missing `await` | Check for missing `async/await` |
