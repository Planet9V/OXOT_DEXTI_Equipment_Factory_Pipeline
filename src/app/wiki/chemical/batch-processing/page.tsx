/**
 * Batch Chemical Manufacturing Facilities — Deep Dive Wiki Article.
 *
 * Comprehensive TOGAF-based reference architecture for multi-purpose
 * batch chemical plants (CISA Sector 01, CHEM), including ISA-88
 * recipe management, glass-lined reactor systems, solvent recovery,
 * and campaign-based scheduling for specialty chemicals.
 *
 * @module wiki/chemical/batch-processing/page
 */

export const metadata = {
    title: 'Batch Chemical Manufacturing Facilities — Chemical Wiki',
    description:
        'TOGAF reference architecture for multi-purpose batch chemical plants: ISA-88 control, glass-lined reactors, ' +
        'solvent recovery, separation systems, and campaign scheduling with complete BOMs.',
};

export default function BatchProcessingPage() {
    return (
        <div className="max-w-5xl space-y-10">
            {/* Header */}
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div
                        className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]"
                        style={{ background: '#8B5CF6' }}
                    />
                    <span className="text-xs font-mono text-gray-500">
                        CHEMICAL · SPECIALTY CHEMICALS · BATCH PROCESSING
                    </span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">
                    Batch Chemical Manufacturing
                </h1>
                <p className="text-sm text-gray-500 font-mono">ISA-88 Multi-Purpose Processing</p>
                <p className="text-gray-400 text-base leading-relaxed max-w-3xl">
                    Multi-purpose batch chemical plants are the workhorses of the specialty and fine
                    chemical industry, producing pharmaceuticals intermediates, agrochemicals, dyes,
                    flavours, and performance materials in campaign-based production runs. These
                    facilities employ glass-lined and Hastelloy reactors ranging from 100 to 10,000
                    litres, configured for flexible routing across shared unit operations including
                    reaction, filtration, drying, and milling. Process control follows the ISA-88
                    (IEC 61512) batch standard with hierarchical recipe management, enabling rapid
                    product changeover while maintaining strict cGMP and environmental compliance
                    (ISA, 2010; Sinnott &amp; Towler, 2020).
                </p>
            </div>

            {/* 1. TOGAF Business Architecture */}
            <Section title="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-300 leading-relaxed">
                    The business architecture for batch chemical manufacturing addresses the need for
                    flexible, multi-product capacity within capital-constrained specialty chemical
                    operations. Revenue is driven by high-value, low-volume products with rapid
                    campaign changeover, tight quality specifications, and complex regulatory
                    obligations spanning process safety, environmental protection, and product
                    registration (The Open Group, 2022).
                </p>

                <h3 className="text-sm font-semibold text-white mt-6 mb-2">Stakeholders</h3>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside">
                    <li>Specialty chemical producers and contract manufacturing organisations (CMOs)</li>
                    <li>R&amp;D chemists and process development scientists</li>
                    <li>Process engineers and production supervisors</li>
                    <li>Quality Assurance / Quality Control (QA/QC) departments</li>
                    <li>Regulatory bodies -- OSHA (PSM), EPA (RCRA/CAA), ECHA (REACH)</li>
                    <li>Raw material and solvent suppliers</li>
                    <li>Contract manufacturers and toll processors</li>
                    <li>EPC firms and equipment vendors (De Dietrich, Pfaudler, Ekato)</li>
                </ul>

                <h3 className="text-sm font-semibold text-white mt-6 mb-2">Regulatory Framework</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Standard</th>
                                <th className="text-left px-3 py-2 font-medium">Scope</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['OSHA PSM (29 CFR 1910.119)', 'Process Safety Management for highly hazardous chemicals -- PHA, MOC, mechanical integrity'],
                                ['EPA RCRA (40 CFR 260-270)', 'Hazardous waste generation, storage, treatment, and disposal requirements'],
                                ['REACH / CLP (EC 1907/2006)', 'Chemical registration, evaluation, authorisation; classification, labelling, packaging'],
                                ['ISA-88 / IEC 61512', 'Batch control standard -- procedural hierarchy, recipe management, equipment abstraction'],
                                ['ISA-95 / IEC 62264', 'Enterprise-control integration -- MES/ERP interface, production scheduling, material tracking'],
                                ['ATEX 2014/34/EU', 'Equipment and protective systems for use in potentially explosive atmospheres'],
                                ['NFPA 30 / NFPA 652', 'Flammable liquids code; combustible dust fundamentals -- storage, handling, ventilation'],
                            ].map(([standard, scope]) => (
                                <tr key={standard} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#8B5CF6] font-medium whitespace-nowrap">{standard}</td>
                                    <td className="px-3 py-2 text-gray-400">{scope}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* 2. High-Level Design */}
            <Section title="2. High-Level Design" id="high-level-design">
                <p className="text-sm text-gray-300 leading-relaxed">
                    The plant is organised around a{' '}
                    <span className="text-[#8B5CF6] font-medium">campaign-based scheduling model</span>{' '}
                    with shared multi-purpose equipment trains. An equipment allocation matrix maps
                    each product recipe to permissible reactor, filter, dryer, and mill combinations,
                    enabling concurrent campaigns across independent trains while preventing
                    cross-contamination. Cleaning validation (rinse/swab) gates separate campaigns
                    for different product families.
                </p>

                <h3 className="text-sm font-semibold text-white mt-6 mb-2">Process Flow</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`Raw Materials (drums, IBCs, tankers)
    │
    ▼
Weighing & Dispensing (load cells, ATEX-rated)
    │
    ▼
Charging Station ──► Glass-Lined Reactor (100–10,000 L)
    │                    ├── Jacket heating/cooling (−40 to 200°C)
    │                    ├── Agitator (anchor/retreat curve/Rushton)
    │                    └── Reflux condenser, N₂ blanket, vent scrubber
    │
    ▼
Reaction (controlled T, P, pH, dosing profile per ISA-88 recipe)
    │
    ├── Separation: Nutsche Filter / Basket Centrifuge
    │       └── Filtrate → Solvent Recovery (distillation)
    │
    ├── Liquid-Liquid Extraction (optional, counter-current columns)
    │
    ▼
Drying (vacuum tray / conical screw / fluid bed)
    │
    ▼
Milling (pin mill / jet mill → particle size D50 target)
    │
    ▼
Blending & Formulation
    │
    ▼
Packaging (drums, IBCs, bags) → Warehouse / Dispatch`}</pre>
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">
                    Figure 1. Generalised batch chemical manufacturing process flow for a
                    6-reactor multi-purpose plant with shared downstream equipment.
                </p>
            </Section>

            {/* 3. Detailed Technical Description */}
            <Section title="3. Detailed Technical Description" id="technical">
                <h3 className="text-base font-semibold text-white mt-2 mb-2">3.1 Reaction Systems</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    The reactor train comprises{' '}
                    <span className="text-[#8B5CF6] font-medium">glass-lined steel vessels</span>{' '}
                    (De Dietrich, Pfaudler) for corrosive chemistries and Hastelloy C-276 vessels for
                    high-temperature or halogenated reactions. Agitation is selected per viscosity and
                    mixing regime: anchor agitators for high-viscosity slurries, retreat-curve blades
                    for glass-lined vessels to avoid liner damage, and Rushton turbines for gas-liquid
                    dispersion. Jacket systems provide heating via hot oil (to 350 C) or steam, and
                    cooling via chilled water/glycol (to -40 C). Each reactor is equipped with a reflux
                    condenser, vacuum connection, nitrogen blanketing, and vent line to a caustic or
                    carbon scrubber (Sinnott &amp; Towler, 2020).
                </p>

                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.2 Separation &amp; Purification</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    Solid-liquid separation employs{' '}
                    <span className="text-[#8B5CF6] font-medium">agitated Nutsche filter-dryers</span>{' '}
                    (ANFD) for combined filtration and drying in a single vessel, reducing product
                    transfer losses. Peeler-type basket centrifuges provide high-throughput filtration
                    for crystalline products. Liquid-liquid extraction uses packed or pulsed columns
                    for solvent extraction and purification stages. Crystallisation is performed in
                    jacketed vessels with controlled cooling profiles to achieve target crystal size
                    distribution and polymorphic form.
                </p>

                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.3 Solvent Recovery</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    Batch and continuous distillation columns recover spent solvents (methanol, ethanol,
                    toluene, ethyl acetate, DCM) for reuse. Thin-film evaporators handle heat-sensitive
                    residues. Vapour condensers with sub-zero chilled water maximise recovery rates.
                    Recovered solvent undergoes GC purity testing before return to the clean solvent
                    tank farm. Typical recovery rates exceed 90%, reducing both raw material cost and
                    hazardous waste generation per EPA RCRA requirements.
                </p>

                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.4 Drying &amp; Milling</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    Drying technologies include vacuum tray dryers for small batches, conical screw
                    dryers (Nauta type) for moderate volumes with gentle mixing, and fluid bed dryers
                    for granular products requiring rapid drying. All dryers operate under vacuum
                    (50-200 mbar) with nitrogen sweep to prevent oxidation and maintain ATEX compliance.
                    Size reduction uses pin mills for coarse grinding and{' '}
                    <span className="text-[#8B5CF6] font-medium">spiral jet mills</span>{' '}
                    for micronisation to D50 targets of 2-50 microns with integrated classifier wheels
                    and inert gas milling for dust explosion prevention per NFPA 652.
                </p>

                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.5 Formulation &amp; Packaging</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    Ribbon blenders and V-blenders achieve homogeneous powder blends for multi-component
                    formulations. Filling stations dispense into drums, IBCs, fibre drums, or PE-lined
                    bags via gravimetric dosing with load cell verification. Automated labelling applies
                    GHS-compliant labels with batch traceability barcodes linked to the electronic batch
                    record (eBR) system. Final weighing confirms net weight within specification before
                    warehouse release.
                </p>
            </Section>

            {/* 4. Process Diagrams */}
            <Section title="4. Process Diagrams" id="process-diagrams">
                <h3 className="text-sm font-semibold text-white mb-2">4.1 Batch Production Cycle</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`CHARGE          HEAT           REACT          COOL
  Raw materials     Jacket heat      Controlled       Jacket cool
  weighed &         to setpoint      T/P/pH with      to target T
  transferred       (ramp rate)      dosing profile   for workup
    │                 │                │                │
    ▼                 ▼                ▼                ▼
  ┌───┐            ┌───┐            ┌───┐            ┌───┐
  │ 1 │───────────►│ 2 │───────────►│ 3 │───────────►│ 4 │
  └───┘            └───┘            └───┘            └───┘
                                                       │
    ┌───┐            ┌───┐            ┌───┐            │
    │ 7 │◄───────────│ 6 │◄───────────│ 5 │◄───────────┘
    └───┘            └───┘            └───┘
  PACKAGE          DRY             FILTER
  Drum/IBC fill    Vacuum dry       Nutsche filter
  label, weigh     to LOD spec      cake wash, dry
  batch release    N₂ sweep         centrifuge

Typical cycle time: 12–72 hours per batch (product-dependent)`}</pre>
                </div>

                <h3 className="text-sm font-semibold text-white mt-8 mb-2">4.2 ISA-88 Control Hierarchy</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`PROCEDURE (Master Recipe: "Product X Synthesis")
    │
    ├── UNIT PROCEDURE 1: "Reaction" (allocated to Reactor R-201)
    │       ├── OPERATION: "Charge Solvent"
    │       │       ├── PHASE: Open valve XV-201
    │       │       ├── PHASE: Meter 500 kg via Coriolis
    │       │       └── PHASE: Close valve, verify weight
    │       ├── OPERATION: "Heat to Reflux"
    │       │       ├── PHASE: Ramp jacket to 80°C at 1°C/min
    │       │       └── PHASE: Hold at reflux ±2°C for 4 hours
    │       └── OPERATION: "Cool & Transfer"
    │               ├── PHASE: Cool jacket to 20°C
    │               └── PHASE: Transfer to filter F-301
    │
    ├── UNIT PROCEDURE 2: "Filtration" (allocated to ANFD F-301)
    │       ├── OPERATION: "Filter"
    │       ├── OPERATION: "Cake Wash"
    │       └── OPERATION: "Discharge"
    │
    └── UNIT PROCEDURE 3: "Drying" (allocated to Dryer D-401)
            ├── OPERATION: "Vacuum Dry"
            └── OPERATION: "Discharge & Sample"

Recipe Types: General → Site → Master → Control (ISA-88 S88.01)`}</pre>
                </div>

                <h3 className="text-sm font-semibold text-white mt-8 mb-2">4.3 Recipe-to-Enterprise Data Flow</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`Recipe Management          Batch Execution           Enterprise
─────────────────          ───────────────           ──────────
Master Recipe              DCS / Batch Engine        MES / ERP
    │                          │                         │
    ├─ Header (product,        ├─ Control Recipe         ├─ Production Order
    │  version, approval)      │  (runtime params)       │  (SAP PP-PI)
    │                          │                         │
    ├─ Formula (BOM,           ├─ Phase Logic            ├─ Material Movement
    │  quantities, limits)     │  (PLC/DCS execution)    │  (inventory, CoA)
    │                          │                         │
    └─ Procedure (unit         └─ Electronic Batch       └─ Batch Genealogy
       procedures, phases)        Record (eBR)              (lot tracking)
                                    │
                                    ▼
                               QA Review & Release
                               (21 CFR Part 11 / Annex 11)`}</pre>
                </div>
            </Section>

            {/* 5. Bill of Materials */}
            <Section title="5. Bill of Materials" id="bom">
                <p className="text-sm text-gray-400 mb-3 italic">
                    Scaled for a 6-reactor multi-purpose batch chemical plant with shared
                    downstream separation, drying, milling, and packaging equipment.
                </p>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Equipment</th>
                                <th className="text-left px-3 py-2 font-medium">Specification</th>
                                <th className="text-right px-3 py-2 font-medium">Qty</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Glass-Lined Reactors', 'De Dietrich/Pfaudler, 2,500–10,000 L, AE/BE glass, jacket rated -40 to 200°C', '4'],
                                ['Hastelloy C-276 Reactors', '1,000–4,000 L, ASME VIII, rated 10 bar / 300°C', '2'],
                                ['Reactor Agitators', 'Retreat curve (GL), anchor, Rushton turbine; 5–75 kW drives, VFD', '6'],
                                ['Reflux Condensers', 'Shell-and-tube, SS316L/Hastelloy, 10–50 m² area', '6'],
                                ['Nutsche Filter-Dryers', 'Agitated, SS316L/Hastelloy, 2–6 m² filter area, ATEX rated', '3'],
                                ['Basket Centrifuges', 'Peeler type, SS316L, 800–1,250 mm diameter, 1,200 G', '2'],
                                ['Vacuum Tray Dryers', 'SS316L, 12–24 trays, 50–200 mbar, electric/steam heated', '2'],
                                ['Conical Screw Dryer', 'Nauta type, 1,500–4,000 L, vacuum rated, Hastelloy option', '1'],
                                ['Fluid Bed Dryer', 'Top-spray, 200–500 kg batch, ATEX Zone 20, N₂ inert', '1'],
                                ['Pin Mill', 'SS316L, 10–50 kg/hr, D50 50–500 µm, ATEX Zone 22', '1'],
                                ['Spiral Jet Mill', 'SS316L, 5–20 kg/hr, D50 2–50 µm, N₂ inert, classifier wheel', '1'],
                                ['Ribbon/V-Blenders', 'SS316L, 500–2,000 L, intensifier bar option', '2'],
                                ['Solvent Storage Tanks', 'SS316L, 10,000–50,000 L, N₂ blanketed, bunded', '8'],
                                ['Transfer Pumps', 'Mag-drive centrifugal, diaphragm, peristaltic; ATEX rated', '12'],
                                ['Vacuum Pumps', 'Liquid ring (2,000 m³/hr) and dry screw (500 m³/hr)', '4'],
                                ['Vent Gas Scrubbers', 'Packed column, caustic/acidic wash, 99% removal efficiency', '3'],
                                ['Chiller Units', 'Glycol/brine, -40°C capability, 200–500 kW cooling', '2'],
                                ['Hot Oil System', 'Therminol 66, to 350°C, 500 kW heater, expansion tank', '1'],
                                ['DCS Cabinets', 'Redundant controllers, ISA-88 batch engine, ATEX marshalling', '3'],
                                ['Weighing/Dispensing', 'Load cells (0.1% accuracy), ATEX Zone 1/21, barcode scanning', '4'],
                            ].map(([equip, spec, qty]) => (
                                <tr key={equip} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-gray-300 font-medium">{equip}</td>
                                    <td className="px-3 py-2 text-gray-400">{spec}</td>
                                    <td className="px-3 py-2 text-right text-emerald-500/80 font-mono">{qty}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* 6. Purdue Model Mapping */}
            <Section title="6. Purdue Model Mapping" id="purdue">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Level</th>
                                <th className="text-left px-3 py-2 font-medium">Components</th>
                                <th className="text-left px-3 py-2 font-medium">Functions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Level 0 -- Process', 'Reactors, filters, dryers, mills, valves, instruments (T, P, pH, flow, weight)', 'Physical/chemical transformation, measurement'],
                                ['Level 1 -- Basic Control', 'PLCs, VFDs, control valves, safety interlocks (SIS SIL-2)', 'Regulatory control loops, safety instrumented functions'],
                                ['Level 2 -- Supervisory', 'DCS with ISA-88 batch engine, HMI, batch historian, phase logic', 'Recipe execution, sequence control, batch reporting'],
                                ['Level 3 -- Operations', 'MES (recipe management, scheduling, eBR, genealogy), LIMS, CMMS', 'Production planning, quality, maintenance scheduling'],
                                ['Level 3.5 -- DMZ', 'OT/IT firewalls, data diodes, OPC UA gateway, antivirus servers', 'Security perimeter, IEC 62443 zone/conduit model'],
                                ['Level 4 -- Enterprise', 'ERP (SAP PP-PI), PLM, supply chain, regulatory submission', 'Order management, material planning, compliance reporting'],
                            ].map(([level, components, functions]) => (
                                <tr key={level} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#8B5CF6] font-medium whitespace-nowrap">{level}</td>
                                    <td className="px-3 py-2 text-gray-300">{components}</td>
                                    <td className="px-3 py-2 text-gray-400">{functions}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">
                    The ISA-88 batch engine at Level 2 is the core differentiator versus continuous
                    process plants, managing procedural state machines across allocated equipment units.
                </p>
            </Section>

            {/* 7. Supporting Systems */}
            <Section title="7. Supporting Systems" id="supporting">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">System</th>
                                <th className="text-left px-3 py-2 font-medium">Description</th>
                                <th className="text-left px-3 py-2 font-medium">Specification</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Fire Suppression', 'Foam deluge for solvent storage, dry chemical for reactor bays, sprinkler for warehouses', 'NFPA 30, FM Global DS 7-32'],
                                ['Solvent Vapour Scrubbers', 'Packed-bed caustic/acidic scrubbers on reactor vents and dryer exhausts', '99% removal, pH-controlled recirculation'],
                                ['HVAC (Classified Areas)', 'ATEX-rated supply/extract fans, negative pressure cascade, LEL monitoring', 'ATEX 2014/34/EU Zone 1/2, 15-20 ACH'],
                                ['UPS / Emergency Power', 'Double-conversion UPS for DCS/safety; diesel generator for critical loads', '150 kVA UPS, 1 MW diesel, 72-hr fuel'],
                                ['Emergency Showers/Eyewash', 'ANSI Z358.1 combination units at all chemical handling stations', 'Tepid water (16-38°C), 15-min flow'],
                                ['Spill Containment', 'Bunded reactor bays, chemical-resistant coated floors, sump pumps', '110% largest vessel volume, acid/solvent resistant'],
                                ['Gas Detection', 'Fixed LEL/toxic gas detectors (H₂S, HCl, NH₃), personal monitors', 'SIL-2 rated, <10s T90 response'],
                            ].map(([system, desc, spec]) => (
                                <tr key={system} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-gray-300 font-medium whitespace-nowrap">{system}</td>
                                    <td className="px-3 py-2 text-gray-400">{desc}</td>
                                    <td className="px-3 py-2 text-gray-400">{spec}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* 8. Utility Systems */}
            <Section title="8. Utility Systems" id="utilities">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Utility</th>
                                <th className="text-left px-3 py-2 font-medium">System</th>
                                <th className="text-left px-3 py-2 font-medium">Specification</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Chilled Water / Brine', 'Glycol loop for reactor jackets and condensers', '-15 to 7°C supply, 800 kW refrigeration, SS plate HX'],
                                ['Hot Oil (HTF)', 'Therminol 66 closed-loop for reactor jackets and dryers', 'To 350°C, 500 kW fired heater, expansion vessel, N₂ blanket'],
                                ['Steam', 'Saturated steam for heating jackets, distillation reboilers', '10 bar (180°C), 4 t/hr boiler, condensate return'],
                                ['Nitrogen', 'Blanketing for reactors, dryers, solvent tanks; inert milling gas', 'On-site PSA generator, 99.5% purity, 200 Nm³/hr, 6 bar'],
                                ['Compressed Air (Clean)', 'Instrument air for control valves, actuators, ATEX-rated tools', 'ISO 8573-1 Class 1.2.1, oil-free, -40°C dewpoint, 7 bar'],
                                ['Central Vacuum', 'Liquid-ring and dry-screw pumps serving reactors, filters, dryers', '50-200 mbar, 3,000 m³/hr total, solvent-sealed ring pumps'],
                            ].map(([utility, system, spec]) => (
                                <tr key={utility} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#8B5CF6] font-medium whitespace-nowrap">{utility}</td>
                                    <td className="px-3 py-2 text-gray-300">{system}</td>
                                    <td className="px-3 py-2 text-gray-400">{spec}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* 9. Data Flow Architecture */}
            <Section title="9. Data Flow Architecture" id="data-flow">
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`┌─────────────────────────────────────────────────────────────┐
│ Recipe Authoring (Level 3):                                 │
│   Master Recipe ──(XML/B2MML)──► MES Recipe Manager         │
│                                      │                      │
│ Batch Execution (Level 2):           ▼                      │
│   Control Recipe ──► DCS Batch Engine (ISA-88)              │
│       │                  │                                  │
│       ├── Phase Logic    ├── Process Data (1-sec scan)      │
│       ├── Setpoints      ├── Alarm/Event Journal            │
│       └── Interlocks     └── Electronic Batch Record (eBR)  │
│                                      │                      │
│ Quality (Level 3):                   ▼                      │
│   LIMS ◄── In-process samples    eBR Review                │
│   CoA generation                 (21 CFR 11 / Annex 11)    │
│                                      │                      │
│ Enterprise (Level 4):                ▼                      │
│   ERP (SAP PP-PI) ◄── Batch genealogy, yield, consumption  │
│   SCM ◄── Material movements, inventory reconciliation      │
│   Regulatory ◄── Batch reports for REACH, EPA, OSHA        │
└─────────────────────────────────────────────────────────────┘`}</pre>
                </div>
            </Section>

            {/* 10. References */}
            <Section title="10. References" id="references">
                <div className="space-y-2 text-xs text-gray-400 leading-relaxed">
                    <p>International Society of Automation. (2010). <em>ISA-88.01-2010: Batch control -- Part 1: Models and terminology</em>. ISA.</p>
                    <p>International Electrotechnical Commission. (2017). <em>IEC 61512-1: Batch control -- Part 1: Models and terminology</em> (2nd ed.). IEC.</p>
                    <p>International Society of Automation. (2010). <em>ISA-95.00.01-2010: Enterprise-control system integration -- Part 1: Models and terminology</em>. ISA.</p>
                    <p>International Electrotechnical Commission. (2013). <em>IEC 62264-1: Enterprise-control system integration -- Part 1</em>. IEC.</p>
                    <p>Sinnott, R. K., &amp; Towler, G. (2020). <em>Chemical engineering design: Principles, practice and economics of plant and process design</em> (6th ed.). Butterworth-Heinemann.</p>
                    <p>Occupational Safety and Health Administration. (2000). <em>Process safety management of highly hazardous chemicals (29 CFR 1910.119)</em>. OSHA.</p>
                    <p>National Fire Protection Association. (2021). <em>NFPA 30: Flammable and combustible liquids code</em>. NFPA.</p>
                    <p>The Open Group. (2022). <em>TOGAF Standard, Version 10</em>. The Open Group.</p>
                </div>
            </Section>

            {/* See Also */}
            <Section title="See Also" id="see-also">
                <div className="flex flex-wrap gap-2">
                    {[
                        { href: '/wiki/chemical', label: 'Chemical Sector Hub', color: '#8B5CF6' },
                        { href: '/wiki/chemical/api-manufacturing', label: 'API Manufacturing', color: '#8B5CF6' },
                        { href: '/wiki/dexpi/equipment-classes', label: 'DEXPI Equipment Classes', color: '#06B6D4' },
                        { href: '/wiki/sectors/CHEM', label: 'Chemical Sector Overview', color: '#8B5CF6' },
                    ].map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-white/[0.04]"
                            style={{ borderColor: `${link.color}30`, color: link.color }}
                        >
                            {link.label} →
                        </a>
                    ))}
                </div>
            </Section>
        </div>
    );
}

/** Reusable section component. */
function Section({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
    return (
        <section id={id} className="space-y-4">
            <h2 className="text-xl font-heading font-semibold text-white">{title}</h2>
            {children}
        </section>
    );
}
