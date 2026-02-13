/**
 * Highway Tunnel Deep-Dive Reference Architecture.
 * Ventilation, fire/life safety, ITS, electrical, SCADA.
 * @module wiki/transportation/highway-tunnel/page
 */
export const metadata = {
    title: 'Highway Tunnel — Transportation Wiki',
    description: 'TOGAF reference architecture for highway tunnels: jet fan ventilation, NFPA 502 fire/life safety, ITS lane control, emergency egress, and SCADA monitoring.',
};
export default function HighwayTunnelPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}>🚗</div>
                    <div>
                        <span className="text-[10px] text-gray-500 font-mono block">TRAN-HW-TUN</span>
                        <h1 className="text-2xl font-heading font-bold text-white">Highway Tunnel Reference Architecture</h1>
                    </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">TOGAF-based reference architecture for major vehicular highway tunnels covering longitudinal jet fan ventilation with SES/CFD modeling, NFPA 502 fire/life safety systems, ITS lane control and variable message signs, emergency egress provisions, and centralized SCADA monitoring.</p>
            </div>
            <S n={1} t="TOGAF Business Architecture" id="togaf">
                <H4>Stakeholder Map</H4>
                <Tbl heads={['Stakeholder', 'Role', 'Interest']} rows={[
                    ['State DOTs', 'Owner/Operator', 'Tunnel operations, capital, maintenance'],
                    ['FHWA', 'Regulatory', 'Tunnel inspection, NTIS standards, federal funding'],
                    ['Toll Authority', 'Revenue', 'Electronic tolling, congestion pricing'],
                    ['Fire Departments', 'Emergency', 'SOP for tunnel fire response, standpipe'],
                    ['Design Engineers', 'Lifecycle', 'Ventilation modeling, structural assessment'],
                    ['EMS/Police', 'Emergency', 'Incident response, traffic management'],
                    ['Utilities', 'Infrastructure', 'Power, water, fiber co-location'],
                ]} />
                <H4>Regulatory Framework</H4>
                <Tbl heads={['Standard', 'Title', 'Scope']} rows={[
                    ['NFPA 502', 'Road Tunnels etc.', 'Fire protection, ventilation, egress, detection'],
                    ['FHWA NTIS', 'National Tunnel Inspection', 'Inspection frequency, structural/systems rating'],
                    ['AASHTO', 'Highway Design', 'Geometric standards, clearance, pavement'],
                    ['NFPA 72', 'Fire Alarm & Signaling', 'Detection, notification, monitoring'],
                    ['IEC 61508', 'Functional Safety', 'SIL assessment for control systems'],
                    ['ASHRAE 62.1', 'Ventilation', 'Fresh air rates for occupied tunnels'],
                ]} />
            </S>
            <S n={2} t="High-Level Design" id="hld">
                <Ascii>{`┌───────── PORTAL A ─────────────────── PORTAL B ───────┐
│ Entry VMS │ Height detect │ Toll gantry     Exit VMS  │
├──────────────────────── BORE ────────────────────────┤
│ LENGTH: 1-5 km │ BORE: 2× twin-tube (2+2 lanes)     │
│ CLEARANCE: 4.9 m (16 ft) + 1 m shoulder              │
├──── VENTILATION ─────────────────────────────────────┤
│ Longitudinal jet fans (16×) 35-75 kW each             │
│ SES model: critical velocity 2.5-3.5 m/s              │
│ Cross-passages every 100-200 m for egress             │
├──── FIRE / SAFETY ───────────────────────────────────┤
│ Linear heat detection (68°C/88°C)                     │
│ Foam FFFS deluge (0.26 gpm/ft²) – optional            │
│ Standpipe system (2.5" hose, 100 ft spacing)          │
│ Emergency phones every 75 m, egress lighting           │
├──── ITS / ELECTRICAL ────────────────────────────────┤
│ Lane control (red X / green ↓ per MUTCD)              │
│ CCTV (4K PTZ, 100 m spacing), VMS                      │
│ Dual-feed power (13.8 kV) + generator backup          │
├──── SCADA ──────────────────────────────────────────┤
│ Tunnel Operations Center (TOC) – 24/7 monitoring      │
└──────────────────────────────────────────────────────┘`}</Ascii>
            </S>
            <S n={3} t="Detailed Technical Description" id="tech">
                <H4>3.1 Ventilation Systems</H4>
                <Tbl heads={['Component', 'Type', 'Specification']} rows={[
                    ['Longitudinal Jet Fans', 'Axial, reversible', '35-75 kW, 35-55 N thrust, 1450 RPM'],
                    ['Fan Qty/Spacing', 'Per SES model', '12-24 fans, 50-80 m apart, 2-fan clusters'],
                    ['Critical Velocity', 'Fire mode', '2.5-3.5 m/s backlayering prevention'],
                    ['Portal Fans', 'Axial, supply/exhaust', '200-500 kW, 100-200 m³/s capacity'],
                    ['CO/NO₂ Sensors', 'Electrochemical', 'CO: 0-500 ppm, NO₂: 0-10 ppm, NDIR'],
                    ['Visibility Sensors', 'Forward scatter', 'K-value 0.005-0.012 m⁻¹, EN 50545'],
                ]} />
                <H4>3.2 Fire / Life Safety</H4>
                <Tbl heads={['System', 'Standard', 'Specification']} rows={[
                    ['Linear Heat Detection', 'NFPA 502', 'Fiber-optic (DTS) or cable, 68°/88°C alarm/action'],
                    ['VESDA Aspirating', 'EN 54-20', '0.005% obs/m sensitivity, Class A'],
                    ['FFFS (Fixed Fire)', 'NFPA 502 Annex E', 'Deluge foam 0.26 gpm/ft², zone 30-50 m'],
                    ['Standpipe', 'NFPA 14', '2.5" outlets @ 100 ft, 250 gpm @ 100 psi'],
                    ['Emergency Phones', 'NFPA 502', 'SOS stations every 75 m, direct TOC line'],
                    ['Cross-Passages', 'NFPA 502', 'Every 100-200 m, fire-rated 2 hrs, pressurized'],
                    ['Emergency Lighting', 'NFPA 502', '1 lux min on walkway, 90-min battery'],
                    ['PA/EVAC', 'EN 54-16', '100 dB, intelligibility STI >0.5'],
                ]} />
                <H4>3.3 ITS / Lane Control</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Lane Control Signals', 'Red X / Green ↓', 'MUTCD compliant, LED, 500 m visibility'],
                    ['VMS', 'Full-matrix LED', '3-line, amber/full-color, NTCIP 1203'],
                    ['CCTV', '4K PTZ IP', '100 m spacing, IR, ONVIF, <3 sec latency'],
                    ['Vehicle Detectors', 'DualTech radar+loop', 'Occupancy, speed, class, 99.5% accuracy'],
                    ['Height Detectors', 'Laser/IR curtain', '4.9 m threshold, auto-warn + gate'],
                    ['ETC Tolling', 'RFID/DSRC + LPR', 'E-ZPass, open-road tolling, 99.9% accuracy'],
                ]} />
                <H4>3.4 Electrical Systems</H4>
                <Tbl heads={['System', 'Configuration', 'Rating']} rows={[
                    ['Primary Feed', 'Dual 13.8 kV from grid', 'Redundant substations, auto-transfer'],
                    ['Tunnel Lighting', 'LED, counter-beam', '40-100 cd/m² threshold, 4-5 cd/m² interior'],
                    ['Emergency Generator', 'Diesel, auto-start', '2-5 MW, 480V, 10-sec start, 72-hr fuel'],
                    ['UPS', 'Double-conversion', '200-500 kVA, SCADA/safety circuits'],
                    ['Cable Path', 'FP rated trays', 'Fire-resistant (IEC 60331) mineral cable'],
                ]} />
                <H4>3.5 SCADA &amp; Monitoring</H4>
                <Tbl heads={['Component', 'Function', 'Notes']} rows={[
                    ['SCADA Servers', 'Redundant pair', 'Wonderware/AVEVA, 10,000+ I/O points'],
                    ['Fiber Backbone', 'Redundant ring', 'Single-mode, 96-core, DWDM'],
                    ['PLC Network', 'Distributed I/O', 'Siemens S7 / AB, EtherNet/IP ring'],
                    ['Video Wall', 'TOC display', '4×8 55" LCD, IP decoding, 4K'],
                    ['Historian', 'Data logging', '2-year online, 10-year archive, PI/OSI'],
                ]} />
            </S>
            <S n={4} t="Process Diagrams" id="process">
                <H4>4.1 Normal Operations</H4>
                <Ascii>{`CO/NO₂/visibility sensors poll (10s) → PLC logic
  → Fan speed adjustment (VFD) → Maintain CO <25 ppm
  → Lane control green ↓ → Toll gantry charge → VMS info`}</Ascii>
                <H4>4.2 Fire Emergency Sequence</H4>
                <Ascii>{`LHD/VESDA alarm → SCADA fire mode → Close bore to traffic
  → Jet fans ramp (critical velocity) → FFFS zone activate
  → PA/EVAC → Cross-passage doors unlock → FD standpipe
  → Response: Fire dept portal entry within 8 min`}</Ascii>
                <H4>4.3 Overheight Vehicle Detection</H4>
                <Ascii>{`Laser curtain detects >4.9 m → Warning signs activate
  → VMS "STOP" → Lane control Red X → Traffic halt
  → Operator confirms via CCTV → Escort or divert`}</Ascii>
                <H4>4.4 Incident Management</H4>
                <Ascii>{`CCTV/detector anomaly → TOC operator alert → Verify on video
  → Lane closure (VMS + LCS) → EMS/PD dispatch → Clear scene
  → Reopen → Resume normal ventilation & lane control`}</Ascii>
            </S>
            <S n={5} t="Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2 italic">2 km twin-tube tunnel (2+2 lanes, dual bore)</p>
                <Tbl heads={['Equipment', 'Qty', 'Specification']} rows={[
                    ['Jet Fans', '20', '50 kW, 45 N, reversible, VFD'],
                    ['CO Sensors', '40', 'Electrochemical, 0-500 ppm, NDIR'],
                    ['NO₂ Sensors', '20', '0-10 ppm, electrochemical'],
                    ['Visibility Sensors', '20', 'Forward scatter, EN 50545'],
                    ['Linear Heat Detection', '4 km', 'Fiber DTS, 1°C resolution'],
                    ['VESDA', '20', 'Aspirating, 0.005% obs/m'],
                    ['FFFS Piping/Nozzles', '80 zones', 'Deluge foam, 0.26 gpm/ft²'],
                    ['Standpipe Outlets', '40', '2.5" hose, 250 gpm'],
                    ['Emergency Phones', '50', 'SOS, direct TOC line'],
                    ['Cross-Passages', '12', 'Fire-rated 2 hrs, pressurized'],
                    ['Lane Control Signals', '40', 'LED, red X / green ↓'],
                    ['VMS', '8', '3-line LED, NTCIP 1203'],
                    ['CCTV Cameras', '40', '4K PTZ, IR, ONVIF'],
                    ['Vehicle Detectors', '40', 'Radar+loop, speed/class'],
                    ['Height Detectors', '4', 'Laser curtain, 4.9 m'],
                    ['LED Tunnel Lighting', '2000', 'Counter-beam, 100 cd/m²'],
                    ['Diesel Generators', '2', '3 MW, 480V, 72-hr fuel'],
                    ['UPS', '4', '300 kVA, 30 min'],
                    ['PLCs (I/O cabinets)', '20', 'Siemens/AB, EtherNet/IP'],
                    ['SCADA Servers', '2+DR', 'Redundant, 10k I/O'],
                    ['Video Wall', '1', '4×8 55" LCD array'],
                    ['Fiber Cable', '8 km', '96-core SMF, redundant ring'],
                    ['PA Speakers', '100', '100W, EN 54-16'],
                    ['ETC Gantries', '4', 'RFID + LPR, open road'],
                ]} />
            </S>
            <S n={6} t="Purdue Model / ISA-95 Mapping" id="purdue">
                <Tbl heads={['Level', 'Function', 'Tunnel Components', 'Protocols']} rows={[
                    ['L0', 'Sensing', 'CO/NO₂/vis sensors, LHD, CCTV', '4-20 mA, HART, IP'],
                    ['L1', 'Control', 'Fan PLC/VFD, fire alarm panel, lane ctrl PLC', 'Modbus, EtherNet/IP'],
                    ['L2', 'Supervisory', 'SCADA HMI (Wonderware), video wall', 'OPC UA, TCP/IP'],
                    ['L3', 'Operations', 'TOC incident mgmt, traffic mgmt center', 'NTCIP, REST'],
                    ['L3.5', 'DMZ', 'OT/IT firewall, IDS, data diode', 'IEC 62443, TLS'],
                    ['L4', 'Enterprise', 'DOT asset mgmt, toll revenue, FHWA reporting', 'REST, SOAP'],
                ]} />
            </S>
            <S n={7} t="Safety &amp; Supporting Systems" id="safety">
                <Tbl heads={['System', 'Standard', 'Specification']} rows={[
                    ['Fire Resistance', 'NFPA 502', '2-hr structural, IEC 60331 cables'],
                    ['Emergency Egress', 'NFPA 502', 'Cross-passage every 100-200 m, pressurized'],
                    ['Fire Brigade Access', 'NFPA 502', 'Standpipe 2.5" @100 ft, dry riser at portals'],
                    ['Seismic Design', 'AASHTO LRFD', 'Zone-specific PGA, isolation bearings'],
                    ['Flood Protection', 'FHWA', 'Flood gates, sump pumps (500-2000 gpm)'],
                    ['HAZMAT Detection', 'NFPA 502', 'Vehicle class detection, HAZMAT gate interlock'],
                ]} />
            </S>
            <S n={8} t="Communication Protocol Stack" id="protocols">
                <Ascii>{`Enterprise:  NTCIP (TMC) │ Toll/revenue │ FHWA reporting
Network:     DWDM fiber │ GigE ring │ UHF radio (FD)
Supervisory: OPC UA │ SNMP │ ONVIF │ BACnet/IP
Control:     EtherNet/IP │ Modbus TCP │ PROFINET
Field:       4-20 mA │ HART │ discrete I/O │ video IP`}</Ascii>
            </S>
            <S n={9} t="Data Flow Architecture" id="data-flow">
                <Ascii>{`Field (L0)          Control (L1)       SCADA (L2)
CO sensor──4-20───►Fan PLC/VFD──EIP──►SCADA HMI
LHD fiber──DTS────►Fire panel──ser───►SCADA Alarm
CCTV──────IP─────►NVR─────────TCP──►Video Wall
Detector──loop────►LCS PLC────EIP──►TOC Display
                                       │ L3.5 DMZ
Operations (L3)       Enterprise (L4)
TOC Incident Mgmt◄─NTCIP─►Traffic Mgmt Center
Toll System◄──────REST──►Revenue/DOT
FHWA Report◄─────SOAP──►Federal NTIS`}</Ascii>
            </S>
            <S n={10} t="References" id="references">
                <Refs items={[
                    'NFPA. (2023). NFPA 502: Standard for road tunnels, bridges & other limited access highways. NFPA.',
                    'FHWA. (2020). National Tunnel Inspection Standards (NTIS). DOT.',
                    'AASHTO. (2021). Technical manual for design of road tunnels. AASHTO.',
                    'PIARC. (2019). Road tunnels: Operational strategies for emergency ventilation. WRA.',
                    'IEC. (2010). IEC 61508: Functional safety of electrical/electronic systems. IEC.',
                    'The Open Group. (2022). TOGAF Standard, Version 10.',
                    'ASHRAE. (2022). ASHRAE 62.1: Ventilation for acceptable indoor air quality.',
                    'NCHRP. (2023). Report 944: Fire safety in highway tunnels. TRB.',
                ]} />
            </S>
            <SeeAlso links={[
                { href: '/wiki/transportation', label: 'Transportation Hub', color: '#0EA5E9' },
                { href: '/wiki/sectors/TRAN', label: 'Sector Overview', color: '#0EA5E9' },
                { href: '/wiki/transportation/metro-rail', label: 'Metro Rail System', color: '#EC4899' },
            ]} />
        </div>
    );
}
function S({ n, t, id, children }: { n: number; t: string; id: string; children: React.ReactNode }) {
    return (<section id={id} className="space-y-4"><h2 className="text-lg font-heading font-semibold text-white"><span className="text-[#10B981] mr-2">{n}.</span>{t}</h2>{children}</section>);
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
