/**
 * Feed Mill Complex Deep-Dive Reference Architecture.
 * Receiving, grinding, batching, pelleting, bagging, loadout.
 * @module wiki/food-agriculture/feed-mill/page
 */
export const metadata = {
    title: 'Feed Mill Complex — Food & Agriculture Wiki',
    description: 'TOGAF reference architecture for commercial feed mills: grain receiving, hammer/roller mills, ISA-88 batching, pellet mills with steam conditioning, medication/micro-dosing, and bulk/bag loadout.',
};
export default function FeedMillPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #A855F7, #9333EA)' }}>🏭</div>
                    <div>
                        <span className="text-[10px] text-gray-500 font-mono block">FOOD-AG-FEED</span>
                        <h1 className="text-2xl font-heading font-bold text-white">Feed Mill Complex Reference Architecture</h1>
                    </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">TOGAF-based reference architecture for commercial feed mills (50-200+ TPH) covering grain receiving and storage, hammer and roller mills, ISA-88 micro-batching, pelleting with steam conditioning, medicated feed FDA compliance (21 CFR 225), NFPA 61/652 dust explosion prevention, and bulk/bag loadout.</p>
            </div>
            <S n={1} t="TOGAF Business Architecture" id="togaf">
                <H4>Stakeholder Map</H4>
                <Tbl heads={['Stakeholder', 'Role', 'Interest']} rows={[
                    ['Feed Companies', 'Owner/Operator', 'Cargill, Purina/Land O Lakes, ADM, Kent'],
                    ['FDA CVM', 'Regulatory', 'Medicated feeds 21 CFR 225/226, cGMP'],
                    ['AAFCO', 'Standards', 'Ingredient definitions, labels, guarantees'],
                    ['OSHA', 'Safety', 'Dust, confined space, machine guarding'],
                    ['EPA', 'Environmental', 'Dust emissions (NSPS), stormwater'],
                    ['Livestock Producers', 'Customer', 'Poultry, swine, cattle, aquaculture'],
                    ['Nutritionists', 'Formulation', 'Least-cost formulation, nutrient specs'],
                    ['Equipment OEMs', 'Supplier', 'CPM, Andritz, Buhler — pellet mills, grinders'],
                ]} />
                <H4>Regulatory Framework</H4>
                <Tbl heads={['Standard', 'Title', 'Scope']} rows={[
                    ['21 CFR 225', 'Medicated Feed cGMP', 'Assay, cross-contamination, records'],
                    ['21 CFR 226', 'Type A Medicated Articles', 'Drug premix manufacturing'],
                    ['AAFCO Model Bill', 'Feed Labeling', 'Guaranteed analysis, ingredients, claims'],
                    ['OSHA 29 CFR 1910.272', 'Grain Handling', 'Dust, hot work, bin entry'],
                    ['NFPA 61', 'Ag/Food Dust', 'Fire/explosion prevention, DHA'],
                    ['NFPA 652', 'Combustible Dust', 'Dust Hazard Analysis requirement'],
                    ['FSMA PCAF', 'Preventive Controls Animal Food', 'Hazard analysis, CCPs'],
                ]} />
            </S>
            <S n={2} t="High-Level Design" id="hld">
                <Ascii>{`┌─── RECEIVING & STORAGE ──────────────────────────────┐
│ Truck/rail dump → Bucket elevator → Distributor       │
│ → Raw ingredient bins (20-60, 50-500 ton each)        │
├─── GRINDING ────────────────────────────────────────┤
│ Bin draw → Hammer mill (400-2000 um) or roller mill   │
│ → Screening → Ground ingredient bins                   │
├─── BATCHING & MIXING ──────────────────────────────┤
│ Weigh hopper (batch) → Macro scale (bulk) → Micro     │
│ → Mixer (ribbon/paddle) 2-4 min → Liquid addition     │
│ → Fat coater → Mash or to pellet mill                  │
├─── PELLETING ───────────────────────────────────────┤
│ Conditioner (180-190F steam, 30 sec) → Pellet die     │
│ → Cooler (ambient, 10F above) → Crumbler (optional)   │
│ → Screen → Fines return → Finished bin                 │
├─── LOADOUT / BAGGING ───────────────────────────────┤
│ Bulk truck (25 ton) → Scale → Loadout spout           │
│ → Bagging (50 lb / 1 ton) → Palletize → Ship          │
└─────────────────────────────────────────────────────┘`}</Ascii>
            </S>
            <S n={3} t="Detailed Technical Description" id="tech">
                <H4>3.1 Receiving &amp; Grain Storage</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Truck Dump', 'Drive-over pit', '200-400 TPH, covered, dust control'],
                    ['Bucket Elevator', 'Centrifugal discharge', '10,000-40,000 BPH, 80-150 ft'],
                    ['Raw Bins', 'Steel/concrete', '20-60 bins, 50-500 ton each'],
                    ['Liquid Tanks', 'Fat, molasses, oil', '10,000-50,000 gal, heated, agitated'],
                    ['Micro Bins', 'Vitamin/mineral premix', '4-20 bins, 1-10 ton, screw discharge'],
                ]} />
                <H4>3.2 Grinding</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Hammer Mill', 'Full-screen, 200 HP', '50-100 TPH, 400-2000 um particle'],
                    ['Roller Mill', '2-pair corrugated', '30-80 TPH, uniform particle, low fines'],
                    ['Screener', 'Rotary/vibratory', 'Oversize return, 3 deck separation'],
                    ['Aspiration', 'Cyclone + baghouse', 'Hammer mill dust, NFPA 61'],
                    ['Magnet', 'Plate/grate, 12K gauss', 'Ferrous separation, product stream'],
                ]} />
                <H4>3.3 Batching &amp; Mixing</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Macro Scale', 'Batch weigh hopper', '4-8 ton, +/-0.1% accuracy'],
                    ['Micro Scale', 'Premix/medication', '0-500 lb, +/-0.01 lb, FDA 21 CFR 225'],
                    ['Mixer', 'Ribbon/paddle, 4-6 ton', 'CV <10% in 90-120 sec'],
                    ['Liquid Addition', 'Spray bar, in-mixer', 'Fat 2-8%, molasses 2-5%, enzymes'],
                    ['Batch Controller', 'ISA-88, PLC-based', 'Recipe management, lot tracking'],
                ]} />
                <H4>3.4 Pelleting</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Steam Conditioner', 'Single/double shaft', '180-190F, 30-45 sec retention'],
                    ['Pellet Mill', 'Ring die, 250-500 HP', '10-50 TPH, die 3/16-1/4 inch'],
                    ['Cooler', 'Counter-flow, ambient air', '10F above ambient, 12% moisture'],
                    ['Crumbler', 'Roller, adjustable gap', 'Chick starter, fine crumble'],
                    ['Screen/Sifter', 'Vibratory, 3-deck', 'Fines return to conditioner'],
                    ['Fat Coater', 'Post-pellet spray', 'Rotary drum, 1-3% added fat'],
                ]} />
                <H4>3.5 Loadout &amp; Bagging</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Bulk Loadout', 'Gravity spout, covered', '25 ton truck, dust-suppressed'],
                    ['Truck Scale', 'Load cell, 70 ft', '100,000 lb capacity, +/-20 lb'],
                    ['Bag Filler', 'Open-mouth/valve', '50 lb bags, 10-15 bags/min'],
                    ['Bulk Bag Filler', 'FIBC, 1 ton', '2-4 bags/hr, weigh-fill'],
                    ['Palletizer', 'Robotic/conventional', '50 lb bags, 4-6 layers/min'],
                ]} />
            </S>
            <S n={4} t="Process Diagrams" id="process">
                <H4>4.1 Feed Manufacturing Flow</H4>
                <Ascii>{`Raw bins → Grind (hammer/roller) → Ground bins → Batch weigh
  → Macro + micro scale → Mixer (120 sec) → Liquid spray
  → Mash out (or) → Conditioner → Pellet mill → Cooler
  → Crumble/screen → Finished bins → Loadout/bag`}</Ascii>
                <H4>4.2 Medicated Feed Protocol</H4>
                <Ascii>{`Vet prescription (VFD) → Recipe system → Micro scale + drug premix
  → Mix (FDA 21 CFR 225 CV <10%) → Flush/sequencing (10x drug)
  → Label: "Caution: medicated" → Lot trace record → Ship`}</Ascii>
                <H4>4.3 Pelleting Process</H4>
                <Ascii>{`Mash feed → Steam conditioner (185F, 30 sec, 16% moisture)
  → Ring die (250 HP, 3/16" holes) → Pellet → Cooler (10F above)
  → Crumbler (optional) → Screen → Fines return → Finished bin`}</Ascii>
            </S>
            <S n={5} t="Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2 italic">100 TPH commercial poultry/swine feed mill</p>
                <Tbl heads={['Equipment', 'Qty', 'Specification']} rows={[
                    ['Bucket Elevators', '8', '15,000-30,000 BPH, 80-120 ft'],
                    ['Raw Ingredient Bins', '40', '100-300 ton each, steel'],
                    ['Hammer Mills', '2', '200 HP, 50 TPH, full-screen'],
                    ['Roller Mill', '1', '2-pair, 40 TPH, corn'],
                    ['Batch Scales (Macro)', '3', '6 ton, +/-0.1%'],
                    ['Micro Scales', '2', '500 lb, +/-0.01 lb'],
                    ['Mixers', '2', 'Ribbon, 6 ton, 120 sec CV <10%'],
                    ['Pellet Mills', '3', '350 HP each, ring die'],
                    ['Steam Conditioners', '3', 'Single shaft, 185F'],
                    ['Counter-Flow Coolers', '3', '30 TPH, ambient air'],
                    ['Crumblers', '2', 'Adjustable gap rollers'],
                    ['Liquid Tanks', '6', 'Fat, molasses, 20,000 gal'],
                    ['Boiler', '1', '200 BHP, natural gas, 150 psi'],
                    ['Baghouse Collectors', '4', '15,000 CFM, pulse-jet'],
                    ['Explosion Vents', '20', 'NFPA 68, 0.5 psi Pred'],
                    ['PLC System', '1', 'AB ControlLogix, ISA-88 batch'],
                    ['VFDs', '25', '10-350 HP, 480V'],
                    ['Truck Scale', '1', '70 ft, 100,000 lb'],
                    ['Bagging Line', '1', '50 lb, 12 bags/min, palletizer'],
                    ['Emergency Generator', '1', '500 kW diesel, ATS'],
                ]} />
            </S>
            <S n={6} t="Purdue Model / ISA-95 Mapping" id="purdue">
                <Tbl heads={['Level', 'Function', 'Components', 'Protocols']} rows={[
                    ['L0', 'Sensing', 'Scales, temp probes, moisture, LEL, speed', '4-20 mA, load cell'],
                    ['L1', 'Control', 'Batch PLC (ISA-88), pellet mill ctrl, VFDs', 'EtherNet/IP, DeviceNet'],
                    ['L2', 'Supervisory', 'Batch HMI, SCADA, historian', 'OPC UA, Modbus TCP'],
                    ['L3', 'Operations', 'Formulation software, lot tracking, QC lab', 'SQL, REST API'],
                    ['L3.5', 'DMZ', 'IT/OT firewall, VPN, cloud backup', 'TLS 1.3, IPsec'],
                    ['L4', 'Enterprise', 'ERP (SAP/JDE), nutritionist portal, VFD portal', 'EDI, REST'],
                ]} />
            </S>
            <S n={7} t="Safety &amp; Supporting Systems" id="safety">
                <Tbl heads={['System', 'Standard', 'Specification']} rows={[
                    ['Dust Hazard Analysis', 'NFPA 652', 'DHA for all dust-producing equipment'],
                    ['Explosion Venting', 'NFPA 68', 'Legs, bins, dust collectors, grinders'],
                    ['Housekeeping', 'OSHA 1910.272', 'Dust <1/8 inch, priority areas schedule'],
                    ['Confined Space', 'OSHA 1910.146', 'Bin entry: lockout, atmosphere, attendant'],
                    ['Machine Guarding', 'OSHA 1910.212', 'Pellet mill, grinder, conveyor nip guards'],
                    ['Medicated Sequencing', 'FDA 21 CFR 225', 'Flush protocol, cross-contamination <1%'],
                ]} />
            </S>
            <S n={8} t="Communication Protocol Stack" id="protocols">
                <Ascii>{`Enterprise:  ERP (SAP) │ Nutritionist formulation │ FDA eLFD
Network:     Industrial Ethernet │ Fiber ring │ Cellular backup
Supervisory: OPC UA │ ISA-88 batch server │ Modbus TCP
Control:     EtherNet/IP │ DeviceNet │ 480V motor control
Field:       4-20 mA │ Load cell (mV/V) │ Speed sensor │ RS-485`}</Ascii>
            </S>
            <S n={9} t="Data Flow Architecture" id="data-flow">
                <Ascii>{`Field (L0)           Control (L1)       SCADA (L2)
Scale──mV/V───────►Batch PLC──EIP───►ISA-88 batch mgr
Temp──RTD─────────►Pellet PLC──EIP──►Process historian
LEL──4-20─────────►Safety PLC──EIP──►Alarm manager
Moisture──4-20────►Dryer PLC───EIP──►Quality trend
                                       │ L3.5 DMZ
Operations (L3)        Enterprise (L4)
Formulation SW◄─SQL──►ERP (SAP/JDE)
Lot tracking◄──REST──►FDA VFD portal
QC lab (LIMS)◄───────►Nutritionist portal`}</Ascii>
            </S>
            <S n={10} t="References" id="references">
                <Refs items={[
                    'FDA CVM. (2023). 21 CFR 225: Current good manufacturing practice for medicated feeds.',
                    'AAFCO. (2023). Official Publication: ingredient definitions and model regulations.',
                    'OSHA. (2023). 29 CFR 1910.272: Grain handling facilities. DOL.',
                    'NFPA. (2022). NFPA 61: Fire/dust explosion prevention in ag/food facilities.',
                    'ASAE. (2020). ASAE S269.5: Cubes, pellets, crumbles — definitions and methods.',
                    'CPM. (2023). Pellet mill equipment guide: ring die, conditioner, cooler. CPM.',
                    'The Open Group. (2022). TOGAF Standard, Version 10.',
                    'Fairfield, D. (2021). Feed manufacturing technology (6th ed.). AFIA.',
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
    return (<section id={id} className="space-y-4"><h2 className="text-lg font-heading font-semibold text-white"><span className="text-[#A855F7] mr-2">{n}.</span>{t}</h2>{children}</section>);
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
