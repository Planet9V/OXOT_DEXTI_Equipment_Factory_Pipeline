/**
 * Distribution Points — Deep Dive Wiki Article.
 *
 * Comprehensive TOGAF-based reference architecture for last-mile
 * distribution points, including pole-top and pad-mount transformers,
 * switching cabinets, and distribution transformer monitoring (DTM).
 *
 * @module wiki/energy/distribution-points/page
 */

export const metadata = {
    title: 'Distribution Points (Last Mile) — Energy Wiki',
    description:
        'TOGAF reference architecture for last-mile distribution points: pole-top and pad-mount transformers, ' +
        'switching cabinets, service entrance equipment, and DTM monitoring.',
};

export default function DistributionPointsPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]" style={{ background: '#10B981' }} />
                    <span className="text-xs font-mono text-gray-500">ENERGY · ELECTRICITY · DISTRIBUTION POINTS</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">Distribution Points</h1>
                <p className="text-sm text-gray-500 font-mono">Last Mile · Final Voltage Step-Down</p>
                <p className="text-gray-400 text-base leading-relaxed max-w-3xl">
                    Distribution points represent the terminal nodes of the electrical distribution system,
                    performing the final voltage step-down from medium voltage (4–34.5 kV) to utilization
                    voltages (120/240 V single-phase, 480 V three-phase). These assets — pole-top
                    transformers, pad-mount transformers, and switching cabinets — outnumber all other
                    grid equipment combined, with an estimated 65 million distribution transformers in
                    service across the United States alone (DOE, 2023). As the closest grid-edge assets
                    to end customers, distribution points are undergoing significant transformation through
                    Distribution Transformer Monitoring (DTM) and smart grid edge intelligence.
                </p>
            </div>

            <Section title="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-300 leading-relaxed">
                    The business architecture for distribution points focuses on reliability, safety,
                    and asset management at massive scale. With millions of units deployed across diverse
                    environments — urban underground vaults, suburban pad-mount installations, and rural
                    overhead pole lines — the operations and maintenance strategy must balance cost
                    efficiency with service quality. The emergence of Distribution Transformer Monitoring
                    (DTM) enables condition-based maintenance, reducing failures by 20–30% through
                    real-time oil temperature, loading, and dissolved gas analysis (IEEE, 2020).
                </p>

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
                                ['IEEE C57.12.00', 'General requirements for liquid-immersed distribution transformers'],
                                ['IEEE C57.12.20', 'Overhead-type distribution transformers (500 kVA and smaller)'],
                                ['IEEE C57.12.34', 'Pad-mounted compartmental transformers (single and three-phase)'],
                                ['ANSI C84.1', 'Voltage ratings: Range A (±5%), Range B (±10%) for 60 Hz systems'],
                                ['NEC Article 450', 'Transformer installation, overcurrent protection, grounding'],
                                ['NESC (ANSI C2)', 'Clearances, climbing space, grounding for overhead construction'],
                                ['DOE 10 CFR 431', 'Energy efficiency standards for distribution transformers'],
                            ].map(([standard, scope]) => (
                                <tr key={standard} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#10B981] font-medium whitespace-nowrap">{standard}</td>
                                    <td className="px-3 py-2 text-gray-400">{scope}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="2. High-Level Design" id="high-level-design">
                <p className="text-sm text-gray-300 leading-relaxed">
                    Distribution points are classified by installation type:
                </p>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`MV Feeder (13.2kV)
    │
    ├── Pole-Top Transformer (Overhead)
    │       25–167 kVA, single-phase
    │       13.2kV/240-120V center-tap
    │       │
    │       ├── Service Drop → Residential (200A)
    │       └── Service Drop → Residential (200A)
    │
    ├── Pad-Mount Transformer (Underground)
    │       75–2500 kVA, three-phase
    │       13.2kV/480-277V (commercial)
    │       │
    │       ├── Underground Secondary → Commercial Building
    │       └── Underground Secondary → Multi-Unit Residential
    │
    └── Switching Cabinet / PME
            Loop switch, fuse coordination
            Normally open/closed for sectionalizing`}</pre>
                </div>
            </Section>

            <Section title="3. Detailed Technical Description" id="technical">
                <h3 className="text-base font-semibold text-white mt-2 mb-2">3.1 Pole-Top Transformers</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    Conventional single-phase overhead transformers serving 4–12 residential customers each.
                    The core construction uses grain-oriented silicon steel laminations (CRGO) with copper
                    or aluminum windings immersed in mineral oil for insulation and cooling. Modern designs
                    incorporate amorphous metal cores reducing no-load losses by 70–80% compared to
                    conventional silicon steel, meeting DOE 10 CFR 431 efficiency standards effective 2016
                    (DOE, 2023).
                </p>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside mt-2">
                    <li><span className="text-white">Ratings:</span> 25, 37.5, 50, 75, 100, 167 kVA single-phase</li>
                    <li><span className="text-white">Primary voltage:</span> 4.16–34.5 kV, no-load tap changer (±2.5%, ±5%)</li>
                    <li><span className="text-white">Secondary voltage:</span> 240/120 V center-tapped (residential), 480Y/277 V (commercial)</li>
                    <li><span className="text-white">Cooling:</span> ONAN (oil natural, air natural), kVA rating at 30°C rise above 65°C average ambient</li>
                    <li><span className="text-white">Protection:</span> Internal current-limiting fuse (CLF) or expulsion fuse cutout (EFC)</li>
                    <li><span className="text-white">Surge protection:</span> Internal lightning/surge arresters (MOV), 10 kA duty cycle</li>
                    <li><span className="text-white">Oil:</span> Mineral oil (FR3 natural ester available for fire-sensitive locations)</li>
                </ul>

                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.2 Pad-Mount Transformers</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    Three-phase or single-phase transformers housed in tamper-resistant, ground-level
                    steel enclosures for underground distribution. Pad-mount units feature live-front
                    or dead-front (preferred for safety) construction with load-break elbow connectors
                    and internal bus work. Loop-feed configurations with two primary bushings enable
                    automatic loop switching without de-energizing downstream customers (IEEE, 2018).
                </p>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside mt-2">
                    <li><span className="text-white">Ratings:</span> 75–2,500 kVA three-phase; 25–500 kVA single-phase</li>
                    <li><span className="text-white">Primary:</span> 15 kV or 25 kV class, dead-front 200A elbows</li>
                    <li><span className="text-white">Secondary:</span> 480Y/277 V or 208Y/120 V, 4-position bus for cable termination</li>
                    <li><span className="text-white">Enclosure:</span> ANSI green (Munsell 7GY 3.29/1.5), tamper-resistant, ventilated</li>
                    <li><span className="text-white">Protection:</span> Bay-O-Net fuse (primary), current-limiting backup fuse (secondary)</li>
                </ul>

                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.3 Distribution Transformer Monitoring (DTM)</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    DTM systems provide real-time visibility into transformer health, enabling
                    condition-based maintenance and preventing catastrophic failures. Sensors measure
                    top oil temperature, winding hot-spot temperature (via fiber optic or thermal model),
                    load current, dissolved gas content, oil level, and ambient temperature. Data is
                    transmitted via cellular (LTE-M/NB-IoT) or RF mesh to the utility enterprise
                    asset management system (IEEE, 2020).
                </p>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside mt-2">
                    <li><span className="text-white">Temperature monitoring:</span> Top oil, hot spot (IEC 60076-7 thermal model), ambient</li>
                    <li><span className="text-white">Loading:</span> Phase currents (CT), voltage (PT), power factor, kVA demand</li>
                    <li><span className="text-white">Dissolved gas analysis:</span> Online hydrogen, moisture sensors (ppm)</li>
                    <li><span className="text-white">Communications:</span> LTE-M/NB-IoT, LoRaWAN, RF mesh, or PLC</li>
                    <li><span className="text-white">Analytics:</span> Remaining useful life (RUL) estimation, thermal aging, overload advisory</li>
                </ul>
            </Section>

            <Section title="4. Process Diagrams" id="process-diagrams">
                <h3 className="text-sm font-semibold text-white mb-2">4.1 Service Delivery Path</h3>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`OVERHEAD PATH:
  MV Feeder (13.2kV) → Fuse Cutout → Pole-Top Transformer
    → Service Drop (triplex, 4/0 Al) → Weather Head
    → Meter Base (AMI Smart Meter, CT-rated)
    → Main Breaker Panel (200A) → Branch Circuits

UNDERGROUND PATH:
  MV Feeder (13.2kV UG cable, 15kV EPR) → Elbow Connector
    → Pad-Mount Transformer (loop-feed, 2 primary bushings)
    → Secondary Bus → Underground Secondary Cable (4/0 Al)
    → CT Cabinet → AMI Smart Meter
    → Main Switchboard (400–1200A) → Sub-panels`}</pre>
                </div>

                <h3 className="text-sm font-semibold text-white mt-8 mb-2">4.2 DTM Data Flow</h3>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`Field Sensors (temp, current, gas, oil level)
        │
        ▼
DTM Edge Controller (embedded, solar/battery powered)
        │
        ├── LTE-M/NB-IoT ──► Cellular Network
        │                          │
        │                     DTM Platform (Cloud/On-Prem)
        │                          │
        │                     ┌────┴────────────────┐
        │                     │  Asset Health Index  │
        │                     │  Thermal Model       │
        │                     │  Overload Advisory   │
        │                     │  DGA Trend Analysis  │
        │                     └─────────────────────┘
        │                          │
        │                     Enterprise GIS/EAM System
        │
        └── Local Display (maintenance troubleshooting)`}</pre>
                </div>
            </Section>

            <Section title="5. Bill of Materials" id="bom">
                <p className="text-sm text-gray-400 mb-3 italic">
                    Per distribution point installation (single overhead or pad-mount).
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
                                ['Pole-Top Transformer', '50kVA, 13.2kV/240-120V, ONAN, CSP, amorphous core', '1'],
                                ['Fuse Cutout', '100A, 15kV, expulsion type, porcelain housing', '1–2'],
                                ['Lightning Arrester', '10kV MCOV, MOV, riser-pole', '1'],
                                ['Service Drop', '4/0 Al triplex, 600V, 100ft span', '4–8'],
                                ['AMI Smart Meter', 'ANSI C12.20, 200A, RF mesh/cellular', '4–8'],
                                ['Pad-Mount Transformer', '500kVA, 13.2kV/480Y-277V, dead-front', '1'],
                                ['Elbow Connectors', '200A, 15kV, loadbreak, dead-front', '2–4'],
                                ['Underground Primary Cable', '15kV EPR/XLPE, 4/0 Al, jacketed', '300ft'],
                                ['Secondary Cable', '4/0 Al, 600V, XHHW-2', '500ft'],
                                ['Switching Cabinet', 'Load-break, 600A, 15kV, gang-operated', '1'],
                                ['DTM Sensor Kit', 'Temperature, current, gas, oil level', '1'],
                                ['DTM Communication Module', 'LTE-M/NB-IoT, solar/battery', '1'],
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
                                ['Level 0', 'Transformers, fuse cutouts, cables, arresters', 'Voltage transformation, protection'],
                                ['Level 1', 'DTM sensors, smart meters, switching cabinet controller', 'Measurement, local control'],
                                ['Level 2', 'DTM edge controller, AMI data concentrator', 'Data aggregation, local analytics'],
                                ['Level 3', 'DTM cloud platform, AMI head-end', 'Asset health analytics, billing'],
                                ['Level 4', 'Enterprise GIS, EAM, ADMS, CIS', 'Asset management, outage detection'],
                            ].map(([level, components, functions]) => (
                                <tr key={level} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#10B981] font-medium whitespace-nowrap">{level}</td>
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
                    <p>IEEE. (2018). <em>IEEE Std C57.12.34: Standard for pad-mounted compartmental transformers</em>. IEEE.</p>
                    <p>IEEE. (2020). <em>IEEE Std C57.143: Guide for application, specification, and testing of oil-immersed current transformers used in monitoring</em>. IEEE.</p>
                    <p>U.S. Department of Energy. (2023). <em>Distribution transformers energy conservation standard</em>. 10 CFR 431.</p>
                </div>
            </Section>

            <Section title="See Also" id="see-also">
                <div className="flex flex-wrap gap-2">
                    {[
                        { href: '/wiki/energy', label: 'Energy Sector Hub', color: '#F59E0B' },
                        { href: '/wiki/energy/distribution', label: 'Distribution Facilities', color: '#3B82F6' },
                        { href: '/wiki/energy/smart-homes', label: 'Smart Homes', color: '#06B6D4' },
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
