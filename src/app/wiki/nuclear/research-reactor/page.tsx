/**
 * Pool-Type Research Reactor — Deep Dive Wiki Article.
 * @module wiki/nuclear/research-reactor/page
 */
export const metadata = {
    title: 'Pool-Type Research Reactor — Nuclear Wiki',
    description: 'TOGAF reference architecture for pool-type research reactors: TRIGA/MTR fuel, beam ports, isotope production, and neutron science.',
};

export default function ResearchReactorPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]" style={{ background: '#8B5CF6' }} />
                    <span className="text-xs font-mono text-gray-500">NUCL · RESEARCH REACTORS · POOL-TYPE</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">Pool-Type Research Reactor</h1>
                <p className="text-sm text-gray-500 font-mono">1 – 20 MWth · TRIGA &amp; MTR Plate-Type</p>
                <p className="text-gray-400 text-base leading-relaxed max-w-3xl">
                    Pool-type research reactors support neutron science, medical isotope production (Mo-99/Tc-99m),
                    neutron activation analysis (NAA), and materials irradiation testing. The open-pool design
                    provides inherent safety through passive cooling and direct visual observation of the core.
                    The U.S. operates 31 research and test reactors across university and national laboratory
                    settings (NRC, 2024).
                </p>
            </div>

            <Section title="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-300 leading-relaxed">
                    Research reactor business architecture centers on multi-mission neutron services:
                    beam experiments, isotope production, NAA, and academic training. Regulated under
                    10 CFR Part 50 for non-power reactors with ANSI/ANS-15 series standards governing
                    development and testing reactor operations (The Open Group, 2022).
                </p>
                <h3 className="text-sm font-semibold text-white mt-6 mb-2">Stakeholders</h3>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside">
                    <li>NRC — licensing per 10 CFR Part 50 (non-power reactor class)</li>
                    <li>DOE/NNSA — funding, fuel supply, security oversight</li>
                    <li>University reactor programs — academic training, research</li>
                    <li>Medical isotope firms (SHINE, Nordion) — Mo-99 supply chain</li>
                    <li>National labs (INL, ORNL) — NSUF neutron user facilities</li>
                </ul>
                <h3 className="text-sm font-semibold text-white mt-6 mb-2">Regulatory Framework</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead><tr className="border-b border-white/[0.08] text-gray-500">
                            <th className="text-left px-3 py-2 font-medium">Standard</th>
                            <th className="text-left px-3 py-2 font-medium">Scope</th>
                        </tr></thead>
                        <tbody>
                            {[
                                ['10 CFR Part 50', 'Non-power reactor licensing, technical specifications'],
                                ['NUREG-1537', 'Guidelines for research reactor design, operation, license renewal'],
                                ['ANSI/ANS-15.1', 'Development and testing reactor standards'],
                                ['10 CFR Part 73', 'Physical protection for SNM at research reactors'],
                                ['10 CFR Part 20', 'Radiation protection, ALARA, dose limits'],
                            ].map(([s, sc]) => (
                                <tr key={s} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#8B5CF6] font-medium whitespace-nowrap">{s}</td>
                                    <td className="px-3 py-2 text-gray-400">{sc}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="2. High-Level Design" id="design">
                <p className="text-sm text-gray-300 leading-relaxed">
                    Pool-type reactors feature a light water pool (5–8 m deep, 100–110 m³ volume) housing
                    the core submerged 6–8 m below surface for radiation shielding. Architectures include
                    TRIGA (cylindrical U-ZrH fuel, self-moderating, pulse-capable) and MTR plate-type
                    (U₃Si₂-Al plates, 15–20 elements) designs.
                </p>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto mt-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`  ┌──────────────────────────────────────────────────────────┐
  │                    REACTOR POOL                          │
  │               (5–8 m deep, 100 m³)                       │
  │                                                          │
  │    ┌───────────────────────┐     ┌──────────────┐        │
  │    │  BEAM PORTS (4–8)     │     │  PNEUMATIC   │        │
  │    │  Radial + Tangential  │     │  TRANSFER    │        │
  │    │  Thermal column       │     │  (Rabbits)   │        │
  │    └───────────┬───────────┘     └──────┬───────┘        │
  │                │                        │                │
  │    ┌───────────┴───────────────────────┴─────┐          │
  │    │         REACTOR CORE                     │          │
  │    │    TRIGA: 60-100 U-ZrH rods              │          │
  │    │    MTR:   15-20 plate elements (9×5)      │          │
  │    │    4 control rods (Hf/B₄C)               │          │
  │    └──────────────────────────────────────────┘          │
  │                        │  6–8 m water shielding          │
  │    ┌──────────────────┴────────────┐                    │
  │    │  AUXILIARY FUEL STORAGE RACKS  │                    │
  │    └───────────────────────────────┘                    │
  └──────────────────────────────────────────────────────────┘
              │                              │
  ┌───────────┴──────────┐    ┌──────────────┴───────────┐
  │  PRIMARY COOLING     │    │  HOT CELLS               │
  │  Pumps: 1,400 GPM    │    │  Lead-glass windows      │
  │  HX → secondary loop │    │  Remote manipulators     │
  │  Ion exchangers      │    │  Isotope processing      │
  └──────────────────────┘    └──────────────────────────┘`}</pre>
                </div>
            </Section>

            <Section title="3. Detailed Technical Description" id="technical">
                <h3 className="text-sm font-semibold text-white mb-2">3.1 Reactor Core &amp; Pool</h3>
                <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                    <li>TRIGA: 60–100 U-ZrH cylindrical rods, 37 mm dia., 722 mm long, Al/SS clad</li>
                    <li>MTR: 15–20 plate elements, U₃Si₂-Al, 18 plates/element, 9×5 grid lattice</li>
                    <li>Fuel enrichment: 19.75 wt% U-235 (LEU, post-RERTR conversion)</li>
                    <li>Control rods: 4× (2 regulating, 2 shutdown), Hf or B₄C absorber</li>
                    <li>Pool water: demineralized, {`>`}0.2 MΩ-cm resistivity, 15–40°C</li>
                    <li>Thermal flux: 10¹³–10¹⁵ n/cm²·s (depending on power level)</li>
                </ul>
                <h3 className="text-sm font-semibold text-white mt-6 mb-2">3.2 Cooling &amp; Water Treatment</h3>
                <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                    <li>Natural convection at {`<`}100 kW; forced above 100 kW</li>
                    <li>Primary pumps: 1,400 GPM minimum flow, scram on {`<`}1,400 GPM</li>
                    <li>Heat exchangers: plate type, primary-to-secondary, stainless steel</li>
                    <li>Ion exchangers/demineralizers: mixed-bed resin, maintain {`>`}0.2 MΩ-cm</li>
                    <li>Pool temperature scram: {`>`}108°F (safety setpoint)</li>
                </ul>
                <h3 className="text-sm font-semibold text-white mt-6 mb-2">3.3 Beam &amp; Irradiation Facilities</h3>
                <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                    <li>Beam ports: 4–8 radial/tangential, 0.5–5&quot; diameter, lead/poly plugs</li>
                    <li>Thermal column: graphite moderator for spectrum tailoring</li>
                    <li>Pneumatic transfer: hydraulic rabbits for in-core irradiation</li>
                    <li>Cold source (optional): liquid H₂/D₂ for cold neutron beams</li>
                </ul>
                <h3 className="text-sm font-semibold text-white mt-6 mb-2">3.4 Isotope Production</h3>
                <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                    <li>Mo-99 via U-235 fission targets or NAA routes at 10¹⁴ n/cm²·s</li>
                    <li>Hot cells: lead-glass windows, teleoperated manipulators, 10–20 ft reach</li>
                    <li>Shielded gloveboxes: Pb-lined, HEPA-vented for separation chemistry</li>
                    <li>Transport casks: Type A/B for Mo-99/Tc-99m generator distribution</li>
                </ul>
            </Section>

            <Section title="4. Process Diagrams" id="process-diagrams">
                <h3 className="text-sm font-semibold text-white mb-2">Isotope Production Workflow</h3>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`  TARGET FABRICATION          IN-CORE IRRADIATION          POST-IRRADIATION
  ┌──────────────┐      ┌──────────────────┐      ┌──────────────────┐
  │ LEU target   │──►   │ Pneumatic rabbit │──►   │ Hot Cell         │
  │ capsules     │      │ or static pos.   │      │ Processing       │
  │ (U-Al alloy) │      │ 10¹⁴ n/cm²·s    │      │ (Dissolution,    │
  └──────────────┘      │ 3–7 day cycle    │      │  Separation,     │
                        └──────────────────┘      │  Purification)   │
                                                  └────────┬─────────┘
                                                           │
                        ┌──────────────────┐      ┌────────┴─────────┐
                        │ Tc-99m Generator │◄──── │ Mo-99 Product    │
                        │ (Hospital)       │      │ Type A/B Cask    │
                        └──────────────────┘      └──────────────────┘`}</pre>
                </div>
            </Section>

            <Section title="5. Bill of Materials" id="bom">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead><tr className="border-b border-white/[0.08] text-gray-500">
                            <th className="text-left px-3 py-2 font-medium">Equipment</th>
                            <th className="text-left px-3 py-2 font-medium">Specification</th>
                            <th className="text-left px-3 py-2 font-medium">Qty</th>
                        </tr></thead>
                        <tbody>
                            {[
                                ['TRIGA Fuel Assemblies', 'U-ZrH rods, 37 mm dia., Al/SS clad', '60–100'],
                                ['MTR Plate Elements', 'U₃Si₂-Al, 18 plates/element', '15–20'],
                                ['Control Rods', 'Hf/B₄C absorber, magnetic latch drive', '4'],
                                ['Pool Recirculation Pumps', 'Centrifugal, forced convection', '2'],
                                ['Plate Heat Exchangers', 'SS primary-to-secondary', '2'],
                                ['Ion Exchangers', 'Mixed-bed resin, >0.2 MΩ-cm', '2–4'],
                                ['Beam Port Plugs/Shutters', 'Lead/polyethylene, motorized', '4–8'],
                                ['Pneumatic Transfer System', 'He-driven rabbits, 0.5–2" dia.', '1–3'],
                                ['Hot Cell Manipulators', 'Teleoperated, 10–20 ft reach', '2–4'],
                                ['Shielded Gloveboxes', 'Pb-lined, HEPA-vented', '2–6'],
                                ['Fuel Storage Racks', 'Aluminum, pool-submerged', '2–4'],
                                ['Pool Water Level Sensors', '>24.25 ft above core required', '4+'],
                                ['Radiation Area Monitors', 'Gamma, 20 mrem/hr alarm', '10+'],
                                ['Transport Casks', 'Type A/B, Mo-99/Tc-99m', '2–4'],
                                ['Core Grid Lattice', 'Aluminum, 9×5 (MTR)', '1'],
                                ['Scram Solenoid Valves', 'Control rod release', '4'],
                                ['Neutron Detectors', 'Fission chambers, log/period channels', '4–6'],
                                ['Ventilation/Confinement', 'HEPA fans, negative pressure', '1 system'],
                            ].map(([e, s, q]) => (
                                <tr key={e} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#8B5CF6] font-medium whitespace-nowrap">{e}</td>
                                    <td className="px-3 py-2 text-gray-400">{s}</td>
                                    <td className="px-3 py-2 text-gray-400">{q}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="6. Purdue Model / ISA-95 Mapping" id="purdue">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead><tr className="border-b border-white/[0.08] text-gray-500">
                            <th className="text-left px-3 py-2 font-medium">Level</th>
                            <th className="text-left px-3 py-2 font-medium">Components</th>
                            <th className="text-left px-3 py-2 font-medium">Functions</th>
                        </tr></thead>
                        <tbody>
                            {[
                                ['L0', 'Pool sensors, neutron detectors, flow/level/temp', 'Hardwired 4-20 mA, pulse counting'],
                                ['L1', 'Console instrumentation, RPS scram channels, experiment I/F', 'Log power, period, flow scram (2-of-3)'],
                                ['L2', 'Reactor console/HMI, RPS interlocks, power/period display', 'Independent scrams, manual trip'],
                                ['L3', 'Experiment scheduling, irradiation tracking, rad. records', 'Ethernet/PLC for dynamic experiments'],
                                ['L3.5', 'Air gap or data diode (facility dependent)', 'Minimal external connectivity'],
                                ['L4', 'DOE/NRC reporting, university administrative', 'ERP, regulatory submittal'],
                            ].map(([l, c, f]) => (
                                <tr key={l} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#8B5CF6] font-mono font-medium">{l}</td>
                                    <td className="px-3 py-2 text-gray-400">{c}</td>
                                    <td className="px-3 py-2 text-gray-400">{f}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="7. Safety & Supporting Systems" id="supporting">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead><tr className="border-b border-white/[0.08] text-gray-500">
                            <th className="text-left px-3 py-2 font-medium">System</th>
                            <th className="text-left px-3 py-2 font-medium">Specification</th>
                        </tr></thead>
                        <tbody>
                            {[
                                ['Reactor Protection (RPS)', '2-of-3 log/period channels; scram on period <3s, power >115%, flow <1,400 GPM, pool level <24.25 ft, temp >108°F'],
                                ['Pool Interlocks', 'Level/temp sensors prohibit rod withdrawal; startup count >2 cps required'],
                                ['Confinement', 'HEPA ventilation at negative pressure; stack monitors (RAMs >20 mrem/hr rundown)'],
                                ['Physical Security', '10 CFR Part 73 for SNM; access controls, barriers, intrusion detection'],
                                ['Natural Convection Fallback', 'Passive decay heat removal — pool thermal mass provides days of cooling'],
                                ['Emergency Power', 'Battery backup for RPS and radiation monitoring; EDG optional'],
                                ['Pool Covering', 'Removable grating for refueling; shielding plugs for beam ports'],
                            ].map(([s, sp]) => (
                                <tr key={s} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#8B5CF6] font-medium whitespace-nowrap">{s}</td>
                                    <td className="px-3 py-2 text-gray-400">{sp}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="8. Communication Protocol Stack" id="protocols">
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`Safety I&C:    Hardwired 4-20 mA + 120 VAC discrete
               Analog log/period instrumentation (no digital RPS)
Experiments:   Ethernet/PLC for beam port shutters, pneumatic shuttles
Data Acq.:     RS-232/485 for neutron counters, gamma spectrometers
Admin:         University network (air-gapped from reactor I&C)
Reporting:     NRC eSubmit for annual reports, Tech Spec changes`}</pre>
                </div>
            </Section>

            <Section title="9. Data Flow Architecture" id="data-flow">
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`  UNIVERSITY/DOE (L4)    NRC Reports · DOE Fuel Tracking · Admin
        │ Air Gap (L3.5)
  SCHEDULING (L3)        Experiment Queue · Irradiation Logs · Rad Records
        │ Ethernet (isolated)
  CONSOLE (L2)           Reactor Console HMI · Power/Period Display · SPDS
        │ Hardwired signal conditioning
  INSTRUMENTATION (L1)   Log Power · Period · Flow · Level · Temp Channels
        │ 4-20 mA / Pulse
  PROCESS (L0)           Core · Pool · Beam Ports · Pneumatic Tubes`}</pre>
                </div>
            </Section>

            <Section title="10. References" id="references">
                <div className="space-y-2 text-xs text-gray-400 leading-relaxed">
                    <p>American Nuclear Society. (2022). <em>Pool Reactors: An Introduction</em>. ANS.</p>
                    <p>Idaho National Laboratory. (2023). <em>NSUF Reactors — User Facility Capabilities</em>. INL.</p>
                    <p>IAEA. (2016). <em>Safety of Research Reactors (SSR-3)</em>. Vienna: IAEA.</p>
                    <p>The Open Group. (2022). <em>TOGAF Standard, Version 10</em>. The Open Group.</p>
                    <p>U.S. NRC. (1996). <em>NUREG-1537: Guidelines for Research Reactor Design</em>. Washington, DC: NRC.</p>
                    <p>U.S. NRC. (2014). <em>UMass Lowell Research Reactor Technical Specifications (ML14136A069)</em>. NRC.</p>
                    <p>U.S. NRC. (2024). <em>NUREG-1350: Information Digest</em>. Washington, DC: NRC.</p>
                    <p>World Nuclear Association. (2024). <em>Research Reactors</em>. WNA.</p>
                </div>
            </Section>

            <Section title="See Also" id="see-also">
                <div className="flex flex-wrap gap-2">
                    {[
                        { href: '/wiki/nuclear', label: 'Nuclear Hub', color: '#10B981' },
                        { href: '/wiki/nuclear/pwr-plant', label: 'PWR Plant', color: '#10B981' },
                        { href: '/wiki/nuclear/enrichment', label: 'Enrichment Facility', color: '#F59E0B' },
                        { href: '/wiki/sectors/NUCL', label: 'NUCL Overview', color: '#10B981' },
                    ].map((l) => (
                        <a key={l.href} href={l.href} className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-white/[0.04]" style={{ borderColor: `${l.color}30`, color: l.color }}>{l.label} →</a>
                    ))}
                </div>
            </Section>
        </div>
    );
}

function Section({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
    return (<section id={id} className="space-y-4"><h2 className="text-xl font-heading font-semibold text-white">{title}</h2>{children}</section>);
}
