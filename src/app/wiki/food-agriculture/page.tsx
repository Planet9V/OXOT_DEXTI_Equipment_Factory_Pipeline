/**
 * Food and Agriculture Sector Reference Architecture — Wiki Hub Page.
 *
 * Comprehensive overview of the Food and Agriculture Sector critical
 * infrastructure, serving as the entry point to 7 detailed facility-type
 * articles covering grain elevators, dairy farms, meatpacking plants,
 * cold storage DCs, greenhouses, beverage plants, and feed mills.
 *
 * Based on TOGAF Architecture Development Method (ADM) with cross-references
 * to USDA, FDA, OSHA, and EPA regulatory frameworks.
 *
 * @module wiki/food-agriculture/page
 */

export const metadata = {
    title: 'Food and Agriculture Sector Reference Architecture — Wiki',
    description:
        'TOGAF-based reference architectures for 7 food and agriculture facility types: ' +
        'Grain Elevator, Dairy Farm, Meatpacking Plant, Cold Storage DC, Greenhouse, Beverage Plant, and Feed Mill.',
};

/** Facility type cards with routing. */
const FACILITY_ARTICLES = [
    {
        title: 'Grain Elevator & Storage',
        subtitle: '500K–10M+ bushels',
        href: '/wiki/food-agriculture/grain-elevator',
        icon: '🌾',
        color: '#84CC16',
        description:
            'Grain receiving, drying, storage, aeration, and loadout with concrete silos, bucket elevators, and NFPA 61/652 dust explosion prevention.',
        tags: ['NFPA 61', 'OSHA 1910.272', 'Dust DHA', 'AMS Grading'],
    },
    {
        title: 'Commercial Dairy Farm',
        subtitle: '1,000–10,000+ head',
        href: '/wiki/food-agriculture/dairy-farm',
        icon: '🐄',
        color: '#22C55E',
        description:
            'Rotary milking parlors, bulk milk cooling, manure digestion/biogas, TMR feed mixing, and herd management under PMO/Grade A standards.',
        tags: ['PMO', 'Grade A', 'CAFO', 'ISO 11784'],
    },
    {
        title: 'Meatpacking Plant',
        subtitle: '1,000–6,000+ head/day',
        href: '/wiki/food-agriculture/meatpacking',
        icon: '🥩',
        color: '#EF4444',
        description:
            'USDA-inspected slaughter, fabrication, ammonia refrigeration, CIP sanitation, and wastewater treatment under HACCP/FSIS oversight.',
        tags: ['HACCP', 'PSM', 'IIAR', 'FSIS'],
    },
    {
        title: 'Cold Storage Distribution',
        subtitle: '-20°F to 40°F multi-temp',
        href: '/wiki/food-agriculture/cold-storage',
        icon: '❄️',
        color: '#0EA5E9',
        description:
            'Multi-temperature warehouse with ammonia/CO₂ cascade refrigeration, AS/RS automation, dock management, and FSMA temperature compliance.',
        tags: ['IIAR-2', 'ASHRAE 15', 'AS/RS', 'FSMA'],
    },
    {
        title: 'Greenhouse / CEA',
        subtitle: '10–100+ acres',
        href: '/wiki/food-agriculture/greenhouse',
        icon: '🌿',
        color: '#10B981',
        description:
            'Controlled environment agriculture with climate computers, fertigation, supplemental LED/HPS lighting, CO₂ enrichment, and IPM protocols.',
        tags: ['Priva', 'ASABE', 'DLI', 'GAP/GHP'],
    },
    {
        title: 'Beverage Manufacturing',
        subtitle: '100–2,000+ BPM',
        href: '/wiki/food-agriculture/beverage-plant',
        icon: '🍺',
        color: '#F59E0B',
        description:
            'Water treatment, batch blending, pasteurization/UHT, high-speed filling lines, CIP sanitation, and ISA-88 batch control.',
        tags: ['ISA-88', '3-A SSI', '21 CFR 129', 'CIP'],
    },
    {
        title: 'Feed Mill',
        subtitle: '10–100+ TPH',
        href: '/wiki/food-agriculture/feed-mill',
        icon: '🏭',
        color: '#A855F7',
        description:
            'Grain receiving, hammer milling, batching/mixing, pelleting, fat coating, and FSMA PCAF compliance with NFPA 61 dust management.',
        tags: ['AAFCO', 'PCAF', 'NFPA 652', 'VFD'],
    },
];

