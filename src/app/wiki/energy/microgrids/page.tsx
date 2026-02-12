/**
 * Microgrids — Deep Dive Wiki Article.
 *
 * Comprehensive TOGAF-based reference architecture for campus and community
 * microgrids (1–20 MW), including islanding sequences, black start procedures,
 * DER portfolio management, and IEEE 2030.7 microgrid controller functions.
 *
 * @module wiki/energy/microgrids/page
 */

export const metadata = {
    title: 'Microgrids (1–20 MW) — Energy Wiki',
    description:
        'TOGAF reference architecture for microgrids: islanding, black start, DER portfolio, ' +
        'grid-forming inverters, and adaptive protection per IEEE 2030.7.',
};

export default function MicrogridsPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]" style={{ background: '#8B5CF6' }} />
                    <span className="text-xs font-mono text-gray-500">ENERGY · DISTRIBUTED · MICROGRIDS</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">Microgrids</h1>
                <p className="text-sm text-gray-500 font-mono">1 – 20 MW · Campus &amp; Community Scale</p>
                <p className="text-gray-400 text-base leading-relaxed max-w-3xl">
                    A microgrid is a locally controlled group of distributed energy resources (DERs) and
                    loads that can operate in both grid-connected and islanded modes. Defined by IEEE Std
                    2030.7 as a &ldquo;group of interconnected loads and distributed energy resources within
                    clearly defined electrical boundaries that acts as a single controllable entity with
                    respect to the grid&rdquo; (IEEE, 2017), microgrids provide resilience, renewable
                    integration, and economic optimization for campuses, military installations, remote
                    communities, and commercial/industrial facilities.
                </p>
            </div>

            <Section title="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-300 leading-relaxed">
                    The microgrid business architecture addresses the dual imperatives of resilience and
                    sustainability. Campus microgrids (university, hospital, military) prioritize
                    uninterruptible power supply to critical loads, while community microgrids
                    emphasize renewable energy self-consumption and grid services export. The economic
                    model relies on &ldquo;value stacking&rdquo; — combining energy cost savings,
                    demand charge reduction, ancillary services revenue, and resilience premium
                    (Hirsch et al., 2018).
                </p>

                <h3 className="text-sm font-semibold text-white mt-6 mb-2">Stakeholders</h3>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside">
                    <li>Microgrid owner/operator — campus, community, or commercial entity</li>
                    <li>Utility DSO — interconnection, islanding coordination, grid services procurement</li>
                    <li>DER asset owners — solar developers, battery operators, CHP providers</li>
                    <li>Critical load operators — hospitals, data centres, water treatment facilities</li>
                    <li>Regulators — state PUCs, IEEE 1547 compliance, utility tariff structures</li>
                    <li>EPC contractors and microgrid-as-a-service (MaaS) providers</li>
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
                                ['IEEE 2030.7', 'Microgrid controller specification — dispatch, mode transition, protection'],
                                ['IEEE 2030.8', 'Microgrid testing procedures'],
                                ['IEEE 1547.4', 'Design and operation of DER island systems'],
                                ['UL 1741 SA/SB', 'Inverter safety and grid-support functions (ride-through, anti-islanding)'],
                                ['NFPA 110', 'Emergency and standby power systems (diesel/gas generators)'],
                                ['NEC 705', 'Interconnected electric power production sources'],
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

            <Section title="2. High-Level Design" id="high-level-design">
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`Utility Grid (13.2kV)
    │
    ▼
Point of Common Coupling (PCC) — Transfer Switch / Sync Breaker
    │
    ▼
Microgrid MV Bus (13.2kV or 480V depending on scale)
    │
    ├── Solar PV Array (2 MW) + Inverter (grid-forming capable)
    ├── Battery Storage (4 MWh / 2 MW) + PCS (bidirectional)
    ├── CHP / Diesel Generator (1–5 MW)
    ├── Wind Turbine(s) (500 kW – 2 MW)
    ├── EV Charging Station (500 kW aggregate)
    │
    └── Load Groups:
        ├── CRITICAL: Hospital, Data Centre, Water Treatment
        ├── PRIORITY: HVAC, Lighting, Elevators
        └── SHEDDABLE: Non-essential Commercial, EV Charging

Microgrid Controller ←──── Utility DMS/DERMS
    │
    ├── DER Dispatch (MPC optimizer, 5-min intervals)
    ├── Mode Manager (grid-tied, islanding, reconnection)
    └── Protection Coordinator (adaptive relay settings)`}</pre>
                </div>
            </Section>

            <Section title="3. Detailed Technical Description" id="technical">
                <h3 className="text-base font-semibold text-white mt-2 mb-2">3.1 DER Portfolio</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">DER Type</th>
                                <th className="text-left px-3 py-2 font-medium">Capacity</th>
                                <th className="text-left px-3 py-2 font-medium">Function</th>
                                <th className="text-left px-3 py-2 font-medium">Response Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Solar PV', '2 MW (DC)', 'Baseload renewable, Volt-VAR support', '100ms (inverter)'],
                                ['BESS', '2 MW / 4 MWh', 'Grid-forming, peak shaving, freq. regulation', '<200ms'],
                                ['Diesel Gen', '2 MW', 'Black start, baseload in island mode', '10–15 seconds'],
                                ['CHP', '1 MW (e) + 1 MW (th)', 'Combined heat and power, baseload', '5–10 minutes'],
                                ['Wind Turbine', '500 kW', 'Intermittent generation', '100ms (inverter)'],
                                ['EV Chargers (V2G)', '500 kW aggregate', 'Controllable load, V2G export', '1 second'],
                            ].map(([type, cap, func, resp]) => (
                                <tr key={type} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-gray-300 font-medium">{type}</td>
                                    <td className="px-3 py-2 text-gray-400 font-mono">{cap}</td>
                                    <td className="px-3 py-2 text-gray-400">{func}</td>
                                    <td className="px-3 py-2 text-gray-400 font-mono">{resp}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.2 Microgrid Controller (MGC)</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    The MGC is the central intelligence of the microgrid, implementing the functional
                    specifications defined by IEEE 2030.7. It operates as a hierarchical control system
                    with three layers: (1) Device-level controllers providing fast response for voltage
                    and frequency regulation; (2) Microgrid-level controllers performing DER dispatch
                    optimization and mode management; and (3) Grid-level interfaces coordinating with
                    the utility DERMS for grid services (IEEE, 2017).
                </p>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside mt-2">
                    <li><span className="text-white">Optimal dispatch:</span> Model Predictive Control (MPC) with 5-minute intervals, 24-hour rolling horizon</li>
                    <li><span className="text-white">Load forecasting:</span> ML-based (LSTM/GRU), weather-integrated, 15-min resolution, day-ahead and 4-hour ahead</li>
                    <li><span className="text-white">Mode management:</span> Grid-connected, intentional island, unintentional island, reconnection, black start</li>
                    <li><span className="text-white">Protection coordination:</span> Adaptive relay settings that change with mode transition (grid-tied vs. islanded)</li>
                    <li><span className="text-white">Communication:</span> IEC 61850 (internal bus), IEEE 2030.5 (utility interface), Modbus TCP (legacy DER)</li>
                </ul>

                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.3 Grid-Forming Inverters</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    Unlike conventional grid-following inverters that synchronize to the grid voltage,{' '}
                    <span className="text-[#8B5CF6] font-medium">grid-forming inverters</span> can
                    autonomously establish voltage and frequency references during islanded operation.
                    This capability is essential for 100% inverter-based microgrids (no synchronous
                    generators) and is achieved through virtual synchronous machine (VSM) or droop
                    control algorithms. Grid-forming BESS inverters provide synthetic inertia and
                    fault current contribution during island mode (NREL, 2020).
                </p>
            </Section>

            <Section title="4. Process Diagrams" id="process-diagrams">
                <h3 className="text-sm font-semibold text-white mb-2">4.1 Islanding Sequence</h3>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`PLANNED ISLAND:
1. MGC receives island command (or detects utility outage via loss-of-mains)
2. Open PCC breaker/transfer switch — disconnect from utility
3. Grid-forming inverter (BESS) establishes V/f reference
4. Shed non-critical loads to match generation capacity
5. Start diesel generator / CHP (if needed for sustained island)
6. Stabilize: V = 1.0 pu ± 5%, f = 60 Hz ± 0.5 Hz
7. Adaptive protection: switch relay settings to islanded curves
8. Begin MPC dispatch optimization for island-mode economy

UNPLANNED ISLAND (fault-initiated):
1. Loss of utility detected (voltage/frequency, ROCOF, vector shift)
2. Anti-islanding protection trips within 2 seconds (IEEE 1547)
3. MGC intervenes: hold PCC open, transition to island mode
4. BESS grid-forming: voltage/frequency recovery within 200ms
5. Load shedding actuated via priority scheme (CRITICAL → PRIORITY → SHEDDABLE)
6. Stabilization complete within 10 seconds`}</pre>
                </div>

                <h3 className="text-sm font-semibold text-white mt-8 mb-2">4.2 Black Start Procedure</h3>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`CONDITION: Complete de-energization of microgrid.

1. BESS grid-forming inverter energizes MV bus (soft start, ramped V/f)
2. Diesel generator auto-start → synchronize to BESS V/f reference
3. Generator parallels with BESS → both supply bus
4. CRITICAL loads energized first:
   a. Hospital UPS bypass → direct supply
   b. Water treatment plant essential pumps
   c. Communications/IT infrastructure
5. PRIORITY loads energized (HVAC, elevators, lighting)
6. PV inverters reconnect (grid-following mode, MPPT)
7. Non-critical loads restored last
8. When utility returns: synchronize → re-close PCC → grid-connected
   Sync check: ΔV < 5%, Δf < 0.1 Hz, Δφ < 10°`}</pre>
                </div>

                <h3 className="text-sm font-semibold text-white mt-8 mb-2">4.3 Energy Flow Paths</h3>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`Mode 1: Grid-Connected (Normal)
  Utility + PV + BESS → All Loads
  Excess PV → Grid Export or BESS Charge
  BESS dispatched for: peak shaving, frequency regulation, arbitrage

Mode 2: Islanded (Sustained)
  Diesel Gen + PV + BESS → Critical + Priority Loads
  BESS provides: grid-forming, transient support
  Diesel provides: sustained baseload
  PV provides: energy during daylight (curtailed if needed)

Mode 3: Emergency (BESS-only)
  BESS (grid-forming) → Critical Loads Only
  Duration: 2–4 hours depending on SOC and load`}</pre>
                </div>
            </Section>

            <Section title="5. Bill of Materials" id="bom">
                <p className="text-sm text-gray-400 mb-3 italic">
                    Scaled for a 5 MW campus microgrid with 4-hour storage.
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
                                ['Solar PV Array', '400W bifacial modules, 5,000 panels', '2 MW DC'],
                                ['Solar Inverter', 'String/central, grid-following, IEEE 1547', '4 × 500 kW'],
                                ['BESS Containers', 'LFP, 2 MWh per container', '2 containers (4 MWh)'],
                                ['BESS PCS', 'Grid-forming, 4-quadrant, SiC MOSFET', '2 × 1 MW'],
                                ['Diesel Generator', 'Standby rated, auto-start, load bank tested', '1 × 2 MW'],
                                ['CHP Unit', 'Natural gas reciprocating engine + heat recovery', '1 × 1 MW'],
                                ['Microgrid Controller', 'IEEE 2030.7 compliant, MPC optimizer', '1 system'],
                                ['PCC Transfer Switch', 'Static transfer switch, 100ms transfer', '1 × 5 MW'],
                                ['MV Switchgear', '15kV metal-clad, vacuum breakers', '8 panels'],
                                ['Distribution Transformers', '13.2kV/480V, pad-mount', '4 × 1 MVA'],
                                ['Protection IEDs', 'Adaptive relay, dual setting groups', '12'],
                                ['Power Quality Meter', 'Class A (IEC 61000-4-30), SOE, harmonics', '6'],
                                ['SCADA/HMI', 'Redundant server, local HMI screens', '2 servers'],
                                ['UPS', 'Double-conversion for MGC and SCADA', '1 × 30 kVA'],
                                ['Fiber Optic Network', 'Single-mode, 12-fiber trunk, OT ring', '~2 km'],
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
                                ['Level 0', 'PV panels, battery cells, genset, CTs/PTs, PCC switch', 'Energy conversion, measurement'],
                                ['Level 1', 'PV inverters, BESS PCS, genset governor/AVR, protection IEDs', 'DER control, protection'],
                                ['Level 2', 'Microgrid SCADA, HMI, power quality meters', 'Supervisory control, monitoring'],
                                ['Level 3', 'Microgrid Controller (MPC, mode manager), historian', 'Optimization, dispatch'],
                                ['Level 3.5', 'OT/IT firewall, VPN gateway', 'Cybersecurity demarcation'],
                                ['Level 4', 'Utility DERMS, market interface, asset management', 'Grid services, billing'],
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
            </Section>

            <Section title="References" id="references">
                <div className="space-y-2 text-xs text-gray-400 leading-relaxed">
                    <p>Hirsch, A., Parag, Y., &amp; Guerrero, J. (2018). Microgrids: A review of technologies, key drivers, and outstanding issues. <em>Renewable and Sustainable Energy Reviews</em>, 90, 402–411.</p>
                    <p>IEEE. (2017). <em>IEEE Std 2030.7: Standard for the specification of microgrid controllers</em>. IEEE.</p>
                    <p>National Renewable Energy Laboratory. (2020). <em>Grid-forming inverters: Research roadmap</em>. NREL/TP-5D00-73476.</p>
                </div>
            </Section>

            <Section title="See Also" id="see-also">
                <div className="flex flex-wrap gap-2">
                    {[
                        { href: '/wiki/energy', label: 'Energy Sector Hub', color: '#F59E0B' },
                        { href: '/wiki/energy/bess', label: 'Battery Energy Storage', color: '#EF4444' },
                        { href: '/wiki/energy/smart-homes', label: 'Smart Homes', color: '#06B6D4' },
                        { href: '/wiki/energy/vpp-derms', label: 'VPP / DERMS', color: '#EC4899' },
                        { href: '/wiki/energy/distribution', label: 'Distribution Facilities', color: '#3B82F6' },
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
