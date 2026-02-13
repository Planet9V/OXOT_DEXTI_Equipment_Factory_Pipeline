/**
 * Greenhouse / CEA Operation Deep-Dive Reference Architecture.
 * Climate control, fertigation, lighting, growing systems, sensors.
 * @module wiki/food-agriculture/greenhouse/page
 */
export const metadata = {
    title: 'Greenhouse / CEA Operation — Food & Agriculture Wiki',
    description: 'TOGAF reference architecture for controlled environment agriculture: climate computers, fertigation, HPS/LED supplemental lighting, CO2 enrichment, and IPM protocols.',
};
export default function GreenhousePage() {
    return (
        <div className="max-w-5xl space-y-10">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}>🌿</div>
                    <div>
                        <span className="text-[10px] text-gray-500 font-mono block">FOOD-AG-CEA</span>
                        <h1 className="text-2xl font-heading font-bold text-white">Greenhouse / CEA Operation Reference Architecture</h1>
                    </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">TOGAF-based reference architecture for large-scale controlled environment agriculture (10-100+ acres) covering climate computers (Priva/Ridder/Hoogendoorn), fertigation with recirculating nutrient delivery, HPS/LED supplemental lighting (DLI management), CO2 enrichment, integrated pest management, and packhouse operations under GAP/GHP food safety standards.</p>
            </div>
            <S n={1} t="TOGAF Business Architecture" id="togaf">
                <H4>Stakeholder Map</H4>
                <Tbl heads={['Stakeholder', 'Role', 'Interest']} rows={[
                    ['Greenhouse Operators', 'Owner', 'AppHarvest, Mastronardi, Village Farms, Windset'],
                    ['USDA/State Ag Dept', 'Regulatory', 'Organic certification, plant health, imports'],
                    ['FDA', 'Food Safety', 'FSMA Produce Safety Rule, GAP/GHP'],
                    ['EPA', 'Environmental', 'Pesticide labels (FIFRA), water discharge'],
                    ['Climate Computer OEMs', 'Supplier', 'Priva, Ridder, Hoogendoorn, Argus'],
                    ['Lighting OEMs', 'Supplier', 'Signify/Philips, Fluence, Gavita — HPS/LED'],
                    ['Seed/Genetics', 'Input', 'Rijk Zwaan, Enza Zaden, De Ruiter — varieties'],
                    ['Retailers', 'Customer', 'Walmart, Costco, Whole Foods — year-round supply'],
                ]} />
                <H4>Regulatory Framework</H4>
                <Tbl heads={['Standard', 'Title', 'Scope']} rows={[
                    ['FSMA Produce Safety', '21 CFR 112', 'Water, soil amendments, worker hygiene'],
                    ['GAP/GHP', 'USDA Audit Program', 'Good Agricultural/Handling Practices'],
                    ['EPA FIFRA', 'Pesticide Regulation', 'Label compliance, REI, PHI'],
                    ['OSHA General Duty', 'Worker Safety', 'Heat stress, chemical handling, ergonomics'],
                    ['ASABE S640', 'Greenhouse Ventilation', 'Design, sizing, energy efficiency'],
                    ['NGMA Standards', 'Structural Design', 'Wind/snow load, glazing, foundations'],
                ]} />
            </S>
            <S n={2} t="High-Level Design" id="hld">
                <Ascii>{`┌─── CLIMATE ENVELOPE ─────────────────────────────────┐
│ Venlo/gutter-connected glass (10-100 acres)           │
│ → Blackout/energy screens → Roof vents → Side vents   │
│ → Hot water heating loops → Pad-and-fan / HAF cooling  │
├─── IRRIGATION / FERTIGATION ────────────────────────┤
│ Raw water → RO/UV → Nutrient dosing (A+B+acid)        │
│ → Drip emitters → Drain collection → UV sterilize      │
│ → Recirculate 20-40% (closed-loop) → Supplement fresh  │
├─── LIGHTING ────────────────────────────────────────┤
│ HPS 1000W (1,700 umol/s) or LED (2.7-3.5 umol/J)     │
│ → Target DLI 20-30 mol/m2/day → Photoperiod control   │
├─── GROWING / CROP ──────────────────────────────────┤
│ Propagation → Transplant → Training → Harvest          │
│ → Pack house → Cold chain → Shipping                   │
├─── IPM / BIO-CONTROL ──────────────────────────────┤
│ Sticky traps → Scouting → Beneficial insects (Koppert) │
│ → Targeted spray (if needed) → Record keeping          │
└─────────────────────────────────────────────────────┘`}</Ascii>
            </S>
            <S n={3} t="Detailed Technical Description" id="tech">
                <H4>3.1 Climate Control</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Climate Computer', 'Priva Connext / Ridder', 'Heating, vent, screen, CO2, irrigation'],
                    ['Heating Boiler', 'Natural gas, condensing', '5-50 MMBTU/hr, 95% efficiency'],
                    ['Heating Pipes', 'Steel rail/grow pipes', '4-pipe system, supply 180F, return 140F'],
                    ['Energy Screen', 'Aluminum/polyester', '65-75% energy savings, blackout option'],
                    ['Roof Vent', 'Motorized, rack-and-pinion', '0-100% opening, wind speed interlock'],
                    ['Pad-and-Fan', 'Evaporative cellulose', '6 inch pad, 250 CFM/ft2 face area'],
                    ['HAF Fans', 'Horizontal air flow', '36-48 inch, 2 CFM/sq ft floor area'],
                    ['Dehumidifier', 'Heat pump / reheat', '100-500 pints/day, minimum pipe heating'],
                ]} />
                <H4>3.2 Irrigation &amp; Fertigation</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Dosing Unit', 'Priva Nutriflex / Ridder', 'A+B+acid, EC 1.5-4.0 mS/cm, pH 5.5-6.5'],
                    ['RO System', 'Reverse osmosis', '5,000-50,000 GPD, <0.1 mS/cm permeate'],
                    ['UV Sterilizer', 'Germicidal 254 nm', '40 mJ/cm2, drain water recirculation'],
                    ['Drip Emitters', 'Compensating, 2 L/hr', '1 per plant, Netafim/Jain'],
                    ['EC/pH Sensor', 'In-line, auto-clean', 'Accuracy: EC +/-0.1, pH +/-0.05'],
                    ['Mixing Tank', 'FRP/poly, 1,000-10,000 gal', 'Stock solution A, B, acid'],
                ]} />
                <H4>3.3 Supplemental Lighting</H4>
                <Tbl heads={['Fixture', 'Technology', 'Specification']} rows={[
                    ['HPS 1000W', 'High-pressure sodium', '1,700 umol/s, 1.7 umol/J'],
                    ['LED Top-Light', 'Full spectrum, dimmable', '2.7-3.5 umol/J, 600-1000W'],
                    ['LED Inter-Light', 'In-canopy modules', '200-400 umol/s, supplemental'],
                    ['Light Sensor', 'PAR quantum', '0-2500 umol/m2/s, +/-5%'],
                    ['DLI Controller', 'Climate computer recipe', 'Target 20-30 mol/m2/day, sunrise offset'],
                ]} />
                <H4>3.4 CO2 Enrichment</H4>
                <Tbl heads={['System', 'Type', 'Specification']} rows={[
                    ['Flue Gas CO2', 'Boiler exhaust capture', 'Clean burn, <5 ppm NOx, catalyst'],
                    ['Liquid CO2', 'Bulk tank, evaporator', '99.9% food-grade, 0.5-2 ton/day'],
                    ['CO2 Sensor', 'NDIR, aspirated', '0-2000 ppm, +/-30 ppm, 1-min response'],
                    ['Target Level', 'Dawn enrichment', '800-1200 ppm, vent strategy integrated'],
                ]} />
                <H4>3.5 Crop &amp; IPM</H4>
                <Tbl heads={['System', 'Type', 'Specification']} rows={[
                    ['Growing Media', 'Rockwool/coir/perlite', 'Slabs 3x6x36 inch, sterile'],
                    ['Biocontrol', 'Beneficial insects', 'Encarsia, Phytoseiulus, Stratiolaelaps'],
                    ['Scouting App', 'Digital, GPS mapped', 'Weekly, per-zone IPM records'],
                    ['Sticky Traps', 'Yellow/blue, monitored', '1 per 200 sq ft, weekly count'],
                    ['Packhouse', 'Grading, packaging', 'Automated, vision sorting, MAP packing'],
                ]} />
            </S>
            <S n={4} t="Process Diagrams" id="process">
                <H4>4.1 Climate Control Loop</H4>
                <Ascii>{`Sensors (temp, RH, CO2, light) → Climate computer → Compare setpoints
  → Actuate: vents, screens, heating valves, HAF fans, CO2 dosing
  → DLI check → Supplement light if deficit → Log all parameters`}</Ascii>
                <H4>4.2 Fertigation Cycle</H4>
                <Ascii>{`Raw water → RO → A+B+acid dosing (EC/pH target)
  → Drip to plants → 20-40% runoff → Drain collection
  → UV sterilize → EC/pH adjust → Supplement fresh → Recirculate`}</Ascii>
                <H4>4.3 Crop Lifecycle</H4>
                <Ascii>{`Seed → Propagation (14 days) → Transplant to slab → Train/lower
  → Pollinate (bumble bees) → Fruit set → Harvest (10-12 months)
  → Pack house: grade, sort, pack → Cold chain → Retailer`}</Ascii>
            </S>
            <S n={5} t="Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2 italic">30-acre Venlo glass greenhouse (tomatoes, high-wire)</p>
                <Tbl heads={['Equipment', 'Qty', 'Specification']} rows={[
                    ['Glass Panels', '120,000+', '4 mm tempered, diffuse, AR coated'],
                    ['Climate Computer', '1', 'Priva Connext, 500+ I/O points'],
                    ['Heating Boiler', '2', '25 MMBTU/hr, condensing, dual fuel'],
                    ['Heating Pipe', '40 mi total', '3/4-1.25 inch steel, rail + grow'],
                    ['Energy Screens', '30 acres', 'Svensson Luxous, motorized'],
                    ['Roof Vents', '600', 'Rack-and-pinion, wind interlock'],
                    ['HPS or LED Fixtures', '15,000', '1000W HPS or 600W LED top-light'],
                    ['Fertigation Unit', '1', 'Priva Nutriflex, 12-head dosing'],
                    ['RO System', '1', '30,000 GPD, 2-stage'],
                    ['UV Sterilizers', '2', '40 mJ/cm2, drain water'],
                    ['CO2 System', '1', 'Flue gas + liquid backup, 1 ton/day'],
                    ['CO2 Sensors', '60', 'NDIR, aspirated, per-zone'],
                    ['Temperature Sensors', '200', 'PT100, ventilated aspirated box'],
                    ['Humidity Sensors', '200', 'Capacitive, +/-2% RH'],
                    ['PAR Sensors', '30', 'Quantum, 0-2500 umol'],
                    ['Bumble Bee Hives', '120', 'Koppert Natupol, 8-week cycle'],
                    ['Biocontrol Insects', 'Weekly release', 'Sachets + loose, per-zone'],
                    ['Packhouse Line', '1', 'Vision grader, packaging, 20 ton/hr'],
                    ['Cold Storage', '1', '5,000 sq ft, 50-55F, forced air'],
                    ['Emergency Generator', '1', '500 kW, diesel, ATS'],
                ]} />
            </S>
            <S n={6} t="Purdue Model / ISA-95 Mapping" id="purdue">
                <Tbl heads={['Level', 'Function', 'Components', 'Protocols']} rows={[
                    ['L0', 'Sensing', 'Temp, RH, CO2, PAR, EC/pH, drain sensors', '4-20 mA, PT100, SDI-12'],
                    ['L1', 'Control', 'Actuators, valves, screen motors, VFDs', 'Modbus RTU, 24V DC'],
                    ['L2', 'Supervisory', 'Climate computer (Priva), fertigation ctrl', 'BACnet, Modbus TCP'],
                    ['L3', 'Operations', 'Crop planning, scouting app, labor mgmt', 'REST API, cloud'],
                    ['L3.5', 'DMZ', 'Cloud gateway, firewall, VPN', 'TLS 1.3, MQTT'],
                    ['L4', 'Enterprise', 'ERP, retailer portals, market forecasting', 'REST, EDI'],
                ]} />
            </S>
            <S n={7} t="Safety &amp; Supporting Systems" id="safety">
                <Tbl heads={['System', 'Standard', 'Specification']} rows={[
                    ['Chemical Handling', 'EPA FIFRA/OSHA', 'PPE, REI posting, spray records'],
                    ['Heat Stress', 'OSHA General Duty', 'Rest breaks, water, shade, 90F trigger'],
                    ['CO2 Safety', 'OSHA PEL', '5,000 ppm TWA, vent before entry if >1200'],
                    ['Electrical Safety', 'NFPA 70/NEC', 'Wet location GFCI, grow-light circuits'],
                    ['Boiler Safety', 'ASME BPVC', 'Annual inspection, PRV, low-water cutoff'],
                    ['Structural', 'NGMA', 'Wind/snow loads, emergency snow melt'],
                ]} />
            </S>
            <S n={8} t="Communication Protocol Stack" id="protocols">
                <Ascii>{`Enterprise:  ERP │ Retailer EDI │ Market data │ Cloud analytics
Network:     Fiber backbone │ Wi-Fi 6 │ LoRaWAN (field sensors)
Supervisory: BACnet/IP │ Modbus TCP │ MQTT (cloud telemetry)
Control:     Modbus RTU │ 24V DC actuators │ 0-10V dimming
Field:       4-20 mA │ PT100 RTD │ SDI-12 │ 0-10V (PAR)`}</Ascii>
            </S>
            <S n={9} t="Data Flow Architecture" id="data-flow">
                <Ascii>{`Field (L0)           Control (L1)       Climate Comp (L2)
Temp──PT100───────►I/O module──Mod───►Priva Connext
RH──capacitive────►I/O module──Mod───►Climate recipe engine
CO2──NDIR─────────►I/O module──Mod───►Vent/dose strategy
PAR──quantum──────►I/O module──Mod───►DLI calculator
EC/pH──electrode──►Dosing ctrl──Mod──►Fertigation recipe
                                       │ L3.5 Cloud GW
Operations (L3)        Enterprise (L4)
Crop planner◄──REST──►Retailer portal
Scouting app◄──MQTT──►IPM analytics
Labor mgmt◄─────────►ERP/payroll`}</Ascii>
            </S>
            <S n={10} t="References" id="references">
                <Refs items={[
                    'FDA. (2023). FSMA Produce Safety Rule. 21 CFR 112.',
                    'ASABE. (2022). ASABE S640: Greenhouse ventilation design. ASABE.',
                    'NGMA. (2021). Structural design standard for greenhouse structures. NGMA.',
                    'Aldrich, R. & Bartok, J. (2020). Greenhouse engineering (4th ed.). NRAES.',
                    'Marcelis, L. (2020). Achieving sustainable CEA. Wageningen UR.',
                    'Signify. (2023). Philips GreenPower LED specification guide.',
                    'The Open Group. (2022). TOGAF Standard, Version 10.',
                    'Priva. (2023). Connext climate computer technical manual.',
                ]} />
            </S>
            <SeeAlso links={[
                { href: '/wiki/food-agriculture', label: 'Food & Agriculture Hub', color: '#84CC16' },
                { href: '/wiki/sectors/FOOD', label: 'Sector Overview', color: '#84CC16' },
                { href: '/wiki/food-agriculture/grain-elevator', label: 'Grain Elevator', color: '#84CC16' },
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
