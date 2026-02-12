/**
 * Wastewater Treatment (POTW) — Deep-Dive Wiki Article.
 *
 * Comprehensive TOGAF-based reference architecture for Publicly Owned Treatment
 * Works (POTWs) including preliminary, primary, secondary (activated sludge),
 * and tertiary treatment with BNR, anaerobic digestion, and dewatering.
 *
 * @module wiki/water/wastewater/page
 */

export const metadata = {
    title: 'Wastewater Treatment (POTW) — Water Sector Wiki',
    description:
        'TOGAF reference architecture for activated sludge POTWs: primary/secondary/tertiary treatment, ' +
        'BNR, anaerobic digestion with biogas CHP, dewatering, and NPDES compliance.',
};

export default function WastewaterPage() {
    return (
        <div className="max-w-5xl space-y-10">
            {/* Header */}
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <div
                        className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]"
                        style={{ background: '#10B981' }}
                    />
                    <span className="text-xs font-mono text-gray-500">
                        WATR · WATR-WW · POTW
                    </span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">
                    Wastewater Treatment (POTW)
                </h1>
                <p className="text-sm text-gray-400 leading-relaxed max-w-3xl">
                    Publicly Owned Treatment Works (POTWs) protect public health and the environment
                    by treating municipal wastewater to stringent Clean Water Act (CWA) discharge
                    limits. This article covers a reference 50 MGD activated sludge facility with
                    biological nutrient removal (BNR), anaerobic digestion with combined heat and
                    power (CHP), and tertiary filtration — the predominant configuration for large
                    metropolitan facilities in the United States.
                </p>
            </div>

            {/* 1. TOGAF Business Architecture */}
            <Section title="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-300 leading-relaxed">
                    POTWs are the nexus of environmental protection, public health, and increasingly,
                    resource recovery. The shift from &quot;treatment&quot; to &quot;water resource recovery
                    facility&quot; (WRRF) reflects the modernization toward energy-neutral operations,
                    nutrient recovery, and water reuse.
                </p>
                <h4 className="text-xs font-semibold text-white mt-4 mb-2">Key Stakeholders</h4>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li><span className="text-[#10B981] font-medium">Municipality / Authority</span> — Owner-operator managing NPDES compliance and capital programs</li>
                    <li><span className="text-[#10B981] font-medium">EPA</span> — CWA enforcement, NPDES permit issuance, effluent guidelines (40 CFR 133)</li>
                    <li><span className="text-[#10B981] font-medium">State DEQ</span> — Delegated NPDES permitting, compliance inspections, TMDLs</li>
                    <li><span className="text-[#10B981] font-medium">Licensed Operators</span> — Class A/B operators managing process control per operator certification</li>
                    <li><span className="text-[#10B981] font-medium">Industrial Pretreatment Users</span> — Significant industrial users (SIUs) with pretreatment permits</li>
                    <li><span className="text-[#10B981] font-medium">WEF / AWWA</span> — Standards, operator training, technical guidance (MOPs)</li>
                    <li><span className="text-[#10B981] font-medium">Biosolids End Users</span> — Land application sites, composting, or thermal drying facilities</li>
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
                                ['Clean Water Act (33 U.S.C. §1251)', 'Federal authority for water pollution control and NPDES permit program'],
                                ['40 CFR Part 133', 'Secondary treatment standards: BOD₅ ≤30 mg/L, TSS ≤30 mg/L, pH 6–9'],
                                ['NPDES Permit (Facility-Specific)', 'Effluent limits for BOD, TSS, NH₃-N, TP, TN, fecal coliform, metals'],
                                ['40 CFR Part 136', 'Approved analytical methods for compliance monitoring'],
                                ['40 CFR Part 503', 'Biosolids management: Class A/B pathogen reduction, vector attraction'],
                                ['NFPA 820', 'Fire protection classification zones for wastewater facilities'],
                                ['OSHA 29 CFR 1910.146', 'Confined space entry for digesters, wet wells, manholes'],
                                ['OSHA PSM (29 CFR 1910.119)', 'Applicable to Cl₂ gas systems ≥1,500 lb threshold'],
                                ['10 States Standards', 'Design criteria for treatment processes, capacity, redundancy'],
                            ].map(([std, scope]) => (
                                <tr key={std} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#10B981] font-medium whitespace-nowrap">{std}</td>
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
                    The treatment train follows{' '}
                    <span className="text-[#10B981] font-medium">preliminary → primary → secondary (BNR) → tertiary → disinfection → discharge</span>,
                    with solids processing through thickening → anaerobic digestion → dewatering.
                    The facility achieves simultaneous nitrogen and phosphorus removal through a
                    Modified Ludzack-Ettinger (MLE) or A²/O process configuration.
                </p>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto mt-4"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`INFLUENT ──► HEADWORKS ──► PRIMARY ──► BNR BIOREACTOR ──► SECONDARY ──► TERTIARY ──► DISINFECTION ──► EFFLUENT
             │              │          │                    CLARIFIER    FILTERS      │               │
         Bar Screens    Clarifiers  Anaerobic │ Anoxic │ Aerobic           │       UV/Cl₂           ▼
         Grit Rmvl      │          Zone       │ Zone   │ Zone              │                  Receiving
                        │                                                 │                  Water
                   Primary Sludge          WAS (Waste Activated Sludge)   │
                        │                        │                        Backwash
                        ▼                        ▼                        Recycle
                   THICKENER ──────────► ANAEROBIC DIGESTER (2-stage)
                   (Gravity)              (Mesophilic, 35°C)
                        │                        │           │
                        │                    Biogas ──► CHP Engine ──► Grid/Parasitic
                        │                    (60% CH₄)  (1.5 MW)
                        ▼                        ▼
                   DEWATERING ──────► BIOSOLIDS (Class B)
                   (Belt Filter Press) (Land Application / Beneficial Reuse)

 ┌─────────────────────────────────────────────────────────────────────────────┐
 │  CAPACITY: 50 MGD average, 120 MGD peak wet weather                        │
 │  NPDES LIMITS: BOD₅ ≤10 mg/L, TSS ≤10 mg/L, NH₃-N ≤2 mg/L, TP ≤0.5 mg/L │
 │  ENERGY: 30-50% offset via biogas CHP, ~8,000 kWh/MG treated               │
 └─────────────────────────────────────────────────────────────────────────────┘`}</pre>
                </div>
            </Section>

            {/* 3. Detailed Technical Description */}
            <Section title="3. Detailed Technical Description" id="technical">
                <h3 className="text-sm font-semibold text-white mt-4">3.1 Headworks (Preliminary Treatment)</h3>
                <p className="text-xs text-gray-400 leading-relaxed mt-1">
                    Headworks removes large solids and grit that could damage downstream equipment.
                    Mechanically-cleaned bar screens capture rags, wipes, and debris; vortex grit
                    chambers remove sand and gravel with &gt;95% removal at 65 mesh.
                </p>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside mt-2">
                    <li>Mechanical bar screens: 3× (2 duty + 1 standby), 6 mm spacing, 304SS</li>
                    <li>Vortex grit chambers: 3× induced-vortex, 15 ft dia., &gt;95% removal at 65 mesh</li>
                    <li>Grit classifiers: 3× screw-type, wash &lt;5% organics in grit</li>
                    <li>Screenings/grit handling: washer-compactor, dumpster, hauled to landfill</li>
                    <li>Influent flow measurement: 2× Parshall flume, 48″ throat, ultrasonic level</li>
                </ul>

                <h3 className="text-sm font-semibold text-white mt-6">3.2 Primary Treatment</h3>
                <p className="text-xs text-gray-400 leading-relaxed mt-1">
                    Primary clarifiers remove 50–70% of TSS and 25–40% of BOD₅ through gravity
                    settling. Scum removal captures grease and floatables.
                </p>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside mt-2">
                    <li>Primary clarifiers: 4× circular, 100 ft dia., 12 ft SWD, center-feed</li>
                    <li>Overflow rate: 800–1,200 gpd/ft² at average flow</li>
                    <li>Detention time: 1.5–2.5 hours at average daily flow</li>
                    <li>Sludge collector: half-bridge scraper, 1.5 RPM, center well withdrawal</li>
                    <li>Primary sludge pumps: 4× progressive cavity, 200 GPM, 3–5% solids</li>
                    <li>Scum collection: rotating pipe skimmer, scum trough, pump to digester</li>
                </ul>

                <h3 className="text-sm font-semibold text-white mt-6">3.3 Secondary Treatment (BNR)</h3>
                <p className="text-xs text-gray-400 leading-relaxed mt-1">
                    Biological nutrient removal uses anaerobic/anoxic/aerobic zones to achieve
                    simultaneous nitrification-denitrification and biological phosphorus removal.
                    The A²/O (Anaerobic-Anoxic-Oxic) configuration provides reliable nutrient removal.
                </p>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside mt-2">
                    <li>Bioreactor basins: 4× parallel trains, each with anaerobic/anoxic/aerobic zones</li>
                    <li>Anaerobic zone: 1.0-hr HRT, PAO selection for bio-P removal</li>
                    <li>Anoxic zone: 2.0-hr HRT, internal recycle 200% Q for denitrification</li>
                    <li>Aerobic zone: 6.0-hr HRT, fine-bubble diffusers, DO target 1.5–2.0 mg/L</li>
                    <li>Blowers: 4× multistage centrifugal (3 duty + 1 standby), 2,500 HP each</li>
                    <li>Diffusers: 40,000× EPDM membrane fine-bubble, 2 SCFM per diffuser</li>
                    <li>SRT: 10–15 days (winter), 8–12 days (summer) for nitrification</li>
                    <li>MLSS: 2,500–4,000 mg/L in aerobic zone</li>
                    <li>Internal recycle pumps: 4× axial flow, 200% of influent flow</li>
                    <li>RAS pumps: 4× end-suction centrifugal, 50–100% return rate</li>
                </ul>

                <h3 className="text-sm font-semibold text-white mt-6">3.4 Secondary Clarification</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside mt-2">
                    <li>Secondary clarifiers: 6× circular, 120 ft dia., 14 ft SWD</li>
                    <li>Overflow rate: 400–800 gpd/ft² at average flow</li>
                    <li>Solids loading: ≤25 lb/ft²/day at peak hourly flow</li>
                    <li>RAS withdrawal: center well, 50–100% return ratio</li>
                    <li>WAS withdrawal: controlled by SRT, typically 0.5–1.0 MGD</li>
                </ul>

                <h3 className="text-sm font-semibold text-white mt-6">3.5 Tertiary Treatment &amp; Disinfection</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside mt-2">
                    <li>Tertiary filters: 8× disc filters or cloth-media, 5 μm filtration</li>
                    <li>Chemical P removal: ferric chloride trim, 5–15 mg/L to achieve TP ≤0.5 mg/L</li>
                    <li>UV disinfection: 6× open-channel, medium-pressure, validated per NWRI/UVDGM</li>
                    <li>UV dose: ≥40 mJ/cm² for fecal coliform compliance</li>
                    <li>Effluent monitoring: 2× composite samplers, online turbidity/UVT/DO</li>
                    <li>Outfall: 48″ reinforced concrete pipe to receiving water</li>
                </ul>
            </Section>

            {/* 4. Process Diagrams */}
            <Section title="4. Process Diagrams" id="process-diagrams">
                <h3 className="text-sm font-semibold text-white">4.1 Liquid Treatment Train</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto mt-2"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`INFLUENT ──► BAR SCREEN (3) ──► GRIT CHAMBER (3) ──► PRIMARY CLARIFIER (4)
                                                              │
                                                        Primary Sludge
                                                              │
              ┌─── A²/O BIOREACTOR (4 trains) ──────────────┤
              │    Anaerobic (1 hr) → Anoxic (2 hr) → Aerobic (6 hr)
              │              ↑                    ↑
              │         RAS (50-100%)     Internal Recirc (200%)
              │
              ▼
       SECONDARY CLARIFIER (6) ──► WAS ──► Thickener ──► Digester
              │
              ▼
       TERTIARY DISC FILTER (8) ──► Backwash Recycle
              │
              │ ← FeCl₃ (P trim)
              ▼
       UV DISINFECTION (6 channels)
              │
              ▼
       EFFLUENT OUTFALL (48") ──► Receiving Water`}</pre>
                </div>

                <h3 className="text-sm font-semibold text-white mt-6">4.2 Solids Treatment Train</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto mt-2"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`PRIMARY SLUDGE (3-5%) ──┐
                        │
                   GRAVITY THICKENER (2)
                        │ (5-7%)
                        │
WAS (0.5-1.0%) ──► DAFT (2) ──┐
                  (Dissolved Air  │ (4-6%)
                   Flotation)     │
                                  ▼
           BLEND TANK ──► ANAEROBIC DIGESTER (2-stage)
                          │  Stage 1: Mesophilic (35°C, 15-day SRT)
                          │  Stage 2: Volatile solids reduction ≥50%
                          │
                     ┌────┼────────────────────┐
                     │    │                    │
                 BIOGAS   │              DIGESTED SLUDGE
                 (60% CH₄)│              (2-3% solids)
                     │    │                    │
                     ▼    ▼                    ▼
                 CHP ENGINE           BELT FILTER PRESS (3)
                 (2× 750 kW)          (25% cake solids)
                     │                         │
                 Electricity ──► Plant Load    │
                 Heat ──► Digester Heating     ▼
                                         BIOSOLIDS (Class B)
                                         (Land Application)`}</pre>
                </div>

                <h3 className="text-sm font-semibold text-white mt-6">4.3 Aeration Control Loop</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto mt-2"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`DO Sensors (8) ──► PLC ──► Most-Open-Valve (MOV) Logic
NH₃-N Analyzers (4) ──┤         │
                       │    Airflow Setpoint
                       │         │
                       ▼         ▼
                  PID Controller ──► VFD Blower Speed (3 × 2,500 HP)
                       │              │
                  Air Header     Modulating Butterfly Valves (16)
                       │              │
                       ▼              ▼
               Fine-Bubble Diffusers (40,000)
        Target: DO = 1.5 – 2.0 mg/L
        Energy: 40-60% of total plant kWh`}</pre>
                </div>
            </Section>

            {/* 5. Bill of Materials */}
            <Section title="5. Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2 italic">
                    Scaled for a 50 MGD A²/O POTW with BNR, anaerobic digestion, and CHP.
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
                                ['Mechanical Bar Screen', '6 mm spacing, 304SS, auto-wash', '3', '10 ft wide, 5 HP'],
                                ['Vortex Grit Chamber', 'Induced-vortex, cyclone classifier', '3', '15 ft dia., >95% at 65 mesh'],
                                ['Primary Clarifier', 'Circular, center-feed, half-bridge', '4', '100 ft dia., 12 ft SWD'],
                                ['A²/O Bioreactor', 'Concrete basins, 3-zone', '4 trains', '9.0-hr total HRT'],
                                ['Centrifugal Blower', 'Multistage, VFD, inlet guide vanes', '4', '2,500 HP, 80,000 SCFM total'],
                                ['Fine-Bubble Diffuser', 'EPDM membrane, retrievable', '40,000', '2 SCFM per diffuser'],
                                ['Internal Recycle Pump', 'Axial flow, submersible', '4', '200% Q, 50 HP each'],
                                ['RAS Pump', 'End-suction centrifugal, VFD', '4', '50–100% return, 100 HP'],
                                ['Secondary Clarifier', 'Circular, peripheral-feed', '6', '120 ft dia., 14 ft SWD'],
                                ['Tertiary Disc Filter', 'Cloth-media, 5 μm', '8', '6 ft dia., auto-backwash'],
                                ['UV Disinfection System', 'Open-channel, medium-pressure', '6', '≥40 mJ/cm², validated'],
                                ['Gravity Thickener', 'Circular, center-feed scraper', '2', '50 ft dia., 5–7% TS output'],
                                ['DAF Thickener', 'Dissolved air flotation', '2', '4–6% TS output for WAS'],
                                ['Anaerobic Digester', 'Egg-shaped or cylindrical, heated', '4', '1.5 MG each, 35°C, 15-d SRT'],
                                ['CHP Engine-Generator', 'Lean-burn gas engine, dual-fuel', '2', '750 kW each, biogas + natural gas'],
                                ['Belt Filter Press', 'Dual-belt, polymer conditioned', '3', '2.0 m belt, 25% cake solids'],
                                ['FeCl₃ Feed System', 'Bulk storage, metering pumps', '2+4', '4,000 gal tank, 0–80 GPH'],
                                ['Polymer Feed System', 'Dry feed + aging tanks', '2', '60-min hydration, auto-dilution'],
                                ['DO Analyzer', 'Luminescent quenching, digital', '8', '0–20 mg/L, ±0.1'],
                                ['NH₃-N Analyzer', 'Ion-selective electrode', '4', '0–50 mg/L, online'],
                                ['Effluent Composite Sampler', 'Refrigerated, programmable', '2', '24-hr composite, NPDES'],
                                ['SCADA PLC System', 'Redundant hot-standby', '6', '~800 I/O points total'],
                                ['Plant MCC Lineup', '480V, 600V ratings', '8', '100+ bucket positions total'],
                                ['Emergency Generator', 'Diesel, 4,160V, ATS', '3', '2,500 kW each'],
                                ['Biogas Handling', 'Scrubber, dryer, flame arrestor', '1', 'H₂S removal, siloxane filter'],
                            ].map(([equip, spec, qty, rating]) => (
                                <tr key={equip} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#10B981] font-medium whitespace-nowrap">{equip}</td>
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
                                ['L0 — Process', 'DO probes, NH₃ analyzers, flow meters, level sensors, valve actuators, diffusers', '4–20 mA, HART, SDI-12'],
                                ['L1 — Basic Control', 'PLCs (6 racks), blower VFDs, pump VFDs, MOV controllers, CHP engine controller', 'Ethernet/IP, Modbus RTU, Profibus'],
                                ['L2 — Supervisory', 'SCADA HMIs (6 OWS), alarm management, SRT/DO/aeration optimization', 'OPC UA, Modbus TCP, DNP3'],
                                ['L3 — Operations', 'Historian (PI/Wonderware), LIMS, process model (BioWin/GPS-X), energy management', 'SQL, OPC-HDA, REST APIs'],
                                ['L3.5 — DMZ', 'Firewalls, historian mirror, AV relay, patch server, VPN concentrator', 'Unidirectional gateway, HTTPS'],
                                ['L4 — Enterprise', 'CMMS, NPDES e-reporting, biosolids tracking, CHP energy export, EAM', 'REST, MQTT, HTTPS, EPA NetDMR'],
                            ].map(([level, components, protocols]) => (
                                <tr key={level} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#10B981] font-mono font-medium whitespace-nowrap">{level}</td>
                                    <td className="px-3 py-2 text-gray-400">{components}</td>
                                    <td className="px-3 py-2 text-gray-400">{protocols}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
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
                                ['Emergency Power', 'Diesel generators with ATS', '3 × 2,500 kW, NFPA 110, 48-hr fuel'],
                                ['Biogas CHP', 'Combined heat and power from digester gas', '2 × 750 kW, 40% electrical efficiency, waste heat to digester'],
                                ['HVAC', 'Building ventilation, process area hazard controls', 'NFPA 820 classifications, 12–30 ACH by zone'],
                                ['Odor Control', 'Multi-stage chemical scrubbers on headworks/solids', 'NaOH/NaOCl/H₂SO₄, packed tower, 99% H₂S removal'],
                                ['Laboratory (LIMS)', 'Onsite analytical lab for NPDES compliance', 'BOD, TSS, NH₃, TP, TN, fecal coliform (SM methods)'],
                                ['Confined Space', 'Entry program for digesters, wet wells, channels', 'OSHA 1910.146, 4-gas monitor, rescue equipment'],
                                ['Fire Protection', 'Per NFPA 820 zone classification', 'Class I Div 1/2 near digesters, FM-200 in elec rooms'],
                                ['Physical Security', 'Perimeter fence, CCTV, card access', 'AWIA §2013, 24/7 monitoring, 30-day retention'],
                            ].map(([system, desc, spec]) => (
                                <tr key={system} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#10B981] font-medium whitespace-nowrap">{system}</td>
                                    <td className="px-3 py-2 text-gray-400">{desc}</td>
                                    <td className="px-3 py-2 text-gray-400">{spec}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* 8. Energy & Resource Recovery */}
            <Section title="8. Energy &amp; Resource Recovery" id="energy">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Resource</th>
                                <th className="text-left px-3 py-2 font-medium">Recovery Method</th>
                                <th className="text-left px-3 py-2 font-medium">Performance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Biogas (Energy)', 'Anaerobic digestion → CHP engine-generators', '1.5 MW production, 30–50% plant energy offset'],
                                ['Heat', 'CHP waste heat for digester and building heating', '2.0 MMBTU/hr recovered, reduces natural gas'],
                                ['Biosolids (Nutrients)', 'Class B land application or Class A composting', '50 dry tons/day, N-P-K nutrient value'],
                                ['Reclaimed Water', 'Tertiary-filtered, UV-disinfected effluent for reuse', '5 MGD for irrigation, cooling, wetlands'],
                                ['Struvite (Phosphorus)', 'Crystallization from sidestream (future)', 'MgNH₄PO₄·6H₂O slow-release fertilizer'],
                            ].map(([resource, method, perf]) => (
                                <tr key={resource} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#10B981] font-medium whitespace-nowrap">{resource}</td>
                                    <td className="px-3 py-2 text-gray-400">{method}</td>
                                    <td className="px-3 py-2 text-gray-400">{perf}</td>
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
                    <pre className="whitespace-pre leading-relaxed">{`TIER 1 — FIELD INSTRUMENTS (~800 points)
├── DO Sensors (8)               → 4-20 mA  → PLC    @ 5 sec
├── NH₃-N/NO₃ Analyzers (8)    → HART      → PLC    @ 1 min
├── Flow Meters (12)             → 4-20 mA  → PLC    @ 1 sec
├── Level Transmitters (16)      → 4-20 mA  → PLC    @ 2 sec
├── Blower Status/VFD (4)        → Ethernet  → PLC    @ 100 ms
├── Pump Status (30+)            → Discrete  → PLC    @ 100 ms
├── Valve Position (40+)         → Discrete  → PLC    @ 100 ms
├── Gas Detection (12)           → 4-20 mA  → PLC    @ 5 sec
├── Digester Temp/Press (8)      → 4-20 mA  → PLC    @ 5 sec
└── CHP Engine (50+ pts)         → Modbus    → PLC    @ 1 sec

TIER 2 — PLANT SCADA (6 PLC racks, 2 SCADA servers)
├── Real-time displays (6 OWS)   → HMI      → Operator   @ 1 sec
├── Aeration optimization         → PLC      → Blower VFD @ 1 sec
├── SRT/WAS control               → PLC      → WAS pump   @ 15 min
├── Alarm management (500+)       → HMI      → Operator   @ event
├── Historian                     → OPC-HDA  → 1-min archive
└── LIMS integration              → SQL      → Lab results@ batch

TIER 3 — ENTERPRISE (via DMZ)
├── NPDES e-Reporting (NetDMR)    → XML      → Monthly    regulatory
├── CMMS work orders              → REST     → On-demand  maintenance
├── Biosolids tracking            → REST     → Per-load   compliance
├── Energy management / CHP       → MQTT     → 15-min     billing
├── Process model (BioWin)        → CSV/API  → Weekly     optimization
└── GIS (asset location)          → WFS      → On-demand  spatial`}</pre>
                </div>
            </Section>

            {/* 10. References */}
            <Section title="10. References" id="references">
                <div className="space-y-2 text-xs text-gray-400 leading-relaxed">
                    <p>Metcalf &amp; Eddy, Tchobanoglous, G., Stensel, H.D., et al. (2014). <em>Wastewater Engineering: Treatment &amp; Resource Recovery</em> (5th ed.). McGraw-Hill.</p>
                    <p>Water Environment Federation. (2018). <em>Design of Water Resource Recovery Facilities</em> (MOP 8, 6th ed.). WEF Press.</p>
                    <p>Water Environment Federation. (2017). <em>Operation of Water Resource Recovery Facilities</em> (MOP 11, 7th ed.). WEF Press.</p>
                    <p>U.S. Environmental Protection Agency. (2010). <em>Nutrient Control Design Manual</em>. EPA/600/R-10/100.</p>
                    <p>U.S. Environmental Protection Agency. (2023). <em>NPDES Permit Writers&apos; Manual</em>. EPA 833-K-10-001.</p>
                    <p>National Fire Protection Association. (2020). <em>NFPA 820: Standard for Fire Protection in WW Facilities</em>. NFPA.</p>
                    <p>National Institute of Standards and Technology. (2023). <em>SP 800-82 Rev. 3: Guide to OT Security</em>. NIST.</p>
                    <p>U.S. EPA. (2024). <em>40 CFR Part 503: Standards for the Use or Disposal of Sewage Sludge</em>. EPA.</p>
                </div>
            </Section>

            {/* See Also */}
            <Section title="See Also" id="see-also">
                <div className="flex flex-wrap gap-2">
                    {[
                        { href: '/wiki/water', label: 'Water Sector Hub', color: '#06B6D4' },
                        { href: '/wiki/water/collection-systems', label: 'Collection Systems', color: '#F97316' },
                        { href: '/wiki/water/pump-stations', label: 'Pump Stations', color: '#8B5CF6' },
                        { href: '/wiki/water/stormwater', label: 'Stormwater Management', color: '#3B82F6' },
                        { href: '/wiki/sectors/WATR', label: 'WATR Sector Overview', color: '#06B6D4' },
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
