/**
 * Naval Shipyard — Deep Dive Wiki Article.
 *
 * Comprehensive TOGAF-based reference architecture for Naval Dry Dock operations,
 * focusing on nuclear submarine/carrier overhaul, heavy lift capabilities, and
 * critical dewatering systems.
 *
 * @module wiki/defense/naval-shipyard/page
 */

export const metadata = {
    title: 'Naval Shipyard Reference Architecture — Defense Wiki',
    description: 'Reference architecture for Naval Dry Docks: Nuclear vessel MRO, dewatering systems, and heavy lift infrastructure.',
};

export default function NavalShipyardPage() {
    return (
        <div className="max-w-5xl space-y-10 pb-20">

            {/* ── Header ───────────────────────────────────────────────────────── */}
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]"
                        style={{ background: '#0EA5E9' }} />
                    <span className="text-xs font-mono text-gray-500">
                        DEFN · MARITIME · MRO
                    </span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">
                    Naval Shipyard (Dry Dock)
                </h1>
                <p className="text-sm text-gray-500 font-mono">Nuclear Propulsion Overhaul · Fleet Readiness</p>
                <p className="text-gray-400 text-base leading-relaxed max-w-3xl">
                    Naval Shipyards (e.g., Norfolk, Puget Sound) are extensive industrial complexes capable of
                    dry-docking nuclear aircraft carriers (CVN) and submarines (SSN/SSBN). Key systems include
                    **high-capacity dewatering pumps** (100,000+ GPM), **nuclear material handling capabilities**,
                    and massive **portal cranes** for structural refit.
                </p>
            </div>

            {/* ── 1. TOGAF Business Architecture ───────────────────────────────── */}
            <Section title="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-300 leading-relaxed">
                    The shipyard's mission is to return vessels to the fleet in "fight-tonight" condition.
                    This requires alignment with **NAVSEA (Naval Sea Systems Command)** standards and strict
                    adherence to **Naval Nuclear Propulsion Program (NNPP)** regulations.
                </p>

                <h3 className="text-sm font-semibold text-white mt-6 mb-2">Stakeholders</h3>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside">
                    <li>NAVSEA 08 (Nuclear Propulsion)</li>
                    <li>Shipyard Commander (SY CO)</li>
                    <li>Defense Nuclear Facilities Safety Board (DNFSB)</li>
                    <li>Private Contractors (HII, General Dynamics)</li>
                    <li>EPA / Local Environmental Agencies (Stormwater)</li>
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
                                ['NAVSEA OS 7612', 'Dry Dock Certification Requirements'],
                                ['10 CFR 835', 'Occupational Radiation Protection'],
                                ['NIST SP 800-82', 'Guide to Industrial Control Systems (ICS) Security'],
                                ['UFC 4-213-10', 'Graving Docks Design'],
                                ['MIL-STD-1625', 'Safety Certification Program for Drydocking Facilities'],
                            ].map(([standard, scope]) => (
                                <tr key={standard} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#0EA5E9] font-medium whitespace-nowrap">{standard}</td>
                                    <td className="px-3 py-2 text-gray-400">{scope}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* ── 2. High-Level Design ─────────────────────────────────────────── */}
            <Section title="2. High-Level Design" id="design">
                <p className="text-sm text-gray-300 leading-relaxed">
                    The dry dock system comprises a **caisson (gate)**, a **flooding capability**, and a **dewatering system**.
                    A dedicated **nuclear complex** supports reactor refueling, separated from the general industrial area.
                    Power is supplied via **shore power stations** converting grid voltage to shipboard 4160V/480V standards.
                </p>

                <h3 className="text-sm font-semibold text-white mt-6 mb-2">Systems Architecture</h3>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{
                        `[ Harbor / Sea ] ◄── [ Caisson Gate ] ──► [ Dry Dock Chamber ]
                              │                    │
                              ▼                    ▼
                      [ Filling Valve ]    [ Drainage Gallery ]
                                                   │
                                                   ▼
                                         [ Main Pump House ]
                                         (Dewatering & Drainage)
                                                   │
                                                   ▼
                                            [ Discharge ]`
                    }</pre>
                </div>
            </Section>

            {/* ── 3. Detailed Technical Description ────────────────────────────── */}
            <Section title="3. Detailed Technical Description" id="technical">

                {/* 3.1 Dewatering */}
                <h3 className="text-base font-semibold text-white mt-2 mb-2">3.1 Dewatering & Drainage</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    The heart of the dock is the pump house. Main dewatering pumps are massive vertical mixed-flow
                    units capable of emptying the dock in 4-8 hours. Drainage pumps handle leakage and process water
                    during operations.
                </p>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside mt-2">
                    <li><span className="text-white">Main Pumps</span> — ~100,000 GPM Vertical Mixed Flow, 4160V Motors</li>
                    <li><span className="text-white">Drainage Pumps</span> — 5,000 GPM Submersible Sump Pumps</li>
                    <li><span className="text-white">Valves</span> — 60"-96" Hydraulic Gate Valves</li>
                </ul>

                {/* 3.2 Portal Cranes */}
                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.2 Heavy Lift Cranes</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    Rail-mounted portal cranes provide lifting coverage for the entire dock. They feature
                    diesel-electric or shore-powered drives and sophisticated load monitoring for nuclear lifts.
                </p>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside mt-2">
                    <li><span className="text-white">Capacity</span> — 60 to 300 Tons (Main Hoist)</li>
                    <li><span className="text-white">Reach</span> — 100+ ft Booms</li>
                    <li><span className="text-white">Safety</span> — Redundant braking, anti-sway, load cells</li>
                </ul>

                {/* 3.3 Shore Power */}
                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.3 Shore Power Services</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    Vessels in dock shut down internal generators and rely on "cold iron" shore power.
                    This requires massive frequency conversion (60Hz to ungrounded 440V) and steam supplies.
                </p>
            </Section>

            {/* ── 4. Process Diagrams ──────────────────────────────────────────── */}
            <Section title="4. Process Diagrams" id="process">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">4.1 Docking Evolution</h4>
                <div className="rounded-lg border border-white/[0.06] p-4 font-mono text-xs text-gray-300 overflow-x-auto mb-6">
                    <pre className="whitespace-pre">{
                        `[ Prep Dock ] ──► [ Flood Dock ] ──► [ Open Gate ] ──► [ Vessel Entry ]
                                                               │
                                                               ▼
[ Set Blocks ] ◄── [ Dewater ] ◄── [ Close Gate ] ◄── [ Position Ship ]
       │
       ▼
[ Dry Dock Operations Start ]`
                    }</pre>
                </div>

                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">4.2 Pump Control Logic</h4>
                <div className="rounded-lg border border-white/[0.06] p-4 font-mono text-xs text-gray-300 overflow-x-auto">
                    <pre className="whitespace-pre">{
                        `[ Level Sensor ] ──► [ PLC ] ──(Permissive)──► [ VFD/Starter ]
       │                │                             │
       ▼                ▼                             ▼
[ Operator HMI ] ◄── [ Interlocks ] ◄───────── [ Motor Run ]
                     (Valve Status)
                     (Gate Seal)`
                    }</pre>
                </div>
            </Section>

            {/* ── 5. Bill of Materials ─────────────────────────────────────────── */}
            <Section title="5. Bill of Materials" id="bom">
                <p className="text-sm text-gray-400 mb-4">
                    Equipment for a typical Graving Dock Pump House and support infrastructure.
                </p>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left border-collapse">
                        <thead>
                            <tr className="text-gray-500 border-b border-white/[0.08]">
                                <th className="py-2 px-3 font-medium">Equipment Type</th>
                                <th className="py-2 px-3 font-medium">Specification</th>
                                <th className="py-2 px-3 font-medium">Typical Qty</th>
                                <th className="py-2 px-3 font-medium">Rating/Cap</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-300 divide-y divide-white/[0.04]">
                            {[
                                ['Main Dewatering Pump', 'Vertical Mixed Flow, 4160V', '4', '125,000 GPM'],
                                ['Drainage Pump', 'Submersible Centrifugal', '3', '5,000 GPM'],
                                ['Pump Motor', 'Induction, WPII Enclosure', '4', '2,500 HP'],
                                ['Discharge Valve', 'Hydraulic Gate Valve', '4', '60-inch'],
                                ['Caisson Gate', 'Floating Steel Gate', '1', '150 ft Wide'],
                                ['Portal Crane', 'Rail-Mounted, Revolving', '2', '100 Ton'],
                                ['Capstan', 'Electric Mooring Winch', '8', '20,000 lbs Pull'],
                                ['Unit Substation', 'Primary Power', '2', '5 MVA, 13.8kV'],
                                ['Shore Power Mound', 'Ship Connection Point', '6', '400A / 480V'],
                                ['Level Transmitter', 'Radar / Ultrasonic', '4', '0-60 ft Range'],
                                ['Flow Meter', 'Magnetic / Ultrasonic', '4', '60-inch Pipe'],
                                ['MCC', 'Motor Control Center', '2', '600A Bus'],
                                ['SCADA Server', 'Redundant Rackmount', '2', 'Virtual Cluster'],
                                ['PLC CPU', 'Rockwell ControlLogix', '2', 'Hot Standby'],
                                ['Diesel Generator', 'Emergency Backup', '1', '1000 kW'],
                                ['Air Compressor', 'Plant Air', '2', '500 CFM'],
                            ].map(([item, spec, qty, rating]) => (
                                <tr key={item}>
                                    <td className="py-2 px-3 font-medium text-white">{item}</td>
                                    <td className="py-2 px-3 text-gray-400">{spec}</td>
                                    <td className="py-2 px-3">{qty}</td>
                                    <td className="py-2 px-3 text-[#0EA5E9]">{rating}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* ── 6. Purdue Model Mapping ──────────────────────────────────────── */}
            <Section title="6. Purdue Model Mapping" id="purdue">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left border-collapse">
                        <thead>
                            <tr className="text-gray-500 border-b border-white/[0.08]">
                                <th className="py-2 px-3 font-medium">Level</th>
                                <th className="py-2 px-3 font-medium">Components</th>
                                <th className="py-2 px-3 font-medium">Protocols/Functions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-300 divide-y divide-white/[0.04]">
                            <tr>
                                <td className="py-2 px-3 text-gray-500 font-mono">L4 Enterprise</td>
                                <td className="py-2 px-3">Oracle E-Business, Asset Mgmt</td>
                                <td className="py-2 px-3">Scheduling, Procurement</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-3 text-gray-500 font-mono">L3.5 IDMZ</td>
                                <td className="py-2 px-3">CMMC compliant gateway</td>
                                <td className="py-2 px-3">Report Replication</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-3 text-gray-500 font-mono">L3 Operations</td>
                                <td className="py-2 px-3">Maintenance Mgt (Maximo)</td>
                                <td className="py-2 px-3">Work Orders, Lockout/Tagout</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-3 text-gray-500 font-mono">L2 Control</td>
                                <td className="py-2 px-3">Pump House SCADA (Wonderware)</td>
                                <td className="py-2 px-3">DNP3, Modbus TCP</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-3 text-gray-500 font-mono">L1 Device</td>
                                <td className="py-2 px-3">Pump PLCs, Crane Drives</td>
                                <td className="py-2 px-3">Hardwired Interlocks</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-3 text-gray-500 font-mono">L0 Process</td>
                                <td className="py-2 px-3">Pumps, Valves, Motors</td>
                                <td className="py-2 px-3">4-20mA, Relay Logic</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* ── 7. Supporting Systems ────────────────────────────────────────── */}
            <Section title="7. Supporting Systems" id="supporting">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left border-collapse">
                        <thead>
                            <tr className="text-gray-500 border-b border-white/[0.08]">
                                <th className="py-2 px-3 font-medium">System</th>
                                <th className="py-2 px-3 font-medium">Description</th>
                                <th className="py-2 px-3 font-medium">Specification</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-300 divide-y divide-white/[0.04]">
                            {[
                                ['Saltwater Fire', 'Firemain loop for dock floor', '150 PSI'],
                                ['Fresh Water', 'Potable water for ship hotel services', '100 PSI'],
                                ['Steam', 'Heating and galley use', '150 PSIG Saturated'],
                                ['Sewage (CHT)', 'Collection Holding & Transfer', 'Vacuum / Gravity'],
                                ['Physical Security', 'Perimeter/Waterfront surveillance', 'CCTV / Radar'],
                            ].map(([sys, desc, spec]) => (
                                <tr key={sys}>
                                    <td className="py-2 px-3 font-medium text-white">{sys}</td>
                                    <td className="py-2 px-3 text-gray-400">{desc}</td>
                                    <td className="py-2 px-3 text-[#0EA5E9]">{spec}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* ── 8. Utility Flows ─────────────────────────────────────────────── */}
            <Section title="8. Utility Flows" id="utilities">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { medium: 'Seawater', spec: 'Flooding/Cooling', icon: '🌊' },
                        { medium: 'Steam', spec: '150 PSIG District Steam', icon: '☁️' },
                        { medium: 'Compressed Air', spec: 'Service/Tool Air', icon: '💨' },
                    ].map((util) => (
                        <div key={util.medium} className="p-3 rounded-lg border border-white/[0.06] bg-white/[0.02] flex items-center gap-3">
                            <span className="text-xl">{util.icon}</span>
                            <div>
                                <div className="text-xs font-semibold text-white">{util.medium}</div>
                                <div className="text-[10px] text-gray-400">{util.spec}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* ── 9. Data Flow Architecture ────────────────────────────────────── */}
            <Section title="9. Data Flow Architecture" id="data-flow">
                <p className="text-sm text-gray-300 leading-relaxed mb-6">
                    Data flow is strictly segmented. Operational Technology (OT) for dock control is separated
                    from IT networks. Wireless is restricted in nuclear areas.
                </p>
                <div className="rounded-lg border border-white/[0.06] p-6 font-mono text-xs text-gray-300 overflow-x-auto bg-white/[0.02]">
                    <pre className="whitespace-pre leading-relaxed">{
                        `[ Field Sensors ] ──(Hardwired)──► [ Local Panels ]
                                          │
                                          ▼
                                     [ Pump House PLC ]
                                          │
    (Fiber Ring - DNP3) ◄─────────────────┘
           │
           ▼
[ Central SCADA ] ──(Unidirectional)──► [ Historian ] ──► [ Enterprise ]`
                    }</pre>
                </div>
            </Section>

            {/* ── 10. References ───────────────────────────────────────────────── */}
            <Section title="10. References" id="references">
                <ul className="space-y-2 text-xs text-gray-500 font-mono">
                    <li>• NAVSEA. (2018). <em>Tech Manual S9086-T8-STM-010: Pollution Control Systems.</em></li>
                    <li>• UFC. (2017). <em>UFC 4-213-10: Design: Graving Docks.</em> Unified Facilities Criteria.</li>
                    <li>• NIST. (2020). <em>Guide to Industrial Control Systems (ICS) Security (SP 800-82).</em></li>
                    <li>• U.S. Navy. (2019). <em>Shipyard Infrastructure Optimization Plan (SIOP).</em></li>
                    <li>• HII-Newport News Shipbuilding. (2021). <em>Dry Dock Operations Guide.</em></li>
                    <li>• ASME. (2020). <em>B30.4: Portal and Pedestal Cranes.</em></li>
                </ul>
            </Section>

            {/* ── See Also ─────────────────────────────────────────────────────── */}
            <Section title="See Also" id="see-also">
                <div className="flex flex-wrap gap-3">
                    {[
                        { label: 'Defense Sector Hub', href: '/wiki/defense', color: '#64748B' },
                        { label: 'Energy Sector', href: '/wiki/energy', color: '#F59E0B' },
                        { label: 'Water Sector (Pumps)', href: '/wiki/water', color: '#06B6D4' },
                    ].map((link) => (
                        <a
                            key={link.label}
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
        <section id={id} className="space-y-4 pt-8 border-t border-white/[0.04]">
            <h2 className="text-lg font-heading font-semibold text-white/90">
                {title}
            </h2>
            {children}
        </section>
    );
}
