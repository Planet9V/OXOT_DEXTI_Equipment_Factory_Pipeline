/**
 * High-Rise Hotel Reference Architecture — Deep Dive.
 * @module wiki/commercial-facilities/high-rise-hotel/page
 */
export const metadata = {
    title: 'High-Rise Hotel Reference Architecture — Wiki',
    description: 'TOGAF-based reference architecture for high-rise hotels: central plant, vertical HVAC, fire/life safety, guest IT, and PMS integration.',
};
const C = '#3B82F6';

export default function HighRiseHotelPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <header className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]" style={{ background: C }} />
                    <span className="text-xs font-mono text-gray-500">COMM · Lodging · High-Rise Hotel</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">High-Rise Hotel Reference Architecture</h1>
                <p className="text-sm text-gray-400 max-w-3xl leading-relaxed">
                    A 20–60+ story hotel tower with 500–1,500 guest rooms requires vertical MEP distribution, 4-pipe fan coil units for individual room climate control, standpipe/sprinkler protection per NFPA 13/14, elevator groups, guest-room energy management, keycard access, IPTV/HSIA, and PMS integration across hospitality and building systems.
                </p>
            </header>

            <Section title="1. TOGAF Business Architecture" id="togaf">
                <h3 className="text-sm font-semibold text-white mb-2">Key Stakeholders</h3>
                <ul className="list-disc list-inside text-xs text-gray-400 space-y-1 mb-4">
                    <li><span className="text-[#3B82F6] font-medium">Hotel Owner / REIT</span> — capital investment, asset management</li>
                    <li><span className="text-[#3B82F6] font-medium">Management Company / Brand</span> — operations, brand standards, PIP compliance</li>
                    <li><span className="text-[#3B82F6] font-medium">Chief Engineer</span> — MEP operations, preventive maintenance</li>
                    <li><span className="text-[#3B82F6] font-medium">Fire Marshal / AHJ</span> — high-rise fire code, standpipe, voice evacuation</li>
                    <li><span className="text-[#3B82F6] font-medium">Elevator Inspector</span> — ASME A17.1 compliance, annual inspections</li>
                    <li><span className="text-[#3B82F6] font-medium">Health Department</span> — pool/spa water quality, kitchen sanitation</li>
                </ul>
                <h3 className="text-sm font-semibold text-white mb-2">Regulatory Framework</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead><tr className="border-b border-white/[0.08] text-gray-500">
                            <th className="text-left px-3 py-2 font-medium">Standard</th>
                            <th className="text-left px-3 py-2 font-medium">Scope</th>
                        </tr></thead>
                        <tbody className="text-gray-400">
                            {[['IBC High-Rise', 'Ch. 4/5 provisions: >75 ft, fire command center, standpipe'], ['NFPA 101 Ch.28/29', 'New/existing hotels — means of egress, corridors'], ['NFPA 13/14', 'Sprinkler + standpipe for high-rise, combined systems'], ['NFPA 72', 'Addressable fire alarm with voice evacuation'], ['ASHRAE 90.1/62.1', 'Energy + ventilation for guestrooms and common areas'], ['ASME A17.1', 'Elevator code — Phase I/II recall, monthly inspection'], ['ADA / ADAAG', 'Accessible rooms (10%), paths of travel, signage'], ['Local Health Code', 'Pool/spa, kitchen, legionella management']].map(([s, sc]) => (
                                <tr key={s} className="border-b border-white/[0.04]"><td className="px-3 py-2 font-medium whitespace-nowrap" style={{ color: C }}>{s}</td><td className="px-3 py-2">{sc}</td></tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="2. High-Level Design" id="design">
                <p className="text-sm text-gray-400 mb-4">Central plant at basement/podium level serves hotel tower via vertical risers. Each floor has a mechanical closet with BMS controllers, fan coil units, and fire alarm devices.</p>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`┌─────────────────────────────────────────────────────┐
│         HIGH-RISE HOTEL — VERTICAL SCHEMATIC        │
├─────────────────────────────────────────────────────┤
│                                                     │
│  FLOOR 60  ┌─── FCU ─── FCU ─── FCU ───┐           │
│  FLOOR 59  │    FCU     FCU     FCU     │           │
│    ...     │    ...     ...     ...     │           │
│  FLOOR 31  │    FCU     FCU     FCU     │           │
│            │                            │           │
│  FLOOR 30  ◄── MECHANICAL FLOOR ──►     │           │
│            │   AHU · PUMPS · ELEC       │           │
│            │                            │           │
│  FLOOR 29  │    FCU     FCU     FCU     │  CHW      │
│    ...     │    ...     ...     ...     │  RISER    │
│  FLOOR  2  │    FCU     FCU     FCU     │  4-pipe   │
│            │                            │           │
│  FLOOR  1  ├── LOBBY · RESTAURANT ──┤   │           │
│  BASEMENT  ├── CENTRAL PLANT ───────┤   │           │
│            │  CHILLER · BOILER      │   │           │
│            │  GENSETS · FIRE PUMP   │   │           │
│            │  FIRE CMD CENTER       │   │           │
│            └────────────────────────┘   │           │
│                                         │           │
│  ELEVATOR GROUPS: 6-12 cars             │           │
│  STANDPIPE/SPRINKLER RISER            ──┘           │
│  ELEC RISER: 480V → FLOOR PANELS                   │
└─────────────────────────────────────────────────────┘`}</pre>
                </div>
            </Section>

            <Section title="3. Detailed Technical Description" id="technical">
                <h3 className="text-sm font-semibold text-white mb-2">3.1 Central Plant</h3>
                <ul className="list-disc list-inside text-xs text-gray-400 space-y-1 mb-4">
                    <li>Chillers: 2–4 × 400–1,000 ton centrifugal, VSD, R-134a, 0.55 kW/ton</li>
                    <li>Cooling towers: 4–6 cells, rooftop or podium, VFD fans, basin heaters</li>
                    <li>Boilers: 2–3 × 5–10 MMBtu/h fire-tube, dual fuel (gas/oil), condensing</li>
                    <li>Domestic water: booster pumps 200–500 GPM, pressure zones every 15 floors</li>
                </ul>
                <h3 className="text-sm font-semibold text-white mb-2">3.2 Vertical HVAC Distribution</h3>
                <ul className="list-disc list-inside text-xs text-gray-400 space-y-1 mb-4">
                    <li>Fan coil units: 500–1,500 qty (1 per room), 4-pipe, 600–1,200 CFM, DDC controller</li>
                    <li>Guestroom controllers: occupancy sensor, thermostat, keycard interlock, deadband ±1°F</li>
                    <li>Corridor AHU: 100% OA DOAS units (every 3–5 floors), MERV-13</li>
                    <li>CHW risers: 4-pipe (CHW supply/return + HW supply/return), 150 PSI rated</li>
                </ul>
                <h3 className="text-sm font-semibold text-white mb-2">3.3 Electrical / Emergency Power</h3>
                <ul className="list-disc list-inside text-xs text-gray-400 space-y-1 mb-4">
                    <li>MV service: 13.8 kV → 480 V unit substations (2–4), 2,000–3,000 kVA each</li>
                    <li>Floor panels: 208Y/120 V, 400 A, guestroom lighting/outlets/HVAC</li>
                    <li>Generators: 2–4 × 500–2,000 kW diesel, paralleling gear, 48-hr fuel</li>
                    <li>UPS: 200 kVA for PMS/PBX/network core, 500 kVA for fire command center</li>
                </ul>
                <h3 className="text-sm font-semibold text-white mb-2">3.4 Fire / Life Safety</h3>
                <ul className="list-disc list-inside text-xs text-gray-400 space-y-1 mb-4">
                    <li>Standpipe: Class I, 100 PSI @ top outlet, wet riser, fire dept. connections</li>
                    <li>Sprinklers: wet pipe per NFPA 13 (quick-response heads in rooms), combined system</li>
                    <li>Fire alarm: addressable FACP, voice evacuation (phased), NFPA 72</li>
                    <li>Stairwell pressurisation: 0.05 in. WC, propeller fans at top, 4 hr rated</li>
                    <li>Elevator recall: Phase I/II, fire service access, dedicated fire elevator</li>
                    <li>Fire command center: ground floor, direct fire dept. access, FACP annunciator</li>
                </ul>
                <h3 className="text-sm font-semibold text-white mb-2">3.5 Guest-Facing IT / AV</h3>
                <ul className="list-disc list-inside text-xs text-gray-400 space-y-1">
                    <li>Keycard locks: RFID/NFC, BLE mobile key, OSDP v2, powered by battery + PoE</li>
                    <li>IPTV: IP multicast, 300+ channels, Chromecast/Apple AirPlay casting</li>
                    <li>HSIA: Wi-Fi 6, in-room AP per 2 rooms, 100+ Mbps, 802.1X/RADIUS</li>
                    <li>PBX/VoIP: SIP trunks, in-room IP phones, wake-up call automation</li>
                    <li>PMS integration: Oracle Opera / Mews, 2-way BMS interface (check-in → HVAC on)</li>
                </ul>
            </Section>

            <Section title="4. Process Diagrams" id="process">
                <h3 className="text-sm font-semibold text-white mb-2">4.1 Guestroom HVAC Control</h3>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`PMS Check-In ──► Guestroom Controller ──► FCU ON (setpoint 72°F)
                       │
                  Occupancy Sensor ──► Occupied: ±1°F deadband
                       │                Unoccupied: setback 78°F/65°F
                  Keycard Switch  ──► Card Out: FCU to eco mode
                       │
                  Room Thermostat ──► Guest override ±4°F
                       │
                  BMS (BACnet MS/TP) ──► Central Energy Dashboard`}</pre>
                </div>
                <h3 className="text-sm font-semibold text-white mt-6 mb-2">4.2 Vertical Fire Safety</h3>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`SMOKE DETECTOR ──► FACP (Addressable) ──► VOICE EVACUATION (phased)
HEAT DETECTOR        │                      │
PULL STATION         ▼                      ▼
                STAIRWELL PRESS.      ELEVATOR RECALL (Phase I)
                (0.05 in. WC)         FIRE PUMP START (1500GPM)
                     │                      │
                FIRE COMMAND CENTER (Ground Floor)
                AHU SHUTDOWN · DAMPER CLOSURE · FIRE DEPT ANNUNCIATOR`}</pre>
                </div>
                <h3 className="text-sm font-semibold text-white mt-6 mb-2">4.3 Guest IT Stack</h3>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`GUEST DEVICE ──► Wi-Fi 6 AP ──► Floor Switch (PoE++) ──► Core (10G)
                                                              │
IPTV STB ──► IP Multicast ──────────────────────────────── IPTV Head-End
                                                              │
KEYCARD ──► RFID/NFC Lock ──► Access Controller ──► PMS ──► BMS
                                                              │
PBX/VoIP ──► SIP Trunk ──► IP PBX ──────────────────── Brand Cloud`}</pre>
                </div>
            </Section>

            <Section title="5. Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2">Scaled for a 40-story, 800-room luxury hotel.</p>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead><tr className="border-b border-white/[0.08] text-gray-500">
                            <th className="text-left px-3 py-2 font-medium">Equipment</th>
                            <th className="text-left px-3 py-2 font-medium">Spec</th>
                            <th className="text-left px-3 py-2 font-medium">Qty</th>
                            <th className="text-left px-3 py-2 font-medium">Rating</th>
                        </tr></thead>
                        <tbody className="text-gray-400">
                            {[['Centrifugal Chiller', 'VSD, R-134a, 0.55 kW/ton', '2–4', '400–1,000 ton'], ['Cooling Tower Cell', 'VFD, basin heaters, FRP', '4–6', '400 ton/cell'], ['Boiler', 'Fire-tube, dual fuel', '2–3', '5–10 MMBtu/h'], ['Fan Coil Unit', '4-pipe, ceiling cassette', '500–1,500', '600–1,200 CFM'], ['Guestroom Controller', 'DDC, occ sensor, keycard', '500–1,500', 'Per room'], ['DOAS AHU', '100% OA, MERV-13', '8–12', '5,000–20,000 CFM'], ['Diesel Generator', 'Paralleling gear', '2–4', '500–2,000 kW'], ['Unit Substation', 'Dry-type transformer', '2–4', '2,000–3,000 kVA'], ['Fire Pump', 'Vertical turbine', '2–4', '750–2,000 GPM'], ['Standpipe Riser', 'Class I, wet, combined', '2–4', '100 PSI @ top'], ['Elevator Machine', 'MRL gearless, regen', '6–12', '3,500 lb/car'], ['FACP', 'Addressable, voice evac', '2', 'Per zone'], ['Keycard Lock', 'RFID/NFC, BLE mobile', '500–1,500', 'Per door'], ['Wi-Fi AP', '802.11ax, in-room', '250–750', '1 per 2 rooms'], ['IPTV STB', '4K, Chromecast', '500–1,500', 'Per room'], ['Water Booster', 'VFD, pressure zones', '2–4', '200–500 GPM'], ['UPS', 'Online, PMS/network', '2', '200–500 kVA'], ['BMS Controller', 'BACnet/IP, floor level', '20–40', 'Per floor'], ['CCTV Camera', '4K, corridor/entrance', '200–500', 'ONVIF'], ['Stairwell Press. Fan', 'Propeller, roof mount', '4–8', '5,000 CFM']].map(([e, s, q, r]) => (
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
                            {[['L4 Enterprise', 'Brand cloud, revenue management, ESG reporting', 'REST API, MQTT, SFTP'], ['L3.5 DMZ', 'OPC UA GW, MQTT broker, PMS API gateway', 'OPC UA, TLS 1.3'], ['L3 Operations', 'PMS (Opera/Mews), central BMS, energy dashboard', 'BACnet/IP, SQL, SIP'], ['L2 Supervisory', 'Floor BMS controllers, access control server, IPTV head-end', 'BACnet/IP, Modbus TCP, IGMP'], ['L1 Control', 'Guestroom DDC, fan coil valves, VFDs, elevator controller', 'BACnet MS/TP, Modbus RTU'], ['L0 Process', 'FCU, sensors, keycard locks, thermostats, fire detectors', '4–20 mA, RFID/NFC, 0–10 V']].map(([l, c, p]) => (
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
                            {[['Standpipe/Sprinkler', 'Combined NFPA 13/14, wet pipe', '100PSI@top, QR heads'], ['Voice Evacuation', 'Phased, floor-by-floor', 'NFPA 72 Ch.24'], ['Smoke Control', 'Stairwell pressurisation, atrium exhaust', 'NFPA 92, 0.05inWC'], ['Fire Command Center', 'Ground floor, FACP annunciator', 'IBC high-rise req.'], ['Elevator Recall', 'Phase I/II, fire service car', 'ASME A17.1'], ['Guest Energy Mgmt', 'Keycard interlock, PMS sync', 'ASHRAE 90.1'], ['Pool/Spa Plant', 'Dehumidification, chemical dosing', 'Health dept.']].map(([s, d, sp]) => (
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
                            {[['Domestic Hot Water', 'Plate HX, recirc pumps, legionella management', '140°F storage, 120°F delivery'], ['Domestic Cold Water', 'Booster pumps, PRV stations every 15 floors', '80 PSI per zone'], ['Natural Gas', 'Boilers, kitchen cooking, laundry', '1,000+ SCFH'], ['Sanitary/Grease', 'Grease interceptors, FOG management', 'Local health code'], ['Pool/Spa', 'Filtration, chemical dosing, heat pumps', 'Per health dept.']].map(([m, s, sp]) => (
                                <tr key={m} className="border-b border-white/[0.04]"><td className="px-3 py-2 font-medium whitespace-nowrap" style={{ color: C }}>{m}</td><td className="px-3 py-2">{s}</td><td className="px-3 py-2">{sp}</td></tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="9. Data Flow Architecture" id="dataflow">
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`FIELD (500-1,500 rooms)  FCU · Lock · Sensor · Thermostat
  │  BACnet MS/TP, RFID/NFC, 4-20mA              1-5 sec
  ▼
FLOOR CONTROLLERS (20-40)  DDC · Access · IPTV · Wi-Fi
  │  BACnet/IP, Modbus TCP, IGMP                  5-15 sec
  ▼
CENTRAL SYSTEMS  PMS · BMS · FACP · Elevator · IPTV Head-End
  │  BACnet/IP, SIP, SQL, 10 Gbps                50,000+ pts
  ▼
DMZ (L3.5)  OPC UA GW · API Gateway · MQTT Broker
  │  OPC UA, TLS 1.3, MQTT                       <200 ms
  ▼
ENTERPRISE  Brand Cloud · Revenue Mgmt · ESG · Loyalty`}</pre>
                </div>
            </Section>

            <Section title="10. References" id="references">
                <ol className="list-decimal list-inside space-y-1 text-xs text-gray-400">
                    <li>ICC. (2021). <em>International Building Code — High-Rise Provisions</em>. ICC.</li>
                    <li>NFPA. (2021). <em>NFPA 101 Ch.28/29: Hotels and Dormitories</em>. NFPA.</li>
                    <li>NFPA. (2022). <em>NFPA 13/14: Sprinklers and Standpipes</em>. NFPA.</li>
                    <li>NFPA. (2022). <em>NFPA 72: Fire Alarm Code</em>. NFPA.</li>
                    <li>ASHRAE. (2022). <em>Standard 62.1: Ventilation</em>. ASHRAE.</li>
                    <li>ASHRAE. (2022). <em>Standard 90.1: Energy</em>. ASHRAE.</li>
                    <li>ASME. (2022). <em>A17.1/CSA B44: Safety Code for Elevators</em>. ASME.</li>
                    <li>The Open Group. (2022). <em>TOGAF 9.2</em>. The Open Group.</li>
                </ol>
            </Section>

            <section className="space-y-3">
                <h2 className="text-lg font-heading font-semibold text-white">See Also</h2>
                <div className="flex flex-wrap gap-2">
                    {[{ label: 'Commercial Facilities Hub', href: '/wiki/commercial-facilities' }, { label: 'Casino Resort', href: '/wiki/commercial-facilities/casino-resort' }, { label: 'Office Tower', href: '/wiki/commercial-facilities/office-tower' }, { label: 'DEXPI Equipment', href: '/wiki/equipment' }, { label: 'CISA COMM', href: '/wiki/sectors/COMM' }].map((l) => (
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
