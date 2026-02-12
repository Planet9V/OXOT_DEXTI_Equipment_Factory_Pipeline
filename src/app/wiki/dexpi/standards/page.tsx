/**
 * Engineering Standards Reference — Wiki Page.
 *
 * Comprehensive reference of all engineering standards used across the
 * DEXPI Equipment Factory pipeline, organized by standards body.
 *
 * @module wiki/dexpi/standards/page
 */

const STANDARDS_DATA = [
    {
        body: 'API',
        fullName: 'American Petroleum Institute',
        color: '#EF4444',
        standards: [
            { code: 'API 610', title: 'Centrifugal Pumps for Petroleum, Petrochemical and Natural Gas Industries', equipment: ['CentrifugalPump'] },
            { code: 'API 611', title: 'General Purpose Steam Turbines', equipment: ['SteamTurbine'] },
            { code: 'API 612', title: 'Special Purpose Steam Turbines', equipment: ['SteamTurbine'] },
            { code: 'API 616', title: 'Gas Turbines for the Petroleum, Chemical and Gas Industry', equipment: ['GasTurbine'] },
            { code: 'API 617', title: 'Axial and Centrifugal Compressors and Expander-compressors', equipment: ['CentrifugalCompressor'] },
            { code: 'API 618', title: 'Reciprocating Compressors for Petroleum, Chemical, and Gas Industry', equipment: ['Compressor'] },
            { code: 'API 650', title: 'Welded Tanks for Oil Storage', equipment: ['StorageTank'] },
            { code: 'API 660', title: 'Shell-and-Tube Heat Exchangers', equipment: ['ShellTubeHeatExchanger'] },
            { code: 'API 661', title: 'Air-Cooled Heat Exchangers for General Refinery Service', equipment: ['AirCooledHeatExchanger'] },
            { code: 'API 2000', title: 'Venting Atmospheric and Low-Pressure Storage Tanks', equipment: ['StorageTank'] },
            { code: 'API 520', title: 'Sizing, Selection, and Installation of PRDs', equipment: ['SafetyValve'] },
            { code: 'API 521', title: 'Pressure-Relieving and Depressuring Systems', equipment: ['SafetyValve', 'FlareStack'] },
            { code: 'API 526', title: 'Flanged Steel Pressure-Relief Valves', equipment: ['SafetyValve'] },
        ],
    },
    {
        body: 'ASME',
        fullName: 'American Society of Mechanical Engineers',
        color: '#3B82F6',
        standards: [
            { code: 'ASME BPVC Sec. VIII Div. 1', title: 'Rules for Construction of Pressure Vessels', equipment: ['PressureVessel', 'Reactor'] },
            { code: 'ASME BPVC Sec. VIII Div. 2', title: 'Alternative Rules for Pressure Vessels', equipment: ['PressureVessel'] },
            { code: 'ASME BPVC Sec. I', title: 'Rules for Construction of Power Boilers', equipment: ['Boiler'] },
            { code: 'ASME BPVC Sec. III', title: 'Rules for Construction of Nuclear Facility Components', equipment: ['PressureVessel', 'SteamTurbine'] },
            { code: 'ASME B31.1', title: 'Power Piping', equipment: ['Pipe'] },
            { code: 'ASME B31.3', title: 'Process Piping', equipment: ['Pipe', 'ControlValve'] },
            { code: 'ASME B16.34', title: 'Valves — Flanged, Threaded, and Welding End', equipment: ['ControlValve', 'GateValve'] },
            { code: 'ASME PTC 25', title: 'Pressure Relief Devices', equipment: ['SafetyValve'] },
        ],
    },
    {
        body: 'TEMA',
        fullName: 'Tubular Exchanger Manufacturers Association',
        color: '#F59E0B',
        standards: [
            { code: 'TEMA Class R', title: 'Severe Requirements (Petroleum/Chemical)', equipment: ['ShellTubeHeatExchanger'] },
            { code: 'TEMA Class C', title: 'Moderate Requirements (Commercial)', equipment: ['ShellTubeHeatExchanger'] },
            { code: 'TEMA Class B', title: 'Moderate Requirements (Chemical)', equipment: ['ShellTubeHeatExchanger'] },
        ],
    },
    {
        body: 'IEC',
        fullName: 'International Electrotechnical Commission',
        color: '#8B5CF6',
        standards: [
            { code: 'IEC 60034', title: 'Rotating Electrical Machines', equipment: ['Motor', 'ElectricGenerator'] },
            { code: 'IEC 60076', title: 'Power Transformers', equipment: ['Transformer'] },
            { code: 'IEC 60947', title: 'Low-Voltage Switchgear and Controlgear', equipment: ['Switchgear', 'CircuitBreaker'] },
            { code: 'IEC 61131', title: 'Programmable Controllers', equipment: ['VFD'] },
            { code: 'IEC 60534', title: 'Industrial-Process Control Valves', equipment: ['ControlValve'] },
            { code: 'IEC 62271', title: 'High-Voltage Switchgear and Controlgear', equipment: ['Switchgear'] },
        ],
    },
    {
        body: 'ISA',
        fullName: 'International Society of Automation',
        color: '#10B981',
        standards: [
            { code: 'ISA-5.1', title: 'Instrumentation Symbols and Identification', equipment: ['FlowMeter', 'LevelIndicator', 'GasAnalyzer'] },
            { code: 'ISA S75.01', title: 'Flow Equations for Sizing Control Valves', equipment: ['ControlValve'] },
            { code: 'ISA-84', title: 'Safety Instrumented Systems (SIS)', equipment: ['SafetyValve', 'ControlValve'] },
            { code: 'ISA-88', title: 'Batch Control', equipment: ['Reactor', 'Mixer'] },
        ],
    },
    {
        body: 'NFPA',
        fullName: 'National Fire Protection Association',
        color: '#EC4899',
        standards: [
            { code: 'NFPA 70', title: 'National Electrical Code (NEC)', equipment: ['Transformer', 'Switchgear', 'Motor'] },
            { code: 'NFPA 99', title: 'Health Care Facilities Code', equipment: ['ElectricGenerator', 'Boiler', 'Compressor'] },
            { code: 'NFPA 110', title: 'Emergency and Standby Power Systems', equipment: ['ElectricGenerator', 'UPS'] },
            { code: 'NFPA 20', title: 'Installation of Stationary Pumps for Fire Protection', equipment: ['CentrifugalPump'] },
        ],
    },
    {
        body: 'ISO',
        fullName: 'International Organization for Standardization',
        color: '#06B6D4',
        standards: [
            { code: 'ISO 10628', title: 'Diagrams for the Chemical and Petrochemical Industry', equipment: [] },
            { code: 'ISO 15926', title: 'Industrial Process Plant Data Integration (RDL)', equipment: [] },
            { code: 'ISO 14224', title: 'Petroleum and Natural Gas — Reliability and Maintenance Data', equipment: [] },
            { code: 'ISO 5199', title: 'Technical Specifications for Centrifugal Pumps', equipment: ['CentrifugalPump'] },
        ],
    },
    {
        body: 'FDA/cGMP',
        fullName: 'Food and Drug Administration / Current Good Manufacturing Practice',
        color: '#F97316',
        standards: [
            { code: '21 CFR Part 211', title: 'cGMP for Finished Pharmaceuticals', equipment: ['Reactor', 'Filter', 'Autoclave'] },
            { code: '21 CFR Part 11', title: 'Electronic Records; Electronic Signatures', equipment: [] },
            { code: 'USP <797>', title: 'Pharmaceutical Compounding — Sterile Preparations', equipment: ['Filter', 'Autoclave'] },
            { code: 'ISPE GAMP 5', title: 'Risk-Based Approach to GxP Compliant Systems', equipment: [] },
        ],
    },
];

