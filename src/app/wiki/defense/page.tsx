/**
 * Defense Industrial Base (DEFN) Sector Reference Architecture — Wiki Hub Page.
 *
 * Comprehensive overview of the Defense Industrial Base complex, serving as the
 * entry point to 4 detailed facility-type articles: Fighter Assembly, Naval Shipyard,
 * Armored Vehicle Plant, and Trusted Electronics Foundry.
 *
 * Based on DoDAF v2.02 and TOGAF Architecture Development Method (ADM) with 
 * cross-references to NIST SP 800-171 and CMMC 2.0.
 *
 * @module wiki/defense/page
 */

import Link from 'next/link';

export const metadata = {
    title: 'Defense Industrial Base Sector Reference Architecture — Wiki',
    description: 'TOGAF and DoDAF-based reference architectures for Defense facilities: Aerospace, Shipbuilding, Ground Systems, and Electronics.',
};

/** Facility type cards with routing. */
const FACILITY_ARTICLES = [
    {
        title: 'Fighter Aircraft Final Assembly',
        subtitle: '5th/6th Gen Air Dominance',
        href: '/wiki/defense/fighter-aircraft-assembly',
        icon: '✈️',
        color: '#3B82F6', // Blue for Air Force/Aerospace
        description: 'Pulsed assembly line for stealth aircraft using laser-guided mating, robotic drilling, and LO coating application.',
        tags: ['Aerospace', 'Robotics', 'AS9100'],
    },
    {
        title: 'Naval Shipyard (Dry Dock)',
        subtitle: 'Nuclear Submarine & Carrier MRO',
        href: '/wiki/defense/naval-shipyard',
        icon: '⚓',
        color: '#0EA5E9', // Ocean Blue for Navy
        description: 'Dry dock infrastructure for nuclear vessel overhaul, featuring heavy lift cranes and high-capacity dewatering systems.',
        tags: ['Nuclear', 'Maritime', 'NAVSEA'],
    },
    {
        title: 'Armored Vehicle Assembly',
        subtitle: 'Main Battle Tank & Stryker',
        href: '/wiki/defense/armored-vehicle-plant',
        icon: '🛡️',
        color: '#16A34A', // Camo Green for Army
        description: 'Heavy manufacturing facility for hull welding, turret integration, and automotive assembly of combat vehicles.',
        tags: ['Ground Systems', 'Welding', 'Automotive'],
    },
    {
        title: 'Defense Electronics Fab',
        subtitle: 'Trusted Foundry & Rad-Hard',
        href: '/wiki/defense/electronics-fab',
        icon: '💾',
        color: '#A855F7', // Purple for Advanced Tech/Joint
        description: 'ISO Class 4/5 cleanroom environment for fabrication of radiation-hardened microelectronics and EW systems.',
        tags: ['Semiconductor', 'Cleanroom', 'Trusted Foundry'],
    },
];

