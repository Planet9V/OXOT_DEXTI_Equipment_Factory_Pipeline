---
description: Expand a CISA sector into comprehensive wiki pages — one Hub page + N facility deep-dive articles — matching the Energy sector quality standard
---

# Sector Wiki Expansion — Comprehensive Workflow

> **Purpose:** Replicate the Energy sector wiki expansion for any of the remaining 15 CISA Critical Infrastructure Sectors. This workflow produces one **Sector Hub** page and **N facility deep-dive articles** (one per major facility type), fully integrated into the wiki sidebar, home page, and sector backlinks.
>
> **Gold standard reference:** The Energy sector wiki (`/wiki/energy/*`) — study these files before starting any new sector.

---

## Pre-flight: Sector Registry

Below are all 16 CISA sectors and their codes. **Energy (ENER) is already complete.** For each remaining sector, the workflow should be executed end-to-end.

| # | Code | Sector Name | SRMA | Color | Data File |
|---|------|------------|------|-------|-----------|
| 01 | CHEM | Chemical | DHS | `#EF4444` | `src/lib/sectors/chemical.ts` |
| 02 | COMM | Commercial Facilities | DHS | `#A855F7` | `src/lib/sectors/infrastructure.ts` |
| 03 | COMU | Communications | DHS/FCC | `#3B82F6` | `src/lib/sectors/infrastructure.ts` |
| 04 | MANU | Critical Manufacturing | DHS | `#F97316` | `src/lib/sectors/manufacturing.ts` |
| 05 | DAMS | Dams | DHS | `#06B6D4` | `src/lib/sectors/infrastructure.ts` |
| 06 | DEFI | Defense Industrial Base | DoD | `#64748B` | `src/lib/sectors/infrastructure.ts` |
| 07 | EMER | Emergency Services | DHS/FEMA | `#DC2626` | `src/lib/sectors/services.ts` |
| 08 | ENER | Energy *(COMPLETE)* | DOE | `#F59E0B` | `src/lib/sectors/energy.ts` |
| 09 | FINA | Financial Services | Treasury | `#10B981` | `src/lib/sectors/financial.ts` |
| 10 | FOOD | Food and Agriculture | USDA/FDA | `#84CC16` | `src/lib/sectors/food.ts` |
| 11 | GOVT | Government Facilities | DHS/GSA | `#6366F1` | `src/lib/sectors/services.ts` |
| 12 | HEAL | Healthcare and Public Health | HHS | `#EC4899` | `src/lib/sectors/healthcare.ts` |
| 13 | ITEC | Information Technology | DHS/CISA | `#8B5CF6` | `src/lib/sectors/services.ts` |
| 14 | NUCL | Nuclear Reactors, Materials, and Waste | NRC | `#FCD34D` | `src/lib/sectors/nuclear.ts` |
| 15 | TRAN | Transportation Systems | DOT/TSA | `#0EA5E9` | `src/lib/sectors/transportation.ts` |
| 16 | WATR | Water and Wastewater Systems | EPA | `#06B6D4` | `src/lib/sectors/water.ts` |

---

## Phase 0: Deep Research (MANDATORY — DO NOT SKIP)

Before writing ANY code, you MUST perform deep academic research on the sector. This is the most critical phase.

### 0.1 Read the Sector Data File

```
Read: src/lib/sectors/{sector_data_file}.ts
```

Extract:
- All sub-sector codes, names, and descriptions
- All facility types and their codes
- All equipment components with DEXPI component classes
- The SRMA (Sector-Specific Risk Management Agency)
- Regulatory references already documented

### 0.2 Research Each Facility Type

For EACH facility type in the sector, research the following using Perplexity, Google Deep Research, or academic sources:

**Technical Research Checklist (per facility):**

1. **TOGAF Business Architecture**
   - Who are the key stakeholders? (operators, regulators, contractors, vendors)
   - What regulatory frameworks govern this facility type?
   - What are the business capabilities and value streams?
   - What standards apply? (ISO, IEEE, IEC, NFPA, OSHA, sector-specific)

2. **High-Level Design**
   - What is the canonical system architecture / one-line diagram?
   - What are the major subsystems and their relationships?
   - What design topologies or configurations are standard?
   - What redundancy schemes are employed (N+1, 2N, etc.)?

3. **Detailed Technical Description**
   - What are the 3-5 major functional areas/subsystems?
   - For each: what specific equipment is used, with make/model classes, ratings, capacities?
   - What are the key operating parameters (temperatures, pressures, flow rates, voltages)?
   - What control systems are used? (PLC, DCS, SCADA, BMS, etc.)

