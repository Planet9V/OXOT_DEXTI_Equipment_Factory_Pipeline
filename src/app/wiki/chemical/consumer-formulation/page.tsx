/**
 * Consumer Chemical Formulation — Deep Dive Wiki Article.
 *
 * Comprehensive TOGAF-based reference architecture for High-Speed Consumer
 * Chemical Formulation & Packaging (Detergents, Personal Care). Features
 * PackML (ISA-TR88) state models, continuous in-line blending, and OEE
 * optimization logic.
 *
 * @module wiki/chemical/consumer-formulation/page
 */

export const metadata = {
    title: 'Consumer Chemical Formulation — Chemical Sector Wiki',
    description:
        'TOGAF reference architecture for Consumer Chemical Formulation: PackML automation, high-speed filling lines, OEE optimization, and hygienic design.',
};

export default function ConsumerFormulationPage() {
    return (
        <div className="max-w-5xl space-y-10">
            {/* Header */}
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div
                        className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]"
                        style={{ background: '#F97316' }}
                    />
                    <span className="text-xs font-mono text-gray-500">
                        CHEM · CONSUMER PRODUCTS · FMCG
                    </span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">
                    Consumer Chemical Formulation
                </h1>
                <p className="text-sm text-gray-500 font-mono">PackML · High Speed · Blending · OEE</p>
                <p className="text-gray-400 text-base leading-relaxed max-w-3xl">
                    High-volume production of cleaning agents, cosmetics, and personal care products bridges
                    chemical processing and discrete manufacturing. The architecture focuses on <span className="text-[#F97316] font-medium">Speed</span> (units/minute)
                    and <span className="text-[#F97316] font-medium">Availability</span> (OEE). Unlike upstream chemical plants,
                    these facilities are heavily discrete, utilizing <span className="text-white font-medium">PackML (ISA-TR88)</span> state
                    models to synchronize fillers, cappers, labelers, and case packers into cohesive high-speed lines.
                </p>
            </div>

            {/* TOGAF Business Architecture */}
            <Section title="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-300 leading-relaxed">
                    The business driver is <span className="text-white font-medium">Cost Leadership</span> and <span className="text-white font-medium">Mass Customization</span>.
                    Margins are thin; profitability depends on maximizing Overall Equipment Effectiveness (OEE) and minimizing
                    changeover times (SMED) to handle diverse SKU portfolios (different bottle sizes, scents, labels).
                </p>

                <h3 className="text-sm font-semibold text-white mt-6 mb-2">Stakeholders</h3>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside">
                    <li>FMCG Giants (P&G, Unilever, Henkel, SC Johnson)</li>
                    <li>Contract Packers (Co-Man / Co-Pack)</li>
                    <li>Retailers (Walmart, Amazon - demanding On-Time-In-Full OTIF)</li>
                    <li>Machine Builders (OEMs) (Krones, Tetra Pak, Sidel)</li>
                    <li>Marketing (Frequent packaging changes)</li>
                </ul>

                <h3 className="text-sm font-semibold text-white mt-6 mb-2">Regulatory & Standards Framework</h3>
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
                                ['ISA-TR88 (PackML)', 'Packaging Machine Language (State Models & Data Tags)'],
                                ['OMAC', 'Organization for Machine Automation and Control (Implementation Guidelines)'],
                                ['FDA 21 CFR 111 / 210', 'cGMP for Dietary Supplements / Drugs (Hand Sanitizers, Sunscreen)'],
                                ['ANSI/PMMI B155.1', 'Safety Requirements for Packaging Machinery'],
                                ['ISO 13849-1', 'Safety Monitoring of Machinery (PL a-e)'],
                                ['EU Machinery Dir.', '2006/42/EC (CE Marking for skids)'],
                            ].map(([standard, scope]) => (
                                <tr key={standard} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#F97316] font-medium whitespace-nowrap">{standard}</td>
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
                    The facility splits into <span className="text-[#F97316] font-medium">Making</span> (Formulation/Blending) and
                    <span className="text-[#F97316] font-medium">Packing</span> (Filling Lines).
                    Making involves continuous in-line mixing or large batch blending. Packing involves high-speed rotary
                    equipment. A buffer tank farm decouples the two. Automation moves from Process Control (DCS/PLC) in Making
                    to Motion Control (Servos/Robotics) in Packing.
                </p>

                <h3 className="text-sm font-semibold text-white mt-6 mb-2">Line Layout Diagram</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{` RAW MATERIALS (Surfactants, Water, Perfume)
        │
        ▼
 [MAKING / BLENDING SYSTEM] ◄── In-Line Static Mixers / Homogenizers
        │ (Batch or Continuous)
        ▼
   [BUFFER TANKS]
        │
        ▼
   [FILLER BLOCK] ──► [CAPPER] ──► [LABELER] ──► [CHECKWEIGHER]
   (Rotary Monoblock)    │            │             │ (Rejects)
                         │            ▼             ▼
                     [INDUCT. SEAL]  [VISION QC]   [X-RAY / METAL]
                                      │
                                      ▼
   [CASE PACKER] ◄── [CARTON ERECT]  [LASER CODER]
        │
        ▼
   [PALLETIZER] ──► [STRETCH WRAP] ──► [WAREHOUSE / AGV]`}</pre>
                </div>
            </Section>

            {/* Detailed Technical Description */}
            <Section title="3. Detailed Technical Description" id="technical">
                {/* 3.1 Blending Technologies */}
                <h3 className="text-base font-semibold text-white mt-2 mb-2">3.1 Blending (Making)</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    Shift from batch to continuous: Modern plants use mass flow meters and static mixers to blend
                    ingredients in-pipe just before the filler, reducing tankage and waste.
                </p>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside mt-2">
                    <li><strong>Continuous:</strong> Coriolis meters control ratio loops. Static mixers or high-shear in-line homogenizers.</li>
                    <li><strong>Late Stage Diff:</strong> Perfume/Dye injection at the very end to allow rapid changeover.</li>
                    <li><strong>Pigging:</strong> Product recovery systems use projectiles (pigs) to push product through lines.</li>
                </ul>

                {/* 3.2 Filling & Packaging */}
                <h3 className="text-base font-semibold text-white mt-6 mb-2">3.2 Filling & Packaging (Packing)</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    High-speed rotary machines (&gt;300 bpm). Systems are electronically synchronized (E-Gearing).
                    Hygiene is critical (Hygienic Design) to prevent microbial growth.
                </p>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside mt-2">
                    <li><strong>Fillers:</strong> Flow meter (Mag/Mass) or Weigh fillers. Clean-In-Place (CIP) capable.</li>
                    <li><strong>Cappers:</strong> Servo torque control to prevent leaks or crushed caps.</li>
                    <li><strong>Robotics:</strong> Delta robots for pick-and-place (case packing); Articulated arms for palletizing.</li>
                </ul>

                {/* 3.3 Production Intelligence */}
                <h3 className="text-base font-semibold text-white mt-6 mb-2">3.3 Production Intelligence (OEE)</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    Real-time monitoring of Availability, Performance, and Quality. The &quot;V-Graph&quot; visualizes line speed
                    bottlenecks. Root Cause Analysis (RCA) tools identify micro-stops (jams, sensor faults).
                </p>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside mt-2">
                    <li><strong>PackML States:</strong> Execute, Hold, Suspended, Aborted, Stopped.</li>
                    <li><strong>Data:</strong> Standardized OEE calculation (e.g., stops &lt; 5 mins = minor stop).</li>
                </ul>
            </Section>

            {/* Process Diagrams */}
            <Section title="4. Process Diagrams" id="process-diagrams">
                {/* 4.1 PackML State Model */}
                <h3 className="text-sm font-semibold text-white mb-2">4.1 PackML State Model (Simplified)</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`
          ┌──────── [STOPPED] ◄──────┐
          │             │ (Reset)    │
     (Start)            ▼            │ (Abort)
          │        [RESETTING]       │
          ▼             │            │
       [IDLE] ──────► [STARTING]     │
          │             │            │
          │             ▼            │
          │        [EXECUTING] ──────┼────► [ABORTED]
          │        (Producing)       │         ▲
          │           │   ▲          │         │ (Clear Fault)
          │   (Hold)  │   │          ▼         │
          └─────► [HOLDING]      [ABORTING] ───┘
                      │
                      ▼
                   [HELD]
`}</pre>
                </div>

                {/* 4.2 Electronic Gearing */}
                <h3 className="text-sm font-semibold text-white mt-6 mb-2">4.2 Electronic Axis Synchronization (Virtual Master)</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`
   [VIRTUAL MASTER AXIS] (Software Clock Pulse)
           │
           ├───► [Servo Drive A] (Infeed Screw)  ── Ratio 1:1
           │
           ├───► [Servo Drive B] (Main Carousel) ── Ratio 1:1
           │
           ├───► [Servo Drive C] (Outfeed Star)  ── Ratio 1:1
           │
           └───► [Servo Drive D] (Capper)        ── Cam Profile
`}</pre>
                </div>
            </Section>

            {/* Bill of Materials */}
            <Section title="5. Bill of Materials" id="bom">
                <p className="text-sm text-gray-400 mb-3 italic">
                    Typical BoM for a High-Speed Liquid Packing Line (300 ppm).
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
                                ['Rotary Filler', '36-head flow meter filler, CIP capable', '1', '350 bpm'],
                                ['Rotary Capper', '12-head servo torque capper', '1', '350 bpm'],
                                ['Labeler', 'Rotary pressure sensitive / Cold glue', '1', 'Duel reel auto-splice'],
                                ['Case Packer', 'Robotic top loader or Side load', '1', '40 cases/min'],
                                ['Palletizer', 'High level layer or Robot arm', '1', '60 cases/min'],
                                ['Vision System', 'Camera inspection (Cap skew, Fill level)', '4', 'Deep Learning OCR'],
                                ['Checkweigher', 'Dynamic strain gauge belt', '1', '+/- 0.5g'],
                                ['Metal Detector', 'Tunnel type / X-Ray combo', '1', 'Fe/Non-Fe/SS'],
                                ['Laser Coder', 'CO2 Laser for batch/date code', '2', 'Vector scribe'],
                                ['Conveyor System', 'Tabletop chain, low friction', '200m', 'Variable speed'],
                                ['Mixing Tanks', 'SS 316L, Anchor agitator, Heating jacket', '4', '10,000 L'],
                                ['In-Line Mixer', 'High Shear Rotor/Stator', '2', '50 m³/h'],
                                ['Pigging System', 'Launch/Receive stations, Compressed Air', '2', 'Product Recovery'],
                                ['CIP Skid', '3-Tank (Water, Caustic, Sanitizer)', '1', 'Auto-sequence'],
                                ['Servo Motors', 'Synchronous AC Servos', '50+', 'IP65/IP69K'],
                                ['HMI Panels', 'Touchscreen (PackML Interface)', '6', '15-inch IP65'],
                                ['Line PLC', 'Motion Controller + Safety PLC', '2', 'Siemens/Rockwell'],
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
                                ['Level 0 — Process', 'Servos, Photoeyes, Encoders, Solenoids', 'IO-Link, 24VDC, Drive-CLiQ'],
                                ['Level 1 — Control', 'Machine PLCs, Motion Controllers, Safety Cards', 'Profinet IRT, EtherNet/IP CIP Motion'],
                                ['Level 2 — Supervisory', 'Line SCADA, OEE Dashboard, Andon Boards', 'Pack Tags (PackML) aggregation'],
                                ['Level 3 — Operations', 'WMS (Warehouse), Scheduling, Track & Trace', 'OPC UA, MQTT'],
                                ['Level 3.5 — DMZ', 'Remote Maintenance (VPN), Cloud Analytics', 'Secure Gateway'],
                                ['Level 4 — Enterprise', 'ERP (Orders), PLM (Label/Artwork Data)', 'SOAP/REST APIs'],
                            ].map(([level, components, protocols]) => (
                                <tr key={level} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#F97316] font-medium whitespace-nowrap">{level}</td>
                                    <td className="px-3 py-2 text-gray-300">{components}</td>
                                    <td className="px-3 py-2 text-gray-400">{protocols}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
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
                                ['Compressed Air', 'Pneumatic cylinders, Air blow-off', '6 bar, Filtered/Dried'],
                                ['Vacuum', 'Label application, Case erection pickups', 'Generators / Central'],
                                ['Glues / Adhesives', 'Hot melt tank for case sealing', '160°C Application'],
                                ['Process Water', 'Ingredient water for recipes', 'RO / DI Quality'],
                                ['Dust Extraction', 'Powder handling (if applicable)', 'ATEX Rated'],
                                ['Lubrication', 'Conveyor lubrication (Dry/Wet)', 'Automatic dosing'],
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

            {/* In-Line Blending Diagram */}
            <Section title="8. In-Line Blending Concept" id="blending">
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`
Water ──────[MassFlow]─────[Valve]────┐
                                      │
Surfactant ─[MassFlow]─────[Valve]────┼───[Static Mixer]───┐
                                      │                    │
Additive ───[MassFlow]─────[Valve]────┘                    │
                                                           ▼
                                                         To Filler
`}</pre>
                </div>
            </Section>

            {/* Data Flow Architecture */}
            <Section title="9. Data Flow Architecture" id="data-flow">
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`┌─────────────────────────────────────────────────────────────┐
│ Enterprise Layer (L4)                                       │
│   Production Order (Quantity, SKU) ──► Line Scheduler       │
└──────▲──────────────────────────────────────────────────────┘
       │
┌──────▼──────────────────────────────────────────────────────┐
│ Operations Layer (L3)                                       │
│   Serialization Manager (Track & Trace codes)               │
│   OEE Data Collector (Availability, Perf, Quality)          │
└──────▲──────────────────────────────────────────────────────┘
       │ OPC UA (PackTags)
┌──────▼──────────────────────────────────────────────────────┐
│ Control Layer (L1-L2) - Line Controller                     │
│   Process: Execute / Hold / Abort                           │
│   Data: CurrentSpeed, TotalCount, DefectCount               │
└──────▲──────────────────────────────────────────────────────┘
       │ Real-Time Ethernet (Profinet IRT / EtherCAT)
┌──────▼──────────────────────────────────────────────────────┐
│ Field Layer (L0)                                            │
│   Servo Drives (Position/Torque), Vision Cameras            │
└─────────────────────────────────────────────────────────────┘`}</pre>
                </div>
            </Section>

            {/* References */}
            <Section title="10. References" id="references">
                <div className="space-y-2 text-xs text-gray-400 leading-relaxed">
                    <p>ISA. (2010). <em>ISA-TR88.00.02-2015 Machine and Unit States: An Implementation Example of ISA-88</em>. ISA.</p>
                    <p>OMAC. (2022). <em>PackML Implementation Guide</em>. Organization for Machine Automation and Control.</p>
                    <p>PMMI. (2020). <em>Packaging Machinery Handbook</em>. Packaging Machinery Manufacturers Institute.</p>
                    <p>Nakajima, S. (1988). <em>Introduction to TPM: Total Productive Maintenance</em>. Productivity Press.</p>
                    <p>ISO. (2011). <em>ISO 13849-1: Safety of machinery – Safety-related parts of control systems</em>. ISO.</p>
                </div>
            </Section>

            {/* See Also */}
            <Section title="See Also" id="see-also">
                <div className="flex flex-wrap gap-2">
                    {[
                        { href: '/wiki/chemical', label: 'Chemical Sector Hub', color: '#EF4444' },
                        { href: '/wiki/chemical/batch-processing', label: 'Batch Processing', color: '#8B5CF6' },
                        { href: '/wiki/dexpi/equipment-classes', label: 'DEXPI Equipment Classes', color: '#F97316' },
                        { href: '/wiki/sectors/MANU', label: 'Critical Manufacturing', color: '#F59E0B' },
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
