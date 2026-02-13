/**
 * Financial Services Sector Reference Architecture — Wiki Hub Page.
 *
 * Comprehensive overview of the Financial Services Sector critical infrastructure,
 * serving as the entry point to 5 detailed facility-type articles covering
 * Financial Data Centers, Securities Exchange Trading, Clearinghouse & Payment
 * Processing, ATM & Branch Networks, and Insurance Processing Centers.
 *
 * Based on TOGAF Architecture Development Method (ADM) with cross-references
 * to Treasury, SEC, FFIEC, PCI SSC, and NAIC primary standards.
 *
 * @module wiki/financial-services/page
 */

export const metadata = {
    title: 'Financial Services Sector Reference Architecture — Wiki',
    description:
        'TOGAF-based reference architectures for 5 financial facility types: Data Centers, Trading Exchanges, ' +
        'Clearinghouses, ATM/Branch Networks, and Insurance Processing.',
};

/** Facility type cards with routing. */
const FACILITY_ARTICLES = [
    {
        title: 'Financial Data Center',
        subtitle: 'Tier III / IV',
        href: '/wiki/financial-services/data-center',
        icon: '🏦',
        color: '#10B981',
        description:
            'Tier IV fault-tolerant data centers housing core banking systems, payment processing, and ' +
            'disaster recovery with 2N+1 power architecture, precision cooling, and SOC 2 / PCI DSS compliance.',
        tags: ['PCI DSS 4.0', 'SOC 2', 'FFIEC', 'TIA-942'],
    },
    {
        title: 'Securities Exchange',
        subtitle: 'Sub-μs Matching Engines',
        href: '/wiki/financial-services/trading-exchange',
        icon: '📈',
        color: '#3B82F6',
        description:
            'Ultra-low-latency trading infrastructure with FPGA-accelerated matching engines, ' +
            'kernel-bypass networking, PTP time synchronization, and co-location facilities.',
        tags: ['Reg SCI', 'FIX 5.0', 'ITCH/OUCH', 'FPGA'],
    },
    {
        title: 'Clearinghouse & Payments',
        subtitle: 'CCP / RTGS / SWIFT',
        href: '/wiki/financial-services/clearinghouse',
        icon: '🔄',
        color: '#8B5CF6',
        description:
            'Central counterparty clearing, real-time gross settlement (Fedwire), and SWIFT/ISO 20022 ' +
            'payment messaging with mainframe-class throughput and HSM-secured transactions.',
        tags: ['CPMI-IOSCO', 'ISO 20022', 'Dodd-Frank', 'FedNow'],
    },
    {
        title: 'ATM & Branch Network',
        subtitle: 'Self-Service Banking',
        href: '/wiki/financial-services/atm-branch-network',
        icon: '🏧',
        color: '#F59E0B',
        description:
            'ATM deployer networks (Diebold/NCR), teller cash recyclers, vault security, and branch ' +
            'automation with ISO 8583 transaction routing and SD-WAN connectivity.',
        tags: ['PCI PIN', 'ISO 8583', 'XFS/CEN', 'EMV'],
    },
    {
        title: 'Insurance Processing',
        subtitle: 'Claims & Catastrophe Modeling',
        href: '/wiki/financial-services/insurance-processing',
        icon: '🛡️',
        color: '#EC4899',
        description:
            'Large-scale claims adjudication, policy administration (Guidewire), actuarial computing ' +
            'with GPU-accelerated catastrophe models (RMS/AIR), and ACORD XML document exchange.',
        tags: ['Solvency II', 'NAIC', 'ACORD', 'RMS/AIR'],
    },
];

