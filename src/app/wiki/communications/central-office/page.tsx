/**
 * Central Office / Internet Exchange Point Deep-Dive Reference Architecture.
 * DWDM/ROADM transport, OLT for FTTx, -48 VDC power plant, BGP peering.
 * @module wiki/communications/central-office/page
 */
export const metadata = {
    title: 'Central Office / IXP — Communications Wiki',
    description: 'TOGAF reference architecture for telecom central offices and internet exchange points: DWDM/ROADM optical transport, OLT for FTTH, core/edge routers, -48 VDC power plant, BGP peering fabric.',
};
export default function CentralOfficePage() {
    return (
        <div className="max-w-5xl space-y-10">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)' }}>🏢</div>
                    <div>
                        <span className="text-[10px] text-gray-500 font-mono block">COMU-WR-CO</span>
                        <h1 className="text-2xl font-heading font-bold text-white">Central Office / Internet Exchange Point Reference Architecture</h1>
                    </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">TOGAF-based reference architecture for telecom central offices and IXPs, covering MDF/ODF cable termination, DWDM/ROADM optical transport (88–96 channels × 100–400 Gbps), GPON/XGS-PON OLT for FTTx, core/edge routers (Cisco NCS/Juniper MX/Nokia 7750), -48 VDC power plant with rectifiers and VRLA/Li-ion batteries, and BGP/EVPN peering fabric — governed by Telcordia GR-63/GR-1089, TIA-942, and NIST SP 800-82.</p>
            </div>
            <S n={1} t="TOGAF Business Architecture" id="togaf">
                <H4>Stakeholder Map</H4>
                <Tbl heads={['Stakeholder', 'Role', 'Interest']} rows={[
                    ['ILECs/CLECs', 'Owner/Operator', 'AT&T, Verizon, Lumen (CenturyLink), Frontier, Windstream'],
                    ['IXP Operators', 'Peering', 'Equinix, DE-CIX, AMS-IX, LINX, CoreSite'],
                    ['FCC', 'Regulatory', '47 USC, CALEA compliance, USF, E-rate, 911 reliability'],
                    ['DHS/CISA', 'SRMA', 'Communications sector security, ECC, NRIC recommendations'],
                    ['ATIS/TIA', 'Standards', 'ATIS-0300xxx, TIA-568/942, cabling/data center standards'],
                    ['Equipment OEMs', 'Supplier', 'Ciena, Nokia, Juniper, Cisco, Calix, Adtran, Infinera'],
                    ['ISPs/CDNs', 'Tenant/Peer', 'Content providers, transit networks, peering partners'],
                    ['NTIA', 'Spectrum/Policy', 'Broadband grants (BEAD), spectrum coordination'],
                ]} />
                <H4>Regulatory Framework</H4>
                <Tbl heads={['Standard', 'Title', 'Scope']} rows={[
                    ['Telcordia GR-63', 'NEBS Requirements', 'Earthquake, fire, airborne contaminants, temperature'],
                    ['Telcordia GR-1089', 'EMC and Safety', 'Grounding, bonding, surge, DC power'],
                    ['TIA-942-B', 'Data Center Standard', 'Space planning, cabling, redundancy tiers'],
                    ['47 USC §251/252', 'Interconnection', 'CLEC co-location, number portability, access'],
                    ['CALEA (47 USC §1002)', 'Lawful Intercept', 'Wiretap capability, J-STD-025'],
                    ['FCC Part 68', 'Terminal Equipment', 'CPE connection to PSTN, registration'],
                    ['NIST SP 800-82', 'OT Security', 'ICS/SCADA security for telecom infrastructure'],
                ]} />
            </S>
            <S n={2} t="High-Level Design" id="hld">
                <Ascii>{`┌─── OUTSIDE PLANT ──────────────────────────────────────┐
│ Copper (Cat 3/5e) ─┬─► MDF ──────► DSL/VDSL2 DSLAM     │
│ Fiber (SMF-28e+) ──┴─► ODF ──┬──► GPON/XGS-PON OLT     │
│                              └──► DWDM/ROADM mux demux  │
├─── TRANSPORT LAYER ───────────────────────────────────┤
│ DWDM/ROADM (Ciena 6500/Waveserver) 96λ × 400G          │
│ ──► OTN switching ──► MPLS/SR core/edge routers          │
│ Juniper MX/PTX │ Cisco NCS 5500 │ Nokia 7750 SR          │
├─── PEERING / IXP ─────────────────────────────────────┤
│ Route servers (BIRD/OpenBGPd) │ Peering fabric (100GE)   │
│ BGP (IPv4/v6) │ RPKI/IRR │ PeeringDB │ IXP LAN          │
├─── POWER PLANT ───────────────────────────────────────┤
│ Utility feed → ATS → -48 VDC rectifiers → Battery bank  │
│ string → Distribution BDFB → Equipment racks              │
│ Diesel generators (N+1) → 8-72 hr fuel autonomy          │
├─── COOLING ───────────────────────────────────────────┤
│ CRAC/CRAH (N+1) │ Precision cooling │ Hot/cold aisle     │
│ Free cooling (economizer) when ambient < 18°C             │
└────────────────────────────────────────────────────────┘`}</Ascii>
            </S>
            <S n={3} t="Detailed Technical Description" id="tech">
                <H4>3.1 Outside Plant &amp; MDF/ODF</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Main Distribution Frame', 'Copper termination', 'ADC/CommScope, 10,000-100,000 pairs, 110 punchdown'],
                    ['Optical Distribution Frame', 'Fiber termination', 'Corning/TE, 1,000-20,000 SC/LC ports, splice trays'],
                    ['Fiber Cable', 'OS2 single-mode', 'SMF-28e+, 144-864 fibers, loose tube, armored'],
                    ['Copper Cable', 'Cat 3/5e', '22-26 AWG, 25-pair binder groups, USOC RJ-21'],
                    ['Splice Enclosure', 'Aerial/underground', 'Dome/in-line, 96-576 fibers, gel-sealed'],
                ]} />
                <H4>3.2 DWDM / ROADM Optical Transport</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['DWDM Platform', 'Ciena 6500 / Waveserver 5', '96λ C-band, 400G/800G coherent, 100 km+ span'],
                    ['ROADM', 'Ciena / Infinera XTM', 'CDC (colorless-directionless-contentionless), 8-degree'],
                    ['Optical Amplifier', 'EDFA, Raman', '17-23 dBm output, 100 km span budget, pre/post/inline'],
                    ['Transponder', 'Coherent 400G/800G', 'DP-16QAM, 75 GHz flex-grid, SD-FEC, 60+ dB OSNR'],
                    ['OTN Switch', 'Ciena 6500 T-Series', 'ODU0-ODUflex, 100G client, GMPLS/WSON control'],
                ]} />
                <H4>3.3 Core / Edge Routing</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Core Router', 'Juniper PTX10008', '64× 400GE, segment routing, EVPN, 25.6 Tbps'],
                    ['Edge Router', 'Cisco NCS 5500/5700', '24× 100GE, BGP, MPLS L3VPN, BNG, 2 Tbps'],
                    ['Aggregation', 'Nokia 7750 SR-1s', '36× 100GE, VPRN, QoS, CGNAT, 3.6 Tbps'],
                    ['Route Server (IXP)', 'BIRD / OpenBGPd', 'Linux, 1,000+ peers, RPKI validation, looking glass'],
                    ['Peering Switch', 'Arista 7280R3', '48× 100GE, L2, low latency, IXP fabric'],
                ]} />
                <H4>3.4 Access — OLT / DSLAM</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['GPON OLT', 'Calix E9-2 / Nokia 7360', '16-port, 2.5G/1.25G, 1:64 split, 20 km reach'],
                    ['XGS-PON OLT', 'Nokia/Adtran', '10G symmetric, coexistence with GPON, 20 km'],
                    ['25G-PON (future)', 'ITU-T G.9804.x', '25G/50G, TDM-PON, coherent optics, 40 km'],
                    ['DSLAM', 'Calix C7 / Adtran TA5000', 'VDSL2 vectoring, 100+ Mbps, bonded, legacy copper'],
                    ['Splitter Cabinet', 'ODF, 1:32/1:64', 'Passive, outdoor/indoor, SC/APC connectors'],
                ]} />
                <H4>3.5 Power Plant (-48 VDC)</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Rectifier Shelf', 'Eltek/Vertiv/Delta', '-48 VDC, 10-100 A per module, N+1, hot-swap'],
                    ['Battery Bank', 'VRLA / Li-ion (LFP)', '4-8 hr reserve, 2-4 strings, 24-cell series'],
                    ['BDFB', 'Battery Distribution', 'Fuse panel, -48 VDC distribution, alarm monitoring'],
                    ['Diesel Generator', 'Caterpillar/Cummins', '100-500 kW, auto-start, 72 hr fuel tank, N+1'],
                    ['ATS', 'Automatic Transfer Switch', 'Utility ↔ generator, make-before-break, bypass'],
                    ['Inverter', 'DC-AC', '120/240 VAC from -48 VDC, for AC loads, UPS grade'],
                ]} />
            </S>
            <S n={4} t="Process Diagrams" id="process">
                <H4>4.1 Subscriber Provisioning Flow</H4>
                <Ascii>{`OSS order → OLT port assignment → Splitter path verified
→ ONT activation (serial, OMCI) → VLAN provisioning
→ DHCP/PPPoE session → Speed profile → QoS policy
→ IPTV multicast join → Voice SIP registration → Live`}</Ascii>
                <H4>4.2 Optical Transport Path</H4>
                <Ascii>{`Client signal (100GE/400GE) → OTN framing (ODU4/ODUflex)
→ Coherent transponder (DP-16QAM) → DWDM mux (flex-grid)
→ ROADM add → EDFA amplification → Fiber span (80-100 km)
→ ROADM drop → Coherent Rx → OTN de-frame → Client`}</Ascii>
                <H4>4.3 BGP Peering (IXP)</H4>
                <Ascii>{`Member router → IXP peering LAN (100GE) → Route server
→ BGP OPEN/UPDATE → RPKI validation (VRP) → Best path
→ Bilateral peering (direct) + multilateral (RS) → Traffic
→ NetFlow/sFlow → billing/analytics → PeeringDB update`}</Ascii>
            </S>
            <S n={5} t="Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2 italic">Medium central office (20,000+ subscribers, IXP peering)</p>
                <Tbl heads={['Equipment', 'Qty', 'Specification']} rows={[
                    ['ODF (fiber termination)', '4-8', '1,000-5,000 SC/LC ports per frame'],
                    ['MDF (copper)', '2-4', '10,000-50,000 pairs, legacy'],
                    ['DWDM/ROADM', '2-4', 'Ciena 6500, 96λ × 400G, 8-degree'],
                    ['EDFA Amplifiers', '8-16', '17-23 dBm, per span, inline/booster'],
                    ['Core Routers', '2-4', 'Juniper PTX, 64× 400GE, SR/EVPN'],
                    ['Edge Routers', '4-8', 'Cisco NCS 5500, 24× 100GE, CGNAT'],
                    ['GPON/XGS-PON OLT', '4-8', 'Calix E9-2, 16-port, 10G symmetric'],
                    ['DSLAM (legacy)', '2-4', 'Calix C7, VDSL2 vectoring'],
                    ['IXP Peering Switch', '2', 'Arista 7280R3, 48× 100GE, L2'],
                    ['Rectifier Shelf', '4-8', '-48 VDC, 100 A/module, N+1'],
                    ['Battery Bank', '4-8 strings', 'VRLA/Li-ion, 4-8 hr reserve'],
                    ['Diesel Generator', '2-3', '200-500 kW, N+1, 72 hr fuel'],
                    ['ATS', '2', 'Utility/gen switchover, bypass'],
                    ['CRAC/CRAH', '4-8', '30-100 kW each, N+1, precision'],
                    ['Chiller', '2-3', '100-300 ton, glycol, economizer'],
                    ['Fire Suppression', '1', 'NFPA 76, clean agent (FM-200/Novec)'],
                    ['Cable Tray/Ladder', '100+ m', 'Overhead, fiber/copper segregation'],
                    ['NMS/EMS Server', '2-4', 'Ciena MCP, Nokia NSP, Juniper Paragon'],
                    ['Environmental Monitor', '1', 'Temp, humidity, water leak, door contact'],
                    ['Physical Security', '1', 'Badge access, CCTV, mantrap, biometric'],
                ]} />
            </S>
            <S n={6} t="Purdue Model / ISA-95 Mapping" id="purdue">
                <Tbl heads={['Level', 'Function', 'Components', 'Protocols']} rows={[
                    ['L0', 'Sensing', 'SFP power, BER, fiber temp, battery voltage, CRAC temp', 'Analog, I²C, RS-485, SNMP traps'],
                    ['L1', 'Control', 'DWDM/ROADM controller, OLT line card, router line card', 'GMPLS/WSON, OMCI, TL1'],
                    ['L2', 'Supervisory', 'NMS (Ciena MCP), EMS (Nokia NSP), OLT manager', 'NETCONF/YANG, SNMP v3, gRPC'],
                    ['L3', 'Operations', 'OSS/BSS, provisioning, trouble ticketing, NOC', 'TM Forum APIs, REST, MQTT, syslog'],
                    ['L3.5', 'DMZ', 'Jump host, NGFW, IDS/IPS, log collector', 'TLS 1.3, SSH, IPsec VPN'],
                    ['L4', 'Enterprise', 'CRM, billing, subscriber portal, regulatory reporting', 'REST/GraphQL, HTTPS, EDI'],
                ]} />
            </S>
            <S n={7} t="Safety &amp; Supporting Systems" id="safety">
                <Tbl heads={['System', 'Standard', 'Specification']} rows={[
                    ['NEBS Compliance', 'Telcordia GR-63', 'Zone 4 seismic, fire spread test, airborne contaminants'],
                    ['Fire Suppression', 'NFPA 76', 'Clean agent (FM-200/Novec 1230), VESDA early warning'],
                    ['Grounding/Bonding', 'Telcordia GR-1089', 'Master ground bar, <5Ω, telecom bonding backbone'],
                    ['Battery Room', 'OSHA 1910.305', 'Hydrogen ventilation, eye wash, spill containment'],
                    ['Diesel Fuel', 'EPA SPCC', 'Double-wall tank, spill prevent, leak detection'],
                    ['Physical Security', 'NERC CIP if applicable', 'Mantrap, badge, CCTV, 24/7 NOC monitoring'],
                ]} />
            </S>
            <S n={8} t="Communication Protocol Stack" id="protocols">
                <Ascii>{`Enterprise:  CRM/Billing │ OSS/BSS │ TM Forum APIs │ REST/GraphQL
Application: NETCONF/YANG │ gRPC │ SNMP v3 │ syslog │ NetFlow
Transport:   MPLS/SR │ GTP │ IPsec │ TLS 1.3 │ SSH
Network:     BGP │ OSPF/IS-IS │ EVPN │ VxLAN │ RPKI
Data Link:   100GE/400GE │ DWDM/OTN (ODU4/flex) │ GPON/XGS-PON
Physical:    SMF-28e+ │ G.652.D │ Cat 3/5e copper │ SC/LC/MPO`}</Ascii>
            </S>
            <S n={9} t="Data Flow Architecture" id="data-flow">
                <Ascii>{`Field (L0)          Control (L1)       NMS (L2)
SFP Rx power──────►ROADM ctrl──GMPLS─►Ciena MCP (λ inventory)
OLT PON port──────►OLT card──OMCI───►Nokia NSP (subscriber mgr)
Router interface──►Line card──IS-IS─►Juniper Paragon (topology)
Battery V/A───────►Rectifier ctrl───►Power plant alarm dashboard
                                      │ L3.5 DMZ
Operations (L3)         Enterprise (L4)
OSS (provisioning)◄─REST──►CRM/billing
NOC (trouble ticket)◄─syslog►Subscriber self-service
Network planning◄─NetFlow──►Usage analytics`}</Ascii>
            </S>
            <S n={10} t="References" id="references">
                <Refs items={[
                    'Telcordia. (2017). GR-63-CORE: NEBS Requirements for Telecom Equipment. Telcordia/Ericsson.',
                    'Telcordia. (2017). GR-1089-CORE: EMC and Electrical Safety. Telcordia/Ericsson.',
                    'TIA. (2017). TIA-942-B: Telecommunications Infrastructure Standard for Data Centers. TIA.',
                    'ITU-T. (2020). G.698.2: Multichannel DWDM Applications. ITU.',
                    'ITU-T. (2016). G.984.x (GPON) and G.9807.x (XGS-PON) Series. ITU.',
                    'IETF. (2006). RFC 4271: A Border Gateway Protocol 4 (BGP-4). IETF.',
                    'The Open Group. (2022). TOGAF Standard, Version 10.',
                    'NIST. (2023). SP 800-82r3: Guide to OT Security. NIST.',
                ]} />
            </S>
            <SeeAlso links={[
                { href: '/wiki/communications', label: 'Communications Hub', color: '#3B82F6' },
                { href: '/wiki/sectors/COMU', label: 'Sector Overview', color: '#3B82F6' },
                { href: '/wiki/communications/data-center', label: 'Telecom Data Center', color: '#10B981' },
            ]} />
        </div>
    );
}
function S({ n, t, id, children }: { n: number; t: string; id: string; children: React.ReactNode }) {
    return (<section id={id} className="space-y-4"><h2 className="text-lg font-heading font-semibold text-white"><span className="text-[#3B82F6] mr-2">{n}.</span>{t}</h2>{children}</section>);
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
