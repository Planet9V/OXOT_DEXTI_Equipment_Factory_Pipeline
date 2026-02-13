/**
 * Chlor-Alkali Plants — Deep Dive Wiki Article.
 *
 * Comprehensive TOGAF-based reference architecture for membrane cell
 * chlor-alkali electrolysis plants (200 kt/yr Cl2), including brine
 * purification, electrolyzer technology, chlorine/caustic/hydrogen
 * processing, safety systems, and IEC 62443 integration.
 *
 * @module wiki/chemical/chlor-alkali/page
 */

export const metadata = {
    title: 'Chlor-Alkali Plants (Membrane Cell) — Chemical Wiki',
    description:
        'TOGAF reference architecture for membrane cell chlor-alkali electrolysis: brine purification, ' +
        'electrolyzer design, Cl2/NaOH/H2 processing, safety systems, and complete BOMs.',
};

export default function ChlorAlkaliPage() {
    return (
        <div className="max-w-5xl space-y-10">
            {/* Header */}
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div
                        className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]"
                        style={{ background: '#3B82F6' }}
                    />
                    <span className="text-xs font-mono text-gray-500">
                        CHEMICAL · BASIC CHEMICALS · CHLOR-ALKALI
                    </span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">
                    Chlor-Alkali Plants
                </h1>
                <p className="text-sm text-gray-500 font-mono">Membrane Cell Electrolysis · Cl&#x2082;/NaOH/H&#x2082;</p>
                <p className="text-gray-400 text-base leading-relaxed max-w-3xl">
                    Chlor-alkali electrolysis is the simultaneous electrochemical production of chlorine gas
                    (Cl&#x2082;), caustic soda (NaOH), and hydrogen (H&#x2082;) from saturated brine (NaCl solution).
                    Modern plants exclusively employ ion-selective membrane cell technology, which eliminates
                    mercury and asbestos exposure while achieving energy consumption of 2,000–2,500 kWh per
                    tonne of chlorine. The membrane process meets Euro Chlor Best Available Techniques (BAT)
                    and Best Environmental Practices (BEP) benchmarks, producing 32–33% caustic soda directly
                    from the cell with chlorine purity exceeding 99.5% (Euro Chlor, 2020; O&apos;Brien et al., 2005).
                </p>
            </div>

            {/* 1. TOGAF Business Architecture */}
            <Section title="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-300 leading-relaxed">
                    The chlor-alkali business architecture addresses the co-production economics of three
                    interdependent commodity chemicals. Chlorine demand drives plant utilization, while caustic
                    soda and hydrogen represent essential co-products whose market prices fluctuate independently.
                    The electrochemical chlorine unit (ECU) concept links chlorine and caustic pricing at a
                    stoichiometric ratio of 1.0 t Cl&#x2082; : 1.128 t NaOH. Operational flexibility in product
                    forms (liquid Cl&#x2082;, gaseous Cl&#x2082;, HCl, NaOCl, 50% NaOH, flake NaOH) provides revenue
                    optimization pathways. Electricity represents 40–60% of operating cost.
                </p>

                <h3 className="text-sm font-semibold text-white mt-6 mb-2">Stakeholders</h3>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside">
                    <li>Chlorine producers and integrated chemical complexes (Olin, Westlake, Covestro, Nouryon)</li>
                    <li>Membrane suppliers and technology licensors (Asahi Kasei, Chemours Nafion, AGC Flemion)</li>
                    <li>Chemical distributors and downstream consumers (PVC, water treatment, pulp/paper)</li>
                    <li>Regulatory bodies — EPA, OSHA, DHS CFATS, state environmental agencies</li>
                    <li>Emergency responders — HAZMAT teams, LEPC, Chlorine Emergency Plan (CHLOREP)</li>
                    <li>Power utilities — base-load electricity supply (largest single operating cost)</li>
                    <li>Salt suppliers — solar salt, rock salt, brine wells</li>
                    <li>Equipment OEMs — electrolyzer manufacturers (thyssenkrupp Uhde, Asahi Kasei, De Nora)</li>
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
                                ['OSHA PSM (29 CFR 1910.119)', 'Process Safety Management for highly hazardous chemicals — Cl\u2082 threshold 1,500 lbs'],
                                ['EPA RMP (40 CFR 68)', 'Risk Management Plan — Cl\u2082 threshold quantity 2,500 lbs, worst-case and alternative release scenarios'],
                                ['Chlorine Institute Pamphlets', 'CI Pamphlet 1 (steelwork), 6 (piping), 17 (cylinders), 85 (first aid), 86 (recommendations)'],
                                ['Euro Chlor BAT/BEP', 'Best Available Techniques reference for chlor-alkali production — energy benchmarks, mercury phase-out'],
                                ['NFPA 55', 'Compressed gases and cryogenic fluids — Cl\u2082 and H\u2082 storage requirements'],
                                ['DHS CFATS (6 CFR 27)', 'Chemical Facility Anti-Terrorism Standards — Cl\u2082 as release/theft/sabotage chemical of interest'],
                                ['IEC 62443', 'Industrial cybersecurity — IACS security levels for DCS and SIS integration'],
                            ].map(([standard, scope]) => (
                                <tr key={standard} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#3B82F6] font-medium whitespace-nowrap">{standard}</td>
                                    <td className="px-3 py-2 text-gray-400">{scope}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* 2. High-Level Design */}
            <Section title="2. High-Level Design" id="high-level-design">
                <h3 className="text-sm font-semibold text-white mb-2">Process One-Line</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`Raw Salt (NaCl)
    |
    v
Brine Saturator --> Primary Purification (NaOH/Na2CO3) --> Secondary Purification (Ion Exchange, <20 ppb Ca/Mg)
    |
    v
Dechlorination (Na2SO3 / activated carbon)
    |
    v
Membrane Electrolyzers (3.0-3.6 V/cell, 80-90 C, 4-6 kA/m2)
    |
    +-- Anode Side --> Cl2 Gas --> Cooling --> Drying (H2SO4) --> Compression --> Liquefaction (-34 C) --> Storage
    |
    +-- Cathode Side --> 32-33% NaOH --> Triple-Effect Evaporator --> 50% NaOH --> Storage
    |
    +-- Cathode Side --> H2 Gas --> Cooling --> Purification --> Compression --> Fuel / Sale`}</pre>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed mt-4">
                    <span className="text-white font-medium">Redundancy design</span> employs{' '}
                    <span className="text-[#3B82F6] font-medium">N+1 rectifier transformers</span>{' '}
                    to ensure continuous DC power supply and parallel electrolyzer stacks enabling individual
                    stack isolation for membrane replacement without full plant shutdown. Brine circulation
                    pumps are configured in duty/standby pairs with automatic failover.
                </p>
            </Section>

            {/* 3. Detailed Technical Description */}
            <Section title="3. Detailed Technical Description" id="technical">
                <h3 className="text-base font-semibold text-white mt-2 mb-2">3.1 Brine Preparation</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    Raw salt is dissolved in the brine saturator to produce near-saturated brine (~310 g/L NaCl).
                    Primary purification removes Ca, Mg, and SO&#x2084; impurities by adding NaOH and Na&#x2082;CO&#x2083;,
                    followed by flocculation and filtration through candle or leaf filters. Secondary purification
                    through{' '}
                    <span className="text-[#3B82F6] font-medium">chelating ion exchange columns</span>{' '}
                    (iminodiacetic acid resin) reduces total hardness to below 20 ppb Ca+Mg, which is critical
                    for membrane longevity. Dechlorination with sodium sulfite or activated carbon removes
                    residual dissolved chlorine before the brine enters the electrolyzers (O&apos;Brien et al., 2005).
                </p>

                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.2 Electrolysis Cell Room</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    Modern membrane electrolyzers use{' '}
                    <span className="text-[#3B82F6] font-medium">bipolar filter-press elements</span>{' '}
                    with perfluorinated ion exchange membranes (Nafion/Flemion/Aciplex). Each cell operates at
                    3.0–3.6 V with current density of 4–6 kA/m&#xB2;, producing approximately 1.128 t NaOH per
                    tonne of Cl&#x2082; at 80–90&#xB0;C. Specific energy consumption is 2,000–3,000 kWh per tonne of
                    Cl&#x2082; depending on current density and membrane age. Rectifier transformers convert AC grid
                    power to 60–150 kA DC at low voltage. Cell voltage monitoring (CVM) systems scan each
                    element at 1-second intervals to detect membrane pinholes or electrode degradation
                    (Euro Chlor, 2020).
                </p>
                <div className="overflow-x-auto mt-3">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Parameter</th>
                                <th className="text-left px-3 py-2 font-medium">Specification</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Cell Voltage', '3.0\u20133.6 V per element'],
                                ['Current Density', '4\u20136 kA/m\u00B2'],
                                ['Operating Temperature', '80\u201390\u00B0C'],
                                ['Membrane Life', '3\u20135 years (Nafion/Flemion)'],
                                ['Current Efficiency', '95\u201397%'],
                                ['Energy Consumption', '2,000\u20133,000 kWh/t Cl\u2082'],
                                ['Rectifier DC Current', '60\u2013150 kA per circuit'],
                            ].map(([param, spec]) => (
                                <tr key={param} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-gray-300 font-medium">{param}</td>
                                    <td className="px-3 py-2 text-gray-400">{spec}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.3 Chlorine Processing</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    Wet chlorine gas from the electrolyzers is cooled in titanium shell-and-tube exchangers to
                    remove water vapor, then dried in packed towers using concentrated sulfuric acid
                    (H&#x2082;SO&#x2084;, 96–98%). Dry chlorine is compressed by liquid-ring (titanium) or centrifugal
                    compressors and liquefied at{' '}
                    <span className="text-[#3B82F6] font-medium">&#x2212;34&#xB0;C at atmospheric pressure</span>{' '}
                    or at elevated pressure (6–8 bar) and ambient temperature. Liquid chlorine is stored in
                    horizontal pressure vessels per Chlorine Institute Pamphlet 5 (Chlorine Institute, 2017).
                </p>

                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.4 Caustic Concentration</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    Cell liquor exits at 32–33% NaOH concentration. A{' '}
                    <span className="text-[#3B82F6] font-medium">triple-effect falling-film evaporator</span>{' '}
                    concentrates caustic to 50% NaOH (the standard merchant grade), with steam economy of
                    2.5–3.0 tonnes of water evaporated per tonne of steam. Further concentration to 73%
                    (anhydrous flake) requires additional falling-film stages. Product is stored in carbon
                    steel tanks with steam tracing to maintain fluidity above 12&#xB0;C.
                </p>

                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.5 Hydrogen System</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    Hydrogen exits cathode compartments saturated with water vapor and traces of NaOH.
                    It is cooled, scrubbed, and compressed to 4–10 bar. Purified H&#x2082; (99.9%+) is either
                    sold as merchant hydrogen, used as fuel in the caustic evaporator or HCl synthesis
                    burner, or fed to an on-site hydrogen peroxide plant. Hydrogen handling follows
                    NFPA 2 and CGA G-5.4 guidelines with ATEX Zone 1 classification in the cell room.
                </p>
            </Section>

            {/* 4. Process Diagrams */}
            <Section title="4. Process Diagrams" id="process-diagrams">
                <h3 className="text-sm font-semibold text-white mb-2">4.1 Brine-to-Products Material Flow</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`Raw Salt ---> Brine Saturator (310 g/L NaCl)
                    |
              NaOH + Na2CO3 addition
                    |
                    v
            Primary Purification ---> Brine Sludge (filter press)
                    |
                    v
            Ion Exchange Columns (<20 ppb Ca+Mg)
                    |
              Na2SO3 injection
                    |
                    v
            Dechlorinated Feed Brine
                    |
    +---------------+---------------+
    v               v               v
  ANODE          MEMBRANE        CATHODE
  Cl2 gas                       NaOH (32%) + H2 gas
    |                               |           |
    v                               v           v
  Cooling -> Drying -> Compress.  Evaporator  Cooling
    |                               |           |
    v                               v           v
  Liquefaction (-34 C)           50% NaOH    H2 Compress.
    |                               |           |
    v                               v           v
  Cl2 Storage                   NaOH Tanks   Fuel / Sale`}</pre>
                </div>

                <h3 className="text-sm font-semibold text-white mt-8 mb-2">4.2 Power and Electrolyzer Control</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`Grid Supply (138 kV / 34.5 kV)
    |
    v
Rectifier Transformer (AC -> DC, 60-150 kA)
    |                                    N+1 Redundancy
    +-- Rectifier Bank A --+
    +-- Rectifier Bank B --+---> DC Bus Bar (200-600 V DC)
    +-- Rectifier Bank C --+
                           |
              +------------+------------+
              v            v            v
         Stack 1      Stack 2      Stack N
        (80 cells)   (80 cells)  (80 cells)
              |            |            |
              +------------+------------+
                           |
                    Cell Voltage Monitor
                     (per-element, 1s scan)
                           |
                    DCS Load Control
                     (current setpoint, ramp rate)`}</pre>
                </div>

                <h3 className="text-sm font-semibold text-white mt-8 mb-2">4.3 Safety System Architecture</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`Cl2 Area Detectors (0.5 / 1.0 / 3.0 ppm thresholds)
    |
    +-- 0.5 ppm -> DCS ALARM (investigate)
    +-- 1.0 ppm -> SIS ACTION: close isolation valves, start scrubber fan
    +-- 3.0 ppm -> EMERGENCY SHUTDOWN: trip electrolyzers, full scrubber
                           |
                    +------+------+
                    v             v
            Emergency         Building
            Cl2 Scrubber      Evacuation
            (NaOH tower,      (audible/visual
             10-50 t/hr        alarm, HVAC
             Cl2 capacity)     isolation)
                    |
                    v
            Scrubber Effluent -> NaOCl Storage (saleable co-product)

SIS: IEC 61511 SIL 2/3, redundant sensors (2oo3 voting)
Cl2 detectors: electrochemical + photoionization, monthly bump test`}</pre>
                </div>
            </Section>

            {/* 5. Bill of Materials */}
            <Section title="5. Bill of Materials" id="bom">
                <p className="text-sm text-gray-400 mb-3 italic">
                    Scaled for a 200 kt/yr Cl&#x2082; membrane cell chlor-alkali plant.
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
                                ['Membrane Electrolyzers', 'Bipolar, 80\u2013160 elements/stack, Nafion/Flemion membranes', '8\u201312 stacks'],
                                ['Rectifier Transformers', 'AC/DC, 60\u2013150 kA, thyristor-based, oil-cooled', '4 (N+1)'],
                                ['Brine Saturator', 'FRP-lined steel, 310 g/L NaCl, overflow control', '2'],
                                ['Primary Brine Filters', 'Candle or leaf filters, 5 \u03BCm retention', '4'],
                                ['Ion Exchange Columns', 'Chelating resin (iminodiacetic acid), <20 ppb Ca+Mg', '6 (3 duty + 3 regen)'],
                                ['Dechlorinator', 'Activated carbon or Na\u2082SO\u2083 injection, <0.5 ppm Cl\u2082', '2'],
                                ['Cl\u2082 Cooler', 'Titanium shell-and-tube, wet gas cooling to 15\u00B0C', '2'],
                                ['Cl\u2082 Drying Towers', 'Packed column, 96\u201398% H\u2082SO\u2084 counter-current', '3 (series)'],
                                ['Cl\u2082 Compressor', 'Liquid-ring (Ti) or centrifugal, 4\u20138 bar', '2 (duty/standby)'],
                                ['Cl\u2082 Liquefier', 'Shell-and-tube, R-134a or NH\u2083 refrigerant, \u221234\u00B0C', '2'],
                                ['Cl\u2082 Storage Vessels', 'Horizontal pressure vessels, CS, 50\u2013100 t each', '4'],
                                ['Caustic Evaporators', 'Triple-effect falling-film, 32% to 50% NaOH', '1 train (3 effects)'],
                                ['Caustic Storage Tanks', 'Carbon steel, steam-traced, 5,000 m\u00B3 each', '4'],
                                ['H\u2082 Cooler', 'Shell-and-tube, SS316L, gas/water', '2'],
                                ['H\u2082 Compressor', 'Reciprocating or screw, 4\u201310 bar, ATEX Zone 1', '2 (duty/standby)'],
                                ['Emergency Cl\u2082 Scrubber', 'Packed tower, 20% NaOH circ., 50 t/hr Cl\u2082 cap.', '1'],
                                ['Brine Circulation Pumps', 'FRP or titanium, 2,000 m\u00B3/hr, VFD', '4 (2+2 standby)'],
                                ['Caustic Circulation Pumps', 'Nickel or SS316L, 500 m\u00B3/hr', '4 (2+2 standby)'],
                                ['Process Analyzers', 'Cl\u2082-in-brine, pH, conductivity, moisture, O\u2082/H\u2082-in-Cl\u2082', '~60 points'],
                                ['SIS Controllers', 'IEC 61511 SIL 2/3 safety PLC, 2oo3 voting', '2 (redundant)'],
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
                                ['Level 0 \u2014 Process', 'Electrolyzers, rectifier thyristors, pumps, valves, Cl\u2082 detectors, T/P sensors', 'Electrolysis, fluid transport, measurement'],
                                ['Level 1 \u2014 Basic Control', 'Rectifier firing controllers, CVM system, PLC I/O, motor starters, VFDs', 'Per-cell voltage regulation, current control, pump sequencing'],
                                ['Level 2 \u2014 Supervisory', 'DCS operator stations, SIS controllers (SIL 2/3), HMI, alarm management', 'Load optimization, safety interlocks, Cl\u2082 emergency shutdown'],
                                ['Level 3 \u2014 Operations', 'Process historian, APC, LIMS, MES, energy management', 'Production scheduling, brine quality trending, kWh/t Cl\u2082 optimization'],
                                ['Level 3.5 \u2014 DMZ', 'OT/IT firewall, data diode, patch server, antivirus distribution', 'IEC 62443 zone/conduit, CFATS compliance, secure remote access'],
                                ['Level 4 \u2014 Enterprise', 'ERP (SAP/Oracle), supply chain, energy market interface, regulatory reporting', 'Order management, Cl\u2082/NaOH logistics, emissions reporting'],
                            ].map(([level, components, functions]) => (
                                <tr key={level} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#3B82F6] font-medium whitespace-nowrap">{level}</td>
                                    <td className="px-3 py-2 text-gray-300">{components}</td>
                                    <td className="px-3 py-2 text-gray-400">{functions}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">
                    Rectifier/electrolyzer control spans Levels 0–2 with tight coupling: cell voltage
                    deviations trigger automatic current adjustment within 100 ms at Level 1, while
                    DCS at Level 2 manages load balancing across stacks and coordinates with the SIS.
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
                                ['Emergency Cl\u2082 Scrubber', 'Packed NaOH absorption tower, auto-start on Cl\u2082 detection; most critical safety system', '50 t/hr Cl\u2082 capacity, 20% NaOH, 15 min autonomy'],
                                ['Fire Protection', 'Deluge water spray for Cl\u2082 storage, foam for transformer oil, clean agent for control room', 'NFPA 15/2001, FM-200'],
                                ['HVAC', 'Cell room ventilation (20 ACH), negative pressure in Cl\u2082 areas, control room pressurization', 'ATEX Zone 1 (H\u2082), corrosion-resistant materials'],
                                ['DC Power Supply', 'Rectifier transformers providing 60\u2013150 kA DC; largest single power consumer (~90% of load)', '200\u2013400 MW total for 200 kt/yr plant'],
                                ['UPS', 'Double-conversion for DCS, SIS, and Cl\u2082 detectors; battery-backed instrument power', '200 kVA, 30 min bridge time'],
                                ['Backup Power', 'Diesel generator for scrubber, Cl\u2082 detectors, emergency lighting, valve actuators', '2 MW, auto-start <10 s, 48 hr fuel'],
                                ['Lightning / Grounding', 'Grounding grid for cell room (equipotential bonding), lightning masts for outdoor storage', 'IEEE 80, <1 \u03A9 ground resistance'],
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
                                ['Cooling Water', 'Open recirculating with cooling tower; Cl\u2082, H\u2082 coolers, rectifier cooling', '15,000 m\u00B3/hr, \u0394T 8\u00B0C, Ti exchangers for Cl\u2082 service'],
                                ['Instrument Air', 'Oil-free compressors, desiccant dryers, \u221240\u00B0C dewpoint', '2,000 Nm\u00B3/hr, 7 bar, ISO 8573 Class 1'],
                                ['Nitrogen', 'PSA or liquid N\u2082 vaporizer; inerting Cl\u2082/H\u2082 systems, purging', '500 Nm\u00B3/hr, 99.95% purity'],
                                ['Steam', 'Boiler plant or waste heat; caustic evaporation, brine heating, tank tracing', '50 t/hr @ 4 bar (LP), natural gas or H\u2082-fired'],
                                ['HCl Synthesis', 'H\u2082 + Cl\u2082 burner producing anhydrous HCl or hydrochloric acid (31%)', '50\u2013100 kt/yr HCl, quartz-lined burner'],
                                ['Hypochlorite Production', 'NaOH + Cl\u2082 reaction for NaOCl (12\u201315% available Cl\u2082)', '20\u201350 kt/yr NaOCl, for water treatment market'],
                                ['Demineralized Water', 'RO + EDI for brine make-up and caustic dilution', '200 m\u00B3/hr, <0.1 \u03BCS/cm'],
                            ].map(([utility, system, spec]) => (
                                <tr key={utility} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#06B6D4] font-medium whitespace-nowrap">{utility}</td>
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
                    <pre className="whitespace-pre leading-relaxed">{`+-------------------------------------------------------------+
| Cell Voltage Monitoring (1s scan, per-element):             |
|   Electrolyzer Cells --(4-20mA / Modbus)--> Cell Voltage PLC|
|                                                             |
| Process Control (100ms-1s scan):                            |
|   Field Instruments --(HART / PROFIBUS)--> DCS I/O Cards    |
|                                                             |
| Safety Instrumented System:                                 |
|   Cl2 Detectors (2oo3) --(4-20mA SIL)--> SIS Controller    |
|                                              |              |
|                                   +----------+----------+   |
|                                   v                     v   |
|                            DCS Integration         ESD Actions|
|                            (read-only status)      (valve close,|
|                                   |                scrubber on)|
|                                   v                           |
| Historian (1s / 10s storage):                                 |
|   DCS --(OPC DA/UA)--> Process Historian (OSIsoft PI / IP.21) |
|                              |                                |
|                         DMZ Firewall                          |
|                              |                                |
| Enterprise (5min+ aggregation):                               |
|   Historian --(OPC UA / SQL)--> MES --> ERP (SAP)             |
|                                   |                           |
|                              Energy Management                |
|                              (kWh/t Cl2 KPI)                 |
+-------------------------------------------------------------+`}</pre>
                </div>
            </Section>

            {/* 10. References */}
            <Section title="10. References" id="references">
                <div className="space-y-2 text-xs text-gray-400 leading-relaxed">
                    <p>Chlorine Institute. (2017). <em>Pamphlet 5: Non-refrigerated liquid chlorine storage</em>. The Chlorine Institute, Inc.</p>
                    <p>Chlorine Institute. (2021). <em>Pamphlet 86: Recommendations for prevention of personnel injuries for chlor-alkali operations</em>. The Chlorine Institute, Inc.</p>
                    <p>Euro Chlor. (2020). <em>Best available techniques reference document for the production of chlor-alkali</em>. Euro Chlor/BREF.</p>
                    <p>O&apos;Brien, T. F., Bommaraju, T. V., &amp; Hine, F. (2005). <em>Handbook of chlor-alkali technology</em> (Vols. 1–5). Springer.</p>
                    <p>Occupational Safety and Health Administration. (2000). <em>Process safety management of highly hazardous chemicals</em> (29 CFR 1910.119). OSHA.</p>
                    <p>U.S. Environmental Protection Agency. (2017). <em>Risk management program guidance for offsite consequence analysis</em> (40 CFR 68). EPA.</p>
                    <p>U.S. Department of Homeland Security. (2014). <em>Chemical Facility Anti-Terrorism Standards</em> (6 CFR 27). DHS.</p>
                    <p>International Electrotechnical Commission. (2018). <em>IEC 62443: Industrial communication networks — Network and system security</em>. IEC.</p>
                </div>
            </Section>

            {/* See Also */}
            <Section title="See Also" id="see-also">
                <div className="flex flex-wrap gap-2">
                    {[
                        { href: '/wiki/chemical', label: 'Chemical Sector Hub', color: '#3B82F6' },
                        { href: '/wiki/chemical/petrochemical', label: 'Petrochemical Plants', color: '#3B82F6' },
                        { href: '/wiki/dexpi/equipment-classes', label: 'DEXPI Equipment Classes', color: '#8B5CF6' },
                        { href: '/wiki/sectors/CHEM', label: 'Chemical Sector Overview', color: '#3B82F6' },
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
