import ITStepSection from './ITStepSection';

/**
 * Information Technology Sector Reference Architecture — Wiki Hub Page.
 *
 * Comprehensive overview of the CISA Information Technology Sector critical
 * infrastructure, serving as the entry point to 6 detailed facility-type
 * articles covering semiconductor fabrication plants, hyperscale data centers,
 * security operations centers, internet exchange points, colocation facilities,
 * and network operations centers.
 *
 * Based on TOGAF Architecture Development Method (ADM) with cross-references
 * to NIST CSF, ISO 27001, SEMI, Uptime Institute, and ISA-95.
 *
 * @module wiki/information-technology/page
 */

export const metadata = {
    title: 'Information Technology Sector Reference Architecture — Wiki',
    description: 'TOGAF-based reference architectures for 6 IT facility types: semiconductor fabs, hyperscale data centers, SOCs, IXPs, colocation facilities, and NOCs.',
};

/** Facility type cards with routing. */
const FACILITY_ARTICLES = [
    {
        title: 'Semiconductor Fabrication Plant',
        subtitle: 'Hardware Manufacturing',
        href: '/wiki/information-technology/semiconductor-fab',
        icon: '🔬',
        color: '#8B5CF6',
        desc: 'ISO 1–5 cleanrooms, EUV/DUV lithography, CVD/PVD/etch, UPW 18.2 MΩ·cm, SECS/GEM automation.',
        tags: ['ITEC-HW-FAB', 'Hardware'],
    },
    {
        title: 'Hyperscale Data Center',
        subtitle: 'Cloud & Data Centers',
        href: '/wiki/information-technology/hyperscale-dc',
        icon: '🏗️',
        color: '#06B6D4',
        desc: '50–200+ MW campus, 2N power, spine-leaf 400G, liquid cooling, PUE < 1.3, DCIM.',
        tags: ['ITEC-CL-HYPER', 'Cloud'],
    },
    {
        title: 'Security Operations Center',
        subtitle: 'Software & IT Services',
        href: '/wiki/information-technology/soc',
        icon: '🛡️',
        color: '#EF4444',
        desc: 'SIEM/SOAR/XDR stack, MITRE ATT&CK mapping, Tier 1-3 analysts, STIX/TAXII 2.1.',
        tags: ['ITEC-SW-SOC', 'Cybersecurity'],
    },
    {
        title: 'Internet Exchange Point',
        subtitle: 'Cloud & Data Centers',
        href: '/wiki/information-technology/ixp',
        icon: '🔀',
        color: '#10B981',
        desc: 'L2 peering fabric, route servers (BIRD/OpenBGPd), RPKI/ROV, 400G ZR+, MANRS.',
        tags: ['ITEC-CL-IXP', 'Peering'],
    },
    {
        title: 'Enterprise Colocation Facility',
        subtitle: 'Cloud & Data Centers',
        href: '/wiki/information-technology/colocation',
        icon: '🏢',
        color: '#F97316',
        desc: 'Tier III multi-tenant, carrier-neutral MMR, cross-connects, SLA 99.999%.',
        tags: ['ITEC-CL-COLO', 'Colocation'],
    },
    {
        title: 'Network Operations Center',
        subtitle: 'Software & IT Services',
        href: '/wiki/information-technology/noc',
        icon: '📡',
        color: '#3B82F6',
        desc: 'NMS (SNMP/gNMI), video wall, ITIL v4 workflows, Ansible/NetBox, OSS/BSS.',
        tags: ['ITEC-SW-NOC', 'Operations'],
    },
];

/** Accent colour for the IT sector. */
const COLOR = '#8B5CF6';

