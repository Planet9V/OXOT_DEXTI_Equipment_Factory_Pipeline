import ManufacturingStepSection from './ManufacturingStepSection';

/**
 * Critical Manufacturing Sector Reference Architecture — Wiki Hub Page.
 *
 * Comprehensive overview of the CISA Critical Manufacturing Sector,
 * serving as the entry point to 7 detailed facility-type articles covering
 * Integrated Steel Mill, Aluminum Smelter, Automotive Assembly, Semiconductor Fab,
 * Aerospace Manufacturing, Heavy Equipment Plant, and Power Transformer Factory.
 *
 * Based on TOGAF ADM with ISA-95/Purdue Model, ISA/IEC 62443 cybersecurity,
 * and sector-specific standards from DHS/CISA, OSHA, EPA, and FAA.
 *
 * @module wiki/critical-manufacturing/page
 */

export const metadata = {
    title: 'Critical Manufacturing Sector Reference Architecture — Wiki',
    description: 'TOGAF-based reference architectures for 7 critical manufacturing facility types: steel mill, aluminum smelter, automotive assembly, semiconductor fab, aerospace, heavy equipment, transformer factory.',
};

/** Facility type cards with routing. */
const FACILITY_ARTICLES = [
    { title: 'Integrated Steel Mill', subtitle: 'Primary Metals · CMAN-PM-STEEL', href: '/wiki/critical-manufacturing/steel-mill', icon: '🔥', color: '#EF4444', description: 'Blast furnace ironmaking, BOF steelmaking, continuous casting, hot/cold rolling. 2–10+ MTPA capacity.', tags: ['BF/BOF', 'Continuous Casting', 'Level 2 Automation', 'NFPA 86'] },
    { title: 'Aluminum Smelter', subtitle: 'Primary Metals · CMAN-PM-ALUM', href: '/wiki/critical-manufacturing/aluminum-smelter', icon: '⚡', color: '#F59E0B', description: 'Hall-Héroult electrolytic reduction, 100–500 pots at 960°C, anode baking, fume treatment, casthouse.', tags: ['Electrolysis', 'Potline', '13–16 kWh/kg', 'FTC/Scrubber'] },
    { title: 'Automotive Assembly', subtitle: 'Transportation Equipment · CMAN-TE-AUTO', href: '/wiki/critical-manufacturing/automotive-assembly', icon: '🚗', color: '#3B82F6', description: 'Stamping, body-in-white welding, paint (E-coat + topcoat), general assembly. 60+ JPH.', tags: ['Robotic Welding', 'E-coat', 'IATF 16949', 'Andon/MES'] },
    { title: 'Semiconductor Fab', subtitle: 'Electrical Equipment · CMAN-EE-FAB', href: '/wiki/critical-manufacturing/semiconductor-fab', icon: '🔬', color: '#8B5CF6', description: 'ISO 5 cleanroom, EUV/DUV lithography, etch/deposition, CMP, AMHS/OHT automation.', tags: ['EUV Litho', 'SECS/GEM', 'ISO 14644', 'APC/FDC'] },
    { title: 'Aerospace Manufacturing', subtitle: 'Transportation Equipment · CMAN-TE-AERO', href: '/wiki/critical-manufacturing/aerospace', icon: '✈️', color: '#06B6D4', description: 'Composite layup/autoclave, 5-axis CNC, NDT inspection, systems integration, flight-line.', tags: ['AS9100', 'NADCAP', 'AFP/ATL', 'Digital Thread'] },
    { title: 'Heavy Equipment Plant', subtitle: 'Machinery · CMAN-MA-HEAVY', href: '/wiki/critical-manufacturing/heavy-equipment', icon: '🏗️', color: '#10B981', description: 'Horizontal boring, robotic welding, shot blast, heat treatment, paint, final assembly/test.', tags: ['CNC Boring', 'AWS D1.1', 'Dynamometer', 'MTConnect'] },
    { title: 'Power Transformer Factory', subtitle: 'Electrical Equipment · CMAN-EE-TRANS', href: '/wiki/critical-manufacturing/transformer-factory', icon: '🔌', color: '#EC4899', description: 'Core cutting/stacking, winding, insulation, vacuum drying, oil filling, impulse/routine testing.', tags: ['IEEE C57.12', 'IEC 60076', 'BIL Test', 'Vacuum Oven'] },
];

