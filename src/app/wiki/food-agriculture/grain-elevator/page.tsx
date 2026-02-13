/**
 * Grain Elevator & Storage Complex Deep-Dive Reference Architecture.
 * Receiving, drying, storage, aeration, dust control, loadout.
 * @module wiki/food-agriculture/grain-elevator/page
 */
export const metadata = {
    title: 'Grain Elevator & Storage Complex — Food & Agriculture Wiki',
    description: 'TOGAF reference architecture for grain elevators: bucket elevators, mixed-flow dryers, concrete silos, aeration systems, NFPA 61/652 dust explosion prevention, and rail/truck loadout.',
};
export default function GrainElevatorPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #84CC16, #65A30D)' }}>🌾</div>
                    <div>
                        <span className="text-[10px] text-gray-500 font-mono block">FOOD-AG-GRAIN</span>
                        <h1 className="text-2xl font-heading font-bold text-white">Grain Elevator &amp; Storage Complex Reference Architecture</h1>
                    </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">TOGAF-based reference architecture for commercial grain elevator and storage complexes covering grain receiving (truck/rail), mixed-flow and crossflow drying (500-10,000 BPH), concrete silo and steel bin storage (500K-10M+ bushels), aeration systems, NFPA 61/652 combustible dust management, and rail/truck loadout with USDA AMS grading.</p>
            </div>
            <S n={1} t="TOGAF Business Architecture" id="togaf">
                <H4>Stakeholder Map</H4>
                <Tbl heads={['Stakeholder', 'Role', 'Interest']} rows={[
                    ['Grain Merchants', 'Owner/Operator', 'Cargill, ADM, Bunge — throughput, grade quality'],
                    ['USDA AMS', 'Regulatory', 'Grain grading, inspection, weighing'],
                    ['OSHA', 'Safety', '29 CFR 1910.272 grain dust, confined space'],
                    ['EPA', 'Environmental', 'Grain dust emissions, stormwater, fumigant regs'],
                    ['Farmers/Producers', 'Supplier', 'Harvest delivery, pricing, moisture discounts'],
                    ['Grain Inspectors', 'Quality', 'FGIS official grades, moisture/test weight'],
                    ['Equipment OEMs', 'Supplier', 'GSI/AGCO, Brock, Sukup — bins, dryers, elevators'],
                    ['Railroads', 'Logistics', 'BNSF, UP — unit train loadout, tariffs'],
                ]} />
                <H4>Regulatory Framework</H4>
                <Tbl heads={['Standard', 'Title', 'Scope']} rows={[
                    ['OSHA 29 CFR 1910.272', 'Grain Handling Facilities', 'Housekeeping, hot work, entry, emergency'],
                    ['NFPA 61', 'Ag/Food Dust Fire Prevention', 'Facility design, equipment, housekeeping'],
                    ['NFPA 652', 'Combustible Dust Fundamentals', 'Dust Hazard Analysis (DHA) requirement'],
                    ['USDA FGIS', 'Federal Grain Inspection', 'Grades, moisture, test weight, dockage'],
                    ['EPA 40 CFR 60', 'Grain Elevator Emissions', 'Particulate emission limits, NSPS Subpart DD'],
                    ['OSHA 29 CFR 1910.146', 'Confined Space Entry', 'Bin entry permits, attendant, rescue'],
                ]} />
            </S>
            <S n={2} t="High-Level Design" id="hld">
                <Ascii>{`┌─── RECEIVING ────────────────────────────────────────┐
│ Truck dump (300 TPH) → Pit conveyor → Bucket elevator │
│ Rail receiving (600 TPH) → Hopper pit → Leg           │
│ → Probe sampler → Moisture/test-weight → Grade assign │
├─── DRYING ──────────────────────────────────────────┤
│ Wet grain (15-25% MC) → Mixed-flow dryer             │
│ → Target: corn 15.0%, wheat 13.5%, beans 13.0%       │
│ → Drying rate 1,000-5,000 BPH → Cooling section      │
├─── STORAGE ─────────────────────────────────────────┤
│ Concrete silos (12-48, 300K-500K bu each)             │
│ Steel bins (flat-bottom, 10K-500K bu)                 │
│ → Aeration fans (0.1-0.25 CFM/bu) → Temp cables      │
├─── LOADOUT ─────────────────────────────────────────┤
│ Garner bins → Weigh hopper → Truck scale (80 ft)     │
│ → Rail loadout (110-car unit train, 12-15 hrs)       │
│ → Barge loading (15,000 TPH) — river terminals        │
└─────────────────────────────────────────────────────┘`}</Ascii>
            </S>
            <S n={3} t="Detailed Technical Description" id="tech">
                <H4>3.1 Grain Receiving</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Truck Dump', 'Hydraulic scissor', '70 ft, 100 ton, 30-sec cycle'],
                    ['Receiving Pit', 'Below-grade hopper', '300-600 TPH, drag conveyor'],
                    ['Bucket Elevator', 'Centrifugal discharge', '20,000-60,000 BPH, 200 ft height'],
                    ['Probe Sampler', 'Pneumatic diverter', 'FGIS-approved, 10-point composite'],
                    ['Moisture Tester', 'NIRS/capacitance', '±0.2% accuracy, 15-sec cycle'],
                    ['Truck Scale', 'Load cell, 80 ft', '120,000 lb capacity, ±20 lb'],
                ]} />
                <H4>3.2 Drying Systems</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Mixed-Flow Dryer', 'Continuous, NG/LP', '1,000-5,000 BPH, 20M-100M BTU/hr'],
                    ['Crossflow Dryer', 'Column, batch/cont', '500-3,000 BPH, natural gas'],
                    ['Cooling Section', 'Ambient air counter', '5 moisture pts/hr removal rate'],
                    ['Burner System', 'Direct-fired, NG', 'Modulating 10:1, max 230 deg F corn'],
                    ['Moisture Controller', 'Closed-loop PID', 'Outlet target +/-0.3%, NIR sensor'],
                ]} />
                <H4>3.3 Storage &amp; Aeration</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Concrete Silo', 'Slip-form, 30 ft dia', '300K-500K bu each, 100+ ft tall'],
                    ['Steel Flat-Bottom', 'Bolted panel', '10K-500K bu, 36-156 ft dia'],
                    ['Aeration Fan', 'Centrifugal/axial', '0.1-0.25 CFM/bu, 3-25 HP'],
                    ['Temp Cable', 'Thermocouple array', 'Every 5 ft vertical, 4 cables/bin'],
                    ['Level Indicator', 'Radar/ultrasonic', '±1 inch accuracy, dusty environment'],
                    ['Fumigation System', 'Phosphine generator', '56 g/1000 bu, 5-day exposure'],
                ]} />
                <H4>3.4 Dust Collection &amp; Explosion Prevention</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Cyclone Separator', 'Primary collector', '80-90% efficiency, 20 micron cut'],
                    ['Baghouse', 'Pulse-jet', '5,000-50,000 CFM, 99.9% eff, 0.005 gr/dscf'],
                    ['Explosion Vent', 'Rupture panel', 'Pred 0.5 psi, NFPA 68 sizing'],
                    ['Bucket Elevator Vent', 'Flameless indoor', 'DIN EN 16009, ATEX rated'],
                    ['LEL Monitor', 'Infrared/catalytic', '0-100% LEL, 4-20 mA, alarm at 25%'],
                    ['Magnetic Separator', 'Plate/grate', '12,000 gauss, product stream install'],
                ]} />
                <H4>3.5 Loadout &amp; Shipping</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Garner Bin', 'Surge/blending', '50-200 ton, gravity discharge'],
                    ['Weigh Hopper', 'Batch scale', '100-200 ton/hr, ±0.1% accuracy'],
                    ['Rail Loadout', 'Overhead bin/flood', '110-car unit train, 12-15 hrs'],
                    ['Truck Loadout', 'Gravity spout', '300 TPH, dust-suppressed'],
                    ['Barge Loading', 'Belt/spout', '1,500 TPH, river terminal'],
                ]} />
            </S>
            <S n={4} t="Process Diagrams" id="process">
                <H4>4.1 Receiving Flow</H4>
                <Ascii>{`Truck arrives → Scale in → Probe sample → Moisture test
  → Grade assign → Dump pit → Drag conveyor → Bucket leg
  → Distributor → Wet bin or dryer → Scale out`}</Ascii>
                <H4>4.2 Drying Process</H4>
                <Ascii>{`Wet grain (20% MC) → Dryer feed conveyor → Mixed-flow dryer
  → Heating zone (200-230F) → Tempering → Cooling section
  → Outlet moisture check (15.0%) → Dry storage bin`}</Ascii>
                <H4>4.3 Storage Aeration Cycle</H4>
                <Ascii>{`Temp cables detect hot spot → Controller activates fans
  → 0.1-0.25 CFM/bu airflow → Cool front moves through grain
  → Target: grain temp within 10F of ambient → Fans off`}</Ascii>
                <H4>4.4 Rail Loadout</H4>
                <Ascii>{`Garner bin → Weigh hopper (batch) → Rail spout → Car fill
  → Position next car (indexer) → Repeat 110x → 12-15 hrs
  → Train inspector → Waybill/BOL → Departure`}</Ascii>
            </S>
            <S n={5} t="Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2 italic">5-million-bushel inland grain elevator with rail loadout</p>
                <Tbl heads={['Equipment', 'Qty', 'Specification']} rows={[
                    ['Bucket Elevators', '8', '20,000-40,000 BPH, 100-200 ft'],
                    ['Belt Conveyors', '12', '500-1000 TPH, 100-500 ft'],
                    ['Drag Conveyors', '6', '300-600 TPH, enclosed'],
                    ['Concrete Silos', '24', '300K bu each, 30 ft dia'],
                    ['Steel Flat-Bottom Bins', '12', '100K-500K bu, 48-105 ft dia'],
                    ['Mixed-Flow Dryers', '2', '3,000 BPH, 60M BTU/hr'],
                    ['Aeration Fans', '36', '5-25 HP, centrifugal'],
                    ['Temperature Cables', '100', '4-conductor, 5 ft spacing'],
                    ['Baghouse Collectors', '4', '20,000 CFM, pulse-jet'],
                    ['Cyclone Separators', '8', '10,000 CFM, primary'],
                    ['Explosion Vents', '24', 'NFPA 68, 0.5 psi Pred'],
                    ['Truck Dump', '2', 'Hydraulic, 100 ton'],
                    ['Truck Scale', '2', '80 ft, 120,000 lb'],
                    ['Rail Loadout', '1', '110-car, 15-hr cycle'],
                    ['Weigh Hoppers', '2', '200 ton/hr, batch'],
                    ['Probe Samplers', '2', 'Pneumatic, 10-point'],
                    ['Moisture Testers', '3', 'NIRS, ±0.2%'],
                    ['LEL Monitors', '12', 'IR, 0-100% LEL'],
                    ['PLC Cabinets', '6', 'AB ControlLogix, I/O racks'],
                    ['VFDs', '20', '10-200 HP, 480V'],
                    ['Emergency Generator', '1', '500 kW diesel, 480V'],
                    ['UPS', '2', '50 kVA, SCADA/comms'],
                ]} />
            </S>
            <S n={6} t="Purdue Model / ISA-95 Mapping" id="purdue">
                <Tbl heads={['Level', 'Function', 'Elevator Components', 'Protocols']} rows={[
                    ['L0', 'Sensing', 'Moisture, temp cables, level, LEL, scales', '4-20 mA, RTD, load cell'],
                    ['L1', 'Control', 'PLC (AB ControlLogix), VFDs, motor starters', 'EtherNet/IP, DeviceNet'],
                    ['L2', 'Supervisory', 'Grain SCADA HMI, dryer controller, historian', 'OPC UA, Modbus TCP'],
                    ['L3', 'Operations', 'Grain accounting, ticket system, grading', 'SQL, REST API'],
                    ['L3.5', 'DMZ', 'IT/OT firewall, VPN concentrator', 'TLS 1.3, IPsec'],
                    ['L4', 'Enterprise', 'Commodity trading, ERP (SAP/JDE), logistics', 'EDI, REST, FIX protocol'],
                ]} />
            </S>
            <S n={7} t="Safety &amp; Supporting Systems" id="safety">
                <Tbl heads={['System', 'Standard', 'Specification']} rows={[
                    ['Dust Hazard Analysis', 'NFPA 652', 'DHA required for all dust-producing equipment'],
                    ['Explosion Venting', 'NFPA 68', 'Vent panels on legs, bins, dust collectors'],
                    ['Housekeeping', 'OSHA 1910.272', 'Dust depth <1/8 in on surfaces, priority areas'],
                    ['Hot Work Permit', 'OSHA 1910.252', 'Pre-inspection, fire watch, LEL monitoring'],
                    ['Confined Space', 'OSHA 1910.146', 'Bin entry: lockout, atmosphere test, attendant'],
                    ['Fumigation Safety', 'EPA/OSHA', 'Phosphine handling, 48-hr re-entry, monitoring'],
                ]} />
            </S>
            <S n={8} t="Communication Protocol Stack" id="protocols">
                <Ascii>{`Enterprise:  Commodity ERP │ EDI 856/945 │ FIX protocol (trading)
Network:     Fiber backbone │ Managed Ethernet │ Cellular 4G/5G
Supervisory: OPC UA │ Modbus TCP │ SNMP │ MQTT (cloud)
Control:     EtherNet/IP │ DeviceNet │ 480V motor control
Field:       4-20 mA │ RTD │ Load cell (mV/V) │ RS-485`}</Ascii>
            </S>
            <S n={9} t="Data Flow Architecture" id="data-flow">
                <Ascii>{`Field (L0)           Control (L1)       SCADA (L2)
Moisture──4-20───►PLC (ControlLogix)──EIP──►Grain SCADA HMI
Temp cable──RTD──►PLC aeration ctrl──EIP──►Historian
LEL──4-20────────►PLC safety───────EIP──►Alarm mgr
Scale──mV/V──────►Weigh controller──ser──►Ticket system
                                           │ L3.5 DMZ
Operations (L3)        Enterprise (L4)
Grain Accounting◄─SQL──►Commodity ERP
Ticket System◄───REST──►Trading platform
Grading/FGIS◄──────────►USDA portal`}</Ascii>
            </S>
            <S n={10} t="References" id="references">
                <Refs items={[
                    'OSHA. (2023). 29 CFR 1910.272: Grain handling facilities. Department of Labor.',
                    'NFPA. (2022). NFPA 61: Prevention of fires and dust explosions in agricultural and food processing facilities.',
                    'NFPA. (2023). NFPA 652: Standard on the fundamentals of combustible dust.',
                    'USDA GIPSA. (2023). United States Standards for Grain. USDA AMS.',
                    'ASABE. (2022). ASAE S481.1: Grain bin aeration design criteria. ASABE.',
                    'EPA. (2021). 40 CFR 60 Subpart DD: Grain elevators emission standards.',
                    'The Open Group. (2022). TOGAF Standard, Version 10.',
                    'Hellevang, K. (2021). Grain drying and storage engineering. NDSU Extension.',
                ]} />
            </S>
            <SeeAlso links={[
                { href: '/wiki/food-agriculture', label: 'Food & Agriculture Hub', color: '#84CC16' },
                { href: '/wiki/sectors/FOOD', label: 'Sector Overview', color: '#84CC16' },
                { href: '/wiki/food-agriculture/feed-mill', label: 'Feed Mill', color: '#A855F7' },
            ]} />
        </div>
    );
}
function S({ n, t, id, children }: { n: number; t: string; id: string; children: React.ReactNode }) {
    return (<section id={id} className="space-y-4"><h2 className="text-lg font-heading font-semibold text-white"><span className="text-[#84CC16] mr-2">{n}.</span>{t}</h2>{children}</section>);
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
