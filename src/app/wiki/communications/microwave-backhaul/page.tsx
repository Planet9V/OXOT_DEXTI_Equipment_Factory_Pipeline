/**
 * Microwave Backhaul Site Deep-Dive Reference Architecture.
 * Licensed 6-42 GHz, E-band 70-80 GHz, IP/MPLS, adaptive modulation.
 * @module wiki/communications/microwave-backhaul/page
 */
export const metadata = {
    title: 'Microwave Backhaul Site — Communications Wiki',
    description: 'TOGAF reference architecture for microwave backhaul sites: licensed bands 6-42 GHz, E-band 70-80 GHz, IP/MPLS transport, XPIC, adaptive modulation, 1+1/2+0 protection, tower/rooftop, cell-site aggregation.',
};
export default function MicrowaveBackhaulPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #EC4899, #BE185D)' }}>🔗</div>
                    <div>
                        <span className="text-[10px] text-gray-500 font-mono block">COMU-WL-CELL · Transport</span>
                        <h1 className="text-2xl font-heading font-bold text-white">Microwave Backhaul Site Reference Architecture</h1>
                    </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">TOGAF-based reference architecture for microwave backhaul links and aggregation sites covering licensed-band radios (6–42 GHz, 500 Mbps – 2.5 Gbps per link), E-band radios (70/80 GHz, 10+ Gbps), IP/MPLS transport with segment routing, XPIC (cross-polarization interference cancellation), adaptive modulation (QPSK to 4096-QAM), 1+1 / 2+0 / N+0 protection configurations, antenna systems (0.3–1.8 m parabolic), cell-site aggregation — governed by FCC Part 101, ETSI EN 302 217, ITU-R F-series recommendations.</p>
            </div>
            <S n={1} t="TOGAF Business Architecture" id="togaf">
                <H4>Stakeholder Map</H4>
                <Tbl heads={['Stakeholder', 'Role', 'Interest']} rows={[
                    ['MNOs', 'Owner/Operator', 'AT&T, T-Mobile, Verizon, Dish — cell-site backhaul'],
                    ['ISPs/WISPs', 'Owner/Operator', 'Point-to-point trunk, last-mile, rural broadband'],
                    ['Tower Companies', 'Infrastructure', 'American Tower, Crown Castle — antenna mounting'],
                    ['FCC', 'Regulatory', 'Part 101 (fixed microwave), spectrum licensing, IBFS filing'],
                    ['ETSI', 'Standards', 'EN 302 217 (emissions), EN 302 326 (harmonized EU)'],
                    ['Equipment OEMs', 'Supplier', 'Ericsson MINI-LINK, Nokia Wavence, Ceragon, Huawei, NEC'],
                    ['ITU-R', 'International', 'F.383/384 (planning), F.1668 (ATPC), rain attenuation'],
                ]} />
                <H4>Regulatory Framework</H4>
                <Tbl heads={['Standard', 'Title', 'Scope']} rows={[
                    ['FCC Part 101', 'Fixed Microwave', 'Licensing, EIRP limits, path coordination, IBFS'],
                    ['ETSI EN 302 217', 'Emissions', 'Power spectral density, spurious emissions, ATPC'],
                    ['ITU-R P.530', 'Propagation', 'Rain attenuation, multipath fading, worst-month'],
                    ['ITU-R P.838', 'Rain Rate', 'Specific attenuation coefficients (α, k) for rain'],
                    ['ITU-R F.383', 'Planning', 'Hop length, availability objectives, performance'],
                    ['TIA-222-H', 'Tower Structure', 'Wind/ice loads for antenna mounting, structural analysis'],
                    ['Motorola R56', 'Grounding', 'Site grounding for tower-mounted microwave equipment'],
                ]} />
            </S>
            <S n={2} t="High-Level Design" id="hld">
                <Ascii>{`┌─── AGGREGATION / POP SITE ─────────────────────────────┐
│ Core router/switch → MW IDU (indoor unit) → IF cable      │
│ → ODU (outdoor unit) → Waveguide → Antenna (1.2-1.8 m)   │
│ Multiple hops radiate to remote sites in ring/hub topology │
├─── POINT-TO-POINT HOP ───────────────────────────────┤
│  Site A                              Site B               │
│  IDU-A ──IF──ODU-A──►  [===LOS===]  ◄──ODU-B──IF──IDU-B  │
│  (6-42 GHz, XPIC, adaptive mod, 1+1 or 2+0 protection)  │
│  Hop length: 5-50 km (traditional) / 1-5 km (E-band)     │
│  Capacity: 500 Mbps-2.5 Gbps per link (6-42 GHz)         │
│  Capacity: 10-20 Gbps per link (E-band 70/80 GHz)        │
├─── CELL-SITE BACKHAUL APPLICATION ───────────────────┤
│ Cell tower (RAN) → MW IDU → ODU → Antenna                │
│ → Hop to aggregation site → Fiber POP → Core network     │
│ Carries: eCPRI (fronthaul), S1/X2/Xn (backhaul), O&M     │
├─── POWER & INFRASTRUCTURE ───────────────────────────┤
│ -48 VDC (from cell-site rectifier) or 120/240 VAC         │
│ ODU power via IF cable (PoE-like) │ Lightning/surge SPD   │
│ Antenna mount: tower side-arm, rooftop non-penetrating    │
└────────────────────────────────────────────────────────┘`}</Ascii>
            </S>
            <S n={3} t="Detailed Technical Description" id="tech">
                <H4>3.1 Indoor Unit (IDU) / Baseband</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['IDU', 'Ericsson MINI-LINK 6691', 'IP/MPLS, SR, 10GE client, 2+0/4+0 XPIC, full-outdoor option'],
                    ['IDU', 'Nokia Wavence 9500 MPR', 'MPLS-TP, 25GE, carrier Ethernet, TDM legacy, SyncE/1588'],
                    ['IDU', 'Ceragon IP-50C/IP-50E', 'All-outdoor, IP, 2× 2 Gbps, split-mount or full-outdoor'],
                    ['IDU', 'NEC iPASO', '6-42 GHz, 2× 2 Gbps, XPIC, IP/MPLS, sub-rack or outdoor'],
                    ['Modem', 'Integrated in IDU', 'Adaptive modulation QPSK→4096-QAM, LDPC FEC, ACM'],
                ]} />
                <H4>3.2 Outdoor Unit (ODU) / RF</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['ODU (6-11 GHz)', 'Tx/Rx, GaN PA', '1-2 W, 56 MHz channel, long-haul (30-50 km)'],
                    ['ODU (15-23 GHz)', 'Tx/Rx, GaN PA', '0.5-1 W, 56/112 MHz channel, medium-haul (10-25 km)'],
                    ['ODU (26-42 GHz)', 'Tx/Rx', '0.3-0.5 W, 56/112/224 MHz, short-haul (5-15 km)'],
                    ['ODU (E-band 70/80)', 'Ceragon IP-50E/Siklu', '10-20 Gbps, 250/500/1000/2000 MHz channel, 1-5 km'],
                    ['Duplexer/Filter', 'Integrated or external', 'Tx/Rx isolation, 60+ dB, channel filtering'],
                ]} />
                <H4>3.3 Antenna Systems</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Standard Parabolic', '0.6-1.2 m', '30-38 dBi gain, RPE Class 3, HP (high perf)'],
                    ['High-Performance', '1.2-1.8 m', '38-44 dBi, RPE Class 4, ultra-HP, front-to-back >70 dB'],
                    ['Flat Panel (E-band)', '0.15-0.3 m', '40-42 dBi, integrated ODU+antenna, mm-wave'],
                    ['Dual-Pol Feed', 'OMT', 'V+H polarization, XPIC-ready, return loss >26 dB'],
                    ['Radome', 'Fiberglass', 'Weather protection, <0.3 dB additional loss'],
                ]} />
                <H4>3.4 Protection &amp; Redundancy</H4>
                <Tbl heads={['Configuration', 'Description', 'Application']} rows={[
                    ['1+0', 'Single radio, no protection', 'Low-priority links, cost-sensitive'],
                    ['1+1 HSB', 'Hot standby, auto-switchover', 'Critical links, <50 ms switchover, hitless'],
                    ['2+0 XPIC', '2 radios, cross-pol, double capacity', 'High-capacity trunks, V+H on same frequency'],
                    ['N+1', 'N working + 1 standby', 'Multi-hop ring protection, frequency diversity'],
                    ['SD/FD', 'Space/frequency diversity', 'Multipath fading mitigation, dual antenna/channel'],
                ]} />
            </S>
            <S n={4} t="Process Diagrams" id="process">
                <H4>4.1 Link Budget Calculation</H4>
                <Ascii>{`Tx power (dBm) + Tx antenna gain (dBi) - Free-space loss (dB)
- Rain attenuation (dB, ITU-R P.838) - Atmospheric (dB)
+ Rx antenna gain (dBi) = Received signal level (RSL, dBm)
RSL - Rx threshold (at target BER 10⁻⁶) = Fade margin (dB)
Target: 35-40 dB fade margin for 99.999% availability`}</Ascii>
                <H4>4.2 Adaptive Modulation</H4>
                <Ascii>{`Clear sky: 4096-QAM → Maximum throughput (e.g., 2.5 Gbps)
Light rain: 1024-QAM → Reduced throughput, increased margin
Heavy rain: 256-QAM → 64-QAM → 16-QAM → QPSK (minimum)
ACM responds in < 10 ms to fading events, maintaining link
ATPC: automatic transmit power control to reduce interference`}</Ascii>
                <H4>4.3 Hop-by-Hop Aggregation</H4>
                <Ascii>{`Cell site 1 ──MW hop──► Aggregation node
Cell site 2 ──MW hop──►     │ (Ethernet ring/hub)
Cell site 3 ──MW hop──►     │
                            ▼
                      Fiber POP → Core router → 5GC/EPC
Capacity planning: sum of all cell-site throughput + overhead
Ring topology provides N+1 (alternate path on failure)`}</Ascii>
            </S>
            <S n={5} t="Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2 italic">Aggregation hub with 6 MW hops (4× traditional + 2× E-band)</p>
                <Tbl heads={['Equipment', 'Qty', 'Specification']} rows={[
                    ['IDU (full-featured)', '1-2', 'Ericsson 6691 or Nokia 9500, IP/MPLS, 10GE'],
                    ['ODU (6-11 GHz)', '2', 'Long-haul, 1-2 W, 56 MHz, XPIC 2+0'],
                    ['ODU (18-23 GHz)', '2', 'Medium-haul, 112 MHz, XPIC 2+0'],
                    ['ODU (E-band 70 GHz)', '2', '10 Gbps, 1-3 km, short-haul trunk'],
                    ['Antenna (1.2 m HP)', '4', '38 dBi, RPE Class 4, dual-pol'],
                    ['Antenna (0.6 m)', '2', '33 dBi, E-band, integrated ODU'],
                    ['IF Cable (coax)', '40-80 m', 'Low-loss, ODU power, per hop'],
                    ['Antenna Mount', '6', 'Side-arm or rooftop, fine adjust, hot-dip galvanized'],
                    ['Surge Protection', '12+', 'Coax SPD, on IF cable, both ends'],
                    ['Grounding Kit', '6', 'Hoisting grip, ground strap, Cadweld'],
                    ['Aggregation Switch', '1', '10/25GE, L2/L3, cell-site traffic aggregation'],
                    ['Rectifier/PSU', '1', '-48 VDC or 120 VAC, feeding IDU, ODU via IF cable'],
                    ['Battery Backup', '1', '4-8 hr, co-located with cell-site battery'],
                    ['GPS/SyncE', '1', 'Timing: IEEE 1588v2 / SyncE, phase sync for 5G'],
                    ['NMS Agent', '1', 'SNMP managed, Ericsson MINI-LINK Craft, Nokia SAM'],
                    ['Path Survey Report', '6', 'LOS verification, Fresnel zone clearance, rain data'],
                    ['Lightning Arrestor', '6', 'On each antenna/ODU feed, tower grounded'],
                    ['Weatherproof Enclosure', '1-2', 'If no shelter: NEMA 4X, IP65, heated/vented'],
                    ['Cable Tray', '10-20 m', 'IF cable routing, tower/rooftop to shelter'],
                    ['Spare ODU', '1', 'Hot spare for rapid replacement, shelf stock'],
                ]} />
            </S>
            <S n={6} t="Purdue Model / ISA-95 Mapping" id="purdue">
                <Tbl heads={['Level', 'Function', 'Components', 'Protocols']} rows={[
                    ['L0', 'Sensing', 'RSL, BER, Tx power, ODU temp, XPIC status', 'Analog, SNMP traps, TCA alarms'],
                    ['L1', 'Control', 'IDU baseband/modem, ODU RF, ACM/ATPC engine', 'Proprietary, Ethernet, ModBus'],
                    ['L2', 'Supervisory', 'NMS (MINI-LINK Craft, Nokia SAM), performance history', 'SNMP v3, NETCONF/YANG, web GUI'],
                    ['L3', 'Operations', 'Network planning (Pathloss/Mentum), capacity management', 'REST, TM Forum APIs, OSS'],
                    ['L3.5', 'DMZ', 'IPsec on backhaul, RBAC, NMS access control', 'TLS, SSH, IPsec, RADIUS'],
                    ['L4', 'Enterprise', 'Billing, SLA, regulatory (FCC IBFS filing)', 'HTTPS, REST, FCC ULS'],
                ]} />
            </S>
            <S n={7} t="Safety &amp; Supporting Systems" id="safety">
                <Tbl heads={['System', 'Standard', 'Specification']} rows={[
                    ['RF Exposure', 'FCC OET-65', 'Main beam exclusion zone, signage, compliance survey'],
                    ['Tower Climbing', 'OSHA 1926.502', 'Fall protection, rescue plan, antenna installation'],
                    ['Lightning', 'NFPA 780 / R56', 'Ground system, SPD on IF cable, antenna bonded to tower'],
                    ['Wind Loading', 'TIA-222-H', 'Antenna wind load (F = 0.5 × ρ × v² × A × Cd), tower analysis'],
                    ['Antenna Alignment', 'Laser/compass', '±0.1° azimuth accuracy, tilt, fine adjust, pattern verification'],
                    ['Spectrum Coordination', 'FCC Part 101', 'IBFS filing, coordination study, interference analysis'],
                ]} />
            </S>
            <S n={8} t="Communication Protocol Stack" id="protocols">
                <Ascii>{`Enterprise:  OSS/BSS │ NMS │ Capacity planning │ FCC IBFS
Application: SNMP v3 │ NETCONF/YANG │ gRPC (telemetry) │ TR-069
Transport:   IP/MPLS │ MPLS-TP │ Segment Routing │ SyncE/1588
Network:     Carrier Ethernet (MEF) │ VLAN │ QoS (DSCP/CoS)
Radio Link:  ACM (QPSK-4096QAM) │ XPIC │ ATPC │ LDPC FEC
Physical:    6-42 GHz │ 70-80 GHz (E-band) │ V/H polarization`}</Ascii>
            </S>
            <S n={9} t="Data Flow Architecture" id="data-flow">
                <Ascii>{`Cell Site (L0)        IDU/ODU (L1)         Aggregation (L2)
RAN traffic──GbE──►IDU──baseband──►ODU──RF──►Antenna──►[AIR]
                                                         │
                                                    [Hop to far end]
                                                         │
                                                   ODU──►IDU──►Switch
Operations (L3)                                     │
NMS dashboard◄─SNMP──────────────►Performance history
Path planning◄─rain model──────►Availability report

Enterprise (L4)
Capacity report──►SLA compliance──►Billing/cost model`}</Ascii>
            </S>
            <S n={10} t="References" id="references">
                <Refs items={[
                    'FCC. (2023). 47 CFR Part 101: Fixed Microwave Services. FCC.',
                    'ITU-R. (2017). P.530-17: Propagation Data for Terrestrial Line-of-Sight Systems. ITU.',
                    'ITU-R. (2005). P.838-3: Specific Attenuation Model for Rain. ITU.',
                    'ETSI. (2017). EN 302 217-2: Fixed Radio Systems; Point-to-Point Equipment. ETSI.',
                    'Manning, T. (2009). Microwave Radio Transmission Design Guide, 2nd Ed. Artech House.',
                    'Ericsson. (2023). MINI-LINK 6000 Product Technical Description. Ericsson.',
                    'The Open Group. (2022). TOGAF Standard, Version 10.',
                    'NIST. (2023). SP 800-82r3: Guide to OT Security. NIST.',
                ]} />
            </S>
            <SeeAlso links={[
                { href: '/wiki/communications', label: 'Communications Hub', color: '#3B82F6' },
                { href: '/wiki/sectors/COMU', label: 'Sector Overview', color: '#3B82F6' },
                { href: '/wiki/communications/cell-tower', label: 'Cell Tower / 5G Site', color: '#06B6D4' },
            ]} />
        </div>
    );
}
function S({ n, t, id, children }: { n: number; t: string; id: string; children: React.ReactNode }) {
    return (<section id={id} className="space-y-4"><h2 className="text-lg font-heading font-semibold text-white"><span className="text-[#EC4899] mr-2">{n}.</span>{t}</h2>{children}</section>);
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
