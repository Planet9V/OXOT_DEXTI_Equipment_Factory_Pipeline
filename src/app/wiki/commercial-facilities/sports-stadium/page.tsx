/**
 * Sports Stadium Reference Architecture — Deep Dive.
 * @module wiki/commercial-facilities/sports-stadium/page
 */
export const metadata = {
    title: 'Sports Stadium Reference Architecture — Wiki',
    description: 'TOGAF-based reference architecture for major sports stadiums: power distribution, LED lighting, DAS/Wi-Fi, broadcast, crowd management.',
};
const C = '#10B981';

export default function SportsStadiumPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <header className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]" style={{ background: C }} />
                    <span className="text-xs font-mono text-gray-500">COMM · Public Assembly · Sports Stadium</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">Sports Stadium Reference Architecture</h1>
                <p className="text-sm text-gray-400 max-w-3xl leading-relaxed">
                    A modern 30,000–80,000+ seat stadium requires 15–30 MW electrical distribution, 2,500+ lux LED field lighting for 4K/8K broadcast, distributed antenna systems (DAS) and Wi-Fi 6E for 80,000+ concurrent devices, 4K/8K video boards, and NFPA 101/102 compliant crowd management and mass notification systems.
                </p>
            </header>

            <Section title="1. TOGAF Business Architecture" id="togaf">
                <h3 className="text-sm font-semibold text-white mb-2">Key Stakeholders</h3>
                <ul className="list-disc list-inside text-xs text-gray-400 space-y-1 mb-4">
                    <li><span className="text-[#10B981] font-medium">Team Owner / Venue Operator</span> — revenue, event scheduling, capital planning</li>
                    <li><span className="text-[#10B981] font-medium">League (NFL/FIFA/UEFA)</span> — broadcast standards, field specs, safety mandates</li>
                    <li><span className="text-[#10B981] font-medium">City/County Authority</span> — public safety, traffic management, bond obligations</li>
                    <li><span className="text-[#10B981] font-medium">Fire Marshal / AHJ</span> — crowd capacity, means of egress, mass notification</li>
                    <li><span className="text-[#10B981] font-medium">Broadcast Networks</span> — SMPTE ST 2110, 4K/8K production, fibre infrastructure</li>
                    <li><span className="text-[#10B981] font-medium">Concessionaire</span> — POS systems, commercial kitchen exhaust, cold chain</li>
                </ul>
                <h3 className="text-sm font-semibold text-white mb-2">Regulatory Framework</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead><tr className="border-b border-white/[0.08] text-gray-500">
                            <th className="text-left px-3 py-2 font-medium">Standard</th>
                            <th className="text-left px-3 py-2 font-medium">Scope</th>
                        </tr></thead>
                        <tbody className="text-gray-400">
                            {[['IBC Assembly A-5', 'Outdoor stadium and arena provisions, structural'], ['NFPA 101/102', 'Assembly life safety, stadia specific, crowd movement'], ['NFPA 13/72', 'Sprinklers (enclosed areas) and fire alarm with mass notif'], ['ASHRAE 90.1', 'Energy for enclosed concourses, suites, and press boxes'], ['FIFA/UEFA Regs', 'Technical recommendations for stadia lighting, pitch quality'], ['FCC Broadcast', 'Wireless spectrum, DAS licensing, CBRS/5G'], ['ADA', 'Wheelchair seating (1% + 1), paths of travel, companion seats'], ['NFPA 96', 'Commercial kitchen exhaust for concessions']].map(([s, sc]) => (
                                <tr key={s} className="border-b border-white/[0.04]"><td className="px-3 py-2 font-medium whitespace-nowrap" style={{ color: C }}>{s}</td><td className="px-3 py-2">{sc}</td></tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="2. High-Level Design" id="design">
                <p className="text-sm text-gray-400 mb-4">Stadium MEP and IT architecture with distributed MV/LV switchgear, field lighting, venue-wide DAS, broadcast compound, and centralised operations center.</p>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`┌──────────────────────────────────────────────────────────────┐
│            SPORTS STADIUM — SYSTEM ARCHITECTURE             │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  UTILITY (13.8 kV) ──► MV SWGR ──► SUBSTATIONS (6-12)      │
│    │                       │           │                     │
│  GENSET FARM           TIE BUS     480V/208V                │
│  (2-5 MW × 4-8)          │        DISTRIBUTION              │
│                           │           │                      │
│  ┌────────┬──────────┬────┴───┬───────┴───┬──────┐          │
│  │ FIELD  │ VIDEO    │ DAS/  │CONCOURSE │PRESS │          │
│  │LIGHTING│ BOARDS   │Wi-Fi  │HVAC/POS  │ BOX  │          │
│  │2500lux │ 4K/8K    │80K+   │AHU/RTU   │SUITE │          │
│  │LED     │ RIBBON   │devices│KITCHEN   │BRDCST│          │
│  └────────┴──────────┴───────┴──────────┴──────┘          │
│                                                              │
│  VENUE OPERATIONS CENTER (VOC)                               │
│  BMS · CCTV · DAS NOC · Crowd Analytics · Mass Notif.      │
│                                                              │
│  BROADCAST COMPOUND  SMPTE ST 2110 · OB Trucks · Fibre     │
└──────────────────────────────────────────────────────────────┘`}</pre>
                </div>
            </Section>

            <Section title="3. Detailed Technical Description" id="technical">
                <h3 className="text-sm font-semibold text-white mb-2">3.1 Power &amp; Distribution</h3>
                <ul className="list-disc list-inside text-xs text-gray-400 space-y-1 mb-4">
                    <li>MV switchgear: 13.8 kV, 6–12 unit substations, 2–10 MVA transformers</li>
                    <li>Generators: 4–8 × 2–5 MW diesel, paralleling, N+1, 72-hour fuel</li>
                    <li>UPS: 2 × 500 kVA for VOC/broadcast, 4 × 200 kVA for DAS/network</li>
                    <li>Peak demand: 15–30 MW during game day with lighting, AV, and HVAC</li>
                </ul>
                <h3 className="text-sm font-semibold text-white mb-2">3.2 HVAC &amp; Plumbing</h3>
                <ul className="list-disc list-inside text-xs text-gray-400 space-y-1 mb-4">
                    <li>Suite/press HVAC: 50–100 RTU/AHU units, 5–30 ton each, DX/CHW</li>
                    <li>Concourse ventilation: large-volume fans, 6–10 ACH, smoke exhaust capability</li>
                    <li>Plumbing: fixture count per IBC occupancy (1:75M/1:40F), backflow preventers</li>
                    <li>Kitchen exhaust: NFPA 96 Type I hoods, Ansul wet chem, 100+ concession points</li>
                </ul>
                <h3 className="text-sm font-semibold text-white mb-2">3.3 Field/Event Lighting &amp; AV</h3>
                <ul className="list-disc list-inside text-xs text-gray-400 space-y-1 mb-4">
                    <li>LED field lighting: 1,000–2,000+ fixtures, 2,500+ lux, CRI &gt;90, &lt;1ms strobe</li>
                    <li>DMX512/sACN control: 100+ universes, show sequencing, instant on/off</li>
                    <li>Video boards: 4K/8K LED, 2,000–10,000 sq ft, ribbon boards, fascia displays</li>
                    <li>Audio: Dante/AES67, 100+ line arrays, 95+ dBA coverage, delay towers</li>
                </ul>
                <h3 className="text-sm font-semibold text-white mb-2">3.4 IT / Telecom / DAS</h3>
                <ul className="list-disc list-inside text-xs text-gray-400 space-y-1 mb-4">
                    <li>DAS: multi-carrier (AT&T/Verizon/T-Mobile), LTE/5G, CBRS, 200+ remote units</li>
                    <li>Wi-Fi 6E: 1,500–3,000+ APs, 6 GHz tri-band, under-seat deployment, 80K+ devices</li>
                    <li>CCTV: 500–2,000+ cameras, 4K, AI video analytics for crowd density</li>
                    <li>POS: 500–1,000+ terminals, EMV/NFC, mobile ordering, cashless options</li>
                </ul>
                <h3 className="text-sm font-semibold text-white mb-2">3.5 Fire / Life Safety &amp; Crowd Mgmt</h3>
                <ul className="list-disc list-inside text-xs text-gray-400 space-y-1">
                    <li>Mass notification: NFPA 72 Ch.24, 70+ dBA, voice evac, multi-language</li>
                    <li>Crowd flow: gate counters, density analytics, dynamic wayfinding signage</li>
                    <li>ATFP: vehicle barriers, bollards, magnetometers, bag screening</li>
                    <li>Emergency evacuation: NFPA 101/102, 8-min full evacuation target</li>
                </ul>
            </Section>

            <Section title="4. Process Diagrams" id="process">
                <h3 className="text-sm font-semibold text-white mb-2">4.1 Field Lighting Control</h3>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`LIGHTING CONTROLLER ──► sACN/DMX512 ──► LED DRIVERS (1,000-2,000+)
       │                                     │
  Show Sequencer                        2,500+ lux @ pitch
  Instant On/Off                        CRI > 90
  100+ DMX Universes                    <1ms strobe for 4K/8K
       │
VOC (Venue Ops Center) ◄── BACnet/IP ── Energy Metering`}</pre>
                </div>
                <h3 className="text-sm font-semibold text-white mt-6 mb-2">4.2 DAS / Wi-Fi Architecture</h3>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`CARRIER BTS (AT&T/VZ/TMo) ──► DAS HEAD-END ──► REMOTE UNITS (200+)
  │  LTE/5G/CBRS                                    │
  │                                           Under-seat / overhead
  ▼                                                  │
Wi-Fi 6E CONTROLLER ──► APs (1,500-3,000+) ────────┘
  │  6 GHz tri-band       Under-seat deployment
  │  80,000+ concurrent   10 Gbps fibre backhaul
  ▼
DAS NOC (VOC) ──► Spectrum Analysis · KPI Dashboard`}</pre>
                </div>
                <h3 className="text-sm font-semibold text-white mt-6 mb-2">4.3 Crowd Management Flow</h3>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`GATE COUNTERS ──► Crowd Analytics ──► VOC Dashboard
CCTV (500-2K) ──► AI Video Analytics ──► Density Heat Map
                                              │
MASS NOTIFICATION ◄── Trigger ────────────────┘
  │  NFPA 72 Ch.24
  ▼
VOICE EVAC + SIGNAGE ──► 8-min evacuation target`}</pre>
                </div>
            </Section>

            <Section title="5. Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2">Scaled for a 65,000-seat NFL/FIFA-class stadium.</p>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead><tr className="border-b border-white/[0.08] text-gray-500">
                            <th className="text-left px-3 py-2 font-medium">Equipment</th>
                            <th className="text-left px-3 py-2 font-medium">Spec</th>
                            <th className="text-left px-3 py-2 font-medium">Qty</th>
                            <th className="text-left px-3 py-2 font-medium">Rating</th>
                        </tr></thead>
                        <tbody className="text-gray-400">
                            {[['MV Transformer', 'Oil-filled, pad-mount', '6–12', '2–10 MVA'], ['Diesel Generator', 'Paralleling, N+1', '4–8', '2–5 MW'], ['LED Field Fixture', 'High-mast, 2500+ lux, CRI>90', '1,000–2,000+', '1–2 kW each'], ['Video Board Panel', '4K/8K LED, fine-pitch', '2,000–10,000 sq ft', 'Per display'], ['DAS Remote Unit', 'Multi-carrier LTE/5G', '200+', 'Per sector'], ['Wi-Fi 6E AP', 'Under-seat, tri-band', '1,500–3,000+', '6 GHz'], ['CCTV Camera', '4K PTZ/fixed, AI analytics', '500–2,000+', 'ONVIF'], ['Line Array Speaker', 'Dante/AES67, 95+ dBA', '100+', 'Per section'], ['POS Terminal', 'EMV/NFC, mobile order', '500–1,000+', 'Per stand'], ['RTU/AHU', 'Suites, concourse HVAC', '50–100', '5–30 ton'], ['Fire Pump', 'Electric, concourse supply', '2–4', '1,000–2,000 GPM'], ['Mass Notif Speaker', 'NFPA 72 Ch.24, 70+ dBA', '500+', 'Per zone'], ['UPS System', 'VOC/broadcast/DAS', '6–10', '200–500 kVA'], ['Gate Counter', 'Bidirectional, infrared', '50–100', 'Per entrance'], ['Bollard/Barrier', 'ATFP, K-rated', '200+', 'K8–K12'], ['Kitchen Hood', 'NFPA 96 Type I, Ansul', '100+', 'Per station'], ['Fibre Backbone', 'OS2 SM, MPO/MTP', '100+ km', 'Per ring'], ['Broadcast Panel', 'SMPTE 2110, 25G', '20+', 'Per OB truck'], ['BMS Controller', 'BACnet/IP DDC', '50–100', 'Per zone'], ['Crowd Analytics Server', 'GPU, real-time video AI', '4–8', 'Per sector']].map(([e, s, q, r]) => (
                                <tr key={e} className="border-b border-white/[0.04]"><td className="px-3 py-2 font-medium whitespace-nowrap" style={{ color: C }}>{e}</td><td className="px-3 py-2">{s}</td><td className="px-3 py-2">{q}</td><td className="px-3 py-2">{r}</td></tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="6. Purdue Model Mapping" id="purdue">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead><tr className="border-b border-white/[0.08] text-gray-500">
                            <th className="text-left px-3 py-2 font-medium">Level</th>
                            <th className="text-left px-3 py-2 font-medium">Components</th>
                            <th className="text-left px-3 py-2 font-medium">Protocols</th>
                        </tr></thead>
                        <tbody className="text-gray-400">
                            {[['L4 Enterprise', 'League cloud, team ERP, ticketing, sponsor analytics', 'REST API, MQTT, SFTP'], ['L3.5 DMZ', 'MQTT broker, API gateway, broadcast firewall', 'OPC UA, TLS 1.3'], ['L3 Operations', 'VOC: BMS, crowd analytics, DAS NOC, lighting control', 'BACnet/IP, sACN, SMPTE 2110'], ['L2 Supervisory', 'Lighting controller, CCTV VMS, mass notif, POS server', 'DMX512, ONVIF, Dante'], ['L1 Control', 'LED drivers, DAS remote units, AHU DDC, gate counters', 'sACN, LTE/5G, BACnet MS/TP'], ['L0 Process', 'Lux sensors, temp sensors, field fixtures, crowd counters', '4–20 mA, IR, 0–10 V']].map(([l, c, p]) => (
                                <tr key={l} className="border-b border-white/[0.04]"><td className="px-3 py-2 font-medium whitespace-nowrap" style={{ color: C }}>{l}</td><td className="px-3 py-2">{c}</td><td className="px-3 py-2">{p}</td></tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="7. Supporting Systems" id="supporting">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead><tr className="border-b border-white/[0.08] text-gray-500"><th className="text-left px-3 py-2 font-medium">System</th><th className="text-left px-3 py-2 font-medium">Description</th><th className="text-left px-3 py-2 font-medium">Spec</th></tr></thead>
                        <tbody className="text-gray-400">
                            {[['Mass Notification', 'Voice evac, 70+ dBA, multi-language', 'NFPA 72 Ch.24'], ['Crowd Flow', 'Gate counters, density analytics, dynamic signage', '8-min evac target'], ['ATFP', 'Vehicle barriers, mag/bag screening, K-rated bollards', 'DHS best practice'], ['Broadcast', 'SMPTE ST 2110, OB truck compound, fibre connectivity', '4K/8K production'], ['Concourse HVAC', 'Large-volume fans, smoke exhaust capable', '6–10 ACH'], ['Kitchen Exhaust', 'Type I hoods, Ansul wet chemical', 'NFPA 96'], ['Turf/Pitch Systems', 'Grow lights, undersoil heating, drainage', 'FIFA Grade A']].map(([s, d, sp]) => (
                                <tr key={s} className="border-b border-white/[0.04]"><td className="px-3 py-2 font-medium whitespace-nowrap" style={{ color: C }}>{s}</td><td className="px-3 py-2">{d}</td><td className="px-3 py-2">{sp}</td></tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="8. Water, Air &amp; Gas Systems" id="utility">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead><tr className="border-b border-white/[0.08] text-gray-500"><th className="text-left px-3 py-2 font-medium">Medium</th><th className="text-left px-3 py-2 font-medium">System</th><th className="text-left px-3 py-2 font-medium">Spec</th></tr></thead>
                        <tbody className="text-gray-400">
                            {[['Domestic Water', 'Booster pumps, backflow, hot water', '5,000–10,000 GPM peak'], ['Natural Gas', 'Concession kitchens, space heating', '5,000+ SCFH'], ['Stormwater', 'Detention, pitch drainage, bioswales', 'EPA NPDES'], ['Fire Service', 'Dedicated mains, hydrants, FDC', 'Per NFPA 24'], ['Irrigation', 'Pitch watering, sub-soil system', 'Per grounds spec']].map(([m, s, sp]) => (
                                <tr key={m} className="border-b border-white/[0.04]"><td className="px-3 py-2 font-medium whitespace-nowrap" style={{ color: C }}>{m}</td><td className="px-3 py-2">{s}</td><td className="px-3 py-2">{sp}</td></tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="9. Data Flow Architecture" id="dataflow">
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`FIELD  LED(1-2K) · Cam(500-2K) · AP(1.5-3K) · DAS(200+) · POS(500+)
  │  sACN, ONVIF, Wi-Fi 6E, LTE/5G, Ethernet       1-5 sec
  ▼
CONTROLLERS  Lighting · VMS · DAS Head-End · POS Server · DDC
  │  DMX512, BACnet MS/TP, Dante, SMPTE 2110        5-15 sec
  ▼
VOC  BMS · Crowd Analytics · DAS NOC · Mass Notif · Broadcast
  │  BACnet/IP, IP/MPLS, 40-100 Gbps backbone       100K+ pts
  ▼
DMZ (L3.5)  API GW · MQTT Broker · Broadcast FW · Data Diode
  │  MQTT, TLS 1.3, SMPTE 2110                     <100 ms
  ▼
ENTERPRISE  League Cloud · Ticketing · Sponsor · Analytics`}</pre>
                </div>
            </Section>

            <Section title="10. References" id="references">
                <ol className="list-decimal list-inside space-y-1 text-xs text-gray-400">
                    <li>ICC. (2021). <em>International Building Code — Assembly A-5</em>. ICC.</li>
                    <li>NFPA. (2019). <em>NFPA 102: Assembly Seating</em>. NFPA.</li>
                    <li>NFPA. (2021). <em>NFPA 101: Life Safety Code</em>. NFPA.</li>
                    <li>NFPA. (2022). <em>NFPA 72: Fire Alarm (Ch.24 Mass Notif)</em>. NFPA.</li>
                    <li>FIFA. (2023). <em>Football Stadiums: Technical Recommendations</em>. FIFA.</li>
                    <li>SMPTE. (2022). <em>ST 2110: Professional Media over Managed IP Networks</em>. SMPTE.</li>
                    <li>IEEE. (2021). <em>802.11ax: Wi-Fi 6/6E</em>. IEEE.</li>
                    <li>ASHRAE. (2022). <em>Standard 90.1</em>. ASHRAE.</li>
                </ol>
            </Section>

            <section className="space-y-3">
                <h2 className="text-lg font-heading font-semibold text-white">See Also</h2>
                <div className="flex flex-wrap gap-2">
                    {[{ label: 'Commercial Facilities Hub', href: '/wiki/commercial-facilities' }, { label: 'Convention Center', href: '/wiki/commercial-facilities/convention-center' }, { label: 'Shopping Center', href: '/wiki/commercial-facilities/shopping-center' }, { label: 'DEXPI Equipment', href: '/wiki/equipment' }, { label: 'CISA COMM', href: '/wiki/sectors/COMM' }].map((l) => (
                        <a key={l.href} href={l.href} className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-white/[0.04]" style={{ borderColor: `${C}30`, color: C }}>{l.label}</a>
                    ))}
                </div>
            </section>
        </div>
    );
}

function Section({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
    return (<section id={id} className="space-y-4 scroll-mt-24"><h2 className="text-xl font-heading font-semibold text-white">{title}</h2>{children}</section>);
}
