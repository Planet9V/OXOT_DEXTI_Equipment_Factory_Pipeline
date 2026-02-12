# OXOT DEXPI Equipment Factory Pipeline

> DEXPI 2.0 Equipment Lifecycle Management for Critical Infrastructure

A standalone, Docker-based application for discovering, creating, and managing DEXPI 2.0 industrial equipment JSON files across all 16 CISA critical infrastructure sectors. Includes a **Memgraph** knowledge graph for relationship-aware queries, a **multi-level wiki** for browsing DEXPI standards and CISA sectors, and an **AI pipeline** powered by Google Gemini.

## Architecture

```
+-----------------------------------------------------------+
|                    Next.js 14 App                          |
|  +----------+ +--------+ +-----------+ +------+ +------+ |
|  | Dashboard | | Sectors| | Equipment | | Wiki | | Pipe | |
|  |   Page    | |  Page  | |  Browser  | | 4-lv | | line | |
|  +----------+ +--------+ +-----------+ +------+ +------+ |
+-----------------------------------------------------------+
|                    API Layer                                |
|  /api/sectors  /api/equipment  /api/pipeline               |
|  /api/vendors  /api/coverage   /api/tree  /api/init        |
+-----------------------------------------------------------+
|               Core Libraries                               |
|  +----------+ +----------+ +---------+ +----------------+ |
|  | Storage   | | Pipeline | | Sectors | | Memgraph       | |
|  | Engine    | | Engine   | | (16)    | | Graph DB       | |
|  +----------+ +----------+ +---------+ +----------------+ |
+-----------------------------------------------------------+
|     File Storage (/data)      |   Memgraph (Bolt:7687)    |
|  sectors/ENER/.../equipment/  |   Knowledge Graph with    |
|  pipeline-runs/               |   DEXPI 2.0 Schema        |
+-----------------------------------------------------------+
|              supervisord (PID 1)                           |
|     memgraph (priority 10)  |  next.js (priority 20)     |
+-----------------------------------------------------------+
```

## Features

### Equipment Management

- **16 CISA Sectors** with sub-sectors, facilities, and equipment type definitions
- **Full CRUD** for sectors, sub-sectors, facilities, and equipment cards
- **Copy and rename** equipment between facilities
- **Vendor variations** -- manufacturer-specific specs linked to base equipment
- **Search and filter** by sector, category, component class, validation score
- **Paginated browsing** with detail panel

### AI Pipeline (5 Stages)

1. **Research** -- AI researches equipment specs, materials, manufacturers, standards
2. **Generate** -- Creates DEXPI 2.0 compliant equipment cards in batches
3. **Validate** -- ISA tag format, schema validation, plausibility checks, scoring
4. **Catalog** -- Duplicate detection by tag and content hash, suffix resolution
5. **Store** -- Persist validated cards to filesystem

### Coverage Analysis

- Gap analysis across all sectors and facilities
- Expected vs. existing equipment type comparison
- Visual progress bars per sector and facility
- Missing type identification for targeted generation

### Directory Structure

```
/data/
  sectors/
    ENER/
      _meta.json
      OIL_GAS/
        _meta.json
        REFINERY/
          _meta.json
          equipment/
            P-101.json          <-- Equipment card
            E-201.json
          vendors/
            P-101/
              ABB-ACS880.json   <-- Vendor variation
              Siemens-G120.json
    WATR/
    NUCL/
    ... (16 sectors)
  pipeline-runs/
    {uuid}.json
  exports/
```

## Quick Start

### Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/Planet9V/OXOT_DEXTI_Equipment_Factory_Pipeline.git
cd OXOT_DEXTI_Equipment_Factory_Pipeline

# Set your Gemini API key
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY

# Build and run
docker-compose up -d

# Open browser
open http://localhost:3000
```

### Local Development

```bash
npm install
cp .env.example .env
# Edit .env with your GEMINI_API_KEY
npm run dev
# Open http://localhost:3000
```

### First Run

1. Open the dashboard at `http://localhost:3000`
2. Click **Initialize Data Directory** to create the sector/facility structure
3. Navigate to **Pipeline** to generate equipment cards with AI
4. Browse equipment in the **Equipment** tab
5. Check **Coverage** for gap analysis

## API Reference

