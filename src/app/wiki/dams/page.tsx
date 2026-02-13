import DamsStepSection from './DamsStepSection';

/**
 * Dams Sector Reference Architecture — Wiki Hub Page.
 *
 * Comprehensive overview of the Dams Sector critical infrastructure,
 * serving as the entry point to 5 detailed facility-type articles covering
 * Hydroelectric Dams, Levee Systems, Navigation Locks, Irrigation Diversion,
 * and Tailings Storage Facilities.
 *
 * Based on TOGAF Architecture Development Method (ADM) with cross-references
 * to USACE, FERC, FEMA, USBR, ICOLD, and ASCE standards.
 *
 * @module wiki/dams/page
 */

export const metadata = {
    title: 'Dams Sector Reference Architecture — Wiki',
    description:
        'TOGAF-based reference architectures for 5 dam facility types: Hydroelectric Dams, Levee Systems, ' +
        'Navigation Locks, Irrigation Diversion, and Tailings Storage Facilities.',
};

const FACILITY_ARTICLES = [
    {
        title: 'Large Hydroelectric Dam',
        subtitle: '50 – 1,000 MW',
        href: '/wiki/dams/hydroelectric-dam',
        icon: '⚡',
        color: '#0EA5E9',
        description:
            'Major hydroelectric dams with Francis or Kaplan turbines, penstocks, spillways, switchyard, ' +
            'and comprehensive dam safety instrumentation for bulk power generation.',
        tags: ['FERC Part 12', 'ASME PTC 18', 'IEEE C62', 'IEC 61850'],
    },
    {
        title: 'Levee System & Pump Station',
        subtitle: '10,000 – 100,000 cfs',
        href: '/wiki/dams/levee-system',
        icon: '🌊',
        color: '#3B82F6',
        description:
            'Engineered levee systems with interior drainage pump stations, closure structures, ' +
            'relief wells, and USACE flood fight monitoring for riverine flood protection.',
        tags: ['44 CFR', 'PL 84-99', 'NFIP', 'USACE CWMS'],
    },
    {
        title: 'Navigation Lock',
        subtitle: '600 – 1,200 ft chamber',
        href: '/wiki/dams/navigation-lock',
        icon: '🚢',
        color: '#10B981',
        description:
            'Lock chambers with miter gates, filling/emptying culverts, hydraulic power units, ' +
            'and vessel traffic control enabling commerce on inland waterways.',
        tags: ['33 CFR', 'WRDA', 'EM 1110-2-2607', 'AIS'],
    },
    {
        title: 'Irrigation Diversion Dam',
        subtitle: '10 – 50 ft head',
        href: '/wiki/dams/irrigation-diversion',
        icon: '🌾',
        color: '#84CC16',
        description:
            'Low-head run-of-river diversion structures with canal headworks, radial gates, ' +
            'fish screens and ladders, and SCADA-controlled flow measurement.',
        tags: ['USBR', 'ESA §7', 'NMFS', 'Reclamation Act'],
    },
    {
        title: 'Tailings Storage Facility',
        subtitle: '10M – 500M tonnes',
        href: '/wiki/dams/tailings-facility',
        icon: '⛏️',
        color: '#F59E0B',
        description:
            'Mine tailings dams with upstream/centerline embankment, paste thickeners, ' +
            'decant systems, InSAR monitoring, and GISTM 2020 compliance.',
        tags: ['GISTM 2020', 'MSHA', 'ICOLD', 'ANCOLD'],
    },
];

