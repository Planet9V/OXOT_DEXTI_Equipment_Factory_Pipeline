/**
 * Aluminum Smelter Deep-Dive Reference Architecture.
 * Hall-Héroult electrolysis, anode baking, fume treatment, casthouse.
 * @module wiki/critical-manufacturing/aluminum-smelter/page
 */
export const metadata = {
    title: 'Aluminum Smelter — Critical Manufacturing Wiki',
    description: 'TOGAF reference architecture for aluminum smelters: Hall-Héroult electrolytic reduction, potline (100-500 cells at 960°C), anode baking, fume treatment center, and casthouse with rolling/extrusion.',
};
export default function AluminumSmelterPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)' }}>⚡</div>
                    <div>
                        <span className="text-[10px] text-gray-500 font-mono block">CMAN-PM-ALUM</span>
                        <h1 className="text-2xl font-heading font-bold text-white">Aluminum Smelter Reference Architecture</h1>
                    </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">TOGAF-based reference architecture for primary aluminum smelters (100,000–600,000 TPA) covering Hall-Héroult electrolytic reduction (100–500 pots, 300–600 kA, 960°C), anode baking furnaces, fume treatment centers (FTC), cast house operations, and energy management for the most electricity-intensive industrial process (13–16 kWh/kg Al).</p>
            </div>
            <S n={1} t="TOGAF Business Architecture" id="togaf">
                <H4>Stakeholder Map</H4>
                <Tbl heads={['Stakeholder', 'Role', 'Interest']} rows={[
                    ['Aluminum Producers', 'Owner/Operator', 'Alcoa, Rio Tinto, Norsk Hydro, EGA, Rusal'],
                    ['DHS/CISA', 'SRMA', 'Critical manufacturing sector risk management'],
                    ['OSHA', 'Safety', '29 CFR 1910.1000 (PEL for fluorides), heat stress, molten metal'],
                    ['EPA', 'Environmental', '40 CFR 63 Subpart LL (primary aluminum MACT), fluoride limits'],
                    ['DOE', 'Energy', 'Electricity supply contracts, grid reliability'],
                    ['IAI', 'Industry', 'International Aluminium Institute — sustainability, technology'],
                    ['Equipment OEMs', 'Supplier', 'ECL (potline), Outotec (FTC), Hycast (casting)'],
                    ['Automotive/Aero', 'Customer', 'Sheet, extrusion, forging stock'],
                ]} />
                <H4>Regulatory Framework</H4>
                <Tbl heads={['Standard', 'Title', 'Scope']} rows={[
                    ['EPA 40 CFR 63 LL', 'Primary Aluminum MACT', 'Fluoride emission limits (0.95 kg HF/t Al)'],
                    ['OSHA 1910.1000', 'Air Contaminants PEL', 'Fluoride dust 2.5 mg/m³, alumina dust 10 mg/m³'],
                    ['NFPA 484', 'Combustible Metals', 'Aluminum dust explosion prevention'],
                    ['ISO 14001', 'Environmental Management', 'Smelter EMS, carbon footprint'],
                    ['IEC 62443', 'Industrial Cybersecurity', 'Potline control, rectifier protection'],
                    ['ISO 9001', 'Quality Management', 'Metal quality, alloy composition control'],
                ]} />
            </S>
            <S n={2} t="High-Level Design" id="hld">
                <Ascii>{`┌─── RAW MATERIALS ──────────────────────────────────────┐
│ Alumina (Al₂O₃) from Bayer process → Silo storage      │
│ Carbon anodes → Baked in ring furnace (1100°C)           │
│ Cryolite bath (Na₃AlF₆) → Electrolyte management        │
├─── POTLINE (Electrolysis) ────────────────────────────┤
│ 100-500 reduction cells in series (300-600 kA)           │
│ → 960°C bath → Al₂O₃ dissolved → Al deposited at cathode│
│ → CO₂ evolved at anode → Tapped every 24-48 hrs         │
│ → Molten aluminum (~1 t/pot/day) → Crucible to casthouse │
├─── FUME TREATMENT CENTER ─────────────────────────────┤
│ Pot exhaust → Dry scrubber (alumina bed) → Bag filter    │
│ → Fluoride recovery → Enriched alumina → Back to pots   │
│ → Stack emission: <0.4 kg HF/t Al                        │
├─── CASTHOUSE ──────────────────────────────────────────┤
│ Crucible → Holding furnace (750°C) → Degassing (Ar/Cl₂) │
│ → In-line filter → DC casting (slab/billet/T-bar)        │
│ → Sawing → Homogenizing → Ship or roll/extrude           │
└────────────────────────────────────────────────────────┘`}</Ascii>
            </S>
            <S n={3} t="Detailed Technical Description" id="tech">
                <H4>3.1 Potline (Electrolytic Reduction)</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Reduction Cell (Pot)', 'Prebake, point-feed', '300-600 kA, 4.0-4.3 V, 960°C, carbon-lined'],
                    ['Rectifier/Transformer', 'Silicon-controlled', '200-400 MW per potline, 6/12-pulse'],
                    ['Alumina Feeder', 'Point-feed, pneumatic', '4-6 feeders/pot, 50-80 kg/feed, 2-4 min cycle'],
                    ['Anode Change Crane', 'Overhead, automated', '2-4 anodes/pot/week, 800-1,200 kg each'],
                    ['Bath Temperature', 'Thermocouple (Type K)', '960±5°C, continuous monitoring'],
                    ['Pot Tending Machine', 'Multi-function crane', 'Crust break, anode set, tapping, bath sampling'],
                ]} />
                <H4>3.2 Anode Production</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Paste Plant', 'Mixing, vibrocompactor', 'Coke + pitch, 150°C mixing, 30 t/hr'],
                    ['Ring Furnace', 'Open-flue, regenerative', '1,100°C baking, 14-21 day cycle, 50,000 TPA'],
                    ['Rodding Shop', 'Anode rod attach', 'Cast iron pour, bi-metallic connection'],
                    ['Butt Cleaning', 'Shot blast, recycling', 'Spent anode butts → crusher → paste plant'],
                ]} />
                <H4>3.3 Fume Treatment Center (FTC)</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Dry Scrubber', 'Alumina injection reactor', '99%+ HF capture, fluidized bed, 500,000 m³/hr'],
                    ['Bag Filter', 'Pulse-jet, PTFE bags', '<5 mg/Nm³ particulate, 2,000-20,000 bags'],
                    ['Enriched Alumina', 'Fluoride-loaded', '2-3% F content, recycled to pots'],
                    ['Stack Monitoring', 'CEMS, laser', 'HF <0.4 kg/t Al, SO₂, particulate'],
                ]} />
                <H4>3.4 Casthouse</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Holding Furnace', 'Gas-fired, tilting', '50-100 t, 750°C, Ar/Cl₂ fluxing'],
                    ['Degasser', 'In-line rotary (SNIF)', 'H₂ removal < 0.1 mL/100g, Ar + Cl₂'],
                    ['CFF Filter', 'Ceramic foam', '30-50 ppi, inclusion removal'],
                    ['DC Caster', 'Semi-continuous, vertical', 'Slab (600x1800 mm), billet (178-406 mm)'],
                    ['Homogenizer', 'Walking beam furnace', '480-580°C, 6-24 hr, precipitation control'],
                ]} />
            </S>
            <S n={4} t="Process Diagrams" id="process">
                <H4>4.1 Electrolysis Flow</H4>
                <Ascii>{`Alumina silo → Pneumatic feed → Pot (960°C, 300-600 kA)
→ Al deposited on cathode → Tap (vacuum crucible) → Casthouse
→ CO₂ at anode → Pot exhaust → FTC dry scrubber → Stack`}</Ascii>
                <H4>4.2 Energy Flow</H4>
                <Ascii>{`Grid (230-500 kV) → Substation → Rectifier (6/12-pulse)
→ DC busbar (300-600 kA, 800-1600 V total) → Pots in series
→ 13-16 kWh/kg Al → Typical smelter: 200-800 MW continuous`}</Ascii>
                <H4>4.3 Anode Cycle</H4>
                <Ascii>{`Petroleum coke + coal tar pitch → Paste plant (150°C mix)
→ Vibrocompactor (green anode) → Ring furnace (1100°C, 21 days)
→ Rodding shop (steel rod) → Set in pot → Consume (21-28 days)
→ Spent butt → Clean → Crush → Recycle to paste plant`}</Ascii>
            </S>
            <S n={5} t="Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2 italic">~300,000 TPA smelter (2 potlines, 250 pots each)</p>
                <Tbl heads={['Equipment', 'Qty', 'Specification']} rows={[
                    ['Reduction Cells', '500', '400 kA, prebake, point-feed'],
                    ['Rectifier Transformers', '4', '250 MVA each, 6/12-pulse, oil-cooled'],
                    ['Alumina Feeders', '2,500', '5 per pot, pneumatic, 80 kg/batch'],
                    ['Pot Tending Machines', '6', 'Multi-function, overhead rail'],
                    ['Anode Change Cranes', '4', '10 t, semi-automated'],
                    ['Ring Furnace', '2', '50,000 TPA each, 1,100°C, open-flue'],
                    ['Paste Plant', '1', '30 t/hr, vibrocompactor'],
                    ['FTC Dry Scrubbers', '4', '500,000 m³/hr each, 99%+ HF capture'],
                    ['Bag Filters', '4', '5,000 bags each, PTFE, pulse-jet'],
                    ['Holding Furnaces', '4', '80 t each, 750°C, tilting'],
                    ['SNIF Degassers', '2', 'In-line rotary, Ar/Cl₂'],
                    ['DC Casters', '3', 'Slab: 600x1800, billet: 178-406 mm'],
                    ['Homogenizing Furnaces', '2', 'Walking beam, 580°C, 24 hr'],
                    ['Alumina Silos', '8', '5,000 t each, pneumatic discharge'],
                    ['Potline PLC System', '2', 'ABB AC800M / Siemens PCS 7, per potline'],
                    ['SCADA/HMI', '1', 'Wonderware, 30,000+ tags'],
                    ['Energy Management', '1', 'Real-time load, 200-800 MW trending'],
                    ['CEMS Analyzers', '4', 'HF, SO₂, particulate, continuous'],
                    ['Overhead Cranes', '10', 'Casthouse, 50-100 t capacity'],
                    ['Emergency Generator', '2', '3 MW diesel, pot freeze prevention'],
                ]} />
            </S>
            <S n={6} t="Purdue Model / ISA-95 Mapping" id="purdue">
                <Tbl heads={['Level', 'Function', 'Components', 'Protocols']} rows={[
                    ['L0', 'Sensing', 'Pot voltage (mV), bath temp (Type K), anode current, HF CEMS', '4-20 mA, HART, RS-485'],
                    ['L1', 'Control', 'Pot controller (feed timing, anode effect), rectifier ctrl', 'Profibus DP, Profinet'],
                    ['L2', 'Supervisory', 'Potline SCADA, FTC control, casthouse HMI', 'OPC UA, Modbus TCP'],
                    ['L3', 'Operations', 'Production scheduling, energy management, quality (spectrometer)', 'SQL, REST API'],
                    ['L3.5', 'DMZ', 'IT/OT firewall, historian relay, OPC gateway', 'TLS 1.3, VPN'],
                    ['L4', 'Enterprise', 'ERP (SAP), commodity trading (LME), customer portal', 'EDI, HTTPS, IDoc'],
                ]} />
            </S>
            <S n={7} t="Safety &amp; Supporting Systems" id="safety">
                <Tbl heads={['System', 'Standard', 'Specification']} rows={[
                    ['Fluoride Monitoring', 'OSHA PEL 2.5 mg/m³', 'Area monitors, personal samplers, FTC interlock'],
                    ['Molten Metal Safety', 'AIST/IAI', 'Crucible transport interlocks, water exclusion zones'],
                    ['Dust Explosion', 'NFPA 484', 'Aluminum dust <60 µm, housekeeping, suppression'],
                    ['Electrical Safety', 'NFPA 70E', 'DC potline: 800-1600 V, arc flash PPE Category 4'],
                    ['Heat Stress', 'OSHA TLV', 'Wet bulb globe temp, hydration stations, work/rest cycles'],
                    ['Emergency Power', 'Critical loads', 'Pot freeze prevention: <4 hr without power'],
                ]} />
            </S>
            <S n={8} t="Communication Protocol Stack" id="protocols">
                <Ascii>{`Enterprise:  SAP ERP │ LME commodity feed │ Customer quality portal
Application: OPC UA │ SQL │ REST API │ Energy management
Network:     Industrial Ethernet 10 Gbps │ Fiber ring │ EMI-hardened
Supervisory: Profinet │ Modbus TCP │ SCADA proprietary
Control:     Profibus DP │ HART │ Pot controller serial (RS-485)
Field:       4-20 mA │ Pot mV (voltage drop) │ Type K T/C │ Load cell`}</Ascii>
            </S>
            <S n={9} t="Data Flow Architecture" id="data-flow">
                <Ascii>{`Field (L0)           Control (L1)       SCADA (L2)
Pot voltage──mV───►Pot ctrl──Profibus──►Potline SCADA
Bath temp──4-20───►Pot ctrl──Profinet──►Process historian
HF CEMS──RS485────►FTC PLC───Profinet──►Emission dashboard
Anode current──CT─►Rectifier ctrl─────►Energy mgmt
                                       │ L3.5 DMZ
Operations (L3)        Enterprise (L4)
Production sched◄─SQL──►SAP ERP
Energy mgmt◄──REST────►Grid operator ISO
Quality (OES)◄────────►Customer cert portal`}</Ascii>
            </S>
            <S n={10} t="References" id="references">
                <Refs items={[
                    'Grjotheim, K., & Kvande, H. (2019). Introduction to Aluminium Electrolysis (3rd ed.). Aluminium Verlag.',
                    'IAI. (2023). Aluminium Smelting Technology Roadmap. International Aluminium Institute.',
                    'EPA. (2022). 40 CFR 63 Subpart LL: Primary Aluminum MACT. EPA.',
                    'OSHA. (2023). 29 CFR 1910.1000: Air Contaminants. DOL.',
                    'NFPA. (2022). NFPA 484: Standard for Combustible Metals. NFPA.',
                    'Tabereaux, A., & Peterson, R. (2014). Aluminum Production. In Treatise on Process Metallurgy (Vol. 3). Elsevier.',
                    'The Open Group. (2022). TOGAF Standard, Version 10.',
                    'ABB. (2023). Potline Control Systems Reference Guide. ABB.',
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
