/**
 * Irrigation Diversion Dam — Deep Dive Wiki Article.
 * USBR low-head run-of-river with radial gates, fish passage, SCADA.
 * @module wiki/dams/irrigation-diversion/page
 */
export const metadata = { title: 'Irrigation Diversion Dam — DAMS Deep Dive', description: 'TOGAF reference architecture for irrigation diversion dams: ogee weirs, Tainter gates, fish screens/ladders, canal headworks, and USBR SCADA.' };

const C = '#84CC16';
export default function IrrigationDiversionPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <header className="space-y-3">
                <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]" style={{ background: C }} /><span className="text-xs font-mono text-gray-500">DAMS · IRRIGATION · DIVERSION DAM</span></div>
                <h1 className="text-3xl font-heading font-bold text-white">Irrigation Diversion Dam</h1>
                <p className="text-sm text-gray-400 max-w-3xl">Low-head run-of-river diversion structure (10–50 ft head) with ogee weir, Tainter gates, canal headworks, fish screens and ladders, sediment management, and SCADA-controlled flow measurement. Reference for a USBR-class 400-hectare irrigation district.</p>
                <div className="flex flex-wrap gap-2">{['USBR', 'Reclamation Act', 'ESA §7', 'NMFS Fish Screen', 'NEPA', 'NRCS'].map(t => (<span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded border border-[#84CC16]/30 text-[#84CC16]">{t}</span>))}</div>
            </header>
            <S t="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-300 leading-relaxed">Western U.S. irrigation dams serve <span className="text-[#84CC16] font-medium">10 million acres</span> of agricultural land. USBR operates 337 reservoirs and 8,000 miles of canals. Diversion dams balance agricultural water delivery, environmental flow requirements, and endangered species protection under ESA Section 7.</p>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside mt-2">
                    <li><span className="text-[#84CC16] font-medium">Bureau of Reclamation</span> — Dam design, construction, safety of dams (SOD)</li>
                    <li><span className="text-[#84CC16] font-medium">NRCS</span> — Watershed planning, irrigation efficiency programs</li>
                    <li><span className="text-[#84CC16] font-medium">State Water Boards</span> — Water rights administration, permits</li>
                    <li><span className="text-[#84CC16] font-medium">Irrigation Districts</span> — O&M, water delivery, billing</li>
                    <li><span className="text-[#84CC16] font-medium">NMFS/USFWS</span> — Fish passage, ESA §7 biological opinions</li>
                    <li><span className="text-[#84CC16] font-medium">EPA</span> — Clean Water Act §404, NEPA environmental review</li>
                </ul>
                <T h={['Standard', 'Scope']} r={[['Reclamation Act (1902)', 'Federal water project authorization and repayment'], ['ESA Section 7', 'Consultation for threatened/endangered species'], ['NMFS Fish Screen Criteria', 'Approach velocity < 2 fps, ¼" mesh, bypass'], ['NEPA', 'Environmental impact analysis for federal projects'], ['USBR Design Standards', 'Dam safety, hydraulic design, canal standards'], ['State Water Rights', 'Prior appropriation, beneficial use doctrine']]} />
            </S>
            <S t="2. High-Level Design" id="design">
                <p className="text-sm text-gray-300 leading-relaxed">Low-head diversion dam (25 ft crest height) with ogee weir, 6 Tainter gates, canal headworks with sluice gates, fish ladder, rotary drum screens, settling basin, and SCADA flow telemetry.</p>
                <D>{
                    `┌──────────────────────────────────────────────────────────────────────────┐
│              IRRIGATION DIVERSION DAM (25 ft head, 5 m³/s)             │
│                                                                          │
│  River Flow ────────────────────────────────────────────────→           │
│       │                                                                  │
│  ┌────┴──────────────────────────────────────────────┐                  │
│  │  Ogee Weir (400 ft crest) + 6× Tainter Gates     │                  │
│  │  (10'W × 12'H each, electric hoist)               │                  │
│  └───────────────────────┬───────────────────────────┘                  │
│                          │                                               │
│  ┌───────────────────────┤                                              │
│  │  Canal Headworks      │  Fish Passage                                │
│  │  ├── Trash Racks (3") │  ├── Fish Ladder (10% slope, 15 pools)      │
│  │  ├── Sluice Gates (4) │  ├── Rotary Drum Screens (¼" mesh)          │
│  │  ├── Obermeyer Weir   │  └── Bypass Channel → Downstream            │
│  │  └── Canal Offtake    │                                              │
│  │      │                │  Sediment Management                         │
│  │      ▼                │  ├── Settling Basin (riprap lined)           │
│  │  Main Canal           │  └── Sluice Gates (flushing)                 │
│  │  (Parshall Flumes)    │                                              │
│  └───────────────────────┘                                              │
│  SCADA: PLC + RTU + Ultrasonic Levels + 900 MHz Radio Telemetry        │
└──────────────────────────────────────────────────────────────────────────┘`}</D>
            </S>
            <S t="3. Detailed Technical Description" id="technical">
                <h3 className="text-sm font-semibold text-white/80 mb-2">3.1 Weir & Spillway</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>Ogee profile: 400 ft crest, 4,000 psi reinforced concrete, cutoff wall</li>
                    <li>6× Tainter (radial) gates: 10'W × 12'H, ASTM A36 skin plate, electric hoist</li>
                    <li>Gate opening: 0.2–0.6 m adjustable for diversion ratios 5–100%</li>
                    <li>Flashboards (optional): timber, 2 ft height increase, fuse-plug design</li>
                    <li>Energy dissipation: USBR Type II stilling basin with dentated sill</li>
                </ul>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">3.2 Canal Headworks</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>Obermeyer weirs: 2× inflatable rubber dam, 20 ft wide, precise level control</li>
                    <li>Sluice gates: 4× slide gates (6'×6'), manual + electric actuators</li>
                    <li>Trash racks: stainless steel bars, 3" spacing, mechanical rake cleaner</li>
                    <li>Pond level set to canal FSL + 1.0–1.2 m for gravity feed</li>
                </ul>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">3.3 Fish Passage</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>Fish ladder: pool-and-weir type, 10% gradient, 15 pools, attraction flow 5–10 cfs</li>
                    <li>Fish screens: 2× rotary drum, ¼" mesh, approach velocity &lt;2 fps (NMFS criteria)</li>
                    <li>Bypass channel: 24" HDPE pipe, 500 ft, returning juveniles downstream</li>
                    <li>100% streamflow passage during low flow per biological opinion</li>
                </ul>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">3.4 Sediment Management</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>Settling basin: riprap-lined (24" D50), upstream of headworks</li>
                    <li>Sluice operations: high-velocity flushing via undershot gates during peak flows</li>
                    <li>135° diversion angle for optimal sediment exclusion (&gt;90% removed)</li>
                    <li>Post-event sluiceway scour protection: articulated concrete blocks</li>
                </ul>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">3.5 SCADA & Flow Measurement</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>PLC: Allen-Bradley CompactLogix, Modbus TCP/RTU</li>
                    <li>Ultrasonic level sensors: 6×, 4-20mA output, ±0.1% accuracy</li>
                    <li>Parshall flumes: 2× (3–6 ft throat), fiberglass, Q = k·h^1.5 rating</li>
                    <li>Gate position: 8× rotary encoders for Tainter gates</li>
                    <li>Telemetry: 900 MHz spread-spectrum radio to district office</li>
                </ul>
            </S>
            <S t="4. Process Diagrams" id="process">
                <h3 className="text-sm font-semibold text-white/80 mb-2">4.1 Water Diversion Cycle</h3>
                <D>{
                    `River Rise → Pond Level at Weir Crest → Overflow Initiates
    │
SCADA Opens Tainter Gates → Target Q via Rating Curves
    │
Headworks Diverts to Canal → Fish Screens Active (< 2 fps)
    │
Excess Spills Over Weir / Sluice Gates
    │
Canal Flow → Parshall Flume Measurement → Delivery Points
    │
SCADA Feedback Loop → Gate Adjustment → Target Delivery Q`}</D>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">4.2 Fish Passage Operations</h3>
                <D>{
                    `Continuous Screen Operation (< 2 fps approach velocity)
    │
Ladder Attraction Flow (5-10 cfs) → Upstream Migration
    │
Bypass Channel Active → Juvenile Return to Downstream
    │
Low Flow: 100% Streamflow Passes → No Diversion
    │
ESA Monitoring: Annual Fish Count → NMFS Reporting`}</D>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">4.3 Sediment Flushing</h3>
                <D>{
                    `Peak Sediment Flood Detected (turbidity sensor)
    │
Close Canal Intakes → Protect Headworks
    │
Open Sluice Gates → Full Undershot Flushing Discharge
    │
Settling Basin Drain Post-Event
    │
Resume Canal Diversion → Verify Fish Screen Operation`}</D>
            </S>
            <S t="5. Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2 italic">USBR-class diversion dam, 400-hectare irrigation district, 5 m³/s design.</p>
                <T h={['Equipment', 'Specification', 'Qty', 'Rating']} r={[
                    ['Ogee Weir Concrete', '4,000 psi, reinforced', '3,000 cy', '400 ft crest'],
                    ['Tainter Gate', 'Radial, 10\'×12\', electric hoist', '6', 'Steel, A36'],
                    ['Obermeyer Weir', 'Inflatable rubber dam', '2', '20 ft wide'],
                    ['Sluice Gate', 'Slide, 6\'×6\', manual+electric', '4', 'Canal headworks'],
                    ['Fish Screen (Rotary Drum)', '¼" mesh, < 2 fps', '2', 'NMFS compliant'],
                    ['Fish Ladder Pool', 'Precast concrete, 10% slope', '15', 'Pool-and-weir'],
                    ['Fish Bypass Pipe', '24" HDPE, 500 ft', '1', 'Juvenile return'],
                    ['Trash Rack', 'SS bars, 3" spacing', '3', 'Mech rake cleaner'],
                    ['Settling Basin', 'Riprap, 24" D50', '1', 'Upstream of intake'],
                    ['Parshall Flume', 'Fiberglass, 3-6 ft throat', '2', 'Q = k·h^1.5'],
                    ['Ultrasonic Level', '4-20mA, ±0.1%', '6', 'Canal + pond'],
                    ['SCADA PLC', 'AB CompactLogix', '1', 'Modbus TCP/RTU'],
                    ['Telemetry Radio', '900 MHz spread-spectrum', '2', 'SCADA link'],
                    ['Gate Hoist (Electric)', '5-ton, Tainter gate', '6', 'Reversible motor'],
                    ['Gate Position Encoder', 'Rotary, absolute', '8', 'All gates'],
                    ['Staff Gauge', 'SS, USBR-standard', '4', 'Rating curve'],
                    ['Scour Protection', 'Articulated concrete blocks', '1 lot', '36" blocks'],
                    ['Approach Riprap', '18" quarry stone', '1 lot', 'Channel armor'],
                    ['Backup Generator', 'Diesel, portable', '1', '50 kW'],
                    ['Security Fencing', 'Chain link, 8 ft', '1 lot', 'Perimeter'],
                    ['Instrumentation Conduit', 'PVC Sch 80, 2"', '1 lot', 'All sensors'],
                ]} />
            </S>
            <S t="6. Purdue Model Mapping" id="purdue">
                <T h={['Level', 'Components', 'Protocols']} r={[
                    ['L4 Enterprise', 'USBR HydroMet, district billing, state reporting', 'HTTPS, REST API'],
                    ['L3.5 DMZ', 'Firewall, VPN concentrator', 'TLS 1.3, IPsec'],
                    ['L3 Operations', 'District SCADA server, flow database', 'OPC UA, SQL'],
                    ['L2 Supervisory', 'HMI at dam + district office', 'Modbus TCP'],
                    ['L1 Control', 'PLC/RTU, gate controllers', 'Modbus RTU, DNP3'],
                    ['L0 Process', 'Gates, screens, flumes, level sensors', '4-20mA, HART, SDI-12'],
                ]} />
            </S>
            <S t="7. Supporting Systems" id="supporting">
                <T h={['System', 'Description', 'Specification']} r={[
                    ['Backup Power', 'Portable diesel generator', '50 kW, gate operation'],
                    ['Fish Count Station', 'Viewing window, video counter', 'Annual migration count'],
                    ['Turbidity Monitor', 'Optical, continuous', '0–4000 NTU, 4-20mA'],
                    ['Physical Security', 'Fencing, signage, locked enclosure', 'Unmanned site'],
                    ['Solar Power', 'PLC/RTU/radio primary power', '400W panel, 200 Ah battery'],
                    ['Lightning Protection', 'Grounding grid, surge protection', 'IEEE 142'],
                ]} />
            </S>
            <S t="8. Irrigation Utility Systems" id="utility">
                <T h={['Medium', 'System', 'Specification']} r={[
                    ['Canal Water', 'Main supply canal, laterals', '5 m³/s, 20 mi total'],
                    ['Diesel Fuel', 'Generator, mobile equipment', '500 gal on-site'],
                    ['Fish Attraction Water', 'Ladder supply, 5-10 cfs', 'Gravity fed from pond'],
                    ['Sediment', 'Settling basin spoils disposal', 'Annual cleanout, 500 cy'],
                ]} />
            </S>
            <S t="9. Data Flow Architecture" id="dataflow">
                <D>{
                    `┌──────────────────────────────────────────────────────────────────────┐
│ TIER 4 — ENTERPRISE    USBR HydroMet · District Office · State    │
│  ── REST / HTTPS ── daily delivery reports + water rights ──────────│
├──────────────────────────────────────────────────────────────────────┤
│ TIER 3 — OPERATIONS    District SCADA Server · Flow Database       │
│  ── OPC UA / SQL ── 200 pts, 15-sec scan ──────────────────────────│
├──────────────────────────────────────────────────────────────────────┤
│ TIER 2 — SUPERVISORY    HMI (Dam + Office) · Alarm Management     │
│  ── Modbus TCP ── gate position, canal level, fish screen status ───│
├──────────────────────────────────────────────────────────────────────┤
│ TIER 1 — CONTROL        RTU/PLC · Gate Actuators                   │
│  ── Modbus RTU / DNP3 ── gate sequence, level control ──────────────│
├──────────────────────────────────────────────────────────────────────┤
│ TIER 0 — PROCESS        Gates · Screens · Flumes · Level Sensors   │
│  ── 4-20mA / SDI-12 ── flow, turbidity, gate position ─────────────│
└──────────────────────────────────────────────────────────────────────┘`}</D>
            </S>
            <S t="10. References" id="references">
                <ul className="space-y-1.5 text-xs text-gray-500 font-mono">
                    <li>• USBR. (2019). <em>Design of Small Dams (3rd ed.).</em></li>
                    <li>• USACE. (2018). <em>EM 1110-2-1603: Hydraulic Design of Spillways.</em></li>
                    <li>• NMFS. (2011). <em>Fish Screen Criteria for Anadromous Salmonids.</em></li>
                    <li>• Flood-Based Livelihoods. (2021). <em>PN 29: Improvements in Diversion Design.</em></li>
                    <li>• USFS. (2007). <em>Planning and Layout of Small-Stream Diversions.</em></li>
                    <li>• Gallatin CD. (2020). <em>Ch. 5: Irrigation Diversion Structures.</em></li>
                    <li>• Van Steenbergen &amp; Lawrence. (2005). <em>Spate Irrigation Practices.</em></li>
                    <li>• USBR. (2016). <em>Canal Automation for Irrigation Systems (ASCE MoP 131).</em></li>
                </ul>
            </S>
            <S t="See Also" id="see-also">
                <div className="flex flex-wrap gap-3">
                    {[{ l: 'Dams Hub', h: '/wiki/dams', c: '#0EA5E9' }, { l: 'Hydroelectric Dam', h: '/wiki/dams/hydroelectric-dam', c: '#0EA5E9' }, { l: 'Tailings Facility', h: '/wiki/dams/tailings-facility', c: '#F59E0B' }, { l: 'Water Sector', h: '/wiki/water', c: '#06B6D4' }, { l: 'DAMS Sector', h: '/wiki/sectors/DAMS', c: '#0EA5E9' }].map(x => (<a key={x.l} href={x.h} className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-white/[0.04]" style={{ borderColor: `${x.c}30`, color: x.c }}>{x.l} →</a>))}
                </div>
            </S>
        </div>
    );
}
function S({ t, id, children }: { t: string; id: string; children: React.ReactNode }) { return (<section id={id} className="space-y-4 pt-8 border-t border-white/[0.04]"><h2 className="text-lg font-heading font-semibold text-white/90">{t}</h2>{children}</section>); }
function D({ children }: { children: string }) { return (<div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}><pre className="whitespace-pre leading-relaxed">{children}</pre></div>); }
function T({ h, r }: { h: string[]; r: string[][] }) { return (<div className="overflow-x-auto"><table className="w-full text-xs border-collapse"><thead><tr className="border-b border-white/[0.08] text-gray-500">{h.map(x => (<th key={x} className="text-left px-3 py-2 font-medium">{x}</th>))}</tr></thead><tbody className="text-gray-400 divide-y divide-white/[0.04]">{r.map((row, i) => (<tr key={i} className="hover:bg-white/[0.02]"><td className="px-3 py-2 text-[#84CC16] font-medium whitespace-nowrap">{row[0]}</td>{row.slice(1).map((c, j) => (<td key={j} className="px-3 py-2">{c}</td>))}</tr>))}</tbody></table></div>); }
