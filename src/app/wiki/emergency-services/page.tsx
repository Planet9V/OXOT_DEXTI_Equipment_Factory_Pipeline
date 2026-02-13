/**
 * Emergency Services Sector Reference Architecture — Wiki Hub Page.
 *
 * Comprehensive overview of the Emergency Services Sector critical infrastructure,
 * serving as the entry point to 5 detailed facility-type articles covering
 * 911/PSAP, Fire Stations, EOCs, EMS Bases, and HazMat Response.
 *
 * Based on TOGAF Architecture Development Method (ADM) with cross-references
 * to NFPA, NENA, FEMA, and OSHA standards.
 *
 * @module wiki/emergency-services/page
 */

export const metadata = {
    title: 'Emergency Services Sector Reference Architecture — Wiki',
    description:
        'TOGAF-based reference architectures for 5 emergency services facility types: 911/PSAP, Fire Station, ' +
        'Emergency Operations Center, EMS Base Station, and HazMat Response.',
};

/** Facility type cards with routing. */
const FACILITY_ARTICLES = [
    {
        title: '911 / PSAP Communications',
        subtitle: 'NG911 · ESInet',
        href: '/wiki/emergency-services/psap-911',
        icon: '📞',
        color: '#DC2626',
        description:
            'Next-Generation 911 Public Safety Answering Points with ESInet, SIP/HELD/LoST routing, Zetron dispatch consoles, Hexagon CAD integration, and NICE recording systems.',
        tags: ['NENA i3', 'SIP', 'CAD', 'NFPA 1221'],
    },
    {
        title: 'Fire Station Infrastructure',
        subtitle: 'NFPA 1221 / 1901',
        href: '/wiki/emergency-services/fire-station',
        icon: '🚒',
        color: '#F97316',
        description:
            'Fire/rescue stations with SCBA cascade systems, Plymovent exhaust extraction, P25/FirstNet radio, Opticom traffic pre-emption, and NFPA 1500 safety compliance.',
        tags: ['P25', 'SCBA', 'NFPA 1500', 'ICS'],
    },
    {
        title: 'Emergency Operations Center',
        subtitle: 'FEMA 361 · NIMS',
        href: '/wiki/emergency-services/eoc',
        icon: '🏛️',
        color: '#3B82F6',
        description:
            'FEMA 361 hardened EOCs with Christie video walls, WebEOC/D4H situational awareness, IPAWS/CAP alerting, CBRN filtration, and 72-hour autonomous operations.',
        tags: ['IPAWS', 'WebEOC', 'CBRN', 'CPG 101'],
    },
    {
        title: 'EMS Base Station',
        subtitle: 'NEMSIS · ePCR',
        href: '/wiki/emergency-services/ems-base',
        icon: '🚑',
        color: '#10B981',
        description:
            'Ambulance operations centers with vehicle maintenance, Stryker Power-PRO service, ePCR/NEMSIS data exchange, medical telemetry (12-lead ECG), and SSM fleet deployment.',
        tags: ['NEMSIS', 'HIPAA', 'NFPA 1917', 'ProQA'],
    },
    {
        title: 'HazMat Response Facility',
        subtitle: 'HAZWOPER · NFPA 472',
        href: '/wiki/emergency-services/hazmat-response',
        icon: '☢️',
        color: '#EAB308',
        description:
            'Hazardous materials response with Level A/B/C PPE (Kappler Zytron), RAE PID/FTIR detection, mass decontamination, intrinsically safe ATEX comms, and CAMEO/ALOHA modeling.',
        tags: ['HAZWOPER', 'ATEX', 'ERG', 'CERCLA'],
    },
];

