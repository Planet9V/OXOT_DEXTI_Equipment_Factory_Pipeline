/**
 * Casino Resort Complex Reference Architecture — Deep Dive.
 * @module wiki/commercial-facilities/casino-resort/page
 */
export const metadata = {
    title: 'Casino Resort Reference Architecture — Wiki',
    description: 'TOGAF-based reference architecture for integrated casino resorts: central utility plant, gaming floor, surveillance, SAS/G2S protocols.',
};
const C = '#EF4444';

export default function CasinoResortPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <header className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]" style={{ background: C }} />
                    <span className="text-xs font-mono text-gray-500">COMM · Gaming · Casino Resort</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">Casino Resort Complex Reference Architecture</h1>
                <p className="text-sm text-gray-400 max-w-3xl leading-relaxed">
                    An integrated casino resort (500K–2M sq ft) combines 24/7 gaming operations with hospitality, entertainment, and convention facilities. The MEP/IT stack must deliver 5,000–15,000 tons of cooling, uninterruptible power for 2,000–5,000 gaming machines, and 3,000–8,000+ surveillance cameras satisfying strict gaming commission requirements.
                </p>
            </header>

            <Section title="1. TOGAF Business Architecture" id="togaf">
                <h3 className="text-sm font-semibold text-white mb-2">Key Stakeholders</h3>
                <ul className="list-disc list-inside text-xs text-gray-400 space-y-1 mb-4">
                    <li><span className="text-[#EF4444] font-medium">Casino Operator / Tribal Authority</span> — core business owner, revenue optimisation</li>
                    <li><span className="text-[#EF4444] font-medium">Gaming Commission / NGCB</span> — licensing, regulatory oversight, audit</li>
                    <li><span className="text-[#EF4444] font-medium">Fire Marshal / AHJ</span> — life safety for 10,000+ occupants</li>
                    <li><span className="text-[#EF4444] font-medium">Hotel Management</span> — 2,000–6,000 rooms, guest services</li>
                    <li><span className="text-[#EF4444] font-medium">F&amp;B / Entertainment</span> — restaurants, theaters, nightclubs</li>
                    <li><span className="text-[#EF4444] font-medium">AML/BSA Compliance</span> — Title 31 currency transaction reporting</li>
                </ul>
                <h3 className="text-sm font-semibold text-white mb-2">Regulatory Framework</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead><tr className="border-b border-white/[0.08] text-gray-500">
                            <th className="text-left px-3 py-2 font-medium">Standard</th>
                            <th className="text-left px-3 py-2 font-medium">Scope</th>
                        </tr></thead>
                        <tbody className="text-gray-400">
                            {[['IBC 2021', 'Assembly/mixed-use, high-rise provisions'], ['NFPA 101', 'Life Safety — assembly occupancy, means of egress'], ['NFPA 13/72', 'Sprinklers and fire alarm with voice evacuation'], ['State Gaming Regs', 'NV Gaming Control Board / tribal compact requirements'], ['Title 31 / BSA', 'Anti-money laundering, currency transaction reports'], ['ASHRAE 90.1/62.1', 'Energy efficiency and ventilation (15–20 ACH smoking)'], ['ASME A17.1', 'Elevator safety code for hotel towers'], ['PCI DSS', 'Payment Card Industry data security for POS/cage']].map(([s, sc]) => (
                                <tr key={s} className="border-b border-white/[0.04]"><td className="px-3 py-2 font-medium whitespace-nowrap" style={{ color: C }}>{s}</td><td className="px-3 py-2">{sc}</td></tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="2. High-Level Design" id="design">
                <p className="text-sm text-gray-400 mb-4">Integrated resort with casino floor, hotel tower(s), convention space, entertainment venues, and back-of-house, all served by a massive central utility plant and segmented IT/OT networks.</p>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`┌─────────────────────────────────────────────────────────────────┐
│              CASINO RESORT — SYSTEM ARCHITECTURE               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  UTILITY (13.8kV)  ──►  MV SWGR  ──►  TRANSFORMERS            │
│         │                  │              │                     │
│    GENSET FARM         TIE BUS      480V DISTRIBUTION          │
│    (3-10 MW)              │              │                     │
│         │              ┌──┴──┐     ┌─────┼─────┐               │
│         ▼              ▼     ▼     ▼     ▼     ▼               │
│      ┌─────┐      ┌──────┐ ┌──┐ ┌────┐ ┌────┐ ┌────┐         │
│      │ UPS │      │CASINO│ │HT│ │CONV│ │F&B │ │ENT │         │
│      │ZONES│      │FLOOR │ │EL│ │    │ │    │ │    │         │
│      └─────┘      └──────┘ └──┘ └────┘ └────┘ └────┘         │
│                       │                                        │
│              ┌────────┼────────┐                               │
│              ▼        ▼        ▼                               │
│          ┌──────┐ ┌──────┐ ┌──────┐                            │
│          │ SLOT │ │TABLE │ │ CAGE │                            │
│          │2-5K  │ │ MON  │ │VAULT │                            │
│          │SAS   │ │RFID  │ │BIOM. │                            │
│          └──────┘ └──────┘ └──────┘                            │
│                                                                 │
│  CUP: 5,000-15,000 TON CHILLERS  ──►  CHW DISTRIBUTION       │
│  SURVEILLANCE: 3,000-8,000+ CAM  ──►  EYE-IN-THE-SKY         │
└─────────────────────────────────────────────────────────────────┘`}</pre>
                </div>
            </Section>

            <Section title="3. Detailed Technical Description" id="technical">
                <h3 className="text-sm font-semibold text-white mb-2">3.1 Central Utility Plant</h3>
                <ul className="list-disc list-inside text-xs text-gray-400 space-y-1 mb-4">
                    <li>Centrifugal chillers: 5–15 × 1,000–3,000 ton, variable speed, magnetic bearing</li>
                    <li>Cooling towers: 10–30 cells, 1,000–3,000 ton/cell, induced draft, VFD, drift &lt;0.001%</li>
                    <li>Hot water boilers: 4–8 × 5–10 MMBtu/h, condensing, 80–100% efficiency</li>
                    <li>Fire pumps: 4–6 × 1,500–2,500 GPM diesel/electric</li>
                </ul>
                <h3 className="text-sm font-semibold text-white mb-2">3.2 Casino Floor Systems</h3>
                <ul className="list-disc list-inside text-xs text-gray-400 space-y-1 mb-4">
                    <li>HVAC: 20–50 AHUs, 50,000–200,000 CFM each, MERV-13, 15–20 ACH (smoking), EC motors</li>
                    <li>Slot machines: 2,000–5,000 units, 120V/20A circuits, SAS 6.03 protocol</li>
                    <li>UPS: 20–50 zones × 500–2,000 kVA, online double-conversion for gaming machines</li>
                    <li>Table monitoring: RFID chip tracking, under-table sensors, 100–200 readers</li>
                </ul>
                <h3 className="text-sm font-semibold text-white mb-2">3.3 Hotel Tower Systems</h3>
                <ul className="list-disc list-inside text-xs text-gray-400 space-y-1 mb-4">
                    <li>Fan coil units: 2,000–6,000 qty, 4-pipe, ASHRAE 62.1, guestroom controllers</li>
                    <li>Elevator machines: 20–60 cars, MRL gearless, 2,000–4,000 lb, regenerative drives</li>
                    <li>Convention AHUs: 50,000–200,000 CFM VAV, ballroom/theater zones</li>
                </ul>
                <h3 className="text-sm font-semibold text-white mb-2">3.4 Surveillance &amp; Physical Security</h3>
                <ul className="list-disc list-inside text-xs text-gray-400 space-y-1 mb-4">
                    <li>CCTV: 3,000–8,000+ cameras (4K PTZ/fixed), ONVIF/RTSP, AI analytics</li>
                    <li>NVR storage: 10–20 × 500–1,000 TB, 90+ day retention at 4K</li>
                    <li>Cage/vault: biometric access, duress alarms, mantrap, 24/7 monitoring</li>
                    <li>Access control: 1,000+ doors, OSDP v2 encrypted readers</li>
                </ul>
                <h3 className="text-sm font-semibold text-white mb-2">3.5 IT / Gaming Network</h3>
                <ul className="list-disc list-inside text-xs text-gray-400 space-y-1">
                    <li>Gaming network: air-gapped VLANs, SAS/G2S slot accounting, CMS integration</li>
                    <li>Guest Wi-Fi: Wi-Fi 6E, 6 GHz tri-band, 10 Gbps backhaul, isolated VLANs</li>
                    <li>IP/MPLS backbone: redundant fibre rings, &lt;50 ms latency, 200+ L3 switches</li>
                    <li>POS: PCI DSS compliant, EMV/NFC terminals, cage/count room integration</li>
                </ul>
            </Section>

            <Section title="4. Process Diagrams" id="process">
                <h3 className="text-sm font-semibold text-white mb-2">4.1 Gaming Floor Power / Network</h3>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`UTILITY ──► MV SWGR ──► 480V XFMR ──► UPS ZONE (500-2000 kVA)
                                          │
                                    ┌─────┼─────┐
                                    ▼     ▼     ▼
                              ┌──────┐ ┌──────┐ ┌──────┐
                              │SLOT  │ │SLOT  │ │TABLE │
                              │BANK A│ │BANK B│ │ GAME │
                              │50 pcs│ │50 pcs│ │RFID  │
                              └──┬───┘ └──┬───┘ └──┬───┘
                                 │        │        │
                              SAS 6.03  SAS 6.03  G2S
                                 │        │        │
                              ┌──┴────────┴────────┴──┐
                              │   CASINO MGMT SYSTEM   │
                              │   (CMS / Slot Acctg)   │
                              └────────────┬───────────┘
                                           │
                              NGCB / Corp Reporting`}</pre>
                </div>
                <h3 className="text-sm font-semibold text-white mt-6 mb-2">4.2 Surveillance Architecture</h3>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`PTZ/FIXED CAMERAS (3,000-8,000+)
  │  ONVIF / RTSP / 4K H.265
  ▼
NVR CLUSTER (10-20 servers, 500-1000 TB)
  │  RAID, 90+ day retention
  ▼
EYE-IN-THE-SKY (Surveillance Room)
  │  Video walls, AI analytics, incident tracking
  ▼
GAMING COMMISSION FEEDS ◄── Regulatory audit export`}</pre>
                </div>
                <h3 className="text-sm font-semibold text-white mt-6 mb-2">4.3 HVAC Casino Floor</h3>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`CUP (5,000-15,000 ton) ──► CHW Loop 42°F ──► Casino AHUs
                                                │
Cooling Towers ◄── CW Return 95°F              ▼
                                          MERV-13 Filters
                                          15-20 ACH (smoking)
                                          EC Motors, VFD
                                          100,000+ sq ft floor`}</pre>
                </div>
            </Section>

            <Section title="5. Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2">Scaled for a 1M sq ft integrated resort with 3,000 rooms and 100,000 sq ft casino floor.</p>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead><tr className="border-b border-white/[0.08] text-gray-500">
                            <th className="text-left px-3 py-2 font-medium">Equipment</th>
                            <th className="text-left px-3 py-2 font-medium">Spec</th>
                            <th className="text-left px-3 py-2 font-medium">Qty</th>
                            <th className="text-left px-3 py-2 font-medium">Rating</th>
                        </tr></thead>
                        <tbody className="text-gray-400">
                            {[['Centrifugal Chiller', 'Magnetic bearing, VSD', '5–15', '1,000–3,000 ton'], ['Cooling Tower Cell', 'Induced draft, FRP, VFD', '10–30', '1,000 ton/cell'], ['Boiler', 'Condensing, hot water', '4–8', '5–10 MMBtu/h'], ['Casino AHU', 'MERV-13, EC, 15-20 ACH', '20–50', '50K–200K CFM'], ['Diesel Generator', 'Paralleling switchgear', '4–8', '3–10 MW total'], ['UPS System', 'Online double-conversion', '20–50', '500–2,000 kVA/zone'], ['Slot Machine', 'SAS 6.03 enabled', '2,000–5,000', '120V/20A'], ['CCTV Camera', '4K PTZ/fixed, ONVIF', '3,000–8,000+', 'IP66, IR'], ['NVR Server', 'RAID, 90-day retention', '10–20', '500–1,000 TB'], ['BMS Controller', 'BACnet/IP DDC', '500–1,000', 'Per zone'], ['Fire Pump', 'Diesel + electric', '4–6', '1,500–2,500 GPM'], ['Elevator Machine', 'MRL gearless, regen.', '20–60', '2,000–4,000 lb'], ['Fan Coil Unit', '4-pipe, guestroom', '2,000–6,000', '800–1,500 CFM'], ['Access Controller', 'OSDP v2 encrypted', '1,000+', 'Per door'], ['RFID Reader', 'Table game tracking', '100–200', '13.56 MHz'], ['VFD', 'HVAC/pump rated', '200+', '50–500 HP'], ['PDU', 'Gaming floor, 3-phase', '50–100', '400A/208V'], ['L3 PoE Switch', '48-port, 10GbE', '200+', 'Multi-gig'], ['Fire Alarm Panel', 'Addressable, NFPA 72', '50–100', 'Per zone'], ['Fibre Panel', 'MPO/MTP backbone', '50+', 'Per distribution']].map(([e, s, q, r]) => (
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
                            {[['L4 Enterprise', 'Corporate reporting, NGCB feeds, AML dashboard', 'REST API, MQTT, SFTP'], ['L3.5 DMZ', 'OPC UA GW, MQTT broker, gaming firewall, data diode', 'OPC UA, TLS 1.3'], ['L3 Operations', 'Casino Management System (CMS), SCADA, slot accounting', 'SAS 6.03, G2S, BACnet/IP'], ['L2 Supervisory', 'Eye-in-the-sky, BMS workstation, fire command', 'ONVIF, BACnet/IP, Modbus TCP'], ['L1 Control', 'SAS aggregators, VFDs, AHU controllers', 'SAS, Modbus RTU, BACnet MS/TP'], ['L0 Process', 'Slot machines, RFID chips, sensors, actuators', '120V AC, 4–20 mA, RFID']].map(([l, c, p]) => (
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
                            {[['Fire Suppression', 'Wet pipe, preaction, VESDA smoke detection', 'NFPA 13, zoned'], ['HVAC (Casino)', 'High ACH for smoking, MERV-13, EC motors', '15–20 ACH'], ['UPS (Gaming)', 'Online double-conversion per zone', '500–2,000 kVA'], ['Generators', 'Diesel farm with paralleling gear', '3–10 MW total'], ['Cage Vault', 'UL-rated, mantrap, biometric, intrusion', '24/7 monitoring'], ['AML Systems', 'Title 31 CTR/SAR, CMS integration', 'BSA compliance'], ['Mass Notification', 'Voice evac, 10,000+ occupant capacity', 'NFPA 72 Ch.24']].map(([s, d, sp]) => (
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
                            {[['Domestic Water', 'Booster pumps, hot water recirculation, pool plant', '2,000–5,000 GPM'], ['Natural Gas', 'Boilers, commercial kitchens (10+ restaurants)', '2,000+ SCFH'], ['Pool/Spa', 'Dehumidification heat pumps, chemical treatment', 'Per health dept.'], ['Laundry', 'Industrial washers, steam, grey water recovery', '500+ lb/hr'], ['Stormwater', 'Detention, oil/water separators', 'EPA NPDES']].map(([m, s, sp]) => (
                                <tr key={m} className="border-b border-white/[0.04]"><td className="px-3 py-2 font-medium whitespace-nowrap" style={{ color: C }}>{m}</td><td className="px-3 py-2">{s}</td><td className="px-3 py-2">{sp}</td></tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="9. Data Flow Architecture" id="dataflow">
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`FIELD DEVICES  Slots(2-5K) · Cameras(3-8K) · Sensors · RFID
  │  SAS 6.03, ONVIF, 4-20mA, RFID              1-5 sec
  ▼
FLOOR CONTROLLERS  SAS Aggregators · DDC · VFD · NVR
  │  SAS, BACnet MS/TP, Modbus TCP               5-15 sec
  ▼
SUPERVISORY  CMS · Eye-in-Sky · BMS · FACP
  │  G2S, BACnet/IP, ONVIF, 10 Gbps             30,000+ pts
  ▼
DMZ (L3.5)  Gaming Firewall · OPC UA GW · Data Diode
  │  Air-gapped gaming net, OPC UA, TLS          <100 ms
  ▼
ENTERPRISE  Corp · NGCB Reporting · AML · Cloud Analytics`}</pre>
                </div>
            </Section>

            <Section title="10. References" id="references">
                <ol className="list-decimal list-inside space-y-1 text-xs text-gray-400">
                    <li>International Code Council. (2021). <em>International Building Code</em>. ICC.</li>
                    <li>NFPA. (2022). <em>NFPA 101: Life Safety Code</em>. NFPA.</li>
                    <li>NFPA. (2022). <em>NFPA 13: Sprinkler Systems</em>. NFPA.</li>
                    <li>NFPA. (2022). <em>NFPA 72: Fire Alarm Code</em>. NFPA.</li>
                    <li>Nevada Gaming Control Board. (2023). <em>Technical Standards for Gaming Devices</em>. NGCB.</li>
                    <li>ASHRAE. (2022). <em>Standard 62.1: Ventilation</em>. ASHRAE.</li>
                    <li>FinCEN. (2021). <em>Title 31 CFR Part 1021: BSA Requirements for Casinos</em>. FinCEN.</li>
                    <li>GSA/Gaming Standards Association. (2020). <em>G2S Protocol Specification</em>. GSA.</li>
                    <li>IGT. (2019). <em>SAS Protocol Version 6.03</em>. International Game Technology.</li>
                </ol>
            </Section>

            <section className="space-y-3">
                <h2 className="text-lg font-heading font-semibold text-white">See Also</h2>
                <div className="flex flex-wrap gap-2">
                    {[{ label: 'Commercial Facilities Hub', href: '/wiki/commercial-facilities' }, { label: 'Convention Center', href: '/wiki/commercial-facilities/convention-center' }, { label: 'High-Rise Hotel', href: '/wiki/commercial-facilities/high-rise-hotel' }, { label: 'DEXPI Equipment', href: '/wiki/equipment' }, { label: 'CISA COMM', href: '/wiki/sectors/COMM' }].map((l) => (
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
