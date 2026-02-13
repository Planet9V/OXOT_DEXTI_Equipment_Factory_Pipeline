/**
 * Insurance Claims Processing Facility — Deep Dive Wiki Article.
 * Guidewire PAS, claims adjudication, RMS/AIR catastrophe modeling.
 * @module wiki/financial-services/insurance-processing/page
 */
export const metadata = {
    title: 'Insurance Processing — FINA Deep Dive',
    description: 'Insurance claims adjudication, policy administration, and GPU-accelerated catastrophe modeling.',
};
const C = '#EC4899';
export default function InsuranceProcessingPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]" style={{ background: C }} />
                    <span className="text-xs font-mono text-gray-500">FINA · FINA-IN · INSURANCE</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">Insurance Claims Processing</h1>
                <p className="text-sm text-gray-400">Claims Adjudication · Guidewire PAS · RMS/AIR Cat Modeling · ACORD XML</p>
            </div>
            <S title="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-300 leading-relaxed">Insurance processing centers handle the full lifecycle from <span className="text-[#EC4899] font-medium">policy administration</span> and <span className="text-[#EC4899] font-medium">underwriting</span> through <span className="text-[#EC4899] font-medium">claims adjudication</span> and <span className="text-[#EC4899] font-medium">catastrophe modeling</span>. The U.S. P&amp;C industry processes 35M+ claims annually with $800B+ in direct premiums written.</p>
                <h3 className="text-xs font-semibold text-gray-400 mt-4 mb-2">Stakeholders</h3>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                    <li>NAIC — National Association of Insurance Commissioners</li>
                    <li>State DOIs — State-level insurance regulation</li>
                    <li>Lloyd&apos;s of London — Specialist insurance market</li>
                    <li>Reinsurers — Swiss Re, Munich Re, Berkshire Hathaway</li>
                    <li>Cat Model Vendors — Moody&apos;s RMS, Verisk AIR, CoreLogic</li>
                    <li>PAS Vendors — Guidewire, Duck Creek, Majesco</li>
                    <li>ACORD — Standards body for insurance data exchange</li>
                </ul>
                <h3 className="text-xs font-semibold text-gray-400 mt-4 mb-2">Regulatory Framework</h3>
                <T heads={['Standard', 'Scope']} rows={[
                    ['Solvency II', 'EU capital adequacy and risk management'],
                    ['NAIC Model Laws', 'State-level insurance regulation'],
                    ['ORSA', 'Own Risk and Solvency Assessment'],
                    ['IFRS 17', 'International insurance contract accounting'],
                    ['SOX §404', 'Financial reporting controls'],
                    ['State Rate Filing', 'Premium rate justification to DOI'],
                ]} />
            </S>
            <S title="2. High-Level Design" id="design">
                <p className="text-sm text-gray-300 leading-relaxed">Three processing domains: <span className="text-[#EC4899] font-medium">Policy Administration</span> (Guidewire InsuranceSuite), <span className="text-[#EC4899] font-medium">Claims Processing</span> (adjudication, SIU fraud, FNOL), and <span className="text-[#EC4899] font-medium">Catastrophe Modeling</span> (GPU-accelerated Monte Carlo simulations). All domains share a common data lake and ACORD XML messaging backbone.</p>
                <Diagram>{
                    `[AGENTS/BROKERS] ──ACORD XML──► ┌────────────────────────────────┐
[POLICYHOLDERS] ──Portal/API──► │  POLICY ADMIN (Guidewire)      │
                                │  ┌──────────┐  ┌────────────┐ │
                                │  │ QUOTING   │  │UNDERWRITING│ │ ──► [RATING ENGINE]
                                │  │ BINDING   │  │ ISSUANCE   │ │     (ISO/AAIS tables)
                                │  └──────────┘  └────────────┘ │
                                ├────────────────────────────────┤
                                │  CLAIMS ADJUDICATION           │
                                │  FNOL → Triage → Adjust → Pay  │ ──► [SIU / FRAUD]
                                │  (35M claims/yr, <5 day cycle) │     (ML scoring)
                                ├────────────────────────────────┤
                                │  CATASTROPHE MODELING           │
                                │  RMS Risk Intelligence · AIR    │ ──► [REINSURANCE]
                                │  (10M+ simulations, GPU/HPC)   │     (Treaty/Facultative)
                                └────────────────────────────────┘`
                }</Diagram>
            </S>
            <S title="3. Detailed Technical Description" id="tech">
                <h3 className="text-xs font-semibold text-gray-400 mb-2">3.1 Policy Administration System (PAS)</h3>
                <p className="text-sm text-gray-300 leading-relaxed">Guidewire InsuranceSuite (PolicyCenter, BillingCenter, ClaimCenter) on Java/Gosu stack. Manages policy lifecycle: quote → bind → issue → endorse → renew → cancel. Rating engines (ISO Net, AAIS) with 10,000+ rating variables. 1M+ policies in-force, sub-second quote response. Integration via Guidewire Cloud API (REST) and ACORD AL3/XML.</p>
                <h3 className="text-xs font-semibold text-gray-400 mt-5 mb-2">3.2 Claims Adjudication</h3>
                <p className="text-sm text-gray-300 leading-relaxed">FNOL (First Notice of Loss) intake via web/mobile/call center. AI triage: computer vision for damage assessment (photos/video), NLP for claim narrative extraction. Rules-based auto-adjudication for &lt;$5K claims (straight-through processing, 40–60% auto-pay). Complex claims routed to adjusters with AI-suggested reserves. SIU (Special Investigations Unit) referrals via ML fraud scoring (FICO, SAS).</p>
                <h3 className="text-xs font-semibold text-gray-400 mt-5 mb-2">3.3 Catastrophe Modeling</h3>
                <p className="text-sm text-gray-300 leading-relaxed">Moody&apos;s RMS Risk Intelligence and Verisk AIR Touchstone run stochastic Monte Carlo simulations across 10M+ event scenarios. GPU-accelerated (NVIDIA A100, 80GB HBM2e) for hurricane, earthquake, wildfire, and flood perils. Output: Exceedance Probability (EP) curves, Average Annual Loss (AAL), Probable Maximum Loss (PML). Used for reinsurance treaty pricing and Solvency II SCR calculation.</p>
                <h3 className="text-xs font-semibold text-gray-400 mt-5 mb-2">3.4 Document Management</h3>
                <p className="text-sm text-gray-300 leading-relaxed">High-volume document scanners (Kodak Alaris S3060, 60 ppm) for policy applications, claim forms, and medical records. OCR/ICR via ABBYY FineReader Engine. Document repository: IBM FileNet / OpenText with WORM compliance. 10M+ documents indexed, full-text searchable.</p>
                <h3 className="text-xs font-semibold text-gray-400 mt-5 mb-2">3.5 Actuarial Computing</h3>
                <p className="text-sm text-gray-300 leading-relaxed">Reserve estimation: Mack chain-ladder, Bornhuetter-Ferguson on R/Python (Tidyverse, ChainLadder). Pricing: GLM (Generalized Linear Models) in Earnix/Willis Towers Watson Radar. Capital modeling: internal model for Solvency II, DFA (Dynamic Financial Analysis). HPC cluster (64–256 cores) for overnight batch.</p>
            </S>
            <S title="4. Process Diagrams" id="process">
                <h3 className="text-xs font-semibold text-gray-400 mb-2">4.1 Claims Lifecycle</h3>
                <Diagram>{
                    `FNOL (web/mobile/call) ──► AI TRIAGE (CV + NLP)
                                │
                    ┌───────────┼───────────┐
               SIMPLE (<$5K)    │      COMPLEX
               Auto-Adjudicate  │      Adjuster Queue
               (40-60% STP)     │      Reserve Setting
                    │           │           │
               AUTO-PAY    FRAUD CHECK  NEGOTIATE
                    │      (ML scoring)     │
               CLOSE/LOG       │       SETTLE/PAY
                           SIU REFERRAL     │
                           (if flagged)  SUBROGATION`
                }</Diagram>
                <h3 className="text-xs font-semibold text-gray-400 mt-5 mb-2">4.2 Catastrophe Model Run</h3>
                <Diagram>{
                    `EXPOSURE DATA (LOB portfolio) ──► HAZARD MODULE (event set)
                                        │
                                   VULNERABILITY (damage functions)
                                        │
                                   FINANCIAL (policy terms, deductibles)
                                        │
                                   MONTE CARLO (10M simulations, GPU)
                                        │
                                   OUTPUT: EP Curve · AAL · PML
                                        │
                                   REINSURANCE PRICING ──► TREATY PLACEMENT`
                }</Diagram>
                <h3 className="text-xs font-semibold text-gray-400 mt-5 mb-2">4.3 Policy Lifecycle</h3>
                <Diagram>{
                    `QUOTE REQUEST ──► RATING ENGINE (ISO tables, 10K+ variables)
                       │
                  UNDERWRITING RULES (auto-bind / refer)
                       │
                  BIND ──► ISSUE POLICY ──► BILLING (installment/EFT)
                       │
                  ENDORSE / RENEW / CANCEL ──► ARCHIVE`
                }</Diagram>
            </S>
            <S title="5. Bill of Materials" id="bom">
                <p className="text-xs text-gray-500 mb-2 italic">Reference: Mid-tier P&amp;C insurer, 1M+ policies</p>
                <T heads={['Equipment', 'Specification', 'Qty', 'Rating']} rows={[
                    ['PAS Platform', 'Guidewire InsuranceSuite Cloud', '1', 'SaaS/hybrid'],
                    ['Claims Engine', 'Guidewire ClaimCenter', '1', '35M claims/yr'],
                    ['Rating Engine', 'ISO Net / AAIS / Earnix', '1', '10K+ variables'],
                    ['Cat Model', 'RMS Risk Intelligence', '2', '10M simulations'],
                    ['Cat Model (alt)', 'Verisk AIR Touchstone', '2', 'GPU-accelerated'],
                    ['GPU Server', 'Dell R750xa, NVIDIA A100 80GB', '8–16', '312 TFLOPS/ea'],
                    ['HPC Cluster', 'Dell C6520, dual Xeon 8380', '32–64', 'Actuarial batch'],
                    ['App Server', 'Dell R760, Xeon, 1TB RAM', '20–40', 'Guidewire/Java'],
                    ['Database', 'Oracle RAC / PostgreSQL', '4–8', '10 TB, HA'],
                    ['Document Scanner', 'Kodak Alaris S3060', '20–40', '60 ppm'],
                    ['OCR Engine', 'ABBYY FineReader Server', '4', '99.8% accuracy'],
                    ['ECM Repository', 'IBM FileNet / OpenText', '2', '10M+ docs, WORM'],
                    ['Object Storage', 'NetApp StorageGRID', '2–4', '5 PB+'],
                    ['NAS Filer', 'NetApp AFF A400', '4–8', '100 TB, NFS/SMB'],
                    ['Fraud Engine', 'SAS / FICO Insurance Score', '2', 'ML, real-time'],
                    ['BI/Analytics', 'Tableau / Power BI', '1', '1,000+ users'],
                    ['API Gateway', 'Kong / MuleSoft', '2', 'ACORD XML/REST'],
                    ['Load Balancer', 'F5 BIG-IP', '4', 'HA pair'],
                ]} />
            </S>
            <S title="6. Purdue Model Mapping" id="purdue">
                <T heads={['Level', 'Components', 'Protocols']} rows={[
                    ['L4 Enterprise', 'ERP (SAP), BI (Tableau), Regulatory', 'REST, JDBC, SFTP'],
                    ['L3.5 DMZ', 'Agent portal, ACORD gateway, API GW', 'ACORD XML/AL3, TLS'],
                    ['L3 Operations', 'PAS (Guidewire), Claims, Cat Model', 'REST, SOAP, gRPC'],
                    ['L2 Control', 'Rating engine, rules engine, workflow', 'ISO Net, Gosu DSL'],
                    ['L1 Device', 'Document scanners, OCR servers', 'TWAIN, ISIS, REST'],
                    ['L0 Process', 'Policy DB, claims ledger, exposure data', 'SQL, Parquet, CSV'],
                ]} />
            </S>
            <S title="7. Supporting Systems" id="supporting">
                <T heads={['System', 'Description', 'Specification']} rows={[
                    ['Fraud Detection', 'ML anomaly scoring on all claims', 'SAS/FICO, <100ms'],
                    ['Document Mgmt', 'ECM with WORM retention', 'FileNet, 7-yr retain'],
                    ['Disaster Recovery', 'Active-passive geo-cluster', 'RPO <15min, RTO <4hr'],
                    ['Backup', 'Incremental + full weekly', 'Veeam/Commvault'],
                    ['Call Center', 'FNOL intake, policyholder service', 'Genesys/NICE CXone'],
                    ['Telematics', 'UBI (Usage-Based Insurance) IoT', 'OBD-II, mobile SDK'],
                ]} />
            </S>
            <S title="8. Data Exchange Standards" id="standards">
                <T heads={['Standard', 'Format', 'Use Case']} rows={[
                    ['ACORD XML', 'ISO 15022 envelope', 'Policy, claims, billing exchange'],
                    ['ACORD AL3', 'Flat file, positional', 'Legacy agency interface'],
                    ['ACORD Forms', 'PDF/XML', 'Standard applications & certificates'],
                    ['XBRL', 'XML taxonomy', 'Statutory financial reporting (NAIC)'],
                    ['HL7 / X12 837', 'EDI', 'Medical claims (workers comp, health)'],
                    ['ISO 19770', 'XML/JSON', 'Software asset management'],
                ]} />
            </S>
            <S title="9. Data Flow Architecture" id="data-flow">
                <Diagram>{
                    `┌───────────────────────────────────────────────────────────────────┐
│  TIER 4 — ENTERPRISE   ERP · BI (Tableau) · Regulatory (NAIC)   │
├───────────────────────────────────────────────────────────────────┤
│  TIER 3.5 — DMZ   Agent Portal · ACORD GW · API (Kong/Mule)     │
│  ACORD XML/AL3 · REST · OAuth 2.0 · 10K agents connected        │
├───────────────────────────────────────────────────────────────────┤
│  TIER 3 — OPS   Guidewire PAS · ClaimCenter · Cat Model (RMS)   │
│  1M policies · 35M claims/yr · 10M Monte Carlo sims             │
├───────────────────────────────────────────────────────────────────┤
│  TIER 2 — CONTROL   Rating Engine · Rules · Workflow · Fraud ML  │
│  10K+ variables · auto-adjudicate 40-60% · <100ms scoring       │
├───────────────────────────────────────────────────────────────────┤
│  TIER 1 — DEVICE   Scanners (Kodak) · OCR (ABBYY) · GPU (A100)  │
│  60 ppm scan · 99.8% OCR · 312 TFLOPS cat modeling              │
├───────────────────────────────────────────────────────────────────┤
│  TIER 0 — DATA   Policy DB · Claims Ledger · Exposure · Docs    │
│  Oracle RAC · 10M+ docs · 5 PB object store · WORM archive      │
└───────────────────────────────────────────────────────────────────┘`
                }</Diagram>
            </S>
            <S title="10. References" id="references">
                <ul className="space-y-2 text-xs text-gray-500 font-mono">
                    <li>• NAIC. (2024). <em>Insurance Regulation Overview.</em></li>
                    <li>• EIOPA. (2022). <em>Solvency II: Technical Standards.</em></li>
                    <li>• IFRS Foundation. (2023). <em>IFRS 17: Insurance Contracts.</em></li>
                    <li>• ACORD. (2024). <em>ACORD Data Standards v3.6.</em></li>
                    <li>• Guidewire. (2024). <em>InsuranceSuite Cloud Overview.</em></li>
                    <li>• Moody&apos;s RMS. (2024). <em>Risk Intelligence Platform.</em></li>
                    <li>• Verisk. (2024). <em>AIR Touchstone v10.</em></li>
                    <li>• NVIDIA. (2023). <em>A100 Tensor Core GPU Datasheet.</em></li>
                </ul>
            </S>
            <S title="See Also" id="see-also">
                <div className="flex flex-wrap gap-3">
                    {[
                        { label: 'Financial Services Hub', href: '/wiki/financial-services', color: '#10B981' },
                        { label: 'ATM/Branch Network', href: '/wiki/financial-services/atm-branch-network', color: '#F59E0B' },
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
    return (<div className="overflow-x-auto"><table className="w-full text-xs border-collapse"><thead><tr className="border-b border-white/[0.08] text-gray-500">{heads.map(h => <th key={h} className="text-left px-3 py-2 font-medium">{h}</th>)}</tr></thead><tbody className="text-gray-300 divide-y divide-white/[0.04]">{rows.map((r, i) => <tr key={i} className="hover:bg-white/[0.02]">{r.map((c, j) => <td key={j} className={j === 0 ? 'px-3 py-2 text-[#EC4899] font-medium whitespace-nowrap' : 'px-3 py-2 text-gray-400'}>{c}</td>)}</tr>)}</tbody></table></div>);
}
