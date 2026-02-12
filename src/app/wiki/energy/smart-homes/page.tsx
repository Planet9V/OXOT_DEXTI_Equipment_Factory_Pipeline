/**
 * Smart Homes — Deep Dive Wiki Article.
 *
 * Comprehensive TOGAF-based reference architecture for smart homes with
 * the smart meter as central network hub, covering HEMS, TOU optimization,
 * V2H/V2G bidirectional charging, and demand response orchestration.
 *
 * @module wiki/energy/smart-homes/page
 */

export const metadata = {
    title: 'Smart Homes (Behind-the-Meter) — Energy Wiki',
    description:
        'TOGAF reference architecture for smart homes: smart meter hub, HEMS, ' +
        'TOU optimization, V2H/V2G, demand response, and HAN protocols.',
};

export default function SmartHomesPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]" style={{ background: '#06B6D4' }} />
                    <span className="text-xs font-mono text-gray-500">ENERGY · DISTRIBUTED · SMART HOMES</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">Smart Homes</h1>
                <p className="text-sm text-gray-500 font-mono">Behind-the-Meter · Smart Meter as Hub</p>
                <p className="text-gray-400 text-base leading-relaxed max-w-3xl">
                    The modern smart home represents the smallest, most numerous node in the energy grid
                    architecture — yet collectively, residential prosumers constitute the single largest
                    flexible resource in the power system. This reference architecture positions the{' '}
                    <span className="text-[#FF6B00] font-medium">smart meter as the network hub</span>,
                    bridging utility AMI infrastructure (Purdue Level 3/4) to the residential Home Area
                    Network (Purdue Level 1/2), while the Home Energy Management System (HEMS) orchestrates
                    behind-the-meter DERs for net metering, demand response (DR), time-of-use (TOU)
                    optimization, and backup power (Pipattanasomporn et al., 2012).
                </p>
            </div>

            <Section title="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-300 leading-relaxed">
                    The smart home business architecture enables behind-the-meter DER integration
                    (solar PV, batteries, EV chargers) via the smart meter as a network hub, providing
                    real-time Home Energy Management System (HEMS) control. Core value propositions
                    include 20–40% energy cost reduction through TOU arbitrage, 100% renewable
                    self-consumption during peak solar hours, grid services export via VPP aggregation,
                    and resilience through battery/EV backup power during outages.
                </p>

                <h3 className="text-sm font-semibold text-white mt-6 mb-2">Stakeholders</h3>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside">
                    <li>Homeowners — energy savings, comfort, resilience, sustainability</li>
                    <li>Utilities — load balancing, DR participation, 15-minute interval AMI data</li>
                    <li>Regulators — compliance reporting, grid stability, consumer protection</li>
                    <li>DER vendors — interoperable device integration (solar, battery, EVSE)</li>
                    <li>Third-party HEMS providers — cloud analytics, app control, VPP aggregation</li>
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
                                ['IEEE 2030.5 (SEP 2.0)', 'Smart Energy Profile for HAN-WAN interoperability, DER control signals'],
                                ['OpenADR 2.0b', 'DR event signaling from utility to HEMS via EiReport/EiEvent'],
                                ['Matter / Thread', 'IP-based IoT standard for secure, low-power device commissioning'],
                                ['NEC 2023', '690.12 rapid shutdown, arc-fault detection for PV systems'],
                                ['UL 1741', 'Inverter safety and grid-support functions (ride-through, anti-islanding)'],
                                ['DLMS/COSEM', 'AMI metrology protocol — OBIS codes for billing interval data'],
                                ['OCPP 2.0.1', 'EV charger communication — authorization, scheduling, V2G'],
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

            <Section title="2. High-Level Design" id="high-level-design">
                <p className="text-sm text-gray-300 leading-relaxed">
                    The smart meter serves as the central network gateway, bridging utility AMI
                    infrastructure (WAN) to the residential Home Area Network (HAN). The HEMS
                    orchestrates all behind-the-meter DERs and controllable loads via an edge/cloud
                    hybrid architecture.
                </p>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`Utility EMS/MDMS ──(IEEE 2030.5 / OpenADR)──► Smart Meter (AMI Hub)
                                                         │
                  ┌──────────────────────────────────────┤
                  │                                      │
    ┌─────────────┤     HOME AREA NETWORK (HAN)         │
    │             │                                      │
    ▼             ▼              ▼             ▼         ▼
Solar PV    Home Battery    Smart HVAC    EV Charger   Load Control
+ Inverter    13.5kWh       Thermostat      (EVSE)      Relays
(Zigbee)   (Modbus TCP)  (Matter/Thread)   (OCPP)     (Zigbee)

                        │
                        ▼
                HEMS Edge Gateway ──► Cloud HEMS Platform
                    (analytics, ML, app control)`}</pre>
                </div>
            </Section>

            <Section title="3. Detailed Technical Description" id="technical">
                <h3 className="text-base font-semibold text-white mt-2 mb-2">3.1 Smart Meter (AMI Endpoint)</h3>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside">
                    <li>ANSI C12.20 Class 0.5 accuracy revenue metering</li>
                    <li>Bidirectional metrology — import/export kWh, kVAR, kVA demand</li>
                    <li>Remote disconnect switch (100A, utility-controlled)</li>
                    <li>HAN radio: Zigbee SEP 2.0 (915 MHz), 50+ node mesh support</li>
                    <li>Production/consumption CT inputs (3000:1 ratio split-core CTs)</li>
                    <li>15-minute interval recording, on-demand reads, outage notification</li>
                </ul>

                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.2 Rooftop Solar PV System</h3>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside">
                    <li><span className="text-white">Array:</span> 5–10 kW, 400 W monocrystalline PERC panels (20–25 panels)</li>
                    <li><span className="text-white">Inverters:</span> Microinverters (300 VA/module, MLPE) or string inverter (7.6 kW with power optimizers)</li>
                    <li><span className="text-white">Safety:</span> Rapid shutdown per NEC 690.12 — module-level shutdown within 30 seconds</li>
                    <li><span className="text-white">Monitoring:</span> Module-level MPPT, per-panel production monitoring via cloud portal</li>
                </ul>

                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.3 Home Battery System</h3>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside">
                    <li><span className="text-white">Capacity:</span> 10–15 kWh lithium-iron-phosphate (LFP)</li>
                    <li><span className="text-white">Coupling:</span> AC/DC coupled via hybrid inverter</li>
                    <li><span className="text-white">Output:</span> 11.5 kW continuous, 22 kW peak (10 seconds)</li>
                    <li><span className="text-white">VPP ready:</span> IEEE 2030.5 interface for grid services export</li>
                    <li><span className="text-white">Lifecycle:</span> 6,000+ cycles at 80% DOD, 10-year warranty</li>
                </ul>

                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.4 EV Charger (Level 2 EVSE)</h3>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside">
                    <li><span className="text-white">Power:</span> 7.2–11.5 kW (32–48 A, 240 V single-phase)</li>
                    <li><span className="text-white">Protocol:</span> OCPP 2.0.1 for smart charging, scheduling, load management</li>
                    <li><span className="text-white">V2H/V2G:</span> Bidirectional capable (11.5 kW discharge to home or grid)</li>
                    <li><span className="text-white">Authentication:</span> RFID, mobile app, ISO 15118 plug-and-charge</li>
                </ul>

                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.5 Smart Thermostat &amp; Controllable Loads</h3>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside">
                    <li><span className="text-white">Smart thermostat:</span> Zigbee/Wi-Fi, 1–2 kW HVAC control, geofencing, occupancy sensing</li>
                    <li><span className="text-white">Smart appliances:</span> Zigbee-enabled washer/dryer (delay start), induction cooktop (load shedding)</li>
                    <li><span className="text-white">Load control switches:</span> Zigbee relays (40–100 A) on HVAC compressor, water heater (4–6 kW), pool pump</li>
                </ul>
            </Section>

            <Section title="4. Process Diagrams" id="process-diagrams">
                <h3 className="text-sm font-semibold text-white mb-2">4.1 Energy Flow Paths</h3>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`Path 1: Grid Import
  Utility Grid → Smart Meter → Main Panel (200A) → Home Loads

Path 2: Solar Self-Consumption
  PV Panels → Microinverters → Production CT → Home Loads

Path 3: Solar → Battery → Home
  PV → Hybrid Inverter → Battery (charge) → Inverter → Loads

Path 4: Solar → Grid Export
  Excess PV → Smart Meter (net meter) → Grid (backfeed breaker)

Path 5: EV Charging
  Grid/Solar → EVSE → Vehicle Battery

Path 6: V2H/V2G (Bidirectional)
  Vehicle Battery → EVSE → Hybrid Inverter → Home / Grid

Priority: Solar self-use > Battery charge > Loads > Grid export`}</pre>
                </div>

                <h3 className="text-sm font-semibold text-white mt-8 mb-2">4.2 TOU Optimization Logic</h3>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`Forecast TOU Rates → ML Model (Cloud HEMS) → Daily Schedule:

OFF-PEAK (11 PM – 6 AM):
  Grid → Battery charge (to 100% SOC)
  Grid → EV charge (to 80% SOC)

SHOULDER (6 AM – 4 PM):
  Solar → Home loads (self-consume)
  Solar excess → Battery charge
  Solar excess → Grid export (net metering credit)

PEAK (4 PM – 9 PM):
  Battery → Home loads (discharge to 20% SOC)
  Defer non-essential appliances (washer, dryer, dishwasher)
  EV V2H if available (discharge to 50% SOC)

SUPER OFF-PEAK (Weekend):
  Maximize grid export of excess solar generation`}</pre>
                </div>

                <h3 className="text-sm font-semibold text-white mt-8 mb-2">4.3 Demand Response Event Sequence</h3>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`1. Utility EMS → OpenADR 2.0b → Cloud HEMS: DR Signal (Shed 5kW, 2hrs)
2. Cloud HEMS → Optimize: Pre-cool HVAC 2°C, shift washer/dryer
3. Cloud HEMS → Smart Meter: IEEE 2030.5 DER control commands
4. Smart Meter → HAN Devices: Zigbee broadcast (shed/shift)
   - HVAC thermostat: setpoint +2°C (saves ~1.5kW)
   - Water heater relay: OFF (saves ~4.5kW)
   - EV charger: pause session (saves ~7.2kW)
   - Battery: discharge to home (provides ~5kW)
5. HAN Devices → Smart Meter: Acknowledge
6. Smart Meter → Cloud HEMS: Telemetry confirmation (15-min intervals)
7. Cloud HEMS → Utility EMS: DR compliance verification
8. Event ends → Restore normal setpoints and schedules`}</pre>
                </div>
            </Section>

            <Section title="5. Bill of Materials" id="bom">
                <p className="text-sm text-gray-400 mb-3 italic">
                    Complete behind-the-meter system for a 3,000 sq ft home.
                </p>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Component</th>
                                <th className="text-left px-3 py-2 font-medium">Specification</th>
                                <th className="text-right px-3 py-2 font-medium">Qty</th>
                                <th className="text-left px-3 py-2 font-medium">Key Features</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Smart Meter', 'Bidirectional AMI, net metering', '1', 'ANSI C12.20, Zigbee SEP 2.0, disconnect, CT inputs'],
                                ['PV Panels', '400 W monocrystalline PERC', '20 (8 kW)', 'Roof-mount, 25 yr warranty, 21.5% efficiency'],
                                ['Microinverters', '300 VA per module, MLPE', '20', 'UL 1741 SB, rapid shutdown, 97.5% CEC'],
                                ['Home Battery', '13.5 kWh LFP', '1–2', '11.5 kW continuous, VPP ready, 90% RTE'],
                                ['Hybrid Inverter', '10 kW, AC/DC coupled', '1', 'IEEE 2030.5, 4-quadrant, grid-forming'],
                                ['EV Charger (EVSE)', 'Level 2, 48 A', '1', 'OCPP 2.0.1, V2G optional, NEMA 6-50'],
                                ['Main Panel', '200 A, backfed PV breaker (40 A)', '1', 'NEC compliant, AFCI/GFCI breakers'],
                                ['Production CT', '3000:5 A split-core', '1', 'Revenue-grade accuracy'],
                                ['Consumption CT', '3000:5 A whole-house', '1', 'Net calculation'],
                                ['Smart Thermostat', 'Zigbee/Wi-Fi', '1', 'Geofencing, DR-ready, occupancy'],
                                ['Load Control Relays', '40 A Zigbee, 277 V', '4', 'HVAC, water heater, dryer, pool pump'],
                                ['HAN Gateway', 'Built into smart meter + hub', '1', 'Zigbee 3.0 / Thread / Matter'],
                                ['Transfer Switch', '200 A ATS', '1', 'Battery island mode (grid/battery)'],
                            ].map(([comp, spec, qty, features]) => (
                                <tr key={comp} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-gray-300 font-medium">{comp}</td>
                                    <td className="px-3 py-2 text-gray-400">{spec}</td>
                                    <td className="px-3 py-2 text-right text-emerald-500/80 font-mono">{qty}</td>
                                    <td className="px-3 py-2 text-gray-400">{features}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">Estimated system cost: $25,000–$40,000 (excluding installation labor).</p>
            </Section>

            <Section title="6. Communication Protocols" id="protocols">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Protocol</th>
                                <th className="text-left px-3 py-2 font-medium">Layer</th>
                                <th className="text-left px-3 py-2 font-medium">Function</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['IEEE 2030.5 (SEP 2.0)', 'HAN', 'DER control, metering objects (FileRead, ConnectDisconnect)'],
                                ['OpenADR 2.0b', 'WAN', 'DR curtailment/price signals (EiReport, EiEvent)'],
                                ['DLMS/COSEM', 'AMI', 'Metrology — OBIS codes for billing intervals'],
                                ['Modbus TCP', 'Local', 'Inverter telemetry — registers for power, SOC, temperature'],
                                ['OCPP 2.0.1', 'Local', 'EVSE authorization, scheduling, V2G control'],
                                ['Zigbee SEP 2.0', 'HAN', '900 MHz mesh, 250 kbps, 50+ nodes, AES-128'],
                                ['Matter / Thread', 'HAN', 'IPv6 mesh, BLE commissioning, 100+ devices'],
                                ['MQTT', 'Cloud', 'Telemetry pub/sub to HEMS platform (QoS 1)'],
                            ].map(([protocol, layer, func]) => (
                                <tr key={protocol} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#06B6D4] font-medium whitespace-nowrap">{protocol}</td>
                                    <td className="px-3 py-2 text-gray-300">{layer}</td>
                                    <td className="px-3 py-2 text-gray-400">{func}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="7. Purdue Model Mapping" id="purdue">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Level</th>
                                <th className="text-left px-3 py-2 font-medium">Components</th>
                                <th className="text-left px-3 py-2 font-medium">Function</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Level 0', 'CTs, PV panels, battery cells, EV connector, temperature sensors', 'Process measurement'],
                                ['Level 1', 'HAN devices (Zigbee/Matter), inverter controls, BMS', 'Basic control'],
                                ['Level 2', 'Smart meter HAN radio, local HEMS gateway', 'Supervisory control'],
                                ['Level 3', 'Cloud HEMS platform, utility AMI head-end', 'Operations / MES'],
                                ['Level 4', 'Utility EMS, billing systems, DR platform, VPP aggregator', 'Enterprise'],
                            ].map(([level, components, func]) => (
                                <tr key={level} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#06B6D4] font-medium whitespace-nowrap">{level}</td>
                                    <td className="px-3 py-2 text-gray-300">{components}</td>
                                    <td className="px-3 py-2 text-gray-400">{func}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="8. Safety &amp; Supporting Systems" id="safety">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">System</th>
                                <th className="text-left px-3 py-2 font-medium">Specification</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Rapid Shutdown', 'NEC 690.12 module-level shutdown, initiator at meter/inverter, <30s to <80V'],
                                ['Arc-Fault Detection', 'Inverter-integrated AFCI Type 1, series arc detection per UL 1699B'],
                                ['Grounding', 'NEC 250, TT system, PV ground rods, equipment grounding conductor'],
                                ['Transfer Switch', '200 A ATS for battery island/microgrid mode, <100 ms transfer'],
                                ['Ground Fault', 'Automatic PV/EV shutdown on ground fault detection, 5 mA threshold'],
                                ['Surge Protection', 'Type 2 SPD at main panel, Type 1 at service entrance'],
                            ].map(([system, spec]) => (
                                <tr key={system} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-gray-300 font-medium whitespace-nowrap">{system}</td>
                                    <td className="px-3 py-2 text-gray-400">{spec}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="References" id="references">
                <div className="space-y-2 text-xs text-gray-400 leading-relaxed">
                    <p>Pipattanasomporn, M., Kuzlu, M., &amp; Rahman, S. (2012). An algorithm for intelligent home energy management and demand response analysis. <em>IEEE Transactions on Smart Grid</em>, 3(4), 2166–2173.</p>
                    <p>IEEE. (2018). <em>IEEE Std 2030.5: Smart Energy Profile 2.0</em>. IEEE.</p>
                    <p>OpenADR Alliance. (2013). <em>OpenADR 2.0b profile specification</em>. OpenADR Alliance.</p>
                    <p>National Electrical Code. (2023). <em>NFPA 70: National Electrical Code</em>. National Fire Protection Association.</p>
                </div>
            </Section>

            <Section title="See Also" id="see-also">
                <div className="flex flex-wrap gap-2">
                    {[
                        { href: '/wiki/energy', label: 'Energy Sector Hub', color: '#F59E0B' },
                        { href: '/wiki/energy/distribution-points', label: 'Distribution Points', color: '#10B981' },
                        { href: '/wiki/energy/bess', label: 'Battery Energy Storage', color: '#EF4444' },
                        { href: '/wiki/energy/vpp-derms', label: 'VPP / DERMS', color: '#EC4899' },
                        { href: '/wiki/energy/microgrids', label: 'Microgrids', color: '#8B5CF6' },
                        { href: '/wiki/sectors/ENER', label: 'Energy Sector Overview', color: '#F59E0B' },
                    ].map((link) => (
                        <a key={link.href} href={link.href} className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-white/[0.04]" style={{ borderColor: `${link.color}30`, color: link.color }}>
                            {link.label} →
                        </a>
                    ))}
                </div>
            </Section>
        </div>
    );
}

function Section({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
    return (
        <section id={id} className="space-y-4">
            <h2 className="text-xl font-heading font-semibold text-white">{title}</h2>
            {children}
        </section>
    );
}
