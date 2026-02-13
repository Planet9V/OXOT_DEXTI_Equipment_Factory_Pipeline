/**
 * Telecom Data Center / Colocation Facility Deep-Dive Reference Architecture.
 * TIA-942-B, Uptime Tier III/IV, 2N power, spine-leaf, DCIM.
 * @module wiki/communications/data-center/page
 */
export const metadata = {
    title: 'Telecom Data Center — Communications Wiki',
    description: 'TOGAF reference architecture for telecom-grade data centers: TIA-942-B, Uptime Tier III/IV, 2N power, spine-leaf fabric, UPS/PDU, CRAC/CRAH, chiller plant, DCIM, physical security.',
};
export default function DataCenterPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}>🖥️</div>
                    <div>
                        <span className="text-[10px] text-gray-500 font-mono block">COMU-WR-CO · Infrastructure</span>
                        <h1 className="text-2xl font-heading font-bold text-white">Telecom Data Center / Colocation Reference Architecture</h1>
                    </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">TOGAF-based reference architecture for telecom-grade data centers and colocation facilities covering TIA-942-B compliance, Uptime Institute Tier III/IV design, 2N power distribution (utility → UPS → PDU → rack), precision cooling (CRAC/CRAH, chilled water, free cooling), spine-leaf network fabric (400GE), hot/cold aisle containment, DCIM (Data Center Infrastructure Management), physical security — governed by TIA-942-B, ASHRAE TC 9.9, NFPA 75/76, Uptime Institute standards.</p>
            </div>
            <S n={1} t="TOGAF Business Architecture" id="togaf">
                <H4>Stakeholder Map</H4>
                <Tbl heads={['Stakeholder', 'Role', 'Interest']} rows={[
                    ['Colo Providers', 'Owner/Operator', 'Equinix, Digital Realty, CyrusOne, QTS, CoreSite, NTT'],
                    ['Hyperscalers', 'Tenant', 'AWS, Microsoft Azure, Google Cloud, Oracle, IBM'],
                    ['Carriers', 'Interconnect', 'AT&T, Verizon, Lumen, Zayo, meet-me room cross-connects'],
                    ['Enterprise', 'Tenant', 'Financial services, healthcare, government, SaaS providers'],
                    ['Uptime Institute', 'Certification', 'Tier I-IV design/constructed/operational sustainability'],
                    ['TIA', 'Standards', 'TIA-942-B data center infrastructure, cabling'],
                    ['ASHRAE', 'Thermal', 'TC 9.9: thermal guidelines, A1 envelope (18-27°C)'],
                    ['NFPA', 'Fire/Safety', 'NFPA 75 (IT equipment), NFPA 76 (telecom), NFPA 2001 (clean agent)'],
                ]} />
                <H4>Regulatory Framework</H4>
                <Tbl heads={['Standard', 'Title', 'Scope']} rows={[
                    ['TIA-942-B', 'Data Center Standard', 'Space, cabling, redundancy tiers, pathways, grounding'],
                    ['Uptime Tier III', 'Concurrently Maintainable', 'N+1 power/cooling, 2N distribution, 99.982% uptime'],
                    ['Uptime Tier IV', 'Fault Tolerant', '2N+1, fault tolerance, 99.995% uptime'],
                    ['ASHRAE TC 9.9', 'Thermal Guidelines', 'A1: 18-27°C inlet, 8-60% RH, ΔT guidelines'],
                    ['NFPA 75', 'IT Equipment', 'Fire protection, electrical, ventilation for IT spaces'],
                    ['NFPA 76', 'Telecom Facilities', 'Fire protection for telecom central offices / data centers'],
                    ['SOC 2 Type II', 'Security Audit', 'Trust service criteria: security, availability, privacy'],
                ]} />
            </S>
            <S n={2} t="High-Level Design" id="hld">
                <Ascii>{`┌─── UTILITY POWER (2N) ────────────────────────────────┐
│ Dual utility feeds (diverse substations) → Main switchgear│
│ → ATS (utility ↔ generator) → UPS A + UPS B (2N)         │
│ → STS (static transfer switch) → PDU A + PDU B → Racks   │
├─── GENERATORS (N+1) ─────────────────────────────────┤
│ 2-3 MW diesel generators × 4-8 → paralleling switchgear  │
│ → 48-72 hr fuel storage → auto-start on utility loss      │
├─── UPS (2N) ──────────────────────────────────────────┤
│ A-side: 750-2500 kVA static UPS + battery (10-15 min)     │
│ B-side: 750-2500 kVA static UPS + battery (10-15 min)     │
│ Li-ion or VRLA, rotary flywheel option for bridging        │
├─── WHITE SPACE (DATA HALLS) ─────────────────────────┤
│ Hot/cold aisle containment │ 6-15 kW/rack typical         │
│ Rack PDU (metered or switched) │ A+B power whips          │
│ Spine-leaf fabric: 400GE spine → 100GE leaf (ToR)         │
│ Structured cabling: OM4 MMF, OS2 SMF, Cat6A copper        │
├─── COOLING (N+1) ────────────────────────────────────┤
│ Chiller plant (centrifugal/screw, 500-2000 ton)           │
│ → Chilled water loop → CRAH (computer room air handler)   │
│ → Raised floor or overhead ducting → Cold aisle supply     │
│ Free cooling (economizer) when OAT < 13°C                 │
│ PUE target: 1.2-1.4 (with free cooling: <1.2)            │
├─── MEET-ME ROOM / INTERCONNECT ──────────────────────┤
│ Carrier cross-connects (SMF patch panels) │ MMR A+B       │
│ IXP presence │ Cloud on-ramps │ IX peering fabric          │
└────────────────────────────────────────────────────────┘`}</Ascii>
            </S>
            <S n={3} t="Detailed Technical Description" id="tech">
                <H4>3.1 Electrical Distribution (2N)</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Medium Voltage Switchgear', '15 kV, metal-clad', 'Dual bus, ANSI C37, vacuum/SF₆ breakers'],
                    ['Step-Down Transformer', '15 kV → 480V', '2-3 MVA, dry-type, K-rated, N+1'],
                    ['Diesel Generator', 'Caterpillar/MTU/Cummins', '2-3 MW each, N+1, auto-parallel, 72 hr fuel'],
                    ['Static UPS', 'Vertiv/Eaton/Schneider', '750-2500 kVA, double conversion, 98% efficiency'],
                    ['Battery System', 'Li-ion (LFP) / VRLA', '10-15 min runtime, temp controlled, BMS monitored'],
                    ['PDU (floor-standing)', 'Vertiv/Raritan', '100-225 kVA, 208/120 VAC, branch monitoring, A+B feed'],
                    ['Rack PDU', 'Vertiv/APC/Raritan', '30A/60A, metered/switched, remote outlet control, SNMP'],
                    ['STS', 'Static Transfer Switch', 'Vertiv/ABB, <4 ms transfer, 480V, 100-400A'],
                ]} />
                <H4>3.2 Cooling Plant</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Chiller (centrifugal)', 'Trane/Carrier/York', '500-2000 ton, variable speed, R-134a/HFO-1234ze'],
                    ['Cooling Tower (evap.)', 'BAC/Marley', 'Counterflow, 500-1500 ton, VFD fans, water treatment'],
                    ['CRAH', 'Vertiv/Schneider', '30-100 kW, chilled water, EC fans, N+1'],
                    ['In-Row Cooling', 'Vertiv Liebert CRV', '30-50 kW, hot aisle containment, close-coupled'],
                    ['Liquid Cooling (DLC)', 'CoolIT/ZutaCore', 'Direct-to-chip, CDU, 50-100 kW/rack for GPU/AI'],
                    ['Free Cooling', 'Air-side/water-side', 'Economizer, OAT < 13°C, PUE reduction 0.1-0.3'],
                ]} />
                <H4>3.3 Network Infrastructure</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Spine Switch', 'Arista 7800R/Cisco 8000', '400GE, 64-port, EVPN-VxLAN, SONiC/EOS/NX-OS'],
                    ['Leaf Switch (ToR)', 'Arista 7050/Cisco Nexus', '48× 25/100GE, 8× 400GE uplink, L2/L3'],
                    ['Core Router', 'Juniper MX/Cisco NCS', 'BGP, MPLS, peering, internet transit, 100GE'],
                    ['ODF/Patch Panel', 'Corning/CommScope', 'LC/MPO, OM4/OS2, MTP trunk, structured cabling'],
                    ['Cross-Connect', 'Equinix Fabric/CoreSite', 'Carrier patch, dark fiber, wave service, cloud on-ramp'],
                ]} />
                <H4>3.4 Monitoring &amp; Management</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['DCIM', 'Nlyte/Sunbird/Schneider', 'Capacity planning, PUE monitoring, asset tracking'],
                    ['BMS', 'Schneider/Honeywell/JCI', 'HVAC, lighting, leak detection, BACnet/IP'],
                    ['Environmental Sensor', 'APC NetBotz/Geist', 'Temp, humidity, leak, airflow, door, per rack'],
                    ['CCTV/Access', 'Genetec/Lenel', 'IP cameras, badge, biometric, mantrap, 90-day retention'],
                    ['IPMI/BMC', 'iDRAC/iLO/BMC', 'Out-of-band management, serial-over-LAN, Redfish API'],
                ]} />
            </S>
            <S n={4} t="Process Diagrams" id="process">
                <H4>4.1 Power Path (2N)</H4>
                <Ascii>{`Utility A ──► Switchgear A ──► ATS A ──► UPS A ──► PDU A ──► Rack A feed
Utility B ──► Switchgear B ──► ATS B ──► UPS B ──► PDU B ──► Rack B feed
Generator A ──►────(parallel)─► ATS A (on utility fail)
Generator B ──►────(parallel)─► ATS B
Both feeds to server: dual PSU → auto-failover (< 4 ms via STS)`}</Ascii>
                <H4>4.2 Cooling Flow</H4>
                <Ascii>{`Server exhaust (hot aisle, 35-45°C) → Containment ceiling
→ CRAH return (chilled water coil, 7-12°C supply)
→ Raised floor / overhead duct → Cold aisle supply (18-27°C)
→ Server inlet → repeat
Chilled water loop: CRAH → Chiller plant → Cooling tower
Free cooling: bypass chiller when OAT < 13°C`}</Ascii>
                <H4>4.3 Cross-Connect Provisioning</H4>
                <Ascii>{`Customer request → MMR patch panel assignment → LOA/CFA letter
→ Technician install SMF/MMF jumper → Test (OTDR, insertion loss)
→ Carrier/customer handoff → Circuit ID → Billing → Active
Types: fiber (SMF/MMF), copper (Cat6A), coax, wave service`}</Ascii>
            </S>
            <S n={5} t="Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2 italic">Tier III colocation facility, 10 MW critical load, 2,000 racks</p>
                <Tbl heads={['Equipment', 'Qty', 'Specification']} rows={[
                    ['Diesel Generator', '6-8', '2-3 MW each, N+1, 72 hr fuel, parallel'],
                    ['MV Switchgear', '4', '15 kV, dual bus, vacuum breakers'],
                    ['Transformer (MV→LV)', '4-6', '2-3 MVA, dry-type, K-rated'],
                    ['Static UPS', '4-8', '1000-2500 kVA, 2N, Li-ion/VRLA, 15 min'],
                    ['STS', '8-16', '480V, 100-400A, <4 ms transfer'],
                    ['Floor PDU', '100-200', '100-225 kVA, A+B, branch monitoring'],
                    ['Rack PDU', '4,000+', '30A/60A, metered/switched, SNMP'],
                    ['Chiller', '4-6', '1000-2000 ton, centrifugal, VSD'],
                    ['Cooling Tower', '4-6', '1000 ton, counterflow, VFD, water treatment'],
                    ['CRAH/In-Row', '200-400', '30-100 kW each, N+1, EC fans'],
                    ['Spine Switch', '8-16', '400GE, 64-port, EVPN fabric'],
                    ['Leaf Switch (ToR)', '200-400', '48×100GE, per row, L2/L3'],
                    ['Core Router', '4', '100GE, BGP, MPLS, peering'],
                    ['ODF/Patch Panel', '500+', 'LC/MPO, OM4/OS2, structured cabling'],
                    ['Cabinet (42U)', '2,000', '19″, 600×1200 mm, perforated, A+B power'],
                    ['Fire Suppression', '1 per hall', 'NFPA 2001, clean agent, VESDA'],
                    ['DCIM', '1', 'Nlyte/Sunbird, asset/capacity/PUE'],
                    ['BMS', '1', 'Schneider EcoStruxure, BACnet/IP'],
                    ['CCTV/Access', '1', '500+ cameras, badge, mantrap, biometric'],
                    ['Environmental Sensor', '2,000+', 'Per-rack temp/humidity, leak, door'],
                ]} />
            </S>
            <S n={6} t="Purdue Model / ISA-95 Mapping" id="purdue">
                <Tbl heads={['Level', 'Function', 'Components', 'Protocols']} rows={[
                    ['L0', 'Sensing', 'Temp, humidity, PDU current, UPS status, leak, airflow', 'Analog, ModBus, SNMP traps, BACnet'],
                    ['L1', 'Control', 'UPS, PDU, CRAH, chiller, ATS, fire panel', 'ModBus RTU/TCP, BACnet/IP, SNMP'],
                    ['L2', 'Supervisory', 'DCIM, BMS, power monitoring, PUE dashboard', 'SNMP v3, BACnet, Redfish, web GUI'],
                    ['L3', 'Operations', 'NOC, capacity planning, helpdesk, change mgmt', 'REST, TicketAPI, Kafka, MQTT'],
                    ['L3.5', 'DMZ', 'NGFW, WAF, IDS/IPS, SIEM, jump hosts', 'TLS, IPsec, SSH, 802.1X, RADIUS'],
                    ['L4', 'Enterprise', 'Customer portal, billing, SLA reporting, provisioning', 'HTTPS, REST, GraphQL, SAML/OIDC'],
                ]} />
            </S>
            <S n={7} t="Safety &amp; Supporting Systems" id="safety">
                <Tbl heads={['System', 'Standard', 'Specification']} rows={[
                    ['Fire Suppression', 'NFPA 2001/75/76', 'Clean agent (FM-200/Novec 1230), VESDA, double interlock'],
                    ['Fire Detection', 'NFPA 72', 'VESDA (very early smoke), beam detectors, sub-floor'],
                    ['Physical Security', 'SOC 2 / ISO 27001', 'Mantrap, biometric, badge, escort policy, 90-day CCTV'],
                    ['Water Leak', 'ASHRAE', 'Cable-style sensors under raised floor, drip pans, alarm'],
                    ['Battery Safety', 'NFPA 855 (ESS)', 'Li-ion: thermal runaway suppression, gas detection, BMS'],
                    ['Diesel Fuel', 'EPA SPCC', 'Double-wall tank, spill prevent, DEF for Tier 4 engines'],
                ]} />
            </S>
            <S n={8} t="Communication Protocol Stack" id="protocols">
                <Ascii>{`Enterprise:  Customer portal │ Billing │ SLA reports │ SAML/OIDC
Application: DCIM (REST/SNMP) │ BMS (BACnet) │ IPMI/Redfish │ SNMP v3
Transport:   IP/MPLS │ VxLAN │ EVPN │ BGP │ OSPF/IS-IS
Network:     IPv4/v6 │ VLAN/VXLAN │ Segment Routing │ ECMP
Data Link:   400GE/100GE/25GE │ InfiniBand (HDR/NDR for AI)
Physical:    OS2 SMF │ OM4 MMF │ Cat6A │ MPO/MTP trunks │ DAC/AOC`}</Ascii>
            </S>
            <S n={9} t="Data Flow Architecture" id="data-flow">
                <Ascii>{`Facility (L0)       Infrastructure (L1)    Operations (L2)
Temp/humidity────►BMS──BACnet────────►DCIM dashboard (PUE)
PDU metering─────►PDU controller─────►Power monitoring (kWh)
UPS status───────►UPS controller─────►NOC alarm (battery %)
CRAH airflow─────►VFD/PLC────────────►Cooling optimization

Network (L1-L2)              Enterprise (L4)
Spine-leaf fabric─EVPN──────►Customer VM/container workloads
Core router──BGP──────────►Internet/peering/cloud on-ramp
MMR cross-connect──────────►Carrier/CDN interconnect

Operations (L3)
DCIM capacity──►Provisioning──►Customer portal──►Billing`}</Ascii>
            </S>
            <S n={10} t="References" id="references">
                <Refs items={[
                    'TIA. (2017). TIA-942-B: Telecommunications Infrastructure Standard for Data Centers. TIA.',
                    'Uptime Institute. (2023). Tier Standard: Topology & Operational Sustainability. Uptime.',
                    'ASHRAE. (2021). TC 9.9: Thermal Guidelines for Data Processing Environments, 5th Ed. ASHRAE.',
                    'NFPA. (2023). NFPA 75: Standard for Fire Protection of IT Equipment. NFPA.',
                    'NFPA. (2023). NFPA 76: Standard for Fire Protection of Telecommunications Facilities. NFPA.',
                    'Turner, W.P., et al. (2008). Tier Classifications Define Site Infrastructure Performance. Uptime Institute.',
                    'The Open Group. (2022). TOGAF Standard, Version 10.',
                    'NIST. (2023). SP 800-53r5: Security and Privacy Controls. NIST.',
                ]} />
            </S>
            <SeeAlso links={[
                { href: '/wiki/communications', label: 'Communications Hub', color: '#3B82F6' },
                { href: '/wiki/sectors/COMU', label: 'Sector Overview', color: '#3B82F6' },
                { href: '/wiki/communications/central-office', label: 'Central Office / IXP', color: '#3B82F6' },
            ]} />
        </div>
    );
}
function S({ n, t, id, children }: { n: number; t: string; id: string; children: React.ReactNode }) {
    return (<section id={id} className="space-y-4"><h2 className="text-lg font-heading font-semibold text-white"><span className="text-[#10B981] mr-2">{n}.</span>{t}</h2>{children}</section>);
}
function H4({ children }: { children: React.ReactNode }) { return <h4 className="text-sm font-semibold text-gray-200 mt-4 mb-2">{children}</h4>; }
function Tbl({ heads, rows }: { heads: string[]; rows: string[][] }) {
    return (<div className="overflow-x-auto"><table className="w-full text-xs border-collapse"><thead><tr className="border-b border-white/[0.08] text-gray-500">{heads.map(h => <th key={h} className="text-left px-3 py-2 font-medium">{h}</th>)}</tr></thead><tbody>{rows.map((r, i) => <tr key={i} className="border-b border-white/[0.04] hover:bg-white/[0.02]">{r.map((c, j) => <td key={j} className={`px-3 py-2 ${j === 0 ? 'text-gray-300 font-medium' : 'text-gray-400'}`}>{c}</td>)}</tr>)}</tbody></table></div>);
}
function Ascii({ children }: { children: string }) {
    return (<div className="rounded-lg border border-white/[0.06] p-4 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}><pre className="whitespace-pre leading-relaxed">{children}</pre></div>);
}
function Refs({ items }: { items: string[] }) { return (<div className="space-y-2 text-xs text-gray-400 leading-relaxed">{items.map((item, i) => <p key={i}>{item}</p>)}</div>); }
function SeeAlso({ links }: { links: { href: string; label: string; color: string }[] }) {
    return (<section className="space-y-3"><h2 className="text-lg font-heading font-semibold text-white">See Also</h2><div className="flex flex-wrap gap-2">{links.map(l => <a key={l.href} href={l.href} className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-white/[0.04]" style={{ borderColor: `${l.color}30`, color: l.color }}>{l.label} &rarr;</a>)}</div></section>);
}
