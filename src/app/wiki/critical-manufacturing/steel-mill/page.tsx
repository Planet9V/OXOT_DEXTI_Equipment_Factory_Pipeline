/**
 * Integrated Steel Mill Deep-Dive Reference Architecture.
 * BF ironmaking, BOF steelmaking, continuous casting, hot/cold rolling.
 * @module wiki/critical-manufacturing/steel-mill/page
 */
export const metadata = {
    title: 'Integrated Steel Mill — Critical Manufacturing Wiki',
    description: 'TOGAF reference architecture for integrated steel mills: blast furnace ironmaking, basic oxygen furnace steelmaking, continuous casting, hot strip mill, cold rolling, and Level 2 automation.',
};
export default function SteelMillPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #EF4444, #DC2626)' }}>🔥</div>
                    <div>
                        <span className="text-[10px] text-gray-500 font-mono block">CMAN-PM-STEEL</span>
                        <h1 className="text-2xl font-heading font-bold text-white">Integrated Steel Mill Reference Architecture</h1>
                    </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">TOGAF-based reference architecture for integrated steelmaking (2–10+ MTPA) covering blast furnace (BF) ironmaking (1,000–5,000 m³ inner volume), basic oxygen furnace (BOF) steelmaking (100–400 t/heat), continuous slab casting (6 strands, 5–6 m/min), hot strip mill (5,000–15,000 HP/stand), cold rolling, and Level 2 process automation with metallurgical models.</p>
            </div>
            <S n={1} t="TOGAF Business Architecture" id="togaf">
                <H4>Stakeholder Map</H4>
                <Tbl heads={['Stakeholder', 'Role', 'Interest']} rows={[
                    ['Steel Producers', 'Owner/Operator', 'ArcelorMittal, Nippon Steel, POSCO, Nucor, US Steel'],
                    ['DHS/CISA', 'SRMA', 'Critical Manufacturing sector risk management'],
                    ['OSHA', 'Safety Regulatory', '29 CFR 1910.119 (PSM), 1910.147 (LOTO), heat stress'],
                    ['EPA', 'Environmental', '40 CFR 63 Subpart FFFFF (steelmaking MACT), 40 CFR 60 (NSPS)'],
                    ['MSHA', 'Mining Safety', '30 CFR Part 57 — upstream mining operations'],
                    ['AIST', 'Industry Standards', 'Association for Iron & Steel Technology'],
                    ['Equipment OEMs', 'Supplier', 'SMS group, Danieli, Primetals (Mitsubishi-Siemens)'],
                    ['Automotive/Construction', 'Customer', 'Flat products, structural steel, API pipe'],
                ]} />
                <H4>Regulatory Framework</H4>
                <Tbl heads={['Standard', 'Title', 'Scope']} rows={[
                    ['OSHA 1910.119', 'Process Safety Management', 'Hot metal, BF/BOF operations, PSM thresholds'],
                    ['EPA 40 CFR 63 FFFFF', 'Integrated Iron & Steel MACT', 'Particulate, CO, VOC emission limits'],
                    ['NFPA 86', 'Ovens and Furnaces', 'Heating, reheating furnace safety systems'],
                    ['ISO 13577-1', 'Industrial Furnaces Safety', 'Design, construction, maintenance of furnaces'],
                    ['ASTM E1019', 'Carbon/Sulfur Analysis', 'Melt chemistry verification, alloy compliance'],
                    ['IEC 62443', 'Industrial Cybersecurity', 'OT network segmentation, SL 2-3'],
                ]} />
            </S>
            <S n={2} t="High-Level Design" id="hld">
                <Ascii>{`┌─── IRONMAKING ──────────────────────────────────────────┐
│ Raw materials: iron ore sinter + coke + limestone        │
│ → Blast Furnace (1500-2100°C, 1000-5000 m³ inner vol)   │
│ → Hot metal (pig iron) 1400°C → Torpedo car to BOF       │
├─── STEELMAKING ────────────────────────────────────────┤
│ BOF: O₂ blow (15-20 min, 100-400 t/heat) → Tap → LF     │
│ → Ladle metallurgy (deS, deO, alloy trim) → Degasser     │
│ → RH vacuum (< 1 ppm H₂) → To caster                    │
├─── CONTINUOUS CASTING ─────────────────────────────────┤
│ Tundish → Mold (oscillating, Cu/Ni) → Secondary cooling  │
│ → Strand guide → Slab: 200-250 mm × 900-2100 mm         │
│ → Torch cut → Slab yard / direct hot charge               │
├─── HOT ROLLING ────────────────────────────────────────┤
│ Reheating furnace (1200-1280°C) → Roughing mill          │
│ → Finishing mill (6-7 stands, F1-F7) → Run-out table     │
│ → Coiler (strip 1.2-25 mm × 900-2100 mm)                │
├─── COLD ROLLING (Optional) ───────────────────────────┤
│ Pickling (HCl) → 5-stand tandem cold mill → Annealing    │
│ → Temper mill → Coating (galvanize/tin) → Cut-to-length  │
└────────────────────────────────────────────────────────┘`}</Ascii>
            </S>
            <S n={3} t="Detailed Technical Description" id="tech">
                <H4>3.1 Blast Furnace Complex</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Blast Furnace', 'Large-scale, bell-less top', '1,000-5,000 m³ inner vol, 3,000-12,000 t/day'],
                    ['Hot Blast Stoves', 'Cowper regenerative', '1,200°C blast, 3-4 stoves, 30 min cycle'],
                    ['Turbo Blower', 'Axial, multi-stage', '8,000-12,000 m³/min, 4.5 bar, 25-50 MW'],
                    ['Gas Cleaning', 'Scrubber + electrostatic', 'BF gas 20-25% CO, <5 mg/Nm³ dust'],
                    ['Torpedo Car', 'Ladle on rails', '250-350 t hot metal, insulated, 1,400°C'],
                    ['Slag Granulation', 'Water quench', '2 million GPD water, glassy slag product'],
                ]} />
                <H4>3.2 BOF Steelmaking &amp; Secondary Metallurgy</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['BOF Converter', 'Top-blown LD', '100-400 t/heat, O₂ lance 50,000 Nm³/hr'],
                    ['Ladle Furnace', 'Electric arc, submerged', '3-electrode, 30-40 MW, Ar stirring 100-500 NL/min'],
                    ['RH Degasser', 'Vacuum recirculation', '<1 ppm H₂, 0.5-1.0 mbar, 100-300 t'],
                    ['Alloy Addition', 'Wire feeding/bin dosing', 'FeSi, FeMn, Al wire, ±0.002% accuracy'],
                    ['Sub-lance System', 'Pneumatic, in-blow', 'C, temp, O₂ activity — 3 measurements/heat'],
                ]} />
                <H4>3.3 Continuous Casting</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Slab Caster', 'Curved, 6-8 m radius', '1-6 strands, 0.8-2.5 m/min, Cu/Ni mold'],
                    ['Mold Level Control', 'Eddy current sensor', '±0.5 mm precision, 200 Hz sampling'],
                    ['Secondary Cooling', 'Air-mist zones', '8-12 zones, dynamic spray control'],
                    ['Oscillation', 'Hydraulic or electric servo', '60-200 cpm, stroke 2-8 mm, non-sinusoidal'],
                    ['Torch Cut', 'Oxy-fuel, robotic', 'Slab cut 250 mm thick, 3 m/min traverse'],
                ]} />
                <H4>3.4 Hot Strip Mill</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Reheating Furnace', 'Walking beam', '200-400 t/hr, 1,200-1,280°C, natural gas'],
                    ['Roughing Mill', '4-Hi reversing', '1 stand, 5,000-10,000 HP, slab to transfer bar'],
                    ['Finishing Mill', '6-7 stand tandem 4-Hi', '5,000-15,000 HP/stand, 7-15 m/s exit speed'],
                    ['Run-Out Table', 'Laminar cooling', '5-20°C/s cooling rate, 60-120 m length'],
                    ['Coiler', 'Hydraulic mandrel', '1.2-25 mm strip, max 35 t coil, 2,100 mm width'],
                ]} />
                <H4>3.5 Level 2 Automation</H4>
                <Tbl heads={['System', 'Function', 'Specification']} rows={[
                    ['AGC', 'Automatic Gauge Control', '±0.5% thickness, hydraulic FFT, Smith predictor'],
                    ['AFC', 'Automatic Flatness Control', 'CVC/pair-cross shifting, 40 zones'],
                    ['AWC', 'Automatic Width Control', 'Edger, ±2 mm, closed-loop'],
                    ['Metallurgical Models', 'Temperature/phase', 'FEM heat transfer, austenite transformation'],
                    ['Coil Tracking', 'MES integration', 'Bar-head to coil-ID, real-time scheduling'],
                ]} />
            </S>
            <S n={4} t="Process Diagrams" id="process">
                <H4>4.1 Iron &amp; Steel Flow</H4>
                <Ascii>{`Iron ore + coke + flux → BF (1500°C) → Hot metal 1400°C → Torpedo car
→ BOF (O₂ blow 15 min) → Tap → Ladle furnace → RH degasser
→ Tundish → Caster (mold → secondary cooling → torch cut → slab)
→ Reheating furnace 1250°C → Roughing → Finishing F1-F7 → Coiler`}</Ascii>
                <H4>4.2 Level 2 Control Flow</H4>
                <Ascii>{`Level 2 models ──► Gap/speed setpoints → Finishing mill drives
   ↑ feedback        ├► Laminar cooling spray → Coiling temp
X-ray gauge ──►      ├► Width edger position → AWC
Flat meter ────►     └► CVC shifting → Flatness control
                        All → Level 2 historian → Quality cert`}</Ascii>
                <H4>4.3 Energy Recovery</H4>
                <Ascii>{`BF gas (21% CO) → Gas holder → Stove heating / Power plant
BOF gas (60% CO) → Gas recovery → Power plant boiler
Coke oven gas (55% H₂) → Desulfurization → Reheating furnaces
Waste heat → HRSG → Steam turbine → 30-100 MW electricity`}</Ascii>
            </S>
            <S n={5} t="Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2 italic">~5 MTPA integrated steel mill</p>
                <Tbl heads={['Equipment', 'Qty', 'Specification']} rows={[
                    ['Blast Furnace', '2', '3,500 m³ inner vol, 10,000 t/day'],
                    ['Hot Blast Stoves', '8', '1,200°C, 4 per BF'],
                    ['Turbo Blowers', '4', '35 MW each, 10,000 m³/min'],
                    ['BOF Converters', '3', '300 t/heat, top-blown LD'],
                    ['Ladle Furnaces', '2', '40 MW, 3-electrode'],
                    ['RH Degasser', '1', '300 t, <1 ppm H₂'],
                    ['Slab Caster', '2', '2-strand, 2.5 m/min, 2,100 mm'],
                    ['Walking Beam Furnace', '2', '400 t/hr, 1,280°C'],
                    ['Roughing Mill', '1', '10,000 HP, 4-Hi reversing'],
                    ['Finishing Mill', '1', '7-stand tandem, 15,000 HP/stand'],
                    ['Coilers', '3', 'Hydraulic, 35 t coil'],
                    ['Gas Cleaning Plants', '4', 'Scrubber + ESP, <5 mg/Nm³'],
                    ['Cooling Towers', '6', 'Induced draft, 50,000 GPM total'],
                    ['Level 2 Automation', '1', 'Primetals/SMS, metallurgical models'],
                    ['PLC Systems', '30+', 'Siemens S7-1500, Profinet backbone'],
                    ['SCADA/HMI', '1', 'Wonderware/Ignition, 20,000+ tags'],
                    ['MES', '1', 'PSImetals / Broner, production scheduling'],
                    ['Rectifiers', '4', '120 MVA, 6-pulse, EAF/LF supply'],
                    ['Overhead Cranes', '20+', '50-250 t, ladle/coil handling'],
                    ['Emergency Generator', '2', '5 MW diesel, BF essential loads'],
                ]} />
            </S>
            <S n={6} t="Purdue Model / ISA-95 Mapping" id="purdue">
                <Tbl heads={['Level', 'Function', 'Components', 'Protocols']} rows={[
                    ['L0', 'Sensing', 'Thermocouples (Type B 1800°C), pyrometers, load cells, X-ray gauge', '4-20 mA, HART, Type B mV'],
                    ['L1', 'Control', 'BF PLC, caster PLC, mill drives, hydraulic servo', 'Profibus DP, Profinet, EtherCAT'],
                    ['L2', 'Supervisory', 'Level 2 automation (AGC/AFC/AWC), HMI, historian', 'OPC UA, Modbus TCP, SQL'],
                    ['L3', 'Operations', 'MES (PSImetals), coil tracking, quality cert, scheduling', 'REST API, SQL, ISA-95 B2MML'],
                    ['L3.5', 'DMZ', 'Industrial firewall, historian relay, jump server', 'TLS 1.3, VPN, data diode'],
                    ['L4', 'Enterprise', 'ERP (SAP), commodity trading, customer portal', 'EDI, IDoc, HTTPS'],
                ]} />
            </S>
            <S n={7} t="Safety &amp; Supporting Systems" id="safety">
                <Tbl heads={['System', 'Standard', 'Specification']} rows={[
                    ['BF Charging Safety', 'OSHA PSM', 'Interlocked bell/hopper, CO monitoring, blast main relief'],
                    ['Molten Metal Safety', 'AIST TR-06', 'Torpedo car tilt interlock, breakout detection, ladle handling'],
                    ['Furnace Safety', 'NFPA 86', 'Flame supervision, purge sequence, gas train interlocks'],
                    ['CO Monitoring', 'OSHA PEL 50 ppm', 'Area detectors, personal monitors, ventilation interlock'],
                    ['Confined Space', 'OSHA 1910.146', 'BF reline, caster segment, permit-required entry'],
                    ['Emergency Showers', 'OSHA 1910.151', 'Eye wash, deluge, acid/alkali neutralization'],
                ]} />
            </S>
            <S n={8} t="Communication Protocol Stack" id="protocols">
                <Ascii>{`Enterprise:  SAP ERP │ EDI 830/945 │ Customer quality portal
Application: OPC UA │ SQL │ ISA-95 B2MML │ REST API
Network:     Industrial Ethernet 10 Gbps │ Fiber ring │ Redundant
Supervisory: Profinet IRT │ Modbus TCP │ Level 2 proprietary
Control:     Profibus DP/PA │ EtherCAT (drives) │ DeviceNet
Field:       4-20 mA │ HART │ Type B T/C │ Pyrometer serial │ Load cell`}</Ascii>
            </S>
            <S n={9} t="Data Flow Architecture" id="data-flow">
                <Ascii>{`Field (L0)           Control (L1)       Level 2 (L2)
T/C 1800°C──4-20──►BF PLC──Profinet──►BF Level 2 model
X-ray gauge──EIP──►Mill PLC──EIP────►AGC/AFC/AWC
Load cell──mV/V───►Caster PLC──EIP──►Mold level control
Pyrometer──RS485──►Reheat PLC──────►Furnace optimization
                                       │ L3.5 DMZ
Operations (L3)        Enterprise (L4)
MES coil tracking◄─SQL──►ERP (SAP)
Quality cert◄──REST────►Customer portal
Production sched◄──────►Supply chain planning`}</Ascii>
            </S>
            <S n={10} t="References" id="references">
                <Refs items={[
                    'AIST. (2023). The Making, Shaping and Treating of Steel (12th ed.). AIST.',
                    'Primetals Technologies. (2023). Level 2 Automation for Hot Strip Mills. Primetals.',
                    'OSHA. (2023). 29 CFR 1910.119: Process Safety Management. DOL.',
                    'EPA. (2022). 40 CFR 63 Subpart FFFFF: Integrated Iron & Steel MACT. EPA.',
                    'NFPA. (2022). NFPA 86: Standard for Ovens and Furnaces. NFPA.',
                    'ISO. (2016). ISO 13577-1: Industrial Furnaces — Safety. ISO.',
                    'The Open Group. (2022). TOGAF Standard, Version 10.',
                    'SMS group. (2023). Hot Rolling Technology Reference Guide. SMS.',
                ]} />
            </S>
            <SeeAlso links={[
                { href: '/wiki/critical-manufacturing', label: 'Critical Manufacturing Hub', color: '#F97316' },
                { href: '/wiki/sectors/MANU', label: 'Sector Overview', color: '#F97316' },
                { href: '/wiki/critical-manufacturing/aluminum-smelter', label: 'Aluminum Smelter', color: '#F59E0B' },
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
