/**
 * Securities Exchange Trading Infrastructure — Deep Dive Wiki Article.
 * Ultra-low-latency matching engines, FPGA acceleration, co-location.
 * @module wiki/financial-services/trading-exchange/page
 */
export const metadata = {
    title: 'Securities Exchange Trading — FINA Deep Dive',
    description: 'Ultra-low-latency matching engine reference architecture with FPGA acceleration and FIX/ITCH protocols.',
};
const C = '#3B82F6';
export default function TradingExchangePage() {
    return (
        <div className="max-w-5xl space-y-10">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]" style={{ background: C }} />
                    <span className="text-xs font-mono text-gray-500">FINA · FINA-SM · EXCHANGE</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">Securities Exchange Trading</h1>
                <p className="text-sm text-gray-400">Sub-μs Matching Engines · FPGA Acceleration · Co-Location</p>
            </div>
            <S title="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-300 leading-relaxed">Securities exchange trading infrastructure supports the <span className="text-[#3B82F6] font-medium">price discovery</span>, <span className="text-[#3B82F6] font-medium">order matching</span>, and <span className="text-[#3B82F6] font-medium">market data dissemination</span> functions critical to capital markets. The SEC&apos;s Regulation SCI mandates automated systems resilience with 99.999% uptime for systemically important market infrastructure.</p>
                <h3 className="text-xs font-semibold text-gray-400 mt-4 mb-2">Stakeholders</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>SEC — Market integrity, Reg SCI, Reg NMS enforcement</li>
                    <li>FINRA — Broker-dealer supervision, communications auditing</li>
                    <li>Exchanges — NYSE, NASDAQ, CBOE matching engine operators</li>
                    <li>Broker-Dealers — Direct Market Access (DMA) participants</li>
                    <li>Market Makers — Liquidity providers, quoting obligations</li>
                    <li>DTCC / NSCC — Central counterparty clearing</li>
                    <li>FPGA/NIC Vendors — Xilinx, Solarflare, Mellanox</li>
                </ul>
                <h3 className="text-xs font-semibold text-gray-400 mt-4 mb-2">Regulatory Framework</h3>
                <T heads={['Standard', 'Scope']} rows={[
                    ['SEC Reg SCI', 'Systems Compliance and Integrity — resilience testing'],
                    ['Reg NMS', 'National Market System — best execution, order protection'],
                    ['MiFID II', 'EU algorithmic trading controls, transparency'],
                    ['FINRA Rules', 'Broker-dealer supervision, 3110/3120 reviews'],
                    ['SEC Rule 15c3-5', 'Market access risk controls, pre-trade checks'],
                    ['CAT NMS Plan', 'Consolidated Audit Trail for order tracking'],
                ]} />
            </S>
            <S title="2. High-Level Design" id="design">
                <p className="text-sm text-gray-300 leading-relaxed">The canonical exchange architecture is optimized for <span className="text-[#3B82F6] font-medium">deterministic sub-microsecond latency</span>. Kernel-bypass networking (Solarflare Onload, DPDK) eliminates OS overhead. FPGA-accelerated matching engines (Xilinx Alveo) provide &lt;1μs order-to-ACK. Co-location facilities place participant servers within meters of the matching engine for minimized propagation delay.</p>
                <Diagram>{
                    `[Broker-Dealers] ──DMA──► [FIX Gateway] ──► [Risk Engine] ──► [Matching Engine]
                            (FIX 5.0)      (FPGA <1μs)      (FPGA <700ns)
                                                                   │
                                                          [Market Data Handler]
                                                          (ITCH 5.0 multicast)
                                                                   │
                                                          [Clearing Gateway]
                                                          (FIX → DTCC/NSCC)

CO-LOCATION: 100GbE fabric · PTPv2 <50ns sync · FPGA servers in exchange DC`
                }</Diagram>
                <p className="text-xs text-gray-500 mt-1 italic">Fig. 1 — Exchange trading data path from order submission to market data multicast.</p>
            </S>
            <S title="3. Detailed Technical Description" id="tech">
                <h3 className="text-xs font-semibold text-gray-400 mb-2">3.1 Matching Engine</h3>
                <p className="text-sm text-gray-300 leading-relaxed">Deterministic price-time priority matching on Xilinx Virtex UltraScale+ FPGAs. Throughput: 10M orders/sec, &lt;700ns match time. Solarflare XtremeScale NICs with sub-500ns round-trip. OUCH 5.0 binary gateway for order entry (&lt;5μs ACK). Active-active redundancy with quorum replication, failover in &lt;100μs.</p>
                <h3 className="text-xs font-semibold text-gray-400 mt-5 mb-2">3.2 Market Data Distribution</h3>
                <p className="text-sm text-gray-300 leading-relaxed">Top-of-book and depth-of-book feeds via ITCH 5.0 multicast. Arista 7280R3 switches (100GbE, 1.2 Tbps/port). Mellanox ConnectX-6 RDMA adapters (200 Gbps). Throughput: 100M+ updates/sec, &lt;10μs event-to-multicast. FAST 1.2 compression for cross-asset feeds.</p>
                <h3 className="text-xs font-semibold text-gray-400 mt-5 mb-2">3.3 Risk Management</h3>
                <p className="text-sm text-gray-300 leading-relaxed">Pre-trade: FPGA risk cards (Celoxica, 50ns checks) for position limits, fat-finger, velocity. Post-trade: kdb+ (Kx Systems, 1B events/sec) for anomaly detection and surveillance. Market circuit breakers (LULD per SEC Rule 201/412) halt at 5–20% moves. Kill switches activate in &lt;10ms.</p>
                <h3 className="text-xs font-semibold text-gray-400 mt-5 mb-2">3.4 Clearing & Settlement</h3>
                <p className="text-sm text-gray-300 leading-relaxed">Post-match trades routed to CCP (NSCC/DTCC) via FIX 5.0 SP2 allocations. IBM Power10 hybrid cloud gateways. TIBCO EMS message queues for guaranteed delivery. T+1 settlement cycle (SEC Rule 15c6-1). DvP (Delivery versus Payment) atomicity.</p>
                <h3 className="text-xs font-semibold text-gray-400 mt-5 mb-2">3.5 Network Infrastructure</h3>
                <p className="text-sm text-gray-300 leading-relaxed">Co-location optimized: Solarflare 800GbE switches, PTPv2/IEEE 1588 clocks (&lt;50ns sync). Kernel bypass via DPDK/SPDK (50M pps/port). InfiniBand NDR 400 Gbps for RDMA interconnect. Dual-diverse dark fiber entry with &lt;100m cable run to matching engine.</p>
            </S>
            <S title="4. Process Diagrams" id="process">
                <h3 className="text-xs font-semibold text-gray-400 mb-2">4.1 Order Lifecycle</h3>
                <Diagram>{
                    `BROKER ──FIX 5.0──► DMA GATEWAY ──► RISK ENGINE (FPGA, <1μs)
                                           │
                                    [PASS] ──► MATCHING ENGINE (FPGA, <700ns)
                                                       │
                                              OUCH ACK ◄─── MATCH ──► ITCH MULTICAST
                                                                  ──► CLEARING (FIX → DTCC)`
                }</Diagram>
                <h3 className="text-xs font-semibold text-gray-400 mt-5 mb-2">4.2 Market Data Distribution</h3>
                <Diagram>{
                    `MATCHING ENGINE ──► EVENT TIMESTAMP (PTP, <50ns)
                         │
                    ITCH/FAST SERIALIZER (<5μs)
                         │
                    MULTICAST SWITCH (Arista 7280R3)
                         │
              ┌──────────┼──────────┐
         CO-LO SUB A  CO-LO SUB B  SIP FEED
         (<10μs)       (<10μs)      (consolidated)`
                }</Diagram>
                <h3 className="text-xs font-semibold text-gray-400 mt-5 mb-2">4.3 Risk & Circuit Breaker</h3>
                <Diagram>{
                    `ORDER ──► PRE-TRADE (FPGA, 50ns)
               │
          [Position / Velocity / Fat-Finger Check]
               │
         PASS ──► MATCH    FAIL ──► REJECT
               │
          POST-TRADE (kdb+, 1B events/sec)
               │
          ANOMALY ──► LULD HALT (5-20% move) ──► KILL SWITCH (<10ms)`
                }</Diagram>
            </S>
            <S title="5. Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2 italic">Reference: Tier-1 equity exchange co-location facility</p>
                <T heads={['Equipment', 'Specification', 'Qty', 'Rating']} rows={[
                    ['Matching Server', 'Supermicro SYS-821GE, Dual Xeon 8380', '20', '2TB DDR4, 100GbE'],
                    ['FPGA Card', 'Xilinx Alveo U55C, 16nm', '40', '10M orders/sec'],
                    ['NIC', 'Mellanox ConnectX-6 Dx, RDMA', '80', '200 GbE'],
                    ['Core Switch', 'Arista 7060X4, 128×QSFP28', '12', '51.2 Tbps'],
                    ['Multicast Switch', 'Arista 7280R3, 100GbE', '8', '1.2 Tbps/port'],
                    ['PTP Grandmaster', 'Microchip TimeProvider 4100', '6', '<50ns, GPS'],
                    ['Backup Clock', 'Oscilloquartz OSA 3350', '6', 'BlueSky+ GNSS'],
                    ['NVMe Storage', 'Pure FlashArray//X90', '4', '1 PB, 100 GB/s'],
                    ['Risk Server', 'Dell R760xa, AMD EPYC 9754', '16', 'FPGA slots'],
                    ['Load Balancer', 'F5 BIG-IP iSeries', '8', '200 Gbps L7'],
                    ['DMZ Switch', 'Cisco Nexus 9336C-FX2', '10', '100GbE, VXLAN'],
                    ['Historical Store', 'NetApp AFF A900', '2', '2 PB, 30M IOPS'],
                    ['FPGA Dev Kit', 'AMD VCK5000 Versal ACAP', '12', 'FIX parsing'],
                    ['Co-Lo Rack', 'APC NetShelter SX 42U', '20', 'Dual PDU'],
                    ['UPS', 'Eaton 93PM', '4', '500 kVA, 15 min'],
                    ['kdb+ Analytics', 'Kx Systems license', '4', '1B events/sec'],
                ]} />
            </S>
            <S title="6. Purdue Model Mapping" id="purdue">
                <T heads={['Level', 'Components', 'Protocols']} rows={[
                    ['L4 Enterprise', 'Regulatory reporting, TOGAF oversight', 'REST, SFTP, CAT upload'],
                    ['L3.5 DMZ', 'FIX gateways, ITCH multicast to brokers', 'FIX 5.0, TLS 1.3'],
                    ['L3 Operations', 'Order management, kdb+ analytics', 'Kafka, gRPC'],
                    ['L2 Control', 'Matching engine FPGAs, risk gates', 'OUCH 5.0, ITCH 5.0'],
                    ['L1 Device', 'PTP clocks, FPGA timestamping', 'IEEE 1588, <50ns'],
                    ['L0 Process', 'Market feed capture, co-lo sensors', 'InfiniBand NDR'],
                ]} />
            </S>
            <S title="7. Supporting Systems" id="supporting">
                <T heads={['System', 'Description', 'Specification']} rows={[
                    ['UPS Power', 'Double-conversion with flywheel', '500 kVA, 15 min bridge'],
                    ['Precision Cooling', 'In-row CDU for high-density racks', '30–50 kW/rack, N+1'],
                    ['Time Sync', 'GPS-disciplined PTPv2 grandmaster', '<50ns accuracy'],
                    ['Physical Security', 'Mantrap, biometric, CCTV', 'SOC 2 Type II compliant'],
                    ['DR/BCP', 'Active-active geo-redundancy', 'RPO <1s, RTO <5s'],
                    ['Surveillance', 'Market surveillance (kdb+ + ML)', '1B events/day'],
                ]} />
            </S>
            <S title="8. Latency Budget & Optimization" id="latency">
                <T heads={['Component', 'Latency', 'Technique']} rows={[
                    ['Network Ingress', '<500ns', 'Kernel bypass (DPDK/Onload)'],
                    ['FIX Parse', '<1μs', 'FPGA hardware parser'],
                    ['Risk Check', '<50ns', 'Celoxica FPGA, pipeline'],
                    ['Order Match', '<700ns', 'Xilinx Alveo, deterministic'],
                    ['ITCH Serialize', '<5μs', 'FAST 1.2 compression'],
                    ['Multicast Hop', '<100ns', 'Cut-through switching'],
                ]} />
            </S>
            <S title="9. Data Flow Architecture" id="data-flow">
                <Diagram>{
                    `┌───────────────────────────────────────────────────────────────────┐
│  TIER 4 — ENTERPRISE   Regulatory (CAT/OATS) · Risk Reports     │
├───────────────────────────────────────────────────────────────────┤
│  TIER 3.5 — DMZ   FIX Gateway · ITCH Multicast · SIP Feed       │
│  (100K+ concurrent connections · TLS mutual auth)                │
├───────────────────────────────────────────────────────────────────┤
│  TIER 3 — OPS   Order Mgmt · kdb+ Surveillance · Kafka Stream   │
│  10M msgs/sec · 100M market updates/sec · 1B events/day audit   │
├───────────────────────────────────────────────────────────────────┤
│  TIER 2 — MATCHING   FPGA Engine · Risk FPGA · PTP Clock        │
│  <700ns match · <50ns risk · <50ns time sync                     │
├───────────────────────────────────────────────────────────────────┤
│  TIER 1 — NETWORK   100GbE Fabric · InfiniBand · RDMA           │
│  Kernel bypass · 50M pps/port · cut-through forwarding           │
├───────────────────────────────────────────────────────────────────┤
│  TIER 0 — PHYSICAL   Fiber optic · Co-lo rack · GPS antenna     │
└───────────────────────────────────────────────────────────────────┘`
                }</Diagram>
            </S>
            <S title="10. References" id="references">
                <ul className="space-y-2 text-xs text-gray-500 font-mono">
                    <li>• SEC. (2014). <em>Regulation SCI.</em> Federal Register, 79(164).</li>
                    <li>• SEC. (2005). <em>Regulation NMS.</em> 17 CFR §242.</li>
                    <li>• FINRA. (2023). <em>Rule 3110: Supervision.</em></li>
                    <li>• IEEE. (2020). <em>IEEE 1588-2019: PTP.</em></li>
                    <li>• Xilinx. (2023). <em>Alveo U55C Data Sheet.</em></li>
                    <li>• Kx Systems. (2024). <em>kdb+ for Capital Markets.</em></li>
                    <li>• DTCC. (2023). <em>NSCC Rules & Procedures.</em></li>
                    <li>• ESMA. (2022). <em>MiFID II Technical Standards.</em></li>
                </ul>
            </S>
            <S title="See Also" id="see-also">
                <div className="flex flex-wrap gap-3">
                    {[
                        { label: 'Financial Services Hub', href: '/wiki/financial-services', color: '#10B981' },
                        { label: 'Clearinghouse', href: '/wiki/financial-services/clearinghouse', color: '#8B5CF6' },
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
    return (<div className="overflow-x-auto"><table className="w-full text-xs border-collapse"><thead><tr className="border-b border-white/[0.08] text-gray-500">{heads.map(h => <th key={h} className="text-left px-3 py-2 font-medium">{h}</th>)}</tr></thead><tbody className="text-gray-300 divide-y divide-white/[0.04]">{rows.map((r, i) => <tr key={i} className="hover:bg-white/[0.02]">{r.map((c, j) => <td key={j} className={j === 0 ? 'px-3 py-2 text-[#3B82F6] font-medium whitespace-nowrap' : 'px-3 py-2 text-gray-400'}>{c}</td>)}</tr>)}</tbody></table></div>);
}
