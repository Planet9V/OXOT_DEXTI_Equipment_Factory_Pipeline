/**
 * ATM & Branch Network Infrastructure — Deep Dive Wiki Article.
 * Diebold/NCR ATMs, cash recyclers, vault security, ISO 8583.
 * @module wiki/financial-services/atm-branch-network/page
 */
export const metadata = {
    title: 'ATM & Branch Network — FINA Deep Dive',
    description: 'ATM deployer networks with Diebold/NCR hardware, ISO 8583 routing, and SD-WAN connectivity.',
};
const C = '#F59E0B';
export default function AtmBranchNetworkPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]" style={{ background: C }} />
                    <span className="text-xs font-mono text-gray-500">FINA · FINA-BK · ATM / BRANCH</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">ATM & Branch Network</h1>
                <p className="text-sm text-gray-400">Self-Service Banking · Cash Recyclers · ISO 8583 · SD-WAN</p>
            </div>
            <S title="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-300 leading-relaxed">ATM and branch networks form the <span className="text-[#F59E0B] font-medium">physical customer touchpoint</span> for retail banking. The U.S. operates approximately 500,000 ATMs, processing 10B+ transactions annually. Branch automation integrates <span className="text-[#F59E0B] font-medium">cash recyclers</span>, <span className="text-[#F59E0B] font-medium">interactive teller machines (ITMs)</span>, and <span className="text-[#F59E0B] font-medium">digital signage</span> into omnichannel banking.</p>
                <h3 className="text-xs font-semibold text-gray-400 mt-4 mb-2">Stakeholders</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>OCC / FDIC — Bank chartering and deposit insurance</li>
                    <li>PCI SSC — PCI DSS and PCI PIN compliance</li>
                    <li>Card Networks — Visa, Mastercard, Discover, Amex</li>
                    <li>ATM OEMs — Diebold Nixdorf, NCR Voyix, Hyosung</li>
                    <li>Cash Recycler Vendors — Glory, De La Rue</li>
                    <li>Armored Carriers — Brinks, Loomis, Garda</li>
                </ul>
                <h3 className="text-xs font-semibold text-gray-400 mt-4 mb-2">Regulatory Framework</h3>
                <T heads={['Standard', 'Scope']} rows={[
                    ['PCI PIN', 'PIN transaction security (point-to-point)'],
                    ['PCI DSS 4.0', 'Card data protection end-to-end'],
                    ['PCI PTS', 'PIN Transaction Security device standards'],
                    ['ADA / Section 508', 'Accessibility requirements'],
                    ['UL 291', 'Vault construction and burglary resistance'],
                    ['EMV (Europay)', 'Chip-based card authentication'],
                ]} />
            </S>
            <S title="2. High-Level Design" id="design">
                <p className="text-sm text-gray-300 leading-relaxed">Three-tier architecture: ATM/branch devices connect via SD-WAN or MPLS to regional ATM host/switch processors, which route to core banking via ISO 8583 over TCP/IP. Cash management operates on a separate overlay. All card data traverses P2PE (Point-to-Point Encryption) from device to HSM.</p>
                <Diagram>{
                    `[ATM/ITM] ──ISO 8583──► [ATM HOST SWITCH] ──► [CORE BANKING]
  │                       (ACI BASE24)          (Temenos/Fiserv)
  │                            │
[Cash Recycler] ─XFS─►  [Card Mgmt System]     [EFT NETWORK]
  │                       (Visa/MC/Plus)         (ISO 8583/NDC)
  │
[Branch Teller]          [Cash Mgmt]
  │                       (Brinks, CIT)
[Digital Signage]

NETWORK: SD-WAN (Cisco Viptela) · MPLS (100Mbps+) · LTE/5G backup`
                }</Diagram>
            </S>
            <S title="3. Detailed Technical Description" id="tech">
                <h3 className="text-xs font-semibold text-gray-400 mb-2">3.1 ATM Hardware</h3>
                <p className="text-sm text-gray-300 leading-relaxed">Diebold Nixdorf DN Series (DN200, CS 280) and NCR Voyix SelfServ 88. 4-cassette cash dispensers (40 notes/sec, BV 100/BV 5000 bill validators). Contactless NFC readers (EMV L1/L2 certified). P2PE encrypting PIN pads (PCI PTS 6.x). 15.6&quot; touchscreens. Receipt printers (Epson T88VII thermal). Running Windows 10 IoT Enterprise LTSC or Diebold NXOS (Linux).</p>
                <h3 className="text-xs font-semibold text-gray-400 mt-5 mb-2">3.2 Cash Recyclers</h3>
                <p className="text-sm text-gray-300 leading-relaxed">Glory ADVANTUS TCR-8 teller cash recyclers (8-denomination, 120 notes/sec, 2,500+ note capacity). Automatic counterfeit detection (IR/UV/MR). De La Rue Talaris Glory recyclers for bulk. Reduces CIT (Cash-in-Transit) delivery frequency by 50–70%. Integration via XFS/CEN (eXtensions for Financial Services) API.</p>
                <h3 className="text-xs font-semibold text-gray-400 mt-5 mb-2">3.3 ATM Host/Switch</h3>
                <p className="text-sm text-gray-300 leading-relaxed">ACI Worldwide BASE24-eps™ or Fiserv DNA switch. ISO 8583:2003 message format, NDC (NCR Direct Connect) / DDC (Diebold Direct Connect) device protocols. Throughput: 10,000+ TPS per switch. Active-active HA with &lt;3-second failover. Connects to Visa/Mastercard/Plus/STAR via EFT network gateways.</p>
                <h3 className="text-xs font-semibold text-gray-400 mt-5 mb-2">3.4 Network Infrastructure</h3>
                <p className="text-sm text-gray-300 leading-relaxed">SD-WAN (Cisco Viptela / VMware VeloCloud) for branch WAN. MPLS primary (100 Mbps symmetric) with LTE/5G cellular backup. IPsec VPN overlay for ATM fleet. Cisco ASR 920 / Meraki MX67W branch routers. DSCP QoS for voice (VLAN 100) and transaction (VLAN 200) traffic separation.</p>
                <h3 className="text-xs font-semibold text-gray-400 mt-5 mb-2">3.5 Physical Security</h3>
                <p className="text-sm text-gray-300 leading-relaxed">UL 291 Level 1 ATM safes (1/2&quot; steel plate, Group 1M lock). Branch vaults: UL 608 Class M, 6-sided reinforced concrete. Dye packs and GPS trackers in high-value cassettes. Anti-skimming bezels (NCR Skimming Protection Solution). CCTV: 4K dome cameras, 30-day retention. Alarm: dual-path cellular + IP monitoring.</p>
            </S>
            <S title="4. Process Diagrams" id="process">
                <h3 className="text-xs font-semibold text-gray-400 mb-2">4.1 ATM Cash Withdrawal</h3>
                <Diagram>{
                    `CARD INSERT / TAP ──► PIN ENTRY (P2PE encrypted)
                          │
                    ISO 8583 AUTH REQUEST ──► ATM HOST SWITCH
                                                    │
                                              EFT NETWORK (Visa/MC)
                                                    │
                                              ISSUER AUTHORIZATION
                                                    │
                                              AUTH RESPONSE (0110)
                                                    │
                                              CASH DISPENSE (40 notes/sec)
                                                    │
                                              JOURNAL LOG ──► RECONCILIATION`
                }</Diagram>
                <h3 className="text-xs font-semibold text-gray-400 mt-5 mb-2">4.2 Cash Recycler Deposit</h3>
                <Diagram>{
                    `TELLER DEPOSIT ──► RECYCLER VALIDATION (IR/UV/MR)
                         │
                    DENOMINATION SORT (8 bins)
                         │
                    COUNTERFEIT REJECT ──► MANUAL REVIEW
                         │
                    CORE POSTING (GL update)
                         │
                    CASH AVAILABLE FOR DISPENSE`
                }</Diagram>
                <h3 className="text-xs font-semibold text-gray-400 mt-5 mb-2">4.3 Network Failover</h3>
                <Diagram>{
                    `PRIMARY: MPLS (100 Mbps) ──► SD-WAN Hub ──► Data Center
              │
         [FAILURE DETECT] (BFD, <1sec)
              │
BACKUP: LTE/5G ──► IPsec VPN ──► Data Center
              │
         AUTO-FAILBACK (priority routing, <30sec)`
                }</Diagram>
            </S>
            <S title="5. Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2 italic">Reference: Regional bank, 500 ATMs, 100 branches</p>
                <T heads={['Equipment', 'Specification', 'Qty', 'Rating']} rows={[
                    ['ATM (Full Function)', 'Diebold DN200 / NCR SS 88', '400', '4 cassettes, NFC'],
                    ['ITM (Interactive)', 'Diebold CS 280 / NCR SS 34', '100', 'Video teller'],
                    ['Cash Recycler', 'Glory ADVANTUS TCR-8', '200', '8 denom, 120 n/s'],
                    ['Bill Validator', 'MEI SC Advance / JCM iVizion', '500', 'IR/UV/MR'],
                    ['PIN Pad', 'Diebold EPP8 / NCR EPPV6', '500', 'PCI PTS 6.x'],
                    ['Receipt Printer', 'Epson T88VII thermal', '500', '200mm/sec'],
                    ['Branch Router', 'Cisco ASR 920 / Meraki MX67W', '100', 'SD-WAN ready'],
                    ['ATM Router', 'Cisco IR1101 / Cradlepoint', '500', 'LTE/5G backup'],
                    ['SD-WAN Controller', 'Cisco Viptela vManage', '1', 'Central orchestration'],
                    ['ATM Host Switch', 'ACI BASE24-eps', '2', '10,000+ TPS, HA'],
                    ['HSM', 'Thales payShield 10K', '4–8', '60K PIN/sec'],
                    ['Card Mgmt System', 'Visa DPS / MC MIPS', '2', 'EFT gateway'],
                    ['ATM Safe', 'UL 291 Level 1', '500', '1/2" steel'],
                    ['Branch Vault', 'UL 608 Class M', '100', '6-sided concrete'],
                    ['CCTV System', '4K dome + NVR', '600', '30-day retention'],
                    ['Anti-Skim Bezel', 'NCR SPS / DN SAS', '500', 'Jitter, detect'],
                ]} />
            </S>
            <S title="6. Purdue Model Mapping" id="purdue">
                <T heads={['Level', 'Components', 'Protocols']} rows={[
                    ['L4 Enterprise', 'Core Banking (Temenos/Fiserv), BI', 'REST, JDBC, SOA'],
                    ['L3.5 DMZ', 'Card network gateway, API banking', 'ISO 8583, TLS, OAuth'],
                    ['L3 Operations', 'ATM host switch, cash mgmt', 'NDC/DDC, SNMP'],
                    ['L2 Control', 'Card mgmt, fleet mgmt, remote load', 'ISO 8583, XFS/CEN'],
                    ['L1 Device', 'ATM XFS services, recycler drivers', 'XFS 3.x, USB HID'],
                    ['L0 Process', 'Cash dispenser, card reader, PIN pad', 'SPI, serial, P2PE'],
                ]} />
            </S>
            <S title="7. Supporting Systems" id="supporting">
                <T heads={['System', 'Description', 'Specification']} rows={[
                    ['ATM Fleet Mgmt', 'Remote monitoring & software push', 'DN Vynamic, NCR Atleos'],
                    ['Cash Forecasting', 'ML-based replenishment optimization', 'Brinks Global Services'],
                    ['Anti-Fraud', 'Real-time transaction scoring', 'FICO Falcon, 10ms scoring'],
                    ['Branch Branch Wi-Fi', 'Customer and staff networks', 'Cisco Meraki, WPA3'],
                    ['Digital Signage', 'Queue & marketing displays', 'BrightSign XT1144'],
                    ['UPS Power', 'Branch and ATM backup power', 'APC Smart-UPS, 30 min'],
                ]} />
            </S>
            <S title="8. Communication Protocols" id="protocols">
                <T heads={['Protocol', 'Layer', 'Use Case']} rows={[
                    ['ISO 8583:2003', 'Application', 'Financial transaction messaging'],
                    ['NDC / DDC', 'Session', 'ATM device control (NCR/Diebold)'],
                    ['XFS/CEN (CWA 15748)', 'API', 'Device abstraction (dispenser, reader)'],
                    ['EMV (ISO 7816/14443)', 'Physical', 'Chip card & contactless payment'],
                    ['P2PE (PCI)', 'Security', 'Point-to-point PIN encryption'],
                    ['IPsec / TLS 1.3', 'Transport', 'WAN encryption'],
                    ['SD-WAN (OMP)', 'Network', 'Overlay routing, QoS'],
                ]} />
            </S>
            <S title="9. Data Flow Architecture" id="data-flow">
                <Diagram>{
                    `┌───────────────────────────────────────────────────────────────────┐
│  TIER 4 — ENTERPRISE   Core Banking (Temenos) · BI · Compliance  │
├───────────────────────────────────────────────────────────────────┤
│  TIER 3.5 — DMZ   Card Network GW (Visa/MC) · API Banking       │
│  ISO 8583 routing · EFT switching · 10K+ TPS                    │
├───────────────────────────────────────────────────────────────────┤
│  TIER 3 — OPS   ATM Host Switch (BASE24) · Cash Mgmt · Fleet    │
│  500+ ATMs monitored · NDC/DDC · remote diagnostics              │
├───────────────────────────────────────────────────────────────────┤
│  TIER 2 — CONTROL   Card Mgmt · Software Distribution · Load    │
│  XFS command dispatch · firmware push · key injection            │
├───────────────────────────────────────────────────────────────────┤
│  TIER 1 — DEVICE   ATM XFS Stack · Recycler · Printer · NFC     │
│  Windows IoT / Linux · 4-cassette · 40 n/s dispense             │
├───────────────────────────────────────────────────────────────────┤
│  TIER 0 — CUSTOMER   Card Insert/Tap · PIN Entry · Cash Out     │
│  EMV chip + contactless · P2PE encryption · receipt              │
└───────────────────────────────────────────────────────────────────┘`
                }</Diagram>
            </S>
            <S title="10. References" id="references">
                <ul className="space-y-2 text-xs text-gray-500 font-mono">
                    <li>• PCI SSC. (2024). <em>PCI PIN Security Requirements v3.1.</em></li>
                    <li>• PCI SSC. (2024). <em>PCI DSS v4.0.</em></li>
                    <li>• CEN. (2019). <em>CWA 15748: XFS Interface Specification.</em></li>
                    <li>• ISO. (2003). <em>ISO 8583: Financial Transaction Messaging.</em></li>
                    <li>• EMVCo. (2024). <em>EMV Contactless Specifications v3.1.</em></li>
                    <li>• UL. (2020). <em>UL 291: Automated Teller Systems.</em></li>
                    <li>• ACI Worldwide. (2024). <em>BASE24-eps Product Overview.</em></li>
                    <li>• Diebold Nixdorf. (2024). <em>DN Series ATM Platform.</em></li>
                </ul>
            </S>
            <S title="See Also" id="see-also">
                <div className="flex flex-wrap gap-3">
                    {[
                        { label: 'Financial Services Hub', href: '/wiki/financial-services', color: '#10B981' },
                        { label: 'Data Center', href: '/wiki/financial-services/data-center', color: '#10B981' },
                        { label: 'Insurance Processing', href: '/wiki/financial-services/insurance-processing', color: '#EC4899' },
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
    return (<div className="overflow-x-auto"><table className="w-full text-xs border-collapse"><thead><tr className="border-b border-white/[0.08] text-gray-500">{heads.map(h => <th key={h} className="text-left px-3 py-2 font-medium">{h}</th>)}</tr></thead><tbody className="text-gray-300 divide-y divide-white/[0.04]">{rows.map((r, i) => <tr key={i} className="hover:bg-white/[0.02]">{r.map((c, j) => <td key={j} className={j === 0 ? 'px-3 py-2 text-[#F59E0B] font-medium whitespace-nowrap' : 'px-3 py-2 text-gray-400'}>{c}</td>)}</tr>)}</tbody></table></div>);
}