export default function DamsHubPage() {
    return (
        <div className="max-w-7xl space-y-12">
            {/* 4-Step Sector Architecture Viewer */}
            <DamsStepSection />

            {/* Separator between step viewer and TOGAF reference */}
            <div className="border-t border-white/[0.06] pt-12">
                <h2 className="text-lg font-heading font-semibold text-gray-500 mb-8">
                    📖 Full TOGAF Reference Architecture
                </h2>
            </div>

            {/* Header */}
            <header className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]" style={{ background: '#0EA5E9' }} />
                    <span className="text-xs font-mono text-gray-500">CISA SECTOR 05 · DAMS · DHS/CISA</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">Dams Sector Reference Architecture</h1>
                <p className="text-sm text-gray-400 max-w-3xl">
                    TOGAF-based reference architectures for five critical dam infrastructure facility types across the
                    U.S. National Inventory of Dams (NID) — from 300 MW hydroelectric powerhouses to 100M-tonne
                    tailings storage facilities.
                </p>
            </header>

            {/* Executive Summary */}
            <Section title="Executive Summary" id="summary">
                <p className="text-sm text-gray-300 leading-relaxed">
                    The <span className="text-[#0EA5E9] font-medium">Dams Sector</span> encompasses over 91,000 dams
                    in the National Inventory of Dams (NID), protecting downstream populations, generating 6.3%
                    of U.S. electricity (approximately 80 GW installed), enabling $1.6 trillion in annual inland
                    waterway commerce, and irrigating 10 million acres of agricultural land. The sector is regulated
                    by a complex multi-agency framework: FERC licenses non-federal hydroelectric dams, USACE
                    manages federal flood control and navigation structures, USBR oversees western irrigation
                    projects, FEMA administers the National Dam Safety Program, and MSHA regulates mine tailings
                    impoundments.
                </p>
                <p className="text-sm text-gray-300 leading-relaxed mt-3">
                    Dam infrastructure spans a unique engineering spectrum — from century-old concrete gravity
                    structures with analog controls to modern SCADA-instrumented facilities with real-time
                    InSAR deformation monitoring. This wiki section documents five canonical facility types
                    using TOGAF Architecture Development Method (ADM), mapping each to the Purdue/ISA-95
                    reference model, identifying communication protocol stacks, and establishing cybersecurity
                    zones aligned with NERC CIP and IEC 62443 frameworks.
                </p>
                <p className="text-sm text-gray-300 leading-relaxed mt-3">
                    The sector faces critical challenges: the average age of U.S. dams is 57 years, ASCE
                    rates dam infrastructure at grade D, an estimated $76 billion in rehabilitation is needed
                    by 2030, and 2,300+ dams are classified as high-hazard-potential with deficient Emergency
                    Action Plans. Modernization of control systems, instrumentation, and cybersecurity posture
                    is essential to protecting the 4.4 million people living in dam failure inundation zones.
                </p>
            </Section>

            {/* Value Chain Diagram */}
            <Section title="Dams Sector Value Chain" id="value-chain">
                <Diagram>{
                    `┌─────────────────────────────────────────────────────────────────────────────┐
│                        DAMS SECTOR VALUE CHAIN                              │
├──────────┬────────────┬────────────┬─────────────┬──────────────────────────┤
│ IMPOUND  │  REGULATE  │  CONVERT   │  PROTECT    │  MONITOR & MAINTAIN     │
│          │            │            │             │                          │
│ Reservoir│ Spillway   │ Turbine    │ Levee       │ Instrumentation          │
│ Storage  │ Operations │ Generator  │ System      │ Piezometers              │
│ Inflow   │ Gate       │ Penstock   │ Pump        │ InSAR / Geodetic         │
│ Pools    │ Discharge  │ Switchyard │ Station     │ SCADA / DNP3             │
│ Sediment │ Fish Pass  │ Grid Tie   │ Closure     │ Dam Safety Review        │
│ Capacity │ Navigation │ Revenue    │ Flood Fight │ EAP / TARP               │
│          │ Lock       │ Generation │ Protection  │ Rehabilitation           │
├──────────┴────────────┴────────────┴─────────────┴──────────────────────────┤
│ LIFECYCLE:  Planning → Design → Construction → Operation → Rehab/Removal   │
│ STANDARDS:  FERC · USACE · USBR · FEMA NDSP · ICOLD · ASCE · NERC CIP     │
└─────────────────────────────────────────────────────────────────────────────┘`
                }</Diagram>
            </Section>

            {/* Methodology & Frameworks */}
            <Section title="Methodology & Frameworks" id="methodology">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        { title: 'TOGAF ADM', desc: 'Architecture Development Method phases A–H applied to each dam facility type, from business architecture through technology architecture and governance.', color: '#0EA5E9' },
                        { title: 'Purdue / ISA-95', desc: 'Five-level reference model (L0 Process → L4 Enterprise) with L3.5 DMZ for cybersecurity segmentation of dam control systems.', color: '#3B82F6' },
                        { title: 'NERC CIP / IEC 62443', desc: 'Critical infrastructure protection standards for hydroelectric BES assets and industrial automation security for dam SCADA systems.', color: '#10B981' },
                        { title: 'FEMA Dam Safety Program', desc: 'National Dam Safety Program (NDSP) framework for hazard classification, EAP development, and periodic dam safety reviews.', color: '#F59E0B' },
                    ].map((m) => (
                        <div key={m.title} className="rounded-lg border border-white/[0.06] p-4 space-y-2" style={{ background: 'rgba(255,255,255,0.02)' }}>
                            <h3 className="text-sm font-semibold" style={{ color: m.color }}>{m.title}</h3>
                            <p className="text-xs text-gray-400 leading-relaxed">{m.desc}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Cross-Facility Purdue Model */}
            <Section title="Cross-Facility Purdue Model" id="purdue">
                <p className="text-xs text-gray-500 mb-3 italic">Purdue/ISA-95 mapping across all five dam facility types.</p>
                <Table headers={['Level', 'Hydroelectric', 'Levee/Pump Stn', 'Navigation Lock', 'Irrigation', 'Tailings']} rows={[
                    ['L4 Enterprise', 'FERC/NERC portal', 'FEMA NFIP/CWMS', 'USACE LPMS', 'USBR HydroMet', 'GISTM reporting'],
                    ['L3.5 DMZ', 'NERC CIP firewall', 'DMZ/VPN', 'DMZ/historian', 'Firewall/VPN', 'IEC 62443 DMZ'],
                    ['L3 Operations', 'EMS/SCADA', 'CWMS/SCADA', 'OMNI/lock control', 'SCADA/telemetry', 'MES/water balance'],
                    ['L2 Supervisory', 'HMI/historian', 'HMI/pump dashbd', 'HMI/traffic ctrl', 'HMI/flow ctrl', 'SCADA HMI'],
                    ['L1 Control', 'PLC/governor', 'PLC/pump VFD', 'PLC/gate HPU', 'PLC/RTU', 'PLC/DCS'],
                    ['L0 Process', 'Turbine/gen/gate', 'Pump/gate/piezo', 'Miter gate/valve', 'Gate/screen/flume', 'Pump/piezo/InSAR'],
                ]} color="#0EA5E9" />
            </Section>

            {/* Protocol Stack */}
            <Section title="Communication Protocol Stack" id="protocols">
                <Diagram>{
                    `┌─────────────────────────────────────────────────────────┐
│ APPLICATION    FERC eFile · CWMS · LPMS · HydroMet     │
│                NFIP · GISTM · OPC UA · REST APIs       │
├─────────────────────────────────────────────────────────┤
│ TRANSPORT      TCP/IP · TLS 1.3 · IPsec VPN            │
│                MQTT (IoT sensors) · HTTPS               │
├─────────────────────────────────────────────────────────┤
│ NETWORK        DNP3 (SCADA) · IEC 61850 (hydro)        │
│                Modbus TCP · BACnet · Ethernet/IP        │
├─────────────────────────────────────────────────────────┤
│ DATA LINK      Ethernet · Serial RS-485/232             │
│                Licensed radio · Cellular LTE/FirstNet   │
├─────────────────────────────────────────────────────────┤
│ PHYSICAL       Fiber optic · Copper · Microwave         │
│                VSAT satellite · 900 MHz spread-spectrum  │
└─────────────────────────────────────────────────────────┘`
                }</Diagram>
            </Section>

            {/* Cybersecurity Architecture */}
            <Section title="Cybersecurity Architecture" id="cybersecurity">
                <Table headers={['Zone', 'Description', 'Controls']} rows={[
                    ['Enterprise (L4)', 'FERC/FEMA portals, business systems', 'RBAC, MFA, TLS, SOC monitoring'],
                    ['DMZ (L3.5)', 'Data diode, historian mirror, patch mgmt', 'IEC 62443, NERC CIP-005, unidirectional gw'],
                    ['Operations (L3)', 'SCADA servers, EMS, engineering WS', 'Application whitelist, AD auth, SIEM'],
                    ['Control (L1-L2)', 'PLCs, RTUs, HMIs, governor controllers', 'Network segmentation, firmware signing'],
                    ['Process (L0)', 'Sensors, actuators, gates, turbines', 'Physical access, tamper detection'],
                    ['Physical', 'Switchyard, dam crest, powerhouse', 'PACS, CCTV, perimeter intrusion detection'],
                ]} color="#0EA5E9" />
            </Section>

            {/* Facility Article Cards */}
            <Section title="Facility Reference Architectures" id="facilities">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {FACILITY_ARTICLES.map((a) => (
                        <a key={a.href} href={a.href} className="group rounded-xl border border-white/[0.06] p-5 space-y-3 transition-colors hover:border-white/[0.12] hover:bg-white/[0.02]">
                            <div className="flex items-center gap-2">
                                <span className="text-xl">{a.icon}</span>
                                <div>
                                    <h3 className="text-sm font-semibold text-white group-hover:text-[#0EA5E9] transition-colors">{a.title}</h3>
                                    <span className="text-[10px] font-mono text-gray-500">{a.subtitle}</span>
                                </div>
                            </div>
                            <p className="text-xs text-gray-400 leading-relaxed">{a.description}</p>
                            <div className="flex flex-wrap gap-1.5">
                                {a.tags.map((t) => (
                                    <span key={t} className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-white/[0.08] text-gray-500">{t}</span>
                                ))}
                            </div>
                        </a>
                    ))}
                </div>
            </Section>

            {/* References */}
            <Section title="References" id="references">
                <ul className="space-y-2 text-xs text-gray-500 font-mono">
                    <li>• USACE. (2023). <em>National Inventory of Dams (NID).</em> U.S. Army Corps of Engineers.</li>
                    <li>• FERC. (2022). <em>Engineering Guidelines for the Evaluation of Hydropower Projects.</em></li>
                    <li>• FEMA. (2019). <em>Federal Guidelines for Dam Safety (FEMA 93).</em></li>
                    <li>• ICOLD. (2019). <em>Bulletin 175: Dam Safety Management.</em></li>
                    <li>• ASCE. (2021). <em>2021 Report Card for America&apos;s Infrastructure — Dams: Grade D.</em></li>
                    <li>• USBR. (2019). <em>Design of Small Dams (3rd edition).</em></li>
                    <li>• NERC. (2023). <em>CIP Standards (CIP-002 through CIP-014).</em></li>
                    <li>• IEC. (2018). <em>IEC 62443: Industrial Automation and Control Systems Security.</em></li>
                </ul>
            </Section>

            {/* See Also */}
            <Section title="See Also" id="see-also">
                <div className="flex flex-wrap gap-3">
                    {[
                        { label: 'DAMS Sector Overview', href: '/wiki/sectors/DAMS', color: '#0EA5E9' },
                        { label: 'Energy Sector', href: '/wiki/energy', color: '#F59E0B' },
                        { label: 'Water Sector', href: '/wiki/water', color: '#06B6D4' },
                        { label: 'DEXPI Equipment Classes', href: '/wiki/dexpi', color: '#6366F1' },
                    ].map((l) => (
                        <a key={l.label} href={l.href} className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-white/[0.04]" style={{ borderColor: `${l.color}30`, color: l.color }}>{l.label} →</a>
                    ))}
                </div>
            </Section>
        </div>
    );
}

function Section({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
    return (<section id={id} className="space-y-4 pt-8 border-t border-white/[0.04]"><h2 className="text-lg font-heading font-semibold text-white/90">{title}</h2>{children}</section>);
}
function Diagram({ children }: { children: string }) {
    return (<div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}><pre className="whitespace-pre leading-relaxed">{children}</pre></div>);
}
function Table({ headers, rows, color }: { headers: string[]; rows: string[][]; color: string }) {
    return (<div className="overflow-x-auto"><table className="w-full text-xs border-collapse"><thead><tr className="border-b border-white/[0.08] text-gray-500">{headers.map((h) => (<th key={h} className="text-left px-3 py-2 font-medium">{h}</th>))}</tr></thead><tbody className="text-gray-400 divide-y divide-white/[0.04]">{rows.map((r, ri) => (<tr key={ri} className="hover:bg-white/[0.02]"><td className="px-3 py-2 font-medium whitespace-nowrap" style={{ color }}>{r[0]}</td>{r.slice(1).map((c, i) => (<td key={i} className="px-3 py-2">{c}</td>))}</tr>))}</tbody></table></div>);
}