### Sectors

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/sectors` | List all sectors with equipment counts |
| POST | `/api/sectors` | Create new sector |
| GET | `/api/sectors/:sector` | Get sector details |
| PUT | `/api/sectors/:sector` | Rename sector |
| DELETE | `/api/sectors/:sector` | Delete sector and contents |
| GET | `/api/sectors/:sector/subsectors` | List sub-sectors |
| POST | `/api/sectors/:sector/subsectors` | Create sub-sector |
| PUT | `/api/sectors/:sector/subsectors/:sub` | Rename sub-sector |
| DELETE | `/api/sectors/:sector/subsectors/:sub` | Delete sub-sector |
| GET | `/api/sectors/:sector/subsectors/:sub/facilities` | List facilities |
| POST | `/api/sectors/:sector/subsectors/:sub/facilities` | Create facility |
| PUT | `/api/sectors/:sector/subsectors/:sub/facilities/:fac` | Rename facility |
| DELETE | `/api/sectors/:sector/subsectors/:sub/facilities/:fac` | Delete facility |

### Equipment

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/equipment?q=&category=&sector=&page=` | Search equipment |
| POST | `/api/equipment` | Create equipment card |
| GET | `/api/equipment/:sector/:sub/:fac/:tag` | Get equipment detail |
| PUT | `/api/equipment/:sector/:sub/:fac/:tag` | Update equipment |
| DELETE | `/api/equipment/:sector/:sub/:fac/:tag` | Delete equipment |
| POST | `/api/equipment/copy` | Copy equipment to new location |

### Vendors

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/vendors/:sector/:sub/:fac/:tag` | List vendor variations |
| POST | `/api/vendors/:sector/:sub/:fac/:tag` | Add vendor variation |

### Pipeline

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/pipeline` | List pipeline runs |
| POST | `/api/pipeline` | Submit new pipeline run |
| GET | `/api/pipeline/:runId` | Get run status and logs |
| DELETE | `/api/pipeline/:runId` | Cancel running pipeline |

### Utilities

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/coverage?sector=` | Coverage analysis |
| GET | `/api/tree` | Full directory tree |
| POST | `/api/init` | Initialize data directory |

## CISA Sectors

| Code | Sector | Sub-Sectors |
|------|--------|-------------|
| ENER | Energy | Oil and Gas, Power Generation, Renewables |
| WATR | Water and Wastewater | Treatment, Distribution, Wastewater |
| NUCL | Nuclear | Power Plants, Research, Fuel Cycle |
| CHEM | Chemical | Petrochemical, Specialty, Pharmaceutical |
| CMAN | Critical Manufacturing | Metals, Automotive, Electronics |
| HLTH | Healthcare | Hospitals, Labs, Pharmaceutical Mfg |
| TRAN | Transportation | Aviation, Maritime, Rail |
| DAMS | Dams | Hydroelectric, Flood Control, Navigation |
| FOOD | Food and Agriculture | Processing, Cold Chain, Grain |
| FINA | Financial Services | Data Centers, Trading, Banking |
| DEFN | Defense Industrial Base | Aerospace, Shipbuilding, Ordnance |
| EMER | Emergency Services | Fire, EMS, 911 Centers |
| GOVT | Government Facilities | Federal, State, Military |
| COMM | Commercial Facilities | Arenas, Hotels, Retail |
| COMU | Communications | Telecom, Broadcast, Internet |
| ITEC | Information Technology | Cloud, ISPs, DNS Infrastructure |

## DEXPI 2.0 Standard

Equipment cards follow the DEXPI 2.0 (Data Exchange in Process Industry) standard with:

- **RDL URIs** from POSC Caesar for equipment classification
- **ISA tag naming** (P=Pump, E=HeatExchanger, V=Vessel, TK=Tank, etc.)
- **Structured specifications** with units and sources
- **Material callouts** (body, internals, gaskets, bolting)
- **Nozzle schedules** with size, rating, facing, and service
- **Validation scoring** (0-100) for data quality assurance

### Example Equipment Card

```json
{
  "tag": "P-101",
  "name": "Main Process Pump",
  "componentClass": "Pump",
  "dexpiType": "CentrifugalPump",
  "rdlUri": "http://data.posccaesar.org/rdl/RDS417890",
  "sector": "ENER",
  "subSector": "OIL_GAS",
  "facility": "REFINERY",
  "specifications": {
    "flowRate": { "value": 450, "unit": "m3/h", "source": "API 610" },
    "head": { "value": 120, "unit": "m", "source": "API 610" },
    "power": { "value": 250, "unit": "kW", "source": "IEC 60034" }
  },
  "materials": {
    "body": "316L Stainless Steel",
    "impeller": "Duplex 2205",
    "shaft": "17-4 PH"
  },
  "nozzles": [
    { "id": "N1", "service": "Suction", "size": "200mm", "rating": "PN40", "facing": "RF" },
    { "id": "N2", "service": "Discharge", "size": "150mm", "rating": "PN40", "facing": "RF" }
  ],
  "validationScore": 87,
  "createdAt": "2026-02-10T12:00:00Z",
  "updatedAt": "2026-02-10T12:00:00Z"
}
```

## Technology Stack

- **Next.js 14** -- React framework with App Router and standalone output
- **TypeScript** -- Full type safety across the codebase
- **Tailwind CSS** -- Utility-first styling with typography plugin
- **Framer Motion** -- Page transitions and UI animations
- **Lucide React** -- Icon system
- **Google Gemini** -- AI equipment specification research and generation
- **Memgraph** -- In-process graph database (Bolt protocol, neo4j-driver)
- **neo4j-driver** -- JavaScript driver for Memgraph queries
- **Zod** -- Runtime schema validation for equipment cards
- **node-cron** -- Scheduled pipeline execution
- **fast-xml-parser** -- DEXPI XML interop support
- **supervisord** -- Process manager running Memgraph + Next.js in a single container
- **File-based storage** -- JSON files on persistent volume
- **Docker** -- Debian-slim base with Memgraph installed

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `GEMINI_API_KEY` | Yes | -- | Google Gemini API key for AI pipeline |
| `DATA_DIR` | No | `./data` | Path to persistent data directory |
| `PORT` | No | `3000` | Server port |
| `MEMGRAPH_HOST` | No | `127.0.0.1` | Memgraph Bolt host |
| `MEMGRAPH_PORT` | No | `7687` | Memgraph Bolt port |
| `PIPELINE_SCHEDULE` | No | `0 */6 * * *` | Cron schedule for automated pipeline runs |

## Docker Details

### Build

```bash
# Build the image
docker build -t dexpi-equipment-factory .

