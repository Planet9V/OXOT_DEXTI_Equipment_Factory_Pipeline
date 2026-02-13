/**
 * Boiling Water Reactor (BWR) Plant — Deep Dive Wiki Article.
 * @module wiki/nuclear/bwr-plant/page
 */
export const metadata = {
    title: 'Boiling Water Reactor (BWR) Plant — Nuclear Wiki',
    description: 'TOGAF reference architecture for BWR plants: direct steam cycle, Mark I/II/III containment, suppression pool, and ECCS.',
};

export default function BWRPlantPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]" style={{ background: '#3B82F6' }} />
                    <span className="text-xs font-mono text-gray-500">NUCL · POWER REACTORS · BWR</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">Boiling Water Reactor (BWR) Plant</h1>
                <p className="text-sm text-gray-500 font-mono">500 – 1,400 MWe · Direct Steam Cycle</p>
                <p className="text-gray-400 text-base leading-relaxed max-w-3xl">
                    Boiling Water Reactors use a direct steam cycle where water boils in the reactor core and
                    steam directly drives the turbine-generator. This eliminates intermediate steam generators
                    at the cost of a mildly radioactive turbine island. The U.S. fleet includes 30 BWR units
                    (GE BWR/4-6 designs) providing ~30 GWe of capacity (NRC, 2024).
                </p>
            </div>

            <Section title="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-300 leading-relaxed">
                    The BWR business architecture parallels the PWR but differs in vendor ecosystem (GE-Hitachi)
                    and maintenance practices. BWR turbine buildings require radiological controls due to the direct
                    cycle, adding complexity to outage planning (The Open Group, 2022).
                </p>
                <h3 className="text-sm font-semibold text-white mt-6 mb-2">Stakeholders</h3>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside">
                    <li>NRC — licensing and oversight per 10 CFR 50</li>
                    <li>GE-Hitachi Nuclear Energy — NSSS vendor</li>
                    <li>BWR Owners&apos; Group (BWROG) — generic licensing</li>
                    <li>Utility owner/operator — plant operation</li>
                    <li>INPO — performance standards</li>
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
                                ['10 CFR Part 50', 'Operating license, technical specifications'],
                                ['10 CFR Part 73', 'Physical protection, cybersecurity §73.54'],
                                ['IEEE 603', 'Safety system criteria — Class 1E qualification'],
                                ['NFPA 805', 'Performance-based fire protection for LWRs'],
                                ['10 CFR 50.46', 'ECCS criteria — peak clad temp < 2,200°F'],
                            ].map(([s, sc]) => (
                                <tr key={s} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#3B82F6] font-medium whitespace-nowrap">{s}</td>
                                    <td className="px-3 py-2 text-gray-400">{sc}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="2. High-Level Design" id="design">
                <p className="text-sm text-gray-300 leading-relaxed">
                    The BWR direct steam cycle passes saturated steam (7.0 MPa, 286°C) from in-vessel
                    separators/dryers directly to the HP turbine. The RPV is larger than a PWR (6.4 m ID)
                    to accommodate steam separation equipment. Containment designs evolved through Mark I
                    (torus), Mark II (over/under), and Mark III (horizontal vent) configurations (GE-Hitachi, 2020).
                </p>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto mt-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`           ┌────────── CONTAINMENT (Mark I/II/III) ──────────┐
           │  ┌──────────────────────┐                       │
           │  │   REACTOR VESSEL     │   ┌──────────────┐    │
           │  │   6.4 m ID, 22 m H   │   │ SUPPRESSION  │    │
           │  │  ┌──────────────┐   │   │ POOL (TORUS) │    │
           │  │  │ STEAM SEPS   │   │   │ 1M gal       │    │
           │  │  │ + DRYERS     │   │   └──────────────┘    │
           │  │  └──────┬───────┘   │                       │
           │  │  ┌──────┴───────┐   │   ┌──────────────┐    │
           │  │  │  CORE 764 FA │   │   │  ECCS        │    │
           │  │  │  GNF2 10×10  │   │   │  HPCI/LPCI   │    │
           │  │  └──────┬───────┘   │   │  LPCS/ADS    │    │
           │  │  ┌──────┴───────┐   │   └──────────────┘    │
           │  │  │ JET PUMPS ×24│   │                       │
           │  │  └──────────────┘   │                       │
           │  └──────────────────────┘                       │
           └─────────────────────────────────────────────────┘
  Main Steam (7.0 MPa) ──► HP TURBINE ──► LP TURBINES ──► GENERATOR (1,400 MWe)
                                                      ──► CONDENSER ──► CW`}</pre>
                </div>
            </Section>

            <Section title="3. Detailed Technical Description" id="technical">
                <h3 className="text-sm font-semibold text-white mb-2">3.1 Reactor Core &amp; Vessel</h3>
                <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                    <li>Thermal output: 2,900–3,926 MWt (BWR/4 through ABWR)</li>
                    <li>Operating pressure: 7.03 MPa (1,020 psia), core flow: 48,000 m³/h</li>
                    <li>Fuel: 624–800 assemblies (GNF2 10×10), 3–5% U-235 enrichment</li>
                    <li>Control: 137–205 cruciform blades, bottom-entry hydraulic drives</li>
                    <li>Recirculation: 2 external pumps (6,500 hp) driving 20-24 jet pumps</li>
                    <li>Vessel: 22 m height, 6.4 m ID, 155 mm wall, low-alloy steel + SS clad</li>
                </ul>
                <h3 className="text-sm font-semibold text-white mt-6 mb-2">3.2 Steam Separation &amp; Turbine</h3>
                <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                    <li>In-vessel centrifugal separators + chevron dryers ({`<`}0.025% moisture)</li>
                    <li>Main steam: 4 lines, MSIVs (8 total, 3-5 sec closure)</li>
                    <li>HP turbine: tandem compound, ~500 MWe; LP: 2-3 units, 52-inch LSB</li>
                    <li>Moisture separator reheaters: 2-stage, 250°C reheat</li>
                </ul>
                <h3 className="text-sm font-semibold text-white mt-6 mb-2">3.3 Containment &amp; Suppression Pool</h3>
                <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                    <li>Mark I: steel drywell (inverted lightbulb) + torus suppression chamber</li>
                    <li>Mark II: concrete drywell + cylindrical wetwell (over/under)</li>
                    <li>Mark III: horizontal vents, free-standing steel containment</li>
                    <li>Suppression pool: 750,000–1,250,000 gal, T-limit 170°F</li>
                </ul>
                <h3 className="text-sm font-semibold text-white mt-6 mb-2">3.4 ECCS</h3>
                <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                    <li>HPCI/HPCS: steam-turbine or motor driven, 5,000 gpm at full pressure</li>
                    <li>LPCI: via RHR system, 10,000 gpm/loop; LPCS: 6,200 gpm/loop</li>
                    <li>ADS: 7-14 SRVs, N₂ pneumatic, depressurize RPV in ~120 sec</li>
                    <li>RCIC: 600 gpm, steam-turbine-driven (station blackout capability)</li>
                    <li>SLCS: sodium pentaborate injection for ATWS, 43 gpm, 1,500 ppm boron</li>
                </ul>
            </Section>

            <Section title="4. Process Diagrams" id="process-diagrams">
                <h3 className="text-sm font-semibold text-white mb-2">ECCS Injection Priority</h3>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`  LOCA Detected (RPV Level < L2 / Drywell P > 2 psi)
      │
      ├── SCRAM: Control rods insert (hydraulic, < 5 sec)
      ├── MSIV closure (3–5 sec)
      │
  ┌───┴────────────────────────────────────────────────┐
  │ LARGE BREAK          │  SMALL BREAK                │
  │ RPV depressurizes     │  RPV stays pressurized      │
  │        │              │         │                   │
  │ LPCS + LPCI           │  HPCI/HPCS (5,000 gpm)     │
  │ 16,200 gpm            │         │                   │
  │        │              │  If HPCI fails → ADS blowdn │
  │        │              │  → LPCS/LPCI take over      │
  └────────┴──────────────┴─────────┴───────────────────┘
      │
      ▼
  LONG TERM: Suppression pool cooling via RHR HXs`}</pre>
                </div>
            </Section>

            <Section title="5. Bill of Materials" id="bom">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead><tr className="border-b border-white/[0.08] text-gray-500">
                            <th className="text-left px-3 py-2 font-medium">Equipment</th>
                            <th className="text-left px-3 py-2 font-medium">Specification</th>
                            <th className="text-left px-3 py-2 font-medium">Qty</th>
                            <th className="text-left px-3 py-2 font-medium">Rating</th>
                        </tr></thead>
                        <tbody>
                            {[
                                ['Reactor Pressure Vessel', 'Low-alloy steel + SS clad, 6.4 m ID', '1', '7.03 MPa, 3,926 MWt'],
                                ['Fuel Assemblies (GNF2)', 'UO₂, Zircaloy channel, 10×10', '764', '3–5% U-235'],
                                ['Control Rod Blades', 'Cruciform, B₄C absorber', '185', 'Hydraulic bottom-entry'],
                                ['Jet Pumps', 'In-vessel recirculation', '24', '~2,000 m³/h each'],
                                ['Recirculation Pumps', 'External vertical', '2', '6,500 hp each'],
                                ['Steam Separators/Dryers', 'Centrifugal + chevron', '1 set', '<0.025% moisture'],
                                ['MSIVs', 'Gate type, fail-closed', '8', '3–5 sec closure'],
                                ['Safety/Relief Valves', 'Spring + pneumatic ADS', '14', '7.03 MPa setpoint'],
                                ['HP Turbine', 'Tandem compound', '1', '~500 MWe'],
                                ['LP Turbines', 'Double-flow, 52" LSB', '3', '~300 MWe each'],
                                ['Main Generator', 'H₂-cooled synchronous', '1', '1,400 MWe, 22 kV'],
                                ['HPCI/HPCS Pumps', 'Steam-turbine driven', '1–2', '5,000 gpm'],
                                ['LPCI Pumps (RHR)', 'Motor-driven centrifugal', '4', '10,000 gpm/loop'],
                                ['LPCS Pumps', 'Motor-driven centrifugal', '2', '6,200 gpm/loop'],
                                ['RCIC Pump', 'Steam-turbine-driven', '1', '600 gpm'],
                                ['SLCS Tank + Pumps', 'Na pentaborate solution', '1', '43 gpm'],
                                ['Emergency Diesel Gen.', 'Class 1E', '3', '6–8 MW, 10-sec start'],
                                ['Suppression Pool', 'Steel/concrete torus', '1', '1M gal'],
                            ].map(([e, s, q, r]) => (
                                <tr key={e} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#3B82F6] font-medium whitespace-nowrap">{e}</td>
                                    <td className="px-3 py-2 text-gray-400">{s}</td>
                                    <td className="px-3 py-2 text-gray-400">{q}</td>
                                    <td className="px-3 py-2 text-gray-400">{r}</td>
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
                            <th className="text-left px-3 py-2 font-medium">Protocols</th>
                        </tr></thead>
                        <tbody>
                            {[
                                ['L0', 'Neutron monitors (SRM/IRM/LPRM/APRM), TCs, level/P/flow', 'Hardwired 4-20 mA'],
                                ['L1', 'RPS (NUMAC digital), rod control, ECCS logic', 'Hardwired safety, fiber-optic intra-cab'],
                                ['L2', 'MCR HMI, process computer, 3D MONICORE', 'Isolated signal conditioners'],
                                ['L3', 'Historian, CMMS, fuel management', 'Modbus TCP, SQL'],
                                ['L3.5', 'Unidirectional data diode, IDS', 'NEI 08-09 compliant'],
                                ['L4', 'Corporate, NRC ERDS, INPO data', 'Encrypted VPN, MFA'],
                            ].map(([l, c, p]) => (
                                <tr key={l} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#3B82F6] font-mono font-medium">{l}</td>
                                    <td className="px-3 py-2 text-gray-400">{c}</td>
                                    <td className="px-3 py-2 text-gray-400">{p}</td>
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
                                ['Reactor Protection System', 'NUMAC digital, quad-redundant, 2/4 voting, Class 1E'],
                                ['Containment Isolation', '8 MSIVs, drywell isolation valves, 3-5 sec closure'],
                                ['Suppression Pool', '750K–1.25M gal, T-limit 170°F, condensation heat sink'],
                                ['SLCS', 'Na pentaborate injection for ATWS, 43 gpm'],
                                ['EDGs', '2-3 units, 6-8 MW, 10-sec start, 7-day fuel'],
                                ['Fire Protection', 'NFPA 805 compliant, compartmentalized barriers'],
                                ['Offgas Treatment', '30-min holdup, charcoal adsorbers, HEPA filtration'],
                                ['Physical Security', '10 CFR 73, vital area barriers, armed response'],
                            ].map(([s, sp]) => (
                                <tr key={s} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#3B82F6] font-medium whitespace-nowrap">{s}</td>
                                    <td className="px-3 py-2 text-gray-400">{sp}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="8. Communication Protocol Stack" id="protocols">
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`Safety I&C:    Hardwired 4-20 mA + 120 VAC (no TCP/IP)
               NUMAC fiber-optic intra-cabinet (safety-grade)
Non-Safety:    Modbus TCP, OPC UA (L2–L3)
DMZ (L3.5):    Waterfall unidirectional data diode
Enterprise:    Encrypted VPN, NRC ERDS, INPO consolidated data
Turbine Ctrl:  GE Mark VIe with dedicated HMI`}</pre>
                </div>
            </Section>

            <Section title="9. Data Flow Architecture" id="data-flow">
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`  ENTERPRISE (L4)    NRC ERDS · INPO · Outage Planning
        │ Data Diode (L3.5)
  OPERATIONS (L3)    Historian · 3D MONICORE · CMMS (~40K pts @ 1Hz)
        │ Firewall + IDS
  SUPERVISORY (L2)   Process Computer · MCR HMI · SPDS
        │ Galvanic isolation
  SAFETY I&C (L0-1)  RPS (NUMAC) · ECCS Logic · CRD · MSIVs
                     Hardwired only · No TCP/IP · No remote access`}</pre>
                </div>
            </Section>

            <Section title="10. References" id="references">
                <div className="space-y-2 text-xs text-gray-400 leading-relaxed">
                    <p>GE-Hitachi Nuclear Energy. (2020). <em>ESBWR Design Control Document</em>. Wilmington, NC: GEH.</p>
                    <p>GE Nuclear Energy. (2003). <em>BWR/6 General Description</em>. San Jose, CA: GE.</p>
                    <p>IEEE. (2018). <em>IEEE 603: Safety systems for nuclear power generating stations</em>. IEEE.</p>
                    <p>IAEA. (2016). <em>SSR-2/1 Rev. 1: Safety of Nuclear Power Plants: Design</em>. Vienna: IAEA.</p>
                    <p>NEI. (2010). <em>NEI 08-09: Cyber Security Plan for Nuclear Power Reactors</em>. Washington, DC.</p>
                    <p>The Open Group. (2022). <em>TOGAF Standard, Version 10</em>. The Open Group.</p>
                    <p>U.S. NRC. (2024). <em>NUREG-1350: Information Digest</em>. Washington, DC: NRC.</p>
                    <p>U.S. NRC. (2009). <em>10 CFR 73.54: Cyber protection</em>. Washington, DC: NRC.</p>
                </div>
            </Section>

            <Section title="See Also" id="see-also">
                <div className="flex flex-wrap gap-2">
                    {[
                        { href: '/wiki/nuclear', label: 'Nuclear Hub', color: '#10B981' },
                        { href: '/wiki/nuclear/pwr-plant', label: 'PWR Plant', color: '#10B981' },
                        { href: '/wiki/nuclear/research-reactor', label: 'Research Reactor', color: '#8B5CF6' },
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
