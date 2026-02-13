/**
 * HazMat Response Facility — Deep Dive Wiki Article.
 * Level A/B/C PPE, RAE PID, FTIR/GC-MS, mass decon, CAMEO/ALOHA.
 * @module wiki/emergency-services/hazmat-response/page
 */
export const metadata = {
    title: 'HazMat Response Facility — EMER Deep Dive',
    description: 'TOGAF reference architecture for HazMat response: Level A/B/C PPE, PID/FTIR detection, mass decontamination, IS radios, and CAMEO/ALOHA modeling.',
};

export default function HazmatResponsePage() {
    const C = '#EAB308';
    return (
        <div className="max-w-5xl space-y-10">
            <header className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]" style={{ background: C }} />
                    <span className="text-xs font-mono text-gray-500">EMER · HAZMAT · RESPONSE FACILITY</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">Hazardous Materials Response Facility</h1>
                <p className="text-sm text-gray-400 max-w-3xl">HazMat response team facility with Level A–C PPE, multi-gas/PID/FTIR detection, mass decontamination corridors, intrinsically safe communications, and CAMEO/ALOHA plume modeling. Reference for a regional Type I HazMat team.</p>
                <div className="flex flex-wrap gap-2 pt-1">
                    {['HAZWOPER', 'ATEX', 'ERG', 'CERCLA', 'NFPA 472', 'OSHA'].map((t) => (
                        <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded border border-[#EAB308]/30 text-[#EAB308]">{t}</span>
                    ))}
                </div>
            </header>

            <Section title="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-300 leading-relaxed">HazMat response teams provide <span className="text-[#EAB308] font-medium">specialized technical rescue</span> for chemical, biological, radiological, nuclear, and explosive (CBRNE) incidents. The U.S. maintains approximately 400+ Type I teams and 2,000+ Type III teams under OSHA 29 CFR 1910.120 (HAZWOPER) requirements.</p>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">Stakeholders</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li><span className="text-[#EAB308] font-medium">OSHA</span> — HAZWOPER (1910.120), respiratory protection (1910.134)</li>
                    <li><span className="text-[#EAB308] font-medium">EPA</span> — CERCLA/Superfund, EPCRA/SARA Title III, RMP facility oversight</li>
                    <li><span className="text-[#EAB308] font-medium">DOT/PHMSA</span> — Hazardous materials transportation regulations (49 CFR)</li>
                    <li><span className="text-[#EAB308] font-medium">NFPA</span> — NFPA 472/473 (competencies), NFPA 1991–1994 (PPE standards)</li>
                    <li><span className="text-[#EAB308] font-medium">CHEMTREC</span> — 24/7 chemical emergency hotline, SDS access</li>
                    <li><span className="text-[#EAB308] font-medium">FEMA USAR/CBRN</span> — Federal asset coordination, WMD response</li>
                    <li><span className="text-[#EAB308] font-medium">Local LEPC</span> — Local Emergency Planning Committee, Tier II data</li>
                </ul>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">Regulatory Framework</h3>
                <Table headers={['Standard', 'Scope']} rows={[
                    ['OSHA 29 CFR 1910.120', 'HAZWOPER — training, medical surveillance, site control'],
                    ['NFPA 472', 'Competence of responders to hazardous materials/WMD'],
                    ['NFPA 473', 'Competencies for EMS personnel responding to HazMat'],
                    ['NFPA 1991', 'Vapor-protective ensembles (Level A) for CBRN'],
                    ['NFPA 1992', 'Liquid splash-protective ensembles (Level B)'],
                    ['EPA CERCLA / SARA III', 'Superfund cleanup and community right-to-know'],
                    ['DOT ERG (2024)', 'Emergency Response Guidebook for transportation'],
                ]} color={C} />
            </Section>

            <Section title="2. High-Level Design" id="design">
                <p className="text-sm text-gray-300 leading-relaxed">A HazMat response facility houses specialized apparatus, detection/identification equipment, PPE, and decontamination systems. The ICS HazMat branch establishes hot/warm/cold zones at every incident.</p>
                <Diagram>{
                    `┌──────────────────────────────────────────────────────────────────────┐
│                     HAZMAT RESPONSE FACILITY                        │
├──────────────────┬────────────────────┬──────────────────────────────┤
│ APPARATUS BAY    │ EQUIPMENT ROOMS    │ OPERATIONS / TRAINING       │
│                  │                    │                              │
│ ┌──────────────┐ │ • Detection Lab    │ • SOC / Planning Room       │
│ │ HazMat Unit  │ │   PID, 4-gas, FTIR│ • CAMEO/ALOHA Workstation   │
│ │ (Heavy)      │ │ • PPE Storage      │ • Classroom (20 seats)      │
│ ├──────────────┤ │   Level A/B/C/D    │ • Training Props            │
│ │ Decon Unit   │ │ • SCBA Cascade     │   (drums, tankers, rail)    │
│ │ (Mass decon) │ │   4500 psi air     │ • Evidence Storage          │
│ ├──────────────┤ │ • Chemical Ref Lab │ • Medical Monitoring Bay    │
│ │ Command      │ │   pH, LEL, Rad     │ • Briefing/AAR Room         │
│ │ Vehicle      │ │ • Decon Equipment  │ • Fitness / Rehab           │
│ └──────────────┘ │   Showers, basins  │                              │
│ Shore power,     │ • IS Radio Storage  │ ┌────────────────────────┐  │
│ exhaust extract   │ • Evidence Lock-up  │ │ Decon Practice Pad     │  │
│                  │                    │ │ Runoff containment      │  │
└──────────────────┴────────────────────┴─┴────────────────────────┴──┘`
                }</Diagram>
                <p className="text-xs text-gray-500 mt-2 italic">Figure 1 — Type I HazMat response facility layout.</p>
            </Section>

            <Section title="3. Detailed Technical Description" id="technical">
                <h3 className="text-sm font-semibold text-white/80 mb-2">3.1 Detection & Identification</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-2">Multi-tier detection: survey meters identify presence, monitors quantify concentration, and laboratory instruments confirm identity.</p>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>RAE Systems MiniRAE 3000 PID — photoionization detector, 0.1–15,000 ppm VOCs</li>
                    <li>RAE MultiRAE Pro — 6-gas (LEL/O₂/CO/H₂S/VOC/custom), wireless, ATEX certified</li>
                    <li>Thermo Scientific FirstDefender RMX — handheld Raman spectrometer, 10,000+ library</li>
                    <li>Bruker Alpha II FTIR — portable Fourier-transform IR, solid/liquid/gas analysis</li>
                    <li>Ludlum Model 3 survey meter — alpha/beta/gamma radiation, pancake probe</li>
                    <li>FLIR Griffin G510 GC-MS — field-portable, IDLH-level unknowns, 5-min analysis</li>
                    <li>Drager CMS chips — colorimetric tubes, 200+ substances, semi-quantitative</li>
                    <li>HazMatID Elite — FTIR for powders/liquids/solids, ATR diamond crystal</li>
                </ul>

                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">3.2 Personal Protective Equipment</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>Level A — Kappler Zytron 500 vapor suit, SCBA (Scott X3 Pro), triple gloves</li>
                    <li>Level B — Kappler Zytron 300 splash suit, SCBA, chemical boots, double gloves</li>
                    <li>Level C — Tyvek/Tychem QC with APR (3M 6800 full-face), chemical boots</li>
                    <li>CPC testing — ASTM F739 permeation testing, 8-hr breakthrough data per chemical</li>
                    <li>Cooling vests — Phase-change (Techniche HyperKewl), 2-hr duration, rehab critical</li>
                </ul>

                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">3.3 Decontamination</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>Technical decon — 3-stage corridor: gross removal → soap wash → rinse</li>
                    <li>Mass decon — inflatable shower (DQE HM4500), 150 persons/hr, heated water</li>
                    <li>Runoff containment — Pig Collapsible Berms, 500 gal capacity, Haz-waste drum</li>
                    <li>Evidence decon — triple-rinse protocol for forensic/law enforcement items</li>
                </ul>

                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">3.4 Communications (IS-rated)</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>Motorola APX 6000XE — intrinsically safe, P25 Phase II, ATEX Zone 1, FM approved</li>
                    <li>MSA G1 SCBA — integrated PASS alarm, thermal imaging camera, voice amplifier</li>
                    <li>ISI Viking AT — SCBA + radio combo with bone-conduction mic in facepiece</li>
                    <li>FLIR K55 TIC — thermal imaging camera, IS-rated, 320×240, video recording</li>
                </ul>

                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">3.5 Modeling & Decision Support</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>CAMEO Suite (EPA/NOAA) — chemical database, mapping, facility info (Tier II)</li>
                    <li>ALOHA — areal locations of hazardous atmospheres, Gaussian plume dispersion</li>
                    <li>MARPLOT — GIS mapping engine integrated with CAMEO/ALOHA threat zones</li>
                    <li>WISER (NLM) — wireless hazardous substance identification/treatment database</li>
                    <li>ERG 2024 — Emergency Response Guidebook, initial action distances, isolation zones</li>
                </ul>
            </Section>

            <Section title="4. Process Diagrams" id="process">
                <h3 className="text-sm font-semibold text-white/80 mb-2">4.1 HazMat Response Phases</h3>
                <Diagram>{
                    `Notification ──► Dispatch ──► En Route ──► Arrival / Size-Up
     │               │            │              │
  CAD/911        Type I team   DOT Placard    Binoculars
  CHEMTREC       HM apparatus  ERG lookup     Wind/terrain
  Tier II data   PPE pre-stage SDS review     Upwind approach
     │               │            │              │
     └───── ICS Established ──────┴──────────────┘
                    │
     ┌──────────────┼──────────────────────┐
     │              │                      │
 ZONE SETUP    ENTRY TEAM            DECON TEAM
 Hot/Warm/Cold  Level A/B dress      3-stage corridor
 Perimeter      Buddy system         Runoff containment
 300 ft minimum 30-min air limit     Mass decon standby
     │              │                      │
     └── Monitoring ┴── ID/Mitigation ─────┘
              │
     Containment ──► Cleanup ──► Debrief ──► AAR
     (Overpacks)    (Contractor)   (ICS)    (Lessons)`
                }</Diagram>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">4.2 Detection Decision Tree</h3>
                <Diagram>{
                    `Approach ──► Survey (MultiRAE) ──► LEL/O₂/CO/H₂S Reading
                    │                       │
                 >10% LEL?            Toxics Present?
                 YES → Withdraw       YES → Level A Entry
                 NO  → Continue            │
                    │               PID → FTIR → GC-MS
                    │               (Survey) (ID)  (Confirm)
                    │                       │
                    │              Chemical Identified
                    │              ERG → SDS → ALOHA
                    │              (Guide) (Data) (Plume)
                    │                       │
                    └── Mitigation Plan ────┘
                        Plugging/Patching
                        Neutralization
                        Overpack/Transfer`
                }</Diagram>
                <h3 className="text-sm font-semibold text-white/80 mt-4 mb-2">4.3 Entry Team Cycle</h3>
                <Diagram>{
                    `Briefing ──► Dress-Out ──► Entry ──► Work ──► Exit ──► Decon ──► Rehab
  │             │            │        │        │         │          │
ICS 215      Level A/B   Buddy sys  Sample   Air alarm  3-stage   Medical
Objectives   SCBA check  Radio comm Contain  30-min     Corridor  Vitals
Air plan     Tag/manifest Hot zone   Mitigate limit     Runoff    Hydration
  │             │            │        │        │         │          │
  └─── 30 min max ──────────┴────────┴────────┘         Entry      Back-up
       per entry                                        Log        Crew`
                }</Diagram>
            </Section>

            <Section title="5. Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2 italic">Scaled for a regional Type I HazMat team (25 technicians, 3 apparatus).</p>
                <Table headers={['Equipment', 'Specification', 'Qty', 'Rating']} rows={[
                    ['RAE MiniRAE 3000 PID', 'VOC detector, 0.1–15K ppm', '4', '10.6 eV lamp'],
                    ['RAE MultiRAE Pro', '6-gas, wireless, ATEX', '6', 'LEL/O₂/CO/H₂S/VOC'],
                    ['Thermo FirstDefender', 'Raman spectrometer, handheld', '2', '10,000+ library'],
                    ['Bruker Alpha II FTIR', 'Portable IR analyzer', '1', 'ATR diamond'],
                    ['FLIR Griffin G510 GC-MS', 'Field-portable mass spec', '1', '5-min analysis'],
                    ['Ludlum Model 3', 'Radiation survey meter', '4', 'α/β/γ pancake'],
                    ['Kappler Zytron 500', 'Level A vapor suit', '20', 'NFPA 1991 CBRN'],
                    ['Kappler Zytron 300', 'Level B splash suit', '30', 'NFPA 1992'],
                    ['Scott X3 Pro SCBA', '4500 psi, 45-min', '25', 'NFPA 1981 CBRN'],
                    ['Motorola APX 6000XE', 'IS radio, P25 Phase II', '25', 'ATEX Zone 1'],
                    ['FLIR K55 TIC', 'Thermal camera, IS-rated', '6', '320×240'],
                    ['DQE HM4500 Mass Decon', 'Inflatable shower trailer', '1', '150 persons/hr'],
                    ['Decon Corridor Kit', '3-stage, portable pools', '2', '50 gal containment'],
                    ['Pig Collapsible Berms', 'Runoff containment', '4', '500 gal each'],
                    ['CAMEO/ALOHA Laptop', 'Ruggedized w/ EPA suite', '2', 'Panasonic CF-33'],
                    ['Overpack Drums (85-gal)', 'DOT-rated, polyethylene', '20', 'UN1H2/Y'],
                    ['Patch/Plug Kit', 'Chlorine, barrel, pipe', '2', 'Edwards & Cromwell'],
                    ['MSA G1 SCBA + TIC', 'Integrated thermal + PASS', '6', 'NFPA 1981'],
                    ['Phase-Change Cooling', 'HyperKewl vests + ice packs', '25', '2-hr duration'],
                    ['Haz Waste Drums (55-gal)', 'DOT-rated steel, ring lock', '50', 'UN1A2/X'],
                ]} color={C} />
            </Section>

            <Section title="6. Purdue Model Mapping" id="purdue">
                <Table headers={['Level', 'Components', 'Protocols']} rows={[
                    ['L4 Enterprise', 'EPA CERCLA, Tier II database, NFIRS, OSHA records', 'HTTPS, REST, XML'],
                    ['L3.5 DMZ', 'CHEMTREC API, NRC hotline, EPA RMP gateway', 'TLS, VPN, HTTPS'],
                    ['L3 Operations', 'CAMEO/ALOHA, ICS forms, GIS, entry log database', 'REST, WMS, SQL'],
                    ['L2 Supervisory', 'Wireless gas monitor mesh, entry team tracking', 'Wi-Fi, Bluetooth Mesh'],
                    ['L1 Control', 'PID/MultiRAE sensors, FTIR/GC-MS, IS radios', 'P25, ATEX, 4-20mA'],
                    ['L0 Process', 'Decon showers, containment valves, pH probes', 'Hardwired, dry contact'],
                ]} color={C} />
            </Section>

            <Section title="7. Supporting Systems" id="supporting">
                <Table headers={['System', 'Description', 'Specification']} rows={[
                    ['SCBA Cascade', 'Bauer compressor, 6-bank cascade', '4,500 psi, Grade D air'],
                    ['PPE Storage', 'Climate-controlled, UV-free, tagged', 'NFPA 1851 inspection'],
                    ['Decon Pad', 'Concrete with containment drain', '500 gal, bermed runoff'],
                    ['Evidence Locker', 'Chain-of-custody storage, climate', 'Law enforcement spec'],
                    ['Medical Monitoring', 'Pre/post-entry vitals station', 'BP, HR, temp, weight'],
                    ['Generator', 'Portable Honda EU7000is (IS-safe area)', '7 kW, inverter-grade'],
                ]} color={C} />
            </Section>

            <Section title="8. Safety & Medical Surveillance" id="safety">
                <Table headers={['Program', 'Requirement', 'Standard']} rows={[
                    ['HAZWOPER Training', '24-hr Tech or 40-hr WO, 8-hr annual refresh', 'OSHA 1910.120(e)'],
                    ['Medical Surveillance', 'Annual physical, PFT, audiometry, bloodwork', 'OSHA 1910.120(f)'],
                    ['Respiratory Protection', 'Fit test (annual), medical clearance', 'OSHA 1910.134'],
                    ['Heat Stress Prevention', 'Pre/post-entry vitals, cooling vests, rehab', 'OSHA TIB'],
                    ['Decon Verification', 'Wipe samples, pH test, instrument zero-check', 'EPA QA/QC'],
                    ['Exposure Records', '30-year retention, OSHA 300 log link', 'OSHA 1910.1020'],
                ]} color={C} />
            </Section>

            <Section title="9. Data Flow Architecture" id="dataflow">
                <Diagram>{
                    `┌───────────────────────────────────────────────────────────────────┐
│ TIER 4 — ENTERPRISE    EPA · OSHA · NRC · State SERC · NFIRS    │
│  ── XML / REST ── post-incident batch + regulatory reporting ────│
├───────────────────────────────────────────────────────────────────┤
│ TIER 3 — OPERATIONS    CAMEO · ALOHA · ICS · GIS · Entry Log    │
│  ── WMS/WFS / REST ── real-time plume + resource tracking ───────│
├───────────────────────────────────────────────────────────────────┤
│ TIER 2 — SUPERVISORY   Wireless Gas Mesh · Entry Tracking · TIC │
│  ── Bluetooth / Wi-Fi ── continuous PPM + personnel location ────│
├───────────────────────────────────────────────────────────────────┤
│ TIER 1 — FIELD         PID · MultiRAE · FTIR · IS Radio · SCBA │
│  ── P25 / ATEX / 4-20mA ── real-time detection + voice ─────────│
└───────────────────────────────────────────────────────────────────┘`
                }</Diagram>
            </Section>

            <Section title="10. References" id="references">
                <ul className="space-y-2 text-xs text-gray-500 font-mono">
                    <li>• OSHA. (2023). <em>29 CFR 1910.120: HAZWOPER Standard.</em></li>
                    <li>• NFPA. (2022). <em>NFPA 472: HazMat/WMD Response Competencies.</em></li>
                    <li>• NFPA. (2022). <em>NFPA 1991: Vapor-Protective Ensembles (Level A).</em></li>
                    <li>• EPA/NOAA. (2023). <em>CAMEO Suite: CAMEO, ALOHA, MARPLOT.</em></li>
                    <li>• DOT/PHMSA. (2024). <em>Emergency Response Guidebook (ERG 2024).</em></li>
                    <li>• NIOSH. (2022). <em>IDLH Values and Pocket Guide to Chemical Hazards.</em></li>
                    <li>• EPA. (2020). <em>CERCLA/Superfund Overview and NRC Reporting.</em></li>
                    <li>• IEC. (2019). <em>IEC 60079-0: Equipment for Explosive Atmospheres.</em></li>
                </ul>
            </Section>

            <Section title="See Also" id="see-also">
                <div className="flex flex-wrap gap-3">
                    {[
                        { label: 'Emergency Services Hub', href: '/wiki/emergency-services', color: '#DC2626' },
                        { label: '911/PSAP', href: '/wiki/emergency-services/psap-911', color: '#DC2626' },
                        { label: 'Fire Station', href: '/wiki/emergency-services/fire-station', color: '#F97316' },
                        { label: 'EMS Base', href: '/wiki/emergency-services/ems-base', color: '#10B981' },
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