export default function FinancialServicesHubPage() {
    return (
        <div className="max-w-5xl space-y-12">
            {/* Header */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div
                        className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]"
                        style={{ background: '#10B981' }}
                    />
                    <span className="text-xs font-mono text-gray-500">
                        CISA Sector 09 · FINA · Financial Services
                    </span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">
                    Financial Services Sector
                </h1>
                <p className="text-sm text-gray-500 font-mono">SRMA: Department of the Treasury</p>
            </div>

            {/* Executive Summary */}
            <Section title="Executive Summary" id="summary">
                <p className="text-sm text-gray-300 leading-relaxed">
                    The Financial Services sector encompasses the <span className="text-[#10B981] font-medium">banking
                        institutions</span>, <span className="text-[#10B981] font-medium">securities exchanges</span>,
                    {' '}<span className="text-[#10B981] font-medium">clearinghouses</span>,{' '}
                    <span className="text-[#10B981] font-medium">insurance companies</span>, and{' '}
                    <span className="text-[#10B981] font-medium">payment networks</span> that constitute the financial
                    backbone of the global economy. Designated as one of 16 CISA Critical Infrastructure Sectors under
                    PPD-21, the sector is overseen by the Department of the Treasury as its Sector-Specific Risk
                    Management Agency (SRMA).
                </p>
                <p className="text-sm text-gray-300 leading-relaxed mt-3">
                    Financial infrastructure is uniquely characterized by its <strong>extreme latency sensitivity</strong> (securities
                    matching engines operate in sub-microsecond regimes), <strong>regulatory density</strong> (SOX, PCI DSS, GLBA,
                    Reg SCI, Dodd-Frank), and <strong>fault-tolerance requirements</strong> (Tier IV data centers with 99.995% uptime).
                    The sector processes over $5 trillion in daily payments through Fedwire alone, with SWIFT handling
                    45+ million messages per day globally.
                </p>
                <p className="text-sm text-gray-300 leading-relaxed mt-3">
                    This reference architecture spans the full stack — from physical vault security and ATM cash recyclers
                    at the edge, through mainframe-class payment engines and FPGA-accelerated trading systems at the core,
                    to GPU-powered catastrophe modeling and actuarial analytics at the enterprise tier.
                </p>
            </Section>

            {/* Value Chain */}
            <Section title="Financial Services Value Chain" id="value-chain">
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{
                        `┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│ DEPOSIT  │───►│  LEND /  │───►│  TRADE   │───►│  CLEAR   │───►│ SETTLE   │
│& PAYMENT │    │ INSURE   │    │& EXECUTE │    │& NET     │    │& REPORT  │
└──────────┘    └──────────┘    └──────────┘    └──────────┘    └──────────┘
     │               │               │               │               │
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│  ATM /   │    │Insurance│    │Exchange │    │Clearing-│    │  Data   │
│  Branch  │    │ Process │    │ Trading │    │  house  │    │ Center  │
│ Network  │    │ Center  │    │  Floor  │    │   CCP   │    │Tier III+│
└─────────┘    └─────────┘    └─────────┘    └─────────┘    └─────────┘`
                    }</pre>
                </div>
                <p className="text-xs text-gray-500 mt-2 italic">
                    Fig. 1 — End-to-end financial services value chain with mapped facility types.
                </p>
            </Section>

            {/* Methodology */}
            <Section title="Methodology & Frameworks" id="methodology">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        {
                            name: 'TOGAF ADM',
                            desc: 'Architecture Development Method for iterative capability modeling across business, data, application, and technology layers.',
                            color: '#10B981',
                        },
                        {
                            name: 'Purdue / ISA-95',
                            desc: 'Industrial control system hierarchy (Levels 0–4) adapted for financial IT/OT convergence — from ATM dispensers to enterprise ERP.',
                            color: '#3B82F6',
                        },
                        {
                            name: 'NIST CSF 2.0',
                            desc: 'Cybersecurity Framework aligned with FFIEC CAT: Identify, Protect, Detect, Respond, Recover for financial critical infrastructure.',
                            color: '#F59E0B',
                        },
                        {
                            name: 'BIAN / TOGAF',
                            desc: 'Banking Industry Architecture Network service landscape providing standardized capability domains for interoperability.',
                            color: '#8B5CF6',
                        },
                    ].map((fw) => (
                        <div
                            key={fw.name}
                            className="p-4 rounded-lg border border-white/[0.06]"
                            style={{ background: 'rgba(255,255,255,0.02)' }}
                        >
                            <h3
                                className="text-xs font-semibold mb-1"
                                style={{ color: fw.color }}
                            >
                                {fw.name}
                            </h3>
                            <p className="text-xs text-gray-400 leading-relaxed">{fw.desc}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Cross-Facility Purdue Model */}
            <Section title="Cross-Facility Purdue Model Comparison" id="purdue">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Level</th>
                                <th className="text-left px-3 py-2 font-medium">Data Center</th>
                                <th className="text-left px-3 py-2 font-medium">Exchange</th>
                                <th className="text-left px-3 py-2 font-medium">Clearinghouse</th>
                                <th className="text-left px-3 py-2 font-medium">ATM/Branch</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-300 divide-y divide-white/[0.04]">
                            {[
                                ['L4 Enterprise', 'SAP / Oracle ERP', 'Regulatory Reporting', 'SWIFT / ERP', 'Core Banking'],
                                ['L3.5 DMZ', 'API Gateway / WAF', 'FIX Gateway', 'ISO 20022 Gateway', 'Card Network DMZ'],
                                ['L3 Operations', 'DCIM / BMS', 'Order Mgmt / kdb+', 'Netting Engine / MQ', 'ATM Host Switch'],
                                ['L2 Control', 'PDU / ATS Controllers', 'Matching FPGA', 'RTGS / CCP Engine', 'Card Mgmt System'],
                                ['L1 Device', 'UPS / Chiller PLC', 'PTP Clock / NIC', 'HSM / Tokenizer', 'ATM XFS Devices'],
                                ['L0 Process', 'Sensors / Meters', 'Market Feed Capture', 'Nostro Ledger', 'Cash Dispenser'],
                            ].map(([level, dc, exch, ch, atm]) => (
                                <tr key={level} className="hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-gray-500 font-mono">{level}</td>
                                    <td className="px-3 py-2">{dc}</td>
                                    <td className="px-3 py-2">{exch}</td>
                                    <td className="px-3 py-2">{ch}</td>
                                    <td className="px-3 py-2">{atm}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* Protocol Stack */}
            <Section title="Communication Protocol Stack" id="protocols">
                <div
                    className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre className="whitespace-pre leading-relaxed">{
                        `┌─────────────────────────────────────────────────────────────────────┐
│  APPLICATION    FIX 5.0 │ ISO 20022 │ ISO 8583 │ ACORD XML │ REST │
├─────────────────────────────────────────────────────────────────────┤
│  SESSION        ITCH/OUCH │ SWIFT MT/MX │ NDC/DDC │ SOAP │ gRPC  │
├─────────────────────────────────────────────────────────────────────┤
│  TRANSPORT      TCP │ InfiniBand │ RDMA │ IBM MQ │ Kafka           │
├─────────────────────────────────────────────────────────────────────┤
│  NETWORK        MPLS │ DWDM │ SD-WAN │ IPsec VPN │ 100GbE         │
├─────────────────────────────────────────────────────────────────────┤
│  PHYSICAL       Dark Fiber │ LTE/5G Backup │ Leased Line │ Copper │
└─────────────────────────────────────────────────────────────────────┘`
                    }</pre>
                </div>
            </Section>

            {/* Cybersecurity Architecture */}
            <Section title="Cybersecurity Architecture" id="cybersecurity">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08] text-gray-500">
                                <th className="text-left px-3 py-2 font-medium">Zone</th>
                                <th className="text-left px-3 py-2 font-medium">Controls</th>
                                <th className="text-left px-3 py-2 font-medium">Standard</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-300 divide-y divide-white/[0.04]">
                            {[
                                ['Perimeter', 'Next-Gen Firewall, DDoS Mitigation, IDS/IPS', 'PCI DSS 4.0 Req 1'],
                                ['DMZ', 'WAF, API Gateway, Reverse Proxy, MFA', 'FFIEC CAT'],
                                ['Transaction Zone', 'HSM Encryption, Tokenization, TLS 1.3 Mutual Auth', 'PCI PIN'],
                                ['Core Processing', 'Microsegmentation, SIEM, Zero Trust Network', 'NIST 800-53'],
                                ['Data Tier', 'AES-256 at Rest, Key Rotation, DLP, RBAC', 'GLBA / SOX'],
                                ['DR / BCP', 'Geo-Redundant Site, RPO < 5min, RTO < 1hr', 'FFIEC BCP'],
                            ].map(([zone, controls, standard]) => (
                                <tr key={zone} className="hover:bg-white/[0.02]">
                                    <td className="px-3 py-2 text-[#10B981] font-medium whitespace-nowrap">{zone}</td>
                                    <td className="px-3 py-2 text-gray-400">{controls}</td>
                                    <td className="px-3 py-2 text-gray-500">{standard}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* Facility Article Cards */}
            <Section title="Facility Deep Dives" id="facilities">
                <p className="text-sm text-gray-400 mb-4">
                    Detailed TOGAF reference architectures for each facility type in the Financial Services sector.
                    Each article covers 10 standardized sections from business architecture through data flow.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {FACILITY_ARTICLES.map((article) => (
                        <a
                            key={article.href}
                            href={article.href}
                            className="group flex flex-col p-5 rounded-xl border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300"
                            style={{ background: 'rgba(255,255,255,0.015)' }}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-2xl">{article.icon}</span>
                                <span
                                    className="text-[10px] font-mono px-2 py-0.5 rounded"
                                    style={{
                                        background: `${article.color}15`,
                                        color: article.color,
                                    }}
                                >
                                    {article.subtitle}
                                </span>
                            </div>
                            <h3 className="text-sm font-semibold text-white group-hover:text-[#10B981] transition-colors mb-1">
                                {article.title}
                            </h3>
                            <p className="text-xs text-gray-500 leading-relaxed flex-1">
                                {article.description}
                            </p>
                            <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/[0.04]">
                                {article.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-[9px] px-1.5 py-0.5 rounded bg-white/[0.04] text-gray-500"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </a>
                    ))}
                </div>
            </Section>

            {/* References */}
            <Section title="References" id="references">
                <ul className="space-y-2 text-xs text-gray-500 font-mono">
                    <li>• Department of the Treasury. (2024). <em>Financial Services Sector-Specific Plan.</em> DHS.</li>
                    <li>• FFIEC. (2023). <em>IT Examination Handbook — Information Security.</em> Federal Financial Institutions Examination Council.</li>
                    <li>• PCI SSC. (2024). <em>PCI DSS v4.0: Payment Card Industry Data Security Standard.</em> PCI Security Standards Council.</li>
                    <li>• SEC. (2014). <em>Regulation SCI: Systems Compliance and Integrity.</em> Federal Register, 79(164).</li>
                    <li>• CPMI-IOSCO. (2012). <em>Principles for Financial Market Infrastructures.</em> Bank for International Settlements.</li>
                    <li>• NIST. (2024). <em>NIST Cybersecurity Framework 2.0.</em> National Institute of Standards and Technology.</li>
                    <li>• Uptime Institute. (2023). <em>Data Center Site Infrastructure Tier Standard: Topology.</em></li>
                    <li>• BIAN. (2023). <em>Banking Industry Architecture Network Service Landscape v12.</em> BIAN e.V.</li>
                </ul>
            </Section>

            {/* See Also */}
            <Section title="See Also" id="see-also">
                <div className="flex flex-wrap gap-3">
                    {[
                        { label: 'FINA Sector Overview', href: '/wiki/sectors/FINA', color: '#10B981' },
                        { label: 'Energy Sector', href: '/wiki/energy', color: '#F59E0B' },
                        { label: 'IT Sector', href: '/wiki/sectors/ITEC', color: '#8B5CF6' },
                        { label: 'DEXPI Equipment Classes', href: '/wiki/dexpi', color: '#06B6D4' },
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
