/**
 * Tailings Storage Facility — Deep Dive Wiki Article.
 * Mine tailings dam with GISTM 2020, InSAR, paste thickeners, TARP.
 * @module wiki/dams/tailings-facility/page
 */
export const metadata = { title: 'Tailings Storage Facility — DAMS Deep Dive', description: 'TOGAF reference architecture for mine tailings dams: upstream/centerline embankment, paste thickeners, InSAR monitoring, GISTM 2020 compliance.' };

const C = '#F59E0B';
export default function TailingsFacilityPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <header className="space-y-3">
                <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]" style={{ background: C }} /><span className="text-xs font-mono text-gray-500">DAMS · MINE TAILINGS · TSF</span></div>
                <h1 className="text-3xl font-heading font-bold text-white">Tailings Storage Facility</h1>
                <p className="text-sm text-gray-400 max-w-3xl">Engineered tailings dam (100M-tonne capacity) with upstream/centerline embankment construction, paste thickeners, decant system, InSAR deformation monitoring, and GISTM 2020 compliance. Reference for a major base metals mine.</p>
                <div className="flex flex-wrap gap-2">{['GISTM 2020', 'MSHA 30 CFR', 'EPA 40 CFR', 'ICOLD', 'CDA 2013', 'ANCOLD', 'IEC 62443'].map(t => (<span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded border border-[#F59E0B]/30 text-[#F59E0B]">{t}</span>))}</div>
            </header>
            <S t="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-300 leading-relaxed">Over <span className="text-[#F59E0B] font-medium">18,000 tailings dams</span> exist worldwide; 3,500+ in the U.S. After the Brumadinho (2019) and Mount Polley (2014) disasters, the Global Industry Standard on Tailings Management (GISTM) mandates lifecycle risk minimization with independent review and public disclosure.</p>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside mt-2">
                    <li><span className="text-[#F59E0B] font-medium">Mining Company</span> — Owner/operator, accountable executive per GISTM</li>
                    <li><span className="text-[#F59E0B] font-medium">Engineer of Record (EoR)</span> — Design, construction oversight, annual review</li>
                    <li><span className="text-[#F59E0B] font-medium">Independent Review Board (IRB)</span> — Annual technical review per GISTM</li>
                    <li><span className="text-[#F59E0B] font-medium">MSHA</span> — Mine Safety and Health, 30 CFR inspection authority</li>
                    <li><span className="text-[#F59E0B] font-medium">EPA</span> — 40 CFR, Clean Water Act, CERCLA liability</li>
                    <li><span className="text-[#F59E0B] font-medium">State Dam Safety</span> — Dam classification, EAP review, permits</li>
                    <li><span className="text-[#F59E0B] font-medium">ICMM</span> — Int&apos;l Council on Mining and Metals, GISTM adoption</li>
                </ul>
                <T h={['Standard', 'Scope']} r={[['GISTM 2020', 'Global lifecycle tailings management standard'], ['MSHA 30 CFR', 'Mine safety inspections, surface impoundments'], ['EPA 40 CFR', 'Environmental protection, discharge permits'], ['CDA 2013', 'Canadian Dam Association — tailings dam guidelines'], ['ANCOLD', 'Australian tailings dam safety guidelines'], ['ICOLD Bulletin 153', 'Tailings dams — risk of dangerous occurrences'], ['IEC 62443', 'Industrial automation cybersecurity for SCADA']]} />
            </S>
            <S t="2. High-Level Design" id="design">
                <p className="text-sm text-gray-300 leading-relaxed">100M-tonne centerline TSF with starter dam, cyclone sand embankment raises, HDPE-lined upstream face, decant tower, seepage collection, water return system, and comprehensive monitoring instrumentation.</p>
                <D>{
                    `┌──────────────────────────────────────────────────────────────────────────┐
│          TAILINGS STORAGE FACILITY (100M tonnes, centerline)            │
│                                                                          │
│  Process Plant → Slurry Pipeline (300mm HDPE, 10 km)                    │
│       │                                                                  │
│  ┌────┴──────────────────────────────────────────────────┐              │
│  │  Paste Thickener (30m dia) → Cyclones → Spigots      │              │
│  │       │              │          │                      │              │
│  │       │         Sand →│     Fines → Deposition Beach  │              │
│  │       │              │                                 │              │
│  │  Embankment (centerline raise, cyclone sand fill)     │              │
│  │  ├── HDPE Liner (upstream face)                       │              │
│  │  ├── Filter Zones (chimney + blanket drains)          │              │
│  │  ├── Starter Dam (500,000 m³ compacted earthfill)     │              │
│  │  └── Crest El. 100m (final raise)                     │              │
│  │                                                        │              │
│  │  Supernatant Pond → Decant Tower (50m) → Reclaim Pump │              │
│  │       │                                    │           │              │
│  │       └── Water Return Pipeline → Process Plant       │              │
│  │                                                        │              │
│  │  Seepage: Toe Drains → Collection Pond → Reclaim      │              │
│  └────────────────────────────────────────────────────────┘              │
│  Emergency Spillway (concrete, 2,000 m³) → Downstream                  │
│                                                                          │
│  Monitoring: InSAR · Slope Radar · VW Piezometers · Prism Survey       │
│  TARP: Trigger thresholds → Response matrix → EoR notification          │
└──────────────────────────────────────────────────────────────────────────┘`}</D>
            </S>
            <S t="3. Detailed Technical Description" id="technical">
                <h3 className="text-sm font-semibold text-white/80 mb-2">3.1 Embankment Construction</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>Centerline method: vertical raise with fixed crest, partial tailings use</li>
                    <li>Cyclone sand: deslimed tailings for pervious zones (D₅₀ 200–400 μm)</li>
                    <li>Compacted fill: earth/rock from borrow, 95% Modified Proctor</li>
                    <li>HDPE liner: 1.5mm, double-welded seams, leak detection layer</li>
                    <li>Filter zones: chimney drain (graded gravel), blanket drain (300mm)</li>
                    <li>Starter dam: 500,000 m³ compacted earthfill, founded on stripped foundation</li>
                </ul>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">3.2 Tailings Delivery</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>Slurry pumps: 4× centrifugal, 500 HP each, wear-resistant rubber-lined</li>
                    <li>Pipeline: 300mm HDPE, 10 km, booster stations every 3 km</li>
                    <li>Paste thickener: 30m diameter, underflow 60–70% solids by weight</li>
                    <li>Hydrocyclones: 8× 500mm, sand/fines separation for embankment raises</li>
                    <li>Spigot deposition: radial, 50m spacing, rotating for beach development</li>
                </ul>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">3.3 Water Management</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>Decant tower: 50m steel/concrete, barge pump (500 kW), supernatant recovery</li>
                    <li>Reclaim pumps: 4× centrifugal (500 kW each), water return pipeline</li>
                    <li>Water balance: 90% recovery target, monitoring precipitation + evaporation</li>
                    <li>Emergency spillway: concrete channel, 2,000 m³, PMF capacity</li>
                </ul>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">3.4 Seepage & Drainage</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>Toe drains: 600mm PVC, perforated, geotextile-wrapped, 5 km total</li>
                    <li>Seepage collection pond: lined, gravity flow to reclaim system</li>
                    <li>Underdrain: chimney + blanket, graded filter material</li>
                    <li>Seepage weirs: V-notch, continuous flow monitoring, ±1% accuracy</li>
                </ul>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">3.5 Monitoring Instrumentation</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>InSAR: satellite radar, monthly passes, 2–5 mm precision, full-facility</li>
                    <li>Slope stability radar: 2× ground-based, mm-level real-time deformation</li>
                    <li>Vibrating wire piezometers: 200 units, foundation + embankment body</li>
                    <li>Inclinometers: 50 units, lateral displacement at depth</li>
                    <li>Settlement plates: 100 units, consolidation monitoring</li>
                    <li>Prism survey: 500 targets, total station + GNSS, monthly geodetic</li>
                </ul>
            </S>
            <S t="4. Process Diagrams" id="process">
                <h3 className="text-sm font-semibold text-white/80 mb-2">4.1 Tailings Deposition Cycle</h3>
                <D>{
                    `Process Plant → Slurry Pumps (4× 500 HP) → 10 km Pipeline
    │
Paste Thickener (30m dia, 60-70% solids) → Hydrocyclones (8× 500mm)
    │                                           │
    │                                      Sand → Embankment Raise
    │
Spigots → Radial Deposition → Beach Formation → Supernatant Pond
    │
Decant Tower → Reclaim Pumps (4× 500 kW) → Water Return to Plant
    │
Annual Embankment Raise (centerline, 3-5 m/yr) → Repeat Cycle`}</D>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">4.2 Water Balance</h3>
                <D>{
                    `INFLOW                          OUTFLOW
├── Tailings deposition water   ├── Reclaim (90% target)
├── Direct precipitation        ├── Evaporation
├── Runoff                      ├── Seepage (collected)
│                               └── Spillway (emergency only)
│
Balance: Storage Δ = Σ Inflow - Σ Outflow
Monitoring: Daily level + weekly manual check + monthly EoR review`}</D>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">4.3 TARP Monitoring Flow</h3>
                <D>{
                    `Instruments → Data Logger → SCADA → Database → TARP Review
    │                                               │
VW Piezometer (hourly)  ──► Green / Amber / Red thresholds
Slope Radar (continuous) ──► If RED: halt deposition, notify EoR
InSAR (monthly)         ──► Seasonal trend analysis
Prism Survey (monthly)  ──► Geodetic displacement vectors
    │                                               │
    └── TARP Response: Reduce ops → Investigate → Remediate → Resume
        If imminent failure → Activate EAP → Evacuate → Breach notify`}</D>
            </S>
            <S t="5. Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2 italic">100M-tonne centerline TSF for major base metals mine.</p>
                <T h={['Equipment', 'Specification', 'Qty', 'Rating']} r={[
                    ['Cyclone Sand', 'Pervious embankment fill', '5M m³', 'D₅₀ 200-400 μm'],
                    ['Compacted Earthfill', 'Foundation/impervious zones', '3M m³', '95% Mod Proctor'],
                    ['HDPE Geomembrane', '1.5mm, double-weld seams', '500K m²', 'Upstream face'],
                    ['Starter Dam Fill', 'Compacted earth, founded', '500K m³', 'Initial contain'],
                    ['Slurry Pump', 'Centrifugal, rubber-lined', '4', '500 HP each'],
                    ['Slurry Pipeline', '300mm HDPE', '10 km', 'Booster stations'],
                    ['Paste Thickener', 'Center-driven rake', '1', '30m dia, 60-70% solids'],
                    ['Hydrocyclone', 'Sand/fines separation', '8', '500mm, Krebs/Cavex'],
                    ['Decant Tower', 'Steel/concrete, barge pump', '1', '50m height'],
                    ['Reclaim Pump', 'Centrifugal, water return', '4', '500 kW each'],
                    ['VW Piezometer', 'Foundation + embankment', '200', 'Geokon 4500S'],
                    ['Inclinometer', 'Lateral displacement', '50', 'In-place, biaxial'],
                    ['Settlement Plate', 'Consolidation monitoring', '100', 'Magnetic type'],
                    ['Slope Stability Radar', 'Ground-based, real-time', '2', 'mm-level, IDS/RST'],
                    ['Prism Survey Target', 'Total station + GNSS', '500', 'Monthly geodetic'],
                    ['Toe Drain Pipe', '600mm PVC, perforated', '5 km', 'Geotextile wrap'],
                    ['Emergency Spillway', 'Reinforced concrete', '2,000 m³', 'PMF capacity'],
                    ['Seepage Weir (V-notch)', 'Continuous flow monitor', '10', '±1% accuracy'],
                    ['Filter Material', 'Chimney/blanket drain', '1M m³', 'Graded gravel'],
                    ['Access Roads', 'Gravel, all-weather', '20 km', '8m wide'],
                    ['SCADA PLC', 'Modicon M580, redundant', '2', 'DCS + remote I/O'],
                ]} />
            </S>
            <S t="6. Purdue Model Mapping" id="purdue">
                <T h={['Level', 'Components', 'Protocols']} r={[
                    ['L4 Enterprise', 'GISTM reporting, ERP, regulatory portal', 'HTTPS, REST API'],
                    ['L3.5 DMZ', 'IEC 62443 firewall, data diode', 'TLS 1.3, IPsec'],
                    ['L3 Operations', 'MES, water balance, TARP database', 'OPC UA, MQTT, SQL'],
                    ['L2 Supervisory', 'SCADA HMI, alarm management', 'Modbus TCP, OPC DA'],
                    ['L1 Control', 'PLC/DCS, pump VFDs, valve actuators', 'EtherNet/IP, PROFIBUS'],
                    ['L0 Process', 'Pumps, piezos, radar, cyclones, valves', '4-20mA, Modbus RTU'],
                ]} />
                <p className="text-xs text-gray-500 mt-2 italic">Aligned with IEC 62443 zones for mine site OT cybersecurity.</p>
            </S>
            <S t="7. Supporting Systems" id="supporting">
                <T h={['System', 'Description', 'Specification']} r={[
                    ['Fire Suppression', 'Pump station, thickener building', 'NFPA 11 foam + dry chem'],
                    ['Backup Power', 'Diesel generator, UPS', '500 kW, 72-hr fuel'],
                    ['Dust Suppression', 'Water sprays, chemical binder', 'Beaches + access roads'],
                    ['Physical Security', 'Fencing, CCTV, access control', '24/7, MSHA compliance'],
                    ['Environmental Lab', 'Water sampling, analysis', 'On-site + contract lab'],
                    ['Weather Station', 'Wind, rain, evaporation', 'Campbell CR1000X'],
                ]} />
            </S>
            <S t="8. Tailings Utility Systems" id="utility">
                <T h={['Medium', 'System', 'Specification']} r={[
                    ['Process Water', 'Reclaim return pipeline', '90% recovery target'],
                    ['Diesel Fuel', 'Pumps, generators, mobile equip', '50,000 L on-site'],
                    ['Flocculant', 'Thickener feed, polymer dosing', 'Anionic, 50 g/t'],
                    ['Lime', 'pH adjustment, ARD neutralization', 'Hydrated, 2 kg/t'],
                    ['Compressed Air', 'Instrumentation, valve actuation', '100 psi, 200 cfm'],
                ]} />
            </S>
            <S t="9. Data Flow Architecture" id="dataflow">
                <D>{
                    `┌──────────────────────────────────────────────────────────────────────┐
│ TIER 4 — ENTERPRISE    GISTM Portal · Mine ERP · Regulatory       │
│  ── REST / HTTPS ── annual disclosure + IRB reports ────────────────│
├──────────────────────────────────────────────────────────────────────┤
│ TIER 3 — OPERATIONS    MES · Water Balance · TARP Database         │
│  ── OPC UA / MQTT ── 5,000 pts, 15-sec scan + IoT ─────────────────│
├──────────────────────────────────────────────────────────────────────┤
│ TIER 2 — SUPERVISORY    SCADA HMI · Alarm Mgmt · Trend Display    │
│  ── Modbus TCP ── pump status, piezo levels, radar alerts ──────────│
├──────────────────────────────────────────────────────────────────────┤
│ TIER 1 — CONTROL        PLC/DCS · VFD · Valve Controllers         │
│  ── EtherNet/IP / PROFIBUS ── slurry pump, thickener, gates ───────│
├──────────────────────────────────────────────────────────────────────┤
│ TIER 0 — PROCESS        Pumps · Piezos · Radar · Cyclones         │
│  ── 4-20mA / Modbus RTU ── continuous monitoring ───────────────────│
└──────────────────────────────────────────────────────────────────────┘`}</D>
            </S>
            <S t="10. References" id="references">
                <ul className="space-y-1.5 text-xs text-gray-500 font-mono">
                    <li>• Global Tailings Review. (2020). <em>Global Industry Standard on Tailings Management.</em></li>
                    <li>• Vick, S. G. (1990). <em>Planning, Design, and Analysis of Tailings Dams.</em> BiTech.</li>
                    <li>• ICOLD. (2013). <em>Bulletin 153: Tailings Dams — Risk of Dangerous Occurrences.</em></li>
                    <li>• CDA. (2013). <em>Technical Bulletin: Mine Tailings Dams.</em></li>
                    <li>• ANCOLD. (2012). <em>Guidelines on Tailings Dams.</em></li>
                    <li>• ICMM. (2020). <em>Tailings Management Good Practice Guide.</em></li>
                    <li>• World Bank. (2021). <em>Tailings Storage Facilities: Risk Mgmt Guidelines.</em></li>
                    <li>• IEC. (2018). <em>IEC 62443: Industrial Automation and Control Systems Security.</em></li>
                </ul>
            </S>
            <S t="See Also" id="see-also">
                <div className="flex flex-wrap gap-3">
                    {[{ l: 'Dams Hub', h: '/wiki/dams', c: '#0EA5E9' }, { l: 'Hydroelectric Dam', h: '/wiki/dams/hydroelectric-dam', c: '#0EA5E9' }, { l: 'Irrigation Diversion', h: '/wiki/dams/irrigation-diversion', c: '#84CC16' }, { l: 'Chemical Sector', h: '/wiki/chemical', c: '#EF4444' }, { l: 'DAMS Sector', h: '/wiki/sectors/DAMS', c: '#0EA5E9' }].map(x => (<a key={x.l} href={x.h} className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-white/[0.04]" style={{ borderColor: `${x.c}30`, color: x.c }}>{x.l} →</a>))}
                </div>
            </S>
        </div>
    );
}
function S({ t, id, children }: { t: string; id: string; children: React.ReactNode }) { return (<section id={id} className="space-y-4 pt-8 border-t border-white/[0.04]"><h2 className="text-lg font-heading font-semibold text-white/90">{t}</h2>{children}</section>); }
function D({ children }: { children: string }) { return (<div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}><pre className="whitespace-pre leading-relaxed">{children}</pre></div>); }
function T({ h, r }: { h: string[]; r: string[][] }) { return (<div className="overflow-x-auto"><table className="w-full text-xs border-collapse"><thead><tr className="border-b border-white/[0.08] text-gray-500">{h.map(x => (<th key={x} className="text-left px-3 py-2 font-medium">{x}</th>))}</tr></thead><tbody className="text-gray-400 divide-y divide-white/[0.04]">{r.map((row, i) => (<tr key={i} className="hover:bg-white/[0.02]"><td className="px-3 py-2 text-[#F59E0B] font-medium whitespace-nowrap">{row[0]}</td>{row.slice(1).map((c, j) => (<td key={j} className="px-3 py-2">{c}</td>))}</tr>))}</tbody></table></div>); }
