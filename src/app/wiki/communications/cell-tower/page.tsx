/**
 * Cell Tower / 5G Base Station Site Deep-Dive Reference Architecture.
 * Massive MIMO, RRU/BBU, O-RAN, eCPRI fronthaul, 4G/5G co-site.
 * @module wiki/communications/cell-tower/page
 */
export const metadata = {
    title: 'Cell Tower / 5G Site — Communications Wiki',
    description: 'TOGAF reference architecture for cell tower sites: massive MIMO 64T64R antennas, RRU/BBU disaggregated architecture, O-RAN (O-RU/O-DU/O-CU/RIC), eCPRI fronthaul, 4G LTE / 5G NR co-site, battery backup, microwave/fiber backhaul.',
};
export default function CellTowerPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #06B6D4, #0891B2)' }}>📡</div>
                    <div>
                        <span className="text-[10px] text-gray-500 font-mono block">COMU-WL-CELL</span>
                        <h1 className="text-2xl font-heading font-bold text-white">Cell Tower / 5G Base Station Site Reference Architecture</h1>
                    </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">TOGAF-based reference architecture for macro cell sites covering massive MIMO 64T64R antennas (600 MHz – 39 GHz), remote radio units (Ericsson AIR 6449 / Nokia AirScale / Samsung), baseband processing (BBU/DU/CU disaggregation per O-RAN), eCPRI fronthaul over 25G fiber, 4G LTE / 5G NR co-existence, -48 VDC power with 8-hr battery backup, and fiber/microwave backhaul — governed by FCC Part 22/24/27, 3GPP TS 38.401, and O-RAN Alliance specifications.</p>
            </div>
            <S n={1} t="TOGAF Business Architecture" id="togaf">
                <H4>Stakeholder Map</H4>
                <Tbl heads={['Stakeholder', 'Role', 'Interest']} rows={[
                    ['MNOs', 'Owner/Operator', 'AT&T, T-Mobile, Verizon, Dish (5G), regional carriers'],
                    ['Tower Companies', 'Infrastructure', 'American Tower, Crown Castle, SBA Communications, Uniti'],
                    ['FCC', 'Regulatory', 'Spectrum licensing, RF exposure (OET-65), SHPO/NEPA'],
                    ['FAA', 'Aviation Safety', 'Part 77 obstruction, tower marking & lighting (AC 70/7460)'],
                    ['3GPP', 'Standards', 'TS 38.xxx (5G NR), TS 36.xxx (LTE), architecture'],
                    ['O-RAN Alliance', 'Open Standards', 'O-RU/O-DU/O-CU, RIC, SMO, open fronthaul'],
                    ['Equipment OEMs', 'Supplier', 'Ericsson, Nokia, Samsung, Mavenir, Airspan, CommScope'],
                    ['NTIA', 'Spectrum Policy', 'CBRS (3.5 GHz), C-band auction, spectrum sharing'],
                ]} />
                <H4>Regulatory Framework</H4>
                <Tbl heads={['Standard', 'Title', 'Scope']} rows={[
                    ['FCC 47 CFR Part 24/27', 'PCS / AWS Licensing', 'Spectrum, power limits, interference, coverage obligations'],
                    ['FCC OET-65', 'RF Exposure', 'MPE limits, controlled/uncontrolled, exclusion zones'],
                    ['FAA AC 70/7460-1M', 'Obstruction Marking', 'Tower lighting (red/white), painting, 200 ft+ AGL'],
                    ['3GPP TS 38.401', 'NG-RAN Architecture', 'gNB, CU/DU split, F1/E1 interfaces, 5GC connectivity'],
                    ['TIA-222-H', 'Structural Standard', 'Tower design loads (wind, ice, seismic), maintenance'],
                    ['Motorola R56', 'Grounding Standard', 'Site grounding, lightning protection, bonding, surge'],
                    ['OSHA 1926.502', 'Fall Protection', 'Tower climbing, 100% tie-off, rescue plan'],
                ]} />
            </S>
            <S n={2} t="High-Level Design" id="hld">
                <Ascii>{`┌─── TOWER / STRUCTURE ──────────────────────────────────┐
│ Self-supporting lattice │ Monopole │ Guyed tower          │
│ Height: 30–180 m │ 3 sectors × 3 bands per MNO            │
│                                                           │
│ ┌─[SECTOR α 0°]──────────────────────────────────┐       │
│ │ mMIMO antenna (64T64R) ← coax/fiber → RRU/O-RU │       │
│ │ Band: n77 (3.5 GHz) + n71 (600 MHz) + n261 (28)│       │
│ └────────────────────────────────────────────────┘        │
│  (× 3 sectors = 9 RRUs typical, 4G+5G co-site)           │
├─── GROUND SHELTER / CABINET ──────────────────────────┤
│ BBU/DU: Ericsson Baseband 6630 │ Nokia AirScale BTS      │
│ CU: centralized or co-located │ MEC: edge compute         │
│ Router: Cisco ASR 920 / Nokia 7705 SAR (backhaul)         │
│ Power: -48 VDC rectifier + battery (4-8 hr) + ATS         │
├─── BACKHAUL / FRONTHAUL ──────────────────────────────┤
│ Fiber: dark fiber 10G/25G (eCPRI fronthaul + IP backhaul) │
│ Microwave: 6-42 GHz (500 Mbps-2 Gbps, 10-50 km)         │
│ E-band: 70-80 GHz (10 Gbps, 1-5 km, LOS)                │
└────────────────────────────────────────────────────────┘`}</Ascii>
            </S>
            <S n={3} t="Detailed Technical Description" id="tech">
                <H4>3.1 Antenna &amp; RF</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['mMIMO Antenna', 'Ericsson AIR 6449', '64T64R, 3.4-3.8 GHz, 200W/carrier, 25 dBi, beamforming'],
                    ['Low-Band Antenna', 'CommScope/RFS', '4T4R, 600-900 MHz, 17 dBi, 65° HPBW, 2.4 m'],
                    ['mmWave Module', 'Samsung/Ericsson AIR 5322', '28/39 GHz, 256 elements, 12 dBi, AAS integrated'],
                    ['RRU', 'Ericsson Radio 4449/Nokia ABIA', '20W per carrier, O-RAN O-RU, eCPRI 25G SFP28'],
                    ['Tower-Mount Amplifier', 'Commscope/Kaelus', 'Low-noise, 0.8 dB NF, bypass switching'],
                ]} />
                <H4>3.2 Baseband Processing</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['BBU/DU', 'Ericsson Baseband 6630', '6 cells, LTE+NR dual-mode, 10G eCPRI, L1/L2 processing'],
                    ['O-DU (open)', 'Mavenir / Parallel Wireless', 'x86 COTS, FlexRAN, virtualized L1/L2, FEC offload'],
                    ['CU', 'Ericsson / Nokia AirFrame', 'L3 (RRC/PDCP), F1 interface to DU, near-RT RIC'],
                    ['MEC', 'Edge compute', 'AWS Wavelength / Azure Edge, UPF co-location, <10 ms RTT'],
                    ['GPS Receiver', 'Trimble / u-blox', '1PPS + 10 MHz, ±50 ns holdover, GNSS antenna'],
                ]} />
                <H4>3.3 Backhaul &amp; Transport</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Cell-site Router', 'Cisco ASR 920 / Nokia 7705', '10GE, MPLS, segment routing, IPsec, QoS'],
                    ['Fiber Demarcation', 'Corning OptiSheath', 'SMF, 12-48 fibers, SC/LC, splice enclosure'],
                    ['Microwave Radio', 'Ericsson MINI-LINK 6352', '6-42 GHz, 2 Gbps, XPIC, adaptive modulation'],
                    ['E-band Radio', 'Ceragon IP-50E', '70/80 GHz, 10 Gbps, 1-3 km, 1+0/1+1 config'],
                    ['Multiplexer', 'CWDM/DWDM passive', '4-8 λ on single fiber, fronthaul aggregation'],
                ]} />
                <H4>3.4 Power &amp; Site Infrastructure</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Rectifier', 'Eltek Flatpack2 / Vertiv', '-48 VDC, 3-6 kW per module, N+1, SNMP'],
                    ['Battery Bank', 'Li-ion (LFP) / VRLA', '4-8 hr backup, 200-600 Ah, temp compensated'],
                    ['Diesel Generator', 'Generac / Caterpillar', '20-50 kW, portable or permanent, auto-start'],
                    ['Surge Protection', 'Polyphaser/Raychem', 'Coax, AC, DC, data, bonded to ground ring'],
                    ['Ground System', 'Motorola R56 compliant', 'Ground ring, radials, tower ground, <5Ω, Cadweld'],
                    ['Obstruction Light', 'L-864 (red) / L-856 (white)', 'FAA AC 70/7460, IR for NVG compatibility'],
                ]} />
            </S>
            <S n={4} t="Process Diagrams" id="process">
                <H4>4.1 5G NR Call / Data Flow</H4>
                <Ascii>{`UE → NR-Uu (air interface) → O-RU (beamforming, RF) → eCPRI
→ O-DU (L1 PHY, L2 MAC/RLC) → F1 interface → O-CU (RRC/PDCP)
→ N2 (AMF: registration/mobility) + N3 (UPF: user plane)
→ N6 → Data network / Internet / MEC application`}</Ascii>
                <H4>4.2 O-RAN Management</H4>
                <Ascii>{`SMO (Service Mgmt & Orchestration)
├── O1 interface → O-CU, O-DU, O-RU (FCAPS, NETCONF/YANG)
├── A1 interface → Near-RT RIC (policy, ML inference, <1 s)
└── Non-RT RIC → A1 → Near-RT RIC → E2 → O-DU/O-CU
    (rApp → xApp pipeline for traffic steering, QoS opt)`}</Ascii>
                <H4>4.3 Power Failover Sequence</H4>
                <Ascii>{`Utility AC loss → ATS detects → Battery engaged (< 10 ms)
→ Generator auto-start (15-30 sec) → ATS transfers to gen
→ Extended run on diesel (8-72 hr fuel) → Utility restored
→ ATS retransfer → Battery recharge → Normal operation`}</Ascii>
            </S>
            <S n={5} t="Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2 italic">3-sector macro site, 4G LTE + 5G NR co-site</p>
                <Tbl heads={['Equipment', 'Qty', 'Specification']} rows={[
                    ['mMIMO Antenna (mid-band)', '3', '64T64R, 3.5 GHz, 200W/carrier'],
                    ['Low-Band Antenna', '3', '4T4R, 600/700/850 MHz, 2.4 m'],
                    ['mmWave Module', '1-3', '28/39 GHz, AAS, 256 elements'],
                    ['RRU/O-RU', '6-9', '20W/carrier, eCPRI 25G, per band/sector'],
                    ['BBU/DU', '1-2', 'Ericsson 6630, 6 cells, dual-mode'],
                    ['CU (if split)', '1', 'L3 processing, F1 interface'],
                    ['Cell-site Router', '1', 'ASR 920, 10GE, MPLS, IPsec'],
                    ['Microwave Radio', '1-2', '6-42 GHz, 2 Gbps, XPIC'],
                    ['Fiber Patch Panel', '1', '12-48 SC/LC, SMF'],
                    ['Rectifier System', '1', '-48 VDC, 6-18 kW, N+1 modules'],
                    ['Battery Bank', '1-2 strings', 'Li-ion/VRLA, 8 hr, 400 Ah'],
                    ['Diesel Generator', '0-1', '30 kW, portable, auto-start'],
                    ['Surge Arrestors', '12+', 'Coax, AC, DC, data, per line'],
                    ['GPS/GNSS Receiver', '1', '1PPS/10 MHz, timing, holdover'],
                    ['Tower Lighting', '1 set', 'L-864/L-856, FAA compliant'],
                    ['Equipment Shelter', '1', 'Outdoor: 2.4×2.4 m, insulated, HVAC'],
                    ['HVAC/Fan', '1-2', '5-15 kW cooling, thermostat control'],
                    ['Grounding System', '1', 'Ring, radials, Cadweld, <5Ω'],
                    ['Monitoring RTU', '1', 'Temp, door, power, alarm, SNMP'],
                    ['Fiber/Coax Jumpers', '20+', 'N-type, SMA, LC/SC, various lengths'],
                ]} />
            </S>
            <S n={6} t="Purdue Model / ISA-95 Mapping" id="purdue">
                <Tbl heads={['Level', 'Function', 'Components', 'Protocols']} rows={[
                    ['L0', 'Sensing', 'RF power, VSWR, temperature, battery V/A, GPS lock', 'Analog, I²C, SNMP traps'],
                    ['L1', 'Control', 'RRU/O-RU, BBU/DU (L1/L2), rectifier controller', 'eCPRI, CPRI, Profinet'],
                    ['L2', 'Supervisory', 'CU (L3/RRC), near-RT RIC, site management', 'F1, E2, O1, NETCONF/YANG'],
                    ['L3', 'Operations', 'OSS/BSS, SON, non-RT RIC/SMO, NOC', 'A1, TM Forum APIs, MQTT'],
                    ['L3.5', 'DMZ', 'IPsec tunnel, firewall, OAM VPN', 'TLS 1.3, SSH, IPsec IKEv2'],
                    ['L4', 'Enterprise', 'Billing, CRM, planning tools, subscriber analytics', 'REST, HTTPS, Kafka'],
                ]} />
            </S>
            <S n={7} t="Safety &amp; Supporting Systems" id="safety">
                <Tbl heads={['System', 'Standard', 'Specification']} rows={[
                    ['RF Exposure', 'FCC OET-65', 'MPE limit calculation, exclusion zone signage, monitoring'],
                    ['Fall Protection', 'OSHA 1926.502', '100% tie-off, climb assist, rescue plan, trained climbers'],
                    ['Tower Structural', 'TIA-222-H', 'Wind/ice/seismic loads, periodic inspection, mod analysis'],
                    ['Lightning', 'NFPA 780 / R56', 'Air terminal, down conductor, ground ring, SPD on all lines'],
                    ['Obstruction', 'FAA AC 70/7460', 'Marking (paint/lighting), NOTAM, Form 7460-1 filing'],
                    ['Battery Safety', 'OSHA 1910.305', 'Ventilation, thermal runaway monitoring (Li-ion), spill kit'],
                ]} />
            </S>
            <S n={8} t="Communication Protocol Stack" id="protocols">
                <Ascii>{`Enterprise:  OSS/BSS │ Billing│ Planning │ TM Forum APIs │ Kafka
Application: NETCONF/YANG │ O1/A1/E2 (O-RAN) │ SNMP │ TR-069 (CPE)
Transport:   MPLS/SR │ IPsec │ GTP-U/C │ SCTP │ S1AP/NGAP
Network:     IP/MPLS │ Segment Routing │ VPRN │ VxLAN
Fronthaul:   eCPRI over 25G Ethernet │ CPRI (legacy) │ IEEE 1914.3
Backhaul:    10GE fiber │ Microwave (6-42 GHz) │ E-band (70/80 GHz)
Air:         5G NR-Uu (OFDMA, 256QAM) │ LTE-Uu │ Sub-6 + mmWave`}</Ascii>
            </S>
            <S n={9} t="Data Flow Architecture" id="data-flow">
                <Ascii>{`Air (UE)           RAN (L0-L1)         CU/RIC (L2)
UE──NR-Uu──────►O-RU──eCPRI──────►O-DU (L1/L2, scheduling)
                                   │ F1
                                   ▼
                              O-CU (RRC, PDCP, handover)
                                   │ N2/N3
                               ┌───┴───┐  L3.5 DMZ
                               ▼       ▼
                             AMF     UPF──► Internet/MEC
Operations (L3)         Enterprise (L4)
SON/RIC (xApps)◄─E2─────►Analytics/AI
NOC dashboard◄─O1────────►Billing/CRM
Planning tool◄─A1─────────►Capacity forecast`}</Ascii>
            </S>
            <S n={10} t="References" id="references">
                <Refs items={[
                    '3GPP. (2023). TS 38.401: NG-RAN Architecture Description. 3GPP.',
                    '3GPP. (2023). TS 38.104: NR Base Station (BS) Radio Transmission and Reception. 3GPP.',
                    'O-RAN Alliance. (2023). O-RAN Architecture Description, v8.0. O-RAN Alliance.',
                    'TIA. (2018). TIA-222-H: Structural Standard for Antenna Supporting Structures. TIA.',
                    'Motorola. (2005). R56: Standards and Guidelines for Communication Sites. Motorola.',
                    'FCC. (2023). OET Bulletin 65: Evaluating Compliance with FCC RF Exposure Guidelines. FCC.',
                    'The Open Group. (2022). TOGAF Standard, Version 10.',
                    'NIST. (2023). SP 800-82r3: Guide to OT Security. NIST.',
                ]} />
            </S>
            <SeeAlso links={[
                { href: '/wiki/communications', label: 'Communications Hub', color: '#3B82F6' },
                { href: '/wiki/sectors/COMU', label: 'Sector Overview', color: '#3B82F6' },
                { href: '/wiki/communications/microwave-backhaul', label: 'Microwave Backhaul', color: '#EC4899' },
            ]} />
        </div>
    );
}
function S({ n, t, id, children }: { n: number; t: string; id: string; children: React.ReactNode }) {
    return (<section id={id} className="space-y-4"><h2 className="text-lg font-heading font-semibold text-white"><span className="text-[#06B6D4] mr-2">{n}.</span>{t}</h2>{children}</section>);
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
