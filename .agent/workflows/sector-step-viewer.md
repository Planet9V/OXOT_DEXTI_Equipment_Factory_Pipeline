---
description: Add the 4-step tabbed architecture viewer to a CISA sector wiki page
---

# Sector Step Viewer — Repeatable Workflow

This workflow adds the 4-step tabbed architecture viewer (modeled after the
Acquisitions page pattern) to any CISA sector wiki page. The Energy sector
(`/wiki/energy`) is the reference implementation.

## Prerequisites

- The sector's data model exists in `src/lib/sectors/{sector}.ts`
- The sector's wiki page exists at `src/app/wiki/{slug}/page.tsx`
- The 5 reusable components already exist in `src/components/wiki/`:
  - `SectorStepBar.tsx`
  - `SectorStepViewer.tsx`
  - `EquipmentCard.tsx`
  - `SubSectorGrid.tsx`
  - `FacilityCanvas.tsx`

## Step 1 — Create the Step Data File

Create `src/components/wiki/step-data/{slug}.ts`

This file exports a `get{Name}StepData(): SectorStepData` function that:
1. Imports the sector constant from `@/lib/sectors/{file}`
2. Returns a `SectorStepData` object with:
   - `name`, `code`, `color`, `srma` — from the sector constant
   - `architectureVision` — TOGAF Phase A–B content with:
     - `profile[]` — PPD-21, SRMA, sub-sector count, equipment count, interdependencies, regulations
     - `businessArchitecture[]` — Value chain, stakeholder map, architecture principles, key standards
     - `threatLandscape` — Headline, threat items, bottom line
   - `referenceArchitecture` — TOGAF Phase C–D content with:
     - `informationSystems[]` — Purdue model, zone model, data flow patterns
     - `technologyArchitecture[]` — Protocol stack, network architecture, control systems
     - `engineeringValue` — Headline, OXOT value items, bottom line
   - `subSectors` — Mapped directly from the sector constant's sub-sector data

**Reference:** Copy `src/components/wiki/step-data/energy.ts` and replace all content.

## Step 2 — Create the Client Wrapper

Create `src/app/wiki/{slug}/{Name}StepSection.tsx`

```tsx
'use client';

import SectorStepViewer from '@/components/wiki/SectorStepViewer';
import { get{Name}StepData } from '@/components/wiki/step-data/{slug}';

const stepData = get{Name}StepData();

export default function {Name}StepSection() {
    return <SectorStepViewer data={stepData} />;
}
```

## Step 3 — Integrate into the Page

Edit `src/app/wiki/{slug}/page.tsx`:

1. Add import at the top:
   ```tsx
   import {Name}StepSection from './{Name}StepSection';
   ```

2. Add the component inside the main `return` block, above existing content:
   ```tsx
   {/* 4-Step Sector Architecture Viewer */}
   <{Name}StepSection />

   {/* Separator between step viewer and TOGAF reference */}
   <div className="border-t border-white/[0.06] pt-12">
       <h2 className="text-lg font-heading font-semibold text-gray-500 mb-8">
           📖 Full TOGAF Reference Architecture
       </h2>
   </div>
   ```

3. Widen the container from `max-w-5xl` to `max-w-7xl` if needed.

// turbo
## Step 4 — Verify Build

```bash
# ALWAYS kill existing server first
lsof -ti:3000 | xargs kill -9 2>/dev/null
npx next build 2>&1 | tail -20
```

## Step 5 — Verify in Browser

// turbo
```bash
lsof -ti:3000 | xargs kill -9 2>/dev/null; npx next dev -p 3000
```

Navigate to `http://localhost:3000/wiki/{slug}` and verify:
- [ ] Tab 1 (Architecture Vision) renders 3-column layout
- [ ] Tab 2 (Reference Architecture) renders 3-column layout
- [ ] Tab 3 (Sub-Sectors & Assets) shows expandable grid cards
- [ ] Tab 4 (Facility Builder) shows sidebar + SVG canvas
- [ ] Original TOGAF content preserved below the step viewer
- [ ] No console errors

## Content Authoring Guide

### Tab 1 — Architecture Vision

| Column | Purpose | Typical Items |
|--------|---------|-------------|
| Sector Profile (left) | Key facts | PPD-21, SRMA, sub-sector count, regulations |
| Business Architecture (center) | Strategy | Value chain, stakeholders, principles, standards |
| OXOT Intelligence (right) | Threats | APTs, attack vectors, regulatory warnings |

### Tab 2 — Reference Architecture

| Column | Purpose | Typical Items |
|--------|---------|-------------|
| Information Systems (left) | Data architecture | Purdue levels, zone model, data flows |
| Technology Architecture (center) | Protocols & networks | Protocol stack, network topology, control systems |
| OXOT Engineering (right) | Platform value | Digital twin coverage, SBOM, CVE chains |

### Tabs 3 & 4 — Auto-Populated

These tabs pull directly from the sector's `subSectors` → `facilities` → `equipment`
data model. No manual content authoring needed.
