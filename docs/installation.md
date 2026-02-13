# Installation Guide

[← Back to Index](./index.md)

> Prerequisites, Docker setup, and local development environment.

---

## Prerequisites

| Requirement | Version | Notes |
|------------|---------|-------|
| **Node.js** | 20 LTS | Required for local development |
| **npm** | 10+ | Bundled with Node.js |
| **Docker** | 24+ | For containerised deployment |
| **Docker Compose** | 2.20+ | Multi-service orchestration |
| **Git** | 2.40+ | Source control |

### Apple Silicon (M-series) Notes

Memgraph runs as `linux/amd64` via Rosetta 2 translation. This is handled automatically in `docker-compose.yml` with `platform: linux/amd64`. No additional configuration required.

---

## Docker Setup (Recommended)

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/OXOT_DEXTI_Equipment_Factory_Pipeline.git
cd OXOT_DEXTI_Equipment_Factory_Pipeline
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your API keys:

```env
GEMINI_API_KEY=your-google-gemini-api-key
OPENROUTER_API_KEY=your-openrouter-api-key
DATA_DIR=/data
PORT=3000
PIPELINE_SCHEDULE=0 */6 * * *
```

See [Configuration](./configuration.md) for full variable reference.

### 3. Start Services

```bash
docker compose up -d
```

This starts two containers:

| Container | Image | Ports |
|-----------|-------|-------|
| `dexpi-memgraph` | `memgraph/memgraph:latest` | 7687 (Bolt), 7444 (Lab) |
| `dexpi-equipment-factory` | Built from Dockerfile | 3000 (HTTP) |

### 4. Verify

```bash
# Check containers are running
docker compose ps

# Check app health
curl http://localhost:3000/api/health

# Check Memgraph
curl http://localhost:3000/api/tree
```

### 5. Initialize Database

The schema auto-initializes on first API request. To force initialization:

```bash
curl -X POST http://localhost:3000/api/init
```

This seeds the CISA sector hierarchy (16 sectors → 68 sub-sectors → 74 facilities) with DEXPI equipment definitions.

---

## Local Development Setup

### 1. Install Dependencies

```bash
npm ci
```

### 2. Start Memgraph Separately

```bash
docker compose up -d memgraph
```

### 3. Configure for Local

Create `.env.local`:

```env
GEMINI_API_KEY=your-key
OPENROUTER_API_KEY=your-key
MEMGRAPH_HOST=localhost
MEMGRAPH_PORT=7687
DATA_DIR=./data
```

### 4. Start Dev Server

```bash
npm run dev
```

The app runs at `http://localhost:3000` with hot module reloading.

### 5. Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (HMR) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run test suite (Jest) |

---

## First Run Checklist

1. ✅ Memgraph is running and healthy (`docker compose ps`)
2. ✅ `.env.local` has valid `GEMINI_API_KEY`
3. ✅ App responds at `http://localhost:3000`
4. ✅ Health check passes: `GET /api/health`
5. ✅ Schema initialized: `GET /api/tree` returns sector data
6. ✅ Pipeline page loads: `http://localhost:3000/pipeline`

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Memgraph won't start on M-series Mac | Ensure Rosetta 2 is installed: `softwareupdate --install-rosetta` |
| Port 7687 already in use | Stop existing Neo4j/Memgraph: `lsof -ti:7687 \| xargs kill` |
| Port 3000 already in use | Kill existing process: `lsof -ti:3000 \| xargs kill` |
| `GEMINI_API_KEY` not found | Ensure `.env.local` exists in project root |
| Schema not initializing | Call `POST /api/init` manually |
| Docker build fails | Ensure Node 20+ and run `docker compose build --no-cache` |

---

## Related Pages

- [Configuration](./configuration.md) — Full environment variable reference
- [Architecture](./architecture.md) — System architecture diagrams
- [Operations](./operations.md) — Health checks and monitoring
