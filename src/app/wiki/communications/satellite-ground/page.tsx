/**
 * Satellite Ground Station / Earth Station Deep-Dive Reference Architecture.
 * Parabolic antennas, LNA/HPA, DVB-S2X modems, LEO/MEO/GEO tracking.
 * @module wiki/communications/satellite-ground/page
 */
export const metadata = {
    title: 'Satellite Ground Station — Communications Wiki',
    description: 'TOGAF reference architecture for satellite ground stations: 3-15 m parabolic antennas, LNA/LNB, HPA/SSPA/TWTA, DVB-S2X modems, antenna control units, GEO/MEO/LEO tracking, Ka/Ku/C-band, M&C systems.',
};
export default function SatelliteGroundPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)' }}>🛰️</div>
                    <div>
                        <span className="text-[10px] text-gray-500 font-mono block">COMU-ST-GND</span>
                        <h1 className="text-2xl font-heading font-bold text-white">Satellite Ground Station / Earth Station Reference Architecture</h1>
                    </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">TOGAF-based reference architecture for satellite earth stations covering 3–15 m Cassegrain/Gregorian parabolic antennas with azimuth/elevation tracking, LNA/LNB (50 K noise temperature), HPA/SSPA/TWTA (200–3,000 W), frequency converters, DVB-S2X / SCPC / TDMA modems, antenna control units (ACU) for GEO/MEO/LEO program/auto-track, baseband processing, M&C systems — governed by ITU Radio Regulations, FCC Part 25, and CCSDS standards.</p>
            </div>
            <S n={1} t="TOGAF Business Architecture" id="togaf">
                <H4>Stakeholder Map</H4>
                <Tbl heads={['Stakeholder', 'Role', 'Interest']} rows={[
                    ['GEO Operators', 'Service Provider', 'SES, Intelsat, Viasat, Eutelsat, Hughes'],
                    ['LEO Operators', 'Constellation', 'SpaceX (Starlink), OneWeb, Amazon (Kuiper), Telesat'],
                    ['Ground Station as a Service', 'Cloud', 'AWS Ground Station, Azure Orbital, KSAT'],
                    ['FCC', 'Regulatory', 'Part 25 licensing, coordination, non-geostationary rules'],
                    ['ITU', 'International', 'Radio Regulations, frequency coordination, filing (API/CR)'],
                    ['DoD/NOAA', 'Government', 'MILSATCOM, weather imagery, ITAR for defense ground segments'],
                    ['Equipment OEMs', 'Supplier', 'General Dynamics, L3Harris, iDirect, Comtech, Newtec'],
                    ['CCSDS', 'Standards', 'Space data systems, proximity links, cross support'],
                ]} />
                <H4>Regulatory Framework</H4>
                <Tbl heads={['Standard', 'Title', 'Scope']} rows={[
                    ['FCC 47 CFR Part 25', 'Earth Station Licensing', 'Power flux density, coordination, EIRP, off-axis emissions'],
                    ['ITU Radio Regs', 'Frequency Coordination', 'Appendix 4/7, Article 9/11, ITU-R S.580/465'],
                    ['ETSI EN 301 489', 'EMC for Satellite', 'Electromagnetic compatibility for earth stations'],
                    ['DVB-S2X (EN 302 307-2)', 'Modulation Standard', 'VCM/ACM, 0.1-6.3 bits/sym, wideband carriers'],
                    ['CCSDS 131.0-B', 'TM Synchronization', 'Telemetry, coding, modulation for space links'],
                    ['ITAR (22 CFR 120-130)', 'Export Control', 'Defense satellite ground terminals, ECCN classification'],
                    ['NIST SP 800-53', 'Security Controls', 'Federal ground stations, FedRAMP for cloud ground'],
                ]} />
            </S>
            <S n={2} t="High-Level Design" id="hld">
                <Ascii>{`┌─── ANTENNA FARM ───────────────────────────────────────┐
│ GEO antenna (7-13 m) × 2-6     MEO/LEO tracking × 2-4  │
│ Cassegrain/Gregorian │ Az-El/X-Y mount │ radome option  │
│ Feed: circular polarization │ C/Ku/Ka-band │ OMT/diplexer│
├─── RF EQUIPMENT HUT ──────────────────────────────────┤
│ LNA/LNB (50K) → Down-converter (L-band IF) → Modem Rx  │
│ Modem Tx → Up-converter → HPA/SSPA/TWTA (200-3000W)    │
│ Waveguide (WR-75/WR-137) → Feed → Antenna              │
│ Redundancy: 1+1 switching (LNA, HPA, converter)         │
├─── MODEM/BASEBAND ROOM ──────────────────────────────┤
│ DVB-S2X modems (iDirect, Comtech, Newtec)               │
│ SCPC / TDMA / MF-TDMA │ ACM adaptive coding             │
│ MPEG-TS mux/demux │ IP encapsulation │ encryption        │
│ VSAT hub controller (for network-of-terminals)           │
├─── M&C and OPERATIONS ────────────────────────────────┤
│ Antenna Control Unit (ACU) — auto-track / program track  │
│ M&C system (L3Harris, Kratos, Cobham) — SNMP/proprietary│
│ Spectrum analyzer │ Link budget dashboard │ NOC displays │
├─── INFRASTRUCTURE ────────────────────────────────────┤
│ UPS (30-100 kVA) │ Diesel generator (100-300 kW, N+1)  │
│ HVAC (precision, HPA heat dissipation) │ Grounding      │
│ Lightning (NFPA 780, tall mast, SPD on waveguide)        │
└────────────────────────────────────────────────────────┘`}</Ascii>
            </S>
            <S n={3} t="Detailed Technical Description" id="tech">
                <H4>3.1 Antenna Systems</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['GEO Earth Station', 'Cassegrain, 7-13 m', 'G/T 35-41 dB/K, EIRP 75-90 dBW, C/Ku/Ka dual-band'],
                    ['LEO/MEO Tracker', '2.4-4.5 m, fast-track', '0.1°/s² accel, auto-track, step-track, monopulse'],
                    ['VSAT Terminal', '1.2-2.4 m, fixed/auto', 'Ka-band, 5-20 W BUC, flat-panel phased array emerging'],
                    ['Gateway Antenna', '9-13 m, Ka-band', '50+ Gbps capacity, multiple spot beams, ACM'],
                    ['Mount System', 'Az-El or X-Y', '>90° elevation, ±360° azimuth, anti-backlash gears'],
                ]} />
                <H4>3.2 RF Chain</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['LNA', 'GaAs/InP HEMT', '40-70 K noise temp, 50-60 dB gain, C/Ku/Ka'],
                    ['LNB', 'Integrated LNA+downconverter', '950-2150 MHz L-band IF output, PLL LO'],
                    ['Block Up-Converter', 'Norsat/Advantech', '5-40 W, C/Ku/Ka, 1 dB gain flatness, phase noise -85 dBc'],
                    ['HPA (SSPA)', 'GaN solid-state', '200-500 W, Ku/Ka, 1 dB compression, efficiency 25-35%'],
                    ['HPA (TWTA)', 'Traveling wave tube', '500-3000 W, C/Ku, linearizer, 45% efficiency'],
                    ['Waveguide', 'WR-137 (C), WR-75 (Ku)', 'Low loss, pressurized (N₂), flexible sections, rotary joints'],
                ]} />
                <H4>3.3 Modems &amp; Baseband</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['DVB-S2X Modem', 'iDirect iQ 200/Comtech', 'VCM/ACM, 1-500 Msym/s, LDPC/BCH FEC, 32APSK'],
                    ['SCPC Modem', 'Comtech CDM-760', '1 carrier per transponder, 200 Mbps, low jitter'],
                    ['TDMA Hub', 'iDirect Hub/Newtec Dialog', 'MF-TDMA return, DVB-S2X forward, 100k+ terminals'],
                    ['IP Encapsulator', 'Newtec EL970', 'GSE/MPE, MPEG-TS, PEP/WAN optimization'],
                    ['Encryption', 'General Dynamics TACLANE', 'Type 1 (NSA), AES-256, link/bulk encryption'],
                ]} />
                <H4>3.4 Antenna Control &amp; M&amp;C</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['ACU', 'ViaSat/General Dynamics', 'Program track (TLE/ephemeris), auto-track (monopulse)'],
                    ['M&C System', 'Kratos Compass / L3Harris', 'SNMP, ModBus, proprietary, dashboards, alarm'],
                    ['Spectrum Analyzer', 'R&S / Keysight', 'C/Ku/Ka band, real-time, interference detection'],
                    ['Beacon Receiver', 'Datum/Miteq', 'Satellite beacon tracking, AGC feedback to ACU'],
                    ['Link Budget Tool', 'SatMaster/Transfinite', 'C/N, availability, rain attenuation, system margin'],
                ]} />
            </S>
            <S n={4} t="Process Diagrams" id="process">
                <H4>4.1 Uplink Signal Path</H4>
                <Ascii>{`IP data → Modem (DVB-S2X encode, FEC, modulate to IF)
→ Up-converter (L-band IF → Ku/Ka RF) → HPA (200-3000W)
→ Waveguide (WR-75, pressurized) → Feed/OMT → Antenna
→ Free-space path (36,000 km GEO / 550-1200 km LEO)
→ Satellite transponder → Downlink to far-end earth station`}</Ascii>
                <H4>4.2 LEO Tracking Sequence</H4>
                <Ascii>{`Predict pass from TLE/ephemeris (Celestrak/SpaceTrack)
→ ACU pre-position antenna (AOS azimuth/elevation)
→ Acquisition of signal (AOS) → auto-track lock (monopulse)
→ Data transfer window (5-15 min for LEO) → LOS
→ Handover to next antenna / next satellite in constellation
→ Data buffer/store during gap → next pass acquisition`}</Ascii>
                <H4>4.3 M&amp;C Alarm Flow</H4>
                <Ascii>{`Sensor → M&C agent (SNMP/ModBus) → M&C server (Kratos)
→ Alarm correlation engine → Priority assignment (P1-P5)
→ NOC dashboard (map/schematic view) → Auto-ticket (ITSM)
→ Escalation (email/SMS/page) → Technician dispatch
→ Resolution → M&C acknowledge → Ticket close`}</Ascii>
            </S>
            <S n={5} t="Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2 italic">Medium teleport (4 GEO + 2 LEO antennas)</p>
                <Tbl heads={['Equipment', 'Qty', 'Specification']} rows={[
                    ['GEO Antenna (9 m)', '4', 'Cassegrain, Ku/Ka, G/T 38 dB/K'],
                    ['LEO Tracker (3.7 m)', '2', 'Fast-track Az-El, auto-track, Ka-band'],
                    ['LNA', '8', '50 K, 1+1 redundant per antenna pair'],
                    ['HPA (SSPA, Ku)', '4', '400 W, GaN, 1+1 switchover'],
                    ['HPA (TWTA, C)', '2', '2 kW, linearizer, 1+1 switchover'],
                    ['Block Up-Converter', '6', '25 W, Ka/Ku, 1+1'],
                    ['Waveguide (WR-75)', '60 m', 'Rigid + flex, pressurized N₂'],
                    ['DVB-S2X Modem', '6-12', 'iDirect/Comtech, ACM, 500 Msym/s'],
                    ['TDMA Hub', '1', 'iDirect Hub, 5,000+ terminal capacity'],
                    ['Encryption Unit', '4', 'AES-256, bulk/link, Type 1 option'],
                    ['ACU', '6', 'Program + auto-track, per antenna'],
                    ['M&C System', '1', 'Kratos Compass, 200+ monitor points'],
                    ['Spectrum Analyzer', '2', 'C/Ku/Ka, real-time, interference ID'],
                    ['UPS', '2', '60 kVA each, online double conversion'],
                    ['Diesel Generator', '2', '200 kW, N+1, 48 hr fuel tank'],
                    ['HVAC (precision)', '4', '25 kW each, HPA heat rejection'],
                    ['Lightning Protection', '1', 'Tall mast, ground ring, SPD, NFPA 780'],
                    ['Fiber Backhaul', '1', 'SMF 96-fiber, to POP/data center'],
                    ['GPS Timing', '2', 'GPSDO, 1PPS/10 MHz, ±10 ns, holdover'],
                    ['Physical Security', '1', 'Fence, CCTV, badge access, intrusion alarm'],
                ]} />
            </S>
            <S n={6} t="Purdue Model / ISA-95 Mapping" id="purdue">
                <Tbl heads={['Level', 'Function', 'Components', 'Protocols']} rows={[
                    ['L0', 'Sensing', 'C/N₀, pointing error, HPA power, waveguide pressure', 'Analog, RS-485, SNMP traps'],
                    ['L1', 'Control', 'ACU, HPA controller, modem, LNA/converter switch', 'Serial, ModBus, proprietary'],
                    ['L2', 'Supervisory', 'M&C server (Kratos), spectrum monitor, link budget', 'SNMP v3, TCP/IP, web GUI'],
                    ['L3', 'Operations', 'Network ops center (NOC), capacity management, scheduling', 'REST, MQTT, TM Forum APIs'],
                    ['L3.5', 'DMZ', 'Firewall, encrypted uplink, IDS, VPN gateway', 'TLS, IPsec, SSH, 802.1X'],
                    ['L4', 'Enterprise', 'Customer portal, billing, SLA reporting, satellite capacity', 'HTTPS, REST, SFTP'],
                ]} />
            </S>
            <S n={7} t="Safety &amp; Supporting Systems" id="safety">
                <Tbl heads={['System', 'Standard', 'Specification']} rows={[
                    ['RF Radiation', 'FCC OET-65/OSHA', 'Exclusion zones around HPAs and waveguide, signage, monitoring'],
                    ['HPA High Voltage', 'OSHA 1910.332', 'TWTA cathode 15-30 kV, lockout/tagout, interlock, X-ray shield'],
                    ['Lightning Protection', 'NFPA 780', 'Tall mast, air terminal, ground ring, SPD on all lines'],
                    ['Waveguide Pressurization', 'N₂ / dehydrator', '3-5 PSI, moisture prevention, leak alarm, auto-fill'],
                    ['Diesel Fuel Storage', 'EPA SPCC', 'Double-wall tank, spill prevention, leak detection'],
                    ['Physical Security', 'NIST 800-53 PE', 'Fenced perimeter, CCTV, badge, intrusion detection'],
                ]} />
            </S>
            <S n={8} t="Communication Protocol Stack" id="protocols">
                <Ascii>{`Enterprise:  Customer portal │ SLA reporting │ Billing │ REST API
Application: M&C (SNMP/ModBus) │ ACU control │ Spectrum monitoring
Transport:   DVB-S2X (forward) │ DVB-RCS2 (return) │ GSE/MPE
Satellite:   SCPC │ MF-TDMA │ Aloha │ ACM │ VCM
Network:     TCP/IP │ MPLS │ PEP/WAN optimization │ multicast
Data Link:   Ethernet │ ASI │ LVDS │ E1/T1 (legacy)
Physical:    Waveguide (WR-75/137) │ Coax │ SMF fiber │ RF (C/Ku/Ka)`}</Ascii>
            </S>
            <S n={9} t="Data Flow Architecture" id="data-flow">
                <Ascii>{`Satellite (L0)      RF Chain (L1)         Baseband (L2)
Downlink (Ku/Ka)──►LNA──►Downconv──►Modem Rx (DVB-S2X demod)
                                     │ IP out
                                     ▼
                              IP router / switch
                                     │ GbE/10GE
                            ┌────────┴────────┐
                            ▼                  ▼
                     Customer traffic    M&C Server (L2)

Upload path:
Customer IP──►Modem Tx──►Upconv──►HPA──►Feed──►Satellite

Operations (L3)              Enterprise (L4)
NOC dashboard◄─SNMP/M&C──►Capacity planning
Scheduling◄─TLE/ephemeris──►SLA reporting/billing`}</Ascii>
            </S>
            <S n={10} t="References" id="references">
                <Refs items={[
                    'ITU-R. (2020). Radio Regulations, Articles 9, 11, 21, 22. ITU.',
                    'ETSI. (2021). EN 302 307-2: DVB-S2X Second Generation Framing. ETSI.',
                    'CCSDS. (2020). 131.0-B-4: TM Synchronization and Channel Coding. CCSDS.',
                    'Maral, G., Bousquet, M., & Sun, Z. (2020). Satellite Communications Systems, 6th Ed. Wiley.',
                    'Roddy, D. (2006). Satellite Communications, 4th Ed. McGraw-Hill.',
                    'NFPA. (2023). NFPA 780: Standard for Lightning Protection Systems. NFPA.',
                    'FCC. (2023). 47 CFR Part 25: Satellite Communications. FCC.',
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
    return (<section id={id} className="space-y-4"><h2 className="text-lg font-heading font-semibold text-white"><span className="text-[#8B5CF6] mr-2">{n}.</span>{t}</h2>{children}</section>);
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
