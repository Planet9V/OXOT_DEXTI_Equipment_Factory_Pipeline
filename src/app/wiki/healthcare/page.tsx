/**
 * Healthcare and Public Health Sector Reference Architecture — Wiki Hub Page.
 *
 * Comprehensive overview of the CISA Healthcare and Public Health Sector
 * critical infrastructure, serving as the entry point to 6 detailed
 * facility-type articles covering acute care hospitals, biopharma
 * manufacturing, blood processing, medical device manufacturing,
 * BSL-3 laboratories, and clinical diagnostic laboratories.
 *
 * Based on TOGAF Architecture Development Method (ADM) with cross-references
 * to ASHRAE 170, NFPA 99/101, FDA 21 CFR, ISO 14644, and BMBL.
 *
 * @module wiki/healthcare/page
 */

import HealthcareStepSection from './HealthcareStepSection';

export const metadata = {
    title: 'Healthcare & Public Health Sector Reference Architecture — Wiki',
    description:
        'TOGAF-based reference architectures for 6 healthcare facility types: Acute Care Hospital, Biopharma Manufacturing, Blood Processing, Medical Device Mfg, BSL-3 Lab, Clinical Diagnostic Lab.',
};

/** Facility type cards with routing. */
const FACILITY_ARTICLES = [
    {
        title: 'Acute Care Hospital',
        subtitle: '400-Bed Full-Service',
        href: '/wiki/healthcare/acute-care-hospital',
        icon: '🏥',
        color: '#EC4899',
        description:
            'ED, surgical suites, ICUs, med/surg floors, imaging, lab, pharmacy, and central plant with NFPA 99 essential electrical system.',
        tags: ['ASHRAE 170', 'NFPA 99', 'BACnet', 'HL7 FHIR', 'DICOM'],
    },
    {
        title: 'Biopharma Manufacturing',
        subtitle: 'cGMP Biologics (2000 L)',
        href: '/wiki/healthcare/biopharma-manufacturing',
        icon: '🧬',
        color: '#A855F7',
        description:
            'Upstream cell culture, downstream purification, aseptic fill/finish in ISO 5-8 cleanrooms under FDA 21 CFR 211/600.',
        tags: ['ICH Q7-Q10', 'GAMP 5', 'ISA-88', 'DeltaV DCS'],
    },
    {
        title: 'Blood Processing Center',
        subtitle: '200 K Units / Year',
        href: '/wiki/healthcare/blood-processing',
        icon: '🩸',
        color: '#EF4444',
        description:
            'Whole blood/apheresis collection, centrifugal component separation, NAT/serology testing, cold chain storage, and ISBT 128 distribution.',
        tags: ['21 CFR 606', 'AABB', 'ISBT 128', 'HL7'],
    },
    {
        title: 'Medical Device Mfg',
        subtitle: 'ISO 13485 Cleanroom',
        href: '/wiki/healthcare/medical-device-mfg',
        icon: '⚕️',
        color: '#F97316',
        description:
            'Injection molding, CNC machining, EtO/gamma sterilization, and 100% inspection for Class II/III devices under FDA QSR.',
        tags: ['ISO 13485', '21 CFR 820', 'ISO 14971', 'UDI'],
    },
    {
        title: 'BSL-3 Biocontainment Lab',
        subtitle: '5 000 sq ft Containment',
        href: '/wiki/healthcare/bsl3-laboratory',
        icon: '🦠',
        color: '#10B981',
        description:
            'Negative-pressure containment with HEPA exhaust, Class II/III BSCs, chemical showers, and select agent security for Risk Group 3 pathogens.',
        tags: ['BMBL 6th ed.', '42 CFR 73', 'ANSI Z9.14', 'BACnet'],
    },
    {
        title: 'Clinical Diagnostic Lab',
        subtitle: '50 K Tests / Day',
        href: '/wiki/healthcare/clinical-lab',
        icon: '🔬',
        color: '#3B82F6',
        description:
            'Total laboratory automation (TLA) track, chemistry/hematology/molecular analyzers, MALDI-TOF microbiology, and LIS middleware.',
        tags: ['CLIA', 'CAP', 'ISO 15189', 'HL7 FHIR', 'ASTM LIS01'],
    },
];

const C = '#EC4899';

