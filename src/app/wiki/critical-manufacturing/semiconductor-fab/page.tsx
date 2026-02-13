/**
 * Semiconductor Fabrication Facility Deep-Dive Reference Architecture.
 * ISO 5 cleanroom, EUV/DUV lithography, etch, deposition, CMP, AMHS.
 * @module wiki/critical-manufacturing/semiconductor-fab/page
 */
export const metadata = {
    title: 'Semiconductor Fab — Critical Manufacturing Wiki',
    description: 'TOGAF reference architecture for semiconductor fabs: ISO 5 cleanroom, EUV/DUV lithography, plasma etch, CVD/PVD/ALD deposition, CMP, AMHS/OHT, SECS/GEM automation, APC/FDC.',
};
export default function SemiconductorFabPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)' }}>🔬</div>
                    <div>
                        <span className="text-[10px] text-gray-500 font-mono block">CMAN-EE-FAB</span>
                        <h1 className="text-2xl font-heading font-bold text-white">Semiconductor Fabrication Facility Reference Architecture</h1>
                    </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">TOGAF-based reference architecture for semiconductor fabs (300mm, 3–28 nm nodes, 30,000–100,000+ WPM) covering ISO 5 cleanroom operations, EUV/DUV lithography (ASML NXE:3400/TWINSCAN), plasma etch (Lam Research), CVD/PVD/ALD deposition (Applied Materials), CMP (Ebara), AMHS/OHT wafer transport, and SEMI E-series (SECS/GEM, GEM300) factory automation with APC and FDC.</p>
            </div>
            <S n={1} t="TOGAF Business Architecture" id="togaf">
                <H4>Stakeholder Map</H4>
                <Tbl heads={['Stakeholder', 'Role', 'Interest']} rows={[
                    ['Foundries/IDM', 'Owner/Operator', 'TSMC, Samsung, Intel, GlobalFoundries, SK hynix'],
                    ['DHS/CISA', 'SRMA', 'Semiconductor supply chain, CHIPS Act oversight'],
                    ['SEMI', 'Standards Body', 'E-series (SECS/GEM), S-series (safety), environmental'],
                    ['OSHA', 'Safety', '29 CFR 1910.1000 (PEL toxic gases), 1910.1200 (GHS)'],
                    ['EPA', 'Environmental', '40 CFR 68 (RMP for HF/NH3/silane), PFAS regulation'],
                    ['Equipment OEMs', 'Supplier', 'ASML, Lam Research, Applied Materials, KLA, TEL, Ebara'],
                    ['EDA Vendors', 'Design', 'Synopsys, Cadence, Siemens EDA — design-to-manufacturing'],
                    ['Fabless Customers', 'End User', 'Apple, NVIDIA, Qualcomm, AMD, MediaTek'],
                ]} />
                <H4>Regulatory Framework</H4>
                <Tbl heads={['Standard', 'Title', 'Scope']} rows={[
                    ['SEMI S2', 'Environmental & Safety', 'Equipment safety guidelines for fab tools'],
                    ['SEMI S8', 'Safety Ergonomics', 'Ergonomic guidelines for equipment operation'],
                    ['ISO 14644', 'Cleanroom Classification', 'ISO Class 1-5 particle counts per m³'],
                    ['NFPA 318', 'Cleanroom Fire Protection', 'Suppression, detection, HVAC shutdown'],
                    ['OSHA 1910.1000', 'Air Contaminants PEL', 'AsH3 50 ppb, PH3 300 ppb, SiH4 pyrophoric'],
                    ['EPA 40 CFR 68', 'Risk Management Plan', 'HF, NH3, chlorine — threshold quantities'],
                    ['ITAR/EAR', 'Export Control', 'Advanced node equipment, foundry IP protection'],
                ]} />
            </S>
            <S n={2} t="High-Level Design" id="hld">
                <Ascii>{`┌─── CLEANROOM (ISO 5, 20±0.5°C, 45±5% RH) ────────────┐
│ AMHS: Overhead Hoist Transport (OHT) — 300mm FOUP       │
│                                                           │
│ ┌─LITHO BAY──┐  ┌─ETCH BAY──┐  ┌─DEPO BAY──┐           │
│ │ EUV/DUV    │  │ Dielectric │  │ CVD/ALD   │           │
│ │ Coat/Dev   │  │ Metal etch │  │ PVD/sputter│           │
│ │ Track      │  │ Strip/ash  │  │ Epi/oxidn  │           │
│ └────────────┘  └───────────┘  └───────────┘            │
│ ┌─CMP BAY──┐   ┌─IMPLANT──┐   ┌─METROLOGY──┐           │
│ │ Oxide CMP │   │ Hi-energy│   │ CD-SEM     │           │
│ │ Metal CMP │   │ Med-curr │   │ Overlay    │           │
│ │ Post-clean│   │ Anneal   │   │ Defect insp│           │
│ └───────────┘   └─────────┘   └────────────┘            │
├─── SUB-FAB (Utility Level) ───────────────────────────┤
│ UPW (18.2 MΩ·cm) │ CDA │ Bulk gas (N₂, Ar, O₂, He)   │
│ Specialty gas │ Vacuum │ PCW │ Exhaust/scrubbing        │
├─── BACKEND ────────────────────────────────────────────┤
│ Wafer probe/test → Dicing → Die attach → Wire bond      │
│ → Molding → Trim/form → Final test → Pack/ship           │
└────────────────────────────────────────────────────────┘`}</Ascii>
            </S>
            <S n={3} t="Detailed Technical Description" id="tech">
                <H4>3.1 Lithography</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['EUV Scanner', 'ASML NXE:3600D', '185+ WPH, 13.5 nm wavelength, NA 0.33, 3 nm node'],
                    ['DUV Immersion', 'ASML TWINSCAN NXT:2050', '275+ WPH, 193 nm ArF, NA 1.35, multi-patterning'],
                    ['Coat/Develop Track', 'TEL CLEAN TRACK ACT™12', '300mm, 250+ WPH, CDU <0.3 nm 3σ'],
                    ['Pellicle', 'EUV-specific', 'CNT membrane, >90% transmission, particle protection'],
                    ['Mask/Reticle', 'EUV multilayer', 'Mo/Si 40-pair, defect-free, $300K+ each'],
                ]} />
                <H4>3.2 Etch &amp; Strip</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['Conductor Etch', 'Lam Kiyo®', 'CCP/ICP, 2-300 MHz, <2 nm CD control'],
                    ['Dielectric Etch', 'Lam Flex®', 'HAR etch, 50:1 aspect ratio, C₄F₈/Ar/O₂'],
                    ['Atomic Layer Etch', 'TEL Tactras™', 'Self-limiting, 0.3-0.5 Å/cycle, isotropic/aniso'],
                    ['Ash/Strip', 'Mattson/PSK', 'O₂ plasma, 200°C, resist/residue removal'],
                ]} />
                <H4>3.3 Deposition</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['PECVD', 'Applied Materials Producer®', 'SiO₂, SiN, low-k, 200-400°C, 50-200 Å/min'],
                    ['ALD', 'ASM Pulsar®', 'HfO₂, Al₂O₃, TiN, 0.5-1.0 Å/cycle, 250-400°C'],
                    ['PVD/Sputter', 'Applied Endura®', 'Cu/Ta/TaN barrier-seed, iPVD, 300mm'],
                    ['ECD (Electroplating)', 'Lam SABRE®', 'Cu fill, 2-5 A/dm², void-free, damascene'],
                    ['Epitaxy', 'Applied Centura®', 'Si/SiGe epi, 500-900°C, selective growth'],
                ]} />
                <H4>3.4 CMP (Chemical Mechanical Planarization)</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['CMP Tool', 'Ebara FREX™', '3-platen, 200-500 Å/min, Cu/oxide/barrier'],
                    ['Slurry Supply', 'Centralized, temperature controlled', '30-50 L/min/tool, silica/ceria/alumina'],
                    ['Post-CMP Clean', 'Brush/megasonic', 'Particle <10/wafer, chemical rinse/dry'],
                    ['Endpoint Detection', 'Eddy current / optical', 'Real-time thickness, ±5 Å uniformity'],
                ]} />
                <H4>3.5 Metrology &amp; Inspection</H4>
                <Tbl heads={['Equipment', 'Type', 'Specification']} rows={[
                    ['CD-SEM', 'Hitachi CG6300', '0.5 nm repeatability, in-line, 300mm'],
                    ['Overlay', 'KLA ATL™', '<0.3 nm precision, scanner-specific correction'],
                    ['Defect Inspection', 'KLA 3930', 'Broadband plasma, 15 nm sensitivity, 120 WPH'],
                    ['OCD/Scatterometry', 'Nova NCG+', 'Film thickness, CD, profile, non-destructive'],
                    ['E-beam Review', 'Applied SEMVision™ G7', 'Defect review, 3D imaging, root cause'],
                ]} />
            </S>
            <S n={4} t="Process Diagrams" id="process">
                <H4>4.1 Wafer Flow (Simplified FEOL/BEOL)</H4>
                <Ascii>{`Bare wafer → Oxidation → Litho → Etch → Implant → Anneal
  (repeat 30-60 mask layers for FEOL transistor formation)
→ PMD → Contact etch → Metallization (M1-M15):
  Litho → Etch trench → Barrier PVD → Cu ECD → CMP (repeat)
→ Passivation → Pad open → Probe/test → Dice → Package`}</Ascii>
                <H4>4.2 AMHS Flow</H4>
                <Ascii>{`FOUP at stocker → OHT pickup → Rail to tool port → Load
→ Process (multi-chamber) → Unload → OHT → Next tool
→ 300+ moves/lot, ~500 process steps, 2-3 month cycle time
→ OHT: 200+ vehicles, 10 km+ rail, 20,000+ moves/day`}</Ascii>
                <H4>4.3 APC/FDC Loop</H4>
                <Ascii>{`Run-to-run APC: Metrology → Model → Adjust recipe offset
FDC: Real-time sensor → Statistical model → Fault alarm
  → Auto-inhibit tool → Engineer review → Corrective action
  → Yield improvement: 0.5-2% per APC deployment`}</Ascii>
            </S>
            <S n={5} t="Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2 italic">~50,000 WPM, 5 nm node, 300mm fab</p>
                <Tbl heads={['Equipment', 'Qty', 'Specification']} rows={[
                    ['EUV Scanners', '10-15', 'ASML NXE:3600D, $150M+ each'],
                    ['DUV Immersion Scanners', '15-20', 'ASML NXT:2050, 275 WPH'],
                    ['Coat/Develop Tracks', '20-25', 'TEL ACT12, 300mm'],
                    ['Etch Chambers', '80-120', 'Lam/TEL, conductor/dielectric/ALE'],
                    ['CVD/ALD Chambers', '60-80', 'Applied/ASM, PECVD/ALD/LPCVD'],
                    ['PVD Chambers', '30-40', 'Applied Endura, barrier-seed'],
                    ['ECD/Plating', '15-20', 'Lam SABRE, Cu damascene'],
                    ['CMP Tools', '20-30', 'Ebara FREX, 3-platen'],
                    ['Ion Implanters', '10-15', 'Applied VIISta, high-energy/medium-current'],
                    ['Furnace/Anneal', '15-20', 'TEL TELINDY, RTP/batch, 1000°C'],
                    ['Wet Bench/Clean', '30-40', 'SCREEN, SPM/SC1/SC2/HF'],
                    ['CD-SEM', '10-15', 'Hitachi, 0.5 nm repeatability'],
                    ['Defect Inspection', '8-12', 'KLA 3930, broadband plasma'],
                    ['Overlay', '8-10', 'KLA ATL, <0.3 nm precision'],
                    ['OHT Vehicles', '200-300', 'Murata/Daifuku, 300mm FOUP'],
                    ['UPW System', '1', '18.2 MΩ·cm, 2,000+ GPM'],
                    ['Bulk Gas System', '1', 'N₂ (on-site), Ar, O₂, He'],
                    ['Exhaust/Scrubber', '1', 'Point-of-use + central, burn/wet'],
                    ['MES', '1', 'Applied SmartFactory, Camstar, SECS/GEM'],
                    ['Yield Management', '1', 'KLA Klarity, PDF Solutions'],
                ]} />
            </S>
            <S n={6} t="Purdue Model / ISA-95 Mapping" id="purdue">
                <Tbl heads={['Level', 'Function', 'Components', 'Protocols']} rows={[
                    ['L0', 'Sensing', 'MFC (gas flow, 0-500 sccm), RF power, chamber pressure (0.1-760 Torr), wafer temp', 'Analog 4-20 mA, RS-485, EtherCAT'],
                    ['L1', 'Control', 'Tool controllers (embedded PLC/PC), chamber sequencer', 'SECS-II (RS-232), HSMS (TCP/IP), EtherCAT'],
                    ['L2', 'Supervisory', 'FDC (fault detection), APC (run-to-run), recipe management', 'GEM300 (E40/E87/E90/E94), OPC UA'],
                    ['L3', 'Operations', 'MES (lot tracking, dispatching), yield management, WIP', 'EDA/Interface A (E120/E125/E132), MQTT'],
                    ['L3.5', 'DMZ', 'Protocol converter (SECS→OPC UA), data warehouse gateway', 'TLS 1.3, IPsec'],
                    ['L4', 'Enterprise', 'ERP, PLM, yield portal, customer WIP visibility', 'REST, HTTPS, EDI'],
                ]} />
            </S>
            <S n={7} t="Safety &amp; Supporting Systems" id="safety">
                <H4>7.1 Safety Systems</H4>
                <Tbl heads={['System', 'Standard', 'Specification']} rows={[
                    ['Toxic Gas Monitoring', 'OSHA PEL', 'AsH3 50 ppb, PH3 300 ppb, B₂H₆ 100 ppb — TWA'],
                    ['Pyrophoric Gas', 'SEMI S2', 'SiH4 auto-ignition controls, double-valve, flow-limiting'],
                    ['Seismic Protection', 'IBC/ASCE 7', 'EUV active isolation (0.1 Hz), tool anchor, FOUP retention'],
                    ['Cleanroom Fire', 'NFPA 318', 'VESDA early warning, FM-200/Novec, sprinkler'],
                    ['Chemical Safety', 'SEMI S2/S10', 'Gas cabinet N₂ purge, double-contained piping, GMS'],
                    ['EMO/Abort', 'SEMI S2 §9', 'Equipment panic, chamber vent, N₂ purge sequence'],
                ]} />
                <H4>7.2 Fab Supporting Systems</H4>
                <Tbl heads={['System', 'Specification', 'Capacity']} rows={[
                    ['UPW (Ultrapure Water)', '18.2 MΩ·cm, <1 ppb TOC, <1 particle/mL', '2,000-4,000 GPM'],
                    ['Bulk Gas (N₂)', 'On-site ASU/PSA, 99.9999% purity', '50,000-200,000 Nm³/hr'],
                    ['CDA', 'Class 0 (ISO 8573-1), -70°C dewpoint', '10,000-30,000 CFM'],
                    ['PCW', 'Process cooling 18±0.5°C, 5,000+ GPM', '30-100 MW heat rejection'],
                    ['Exhaust/Scrub', 'Point-of-use burn box + central wet scrub', '100,000+ CFM per fab'],
                    ['Electrical', 'Dual-feed 138/230 kV, 100-200 MW per fab', '99.9999% uptime target'],
                ]} />
            </S>
            <S n={8} t="Communication Protocol Stack" id="protocols">
                <Ascii>{`Enterprise:  ERP │ PLM │ Yield portal │ Customer WIP │ Design collab
Application: OPC UA │ EDA/Interface A │ REST/GraphQL │ MQTT (Sparkplug)
Network:     10/40 Gbps Ethernet │ Fiber backbone │ Redundant core
Supervisory: GEM300 (E40/E87/E90) │ OPC UA (PubSub) │ FDC real-time
Control:     SECS-II/HSMS │ EtherCAT │ Tool vendor proprietary
Field:       RS-232/485 │ Analog 4-20 mA │ MFC digital │ Sensor I/O`}</Ascii>
            </S>
            <S n={9} t="Data Flow Architecture" id="data-flow">
                <Ascii>{`Field (L0)          Control (L1)       APC/FDC (L2)
MFC gas flow──────►Tool ctrl──SECS──►FDC (real-time SPC)
RF power──sensor──►Chamber seq─────►APC (run-to-run model)
Wafer temp────────►Endpoint detect──►Recipe offset adjust
Metrology (CD)────►Feedback─────────►R2R controller
                                      │ L3.5 DMZ
Operations (L3)         Enterprise (L4)
MES lot tracking◄─E120──►ERP (SAP)
Yield mgmt◄──EDA────────►Customer portal (WIP)
Dispatch/schedule◄───────►Capacity planning`}</Ascii>
            </S>
            <S n={10} t="References" id="references">
                <Refs items={[
                    'SEMI. (2023). SEMI S2-0717: Safety Guidelines for Semiconductor Manufacturing Equipment. SEMI.',
                    'SEMI. (2023). SEMI E-Series: Equipment Communication Standards (E5/E30/E37/E40/E87/E90/E94). SEMI.',
                    'Mack, C. (2021). Fundamental Principles of Optical Lithography (2nd ed.). Wiley.',
                    'Campbell, S. (2013). Fabrication Engineering at the Micro and Nanoscale (4th ed.). Oxford.',
                    'NFPA. (2022). NFPA 318: Standard for the Protection of Semiconductor Fabrication Facilities. NFPA.',
                    'The Open Group. (2022). TOGAF Standard, Version 10.',
                    'ASML. (2024). EUV Lithography Technology Overview.',
                    'Lam Research. (2023). Etch Technology Reference Guide.',
                ]} />
            </S>
            <SeeAlso links={[
                { href: '/wiki/critical-manufacturing', label: 'Critical Manufacturing Hub', color: '#F97316' },
                { href: '/wiki/sectors/MANU', label: 'Sector Overview', color: '#F97316' },
                { href: '/wiki/critical-manufacturing/transformer-factory', label: 'Power Transformer Factory', color: '#EC4899' },
            ]} />
        </div>
    );
}
function S({ n, t, id, children }: { n: number; t: string; id: string; children: React.ReactNode }) {
    return (<section id={id} className="space-y-4"><h2 className="text-lg font-heading font-semibold text-white"><span className="text-[#8B5CF6] mr-2">{n}.</span>{t}</h2>{children}</section>);
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
