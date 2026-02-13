/**
 * Communications Sector Reference Architecture — Wiki Hub Page.
 *
 * Comprehensive overview of the CISA Communications Sector,
 * serving as the entry point to 7 detailed facility-type articles covering
 * Central Office/IXP, Cell Tower/5G, Satellite Ground Station,
 * Cable TV Headend, Broadcast Transmitter, Telecom Data Center,
 * and Microwave Backhaul Site.
 *
 * Based on TOGAF Architecture Development Method (ADM) with cross-references
 * to TIA, 3GPP, ITU-R, ATIS, SCTE, and NIST frameworks.
 *
 * @module wiki/communications/page
 */

export const metadata = {
    title: 'Communications Sector Reference Architecture — Wiki',
    description: 'TOGAF-based reference architectures for 7 communications facility types: central offices, cell towers, satellite ground stations, cable headends, broadcast transmitters, data centers, and microwave backhaul.',
};

const FACILITY_ARTICLES = [
    { title: 'Central Office / IXP', subtitle: 'Wireline', href: '/wiki/communications/central-office', icon: '🏢', color: '#3B82F6', desc: 'DWDM/ROADM optical transport, OLT for FTTx, -48 VDC power plant, BGP peering fabric.', tags: ['COMU-WR-CO', 'Wireline'] },
    { title: 'Cell Tower / 5G Site', subtitle: 'Wireless', href: '/wiki/communications/cell-tower', icon: '📡', color: '#06B6D4', desc: 'Massive MIMO 64T64R, RRU/BBU, O-RAN, eCPRI fronthaul, 4G/5G co-site.', tags: ['COMU-WL-CELL', 'Wireless'] },
    { title: 'Satellite Ground Station', subtitle: 'Satellite', href: '/wiki/communications/satellite-ground', icon: '🛰️', color: '#8B5CF6', desc: 'Parabolic antennas 3-15 m, LNA/HPA, DVB-S2X modems, LEO/MEO/GEO tracking.', tags: ['COMU-ST-GND', 'Satellite'] },
    { title: 'Cable TV Headend', subtitle: 'Cable', href: '/wiki/communications/cable-headend', icon: '📺', color: '#EF4444', desc: 'CCAP/CMTS (DOCSIS 3.1/4.0), HFC plant, fiber nodes, MPEG encoding, VOD.', tags: ['COMU-CB-HEAD', 'Cable'] },
    { title: 'Broadcast Transmitter', subtitle: 'Broadcasting', href: '/wiki/communications/broadcast-transmitter', icon: '📻', color: '#F59E0B', desc: 'ATSC 3.0, solid-state 10-100 kW, broadband panel antennas, STL links.', tags: ['COMU-CB-HEAD', 'Broadcasting'] },
    { title: 'Telecom Data Center', subtitle: 'Infrastructure', href: '/wiki/communications/data-center', icon: '🖥️', color: '#10B981', desc: 'TIA-942-B, Uptime Tier III/IV, 2N power, spine-leaf, DCIM, PUE <1.3.', tags: ['COMU-WR-CO', 'Colocation'] },
    { title: 'Microwave Backhaul', subtitle: 'Transport', href: '/wiki/communications/microwave-backhaul', icon: '🔗', color: '#EC4899', desc: 'Licensed 6-42 GHz, E-band 70-80 GHz, IP/MPLS, adaptive modulation.', tags: ['COMU-WL-CELL', 'Transport'] },
];

