/**
 * Automotive Assembly Plant Deep-Dive Reference Architecture.
 * Stamping, body-in-white, paint, general assembly.
 * @module wiki/critical-manufacturing/automotive-assembly/page
 */
export const metadata = {
    title: 'Automotive Assembly Plant — Critical Manufacturing Wiki',
    description: 'TOGAF reference architecture for automotive assembly plants: stamping (2000-5000 ton presses), body-in-white robotic welding (500-1000 robots), E-coat/topcoat paint, and general assembly (60+ JPH).',
};
export default function AutomotiveAssemblyPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #3B82F6, #2563EB)' }}>🚗</div>
                    <div>
                        <span className="text-[10px] text-gray-500 font-mono block">CMAN-TE-AUTO</span>
                        <h1 className="text-2xl font-heading font-bold text-white">Automotive Assembly Plant Reference Architecture</h1>
                    </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">TOGAF-based reference architecture for automotive final assembly plants (60+ JPH, 200,000–400,000 vehicles/year) covering stamping (2,000–5,000 ton presses), body-in-white (BIW) robotic welding (500–1,000+ robots), E-coat/primer/basecoat/clearcoat paint operations, and general assembly with JIS/JIT sequencing, IATF 16949 quality, and integrated MES/ERP.</p>
            </div>
            <S n={1} t="TOGAF Business Architecture" id="togaf">
                <H4>Stakeholder Map</H4>
                <Tbl heads={['Stakeholder', 'Role', 'Interest']} rows={[
                    ['OEMs', 'Owner/Operator', 'Toyota, GM, Volkswagen, Hyundai, BMW, Stellantis'],
                    ['Tier 1 Suppliers', 'Partner', 'Denso, Bosch, ZF, Magna — JIS/JIT delivery'],
                    ['UAW / IG Metall', 'Labor', 'Workforce safety, ergonomics, work rules'],
                    ['OSHA', 'Safety', '29 CFR 1910.212 (machine guarding), 1910.147 (LOTO)'],
                    ['EPA', 'Environmental', '40 CFR 63 Subpart IIII (auto paint NESHAP), VOC limits'],
                    ['NHTSA', 'Vehicle Safety', 'FMVSS compliance, recall traceability'],
                    ['Equipment OEMs', 'Supplier', 'KUKA, Fanuc, ABB, Durr, Schuler — robots, paint, presses'],
                    ['Dealers/Customers', 'End User', 'Vehicle quality, build-to-order, delivery timing'],
                ]} />
                <H4>Regulatory Framework</H4>
                <Tbl heads={['Standard', 'Title', 'Scope']} rows={[
                    ['IATF 16949', 'Auto QMS', 'Quality management for automotive production'],
                    ['OSHA 1910.212', 'Machine Guarding', 'Press, robot, conveyor guards'],
                    ['EPA 40 CFR 63 IIII', 'Auto Paint NESHAP', 'VOC 35 g/m² limit, RTO/RCO abatement'],
                    ['NFPA 33', 'Spray Application', 'Paint booth fire protection, ventilation'],
                    ['NFPA 86', 'Ovens/Furnaces', 'Paint cure oven, E-coat oven safety'],
                    ['ISO 26262', 'Functional Safety', 'Vehicle E/E functional safety (product)'],
                    ['ANSI/RIA R15.06', 'Robot Safety', 'Safeguarding, collaborative robot zones'],
                ]} />
            </S>
            <S n={2} t="High-Level Design" id="hld">
                <Ascii>{`┌─── STAMPING ────────────────────────────────────────────┐
│ Coil feed → Blanking press → Transfer press line         │
│ → 4-6 operations (draw, trim, flange, pierce)            │
│ → Panels: roof, hood, door, fender → Rack → BIW          │
├─── BODY-IN-WHITE (BIW) ──────────────────────────────┤
│ Underbody jig → 500-1000 spot weld robots                │
│ → Side panel → Roof → Closure panels → Geometry station  │
│ → Metal finish → Body-in-white complete → Paint            │
├─── PAINT ──────────────────────────────────────────────┤
│ Pretreatment (phosphate/zirconia) → E-coat (28-32V)      │
│ → E-coat oven (180°C) → Sealer/UBS → Primer surfacer    │
│ → Color basecoat → Clearcoat → Bake oven (140°C)         │
│ → Inspection → Spot repair → To general assembly          │
├─── GENERAL ASSEMBLY ──────────────────────────────────┤
│ Trim 1 (wiring, headliner, glass) → Chassis (subframe,  │
│ engine/motor, suspension) → Trim 2 (seats, wheels, IP)   │
│ → Fluid fill (fuel/coolant/brake) → Alignment → Test      │
│ → Shower test → Final inspection → Shipping yard           │
└────────────────────────────────────────────────────────┘`}</Ascii>
            </S>
            <S n={3} t="Detailed Technical Description" id="tech">
                <H4>3.1 Stamping</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Transfer Press Line', '4-6 die stations', '2,000-5,000 ton total, 12-18 SPM'],
                    ['Blanking Press', 'Servo/mechanical', '800-1,200 ton, 25-40 SPM, coil-fed'],
                    ['Coil Handling', 'Decoiler, leveler, feeder', 'Up to 25 ton coil, 0.6-2.0 mm gauge'],
                    ['Die Storage', 'Automated die warehouse', '200-500 die sets, <10 min changeover'],
                    ['Tryout Press', 'Hydraulic, single-point', '500-1,000 ton, die development'],
                ]} />
                <H4>3.2 Body-in-White (BIW Welding)</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Spot Weld Robots', '6-axis, servo gun', '500-1,000 per body shop, 3,000-5,000 spots/body'],
                    ['Weld Guns', 'Servo, adaptive', '5-15 kA, 200-400 kN, electrode tip dress'],
                    ['Geometry Station', 'Laser measure, clamp', '±0.5 mm body accuracy, 100% measurement'],
                    ['Adhesive Robots', 'Structural bonding', '1-component, 2-component, hem flange'],
                    ['Laser Brazing', 'Roof-to-side, decklid', '4-6 kW fiber laser, 4 m/min, zero-gap'],
                    ['Vision Inspection', '3D structured light', '100% body audit, gap/flush measurement'],
                ]} />
                <H4>3.3 Paint Shop</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Pretreatment', 'Zirconia/phosphate', '9-12 stages, spray/immersion, 50-60°C'],
                    ['E-coat Tank', 'Cathodic electrodeposition', '120,000 L, 28-32 VDC, 20-25 µm DFT'],
                    ['E-coat Oven', 'Convection, gas-fired', '180°C, 20 min, IR boost zone'],
                    ['Paint Robots', 'High-speed atomizer', '8-12 per booth, 300 cc/min, ATEX Zone 1'],
                    ['RTO', 'Regenerative thermal', '95-98% VOC destruction, 760°C, 30,000 CFM'],
                    ['Color Kitchen', 'Automated paint supply', '40-60 colors, 2-component mixing, CCC'],
                ]} />
                <H4>3.4 General Assembly</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Assembly Conveyor', 'Skid/carrier, overhead', '60+ JPH, 1.0-1.5 m/min, variable speed'],
                    ['Torque Tools', 'DC electric, networked', '500-2,000 per plant, ±1% accuracy, error-proof'],
                    ['AGVs/AMRs', 'JIS delivery', '100-300 per plant, 250-1,000 kg payload'],
                    ['Glass Install Robot', '7-axis, vacuum cup', 'Windshield/backlight, ±1 mm, URethane bead'],
                    ['Marriage Station', 'Decking/powertrain', 'Automated lift, 4-post, body-to-chassis mate'],
                    ['Fluid Fill', 'Vacuum fill, leak test', 'Brake, coolant, A/C, fuel, washer — 6 stations'],
                    ['Wheel/Tire', 'Automated mount, inflate', '4+1 wheels, 30 Nm lug torque, TPMS program'],
                    ['End-of-Line Test', 'Dyno, ADAS, headlamp', '4WD dyno, camera calibration, alignment'],
                ]} />
            </S>
            <S n={4} t="Process Diagrams" id="process">
                <H4>4.1 Vehicle Production Flow</H4>
                <Ascii>{`Steel coil → Blanking → Transfer press → Stamped panel
→ BIW: underbody → side → roof → closure → geometry → metal finish
→ Paint: pretreat → E-coat → sealer → primer → base → clear → bake
→ GA: trim 1 → chassis marriage → trim 2 → fluid fill → test → ship`}</Ascii>
                <H4>4.2 Quality Traceability</H4>
                <Ascii>{`VIN assigned (BIW) → RFID tag on body → Track through 300+ stations
→ Torque data logged (DC tool → PLC → MES) → 100% traceability
→ Vision inspection → Andon alert → Repair loop or pass
→ Quality gate (buyoff) → EPA wind/water test → Ship to dealer`}</Ascii>
                <H4>4.3 JIS/JIT Supply Flow</H4>
                <Ascii>{`Broadcast (MES → EDI 862) → Tier 1 supplier (2-4 hr lead)
→ Sequenced rack delivery → Cross-dock → Line-side → Install
→ Consumption signal → Kanban replenishment → Next broadcast`}</Ascii>
            </S>
            <S n={5} t="Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2 italic">~240,000 vehicles/year (60 JPH, 2-shift)</p>
                <Tbl heads={['Equipment', 'Qty', 'Specification']} rows={[
                    ['Transfer Press Lines', '3', '4,000 ton, 6-die, 15 SPM'],
                    ['Spot Weld Robots', '800', 'Fanuc/KUKA, servo gun, 5,000 spots/body'],
                    ['Laser Brazing Cells', '4', '6 kW fiber, roof/decklid'],
                    ['E-coat System', '1', '120,000 L, 200 A/m², cathodic'],
                    ['Paint Robots', '48', 'Durr EcoRP, 300 cc/min, ATEX'],
                    ['RTO Units', '4', '30,000 CFM each, 95% destruction'],
                    ['Paint Cure Ovens', '3', '140-180°C, 20 min dwell'],
                    ['Assembly Conveyors', '3', 'Trim/chassis/final, 1.2 m/min'],
                    ['DC Torque Tools', '1,200', 'Atlas Copco/Desoutter, ±1%'],
                    ['AGVs/AMRs', '200', 'Omron/KUKA, JIS sequencing'],
                    ['Glass Install Robots', '4', '7-axis, vacuum cup, URethane'],
                    ['Marriage Stations', '2', '4-post decking, automated'],
                    ['End-of-Line Dyno', '2', '4WD, 150 kW absorption'],
                    ['Vision Systems', '60', 'Cognex, gap/flush, 100%'],
                    ['Andon System', '1', 'Full plant, MES-integrated'],
                    ['PLC Systems', '200+', 'AB ControlLogix, EtherNet/IP'],
                    ['SCADA/MES', '1', 'Siemens OpCenter / DELMIA MES'],
                    ['Shower Test', '1', '360° water spray, 10 min'],
                    ['ADAS Calibration', '2', 'Camera/radar/lidar cal station'],
                    ['Emergency Generators', '2', '2 MW diesel, paint/press critical'],
                ]} />
            </S>
            <S n={6} t="Purdue Model / ISA-95 Mapping" id="purdue">
                <Tbl heads={['Level', 'Function', 'Components', 'Protocols']} rows={[
                    ['L0', 'Sensing', 'Weld current/force, torque angle, vision, proximity', '4-20 mA, IO-Link, digital I/O'],
                    ['L1', 'Control', 'Robot controllers, press PLC, paint PLC, torque PLC', 'Profinet IRT, EtherNet/IP, DeviceNet'],
                    ['L2', 'Supervisory', 'Line SCADA, andon, quality gate HMI, historian', 'OPC UA, Modbus TCP, SQL'],
                    ['L3', 'Operations', 'MES (JIS/JIT sequencing, quality, traceability)', 'ISA-95 B2MML, REST, MQTT'],
                    ['L3.5', 'DMZ', 'Data diode, jump server, OPC UA tunnel', 'TLS 1.3, IPsec VPN'],
                    ['L4', 'Enterprise', 'ERP (SAP), EDI 830/862 broadcast, dealer DMS', 'EDI, IDoc, HTTPS'],
                ]} />
            </S>
            <S n={7} t="Safety &amp; Supporting Systems" id="safety">
                <Tbl heads={['System', 'Standard', 'Specification']} rows={[
                    ['Robot Safeguarding', 'ANSI/RIA R15.06', 'Light curtains, area scanners, safety-rated fences'],
                    ['Press Safety', 'OSHA 1910.217', 'Two-hand control, PSDI, barrier guards, SIL 3 e-stop'],
                    ['Paint Booth Fire', 'NFPA 33', 'Deluge suppression, ATEX Zone 1 equipment'],
                    ['Oven Safety', 'NFPA 86', 'Explosion relief, purge sequence, LEL monitoring'],
                    ['LOTO', 'OSHA 1910.147', 'All conveyors, robots, presses — energy isolation'],
                    ['VOC Monitoring', 'EPA NESHAP', 'RTO stack CEMS, booth airflow, < 35 g/m² VOC'],
                ]} />
            </S>
            <S n={8} t="Communication Protocol Stack" id="protocols">
                <Ascii>{`Enterprise:  SAP ERP │ EDI 830/862 │ Dealer mgmt │ NHTSA recall
Application: OPC UA │ MQTT │ REST API │ MES (ISA-95)
Network:     Industrial Ethernet │ Fiber ring │ Profinet IRT
Supervisory: EtherNet/IP (CIP) │ Modbus TCP │ CC-Link IE
Control:     Profinet │ DeviceNet │ IO-Link │ Safety-over-EtherNet
Field:       4-20 mA │ Digital I/O │ Encoder │ Torque signal (DC)`}</Ascii>
            </S>
            <S n={9} t="Data Flow Architecture" id="data-flow">
                <Ascii>{`Field (L0)           Control (L1)       SCADA (L2)
Weld current──IO──►Robot PLC──Profinet►BIW quality dashboard
Torque/angle──DC──►Tool PLC──EIP─────►Torque traceability
Vision──GigE──────►Cognex──EIP───────►Quality gate
Press tonnage─────►Press PLC──EIP────►Historian
                                       │ L3.5 DMZ
Operations (L3)        Enterprise (L4)
MES (JIS/JIT)◄─B2MML──►SAP PP/MM
Quality/VTS◄──REST────►NHTSA/recall trace
Andon/OEE◄──MQTT─────►Plant dashboard`}</Ascii>
            </S>
            <S n={10} t="References" id="references">
                <Refs items={[
                    'IATF. (2016). IATF 16949: Quality Management System Requirements for Automotive Production. IATF.',
                    'OSHA. (2023). 29 CFR 1910.212: General Requirements for All Machines. DOL.',
                    'EPA. (2022). 40 CFR 63 Subpart IIII: Surface Coating of Automobiles/Light-Duty Trucks. EPA.',
                    'NFPA. (2022). NFPA 33: Standard for Spray Application Using Flammable/Combustible Materials. NFPA.',
                    'ANSI/RIA. (2012). R15.06: Safety Requirements for Industrial Robots. RIA.',
                    'Liker, J. (2021). The Toyota Way (2nd ed.). McGraw-Hill.',
                    'The Open Group. (2022). TOGAF Standard, Version 10.',
                    'KUKA. (2023). Body-in-White Automation Solutions Reference Guide. KUKA.',
                ]} />
            </S>
            <SeeAlso links={[
                { href: '/wiki/critical-manufacturing', label: 'Critical Manufacturing Hub', color: '#F97316' },
                { href: '/wiki/sectors/MANU', label: 'Sector Overview', color: '#F97316' },
                { href: '/wiki/critical-manufacturing/aerospace', label: 'Aerospace Manufacturing', color: '#06B6D4' },
            ]} />
        </div>
    );
}
function S({ n, t, id, children }: { n: number; t: string; id: string; children: React.ReactNode }) {
    return (<section id={id} className="space-y-4"><h2 className="text-lg font-heading font-semibold text-white"><span className="text-[#3B82F6] mr-2">{n}.</span>{t}</h2>{children}</section>);
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
