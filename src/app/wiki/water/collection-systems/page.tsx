/**
 * Collection Systems — Deep-Dive Wiki Article.
 *
 * Comprehensive TOGAF-based reference architecture for wastewater collection
 * systems including gravity sewers, lift stations, force mains, manholes,
 * condition assessment (CCTV/NASSCO), and I/I reduction programs.
 *
 * @module wiki/water/collection-systems/page
 */

export const metadata = {
    title: 'Collection Systems — Water Sector Wiki',
    description:
        'TOGAF reference architecture for wastewater collection: gravity sewers, lift stations, ' +
        'manholes, CCTV/NASSCO PACP condition assessment, CMOM, and I/I reduction.',
};

export default function CollectionSystemsPage() {
    return (
        <div className="max-w-5xl space-y-10">
            {/* Header */}
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <div
                        className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]"
                        style={{ background: '#F97316' }}
                    />
                    <span className="text-xs font-mono text-gray-500">
                        WATR · WATR-WW · COLLECTION
                    </span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">
                    Collection Systems
                </h1>
                <p className="text-sm text-gray-400 leading-relaxed max-w-3xl">
                    Wastewater collection systems comprise over 800,000 miles of gravity sewers in
                    the United States, conveying domestic and industrial wastewater from service
                    laterals through collector sewers and trunk/interceptor mains to POTWs. This
                    article covers a reference 50,000-connection system including gravity sewer
                    networks, lift stations, manholes, condition assessment programs (NASSCO PACP),
                    and I/I reduction strategies compliant with EPA CMOM frameworks.
                </p>
            </div>

            {/* 1. TOGAF Business Architecture */}
            <Section title="1. TOGAF Business Architecture" id="togaf">
                <h4 className="text-xs font-semibold text-white mt-2 mb-2">Key Stakeholders</h4>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li><span className="text-[#F97316] font-medium">Sewer Utility / Authority</span> — Owner-operator managing O&amp;M, capital renewal, and SSO prevention</li>
                    <li><span className="text-[#F97316] font-medium">EPA</span> — SSO reporting, consent decrees, CMOM framework enforcement</li>
                    <li><span className="text-[#F97316] font-medium">State DEQ</span> — Collection permits, capacity assessments, SSES requirements</li>
                    <li><span className="text-[#F97316] font-medium">NASSCO</span> — PACP/MACP/LACP certification for condition assessment coding</li>
                    <li><span className="text-[#F97316] font-medium">OSHA</span> — Confined space (1910.146) for manhole entry, trenching safety</li>
                    <li><span className="text-[#F97316] font-medium">Developers / Builders</span> — New sewer extensions and capacity allocation</li>
                </ul>

                <h4 className="text-xs font-semibold text-white mt-4 mb-2">Regulatory Framework</h4>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Standard</th>
                                <th className="text-left px-3 py-2 font-medium">Scope</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['CWA / SSO Prohibition', 'Unpermitted SSOs violate CWA §301, enforceable by EPA/states'],
                                ['EPA CMOM Framework', 'Capacity, Management, Operation, Maintenance — collection system program'],
                                ['10 States Standards', 'Sewer design: minimum slope, pipe sizing (Manning formula), materials'],
                                ['NASSCO PACP v7', 'Pipeline Assessment Certification Program — standardized defect coding'],
                                ['NASSCO MACP', 'Manhole Assessment Certification Program — structural/operational rating'],
                                ['ASTM C76 / C507 / F679', 'Reinforced concrete pipe, PVC, and HDPE pipe material specifications'],
                                ['ASTM F1216 / F1743', 'CIPP and fold-and-form rehabilitation standards'],
                                ['OSHA 29 CFR 1926 Subpart P', 'Excavation and trenching safety for sewer construction'],
                            ].map(([std, scope]) => (
                                <tr key={std} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#F97316] font-medium whitespace-nowrap">{std}</td>
                                    <td className="px-3 py-2 text-gray-400">{scope}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* 2. High-Level Design */}
            <Section title="2. High-Level Design" id="high-level-design">
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto mt-2"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`SERVICE LATERALS (4-6") ──► COLLECTOR SEWERS (8-12") ──► TRUNK SEWERS (18-36")
   (Residential/C&I)               │                          │
                              MANHOLES                   MANHOLES
                          (every 300-400 ft)         (every 400-600 ft)
                                    │                          │
                                    ▼                          ▼
                          LIFT STATION ──► FORCE MAIN ──► GRAVITY INTERCEPTOR (42-72")
                          (if needed)     (4-36")                │
                                                            MANHOLES
                                                                │
                                                                ▼
                                                       POTW (Headworks)

 ┌─────────────────────────────────────────────────────────────────────────┐
 │  REFERENCE SYSTEM: 50,000 connections, ~600 miles gravity sewer        │
 │  PIPE MATERIALS: VCP, RCP, PVC (new), HDPE (trenchless), CIPP (rehab) │
 │  MANHOLES: ~5,000 precast concrete, fiberglass-lined in corrosive env │
 │  LIFT STATIONS: 25-40 remote stations, submersible duplex/triplex     │
 │  SLOPE: Minimum self-cleansing at 2 fps (Manning n = 0.013)           │
 └─────────────────────────────────────────────────────────────────────────┘`}</pre>
                </div>
            </Section>

            {/* 3. Detailed Technical Description */}
            <Section title="3. Detailed Technical Description" id="technical">
                <h3 className="text-sm font-semibold text-white mt-4">3.1 Gravity Sewer Network</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside mt-2">
                    <li>Pipe materials: VCP (vitrified clay, 4–36″), PVC SDR35 (4–18″), RCP (18–72″), HDPE (HDD)</li>
                    <li>Minimum slope: 0.4% for 8″, 0.28% for 10″, 0.22% for 12″ (self-cleansing at 2 fps)</li>
                    <li>Design flow: Manning formula, Q = (1.49/n) × A × R²/³ × S¹/² (n = 0.013)</li>
                    <li>Depth: 6–25 ft cover, minimum 3 ft below frost line</li>
                    <li>Peak flow factor: 2.5–3.0 × average daily flow (Harmon peaking factor)</li>
                    <li>Pipe joints: rubber gasket (ASTM D3212), tested for infiltration ≤200 gal/inch-dia/mile/day</li>
                </ul>

                <h3 className="text-sm font-semibold text-white mt-6">3.2 Manholes</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside mt-2">
                    <li>Construction: 48″ precast concrete (ASTM C478) with eccentric cone, 0.75″ mortar joints</li>
                    <li>Spacing: 300–400 ft on collectors, 400–600 ft on trunks, at all changes of direction/grade</li>
                    <li>Interior coating: Epoxy or polyurea in high-H₂S environments (crown protection)</li>
                    <li>Frames and covers: per AASHTO H-20 loading, non-rocking, bolt-down in flood zones</li>
                    <li>Invert channels: concrete bench with smooth transitions, 1″/ft cross-slope to channel</li>
                    <li>Drop manholes: for connections with &gt;2 ft elevation differential (outside or inside drop)</li>
                </ul>

                <h3 className="text-sm font-semibold text-white mt-6">3.3 Lift Stations</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside mt-2">
                    <li>Configuration: Submersible duplex or triplex (1 standby minimum)</li>
                    <li>Pumps: Non-clog submersible, 3″ solids passage, 5–500 HP range</li>
                    <li>Force main: PVC C900 or HDPE, 4–36″ dia., velocity 3–8 fps</li>
                    <li>Controls: PLC with float backup, cellular SCADA, auto-dialer for alarms</li>
                    <li>Emergency: portable connection for bypass pumping during pump failure</li>
                    <li>Odor control: carbon vent filter or chemical scrubber at discharge manhole</li>
                </ul>

                <h3 className="text-sm font-semibold text-white mt-6">3.4 Condition Assessment (CCTV)</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside mt-2">
                    <li>CCTV inspection: pan-and-tilt crawler, HD video, GPS-located, 50+ miles/year</li>
                    <li>Coding standard: NASSCO PACP v7 structural/O&amp;M defect codes (Grade 1–5)</li>
                    <li>Manhole assessment: NASSCO MACP, structural/coating condition scoring</li>
                    <li>Lateral assessment: NASSCO LACP for service connection condition</li>
                    <li>Data management: GIS-integrated asset management with condition scoring</li>
                    <li>Prioritization: risk = consequence × likelihood, 5×5 risk matrix for CIP</li>
                </ul>

                <h3 className="text-sm font-semibold text-white mt-6">3.5 I/I Reduction &amp; Rehabilitation</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside mt-2">
                    <li>SSES (Sewer System Evaluation Survey): flow monitoring + CCTV + smoke testing</li>
                    <li>Flow monitoring: 30+ temporary flow meters (area-velocity), 3–6 month wet-weather</li>
                    <li>RDII quantification: RTK hydrograph decomposition (rapid, intermediate, slow I/I)</li>
                    <li>Point repairs: excavate-and-replace, sectional CIPP, HMA lateral saddles</li>
                    <li>Full-length rehab: CIPP (ASTM F1216), fold-and-form (ASTM F1743), pipe bursting</li>
                    <li>Manhole rehab: cementitious lining, polyurea spray, chimney seal, frame/cover replacement</li>
                </ul>
            </Section>

            {/* 4. Process Diagrams */}
            <Section title="4. Process Diagrams" id="process-diagrams">
                <h3 className="text-sm font-semibold text-white">4.1 Collection System Flow</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto mt-2"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`RESIDENTIAL ──► LATERAL (4") ──► COLLECTOR (8") ──► TRUNK (24") ──► INTERCEPTOR (48")
                                                                                  │
COMMERCIAL ──► LATERAL (6") ──► COLLECTOR (12") ─┘              LIFT STATION ──┤
                                                                (if low area)   │
INDUSTRIAL ──► PRETREAT ──► LATERAL (6-8") ──────┘                              ▼
(per SIU permit)                                                           POTW HEADWORKS

DRY WEATHER FLOW: 8 MGD (125 gpcd × 50,000 × business + I/I)
WET WEATHER PEAK: 24 MGD (peaking factor 3.0 + rainfall-dependent I/I)`}</pre>
                </div>

                <h3 className="text-sm font-semibold text-white mt-6">4.2 Condition Assessment Workflow</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto mt-2"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`CCTV CRAWLER ──► HD VIDEO ──► PACP CODING ──► GIS DATABASE
    │                │           (Grade 1-5)       │
    │           Still Images     O&M + Structural   │
    │                │                              │
    ▼                ▼                              ▼
MANHOLE ASSESSMENT   LATERAL ASSESSMENT       RISK MATRIX
(NASSCO MACP)       (NASSCO LACP)           (Consequence × Likelihood)
    │                │                              │
    └────────────────┴──────────────────────────────┘
                           │
                    CAPITAL IMPROVEMENT PLAN
                    (CIPP │ Pipe Burst │ Open-Cut │ Manhole Rehab)
                           │
                    CONSTRUCTION ──► POST-REHAB CCTV ──► Updated GIS`}</pre>
                </div>

                <h3 className="text-sm font-semibold text-white mt-6">4.3 SCADA / Lift Station Monitoring</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto mt-2"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`LIFT STATIONS (25-40 remote sites)
├── Wet Well Level (2 per site)    → 4-20 mA  → RTU   @ 1 min
├── Pump Status (2-3 per site)     → Discrete  → RTU   @ event
├── Flow Meter (1 per site)        → 4-20 mA  → RTU   @ 1 min
├── Power Status (1 per site)      → Discrete  → RTU   @ event
├── H₂S Detector (1 per site)     → 4-20 mA  → RTU   @ 5 min
└── Intrusion Alarm (1 per site)   → Discrete  → RTU   @ event
                                        │
                                   Cellular (LTE) / Radio (900 MHz)
                                        │
                                  CENTRAL SCADA ──► CMMS ──► GIS
                                  (DNP3 protocol)   Work Orders  Asset Maps`}</pre>
                </div>
            </Section>

            {/* 5. Bill of Materials */}
            <Section title="5. Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2 italic">
                    Scaled for a 50,000-connection wastewater collection system with 30 lift stations.
                </p>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Equipment Type</th>
                                <th className="text-left px-3 py-2 font-medium">Specification</th>
                                <th className="text-left px-3 py-2 font-medium">Qty</th>
                                <th className="text-left px-3 py-2 font-medium">Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Gravity Sewer Pipe', 'PVC SDR35 / VCP / RCP', '600 mi', '8–72″ dia., Manning n=0.013'],
                                ['Service Lateral', 'PVC SDR35, 4–6″', '50,000', 'Min slope 1/4″/ft'],
                                ['Precast Concrete Manhole', 'ASTM C478, 48″ min.', '5,000', 'H-20 frame/cover'],
                                ['Drop Manhole', 'Inside/outside drop connection', '200', '>2 ft differential'],
                                ['Lift Station (Small)', 'Submersible duplex, prefab FRP', '20', '5–50 HP, <0.5 MGD'],
                                ['Lift Station (Large)', 'Submersible triplex, concrete', '10', '50–500 HP, 0.5–5 MGD'],
                                ['Force Main', 'PVC C900 / HDPE', '30 mi', '4–36″, 150–200 psi WP'],
                                ['RTU/PLC (Lift Station)', 'Cellular LTE + 900 MHz radio', '30', 'DNP3, 20–40 I/O each'],
                                ['Flow Monitor (Temporary)', 'Area-velocity, Doppler', '30', '6–48″ pipe, ±5%'],
                                ['Flow Monitor (Permanent)', 'Mag or AV, inline/saddle', '15', 'At key trunk manholes'],
                                ['CCTV Crawler', 'Pan-tilt, HD camera, 1,200 ft cable', '2', '6–48″ pipe range'],
                                ['CCTV Data Management SW', 'NASSCO PACP v7 certified', '1', 'GIS-integrated'],
                                ['Smoke Testing Equipment', 'Blower + smoke candles', '2 sets', 'Per NASSCO standard'],
                                ['CIPP Liner Material', 'Felt or fiberglass, UV/steam cure', 'As needed', '6–48″ dia., ASTM F1216'],
                                ['Manhole Rehabilitation', 'Cementitious or polyurea lining', 'As needed', 'Per NASSCO MACP score'],
                                ['H₂S Monitor (Portable)', '4-gas, confined space entry', '10', 'OSHA 1910.146 compliant'],
                                ['H₂S Monitor (Fixed)', 'Electrochemical, at lift stations', '30', 'Alarm 10 ppm, 0–100 ppm'],
                                ['Emergency Generator (Portable)', 'Diesel, trailer-mounted', '3', '150 kW, quick-connect'],
                                ['Bypass Pumping Equipment', 'Diesel-driven pump + hose', '2 sets', '500–2,000 GPM portable'],
                                ['GIS/Asset Management SW', 'Esri ArcGIS / Cityworks', '1', 'Collection system module'],
                                ['CMMS', 'Work order and PM tracking', '1', 'Integration to SCADA alarms'],
                            ].map(([equip, spec, qty, rating]) => (
                                <tr key={equip} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#F97316] font-medium whitespace-nowrap">{equip}</td>
                                    <td className="px-3 py-2 text-gray-400">{spec}</td>
                                    <td className="px-3 py-2 text-gray-400 text-center">{qty}</td>
                                    <td className="px-3 py-2 text-gray-400">{rating}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* 6. Purdue Model */}
            <Section title="6. Purdue Model Mapping" id="purdue">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Level</th>
                                <th className="text-left px-3 py-2 font-medium">Components</th>
                                <th className="text-left px-3 py-2 font-medium">Protocols</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['L0 — Process', 'Submersible pumps, level sensors, flow meters, H₂S detectors, valves', '4–20 mA, discrete, pulse'],
                                ['L1 — Basic Control', 'RTU/PLC at each lift station, float backup, alternator relay', 'Modbus RTU, DNP3'],
                                ['L2 — Supervisory', 'Collection system SCADA (central), alarm management dashboard', 'DNP3/TCP, cellular LTE'],
                                ['L3 — Operations', 'GIS/asset management, CCTV database, CMMS, hydraulic model', 'REST APIs, SQL, WFS/WMS'],
                                ['L3.5 — DMZ', 'Firewall, VPN concentrator for 30+ remote sites', 'Encrypted DNP3-SA, HTTPS'],
                                ['L4 — Enterprise', 'CMOM reporting, SSO tracking, CIP planning, developer capacity allocation', 'REST, HTTPS, XML'],
                            ].map(([level, components, protocols]) => (
                                <tr key={level} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#F97316] font-mono font-medium whitespace-nowrap">{level}</td>
                                    <td className="px-3 py-2 text-gray-400">{components}</td>
                                    <td className="px-3 py-2 text-gray-400">{protocols}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* 7. Supporting Systems */}
            <Section title="7. Supporting Systems" id="supporting">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">System</th>
                                <th className="text-left px-3 py-2 font-medium">Description</th>
                                <th className="text-left px-3 py-2 font-medium">Specification</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Odor Control', 'H₂S mitigation at lift stations and trunk manholes', 'Carbon vent filters, chemical scrubbers, iron salt dosing'],
                                ['Confined Space', 'Entry program for manholes and wet wells', 'OSHA 1910.146, 4-gas monitor, tripod/winch/harness'],
                                ['FOG Program', 'Fats, oils, and grease management for restaurants', 'Grease interceptor sizing, inspection frequency, enforcement'],
                                ['Root Control', 'Chemical and mechanical root intrusion prevention', 'Metam sodium foaming, root cutting with CCTV verification'],
                                ['Emergency Response', 'SSO response and containment procedures', 'Vac truck, bypass pumping, public notification, DEQ reporting'],
                                ['Physical Security', 'Lift station fencing, locked hatches, CCTV', 'Card access, intrusion alarms, 24/7 SCADA monitoring'],
                                ['Trenchless Technology', 'Minimum-disruption rehabilitation methods', 'CIPP, pipe bursting, slip lining, directional drilling'],
                                ['Corrosion Protection', 'Crown corrosion prevention in H₂S environments', 'Calcium nitrate dosing, FRP lining, polyurea coatings'],
                            ].map(([system, desc, spec]) => (
                                <tr key={system} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#F97316] font-medium whitespace-nowrap">{system}</td>
                                    <td className="px-3 py-2 text-gray-400">{desc}</td>
                                    <td className="px-3 py-2 text-gray-400">{spec}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* 8. CMOM Performance Metrics */}
            <Section title="8. CMOM Performance Metrics" id="cmom">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Metric</th>
                                <th className="text-left px-3 py-2 font-medium">Target</th>
                                <th className="text-left px-3 py-2 font-medium">Data Source</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['SSO Frequency', '≤2 per 100 miles/year', 'SSO tracking log, EPA/state reporting'],
                                ['Pipe Condition (PACP)', '≤5% Grade 4/5 segments', 'CCTV database, annual PACP summary'],
                                ['I/I Ratio', '≤25% of peak wet-weather flow', 'Flow monitoring, RDII analysis'],
                                ['Sewer Cleaning', '100% of system every 3–5 years', 'CMMS work orders, GIS tracking'],
                                ['CCTV Inspection Rate', '10–15% of system per year', 'CCTV footage database, GIS'],
                                ['Lift Station Availability', '≥99.5% uptime per station', 'SCADA runtime logs'],
                                ['Emergency Response Time', '≤1 hour for SSO containment', 'CMMS/SCADA event timestamps'],
                                ['Manhole Condition', '≤3% with structural rating 4/5', 'MACP database, risk matrix'],
                            ].map(([metric, target, source]) => (
                                <tr key={metric} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#F97316] font-medium whitespace-nowrap">{metric}</td>
                                    <td className="px-3 py-2 text-gray-400">{target}</td>
                                    <td className="px-3 py-2 text-gray-400">{source}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* 9. Data Flow Architecture */}
            <Section title="9. Data Flow Architecture" id="data-flow">
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`TIER 1 — FIELD (30+ lift stations × 20-40 I/O each)
├── Lift Station RTUs (30)       → Cellular  → SCADA    @ 1-min poll
├── Flow Monitors — Perm (15)    → 4-20 mA  → RTU      @ 1-min
├── Flow Monitors — Temp (30)    → Logger    → Manual    @ 5-min (batched)
├── H₂S Monitors (30)           → 4-20 mA  → RTU      @ 5-min
├── Rain Gauges (10)             → Tipping   → Logger   @ 0.01″ tip
└── Manhole Level (10)           → Pressure  → RTU      @ 5-min

TIER 2 — COLLECTION SCADA + GIS
├── Real-time SCADA              → DNP3/LTE  → Operator  @ 1-min
├── Alarm / SSO detection        → SCADA     → Auto-dial @ event
├── CCTV video + PACP codes      → USB/cloud → Database  @ daily
├── Flow monitoring data         → CSV/SQL   → Model     @ weekly
└── GIS asset management         → WFS       → Dashboard @ on-demand

TIER 3 — ENTERPRISE
├── CMOM reporting               → REST      → Annual    regulatory
├── SSO reporting (state/EPA)    → Web form  → 24-hr     regulatory
├── CIP planning                 → Risk matrix → Annual  capital
├── CMMS work orders             → REST      → On-demand maintenance
└── Developer capacity tracking  → SQL       → On-demand allocation`}</pre>
                </div>
            </Section>

            {/* 10. References */}
            <Section title="10. References" id="references">
                <div className="space-y-2 text-xs text-gray-400 leading-relaxed">
                    <p>NASSCO. (2021). <em>Pipeline Assessment Certification Program (PACP) Reference Manual</em> (v7). NASSCO.</p>
                    <p>U.S. EPA. (2004). <em>CMOM Guide for Sanitary Sewer Collection Systems</em>. EPA 305-B-04-002.</p>
                    <p>Water Environment Federation. (2017). <em>Gravity Sanitary Sewer Design and Construction</em> (MOP FD-5, 3rd ed.). WEF.</p>
                    <p>American Society of Civil Engineers. (2014). <em>Pipeline Infrastructure: A Lifeline Report Card</em>. ASCE.</p>
                    <p>ASTM International. (2018). <em>F1216: Standard Practice for CIPP of Existing Pipelines and Conduits</em>. ASTM.</p>
                    <p>Great Lakes–Upper Mississippi River Board. (2014). <em>Recommended Standards for Wastewater Facilities</em>. GLUMRB.</p>
                    <p>National Institute of Standards and Technology. (2023). <em>SP 800-82 Rev. 3: Guide to OT Security</em>. NIST.</p>
                    <p>U.S. EPA. (2024). <em>SSO Reporting and Response Requirements</em>. EPA.</p>
                </div>
            </Section>

            {/* See Also */}
            <Section title="See Also" id="see-also">
                <div className="flex flex-wrap gap-2">
                    {[
                        { href: '/wiki/water', label: 'Water Sector Hub', color: '#06B6D4' },
                        { href: '/wiki/water/wastewater', label: 'Wastewater Treatment', color: '#10B981' },
                        { href: '/wiki/water/pump-stations', label: 'Pump Stations', color: '#8B5CF6' },
                        { href: '/wiki/water/stormwater', label: 'Stormwater Management', color: '#3B82F6' },
                        { href: '/wiki/sectors/WATR', label: 'WATR Sector Overview', color: '#06B6D4' },
                    ].map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-white/[0.04]"
                            style={{ borderColor: `${link.color}30`, color: link.color }}
                        >
                            {link.label} →
                        </a>
                    ))}
                </div>
            </Section>
        </div>
    );
}

/** Reusable section component. */
function Section({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
    return (
        <section id={id} className="space-y-4">
            <h2 className="text-xl font-heading font-semibold text-white">{title}</h2>
            {children}
        </section>
    );
}
