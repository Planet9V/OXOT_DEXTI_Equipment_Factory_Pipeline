import TransportationStepSection from './TransportationStepSection';

/**
 * Transportation Systems Sector Reference Architecture — Wiki Hub Page.
 *
 * Comprehensive overview of the Transportation Systems Sector critical
 * infrastructure, serving as the entry point to 7 detailed facility-type
 * articles covering Commercial Airports, Container Port Terminals, Metro
 * Rail Systems, Gas Pipeline Compressor Stations, Classification Yards,
 * Highway Tunnels, and Regional Sorting Facilities.
 *
 * Based on TOGAF Architecture Development Method (ADM) with cross-references
 * to DOT, FAA, FRA, FTA, PHMSA, USCG, and TSA primary standards.
 *
 * @module wiki/transportation/page
 */

export const metadata = {
    title: 'Transportation Systems Sector Reference Architecture — Wiki',
    description:
        'TOGAF-based reference architectures for 7 transportation facility types: Commercial Airports, ' +
        'Container Ports, Metro Rail, Pipeline Compressor Stations, Classification Yards, Highway Tunnels, ' +
        'and Regional Sorting Facilities.',
};

/** Facility type cards with routing. */
const FACILITY_ARTICLES = [
    {
        title: 'Commercial Airport',
        subtitle: 'FAA Part 139 Certified',
        href: '/wiki/transportation/commercial-airport',
        icon: '✈️',
        color: '#0EA5E9',
        description:
            'Airfield lighting and NAVAIDs (ILS Cat III, PAPI, MALSR), jet fuel hydrant systems, inline EDS baggage handling, ground power units, and ARFF per 14 CFR 139.',
        tags: ['14 CFR 139', 'ICAO Annex 14', 'SWIM', 'A-CDM'],
    },
    {
        title: 'Container Port Terminal',
        subtitle: '1M+ TEU Deep-Water',
        href: '/wiki/transportation/container-port',
        icon: '🚢',
        color: '#6366F1',
        description:
            'Ship-to-shore gantry cranes (65t, 22-container outreach), RTG/ASC yard automation, TOS (NAVIS N4), reefer monitoring, and IEC 80005 cold ironing.',
        tags: ['MTSA', 'ISPS Code', 'NAVIS N4', 'DGPS'],
    },
    {
        title: 'Metro Rail System',
        subtitle: '750 VDC / CBTC GoA4',
        href: '/wiki/transportation/metro-rail',
        icon: '🚇',
        color: '#EC4899',
        description:
            'Traction power rectifier substations, CBTC signaling (Thales SelTrac / Siemens Trainguard MT), tunnel ventilation per NFPA 130, and platform screen doors.',
        tags: ['NFPA 130', 'IEEE 1474.1', 'CBTC', 'TETRA'],
    },
    {
        title: 'Pipeline Compressor Station',
        subtitle: '10,000–30,000 HP',
        href: '/wiki/transportation/pipeline-compressor',
        icon: '🔵',
        color: '#F59E0B',
        description:
            'Gas turbine-driven centrifugal compressors (Solar Taurus/Mars), inlet scrubbers, aerial coolers, ultrasonic custody transfer metering, and TSA Security Directives.',
        tags: ['49 CFR 192', 'ASME B31.8', 'API 618', 'DNP3'],
    },
    {
        title: 'Classification Yard',
        subtitle: '64-Track Hump Yard',
        href: '/wiki/transportation/classification-yard',
        icon: '🚂',
        color: '#EF4444',
        description:
            'Electro-hydraulic retarder systems, automated hump routing, AEI/RFID car identification (AAR S-918), WILD/HBD defect detection, and yard automation control.',
        tags: ['49 CFR 213', 'AREMA', 'AAR S-918', 'PTC'],
    },
    {
        title: 'Highway Tunnel',
        subtitle: 'NFPA 502 Compliant',
        href: '/wiki/transportation/highway-tunnel',
        icon: '🚗',
        color: '#10B981',
        description:
            'Longitudinal jet fan ventilation, FFFS deluge suppression, VESDA smoke detection, ITS lane control, CIE 88 tunnel lighting, and SCADA integration.',
        tags: ['NFPA 502', 'AASHTO', 'NTCIP', 'PIARC'],
    },
    {
        title: 'Regional Sorting Facility',
        subtitle: '1M Packages/Day',
        href: '/wiki/transportation/sorting-facility',
        icon: '📦',
        color: '#A855F7',
        description:
            'Cross-belt sorters (20,000 items/hr), 6-sided scan tunnels with OCR, AMR fleets (500+ units), WMS/WCS/WES hierarchy, and PROFINET/EtherNet/IP controls.',
        tags: ['OSHA 1910', 'NFPA 13', 'EDI X12', 'MQTT'],
    },
];

