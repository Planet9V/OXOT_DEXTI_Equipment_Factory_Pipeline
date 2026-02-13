/**
 * Acute Care Hospital — Deep-Dive Reference Architecture.
 *
 * 400-bed full-service acute care facility with ED, surgical suites, ICUs,
 * med/surg floors, imaging, laboratory, pharmacy, and central plant utilities.
 * NFPA 99 essential electrical system, ASHRAE 170 ventilation, medical gas
 * systems, BACnet/IP BMS, HL7 FHIR EMR integration, and DICOM imaging.
 *
 * @module wiki/healthcare/acute-care-hospital/page
 */

export const metadata = {
    title: 'Acute Care Hospital Reference Architecture — Healthcare Wiki',
    description: '400-bed acute care hospital: TOGAF architecture, 21-row BOM, Purdue model, NFPA 99 essential electrical, ASHRAE 170 HVAC, medical gas systems.',
};

const C = '#EC4899';

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
    ['Centrifugal Chiller', 'Water-cooled, magnetic bearing, 0.55 kW/ton', '2–3', '800 ton'],
    ['Hot Water Boiler', 'Fire-tube, natural gas, 180 °F return', '3–4', '1 000 MBH'],
    ['Cooling Tower', 'Induced-draft, fiberglass basin', '2', '1 000 ton'],
    ['Emergency Generator', 'Diesel, liquid-cooled, NFPA 110 Type 1', '2', '2 MWe'],
    ['UPS Module', 'Online double-conversion', '4–8', '500 kVA, 10 min'],
    ['ATS (Essential)', '4-pole, closed-transition, 10-sec', '12–20', '4 000 A'],
    ['Medical Air Compressor', 'Duplex scroll, oil-free, NFPA 99 Grade 1', '2', '100 scfm'],
    ['O₂ Bulk Manifold', 'Liquid, auto-switchover', '1', '50 psi / 10 000 scfh'],
    ['Vacuum Pump', 'Duplex liquid-ring', '2', '500 acfm / −14 inHg'],
    ['WAGD Pump', 'Dedicated exhaust scavenge', '1', '100 acfm'],
    ['AHU (OR / ICU)', 'DOAS with HEPA, VFD', '20–30', '20 000 cfm, 15 ACH'],
    ['VAV Terminal', 'Pressure-independent, hot-water reheat', '500–600', '1 000 cfm max'],
    ['Fire Pump', 'Diesel-driven, NFPA 20', '1', '1 500 GPM / 100 psi'],
    ['Nurse Call Master', 'IP-based, wireless pendants, UL 1069', '20–25', '400 stations'],
    ['Pneumatic Tube Station', '6″ carrier, bi-directional', '50–60', '2 000 ft/min'],
    ['RTLS Tag', 'BLE active RFID', '5 000', '100 m range'],
    ['BMS Controller', 'BACnet/IP, LonWorks hybrid', '50', 'DDC'],
    ['Chilled Water Pump', 'VFD centrifugal, primary/secondary', '6', '500 GPM / 100 ft'],
    ['Boiler Feed Pump', 'Multistage, duplex', '4', '200 GPM / 200 ft'],
    ['Medical Gas Alarm Panel', 'Zone master/slave, NFPA 99', '10', 'Per zone'],
    ['Switchgear', '13.8 kV / 480 V main distribution', '2–4', '4 000 A'],
];

const PURDUE: string[][] = [
    ['L4 Enterprise', 'EMR (Epic/Cerner), ERP, supply chain, revenue cycle', 'HL7 FHIR, REST, TCP/IP'],
    ['L3.5 DMZ', 'DICOM gateway, HL7 interface engine, protocol firewall', 'TLS 1.3, next-gen FW'],
    ['L3 Operations', 'BMS head-end, nurse call server, RTLS engine, pharmacy robot', 'BACnet/IP, HL7 v2'],
    ['L2 Supervisory', 'BACnet SCADA, medical gas alarm panels, fire alarm FACP', 'BACnet, Modbus/TCP'],
    ['L1 Control', 'PLC (HVAC, medical gas manifold, elevator), VFDs', 'Modbus RTU, BACnet MS/TP'],
    ['L0 Process', 'Infusion pumps, ventilators, patient monitors, imaging (CT/MRI)', 'DICOM, IEEE 11073'],
];

