/**
 * Security Operations Center (SOC) Reference Architecture — Deep Dive.
 * @module wiki/information-technology/soc/page
 */
export const metadata = {
    title: 'Security Operations Center Reference Architecture — Wiki',
    description: 'TOGAF reference architecture for enterprise SOC: SIEM/SOAR/XDR, MITRE ATT&CK, Tier 1-3 analysts.',
};

const C = '#EF4444';

const REGS = [
    ['NIST CSF 2.0', 'Cybersecurity Framework — Govern, Identify, Protect, Detect, Respond, Recover'],
    ['ISO 27001', 'Information security management system (ISMS) certification'],
    ['SOC 2 Type II', 'Trust services criteria — security, availability, confidentiality'],
    ['PCI DSS 4.0', 'Payment card industry data security standard'],
    ['GDPR', 'EU General Data Protection Regulation — breach notification 72 hr'],
    ['MITRE ATT&CK', 'Adversarial tactics, techniques, and common knowledge framework'],
    ['CMMC L3', 'Cybersecurity Maturity Model Certification for DoD supply chain'],
];

const BOM = [
    ['Analyst Workstation', 'Xeon 128 GB, 4× RTX GPU', '50', '4× 32" 4K monitors, KVM'],
    ['SIEM Cluster Node', 'Dell/HP, 2 TB RAM/node', '20', '100 TB ingest capacity'],
    ['Core Switch', '100 Gbps, Arista/Cisco', '4', 'Redundant ToR, BGP'],
    ['All-Flash Array', 'Pure/EMC, 1 PB usable', '2', 'Hot tier + S3 cold archive'],
    ['Video Wall Panel', '55" 4K LED, 24/7 rated', '32 (4×8)', 'Barco/Panasonic controller'],
    ['UPS Module', '200 kVA, N+1', '2', '15–30 min bridge power'],
    ['Diesel Generator', '1 000 kW, 96 hr fuel', '1', 'Emergency backup'],
    ['Precision CRAC', '18 kW each, hot aisle', '6', 'Containment cooling'],
    ['Biometric Reader', 'Multi-factor + mantrap', '4', 'Card/PIN/retina/voice'],
    ['CCTV Camera', '4K IP, AI analytics', '100', 'Interior + perimeter'],
    ['Server Rack', '42U instrumented, PDU', '20', 'Environmental sensors'],
    ['SOAR Appliance', 'XSOAR/Swimlane HA pair', '4', 'Automated playbooks'],
    ['NDR Sensor', 'Inline tap/probe, Vectra', '12', '40 Gbps per port'],
    ['Sandbox Farm', 'VM isolation, Cuckoo/FE', '8 nodes', 'GPU-accelerated'],
    ['SCIF Shielding', 'EMI-rated panels/doors', '500 m²', 'Faraday cage'],
    ['NAS Backup', '500 TB RAID-6', '2', 'Config/log archive'],
    ['Fiber/Cat8 Cabling', 'OM5 fiber + Cat8 Cu', '10 km', 'Structured + DC power'],
    ['War Room Table', 'Modular, 20-seat', '4', 'Conference + IR bridge'],
    ['Smart Card Reader', 'PIV/CAC, role-based', '60', 'Per workstation + door'],
    ['Ergonomic Console', 'Adjustable desk + chair', '50', 'KVM switch, 24/7 ops'],
];

const PURDUE = [
    ['L4 Enterprise', 'GRC/compliance portal, executive dashboards', 'REST API, SAML/OAuth2'],
    ['L3.5 DMZ', 'STIX/TAXII broker, data diode, API gateway', 'STIX 2.1, TLS 1.3, WAF'],
    ['L3 Operations', 'SIEM (Splunk/Elastic), SOAR, TIP, case mgmt', 'syslog/CEF, Kafka, REST'],
    ['L2 Supervisory', 'XDR/NDR consoles, UEBA dashboards, sandboxing', 'EDR API, Netflow/IPFIX'],
    ['L1 Control', 'EDR agents, deception/honeypots, log collectors', 'Agent endpoints, MQTT'],
    ['L0 Process', 'Endpoints, network segments, cloud workloads', 'Syslog, WinRM, cloud API'],
];

