# Task Tracking - OXOT DEXPI Equipment Factory Pipeline

- [x] Phase 1: Critical Fixes
- [x] Phase 2: DEXPI XML Export (Verified in `src/lib/dexpi-export.ts`)
- [x] Phase 3: Wiki & PCA Integration (Verified in `src/lib/pca-sparql.ts`)
- [x] Phase 4: Dashboard & Quality Assurance
- [x] Phase 5: Frontend UI Alignment
    - [x] Audit Dashboard (`src/app/dashboard/page.tsx`)
    - [x] Align Sector Dropdowns with new `SECTORS` constant
    - [x] Update Wiki components to use standardized `componentClass` labels
    - [x] Synchronize Pipeline UI with live validation metadata
    - [x] Verify 16-sector visibility across all UI entry points
    - [x] Generate updated `walkthrough.md` with UI proofs

## Phase 6: Storage Engine Refactoring (Memgraph)
**Objective:** Replace file-based `src/lib/storage.ts` with graph-backed implementation.

- [x] **Step 1: Enhance Graph Schema** (`src/lib/graph-schema.ts`)
    - [x] Implement `getSector`, `deleteSector` (cascading)
    - [x] Implement `getSubSector`, `deleteSubSector`
    - [x] Implement `getFacility`, `deleteFacility`
    - [x] Implement `getEquipment` (by tag), `listEquipment`, `deleteEquipment`
    - [x] Implement `searchEquipmentNodes` (Cypher filtering)
    - [x] Implement `saveVendorVariation`, `listVendorVariations`
    - [x] Implement `savePipelineRun`, `getPipelineRun`

- [x] **Step 2: Rewrite Storage Layer** (`src/lib/storage.ts`)
    - [x] Refactor `initializeDataDir` → `schema.initializeSchema`
    - [x] Refactor `createSector`, `createSubSector`, `createFacility`
    - [x] Refactor `saveEquipment`, `getEquipment`, `listEquipment`
    - [x] Refactor `searchEquipment`, `getDirectoryTree`
    - [x] Refactor `savePipelineRun`

- [x] **Step 3: Verification**
    - [x] Run `npm run build` to check type safety
    - [x] Execute `tests/memgraph.test.ts`
    - [x] Manual verification via `/api/init`
