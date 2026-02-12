/**
 * Energy Sector Reference Architecture — Wiki Hub Page.
 *
 * Comprehensive overview of the Energy Sector critical infrastructure,
 * serving as the entry point to 7 detailed facility-type articles covering
 * Transmission, Distribution, Distribution Points, Microgrids, Smart Homes,
 * Battery Energy Storage Systems (BESS), and Virtual Power Plants (VPP/DERMS).
 *
 * Based on TOGAF Architecture Development Method (ADM) with cross-references
 * to IEEE, IEC, NFPA, FERC, and NERC primary standards.
 *
 * @module wiki/energy/page
 */

export const metadata = {
    title: 'Energy Sector Reference Architecture — Wiki',
    description:
        'TOGAF-based reference architectures for 7 energy facility types: Transmission, Distribution, ' +
        'Distribution Points, Microgrids, Smart Homes, BESS, and VPP/DERMS.',
};

/** Facility type cards with routing. */
const FACILITY_ARTICLES = [
    {
        title: 'Transmission Facilities',
        subtitle: '230 kV – 765 kV',
        href: '/wiki/energy/transmission',
        icon: '⚡',
        color: '#F59E0B',
        description:
            'Breaker-and-a-half bus configurations, SF₆ circuit breakers, autotransformers, protection relay coordination, and SCADA/EMS integration for bulk electric system substations.',
        tags: ['IEC 61850', 'NERC CIP', 'PMU', 'GOOSE'],
    },
    {
        title: 'Distribution Facilities',
        subtitle: '4 kV – 34.5 kV',
        href: '/wiki/energy/distribution',
        icon: '🔌',
        color: '#3B82F6',
        description:
            'Feeder networks, FLISR automation, Volt-VAR optimization, DER management, reclosers, and sectionalizers for resilient medium-voltage distribution.',
        tags: ['IEEE 1547', 'FLISR', 'VVO', 'AMI'],
    },
    {
        title: 'Distribution Points',
        subtitle: 'Last Mile Delivery',
        href: '/wiki/energy/distribution-points',
        icon: '🏠',
        color: '#10B981',
        description:
            'Pole-top and pad-mount transformers, switching cabinets, service entrance equipment, and distribution transformer monitoring for final-stage voltage step-down.',
        tags: ['IEEE C57', 'NEC', 'DTM', 'ANSI C84.1'],
    },
    {
        title: 'Microgrids',
        subtitle: '1 – 20 MW',
        href: '/wiki/energy/microgrids',
        icon: '🔋',
        color: '#8B5CF6',
        description:
            'Integrated DER management with islanding capability, black start procedures, grid-forming inverters, and adaptive protection for campus and community microgrids.',
        tags: ['IEEE 2030.7', 'Islanding', 'MPC', 'UL 1741'],
    },
    {
        title: 'Smart Homes',
        subtitle: 'Smart Meter as Hub',
        href: '/wiki/energy/smart-homes',
        icon: '🏡',
        color: '#06B6D4',
        description:
            'Behind-the-meter DER integration via smart meters, HEMS edge/cloud architecture, TOU optimization, V2H/V2G bidirectional charging, and demand response orchestration.',
        tags: ['IEEE 2030.5', 'OpenADR', 'Matter', 'OCPP'],
    },
    {
        title: 'Battery Energy Storage',
        subtitle: '10 – 100 MW Utility-Scale',
        href: '/wiki/energy/bess',
        icon: '🔋',
        color: '#EF4444',
        description:
            'Utility-scale BESS with hierarchical BMS, bidirectional PCS, SOC management strategies, thermal runaway detection, and NFPA 855 compliance.',
        tags: ['UL 9540', 'NFPA 855', 'SiC MOSFET', 'MPC'],
    },
    {
        title: 'Virtual Power Plants & DERMS',
        subtitle: 'Software-Defined Grid',
        href: '/wiki/energy/vpp-derms',
        icon: '☁️',
        color: '#EC4899',
        description:
            'DER aggregation platform with ML forecasting, MILP optimization, market bidding engines, and FERC Order 2222 compliance for wholesale market participation.',
        tags: ['FERC 2222', 'MILP', 'Kafka', 'LSTM'],
    },
];

