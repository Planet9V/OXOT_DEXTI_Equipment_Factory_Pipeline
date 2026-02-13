/**
 * Classification Yard Deep-Dive Reference Architecture.
 * Hump/retarder, switch machines, AEI/RFID, trim ops, yard comms.
 * @module wiki/transportation/classification-yard/page
 */
export const metadata = {
    title: 'Classification Yard — Transportation Wiki',
    description: 'TOGAF reference architecture for freight rail classification yards: hump crest/master retarders, switch machines, AEI/RFID wayside, trim operations, ATCS communications.',
};
export default function ClassificationYardPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #EF4444, #DC2626)' }}>🚂</div>
                    <div>
                        <span className="text-[10px] text-gray-500 font-mono block">TRAN-RL-YARD</span>
                        <h1 className="text-2xl font-heading font-bold text-white">Classification Yard Reference Architecture</h1>
                    </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">TOGAF-based reference architecture for Class I freight railroad classification (hump) yards covering hump crest and master/group/inert retarder systems, 600V DC point machines with CTC/DTC interlocking, AEI/RFID wayside detection, trim engine operations, and PTC-integrated ATCS communications.</p>
            </div>
            <S n={1} t="TOGAF Business Architecture" id="togaf">
                <H4>Stakeholder Map</H4>
                <Tbl heads={['Stakeholder', 'Role', 'Interest']} rows={[
                    ['Class I Railroads', 'Owner/Operator', 'BNSF, UP, CSX, NS — throughput, dwell time'],
                    ['FRA', 'Regulatory', '49 CFR 236/232, safety oversight'],
                    ['STB', 'Economic', 'Rate regulation, service disputes'],
                    ['AAR', 'Industry Standards', 'S-918 (AEI), interchange rules'],
                    ['Unions (SMART-TD/BLET)', 'Labor', 'Engineers, conductors, carmen'],
                    ['Shippers', 'Customer', 'Block allocation, transit time, reliability'],
                    ['Signal/Switch OEMs', 'Supplier', 'GE/Alstom/Hitachi — signal equipment'],
                ]} />
                <H4>Regulatory Framework</H4>
                <Tbl heads={['Standard', 'Title', 'Scope']} rows={[
                    ['49 CFR 236', 'Signal Systems', 'Interlocking, automatic block signals'],
                    ['49 CFR 232', 'Brake Safety', 'Train brake tests, blue flag protection'],
                    ['FRA Order 20', 'Hump Yard Safety', 'Retarder testing, speed limits, employee safety'],
                    ['AAR S-918', 'AEI Standard', '128-bit passive RFID at 915 MHz, read rate 99.95%'],
                    ['AAR MSRP Ch. 17', 'Car Inspection', 'Pre-departure mechanical safety inspections'],
                    ['49 CFR 213', 'Track Safety', 'Track classes I-IX, gauge, alignment, ballast'],
                ]} />
            </S>
            <S n={2} t="High-Level Design" id="hld">
                <Ascii>{`┌─────── RECEIVING YARD ──────────────────────────────┐
│ Inbound trains → Tracks (10-20) → Locomotive cut-off │
│ AEI scan → Car ID → Consist planning (TYES/RYMS)     │
├──────────────────────────────────────────────────────┤
│ HUMP CREST (1.5-3.0% grade)                          │
│  Radar speed sensors → Master Retarder ('tangential') │
│  → Group Retarders → Inert Retarders                  │
│  Speed profile: 4-6 mph at crest → <4 mph coupling   │
├──────────────────────────────────────────────────────┤
│ CLASSIFICATION BOWL (40-72 tracks)                    │
│  Switch machines → Rail alignment → Track occupancy   │
│  → Cars sorted by destination block                   │
├──────────────────────────────────────────────────────┤
│ DEPARTURE YARD (10-20 tracks)                         │
│  Trim engines assemble → Air test → Power applied     │
│  → Class I initial terminal test → Train departs      │
└──────────────────────────────────────────────────────┘`}</Ascii>
            </S>
            <S n={3} t="Detailed Technical Description" id="tech">
                <H4>3.1 Hump &amp; Retarder System</H4>
                <Tbl heads={['Component', 'Type', 'Specification']} rows={[
                    ['Hump Crest', 'Gravity, 1.5-3.0% grade', 'Hump engine pushes at 1-3 mph'],
                    ['Master Retarder', 'Tangential beam, hydraulic', 'Braking force 0 to 8,000 lbf per rail'],
                    ['Group Retarder', 'Dowty/beam', 'Secondary speed control, 4 mph to <5 mph'],
                    ['Inert Retarder', 'Spring-loaded drag', 'Track-level, passive, <4 mph coupling'],
                    ['Speed Sensors', 'Doppler radar', '0-25 mph, ±0.1 mph accuracy'],
                    ['Weight-in-Motion', 'Track-mounted strain gauge', '50-286k lbs, ±2% accuracy'],
                    ['Hump Control', 'Process computer', 'Auto speed profiling per car weight/rolling'],
                ]} />
                <H4>3.2 Switch Machines &amp; Interlocking</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Power Switch', 'M23A/M23B electric', '600V DC, 300 in-oz, 6-sec throw'],
                    ['Hand-throw Switch', 'Manual, spring-return', 'Emergency backup, indicator lights'],
                    ['Interlocking', 'CTC/DTC electronic', 'Vital logic, SIL-4, EN 50128'],
                    ['Track Circuit', 'Audio-frequency (AF)', '2 kHz, 2000 ft range, iron-eddy break'],
                    ['Axle Counters', 'Inductive (Frauscher)', '100% detection, no track circuit gaps'],
                    ['Signal Heads', 'LED searchlight/colorlight', '3-aspect, 2000 ft visibility'],
                ]} />
                <H4>3.3 AEI / RFID &amp; Car Identification</H4>
                <Tbl heads={['System', 'Standard', 'Specification']} rows={[
                    ['AEI Tag', 'AAR S-918, 128-bit', 'Passive UHF (915 MHz), read at 60 mph'],
                    ['Wayside Reader', 'Multi-protocol', '2-antenna, 25 ft range, 99.95% read rate'],
                    ['Machine Vision', 'AI car inspection', 'Wheel profiles, brake shoe, handbrake'],
                    ['Acoustic Bearing', 'Wayside microphone', 'Hot bearing detect at 60 mph, 0.5 dB sensitivity'],
                    ['WILD', 'Wheel Impact Load', '286k car at speed, impact >90 kip flagged'],
                ]} />
                <H4>3.4 Trim &amp; Departure Operations</H4>
                <Tbl heads={['Operation', 'Equipment', 'Specification']} rows={[
                    ['Trim Engines', 'GP40/SW1500', '2-3 per yard, coupling/spotting cars'],
                    ['Air Brake Test', '1000 CFM compressor', 'Class IA test, 15 psi red. from 90 psi'],
                    ['Blue Flag Protection', 'Derails + flags', '49 CFR 218, maintenance protection'],
                    ['Handbrake Application', '16 handbrakes/ton', 'Per AAR/FRA, sufficient to hold grade'],
                    ['Departure Signal', 'CTC dispatcher', 'Signal indication + track warrant'],
                ]} />
            </S>
            <S n={4} t="Process Diagrams" id="process">
                <H4>4.1 Inbound to Classification</H4>
                <Ascii>{`Inbound train → AEI scan → Receiving yard → Locomotive cut
  → TYES consist plan → Hump engine push → Crest → Retarders
  → Switch machines route car to bowl track → coupling <4 mph`}</Ascii>
                <H4>4.2 Hump Speed Profile</H4>
                <Ascii>{`Crest (1-3 mph) → Master Retarder (reduce to 5-6 mph)
  → Group Retarder (reduce to <5 mph) → Inert Retarder
  → Bowl track coupling (<4 mph, 3 mph target)`}</Ascii>
                <H4>4.3 Departure Assembly</H4>
                <Ascii>{`Bowl track → Trim engine pull block → Departure track
  → Air brake test (Class IA) → Trainline charge
  → Power + crew → CTC departure → Mainline`}</Ascii>
                <H4>4.4 Wayside Detection Data</H4>
                <Ascii>{`AEI tag read → Consist database update → TYES/RYMS
  WILD/acoustic/vision → Defect alert → Set-out/repair track`}</Ascii>
            </S>
            <S n={5} t="Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2 italic">Mid-size hump yard (48 bowl tracks, 15 receiving/15 departure)</p>
                <Tbl heads={['Equipment', 'Qty', 'Specification']} rows={[
                    ['Master Retarders', '4', 'Tangential hydraulic, 8000 lbf/rail'],
                    ['Group Retarders', '24', 'Dowty/beam, 3000 lbf'],
                    ['Inert Retarders', '96', 'Spring drag, passive, per track'],
                    ['Power Switches', '120', 'M23A, 600V DC, 300 in-oz'],
                    ['AEI Readers', '10', '2-antenna, 915 MHz, 99.95%'],
                    ['AEI Tags (installed)', '800k+', 'AAR S-918, fleet-wide'],
                    ['Speed Sensors', '48', 'Doppler radar, 0-25 mph'],
                    ['Weight-in-Motion', '2', 'Track-mounted, 286k lb capacity'],
                    ['Track Circuits', '200', 'AF 2 kHz, 2000 ft'],
                    ['Signal Heads', '48', '3-aspect LED, 2000 ft vis'],
                    ['Hump Control Computer', '1+spare', 'Auto speed profiling'],
                    ['WILD Systems', '2', 'Impact load monitor, 90 kip'],
                    ['Acoustic Bearing Detect', '2', 'Wayside, hot-box alert'],
                    ['Machine Vision', '4', 'AI wheel/brake inspection'],
                    ['Trim Locomotives', '3', 'GP40/SW1500, 2000-3000 HP'],
                    ['Brake Test Compressors', '4', '1000 CFM, 130 psig'],
                    ['CTC/Dispatching Console', '2+spare', 'Vital logic, SIL-4'],
                    ['Yard Lighting', '300 poles', '400W HPS/LEDs, 5 fc'],
                    ['VHF Radio Repeaters', '6', '160 MHz, 50W ERP'],
                    ['Fiber Backbone', '20 km', '96-core SMF, DWDM'],
                    ['UPS Systems', '4', '250 kVA, 30 min'],
                    ['Diesel Generator', '2', '500 kW, 480V backup'],
                ]} />
            </S>
            <S n={6} t="Purdue Model / ISA-95 Mapping" id="purdue">
                <Tbl heads={['Level', 'Function', 'Yard Components', 'Protocols']} rows={[
                    ['L0', 'Sensing', 'AEI readers, track circuits, weight-in-motion', 'UHF 915 MHz, AF 2 kHz'],
                    ['L1', 'Control', 'Switch machines, retarder PLCs, signal heads', '600V DC, serial'],
                    ['L2', 'Supervisory', 'Hump computer, CTC/DTC, yard SCADA', 'OPC UA, TCP/IP'],
                    ['L3', 'Operations', 'TYES (yard mgmt), waybill, consist planning', 'EDI X12, ATCS'],
                    ['L3.5', 'DMZ', 'Railroad firewalls, ATCS encryption', 'PTC/ATCS channels'],
                    ['L4', 'Enterprise', 'TMS, ERP, customer portals, Class I ops', 'REST, EDI 404/417'],
                ]} />
            </S>
            <S n={7} t="Safety &amp; Supporting Systems" id="safety">
                <Tbl heads={['System', 'Standard', 'Specification']} rows={[
                    ['Blue Flag Protection', '49 CFR 218', 'Derails + blue flags for under/on/between cars'],
                    ['Retarder Testing', 'FRA Order 20', 'Daily functional tests, annual calibration'],
                    ['Hump Speed Limits', 'FRA', '<3 mph over crest, <4 mph coupling'],
                    ['Track Geometry', '49 CFR 213', 'Annual inspection, geometry car, 56 lb min rail'],
                    ['Emergency Derails', 'Manual/electric', 'Prevent runaway into mainline'],
                    ['Grade Crossing', '49 CFR 234', 'Gates, flashers, constant warning time'],
                ]} />
            </S>
            <S n={8} t="Communication Protocol Stack" id="protocols">
                <Ascii>{`Enterprise:  EDI 404/417 │ TMS REST API │ Customer portals
Network:     ATCS (220 MHz) │ PTC overlay │ Fiber DWDM
Supervisory: OPC UA │ CTC dispatch link │ TCP/IP LAN
Control:     600V DC switch control │ serial retarder │ AF track
Field:       UHF 915 MHz (AEI) │ 2 kHz AF │ discrete I/O`}</Ascii>
            </S>
            <S n={9} t="Data Flow Architecture" id="data-flow">
                <Ascii>{`Field (L0)           Control (L1)         SCADA (L2)
AEI reader──UHF───►Consist DB────TCP───►TYES Yard Mgmt
Track ckt──AF─────►Switch PLC────ser───►CTC Console
Speed radar─4-20──►Retarder PLC──ser───►Hump Computer
WILD/acoustic─ser─►Defect alert──TCP───►Set-out Track
                                           │ L3.5 DMZ
Operations (L3)          Enterprise (L4)
TYES Yard Mgmt◄──EDI──►TMS (Class I)
Waybill System◄──X12──►Shipper / Customer
Crew Mgmt◄────────────►ERP (SAP/Oracle)`}</Ascii>
            </S>
            <S n={10} t="References" id="references">
                <Refs items={[
                    'FRA. (2023). 49 CFR Part 236: Signal and train control systems. DOT.',
                    'AAR. (2022). S-918: Automatic equipment identification standard. AAR.',
                    'AAR. (2023). Manual of Standards and Recommended Practices (MSRP). AAR.',
                    'FRA. (2020). Order 20: Hump yard safety. DOT.',
                    'AREMA. (2023). Manual for railway engineering (Vol. 4: Signals). AREMA.',
                    'FRA. (2023). 49 CFR Part 232: Brake system safety standards. DOT.',
                    'The Open Group. (2022). TOGAF Standard, Version 10.',
                    'IEEE. (2019). IEEE 1570: Standard for railroad communications. IEEE.',
                ]} />
            </S>
            <SeeAlso links={[
                { href: '/wiki/transportation', label: 'Transportation Hub', color: '#0EA5E9' },
                { href: '/wiki/sectors/TRAN', label: 'Sector Overview', color: '#0EA5E9' },
                { href: '/wiki/transportation/container-port', label: 'Container Port', color: '#6366F1' },
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
