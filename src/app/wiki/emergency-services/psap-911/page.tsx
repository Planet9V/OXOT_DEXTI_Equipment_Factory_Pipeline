/**
 * 911 / PSAP Emergency Communications Center — Deep Dive Wiki Article.
 * NG911 ESInet, SIP/HELD/LoST routing, Zetron consoles, Hexagon CAD.
 * @module wiki/emergency-services/psap-911/page
 */
export const metadata = {
    title: '911/PSAP Emergency Communications — EMER Deep Dive',
    description: 'TOGAF reference architecture for NG911 PSAPs: ESInet, SIP routing, CAD integration, and NENA i3 compliance.',
};

export default function Psap911Page() {
    const C = '#DC2626';
    return (
        <div className="max-w-5xl space-y-10">
            <header className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]" style={{ background: C }} />
                    <span className="text-xs font-mono text-gray-500">EMER · LAW ENFORCEMENT · 911/PSAP</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">911 / PSAP Emergency Communications Center</h1>
                <p className="text-sm text-gray-400 max-w-3xl">Next-Generation 911 Public Safety Answering Point with ESInet IP transport, NENA i3 call routing, GIS-based location, and integrated CAD/RMS. Reference for a 50-position regional PSAP.</p>
                <div className="flex flex-wrap gap-2 pt-1">
                    {['NENA i3', 'NG911', 'SIP', 'NFPA 1221', 'CJIS', 'ESInet'].map((t) => (
                        <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded border border-[#DC2626]/30 text-[#DC2626]">{t}</span>
                    ))}
                </div>
            </header>

            <Section title="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-300 leading-relaxed">PSAPs form the critical entry point for all emergency communications. The <span className="text-[#DC2626] font-medium">NG911 transition</span> replaces legacy analog CAMA trunks with IP-based ESInet, enabling multimedia (text, video, telematics) alongside voice.</p>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">Stakeholders</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li><span className="text-[#DC2626] font-medium">FCC</span> — Kari&apos;s Law, RAY BAUM&apos;s Act, NG911 rulemaking</li>
                    <li><span className="text-[#DC2626] font-medium">NENA</span> — i3 standards body for NG911 architecture</li>
                    <li><span className="text-[#DC2626] font-medium">APCO International</span> — Public-safety communications officials; training/certification</li>
                    <li><span className="text-[#DC2626] font-medium">State 911 Authorities</span> — 911 surcharges, PSAP oversight</li>
                    <li><span className="text-[#DC2626] font-medium">Telecom Carriers</span> — Originating Service Providers delivering calls</li>
                    <li><span className="text-[#DC2626] font-medium">GIS Authorities</span> — MSAG, ALI, road centerline maintenance</li>
                    <li><span className="text-[#DC2626] font-medium">First Responder Agencies</span> — Fire, EMS, law enforcement</li>
                </ul>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">Regulatory Framework</h3>
                <Table headers={['Standard', 'Scope']} rows={[
                    ['NENA i3 (STA-010.3)', 'NG911 system architecture, ESInet, NGCS functional elements'],
                    ['FCC Kari\'s Law', 'Direct 911 dialing from MLTS without prefix; on-site notification'],
                    ['FCC RAY BAUM\'s Act §506', 'Dispatchable location for all 911 calls including VoIP/wireless'],
                    ['NFPA 1221', 'Emergency services communications systems installation and maintenance'],
                    ['FBI CJIS Security Policy', 'Security controls for criminal justice information access'],
                    ['FCC STIR/SHAKEN', 'Caller ID authentication to combat spoofed 911 calls'],
                    ['NENA 56-005 / MSAG', 'Master Street Address Guide standards for ALI database accuracy'],
                ]} color={C} />
            </Section>

            <Section title="2. High-Level Design" id="design">
                <p className="text-sm text-gray-300 leading-relaxed">An NG911 PSAP operates on a geo-diverse ESInet backbone with policy-based routing through NG911 Core Services (NGCS). Legacy CAMA/ISDN connects via Legacy Network Gateways (LNG).</p>
                <Diagram>{
                    `┌──────────┐  ┌──────────┐  ┌─────────────────────────────────────────┐
│ Wireless │  │ Wireline │  │      NG911 Core Services (NGCS)        │
│ Cell Twr │─►│  Legacy  │─►│  ECRF ─► ESRP ─► LVF ─► LNG          │
│ VoIP/OTT │  │  Network │  │  (GIS)   (Route)  (Loc)  (Legacy GW)  │
│ Text/RTT │  │  Gateway │  │                                        │
└──────────┘  └──────────┘  │       E S I n e t  (SIP/TLS)          │
                            └──────────────┬────────────────────────┘
                 ┌─────────────────────────┼──────────────────────┐
           ┌─────▼──────┐          ┌───────▼──────┐       ┌──────▼───────┐
           │ PRIMARY    │◄─Geo────►│  BACKUP      │       │ OVERFLOW     │
           │ PSAP 50pos │ Diverse  │  PSAP 50pos  │       │ PSAP Partner │
           │ Zetron/MCC │          │  Zetron/MCC  │       │              │
           └────────────┘          └──────────────┘       └──────────────┘`
                }</Diagram>
                <p className="text-xs text-gray-500 mt-2 italic">Figure 1 — NG911 ESInet with geo-diverse PSAP pairs and NGCS elements.</p>
            </Section>

            <Section title="3. Detailed Technical Description" id="technical">
                <h3 className="text-sm font-semibold text-white/80 mb-2">3.1 Call Processing</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-2">Multi-protocol call handling with SIP trunks, legacy CAMA, and text-to-911.</p>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>Zetron MAX Dispatch or Motorola Vesta — 50 positions, 500 calls/hr</li>
                    <li>Ribbon SBC 5400 — SIP border controller, 500 sessions, TLS/SRTP</li>
                    <li>NICE Inform Elite — SIPREC recording, 200 ch, AI analytics, 90-day store</li>
                    <li>Text-to-911 — RTT (Real-Time Text) per RFC 4103</li>
                </ul>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">3.2 Radio Dispatch</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>Zetron ACOM or Motorola MCC 7500E — 32+ channels, P25 ISSI</li>
                    <li>Zetron Model 640 paging encoder — station alerting, two-tone/DTMF</li>
                </ul>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">3.3 CAD / RMS</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>Hexagon I/CAD — 500+ incidents, NIBRS export, ProQA EMD/EFD/EPD</li>
                    <li>AVL — 5-sec polling, GIS overlay, closest-unit recommendation</li>
                </ul>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">3.4 GIS / Mapping</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>Esri ArcGIS Enterprise with NG911 extension, ECRF/LVF, 3D buildings</li>
                    <li>MSAG, road centerline, ESZ/ESN boundaries, real-time AVL tracks</li>
                </ul>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">3.5 Network</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>Cisco Catalyst 9500 — 40 GbE spine, redundant pair</li>
                    <li>Juniper SRX 4600 — ESInet edge firewall, IPsec</li>
                    <li>Dual-diverse MPLS (10 Gbps), GPS NTP/PTP (±1 ms)</li>
                </ul>
            </Section>

            <Section title="4. Process Diagrams" id="process">
                <h3 className="text-sm font-semibold text-white/80 mb-2">4.1 NG911 Call Flow</h3>
                <Diagram>{
                    `Caller → Cell Tower → MSC → LSRG → ESInet → ECRF/LoST → ESRP → PSAP
  │                                    │                          │
  └── PIDF-LO (GPS) ─────────────────┘  SIP INVITE ────────────┘
                                                                  │
                                       Zetron/Vesta ──► CAD ──► Dispatch
                                           │                      │
                                       NICE/Eventide          P25 / MDT`
                }</Diagram>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">4.2 CAD Incident Lifecycle</h3>
                <Diagram>{
                    `Call Received ──► ProQA Triage ──► Incident Created ──► Unit Selected
      │               │                  │                    │
  ANI/ALI          DLS Code          GIS Geocode         Closest Unit
      │               │                  │                    │
 Dispatched ──► En Route (AVL) ──► On Scene ──► Transport/Clear ──► Close
 (Tone-out)      (GPS track)      (Status)     (Disposition)    (RMS sync)`
                }</Diagram>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">4.3 BMS / Facility SCADA</h3>
                <Diagram>{
                    `BMS ──► HVAC / UPS / Gen ──► SNMP Traps ──► NMS (Nagios/PRTG)
  │                               │                │
  └── Modbus/BACnet sensors ─────┘     Email/SMS alerts`
                }</Diagram>
            </Section>

            <Section title="5. Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2 italic">Scaled for a 50-position regional NG911 PSAP with geo-diverse backup.</p>
                <Table headers={['Equipment', 'Specification', 'Qty', 'Rating']} rows={[
                    ['Zetron MAX Position', 'SIP/CAMA, 6-monitor, mapping', '50', '500 calls/hr'],
                    ['Motorola MCC 7500E', 'P25 Phase II, 32-ch, ISSI', '20', '32 talk groups'],
                    ['Hexagon I/CAD Cluster', 'VMware HA, NIBRS export', '4', '99.999% uptime'],
                    ['NICE Inform Elite', 'SIPREC, 200-ch, AI, 90-day', '2', '200 channels'],
                    ['Ribbon SBC 5400', 'SIP border, TLS/SRTP', '2', '500 sessions'],
                    ['Esri ArcGIS Enterprise', 'NG911 GIS, ECRF/LVF', '2', 'Enterprise'],
                    ['Cisco Cat 9500', '40 GbE StackWise Virtual', '4', '40 Gbps'],
                    ['Juniper SRX 4600', 'ESInet FW, IPsec, IDS', '2', '100 Gbps'],
                    ['Dell R760 Server', '2× Xeon 8470, 512 GB', '8', 'vSphere 8'],
                    ['NetApp AFF A250', 'NVMe, 50 TB, SnapVault', '2', '50 TB'],
                    ['Cummins DQKAH Gen', 'Diesel, ATS, 72-hr fuel', '2', '500 kW'],
                    ['Eaton 93PM UPS', 'Modular N+1, Li-ion', '4', '200 kVA'],
                    ['Liebert PDX CRAC', 'Precision cooling, EC fans', '6', '120 kW'],
                    ['Meinberg GPS NTP', 'GNSS, NTP/PTP, ±50 ns', '2', 'Stratum 1'],
                    ['ProQA EMD/EFD', 'Priority Dispatch, triage', '50', 'Per position'],
                    ['Barco TransForm', 'Video wall, 4K, 16-input', '1', '8×4 array'],
                    ['Zetron 640 Paging', 'Station alerting, 2-tone', '2', '50 stations'],
                    ['CJIS Auth Server', 'MFA, PKI, FIPS 140-2', '2', '5,000 users'],
                ]} color={C} />
            </Section>

            <Section title="6. Purdue Model Mapping" id="purdue">
                <Table headers={['Level', 'Components', 'Protocols']} rows={[
                    ['L4 Enterprise', 'NENA i3 registry, CJIS portal, NIBRS/NFIRS', 'HTTPS, NIEM XML, REST'],
                    ['L3.5 DMZ', 'ESInet SBC, CJIS proxy, API gateway', 'TLS 1.3, IPsec, STIR/SHAKEN'],
                    ['L3 Operations', 'CAD (Hexagon), GIS (Esri), ProQA, analytics', 'SIP, LoST, HELD, CAP'],
                    ['L2 Supervisory', 'Call routing (ESRP/MCP), NICE recorder, video wall', 'SIPREC, SNMP, RTSP'],
                    ['L1 Control', 'Zetron/MCC console, paging encoder, ACD', 'P25 ISSI, DTMF'],
                    ['L0 Process', 'Phone trunks SIP/CAMA, radio I/O, TTY/RTT', 'CAMA, ISDN PRI, RTP'],
                ]} color={C} />
            </Section>

            <Section title="7. Supporting Systems" id="supporting">
                <Table headers={['System', 'Description', 'Specification']} rows={[
                    ['Fire Suppression', 'FM-200 clean agent in server rooms', 'NFPA 2001, 7% conc'],
                    ['HVAC / Cooling', 'Liebert PDX with hot-aisle containment', '120 kW/unit, N+1'],
                    ['Standby Power', 'Cummins diesel, 72-hr sub-base tank', '500 kW, NFPA 110 L1'],
                    ['UPS', 'Eaton 93PM modular, lithium-ion', '200 kVA, 15-min'],
                    ['Physical Security', 'Man-trap, 128-ch CCTV, HID access', 'CJIS compliant, 24/7'],
                    ['Lightning', 'Franklin rod, surge protection', 'NFPA 780, UL 96A'],
                    ['Grounding', 'Exothermic-welded ground ring', 'IEEE 80, <5 Ω'],
                ]} color={C} />
            </Section>

            <Section title="8. Utility & Environmental Systems" id="utility">
                <Table headers={['Medium', 'System', 'Specification']} rows={[
                    ['Diesel Fuel', 'Sub-base generator tank', '5,000 gal, double-wall, 72-hr'],
                    ['Potable Water', 'Municipal + 500-gal reserve', 'Break tank, backflow preventer'],
                    ['Conditioned Air', 'CRAC + economizer free cooling', '55°F supply, 65–75°F room'],
                    ['Cable Plant', 'Cat6A/OM4 structured cabling', 'TIA-568.2-D, 2,000+ drops'],
                ]} color={C} />
            </Section>

            <Section title="9. Data Flow Architecture" id="dataflow">
                <Diagram>{
                    `┌───────────────────────────────────────────────────────────────────┐
│ TIER 4 — ENTERPRISE    NENA i3 · CJIS · NIBRS · State 911 Board │
│  ── REST / NIEM XML ── 24-hr batch + on-demand ─────────────────│
├───────────────────────────────────────────────────────────────────┤
│ TIER 3 — OPERATIONS    CAD · RMS · GIS · ProQA · ePCR GW       │
│  ── SIP / HELD / LoST ── 500+ incidents/day ────────────────────│
├───────────────────────────────────────────────────────────────────┤
│ TIER 2 — SUPERVISORY    ESRP · NICE Recorder · Video Wall · ACD│
│  ── SIPREC / SNMP / RTSP ── 240M calls/yr nationwide ──────────│
├───────────────────────────────────────────────────────────────────┤
│ TIER 1 — FIELD          Zetron · P25 · Paging · MDT/MDC        │
│  ── P25 ISSI · DTMF · SIP ── <1 sec call setup ────────────────│
└───────────────────────────────────────────────────────────────────┘`
                }</Diagram>
            </Section>

            <Section title="10. References" id="references">
                <ul className="space-y-2 text-xs text-gray-500 font-mono">
                    <li>• NENA. (2021). <em>NENA i3 Standard for NG9-1-1 (NENA-STA-010.3).</em></li>
                    <li>• FCC. (2020). <em>Kari&apos;s Law and RAY BAUM&apos;s Act Implementation.</em></li>
                    <li>• NFPA. (2022). <em>NFPA 1221: Emergency Services Communications.</em></li>
                    <li>• FBI. (2022). <em>CJIS Security Policy v5.9.1.</em></li>
                    <li>• APCO. (2023). <em>APCO ANS 1.101.3: Core Competencies.</em></li>
                    <li>• IETF. (2010). <em>RFC 5222: LoST Protocol.</em></li>
                    <li>• IETF. (2014). <em>RFC 7340: SIPREC Architecture.</em></li>
                    <li>• NIST. (2024). <em>Cybersecurity Framework 2.0.</em></li>
                </ul>
            </Section>

            <Section title="See Also" id="see-also">
                <div className="flex flex-wrap gap-3">
                    {[
                        { label: 'Emergency Services Hub', href: '/wiki/emergency-services', color: '#DC2626' },
                        { label: 'Fire Station', href: '/wiki/emergency-services/fire-station', color: '#F97316' },
                        { label: 'EOC', href: '/wiki/emergency-services/eoc', color: '#3B82F6' },
                        { label: 'EMER Sector', href: '/wiki/sectors/EMER', color: '#DC2626' },
                        { label: 'DEXPI Equipment', href: '/wiki/dexpi', color: '#6366F1' },
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
    return (<div className="overflow-x-auto"><table className="w-full text-xs border-collapse"><thead><tr className="border-b border-white/[0.08] text-gray-500">{headers.map((h) => (<th key={h} className="text-left px-3 py-2 font-medium">{h}</th>))}</tr></thead><tbody className="text-gray-400 divide-y divide-white/[0.04]">{rows.map((r) => (<tr key={r[0]} className="hover:bg-white/[0.02]"><td className="px-3 py-2 font-medium whitespace-nowrap" style={{ color }}>{r[0]}</td>{r.slice(1).map((c, i) => (<td key={i} className="px-3 py-2">{c}</td>))}</tr>))}</tbody></table></div>);
}