export default function CriticalManufacturingHubPage() {
    return (
        <div className="max-w-7xl space-y-12">
            {/* 4-Step Sector Architecture Viewer */}
            <ManufacturingStepSection />

            {/* Separator between step viewer and TOGAF reference */}
            <div className="border-t border-white/[0.06] pt-12">
                <h2 className="text-lg font-heading font-semibold text-gray-500 mb-8">
                    📖 Full TOGAF Reference Architecture
                </h2>
            </div>

            {/* Header */}
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)' }}>🏭</div>
                    <div>
                        <span className="text-[10px] text-gray-500 font-mono block">CISA Sector 04 · MANU · DHS/CISA SRMA</span>
                        <h1 className="text-3xl font-heading font-bold text-white">Critical Manufacturing Sector</h1>
                    </div>
                </div>
            </div>

            {/* Executive Summary */}
            <Section title="Executive Summary" id="summary">
                <p className="text-gray-300 text-sm leading-relaxed">The Critical Manufacturing sector encompasses industries whose disruption could cripple national defense, economic stability, and essential supply chains. Designated under Presidential Policy Directive 21 (PPD-21) and managed by DHS/CISA, this sector spans four major sub-sectors: <span className="text-[#F97316] font-medium">Primary Metals</span> (NAICS 331—steel, aluminum, copper, titanium), <span className="text-[#F97316] font-medium">Machinery Manufacturing</span> (NAICS 333—earth-moving, turbines, industrial equipment), <span className="text-[#F97316] font-medium">Electrical Equipment &amp; Components</span> (NAICS 335—transformers, semiconductors, switchgear), and <span className="text-[#F97316] font-medium">Transportation Equipment</span> (NAICS 336—automotive, aerospace, shipbuilding).</p>
                <p className="text-gray-300 text-sm leading-relaxed">These facilities are characterized by high capital intensity, extended process cycles, and complex automation architectures combining legacy fieldbus networks (Profibus, DeviceNet) with modern Industrial Ethernet (Profinet, EtherCAT). Cybersecurity is particularly critical: a compromised steel mill PLC can cause uncontrolled molten metal release; a semiconductor fab recipe alteration can corrupt an entire wafer lot worth millions. The convergence of IT/OT networks, increasing adoption of IoT sensors, and supply-chain interdependencies demand rigorous ISA/IEC 62443 zone segmentation and defense-in-depth strategies aligned with NIST SP 800-82.</p>
                <p className="text-gray-300 text-sm leading-relaxed">The following 7 reference architectures cover the full spectrum from 2,000°C blast furnaces and sub-nanometer lithography to 500-robot automotive body shops and 2,000 kV impulse test generators, providing TOGAF-aligned blueprints for each facility&apos;s automation, safety, and data architectures.</p>
            </Section>

            {/* Value Chain */}
            <Section title="Critical Manufacturing Value Chain" id="value-chain">
                <Ascii>{`┌─────────────────────────────────────────────────────────────────────────────┐
│                    CRITICAL MANUFACTURING VALUE CHAIN                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  RAW MATERIALS        PRIMARY METALS        COMPONENT MFG        ASSEMBLY    │
│  ━━━━━━━━━━━━        ━━━━━━━━━━━━━━        ━━━━━━━━━━━━━        ━━━━━━━━━  │
│  Iron ore ──────► Steel Mill ──────► CNC Machining ──────► Automotive      │
│  Bauxite ───────► Al Smelter ──────► Transformer Fac ──► Aerospace        │
│  Silica ────────► Wafer Ingot ─────► Semiconductor ───► Electronics       │
│                                      Heavy Equipment ──► Defense/Mining    │
│                                                                              │
│  SUPPORT INFRASTRUCTURE                                                      │
│  ━━━━━━━━━━━━━━━━━━━━━━                                                     │
│  Electric Power (10 MW – 1 GW) │ Process Water │ Gas Supply │ Rail/Port     │
│                                                                              │
│  DIGITAL THREAD                                                              │
│  ━━━━━━━━━━━━━━                                                             │
│  CAD/CAE ──► PLM ──► MES ──► ERP ──► Supply Chain ──► Field Service        │
└─────────────────────────────────────────────────────────────────────────────┘`}</Ascii>
            </Section>

            {/* Methodology */}
            <Section title="Methodology &amp; Frameworks" id="methodology">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                        { title: 'TOGAF ADM', description: 'Architecture Development Method providing the structured framework for each facility reference architecture.', color: '#F97316' },
                        { title: 'ISA-95 / Purdue Model', description: 'Five-level automation hierarchy (L0–L4) with L3.5 DMZ for IT/OT segmentation.', color: '#3B82F6' },
                        { title: 'ISA/IEC 62443', description: 'Industrial cybersecurity framework defining zones, conduits, and security levels (SL 1–4).', color: '#EF4444' },
                        { title: 'NIST SP 800-82r3', description: 'Guide to OT security for industrial control systems, aligned with NIST CSF 2.0.', color: '#10B981' },
                    ].map(m => (
                        <div key={m.title} className="rounded-lg border border-white/[0.06] p-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
                            <h3 className="text-sm font-semibold mb-1" style={{ color: m.color }}>{m.title}</h3>
                            <p className="text-xs text-gray-400 leading-relaxed">{m.description}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Cross-Facility Purdue Model */}
            <Section title="Cross-Facility Purdue Model Comparison" id="purdue">
                <Tbl heads={['Level', 'Steel Mill', 'Al Smelter', 'Auto Assembly', 'Semiconductor', 'Aerospace', 'Heavy Equip', 'Transformer']} rows={[
                    ['L0', 'Thermocouples, load cells, pyrometers', 'Pot voltage, bath temp, anode current', 'Weld force, torque, vision', 'MFC, RF power, pressure, temp', 'Encoders, force, CMM probe', 'Spindle load, bore depth', 'Core loss, winding temp'],
                    ['L1', 'EAF PLC, caster PLC, mill drive', 'Pot controller, rectifier ctrl', 'Robot ctrl, press PLC, paint PLC', 'Tool controller, SECS/GEM', 'CNC controller, autoclave PLC', 'CNC, weld robot, paint PLC', 'Winding machine PLC, oven ctrl'],
                    ['L2', 'Level 2 automation — gauge, shape', 'Potline SCADA, FTC control', 'Line SCADA, andon, quality gate', 'FDC, APC, recipe mgmt', 'Cell SCADA, NDT station', 'Cell SCADA, tool mgmt', 'Test bay SCADA, oil fill ctrl'],
                    ['L3', 'MES, coil tracking, quality', 'Production scheduling, energy mgmt', 'MES (JIS/JIT), production planning', 'MES, lot tracking, yield mgmt', 'MES, PLM, digital thread', 'MES, work order, scheduling', 'MES, serial tracking, QMS'],
                    ['L3.5', 'Firewall, historian relay', 'DMZ, OPC gateway', 'DMZ, data diode', 'Protocol converter SECS→OPC', 'ITAR gateway, DMZ', 'MTConnect adapter, DMZ', 'Data gateway, DMZ'],
                    ['L4', 'ERP (SAP), supply chain', 'ERP, commodity trading', 'ERP, supply chain, EDI', 'ERP, yield portal, WIP', 'ERP, Teamcenter PLM', 'ERP, dealer network', 'ERP, customer portal'],
                ]} />
            </Section>

            {/* Protocol Stack */}
            <Section title="Communication Protocol Stack" id="protocols">
                <Ascii>{`Enterprise:  SAP/Oracle ERP │ EDI 830/862 │ PLM (Teamcenter/Windchill) │ MQTT Cloud
Application: OPC UA (PubSub) │ MTConnect │ SECS/GEM (HSMS) │ REST/GraphQL API
Network:     Industrial Ethernet │ Fiber backbone (10/40 Gbps) │ TSN │ Wi-Fi 6
Supervisory: Profinet IRT │ EtherNet/IP (CIP) │ EtherCAT │ Modbus TCP
Control:     Profibus DP/PA │ DeviceNet │ CC-Link IE │ Foundation Fieldbus
Field:       4-20 mA │ HART │ IO-Link │ AS-i │ RS-485/232 │ Load cell (mV/V)`}</Ascii>
            </Section>

            {/* Cybersecurity Architecture */}
            <Section title="Cybersecurity Architecture" id="cybersecurity">
                <Tbl heads={['Zone', 'ISA/IEC 62443 SL', 'Controls', 'Boundary']} rows={[
                    ['Enterprise (L4)', 'SL 1', 'MFA, SIEM, EDR, patch management', 'Corporate firewall'],
                    ['DMZ (L3.5)', 'SL 2', 'Data diodes, jump servers, OPC UA tunneling', 'Industrial firewall pair'],
                    ['Operations (L3)', 'SL 2', 'MES hardening, role-based access, audit logs', 'VLAN segmentation'],
                    ['Supervisory (L2)', 'SL 3', 'SCADA allowlisting, HMI lockdown, historian replication', 'Layer 3 switch ACLs'],
                    ['Control (L1)', 'SL 3', 'PLC firmware signing, CIP Safety/Profisafe, change detection', 'Cell/area firewall'],
                    ['Process (L0)', 'SL 4', 'Hardened I/O, tamper detection, failsafe on disconnect', 'Physical isolation'],
                ]} />
            </Section>

            {/* Facility Article Cards */}
            <Section title="Facility Reference Architectures" id="facilities">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {FACILITY_ARTICLES.map(f => (
                        <a key={f.href} href={f.href} className="group rounded-xl border border-white/[0.06] p-4 hover:border-white/[0.12] transition-all duration-300" style={{ background: 'rgba(255,255,255,0.02)' }}>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-lg">{f.icon}</span>
                                <div className="w-2 h-2 rounded-full" style={{ background: f.color }} />
                            </div>
                            <h3 className="text-sm font-semibold text-white group-hover:text-[#F97316] transition-colors">{f.title}</h3>
                            <p className="text-[10px] text-gray-600 mt-0.5 font-mono">{f.subtitle}</p>
                            <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">{f.description}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                                {f.tags.map(t => <span key={t} className="text-[9px] px-1.5 py-0.5 rounded border border-white/[0.06] text-gray-500">{t}</span>)}
                            </div>
                        </a>
                    ))}
                </div>
            </Section>

            {/* References */}
            <Section title="References" id="references">
                <Refs items={[
                    'CISA. (2024). Critical Manufacturing Sector-Specific Plan. DHS.',
                    'NIST. (2023). SP 800-82r3: Guide to OT Security. NIST.',
                    'ISA. (2020). ISA/IEC 62443: Industrial Automation and Control Systems Security. ISA.',
                    'The Open Group. (2022). TOGAF Standard, Version 10. The Open Group.',
                    'ISA. (2018). ISA-95: Enterprise-Control System Integration. ISA.',
                    'OSHA. (2023). 29 CFR 1910: General Industry Standards. DOL.',
                    'EPA. (2023). 40 CFR 63: National Emission Standards for Hazardous Air Pollutants. EPA.',
                    'IEEE. (2022). IEEE C37 Series: Switchgear and Protection Standards. IEEE.',
                ]} />
            </Section>

            {/* See Also */}
            <SeeAlso links={[
                { href: '/wiki/sectors/MANU', label: 'Sector Overview (MANU)', color: '#F97316' },
                { href: '/wiki/dexpi/equipment-classes', label: 'DEXPI Equipment Classes', color: '#FF6B00' },
                { href: '/wiki/energy', label: 'Energy Sector Hub', color: '#F59E0B' },
                { href: '/wiki/chemical', label: 'Chemical Sector Hub', color: '#EF4444' },
            ]} />
        </div>
    );
}