export default function DefenseHubPage() {
    return (
        <div className="max-w-5xl space-y-12 pb-20">

            {/* ── Header ───────────────────────────────────────────────────────── */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]" style={{ background: '#64748B' }} />
                    <span className="text-xs font-mono text-gray-500">
                        CISA SECTOR 06 · DEFN · EST. 2003
                    </span>
                </div>
                <h1 className="text-4xl font-heading font-bold text-white">
                    Defense Industrial Base
                </h1>
                <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
                    The worldwide industrial complex that enables research, development, design, production,
                    delivery, and maintenance of military weapons systems. This sector demands the highest
                    levels of **supply chain security**, **information assurance** (CMMC/NIST 800-171), and
                    **manufacturing precision**.
                </p>
            </div>

            {/* ── Executive Summary ────────────────────────────────────────────── */}
            <Section title="1. Executive Summary" id="summary">
                <div className="space-y-4 text-gray-300 leading-relaxed text-sm">
                    <p>
                        The Defense Industrial Base (DEFN) Sector is unique among critical infrastructure sectors
                        due to its single primary customer: the Department of Defense (DoD). Operations are governed
                        by the <span className="text-[#64748B] font-medium">Adaptive Acquisition Framework (DoDI 5000.02)</span>,
                        which balances speed, security, and cost. The architecture must support long-lifecycle assets
                        (50+ years for B-52s, aircraft carriers) while integrating rapid technology insertions.
                    </p>
                    <p>
                        Our reference architecture aligns with <span className="text-white font-medium">DoD Architecture Framework (DoDAF v2.02)</span>
                        measurements for interoperability and the **Modular Open Systems Approach (MOSA)**.
                        Critical architectural drivers include the segregation of Classified (SIPRNet) and Unclassified (NIPRNet)
                        data, compliance with International Traffic in Arms Regulations (ITAR), and resilience against
                        Advanced Persistent Threats (APTs) targeting intellectual property.
                    </p>
                </div>
            </Section>

            {/* ── Value Chain ──────────────────────────────────────────────────── */}
            <Section title="2. Industry Value Chain" id="value-chain">
                <p className="text-sm text-gray-400 mb-6">
                    The Defense value chain extends from basic research to demilitarization, characterized by strict
                    configuration management and government oversight at every stage.
                </p>
                <div className="rounded-lg border border-white/[0.06] p-6 font-mono text-xs text-gray-300 overflow-x-auto bg-white/[0.02]">
                    <pre className="whitespace-pre leading-relaxed">{
                        `[ Basic Research ] ──► [ R&D / Prototyping ] ──► [ Eng. & Mfg. Dev (EMD) ]
       │                        │                          │
       ▼                        ▼                          ▼
[  Universities  ]       [ Labs / FFRDCs ]        [ LRIP Production ]
                                                           │
                                                           ▼
[ Sustainment / MRO ] ◄── [ Deployment / Ops ] ◄── [ FRP Production ]
       │                                                   │
       ▼                                                   ▼
[ Demilitarization ]                               [ Supply Chain / Tier N ]`
                    }</pre>
                </div>
            </Section>

            {/* ── Methodology ──────────────────────────────────────────────────── */}
            <Section title="3. Methodology & Frameworks" id="methodology">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { title: 'DoDAF v2.02', desc: 'Overarching framework for DoD system-of-systems interoperability.', meta: 'Standard' },
                        { title: 'TOGAF ADM', desc: 'Enterprise architecture method adapted for industrial manufacturing capabilities.', meta: 'Method' },
                        { title: 'NIST SP 800-171', desc: 'Protecting Controlled Unclassified Information (CUI) in non-federal systems.', meta: 'Security' },
                        { title: 'ISA-95 / Purdue', desc: 'Hierarchical model for integrating shop floor control with enterprise ERP.', meta: 'Model' },
                    ].map((card) => (
                        <div key={card.title} className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-sm font-semibold text-white">{card.title}</h3>
                                <span className="text-[10px] font-mono text-[#64748B] border border-[#64748B]/30 px-1.5 py-0.5 rounded">
                                    {card.meta}
                                </span>
                            </div>
                            <p className="text-xs text-gray-400 leading-relaxed">{card.desc}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* ── Purdue Model Comparison ──────────────────────────────────────── */}
            <Section title="4. Purdue Model & Control Hierarchy" id="purdue">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left border-collapse">
                        <thead>
                            <tr className="text-gray-500 border-b border-white/[0.08]">
                                <th className="py-3 px-4 font-medium">Layer</th>
                                <th className="py-3 px-4 font-medium">Aerospace (F-35)</th>
                                <th className="py-3 px-4 font-medium">Shipbuilding (CVN)</th>
                                <th className="py-3 px-4 font-medium">Electronics (Trusted)</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-300 divide-y divide-white/[0.04]">
                            <tr>
                                <td className="py-3 px-4 text-gray-500 font-mono">L4 Enterprise</td>
                                <td className="py-3 px-4">SAP ERP, Teamcenter PLM</td>
                                <td className="py-3 px-4">Oracle E-Business, Siemens NX</td>
                                <td className="py-3 px-4">SAP ERP, Synopsys</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4 text-gray-500 font-mono">L3 Operations</td>
                                <td className="py-3 px-4">Siemens Opcenter (MES)</td>
                                <td className="py-3 px-4">Solumina MES (iBase-t)</td>
                                <td className="py-3 px-4">PROMIS / customized MES</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4 text-gray-500 font-mono">L2 Control</td>
                                <td className="py-3 px-4">Ignition SCADA, Sinumerik</td>
                                <td className="py-3 px-4">Wonderware System Platform</td>
                                <td className="py-3 px-4">Applied Materials E3, Station Controllers</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4 text-gray-500 font-mono">L1 Device</td>
                                <td className="py-3 px-4">Siemens S7-1500, Fanuc Robots</td>
                                <td className="py-3 px-4">Rockwell L85E, Crane Drives</td>
                                <td className="py-3 px-4">Secs/Gem Interfaces, Tool PLCs</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* ── Protocol Stack ───────────────────────────────────────────────── */}
            <Section title="5. Communication Protocol Stack" id="protocols">
                <div className="rounded-lg border border-white/[0.06] p-6 font-mono text-xs text-gray-300 overflow-x-auto bg-white/[0.02]">
                    <pre className="whitespace-pre leading-relaxed">{
                        `[ Enterprise / L4 ]    HTTPS (TLS 1.3), AMQP (Secure), OPC UA (Encryption)
          │            ▲
          │            │ (Data Diode / IDMZ)
          ▼            │
[ Operations / L3 ]    OPC UA Pub/Sub, MQTT (Sparkplug B), REST
          │
          ▼
[ Control / L2 ]       EtherNet/IP (CIP), PROFINET RT, DNP3 (Power)
          │
          ▼
[ Field / L0-L1 ]      EtherCAT (Motion), Modbus TCP/RTU, HART 7, IO-Link`
                    }</pre>
                </div>
            </Section>

            {/* ── Cybersecurity ────────────────────────────────────────────────── */}
            <Section title="6. Cybersecurity Architecture (CMMC)" id="security">
                <p className="text-sm text-gray-400 mb-6">
                    Defense facilities must adhere to <span className="text-white">NIST SP 800-171</span> and reach
                    <span className="text-white"> CMMC Level 2/3</span>. Key architectural feature is easier segmentation
                    of CUI (Controlled Unclassified Information) and FCI (Federal Contract Information).
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                        { zone: 'SIPRNet (Classified)', control: 'Air-gapped, Type 1 Encryption, EMI Shielding', icon: '🔴' },
                        { zone: 'NIPRNet (Unclassified)', control: 'CAC Auth, DISA STIGs, JRSS Stacks', icon: '🟢' },
                        { zone: 'DIBNet (Partner)', control: 'MFA, behavior analytics, endpoint EDR', icon: '🟠' },
                    ].map((z) => (
                        <div key={z.zone} className="p-3 rounded-lg border border-white/[0.06] bg-white/[0.02] flex flex-col gap-2">
                            <span className="text-lg">{z.icon}</span>
                            <span className="text-sm font-semibold text-white">{z.zone}</span>
                            <span className="text-xs text-gray-500">{z.control}</span>
                        </div>
                    ))}
                </div>
            </Section>

            {/* ── Facility Articles ────────────────────────────────────────────── */}
            <Section title="7. Facility Reference Architectures" id="facilities">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {FACILITY_ARTICLES.map((facility) => (
                        <Link
                            key={facility.title}
                            href={facility.href}
                            className="group relative p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all"
                        >
                            <div className="absolute top-0 left-0 w-1 h-full rounded-l-xl opacity-60 group-hover:opacity-100 transition-opacity"
                                style={{ background: facility.color }} />

                            <div className="flex justify-between items-start mb-3 pl-3">
                                <span className="text-2xl">{facility.icon}</span>
                                <span className="text-[10px] font-mono text-gray-500 border border-white/[0.06] px-2 py-1 rounded-full">
                                    {facility.tags[0]}
                                </span>
                            </div>

                            <div className="pl-3 space-y-2">
                                <h3 className="text-lg font-bold text-white group-hover:text-oxot-blue transition-colors">
                                    {facility.title}
                                </h3>
                                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                                    {facility.subtitle}
                                </p>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    {facility.description}
                                </p>
                            </div>

                            <div className="mt-4 pl-3 flex flex-wrap gap-2">
                                {facility.tags.slice(1).map(tag => (
                                    <span key={tag} className="text-[10px] text-gray-600 bg-white/[0.02] px-1.5 py-0.5 rounded">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </Link>
                    ))}
                </div>
            </Section>

            {/* ── References ───────────────────────────────────────────────────── */}
            <Section title="8. Key Standards & References" id="references">
                <ul className="space-y-2 text-xs text-gray-500 font-mono">
                    <li>• U.S. Department of Defense. (2020). <em>DoDI 5000.02: Operation of the Adaptive Acquisition Framework.</em></li>
                    <li>• DoD CIO. (2010). <em>DoD Architecture Framework (DoDAF), Version 2.02.</em> Washington, DC.</li>
                    <li>• NIST. (2020). <em>SP 800-171 Rev. 2: Protecting Controlled Unclassified Information in Nonfederal Systems.</em></li>
                    <li>• SAE International. (2016). <em>AS9100D: Quality Management Systems – Requirements for Aviation, Space and Defense.</em></li>
                    <li>• NAVSEA. (2018). <em>Naval Systems Engineering Guide.</em> Naval Sea Systems Command.</li>
                    <li>• OUSD(A&S). (2021). <em>Cybersecurity Maturity Model Certification (CMMC) Model v2.0.</em></li>
                </ul>
            </Section>

            {/* ── See Also ─────────────────────────────────────────────────────── */}
            <Section title="See Also" id="see-also">
                <div className="flex flex-wrap gap-3">
                    {[
                        { label: 'Energy Sector Wiki', href: '/wiki/energy' },
                        { label: 'Manufacturing Sector Wiki', href: '/wiki/manufacturing' },
                        { label: 'Transportation Sector Wiki', href: '/wiki/transportation' },
                        { label: 'CISA Defense Sector Profile', href: 'https://www.cisa.gov/topics/critical-infrastructure-security-and-resilience/critical-infrastructure-sectors/defense-industrial-base-sector' },
                    ].map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="px-3 py-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] text-xs text-gray-400 hover:text-white hover:border-white/[0.2] transition-colors"
                        >
                            {link.label} →
                        </Link>
                    ))}
                </div>
            </Section>
        </div>
    );
}

/** Reusable schematic section with consistent styling. */
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
