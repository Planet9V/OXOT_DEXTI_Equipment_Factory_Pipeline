/**
 * Chemical Sector Reference Architecture — Wiki Hub Page.
 *
 * Comprehensive overview of the Chemical Sector critical infrastructure,
 * serving as the entry point to 6 detailed facility-type articles covering
 * Petrochemical Complexes, Chlor-Alkali Plants, Batch Chemical Manufacturing,
 * Ammonia & Fertilizer Complexes, API Manufacturing Plants, and Consumer
 * Chemical Formulation Plants.
 *
 * Based on TOGAF Architecture Development Method (ADM) with cross-references
 * to OSHA, EPA, API, IEC, and NFPA primary standards.
 *
 * @module wiki/chemical/page
 */

import ChemicalStepSection from './ChemicalStepSection';

export const metadata = {
    title: 'Chemical Sector Reference Architecture — Wiki',
    description:
        'TOGAF-based reference architectures for 6 chemical facility types: Petrochemical, Chlor-Alkali, ' +
        'Batch Processing, Ammonia/Fertilizer, API Manufacturing, and Consumer Formulation.',
};

/** Facility type cards with routing. */
const FACILITY_ARTICLES = [
    {
        title: 'Petrochemical Complexes',
        subtitle: 'Steam Cracking & Polymerization',
        href: '/wiki/chemical/petrochemical',
        icon: '🏭',
        color: '#EF4444',
        description:
            'Integrated ethylene/propylene production through steam cracking of naphtha/ethane at 800–850 °C, downstream fractionation, and polymerization into polyethylene, polypropylene, and synthetic rubbers.',
        tags: ['OSHA PSM', 'API 560', 'IEC 61511', 'DCS'],
    },
    {
        title: 'Chlor-Alkali Plants',
        subtitle: 'Membrane Cell Electrolysis',
        href: '/wiki/chemical/chlor-alkali',
        icon: '⚡',
        color: '#3B82F6',
        description:
            'Electrolysis of brine to produce chlorine gas, caustic soda (NaOH), and hydrogen using membrane cell technology at 4–6 kA/m², with downstream chlorine liquefaction and caustic concentration.',
        tags: ['Euro Chlor BAT', 'EPA RMP', 'Cl₂ Detection', 'DC Rectifier'],
    },
    {
        title: 'Batch Chemical Manufacturing',
        subtitle: 'ISA-88 Multi-Purpose Processing',
        href: '/wiki/chemical/batch-processing',
        icon: '🧪',
        color: '#8B5CF6',
        description:
            'Multi-purpose batch processing in glass-lined/stainless reactors with ISA-88 recipe control, producing specialty chemicals through synthesis, purification, and formulation campaigns.',
        tags: ['ISA-88', 'ISA-95', 'IEC 61512', 'OSHA PSM'],
    },
    {
        title: 'Ammonia & Fertilizer Complexes',
        subtitle: 'Haber-Bosch Process',
        href: '/wiki/chemical/ammonia-fertilizer',
        icon: '🌾',
        color: '#10B981',
        description:
            'Anhydrous ammonia synthesis via Haber-Bosch (150–300 atm, 400–500 °C) with downstream urea, ammonium nitrate, and NPK granulation for global food security.',
        tags: ['DHS CFATS', 'API 941', 'High-Pressure', 'ATF AN'],
    },
    {
        title: 'API Manufacturing Plants',
        subtitle: 'cGMP Pharmaceutical Synthesis',
        href: '/wiki/chemical/api-manufacturing',
        icon: '💊',
        color: '#EC4899',
        description:
            'cGMP-compliant multi-step synthesis, purification, and drying of active pharmaceutical ingredients in cleanroom environments with FDA 21 CFR Part 11 validated batch records.',
        tags: ['FDA cGMP', 'ICH Q7', 'ISPE GAMP', 'EU Annex 1'],
    },
    {
        title: 'Consumer Chemical Formulation',
        subtitle: 'High-Speed Blending & Packaging',
        href: '/wiki/chemical/consumer-formulation',
        icon: '🧴',
        color: '#F97316',
        description:
            'High-speed formulation, blending, and packaging of consumer cleaning products, detergents, and personal care items at 200–600 bottles/min with PackML-compliant line automation.',
        tags: ['PackML', 'ISA-TR88', 'FDA OTC', 'EPA FIFRA'],
    },
];

