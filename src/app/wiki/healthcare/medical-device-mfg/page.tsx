/**
 * Medical Device Manufacturing Facility — Deep-Dive Reference Architecture.
 *
 * ISO 13485 cleanroom facility for Class II/III medical devices with injection
 * molding, CNC machining, EtO/gamma sterilization, 100% vision inspection,
 * and FDA 21 CFR 820 QSR compliance.
 *
 * @module wiki/healthcare/medical-device-mfg/page
 */

export const metadata = {
    title: 'Medical Device Manufacturing Reference Architecture — Healthcare Wiki',
    description: 'ISO 13485 cleanroom: 22-row BOM, injection molding, CNC machining, EtO/gamma sterilization, UDI compliance, Purdue model.',
};

const C = '#F97316';

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
    ['Injection Molding Press', 'Clean-wall Arburg/Engel, ISO 8 cleanroom', '4–6', '50–500 ton'],
    ['5-Axis CNC Mill', 'Ti-6Al-4V / CoCrMo machining, ±5 µm', '2–4', 'Orthopedic implants'],
    ['Swiss-Type Lathe', 'Sliding headstock, < 1 mm diameter', '2–3', '> 20 000 RPM'],
    ['Fiber Laser Welder/Cutter', 'Nd:YAG, 500 W, micro-welding', '2', 'Catheter/stent assembly'],
    ['CMM (Coordinate Measuring)', 'Zeiss/Mitutoyo, scanning probes', '2', 'GD&T, ASME Y14.5'],
    ['Optical Comparator', 'Profile projection, 10× magnification', '2', 'First-article inspection'],
    ['Surface Profilometer', 'Stylus-based, Ra < 0.4 µm', '1', 'Implant surface finish'],
    ['Vision Inspection System', '2D/3D AOI, 100% inline inspection', '3–4', 'Defect detection'],
    ['EtO Sterilizer Chamber', '100–500 ft³, 450–1 200 mg/L', '2', 'ISO 11135, 12–72 h cycle'],
    ['Gamma Irradiator', 'Co-60 source, 25–50 kGy dose mapping', '1', 'ISO 11137, SAL 10⁻⁶'],
    ['Steam Autoclave', '121 °C / 134 °C saturated steam', '2', 'ISO 17665, F₀ > 8 min'],
    ['H₂O₂ Gas Plasma Unit', 'STERRAD, low-temp 45–60 °C', '1', 'ISO 22441, 45–75 min cycle'],
    ['Automated Assembly Station', 'Robotic pick-and-place, torque control', '4–6', 'Ultrasonic welding'],
    ['Form-Fill-Seal Line', 'Tyvek pouch sealer, ASTM F1886', '2', 'ISO 11607 packaging'],
    ['Labeler (UDI)', 'GS1-128 barcode, 21 CFR 801.20', '2', 'Serialization'],
    ['Particle Counter', 'Continuous, ISO 14644-2 monitoring', '10', 'ISO 7/8 cleanrooms'],
    ['Environmental Monitor', 'T/RH/ΔP SCADA integration', '20', '20±2 °C, 45±5% RH'],
    ['Cleanroom HVAC', 'HEPA (H13/H14), 20–40 ACH', '4 AHUs', 'ISO 7/8 classification'],
    ['Mold Temperature Controller', 'Water/oil, 80–180 °C', '6', 'Per press station'],
    ['Cavity Pressure Transducer', '50–150 MPa, process monitoring', '24', 'Per mold cavity'],
    ['Siemens S7 PLC', 'Molding cycle control, SCADA integration', '6', 'Per press'],
    ['MES/QMS Server', 'SPC, DHR generation, electronic batch records', '1', 'ISO 13485 traceability'],
];

const PURDUE: string[][] = [
    ['L4 Enterprise', 'ERP (SAP), PLM (Windchill), UDI registry, regulatory submission', 'REST, HTTPS'],
    ['L3.5 DMZ', 'Data diode, protocol firewall, secure file transfer', 'TLS 1.3, SFTP'],
    ['L3 Operations', 'MES/QMS (SPC, DHR, eBR), historian, LIMS', 'OPC UA, SQL'],
    ['L2 Supervisory', 'SCADA/HMI for molding, CNC, sterilization monitoring', 'OPC DA/UA, Modbus/TCP'],
    ['L1 Control', 'PLC (Siemens S7) — press cycles, autoclave, EtO chambers', 'PROFINET, Modbus RTU'],
    ['L0 Process', 'Mold cavity sensors, CMM probes, sterilizer thermocouples', '4–20 mA, HART'],
];

