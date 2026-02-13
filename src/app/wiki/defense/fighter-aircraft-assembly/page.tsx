/**
 * Fighter Aircraft Final Assembly — Deep Dive Wiki Article.
 *
 * Comprehensive TOGAF-based reference architecture for 5th/6th Generation 
 * Fighter Aircraft manufacturing, focusing on laser-guided mating, robotic 
 * drilling, and stealth coating application.
 *
 * @module wiki/defense/fighter-aircraft-assembly/page
 */

export const metadata = {
    title: 'Fighter Aircraft Final Assembly Reference Architecture — Defense Wiki',
    description: 'Reference architecture for F-35/NGAD assembly lines: EMASS mating, robotic drilling, and LO coating application.',
};

export default function FighterAssemblyPage() {
    return (
        <div className="max-w-5xl space-y-10 pb-20">

            {/* ── Header ───────────────────────────────────────────────────────── */}
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]"
                        style={{ background: '#3B82F6' }} />
                    <span className="text-xs font-mono text-gray-500">
                        DEFN · AEROSPACE · ASSEMBLY
                    </span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">
                    Fighter Aircraft Final Assembly
                </h1>
                <p className="text-sm text-gray-500 font-mono">5th/6th Gen Air Dominance · Stealth Integration</p>
                <p className="text-gray-400 text-base leading-relaxed max-w-3xl">
                    Modern fighter aircraft assembly (e.g., F-35, NGAD) represents the pinnacle of
                    precision manufacturing, utilizing **laser-tracked mating systems**, **robotic drilling**,
                    and **Low Observable (LO)** coating application. The facility operates as a pulsed
                    assembly line where digital threads connect design engineering directly to shop floor
                    metrology systems, ensuring tolerances of less than 0.005 inches over 50-foot structures.
                </p>
            </div>

            {/* ── 1. TOGAF Business Architecture ───────────────────────────────── */}
            <Section title="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-300 leading-relaxed">
                    The business architecture is driven by the **Adaptive Acquisition Framework**, requiring
                    manufacturing systems that can support high production rates (Rate 156/year) while maintaining
                    exacting quality standards for stealth performance.
                </p>

                <h3 className="text-sm font-semibold text-white mt-6 mb-2">Stakeholders</h3>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside">
                    <li>Program Executive Office (PEO) — F-35 / NGAD</li>
                    <li>Prime Contractor (Lockheed Martin, Northrop Grumman)</li>
                    <li>Defense Contract Management Agency (DCMA) — Quality Assurance</li>
                    <li>International Partners / FMS Customers</li>
                    <li>Supply Chain Partners (Tier 1: Fuselage/Wing, Tier 2: Systems)</li>
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
                                ['AS9100D', 'Quality Management Systems for Aviation, Space, and Defense'],
                                ['NAS 410', 'Certification of Nondestructive Testing Personnel'],
                                ['ITAR (22 CFR 120-130)', 'International Traffic in Arms Regulations (Export Control)'],
                                ['NIST SP 800-171', 'Protecting Controlled Unclassified Information (CUI)'],
                                ['ANSI/RIA R15.06', 'Industrial Robot Safety Standards'],
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

            {/* ── 2. High-Level Design ─────────────────────────────────────────── */}
            <Section title="2. High-Level Design" id="design">
                <p className="text-sm text-gray-300 leading-relaxed">
                    The facility design centers on the **Electronic Mate and Alignment System (EMASS)**, which uses
                    laser trackers and electromechanical positioners to join fuselage sections without fixed tooling
                    jigs. This "jigless" approach reduces cost and increases flexibility.
                </p>

                <h3 className="text-sm font-semibold text-white mt-6 mb-2">Assembly Line Flow</h3>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{
                        `[ Component Receiving ]
       │
       ▼
[ Mate & Align (EMASS) ] ◄── [ Laser Metrology ]
       │                     (Leica AT960 Trackers)
       ▼
[ Robotic Drilling ] ──────► [ Fastener Install ]
       │
       ▼
[ Systems Integration ] ───► [ Flight Control Check ]
       │
       ▼
[ LO Coating Booths ] ─────► [ Final Finish / Weigh ]
       │
       ▼
[ Flight Line / Deliv. ]`
                    }</pre>
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">
                    Figure 1. High-level assembly flow emphasizing the metrology-assisted mating process.
                </p>
            </Section>

            {/* ── 3. Detailed Technical Description ────────────────────────────── */}
            <Section title="3. Detailed Technical Description" id="technical">

                {/* 3.1 EMASS */}
                <h3 className="text-base font-semibold text-white mt-2 mb-2">3.1 Electronic Mate & Alignment (EMASS)</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    The EMASS station replaces massive steel tooling towers. Three fuselage sections (Forward, Center, Aft)
                    are held by **16 electromechanical positioners**. Laser trackers measure hundreds of key features,
                    and the control system adjusts the positioners in 6-DOF to achieve perfect alignment (±0.002 in)
                    before mating.
                </p>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside mt-2">
                    <li><span className="text-white">Positioners</span> — 3-axis jacks with load cells (50 ton capacity)</li>
                    <li><span className="text-white">Metrology</span> — Leica Absolute Tracker AT960 with T-Mac sensors</li>
                    <li><span className="text-white">Controller</span> — Siemens SIMATIC S7-1500 Fail-safe PLC</li>
                </ul>

                {/* 3.2 Robotic Drilling */}
                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.2 Automated Drilling & Fastening</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    After mating, **KUKA KR Quantec robots** perform drilling and countersinking for thousands of fasteners.
                    Vision systems locate skin pilot holes, and the end-effector applies precise pressure to prevent
                    composite delamination.
                </p>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside mt-2">
                    <li><span className="text-white">Robotics</span> — KUKA KR 300 R2500 ultra (high stiffness)</li>
                    <li><span className="text-white">End-Effectors</span> — Multi-function drill/countersink/inspect heads</li>
                    <li><span className="text-white">Safety</span> — Light curtains and area scanners (Sick microScan3)</li>
                </ul>

                {/* 3.3 LO Coating */}
                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.3 Low Observable (LO) Application</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    Robotic gantries apply Radar Absorbent Material (RAM) coatings. The booths require precise
                    environmental control (Temp ±1°F, RH ±3%) to ensure proper curing chemistry.
                </p>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside mt-2">
                    <li><span className="text-white">Applicators</span> — Fanuc P-250iB paint robots</li>
                    <li><span className="text-white">Environment</span> — Down-draft airflow (100 fpm) with VOC abatement</li>
                    <li><span className="text-white">Verification</span> — Terahertz coating thickness measurement</li>
                </ul>
            </Section>

            {/* ── 4. Process Diagrams ──────────────────────────────────────────── */}
            <Section title="4. Process Diagrams" id="process">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">4.1 Metrology Feedback Loop</h4>
                <div className="rounded-lg border border-white/[0.06] p-4 font-mono text-xs text-gray-300 overflow-x-auto mb-6">
                    <pre className="whitespace-pre">{
                        `[ Laser Tracker ] ──(Data)──► [ Metrology Server ] ──(Vector)──► [ PLC/Motion ]
       ▲                                                                 │
       │                                                                 │
       └────────────────── (Physical Move) ──────────────────────────────┘`
                    }</pre>
                </div>

                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">4.2 Digital Thread Data Flow</h4>
                <div className="rounded-lg border border-white/[0.06] p-4 font-mono text-xs text-gray-300 overflow-x-auto">
                    <pre className="whitespace-pre">{
                        `[ PLM (CATIA) ] ──► [ MES (Solumina) ] ──► [ Shop Floor HMI ]
                                                   │
                                                   ▼
                                         [ CNC/Robot Controller ]
                                                   │
                                                   ▼
[ As-Built Record ] ◄──(Quality Data)─── [ Process Execution ]`
                    }</pre>
                </div>
            </Section>

            {/* ── 5. Bill of Materials ─────────────────────────────────────────── */}
            <Section title="5. Bill of Materials" id="bom">
                <p className="text-sm text-gray-400 mb-4">
                    Typical equipment list for a single EMASS mating cell and associated drill station.
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
                                ['Laser Tracker', 'Leica AT960, 6-DOF, 160m range', '4', '±10 µm + 5 µm/m'],
                                ['Positioner Jack', 'Servo-electric, 3-axis', '16', '10 Ton / Jack'],
                                ['Industrial Robot', 'KUKA KR 300 R2500 ultra, 6-axis', '2', '300 kg Payload'],
                                ['Robot Linear Track', 'Gudel Track Motion TMF-4', '2', '20 Meters Length'],
                                ['PLC Controller', 'Siemens S7-1500F', '1', 'Fail-Safe, 5ms Scan'],
                                ['HMI Panel', 'Siemens Comfort Panel TP1200', '2', '12" Touch, IP65'],
                                ['Vacuum Pump', 'Rotary Vane, Dual Stage', '4', '40 CFM @ 29" Hg'],
                                ['Drill End-Effector', 'Electro-Impact, Auto-feed', '2', '20,000 RPM Spindle'],
                                ['Laser Projector', 'Virtek Iris 3D', '8', '±0.010" Accuracy'],
                                ['Safety Scanner', 'Sick microScan3, EtherNet/IP', '4', '9m Protective Field'],
                                ['Light Curtain', 'Keyence GL-R Series', '8', 'Level 4 Safety'],
                                ['Servo Drive', 'Siemens SINAMICS S120', '20', '5-50 kW Multi-axis'],
                                ['Air Compressor', 'Rotary Screw, Oil-Free', '1', '500 CFM @ 125 PSI'],
                                ['Dust Collector', 'Explosion Proof (Alum/Ti)', '1', '5000 CFM'],
                                ['Power Supply unit', '400Hz Frequency Converter', '1', '90 kVA'],
                                ['Torque Tool', 'DC Electric, Transducerized', '10', '5-50 Nm, ±2%'],
                                ['Paint Robot', 'Fanuc P-250iB', '2', '15kg Payload, Class 1 Div 1'],
                            ].map(([item, spec, qty, rating]) => (
                                <tr key={item}>
                                    <td className="py-2 px-3 font-medium text-white">{item}</td>
                                    <td className="py-2 px-3 text-gray-400">{spec}</td>
                                    <td className="py-2 px-3">{qty}</td>
                                    <td className="py-2 px-3 text-[#3B82F6]">{rating}</td>
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
                                <td className="py-2 px-3">SAP ERP, Teamcenter PLM</td>
                                <td className="py-2 px-3">BOM Mgmt, Eng Change Orders</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-3 text-gray-500 font-mono">L3.5 IDMZ</td>
                                <td className="py-2 px-3">CMMC Proxy, Data Diode</td>
                                <td className="py-2 px-3">Secure File Transfer, Patch Repos</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-3 text-gray-500 font-mono">L3 Operations</td>
                                <td className="py-2 px-3">Solumina MES, Quality DB</td>
                                <td className="py-2 px-3">Electronic Work Instructions (EWI)</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-3 text-gray-500 font-mono">L2 Control</td>
                                <td className="py-2 px-3">Cell PLCs, Metrology Server</td>
                                <td className="py-2 px-3">EtherNet/IP, OPC UA, PROFINET</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-3 text-gray-500 font-mono">L1 Device</td>
                                <td className="py-2 px-3">Robot Controllers, Servo Drives</td>
                                <td className="py-2 px-3">Motion Control, Safety I/O</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-3 text-gray-500 font-mono">L0 Process</td>
                                <td className="py-2 px-3">Motors, Sensors, Lasers</td>
                                <td className="py-2 px-3">Physical Actuation, Sensing</td>
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
                                ['Overhead Cranes', 'Heavy lift for wing/engine install', '50 Ton, Bridge & Gantry'],
                                ['Hydraulic Power', 'Central hydraulics for test stands', '3000 PSI, 100 GPM'],
                                ['Compressed Air', 'Shop air for pneumatic tools', '125 PSI, Dewpoint -40°F'],
                                ['Fire Suppression', 'Deluge for hangars, Clean agent for electronics', 'AFFF Foam / FM-200'],
                                ['Frequency Converters', 'Aircraft ground power', '400 Hz Central System'],
                                ['FOD Control', 'Debris monitoring and barrier systems', 'FOD Barriers, Sweepers'],
                            ].map(([sys, desc, spec]) => (
                                <tr key={sys}>
                                    <td className="py-2 px-3 font-medium text-white">{sys}</td>
                                    <td className="py-2 px-3 text-gray-400">{desc}</td>
                                    <td className="py-2 px-3 text-[#3B82F6]">{spec}</td>
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
                        { medium: 'Electrical', spec: '480V 3ph (Plant), 115V 400Hz (Aircraft)', icon: '⚡' },
                        { medium: 'Pneumatic', spec: '125 PSI Clean Dry Air', icon: '💨' },
                        { medium: 'Hydraulic', spec: 'Mil-H-5606 / Skydrol Distribution', icon: '💧' },
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
                    The assembly line utilizes a **Model-Based Enterprise (MBE)** approach. The 3D CAD model
                    is the single source of truth, driving laser projectors and CMM inspections directly.
                </p>
                <div className="rounded-lg border border-white/[0.06] p-6 font-mono text-xs text-gray-300 overflow-x-auto bg-white/[0.02]">
                    <pre className="whitespace-pre leading-relaxed">{
                        `[ Engineering ]     [ Manufacturing ]     [ Quality ]
      │                    │                   │
      ▼                    ▼                   ▼
[ 3D MBD Model ] ──► [ ERP / MES ] ──────► [ AS9102 FAI ]
      │                    │                   ▲
      │                    ▼                   │
      └────────────► [ Machine HMI ] ──► [ Inspection Data ]
                           │
                           ▼
                   [ PLC / Drive ]
                           │
                           ▼
                   [ Motor / Robot ]`
                    }</pre>
                </div>
            </Section>

            {/* ── 10. References ───────────────────────────────────────────────── */}
            <Section title="10. References" id="references">
                <ul className="space-y-2 text-xs text-gray-500 font-mono">
                    <li>• Lockheed Martin. (2023). <em>F-35 Lightning II Production Processes: The Moving Line.</em></li>
                    <li>• SAE International. (2018). <em>AS9100D: Quality Management Systems - Requirements for Aviation, Space and Defense Organizations.</em></li>
                    <li>• NIST. (2020). <em>SP 800-171 Rev. 2: Protecting Controlled Unclassified Information in Nonfederal Systems.</em></li>
                    <li>• KUKA Robotics. (2022). <em>Robotic Drilling and Fastening in Aerospace Assembly.</em></li>
                    <li>• Leica Geosystems. (2021). <em>Laser Tracker Applications in Airframe Assembly.</em></li>
                    <li>• DoD. (2019). <em>Digital Engineering Strategy.</em> Office of the Deputy Assistant Secretary of Defense for Systems Engineering.</li>
                </ul>
            </Section>

            {/* ── See Also ─────────────────────────────────────────────────────── */}
            <Section title="See Also" id="see-also">
                <div className="flex flex-wrap gap-3">
                    {[
                        { label: 'Defense Sector Hub', href: '/wiki/defense', color: '#64748B' },
                        { label: 'Defense Electronics Fab', href: '/wiki/defense/electronics-fab', color: '#A855F7' },
                        { label: 'Manufacturing Sector', href: '/wiki/manufacturing', color: '#F97316' },
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
