/**
 * Municipal Complex — Deep Dive Wiki Article.
 *
 * Comprehensive TOGAF-based reference architecture for Municipal Complexes
 * (City Hall, Courthouses, Emergency Services), focusing on open governance
 * balanced with physical security (FEMA 426) and resilience.
 *
 * @module wiki/government/municipal-complex/page
 */

export const metadata = {
    title: 'Municipal Complex Reference Architecture — Government Wiki',
    description:
        'TOGAF reference architecture for City Halls and Courthouses: integrated BMS, physical security ' +
        '(PACS/VMS), emergency power, and GSA P100/FEMA 426 compliance.',
};

export default function MunicipalComplexPage() {
    return (
        <div className="max-w-5xl space-y-10">
            {/* Header */}
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div
                        className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]"
                        style={{ background: '#3B82F6' }}
                    />
                    <span className="text-xs font-mono text-gray-500">
                        GOVT · STATE/LOCAL · CIVIC
                    </span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">
                    Municipal Complex
                </h1>
                <p className="text-sm text-gray-500 font-mono">City Hall · Courthouse · EOC · Smart City Hub</p>
                <p className="text-gray-400 text-base leading-relaxed max-w-3xl">
                    Municipal Complexes serve as the administrative heart of local government, often co-locating
                    executive offices (Mayoral/Council), judicial functions (Courts), and emergency response
                    (911/EOC). These facilities must balance "Open Government" transparency with stringent
                    physical security requirements to protect public officials and critical records (FEMA 426, 2011).
                </p>
            </div>

            {/* TOGAF Business Architecture */}
            <Section title="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-300 leading-relaxed">
                    The business architecture focuses on <span className="text-[#3B82F6] font-medium">Continuity of Government (COG)</span>
                    and efficient citizen service delivery. The facility acts as a "Smart City" command center,
                    integrating data from distributed municipal assets (traffic, utilities, public safety) into
                    a unified operational view.
                </p>

                <h3 className="text-sm font-semibold text-white mt-6 mb-2">Stakeholders</h3>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside">
                    <li>City Administration / County Government</li>
                    <li>Judicial System (Judges, Clerks, Marshals)</li>
                    <li>Law Enforcement / Emergency Management</li>
                    <li>General Public (Citizens, Jurors, Visitors)</li>
                    <li>Facility Management (Public Works)</li>
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
                                ['FEMA 426', 'Risk Management Series: Site Design/Blast Mitigation'],
                                ['GSA P100', 'Facilities Standards for the Public Buildings Service (Tier 1-4)'],
                                ['NFPA 1221', 'Standard for Installation, Maintenance, and Use of Emergency Services Communications Systems'],
                                ['ADA (2010)', 'Americans with Disabilities Act Standards for Accessible Design'],
                                ['LEED v4.1', 'Leadership in Energy and Environmental Design (Civic Buildings)'],
                            ].map(([standard, scope]) => (
                                <tr key={standard} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#3B82F6] font-medium whitespace-nowrap">{standard}</td>
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
                    The design emphasizes <span className="text-[#3B82F6] font-medium">layered security</span>.
                    Designated zones separate public areas (lobbies, council chambers) from restricted zones
                    (judges' chambers, evidence storage, server rooms). This is enforced via physical architecture
                    (CPTED) and electronic access control.
                </p>

                <h3 className="text-sm font-semibold text-white mt-6 mb-2">Security Zoning Concept</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`Zone 1: Public (Unscreened) ──► Plaza, Exterior Parking
          │
          ▼
    [Security Screening Checkpoint (X-Ray/Magnetometer)]
          │
          ▼
Zone 2: Public (Screened) ──► Lobby, Tax Specialist, Council Chamber
          │
          ▼
Zone 3: Restricted ──► Staff Offices, Courtrooms (Staff Area)
          │
          ▼
Zone 4: Secure ──► Holding Cells, Evidence Room, EOC, Server Room`}</pre>
                </div>
            </Section>

            {/* Detailed Technical Description */}
            <Section title="3. Detailed Technical Description" id="technical">
                {/* 3.1 Integrated Security */}
                <h3 className="text-base font-semibold text-white mt-2 mb-2">3.1 Integrated Security System (ISS)</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    The ISS unifies Access Control (PACS), Video Surveillance (VMS), and Intrusion Detection (IDS)
                    into a Physical Security Information Management (PSIM) platform.
                </p>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside mt-2">
                    <li><span className="text-white">PACS</span> — HSPD-12 compliant readers (PIV/CAC capable) for staff; visitor management system for public.</li>
                    <li><span className="text-white">VMS</span> — IP Cameras with AI analytics (Loitering, Object Left Behind) per ONVIF Profile S/T.</li>
                    <li><span className="text-white">Duress Alarms</span> — Under-desk buttons in courtrooms and service counters linked to dispatch.</li>
                </ul>

                {/* 3.2 Building Management */}
                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.2 Building Management System (BMS)</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    A BACnet-native BMS controls HVAC, lighting, and energy metering. In modern "Smart City"
                    implementations, this extends to grid-interactive efficient building (GEB) capabilities,
                    allowing the complex to shed load during grid peaks.
                </p>

                {/* 3.3 Emergency Operations */}
                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.3 Emergency Operations Center (EOC)</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    The EOC requires hardened infrastructure for 24/7 sustained operations during disasters.
                </p>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside mt-2">
                    <li><span className="text-white">Power</span> — N+1 Generators with 72-hour fuel storage (Type 10, Level 1 per NFPA 110).</li>
                    <li><span className="text-white">Comms</span> — Redundant fiber, satellite uplink, and Land Mobile Radio (LMR) integration.</li>
                    <li><span className="text-white">HVAC</span> — CBRN (Chemical, Biological, Radiological, Nuclear) filtration mode.</li>
                </ul>
            </Section>

            {/* Process Diagrams */}
            <Section title="4. Process Diagrams" id="process-diagrams">
                {/* 4.1 Security Logic */}
                <h3 className="text-sm font-semibold text-white mb-2">4.1 Security Automation Logic</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`Event: Duress Alarm Triggered (Courtroom 3)
           │
           ▼
PSIM Workflow Engine
           │
           ├──► Dispatch: Auto-notify Sheriff/Police (Radio/Text)
           │
           ├──► PACS: Lock Courtroom Doors (Maglocks energized)
           │
           ├──► VMS: Pop-up Live Feed on Security Desk Video Wall
           │
           └──► PA System: Mute ambient music/paging in zone`}</pre>
                </div>

                {/* 4.2 HVAC Control */}
                <h3 className="text-sm font-semibold text-white mt-8 mb-2">4.2 HVAC Control: Council Chambers (Variable Occupancy)</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`CO2 Sensors (Return Air) + Occupancy Count (Door Camera)
           │
           ▼
BMS Logic (Demand Control Ventilation)
           │
           ├──► IF CO2 > 800ppm OR People > 50:
           │       Increase Outside Air Damper Position (0-100%)
           │
           ├──► IF Meeting In Progress (AV System Link):
           │       Cap VAV Box Max Airflow (Noise Control)
           │
           └──► IF Unoccupied > 60min:
                   Setback Temp Setpoints (+/- 4°F)`}</pre>
                </div>
            </Section>

            {/* Bill of Materials */}
            <Section title="5. Bill of Materials" id="bom">
                <p className="text-sm text-gray-400 mb-3 italic">
                    Representative BOM for a mid-sized Municipal Complex (City Hall + Courts).
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
                                ['X-Ray Scanner', 'Dual-energy tunnel scanner (6040)', '2', 'TSA/ANSI'],
                                ['Magnetometer', 'Walk-through metal detector (WTMD)', '2', 'NIJ 0601.02'],
                                ['Access Controller', 'Intelligent field panel (32-door)', '8', 'UL 294'],
                                ['Card Readers', 'Multi-tech smart card (13.56 MHz)', '150', 'SIA OSDP'],
                                ['IP Cameras', '5MP dome, WDR, IR illuminator', '80', 'ONVIF Profile S'],
                                ['Video Server', '64TB RAID 6 NVR', '2', 'NDAA Compliant'],
                                ['Generator', 'Diesel 500kW, Tier 4 Final', '1', 'NFPA 110'],
                                ['BMS Server', 'Enterprise Application Server', '1', 'BACnet B-AWS'],
                                ['VAV Boxes', 'Digital control w/ reheat', '120', 'AHRI 880'],
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
                                ['Level 0 — Field', 'VAV Actuators, Maglocks, Door Contacts, Temp Sensors', 'Analog (4-20mA), 24VAC'],
                                ['Level 1 — Automation', 'BMS Controllers, Security Panels (ACP), Fire Alarm Panel', 'MSTP, OSDP, SLC'],
                                ['Level 2 — Integration', 'BMS JACE/Router, PSIM Integration Server', 'BACnet/IP, LonWorks'],
                                ['Level 3 — Management', 'BMS Workstation, Video Wall Controller, Badging Station', 'HTTPS, H.264/H.265'],
                                ['Level 3.5 — DMZ', 'Remote Access Gateway, Public WiFi Firewall', 'VPN, TLS 1.2'],
                                ['Level 4 — Enterprise', 'City ERP, GIS Server, Court Case Management', 'SQL, REST API'],
                            ].map(([level, components, protocols]) => (
                                <tr key={level} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#3B82F6] font-medium whitespace-nowrap">{level}</td>
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
                    <p>FEMA. (2011). <em>Reference Manual to Mitigate Potential Terrorist Attacks Against Buildings (FEMA 426)</em>. DHS.</p>
                    <p>GSA. (2021). <em>P100: Facilities Standards for the Public Buildings Service</em>. General Services Administration.</p>
                    <p>Interagency Security Committee. (2021). <em>The Risk Management Process for Federal Facilities</em>. DHS.</p>
                    <p>NFPA. (2022). <em>NFPA 110: Standard for Emergency and Standby Power Systems</em>. National Fire Protection Association.</p>
                </div>
            </Section>

            {/* See Also */}
            <Section title="See Also" id="see-also">
                <div className="flex flex-wrap gap-2">
                    {[
                        { href: '/wiki/government', label: 'Government Hub', color: '#64748B' },
                        { href: '/wiki/government/national-monument', label: 'National Monument', color: '#10B981' },
                        { href: '/wiki/sectors/EMER', label: 'Emergency Services', color: '#DC2626' },
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
