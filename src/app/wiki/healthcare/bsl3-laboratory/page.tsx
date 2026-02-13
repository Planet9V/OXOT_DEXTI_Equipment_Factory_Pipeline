/**
 * BSL-3 Biocontainment Laboratory — Deep-Dive Reference Architecture.
 *
 * 5 000 sq ft BSL-3 facility for Risk Group 3 pathogen research and
 * diagnostics with negative-pressure containment, HEPA exhaust, Class II/III
 * biosafety cabinets, chemical showers, and select agent security under
 * CDC/USDA 42 CFR 73 and BMBL 6th edition.
 *
 * @module wiki/healthcare/bsl3-laboratory/page
 */

export const metadata = {
    title: 'BSL-3 Biocontainment Lab Reference Architecture — Healthcare Wiki',
    description: 'BSL-3 lab: 22-row BOM, HEPA exhaust, negative-pressure cascades, select agent security, BMBL 6th ed., Purdue model.',
};

const C = '#10B981';

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
    ['Class II/III BSC', 'HEPA-filtered primary containment cabinet', '8–10', 'Type A2 / B2'],
    ['Pass-Through Autoclave', 'Double-door, for materials and waste', '2', '100 L chamber'],
    ['Chemical Shower', 'Full-body decontamination station', '2', 'Timed cycle'],
    ['BIBO HEPA Housing', 'Bag-in/bag-out, supply + exhaust', '12–16', 'H14, DOP testable'],
    ['Redundant Exhaust Fan', 'Variable speed, 100% exhaust, N+1', '4', '10 000 cfm total'],
    ['Pressure Differential Sensor', 'SCADA-integrated, continuous monitoring', '20+', '−25 to −75 Pa'],
    ['Anteroom Airlock', 'Interlocking doors, view panels', '4', 'PPE donning/doffing'],
    ['Biometric Access Controller', 'Fingerprint/PIN, select agent', '10', '42 CFR 73 compliant'],
    ['CCTV Camera', 'High-res, IR, containment zone coverage', '30', '24/7 recording'],
    ['Eyewash/Safety Shower', 'Pendant-mounted, ANSI Z358.1', '6', '20 min flow, tempered'],
    ['Emergency Generator', 'UPS-backed, auto-start, N+1', '1+1', '200 kW'],
    ['SCADA/BMS Panel', 'Airflow, pressure, HEPA integrity monitoring', '2', 'BACnet/IP'],
    ['Sealed Centrifuge', 'HEPA-vented rotor chamber', '4', 'BSL-3 rated'],
    ['PPE Storage Cabinet', 'Tyvek suits, PAPR respirators, gloves', '8', 'Anteroom lockers'],
    ['Handwashing Sink', 'Hands-free, anteroom and lab', '6', 'Per BMBL'],
    ['Vapor-Tight Light Fixture', 'Surface-mounted, emergency backup', '50+', 'Sealed, cleanable'],
    ['Vacuum Trap + HEPA', 'Lab vacuum line protection', '10', 'In-line filtration'],
    ['Effluent Decontamination Unit', 'Liquid waste treatment, heat/chemical', '1–2', 'If risk-assessed'],
    ['VHP Decon Chamber', 'Vaporized H₂O₂, room decontamination', '1', 'Whole-room cycle'],
    ['Duress Alarm Button', 'Throughout containment zones', '15', 'Wired to security'],
    ['Intercom System', 'Zone communication, hands-free', '10', 'Anteroom ↔ lab'],
    ['Lab Casework/Benches', 'Seamless, coved, chemical-resistant', '200 LF', 'Decontaminable'],
];

const PURDUE: string[][] = [
    ['L4 Enterprise', 'Regulatory reporting (CDC select agents), institutional EH&S', 'REST, HTTPS'],
    ['L3.5 DMZ', 'SCADA gateway, protocol firewall, select agent DB interface', 'TLS 1.3, VPN'],
    ['L3 Operations', 'LIMS (sample tracking), select agent inventory/security DB', 'SQL, RFID/barcode'],
    ['L2 Supervisory', 'BMS/SCADA — pressure cascades, HEPA status, ACH monitoring', 'BACnet/IP, Modbus/TCP'],
    ['L1 Control', 'PLCs for exhaust fans, dampers, airlock interlocks', 'BACnet MS/TP, Modbus RTU'],
    ['L0 Process', 'BSCs, autoclaves, centrifuges, VHP generators', 'Physical containment'],
];

