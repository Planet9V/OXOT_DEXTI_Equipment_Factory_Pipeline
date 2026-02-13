/**
 * Nuclear Reactors, Materials, and Waste Sector Reference Architecture — Wiki Hub Page.
 *
 * Comprehensive overview of the Nuclear Sector critical infrastructure,
 * serving as the entry point to 7 detailed facility-type articles covering
 * PWR Plants, BWR Plants, Research Reactors, Enrichment Facilities,
 * Fuel Fabrication Plants, Spent Fuel Storage, and Decommissioning Sites.
 *
 * Based on TOGAF Architecture Development Method (ADM) with cross-references
 * to NRC, IAEA, IEEE, and ANS primary standards.
 *
 * @module wiki/nuclear/page
 */

export const metadata = {
    title: 'Nuclear Reactors, Materials, and Waste Sector Reference Architecture — Wiki',
    description:
        'TOGAF-based reference architectures for 7 nuclear facility types: PWR, BWR, Research Reactor, ' +
        'Enrichment, Fuel Fabrication, Spent Fuel Storage, and Decommissioning.',
};

/** Facility type cards with routing. */
const FACILITY_ARTICLES = [
    {
        title: 'Pressurized Water Reactor Plant',
        subtitle: '800 – 1,500 MWe',
        href: '/wiki/nuclear/pwr-plant',
        icon: '⚛️',
        color: '#10B981',
        description:
            'Two/four-loop sealed primary circuit with steam generators, pressurizer, quad-redundant RPS, ECCS safety trains, and containment per 10 CFR 50.',
        tags: ['10 CFR 50', 'IEEE 603', 'NEI 08-09', 'ECCS'],
    },
    {
        title: 'Boiling Water Reactor Plant',
        subtitle: '500 – 1,400 MWe',
        href: '/wiki/nuclear/bwr-plant',
        icon: '♨️',
        color: '#3B82F6',
        description:
            'Direct steam cycle with in-vessel steam separators/dryers, suppression pool, Mark I/II/III containment, recirculation pumps, and ECCS injection systems.',
        tags: ['Mark I/II/III', 'GE-Hitachi', 'Jet Pumps', 'SLCS'],
    },
    {
        title: 'Pool-Type Research Reactor',
        subtitle: '1 – 20 MWth',
        href: '/wiki/nuclear/research-reactor',
        icon: '🔬',
        color: '#8B5CF6',
        description:
            'Open-pool TRIGA or MTR plate-type research reactors for neutron science, Mo-99/Tc-99m isotope production, NAA, and materials irradiation testing.',
        tags: ['NUREG-1537', 'ANSI/ANS 15', 'TRIGA', 'Mo-99'],
    },
    {
        title: 'Uranium Enrichment Facility',
        subtitle: 'Gas Centrifuge',
        href: '/wiki/nuclear/enrichment',
        icon: '🌀',
        color: '#F59E0B',
        description:
            'Gas centrifuge cascade plant separating U-235 from U-238 in UF₆, with IAEA safeguards-by-design, criticality safety per ANSI/ANS 8, and MC&A systems.',
        tags: ['10 CFR 70', 'IAEA', 'LEU', 'UF₆'],
    },
    {
        title: 'Nuclear Fuel Fabrication Plant',
        subtitle: 'UO₂ Pellets → Assemblies',
        href: '/wiki/nuclear/fuel-fabrication',
        icon: '🏭',
        color: '#EF4444',
        description:
            'Conversion of enriched UF₆ to UO₂ powder, pellet pressing and sintering, fuel rod loading, and assembly welding under 10 CFR Part 70 criticality controls.',
        tags: ['10 CFR 70', 'ISA', 'QA/QC', 'Zircaloy'],
    },
    {
        title: 'Spent Fuel Storage (ISFSI)',
        subtitle: 'Dry Cask',
        href: '/wiki/nuclear/spent-fuel-storage',
        icon: '🛡️',
        color: '#06B6D4',
        description:
            'Independent Spent Fuel Storage Installation with dry cask systems (HI-STORM, NUHOMS), wet-to-dry transfer operations, and radiation monitoring per 10 CFR 72.',
        tags: ['10 CFR 72', 'NUREG-1536', 'ALARA', 'MPC'],
    },
    {
        title: 'Nuclear Decommissioning Site',
        subtitle: 'SAFSTOR / DECON',
        href: '/wiki/nuclear/decommissioning',
        icon: '🔧',
        color: '#A855F7',
        description:
            'Post-shutdown decontamination and dismantlement, radiological surveys (MARSSIM), waste characterization, license termination, and site remediation.',
        tags: ['MARSSIM', 'SAFSTOR', 'DECON', '10 CFR 20'],
    },
];

