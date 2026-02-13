/**
 * Uranium Enrichment Facility — Deep Dive Wiki Article.
 * @module wiki/nuclear/enrichment/page
 */
export const metadata = {
    title: 'Uranium Enrichment Facility — Nuclear Wiki',
    description: 'TOGAF reference architecture for gas centrifuge uranium enrichment: cascade design, UF₆ handling, IAEA safeguards, criticality safety.',
};

export default function EnrichmentPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]" style={{ background: '#F59E0B' }} />
                    <span className="text-xs font-mono text-gray-500">NUCL · NUCLEAR MATERIALS · ENRICHMENT</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">Uranium Enrichment Facility</h1>
                <p className="text-sm text-gray-500 font-mono">Gas Centrifuge · 3–5% LEU Production</p>
                <p className="text-gray-400 text-base leading-relaxed max-w-3xl">
                    Gas centrifuge enrichment plants (GCEPs) separate uranium isotopes by spinning UF₆ gas at
                    high speed, concentrating U-235 from natural (0.7%) to low-enriched uranium (3–5%) for
                    commercial reactor fuel. Facilities operate under 10 CFR Part 70 with IAEA safeguards-by-design
                    for international verification of non-proliferation commitments (NRC, 2025).
                </p>
            </div>

            <Section title="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-300 leading-relaxed">
                    Enrichment facility business architecture integrates commercial fuel cycle operations
                    with stringent non-proliferation and safeguards requirements. The architecture must
                    accommodate both NRC domestic regulation and IAEA international verification, including
                    Design Information Questionnaires (DIQ) and Material Balance Areas (MBAs) established
                    during conceptual design (The Open Group, 2022).
                </p>
                <h3 className="text-sm font-semibold text-white mt-6 mb-2">Stakeholders</h3>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside">
                    <li>NRC — licensing per 10 CFR 70, ISA, criticality safety</li>
                    <li>IAEA — international safeguards, DIE/DIV, material accountancy</li>
                    <li>DOE/NNSA — national security, HEU disposition</li>
                    <li>Enrichment operators (Urenco USA, Orano, Centrus Energy)</li>
                    <li>Fuel fabricators — LEU product customers</li>
                    <li>State/local emergency agencies — UF₆ release planning</li>
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
                                ['10 CFR Part 70', 'Special nuclear material licensing, ISA, criticality safety'],
                                ['ANSI/ANS 8 series', 'Nuclear criticality safety — geometry, mass, moderation controls'],
                                ['10 CFR Part 74', 'Material control and accounting (MC&A) for SNM'],
                                ['IAEA INFCIRC/153', 'Comprehensive safeguards agreements — material accountancy'],
                                ['10 CFR 70.64', 'Baseline design criteria for new fuel cycle facilities'],
                                ['49 CFR 173', 'Transportation of UF₆ cylinders (DOT regulations)'],
                            ].map(([s, sc]) => (
                                <tr key={s} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#F59E0B] font-medium whitespace-nowrap">{s}</td>
                                    <td className="px-3 py-2 text-gray-400">{sc}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="2. High-Level Design" id="design">
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`  ┌────────────────────────────────────────────────────────────┐
  │                ENRICHMENT CASCADE HALL                     │
  │                                                            │
  │  UF₆ FEED              CASCADE STAGES              PRODUCT │
  │  (0.7% U-235)     ┌────────────────────┐      (3-5% U-235)│
  │  ┌──────────┐     │  ┌──┐ ┌──┐ ┌──┐  │      ┌──────────┐ │
  │  │ Feed     │────►│  │C1│→│C2│→│C3│  │─────►│ Product  │ │
  │  │ Station  │     │  └──┘ └──┘ └──┘  │      │ Station  │ │
  │  │ (48Y)    │     │  Enriching Section │      │ (30B)    │ │
  │  └──────────┘     │  ┌──┐ ┌──┐ ┌──┐  │      └──────────┘ │
  │                   │  │C1│→│C2│→│C3│  │                    │
  │                   │  └──┘ └──┘ └──┘  │      ┌──────────┐ │
  │                   │  Stripping Section │─────►│ Tails    │ │
  │                   └────────────────────┘      │ Station  │ │
  │                                               │ (48Y)    │ │
  │                                               │ 0.2-0.3% │ │
  │                                               └──────────┘ │
  │                                                            │
  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
  │  │ UF₆ SAMPLING │  │ NDA MONITORS │  │ IAEA C/S     │    │
  │  │ (DA)         │  │ (Header pipe)│  │ CAMERAS      │    │
  │  └──────────────┘  └──────────────┘  └──────────────┘    │
  └────────────────────────────────────────────────────────────┘
                    │                           │
       ┌────────────┴────────┐    ┌─────────────┴──────────┐
       │ CYLINDER STORAGE    │    │ VENTILATION / HF       │
       │ (Feed, Product,     │    │ SCRUBBING SYSTEM       │
       │  Tails UF₆)         │    │ Emergency response     │
       └─────────────────────┘    └────────────────────────┘`}</pre>
                </div>
            </Section>

            <Section title="3. Detailed Technical Description" id="technical">
                <h3 className="text-sm font-semibold text-white mb-2">3.1 Gas Centrifuge Cascade</h3>
                <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                    <li>Centrifuges: carbon fiber/maraging steel rotors, 50,000–70,000 RPM</li>
                    <li>Cascade: enriching + stripping sections, 10–20 stages for LEU</li>
                    <li>Separative Work: 3–5 SWU/yr per machine, 1,000+ machines per cascade</li>
                    <li>UF₆ feed: sublimated from 48Y cylinders at ~70°C, 100 torr</li>
                    <li>Product: desublimed into 30B cylinders (LEU, 3–5% U-235)</li>
                    <li>Tails: 0.2–0.3% U-235, stored in 48Y cylinders</li>
                </ul>
                <h3 className="text-sm font-semibold text-white mt-6 mb-2">3.2 UF₆ Feed &amp; Withdrawal</h3>
                <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                    <li>Feed autoclaves: heated enclosure for UF₆ sublimation from cylinders</li>
                    <li>Cold traps: desublimation of product/tails UF₆ into cylinders</li>
                    <li>Header pipe monitoring: NDA (CHEM/CEMO) for enrichment verification</li>
                    <li>Sampling stations: color-coded tubing for destructive analysis (DA)</li>
                </ul>
                <h3 className="text-sm font-semibold text-white mt-6 mb-2">3.3 Safeguards &amp; MC&amp;A</h3>
                <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                    <li>Material Balance Areas: cylinder storage as MBA-1, process as MBA-2</li>
                    <li>Key Measurement Points: feed, product, tails stations (mass + enrichment)</li>
                    <li>MUF/CUMUF: material unaccounted for within statistical limits</li>
                    <li>IAEA C/S: containment seals, surveillance cameras, portal monitors</li>
                    <li>DIE/DIV: design information examination during construction phases</li>
                </ul>
                <h3 className="text-sm font-semibold text-white mt-6 mb-2">3.4 Criticality Safety</h3>
                <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                    <li>ANSI/ANS 8 series: geometry control, mass limits, favorable geometry equipment</li>
                    <li>Double contingency principle: at least two unlikely, independent events required</li>
                    <li>UF₆ moderator exclusion: facility design prevents water ingress to process areas</li>
                </ul>
            </Section>

            <Section title="4. Process Diagrams" id="process-diagrams">
                <h3 className="text-sm font-semibold text-white mb-2">UF₆ Material Flow</h3>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`  48Y CYLINDER (Natural UF₆, 0.711% U-235)
      │
      ▼
  FEED AUTOCLAVE (Sublimation, ~70°C)
      │
      ▼
  FEED HEADER PIPE ──► NDA Monitor (enrichment verification)
      │
      ▼
  ┌──────────────────────────────────────┐
  │        GAS CENTRIFUGE CASCADE         │
  │  Enriching Section ──► Product Header │──► Cold Trap ──► 30B Cylinder
  │  Stripping Section ──► Tails Header   │──► Cold Trap ──► 48Y Cylinder
  └──────────────────────────────────────┘
      │
  SAMPLING (DA) at each Key Measurement Point
      │
  MC&A DATABASE  ──►  NRC Reports + IAEA SIR`}</pre>
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
                                ['Gas Centrifuges', 'Carbon fiber/maraging steel rotor, 50-70K RPM', '1,000–10,000+'],
                                ['Cascade Piping', 'Monel/SS, favorable geometry', 'Km-scale'],
                                ['Feed Autoclaves', 'Heated enclosure for UF₆ sublimation', '4–8'],
                                ['Cold Traps (Product)', 'Desublimation of LEU UF₆', '4–8'],
                                ['Cold Traps (Tails)', 'Desublimation of depleted UF₆', '4–8'],
                                ['48Y Cylinders (Feed/Tails)', 'Standard UF₆ transport cylinder, 12.5 t', '100+'],
                                ['30B Cylinders (Product)', 'LEU product cylinder, 2.3 t', '50+'],
                                ['NDA Header Monitors', 'CHEM/CEMO enrichment measurement', '6–12'],
                                ['Accountancy Scales', 'Mass determination, ±50g accuracy', '4–8'],
                                ['IAEA Surveillance Cameras', 'Containment/surveillance system', '20+'],
                                ['Portal Monitors', 'UF₆ cylinder movement detection', '4–8'],
                                ['DA Sampling Stations', 'Color-coded tubing, mass spectroscopy', '6–12'],
                                ['HF Scrubbers', 'Emergency UF₆ release mitigation', '2–4'],
                                ['Criticality Alarm System', 'Gamma/neutron area monitors', '20+'],
                                ['HVAC/Ventilation', 'Cascade hall negative pressure, HEPA', '1 system'],
                                ['UPS/Emergency Power', 'Battery + diesel for safety systems', '1 system'],
                            ].map(([e, s, q]) => (
                                <tr key={e} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#F59E0B] font-medium whitespace-nowrap">{e}</td>
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
                                ['L0', 'UF₆ flow meters, pressure/temp sensors, NDA monitors', 'Analog/digital instrumentation'],
                                ['L1', 'Cascade PLCs, centrifuge vibration monitoring, valve control', 'Modbus RTU, hardwired interlocks'],
                                ['L2', 'Cascade SCADA/HMI, criticality alarm panel', 'Process visualization, alarm management'],
                                ['L3', 'MC&A database, production scheduling, maintenance mgmt', 'SQL, OPC UA, batch tracking'],
                                ['L3.5', 'Firewall + data diode, IAEA/NRC gateway', 'Outbound only for safeguards reporting'],
                                ['L4', 'NRC reporting, IAEA SIR, corporate ERP', 'Encrypted VPN, NRC eSubmit'],
                            ].map(([l, c, f]) => (
                                <tr key={l} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#F59E0B] font-mono font-medium">{l}</td>
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
                                ['Criticality Safety', 'ANSI/ANS 8 series; geometry control, double contingency, favorable geometry'],
                                ['UF₆ Release Protection', 'HF scrubbers, KOH chemical traps, emergency ventilation, PPE stations'],
                                ['Fire Protection', 'Non-water based (CO₂, Halon) in cascade areas to prevent moderator introduction'],
                                ['Physical Security', '10 CFR 73 vital area barriers, armed response, vehicle barriers'],
                                ['Seismic Design', '10 CFR 70.64(a)(2) — design for most severe documented historical events'],
                                ['Emergency Power', 'UPS + diesel for criticality alarms, ventilation, IAEA C/S'],
                                ['IAEA Safeguards Equipment', 'Cameras, seals, NDA instruments, dedicated space/utilities'],
                            ].map(([s, sp]) => (
                                <tr key={s} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#F59E0B] font-medium whitespace-nowrap">{s}</td>
                                    <td className="px-3 py-2 text-gray-400">{sp}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="8. Communication Protocol Stack" id="protocols">
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`Process I&C:   Modbus RTU/TCP, 4-20 mA, hardwired interlocks
SCADA:         OPC UA, Ethernet (isolated cascade network)
MC&A:          SQL database, barcode/RFID cylinder tracking
Safeguards:    Dedicated IAEA network, data diode egress
Enterprise:    NRC eSubmit, encrypted VPN, MFA
Physical Sec:  CCTV over IP (isolated security network)`}</pre>
                </div>
            </Section>

            <Section title="9. Data Flow Architecture" id="data-flow">
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`  ENTERPRISE (L4)    NRC Reports · IAEA SIR · Corporate ERP
        │ Data Diode + IAEA Gateway (L3.5)
  OPERATIONS (L3)    MC&A Database · Production Scheduling · QA
        │ Firewall
  SCADA (L2)         Cascade HMI · Criticality Alarm Panel
        │ OPC UA / Modbus TCP
  CONTROL (L1)       Cascade PLCs · Centrifuge Vibration · Valve Control
        │ 4-20 mA / Modbus RTU
  PROCESS (L0)       UF₆ Flow · Pressure · Temperature · NDA Monitors`}</pre>
                </div>
            </Section>

            <Section title="10. References" id="references">
                <div className="space-y-2 text-xs text-gray-400 leading-relaxed">
                    <p>DOE/NNSA. (2017). <em>Safeguards by Design for Gas Centrifuge Enrichment Plants</em>. Oak Ridge: ORNL.</p>
                    <p>IAEA. (2013). <em>International Safeguards in the Design of Enrichment Plants</em>. Vienna: IAEA.</p>
                    <p>IAEA. (2008). <em>INFCIRC/153: The Structure and Content of Agreements</em>. Vienna: IAEA.</p>
                    <p>The Open Group. (2022). <em>TOGAF Standard, Version 10</em>. The Open Group.</p>
                    <p>U.S. NRC. (2025). <em>10 CFR 70 — Domestic Licensing of Special Nuclear Material</em>. Washington, DC.</p>
                    <p>U.S. NRC. (2020). <em>NUREG-1520: Standard Review Plan for Fuel Cycle Facilities</em>. Washington, DC.</p>
                    <p>World Nuclear Association. (2024). <em>Uranium Enrichment</em>. WNA.</p>
                </div>
            </Section>

            <Section title="See Also" id="see-also">
                <div className="flex flex-wrap gap-2">
                    {[
                        { href: '/wiki/nuclear', label: 'Nuclear Hub', color: '#10B981' },
                        { href: '/wiki/nuclear/fuel-fabrication', label: 'Fuel Fabrication', color: '#EF4444' },
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