function Section({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
    return (<section id={id} className="space-y-4"><h2 className="text-xl font-heading font-semibold text-white">{title}</h2>{children}</section>);
}
function Ascii({ children }: { children: string }) {
    return (<div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}><pre className="whitespace-pre leading-relaxed">{children}</pre></div>);
}
function Tbl({ heads, rows }: { heads: string[]; rows: string[][] }) {
    return (<div className="overflow-x-auto"><table className="w-full text-xs border-collapse"><thead><tr className="border-b border-white/[0.08] text-gray-500">{heads.map(h => <th key={h} className="text-left px-3 py-2 font-medium">{h}</th>)}</tr></thead><tbody>{rows.map((r, i) => <tr key={i} className="border-b border-white/[0.04] hover:bg-white/[0.02]">{r.map((c, j) => <td key={j} className={`px-3 py-2 ${j === 0 ? 'text-[#F97316] font-medium whitespace-nowrap' : 'text-gray-400'}`}>{c}</td>)}</tr>)}</tbody></table></div>);
}
function Refs({ items }: { items: string[] }) { return (<div className="space-y-2 text-xs text-gray-400 leading-relaxed">{items.map((item, i) => <p key={i}>{item}</p>)}</div>); }
function SeeAlso({ links }: { links: { href: string; label: string; color: string }[] }) {
    return (<section className="space-y-3"><h2 className="text-lg font-heading font-semibold text-white">See Also</h2><div className="flex flex-wrap gap-2">{links.map(l => <a key={l.href} href={l.href} className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-white/[0.04]" style={{ borderColor: `${l.color}30`, color: l.color }}>{l.label} &rarr;</a>)}</div></section>);
}
