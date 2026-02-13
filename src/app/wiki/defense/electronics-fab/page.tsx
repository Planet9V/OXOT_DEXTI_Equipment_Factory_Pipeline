/**
 * Defense Electronics Fabrication Facility — Deep Dive Wiki Article.
 *
 * Comprehensive TOGAF-based reference architecture for a "Trusted Foundry" 
 * producing radiation-hardened microelectronics and RF components for defense applications.
 *
 * @module wiki/defense/electronics-fab/page
 */

export const metadata = {
    title: 'Defense Electronics Fab Reference Architecture — Defense Wiki',
    description: 'Reference architecture for Trusted Foundry operations: ISO Class 4 cleanrooms, photolithography, and secure manufacturing.',
};

export default function ElectronicsFabPage() {
    return (
        <div className="max-w-5xl space-y-10 pb-20">

            {/* ── Header ───────────────────────────────────────────────────────── */}
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]"
                        style={{ background: '#A855F7' }} />
                    <span className="text-xs font-mono text-gray-500">
                        DEFN · SEMICONDUCTOR · TRUSTED FOUNDRY
                    </span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">
                    Defense Electronics Fabrication
                </h1>
                <p className="text-sm text-gray-500 font-mono">Trusted Foundry · Rad-Hard ASICs · GaN RF</p>
                <p className="text-gray-400 text-base leading-relaxed max-w-3xl">
                    Defense electronics facilities (Trusted Foundries) operate at the intersection of
                    **nanometer-scale precision** and **national security**. These facilities manufacture
                    Application Specific Integrated Circuits (ASICs), Field Programmable Gate Arrays (FPGAs),
                    and Gallium Nitride (GaN) RF components used in radar and electronic warfare systems,
                    all within **ISO Class 4/5 Cleanrooms** protected by SCIF-level security.
                </p>
            </div>

            {/* ── 1. TOGAF Business Architecture ───────────────────────────────── */}
            <Section title="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-300 leading-relaxed">
                    The primary business driver is the **DMEA (Defense Microelectronics Activity) Trusted Foundry Program**,
                    which ensures a secure supply chain for critical military components. Capabilities focus on
                    **Low Volume / High Mix** production of specialized, long-lifecycle parts.
                </p>

                <h3 className="text-sm font-semibold text-white mt-6 mb-2">Stakeholders</h3>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside">
                    <li>Defense Microelectronics Activity (DMEA)</li>
                    <li>NSA (COMSEC Certification)</li>
                    <li>Prime Contractors (Raytheon, L3Harris, Northrop Grumman)</li>
                    <li>Foundry Partners (GlobalFoundries, SkyWater, etc.)</li>
                </ul>

                <h3 className="text-sm font-semibold text-white mt-6 mb-2">Regulatory Framework</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Standard</th>
                                <th className="text-left px-3 py-2 font-medium">Scope</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['DoDI 5200.44', 'Protection of Mission Critical Functions to Achieve Trusted Systems'],
                                ['MIL-PRF-38535', 'General Specification for Integrated Circuits (Manufacturing)'],
                                ['ICD 705', 'Physical Security Standards for SCIFs'],
                                ['ISO 14644-1', 'Cleanrooms and Associated Controlled Environments'],
                                ['SEMI S2', 'Environmental, Health, and Safety Guideline for Semiconductor Mfg'],
                            ].map(([standard, scope]) => (
                                <tr key={standard} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#A855F7] font-medium whitespace-nowrap">{standard}</td>
                                    <td className="px-3 py-2 text-gray-400">{scope}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* ── 2. High-Level Design ─────────────────────────────────────────── */}
            <Section title="2. High-Level Design" id="design">
                <p className="text-sm text-gray-300 leading-relaxed">
                    The facility is designed as a "Ballroom" or "Bay and Chase" configuration. The central **Cleanroom**
                    is surrounded by a **Sub-Fab** housing hazardous gas/chemical delivery systems and vacuum pumps.
                    Air management involves massive **ULPA filtration** ceiling grids and perforated raised floors.
                </p>

                <h3 className="text-sm font-semibold text-white mt-6 mb-2">Wafer Process Flow</h3>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{
                        `[ Bare Wafer Start ] ──► [ Photolithography ] ──► [ Etch / Strip ]
       │                      (Patterning)        (Remove Material)
       ▼                           ▲                      │
[ Ion Implantation ] ──────────────┘                      ▼
    (Doping)                                      [ Deposition ]
       │                                     (CVD / PVD / Diffusion)
       ▼
[ CMP / Planarization ] ──► [ Metallization ] ──► [ Wafer Sort / Test ]
                                                          │
                                                          ▼
                                                   [ Dice & Package ]`
                    }</pre>
                </div>
            </Section>

            {/* ── 3. Detailed Technical Description ────────────────────────────── */}
            <Section title="3. Detailed Technical Description" id="technical">

                {/* 3.1 Photolithography */}
                <h3 className="text-base font-semibold text-white mt-2 mb-2">3.1 Photolithography</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    The "Yellow Room" houses Steppers/Scanners that project circuit patterns onto photoresist-coated wafers.
                    Vibration control (VC-E capability) and temperature stability (±0.1°C) are critical.
                </p>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside mt-2">
                    <li><span className="text-white">Equipment</span> — ASML / Nikon Steppers (Deep UV / i-Line)</li>
                    <li><span className="text-white">Tracks</span> — Tokyo Electron (TEL) Coater/Developers</li>
                    <li><span className="text-white">Hazards</span> — Photoresist solvents (PGMEA)</li>
                </ul>

                {/* 3.2 Etch & Deposition */}
                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.2 Etch & Deposition</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    Plasma Etchers remove material defined by lithography. CVD/PVD tools deposit insulating or
                    conducting layers. These tools use dangerous specialty gases (Silane, Arsine, NF3).
                </p>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside mt-2">
                    <li><span className="text-white">Equipment</span> — Lam Research, Applied Materials, Centura</li>
                    <li><span className="text-white">Chemistry</span> — HF Acid, Chlorine, Fluorine plasma</li>
                    <li><span className="text-white">Abatement</span> — Point-of-use scrubbers (Burn/Wet)</li>
                </ul>

                {/* 3.3 Metrology */}
                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.3 Metrology & Inspection</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    Defect density is monitored continuously. Scanning Electron Microscopes (CD-SEM) measure
                    line widths down to nanometers.
                </p>
            </Section>

            {/* ── 4. Process Diagrams ──────────────────────────────────────────── */}
            <Section title="4. Process Diagrams" id="process">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">4.1 Cleanroom Airflow</h4>
                <div className="rounded-lg border border-white/[0.06] p-4 font-mono text-xs text-gray-300 overflow-x-auto mb-6">
                    <pre className="whitespace-pre">{
                        `[ AHU / MAU ] ──► [ Supply Plenum ] ──► [ FFUs / ULPA Filters ]
                                                │
                                                ▼
[ Return Plenum ] ◄── [ Raised Floor ] ◄── [ Cleanroom Bay ]
      │             (Perforated Tiles)      (ISO Class 4)
      ▼
[ Recirc Fan ] ──► [ Cooling Coil ]`
                    }</pre>
                </div>

                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">4.2 Gas Delivery Safety</h4>
                <div className="rounded-lg border border-white/[0.06] p-4 font-mono text-xs text-gray-300 overflow-x-auto">
                    <pre className="whitespace-pre">{
                        `[ Gas Bunker ] ──► [ Gas Cabinet ] ──(Coax Tubing)──► [ VMB ]
 (Bulk Tank)        (Cylinder / Purge)                 (Valve Manifold Box)
                          │                                  │
                          ▼                                  ▼
                    [ Scrubber ]                    [ Process Tool ]
                                                    (Mass Flow Ctl)`
                    }</pre>
                </div>
            </Section>

            {/* ── 5. Bill of Materials ─────────────────────────────────────────── */}
            <Section title="5. Bill of Materials" id="bom">
                <p className="text-sm text-gray-400 mb-4">
                    Representative toolset for a 200mm/300mm Mixed-Signal / RF Line.
                </p>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left border-collapse">
                        <thead>
                            <tr className="text-gray-500 border-b border-white/[0.08]">
                                <th className="py-2 px-3 font-medium">Equipment Type</th>
                                <th className="py-2 px-3 font-medium">Specification</th>
                                <th className="py-2 px-3 font-medium">Typical Qty</th>
                                <th className="py-2 px-3 font-medium">Rating/Cap</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-300 divide-y divide-white/[0.04]">
                            {[
                                ['Stepper / Scanner', 'ASML PAS 5500 (i-Line/DUV)', '4', '80 Wafers/hr'],
                                ['Plasma Etcher', 'Lam Research TCP 9600', '8', 'High Density Plasma'],
                                ['CVD System', 'Applied Materials Producer', '6', 'TEOS / Nitride'],
                                ['PVD / Sputter', 'Endura Platform', '4', 'Aluminum / Gold'],
                                ['Ion Implanter', 'Axcelis Purion', '3', 'High Current / Energy'],
                                ['Wet Bench', 'Automated Cleaning Statio', '10', 'RCA Clean / BOE'],
                                ['Furnace', 'Vertical Diffusion', '8', 'Oxidation / Drive-in'],
                                ['CMP Polisher', 'Applied Materials Mirra', '3', 'Planarization'],
                                ['Metrology CD-SEM', 'Hitachi SU8000', '2', '1nm resolution'],
                                ['Gas Cabinet', 'Fully Auto, Dual Cylinder', '40', 'Silane, Arsine, Chlorine'],
                                ['Toxic Gas Monitor', 'MDA Scientific / Honeywell', '100+', 'PPB Detection'],
                                ['UPW System', 'RO / DI / UV TOC Reduction', '1', '500 GPM, 18.2 MΩ-cm'],
                                ['Scrubber', 'Point-of-Use Thermal/Wet', '30', '99.99% Abatement'],
                                ['Chiller', 'Process Cooling Water (PCW)', '4', 'Temp Stability ±0.5°C'],
                            ].map(([item, spec, qty, rating]) => (
                                <tr key={item}>
                                    <td className="py-2 px-3 font-medium text-white">{item}</td>
                                    <td className="py-2 px-3 text-gray-400">{spec}</td>
                                    <td className="py-2 px-3">{qty}</td>
                                    <td className="py-2 px-3 text-[#A855F7]">{rating}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* ── 6. Purdue Model Mapping ──────────────────────────────────────── */}
            <Section title="6. Purdue Model Mapping" id="purdue">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left border-collapse">
                        <thead>
                            <tr className="text-gray-500 border-b border-white/[0.08]">
                                <th className="py-2 px-3 font-medium">Level</th>
                                <th className="py-2 px-3 font-medium">Components</th>
                                <th className="py-2 px-3 font-medium">Protocols/Functions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-300 divide-y divide-white/[0.04]">
                            <tr>
                                <td className="py-2 px-3 text-gray-500 font-mono">L4 Enterprise</td>
                                <td className="py-2 px-3">SAP ERP, Oracle</td>
                                <td className="py-2 px-3">Order Mgmt, Yield Analysis</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-3 text-gray-500 font-mono">L3 Operations</td>
                                <td className="py-2 px-3">PROMIS / Camstar (MES)</td>
                                <td className="py-2 px-3">Lot Tracking, Recipe Mgmt</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-3 text-gray-500 font-mono">L2 Control</td>
                                <td className="py-2 px-3">Station Controllers (EAP)</td>
                                <td className="py-2 px-3">SECS/GEM (SEMI E5/E30)</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-3 text-gray-500 font-mono">L1 Device</td>
                                <td className="py-2 px-3">Tool Internal PLCs (VME/CompactPCI)</td>
                                <td className="py-2 px-3">Real-time control loops</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-3 text-gray-500 font-mono">L0 Process</td>
                                <td className="py-2 px-3">MFCs, RF Generators, Throttle Valves</td>
                                <td className="py-2 px-3">DeviceNet, Analog</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* ── 7. Supporting Systems ────────────────────────────────────────── */}
            <Section title="7. Supporting Systems" id="supporting">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left border-collapse">
                        <thead>
                            <tr className="text-gray-500 border-b border-white/[0.08]">
                                <th className="py-2 px-3 font-medium">System</th>
                                <th className="py-2 px-3 font-medium">Description</th>
                                <th className="py-2 px-3 font-medium">Specification</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-300 divide-y divide-white/[0.04]">
                            {[
                                ['UPW', 'Ultra Pure Water Loop', '18.2 MΩ-cm, <1 ppb TOC'],
                                ['Bulk Gases', 'N2, O2, Ar, H2 Supply', '99.9999% Purity (6N)'],
                                ['Specialty Gas', 'Silane, Arsine, Phosphine', 'Double-Walled Tubing'],
                                ['Acid Waste', 'AWN Neutralization System', 'pH Adjustment'],
                                ['Life Safety', 'Toxic Gas Monitoring System (TGMS)', 'Interlocked to Gas Cabinets'],
                            ].map(([sys, desc, spec]) => (
                                <tr key={sys}>
                                    <td className="py-2 px-3 font-medium text-white">{sys}</td>
                                    <td className="py-2 px-3 text-gray-400">{desc}</td>
                                    <td className="py-2 px-3 text-[#A855F7]">{spec}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* ── 8. Utility Flows ─────────────────────────────────────────────── */}
            <Section title="8. Utility Flows" id="utilities">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { medium: 'Nitrogen', spec: 'Liquid N2 / House N2', icon: '❄️' },
                        { medium: 'Vacuum', spec: 'PVAC (Process), HV (House)', icon: '🌀' },
                        { medium: 'Power', spec: 'UPS / Generator Backup', icon: '🔋' },
                    ].map((util) => (
                        <div key={util.medium} className="p-3 rounded-lg border border-white/[0.06] bg-white/[0.02] flex items-center gap-3">
                            <span className="text-xl">{util.icon}</span>
                            <div>
                                <div className="text-xs font-semibold text-white">{util.medium}</div>
                                <div className="text-[10px] text-gray-400">{util.spec}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* ── 9. Data Flow Architecture ────────────────────────────────────── */}
            <Section title="9. Data Flow Architecture" id="data-flow">
                <p className="text-sm text-gray-300 leading-relaxed mb-6">
                    Semiconductor fabs rely on the **SECS/GEM** protocol standard. The MES controls tool processing
                    by selecting recipes and inhibiting operation if parameters drift.
                </p>
                <div className="rounded-lg border border-white/[0.06] p-6 font-mono text-xs text-gray-300 overflow-x-auto bg-white/[0.02]">
                    <pre className="whitespace-pre leading-relaxed">{
                        `[ MES (Host) ] ◄──(SECS-II / GEM)──► [ Equipment Automation Application (EAP) ]
      │                                       │
      │ (Lot Start / Stop)                    │ (Select Recipe)
      ▼                                       ▼
[ Operator GUI ]                      [ Tool Controller (PLC) ]
                                              │
                                              ▼
                                      [ Process Chamber ]
                                      (Readings: Temp, Press, RF)`
                    }</pre>
                </div>
            </Section>

            {/* ── 10. References ───────────────────────────────────────────────── */}
            <Section title="10. References" id="references">
                <ul className="space-y-2 text-xs text-gray-500 font-mono">
                    <li>• SEMI. (2020). <em>SEMI E5/E30: SECS-II and GEM Standards.</em> Semiconductor Equipment and Materials International.</li>
                    <li>• DoD. (2015). <em>Trusted Foundry Program Overview.</em> Defense Microelectronics Activity.</li>
                    <li>• ISO. (2015). <em>ISO 14644-1: Cleanrooms and associated controlled environments.</em></li>
                    <li>• National Academies. (2021). <em>Defense Critical Supply Chain Microelectronics Report.</em></li>
                    <li>• MIL-PRF-38535K. (2018). <em>Integrated Circuits (Microcircuits) Manufacturing, General Specification for.</em></li>
                </ul>
            </Section>

            {/* ── See Also ─────────────────────────────────────────────────────── */}
            <Section title="See Also" id="see-also">
                <div className="flex flex-wrap gap-3">
                    {[
                        { label: 'Defense Sector Hub', href: '/wiki/defense', color: '#64748B' },
                        { label: 'Energy Sector (Critical Infra)', href: '/wiki/energy', color: '#F59E0B' },
                        { label: 'Manufacturing', href: '/wiki/manufacturing', color: '#F97316' },
                    ].map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-white/[0.04]"
                            style={{ borderColor: `${link.color}30`, color: link.color }}
                        >
                            {link.label} →
                        </a>
                    ))}
                </div>
            </Section>
        </div>
    );
}

/** Reusable section component. */
function Section({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
    return (
        <section id={id} className="space-y-4 pt-8 border-t border-white/[0.04]">
            <h2 className="text-lg font-heading font-semibold text-white/90">
                {title}
            </h2>
            {children}
        </section>
    );
}