export default function InformationTechnologyHubPage() {
    return (
        <div className="max-w-7xl space-y-12">
            {/* 4-Step Sector Architecture Viewer */}
            <ITStepSection />

            {/* Separator between step viewer and TOGAF reference */}
            <div className="border-t border-white/[0.06] pt-12">
                <h2 className="text-lg font-heading font-semibold text-gray-500 mb-8">
                    📖 Full TOGAF Reference Architecture
                </h2>
            </div>

            {/* ── Header ──────────────────────────────────────────── */}
            <header className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]"
                        style={{ background: COLOR }} />
                    <span className="text-xs font-mono text-gray-500">
                        CISA Sector 13 · ITEC · DHS/CISA
                    </span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">
                    Information Technology Sector Reference Architecture
                </h1>
                <p className="text-sm text-gray-500 max-w-3xl leading-relaxed">
                    The IT Sector underpins every other critical infrastructure sector, providing the
                    hardware, software, networks, and services that enable the digital economy. From
                    semiconductor fabs producing cutting-edge chips at 3 nm and below to hyperscale
                    data centers delivering 50–200+ MW of compute capacity, this sector represents
                    the physical and logical backbone of modern civilization.
                </p>
                <p className="text-sm text-gray-500 max-w-3xl leading-relaxed">
                    Managed by DHS/CISA as the Sector-Specific Risk Management Agency, the IT Sector
                    encompasses hardware manufacturing (semiconductor foundries), cloud and data center
                    infrastructure (hyperscale, colocation, IXPs), and software/services operations
                    (SOCs, NOCs). These facilities collectively process exabytes of data daily, host
                    the global internet backbone, and provide the cybersecurity monitoring that
                    protects all 16 CISA sectors.
                </p>
                <p className="text-sm text-gray-500 max-w-3xl leading-relaxed">
                    This hub presents a cross-facility TOGAF reference architecture aligned with
                    ISA-95/Purdue, NIST CSF 2.0, SEMI standards, and Uptime Institute tiers. The six
                    deep-dive articles below provide senior-engineer-level detail on architecture,
                    equipment, control systems, and cybersecurity for each major facility type.
                </p>
            </header>

            {/* ── Value Chain ─────────────────────────────────────── */}
            <Section title="IT Sector Value Chain" id="value-chain">
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`
┌─────────────────────────────────────────────────────────────────────────────┐
│                    INFORMATION TECHNOLOGY VALUE CHAIN                        │
├────────────┬────────────┬────────────┬────────────┬────────────┬────────────┤
│  RAW       │  HARDWARE  │  INFRA-    │  NETWORK   │  SOFTWARE  │  END-USER  │
│  MATERIALS │  MFG       │  STRUCTURE │  EXCHANGE  │  & SERVICES│  DELIVERY  │
├────────────┼────────────┼────────────┼────────────┼────────────┼────────────┤
│ Silicon    │ Semicond.  │ Hyperscale │ Internet   │ Security   │ Enterprise │
│ Wafers     │ Fab        │ Data Ctr   │ Exchange   │ Ops Center │ & Consumer │
│            │            │            │ Point      │ (SOC)      │ Apps       │
│ Rare Earth │ Server/    │ Colocation │            │ Network    │            │
│ Elements   │ Network    │ Facility   │ CDN        │ Ops Center │ SaaS/PaaS/ │
│            │ Assembly   │            │ Peering    │ (NOC)      │ IaaS       │
│ Chemicals  │            │ Edge       │            │            │            │
│ (UPW/Gas)  │            │ Computing  │            │ MSP/MSSP   │            │
├────────────┼────────────┼────────────┼────────────┼────────────┼────────────┤
│ SEMI S2    │ ISO 14644  │ Uptime     │ Euro-IX    │ NIST CSF   │ SOC 2/     │
│ NFPA 318   │ SECS/GEM   │ TIA-942-B  │ MANRS      │ MITRE      │ ISO 27001  │
│ EPA RCRA   │ GEM300     │ ASHRAE 9.9 │ RFC 4271   │ ATT&CK     │ PCI DSS    │
└────────────┴────────────┴────────────┴────────────┴────────────┴────────────┘
    `}</pre>
                </div>
            </Section>

            {/* ── Methodology & Frameworks ────────────────────────── */}
            <Section title="Methodology & Frameworks" id="methodology">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                        { name: 'TOGAF ADM', desc: 'Architecture Development Method guiding all six facility reference architectures from Business → IT → Technology layers.', color: '#8B5CF6' },
                        { name: 'ISA-95 / Purdue Model', desc: 'Six-level control hierarchy mapping sensors (L0) through enterprise (L4) with DMZ (L3.5) for IT/OT segregation.', color: '#06B6D4' },
                        { name: 'NIST CSF 2.0', desc: 'Govern, Identify, Protect, Detect, Respond, Recover functions applied across all IT infrastructure facilities.', color: '#EF4444' },
                        { name: 'SEMI / Uptime Institute', desc: 'SEMI S2/E30/E164 for fab automation; Uptime Tier III/IV + TIA-942-B for data center resilience classification.', color: '#10B981' },
                    ].map((m) => (
                        <div key={m.name}
                            className="rounded-lg border border-white/[0.06] p-4"
                            style={{ background: 'rgba(255,255,255,0.02)' }}>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 rounded-full" style={{ background: m.color }} />
                                <span className="text-xs font-semibold text-white">{m.name}</span>
                            </div>
                            <p className="text-[11px] text-gray-500 leading-relaxed">{m.desc}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* ── Cross-Facility Purdue Model ─────────────────────── */}
            <Section title="Cross-Facility Purdue Model" id="purdue">
                <div className="overflow-x-auto rounded-lg border border-white/[0.06]"
                    style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Level</th>
                                <th className="text-left px-3 py-2 font-medium">Semicond. Fab</th>
                                <th className="text-left px-3 py-2 font-medium">Hyperscale DC</th>
                                <th className="text-left px-3 py-2 font-medium">SOC</th>
                                <th className="text-left px-3 py-2 font-medium">IXP</th>
                                <th className="text-left px-3 py-2 font-medium">Colocation</th>
                                <th className="text-left px-3 py-2 font-medium">NOC</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-400">
                            {[
                                ['L4 Enterprise', 'ERP / Yield Mgmt', 'Cloud Portal / Billing', 'GRC / Compliance', 'PeeringDB Portal', 'Tenant Portal / CRM', 'OSS/BSS / ServiceNow'],
                                ['L3.5 DMZ', 'OPC UA Gateway', 'API Gateway / WAF', 'STIX/TAXII Broker', 'Looking Glass / BGP', 'Cross-Connect Portal', 'gNMI Proxy / Bastion'],
                                ['L3 Operations', 'MES / FDC / APM', 'DCIM / Workload Orch', 'SIEM / SOAR / TIP', 'Route Servers BIRD', 'BMS / NOC Dashboard', 'NMS / Ticketing / ITIL'],
                                ['L2 Supervisory', 'SCADA / Tool Supv', 'BMS / EPMS', 'XDR / NDR Consoles', 'sFlow / Grafana', 'CRAH Controller', 'Grafana / Topology Map'],
                                ['L1 Control', 'PLC / Tool Ctrl', 'PDU / CRAC / ATS', 'EDR Agents / Sensors', 'Switch Fabric LACP', 'RPP / UPS / STS', 'SNMP Agents / gRPC'],
                                ['L0 Process', 'Wafer / Gas / UPW', 'Servers / Racks / Optics', 'Endpoints / Network', 'Fiber / DWDM', 'Tenant Equipment', 'Routers / Switches'],
                            ].map((row) => (
                                <tr key={row[0]} className="border-b border-white/[0.04]">
                                    <td className="px-3 py-2 text-[#8B5CF6] font-medium whitespace-nowrap">{row[0]}</td>
                                    {row.slice(1).map((cell, i) => (
                                        <td key={i} className="px-3 py-2">{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-[11px] text-gray-600 mt-2">
                    ISA-95 / IEC 62443 alignment with Level 3.5 DMZ enforcing IT/OT segregation across all facility types.
                </p>
            </Section>

            {/* ── Protocol Stack ──────────────────────────────────── */}
            <Section title="Communication Protocol Stack" id="protocols">
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`
┌──────────────────────────────────────────────────────────────────────┐
│                      APPLICATION LAYER                               │
│  SECS/GEM (E30)  │  DCIM API  │  STIX/TAXII 2.1  │  PeeringDB API │
│  EDA (E164)      │  Redfish   │  SOAR Playbooks   │  RPKI/ROV       │
│  OPC UA          │  SNMP v3   │  syslog/CEF       │  gNMI/gRPC      │
├──────────────────────────────────────────────────────────────────────┤
│                      TRANSPORT LAYER                                 │
│  HSMS (E37)      │  TLS 1.3   │  Kafka/MQTT       │  BGP-4 (TCP)   │
│  GEM300 (E40)    │  IPFIX     │  REST/OAuth2      │  BMP (RFC 7854) │
├──────────────────────────────────────────────────────────────────────┤
│                      NETWORK LAYER                                   │
│  Tool-Host LAN   │  Spine-Leaf│  VXLAN/EVPN       │  MPLS/SR       │
│  AMHS / OHT      │  400G ZR+  │  Dual ISP/BGP     │  Dark Fiber    │
├──────────────────────────────────────────────────────────────────────┤
│                      PHYSICAL LAYER                                  │
│  300mm FOUP      │  10G-400G  │  Fiber/Cat8       │  DWDM C-band   │
│  Cleanroom FFU   │  LC/MTP    │  EMI Shielding    │  MMR Panel     │
└──────────────────────────────────────────────────────────────────────┘
    `}</pre>
                </div>
            </Section>

            {/* ── Cybersecurity Architecture ──────────────────────── */}
            <Section title="Cybersecurity Architecture" id="cybersecurity">
                <div className="overflow-x-auto rounded-lg border border-white/[0.06]"
                    style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Security Zone</th>
                                <th className="text-left px-3 py-2 font-medium">Controls</th>
                                <th className="text-left px-3 py-2 font-medium">Standards</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-400">
                            {[
                                ['Fab Process Network', 'Air-gapped tool LAN, SECS/GEM firewall, AMHS isolation', 'SEMI E187, IEC 62443-3-3'],
                                ['Data Center OT Zone', 'DCIM isolated VLAN, BMS firewall, IPMI/BMC segmentation', 'NIST SP 800-82, TIA-942-B'],
                                ['SOC Enclave', 'SCIF-rated EMI shielding, data diodes, SIEM sandboxing', 'NIST CSF 2.0, CMMC L3'],
                                ['Peering Fabric', 'RPKI/ROV, IRR filtering, max-prefix limits, quarantine VLAN', 'MANRS, RFC 7999, BCP 38'],
                                ['Tenant DMZ', 'Cross-connect firewall, 5-factor auth, metered PDU isolation', 'SOC 2 Type II, PCI DSS 4.0'],
                                ['Management OOB', 'Out-of-band console, air-gapped IPAM, serial breakglass', 'ISO 27001, ITIL v4'],
                            ].map((row) => (
                                <tr key={row[0]} className="border-b border-white/[0.04]">
                                    <td className="px-3 py-2 text-[#8B5CF6] font-medium whitespace-nowrap">{row[0]}</td>
                                    <td className="px-3 py-2">{row[1]}</td>
                                    <td className="px-3 py-2 whitespace-nowrap">{row[2]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* ── Facility Article Cards ──────────────────────────── */}
            <Section title="Facility Reference Architectures" id="facilities">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {FACILITY_ARTICLES.map((f) => (
                        <a key={f.href} href={f.href}
                            className="group rounded-xl border border-white/[0.06] p-4 hover:border-white/[0.12] transition-all duration-300"
                            style={{ background: 'rgba(255,255,255,0.02)' }}>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-lg">{f.icon}</span>
                                <div className="w-2 h-2 rounded-full" style={{ background: f.color }} />
                                <span className="text-[10px] text-gray-600 font-mono">{f.tags[0]}</span>
                            </div>
                            <h3 className="text-sm font-semibold text-white group-hover:text-[#8B5CF6] transition-colors">
                                {f.title}
                            </h3>
                            <p className="text-[10px] text-gray-600 mt-0.5">{f.subtitle}</p>
                            <p className="text-[11px] text-gray-500 mt-2 line-clamp-2">{f.desc}</p>
                        </a>
                    ))}
                </div>
            </Section>

            {/* ── References ─────────────────────────────────────── */}
            <Section title="References" id="references">
                <ol className="list-decimal list-inside space-y-1 text-xs text-gray-400">
                    {[
                        'NIST. (2024). Cybersecurity Framework 2.0. NIST.',
                        'Uptime Institute. (2023). Tier Standard: Topology (4th ed.). Uptime Institute.',
                        'TIA. (2017). TIA-942-B: Telecommunications Infrastructure Standard for Data Centers. TIA.',
                        'SEMI. (2020). SEMI E30-0300: Generic Equipment Model (GEM). SEMI.',
                        'SEMI. (2018). SEMI S2-0712: Environmental, Health, and Safety Guideline for Semiconductor Mfg Equipment. SEMI.',
                        'ISO. (2015). ISO 14644-1:2015 Cleanrooms — Classification of Air Cleanliness. ISO.',
                        'ASHRAE. (2021). TC 9.9: Thermal Guidelines for Data Processing Environments (5th ed.). ASHRAE.',
                        'IETF. (2006). RFC 4271: A Border Gateway Protocol 4 (BGP-4). IETF.',
                        'AXELOS. (2019). ITIL Foundation: ITIL 4 Edition. TSO.',
                        'IEC. (2018). IEC 62443-3-3: System Security Requirements and Security Levels. IEC.',
                    ].map((ref) => (
                        <li key={ref}>{ref}</li>
                    ))}
                </ol>
            </Section>

            {/* ── See Also ───────────────────────────────────────── */}
            <section className="space-y-3">
                <h2 className="text-sm font-semibold text-gray-400">See Also</h2>
                <div className="flex flex-wrap gap-2">
                    {[
                        { label: 'CISA Sector ITEC', href: '/wiki/sectors/ITEC', color: COLOR },
                        { label: 'DEXPI Equipment Classes', href: '/wiki/equipment', color: '#F97316' },
                        { label: 'Communications Sector', href: '/wiki/communications', color: '#3B82F6' },
                        { label: 'Critical Manufacturing', href: '/wiki/critical-manufacturing', color: '#F97316' },
                        { label: 'Energy Sector', href: '/wiki/energy', color: '#F59E0B' },
                    ].map((l) => (
                        <a key={l.href} href={l.href}
                            className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-white/[0.04]"
                            style={{ borderColor: `${l.color}30`, color: l.color }}>
                            {l.label}
                        </a>
                    ))}
                </div>
            </section>
        </div>
    );
}

/** Reusable section wrapper. */
function Section({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
    return (
        <section id={id} className="space-y-4 scroll-mt-24">
            <h2 className="text-xl font-heading font-semibold text-white">{title}</h2>
            {children}
        </section>
    );
}
