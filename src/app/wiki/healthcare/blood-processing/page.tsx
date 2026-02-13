/**
 * Blood Processing Center — Deep-Dive Reference Architecture.
 *
 * Regional blood processing center handling 200 K units/year through whole
 * blood and apheresis collection, component separation, NAT/serology testing,
 * cold chain storage, and ISBT 128 distribution.
 *
 * @module wiki/healthcare/blood-processing/page
 */

export const metadata = {
    title: 'Blood Processing Center Reference Architecture — Healthcare Wiki',
    description: 'Regional blood center: 20-row BOM, apheresis, NAT/serology, cold chain, ISBT 128, AABB accreditation.',
};

const C = '#EF4444';

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
    ['High-Speed Centrifuge', 'Haemonetics ACS+, 5 000 g, 4–6 bag capacity', '8', 'GMP-compliant'],
    ['Apheresis Device', 'Terumo BCT Trima Accel, dual-stage', '6', 'Platelets/plasma/RBC'],
    ['NAT/Serology Analyzer', 'Ortho Vision, 200 tests/h, HL7', '4', 'HIV/HBV/HCV/syphilis'],
    ['Immunohematology Analyzer', 'Bio-Rad IH-1000, automated typing', '3', '100 tests/h, ABO/Rh'],
    ['RBC Refrigerator', 'Helmer Ultra CW, 1–6 °C, ±0.5 °C alarm', '12', '500 L ea.'],
    ['Platelet Agitator/Incubator', 'Helmer Ultra PLT, 20–24 °C, gyratory', '10', '48-plate capacity'],
    ['Plasma Freezer (−80 °C)', 'Beckman Coulter PK7300, chart recorder', '4', '730 L ea.'],
    ['Ultra-Low Freezer (−150 °C)', 'Revco ULT, LN₂ compatible', '2', 'Cryopreservation'],
    ['Leukoreduction Filter', 'Pall Leukotrap, inline, < 5×10⁶ WBC', '50 000/yr', 'Per unit'],
    ['Pathogen Reduction Kit', 'Cerus INTERCEPT, psoralen/UVA', '40 000/yr', 'PLT/plasma'],
    ['Tube Sealer', 'Sebra, dielectric sealing, ISBT validated', '6', 'Per collection'],
    ['Balance/Scale', 'Mettler Toledo, 0.1 g precision', '8', '10 kg capacity'],
    ['Label Printer', 'Zebra ZT410, thermal, ISBT 128', '4', '4″/sec'],
    ['Barcode Scanner', 'Zebra DS2208, 2D ISBT 128, wireless', '20', 'Per workstation'],
    ['Laminar Flow Hood', 'Class II BSC, HEPA, 0.3 µm', '10', 'Component prep'],
    ['Waste Autoclave', 'Biomedical validation, 500 L/h', '2', 'Biohazard waste'],
    ['IT Server', 'Dell PowerEdge, BBIS/LIMS, redundant RAID', '4', 'HA cluster'],
    ['UPS System', 'APC 10 kVA, 30-min runtime, N+1', '6', 'Cold chain critical'],
    ['Data Logger', 'TempTale, ±0.5 °C, Bluetooth, 30-day', '200', 'Transport monitoring'],
    ['Thermo Fisher Freezer', '−80 °C backup for plasma/cryo', '6', '500 L ea.'],
];

const PURDUE: string[][] = [
    ['L4 Enterprise', 'ERP (demand forecasting), FDA reporting, hospital orders', 'REST, HL7, TCP/IP'],
    ['L3.5 DMZ', 'BBIS gateway, HL7 interface engine, protocol firewall', 'TLS 1.3, HTTPS'],
    ['L3 Operations', 'BBIS (inventory/release), LIMS (testing), ISBT 128 generation', 'HL7 v2, ASTM E1394'],
    ['L2 Control', 'PLCs for freezers/agitators, real-time cold chain monitoring', 'Modbus/TCP, BACnet'],
    ['L1 Sensing', 'Temperature sensors, centrifuge controls, UV lamps', 'Modbus RTU, 4–20 mA'],
    ['L0 Process', 'Centrifugation, leukoreduction, pathogen inactivation', 'Physical process'],
];

