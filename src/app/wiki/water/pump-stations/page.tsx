/**
 * Pump Stations — Deep-Dive Wiki Article.
 *
 * Comprehensive TOGAF-based reference architecture for water and wastewater
 * pump stations including wet-well/dry-well configurations, VFD control,
 * surge protection, and SCADA telemetry.
 *
 * @module wiki/water/pump-stations/page
 */

export const metadata = {
    title: 'Pump Stations — Water Sector Wiki',
    description:
        'TOGAF reference architecture for water/wastewater pump stations: wet-well/dry-well, ' +
        'submersible/vertical turbine pumps, VFDs, surge protection, and SCADA telemetry.',
};

export default function PumpStationsPage() {
    return (
        <div className="max-w-5xl space-y-10">
            {/* Header */}
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <div
                        className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]"
                        style={{ background: '#8B5CF6' }}
                    />
                    <span className="text-xs font-mono text-gray-500">
                        WATR · PUMP STATIONS
                    </span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">
                    Pump Stations
                </h1>
                <p className="text-sm text-gray-400 leading-relaxed max-w-3xl">
                    Pump stations are the critical mechanical hearts of water and wastewater
                    conveyance systems — boosting potable water to higher-elevation pressure zones
                    and lifting wastewater from gravity sewers to treatment plants via force mains.
                    This article covers a reference 20 MGD wastewater lift station with wet-well/dry-well
                    configuration, scaled from Hydraulic Institute (HI) standards and the Ontario/EPA
                    design guidelines for sewage pumping stations.
                </p>
            </div>

            {/* 1. TOGAF Business Architecture */}
            <Section title="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-300 leading-relaxed">
                    Pump stations serve as the interface between gravity infrastructure and pressurized
                    conveyance. Their failure can cause sanitary sewer overflows (SSOs) — an EPA
                    enforcement priority — making reliability the primary design driver.
                </p>
                <h4 className="text-xs font-semibold text-white mt-4 mb-2">Key Stakeholders</h4>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li><span className="text-[#8B5CF6] font-medium">Water/Wastewater Utility</span> — Owner-operator managing 24/7 unmanned stations via SCADA</li>
                    <li><span className="text-[#8B5CF6] font-medium">EPA</span> — SSO reporting requirements, consent decree compliance for collection systems</li>
                    <li><span className="text-[#8B5CF6] font-medium">State DEQ</span> — Construction permits, operating permits, capacity evaluations</li>
                    <li><span className="text-[#8B5CF6] font-medium">Hydraulic Institute</span> — ANSI/HI pump selection, testing, and installation standards</li>
                    <li><span className="text-[#8B5CF6] font-medium">OSHA</span> — Confined space programs (29 CFR 1910.146) for wet-well entry</li>
                    <li><span className="text-[#8B5CF6] font-medium">Electrical Utility</span> — Power supply, rate tariffs, demand management</li>
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
                                ['ANSI/HI Standards', 'Pump nomenclature, testing, vibration limits, intake/wet-well design (HI 9.8)'],
                                ['10 States Standards', 'Firm capacity with largest pump OOS, detention time, alarm requirements'],
                                ['OSHA 29 CFR 1910.146', 'Permit-required confined space entry procedures for wet wells'],
                                ['EPA SSO Regulations', 'Prohibition of unpermitted SSOs, reporting within 24 hours'],
                                ['NFPA 70 / 70E', 'Electrical installation (NEC) and arc flash safety'],
                                ['NFPA 820', 'Fire protection classification for wastewater pump stations'],
                                ['IEEE 841 / 1580', 'Motor standards for severe-duty applications'],
                                ['AWWA M11', 'Steel pipe and fittings for force main design'],
                            ].map(([std, scope]) => (
                                <tr key={std} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#8B5CF6] font-medium whitespace-nowrap">{std}</td>
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
                    The reference station uses a{' '}
                    <span className="text-[#8B5CF6] font-medium">dual wet-well / dry-well</span>{' '}
                    configuration (Type IV per Ontario standards) for capacity &gt;500 L/s. Dry-well
                    access via stairway eliminates confined-space classification for routine
                    maintenance. Firm capacity maintains design peak flow with the largest unit
                    out of service (N+1 redundancy).
                </p>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto mt-4"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`GRAVITY SEWER ──► INFLUENT MANHOLE ──► BAR SCREEN ──► WET WELL (Dual)
                                                            │            │
                                                     Level Control    Grinder
                                                            │
                                                            ▼
                                                    DRY WELL (below grade)
                                              ┌──── 4× Submersible/DW Pumps ────┐
                                              │     (2000 HP each, VFD)          │
                                              │                                  │
                                              ▼                                  ▼
                                         CHECK VALVE                      CHECK VALVE
                                              │                                  │
                                              ▼                                  ▼
                                    DISCHARGE HEADER ──► FORCE MAIN (36" HDPE)
                                              │
                                         Surge Tank ──► Air/Vacuum Valves
                                              │
                                              ▼
                                    WWTP (20 miles downstream)

 ┌─────────────────────────────────────────────────────────────────────┐
 │  CAPACITY: 20 MGD (87 ML/d) peak hourly flow                      │
 │  PUMPS: 4 × 2,000 HP (3 duty + 1 standby) = N+1 redundancy       │
 │  FORCE MAIN: 36" HDPE, 3-8 fps velocity range                     │
 │  POWER: Dual utility feed + 3,000 kW emergency diesel generator   │
 └─────────────────────────────────────────────────────────────────────┘`}</pre>
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">
                    Figure 1. Type IV wet-well/dry-well pump station with 4 × 2,000 HP pumps
                    and 36″ HDPE force main.
                </p>
            </Section>

            {/* 3. Detailed Technical Description */}
            <Section title="3. Detailed Technical Description" id="technical">
                <h3 className="text-sm font-semibold text-white mt-4">3.1 Wet Well Design</h3>
                <p className="text-xs text-gray-400 leading-relaxed mt-1">
                    The wet well stores influent flow and provides the suction source for the pumps.
                    Volume is calculated to limit pump cycling to ≤6 starts/hour while maintaining
                    minimum velocities to prevent solids deposition. Dual wet wells allow one to be
                    dewatered for maintenance while the other remains in service.
                </p>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside mt-2">
                    <li>Wet well volume: 2× 50,000 gal each (10-min detention at average flow)</li>
                    <li>Construction: Reinforced concrete, epoxy-coated interior, 18″ walls</li>
                    <li>Level control: 2× ultrasonic transmitters + 2× pressure transducers (redundant)</li>
                    <li>Float backups: 5-level float system (low-low, low, lead, lag, high-high alarm)</li>
                    <li>Ventilation: 12 ACH continuous, 30 ACH during entry, H₂S carbon scrubber</li>
                    <li>Access: 36″ access hatches with safety grating, fall-arrest anchors</li>
                </ul>

                <h3 className="text-sm font-semibold text-white mt-6">3.2 Pumping Equipment</h3>
                <p className="text-xs text-gray-400 leading-relaxed mt-1">
                    Centrifugal pumps are selected at the best efficiency point (BEP) for the design
                    condition. Specific speed (Nₛ) determines impeller type: radial for high-head
                    applications, mixed-flow for moderate head, axial for high-flow/low-head. VFDs
                    enable continuous speed adjustment to match variable influent flows.
                </p>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside mt-2">
                    <li>Pumps: 4× dry-pit submersible, non-clog impeller (3-vane, 4″ solids passage)</li>
                    <li>Motor: 2,000 HP each, 4,160V, 1,185 RPM, IE3 premium efficiency</li>
                    <li>TDH: 120 ft (52 psi) including friction + static lift + minor losses</li>
                    <li>Flow per pump: 5 MGD at BEP, 6.7 MGD at maximum speed</li>
                    <li>NPSHr: &lt;10 ft (sufficient margin above wet-well minimum level)</li>
                    <li>VFDs: 4× medium-voltage drives, 4,160V, AFE (active front end) for regen</li>
                    <li>Vibration monitoring: accelerometers on each bearing housing, alarm at 0.2 in/s</li>
                </ul>

                <h3 className="text-sm font-semibold text-white mt-6">3.3 Electrical Systems</h3>
                <p className="text-xs text-gray-400 leading-relaxed mt-1">
                    Pump stations require high-reliability power with automatic transfer to backup
                    generation. Medium-voltage (4,160V) distribution minimizes cable sizing for
                    large motors. Arc flash analysis per NFPA 70E determines PPE categories.
                </p>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside mt-2">
                    <li>Main switchgear: 4,160V metal-clad, drawout breakers, 40 kA AIC rating</li>
                    <li>MCC: 480V for auxiliary loads (lighting, HVAC, instrumentation, sump pumps)</li>
                    <li>Emergency generator: 3,000 kW diesel, 4,160V, auto-start/ATS, 10-sec transfer</li>
                    <li>Fuel storage: 10,000 gal diesel day tank + 48-hr supply at full load</li>
                    <li>UPS: 30 kVA for SCADA/PLC/instrumentation, 30-min battery backup</li>
                    <li>Arc flash: labeled per NFPA 70E, PPE Category 2–4 at MV switchgear</li>
                </ul>

                <h3 className="text-sm font-semibold text-white mt-6">3.4 Force Main &amp; Surge Protection</h3>
                <p className="text-xs text-gray-400 leading-relaxed mt-1">
                    The force main conveys pumped flow under pressure to the WWTP or next gravity
                    manhole. Surge protection prevents water hammer from pump trips and valve closures
                    that can generate transient pressures 2–4× operating pressure.
                </p>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside mt-2">
                    <li>Force main: 36″ HDPE DR11 (200 psi), butt-fused joints, 20 miles length</li>
                    <li>Velocity: 3–8 fps operating range (min for solids transport, max for headloss)</li>
                    <li>Check valves: 4× tilting-disc with dashpot (slow-closing, 30–60 sec)</li>
                    <li>Surge tank: 500-gal bladder type, pre-charged to 40 psi</li>
                    <li>Air/vacuum valves: 12× combination (AWWA C512) at high points every 2,000 ft</li>
                    <li>Surge analysis: transient model (Bentley HAMMER) validated at commissioning</li>
                </ul>

                <h3 className="text-sm font-semibold text-white mt-6">3.5 SCADA &amp; Controls</h3>
                <p className="text-xs text-gray-400 leading-relaxed mt-1">
                    Unmanned pump stations rely on PLC-based control with remote SCADA monitoring.
                    Pump sequencing, lead/lag rotation, and VFD speed control are automatic; operators
                    intervene via cellular SCADA for alarm response and setpoint changes.
                </p>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside mt-2">
                    <li>PLC: Redundant hot-standby (Allen-Bradley ControlLogix), ~200 I/O points</li>
                    <li>Local HMI: 15″ touchscreen panelview, UPS-backed</li>
                    <li>RTU telemetry: Cellular (LTE) primary, 900 MHz radio backup, DNP3 protocol</li>
                    <li>Alarm management: 30+ critical alarms, auto-dialer + SCADA notification</li>
                    <li>Pump sequencing: lead/lag rotation (runtime equalization), VFD speed cascade</li>
                    <li>Data logging: 1-sec scan, 1-min historian archive, 90-day local retention</li>
                </ul>
            </Section>

            {/* 4. Process Diagrams */}
            <Section title="4. Process Diagrams" id="process-diagrams">
                <h3 className="text-sm font-semibold text-white">4.1 Pumping Process Flow</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto mt-2"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`INFLUENT ──► BAR SCREEN ──► WET WELL A ──► PUMP 1 (VFD) ──► CHECK ──┐
GRAVITY           │                                                    │
SEWER             │         WET WELL B ──► PUMP 2 (VFD) ──► CHECK ──┤
                  │              │                                     │
                  │              ├──► PUMP 3 (VFD) ──► CHECK ──────┤
                  │              │                                     │
                  │              └──► PUMP 4 (Standby) ──► CHECK ──┤
                  │                                                    │
                  ▼                                                    ▼
             SCREENINGS                                        DISCHARGE HEADER
             DUMPSTER                                               │
                                                              SURGE TANK
                                                                    │
                                                              FORCE MAIN (36")
                                                                    │
                                                               AIR VALVES
                                                                    │
                                                              WWTP / GRAVITY`}</pre>
                </div>

                <h3 className="text-sm font-semibold text-white mt-6">4.2 Pump Speed Control Logic</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto mt-2"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`WET WELL LEVEL ──► PLC CONTROL ALGORITHM
                        │
           ┌────────────┼────────────────────────┐
           │            │                        │
    Level < LOW     Level NORMAL          Level > HIGH
    (< 30%)        (30-70%)              (> 70%)
           │            │                        │
    Lag pump OFF    Lead pump ON          Lag pump START
    Speed ↓ to min  VFD speed = f(level)  Both at higher speed
           │            │                        │
           ▼            ▼                        ▼
    LOW-LOW ALARM   Steady-state            HIGH-HIGH ALARM
    (< 10%)         operation               (> 90%)
    All pumps OFF   Runtime equalization    SSO prevention mode
    (protect from   (rotate lead/lag        (all pumps at max,
     dry-run)       every 24 hrs)           emergency bypass)`}</pre>
                </div>

                <h3 className="text-sm font-semibold text-white mt-6">4.3 Data &amp; SCADA Flow</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto mt-2"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`┌─────── FIELD INSTRUMENTS (L0) ──────┐
│ Levels (4) │ Flows (2) │ Pressure  │  ~200 I/O
│ Vibration (4) │ Power (4) │ H₂S    │
└──────────────┬─────────────────────┘
               │ 4-20 mA / Modbus RTU
┌──────────────▼─────────────────────┐
│   PLC + LOCAL HMI (L1/L2)          │
│   Pump sequencing, VFD control     │
│   Alarm management                 │
└──────────────┬─────────────────────┘
               │ DNP3 / Cellular LTE
┌──────────────▼─────────────────────┐
│   CENTRAL SCADA (L3)               │
│   Historian │ Trend display        │
│   Energy optimization              │
└──────────────┬─────────────────────┘
               │ via DMZ (L3.5)
┌──────────────▼─────────────────────┐
│   ENTERPRISE (L4)                   │
│   CMMS │ Energy billing │ SSO rpt  │
└────────────────────────────────────┘`}</pre>
                </div>
            </Section>

            {/* 5. Bill of Materials */}
            <Section title="5. Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2 italic">
                    Scaled for a 20 MGD (87 ML/d) Type IV wastewater pump station with VFD control.
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
                                ['Dry-Pit Submersible Pump', 'Non-clog, 3-vane impeller, 4″ passage', '4', '2,000 HP, 5 MGD each, TDH 120 ft'],
                                ['Medium-Voltage VFD', 'AFE, 4,160V, water-cooled', '4', '2,000 HP, 6-pulse/18-pulse'],
                                ['MV Switchgear', 'Metal-clad, drawout, 40 kA', '1', '4,160V, 5 breaker lineup'],
                                ['LV Motor Control Center', '480V, combination starters', '1', '30 bucket lineup'],
                                ['Emergency Generator', 'Diesel, auto-start, ATS', '1', '3,000 kW, 4,160V'],
                                ['Fuel Storage Tank', 'Double-wall steel, UL 2085', '1', '10,000 gal, 48-hr supply'],
                                ['UPS System', 'Online double-conversion', '1', '30 kVA, 30-min runtime'],
                                ['Wet Well Structure', 'Reinforced concrete, epoxy-lined', '2', '50,000 gal each'],
                                ['Bar Screen', 'Mechanically cleaned, 3/4″ spacing', '2', '10 ft wide, 5 HP'],
                                ['Ultrasonic Level Transmitter', 'Non-contact, 4–20 mA/HART', '4', '0–30 ft range, ±0.1%'],
                                ['Pressure Level Transmitter', 'Submersible, 316SS diaphragm', '4', '0–15 psig, ±0.25%'],
                                ['Magnetic Flow Meter', 'Flanged, polyurethane liner', '2', '36″, ±0.5% accuracy'],
                                ['Vibration Sensor', 'Piezoelectric accelerometer', '8', '0–2 in/s pk, 10–1,000 Hz'],
                                ['Power Monitor', 'Multi-function, Modbus RTU', '4', 'kW, kWh, PF, THD per pump'],
                                ['H₂S Gas Detector', 'Electrochemical, 0–100 ppm', '4', 'Alarm 10 ppm, STEL 15 ppm'],
                                ['LEL Gas Detector', 'Catalytic bead, 0–100% LEL', '2', 'Alarm 10% LEL (methane)'],
                                ['Check Valve', 'Tilting disc, slow-closing dashpot', '4', '24″, 30–60 sec close time'],
                                ['Gate Valve', 'Resilient-seated, AWWA C509', '8', '24–36″, isolation'],
                                ['Surge Tank', 'Bladder type, pre-charged', '1', '500 gal, 40 psi pre-charge'],
                                ['Air/Vacuum Valve', 'Combination, AWWA C512', '12', '4″, along force main'],
                                ['Force Main', 'HDPE DR11, butt-fused', '20 mi', '36″, 200 psi WP'],
                                ['PLC System', 'Redundant hot-standby', '1', '~200 I/O, Ethernet/IP'],
                                ['RTU/Cellular Modem', 'LTE + 900 MHz radio backup', '1', 'DNP3, IP-based'],
                                ['HVAC', 'Split system + exhaust fans', '1', 'Dry well: R-410A, 12 ACH'],
                                ['Ventilation/Scrubber', 'H₂S carbon scrubber, wet well', '2', '30 ACH during entry'],
                            ].map(([equip, spec, qty, rating]) => (
                                <tr key={equip} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#8B5CF6] font-medium whitespace-nowrap">{equip}</td>
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
                                ['L0 — Process', 'Pumps, valves, level transmitters, flow meters, gas detectors', '4–20 mA, HART, discrete I/O'],
                                ['L1 — Basic Control', 'PLC (redundant ControlLogix), VFDs, motor starters, MCC', 'Ethernet/IP, Modbus RTU'],
                                ['L2 — Supervisory', 'Local HMI touchscreen, alarm annunciator', 'OPC UA to local historian'],
                                ['L3 — Operations', 'Central SCADA (via RTU), trend/alarm historian, energy monitor', 'DNP3 over cellular/radio'],
                                ['L3.5 — DMZ', 'Firewall, VPN concentrator, AV relay', 'Encrypted DNP3-SA, HTTPS'],
                                ['L4 — Enterprise', 'CMMS work orders, SSO reporting portal, energy billing', 'REST APIs, MQTT, XML'],
                            ].map(([level, components, protocols]) => (
                                <tr key={level} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#8B5CF6] font-mono font-medium whitespace-nowrap">{level}</td>
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
                                ['Emergency Power', 'Diesel generator with ATS', '3,000 kW, 10-sec auto-start, 48-hr fuel'],
                                ['UPS', 'SCADA/PLC battery backup', '30 kVA, 30-min runtime, sealed VRLA'],
                                ['HVAC', 'Dry well air conditioning, wet well exhaust', 'R-410A split, 12 ACH dry / 30 ACH wet'],
                                ['Odor Control', 'H₂S carbon scrubber on wet well exhaust', '2-stage activated carbon, 99% removal'],
                                ['Confined Space Equipment', 'Tripod, winch, harness, 4-gas monitor', 'Per OSHA 1910.146, entry permit system'],
                                ['Fire Protection', 'Clean agent (FM-200) for electrical rooms', 'NFPA 820 classification, NFPA 2001'],
                                ['Physical Security', 'Perimeter fence, CCTV, intrusion alarm', 'Card access, 30-day DVR retention'],
                                ['Emergency Shower/Eyewash', 'Tepid water, ANSI Z358.1', '15-min supply, within 10-sec travel'],
                            ].map(([system, desc, spec]) => (
                                <tr key={system} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#8B5CF6] font-medium whitespace-nowrap">{system}</td>
                                    <td className="px-3 py-2 text-gray-400">{desc}</td>
                                    <td className="px-3 py-2 text-gray-400">{spec}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* 8. Hydraulic Design Parameters */}
            <Section title="8. Hydraulic Design Parameters" id="hydraulic">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Parameter</th>
                                <th className="text-left px-3 py-2 font-medium">Design Value</th>
                                <th className="text-left px-3 py-2 font-medium">Standard / Basis</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Peak Hourly Flow', '20 MGD (13,889 GPM)', '10-yr peak, peaking factor 2.5–3.0'],
                                ['Average Daily Flow', '8 MGD (5,556 GPM)', 'Design year population × per-capita flow'],
                                ['Wet Well Volume', '2 × 50,000 gal', '10-min detention at average flow'],
                                ['Pump Starts/Hour', '≤6 per pump', 'Motor thermal limit, VFD soft start'],
                                ['Force Main Velocity', '3–8 fps', 'Min for solids, max for head loss'],
                                ['Total Dynamic Head', '120 ft (52 psi)', 'Static lift + friction + minor losses'],
                                ['Hazen-Williams C', '140 (HDPE new)', 'Decreasing to 120 after 20 years'],
                                ['Surge Pressure', '1.5× operating (max)', 'Joukowsky equation, dashpot check valve'],
                            ].map(([param, value, basis]) => (
                                <tr key={param} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#8B5CF6] font-medium whitespace-nowrap">{param}</td>
                                    <td className="px-3 py-2 text-gray-400">{value}</td>
                                    <td className="px-3 py-2 text-gray-400">{basis}</td>
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
                    <pre className="whitespace-pre leading-relaxed">{`TIER 1 — FIELD INSTRUMENTS (~200 points)
├── Wet Well Level (4)           → 4-20 mA  → PLC    @ 1 sec
├── Force Main Flow (2)          → 4-20 mA  → PLC    @ 1 sec
├── Discharge Pressure (2)       → 4-20 mA  → PLC    @ 1 sec
├── Pump Status/Speed (4)        → Ethernet  → VFD    @ 100 ms
├── Vibration (8 bearings)       → Modbus    → PLC    @ 1 sec
├── Power Meters (4)             → Modbus    → PLC    @ 5 sec
├── H₂S Detectors (4)           → 4-20 mA  → PLC    @ 5 sec
├── LEL Detectors (2)            → 4-20 mA  → PLC    @ 5 sec
├── MV Switchgear Status (10)    → Discrete  → PLC    @ 100 ms
└── Generator Status (6)         → Modbus    → PLC    @ 1 sec

TIER 2 — LOCAL CONTROL
├── PLC pump sequencing          → VFD speed commands   @ 100 ms
├── Alarm management             → Local HMI + dialer   @ event
├── Local historian              → 1-min archive        @ 90 days
└── Auto-dialer (30 alarms)      → Cellular  → On-call  @ event

TIER 3 — CENTRAL SCADA + ENTERPRISE (via DMZ)
├── Central SCADA display        → DNP3/LTE  → Operator  @ 2 sec
├── Historian (enterprise)       → OPC-HDA   → 1-min     archive
├── CMMS work orders             → REST      → On-demand maint.
├── Energy dashboard             → MQTT      → 15-min    billing
└── SSO reporting                → XML       → 24-hr     regulatory`}</pre>
                </div>
            </Section>

            {/* 10. References */}
            <Section title="10. References" id="references">
                <div className="space-y-2 text-xs text-gray-400 leading-relaxed">
                    <p>Hydraulic Institute. (2023). <em>ANSI/HI 9.8: Rotodynamic Pumps for Pump Intake Design</em>. HI.</p>
                    <p>Karassik, I. J., Messina, J. P., Cooper, P., &amp; Heald, C. C. (2008). <em>Pump Handbook</em> (4th ed.). McGraw-Hill.</p>
                    <p>American Water Works Association. (2017). <em>M11: Steel Pipe — A Guide for Design and Installation</em> (5th ed.). AWWA.</p>
                    <p>Ontario Ministry of Environment. (2008). <em>Design Guidelines for Sewage Works: Sewage Pumping Stations</em>. Queen&apos;s Printer for Ontario.</p>
                    <p>U.S. Environmental Protection Agency. (2004). <em>Guide for Evaluating Capacity, Management, Operation and Maintenance (CMOM) Programs</em>. EPA.</p>
                    <p>National Fire Protection Association. (2020). <em>NFPA 820: Standard for Fire Protection in Wastewater Treatment and Collection Facilities</em>. NFPA.</p>
                    <p>National Fire Protection Association. (2021). <em>NFPA 70E: Standard for Electrical Safety in the Workplace</em>. NFPA.</p>
                    <p>Water Environment Federation. (2010). <em>Design of Water Resource Recovery Facilities</em> (MOP 8, 5th ed.). WEF Press.</p>
                </div>
            </Section>

            {/* See Also */}
            <Section title="See Also" id="see-also">
                <div className="flex flex-wrap gap-2">
                    {[
                        { href: '/wiki/water', label: 'Water Sector Hub', color: '#06B6D4' },
                        { href: '/wiki/water/collection-systems', label: 'Collection Systems', color: '#F97316' },
                        { href: '/wiki/water/wastewater', label: 'Wastewater Treatment', color: '#10B981' },
                        { href: '/wiki/water/distribution', label: 'Distribution Networks', color: '#0EA5E9' },
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
