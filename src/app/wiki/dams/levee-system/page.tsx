/**
 * Levee System & Pump Station — Deep Dive Wiki Article.
 * Mississippi River-class 100,000 cfs flood control with USACE standards.
 * @module wiki/dams/levee-system/page
 */
export const metadata = { title: 'Levee System & Pump Station — DAMS Deep Dive', description: 'TOGAF reference architecture for levee systems: axial pumps, closure structures, piezometers, USACE CWMS, NFIP compliance.' };

const C = '#3B82F6';
export default function LeveeSystemPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <header className="space-y-3">
                <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]" style={{ background: C }} /><span className="text-xs font-mono text-gray-500">DAMS · FLOOD CONTROL · LEVEE SYSTEM</span></div>
                <h1 className="text-3xl font-heading font-bold text-white">Levee System &amp; Pump Station</h1>
                <p className="text-sm text-gray-400 max-w-3xl">Engineered levee system with interior drainage pump station (100,000 cfs capacity), closure structures, relief wells, and USACE Corps Water Management System (CWMS) integration. Reference for Mississippi River-class flood protection.</p>
                <div className="flex flex-wrap gap-2">{['44 CFR', 'PL 84-99', 'USACE EC 1110-2-6067', 'NFIP', 'EM 1110-2-1913', 'EM 1110-2-3104'].map(t => (<span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded border border-[#3B82F6]/30 text-[#3B82F6]">{t}</span>))}</div>
            </header>
            <S t="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-300 leading-relaxed">The U.S. levee portfolio protects <span className="text-[#3B82F6] font-medium">$2.3 trillion</span> in assets and 43% of the population relies on levees for flood protection. USACE maintains 14,700 miles of federal levees; thousands more are locally operated.</p>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside mt-2">
                    <li><span className="text-[#3B82F6] font-medium">USACE</span> — Federal levee design, construction, PL 84-99 emergency repair</li>
                    <li><span className="text-[#3B82F6] font-medium">FEMA</span> — NFIP accreditation, flood mapping, 44 CFR Part 65 LOMR</li>
                    <li><span className="text-[#3B82F6] font-medium">Local Levee Districts</span> — O&M, inspection, interior drainage operations</li>
                    <li><span className="text-[#3B82F6] font-medium">State Dam Safety</span> — Levee safety inspections, hazard classification</li>
                    <li><span className="text-[#3B82F6] font-medium">Flood Control Districts</span> — Regional coordination, pump station operation</li>
                </ul>
                <T h={['Standard', 'Scope']} r={[['44 CFR Part 65', 'NFIP levee accreditation, LOMR certification'], ['PL 84-99', 'Emergency levee repair authority and funding'], ['USACE EC 1110-2-6067', 'Levee safety program, periodic inspections'], ['EM 1110-2-1913', 'Design and construction of levees'], ['EM 1110-2-3104', 'Structural design of pumping stations'], ['ASCE 7-22', 'Flood loads and combinations for levee structures']]} />
            </S>
            <S t="2. High-Level Design" id="design">
                <p className="text-sm text-gray-300 leading-relaxed">100,000 cfs Mississippi River-class levee system integrating earthen embankment, floodwalls, closure structures, interior pump stations, and real-time SCADA monitoring tied to USACE CWMS hydrologic forecasting.</p>
                <D>{
                    `┌──────────────────────────────────────────────────────────────────────────┐
│              LEVEE SYSTEM & PUMP STATION (100,000 cfs)                  │
│                                                                          │
│  RIVERSIDE ──── Flood Stage El. +30' NAVD88 ──── PROTECTED SIDE        │
│       │                                              │                   │
│   ┌───┴────────────────────────────────┐        ┌────┴──────────────┐   │
│   │ Levee Embankment (3:1 slopes)     │        │ Interior Drainage │   │
│   │ Crest El. +32' (+2' freeboard)    │        │ Collection System │   │
│   │ Clay core + sand shell            │        │      │            │   │
│   │ Toe drain + chimney filter        │        │      ▼            │   │
│   │ 100+ relief wells (18" PVC)       │        │ Pump Station      │   │
│   └────────────────────────────────────┘        │ 20× axial pumps  │   │
│                                                  │ 5,000 cfs each   │   │
│   ┌────────────────────────────────────┐        │ Diesel + electric │   │
│   │ Closure Structures                 │        │ SCADA → CWMS      │   │
│   │ Swing gates, stop logs, T-walls   │        └───────────────────┘   │
│   │ I-walls (HP12×53 piles)           │                                 │
│   └────────────────────────────────────┘                                │
│   Monitoring: Piezometers · Settlement · LiDAR · CWMS Forecasting      │
└──────────────────────────────────────────────────────────────────────────┘`}</D>
            </S>
            <S t="3. Detailed Technical Description" id="technical">
                <h3 className="text-sm font-semibold text-white/80 mb-2">3.1 Levee Embankment</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>Zoned earthfill: impervious core (CL/CH), pervious shells (SM/SP)</li>
                    <li>Slopes: 3:1 (H:V) riverside and landside, +2 ft freeboard above DFE</li>
                    <li>Seepage control: toe drain (24" RCP perforated), chimney filter (3 ft graded gravel)</li>
                    <li>Relief wells: 100+, 18" PVC riser, 100 ft deep, 50 gpm each, gravel-packed</li>
                    <li>Compaction: 95% Std Proctor, ±2% of optimum moisture content</li>
                </ul>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">3.2 Pump Stations</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>20× vertical axial flow pumps, 72" impeller, 5,000 cfs each @ 15 ft TDH</li>
                    <li>Primary drive: diesel engines (CAT 3516C, 3,000 HP, Tier 4, auto-start &lt;10s)</li>
                    <li>Backup drive: 2,500 HP electric motors (4160V, 1800 RPM, TEFC)</li>
                    <li>Wet well: reinforced concrete, 50 ft dia × 40 ft deep, trash racks</li>
                    <li>Auto-start on float switch, SCADA ramp via VFD to match head/discharge</li>
                </ul>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">3.3 Closure Structures</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>Swing floodgates: 4× radial arm, 20'W × 25'H, hydraulic operation</li>
                    <li>Stop logs: aluminum, 24"×24" pin-connected sections, crane-handled</li>
                    <li>I-walls: 24" stem, HP12×53 H-piles, 1.5" rebar cover</li>
                    <li>T-walls: counterfort design, 30 ft high, 4000 psi concrete, +29' NAVD88</li>
                </ul>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">3.4 SCADA & Monitoring</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>200+ vibrating-wire piezometers (0–100 psi, SDI-12 output)</li>
                    <li>150+ settlement monuments (4" PVC deep benchmark, invar rod)</li>
                    <li>SCADA PLC: Allen-Bradley ControlLogix, redundant hot-standby</li>
                    <li>Integration: USACE CWMS for 24–72 hr hydrologic forecast</li>
                </ul>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">3.5 Floodgate Operations</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>Sequential closure on rising stage: swing gates → stop logs</li>
                    <li>Pumps ramp to full capacity on interior surcharge</li>
                    <li>Operations per USACE flood fight manual, daily patrols for boils/slumps</li>
                </ul>
            </S>
            <S t="4. Process Diagrams" id="process">
                <h3 className="text-sm font-semibold text-white/80 mb-2">4.1 Flood Event Response</h3>
                <D>{
                    `CWMS Forecast ──► River Stage Rising ──► Trigger Level (80% DFE)
      │                                        │
      ▼                                        ▼
Monitor Gages ──► Close Swing Gates ──► Install Stop Logs
                        │                      │
                        ▼                      ▼
               Ramp Pumps (20×5,000 cfs) ──► Patrol for Boils
                        │                      │
                        ▼                      ▼
               Diesel Failover (power loss)  Activate EAP if breach imminent
                        │
                        ▼
               Post-Event Dewater → Inspection → Repair`}</D>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">4.2 Pump Station Operations</h3>
                <D>{
                    `Interior Rainfall ──► Collection Drains ──► Wet Well Rising
                                                   │
Float Switch Trigger ──► Auto-Start Diesel (< 10s) │
       │                                            ▼
SCADA Ramp VFD ──► Match Head/Discharge ──► Pump to River Side
       │                                            │
Power Loss ──► ATS → Diesel Generator Backup        │
       │                                            ▼
Post-Event ──► Dewater Protected Area ──► Inspect Pumps/Wells`}</D>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">4.3 Levee Inspection Cycle</h3>
                <D>{
                    `Daily (Flood Fight) ──► Visual Patrol (boils, slumps, seepage)
      │
Quarterly ──► LiDAR Survey (5 cm accuracy, USGS-spec)
      │
Annual ──► Geotechnical (piezometers, settlement readings)
      │
5-Year ──► USACE Periodic Inspection (EC 1110-2-6067)
      │
All Data ──► CWMS ──► Maintenance Backlog ──► L4 ERP/FEMA Reporting`}</D>
            </S>
            <S t="5. Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2 italic">Mississippi River-class levee system with 100,000 cfs pump station.</p>
                <T h={['Equipment', 'Specification', 'Qty', 'Rating']} r={[
                    ['Vertical Axial Pump', '72" SS impeller', '20', '5,000 cfs @ 15\' TDH'],
                    ['Diesel Engine', 'CAT 3516C, Tier 4', '20', '3,000 HP, auto-start'],
                    ['Electric Motor (backup)', '4160V TEFC', '20', '2,500 HP, 1800 RPM'],
                    ['Swing Floodgate', 'Radial arm, hydraulic', '4', '20\'W × 25\'H'],
                    ['Stop Log Set', 'Aluminum, pin-connected', '8', '24"×24" sections'],
                    ['I-Wall Panel', '24" stem, HP12×53 piles', '500 ft', '1.5" rebar cover'],
                    ['T-Wall Segment', 'Counterfort, 4000 psi', '300 ft', '30 ft high'],
                    ['Relief Well', '18" PVC, gravel-packed', '100', '100 ft deep, 50 gpm'],
                    ['VW Piezometer', 'SDI-12, 0–100 psi', '200', 'Foundation + levee'],
                    ['Settlement Monument', '4" PVC, invar rod', '150', 'Deep benchmark'],
                    ['SCADA PLC', 'AB ControlLogix', '2', 'Redundant hot-standby'],
                    ['HMI Panel', '19" touch, NEMA 4X', '6', 'Wonderware InTouch'],
                    ['Diesel Fuel Tank', 'Double-wall steel', '1', '50,000 gal, UL-142'],
                    ['Backup Generator', 'Cummins, auto-transfer', '2', '5 MW each'],
                    ['Earthen Fill', 'Zoned clay/sand/gravel', '1M cy', '3:1 slopes'],
                    ['Toe Drain Pipe', '24" RCP, perforated', '10 mi', 'Geotextile wrap'],
                    ['Chimney Filter', 'Graded gravel', '3 ft', '1.5× safety factor'],
                    ['LiDAR Kit', 'USGS-spec', '1', '5 cm accuracy'],
                    ['CWMS Interface', 'Red Hat Linux, REST', '1', 'USACE cloud'],
                    ['DMZ Firewall', 'Cisco ASA, L3.5', '2', 'Redundant, VPN'],
                    ['Floodwall Tie-Back', '1.25" DYWIDAG bars', '200', '80 ft embedment'],
                ]} />
            </S>
            <S t="6. Purdue Model Mapping" id="purdue">
                <T h={['Level', 'Components', 'Protocols']} r={[
                    ['L4 Enterprise', 'FEMA NFIP, USACE CWMS, ERP, reporting', 'HTTPS, REST, MQTT'],
                    ['L3.5 DMZ', 'Cisco ASA firewall, VPN concentrator', 'TLS 1.3, IPsec'],
                    ['L3 Operations', 'CWMS interface, SCADA server, historian', 'OPC UA, SQL, REST'],
                    ['L2 Supervisory', 'HMI dashboards, alarm management', 'Modbus TCP, SNMP'],
                    ['L1 Control', 'PLC (ControlLogix), VFD, pump controls', 'DNP3, Modbus RTU'],
                    ['L0 Process', 'Pumps, gates, piezos, float switches', '4-20mA, SDI-12, HART'],
                ]} />
                <p className="text-xs text-gray-500 mt-2 italic">Aligned with IEC 62443 zones and USACE cybersecurity requirements.</p>
            </S>
            <S t="7. Supporting Systems" id="supporting">
                <T h={['System', 'Description', 'Specification']} r={[
                    ['Fire Suppression', 'Diesel fuel area foam, control bldg', 'NFPA 11 + NFPA 72'],
                    ['HVAC', 'Pump station ventilation, dehumid', '50,000 cfm, N+1'],
                    ['Diesel Fuel', 'Day tank + bulk storage', '50,000 gal, 72-hr ops'],
                    ['Backup Power', 'Diesel generator, ATS', '2× 5 MW, auto-transfer'],
                    ['Physical Security', 'Fencing, CCTV, gate access', '24/7 unmanned'],
                    ['Communications', 'Radio, cellular backup', 'Licensed 450 MHz + LTE'],
                ]} />
            </S>
            <S t="8. Flood Control Utilities" id="utility">
                <T h={['Medium', 'System', 'Specification']} r={[
                    ['Stormwater', 'Interior collection system', 'Gravity drains, 100-yr design'],
                    ['Diesel Fuel', 'Engine drives + generator', '50,000 gal, UL-142 tank'],
                    ['Lube Oil', 'Pump bearings, gate actuators', 'ISO VG 68, 2,000 gal'],
                    ['Compressed Air', 'Gate actuator pneumatics', '100 psi, 200 cfm'],
                    ['Potable Water', 'Crew facilities, eye wash', 'Municipal supply'],
                ]} />
            </S>
            <S t="9. Data Flow Architecture" id="dataflow">
                <D>{
                    `┌──────────────────────────────────────────────────────────────────────┐
│ TIER 4 — ENTERPRISE    FEMA NFIP · USACE CWMS · State ERP          │
│  ── REST / MQTT ── daily reports + 24-72 hr forecasts ──────────────│
├──────────────────────────────────────────────────────────────────────┤
│ TIER 3 — OPERATIONS    SCADA Server · Historian · CWMS Interface   │
│  ── OPC UA / SQL ── 5,000 pts, 5-sec scan cycle ───────────────────│
├──────────────────────────────────────────────────────────────────────┤
│ TIER 2 — SUPERVISORY    HMI · Alarm Mgmt · Trend Displays         │
│  ── Modbus TCP ── pump status, gate position, water levels ─────────│
├──────────────────────────────────────────────────────────────────────┤
│ TIER 1 — CONTROL        PLC · VFD · Engine Controller              │
│  ── DNP3 / Modbus RTU ── auto-start, speed control, interlocks ─────│
├──────────────────────────────────────────────────────────────────────┤
│ TIER 0 — PROCESS        Pumps · Gates · Piezos · Float Switches    │
│  ── 4-20mA / SDI-12 ── continuous level, pressure, position ────────│
└──────────────────────────────────────────────────────────────────────┘`}</D>
            </S>
            <S t="10. References" id="references">
                <ul className="space-y-1.5 text-xs text-gray-500 font-mono">
                    <li>• USACE. (2020). <em>EM 1110-2-1913: Design and Construction of Levees.</em></li>
                    <li>• USACE. (2021). <em>EC 1110-2-6067: Levee Safety Program.</em></li>
                    <li>• USACE. (2018). <em>EM 1110-2-3104: Structural Design of Pumping Stations.</em></li>
                    <li>• FEMA. (2020). <em>44 CFR Part 65: Identification and Mapping of Special Hazard Areas.</em></li>
                    <li>• FEMA. (2019). <em>FEMA P-93: Federal Guidelines for Dam Safety.</em></li>
                    <li>• ASCE. (2021). <em>2021 Report Card for Infrastructure — Levees: Grade D.</em></li>
                    <li>• USACE. (2022). <em>National Levee Safety Guidelines.</em></li>
                    <li>• Deltares. (2017). <em>Levee Systems Integration: SOA Architecture.</em></li>
                </ul>
            </S>
            <S t="See Also" id="see-also">
                <div className="flex flex-wrap gap-3">
                    {[{ l: 'Dams Hub', h: '/wiki/dams', c: '#0EA5E9' }, { l: 'Hydroelectric Dam', h: '/wiki/dams/hydroelectric-dam', c: '#0EA5E9' }, { l: 'Navigation Lock', h: '/wiki/dams/navigation-lock', c: '#10B981' }, { l: 'Water Sector', h: '/wiki/water', c: '#06B6D4' }, { l: 'DAMS Sector', h: '/wiki/sectors/DAMS', c: '#0EA5E9' }].map(x => (<a key={x.l} href={x.h} className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-white/[0.04]" style={{ borderColor: `${x.c}30`, color: x.c }}>{x.l} →</a>))}
                </div>
            </S>
        </div>
    );
}
function S({ t, id, children }: { t: string; id: string; children: React.ReactNode }) { return (<section id={id} className="space-y-4 pt-8 border-t border-white/[0.04]"><h2 className="text-lg font-heading font-semibold text-white/90">{t}</h2>{children}</section>); }
function D({ children }: { children: string }) { return (<div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}><pre className="whitespace-pre leading-relaxed">{children}</pre></div>); }
function T({ h, r }: { h: string[]; r: string[][] }) { return (<div className="overflow-x-auto"><table className="w-full text-xs border-collapse"><thead><tr className="border-b border-white/[0.08] text-gray-500">{h.map(x => (<th key={x} className="text-left px-3 py-2 font-medium">{x}</th>))}</tr></thead><tbody className="text-gray-400 divide-y divide-white/[0.04]">{r.map((row, i) => (<tr key={i} className="hover:bg-white/[0.02]"><td className="px-3 py-2 text-[#3B82F6] font-medium whitespace-nowrap">{row[0]}</td>{row.slice(1).map((c, j) => (<td key={j} className="px-3 py-2">{c}</td>))}</tr>))}</tbody></table></div>); }
