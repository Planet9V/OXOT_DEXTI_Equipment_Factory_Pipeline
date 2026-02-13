/**
 * Cable TV Headend Deep-Dive Reference Architecture.
 * CCAP/CMTS, DOCSIS 3.1/4.0, HFC plant, fiber nodes, VOD.
 * @module wiki/communications/cable-headend/page
 */
export const metadata = {
    title: 'Cable TV Headend — Communications Wiki',
    description: 'TOGAF reference architecture for cable TV headends: CCAP/CMTS (Cisco cBR-8, Harmonic CableOS), DOCSIS 3.1/4.0, HFC plant, fiber nodes, MPEG encoding, QAM/OFDM modulation, VOD servers.',
};
export default function CableHeadendPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #EF4444, #DC2626)' }}>📺</div>
                    <div>
                        <span className="text-[10px] text-gray-500 font-mono block">COMU-CB-HEAD</span>
                        <h1 className="text-2xl font-heading font-bold text-white">Cable TV Headend / Hub Reference Architecture</h1>
                    </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">TOGAF-based reference architecture for cable television headends covering satellite receive (C/Ku-band dishes), MPEG-2/H.264/H.265 encoding, QAM/OFDM modulation, CCAP/CMTS platforms (Cisco cBR-8, Harmonic CableOS, Casa CCAP), DOCSIS 3.1/4.0 broadband, HFC fiber-to-node plant, VOD/CDN servers, EAS integration — governed by FCC Part 76, SCTE standards, CableLabs DOCSIS specifications.</p>
            </div>
            <S n={1} t="TOGAF Business Architecture" id="togaf">
                <H4>Stakeholder Map</H4>
                <Tbl heads={['Stakeholder', 'Role', 'Interest']} rows={[
                    ['MSOs', 'Owner/Operator', 'Comcast (Xfinity), Charter (Spectrum), Cox, Altice, Mediacom'],
                    ['CableLabs', 'R&D', 'DOCSIS 3.1/4.0 specs, SNMP MIBs, interoperability testing'],
                    ['SCTE', 'Standards', 'SCTE 40 (digital), SCTE 130 (advertising), SCTE 35 (signaling)'],
                    ['FCC', 'Regulatory', 'Part 76 (cable TV), must-carry, EAS, CALEA, leakage limits'],
                    ['Content Providers', 'Programmer', 'Disney/ESPN, NBCUniversal, WarnerMedia, via satellite feeds'],
                    ['Equipment OEMs', 'Supplier', 'Cisco, Harmonic, Casa Systems, CommScope, ATX Networks'],
                    ['Subscribers', 'End User', 'Residential/business, video, broadband, voice triple-play'],
                ]} />
                <H4>Regulatory Framework</H4>
                <Tbl heads={['Standard', 'Title', 'Scope']} rows={[
                    ['FCC Part 76', 'Cable Television', 'Must-carry, retransmission consent, leakage (-20 dBmV/m)'],
                    ['CableLabs DOCSIS 3.1', 'Broadband', 'OFDM, 2× 192 MHz OFDM blocks, 10G downstream'],
                    ['CableLabs DOCSIS 4.0', 'Extended Spectrum', 'FDX (full-duplex), ESD (extended spectrum), 10G symmetrical'],
                    ['SCTE 40', 'Digital Cable', 'QAM/OFDM signal levels, CNR, BER, MER requirements'],
                    ['SCTE 35', 'Digital Cue', 'Splice insert, ad insertion triggers, signaling'],
                    ['FCC EAS', 'Emergency Alert', 'CAP (Common Alerting Protocol), IPAWS, forced tune'],
                    ['CALEA', 'Lawful Intercept', 'Wiretap for broadband, PacketCable, mediation device'],
                ]} />
            </S>
            <S n={2} t="High-Level Design" id="hld">
                <Ascii>{`┌─── SATELLITE RECEIVE ─────────────────────────────────┐
│ C/Ku dishes (3-5 m) × 8-20 → LNB → IRD/receivers       │
│ Content decrypt (Motorola/Cisco PowerVu/BISS)            │
├─── SIGNAL PROCESSING ────────────────────────────────┤
│ MPEG encoder/transcoder (HEVC/H.264) → statistical mux  │
│ Ad insertion (SCTE 35 splice) → EAS crawl → multiplexer  │
│ Encryption (PowerKEY/MediaCipher, CAS/DRM)               │
├─── CCAP/CMTS (DOCSIS) ──────────────────────────────┤
│ Cisco cBR-8 / Harmonic CableOS / Casa C100G              │
│ Downstream: QAM (256-QAM) + OFDM (4096-QAM) → RF        │
│ Upstream: ATDMA + OFDMA → demod → IP → core network      │
│ DOCSIS 3.1: 32×8 bonded + 2× 192 MHz OFDM = 10 Gbps DS  │
├─── HFC PLANT ─────────────────────────────────────────┤
│ Headend optical Tx (1550 nm EDFA) → trunk fiber           │
│ → Fiber node (1310/1550 nm) → coax (500/750/1000 MHz)    │
│ → Taps/splitters → Drop (RG-6/11) → Cable modem (CPE)    │
│ RF amplifiers: line extender, trunk amp, bridger amp      │
├─── DATA / VOD ────────────────────────────────────────┤
│ VOD servers (CDN, origin) → MPEG-DASH/HLS → STB/app      │
│ Core router (Cisco ASR) → CMTS → Internet peering         │
│ DHCP/TFTP/ToD → CM provisioning → subscriber management  │
├─── POWER ─────────────────────────────────────────────┤
│ Utility (480V) → ATS → UPS (N+1) → -48 VDC + 120 VAC   │
│ Diesel generator (200-500 kW) → 8-24 hr fuel             │
│ HFC powering: 60/90 VAC on coax → node/amp (ferroresonant│
└────────────────────────────────────────────────────────┘`}</Ascii>
            </S>
            <S n={3} t="Detailed Technical Description" id="tech">
                <H4>3.1 Satellite Receive &amp; Signal Processing</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Receive Antenna', 'C/Ku-band, 3-5 m', '8-20 dishes, LNB, dual-pol, auto-redundancy'],
                    ['IRD/Receiver', 'Cisco D9800/Harmonic', 'Decryption (PowerVu), ASI/IP output, MPEG-2/4 decode'],
                    ['Encoder', 'Harmonic VOS360/Elemental', 'HEVC/H.264, 4K/HD/SD, statistical multiplexing'],
                    ['Ad Splicer', 'SCTE 35/130 compliant', 'Zone-addressable, VOD/linear, dynamic ad insertion'],
                    ['EAS Equipment', 'Sage/TFT EAS encoder', 'FCC-mandated, CAP/IPAWS, audio/video/crawl overlay'],
                ]} />
                <H4>3.2 CCAP/CMTS Platform</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['CCAP (integrated)', 'Cisco cBR-8', '48× downstream RF, DOCSIS 3.1, 500K+ modems, SUP-160G'],
                    ['vCCAP (virtual)', 'Harmonic CableOS', 'Virtualized CMTS on COTS x86, DAA (R-PHY/R-MACPHY)'],
                    ['Remote PHY Node', 'CommScope/ATX', '1.2 GHz, coax OFDM, shelf or strand-mount, 10G SFP+'],
                    ['Cable Modem (CPE)', 'DOCSIS 3.1', '32×8 SC-QAM + OFDM, 1-10 Gbps DS, 200 Mbps-1 Gbps US'],
                    ['CMTS Line Card', 'Cisco/Casa', '16 DS/US ports, 256-QAM/4096-QAM, OFDMA upstream'],
                ]} />
                <H4>3.3 HFC Outside Plant</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Optical Transmitter', '1550 nm EDFA', '17-20 dBm, externally modulated, trunk/distribution'],
                    ['Fiber Node', 'CommScope/ATX', '1 GHz, 4× coax output, optical Rx/Tx, 1310/1550 nm'],
                    ['RF Amplifier', 'CommScope/ATX', 'Trunk/bridger, 750-1200 MHz, 40 dBmV output, AGC'],
                    ['Tap/Splitter', 'Regal/PPC', 'Multi-tap (2/4/8 port), directional coupler, 5-1200 MHz'],
                    ['Coax Cable', 'QR 540/QR 860', '500-1000 MHz, trunk (0.540″), feeder (0.500″), drop (RG-6)'],
                ]} />
                <H4>3.4 Data Services &amp; VOD</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['VOD Server', 'CDN origin', 'Harmonic/Ericsson, 500+ concurrent streams, MPEG-DASH'],
                    ['Core Router', 'Cisco ASR 9000', '100GE, MPLS, BGP, internet peering, CGNAT'],
                    ['DHCP/TFTP Server', 'ISC DHCP/Linux', 'Cable modem provisioning, config file, ToD'],
                    ['DNS/RADIUS', 'FreeRADIUS', 'Subscriber auth, usage accounting, walled garden'],
                ]} />
            </S>
            <S n={4} t="Process Diagrams" id="process">
                <H4>4.1 Video Signal Path</H4>
                <Ascii>{`Satellite dish → LNB → IRD (decrypt/decode) → ASI/IP
→ Encoder (HEVC) → Stat mux → Encryption (CAS)
→ QAM modulator (CCAP) → RF combiner → Optical Tx (1550nm)
→ Fiber trunk → Node → Coax → Tap → STB (decrypt/decode)
→ HDMI → TV display`}</Ascii>
                <H4>4.2 DOCSIS Provisioning</H4>
                <Ascii>{`Cable modem power-on → Scan downstream → Lock QAM/OFDM
→ Acquire UCD (upstream channel descriptor) → Ranging
→ DHCP discover → IP assignment → TFTP config download
→ Registration (REG-REQ/RSP) → BPI+ encryption init
→ Online → Speed tier enforcement → Subscriber active`}</Ascii>
                <H4>4.3 HFC Power Flow</H4>
                <Ascii>{`Utility AC (120/240V) → Power supply (90V AC, ferroresonant)
→ Coax trunk AC + RF signal (frequency multiplexed)
→ Amplifier/node power extractor → regulated DC internally
→ Battery backup (4-8 hr) at power supply location
→ Coax powering: ~15 amps, 60/90 VAC, 90V preferred`}</Ascii>
            </S>
            <S n={5} t="Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2 italic">Regional cable headend serving 200,000+ subscribers</p>
                <Tbl heads={['Equipment', 'Qty', 'Specification']} rows={[
                    ['Satellite Receive Antenna', '10-20', '3-5 m, C/Ku-band, dual-pol, LNB'],
                    ['IRD/Satellite Receiver', '20-40', 'H.264/HEVC decode, PowerVu, ASI/IP out'],
                    ['Video Encoder', '4-8', 'HEVC, 4K/HD, statistical mux, redundant'],
                    ['Ad Insertion System', '1', 'SCTE 35/130, zone-addressable, DAI'],
                    ['EAS Encoder', '1', 'Sage/TFT, FCC Part 11, CAP/IPAWS'],
                    ['CCAP (Cisco cBR-8)', '2-4', '48 DS ports, DOCSIS 3.1, 500K modems'],
                    ['Remote PHY Node', '200-500', '1.2 GHz, R-PHY/R-MACPHY, strand/shelf'],
                    ['Optical Transmitter', '4-8', '1550 nm EDFA, 17 dBm, trunk'],
                    ['Fiber Node', '500-2000', '1 GHz, 4-output, serve 50-500 homes'],
                    ['RF Amplifier', '1000-5000', 'Trunk/bridger, 1.2 GHz, AGC'],
                    ['VOD/CDN Server', '4-8', '500+ streams, MPEG-DASH, storage'],
                    ['Core Router', '2', 'Cisco ASR 9000, 100GE, BGP'],
                    ['DHCP/Provisioning', '2', 'ISC DHCP, TFTP, ToD, redundant'],
                    ['UPS', '2-4', '100-200 kVA, online, N+1'],
                    ['Diesel Generator', '2', '300-500 kW, N+1, 24 hr fuel'],
                    ['HVAC', '4-8', 'Precision cooling, N+1, 30 kW each'],
                    ['HFC Power Supply', '500-2000', '90 VAC, ferroresonant, 4-8 hr battery'],
                    ['Headend Combiner', '4-8', 'RF combining network, band filters'],
                    ['Monitoring (SNMP)', '1', 'Headend/plant monitoring, HFC ingress'],
                    ['Physical Security', '1', 'Badge, CCTV, NOC, 24/7 staffed'],
                ]} />
            </S>
            <S n={6} t="Purdue Model / ISA-95 Mapping" id="purdue">
                <Tbl heads={['Level', 'Function', 'Components', 'Protocols']} rows={[
                    ['L0', 'Sensing', 'RF levels, laser power, node voltage, temp, ingress', 'Analog, SNMP traps, DOCSIS MIBs'],
                    ['L1', 'Control', 'QAM/OFDM modulator, R-PHY node, encoder, power supply', 'DOCSIS, DEPI (R-PHY), GCP'],
                    ['L2', 'Supervisory', 'CCAP manager, plant monitoring (Viavi), spectrum analyzer', 'SNMP v3, DOCSIS OSSI'],
                    ['L3', 'Operations', 'OSS/BSS, subscriber management, provisioning, NOC', 'REST, SOAP, TR-069, PCMM'],
                    ['L3.5', 'DMZ', 'Firewall, CMTS-to-billing gateway, lawful intercept', 'TLS, IPsec, CALEA mediation'],
                    ['L4', 'Enterprise', 'Billing (CSG, Amdocs), CRM, self-service portal', 'HTTPS, REST, EDI'],
                ]} />
            </S>
            <S n={7} t="Safety &amp; Supporting Systems" id="safety">
                <Tbl heads={['System', 'Standard', 'Specification']} rows={[
                    ['Signal Leakage', 'FCC Part 76', 'CLI (cumulative leakage index), <20 μV/m at 3 m, patrol'],
                    ['EAS Compliance', 'FCC Part 11', 'Emergency Alert System, CAP, forced-tune, weekly test'],
                    ['Fire Suppression', 'NFPA 76', 'Clean agent (FM-200), VESDA, headend fire rated'],
                    ['HFC Powering Safety', 'NEC Article 820', 'Coax bonding, ground block, 90 VAC safety, GFCI'],
                    ['Laser Safety', 'ANSI Z136.1', 'Class 1M, fiber warning labels, interlocks on patch panels'],
                    ['Physical Security', 'TIA-942', 'Badge access, CCTV, 24/7 NOC monitoring'],
                ]} />
            </S>
            <S n={8} t="Communication Protocol Stack" id="protocols">
                <Ascii>{`Enterprise:  Billing/CRM │ BSS │ Self-service │ REST/SOAP
Application: SNMP v3 │ DOCSIS OSSI │ TR-069 (CPE) │ SCTE 35
Transport:   DOCSIS 3.1 (OFDM/OFDMA) │ DEPI (R-PHY) │ GCP
Network:     IP/MPLS │ BGP │ IGMP (multicast) │ DHCP/TFTP
Data Link:   Ethernet 10G/100G │ 256-QAM SC │ 4096-QAM OFDM
Physical:    SMF (1310/1550 nm) │ Coax (QR 540/RG-6) │ 5-1218 MHz`}</Ascii>
            </S>
            <S n={9} t="Data Flow Architecture" id="data-flow">
                <Ascii>{`Content (L0)      Headend (L1)          Distribution (L2)
Sat dish──►IRD──►Encoder──►CCAP──►Optical Tx──►Node──►Coax
                                   │ DOCSIS
                                   ▼
Cable modem──►DOCSIS upstream──►CCAP──►Core router──►Internet

Operations (L3)                Enterprise (L4)
Plant monitoring◄─SNMP──────►NOC dashboard
Provisioning (DHCP)◄─OSSI──►Billing (CSG/Amdocs)
Ad insertion◄─SCTE 35────────►Revenue/analytics`}</Ascii>
            </S>
            <S n={10} t="References" id="references">
                <Refs items={[
                    'CableLabs. (2020). CM-SP-MULPIv3.1: DOCSIS 3.1 MAC and Upper Layer Protocols. CableLabs.',
                    'CableLabs. (2023). CM-SP-MULPIv4.0: DOCSIS 4.0 Specification. CableLabs.',
                    'SCTE. (2020). SCTE 40: Digital Cable Network Interface Standard. SCTE.',
                    'SCTE. (2020). SCTE 35: Digital Program Insertion Cueing. SCTE.',
                    'FCC. (2023). 47 CFR Part 76: Multichannel Video and Cable Television. FCC.',
                    'Large, D., & Farmer, J. (2009). Broadband Cable Access Networks (MoCA). Elsevier.',
                    'The Open Group. (2022). TOGAF Standard, Version 10.',
                    'NIST. (2023). SP 800-82r3: Guide to OT Security. NIST.',
                ]} />
            </S>
            <SeeAlso links={[
                { href: '/wiki/communications', label: 'Communications Hub', color: '#3B82F6' },
                { href: '/wiki/sectors/COMU', label: 'Sector Overview', color: '#3B82F6' },
                { href: '/wiki/communications/broadcast-transmitter', label: 'Broadcast Transmitter', color: '#F59E0B' },
            ]} />
        </div>
    );
}
function S({ n, t, id, children }: { n: number; t: string; id: string; children: React.ReactNode }) {
    return (<section id={id} className="space-y-4"><h2 className="text-lg font-heading font-semibold text-white"><span className="text-[#EF4444] mr-2">{n}.</span>{t}</h2>{children}</section>);
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
