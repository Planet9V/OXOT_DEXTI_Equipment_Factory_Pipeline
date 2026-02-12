/**
 * Water and Wastewater Systems Sector Reference Architecture — Wiki Hub Page.
 *
 * Comprehensive overview of the Water and Wastewater Systems Sector critical
 * infrastructure, serving as the entry point to 6 detailed facility-type
 * articles covering Surface Water Treatment Plants, Water Distribution
 * Networks, Pump Stations, Wastewater Treatment (POTW), Collection Systems,
 * and Stormwater Management Facilities.
 *
 * Based on TOGAF Architecture Development Method (ADM) with cross-references
 * to EPA, AWWA, ASCE, WEF, and NIST primary standards.
 *
 * @module wiki/water/page
 */

export const metadata = {
    title: 'Water & Wastewater Systems Reference Architecture — Wiki',
    description:
        'TOGAF-based reference architectures for 6 water/wastewater facility types: Treatment Plants, ' +
        'Distribution Networks, Pump Stations, POTWs, Collection Systems, and Stormwater Management.',
};

/** Facility type cards with routing. */
const FACILITY_ARTICLES = [
    {
        title: 'Surface Water Treatment Plants',
        subtitle: '1 – 500 MGD',
        href: '/wiki/water/treatment-plants',
        icon: '🏭',
        color: '#06B6D4',
        description:
            'Conventional treatment trains with coagulation, flocculation, sedimentation, dual-media filtration, and multi-barrier disinfection (chlorine/UV/ozone) meeting SDWA and 40 CFR 141 standards.',
        tags: ['SDWA', 'AWWA', '40 CFR 141', 'CT Compliance'],
    },
    {
        title: 'Water Distribution Networks',
        subtitle: 'Transmission & Distribution',
        href: '/wiki/water/distribution',
        icon: '🔗',
        color: '#0EA5E9',
        description:
            'Transmission mains (24–96″), distribution mains, elevated/ground storage, PRVs, fire hydrants, AMI smart metering, and water quality monitoring across pressure zones.',
        tags: ['AWWA C-series', 'NFPA 24', 'AMI', 'EPANET'],
    },
    {
        title: 'Pump Stations',
        subtitle: 'Water & Wastewater Lifting',
        href: '/wiki/water/pump-stations',
        icon: '⚙️',
        color: '#8B5CF6',
        description:
            'Wet-well/dry-well configurations with submersible and vertical turbine pumps, VFD control, surge protection, SCADA telemetry, and H₂S/LEL safety monitoring.',
        tags: ['ANSI/HI', '10 States', 'VFD', 'Force Main'],
    },
    {
        title: 'Wastewater Treatment (POTW)',
        subtitle: '1 – 1,000 MGD',
        href: '/wiki/water/wastewater',
        icon: '♻️',
        color: '#10B981',
        description:
            'Activated sludge POTWs with primary/secondary/tertiary treatment, BNR for nutrient removal, anaerobic digestion with biogas CHP, dewatering, and NPDES compliance.',
        tags: ['CWA', 'NPDES', 'NFPA 820', 'BNR'],
    },
    {
        title: 'Collection Systems',
        subtitle: 'Gravity & Force Main Networks',
        href: '/wiki/water/collection-systems',
        icon: '🕳️',
        color: '#F97316',
        description:
            'Gravity sewer networks (laterals → collectors → interceptors), manholes, lift stations, CCTV condition assessment (NASSCO PACP), and I/I reduction programs.',
        tags: ['CMOM', 'NASSCO', 'CIPP', 'SSO'],
    },
    {
        title: 'Stormwater Management',
        subtitle: 'Gray & Green Infrastructure',
        href: '/wiki/water/stormwater',
        icon: '🌧️',
        color: '#3B82F6',
        description:
            'Detention/retention facilities, bioswales, permeable pavement, constructed wetlands, vortex separators, and real-time SCADA control for CSO/SSO prevention.',
        tags: ['MS4', 'TMDL', 'BMP', 'Green Infra'],
    },
];

