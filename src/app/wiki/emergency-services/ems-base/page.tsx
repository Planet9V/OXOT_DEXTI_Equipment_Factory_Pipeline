/**
 * EMS Base Station — Deep Dive Wiki Article.
 * Ambulance operations, Stryker Power-PRO, ePCR/NEMSIS, SSM deployment.
 * @module wiki/emergency-services/ems-base/page
 */
export const metadata = {
    title: 'EMS Base Station — EMER Deep Dive',
    description: 'TOGAF reference architecture for EMS bases: ambulance fleet ops, ePCR/NEMSIS, medical telemetry, SSM deployment, and NFPA 1917 compliance.',
};

export default function EmsBasePage() {
    const C = '#10B981';
    return (
        <div className="max-w-5xl space-y-10">
            <header className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]" style={{ background: C }} />
                    <span className="text-xs font-mono text-gray-500">EMER · EMS · BASE STATION</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">EMS Base Station</h1>
                <p className="text-sm text-gray-400 max-w-3xl">Emergency Medical Services base of operations with ambulance maintenance, ePCR/NEMSIS data management, medical telemetry, System Status Management deployment, and simulation-based training. Reference for a 50-unit metropolitan fleet.</p>
                <div className="flex flex-wrap gap-2 pt-1">
                    {['NEMSIS', 'HIPAA', 'NFPA 1917', 'ProQA', 'ePCR', 'SSM'].map((t) => (
                        <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded border border-[#10B981]/30 text-[#10B981]">{t}</span>
                    ))}
                </div>
            </header>

            <Section title="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-300 leading-relaxed">EMS base stations serve as the <span className="text-[#10B981] font-medium">operational headquarters</span> for ambulance services, managing fleet deployment, crew scheduling, equipment maintenance, and clinical quality assurance. The U.S. operates 21,000+ EMS agencies with 82,000+ ambulances responding to approximately 37 million calls annually.</p>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">Stakeholders</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li><span className="text-[#10B981] font-medium">NHTSA OEMS</span> — Federal EMS office; EMS Agenda 2050, NEMSIS standard</li>
                    <li><span className="text-[#10B981] font-medium">State EMS Bureau</span> — Licensing, protocols, trauma system designation</li>
                    <li><span className="text-[#10B981] font-medium">Medical Director</span> — Physician oversight, protocol development, QA/QI</li>
                    <li><span className="text-[#10B981] font-medium">NAEMSP</span> — National Association of EMS Physicians</li>
                    <li><span className="text-[#10B981] font-medium">Hospital/Trauma Centers</span> — Receiving facilities, protocol coordination</li>
                    <li><span className="text-[#10B981] font-medium">CMS</span> — Medicare/Medicaid ambulance reimbursement (AFS)</li>
                    <li><span className="text-[#10B981] font-medium">CAAS</span> — Commission on Accreditation of Ambulance Services</li>
                </ul>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">Regulatory Framework</h3>
                <Table headers={['Standard', 'Scope']} rows={[
                    ['NFPA 1917', 'Automotive ambulance design and construction standards'],
                    ['NEMSIS v3.5', 'National EMS Information System data standard'],
                    ['HIPAA', 'Patient health information privacy and security'],
                    ['CAAS GVS 2.0', 'Ground vehicle standards for ambulances'],
                    ['KKK-A-1822', 'Federal ambulance specification (Type I/II/III)'],
                    ['OSHA BBP', '29 CFR 1910.1030 bloodborne pathogens standard'],
                    ['State Protocols', 'Medical Director-approved standing orders and SMOs'],
                ]} color={C} />
            </Section>

            <Section title="2. High-Level Design" id="design">
                <p className="text-sm text-gray-300 leading-relaxed">A metropolitan EMS base integrates vehicle maintenance and logistics with dispatch operations, clinical services, and training. System Status Management (SSM) dynamically positions units using historical call volume analysis.</p>
                <Diagram>{
                    `┌──────────────────────────────────────────────────────────────────────┐
│                         EMS BASE STATION                            │
├──────────────────┬────────────────────┬──────────────────────────────┤
│ VEHICLE BAYS     │ OPERATIONS WING    │ CLINICAL / TRAINING         │
│ (8-bay garage)   │                    │                             │
│ ┌──────────────┐ │ • Dispatch/SSM     │ • QA/QI Review Room         │
│ │ ALS Unit 1-4 │ │   (2 consoles)     │ • Medical Director Office   │
│ │ BLS Unit 1-4 │ │ • Crew Quarters    │ • Simulation Lab            │
│ ├──────────────┤ │   (16 bunks)       │   Laerdal SimMan 3G        │
│ │ Fly Car      │ │ • IT / Server Rm   │ • Skills Practice Room      │
│ │ Supervisor   │ │ • Supply/Logistics │ • Classroom (30 seats)      │
│ └──────────────┘ │ • Narcotics Safe   │ • Biomed / Device Mgmt      │
│ Vehicle Maint    │ • Pharmacy Lockbox  │ • Infection Control Area    │
│ Lift / Wash      │ • Decon Station     │                             │
│ Charging Docks   │ • Break Room/Galley │ ┌──────────────────────┐   │
│ O₂ / Suction Svc │ • Fitness Center    │ │ Telemetry / Comms    │   │
│                  │                    │ │ 12-Lead → Hospital   │   │
└──────────────────┴────────────────────┴─┴──────────────────────┴───┘`
                }</Diagram>
                <p className="text-xs text-gray-500 mt-2 italic">Figure 1 — 50-unit metro EMS base with vehicle bays, ops, and clinical training.</p>
            </Section>

            <Section title="3. Detailed Technical Description" id="technical">
                <h3 className="text-sm font-semibold text-white/80 mb-2">3.1 Fleet Operations & SSM</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>System Status Management (SSM) — demand analysis, posting plans, unit-hour utilization</li>
                    <li>AVL/GPS — 5-sec polling, geofencing, closest-unit recommendation</li>
                    <li>CAD interface — Hexagon/Tyler CAD, automated dispatch, MPDS/ProQA triage</li>
                    <li>Fleet management — AssetWorks FleetFocus, PM scheduling, life-cycle tracking</li>
                    <li>Response time monitoring — 90th percentile targets (8:59 ALS, 12:59 BLS)</li>
                </ul>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">3.2 Patient Care Technology</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>Stryker Power-PRO XT — powered stretcher, 700 lb capacity, hydraulic loading</li>
                    <li>ZOLL X-Series monitor/defibrillator — 12-lead ECG, SpO₂, EtCO₂, NIBP, pacing</li>
                    <li>LUCAS 3 — mechanical CPR device, consistent 2″ depth, 100–120 comp/min</li>
                    <li>Dräger Oxylog 3000+ — transport ventilator, SIMV/PSV/CPAP, PEEP 0–20 cmH₂O</li>
                    <li>King Vision video laryngoscope — channelled/standard blade, difficult airway mgmt</li>
                </ul>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">3.3 ePCR / Data Management</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>ESO ePCR (or ImageTrend) — NEMSIS v3.5 compliant, tablet-based, offline mode</li>
                    <li>12-lead ECG transmission — ZOLL RescueNet via cellular → receiving hospital</li>
                    <li>NEMSIS data export — state repository, quarterly submission, STEMI/stroke metrics</li>
                    <li>QA/QI platform — flag charts by protocol deviation, response time, clinical outcome</li>
                    <li>Billing interface — ePCR → PCR to AFS (Ambulance Fee Schedule) coding</li>
                </ul>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">3.4 Communications</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>Motorola APX 8000 portable — P25 Phase II, AES-256, GPS, HIPAA-safe</li>
                    <li>FirstNet (Band 14) — MDT, ePCR upload, 12-lead TX, AVL, priority access</li>
                    <li>Hospital notification — HEAR-compatible radio or cellular patch to ED</li>
                    <li>MED channel — direct medical control physician consultation (UHF 462–470 MHz)</li>
                </ul>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">3.5 Training & Simulation</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>Laerdal SimMan 3G — high-fidelity patient simulator, programmable scenarios</li>
                    <li>ACLS/PALS/ITLS skills lab — IV access, intubation, chest decompression</li>
                    <li>Simulation debriefing — video recording, instructor console, AAR format</li>
                    <li>CE tracking — state-required hours, NREMT recertification, protocol updates</li>
                </ul>
            </Section>

            <Section title="4. Process Diagrams" id="process">
                <h3 className="text-sm font-semibold text-white/80 mb-2">4.1 EMS Call Lifecycle</h3>
                <Diagram>{
                    `911 Call ──► PSAP/ProQA ──► EMD Triage ──► Dispatch (CAD)
                                │                  │
                           DLS Code            Closest Unit
                           Pre-arrival         SSM Post Plan
                           instructions            │
                                │          ┌───────┴───────┐
                                │     En Route          On Scene
                                │      (AVL)         (Assessment)
                                │          │               │
                                │     ┌────┴──── ALS/BLS ──┤
                                │     │                    │
                                │  Transport          Treat & Release
                                │  12-Lead TX         Refusal (AMA)
                                │  Hosp Notif              │
                                │     │                ePCR Complete
                                │  Patient Transfer        │
                                │  ED Handoff         NEMSIS Upload
                                │     │                    │
                                └─────┴──── Available ─────┘`
                }</Diagram>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">4.2 System Status Management</h3>
                <Diagram>{
                    `Historical Data ──► Demand Forecast ──► Posting Plan
     │                     │                  │
  Call volume          Erlang model       Deploy positions
  Time-of-day          Coverage zones     Unit-hour ratio
  Day-of-week              │              (UHU target 0.35)
     │                     │                  │
  Real-Time ──► Dynamic Repost ──► SSM Dashboard
  AVL/GPS        Level-zero        Coverage heat map
  Queue depth    contingency       Response time monitor`
                }</Diagram>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">4.3 QA/QI Process</h3>
                <Diagram>{
                    `ePCR Submitted ──► Auto-Flags ──► QA Review ──► Feedback
      │                │              │              │
  NEMSIS data     Protocol dev    Peer review    Remediation
  Response time   Missing vitals  Med Director   CE assignment
  Clinical data   STEMI delay     Run review     Protocol update`
                }</Diagram>
            </Section>

            <Section title="5. Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2 italic">Scaled for 50-unit metropolitan EMS fleet with 8-bay base station.</p>
                <Table headers={['Equipment', 'Specification', 'Qty', 'Rating']} rows={[
                    ['Stryker Power-PRO XT', 'Powered stretcher, hydraulic load', '50', '700 lb capacity'],
                    ['ZOLL X-Series Monitor', '12-lead, SpO₂, EtCO₂, NIBP', '50', 'ALS/CCT capable'],
                    ['LUCAS 3 CPR Device', 'Mechanical CPR, battery', '25', '100–120 comp/min'],
                    ['Dräger Oxylog 3000+', 'Transport ventilator', '25', 'SIMV/PSV/CPAP'],
                    ['ESO ePCR Tablets', 'Samsung Galaxy Tab Active4', '100', 'NEMSIS v3.5'],
                    ['Motorola APX 8000', 'P25 Phase II portable', '100', 'AES-256, GPS'],
                    ['Panasonic CF-33 MDT', 'In-cab mobile data terminal', '50', 'FirstNet LTE'],
                    ['Laerdal SimMan 3G', 'High-fidelity simulator', '2', 'Full-body, wireless'],
                    ['ZOLL RescueNet', '12-lead TX server, QA', '1', '50 vehicles'],
                    ['AssetWorks FleetFocus', 'Fleet management software', '1', '50 vehicles'],
                    ['SSM/Demand Platform', 'Optima (or equivalent)', '1', '50 posting plans'],
                    ['Narcotics Safe', 'DEA Schedule II–V storage', '1', 'Class 5, TL-15'],
                    ['O₂ Cascade System', 'Med-grade O₂ manifold', '1', '12 H-cylinders'],
                    ['Suction Pump Service', 'SSCOR, portable + wall mount', '50', '300 mmHg'],
                    ['Stryker Stair-PRO', 'Powered stair chair', '50', '500 lb, tracked'],
                    ['Vehicle Lift', '4-post, ambulance-rated', '2', '18,000 lb'],
                    ['AED (Trainer)', 'ZOLL AED Plus, training mode', '10', 'CPR feedback'],
                    ['Cummins Generator', 'Diesel, ATS, base backup', '1', '150 kW'],
                    ['Medical Refrigerator', 'Temp-monitored, medication', '2', '5°C ±2°C'],
                    ['Decon Station', 'Portable shower, biohazard', '1', 'OSHA BBP'],
                ]} color={C} />
            </Section>

            <Section title="6. Purdue Model Mapping" id="purdue">
                <Table headers={['Level', 'Components', 'Protocols']} rows={[
                    ['L4 Enterprise', 'NEMSIS state repository, CMS billing, CAAS accredit', 'HTTPS, NEMSIS XML, REST'],
                    ['L3.5 DMZ', 'ePCR gateway, 12-lead TX server, HIPAA proxy', 'TLS, HL7 FHIR, IPsec'],
                    ['L3 Operations', 'CAD, SSM platform, fleet mgmt, QA/QI dashboard', 'CAD XML, REST, SQL'],
                    ['L2 Supervisory', 'Dispatch console, AVL display, telemetry monitor', 'SIP, SNMP, RTSP'],
                    ['L1 Control', 'MDT/MDC, ZOLL monitor, Lucas CPR, ePCR tablet', 'Bluetooth, Wi-Fi, LTE'],
                    ['L0 Process', 'Stretcher sensors, SpO₂ probe, 12-lead leads', '4-20mA, Bluetooth LE'],
                ]} color={C} />
            </Section>

            <Section title="7. Supporting Systems" id="supporting">
                <Table headers={['System', 'Description', 'Specification']} rows={[
                    ['Vehicle Charging', 'Shore power, battery maintainer', '120V/240V per bay'],
                    ['O₂ Storage', 'Med-grade cascade, H-cylinder', 'USP Grade, 99.0%'],
                    ['Medication Storage', 'Temp-monitored fridge/safe', '5°C, DEA Sched II–V'],
                    ['Decontamination', 'Biohazard decon station', 'OSHA BBP compliant'],
                    ['Standby Power', 'Cummins diesel, ATS', '150 kW, 48-hr fuel'],
                    ['Physical Security', 'Card access, CCTV, narcotics safe', '24/7 monitoring'],
                ]} color={C} />
            </Section>

            <Section title="8. Clinical Quality & Compliance" id="clinical">
                <Table headers={['Metric', 'Target', 'Standard']} rows={[
                    ['Response Time (ALS)', '≤8:59 (90th percentile)', 'CAAS GVS 2.0'],
                    ['Response Time (BLS)', '≤12:59 (90th percentile)', 'CAAS GVS 2.0'],
                    ['STEMI Door-to-Balloon', '≤90 min total', 'AHA 2020 Guidelines'],
                    ['Stroke Onset-to-ED', '≤60 min EMS interval', 'ASA Guidelines'],
                    ['ROSC Rate (Cardiac Arrest)', '≥30% (Utstein)', 'AHA Resuscitation'],
                    ['ePCR Completion', '100% within 24 hours', 'NEMSIS v3.5 standard'],
                    ['HIPAA Compliance', 'Zero PHI breaches', 'HHS/OCR'],
                ]} color={C} />
            </Section>

            <Section title="9. Data Flow Architecture" id="dataflow">
                <Diagram>{
                    `┌───────────────────────────────────────────────────────────────────┐
│ TIER 4 — ENTERPRISE    NEMSIS · CMS/AFS · State EMS Bureau      │
│  ── NEMSIS XML / REST ── quarterly batch + on-demand ────────────│
├───────────────────────────────────────────────────────────────────┤
│ TIER 3 — OPERATIONS    CAD · SSM · Fleet Mgmt · QA/QI           │
│  ── HL7 FHIR / REST ── real-time dispatch + post-call ──────────│
├───────────────────────────────────────────────────────────────────┤
│ TIER 2 — SUPERVISORY    Dispatch · AVL · Telemetry · RescueNet  │
│  ── SIP / SNMP ── 5-sec AVL, event-driven alerts ───────────────│
├───────────────────────────────────────────────────────────────────┤
│ TIER 1 — FIELD          ePCR · ZOLL Monitor · MDT · P25 Radio   │
│  ── LTE / Bluetooth / P25 ── continuous patient + unit data ─────│
└───────────────────────────────────────────────────────────────────┘`
                }</Diagram>
            </Section>

            <Section title="10. References" id="references">
                <ul className="space-y-2 text-xs text-gray-500 font-mono">
                    <li>• NHTSA. (2019). <em>EMS Agenda 2050: A People-Centered Vision.</em></li>
                    <li>• NFPA. (2022). <em>NFPA 1917: Automotive Ambulances.</em></li>
                    <li>• NEMSIS. (2023). <em>NEMSIS v3.5 Data Dictionary.</em></li>
                    <li>• CAAS. (2021). <em>Ground Vehicle Standard v2.0.</em></li>
                    <li>• AHA. (2020). <em>Guidelines for CPR and ECC.</em></li>
                    <li>• CMS. (2023). <em>Ambulance Fee Schedule (AFS) Final Rule.</em></li>
                    <li>• HHS. (2022). <em>HIPAA Security Rule, 45 CFR 164.</em></li>
                    <li>• NAEMSP. (2021). <em>Medical Direction Position Statements.</em></li>
                </ul>
            </Section>

            <Section title="See Also" id="see-also">
                <div className="flex flex-wrap gap-3">
                    {[
                        { label: 'Emergency Services Hub', href: '/wiki/emergency-services', color: '#DC2626' },
                        { label: '911/PSAP', href: '/wiki/emergency-services/psap-911', color: '#DC2626' },
                        { label: 'Fire Station', href: '/wiki/emergency-services/fire-station', color: '#F97316' },
                        { label: 'HazMat Response', href: '/wiki/emergency-services/hazmat-response', color: '#EAB308' },
                        { label: 'EMER Sector', href: '/wiki/sectors/EMER', color: '#DC2626' },
                    ].map((l) => (
                        <a key={l.label} href={l.href} className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-white/[0.04]" style={{ borderColor: `${l.color}30`, color: l.color }}>{l.label} →</a>
                    ))}
                </div>
            </Section>
        </div>
    );
}

function Section({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
    return (<section id={id} className="space-y-4 pt-8 border-t border-white/[0.04]"><h2 className="text-lg font-heading font-semibold text-white/90">{title}</h2>{children}</section>);
}
function Diagram({ children }: { children: string }) {
    return (<div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}><pre className="whitespace-pre leading-relaxed">{children}</pre></div>);
}
function Table({ headers, rows, color }: { headers: string[]; rows: string[][]; color: string }) {
    return (<div className="overflow-x-auto"><table className="w-full text-xs border-collapse"><thead><tr className="border-b border-white/[0.08] text-gray-500">{headers.map((h) => (<th key={h} className="text-left px-3 py-2 font-medium">{h}</th>))}</tr></thead><tbody className="text-gray-400 divide-y divide-white/[0.04]">{rows.map((r) => (<tr key={r[0]} className="hover:bg-white/[0.02]"><td className="px-3 py-2 font-medium whitespace-nowrap" style={{ color }}>{r[0]}</td>{r.slice(1).map((c, i) => (<td key={i} className="px-3 py-2">{c}</td>))}</tr>))}</tbody></table></div>);
}