export default function CommunicationsHubPage() {
    return (
        <div className="max-w-5xl space-y-12">
            {/* Header */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)' }}>📡</div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-mono text-gray-500">CISA SECTOR 03</span>
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#3B82F6]/10 text-[#3B82F6]">COMU</span>
                        </div>
                        <h1 className="text-3xl font-heading font-bold text-white">Communications Sector Reference Architecture</h1>
                    </div>
                </div>
            </div>

            {/* Executive Summary */}
            <Section title="Executive Summary" id="summary">
                <div className="space-y-3 text-sm text-gray-400 leading-relaxed">
                    <p>The <span className="text-[#3B82F6] font-medium">Communications Sector</span> provides the physical and logical infrastructure for voice, data, and video services that underpin every other critical infrastructure sector. Designated as a lifeline sector by CISA, it encompasses wireline (PSTN, fiber backbone, internet exchange), wireless (4G LTE / 5G NR cellular), satellite (GEO/MEO/LEO), cable television (HFC / DOCSIS), broadcasting (ATSC 3.0), and the data centers and transport links that interconnect them.</p>
                    <p>The sector is undergoing a generational transformation: legacy TDM/SONET networks are being decommissioned in favor of all-IP architectures; 5G NR and O-RAN disaggregation are reshaping the radio access network; LEO constellations (Starlink, OneWeb, Kuiper) are disrupting traditional GEO satellite services; DOCSIS 4.0 is pushing cable networks toward 10 Gbps symmetrical capacity; and ATSC 3.0 is enabling IP-based broadcast with datacasting capabilities.</p>
                    <p>This hub provides a unified TOGAF-based reference architecture spanning 7 facility types, with consistent Purdue model mappings, protocol stacks, and cybersecurity zone definitions. The sector is governed by the FCC (47 CFR), NTIA, ITU Radio Regulations, 3GPP specifications, and NIST SP 800-82/800-53 for cybersecurity.</p>
                </div>
            </Section>

            {/* Value Chain */}
            <Section title="Communications Value Chain" id="value-chain">
                <Ascii>{`┌─────────────────────────────────────────────────────────────┐
│                  CONTENT / APPLICATION LAYER                 │
│   Voice │ Video │ Data │ IoT │ Public Safety │ Broadcast    │
├─────────────────────────────────────────────────────────────┤
│                     CORE NETWORK LAYER                       │
│  Data Center ←→ Central Office/IXP ←→ Core Routers          │
│  (5GC: AMF/SMF/UPF) │ (MPLS/SR backbone) │ (CDN/Cloud)     │
├─────────────────────────────────────────────────────────────┤
│                    TRANSPORT LAYER                            │
│  DWDM/ROADM │ Microwave Backhaul │ Submarine Cable          │
│  (100G-800G λ) │ (6-80 GHz) │ (trans-oceanic fiber)        │
├─────────────────────────────────────────────────────────────┤
│                   ACCESS NETWORK LAYER                        │
│  Cell Tower    Cable Headend  Satellite   Broadcast TX       │
│  (5G NR/LTE)  (DOCSIS 4.0)  (Ka/Ku/C)   (ATSC 3.0)        │
│  ──RRU/BBU──  ──CCAP/Node── ──HPA/LNA── ──Exciter/PA──     │
├─────────────────────────────────────────────────────────────┤
│                    END USER / CPE LAYER                       │
│  Handset │ Cable Modem │ VSAT │ TV Receiver │ IoT Device    │
└─────────────────────────────────────────────────────────────┘`}</Ascii>
            </Section>

            {/* Methodology */}
            <Section title="Methodology &amp; Frameworks" id="methodology">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                        { name: 'TOGAF ADM', desc: 'Architecture Development Method — iterative phases from vision through governance.', color: '#3B82F6' },
                        { name: 'Purdue / ISA-95', desc: 'Levels 0-4 infrastructure model adapted for telecom: field → NMS → OSS/BSS → enterprise.', color: '#06B6D4' },
                        { name: 'NIST CSF / 800-82', desc: 'Cybersecurity Framework + ICS security guide for communications infrastructure.', color: '#8B5CF6' },
                        { name: 'TM Forum eTOM', desc: 'Enhanced Telecom Operations Map — business process framework for service providers.', color: '#EC4899' },
                    ].map(m => (
                        <div key={m.name} className="rounded-lg border border-white/[0.06] p-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
                            <h4 className="text-sm font-semibold mb-1" style={{ color: m.color }}>{m.name}</h4>
                            <p className="text-[11px] text-gray-500">{m.desc}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Cross-Facility Purdue Model */}
            <Section title="Cross-Facility Purdue Model Comparison" id="purdue">
                <Tbl heads={['Level', 'Central Office', 'Cell Tower', 'Satellite', 'Cable Headend', 'Data Center']} rows={[
                    ['L0 Sensing', 'Fiber power, BER, temp', 'RF power, VSWR, GPS', 'C/N₀, pointing error', 'RF levels, laser power', 'Temp, humidity, PDU'],
                    ['L1 Control', 'DWDM/ROADM ctrl, OLT', 'BBU/DU, RRU ctrl', 'ACU, M&C, HPA ctrl', 'CCAP, QAM modulator', 'UPS/PDU/CRAC PLC'],
                    ['L2 Supervisory', 'NMS (Ciena MCP)', 'RAN NMS (OSS)', 'Hub controller', 'CMTS manager', 'DCIM, BMS'],
                    ['L3 Operations', 'OSS/BSS, provisioning', 'SON, O-RAN RIC/SMO', 'Sat ops center', 'CableLabs DOCSIS mgr', 'ITSM, orchestrator'],
                    ['L3.5 DMZ', 'Firewall, jump host', 'IPsec VPN, firewall', 'Encrypted uplink', 'CMTS-ERP gateway', 'NGFW, WAF'],
                    ['L4 Enterprise', 'ERP, CRM, billing', 'Billing, planning', 'Capacity mgmt', 'Subscriber mgmt', 'Customer portal'],
                ]} />
            </Section>

            {/* Protocol Stack */}
            <Section title="Communication Protocol Stack" id="protocols">
                <Ascii>{`Enterprise:  OSS/BSS │ CRM/Billing │ TM Forum APIs │ REST/GraphQL
Application: NETCONF/YANG │ gRPC │ SNMP v3 │ MQTT │ syslog │ Redfish
Transport:   MPLS/SR │ IPsec │ GTP-U/C │ HTTPS │ SSH
Network:     BGP │ OSPF/IS-IS │ EVPN │ VxLAN │ Segment Routing
Data Link:   Ethernet 100G/400G │ DWDM/OTN │ DOCSIS 3.1 │ eCPRI
Physical:    SMF-28e+ │ MMF OM4 │ RF (600 MHz–80 GHz) │ Coax (RG-11/RG-6)`}</Ascii>
            </Section>

            {/* Cybersecurity */}
            <Section title="Cybersecurity Architecture" id="cybersecurity">
                <Tbl heads={['Zone', 'Controls', 'Standards']} rows={[
                    ['Edge / RAN', 'SIM-based auth, IPsec tunnels, O-RAN security (WG11)', '3GPP TS 33.501, O-RAN NIST'],
                    ['Transport', 'MACsec (802.1AE), DWDM encryption (L1), IPsec (L3)', 'IEEE 802.1AE, NIST 800-53'],
                    ['Core Network', 'Network slicing isolation, CUPS, micro-segmentation', '3GPP TS 23.501, NIST CSF'],
                    ['DMZ / NOC', 'Jump hosts, MFA, SIEM, SOC 2 Type II', 'NIST 800-82, SOC 2'],
                    ['Management', 'RBAC, NETCONF over TLS, secure boot, SBOM', 'CISA BOD 22-01, NIST 800-171'],
                    ['Physical', 'Biometric access, CCTV, VESDA, tamper detection', 'TIA-942, NFPA 76'],
                ]} />
            </Section>

            {/* Facility Cards */}
            <Section title="Facility Deep-Dive Articles" id="facilities">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {FACILITY_ARTICLES.map(f => (
                        <a key={f.href} href={f.href} className="group rounded-xl border border-white/[0.06] p-4 hover:border-white/[0.12] transition-all duration-300" style={{ background: 'rgba(255,255,255,0.02)' }}>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-lg">{f.icon}</span>
                                <div className="w-2 h-2 rounded-full" style={{ background: f.color }} />
                            </div>
                            <h3 className="text-sm font-semibold text-white group-hover:text-[#3B82F6] transition-colors">{f.title}</h3>
                            <p className="text-[10px] text-gray-600 mt-0.5">{f.subtitle}</p>
                            <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">{f.desc}</p>
                            <div className="flex flex-wrap gap-1 mt-2">{f.tags.map(t => <span key={t} className="text-[9px] px-1.5 py-0.5 rounded bg-white/[0.04] text-gray-600">{t}</span>)}</div>
                        </a>
                    ))}
                </div>
            </Section>

            {/* References */}
            <Section title="References" id="references">
                <Refs items={[
                    'CISA. (2024). Communications Sector-Specific Plan. DHS/CISA.',
                    'TIA. (2017). TIA-942-B: Telecommunications Infrastructure Standard for Data Centers. TIA.',
                    '3GPP. (2023). TS 38.401: NG-RAN Architecture Description. 3GPP.',
                    'O-RAN Alliance. (2023). O-RAN Architecture Description, v8.0. O-RAN.',
                    'CableLabs. (2020). DOCSIS 4.0 Specification (CM-SP-MULPIv4.0). CableLabs.',
                    'ATSC. (2023). A/300: ATSC 3.0 System Discovery and Signaling. ATSC.',
                    'ITU-R. (2020). Radio Regulations, Vol. 1-4. ITU.',
                    'NIST. (2023). SP 800-82r3: Guide to OT Security. NIST.',
                    'The Open Group. (2022). TOGAF Standard, Version 10.',
                    'TM Forum. (2023). eTOM Business Process Framework (GB921). TM Forum.',
                ]} />
            </Section>

            {/* See Also */}
            <SeeAlso links={[
                { href: '/wiki/sectors/COMU', label: 'COMU Sector Overview', color: '#3B82F6' },
                { href: '/wiki/dexpi/equipment-classes', label: 'DEXPI Equipment Classes', color: '#F59E0B' },
                { href: '/wiki/energy', label: 'Energy Sector Hub', color: '#F59E0B' },
                { href: '/wiki/critical-manufacturing', label: 'Critical Manufacturing Hub', color: '#F97316' },
            ]} />
        </div>
    );
}

