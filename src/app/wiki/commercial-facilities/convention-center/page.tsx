/**
 * Convention Center / Exhibition Hall Reference Architecture — Deep Dive.
 * @module wiki/commercial-facilities/convention-center/page
 */
export const metadata = {
    title: 'Convention Center Reference Architecture — Wiki',
    description: 'TOGAF-based reference architecture for convention centers covering MEP, BMS, fire/life safety, and exhibition services.',
};
const C = '#F97316';

export default function ConventionCenterPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <header className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]" style={{ background: C }} />
                    <span className="text-xs font-mono text-gray-500">COMM · Entertainment &amp; Media · Convention Center</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">Convention Center / Exhibition Hall Reference Architecture</h1>
                <p className="text-sm text-gray-400 max-w-3xl leading-relaxed">
                    A 500,000+ sq ft convention center is a high-bay, column-free assembly occupancy requiring massive HVAC capacity (5,000+ tons cooling), dual utility feeds, modular exhibition power/data services, and integrated BMS spanning 10,000+ control points.
                </p>
            </header>

            <Section title="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-400 mb-3">Stakeholder analysis and regulatory framework for large-format exhibition facilities under TOGAF ADM Phase B.</p>
                <h3 className="text-sm font-semibold text-white mb-2">Key Stakeholders</h3>
                <ul className="list-disc list-inside text-xs text-gray-400 space-y-1 mb-4">
                    <li><span className="text-[#F97316] font-medium">Venue Owner/Authority</span> — municipal convention authority or private operator</li>
                    <li><span className="text-[#F97316] font-medium">Event Promoters/Exhibitors</span> — require flexible power, data, and rigging services</li>
                    <li><span className="text-[#F97316] font-medium">AV/IT Integrators</span> — structured cabling, Wi-Fi, DAS, digital signage</li>
                    <li><span className="text-[#F97316] font-medium">Fire Marshal / AHJ</span> — NFPA 101 Assembly occupancy, smoke control</li>
                    <li><span className="text-[#F97316] font-medium">City Building Department</span> — IBC permits, ASHRAE 90.1, ADA</li>
                    <li><span className="text-[#F97316] font-medium">Food Service Operators</span> — NFPA 96 kitchen exhaust, grease interceptors</li>
                </ul>
                <h3 className="text-sm font-semibold text-white mb-2">Regulatory Framework</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead><tr className="border-b border-white/[0.08] text-gray-500">
                            <th className="text-left px-3 py-2 font-medium">Standard</th>
                            <th className="text-left px-3 py-2 font-medium">Scope</th>
                        </tr></thead>
                        <tbody className="text-gray-400">
                            {[['IBC 2021', 'Assembly occupancy A-3, structural, egress'], ['NFPA 101', 'Life Safety Code — means of egress, crowd management'], ['NFPA 13', 'Sprinkler systems — wet pipe, preaction, ESFR'], ['NFPA 72', 'Fire alarm — addressable, voice evacuation, mass notification'], ['NFPA 92', 'Smoke control — pressurisation and exhaust'], ['ASHRAE 90.1', 'Energy efficiency — envelope, HVAC, lighting'], ['ASHRAE 62.1', 'Ventilation for acceptable indoor air quality'], ['ADA', 'Accessibility — ramps, paths of travel, signage']].map(([s, sc]) => (
                                <tr key={s} className="border-b border-white/[0.04]"><td className="px-3 py-2 font-medium whitespace-nowrap" style={{ color: C }}>{s}</td><td className="px-3 py-2">{sc}</td></tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="2. High-Level Design" id="design">
                <p className="text-sm text-gray-400 mb-4">Centralised-plant / distributed-floor topology with dual 4160 V utility feeds, N+1 chillers, and paralleled emergency generators.</p>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`UTILITY 1 ──►┐                      ┌──► UTILITY 2
             ▼                      ▼
       ┌──────────┐          ┌──────────┐
       │  4160V   │◄─ TIE ─►│  4160V   │
       │ SWGR-A   │          │ SWGR-B   │
       └────┬─────┘          └────┬─────┘
            │                     │
   ┌────────┼─────────┬───────────┤
   ▼        ▼         ▼          ▼
┌──────┐ ┌──────┐ ┌────────┐ ┌────────┐
│CH 1T │ │CH 1T │ │480V    │ │480V    │
│CHILLER│ │CHILLER│ │2000kVA│ │2000kVA│
└──┬───┘ └──┬───┘ └───┬────┘ └───┬────┘
   └────┬────┘        └─────┬────┘
        ▼                   ▼
  CHW LOOP 42/56°F    480V/208V DIST
  AHU · FCU · Coils   LIGHTING · EXHIB PWR

GENSET A (2MW) ──► ATS ◄── GENSET B (2MW)
                   │
              EPSS: FIRE PUMP · EXIT · ELEV`}</pre>
                </div>
                <p className="text-[11px] text-gray-600 mt-2">Figure 1 — Simplified one-line for a 500,000 sq ft convention centre with dual feeds and N+1 chillers.</p>
            </Section>

            <Section title="3. Detailed Technical Description" id="technical">
                <h3 className="text-sm font-semibold text-white mb-2">3.1 Central Plant</h3>
                <ul className="list-disc list-inside text-xs text-gray-400 space-y-1 mb-4">
                    <li>Centrifugal chillers: 4–6 × 1,000–2,000 ton, magnetic bearing, 0.55 kW/ton, VFD</li>
                    <li>Cooling towers: 6–8 cells × 1,000 ton/cell, FRP, induced draft, VFD fans</li>
                    <li>Hot water boilers: 2–4 × 10 MMBtu/h fire-tube, natural gas, 85% eff, 180 °F</li>
                    <li>CHW pumps: 4 primary + 8 secondary × 1,500 GPM, VFD, ΔP reset</li>
                </ul>
                <h3 className="text-sm font-semibold text-white mb-2">3.2 Electrical Distribution</h3>
                <ul className="list-disc list-inside text-xs text-gray-400 space-y-1 mb-4">
                    <li>MV switchgear: 4160 V, 4,000 A main bus, metal-clad, arc-resistant (25 cal/cm²)</li>
                    <li>Transformers: 10–20 × 2,000 kVA dry-type, 480 V delta to 208Y/120 V</li>
                    <li>Generators: 2–4 × 2 MW diesel, Tier 4, 72-hour fuel, paralleling gear</li>
                    <li>UPS: 2 × 1 MVA modular online, 15-minute ride-through</li>
                </ul>
                <h3 className="text-sm font-semibold text-white mb-2">3.3 Fire / Life Safety</h3>
                <ul className="list-disc list-inside text-xs text-gray-400 space-y-1 mb-4">
                    <li>Fire pumps: 4–6 × 1,500 GPM @ 100 PSI, electric + diesel jockey</li>
                    <li>Sprinklers: wet pipe (offices), preaction (IT), ESFR K-25 (exhibit halls)</li>
                    <li>FACP: addressable, 10,000+ points, NFPA 72 voice evacuation</li>
                    <li>Smoke control: stairwell pressurisation 0.05 in. WC, 10 ACH atrium exhaust</li>
                </ul>
                <h3 className="text-sm font-semibold text-white mb-2">3.4 BMS / Controls</h3>
                <ul className="list-disc list-inside text-xs text-gray-400 space-y-1 mb-4">
                    <li>DDC controllers: 200+ BACnet/IP and MS/TP devices, 10,000+ points</li>
                    <li>SCADA: redundant HMI servers, historian, alarming, trends</li>
                    <li>Actuators: VFDs 50–500 HP, modulating valves 0–10 V, damper actuators</li>
                </ul>
                <h3 className="text-sm font-semibold text-white mb-2">3.5 Exhibition Services</h3>
                <ul className="list-disc list-inside text-xs text-gray-400 space-y-1">
                    <li>Floor power: 50–100 × 200 A/3Φ (208 V) exhibition panels, NEMA 3R</li>
                    <li>AHUs: 20–40 × 10,000–100,000 CFM, DX coils, MERV-13, EC motors</li>
                    <li>AV: DMX512 lighting, DALI dimming, 10G fibre AVB/AVoIP</li>
                    <li>Compressed air: 2 × 1,000 SCFM @ 125 PSI oil-free screw</li>
                </ul>
            </Section>

            <Section title="4. Process Diagrams" id="process">
                <h3 className="text-sm font-semibold text-white mb-2">4.1 Chilled Water Flow</h3>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`Cooling Tower ──► CW Pump 2000GPM ──► Chiller 1000T ──► CHW Pump 1500GPM ──► AHU Coils
   1000 ton        50ft HD           0.55 kW/ton        42°F Supply         Return 56°F
   85°F Return     ◄────────────────  95°F CW  ◄────────  ΔT = 14°F`}</pre>
                </div>
                <h3 className="text-sm font-semibold text-white mt-6 mb-2">4.2 Electrical Distribution</h3>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`UTILITY ──► 4160V SWGR ──► 2000kVA XFMR ──► 480V MDP ──► LIGHTING / EXHIB / MECH
               │                                  │
           GENSET 2MW                         ATS (<10s)
               └──────────► EPSS BUS ◄────────────┘
                            FIRE PUMP · EXIT · ELEVATOR`}</pre>
                </div>
                <h3 className="text-sm font-semibold text-white mt-6 mb-2">4.3 BMS Data Flow</h3>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`L4 ERP/CMMS/Dashboard ◄── REST API ──┐
L3.5 OPC UA GW / MQTT Broker         │ TLS 1.3
L3 SCADA HMI / Historian             │ BACnet/IP
L2 DDC Panels / FACP / Lighting      │ BACnet MS/TP
L1 PLC / VFD / Relay                 │ Modbus RTU
L0 Sensors / Actuators ──────────────┘ 4-20mA
   10,000+ points · 5s polling · 99.99% uptime`}</pre>
                </div>
            </Section>

            <Section title="5. Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2">Scaled for 500,000 sq ft, 5,000-ton peak cooling.</p>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead><tr className="border-b border-white/[0.08] text-gray-500">
                            <th className="text-left px-3 py-2 font-medium">Equipment</th>
                            <th className="text-left px-3 py-2 font-medium">Spec</th>
                            <th className="text-left px-3 py-2 font-medium">Qty</th>
                            <th className="text-left px-3 py-2 font-medium">Rating</th>
                        </tr></thead>
                        <tbody className="text-gray-400">
                            {[['Centrifugal Chiller', 'Magnetic bearing, VFD', '4–6', '1,000–2,000 ton'], ['Cooling Tower Cell', 'FRP, induced draft, VFD', '6–8', '1,000 ton/cell'], ['Hot Water Boiler', 'Fire-tube, natural gas', '2–4', '10 MMBtu/h'], ['AHU (VAV)', 'Double-wall, EC, MERV-13', '20–40', '10K–100K CFM'], ['Diesel Generator', 'Tier 4, paralleling', '2–4', '2 MW'], ['MV Switchgear', 'Metal-clad, arc-resistant', '2', '4160V/4,000A'], ['Dry-Type Transformer', 'Copper-wound', '10–20', '2,000 kVA'], ['Fire Pump', 'Vertical turbine, diesel+jockey', '4–6', '1,500 GPM@100PSI'], ['UPS System', 'Modular online, Li-ion', '2', '1 MVA'], ['CHW Pump (Primary)', 'End-suction, VFD', '4', '1,500 GPM'], ['CHW Pump (Secondary)', 'End-suction, ΔP reset', '8', '1,500 GPM'], ['CW Pump', 'End-suction, VFD', '6', '2,000 GPM'], ['FACP', 'Addressable, networked', '4', '10,000 pts'], ['Smoke Damper', '1.5-hr fire-rated', '100+', '24×48 in.'], ['Exhibition Panel', 'NEMA 3R, flush-floor', '50–100', '200A/208V/3Φ'], ['VFD', 'HVAC-rated', '50+', '50–500 HP'], ['BACnet Router', 'IP/MS-TP gateway', '5–10', '1,000 dev'], ['Fibre Switch', 'L3, PoE++', '10+', '48-port 10/40G'], ['Emergency Lighting', 'Central inverter, LED', '20+', '10 kW, 90-min'], ['Preaction Valve', 'Double-interlock', '10', '250 PSI'], ['Air Compressor', 'Oil-free screw', '2', '1,000 SCFM']].map(([e, s, q, r]) => (
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
                            {[['L4 Enterprise', 'ERP, CMMS, energy dashboard, exhibitor portal', 'REST API, OPC UA, MQTT'], ['L3.5 DMZ', 'OPC UA gateway, MQTT broker, firewall', 'OPC UA, TLS 1.3'], ['L3 Operations', 'SCADA HMI, historian, alarm server', 'BACnet/IP, SQL'], ['L2 Supervisory', 'DDC panels, FACP, lighting controller', 'BACnet MS/TP, Modbus TCP'], ['L1 Control', 'PLC (chiller), VFDs, protective relays', 'Modbus RTU, LON'], ['L0 Process', 'Temp/press/flow sensors, actuators', '4–20 mA, HART, 0–10 V']].map(([l, c, p]) => (
                                <tr key={l} className="border-b border-white/[0.04]"><td className="px-3 py-2 font-medium whitespace-nowrap" style={{ color: C }}>{l}</td><td className="px-3 py-2">{c}</td><td className="px-3 py-2">{p}</td></tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-[11px] text-gray-600 mt-2">Aligned to ISA-95 / IEC 62443. L3.5 DMZ enforces IT/OT segmentation.</p>
            </Section>

            <Section title="7. Supporting Systems" id="supporting">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead><tr className="border-b border-white/[0.08] text-gray-500">
                            <th className="text-left px-3 py-2 font-medium">System</th>
                            <th className="text-left px-3 py-2 font-medium">Description</th>
                            <th className="text-left px-3 py-2 font-medium">Spec</th>
                        </tr></thead>
                        <tbody className="text-gray-400">
                            {[['Fire Suppression', 'Wet pipe, preaction, ESFR K-25', 'NFPA 13'], ['HVAC', '20–40 AHUs, VAV/CV, DCV, CO₂', 'ASHRAE 62.1'], ['UPS', 'Modular online, Li-ion', '2×1 MVA, 15-min'], ['Emergency Gen', 'Diesel, paralleling gear', '2–4 × 2 MW'], ['Lightning', 'Air terminals, down conductors', 'NFPA 780'], ['Physical Security', 'Access control, CCTV, turnstiles', 'OSDP v2, ONVIF'], ['Smoke Control', 'Stairwell press., atrium exhaust', 'NFPA 92']].map(([s, d, sp]) => (
                                <tr key={s} className="border-b border-white/[0.04]"><td className="px-3 py-2 font-medium whitespace-nowrap" style={{ color: C }}>{s}</td><td className="px-3 py-2">{d}</td><td className="px-3 py-2">{sp}</td></tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="8. Water, Air &amp; Gas Systems" id="utility">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead><tr className="border-b border-white/[0.08] text-gray-500">
                            <th className="text-left px-3 py-2 font-medium">Medium</th>
                            <th className="text-left px-3 py-2 font-medium">System</th>
                            <th className="text-left px-3 py-2 font-medium">Spec</th>
                        </tr></thead>
                        <tbody className="text-gray-400">
                            {[['Domestic Water', 'Booster pumps, backflow, hot water recirc', '500–1,000 GPM'], ['Compressed Air', 'Oil-free screw, dryers, floor drops', '2×1,000 SCFM@125PSI'], ['Natural Gas', 'Boilers, kitchens, dock heating', '500–1,000 SCFH'], ['Stormwater', 'Detention vaults, separators', 'EPA NPDES'], ['Sanitary', 'Grease interceptors, ejector pumps', 'Local FOG limits']].map(([m, s, sp]) => (
                                <tr key={m} className="border-b border-white/[0.04]"><td className="px-3 py-2 font-medium whitespace-nowrap" style={{ color: C }}>{m}</td><td className="px-3 py-2">{s}</td><td className="px-3 py-2">{sp}</td></tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="9. Data Flow Architecture" id="dataflow">
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`FIELD DEVICES (10,000+)  Sensors · Actuators · VFDs · Meters
  │  4-20mA, HART, Modbus RTU, LON              1-5 sec poll
  ▼
DDC CONTROLLERS (200+)  AHU · Chiller · Lighting · FACP
  │  BACnet MS/TP, Modbus TCP, DALI             5-15 sec poll
  ▼
SUPERVISORY (SCADA/BMS)  HMI · Historian · Alarm Engine
  │  BACnet/IP, 1 Gbps Ethernet                 10,000+ points
  ▼
DMZ (L3.5)  OPC UA Server · MQTT Broker · Firewall
  │  OPC UA, MQTT, TLS 1.3                      <200 ms latency
  ▼
ENTERPRISE  CMMS · Energy Dashboard · Exhibitor Portal · REST API`}</pre>
                </div>
            </Section>

            <Section title="10. References" id="references">
                <ol className="list-decimal list-inside space-y-1 text-xs text-gray-400">
                    <li>International Code Council. (2021). <em>International Building Code</em>. ICC.</li>
                    <li>NFPA. (2022). <em>NFPA 13: Sprinkler Systems</em>. NFPA.</li>
                    <li>NFPA. (2022). <em>NFPA 72: Fire Alarm and Signaling Code</em>. NFPA.</li>
                    <li>NFPA. (2021). <em>NFPA 101: Life Safety Code</em>. NFPA.</li>
                    <li>ASHRAE. (2022). <em>Standard 90.1: Energy</em>. ASHRAE.</li>
                    <li>ASHRAE. (2022). <em>Standard 62.1: Ventilation</em>. ASHRAE.</li>
                    <li>NFPA. (2023). <em>NFPA 92: Smoke Control</em>. NFPA.</li>
                    <li>The Open Group. (2022). <em>TOGAF 9.2</em>. The Open Group.</li>
                    <li>ISA. (2019). <em>ISA-95/IEC 62264</em>. ISA.</li>
                </ol>
            </Section>

            <section className="space-y-3">
                <h2 className="text-lg font-heading font-semibold text-white">See Also</h2>
                <div className="flex flex-wrap gap-2">
                    {[{ label: 'Commercial Facilities Hub', href: '/wiki/commercial-facilities' }, { label: 'Casino Resort', href: '/wiki/commercial-facilities/casino-resort' }, { label: 'Sports Stadium', href: '/wiki/commercial-facilities/sports-stadium' }, { label: 'DEXPI Equipment', href: '/wiki/equipment' }, { label: 'CISA COMM', href: '/wiki/sectors/COMM' }].map((l) => (
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
