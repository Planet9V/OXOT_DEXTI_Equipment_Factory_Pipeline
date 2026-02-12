/**
 * Water Distribution Networks — Deep-Dive Wiki Article.
 *
 * Comprehensive TOGAF-based reference architecture for potable water
 * distribution systems including transmission mains, distribution mains,
 * storage facilities, PRVs, fire hydrants, AMI, and water quality monitoring.
 *
 * @module wiki/water/distribution/page
 */

export const metadata = {
    title: 'Water Distribution Networks — Water Sector Wiki',
    description:
        'TOGAF reference architecture for water distribution: transmission mains (24–96″), ' +
        'storage tanks, booster stations, PRVs, AMI smart metering, and water quality monitoring.',
};

export default function DistributionPage() {
    return (
        <div className="max-w-5xl space-y-10">
            {/* Header */}
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <div
                        className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]"
                        style={{ background: '#0EA5E9' }}
                    />
                    <span className="text-xs font-mono text-gray-500">
                        WATR · WATR-DW · DISTRIBUTION
                    </span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">
                    Water Distribution Networks
                </h1>
                <p className="text-sm text-gray-400 leading-relaxed max-w-3xl">
                    Potable water distribution systems convey treated water from clearwells and
                    storage facilities to over 2.2 million miles of transmission and distribution
                    mains across the United States. This article covers a reference 50,000-connection
                    utility district with multiple pressure zones, elevated and ground storage,
                    booster pump stations, AMI smart metering, and real-time water quality monitoring
                    per AWWA standards and the SDWA.
                </p>
            </div>

            {/* 1. TOGAF Business Architecture */}
            <Section title="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-300 leading-relaxed">
                    The distribution network business architecture defines the stakeholders and
                    regulatory environment that govern system design, operation, and asset renewal
                    across the utility&apos;s service territory.
                </p>
                <h4 className="text-xs font-semibold text-white mt-4 mb-2">Key Stakeholders</h4>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li><span className="text-[#0EA5E9] font-medium">Water Utility</span> — Owner-operator managing 24/7 distribution, pressure management, and leak response</li>
                    <li><span className="text-[#0EA5E9] font-medium">EPA / State Primacy</span> — SDWA compliance for disinfectant residuals, lead/copper, and total coliform</li>
                    <li><span className="text-[#0EA5E9] font-medium">Fire Departments</span> — Fire flow requirements per NFPA 24 and ISO fire suppression ratings</li>
                    <li><span className="text-[#0EA5E9] font-medium">Customers</span> — Residential, commercial, and industrial consumers with service level agreements</li>
                    <li><span className="text-[#0EA5E9] font-medium">AWWA</span> — C-series pipe standards, M-series design manuals, operator certification</li>
                    <li><span className="text-[#0EA5E9] font-medium">Public Works / DOT</span> — Right-of-way permits, road crossings, utility coordination</li>
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
                                ['SDWA — Distribution Requirements', 'Minimum 0.2 mg/L free Cl₂ residual throughout distribution system'],
                                ['Total Coliform Rule (TCR) Revised', 'Monthly coliform sampling, E. coli trigger threshold for assessment'],
                                ['Lead and Copper Rule Revisions', 'Action levels at consumer taps, optimized corrosion control treatment'],
                                ['AWWA C-Series Standards', 'Pipe materials (C900 PVC, C151 DI, C200 steel), fittings, valves'],
                                ['AWWA M31 Distribution System Design', 'Hydraulic design criteria, pressure zones, storage volume requirements'],
                                ['AWWA M36 Water Audits & Loss Control', 'Non-revenue water, apparent/real loss quantification (IWA methodology)'],
                                ['NFPA 24 Private Fire Service Mains', 'Fire hydrant spacing, flow requirements, main sizing for fire suppression'],
                                ['ANSI C84.1 Voltage Ranges', 'Applicable to pump station VFDs and instrumentation power quality'],
                                ['Cross-Connection Control (AWWA M14)', 'Backflow prevention assemblies, annual testing, hazard classification'],
                            ].map(([std, scope]) => (
                                <tr key={std} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#0EA5E9] font-medium whitespace-nowrap">{std}</td>
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
                    The distribution network forms a looped grid topology with redundant supply paths.
                    Multiple{' '}
                    <span className="text-[#0EA5E9] font-medium">pressure zones</span>{' '}
                    separated by PRVs or booster stations maintain 40–80 psi at all service connections.
                    Elevated tanks provide peak-hour equalization and fire storage; ground reservoirs
                    provide operational and emergency reserves.
                </p>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto mt-4"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`WTP Clearwell ──► Transmission Main (24-48") ──► Pressure Zone 1 (Elev. 600-700 ft)
                         │                           │
                    Booster Station ──►         Elevated Tank (1.5 MG)
                         │                           │
                         ▼                           ▼
                 Pressure Zone 2 (700-800 ft)  Distribution Mains (8-16")
                         │                      │    │    │    │
                  Ground Tank (5 MG)         Services (5/8"-2")
                         │                      │
                    PRV Station ──►          Fire Hydrants (500 ft spacing)
                         │                      │
                         ▼                   AMI Smart Meters ──► RF Mesh ──► Head-End
                 Pressure Zone 3 (500-600 ft)
                         │
                  Elevated Tank (1.0 MG)

 ┌─────────────────────────────────────────────────────────────────────────┐
 │  REFERENCE SYSTEM: 50,000 connections, 3 pressure zones               │
 │  PIPE: ~600 miles (48" transmission → 6-8" distribution)              │
 │  STORAGE: Equalization (1× max day demand) + fire reserve (2-hr flow) │
 │  PRESSURE: 40-80 psi at all service connections                       │
 └─────────────────────────────────────────────────────────────────────────┘`}</pre>
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">
                    Figure 1. Distribution network topology with three pressure zones, transmission
                    main, booster stations, and elevated/ground storage.
                </p>
            </Section>

            {/* 3. Detailed Technical Description */}
            <Section title="3. Detailed Technical Description" id="technical">
                <h3 className="text-sm font-semibold text-white mt-4">3.1 Transmission Mains</h3>
                <p className="text-xs text-gray-400 leading-relaxed mt-1">
                    Transmission mains convey treated water from the WTP or regional supply to the
                    distribution system at velocities of 3–6 fps. Large-diameter pipes (24–96″)
                    are typically prestressed concrete cylinder pipe (PCCP), steel, or ductile iron
                    with polyethylene encasement for corrosion protection.
                </p>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside mt-2">
                    <li>Pipe materials: PCCP (AWWA C301), steel (AWWA C200), ductile iron (AWWA C151)</li>
                    <li>Diameter range: 24–96″ for transmission; design velocity 3–6 fps</li>
                    <li>Cathodic protection: Impressed current or galvanic anodes (AWWA C105)</li>
                    <li>Surge protection: Air/vacuum valves at high points, surge tanks at pump stations</li>
                    <li>Isolation valves: Butterfly (AWWA C504) at 2,500 ft intervals on transmission</li>
                    <li>Typical distance: 5–30 miles from WTP to first distribution entry point</li>
                </ul>

                <h3 className="text-sm font-semibold text-white mt-6">3.2 Distribution Mains</h3>
                <p className="text-xs text-gray-400 leading-relaxed mt-1">
                    Distribution mains form a looped grid pattern to minimize dead-ends and maximize
                    water quality. Dead-end mains are minimized and flushed regularly to maintain
                    disinfectant residuals.
                </p>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside mt-2">
                    <li>Pipe materials: PVC (AWWA C900/C905), ductile iron (AWWA C151), HDPE (AWWA C906)</li>
                    <li>Diameter range: 6–16″ for distribution mains; 3/4–2″ for service laterals</li>
                    <li>Minimum main size: 8″ for residential (6″ only with hydraulic justification)</li>
                    <li>Gate valves (AWWA C500/C509): every 500–800 ft, resilient-seated</li>
                    <li>Fire hydrants: 250–500 ft spacing per NFPA 24, min. 1,000 GPM at 20 psi residual</li>
                    <li>Service connections: corporation stop, curb stop, meter setter, backflow preventer</li>
                </ul>

                <h3 className="text-sm font-semibold text-white mt-6">3.3 Storage Facilities</h3>
                <p className="text-xs text-gray-400 leading-relaxed mt-1">
                    Storage provides equalization between supply (steady WTP output) and demand
                    (variable consumer usage), plus fire reserve and emergency supply. Elevated
                    tanks use hydraulic grade line (HGL) to maintain pressure; ground tanks require
                    booster pumps.
                </p>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside mt-2">
                    <li>Elevated tanks: welded steel pedestal type (AWWA D100), 0.5–2.0 MG, 150 ft typical height</li>
                    <li>Ground storage: welded steel (AWWA D100) or prestressed concrete (AWWA D110), 2–10 MG</li>
                    <li>Storage volume: equalization (25% max day) + fire (2-hr fire flow) + emergency (avg day)</li>
                    <li>Level controls: ultrasonic/radar level transmitters, altitude valves on fill lines</li>
                    <li>Mixing: internal mixers or inlet nozzles to prevent thermal stratification and stagnant zones</li>
                    <li>Inspection: AWWA D101 diving inspection or ROV every 3–5 years</li>
                </ul>

                <h3 className="text-sm font-semibold text-white mt-6">3.4 Booster Pump Stations</h3>
                <p className="text-xs text-gray-400 leading-relaxed mt-1">
                    Booster stations increase pressure to serve higher-elevation zones or distant
                    portions of the network. VFD-controlled pumps maintain constant discharge
                    pressure regardless of demand variation.
                </p>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside mt-2">
                    <li>Pumps: 3× horizontal split-case (2 duty + 1 standby), 100–500 HP, VFD-controlled</li>
                    <li>Discharge pressure: constant setpoint via PID control on VFD speed</li>
                    <li>Surge protection: air/vacuum valves, check valves with slow-closing dashpots</li>
                    <li>Rechlorination: sodium hypochlorite trim dosing to maintain 0.2+ mg/L residual</li>
                    <li>SCADA: RTU with cellular/radio telemetry, alarm for low suction/high discharge</li>
                </ul>

                <h3 className="text-sm font-semibold text-white mt-6">3.5 Water Quality Monitoring &amp; AMI</h3>
                <p className="text-xs text-gray-400 leading-relaxed mt-1">
                    Real-time monitoring stations deployed at key nodes detect water quality
                    excursions. AMI (Advanced Metering Infrastructure) provides 15-minute interval
                    consumption data via RF mesh networks, enabling leak detection, demand
                    forecasting, and dynamic pressure management.
                </p>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside mt-2">
                    <li>WQ monitoring panels: 8× stations with Cl₂, pH, turbidity, pressure, temperature</li>
                    <li>AMI meters: 50,000× smart meters (Sensus/Neptune/Badger), 900 MHz RF mesh</li>
                    <li>Data collectors: 200× fixed-network endpoints, cellular backhaul to head-end</li>
                    <li>Leak detection: acoustic loggers (50×), night flow analysis from AMI data</li>
                    <li>Hydraulic model: EPANET or InfoWater, calibrated to SCADA/AMI data quarterly</li>
                    <li>Flushing program: unidirectional flushing per AWWA M28, velocity target ≥5 fps</li>
                </ul>
            </Section>

            {/* 4. Process Diagrams */}
            <Section title="4. Process Diagrams" id="process-diagrams">
                <h3 className="text-sm font-semibold text-white">4.1 Water Flow — Source to Tap</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto mt-2"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`WTP CLEARWELL ──► TRANSMISSION MAIN (24-48") ──► MASTER METER VAULT
      │                                                │
      │ NaOCl boost                            PRV/Booster
      │                                                │
      ▼                                                ▼
 GROUND TANK ◄──────── ZONE 1 GRID ──────► ELEVATED TANK
 (5 MG, elev. 680')     (8-16" DI/PVC)      (1.5 MG, 780' HGL)
      │                      │
      │                 Fire Hydrants
      │                 (500 ft spacing)
      │                      │
      ▼                      ▼
 BOOSTER STA. ──► ZONE 2 ──► SERVICE LINES ──► METERS ──► CUSTOMERS
 (3 × 200 HP)     (6-12")    (3/4-2" Cu/PE)    (AMI)`}</pre>
                </div>

                <h3 className="text-sm font-semibold text-white mt-6">4.2 Pressure Control Flow</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto mt-2"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`Pressure Sensors ──► SCADA PLC ──► VFD Speed Control (Booster Pumps)
                       │              │
Tank Level Sensors ────┤              ├──► PRV Setpoint Adjustment
                       │              │
Demand Forecast ───────┘              └──► WTP Pump Scheduling
(AMI/Hydraulic model)

Target: 40-80 psi at all service connections
Alarms: < 20 psi (low) │ > 100 psi (high) │ Rate-of-change (break)`}</pre>
                </div>

                <h3 className="text-sm font-semibold text-white mt-6">4.3 AMI Data Flow</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto mt-2"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`Smart Meters (50,000) ──► RF Mesh (900 MHz) ──► Collectors (200)
                                                        │
                                                  Cellular Backhaul
                                                        │
                                                        ▼
                                               AMI Head-End Server
                                                   │        │
                                          MDM (Meter Data    │
                                           Management)      │
                                              │              │
                                    Billing/CIS ──► Customer Portal
                                              │
                                    Leak Detection Analytics (AI/ML)
                                              │
                                    Demand Forecasting → SCADA Optimization`}</pre>
                </div>
            </Section>

            {/* 5. Bill of Materials */}
            <Section title="5. Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2 italic">
                    Scaled for a 50,000-connection distribution system with 3 pressure zones.
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
                                ['Transmission Main', 'PCCP/steel, cement-mortar lined', '15 mi', '36–48″ dia., 150 psi WP'],
                                ['Distribution Main', 'PVC C900 / ductile iron C151', '580 mi', '8–16″ dia., 200 psi WP'],
                                ['Service Lateral', 'Type K copper / HDPE', '50,000', '3/4–2″ dia.'],
                                ['Gate Valve', 'Resilient-seated, bolted bonnet', '4,800', '6–16″, AWWA C509'],
                                ['Butterfly Valve (Transmission)', 'Rubber-seated, AWWA C504', '120', '24–48″, 150 psi WP'],
                                ['PRV Station', 'Pilot-operated globe valve, vault', '6', '8–16″, 40–80 psi setpoint'],
                                ['Fire Hydrant', 'Dry barrel, AWWA C502', '2,400', '1,000+ GPM at 20 psi residual'],
                                ['Elevated Tank', 'Welded steel pedestal, AWWA D100', '2', '1.0–1.5 MG, 150 ft height'],
                                ['Ground Storage Tank', 'Welded steel, AWWA D100', '2', '5.0 MG each'],
                                ['Booster Pump Station', 'Horizontal split-case, VFD', '3 sta.', '3×200 HP per station'],
                                ['AMI Smart Meter', 'Ultrasonic/magnetic, RF module', '50,000', '5/8″–2″, 15-min interval'],
                                ['RF Mesh Collector', 'Fixed-network, cellular uplink', '200', '900 MHz, 2,500 ft range'],
                                ['WQ Monitor Panel', 'Cl₂, pH, turbidity, pressure, temp', '8', 'Multi-parameter, 4–20 mA'],
                                ['Acoustic Leak Logger', 'Correlating, magnetic mount', '50', 'Nightly upload, 500 ft range'],
                                ['Air/Vacuum Valve', 'Combination, AWWA C512', '180', '2–6″, on transmission mains'],
                                ['Backflow Preventer', 'RPZ or DCVA, AWWA C511/C510', '1,200', 'Commercial/fire services'],
                                ['Chlorine Booster', 'NaOCl metering, flow-paced', '4', '0–5 mg/L, at booster/tank sites'],
                                ['Cathodic Protection', 'Impressed current rectifier or galvanic', '80', 'Per AWWA C105, 10-yr life'],
                                ['SCADA RTU', 'Cellular/radio, with PLC I/O', '18', 'At tanks, boosters, PRVs, WQ'],
                                ['Emergency Generator', 'Diesel with ATS, NFPA 110', '3', '250 kW each (booster stations)'],
                                ['Hydraulic Model', 'EPANET / InfoWater calibrated', '1', '50,000-node model'],
                            ].map(([equip, spec, qty, rating]) => (
                                <tr key={equip} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#0EA5E9] font-medium whitespace-nowrap">{equip}</td>
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
                                ['L0 — Process', 'PRVs, pumps, valves, meters, WQ sensors, tank levels, hydrants', '4–20 mA, HART, pulse output'],
                                ['L1 — Basic Control', 'RTUs at remote sites, PLCs at booster stations, meter RTUs', 'Modbus RTU, DNP3, cellular'],
                                ['L2 — Supervisory', 'Distribution SCADA (central control room), AMI head-end server', 'DNP3/TCP, Modbus TCP, RF mesh'],
                                ['L3 — Operations', 'Hydraulic model (EPANET), GIS/mapping, leak detection analytics', 'OPC UA, REST APIs, SQL'],
                                ['L3.5 — DMZ', 'Firewalls, VPN concentrators, historian mirror, antivirus relay', 'HTTPS, SSH, data diode (optional)'],
                                ['L4 — Enterprise', 'CIS/billing, CMMS (Cityworks/Maximo), AMI analytics, CCR portal', 'REST, MQTT, HTTPS, WaterML'],
                            ].map(([level, components, protocols]) => (
                                <tr key={level} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#0EA5E9] font-mono font-medium whitespace-nowrap">{level}</td>
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
                                ['Cathodic Protection', 'Corrosion prevention for metallic pipes and tanks', 'Impressed current or sacrificial anodes, AWWA C105/M27'],
                                ['Leak Detection', 'Acoustic loggers, AMI night flow analysis, correlating sensors', '50+ loggers, 0.3 lps minimum detection threshold'],
                                ['Flushing Program', 'Unidirectional flushing to maintain water quality', 'Per AWWA M28, target ≥5 fps velocity, semi-annual'],
                                ['Emergency Power', 'Diesel generators at booster stations', '3 × 250 kW, NFPA 110 Type 10, 48-hr fuel storage'],
                                ['Physical Security', 'Fencing, CCTV, tamper-proof locks on vaults/hatches', 'AWIA §2013, intrusion detection at tanks/boosters'],
                                ['Surge Protection', 'Air/vacuum valves, surge tanks, slow-closing check valves', 'AWWA M51, transient analysis via surge modeling'],
                                ['GIS / Asset Management', 'Spatial database of all buried assets with condition scores', 'Esri ArcGIS / QGIS, per AWWA M56'],
                                ['Water Hammer Analysis', 'Transient modeling for pump trip and valve closure events', 'Bentley HAMMER or AFT Impulse, design validation'],
                            ].map(([system, desc, spec]) => (
                                <tr key={system} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#0EA5E9] font-medium whitespace-nowrap">{system}</td>
                                    <td className="px-3 py-2 text-gray-400">{desc}</td>
                                    <td className="px-3 py-2 text-gray-400">{spec}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* 8. Non-Revenue Water */}
            <Section title="8. Non-Revenue Water &amp; Loss Control" id="nrw">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Loss Category</th>
                                <th className="text-left px-3 py-2 font-medium">Description</th>
                                <th className="text-left px-3 py-2 font-medium">Detection / Mitigation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Real Losses — Leakage', 'Background leaks, main breaks, service line leaks, tank overflows', 'Acoustic loggers, AMI night flow, DMA pressure management'],
                                ['Real Losses — Breaks', 'Catastrophic pipe failures from age, corrosion, or ground movement', 'Break frequency analysis, pipe condition assessment, renewal planning'],
                                ['Apparent Losses — Metering', 'Under-registration of meters due to age or fouling', 'AMI accuracy monitoring, meter replacement program (15-yr cycle)'],
                                ['Apparent Losses — Unauthorized', 'Illegal connections, tampering, fire hydrant misuse', 'GIS audit, tamper alarms on AMI meters, field investigation'],
                                ['Unbilled Authorized', 'Firefighting, flushing, mains testing, public fountains', 'Hydrant meters, flow estimation from flushing records'],
                            ].map(([cat, desc, method]) => (
                                <tr key={cat} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#0EA5E9] font-medium whitespace-nowrap">{cat}</td>
                                    <td className="px-3 py-2 text-gray-400">{desc}</td>
                                    <td className="px-3 py-2 text-gray-400">{method}</td>
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
                    <pre className="whitespace-pre leading-relaxed">{`TIER 1 — FIELD (~50,500 points)
├── AMI Smart Meters (50,000)    → RF mesh    → Collectors   @ 15-min reads
├── WQ Monitor Panels (8)        → 4-20 mA   → RTU          @ 5-min
├── Tank Level Sensors (6)       → 4-20 mA   → RTU          @ 1-min
├── Booster Pump Status (9)      → Discrete   → PLC          @ 1-sec
├── PRV Position Sensors (6)     → 4-20 mA   → RTU          @ 1-min
├── Pressure Sensors (25)        → 4-20 mA   → RTU          @ 1-min
└── Acoustic Loggers (50)        → Cellular   → Cloud        @ nightly

TIER 2 — DIST. SCADA + AMI HEAD-END (central control)
├── Distribution SCADA           → DNP3/TCP   → Operator      @ 2-sec poll
├── AMI Head-End                 → REST       → MDM           @ 15-min batch
├── Alarm management             → DNP3       → Operator      @ event
├── Trend/historian              → OPC-HDA    → 1-min archive
└── Hydraulic model feed         → OPC UA     → EPANET        @ hourly

TIER 3 — ENTERPRISE (via DMZ)
├── CIS / Billing                → ODBC       → Monthly       revenue
├── CMMS (work orders)           → REST       → On-demand     maintenance
├── GIS (asset maps)             → WFS/WMS    → On-demand     spatial
├── Leak Analytics (ML)          → MQTT       → Daily         diagnostics
├── CCR (consumer report)        → Report     → Annual        regulatory
└── AMI Customer Portal          → HTTPS      → Real-time     self-service`}</pre>
                </div>
            </Section>

            {/* 10. References */}
            <Section title="10. References" id="references">
                <div className="space-y-2 text-xs text-gray-400 leading-relaxed">
                    <p>American Water Works Association. (2012). <em>M31: Distribution System Requirements for Fire Protection</em> (4th ed.). AWWA.</p>
                    <p>American Water Works Association. (2016). <em>M36: Water Audits and Loss Control Programs</em> (4th ed.). AWWA.</p>
                    <p>American Water Works Association. (2014). <em>M22: Sizing Water Service Lines and Meters</em> (3rd ed.). AWWA.</p>
                    <p>American Water Works Association. (2017). <em>M32: Computer Modeling of Water Distribution Systems</em> (4th ed.). AWWA.</p>
                    <p>National Fire Protection Association. (2019). <em>NFPA 24: Standard for the Installation of Private Fire Service Mains</em>. NFPA.</p>
                    <p>National Institute of Standards and Technology. (2023). <em>SP 800-82 Rev. 3: Guide to OT Security</em>. NIST.</p>
                    <p>Rossman, L. A. (2000). <em>EPANET 2 Users Manual</em>. EPA/600/R-00/057. U.S. EPA.</p>
                    <p>U.S. Environmental Protection Agency. (2024). <em>Revised Total Coliform Rule (RTCR) Guidance</em>. EPA.</p>
                </div>
            </Section>

            {/* See Also */}
            <Section title="See Also" id="see-also">
                <div className="flex flex-wrap gap-2">
                    {[
                        { href: '/wiki/water', label: 'Water Sector Hub', color: '#06B6D4' },
                        { href: '/wiki/water/treatment-plants', label: 'Treatment Plants', color: '#06B6D4' },
                        { href: '/wiki/water/pump-stations', label: 'Pump Stations', color: '#8B5CF6' },
                        { href: '/wiki/water/collection-systems', label: 'Collection Systems', color: '#F97316' },
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