export const metadata = {
    title: 'Engineering Standards — DEXPI Wiki',
    description: 'Complete reference of API, ASME, TEMA, IEC, ISA, NFPA, ISO, and FDA standards used across the DEXPI Equipment Factory.',
};

export default function StandardsPage() {
    const totalStandards = STANDARDS_DATA.reduce((sum, g) => sum + g.standards.length, 0);

    return (
        <article className="max-w-5xl space-y-10">
            <header className="space-y-3">
                <span className="text-xs font-mono text-[#FF6B00]">REFERENCE</span>
                <h1 className="text-3xl font-heading font-bold text-white">
                    Engineering Standards
                </h1>
                <p className="text-gray-400 text-base leading-relaxed">
                    <strong className="text-white">{totalStandards}</strong> engineering
                    standards across{' '}
                    <strong className="text-white">{STANDARDS_DATA.length}</strong>{' '}
                    standards bodies referenced by the DEXPI Equipment Factory.
                </p>
            </header>

            {/* Summary cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {STANDARDS_DATA.map((group) => (
                    <div
                        key={group.body}
                        className="rounded-xl border border-white/[0.06] p-3 text-center"
                        style={{ background: 'rgba(255,255,255,0.02)' }}
                    >
                        <div
                            className="text-lg font-heading font-bold"
                            style={{ color: group.color }}
                        >
                            {group.standards.length}
                        </div>
                        <div className="text-[10px] text-gray-500 mt-0.5">
                            {group.body}
                        </div>
                    </div>
                ))}
            </div>

            {/* Standards tables per body */}
            {STANDARDS_DATA.map((group) => (
                <section key={group.body} className="space-y-3">
                    <h2 className="text-lg font-heading font-semibold text-white flex items-center gap-2">
                        <div
                            className="w-2 h-2 rounded-full"
                            style={{ background: group.color }}
                        />
                        {group.body}
                        <span className="text-xs text-gray-500 font-normal">
                            — {group.fullName} ({group.standards.length})
                        </span>
                    </h2>

                    <div
                        className="rounded-xl border border-white/[0.06] overflow-hidden"
                        style={{ background: 'rgba(255,255,255,0.015)' }}
                    >
                        <table className="w-full text-xs">
                            <thead>
                                <tr className="border-b border-white/[0.06] text-gray-500">
                                    <th className="text-left px-4 py-2.5 font-medium w-36">
                                        Code
                                    </th>
                                    <th className="text-left px-3 py-2.5 font-medium">
                                        Title
                                    </th>
                                    <th className="text-left px-4 py-2.5 font-medium hidden lg:table-cell">
                                        Applicable Equipment
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {group.standards.map((std) => (
                                    <tr
                                        key={std.code}
                                        className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
                                    >
                                        <td className="px-4 py-2.5">
                                            <code
                                                className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                                                style={{
                                                    color: group.color,
                                                    background: `${group.color}15`,
                                                }}
                                            >
                                                {std.code}
                                            </code>
                                        </td>
                                        <td className="px-3 py-2.5 text-gray-300">
                                            {std.title}
                                        </td>
                                        <td className="px-4 py-2.5 hidden lg:table-cell">
                                            <div className="flex flex-wrap gap-1">
                                                {std.equipment.map((eq) => (
                                                    <span
                                                        key={eq}
                                                        className="text-[9px] text-gray-500 bg-white/[0.04] px-1.5 py-0.5 rounded font-mono"
                                                    >
                                                        {eq}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            ))}
            {/* See Also / Backlinks */}
            <section className="border-t border-white/[0.06] pt-6 space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">See Also</h3>
                <div className="flex flex-wrap gap-2">
                    {[
                        { href: '/wiki/dexpi', label: 'DEXPI 2.0 Overview' },
                        { href: '/wiki/dexpi/equipment-classes', label: 'Equipment Classes' },
                        { href: '/wiki/dexpi/data-model', label: 'Data Model' },
                        { href: '/wiki/dexpi/xml-schema', label: 'XML Schema' },
                        { href: '/wiki/pipeline', label: 'AI Pipeline' },
                    ].map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-xs px-2.5 py-1 rounded-md border border-white/[0.06] text-gray-400 hover:text-[#FF6B00] hover:border-[#FF6B00]/20 transition-colors"
                        >
                            ← {link.label}
                        </a>
                    ))}
                </div>
            </section>
        </article>
    );
}
