# DEXTI Equipment Factory — Documentation Index

> **Internal Wiki** · DEXPI 2.0 Equipment Card Generation Platform  
> Version 1.0.0 · Last updated: 2026-02-14

---

## Quick Reference

| Item | Value |
|------|-------|
| **App URL** | `http://localhost:3000` |
| **Memgraph Bolt** | `bolt://localhost:7687` |
| **Memgraph Lab** | `http://localhost:7444` |
| **Stack** | Next.js 14 · React 18 · Memgraph · Gemini AI · OpenRouter |
| **Start (Docker)** | `docker compose up -d` |
| **Start (Local)** | `npm run dev` |
| **Run Tests** | `npm test` |

---

## Table of Contents

### 🏗 Foundation

| # | Page | Description |
|---|------|-------------|
| 1 | [Architecture](./architecture.md) | System architecture, stack diagram, service topology |
| 2 | [Installation](./installation.md) | Prerequisites, Docker setup, local development |
| 3 | [Configuration](./configuration.md) | Environment variables, API keys, service settings |

### ⚙️ Pipeline

| # | Page | Description |
|---|------|-------------|
| 4 | [Pipeline Process](./pipeline-process.md) | 6-stage AI pipeline with detailed process diagrams |
| 5 | [Batch Processing](./pipeline-batch.md) | Equipment Factory batch flow and swimlane diagrams |
| 6 | [AI Agents](./agents.md) | Specialist agent architecture and tool system |

### 🔌 API

| # | Page | Description |
|---|------|-------------|
| 7 | [API Reference](./api-reference.md) | All 25 REST API endpoints grouped by domain |
| 8 | [Equipment API](./api-equipment.md) | Equipment CRUD, search, export, assign |
| 9 | [External Integration](./api-external-guide.md) | Query → Select → Acquire flow for external apps |

### 💾 Storage

| # | Page | Description |
|---|------|-------------|
| 10 | [Graph Schema](./storage-graph-schema.md) | Memgraph node types, relationships, DEXPI 2.0 model |
| 11 | [Storage Operations](./storage-operations.md) | CRUD functions, batch writes, circuit breaker |

### 🖥 Frontend & Operations

| # | Page | Description |
|---|------|-------------|
| 12 | [Site Map](./site-map.md) | Frontend routes, page tree, component hierarchy |
| 13 | [Operations](./operations.md) | Health checks, monitoring, scheduling, troubleshooting |

---

## Alphabetical Index

| Term | Page | Section |
|------|------|---------|
| Agent, AI | [Agents](./agents.md) | Overview |
| Agent, Compliance | [Agents](./agents.md) | Specialist Agents |
| Agent, Enrichment | [Agents](./agents.md) | Specialist Agents |
| Agent, Graph Writer | [Agents](./agents.md) | Specialist Agents |
| Agent, Quality Gate | [Agents](./agents.md) | Specialist Agents |
| Agent, Research | [Agents](./agents.md) | Specialist Agents |
| API Keys | [Configuration](./configuration.md) | API Keys |
| Audit Logger | [Agents](./agents.md) | Audit System |
| Batch Check | [API Reference](./api-reference.md) | Pipeline APIs |
| Batch Processing | [Batch Processing](./pipeline-batch.md) | Overview |
| Bolt Protocol | [Configuration](./configuration.md) | Memgraph |
| Categories, Equipment | [Equipment API](./api-equipment.md) | Categories |
| Circuit Breaker | [Storage Operations](./storage-operations.md) | Circuit Breaker |
| Compliance Validation | [Pipeline Process](./pipeline-process.md) | Stage 3 |
| Configuration | [Configuration](./configuration.md) | Overview |
| Cypher | [Storage Operations](./storage-operations.md) | Query Helpers |
| DEXPI 2.0 | [Architecture](./architecture.md) | Standards |
| DEXPI XML Export | [Equipment API](./api-equipment.md) | Export |
| Docker | [Installation](./installation.md) | Docker Setup |
| Docker Compose | [Installation](./installation.md) | Docker Compose |
| Dockerfile | [Architecture](./architecture.md) | Build Pipeline |
| Enrichment | [Pipeline Process](./pipeline-process.md) | Stage 4 |
| Environment Variables | [Configuration](./configuration.md) | Variables |
| Equipment Card | [Graph Schema](./storage-graph-schema.md) | Equipment Node |
| Equipment Factory | [Batch Processing](./pipeline-batch.md) | Overview |
| External Integration | [External Integration](./api-external-guide.md) | Overview |
| Facility | [Graph Schema](./storage-graph-schema.md) | Facility Node |
| Gemini API | [Configuration](./configuration.md) | API Keys |
| Graph Schema | [Graph Schema](./storage-graph-schema.md) | Overview |
| Health Check | [Operations](./operations.md) | Health Endpoints |
| ISA 5.1 Tags | [Graph Schema](./storage-graph-schema.md) | Tag Generation |
| Material | [Graph Schema](./storage-graph-schema.md) | Material Node |
| Memgraph | [Architecture](./architecture.md) | Database |
| Monitoring | [Operations](./operations.md) | Monitoring |
| Next.js | [Architecture](./architecture.md) | App Framework |
| Nozzle | [Graph Schema](./storage-graph-schema.md) | Nozzle Node |
| OpenRouter | [Configuration](./configuration.md) | API Keys |
| PCA RDL URI | [Pipeline Process](./pipeline-process.md) | Research |
| Pipeline Run | [Pipeline Process](./pipeline-process.md) | Overview |
| Pipeline V2 | [Pipeline Process](./pipeline-process.md) | V2 Architecture |
| Quality Gate | [Pipeline Process](./pipeline-process.md) | Stage 5 |
| Relationship Types | [Graph Schema](./storage-graph-schema.md) | Relationships |
| REST API | [API Reference](./api-reference.md) | Overview |
| Scheduling | [Operations](./operations.md) | Pipeline Schedule |
| Search | [Equipment API](./api-equipment.md) | Search |
| Sector Hierarchy | [Graph Schema](./storage-graph-schema.md) | Sector Node |
| Standalone Equipment | [Equipment API](./api-equipment.md) | Standalone |
| Standard | [Graph Schema](./storage-graph-schema.md) | Standard Node |
| Sub-Sector | [Graph Schema](./storage-graph-schema.md) | SubSector Node |
| Tailwind CSS | [Architecture](./architecture.md) | Styling |
| Troubleshooting | [Operations](./operations.md) | Troubleshooting |
| Vendor Variation | [Equipment API](./api-equipment.md) | Vendors |
| Wiki Pages | [Site Map](./site-map.md) | Wiki System |

---

## Project Structure

```
OXOT_DEXTI_Equipment_Factory_Pipeline/
├── docs/               ← You are here
├── src/
│   ├── app/            ← Next.js pages + API routes
│   ├── components/     ← React components
│   ├── lib/            ← Core libraries
│   │   ├── agents/     ← AI pipeline agents
│   │   ├── sectors/    ← CISA sector data
│   │   ├── graph-schema.ts
│   │   ├── memgraph.ts
│   │   └── types.ts
│   └── styles/
├── tests/              ← Test suite
├── data/               ← Runtime data storage
├── docker-compose.yml
├── Dockerfile
└── package.json
```

---

> **Navigation**: This is the root index page. All pages link back here via `← Back to Index`.
