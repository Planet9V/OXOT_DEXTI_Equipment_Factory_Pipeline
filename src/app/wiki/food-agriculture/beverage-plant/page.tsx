/**
 * Beverage Manufacturing Plant Deep-Dive Reference Architecture.
 * Water treatment, blending, pasteurization, filling, CIP.
 * @module wiki/food-agriculture/beverage-plant/page
 */
export const metadata = {
    title: 'Beverage Manufacturing Plant — Food & Agriculture Wiki',
    description: 'TOGAF reference architecture for beverage plants: water treatment, batch blending, pasteurization/UHT, high-speed filling, ISA-88 batch control, and CIP sanitation.',
};
export default function BeveragePlantPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)' }}>🍺</div>
                    <div>
                        <span className="text-[10px] text-gray-500 font-mono block">FOOD-FP-BEV</span>
                        <h1 className="text-2xl font-heading font-bold text-white">Beverage Manufacturing Plant Reference Architecture</h1>
                    </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">TOGAF-based reference architecture for beverage manufacturing (soft drinks, beer, bottled water, juice) covering water treatment (RO, UV, ozone), ISA-88 batch blending, flash/tunnel pasteurization, high-speed PET/glass/can filling (100-2,000+ BPM), CIP sanitation, and integrated MES/ERP.</p>
            </div>
            <S n={1} t="TOGAF Business Architecture" id="togaf">
                <H4>Stakeholder Map</H4>
                <Tbl heads={['Stakeholder', 'Role', 'Interest']} rows={[
                    ['Beverage Companies', 'Owner/Operator', 'Coca-Cola, PepsiCo, AB InBev, Keurig Dr Pepper'],
                    ['FDA', 'Regulatory', '21 CFR 110/113/114/129, FSMA, HARPC'],
                    ['TTB', 'Regulatory (Alcohol)', 'Federal permits, formulas, labels, tax'],
                    ['EPA', 'Environmental', 'Effluent limits (40 CFR 405), water use'],
                    ['OSHA', 'Safety', 'Machine guarding, CO2 monitoring, LOTO'],
                    ['Packaging OEMs', 'Supplier', 'KHS, Krones, Sidel — fillers, blow-molders'],
                    ['Ingredient Suppliers', 'Input', 'Sweeteners, flavors, CO2, concentrates'],
                    ['Retailers/Distributors', 'Customer', 'DSD routes, chain warehouse delivery'],
                ]} />
                <H4>Regulatory Framework</H4>
                <Tbl heads={['Standard', 'Title', 'Scope']} rows={[
                    ['21 CFR 129', 'Bottled Water', 'Source, treatment, bottling, labeling'],
                    ['21 CFR 110', 'cGMP', 'Facility, equipment, process controls'],
                    ['FSMA HARPC', 'Preventive Controls', 'Hazard analysis, CCP, verification'],
                    ['3-A SSI', 'Sanitary Standards', 'Equipment design, cleanability'],
                    ['ISA-88', 'Batch Control', 'Recipe management, unit procedures'],
                    ['TTB 27 CFR 25', 'Beer Regulations', 'Formulas, labeling, excise tax'],
                ]} />
            </S>
            <S n={2} t="High-Level Design" id="hld">
                <Ascii>{`┌─── WATER TREATMENT ──────────────────────────────────┐
│ Municipal water → Carbon filter → RO → UV → Ozone     │
│ → Storage → Blending water (target: <5 TDS)            │
├─── BATCH BLENDING ──────────────────────────────────┤
│ Syrup kitchen: sugar dissolve → filter → batch tank    │
│ → Flavor/color dosing → Carbonation (CO2 3.5-4.5 vol) │
│ → QC check → Release → To filler bowl                  │
├─── THERMAL PROCESSING ──────────────────────────────┤
│ Flash pasteurizer: 72C/15s (juice/tea) — or —          │
│ Tunnel pasteurizer: 60C/20min (beer, PU=15-25)         │
│ UHT: 135C/2s (shelf-stable, aseptic fill)              │
├─── FILLING & PACKAGING ────────────────────────────┤
│ Blow molder (PET) → Rinser → Filler/capper            │
│ → Labeler → Date coder → Checkweigher → Case packer   │
│ → Palletizer → Stretch wrap → Dock → Ship              │
└─────────────────────────────────────────────────────┘`}</Ascii>
            </S>
            <S n={3} t="Detailed Technical Description" id="tech">
                <H4>3.1 Water Treatment</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['RO System', '2-pass, spiral wound', '50,000-500,000 GPD, <5 TDS'],
                    ['UV Disinfection', '254 nm germicidal', '40 mJ/cm2, 99.99% reduction'],
                    ['Ozone Generator', 'Corona discharge', '0.2-0.4 ppm residual, 10 min CT'],
                    ['Carbon Filter', 'Granular activated', 'Chlorine/taste/odor removal'],
                    ['Softener', 'Ion exchange resin', '<1 gpg hardness, auto regeneration'],
                    ['Storage Tank', 'Stainless 316L', '10,000-50,000 gal, N2 blanket'],
                ]} />
                <H4>3.2 Batch Blending &amp; Carbonation</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Sugar Dissolver', 'Continuous or batch', '20-65 Brix, 180F, 3A SSI'],
                    ['Blending Tank', 'Jacketed, agitated', '5,000-20,000 gal, CIP-able'],
                    ['Carbonator', 'In-line venturi', '3.0-4.5 volumes CO2, +/-0.1 vol'],
                    ['Deaerator', 'Vacuum/membrane', '<1 ppm O2, product quality'],
                    ['Batch Controller', 'ISA-88 compliant', 'Recipe mgmt, phase logic'],
                    ['Flow Meter', 'Coriolis/magnetic', '0.1% accuracy, CIP-rated 3A'],
                ]} />
                <H4>3.3 Pasteurization</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Flash Pasteurizer', 'Plate HX, HTST', '72C/15s, 10,000-50,000 L/hr'],
                    ['Tunnel Pasteurizer', 'Sprayed water zones', '60C/20 min, PU 15-25 (beer)'],
                    ['UHT System', 'Tubular, indirect', '135C/2s, aseptic, shelf-stable'],
                    ['CIP for Pasteurizer', 'Dedicated circuit', 'Caustic 2%, acid 1%, rinse'],
                    ['Temperature Recorder', 'Chart/digital, sealed', 'HACCP CCP, tamper-evident'],
                ]} />
                <H4>3.4 High-Speed Filling &amp; Packaging</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['PET Blow Molder', 'Rotary stretch-blow', '600-2,400 BPH/cavity, SBO series'],
                    ['Filler/Capper', 'Rotary gravity/counter', '600-2,000 BPM, CSD/water/juice'],
                    ['Can Filler/Seamer', 'Rotary, 40-120 heads', '800-2,400 CPM, CO2 under-cover gas'],
                    ['Labeler', 'Rotary pressure-sensitive', 'Up to 2,000 BPM, servo driven'],
                    ['Date Coder', 'Laser/inkjet', 'Lot, date, time, line ID'],
                    ['Case Packer', 'Wrap-around / drop', '30-60 cases/min, multi-format'],
                    ['Palletizer', 'Robotic/conventional', '6-12 layers/min, pattern selection'],
                ]} />
                <H4>3.5 CIP Sanitation</H4>
                <Tbl heads={['System', 'Type', 'Specification']} rows={[
                    ['CIP Skid', '3-5 tank', 'Caustic (2% NaOH 80C), acid (1% HNO3 60C)'],
                    ['Supply Pump', 'Centrifugal, 3A SS', '200-500 GPM, 50 psi, CIP return'],
                    ['Conductivity', 'In-line probe', 'Phase transition sensing, auto-sequence'],
                    ['Cycle Time', 'Automated PLC', 'Rinse-caustic-rinse-acid-rinse-sanitize (45 min)'],
                ]} />
            </S>
            <S n={4} t="Process Diagrams" id="process">
                <H4>4.1 Water to Finished Product</H4>
                <Ascii>{`Municipal water → Carbon → Softener → RO → UV → Ozone → Tank
  → Syrup kitchen (sugar + flavor) → Blend tank → Carbonate
  → Deaerate → Flash pasteurize (72C/15s) → Filler bowl`}</Ascii>
                <H4>4.2 Filling Line</H4>
                <Ascii>{`PET preform → Blow molder → Air conveyor → Rinser → Filler
  → Capper → Labeler → Date code → Checkweigher → Reject gate
  → Case packer → Palletizer → Stretch wrap → Dock`}</Ascii>
                <H4>4.3 CIP Cycle</H4>
                <Ascii>{`Pre-rinse (ambient, 5 min) → Caustic (2% NaOH, 80C, 15 min)
  → Intermediate rinse → Acid (1% HNO3, 60C, 10 min)
  → Final rinse → Sanitize (PAA 200 ppm) → Drain`}</Ascii>
            </S>
            <S n={5} t="Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2 italic">500 BPM PET soft drink line</p>
                <Tbl heads={['Equipment', 'Qty', 'Specification']} rows={[
                    ['RO System', '1', '200,000 GPD, 2-pass'],
                    ['UV System', '2', '254 nm, 40 mJ/cm2'],
                    ['Ozone Generator', '1', '100 g/hr, corona discharge'],
                    ['Sugar Dissolver', '1', 'Continuous, 65 Brix, 180F'],
                    ['Blend Tanks', '4', '10,000 gal each, jacketed'],
                    ['Carbonator', '1', 'In-line, 4.0 vol CO2'],
                    ['Flash Pasteurizer', '1', '30,000 L/hr, plate HX'],
                    ['PET Blow Molder', '1', '24-cavity, 36,000 BPH'],
                    ['Rotary Filler/Capper', '1', '120-head, 500 BPM'],
                    ['Labeler', '1', 'Rotary P/S, 500 BPM'],
                    ['Date Coder', '2', 'Laser, lot/date/time'],
                    ['Checkweigher', '1', 'In-line, +/-1 g'],
                    ['Case Packer', '1', 'Wrap-around, 40 cases/min'],
                    ['Palletizer', '1', 'Robotic, 8 layers/min'],
                    ['CIP Skids', '3', '5-tank, 300 GPM'],
                    ['Boiler', '1', '300 BHP, natural gas, 150 psi'],
                    ['Air Compressor', '2', '100 HP, oil-free, ISO 8573-1'],
                    ['CO2 Bulk Tank', '1', '50 ton, liquid, food-grade'],
                    ['SCADA/MES', '1', 'Ignition/Wonderware, 5,000 tags'],
                    ['Emergency Generator', '1', '1 MW diesel, 480V'],
                ]} />
            </S>
            <S n={6} t="Purdue Model / ISA-95 Mapping" id="purdue">
                <Tbl heads={['Level', 'Function', 'Components', 'Protocols']} rows={[
                    ['L0', 'Sensing', 'Flow, temp, pressure, Brix, CO2, pH', '4-20 mA, HART'],
                    ['L1', 'Control', 'Line PLC, batch controller (ISA-88)', 'EtherNet/IP, Profinet'],
                    ['L2', 'Supervisory', 'SCADA HMI, batch management', 'OPC UA, Modbus TCP'],
                    ['L3', 'Operations', 'MES (Wonderware), QC/LIMS, scheduling', 'SQL, REST API'],
                    ['L3.5', 'DMZ', 'IT/OT firewall, historian relay', 'TLS 1.3, VPN'],
                    ['L4', 'Enterprise', 'ERP (SAP), DSD routing, supplier portal', 'EDI, REST, IDoc'],
                ]} />
            </S>
            <S n={7} t="Safety &amp; Supporting Systems" id="safety">
                <Tbl heads={['System', 'Standard', 'Specification']} rows={[
                    ['CO2 Monitoring', 'OSHA PEL 5,000 ppm', 'Area detectors, ventilation interlock'],
                    ['Machine Guarding', 'OSHA 1910.212', 'Filler/capper guards, light curtains'],
                    ['LOTO', 'OSHA 1910.147', 'Line changeover, CIP, maintenance'],
                    ['Steam Safety', 'ASME BPVC', 'PRV, low-water cutoff, annual inspection'],
                    ['Chemical Handling', 'OSHA HazCom', 'CIP caustic/acid, SDS, PPE, showers'],
                    ['Compressed Air', 'ISO 8573-1', 'Oil-free, particulate, moisture class'],
                ]} />
            </S>
            <S n={8} t="Communication Protocol Stack" id="protocols">
                <Ascii>{`Enterprise:  SAP ERP │ EDI 856/945 │ DSD route planning │ TTB portal
Network:     Industrial Ethernet │ Fiber ring │ Wi-Fi (mobile HMI)
Supervisory: OPC UA │ Modbus TCP │ MQTT │ ISA-88 batch
Control:     EtherNet/IP │ Profinet │ IO-Link │ AS-i
Field:       4-20 mA │ HART │ RTD │ Coriolis (pulse) │ Discrete I/O`}</Ascii>
            </S>
            <S n={9} t="Data Flow Architecture" id="data-flow">
                <Ascii>{`Field (L0)           Control (L1)       SCADA (L2)
Brix──4-20────────►Batch PLC──EIP───►ISA-88 batch mgr
Temp──RTD─────────►Pasteur PLC─EIP──►HACCP CCP log
Flow──Coriolis────►Filler PLC──EIP──►Line OEE dashboard
CO2 vol──4-20─────►Carb PLC───EIP──►QC trend
                                       │ L3.5 DMZ
Operations (L3)        Enterprise (L4)
MES (efficiency)◄─SQL──►SAP ERP
LIMS (lab results)◄────►QC release
DSD routing◄──REST─────►Fleet GPS`}</Ascii>
            </S>
            <S n={10} t="References" id="references">
                <Refs items={[
                    'FDA. (2023). 21 CFR 129: Processing and bottling of bottled drinking water.',
                    'ISA. (2020). ISA-88: Batch control standard. ISA.',
                    '3-A SSI. (2022). 3-A Sanitary Standards for equipment design.',
                    'ASBC. (2021). Methods of analysis (beer). ASBC.',
                    'ASHRAE. (2022). ASHRAE Handbook: Refrigeration (Ch. 39, Beverages).',
                    'Krones AG. (2023). PET line technology reference guide.',
                    'The Open Group. (2022). TOGAF Standard, Version 10.',
                    'Bamforth, C. (2020). Brewing: Science and practice (4th ed.).',
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