export default function WaterHubPage() {
    return (
        <div className="max-w-5xl space-y-12">
            {/* Header */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-xl font-bold text-white flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #06B6D4, #0284C7)' }}
                    >
                        💧
                    </div>
                    <div>
                        <span className="text-[10px] text-gray-500 font-mono block">
                            CISA SECTOR 16 · WATR
                        </span>
                        <h1 className="text-3xl font-heading font-bold text-white">
                            Water &amp; Wastewater Systems Reference Architecture
                        </h1>
                    </div>
                </div>
                <p className="text-gray-400 text-base leading-relaxed max-w-3xl">
                    A comprehensive TOGAF-based reference architecture covering six critical
                    facility types in the water and wastewater sector — from conventional surface
                    water treatment plants processing 500+ MGD to green infrastructure stormwater
                    BMPs. Each article provides detailed process diagrams, bills of materials,
                    Purdue model mappings, communication protocol stacks, and safety system
                    specifications aligned with EPA, AWWA, WEF, ASCE, and NIST standards.
                </p>
            </div>

            {/* Executive Summary */}
            <Section title="Executive Summary" id="executive-summary">
                <p className="text-sm text-gray-300 leading-relaxed">
                    The Water and Wastewater Systems sector encompasses over{' '}
                    <span className="text-[#06B6D4] font-medium">153,000 public drinking water systems</span>{' '}
                    and more than{' '}
                    <span className="text-[#06B6D4] font-medium">16,000 publicly owned treatment works (POTWs)</span>{' '}
                    in the United States alone, serving approximately 300 million people. Regulated
                    by the Safe Drinking Water Act (SDWA) and the Clean Water Act (CWA), this sector
                    forms a critical lifeline upon which every other infrastructure sector depends.
                    The shift toward smart water utilities — leveraging AMI, digital twins, and
                    AI-driven optimization — is transforming century-old treatment and distribution
                    paradigms into intelligent, sensor-rich cyber-physical systems (AWWA, 2022;
                    EPA, 2024).
                </p>
                <p className="text-sm text-gray-300 leading-relaxed mt-3">
                    Each facility article includes: (1) TOGAF Business Architecture with stakeholder
                    analysis and regulatory frameworks; (2) detailed technical descriptions with
                    equipment specifications in engineering units; (3) process diagrams showing water,
                    data, and control flows; (4) comprehensive Bills of Materials with generic equipment
                    types; (5) Purdue model mappings from Level 0 (process instruments) through
                    Level 4 (enterprise/cloud); and (6) safety and supporting systems including
                    confined-space programs, chemical containment, and cybersecurity controls per
                    NIST 800-82 and CISA guidelines (NIST, 2023; CISA, 2024).
                </p>
            </Section>

            {/* Value Chain Diagram */}
            <Section title="End-to-End Water Value Chain" id="value-chain">
                <div
                    className="rounded-lg border border-white/[0.06] p-6 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`Source Water ──► Surface Water Treatment (1-500 MGD) ──► Clearwell Storage
(Rivers/Lakes)     (Coag → Floc → Sed → Filt → Disinfect)        │
                                                                  ▼
                                                    Water Distribution Network
                                                    (Transmission → Distribution)
                                                           │          │
                                                    Pump Stations   Storage Tanks
                                                           │          │
                                                           ▼          ▼
                                                     End Users (Residential/C&I)
                                                           │
                                                           ▼
                                                 Wastewater Collection System
                                                 (Gravity Sewers → Lift Stations)
                                                           │
                                                           ▼
                                              Wastewater Treatment (POTW)
                                       (Prelim → Primary → Secondary → Tertiary)
                                                    │              │
                                              Effluent         Biosolids
                                              Discharge        Recovery
                                                    │
  Stormwater Management ──► Combined/Separate ──► Receiving Waters
  (Detention → BMPs → Green Infra)                 (Rivers/Oceans)`}</pre>
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">
                    Figure 1. End-to-end water value chain showing the six facility types
                    documented in this reference architecture. Solid arrows indicate water flow
                    from source to discharge.
                </p>
            </Section>

            {/* Methodology */}
            <Section title="Methodology & Frameworks" id="methodology">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        {
                            title: 'TOGAF ADM',
                            body: 'Each facility is analyzed through Phase A (Architecture Vision), Phase B (Business Architecture), Phase C (Information Systems Architecture), and Phase D (Technology Architecture) of the TOGAF ADM cycle.',
                            color: '#06B6D4',
                        },
                        {
                            title: 'Purdue / ISA-95 Model',
                            body: 'Equipment and systems are mapped to Purdue Levels 0 (Process) through Level 4/5 (Enterprise/Cloud), including the critical Level 3.5 DMZ for IT/OT segmentation per IEC 62443.',
                            color: '#0EA5E9',
                        },
                        {
                            title: 'NIST 800-82 / CISA',
                            body: 'Cybersecurity architectures are aligned with NIST SP 800-82 Guide to ICS Security, CISA water sector alerts, and AWWA process control system security guidance.',
                            color: '#EF4444',
                        },
                        {
                            title: 'EPA / AWWA Standards',
                            body: 'Technical specifications reference SDWA, CWA, AWWA C-series pipe standards, AWWA M-series manuals, WEF MOPs, and the 10 States Standards (GLUMRB) for design criteria.',
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
                                <th className="text-left px-3 py-2 font-medium">Treatment</th>
                                <th className="text-left px-3 py-2 font-medium">Distribution</th>
                                <th className="text-left px-3 py-2 font-medium">Pump Stations</th>
                                <th className="text-left px-3 py-2 font-medium">POTW</th>
                                <th className="text-left px-3 py-2 font-medium">Collection</th>
                                <th className="text-left px-3 py-2 font-medium">Stormwater</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { level: 'L0', cells: ['Analyzers, valves', 'PRVs, hydrants', 'Pumps, level', 'Aerators, clarifiers', 'Flow meters', 'Rain gauges'] },
                                { level: 'L1', cells: ['PLC chemical dose', 'RTU/PLC control', 'PLC pump seq.', 'PLC blower ctrl', 'RTU lift station', 'PLC gates'] },
                                { level: 'L2', cells: ['Plant SCADA', 'Dist. SCADA', 'Station HMI', 'Plant SCADA', 'Collection SCADA', 'Storm SCADA'] },
                                { level: 'L3', cells: ['Historian, LIMS', 'Hydraulic model', 'Asset mgmt', 'Historian, BNR opt.', 'GIS, CMMS', 'Decision support'] },
                                { level: 'L3.5', cells: ['FW/DMZ', 'FW/DMZ', 'FW/VPN', 'FW/DMZ', 'FW/VPN', 'FW/DMZ'] },
                                { level: 'L4', cells: ['CCR, billing', 'CIS, AMI head-end', 'Enterprise', 'NPDES reporting', 'CMOM reporting', 'MS4 reporting'] },
                            ].map((row) => (
                                <tr key={row.level} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#06B6D4] font-mono font-medium">{row.level}</td>
                                    {row.cells.map((cell, i) => (
                                        <td key={i} className="px-3 py-2 text-gray-400">{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">
                    Table 1. Unified Purdue model mapping across all water/wastewater facility types,
                    adapted from ISA-95 (Williams, 1994) and NIST SP 800-82 (NIST, 2023).
                </p>
            </Section>

            {/* Communication Protocol Stack */}
            <Section title="Communication Protocol Stack" id="protocol-stack">
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`Application:  OPC UA │ MQTT │ REST/JSON │ DLMS/COSEM │ WaterML 2.0
Transport:    DNP3 │ Modbus TCP │ BACnet/IP │ IEC 60870-5-104
Network:      TCP/IP │ Cellular (LTE-M/5G) │ RF Mesh (900 MHz) │ LoRaWAN
Link/Field:   Modbus RTU │ 4–20 mA/HART │ SDI-12 │ Profibus DP
Physical:     Fiber │ Ethernet │ RS-485 │ Copper Twisted Pair │ Cellular`}</pre>
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">
                    Figure 2. Communication protocol stack spanning all six facility types,
                    from field instrument signals to enterprise-level reporting interfaces.
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
                                ['Perimeter (L3.5)', 'Next-gen firewalls, unidirectional gateways (data diodes), VPN with MFA, protocol break at DMZ'],
                                ['Network', 'VLAN segmentation by function, 802.1X port security, encrypted DNP3-SA, network TAPs for monitoring'],
                                ['Endpoint', 'RBAC on all HMIs, application whitelisting, PLC firmware integrity checks, disabled USB ports'],
                                ['Monitoring', 'IDS/IPS tuned for Modbus/DNP3 anomalies, SIEM integration, 24×7 SOC monitoring'],
                                ['Governance', 'NIST 800-82 compliance, AWWA cybersecurity guidance, CISA cross-sector alerts, annual pen testing'],
                                ['Remote Access', 'Jump servers in DMZ, time-limited VPN sessions, screen recording for vendor access'],
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
                        American Water Works Association. (2022).{' '}
                        <em>State of the Water Industry Report</em>. AWWA.
                    </p>
                    <p>
                        Cybersecurity and Infrastructure Security Agency. (2024).{' '}
                        <em>Water and Wastewater Systems Sector-Specific Plan</em>. CISA/DHS.
                    </p>
                    <p>
                        Metcalf &amp; Eddy, Tchobanoglous, G., Stensel, H. D., Tsuchihashi, R., &amp; Burton, F. (2014).{' '}
                        <em>Wastewater Engineering: Treatment and Resource Recovery</em> (5th ed.). McGraw-Hill.
                    </p>
                    <p>
                        National Institute of Standards and Technology. (2023).{' '}
                        <em>SP 800-82 Rev. 3: Guide to Operational Technology (OT) Security</em>. NIST.
                    </p>
                    <p>
                        The Open Group. (2022).{' '}
                        <em>TOGAF Standard, Version 10</em>. The Open Group.
                    </p>
                    <p>
                        U.S. Environmental Protection Agency. (2024).{' '}
                        <em>Water and Wastewater Sector Overview</em>. EPA.
                    </p>
                    <p>
                        Water Environment Federation. (2018).{' '}
                        <em>Design of Water Resource Recovery Facilities</em> (MOP 8, 6th ed.). WEF Press.
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
                        { href: '/wiki/sectors/WATR', label: 'Water Sector Overview', color: '#06B6D4' },
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
