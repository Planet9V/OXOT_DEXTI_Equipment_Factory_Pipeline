/**
 * Financial Data Center — Deep Dive Wiki Article.
 * Tier III/IV data center housing core banking, payment processing, and DR.
 * @module wiki/financial-services/data-center/page
 */
export const metadata = {
    title: 'Financial Data Center — FINA Deep Dive',
    description: 'Tier IV data center reference architecture for banking with 2N+1 power and PCI DSS 4.0.',
};
const C = '#10B981';
export default function FinancialDataCenterPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]" style={{ background: C }} />
                    <span className="text-xs font-mono text-gray-500">FINA · FINA-BK · DATA CENTER</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">Financial Data Center</h1>
                <p className="text-sm text-gray-400">Tier III / IV · Core Banking & Payment Processing · 2N+1 Fault-Tolerant</p>
            </div>
            <S title="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-300 leading-relaxed">Financial data centers serve as the operational backbone for depository institutions, providing compute, storage, and network infrastructure for <span className="text-[#10B981] font-medium">core banking</span>, <span className="text-[#10B981] font-medium">real-time payment processing</span>, and <span className="text-[#10B981] font-medium">disaster recovery</span>. These facilities must maintain 99.995% availability per Uptime Tier IV.</p>
                <h3 className="text-xs font-semibold text-gray-400 mt-4 mb-2">Stakeholders</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>Federal Reserve System — Monetary policy and payment system oversight</li>
                    <li>OCC / FDIC — National bank chartering and deposit insurance</li>
                    <li>SEC — Securities processing and market data systems</li>
                    <li>PCI SSC — Payment card data protection</li>
                    <li>FFIEC — IT examination and cybersecurity assessment</li>
                    <li>Co-location Providers — Equinix, CyrusOne, QTS</li>
                    <li>Vendors — Cisco, Vertiv, Schneider Electric, Palo Alto</li>
                </ul>
                <h3 className="text-xs font-semibold text-gray-400 mt-4 mb-2">Regulatory Framework</h3>
                <T heads={['Standard', 'Scope']} rows={[
                    ['PCI DSS 4.0', 'Payment card data — 12 requirement domains'],
                    ['SOC 2 Type II', 'Security, Availability, Confidentiality controls'],
                    ['FFIEC IT Handbook', 'Information security, BCP, operations'],
                    ['SOX §404', 'Financial reporting IT controls & audit'],
                    ['GLBA / Reg P', 'Consumer financial data privacy'],
                    ['TIA-942 Rated-4', 'Structured cabling and DC topology'],
                    ['Uptime Tier IV', 'Fault-tolerant — 99.995% uptime'],
                ]} />
            </S>
            <S title="2. High-Level Design" id="design">
                <p className="text-sm text-gray-300 leading-relaxed">The reference design follows a <span className="text-[#10B981] font-medium">2N+1 fault-tolerant topology</span> with dual active power/cooling paths. Every component from utility entrance to rack PDU has a fully redundant, physically isolated counterpart. Network uses spine-leaf CLOS fabric with dual-diverse WAN entry.</p>
                <Diagram>{
                    `UTILITY A (13.8kV)──►[ATS-A]──►[XFMR 2500kVA]──►[SWGR 4000A]──►[UPS 750kVA]──►[PDU-A]──►RACK
                                                                                              │
                        GENERATOR YARD (2MW × N+1)                                      ◄─── IT LOAD
                                                                                              │
UTILITY B (13.8kV)──►[ATS-B]──►[XFMR 2500kVA]──►[SWGR 4000A]──►[UPS 750kVA]──►[PDU-B]──►RACK

COOLING:  [Chiller 500T × N+1] ──► [CRAH/Row CDU] ──► [Hot/Cold Aisle Containment]
NETWORK:  [DWDM Entry A/B] ──► [Core Spine] ──► [Leaf ToR] ──► [Server NIC]`
                }</Diagram>
                <p className="text-xs text-gray-500 mt-1 italic">Fig. 1 — Tier IV 2N+1 power, cooling, and network one-line diagram.</p>
            </S>
            <S title="3. Detailed Technical Description" id="tech">
                <h3 className="text-xs font-semibold text-gray-400 mb-2">3.1 Electrical Power</h3>
                <p className="text-sm text-gray-300 leading-relaxed">Dual independent 13.8 kV utility feeds via diverse underground paths. 4000A main switchgear with vacuum CBs, 2500 kVA dry-type K-13 transformers to 480V. Rotary or static UPS at 750 kVA, 15–30 min bridge. Caterpillar 3516 / Cummins QSK60 generators (2 MW each) in N+1 parallel with 48-hr fuel. Overhead busway PDUs (Starline, 400A 3-phase), dual A+B rack feeds. PUE target: 1.2–1.4.</p>
                <h3 className="text-xs font-semibold text-gray-400 mt-5 mb-2">3.2 Precision Cooling</h3>
                <p className="text-sm text-gray-300 leading-relaxed">Centrifugal chillers (Trane CenTraVac / York YK, 500-ton, N+1) at 42°F supply / 56°F return. Vertiv Liebert CRV CRAH units (30–60 ton) with EC fans in hot/cold containment. In-row CDUs (Liebert XDU, 150–450 kW) for &gt;20 kW/rack zones. ASHRAE TC 9.9: 18–27°C, 40–60% RH.</p>
                <h3 className="text-xs font-semibold text-gray-400 mt-5 mb-2">3.3 Network Infrastructure</h3>
                <p className="text-sm text-gray-300 leading-relaxed">Spine-leaf CLOS: Arista 7800R4 (48×400G) spine, Arista 7050X4 (32×100G) leaf. Non-blocking 100+ Tbps. Dual-diverse DWDM (Cisco NCS 1004, 96-ch C-band) over dark fiber. Palo Alto PA-7000 NG firewalls (active-active HA). F5 BIG-IP i7800 (200 Gbps) load balancers.</p>
                <h3 className="text-xs font-semibold text-gray-400 mt-5 mb-2">3.4 Compute & Storage</h3>
                <p className="text-sm text-gray-300 leading-relaxed">VMware/RHEL clusters (Dell R760, Xeon Scalable, 2TB RAM). Oracle RAC / IBM Db2 on EMC PowerMax SAN (10 PB, 1M+ IOPS). NetApp StorageGRID for long-term retention. IBM z16 mainframe partition for COBOL batch and real-time TPS.</p>
                <h3 className="text-xs font-semibold text-gray-400 mt-5 mb-2">3.5 Physical Security</h3>
                <p className="text-sm text-gray-300 leading-relaxed">K-12 bollards → 8-ft anti-climb fencing → mantrap vestibules (bullet-resistant glass) → biometric iris/vein (HID, 99.99% FAR) → 4K CCTV (Axis Q-series, 90-day, AI analytics) → UL 752 Level 8 ballistic walls.</p>
            </S>
            <S title="4. Process Diagrams" id="process">
                <h3 className="text-xs font-semibold text-gray-400 mb-2">4.1 Power Distribution</h3>
                <Diagram>{
                    `UTILITY 13.8kV ──► ATS (sub-sec) ──► XFMR 2500kVA ──► SWGR 4000A ──► UPS 750kVA
                       │                                                    │
                   GEN YARD (2MW×N+1, 48hr fuel)                       PDU 400A ──► Rack A+B
                                                                            │
                                                                    BMS/DCIM Monitoring`
                }</Diagram>
                <h3 className="text-xs font-semibold text-gray-400 mt-5 mb-2">4.2 Cooling Loop</h3>
                <Diagram>{
                    `COOLING TOWER ◄── CONDENSER PUMP ◄── CHILLER 500T (42°F supply)
     │                                      │
  Heat Reject                          CHW PUMP (VFD) ──► CRAH/CDU ──► Containment
  to atmosphere                                           (ASHRAE 18-27°C)`
                }</Diagram>
                <h3 className="text-xs font-semibold text-gray-400 mt-5 mb-2">4.3 Network Data Flow</h3>
                <Diagram>{
                    `WAN (DWDM A/B) ──► Edge Router (ASR 9900) ──► NG Firewall (PA-7000)
                                                       │
                                                 Load Balancer (F5)
                                                       │
                                                 SPINE (Arista 7800R4)
                                                       │
                                                 LEAF ToR (7050X4) ──► Server NIC ──► Core Banking`
                }</Diagram>
            </S>
            <S title="5. Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2 italic">Reference: 5 MW critical IT load, Tier IV, ~500 racks</p>
                <T heads={['Equipment', 'Specification', 'Qty', 'Rating']} rows={[
                    ['Diesel Generator', 'Cat 3516 / Cummins QSK60', '6–8', '2,000 kW'],
                    ['Auto Transfer Switch', 'Open-transition, arc-resistant', '8–12', '4,000 A'],
                    ['Step-Down Transformer', 'Dry-type cast-coil, K-13', '8–12', '2,500 kVA'],
                    ['Main Switchgear', 'Metal-enclosed, vacuum CB', '4–8', '4,000 A'],
                    ['UPS Module', 'Rotary (Hitec) / Static (Vertiv)', '12–20', '750 kVA'],
                    ['Busway PDU', 'Starline 3-phase, SNMP', '60–100', '400 A'],
                    ['Centrifugal Chiller', 'Trane CenTraVac / York YK', '4–6', '500 ton'],
                    ['CRAH Unit', 'Vertiv Liebert CRV, EC fans', '40–80', '30–60 ton'],
                    ['In-Row CDU', 'Vertiv Liebert XDU', '20–40', '150–450 kW'],
                    ['Cooling Tower', 'Evaporative, VFD fans', '4–8', '500 ton'],
                    ['Core Spine Switch', 'Arista 7800R4, 48×400G', '4–8', '100+ Tbps'],
                    ['ToR Leaf Switch', 'Arista 7050X4, 32×100G', '100–200', '6.4 Tbps'],
                    ['NG Firewall', 'Palo Alto PA-7000', '4–8', '200 Gbps'],
                    ['Load Balancer', 'F5 BIG-IP iSeries i7800', '4–8', '200 Gbps'],
                    ['DWDM System', 'Cisco NCS 1004, 96-ch', '2–4', '400 Gbps/λ'],
                    ['WAN Router', 'Cisco ASR 9900 / Juniper MX960', '4–8', 'SR/MPLS'],
                    ['SAN Storage', 'EMC PowerMax', '2–4', '10 PB'],
                    ['Object Storage', 'NetApp StorageGRID', '2–4', '10 PB+'],
                    ['Compute Server', 'Dell R760, Xeon, 2TB RAM', '200–400', 'vSphere'],
                    ['Mainframe', 'IBM z16', '1–2', '100k MIPS'],
                    ['VESDA Detector', 'Xtralis VESDA-E VEA', '50–100', '0.001%/m'],
                    ['Fire Suppression', 'Novec 1230 / FM-200', '20–40', '10-s discharge'],
                    ['CCTV Camera', 'Axis Q-series 4K, AI', '100–200', '90-day'],
                    ['Biometric Scanner', 'HID iris/vein + PIN', '20–40', '99.99% FAR'],
                    ['BMS/DCIM', 'Schneider EcoStruxure / Nlyte', '1', 'Full site'],
                ]} />
            </S>
            <S title="6. Purdue Model Mapping" id="purdue">
                <T heads={['Level', 'Components', 'Protocols']} rows={[
                    ['L4 Enterprise', 'SAP ERP, Oracle Financials, BI/DW', 'REST, JDBC, SAP RFC'],
                    ['L3.5 DMZ', 'API Gateway, WAF, Reverse Proxy, SIEM', 'TLS 1.3, OAuth 2.0'],
                    ['L3 Operations', 'DCIM (Nlyte), BMS (EcoStruxure), NOC', 'SNMP v3, BACnet'],
                    ['L2 Control', 'PDU Controllers, ATS Logic, Chiller PLC', 'BACnet/IP, Modbus TCP'],
                    ['L1 Device', 'UPS, Generators, CRAH, Fire Panel', 'IPMI, 4–20mA'],
                    ['L0 Process', 'Temp/Humidity, Power Meters, Leak Detect', 'Analog, RS-485'],
                ]} />
                <p className="text-xs text-gray-500 mt-2 italic">Aligned with ISA-95 / IEC 62443 for financial IT/OT convergence.</p>
            </S>
            <S title="7. Supporting Systems" id="supporting">
                <T heads={['System', 'Description', 'Specification']} rows={[
                    ['Fire Suppression', 'Novec 1230 clean agent + VESDA', 'NFPA 75/76, 10-s discharge'],
                    ['Pre-Action Sprinkler', 'Dry-pipe double-interlock', 'NFPA 13, 165°F QR'],
                    ['Precision Cooling', 'CHW CRAH + in-row CDU', 'ASHRAE TC 9.9, PUE 1.2–1.4'],
                    ['Backup Power', 'Diesel generator yard', '2 MW × N+1, <10s transfer'],
                    ['UPS Battery', 'VRLA or Li-ion strings', '15–30 min, 750 kVA'],
                    ['Physical Security', 'Mantrap, biometric, CCTV, bollards', 'UL 752, 90-day video'],
                    ['BMS / DCIM', 'EcoStruxure + Nlyte dcTrack', 'Real-time PUE monitoring'],
                ]} />
            </S>
            <S title="8. Water, Air & Gas Systems" id="utilities">
                <T heads={['Medium', 'System', 'Specification']} rows={[
                    ['Chilled Water', 'Primary/secondary CHW loops', '42°F / 56°F, VFD pumps'],
                    ['Condenser Water', 'Cooling tower circuit', '85°F/95°F, chemical treatment'],
                    ['Diesel Fuel', 'Day tank + bulk storage', '48-hr reserve, berm containment'],
                    ['Compressed Air', 'Instrument air for dampers', '100 psi, oil-free'],
                    ['Clean Agent Gas', 'Novec 1230 / FM-200 cylinders', 'Per-zone, 10-s discharge'],
                ]} />
            </S>
            <S title="9. Data Flow Architecture" id="data-flow">
                <Diagram>{
                    `┌───────────────────────────────────────────────────────────────────┐
│  TIER 4 — ENTERPRISE    SAP / Oracle  ←── REST/JDBC ──  BI/DW   │
├───────────────────────────────────────────────────────────────────┤
│  TIER 3.5 — DMZ   API GW ← TLS 1.3 → WAF ← Reverse Proxy ← SIEM│
├───────────────────────────────────────────────────────────────────┤
│  TIER 3 — OPS   DCIM (Nlyte) ← SNMP v3 → BMS (EcoStruxure)     │
│  10,000+ points · 30-sec polling · 8,760 hr/yr trending          │
├───────────────────────────────────────────────────────────────────┤
│  TIER 2 — CONTROL   PDU Ctrl ← Modbus TCP → ATS ← Chiller PLC  │
├───────────────────────────────────────────────────────────────────┤
│  TIER 1 — DEVICE   UPS (IPMI) · Gen (Modbus) · CRAH (BACnet)    │
├───────────────────────────────────────────────────────────────────┤
│  TIER 0 — SENSORS   Temp ±0.5°C · RH ±2% · kW Meter · Leak     │
└───────────────────────────────────────────────────────────────────┘`
                }</Diagram>
            </S>
            <S title="10. References" id="references">
                <ul className="space-y-2 text-xs text-gray-500 font-mono">
                    <li>• Uptime Institute. (2023). <em>Tier Standard: Topology.</em></li>
                    <li>• TIA. (2017). <em>TIA-942-B: DC Infrastructure Standard.</em></li>
                    <li>• PCI SSC. (2024). <em>PCI DSS v4.0.</em></li>
                    <li>• FFIEC. (2023). <em>IT Exam Handbook — InfoSec.</em></li>
                    <li>• ASHRAE. (2021). <em>TC 9.9: Thermal Guidelines.</em> 5th ed.</li>
                    <li>• NFPA. (2022). <em>NFPA 75/76: Fire Protection IT/Telecom.</em></li>
                    <li>• NIST. (2024). <em>SP 800-53 Rev. 5.</em></li>
                    <li>• IEC. (2020). <em>IEC 62443: Industrial Cybersecurity.</em></li>
                </ul>
            </S>
            <S title="See Also" id="see-also">
                <div className="flex flex-wrap gap-3">
                    {[
                        { label: 'Financial Services Hub', href: '/wiki/financial-services', color: C },
                        { label: 'Securities Exchange', href: '/wiki/financial-services/trading-exchange', color: '#3B82F6' },
                        { label: 'Clearinghouse', href: '/wiki/financial-services/clearinghouse', color: '#8B5CF6' },
                        { label: 'FINA Sector', href: '/wiki/sectors/FINA', color: C },
                        { label: 'DEXPI Classes', href: '/wiki/dexpi', color: '#06B6D4' },
                    ].map((l) => (
                        <a key={l.label} href={l.href} className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-white/[0.04]" style={{ borderColor: `${l.color}30`, color: l.color }}>{l.label} →</a>
                    ))}
                </div>
            </S>
        </div>
    );
}
function S({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
    return (<section id={id} className="space-y-4 pt-8 border-t border-white/[0.04]"><h2 className="text-lg font-heading font-semibold text-white/90">{title}</h2>{children}</section>);
}
function Diagram({ children }: { children: string }) {
    return (<div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}><pre className="whitespace-pre leading-relaxed">{children}</pre></div>);
}
function T({ heads, rows }: { heads: string[]; rows: string[][] }) {
    return (<div className="overflow-x-auto"><table className="w-full text-xs border-collapse"><thead><tr className="border-b border-white/[0.08] text-gray-500">{heads.map(h => <th key={h} className="text-left px-3 py-2 font-medium">{h}</th>)}</tr></thead><tbody className="text-gray-300 divide-y divide-white/[0.04]">{rows.map((r, i) => <tr key={i} className="hover:bg-white/[0.02]">{r.map((c, j) => <td key={j} className={j === 0 ? 'px-3 py-2 text-[#10B981] font-medium whitespace-nowrap' : 'px-3 py-2 text-gray-400'}>{c}</td>)}</tr>)}</tbody></table></div>);
}
