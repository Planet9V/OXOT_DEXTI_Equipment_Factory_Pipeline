/**
 * Government Facilities Sector Reference Architecture — Wiki Hub Page.
 *
 * Comprehensive overview of Government Facilities critical infrastructure,
 * serving as the entry point to 4 detailed facility-type articles covering
 * National Laboratories, Municipal Complexes, University Campuses, and
 * National Monuments.
 *
 * Based on TOGAF Architecture Development Method (ADM) with cross-references
 * to GSA, DOE, FEMA, and ISC primary standards.
 *
 * @module wiki/government/page
 */

export const metadata = {
    title: 'Government Facilities Sector Reference Architecture — Wiki',
    description:
        'TOGAF-based reference architectures for 4 government facility types: National Laboratories, ' +
        'Municipal Complexes, University Campuses, and National Monuments.',
};

/** Facility type cards with routing. */
const FACILITY_ARTICLES = [
    {
        title: 'National Laboratory',
        subtitle: 'DOE Complex',
        href: '/wiki/government/national-laboratory',
        icon: '⚛️',
        color: '#EF4444',
        description:
            'High-security research complexes with research reactors, particle accelerators, supercomputing centers, and strict DOE Order 420.1C safety protocols.',
        tags: ['DOE 420.1C', 'NRC 10 CFR', 'EPICS', 'HPC'],
    },
    {
        title: 'Municipal Complex',
        subtitle: 'City Hall & Courts',
        href: '/wiki/government/municipal-complex',
        icon: '🏛️',
        color: '#3B82F6',
        description:
            'Civic infrastructure hubs integrating administrative offices, judicial courts, and emergency services with ISC physical security standards and smart city BMS.',
        tags: ['GSA P100', 'FEMA 426', 'Smart City', 'BACnet'],
    },
    {
        title: 'University Campus',
        subtitle: 'Public Research',
        href: '/wiki/government/university-campus',
        icon: '🎓',
        color: '#F59E0B',
        description:
            'Large-scale educational precincts with district energy systems, critical research containment, mass notification systems, and open-campus security architectures.',
        tags: ['APPA', 'NFPA 101', 'District Energy', 'Eduroam'],
    },
    {
        title: 'National Monument',
        subtitle: 'Heritage & Icon',
        href: '/wiki/government/national-monument',
        icon: '🗿',
        color: '#10B981',
        description:
            'Symbolic structures and visitor centers balancing historic preservation standards with modern anti-terrorism force protection and visitor screening flow.',
        tags: ['NPS-28', 'DOI Standards', 'Visitor Flow', 'Surveillance'],
    },
];