/** Reusable section wrapper. */
function S({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
    return (
        <section id={id} className="space-y-4 scroll-mt-8">
            <h2 className="text-xl font-heading font-semibold text-white">{title}</h2>
            {children}
        </section>
    );
}

/** Pre-formatted monospace block. */
function Pre({ children }: { children: string }) {
    return (
        <div
            className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
            style={{ background: 'rgba(255,255,255,0.02)' }}
        >
            <pre className="whitespace-pre leading-relaxed">{children}</pre>
        </div>
    );
}

/** Simple table renderer. */
function T({ headers, rows }: { headers: string[]; rows: string[][] }) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
                <thead>
                    <tr className="border-b border-white/[0.08] text-gray-500">
                        {headers.map((h) => (
                            <th key={h} className="text-left px-3 py-2 font-medium">
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((r, i) => (
                        <tr key={i} className="border-b border-white/[0.04]">
                            {r.map((cell, j) => (
                                <td
                                    key={j}
                                    className={
                                        j === 0
                                            ? `px-3 py-2 font-medium whitespace-nowrap`
                                            : 'px-3 py-2 text-gray-400'
                                    }
                                    style={j === 0 ? { color: C } : undefined}
                                >
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default function HealthcareHubPage() {
    return (
        <div className="max-w-7xl space-y-12">
            {/* 4-Step Sector Architecture Viewer */}
            <HealthcareStepSection />

            {/* Separator between step viewer and TOGAF reference */}
            <div className="border-t border-white/[0.06] pt-12">
                <h2 className="text-lg font-heading font-semibold text-gray-500 mb-8">
                    📖 Full TOGAF Reference Architecture
                </h2>
            </div>

            {/* ─── Header ─── */}
            <header className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                    <div
                        className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]"
                        style={{ background: C }}
                    />
                    <span className="text-xs font-mono text-gray-500">
                        CISA 12 · HEAL · Healthcare &amp; Public Health
                    </span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">
                    Healthcare &amp; Public Health Sector Reference Architecture
                </h1>
                <p className="text-sm text-gray-400 max-w-3xl leading-relaxed">
                    TOGAF-based reference architectures for six critical healthcare facility types —
                    from acute care delivery and biopharmaceutical manufacturing to biocontainment
                    research and high-throughput diagnostics. SRMA: Department of Health and Human
                    Services (HHS).
                </p>
            </header>

            {/* ─── 1. Executive Summary ─── */}
            <S title="1. Executive Summary" id="summary">
                <p className="text-sm text-gray-400 leading-relaxed">
                    The Healthcare and Public Health (HPH) sector encompasses direct patient care,
                    pharmaceutical and biotechnology manufacturing, blood supply chains, medical
                    device production, laboratory diagnostics, and health insurance systems. It
                    protects all Americans from health emergencies — whether infectious disease
                    outbreaks, supply chain disruptions, or cyber attacks on connected medical
                    devices. The sector is regulated by HHS, FDA, CMS, CDC, and state departments
                    of health, with accreditation bodies including The Joint Commission, CAP, and
                    AABB enforcing quality standards.
                </p>
                <p className="text-sm text-gray-400 leading-relaxed">
                    Modern healthcare infrastructure integrates operational technology (OT) for
                    building management, medical gas systems, and cleanroom environments with
                    information technology (IT) for electronic medical records, laboratory
                    information systems, and clinical decision support. The convergence of IT/OT
                    creates unique cybersecurity challenges addressed through the HHS 405(d)
                    framework, NIST CSF, and the Purdue model adapted for clinical environments.
                    Protocols span BACnet/IP for HVAC, HL7 FHIR for clinical data, DICOM for
                    imaging, and OPC UA for manufacturing — requiring rigorous network segmentation.
                </p>
                <p className="text-sm text-gray-400 leading-relaxed">
                    This hub provides a cross-facility reference architecture for six representative
                    HPH facility types, each with deep-dive articles covering TOGAF business
                    architecture, technical design, bills of materials, Purdue model mappings,
                    safety systems, and academic references.
                </p>
            </S>

            {/* ─── 2. Value Chain ─── */}
            <S title="2. Healthcare Value Chain" id="value-chain">
                <Pre>{`┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  R&D / Drug │───▶│Manufacturing│───▶│  Supply &   │───▶│  Clinical   │───▶│  Diagnostics│
│  Discovery  │    │ & Production│    │Distribution │    │  Delivery   │    │  & Surv.    │
│             │    │             │    │             │    │             │    │             │
│ BSL-3 Lab   │    │ Biopharma   │    │ Blood Proc. │    │ Acute Care  │    │Clinical Lab │
│ (Pathogens) │    │ Med Device  │    │ Cold Chain  │    │  Hospital   │    │ (Reference) │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                  │                  │                  │                  │
       ▼                  ▼                  ▼                  ▼                  ▼
  CDC / NIH          FDA cGMP          AABB / ISBT       CMS CoP / TJC      CLIA / CAP
  42 CFR 73       21 CFR 211/820       21 CFR 606        42 CFR 482        42 CFR 493`}</Pre>
            </S>

            {/* ─── 3. Methodology ─── */}
            <S title="3. Methodology & Frameworks" id="methodology">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                        { t: 'TOGAF ADM', d: 'Architecture Development Method — iterative planning, stakeholder alignment, capability mapping across all 6 facility types.' },
                        { t: 'Purdue Model / ISA-95', d: 'Five-level OT/IT hierarchy (L0 Process → L4 Enterprise) with L3.5 DMZ for clinical network segmentation.' },
                        { t: 'HHS 405(d) / NIST CSF', d: 'Health Industry Cybersecurity Practices (HICP) aligned with NIST Cybersecurity Framework for medical device and clinical system defense.' },
                        { t: 'ASHRAE 170 / NFPA 99', d: 'Ventilation of health care facilities and health care facilities code — governing ACH, pressure relationships, essential electrical, and medical gas systems.' },
                    ].map((m) => (
                        <div
                            key={m.t}
                            className="rounded-lg border border-white/[0.06] p-4 space-y-1"
                            style={{ background: 'rgba(236,72,153,0.04)' }}
                        >
                            <h3 className="text-sm font-semibold" style={{ color: C }}>{m.t}</h3>
                            <p className="text-xs text-gray-500 leading-relaxed">{m.d}</p>
                        </div>
                    ))}
                </div>
            </S>

            {/* ─── 4. Cross-Facility Purdue Model ─── */}
            <S title="4. Cross-Facility Purdue Model" id="purdue">
                <T
                    headers={['Level', 'Hospital', 'Biopharma', 'Blood Center', 'Med Device', 'BSL-3 Lab', 'Clinical Lab']}
                    rows={[
                        ['L4 Enterprise', 'ERP / EMR', 'SAP / LIMS', 'ERP / Demand', 'ERP / PLM', 'Reg Reporting', 'ERP / FHIR'],
                        ['L3.5 DMZ', 'DICOM GW / FW', 'Data Diode', 'BBIS GW', 'Data Diode', 'SCADA GW', 'LIS GW'],
                        ['L3 Operations', 'BMS / EMR', 'MES (Syncade)', 'BBIS / LIMS', 'MES / QMS', 'LIMS / Select Agent', 'LIS / Middleware'],
                        ['L2 Supervisory', 'BACnet SCADA', 'DeltaV DCS', 'PLC / HMI', 'SCADA / HMI', 'BMS SCADA', 'TLA Track PLC'],
                        ['L1 Control', 'PLC (HVAC/Gas)', 'PLC (Valves)', 'Centrifuge PLC', 'PLC (Press)', 'Fan / Damper PLC', 'Analyzer I/F'],
                        ['L0 Process', 'Medical Devices', 'Bioreactors', 'Centrifuges', 'Mold / CNC', 'BSCs / HEPA', 'Analyzers'],
                    ]}
                />
                <p className="text-xs text-gray-500 italic">
                    Adapted from ISA-95 / IEC 62443 for healthcare OT/IT convergence.
                </p>
            </S>

            {/* ─── 5. Protocol Stack ─── */}
            <S title="5. Communication Protocol Stack" id="protocols">
                <Pre>{`┌─────────────────────────────────────────────────────────────────────┐
│  APPLICATION    HL7 FHIR  │ DICOM  │ OPC UA │ ISBT 128 │ ASTM LIS │
├─────────────────────────────────────────────────────────────────────┤
│  TRANSPORT      TCP/TLS   │  TCP   │  TCP   │  TCP     │  RS-232  │
├─────────────────────────────────────────────────────────────────────┤
│  NETWORK        BACnet/IP │ Eth/IP │ EtherNet/IP │ Modbus TCP    │
├─────────────────────────────────────────────────────────────────────┤
│  PHYSICAL       1 GbE Cu  │ 10 GbE │ 25 GbE SFP │ 4-20 mA      │
└─────────────────────────────────────────────────────────────────────┘`}</Pre>
            </S>

            {/* ─── 6. Cybersecurity Architecture ─── */}
            <S title="6. Cybersecurity Architecture" id="cyber">
                <T
                    headers={['Zone', 'Assets', 'Controls']}
                    rows={[
                        ['Clinical DMZ', 'HL7 interface engines, DICOM gateways', 'Next-gen FW, protocol inspection, TLS mutual auth'],
                        ['Medical Device Network', 'Infusion pumps, ventilators, IoMT sensors', 'NAC 802.1X, micro-segmentation, MDS² profiles'],
                        ['Building Automation', 'BMS/BACnet controllers, HVAC, medical gas', 'Air-gapped OT VLAN, BACnet/SC encryption'],
                        ['Manufacturing OT', 'DCS/PLC, bioreactors, sterilizers, TLA tracks', 'Unidirectional gateway, IEC 62443 zones'],
                        ['Biocontainment', 'Pressure sensors, HEPA monitors, CCTV', 'Isolated SCADA, biometric access, select agent DB'],
                        ['Enterprise IT', 'EMR, ERP, LIMS, email, internet access', 'SIEM, EDR, HIPAA encryption, DLP'],
                    ]}
                />
            </S>

            {/* ─── 7. Facility Article Cards ─── */}
            <S title="7. Facility Deep-Dive Articles" id="facilities">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {FACILITY_ARTICLES.map((f) => (
                        <a
                            key={f.href}
                            href={f.href}
                            className="group rounded-xl border border-white/[0.06] p-5 space-y-2 transition-colors hover:border-white/[0.12]"
                            style={{ background: 'rgba(255,255,255,0.02)' }}
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">{f.icon}</span>
                                <div>
                                    <h3 className="text-sm font-semibold text-white group-hover:underline">
                                        {f.title}
                                    </h3>
                                    <span className="text-[10px] font-mono" style={{ color: f.color }}>
                                        {f.subtitle}
                                    </span>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed">{f.description}</p>
                            <div className="flex flex-wrap gap-1">
                                {f.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-[10px] px-1.5 py-0.5 rounded border"
                                        style={{ borderColor: `${f.color}30`, color: f.color }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </a>
                    ))}
                </div>
            </S>

            {/* ─── 8. References ─── */}
            <S title="8. References" id="references">
                <ol className="list-decimal list-inside space-y-1 text-xs text-gray-400">
                    <li>HHS. (2024). <em>Healthcare and Public Health Sector-Specific Plan</em>. U.S. Department of Health and Human Services.</li>
                    <li>CMS. (2023). 42 CFR Part 482: Conditions of Participation for Hospitals. <em>Centers for Medicare &amp; Medicaid Services</em>.</li>
                    <li>FDA. (2024). 21 CFR Parts 210/211/820: cGMP for Drugs and Devices. <em>U.S. Food and Drug Administration</em>.</li>
                    <li>ASHRAE. (2021). <em>ANSI/ASHRAE/ASHE Standard 170-2021: Ventilation of Health Care Facilities</em>.</li>
                    <li>NFPA. (2021). <em>NFPA 99: Health Care Facilities Code</em>. National Fire Protection Association.</li>
                    <li>CDC/NIH. (2020). <em>Biosafety in Microbiological and Biomedical Laboratories (BMBL)</em>, 6th ed.</li>
                    <li>ISO. (2015). <em>ISO 14644-1: Cleanrooms and Associated Controlled Environments — Part 1: Classification of Air Cleanliness</em>.</li>
                    <li>AABB. (2025). <em>Standards for Blood Banks and Transfusion Services</em>, 32nd ed.</li>
                    <li>ISA. (2019). <em>ISA-95 / IEC 62264: Enterprise-Control System Integration</em>.</li>
                    <li>NIST. (2023). <em>Cybersecurity Framework 2.0</em>. National Institute of Standards and Technology.</li>
                </ol>
            </S>

            {/* ─── See Also ─── */}
            <section className="space-y-3">
                <h2 className="text-sm font-semibold text-gray-500">See Also</h2>
                <div className="flex flex-wrap gap-2">
                    {[
                        { label: 'CISA Healthcare Sector', href: '/wiki/sectors/HLTH', color: C },
                        { label: 'Chemical Sector Hub', href: '/wiki/chemical', color: '#EF4444' },
                        { label: 'DEXPI Equipment Classes', href: '/wiki/dexpi/equipment', color: '#8B5CF6' },
                        { label: 'IT Sector Hub', href: '/wiki/information-technology', color: '#8B5CF6' },
                    ].map((l) => (
                        <a
                            key={l.href}
                            href={l.href}
                            className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-white/[0.04]"
                            style={{ borderColor: `${l.color}30`, color: l.color }}
                        >
                            {l.label}
                        </a>
                    ))}
                </div>
            </section>
        </div>
    );
}