4. **Process Diagrams**
   - What are the 3-4 key process flows? (e.g., energy flow, data flow, material flow, safety system flow)
   - Can you draw ASCII art showing the flow from input to output?

5. **Bill of Materials (BOM)**
   - List 15-25 major equipment types with: name, specification, typical quantity range, rating/capacity
   - Be specific: include actual engineering units and ranges

6. **Purdue Model / ISA-95 Mapping**
   - Map components to Purdue Levels 0-4 (Process, Basic Control, Supervisory, Operations, Enterprise)
   - Include Level 3.5 DMZ with specific cybersecurity controls
   - Include communication protocols at each level

7. **Communication Protocols**
   - What fieldbus protocols are used? (Modbus, Profibus, HART, Foundation Fieldbus, etc.)
   - What network protocols? (Ethernet/IP, DNP3, IEC 61850, BACnet, etc.)
   - What enterprise protocols? (OPC UA, REST APIs, MQTT, etc.)

8. **Safety Systems**
   - What fire suppression systems are installed?
   - What safety instrumented systems (SIS) are used?
   - What environmental monitoring is in place?
   - What emergency procedures are defined?

9. **Supporting Infrastructure**
   - HVAC, power supply, backup generators, UPS
   - Physical security, access control
   - Water/air/gas systems

10. **Academic References**
    - Find 6-10 APA-formatted academic/standards references per facility
    - Prefer: IEEE, IEC, NIST, NFPA, ISO standards documents
    - Include authoritative textbooks and peer-reviewed papers
    - Include year of publication

### Research Prompt Template

Use this prompt with Perplexity or Google Deep Research for each facility type:

```
I need comprehensive, senior-engineer-level technical information about [FACILITY_TYPE] 
in the [SECTOR_NAME] sector for a TOGAF-based reference architecture wiki article.

Provide detailed information on:

1. TOGAF Business Architecture: key stakeholders, regulatory frameworks (specific standards 
   with numbers), business capabilities, and value streams.

2. High-Level Design: canonical system architecture with a one-line diagram description, 
   major subsystems and relationships, standard design topologies, and redundancy schemes.

3. Detailed Technical Description: break into 3-5 major functional areas. For each, list 
   specific equipment with ratings, capacities, and operating parameters in engineering 
   units. Include control system types (PLC/DCS/SCADA brands and models where appropriate).

4. Bill of Materials: list 15-25 major equipment items with name, specification summary, 
   typical quantity range, and rating/capacity. Be specific with engineering units.

5. Purdue Model Mapping: map all components to ISA-95 Purdue Levels 0-4 with Level 3.5 DMZ. 
   Include specific communication protocols at each level.

6. Safety Systems: fire suppression with NFPA references, Safety Instrumented Systems (SIS) 
   per IEC 61511, environmental monitoring, and emergency procedures.

7. Communication Protocol Stack: fieldbus (Modbus, HART, etc.), network (Ethernet/IP, DNP3, 
   BACnet, etc.), and enterprise (OPC UA, MQTT, REST) protocols.

8. Process Flow Diagrams: describe 3-4 key process flows (energy/material/data/safety).

9. APA References: provide 6-10 academic/standards citations in APA format.

Format all technical specifications with precise engineering units, industry-standard 
abbreviations, and specific standard references (e.g., IEEE C37.2, IEC 61850, NFPA 72).
```

---

## Phase 1: Determine Facility Types for Articles

Based on the research, determine which facility types warrant individual deep-dive articles. Guidelines:

