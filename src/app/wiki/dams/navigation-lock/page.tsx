/**
 * Navigation Lock — Deep Dive Wiki Article.
 * 1,200×110 ft Ohio River-class lock with miter gates, HPU, AIS.
 * @module wiki/dams/navigation-lock/page
 */
export const metadata = { title: 'Navigation Lock — DAMS Deep Dive', description: 'TOGAF reference architecture for navigation locks: miter gates, filling/emptying culverts, HPU, vessel traffic control, USACE operations.' };

const C = '#10B981';
export default function NavigationLockPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <header className="space-y-3">
                <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]" style={{ background: C }} /><span className="text-xs font-mono text-gray-500">DAMS · NAVIGATION · LOCK CHAMBER</span></div>
                <h1 className="text-3xl font-heading font-bold text-white">Navigation Lock</h1>
                <p className="text-sm text-gray-400 max-w-3xl">1,200×110 ft Ohio River-class lock chamber with miter gates, lateral filling/emptying culverts, hydraulic power units, and integrated vessel traffic control. Enables 630M tons/yr of inland waterway commerce.</p>
                <div className="flex flex-wrap gap-2">{['33 CFR', 'WRDA', 'EM 1110-2-2607', 'EM 1110-2-2602', 'USCG', 'AIS'].map(t => (<span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded border border-[#10B981]/30 text-[#10B981]">{t}</span>))}</div>
            </header>
            <S t="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-300 leading-relaxed">The U.S. inland waterway system spans <span className="text-[#10B981] font-medium">12,000 navigable miles</span> with 236 lock chambers at 193 sites. Inland waterways move 630M tons of cargo annually — $400B in commerce — at 1/10 the cost of rail and 1/40 the cost of trucking.</p>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside mt-2">
                    <li><span className="text-[#10B981] font-medium">USACE</span> — Lock construction, operation, maintenance (Inland Waterways Trust Fund)</li>
                    <li><span className="text-[#10B981] font-medium">MARAD</span> — Maritime Administration, waterway policy, vessel standards</li>
                    <li><span className="text-[#10B981] font-medium">USCG</span> — Vessel safety, navigation rules, AIS requirements</li>
                    <li><span className="text-[#10B981] font-medium">Towing Industry</span> — Barge operators, pilots, scheduling</li>
                    <li><span className="text-[#10B981] font-medium">Congress/WRDA</span> — Water Resources Development Act authorization and funding</li>
                </ul>
                <T h={['Standard', 'Scope']} r={[['33 CFR Part 207', 'Regulations for locks and dams, vessel transit rules'], ['WRDA', 'Authorization for lock construction, modernization'], ['EM 1110-2-2607', 'Planning and design of navigation locks'], ['EM 1110-2-2602', 'Planning and design of navigation dams'], ['USCG 33 CFR 164', 'Navigation safety, AIS carriage requirements'], ['PIANC WG 106', 'Navigation lock design criteria (international)']]} />
            </S>
            <S t="2. High-Level Design" id="design">
                <p className="text-sm text-gray-300 leading-relaxed">A 1,200×110 ft lock chamber with upper and lower miter gates, lateral filling/emptying culverts, hydraulic power units, guide walls, and vessel traffic management system.</p>
                <D>{
                    `┌──────────────────────────────────────────────────────────────────────────┐
│               NAVIGATION LOCK (1,200 × 110 ft)                         │
│                                                                          │
│  Upper Pool (El. 455')                                                   │
│      │                                                                   │
│  Upper Guide Wall (1,200 ft) ──── Upper Approach                        │
│      │                                                                   │
│  ┌───┴──────────────────────────────────────────────┐                   │
│  │  Upper Miter Gates (2 leaves, 62 ft each)        │                   │
│  │      │                                            │                   │
│  │  Lock Chamber (1,200' L × 110' W × 35' lift)     │                   │
│  │  │  Lateral Fill/Empty Culverts (8' × 10')       │                   │
│  │  │  Side-port manifolds (200 ports per wall)     │                   │
│  │  │  Floating mooring bitts (4 per wall)          │                   │
│  │      │                                            │                   │
│  │  Lower Miter Gates (2 leaves, 62 ft each)        │                   │
│  └──────────────────────────────────────────────────┘                   │
│      │                                                                   │
│  Lower Guide Wall (600 ft) ──── Lower Approach                         │
│      │                                                                   │
│  Lower Pool (El. 420')                                                   │
│                                                                          │
│  Control Tower: Operator cabin, CCTV, VHF Ch.14, AIS, traffic signals  │
│  HPU: 2× 200 HP, 3,000 psi, nitrogen accumulators                     │
└──────────────────────────────────────────────────────────────────────────┘`}</D>
            </S>
            <S t="3. Detailed Technical Description" id="technical">
                <h3 className="text-sm font-semibold text-white/80 mb-2">3.1 Miter Gates</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>2 leaves per gate set, 62 ft each, ASTM A572 Gr50 steel skin plate</li>
                    <li>Quoin bearing: bronze bushing, self-aligning, 500-ton reaction</li>
                    <li>Miter bearing: steel contact, rubber seal, watertight at 35 ft head</li>
                    <li>Operating machinery: hydraulic cylinder (10" bore, 20 ft stroke) or strut arm</li>
                    <li>Opening/closing time: 2 minutes, PLC-sequenced with proximity switches</li>
                </ul>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">3.2 Filling/Emptying System</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>Lateral culverts: 8'×10' reinforced concrete, 200 side ports per wall</li>
                    <li>Reverse tainter valves: 4 per culvert, hydraulic cylinder, 3-min fill cycle</li>
                    <li>Fill time: 8–12 minutes for 35 ft lift, hawser force &lt;5 tons (USACE criteria)</li>
                    <li>Emergency closure: gravity-drop valve, manual backup</li>
                </ul>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">3.3 Hydraulic Power Units</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>2× HPU: 200 HP each, 3,000 psi, variable displacement piston pumps</li>
                    <li>Nitrogen accumulators: 4× 20-gal, 2,500 psi pre-charge</li>
                    <li>Manifold: proportional directional valves, pressure compensated</li>
                    <li>Oil reservoir: 500 gal, ISO VG 46, kidney-loop filtration (3μ)</li>
                </ul>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">3.4 Traffic Control</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>Marine VHF Ch.14 (lock channel), radio communication with tow pilots</li>
                    <li>AIS: Class A transponder, AtoN virtual aids to navigation</li>
                    <li>Traffic signals: red/amber/green semaphore, USCG standard</li>
                    <li>CCTV: 12+ cameras, IR illuminators, pan-tilt-zoom, NVR recording</li>
                    <li>LPMS: Lock Performance Monitoring System — lockage data to USACE</li>
                </ul>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">3.5 Structural / Civil</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>Concrete monoliths: 4,000 psi, reinforced, founded on bedrock/piles</li>
                    <li>Guide walls: sheet pile cells, concrete cap, 1,200 ft upper / 600 ft lower</li>
                    <li>Floating mooring bitts: recessed, 50-ton bollard, roller chain</li>
                    <li>Guard wall: extends upstream for ice/debris protection</li>
                </ul>
            </S>
            <S t="4. Process Diagrams" id="process">
                <h3 className="text-sm font-semibold text-white/80 mb-2">4.1 Upstream Lockage Cycle</h3>
                <D>{
                    `Vessel Arrives (lower pool) → VHF Hail → Traffic Signal GREEN
    │
Lower Gates OPEN → Vessel Enters Chamber → Moor to Floating Bitts
    │
Lower Gates CLOSE → Verify Seal (proximity switches)
    │
Fill Valves OPEN → Lateral Culverts Fill Chamber (8-12 min, 35 ft lift)
    │
Water Level = Upper Pool → Upper Gates OPEN → Vessel Departs
    │
Total Lockage Time: 20-45 minutes (single cut, 15-barge tow)`}</D>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">4.2 Downstream Lockage Cycle</h3>
                <D>{
                    `Vessel Arrives (upper pool) → VHF Hail → Traffic Signal GREEN
    │
Upper Gates OPEN → Vessel Enters → Moor to Floating Bitts
    │
Upper Gates CLOSE → Empty Valves OPEN → Drain Chamber (8-12 min)
    │
Water Level = Lower Pool → Lower Gates OPEN → Vessel Departs`}</D>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">4.3 Maintenance Dewatering</h3>
                <D>{
                    `Scheduled Outage → Notify Navigation (30-90 day notice)
    │
Close Bulkhead Gates (upper + lower) → Pump Down Chamber
    │
Dewatering Pumps (4× 5,000 gpm) → Inspect: Gates, Sills, Walls, Culverts
    │
Concrete Repair → Cathodic Protection → Gate Overhaul → Refill → Resume`}</D>
            </S>
            <S t="5. Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2 italic">1,200×110 ft Ohio River-class lock with 35 ft lift.</p>
                <T h={['Equipment', 'Specification', 'Qty', 'Rating']} r={[
                    ['Miter Gate Leaf', 'A572 Gr50, 62 ft span', '4', 'Upper + lower sets'],
                    ['Gate Hydraulic Cyl', '10" bore, 20 ft stroke', '8', '2 per leaf'],
                    ['Reverse Tainter Valve', 'Hydraulic, 3-min cycle', '8', '8\'×10\' culvert'],
                    ['HPU', '200 HP, 3,000 psi', '2', 'Variable piston pump'],
                    ['N₂ Accumulator', '20 gal, 2,500 psi pre-charge', '4', 'Bladder type'],
                    ['Floating Mooring Bitt', '50-ton bollard, roller chain', '8', '4 per wall'],
                    ['Bulkhead Gate (Maint)', 'Stop-log style, crane-set', '2', 'Upper + lower sets'],
                    ['Dewatering Pump', 'Submersible, electric', '4', '5,000 gpm each'],
                    ['SCADA PLC', 'AB ControlLogix L8', '2', 'Redundant pair'],
                    ['HMI (Control Tower)', '24" display, NEMA 4', '4', 'Operator workstation'],
                    ['CCTV Camera', 'PTZ, IR, 4K', '12', 'NVR, 30-day storage'],
                    ['VHF Radio', 'Marine Ch.14, 25W', '2', 'Base + mobile'],
                    ['AIS Transponder', 'Class A + virtual AtoN', '1', 'USCG compliant'],
                    ['Traffic Signal', 'Red/Amber/Green, USCG', '4', 'Upper + lower, both sides'],
                    ['Guide Wall (Sheet Pile)', 'Steel cells, concrete cap', '1,800 ft', 'Upper 1,200 + lower 600'],
                    ['Diesel Generator', 'Standby power', '1', '500 kW, ATS'],
                    ['Battery UPS', '125 VDC, gate controls', '2', '400 Ah, 4-hr'],
                    ['Hydraulic Oil Tank', 'ISO VG 46, kidney-loop', '2', '500 gal each'],
                    ['Lock Sill', 'Cast steel, replaceable', '2', 'Upper + lower'],
                    ['Quoin Block', 'Bronze bearing, self-align', '4', '500-ton reaction'],
                    ['Proximity Switch', 'Gate position sensing', '16', '4 per leaf'],
                ]} />
            </S>
            <S t="6. Purdue Model Mapping" id="purdue">
                <T h={['Level', 'Components', 'Protocols']} r={[
                    ['L4 Enterprise', 'USACE LPMS, OMNI, scheduling', 'HTTPS, REST, LPMS API'],
                    ['L3.5 DMZ', 'Firewall, historian mirror', 'TLS 1.3, VPN'],
                    ['L3 Operations', 'Lock control system, historian', 'OPC UA, SQL'],
                    ['L2 Supervisory', 'HMI, CCTV, traffic control', 'Modbus TCP, ONVIF'],
                    ['L1 Control', 'PLC, HPU controller, VFD', 'DNP3, EtherNet/IP'],
                    ['L0 Process', 'Gate cylinders, valves, bitts, sensors', '4-20mA, discrete I/O'],
                ]} />
            </S>
            <S t="7. Supporting Systems" id="supporting">
                <T h={['System', 'Description', 'Specification']} r={[
                    ['Fire Suppression', 'HPU room, control bldg', 'Dry chemical + NFPA 72'],
                    ['HVAC', 'Control tower heating/cooling', 'Split system, 5-ton'],
                    ['Diesel Generator', 'Standby power, ATS', '500 kW, 72-hr fuel'],
                    ['Battery UPS', 'Gate controls, SCADA', '125 VDC, 400 Ah'],
                    ['Physical Security', 'Fencing, CCTV, access ctrl', '24/7 USACE operated'],
                    ['Ice Management', 'Bubbler system, debris boom', 'Compressed air, 100 psi'],
                ]} />
            </S>
            <S t="8. Lock Utility Systems" id="utility">
                <T h={['Medium', 'System', 'Specification']} r={[
                    ['Hydraulic Oil', 'HPU, gate actuators', 'ISO VG 46, 1,000 gal total'],
                    ['Compressed Air', 'Bubbler (ice mgmt)', '100 psi, 500 cfm'],
                    ['Diesel Fuel', 'Generator, mobile equip', '5,000 gal, UL-142'],
                    ['Potable Water', 'Control tower, crew', 'Municipal/well'],
                    ['Wastewater', 'Sanitary, oily water', 'Septic + OWS'],
                ]} />
            </S>
            <S t="9. Data Flow Architecture" id="dataflow">
                <D>{
                    `┌──────────────────────────────────────────────────────────────────────┐
│ TIER 4 — ENTERPRISE    USACE LPMS · OMNI · Scheduling System      │
│  ── REST / LPMS API ── lockage data, vessel tracking ───────────────│
├──────────────────────────────────────────────────────────────────────┤
│ TIER 3 — OPERATIONS    Lock Control Server · Historian · CCTV NVR  │
│  ── OPC UA / SQL ── 2,000 pts, 1-sec scan ─────────────────────────│
├──────────────────────────────────────────────────────────────────────┤
│ TIER 2 — SUPERVISORY    HMI · Traffic Signal · AIS Display        │
│  ── Modbus TCP / ONVIF ── gate position, vessel tracking ───────────│
├──────────────────────────────────────────────────────────────────────┤
│ TIER 1 — CONTROL        PLC · HPU Controller · VFD                 │
│  ── EtherNet/IP / DNP3 ── gate sequence, valve timing ──────────────│
├──────────────────────────────────────────────────────────────────────┤
│ TIER 0 — PROCESS        Cylinders · Valves · Bitts · Sensors      │
│  ── 4-20mA / discrete I/O ── position, pressure, level ─────────────│
└──────────────────────────────────────────────────────────────────────┘`}</D>
            </S>
            <S t="10. References" id="references">
                <ul className="space-y-1.5 text-xs text-gray-500 font-mono">
                    <li>• USACE. (2006). <em>EM 1110-2-2607: Planning and Design of Navigation Locks.</em></li>
                    <li>• USACE. (2004). <em>EM 1110-2-2602: Planning and Design of Navigation Dams.</em></li>
                    <li>• PIANC. (2009). <em>WG 106: Navigation Lock Design Criteria.</em></li>
                    <li>• USCG. (2022). <em>33 CFR Part 164: Navigation Safety Regulations.</em></li>
                    <li>• USACE. (2020). <em>Lock Performance Monitoring System (LPMS) Manual.</em></li>
                    <li>• ASCE. (2021). <em>2021 Infrastructure Report Card — Inland Waterways: Grade D+.</em></li>
                    <li>• USACE. (2018). <em>Inland Marine Transportation Systems (IMTS) Capital Plan.</em></li>
                    <li>• WRDA. (2022). <em>Water Resources Development Act — Navigation Provisions.</em></li>
                </ul>
            </S>
            <S t="See Also" id="see-also">
                <div className="flex flex-wrap gap-3">
                    {[{ l: 'Dams Hub', h: '/wiki/dams', c: '#0EA5E9' }, { l: 'Hydroelectric Dam', h: '/wiki/dams/hydroelectric-dam', c: '#0EA5E9' }, { l: 'Levee System', h: '/wiki/dams/levee-system', c: '#3B82F6' }, { l: 'Transportation', h: '/wiki/sectors/TRAN', c: '#0E7490' }, { l: 'DAMS Sector', h: '/wiki/sectors/DAMS', c: '#0EA5E9' }].map(x => (<a key={x.l} href={x.h} className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-white/[0.04]" style={{ borderColor: `${x.c}30`, color: x.c }}>{x.l} →</a>))}
                </div>
            </S>
        </div>
    );
}
function S({ t, id, children }: { t: string; id: string; children: React.ReactNode }) { return (<section id={id} className="space-y-4 pt-8 border-t border-white/[0.04]"><h2 className="text-lg font-heading font-semibold text-white/90">{t}</h2>{children}</section>); }
function D({ children }: { children: string }) { return (<div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}><pre className="whitespace-pre leading-relaxed">{children}</pre></div>); }
function T({ h, r }: { h: string[]; r: string[][] }) { return (<div className="overflow-x-auto"><table className="w-full text-xs border-collapse"><thead><tr className="border-b border-white/[0.08] text-gray-500">{h.map(x => (<th key={x} className="text-left px-3 py-2 font-medium">{x}</th>))}</tr></thead><tbody className="text-gray-400 divide-y divide-white/[0.04]">{r.map((row, i) => (<tr key={i} className="hover:bg-white/[0.02]"><td className="px-3 py-2 text-[#10B981] font-medium whitespace-nowrap">{row[0]}</td>{row.slice(1).map((c, j) => (<td key={j} className="px-3 py-2">{c}</td>))}</tr>))}</tbody></table></div>); }
