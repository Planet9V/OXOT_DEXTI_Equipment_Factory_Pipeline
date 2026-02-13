/**
 * Nuclear Decommissioning Site — Deep Dive Wiki Article.
 * @module wiki/nuclear/decommissioning/page
 */
export const metadata = {
    title: 'Nuclear Decommissioning Site — Nuclear Wiki',
    description: 'TOGAF reference architecture for nuclear decommissioning: DECON/SAFSTOR strategies, characterization, D&D, waste packaging, and site release.',
};

export default function DecommissioningPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]" style={{ background: '#6366F1' }} />
                    <span className="text-xs font-mono text-gray-500">NUCL · RADIOACTIVE WASTE · DECOMMISSIONING</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">Nuclear Decommissioning Site</h1>
                <p className="text-sm text-gray-500 font-mono">DECON · SAFSTOR · 10 CFR 50.82</p>
                <p className="text-gray-400 text-base leading-relaxed max-w-3xl">
                    Nuclear decommissioning involves the safe dismantlement of reactors and fuel cycle
                    facilities, removal of radioactive materials, and restoration of sites for unrestricted
                    use. As of 2024, 17 U.S. power reactors are actively being decommissioned, with 13
                    completed, using DECON (immediate dismantlement) or SAFSTOR (safe storage for 40–60
                    years) strategies regulated under 10 CFR 50.82 (NRC, 2024).
                </p>
            </div>

            <Section title="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-300 leading-relaxed">
                    Decommissioning business architecture spans a multi-decade lifecycle from permanent
                    shutdown through license termination, requiring specialized contractors (EnergySolutions,
                    Holtec, NorthStar), dedicated decommissioning trust funds ($400M–$1.5B per unit),
                    and rigorous NRC oversight through the Post-Shutdown Decommissioning Activities Report
                    (PSDAR) and License Termination Plan (LTP) (The Open Group, 2022).
                </p>
                <h3 className="text-sm font-semibold text-white mt-6 mb-2">Stakeholders</h3>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside">
                    <li>NRC — 10 CFR 50.82 oversight; license termination</li>
                    <li>Decom contractors (EnergySolutions, Holtec, NorthStar)</li>
                    <li>License holder/trust fund administrator</li>
                    <li>State regulators — site release criteria, environmental monitoring</li>
                    <li>EPA — CERCLA, groundwater remediation coordination</li>
                    <li>DOE — waste acceptance, ISFSI transition</li>
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
                                ['10 CFR 50.82', 'Decommissioning process, PSDAR, LTP, DTF requirements'],
                                ['10 CFR 20.1402', 'Unrestricted release criteria: <25 mrem/yr TEDE'],
                                ['NUREG-1757', 'Consolidated decommissioning guidance'],
                                ['MARSSIM (NUREG-1575)', 'Multi-Agency Radiation Survey and Site Investigation Manual'],
                                ['10 CFR Part 61', 'LLW disposal packaging and classification (A/B/C/GTCC)'],
                                ['10 CFR 50.75', 'Decommissioning Trust Fund reporting and financial assurance'],
                            ].map(([s, sc]) => (
                                <tr key={s} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#6366F1] font-medium whitespace-nowrap">{s}</td>
                                    <td className="px-3 py-2 text-gray-400">{sc}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="2. High-Level Design" id="design">
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`  PERMANENT SHUTDOWN ──► PSDAR ──► DECOMMISSIONING ──► LTP ──► LICENSE TERMINATION
                                        │
                            ┌────────────┴───────────────┐
                            │                            │
                       DECON (5-10 yr)           SAFSTOR (40-60 yr)
                       Immediate D&D              Safe Storage Period
                            │                            │
                            ▼                            ▼
                    ┌───────────────┐            ┌───────────────┐
                    │ CHARACTERIZE  │            │ MAINTAIN      │
                    │ Survey, sample│            │ Surveillance  │
                    │ HSA/DCGL      │            │ Monitoring    │
                    └───────┬───────┘            │ 40-60 years   │
                            │                    └───────┬───────┘
                            ▼                            │
                    ┌───────────────┐                     ▼
                    │ DISMANTLE     │            ┌───────────────┐
                    │ Segment RPV   │            │ DEFERRED D&D  │
                    │ Remove bioshld│            │ (Same as DECON│
                    │ Decontaminate │            │ after waiting)│
                    └───────┬───────┘            └───────┬───────┘
                            │                            │
                            ▼                            ▼
                    ┌───────────────────────────────────────┐
                    │  WASTE PACKAGING & DISPOSAL            │
                    │  Class A/B/C → LLW site (e.g., WCS)   │
                    │  GTCC → DOE disposal                   │
                    │  RPV segments → Type B cask            │
                    └───────────────┬───────────────────────┘
                                    │
                            ┌───────┴───────┐
                            │ FINAL STATUS  │
                            │ SURVEY (FSS)  │
                            │ MARSSIM/DCGL  │
                            │ <25 mrem/yr   │
                            └───────┬───────┘
                                    │
                            LICENSE TERMINATION`}</pre>
                </div>
            </Section>

            <Section title="3. Detailed Technical Description" id="technical">
                <h3 className="text-sm font-semibold text-white mb-2">3.1 Radiological Characterization</h3>
                <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                    <li>Historical Site Assessment (HSA): operational records, spill history, activation calculations</li>
                    <li>Scoping/characterization surveys: gamma walkover, soil/smear samples, bore holes</li>
                    <li>Derived Concentration Guideline Levels (DCGLs): based on 25 mrem/yr dose limit</li>
                    <li>Key nuclides: Co-60 (5.3 yr), Cs-137 (30 yr), Ni-63 (100 yr), C-14 (5,730 yr)</li>
                    <li>Activation products in RPV/bioshield: calculated via MCNP/SCALE neutron transport</li>
                </ul>
                <h3 className="text-sm font-semibold text-white mt-6 mb-2">3.2 Dismantlement &amp; Decontamination</h3>
                <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                    <li>RPV segmentation: diamond wire saw, plasma cutting, underwater operations</li>
                    <li>Bioshield removal: concrete crushing, pneumatic hammering, controlled blasting</li>
                    <li>Pipe/component decon: chemical (dilute acids), mechanical (abrasive blasting)</li>
                    <li>Large component removal: steam generators, pressurizer via temporary openings</li>
                    <li>Coolant system drain/flush: RCS decontamination (CITROX, LOMI processes)</li>
                </ul>
                <h3 className="text-sm font-semibold text-white mt-6 mb-2">3.3 Waste Management</h3>
                <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                    <li>Class A LLW: concrete, soil, 90% of total volume, shallow land disposal</li>
                    <li>Class B/C LLW: resins, filters, activated metals, stabilized packaging</li>
                    <li>GTCC: activated RPV internals, &gt;Class C — DOE responsible for disposal</li>
                    <li>Mixed waste: hazardous + radioactive, RCRA + NRC dual regulation</li>
                    <li>Waste volume: 15,000–30,000 m³ per PWR unit (DECON strategy)</li>
                </ul>
                <h3 className="text-sm font-semibold text-white mt-6 mb-2">3.4 Final Status Survey</h3>
                <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                    <li>MARSSIM methodology: survey units (Class 1/2/3), statistical testing (WRS/Sign)</li>
                    <li>Release criteria: {`<`}25 mrem/yr TEDE for unrestricted release (10 CFR 20.1402)</li>
                    <li>Elevated Measurement Comparison (EMC): area factor × DCGL for hot spots</li>
                    <li>NRC confirmatory surveys: independent verification of licensee FSS data</li>
                </ul>
            </Section>

            <Section title="4. Process Diagrams" id="process-diagrams">
                <h3 className="text-sm font-semibold text-white mb-2">MARSSIM Survey Decision Flow</h3>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`  SURVEY UNIT CLASSIFICATION
      │
  ┌───┴────────────────────────────────────────┐
  │ Class 1     │ Class 2      │ Class 3       │
  │ Impacted    │ Low potential│ Non-impacted   │
  │ 100% scan   │ 10-50% scan  │ Judgmental     │
  │ + systematic│ + systematic │ sampling       │
  └──────┬──────┴──────┬───────┴───────┬───────┘
         │             │               │
         ▼             ▼               ▼
  STATISTICAL TEST (WRS / Sign Test)
  H₀: Survey unit exceeds DCGL
  H₁: Survey unit meets DCGL
         │
  ┌──────┴──────┐
  │ PASS        │──► NRC Review ──► License Termination
  │ FAIL        │──► Additional decon/remediation
  └─────────────┘`}</pre>
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
                                ['Diamond Wire Saw', 'RPV/bioshield segmentation, underwater capable', '1–3'],
                                ['Plasma/Oxy-Fuel Torch', 'Metal cutting, remote operated', '2–4'],
                                ['Hydraulic Concrete Crushers', 'Bioshield removal, 2,000+ ton force', '1–2'],
                                ['Remotely Operated Vehicles', 'Pool/cavity cutting, camera inspection', '2–4'],
                                ['Decon Stations', 'Chemical (CITROX/LOMI), mechanical (abrasive)', '2–4'],
                                ['Waste Shipping Containers', 'IP-2, Type B cask for GTCC, liners', '100+'],
                                ['LLW Disposal Liners', 'Concrete, steel, polyethylene overpack', '500+'],
                                ['Survey Instruments', 'HPGe detectors, NaI walkover, smear counters', '20+'],
                                ['Soil Sampling Equipment', 'Bore holes, split spoons, compositing', '10+'],
                                ['Air Sampling Pumps', 'Continuous air monitors during D&D', '10+'],
                                ['Gamma Spectroscopy Lab', 'HPGe, Marinelli beakers, MDA analysis', '1'],
                                ['HEPA Ventilation (temp)', 'Negative pressure enclosures for cutting', '4–8'],
                                ['Scaffolding/Platforms', 'Multi-level access in containment', 'Varies'],
                                ['Heavy Lift Crane', '500+ ton for SG/pressurizer removal', '1'],
                            ].map(([e, s, q]) => (
                                <tr key={e} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#6366F1] font-medium whitespace-nowrap">{e}</td>
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
                                ['L0', 'RAMs, CAMs, survey instruments, cut-off tool sensors', 'Analog 4-20 mA, gamma pulse'],
                                ['L1', 'ROV controls, cutting tool PLCs, ventilation interlocks', 'Wireless video, hardwired safety'],
                                ['L2', 'D&D control room HMI, CCTV matrix, rad. status boards', 'Real-time dose tracking, alarm mgmt'],
                                ['L3', 'Waste tracking DB, FSS data management, project scheduling', 'Barcode/RFID waste containers, GIS'],
                                ['L3.5', 'Firewall, minimal external access', 'Outbound NRC/DOE reporting'],
                                ['L4', 'NRC ADAMS, DTF reporting, state/EPA coordination', 'Encrypted VPN, PSDAR/LTP submittals'],
                            ].map(([l, c, f]) => (
                                <tr key={l} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#6366F1] font-mono font-medium">{l}</td>
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
                                ['ALARA Program', 'Real-time dose tracking, stay times, shielding, remote operations'],
                                ['Confinement', 'Temporary HEPA enclosures during cutting; negative pressure'],
                                ['Criticality Safety', 'Fuel removed to ISFSI prior to D&D; SFP drained after fuel transfer'],
                                ['Industrial Safety', 'OSHA confined space, fall protection, heavy lift plans'],
                                ['Environmental Mon.', 'Groundwater wells, air monitors, surface water sampling'],
                                ['Physical Security', 'Reduced EPZ after fuel removal; 10 CFR 73 until ISFSI only'],
                                ['Emergency Planning', 'De-escalated EP per 10 CFR 50.54(q) after fuel in dry storage'],
                            ].map(([s, sp]) => (
                                <tr key={s} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#6366F1] font-medium whitespace-nowrap">{s}</td>
                                    <td className="px-3 py-2 text-gray-400">{sp}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="8. Communication Protocol Stack" id="protocols">
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`D&D Control:   Wireless video (ROV), PLC hardwired safety
Survey:        RS-232/485 from HPGe/NaI instruments
Dose Track:    Electronic dosimeters, real-time telemetry
Waste Track:   Barcode/RFID, SQL database, GIS mapping
Reporting:     NRC ADAMS, DOE waste manifests, state EPA
Enterprise:    Encrypted VPN, project management tools`}</pre>
                </div>
            </Section>

            <Section title="9. Data Flow Architecture" id="data-flow">
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`  NRC/DOE/EPA (L4)   ADAMS · PSDAR/LTP · DTF Reports · Waste Manifests
        │ Firewall (L3.5)
  PROJECT (L3)       Waste Tracking DB · FSS Data · Scheduling · GIS
        │ Ethernet
  D&D CTRL RM (L2)   HMI · CCTV · Dose Boards · Rad. Status
        │ Wireless / Hardwired
  TOOLS (L1)         ROV PLCs · Cutting Tool Controls · Ventilation
        │ 4-20 mA / Video
  FIELD (L0)         RAMs · CAMs · Survey Instruments · Sensors`}</pre>
                </div>
            </Section>

            <Section title="10. References" id="references">
                <div className="space-y-2 text-xs text-gray-400 leading-relaxed">
                    <p>EnergySolutions. (2023). <em>Decommissioning Project Experience</em>. Salt Lake City, UT.</p>
                    <p>IAEA. (2018). <em>Decommissioning of Nuclear Facilities (GSR Part 6)</em>. Vienna: IAEA.</p>
                    <p>The Open Group. (2022). <em>TOGAF Standard, Version 10</em>. The Open Group.</p>
                    <p>U.S. EPA. (2000). <em>MARSSIM (NUREG-1575, Rev. 1)</em>. Washington, DC.</p>
                    <p>U.S. NRC. (2006). <em>NUREG-1757: Consolidated Decommissioning Guidance</em>. Washington, DC.</p>
                    <p>U.S. NRC. (2024). <em>NUREG-1350: Information Digest</em>. Washington, DC: NRC.</p>
                    <p>U.S. NRC. (2023). <em>Status of Decommissioning Power Reactor Sites</em>. NRC.gov.</p>
                </div>
            </Section>

            <Section title="See Also" id="see-also">
                <div className="flex flex-wrap gap-2">
                    {[
                        { href: '/wiki/nuclear', label: 'Nuclear Hub', color: '#10B981' },
                        { href: '/wiki/nuclear/spent-fuel-storage', label: 'Spent Fuel Storage', color: '#06B6D4' },
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