export default function TransportationHubPage() {
    return (
        <div className="max-w-7xl space-y-12">
            {/* 4-Step Sector Architecture Viewer */}
            <TransportationStepSection />

            {/* Separator between step viewer and TOGAF reference */}
            <div className="border-t border-white/[0.06] pt-12">
                <h2 className="text-lg font-heading font-semibold text-gray-500 mb-8">
                    📖 Full TOGAF Reference Architecture
                </h2>
            </div>

            {/* Header */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-xl font-bold text-white flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #0EA5E9, #0284C7)' }}
                    >
                        🚛
                    </div>
                    <div>
                        <span className="text-[10px] text-gray-500 font-mono block">
                            CISA SECTOR 15 &middot; TRAN
                        </span>
                        <h1 className="text-3xl font-heading font-bold text-white">
                            Transportation Systems Sector Reference Architecture
                        </h1>
                    </div>
                </div>
                <p className="text-gray-400 text-base leading-relaxed max-w-3xl">
                    A comprehensive TOGAF-based reference architecture covering seven critical
                    facility types in the Transportation Systems sector &mdash; from FAA-certified
                    commercial airports and deep-water container ports to CBTC metro rail systems,
                    gas pipeline compressor stations, freight rail classification yards, NFPA 502
                    highway tunnels, and high-speed automated sorting facilities. Each article
                    provides detailed process diagrams, bills of materials, Purdue model mappings,
                    communication protocol stacks, and safety system specifications aligned with
                    DOT, FAA, FRA, FTA, PHMSA, USCG, and TSA standards.
                </p>
            </div>

            {/* Executive Summary */}
            <Section title="Executive Summary" id="executive-summary">
                <p className="text-sm text-gray-300 leading-relaxed">
                    The Transportation Systems Sector encompasses the physical assets, control
                    systems, and operational technologies that move people and goods across
                    approximately 4 million miles of roadways, 25,000 miles of navigable waterways,
                    140,000 miles of railroad, 600,000 bridges, 300 ports, 19,000 airports, and
                    2.6 million miles of pipeline. This sector is jointly overseen by the{' '}
                    <span className="text-[#0EA5E9] font-medium">
                        Department of Homeland Security (DHS)
                    </span>{' '}
                    and the{' '}
                    <span className="text-[#0EA5E9] font-medium">
                        Department of Transportation (DOT)
                    </span>{' '}
                    as co-Sector Risk Management Agencies (SRMAs), with modal agencies (FAA, FRA,
                    FTA, FMCSA, PHMSA, MARAD) providing specialized regulatory oversight. The
                    architecture follows the{' '}
                    <span className="text-[#0EA5E9] font-medium">
                        TOGAF Architecture Development Method (ADM)
                    </span>{' '}
                    and the{' '}
                    <span className="text-[#0EA5E9] font-medium">
                        ISA-95 / Purdue Enterprise Reference Architecture
                    </span>{' '}
                    to provide a consistent framework across all facility types (The Open Group,
                    2022; Williams, 1994).
                </p>
                <p className="text-sm text-gray-300 leading-relaxed mt-3">
                    Each facility article includes: (1) TOGAF Business Architecture with stakeholder
                    analysis and regulatory frameworks; (2) detailed technical descriptions with
                    equipment specifications and engineering parameters; (3) process diagrams
                    showing material, energy, data, and safety flows; (4) comprehensive Bills of
                    Materials with generic equipment types; (5) Purdue model mappings from Level 0
                    (process) through Level 4 (enterprise); and (6) safety and supporting systems
                    including fire suppression, environmental monitoring, and cybersecurity controls.
                    The sector&apos;s digital transformation is accelerating through IoT-enabled
                    asset monitoring, AI-driven traffic management, autonomous vehicles and cranes,
                    and CBTC/PTC train control technologies.
                </p>
            </Section>

            {/* Value Chain Diagram */}
            <Section title="End-to-End Transportation Value Chain" id="value-chain">
                <div
                    className="rounded-lg border border-white/[0.06] p-6 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`AVIATION ──► Commercial Airport ──► Air Traffic Control ──► Destination Airport
                   (Fuel Farm, BHS, ARFF)

MARITIME ──► Container Port Terminal ──► Vessel Operations ──► Inland Distribution
                (STS Cranes, TOS, Gate)

RAIL (Freight) ──► Classification Yard ──► Line-Haul ──► Destination Yard
                     (Hump, Retarders, AEI)

RAIL (Transit) ──► Metro Rail System ──► Station Network ──► Passenger Delivery
                    (Traction Power, CBTC)

PIPELINE ──► Compressor Station ──► Pipeline Segment ──► Next Station / City Gate
               (40-100 mi spacing)

HIGHWAY ──► Highway Tunnel ──► ITS Corridor ──► Destination
              (Ventilation, FFFS, SCADA)

POSTAL ──► Sorting Facility ──► Line-Haul / Air ──► Last-Mile Delivery
             (Sorters, AMRs, WCS)

  ┌─────────────────────────────────────────────────────────────────┐
  │ CROSS-MODAL: Intermodal terminals link Port ↔ Rail ↔ Truck     │
  │              Airport cargo ↔ Sorting facility ↔ Last-mile      │
  └─────────────────────────────────────────────────────────────────┘`}</pre>
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">
                    Figure 1. End-to-end transportation value chain showing the seven facility
                    types documented in this reference architecture and their intermodal linkages.
                </p>
            </Section>

            {/* Methodology */}
            <Section title="Methodology &amp; Frameworks" id="methodology">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        {
                            title: 'TOGAF ADM',
                            body: 'Each facility is analyzed through Phase A (Architecture Vision), Phase B (Business Architecture), Phase C (Information Systems Architecture), and Phase D (Technology Architecture) of the TOGAF ADM cycle.',
                            color: '#0EA5E9',
                        },
                        {
                            title: 'Purdue / ISA-95 Model',
                            body: 'Equipment and systems are mapped to Purdue Levels 0 (Process) through Level 4/5 (Enterprise/Cloud), including the critical Level 3.5 DMZ demarcation for OT/IT cybersecurity segmentation.',
                            color: '#6366F1',
                        },
                        {
                            title: 'NIST CSF / TSA Directives',
                            body: 'Cybersecurity architectures align with NIST Cybersecurity Framework and TSA Security Directives (SD-1, SD-2) for pipeline, aviation, and surface transportation modes.',
                            color: '#EF4444',
                        },
                        {
                            title: 'DOT Modal Frameworks',
                            body: 'Each facility type aligns with its modal regulatory framework: FAA for aviation, FRA/FTA for rail, PHMSA for pipelines, FHWA for highways, USCG/MARAD for maritime.',
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
                                <th className="text-left px-3 py-2 font-medium">Airport</th>
                                <th className="text-left px-3 py-2 font-medium">Port</th>
                                <th className="text-left px-3 py-2 font-medium">Metro</th>
                                <th className="text-left px-3 py-2 font-medium">Pipeline</th>
                                <th className="text-left px-3 py-2 font-medium">Rail Yard</th>
                                <th className="text-left px-3 py-2 font-medium">Tunnel</th>
                                <th className="text-left px-3 py-2 font-medium">Sorting</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { level: 'L0', cells: ['Runway lights, PAPI', 'Spreader sensors', 'Track circuits', 'Vibration probes', 'Retarder actuators', 'CO/NO\u2082 sensors', 'Photoelectric'] },
                                { level: 'L1', cells: ['BHS PLC, fuel PLC', 'Crane PLC, RTG', 'Interlocking, CBTC', 'Compressor PLC', 'Switch machine ctrl', 'Jet fan VFD', 'Conveyor PLC'] },
                                { level: 'L2', cells: ['BHS SCADA, FIDS', 'TOS, DGPS, yard', 'ATS/OCC, SCADA', 'Local HMI, RTU', 'Hump computer', 'Tunnel SCADA', 'WCS, sorter HMI'] },
                                { level: 'L3', cells: ['AODB, SWIM', 'Terminal mgmt', 'Train mgmt (TMMS)', 'Gas control SCADA', 'YMS, planning', 'TMC', 'WMS, OMS'] },
                                { level: 'L3.5', cells: ['FW/DMZ', 'IDMZ', 'IEC 62443 DMZ', 'TSA SD DMZ', 'FW/DMZ', 'FW/DMZ', 'API gateway'] },
                                { level: 'L4', cells: ['Airline ERP', 'Port community', 'Ridership analytics', 'Gas scheduling', 'Railroad ERP', 'Toll/DOT GIS', 'ERP, TMS'] },
                            ].map((row) => (
                                <tr key={row.level} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#0EA5E9] font-mono font-medium">{row.level}</td>
                                    {row.cells.map((cell, i) => (
                                        <td key={i} className="px-3 py-2 text-gray-400">{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">
                    Table 1. Unified Purdue model mapping across all seven transportation facility
                    types, adapted from ISA-95 (Williams, 1994) with modal-specific extensions.
                </p>
            </Section>

            {/* Communication Protocol Stack */}
            <Section title="Communication Protocol Stack" id="protocol-stack">
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`Application:  SWIM/FIXM | BAPLIE/COPINO | CBTC | DNP3 | NTCIP | EDI X12
Transport:    OPC UA | Modbus TCP | MQTT | REST/SOAP | gRPC
Network:      TCP/IP | PROFINET | EtherNet/IP | TETRA | LTE/5G
Physical:     Fiber (DWDM) | Ethernet | Microwave/VSAT | RF (915 MHz RFID)`}</pre>
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">
                    Figure 2. Communication protocol stack spanning all seven facility types, from
                    field-level sensor buses to enterprise-level market and scheduling interfaces.
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
                                ['Perimeter (L3.5)', 'Next-gen firewalls, data diodes, protocol gateways, VPN concentrators, TSA SD compliance'],
                                ['Network', 'VLAN segmentation, 802.1X NAC, encrypted protocols (TLS 1.3), PRP/HSR redundancy'],
                                ['Endpoint', 'RBAC with MFA, certificate-based device auth, application whitelisting, hardened PLCs'],
                                ['Monitoring', 'OT-specific IDS/IPS (Claroty/Nozomi), SIEM integration, 24/7 SOC, anomaly detection'],
                                ['Physical', 'TWIC/CAC access control, CCTV with AI analytics, radiation portal monitors, perimeter intrusion'],
                                ['Governance', 'NIST CSF alignment, TSA Security Directives, IEC 62443 zones/conduits, annual pen testing'],
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
                                    <h3 className="text-sm font-semibold text-white group-hover:text-[#0EA5E9] transition-colors">
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
                        Department of Homeland Security. (2015).{' '}
                        <em>Transportation Systems Sector-Specific Plan</em>. DHS.
                    </p>
                    <p>
                        Department of Transportation. (2024).{' '}
                        <em>Transportation Systems Sector-Specific Plan: An Annex to the NIPP</em>. DOT.
                    </p>
                    <p>
                        International Electrotechnical Commission. (2018).{' '}
                        <em>IEC 62443: Industrial communication networks &mdash; Network and system security</em>. IEC.
                    </p>
                    <p>
                        National Institute of Standards and Technology. (2024).{' '}
                        <em>NIST Cybersecurity Framework 2.0</em>. NIST.
                    </p>
                    <p>
                        The Open Group. (2022).{' '}
                        <em>TOGAF Standard, Version 10</em>. The Open Group.
                    </p>
                    <p>
                        Transportation Security Administration. (2023).{' '}
                        <em>TSA Security Directives for Surface Transportation and Aviation</em>. TSA.
                    </p>
                    <p>
                        Williams, T. J. (1994). The Purdue Enterprise Reference Architecture.{' '}
                        <em>Computers in Industry</em>, 24(2&ndash;3), 141&ndash;158.
                    </p>
                    <p>
                        American Society of Civil Engineers. (2024).{' '}
                        <em>Report Card for America&apos;s Infrastructure</em>. ASCE.
                    </p>
                </div>
            </Section>

            {/* See Also */}
            <Section title="See Also" id="see-also">
                <div className="flex flex-wrap gap-2">
                    {[
                        { href: '/wiki/sectors/TRAN', label: 'Transportation Sector Overview', color: '#0EA5E9' },
                        { href: '/wiki/dexpi/equipment-classes', label: 'DEXPI Equipment Classes', color: '#8B5CF6' },
                        { href: '/wiki/energy', label: 'Energy Sector Hub', color: '#F59E0B' },
                        { href: '/wiki/chemical', label: 'Chemical Sector Hub', color: '#EF4444' },
                        { href: '/wiki/pipeline', label: 'AI Pipeline V2', color: '#FF6B00' },
                    ].map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-white/[0.04]"
                            style={{ borderColor: `${link.color}30`, color: link.color }}
                        >
                            {link.label} &rarr;
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