export default function BSL3LaboratoryPage() {
    return (
        <div className="max-w-5xl space-y-12">
            <header className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                    <div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]" style={{ background: C }} />
                    <span className="text-xs font-mono text-gray-500">HEAL · Laboratories · HLTH-LB-BSL3</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">BSL-3 Biocontainment Laboratory</h1>
                <p className="text-sm text-gray-400 max-w-3xl">5 000 sq ft high-containment facility for Risk Group 3 pathogen research — negative-pressure cascades, HEPA exhaust, select agent security, chemical showers.</p>
            </header>

            <S title="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-400 leading-relaxed">BSL-3 labs support <span style={{ color: C }} className="font-medium">pathogen research</span>, <span style={{ color: C }} className="font-medium">diagnostic testing</span>, <span style={{ color: C }} className="font-medium">vaccine development</span>, <span style={{ color: C }} className="font-medium">biodefense</span>, and <span style={{ color: C }} className="font-medium">pandemic preparedness</span>. Stakeholders: public health labs, CDC, NIH, USAMRIID, university research facilities, and WHO.</p>
                <T headers={['Standard', 'Scope']} rows={[
                    ['CDC/USDA Select Agent Regulations (42 CFR 73)', 'Registration, security, transfer, notification for select agents/toxins'],
                    ['NIH Guidelines (rDNA)', 'Research involving recombinant or synthetic nucleic acid molecules'],
                    ['BMBL 6th Edition', 'Biosafety in microbiological and biomedical laboratories — containment levels'],
                    ['ANSI/AIHA Z9.14', 'Testing and performance verification of ventilation systems in BSL-3 labs'],
                    ['ASHRAE 170', 'Healthcare facility ventilation — applicable to BSL-3 in healthcare settings'],
                    ['NFPA 45', 'Fire protection for laboratories using chemicals'],
                ]} />
            </S>

            <S title="2. High-Level Design" id="design">
                <p className="text-sm text-gray-400 leading-relaxed">Containment zones follow unidirectional &quot;clean-to-dirty&quot; flow: clean corridors (personnel entry) → anterooms/airlocks (PPE donning) → primary containment labs (BSCs) → dirty corridors (waste exit). Negative pressure cascades from −25 Pa (corridors) to −75 Pa (lab core) with 100% single-pass HEPA exhaust.</p>
                <Pre>{`┌──────────────────────────────────────────────────────────────────────────┐
│                    BSL-3 CONTAINMENT FACILITY                           │
│                                                                         │
│  CLEAN SIDE                 │  CONTAINMENT BARRIER  │  DIRTY SIDE      │
│                             │                       │                   │
│  ┌──────────┐   ┌──────────┤                       │   ┌─────────────┐│
│  │ Clean    │──▶│Anteroom  │   ┌─────────────┐     │   │ Dirty       ││
│  │ Corridor │   │ (PPE on) │──▶│  PRIMARY    │──▶──│──▶│ Corridor    ││
│  │          │   │ Handwash │   │  LAB ZONE   │     │   │ (Waste Out) ││
│  └──────────┘   └──────────┤   │  BSCs, bench│     │   └──────┬──────┘│
│                             │   │  centrifuge │     │          │       │
│  ┌──────────┐              │   └──────┬──────┘     │          │       │
│  │ Admin /  │              │          │            │          ▼       │
│  │ Office   │              │          ▼            │   ┌─────────────┐│
│  │ (No      │              │   ┌──────────────┐    │   │ Autoclave   ││
│  │ contain.)│              │   │Chemical Shower│   │   │ (Waste out) ││
│  └──────────┘              │   └──────────────┘    │   └─────────────┘│
│                             │                       │                   │
│  Pressure: Ambient         │  −25 Pa  │  −50 Pa    │  −75 Pa (Lab)    │
│                              HEPA Supply   100% HEPA Exhaust            │
└──────────────────────────────────────────────────────────────────────────┘`}</Pre>
            </S>

            <S title="3. Detailed Technical Description" id="technical">
                <h3 className="text-sm font-semibold text-white">3.1 Primary Containment</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Class II Type A2 or B2 BSCs (HEPA-filtered, 0.3 m/s inflow). Sealed centrifuges with HEPA-vented rotor chambers. All aerosol-generating procedures inside BSCs. Primary containment barrier: BSC → lab room → anteroom → corridor.</p>

                <h3 className="text-sm font-semibold text-white mt-6">3.2 HVAC / Airflow</h3>
                <p className="text-sm text-gray-400 leading-relaxed">100% single-pass exhaust at 6–12 ACH. Bag-in/bag-out (BIBO) HEPA filters on supply and exhaust (DOP-testable in place). Redundant exhaust fans (N+1, auto-failover). Continuous pressure differential monitoring via SCADA (−25 to −75 Pa cascade). Vacuum lines include HEPA traps.</p>

                <h3 className="text-sm font-semibold text-white mt-6">3.3 Decontamination</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Pass-through autoclaves (double-door, gravity or prevacuum, 121 °C/30 min). Chemical showers (full-body, timed cycle). VHP (vaporized hydrogen peroxide) for room decontamination. Liquid effluent treatment (heat or chemical inactivation, if risk-assessed). Biohazardous waste stored in designated carts for autoclave exit.</p>

                <h3 className="text-sm font-semibold text-white mt-6">3.4 Security</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Biometric/PIN access (42 CFR 73 select agent). Interlocking doors (prevent simultaneous opening). CCTV surveillance (30+ cameras, 24/7 recording). Duress alarms. Select agent inventory tracked in dedicated database with suitability assessments.</p>

                <h3 className="text-sm font-semibold text-white mt-6">3.5 Utilities</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Emergency power (UPS + generator, auto-start). SCADA/BMS for real-time monitoring of pressure differentials, HEPA integrity, ACH rates. Lab gases (N₂, CO₂) stored outside containment with piped supply. Surface-mounted vapor-tight lighting with emergency backup.</p>
            </S>

            <S title="4. Process Diagrams" id="process">
                <h3 className="text-sm font-semibold text-white">4.1 Personnel Entry/Exit Protocol</h3>
                <Pre>{`Entry:
  Badge/Biometric ──▶ Clean Corridor ──▶ Anteroom ──▶ PPE On
       │                                     │         (Tyvek, PAPR,
       │                                     │          double gloves)
       ▼                                     ▼
  CCTV Logged              Airlock (interlocking) ──▶ Lab Zone

Exit:
  Lab Zone ──▶ Chemical Shower (if required) ──▶ Anteroom ──▶ PPE Off
       │                                              │
       ▼                                              ▼
  Handwash ──▶ Clean Corridor ──▶ Badge Out ──▶ CCTV Logged`}</Pre>

                <h3 className="text-sm font-semibold text-white mt-6">4.2 Waste Stream</h3>
                <Pre>{`Solid Biohazard ──▶ Red Bag ──▶ Autoclave (Double-Door) ──▶ Facility Waste
                                                              │
Liquid Waste ──▶ Effluent Tank ──▶ Heat/Chemical Decon ──▶ Drain Verified
                                                              │
Sharps ──▶ Puncture-Proof Container ──▶ Autoclave ──▶ ───────┘`}</Pre>

                <h3 className="text-sm font-semibold text-white mt-6">4.3 Airflow Cascade</h3>
                <Pre>{`Outside Air ──▶ HEPA Supply ──▶ Clean Corridor (+0 Pa ref.)
                                      │
                                      ▼
                              Anteroom (−25 Pa)
                                      │
                                      ▼
                              Lab Zone (−50 to −75 Pa)
                                      │
                                      ▼
                              HEPA Exhaust (100%) ──▶ Atmosphere
                              (BIBO, DOP-tested, redundant fans)`}</Pre>
            </S>

            <S title="5. Bill of Materials — 5 000 sq ft BSL-3" id="bom">
                <T headers={['Equipment', 'Specification', 'Qty', 'Type']} rows={BOM} />
            </S>

            <S title="6. Purdue Model Mapping" id="purdue">
                <T headers={['Level', 'Components', 'Protocols']} rows={PURDUE} />
            </S>

            <S title="7. Safety & Biosecurity" id="safety">
                <T headers={['Hazard', 'Control', 'Standard']} rows={[
                    ['Aerosol Exposure', 'BSCs, PAPR, sealed centrifuges, HEPA exhaust', 'BMBL 6th ed., BSL-3'],
                    ['Percutaneous Injury', 'Blunt-tip needles, sharps protocol, exposure reporting', 'OSHA BBP 1910.1030'],
                    ['Spill Response', 'Absorbent + disinfectant, 30-min contact, perimeter control', 'Institutional SOP'],
                    ['Select Agent Theft/Loss', 'Biometric access, CCTV, inventory reconciliation, FBI vetting', '42 CFR 73'],
                    ['HVAC Failure', 'Redundant fans, auto-failover, SCADA alarm, lab evacuation SOP', 'ANSI Z9.14'],
                    ['Room Decontamination', 'VHP cycle (> 400 ppm, 4 h), biological indicator validation', 'BMBL Appendix B'],
                ]} />
            </S>

            <S title="8. Containment Specifications" id="containment">
                <T headers={['Parameter', 'BSL-3 Requirement', 'Measurement']} rows={[
                    ['Pressure Differential', '−50 to −75 Pa (lab vs. corridor)', 'Continuous SCADA mon.'],
                    ['Air Changes', '6–12 ACH, 100% exhaust', 'Balometer quarterly'],
                    ['HEPA Efficiency', '99.99% at 0.3 µm MPPS', 'DOP/PAO annual test'],
                    ['Autoclave Validation', '121 °C / 30 min, BI (G. stearotherm.)', 'Per cycle'],
                    ['BSC Certification', 'Annual NSF/ANSI 49', 'Accredited certifier'],
                    ['Personnel Training', 'Biosafety, select agent, emergency response', 'Annual recertification'],
                ]} />
            </S>

            <S title="9. Data Flow Architecture" id="dataflow">
                <Pre>{`┌─ Tier 0: Containment ─────────────────────────────────────────────────┐
│  BSCs, autoclaves, centrifuges, HEPA fans, VHP generators             │
│  Physical containment — no direct IT connectivity at this tier        │
└──────────────────────────────┬────────────────────────────────────────┘
                               ▼
┌─ Tier 1: Sensing ─────────────────────────────────────────────────────┐
│  Pressure differential sensors, airflow monitors, door contacts       │
│  Polling: 1 s   │  Points: ~500 analog + 200 digital                │
└──────────────────────────────┬────────────────────────────────────────┘
                               ▼
┌─ Tier 2: BMS/SCADA ──────────────────────────────────────────────────┐
│  BACnet/IP controllers, alarm management, HEPA integrity trending     │
│  Data: Real-time pressure cascades, ACH, fan speed, door status      │
└──────────────────────────────┬────────────────────────────────────────┘
                               ▼
┌─ Tier 3: Operations ─────────────────────────────────────────────────┐
│  LIMS (sample tracking), select agent inventory DB, incident mgmt     │
│  Integration: RFID barcode for sample/material tracking              │
└──────────────────────────────┬────────────────────────────────────────┘
                               ▼
┌─ Tier 4: Enterprise / Regulatory ────────────────────────────────────┐
│  CDC SARS (Select Agent Registration System), institutional EH&S      │
│  Protocol: HTTPS / VPN  │  Cadence: Event-driven + annual report    │
└──────────────────────────────────────────────────────────────────────┘`}</Pre>
            </S>

            <S title="10. References" id="references">
                <ol className="list-decimal list-inside space-y-1 text-xs text-gray-400">
                    <li>CDC/NIH. (2020). <em>Biosafety in Microbiological and Biomedical Laboratories (BMBL)</em>, 6th ed.</li>
                    <li>CDC/APHIS. (2023). 42 CFR Part 73: Select Agent Regulations.</li>
                    <li>ANSI/AIHA. (2015). <em>Z9.14: Testing and Performance Verification of BSL-3 Ventilation Systems</em>.</li>
                    <li>DOE. (2014). <em>BSL-3 Design Phase — Laboratory Design</em>. OSTI-1142837.</li>
                    <li>UC Office of the President. (2025). <em>BSL-3 Laboratory Design Standards</em>, final ed.</li>
                    <li>BWBR Architects. (2025). Biosafety by design: Addressing demand for BSL-3 laboratories.</li>
                    <li>NIH ORF. (2014). BSL-3 Planning Part 1: The Barrier.</li>
                    <li>NSF/ANSI. (2020). <em>Standard 49: Biosafety Cabinetry</em>.</li>
                </ol>
            </S>

            <section className="space-y-3">
                <h2 className="text-sm font-semibold text-gray-500">See Also</h2>
                <div className="flex flex-wrap gap-2">
                    {[
                        { label: 'Healthcare Hub', href: '/wiki/healthcare', color: '#EC4899' },
                        { label: 'Clinical Diagnostic Lab', href: '/wiki/healthcare/clinical-lab', color: '#3B82F6' },
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
