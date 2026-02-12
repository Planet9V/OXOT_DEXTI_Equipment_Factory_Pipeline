# Implementation Plan — Next Phase

## Task ID: `next-phase-v2`

## Current State Assessment

After the 8-agent verification pass, the following is built and verified:

| Module | Status | Notes |
|--------|--------|-------|
| 16 CISA sector data files | ✅ Verified | All ComponentClasses corrected to DEXPI spec |
| Core types (`types.ts`) | ⚠️ Bug | Missing `heat-transfer` in `EquipmentCategory` |
| POSC Caesar RDL URIs | ✅ Verified | Aliases added for spec-correct names |
| Storage engine | ✅ Complete | File-based CRUD |
| Pipeline engine | ⚠️ Bug | `ISA_TAG_PREFIX` still uses old `Column`/`Generator` keys |
| Memgraph module | ✅ Complete | Connection + retry logic |
| Graph schema | ✅ Complete | DEXPI 2.0 aligned |
| API routes (7) | ✅ Complete | sectors, equipment, pipeline, coverage, tree, vendors, init |
| Frontend pages (6) | ✅ Complete | Landing, Sectors, Equipment, Dashboard, Pipeline, Coverage |
| Wiki | ⚠️ Partial | Only equipment-classes page under /wiki/dexpi |
| Test suite | ❌ Broken | Missing `@types/jest` dependency |
| DEXPI XML Export | ❌ Missing | Core feature not yet implemented |

---

## Phase 1: Critical Fixes (Immediate)

### 1.1 Fix `EquipmentCategory` Type Bug
- **File:** `src/lib/types.ts` (line 3)
- **Issue:** Type is `"rotating" | "static" | "instrumentation" | "electrical" | "piping"` — missing `"heat-transfer"`
- **Fix:** Add `"heat-transfer"` to the union type
- **Impact:** Currently suppressed by TypeScript; all sector files use `heat-transfer` category

### 1.2 Fix `ISA_TAG_PREFIX` in Pipeline
- **File:** `src/lib/pipeline.ts` (lines 7-15)
- **Issue:** Map keys still use `Column` and `Generator` instead of `ProcessColumn` and `ElectricGenerator`
- **Fix:** Add `ProcessColumn: 'COL'`, `ElectricGenerator: 'G'`, `Heater: 'H'` entries (keep old keys for backward compat)

### 1.3 Install `@types/jest`
- **File:** `package.json`
- **Command:** `npm install --save-dev @types/jest jest ts-jest`
- **Impact:** Fixes all 50+ TypeScript errors in test files

---

## Phase 2: DEXPI XML Export Module (Core Feature)

### 2.1 Create `src/lib/dexpi-export.ts`
The project's core value proposition is generating **DEXPI 2.0 compliant XML**. Currently, the pipeline produces JSON `EquipmentCard` objects but doesn't export them to the DEXPI XML schema.

**Module responsibilities:**
- Convert `EquipmentCard` → DEXPI 2.0 XML (Proteus schema)
- Generate valid `<Equipment>` elements with `ComponentClass` and `ComponentClassURI`
- Include `<Nozzle>`, `<GenericAttributes>`, and `<Extent>` sub-elements
- Support single-equipment and batch export
- XML validation against DEXPI schema structure

**Key XML structure (DEXPI P&ID Spec 1.3):**
```xml
<Equipment
  ID="E-001"
  ComponentClass="ShellTubeHeatExchanger"
  ComponentClassURI="http://data.posccaesar.org/rdl/RDS304199"
  TagName="E-001"
  StockNumber="">
  <GenericAttributes Set="DexpiEquipmentAttributes">
    <GenericAttribute Name="DesignPressure" Value="150" Units="psig" />
    <GenericAttribute Name="DesignTemperature" Value="350" Units="°F" />
  </GenericAttributes>
  <Nozzle ID="N1" />
</Equipment>
```

### 2.2 Create `src/app/api/equipment/export/route.ts`
- `GET /api/equipment/export?sector=ENER&subSector=OIL_GAS&facility=REFINERY&format=xml`
- Returns DEXPI-compliant XML for all equipment in a facility
- Supports `?format=xml|json` query parameter
- Content-Type: `application/xml` for XML exports

### 2.3 Add DEXPI XML export tests
- **File:** `tests/dexpi-export.test.ts`
- Test single equipment card export
- Test batch export
- Validate XML structure
- Verify ComponentClassURI is included

---

## Phase 3: Wiki Expansion

### 3.1 Create `/wiki/dexpi/standards` page
- Reference page for all engineering standards used in the project
- Organized by category: API, ASME, TEMA, IEC, ISA, NFPA, etc.
- Each standard listed with code, title, governing body, and applicable equipment

### 3.2 Create `/wiki/dexpi/xml-schema` page
- Interactive reference showing the DEXPI 2.0 XML structure
- Visual breakdown of the Proteus schema hierarchy
- Code examples for each element type

### 3.3 Expand `/wiki/sectors/[code]` detail pages
- Ensure each of the 16 sectors has a complete detail page
- Show all sub-sectors, facilities, and equipment counts
- Interactive equipment type breakdown charts

---

## Phase 4: Dashboard Enhancement

### 4.1 Real-time statistics
- Total equipment cards generated
- Coverage percentage per sector
- Recent pipeline runs with status
- Equipment distribution by category (pie/donut chart)

---

## Implementation Order

```
Phase 1 (Critical Fixes) ──→ Phase 2 (DEXPI XML Export) ──→ Phase 3 (Wiki) ──→ Phase 4 (Dashboard)
        ~15 min                      ~45 min                    ~30 min              ~20 min
```

## Files to Create/Modify

| Action | File | Phase |
|--------|------|-------|
| MODIFY | `src/lib/types.ts` | 1.1 |
| MODIFY | `src/lib/pipeline.ts` | 1.2 |
| MODIFY | `package.json` | 1.3 |
| CREATE | `src/lib/dexpi-export.ts` | 2.1 |
| CREATE | `src/app/api/equipment/export/route.ts` | 2.2 |
| CREATE | `tests/dexpi-export.test.ts` | 2.3 |
| CREATE | `src/app/wiki/dexpi/standards/page.tsx` | 3.1 |
| CREATE | `src/app/wiki/dexpi/xml-schema/page.tsx` | 3.2 |
| MODIFY | `src/app/wiki/sectors/[code]/page.tsx` | 3.3 |
| MODIFY | `src/app/dashboard/page.tsx` | 4.1 |

---

**Awaiting approval to proceed.**
