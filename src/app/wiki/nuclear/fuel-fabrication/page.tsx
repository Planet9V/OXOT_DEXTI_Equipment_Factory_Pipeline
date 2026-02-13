/**
 * Nuclear Fuel Fabrication Plant — Deep Dive Wiki Article.
 * @module wiki/nuclear/fuel-fabrication/page
 */
export const metadata = {
    title: 'Nuclear Fuel Fabrication Plant — Nuclear Wiki',
    description: 'TOGAF reference architecture for nuclear fuel fabrication: UO₂ pellet pressing, Zircaloy cladding, fuel assembly manufacture, and quality control.',
};

export default function FuelFabricationPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]" style={{ background: '#EF4444' }} />
                    <span className="text-xs font-mono text-gray-500">NUCL · NUCLEAR MATERIALS · FABRICATION</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">Nuclear Fuel Fabrication Plant</h1>
                <p className="text-sm text-gray-500 font-mono">UO₂ Pellets · Zircaloy Cladding · Fuel Assemblies</p>
                <p className="text-gray-400 text-base leading-relaxed max-w-3xl">
                    Nuclear fuel fabrication plants convert enriched UF₆ into UO₂ ceramic pellets, load them
                    into Zircaloy cladding tubes, and assemble finished fuel bundles for commercial reactors.
                    The U.S. has three NRC-licensed fabrication facilities producing ~2,000 tHM/yr (Westinghouse
                    Columbia, Global Nuclear Fuel Wilmington, Framatome Richland) regulated under 10 CFR Part 70
                    (NRC, 2024).
                </p>
            </div>

            <Section title="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-300 leading-relaxed">
                    Fuel fabrication business architecture bridges uranium enrichment and reactor operations,
                    requiring strict quality assurance (10 CFR 50 Appendix B), criticality safety controls,
                    and fuel performance qualification through licensing topical reports (The Open Group, 2022).
                </p>
                <h3 className="text-sm font-semibold text-white mt-6 mb-2">Stakeholders</h3>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside">
                    <li>NRC — licensing per 10 CFR 70, ISA, criticality safety</li>
                    <li>Fuel vendors (Westinghouse, GNF, Framatome) — manufacturers</li>
                    <li>Utility customers — fuel assembly procurement</li>
                    <li>IAEA — safeguards for LEU material accountancy</li>
                    <li>DOT — UF₆ and finished fuel assembly transportation</li>
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
                                ['10 CFR Part 70', 'SNM licensing, ISA, criticality safety'],
                                ['10 CFR 50 App B', 'Quality assurance for nuclear fuel'],
                                ['ASTM C776', 'Sintered UO₂ pellet specifications'],
                                ['ASTM B811', 'Zircaloy bar/tube specifications'],
                                ['ANSI/ANS 8 series', 'Nuclear criticality safety standards'],
                                ['10 CFR Part 71', 'Transportation of nuclear fuel assemblies'],
                            ].map(([s, sc]) => (
                                <tr key={s} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#EF4444] font-medium whitespace-nowrap">{s}</td>
                                    <td className="px-3 py-2 text-gray-400">{sc}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="2. High-Level Design" id="design">
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`  UF₆ (30B CYLINDER)                                    FINISHED FUEL ASSEMBLY
  3-5% U-235                                            TO REACTOR
       │                                                     ▲
       ▼                                                     │
  ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐
  │ ADU/IDR  │──►│ UO₂      │──►│ PELLET   │──►│ TUBE     │
  │ CONVER-  │   │ POWDER   │   │ PRESSING │   │ LOADING  │
  │ SION     │   │ BLENDING │   │ SINTERING│   │ WELDING  │
  └──────────┘   └──────────┘   └──────────┘   └──────────┘
       │              │              │              │
  HF Recovery    V-Blender     1700°C/H₂      He backfill
  NH₃ scrubber   Enrichment    95%TD target    TIG weld
                 verification  Grinding        Leak test
                                                    │
                                                    ▼
                                              ┌──────────┐
                                              │ ASSEMBLY  │
                                              │ CONSTRUCT │
                                              │ ─────────│
                                              │ Spacer    │
                                              │ grids     │
                                              │ Nozzles   │
                                              │ QC/QA     │
                                              └──────────┘`}</pre>
                </div>
            </Section>

            <Section title="3. Detailed Technical Description" id="technical">
                <h3 className="text-sm font-semibold text-white mb-2">3.1 UF₆ → UO₂ Conversion</h3>
                <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                    <li>ADU route: UF₆ + NH₄OH → (NH₄)₂U₂O₇ → calcine → UO₂</li>
                    <li>IDR route: UF₆ + H₂O + H₂ → UO₂F₂ → UO₂ (dry process)</li>
                    <li>HF byproduct recovered and recycled; off-gas scrubbed</li>
                    <li>Powder: 2–5 µm particle size, specific surface area 3–7 m²/g</li>
                </ul>
                <h3 className="text-sm font-semibold text-white mt-6 mb-2">3.2 Pellet Fabrication</h3>
                <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                    <li>Powder blending: V-blender, enrichment verification by gamma spectroscopy</li>
                    <li>Granulation: slugging or roll compaction, lubricant (zinc stearate)</li>
                    <li>Pressing: hydraulic press, ~300 MPa, green pellet ~10 mm dia. × 12 mm</li>
                    <li>Sintering: 1,700°C in H₂ atmosphere, 4–8 hrs, {`>`}95% theoretical density</li>
                    <li>Centerless grinding: ±0.013 mm diameter tolerance, surface finish {`<`}1.6 µm Ra</li>
                    <li>QC: dimensional (micrometer), density (immersion), enrichment (mass spec)</li>
                </ul>
                <h3 className="text-sm font-semibold text-white mt-6 mb-2">3.3 Rod &amp; Assembly Fabrication</h3>
                <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                    <li>Cladding: Zircaloy-4 or M5 alloy tubes, 9.5 mm OD, 0.57 mm wall</li>
                    <li>Loading: pellet stacking into tubes, spring + AlO₃ pellet spacers</li>
                    <li>Pressurization: He backfill at 2.5 MPa for thermal conductance</li>
                    <li>End cap welding: TIG, X-ray inspected, 100% He leak test ({`<`}10⁻⁷ std cc/s)</li>
                    <li>Assembly: 17×17 (PWR) or 10×10 (BWR) rod arrays, Inconel spacer grids</li>
                    <li>Final QC: visual, dimensional, rod-pull force, contamination survey</li>
                </ul>
            </Section>

            <Section title="4. Process Diagrams" id="process-diagrams">
                <h3 className="text-sm font-semibold text-white mb-2">Pellet Quality Control Flow</h3>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`  SINTERED PELLET
      │
      ├── Dimensional: Micrometer (±0.013 mm)
      ├── Density: Immersion method (>95% TD)
      ├── Enrichment: Mass spectrometry (±0.05%)
      ├── Visual: Surface defects, chipping
      ├── Moisture: Karl Fischer (<2 µg H₂O/g)
      │
      ▼
  ┌──────────────────────────────────────────┐
  │  PASS → Tube loading → Rod fabrication   │
  │  FAIL → Rework (re-grind) or reject bin  │
  └──────────────────────────────────────────┘`}</pre>
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
                                ['ADU/IDR Conversion Line', 'UF₆ → UO₂, HF recovery', '1–2'],
                                ['V-Blenders', 'Powder blending, enrichment control', '2–4'],
                                ['Hydraulic Pellet Press', '~300 MPa, 10 mm dia. die', '4–8'],
                                ['Sintering Furnaces', 'H₂ atmosphere, 1,700°C, batch/continuous', '2–6'],
                                ['Centerless Grinders', '±0.013 mm tolerance', '4–8'],
                                ['Pellet QC Stations', 'Micrometer, immersion density, gamma spec', '4–8'],
                                ['Zircaloy Tube Stock', '9.5 mm OD, 0.57 mm wall, 4 m lengths', '100K+ units/yr'],
                                ['Pellet Loading Machines', 'Automated stacking, spring insertion', '4–8'],
                                ['TIG Weld Stations', 'End cap welding, X-ray inspection', '4–8'],
                                ['He Leak Testers', 'Mass spectrometer, <10⁻⁷ std cc/s', '2–4'],
                                ['Assembly Construction Jigs', 'Spacer grid, nozzle attachment', '2–4'],
                                ['Mass Spectrometer (TIMS)', 'U-235 enrichment verification', '1–2'],
                                ['Criticality Alarm System', 'Gamma/neutron detectors, audible alert', '20+'],
                                ['Scrap Recovery System', 'UO₂ recycle, dissolution, re-processing', '1'],
                                ['HVAC/Confinement', 'Negative pressure, HEPA, room class 10,000', '1 system'],
                            ].map(([e, s, q]) => (
                                <tr key={e} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#EF4444] font-medium whitespace-nowrap">{e}</td>
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
                                ['L0', 'Furnace temp/atmosphere sensors, press tonnage, grinder RPM', 'Analog 4-20 mA, encoder pulses'],
                                ['L1', 'PLC/DCS for conversion, pressing, sintering line control', 'Batch recipes, interlocks, sequence control'],
                                ['L2', 'HMI/SCADA for each process area, QC data collection', 'OPC UA, SQL, barcode pellet tracking'],
                                ['L3', 'MES (Manufacturing Execution), MC&A, lot tracking', 'Batch genealogy, enrichment traceability'],
                                ['L3.5', 'Firewall + DMZ, NRC/IAEA reporting gateway', 'Outbound only egress for material accountancy'],
                                ['L4', 'ERP (SAP/Oracle), NRC reporting, customer orders', 'Encrypted VPN, NRC eSubmit'],
                            ].map(([l, c, f]) => (
                                <tr key={l} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#EF4444] font-mono font-medium">{l}</td>
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
                                ['Criticality Safety', 'ANSI/ANS 8: geometry & mass controls, batch size limits, double contingency'],
                                ['UF₆/HF Protection', 'HF scrubbers, emergency ventilation, self-contained breathing apparatus'],
                                ['Confinement', 'HEPA ventilation, continuous air monitors, negative pressure rooms'],
                                ['Fire Protection', 'H₂ atmosphere furnaces: Ar/N₂ inerting, spark detection'],
                                ['Rad. Control', '10 CFR 20 ALARA, bioassay, TLDs, area monitoring, contamination surveys'],
                                ['Physical Security', '10 CFR 73 for SNM, access controls, perimeter security'],
                            ].map(([s, sp]) => (
                                <tr key={s} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#EF4444] font-medium whitespace-nowrap">{s}</td>
                                    <td className="px-3 py-2 text-gray-400">{sp}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="8. Communication Protocol Stack" id="protocols">
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`Process I&C:   4-20 mA, Modbus RTU, PLC/DCS hardwired interlocks
SCADA/MES:     OPC UA, Ethernet (isolated process network)
QC Systems:    SQL databases, barcode/RFID pellet-to-rod tracking
MC&A:          Enrichment verification, material balance, NRC/IAEA
Enterprise:    NRC eSubmit, encrypted VPN, customer portals`}</pre>
                </div>
            </Section>

            <Section title="9. Data Flow Architecture" id="data-flow">
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`  ENTERPRISE (L4)    NRC · IAEA · Customer Orders · ERP
        │ Firewall + DMZ (L3.5)
  MES (L3)           Lot Tracking · MC&A · QA Records · Scheduling
        │ OPC UA
  SCADA (L2)         Process HMIs · QC Data Collection · Alarms
        │ Modbus TCP/RTU
  CONTROL (L1)       Conversion · Press · Sinter · Grind PLCs
        │ 4-20 mA / Encoder
  PROCESS (L0)       Furnace · Press · Grinder · Welder Sensors`}</pre>
                </div>
            </Section>

            <Section title="10. References" id="references">
                <div className="space-y-2 text-xs text-gray-400 leading-relaxed">
                    <p>ASTM International. (2019). <em>ASTM C776: Standard for Sintered UO₂ Pellets</em>. West Conshohocken, PA.</p>
                    <p>IAEA. (2015). <em>Nuclear Fuel Cycle Information System (NFCIS)</em>. Vienna: IAEA.</p>
                    <p>The Open Group. (2022). <em>TOGAF Standard, Version 10</em>. The Open Group.</p>
                    <p>U.S. NRC. (2024). <em>NUREG-1350: Information Digest</em>. Washington, DC: NRC.</p>
                    <p>U.S. NRC. (2020). <em>NUREG-1520: Standard Review Plan for Fuel Cycle Facilities</em>. Washington, DC.</p>
                    <p>Westinghouse Electric. (2022). <em>Next Generation Fuel Technical Summary</em>. Columbia, SC.</p>
                    <p>World Nuclear Association. (2024). <em>Fuel Fabrication</em>. WNA.</p>
                </div>
            </Section>

            <Section title="See Also" id="see-also">
                <div className="flex flex-wrap gap-2">
                    {[
                        { href: '/wiki/nuclear', label: 'Nuclear Hub', color: '#10B981' },
                        { href: '/wiki/nuclear/enrichment', label: 'Enrichment', color: '#F59E0B' },
                        { href: '/wiki/nuclear/pwr-plant', label: 'PWR Plant', color: '#10B981' },
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
