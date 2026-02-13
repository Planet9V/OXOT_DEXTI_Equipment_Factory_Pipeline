/**
 * University Campus — Deep Dive Wiki Article.
 *
 * Comprehensive TOGAF-based reference architecture for Public Research Universities,
 * focusing on district energy systems, laboratory safety (ANSI Z9.5), and open-campus
 * security (Clery Act compliance).
 *
 * @module wiki/government/university-campus/page
 */

export const metadata = {
    title: 'University Campus Reference Architecture — Government Wiki',
    description:
        'TOGAF reference architecture for Research Universities: district energy plants, ' +
        'mass notification systems, lab safety controls, and open-campus security.',
};

export default function UniversityCampusPage() {
    return (
        <div className="max-w-5xl space-y-10">
            {/* Header */}
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div
                        className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]"
                        style={{ background: '#F59E0B' }}
                    />
                    <span className="text-xs font-mono text-gray-500">
                        GOVT · EDUCATION · RESEARCH
                    </span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">
                    University Campus
                </h1>
                <p className="text-sm text-gray-500 font-mono">Public Research · District Energy · Open Access</p>
                <p className="text-gray-400 text-base leading-relaxed max-w-3xl">
                    Public Research Universities function as small cities, operating their own utility grids
                    (District Energy), police forces, and transportation networks. The architectural challenge
                    is maintaining an "Open Campus" environment while securing critical research assets and
                    ensuring student safety in compliance with the Clery Act (APPA, 2021).
                </p>
            </div>

            {/* TOGAF Business Architecture */}
            <Section title="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-300 leading-relaxed">
                    The business architecture supports the tripartite mission of Teaching, Research, and Service.
                    Infrastructure must be flexible to adapt to changing grant funding and research needs while
                    achieving aggressive carbon neutrality goals (Net Zero) often mandated by university charters.
                </p>

                <h3 className="text-sm font-semibold text-white mt-6 mb-2">Stakeholders</h3>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside">
                    <li>Board of Regents / Trustees</li>
                    <li>Facilities Management (Utilities, Maintenance)</li>
                    <li>Department of Public Safety / Campus Police</li>
                    <li>Research Compliance / EHS (Environmental Health & Safety)</li>
                    <li>Student Body & Faculty</li>
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
                                ['Jeanne Clery Act', 'Campus Security Policy and Crime Statistics Disclosure'],
                                ['APPA TCO', 'Total Cost of Ownership Standard for Higher Education Facilities'],
                                ['NFPA 45', 'Standard on Fire Protection for Laboratories Using Chemicals'],
                                ['ANSI/AIHA Z9.5', 'Laboratory Ventilation standard'],
                                ['ASHRAE 90.1', 'Energy Standard for Buildings (Campus Sustainability)'],
                            ].map(([standard, scope]) => (
                                <tr key={standard} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#F59E0B] font-medium whitespace-nowrap">{standard}</td>
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
                    The campus design centers on a <span className="text-[#F59E0B] font-medium">District Energy Loop</span>
                    connecting a Central Utility Plant (CUP) to hundreds of buildings via underground tunnels.
                    Communications rely on a dedicated <span className="text-[#F59E0B] font-medium">Campus Optical Ring</span>
                    supporting separate VLANS for Eduroam (Academic), BAS (Facilities), and Safety (Police).
                </p>

                <h3 className="text-sm font-semibold text-white mt-6 mb-2">District Energy Topology</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`Central Utility Plant (CUP)
    ├── Power Generation (Cogen / CHP Turbine)
    ├── Steam Boilers (Heating/Sterilization)
    └── Centrifugal Chillers (Thermal Storage Tank)
            │
            ▼
Underground Utility Tunnels (Steam/Chilled Water/High Voltage)
            │
            ├──► Research Labs (High Load Density)
            ├──► Dormitories (Domestic Hot Water)
            └──► Classrooms (Comfort Cooling)`}</pre>
                </div>
            </Section>

            {/* Detailed Technical Description */}
            <Section title="3. Detailed Technical Description" id="technical">
                {/* 3.1 District Energy */}
                <h3 className="text-base font-semibold text-white mt-2 mb-2">3.1 District Energy System (DES)</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    The DES maximizes efficiency through Co-generation (CHP), producing electricity and using
                    waste heat for steam. Thermal Energy Storage (TES) tanks allow chillers to run at night
                    (off-peak) to cool the campus during the day.
                </p>

                {/* 3.2 Mass Notification */}
                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.2 Mass Notification System (MNS)</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    A multi-modal MNS integrates outdoor giant voice sirens, indoor PA systems, SMS/App alerts,
                    and digital signage override to warn of active threats or weather emergencies (NFPA 72).
                </p>

                {/* 3.3 Lab Controls */}
                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.3 Laboratory Environmental Control</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    Critical research validity depends on precise temperature (±0.5°C) and humidity control.
                    Vivarium safeguards include 24/7 monitoring of ammonia levels and light cycles.
                </p>
            </Section>

            {/* Process Diagrams */}
            <Section title="4. Process Diagrams" id="process-diagrams">
                {/* 4.1 CHP Process */}
                <h3 className="text-sm font-semibold text-white mb-2">4.1 Combined Heat & Power (CHP) Loop</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`Natural Gas Supply ──► Gas Turbine Generator (15MW)
                               │
                          Electricity ──► Campus Substation
                               │
                           Exhaust Heat (500°C)
                               │
                               ▼
                    Heat Recovery Steam Generator (HRSG)
                               │
                          High Pressure Steam
                               │
                               ▼
                    Steam Turbine Generator (5MW) or Campus Heating Loop`}</pre>
                </div>

                {/* 4.2 Security Response */}
                <h3 className="text-sm font-semibold text-white mt-8 mb-2">4.2 Blue Light Emergency Phone Logic</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`Event: Student presses Blue Light Button
           │
           ▼
1. Strobe on pole activates (Visual Locator)
2. PTZ Camera on pole snaps to Preset 1 (Face)
3. Two-way Audio opens to Dispatch
           │
           ▼
Dispatcher Dashboard (Map View)
           │
           └──► Nearby Cameras Auto-Populate
           └──► Nearest Patrol Car Vectoring`}</pre>
                </div>
            </Section>

            {/* Bill of Materials */}
            <Section title="5. Bill of Materials" id="bom">
                <p className="text-sm text-gray-400 mb-3 italic">
                    Representative BOM for a major University Central Plant and Campus Safety upgrade.
                </p>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Equipment Type</th>
                                <th className="text-left px-3 py-2 font-medium">Specification</th>
                                <th className="text-right px-3 py-2 font-medium">Qty</th>
                                <th className="text-left px-3 py-2 font-medium">Manufacturer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Centrifugal Chillers', 'Magnetic bearing, variable speed, 2500 Ton', '4', 'York / Trane'],
                                ['Gas Turbine', 'Solar Titan 130 or similar, 15MW', '1', 'Solar Turbines'],
                                ['Steam Boilers', 'Watertube, Dual-fuel (Gas/Oil)', '3', 'Cleaver-Brooks'],
                                ['Blue Light Phones', 'VoIP / Cellular, Solar option', '150', 'Code Blue'],
                                ['Lab Air Valves', 'Venturi high-speed actuation', '500', 'Phoenix Controls'],
                                ['Access Control', 'Wireless locks (WIFI/Zigbee) for dorms', '5,000', 'Salto / Assa Abloy'],
                                ['Mass Notification', 'Giant Voice Arrays, Indoor IP Speakers', 'Total Coverage', 'Whelen / ATI'],
                            ].map(([equip, spec, qty, mfr]) => (
                                <tr key={equip} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-gray-300 font-medium">{equip}</td>
                                    <td className="px-3 py-2 text-gray-400">{spec}</td>
                                    <td className="px-3 py-2 text-right text-emerald-500/80 font-mono">{qty}</td>
                                    <td className="px-3 py-2 text-gray-400">{mfr}</td>
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
                                ['Level 0 — Process', 'Chiller Vanes, Steam Valves, Lab Sash Sensors', '4-20mA, HART'],
                                ['Level 1 — Control', 'Plant PLCs, Building Controllers (BC), Lighting Panels', 'BACnet MSTP, Modbus RTU'],
                                ['Level 2 — Supervisory', 'Plant SCADA, Building JACEs, Lighting Server', 'BACnet/IP, Fox'],
                                ['Level 3 — Operations', 'Campus EMCS (Energy Mgmt), Dispatch CAD, MNS Server', 'HTML5, SQL'],
                                ['Level 4 — Enterprise', 'Room Scheduling (25Live), SIS (Banner/PeopleSoft)', 'REST API, XML'],
                            ].map(([level, components, protocols]) => (
                                <tr key={level} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#F59E0B] font-medium whitespace-nowrap">{level}</td>
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
                    <p>APPA. (2021). <em>Operational Guidelines for Educational Facilities: Maintenance and Operations</em>. APPA.</p>
                    <p>NFPA. (2020). <em>NFPA 45: Standard on Fire Protection for Laboratories Using Chemicals</em>. NFPA.</p>
                    <p>ASHRAE. (2019). <em>HVAC Applications Handbook: Educational Facilities</em>. ASHRAE.</p>
                </div>
            </Section>

            {/* See Also */}
            <Section title="See Also" id="see-also">
                <div className="flex flex-wrap gap-2">
                    {[
                        { href: '/wiki/government', label: 'Government Hub', color: '#64748B' },
                        { href: '/wiki/government/national-laboratory', label: 'National Laboratory', color: '#EF4444' },
                        { href: '/wiki/sectors/ENER', label: 'Energy Sector (Microgrids)', color: '#F59E0B' },
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
