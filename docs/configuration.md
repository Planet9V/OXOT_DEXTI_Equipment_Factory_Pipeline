# Configuration Reference

[← Back to Index](./index.md)

> All environment variables, API keys, and service settings.

---

## Environment Variables

All configuration is via environment variables, typically set in `.env.local` (local dev) or passed via `docker-compose.yml` (Docker).

### Required Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `GEMINI_API_KEY` | — | Google Gemini API key for research agent |
| `OPENROUTER_API_KEY` | — | OpenRouter API key for LLM card generation |

### Optional Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | HTTP port for the Next.js server |
| `DATA_DIR` | `/data` | Data storage directory (sectors, runs, exports) |
| `NODE_ENV` | `development` | Environment mode (`development` / `production`) |
| `MEMGRAPH_HOST` | `memgraph` | Memgraph hostname (use `localhost` for local dev) |
| `MEMGRAPH_PORT` | `7687` | Memgraph Bolt protocol port |
| `PIPELINE_SCHEDULE` | `0 */6 * * *` | Cron expression for automated pipeline runs |
| `NEXT_TELEMETRY_DISABLED` | `1` (Docker) | Disable Next.js telemetry |

---

## API Key Configuration

### Google Gemini

Used by the **Research Agent** for equipment research and analysis.

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Create an API key
3. Set `GEMINI_API_KEY` in `.env.local`

**Usage**: Research stage of the pipeline — gathers standards, specifications, manufacturers, and PCA RDL URIs for equipment classes.

### OpenRouter

Used by the **Generator**, **Compliance**, **Enrichment**, and **Quality Gate** agents.

1. Go to [OpenRouter](https://openrouter.ai/)
2. Create an API key
3. Set `OPENROUTER_API_KEY` in `.env.local`

**Usage**: Card generation, compliance validation, data enrichment, and quality scoring.

---

## Memgraph Configuration

### Connection Settings

| Setting | Docker | Local Dev |
|---------|--------|-----------|
| Host | `memgraph` (service name) | `localhost` |
| Port | `7687` | `7687` |
| Protocol | Bolt | Bolt |
| Auth | None | None |

### Connection Features

The Memgraph client (`src/lib/memgraph.ts`) includes:

- **Singleton driver** — HMR-safe via `globalThis` in dev mode
- **Automatic retry** — 3 retries with exponential backoff
- **Circuit breaker** — Opens after 5 consecutive failures, 30s timeout
- **Batch writes** — Chunked `UNWIND` transactions for bulk imports
- **Health monitoring** — Circuit breaker state exposed via API

### Memgraph Lab

Memgraph Lab (visual graph explorer) is available at `http://localhost:7444` when running via Docker Compose.

---

## Docker Compose Services

### `memgraph` Service

```yaml
image: memgraph/memgraph:latest
platform: linux/amd64          # Required for Apple Silicon
ports:
  - "7687:7687"                # Bolt protocol
  - "7444:7444"                # Memgraph Lab
volumes:
  - memgraph-data:/var/lib/memgraph
healthcheck:
  test: echo 'RETURN 1;' | mgconsole
  interval: 10s
```

### `app` Service

```yaml
build: ./Dockerfile
depends_on: memgraph (healthy)
ports:
  - "${PORT:-3000}:3000"
environment:
  - GEMINI_API_KEY
  - MEMGRAPH_HOST=memgraph
  - MEMGRAPH_PORT=7687
  - PIPELINE_SCHEDULE
volumes:
  - dexpi-data:/data
healthcheck:
  test: wget --spider http://localhost:3000/api/tree
  interval: 30s
```

### Volume Mounts

| Volume | Mount Point | Purpose |
|--------|-------------|---------|
| `memgraph-data` | `/var/lib/memgraph` | Persistent graph data |
| `dexpi-data` | `/data` | Sector cache, pipeline runs, exports |

---

## Pipeline Scheduling

The pipeline can run on a cron schedule via `PIPELINE_SCHEDULE`:

| Schedule | Cron Expression |
|----------|----------------|
| Every 6 hours | `0 */6 * * *` (default) |
| Every hour | `0 * * * *` |
| Daily at midnight | `0 0 * * *` |
| Manual only | Unset the variable |

---

## Data Directory Structure

```
$DATA_DIR/
├── sectors/          ← Cached sector definitions
├── pipeline-runs/    ← Pipeline run artifacts and logs
└── exports/          ← Generated DEXPI XML files
```

---

## Related Pages

- [Installation](./installation.md) — Setup instructions
- [Architecture](./architecture.md) — System architecture
- [Operations](./operations.md) — Health checks and monitoring
- [AI Agents](./agents.md) — How agents use API keys