- Each sub-sector should have **at least one** facility article
- Complex sub-sectors may have **2-3 articles** covering major facility variants
- Target **5-8 articles per sector** (matching the Energy sector's 7)
- Each article should be **400-600 lines of TSX** (matching Energy article depth)

### Naming Convention

| Item | Convention | Example |
|------|-----------|---------|
| Hub page | `/wiki/{sector-slug}/page.tsx` | `/wiki/water/page.tsx` |
| Facility article | `/wiki/{sector-slug}/{facility-slug}/page.tsx` | `/wiki/water/treatment-plants/page.tsx` |
| Route slug | lowercase, hyphenated, 1-3 words | `treatment-plants`, `pump-stations` |

---

## Phase 2: Write the Sector Hub Page

Create `src/app/wiki/{sector-slug}/page.tsx` following this exact structure (reference: `src/app/wiki/energy/page.tsx`):

### Hub Page Template Structure

```tsx
/**
 * {Sector Name} Sector Reference Architecture — Wiki Hub Page.
 *
 * Comprehensive overview of the {Sector Name} Sector critical infrastructure,
 * serving as the entry point to N detailed facility-type articles covering
 * {list facility types}.
 *
 * Based on TOGAF Architecture Development Method (ADM) with cross-references
 * to {relevant standards bodies}.
 *
 * @module wiki/{sector-slug}/page
 */

export const metadata = {
    title: '{Sector Name} Sector Reference Architecture — Wiki',
    description: 'TOGAF-based reference architectures for {N} {sector} facility types: {list}.',
};

/** Facility type cards with routing. */
const FACILITY_ARTICLES = [
    // One entry per facility article — include:
    // title, subtitle, href, icon (emoji), color, description, tags[]
];

export default function {SectorName}HubPage() {
    return (
        <div className="max-w-5xl space-y-12">
            {/* Header — with sector icon, CISA number, code */}
            {/* Executive Summary — 2-3 paragraphs */}
            {/* Value Chain Diagram — ASCII art in <pre> block */}
            {/* Methodology & Frameworks — 4 methodology cards */}
            {/* Cross-Facility Purdue Model — comparison table */}
            {/* Communication Protocol Stack — layered ASCII diagram */}
            {/* Cybersecurity Architecture — zones/controls table */}
            {/* Facility Article Cards — clickable grid */}
            {/* References — 6-10 APA citations */}
            {/* See Also — backlink pills */}
        </div>
    );
}

/** Reusable section component. */
function Section({ title, id, children }) { /* ... */ }
```

### Critical Hub Page Requirements

- **Executive Summary**: 2-3 substantial paragraphs explaining the sector's role, evolution, and significance
- **Value Chain Diagram**: ASCII art showing the end-to-end value chain across all facility types
- **Methodology**: Card grid showing TOGAF ADM, Purdue/ISA-95, relevant cybersecurity framework, and sector-specific framework
- **Purdue Model**: Cross-facility comparison table showing components at L0-L4 for each facility type
- **Protocol Stack**: Layered ASCII diagram showing Application → Transport → Network → Physical protocols
- **Cybersecurity**: Table with 5+ security zones and their controls
- **References**: 6-10 APA-formatted academic/standards citations
- **See Also**: Links to `/wiki/sectors/{CODE}`, DEXPI Equipment Classes, related wiki pages

---

## Phase 3: Write Facility Deep-Dive Articles

Create `src/app/wiki/{sector-slug}/{facility-slug}/page.tsx` for each facility type. Follow this **exact section structure** (reference: `src/app/wiki/energy/transmission/page.tsx`):

### Deep-Dive Article Template — 10 Required Sections

Every facility article MUST include ALL 10 sections below. **Do NOT skip any section.** This is the quality standard.

```
Section 1: "TOGAF Business Architecture"
  - Stakeholders list (6-8 bullet points)
  - Regulatory Framework table (Standard | Scope)
  
Section 2: "High-Level Design"
  - Narrative paragraph explaining the design approach
  - One-Line Diagram (ASCII art in <pre> block)
  - Figure caption
  - Follow-up paragraph on protection/redundancy zones

Section 3: "Detailed Technical Description"
  - 3-5 subsections (3.1, 3.2, 3.3, etc.)
  - Each subsection has:
    - Title (e.g., "3.1 HV Switchyard")
    - Descriptive paragraph with specific technical details
    - Equipment list with ratings and specifications (bullets)
    - Or: detailed table with equipment specs
  
Section 4: "Process Diagrams"
  - 3 ASCII art diagrams:
    - 4.1 Primary Process Flow (e.g., energy flow, water treatment flow)
    - 4.2 Control/Protection Flow
    - 4.3 Data/SCADA Flow
  - Each with descriptive paragraph

Section 5: "Bill of Materials"
  - Scaled for a specific reference facility size
  - Table columns: Equipment Type | Specification | Qty | Rating
  - 15-25 rows minimum
  - Include engineering units and specific ratings

Section 6: "Purdue Model Mapping"
  - Table columns: Level | Components | Protocols/Functions
  - 6 rows: L0 (Process), L1 (Basic Control), L2 (Supervisory), L3 (Operations), L3.5 (DMZ), L4 (Enterprise)
  - Caption about SGAM/ISA-95 alignment

Section 7: "Supporting Systems"
  - Table columns: System | Description | Specification
  - 5-8 rows: Fire suppression, HVAC, DC power, UPS, diesel gen, lightning protection, physical security

Section 8: "Water, Air & Gas Flow" (or equivalent utility systems)
  - Table columns: Medium | System | Specification
  - 3-6 rows of utility media flows relevant to the facility
  - Adapt the title/content to the sector (e.g., "Chemical Feed Systems" for water sector)

Section 9: "Data Flow Architecture"
  - Large ASCII art diagram showing data flow tiers
  - Include polling rates, protocol names, data point counts

Section 10: "References"
  - 6-10 APA-formatted citations
  - Real, verifiable academic sources

PLUS: "See Also" section with backlink pills to:
  - The sector hub page
  - Related facility articles in the same sector
  - Relevant DEXPI pages
  - The CISA sector overview page
```

### TSX Styling Patterns

Use these exact Tailwind classes to match the existing wiki design:

```tsx
// Header badge
<div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]"
     style={{ background: '{SECTOR_COLOR}' }} />
<span className="text-xs font-mono text-gray-500">
    {SECTOR_CODE} · {SUBSECTOR} · {FACILITY}
</span>

// Page title
<h1 className="text-3xl font-heading font-bold text-white">

// Section component
<Section title="1. TOGAF Business Architecture" id="togaf">

// Tables
<table className="w-full text-xs border-collapse">
<thead><tr className="border-b border-white/[0.08] text-gray-500">
<th className="text-left px-3 py-2 font-medium">
<td className="px-3 py-2 text-[{COLOR}] font-medium whitespace-nowrap">
<td className="px-3 py-2 text-gray-400">

// ASCII diagram container
<div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
     style={{ background: 'rgba(255,255,255,0.02)' }}>
    <pre className="whitespace-pre leading-relaxed">{`...`}</pre>
</div>

// Highlighted term
<span className="text-[{COLOR}] font-medium">

// See Also pills
<a className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-white/[0.04]"
   style={{ borderColor: `${color}30`, color }}>
```

---

## Phase 4: Integration

After all pages are written, perform these 3 integration steps:

### 4.1 Sidebar Navigation

Edit `src/app/wiki/layout.tsx` — add a new sidebar section:

```tsx
{
    title: '{Sector Name} Deep Dives',
    links: [
        { href: '/wiki/{sector-slug}', label: '{Sector Name} Hub' },
        // One link per facility article
    ],
},
```

### 4.2 Wiki Home Page

Edit `src/app/wiki/page.tsx` — add a card grid section (between existing sections):

```tsx
{/* {Sector Name} Deep Dives */}
<section className="space-y-4">
    <h2 className="text-xl font-heading font-semibold text-white">{Sector Name} Deep Dives</h2>
    <p className="text-sm text-gray-500">...</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {/* One card per facility article */}
    </div>
</section>
```

### 4.3 Sector Page Backlinks

Edit `src/app/wiki/sectors/[code]/page.tsx` — add conditional backlinks:

```tsx
{sector.code === '{CODE}' && (
    <section className="space-y-3 rounded-xl border border-[{COLOR}]/20 p-5"
             style={{ background: 'rgba({R},{G},{B},0.04)' }}>
        <h2>...</h2>
        <div className="grid ...">
            {/* Backlink pills */}
        </div>
    </section>
)}
```

---

## Phase 5: Verification

// turbo
1. Run `npm run build` — must exit with code 0
2. Verify all new routes appear in build output
3. Count: should have 1 hub + N facility articles = N+1 total new routes

---

## Quality Checklist (MANDATORY before marking complete)

For **each** facility article, verify:

- [ ] All 10 sections present (TOGAF, Design, Technical, Process Diagrams, BOM, Purdue, Supporting, Utility, Data Flow, References)
- [ ] At least 3 ASCII art diagrams per article
- [ ] BOM table has 15+ rows with engineering units
- [ ] Purdue model table has 6 rows (L0-L4 + L3.5 DMZ)
- [ ] Regulatory framework table with 5+ standards
- [ ] 6-10 APA references per article
- [ ] See Also section with 4+ backlink pills
- [ ] No truncated content — every section is complete
- [ ] Article is 400-600 lines of TSX
- [ ] Uses the sector's accent color consistently
- [ ] Correct metadata export with title and description
- [ ] Section component defined at bottom of file

For the **hub page**, verify:
- [ ] Executive summary is substantive (not placeholder)
- [ ] Value chain ASCII art diagram present
- [ ] Cross-facility Purdue model comparison table
- [ ] Protocol stack diagram
- [ ] Cybersecurity architecture table
- [ ] Facility article cards grid — one per article
- [ ] References section with 6+ citations

For **integration**, verify:
- [ ] Sidebar nav section added in layout.tsx
- [ ] Home page cards section added in page.tsx
- [ ] Sector page backlinks added in sectors/[code]/page.tsx
- [ ] Build passes (`npm run build` exit code 0)
