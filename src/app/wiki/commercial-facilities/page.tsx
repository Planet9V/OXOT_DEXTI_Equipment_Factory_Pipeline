/**
 * Commercial Facilities Sector Reference Architecture — Wiki Hub Page.
 *
 * Comprehensive overview of the CISA Commercial Facilities Sector critical
 * infrastructure, serving as the entry point to 6 detailed facility-type
 * articles covering Convention Centers, Casino Resorts, High-Rise Hotels,
 * Sports Stadiums, Class A Office Towers, and Regional Shopping Centers.
 *
 * Based on TOGAF Architecture Development Method (ADM) with cross-references
 * to NFPA, ASHRAE, IBC, ADA, and sector-specific gaming/hospitality standards.
 *
 * @module wiki/commercial-facilities/page
 */

export const metadata = {
    title: 'Commercial Facilities Sector Reference Architecture — Wiki',
    description:
        'TOGAF-based reference architectures for 6 commercial facility types: ' +
        'Convention Centers, Casino Resorts, High-Rise Hotels, Sports Stadiums, ' +
        'Class A Office Towers, and Regional Shopping Centers.',
};

/** Accent color — DHS Orange. */
const C = '#F97316';

/** Facility type cards with routing. */
const FACILITY_ARTICLES = [
    {
        title: 'Convention Center',
        subtitle: '500,000+ sq ft',
        href: '/wiki/commercial-facilities/convention-center',
        icon: '🏛️',
        color: '#F97316',
        description:
            'Large exhibition halls with central HVAC plant, 4160 V/480 V electrical distribution, addressable fire alarm, BACnet BMS, AV infrastructure, and modular exhibition utility services.',
        tags: ['IBC', 'NFPA 13', 'ASHRAE 90.1', 'BACnet'],
    },
    {
        title: 'Casino Resort',
        subtitle: '500K–2M sq ft',
        href: '/wiki/commercial-facilities/casino-resort',
        icon: '🎰',
        color: '#EF4444',
        description:
            'Integrated gaming complex with 5,000–15,000 ton central plant, 24/7 uninterruptible power for gaming machines, eye-in-the-sky surveillance, SAS/G2S slot accounting, and cage/count room security.',
        tags: ['NGCB', 'SAS 6.03', 'Title 31', 'NFPA 101'],
    },
    {
        title: 'High-Rise Hotel',
        subtitle: '20–60+ stories',
        href: '/wiki/commercial-facilities/high-rise-hotel',
        icon: '🏨',
        color: '#3B82F6',
        description:
            'Multi-story hospitality tower with 4-pipe fan coil units, standpipe/sprinkler risers, elevator groups, guest-room controllers, keycard/RFID access, IPTV, and property management system integration.',
        tags: ['NFPA 14', 'ASHRAE 62.1', 'ASME A17.1', 'BACnet'],
    },
    {
        title: 'Sports Stadium',
        subtitle: '30,000–80,000+ seats',
        href: '/wiki/commercial-facilities/sports-stadium',
        icon: '🏟️',
        color: '#10B981',
        description:
            'Major sports venue with 15–30 MW electrical distribution, 2,500+ lux LED field lighting, DAS/Wi-Fi 6E for 80,000+ devices, 4K/8K video boards, crowd management analytics, and mass notification.',
        tags: ['NFPA 102', 'SMPTE 2110', 'FIFA', 'AES67'],
    },
    {
        title: 'Class A Office Tower',
        subtitle: '30–60+ stories',
        href: '/wiki/commercial-facilities/office-tower',
        icon: '🏢',
        color: '#8B5CF6',
        description:
            'LEED-certified commercial high-rise with variable-speed chiller plant, VAV AHUs, demand-controlled ventilation, DALI lighting, tenant sub-metering, fault detection, and smart-building analytics.',
        tags: ['LEED v4.1', 'ASHRAE G36', 'DALI-2', 'Haystack'],
    },
    {
        title: 'Regional Shopping Center',
        subtitle: '500K–1.5M sq ft',
        href: '/wiki/commercial-facilities/shopping-center',
        icon: '🛍️',
        color: '#EC4899',
        description:
            'Enclosed mall with 4–5 anchor stores, 100–200 inline tenants, central/distributed HVAC, atrium smoke control, parking garage CO/NO₂ ventilation, CCTV/LPR, and digital signage.',
        tags: ['NFPA 92', 'NFPA 96', 'ONVIF', 'OSDP'],
    },
];

