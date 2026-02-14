# DEXPI Naming Convention — Canonical Reference

> **Source of Truth**: `src/lib/sectors/*.ts`
> All other surfaces (graph DB, API, UI, scripts) MUST use the codes from this module.

## Code Format

All codes follow `SECTOR-SUBSECTOR-FACILITY` nesting:

```
CHEM              ← Sector (4-char)
CHEM-BC           ← SubSector (SECTOR-XX)
CHEM-BC-PETRO     ← Facility (SECTOR-XX-YYYY)
```

## Canonical Sector Codes

| Code | Sector Name | Source File |
|------|-------------|-------------|
| `CHEM` | Chemical | `sectors/chemical.ts` |
| `ENER` | Energy | `sectors/energy.ts` |
| `NUCL` | Nuclear | `sectors/nuclear.ts` |
| `WATR` | Water & Wastewater | `sectors/water.ts` |
| `FOOD` | Food & Agriculture | `sectors/food.ts` |
| `HLTH` | Healthcare | `sectors/healthcare.ts` |
| `CMAN` | Critical Manufacturing | `sectors/manufacturing.ts` |
| `TRAN` | Transportation | `sectors/transportation.ts` |
| `ITEC` | Information Technology | `sectors/it.ts` |
| `FINA` | Financial Services | `sectors/financial.ts` |
| `COMU` | Communications | `sectors/communications.ts` |
| `COMM` | Commercial Facilities | `sectors/commercial.ts` |
| `DAMS` | Dams | `sectors/dams.ts` |
| `DEFN` | Defense Industrial Base | `sectors/defense.ts` |
| `GOVT` | Government Facilities | `sectors/government.ts` |
| `EMER` | Emergency Services | `sectors/emergency.ts` |

## Where These Codes Are Used

| Surface | How Sector Code Is Used | File |
|---------|------------------------|------|
| **Graph DB** | `e.sector`, `e.subSector`, `e.facilityCode` properties | `graph-schema.ts:181` |
| **Coverage API** | Joins `sector.code + sub.code + fac.code` | `api/coverage/route.ts:64` |
| **Pipeline Page** | Dropdown `value={s.code}` | `pipeline/page.tsx:561` |
| **Sectors Page** | Display via `getAllSectors()` | `sectors/page.tsx` |
| **Node Labels** | `:Sector_CHEM`, `:SubSector_CHEM_BC` | `graph-schema.ts:438` |
| **Indexes** | `Sector(code)`, `SubSector(code)`, `Facility(code)` | `graph-schema.ts:76` |

## Rules

1. **Never store long names** (e.g. `CHEMICAL`) in `e.sector` — always use the short code (`CHEM`)
2. **`e.subSector`** must be the first two segments of `facilityCode` (e.g. `CHEM-BC`)
3. **Adding new sectors**: Create a new file in `src/lib/sectors/`, export it from `index.ts`
4. **Display names** come from `sector.name` at render time, never from the stored code

## Graph Node Labels (Multi-Label)

```
Equipment                     # Primary type
├── :TaggedPlantItem          # DEXPI 2.0 base class
├── :OX_DEXPI2                # Global inventory marker
├── :Sector_CHEM              # Dynamic sector label (toLabel)
└── :SubSector_CHEM_BC        # Dynamic subsector label (toLabel)
```

Sector/SubSector nodes:
```
Sector:CriticalInfrastructure {code: "CHEM", name: "Chemical"}
SubSector:IndustrySegment     {code: "CHEM-BC", name: "Basic Chemicals"}
Facility:PlantSite            {code: "CHEM-BC-PETRO", name: "Petrochemical Complex"}
```
