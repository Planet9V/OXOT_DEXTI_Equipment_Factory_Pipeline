/**
 * Commercial Dairy Farm Deep-Dive Reference Architecture.
 * Milking, cooling, manure/biogas, feed, herd management.
 * @module wiki/food-agriculture/dairy-farm/page
 */
export const metadata = {
    title: 'Commercial Dairy Farm — Food & Agriculture Wiki',
    description: 'TOGAF reference architecture for large-scale dairy farms: rotary milking parlors, bulk milk cooling, anaerobic digestion/biogas, TMR feed mixing, and herd management systems.',
};
export default function DairyFarmPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #22C55E, #16A34A)' }}>🐄</div>
                    <div>
                        <span className="text-[10px] text-gray-500 font-mono block">FOOD-AN-DAIR</span>
                        <h1 className="text-2xl font-heading font-bold text-white">Commercial Dairy Farm Reference Architecture</h1>
                    </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">TOGAF-based reference architecture for large-scale commercial dairy operations (1,000-10,000+ head) covering rotary and parallel milking parlors, plate heat exchanger and bulk milk cooling, anaerobic digestion with biogas generation, total mixed ration (TMR) feed systems, and RFID-enabled herd management under PMO Grade A standards.</p>
            </div>
            <S n={1} t="TOGAF Business Architecture" id="togaf">
                <H4>Stakeholder Map</H4>
                <Tbl heads={['Stakeholder', 'Role', 'Interest']} rows={[
                    ['Dairy Producer', 'Owner/Operator', 'Milk yield, feed cost, herd health'],
                    ['Dairy Cooperatives', 'Buyer', 'DFA, LDFG — price, quality premiums (SCC)'],
                    ['FDA/State Ag Dept', 'Regulatory', 'PMO Grade A, NCIMS inspection'],
                    ['EPA', 'Environmental', 'CAFO permits (NPDES), nutrient management'],
                    ['USDA NRCS', 'Conservation', 'EQIP cost-share, manure plans'],
                    ['Veterinarians', 'Animal Health', 'VCPR, drug residue avoidance'],
                    ['Equipment OEMs', 'Supplier', 'DeLaval, GEA, Lely — milking, cooling'],
                    ['Feed Suppliers', 'Input', 'TMR ingredients, supplements'],
                ]} />
                <H4>Regulatory Framework</H4>
                <Tbl heads={['Standard', 'Title', 'Scope']} rows={[
                    ['PMO (Grade A)', 'Pasteurized Milk Ordinance', 'Farm tank design, cooling, sanitation'],
                    ['EPA CAFO', '40 CFR 122.23', 'NPDES permit for 700+ cows, NMP'],
                    ['FDA 21 CFR 131', 'Milk Products', 'Standards of identity, labeling'],
                    ['OSHA General Duty', 'Clause 5(a)(1)', 'Confined space, H2S, machinery'],
                    ['NFPA 820', 'Wastewater Treatment', 'Biogas handling, digester safety'],
                    ['ISO 11784/85', 'Animal RFID', '134.2 kHz, HDX/FDX-B tags'],
                ]} />
            </S>
            <S n={2} t="High-Level Design" id="hld">
                <Ascii>{`┌─── MILKING ──────────────────────────────────────────┐
│ Parlor (80-stall rotary or 2x40 parallel)            │
│ → Milk meter → Filter → PHE pre-cool → Bulk tank     │
│ → CIP wash (acid/alkaline/sanitize) → Milk pickup    │
├─── MANURE / ENERGY ─────────────────────────────────┤
│ Flush/scrape → Separator → Anaerobic digester (CSTR) │
│ → Biogas → Generator (500 kW) or RNG upgrade          │
│ → Digestate → Lagoon → Field application              │
├─── FEED ────────────────────────────────────────────┤
│ Commodity bins → TMR mixer (vertical/horizontal)      │
│ → Feed lane delivery → Push-up bot → Refusals weigh  │
├─── HERD MANAGEMENT ─────────────────────────────────┤
│ RFID ear tag → Parlor ID → Activity/rumination collar │
│ → Herd software (PCDART, DairyComp, VAS)              │
└─────────────────────────────────────────────────────┘`}</Ascii>
            </S>
            <S n={3} t="Detailed Technical Description" id="tech">
                <H4>3.1 Milking Systems</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Rotary Parlor', '80-stall external', '80 cows/hr, 8-12 min rotation'],
                    ['Parallel Parlor', '2x40 swing-over', 'Quick-exit, 10-min cycle'],
                    ['Robotic Milker', 'Voluntary (Lely/DeLaval)', '2.8 milkings/cow/day, 60-70 cows/box'],
                    ['Milk Meter', 'Electromagnetic flow', 'per-quarter yield, +/-2%'],
                    ['Pulsator', 'Electronic, 60/40 ratio', '300 cycles/min, 12-14 psi vacuum'],
                    ['Vacuum Pump', 'Rotary vane/lobe', '28-35 CFM/unit, 12.5-13.5 in Hg'],
                ]} />
                <H4>3.2 Milk Cooling &amp; Storage</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Plate Heat Exchanger', '3-section', 'Milk 97F to 38F in 15 sec'],
                    ['Bulk Milk Tank', 'Vertical, 3A SSI', '5,000-30,000 gal, agitator, CIP'],
                    ['Glycol Chiller', 'Scroll/screw compressor', 'R-449A, 50-200 ton, 28F glycol'],
                    ['CIP System', '3-tank auto', '140F caustic, 120F acid, sanitize'],
                    ['Precooler', 'Well water plate', 'Save 40-60% refrigeration energy'],
                ]} />
                <H4>3.3 Manure Management &amp; Biogas</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Manure Scraper', 'Cable/hydraulic', 'Freestall alley, 6x/day'],
                    ['Separator', 'Screw press', 'Solids 28-35% TS, 200-500 GPM'],
                    ['Anaerobic Digester', 'CSTR, 100F', '15-25 day HRT, 1M-5M gal'],
                    ['Biogas Generator', 'CHP reciprocating', '500 kW-2 MW, 38% efficiency'],
                    ['RNG Upgrade', 'Membrane/PSA', '97% CH4, pipeline quality'],
                    ['Lagoon', 'Lined, HDPE', '90-180 day storage, EPA CAFO'],
                ]} />
                <H4>3.4 Feed Management / TMR</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['TMR Mixer', 'Vertical auger, 600-1200 cu ft', '30-50 ton batch, 4-6 min mix'],
                    ['Feed Delivery', 'Truck/conveyor', '6-8 feed-lane passes/day'],
                    ['Push-Up Robot', 'Autonomous (Lely Juno)', '24/7 feed access, GPS guided'],
                    ['Scale System', 'Load cell on mixer', '+/-0.5% accuracy, recipe mgmt'],
                ]} />
                <H4>3.5 Herd Health Monitoring</H4>
                <Tbl heads={['System', 'Technology', 'Specification']} rows={[
                    ['RFID Ear Tag', 'ISO 11784/85, 134.2 kHz', 'HDX, 15-digit NUES ID'],
                    ['Activity Collar', 'Accelerometer/rumination', 'SCR/Allflex, estrus detect 85-90%'],
                    ['Milk Conductivity', 'Per-quarter sensor', 'Mastitis detect, +/-1 mS/cm'],
                    ['Body Condition', '3D camera/LiDAR', 'BCS 1-5 scale, +/-0.25'],
                    ['Herd Software', 'PCDART/DairyComp/VAS', 'Breeding, health, production records'],
                ]} />
            </S>
            <S n={4} t="Process Diagrams" id="process">
                <H4>4.1 Milking Flow</H4>
                <Ascii>{`Cow arrives → RFID ID → Pre-dip/strip → Attach units → Milk
  → Meter → Filter → PHE pre-cool (97F→50F) → Glycol final cool
  → Bulk tank (38F) → CIP cycle → Milk tanker pickup (48 hr max)`}</Ascii>
                <H4>4.2 Manure to Energy</H4>
                <Ascii>{`Freestall scrape → Reception pit → Separator (solids→bedding)
  → Liquid to digester (100F, 20-day HRT) → Biogas (60% CH4)
  → CHP generator (500 kW) or RNG membrane → Grid/pipeline`}</Ascii>
                <H4>4.3 Feed Preparation</H4>
                <Ascii>{`Commodity bay → Loader → TMR mixer → Recipe scale check
  → Mix 5 min → Deliver to feed lane → Push-up bot → Refusals`}</Ascii>
            </S>
            <S n={5} t="Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2 italic">3,000-head dairy with rotary parlor and digester</p>
                <Tbl heads={['Equipment', 'Qty', 'Specification']} rows={[
                    ['Rotary Parlor', '1', '80-stall, external, DeLaval/GEA'],
                    ['Milk Meters', '80', 'Electromagnetic, per-quarter'],
                    ['Vacuum Pumps', '4', '30 CFM each, rotary vane'],
                    ['Plate Heat Exchanger', '1', '3-section, 400 GPM'],
                    ['Bulk Milk Tanks', '2', '15,000 gal each, 3A SSI'],
                    ['Glycol Chillers', '2', '100 ton, R-449A'],
                    ['CIP System', '1', '3-tank auto, 200 GPM'],
                    ['Manure Scrapers', '12', 'Cable, freestall alleys'],
                    ['Screw Press Separator', '2', '500 GPM, 30% TS'],
                    ['Anaerobic Digester', '1', '3M gal CSTR, 100F'],
                    ['Biogas Generator', '1', '750 kW CHP'],
                    ['TMR Mixers', '2', '900 cu ft, vertical auger'],
                    ['Feed Push-Up Robots', '3', 'Lely Juno, autonomous'],
                    ['RFID Ear Tags', '3,000', 'ISO 11784, 134.2 kHz'],
                    ['Activity Collars', '3,000', 'SCR/Allflex'],
                    ['Herd Software', '1', 'DairyComp 305, server'],
                    ['Freestall Fans', '120', '48-72 in, 0.5 HP, VFD'],
                    ['Emergency Generator', '1', '500 kW diesel, ATS'],
                    ['Lagoon', '1', '3M gal, HDPE lined'],
                ]} />
            </S>
            <S n={6} t="Purdue Model / ISA-95 Mapping" id="purdue">
                <Tbl heads={['Level', 'Function', 'Components', 'Protocols']} rows={[
                    ['L0', 'Sensing', 'Milk meters, RFID tags, temp sensors', '4-20 mA, ISO 11784'],
                    ['L1', 'Control', 'Parlor PLC, chiller controller, digester PLC', 'Modbus RTU, RS-485'],
                    ['L2', 'Supervisory', 'Parlor mgmt HMI, chiller SCADA', 'Modbus TCP, BACnet'],
                    ['L3', 'Operations', 'Herd software, DHIA, ration balancer', 'REST API, SQL'],
                    ['L3.5', 'DMZ', 'Farm firewall, cloud gateway', 'TLS 1.3, VPN'],
                    ['L4', 'Enterprise', 'Coop portal, ERP, milk market pricing', 'EDI, REST'],
                ]} />
            </S>
            <S n={7} t="Safety &amp; Supporting Systems" id="safety">
                <Tbl heads={['System', 'Standard', 'Specification']} rows={[
                    ['Manure Pit Gas', 'OSHA confined space', 'H2S/CH4/NH3 monitors, forced vent'],
                    ['Biogas Safety', 'NFPA 820', 'Flame arrestors, pressure relief, LEL'],
                    ['Electrical Safety', 'NFPA 70/NEC', 'Wet location GFCI, parlor bonding'],
                    ['Animal Handling', 'OSHA General Duty', 'Head gates, sort gates, non-slip'],
                    ['Ammonia (Refrig)', 'IIAR/ASHRAE 15', 'Leak detection, emergency vent'],
                    ['Drug Residue', 'PMO Appendix N', 'NCIMS testing, withholding periods'],
                ]} />
            </S>
            <S n={8} t="Communication Protocol Stack" id="protocols">
                <Ascii>{`Enterprise:  Coop portal │ DHIA cloud │ Milk market (FMMO)
Network:     Farm fiber/Wi-Fi │ Cellular 4G/5G │ LoRa (sensors)
Supervisory: Modbus TCP │ BACnet/IP │ MQTT (cloud telemetry)
Control:     Modbus RTU │ RS-485 │ 24V DC discrete
Field:       4-20 mA │ ISO 11784/85 RFID (134.2 kHz) │ BLE`}</Ascii>
            </S>
            <S n={9} t="Data Flow Architecture" id="data-flow">
                <Ascii>{`Field (L0)           Control (L1)       SCADA (L2)
Milk meter──4-20──►Parlor PLC──Mod───►Parlor HMI
RFID tag──134kHz──►Reader────────────►Herd software
Temp sensor──RTD──►Chiller ctrl──Mod─►SCADA / BMS
Digester──4-20────►Digester PLC──Mod─►Biogas HMI
                                       │ L3.5 DMZ
Operations (L3)        Enterprise (L4)
DairyComp◄───REST──►Coop milk portal
DHIA records◄──────►Genetic eval (CDCB)
Ration balancer◄───►Feed supplier portal`}</Ascii>
            </S>
            <S n={10} t="References" id="references">
                <Refs items={[
                    'FDA. (2023). Grade A Pasteurized Milk Ordinance (PMO). PHS/FDA.',
                    'EPA. (2022). 40 CFR 122.23: CAFO regulations. EPA.',
                    'ASABE. (2021). ASABE EP405.1: Milking parlor design. ASABE.',
                    'ISO. (2012). ISO 11784/11785: RFID of animals. ISO.',
                    'NFPA. (2020). NFPA 820: Fire protection in wastewater treatment.',
                    'NRC. (2021). Nutrient requirements of dairy cattle (8th ed.).',
                    'The Open Group. (2022). TOGAF Standard, Version 10.',
                    'DeLaval. (2023). Rotary milking parlor technical specs.',
                ]} />
            </S>
            <SeeAlso links={[
                { href: '/wiki/food-agriculture', label: 'Food & Agriculture Hub', color: '#84CC16' },
                { href: '/wiki/sectors/FOOD', label: 'Sector Overview', color: '#84CC16' },
                { href: '/wiki/food-agriculture/meatpacking', label: 'Meatpacking', color: '#EF4444' },
            ]} />
        </div>
    );
}
function S({ n, t, id, children }: { n: number; t: string; id: string; children: React.ReactNode }) {
    return (<section id={id} className="space-y-4"><h2 className="text-lg font-heading font-semibold text-white"><span className="text-[#22C55E] mr-2">{n}.</span>{t}</h2>{children}</section>);
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
