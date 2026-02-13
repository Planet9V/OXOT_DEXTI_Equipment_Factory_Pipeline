/**
 * Pressurized Water Reactor (PWR) Nuclear Power Plant — Deep Dive Wiki Article.
 *
 * Comprehensive TOGAF-based reference architecture for commercial PWR power
 * plants (800–1,500 MWe), including reactor coolant system, steam generators,
 * ECCS safety trains, containment, and nuclear cybersecurity.
 *
 * @module wiki/nuclear/pwr-plant/page
 */

export const metadata = {
    title: 'Pressurized Water Reactor (PWR) Plant — Nuclear Wiki',
    description:
        'TOGAF reference architecture for PWR nuclear power plants: reactor coolant system, steam generators, ' +
        'ECCS safety trains, Purdue model mapping, and NRC regulatory compliance.',
};

export default function PWRPlantPage() {
    return (
        <div className="max-w-5xl space-y-10">
            {/* Header */}
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div
                        className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]"
                        style={{ background: '#10B981' }}
                    />
                    <span className="text-xs font-mono text-gray-500">
                        NUCL · POWER REACTORS · PWR
                    </span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">
                    Pressurized Water Reactor (PWR) Plant
                </h1>
                <p className="text-sm text-gray-500 font-mono">800 – 1,500 MWe · Two/Four-Loop Configuration</p>
                <p className="text-gray-400 text-base leading-relaxed max-w-3xl">
                    Pressurized Water Reactors represent the dominant commercial nuclear power technology
                    worldwide, employing a sealed primary coolant loop maintained at ~15.5 MPa (2,250 psia)
                    to prevent boiling. Heat is transferred via steam generators to a secondary loop
                    driving the turbine-generator. The U.S. fleet includes 62 PWR units providing
                    baseload generation with capacity factors exceeding 90% (NRC, 2024).
                </p>
            </div>

            {/* 1. TOGAF Business Architecture */}
            <Section title="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-300 leading-relaxed">
                    The business architecture for PWR plants centers on safe, reliable baseload
                    electricity generation within a heavily regulated nuclear environment. The
                    plant operates under a Facility Operating License (FOL) issued by the NRC,
                    with continuous oversight through the Reactor Oversight Process (ROP) and
                    performance monitoring by INPO (The Open Group, 2022).
                </p>

                <h3 className="text-sm font-semibold text-white mt-6 mb-2">Stakeholders</h3>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside">
                    <li>Nuclear Regulatory Commission (NRC) — licensing, inspection, enforcement</li>
                    <li>Institute of Nuclear Power Operations (INPO) — performance standards, peer review</li>
                    <li>Nuclear Energy Institute (NEI) — industry guidance, NEI 08-09 cybersecurity</li>
                    <li>Utility owner/operator — plant operation, maintenance, regulatory compliance</li>
                    <li>NSSS vendors (Westinghouse, Framatome, MHI) — reactor design and technical support</li>
                    <li>Regional Transmission Organization (RTO/ISO) — grid dispatch, capacity markets</li>
                    <li>Emergency management agencies — offsite emergency planning zones (EPZ)</li>
                    <li>NRC-licensed operators — SRO/RO certified per 10 CFR Part 55</li>
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
                                ['10 CFR Part 50', 'Domestic licensing of production and utilization facilities — technical specifications, surveillance'],
                                ['10 CFR Part 52', 'Combined licenses, early site permits, and standard design certifications (Gen III+)'],
                                ['10 CFR Part 73', 'Physical protection and cybersecurity (§73.54 — digital I&C cyber protection plan)'],
                                ['10 CFR Part 20', 'Standards for protection against radiation — ALARA program, dose limits'],
                                ['10 CFR Part 100', 'Reactor site criteria — exclusion area boundary, low population zone'],
                                ['IEEE 603', 'Safety systems for nuclear power generating stations — Class 1E qualification'],
                                ['IEC 61513', 'Nuclear I&C systems important to safety — digital system requirements'],
                                ['NFPA 805', 'Performance-based standard for fire protection for light water reactor plants'],
                            ].map(([standard, scope]) => (
                                <tr key={standard} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#10B981] font-medium whitespace-nowrap">{standard}</td>
                                    <td className="px-3 py-2 text-gray-400">{scope}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* 2. High-Level Design */}
            <Section title="2. High-Level Design" id="design">
                <p className="text-sm text-gray-300 leading-relaxed">
                    A PWR employs a sealed primary loop with forced circulation through the reactor
                    core, heat exchange via U-tube steam generators to a secondary steam cycle, and
                    multiple engineered safety features (ESF) for accident mitigation. Modern designs
                    range from two-loop (600 MWe) to four-loop (1,500 MWe) configurations with N+2
                    safety train redundancy and defense-in-depth protection philosophy (IAEA, 2016).
                </p>

                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto mt-4"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`                         ┌─────────────────────────────────────────────┐
           ┌─────────────│           CONTAINMENT BUILDING              │──────────────┐
           │             └─────────────────────────────────────────────┘              │
           │                                                                          │
     ┌─────┴─────┐     ┌──────────────┐      ┌──────────────┐     ┌─────────────┐    │
     │  REACTOR   │─────│   STEAM      │──────│  PRESSURIZER │     │   ECCS      │    │
     │  VESSEL    │ Hot │  GENERATOR   │      │  2,250 psia  │     │  3 Trains   │    │
     │  4,451 MWt │ Leg │  (×4 loops)  │      │  Electric    │     │  HPI/LPI/   │    │
     │  257 FA    │     │  U-tube      │      │  Heaters +   │     │  Accum.     │    │
     └─────┬─────┘     └──────┬───────┘      │  Spray Valve │     └──────┬──────┘    │
           │                   │               └──────────────┘            │           │
     ┌─────┴─────┐            │                                           │           │
     │  REACTOR   │     Cold   │  Secondary Steam                   ┌─────┴─────┐    │
     │  COOLANT   │◄────Leg────┘     │                               │   RWST     │    │
     │  PUMPS ×4  │                  ▼                               │ 500,000 gal│    │
     │  6 MW each │            ┌──────────────┐                      └───────────┘    │
     └───────────┘            │   TURBINE-    │                                       │
                               │   GENERATOR   │──► 345/500 kV ──► GRID              │
           ┌──────────────┐   │   ISLAND      │                                       │
           │  CONTAINMENT  │   │  HP + LP ×2-4 │    ┌──────────────┐                  │
           │  SPRAY ×2     │   │  1,500 MWe    │    │   MAIN       │                  │
           │  3,000 gpm    │   └──────┬───────┘    │  CONDENSER   │                  │
           └──────────────┘          │             └──────┬───────┘                  │
                                      └──────────────────►│                           │
                                                    Cooling Water                     │
                                               ┌──────────────┐                      │
                                               │ COOLING TOWER │                      │
                                               │ or River      │                      │
                                               └──────────────┘                      │
           ┌──────────────────────────────────────────────────────────────────────────┘
           │  EMERGENCY DIESEL GENERATORS (×3)  ·  6-8 MW each  ·  Class 1E`}</pre>
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">
                    Figure 1. Four-loop PWR one-line diagram showing primary loop (sealed), secondary
                    steam cycle, ECCS safety trains, and containment structure.
                </p>
            </Section>

            {/* 3. Detailed Technical Description */}
            <Section title="3. Detailed Technical Description" id="technical">
                <h3 className="text-sm font-semibold text-white mb-2">3.1 Reactor Core &amp; Reactor Coolant System</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    The reactor core consists of 193–257 fuel assemblies (17×17 lattice) containing
                    UO₂ pellets in zircaloy cladding, enriched to 3.0–5.0 wt% U-235. The reactor
                    pressure vessel (RPV) stands 13.6 m tall with 5.2 m inner diameter, fabricated
                    from low-alloy steel with stainless steel cladding, rated at 17 MPa maximum
                    operating pressure.
                </p>
                <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside mt-2">
                    <li>Thermal output: 3,411–4,451 MWt (four-loop APWR configuration)</li>
                    <li>Primary coolant: 315 °C hot leg / 285 °C cold leg, 15.5 MPa</li>
                    <li>Reactor coolant pumps: 4× vertical shaft, 25,800 m³/h, 6 MW each</li>
                    <li>Pressurizer: ~100 m³ volume, 5–10 MW electric heaters, spray cooling</li>
                    <li>Fuel cycle: 18–24 months, ~⅓ core reload per cycle</li>
                </ul>

                <h3 className="text-sm font-semibold text-white mt-6 mb-2">3.2 Steam Generators &amp; Secondary Loop</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    Each steam generator (SG) is a vertical U-tube heat exchanger transferring
                    ~1,100 MWt from the primary to secondary loop. Secondary-side steam exits
                    at 260 °C and 6.5–7.0 MPa, driving the turbine-generator.
                </p>
                <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside mt-2">
                    <li>Tube count: 3,000–4,000 Inconel/SS tubes per SG</li>
                    <li>Weight: 250–350 tonnes per unit</li>
                    <li>Feedwater temperature: 200–230 °C (7–8 stages of extraction heating)</li>
                    <li>Main feedwater pumps: 10,000 gpm, turbine-driven, 3,000 hp</li>
                </ul>

                <h3 className="text-sm font-semibold text-white mt-6 mb-2">3.3 Turbine-Generator Island</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    The turbine-generator set converts saturated steam to electrical energy at
                    32–35% thermal efficiency (Rankine cycle limited). HP turbine inlet at 6–7 MPa,
                    260 °C; LP turbine exhaust at ~5 kPa near saturation.
                </p>
                <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside mt-2">
                    <li>HP turbine: 10–15 stages, 30–40% of gross output</li>
                    <li>LP turbines: 2–4 units, 54-inch last-stage blades (60 Hz)</li>
                    <li>Main generator: 1,600 MWe gross, 20–25 kV, hydrogen-cooled, 0.85 pf</li>
                    <li>Main transformer: 1,500 MVA step-up to 345/500 kV for transmission</li>
                </ul>

                <h3 className="text-sm font-semibold text-white mt-6 mb-2">3.4 ECCS &amp; Engineered Safety Features</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    Three independent safety trains provide emergency core cooling with automatic
                    actuation on low pressurizer pressure ({`<`}1,600 psia) or high containment
                    pressure ({`>`}8 psia). Each train includes HPI, LPI, and passive accumulator injection.
                </p>
                <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside mt-2">
                    <li>HPI pumps: 3× centrifugal, 600 gpm/train, suction from RWST (500,000 gal)</li>
                    <li>LPI pumps: 3× centrifugal, 3,000 gpm/train, switchover to sump recirculation</li>
                    <li>Accumulators: 3× passive, 1,500 gal each, N₂-charged at 600 psia</li>
                    <li>Containment spray: 2× pumps, 3,000 gpm, iodine scrubbing</li>
                    <li>RHR system: 2–3 trains, 5,000 gpm for long-term decay heat removal</li>
                </ul>

                <h3 className="text-sm font-semibold text-white mt-6 mb-2">3.5 Containment &amp; Radiation Management</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    The containment building provides the final barrier against radioactive release.
                    Reinforced concrete construction with steel liner, designed for 45–60 psia internal
                    pressure. Automatic isolation on high pressure or high radiation signals.
                </p>
                <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside mt-2">
                    <li>Free volume: 1.5–2.2 million ft³ (dry PWR containment)</li>
                    <li>Isolation: Dual solenoid valves on all penetrations</li>
                    <li>Radiation monitoring: area gamma, stack noble gas/iodine/particulate</li>
                    <li>Spent fuel pool: 1,200 assembly capacity, 40–50 °C normal temperature</li>
                </ul>
            </Section>

            {/* 4. Process Diagrams */}
            <Section title="4. Process Diagrams" id="process-diagrams">
                <h3 className="text-sm font-semibold text-white mb-2">4.1 Primary Heat Transport Loop</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`  CORE (4,451 MWt)                      STEAM GENERATOR (×4)
  ┌──────────┐    Hot Leg (315°C)    ┌──────────────────┐    Secondary Steam
  │  257 FA  │───── 15.5 MPa ───────│  U-Tube Bundle   │────► 260°C, 6.5 MPa
  │  UO₂     │                      │  Inconel 690     │       ──► HP Turbine
  │  17×17   │    Cold Leg (285°C)   │  1,100 MWt/SG    │
  └────┬─────┘◄──── 15.5 MPa ───────│                  │◄──── Feedwater 210°C
       │                             └──────────────────┘
       │                                     │
  ┌────┴─────┐                        ┌──────┴──────┐
  │   RCP    │                        │ PRESSURIZER │
  │ 25,800   │                        │ 2,250 psia  │
  │ m³/h     │                        │ ~100 m³     │
  │ 6 MW     │                        │ Heaters +   │
  └──────────┘                        │ Spray Valve │
                                      └─────────────┘`}</pre>
                </div>

                <h3 className="text-sm font-semibold text-white mt-6 mb-2">4.2 ECCS Safety Injection Sequence</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`  LOCA Detected (Pressurizer < 1,600 psia)
      │
      ▼
  ┌────────────────┐     ┌────────────────┐     ┌────────────────┐
  │  RPS TRIP      │     │  SI ACTUATION  │     │  EDG START     │
  │  Rods drop     │     │  HPI/LPI valves│     │  6-8 MW ×3     │
  │  < 100 ms      │     │  energize      │     │  10 sec start  │
  └───────┬────────┘     └───────┬────────┘     └───────┬────────┘
          │                      │                       │
          ▼                      ▼                       ▼
  0-10 sec: Accumulators (passive) ── 4,500 gpm total ──► Core flooding
  10-60 sec: HPI pumps ── 1,800 gpm ──► Hot/cold leg injection
  60 sec+: LPI pumps ── 9,000 gpm ──► Sump recirculation cooling
      │
      ▼
  ┌────────────────────────────────────────────┐
  │  LONG-TERM COOLING                         │
  │  RHR HX removes decay heat (~150 MWt @60s) │
  │  Sump recirculation indefinite              │
  └────────────────────────────────────────────┘`}</pre>
                </div>

                <h3 className="text-sm font-semibold text-white mt-6 mb-2">4.3 Reactor Protection System Trip Logic</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`  SENSOR INPUTS (quad-redundant)
  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
  │ Ch A│ │ Ch B│ │ Ch C│ │ Ch D│   Pressurizer P, T_avg, RV Level,
  └──┬──┘ └──┬──┘ └──┬──┘ └──┬──┘   Containment P, Neutron Flux
     │       │       │       │
     └───────┴───┬───┴───────┘
                 │ 2/4 Coincident Voting
                 ▼
  ┌──────────────────────────────┐
  │  TRIP BREAKERS (de-energize) │──► Control rod drop (gravity, < 100 ms)
  │  Safety-grade 120 VAC       │──► Turbine trip
  │  Redundant solenoids        │──► Feedwater isolation
  └──────────────────────────────┘──► SI block valve closure`}</pre>
                </div>
            </Section>

            {/* 5. Bill of Materials */}
            <Section title="5. Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2 italic">
                    Reference: 1,500 MWe four-loop PWR plant (Westinghouse/MHI APWR class).
                </p>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Equipment</th>
                                <th className="text-left px-3 py-2 font-medium">Specification</th>
                                <th className="text-left px-3 py-2 font-medium">Qty</th>
                                <th className="text-left px-3 py-2 font-medium">Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Reactor Pressure Vessel', 'Low-alloy steel w/ SS clad, 5.2 m ID', '1', '17 MPa, 4,451 MWt'],
                                ['Fuel Assemblies (17×17)', 'UO₂ pellets, Zircaloy-4 clad', '257', '3–5% U-235 enrichment'],
                                ['Control Rod Drive Mechanisms', 'Magnetic latch, stepped motor', '69', 'Full insertion < 2 s'],
                                ['Reactor Coolant Pumps', 'Vertical shaft, single-stage', '4', '25,800 m³/h, 6 MW each'],
                                ['Pressurizer', 'Electric heaters + spray valve', '1', '100 m³, 2,250 psia'],
                                ['Steam Generators (U-tube)', 'Inconel 690 tubes, vertical', '4', '1,100 MWt each'],
                                ['HP Turbine', 'Impulse-reaction, 10–15 stages', '1', '6 MPa inlet, ~500 MWe'],
                                ['LP Turbines', 'Double-flow, 54-inch LSB', '2–4', '~400 MWe each'],
                                ['Main Generator', 'Hydrogen-cooled, synchronous', '1', '1,600 MWe, 20 kV, 60 Hz'],
                                ['Main Power Transformer', 'Oil-cooled step-up', '1', '1,500 MVA, 345/500 kV'],
                                ['Startup Transformer', 'Grid tie for house loads', '1', '200–300 MVA'],
                                ['Emergency Diesel Generators', 'Class 1E safety-related', '3', '6–8 MW each'],
                                ['HPI Safety Injection Pumps', 'Centrifugal, motor-driven', '3', '600 gpm, 2,500 hp'],
                                ['LPI/RHR Pumps', 'Centrifugal, motor-driven', '3', '3,000–5,000 gpm'],
                                ['Passive Accumulators', 'N₂-charged pressure vessels', '3', '1,500 gal, 600 psia'],
                                ['Containment Spray Pumps', 'Centrifugal, motor-driven', '2', '3,000 gpm, 500 hp'],
                                ['Refueling Water Storage Tank', 'Borated water supply', '1', '500,000 gal'],
                                ['Containment Structure', 'Reinforced concrete + steel liner', '1', '45–60 psia design'],
                                ['Reactor Protection System', 'Quad-redundant, 2/4 voting', '1', 'Class 1E, IEEE 603'],
                                ['Main Condenser', 'Surface condenser, Ti tubes', '1', '~3,400 MWt rejection'],
                                ['Cooling Tower / Intake', 'Natural draft or mechanical', '1–2', '35,000–50,000 gpm CW'],
                                ['Spent Fuel Pool', 'Borated water, SS-lined', '1', '1,200 assembly capacity'],
                            ].map(([equip, spec, qty, rating]) => (
                                <tr key={equip} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#10B981] font-medium whitespace-nowrap">{equip}</td>
                                    <td className="px-3 py-2 text-gray-400">{spec}</td>
                                    <td className="px-3 py-2 text-gray-400">{qty}</td>
                                    <td className="px-3 py-2 text-gray-400">{rating}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* 6. Purdue Model Mapping */}
            <Section title="6. Purdue Model / ISA-95 Mapping" id="purdue">
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
                                ['L0 — Process', 'RTDs, pressure transmitters, neutron detectors, control valves, solenoids', 'Hardwired 4–20 mA, 120 VAC discrete, thermocouple signals'],
                                ['L1 — Basic Control', 'Reactor Protection System (RPS), ECCS logic cabinets, rod control', 'Hardwired safety logic, 2/4 voting, no TCP/IP (IEEE 603)'],
                                ['L2 — Supervisory', 'Plant Process Computer (PPC), MCR HMI, safety display indication', 'Isolated signal conditioners, fiber-optic data links'],
                                ['L3 — Operations', 'Plant historian, maintenance management, surveillance scheduling', 'Modbus TCP (non-safety), SQL database, CMMS integration'],
                                ['L3.5 — DMZ', 'Unidirectional data diode, firewall, protocol break, IDS/IPS', 'No inbound connections; outbound read-only per NEI 08-09'],
                                ['L4 — Enterprise', 'Corporate network, NRC ERDS reporting, financial systems', 'Encrypted VPN, MFA, annual penetration testing'],
                            ].map(([level, components, protocols]) => (
                                <tr key={level} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#10B981] font-medium whitespace-nowrap">{level}</td>
                                    <td className="px-3 py-2 text-gray-400">{components}</td>
                                    <td className="px-3 py-2 text-gray-400">{protocols}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">
                    Nuclear cybersecurity per NRC 10 CFR 73.54 and NEI 08-09. Safety I&amp;C is
                    completely isolated from non-safety networks with no digital pathway.
                </p>
            </Section>

            {/* 7. Safety & Supporting Systems */}
            <Section title="7. Safety &amp; Supporting Systems" id="supporting">
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
                                ['Fire Protection', 'Compartmentalized fire barriers, sprinklers, foam systems', 'NFPA 805 performance-based; 2-hr rated barriers between safety divisions'],
                                ['Emergency Diesel Gen.', 'Class 1E backup power for safety buses', '3× 6–8 MW, 10-sec start, 7-day fuel supply'],
                                ['DC Power / UPS', 'Station batteries for vital instrumentation', '125 VDC, 4-hr minimum capacity, Class 1E qualified'],
                                ['HVAC (Containment)', 'Containment atmosphere cooling and purging', 'Fan coolers, charcoal/HEPA filters, isolation dampers'],
                                ['Physical Security', 'Vital area barriers, CCTV, access control', '10 CFR 73 compliant; armed response force, vehicle barriers'],
                                ['Radiation Protection', 'Area monitors, process monitors, personnel dosimetry', 'ALARA program per 10 CFR 20; continuous stack monitoring'],
                                ['Emergency Response', 'EOPs, SAMGs, TSC, OSC, EOF coordination', 'NRC-approved E-Plan; 10-mile EPZ, 50-mile ingestion pathway'],
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

            {/* 8. Cooling Water & Utility Systems */}
            <Section title="8. Cooling Water &amp; Utility Systems" id="utilities">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Medium</th>
                                <th className="text-left px-3 py-2 font-medium">System</th>
                                <th className="text-left px-3 py-2 font-medium">Specification</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Circulating Water', 'Condenser cooling (once-through or tower)', '35,000–50,000 gpm; ~3,400 MWt heat rejection'],
                                ['Component Cooling Water', 'Closed-loop intermediate cooling', '10,000–15,000 gpm; RCP thermal barriers, HX cooling'],
                                ['Essential Service Water', 'Safety-related heat sink (Class 1E)', 'Redundant trains; EDG jacket water, ECCS HX cooling'],
                                ['Demineralized Water', 'Makeup to SG secondary, instrument air', 'Conductivity < 0.1 µS/cm, mixed-bed ion exchange'],
                                ['Instrument Air', 'Pneumatic valve actuation (non-safety)', '100 psi, dried/filtered; safety valves fail-safe on loss'],
                                ['Hydrogen (Generator)', 'Generator cooling atmosphere', '99.9% purity, 30–75 psi, explosion-proof enclosure'],
                            ].map(([medium, system, spec]) => (
                                <tr key={medium} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#10B981] font-medium whitespace-nowrap">{medium}</td>
                                    <td className="px-3 py-2 text-gray-400">{system}</td>
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
                    <pre className="whitespace-pre leading-relaxed">{`  ┌─────────────────────────────────────────────────────────────────────┐
  │                    ENTERPRISE (L4)                                 │
  │  NRC ERDS Reporting  ·  Corporate ERP  ·  Financial Systems       │
  │  Encrypted VPN, MFA, annual pentest per NEI 08-09                 │
  └───────────────────────────┬───────────────────────────────────────┘
                              │ Data Diode (L3.5 DMZ)
                              │ Unidirectional — no inbound
  ┌───────────────────────────┴───────────────────────────────────────┐
  │                    OPERATIONS (L3)                                │
  │  Plant Historian (1–4 Hz)  ·  CMMS  ·  Surveillance Tracker      │
  │  Non-safety Ethernet, SQL database, Modbus TCP                    │
  │  ~50,000 data points archived                                     │
  └───────────────────────────┬───────────────────────────────────────┘
                              │ Firewall + IDS/IPS
  ┌───────────────────────────┴───────────────────────────────────────┐
  │                    SUPERVISORY (L2)                               │
  │  Plant Process Computer  ·  MCR HMI  ·  Safety Parameter Display │
  │  Isolated signal conditioners, fiber-optic links                  │
  │  Read-only from L1 safety systems                                 │
  └───────────────────────────┬───────────────────────────────────────┘
                              │ Complete galvanic isolation
  ┌───────────────────────────┴───────────────────────────────────────┐
  │                    SAFETY I&C (L0–L1)                             │
  │  RPS (quad-redundant)  ·  ECCS Logic  ·  ESF Actuation           │
  │  Hardwired 4-20 mA + 120 VAC  ·  No TCP/IP  ·  No remote access │
  │  ~5,000 safety-related I/O points                                 │
  └───────────────────────────────────────────────────────────────────┘`}</pre>
                </div>
            </Section>

            {/* 10. References */}
            <Section title="10. References" id="references">
                <div className="space-y-2 text-xs text-gray-400 leading-relaxed">
                    <p>International Atomic Energy Agency. (2016). <em>Safety of Nuclear Power Plants: Design (SSR-2/1 Rev. 1)</em>. IAEA Safety Standards Series. Vienna: IAEA.</p>
                    <p>Institute of Electrical and Electronics Engineers. (2018). <em>IEEE 603: Standard criteria for safety systems for nuclear power generating stations</em>. IEEE.</p>
                    <p>International Electrotechnical Commission. (2011). <em>IEC 61513: Nuclear power plants — Instrumentation and control important to safety (Ed. 2)</em>. Geneva: IEC.</p>
                    <p>Mitsubishi Heavy Industries. (2023). <em>US-APWR Design Control Document — Reactor Coolant System</em>. Tokyo: MHI.</p>
                    <p>Nuclear Energy Institute. (2010). <em>NEI 08-09: Cyber Security Plan for Nuclear Power Reactors (Rev. 6)</em>. Washington, DC: NEI.</p>
                    <p>The Open Group. (2022). <em>TOGAF Standard, Version 10</em>. The Open Group.</p>
                    <p>U.S. Nuclear Regulatory Commission. (2024). <em>NUREG-1350: Information Digest</em>. Washington, DC: NRC.</p>
                    <p>U.S. Nuclear Regulatory Commission. (2020). <em>Regulatory Guide 1.152: Criteria for use of computers in safety systems of nuclear power plants (Rev. 3)</em>. Washington, DC: NRC.</p>
                    <p>U.S. Nuclear Regulatory Commission. (2009). <em>10 CFR 73.54: Protection of digital computer and communication systems and networks</em>. Washington, DC: NRC.</p>
                    <p>Westinghouse Electric Company. (2023). <em>AP1000 Design Control Document — Reactor Coolant System</em>. Pittsburgh, PA: Westinghouse.</p>
                </div>
            </Section>

            {/* See Also */}
            <Section title="See Also" id="see-also">
                <div className="flex flex-wrap gap-2">
                    {[
                        { href: '/wiki/nuclear', label: 'Nuclear Sector Hub', color: '#10B981' },
                        { href: '/wiki/nuclear/bwr-plant', label: 'BWR Plant', color: '#3B82F6' },
                        { href: '/wiki/nuclear/research-reactor', label: 'Research Reactor', color: '#8B5CF6' },
                        { href: '/wiki/sectors/NUCL', label: 'NUCL Sector Overview', color: '#10B981' },
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

/** Reusable section wrapper. */
function Section({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
    return (
        <section id={id} className="space-y-4">
            <h2 className="text-xl font-heading font-semibold text-white">{title}</h2>
            {children}
        </section>
    );
}