export default function ChemicalHubPage() {
    return (
        <div className="max-w-7xl space-y-12">
            {/* 4-Step Sector Architecture Viewer */}
            <ChemicalStepSection />

            {/* Separator between step viewer and TOGAF reference */}
            <div className="border-t border-white/[0.06] pt-12">
                <h2 className="text-lg font-heading font-semibold text-gray-500 mb-8">
                    📖 Full TOGAF Reference Architecture
                </h2>
            </div>

            {/* Header */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-xl font-bold text-white flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)' }}
                    >
                        🧪
                    </div>
                    <div>
                        <span className="text-[10px] text-gray-500 font-mono block">
                            CISA SECTOR 01 · CHEM
                        </span>
                        <h1 className="text-3xl font-heading font-bold text-white">
                            Chemical Sector Reference Architecture
                        </h1>
                    </div>
                </div>
                <p className="text-gray-400 text-base leading-relaxed max-w-3xl">
                    A comprehensive TOGAF-based reference architecture covering six critical
                    facility types in the chemical sector — from integrated petrochemical complexes
                    processing millions of tonnes of feedstock to cGMP pharmaceutical plants
                    synthesizing life-saving APIs. Each article provides detailed process diagrams,
                    bills of materials, Purdue model mappings, communication protocol stacks, and
                    safety system specifications aligned with OSHA, EPA, API, IEC, and NFPA standards.
                </p>
            </div>

            {/* Executive Summary */}
            <Section title="Executive Summary" id="executive-summary">
                <p className="text-sm text-gray-300 leading-relaxed">
                    The Chemical Sector converts raw materials into more than 70,000 diverse products
                    through chemical reactions, separation, and formulation processes. These products —
                    ranging from ethylene and chlorine to pharmaceuticals and consumer goods — are
                    essential feedstocks for virtually every other critical infrastructure sector,
                    from agriculture and defense to healthcare and water treatment. The sector
                    contributed $553 billion in shipments in 2023 and employs over 529,000 workers
                    directly, with a 4.1× economic multiplier effect (American Chemistry Council, 2024).
                    The architecture follows the{' '}
                    <span className="text-[#8B5CF6] font-medium">
                        TOGAF Architecture Development Method (ADM)
                    </span>{' '}
                    and the{' '}
                    <span className="text-[#8B5CF6] font-medium">
                        ISA-95 / Purdue Enterprise Reference Architecture
                    </span>{' '}
                    to provide a consistent framework across all facility types (The Open Group, 2022;
                    Williams, 1994).
                </p>
                <p className="text-sm text-gray-300 leading-relaxed mt-3">
                    Chemical facilities are uniquely characterized by the coexistence of extreme
                    operating conditions — temperatures from cryogenic (−160 °C) to pyrolysis (850 °C),
                    pressures from deep vacuum to 300 atm, and materials ranging from highly flammable
                    hydrocarbons to acutely toxic chlorine gas. This demands rigorous application of
                    Process Safety Management (OSHA 29 CFR 1910.119), Risk Management Programs
                    (EPA 40 CFR 68), and Safety Instrumented Systems (IEC 61511) across all facility
                    types. Each article documents the complete safety architecture alongside the
                    process and control systems.
                </p>
                <p className="text-sm text-gray-300 leading-relaxed mt-3">
                    The six facility types documented here span the full chemical value chain:
                    basic commodity chemicals (petrochemicals, chlor-alkali), specialty and fine
                    chemicals (batch processing), agricultural chemicals (ammonia/fertilizer),
                    pharmaceuticals (API manufacturing), and consumer products (formulation/packaging).
                    Each article includes TOGAF Business Architecture, detailed technical descriptions,
                    process diagrams, comprehensive Bills of Materials, Purdue model mappings, and
                    APA-formatted academic references.
                </p>
            </Section>

            {/* Value Chain Diagram */}
            <Section title="Chemical Sector Value Chain" id="value-chain">
                <div
                    className="rounded-lg border border-white/[0.06] p-6 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`Raw Materials                                              End Products
─────────────                                              ────────────
                    ┌─────────────────────┐
Natural Gas ───────►│  PETROCHEMICAL      │──► Ethylene, Propylene, BTX
Naphtha ───────────►│  COMPLEX            │──► PE, PP, Synthetic Rubber
                    └─────────────────────┘
                              │
                    ┌─────────┴───────────┐
Salt (NaCl) ───────►│  CHLOR-ALKALI       │──► Chlorine, Caustic Soda, H₂
Electricity ───────►│  PLANT              │──► PVC feedstock, Water treatment
                    └─────────────────────┘
                              │
                    ┌─────────┴───────────┐
Intermediates ─────►│  BATCH CHEMICAL     │──► Specialty chemicals, Catalysts
Solvents ──────────►│  MANUFACTURING      │──► Coatings, Adhesives, Additives
                    └─────────────────────┘
                              │
                    ┌─────────┴───────────┐
Natural Gas ───────►│  AMMONIA &          │──► NH₃, Urea, AN, NPK
(H₂ source) ───────►│  FERTILIZER         │──► Global food supply chain
                    └─────────────────────┘
                              │
                    ┌─────────┴───────────┐
Fine Chemicals ────►│  API MANUFACTURING  │──► Active Pharma Ingredients
Solvents ──────────►│  (cGMP)             │──► Drug substance for formulation
                    └─────────────────────┘
                              │
                    ┌─────────┴───────────┐
Surfactants ───────►│  CONSUMER CHEMICAL  │──► Detergents, Cleaners
Fragrances ────────►│  FORMULATION        │──► Personal care products
                    └─────────────────────┘`}</pre>
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">
                    Figure 1. Chemical sector value chain showing the six facility types documented in
                    this reference architecture. Upstream basic chemicals feed downstream specialty,
                    pharmaceutical, and consumer product manufacturing.
                </p>
            </Section>

            {/* Methodology */}
            <Section title="Methodology & Frameworks" id="methodology">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        {
                            title: 'TOGAF ADM',
                            body: 'Each facility is analyzed through Phase A (Architecture Vision), Phase B (Business Architecture), Phase C (Information Systems Architecture), and Phase D (Technology Architecture) of the TOGAF ADM cycle.',
                            color: '#8B5CF6',
                        },
                        {
                            title: 'Purdue / ISA-95 Model',
                            body: 'Equipment and systems are mapped to Purdue Levels 0 (Process) through Level 4/5 (Enterprise/Cloud), including the critical Level 3.5 DMZ demarcation for cybersecurity per IEC 62443.',
                            color: '#3B82F6',
                        },
                        {
                            title: 'IEC 62443 / CFATS',
                            body: 'Cybersecurity architectures aligned with IEC 62443 zone-and-conduit model and DHS Chemical Facility Anti-Terrorism Standards (CFATS) for high-risk chemical facilities.',
                            color: '#EF4444',
                        },
                        {
                            title: 'OSHA PSM / EPA RMP',
                            body: 'Process Safety Management (29 CFR 1910.119) and Risk Management Programs (40 CFR 68) provide the safety framework foundation — PHA, MOC, SIS, and emergency response planning.',
                            color: '#10B981',
                        },
                    ].map((fw) => (
                        <div
                            key={fw.title}
                            className="rounded-xl border border-white/[0.06] p-4"
                            style={{ background: 'rgba(255,255,255,0.02)' }}
                        >
                            <h4 className="text-sm font-semibold text-white mb-1" style={{ color: fw.color }}>
                                {fw.title}
                            </h4>
                            <p className="text-xs text-gray-400 leading-relaxed">{fw.body}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Cross-Facility Purdue Model */}
            <Section title="Unified Purdue Model Across Facilities" id="purdue-model">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Level</th>
                                <th className="text-left px-3 py-2 font-medium">Petrochemical</th>
                                <th className="text-left px-3 py-2 font-medium">Chlor-Alkali</th>
                                <th className="text-left px-3 py-2 font-medium">Batch Chem.</th>
                                <th className="text-left px-3 py-2 font-medium">Ammonia/Fert.</th>
                                <th className="text-left px-3 py-2 font-medium">API Pharma</th>
                                <th className="text-left px-3 py-2 font-medium">Consumer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { level: 'L0', cells: ['Furnace sensors, analyzers', 'Cell voltage, Cl₂ det.', 'Temp/press/pH probes', 'Converter T/P, cat. bed', 'Cleanroom environ.', 'Load cells, flow'] },
                                { level: 'L1', cells: ['SIS ESD valves', 'Rectifier control', 'Batch phase ctrl', 'SIS high-P trips', 'cGMP batch ctrl', 'PackML line ctrl'] },
                                { level: 'L2', cells: ['DCS (Honeywell/Yoko)', 'PLC + DCS', 'DCS batch engine', 'DCS (ABB/Emerson)', 'DCS + MES batch', 'PLC + SCADA'] },
                                { level: 'L3', cells: ['APC, Historian', 'Power mgmt, Hist.', 'Recipe mgmt, MES', 'APC, optimizer', 'eBR, LIMS, MES', 'MES, OEE, WMS'] },
                                { level: 'L3.5', cells: ['FW/DMZ, data diode', 'FW/DMZ', 'FW/DMZ', 'FW/DMZ, data diode', 'FW/DMZ, 21 CFR 11', 'FW/DMZ'] },
                                { level: 'L4', cells: ['ERP, SCM, ETRM', 'ERP, energy mgmt', 'ERP/SAP, CRM', 'ERP, commodity trade', 'ERP, regulatory sub.', 'ERP, demand plan'] },
                            ].map((row) => (
                                <tr key={row.level} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#8B5CF6] font-mono font-medium">{row.level}</td>
                                    {row.cells.map((cell, i) => (
                                        <td key={i} className="px-3 py-2 text-gray-400">{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">
                    Table 1. Unified Purdue model mapping across all chemical facility types, adapted from
                    ISA-95 (Williams, 1994) and IEC 62264 for process industry applications.
                </p>
            </Section>

            {/* Communication Protocol Stack */}
            <Section title="Communication Protocol Stack" id="protocol-stack">
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{`Application:  OPC UA │ ISA-88 Batch │ ISA-95 B2MML │ 21 CFR 11 │ PackML
Transport:    Modbus TCP │ EtherNet/IP │ PROFINET │ OPC UA Binary
Network:      Industrial Ethernet (IEEE 802.3) │ TCP/IP │ Redundant Ring
Fieldbus:     HART (4-20mA) │ Foundation Fieldbus H1 │ PROFIBUS PA │ IO-Link
Physical:     Fiber optic │ Cat6A │ Intrinsically safe (Ex ia) │ IS barriers`}</pre>
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">
                    Figure 2. Communication protocol stack spanning all six facility types, from
                    intrinsically safe field instruments to enterprise integration layers.
                </p>
            </Section>

            {/* Cybersecurity */}
            <Section title="Cybersecurity Architecture" id="cybersecurity">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Zone</th>
                                <th className="text-left px-3 py-2 font-medium">Controls</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Perimeter (L3.5)', 'Industrial firewalls, unidirectional gateways (data diodes), VPN concentrators, protocol-aware deep packet inspection'],
                                ['Network', 'VLAN segmentation per IEC 62443 zones, PRP/HSR ring redundancy, encrypted Modbus/OPC UA, network access control (802.1X)'],
                                ['Endpoint', 'Application whitelisting, USB port lockdown, hardened DCS/SIS workstations, certificate-based authentication'],
                                ['SIS Isolation', 'Air-gapped or hardwired SIS per IEC 61511, dedicated SIS engineering workstation, no remote access to safety controllers'],
                                ['Monitoring', 'OT-specific IDS/IPS (Claroty, Nozomi, Dragos), SIEM integration, anomaly detection on process variables'],
                                ['Governance', 'DHS CFATS compliance, IEC 62443 certification, annual penetration testing, RBAC with multi-factor authentication'],
                            ].map(([zone, controls]) => (
                                <tr key={zone} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#EF4444] font-medium whitespace-nowrap">{zone}</td>
                                    <td className="px-3 py-2 text-gray-400">{controls}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* Facility Article Cards */}
            <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-white">
                    Facility Reference Articles
                </h2>
                <p className="text-sm text-gray-500">
                    Each article below provides a complete TOGAF-based reference architecture with
                    detailed process diagrams, bills of materials, Purdue model mappings, and APA citations.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {FACILITY_ARTICLES.map((article) => (
                        <a
                            key={article.href}
                            href={article.href}
                            className="group rounded-xl border border-white/[0.06] p-5 hover:border-white/[0.12] transition-all duration-300"
                            style={{ background: 'rgba(255,255,255,0.02)' }}
                        >
                            <div className="flex items-start gap-3">
                                <span className="text-2xl">{article.icon}</span>
                                <div>
                                    <h3 className="text-sm font-semibold text-white group-hover:text-[#8B5CF6] transition-colors">
                                        {article.title}
                                    </h3>
                                    <span className="text-[10px] font-mono" style={{ color: article.color }}>
                                        {article.subtitle}
                                    </span>
                                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                                        {article.description}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                        {article.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-[10px] px-1.5 py-0.5 rounded border"
                                                style={{
                                                    borderColor: `${article.color}30`,
                                                    color: article.color,
                                                }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </section>

            {/* References */}
            <Section title="References" id="references">
                <div className="space-y-2 text-xs text-gray-400 leading-relaxed">
                    <p>
                        American Chemistry Council. (2024).{' '}
                        <em>Guide to the Business of Chemistry</em>. ACC.
                    </p>
                    <p>
                        Cybersecurity and Infrastructure Security Agency. (2024).{' '}
                        <em>Chemical Sector-Specific Plan: An Annex to the NIPP</em>. DHS/CISA.
                    </p>
                    <p>
                        International Electrotechnical Commission. (2018).{' '}
                        <em>IEC 62443: Industrial communication networks – Network and system security</em>. IEC.
                    </p>
                    <p>
                        International Electrotechnical Commission. (2016).{' '}
                        <em>IEC 61511: Functional safety – Safety instrumented systems for the process industry</em>. IEC.
                    </p>
                    <p>
                        International Society of Automation. (2010).{' '}
                        <em>ISA-88.01: Batch Control — Part 1: Models and Terminology</em>. ISA.
                    </p>
                    <p>
                        Occupational Safety and Health Administration. (1992).{' '}
                        <em>29 CFR 1910.119: Process Safety Management of Highly Hazardous Chemicals</em>. OSHA.
                    </p>
                    <p>
                        The Open Group. (2022).{' '}
                        <em>TOGAF Standard, Version 10</em>. The Open Group.
                    </p>
                    <p>
                        U.S. Environmental Protection Agency. (2017).{' '}
                        <em>40 CFR Part 68: Chemical Accident Prevention Provisions (RMP Rule)</em>. EPA.
                    </p>
                    <p>
                        Williams, T. J. (1994). The Purdue Enterprise Reference Architecture.{' '}
                        <em>Computers in Industry</em>, 24(2–3), 141–158.
                    </p>
                </div>
            </Section>

            {/* See Also */}
            <Section title="See Also" id="see-also">
                <div className="flex flex-wrap gap-2">
                    {[
                        { href: '/wiki/sectors/CHEM', label: 'Chemical Sector Overview', color: '#8B5CF6' },
                        { href: '/wiki/dexpi/equipment-classes', label: 'DEXPI Equipment Classes', color: '#06B6D4' },
                        { href: '/wiki/dexpi/standards', label: 'Related Standards', color: '#3B82F6' },
                        { href: '/wiki/energy', label: 'Energy Sector Hub', color: '#F59E0B' },
                        { href: '/wiki/pipeline', label: 'AI Pipeline V2', color: '#FF6B00' },
                        { href: '/wiki/neo4j', label: 'Neo4j Graph Database', color: '#018BFF' },
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
function Section({
    title,
    id,
    children,
}: {
    title: string;
    id: string;
    children: React.ReactNode;
}) {
    return (
        <section id={id} className="space-y-4">
            <h2 className="text-xl font-heading font-semibold text-white">{title}</h2>
            {children}
        </section>
    );
}