export default function EmergencyServicesHubPage() {
    return (
        <div className="max-w-5xl space-y-12">
            {/* ── Header ──────────────────────────────────────────────── */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div
                        className="w-4 h-4 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]"
                        style={{ background: '#DC2626' }}
                    />
                    <span className="text-xs font-mono text-gray-500">
                        CISA SECTOR 07 · EMER · DHS/FEMA
                    </span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">
                    Emergency Services Sector
                </h1>
                <p className="text-sm text-gray-400 max-w-3xl">
                    TOGAF-based reference architectures for 5 critical emergency services
                    facility types — from 911 call processing through incident response and
                    hazardous materials mitigation.
                </p>
            </div>

            {/* ── Executive Summary ───────────────────────────────────── */}
            <Section title="Executive Summary" id="summary">
                <p className="text-sm text-gray-300 leading-relaxed">
                    The Emergency Services Sector encompasses the personnel, facilities, and
                    equipment that provide <span className="text-[#DC2626] font-medium">immediate
                        response to emergencies and natural disasters</span>. The sector includes
                    law enforcement, fire and rescue services, emergency medical services (EMS),
                    emergency management agencies, and hazardous materials response teams.
                    It is designated as CISA Sector 07 under the oversight of DHS and FEMA.
                </p>
                <p className="text-sm text-gray-300 leading-relaxed mt-3">
                    The U.S. operates approximately <span className="text-[#DC2626] font-medium">6,100+
                        PSAPs</span> processing over 240 million 911 calls annually, with the
                    NG911 transition replacing legacy CAMA trunks with IP-based ESInet.
                    Roughly <span className="text-[#DC2626] font-medium">29,000 fire departments</span> staff
                    over 1.1 million firefighters, supported by 21,000+ EMS agencies operating
                    82,000+ ambulances. FEMA coordinates through a network of regional,
                    state, and county Emergency Operations Centers (EOCs) using NIMS/ICS
                    command structures.
                </p>
                <p className="text-sm text-gray-300 leading-relaxed mt-3">
                    This sector&apos;s infrastructure is unique in that it must operate under
                    extreme stress conditions — natural disasters, mass casualty events, and
                    CBRN threats — while maintaining interoperability across federal, state,
                    local, tribal, and territorial (FSLTT) jurisdictions. The articles below
                    provide TOGAF-aligned reference architectures for five canonical facility
                    types spanning the full emergency services value chain.
                </p>
            </Section>

            {/* ── Value Chain ─────────────────────────────────────────── */}
            <Section title="Emergency Services Value Chain" id="value-chain">
                <p className="text-sm text-gray-400 mb-3">
                    End-to-end value chain from incident detection through response, mitigation,
                    and recovery across all five facility types.
                </p>
                <Diagram>{
                    `┌─────────────┐    ┌──────────────┐    ┌──────────────┐    ┌───────────────┐    ┌──────────────┐
│  DETECTION   │───►│   ALERTING   │───►│   DISPATCH   │───►│   RESPONSE    │───►│   RECOVERY   │
│              │    │              │    │              │    │               │    │              │
│ • Sensor     │    │ • IPAWS/WEA  │    │ • CAD        │    │ • Fire/Rescue │    │ • After-      │
│ • 911 Call   │    │ • EAS/CAP    │    │ • EMD/ProQA  │    │ • EMS/ALS     │    │   Action      │
│ • IoT/Camera │    │ • Siren      │    │ • P25 Radio  │    │ • HazMat      │    │ • NFIRS/NEMSIS│
│ • ALI/MSAG   │    │ • Reverse911 │    │ • FirstNet   │    │ • ICS/NIMS    │    │ • AAR/IP      │
└─────────────┘    └──────────────┘    └──────────────┘    └───────────────┘    └──────────────┘
       │                  │                  │                    │                    │
   [911/PSAP]          [EOC]           [911/PSAP]         [Fire Station]         [All Facilities]
                                       [EMS Base]          [EMS Base]
                                                          [HazMat Team]`
                }</Diagram>
            </Section>

            {/* ── Methodology ─────────────────────────────────────────── */}
            <Section title="Methodology & Frameworks" id="methodology">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                        {
                            title: 'TOGAF ADM',
                            desc: 'Architecture Development Method — Phases A–H with ADM iterations for each facility type.',
                            color: '#DC2626',
                        },
                        {
                            title: 'Purdue / ISA-95',
                            desc: 'Industrial control hierarchy (L0–L4 + L3.5 DMZ) adapted for emergency services OT/IT convergence.',
                            color: '#F97316',
                        },
                        {
                            title: 'NIMS / ICS',
                            desc: 'National Incident Management System and Incident Command System for scalable, interoperable response.',
                            color: '#3B82F6',
                        },
                        {
                            title: 'NIST CSF + CJIS',
                            desc: 'Cybersecurity Framework aligned with FBI CJIS Security Policy for criminal justice data protection.',
                            color: '#EAB308',
                        },
                    ].map((m) => (
                        <div
                            key={m.title}
                            className="rounded-lg border border-white/[0.06] p-4 space-y-1"
                            style={{ background: 'rgba(255,255,255,0.02)' }}
                        >
                            <h3 className="text-sm font-semibold" style={{ color: m.color }}>
                                {m.title}
                            </h3>
                            <p className="text-xs text-gray-500 leading-relaxed">{m.desc}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* ── Cross-Facility Purdue Model ─────────────────────────── */}
            <Section title="Cross-Facility Purdue Model Comparison" id="purdue">
                <p className="text-xs text-gray-500 mb-3 italic">
                    ISA-95 / Purdue hierarchy mapped across all five Emergency Services facility types.
                </p>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Level</th>
                                <th className="text-left px-3 py-2 font-medium">911/PSAP</th>
                                <th className="text-left px-3 py-2 font-medium">Fire Station</th>
                                <th className="text-left px-3 py-2 font-medium">EOC</th>
                                <th className="text-left px-3 py-2 font-medium">EMS Base</th>
                                <th className="text-left px-3 py-2 font-medium">HazMat</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-400 divide-y divide-white/[0.04]">
                            {[
                                ['L4 Enterprise', 'NENA i3, CJIS', 'NFIRS, ISO PPC', 'FEMA Grants, BI', 'NEMSIS, BI', 'EPA CERCLA'],
                                ['L3.5 DMZ', 'ESInet GW, FW', 'FirstNet GW', 'IPAWS GW, VPN', 'ePCR GW', 'CHEMTREC API'],
                                ['L3 Operations', 'CAD, GIS, RMS', 'CAD/AVL, RMS', 'WebEOC, GIS', 'CAD, SSM', 'ICS Forms, GIS'],
                                ['L2 Supervisory', 'Call routing, MCP', 'Station alerting', 'Video wall, COP', 'Dispatch, telemetry', 'CAMEO/ALOHA'],
                                ['L1 Control', 'Zetron console', 'SCBA cascade', 'Comms rack', 'MDT/MDC', 'PID/4-gas'],
                                ['L0 Process', 'Phone/radio I/O', 'Bay doors, exhaust', 'Sensors, CBRN', 'Ambulance equip', 'Decon showers'],
                            ].map((row) => (
                                <tr key={row[0]} className="hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#DC2626] font-medium whitespace-nowrap">
                                        {row[0]}
                                    </td>
                                    {row.slice(1).map((cell, i) => (
                                        <td key={i} className="px-3 py-2">{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* ── Protocol Stack ───────────────────────────────────────── */}
            <Section title="Communication Protocol Stack" id="protocols">
                <Diagram>{
                    `┌───────────────────────────────────────────────────────────────────────────┐
│  APPLICATION    CAD · WebEOC · ePCR · CAMEO · IPAWS · NFIRS · NEMSIS    │
├───────────────────────────────────────────────────────────────────────────┤
│  SESSION        SIP/SIPREC · HELD/LoST · CAP/ATOM · HL7 FHIR · NIEM   │
├───────────────────────────────────────────────────────────────────────────┤
│  TRANSPORT      TLS 1.3 · TCP/UDP · RTP/SRTP · MQTT · REST/JSON       │
├───────────────────────────────────────────────────────────────────────────┤
│  NETWORK        ESInet (IP/MPLS) · FirstNet (Band 14) · P25 ISSI       │
├───────────────────────────────────────────────────────────────────────────┤
│  DATA LINK      802.3 GbE · 802.11ax · LTE-A Pro · TDMA P25 Phase II  │
├───────────────────────────────────────────────────────────────────────────┤
│  PHYSICAL       Cat6A/Fiber · UHF/VHF · 700MHz B14 · Microwave · VSAT │
└───────────────────────────────────────────────────────────────────────────┘`
                }</Diagram>
            </Section>

            {/* ── Cybersecurity Architecture ───────────────────────────── */}
            <Section title="Cybersecurity Architecture" id="cybersecurity">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Zone</th>
                                <th className="text-left px-3 py-2 font-medium">Controls</th>
                                <th className="text-left px-3 py-2 font-medium">Standard</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-400 divide-y divide-white/[0.04]">
                            {[
                                ['External DMZ', 'ESInet border controller, WAF, DDoS mitigation', 'NENA SEC-001'],
                                ['CJIS Zone', 'FIPS 140-2 encryption, MFA, audit logging', 'FBI CJIS 5.9.1'],
                                ['OT Network', 'P25 encryption (AES-256), radio OTAR', 'P25 CAP'],
                                ['IT Network', 'NGFW, EDR, SIEM, micro-segmentation', 'NIST CSF 2.0'],
                                ['Physical', 'Access control, CCTV, man-trap, visitor mgmt', 'ASIS PSC.1'],
                                ['Backup/DR', 'Geo-diverse PSAP pairs, COOP, air-gapped backup', 'NFPA 1221'],
                            ].map((row) => (
                                <tr key={row[0]} className="hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#DC2626] font-medium whitespace-nowrap">{row[0]}</td>
                                    <td className="px-3 py-2">{row[1]}</td>
                                    <td className="px-3 py-2 text-gray-500">{row[2]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* ── Facility Articles ────────────────────────────────────── */}
            <Section title="Facility Deep Dives" id="facilities">
                <p className="text-sm text-gray-400 mb-4">
                    Detailed TOGAF reference architectures for each facility type in the
                    Emergency Services sector. Each article covers 10 standardized sections
                    from business architecture through data flow.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {FACILITY_ARTICLES.map((a) => (
                        <a
                            key={a.href}
                            href={a.href}
                            className="group rounded-xl border border-white/[0.06] p-5 space-y-3 transition-colors hover:border-white/[0.12] hover:bg-white/[0.02]"
                        >
                            <div className="flex items-start justify-between">
                                <span className="text-2xl">{a.icon}</span>
                                <span
                                    className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
                                    style={{ borderColor: `${a.color}40`, color: a.color }}
                                >
                                    {a.subtitle}
                                </span>
                            </div>
                            <h3
                                className="text-sm font-heading font-semibold"
                                style={{ color: a.color }}
                            >
                                {a.title}
                            </h3>
                            <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                                {a.description}
                            </p>
                            <div className="flex flex-wrap gap-1.5 pt-1">
                                {a.tags.map((t) => (
                                    <span
                                        key={t}
                                        className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-white/[0.08] text-gray-500"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </a>
                    ))}
                </div>
            </Section>

            {/* ── References ──────────────────────────────────────────── */}
            <Section title="References" id="references">
                <ul className="space-y-2 text-xs text-gray-500 font-mono">
                    <li>• NENA. (2021). <em>NENA i3 Standard for NG9-1-1 (NENA-STA-010.3).</em></li>
                    <li>• NFPA. (2022). <em>NFPA 1221: Emergency Services Communications Systems.</em></li>
                    <li>• NFPA. (2023). <em>NFPA 1500: Fire Department Occupational Safety.</em></li>
                    <li>• FEMA. (2021). <em>CPG 101: Developing Emergency Operations Plans.</em></li>
                    <li>• FEMA. (2015). <em>FEMA P-361: Safe Rooms for Tornadoes and Hurricanes.</em></li>
                    <li>• OSHA. (2023). <em>29 CFR 1910.120: HAZWOPER Standard.</em></li>
                    <li>• NIST. (2024). <em>Cybersecurity Framework 2.0.</em></li>
                    <li>• FBI. (2022). <em>CJIS Security Policy v5.9.1.</em></li>
                    <li>• APCO. (2023). <em>APCO P25 Compliance Assessment Program.</em></li>
                    <li>• NHTSA. (2019). <em>EMS Agenda 2050: A People-Centered Vision.</em></li>
                </ul>
            </Section>

            {/* ── See Also ────────────────────────────────────────────── */}
            <Section title="See Also" id="see-also">
                <div className="flex flex-wrap gap-3">
                    {[
                        { label: 'EMER Sector Overview', href: '/wiki/sectors/EMER', color: '#DC2626' },
                        { label: 'DEXPI Equipment Classes', href: '/wiki/dexpi', color: '#6366F1' },
                        { label: 'Healthcare Sector', href: '/wiki/healthcare', color: '#EC4899' },
                        { label: 'Government Facilities', href: '/wiki/government', color: '#64748B' },
                        { label: 'Communications Sector', href: '/wiki/sectors/COMU', color: '#3B82F6' },
                    ].map((l) => (
                        <a
                            key={l.label}
                            href={l.href}
                            className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-white/[0.04]"
                            style={{ borderColor: `${l.color}30`, color: l.color }}
                        >
                            {l.label} →
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
        <section id={id} className="space-y-4 pt-8 border-t border-white/[0.04]">
            <h2 className="text-lg font-heading font-semibold text-white/90">{title}</h2>
            {children}
        </section>
    );
}

/** ASCII diagram block. */
function Diagram({ children }: { children: string }) {
    return (
        <div
            className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
            style={{ background: 'rgba(255,255,255,0.02)' }}
        >
            <pre className="whitespace-pre leading-relaxed">{children}</pre>
        </div>
    );
}
