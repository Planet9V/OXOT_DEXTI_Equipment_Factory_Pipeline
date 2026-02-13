/**
 * Gas Pipeline Compressor Station Deep-Dive Reference Architecture.
 * Compressor units, gas conditioning, metering, piping, safety.
 * @module wiki/transportation/pipeline-compressor/page
 */
export const metadata = {
    title: 'Pipeline Compressor Station — Transportation Wiki',
    description: 'TOGAF reference architecture for gas pipeline compressor stations: centrifugal/reciprocating compressors, aerial coolers, custody transfer metering, TSA Security Directives.',
};
export default function PipelineCompressorPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)' }}>🔵</div>
                    <div>
                        <span className="text-[10px] text-gray-500 font-mono block">TRAN-PL-COMP</span>
                        <h1 className="text-2xl font-heading font-bold text-white">Gas Pipeline Compressor Station Reference Architecture</h1>
                    </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">TOGAF-based reference architecture for natural gas pipeline compressor stations covering gas turbine-driven centrifugal compressors (Solar Taurus/Mars, 10,000-30,000 HP), inlet scrubbers, aerial coolers, ultrasonic custody transfer metering, and TSA Security Directive compliance.</p>
            </div>
            <S n={1} t="TOGAF Business Architecture" id="togaf">
                <H4>Stakeholder Map</H4>
                <Tbl heads={['Stakeholder', 'Role', 'Interest']} rows={[
                    ['Pipeline Operators', 'Owner/Operator', 'TC Energy, Williams, Kinder Morgan — throughput'],
                    ['FERC', 'Regulatory', 'Interstate siting, construction certificates'],
                    ['PHMSA / DOT', 'Safety', '49 CFR 192, integrity management programs'],
                    ['State PUCs', 'Regulatory', 'Intrastate oversight, rate setting'],
                    ['Gas Shippers/Marketers', 'Customer', 'Nominations, scheduling, capacity'],
                    ['Compressor OEMs', 'Supplier', 'Solar Turbines, Rolls-Royce, Ariel — equipment'],
                    ['Midstream Companies', 'Integration', 'Gathering, processing, transportation'],
                ]} />
                <H4>Regulatory Framework</H4>
                <Tbl heads={['Standard', 'Title', 'Scope']} rows={[
                    ['49 CFR 192', 'Pipeline Safety', 'Design, construction, operation, maintenance'],
                    ['ASME B31.8', 'Gas Transmission Piping', 'Pressure design, welding, testing'],
                    ['API 618', 'Reciprocating Compressors', 'Design, materials, testing for gas service'],
                    ['NFPA 37', 'Combustion Engines/Turbines', 'Installation, ventilation, fire protection'],
                    ['OSHA PSM 29 CFR 1910.119', 'Process Safety Management', 'Hazard analysis, MOC, training'],
                    ['EPA NSPS OOOOa', 'Methane Emissions', 'Leak detection, reporting, reduction'],
                    ['TSA SD-1 / SD-2', 'Pipeline Security', 'Critical facility ID, cyber/physical security'],
                ]} />
            </S>
            <S n={2} t="High-Level Design" id="hld">
                <Ascii>{`┌───────── STATION PIPING ─────────────────────────────┐
│ Pipeline (suction) → Station Isolation MOV            │
│   → Inlet Scrubber/Filter → Suction Header            │
├──────────────────────────────────────────────────────┤
│ COMPRESSOR UNITS (2-4 parallel)                       │
│  Centrifugal: Solar Taurus 70 (10,000 HP, DLE)       │
│  -or- Reciprocating: Ariel (2,000-6,000 HP, 2-4 throw)│
│  Compression ratio: 1.5-2.0 per stage                │
├──────────────────────────────────────────────────────┤
│ GAS COOLING                                           │
│  Aerial Coolers (fin-fan, outlet 120°F)               │
├──────────────────────────────────────────────────────┤
│ DISCHARGE: Check valve → Metering → Discharge MOV    │
│  → Pipeline (40-100 mile spacing to next station)     │
├──────────────────────────────────────────────────────┤
│ UTILITIES: Generator (1.5 MW) │ Instrument Air       │
│  Fuel Gas Skid │ Lube Oil Console │ SCADA RTU        │
└──────────────────────────────────────────────────────┘`}</Ascii>
            </S>
            <S n={3} t="Detailed Technical Description" id="tech">
                <H4>3.1 Compressor Units</H4>
                <Tbl heads={['Type', 'Model Range', 'Rating']} rows={[
                    ['Centrifugal (turbo)', 'Solar Taurus 60/70', '5,000-10,000 HP (3,730-7,460 kW)'],
                    ['Centrifugal (turbo)', 'Solar Mars 100', '15,000 HP (11,190 kW), DLE <25 ppm NOx'],
                    ['Centrifugal (turbo)', 'Solar Titan 250', '30,000 HP (22,380 kW)'],
                    ['Reciprocating', 'Ariel JGC/JGT', '2,000-6,000 HP, 2-4 throws, 800-1500 RPM'],
                    ['Electric Motor', 'VFD-driven centrifugal', '5,000-20,000 HP, variable speed'],
                ]} />
                <H4>3.2 Gas Conditioning</H4>
                <Tbl heads={['Equipment', 'Function', 'Specification']} rows={[
                    ['Inlet Scrubbers', 'Remove liquids/solids', 'Vertical vessel, 24" dia, 1000 psig MAWP'],
                    ['Coalescing Filters', 'Fine particle removal', '5-10 micron, 99.9% efficiency'],
                    ['Aerial Coolers', 'Post-compression cooling', 'Fin-fan, outlet 120°F (49°C)'],
                    ['Fuel Gas Scrubber', 'Clean driver fuel', '200 scfm, dewpoint -40°F'],
                ]} />
                <H4>3.3 Metering &amp; Custody Transfer</H4>
                <Tbl heads={['Meter Type', 'Standard', 'Accuracy']} rows={[
                    ['Ultrasonic', 'AGA-10 diagnostic, 4-24 path', '±0.5% of reading'],
                    ['Coriolis', 'Mass flow, density', '±0.15% of reading'],
                    ['Gas Chromatograph', 'Online C6+ analysis', '±0.25 Btu/scf'],
                    ['Flow Computer', 'AGA-8/AGA-10 calcs', 'Real-time BTU correction'],
                ]} />
                <H4>3.4 Station Piping &amp; Valves</H4>
                <Tbl heads={['Component', 'Type', 'Rating']} rows={[
                    ['Headers', 'Carbon steel, ASME B31.8', 'Class 600-900, up to 2500 psig'],
                    ['MOVs', 'Electric actuator', '20-30" NPS, fail-safe close'],
                    ['Blowdown Valves', 'Quick-open', '12" NPS, depressurize <15 min'],
                    ['Check Valves', 'Swing disc', '24" NPS, 900# flanged'],
                    ['Pig Launcher/Receiver', 'Bi-directional', '30" NPS, 1000 psig'],
                    ['Relief Valves', 'ASME BPVC Sec VIII', '1400 psig set, 1 MMscfd'],
                ]} />
                <H4>3.5 Power &amp; Utilities</H4>
                <Tbl heads={['System', 'Equipment', 'Rating']} rows={[
                    ['Generator', 'Natural gas, Caterpillar', '1.5 MW, 480V/60Hz'],
                    ['Instrument Air', 'Screw compressor', '150 psig, 500 scfm, -40°F dp'],
                    ['Fuel Gas Skid', 'Scrubber + heater', '200 scfm, 400°F outlet'],
                    ['Lube Oil Console', 'Forced circulation', '500 gpm, 50 psig'],
                    ['UPS', 'Battery backup', '100 kVA, 15 min ride-through'],
                ]} />
            </S>
            <S n={4} t="Process Diagrams" id="process">
                <H4>4.1 Gas Flow</H4>
                <Ascii>{`Suction Header → Scrubber/Filters → Compressor Suction
  → Compression (ratio 1.5-2.0) → Aftercooler (120°F)
  → Discharge Header → Check Valve → Metering → Pipeline`}</Ascii>
                <H4>4.2 Control Flow</H4>
                <Ascii>{`L0 Sensors (vibration, pressure, temp, flow)
  → L1 PLC (surge control, sequencing) → L2 Local HMI
  → L3 Gas Control Center SCADA → L4 Scheduling/ERP`}</Ascii>
                <H4>4.3 Emergency Shutdown (ESD) Sequence</H4>
                <Ascii>{`Gas detect / high-high pressure / vibration trip
  → ESD relay activates (<500 ms)
  → Close suction & discharge MOVs
  → Open blowdown valves → Trip compressor drivers
  → Alarm to gas control center (<1 min total)`}</Ascii>
                <H4>4.4 Metering Data Flow</H4>
                <Ascii>{`Ultrasonic/Coriolis meter → Gas chromatograph
  → Flow computer (AGA-8/AGA-10) → SCADA RTU
  → Gas control center → Billing/nominations system`}</Ascii>
            </S>
            <S n={5} t="Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2 italic">2-unit, 20,000 HP station (estimated $25-40M excl. land/civil)</p>
                <Tbl heads={['Equipment', 'Qty', 'Specification']} rows={[
                    ['Centrifugal Compressor', '2', 'Solar Taurus 70, 10,000 HP, DLE'],
                    ['Inlet Scrubber', '2', '24" dia, 1000 psig MAWP'],
                    ['Aerial Cooler', '4', '5000 HP capacity, 120°F outlet'],
                    ['Ultrasonic Meter Run', '2', '24" pipe, 100 MMscfd, ±0.5%'],
                    ['MOVs', '12', '20-30" NPS, class 600, electric'],
                    ['Check Valves', '8', '24" NPS, 900# flanged'],
                    ['Blowdown Valves', '4', '12" NPS, quick-open'],
                    ['Relief Valves', '6', '1400 psig set, ASME VIII'],
                    ['Generator', '1', '1.5 MW, 480V, natural gas'],
                    ['Instrument Air Compressor', '2', '150 psig, 500 scfm'],
                    ['Coalescing Filters', '4', '5-micron, 99.9% efficiency'],
                    ['Pig Launcher/Receiver', '1 pair', '30" NPS, 1000 psig'],
                    ['Fire/Gas Panel', '1', 'SIL-2, 4-20 mA inputs'],
                    ['UPS', '1', '100 kVA, 15 min'],
                    ['Station PLC Cabinet', '1', 'AB ControlLogix, redundant'],
                    ['Exhaust Silencers', '4', 'Critical grade, 85 dBA @100 ft'],
                    ['Lube Oil Console', '2', '500 gpm, 50 psig'],
                    ['Fuel Gas Skid', '1', '200 scfm, 400°F'],
                    ['SCADA RTU', '1', '1000 I/O, Modbus/DNP3'],
                    ['Gas Chromatograph', '1', 'Online C9+, ±0.25 Btu'],
                    ['Vibration Probes', '12', 'Bently Nevada, 0-100 mils'],
                    ['Pressure Transmitters', '20', 'Rosemount 3051, 0-2000 psig'],
                ]} />
            </S>
            <S n={6} t="Purdue Model / ISA-95 Mapping" id="purdue">
                <Tbl heads={['Level', 'Function', 'Components', 'Protocols']} rows={[
                    ['L0', 'Field Devices', 'Vibration probes, gas detectors, flow/press Tx', 'HART, 4-20 mA'],
                    ['L1', 'Basic Control', 'Compressor PLC (AB ControlLogix), Triconex SIS', 'Modbus RTU'],
                    ['L2', 'Supervisory', 'Local HMI, station automation (anti-surge)', 'OPC UA, Modbus TCP'],
                    ['L3', 'Operations', 'Gas control center SCADA, pipeline modeling', 'DNP3, OPC UA'],
                    ['L3.5', 'DMZ', 'TSA SD firewall, OT/IT segmentation', 'VPN, TLS'],
                    ['L4', 'Enterprise', 'ERP (SAP), nominations, gas scheduling', 'REST, EDI'],
                ]} />
            </S>
            <S n={7} t="Safety &amp; Supporting Systems" id="safety">
                <Tbl heads={['System', 'Standard', 'Specification']} rows={[
                    ['ESD System', 'PHMSA / IEC 61511', 'Hardwired/voted, <500 ms response, SIL-3'],
                    ['Gas Detection', 'API RP 14C', 'Catalytic 0-100% LEL, IR for hydrocarbons'],
                    ['Fire/Gas Panel', 'IEC 61508', 'Cause/consequence logic, alarm management'],
                    ['Relief Valves', 'ASME BPVC', '10% overpressure set point, annual testing'],
                    ['Emergency Blowdown', '49 CFR 192', 'To <100 psig in 15 min, 12-16" valves'],
                    ['TSA Compliance', 'SD-1 / SD-2', 'Critical facility ID, cyber/physical security'],
                ]} />
            </S>
            <S n={8} t="Communication Protocol Stack" id="protocols">
                <Ascii>{`Enterprise:  Gas scheduling │ Nominations │ ERP (SAP)
Network:     Fiber backbone │ Microwave (line-of-sight) │ VSAT
Supervisory: DNP3 │ OPC UA │ Modbus TCP
Control:     Modbus RTU │ HART │ Foundation Fieldbus
Field:       4-20 mA │ discrete I/O │ serial RS-485`}</Ascii>
            </S>
            <S n={9} t="Data Flow Architecture" id="data-flow">
                <Ascii>{`Field (L0)           Control (L1)         SCADA (L2)
Vibration──4-20───►Compressor PLC──MbTCP─►Station HMI
Gas detect─4-20───►SIS (Triconex)──HW───►Fire/Gas Panel
Flow Tx────HART───►Flow Computer──DNP3──►Local SCADA
                                            │ L3.5 DMZ
Operations (L3)          Enterprise (L4)
Gas Control SCADA◄─DNP3─►Pipeline Model
Scheduling◄────REST────►ERP (SAP)
Metering◄──────AGA────►Billing System`}</Ascii>
            </S>
            <S n={10} t="References" id="references">
                <Refs items={[
                    'ASME. (2021). B31.8: Gas transmission and distribution piping systems. ASME.',
                    'API. (2017). API 618: Reciprocating compressors (6th ed.). API.',
                    'PHMSA. (2023). 49 CFR Part 192: Pipeline safety regulations. DOT.',
                    'NFPA. (2021). NFPA 37: Stationary combustion engines and gas turbines. NFPA.',
                    'TC Energy. (2023). Natural gas compressor stations technical overview.',
                    'TSA. (2022). Pipeline Security Directives SD-1 and SD-2. DHS.',
                    'The Open Group. (2022). TOGAF Standard, Version 10.',
                    'IEC. (2016). IEC 61511: Functional safety — SIS for process industry. IEC.',
                ]} />
            </S>
            <SeeAlso links={[
                { href: '/wiki/transportation', label: 'Transportation Hub', color: '#0EA5E9' },
                { href: '/wiki/sectors/TRAN', label: 'Sector Overview', color: '#0EA5E9' },
                { href: '/wiki/energy', label: 'Energy Sector Hub', color: '#F59E0B' },
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