export default function FoodAgricultureHubPage() {
    return (
        <div className="max-w-5xl space-y-12">
            {/* Header */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #84CC16, #65A30D)' }}>🌾</div>
                    <div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]" style={{ background: '#84CC16' }} />
                            <span className="text-xs font-mono text-gray-500">CISA Sector 10 · FOOD · SRMA: USDA / HHS (FDA)</span>
                        </div>
                        <h1 className="text-3xl font-heading font-bold text-white">Food and Agriculture Sector</h1>
                    </div>
                </div>
                <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
                    Comprehensive reference architecture for the <span className="text-[#84CC16] font-medium">Food and Agriculture Sector</span> — an almost entirely privately-owned critical infrastructure ecosystem comprising an estimated 2.1 million farms, 935,000+ restaurants, and more than 200,000 registered food manufacturing, processing, and storage facilities that account for roughly one-fifth of U.S. economic activity.
                </p>
                <p className="text-gray-400 text-sm max-w-3xl leading-relaxed">
                    This sector spans the complete farm-to-fork value chain: from precision agriculture and grain handling through animal agriculture, food processing (meatpacking, dairy, beverage), cold chain logistics, and final distribution. It is jointly regulated by the <span className="text-white font-medium">USDA</span> (agriculture and meat/poultry inspection via FSIS) and <span className="text-white font-medium">FDA/HHS</span> (food safety via FSMA), with additional oversight from EPA (water/air), OSHA (worker safety), and state departments of agriculture.
                </p>
            </div>

            {/* Value Chain */}
            <Section title="Farm-to-Fork Value Chain" id="value-chain">
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`┌─────────────────────────────────────────────────────────────────────┐
│                    FOOD & AGRICULTURE VALUE CHAIN                   │
├──────────┬──────────┬───────────┬──────────────┬───────────────────┤
│  INPUT   │   FARM   │ PROCESSING│ COLD CHAIN   │   CONSUMER        │
│ SUPPLY   │ PRODUCE  │ & MFG     │ LOGISTICS    │   DELIVERY        │
├──────────┼──────────┼───────────┼──────────────┼───────────────────┤
│ Feed Mill│ Grain    │ Meatpack  │ Cold Storage │ Retail / QSR      │
│ Seed/Fert│ Elevator │ Dairy Proc│ DC (multi-T) │ Food Service      │
│ Ag Chem  │ Dairy    │ Beverage  │ Reefer Fleet │ Institutional     │
│ Genetics │ Farm     │ Bakery    │ Cross-Dock   │ E-Commerce DTC    │
│ Equip OEM│ Greenhouse│ Canning  │ Last Mile    │ Export Markets     │
├──────────┴──────────┴───────────┴──────────────┴───────────────────┤
│ Regulatory: USDA FSIS │ FDA FSMA │ EPA │ OSHA │ State Ag Depts    │
│ Standards: HACCP │ cGMP │ PCQI │ PMO │ GFSI │ SQF │ BRC │ FSSC    │
└─────────────────────────────────────────────────────────────────────┘`}</pre>
                </div>
            </Section>

            {/* Methodology */}
            <Section title="Methodology & Frameworks" id="methodology">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                        { t: 'TOGAF ADM', d: 'Architecture Development Method — iterative framework for facility reference architectures.', c: '#84CC16' },
                        { t: 'Purdue / ISA-95', d: 'Industrial automation hierarchy L0–L4 mapping process-to-enterprise layers with L3.5 DMZ.', c: '#22C55E' },
                        { t: 'HACCP / FSMA', d: 'Hazard Analysis Critical Control Points and Food Safety Modernization Act preventive controls.', c: '#EF4444' },
                        { t: 'IEC 62443', d: 'Industrial cybersecurity standard for zones, conduits, and security levels in OT networks.', c: '#0EA5E9' },
                    ].map(m => (
                        <div key={m.t} className="rounded-xl border border-white/[0.06] p-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
                            <h3 className="text-sm font-semibold mb-1" style={{ color: m.c }}>{m.t}</h3>
                            <p className="text-xs text-gray-500 leading-relaxed">{m.d}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Cross-Facility Purdue Model */}
            <Section title="Cross-Facility Purdue Model Comparison" id="purdue">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead><tr className="border-b border-white/[0.08] text-gray-500">
                            {['Level', 'Grain Elevator', 'Dairy Farm', 'Meatpacking', 'Cold Storage', 'Greenhouse', 'Beverage', 'Feed Mill'].map(h => <th key={h} className="text-left px-2 py-2 font-medium">{h}</th>)}
                        </tr></thead>
                        <tbody>
                            {[
                                ['L4 Enterprise', 'Commodity ERP', 'Dairy coop portal', 'SAP/MES', 'WMS/TMS', 'Crop planning', 'ERP/MES', 'Formulation ERP'],
                                ['L3 Operations', 'Grain acctg', 'Herd mgmt', 'HACCP/FSIS', 'Inventory mgmt', 'Climate recipe', 'Batch mgmt', 'Batch formula'],
                                ['L3.5 DMZ', 'Firewall/VPN', 'Cloud gateway', 'OT/IT FW', 'IDS/data diode', 'Cloud bridge', 'OPC UA GW', 'Firewall'],
                                ['L2 Supervisory', 'Grain SCADA', 'Parlor HMI', 'Line SCADA', 'Refrig SCADA', 'Climate comp', 'ISA-88 batch', 'SCADA/HMI'],
                                ['L1 Control', 'PLC/VFD', 'Parlor PLC', 'Line PLC/VFD', 'Refrig PLC', 'Actuators', 'PLC/VFD', 'PLC/VFD'],
                                ['L0 Process', 'Moisture/temp', 'Flow/temp', 'Temp/NH₃/pH', 'Temp/NH₃/CO₂', 'Sensors', '4-20mA/HART', 'Load cells'],
                            ].map((r, i) => (
                                <tr key={i} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    {r.map((c, j) => <td key={j} className={`px-2 py-2 ${j === 0 ? 'text-[#84CC16] font-medium whitespace-nowrap' : 'text-gray-400'}`}>{c}</td>)}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* Protocol Stack */}
            <Section title="Communication Protocol Stack" id="protocols">
                <div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre className="whitespace-pre leading-relaxed">{`Enterprise    │ SAP/Oracle ERP │ WMS REST API │ GFSI/SQF portals │ EDI 856/945
───────────────┼────────────────┼──────────────┼──────────────────┼───────────
Operations     │ MES (Wonderware) │ HACCP logs │ Herd mgmt cloud │ Batch ISA-88
───────────────┼────────────────┼──────────────┼──────────────────┼───────────
Supervisory    │ OPC UA │ BACnet/IP │ MQTT │ Modbus TCP │ SNMP │ ONVIF
───────────────┼────────────────┼──────────────┼──────────────────┼───────────
Control        │ EtherNet/IP │ PROFINET │ DeviceNet │ CANbus │ ISOBUS
───────────────┼────────────────┼──────────────┼──────────────────┼───────────
Field          │ 4-20 mA │ HART │ Modbus RTU │ RS-485 │ ISO 11784/85 RFID`}</pre>
                </div>
            </Section>

            {/* Cybersecurity */}
            <Section title="Cybersecurity Architecture" id="cybersecurity">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead><tr className="border-b border-white/[0.08] text-gray-500">
                            {['Zone', 'Assets', 'Controls'].map(h => <th key={h} className="text-left px-3 py-2 font-medium">{h}</th>)}
                        </tr></thead>
                        <tbody>
                            {[
                                ['Enterprise (L4)', 'ERP, WMS, e-commerce, GFSI portals', 'WAF, MFA, SIEM, endpoint protection'],
                                ['DMZ (L3.5)', 'OPC UA gateway, data historians, FTP', 'Unidirectional gateway, IDS/IPS, certificate auth'],
                                ['Operations (L3)', 'MES, HACCP, batch mgmt, herd software', 'Role-based access, audit logging, patching'],
                                ['Supervisory (L2)', 'SCADA HMI, climate computers, BMS', 'Application whitelisting, network segmentation'],
                                ['Control (L1)', 'PLCs, VFDs, safety controllers', 'Physical access control, firmware signing'],
                                ['Process (L0)', 'Sensors, actuators, valves, RFID', 'Hardened field devices, tamper detection'],
                            ].map((r, i) => (
                                <tr key={i} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#84CC16] font-medium whitespace-nowrap">{r[0]}</td>
                                    <td className="px-3 py-2 text-gray-300">{r[1]}</td>
                                    <td className="px-3 py-2 text-gray-400">{r[2]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* Facility Articles */}
            <Section title="Facility Reference Architectures" id="facilities">
                <p className="text-sm text-gray-500 mb-4">
                    Seven detailed deep-dive articles covering the major facility types across the Food and Agriculture value chain — each with TOGAF business architecture, bills of materials, Purdue model mapping, and process diagrams.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {FACILITY_ARTICLES.map((f) => (
                        <a key={f.href} href={f.href} className="group rounded-xl border border-white/[0.06] p-4 hover:border-white/[0.12] transition-all duration-300" style={{ background: 'rgba(255,255,255,0.02)' }}>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-xl">{f.icon}</span>
                                <span className="text-[10px] font-mono text-gray-600">{f.subtitle}</span>
                            </div>
                            <h3 className="text-sm font-semibold text-white group-hover:text-[#84CC16] transition-colors">{f.title}</h3>
                            <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">{f.description}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                                {f.tags.map(tag => (
                                    <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded border" style={{ borderColor: `${f.color}30`, color: f.color }}>{tag}</span>
                                ))}
                            </div>
                        </a>
                    ))}
                </div>
            </Section>

            {/* References */}
            <Section title="References" id="references">
                <div className="space-y-2 text-xs text-gray-400 leading-relaxed">
                    <p>USDA. (2024). Food and Agriculture Sector-Specific Plan. Department of Agriculture.</p>
                    <p>FDA. (2023). Food Safety Modernization Act (FSMA) Final Rules. Department of Health and Human Services.</p>
                    <p>FDA. (2023). 21 CFR Part 117: Current Good Manufacturing Practice and Preventive Controls for Human Food.</p>
                    <p>USDA FSIS. (2023). 9 CFR Part 417: Hazard Analysis and Critical Control Point (HACCP) Systems.</p>
                    <p>OSHA. (2023). 29 CFR 1910.272: Grain Handling Facilities. Department of Labor.</p>
                    <p>NFPA. (2022). NFPA 61: Standard for the Prevention of Fires and Dust Explosions in Agricultural and Food Processing Facilities.</p>
                    <p>The Open Group. (2022). TOGAF Standard, Version 10.</p>
                    <p>ISA. (2020). ISA-95 / IEC 62264: Enterprise-Control System Integration. ISA.</p>
                </div>
            </Section>

            {/* See Also */}
            <section className="space-y-3">
                <h2 className="text-lg font-heading font-semibold text-white">See Also</h2>
                <div className="flex flex-wrap gap-2">
                    {[
                        { href: '/wiki/sectors/FOOD', label: 'FOOD Sector Overview', color: '#84CC16' },
                        { href: '/wiki/dexpi/equipment-classes', label: 'DEXPI Equipment Classes', color: '#FF6B00' },
                        { href: '/wiki/chemical', label: 'Chemical Sector Hub', color: '#EF4444' },
                        { href: '/wiki/transportation', label: 'Transportation Hub', color: '#0EA5E9' },
                    ].map(l => (
                        <a key={l.href} href={l.href} className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-white/[0.04]" style={{ borderColor: `${l.color}30`, color: l.color }}>{l.label} &rarr;</a>
                    ))}
                </div>
            </section>
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
