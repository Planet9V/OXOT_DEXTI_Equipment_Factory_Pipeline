/**
 * Class A Office Tower Reference Architecture — Deep Dive.
 * @module wiki/commercial-facilities/office-tower/page
 */
export const metadata = {
    title: 'Class A Office Tower Reference Architecture — Wiki',
    description: 'TOGAF-based reference architecture for LEED-certified Class A office towers: VAV HVAC, DALI lighting, smart-building analytics.',
};
const C = '#8B5CF6';

export default function OfficeTowerPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <header className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]" style={{ background: C }} />
                    <span className="text-xs font-mono text-gray-500">COMM · Real Estate · Class A Office Tower</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">Class A Office Tower Reference Architecture</h1>
                <p className="text-sm text-gray-400 max-w-3xl leading-relaxed">
                    A 30–60+ story LEED-certified Class A office tower (500K–1.5M sq ft) requires 2,000–6,000 ton variable-speed chiller plant with waterside economiser, VAV AHUs on every 3–5 floors, DALI-2 lighting, tenant sub-metering, demand-controlled ventilation, fault detection &amp; diagnostics (FDD), and smart-building analytics platforms for Portfolio ESG compliance.
                </p>
            </header>

            <Section title="1. TOGAF Business Architecture" id="togaf">
                <h3 className="text-sm font-semibold text-white mb-2">Key Stakeholders</h3>
                <ul className="list-disc list-inside text-xs text-gray-400 space-y-1 mb-4">
                    <li><span className="text-[#8B5CF6] font-medium">Building Owner / REIT</span> — asset value, NOI, LEED certification</li>
                    <li><span className="text-[#8B5CF6] font-medium">Property Manager</span> — operations, tenant relations, lease admin</li>
                    <li><span className="text-[#8B5CF6] font-medium">Chief Engineer</span> — MEP maintenance, energy optimisation</li>
                    <li><span className="text-[#8B5CF6] font-medium">Tenants (50–100+)</span> — comfort, productivity, after-hours HVAC</li>
                    <li><span className="text-[#8B5CF6] font-medium">Fire Marshal / AHJ</span> — high-rise code, standpipe, voice evacuation</li>
                    <li><span className="text-[#8B5CF6] font-medium">USGBC / LEED</span> — energy, IEQ, water, commissioning credits</li>
                </ul>
                <h3 className="text-sm font-semibold text-white mb-2">Regulatory Framework</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead><tr className="border-b border-white/[0.08] text-gray-500">
                            <th className="text-left px-3 py-2 font-medium">Standard</th>
                            <th className="text-left px-3 py-2 font-medium">Scope</th>
                        </tr></thead>
                        <tbody className="text-gray-400">
                            {[['IBC High-Rise', 'Ch. 4/5 >75 ft provisions, fire command center'], ['NFPA 101', 'Business occupancy, means of egress, corridors'], ['NFPA 13/14', 'Combined sprinkler/standpipe, high-rise provisions'], ['NFPA 72', 'Addressable fire alarm, voice evacuation'], ['ASHRAE 90.1', 'Energy Standard — envelope, HVAC, lighting power density'], ['ASHRAE 62.1', 'Ventilation — DCV with CO₂ sensors, outdoor air rates'], ['ASHRAE G36', 'Guideline 36: high-performance sequences of operation'], ['LEED v4.1 O+M', 'Energy Star, IEQ, water efficiency, Cx credits'], ['DALI-2 / IEC 62386', 'Digital Addressable Lighting Interface standard'], ['ASME A17.1', 'Elevator safety code, monthly inspection']].map(([s, sc]) => (
                                <tr key={s} className="border-b border-white/[0.04]"><td className="px-3 py-2 font-medium whitespace-nowrap" style={{ color: C }}>{s}</td><td className="px-3 py-2">{sc}</td></tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="2. High-Level Design" id="design">
                <p className="text-sm text-gray-400 mb-4">Central chiller plant with waterside economiser, vertical duct risers to floor-level VAV AHUs, DALI-2 lighting zones, tenant sub-metering, and Niagara/Tridium BMS framework.</p>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`┌──────────────────────────────────────────────────────────┐
│         CLASS A OFFICE TOWER — VERTICAL SCHEMATIC        │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  FLOOR 50  ┌── VAV AHU ── DALI ── CO₂ ──┐              │
│  FLOOR 49  │   VAV boxes   Daylight      │  CHW         │
│    ...     │   w/ reheat   harvesting    │  RISER       │
│  FLOOR 26  │   DCV         Task/Amb      │  4-pipe      │
│            │                             │              │
│  FLOOR 25  ◄── MECHANICAL FLOOR ────►    │  ELEC        │
│            │   AHU · PUMPS · XFMR        │  RISER       │
│            │                             │  480V→       │
│  FLOOR 24  │   VAV AHU    TENANT METER   │  208/120V    │
│    ...     │   VAV boxes  kWh / BTU      │              │
│  FLOOR  2  │   DCV        submeter       │              │
│            │                             │              │
│  FLOOR  1  ├── LOBBY ── RETAIL ────┤     │              │
│  BASEMENT  ├── CENTRAL PLANT ──────┤     │              │
│            │  CHILLER (2-6K ton)   │     │              │
│            │  WSE · BOILER · GENSET│     │              │
│            │  FIRE CMD · ELEV MACH │     │              │
│            └───────────────────────┘     │              │
│                                          │              │
│  ELEVATORS: 12-24 cars (3-4 banks)      │              │
│  STANDPIPE + SPRINKLER RISER          ──┘              │
└──────────────────────────────────────────────────────────┘`}</pre>
                </div>
            </Section>

            <Section title="3. Detailed Technical Description" id="technical">
                <h3 className="text-sm font-semibold text-white mb-2">3.1 Central Plant</h3>
                <ul className="list-disc list-inside text-xs text-gray-400 space-y-1 mb-4">
                    <li>Chillers: 3–6 × 500–1,500 ton centrifugal, VSD, oil-free magnetic bearing, 0.50 kW/ton</li>
                    <li>Waterside economiser: plate-and-frame HX, 40% operating hours free cooling</li>
                    <li>Cooling towers: 6–10 cells, VFD fans, low-drift (&lt;0.0005%), basin heaters</li>
                    <li>Boilers: 2–4 × 5–10 MMBtu/h, condensing, 95% efficiency</li>
                    <li>CHW pumps: VPF, VFD, ΔP reset, header-mounted differential sensor</li>
                </ul>
                <h3 className="text-sm font-semibold text-white mb-2">3.2 Floor-Level HVAC</h3>
                <ul className="list-disc list-inside text-xs text-gray-400 space-y-1 mb-4">
                    <li>VAV AHU: 10–20 units (1 per 3–5 floors), 10,000–50,000 CFM, MERV-13/15, EC motors</li>
                    <li>VAV boxes: 500–2,000 qty, pressure-independent, hot water reheat coils</li>
                    <li>DCV: CO₂ sensors (400–1,000 ppm), outdoor air reset per ASHRAE 62.1</li>
                    <li>Sequences: ASHRAE Guideline 36 high-performance SOO, supply air temp reset</li>
                </ul>
                <h3 className="text-sm font-semibold text-white mb-2">3.3 Lighting / DALI</h3>
                <ul className="list-disc list-inside text-xs text-gray-400 space-y-1 mb-4">
                    <li>DALI-2 luminaires: 5,000–15,000 fixtures, tunable white, daylight harvesting</li>
                    <li>Occupancy/vacancy sensors: 1 per 200 sq ft open office, 1 per room</li>
                    <li>LPD: ≤ 0.7 W/sq ft per ASHRAE 90.1, 50% reduction with daylight dimming</li>
                    <li>Shade control: automated roller shades, solar sensor, BMS integration</li>
                </ul>
                <h3 className="text-sm font-semibold text-white mb-2">3.4 Electrical / Emergency Power</h3>
                <ul className="list-disc list-inside text-xs text-gray-400 space-y-1 mb-4">
                    <li>MV service: 13.8 kV → 480 V substations (4–8), 2,500–5,000 kVA each</li>
                    <li>Tenant metering: kWh + BTU sub-meters per floor/tenant, BACnet/IP</li>
                    <li>Generators: 2–4 × 1–3 MW diesel, paralleling, 48-hour fuel</li>
                    <li>UPS: 500 kVA IT/BMS, 200 kVA fire command center</li>
                </ul>
                <h3 className="text-sm font-semibold text-white mb-2">3.5 Smart Building Analytics</h3>
                <ul className="list-disc list-inside text-xs text-gray-400 space-y-1">
                    <li>FDD: fault detection &amp; diagnostics, 50+ rules, automated work orders</li>
                    <li>Energy: ENERGY STAR score, real-time benchmarking, LL97/BERDO compliance</li>
                    <li>Haystack/Brick: semantic tagging for 20,000+ BMS points, ML-ready</li>
                    <li>Indoor air quality: real-time CO₂, PM2.5, VOC dashboards per WELL/RESET</li>
                </ul>
            </Section>

            <Section title="4. Process Diagrams" id="process">
                <h3 className="text-sm font-semibold text-white mb-2">4.1 VAV Air Handling Sequence (G36)</h3>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`OA Damper ──► Mixed Air ──► Filter MERV-15 ──► Cooling Coil ──► Supply Fan
  │            │                                   │              │
CO₂ Sensor   Economiser                      CHW Valve         VFD (EC)
(DCV reset)  (free cooling                   (0-10V mod.)      SAT Reset
              <55°F OAT)                                       55-65°F
                                                                │
                                                          ┌─────┴─────┐
                                                          ▼           ▼
                                                    VAV Box       VAV Box
                                                    w/reheat      w/reheat
                                                    (P-IND)       (P-IND)`}</pre>
                </div>
                <h3 className="text-sm font-semibold text-white mt-6 mb-2">4.2 Tenant Sub-Metering</h3>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`FLOOR PANEL ──► kWh Meter ──► BACnet/IP ──► BMS ──► Tenant Portal
                   │                                     │
BTU Meter ─────────┘ (CHW usage)                    LEED EA Credit
                                                    LL97 Compliance
                                                    ESG Reporting`}</pre>
                </div>
                <h3 className="text-sm font-semibold text-white mt-6 mb-2">4.3 Smart Building Stack</h3>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`SENSORS (20,000+)  Temp · CO₂ · PM2.5 · Occ · lux · kWh · BTU
  │  BACnet MS/TP, DALI-2, Modbus, 4-20mA           1-5 sec
  ▼
BMS (Niagara/Tridium)  DDC · FDD · Scheduling · Trending
  │  BACnet/IP, Haystack/Brick tagging               5-15 sec
  ▼
ANALYTICS PLATFORM  FDD Rules · ML Optimisation · Energy Star
  │  OPC UA, MQTT, REST API                          <200 ms
  ▼
ENTERPRISE  CMMS · LEED Dashboard · Tenant Portal · ESG Cloud`}</pre>
                </div>
            </Section>

            <Section title="5. Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2">Scaled for a 45-story, 1M sq ft Class A tower, LEED Gold.</p>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead><tr className="border-b border-white/[0.08] text-gray-500">
                            <th className="text-left px-3 py-2 font-medium">Equipment</th>
                            <th className="text-left px-3 py-2 font-medium">Spec</th>
                            <th className="text-left px-3 py-2 font-medium">Qty</th>
                            <th className="text-left px-3 py-2 font-medium">Rating</th>
                        </tr></thead>
                        <tbody className="text-gray-400">
                            {[['Centrifugal Chiller', 'Oil-free, VSD, 0.50 kW/ton', '3–6', '500–1,500 ton'], ['Waterside Economiser', 'Plate-and-frame HX', '1–2', '2,000 ton cap.'], ['Cooling Tower Cell', 'Low-drift, VFD, FRP', '6–10', '500 ton/cell'], ['Condensing Boiler', 'Natural gas, 95% eff', '2–4', '5–10 MMBtu/h'], ['VAV AHU', 'EC motor, MERV-15, G36', '10–20', '10K–50K CFM'], ['VAV Box', 'P-IND, HW reheat', '500–2,000', '200–2,000 CFM'], ['DALI-2 Luminaire', 'Tunable white, LED', '5,000–15,000', '20–40W each'], ['CO₂ Sensor', 'NDIR, DCV control', '200–500', '0–2,000 ppm'], ['Tenant kWh Meter', 'BACnet/IP, revenue grade', '50–150', 'Per tenant'], ['BTU Meter', 'CHW flow + ΔT', '50–100', 'Per floor'], ['Diesel Generator', 'Paralleling, N+1', '2–4', '1–3 MW'], ['Unit Substation', 'Dry-type transformer', '4–8', '2,500–5,000 kVA'], ['Fire Pump', 'Vertical turbine', '2–4', '1,000–2,000 GPM'], ['Standpipe Riser', 'Class I, wet, combined', '2–4', '100 PSI @ top'], ['Elevator Machine', 'MRL gearless, regen, 3-4 banks', '12–24', '4,000 lb/car'], ['FACP', 'Addressable, voice evac', '2–4', 'Per zone'], ['UPS System', 'Online, BMS/IT/fire', '2–4', '200–500 kVA'], ['BMS Controller', 'BACnet/IP, per floor', '20–50', '1,000 pts/ctrlr'], ['Occ/Vacancy Sensor', 'PIR + ultrasonic combo', '2,000–5,000', 'Per 200 sq ft'], ['Automated Shade', 'Solar sensor, BMS link', '2,000–5,000', 'Per window']].map(([e, s, q, r]) => (
                                <tr key={e} className="border-b border-white/[0.04]"><td className="px-3 py-2 font-medium whitespace-nowrap" style={{ color: C }}>{e}</td><td className="px-3 py-2">{s}</td><td className="px-3 py-2">{q}</td><td className="px-3 py-2">{r}</td></tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="6. Purdue Model Mapping" id="purdue">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead><tr className="border-b border-white/[0.08] text-gray-500">
                            <th className="text-left px-3 py-2 font-medium">Level</th>
                            <th className="text-left px-3 py-2 font-medium">Components</th>
                            <th className="text-left px-3 py-2 font-medium">Protocols</th>
                        </tr></thead>
                        <tbody className="text-gray-400">
                            {[['L4 Enterprise', 'REIT portfolio, LEED dashboard, ESG cloud, tenant portal', 'REST API, MQTT, Haystack'], ['L3.5 DMZ', 'OPC UA GW, MQTT broker, Haystack API, firewall', 'OPC UA, TLS 1.3'], ['L3 Operations', 'EMS, FDD platform, historian, CMMS, BMS workstation', 'BACnet/IP, SQL, MQTT'], ['L2 Supervisory', 'Floor DDC, DALI gateway, FACP, access control', 'BACnet/IP, DALI-2, Modbus TCP'], ['L1 Control', 'VAV box controller, VFDs, chiller PLC, shade motor', 'BACnet MS/TP, Modbus RTU'], ['L0 Process', 'Temp/CO₂/PM2.5 sensors, VAV dampers, valves, meters', '4–20 mA, 0–10 V, DALI-2']].map(([l, c, p]) => (
                                <tr key={l} className="border-b border-white/[0.04]"><td className="px-3 py-2 font-medium whitespace-nowrap" style={{ color: C }}>{l}</td><td className="px-3 py-2">{c}</td><td className="px-3 py-2">{p}</td></tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="7. Supporting Systems" id="supporting">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead><tr className="border-b border-white/[0.08] text-gray-500"><th className="text-left px-3 py-2 font-medium">System</th><th className="text-left px-3 py-2 font-medium">Description</th><th className="text-left px-3 py-2 font-medium">Spec</th></tr></thead>
                        <tbody className="text-gray-400">
                            {[['Standpipe/Sprinkler', 'Combined NFPA 13/14, wet pipe', '100 PSI @ top'], ['Voice Evacuation', 'Phased, floor-by-floor, NFPA 72', 'Ch.24'], ['Smoke Control', 'Stairwell press., core exhaust', 'NFPA 92'], ['Fire Command Center', 'Ground floor, annunciator panel', 'IBC high-rise'], ['Elevator Recall', 'Phase I/II, 3–4 banks, fire car', 'ASME A17.1'], ['LEED Commissioning', 'Cx agent, FPT, seasonal testing', 'LEED v4.1'], ['After-Hours HVAC', 'Tenant-triggered, time-of-use billing', 'BMS scheduled']].map(([s, d, sp]) => (
                                <tr key={s} className="border-b border-white/[0.04]"><td className="px-3 py-2 font-medium whitespace-nowrap" style={{ color: C }}>{s}</td><td className="px-3 py-2">{d}</td><td className="px-3 py-2">{sp}</td></tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="8. Water, Air &amp; Gas Systems" id="utility">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead><tr className="border-b border-white/[0.08] text-gray-500"><th className="text-left px-3 py-2 font-medium">Medium</th><th className="text-left px-3 py-2 font-medium">System</th><th className="text-left px-3 py-2 font-medium">Spec</th></tr></thead>
                        <tbody className="text-gray-400">
                            {[['Domestic Water', 'Booster pumps, PRV zones every 15 floors', '80 PSI/zone'], ['Rainwater Harvest', 'Collection, filtration, toilet flushing', 'LEED WE credit'], ['Natural Gas', 'Boilers, tenant kitchenettes', '500+ SCFH'], ['Cooling Tower Makeup', 'Chemical treatment, blowdown control', '3–5 cycles'], ['Sanitary', 'Greywater recovery (LEED), ejector pumps', 'Per local code']].map(([m, s, sp]) => (
                                <tr key={m} className="border-b border-white/[0.04]"><td className="px-3 py-2 font-medium whitespace-nowrap" style={{ color: C }}>{m}</td><td className="px-3 py-2">{s}</td><td className="px-3 py-2">{sp}</td></tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="9. Data Flow Architecture" id="dataflow">
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`FIELD (20,000+)  Temp · CO₂ · Occ · lux · VAV · Valve · Meter
  │  BACnet MS/TP, DALI-2, Modbus RTU, 4-20mA      1-5 sec
  ▼
FLOOR DDC (20-50)  VAV AHU · DALI GW · Meters · FACP
  │  BACnet/IP, DALI-2, Modbus TCP                  5-15 sec
  ▼
CENTRAL BMS  Niagara/Tridium · FDD · Historian · Energy Mgmt
  │  BACnet/IP, OPC UA, Haystack tagging            20,000+ pts
  ▼
DMZ (L3.5)  OPC UA GW · MQTT Broker · Haystack API · Firewall
  │  OPC UA, MQTT, TLS 1.3, REST                   <200 ms
  ▼
ENTERPRISE  REIT Portfolio · LEED Dashboard · Tenant Portal · ESG`}</pre>
                </div>
            </Section>

            <Section title="10. References" id="references">
                <ol className="list-decimal list-inside space-y-1 text-xs text-gray-400">
                    <li>ICC. (2021). <em>IBC High-Rise Provisions</em>. ICC.</li>
                    <li>ASHRAE. (2022). <em>Standard 90.1: Energy</em>. ASHRAE.</li>
                    <li>ASHRAE. (2022). <em>Standard 62.1: Ventilation</em>. ASHRAE.</li>
                    <li>ASHRAE. (2021). <em>Guideline 36: High-Performance Sequences</em>. ASHRAE.</li>
                    <li>USGBC. (2023). <em>LEED v4.1 O+M: Building Operations</em>. USGBC.</li>
                    <li>IEC. (2020). <em>IEC 62386: DALI-2</em>. IEC.</li>
                    <li>NFPA. (2022). <em>NFPA 13/14/72</em>. NFPA.</li>
                    <li>Project Haystack. (2023). <em>Haystack 4.0 Specification</em>. Project Haystack.</li>
                </ol>
            </Section>

            <section className="space-y-3">
                <h2 className="text-lg font-heading font-semibold text-white">See Also</h2>
                <div className="flex flex-wrap gap-2">
                    {[{ label: 'Commercial Facilities Hub', href: '/wiki/commercial-facilities' }, { label: 'High-Rise Hotel', href: '/wiki/commercial-facilities/high-rise-hotel' }, { label: 'Shopping Center', href: '/wiki/commercial-facilities/shopping-center' }, { label: 'DEXPI Equipment', href: '/wiki/equipment' }, { label: 'CISA COMM', href: '/wiki/sectors/COMM' }].map((l) => (
                        <a key={l.href} href={l.href} className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-white/[0.04]" style={{ borderColor: `${C}30`, color: C }}>{l.label}</a>
                    ))}
                </div>
            </section>
        </div>
    );
}

function Section({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
    return (<section id={id} className="space-y-4 scroll-mt-24"><h2 className="text-xl font-heading font-semibold text-white">{title}</h2>{children}</section>);
}
