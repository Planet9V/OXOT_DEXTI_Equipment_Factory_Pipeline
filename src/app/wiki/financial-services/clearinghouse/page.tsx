/**
 * Clearinghouse & Payment Processing — Deep Dive Wiki Article.
 * CCP netting, RTGS (Fedwire), SWIFT/ISO 20022 payment messaging.
 * @module wiki/financial-services/clearinghouse/page
 */
export const metadata = {
    title: 'Clearinghouse & Payments — FINA Deep Dive',
    description: 'CCP clearing, RTGS, and ISO 20022 payment processing reference architecture.',
};
const C = '#8B5CF6';
export default function ClearinghousePage() {
    return (
        <div className="max-w-5xl space-y-10">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]" style={{ background: C }} />
                    <span className="text-xs font-mono text-gray-500">FINA · FINA-SM · CLEARINGHOUSE</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">Clearinghouse & Payment Processing</h1>
                <p className="text-sm text-gray-400">CCP Netting · RTGS (Fedwire) · SWIFT / ISO 20022 · HSM-Secured</p>
            </div>
            <S title="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-300 leading-relaxed">Clearinghouses and payment networks constitute the <span className="text-[#8B5CF6] font-medium">settlement backbone</span> of global finance. They interpose between counterparties as Central Counterparties (CCPs), manage multilateral netting, and execute Real-Time Gross Settlement (RTGS) through systems like <span className="text-[#8B5CF6] font-medium">Fedwire</span> and <span className="text-[#8B5CF6] font-medium">FedNow</span>. SWIFT processes 45M+ messages daily.</p>
                <h3 className="text-xs font-semibold text-gray-400 mt-4 mb-2">Stakeholders</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>Federal Reserve — Fedwire, FedNow, monetary policy</li>
                    <li>DTCC / NSCC / FICC — Securities clearing</li>
                    <li>CLS Bank — FX settlement, PvP mechanism</li>
                    <li>SWIFT — Global messaging network</li>
                    <li>Clearing Members — Banks and financial institutions</li>
                    <li>CPMI-IOSCO — International standards body</li>
                </ul>
                <h3 className="text-xs font-semibold text-gray-400 mt-4 mb-2">Regulatory Framework</h3>
                <T heads={['Standard', 'Scope']} rows={[
                    ['Dodd-Frank Title VII', 'Derivatives clearing mandates'],
                    ['CPMI-IOSCO PFMI', 'Principles for Financial Market Infrastructures'],
                    ['EMIR', 'EU clearing mandates for OTC derivatives'],
                    ['Fed Reg II', 'Faster payments, debit interchange'],
                    ['BSA / AML', 'Bank Secrecy Act, anti-money laundering'],
                    ['OFAC / SDN', 'Sanctions screening requirements'],
                ]} />
            </S>
            <S title="2. High-Level Design" id="design">
                <p className="text-sm text-gray-300 leading-relaxed">Hub-and-spoke topology with the clearinghouse as central hub. Participants connect via secure gateways (SWIFT VPN, MPLS). Supports both <span className="text-[#8B5CF6] font-medium">RTGS</span> (real-time gross, irrevocable) and <span className="text-[#8B5CF6] font-medium">DNS</span> (deferred net settlement, batch netting). Active-active geo-clusters with N+1 fault tolerance.</p>
                <Diagram>{
                    `PARTICIPANT A ──SWIFT MT/MX──► ┌──────────────────────┐ ──►  SETTLEMENT
PARTICIPANT B ──ISO 20022───► │   CLEARING ENGINE    │      (Fedwire RTGS)
PARTICIPANT C ──FedNow──────► │  ┌────────────────┐  │
                               │  │ VALIDATION     │  │ ──►  NETTING
                               │  │ SANCTIONS      │  │      (Multilateral)
                               │  │ NETTING/SETTLE │  │
                               │  │ RECONCILIATION │  │ ──►  REPORTING
                               │  └────────────────┘  │      (Regulatory)
                               └──────────────────────┘

HSM LAYER: Thales nShield (10k ops/sec) · FIPS 140-2 Level 3`
                }</Diagram>
            </S>
            <S title="3. Detailed Technical Description" id="tech">
                <h3 className="text-xs font-semibold text-gray-400 mb-2">3.1 Message Processing</h3>
                <p className="text-sm text-gray-300 leading-relaxed">Handles 50,000–500,000 TPS for RTGS systems. SWIFT daily volumes: 45M messages. Parallel ISO 20022/MT parsers with schema validation. SLA: 99.999% uptime, &lt;100ms end-to-end latency. IBM z16 mainframes (100k MIPS) for core processing.</p>
                <h3 className="text-xs font-semibold text-gray-400 mt-5 mb-2">3.2 Netting & Settlement</h3>
                <p className="text-sm text-gray-300 leading-relaxed">CCP multilateral netting cycles compute in &lt;5 seconds. RTGS settles gross in real-time with irrevocable finality. Throughput: 10,000–100,000 settlements/hour. DvP (Delivery versus Payment) and PvP (Payment versus Payment) atomicity ensures Herstatt risk elimination.</p>
                <h3 className="text-xs font-semibold text-gray-400 mt-5 mb-2">3.3 Liquidity Management</h3>
                <p className="text-sm text-gray-300 leading-relaxed">Real-time pre-funded account monitoring. Intraday credit facilities and collateral optimization via queuing models. 1M+ positions/sec valuation. Automated margin calls and collateral haircuts per CPMI-IOSCO Cover-2 requirements.</p>
                <h3 className="text-xs font-semibold text-gray-400 mt-5 mb-2">3.4 Fraud & Sanctions</h3>
                <p className="text-sm text-gray-300 leading-relaxed">ML-based anomaly scoring on 100% of flows (1–10ms inference). OFAC/EU sanctions screening via World-Check API. Graph analytics for correspondent banking AML. 1B transactions/day screened with 95% auto-clear in &lt;1 hour.</p>
                <h3 className="text-xs font-semibold text-gray-400 mt-5 mb-2">3.5 Reconciliation</h3>
                <p className="text-sm text-gray-300 leading-relaxed">Automated nostro/vostro reconciliation across 10M+ daily matches. Breaks detection with auto-resolution engine. SLA: 95% auto-reconciliation in &lt;1 hour, 100% by T+1.</p>
            </S>
            <S title="4. Process Diagrams" id="process">
                <h3 className="text-xs font-semibold text-gray-400 mb-2">4.1 Payment Lifecycle</h3>
                <Diagram>{
                    `INITIATE (ISO 20022 pacs.008) ──► VALIDATE (schema + business rules)
                                        │
                                   SCREEN (OFAC/AML, <10ms)
                                        │
                                   ROUTE (gateway selection)
                                        │
                                   NET/SETTLE (CCP or RTGS)
                                        │
                                   RECONCILE ──► CONFIRM (pacs.002)`
                }</Diagram>
                <h3 className="text-xs font-semibold text-gray-400 mt-5 mb-2">4.2 CCP Clearing Cycle</h3>
                <Diagram>{
                    `TRADE INPUTS ──► POSITION CALCULATION ──► MULTILATERAL NETTING
                                                │
                                         MARGIN CALL (if needed)
                                                │
                                         NET SETTLEMENT ──► INTRADAY SETTLE
                                                │
                                         REGULATORY REPORT`
                }</Diagram>
                <h3 className="text-xs font-semibold text-gray-400 mt-5 mb-2">4.3 Exception Handling</h3>
                <Diagram>{
                    `DETECT BREAK (timeout / mismatch) ──► QUEUE (exception manager)
                                            │
                                     AUTO-RESOLVE (rules engine)
                                            │
                                     [PASS] ──► RE-SETTLE    [FAIL] ──► MANUAL REVIEW
                                                                         SLA: <30 min`
                }</Diagram>
            </S>
            <S title="5. Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2 italic">Reference: Tier-1 clearinghouse, multi-region</p>
                <T heads={['Equipment', 'Specification', 'Qty', 'Rating']} rows={[
                    ['Mainframe', 'IBM z16', '4–8', '100k MIPS'],
                    ['HPC Cluster', 'HPE Superdome X', '8–16', '1,000+ cores'],
                    ['K8s Worker Node', 'Dell R760, 128 vCPU', '50–100', '500 vCPUs'],
                    ['HSM', 'Thales nShield Connect XC', '8–16', '10k ops/sec'],
                    ['FIPS Tokenizer', 'Voltage SecureData', '4–8', 'FIPS 140-2 L3'],
                    ['Core Switch', 'Cisco Nexus 9500, 400GbE', '8–12', 'Non-blocking'],
                    ['Load Balancer', 'F5 BIG-IP, 1M conn/sec', '4–8', 'HA pair'],
                    ['Firewall', 'Juniper SRX5800', '4–8', '400 Gbps'],
                    ['SAN Array', 'EMC PowerMax', '4–8', '10 PB, 1M IOPS'],
                    ['Flash Storage', 'NetApp ONTAP AFF A900', '4–8', 'Hybrid, dedupe'],
                    ['Message Queue', 'IBM MQ / Kafka cluster', '8–16', '1M msg/sec'],
                    ['Event Stream', 'Solace PubSub+', '4–8', 'Persistent queues'],
                    ['SIEM', 'Splunk Enterprise', '4–8', '1 TB/day ingest'],
                    ['APM', 'Dynatrace', 'Full stack', 'Trace every TX'],
                    ['Backup', 'Veeam / Commvault', '4–8', 'RPO <5 min'],
                    ['DR Site', 'Geo-mirrored, 3 regions', '1', 'Active-passive'],
                    ['WAN Router', 'Cisco ASR 9900, MPLS', '4–8', '100 Gbps'],
                    ['DWDM', 'Cisco NCS 1004', '2–4', '96-ch C-band'],
                ]} />
            </S>
            <S title="6. Purdue Model Mapping" id="purdue">
                <T heads={['Level', 'Components', 'Protocols']} rows={[
                    ['L4 Enterprise', 'SAP ERP, Analytics (Hadoop), Reports', 'REST, SFTP, JDBC'],
                    ['L3.5 DMZ', 'SWIFT gateway, FedNow API, ISO proxy', 'ISO 20022, MT/MX, TLS'],
                    ['L3 Operations', 'Netting engine, liquidity optimizer, MQ', 'IBM MQ, Kafka, gRPC'],
                    ['L2 Control', 'RTGS / CCP core (mainframe)', 'ISO 20022 pacs, SWIFT FIN'],
                    ['L1 Device', 'HSM, Tokenizer, Key Manager', 'PKCS#11, FIPS 140-2'],
                    ['L0 Process', 'Nostro ledger, settlement finality', 'SHA-256, idempotency keys'],
                ]} />
            </S>
            <S title="7. Supporting Systems" id="supporting">
                <T heads={['System', 'Description', 'Specification']} rows={[
                    ['HSM Encryption', 'Transaction signing & key custody', 'Thales nShield, FIPS 140-2 L3'],
                    ['Sanctions Screening', 'OFAC/EU list matching', 'World-Check API, <10ms'],
                    ['AML / Graph Analytics', 'Correspondent banking risk', 'Neo4j/TigerGraph'],
                    ['Disaster Recovery', 'Geo-redundant active-passive', 'RPO <5min, RTO <1hr'],
                    ['Regulatory Reporting', 'Daily/quarterly to Fed, SEC', 'SFTP, secure portal'],
                    ['Audit Trail', 'Immutable transaction log', 'Append-only, SHA-256'],
                ]} />
            </S>
            <S title="8. Messaging Standards" id="messaging">
                <T heads={['Standard', 'Format', 'Use Case']} rows={[
                    ['ISO 20022', 'XML (pacs/camt/pain)', 'Payment initiation, clearing, reporting'],
                    ['SWIFT MT', 'Proprietary text', 'Legacy cross-border payments'],
                    ['SWIFT MX', 'ISO 20022 envelope', 'Next-gen cross-border'],
                    ['FedNow', 'ISO 20022 + API', 'Real-time domestic payments'],
                    ['FIX 5.0', 'Tagged binary/text', 'Securities allocation & clearing'],
                    ['ISO 8583', 'Binary bitmap', 'Card network authorization'],
                ]} />
            </S>
            <S title="9. Data Flow Architecture" id="data-flow">
                <Diagram>{
                    `┌───────────────────────────────────────────────────────────────────┐
│  TIER 4 — ENTERPRISE   ERP · Analytics · Regulatory Reporting    │
├───────────────────────────────────────────────────────────────────┤
│  TIER 3.5 — DMZ   SWIFT Gateway · FedNow API · ISO 20022 Proxy  │
│  45M msgs/day · TLS mutual auth · Sanctions screening            │
├───────────────────────────────────────────────────────────────────┤
│  TIER 3 — OPS   Netting Engine · Liquidity Optimizer · MQ/Kafka  │
│  100K settlements/hr · 1M msg/sec · Real-time position tracking  │
├───────────────────────────────────────────────────────────────────┤
│  TIER 2 — CONTROL   RTGS Core · CCP Engine · Reconciliation     │
│  IBM z16 mainframe · 100k MIPS · Irrevocable settlement          │
├───────────────────────────────────────────────────────────────────┤
│  TIER 1 — SECURITY   HSM (Thales) · Tokenizer · Key Management  │
│  FIPS 140-2 L3 · 10k signing ops/sec · PKCS#11                  │
├───────────────────────────────────────────────────────────────────┤
│  TIER 0 — LEDGER   Nostro/Vostro · Settlement Finality · Audit   │
│  SHA-256 integrity · Idempotency · Append-only                   │
└───────────────────────────────────────────────────────────────────┘`
                }</Diagram>
            </S>
            <S title="10. References" id="references">
                <ul className="space-y-2 text-xs text-gray-500 font-mono">
                    <li>• CPMI-IOSCO. (2012). <em>Principles for Financial Market Infrastructures.</em> BIS.</li>
                    <li>• Federal Reserve. (2023). <em>Fedwire Funds Service.</em></li>
                    <li>• Federal Reserve. (2023). <em>FedNow Service.</em></li>
                    <li>• SWIFT. (2024). <em>ISO 20022 Migration Programme.</em></li>
                    <li>• DTCC. (2023). <em>NSCC Rules & Procedures.</em></li>
                    <li>• Dodd-Frank Act. (2010). <em>Title VII — Wall Street Transparency.</em></li>
                    <li>• NIST. (2019). <em>FIPS 140-2: Security Requirements for Crypto Modules.</em></li>
                    <li>• CLS Bank. (2023). <em>Settlement Service Description.</em></li>
                </ul>
            </S>
            <S title="See Also" id="see-also">
                <div className="flex flex-wrap gap-3">
                    {[
                        { label: 'Financial Services Hub', href: '/wiki/financial-services', color: '#10B981' },
                        { label: 'Trading Exchange', href: '/wiki/financial-services/trading-exchange', color: '#3B82F6' },
                        { label: 'Data Center', href: '/wiki/financial-services/data-center', color: '#10B981' },
                        { label: 'FINA Sector', href: '/wiki/sectors/FINA', color: '#10B981' },
                    ].map((l) => (
                        <a key={l.label} href={l.href} className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-white/[0.04]" style={{ borderColor: `${l.color}30`, color: l.color }}>{l.label} →</a>
                    ))}
                </div>
            </S>
        </div>
    );
}
function S({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
    return (<section id={id} className="space-y-4 pt-8 border-t border-white/[0.04]"><h2 className="text-lg font-heading font-semibold text-white/90">{title}</h2>{children}</section>);
}
function Diagram({ children }: { children: string }) {
    return (<div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}><pre className="whitespace-pre leading-relaxed">{children}</pre></div>);
}
function T({ heads, rows }: { heads: string[]; rows: string[][] }) {
    return (<div className="overflow-x-auto"><table className="w-full text-xs border-collapse"><thead><tr className="border-b border-white/[0.08] text-gray-500">{heads.map(h => <th key={h} className="text-left px-3 py-2 font-medium">{h}</th>)}</tr></thead><tbody className="text-gray-300 divide-y divide-white/[0.04]">{rows.map((r, i) => <tr key={i} className="hover:bg-white/[0.02]">{r.map((c, j) => <td key={j} className={j === 0 ? 'px-3 py-2 text-[#8B5CF6] font-medium whitespace-nowrap' : 'px-3 py-2 text-gray-400'}>{c}</td>)}</tr>)}</tbody></table></div>);
}