export default function BloodProcessingPage() {
    return (
        <div className="max-w-5xl space-y-12">
            <header className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                    <div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]" style={{ background: C }} />
                    <span className="text-xs font-mono text-gray-500">HEAL · Blood Supply · HLTH-BS-BPC</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">Blood Processing Center</h1>
                <p className="text-sm text-gray-400 max-w-3xl">Regional center processing 200 K units/year — whole blood/apheresis collection, component separation, NAT/serology testing, cold chain storage, ISBT 128 distribution.</p>
            </header>

            <S title="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-400 leading-relaxed">Key stakeholders: <span style={{ color: C }} className="font-medium">blood collection organizations</span> (American Red Cross, regional centers), <span style={{ color: C }} className="font-medium">hospital transfusion services</span> (consumers), <span style={{ color: C }} className="font-medium">FDA/CBER</span> (21 CFR 606/607/610), and <span style={{ color: C }} className="font-medium">AABB</span> (accreditation). Business capabilities: collection (whole blood/apheresis), testing (NAT/serology/typing), separation (centrifugation/leukoreduction), storage (cold chain), distribution (ISBT 128 logistics).</p>
                <T headers={['Standard', 'Scope']} rows={[
                    ['21 CFR 606/607/610', 'cGMP for blood establishments — registration, CGMP, testing requirements'],
                    ['AABB Standards (32nd ed.)', 'Accreditation checklists — donor screening, testing, labeling, QC'],
                    ['EU Blood Safety Directive 2002/98/EC', 'European harmonized standards for blood safety'],
                    ['ISBT 128', 'International barcode standard — donation ID, product code, expiry'],
                    ['FDA cGMP for Blood', 'Process traceability, deviation reporting (21 CFR 606.171)'],
                ]} />
            </S>

            <S title="2. High-Level Design" id="design">
                <p className="text-sm text-gray-400 leading-relaxed">Zoned layout: donor reception → collection floor → processing/separation lab → testing lab → storage (segmented cold chain) → distribution/shipping. Cold chain: RBCs at 1–6 °C (42 days), platelets at 20–24 °C with agitation (5 days), FFP at ≤−18 °C (1 year), cryo at ≤−18 °C (1 year).</p>
                <Pre>{`┌──────────────────────────────────────────────────────────────────────┐
│                    BLOOD PROCESSING CENTER                          │
│                                                                     │
│  ┌──────────┐   ┌───────────┐   ┌────────────┐   ┌──────────────┐ │
│  │  Donor   │──▶│Collection │──▶│ Processing │──▶│   Testing    │ │
│  │Reception │   │  Floor    │   │ /Separation│   │  NAT/Sero    │ │
│  │(Screen)  │   │(Phlebotomy│   │(Centrifuge)│   │  ABO/Rh      │ │
│  └──────────┘   └───────────┘   └─────┬──────┘   └──────┬───────┘ │
│                                       │                  │         │
│                                       ▼                  ▼         │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │                 COLD CHAIN STORAGE                              │ │
│  │  ┌────────┐  ┌─────────┐  ┌──────────┐  ┌───────────────┐    │ │
│  │  │ RBC    │  │Platelet │  │  FFP     │  │ Cryoprecip.   │    │ │
│  │  │1–6 °C  │  │20–24 °C │  │≤-18 °C  │  │ ≤-18 °C       │    │ │
│  │  │42 days │  │ 5 days  │  │ 1 year  │  │ 1 year        │    │ │
│  │  └────────┘  └─────────┘  └──────────┘  └───────────────┘    │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                │                                    │
│                                ▼                                    │
│  ┌───────────────────────────────────────────────────┐             │
│  │  DISTRIBUTION  ──▶  Hospital Blood Banks          │             │
│  │  ISBT 128 labels  │  Insulated shippers + loggers │             │
│  └───────────────────────────────────────────────────┘             │
└──────────────────────────────────────────────────────────────────────┘`}</Pre>
            </S>

            <S title="3. Detailed Technical Description" id="technical">
                <h3 className="text-sm font-semibold text-white">3.1 Collection</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Whole blood via single-arm venipuncture (450–500 mL + CPD-A1 anticoagulant). Apheresis via automated separators (Trima Accel, dual-stage, 2.0–2.5 L/h). Mobile drives use validated collection kits for remote scalability. Regional capacity: ~200 K units/year.</p>

                <h3 className="text-sm font-semibold text-white mt-6">3.2 Component Separation</h3>
                <p className="text-sm text-gray-400 leading-relaxed">High-speed centrifugation (5 000 g, 5–7 min) separates RBCs, platelets, and plasma. Leukoreduction via inline Pall filters ({'<'} 5×10⁶ WBCs/unit). Pathogen reduction (INTERCEPT: psoralen/UVA inactivation for platelets and plasma).</p>

                <h3 className="text-sm font-semibold text-white mt-6">3.3 Testing</h3>
                <p className="text-sm text-gray-400 leading-relaxed">NAT (nucleic acid testing) for HIV-1/2, HBV, HCV — 95–99% sensitivity, TAT {'<'} 24 h. Serology via EIA/chemiluminescence for syphilis, HTLV-I/II. ABO/Rh typing and crossmatch via automated immunohematology analyzers (Ortho Vision, Bio-Rad IH-1000).</p>

                <h3 className="text-sm font-semibold text-white mt-6">3.4 Storage & Distribution</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Segmented cold chain: RBCs (1–6 °C, 42-day shelf life), platelets (20–24 °C with gyratory agitation, 5-day), FFP (≤−18 °C, 1 year), cryoprecipitate (≤−18 °C, 1 year). Distribution uses insulated shippers with gel packs and TempTale data loggers. ISBT 128 barcoding for donation ID, product code, and expiry tracking.</p>
            </S>

            <S title="4. Process Diagrams" id="process">
                <h3 className="text-sm font-semibold text-white">4.1 Donation-to-Transfusion Flow</h3>
                <Pre>{`Donor Screen ──▶ Phlebotomy ──▶ Centrifuge ──▶ Component Separation
                     │                                     │
                     ▼                                     ▼
              NAT / Serology ◀──────────────────── Leukoreduction
                     │                                     │
                     ▼                                     ▼
              ABO/Rh Typing ──▶ BBIS Release ──▶ Cold Chain Storage
                                                          │
                                                          ▼
                                      Hospital Order ──▶ Crossmatch ──▶ Transfuse`}</Pre>

                <h3 className="text-sm font-semibold text-white mt-6">4.2 Cold Chain Monitoring</h3>
                <Pre>{`Refrigerator/Freezer ──▶ IoT Temp Sensor ──▶ BBIS Dashboard
         │                                           │
    ±2 °C Deviation ──▶ Auto-Alarm ──▶ Quarantine ──▶ Deviation Report
                                                      (21 CFR 606.171)`}</Pre>
            </S>

            <S title="5. Bill of Materials — 200 K Units/Year" id="bom">
                <T headers={['Equipment', 'Specification', 'Qty', 'Rating']} rows={BOM} />
            </S>

            <S title="6. Purdue Model Mapping" id="purdue">
                <T headers={['Level', 'Components', 'Protocols']} rows={PURDUE} />
            </S>

            <S title="7. Safety Systems" id="safety">
                <T headers={['Hazard', 'Control', 'Standard']} rows={[
                    ['Pathogen Exposure', 'BSL-2 practices, PPE, NAT screening (99% reduction)', 'OSHA BBP 29 CFR 1910.1030'],
                    ['Chemical (Anticoagulants)', 'SDS, spill kits, ventilated hoods', 'OSHA HazCom'],
                    ['Cold Chain Failure', '±2 °C alarm, quarantine/discard, 24/7 remote monitoring', '21 CFR 606.171'],
                    ['FDA Recall', 'Lookback for confirmed positives, phased recall via BBIS', 'FDA Recall Procedures'],
                    ['Needlestick', 'Safety-engineered devices, sharps containers, exposure protocol', 'OSHA Needlestick Safety Act'],
                ]} />
            </S>

            <S title="8. Communication Protocols" id="protocols">
                <T headers={['Protocol', 'Use Case', 'Layer']} rows={[
                    ['ISBT 128', '2D barcodes — donation number, blood group, expiry', 'Application'],
                    ['HL7 v2.x', 'ADT/ORU messages between BBIS/LIMS and hospital LIS', 'Application'],
                    ['ASTM E1394', 'Unidirectional instrument data (analyzers → LIMS)', 'Presentation'],
                    ['MQTT / CoAP', 'IoT cold chain sensors, real-time telemetry', 'Transport'],
                    ['TCP/IP', 'Network backbone, VPN for secure links', 'Network'],
                ]} />
            </S>

            <S title="9. Quality Management" id="quality">
                <Pre>{`┌─ Continuous Quality Improvement ──────────────────────────────────────┐
│                                                                       │
│  Proficiency Testing ──▶ Internal Audit ──▶ AABB Inspection          │
│       (CAP/AABB)           (Monthly)          (Biennial)              │
│                                                                       │
│  Deviation Reporting ──▶ CAPA ──▶ Management Review ──▶ FDA Report  │
│  (21 CFR 606.171)        (Root cause)   (Quarterly)     (BLA annual)  │
│                                                                       │
│  Supplier Qualification ──▶ Reagent Lot Validation ──▶ Release       │
│  (AABB Standards)           (Parallel testing)          (QC approved) │
└───────────────────────────────────────────────────────────────────────┘`}</Pre>
            </S>

            <S title="10. References" id="references">
                <ol className="list-decimal list-inside space-y-1 text-xs text-gray-400">
                    <li>FDA. (2024). 21 CFR Parts 606, 607, 610: cGMP for Blood.</li>
                    <li>AABB. (2025). <em>Standards for Blood Banks and Transfusion Services</em>, 32nd ed.</li>
                    <li>WHO. (2020). <em>Guidance on Centralization of Blood Donation Testing and Processing</em>.</li>
                    <li>ICCBBA. (2023). <em>ISBT 128 Standard</em>.</li>
                    <li>Alghamdi, A. et al. (2024). A generic blood banking and transfusion process-oriented architecture. <em>PMC</em>, 11152302.</li>
                    <li>ASH. (2023). Blood banking and transfusion process architecture. <em>PLOS ONE</em>, 18(12), e0303970.</li>
                </ol>
            </S>

            <section className="space-y-3">
                <h2 className="text-sm font-semibold text-gray-500">See Also</h2>
                <div className="flex flex-wrap gap-2">
                    {[
                        { label: 'Healthcare Hub', href: '/wiki/healthcare', color: '#EC4899' },
                        { label: 'Acute Care Hospital', href: '/wiki/healthcare/acute-care-hospital', color: '#EC4899' },
                        { label: 'Biopharma Mfg', href: '/wiki/healthcare/biopharma-manufacturing', color: '#A855F7' },
                        { label: 'Chemical Sector', href: '/wiki/chemical', color: '#EF4444' },
                    ].map(l => (
                        <a key={l.href} href={l.href} className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-white/[0.04]" style={{ borderColor: `${l.color}30`, color: l.color }}>{l.label}</a>
                    ))}
                </div>
            </section>
        </div>
    );
}