# Run standalone (without compose)
docker run -d \
  --name dexpi-factory \
  -p 3000:3000 \
  -e GEMINI_API_KEY=your-key-here \
  -v dexpi-data:/data \
  dexpi-equipment-factory
```

### Data Persistence

The Docker volume `dexpi-data` is mounted at `/data` inside the container. All sector directories, equipment JSON files, pipeline run logs, and exports are stored here. The volume persists across container restarts and rebuilds.

To back up your data:

```bash
# Export the volume
docker run --rm -v dexpi-data:/data -v $(pwd):/backup alpine tar czf /backup/dexpi-backup.tar.gz -C /data .

# Import from backup
docker run --rm -v dexpi-data:/data -v $(pwd):/backup alpine tar xzf /backup/dexpi-backup.tar.gz -C /data
```

### Health Check

The container includes a health check that queries `/api/tree` every 30 seconds. Check container health with:

```bash
docker inspect --format='{{.State.Health.Status}}' dexpi-equipment-factory
```

### Logs

```bash
# Follow container logs
docker-compose logs -f app

# View last 100 lines
docker-compose logs --tail=100 app
```

## Development

### Project Structure

```
src/
  app/
    page.tsx                    # Dashboard
    sectors/page.tsx            # Sector browser
    equipment/page.tsx          # Equipment browser
    pipeline/page.tsx           # Pipeline management
    coverage/page.tsx           # Coverage analysis
    wiki/
      page.tsx                  # Wiki home
      layout.tsx                # Wiki sidebar layout
      dexpi/
        page.tsx                # DEXPI 2.0 overview
        equipment-classes/page.tsx  # Equipment taxonomy
      sectors/
        [code]/page.tsx         # Dynamic sector wiki pages (×16)
    api/
      sectors/route.ts          # Sector CRUD
      equipment/route.ts        # Equipment CRUD
      equipment/copy/route.ts   # Equipment copy
      vendors/route.ts          # Vendor variations
      pipeline/route.ts         # Pipeline runs
      coverage/route.ts         # Coverage analysis
      tree/route.ts             # Directory tree
      init/route.ts             # Data initialization
  lib/
    storage.ts                  # File-based storage engine
    pipeline.ts                 # 5-stage AI pipeline engine
    memgraph.ts                 # Memgraph connection (singleton + retry)
    graph-schema.ts             # DEXPI knowledge graph schema
    sectors-data.ts             # Backward-compat re-export facade
    sectors/
      index.ts                  # Aggregated sector index
      types.ts                  # DexpiSector type definitions
      uris.ts                   # POSC Caesar RDL URI constants
      chemical.ts               # Chemical sector (5 sub-sectors)
      energy.ts                 # Energy sector (3 sub-sectors)
      water.ts                  # Water & Wastewater
      nuclear.ts                # Nuclear sector
      manufacturing.ts          # Critical Manufacturing
      transportation.ts         # Transportation Systems
      financial.ts              # Financial Services
      food.ts                   # Food & Agriculture
      healthcare.ts             # Healthcare & Public Health
      infrastructure.ts         # Comms, Commercial, Dams, Defense
      services.ts               # Emergency, Government, IT
    types.ts                    # TypeScript interfaces
    validation.ts               # Zod schemas and scoring
```

### Running Tests

```bash
npm run lint          # ESLint check
npm run build         # Type check + production build
```

### Adding a New Sector

1. Create a new sector file in `src/lib/sectors/` (e.g., `new-sector.ts`)
2. Define the `DexpiSector` object with sub-sectors, facilities, and equipment
3. Import and add it to `src/lib/sectors/index.ts`
4. Run `POST /api/init` to create the directory structure
5. Wiki pages are auto-generated from the sector data

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-sector-support`)
3. Make your changes
4. Run lint and build to verify (`npm run lint && npm run build`)
5. Commit with a descriptive message
6. Open a pull request

## License

MIT License -- OXOT Cyber Digital Twin Project

---

*Built with the OXOT Critical Infrastructure Digital Twin platform*
