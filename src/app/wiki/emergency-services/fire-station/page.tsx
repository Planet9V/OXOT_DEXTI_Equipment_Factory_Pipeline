/**
 * Fire Station Infrastructure — Deep Dive Wiki Article.
 * SCBA cascade, Plymovent exhaust, P25/FirstNet, NFPA 1221/1901/1500.
 * @module wiki/emergency-services/fire-station/page
 */
export const metadata = {
    title: 'Fire Station Infrastructure — EMER Deep Dive',
    description: 'TOGAF reference architecture for fire stations: SCBA cascade, exhaust extraction, P25 radio, apparatus bays, and NFPA compliance.',
};

export default function FireStationPage() {
    const C = '#F97316';
    return (
        <div className="max-w-5xl space-y-10">
            <header className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]" style={{ background: C }} />
                    <span className="text-xs font-mono text-gray-500">EMER · FIRE AND RESCUE · FIRE STATION</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">Fire Station Infrastructure</h1>
                <p className="text-sm text-gray-400 max-w-3xl">Fire/rescue station with drive-through apparatus bays, SCBA cascade systems, diesel exhaust extraction, P25/FirstNet communications, and NFPA 1500 safety compliance. Reference for a 3-bay station supporting 60 personnel.</p>
                <div className="flex flex-wrap gap-2 pt-1">
                    {['P25', 'SCBA', 'NFPA 1500', 'ICS/NIMS', 'FirstNet', 'NFPA 1901'].map((t) => (
                        <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded border border-[#F97316]/30 text-[#F97316]">{t}</span>
                    ))}
                </div>
            </header>

            <Section title="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-300 leading-relaxed">Fire stations form the <span className="text-[#F97316] font-medium">primary deployment node</span> for fire suppression, rescue, and emergency medical first response. The U.S. operates approximately 29,000 fire departments with over 1.1 million career and volunteer firefighters responding to 37+ million calls annually.</p>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">Stakeholders</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li><span className="text-[#F97316] font-medium">NFPA</span> — Standards body for fire codes (NFPA 1, 13, 72, 1221, 1500, 1901)</li>
                    <li><span className="text-[#F97316] font-medium">IAFC</span> — International Association of Fire Chiefs; leadership and policy</li>
                    <li><span className="text-[#F97316] font-medium">USFA/FEMA</span> — U.S. Fire Administration; federal guidance and NFIRS data</li>
                    <li><span className="text-[#F97316] font-medium">ISO/PPC</span> — Insurance Services Office Public Protection Classification</li>
                    <li><span className="text-[#F97316] font-medium">OSHA</span> — 29 CFR 1910.134 respiratory protection, 1910.156 fire brigades</li>
                    <li><span className="text-[#F97316] font-medium">NIOSH</span> — Firefighter fatality investigation and PPE research</li>
                </ul>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">Regulatory Framework</h3>
                <Table headers={['Standard', 'Scope']} rows={[
                    ['NFPA 1', 'Fire Code — comprehensive fire prevention and life safety'],
                    ['NFPA 13', 'Sprinkler installation for station fire suppression'],
                    ['NFPA 72', 'Fire alarm and signaling systems'],
                    ['NFPA 1221', 'Emergency services communications — alerting and dispatch'],
                    ['NFPA 1500', 'Fire department occupational safety, health, and wellness'],
                    ['NFPA 1901', 'Automotive fire apparatus — pumper/ladder/rescue specs'],
                    ['NFPA 1989', 'Breathing air quality — Grade D, <5 ppm CO'],
                    ['OSHA 29 CFR 1910.134', 'Respiratory protection program requirements'],
                ]} color={C} />
            </Section>

            <Section title="2. High-Level Design" id="design">
                <p className="text-sm text-gray-300 leading-relaxed">A modern fire station follows a drive-through apparatus bay layout separating contaminated (apparatus) zones from living quarters. Critical systems include cascade breathing air, diesel exhaust extraction, and station alerting.</p>
                <Diagram>{
                    `┌────────────────────────────────────────────────────────────────────┐
│                        FIRE STATION LAYOUT                        │
├──────────────────┬─────────────────────┬─────────────────────────┤
│  APPARATUS BAYS  │   SUPPORT WING      │   LIVING QUARTERS       │
│  (3× drive-thru) │                     │                         │
│  ┌────────────┐  │  • SCBA Cascade     │  • Bunk Room (20)       │
│  │ Engine 1   │  │  • PPE Storage      │  • Kitchen/Dining       │
│  │ Plymovent  │  │  • PPE Washer/Dryer │  • Day Room             │
│  ├────────────┤  │  • Decon Area       │  • Fitness Center       │
│  │ Ladder 1   │  │  • Tool/Equipment   │  • Offices              │
│  │ Plymovent  │  │  • Hose Tower       │  • Training Room        │
│  ├────────────┤  │  • Medical Supply   │  • IT/Comms Room        │
│  │ Rescue 1   │  │  • Generator Room   │                         │
│  │ Plymovent  │  │  • Electrical Room  │  ┌─────────────────┐   │
│  └────────────┘  │                     │  │ Training Tower   │   │
│  Bay Doors 16×14 │  CO/NO₂ Monitors    │  │ 4-story, anchors │   │
│  Exhaust Extract │  throughout          │  └─────────────────┘   │
└──────────────────┴─────────────────────┴─────────────────────────┘`
                }</Diagram>
                <p className="text-xs text-gray-500 mt-2 italic">Figure 1 — 3-bay fire station layout with contamination zone separation.</p>
            </Section>

            <Section title="3. Detailed Technical Description" id="technical">
                <h3 className="text-sm font-semibold text-white/80 mb-2">3.1 Apparatus Bays & Exhaust</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-2">Drive-through bays (16×14 ft doors) with magnetized exhaust capture connecting to apparatus tailpipe during cold start and idle.</p>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>Plymovent MagnaRail exhaust extraction — 3,000 CFM per bay, auto-connect</li>
                    <li>Wayne Dalton motorized bay doors — 16×14 ft, 1 HP motor, 12-sec open</li>
                    <li>Fixed CO/NO₂ monitors — Bacharach, audible/visual alarm, OSHA PEL (CO: 50 ppm TWA)</li>
                    <li>Bay ventilation fans — 5,000 CFM variable speed, tempered make-up air</li>
                </ul>

                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">3.2 SCBA / Breathing Air</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-2">Cascade compressor system fills SCBA cylinders to 4,500 psi with Grade D breathing air per NFPA 1989.</p>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>Bauer Verticus compressor — 45 SCFM, 6,000 psi, oil-free, auto-shutoff</li>
                    <li>Cascade storage rack — 30 cylinders, 6-bank manifold, pressure equalization</li>
                    <li>Scott/Luxfer SCBA cylinders — 45-min, 4,500 psi carbon fiber, 120 units</li>
                    <li>Air quality monitor — inline CO/moisture/particulate, continuous sampling</li>
                </ul>

                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">3.3 Station Alerting</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>Zetron station alerting system — IP-based, selective dispatch, multi-zone audio</li>
                    <li>Federal Signal Commander — indoor/outdoor speakers, 120 dB sirens</li>
                    <li>Bay lighting — auto-on with dispatch, LED path markers, night-vision safe</li>
                    <li>Opticom GPS-based traffic pre-emption — 4–8 sec green phase extension</li>
                </ul>

                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">3.4 Communications</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>Motorola APX 8000 portable radios — P25 Phase II TDMA, AES-256, GPS</li>
                    <li>Motorola APX mobile radios — in-apparatus, 35 W, dual-band VHF/UHF</li>
                    <li>FirstNet (Band 14) — LTE for MDT, CAD, AVL, priority/preemption</li>
                    <li>Mobile Data Terminal — Panasonic Toughbook CF-33, in-cab, CAD/mapping</li>
                </ul>

                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">3.5 Training Facilities</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>Training tower — 4-story, 50 ft, standpipe/sprinkler connections, rope anchors</li>
                    <li>Live burn prop — 20×20 ft, propane-fed, Class A/B fire simulation</li>
                    <li>Confined space simulator — multi-level, permit-required entry training</li>
                    <li>Vehicle extrication pad — mock-up cars, hydraulic tool practice</li>
                </ul>
            </Section>

            <Section title="4. Process Diagrams" id="process">
                <h3 className="text-sm font-semibold text-white/80 mb-2">4.1 Emergency Dispatch Flow</h3>
                <Diagram>{
                    `911 Call ──► PSAP/CAD ──► Tone-Out Alert ──► Bay Doors Open
                              │                    │
                          Zetron/Fed Signal     Plymovent Connect
                          (10-30 sec)          CO Monitors Activate
                              │                    │
                        Crew Don PPE ──► Apparatus En Route
                              │              │
                          SCBA Check     Opticom Pre-empt
                          Manifest       AVL Track (5-sec)`
                }</Diagram>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">4.2 Incident Command (ICS)</h3>
                <Diagram>{
                    `Incident ──► Size-Up ──► ICS Established ──► Resource Mgmt
    │            │              │                   │
 1st Alarm    IC Report    Sectors/Divs       Mutual Aid
 Response     (CAN/PAR)    (Ops/Plans)        (Auto-Aid)
    │            │              │                   │
 Additional   Tactics      Accountability       Staging
 Alarms       Planning     (PAR/Passport)       Area
    │            │              │                   │
    └────────────┴──────────────┴───────────────────┘
                         │
              Demobilization ──► NFIRS Report ──► AAR/IP`
                }</Diagram>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">4.3 Post-Incident Decon</h3>
                <Diagram>{
                    `Return to Station ──► Gross Decon ──► PPE Extraction ──► PPE Wash
       │                    │               │                │
  Apparatus wash        Field wipe      Marsars dryer    NFPA 1851
  Bay exhaust on        On-scene        Gear storage     Inspection
       │                    │               │                │
  SCBA Refill ──► Medical Monitoring ──► NFIRS Entry ──► Available`
                }</Diagram>
            </Section>

            <Section title="5. Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2 italic">Scaled for a 3-bay fire station with 60 career personnel (3 shifts).</p>
                <Table headers={['Equipment', 'Specification', 'Qty', 'Rating']} rows={[
                    ['Plymovent MagnaRail', 'Exhaust extraction, auto-connect', '3', '3,000 CFM'],
                    ['Wayne Dalton Bay Door', 'Motorized, 16×14 ft', '6', '1 HP, 12-sec'],
                    ['Bauer Verticus Compressor', 'SCBA cascade, oil-free', '1', '45 SCFM, 6K psi'],
                    ['SCBA Cylinders (Scott)', '45-min, carbon fiber', '120', '4,500 psi'],
                    ['Zetron Station Alerting', 'IP-based, multi-zone', '1', 'Selective dispatch'],
                    ['Motorola APX 8000', 'P25 Phase II portable', '60', 'AES-256, GPS'],
                    ['Motorola APX Mobile', 'In-apparatus, dual-band', '6', '35 W VHF/UHF'],
                    ['Panasonic CF-33 MDT', 'In-cab mobile data', '6', 'FirstNet LTE'],
                    ['Opticom GPS Priority', 'Traffic pre-emption kit', '6', 'Per apparatus'],
                    ['CO/NO₂ Monitors', 'Fixed, Bacharach', '6', '0–200 ppm'],
                    ['Marsars PPE Dryer', '30-rack, heated air', '2', '150 CFM, 140°F'],
                    ['PPE Extractor Washer', 'Front-load, NFPA 1851', '2', '60 lb capacity'],
                    ['Federal Signal Speaker', 'Indoor/outdoor, 120 dB', '8', 'Multi-zone'],
                    ['Cummins Generator', 'Diesel, ATS, sub-base', '1', '250 kW'],
                    ['NFPA 13 Sprinklers', 'Wet-pipe, quick-response', 'Full', 'K=5.6, 175 psi'],
                    ['NFPA 72 Fire Panel', 'Addressable, voice evac', '1', 'Network capable'],
                    ['Cascade Storage Rack', '6-bank, 30 cylinders', '4', '6,000 psi rated'],
                    ['Bay Ventilation Fans', 'Variable speed, makeup air', '3', '5,000 CFM'],
                    ['Training Tower', '4-story, standpipe', '1', '50 ft, anchored'],
                    ['AVL GPS Trackers', 'Apparatus-mounted', '6', '5-sec polling'],
                ]} color={C} />
            </Section>

            <Section title="6. Purdue Model Mapping" id="purdue">
                <Table headers={['Level', 'Components', 'Protocols']} rows={[
                    ['L4 Enterprise', 'NFIRS, ISO PPC reporting, training records', 'HTTPS, XML, REST'],
                    ['L3.5 DMZ', 'FirstNet gateway, RMS VPN, CAD API', 'TLS, IPsec, LTE'],
                    ['L3 Operations', 'CAD/AVL, RMS, staffing/scheduling', 'CAD XML, NFPA 1221'],
                    ['L2 Supervisory', 'Station alerting, bay door control, exhaust monitor', 'IP, BACnet, Modbus'],
                    ['L1 Control', 'SCBA cascade PLC, compressor controller', 'Modbus RTU, 4-20mA'],
                    ['L0 Process', 'Bay doors, exhaust valves, CO/NO₂ sensors', 'Hardwired, dry contact'],
                ]} color={C} />
            </Section>

            <Section title="7. Supporting Systems" id="supporting">
                <Table headers={['System', 'Description', 'Specification']} rows={[
                    ['Fire Suppression', 'Wet-pipe sprinkler throughout station', 'NFPA 13, K=5.6'],
                    ['HVAC', 'Split system with bay makeup air', '15-ton, gas heat'],
                    ['Standby Power', 'Cummins diesel with ATS', '250 kW, 48-hr fuel'],
                    ['Exhaust Extraction', 'Plymovent per bay, auto-disconnect', '3,000 CFM/bay'],
                    ['Decontamination', 'Gross decon area, washdown booth', '10 GPM, neutralizer'],
                    ['Physical Security', 'Card access, CCTV, coded apparatus bay', 'Non-public areas'],
                ]} color={C} />
            </Section>

            <Section title="8. PPE & Decontamination Systems" id="ppe">
                <Table headers={['Item', 'System', 'Specification']} rows={[
                    ['Turnout Gear', 'Coat/pants, helmet, boots, gloves', 'NFPA 1971, 3 sets/person'],
                    ['SCBA', 'Scott Air-Pak X3 Pro, 45-min', 'NFPA 1981, CBRN rated'],
                    ['PPE Washer', 'Industrial extractor, NFPA 1851', '60 lb, 160°F max'],
                    ['PPE Dryer', 'Marsars forced-air drying cabinet', '30 racks, 140°F'],
                    ['Decon Shower', 'Field gross decon, portable', '10 GPM, heated'],
                ]} color={C} />
            </Section>

            <Section title="9. Data Flow Architecture" id="dataflow">
                <Diagram>{
                    `┌───────────────────────────────────────────────────────────────────┐
│ TIER 4 — ENTERPRISE    NFIRS · ISO PPC · State Fire Marshal     │
│  ── XML/REST ── monthly/annual batch reporting ─────────────────│
├───────────────────────────────────────────────────────────────────┤
│ TIER 3 — OPERATIONS    CAD · RMS · Scheduling · Training Mgmt  │
│  ── FirstNet LTE / NFPA 1221 ── real-time dispatch ─────────────│
├───────────────────────────────────────────────────────────────────┤
│ TIER 2 — SUPERVISORY    Alerting · Bay Control · Exhaust Mon    │
│  ── BACnet / Modbus ── event-driven, <10 sec response ──────────│
├───────────────────────────────────────────────────────────────────┤
│ TIER 1 — FIELD          P25 Radio · MDT · AVL · SCBA Cascade   │
│  ── P25 ISSI · 4-20mA ── continuous + on-demand ────────────────│
└───────────────────────────────────────────────────────────────────┘`
                }</Diagram>
            </Section>

            <Section title="10. References" id="references">
                <ul className="space-y-2 text-xs text-gray-500 font-mono">
                    <li>• NFPA. (2022). <em>NFPA 1221: Emergency Services Communications.</em></li>
                    <li>• NFPA. (2023). <em>NFPA 1500: Fire Dept Occupational Safety.</em></li>
                    <li>• NFPA. (2021). <em>NFPA 1901: Automotive Fire Apparatus.</em></li>
                    <li>• NFPA. (2022). <em>NFPA 1989: Breathing Air Quality.</em></li>
                    <li>• USFA. (2024). <em>Fire Station Design Best Practices.</em> FEMA.</li>
                    <li>• OSHA. (2020). <em>29 CFR 1910.134: Respiratory Protection.</em></li>
                    <li>• ISO. (2023). <em>Public Protection Classification Program Guide.</em></li>
                    <li>• IAFC. (2022). <em>Station Design Guidelines.</em></li>
                </ul>
            </Section>

            <Section title="See Also" id="see-also">
                <div className="flex flex-wrap gap-3">
                    {[
                        { label: 'Emergency Services Hub', href: '/wiki/emergency-services', color: '#DC2626' },
                        { label: '911/PSAP', href: '/wiki/emergency-services/psap-911', color: '#DC2626' },
                        { label: 'EOC', href: '/wiki/emergency-services/eoc', color: '#3B82F6' },
                        { label: 'HazMat Response', href: '/wiki/emergency-services/hazmat-response', color: '#EAB308' },
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
