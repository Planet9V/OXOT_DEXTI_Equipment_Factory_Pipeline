/**
 * Clinical Diagnostic Laboratory — Deep-Dive Reference Architecture.
 *
 * High-throughput reference laboratory processing 50 K+ tests/day with
 * total laboratory automation (TLA) track systems, chemistry/hematology/
 * molecular analyzers, MALDI-TOF microbiology, and LIS/middleware
 * integration under CLIA, CAP, and ISO 15189.
 *
 * @module wiki/healthcare/clinical-lab/page
 */

export const metadata = {
    title: 'Clinical Diagnostic Lab Reference Architecture — Healthcare Wiki',
    description: 'High-throughput reference lab: 24-row BOM, TLA track, MALDI-TOF, NGS, LIS/middleware, CLIA/CAP accreditation.',
};

const C = '#3B82F6';

function S({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
    return (<section id={id} className="space-y-4 scroll-mt-8"><h2 className="text-xl font-heading font-semibold text-white">{title}</h2>{children}</section>);
}
function Pre({ children }: { children: string }) {
    return (<div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}><pre className="whitespace-pre leading-relaxed">{children}</pre></div>);
}
function T({ headers, rows }: { headers: string[]; rows: string[][] }) {
    return (<div className="overflow-x-auto"><table className="w-full text-xs border-collapse"><thead><tr className="border-b border-white/[0.08] text-gray-500">{headers.map(h => <th key={h} className="text-left px-3 py-2 font-medium">{h}</th>)}</tr></thead><tbody>{rows.map((r, i) => <tr key={i} className="border-b border-white/[0.04]">{r.map((c, j) => <td key={j} className={j === 0 ? 'px-3 py-2 font-medium whitespace-nowrap' : 'px-3 py-2 text-gray-400'} style={j === 0 ? { color: C } : undefined}>{c}</td>)}</tr>)}</tbody></table></div>);
}

const BOM: string[][] = [
    ['TLA Track System', 'Beckman Power Processor, 2 km conveyor', '1', '12 000 samples/h'],
    ['Chemistry Analyzer', 'Roche cobas c702, random access', '4', '2 000 tests/h/unit'],
    ['Hematology Analyzer', 'Sysmex XN-10, 5-part differential', '6', '100 samples/h/unit'],
    ['Coagulation Analyzer', 'Stago STA R Max, clot-based/chromogenic', '2', '180 tests/h'],
    ['Urinalysis Analyzer', 'Sysmex UF-5000, fluorescent flow', '2', '150 samples/h'],
    ['MALDI-TOF MS', 'Bruker Microflex LT, pathogen ID < 5 min', '2', '200 IDs/h'],
    ['Blood Culture System', 'BioMérieux BacT/ALERT, continuous monitor', '2', '400 bottles/unit'],
    ['Automated AST', 'VITEK 2, 96 cards/run, susceptibility', '2', '8–15 h MIC'],
    ['Incubator', 'BD BACTEC FX, CO₂/O₂/anaerobe', '4', '500 bottles/unit'],
    ['PCR Thermocycler', 'Roche LightCycler 480, real-time', '4', '384-well, 1.5 h run'],
    ['NGS Sequencer', 'Illumina NovaSeq 6000, whole-genome', '2', '20 B reads/run, 6 Tb'],
    ['Extraction Robot', 'QIAGEN QIAcube HT, nucleic acid prep', '2', '384 samples/run'],
    ['Specimen Sorter', 'Roche cobas 8100, vision-based ID', '2', '1 000 tubes/h'],
    ['Centrifuge', 'Thermo Sorvall Legend, swing-out rotor', '10', '4×400 mL, 5 000 RPM'],
    ['Robotic Pipettor', 'Tecan Freedom EVO, liquid handler', '2', '96/384-well format'],
    ['Pneumatic Tube System', 'Swisslog TransLogic, multi-zone', '1', '5 000 tubes/day'],
    ['Histology Processor', 'Leica Tissue-Tek VIP, tissue embedding', '2', '300 cassettes/run'],
    ['Cryostat', 'Leica CM1950, frozen sections', '2', '−20 °C chamber'],
    ['LIS Server', 'Epic Beaker / Cerner Millennium', '1 (HA)', '100 000+ tests/day'],
    ['Middleware Engine', 'Cerner Mako / FlexLab, rules engine', '1', 'Auto-verification'],
    ['ULT Freezer (−80 °C)', 'Thermo Fisher, sample archive', '5', '500 L/unit'],
    ['Barcode Printer', 'Zebra ZD621, thermal, LOINC-coded', '10', '6″/sec'],
    ['Workstations (LIS)', 'Dell Precision, dual-monitor, HL7', '50', 'Per tech bench'],
    ['Fume Hood', 'Labconco, 4–6 ft, anatomic path/micro', '6', 'OSHA formaldehyde PEL'],
];

