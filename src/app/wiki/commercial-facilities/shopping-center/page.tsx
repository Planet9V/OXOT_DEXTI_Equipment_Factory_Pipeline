/**
 * Regional Shopping Center Reference Architecture — Deep Dive.
 * @module wiki/commercial-facilities/shopping-center/page
 */
export const metadata = {
    title: 'Regional Shopping Center Reference Architecture — Wiki',
    description: 'TOGAF-based reference architecture for enclosed regional malls: HVAC, fire/life safety, atrium smoke control, parking, and physical security.',
};
const C = '#EC4899';

export default function ShoppingCenterPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <header className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]" style={{ background: C }} />
                    <span className="text-xs font-mono text-gray-500">COMM · Retail · Regional Shopping Center</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">Regional Shopping Center Reference Architecture</h1>
                <p className="text-sm text-gray-400 max-w-3xl leading-relaxed">
                    An enclosed regional mall (500K–1.5M sq ft GLA) with 4–5 anchor stores and 100–200 inline tenants requires central/distributed HVAC, atrium smoke control per NFPA 92, parking garage CO/NO₂ ventilation, comprehensive CCTV/LPR, tenant sub-metering, and POS/digital signage integration.
                </p>
            </header>

            <Section title="1. TOGAF Business Architecture" id="togaf">
                <h3 className="text-sm font-semibold text-white mb-2">Key Stakeholders</h3>
                <ul className="list-disc list-inside text-xs text-gray-400 space-y-1 mb-4">
                    <li><span className="text-[#EC4899] font-medium">Mall Owner / REIT</span> — asset value, NOI, tenant mix optimisation</li>
                    <li><span className="text-[#EC4899] font-medium">Property Manager</span> — operations, common area maintenance (CAM)</li>
                    <li><span className="text-[#EC4899] font-medium">Anchor Tenants (4–5)</span> — department stores, independently climate-controlled</li>
                    <li><span className="text-[#EC4899] font-medium">Inline Tenants (100–200)</span> — retail, F&amp;B, entertainment — CAM allocation</li>
                    <li><span className="text-[#EC4899] font-medium">Fire Marshal / AHJ</span> — mercantile occupancy, atrium smoke control</li>
                    <li><span className="text-[#EC4899] font-medium">Health Department</span> — food court, restaurant exhaust, grease interceptors</li>
                </ul>
                <h3 className="text-sm font-semibold text-white mb-2">Regulatory Framework</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead><tr className="border-b border-white/[0.08] text-gray-500">
                            <th className="text-left px-3 py-2 font-medium">Standard</th>
                            <th className="text-left px-3 py-2 font-medium">Scope</th>
                        </tr></thead>
                        <tbody className="text-gray-400">
                            {[['IBC 2021', 'Mercantile M occupancy, mall provisions, atria'], ['NFPA 101', 'Life Safety — merch. occupancy, covered mall'], ['NFPA 13', 'Sprinkler — wet pipe, ESFR for high-bay anchors'], ['NFPA 72', 'Fire alarm — addressable, mass notification'], ['NFPA 92', 'Smoke control — atrium exhaust, mechanical'], ['NFPA 96', 'Commercial kitchen exhaust (food court, restaurants)'], ['ASHRAE 90.1', 'Energy — envelope, lighting LPD, HVAC efficiency'], ['ASHRAE 62.1', 'Ventilation — CO₂ DCV for common areas'], ['ADA', 'Accessible paths, parking, restrooms, signage']].map(([s, sc]) => (
                                <tr key={s} className="border-b border-white/[0.04]"><td className="px-3 py-2 font-medium whitespace-nowrap" style={{ color: C }}>{s}</td><td className="px-3 py-2">{sc}</td></tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="2. High-Level Design" id="design">
                <p className="text-sm text-gray-400 mb-4">Distributed rooftop/central plant topology with independent anchor store systems, common-area AHUs, atrium smoke control, parking garage ventilation, and integrated BMS.</p>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`┌──────────────────────────────────────────────────────────────────┐
│          REGIONAL SHOPPING CENTER — SITE PLAN                   │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────┐  ┌──────────────────────────┐  ┌──────────┐      │
│  │ ANCHOR A │  │     INLINE TENANTS       │  │ ANCHOR B │      │
│  │(Own HVAC)│  │     100-200 stores       │  │(Own HVAC)│      │
│  └──────────┘  │  ┌──────────────────┐    │  └──────────┘      │
│                │  │   FOOD COURT     │    │                     │
│                │  │   NFPA 96 HOODS  │    │                     │
│                │  └──────────────────┘    │                     │
│  ┌──────────┐  │      ATRIUM (NFPA 92)    │  ┌──────────┐      │
│  │ ANCHOR C │  │  ┌──────────────────┐    │  │ ANCHOR D │      │
│  │(Own HVAC)│  │  │  COMMON AREA     │    │  │(Own HVAC)│      │
│  └──────────┘  │  │  AHU/RTU         │    │  └──────────┘      │
│                │  └──────────────────┘    │                     │
│                └──────────────────────────┘                     │
│                                                                  │
│  ┌──────────────────────────────────────────────────────┐       │
│  │           PARKING GARAGE (3,000-8,000 spaces)        │       │
│  │   CO/NO₂ Sensors · Jet Fans · LPR · LED Lighting    │       │
│  └──────────────────────────────────────────────────────┘       │
│                                                                  │
│  CENTRAL PLANT: 2,000-5,000 ton · MV SWITCHGEAR · GENSETS      │
│  BMS: BACnet/IP · CCTV: 200-500 cam · SECURITY: OSDP v2       │
└──────────────────────────────────────────────────────────────────┘`}</pre>
                </div>
            </Section>

            <Section title="3. Detailed Technical Description" id="technical">
                <h3 className="text-sm font-semibold text-white mb-2">3.1 Central / Distributed HVAC</h3>
                <ul className="list-disc list-inside text-xs text-gray-400 space-y-1 mb-4">
                    <li>Central plant: 2–4 × 500–1,500 ton centrifugal chillers, VSD, 0.55 kW/ton</li>
                    <li>Common-area AHUs: 20–40 rooftop or indoor units, 5,000–50,000 CFM, MERV-13</li>
                    <li>Tenant RTUs: 100–200 units (shared or dedicated), 5–15 ton each, DX</li>
                    <li>Atrium: 6–10 ACH smoke exhaust fans, NFPA 92 makeup air, CFD-validated</li>
                </ul>
                <h3 className="text-sm font-semibold text-white mb-2">3.2 Electrical Distribution</h3>
                <ul className="list-disc list-inside text-xs text-gray-400 space-y-1 mb-4">
                    <li>MV switchgear: 13.8 kV → 480 V, 2–4 unit substations, 1,500–3,000 kVA</li>
                    <li>Tenant metering: kWh sub-meters per tenant, BACnet/IP, CAM allocation</li>
                    <li>Generators: 1–2 × 1–2 MW diesel, life safety + common area</li>
                    <li>LED lighting: common-area, parking, exterior — DALI/0-10V dimming</li>
                </ul>
                <h3 className="text-sm font-semibold text-white mb-2">3.3 Fire / Life Safety</h3>
                <ul className="list-disc list-inside text-xs text-gray-400 space-y-1 mb-4">
                    <li>Sprinklers: wet pipe, ESFR K-25 (anchor high-bay), preaction (IT/loading)</li>
                    <li>FACP: addressable, 5,000+ points, mass notification, NFPA 72</li>
                    <li>Smoke control: atrium exhaust fans (100,000+ CFM), makeup air, CFD model</li>
                    <li>Kitchen exhaust: NFPA 96 Type I hoods, Ansul wet chem, grease ducts</li>
                </ul>
                <h3 className="text-sm font-semibold text-white mb-2">3.4 Parking &amp; Transportation</h3>
                <ul className="list-disc list-inside text-xs text-gray-400 space-y-1 mb-4">
                    <li>Parking garage: 3,000–8,000 spaces, CO/NO₂ sensors, jet fans, LED lighting</li>
                    <li>LPR: licence plate recognition at entries/exits, parking guidance system</li>
                    <li>EV charging: Level 2 (40+ stations), DCFC (4–8 stations), load management</li>
                    <li>Wayfinding: digital directories, parking space counters, mobile app</li>
                </ul>
                <h3 className="text-sm font-semibold text-white mb-2">3.5 Physical Security &amp; IT</h3>
                <ul className="list-disc list-inside text-xs text-gray-400 space-y-1">
                    <li>CCTV: 200–500 cameras (4K, PTZ at entrances, fixed corridor), ONVIF, AI analytics</li>
                    <li>Access control: OSDP v2, 100+ doors, service corridors, loading docks</li>
                    <li>Digital signage: 50–100 displays, CMS, tenant advertising, wayfinding</li>
                    <li>Guest Wi-Fi: Wi-Fi 6, 200+ APs, captive portal, shopper analytics</li>
                </ul>
            </Section>

            <Section title="4. Process Diagrams" id="process">
                <h3 className="text-sm font-semibold text-white mb-2">4.1 Atrium Smoke Control</h3>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`SMOKE DETECTOR ──► FACP ──► SMOKE CONTROL PANEL
                             │
                    ┌────────┼────────┐
                    ▼        ▼        ▼
              EXHAUST FAN  MAKEUP  AHU SHUTDOWN
              100K+ CFM    AIR     (Common Area)
              Atrium Roof  Dampers  Isolation
                    │
              CFD-VALIDATED  NFPA 92 COMPLIANT
              6-10 ACH exhaust rate`}</pre>
                </div>
                <h3 className="text-sm font-semibold text-white mt-6 mb-2">4.2 Parking Garage Ventilation</h3>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`CO SENSOR ──► BMS (BACnet) ──► JET FAN Speed Control
NO₂ SENSOR     │                    │
(per 5000sf)   ▼                    ▼
           25 PPM CO alarm    Proportional: 0-100%
           3 PPM NO₂ alarm    VFD-driven jet fans
                              6 ACH normal / 12 ACH alarm`}</pre>
                </div>
                <h3 className="text-sm font-semibold text-white mt-6 mb-2">4.3 Security / Surveillance Flow</h3>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`CAMERAS (200-500) ──► NVR Cluster ──► Security Ops Center
  │  ONVIF, 4K H.265     30-90 day    Video Wall
  │                      retention     AI Analytics
  ▼                                         │
LPR (Entry/Exit) ──► Parking Mgmt ────────┘
ACCESS (OSDP v2) ──► Alarm Monitoring ────┘
                         │
                    Guard Dispatch · Incident Reporting`}</pre>
                </div>
            </Section>

            <Section title="5. Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2">Scaled for a 1M sq ft enclosed regional mall with 4 anchors and 150 inline tenants.</p>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead><tr className="border-b border-white/[0.08] text-gray-500">
                            <th className="text-left px-3 py-2 font-medium">Equipment</th>
                            <th className="text-left px-3 py-2 font-medium">Spec</th>
                            <th className="text-left px-3 py-2 font-medium">Qty</th>
                            <th className="text-left px-3 py-2 font-medium">Rating</th>
                        </tr></thead>
                        <tbody className="text-gray-400">
                            {[['Centrifugal Chiller', 'VSD, R-134a, 0.55 kW/ton', '2–4', '500–1,500 ton'], ['Cooling Tower Cell', 'FRP, VFD, low-drift', '4–8', '500 ton/cell'], ['Boiler', 'Condensing, natural gas', '2–3', '5–10 MMBtu/h'], ['Common AHU/RTU', 'Rooftop, MERV-13, EC', '20–40', '5K–50K CFM'], ['Tenant RTU', 'DX, packaged', '100–200', '5–15 ton'], ['Smoke Exhaust Fan', 'Atrium, NFPA 92', '4–8', '25K–50K CFM'], ['Diesel Generator', 'Life safety, common area', '1–2', '1–2 MW'], ['Unit Substation', 'Dry-type transformer', '2–4', '1,500–3,000 kVA'], ['Fire Pump', 'Electric, wet pipe supply', '2–4', '1,000–2,000 GPM'], ['FACP', 'Addressable, mass notif', '2–4', '5,000+ points'], ['CCTV Camera', '4K PTZ/fixed, ONVIF', '200–500', 'Per zone'], ['LPR Camera', 'Entry/exit, parking', '20–40', 'Per lane'], ['Access Controller', 'OSDP v2 encrypted', '100+', 'Per door'], ['CO/NO₂ Sensor', 'Parking garage, BACnet', '50–100', 'Per 5,000 sf'], ['Jet Fan', 'Parking ventilation,VFD', '20–40', '30,000 CFM'], ['EV Charger (L2)', 'J1772, load managed', '40+', '7.7 kW'], ['DCFC Station', 'CCS/CHAdeMO', '4–8', '150 kW'], ['Digital Signage', 'CMS-managed, LED/LCD', '50–100', '55–85 in.'], ['Wi-Fi AP', '802.11ax, guest/ops', '200+', '6 GHz'], ['Tenant kWh Meter', 'Revenue grade, BACnet', '100–200', 'Per tenant']].map(([e, s, q, r]) => (
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
                            {[['L4 Enterprise', 'REIT analytics, energy benchmarking, shopper insights', 'REST API, MQTT, Cloud'], ['L3.5 DMZ', 'OPC UA GW, MQTT broker, API gateway, firewall', 'OPC UA, TLS 1.3'], ['L3 Operations', 'Energy management, parking mgmt, security ops, CMMS', 'BACnet/IP, ONVIF, SQL'], ['L2 Supervisory', 'BMS OWS, smoke control panel, VMS, access server', 'BACnet/IP, Modbus TCP'], ['L1 Control', 'AHU/RTU DDC, jet fan VFD, DALI GW, LPR processor', 'BACnet MS/TP, DALI, Modbus'], ['L0 Process', 'Temp/CO/CO₂ sensors, dampers, valves, meters', '4–20 mA, 0–10 V, DALI-2']].map(([l, c, p]) => (
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
                            {[['Atrium Smoke Control', 'Exhaust fans, makeup air, CFD-validated', 'NFPA 92'], ['Kitchen Exhaust', 'Type I hoods, Ansul, grease ducts', 'NFPA 96'], ['Parking Ventilation', 'CO/NO₂ sensors, jet fans, VFD', '25 PPM CO alarm'], ['EV Charging', 'Level 2 + DCFC, load management', 'J1772/CCS'], ['Escalators/Elevators', 'Public escalators 20+, freight elevators', 'ASME A17.1'], ['Fire Suppression', 'Wet pipe, ESFR for high-bay anchors', 'NFPA 13'], ['Digital Signage', 'CMS, tenant ads, wayfinding', 'IP-based']].map(([s, d, sp]) => (
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
                            {[['Domestic Water', 'Booster pumps, backflow preventers', '500–1,000 GPM'], ['Natural Gas', 'Boilers, food court kitchens', '1,000+ SCFH'], ['Stormwater', 'Detention ponds, bioswales, parking drainage', 'EPA NPDES'], ['Sanitary/Grease', 'Grease interceptors (food court), lift stations', 'Local FOG limits'], ['Irrigation', 'Landscaping, water-efficient fixtures', 'LEED WE credit']].map(([m, s, sp]) => (
                                <tr key={m} className="border-b border-white/[0.04]"><td className="px-3 py-2 font-medium whitespace-nowrap" style={{ color: C }}>{m}</td><td className="px-3 py-2">{s}</td><td className="px-3 py-2">{sp}</td></tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="9. Data Flow Architecture" id="dataflow">
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`FIELD  CO/Temp(50-100) · Cam(200-500) · Meter(100-200) · RTU(100-200)
  │  4-20mA, ONVIF, BACnet MS/TP, DALI              1-5 sec
  ▼
CONTROLLERS  DDC · Smoke Panel · VMS · LPR · DALI GW
  │  BACnet/IP, Modbus TCP, ONVIF                    5-15 sec
  ▼
CENTRAL BMS  Energy Mgmt · Parking Mgmt · Security Ops · CMMS
  │  BACnet/IP, SQL, OPC UA, 10 Gbps                15,000+ pts
  ▼
DMZ (L3.5)  OPC UA GW · MQTT Broker · API GW · Firewall
  │  OPC UA, MQTT, TLS 1.3, REST                   <200 ms
  ▼
ENTERPRISE  REIT Analytics · Shopper Insights · ESG · Cloud`}</pre>
                </div>
            </Section>

            <Section title="10. References" id="references">
                <ol className="list-decimal list-inside space-y-1 text-xs text-gray-400">
                    <li>ICC. (2021). <em>International Building Code — Covered Mall</em>. ICC.</li>
                    <li>NFPA. (2021). <em>NFPA 101: Life Safety Code</em>. NFPA.</li>
                    <li>NFPA. (2023). <em>NFPA 92: Smoke Control Systems</em>. NFPA.</li>
                    <li>NFPA. (2022). <em>NFPA 96: Commercial Cooking Ventilation</em>. NFPA.</li>
                    <li>NFPA. (2022). <em>NFPA 13: Sprinkler Systems</em>. NFPA.</li>
                    <li>ASHRAE. (2022). <em>Standard 90.1: Energy</em>. ASHRAE.</li>
                    <li>ASHRAE. (2022). <em>Standard 62.1: Ventilation</em>. ASHRAE.</li>
                    <li>The Open Group. (2022). <em>TOGAF 9.2</em>. The Open Group.</li>
                </ol>
            </Section>

            <section className="space-y-3">
                <h2 className="text-lg font-heading font-semibold text-white">See Also</h2>
                <div className="flex flex-wrap gap-2">
                    {[{ label: 'Commercial Facilities Hub', href: '/wiki/commercial-facilities' }, { label: 'Convention Center', href: '/wiki/commercial-facilities/convention-center' }, { label: 'Office Tower', href: '/wiki/commercial-facilities/office-tower' }, { label: 'DEXPI Equipment', href: '/wiki/equipment' }, { label: 'CISA COMM', href: '/wiki/sectors/COMM' }].map((l) => (
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
