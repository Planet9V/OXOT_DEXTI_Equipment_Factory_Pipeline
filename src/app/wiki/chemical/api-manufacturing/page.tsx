/**
 * API Manufacturing Plants — Deep Dive Wiki Article.
 *
 * Comprehensive TOGAF-based reference architecture for cGMP Active
 * Pharmaceutical Ingredient (API) manufacturing facilities featuring
 * multi-step organic synthesis, cleanroom environments, Hastelloy/
 * glass-lined reactors, and full 21 CFR Part 11 data integrity.
 *
 * @module wiki/chemical/api-manufacturing/page
 */

export const metadata = {
    title: 'API Manufacturing Plants — Chemical Sector Wiki',
    description:
        'TOGAF reference architecture for API Manufacturing: cGMP synthesis suites, Hastelloy reactors, ' +
        'cleanroom HVAC, 21 CFR Part 11 data integrity, bill of materials, and Purdue model mapping.',
};

export default function APIManufacturingPage() {
    return (
        <div className="max-w-5xl space-y-10">
            {/* Header */}
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div
                        className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]"
                        style={{ background: '#EC4899' }}
                    />
                    <span className="text-xs font-mono text-gray-500">
                        CHEMICAL &middot; PHARMACEUTICALS &middot; API MANUFACTURING
                    </span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">
                    API Manufacturing Plants
                </h1>
                <p className="text-sm text-gray-500 font-mono">cGMP Pharmaceutical Synthesis</p>
                <p className="text-gray-400 text-base leading-relaxed max-w-3xl">
                    Active Pharmaceutical Ingredient (API) manufacturing plants perform multi-step
                    organic synthesis under current Good Manufacturing Practice (cGMP) conditions,
                    operating within classified cleanroom environments (ISO 14644) to produce drug
                    substances of defined purity and particle size. These facilities integrate
                    Hastelloy and glass-lined reactor technology, high-containment isolators for
                    potent compounds, and fully validated clean utility systems (WFI, clean steam,
                    HEPA-filtered HVAC). Every electronic record and signature must comply with
                    FDA 21 CFR Part 11 and EU Annex 11 data integrity requirements, enforcing
                    ALCOA+ principles across batch records, LIMS, and MES (FDA, 2003; EMA, 2023).
                </p>
            </div>

            {/* 1. TOGAF Business Architecture */}
            <Section title="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-300 leading-relaxed">
                    The API manufacturing business architecture spans the pharmaceutical value chain
                    from raw material qualification through regulatory release. Revenue models include
                    proprietary manufacture, contract development and manufacturing (CDMO), and
                    technology transfer licensing. The regulatory burden is among the highest in any
                    industrial sector, with pre-approval inspections (PAI), annual product reviews
                    (APR), and continuous process verification mandated across the product lifecycle.
                </p>

                <h3 className="text-sm font-semibold text-white mt-6 mb-2">Stakeholders</h3>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside">
                    <li>Pharmaceutical Companies (Innovator and Generic)</li>
                    <li>CDMOs / CMOs (Contract Development and Manufacturing Organizations)</li>
                    <li>FDA / EMA / PMDA Inspectors and Assessors</li>
                    <li>Qualified Persons (QP) and QA/QC Directors</li>
                    <li>Process Chemists and Chemical Engineers</li>
                    <li>Validation Engineers (IQ/OQ/PQ, CSV)</li>
                    <li>Raw Material and Intermediate Suppliers (DMF holders)</li>
                    <li>Drug Product Formulators (Downstream Customers)</li>
                </ul>

                <h3 className="text-sm font-semibold text-white mt-6 mb-2">Regulatory Framework</h3>
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
                                ['FDA 21 CFR 210/211', 'cGMP for Finished Pharmaceuticals and API production controls'],
                                ['FDA 21 CFR Part 11', 'Electronic Records, Electronic Signatures — data integrity'],
                                ['EU GMP Annex 1 (2023)', 'Manufacture of Sterile Medicinal Products — contamination control strategy'],
                                ['ICH Q7', 'Good Manufacturing Practice Guide for Active Pharmaceutical Ingredients'],
                                ['ICH Q8 / Q9 / Q10', 'Pharmaceutical Development, Quality Risk Management, Pharmaceutical Quality System'],
                                ['ISPE GAMP 5 (2nd Ed.)', 'Risk-Based Approach to Compliant GxP Computerized Systems'],
                                ['ISO 14644-1/2/3', 'Cleanrooms and associated controlled environments — classification and monitoring'],
                                ['IEC 61511', 'Functional Safety — Safety Instrumented Systems for the process industry'],
                            ].map(([standard, scope]) => (
                                <tr key={standard} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#EC4899] font-medium whitespace-nowrap">{standard}</td>
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
                    The canonical API plant design segregates <span className="text-[#EC4899] font-medium">synthesis suites</span> from
                    isolation, purification, and finishing areas using pressure cascades and airlocks.
                    Potent compound handling (OEB 1-5) dictates containment strategy: dedicated suites
                    for OEB 4-5 compounds (OEL &lt; 1 &mu;g/m&sup3;), multi-purpose suites with
                    closed-system transfers for OEB 1-3. Pressure cascades maintain +15 Pa differentials
                    per room, with corridors at higher pressure than production rooms to prevent
                    cross-contamination.
                </p>

                <h3 className="text-sm font-semibold text-white mt-6 mb-2">Process Flow</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`RAW MATERIALS (Warehouse, 15-25C, controlled humidity)
    |
    v
WEIGHING / DISPENSING (ISO 7 Cleanroom, LAF booth, barcode verification)
    |
    v
MULTI-STEP SYNTHESIS (Hastelloy C-276 / Glass-lined reactors, 500-6000L)
    |  Steps 1-N: reactions, washes, phase separations
    |  In-process controls: PAT (FTIR, Raman), pH, temperature
    v
ISOLATION (Peeler centrifuge / Nutsche filter-dryer)
    |
    v
PURIFICATION (Chromatography / Seeded crystallization / Re-slurry)
    |
    v
DRYING (Conical vacuum dryer / Agitated filter-dryer, <0.5% LOD)
    |
    v
MILLING (Jet mill, D90 < 50um, containment isolator for potent APIs)
    |
    v
PACKAGING (Double PE-lined drums, inerted with N2, tamper-evident)
    |
    v
QC RELEASE (HPLC, GC, KF, XRD, DSC, residual solvents ICH Q3C)`}</pre>
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">
                    Figure 1. End-to-end API manufacturing process from raw material receipt through
                    QC release, showing cleanroom classifications and key equipment at each stage.
                </p>
            </Section>

            {/* 3. Detailed Technical Description */}
            <Section title="3. Detailed Technical Description" id="technical">
                <h3 className="text-base font-semibold text-white mt-2 mb-2">3.1 Synthesis Suite</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    The synthesis suite houses reactors ranging from 500 L (kilo-lab scale-up) to
                    6,000 L (commercial production) in{' '}
                    <span className="text-[#EC4899] font-medium">Hastelloy C-276</span> for
                    corrosive chemistries or glass-lined steel (De Dietrich/Pfaudler) for standard
                    organic synthesis. Low-temperature reactions reach &minus;78 &deg;C using
                    LN&#8322;/MeOH cryostats, while high-pressure hydrogenations employ Parr-type
                    reactors rated to 50&ndash;100 bar H&#8322;. All vessels operate under N&#8322;
                    blanketing to exclude moisture and oxygen. Process Analytical Technology (PAT)
                    probes (in-situ FTIR, Raman) provide real-time reaction monitoring per ICH Q8.
                </p>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside mt-2">
                    <li><span className="text-white">Reactor Types:</span> Hastelloy C-276, glass-lined (AE/BE rated), jacketed for &minus;78 to +200 &deg;C</li>
                    <li><span className="text-white">Agitation:</span> Retreat-curve impellers, anchor agitators, mag-drive couplings (zero-leak)</li>
                    <li><span className="text-white">Condensers:</span> Shell-and-tube with chilled glycol, solvent recovery &gt;98%</li>
                    <li><span className="text-white">PAT Integration:</span> FTIR (ReactIR), Raman, FBRM (particle size), pH/temperature inline</li>
                </ul>

                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.2 Isolation &amp; Purification</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    Product isolation uses peeler centrifuges (Heinkel, Rousselet) for high-throughput
                    cake filtration or Nutsche filter-dryers for combined filter/wash/dry operations.
                    Purification leverages preparative HPLC or simulated moving bed (SMB) chromatography
                    for chiral resolution, and seeded cooling crystallization for polymorph control.
                    Sterile filtration through 0.2 &mu;m membranes is applied when downstream
                    processing requires bioburden reduction.
                </p>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside mt-2">
                    <li><span className="text-white">Centrifuges:</span> Inverting-basket peeler, 600&ndash;1200 mm diameter, GMP wash cycles</li>
                    <li><span className="text-white">Filter-Dryers:</span> Nutsche (Rosenmund/Andritz), 1&ndash;6 m&sup2; filter area, automated heel removal</li>
                    <li><span className="text-white">Chromatography:</span> Prep HPLC (DAC columns to 800 mm), SMB for continuous chiral separation</li>
                    <li><span className="text-white">Crystallization:</span> Seeded cooling (controlled supersaturation), anti-solvent addition, MSMPR</li>
                </ul>

                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.3 Drying &amp; Milling</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    Final drying reduces loss on drying (LOD) to &lt;0.5% using conical vacuum dryers
                    (Nauta type) or agitated filter-dryers under vacuum at 40&ndash;60 &deg;C. Fluid bed
                    dryers are used for heat-stable intermediates. Jet milling (spiral or fluidized-bed
                    opposed jet) achieves target particle size distributions (D90 &lt; 50 &mu;m) for
                    drug product formulation. Potent compounds (OEL &lt; 1 &mu;g/m&sup3;) require
                    full containment isolators validated by SMEPAC testing.
                </p>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside mt-2">
                    <li><span className="text-white">Vacuum Dryers:</span> Conical (Nauta), 500&ndash;3000 L, jacket + internal heating, vacuum to 10 mbar</li>
                    <li><span className="text-white">Fluid Bed:</span> GMP fluidized bed (Glatt, GEA), Wurster insert for coating applications</li>
                    <li><span className="text-white">Jet Mills:</span> Spiral jet (Hosokawa), opposed-jet (Netzsch), inerted with N&#8322;</li>
                    <li><span className="text-white">Containment:</span> Isolators (OEL &lt; 0.1 &mu;g/m&sup3;), split-butterfly valves, continuous liners</li>
                </ul>

                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.4 Clean Utilities</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    Pharmaceutical-grade utilities are generated, stored, and distributed per
                    pharmacopoeial requirements. WFI is produced by multi-effect distillation (MED)
                    or vapor compression distillation and maintained hot (&gt;80 &deg;C) in a
                    continuously recirculating loop. Clean steam compliant with EN 285 serves
                    autoclaves and SIP operations. HVAC systems use HEPA H14 terminal filtration
                    and maintain pressure cascades of +15 Pa per room classification step.
                </p>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside mt-2">
                    <li><span className="text-white">WFI System:</span> MED still (MECO/BWT), hot loop &gt;80 &deg;C, conductivity &lt;1.3 &mu;S/cm, TOC &lt;500 ppb</li>
                    <li><span className="text-white">Clean Steam:</span> Unfired pure steam generator, EN 285 condensate quality, dryness &gt;0.95</li>
                    <li><span className="text-white">HVAC:</span> AHUs with HEPA H14 (99.995% at MPPS), room pressure cascade +15 Pa/step, 20 ACH minimum</li>
                    <li><span className="text-white">EM Program:</span> Viable (settle plates, active air) and non-viable (particle counters 0.5/5.0 &mu;m) monitoring</li>
                </ul>

                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.5 Quality Control Laboratory</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    The QC laboratory provides release testing, stability studies, and in-process
                    control support. All analytical instruments are qualified (IQ/OQ/PQ) and
                    connected to a validated LIMS with 21 CFR Part 11 compliant audit trails.
                    Stability chambers operate per ICH conditions for long-term (25 &deg;C/60% RH),
                    intermediate (30 &deg;C/65% RH), and accelerated (40 &deg;C/75% RH) studies.
                </p>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside mt-2">
                    <li><span className="text-white">HPLC/UHPLC:</span> Gradient systems with DAD/MS detection, USP method validation</li>
                    <li><span className="text-white">GC:</span> Headspace GC for residual solvents (ICH Q3C), FID/MS detection</li>
                    <li><span className="text-white">Karl Fischer:</span> Coulometric/volumetric moisture determination</li>
                    <li><span className="text-white">Stability:</span> Walk-in chambers (ICH Q1A), photostability (ICH Q1B), temperature mapping</li>
                </ul>
            </Section>

            {/* 4. Process Diagrams */}
            <Section title="4. Process Diagrams" id="process-diagrams">
                <h3 className="text-sm font-semibold text-white mb-2">4.1 Multi-Step API Synthesis Campaign</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`Starting Material A + Reagent B
    |
    v
STEP 1: Grignard Reaction (-20C, THF, N2 blanket)
    |---> In-process: HPLC conversion >98%
    v
INTERMEDIATE 1 (isolated by extraction, aqueous wash)
    |
    v
STEP 2: Oxidation (TEMPO/NaOCl, 0-5C)
    |---> In-process: TLC/HPLC purity check
    v
INTERMEDIATE 2 (crystallized from IPA/H2O)
    |
    v
STEP 3: Amide Coupling (HATU, DIPEA, DMF, RT)
    |---> In-process: ReactIR endpoint monitoring
    v
INTERMEDIATE 3 (chromatography purification)
    |
    v
STEP 4: Catalytic Hydrogenation (Pd/C, 50 bar H2, 50C)
    |---> In-process: H2 uptake monitoring, HPLC
    v
INTERMEDIATE 4 (filtered, catalyst removal 0.2um)
    |
    v
STEP 5: Salt Formation / Final Crystallization
    |---> Seeded cooling crystallization, polymorph control (XRPD)
    v
CRUDE API --> Reslurry wash --> Drying (vacuum, 45C) --> Milling
    |
    v
FINAL API (>99.5% purity, ICH Q3A impurity profile met)`}</pre>
                </div>

                <h3 className="text-sm font-semibold text-white mt-8 mb-2">4.2 Clean Utility Architecture</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`POTABLE WATER ---> Softener ---> RO (2-pass) ---> EDI ---> PW Storage
                                                                  |
                                                    MED Still / VCD
                                                          |
                                                    WFI STORAGE (>80C)
                                                          |
                                           WFI LOOP (hot recirc, 1.5 m/s min)
                                          /       |        |        \\
                                       Reactor  CIP     Autoclave   Lab
                                       Rinse    Skids    Feed       Use

CLEAN STEAM GENERATOR <---- PW Feed
         |
    CS Distribution ----> SIP Points / Autoclaves / Lyophilizers

HVAC SYSTEM:
  AHU --> Pre-filter (G4) --> Bag filter (F9) --> HEPA H14 --> Room Supply
  Room Return --> Extract --> HEPA exhaust (potent areas) --> Atmosphere

  Pressure Cascade:    Corridor (+45 Pa)
                          |
                       Airlock (+30 Pa)
                          |
                       Production Room (+15 Pa)`}</pre>
                </div>

                <h3 className="text-sm font-semibold text-white mt-8 mb-2">4.3 Data Integrity Flow (21 CFR Part 11)</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`FIELD INSTRUMENTS (PAT probes, sensors, scales)
    |  4-20mA / OPC UA / RS-232
    v
ISA-88 BATCH ENGINE (DCS: Emerson DeltaV / Siemens PCS7)
    |  Phase logic, recipe parameters, electronic batch record
    v
eBR SYSTEM (Electronic Batch Record: Syncade / PharmaSuite)
    |  ALCOA+ enforced: timestamped, attributed, e-signed
    |  Audit trail: who, what, when, why (change reason)
    v
LIMS (LabWare / STARLIMS / Empower CDS)
    |  Sample login, spec check, OOS investigation workflow
    |  21 CFR 11: e-signatures, audit trail, access control
    v
MES (Manufacturing Execution System)
    |  Batch disposition, material tracking, yield reconciliation
    |  Deviation / CAPA management integration
    v
ERP (SAP S/4HANA QM module)
    |  Batch release, CoA generation, inventory management
    v
REGULATORY SUBMISSION (eCTD Module 3.2.S / ASMF)
    |  Process validation data, stability, impurity profiles
    v
ANNUAL PRODUCT REVIEW (APR) / Continued Process Verification`}</pre>
                </div>
            </Section>

            {/* 5. Bill of Materials */}
            <Section title="5. Bill of Materials" id="bom">
                <p className="text-sm text-gray-400 mb-3 italic">
                    Typical BoM for a 6-reactor cGMP API manufacturing facility (multi-purpose).
                </p>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Equipment</th>
                                <th className="text-left px-3 py-2 font-medium">Specification</th>
                                <th className="text-right px-3 py-2 font-medium">Qty</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Hastelloy C-276 Reactors', 'Jacketed, -78 to +200C, 2000-6000 L, ASME BPE', '3'],
                                ['Glass-Lined Reactors', 'Pfaudler/De Dietrich, AE rated, 1000-4000 L', '3'],
                                ['Retreat-Curve Agitators', 'Mag-drive coupling, variable speed 10-120 RPM', '6'],
                                ['Shell-and-Tube Condensers', 'Hastelloy/GL tubes, glycol-cooled, 20 m2', '6'],
                                ['Peeler Centrifuges', 'Heinkel/Rousselet, 800 mm basket, GMP CIP', '2'],
                                ['Nutsche Filter-Dryers', 'Rosenmund, 2-4 m2 filter area, jacketed, agitated', '2'],
                                ['Conical Vacuum Dryers', 'Nauta type, 1000-2000 L, jacket + screw heating', '2'],
                                ['Fluid Bed Dryer', 'GEA/Glatt, 100 kg batch, HEPA exhaust, WIP', '1'],
                                ['Jet Mill System', 'Hosokawa Alpine, spiral jet, N2 inerting, OEB 4 isolator', '1'],
                                ['Prep HPLC / SMB System', 'DAC columns 200-800 mm, UV/MS detection', '1'],
                                ['WFI Still', 'Multi-effect distillation, 1500 L/hr, EN 285 CS quality', '1'],
                                ['Clean Steam Generator', 'Unfired, 1000 kg/hr, PW feed, EN 285 compliant', '1'],
                                ['HVAC AHUs (HEPA H14)', 'Supply + return, HEPA terminal filters, 20-40 ACH', '8'],
                                ['LAF / UDAF Units', 'ISO 5 unidirectional airflow, 0.45 m/s, H14 HEPA', '6'],
                                ['CIP Skids', 'Automated WFI/NaOH/acid/rinse, conductivity verification', '3'],
                                ['Weigh Dispensing Isolators', 'ISO 5 interior, integrated balance, barcode reader', '2'],
                                ['Process Gas Panels', 'N2 (99.999%), H2 (50 bar), compressed air ISO 8573-1', '4'],
                                ['DCS System', 'Emerson DeltaV / Siemens PCS7, redundant controllers', '1 system'],
                                ['eBR System', 'Syncade / PharmaSuite, ISA-88 recipe management', '1 system'],
                                ['LIMS', 'LabWare / STARLIMS, 21 CFR 11 validated, OOS workflow', '1 system'],
                                ['Stability Chambers', 'Walk-in, ICH conditions (25/60, 30/65, 40/75), mapped', '4'],
                                ['HPLC/UHPLC Systems', 'Waters/Agilent, DAD + MS, Empower CDS validated', '6'],
                            ].map(([equip, spec, qty]) => (
                                <tr key={equip} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-gray-300 font-medium">{equip}</td>
                                    <td className="px-3 py-2 text-gray-400">{spec}</td>
                                    <td className="px-3 py-2 text-right text-emerald-500/80 font-mono">{qty}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* 6. Purdue Model Mapping */}
            <Section title="6. Purdue Model Mapping" id="purdue">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Level</th>
                                <th className="text-left px-3 py-2 font-medium">Components</th>
                                <th className="text-left px-3 py-2 font-medium">21 CFR Part 11 Functions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Level 0 — Field', 'PAT probes (FTIR, Raman), RTDs, pressure Tx, load cells, control valves', 'Calibrated instruments with traceability; raw data captured with timestamps'],
                                ['Level 1 — Control', 'DCS controllers (ISA-88 batch engine), PLC for utilities, SIS controllers', 'Secure PID/phase logic; e-signatures on manual interventions; audit trail on setpoint changes'],
                                ['Level 2 — Supervisory', 'DCS operator stations, eBR client terminals, HMI panels', 'Role-based access control; e-signature on critical steps; eBR deviation capture'],
                                ['Level 3 — Operations', 'eBR server, LIMS, MES, process historian, recipe manager', 'Full ALCOA+ compliance; OOS investigation workflow; batch genealogy; e-signed batch release'],
                                ['Level 3.5 — DMZ', 'IDMZ firewalls, data diode (historian mirror), validated backup', 'Validated data transfer; integrity verification; change control for DMZ configuration'],
                                ['Level 4 — Enterprise', 'ERP (SAP QM), regulatory submission (eCTD), APR reporting', '21 CFR 11 audit trail on batch disposition; CoA generation with e-signatures; ASMF data packages'],
                            ].map(([level, components, functions]) => (
                                <tr key={level} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#EC4899] font-medium whitespace-nowrap">{level}</td>
                                    <td className="px-3 py-2 text-gray-300">{components}</td>
                                    <td className="px-3 py-2 text-gray-400">{functions}</td>
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
                                ['Fire Suppression', 'Laboratory and solvent storage per NFPA 45/30', 'Pre-action sprinkler, CO2 for electrical rooms'],
                                ['Solvent Vapor Detection', 'LEL monitoring in synthesis suites and solvent stores', 'Continuous LEL sensors, alarm at 20% LEL, trip at 40% LEL'],
                                ['Containment Verification', 'SMEPAC testing for isolators and split-butterfly valves', 'OEB 4-5: <1 ug/m3 (8-hr TWA), surrogate: lactose/naproxen'],
                                ['Emergency Showers', 'Safety showers and eyewash per ANSI Z358.1', 'Tepid water (16-38C), 15-min sustained flow, <10s travel'],
                                ['Cleanroom Gowning', 'Staged gowning rooms with interlocked airlocks', 'ISO 7: coverall, hood, boots; ISO 5: sterile gown, goggles'],
                                ['Waste Solvent System', 'Segregated collection (halogenated/non-halogenated)', 'Double-walled tanks, level/LEL monitoring, RCRA compliant'],
                                ['Scrubber / Thermal Oxidizer', 'Solvent and acid fume abatement', 'Packed-bed scrubber + RTO (>99% DRE), CEMS monitored'],
                            ].map(([system, desc, spec]) => (
                                <tr key={system} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-gray-300 font-medium whitespace-nowrap">{system}</td>
                                    <td className="px-3 py-2 text-gray-400">{desc}</td>
                                    <td className="px-3 py-2 text-gray-400">{spec}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* 8. Utility Systems */}
            <Section title="8. Utility Systems" id="utilities">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Utility</th>
                                <th className="text-left px-3 py-2 font-medium">System</th>
                                <th className="text-left px-3 py-2 font-medium">Specification</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Water for Injection', 'MED / VCD still, hot recirculating loop', 'Conductivity <1.3 uS/cm, TOC <500 ppb, endotoxin <0.25 EU/mL'],
                                ['Clean Steam', 'Unfired pure steam generator from PW', 'EN 285 condensate quality, non-condensable gases <3.5%, dryness >0.95'],
                                ['Purified Water', '2-pass RO + EDI, ambient loop with UV/ozone', 'Conductivity <1.3 uS/cm, TOC <500 ppb, USP/EP compliant'],
                                ['Nitrogen', 'Bulk LN2 storage with ambient vaporizer', '99.999% purity, <0.5 ppm O2, <1 ppm H2O, 8 bar distribution'],
                                ['Compressed Air', 'Oil-free compressor, desiccant dryer, sterile filter', 'ISO 8573-1 Class 1.2.1, -40C PDP, oil <0.01 mg/m3'],
                                ['Chilled Glycol', 'Central chiller plant, 30% propylene glycol', '-25C supply / -15C return, insulated SS distribution'],
                                ['Hot Water / Steam', 'Process heating for reactors and dryers', '150C hot oil or 6 bar saturated steam, traced distribution'],
                                ['Vacuum', 'Central vacuum pumps (liquid ring / dry screw)', '-980 mbar, solvent-compatible, condensate recovery'],
                            ].map(([utility, system, spec]) => (
                                <tr key={utility} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#EC4899] font-medium whitespace-nowrap">{utility}</td>
                                    <td className="px-3 py-2 text-gray-300">{system}</td>
                                    <td className="px-3 py-2 text-gray-400">{spec}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* 9. Data Flow Architecture */}
            <Section title="9. Data Flow Architecture" id="data-flow">
                <p className="text-sm text-gray-300 leading-relaxed mb-4">
                    The data architecture enforces 21 CFR Part 11 compliance at every interface,
                    with ALCOA+ principles (Attributable, Legible, Contemporaneous, Original,
                    Accurate + Complete, Consistent, Enduring, Available) applied to all GxP records.
                </p>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`+---------------------------------------------------------------+
| REGULATORY LAYER                                              |
|   eCTD Submission (Module 3.2.S)  <-- Validated data export   |
|   Annual Product Review (APR)     <-- Trending, stability     |
+-------------------------------^-------------------------------+
                                | HTTPS / SFTP (validated)
+-------------------------------+-------------------------------+
| ERP LAYER (Level 4)                                           |
|   SAP QM: Batch disposition (e-signed), CoA generation        |
|   SAP MM: Raw material release, inventory, supplier quals     |
+-------------------------------^-------------------------------+
                                | OPC UA / Web Services
+-------------------------------+-------------------------------+
| MES / eBR LAYER (Level 3)                                     |
|   MES: Batch genealogy, yield reconciliation, deviation mgmt  |
|   eBR: ISA-88 recipe execution, e-signed critical steps       |
|   LIMS: Sample management, OOS workflow, stability tracking   |
|   Historian: 50k+ tags, 1s resolution, 21 CFR 11 audit trail |
+-------------------------------^-------------------------------+
                                | Proprietary control network
+-------------------------------+-------------------------------+
| CONTROL LAYER (Level 1/2)                                     |
|   DCS: PID loops, ISA-88 batch phases, alarm management       |
|   eBR Client: Operator prompts, barcode scan, e-sign          |
|   SIS: Independent safety logic (IEC 61511)                   |
+-------------------------------^-------------------------------+
                                | 4-20mA / HART / PROFINET
+-------------------------------+-------------------------------+
| FIELD LAYER (Level 0)                                         |
|   PAT Probes: FTIR, Raman (real-time reaction monitoring)     |
|   Sensors: RTD, pressure, pH, conductivity, particle counter  |
|   Final Elements: Control valves, on/off valves, VFDs         |
+---------------------------------------------------------------+

AUDIT TRAIL: Every layer generates immutable, timestamped audit
records with user attribution, old/new values, and change reason.
Electronic signatures require biometric or password + meaning.`}</pre>
                </div>
            </Section>

            {/* 10. References */}
            <Section title="10. References" id="references">
                <div className="space-y-2 text-xs text-gray-400 leading-relaxed">
                    <p>European Commission. (2023). <em>EU GMP Annex 1: Manufacture of Sterile Medicinal Products</em> (revised). Official Journal of the European Union.</p>
                    <p>International Conference on Harmonisation. (2000). <em>ICH Q7: Good Manufacturing Practice Guide for Active Pharmaceutical Ingredients</em>. ICH.</p>
                    <p>International Conference on Harmonisation. (2009). <em>ICH Q8(R2): Pharmaceutical Development</em>. ICH.</p>
                    <p>International Conference on Harmonisation. (2005). <em>ICH Q9: Quality Risk Management</em>. ICH.</p>
                    <p>International Society for Pharmaceutical Engineering. (2022). <em>GAMP 5: A Risk-Based Approach to Compliant GxP Computerized Systems</em> (2nd ed.). ISPE.</p>
                    <p>International Society for Pharmaceutical Engineering. (2019). <em>ISPE Baseline Guide: Oral Solid Dosage Forms</em> (3rd ed.). ISPE.</p>
                    <p>U.S. Food and Drug Administration. (2003). <em>21 CFR Part 11: Electronic Records; Electronic Signatures &mdash; Scope and Application</em>. FDA.</p>
                    <p>U.S. Food and Drug Administration. (2021). <em>21 CFR Parts 210 and 211: Current Good Manufacturing Practice</em>. FDA.</p>
                    <p>International Organization for Standardization. (2015). <em>ISO 14644-1: Cleanrooms and associated controlled environments</em>. ISO.</p>
                    <p>International Electrotechnical Commission. (2016). <em>IEC 61511: Functional safety &mdash; Safety instrumented systems for the process industry sector</em>. IEC.</p>
                </div>
            </Section>

            {/* See Also */}
            <Section title="See Also" id="see-also">
                <div className="flex flex-wrap gap-2">
                    {[
                        { href: '/wiki/chemical', label: 'Chemical Sector Hub', color: '#EC4899' },
                        { href: '/wiki/chemical/batch-processing', label: 'Batch Processing', color: '#8B5CF6' },
                        { href: '/wiki/dexpi/equipment-classes', label: 'DEXPI Equipment Classes', color: '#8B5CF6' },
                        { href: '/wiki/sectors/CHEM', label: 'Chemical Sector Overview', color: '#F59E0B' },
                    ].map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-white/[0.04]"
                            style={{ borderColor: `${link.color}30`, color: link.color }}
                        >
                            {link.label} &rarr;
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
