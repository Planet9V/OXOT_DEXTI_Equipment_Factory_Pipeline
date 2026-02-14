# AGENTS.md — Project Instructions for AI Agents

> This file provides project context for AI coding agents (Gemini, Copilot, etc.).
> For Claude-specific instructions, see `CLAUDE.md`.

## Project Overview

**OXOT DEXPI Equipment Factory Pipeline** — Docker-based Next.js 14 app for generating,
validating, and managing DEXPI 2.0 industrial equipment records across all 16 CISA sectors.
Backed by Memgraph graph DB, powered by Google Gemini AI.

## Architecture

```
Next.js 14 (App Router) → API Routes → Memgraph (Bolt:7687)
                                      → File Storage (/data/)
                                      → Google Gemini AI
```

## Key Rules

1. **Modular code** — no monolithic files, use `src/lib/` modules
2. **Tests required** — every new function gets a test in `tests/`
3. **Short sector codes** — use `CHEM` not `CHEMICAL` (see `docs/NAMING_CONVENTION.md`)
4. **Tailwind CSS only** — no raw CSS classes
5. **Google-style docstrings** on all exports
6. **Conventional Commits** — `feat:`, `fix:`, `docs:`
7. **Approved deps only** — only use libraries from `package.json`

## Key Files

| File | Purpose |
|------|---------|
| `src/lib/sectors/*.ts` | Source of truth for 16 CISA sector taxonomy |
| `src/lib/graph-schema.ts` | Graph schema, indexes, seed hierarchy |
| `src/lib/memgraph.ts` | DB connection with retry + circuit breaker
| `docs/NAMING_CONVENTION.md` | Canonical sector code reference |
| `jest.config.js` | Test runner config |

## Test Suite

**Location**: `Test_Suite/README.md`

| ID | Name | Type | When to Run |
|----|------|------|-------------|
| TS-001 | Unit Tests | `npm test` | Before every commit |
| TS-002 | Graph Integrity | Script | After DB/schema changes |
| TS-003 | API Smoke Tests | curl | After API route changes |
| TS-004 | Persistence | Manual | After Docker config changes |
| TS-005 | Coverage Accuracy | Script | After coverage API changes |
| TS-006 | Pipeline E2E | Manual | After pipeline/agent changes |

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Yes | Google Gemini API key |
| `DATA_DIR` | No | Data directory (default: `./data`) |
| `MEMGRAPH_HOST` | No | Memgraph host (default: `127.0.0.1`) |
| `MEMGRAPH_PORT` | No | Memgraph port (default: `7687`) |