const PURDUE: string[][] = [
    ['L4 Enterprise', 'ERP, population health analytics, FHIR-based reporting', 'HL7 FHIR R4, REST'],
    ['L3.5 DMZ', 'LIS gateway, HL7 interface engine, DICOM WSI router', 'TLS 1.3, HTTPS'],
    ['L3 Operations', 'LIS (Epic Beaker), middleware (rules/auto-verify), historian', 'HL7 v2, ASTM LIS01'],
    ['L2 Supervisory', 'TLA track PLC, auto-verifiers, middleware routing', 'Modbus/TCP, OPC UA'],
    ['L1 Control', 'Analyzer interfaces (ASTM E1394), IoT temp sensors', 'RS-232, MQTT'],
    ['L0 Process', 'Chemistry/hematology/molecular analyzers, centrifuges', 'Optical/electrochemical'],
];

export default function ClinicalLabPage() {
    return (
        <div className="max-w-5xl space-y-12">
            <header className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                    <div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]" style={{ background: C }} />
                    <span className="text-xs font-mono text-gray-500">HEAL · Laboratories · HLTH-LB-CLIN</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">Clinical Diagnostic Laboratory</h1>
                <p className="text-sm text-gray-400 max-w-3xl">High-throughput reference lab processing 50 000+ tests/day — total laboratory automation, chemistry/hematology/molecular platforms, MALDI-TOF microbiology, LIS/middleware integration.</p>
            </header>

            <S title="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-400 leading-relaxed">Stakeholders: <span style={{ color: C }} className="font-medium">reference lab companies</span> (Quest, LabCorp), <span style={{ color: C }} className="font-medium">hospital lab directors</span>, <span style={{ color: C }} className="font-medium">CMS</span> (CLIA enforcement), <span style={{ color: C }} className="font-medium">CAP</span> (accreditation), <span style={{ color: C }} className="font-medium">FDA</span> (IVD regulation). Business capabilities: clinical chemistry, hematology, microbiology, molecular diagnostics, anatomic pathology, blood bank, toxicology, STAT/routine testing.</p>
                <T headers={['Standard', 'Scope']} rows={[
                    ['CLIA \'88 (42 CFR 493)', 'Proficiency testing, quality control, personnel qualifications for moderate/high-complexity'],
                    ['CAP Accreditation', 'Checklist-based audits — exceeds CLIA minimum requirements'],
                    ['ISO 15189:2022', 'Quality and competence in medical laboratories — process validation'],
                    ['FDA 21 CFR 809', 'In vitro diagnostics — device labeling, performance, clearance/approval'],
                    ['HIPAA / HITECH', 'PHI protection for test results, electronic reporting'],
                    ['LOINC', 'Logical Observation Identifiers Names and Codes — standardized test coding'],
                ]} />
            </S>

            <S title="2. High-Level Design" id="design">
                <p className="text-sm text-gray-400 leading-relaxed">Modular facility layout optimized for specimen throughput: centralized receiving → processing → core lab (TLA track) → specialty suites (molecular, microbiology, anatomic path) → cold storage. Linear flow: receipt → sort → centrifuge/aliquot → analyze → verify → report.</p>
                <Pre>{`┌──────────────────────────────────────────────────────────────────────────┐
│                 HIGH-THROUGHPUT CLINICAL LAB                             │
│                                                                         │
│  ┌───────────┐   ┌──────────────┐   ┌────────────────────────────────┐ │
│  │ Specimen  │──▶│  Pre-Analyt. │──▶│       CORE LAB (TLA Track)    │ │
│  │ Receiving │   │  Sort/Centri │   │  ┌──────┐┌──────┐┌─────────┐ │ │
│  │ (Dock)    │   │  /Aliquot    │   │  │Chem  ││Hemat ││Coag/UA  │ │ │
│  └───────────┘   └──────────────┘   │  │c702  ││XN-10 ││STA/UF   │ │ │
│                                      │  └──┬───┘└──┬───┘└────┬────┘ │ │
│                                      │     └───────┴─────────┘      │ │
│                                      │          TLA TRACK (2 km)     │ │
│                                      └──────────────────────────────┘ │
│                                                                       │
│  ┌───────────┐  ┌──────────────┐  ┌──────────┐  ┌─────────────────┐ │
│  │ Molecular │  │ Microbiology │  │ Anatomic │  │  Blood Bank /   │ │
│  │ PCR / NGS │  │ MALDI-TOF   │  │ Pathology│  │  Reference Test │ │
│  │ (ISO 7 CR)│  │ Culture/AST  │  │ Gross/Hx │  │  (Esoteric)     │ │
│  └───────────┘  └──────────────┘  └──────────┘  └─────────────────┘ │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────────┐ │
│  │  COLD STORAGE:  2–8 °C  │  −20 °C  │  −80 °C  │  LN₂ (cell)  │ │
│  └──────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────────┘`}</Pre>
            </S>

            <S title="3. Detailed Technical Description" id="technical">
                <h3 className="text-sm font-semibold text-white">3.1 Pre-Analytical</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Handles 70% of lab errors — automation reduces rejection to {'<'} 1%. High-speed sorters (Roche cobas 8100, 1 000 tubes/h). Swing-out centrifuges (3–5 000 RPM, 5 min). Robotic aliquoting (Tecan Freedom EVO). Vision-based tube ID with RFID/barcode tracking. Pneumatic tube integration (4–6″/sec).</p>

                <h3 className="text-sm font-semibold text-white mt-6">3.2 Core Lab Automation (TLA)</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Total Laboratory Automation integrates pre-analytical, analytical, post-analytical via conveyor tracks. Beckman Power Processor (2 km track, 12 000 samples/h). Chemistry (Roche cobas c702, 2 000 tests/h). Hematology (Sysmex XN-10, 100/h). Middleware rules engine for routing and delta checks.</p>

                <h3 className="text-sm font-semibold text-white mt-6">3.3 Molecular Diagnostics</h3>
                <p className="text-sm text-gray-400 leading-relaxed">ISO 7 cleanroom for extraction/amplification. PCR (Roche LightCycler 480, 384-well, 1.5 h). NGS (Illumina NovaSeq, 20B reads/run). Extraction robots (QIAGEN QIAcube HT, 384 samples/run). UV decontamination between runs. 10 000+ PCR tests/day capacity.</p>

                <h3 className="text-sm font-semibold text-white mt-6">3.4 Microbiology</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Culture-to-ID in {'<'} 24 h. BD BACTEC FX (continuous blood culture monitoring). MALDI-TOF MS (Bruker Microflex, 5-min pathogen ID). VITEK 2 (automated AST, 96 cards/run). Smart incubation with image capture for colony morphology AI.</p>

                <h3 className="text-sm font-semibold text-white mt-6">3.5 LIS / Middleware</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Epic Beaker or Cerner Millennium with rules-based middleware. HL7 v2 / FHIR interfaces (ADT/ORU/ORM). Auto-verification (if glucose 70–140 mg/dL → auto-release). Delta checks (serial Na ± 5 mmol/L flags). Critical value notification ({'<'} 2 min via pager/SMS).</p>
            </S>

            <S title="4. Process Diagrams" id="process">
                <h3 className="text-sm font-semibold text-white">4.1 Specimen Flow</h3>
                <Pre>{`Courier/Pneumatic Tube ──▶ Barcode Scan ──▶ Sort by Tube/Priority
        │
        ▼
  Centrifuge (5 min) ──▶ Aliquot ──▶ TLA Track Load
        │
        ▼
  Route to Analyzer ──▶ Result to LIS ──▶ Auto-Verify (Rules)
        │                                       │
        ▼                                       ▼
  Abnormal? ──▶ Pathologist Review ──▶ HL7 Report to EMR`}</Pre>

                <h3 className="text-sm font-semibold text-white mt-6">4.2 LIS/Middleware Data Flow</h3>
                <Pre>{`Analyzer ──▶ ASTM E1394/LIS01-A2 ──▶ Middleware (Rules Engine)
                                           │
                    ┌──────────────────────┼──────────────────────┐
                    ▼                      ▼                      ▼
              Auto-Verify            Delta Check             Critical Value
              (Within range)      (Flag if Δ > limit)     (Page/SMS < 2 min)
                    │                      │                      │
                    └──────────┬───────────┘──────────────────────┘
                               ▼
                          LIS (Epic Beaker) ──▶ HL7 FHIR ──▶ EMR/HIS`}</Pre>

                <h3 className="text-sm font-semibold text-white mt-6">4.3 Molecular (PCR/NGS) Workflow</h3>
                <Pre>{`Sample Receipt ──▶ Extraction (QIAcube HT) ──▶ PCR Setup (ISO 7 CR)
                                                       │
                                                       ▼
                                              Amplification (LC480)
                                                       │
                   ┌───────────────────────────────────┘
                   ▼                                   ▼
            Routine PCR Result             NGS Library Prep ──▶ NovaSeq
            (LIS auto-verify)               │
                                            ▼
                                    Bioinformatics Pipeline
                                    (Variant calling, QC)
                                            │
                                            ▼
                                    Pathologist Interpret ──▶ Report`}</Pre>
            </S>

            <S title="5. Bill of Materials — 50 K Tests/Day Lab" id="bom">
                <T headers={['Equipment', 'Specification', 'Qty', 'Capacity']} rows={BOM} />
                <p className="text-xs text-gray-500 italic">Estimated CAPEX: $50–100 M (equipment, TLA track, IT infrastructure).</p>
            </S>

            <S title="6. Purdue Model Mapping" id="purdue">
                <T headers={['Level', 'Components', 'Protocols']} rows={PURDUE} />
                <p className="text-xs text-gray-500 italic">LIS bridges L3–L4; middleware handles analyzer protocol translation.</p>
            </S>

            <S title="7. Safety Systems" id="safety">
                <T headers={['Hazard', 'Control', 'Standard']} rows={[
                    ['Chemical Hygiene', 'Fume hoods, SDS, spill kits, annual training', 'OSHA 29 CFR 1910.1450'],
                    ['BSL-2 Biohazard', 'Biosafety cabinets, PPE, bloodborne pathogen protocol', 'OSHA BBP 1910.1030'],
                    ['Formaldehyde (Anat. Path)', 'Real-time sensors, LEV, OSHA PEL 0.75 ppm TWA', 'OSHA 1910.1048'],
                    ['TB Exposure', 'N95 respirators, annual PPD/IGRA testing', 'CDC TB guidelines'],
                    ['Sharps/Needlestick', 'Safety-engineered devices, sharps containers', 'OSHA Needlestick Act'],
                ]} />
            </S>

            <S title="8. Communication Protocol Stack" id="protocols">
                <T headers={['Layer', 'Protocol', 'Use Case']} rows={[
                    ['Application', 'HL7 v2 (ADT/ORU/ORM), FHIR R4', 'EMR ↔ LIS result reporting'],
                    ['Application', 'POCT1-A', 'Point-of-care testing devices'],
                    ['Presentation', 'ASTM E1394 / LIS01-A2', 'Unidirectional analyzer → LIS'],
                    ['Session', 'DICOM (WSI)', 'Digital pathology whole-slide imaging'],
                    ['Transport', 'MQTT / CoAP', 'IoT temperature sensors, cold chain'],
                    ['Network', 'TCP/IP, VPN', 'Secure EMR links, cloud analytics'],
                ]} />
            </S>

            <S title="9. Quality Management" id="quality">
                <Pre>{`┌─ CLIA Quality System ─────────────────────────────────────────────────┐
│                                                                       │
│  Proficiency Testing ──▶ QC (Westgard Rules) ──▶ CAP Inspection      │
│  (3× per year)           (L-J charts, 2 levels)   (Biennial)         │
│                                                                       │
│  Competency Assessment ──▶ SOP Review ──▶ Internal Audit             │
│  (Annual, 6 elements)      (Annual)       (Quarterly)                 │
│                                                                       │
│  Method Validation ──▶ Precision/Accuracy/Linearity/Reference Range  │
│  (New analyzer or LDT)   (CLSI EP5/EP6/EP9/C28)                     │
│                                                                       │
│  Patient Correlation ──▶ Delta Check Rules ──▶ Critical Value Policy │
│  (Auto-verify thresholds)  (|ΔHgb| > 2 g/dL)   (< 2 min notify)     │
└───────────────────────────────────────────────────────────────────────┘`}</Pre>
            </S>

            <S title="10. References" id="references">
                <ol className="list-decimal list-inside space-y-1 text-xs text-gray-400">
                    <li>CMS. (2022). 42 CFR Part 493: Laboratory Requirements (CLIA).</li>
                    <li>CAP. (2024). <em>Laboratory Accreditation Checklists</em>.</li>
                    <li>ISO. (2022). <em>ISO 15189: Medical Laboratories — Requirements for Quality and Competence</em>.</li>
                    <li>FDA. (2023). 21 CFR Part 809: In Vitro Diagnostic Products.</li>
                    <li>CLSI. (2023). <em>GP41-Ed2: Clinical Laboratory Automation</em>.</li>
                    <li>CLSI. (2018). <em>EP5-A3: Evaluation of Precision of Quantitative Measurement Procedures</em>.</li>
                    <li>Te Whatu Ora. (2011). <em>Interoperability Reference Architecture</em>, v1.0.</li>
                    <li>Westgard, J. O. (2016). <em>Basic QC Practices</em>, 4th ed. Westgard QC.</li>
                </ol>
            </S>

            <section className="space-y-3">
                <h2 className="text-sm font-semibold text-gray-500">See Also</h2>
                <div className="flex flex-wrap gap-2">
                    {[
                        { label: 'Healthcare Hub', href: '/wiki/healthcare', color: '#EC4899' },
                        { label: 'BSL-3 Laboratory', href: '/wiki/healthcare/bsl3-laboratory', color: '#10B981' },
                        { label: 'Acute Care Hospital', href: '/wiki/healthcare/acute-care-hospital', color: '#EC4899' },
                        { label: 'Blood Processing', href: '/wiki/healthcare/blood-processing', color: '#EF4444' },
                    ].map(l => (
                        <a key={l.href} href={l.href} className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-white/[0.04]" style={{ borderColor: `${l.color}30`, color: l.color }}>{l.label}</a>
                    ))}
                </div>
            </section>
        </div>
    );
}
