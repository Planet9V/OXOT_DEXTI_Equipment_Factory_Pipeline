/**
 * Stormwater Management Facilities — Deep-Dive Wiki Article.
 *
 * Comprehensive TOGAF-based reference architecture for stormwater management
 * including gray infrastructure (detention, retention, vortex separators) and
 * green infrastructure (bioswales, permeable pavement, constructed wetlands).
 *
 * @module wiki/water/stormwater/page
 */

export const metadata = {
    title: 'Stormwater Management — Water Sector Wiki',
    description:
        'TOGAF reference architecture for stormwater: detention/retention facilities, bioswales, ' +
        'permeable pavement, vortex separators, and real-time SCADA control for CSO/SSO prevention.',
};

export default function StormwaterPage() {
    return (
        <div className="max-w-5xl space-y-10">
            {/* Header */}
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <div
                        className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]"
                        style={{ background: '#3B82F6' }}
                    />
                    <span className="text-xs font-mono text-gray-500">
                        WATR · WATR-SW · STORMWATER
                    </span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">
                    Stormwater Management Facilities
                </h1>
                <p className="text-sm text-gray-400 leading-relaxed max-w-3xl">
                    Stormwater management integrates gray infrastructure (detention basins, retention
                    ponds, conveyance networks, vortex separators) and green infrastructure (bioswales,
                    permeable pavement, rain gardens, constructed wetlands) to manage runoff quantity
                    and quality. This article covers a reference MS4 (Municipal Separate Storm Sewer
                    System) program serving a 50-square-mile urbanized area, compliant with NPDES MS4
                    Phase II permits and EPA Six Minimum Control Measures.
                </p>
            </div>

            {/* 1. TOGAF Business Architecture */}
            <Section title="1. TOGAF Business Architecture" id="togaf">
                <h4 className="text-xs font-semibold text-white mt-2 mb-2">Key Stakeholders</h4>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li><span className="text-[#3B82F6] font-medium">MS4 Permittee</span> — Municipality managing stormwater program, BMP maintenance, annual reporting</li>
                    <li><span className="text-[#3B82F6] font-medium">EPA</span> — NPDES MS4 permit program, TMDL development, enforcement</li>
                    <li><span className="text-[#3B82F6] font-medium">State DEQ</span> — Delegated MS4 permitting, construction stormwater permits, water quality standards</li>
                    <li><span className="text-[#3B82F6] font-medium">Developers</span> — Post-construction stormwater management compliance, BMP installation</li>
                    <li><span className="text-[#3B82F6] font-medium">ASCE / WEF</span> — Design standards, technical guidance, stormwater modeling tools</li>
                    <li><span className="text-[#3B82F6] font-medium">FEMA</span> — Floodplain management, NFIP coordination, flood mapping (FIRMs)</li>
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
                                ['CWA §402(p) — MS4 Program', 'NPDES permits for municipal separate storm sewer systems'],
                                ['NPDES MS4 Phase II', 'Small MS4s: 6 minimum control measures, SWMP, annual reporting'],
                                ['TMDL Requirements', 'Pollutant load allocations for impaired receiving waters'],
                                ['Construction General Permit', 'SWPPP required for sites ≥1 acre of land disturbance'],
                                ['Post-Construction Stormwater', 'Permanent BMPs required for new development/redevelopment'],
                                ['FEMA NFIP / 44 CFR', 'Floodplain management, no net-rise, compensatory storage'],
                                ['State Water Quality Standards', 'Numeric criteria for receiving waters (TSS, nutrients, bacteria)'],
                                ['ASCE/EWRI Standards', 'Stormwater BMP design criteria, testing protocols, performance'],
                            ].map(([std, scope]) => (
                                <tr key={std} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#3B82F6] font-medium whitespace-nowrap">{std}</td>
                                    <td className="px-3 py-2 text-gray-400">{scope}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* 2. High-Level Design */}
            <Section title="2. High-Level Design" id="high-level-design">
                <p className="text-sm text-gray-300 leading-relaxed">
                    Modern stormwater management uses a{' '}
                    <span className="text-[#3B82F6] font-medium">treatment train approach</span>{' '}
                    combining source controls (LID/green infrastructure) with conveyance and
                    end-of-pipe treatment to address both water quality (WQv) and flood control
                    (detention for 2-yr through 100-yr storms).
                </p>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto mt-4"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`RAINFALL ──► SOURCE CONTROLS (LID/Green Infrastructure)
               │
               ├── Permeable Pavement ──► Infiltration / Subdrain
               ├── Bioswales / Rain Gardens ──► Filtration / Infiltration
               ├── Green Roofs ──► Evapotranspiration / Detention
               └── Rain Harvesting ──► Reuse (irrigation)
               │
               ▼
         CONVEYANCE NETWORK (storm sewers, channels, culverts)
               │
               ├── Inlet Structures (grate, curb, combination)
               ├── Storm Sewers (RCP/HDPE, 12-96")
               ├── Open Channels (concrete/grass/rip-rap)
               └── Culverts (pipe/box, fish passage)
               │
               ▼
         END-OF-PIPE TREATMENT
               │
               ├── Vortex Separator / Hydrodynamic Device ──► TSS Removal
               ├── Sand Filter / Media Filter ──► Nutrient/Metal Removal
               └── Constructed Wetland ──► Polishing / Habitat
               │
               ▼
         REGIONAL DETENTION / RETENTION
               │
               ├── Dry Detention Basin (2-yr → 100-yr peak control)
               ├── Wet Retention Pond (permanent pool + WQv)
               └── Underground Vault (urban space constraints)
               │
               ▼
         OUTFALL ──► Receiving Water (river, lake, estuary)
               │
         MONITORING: Rain gauge + flow meter + WQ sampler

 ┌─────────────────────────────────────────────────────────────────────┐
 │  REFERENCE: MS4 serving 50 sq mi, pop. 150,000                    │
 │  WQv: First 1.0" of rainfall over impervious area (~13 MG)        │
 │  PEAK CONTROL: ≤ pre-development rate for 2-yr through 100-yr     │
 │  6 MINIMUM MEASURES: Education, Participation, IDDE, Construction, │
 │                       Post-Construction, Good Housekeeping         │
 └─────────────────────────────────────────────────────────────────────┘`}</pre>
                </div>
            </Section>

            {/* 3. Detailed Technical Description */}
            <Section title="3. Detailed Technical Description" id="technical">
                <h3 className="text-sm font-semibold text-white mt-4">3.1 Green Infrastructure (Source Controls)</h3>
                <p className="text-xs text-gray-400 leading-relaxed mt-1">
                    Green infrastructure mimics natural hydrology by infiltrating, evapotranspiring,
                    and capturing stormwater at the source. These practices reduce runoff volume,
                    improve water quality through biological uptake and filtration, and provide
                    co-benefits (heat island reduction, habitat, aesthetics).
                </p>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside mt-2">
                    <li>Bioretention / rain gardens: engineered soil media (sand/compost/topsoil), 18–30″ depth</li>
                    <li>Bioswales: vegetated channels with 2–4% slope, check dams every 50 ft, WQv capture</li>
                    <li>Permeable pavement: porous asphalt/concrete or permeable interlocking concrete pavers (PICP)</li>
                    <li>Green roofs: extensive (4″ media, sedum) or intensive (12″+ media, diverse planting)</li>
                    <li>Rain harvesting: cisterns (500–10,000 gal), first-flush diverter, reuse for irrigation</li>
                    <li>Tree box filters: curb-inlet bioretention with engineered media, urban retrofit</li>
                </ul>

                <h3 className="text-sm font-semibold text-white mt-6">3.2 Conveyance Network</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside mt-2">
                    <li>Storm sewer pipe: RCP (ASTM C76, 12–96″), HDPE (AASHTO M294), PVC (ASTM F679)</li>
                    <li>Inlets: grate, curb-opening, combination; spacing per HEC-22 spread criteria</li>
                    <li>Manholes/junction boxes: precast concrete, AASHTO H-20 loading</li>
                    <li>Open channels: grass-lined (v ≤ 6 fps), concrete (v ≤ 12 fps), rip-rap energy dissipation</li>
                    <li>Culverts: pipe (48–96″) or box (span × rise), fish passage per USACE/FHWA criteria</li>
                    <li>Design storm: 25-yr, 24-hr for conveyance; 100-yr for flood control</li>
                </ul>

                <h3 className="text-sm font-semibold text-white mt-6">3.3 Treatment Devices</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside mt-2">
                    <li>Hydrodynamic/vortex separator: continuous-deflective separation, 50–80% TSS removal</li>
                    <li>Sand/media filter: perlite or engineered media, 80% TSS / 40% TP removal</li>
                    <li>Oil/water separator: coalescing plate, for fueling areas and parking structures</li>
                    <li>Trash capture devices: CDS screens, NetTech filters, 5 mm capture per TMDL</li>
                    <li>Constructed wetlands: surface-flow, 1–2 day HRT, cattail/bulrush planting</li>
                    <li>Manufactured treatment: StormFilter, Filterra, BioClean — verified via TAPE/NJDEP</li>
                </ul>

                <h3 className="text-sm font-semibold text-white mt-6">3.4 Detention &amp; Retention Facilities</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside mt-2">
                    <li>Dry detention basin: multi-stage outlet (orifice + weir), 24–72 hr drawdown, turf bottom</li>
                    <li>Wet retention pond: permanent pool (WQv) + live storage (flood control), littoral shelf</li>
                    <li>Underground detention: reinforced concrete or plastic arch chambers, urban infill sites</li>
                    <li>Outlet structures: riser with low-flow orifice (WQv), mid-level weir (Cpv), emergency spillway</li>
                    <li>Embankment: earth dam design per state dam safety, anti-seep collar, emergency spillway</li>
                    <li>Forebay: sediment trap at inlet, 10% of WQv, easy cleanout access</li>
                </ul>

                <h3 className="text-sm font-semibold text-white mt-6">3.5 Monitoring &amp; Real-Time Control</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside mt-2">
                    <li>Rain gauges: 10× tipping-bucket (0.01″ resolution), telemetered to SCADA</li>
                    <li>Flow meters: 15× area-velocity (Doppler), in key trunk sewers/outfalls, 5-min log</li>
                    <li>WQ samplers: 5× automated composite, triggered by flow/rain, for TMDL compliance</li>
                    <li>Level sensors: 20× at basins, ponds, and underground vaults, 1-min scan</li>
                    <li>RTC (Real-Time Control): automated gate/valve actuation for system-wide optimization</li>
                    <li>ALERT flood warning: upstream rain/stage telemetry, NWS integration, public alerts</li>
                </ul>
            </Section>

            {/* 4. Process Diagrams */}
            <Section title="4. Process Diagrams" id="process-diagrams">
                <h3 className="text-sm font-semibold text-white">4.1 Stormwater Treatment Train</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto mt-2"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`RAINFALL
   │
   ▼
IMPERVIOUS AREA ──► PERVIOUS AREA (Infiltration, ET)
   │
   ├── Green Roof ──► Reduced Runoff (50-90% annual)
   ├── Permeable Pavement ──► Infiltration + Subdrain
   │
   ▼
INLET STRUCTURES ──► STORM SEWER (12-96" RCP/HDPE)
   │
   ▼
VORTEX SEPARATOR ──► TSS Removal (50-80%)
   │                   Sediment → Vac Truck Cleanout
   ▼
BIORETENTION / SAND FILTER ──► Nutrient/Metal Removal
   │                              Treated → Subdrain
   ▼
DETENTION BASIN ──► Peak Flow Attenuation
   │                  24-72 hr drawdown
   │    ┌── WQv Orifice (slow release)
   │    ├── Cpv Weir (channel protection)
   │    └── Emergency Spillway (100-yr)
   ▼
OUTFALL ──► Receiving Water
   │
   ▼
MONITORING: Flow + WQ + Rain (telemetry to SCADA)`}</pre>
                </div>

                <h3 className="text-sm font-semibold text-white mt-6">4.2 Real-Time Control (RTC) Architecture</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto mt-2"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`Rain Gauges (10) ──► SCADA ──► RTC Decision Engine
Flow Meters (15) ──┤          │
Level Sensors (20)─┤          ├── Forecast Model (2-hr ahead)
NWS Radar Feed ────┘          │
                              ▼
                    Gate/Valve Control Commands
                         │
              ┌──────────┼──────────────────────┐
              │          │                      │
     Basin Gates    Inline Weirs        Diversion Valves
     (actuated)     (motorized)         (to overflow basins)
              │          │                      │
              ▼          ▼                      ▼
     Controlled Outflow to Receiving Waters
     Target: Pre-development peak matching, WQv treatment`}</pre>
                </div>

                <h3 className="text-sm font-semibold text-white mt-6">4.3 MS4 Program Data Flows</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto mt-2"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`FIELD DATA COLLECTION
├── IDDE Investigations        → Mobile App → GIS Database
├── BMP Inspections            → Tablet     → Asset Management
├── Construction Site Inspections → Photos  → Compliance DB
├── Outfall Screening          → Field Form → Outfall Map
├── WQ Monitoring Results      → Lab/Online → LIMS/SCADA
└── Public Complaints          → 311/Web    → Work Orders

MS4 REPORTING
├── Annual Report              → State DEQ  → NPDES Compliance
├── TMDL Progress              → State DEQ  → Pollutant Load Reduction
├── BMP Maintenance Tracking   → CMMS       → Asset Lifecycle
├── Impervious Area Tracking   → GIS        → Billing/Fees
└── Public Education Outreach  → Website    → Community Engagement`}</pre>
                </div>
            </Section>

            {/* 5. Bill of Materials */}
            <Section title="5. Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2 italic">
                    Scaled for an MS4 serving 50 sq mi urbanized area, population 150,000.
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
                                ['Storm Sewer Pipe', 'RCP (ASTM C76) / HDPE', '250 mi', '12–96″, 25-yr design storm'],
                                ['Inlet Structure', 'Grate, curb-opening, combination', '8,000', 'AASHTO H-20, per HEC-22'],
                                ['Junction Box / Manhole', 'Precast concrete', '4,000', '48–60″, H-20 loading'],
                                ['Dry Detention Basin', 'Earth embankment, multi-stage outlet', '15', '2–50 acre-ft each'],
                                ['Wet Retention Pond', 'Permanent pool + live storage', '10', '1–30 acre-ft, littoral shelf'],
                                ['Underground Detention', 'Reinforced concrete or plastic chambers', '8', '0.5–5 acre-ft each'],
                                ['Bioretention / Rain Garden', 'Engineered media, underdrain', '200+', '500–5,000 ft² each'],
                                ['Bioswale', 'Vegetated channel, check dams', '50+ mi', '2–4% slope, 3 ft bottom'],
                                ['Permeable Pavement', 'Porous asphalt or PICP', '100+ sites', 'Stone reservoir, underdrain'],
                                ['Green Roof', 'Extensive, 4″ media, sedum', '20+', '2,000–50,000 ft² each'],
                                ['Vortex Separator', 'Continuous deflective separation', '25', '50–80% TSS removal'],
                                ['Sand/Media Filter', 'Perlite or engineered media', '10', '80% TSS, 40% TP removal'],
                                ['Constructed Wetland', 'Surface-flow, planted', '5', '0.5–5 acres, 1-2 day HRT'],
                                ['Trash Capture Device', 'CDS screen or NetTech filter', '30', '5 mm capture per TMDL'],
                                ['Oil/Water Separator', 'Coalescing plate, maintenance access', '15', 'Fueling areas/parking'],
                                ['Rain Gauge', 'Tipping-bucket, telemetered', '10', '0.01″ resolution, LTE/radio'],
                                ['Flow Meter', 'Area-velocity (Doppler), in-pipe', '15', '12–48″ pipe, ±5%'],
                                ['WQ Composite Sampler', 'Automated, refrigerated', '5', 'Flow-proportional, 24-hr'],
                                ['Level Sensor', 'Pressure/ultrasonic, stainless steel', '20', 'Basin/pond/vault levels'],
                                ['SCADA RTU', 'Cellular (LTE), solar-powered option', '20', '10–30 I/O points each'],
                                ['RTC Gate Actuator', 'Electric, SCADA-controlled', '8', '24–48″ slide/weir gates'],
                                ['ALERT Flood Warning Station', 'Rain + stage, telemetered', '6', 'IFLOWS/ALERT2, real-time'],
                            ].map(([equip, spec, qty, rating]) => (
                                <tr key={equip} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#3B82F6] font-medium whitespace-nowrap">{equip}</td>
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
                                ['L0 — Process', 'Rain gauges, flow meters, level sensors, gate actuators, WQ sensors', 'SDI-12, 4–20 mA, pulse'],
                                ['L1 — Basic Control', 'RTUs at basins/outfalls (solar-powered), PLC for RTC gates', 'Modbus RTU, DNP3'],
                                ['L2 — Supervisory', 'Stormwater SCADA (central), RTC decision engine, NWS radar feed', 'DNP3/TCP, cellular LTE'],
                                ['L3 — Operations', 'GIS/asset management, hydraulic model (SWMM/InfoSWMM), CMMS', 'REST APIs, SQL, WFS/WMS'],
                                ['L3.5 — DMZ', 'Firewall, VPN for remote RTU access', 'HTTPS, encrypted DNP3-SA'],
                                ['L4 — Enterprise', 'MS4 annual reporting, TMDL tracking, stormwater utility billing', 'REST, HTTPS, XML'],
                            ].map(([level, components, protocols]) => (
                                <tr key={level} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#3B82F6] font-mono font-medium whitespace-nowrap">{level}</td>
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
                                ['Flood Warning', 'ALERT/IFLOWS rain + stage telemetry, NWS integration', 'Real-time, automated alerts, public notification'],
                                ['IDDE Program', 'Illicit discharge detection and elimination', 'Outfall screening, dye/smoke testing, GIS tracking'],
                                ['BMP Maintenance', 'Scheduled inspection and maintenance of all stormwater BMPs', 'Per state BMP manual, CMMS work orders, annual reports'],
                                ['Erosion/Sediment Control', 'Construction site inspections and compliance', 'NPDES CGP, SWPPP review, weekly inspections'],
                                ['Stormwater Utility', 'Fee-based funding model (ERU = equivalent residential unit)', 'GIS impervious area measurement, credit programs'],
                                ['Public Education', 'Stormwater awareness, pollution prevention, stewardship', 'Websites, storm drain markers, adopt-a-drain programs'],
                                ['Hydraulic Modeling', 'Rainfall-runoff and conveyance capacity analysis', 'EPA SWMM, PCSWMM, InfoSWMM, HEC-HMS/RAS'],
                                ['Dam Safety', 'Embankment inspection and EAP for detention facilities', 'State dam safety program, hazard classification'],
                            ].map(([system, desc, spec]) => (
                                <tr key={system} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#3B82F6] font-medium whitespace-nowrap">{system}</td>
                                    <td className="px-3 py-2 text-gray-400">{desc}</td>
                                    <td className="px-3 py-2 text-gray-400">{spec}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* 8. BMP Performance Summary */}
            <Section title="8. BMP Performance Summary" id="bmp-performance">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">BMP Type</th>
                                <th className="text-left px-3 py-2 font-medium">TSS Removal</th>
                                <th className="text-left px-3 py-2 font-medium">TP Removal</th>
                                <th className="text-left px-3 py-2 font-medium">Volume Reduction</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Bioretention / Rain Garden', '70–90%', '50–70%', '40–60%'],
                                ['Permeable Pavement', '80–95%', '40–60%', '50–90%'],
                                ['Constructed Wetland', '60–85%', '30–50%', '10–30%'],
                                ['Dry Detention Basin', '50–70%', '15–30%', '0% (timing only)'],
                                ['Wet Retention Pond', '70–90%', '40–60%', '0% (timing only)'],
                                ['Vortex Separator', '50–80%', '10–20%', '0%'],
                                ['Sand/Media Filter', '80–95%', '40–60%', '0–20%'],
                                ['Green Roof', '70–85%', '40–55%', '50–90%'],
                                ['Bioswale', '60–80%', '30–50%', '20–40%'],
                            ].map(([bmp, tss, tp, vol]) => (
                                <tr key={bmp} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#3B82F6] font-medium whitespace-nowrap">{bmp}</td>
                                    <td className="px-3 py-2 text-gray-400">{tss}</td>
                                    <td className="px-3 py-2 text-gray-400">{tp}</td>
                                    <td className="px-3 py-2 text-gray-400">{vol}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">
                    Performance ranges from International Stormwater BMP Database (WERF, 2020)
                    and state BMP manuals. Actual performance varies with design, soil, and maintenance.
                </p>
            </Section>

            {/* 9. Data Flow Architecture */}
            <Section title="9. Data Flow Architecture" id="data-flow">
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`TIER 1 — FIELD (20+ remote sites, 200+ I/O total)
├── Rain Gauges (10)             → SDI-12   → RTU    @ 0.01" tip
├── Flow Meters (15)             → 4-20 mA  → RTU    @ 5-min
├── Level Sensors (20)           → 4-20 mA  → RTU    @ 1-min
├── WQ Samplers (5)              → Event    → Manual  @ storm events
├── Gate Actuators (8)           → Discrete  → PLC    @ event (RTC)
├── ALERT Stations (6)           → Radio    → Base    @ 1-min
└── BMP Inspection Data          → Mobile   → Cloud   @ per-visit

TIER 2 — STORMWATER SCADA + RTC
├── Real-time SCADA              → DNP3     → Operator  @ 1-min
├── RTC Decision Engine          → Model    → Gates     @ 5-min
├── NWS Radar/QPF Feed           → API      → Forecast  @ 5-min
├── Flood Warning Display        → ALERT    → Public    @ real-time
└── Historian / trend logging    → OPC-HDA  → 1-min archive

TIER 3 — ENTERPRISE
├── MS4 Annual Report            → REST     → State DEQ  @ annual
├── TMDL Compliance Tracking     → SQL      → Pollutant loads @ quarterly
├── GIS / Asset Management       → WFS      → BMP inventory @ on-demand
├── CMMS (BMP Maintenance)       → REST     → Work orders   @ on-demand
├── Stormwater Utility Billing   → SQL      → ERU billing   @ monthly
└── Public Dashboard             → HTTPS    → Rain/flood    @ real-time`}</pre>
                </div>
            </Section>

            {/* 10. References */}
            <Section title="10. References" id="references">
                <div className="space-y-2 text-xs text-gray-400 leading-relaxed">
                    <p>U.S. Environmental Protection Agency. (2021). <em>National Stormwater Calculator User&apos;s Guide</em>. EPA/600/R-13/085b.</p>
                    <p>U.S. Environmental Protection Agency. (2004). <em>Stormwater Best Management Practice Design Guide</em>. EPA/600/R-04/121.</p>
                    <p>Water Environment Research Foundation. (2020). <em>International Stormwater BMP Database: 2020 Summary Statistics</em>. WERF.</p>
                    <p>American Society of Civil Engineers. (2022). <em>Standard Guidelines for the Design of Urban Stormwater Systems</em>. ASCE/EWRI 45-22.</p>
                    <p>Federal Highway Administration. (2013). <em>HEC-22: Urban Drainage Design Manual</em> (3rd ed.). FHWA-NHI-10-009.</p>
                    <p>National Academies of Sciences. (2009). <em>Urban Stormwater Management in the United States</em>. National Academies Press.</p>
                    <p>National Institute of Standards and Technology. (2023). <em>SP 800-82 Rev. 3: Guide to OT Security</em>. NIST.</p>
                    <p>U.S. Army Corps of Engineers. (2018). <em>HEC-HMS Hydrologic Modeling System User&apos;s Manual</em>. USACE.</p>
                </div>
            </Section>

            {/* See Also */}
            <Section title="See Also" id="see-also">
                <div className="flex flex-wrap gap-2">
                    {[
                        { href: '/wiki/water', label: 'Water Sector Hub', color: '#06B6D4' },
                        { href: '/wiki/water/collection-systems', label: 'Collection Systems', color: '#F97316' },
                        { href: '/wiki/water/distribution', label: 'Distribution Networks', color: '#0EA5E9' },
                        { href: '/wiki/water/treatment-plants', label: 'Treatment Plants', color: '#06B6D4' },
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
