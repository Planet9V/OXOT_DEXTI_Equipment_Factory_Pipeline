/**
 * Cold Storage Distribution Center Deep-Dive Reference Architecture.
 * Ammonia/CO2 refrigeration, AS/RS, dock mgmt, FSMA compliance.
 * @module wiki/food-agriculture/cold-storage/page
 */
export const metadata = {
    title: 'Cold Storage Distribution Center — Food & Agriculture Wiki',
    description: 'TOGAF reference architecture for multi-temperature cold storage: ammonia/CO2 cascade refrigeration, AS/RS automation, dock management, WMS, and FSMA temperature compliance.',
};
export default function ColdStoragePage() {
    return (
        <div className="max-w-5xl space-y-10">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #0EA5E9, #0284C7)' }}>❄️</div>
                    <div>
                        <span className="text-[10px] text-gray-500 font-mono block">FOOD-FD-COLD</span>
                        <h1 className="text-2xl font-heading font-bold text-white">Cold Storage Distribution Center Reference Architecture</h1>
                    </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">TOGAF-based reference architecture for multi-temperature cold storage distribution centers (-20F to 40F) covering NH3/CO2 cascade refrigeration systems, automated storage and retrieval (AS/RS), high-speed dock management, WMS integration, and FSMA food safety temperature compliance.</p>
            </div>
            <S n={1} t="TOGAF Business Architecture" id="togaf">
                <H4>Stakeholder Map</H4>
                <Tbl heads={['Stakeholder', 'Role', 'Interest']} rows={[
                    ['3PL/Warehouse Operators', 'Owner', 'Americold, Lineage, US Cold Storage'],
                    ['Food Manufacturers', 'Customer', 'Frozen/chilled product storage, SLAs'],
                    ['Retailers', 'Customer', 'Walmart, Kroger — on-time, temp compliance'],
                    ['FDA/USDA', 'Regulatory', 'FSMA, temp monitoring, traceability'],
                    ['OSHA', 'Safety', 'PSM ammonia, confined space, ergonomics'],
                    ['EPA', 'Environmental', 'Ammonia RMP, refrigerant management'],
                    ['Refrigeration OEMs', 'Supplier', 'Evapco, GEA, Frick, Natures, CO2 systems'],
                    ['Automation OEMs', 'Supplier', 'Dematic, Swisslog, Daifuku — AS/RS, conveyors'],
                ]} />
                <H4>Regulatory Framework</H4>
                <Tbl heads={['Standard', 'Title', 'Scope']} rows={[
                    ['29 CFR 1910.119', 'PSM', 'Ammonia >10,000 lbs threshold'],
                    ['40 CFR 68', 'EPA RMP', 'Risk Management Plan, ammonia'],
                    ['IIAR-2', 'Ammonia Piping', 'Design, materials, fabrication, testing'],
                    ['ASHRAE 15', 'Mech Refrigeration Safety', 'Machinery room, detection, ventilation'],
                    ['21 CFR 110', 'cGMP', 'Food storage facility sanitation'],
                    ['FSMA', 'Sanitary Transportation', 'Temp monitoring, records, 7 years'],
                ]} />
            </S>
            <S n={2} t="High-Level Design" id="hld">
                <Ascii>{`┌─── DOCK OPERATIONS ──────────────────────────────────┐
│ 80-120 dock doors → Rapid doors (cycle 3 sec)         │
│ → Dock levelers → Dock seals → Cross-dock staging     │
├─── MULTI-TEMP ZONES ────────────────────────────────┤
│ Frozen:  -20F to -10F  │  Deep Freeze: -20F           │
│ Cooler:  28F to 35F    │  Produce: 34-38F              │
│ Dock:    40F controlled │  Banana ripening: 56-64F      │
├─── NH3/CO2 REFRIGERATION ───────────────────────────┤
│ Engine room → Screw compressors (NH3 high side)       │
│ → CO2 cascade (low side) → Evaporators per zone       │
│ → Condensers (rooftop) → Controls/SCADA               │
├─── AUTOMATION ──────────────────────────────────────┤
│ AS/RS cranes (6-8) → Pallet conveyors → Shuttle cars  │
│ → WMS directed putaway → Pick-to-belt → Staging       │
└─────────────────────────────────────────────────────┘`}</Ascii>
            </S>
            <S n={3} t="Detailed Technical Description" id="tech">
                <H4>3.1 NH3/CO2 Cascade Refrigeration</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['NH3 Screw Compressor', 'Frick/Mycom', '300-1,500 HP, +20F SST (high side)'],
                    ['CO2 Compressor', 'Subcritical cascade', '100-500 HP, -40F SST (low side)'],
                    ['Evaporative Condenser', 'Evapco/BAC', '500-2,000 ton, wet bulb design'],
                    ['CO2 Recirculator', 'Pump + surge drum', 'Low-charge, 2:1 overfeed'],
                    ['Evaporator Coils', 'Finned tube, penthouse', 'Per-zone, defrost (hot gas/electric)'],
                    ['Controls/VFD', 'AB/Siemens PLC', 'EtherNet/IP, OPC UA to SCADA'],
                ]} />
                <H4>3.2 Warehouse Automation (AS/RS)</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['AS/RS Crane', 'SRM, -20F rated', '100 ft height, 600 pallets/hr/crane'],
                    ['Pallet Conveyor', 'Chain-driven, stainless', 'Heavy duty, 2,500 lb pallet'],
                    ['Shuttle Car', 'Multi-deep lane', '8-12 deep storage, battery powered'],
                    ['Pallet Scanner', '3D profiling', 'Oversize/damage/label verification'],
                    ['AGV/AMR', 'Cold-rated autonomous', 'Lithium battery, -20F operation'],
                    ['WMS Server', 'Manhattan/Blue Yonder', 'HA cluster, directed putaway/pick'],
                ]} />
                <H4>3.3 Dock Management</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Rapid Roll Door', 'High-speed, insulated', 'Cycle 3 sec, -20F rated, air curtain'],
                    ['Dock Leveler', 'Hydraulic, pit-style', '50,000 lb capacity, insulated lip'],
                    ['Dock Seal', 'Insulated compression', 'Trailer-tight, minimize infiltration'],
                    ['Dock Scheduling', 'Software (C3, Opendock)', 'Appointment, yard management'],
                    ['Trailer Tracking', 'GPS/RFID', 'Real-time yard visibility'],
                ]} />
                <H4>3.4 Temperature Monitoring / FSMA</H4>
                <Tbl heads={['System', 'Type', 'Specification']} rows={[
                    ['Zone Temp Sensors', 'Wireless (Disruptive)', 'Every 500 sq ft, 1-min interval'],
                    ['Product Probes', 'Bluetooth/NFC', 'Core temp logging, FSMA compliant'],
                    ['Data Logger', 'Cloud-based (Emerson)', '21 CFR 11 compliant, 7-yr retention'],
                    ['Alarm System', 'Automated, SMS/email', 'Deviation alert in 2 min'],
                    ['Calibration', 'NIST traceable', 'Annual, +/-0.5F accuracy'],
                ]} />
                <H4>3.5 Insulated Building Envelope</H4>
                <Tbl heads={['Component', 'Type', 'Specification']} rows={[
                    ['Wall Panels', 'PIR/PUR insulated', '6-8 inch, R-48, vapor barrier'],
                    ['Ceiling Panels', 'Suspended, PIR', '8 inch, snow/wind load rated'],
                    ['Floor', 'Heated sub-slab', 'Glycol loop prevents frost heave'],
                    ['Vapor Barrier', 'Polyethylene, sealed', '15 mil, all penetrations sealed'],
                    ['Strip Curtains', 'PVC, overlap', 'Dock/zone transitions, -20F rated'],
                ]} />
            </S>
            <S n={4} t="Process Diagrams" id="process">
                <H4>4.1 Inbound Flow</H4>
                <Ascii>{`Truck arrives → Dock scheduling → Dock assignment → Rapid door
  → Dock leveler → Unload → Pallet scan (3D profile + label)
  → WMS directed putaway → AS/RS crane → Storage lane`}</Ascii>
                <H4>4.2 Outbound Flow</H4>
                <Ascii>{`Order release (WMS) → Pick wave → AS/RS retrieval → Conveyor
  → Staging lane → Quality check (FIFO, temp) → Load trailer
  → Seal → Reefer set temp → BOL → Dispatch`}</Ascii>
                <H4>4.3 Refrigeration Control</H4>
                <Ascii>{`Zone temp sensor → PLC → Compare setpoint (-20F)
  → Modulate: compressor load (VFD) + evaporator fan speed
  → Defrost cycle (hot gas, 30 min, 4x/day) → Resume cooling
  → NH3 leak detect → Alarm cascade → Emergency vent`}</Ascii>
            </S>
            <S n={5} t="Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2 italic">250,000 sq ft multi-temp cold storage DC (40,000 pallet positions)</p>
                <Tbl heads={['Equipment', 'Qty', 'Specification']} rows={[
                    ['NH3 Screw Compressors', '6', '500-1000 HP, ammonia high side'],
                    ['CO2 Compressors', '4', '200 HP, subcritical cascade'],
                    ['Evaporative Condensers', '4', '1,000 ton each, rooftop'],
                    ['Evaporator Coils', '40', 'Penthouse, per-zone, hot-gas defrost'],
                    ['AS/RS Cranes', '6', '100 ft height, -20F rated'],
                    ['Pallet Conveyors', '2 km', 'Chain-driven, 2,500 lb rated'],
                    ['Shuttle Cars', '24', '8-deep lane, battery powered'],
                    ['Rapid Roll Doors', '30', '-20F rated, 3-sec cycle'],
                    ['Dock Levelers', '80', 'Hydraulic, 50,000 lb, insulated'],
                    ['Dock Seals', '80', 'Insulated compression'],
                    ['WMS Servers', '4', 'HA cluster, Manhattan/Blue Yonder'],
                    ['Temp Data Loggers', '500', 'Wireless, 1-min, FSMA compliant'],
                    ['NH3 Detectors', '60', 'Electrochemical, 0-500 ppm'],
                    ['CO2 Detectors', '30', 'NDIR, 0-5000 ppm, ventilation'],
                    ['PLC Cabinets', '10', 'AB ControlLogix, EtherNet/IP'],
                    ['VFDs', '40', '10-500 HP, compressor/fan'],
                    ['PIR Wall Panels', '50,000 sq ft', '6 inch, R-48'],
                    ['Sub-Slab Heating', '250,000 sq ft', 'Glycol loop, freeze prevention'],
                    ['Emergency Generators', '2', '1.5 MW diesel, 480V'],
                    ['UPS', '4', '100 kVA, WMS/SCADA'],
                ]} />
            </S>
            <S n={6} t="Purdue Model / ISA-95 Mapping" id="purdue">
                <Tbl heads={['Level', 'Function', 'Components', 'Protocols']} rows={[
                    ['L0', 'Sensing', 'Temp sensors, NH3/CO2 detectors, pressure', '4-20 mA, wireless'],
                    ['L1', 'Control', 'Compressor PLC, evap PLC, AS/RS PLC', 'EtherNet/IP, Profinet'],
                    ['L2', 'Supervisory', 'Refrig SCADA, AS/RS controller, dock HMI', 'OPC UA, Modbus TCP'],
                    ['L3', 'Operations', 'WMS (Manhattan), temp monitoring, dock sched', 'REST API, SQL'],
                    ['L3.5', 'DMZ', 'IT/OT firewall, cloud gateway, data diode', 'TLS 1.3, VPN'],
                    ['L4', 'Enterprise', 'Customer portal, TMS, ERP, carrier EDI', 'EDI 856/945, REST'],
                ]} />
            </S>
            <S n={7} t="Safety &amp; Supporting Systems" id="safety">
                <Tbl heads={['System', 'Standard', 'Specification']} rows={[
                    ['PSM (Ammonia)', '29 CFR 1910.119', 'PHA, MOC, MI, >10K lbs NH3'],
                    ['RMP', '40 CFR 68', 'Worst-case analysis, emergency plan'],
                    ['NH3 Detection', 'IIAR-2', '25/150/300 ppm alarms, auto-vent'],
                    ['CO2 Monitoring', 'ASHRAE 34', '5,000 ppm TLV, ventilation interlock'],
                    ['Confined Space', 'OSHA 1910.146', 'Sub-slab, penthouse, pits'],
                    ['Cold Stress', 'OSHA General Duty', 'Warming shelters, rotation, PPE (-20F)'],
                ]} />
            </S>
            <S n={8} t="Communication Protocol Stack" id="protocols">
                <Ascii>{`Enterprise:  WMS REST API │ EDI 856/945 │ Customer portals │ TMS
Network:     Industrial Ethernet │ Wi-Fi 6 (warehouse) │ 5G
Supervisory: OPC UA │ BACnet/IP │ Modbus TCP │ MQTT (temp cloud)
Control:     EtherNet/IP │ Profinet │ AS-i │ DeviceNet
Field:       4-20 mA │ Wireless temp │ RFID/barcode │ RS-485`}</Ascii>
            </S>
            <S n={9} t="Data Flow Architecture" id="data-flow">
                <Ascii>{`Field (L0)           Control (L1)       SCADA (L2)
Temp──wireless────►Zone PLC──EIP────►Refrig SCADA
NH3──4-20─────────►Safety PLC──EIP──►Alarm manager
Pressure──4-20────►Comp PLC──EIP────►Historian
Pallet scan──eth──►AS/RS ctrl──eth──►WCS/WMS
                                       │ L3.5 DMZ
Operations (L3)        Enterprise (L4)
WMS◄──────REST─────►Customer portal
Temp logs◄──MQTT───►FSMA cloud archive
Dock sched◄───────►TMS/carrier EDI`}</Ascii>
            </S>
            <S n={10} t="References" id="references">
                <Refs items={[
                    'OSHA. (2023). 29 CFR 1910.119: Process Safety Management. DOL.',
                    'EPA. (2023). 40 CFR 68: Risk Management Program. EPA.',
                    'IIAR. (2021). IIAR-2: Ammonia refrigeration piping. IIAR.',
                    'ASHRAE. (2022). ASHRAE 15: Safety standard for refrigeration. ASHRAE.',
                    'GCCA. (2023). Global cold chain best practices guide. GCCA/IARW.',
                    'FDA. (2023). FSMA sanitary transportation of food. 21 CFR 1, Subpart O.',
                    'The Open Group. (2022). TOGAF Standard, Version 10.',
                    'Stoecker, W. (2020). Industrial refrigeration handbook. McGraw-Hill.',
                ]} />
            </S>
            <SeeAlso links={[
                { href: '/wiki/food-agriculture', label: 'Food & Agriculture Hub', color: '#84CC16' },
                { href: '/wiki/sectors/FOOD', label: 'Sector Overview', color: '#84CC16' },
                { href: '/wiki/food-agriculture/meatpacking', label: 'Meatpacking Plant', color: '#EF4444' },
            ]} />
        </div>
    );
}
function S({ n, t, id, children }: { n: number; t: string; id: string; children: React.ReactNode }) {
    return (<section id={id} className="space-y-4"><h2 className="text-lg font-heading font-semibold text-white"><span className="text-[#0EA5E9] mr-2">{n}.</span>{t}</h2>{children}</section>);
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
