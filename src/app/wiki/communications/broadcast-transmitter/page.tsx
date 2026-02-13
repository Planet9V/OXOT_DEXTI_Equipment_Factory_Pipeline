/**
 * Broadcast Transmitter Site Deep-Dive Reference Architecture.
 * ATSC 3.0, solid-state 10-100 kW, broadband panel antennas, STL links.
 * @module wiki/communications/broadcast-transmitter/page
 */
export const metadata = {
    title: 'Broadcast Transmitter Site — Communications Wiki',
    description: 'TOGAF reference architecture for broadcast transmitter sites: ATSC 3.0 exciter/gateway, solid-state transmitters 10-100 kW, broadband panel/slot antennas, studio-transmitter links, tower systems.',
};
export default function BroadcastTransmitterPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)' }}>📻</div>
                    <div>
                        <span className="text-[10px] text-gray-500 font-mono block">COMU-CB-HEAD · Broadcasting</span>
                        <h1 className="text-2xl font-heading font-bold text-white">Broadcast Transmitter Site Reference Architecture</h1>
                    </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">TOGAF-based reference architecture for television and FM radio broadcast transmitter sites covering ATSC 3.0 (NextGen TV) exciter/gateway, solid-state UHF/VHF transmitters (10–100 kW TPO), broadband panel and slot antennas on guyed/self-supporting towers (300–600 m), studio-transmitter links (STL, microwave/IP), rigid coax/waveguide transmission line, combiner/filter/mask filter systems — governed by FCC Part 73, FAA AC 70/7460, ATSC A/300-series standards.</p>
            </div>
            <S n={1} t="TOGAF Business Architecture" id="togaf">
                <H4>Stakeholder Map</H4>
                <Tbl heads={['Stakeholder', 'Role', 'Interest']} rows={[
                    ['Broadcast Groups', 'Owner/Operator', 'Sinclair, Nexstar, Gray, Tegna, Hearst, Cox Media'],
                    ['FCC', 'Regulatory', 'Part 73 (broadcast), Part 74 (auxiliary), spectrum repack'],
                    ['FAA', 'Aviation Safety', 'Part 77 obstruction, tower marking/lighting, Form 7460-1'],
                    ['ATSC', 'Standards', 'A/300 (system), A/321 (gateway), A/322 (PHY), A/336 (datacasting)'],
                    ['SBE', 'Professional', 'Society of Broadcast Engineers, certification, best practices'],
                    ['Equipment OEMs', 'Supplier', 'GatesAir, Rohde & Schwarz, Dielectric, ERI, Shively'],
                    ['Tower Companies', 'Infrastructure', 'American Tower, Crown Castle, tower lease, co-location'],
                    ['Viewers', 'End User', 'OTA viewers (cord-cutters), datacasting recipients'],
                ]} />
                <H4>Regulatory Framework</H4>
                <Tbl heads={['Standard', 'Title', 'Scope']} rows={[
                    ['FCC Part 73', 'Broadcast Services', 'Power (ERP), antenna height, coverage contour, HAAT'],
                    ['FCC Part 74', 'Auxiliary', 'STL, intercity relay, low-power TV, translator stations'],
                    ['FAA AC 70/7460-1M', 'Obstruction', 'Marking (paint), lighting (red/white/IR), NOTAM filing'],
                    ['ATSC A/322', 'Physical Layer', 'OFDM, 6 MHz channel, LDPC/BCH FEC, bootstrap signaling'],
                    ['ATSC A/321', 'Scheduler/Gateway', 'IP encapsulation, ALP, SFN timing, STLTP transport'],
                    ['NRSC-G201', 'FM HD Radio', 'IBOC, hybrid analog+digital, -20/-14/-10 dBc digital power'],
                    ['NFPA 70A', 'NEC Compliance', 'Electrical installation at tower sites, grounding'],
                ]} />
            </S>
            <S n={2} t="High-Level Design" id="hld">
                <Ascii>{`┌─── STUDIO / MASTER CONTROL ────────────────────────────┐
│ Production → Master control → ATSC 3.0 gateway (A/321)   │
│ IP encapsulation → STLTP (STL Transport Protocol)         │
│ Path: studio → STL (IP/microwave/fiber) → transmitter     │
├─── STL (STUDIO-TRANSMITTER LINK) ─────────────────────┤
│ IP-based: GbE fiber/leased line │ Microwave: 2/7/13 GHz  │
│ Redundancy: dual-path (IP + microwave) or ring            │
├─── TRANSMITTER BUILDING ──────────────────────────────┤
│ ATSC 3.0 exciter (Rohde & Schwarz/GatesAir Maxiva)       │
│ → Solid-state PA modules (LDMOS, 1-5 kW each)            │
│ → Power combiner → Mask filter (spec mask compliance)     │
│ → Transmission line (rigid coax 6⅛″ or waveguide)        │
│ TPO: 10-100 kW │ ERP: up to 1 MW (with antenna gain)     │
├─── TOWER / ANTENNA ───────────────────────────────────┤
│ Self-supporting or guyed tower, 300-600 m AGL             │
│ Broadband panel antenna (Dielectric TUA) or slotted cyl.  │
│ Beam-tilt, null-fill, circular/elliptical polarization    │
│ Side-mount or top-mount, multi-station combiner           │
├─── POWER ─────────────────────────────────────────────┤
│ Utility 480V 3-phase → Main breaker → ATS → Transmitter  │
│ Diesel generator: 300-750 kW (N+1), auto-start            │
│ UPS: 10-30 kVA (exciter/STL/control, not PA)              │
└────────────────────────────────────────────────────────┘`}</Ascii>
            </S>
            <S n={3} t="Detailed Technical Description" id="tech">
                <H4>3.1 ATSC 3.0 Exciter &amp; Gateway</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['ATSC 3.0 Gateway', 'GatesAir / Rohde & Schwarz', 'A/321 scheduler, IP input, ALP, SFN timing via GPS'],
                    ['ATSC 3.0 Exciter', 'R&S THR9, GatesAir Maxiva', 'A/322 PHY, OFDM, FFT 8K/16K/32K, bootstrap, pre-correction'],
                    ['Legacy ATSC 1.0', 'GatesAir Maxiva UAX', '8-VSB, 19.39 Mbps, legacy until sunset'],
                    ['FM Exciter', 'Nautel VS/GatesAir FAX', 'FM stereo + HD Radio (IBOC), RDS, 87.5-108 MHz'],
                    ['GPS Receiver', 'Trimble / Meinberg', '1PPS/10 MHz, SFN timing to ±1 μs, GNSS disciplined'],
                ]} />
                <H4>3.2 Transmitter (Power Amplifier)</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['UHF Transmitter', 'GatesAir Maxiva UAXTE', '10-40 kW TPO, LDMOS solid-state, ATSC 3.0/1.0 dual'],
                    ['VHF Transmitter', 'GatesAir Maxiva VAXT', '1-10 kW, Hi-VHF (RF ch 7-13), LDMOS, N+1 PA modules'],
                    ['FM Transmitter', 'Nautel GV / GatesAir Flexiva', '5-80 kW, solid-state, HD Radio, hot-swap modules'],
                    ['PA Module', 'LDMOS, 1-5 kW', '50V drain, 65-70% efficiency, hot-pluggable'],
                    ['Power Combiner', 'Starpoint/hybrid', 'N-way, PA modules → single output, reject load'],
                ]} />
                <H4>3.3 Antenna &amp; Transmission Line</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['UHF Panel Antenna', 'Dielectric TUA/ERI ROTOTILLER', 'Broadband (470-698 MHz), 12-36 bays, beam-tilt, null-fill'],
                    ['VHF Antenna', 'Dielectric TDM/Shively 6810', 'Batwing or CH 7-13 panel, 4-12 bays, CP'],
                    ['FM Antenna', 'Shively 6813/ERI SHPX', '4-16 bays, circularly polarized, IBW ±200 kHz'],
                    ['Rigid Coax', 'Myat/Dielectric, 6⅛″', '50Ω, <0.3 dB/100 ft at 600 MHz, pressurized (N₂/air)'],
                    ['Waveguide', 'WR-1500 (UHF)', 'Lower loss than coax, 50+ kW, pressurized'],
                    ['Mask Filter', 'Dielectric/Shive', 'Spec mask compliance, ±3 MHz, low insertion loss'],
                ]} />
                <H4>3.4 Tower &amp; Supporting</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Tower (guyed)', 'Pirod/Rohn', '300-600 m AGL, face width 1.5-3 m, guy wire anchors'],
                    ['Tower (self-support)', 'Sabre/Rohn', '100-300 m, tapered, heavier base, no guy wires'],
                    ['Tower Lighting', 'L-864 (red) / L-856 (white)', 'FAA AC 70/7460, dual system, alarm monitoring, IR option'],
                    ['Deicing', 'Myat/Dielectric', 'Hot air or electric heating, antenna/coax, ice sensors'],
                    ['Transmission Line Dehydrator', 'Andrew/RFS', 'Automatic, -40°F dew point, pressurize coax/waveguide'],
                ]} />
            </S>
            <S n={4} t="Process Diagrams" id="process">
                <H4>4.1 ATSC 3.0 Signal Flow</H4>
                <Ascii>{`Studio (A/V production) → Master control → IP encapsulation
→ ATSC 3.0 Gateway (A/321: ALP, scheduling, SFN sync)
→ STLTP over STL (IP/microwave) → Exciter (A/322: OFDM mod)
→ PA chain (LDMOS modules → combiner → mask filter)
→ Rigid coax/waveguide → Antenna → OTA RF → Viewer (CPE/TV)`}</Ascii>
                <H4>4.2 SFN Multi-Transmitter Timing</H4>
                <Ascii>{`GPS 1PPS → Gateway SFN timestamp → STLTP packaging
→ STL delivery → Exciter SFN engine → GPS-disciplined emission
→ All TX emit same OFDM symbols within ±50 μs guard interval
→ Viewer sees constructive combination (diversity gain)`}</Ascii>
                <H4>4.3 Power Failover</H4>
                <Ascii>{`Utility loss → ATS open → Generator auto-start (10-30 sec)
→ ATS close to generator → Transmitter warm restart (60 sec)
→ Extended run (48-72 hr fuel) → Utility restore → Retransfer
→ UPS maintains exciter/STL/control through generator start`}</Ascii>
            </S>
            <S n={5} t="Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2 italic">Full-power UHF TV station (ATSC 3.0) with FM co-location</p>
                <Tbl heads={['Equipment', 'Qty', 'Specification']} rows={[
                    ['ATSC 3.0 Gateway', '1', 'A/321, scheduler, SFN, IP input'],
                    ['ATSC 3.0 Exciter', '1 (1+1)', 'A/322, OFDM, pre-correction, GPS'],
                    ['UHF Transmitter', '1 (main+aux)', '25-40 kW TPO, LDMOS, N+1 PA'],
                    ['FM Transmitter', '1', '20-50 kW, HD Radio, hot-swap'],
                    ['UHF Panel Antenna', '1 system', '24 bays, CP, beam-tilt, null-fill'],
                    ['FM Antenna', '1 system', '8 bays, CP, ±200 kHz IBW'],
                    ['Rigid Coax (6⅛″)', '300-600 m', '50Ω, pressurized, bullet connectors'],
                    ['Mask Filter', '1', 'Spec compliance, low insertion loss'],
                    ['RF Combiner', '1', 'If multi-station on same antenna'],
                    ['STL System', '2 (1+1)', 'IP + microwave, redundant path'],
                    ['GPS Receiver', '2', 'SFN timing, 1+1 redundant, GPSDO'],
                    ['Tower (guyed)', '1', '300-600 m, FAA registered'],
                    ['Tower Lighting', '1 dual set', 'L-864/L-856, alarm, IR option'],
                    ['Deicing System', '1', 'Hot air or electric, ice sensors'],
                    ['Dehydrator', '1', 'Auto, -40°F, coax/waveguide pressure'],
                    ['Diesel Generator', '2', '500-750 kW, N+1, 72 hr fuel'],
                    ['ATS', '1', 'Utility/gen switchover, bypass'],
                    ['UPS', '1', '15-30 kVA, exciter/STL/control only'],
                    ['HVAC', '2', 'Transmitter room cooling, 30-60 kW'],
                    ['EAS Encoder', '1', 'FCC Part 11, CAP/IPAWS'],
                    ['Remote Control', '1', 'Burk/Davicom, FCC compliant, SNMP'],
                ]} />
            </S>
            <S n={6} t="Purdue Model / ISA-95 Mapping" id="purdue">
                <Tbl heads={['Level', 'Function', 'Components', 'Protocols']} rows={[
                    ['L0', 'Sensing', 'Forward/reflected power, VSWR, PA temp, tower light alarm', 'Analog, contact closures, SNMP'],
                    ['L1', 'Control', 'Exciter, PA controller, ATS, dehydrator, deicing', 'Serial, Ethernet, ModBus'],
                    ['L2', 'Supervisory', 'Remote control (Burk ARC/Davicom), STL monitor', 'SNMP v3, web GUI, FSK telemetry'],
                    ['L3', 'Operations', 'Master control, automation, traffic/scheduling', 'STLTP, MOS, IP, REST'],
                    ['L3.5', 'DMZ', 'Firewall, VPN (STL over IP), log collector', 'TLS, IPsec, SSH'],
                    ['L4', 'Enterprise', 'Program scheduling, ad sales, FCC filing, engineering', 'HTTPS, FCC CDBS, LMS'],
                ]} />
            </S>
            <S n={7} t="Safety &amp; Supporting Systems" id="safety">
                <Tbl heads={['System', 'Standard', 'Specification']} rows={[
                    ['RF Exposure', 'FCC OET-65', 'Controlled environment at tower base, MPE exclusion zones'],
                    ['Tower Climbing', 'OSHA 1926.502', '100% tie-off, rescue plan, weather limits, medical clearance'],
                    ['Tower Structural', 'TIA-222-H', 'Wind/ice/seismic, periodic inspection, mod analysis'],
                    ['Lightning', 'NFPA 780 / R56', 'Air terminal, down conductor, ground ring, SPD'],
                    ['Fire Suppression', 'NFPA 68/69', 'Transmitter room, clean agent, smoke detection'],
                    ['Coax Pressurization', 'Dehydrator', '3-5 PSI N₂/dry air, leak alarm, auto-fill'],
                ]} />
            </S>
            <S n={8} t="Communication Protocol Stack" id="protocols">
                <Ascii>{`Enterprise:  FCC filing (LMS) │ Traffic/scheduling │ Ad sales
Application: Remote control (SNMP/ModBus) │ EAS (CAP) │ RDS
Transport:   STLTP (RFC-like, A/324) │ IP/UDP │ AES67 (audio)
Network:     IP │ MPLS │ Microwave STL (analog/digital)
Data Link:   Ethernet 1/10GE │ SDI (HD/3G) │ AES3 (audio)
Broadcast:   ATSC 3.0 (OFDM, 6 MHz, LDPC/BCH) │ ATSC 1.0 (8-VSB)
Physical:    Rigid coax (6⅛″) │ Waveguide (WR-1500) │ OTA RF`}</Ascii>
            </S>
            <S n={9} t="Data Flow Architecture" id="data-flow">
                <Ascii>{`Studio (L3)          STL (L2)            Transmitter (L1)
Master control──IP──►STL Tx──────────►STL Rx → Exciter/Gateway
                     (fiber/μwave)     OFDM mod → PA → Antenna
                                            │ OTA
                                            ▼
                                       Viewer CPE / TV
Remote Control (L2)
Burk ARC◄─SNMP──►PA status / VSWR / power
Tower lights◄──►FAA alarm / NOTAM
EAS◄─CAP/IPAWS──►FCC forced message

Enterprise (L4)
FCC filing◄───►Program schedule / ad traffic`}</Ascii>
            </S>
            <S n={10} t="References" id="references">
                <Refs items={[
                    'ATSC. (2023). A/300: ATSC 3.0 System Discovery and Signaling. ATSC.',
                    'ATSC. (2022). A/322: Physical Layer Protocol (ATSC 3.0). ATSC.',
                    'ATSC. (2022). A/321: System Discovery and Gateway. ATSC.',
                    'FCC. (2023). 47 CFR Part 73: Radio Broadcast Services. FCC.',
                    'TIA. (2018). TIA-222-H: Structural Standard for Antenna Supporting Structures. TIA.',
                    'FAA. (2020). AC 70/7460-1M: Obstruction Marking and Lighting. FAA.',
                    'GatesAir. (2023). Maxiva UAXTE UHF Transmitter Technical Manual. GatesAir.',
                    'NIST. (2023). SP 800-82r3: Guide to OT Security. NIST.',
                ]} />
            </S>
            <SeeAlso links={[
                { href: '/wiki/communications', label: 'Communications Hub', color: '#3B82F6' },
                { href: '/wiki/sectors/COMU', label: 'Sector Overview', color: '#3B82F6' },
                { href: '/wiki/communications/cable-headend', label: 'Cable TV Headend', color: '#EF4444' },
            ]} />
        </div>
    );
}
function S({ n, t, id, children }: { n: number; t: string; id: string; children: React.ReactNode }) {
    return (<section id={id} className="space-y-4"><h2 className="text-lg font-heading font-semibold text-white"><span className="text-[#F59E0B] mr-2">{n}.</span>{t}</h2>{children}</section>);
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
