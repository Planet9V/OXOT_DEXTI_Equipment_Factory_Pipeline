/**
 * Spent Fuel Storage Installation (ISFSI) — Deep Dive Wiki Article.
 * @module wiki/nuclear/spent-fuel-storage/page
 */
export const metadata = {
    title: 'Spent Fuel Storage Installation (ISFSI) — Nuclear Wiki',
    description: 'TOGAF reference architecture for ISFSIs: dry cask storage, transfer operations, thermal/shielding analysis, and NRC Part 72 licensing.',
};

export default function SpentFuelStoragePage() {
    return (
        <div className="max-w-5xl space-y-10">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]" style={{ background: '#06B6D4' }} />
                    <span className="text-xs font-mono text-gray-500">NUCL · RADIOACTIVE WASTE · ISFSI</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">Spent Fuel Storage Installation (ISFSI)</h1>
                <p className="text-sm text-gray-500 font-mono">Dry Cask Storage · 10 CFR Part 72</p>
                <p className="text-gray-400 text-base leading-relaxed max-w-3xl">
                    Independent Spent Fuel Storage Installations (ISFSIs) provide long-term interim storage
                    for spent nuclear fuel in dry cask systems after pool cooling. Over 80 ISFSIs at 57 sites
                    store ~90,000 metric tons of spent fuel in the U.S., using NRC-certified cask designs
                    (HI-STORM, NUHOMS, TN Americas) licensed under 10 CFR Part 72 (NRC, 2024).
                </p>
            </div>

            <Section title="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-300 leading-relaxed">
                    ISFSI business architecture links reactor decommissioning, spent fuel management,
                    and eventual repository disposal. Facilities operate under either site-specific
                    licenses (10 CFR 72, Subpart B) or general licenses (10 CFR 72, Subpart K)
                    using NRC-certified cask systems (The Open Group, 2022).
                </p>
                <h3 className="text-sm font-semibold text-white mt-6 mb-2">Stakeholders</h3>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside">
                    <li>NRC — Part 72 licensing, cask certification (CoC)</li>
                    <li>DOE — federal responsibility for ultimate disposal</li>
                    <li>Cask vendors (Holtec, Orano TN, NAC) — design, fabrication</li>
                    <li>Utility/site operator — loading, monitoring, security</li>
                    <li>State/local agencies — EPZ coordination, radiation monitoring</li>
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
                                ['10 CFR Part 72', 'ISFSI licensing, general/site-specific, cask CoC'],
                                ['NUREG-1536', 'SRP for dry cask storage systems'],
                                ['10 CFR Part 73', 'Physical protection of spent fuel at ISFSIs'],
                                ['NUREG-2215', 'SRP for spent fuel dry storage systems'],
                                ['ACI 318/349', 'Concrete pad/structure design for cask overpack'],
                                ['ANSI N14.6', 'Special lifting devices for shipping containers'],
                            ].map(([s, sc]) => (
                                <tr key={s} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#06B6D4] font-medium whitespace-nowrap">{s}</td>
                                    <td className="px-3 py-2 text-gray-400">{sc}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="2. High-Level Design" id="design">
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`  SPENT FUEL POOL                    TRANSFER              ISFSI PAD
  (Reactor Building)                 OPERATIONS
  ┌──────────────┐    ┌──────────────────┐    ┌──────────────────────┐
  │ Fuel racks   │    │ Load canister    │    │  ┌──────┐ ┌──────┐  │
  │ (10+ yr cool)│──► │ underwater       │──► │  │CASK 1│ │CASK 2│  │
  │              │    │ Drain, dry, weld │    │  │      │ │      │  │
  └──────────────┘    │ Helium backfill  │    │  │VCC   │ │VCC   │  │
                      │ Transfer to VCC  │    │  │      │ │      │  │
                      └──────────────────┘    │  └──────┘ └──────┘  │
                                              │                      │
                                              │  ┌──────┐ ┌──────┐  │
                                              │  │CASK 3│ │CASK N│  │
                                              │  │      │ │      │  │
                                              │  └──────┘ └──────┘  │
                                              │                      │
                                              │  2 m thick concrete  │
                                              │  pad, ACI 318/349    │
                                              │  Seismic Category I  │
                                              └──────────────────────┘
                                                     │
                                              ┌──────┴───────────────┐
                                              │ MONITORING            │
                                              │ • Thermal (air inlet/ │
                                              │   outlet ΔT)          │
                                              │ • Radiation (TLDs,    │
                                              │   area monitors)      │
                                              │ • Security (10 CFR 73)│
                                              └──────────────────────┘`}</pre>
                </div>
            </Section>

            <Section title="3. Detailed Technical Description" id="technical">
                <h3 className="text-sm font-semibold text-white mb-2">3.1 Dry Cask Systems</h3>
                <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                    <li>HI-STORM (Holtec): MPC (multi-purpose canister) + VCC (vertical concrete cask)</li>
                    <li>NUHOMS (Orano TN): DSC (dry shielded canister) + HSM (horizontal storage module)</li>
                    <li>NAC-UMS: universal multi-purpose system, vertical welded canister</li>
                    <li>Capacity: 24–37 PWR assemblies or 52–89 BWR assemblies per canister</li>
                    <li>Heat load: 20–45 kW per cask at loading; passive convection cooling</li>
                    <li>Design life: 60+ years (extended to 80 via aging management programs)</li>
                </ul>
                <h3 className="text-sm font-semibold text-white mt-6 mb-2">3.2 Transfer Operations</h3>
                <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                    <li>Canister loading: submerged in spent fuel pool, fuel assemblies placed in basket</li>
                    <li>Draining: suction pump, vacuum drying to {`<`}3 torr (removes moisture)</li>
                    <li>Closure welding: SS lid TIG/SMAW, NDE (UT/PT), He leak test ({`<`}10⁻⁷ std cc/s)</li>
                    <li>Helium backfill: inert atmosphere, thermal conductivity for passive cooling</li>
                    <li>Transfer cask: shielded overpack for pool-to-pad movement (100–150 ton crane)</li>
                    <li>Pad placement: air-pad transporter or crawler crane, GPS-guided alignment</li>
                </ul>
                <h3 className="text-sm font-semibold text-white mt-6 mb-2">3.3 Thermal &amp; Shielding Analysis</h3>
                <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                    <li>Peak clad temperature: {`<`}400°C for normal conditions (NUREG-1536 limit)</li>
                    <li>Convective cooling: inlet vents → annular gap → stack effect → outlet vents</li>
                    <li>Shielding: concrete overpack (24–36 inches) + steel canister shell (0.5&quot;)</li>
                    <li>Dose rate: {`<`}25 mrem/hr at cask surface; pad boundary {`<`}25 mrem/yr (10 CFR 72)</li>
                    <li>Seismic: designed for 0.3–0.6g PGA, tip-over analysis per FSAR</li>
                </ul>
            </Section>

            <Section title="4. Process Diagrams" id="process-diagrams">
                <h3 className="text-sm font-semibold text-white mb-2">Cask Loading Sequence</h3>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`  1. Fuel Selection    Select assemblies meeting burnup/cooling criteria
         │
  2. Pool Loading      Lower MPC into transfer cask, submerge in pool
         │
  3. Assembly Load     Place 24-37 PWR (or 52-89 BWR) assemblies in basket
         │
  4. Drain & Dry       Pump water, vacuum dry to <3 torr, forced He dry
         │
  5. Lid Weld          TIG/SMAW closure, UT + PT NDE, He leak test
         │
  6. He Backfill       Pressurize to ~5 atm for thermal conductivity
         │
  7. Transfer          Move to ISFSI pad via crawler/air-pad transporter
         │
  8. VCC Placement     Lower MPC into vertical concrete overpack
         │
  9. Monitoring        Continuous thermal and radiation surveillance`}</pre>
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
                                ['MPC (Multi-Purpose Canister)', 'SS welded, 24-37 PWR / 52-89 BWR assemblies', 'Per campaign'],
                                ['VCC (Vertical Concrete Cask)', 'Concrete + steel, 24-36" walls, air vents', 'Per MPC'],
                                ['Transfer Cask', 'Shielded overpack, 100-125 ton, pool-rated', '1-2'],
                                ['ISFSI Concrete Pad', 'ACI 318/349, 2 m thick, Seismic Cat. I', '1'],
                                ['Vacuum Drying System', 'Pump + condenser, <3 torr endpoint', '1-2'],
                                ['Closure Weld Equipment', 'TIG/SMAW, NDE (UT/PT), He leak tester', '1 set'],
                                ['He Pressurization System', '~5 atm backfill, mass spec verification', '1'],
                                ['Air-Pad Transporter', '150+ ton capacity, GPS guided', '1'],
                                ['Cask Lift Yoke', 'ANSI N14.6 special lifting device', '1-2'],
                                ['Thermal Monitoring', 'Inlet/outlet ΔT thermocouples per cask', 'Per cask'],
                                ['Radiation Monitors', 'TLDs, area RAMs, CCTV', '20+'],
                                ['Intrusion Detection', 'Perimeter fence + sensors, CCTV, lighting', '1 system'],
                                ['Meteorological Tower', 'Wind speed/direction, temp, humidity', '1'],
                                ['Direct Radiation TLDs', 'Quarterly exchange, pad boundary + fence', '20+'],
                            ].map(([e, s, q]) => (
                                <tr key={e} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#06B6D4] font-medium whitespace-nowrap">{e}</td>
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
                                ['L0', 'Thermocouples, TLDs, area RAMs, pressure gauges', 'Analog 4-20 mA, passive TLDs'],
                                ['L1', 'Data loggers for thermal, radiation alarm panels', 'Threshold alarms, local annunciation'],
                                ['L2', 'ISFSI monitoring HMI, CCTV control room', 'Data trending, alarm management'],
                                ['L3', 'Fuel tracking database, cask inventory, NRC reporting', 'Material accountancy, aging management'],
                                ['L3.5', 'Firewall, minimal external connectivity', 'Read-only NRC reporting egress'],
                                ['L4', 'NRC periodic reporting, DOE coordination', 'ADAMS submittals, encrypted VPN'],
                            ].map(([l, c, f]) => (
                                <tr key={l} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#06B6D4] font-mono font-medium">{l}</td>
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
                                ['Passive Cooling', 'Natural convection through VCC air vents; no active cooling required'],
                                ['Confinement', 'Welded SS canister (Type 304L); He leak test at closure <10⁻⁷ std cc/s'],
                                ['Criticality Safety', 'Borated SS basket panels (Metamic); keff < 0.95 with worst-case flooding'],
                                ['Seismic Protection', '0.3–0.6g PGA design; cask tip-over analysis in FSAR'],
                                ['Physical Security', '10 CFR 73 — intrusion detection, armed response, vehicle barriers'],
                                ['Radiation Protection', '<25 mrem/yr at pad boundary; ALARA, TLD monitoring program'],
                                ['Aging Management', 'Cask annual inspections, concrete degradation monitoring, vent blockage checks'],
                            ].map(([s, sp]) => (
                                <tr key={s} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#06B6D4] font-medium whitespace-nowrap">{s}</td>
                                    <td className="px-3 py-2 text-gray-400">{sp}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="8. Communication Protocol Stack" id="protocols">
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`Monitoring:    Analog thermocouples (4-20 mA), passive TLDs
Alarms:        Hardwired radiation alarm panels, local annunciation
CCTV:          IP cameras on isolated security network
Data:          SQL/flat-file for cask inventory and fuel tracking
Reporting:     NRC ADAMS electronic submittals
Enterprise:    Encrypted VPN for corporate coordination`}</pre>
                </div>
            </Section>

            <Section title="9. Data Flow Architecture" id="data-flow">
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`  NRC/DOE (L4)       ADAMS Reports · 10 CFR 72.44 Annual Reports
        │ Firewall (L3.5)
  TRACKING (L3)      Cask Inventory · Fuel Tracking · Aging Mgmt DB
        │ Ethernet
  CONTROL RM (L2)    ISFSI Monitoring HMI · CCTV · Alarm Panel
        │ Hardwired / Data Logger
  SENSORS (L0-L1)    Thermocouples · TLDs · Area RAMs · Met Tower`}</pre>
                </div>
            </Section>

            <Section title="10. References" id="references">
                <div className="space-y-2 text-xs text-gray-400 leading-relaxed">
                    <p>Holtec International. (2023). <em>HI-STORM FW FSAR (Rev. 8)</em>. Marlton, NJ: Holtec.</p>
                    <p>IAEA. (2012). <em>Storage of Spent Nuclear Fuel (SSG-15)</em>. Vienna: IAEA.</p>
                    <p>The Open Group. (2022). <em>TOGAF Standard, Version 10</em>. The Open Group.</p>
                    <p>U.S. NRC. (2010). <em>NUREG-1536: SRP for Dry Cask Storage Systems (Rev. 1)</em>. Washington, DC.</p>
                    <p>U.S. NRC. (2020). <em>NUREG-2215: SRP for Spent Fuel Dry Storage</em>. Washington, DC.</p>
                    <p>U.S. NRC. (2024). <em>NUREG-1350: Information Digest</em>. Washington, DC: NRC.</p>
                    <p>World Nuclear Association. (2024). <em>Storage and Disposal of Radioactive Waste</em>. WNA.</p>
                </div>
            </Section>

            <Section title="See Also" id="see-also">
                <div className="flex flex-wrap gap-2">
                    {[
                        { href: '/wiki/nuclear', label: 'Nuclear Hub', color: '#10B981' },
                        { href: '/wiki/nuclear/decommissioning', label: 'Decommissioning', color: '#6366F1' },
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
