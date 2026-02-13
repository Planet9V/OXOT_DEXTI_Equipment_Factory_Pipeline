/**
 * Biopharmaceutical Manufacturing Facility — Deep-Dive Reference Architecture.
 *
 * cGMP biologics production facility (2 000 L bioreactor scale) with upstream
 * cell culture, downstream purification, aseptic fill/finish in ISO 5-8
 * cleanrooms, WFI/clean steam utilities, and DeltaV DCS automation.
 *
 * @module wiki/healthcare/biopharma-manufacturing/page
 */

export const metadata = {
    title: 'Biopharma Manufacturing Reference Architecture — Healthcare Wiki',
    description: 'cGMP biologics facility: 22-row BOM, DeltaV DCS, ISA-88 batch, Protein A chromatography, ISO 5 fill/finish, WFI systems.',
};

const C = '#A855F7';

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
    ['Single-Use Bioreactor (2000 L)', 'Sartorius Biostat STR, agitated, CHO cell culture', '2', '2 000 L, 50–150 rpm'],
    ['Inoculum Bioreactor (200 L)', 'Stainless steel, SIP/CIP', '4', '200 L, seed train'],
    ['Media Prep Vessel', 'Single-use mixer, 3 000 L', '2', '3 000 L'],
    ['Protein A Chromatography Skid', 'GE ÄKTA, MabSelect Sure resin', '2', '200 L resin, 2–6 min RT'],
    ['Ion Exchange Column', 'Capto Q / Capto S, AEX + CEX', '2', '50–200 cm bed'],
    ['Viral Filtration Unit', 'Millipore Viresolve Pro, 20 nm', '2', '20–50 nm pores'],
    ['UF/DF System', 'Pall Centramate, 30–50 kDa MWCO', '2', '2 m², 10–20 DV'],
    ['Aseptic Filling Isolator', 'Getinge, VPHP decontamination, ISO 5', '1', '100–400 vials/min'],
    ['Lyophilizer', 'IMA Lyovac, −45 °C shelves, 1.3 mbar', '1', '10 000 vials/batch'],
    ['100% Inspection Machine', 'Seidenader VisiInspect, CCD cameras', '1', '300 vials/min'],
    ['WFI Still', 'GEA, multi-effect distillation', '1', '2 000 L/h, < 0.25 EU/mL'],
    ['Clean Steam Generator', 'Spirax Sarco, saturated', '1', '1 000 kg/h'],
    ['RO/DI Skid', 'Millipore Elix, pre-treatment', '1', '5 000 L/day'],
    ['HEPA Fan Filter Unit', 'Camfil, ISO 5 coverage', '200', 'H14, 0.3 µm MPPS'],
    ['Biosafety Cabinet', 'Labconco Class II Type A2', '10', '0.3 m/s inflow'],
    ['DeltaV DCS', 'Emerson, S88 batch control', '1', 'L1–L3 integration'],
    ['Syncade MES', 'Emerson, electronic batch records', '1', 'ISA-88 recipes'],
    ['Particle Counter', 'Beckman MET ONE, continuous monitoring', '20', '0.5 µm, ISO 5'],
    ['−80 °C Freezer', 'Thermo Fisher, ULT', '4', '500 L capacity'],
    ['Walk-In Cold Room', 'Trane, 2–8 °C', '2', '100 m³'],
    ['HPLC/MS System', 'Agilent 1260/6530, QC release testing', '2', 'Titer / purity assay'],
    ['Endotoxin Reader', 'Charles River PTS, LAL chromogenic', '2', '< 0.005 EU/mL'],
];

const PURDUE: string[][] = [
    ['L4 Enterprise', 'SAP ERP, LIMS (LabWare), regulatory submission', 'OPC UA, REST, TCP/IP'],
    ['L3.5 DMZ', 'Data diode, protocol firewall, historian mirror', 'TLS 1.3, unidirectional GW'],
    ['L3 Operations', 'MES (Syncade), batch historian (OSIsoft PI), LIMS', 'ISA-88 S88, OPC UA'],
    ['L2 Supervisory', 'DeltaV DCS, Synergy HMI, alarm management', 'Ethernet/IP, OPC DA/UA'],
    ['L1 Control', 'PLC (Allen-Bradley ControlLogix), VFDs, valves', 'EtherNet/IP, DeviceNet'],
    ['L0 Process', 'Bioreactors, chromatography skids, filling isolator', 'pH/DO/T probes, 4–20 mA'],
];

