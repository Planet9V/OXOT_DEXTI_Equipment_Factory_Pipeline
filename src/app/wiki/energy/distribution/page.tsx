/**
 * Distribution Facilities — Deep Dive Wiki Article.
 *
 * Comprehensive TOGAF-based reference architecture for medium-voltage
 * distribution facilities (4 kV – 34.5 kV), including feeder automation,
 * FLISR, Volt-VAR optimization, DER management, and ADMS integration.
 *
 * @module wiki/energy/distribution/page
 */

export const metadata = {
    title: 'Distribution Facilities (4–34.5 kV) — Energy Wiki',
    description:
        'TOGAF reference architecture for MV distribution substations: FLISR automation, VVO, ' +
        'DER management, and ADMS integration with complete BOMs and Purdue model mapping.',
};

export default function DistributionPage() {
    return (
        <div className="max-w-5xl space-y-10">
            {/* Header */}
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]" style={{ background: '#3B82F6' }} />
                    <span className="text-xs font-mono text-gray-500">ENERGY · ELECTRICITY · DISTRIBUTION</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">Distribution Facilities</h1>
                <p className="text-sm text-gray-500 font-mono">4 kV – 34.5 kV · Medium Voltage</p>
                <p className="text-gray-400 text-base leading-relaxed max-w-3xl">
                    Distribution facilities provide the critical link between the high-voltage transmission system
                    and end-use customers through a network of substations, feeders, and automated devices.
                    Modern distribution systems incorporate Fault Location, Isolation, and Service Restoration
                    (FLISR), Volt-VAR Optimization (VVO), and Distributed Energy Resource Management Systems
                    (DERMS) to achieve resilient, efficient, and bidirectional power delivery (Short, 2014;
                    IEEE, 2018).
                </p>
            </div>

            {/* TOGAF Business Architecture */}
            <Section title="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-300 leading-relaxed">
                    The distribution business architecture addresses the transformation from passive,
                    radial networks to active, bidirectional systems capable of integrating high
                    penetrations of distributed energy resources (DERs). The proliferation of rooftop solar,
                    battery storage, and electric vehicles is fundamentally reshaping distribution operations,
                    requiring Advanced Distribution Management Systems (ADMS) that combine SCADA, DMS,
                    OMS, and DERMS into an integrated platform (EPRI, 2020).
                </p>

                <h3 className="text-sm font-semibold text-white mt-6 mb-2">Stakeholders</h3>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside">
                    <li>Distribution System Operators (DSOs) — grid reliability and DER orchestration</li>
                    <li>Utility planning and engineering departments — capacity planning and grid modernization</li>
                    <li>Utility field operations — switching, maintenance, and outage restoration</li>
                    <li>DER owners and aggregators — behind-the-meter generation and storage</li>
                    <li>Regulators — state Public Utility Commissions (PUCs), FERC Order 2222 compliance</li>
                    <li>Customers — residential, commercial, industrial end-users</li>
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
                                ['IEEE 1547', 'DER interconnection and interoperability requirements'],
                                ['IEEE C57.12', 'Distribution transformer standards — design, testing, loading guides'],
                                ['IEEE 1366', 'Reliability indices: SAIDI, SAIFI, CAIDI, MAIFI calculations'],
                                ['IEEE C37.60', 'Automatic circuit reclosers and fault interrupters'],
                                ['ANSI C84.1', 'Voltage ratings and ranges for 60 Hz systems (Range A/B)'],
                                ['IEEE 2030.7', 'Microgrid controller capabilities and functions'],
                                ['NESC (ANSI C2)', 'National Electrical Safety Code — clearances, grounding, work rules'],
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

            {/* High-Level Design */}
            <Section title="2. High-Level Design" id="high-level-design">
                <p className="text-sm text-gray-300 leading-relaxed">
                    A typical distribution substation steps down transmission voltage (69–138 kV) to medium
                    voltage (4–34.5 kV) through power transformers rated 10–100 MVA. Multiple feeders radiate
                    outward in a radial configuration, with sectionalizing and tie switches enabling network
                    reconfiguration during faults or planned maintenance. Modern stations feature a{' '}
                    <span className="text-[#3B82F6] font-medium">double-bus, double-breaker</span> arrangement
                    for the HV side and{' '}
                    <span className="text-[#3B82F6] font-medium">metal-clad switchgear</span> lineups
                    for MV feeders (Short, 2014).
                </p>

                <h3 className="text-sm font-semibold text-white mt-6 mb-2">Distribution Substation Architecture</h3>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`69/138kV Transmission Feed (2+ Lines)
    │
    ▼
HV Circuit Breakers ── Bus-Tie Breaker ── HV Bus Section 2
    │
    ▼
Power Transformer (69/13.2kV, 30MVA, ONAN)
    │
    ▼
MV Switchgear Lineup (13.2kV Metal-Clad)
    │
    ├── Feeder 1 ── Recloser ── Sectionalizers ── Dist. Points
    ├── Feeder 2 ── Recloser ── Sectionalizers ── Dist. Points
    ├── ...
    ├── Feeder N ── Recloser ── Sectionalizers ── Dist. Points
    ├── Capacitor Bank Feeder (3.6 MVAR)
    └── Station Service Transformer (1000kVA)

Tie Switches: Normally-open between feeders for FLISR reconfiguration`}</pre>
                </div>
            </Section>

            {/* Detailed Technical Description */}
            <Section title="3. Detailed Technical Description" id="technical">
                <h3 className="text-base font-semibold text-white mt-2 mb-2">3.1 Substation Equipment</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    The distribution substation houses both primary (HV/MV) and secondary (control/protection)
                    equipment. The{' '}
                    <span className="text-[#3B82F6] font-medium">power transformer</span> is the centerpiece,
                    typically with on-load tap changer (OLTC) and dual cooling modes (ONAN/ONAF).
                    Modern distribution transformers are equipped with dissolved gas analysis (DGA) monitors
                    for predictive maintenance, providing real-time monitoring of insulation condition through
                    measurement of hydrogen, methane, ethylene, and acetylene concentrations (IEEE, 2019).
                </p>
                <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside mt-3">
                    <li><span className="text-white">Power transformers</span> — 10–100 MVA, 69/13.2kV or 138/34.5kV, ONAN/ONAF, OLTC with 32 steps (±10%), DGA online monitor</li>
                    <li><span className="text-white">MV switchgear</span> — Metal-clad, vacuum interrupters, 15kV/25kV class, 25kA interrupting, bus PT/CT metering</li>
                    <li><span className="text-white">Feeder breakers</span> — Vacuum circuit breakers, 600A/1200A continuous, motorized racking, trip-free mechanism</li>
                    <li><span className="text-white">Line reclosers</span> — Single-phase and three-phase, vacuum or SF₆, 200A, 4-shot programmable, communication-enabled</li>
                    <li><span className="text-white">Sectionalizers</span> — Automatic (count-to-lock) or manual, 600A continuous, pad-mount or pole-mount</li>
                    <li><span className="text-white">Capacitor banks</span> — Fixed and switched shunt, 1.2–3.6 MVAR per bank, oil-filled power factor correction, voltage-controlled switching</li>
                    <li><span className="text-white">Voltage regulators</span> — Single-phase, 32-step OLTC, ±10% range, bi-directional for DER backfeed</li>
                </ul>

                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.2 Feeder Automation</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    <span className="text-white font-medium">Fault Location, Isolation, and Service Restoration (FLISR)</span>{' '}
                    is the signature automation function of modern distribution systems. FLISR uses fault current
                    indicators (FCIs), SCADA-controlled switches, and sectionalizing algorithms to automatically
                    detect faults, isolate the faulted section, and restore service to unfaulted sections — typically
                    within 60–120 seconds (EPRI, 2020). This reduces SAIDI (System Average Interruption
                    Duration Index) by 30–50% compared to manual restoration methods.
                </p>

                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.3 Volt-VAR Optimization (VVO)</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    <span className="text-white font-medium">VVO</span> coordinates substation OLTC, feeder voltage
                    regulators, switched capacitor banks, and DER smart inverters to maintain voltages within ANSI
                    C84.1 Range A (±5% of nominal) while minimizing losses and peak demand. The optimization
                    engine runs Model Predictive Control (MPC) algorithms with 15-minute intervals, using
                    AMI voltage measurements as feedback inputs. Conservation Voltage Reduction (CVR) targets
                    0.7–1.0 CVR factor, yielding 2–4% energy savings system-wide (Wang &amp; Wang, 2017).
                </p>

                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.4 DER Management</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    Distribution-connected DERs — rooftop solar, community storage, EV chargers — are managed
                    through DERMS, which provides hosting capacity analysis, dynamic operating envelopes,
                    curtailment dispatching, and reactive power coordination per IEEE 1547. Smart inverters
                    provide autonomous Volt-VAR and Volt-Watt response curves, which are configurable
                    remotely via IEEE 2030.5 / SunSpec Modbus interfaces (IEEE, 2018).
                </p>
            </Section>

            {/* Process Diagrams */}
            <Section title="4. Process Diagrams" id="process-diagrams">
                <h3 className="text-sm font-semibold text-white mb-2">4.1 FLISR Automation Sequence</h3>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`┌─ FAULT DETECTION ────────────────────────────────────────────┐
│ 1. Fault occurs on Feeder 3, Section B                       │
│ 2. Feeder breaker trips (instantaneous overcurrent 50)       │
│ 3. FCIs on Section B flag via SCADA                          │
├─ ISOLATION ──────────────────────────────────────────────────┤
│ 4. DMS identifies faulted section via FCI pattern analysis   │
│ 5. Open sectionalizer SW-B1 (upstream of fault)              │
│ 6. Open sectionalizer SW-B2 (downstream of fault)            │
│ 7. Verify isolation (fault indicators, confirm I=0)          │
├─ RESTORATION ────────────────────────────────────────────────┤
│ 8. Close feeder breaker → restore Section A                  │
│ 9. Close tie switch → backfeed Section C from adjacent feeder│
│ 10. Verify voltages/currents in tolerance (ANSI C84.1)       │
│ 11. TOTAL TIME: 60–120 seconds (automated)                   │
└──────────────────────────────────────────────────────────────┘`}</pre>
                </div>

                <h3 className="text-sm font-semibold text-white mt-8 mb-2">4.2 Energy Flow Paths</h3>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`Path 1: Normal Supply
  Transmission (69–138kV) → Power Transformer → MV Bus → Feeders → Loads

Path 2: DER Backfeed (Reverse Flow)
  Rooftop Solar → Smart Inverter → Service Transformer → Feeder → Substation

Path 3: Emergency Backup
  Adjacent Feeder → Tie Switch (N.O.) → Backfeed → Isolated Load Section

Path 4: Reactive Compensation
  Capacitor Banks → MV Bus / Feeder Laterals → Voltage Support

Path 5: EV Charging Cluster
  MV Feeder → Pad-Mount Transformer → EV Fast Chargers (150–350kW each)`}</pre>
                </div>

                <h3 className="text-sm font-semibold text-white mt-8 mb-2">4.3 VVO Control Loop</h3>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`┌─────────────────────────────────────────────────┐
│ AMI Voltage Measurements (15-min intervals)      │
│         │                                        │
│         ▼                                        │
│ ADMS/VVO Engine (MPC Optimizer)                  │
│         │                                        │
│    ┌────┴────┬──────────┬─────────┐              │
│    ▼         ▼          ▼         ▼              │
│  OLTC     Feeder     Capacitor  Smart Inverter   │
│  Tap      Voltage    Bank       Var Setpoints    │
│  Change   Regulator  Switch     (IEEE 1547)      │
│                                                  │
│ Objective: Min(Losses) s.t. V ∈ [0.95, 1.05] pu │
│ CVR Factor: 0.7–1.0 = 2–4% energy savings       │
└─────────────────────────────────────────────────┘`}</pre>
                </div>
            </Section>

            {/* Bill of Materials */}
            <Section title="5. Bill of Materials" id="bom">
                <p className="text-sm text-gray-400 mb-3 italic">
                    Scaled for a 100 MVA distribution substation with 10 feeders.
                </p>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Equipment Type</th>
                                <th className="text-left px-3 py-2 font-medium">Specification</th>
                                <th className="text-right px-3 py-2 font-medium">Qty</th>
                                <th className="text-left px-3 py-2 font-medium">Key Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Power Transformers', 'ONAN/ONAF, OLTC (32 steps), DGA monitor', '3', '33MVA, 69/13.2kV'],
                                ['HV Breakers', 'SF₆ or vacuum, motor-operated', '6', '69kV, 25kA'],
                                ['MV Switchgear', 'Metal-clad, vacuum interrupters', '14 panels', '15kV, 25kA'],
                                ['Feeder Breakers', 'Vacuum, motorized racking', '10', '600A, 15kV'],
                                ['Line Reclosers', '3φ vacuum, 4-shot programmable', '30', '200A, 15kV'],
                                ['Sectionalizers', 'Auto count-to-lock, SCADA enabled', '40', '600A, 15kV'],
                                ['Fault Current Indicators', 'Clamp-on, self-powered', '100', 'Adjustable trip'],
                                ['Capacitor Banks', 'Fixed + switched, oil-filled', '20', '1.2–3.6 MVAR'],
                                ['Voltage Regulators', 'Single-phase, 32-step OLTC', '15', '±10%, 250A'],
                                ['Station Service XFMR', 'MV to 480/277V', '2', '1000kVA'],
                                ['Battery Bank', 'VRLA, 125VDC', '2', '500Ah, 8hr'],
                                ['RTU/SCADA Gateway', 'Station-level data concentrator', '2', 'DNP3/IEC 104'],
                                ['Feeder IEDs', 'Multifunction protection relay', '10', '50/51/67/79'],
                                ['Fiber Optic Network', 'Single-mode, 24-fiber trunk', '~50km', '1Gbps'],
                                ['AMI Head-End', 'Smart meter data concentrator', '1', '100K endpoints'],
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

            {/* Communication Protocols */}
            <Section title="6. Communication Protocols" id="protocols">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Protocol</th>
                                <th className="text-left px-3 py-2 font-medium">Application</th>
                                <th className="text-left px-3 py-2 font-medium">Transport</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['DNP3', 'SCADA polling (feeder breakers, reclosers, cap banks)', 'TCP/IP or serial'],
                                ['IEC 61850', 'Station bus (MMS), process bus (SV)', 'Ethernet'],
                                ['GOOSE', 'Fast protection messaging (<4ms)', 'Layer 2 multicast'],
                                ['IEEE 2030.5', 'Smart inverter DER management', 'HTTPS/REST'],
                                ['OpenADR 2.0', 'Demand response event signaling', 'HTTPS/SOAP'],
                                ['Cellular (LTE-M)', 'Remote recloser/sectionalizer control', '4G/5G'],
                                ['RF Mesh (900MHz)', 'AMI meter reading, outage notification', 'IPv6 mesh'],
                            ].map(([protocol, app, transport]) => (
                                <tr key={protocol} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#3B82F6] font-medium whitespace-nowrap">{protocol}</td>
                                    <td className="px-3 py-2 text-gray-300">{app}</td>
                                    <td className="px-3 py-2 text-gray-400">{transport}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* Purdue Model */}
            <Section title="7. Purdue Model Mapping" id="purdue">
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
                                ['Level 0 — Process', 'CTs, PTs, fault indicators, capacitor switches, DER inverters', 'Measurement, switching'],
                                ['Level 1 — Basic Control', 'Recloser controllers, cap bank controllers, smart inverters', 'Local protection, Volt-VAR'],
                                ['Level 2 — Supervisory', 'Distribution SCADA, RTU, bay HMI, feeder IEDs', 'Supervisory control, alarming'],
                                ['Level 3 — Operations', 'DMS, FLISR engine, VVO optimizer, OMS, historian', 'Outage management, optimization'],
                                ['Level 3.5 — DMZ', 'Application firewalls, VPN concentrators, data diodes', 'IT/OT demarcation'],
                                ['Level 4 — Enterprise', 'ADMS/DERMS, GIS, work management, CIS, AMI head-end', 'Business integration'],
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
            </Section>

            {/* Safety & Reliability */}
            <Section title="8. Safety &amp; Reliability Systems" id="safety">
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
                                ['Arc Flash Protection', 'Arc-resistant switchgear (IEEE C37.20.7), incident energy <1.2 cal/cm² at 24 in'],
                                ['Grounding', 'Station ground mat per IEEE 80, step/touch voltage limits, GFI on 480V auxiliaries'],
                                ['Fire Suppression', 'Deluge on transformers (NFPA 15), FM200 in control room (NFPA 2001)'],
                                ['Oil Containment', 'Transformer oil retention basin, 110% capacity, oil-water separator'],
                                ['Reclosing Logic', '4-shot sequence (instantaneous, 2s, 10s, 30s) with lockout per IEEE C37.60'],
                                ['Anti-Islanding', 'Transfer trip via DNP3/GOOSE for DER disconnect during utility outage'],
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

            {/* References */}
            <Section title="References" id="references">
                <div className="space-y-2 text-xs text-gray-400 leading-relaxed">
                    <p>Electric Power Research Institute. (2020). <em>Integrated Grid: A benefit-cost framework for distribution system modernization</em>. EPRI Report 3002019484.</p>
                    <p>IEEE. (2018). <em>IEEE Std 1547-2018: Standard for interconnection and interoperability of DERs with associated electric power systems interfaces</em>. IEEE.</p>
                    <p>IEEE. (2019). <em>IEEE Std C57.104-2019: Guide for the interpretation of gases generated in mineral oil-immersed transformers</em>. IEEE.</p>
                    <p>Short, T. A. (2014). <em>Electric power distribution handbook</em> (2nd ed.). CRC Press.</p>
                    <p>Wang, Z., &amp; Wang, J. (2017). Self-healing resilient distribution systems based on sectionalization into microgrids. <em>IEEE Transactions on Power Systems</em>, 30(6), 3139–3149.</p>
                </div>
            </Section>

            {/* See Also */}
            <Section title="See Also" id="see-also">
                <div className="flex flex-wrap gap-2">
                    {[
                        { href: '/wiki/energy', label: 'Energy Sector Hub', color: '#F59E0B' },
                        { href: '/wiki/energy/transmission', label: 'Transmission Facilities', color: '#F59E0B' },
                        { href: '/wiki/energy/distribution-points', label: 'Distribution Points', color: '#10B981' },
                        { href: '/wiki/energy/microgrids', label: 'Microgrids', color: '#8B5CF6' },
                        { href: '/wiki/energy/smart-homes', label: 'Smart Homes', color: '#06B6D4' },
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