export default function CommercialFacilitiesHubPage() {
    return (
        <div className="max-w-5xl space-y-12">
            {/* ── Header ── */}
            <header className="space-y-4">
                <div className="flex items-center gap-3">
                    <div
                        className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]"
                        style={{ background: C }}
                    />
                    <span className="text-xs font-mono text-gray-500">
                        CISA 02 · COMM · Commercial Facilities
                    </span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">
                    Commercial Facilities Sector Reference Architecture
                </h1>
                <p className="text-sm text-gray-400 max-w-3xl leading-relaxed">
                    The Commercial Facilities Sector encompasses entertainment, gaming, lodging,
                    public assembly, real estate, and retail venues — sites that draw large crowds
                    and are generally open to the public. These privately-owned facilities face
                    unique converged IT/OT cybersecurity challenges spanning building management,
                    life-safety, physical security, and specialised vertical systems like gaming
                    networks and broadcast infrastructure.
                </p>
                <p className="text-sm text-gray-400 max-w-3xl leading-relaxed">
                    Under DHS/CISA guidance, the sector&apos;s risk profile is shaped by high
                    occupancy loads (10,000–80,000+ persons), 24/7 operations in gaming and
                    hospitality, complex HVAC systems handling variable thermal loads and smoke
                    control, and interconnected building automation systems that must integrate
                    with corporate enterprise networks while maintaining air-gapped segmentation
                    for safety-critical and regulatory systems.
                </p>
                <p className="text-sm text-gray-400 max-w-3xl leading-relaxed">
                    This wiki provides TOGAF-based reference architectures for six canonical
                    facility types. Each deep-dive article follows a 10-section format covering
                    stakeholder analysis, system design, process diagrams, bill of materials,
                    Purdue Model mapping, communication protocols, and safety systems — providing
                    the engineering detail required for OT cybersecurity assessments, digital twin
                    modelling, and regulatory compliance audits.
                </p>
            </header>

            {/* ── Value Chain ── */}
            <Section title="Sector Value Chain" id="value-chain">
                <p className="text-sm text-gray-400 mb-4">
                    End-to-end value chain across the six Commercial Facilities sub-sectors,
                    showing how energy, data, people-flow, and safety services interconnect
                    from utility intake through guest/occupant experience to enterprise reporting.
                </p>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                    COMMERCIAL FACILITIES — SECTOR VALUE CHAIN                       │
├──────────┬──────────┬───────────┬──────────┬───────────┬──────────┬─────────────────┤
│  Utility │ Central  │ Building  │ Vertical │ Occupant  │ Safety & │   Enterprise    │
│  Intake  │  Plant   │ Distrib.  │ Systems  │ Services  │ Security │   Analytics     │
├──────────┼──────────┼───────────┼──────────┼───────────┼──────────┼─────────────────┤
│ HV/MV    │ Chillers │ AHU/VAV   │ Gaming   │ POS/PMS   │ Fire     │ CMMS / EMS      │
│ Utility  │ Cooling  │ Elec.     │ Elevator │ AV/IT     │ CCTV     │ LEED / ESG      │
│ Feed     │ Towers   │ Risers    │ Escal.   │ Wi-Fi/DAS │ Access   │ Tenant Billing  │
│          │ Boilers  │ Plumbing  │ BMS/DDC  │ Signage   │ Mass     │ Reg. Reporting  │
│ Water    │ Gensets  │ Fire Pump │ Lighting │ Keycard   │ Notif.   │ Portfolio KPIs  │
│ Gas      │ UPS      │ Risers    │ DALI     │ IPTV      │ Smoke    │ Cloud / AI      │
│ Telecom  │ ATS      │ Metering  │ Shading  │ Concierge │ Control  │ Cyber SOC       │
└──────────┴──────────┴───────────┴──────────┴───────────┴──────────┴─────────────────┘

  ENERGY ────►  CHILLED/HOT WATER ────►  CONDITIONED AIR  ────►  OCCUPANT COMFORT
  POWER  ────►  SWITCHGEAR/PDU    ────►  FLOOR PANELS     ────►  EQUIPMENT LOADS
  DATA   ────►  BACKBONE FIBER    ────►  FLOOR SWITCHES   ────►  IoT / BMS POINTS
  SAFETY ────►  FACP / VESDA      ────►  ZONE DEVICES     ────►  MASS NOTIFICATION
`}</pre>
                </div>
            </Section>

            {/* ── Methodology & Frameworks ── */}
            <Section title="Methodology &amp; Frameworks" id="methodology">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                        {
                            t: 'TOGAF ADM',
                            d: 'Architecture Development Method phases A–H for structured enterprise architecture across facility types.',
                            c: '#F97316',
                        },
                        {
                            t: 'Purdue / ISA-95',
                            d: 'Hierarchical control model (L0–L4) mapping BMS, SCADA, and enterprise systems with L3.5 DMZ segmentation.',
                            c: '#3B82F6',
                        },
                        {
                            t: 'NIST CSF / CISA',
                            d: 'Cybersecurity framework for commercial facilities: Identify, Protect, Detect, Respond, Recover with sector-specific guidance.',
                            c: '#10B981',
                        },
                        {
                            t: 'NFPA / IBC / ASHRAE',
                            d: 'Life safety (NFPA 13/72/101/102), building codes (IBC), and energy efficiency (ASHRAE 90.1/62.1) standards.',
                            c: '#8B5CF6',
                        },
                    ].map((m) => (
                        <div
                            key={m.t}
                            className="rounded-lg border border-white/[0.06] p-4"
                            style={{ background: 'rgba(255,255,255,0.02)' }}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 rounded-full" style={{ background: m.c }} />
                                <h3 className="text-sm font-semibold text-white">{m.t}</h3>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed">{m.d}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* ── Cross-Facility Purdue Model ── */}
            <Section title="Cross-Facility Purdue Model" id="purdue">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Level</th>
                                <th className="text-left px-3 py-2 font-medium">Convention Ctr</th>
                                <th className="text-left px-3 py-2 font-medium">Casino</th>
                                <th className="text-left px-3 py-2 font-medium">Hotel</th>
                                <th className="text-left px-3 py-2 font-medium">Stadium</th>
                                <th className="text-left px-3 py-2 font-medium">Office Tower</th>
                                <th className="text-left px-3 py-2 font-medium">Mall</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-400">
                            <tr className="border-b border-white/[0.04]">
                                <td className="px-3 py-2 text-[#F97316] font-medium whitespace-nowrap">L4 Enterprise</td>
                                <td className="px-3 py-2">ERP / CMMS</td>
                                <td className="px-3 py-2">Corp / NGCB</td>
                                <td className="px-3 py-2">Brand Cloud</td>
                                <td className="px-3 py-2">League Cloud</td>
                                <td className="px-3 py-2">REIT / LEED</td>
                                <td className="px-3 py-2">REIT Analytics</td>
                            </tr>
                            <tr className="border-b border-white/[0.04]">
                                <td className="px-3 py-2 text-yellow-500 font-medium whitespace-nowrap">L3.5 DMZ</td>
                                <td className="px-3 py-2">OPC UA GW</td>
                                <td className="px-3 py-2">AML / MQTT</td>
                                <td className="px-3 py-2">OPC UA / MQTT</td>
                                <td className="px-3 py-2">MQTT / API</td>
                                <td className="px-3 py-2">Haystack / MQTT</td>
                                <td className="px-3 py-2">OPC UA / MQTT</td>
                            </tr>
                            <tr className="border-b border-white/[0.04]">
                                <td className="px-3 py-2 text-[#F97316] font-medium whitespace-nowrap">L3 Operations</td>
                                <td className="px-3 py-2">SCADA / Historian</td>
                                <td className="px-3 py-2">CMS / SCADA</td>
                                <td className="px-3 py-2">PMS / BMS</td>
                                <td className="px-3 py-2">Venue Ops Ctr</td>
                                <td className="px-3 py-2">EMS / FDD</td>
                                <td className="px-3 py-2">Energy Mgmt</td>
                            </tr>
                            <tr className="border-b border-white/[0.04]">
                                <td className="px-3 py-2 text-[#F97316] font-medium whitespace-nowrap">L2 Supervisory</td>
                                <td className="px-3 py-2">DDC / FACP</td>
                                <td className="px-3 py-2">Surv / BMS</td>
                                <td className="px-3 py-2">Central BMS</td>
                                <td className="px-3 py-2">Stadium BMS</td>
                                <td className="px-3 py-2">BMS OWS</td>
                                <td className="px-3 py-2">BMS / Security</td>
                            </tr>
                            <tr className="border-b border-white/[0.04]">
                                <td className="px-3 py-2 text-[#F97316] font-medium whitespace-nowrap">L1 Control</td>
                                <td className="px-3 py-2">PLC / RTU</td>
                                <td className="px-3 py-2">SAS / VFD</td>
                                <td className="px-3 py-2">Floor DDC</td>
                                <td className="px-3 py-2">DMX / sACN</td>
                                <td className="px-3 py-2">DDC / PLC</td>
                                <td className="px-3 py-2">RTU / AHU DDC</td>
                            </tr>
                            <tr>
                                <td className="px-3 py-2 text-[#F97316] font-medium whitespace-nowrap">L0 Process</td>
                                <td className="px-3 py-2">Sensors / VFD</td>
                                <td className="px-3 py-2">Slots / RFID</td>
                                <td className="px-3 py-2">FCU / Lock</td>
                                <td className="px-3 py-2">Lux / Temp</td>
                                <td className="px-3 py-2">VAV / CO₂</td>
                                <td className="px-3 py-2">HVAC / CO</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-[11px] text-gray-600 mt-2">
                    Aligned to ISA-95 / IEC 62443 zone-conduit model. All facilities include L3.5 DMZ for IT/OT segmentation.
                </p>
            </Section>

            {/* ── Communication Protocol Stack ── */}
            <Section title="Communication Protocol Stack" id="protocols">
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`
┌────────────────────────────────────────────────────────────────────────┐
│                     APPLICATION / ENTERPRISE                          │
│  OPC UA · REST API · MQTT · Haystack · Brick · G2S · SAS 6.03       │
├────────────────────────────────────────────────────────────────────────┤
│                     SUPERVISORY / NETWORK                             │
│  BACnet/IP · Modbus TCP · ONVIF · SMPTE ST 2110 · Dante/AES67       │
├────────────────────────────────────────────────────────────────────────┤
│                     FIELD / CONTROL                                   │
│  BACnet MS/TP · Modbus RTU · DALI-2 · DMX512 · sACN · LON · KNX     │
├────────────────────────────────────────────────────────────────────────┤
│                     PHYSICAL / TRANSPORT                              │
│  Ethernet/IP · RS-485 · Wi-Fi 6E · LTE/5G DAS · CBRS · Fiber OM4    │
└────────────────────────────────────────────────────────────────────────┘
`}</pre>
                </div>
            </Section>

            {/* ── Cybersecurity Architecture ── */}
            <Section title="Cybersecurity Architecture" id="cyber">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Zone</th>
                                <th className="text-left px-3 py-2 font-medium">Description</th>
                                <th className="text-left px-3 py-2 font-medium">Key Controls</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-400">
                            {[
                                ['BMS / OT', 'Building automation, HVAC, lighting, elevator control', 'IEC 62443, BACnet/SC, network segmentation, MFA'],
                                ['Life Safety', 'Fire alarm, sprinkler, smoke control, mass notification', 'Air-gapped, UL 864 listed, dedicated FACP network'],
                                ['Physical Security', 'CCTV, access control, intrusion detection', 'ONVIF TLS, OSDP v2 encrypted, NVR segmentation'],
                                ['Gaming (Casino)', 'Slot machines, table monitoring, cage/count room', 'SAS/G2S encrypted, NGCB air-gap, Title 31 AML'],
                                ['Guest / Tenant IT', 'Wi-Fi, IPTV, POS, digital signage, PMS', 'PCI DSS, 802.1X, VLAN isolation, WAF'],
                                ['Enterprise', 'ERP, CMMS, energy reporting, cloud analytics', 'Zero-trust, SSO/MFA, API gateway, SOC monitoring'],
                            ].map(([zone, desc, controls]) => (
                                <tr key={zone} className="border-b border-white/[0.04]">
                                    <td className="px-3 py-2 font-medium whitespace-nowrap" style={{ color: C }}>{zone}</td>
                                    <td className="px-3 py-2">{desc}</td>
                                    <td className="px-3 py-2">{controls}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* ── Facility Article Cards ── */}
            <Section title="Facility Reference Architectures" id="facilities">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {FACILITY_ARTICLES.map((f) => (
                        <a
                            key={f.href}
                            href={f.href}
                            className="group rounded-xl border border-white/[0.06] p-4 hover:border-white/[0.15] transition-all duration-300"
                            style={{ background: 'rgba(255,255,255,0.02)' }}
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-lg">{f.icon}</span>
                                <div className="w-2 h-2 rounded-full" style={{ background: f.color }} />
                            </div>
                            <h3 className="text-sm font-semibold text-white group-hover:text-[#FF6B00] transition-colors">
                                {f.title}
                            </h3>
                            <p className="text-[10px] text-gray-600 font-mono">{f.subtitle}</p>
                            <p className="text-[11px] text-gray-500 mt-2 line-clamp-3">{f.description}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                                {f.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-[10px] px-1.5 py-0.5 rounded border border-white/[0.06] text-gray-500"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </a>
                    ))}
                </div>
            </Section>

            {/* ── References ── */}
            <Section title="References" id="references">
                <ol className="list-decimal list-inside space-y-1 text-xs text-gray-400">
                    <li>International Code Council. (2021). <em>International Building Code</em>. ICC.</li>
                    <li>National Fire Protection Association. (2022). <em>NFPA 101: Life Safety Code</em>. NFPA.</li>
                    <li>National Fire Protection Association. (2022). <em>NFPA 13: Standard for the Installation of Sprinkler Systems</em>. NFPA.</li>
                    <li>National Fire Protection Association. (2022). <em>NFPA 72: National Fire Alarm and Signaling Code</em>. NFPA.</li>
                    <li>ASHRAE. (2022). <em>ASHRAE Standard 90.1: Energy Standard for Buildings Except Low-Rise Residential</em>. ASHRAE.</li>
                    <li>ASHRAE. (2022). <em>ASHRAE Standard 62.1: Ventilation for Acceptable Indoor Air Quality</em>. ASHRAE.</li>
                    <li>The Open Group. (2022). <em>TOGAF Standard, Version 9.2</em>. The Open Group.</li>
                    <li>International Society of Automation. (2019). <em>ISA-95: Enterprise-Control System Integration</em>. ISA.</li>
                    <li>U.S. Department of Homeland Security. (2024). <em>CISA Commercial Facilities Sector-Specific Plan</em>. DHS.</li>
                    <li>NIST. (2024). <em>Cybersecurity Framework 2.0</em>. National Institute of Standards and Technology.</li>
                </ol>
            </Section>

            {/* ── See Also ── */}
            <section className="space-y-3">
                <h2 className="text-lg font-heading font-semibold text-white">See Also</h2>
                <div className="flex flex-wrap gap-2">
                    {[
                        { label: 'CISA Sector Overview', href: '/wiki/sectors/COMM' },
                        { label: 'DEXPI Equipment Classes', href: '/wiki/equipment' },
                        { label: 'Energy Sector Wiki', href: '/wiki/energy' },
                        { label: 'Chemical Sector Wiki', href: '/wiki/chemical' },
                    ].map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-white/[0.04]"
                            style={{ borderColor: `${C}30`, color: C }}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </section>
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
        <section id={id} className="space-y-4 scroll-mt-24">
            <h2 className="text-xl font-heading font-semibold text-white">{title}</h2>
            {children}
        </section>
    );
}