export default function GovernmentHubPage() {
    return (
        <div className="max-w-5xl space-y-12">
            {/* Header */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-xl font-bold text-white flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #64748B, #475569)' }}
                    >
                        🏛️
                    </div>
                    <div>
                        <span className="text-[10px] text-gray-500 font-mono block">
                            CISA SECTOR 11 · GOVT
                        </span>
                        <h1 className="text-3xl font-heading font-bold text-white">
                            Government Facilities Reference Architecture
                        </h1>
                    </div>
                </div>
                <p className="text-gray-400 text-base leading-relaxed max-w-3xl">
                    A comprehensive TOGAF-based reference architecture covering four critical
                    facility types in the Government Facilities sector — from high-security National
                    Laboratories to open public University Campuses. Each article provides detailed
                    process diagrams, bills of materials, Purdue model mappings, and protocols aligned
                    with GSA, DOE, FEMA, and ISC standards.
                </p>
            </div>

            {/* Executive Summary */}
            <Section title="Executive Summary" id="executive-summary">
                <p className="text-sm text-gray-300 leading-relaxed">
                    The Government Facilities Sector encompasses a wide variety of buildings and
                    structures with diverse functions, from general public access to highly restricted
                    critical research. This reference architecture standardizes the approach to
                    managing these assets using the{' '}
                    <span className="text-[#3B82F6] font-medium">
                        TOGAF Architecture Development Method (ADM)
                    </span>{' '}
                    and the{' '}
                    <span className="text-[#3B82F6] font-medium">
                        ISA-95 / Purdue Enterprise Reference Architecture
                    </span>.
                    It addresses the unique challenge of balancing openness and accessibility with robust physical
                    and cybersecurity protections demanded by the Interagency Security Committee (ISC).
                </p>
                <p className="text-sm text-gray-300 leading-relaxed mt-3">
                    Key focus areas include: (1) Resilient utility infrastructure (District Energy, Microgrids);
                    (2) Advanced Building Management Systems (BMS) for energy efficiency and comfort;
                    (3) Integrated Security Systems (PACS, VMS, IDS) for layered defense; and
                    (4) Continuity of Operations (COOP) capabilities for critical government functions
                    during emergencies.
                </p>
            </Section>

            {/* Value Chain Diagram */}
            <Section title="Government Facilities Value Chain" id="value-chain">
                <div
                    className="rounded-lg border border-white/[0.06] p-6 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`Policy/Funding ──► Planning & Design ──► Construction/Retrofit ──► Operations & Maintenance
                                                                          │
                                                                          ▼
                                                                 Service Delivery
                                                              (Research, Governance,
                                                               Education, Heritage)
                                                                          │
                                                                          ▼
       Security & Safety ◄── Integrated Operations Center ──► Energy & Sustainability
       (Physical/Cyber)           (PSIM / BMS)               (Efficiency/Net Zero)`}</pre>
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">
                    Figure 1. Value chain for Government Facilities, emphasizing the central role of
                    Integrated Operations Centers in balancing service delivery with security and sustainability.
                </p>
            </Section>

            {/* Methodology */}
            <Section title="Methodology & Frameworks" id="methodology">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        {
                            title: 'TOGAF ADM',
                            body: 'Comprehensive architectural governance ensuring alignment between Government mission objectives (Phase A) and facility technology implementation (Phase D).',
                            color: '#64748B',
                        },
                        {
                            title: 'ISC RMP',
                            body: 'The Interagency Security Committee Risk Management Process is woven into the architecture to define facility security levels (FSL - I to V) and countermeasures.',
                            color: '#EF4444',
                        },
                        {
                            title: 'Purdue Model',
                            body: 'Strict segmentation of Facility Related Control Systems (FRCS) from Enterprise IT networks, identifying critical Level 0-2 OT assets.',
                            color: '#3B82F6',
                        },
                        {
                            title: 'NIST CSF',
                            body: 'Adoption of the NIST Cybersecurity Framework (Identify, Protect, Detect, Respond, Recover) for critical government infrastructure protection.',
                            color: '#10B981',
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
            <Section title="Unified Purdue Model Across Facilities" id="purdue-model">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Level</th>
                                <th className="text-left px-3 py-2 font-medium">National Lab</th>
                                <th className="text-left px-3 py-2 font-medium">Municipal Complex</th>
                                <th className="text-left px-3 py-2 font-medium">University</th>
                                <th className="text-left px-3 py-2 font-medium">Monument</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { level: 'L0', cells: ['Beam sensors, Vacuum', 'VAV actuators, strikes', 'Steam valves, Fume hoods', 'Humidity sensors'] },
                                { level: 'L1', cells: ['PLC, Safety PLC', 'Field controllers', 'Lab controllers', 'Lighting controllers'] },
                                { level: 'L2', cells: ['Exp. SCADA HMI', 'BMS Workstation', 'Campus SCADA', 'Visitor Kiosk'] },
                                { level: 'L3', cells: ['Site Historian', 'City PSIM', 'District Energy EMS', 'Site Security Server'] },
                                { level: 'L3.5', cells: ['Science DMZ', 'Muni Network DMZ', 'Research DMZ', 'DOI Network DMZ'] },
                                { level: 'L4', cells: ['DOE Enterprise', 'ERP / GIS', 'Student Info Sys', 'NPS Operations'] },
                            ].map((row) => (
                                <tr key={row.level} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#3B82F6] font-mono font-medium">{row.level}</td>
                                    {row.cells.map((cell, i) => (
                                        <td key={i} className="px-3 py-2 text-gray-400">{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">
                    Table 1. Unified Purdue model mapping across government facility types, highlighting
                    the convergence of OT (BMS/PACS) and IT systems.
                </p>
            </Section>

            {/* Communication Protocol Stack */}
            <Section title="Communication Protocol Stack" id="protocol-stack">
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`Application:  BACnet/SC │ EPICS (Labs) │ ONVIF (Video) │ Modbus TCP │ HTTPS
Transport:    TCP/UDP │ TLS 1.3 │ Secure Shell (SSH)
Network:      IPv4/IPv6 │ OSPF │ VLANs (802.1Q) │ MPLS
Physical:     Fiber (SM/MM) │ Cat6A │ Wi-Fi 6 (802.11ax) │ Zigbee (802.15.4)`}</pre>
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">
                    Figure 2. Communication protocol stack showing the mix of commercial building protocols
                    (BACnet) and specialized research/security protocols (EPICS, ONVIF).
                </p>
            </Section>

            {/* Cybersecurity */}
            <Section title="Cybersecurity Architecture" id="cybersecurity">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Domain</th>
                                <th className="text-left px-3 py-2 font-medium">Controls</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Access Control', 'PIV/CAC Smart Cards, MFA, Biometrics (High Security Areas)'],
                                ['Network Security', 'Science DMZ, Air-gapped classified networks, NAC (802.1X)'],
                                ['Data Protection', 'FIPS 140-3 Encryption, Data diode for OT-to-IT flows'],
                                ['Monitoring', 'Continuous Diagnostics and Mitigation (CDM), Einstein Program (Federal)'],
                                ['Supply Chain', 'C-SCRM, NDAA Section 889 Prohibitions, SBOM requirements'],
                            ].map(([domain, controls]) => (
                                <tr key={domain} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#EF4444] font-medium whitespace-nowrap">{domain}</td>
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
                    detailed process diagrams, bills of materials, Purdue model mappings, and standards citations.
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
                                <div className="space-y-1">
                                    <h3 className="text-sm font-semibold text-white group-hover:text-[#3B82F6] transition-colors">
                                        {article.title}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: article.color }}>
                                            {article.subtitle}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-xs text-gray-400 leading-relaxed">
                    <p>
                        Department of Homeland Security (DHS). (2015).{' '}
                        <em>Government Facilities Sector-Specific Plan</em>. CISA.
                    </p>
                    <p>
                        Interagency Security Committee (ISC). (2021).{' '}
                        <em>The Risk Management Process for Federal Facilities: An Interagency Security Committee Standard</em>.
                        DHS.
                    </p>
                    <p>
                        General Services Administration (GSA). (2021).{' '}
                        <em>P100: Facilities Standards for the Public Buildings Service</em>. GSA.
                    </p>
                    <p>
                        Department of Energy (DOE). (2019).{' '}
                        <em>DOE Order 420.1C: Facility Safety</em>. DOE.
                    </p>
                    <p>
                        Federal Emergency Management Agency (FEMA). (2011).{' '}
                        <em>FEMA 426: Reference Manual to Mitigate Potential Terrorist Attacks Against Buildings</em>.
                        dhs.
                    </p>
                    <p>
                        The Open Group. (2022).{' '}
                        <em>TOGAF Standard, Version 10</em>. The Open Group.
                    </p>
                </div>
            </Section>

            {/* See Also */}
            <Section title="See Also" id="see-also">
                <div className="flex flex-wrap gap-2">
                    {[
                        { href: '/wiki/sectors/GOVT', label: 'Sector Overview', color: '#64748B' },
                        { href: '/wiki/sectors/ITEC', label: 'IT Sector', color: '#8B5CF6' },
                        { href: '/wiki/sectors/EMER', label: 'Emergency Services', color: '#DC2626' },
                        { href: '/wiki/cybersecurity', label: 'Cybersecurity Frameworks', color: '#10B981' },
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