export default function EnergyHubPage() {
    return (
        <div className="max-w-5xl space-y-12">
            {/* Header */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-xl font-bold text-white flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #F59E0B, #ea580c)' }}
                    >
                        ⚡
                    </div>
                    <div>
                        <span className="text-[10px] text-gray-500 font-mono block">
                            CISA SECTOR 08 · ENER
                        </span>
                        <h1 className="text-3xl font-heading font-bold text-white">
                            Energy Sector Reference Architecture
                        </h1>
                    </div>
                </div>
                <p className="text-gray-400 text-base leading-relaxed max-w-3xl">
                    A comprehensive TOGAF-based reference architecture covering seven critical
                    facility types in the modern energy sector — from 765 kV transmission substations
                    to behind-the-meter smart homes. Each article provides detailed process diagrams,
                    bills of materials, Purdue model mappings, communication protocol stacks, and
                    safety system specifications aligned with IEEE, IEC, NFPA, and FERC standards.
                </p>
            </div>

            {/* Executive Summary */}
            <Section title="Executive Summary" id="executive-summary">
                <p className="text-sm text-gray-300 leading-relaxed">
                    The modern electrical grid has evolved from a unidirectional bulk power delivery
                    system into a complex, bidirectional cyber-physical network integrating millions
                    of distributed energy resources (DERs). This reference architecture documents
                    seven facility types that collectively form the end-to-end energy value chain,
                    from generation-tie transmission substations through last-mile distribution
                    points to behind-the-meter prosumer installations. The architecture follows the{' '}
                    <span className="text-[#FF6B00] font-medium">
                        TOGAF Architecture Development Method (ADM)
                    </span>{' '}
                    and the{' '}
                    <span className="text-[#FF6B00] font-medium">
                        ISA-95 / Purdue Enterprise Reference Architecture
                    </span>{' '}
                    to provide a consistent framework across all facility types (The Open Group, 2022;
                    Williams, 1994).
                </p>
                <p className="text-sm text-gray-300 leading-relaxed mt-3">
                    Each facility article includes: (1) TOGAF Business Architecture with stakeholder
                    analysis and regulatory frameworks; (2) detailed technical descriptions with
                    equipment specifications; (3) process diagrams showing energy, data, and control
                    flows; (4) comprehensive Bills of Materials with generic equipment types;
                    (5) Purdue model mappings from Level 0 (process) through Level 4 (enterprise);
                    and (6) safety and supporting systems including fire suppression, HVAC, and
                    cybersecurity controls.
                </p>
            </Section>

            {/* Value Chain Diagram */}
            <Section title="End-to-End Energy Value Chain" id="value-chain">
                <div
                    className="rounded-lg border border-white/[0.06] p-6 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`Generation ──► Transmission (230-765kV) ──► Distribution Substation (4-34.5kV)
                                    │
                                    ▼
                         Distribution Points (Last Mile)
                                    │
                                    ▼
                           Smart Homes (Behind Meter)


  BESS (10-100MW) ◄──► Transmission/Distribution (Grid Services)
  Microgrids (1-20MW) ◄──► Distribution (Island/Export)

  VPP/DERMS (Software) ◄── Aggregates ──► Smart Homes + BESS + Microgrids
  VPP/DERMS ──► ISO/RTO Markets (Bids/Settlement)`}</pre>
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">
                    Figure 1. End-to-end energy value chain showing the seven facility types
                    documented in this reference architecture. Solid arrows indicate power flow;
                    dashed arrows indicate control and data flow.
                </p>
            </Section>

            {/* Methodology */}
            <Section title="Methodology & Frameworks" id="methodology">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        {
                            title: 'TOGAF ADM',
                            body: 'Each facility is analyzed through Phase A (Architecture Vision), Phase B (Business Architecture), Phase C (Information Systems Architecture), and Phase D (Technology Architecture) of the TOGAF ADM cycle.',
                            color: '#F59E0B',
                        },
                        {
                            title: 'Purdue / ISA-95 Model',
                            body: 'Equipment and systems are mapped to Purdue Levels 0 (Process) through Level 4/5 (Enterprise/Cloud), including the critical Level 3.5 DMZ demarcation for cybersecurity.',
                            color: '#3B82F6',
                        },
                        {
                            title: 'IEC 62443 / NERC CIP',
                            body: 'Cybersecurity architectures are aligned with IEC 62443 zone-and-conduit model and NERC Critical Infrastructure Protection (CIP) standards for bulk electric system assets.',
                            color: '#EF4444',
                        },
                        {
                            title: 'SGAM Framework',
                            body: 'The Smart Grid Architecture Model (SGAM) from CEN-CENELEC-ETSI provides interoperability layers: Component, Communication, Information, Function, and Business.',
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
                                <th className="text-left px-3 py-2 font-medium">Transmission</th>
                                <th className="text-left px-3 py-2 font-medium">Distribution</th>
                                <th className="text-left px-3 py-2 font-medium">Microgrids</th>
                                <th className="text-left px-3 py-2 font-medium">Smart Homes</th>
                                <th className="text-left px-3 py-2 font-medium">BESS</th>
                                <th className="text-left px-3 py-2 font-medium">VPP/DERMS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { level: 'L0', cells: ['HV breakers, CTs', 'VTs, fault det.', 'DER sensors', 'CTs, panels', 'Cell sensors', 'DER inverters'] },
                                { level: 'L1', cells: ['Protection IEDs', 'Recloser ctrl', 'DER controllers', 'HAN devices', 'Rack BMS', 'Edge gateways'] },
                                { level: 'L2', cells: ['HMI, RTU', 'Dist. SCADA', 'μGrid SCADA', 'Smart meter', 'Container SCADA', 'DERMS'] },
                                { level: 'L3', cells: ['Station SCADA', 'DMS/OMS', 'μGrid EMS', 'Cloud HEMS', 'Plant EMS', 'VPP optimizer'] },
                                { level: 'L3.5', cells: ['FW/DMZ', 'FW/DMZ', 'DMZ', '—', 'DMZ', 'Zero trust'] },
                                { level: 'L4', cells: ['Enterprise EMS', 'ADMS/DERMS', 'Utility DERMS', 'Billing', 'Market dispatch', 'ISO markets'] },
                            ].map((row) => (
                                <tr key={row.level} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#FF6B00] font-mono font-medium">{row.level}</td>
                                    {row.cells.map((cell, i) => (
                                        <td key={i} className="px-3 py-2 text-gray-400">{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">
                    Table 1. Unified Purdue model mapping across all facility types, adapted from
                    ISA-95 (Williams, 1994) and extended for modern DER-enabled grids.
                </p>
            </Section>

            {/* Communication Protocol Stack */}
            <Section title="Communication Protocol Stack" id="protocol-stack">
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`Application:  ICCP/TASE.2 │ OpenADR │ IEEE 2030.5 │ OCPP │ DLMS/COSEM
Transport:    IEC 61850 MMS │ DNP3/IEC 104 │ MQTT │ REST/SOAP
Network:      TCP/IP │ RS-485 │ Zigbee │ Thread (IPv6) │ LoRaWAN
Physical:     Fiber │ Ethernet │ Cellular (LTE-M/5G) │ RF Mesh (900MHz)`}</pre>
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">
                    Figure 2. Communication protocol stack spanning all seven facility types, from
                    process-bus sampled values to enterprise-level market interfaces.
                </p>
            </Section>

            {/* Cybersecurity */}
            <Section title="Cybersecurity Architecture" id="cybersecurity">
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
                                ['Perimeter (L3.5)', 'Firewalls, data diodes, VPN gateways, protocol converters'],
                                ['Network', 'VLAN segmentation, PRP/HSR redundancy, encrypted DNP3'],
                                ['Endpoint', 'RBAC, certificate-based authentication, hardened IEDs'],
                                ['Monitoring', 'IDS/IPS, ML anomaly detection on SCADA traffic, SOC integration'],
                                ['Governance', 'NERC CIP compliance, IEC 62351 encryption, penetration testing'],
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
                                    <h3 className="text-sm font-semibold text-white group-hover:text-[#FF6B00] transition-colors">
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
                        CEN-CENELEC-ETSI Smart Grid Coordination Group. (2012).{' '}
                        <em>Smart Grid Reference Architecture</em>. European Committee for Standardization.
                    </p>
                    <p>
                        International Electrotechnical Commission. (2013).{' '}
                        <em>IEC 61850: Communication networks and systems for power utility automation</em>.
                        IEC.
                    </p>
                    <p>
                        International Electrotechnical Commission. (2018).{' '}
                        <em>IEC 62443: Industrial communication networks – Network and system security</em>.
                        IEC.
                    </p>
                    <p>
                        North American Electric Reliability Corporation. (2024).{' '}
                        <em>Critical Infrastructure Protection (CIP) Standards</em>. NERC.
                    </p>
                    <p>
                        The Open Group. (2022).{' '}
                        <em>TOGAF Standard, Version 10</em>. The Open Group.
                    </p>
                    <p>
                        U.S. Department of Energy. (2015).{' '}
                        <em>Energy Sector-Specific Plan: An Annex to the NIPP 2013</em>. DOE.
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
                        { href: '/wiki/sectors/ENER', label: 'Energy Sector Overview', color: '#F59E0B' },
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