export default function MedicalDeviceMfgPage() {
    return (
        <div className="max-w-5xl space-y-12">
            <header className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                    <div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]" style={{ background: C }} />
                    <span className="text-xs font-mono text-gray-500">HEAL · Medical Devices · HLTH-MD-MFG</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">Medical Device Manufacturing Facility</h1>
                <p className="text-sm text-gray-400 max-w-3xl">ISO 13485 cleanroom facility producing Class II/III medical devices — injection molding, CNC machining, EtO/gamma sterilization, and UDI serialization.</p>
            </header>

            <S title="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-400 leading-relaxed">Stakeholders: <span style={{ color: C }} className="font-medium">OEM medical device companies</span>, <span style={{ color: C }} className="font-medium">contract manufacturers</span>, <span style={{ color: C }} className="font-medium">FDA</span> (21 CFR 820 QSR), <span style={{ color: C }} className="font-medium">notified bodies</span> (EU MDR 2017/745), and <span style={{ color: C }} className="font-medium">ISO registrars</span> (ISO 13485). Design controls mandate DHF (design history file), DMR (device master record), and DHR (device history record) for full traceability.</p>
                <T headers={['Standard', 'Scope']} rows={[
                    ['FDA 21 CFR 820 (QSR)', 'Quality system regulation — design controls, production, corrective action'],
                    ['ISO 13485:2016', 'Quality management system for medical devices — process validation'],
                    ['ISO 14971:2019', 'Risk management — FMEA, fault tree analysis, hazard-based'],
                    ['ISO 10993', 'Biocompatibility — cytotoxicity, sensitization, irritation testing'],
                    ['ISO 11607', 'Packaging validation — seal strength > 1 N/25 mm, microbial barrier'],
                    ['ISO 14644-1', 'Cleanroom classification — ISO 7 (Class II devices), ISO 8 (molding)'],
                    ['ISO 11135 / 11137 / 17665', 'Sterilization validation — EtO, gamma, steam autoclave'],
                ]} />
            </S>

            <S title="2. High-Level Design" id="design">
                <p className="text-sm text-gray-400 leading-relaxed">The facility separates raw material receiving, forming/machining (ISO 8), assembly/inspection (ISO 7), sterilization, packaging (ISO 7), and shipping. Personnel and product flows are segregated via gowning rooms and material airlocks. Cleanrooms maintain 20±2 °C, 45±5% RH, 20–40 ACH with HEPA filtration.</p>
                <Pre>{`┌──────────────────────────────────────────────────────────────────────────┐
│                  MEDICAL DEVICE MANUFACTURING                           │
│                                                                         │
│  ┌───────────┐   ┌──────────────┐   ┌───────────────┐   ┌───────────┐ │
│  │ Receiving │──▶│  Forming     │──▶│  Assembly &   │──▶│ Steriliz. │ │
│  │ & QC      │   │  (ISO 8)     │   │  Inspection   │   │ EtO/Gamma │ │
│  │ Incoming  │   │ Molding/CNC  │   │  (ISO 7)      │   │           │ │
│  └───────────┘   └──────────────┘   └───────────────┘   └─────┬─────┘ │
│                                                               │       │
│       ┌─── Personnel Flow ───▶ Gowning ──▶ Airlock ──▶ CR ──┘       │
│       │                                                              │
│       ▼                                                              │
│  ┌───────────────┐   ┌──────────────┐   ┌─────────────────────┐     │
│  │  Packaging    │──▶│  Labeling    │──▶│  Warehouse / Ship   │     │
│  │  (ISO 7)      │   │  UDI / GS1   │   │  2–30 °C controlled │     │
│  │  Form-Fill    │   │  Serialized  │   │                     │     │
│  └───────────────┘   └──────────────┘   └─────────────────────┘     │
└──────────────────────────────────────────────────────────────────────────┘`}</Pre>
            </S>

            <S title="3. Detailed Technical Description" id="technical">
                <h3 className="text-sm font-semibold text-white">3.1 Injection Molding</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Clean-wall presses (Arburg Allrounder, Engel duo, 50–500 ton) in ISO 8 cleanroom. Medical-grade resins: PEEK, UHMWPE, polycarbonate, liquid silicone rubber (LSR). Cavity pressure monitoring (50–150 MPa), mold temperature control (80–180 °C), injection speed 50–200 mm/s with IQ/OQ/PQ validation (CpK {'>'} 1.33).</p>

                <h3 className="text-sm font-semibold text-white mt-6">3.2 CNC Machining</h3>
                <p className="text-sm text-gray-400 leading-relaxed">5-axis milling for orthopedic implants (Ti-6Al-4V, CoCrMo, ±5 µm tolerance, Ra {'<'} 0.4 µm). Swiss-type turning for surgical instruments ({'<'} 1 mm diameter, {'>'} 20 000 RPM). CMM post-machining (Zeiss/Mitutoyo, GD&T per ASME Y14.5). Coolant mist extraction in ISO 7/8 enclosures.</p>

                <h3 className="text-sm font-semibold text-white mt-6">3.3 Sterilization</h3>
                <p className="text-sm text-gray-400 leading-relaxed">EtO (ISO 11135): 450–1 200 mg/L, 40–60 °C, 12–72 h cycle, 8–12 h aeration to {'<'} 1 ppm, OSHA PEL 1 ppm TWA. Gamma (ISO 11137): 25–50 kGy, Co-60 source, SAL 10⁻⁶. Steam (ISO 17665): 121 °C/134 °C, F₀ {'>'} 8 min. H₂O₂ plasma (ISO 22441): 45–60 °C, 45–75 min for heat-sensitive devices.</p>

                <h3 className="text-sm font-semibold text-white mt-6">3.4 Quality Systems</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Design controls per FDA QSR: DHF (requirements, V&V), DMR (specifications, drawings), DHR (production records). Process validation (IQ/OQ/PQ). Risk management per ISO 14971 (FMEA). Biocompatibility per ISO 10993. Packaging validation per ISO 11607 (seal strength {'>'} 1 N/25 mm, ASTM F1886 microbial barrier).</p>
            </S>

            <S title="4. Process Diagrams" id="process">
                <h3 className="text-sm font-semibold text-white">4.1 End-to-End Manufacturing Flow</h3>
                <Pre>{`Resin/Metal ──▶ IQC ──▶ Molding/CNC ──▶ Deburr/Clean ──▶ Assembly
                                                                  │
                    ┌──────────────────────────────────────────────┘
                    ▼
              Vision Inspect (100%) ──▶ Sterilize (EtO/Gamma) ──▶ Aerate
                                                                    │
                    ┌───────────────────────────────────────────────┘
                    ▼
              Package (Tyvek) ──▶ Label (UDI/GS1) ──▶ QA Release ──▶ Ship`}</Pre>

                <h3 className="text-sm font-semibold text-white mt-6">4.2 Design Control V-Model</h3>
                <Pre>{`User Needs ────────────────────────────────────── Validation (Clinical)
     │                                                    ▲
     ▼                                                    │
Design Input ──────────────────────────────── Verification (Testing)
     │                                                    ▲
     ▼                                                    │
Design Output ─────────────────────────────── Unit Testing (OQ/PQ)
     │                                                    ▲
     ▼                                                    │
Manufacturing Process ──────────────────────── Process Validation
                                                (IQ / OQ / PQ)`}</Pre>
            </S>

            <S title="5. Bill of Materials — Class II/III Facility" id="bom">
                <T headers={['Equipment', 'Specification', 'Qty', 'Rating']} rows={BOM} />
            </S>

            <S title="6. Purdue / ISA-95 Model" id="purdue">
                <T headers={['Level', 'Components', 'Protocols']} rows={PURDUE} />
                <p className="text-xs text-gray-500 italic">UDI compliance per FDA 21 CFR 801.20 — GS1-128 barcodes for serialization and traceability.</p>
            </S>

            <S title="7. Safety Systems" id="safety">
                <T headers={['Hazard', 'Control', 'Standard']} rows={[
                    ['EtO Exposure', 'Local exhaust, continuous monitor, OSHA PEL 1 ppm TWA', 'OSHA 29 CFR 1910.1047'],
                    ['Gamma Radiation', 'Shielded irradiation cell, dosimetry badges, interlocks', 'NRC 10 CFR 20'],
                    ['CNC Coolant Mist', 'Mist extraction, LEV, respiratory protection', 'OSHA PEL per coolant SDS'],
                    ['Cleanroom Particulate', 'HEPA H13/H14, continuous monitoring, gowning protocol', 'ISO 14644-2'],
                    ['Ergonomic (Assembly)', 'Adjustable workstations, micro-break protocols', 'OSHA General Duty Clause'],
                ]} />
            </S>

            <S title="8. Cleanroom Environment" id="cleanroom">
                <T headers={['Parameter', 'ISO 7 (Assembly/Pkg)', 'ISO 8 (Molding/CNC)']} rows={[
                    ['Max Particles ≥ 0.5 µm/m³', '352 000', '3 520 000'],
                    ['Temperature', '20 ± 2 °C', '20 ± 2 °C'],
                    ['Relative Humidity', '45 ± 5% RH', '45 ± 5% RH'],
                    ['Air Changes per Hour', '30–40 ACH', '20–30 ACH'],
                    ['Pressure Differential', '+10–15 Pa cascade', '+10–15 Pa cascade'],
                    ['Gowning', 'Hood, coverall, gloves, shoe covers', 'Lab coat, gloves, shoe covers'],
                ]} />
            </S>

            <S title="9. Data Flow Architecture" id="dataflow">
                <Pre>{`┌─ Tier 0: Sensors ─────────────────────────────────────────────────────┐
│  Cavity pressure (4–20 mA), CMM probes, sterilizer thermocouples     │
│  Polling: 10–100 ms   │  Points: ~2 000 analog + 1 000 digital      │
└──────────────────────────────┬────────────────────────────────────────┘
                               ▼
┌─ Tier 1: PLC Control ────────────────────────────────────────────────┐
│  Siemens S7 (press cycle), Allen-Bradley (sterilizer), VFDs          │
│  Scan: 10 ms   │  Loops: ~200 PID                                   │
└──────────────────────────────┬────────────────────────────────────────┘
                               ▼
┌─ Tier 2: SCADA/HMI ─────────────────────────────────────────────────┐
│  Ignition / WinCC — process visualization, alarm management         │
│  Data: Real-time SPC (X-bar/R), cavity pressure overlay             │
└──────────────────────────────┬────────────────────────────────────────┘
                               ▼
┌─ Tier 3: MES / QMS ─────────────────────────────────────────────────┐
│  eBR, DHR generation, CAPA tracking, SPC, UDI serialization         │
│  Integration: OPC UA → Historian → LIMS                             │
└──────────────────────────────┬────────────────────────────────────────┘
                               ▼
┌─ Tier 4: Enterprise ─────────────────────────────────────────────────┐
│  SAP ERP, PLM (Windchill/Teamcenter), FDA GUDID, UDI registry       │
│  Protocol: REST / HTTPS  │  Cadence: Per-lot / on-demand            │
└──────────────────────────────────────────────────────────────────────┘`}</Pre>
            </S>

            <S title="10. References" id="references">
                <ol className="list-decimal list-inside space-y-1 text-xs text-gray-400">
                    <li>FDA. (2024). 21 CFR Part 820: Quality System Regulation.</li>
                    <li>ISO. (2016). <em>ISO 13485:2016 — Medical Devices: Quality Management Systems</em>.</li>
                    <li>ISO. (2019). <em>ISO 14971:2019 — Medical Devices: Application of Risk Management</em>.</li>
                    <li>ISO. (2015). <em>ISO 14644-1 — Cleanrooms: Classification of Air Cleanliness</em>.</li>
                    <li>ISO. (2007). <em>ISO 11135 — Sterilization of Health-Care Products: Ethylene Oxide</em>.</li>
                    <li>ISO. (2017). <em>ISO 11137 — Sterilization: Radiation</em>.</li>
                    <li>ISO. (2006). <em>ISO 17665 — Sterilization: Moist Heat</em>.</li>
                    <li>ISPE. (2023). <em>Baseline Guide for Medical Device Manufacturing</em>.</li>
                </ol>
            </S>

            <section className="space-y-3">
                <h2 className="text-sm font-semibold text-gray-500">See Also</h2>
                <div className="flex flex-wrap gap-2">
                    {[
                        { label: 'Healthcare Hub', href: '/wiki/healthcare', color: '#EC4899' },
                        { label: 'Biopharma Mfg', href: '/wiki/healthcare/biopharma-manufacturing', color: '#A855F7' },
                        { label: 'Semiconductor Fab', href: '/wiki/information-technology/semiconductor-fab', color: '#8B5CF6' },
                        { label: 'Critical Manufacturing', href: '/wiki/critical-manufacturing', color: '#F97316' },
                    ].map(l => (
                        <a key={l.href} href={l.href} className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-white/[0.04]" style={{ borderColor: `${l.color}30`, color: l.color }}>{l.label}</a>
                    ))}
                </div>
            </section>
        </div>
    );
}