export default function AcuteCareHospitalPage() {
    return (
        <div className="max-w-5xl space-y-12">
            <header className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                    <div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]" style={{ background: C }} />
                    <span className="text-xs font-mono text-gray-500">HEAL · Direct Patient Care · HLTH-DC-HOSP</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">Acute Care Hospital</h1>
                <p className="text-sm text-gray-400 max-w-3xl">400-bed full-service facility — ED, surgical suites, ICUs, imaging, laboratory, pharmacy, and central plant with NFPA 99 essential electrical system.</p>
            </header>

            {/* 1 */}
            <S title="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-400 leading-relaxed">Key stakeholders include <span style={{ color: C }} className="font-medium">hospital administration</span> (strategic oversight), <span style={{ color: C }} className="font-medium">physicians & nursing</span> (clinical decision-making), <span style={{ color: C }} className="font-medium">CMS / Joint Commission</span> (accreditation), <span style={{ color: C }} className="font-medium">state DOH</span> (licensure), <span style={{ color: C }} className="font-medium">OSHA</span> (workplace safety), and <span style={{ color: C }} className="font-medium">EPA</span> (environmental compliance).</p>
                <T headers={['Standard', 'Scope']} rows={[
                    ['42 CFR 482 (CMS CoP)', 'Hospital certification — patient rights, quality, infection control'],
                    ['Joint Commission', 'Performance improvement, environment of care, medication management'],
                    ['NFPA 99 / NFPA 101', 'Health care facilities code — essential electrical, medical gas, life safety'],
                    ['ASHRAE 170', 'Ventilation — minimum ACH, pressure relationships, filtration'],
                    ['FGI Guidelines', 'Hospital design — functional program, room sizes, adjacencies'],
                    ['HIPAA / HITECH', 'PHI privacy, breach notification, security rule'],
                    ['ADA', 'Physical accessibility — ramps, signage, exam rooms'],
                ]} />
            </S>

            {/* 2 */}
            <S title="2. High-Level Design" id="design">
                <p className="text-sm text-gray-400 leading-relaxed">A 400-bed acute care hospital is organized into clinical, support, and utility zones. The NFPA 99 essential electrical system provides three branches — life safety (emergency lighting, exits), critical (ORs, ICUs), and equipment (general support) — each with 10-second automatic transfer via ATS.</p>
                <Pre>{`┌──────────────────────────────────────────────────────────────────────────┐
│                         ACUTE CARE HOSPITAL                               │
│                                                                          │
│  ┌─────┐   ┌─────────┐   ┌──────┐   ┌──────────┐   ┌───────────────┐  │
│  │ ED  │──▶│ Imaging │──▶│ Lab  │──▶│ Pharmacy │──▶│  Med/Surg     │  │
│  │     │   │ CT·MRI  │   │      │   │          │   │  Floors       │  │
│  └──┬──┘   └────┬────┘   └──┬───┘   └────┬─────┘   └───────┬───────┘  │
│     │           │           │            │                  │          │
│     ▼           ▼           ▼            ▼                  ▼          │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │                    CENTRAL PLANT                                │  │
│  │  Boilers · Chillers · Cooling Towers · Generators · UPS · Gas  │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                       │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────────────┐  │
│  │OR Suite│  │  ICU   │  │  NICU  │  │ L&D    │  │  Rehab / Step  │  │
│  │15 ACH  │  │ 6 ACH  │  │ 6 ACH  │  │ 6 ACH  │  │  Down         │  │
│  └────────┘  └────────┘  └────────┘  └────────┘  └────────────────┘  │
└──────────────────────────────────────────────────────────────────────────┘`}</Pre>
            </S>

            {/* 3 */}
            <S title="3. Detailed Technical Description" id="technical">
                <h3 className="text-sm font-semibold text-white">3.1 Central Plant</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Houses N+1 redundant utility generation: 3–4 fire-tube boilers (1 000 MBH each, 180 °F hot water return), 2–3 centrifugal chillers (800-ton, magnetic bearing, 0.55 kW/ton), 2 induced-draft cooling towers (1 000-ton), and primary/secondary chilled water distribution with VFD pumps (500 GPM, 100 ft head).</p>

                <h3 className="text-sm font-semibold text-white mt-6">3.2 HVAC — ASHRAE 170</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Operating rooms require 15 ACH minimum with positive pressure (+0.01 in. w.g.); ICUs require 6 ACH neutral; airborne infection isolation (AII) rooms operate at −2.5 Pa (12 ACH, 100% exhaust, HEPA return). All systems use 100% outside air with energy recovery wheels and VAV terminals with hot-water reheat.</p>

                <h3 className="text-sm font-semibold text-white mt-6">3.3 Medical Gas Systems — NFPA 99</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Oxygen (99% purity, 50 psi, bulk liquid with auto-switchover), medical air (NFPA 99 Grade 1, duplex scroll compressors, 100 scfm), vacuum (−14 inHg, duplex liquid-ring pumps), nitrous oxide (50 psi), and waste anesthetic gas disposal (WAGD). Zone valve boxes with master/slave alarm panels at each nursing station.</p>

                <h3 className="text-sm font-semibold text-white mt-6">3.4 Electrical Distribution — NFPA 99/110</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Normal power at 13.8 kV from dual utility feeds, stepped down to 480 V via main distribution switchgear. Essential electrical system (EES): 2× 2 MW diesel generators (NFPA 110, Level 1, 48-hr fuel), 10-second ATS transfer for life safety and critical branches. UPS modules (500 kVA, 10-min bridge) for OR integration and imaging.</p>

                <h3 className="text-sm font-semibold text-white mt-6">3.5 Clinical Systems</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Nurse call (UL 1069, IP-based with wireless pendants), RTLS (BLE tags for asset/patient tracking), pneumatic tube system (6″ carriers, 50–60 stations, 2 000 ft/min), and BMS/BAS (BACnet/IP, 50+ DDC controllers) for integrated facility monitoring.</p>
            </S>

            {/* 4 */}
            <S title="4. Process Diagrams" id="process">
                <h3 className="text-sm font-semibold text-white">4.1 Patient Flow</h3>
                <Pre>{`Ambulance/Walk-in ──▶ ED Triage ──▶ Assessment ──▶ ┬──▶ Admit (Med/Surg)
                                                       ├──▶ OR Suite ──▶ PACU ──▶ ICU/Floor
                                                       ├──▶ Imaging (CT/MRI/XR)
                                                       └──▶ Discharge`}</Pre>

                <h3 className="text-sm font-semibold text-white mt-6">4.2 Essential Electrical System</h3>
                <Pre>{`Utility 13.8 kV (Dual Feed)
       │
       ▼
  Main Switchgear 480 V ──────────────────────────────────────────────
       │                    │                    │                    │
       ▼                    ▼                    ▼                    ▼
  Normal Power         Life Safety           Critical Branch      Equipment
  (General loads)    (ATS 10-sec)          (ATS 10-sec)          (ATS delayed)
                    ┌─────────────┐       ┌─────────────┐
                    │ Exit Signs  │       │ OR Lighting  │
                    │ Egress Lgts │       │ ICU Monitors │
                    │ Fire Alarm  │       │ Med Gas Alm  │
                    └─────────────┘       │ Nurse Call   │
                          ▲               └─────┬───────┘
                          │                     │
                    ┌─────┴─────────────────────┴───────┐
                    │     2× 2 MW Diesel Generators     │
                    │     NFPA 110 Level 1, 48-hr fuel  │
                    └───────────────────────────────────┘`}</Pre>

                <h3 className="text-sm font-semibold text-white mt-6">4.3 Medical Gas Distribution</h3>
                <Pre>{`Bulk O₂ Tank ──▶ Manifold ──▶ Main Riser ──▶ Zone Valve Box ──▶ Outlet (OR/ICU/Floor)
                     │                               │
Med Air Comp  ──────┘                          Alarm Panel ──▶ Nurse Station
                                                    │
Vacuum Pump   ──▶ Manifold ──▶ Main Riser ──▶ Zone Valve ──▶ Outlet
WAGD Pump     ──▶ Exhaust to Atmosphere`}</Pre>
            </S>

            {/* 5 */}
            <S title="5. Bill of Materials — 400-Bed Hospital" id="bom">
                <T headers={['Equipment', 'Specification', 'Qty', 'Rating']} rows={BOM} />
            </S>

            {/* 6 */}
            <S title="6. Purdue Model Mapping" id="purdue">
                <T headers={['Level', 'Components', 'Protocols']} rows={PURDUE} />
                <p className="text-xs text-gray-500 italic">Aligned with IEC 62443 zones and conduits for healthcare OT/IT convergence.</p>
            </S>

            {/* 7 */}
            <S title="7. Supporting Systems" id="supporting">
                <T headers={['System', 'Description', 'Specification']} rows={[
                    ['Fire Alarm', 'Addressable FACP, smoke/heat detectors, sprinkler flow', 'NFPA 72, 1% annual drift test'],
                    ['Sprinkler', 'Quick-response heads; preaction in ORs & MRI', 'NFPA 13, 0.10 GPM/sq ft'],
                    ['Smoke Control', 'Stair/elevator pressurization, exhaust fans', 'NFPA 92'],
                    ['Code Blue', 'Audio/visual alarm, crash cart RTLS tracking', `UL 1069, < 4 min response`],
                    ['Mass Notification', 'IP speakers, text integration, overhead page', 'UL 2572'],
                    ['Physical Security', 'Infant/elopement RTLS, panic buttons, CCTV', 'IAHSS guidelines'],
                ]} />
            </S>

            {/* 8 */}
            <S title="8. Medical Gas & Utility Systems" id="utilities">
                <T headers={['Medium', 'System', 'Specification']} rows={[
                    ['Oxygen (O₂)', 'Bulk liquid, auto-switchover manifold', '50 psi, 99% purity, 10 000 scfh'],
                    ['Medical Air', 'Duplex scroll compressor, NFPA 99 Grade 1', '50 psi, 100 scfm, 99.5% purity'],
                    ['Vacuum', 'Duplex liquid-ring pumps', '−14 inHg, 500 acfm'],
                    ['Nitrous Oxide', 'Cylinder manifold', '50 psi, OR suites only'],
                    ['WAGD', 'Dedicated exhaust pump to atmosphere', '100 acfm'],
                    ['Domestic Hot Water', 'Central plant, recirculating loop', '140 °F, Legionella prevention'],
                ]} />
            </S>

            {/* 9 */}
            <S title="9. Data Flow Architecture" id="dataflow">
                <Pre>{`┌─ Tier 0 ─────────────────────────────────────────────────────────────┐
│  Bedside: Infusion pumps, ventilators, SpO₂ monitors               │
│  Polling: 1–5 sec (IEEE 11073, HL7 FHIR Observation)               │
│  Data Points: ~50 000 clinical parameters                           │
└──────────────────────────────┬────────────────────────────────────────┘
                               ▼
┌─ Tier 1 ─────────────────────────────────────────────────────────────┐
│  Edge: BMS controllers (BACnet COV), nurse call servers, FACP       │
│  Polling: 5–60 sec   │  Points: ~25 000 building parameters        │
└──────────────────────────────┬────────────────────────────────────────┘
                               ▼
┌─ Tier 2 ─────────────────────────────────────────────────────────────┐
│  Clinical DMZ: HL7 interface engine, DICOM router, PACS             │
│  Data: ADT, ORU, ORM messages, imaging studies (DICOM)              │
└──────────────────────────────┬────────────────────────────────────────┘
                               ▼
┌─ Tier 3 ─────────────────────────────────────────────────────────────┐
│  Enterprise: EMR (Epic/Cerner), ERP, supply chain, analytics        │
│  Integration: HL7 FHIR R4, REST APIs, cloud analytics               │
└──────────────────────────────────────────────────────────────────────┘`}</Pre>
            </S>

            {/* 10 */}
            <S title="10. References" id="references">
                <ol className="list-decimal list-inside space-y-1 text-xs text-gray-400">
                    <li>CMS. (2023). 42 CFR Part 482: Conditions of Participation for Hospitals.</li>
                    <li>Joint Commission. (2024). <em>Hospital Accreditation Standards</em>.</li>
                    <li>NFPA. (2021). <em>NFPA 99: Health Care Facilities Code</em>.</li>
                    <li>NFPA. (2021). <em>NFPA 110: Standard for Emergency and Standby Power Systems</em>.</li>
                    <li>ASHRAE. (2021). <em>ANSI/ASHRAE/ASHE Standard 170-2021</em>.</li>
                    <li>FGI. (2022). <em>Guidelines for Design and Construction of Hospitals</em>.</li>
                    <li>NFPA. (2022). <em>NFPA 72: National Fire Alarm and Signaling Code</em>.</li>
                    <li>ISA. (2019). <em>ISA-95 / IEC 62264</em>.</li>
                </ol>
            </S>

            <section className="space-y-3">
                <h2 className="text-sm font-semibold text-gray-500">See Also</h2>
                <div className="flex flex-wrap gap-2">
                    {[
                        { label: 'Healthcare Hub', href: '/wiki/healthcare', color: C },
                        { label: 'BSL-3 Laboratory', href: '/wiki/healthcare/bsl3-laboratory', color: '#10B981' },
                        { label: 'Clinical Diagnostic Lab', href: '/wiki/healthcare/clinical-lab', color: '#3B82F6' },
                        { label: 'DEXPI Equipment Classes', href: '/wiki/dexpi/equipment', color: '#8B5CF6' },
                    ].map(l => (
                        <a key={l.href} href={l.href} className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-white/[0.04]" style={{ borderColor: `${l.color}30`, color: l.color }}>{l.label}</a>
                    ))}
                </div>
            </section>
        </div>
    );
}
