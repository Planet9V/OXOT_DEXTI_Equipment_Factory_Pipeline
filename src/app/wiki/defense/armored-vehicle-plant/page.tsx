/**
 * Armored Vehicle Assembly Plant — Deep Dive Wiki Article.
 *
 * Comprehensive TOGAF-based reference architecture for Main Battle Tank (MBT) 
 * and Combat Vehicle manufacturing, focusing on heavy robotic welding, 
 * turret integration, and automotive assembly.
 *
 * @module wiki/defense/armored-vehicle-plant/page
 */

export const metadata = {
    title: 'Armored Vehicle Plant Reference Architecture — Defense Wiki',
    description: 'Reference architecture for Tank/Stryker manufacturing: Robotic welding, turret integration, and heavy automotive assembly.',
};

export default function ArmorPlantPage() {
    return (
        <div className="max-w-5xl space-y-10 pb-20">

            {/* ── Header ───────────────────────────────────────────────────────── */}
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]"
                        style={{ background: '#16A34A' }} />
                    <span className="text-xs font-mono text-gray-500">
                        DEFN · GROUND SYSTEMS · MFG
                    </span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">
                    Armored Vehicle Assembly Plant
                </h1>
                <p className="text-sm text-gray-500 font-mono">MBT / Stryker / AMPV Production</p>
                <p className="text-gray-400 text-base leading-relaxed max-w-3xl">
                    Combat vehicle manufacturing combines heavy industrial fabrication with precision automotive
                    assembly. Key capabilities include **robotic arc welding** of high-hardness armor steel (HH/RHA),
                    **CNC machining** of massive hull structures, and the integration of advanced **turret fire control systems**.
                </p>
            </div>

            {/* ── 1. TOGAF Business Architecture ───────────────────────────────── */}
            <Section title="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-300 leading-relaxed">
                    The facility supports the Army's **Next Generation Combat Vehicle (NGCV)** modernization priorities.
                    Production is governed by **TACOM (Tank-automotive and Armaments Command)** and relies on a
                    robust supply chain for powertrains, armor plate, and electronics.
                </p>

                <h3 className="text-sm font-semibold text-white mt-6 mb-2">Stakeholders</h3>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside">
                    <li>PEO Ground Combat Systems (GCS)</li>
                    <li>Army Contracting Command (ACC - Detroit Arsenal)</li>
                    <li>OEMs (General Dynamics Land Systems, BAE Systems)</li>
                    <li>Defense Logistics Agency (DLA)</li>
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
                                ['MIL-STD-1916', 'DoD Preferred Methods for Acceptance of Product (Quality)'],
                                ['AWS D1.1 / TACOM Weld Codes', 'Structural Welding Code - Steel / Armor'],
                                ['ATPD-2404', 'Automotive Tank Purchase Description (Environmental)'],
                                ['NGVA (STANAG 4754)', 'NATO Generic Vehicle Architecture (Electronics)'],
                                ['ISO 9001 / IATF 16949', 'Quality Management (Automotive Adaptation)'],
                            ].map(([standard, scope]) => (
                                <tr key={standard} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#16A34A] font-medium whitespace-nowrap">{standard}</td>
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
                    The plant is divided into three major zones: **Fabrication** (Hull/Turret welding), **Machining**
                    (Line boring, milling), and **Assembly** (Suspension, Powerpack, Final Integration). Conveyance
                    relies on heavy-duty **AGVs** and overhead cranes.
                </p>

                <h3 className="text-sm font-semibold text-white mt-6 mb-2">Production Line Flow</h3>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{
                        `[ Armor Plate Prep ] ──► [ Hull Fabrication ] ──► [ Hull Machining ]
 (Plasma Cut/Bevel)       (Robotic Welding)        (5-Axis Mills)
                                                         │
                                                         ▼
[ Turret Integration ] ◄── [ Paint / CARC ] ◄── [ Automotive Assy ]
 (Optics / Fire Control)    (Chemical Agent        (Suspension / Engine)
                             Resistant Coating)          │
       │                                                 ▼
       └────────────────► [ Final Test ] ──────► [ Rail / Transport ]
                          (Track Test / Rain)`
                    }</pre>
                </div>
            </Section>

            {/* ── 3. Detailed Technical Description ────────────────────────────── */}
            <Section title="3. Detailed Technical Description" id="technical">

                {/* 3.1 Fabrication */}
                <h3 className="text-base font-semibold text-white mt-2 mb-2">3.1 Fabrication & Welding</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    Hull structures require welding of thick ballistic steel. **Robotic Submerged Arc Welding (SAW)**
                    and **GMAW-P (Pulsed MIG)** are used for deep penetration and low heat input to preserve armor properties.
                </p>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside mt-2">
                    <li><span className="text-white">Robots</span> — ABB IRB 6700 / Fanuc M-900iB on linear tracks</li>
                    <li><span className="text-white">Positioners</span> — 20-Ton "Skyhook" rotators for down-hand welding</li>
                    <li><span className="text-white">Sensors</span> — Laser seam tracking (Servo-Robot)</li>
                </ul>

                {/* 3.2 Machining */}
                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.2 Heavy Machining</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    Once welded, the entire hull is machined to create precise mounting points for suspension and turret rings.
                    Massive **Gantry Mills** machine the entire vehicle chassis in a single setup.
                </p>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside mt-2">
                    <li><span className="text-white">Equipment</span> — Ingersoll MasterHead / Cincinnati Gantry</li>
                    <li><span className="text-white">Capabilities</span> — 5-Axis milling, 10m x 5m envelope</li>
                    <li><span className="text-white">Metrology</span> — On-machine probing (Renishaw)</li>
                </ul>

                {/* 3.3 Final Assembly */}
                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.3 Automotive & Turret Assembly</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    The assembly line integrates the "Powerpack" (Engine + Transmission), suspension modules, and the
                    turret. **AGVs** move the 70-ton vehicles between stations.
                </p>
            </Section>

            {/* ── 4. Process Diagrams ──────────────────────────────────────────── */}
            <Section title="4. Process Diagrams" id="process">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">4.1 Weld Cell Automation</h4>
                <div className="rounded-lg border border-white/[0.06] p-4 font-mono text-xs text-gray-300 overflow-x-auto mb-6">
                    <pre className="whitespace-pre">{
                        `[ PLC ] ──(EtherNet/IP)──► [ Robot Controller ] ──(Analog)──► [ Power Source ]
   ▲                            │                                   │
   │                            ▼                                   │
   └─────── [ Seam Tracker ] ◄──┘                                   ▼
                                                                [ Weld Torch ]`
                    }</pre>
                </div>

                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">4.2 AGV Logistics</h4>
                <div className="rounded-lg border border-white/[0.06] p-4 font-mono text-xs text-gray-300 overflow-x-auto">
                    <pre className="whitespace-pre">{
                        `[ Fleet Manager ] ──(WiFi 6)──► [ AGV Unit ] ──(Lidar)──► [ Safety Zone ]
       │                           │
       ▼                           ▼
[ MES / Schedule ]             [ Drive Motor ]
(Next Station)`
                    }</pre>
                </div>
            </Section>

            {/* ── 5. Bill of Materials ─────────────────────────────────────────── */}
            <Section title="5. Bill of Materials" id="bom">
                <p className="text-sm text-gray-400 mb-4">
                    Major capital equipment for hull fabrication and assembly.
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
                                ['Gantry Mill', '5-Axis CNC, Siemens 840D', '2', '10m x 6m Travel'],
                                ['Welding Robot', 'ABB IRB 6700, 3m Reach', '12', '200 kg Payload'],
                                ['Weld Positioner', 'Dual-axis "Skyhook"', '6', '25,000 kg cap'],
                                ['Weld Power Source', 'Lincoln Power Wave S500', '24', '500 Amps'],
                                ['AGV', 'Heavy Duty Omni-directional', '8', '80 Ton Capacity'],
                                ['Plasma Cutter', 'Hypertherm HPR800', '2', '2" Armor Plate'],
                                ['Paint Robot', 'Fanuc P-350iA', '4', 'Class 1 Div 1'],
                                ['CMM', 'Large Volume Gantry', '1', '6m x 3m x 2m'],
                                ['Crane', 'Overhead Bridge', '4', '50 Ton / 10 Ton Aux'],
                                ['Dynamometer', 'Chassis Roller Dyno', '1', '1500 HP / 80 MPH'],
                                ['PLC', 'Rockwell GuardLogix', '10', 'SIL 3 Safety'],
                                ['Fume Extraction', 'Central Filter Unit', '1', '50,000 CFM'],
                                ['Induction Heater', 'Fastener Heating', '4', '50 kW'],
                            ].map(([item, spec, qty, rating]) => (
                                <tr key={item}>
                                    <td className="py-2 px-3 font-medium text-white">{item}</td>
                                    <td className="py-2 px-3 text-gray-400">{spec}</td>
                                    <td className="py-2 px-3">{qty}</td>
                                    <td className="py-2 px-3 text-[#16A34A]">{rating}</td>
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
                                <td className="py-2 px-3">SAP, Teamcenter</td>
                                <td className="py-2 px-3">Supply Chain, Config Mgmt</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-3 text-gray-500 font-mono">L3 Operations</td>
                                <td className="py-2 px-3">FactoryTalk Production (MES)</td>
                                <td className="py-2 px-3">Build Records, Serial Tracking</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-3 text-gray-500 font-mono">L2 Control</td>
                                <td className="py-2 px-3">FactoryTalk View SE (SCADA)</td>
                                <td className="py-2 px-3">EtherNet/IP, CIP Motion</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-3 text-gray-500 font-mono">L1 Device</td>
                                <td className="py-2 px-3">Robot Controllers, CNCs</td>
                                <td className="py-2 px-3">Weld Param Control, Toolpath</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-3 text-gray-500 font-mono">L0 Process</td>
                                <td className="py-2 px-3">Torches, Motors, Limit Switches</td>
                                <td className="py-2 px-3">Arc Voltage, Encoder Feeback</td>
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
                                ['Shielding Gas', '98/2 Ar/CO2 Bulk Storage', '6,000 Gallon Tank'],
                                ['Cooling Water', 'Weld Torch Cooling Loop', '150 GPM / 100 PSI'],
                                ['Paint Kitchen', 'CARC Paint Mixing/Circulation', 'Strict Mix Ratio'],
                                ['Rain Test', 'Water Intrusion Testing', 'High Volume Spray'],
                                ['Test Track', 'On-site mobility verification', 'Slopes, Obstacles'],
                            ].map(([sys, desc, spec]) => (
                                <tr key={sys}>
                                    <td className="py-2 px-3 font-medium text-white">{sys}</td>
                                    <td className="py-2 px-3 text-gray-400">{desc}</td>
                                    <td className="py-2 px-3 text-[#16A34A]">{spec}</td>
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
                        { medium: 'Electrical', spec: '480V High Amperage (Welding)', icon: '⚡' },
                        { medium: 'Gases', spec: 'Argon, Helium, CO2', icon: '⛽' },
                        { medium: 'Diesel', spec: 'Fuel for Vehicle Fill', icon: '🛢️' },
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
                    A key feature is the **Digital Twin** of the hull. Weld data (amperage, voltage, travel speed)
                    is recorded for every seam and mapped to the vehicle serial number in the Quality Database.
                </p>
                <div className="rounded-lg border border-white/[0.06] p-6 font-mono text-xs text-gray-300 overflow-x-auto bg-white/[0.02]">
                    <pre className="whitespace-pre leading-relaxed">{
                        `[ Weld Robot ] ──► [ Cell Controller ] ──► [ Weld Monitor ]
      │                    │                     │
      ▼                    ▼                     ▼
[ Real-time Adj ]    [ PLC Logic ]       [ SQL Database ]
(Seam Tracking)      (Cycle Time)        (Weld Certificate)
                                                 │
                                                 ▼
                                         [ e-Log Book ]
                                         (Vehicle History)`
                    }</pre>
                </div>
            </Section>

            {/* ── 10. References ───────────────────────────────────────────────── */}
            <Section title="10. References" id="references">
                <ul className="space-y-2 text-xs text-gray-500 font-mono">
                    <li>• US Army. (2020). <em>Modernization Strategy: Next Generation Combat Vehicle (NGCV).</em></li>
                    <li>• AWS. (2015). <em>D1.1/D1.1M: Structural Welding Code - Steel.</em> American Welding Society.</li>
                    <li>• NATO. (2021). <em>STANAG 4754: NATO Generic Vehicle Architecture (NGVA).</em></li>
                    <li>• ARC Advisory Group. (2019). <em>Best Practices in Heavy Machinery Manufacturing.</em></li>
                    <li>• General Dynamics Land Systems. (2018). <em>Abrams Tank Production Capabilities.</em></li>
                    <li>• RIA. (2014). <em>R15.06: Industrial Robots and Robot Systems - Safety Requirements.</em></li>
                </ul>
            </Section>

            {/* ── See Also ─────────────────────────────────────────────────────── */}
            <Section title="See Also" id="see-also">
                <div className="flex flex-wrap gap-3">
                    {[
                        { label: 'Defense Sector Hub', href: '/wiki/defense', color: '#64748B' },
                        { label: 'Manufacturing Sector', href: '/wiki/manufacturing', color: '#F97316' },
                        { label: 'Automotive (Civilian)', href: '/wiki/transportation/automotive', color: '#EF4444' },
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