function Section({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
    return (<section id={id} className="space-y-4"><h2 className="text-xl font-heading font-semibold text-white">{title}</h2>{children}</section>);
}
function Tbl({ heads, rows }: { heads: string[]; rows: string[][] }) {
    return (<div className="overflow-x-auto"><table className="w-full text-xs border-collapse"><thead><tr className="border-b border-white/[0.08] text-gray-500">{heads.map(h => <th key={h} className="text-left px-3 py-2 font-medium">{h}</th>)}</tr></thead><tbody>{rows.map((r, i) => <tr key={i} className="border-b border-white/[0.04] hover:bg-white/[0.02]">{r.map((c, j) => <td key={j} className={`px-3 py-2 ${j === 0 ? 'text-[#3B82F6] font-medium whitespace-nowrap' : 'text-gray-400'}`}>{c}</td>)}</tr>)}</tbody></table></div>);
}
function Ascii({ children }: { children: string }) {
    return (<div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}><pre className="whitespace-pre leading-relaxed">{children}</pre></div>);
}
function Refs({ items }: { items: string[] }) { return (<div className="space-y-2 text-xs text-gray-400 leading-relaxed">{items.map((item, i) => <p key={i}>{item}</p>)}</div>); }
function SeeAlso({ links }: { links: { href: string; label: string; color: string }[] }) {
    return (<section className="space-y-3"><h2 className="text-xl font-heading font-semibold text-white">See Also</h2><div className="flex flex-wrap gap-2">{links.map(l => <a key={l.href} href={l.href} className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-white/[0.04]" style={{ borderColor: `${l.color}30`, color: l.color }}>{l.label} &rarr;</a>)}</div></section>);
}
