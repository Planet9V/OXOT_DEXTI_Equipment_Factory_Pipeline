/**
 * Battery Energy Storage Systems (BESS) — Deep Dive Wiki Article.
 *
 * Comprehensive TOGAF-based reference architecture for utility-scale
 * BESS (10–100 MW), including LFP cell architecture, PCS topology,
 * fire suppression, NERC CIP integration, and market participation.
 *
 * @module wiki/energy/bess/page
 */

export const metadata = {
    title: 'Battery Energy Storage Systems (10–100 MW) — Energy Wiki',
    description:
        'TOGAF reference architecture for utility-scale BESS: LFP cell chemistry, PCS, thermal management, ' +
        'fire safety, NERC CIP, and grid services with complete BOMs.',
};

export default function BESSPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]" style={{ background: '#EF4444' }} />
                    <span className="text-xs font-mono text-gray-500">ENERGY · STORAGE · BESS</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">Battery Energy Storage Systems</h1>
                <p className="text-sm text-gray-500 font-mono">10 – 100 MW · Utility Scale</p>
                <p className="text-gray-400 text-base leading-relaxed max-w-3xl">
                    Utility-scale Battery Energy Storage Systems (BESS) are transforming the electric
                    power system by providing fast-responding, flexible capacity for frequency regulation,
                    peak shaving, renewable energy time-shifting, and grid-forming services. Modern BESS
                    facilities utilise lithium-iron-phosphate (LFP) chemistry for its superior thermal
                    stability and cycle life, housed in containerised enclosures with integrated power
                    conversion systems (PCS), battery management systems (BMS), and thermal management
                    systems (TMS). These facilities operate under NERC CIP cybersecurity standards and
                    NFPA 855 fire safety requirements (NREL, 2021; NFPA, 2023).
                </p>
            </div>

            <Section title="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-300 leading-relaxed">
                    The BESS business architecture addresses the growing need for grid flexibility,
                    renewable integration, and reliability services. Revenue streams include frequency
                    regulation (FERC Order 755/841), capacity payments, energy arbitrage, transmission/
                    distribution deferral, and black start capability. The market structure is evolving
                    rapidly with FERC Order 2222 enabling BESS participation in wholesale markets as
                    standalone or aggregated resources.
                </p>

                <h3 className="text-sm font-semibold text-white mt-6 mb-2">Revenue Stacking</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Revenue Stream</th>
                                <th className="text-left px-3 py-2 font-medium">Service</th>
                                <th className="text-left px-3 py-2 font-medium">Typical Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Frequency Regulation', 'Fast response (RegD), 4-sec AGC, mileage-based', '$30–60/MW-day'],
                                ['Energy Arbitrage', 'Charge off-peak, discharge on-peak, price spread', '$5–25/MWh spread'],
                                ['Capacity', 'Resource adequacy, firm capacity, seasonal planning', '$50–150/kW-year'],
                                ['T&D Deferral', 'Deferred substation/feeder upgrades', 'Project-specific'],
                                ['Black Start', 'Grid-forming restoration capability', '$10–20/MW-hour'],
                                ['Renewable Firming', 'Solar/wind smoothing, ramp rate compliance', 'PPA integrated'],
                            ].map(([stream, svc, val]) => (
                                <tr key={stream} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#EF4444] font-medium">{stream}</td>
                                    <td className="px-3 py-2 text-gray-300">{svc}</td>
                                    <td className="px-3 py-2 text-gray-400 font-mono">{val}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

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
                                ['NFPA 855', 'Installation of stationary energy storage systems — fire safety, spacing, ventilation'],
                                ['UL 9540', 'Energy storage system safety — system-level testing'],
                                ['UL 9540A', 'Test method for thermal runaway fire propagation — cell/module/unit/installation'],
                                ['IEEE 2800', 'Interconnection and interoperability of IBR (inverter-based resources)'],
                                ['NERC CIP', 'Cybersecurity: CIP-005/007/010 for BES cyber systems (if >75 MW)'],
                                ['IEC 62619', 'Safety requirements for secondary lithium cells in industrial applications'],
                            ].map(([std, scope]) => (
                                <tr key={std} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#EF4444] font-medium whitespace-nowrap">{std}</td>
                                    <td className="px-3 py-2 text-gray-400">{scope}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="2. High-Level Design" id="high-level-design">
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`Grid Point of Interconnection (POI)
    │
    ▼
Main Transformer (34.5kV/690V or 1500V) ◄── 2 MVA – 5 MVA per block
    │
    ├── MV Switchgear (34.5kV, metal-clad)
    │
    └── Power Conversion System (PCS) Block:
            │
            ├── DC-AC Inverter (4 MW, 1500 VDC, SiC MOSFET)
            │       ├── Grid-following + Grid-forming firmware
            │       └── 4-quadrant: real + reactive power
            │
            └── Battery Container (40' ISO):
                    ├── 16 battery racks × 12 modules × 16 cells = 3,072 cells
                    ├── Cell: 280 Ah LFP prismatic, 3.2V nominal
                    ├── Module BMS: cell balancing, SoC/SoH, CAN bus
                    ├── Rack BMS: fault isolation, pre-charge, contactor control
                    ├── Container BMS: aggregation, thermal management interface
                    └── TMS: HVAC + liquid cooling, 25°C ± 5°C target

BESS Plant Controller ←── ISO/RTO AGC signals
    ├── Real-time optimizer (MPC, 4-second dispatch cycle)
    ├── SOC management across containers
    ├── Degradation-aware dispatch (calendar + cycle aging model)
    └── Grid code compliance (IEEE 2800, freq/voltage ride-through)`}</pre>
                </div>
            </Section>

            <Section title="3. Detailed Technical Description" id="technical">
                <h3 className="text-base font-semibold text-white mt-2 mb-2">3.1 Cell Architecture</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Parameter</th>
                                <th className="text-left px-3 py-2 font-medium">Specification</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Chemistry', 'LiFePO₄ (LFP) prismatic'],
                                ['Cell Capacity', '280 Ah (3.2 V nominal, 0.9 kWh per cell)'],
                                ['Cycle Life', '6,000+ cycles at 1C, 80% DOD, 25°C'],
                                ['Calendar Life', '15–20 years at 25°C'],
                                ['Operating Voltage', '2.5–3.65 V (per cell)'],
                                ['Operating Temperature', '-10°C to 55°C (optimal: 15–35°C)'],
                                ['Thermal Runaway Onset', '>270°C (significantly higher than NMC ~150°C)'],
                                ['Energy Density', '~160 Wh/kg (cell level)'],
                                ['Round-Trip Efficiency', '92–95% (DC-DC), 87–90% (AC-AC including PCS)'],
                            ].map(([param, spec]) => (
                                <tr key={param} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-gray-300 font-medium">{param}</td>
                                    <td className="px-3 py-2 text-gray-400">{spec}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.2 Power Conversion System (PCS)</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    The PCS provides bidirectional DC-AC conversion between the battery DC bus and
                    the grid AC bus. Modern utility-scale PCS units use{' '}
                    <span className="text-[#EF4444] font-medium">SiC MOSFET-based converters</span>{' '}
                    operating at 1500 VDC, achieving 98.5%+ peak efficiency. Each PCS unit is rated
                    4 MW and provides 4-quadrant operation (real/reactive import/export). Grid-forming
                    firmware enables the BESS to establish voltage and frequency references during
                    islanded operation or black start sequences (NREL, 2021).
                </p>

                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.3 Battery Management System (BMS)</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    The hierarchical BMS architecture provides cell-level monitoring at the lowest tier
                    and plant-level optimization at the highest:
                </p>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside mt-2">
                    <li><span className="text-white">Module BMS:</span> Cell voltage (±1 mV), temperature (±0.5°C), passive/active balancing, SOC via extended Kalman filter</li>
                    <li><span className="text-white">Rack BMS:</span> Pre-charge sequence, contactor control, ground fault detection, string isolation</li>
                    <li><span className="text-white">Container BMS:</span> Aggregated SOC/SOH, thermal management setpoints, fire alarm interface</li>
                    <li><span className="text-white">Plant Controller:</span> SOC balancing across containers, degradation-aware dispatch, grid services coordination</li>
                </ul>

                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.4 Thermal Management System (TMS)</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    Maintaining cell temperature within 15–35°C is critical for performance and longevity.
                    The TMS uses a hybrid approach: HVAC (forced air) for container ambient control and
                    liquid cooling (glycol loops) for direct rack/module cooling during high-rate cycling.
                    Temperature uniformity across the container must be maintained within ±3°C to prevent
                    differential aging (DNV, 2021).
                </p>

                <h3 className="text-base font-semibold text-white mt-8 mb-2">3.5 Fire Safety &amp; Suppression</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    Fire safety is designed per NFPA 855 and validated through UL 9540A thermal runaway
                    fire propagation testing at cell, module, unit, and installation levels:
                </p>
                <ul className="text-sm text-gray-400 space-y-1.5 list-disc list-inside mt-2">
                    <li><span className="text-white">Detection:</span> Multi-spectrum off-gas sensors (H₂, CO, VOC), smoke detectors, heat detectors</li>
                    <li><span className="text-white">Suppression:</span> Aerosol or water mist (NFPA 15 deluge) per container, 10-minute sustained discharge</li>
                    <li><span className="text-white">Ventilation:</span> Explosive atmosphere rated (Zone 2/Class I Div 2), ATEX fans, deflagration venting</li>
                    <li><span className="text-white">Spacing:</span> NFPA 855: 10 ft between containers, 3 ft from buildings, fire-rated walls (2-hr)</li>
                    <li><span className="text-white">Emergency response:</span> BESS-specific Emergency Response Plan (ERP), AHJ coordination</li>
                </ul>
            </Section>

            <Section title="4. Process Diagrams" id="process-diagrams">
                <h3 className="text-sm font-semibold text-white mb-2">4.1 Grid Services Dispatch</h3>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`ISO/RTO AGC ──(4s)──► BESS Plant Controller
                          │
                    ┌─────┴──────────────────────────┐
                    │ Real-time Optimizer (MPC)        │
                    │  • SOC targets per container     │
                    │  • Degradation cost function     │
                    │  • Grid code compliance check    │
                    └─────┬──────────────────────────┘
                          │
              ┌───────────┼───────────┐
              ▼           ▼           ▼
         PCS Block 1  PCS Block 2  PCS Block N
          4 MW each    4 MW each    4 MW each
              │           │           │
         Battery 1   Battery 2   Battery N
         (4 MWh)     (4 MWh)     (4 MWh)

Dispatch Cycle: ISO AGC → Plant Controller → PCS → Battery
Response Time: <200ms (PCS ramp), <4s (AGC compliance)`}</pre>
                </div>

                <h3 className="text-sm font-semibold text-white mt-8 mb-2">4.2 Thermal Runaway Response</h3>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`EVENT: Single cell thermal runaway detected

1. Off-gas sensor detects H₂/CO (>25 ppm) → ALARM LEVEL 1
   - BMS isolates affected rack (open DC contactor)
   - TMS increases ventilation to max
   - PCS reduces power output

2. Temperature rise >80°C in adjacent cells → ALARM LEVEL 2
   - BMS isolates affected container (open AC breaker)
   - Fire suppression activates (aerosol / water mist)
   - ATEX ventilation fans activate (deflagration prevention)

3. Fire confirmed (smoke/heat detection) → ALARM LEVEL 3
   - Plant controller isolates PCS block from grid
   - Deluge system activates on affected container
   - Emergency notification to AHJ (fire department)
   - Adjacent containers placed in standby (reduced SOC)

4. Post-event:
   - Thermal imaging survey (drone/handheld)
   - Off-gas monitoring for 24 hours
   - Root cause analysis (cell forensics)`}</pre>
                </div>

                <h3 className="text-sm font-semibold text-white mt-8 mb-2">4.3 Energy Flow</h3>
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`Charging (Grid → Battery):
  Grid (34.5kV) → Main XFMR → PCS (AC→DC) → Battery (1500VDC)
  Max rate: 1C (100 MW charge for 100 MWh system)

Discharging (Battery → Grid):
  Battery (1500VDC) → PCS (DC→AC) → Main XFMR → Grid (34.5kV)
  Max rate: 1C (100 MW discharge)

Round-trip efficiency: 87–90% AC-AC (including transformer + PCS + BMS losses)`}</pre>
                </div>
            </Section>

            <Section title="5. Bill of Materials" id="bom">
                <p className="text-sm text-gray-400 mb-3 italic">
                    Scaled for a 100 MW / 400 MWh (4-hour duration) utility-scale BESS.
                </p>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Equipment</th>
                                <th className="text-left px-3 py-2 font-medium">Specification</th>
                                <th className="text-right px-3 py-2 font-medium">Qty</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['LFP Battery Cells', '280 Ah prismatic, 3.2 V nominal', '~450,000 cells'],
                                ['Battery Modules', '16 cells/module, passive balancing', '~28,000 modules'],
                                ['Battery Racks', '12 modules/rack, rack BMS, DC contactors', '~2,300 racks'],
                                ['Battery Containers', '40\' ISO, 16 racks/container, TMS, fire suppression', '~145 containers'],
                                ['PCS Units', '4 MW bidirectional, 1500 VDC, SiC MOSFET, grid-forming', '25 units'],
                                ['Step-Up Transformers', '4 MVA, 690V/34.5kV, ONAN', '25'],
                                ['Main POI Transformer', '120 MVA, 34.5/138kV, ONAN/ONAF, OLTC', '1–2'],
                                ['MV Switchgear', '38 kV metal-clad, vacuum breakers', '30 panels'],
                                ['BESS Plant Controller', 'Redundant servers, MPC optimizer', '1 system (HA pair)'],
                                ['SCADA/HMI', 'Operator workstations, engineering stations', '4'],
                                ['Off-Gas Sensors', 'Multi-spectrum H₂/CO/VOC per container', '145'],
                                ['Fire Suppression', 'Aerosol + water mist per container', '145 systems'],
                                ['HVAC/TMS', 'Forced air + glycol liquid cooling per container', '145 units'],
                                ['Metering', 'Revenue-class CT/PT at POI', '1 set'],
                                ['Communication', 'Fiber optic ring, managed switches, RTU', '~50 switches'],
                            ].map(([equip, spec, qty]) => (
                                <tr key={equip} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-gray-300 font-medium">{equip}</td>
                                    <td className="px-3 py-2 text-gray-400">{spec}</td>
                                    <td className="px-3 py-2 text-right text-emerald-500/80 font-mono">{qty}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="6. Purdue Model Mapping" id="purdue">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Level</th>
                                <th className="text-left px-3 py-2 font-medium">Components</th>
                                <th className="text-left px-3 py-2 font-medium">Functions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Level 0', 'LFP cells, CTs, PTs, temperature/gas sensors, contactors', 'Energy storage, measurement'],
                                ['Level 1', 'Module BMS, rack BMS, TMS controllers, PCS firmware', 'Cell monitoring, protection'],
                                ['Level 2', 'Container BMS, PCS local control, SCADA RTU', 'Supervisory control'],
                                ['Level 3', 'BESS Plant Controller, MPC optimizer, historian', 'Dispatch optimization'],
                                ['Level 3.5', 'OT/IT firewall, data diode, VPN', 'NERC CIP ESP demarcation'],
                                ['Level 4', 'ISO/RTO AGC, market trading, asset management', 'Market participation'],
                            ].map(([level, components, functions]) => (
                                <tr key={level} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#EF4444] font-medium whitespace-nowrap">{level}</td>
                                    <td className="px-3 py-2 text-gray-300">{components}</td>
                                    <td className="px-3 py-2 text-gray-400">{functions}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="References" id="references">
                <div className="space-y-2 text-xs text-gray-400 leading-relaxed">
                    <p>DNV GL. (2021). <em>Battery energy storage study for the 2021 IRP</em>. Pacific Gas &amp; Electric Company.</p>
                    <p>National Fire Protection Association. (2023). <em>NFPA 855: Standard for the installation of stationary energy storage systems</em>. NFPA.</p>
                    <p>National Renewable Energy Laboratory. (2021). <em>Grid-scale battery storage: Technical report</em>. NREL/TP-6A20-79236.</p>
                    <p>UL. (2020). <em>UL 9540A: Test method for evaluating thermal runaway fire propagation in BESS</em>. UL LLC.</p>
                </div>
            </Section>

            <Section title="See Also" id="see-also">
                <div className="flex flex-wrap gap-2">
                    {[
                        { href: '/wiki/energy', label: 'Energy Sector Hub', color: '#F59E0B' },
                        { href: '/wiki/energy/transmission', label: 'Transmission Facilities', color: '#F59E0B' },
                        { href: '/wiki/energy/vpp-derms', label: 'VPP / DERMS', color: '#EC4899' },
                        { href: '/wiki/energy/microgrids', label: 'Microgrids', color: '#8B5CF6' },
                        { href: '/wiki/energy/smart-homes', label: 'Smart Homes', color: '#06B6D4' },
                        { href: '/wiki/sectors/ENER', label: 'Energy Sector Overview', color: '#F59E0B' },
                    ].map((link) => (
                        <a key={link.href} href={link.href} className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-white/[0.04]" style={{ borderColor: `${link.color}30`, color: link.color }}>
                            {link.label} →
                        </a>
                    ))}
                </div>
            </Section>
        </div>
    );
}

function Section({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
    return (
        <section id={id} className="space-y-4">
            <h2 className="text-xl font-heading font-semibold text-white">{title}</h2>
            {children}
        </section>
    );
}
