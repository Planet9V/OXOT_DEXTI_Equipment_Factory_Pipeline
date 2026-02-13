/**
 * Emergency Operations Center (EOC) — Deep Dive Wiki Article.
 * FEMA 361 hardened facility, WebEOC, IPAWS/CAP, CBRN, 72-hr ops.
 * @module wiki/emergency-services/eoc/page
 */
export const metadata = {
    title: 'Emergency Operations Center — EMER Deep Dive',
    description: 'TOGAF reference architecture for EOCs: FEMA 361 hardened facility, video walls, WebEOC situational awareness, IPAWS/CAP alerting, and CBRN filtration.',
};

export default function EocPage() {
    const C = '#3B82F6';
    return (
        <div className="max-w-5xl space-y-10">
            <header className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]" style={{ background: C }} />
                    <span className="text-xs font-mono text-gray-500">EMER · EMERGENCY MGMT · EOC</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">Emergency Operations Center (EOC)</h1>
                <p className="text-sm text-gray-400 max-w-3xl">FEMA 361 hardened facility for coordinating multi-agency emergency response with redundant communications, CBRN protection, and 72-hour autonomous operations. Reference for a county-level Type II EOC.</p>
                <div className="flex flex-wrap gap-2 pt-1">
                    {['IPAWS', 'WebEOC', 'CBRN', 'CPG 101', 'NIMS', 'FEMA 361'].map((t) => (
                        <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded border border-[#3B82F6]/30 text-[#3B82F6]">{t}</span>
                    ))}
                </div>
            </header>

            <Section title="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-300 leading-relaxed">Emergency Operations Centers coordinate <span className="text-[#3B82F6] font-medium">multi-agency response</span> during disasters, serving as the nerve center for NIMS/ICS operations. FEMA classifies EOCs by tier: Type I (state/large metro), Type II (county), Type III (local municipality).</p>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">Stakeholders</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li><span className="text-[#3B82F6] font-medium">FEMA</span> — Federal coordination, grants (EMPG, HSGP), CPG guidance</li>
                    <li><span className="text-[#3B82F6] font-medium">State OEM</span> — State emergency management, EMAC coordination</li>
                    <li><span className="text-[#3B82F6] font-medium">County/Local EM</span> — Primary EOC operators, local resource mgmt</li>
                    <li><span className="text-[#3B82F6] font-medium">National Guard</span> — DSCA (Defense Support to Civil Authorities)</li>
                    <li><span className="text-[#3B82F6] font-medium">Red Cross / VOAD</span> — Shelter management, mass care, ESF-6</li>
                    <li><span className="text-[#3B82F6] font-medium">ARES/RACES</span> — Amateur radio emergency communications</li>
                    <li><span className="text-[#3B82F6] font-medium">Utilities / Private Sector</span> — Power restoration, logistics, ESF-12</li>
                </ul>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">Regulatory Framework</h3>
                <Table headers={['Standard', 'Scope']} rows={[
                    ['Stafford Act', 'Federal disaster assistance authority and presidential declarations'],
                    ['HSPD-5 / PPD-8', 'National preparedness, NIMS adoption mandate'],
                    ['NIMS/ICS', 'Scalable incident management with unified command'],
                    ['CPG 101', 'Developing and maintaining emergency operations plans'],
                    ['FEMA P-361', 'Safe room design for tornadoes and hurricanes'],
                    ['NFPA 1600', 'Standard on continuity, emergency, and crisis management'],
                    ['UFC 4-141-04', 'DoD EOC planning and design criteria'],
                ]} color={C} />
            </Section>

            <Section title="2. High-Level Design" id="design">
                <p className="text-sm text-gray-300 leading-relaxed">A Type II EOC organizes around ESF (Emergency Support Function) workstations with a central situation room, JIC, and hardened communications. FEMA 361 construction provides wind/blast protection.</p>
                <Diagram>{
                    `┌──────────────────────────────────────────────────────────────────────┐
│                   EMERGENCY OPERATIONS CENTER                       │
├──────────────────┬────────────────────┬──────────────────────────────┤
│ SITUATION ROOM   │ COMMS / IT WING    │ SUPPORT AREAS               │
│                  │                    │                              │
│ ┌──────────────┐ │ • Radio Room       │ • JIC (Joint Info Center)    │
│ │ Video Walls  │ │   HF/VHF/UHF/SAT  │ • Breakout/Conference Rooms │
│ │ 8×4 Christie │ │ • Server Room      │ • Logistics Staging         │
│ │ COP Display  │ │   2× Dell R760    │ • Food Service / Galley     │
│ ├──────────────┤ │ • UPS/Battery Rm   │ • Sleeping Quarters (24)    │
│ │ ESF Stations │ │ • ARES/RACES Room  │ • Showers / Restrooms       │
│ │ (16 desks)   │ │ • Sat Dome (VSAT)  │ • Generator / Fuel Room     │
│ │ WebEOC/D4H   │ │ • CBRN Filtration  │ • Water Storage (2,000 gal) │
│ └──────────────┘ │                    │ • Physical Security         │
│ GIS Wall Display │ • IPAWS Terminal    │ • Man-trap Entry            │
└──────────────────┴────────────────────┴──────────────────────────────┘
                         ┌──────────┐
                         │ HARDENED │ FEMA P-361 Construction
                         │ ENVELOPE │ EF5-rated / 250 mph wind
                         └──────────┘`
                }</Diagram>
                <p className="text-xs text-gray-500 mt-2 italic">Figure 1 — County Type II EOC layout with FEMA 361 hardened construction.</p>
            </Section>

            <Section title="3. Detailed Technical Description" id="technical">
                <h3 className="text-sm font-semibold text-white/80 mb-2">3.1 Situation Awareness</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>Christie FHD-series video wall — 8×4 LCD array, 0.44mm bezel, 4K per cell</li>
                    <li>Barco TransForm N controller — 16 inputs, any-to-any routing, preset layouts</li>
                    <li>WebEOC or D4H — web-based COP, incident boards, resource tracking, dashboards</li>
                    <li>Esri ArcGIS — real-time GIS with damage assessment, shelter mapping, flood zones</li>
                </ul>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">3.2 Communications</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>HF radio — Harris Falcon III, 2–30 MHz, ALE, 400 W, NVIS for regional cov</li>
                    <li>VHF/UHF — Motorola APX consoles, P25 trunked, multi-talk-group monitor</li>
                    <li>Satellite — Hughes JUPITER VSAT (20 Mbps) + Iridium BGAN (backup voice/data)</li>
                    <li>Amateur radio — ARES/RACES station, HF/VHF, Winlink for email-over-radio</li>
                    <li>Cellular — FirstNet Band 14 deployable (CoWP), GETS/WPS priority dialing</li>
                </ul>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">3.3 IT Infrastructure</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>Servers — 2× Dell PowerEdge R760, VMware vSAN, WebEOC/GIS/email hosted</li>
                    <li>Storage — Synology RS1221+ NAS, 48 TB, RAID 6, nightly off-site replication</li>
                    <li>Network — Cisco Meraki MX450 SD-WAN, dual ISP + satellite failover</li>
                    <li>VoIP — Cisco CUCM, 50 extensions, SIP trunking, analog POTS failback</li>
                </ul>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">3.4 Power & Life Safety</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>Generator — Caterpillar C15, 500 kW, 72-hr sub-base fuel (3,000 gal diesel)</li>
                    <li>UPS — Eaton 9395P, 275 kVA, 30-min battery runtime, bypass maintenance</li>
                    <li>CBRN filtration — Castellex Air550, positive pressure, HEPA/NBC carbon filters</li>
                    <li>Water — 2,000-gal potable reserve, gravity-fed, water treatment tablets</li>
                </ul>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">3.5 Physical Security</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>Access control — HID iCLASS SE, biometric option, visitor management kiosk</li>
                    <li>CCTV — 64-channel NVR, PTZ cameras at perimeter, thermal for night</li>
                    <li>Blast doors — UL 752 Level 8, anti-ram bollards at vehicle approach</li>
                    <li>TEMPEST — EMI shielding for comms room (NSA/CSS EPL per NSTISSAM)</li>
                </ul>
            </Section>

            <Section title="4. Process Diagrams" id="process">
                <h3 className="text-sm font-semibold text-white/80 mb-2">4.1 EOC Activation Levels</h3>
                <Diagram>{
                    `Level 3 (Monitor)    Level 2 (Partial)     Level 1 (Full)
  │                     │                      │
  Staff: EM Director    Staff: 30%             Staff: 100% 24/7
  Hours: Business       Hours: Extended        Hours: 24/7 shifts
  Comms: Normal         Comms: Enhanced        Comms: All systems
  WebEOC: Dashboard     WebEOC: Active boards  WebEOC: Full COP
  │                     │                      │
  Trigger:              Trigger:               Trigger:
  Weather watch         Warning/Minor event    Major disaster
  Planned event         Partial mutual aid     Presidential decl
  │                     │                      │
  └─────────────────────┴──────────────────────┘`
                }</Diagram>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">4.2 Incident Action Planning (P-Cycle)</h3>
                <Diagram>{
                    `Planning "P"  ───────────────────────────────────────────────
      │
 Initial Response ──► IC/UC Objectives ──► Planning Meeting
      │                      │                    │
  Size-up / Intel      Strategies           Tactics/Resources
  Notification         Priorities           Assignments
      │                      │                    │
      └──────── Operations Period (12–24 hr) ─────┘
                      │
              Ops Briefing ──► Execute ──► Debrief ──► New IAP
                  (ICS 201)    (Ops)       (AAR)     (Next period)`
                }</Diagram>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">4.3 Public Alerting (IPAWS)</h3>
                <Diagram>{
                    `Threat Detected ──► EM Director Authorize ──► IPAWS Terminal
       │                     │                      │
   NWS Warning          Decision matrix        CAP (Common
   Sensor alert         Legal review           Alerting Protocol)
   Intel report                                    │
                                    ┌──────────────┼─────────────┐
                                    │              │             │
                                   WEA           EAS         NWEM
                                 (Cell)        (Radio/TV)  (NOAA WR)
                                    │              │             │
                                90-char         Audio        All-Hazards
                                to phones       broadcast    weather radio`
                }</Diagram>
            </Section>

            <Section title="5. Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2 italic">Scaled for a county-level Type II EOC with 72-hour autonomous operations.</p>
                <Table headers={['Equipment', 'Specification', 'Qty', 'Rating']} rows={[
                    ['Christie FHD Video Wall', '55″ LCD, 0.44mm bezel', '32', '8×4 array, 4K'],
                    ['Barco TransForm N', 'Video wall controller, 16-in', '1', 'Any-to-any routing'],
                    ['WebEOC (Juvare)', 'Web-based COP, dashboards', '1', '200 users'],
                    ['Esri ArcGIS Enterprise', 'GIS server + Portal', '1', 'Enterprise'],
                    ['ESF Workstations', 'Dell OptiPlex, 2-monitor', '16', 'Per ESF desk'],
                    ['Harris Falcon III HF', '2–30 MHz, ALE, NVIS', '2', '400 W PEP'],
                    ['Motorola APX Console', 'P25 trunked, multi-TG', '4', '16 channels'],
                    ['Hughes JUPITER VSAT', 'Ku-band, auto-acquire', '1', '20 Mbps down'],
                    ['Iridium BGAN Terminal', 'Satellite voice/data backup', '2', '492 kbps'],
                    ['Dell R760 Server', 'VMware vSAN, 512 GB', '2', 'vSphere 8'],
                    ['Cisco Meraki MX450', 'SD-WAN, dual ISP', '1', '10 Gbps'],
                    ['CAT C15 Generator', 'Diesel, ATS, sub-base', '1', '500 kW, 72-hr'],
                    ['Eaton 9395P UPS', 'Online double-conversion', '2', '275 kVA'],
                    ['Castellex Air550', 'CBRN filtration, +pressure', '1', '550 m³/hr'],
                    ['IPAWS Terminal', 'CAP originator, FEMA auth', '1', 'WEA/EAS/NWEM'],
                    ['HID iCLASS SE', 'Access control, 200 doors', '1', 'Biometric option'],
                    ['CCTV NVR System', '64-ch, PTZ + thermal', '1', '30-day store'],
                    ['ARES/RACES Station', 'HF/VHF/UHF, Winlink', '1', 'Ham radio backup'],
                    ['Water Storage Tank', 'Potable, gravity-fed', '2', '1,000 gal each'],
                    ['MRE / Provision Store', '72-hr for 50 staff', '1', '600 meals'],
                ]} color={C} />
            </Section>

            <Section title="6. Purdue Model Mapping" id="purdue">
                <Table headers={['Level', 'Components', 'Protocols']} rows={[
                    ['L4 Enterprise', 'FEMA grants portal, EMAC requests, state BI', 'HTTPS, NIEM XML, REST'],
                    ['L3.5 DMZ', 'IPAWS gateway, VPN concentrator, CJIS proxy', 'TLS, IPsec, CAP/ATOM'],
                    ['L3 Operations', 'WebEOC, GIS (Esri), resource mgmt, JIC tools', 'CAP, WMS/WFS, REST'],
                    ['L2 Supervisory', 'Video wall controller, radio console, CCTV NVR', 'SNMP, RTSP, SIP'],
                    ['L1 Control', 'Radio transceiver, IPAWS terminal, sat modem', 'P25, ALE, DVB-S2'],
                    ['L0 Process', 'CBRN sensors, door contacts, generator', 'Modbus, 4-20mA, BACnet'],
                ]} color={C} />
            </Section>

            <Section title="7. Supporting Systems" id="supporting">
                <Table headers={['System', 'Description', 'Specification']} rows={[
                    ['Fire Suppression', 'Wet-pipe sprinkler + FM-200 in server room', 'NFPA 13 + NFPA 2001'],
                    ['HVAC', 'Dual-redundant RTU, CBRN bypass mode', '25-ton, N+1'],
                    ['Standby Power', 'CAT C15 diesel, 72-hr sub-base tank', '500 kW, NFPA 110'],
                    ['UPS', 'Eaton 9395P double-conversion, batteries', '275 kVA, 30-min'],
                    ['CBRN Filtration', 'Castellex positive-pressure, HEPA/NBC', '550 m³/hr'],
                    ['Physical Security', 'Man-trap, blast doors, anti-ram bollards', 'UL 752 Level 8'],
                ]} color={C} />
            </Section>

            <Section title="8. Life Safety & Shelter-in-Place" id="life-safety">
                <Table headers={['Capability', 'System', 'Specification']} rows={[
                    ['Potable Water', '2× 1,000-gal tanks, treatment tablets', '72-hr, 1 gal/person/day'],
                    ['Food', 'MRE provisions, galley with propane', '72-hr, 600 meals'],
                    ['CBRN Air', 'Castellex positive pressure, HEPA/NBC filter', 'Overpressure ≥0.3″ WC'],
                    ['Medical', 'First aid station, AED, basic medications', 'OSHA 1910.151 kit'],
                    ['Waste', 'Holding tank, portable sanitization', '72-hr capacity'],
                ]} color={C} />
            </Section>

            <Section title="9. Data Flow Architecture" id="dataflow">
                <Diagram>{
                    `┌───────────────────────────────────────────────────────────────────┐
│ TIER 4 — FEDERAL     FEMA / EMAC / IPAWS / NIMS Portal         │
│  ── NIEM / CAP / REST ── event-driven + P-cycle data ──────────│
├───────────────────────────────────────────────────────────────────┤
│ TIER 3 — OPERATIONS  WebEOC · GIS · Resource Mgmt · PIO/JIC    │
│  ── WMS/WFS / REST ── 50+ users, 100+ incidents/activation ────│
├───────────────────────────────────────────────────────────────────┤
│ TIER 2 — SUPERVISORY Video Wall · Radio Console · CCTV NVR     │
│  ── RTSP / SNMP / SIP ── real-time COP, multi-TG monitor ──────│
├───────────────────────────────────────────────────────────────────┤
│ TIER 1 — FIELD       Radio (P25/HF) · VSAT · BGAN · CBRN Sens │
│  ── P25 ISSI / DVB-S2 / Modbus ── continuous monitoring ────────│
└───────────────────────────────────────────────────────────────────┘`
                }</Diagram>
            </Section>

            <Section title="10. References" id="references">
                <ul className="space-y-2 text-xs text-gray-500 font-mono">
                    <li>• FEMA. (2021). <em>CPG 101: Developing Emergency Operations Plans.</em></li>
                    <li>• FEMA. (2015). <em>FEMA P-361: Safe Rooms for Tornadoes and Hurricanes.</em></li>
                    <li>• FEMA. (2017). <em>NIMS Doctrine (3rd edition).</em></li>
                    <li>• NFPA. (2019). <em>NFPA 1600: Emergency/Crisis Management Standard.</em></li>
                    <li>• DoD. (2017). <em>UFC 4-141-04: EOC Planning and Design.</em></li>
                    <li>• FEMA. (2022). <em>IPAWS Program Manual.</em></li>
                    <li>• OASIS. (2010). <em>CAP v1.2: Common Alerting Protocol.</em></li>
                    <li>• NIST. (2024). <em>Cybersecurity Framework 2.0.</em></li>
                </ul>
            </Section>

            <Section title="See Also" id="see-also">
                <div className="flex flex-wrap gap-3">
                    {[
                        { label: 'Emergency Services Hub', href: '/wiki/emergency-services', color: '#DC2626' },
                        { label: '911/PSAP', href: '/wiki/emergency-services/psap-911', color: '#DC2626' },
                        { label: 'Fire Station', href: '/wiki/emergency-services/fire-station', color: '#F97316' },
                        { label: 'EMS Base', href: '/wiki/emergency-services/ems-base', color: '#10B981' },
                        { label: 'EMER Sector', href: '/wiki/sectors/EMER', color: '#DC2626' },
                    ].map((l) => (
                        <a key={l.label} href={l.href} className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-white/[0.04]" style={{ borderColor: `${l.color}30`, color: l.color }}>{l.label} →</a>
                    ))}
                </div>
            </Section>
        </div>
    );
}

function Section({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
    return (<section id={id} className="space-y-4 pt-8 border-t border-white/[0.04]"><h2 className="text-lg font-heading font-semibold text-white/90">{title}</h2>{children}</section>);
}
function Diagram({ children }: { children: string }) {
    return (<div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}><pre className="whitespace-pre leading-relaxed">{children}</pre></div>);
}
function Table({ headers, rows, color }: { headers: string[]; rows: string[][]; color: string }) {
    return (<div className="overflow-x-auto"><table className="w-full text-xs border-collapse"><thead><tr className="border-b border-white/[0.08] text-gray-500">{headers.map((h) => (<th key={h} className="text-left px-3 py-2 font-medium">{h}</th>))}</tr></thead><tbody className="text-gray-400 divide-y divide-white/[0.04]">{rows.map((r) => (<tr key={r[0]} className="hover:bg-white/[0.02]"><td className="px-3 py-2 font-medium whitespace-nowrap" style={{ color }}>{r[0]}</td>{r.slice(1).map((c, i) => (<td key={i} className="px-3 py-2">{c}</td>))}</tr>))}</tbody></table></div>);
}
