/**
 * Surface Water Treatment Plants — Deep-Dive Wiki Article.
 *
 * Comprehensive TOGAF-based reference architecture for conventional surface
 * water treatment plants (1–500 MGD) covering coagulation, flocculation,
 * sedimentation, filtration, and multi-barrier disinfection.
 *
 * @module wiki/water/treatment-plants/page
 */

export const metadata = {
    title: 'Surface Water Treatment Plants — Water Sector Wiki',
    description:
        'TOGAF reference architecture for conventional surface water treatment: coagulation, ' +
        'flocculation, sedimentation, dual-media filtration, and disinfection (Cl₂/UV/O₃).',
};

export default function TreatmentPlantsPage() {
    return (
        <div className="max-w-5xl space-y-10">
            {/* Header */}
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <div
                        className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]"
                        style={{ background: '#06B6D4' }}
                    />
                    <span className="text-xs font-mono text-gray-500">
                        WATR · WATR-DW · WATR-DW-WTP
                    </span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">
                    Surface Water Treatment Plants
                </h1>
                <p className="text-sm text-gray-400 leading-relaxed max-w-3xl">
                    Conventional surface water treatment facilities process raw water from rivers,
                    lakes, and reservoirs through a multi-barrier treatment train — coagulation,
                    flocculation, sedimentation, granular media filtration, and disinfection — to
                    produce potable water meeting Safe Drinking Water Act (SDWA) maximum contaminant
                    levels (MCLs). This article covers a reference 50 MGD plant scaled from the
                    AWWA/ASCE design manuals and the Great Lakes–Upper Mississippi River Board of
                    State and Provincial Public Health and Environmental Managers (10 States Standards).
                </p>
            </div>

            {/* 1. TOGAF Business Architecture */}
            <Section title="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-300 leading-relaxed">
                    The business architecture for a public surface water utility defines the stakeholders,
                    regulatory drivers, and value streams that shape technology and process decisions throughout
                    the facility lifecycle.
                </p>
                <h4 className="text-xs font-semibold text-white mt-4 mb-2">Key Stakeholders</h4>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li><span className="text-[#06B6D4] font-medium">Water Utility / Municipality</span> — Owner-operator responsible for day-to-day O&amp;M and capital planning</li>
                    <li><span className="text-[#06B6D4] font-medium">EPA</span> — Federal SDWA enforcement, MCL rulemaking, CCR requirements</li>
                    <li><span className="text-[#06B6D4] font-medium">State Primacy Agency / DEQ</span> — Delegated permitting, compliance inspections, sanitary surveys</li>
                    <li><span className="text-[#06B6D4] font-medium">Licensed Operators</span> — State-certified Class III/IV operators managing treatment processes</li>
                    <li><span className="text-[#06B6D4] font-medium">Engineering Consultants</span> — Design of treatment upgrades, pilot studies, regulatory submittals</li>
                    <li><span className="text-[#06B6D4] font-medium">Chemical Suppliers</span> — Coagulants (alum, ferric chloride), polymers, disinfectants (Cl₂, NaOCl)</li>
                    <li><span className="text-[#06B6D4] font-medium">AWWA</span> — Standards development (B-series chemicals, C-series pipe), operator training</li>
                </ul>

                <h4 className="text-xs font-semibold text-white mt-4 mb-2">Regulatory Framework</h4>
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
                                ['SDWA (42 U.S.C. §300f)', 'Federal authority for drinking water standards and enforcement'],
                                ['40 CFR Part 141', 'National Primary Drinking Water Regulations — MCLs and treatment techniques'],
                                ['40 CFR Part 142', 'State primacy requirements for SDWA implementation'],
                                ['Surface Water Treatment Rule (SWTR)', 'CT disinfection requirements, 3-log Giardia / 4-log virus removal'],
                                ['LT2ESWTR', 'Enhanced treatment for Cryptosporidium, additional CT credits'],
                                ['Stage 2 DBPR', 'Disinfection by-product (TTHM, HAA5) compliance based on LRAAs'],
                                ['Lead and Copper Rule Revisions', 'Action levels for Pb/Cu, optimized corrosion control treatment'],
                                ['10 States Standards (GLUMRB)', 'Recommended design standards for WTP capacity, redundancy, chemical storage'],
                                ['NSF/ANSI 60/61', 'Certification of treatment chemicals and components contacting drinking water'],
                                ['AWWA B/C-Series', 'Chemical quality (B-series) and infrastructure (C-series) standards'],
                            ].map(([std, scope]) => (
                                <tr key={std} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#06B6D4] font-medium whitespace-nowrap">{std}</td>
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
                    The canonical design for a conventional surface water treatment plant follows a
                    multi-barrier approach with{' '}
                    <span className="text-[#06B6D4] font-medium">N+1 redundancy</span> at each
                    critical stage. The treatment train is designed for peak-day demand with the
                    largest unit out of service, per 10 States Standards guidelines.
                </p>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto mt-4"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`Raw Water Intake ──► Rapid Mix ──► Flocculation ──► Sedimentation ──► Filtration ──► Clearwell ──► Distribution
│                    │              │                │                │              │
│  Coagulant ────────┘              │                │                │              │
│  (Alum/FeCl₃)                    │                │                │              │
│                                  │                │                │              │
│  Polymer ────────────────────────┘                │                │              │
│  (Cationic/Anionic)                               │                │              │
│                                                   │                │              │
│  Sludge ──────────────────────────────────────────┘                │              │
│  (To thickener → dewatering → disposal)                           │              │
│                                                                   │              │
│                                                            Backwash │              │
│                                                            Recycle  │              │
│                                                                     │              │
│  Disinfectant (Cl₂ or NaOCl) ───────────────────────────────────────┘              │
│  Fluoride (H₂SiF₆) ──────────────────────────────────────────────────────────────┘
│  pH Adjustment (NaOH/Lime) ──────────────────────────────────────────────────────→

 ┌─────────────────────────────────────────────────────────────────────────────────┐
 │  CAPACITY: 50 MGD reference plant (peak day)                                    │
 │  REDUNDANCY: N+1 filters, dual chemical feed, standby pumps                     │
 │  DESIGN STANDARD: 10 States Standards + SWTR/LT2ESWTR CT compliance            │
 └─────────────────────────────────────────────────────────────────────────────────┘`}</pre>
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">
                    Figure 1. Conventional surface water treatment train for a 50 MGD reference plant
                    showing coagulant/polymer addition points and sludge/backwash recycle streams.
                </p>
            </Section>

            {/* 3. Detailed Technical Description */}
            <Section title="3. Detailed Technical Description" id="technical">
                {/* 3.1 Intake & Chemical Feed */}
                <h3 className="text-sm font-semibold text-white mt-4">3.1 Raw Water Intake &amp; Chemical Feed</h3>
                <p className="text-xs text-gray-400 leading-relaxed mt-1">
                    The intake structure is positioned in the source water body (river, lake, or reservoir)
                    at a depth to minimize algae and sediment entrainment. Traveling water screens
                    (3/8″ mesh, 304SS) prevent debris from entering the raw water pumps. Raw water
                    pumps (vertical turbine or horizontal split-case) deliver water to the rapid mix basins.
                </p>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside mt-2">
                    <li>Raw water intake pumps: 4× vertical turbine, 600 HP each, 12.5 MGD/pump, TDH 45 ft</li>
                    <li>Traveling water screens: 2× (1 duty + 1 standby), 3/8″ mesh, 10 ft wide</li>
                    <li>Rapid mix chambers: 2× back-mix reactors, G = 600–1,000 s⁻¹, 30-second detention</li>
                    <li>Coagulant feed: Alum (liquid, 48.5%) or ferric chloride (FeCl₃, 42%), dose 10–60 mg/L</li>
                    <li>Polymer feed: Cationic polymer, dose 0.1–1.0 mg/L, aging tanks with 60-min retention</li>
                    <li>Chemical metering pumps: 8× diaphragm, 0–50 GPH, ±1% accuracy, 4–20 mA flow-paced</li>
                </ul>

                {/* 3.2 Coagulation/Flocculation */}
                <h3 className="text-sm font-semibold text-white mt-6">3.2 Coagulation &amp; Flocculation</h3>
                <p className="text-xs text-gray-400 leading-relaxed mt-1">
                    Coagulation destabilizes colloidal particles via charge neutralization using aluminum
                    or iron salts. Flocculation gently agitates the water to aggregate micro-flocs into
                    settleable macro-flocs. Three-stage tapered flocculation provides decreasing energy
                    input (G-values) to build robust floc without shearing.
                </p>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside mt-2">
                    <li>Flocculation basins: 6× (3 stages × 2 trains), total 20–30 min HRT</li>
                    <li>Stage 1: G = 50–80 s⁻¹ (rapid aggregation), 15 HP vertical turbine mixers</li>
                    <li>Stage 2: G = 30–50 s⁻¹ (intermediate), 10 HP paddle flocculators</li>
                    <li>Stage 3: G = 10–30 s⁻¹ (gentle conditioning), 5 HP paddle flocculators</li>
                    <li>Jar test apparatus for daily coagulant dose optimization</li>
                </ul>

                {/* 3.3 Sedimentation */}
                <h3 className="text-sm font-semibold text-white mt-6">3.3 Sedimentation &amp; Clarification</h3>
                <p className="text-xs text-gray-400 leading-relaxed mt-1">
                    Sedimentation basins provide quiescent conditions for floc settlement. Conventional
                    rectangular basins or circular clarifiers achieve overflow rates of 600–1,000 gpd/ft².
                    Tube settlers or plate settlers may be retrofit to increase effective settling area
                    by 4–6×, enabling higher hydraulic loading rates.
                </p>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside mt-2">
                    <li>Rectangular basins: 4× units, 200 ft L × 50 ft W × 14 ft SWD each</li>
                    <li>Overflow rate: 600–1,000 gpd/ft² (1,200 with plate settlers)</li>
                    <li>Detention time: 2–4 hours at design flow</li>
                    <li>Sludge collection: chain-and-flight collectors, 2 fpm travel speed</li>
                    <li>Sludge blowdown pumps: 4× progressive cavity, 200 GPM, 15 HP</li>
                    <li>Settled water turbidity target: &lt;2 NTU (pre-filtration)</li>
                </ul>

                {/* 3.4 Filtration */}
                <h3 className="text-sm font-semibold text-white mt-6">3.4 Granular Media Filtration</h3>
                <p className="text-xs text-gray-400 leading-relaxed mt-1">
                    Rapid gravity dual-media filters (anthracite over sand) remove remaining suspended
                    solids to achieve ≤0.1 NTU in individual filter effluent per the IESWTR. Filters
                    operate in declining-rate or constant-rate mode with automatic backwash triggered
                    by head loss (&gt;8 ft) or turbidity breakthrough.
                </p>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside mt-2">
                    <li>Filter cells: 8× gravity dual-media (N+1 redundancy), 1,000 ft² each</li>
                    <li>Media: 24″ anthracite (ES 1.0 mm) over 12″ sand (ES 0.5 mm) over 12″ gravel support</li>
                    <li>Loading rate: 4–6 gpm/ft² (filter rate), 15–20 gpm/ft² backwash rate</li>
                    <li>Filter effluent turbidity: ≤0.1 NTU (95th percentile), ≤0.3 NTU (max)</li>
                    <li>Backwash: air scour (3–5 scfm/ft²) + high-rate wash, 15-minute cycle</li>
                    <li>Filter-to-waste: first 15 minutes post-backwash diverted to waste</li>
                    <li>Online turbidimeters: 1 per filter + 1 combined effluent (Hach 1720E or equiv.)</li>
                </ul>

                {/* 3.5 Disinfection & Clearwell */}
                <h3 className="text-sm font-semibold text-white mt-6">3.5 Disinfection &amp; Clearwell</h3>
                <p className="text-xs text-gray-400 leading-relaxed mt-1">
                    Multi-barrier disinfection achieves the CT (concentration × time) requirements
                    of the SWTR: 3-log Giardia inactivation (CT = 104–308 mg·min/L for chlorine at
                    0.5–10 °C) and 4-log virus inactivation. UV may provide supplemental
                    Cryptosporidium inactivation per the LT2ESWTR (40 mJ/cm² for 2-log credit).
                </p>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside mt-2">
                    <li>Primary disinfection: Sodium hypochlorite (NaOCl, 12.5%), dose 1–4 mg/L free Cl₂</li>
                    <li>Clearwell: 2× baffled concrete tanks, 2.5 MG each, T₁₀/T ratio ≥0.7</li>
                    <li>Contact time: 30–90 minutes depending on temperature and pH</li>
                    <li>UV disinfection (optional): 4× medium-pressure reactors, 40 mJ/cm², validated per UVDGM</li>
                    <li>Residual target: 0.2 mg/L free Cl₂ at entry to distribution (4-log virus CT)</li>
                    <li>Fluoride addition: Hydrofluorosilicic acid (H₂SiF₆), target 0.7 mg/L per PHS recommendation</li>
                    <li>pH adjustment: NaOH or lime, target pH 7.2–7.8 for corrosion control (Langelier SI ≥ 0)</li>
                    <li>High-service pumps: 6× horizontal split-case, 500 HP each, 8.3 MGD/pump, TDH 180 ft</li>
                </ul>
            </Section>

            {/* 4. Process Diagrams */}
            <Section title="4. Process Diagrams" id="process-diagrams">
                {/* 4.1 Water Treatment Flow */}
                <h3 className="text-sm font-semibold text-white">4.1 Water Treatment Process Flow</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto mt-2"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`SOURCE → SCREEN → RAW PUMP → RAPID MIX → FLOC 1 → FLOC 2 → FLOC 3
                      │           ↑                │
                      │     Coagulant (Alum)        │
                      │     Polymer                 │
                      ▼                             ▼
                 SEDIMENTATION (4 basins)     Sludge → Thickener → Dewatering → Disposal
                      │
                      ▼
                 FILTRATION (8 dual-media cells)  ← Backwash Recycle
                      │
                      ▼
                 CLEARWELL (2 × 2.5 MG)
                      │ ← Cl₂/NaOCl dosing
                      │ ← Fluoride (H₂SiF₆)
                      │ ← pH adjust (NaOH)
                      ▼
                 HIGH-SERVICE PUMPS (6 × 500 HP)
                      │
                      ▼
                 DISTRIBUTION SYSTEM`}</pre>
                </div>

                {/* 4.2 Chemical Feed Control */}
                <h3 className="text-sm font-semibold text-white mt-6">4.2 Chemical Feed Control Flow</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto mt-2"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`Flow Meter ─────┐
                │
Turbidimeter ───┤──► PLC Chemical Feed Control ──► Metering Pumps
                │         │                           │
pH Analyzer ────┤         │                     Coagulant │ Polymer │ Cl₂ │ Fluoride │ NaOH
                │         │                           │
Streaming ──────┘         ▼                           ▼
Current (SCD)        SCADA HMI ◄───── Historian ──► LIMS
                     (Operator)       (60-sec log)   (Compliance)`}</pre>
                </div>

                {/* 4.3 SCADA Data Flow */}
                <h3 className="text-sm font-semibold text-white mt-6">4.3 SCADA &amp; Data Flow Architecture</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto mt-2"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`┌─────────── FIELD (L0/L1) ───────────┐
│ 4-20mA/HART │ Modbus RTU │ SDI-12   │  ~500 I/O points
│ Analyzers, valves, pumps, levels    │  1-sec scan rate
└──────────────┬──────────────────────┘
               │ Ethernet/IP + Modbus TCP
┌──────────────▼──────────────────────┐
│         PLANT SCADA (L2)            │
│ Redundant PLCs (Allen-Bradley/S7)   │  2 × PLC racks
│ HMIs (4 workstations)              │  Historian (OSIsoft PI / Wonderware)
└──────────────┬──────────────────────┘
               │ OPC UA / Encrypted
┌──────────────▼──────────────────────┐
│         DMZ (L3.5)                  │
│ Firewall ─ Historian Mirror ─ AV    │  Data diode (optional)
└──────────────┬──────────────────────┘
               │ HTTPS / REST / MQTT
┌──────────────▼──────────────────────┐
│         ENTERPRISE (L4)             │
│ LIMS │ CMMS │ Billing │ CCR │ GIS  │  Cloud / on-prem
│ EPA e-reporting │ State portal      │
└─────────────────────────────────────┘`}</pre>
                </div>
            </Section>

            {/* 5. Bill of Materials */}
            <Section title="5. Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2 italic">
                    Scaled for a 50 MGD conventional surface water treatment plant with dual-media
                    filtration and sodium hypochlorite disinfection.
                </p>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Equipment Type</th>
                                <th className="text-left px-3 py-2 font-medium">Specification</th>
                                <th className="text-left px-3 py-2 font-medium">Qty</th>
                                <th className="text-left px-3 py-2 font-medium">Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Raw Water Intake Pump', 'Vertical turbine, 316SS impeller', '4', '600 HP, 12.5 MGD each'],
                                ['Traveling Water Screen', '3/8″ mesh, 304SS, auto-wash', '2', '10 ft wide, 5 HP drive'],
                                ['Rapid Mix Chamber', 'Back-mix reactor, 316SS shaft', '2', 'G = 800 s⁻¹, 30-sec DT'],
                                ['Flocculation Basin', '3-stage tapered, vertical turbine', '6', '5–15 HP per stage'],
                                ['Sedimentation Basin', 'Rectangular, chain-and-flight collector', '4', '200×50×14 ft SWD'],
                                ['Plate Settler Module', '60° inclined plates, PVC', '4', '1,200 gpd/ft² effective OFR'],
                                ['Sludge Blowdown Pump', 'Progressive cavity, hardened rotor', '4', '200 GPM, 15 HP'],
                                ['Dual-Media Filter Cell', 'Anthracite/sand, air scour capable', '8', '1,000 ft², 4–6 gpm/ft²'],
                                ['Filter Backwash Pump', 'Horizontal split-case', '3', '350 HP, 20 gpm/ft² rate'],
                                ['Online Turbidimeter', 'Laser nephelometric, 0–1,000 NTU', '10', '1 per filter + combined'],
                                ['Clearwell Tank', 'Baffled concrete, T₁₀/T ≥ 0.7', '2', '2.5 MG each'],
                                ['NaOCl Storage & Feed', 'FRP tanks + diaphragm pumps', '2+4', '5,000 gal tanks, 0–50 GPH pumps'],
                                ['UV Reactor (optional)', 'Medium-pressure, validated UVDGM', '4', '40 mJ/cm², 25 kW each'],
                                ['Fluoride Feed System', 'H₂SiF₆ day tank + metering pump', '2', '0.7 mg/L target'],
                                ['pH Adjustment System', 'NaOH, 25% solution, metering pump', '2', '0–30 GPH, ±1% accuracy'],
                                ['High-Service Pump', 'Horizontal split-case, VFD', '6', '500 HP, 8.3 MGD, TDH 180 ft'],
                                ['Chlorine Analyzer', 'Amperometric, free/total Cl₂', '8', '0–5 mg/L, ±0.02 mg/L'],
                                ['pH/ORP Analyzer', 'Digital electrode, auto-wash', '6', 'pH 0–14, ±0.01'],
                                ['Flow Meter', 'Electromagnetic, flanged', '8', '6–48″ line sizes, ±0.5%'],
                                ['Sludge Thickener', 'Gravity, circular, 30 ft dia.', '2', '4–6% solids output'],
                                ['Belt Filter Press', 'Dual-belt, polymer conditioned', '2', '1.5 m belt, 25% cake solids'],
                                ['SCADA PLC Panel', 'Redundant hot-standby, Ethernet/IP', '4', '~500 I/O points total'],
                                ['Emergency Generator', 'Diesel, 2,000 kW, ATS', '2', 'NFPA 110 Type 10 (10-sec start)'],
                            ].map(([equip, spec, qty, rating]) => (
                                <tr key={equip} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#06B6D4] font-medium whitespace-nowrap">{equip}</td>
                                    <td className="px-3 py-2 text-gray-400">{spec}</td>
                                    <td className="px-3 py-2 text-gray-400 text-center">{qty}</td>
                                    <td className="px-3 py-2 text-gray-400">{rating}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* 6. Purdue Model */}
            <Section title="6. Purdue Model Mapping" id="purdue">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Level</th>
                                <th className="text-left px-3 py-2 font-medium">Components</th>
                                <th className="text-left px-3 py-2 font-medium">Protocols / Functions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['L0 — Process', 'Pumps, valves, screens, chemical feeders, filter actuators, UV lamps', '4–20 mA, HART, discrete I/O'],
                                ['L1 — Basic Control', 'PLCs (Allen-Bradley ControlLogix / Siemens S7-1500), motor starters, VFDs', 'Ethernet/IP, Modbus RTU, DeviceNet'],
                                ['L2 — Supervisory', 'SCADA HMIs (4 workstations), alarm management, trend displays', 'OPC UA, Modbus TCP, DNP3'],
                                ['L3 — Operations', 'Historian (OSIsoft PI), LIMS, process optimization models, compliance reporting', 'SQL, OPC-HDA, REST APIs'],
                                ['L3.5 — DMZ', 'Firewalls (Palo Alto/Fortinet), historian mirror, AV relay, patch server', 'Unidirectional gateway, HTTPS'],
                                ['L4 — Enterprise', 'CMMS (Maximo/SAP), CIS/billing, CCR portal, EPA e-reporting, GIS', 'REST, MQTT, HTTPS, WaterML 2.0'],
                            ].map(([level, components, protocols]) => (
                                <tr key={level} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#06B6D4] font-mono font-medium whitespace-nowrap">{level}</td>
                                    <td className="px-3 py-2 text-gray-400">{components}</td>
                                    <td className="px-3 py-2 text-gray-400">{protocols}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">
                    Table 2. Purdue model mapping for a 50 MGD surface water treatment plant,
                    aligned with ISA-95 and NIST SP 800-82 Rev. 3 cybersecurity zones.
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
                                ['HVAC', 'Chemical rooms ventilation, control room conditioning', '15 ACH chemical areas, R-410A split systems'],
                                ['Emergency Power', 'Diesel generators with ATS', '2 × 2,000 kW, NFPA 110 Type 10'],
                                ['UPS', 'SCADA and critical instrumentation backup', '30 kVA, 30-min runtime'],
                                ['Chemical Containment', 'Secondary containment for all bulk chemicals', '110% volume, acid-resistant coatings per UBC'],
                                ['Chlorine Leak Detection', 'Gas detectors in NaOCl/Cl₂ storage rooms', 'Electrochemical, 0.5 ppm alarm, auto-ventilation'],
                                ['Fire Protection', 'Sprinklers, chemical room foam suppression', 'NFPA 13 (sprinkler), NFPA 30 (flammable storage)'],
                                ['Lightning Protection', 'Air terminals, ground ring, surge protection', 'NFPA 780, UL 96A'],
                                ['Physical Security', 'Perimeter fencing, CCTV, access control', 'AWIA §2013 compliance, card access'],
                            ].map(([system, desc, spec]) => (
                                <tr key={system} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#06B6D4] font-medium whitespace-nowrap">{system}</td>
                                    <td className="px-3 py-2 text-gray-400">{desc}</td>
                                    <td className="px-3 py-2 text-gray-400">{spec}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* 8. Chemical Feed Systems */}
            <Section title="8. Chemical Feed Systems" id="chemical-feed">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Chemical</th>
                                <th className="text-left px-3 py-2 font-medium">Application</th>
                                <th className="text-left px-3 py-2 font-medium">Feed System</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Alum (Al₂(SO₄)₃)', 'Primary coagulant for turbidity removal', 'Bulk tank, diaphragm pump, flow-paced, 10–60 mg/L'],
                                ['Ferric Chloride (FeCl₃)', 'Alternative coagulant (low-T performance)', 'Tote IBC, peristaltic pump, 5–40 mg/L'],
                                ['Cationic Polymer', 'Flocculation aid, filter conditioning', 'Dry feed + aging tank, 60-min hydration, 0.1–1.0 mg/L'],
                                ['Sodium Hypochlorite (NaOCl)', 'Primary disinfectant', 'Bulk FRP tanks, diaphragm pump, 1–4 mg/L free Cl₂'],
                                ['Fluorosilicic Acid (H₂SiF₆)', 'Fluoridation per CDC recommendation', 'Day tank, metering pump, 0.7 mg/L target'],
                                ['Sodium Hydroxide (NaOH)', 'pH adjustment, corrosion control', '25% solution, metering pump, target pH 7.2–7.8'],
                                ['Powdered Activated Carbon', 'Taste/odor control (seasonal)', 'Dry feeder + slurry tank, 5–20 mg/L'],
                            ].map(([chem, app, feed]) => (
                                <tr key={chem} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#06B6D4] font-medium whitespace-nowrap">{chem}</td>
                                    <td className="px-3 py-2 text-gray-400">{app}</td>
                                    <td className="px-3 py-2 text-gray-400">{feed}</td>
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
                    <pre className="whitespace-pre leading-relaxed">{`TIER 1 — FIELD INSTRUMENTS (~500 points)
├── Turbidimeters (10)         → 4-20 mA → PLC    @ 1 sec
├── Chlorine Analyzers (8)     → 4-20 mA → PLC    @ 5 sec
├── pH/ORP Analyzers (6)       → HART     → PLC    @ 5 sec
├── Flow Meters (8)            → 4-20 mA → PLC    @ 1 sec
├── Level Transmitters (12)    → 4-20 mA → PLC    @ 2 sec
├── Pump Status/VFD (16)       → Discrete  → PLC    @ 100 ms
├── Valve Position (20)        → Discrete  → PLC    @ 100 ms
└── Chemical Feed Rate (8)     → 4-20 mA → PLC    @ 1 sec

TIER 2 — PLANT SCADA (4 PLC racks, 2 redundant servers)
├── Real-time display          → HMI      → Operator   @ 1 sec
├── Alarm management           → HMI      → Operator   @ event
├── Trend logging              → Historian → 60 sec archive
├── Chemical dose control      → PLC      → Metering    @ 1 sec (closed-loop)
├── Filter backwash sequencing → PLC      → Actuators   @ event
└── CT compliance calc         → PLC      → Historian   @ 1 min

TIER 3 — ENTERPRISE (via DMZ)
├── LIMS (lab results)         → SQL      → Monthly     compliance
├── CCR (consumer confidence)  → Report   → Annual      regulatory
├── CMMS (work orders)         → REST     → On-demand   maintenance
├── EPA e-Reporting (SDWIS)    → XML      → Quarterly   regulatory
├── GIS (asset location)       → WFS      → On-demand   spatial
└── Billing/CIS                → ODBC     → Monthly     revenue`}</pre>
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">
                    Figure 4. Three-tier data flow architecture showing ~500 field I/O points
                    flowing through plant SCADA to enterprise systems via the L3.5 DMZ.
                </p>
            </Section>

            {/* 10. References */}
            <Section title="10. References" id="references">
                <div className="space-y-2 text-xs text-gray-400 leading-relaxed">
                    <p>
                        American Water Works Association. (2011).{' '}
                        <em>Water Treatment Plant Design</em> (5th ed., AWWA/ASCE). McGraw-Hill.
                    </p>
                    <p>
                        Great Lakes–Upper Mississippi River Board. (2018).{' '}
                        <em>Recommended Standards for Water Works (10 States Standards)</em>. Health Education Services.
                    </p>
                    <p>
                        Kawamura, S. (2000).{' '}
                        <em>Integrated Design and Operation of Water Treatment Facilities</em> (2nd ed.). Wiley.
                    </p>
                    <p>
                        National Institute of Standards and Technology. (2023).{' '}
                        <em>SP 800-82 Rev. 3: Guide to Operational Technology (OT) Security</em>. NIST.
                    </p>
                    <p>
                        U.S. Environmental Protection Agency. (2006).{' '}
                        <em>Ultraviolet Disinfection Guidance Manual (UVDGM)</em>. EPA 815-R-06-007.
                    </p>
                    <p>
                        U.S. Environmental Protection Agency. (1999).{' '}
                        <em>Enhanced Surface Water Treatment Rule (ESWTR)</em>. 40 CFR Parts 141–142.
                    </p>
                    <p>
                        U.S. Environmental Protection Agency. (2006).{' '}
                        <em>Stage 2 Disinfectants and Disinfection Byproducts Rule</em>. 40 CFR Parts 9, 141, 142.
                    </p>
                    <p>
                        U.S. Environmental Protection Agency. (2024).{' '}
                        <em>Lead and Copper Rule Improvements</em>. EPA-HQ-OW-2024-0093.
                    </p>
                </div>
            </Section>

            {/* See Also */}
            <Section title="See Also" id="see-also">
                <div className="flex flex-wrap gap-2">
                    {[
                        { href: '/wiki/water', label: 'Water Sector Hub', color: '#06B6D4' },
                        { href: '/wiki/water/distribution', label: 'Distribution Networks', color: '#0EA5E9' },
                        { href: '/wiki/water/pump-stations', label: 'Pump Stations', color: '#8B5CF6' },
                        { href: '/wiki/sectors/WATR', label: 'WATR Sector Overview', color: '#06B6D4' },
                        { href: '/wiki/dexpi/equipment-classes', label: 'DEXPI Equipment Classes', color: '#8B5CF6' },
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
function Section({
    title,
    id,
    children,
}: {
    title: string;
    id: string;
    children: React.ReactNode;
}) {
    return (
        <section id={id} className="space-y-4">
            <h2 className="text-xl font-heading font-semibold text-white">{title}</h2>
            {children}
        </section>
    );
}