const SUPPORT = [
    ['SCIF Enclosure', 'EMI/RFI shielded room for classified operations', 'ICD 705, TEMPEST'],
    ['Physical Security', 'Mantrap, 5-factor auth, 24/7 guard, escort', 'ISO 27001 Annex A'],
    ['Environmental', 'Precision cooling 72–78°F, 50–60% RH', 'ASHRAE TC 9.9'],
    ['Dual ISP', 'Diverse carrier feeds, BGP failover', '10+ Gbps aggregate'],
    ['Video Wall Ctrl', '4K processor, daisy-chain, auto-failover', 'Barco/Christie, 24/7'],
    ['IR War Room', 'Multi-screen, WebRTC bridge, secure comms', 'Classified-ready'],
];

const PROTOCOLS = [
    ['syslog/CEF', 'Log normalization to SIEM', 'RFC 5424, UDP/TCP 514'],
    ['STIX/TAXII 2.1', 'Threat intel exchange (structured IOCs)', 'JSON, HTTPS channels'],
    ['REST API', 'SOAR/SIEM/EDR integrations', 'OAuth2, Swagger/OpenAPI'],
    ['MQTT / Kafka', 'Real-time telemetry (OT/IIoT, pub/sub)', '1M+ msg/sec throughput'],
    ['Netflow/IPFIX', 'Network metadata for NDR analytics', 'UDP 2055/4739, sFlow'],
];

const REFS = [
    'NIST. (2024). Cybersecurity Framework 2.0. NIST.',
    'MITRE. (2023). ATT&CK Framework v14. The MITRE Corporation.',
    'ISO. (2022). ISO/IEC 27001:2022 Information Security Management. ISO.',
    'AICPA. (2022). SOC 2 Type II: Trust Services Criteria. AICPA.',
    'PCI SSC. (2024). PCI DSS v4.0.1: Data Security Standard. PCI SSC.',
    'DoD. (2022). CMMC Model v2.0: Cybersecurity Maturity Model. DoD.',
    'OASIS. (2021). STIX/TAXII 2.1 Specification. OASIS.',
    'Palo Alto. (2024). XSOAR SOAR Platform Architecture Guide. Palo Alto Networks.',
];

