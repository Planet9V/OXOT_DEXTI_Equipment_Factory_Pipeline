/**
 * Meatpacking Plant Deep-Dive Reference Architecture.
 * Kill floor, ammonia refrigeration, fabrication, CIP, wastewater.
 * @module wiki/food-agriculture/meatpacking/page
 */
export const metadata = {
    title: 'Meatpacking Plant — Food & Agriculture Wiki',
    description: 'TOGAF reference architecture for USDA-inspected meatpacking: kill floor, ammonia refrigeration, fabrication/deboning, CIP sanitation, HACCP, and wastewater treatment.',
};
export default function MeatpackingPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #EF4444, #DC2626)' }}>🥩</div>
                    <div>
                        <span className="text-[10px] text-gray-500 font-mono block">FOOD-FP-MEAT</span>
                        <h1 className="text-2xl font-heading font-bold text-white">Meatpacking Plant Reference Architecture</h1>
                    </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">TOGAF-based reference architecture for USDA FSIS-inspected slaughter and fabrication facilities (1,000-6,000+ head/day) covering kill floor operations, industrial ammonia refrigeration (PSM), carcass chilling, fabrication/deboning, CIP sanitation, HACCP compliance, and wastewater treatment.</p>
            </div>
            <S n={1} t="TOGAF Business Architecture" id="togaf">
                <H4>Stakeholder Map</H4>
                <Tbl heads={['Stakeholder', 'Role', 'Interest']} rows={[
                    ['Packers', 'Owner/Operator', 'JBS, Tyson, Cargill — throughput, yield, cost'],
                    ['USDA FSIS', 'Regulatory', 'Inspection, HACCP verification, humane handling'],
                    ['OSHA', 'Safety', 'PSM ammonia, ergonomics, machine guarding, LOTO'],
                    ['EPA', 'Environmental', 'Wastewater NPDES, air permits, rendering'],
                    ['UFCW Union', 'Labor', 'Workers — wages, ergonomics, line speeds'],
                    ['Livestock Producers', 'Supplier', 'Cattle/hog/poultry — pricing, scheduling'],
                    ['Refrigeration OEMs', 'Supplier', 'Evapco, GEA, Frick — compressors, condensers'],
                    ['Retailers/QSR', 'Customer', 'Walmart, McDonalds — specs, food safety audits'],
                ]} />
                <H4>Regulatory Framework</H4>
                <Tbl heads={['Standard', 'Title', 'Scope']} rows={[
                    ['FMIA/PPIA', 'Federal Meat/Poultry Inspection', 'Ante/post-mortem inspection'],
                    ['9 CFR 417', 'HACCP Systems', '7 principles, CCPs, corrective actions'],
                    ['29 CFR 1910.119', 'PSM', 'Ammonia >10,000 lbs, PHA, MOC, MI'],
                    ['IIAR-2', 'Ammonia Piping', 'Design, materials, fabrication'],
                    ['ASHRAE 15', 'Mechanical Refrigeration Safety', 'Machinery room, detection, ventilation'],
                    ['EPA CWA/NPDES', 'Wastewater Discharge', 'BOD, TSS, FOG limits'],
                ]} />
            </S>
            <S n={2} t="High-Level Design" id="hld">
                <Ascii>{`┌─── LIVE RECEIVING ───────────────────────────────────┐
│ Livestock pens → Ante-mortem FSIS → Stunning          │
├─── KILL FLOOR ──────────────────────────────────────┤
│ Stun → Shackle → Bleed → Hide/feather removal        │
│ → Evisceration → Split → FSIS post-mortem inspection  │
├─── CHILLING ────────────────────────────────────────┤
│ Hot carcass → Blast chill (28-32F, 24-48 hrs)         │
│ → Spray chill → Shrink room → Grade/yield stamp       │
├─── FABRICATION ─────────────────────────────────────┤
│ Break → Primal cut → Sub-primal → Debone → Trim      │
│ → Packaging (vacuum/MAP) → Box → Case → Cold storage  │
├─── SUPPORT ─────────────────────────────────────────┤
│ NH3 refrigeration plant │ Steam boiler │ CIP system   │
│ Rendering │ Wastewater (DAF/biotreatment) │ Power     │
└─────────────────────────────────────────────────────┘`}</Ascii>
            </S>
            <S n={3} t="Detailed Technical Description" id="tech">
                <H4>3.1 Kill Floor &amp; Primary Processing</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Stunning System', 'Captive bolt / CO2', '1,000-6,000 head/day, AVMA approved'],
                    ['Shackling/Hoist', 'Overhead rail, trolley', '10,000 lb SWL, variable speed'],
                    ['Hide Puller', 'Hydraulic downward', '70-90 hides/hr, auto-tension'],
                    ['Eviscerating Line', 'Overhead rail + platforms', 'FSIS inspector stations, viscera table'],
                    ['Carcass Splitter', 'Band saw, pneumatic', 'Centerline split, safety guard'],
                    ['Head/Tongue Table', 'Stainless, FSIS station', 'Lymph node inspection, STEC sampling'],
                ]} />
                <H4>3.2 Industrial Ammonia Refrigeration</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Screw Compressor', 'Frick/Mycom/GEA', '200-1,500 HP, -40F to +40F SST'],
                    ['Reciprocating Comp', 'York/Carrier', '50-400 HP, booster/low-stage'],
                    ['Evaporative Condenser', 'Evapco/BAC', '500-2,000 ton, 95F ambient design'],
                    ['Recirculator', 'Surge drum + pump', 'Overfeed 3:1-4:1, liquid recirculation'],
                    ['Blast Freezer Coil', 'Finned tube, stainless', 'Air -35F, product 0F in 4-8 hrs'],
                    ['Engine Room', 'IIAR/ASHRAE 15', 'NH3 detection, emergency vent, SCBA'],
                ]} />
                <H4>3.3 Fabrication &amp; Packaging</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Breaking Saw', 'Band saw, stainless', 'Primal separation, USDA mark'],
                    ['Deboning Stations', 'Manual + Whizard knife', '120+ stations, ergonomic design'],
                    ['Vacuum Packager', 'Rollstock/thermoform', '60-120 packs/min, MAP option'],
                    ['Case Erector/Packer', 'Automated', '20-40 cases/min, bar code print'],
                    ['Metal Detector', 'Multi-frequency', 'Fe 1.0 mm, Non-Fe 1.2 mm, SS 2.0 mm'],
                    ['Checkweigher', 'In-line belt', '0.5-50 kg, +/-1 g, reject arm'],
                ]} />
                <H4>3.4 Sanitation / CIP</H4>
                <Tbl heads={['System', 'Type', 'Specification']} rows={[
                    ['CIP Skid', 'Caustic/acid/sanitize', '200F caustic, 2-4% NaOH, auto cycle'],
                    ['Foam System', 'Low-pressure foam', 'Alkaline cleaner, 15 min contact'],
                    ['Hot Water Sanitize', '180F+, FSIS 9 CFR 416', '82C rinse, knife sterilizer'],
                    ['Ozone System', 'Dissolved ozone', '1-3 ppm, surface/water sanitation'],
                    ['SSOPs', 'Daily pre-op/operational', 'FSIS verification, records'],
                ]} />
                <H4>3.5 Wastewater Treatment</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Screening', 'Rotary drum, 0.5 mm', 'Solids removal, 500-2000 GPM'],
                    ['DAF', 'Dissolved air flotation', '90-95% FOG removal, polymer'],
                    ['Equalization Tank', 'Aerated, 24-hr HRT', 'pH adjust, flow balance'],
                    ['Aerobic Treatment', 'Activated sludge/SBR', 'BOD <30 mg/L, TSS <30 mg/L'],
                    ['Rendering', 'Continuous cooker', 'Blood, offal, bone → MBM, tallow'],
                ]} />
            </S>
            <S n={4} t="Process Diagrams" id="process">
                <H4>4.1 Slaughter Line</H4>
                <Ascii>{`Livestock pen → Ante-mortem → Stun → Shackle → Bleed (5 min)
  → Hide pull → Head removal → Evisceration → Split
  → FSIS post-mortem → Carcass wash → Weigh → Blast chill`}</Ascii>
                <H4>4.2 Refrigeration Cycle</H4>
                <Ascii>{`Compressor (NH3 vapor) → Condenser (liquid) → Receiver
  → Expansion valve → Evaporator coils (-35F air/blast)
  → NH3 vapor return → Compressor (repeat)
  Engine room: NH3 detection → Alarm → Emergency vent → SCBA`}</Ascii>
                <H4>4.3 HACCP CCP Flow</H4>
                <Ascii>{`CCP1: Post-chill temp ≤40F in 24 hrs
CCP2: STEC testing (trim sampling, N60)
CCP3: Metal detection (reject >1.0 mm Fe)
CCP4: Cooking (if RTE): 160F internal, 15 sec
Deviation → Hold → Corrective action → FSIS notification`}</Ascii>
            </S>
            <S n={5} t="Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2 italic">4,000 head/day beef packing plant</p>
                <Tbl heads={['Equipment', 'Qty', 'Specification']} rows={[
                    ['Screw Compressors', '6', '500-1000 HP, ammonia, -40/+40 SST'],
                    ['Evaporative Condensers', '4', '1,000 ton each, Evapco'],
                    ['Blast Chill Rooms', '4', '400 carcass, -10F air, 24 hr'],
                    ['Boilers', '2', '250 BHP, natural gas, 150 psi steam'],
                    ['Kill Floor Line', '1', '250 head/hr, overhead rail'],
                    ['Fabrication Conveyors', '30', 'Stainless belt, VFD, washdown'],
                    ['Vacuum Packagers', '6', 'Rollstock, 80 packs/min'],
                    ['Metal Detectors', '8', 'Multi-frequency, auto-reject'],
                    ['CIP Skids', '4', '3-tank, 200F, 200 GPM'],
                    ['DAF Unit', '1', '200 GPM, 90% FOG removal'],
                    ['Rendering Cooker', '1', 'Continuous, 10 TPH, indirect steam'],
                    ['Wastewater Screen', '2', 'Rotary drum, 0.5 mm, 1000 GPM'],
                    ['NH3 Detectors', '40', 'Electrochemical, 0-500 ppm, 4-20mA'],
                    ['Emergency Generator', '2', '1 MW diesel, 480V, ATS'],
                    ['SCADA System', '1', 'Wonderware/Ignition, 2,000 tags'],
                    ['PLC Cabinets', '12', 'AB ControlLogix, EtherNet/IP'],
                    ['VFDs', '50', '1-200 HP, 480V, washdown'],
                    ['Checkweighers', '10', 'In-line, +/-1 g, bar code'],
                    ['Cold Storage', '1', '50,000 sq ft, -10F, racking'],
                ]} />
            </S>
            <S n={6} t="Purdue Model / ISA-95 Mapping" id="purdue">
                <Tbl heads={['Level', 'Function', 'Components', 'Protocols']} rows={[
                    ['L0', 'Sensing', 'NH3 sensors, temp probes, flow meters, scales', '4-20 mA, RTD, load cell'],
                    ['L1', 'Control', 'Line PLCs, compressor PLC, boiler controller', 'EtherNet/IP, DeviceNet'],
                    ['L2', 'Supervisory', 'SCADA HMI (Ignition), refrig monitoring', 'OPC UA, Modbus TCP'],
                    ['L3', 'Operations', 'MES, HACCP records, yield tracking, scheduling', 'SQL, REST API'],
                    ['L3.5', 'DMZ', 'IT/OT firewall, data historian, FSIS portal', 'TLS 1.3, VPN'],
                    ['L4', 'Enterprise', 'ERP (SAP), customer portals, USDA PHIS', 'EDI 856/945, REST'],
                ]} />
            </S>
            <S n={7} t="Safety &amp; Supporting Systems" id="safety">
                <Tbl heads={['System', 'Standard', 'Specification']} rows={[
                    ['PSM (Ammonia)', '29 CFR 1910.119', 'PHA, MOC, MI, emergency plan, >10K lbs NH3'],
                    ['NH3 Detection', 'IIAR-2/ASHRAE 15', '0-500 ppm sensors, 25/150/300 ppm alarms'],
                    ['Machine Guarding', 'OSHA 1910.212', 'Band saw guards, conveyor nip points, E-stop'],
                    ['LOTO', 'OSHA 1910.147', 'Group lockout, annual training, audit'],
                    ['Ergonomics', 'OSHA General Duty', 'Rotation, knife design, anti-fatigue mats'],
                    ['Confined Space', 'OSHA 1910.146', 'Cookers, tanks, pits — permit, attendant'],
                ]} />
            </S>
            <S n={8} t="Communication Protocol Stack" id="protocols">
                <Ascii>{`Enterprise:  SAP ERP │ EDI 856/945 │ USDA PHIS portal │ GFSI SQF
Network:     Fiber backbone │ Industrial Ethernet │ Cellular backup
Supervisory: OPC UA │ MQTT │ Modbus TCP │ BACnet (HVAC)
Control:     EtherNet/IP │ DeviceNet │ 480V motor control
Field:       4-20 mA │ RTD │ Thermocouple │ Load cell (mV/V)`}</Ascii>
            </S>
            <S n={9} t="Data Flow Architecture" id="data-flow">
                <Ascii>{`Field (L0)           Control (L1)       SCADA (L2)
NH3 sensor──4-20──►Refrig PLC──EIP───►Refrig SCADA
Temp probe──RTD───►Chill PLC───EIP──►HACCP temp log
Scale──mV/V───────►Yield PLC───EIP──►MES yield track
Metal det──dig────►Pack PLC────EIP──►Quality system
                                       │ L3.5 DMZ
Operations (L3)        Enterprise (L4)
MES/HACCP◄────SQL──►SAP ERP
Yield system◄─REST─►Customer portal
FSIS records◄──────►USDA PHIS`}</Ascii>
            </S>
            <S n={10} t="References" id="references">
                <Refs items={[
                    'USDA FSIS. (2023). 9 CFR 417: HACCP systems. USDA.',
                    'OSHA. (2023). 29 CFR 1910.119: Process Safety Management. DOL.',
                    'IIAR. (2021). IIAR-2: Equipment, design and installation of closed-circuit ammonia refrigeration systems.',
                    'ASHRAE. (2022). ASHRAE 15: Safety standard for refrigeration systems.',
                    'EPA. (2022). Meat and poultry products effluent guidelines. 40 CFR 432.',
                    'AMI. (2023). Sanitary equipment design principles. American Meat Institute.',
                    'The Open Group. (2022). TOGAF Standard, Version 10.',
                    'AVMA. (2020). Guidelines for humane slaughter of animals. AVMA.',
                ]} />
            </S>
            <SeeAlso links={[
                { href: '/wiki/food-agriculture', label: 'Food & Agriculture Hub', color: '#84CC16' },
                { href: '/wiki/sectors/FOOD', label: 'Sector Overview', color: '#84CC16' },
                { href: '/wiki/food-agriculture/cold-storage', label: 'Cold Storage DC', color: '#0EA5E9' },
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
