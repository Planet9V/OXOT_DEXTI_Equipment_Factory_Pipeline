/**
 * Large Hydroelectric Dam — Deep Dive Wiki Article.
 * Francis/Kaplan turbines, penstocks, spillway, switchyard, dam safety.
 * @module wiki/dams/hydroelectric-dam/page
 */
export const metadata = { title: 'Large Hydroelectric Dam — DAMS Deep Dive', description: 'TOGAF reference architecture for 300 MW hydroelectric dam: Francis turbines, penstocks, spillway, FERC Part 12, NERC CIP.' };

const C = '#0EA5E9';
export default function HydroelectricDamPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <header className="space-y-3">
                <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]" style={{ background: C }} /><span className="text-xs font-mono text-gray-500">DAMS · HYDROELECTRIC · LARGE DAM</span></div>
                <h1 className="text-3xl font-heading font-bold text-white">Large Hydroelectric Dam</h1>
                <p className="text-sm text-gray-400 max-w-3xl">6-unit 300 MW Francis turbine powerhouse on concrete gravity dam with gated spillway, HV switchyard, fish passage, and dam safety instrumentation.</p>
                <div className="flex flex-wrap gap-2">{['FERC Part 12', 'ASME PTC 18', 'IEEE C50.12', 'IEC 61850', 'NERC CIP', 'ICOLD'].map(t => (<span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded border border-[#0EA5E9]/30 text-[#0EA5E9]">{t}</span>))}</div>
            </header>
            <S t="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-300 leading-relaxed">U.S. hydroelectric capacity totals <span className="text-[#0EA5E9] font-medium">80 GW</span> (6.3% of electricity). FERC licenses 2,500+ non-federal dams; federal projects operate under USACE/USBR Congressional authorization.</p>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside mt-2">
                    <li><span className="text-[#0EA5E9] font-medium">FERC</span> — License admin, Part 12 dam safety, environmental compliance</li>
                    <li><span className="text-[#0EA5E9] font-medium">USACE/USBR</span> — Federal dam construction, flood control, western irrigation</li>
                    <li><span className="text-[#0EA5E9] font-medium">NERC</span> — BES reliability, CIP-002–014 cybersecurity standards</li>
                    <li><span className="text-[#0EA5E9] font-medium">NMFS/USFWS</span> — ESA Section 7, fish passage biological opinions</li>
                    <li><span className="text-[#0EA5E9] font-medium">State Dam Safety</span> — Inspection, EAP review, hazard classification</li>
                    <li><span className="text-[#0EA5E9] font-medium">Utilities/IPPs</span> — O&M, energy marketing, PPA compliance</li>
                </ul>
                <T h={['Standard', 'Scope']} r={[['FERC Part 12', 'Dam safety inspections, independent consultant review (5-yr)'], ['NERC CIP-002–014', 'Critical infrastructure protection for BES cyber assets'], ['ASME PTC 18', 'Hydraulic turbine performance test code'], ['IEEE C50.12', 'Salient-pole synchronous generator requirements'], ['IEC 61850', 'Communication networks for power utility automation'], ['ICOLD Bulletin 175', 'Dam safety management — operational phase'], ['FEMA P-946', 'Federal guidelines for inundation mapping']]} />
            </S>
            <S t="2. High-Level Design" id="design">
                <p className="text-sm text-gray-300 leading-relaxed">Concrete gravity dam (300 ft high, 2,500 ft crest) with gated spillway, intake tower, penstocks, powerhouse, switchyard, and dam body instrumentation.</p>
                <D>{
                    `┌──────────────────────────────────────────────────────────────────────────┐
│                    300 MW CONCRETE GRAVITY DAM                           │
│                                                                          │
│  Reservoir (El. 1200')                                                   │
│      ├── Spillway: 5× Tainter Gates (50'×40' ea) → Stilling Basin       │
│      ├── Intake Tower → Trash Racks → Bulkhead Gates                    │
│      │   └── 6× Penstocks (14' dia, 600 ft) → 6× Francis Turbines      │
│      │       └── 6× Generators (55 MVA) → 6× Xfmrs (13.8/230 kV)      │
│      │           └── 230 kV Switchyard (ring bus, 8 breakers) → Grid    │
│      ├── Fish Passage: Ladder + Screens + Trap & Haul                   │
│      └── Dam Body Instrumentation: Piezos, Pendulums, Seismic           │
│  Tailwater (El. 950') ← Draft Tubes                                     │
└──────────────────────────────────────────────────────────────────────────┘`}</D>
            </S>
            <S t="3. Detailed Technical Description" id="technical">
                <h3 className="text-sm font-semibold text-white/80 mb-2">3.1 Hydraulic Turbines</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>Francis: 50 MW each, Ns 150–300, 120–180 RPM, CA-6NM stainless runner</li>
                    <li>20 wicket gates per unit, servomotor-operated, 90-sec full stroke</li>
                    <li>Governor: Woodward UG-40 digital, ±0.5% speed regulation, 4% droop</li>
                    <li>Draft tube: elbow type, vacuum breaker, air admission valve</li>
                </ul>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">3.2 Synchronous Generators</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>55 MVA, 13.8 kV, 0.9 PF, salient-pole, Class F insulation</li>
                    <li>Static thyristor excitation (ABB Unitrol 6000), 6× stator RTDs</li>
                    <li>Kingsbury thrust bearing: 800 tonnes, oil-lubricated, 6 pads</li>
                    <li>Neutral: high-resistance grounding, 10A primary, 59N relay</li>
                </ul>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">3.3 Penstocks & Intake</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>Steel penstock: 14' ID, ASTM A516 Gr70, 180 psi design, 600 ft</li>
                    <li>Intake gates: fixed-wheel roller, 14'×20', diesel hoist</li>
                    <li>Trash racks: 3″ spacing, hydraulic rake, 10 fps approach velocity</li>
                </ul>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">3.4 Spillway & Flood Discharge</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>5× tainter gates: 50'W×40'H, wire rope hoists, 500,000 cfs PMF capacity</li>
                    <li>Stilling basin: USBR Type III, 80 ft, dentated sill</li>
                    <li>Low-level outlet: 8 ft conduit, Howell-Bunger valve, env flow</li>
                </ul>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">3.5 Dam Safety Monitoring</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>120+ VW piezometers (SDI-12), 4 inverted pendulums (±0.1 mm)</li>
                    <li>6× triaxial accelerometers (Kinemetrics EpiSensor, 200 sps)</li>
                    <li>Rod extensometers, V-notch seepage weirs, geodetic survey</li>
                </ul>
            </S>
            <S t="4. Process Diagrams" id="process">
                <h3 className="text-sm font-semibold text-white/80 mb-2">4.1 Energy Conversion</h3>
                <D>{
                    `Reservoir → Intake Gate → Penstock (14') → Francis Turbine (50 MW) → Generator (55 MVA)
    │                        600 ft           150 RPM, Ns=200         13.8 kV, 0.9 PF
    │                        180 psi                                       │
    │                                                          Step-Up Transformer
    │                                                          13.8/230 kV, Δ/Y
Tailwater ◄── Draft Tube ◄─────────────────┘                       │
(El. 950')                                                  230 kV Ring Bus → Grid`}</D>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">4.2 Water Management</h3>
                <D>{
                    `Inflow (Hydrology) → Reservoir → Rule Curve (FERC) → Release Schedule
                         │         Flood / Conservation    ├── Turbine (generation)
                         │         / Inactive pools        ├── Spillway (flood discharge)
                         │                                 ├── Low-level outlet (env flow)
                         └── USGS Gage → CWMS Forecast     └── Fish passage (ladder/bypass)`}</D>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">4.3 Dam Safety Monitoring</h3>
                <D>{
                    `Piezometer ─┐
Pendulum   ─┤── Data Logger (Campbell CR6, SDI-12) → SCADA (DNP3, 15-min)
Extensometer┤   └── Solar + battery                    ├── Historian (PI/SQL)
Seismic    ─┤                                          ├── Trend plots + alarms
Seepage    ─┘                                          └── FERC Part 12 report
     └── Threshold breach → EAP activation → Inundation notification`}</D>
            </S>
            <S t="5. Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2 italic">6-unit 300 MW concrete gravity dam with gated spillway.</p>
                <T h={['Equipment', 'Specification', 'Qty', 'Rating']} r={[
                    ['Francis Turbine', 'Stainless CA-6NM, Ns 200', '6', '50 MW, 150 RPM'],
                    ['Synchronous Generator', 'Salient-pole, 13.8 kV', '6', '55 MVA, 0.9 PF'],
                    ['Digital Governor', 'Woodward UG-40, 4% droop', '6', '±0.5% speed'],
                    ['Step-Up Transformer', 'ONAN/ONAF, 13.8/230 kV', '6', '55 MVA'],
                    ['Steel Penstock', 'A516 Gr70, 14\' ID', '6', '600 ft, 180 psi'],
                    ['Intake Gate', 'Fixed-wheel roller, diesel hoist', '6', '14\'×20\''],
                    ['Tainter Spillway Gate', 'Radial, wire rope hoist', '5', '50\'W × 40\'H'],
                    ['HV Breaker (SF6)', '230 kV, ring bus', '8', '40 kA, 3-cycle'],
                    ['Excitation System', 'ABB Unitrol 6000', '6', 'Static thyristor'],
                    ['Thrust Bearing', 'Kingsbury, oil-lubricated', '6', '800 tonne'],
                    ['VW Piezometer', 'SDI-12, 0–200 psi', '120', 'Foundation + body'],
                    ['Inverted Pendulum', 'Automated optical', '4', '±0.1 mm'],
                    ['Seismic Accelerometer', 'Kinemetrics EpiSensor', '6', 'Triaxial, 200 sps'],
                    ['SCADA RTU', 'SEL-3530, DNP3', '2', 'Redundant pair'],
                    ['Fish Ladder', 'Pool-and-weir, 10% slope', '1', '12 pools'],
                    ['Fish Screen', 'Rotary drum, ¼" mesh', '2', '< 2 fps'],
                    ['Howell-Bunger Valve', 'Fixed-cone discharge', '2', '8 ft, env flow'],
                    ['Overhead Crane', 'Double-girder', '1', '250-ton'],
                    ['Diesel Generator', 'Caterpillar, black-start', '1', '2 MW'],
                    ['Battery Bank (125 VDC)', 'Lead-acid, 8-hr', '2', '1,200 Ah'],
                    ['Drainage Gallery Pump', 'Submersible, SS', '4', '500 gpm'],
                ]} />
            </S>
            <S t="6. Purdue Model Mapping" id="purdue">
                <T h={['Level', 'Components', 'Protocols']} r={[
                    ['L4 Enterprise', 'FERC eFile, NERC portal, energy market, CWMS', 'HTTPS, REST, ICCP/TASE.2'],
                    ['L3.5 DMZ', 'NERC CIP firewall, data diode, patch server', 'IEC 62351, TLS, IPsec'],
                    ['L3 Operations', 'EMS/SCADA, PI historian, dam safety DB', 'OPC UA, IEC 61850 MMS'],
                    ['L2 Supervisory', 'HMI, alarm management, SOE recorder', 'IEC 61850 GOOSE, SNMP'],
                    ['L1 Control', 'Governor PLC, exciter, relay (SEL-400)', 'DNP3, Modbus TCP, IEC 61850'],
                    ['L0 Process', 'Turbine, generator, gate, piezos, seismic', '4-20mA, SDI-12, HART'],
                ]} />
                <p className="text-xs text-gray-500 mt-2 italic">Aligned with IEC 62443 zones and NERC CIP-005 ESP boundaries.</p>
            </S>
            <S t="7. Supporting Systems" id="supporting">
                <T h={['System', 'Description', 'Specification']} r={[
                    ['Fire Suppression', 'Deluge (xfmr), FM-200 (control)', 'NFPA 15 + NFPA 2001'],
                    ['HVAC', 'Powerhouse ventilation, dehumid', '20,000 cfm, N+1 AHU'],
                    ['DC Station Power', '125 VDC battery + charger', '1,200 Ah, 8-hr'],
                    ['Diesel Generator', 'Black-start / station service', '2 MW, CAT, ATS'],
                    ['Lightning Protection', 'Switchyard mast/shield wire', 'IEEE 998, 150 kA'],
                    ['Physical Security', 'PACS, CCTV, fencing, CIP-006', '24/7 monitoring'],
                ]} />
            </S>
            <S t="8. Water, Air & Gas Systems" id="utility">
                <T h={['Medium', 'System', 'Specification']} r={[
                    ['Cooling Water', 'Bearing oil cooler, gen air cooler', '2,000 gpm raw water'],
                    ['Compressed Air', 'Draft tube depression, brake cyl', '125 psi, 500 cfm'],
                    ['Lube Oil', 'Thrust/guide bearing, governor', 'ISO VG 46/68, 5,000 gal'],
                    ['Drainage Water', 'Gallery + powerhouse sump', '500 gpm, submersible'],
                    ['Potable Water', 'Domestic, safety showers', 'Well supply, UV treat'],
                    ['SF₆ Gas', 'HV breaker insulation', 'IEC 60376, 6 bar'],
                ]} />
            </S>
            <S t="9. Data Flow Architecture" id="dataflow">
                <D>{
                    `┌──────────────────────────────────────────────────────────────────────┐
│ TIER 4 — ENTERPRISE    FERC · NERC · Market · CWMS · PI AF         │
│  ── ICCP / REST ── 15-min market + daily reports ───────────────────│
├──────────────────────────────────────────────────────────────────────┤
│ TIER 3 — OPERATIONS    EMS/SCADA · PI Historian · Dam Safety DB    │
│  ── OPC UA / IEC 61850 MMS ── 20,000 pts, 1-sec scan ──────────────│
├──────────────────────────────────────────────────────────────────────┤
│ TIER 2 — SUPERVISORY    HMI · SOE · Alarm Mgmt · Trending         │
│  ── IEC 61850 GOOSE / DNP3 ── sub-ms trip, 4-ms GOOSE ─────────────│
├──────────────────────────────────────────────────────────────────────┤
│ TIER 1 — CONTROL        Governor · Exciter · Relay Protection      │
│  ── DNP3 / Modbus TCP ── 100-ms loops, 4-cycle trip ───────────────│
├──────────────────────────────────────────────────────────────────────┤
│ TIER 0 — PROCESS        Turbine · Gen · Gate · Piezo · Seismic     │
│  ── 4-20mA / SDI-12 / HART ── continuous analog + digital I/O ─────│
└──────────────────────────────────────────────────────────────────────┘`}</D>
            </S>
            <S t="10. References" id="references">
                <ul className="space-y-1.5 text-xs text-gray-500 font-mono">
                    <li>• FERC. (2022). <em>Engineering Guidelines for Hydropower Projects.</em></li>
                    <li>• ASME. (2021). <em>PTC 18: Hydraulic Turbine Performance Test Code.</em></li>
                    <li>• IEEE. (2020). <em>C50.12: Salient-Pole Synchronous Generators.</em></li>
                    <li>• IEC. (2020). <em>IEC 61850: Communication Networks for Power Utility.</em></li>
                    <li>• NERC. (2023). <em>CIP-002–014 Reliability Standards.</em></li>
                    <li>• USACE. (2004). <em>EM 1110-2-1701: Hydropower Engineering.</em></li>
                    <li>• ICOLD. (2019). <em>Bulletin 175: Dam Safety Management.</em></li>
                    <li>• USBR. (2019). <em>Design of Small Dams (3rd ed.).</em></li>
                </ul>
            </S>
            <S t="See Also" id="see-also">
                <div className="flex flex-wrap gap-3">
                    {[{ l: 'Dams Hub', h: '/wiki/dams', c: '#0EA5E9' }, { l: 'Levee System', h: '/wiki/dams/levee-system', c: '#3B82F6' }, { l: 'Navigation Lock', h: '/wiki/dams/navigation-lock', c: '#10B981' }, { l: 'Energy Sector', h: '/wiki/energy', c: '#F59E0B' }, { l: 'DAMS Sector', h: '/wiki/sectors/DAMS', c: '#0EA5E9' }].map(x => (<a key={x.l} href={x.h} className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-white/[0.04]" style={{ borderColor: `${x.c}30`, color: x.c }}>{x.l} →</a>))}
                </div>
            </S>
        </div>
    );
}
function S({ t, id, children }: { t: string; id: string; children: React.ReactNode }) { return (<section id={id} className="space-y-4 pt-8 border-t border-white/[0.04]"><h2 className="text-lg font-heading font-semibold text-white/90">{t}</h2>{children}</section>); }
function D({ children }: { children: string }) { return (<div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}><pre className="whitespace-pre leading-relaxed">{children}</pre></div>); }
function T({ h, r }: { h: string[]; r: string[][] }) { return (<div className="overflow-x-auto"><table className="w-full text-xs border-collapse"><thead><tr className="border-b border-white/[0.08] text-gray-500">{h.map(x => (<th key={x} className="text-left px-3 py-2 font-medium">{x}</th>))}</tr></thead><tbody className="text-gray-400 divide-y divide-white/[0.04]">{r.map((row, i) => (<tr key={i} className="hover:bg-white/[0.02]"><td className="px-3 py-2 text-[#0EA5E9] font-medium whitespace-nowrap">{row[0]}</td>{row.slice(1).map((c, j) => (<td key={j} className="px-3 py-2">{c}</td>))}</tr>))}</tbody></table></div>); }