export default function SocPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <header className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]" style={{ background: C }} />
                    <span className="text-xs font-mono text-gray-500">ITEC · SW-SOC · Software & IT Services</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">Security Operations Center (SOC)</h1>
                <p className="text-sm text-gray-500 max-w-3xl leading-relaxed">
                    An enterprise SOC operates 24/7 with 30–50 Tier 1/2/3 analysts, ingesting 10–100+ TB/day
                    into SIEM, correlating via MITRE ATT&CK, automating response through SOAR playbooks,
                    and monitoring endpoints via EDR/XDR — all from a hardened facility with EMI-shielded
                    SCIF, video wall, and redundant infrastructure.
                </p>
            </header>

            <S t="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-400 leading-relaxed">
                    Stakeholders: CISO (governance), SOC analysts Tier 1 (triage), Tier 2 (investigation),
                    Tier 3 (threat hunting/forensics), threat intel team, incident response team, compliance
                    officers, and legal/privacy (breach notification). Business capabilities: Detect (threat
                    monitoring), Respond (IR/SOAR), Recover (continuity management).
                </p>
                <T h={['Standard', 'Scope']} rows={REGS} />
            </S>

            <S t="2. High-Level Design" id="design">
                <Pre>{`
┌─────────────────────────────────────────────────────────────────┐
│                    SOC FACILITY LAYOUT                           │
│  ┌────────────┐  ┌────────────────────────────┐  ┌──────────┐  │
│  │   SCIF     │  │     MAIN SOC FLOOR          │  │   WAR    │  │
│  │ Classified │  │  ┌──────────────────────┐   │  │  ROOM    │  │
│  │ Operations │  │  │    VIDEO WALL 4×8     │   │  │  IR Ops  │  │
│  │ Faraday    │  │  │   4K LED 32 Panels    │   │  │  Bridge  │  │
│  │ Cage       │  │  └──────────────────────┘   │  └──────────┘  │
│  └────────────┘  │                              │               │
│                  │  T1 ▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪  │               │
│                  │  T2 ▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪      │               │
│                  │  T3 ▪▪▪▪▪▪▪▪               │               │
│                  │  (50 analyst workstations)    │               │
│                  └────────────────────────────┘               │
├─────────────────────────────────────────────────────────────────┤
│  SERVER ROOM       SIEM Cluster │ SOAR │ NDR │ Sandbox │ NAS   │
│  UPS 200 kVA N+1 │ Gen 1000 kW │ CRAC ×6 │ Dual ISP BGP     │
└─────────────────────────────────────────────────────────────────┘`}</Pre>
            </S>

            <S t="3. Detailed Technical Description" id="tech">
                <h3 className="text-sm font-semibold text-white">3.1 SIEM / Log Management</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    Platforms: Splunk Enterprise, Elastic Security, Azure Sentinel. Ingest 10–100+ TB/day
                    via syslog/CEF. Hot/warm/cold tiered storage (SSD → HDD → S3). 90-day online retention,
                    1–7 year archival. ML-powered correlation rules, anomaly detection, SOC metric dashboards.
                </p>
                <h3 className="text-sm font-semibold text-white mt-4">3.2 Detection Stack</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    EDR/XDR (CrowdStrike Falcon, SentinelOne, MSDE) for host telemetry and behavioral
                    analytics. NDR (Darktrace, Vectra AI) for encrypted traffic/entropy detection. UEBA
                    for insider threat patterns. Deception/honeypots (Canarytokens) for early warning.
                    All integrate into SIEM via APIs and STIX/TAXII feeds.
                </p>
                <h3 className="text-sm font-semibold text-white mt-4">3.3 Response & Automation</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    SOAR platforms (Palo Alto XSOAR, Swimlane) execute automated playbooks: isolate endpoint,
                    enrich IOCs via TIP, create ticket, escalate. MTTR targets: &lt;15 min Tier 1, &lt;1 hr
                    Tier 2, &lt;4 hr Tier 3. Bi-directional SIEM/EDR integration with full case timeline.
                </p>
                <h3 className="text-sm font-semibold text-white mt-4">3.4 Threat Intelligence</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    STIX/TAXII 2.1 for structured IOC sharing. MISP for open-source correlation. Commercial
                    feeds (Recorded Future, Mandiant). Dark web monitoring (Flashpoint, Intel 471). TIP
                    aggregates indicators into SIEM correlation rules (auto-enrichment pipeline).
                </p>
                <h3 className="text-sm font-semibold text-white mt-4">3.5 Physical Facility</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    Video wall: 4×8 (32 × 55" 4K panels), 24/7 rated. Precision cooling: 6 × CRAC, 72–78 °F,
                    50–60 % RH. Power: 200 kVA UPS (N+1, 15–30 min bridge) + 1 000 kW diesel generator (96 hr).
                    Dual ISP (diverse carriers, BGP failover, 10+ Gbps). SCIF with Faraday cage, EMI/RFI shielding.
                </p>
            </S>

            <S t="4. Process Diagrams" id="process">
                <Pre>{`
  DETECTION PIPELINE:
  Endpoint ──▶ EDR Agent ──▶ SIEM ──▶ Correlation ──▶ Alert ──▶ SOAR
  Network  ──▶ NDR Sensor ──▶ SIEM    ML Anomaly      Triage    Playbook
  Cloud    ──▶ Cloud API  ──▶ SIEM    ATT&CK Map      T1→T2    Auto-IR
  TIP Feed ──▶ STIX/TAXII ──▶ SIEM                    T2→T3    Escalate`}</Pre>
                <Pre>{`
  INCIDENT RESPONSE FLOW:
  Alert ──▶ Triage ──▶ Investigate ──▶ Contain ──▶ Eradicate ──▶ Recover
  T1 <15m   Enrich     T2 Hunt        Isolate     Clean         Restore
            IOCs       Forensics      Network     Reimage       Monitor
            Ticket     Timeline       Firewall    Patch         PIR/RCA`}</Pre>
            </S>

            <S t="5. Bill of Materials" id="bom">
                <p className="text-[11px] text-gray-600 mb-2">Enterprise SOC, 30–50 analysts, 10 000+ endpoints, $5–10M budget.</p>
                <T h={['Equipment', 'Spec', 'Qty', 'Notes']} rows={BOM} />
            </S>

            <S t="6. Purdue Model Mapping" id="purdue">
                <T h={['Level', 'Components', 'Protocols']} rows={PURDUE} />
                <p className="text-[11px] text-gray-600 mt-2">OT visibility via data diodes at L0–L2, avoiding Purdue violations. IEC 62443 zones enforced.</p>
            </S>

            <S t="7. Supporting Systems" id="support">
                <T h={['System', 'Description', 'Standard']} rows={SUPPORT} />
            </S>

            <S t="8. Communication Protocols" id="protocols">
                <T h={['Protocol', 'Purpose', 'Details']} rows={PROTOCOLS} />
                <p className="text-[11px] text-gray-600 mt-2">All protocols secured via TLS 1.3, rate-limited, with SNMPv3 for OT integration.</p>
            </S>

            <S t="9. Data Flow Architecture" id="dataflow">
                <Pre>{`
┌────────────────────────────────────────────────────────────┐
│ TIER 5  GOVERNANCE      GRC Portal, Board Reports, NIST   │
│                          Report generation · quarterly     │
├────────────────────────────────────────────────────────────┤
│ TIER 4  ANALYTICS       ML Correlation, ATT&CK Mapping    │
│                          SIEM analytics · 1 min cycle      │
├────────────────────────────────────────────────────────────┤
│ TIER 3  OPERATIONS      SOAR Playbooks, Case Mgmt, TIP    │
│                          REST API, Kafka · real-time       │
├────────────────────────────────────────────────────────────┤
│ TIER 2  DETECTION       EDR/XDR, NDR, UEBA, Honeypots     │
│                          Agent telemetry · 10 s poll       │
├────────────────────────────────────────────────────────────┤
│ TIER 1  COLLECTION      Log collectors, syslog, sFlow     │
│                          CEF/syslog · 1 s ingest           │
├────────────────────────────────────────────────────────────┤
│ TIER 0  SOURCES         Endpoints, firewalls, cloud, OT   │
│                          Raw events · continuous            │
└────────────────────────────────────────────────────────────┘`}</Pre>
            </S>

            <S t="10. References" id="refs">
                <ol className="list-decimal list-inside space-y-1 text-xs text-gray-400">
                    {REFS.map((r) => <li key={r}>{r}</li>)}
                </ol>
            </S>

            <section className="space-y-3">
                <h2 className="text-sm font-semibold text-gray-400">See Also</h2>
                <div className="flex flex-wrap gap-2">
                    {[
                        { label: 'IT Sector Hub', href: '/wiki/information-technology', color: '#8B5CF6' },
                        { label: 'NOC', href: '/wiki/information-technology/noc', color: '#3B82F6' },
                        { label: 'CISA ITEC', href: '/wiki/sectors/ITEC', color: '#8B5CF6' },
                    ].map((l) => (
                        <a key={l.href} href={l.href} className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-white/[0.04]" style={{ borderColor: `${l.color}30`, color: l.color }}>{l.label}</a>
                    ))}
                </div>
            </section>
        </div>
    );
}