export default function NuclearHubPage() {
    return (
        <div className="max-w-5xl space-y-12">
            {/* Header */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-xl font-bold text-white flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}
                    >
                        ⚛️
                    </div>
                    <div>
                        <span className="text-[10px] text-gray-500 font-mono block">
                            CISA SECTOR 14 · NUCL
                        </span>
                        <h1 className="text-3xl font-heading font-bold text-white">
                            Nuclear Reactors, Materials, and Waste
                        </h1>
                    </div>
                </div>
                <p className="text-gray-400 text-base leading-relaxed max-w-3xl">
                    A comprehensive TOGAF-based reference architecture covering seven critical
                    facility types in the nuclear sector — from 1,500 MWe pressurized water
                    reactors to post-shutdown decommissioning sites. Each article provides
                    detailed process diagrams, bills of materials, Purdue model mappings,
                    communication protocol stacks, and safety system specifications aligned
                    with NRC, IAEA, IEEE, and ANS standards.
                </p>
            </div>

            {/* Executive Summary */}
            <Section title="Executive Summary" id="executive-summary">
                <p className="text-sm text-gray-300 leading-relaxed">
                    The U.S. civilian nuclear sector comprises 92 operating commercial power reactors
                    (providing ~20% of national electricity generation), 31 research and test reactors,
                    and a network of fuel cycle facilities spanning uranium enrichment, fuel fabrication,
                    and spent fuel storage. Regulated primarily by the Nuclear Regulatory Commission (NRC)
                    under{' '}
                    <span className="text-[#10B981] font-medium">10 CFR Parts 50, 52, 70, and 72</span>,
                    these facilities operate under the most stringent safety and security requirements
                    of any critical infrastructure sector. The sector&apos;s defense-in-depth philosophy —
                    multiple independent barriers preventing radioactive release — extends from
                    physical containment structures through digital instrumentation and control systems
                    to cybersecurity architectures compliant with{' '}
                    <span className="text-[#10B981] font-medium">NRC 10 CFR 73.54</span> and{' '}
                    <span className="text-[#10B981] font-medium">NEI 08-09</span>.
                </p>
                <p className="text-sm text-gray-300 leading-relaxed mt-3">
                    Each facility article follows the{' '}
                    <span className="text-[#10B981] font-medium">
                        TOGAF Architecture Development Method (ADM)
                    </span>{' '}
                    and the{' '}
                    <span className="text-[#10B981] font-medium">
                        ISA-95 / Purdue Enterprise Reference Architecture
                    </span>{' '}
                    to provide consistent framework coverage including: (1) TOGAF Business Architecture
                    with stakeholder analysis and regulatory frameworks; (2) detailed technical
                    descriptions with equipment specifications in engineering units; (3) process
                    diagrams showing primary heat transport, safety injection, and data flows;
                    (4) comprehensive Bills of Materials; (5) Purdue model mappings from Level 0
                    through Level 4 with Level 3.5 DMZ; and (6) safety and supporting systems
                    including fire suppression, radiation monitoring, and emergency response systems
                    (The Open Group, 2022; Williams, 1994).
                </p>
            </Section>

            {/* Value Chain Diagram */}
            <Section title="Nuclear Fuel Cycle Value Chain" id="value-chain">
                <div
                    className="rounded-lg border border-white/[0.06] p-6 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`                    FRONT END                          OPERATIONS                        BACK END
  ┌──────────────────────────────┐    ┌──────────────────────────────┐    ┌──────────────────────────────┐
  │                              │    │                              │    │                              │
  │  Uranium Mining/Milling      │    │  PWR Power Plant (1500 MWe)  │    │  Spent Fuel Pool (Wet)       │
  │         │                    │    │  BWR Power Plant (1400 MWe)  │    │         │                    │
  │         ▼                    │    │         │                    │    │         ▼                    │
  │  Conversion (UF₆)           │    │    Electricity Grid          │    │  ISFSI Dry Cask Storage      │
  │         │                    │    │                              │    │         │                    │
  │         ▼                    │    │  Research Reactor (20 MWth)  │    │         ▼                    │
  │  Enrichment (3–5% U-235)    │    │    ├── Neutron Science       │    │  Deep Geological Repository  │
  │         │                    │    │    ├── Isotope Production    │    │    (future — NWPA)           │
  │         ▼                    │    │    └── Materials Testing     │    │                              │
  │  Fuel Fabrication            │───►│                              │───►│  Decommissioning (DECON/     │
  │    (UO₂ → Assemblies)       │    │                              │    │    SAFSTOR → License Term.)  │
  │                              │    │                              │    │                              │
  └──────────────────────────────┘    └──────────────────────────────┘    └──────────────────────────────┘

  Regulatory Oversight: NRC (10 CFR 50/52/70/72) · IAEA Safeguards · DOE/NNSA · NEI/INPO`}</pre>
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">
                    Figure 1. End-to-end nuclear fuel cycle value chain showing the seven facility
                    types documented in this reference architecture. The cycle spans uranium
                    enrichment through power generation to spent fuel storage and decommissioning.
                </p>
            </Section>

            {/* Methodology */}
            <Section title="Methodology &amp; Frameworks" id="methodology">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        {
                            title: 'TOGAF ADM',
                            body: 'Each facility is analyzed through Phase A (Architecture Vision), Phase B (Business Architecture), Phase C (Information Systems Architecture), and Phase D (Technology Architecture) of the TOGAF ADM cycle.',
                            color: '#10B981',
                        },
                        {
                            title: 'Purdue / ISA-95 Model',
                            body: 'Nuclear I&C systems are mapped to Purdue Levels 0 (Process) through Level 4 (Enterprise), with strict Level 3.5 DMZ separation between safety and non-safety networks per NRC RG 1.152.',
                            color: '#3B82F6',
                        },
                        {
                            title: 'NRC Defense-in-Depth',
                            body: 'Nuclear safety philosophy requires multiple independent barriers (fuel cladding, RCS pressure boundary, containment) and diverse protection systems to prevent radioactive release under any credible scenario.',
                            color: '#EF4444',
                        },
                        {
                            title: 'IAEA Nuclear Security',
                            body: 'International safeguards framework including physical protection (INFCIRC/225), material accountancy (MC&A), and containment/surveillance (C/S) for nuclear materials throughout the fuel cycle.',
                            color: '#F59E0B',
                        },
                    ].map((fw) => (
                        <div
                            key={fw.title}
                            className="rounded-xl border border-white/[0.06] p-4"
                            style={{ background: 'rgba(255,255,255,0.02)' }}
                        >
                            <h4 className="text-sm font-semibold text-white mb-1" style={{ color: fw.color }}>
                                {fw.title}
                            </h4>
                            <p className="text-xs text-gray-400 leading-relaxed">{fw.body}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Cross-Facility Purdue Model */}
            <Section title="Unified Purdue Model Across Nuclear Facilities" id="purdue-model">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Level</th>
                                <th className="text-left px-3 py-2 font-medium">PWR / BWR</th>
                                <th className="text-left px-3 py-2 font-medium">Research Reactor</th>
                                <th className="text-left px-3 py-2 font-medium">Enrichment</th>
                                <th className="text-left px-3 py-2 font-medium">Fuel Fab</th>
                                <th className="text-left px-3 py-2 font-medium">ISFSI</th>
                                <th className="text-left px-3 py-2 font-medium">Decom</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { level: 'L0', cells: ['RTDs, CTs, PTs', 'Pool sensors', 'UF₆ flow meas.', 'Pellet insp.', 'Rad. monitors', 'Survey instr.'] },
                                { level: 'L1', cells: ['RPS, ESF logic', 'Scram channels', 'Cascade PLC', 'Process PLC', 'PACS control', 'Health physics'] },
                                { level: 'L2', cells: ['PPC, MCR HMI', 'Console/HMI', 'Cascade SCADA', 'MES/QA', 'Security HMI', 'Survey SCADA'] },
                                { level: 'L3', cells: ['Plant historian', 'Exp. scheduling', 'MC&A system', 'MC&A/ISA', 'Dosimetry DB', 'Waste tracking'] },
                                { level: 'L3.5', cells: ['Data diode/FW', 'Air gap', 'IAEA gateway', 'FW/DMZ', 'FW/DMZ', 'FW/DMZ'] },
                                { level: 'L4', cells: ['Corporate/NRC', 'DOE reporting', 'NRC/IAEA rpt.', 'NRC reporting', 'NRC/DOE rpt.', 'NRC LTP rpt.'] },
                            ].map((row) => (
                                <tr key={row.level} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#10B981] font-mono font-medium">{row.level}</td>
                                    {row.cells.map((cell, i) => (
                                        <td key={i} className="px-3 py-2 text-gray-400">{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">
                    Table 1. Unified Purdue model mapping across nuclear facility types, adapted from
                    ISA-95 (Williams, 1994) with nuclear cybersecurity DMZ per NEI 08-09 and NRC 10 CFR 73.54.
                </p>
            </Section>

            {/* Communication Protocol Stack */}
            <Section title="Communication Protocol Stack" id="protocol-stack">
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`Application:  OPC UA (non-safety) │ NRC eSubmit │ IAEA SIR  │ ERDS (NRC)
Transport:    Data Diode (L3.5)   │ Modbus TCP  │ Hardwired │ Encrypted VPN
Network:      Isolated Safety LAN │ Non-safety Ethernet    │ RS-485 serial
Physical:     Fiber Optic (qual.) │ Twisted Shielded Pair  │ Hardwired 4-20mA

Safety I&C:   ──── Hardwired only (IEEE 603) ──── No TCP/IP ────
Non-Safety:   ──── Firewalled   ──── Data diode ──── Corp LAN ────`}</pre>
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">
                    Figure 2. Communication protocol stack for nuclear facilities. Safety-related
                    systems use hardwired signals exclusively per IEEE 603 and NRC RG 1.152;
                    non-safety data egresses via unidirectional data diode to corporate networks.
                </p>
            </Section>

            {/* Cybersecurity */}
            <Section title="Nuclear Cybersecurity Architecture" id="cybersecurity">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Zone</th>
                                <th className="text-left px-3 py-2 font-medium">Controls</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Safety I&C (L0-L1)', 'Complete network isolation, hardwired-only signals, no remote access, qualification per IEEE 603/IEC 61513'],
                                ['Non-Safety I&C (L2)', 'Dedicated process LAN, firewalled from safety, data diode egress, intrusion detection'],
                                ['DMZ (L3.5)', 'Unidirectional data diode, protocol break, monitored gateway, no inbound connections from corporate'],
                                ['Operations (L3)', 'Role-based access, historian with tamper detection, encrypted storage, audit logging'],
                                ['Corporate (L4)', 'Multi-factor authentication, VPN, annual penetration testing per NEI 08-09'],
                                ['Physical Security', 'Vital Area barriers, armed response, CCTV, biometric access, vehicle barriers per 10 CFR 73'],
                            ].map(([zone, controls]) => (
                                <tr key={zone} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#EF4444] font-medium whitespace-nowrap">{zone}</td>
                                    <td className="px-3 py-2 text-gray-400">{controls}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* Facility Article Cards */}
            <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-white">
                    Facility Reference Articles
                </h2>
                <p className="text-sm text-gray-500">
                    Each article below provides a complete TOGAF-based reference architecture with
                    detailed process diagrams, bills of materials, Purdue model mappings, and APA citations.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {FACILITY_ARTICLES.map((article) => (
                        <a
                            key={article.href}
                            href={article.href}
                            className="group rounded-xl border border-white/[0.06] p-5 hover:border-white/[0.12] transition-all duration-300"
                            style={{ background: 'rgba(255,255,255,0.02)' }}
                        >
                            <div className="flex items-start gap-3">
                                <span className="text-2xl">{article.icon}</span>
                                <div>
                                    <h3 className="text-sm font-semibold text-white group-hover:text-[#10B981] transition-colors">
                                        {article.title}
                                    </h3>
                                    <span className="text-[10px] font-mono" style={{ color: article.color }}>
                                        {article.subtitle}
                                    </span>
                                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                                        {article.description}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                        {article.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-[10px] px-1.5 py-0.5 rounded border"
                                                style={{
                                                    borderColor: `${article.color}30`,
                                                    color: article.color,
                                                }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </section>

            {/* References */}
            <Section title="References" id="references">
                <div className="space-y-2 text-xs text-gray-400 leading-relaxed">
                    <p>
                        International Atomic Energy Agency. (2016).{' '}
                        <em>Safety of Nuclear Power Plants: Design (SSR-2/1 Rev. 1)</em>. IAEA Safety
                        Standards Series. Vienna: IAEA.
                    </p>
                    <p>
                        International Electrotechnical Commission. (2011).{' '}
                        <em>IEC 61513: Nuclear power plants — Instrumentation and control important to safety</em>.
                        IEC.
                    </p>
                    <p>
                        Institute of Electrical and Electronics Engineers. (2018).{' '}
                        <em>IEEE 603: Standard criteria for safety systems for nuclear power generating stations</em>.
                        IEEE.
                    </p>
                    <p>
                        Nuclear Energy Institute. (2010).{' '}
                        <em>NEI 08-09: Cyber Security Plan for Nuclear Power Reactors</em>. Washington, DC: NEI.
                    </p>
                    <p>
                        The Open Group. (2022).{' '}
                        <em>TOGAF Standard, Version 10</em>. The Open Group.
                    </p>
                    <p>
                        U.S. Nuclear Regulatory Commission. (2009).{' '}
                        <em>10 CFR 73.54: Protection of digital computer and communication systems and networks</em>.
                        Washington, DC: NRC.
                    </p>
                    <p>
                        U.S. Nuclear Regulatory Commission. (2024).{' '}
                        <em>NUREG-1350: Information Digest — Nuclear Reactor Oversight Program</em>.
                        Washington, DC: NRC.
                    </p>
                    <p>
                        Williams, T. J. (1994). The Purdue Enterprise Reference Architecture.{' '}
                        <em>Computers in Industry</em>, 24(2–3), 141–158.
                    </p>
                </div>
            </Section>

            {/* See Also */}
            <Section title="See Also" id="see-also">
                <div className="flex flex-wrap gap-2">
                    {[
                        { href: '/wiki/sectors/NUCL', label: 'Nuclear Sector Overview', color: '#10B981' },
                        { href: '/wiki/dexpi/equipment-classes', label: 'DEXPI Equipment Classes', color: '#8B5CF6' },
                        { href: '/wiki/dexpi/standards', label: 'Related Standards', color: '#06B6D4' },
                        { href: '/wiki/pipeline', label: 'AI Pipeline V2', color: '#FF6B00' },
                        { href: '/wiki/neo4j', label: 'Neo4j Graph Database', color: '#018BFF' },
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
function Section({
    title,
    id,
    children,
}: {
    title: string;
    id: string;
    children: React.ReactNode;
}) {
    return (
        <section id={id} className="space-y-4">
            <h2 className="text-xl font-heading font-semibold text-white">{title}</h2>
            {children}
        </section>
    );
}
