/**
 * National Laboratory — Deep Dive Wiki Article.
 *
 * Comprehensive TOGAF-based reference architecture for Department of Energy (DOE)
 * National Laboratories, focusing on high-security research complexes, particle
 * accelerators, research reactors, and supercomputing centers.
 *
 * @module wiki/government/national-laboratory/page
 */

export const metadata = {
    title: 'National Laboratory Reference Architecture — Government Wiki',
    description:
        'TOGAF reference architecture for DOE National Laboratories: research reactors, accelerators, ' +
        'high-performance computing (HPC), and strict safety/security protocols (DOE 420.1C).',
};

export default function NationalLabPage() {
    return (
        <div className="max-w-5xl space-y-10">
            {/* Header */}
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div
                        className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]"
                        style={{ background: '#EF4444' }}
                    />
                    <span className="text-xs font-mono text-gray-500">
                        GOVT · FEDERAL · RESEARCH
                    </span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">
                    National Laboratory
                </h1>
                <p className="text-sm text-gray-500 font-mono">DOE Office of Science · NNSA · High Security</p>
                <p className="text-gray-400 text-base leading-relaxed max-w-3xl">
                    National Laboratories are the crown jewels of government research infrastructure,
                    housing one-of-a-kind multidisciplinary facilities like synchrotron light sources,
                    neutron scattering centers, and exascale supercomputers. These facilities operate
                    under a unique "Government-Owned, Contractor-Operated" (GOCO) model and require
                    extreme rigor in safety (nuclear/radiological/chemical) and security (classified/proprietary)
                    controls per DOE Order 420.1C (DOE, 2019).
                </p>
            </div>

            {/* TOGAF Business Architecture */}
            <Section title="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-300 leading-relaxed">
                    The business architecture is driven by the mission to advance science and technology
                    while maintaining national security. The architecture must support open science for
                    university collaborators while strictly compartmentalizing classified weapons research
                    or proprietary industrial partnership data. This dual-mission requirement creates a
                    complex "Science DMZ" network architecture (ESnet, 2023).
                </p>

                <h3 className="text-sm font-semibold text-white mt-6 mb-2">Stakeholders</h3>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside">
                    <li>Department of Energy (DOE) / NNSA — Funding and oversight</li>
                    <li>Scientific User Facilities (SUF) — Visiting researchers (30,000+/year)</li>
                    <li>Facility Management & Operations (M&O) Contractor</li>
                    <li>Nuclear Regulatory Commission (NRC) — For licensed reactors</li>
                    <li>Counterintelligence & Insider Threat Program</li>
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
                                ['DOE O 420.1C', 'Facility Safety: Nuclear safety design, fire protection, natural phenomena hazards'],
                                ['DOE O 470.4B', 'Safeguards and Security Program: Physical protection, material control & accountability'],
                                ['10 CFR 835', 'Occupational Radiation Protection'],
                                ['NIST SP 800-53', 'Security and Privacy Controls for Federal Information Systems'],
                                ['ISC Standards', 'Physical Security Criteria for Federal Facilities (FSL IV/V)'],
                            ].map(([standard, scope]) => (
                                <tr key={standard} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#EF4444] font-medium whitespace-nowrap">{standard}</td>
                                    <td className="px-3 py-2 text-gray-400">{scope}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* High-Level Design */}
            <Section title="2. High-Level Design" id="high-level-design">
                <p className="text-sm text-gray-300 leading-relaxed">
                    The high-level design features a <span className="text-[#EF4444] font-medium">campus-style
                        microgrid</span> distribution system for power reliability (5-nines) and a
                    <span className="text-[#EF4444] font-medium">zoned security architecture</span>.
                    The network is segmented into a high-speed "Science DMZ" for massive data transfer
                    (petabytes/day) and an air-gapped "Red Network" for classified operations.
                </p>

                <h3 className="text-sm font-semibold text-white mt-6 mb-2">Campus Zoning Diagram</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`Public Zone (Visitor Center)
      │
      ▼
General Access Zone (Offices, Cafeteria) ──► Corporate Network
      │
      ▼
Limited Area (Research Labs, Light Source) ──► Science DMZ (100G/400G)
      │
      ▼
Exclusion Area (Reactor, Weapons Material) ──► Air-Gapped / SCIF Network
      │
      ▼
Critical Infrastructure (Central Plant, Substation)`}</pre>
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">
                    Figure 1. Conveyance of security zones from public access to exclusion areas,
                    mirroring the graded approach to security in DOE O 470.4B.
                </p>
            </Section>

            {/* Detailed Technical Description */}
            <Section title="3. Detailed Technical Description" id="technical">
                {/* 3.1 Research Systems */}
                <h3 className="text-base font-semibold text-white mt-2 mb-2">3.1 Research Systems (accelerators & Reactors)</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    Major scientific instruments (Light Sources, Spallation Neutron Sources) utilize
                    <span className="text-[#EF4444] font-medium">EPICS (Experimental Physics and Industrial Control System)</span>
                    for real-time distributed control. These systems require microsecond synchronization
                    for magnets, RF cavities, and beamline shutters.
                </p>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside mt-2">
                    <li><span className="text-white">Vacuum Systems</span> — Ion pumps, turbomolecular pumps, gate valves (10⁻⁹ Torr)</li>
                    <li><span className="text-white">Cryogenics</span> — Liquid Helium utilization for superconducting magnets</li>
                    <li><span className="text-white">RF Systems</span> — Klystrons, solid-state amplifiers for particle acceleration</li>
                    <li><span className="text-white">Personnel Safety Systems (PSS)</span> — Redundant PLC interlocks for radiation safety (SIL 3)</li>
                </ul>

                {/* 3.2 HPC Infrastructure */}
                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.2 Exascale Computing Infrastructure</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    Supercomputing centers (e.g., Summit, Frontier, Aurora) require massive power
                    (20–60 MW) and liquid cooling infrastructure.
                </p>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside mt-2">
                    <li><span className="text-white">Warm Water Cooling</span> — Direct-to-chip cooling loops (32°C supply) to maximize efficiency (PUE &lt; 1.03)</li>
                    <li><span className="text-white">Power Distribution</span> — 12.47 kV internal loop to 480V/415V Switched PDUs</li>
                    <li><span className="text-white">Storage</span> — Lustre / GPFS parallel file systems on NVMe arrays</li>
                </ul>

                {/* 3.3 Building Automation */}
                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.3 Lab Automation & Safety</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    Laboratory spaces utilize fast-acting VAV controls for fume hood containment
                    (Venturi valves) and room pressurization sequences to prevent cross-contamination.
                    Gas detection systems monitor for O₂ depletion, H₂, and specific toxic gases.
                </p>
            </Section>

            {/* Process Diagrams */}
            <Section title="4. Process Diagrams" id="process-diagrams">
                {/* 4.1 Beamline Control */}
                <h3 className="text-sm font-semibold text-white mb-2">4.1 Architecture: Particle Accelerator Control (EPICS)</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`Operator Interface (OPI) ──► Channel Access (CA/PVA) Network
           │
           ▼
Input/Output Controller (IOC) [VME/uTCA Chassis]
           │
           ├──► Timing System (Event Generator) ──► Fiber Pulse ──► Event Receivers
           │
           ├──► Analog I/O ──► Magnet Power Supplies (0-1000A)
           │
           └──► Motion Control ──► Stepper Motors (Beam Slits/Mirrors)`}</pre>
                </div>

                {/* 4.2 Lab Safety */}
                <h3 className="text-sm font-semibold text-white mt-8 mb-2">4.2 Laboratory Ventilation Control</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`Fume Hood Sash Sensor (0-100%)
           │
           ▼
Venturi Valve Controller ──► Exhaust Valve Actuator (<1s response)
           │
           ├──► General Exhaust Valve (Tracking)
           │
           └──► Makeup Air Valve (Tracking)
           │
           ▼
Building BMS (BACnet) ──► AHU VFD Speed Reference`}</pre>
                </div>
            </Section>

            {/* Bill of Materials */}
            <Section title="5. Bill of Materials" id="bom">
                <p className="text-sm text-gray-400 mb-3 italic">
                    Representative BOM for a multi-program science building.
                </p>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Equipment Type</th>
                                <th className="text-left px-3 py-2 font-medium">Specification</th>
                                <th className="text-right px-3 py-2 font-medium">Qty</th>
                                <th className="text-left px-3 py-2 font-medium">Standard</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Venturi Valves', 'High-speed air control, pressure independent', '200+', 'ANSI Z9.5'],
                                ['Exhaust Fans', 'High-plume dilution fans (Strobic)', '6', 'AMCA 210'],
                                ['Lab Gas Manifolds', 'Auto-changeover, purity monitoring', '40', 'NFPA 55'],
                                ['Research Power', 'Isolated ground, clean power busway', '2000 ft', 'NEC Art 645'],
                                ['EPICS IOCs', 'VMEbus or MicroTCA chassis', '50', 'IEEE 1588 PTP'],
                                ['Rad. Monitors', 'Area Gamma/Neutron detectors', '150', '10 CFR 835'],
                                ['Access Control', 'PIV-I readers, biometric iris scanners', '80', 'FIPS 201-2'],
                                ['Vacuum Pumps', 'Turbomolecular, mag-lev', '60', 'ISO 3529'],
                                ['Cryostats', 'Liquid Nitrogen/Helium dewars', '20', 'ASME BPVC'],
                            ].map(([equip, spec, qty, std]) => (
                                <tr key={equip} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-gray-300 font-medium">{equip}</td>
                                    <td className="px-3 py-2 text-gray-400">{spec}</td>
                                    <td className="px-3 py-2 text-right text-emerald-500/80 font-mono">{qty}</td>
                                    <td className="px-3 py-2 text-gray-400">{std}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* Purdue Model */}
            <Section title="6. Purdue Model Mapping" id="purdue">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Level</th>
                                <th className="text-left px-3 py-2 font-medium">Components</th>
                                <th className="text-left px-3 py-2 font-medium">Protocols</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Level 0 — Process', 'Vacuum gauges, beam stops, RF cavities, magnets', 'Analog, Pulse, 0-10V'],
                                ['Level 1 — Control', 'EPICS IOCs, Siemens S7-1500 PLCs (Safety)', 'EtherCAT, Profinet'],
                                ['Level 2 — Supervisory', 'Control Room OPIs, Alarm Server, Archiver', 'Channel Access (CA), PVAccess'],
                                ['Level 3 — Ops/Science', 'HPC Clusters, Data Analysis (JupyterHub), LIMS', 'Globus, HTTPS, NFS'],
                                ['Level 3.5 — DMZ', 'Science DMZ, Data Transfer Nodes (DTNs)', 'PerfSONAR, GridFTP'],
                                ['Level 4 — Enterprise', 'DOECOE (Common Operating Env), ERP', 'Business Apps'],
                            ].map(([level, components, protocols]) => (
                                <tr key={level} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#EF4444] font-medium whitespace-nowrap">{level}</td>
                                    <td className="px-3 py-2 text-gray-300">{components}</td>
                                    <td className="px-3 py-2 text-gray-400">{protocols}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* References */}
            <Section title="References" id="references">
                <div className="space-y-2 text-xs text-gray-400 leading-relaxed">
                    <p>Department of Energy. (2019). <em>Order 420.1C, Facility Safety</em>. Washington, D.C.: DOE.</p>
                    <p>ESnet. (2023). <em>The Science DMZ: A Network Design Pattern for Data-Intensive Science</em>. Energy Sciences Network.</p>
                    <p>Argonne National Laboratory. (2022). <em>APS Upgrade Project: Preliminary Design Report</em>. ANL.</p>
                    <p>Oak Ridge National Laboratory. (2021). <em>Frontier: The World's First Exascale Computer</em>. ORNL.</p>
                </div>
            </Section>

            {/* See Also */}
            <Section title="See Also" id="see-also">
                <div className="flex flex-wrap gap-2">
                    {[
                        { href: '/wiki/government', label: 'Government Hub', color: '#64748B' },
                        { href: '/wiki/government/university-campus', label: 'University Campus', color: '#F59E0B' },
                        { href: '/wiki/sectors/ITEC', label: 'IT Sector (HPC)', color: '#8B5CF6' },
                    ].map((link) => (
                        <a
                            key={link.href}
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
        <section id={id} className="space-y-4">
            <h2 className="text-xl font-heading font-semibold text-white">{title}</h2>
            {children}
        </section>
    );
}