function S({ t, id, children }: { t: string; id: string; children: React.ReactNode }) {
    return (<section id={id} className="space-y-4 scroll-mt-24"><h2 className="text-xl font-heading font-semibold text-white">{t}</h2>{children}</section>);
}
function Pre({ children }: { children: string }) {
    return (<div className="rounded-lg border border-white/[0.06] p-5 font-mono text-xs text-gray-300 overflow-x-auto" style={{ background: 'rgba(255,255,255,0.02)' }}><pre className="whitespace-pre leading-relaxed">{children}</pre></div>);
}
function T({ h, rows }: { h: string[]; rows: string[][] }) {
    return (
        <div className="overflow-x-auto rounded-lg border border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <table className="w-full text-xs border-collapse">
                <thead><tr className="border-b border-white/[0.08] text-gray-500">{h.map((c) => <th key={c} className="text-left px-3 py-2 font-medium">{c}</th>)}</tr></thead>
                <tbody className="text-gray-400">{rows.map((r) => (
                    <tr key={r[0]} className="border-b border-white/[0.04]">
                        <td className="px-3 py-2 text-[#EF4444] font-medium whitespace-nowrap">{r[0]}</td>
                        {r.slice(1).map((c, i) => <td key={i} className="px-3 py-2">{c}</td>)}
                    </tr>
                ))}</tbody>
            </table>
        </div>
    );
}
