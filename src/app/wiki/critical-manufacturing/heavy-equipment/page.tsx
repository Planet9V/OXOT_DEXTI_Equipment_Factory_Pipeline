/**
 * Heavy Equipment Manufacturing Plant Deep-Dive Reference Architecture.
 * CNC machining, robotic welding, heat treatment, paint, assembly/test.
 * @module wiki/critical-manufacturing/heavy-equipment/page
 */
export const metadata = {
    title: 'Heavy Equipment Plant — Critical Manufacturing Wiki',
    description: 'TOGAF reference architecture for heavy equipment manufacturing: horizontal boring mills, robotic welding (AWS D1.1/D14.3), heat treatment, paint, final assembly with dynamometer testing.',
};
export default function HeavyEquipmentPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}>🏗️</div>
                    <div>
                        <span className="text-[10px] text-gray-500 font-mono block">CMAN-MA-HEAVY</span>
                        <h1 className="text-2xl font-heading font-bold text-white">Heavy Equipment Manufacturing Plant Reference Architecture</h1>
                    </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">TOGAF-based reference architecture for heavy equipment manufacturing (excavators, dozers, loaders, mining trucks — Caterpillar/Komatsu/Deere/Volvo CE class) covering horizontal boring mills (5-axis, 20+ ton parts), robotic welding (AWS D1.1/D14.3), shot blasting, heat treatment, industrial painting, and final assembly with powertrain dynamometer testing.</p>
            </div>
            <S n={1} t="TOGAF Business Architecture" id="togaf">
                <H4>Stakeholder Map</H4>
                <Tbl heads={['Stakeholder', 'Role', 'Interest']} rows={[
                    ['OEMs', 'Owner/Operator', 'Caterpillar, Komatsu, John Deere, Volvo CE, Hitachi CM'],
                    ['Tier 1 Suppliers', 'Partner', 'Powertrain, hydraulics (Bosch Rexroth, Parker, Eaton)'],
                    ['OSHA', 'Safety', '29 CFR 1910 (general industry), welding fume, noise'],
                    ['EPA', 'Environmental', '40 CFR 63 (paint NESHAP), Tier 4 engine testing emissions'],
                    ['AWS', 'Welding Standards', 'D1.1 (structural), D14.3 (earthmoving equipment)'],
                    ['ISO', 'Quality', 'ISO 9001, ISO 3834 (welding quality), ISO 6165 (earthmoving)'],
                    ['Dealers/End Users', 'Customer', 'Mining, construction, agriculture, forestry'],
                    ['DHS/CISA', 'SRMA', 'Critical manufacturing sector oversight'],
                ]} />
                <H4>Regulatory Framework</H4>
                <Tbl heads={['Standard', 'Title', 'Scope']} rows={[
                    ['AWS D1.1', 'Structural Welding Steel', 'Weld procedure specs, welder qualification'],
                    ['AWS D14.3', 'Earthmoving Equipment', 'Weld requirements for heavy equipment structures'],
                    ['OSHA 1910.252', 'Welding Safety', 'Ventilation, fire prevention, PPE'],
                    ['EPA 40 CFR 63', 'Paint NESHAP', 'VOC limits for surface coating operations'],
                    ['ISO 6165', 'Earthmoving Machinery', 'Basic types, identification, terminology'],
                    ['ASTM A572/A514', 'Structural Steel', 'High-strength steel grades for fabrication'],
                    ['ISO 3834', 'Welding Quality', 'Comprehensive, standard, elementary quality reqts'],
                ]} />
            </S>
            <S n={2} t="High-Level Design" id="hld">
                <Ascii>{`┌─── FABRICATION ─────────────────────────────────────────┐
│ Steel plate (A572/A514) → Plasma/laser cutting            │
│ → Press brake forming → Fit-up → Robotic MIG/MAG welding  │
│ → Manual welding (complex joints) → Weld inspection (UT)  │
├─── MACHINING ──────────────────────────────────────────┤
│ Horizontal boring mill (5-axis, 20+ ton parts)            │
│ → CNC lathe (large turning) → Milling/drilling            │
│ → CMM inspection → Deburr → To sub-assembly               │
├─── HEAT TREATMENT ─────────────────────────────────────┤
│ Stress relief (620°C, controlled cooling)                 │
│ → Through-hardening / case hardening (gear/track)         │
│ → Induction hardening (pin/bushing, 50-60 HRC)           │
├─── SURFACE TREATMENT ─────────────────────────────────┤
│ Shot blast (SA 2.5) → Wash → Primer → Topcoat → Bake     │
│ → Decal/marking → Final inspection                        │
├─── ASSEMBLY & TEST ───────────────────────────────────┤
│ Frame → Powertrain install → Hydraulic → Electrical       │
│ → Cab → Track/tire → Fluid fill → Dyno test → Ship        │
└────────────────────────────────────────────────────────┘`}</Ascii>
            </S>
            <S n={3} t="Detailed Technical Description" id="tech">
                <H4>3.1 Steel Fabrication &amp; Welding</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Plasma/Laser Cutter', 'Gantry, multi-torch', '6-50 mm A572, ±0.5 mm, 200 A plasma / 6 kW fiber'],
                    ['Press Brake', 'Hydraulic, CNC', '2,000-4,000 ton, 6-14 m bed, ±0.1° angle'],
                    ['Robotic Weld Cell', 'Twin/quad robot', 'Lincoln/Miller, 400-600 A MIG/MAG, seam tracking'],
                    ['Manual Weld Station', 'Multi-process', 'SMAW/GMAW/FCAW, WPS qualified, AWS D1.1'],
                    ['Positioner', 'Headstock/tailstock', '20-100 ton capacity, 0-1 RPM, tilt ±90°'],
                    ['Weld Inspection (UT)', 'Automated + manual', 'AWS D1.1 acceptance, 100% critical joints'],
                ]} />
                <H4>3.2 CNC Machining</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Horizontal Boring Mill', 'Floor-type, 5-axis', 'Pama/Giddings, 200 mm spindle, X 20+ m, 20+ ton parts'],
                    ['CNC Vertical Lathe', 'Large swing', 'Berthiez/Toshiba, 3-6 m swing, 50 ton capacity'],
                    ['CNC Milling', 'Gantry/bridge', 'X 6-12 m, Y 3-5 m, 50-100 HP spindle'],
                    ['Drilling/Tapping', 'Multi-spindle', 'Pin/bushing bores, ±0.01 mm, carbide tools'],
                    ['CMM', 'Portable arm + fixed', 'FARO/Hexagon, 3-4 m vol, 0.05 mm accuracy'],
                ]} />
                <H4>3.3 Heat Treatment &amp; Surface</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Stress Relief Furnace', 'Car-bottom, gas-fired', '620°C, 10×5×5 m, controlled cooling 50°C/hr'],
                    ['Induction Hardener', 'CNC, multi-frequency', '10-300 kW, 1-200 kHz, pin/bushing 50-60 HRC'],
                    ['Carburizing Furnace', 'Batch/continuous', '930°C, 0.8-1.5 mm case, C potential control'],
                    ['Shot Blast', 'Wheel blast, conveyor', 'SA 2.5 finish, 1,000 kg/min abrasive, 50 m/min'],
                    ['Paint System', 'Robotic, 2-component', 'Primer + polyurethane topcoat, 75-100 µm DFT'],
                    ['Paint Oven', 'Gas-fired, convection', '80°C bake, 30 min, infrared boost zone'],
                ]} />
                <H4>3.4 Assembly &amp; Test</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Assembly Line', 'Carrier/in-floor', '6-12 stations, 4-8 hr takt, overhead crane'],
                    ['Powertrain Install', 'Overhead crane + jig', 'Engine/transmission, 5-50 ton lift capacity'],
                    ['Hydraulic Test', 'Flow/pressure', 'Test all circuits, 350-420 bar, leak check'],
                    ['Dynamometer', 'Engine/powertrain', 'AC dyno, 500-3,000 HP, emissions cert, load step'],
                    ['GPS/Telematics', 'Factory flash', 'Machine firmware, telematics (Product Link/KOMTRAX)'],
                    ['Final Inspection', 'Operational checkout', 'Full function test, fluid top-off, cosmetic QC'],
                ]} />
            </S>
            <S n={4} t="Process Diagrams" id="process">
                <H4>4.1 Frame Fabrication Flow</H4>
                <Ascii>{`Steel plate → Plasma cut → Press brake form → Fit-up jig
→ Robotic weld (MIG 400A, multi-pass) → Manual finish weld
→ UT inspection → Stress relief (620°C) → Shot blast (SA 2.5)
→ Machine critical surfaces (boring mill) → CMM → Paint`}</Ascii>
                <H4>4.2 Final Assembly Flow</H4>
                <Ascii>{`Painted frame → Powertrain install (engine + trans + axles)
→ Hydraulic plumbing → Electrical harness → Cab install
→ Track/tire mount → Counterweight → Fluid fill
→ Dyno test → Functional checkout → Ship to dealer`}</Ascii>
                <H4>4.3 Quality Traceability</H4>
                <Ascii>{`Serial number (frame) → Weld inspection log → Heat treat cert
→ Machine inspection (CMM) → Paint thickness → Dyno test data
→ All linked in MES → PDI defect record → Warranty database`}</Ascii>
            </S>
            <S n={5} t="Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2 italic">Multi-product heavy equipment plant (~5,000 units/year)</p>
                <Tbl heads={['Equipment', 'Qty', 'Specification']} rows={[
                    ['Plasma/Laser Cutters', '4-6', 'Gantry, 200 A / 6 kW, 3×12 m table'],
                    ['Press Brakes', '3-4', '3,000 ton, 8 m bed, CNC'],
                    ['Robotic Weld Cells', '20-30', 'Twin-robot, 500 A MIG, seam track'],
                    ['Manual Weld Stations', '40-60', 'Multi-process, fume extraction'],
                    ['Positioners', '15-20', '50-100 ton, head/tailstock'],
                    ['Horizontal Boring Mills', '4-6', 'Pama, 200 mm spindle, 5-axis'],
                    ['CNC Vertical Lathes', '2-3', '4 m swing, 30 ton'],
                    ['Stress Relief Furnaces', '2-3', 'Car-bottom, 10×5×5 m, 620°C'],
                    ['Induction Hardeners', '4-6', 'CNC, 300 kW, multi-freq'],
                    ['Shot Blast', '2-3', 'Conveyor, SA 2.5, 1,000 kg/min'],
                    ['Paint Robots', '6-8', '2-component, 75-100 µm'],
                    ['Assembly Stations', '12', 'Carrier, overhead crane'],
                    ['Dynamometers', '3-4', 'AC, 3,000 HP, emissions'],
                    ['CMM/Laser Tracker', '6-8', 'FARO arm + Leica tracker'],
                    ['Overhead Cranes', '30+', '10-100 ton, throughout plant'],
                    ['PLC/SCADA', '1', 'AB ControlLogix, MTConnect'],
                    ['MES', '1', 'SAP ME or Plex, work order tracking'],
                    ['Fume Extraction', '1', 'Central + local LEV, HEPA'],
                    ['Compressed Air', '2-3', '200 HP screw, oil-free, 7 bar'],
                    ['Emergency Generator', '1', '2 MW diesel, critical loads'],
                ]} />
            </S>
            <S n={6} t="Purdue Model / ISA-95 Mapping" id="purdue">
                <Tbl heads={['Level', 'Function', 'Components', 'Protocols']} rows={[
                    ['L0', 'Sensing', 'Weld current/voltage, spindle load, bore depth, force, temperature', '4-20 mA, IO-Link, encoder'],
                    ['L1', 'Control', 'CNC controller, robot controller, weld PLC, induction PLC', 'Profinet, EtherNet/IP, DeviceNet'],
                    ['L2', 'Supervisory', 'Cell SCADA, weld data monitoring, tool management', 'MTConnect, OPC UA, SQL'],
                    ['L3', 'Operations', 'MES (work orders, BOM, routing, quality), WMS', 'REST API, MQTT, ISA-95'],
                    ['L3.5', 'DMZ', 'MTConnect adapter, OPC gateway, firewall', 'TLS 1.3, VPN'],
                    ['L4', 'Enterprise', 'ERP (SAP), PLM, dealer network, telematics cloud', 'HTTPS, IDoc, EDI 856'],
                ]} />
            </S>
            <S n={7} t="Safety &amp; Supporting Systems" id="safety">
                <Tbl heads={['System', 'Standard', 'Specification']} rows={[
                    ['Welding Fume', 'OSHA PEL (Mn)', 'Manganese 5 mg/m³, LEV at source, HEPA filtration'],
                    ['Machine Guarding', 'OSHA 1910.212', 'Full enclosure boring mills, presence sensing lathes'],
                    ['Crane Safety', 'OSHA 1910.179', 'Load testing, daily inspection, operator certified'],
                    ['Paint Booth Fire', 'NFPA 33', 'Deluge suppression, ATEX equipment, LEL monitoring'],
                    ['Noise', 'OSHA 1910.95', '85+ dBA areas: hearing conservation, monitoring'],
                    ['Confined Space', 'OSHA 1910.146', 'Large frame interiors, gas test, attendant'],
                ]} />
            </S>
            <S n={8} t="Communication Protocol Stack" id="protocols">
                <Ascii>{`Enterprise:  SAP ERP │ PLM │ Dealer DMS │ Telematics cloud
Application: OPC UA │ MTConnect │ REST API │ MQTT
Network:     Industrial Ethernet 10 Gbps │ Fiber ring │ Wi-Fi 6 (AGV)
Supervisory: EtherNet/IP (CIP) │ Profinet │ Modbus TCP
Control:     Profinet │ DeviceNet │ IO-Link │ Robot vendor
Field:       4-20 mA │ Encoder │ IO-Link │ Weld current shunt`}</Ascii>
            </S>
            <S n={9} t="Data Flow Architecture" id="data-flow">
                <Ascii>{`Field (L0)          Control (L1)       SCADA (L2)
Weld V/A──shunt──►Weld PLC──DeviceNet►Weld quality dash
Spindle load─────►CNC ctrl──Profinet─►Tool life mgmt
Bore depth───────►Boring mill────────►Part inspection log
Dyno torque──────►Dyno ctrl──EIP────►Powertrain cert
                                      │ L3.5 DMZ
Operations (L3)        Enterprise (L4)
MES (work order)◄─REST──►SAP PP/QM
Quality records◄─MQTT───►Warranty database
Production sched◄───────►Dealer order system`}</Ascii>
            </S>
            <S n={10} t="References" id="references">
                <Refs items={[
                    'AWS. (2020). D1.1/D1.1M: Structural Welding Code — Steel. AWS.',
                    'AWS. (2019). D14.3/D14.3M: Welding for Earthmoving, Construction and Agricultural Equipment. AWS.',
                    'OSHA. (2023). 29 CFR 1910.252: Welding, Cutting and Brazing — General Requirements. DOL.',
                    'ISO. (2022). ISO 6165: Earth-Moving Machinery — Basic Types. ISO.',
                    'ISO. (2021). ISO 3834: Quality Requirements for Fusion Welding. ISO.',
                    'The Open Group. (2022). TOGAF Standard, Version 10.',
                    'NFPA. (2022). NFPA 33: Spray Application. NFPA.',
                    'ASTM. (2021). A572/A572M: High-Strength Low-Alloy Structural Steel. ASTM.',
                ]} />
            </S>
            <SeeAlso links={[
                { href: '/wiki/critical-manufacturing', label: 'Critical Manufacturing Hub', color: '#F97316' },
                { href: '/wiki/sectors/MANU', label: 'Sector Overview', color: '#F97316' },
                { href: '/wiki/critical-manufacturing/steel-mill', label: 'Integrated Steel Mill', color: '#EF4444' },
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