export default function BiopharmaManufacturingPage() {
    return (
        <div className="max-w-5xl space-y-12">
            <header className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                    <div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]" style={{ background: C }} />
                    <span className="text-xs font-mono text-gray-500">HEAL · Pharma & Biotech · HLTH-PH-BIO</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">Biopharmaceutical Manufacturing Facility</h1>
                <p className="text-sm text-gray-400 max-w-3xl">cGMP biologics production at 2 000 L scale — upstream cell culture, downstream purification, aseptic fill/finish in ISO 5–8 cleanrooms.</p>
            </header>

            <S title="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-400 leading-relaxed">Stakeholders: <span style={{ color: C }} className="font-medium">pharma sponsors</span>, <span style={{ color: C }} className="font-medium">CMOs/CDMOs</span>, <span style={{ color: C }} className="font-medium">FDA</span> (21 CFR 211/600), <span style={{ color: C }} className="font-medium">EMA</span> (EU GMP Annex 1), and <span style={{ color: C }} className="font-medium">WHO PQ</span>. Business capabilities: upstream cell culture, downstream purification, fill/finish, QC/QA release.</p>
                <T headers={['Standard', 'Scope']} rows={[
                    ['FDA 21 CFR 210/211/600', 'cGMP for finished drugs & biologics — facility, equipment, process controls'],
                    ['EU GMP Annex 1 (2022)', 'Sterile manufacturing — contamination control strategy, APS'],
                    ['ICH Q7/Q8/Q9/Q10', 'GMP, pharmaceutical development, quality risk management, quality system'],
                    ['USP <797>/<1116>', 'Sterile compounding and microbiological evaluation of cleanrooms'],
                    ['ISPE GAMP 5', 'Risk-based computerized system validation (Category 4/5)'],
                    ['ISO 14644-1', 'Cleanroom classification — ISO 5 (Grade A) through ISO 8 (Grade D)'],
                ]} />
            </S>

            <S title="2. High-Level Design" id="design">
                <p className="text-sm text-gray-400 leading-relaxed">Unidirectional process flow from cell bank thaw through inoculum train, production bioreactor, harvest, purification, bulk drug substance, fill/finish, and QC release. Cleanroom cascades maintain positive pressure from ISO 5 (fill) → ISO 7 (processing) → ISO 8 (support) → unclassified.</p>
                <Pre>{`┌─────────────────────────────────────────────────────────────────────────┐
│                    cGMP BIOPHARMA FACILITY                              │
│                                                                        │
│  ┌─────────┐   ┌───────────┐   ┌───────────┐   ┌──────────┐          │
│  │ Cell    │──▶│ Inoculum  │──▶│Production │──▶│ Harvest  │          │
│  │ Bank    │   │ 2–200 L   │   │ 2000 L    │   │ Depth FN │          │
│  │ Thaw    │   │ Seed Train│   │ Fed-Batch │   │          │          │
│  └─────────┘   └───────────┘   └───────────┘   └────┬─────┘          │
│                                                      │                │
│                         DOWNSTREAM                   ▼                │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │Protein A │─▶│ AEX/CEX  │─▶│  Viral   │─▶│  UF/DF   │             │
│  │Capture   │  │ Polish   │  │ Filt 20nm│  │ Buffer Ex│             │
│  └──────────┘  └──────────┘  └──────────┘  └────┬─────┘             │
│                                                  ▼                   │
│                ┌──────────────────────────────────────────┐          │
│                │        FILL / FINISH (ISO 5)             │          │
│                │  Isolator → Filler → Lyophilizer → Insp  │          │
│                └──────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────────────────────┘`}</Pre>
            </S>

            <S title="3. Detailed Technical Description" id="technical">
                <h3 className="text-sm font-semibold text-white">3.1 Upstream Processing</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Single-use bioreactors (Sartorius Biostat STR 2 000 L, agitated 50–150 rpm). CHO cell culture: pH 6.8–7.2, DO 30–50%, T 35–37 °C. Fed-batch (10–14 day, titer 5–10 g/L mAb) or perfusion (ATF/TFF, {'>'} 50×10⁶ cells/mL). Chemically defined media (PowerCHO, 20–40 g/L glucose).</p>

                <h3 className="text-sm font-semibold text-white mt-6">3.2 Downstream Processing</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Protein A capture (MabSelect Sure, 30–50 g/L DBC, 2–6 min RT). Ion exchange polish (Capto Q/S). Viral inactivation (low pH 3.5, 25 °C, 1 h). Viral filtration (Viresolve Pro, 20 nm). UF/DF (30–50 kDa MWCO, 10–20 DV, buffer exchange to histidine pH 5.5–6.5).</p>

                <h3 className="text-sm font-semibold text-white mt-6">3.3 Fill/Finish</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Isolator/RABS (Getinge, ISO 5, VPHP decontamination). Peristaltic vial filling (1–100 mL, 100–400 vials/min). Lyophilization (−45 °C shelf, 1.3 mbar, 24–72 h). 100% automated visual inspection (CCD, 99.9% defect detection).</p>

                <h3 className="text-sm font-semibold text-white mt-6">3.4 Utilities</h3>
                <p className="text-sm text-gray-400 leading-relaxed">WFI (USP {'<'}643{'>'}: {'<'} 1.3 µS/cm conductivity, {'<'} 0.25 EU/mL endotoxin, 80 °C hot loop). Clean steam ({'<'} 1.5 µm non-viable). CDA (−40 °C PDP, 0.01 µm filtered). Process gases (N₂/O₂/CO₂, 99.999% purity, sterile filtered at point-of-use).</p>

                <h3 className="text-sm font-semibold text-white mt-6">3.5 Environmental Monitoring</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Viable particles (active/passive air sampling, {'<'} 1 CFU/m³ ISO 5). Non-viable (Beckman MET ONE, 0.5 µm ≥ 3 520/m³ ISO 5). TOC ({'<'} 500 ppb WFI). Endotoxin (LAL chromogenic, {'<'} 0.005 EU/mL).</p>
            </S>

            <S title="4. Process Diagrams" id="process">
                <h3 className="text-sm font-semibold text-white">4.1 Bioprocess Flow</h3>
                <Pre>{`Cell Bank ──▶ Thaw ──▶ T-Flask ──▶ 2L ──▶ 20L ──▶ 200L ──▶ 2000L
                                         Seed Train (7–10 d each)
             │
             ▼
   Harvest (Depth Filtration) ──▶ Capture (ProA) ──▶ VI ──▶ CEX ──▶ VF ──▶ UF/DF
             │
             ▼
   Bulk Drug Substance ──▶ Fill (Isolator) ──▶ Lyo ──▶ Inspect ──▶ Pack ──▶ Ship`}</Pre>

                <h3 className="text-sm font-semibold text-white mt-6">4.2 CIP/SIP Cycle</h3>
                <Pre>{`Pre-Rinse (WFI) ──▶ Caustic (0.5 M NaOH, 60 °C, 30 min)
       │
       ▼
Acid Rinse (H₃PO₄) ──▶ WFI Rinse ──▶ SIP (121 °C, 30 min) ──▶ Cool-Down`}</Pre>

                <h3 className="text-sm font-semibold text-white mt-6">4.3 DCS/MES Data Flow</h3>
                <Pre>{`L0 Sensors ──▶ L1 PLC ──▶ L2 DeltaV DCS ──▶ L3 Syncade MES ──▶ L4 SAP/LIMS
  (pH/DO/T)    (Valves)    (HMI/Alarm)     (eBR/S88 Batch)    (ERP/QC Release)
                                │
                           OSIsoft PI
                          (Historian)`}</Pre>
            </S>

            <S title="5. Bill of Materials — 2 000 L Scale" id="bom">
                <T headers={['Equipment', 'Specification', 'Qty', 'Rating']} rows={BOM} />
            </S>

            <S title="6. Purdue Model Mapping" id="purdue">
                <T headers={['Level', 'Components', 'Protocols']} rows={PURDUE} />
                <p className="text-xs text-gray-500 italic">Aligned with ISPE GAMP 5 and ISA-88 batch control standards.</p>
            </S>

            <S title="7. Supporting Systems" id="supporting">
                <T headers={['System', 'Description', 'Specification']} rows={[
                    ['BSL-2 Containment', 'BSCs, pass-through autoclaves, HEPA exhaust', 'Class II Type A2, 0.3 m/s inflow'],
                    ['Clean Agent Suppression', 'FM-200 / Novec 1230, data center rated', '< 5 sec discharge, NFPA 2001'],
                    ['Emergency Shower', 'Tempered water, ANSI Z358.1', '20 min flow, 60–100 °F'],
                    ['Secondary Containment', 'Bunded areas, chemical neutralization kits', 'Per SPCC regulations'],
                    ['Cleanroom Monitoring', 'Continuous particle/microbial, SCADA alarming', '24/7, auto-deviation reporting'],
                ]} />
            </S>

            <S title="8. Utility Systems" id="utilities">
                <T headers={['Medium', 'System', 'Specification']} rows={[
                    ['WFI', 'Multi-effect still, 80 °C hot loop', '< 1.3 µS/cm, < 0.25 EU/mL'],
                    ['Clean Steam', 'Spirax Sarco generator', '< 1.5 µm non-viable, saturated'],
                    ['CDA (Clean Dry Air)', 'Oil-free compressor, membrane dryer', '−40 °C PDP, 0.01 µm filter'],
                    ['Process Gas (N₂/O₂/CO₂)', 'Bulk liquid, sterile point-of-use filter', '99.999% purity'],
                    ['Chilled Water', 'Central plant, glycol secondary loop', '7 °C supply, N+1 chillers'],
                ]} />
            </S>

            <S title="9. Data Flow Architecture" id="dataflow">
                <Pre>{`┌─ Tier 0: Process ────────────────────────────────────────────────────┐
│  pH/DO/T/pressure probes, load cells, flow meters                   │
│  Polling: 1 s   │  Points: ~5 000 analog + 3 000 digital           │
└──────────────────────────────┬───────────────────────────────────────┘
                               ▼
┌─ Tier 1: Control ────────────────────────────────────────────────────┐
│  DeltaV I/O cards, ControlLogix PLCs, VFDs, valve actuators         │
│  Scan: 100 ms   │  Loops: ~500 PID                                 │
└──────────────────────────────┬───────────────────────────────────────┘
                               ▼
┌─ Tier 2: Supervisory ────────────────────────────────────────────────┐
│  DeltaV Operate (HMI), alarm mgmt, batch engine (ISA-88/S88)       │
│  Data: Batch recipe execution, golden batch overlay                 │
└──────────────────────────────┬───────────────────────────────────────┘
                               ▼
┌─ Tier 3: MES / Historian ────────────────────────────────────────────┐
│  Syncade MES (eBR), OSIsoft PI (historian), LIMS (LabWare)          │
│  Integration: OPC UA pub/sub, S88 procedure model                   │
└──────────────────────────────┬───────────────────────────────────────┘
                               ▼
┌─ Tier 4: Enterprise ─────────────────────────────────────────────────┐
│  SAP (ERP), Trackwise (CAPA), regulatory submission (eCTD)          │
│  Protocol: REST, HTTPS │ Cadence: Daily batch / on-demand           │
└──────────────────────────────────────────────────────────────────────┘`}</Pre>
            </S>

            <S title="10. References" id="references">
                <ol className="list-decimal list-inside space-y-1 text-xs text-gray-400">
                    <li>FDA. (2024). 21 CFR Parts 210, 211, 600: cGMP for Finished Pharmaceuticals and Biologics.</li>
                    <li>EMA. (2022). <em>EU GMP Annex 1: Manufacture of Sterile Medicinal Products</em>.</li>
                    <li>ICH. (2020). <em>Q10: Pharmaceutical Quality System</em>.</li>
                    <li>ISPE. (2022). <em>GAMP 5: Risk-Based Approach to GxP Computerized Systems</em>, 2nd ed.</li>
                    <li>ISA. (2015). <em>ISA-88.01: Batch Control Models and Terminology</em>.</li>
                    <li>ISO. (2015). <em>ISO 14644-1: Cleanrooms — Classification of Air Cleanliness</em>.</li>
                    <li>USP. (2023). General Chapter &lt;1116&gt;: Microbiological Evaluation of Cleanrooms.</li>
                    <li>Rathore, A. S. & Winkle, H. (2009). Quality by design for biopharmaceuticals. <em>Nature Biotechnology</em>, 27(1), 26–34.</li>
                </ol>
            </S>

            <section className="space-y-3">
                <h2 className="text-sm font-semibold text-gray-500">See Also</h2>
                <div className="flex flex-wrap gap-2">
                    {[
                        { label: 'Healthcare Hub', href: '/wiki/healthcare', color: '#EC4899' },
                        { label: 'Medical Device Mfg', href: '/wiki/healthcare/medical-device-mfg', color: '#F97316' },
                        { label: 'Blood Processing', href: '/wiki/healthcare/blood-processing', color: '#EF4444' },
                        { label: 'Chemical Sector', href: '/wiki/chemical', color: '#EF4444' },
                    ].map(l => (
                        <a key={l.href} href={l.href} className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-white/[0.04]" style={{ borderColor: `${l.color}30`, color: l.color }}>{l.label}</a>
                    ))}
                </div>
            </section>
        </div>
    );
}
