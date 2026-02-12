/**
 * Transmission Facilities — Deep Dive Wiki Article.
 *
 * Comprehensive TOGAF-based reference architecture for high-voltage
 * transmission substations (230 kV – 765 kV), including breaker-and-a-half
 * bus configurations, protection relay coordination, SCADA/EMS integration,
 * and IEC 61850 process-bus communications.
 *
 * @module wiki/energy/transmission/page
 */

export const metadata = {
    title: 'Transmission Facilities (230–765 kV) — Energy Wiki',
    description:
        'TOGAF reference architecture for HV transmission substations: switchyard design, protection schemes, ' +
        'SCADA integration, bills of materials, and Purdue model mapping.',
};

export default function TransmissionPage() {
    return (
        <div className="max-w-5xl space-y-10">
            {/* Header */}
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div
                        className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]"
                        style={{ background: '#F59E0B' }}
                    />
                    <span className="text-xs font-mono text-gray-500">
                        ENERGY · ELECTRICITY · TRANSMISSION
                    </span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">
                    Transmission Facilities
                </h1>
                <p className="text-sm text-gray-500 font-mono">230 kV – 765 kV · Bulk Electric System</p>
                <p className="text-gray-400 text-base leading-relaxed max-w-3xl">
                    High-voltage transmission substations form the backbone of the bulk electric system (BES),
                    providing reliable power transmission, voltage transformation, reactive power compensation,
                    and wide-area grid stability. These facilities operate under stringent regulatory frameworks
                    including NERC Critical Infrastructure Protection (CIP) standards and are designed for
                    N-1 contingency compliance per NERC Transmission Planning (TPL) standards (NERC, 2024).
                </p>
            </div>

            {/* TOGAF Business Architecture */}
            <Section title="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-300 leading-relaxed">
                    The business architecture for transmission facilities is centered on the reliable,
                    continuous delivery of bulk electric power across the interconnected grid. Transmission
                    substations serve as critical nodes in the grid topology, performing voltage transformation,
                    reactive power management, and protection coordination. The architecture addresses the
                    needs of multiple stakeholders operating within a heavily regulated environment (The
                    Open Group, 2022).
                </p>

                <h3 className="text-sm font-semibold text-white mt-6 mb-2">Stakeholders</h3>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside">
                    <li>Transmission System Operators (TSOs) / Regional Transmission Organizations (RTOs)</li>
                    <li>Independent System Operators (ISOs) — market operations and dispatch</li>
                    <li>Maintenance and protection engineering teams</li>
                    <li>Regulatory bodies — FERC, NERC, state Public Utility Commissions (PUCs)</li>
                    <li>Emergency responders and grid security personnel</li>
                    <li>Equipment manufacturers and EPC contractors</li>
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
                                ['NERC CIP', 'Cybersecurity: CIP-005 electronic security perimeters, CIP-007 system security, CIP-010 configuration management'],
                                ['IEEE C37.2', 'Device function numbers for protection and control equipment'],
                                ['IEEE C37.90', 'Relay performance requirements and testing'],
                                ['IEC 61850', 'Substation automation: process bus (9-2), station bus (8-1), GOOSE, MMS'],
                                ['IEEE C57', 'Power transformer standards — design, testing, and loading'],
                                ['IEC 62351', 'Cybersecurity for power system communications'],
                                ['IEEE C37.118', 'Synchrophasor measurement and data transfer'],
                            ].map(([standard, scope]) => (
                                <tr key={standard} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#F59E0B] font-medium whitespace-nowrap">{standard}</td>
                                    <td className="px-3 py-2 text-gray-400">{scope}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* High-Level Design */}
            <Section title="2. High-Level Design" id="high-level-design">
                <p className="text-sm text-gray-300 leading-relaxed">
                    The high-level design features a{' '}
                    <span className="text-[#F59E0B] font-medium">breaker-and-a-half bus configuration</span>{' '}
                    for 230 kV – 765 kV bays, providing redundancy with three circuit breakers per two
                    lines or transformers. This topology minimizes outages during maintenance or fault
                    conditions — any single breaker can be isolated without de-energizing either circuit.
                    Alternative configurations include double-bus with bus tie breakers for sectionalizing
                    (IEEE, 2020).
                </p>

                <h3 className="text-sm font-semibold text-white mt-6 mb-2">One-Line Diagram</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`765kV Overhead Lines
    │
    ▼
Surge Arresters → CT/PTs → Breaker-and-a-Half Bays
    │
    ▼
Autotransformer (765/345/34.5kV, 500MVA)
    │
    ├── 345kV Ring Bus → Outgoing Lines
    │
    ├── Step-Down Transformer (345/230kV)
    │       │
    │       ▼
    │   230kV Breakers → Capacitor Banks/Reactors
    │
    └── Auxiliary Transformer (34.5kV)
            │
            ▼
        Distribution Feeders / Station Service`}</pre>
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">
                    Figure 1. Simplified one-line diagram of a 765 kV transmission substation with
                    breaker-and-a-half bus configuration and three voltage levels.
                </p>

                <p className="text-sm text-gray-300 leading-relaxed mt-4">
                    <span className="text-white font-medium">Protection zones</span> are established
                    for each major equipment group: line differential (87L), bus differential (87B),
                    transformer differential (87T), overcurrent zones per bay, and breaker failure
                    (50BF) schemes. Each zone has overlapping coverage to ensure no &ldquo;blind
                    spots&rdquo; exist in the protection system (Blackburn &amp; Domin, 2014).
                </p>
            </Section>

            {/* Detailed Technical Description */}
            <Section title="3. Detailed Technical Description" id="technical">
                {/* 3.1 HV Switchyard */}
                <h3 className="text-base font-semibold text-white mt-2 mb-2">3.1 HV Switchyard</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    The switchyard contains all primary equipment operating at 230 kV – 765 kV. For
                    extra-high-voltage (EHV) applications,{' '}
                    <span className="text-[#F59E0B] font-medium">Gas-Insulated Switchgear (GIS)</span>{' '}
                    using SF₆ is employed for compact footprint in space-constrained sites; alternatively,{' '}
                    <span className="text-[#F59E0B] font-medium">Air-Insulated Switchgear (AIS)</span>{' '}
                    provides conventional open-air layouts with lower capital cost but significantly
                    larger land requirements (Garzon, 2002).
                </p>

                <h4 className="text-sm font-semibold text-gray-300 mt-4 mb-2">Major Equipment</h4>
                <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                    <li><span className="text-white">Circuit breakers</span> — SF₆ puffer type, 765 kV rated, 40.5 kA interrupting capacity, 60-cycle duty</li>
                    <li><span className="text-white">Disconnect switches</span> — Motor-operated, vertical-break, SF₆ or air-insulated</li>
                    <li><span className="text-white">Instrument transformers</span> — Current transformers (CT) multi-ratio protection/metering class; Potential transformers (PT) and Coupling Capacitor Voltage Transformers (CCVT) for revenue/metering accuracy</li>
                    <li><span className="text-white">Surge arresters</span> — Metal-oxide varistor (MOV), 765 kV MCOV 600 kV</li>
                    <li><span className="text-white">Bus bars</span> — Aluminum tubular, 5,000 A continuous, rigid/flexible, isolated-phase for EHV</li>
                    <li><span className="text-white">Insulators</span> — Porcelain/polymer post type, suspension strings for overhead bus</li>
                    <li><span className="text-white">Grounding systems</span> — Copper mat/grid buried 1.5 m, counterpoise for incoming lines per IEEE 80</li>
                    <li><span className="text-white">Capacitor banks</span> — 765 kV switched shunt, 100 MVAR per bank</li>
                    <li><span className="text-white">Reactors</span> — Series/shunt air-core, 765 kV, 100 MVAR</li>
                    <li><span className="text-white">Wave traps</span> — Line matching units for power line carrier (PLC), 500 kHz – 1 MHz</li>
                    <li><span className="text-white">CCVTs</span> — 765 kV, 1,000 kV BIL for PLC coupling and metering</li>
                </ul>

                {/* 3.2 Control Building */}
                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.2 Control Building</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    The control building houses all secondary and control equipment within a physically
                    secure, NERC CIP-compliant Electronic Security Perimeter (ESP). Access is controlled
                    via multi-factor authentication and monitored by CCTV systems per CIP-006 (NERC, 2024).
                </p>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside mt-2">
                    <li>Protection relays — multifunction Intelligent Electronic Devices (IEDs)</li>
                    <li>Bay controllers and HMI workstations</li>
                    <li>SCADA servers and Remote Terminal Units (RTUs)</li>
                    <li>Engineering and configuration workstations</li>
                    <li>Battery rooms — 125 V DC station service, 48 V DC telecommunications</li>
                    <li>UPS systems and diesel generator for backup power</li>
                    <li>Communication equipment — fiber optic, microwave, PLC terminal sets</li>
                </ul>

                {/* 3.3 Protection & Metering */}
                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.3 Protection &amp; Metering</h3>
                <p className="text-sm text-gray-300 leading-relaxed mb-3">
                    Protection schemes are implemented per zone with overlapping coverage to ensure
                    comprehensive fault detection and clearing (Blackburn &amp; Domin, 2014):
                </p>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Zone</th>
                                <th className="text-left px-3 py-2 font-medium">Primary Protection</th>
                                <th className="text-left px-3 py-2 font-medium">Backup Protection</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Line', 'Distance (21), Line Differential (87L)', 'Permissive Overreach (POTT), Directional OC (67)'],
                                ['Bus', 'Bus Differential (87B)', 'Overcurrent (50/51)'],
                                ['Transformer', 'Differential (87T), Sudden Pressure, Buchholz', 'Overcurrent, Ground Fault'],
                                ['Breaker Failure', '50BF (0.3–0.5s coordination)', 'Remote backup relaying'],
                            ].map(([zone, primary, backup]) => (
                                <tr key={zone} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#F59E0B] font-medium">{zone}</td>
                                    <td className="px-3 py-2 text-gray-300">{primary}</td>
                                    <td className="px-3 py-2 text-gray-400">{backup}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed mt-4">
                    <span className="text-white font-medium">Metering</span> includes revenue-class
                    CT/PTs, Phasor Measurement Units (PMUs) providing synchrophasor data at 60
                    messages per second per IEEE C37.118, Sequence of Events (SOE) recorders with
                    sub-millisecond resolution, and Disturbance Fault Recorders (DFR) capturing 32
                    samples per cycle for post-fault analysis.
                </p>

                {/* 3.4 SCADA/EMS */}
                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.4 SCADA/EMS Integration</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    Station-level SCADA aggregates all bay-level data via IEC 61850 MMS (Manufacturing
                    Message Specification), presents on local HMI, and interfaces with the enterprise
                    Energy Management System (EMS) or Advanced Distribution Management System (ADMS) via
                    ICCP/TASE.2 or OPC UA. Key functions include alarm management, event sequencing,
                    automatic generation control (AGC), and state estimation (IEC, 2013).
                </p>

                {/* 3.5 Communications */}
                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.5 Communications Architecture</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`┌─────────────────────────────────────────────────────────────┐
│  Process Bus (IEC 61850-9-2)                                │
│    Merging Units ──► Protection IEDs                        │
│    Breaker I/O   ──► Protection IEDs                        │
├─────────────────────────────────────────────────────────────┤
│  Station Bus (IEC 61850-8-1)                                │
│    IEDs ──► Bay Controllers ──► Station SCADA               │
│    Bay Controllers ──► Engineering Workstations             │
├─────────────────────────────────────────────────────────────┤
│  WAN                                                        │
│    Station SCADA ──► Gateway/RTU ──(IEC 104/DNP3)──► EMS    │
│    Gateway ──(C37.118)──► Phasor Data Concentrator          │
└─────────────────────────────────────────────────────────────┘

Network Redundancy: PRP or HSR on Gigabit Ethernet (IEC 62439)`}</pre>
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">
                    Figure 2. Three-tier IEC 61850 communications architecture with process bus,
                    station bus, and WAN interfaces.
                </p>
            </Section>

            {/* Process Diagrams */}
            <Section title="4. Process Diagrams" id="process-diagrams">
                {/* 4.1 Energy Flow */}
                <h3 className="text-sm font-semibold text-white mb-2">4.1 Energy Flow: Generation Tie → Distribution Feeders</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`765kV Generation Tie Lines
    │
    ▼
Surge Arresters → CCVTs/CTs
    │
    ▼
SF₆ Circuit Breakers (Breaker-and-a-Half)
    │
    ▼
Autotransformer (765/345kV)
    │
    ├── 345kV Bus → Outgoing Transmission Lines
    │
    ├── Step-Down (345/230kV) → 230kV Breakers
    │       │
    │       ├── Capacitor Banks (reactive compensation)
    │       └── Shunt Reactors (voltage regulation)
    │
    └── Auxiliary (34.5kV) → Distribution Feeders`}</pre>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed mt-3">
                    <span className="text-white font-medium">Reactive power compensation</span> is
                    achieved through switched shunt capacitor banks providing leading VARs during heavy
                    load periods and shunt reactors absorbing leading VARs during light load conditions.
                    Power line carrier (PLC) coupling via wave traps enables communication over the
                    power line for teleprotection signaling.
                </p>

                {/* 4.2 Protection Coordination */}
                <h3 className="text-sm font-semibold text-white mt-8 mb-2">4.2 Protection Relay Coordination</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`Primary Protection         Backup Protection          Remote Backup
─────────────────          ──────────────────         ─────────────
Line Differential (87L)    Permissive Overreach       Overcurrent
Distance (21)              (POTT)                     (50/51)
    ↓ 0.0s                     ↓ 0.3s                    ↓ 0.5s
Instantaneous Trip         Time-Delayed Trip          Zone Backup Trip
    │                          │                          │
    └─── Breaker Failure (50BF) triggers adjacent breakers ─┘

Coordination Time Intervals: 0.3–0.5s grading between zones.
Breaker Failure (50BF): operates after 150ms if primary fails to clear.`}</pre>
                </div>

                {/* 4.3 SCADA Data Flow */}
                <h3 className="text-sm font-semibold text-white mt-8 mb-2">4.3 SCADA Data Flow</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`Bay IEDs ──── GOOSE/MMS ────► Station SCADA/RTU
                                   │
                              IEC 104/DNP3
                                   │
                              DMZ Gateway
                                   │
                        Enterprise EMS/ADMS

Real-time telemetry: 500+ analog/status points polled every 2–4 seconds.
SOE timestamps accurate to <1ms via IRIG-B/GPS synchronization.`}</pre>
                </div>
            </Section>

            {/* Bill of Materials */}
            <Section title="5. Bill of Materials" id="bom">
                <p className="text-sm text-gray-400 mb-3 italic">
                    Scaled for a 20-bay 500/765 kV transmission substation.
                </p>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Equipment Type</th>
                                <th className="text-left px-3 py-2 font-medium">Specification</th>
                                <th className="text-right px-3 py-2 font-medium">Qty</th>
                                <th className="text-left px-3 py-2 font-medium">Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Power Transformers', '3-phase autotransformer, ONAN/ONAF, OLTC', '4', '765/345/34.5kV, 500MVA'],
                                ['Circuit Breakers (SF₆)', 'Puffer type, 60-cycle duty', '120', '765kV, 40.5kA'],
                                ['Disconnect Switches', 'Motor-operated, vertical-break', '80', '765kV'],
                                ['Current Transformers', 'Multi-ratio, protection/metering class', '400', '15kV–765kV'],
                                ['PT/CCVTs', 'Revenue/metering accuracy', '200', '765kV, 1000kV BIL'],
                                ['Surge Arresters', 'Metal-oxide varistor (MOV)', '50', '765kV, MCOV 600kV'],
                                ['Bus Bars', 'Aluminum tubular, isolated-phase', '~10km', '5,000A continuous'],
                                ['Post/Suspension Insulators', 'Porcelain/polymer', '2,000', '765kV'],
                                ['Grounding System', 'Copper mat/grid, 1.5m burial', '~50,000m', 'IEEE 80'],
                                ['Capacitor Banks', 'Switched shunt', '4 banks', '100 MVAR each'],
                                ['Shunt/Series Reactors', 'Air-core', '6', '100 MVAR, 765kV'],
                                ['Wave Traps', 'PLC line coupling', '20', '500kHz–1MHz'],
                                ['CCVTs', 'PLC/metering', '40', '765kV'],
                                ['Protection IEDs', 'Multifunction (21/50/51/67/87)', '200+', 'IEC 61850'],
                                ['Bay Controllers', 'IEC 61850 gateway', '40', 'MMS/GOOSE'],
                                ['RTU/Gateway', 'Station-level data concentrator', '4', 'DNP3/IEC 104'],
                                ['PMUs', 'Synchrophasor measurement', '20', 'C37.118, 60 msg/s'],
                                ['DFR', 'Disturbance fault recorder', '10', '32 samples/cycle'],
                                ['Ethernet Switches', 'Managed, PRP/HSR', '60', 'Gigabit, IEC 62439'],
                            ].map(([equip, spec, qty, rating]) => (
                                <tr key={equip} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-gray-300 font-medium">{equip}</td>
                                    <td className="px-3 py-2 text-gray-400">{spec}</td>
                                    <td className="px-3 py-2 text-right text-emerald-500/80 font-mono">{qty}</td>
                                    <td className="px-3 py-2 text-gray-400">{rating}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* Purdue Model */}
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
                                ['Level 0 — Process', 'HV breakers, disconnects, transformers, CT/PT/CCVTs, merging units', 'Hardwired I/O, IEC 61850-9-2 Sampled Values'],
                                ['Level 1 — Basic Control', 'Protection IEDs, bay-level controllers, PMUs', 'GOOSE, IEC 61850-8-1 MMS'],
                                ['Level 2 — Supervisory', 'HMI, RTU, bay controllers, protocol gateways', 'OPC UA, DNP3'],
                                ['Level 3 — Operations', 'Station SCADA, historian, DFR, engineering workstation', 'MMS, ICCP/TASE.2'],
                                ['Level 3.5 — DMZ', 'Firewalls, data diodes, protocol converters', 'NERC CIP ESP demarcation'],
                                ['Level 4 — Enterprise', 'EMS/ADMS, synchrophasor platform, asset management', 'CIM-based ICCP, web services'],
                            ].map(([level, components, protocols]) => (
                                <tr key={level} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#F59E0B] font-medium whitespace-nowrap">{level}</td>
                                    <td className="px-3 py-2 text-gray-300">{components}</td>
                                    <td className="px-3 py-2 text-gray-400">{protocols}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">
                    Mapping aligns with SGAM zones: Process/Field (Level 0–1), Station (Level 2–3),
                    Operation (Level 3.5–4) per CEN-CENELEC (2012).
                </p>
            </Section>

            {/* Supporting Systems */}
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
                                ['Fire Suppression', 'FM200 clean agent for control room/battery rooms; deluge water/foam for transformer oil pits', 'NFPA 15/2001'],
                                ['HVAC', 'Redundant N+1 chillers, HEPA-filtered for control building', '500 TR, NERC CIP-010'],
                                ['DC Station Service', 'Lead-acid battery banks for protection relays; telecom batteries', '125V/2000Ah (8hr); 48V'],
                                ['UPS', 'Double-conversion for SCADA/servers', '100 kVA, 15 min bridge'],
                                ['Diesel Generator', 'Standby, auto-start with day tank', '2 MW, 24hr continuous'],
                                ['Lightning Protection', 'Shield wires and masts', 'IEEE 998 rolling sphere'],
                                ['Physical Security', 'Perimeter fencing, cameras, access control', 'NERC CIP-006'],
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

            {/* Water/Air/Gas Flow */}
            <Section title="8. Water, Air &amp; Gas Flow" id="water-air-gas">
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
                                ['SF₆ Gas', 'Breaker insulation and arc quenching', 'Density monitors, closed-loop reclamation (>99% purity), alarm at 50% pressure loss'],
                                ['Transformer Oil', 'Cooling (ODAF fans/pumps) and insulation', 'Conservator with Buchholz relay, 30 GPM/transformer closed-loop chiller'],
                                ['Compressed Air', 'Pneumatic breaker operators', '150 psi station air (duplex 1,000 SCFM), dryers/receivers, N₂ backup'],
                                ['Cooling Water', 'Battery/UPS cooling; fire suppression', 'Closed-loop for electronics; open-loop deluge (500 GPM pumps)'],
                            ].map(([medium, system, spec]) => (
                                <tr key={medium} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#06B6D4] font-medium whitespace-nowrap">{medium}</td>
                                    <td className="px-3 py-2 text-gray-300">{system}</td>
                                    <td className="px-3 py-2 text-gray-400">{spec}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* Data Flow Architecture */}
            <Section title="9. Data Flow Architecture" id="data-flow">
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`┌─────────────────────────────────────────────────────────────┐
│ Real-Time (2–4s poll):                                      │
│   500+ Analog/Status Points ──(IEC 104/DNP3)──► Station SCADA│
│                                                              │
│ Event-Driven (<1ms):                                        │
│   SOE Recorder ──(IRIG-B/GPS)──► Station Historian           │
│                                                              │
│ Disturbance Analysis:                                       │
│   DFR (32 samples/cycle) ──► Engineering Workstation         │
│                                                              │
│ Synchrophasor (60 msg/s):                                   │
│   PMUs ──(C37.118.2)──► Phasor Data Concentrator             │
│                          │                                   │
│                          ├──► Enterprise EMS (State Est.)     │
│                          └──► Wide-Area Monitoring System     │
└─────────────────────────────────────────────────────────────┘`}</pre>
                </div>
            </Section>

            {/* References */}
            <Section title="References" id="references">
                <div className="space-y-2 text-xs text-gray-400 leading-relaxed">
                    <p>Blackburn, J. L., &amp; Domin, T. J. (2014). <em>Protective relaying: principles and applications</em> (4th ed.). CRC Press.</p>
                    <p>CEN-CENELEC-ETSI. (2012). <em>Smart Grid Reference Architecture</em>. European Committee for Standardization.</p>
                    <p>Garzon, R. D. (2002). <em>High voltage circuit breakers: design and applications</em> (2nd ed.). Marcel Dekker.</p>
                    <p>International Electrotechnical Commission. (2013). <em>IEC 61850: Communication networks and systems for power utility automation</em>. IEC.</p>
                    <p>IEEE. (2020). <em>IEEE Std C37.122: IEEE standard for high voltage gas-insulated substations rated above 52 kV</em>. IEEE.</p>
                    <p>North American Electric Reliability Corporation. (2024). <em>Critical Infrastructure Protection (CIP) Standards</em>. NERC.</p>
                    <p>SciTePress. (2020). TOGAF framework application in energy systems architecture. <em>Proceedings of SMARTGREENS 2020</em>, 112–119.</p>
                    <p>The Open Group. (2022). <em>TOGAF Standard, Version 10</em>. The Open Group.</p>
                    <p>Williams, T. J. (1994). The Purdue Enterprise Reference Architecture. <em>Computers in Industry</em>, 24(2–3), 141–158.</p>
                </div>
            </Section>

            {/* See Also */}
            <Section title="See Also" id="see-also">
                <div className="flex flex-wrap gap-2">
                    {[
                        { href: '/wiki/energy', label: 'Energy Sector Hub', color: '#F59E0B' },
                        { href: '/wiki/energy/distribution', label: 'Distribution Facilities', color: '#3B82F6' },
                        { href: '/wiki/energy/bess', label: 'Battery Energy Storage', color: '#EF4444' },
                        { href: '/wiki/energy/vpp-derms', label: 'VPP / DERMS', color: '#EC4899' },
                        { href: '/wiki/sectors/ENER', label: 'Energy Sector Overview', color: '#F59E0B' },
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
function Section({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
    return (
        <section id={id} className="space-y-4">
            <h2 className="text-xl font-heading font-semibold text-white">{title}</h2>
            {children}
        </section>
    );
}
