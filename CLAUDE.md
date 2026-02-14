# CLAUDE.md — Project Instructions for Claude Code

> This file provides project context for Claude Code (claude.ai/code) agents.

## Project Overview

**OXOT DEXPI Equipment Factory Pipeline** — A Docker-based Next.js 14 application
that generates, validates, and manages DEXPI 2.0 industrial equipment records
across all 16 CISA critical infrastructure sectors, backed by a Memgraph graph database.

## Architecture

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Next.js API routes, Memgraph (Bolt on port 7687), Google Gemini AI
- **Storage**: File-based JSON (`/data/`), Graph DB (Memgraph), Docker volumes
- **Testing**: Jest + ts-jest (`tests/`), manual procedures (`Test_Suite/`)

## Key Directories

| Path | Purpose |
|------|---------|
| `src/lib/sectors/*.ts` | **Source of truth** for 16 CISA sector taxonomy |
| `src/lib/graph-schema.ts` | Memgraph schema, indexes, seed functions |
| `src/lib/memgraph.ts` | Connection singleton with retry + circuit breaker |
| `src/app/api/` | API route handlers |
| `src/app/wiki/` | TOGAF reference architecture wiki pages |
| `tests/` | Jest unit test files |
| `Test_Suite/` | Test procedures (see below) |
| `scripts/` | Maintenance scripts (audit, backfill, backup) |
| `docs/` | Documentation (naming convention, etc.) |

## Code Standards

1. **No code in `main.py`** — all code goes in `src/` (modular files)
2. **Google-style docstrings** on all public methods and exported functions
3. **`try/catch`** wrapping for all external API calls (retry up to 3×)
4. **Sector codes** must be short codes (`CHEM`, `ENER`) per `docs/NAMING_CONVENTION.md`
5. **Tailwind CSS** for all styling — no raw CSS
6. **Conventional Commits** — `feat:`, `fix:`, `docs:`, etc.

## Test Suite

**Location**: [`Test_Suite/`](Test_Suite/README.md)

Before shipping code, run the relevant test procedure:

| Change Type | Run These |
|-------------|-----------|
| Any `src/lib/` change | TS-001 (Unit Tests) |
| Schema / graph changes | TS-001 + TS-002 (Graph Integrity) |
| API route changes | TS-001 + TS-003 (API Smoke) |
| Docker / volume changes | TS-004 (Persistence) |
| Coverage API changes | TS-005 (Coverage Accuracy) |
| Pipeline / agent changes | TS-001 + TS-006 (Pipeline E2E) |

Quick run:
```bash
npm test              # TS-001 — Jest unit tests
```

## Naming Convention

Sector codes follow `SECTOR-SUBSECTOR-FACILITY` pattern.
See `docs/NAMING_CONVENTION.md` for the canonical reference.

## Dependencies

Only use libraries listed in `package.json`. If a new library is needed, ask the user first.
