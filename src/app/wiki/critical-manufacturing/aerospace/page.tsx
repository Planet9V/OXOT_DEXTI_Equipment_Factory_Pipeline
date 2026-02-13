/**
 * Aerospace Manufacturing Facility Deep-Dive Reference Architecture.
 * Composite layup/autoclave, 5-axis CNC, NDT, systems integration.
 * @module wiki/critical-manufacturing/aerospace/page
 */
export const metadata = {
    title: 'Aerospace Manufacturing — Critical Manufacturing Wiki',
    description: 'TOGAF reference architecture for aerospace manufacturing: composite autoclave curing, AFP/ATL layup, 5-axis CNC machining, NDT inspection (UT/radiography), AS9100/NADCAP, and digital thread MES/PLM.',
};
export default function AerospacePage() {
    return (
        <div className="max-w-5xl space-y-10">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #06B6D4, #0891B2)' }}>✈️</div>
                    <div>
                        <span className="text-[10px] text-gray-500 font-mono block">CMAN-TE-AERO</span>
                        <h1 className="text-2xl font-heading font-bold text-white">Aerospace Manufacturing Facility Reference Architecture</h1>
                    </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">TOGAF-based reference architecture for aerospace manufacturing covering composite layup (AFP/ATL, 1+ m/min), autoclave curing (180–400°C, 700 kPa), 5-axis CNC machining of titanium/Inconel, NDT inspection (UT phased array, digital radiography, shearography), systems integration bay, and flight-line delivery — all governed by AS9100D, NADCAP, FAA 14 CFR Part 21, and ITAR.</p>
            </div>
            <S n={1} t="TOGAF Business Architecture" id="togaf">
                <H4>Stakeholder Map</H4>
                <Tbl heads={['Stakeholder', 'Role', 'Interest']} rows={[
                    ['Airframe OEMs', 'Owner/Operator', 'Boeing, Airbus, Lockheed Martin, Northrop Grumman'],
                    ['Engine OEMs', 'Partner', 'GE Aerospace, Pratt & Whitney, Rolls-Royce, Safran'],
                    ['FAA / EASA', 'Regulatory', '14 CFR Part 21 (type cert), Part 145 (MRO)'],
                    ['DoD / DCMA', 'Defense', 'DFARS, ITAR, MIL-STD, DCMA surveillance'],
                    ['OSHA', 'Safety', '29 CFR 1910.212 (machining), composite dust, noise'],
                    ['NADCAP', 'Accreditation', 'Special processes: welding, heat treat, NDT, composites'],
                    ['Equipment OEMs', 'Supplier', 'Electroimpact (AFP), Makino/DMG (CNC), ASC (autoclave)'],
                    ['Airlines/Defense', 'Customer', 'Delivery schedule, quality, airworthiness compliance'],
                ]} />
                <H4>Regulatory Framework</H4>
                <Tbl heads={['Standard', 'Title', 'Scope']} rows={[
                    ['AS9100D', 'Aerospace QMS', 'Quality management based on ISO 9001 + aerospace reqts'],
                    ['NADCAP AC7114', 'Composites', 'Process control for composite layup and cure'],
                    ['FAA 14 CFR 21', 'Production Approval', 'Production certificate, quality system, conformity'],
                    ['DO-160G', 'Environmental Conditions', 'Equipment qualification testing standards'],
                    ['ITAR 22 CFR 120-130', 'Export Control', 'Defense articles, technical data, export license'],
                    ['AMS 2750G', 'Pyrometry', 'Furnace/autoclave temperature uniformity survey'],
                    ['NAS 410', 'NDT Personnel', 'Certification of nondestructive testing personnel'],
                ]} />
            </S>
            <S n={2} t="High-Level Design" id="hld">
                <Ascii>{`┌─── COMPOSITE FABRICATION ──────────────────────────────┐
│ Clean room (ISO 8): AFP/ATL layup on mandrel/tool        │
│ → Vacuum bag → Autoclave cure (180°C/700 kPa, 6-12 hr)  │
│ → Demolding → Trim (5-axis router) → NDT inspection       │
├─── METALLIC FABRICATION ──────────────────────────────┤
│ 5-axis CNC (Ti-6Al-4V, Inconel 718, Al 7050)            │
│ → Deburr → Heat treatment (solution/age) → NDT           │
│ → Surface treatment (anodize, primer, paint)              │
├─── SUB-ASSEMBLY ──────────────────────────────────────┤
│ Bonding/fastening → Sealant → Electrical install          │
│ → Hydraulic install → Systems test → In-process NDT       │
├─── FINAL ASSEMBLY ────────────────────────────────────┤
│ Join major sections (fuselage, wing, empennage)           │
│ → Systems integration (avionics, ECS, fuel, electrical)   │
│ → Function test → Paint → Flight test → Delivery          │
└────────────────────────────────────────────────────────┘`}</Ascii>
            </S>
            <S n={3} t="Detailed Technical Description" id="tech">
                <H4>3.1 Composite Layup &amp; Autoclave</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['AFP Machine', 'Electroimpact, 16-32 tow', '1+ m/min layup, ±0.5 mm accuracy, 6.35 mm tow'],
                    ['ATL Machine', 'Automated tape, 150-300 mm', '2-3 m/min, unidirectional prepreg'],
                    ['Autoclave', 'Large diameter', '6-30 m × 3-6 m dia, 180-400°C, 250-700 kPa'],
                    ['Clean Room', 'ISO 8, temp/humidity', '22±2°C, 45±10% RH, HEPA filtered'],
                    ['Laser Projector', 'LAP/Virtek', 'Ply boundary projection, ±0.5 mm, real-time'],
                    ['Ultrasonic Cutter', 'Gerber/Zünd', 'Prepreg cutting, nested layup kits'],
                ]} />
                <H4>3.2 5-Axis CNC Machining</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['5-Axis VMC', 'Makino T1/MAG', '40,000 RPM, HSK-A63, 40 m/min rapid'],
                    ['5-Axis HMC', 'DMG Mori DMU 340 P', 'X/Y/Z 3,400×2,800×1,200 mm, Ti capable'],
                    ['Large Gantry Mill', 'Dufieux/Jobs', 'X 20+ m, wing skin/spar, 5-axis head'],
                    ['Tool Management', 'Shrink-fit, balanced', 'G2.5 balance, 40,000 RPM, ceramic/CBN'],
                    ['HPCC', 'High-pressure coolant', '70-140 bar, through-spindle, chip evacuation'],
                ]} />
                <H4>3.3 NDT Inspection</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Phased Array UT', 'Olympus OmniScan X3', '64-128 elements, 5-20 MHz, C-scan imaging'],
                    ['Digital Radiography', 'GE DXR250U / Yxlon', '150-450 kV, flat panel, real-time'],
                    ['Shearography', 'Dantec/Steinbichler', 'Laser, vacuum excitation, delamination detect'],
                    ['Laser Tracker', 'Leica AT960-LR', '80 m range, 0.01 mm accuracy, 6DoF probe'],
                    ['CMM', 'Hexagon Global S', '1.2 m³, 1.5+L/333 µm, touch/scan probe'],
                    ['Thermography', 'FLIR X6900sc', 'IR, 640×512, 3 µm NETD, cure monitoring'],
                ]} />
                <H4>3.4 Systems Integration &amp; Flight Line</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Assembly Jigs', 'Determinant assembly', 'Laser-aligned, ±0.25 mm, configurable'],
                    ['Automated Drilling', 'Electroimpact E7000', 'Stack drilling (CFRP/Ti), 0.01 mm hole tolerance'],
                    ['Sealant Application', 'Robotic/manual', 'PR-1776, fuel tank rated, 72 hr cure'],
                    ['Wire Harness Install', 'Routing/termination', 'DO-160G, 100+ km wiring per aircraft'],
                    ['Avionics Integration', 'ARINC 429/664', 'IMA racks, flight computers, EFB'],
                    ['Functional Test', 'Ground test rig', 'Hydraulic, electrical, fuel, ECS, flight controls'],
                ]} />
            </S>
            <S n={4} t="Process Diagrams" id="process">
                <H4>4.1 Composite Part Flow</H4>
                <Ascii>{`Prepreg kitting → AFP/ATL layup → Debulk → Vacuum bag
→ Autoclave cure (180°C/700 kPa, 6-12 hr) → Demold → Trim
→ NDT (UT phased array, 100%) → Primer → Assembly`}</Ascii>
                <H4>4.2 Digital Thread</H4>
                <Ascii>{`CAD (CATIA/NX) → CAM (5-axis toolpaths) → CMM probing
→ MBD/PMI (STEP AP242) → MES (work orders, travelers)
→ PLM (Teamcenter/Windchill) → Serial number traceability
→ Airline delivery → In-service data → Feedback to design`}</Ascii>
                <H4>4.3 ITAR Controlled Data Flow</H4>
                <Ascii>{`ITAR data classification → Access control (need-to-know)
→ Encrypted storage → ITAR-compliant DMZ → No foreign access
→ NIST 800-171 / CMMC Level 2 → Audit trail → DCMA review`}</Ascii>
            </S>
            <S n={5} t="Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2 italic">Large aerostructures facility (wing/fuselage)</p>
                <Tbl heads={['Equipment', 'Qty', 'Specification']} rows={[
                    ['AFP Machines', '4-6', 'Electroimpact, 16-32 tow, 1+ m/min'],
                    ['Autoclaves', '3-4', '20 m × 5 m dia, 180°C, 700 kPa'],
                    ['5-Axis CNC (Ti)', '6-8', 'Makino T1, 40,000 RPM, HPCC'],
                    ['Large Gantry Mill', '2-3', '20+ m travel, wing skin/spar'],
                    ['Automated Drill', '4-6', 'Electroimpact E7000, CFRP/Ti stack'],
                    ['Phased Array UT', '8-12', 'Olympus OmniScan, 100% inspection'],
                    ['Digital X-ray', '2-3', '450 kV, flat panel, real-time'],
                    ['Laser Trackers', '10-15', 'Leica AT960, 80 m, 0.01 mm'],
                    ['CMM', '4-6', 'Hexagon, 1.2 m³, touch/scan'],
                    ['Assembly Jigs', '10-20', 'Determinant, laser-aligned'],
                    ['Overhead Cranes', '6-10', '20-50 t, 30+ m span'],
                    ['Clean Rooms', '2-4', 'ISO 8, temp/humidity controlled'],
                    ['CNC Router', '2-3', '5-axis, composite trimming'],
                    ['Freezer Storage', '2', 'Prepreg, -18°C, 200+ m²'],
                    ['PLM/MES', '1', 'Siemens Teamcenter, Solumina MES'],
                    ['PLC/SCADA', '1', 'Siemens/AB, autoclave control'],
                    ['Laser Projectors', '10+', 'LAP/Virtek, ply projection'],
                    ['Sealant Robots', '4-6', 'Fuel tank sealant, PR-1776'],
                    ['Paint Booth', '1-2', 'Widebody capable, HVLP, NFPA 33'],
                    ['Emergency Generator', '1', '1 MW, autoclave critical loads'],
                ]} />
            </S>
            <S n={6} t="Purdue Model / ISA-95 Mapping" id="purdue">
                <Tbl heads={['Level', 'Function', 'Components', 'Protocols']} rows={[
                    ['L0', 'Sensing', 'Encoders (EnDat 2.2, 1 µm), force sensors, thermocouples, LVDT', 'Analog, EnDat, RS-485'],
                    ['L1', 'Control', 'CNC controllers (Fanuc 31i/Siemens 840D), autoclave PLC, drill PLC', 'EtherCAT, SERCOS III, Profinet'],
                    ['L2', 'Supervisory', 'Cell SCADA, NDT station, autoclave monitoring, CMM data', 'OPC UA, MTConnect, SQL'],
                    ['L3', 'Operations', 'MES (Solumina), PLM (Teamcenter), digital thread, serial tracking', 'STEP AP242, REST, MQTT'],
                    ['L3.5', 'DMZ', 'ITAR-compliant gateway, data diode, Windchill relay', 'TLS 1.3, CMMC controls'],
                    ['L4', 'Enterprise', 'ERP (SAP), program management, airline customer portal', 'HTTPS, IDoc, EDI'],
                ]} />
            </S>
            <S n={7} t="Safety &amp; Supporting Systems" id="safety">
                <Tbl heads={['System', 'Standard', 'Specification']} rows={[
                    ['Composite Dust', 'OSHA PEL', 'Carbon fiber respirable: 5 µm, LEV at cutting/sanding'],
                    ['Autoclave Pressure', 'ASME BPVC', '700 kPa, relief valves, emergency vent, door interlock'],
                    ['CNC Guarding', 'OSHA 1910.212', 'Full enclosure, chip evacuation, coolant containment'],
                    ['Radiation Safety', 'NRC 10 CFR 34', 'X-ray room shielding, survey meters, dosimetry'],
                    ['Chemical Safety', 'OSHA 1910.1200', 'Sealant (PR-1776), chromate primer, MEK, LEV'],
                    ['Aircraft Hangars', 'NFPA 409', 'Foam-water suppression, deluge, draft curtains'],
                ]} />
            </S>
            <S n={8} t="Communication Protocol Stack" id="protocols">
                <Ascii>{`Enterprise:  SAP ERP │ Teamcenter PLM │ ITAR-secure portal │ FAA/EASA
Application: OPC UA │ MTConnect │ STEP AP242 │ REST/MQTT │ ARINC
Network:     Industrial Ethernet 10 Gbps │ Fiber │ ITAR isolated VLAN
Supervisory: Profinet IRT │ EtherNet/IP │ CMM data link
Control:     EtherCAT │ SERCOS III │ CNC link │ Autoclave PLC
Field:       EnDat 2.2 │ SSI encoder │ 4-20 mA │ Thermocouple │ LVDT`}</Ascii>
            </S>
            <S n={9} t="Data Flow Architecture" id="data-flow">
                <Ascii>{`Field (L0)          Control (L1)       SCADA (L2)
Encoder──EnDat───►CNC 840D──EtherCAT►Cell SCADA
T/C──4-20────────►Autoclave PLC─────►Cure monitoring
Force sensor─────►Drill ctrl────────►Hole quality log
CMM probe────────►CMM controller────►Deviation report
                                      │ ITAR DMZ (L3.5)
Operations (L3)        Enterprise (L4)
MES (traveler)◄─REST──►SAP ERP
PLM (Teamcenter)◄─AP242►Design office
Serial tracking◄──────►FAA/airline traceability`}</Ascii>
            </S>
            <S n={10} t="References" id="references">
                <Refs items={[
                    'SAE International. (2016). AS9100D: Quality Management Systems — Requirements for Aviation, Space and Defense. SAE.',
                    'PRI/NADCAP. (2023). AC7114: Composites Audit Criteria. PRI.',
                    'FAA. (2023). 14 CFR Part 21: Certification Procedures for Products and Articles. FAA.',
                    'RTCA. (2014). DO-160G: Environmental Conditions and Test Procedures for Airborne Equipment. RTCA.',
                    'Campbell, F.C. (2010). Structural Composite Materials. ASM International.',
                    'The Open Group. (2022). TOGAF Standard, Version 10.',
                    'Electroimpact. (2023). Automated Fiber Placement Technology Reference Guide.',
                    'NIST. (2020). SP 800-171r2: Protecting CUI in Nonfederal Systems. NIST.',
                ]} />
            </S>
            <SeeAlso links={[
                { href: '/wiki/critical-manufacturing', label: 'Critical Manufacturing Hub', color: '#F97316' },
                { href: '/wiki/sectors/MANU', label: 'Sector Overview', color: '#F97316' },
                { href: '/wiki/critical-manufacturing/automotive-assembly', label: 'Automotive Assembly', color: '#3B82F6' },
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
