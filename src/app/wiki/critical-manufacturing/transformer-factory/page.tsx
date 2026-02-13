/**
 * Power Transformer Factory Deep-Dive Reference Architecture.
 * Core cutting/stacking, winding, insulation, vacuum drying, oil filling, testing.
 * @module wiki/critical-manufacturing/transformer-factory/page
 */
export const metadata = {
    title: 'Power Transformer Factory — Critical Manufacturing Wiki',
    description: 'TOGAF reference architecture for power transformer factories: core cutting/stacking (GEORG), winding machines, insulation assembly, vacuum drying ovens, oil filling, impulse testing (2000 kV BIL), IEEE C57.12/IEC 60076.',
};
export default function TransformerFactoryPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #EC4899, #DB2777)' }}>🔌</div>
                    <div>
                        <span className="text-[10px] text-gray-500 font-mono block">CMAN-EE-TRANS</span>
                        <h1 className="text-2xl font-heading font-bold text-white">Power Transformer Factory Reference Architecture</h1>
                    </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">TOGAF-based reference architecture for power transformer manufacturing (10–1,500 MVA, 69–765 kV class) covering CRGO core cutting/stacking (GEORG lines), HV/LV winding machines, cellulose/pressboard insulation assembly, vacuum drying ovens (100–300 m³), transformer oil filling/degassing, and factory acceptance testing including impulse (2,000 kV BIL), induced voltage, and heat run — governed by IEEE C57.12 and IEC 60076.</p>
            </div>
            <S n={1} t="TOGAF Business Architecture" id="togaf">
                <H4>Stakeholder Map</H4>
                <Tbl heads={['Stakeholder', 'Role', 'Interest']} rows={[
                    ['Transformer OEMs', 'Owner/Operator', 'Hitachi Energy (ABB), Siemens Energy, GE Vernova, TBEA, Hyundai Electric'],
                    ['Electric Utilities', 'Customer', 'Transmission/distribution, substation deployment'],
                    ['IEEE', 'Standards', 'C57 series — design, test, loading guide'],
                    ['IEC', 'Standards', '60076 series — power transformer requirements'],
                    ['OSHA', 'Safety', '29 CFR 1910 — electrical, crane, confined space'],
                    ['NFPA', 'Fire Protection', 'NFPA 86 (ovens), NFPA 70E (arc flash)'],
                    ['DOE', 'Energy Efficiency', '10 CFR 431 (distribution transformer efficiency)'],
                    ['NERC', 'Grid Reliability', 'Critical infrastructure, spares strategy'],
                ]} />
                <H4>Regulatory Framework</H4>
                <Tbl heads={['Standard', 'Title', 'Scope']} rows={[
                    ['IEEE C57.12.00', 'General Requirements', 'Power transformers — 500 kVA and larger'],
                    ['IEEE C57.12.90', 'Test Code', 'Factory test procedures for liquid-immersed'],
                    ['IEC 60076-1/3/4/5', 'Power Transformers', 'General, insulation levels, taps, heat run'],
                    ['IEC 60076-3', 'Insulation Levels', 'BIL, switching impulse, applied voltage'],
                    ['NFPA 86', 'Ovens/Furnaces', 'Vacuum oven and drying oven safety'],
                    ['OSHA 1910.269', 'Electric Power Generation', 'High-voltage testing, qualified workers'],
                    ['DOE 10 CFR 431', 'Efficiency Standards', 'Distribution transformer min efficiency'],
                ]} />
            </S>
            <S n={2} t="High-Level Design" id="hld">
                <Ascii>{`┌─── CORE MANUFACTURING ─────────────────────────────────┐
│ CRGO silicon steel (0.23-0.30 mm, Hi-B grain-oriented)   │
│ → Slitting → Step-lap cutting (GEORG line) → Stacking    │
│ → Core clamping → Core loss test → To assembly            │
├─── WINDING ────────────────────────────────────────────┤
│ Cu/Al conductor → Winding machine (horizontal/vertical)  │
│ → LV disc/helical winding → HV disc/interleaved winding │
│ → Tap winding → Winding pressing → Electrical test        │
├─── INSULATION & ASSEMBLY ─────────────────────────────┤
│ Pressboard barriers → Insulation assembly → Core + coil  │
│ → Lead routing → Tap changer install → Tank-down           │
│ → Bushing installation → Cover → Gasket sealing            │
├─── DRYING & OIL FILLING ─────────────────────────────┤
│ Vacuum drying oven (80-120°C, <1 mbar, 7-21 days)       │
│ → Oil purification (1 ppm moisture, <5 ppm gas)          │
│ → Vacuum oil filling → Standing → Oil sampling             │
├─── FACTORY ACCEPTANCE TEST ───────────────────────────┤
│ Routine: Ratio, winding R, impedance, losses, insulation │
│ Type: Impulse (full + chopped), switching, heat run       │
│ Special: FRA, partial discharge, sound level               │
└────────────────────────────────────────────────────────┘`}</Ascii>
            </S>
            <S n={3} t="Detailed Technical Description" id="tech">
                <H4>3.1 Core Manufacturing</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['CRGO Slitting Line', 'Precision, burr-free', '0.23-0.30 mm, M3/M4 grade, ±0.05 mm width'],
                    ['Core Cutting Line', 'GEORG step-lap CNC', '60° mitered, automated stacking, 45°/90° joints'],
                    ['Core Stacking Table', 'Hydraulic tilt', '20-100 ton core, ±0.5 mm registration'],
                    ['Core Clamp Frame', 'Steel, insulated bolts', 'Core clamping pressure 5-10 kPa, grounding'],
                    ['Core Loss Test', 'Low-voltage excitation', 'W/kg at 1.7 T, 50/60 Hz, per IEC 60076-1'],
                ]} />
                <H4>3.2 Winding</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Horizontal Winding Machine', 'CNC, servo tension', '500-2,000 kg conductor, 0.1 mm position, auto count'],
                    ['Vertical Winding Machine', 'Large power, disc', '3-5 m diameter, 100+ discs, Cu or CTC conductor'],
                    ['CTC (Continuously Transposed Conductor)', 'Epoxy-bonded', '9-75 strands, rated to 220 kV+, reduced eddy loss'],
                    ['Winding Press', 'Hydraulic', '100-500 ton, axial compression, clamping ring'],
                    ['Conductor Insulation', 'Paper/enamel wrapping', 'Kraft paper, 0.05-0.1 mm per layer, overlap wrap'],
                ]} />
                <H4>3.3 Insulation &amp; Tank Assembly</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Pressboard Forming', 'Laminated, molded', 'T-IV grade, 2-10 mm, 765 kV rated barriers'],
                    ['Insulation Assembly', 'Manual, precision', 'Radial spacers, axial blocks, lead support'],
                    ['Active Part Assembly', 'Core + coil mate', 'Core lowered into windings (or vice versa)'],
                    ['Tank', 'Corrugated/radiator', 'Mild steel, leak tested, painted (C5-M/C5-I)'],
                    ['Bushings', 'Condenser OIP/RIP', 'Up to 1,200 kV BIL, 3,000 A, IEEE C57.19'],
                    ['OLTC', 'On-load tap changer', 'Reinhausen/Hitachi, 17-33 positions, ±10%'],
                ]} />
                <H4>3.4 Vacuum Drying &amp; Oil Processing</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Vacuum Drying Oven', 'Steel chamber', '100-300 m³, 80-120°C, <1 mbar, kerosene vapor'],
                    ['Oil Purification', 'Centrifuge + vacuum', '1 ppm moisture, <5 ppm dissolved gas, 10,000 L/hr'],
                    ['Vacuum Oil Filling', 'In-tank, <1 mbar', '<10 ppm moisture in oil after fill, degassed'],
                    ['Oil Storage', 'Bulk, nitrogen blanket', '50,000-200,000 L, IEC 60296 Grade I/II'],
                ]} />
                <H4>3.5 Factory Acceptance Test (FAT)</H4>
                <Tbl heads={['Test', 'Standard', 'Specification']} rows={[
                    ['Ratio Test', 'IEEE C57.12.90 §8', 'All taps, ±0.5% rated ratio'],
                    ['Winding Resistance', 'C57.12.90 §9', '4-wire Kelvin, temperature corrected, all taps'],
                    ['Impedance / Losses', 'C57.12.90 §10/11', 'Short circuit impedance ±7.5%, load loss ±6%'],
                    ['No-Load Loss', 'C57.12.90 §10', 'Core loss ±10%, excitation current'],
                    ['Applied Voltage', 'IEC 60076-3', '60 sec, 2×rated, displacement current monitor'],
                    ['Induced Voltage', 'IEC 60076-3', 'PD monitored, 200 Hz, 1.7×rated, 7,200 cycles'],
                    ['Lightning Impulse', 'IEEE C57.98', 'Full wave + chopped, BIL up to 2,050 kV'],
                    ['Switching Impulse', 'IEC 60076-3', 'Phase-to-ground, positive polarity, BSL'],
                    ['Heat Run', 'IEEE C57.12.90 §11', 'Full load, 65/55°C rise, top oil + hotspot'],
                    ['FRA', 'IEC 60076-18', 'Sweep frequency response, baseline for transport'],
                    ['Partial Discharge', 'IEC 60076-3', '<100 pC at 1.5×Um during induced test'],
                    ['Sound Level', 'IEEE C57.12.90 §13', 'NEMA TP1, guaranteed dB(A) per spec'],
                ]} />
            </S>
            <S n={4} t="Process Diagrams" id="process">
                <H4>4.1 Transformer Manufacturing Flow</H4>
                <Ascii>{`CRGO coil → Slit → GEORG step-lap cut → Core stack → Clamp
→ Core loss test → Accept → Winding: LV → HV → Tap
→ Winding press → Insulation assembly (pressboard barriers)
→ Active part = core + coils → Lead routing → Tank down
→ Bushing install → OLTC → Cover → Vacuum dry (7-21 days)
→ Oil fill (vacuum) → Standing → FAT → Ship`}</Ascii>
                <H4>4.2 Test Sequence</H4>
                <Ascii>{`Routine tests: Ratio → Winding R → Impedance → Losses
  → Insulation R → Applied voltage → Induced voltage + PD
Type tests: Lightning impulse (± full, + chopped) → Switching
  → Heat run (65/55°C rise) → Temperature rise
Special: FRA sweep → Sound level → Short-circuit withstand`}</Ascii>
                <H4>4.3 Transport &amp; Commissioning</H4>
                <Ascii>{`Factory → N₂ blanket or dry air → Multi-axle trailer (300+ ton)
→ Rail (for ultra-large) → Site → Re-dry if needed
→ Oil filling (field) → FRA comparison → Commissioning tests
→ System study validation → Energize → In-service`}</Ascii>
            </S>
            <S n={5} t="Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2 italic">~100–500 MVA, 230/115 kV class factory</p>
                <Tbl heads={['Equipment', 'Qty', 'Specification']} rows={[
                    ['CRGO Slitting Line', '2', '0.23-0.30 mm, ±0.05 mm width'],
                    ['GEORG Cutting Line', '2-3', 'Step-lap, CNC, mitered joints'],
                    ['Core Stacking Tables', '4-6', 'Hydraulic tilt, 100 ton capacity'],
                    ['Horizontal Winding Machines', '4-6', 'CNC servo, 2,000 kg conductor'],
                    ['Vertical Winding Machines', '2-3', '3-5 m diameter, disc winding'],
                    ['Winding Presses', '3-4', '300 ton hydraulic, axial'],
                    ['Vacuum Drying Ovens', '3-4', '200 m³, 120°C, <1 mbar'],
                    ['Oil Purification Plant', '2', '10,000 L/hr, centrifuge + vacuum'],
                    ['Oil Storage Tanks', '4-6', '50,000 L each, N₂ blanket'],
                    ['Impulse Generator', '1', '2,400 kV, 200 kJ, Marx circuit'],
                    ['Induced Voltage Test Set', '1', '500 kVA, variable frequency 50-400 Hz'],
                    ['Applied Voltage Test Set', '1', '500 kV, 50/60 Hz, 200 kVA'],
                    ['PD Measurement', '1', 'IEC 60270, <5 pC sensitivity'],
                    ['Heat Run Test Bay', '1-2', 'Full load, forced cooling, 72 hr'],
                    ['FRA Analyzer', '2', 'Sweep 20 Hz – 2 MHz, SFRA/IFRA'],
                    ['Overhead Cranes', '6-8', '50-200 ton, assembly hall'],
                    ['Tank Welding', '2-3', 'Robotic/manual, corrugated radiator'],
                    ['Paint System', '1', 'C5-M corrosion protection, 250 µm'],
                    ['PLC/SCADA', '1', 'Siemens/AB, oven/test control'],
                    ['MES/QMS', '1', 'Serial tracking, test data, IEEE certs'],
                ]} />
            </S>
            <S n={6} t="Purdue Model / ISA-95 Mapping" id="purdue">
                <Tbl heads={['Level', 'Function', 'Components', 'Protocols']} rows={[
                    ['L0', 'Sensing', 'Winding temp (fiber optic), core loss, vacuum pressure, oil moisture', '4-20 mA, Modbus RTU, fiber optic'],
                    ['L1', 'Control', 'Oven PLC (vacuum/temp), oil purification PLC, winding machine CNC', 'Profinet, EtherNet/IP, RS-485'],
                    ['L2', 'Supervisory', 'Test bay SCADA, drying oven monitoring, oil fill control', 'OPC UA, Modbus TCP, SQL'],
                    ['L3', 'Operations', 'MES (serial tracking, BOM, test records, IEEE certs)', 'REST API, SQL, PDF cert gen'],
                    ['L3.5', 'DMZ', 'Test data gateway, customer portal relay', 'TLS 1.3, VPN'],
                    ['L4', 'Enterprise', 'ERP (SAP), customer portal, NERC spares registry', 'HTTPS, IDoc, EDI'],
                ]} />
            </S>
            <S n={7} t="Safety &amp; Supporting Systems" id="safety">
                <Tbl heads={['System', 'Standard', 'Specification']} rows={[
                    ['Impulse Test Safety', 'IEEE C57.98', 'Exclusion zone, grounding hooks, discharge resistors'],
                    ['Vacuum Oven Safety', 'NFPA 86', 'Door interlock, purge, temperature limit, relief valve'],
                    ['High-Voltage Test', 'OSHA 1910.269', 'Qualified workers, barriers, 10 ft boundary, grounding'],
                    ['Crane Safety', 'OSHA 1910.179', '200 ton rated, load test, tandem lift procedures'],
                    ['Oil Handling', 'EPA SPCC', 'Spill containment, absorbent, fire suppression'],
                    ['Arc Flash', 'NFPA 70E', 'Category 4 at test bay, incident energy analysis'],
                ]} />
            </S>
            <S n={8} t="Communication Protocol Stack" id="protocols">
                <Ascii>{`Enterprise:  SAP ERP │ Customer portal │ NERC spares │ IEEE test certs
Application: OPC UA │ SQL │ REST API │ PDF cert generation
Network:     Industrial Ethernet 1/10 Gbps │ Fiber │ Test bay isolated
Supervisory: Modbus TCP │ EtherNet/IP │ Oven/test SCADA
Control:     Profinet │ RS-485 │ Analog process control
Field:       4-20 mA │ RTD/thermocouple │ Pressure transducer │ Fiber optic`}</Ascii>
            </S>
            <S n={9} t="Data Flow Architecture" id="data-flow">
                <Ascii>{`Field (L0)          Control (L1)       SCADA (L2)
Vacuum (mbar)────►Oven PLC──Profinet─►Drying curve dashboard
Oil moisture─────►Purif PLC──Modbus──►Oil quality trending
Impulse waveform─►Digitizer──LAN───►Test record database
Winding temp─────►CNC ctrl──RS485──►Winding quality log
                                      │ L3.5 DMZ
Operations (L3)        Enterprise (L4)
MES (serial)◄──REST────►SAP ERP
Test records◄──SQL─────►Customer FAT portal
IEEE certs◄──PDF gen───►Utility acceptance`}</Ascii>
            </S>
            <S n={10} t="References" id="references">
                <Refs items={[
                    'IEEE. (2022). C57.12.00: General Requirements for Liquid-Immersed Power Transformers. IEEE.',
                    'IEEE. (2021). C57.12.90: Test Code for Liquid-Immersed Power Transformers. IEEE.',
                    'IEC. (2022). IEC 60076: Power Transformers Parts 1-18. IEC.',
                    'IEEE. (2019). C57.98: Guide for Transformer Impulse Tests. IEEE.',
                    'CIGRÉ. (2019). Technical Brochure 761: Condition Assessment of Power Transformers. CIGRÉ.',
                    'The Open Group. (2022). TOGAF Standard, Version 10.',
                    'GEORG. (2023). Core Cutting Line Technology Reference Guide.',
                    'Hitachi Energy. (2023). Power Transformer Manufacturing Process Overview.',
                ]} />
            </S>
            <SeeAlso links={[
                { href: '/wiki/critical-manufacturing', label: 'Critical Manufacturing Hub', color: '#F97316' },
                { href: '/wiki/sectors/MANU', label: 'Sector Overview', color: '#F97316' },
                { href: '/wiki/critical-manufacturing/semiconductor-fab', label: 'Semiconductor Fab', color: '#8B5CF6' },
            ]} />
        </div>
    );
}
function S({ n, t, id, children }: { n: number; t: string; id: string; children: React.ReactNode }) {
    return (<section id={id} className="space-y-4"><h2 className="text-lg font-heading font-semibold text-white"><span className="text-[#EC4899] mr-2">{n}.</span>{t}</h2>{children}</section>);
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
