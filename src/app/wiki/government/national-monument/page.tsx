/**
 * National Monument — Deep Dive Wiki Article.
 *
 * Comprehensive TOGAF-based reference architecture for National Monuments
 * and Memorials, focusing on historic preservation, visitor screening (NPS-28),
 * and anti-terrorism force protection (ATFP).
 *
 * @module wiki/government/national-monument/page
 */

export const metadata = {
    title: 'National Monument Reference Architecture — Government Wiki',
    description:
        'TOGAF reference architecture for National Monuments: preservation HVAC, visitor screening, ' +
        'structural health monitoring, and perimeter security (ATFP).',
};

export default function NationalMonumentPage() {
    return (
        <div className="max-w-5xl space-y-10">
            {/* Header */}
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div
                        className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]"
                        style={{ background: '#10B981' }}
                    />
                    <span className="text-xs font-mono text-gray-500">
                        GOVT · FEDERAL · HERITAGE
                    </span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">
                    National Monument
                </h1>
                <p className="text-sm text-gray-500 font-mono">NPS · Historic Preservation · Icon Security</p>
                <p className="text-gray-400 text-base leading-relaxed max-w-3xl">
                    National Monuments are high-visibility targets requiring a delicate balance between
                    public accessibility and robust protection against vandalism or terrorism. The architecture
                    integrates "invisible" security measures into historic fabric, adhering to the Secretary
                    of the Interior's Standards for the Treatment of Historic Properties (NPS-28).
                </p>
            </div>

            {/* TOGAF Business Architecture */}
            <Section title="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-300 leading-relaxed">
                    The primary business goal is <span className="text-[#10B981] font-medium">Interpretation and Education</span>
                    ensuring the site remains accessible to millions of visitors annually. This is supported by
                    a secondary goal of <span className="text-[#10B981] font-medium">Asset Preservation</span>,
                    preventing degradation of historic structures through environmental control and physical security.
                </p>

                <h3 className="text-sm font-semibold text-white mt-6 mb-2">Stakeholders</h3>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside">
                    <li>National Park Service (NPS)</li>
                    <li>U.S. Park Police (USPP)</li>
                    <li>State Historic Preservation Office (SHPO)</li>
                    <li>Tourists / General Public</li>
                    <li>Concessionaires (Retail/Food)</li>
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
                                ['NPS-28', 'Cultural Resource Management Guideline (Historic Fabric)'],
                                ['DOI 50', 'Department of Interior Physical Security Policy'],
                                ['UFAS', 'Uniform Federal Accessibility Standards (ADA Compliance)'],
                                ['NPS RM-50B', 'Occupational Safety and Health Program'],
                                ['NEPA', 'National Environmental Policy Act (Impact Statements)'],
                            ].map(([standard, scope]) => (
                                <tr key={standard} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#10B981] font-medium whitespace-nowrap">{standard}</td>
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
                    The design utilizes a <span className="text-[#10B981] font-medium">Screening Facility</span>
                    located at the perimeter (stand-off distance) to prevent threats from reaching the Icon.
                    Inside the monument, <span className="text-[#10B981] font-medium">Preservation HVAC</span> maintains
                    stable setpoints to prevent mold or stone deterioration.
                </p>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`Visitor Arrival Center (Screening)
      │
      ▼
   Secure Transport / Walkway (CCTV Monitored)
      │
      ▼
   Monument Plaza (Crash Rated Bollards - K12)
      │
      ▼
   Monument Interior (Ticket Scanning)
      │
      ├──► Elevator / Stairs (Capacity Control)
      │
      └──► Observation Deck (Safety Glass)`}</pre>
                </div>
            </Section>

            {/* Detailed Technical Description */}
            <Section title="3. Detailed Technical Description" id="technical">
                {/* 3.1 Visitor Screening */}
                <h3 className="text-base font-semibold text-white mt-2 mb-2">3.1 Visitor Screening (Airport Style)</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    High-throughput screening lanes process 1000+ visitors/hour using X-ray baggage scanners
                    and Walk-Through Metal Detectors (WTMD). Explosive Trace Detection (ETD) is used for
                    random secondary screening.
                </p>

                {/* 3.2 Preservation HVAC */}
                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.2 Preservation HVAC</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    Climate control is critical for artifact preservation. Systems maintain relative humidity (RH)
                    within tight bands (e.g., 50% ±5%) to prevent hygroscopic stress on materials.
                    Sensors are often wireless to avoid drilling into historic stone.
                </p>
            </Section>

            {/* Process Diagrams */}
            <Section title="4. Process Diagrams" id="process-diagrams">
                {/* 4.1 Screening Flow */}
                <h3 className="text-sm font-semibold text-white mb-2">4.1 Visitor Access Control Flow</h3>
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`Visitor enters Queue ──► Ticket Validation (QR Code)
          │
          ▼
Divestment Station (Phones/Keys to Bowl)
          │
          ├──► Person ──► WTMD Archway ──► CLEAR
          │                 │ (Alarm)
          │                 ▼
          │              Hand Wand / Pat Down
          │
          └──► Bag ──► X-Ray Belt (6040) ──► CLEAR
                          │ (Threat)
                          ▼
                       ETD Swab / LEO Intervention`}</pre>
                </div>
            </Section>

            {/* Bill of Materials */}
            <Section title="5. Bill of Materials" id="bom">
                <p className="text-sm text-gray-400 mb-3 italic">
                    Representative BOM for a National Monument visitor center.
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
                                ['Hydraulic Bollards', 'K12/M50 Crash Rated, Retractable', '12', 'ASTM F2656'],
                                ['CCTV Cameras', 'Thermal/Visual dual-sensor (Perimeter)', '20', 'ONVIF Profile S'],
                                ['Lidar Sensors', 'Perimeter intrusion detection', '8', 'IEC 60825'],
                                ['Humidity Sensors', 'Wireless EnOcean/Zigbee, ±2% RH', '50', 'NIST Traceable'],
                                ['X-Ray Systems', 'Dual View, 160kV generator', '4', 'TSA Certified'],
                                ['LED Lighting', 'Variable Color Temp (Tunable White)', '200', 'IES Design Guide'],
                                ['Ticket Kiosks', 'Outdoor rated, sunlight readable', '10', 'IP65'],
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
                                ['Level 0 — Field', 'Bollard Hydraulics, Temp/RH Sensors, Lighting Drivers', '24VDC, DALI'],
                                ['Level 1 — Control', 'Bollard PLC, Lighting Controller, HVAC Controller', 'Modbus TCP, BACnet'],
                                ['Level 2 — Integration', 'Site BMS, Physical Security Server', 'BACnet/IP, HTTPS'],
                                ['Level 3 — Ops', 'Security Workstation, Ticketing Server', 'RDP, HTML5'],
                                ['Level 4 — Enterprise', 'Rec.gov Booking System, NPS Asset Management', 'CLOUD API'],
                            ].map(([level, components, protocols]) => (
                                <tr key={level} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#10B981] font-medium whitespace-nowrap">{level}</td>
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
                    <p>National Park Service. (2002). <em>NPS-28: Cultural Resource Management Guideline</em>. NPS.</p>
                    <p>Department of the Interior. (2019). <em>Departmental Manual Part 444: Physical Protection and Facility Security</em>. DOI.</p>
                    <p>Illuminating Engineering Society. (2017). <em>Lighting for Museums and Art Galleries (ANSI/IES RP-30-17)</em>. IES.</p>
                </div>
            </Section>

            {/* See Also */}
            <Section title="See Also" id="see-also">
                <div className="flex flex-wrap gap-2">
                    {[
                        { href: '/wiki/government', label: 'Government Hub', color: '#64748B' },
                        { href: '/wiki/government/municipal-complex', label: 'Municipal Complex', color: '#3B82F6' },
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
