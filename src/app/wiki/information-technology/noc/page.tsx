/**
 * Network Operations Center (NOC) Reference Architecture — Deep Dive.
 * @module wiki/information-technology/noc/page
 */
export const metadata = {
    title: 'Network Operations Center Reference Architecture — Wiki',
    description: 'TOGAF reference architecture for ISP/carrier NOC: NMS/SNMP, fiber optics, Tier 1-3 ops.',
};

const C = '#3B82F6';

const REGS = [
    ['ITU-T M.3000', 'TMN — Telecommunications Management Network framework'],
    ['eTOM (TM Forum)', 'Enhanced Telecom Operations Map: process framework'],
    ['ITIL v4', 'IT Infrastructure Library: service management framework'],
    ['IEEE 802.1Q', 'VLAN tagging and network segmentation standard'],
    ['RFC 3413', 'SNMPv3 Applications: manager-agent architecture'],
    ['MEF CE 2.0', 'Carrier Ethernet 2.0 service definitions'],
    ['ISO 27001', 'ISMS for network security management'],
];

const BOM = [
    ['Analyst Workstation', 'Xeon 64 GB, 2× RTX 4070', '30', '4× 27" monitors, KVM'],
    ['Video Wall Panel', '55" LED 4K, 24/7 rated', '18 (3×6)', 'Barco/Christie controller'],
    ['NMS Server Cluster', '2 TB RAM, 100 TB NVMe', '12', 'Fault/perf/config mgmt'],
    ['Core Router', 'Cisco NCS 5500, 100G', '4', 'Backbone monitoring feed'],
    ['Core Switch', 'Arista 7050X4, 100G', '4', 'NOC LAN, redundant'],
    ['DWDM Analyzer', 'OTDR + spectral test', '2', 'Fiber route diagnostics'],
    ['OSS/BSS Platform', 'OpenNMS/NetBox/LibreNMS', '4 nodes', 'Service assurance'],
    ['Precision CRAC', '15 kW in-row', '4', 'Server room cooling'],
    ['UPS Module', '100 kVA N+1', '2', '15 min battery bridge'],
    ['Diesel Generator', '750 kW, 48 hr fuel', '1', 'Emergency backup'],
    ['PSTN/VoIP Gateway', 'SIP trunk, 96 channels', '2', 'Escalation calls'],
    ['Ticketing Server', 'ServiceNow/Remedy HA pair', '2', 'Incident management'],
    ['CCTV Camera', '4K IP, interior + lobby', '40', 'Physical security'],
    ['Biometric Reader', 'Card + fingerprint', '4', 'Access control'],
    ['Rack Frame', '42U, instrumented', '12', 'Server room'],
    ['sFlow/NetFlow Probe', 'Traffic analysis per POP', '20', 'Bandwidth analytics'],
    ['PBX/UC System', 'Cisco CUCM or Teams Direct', '1 system', '24/7 comms'],
    ['GPS Receiver', 'Timing source, 1PPS/10MHz', '2', 'Clock sync'],
    ['Console Server', '48-port serial OOB access', '2', 'Out-of-band mgmt'],
    ['War Room Equipment', 'Conference + bridge, 12 seat', '2', 'Major incident mgmt'],
];

const PURDUE = [
    ['L4 Enterprise', 'Customer portal, SLA dashboard, billing/CRM', 'REST API, SAML'],
    ['L3.5 DMZ', 'OSS/BSS API gateway, ticketing integration', 'TLS 1.3, VPN'],
    ['L3 Operations', 'NMS (fault/perf/config), ITSM, change mgmt', 'SNMP v3, gNMI, syslog'],
    ['L2 Supervisory', 'Traffic engineering, DWDM OTDR, NetFlow', 'NETCONF/YANG, RSVP-TE'],
    ['L1 Control', 'Router/switch CLI, DWDM OAM, NTP/PTP', 'SSH, SNMP, IEEE 1588'],
    ['L0 Process', 'Fiber routes, microwave links, MPLS/segment-routing', 'Physical layer, photonics'],
];

const PROTOCOLS = [
    ['SNMP v3', 'Network device polling (fault + perf)', 'UDP 161/162, encrypted community'],
    ['gNMI/gNOI', 'Model-driven streaming telemetry', 'gRPC, OpenConfig YANG models'],
    ['NETCONF', 'Configuration management (push/pull)', 'SSH subsystem, XML/YANG'],
    ['sFlow/NetFlow', 'Traffic flow analytics, bandwidth', 'UDP sampling, IPFIX export'],
    ['BGP/MPLS', 'Routing and traffic engineering', 'BGP-LS, RSVP-TE, SR-MPLS'],
    ['IEEE 1588 PTP', 'Precision time protocol for timing', 'Sub-µs sync, grandmaster GPS'],
    ['syslog (RFC 5424)', 'Centralized log aggregation', 'UDP/TCP 514, structured data'],
];

const REFS = [
    'TM Forum. (2023). eTOM Business Process Framework (GB921). TM Forum.',
    'ITIL. (2019). ITIL 4 Foundation: Service Management. Axelos.',
    'ITU-T. (2000). M.3000: Overview of TMN Recommendations. ITU-T.',
    'IETF. (2002). RFC 3413: SNMPv3 Applications. IETF.',
    'MEF. (2019). MEF CE 2.0: Carrier Ethernet Services. MEF.',
    'OpenConfig. (2023). gNMI Specification v0.8.0. OpenConfig.',
    'IEEE. (2019). IEEE 1588-2019: PTP for Networked Measurement and Control. IEEE.',
    'Cisco. (2024). Network Operations Center Design Guide. Cisco Press.',
];

export default function NocPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <header className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]" style={{ background: C }} />
                    <span className="text-xs font-mono text-gray-500">ITEC · SW-NOC · Software & IT Services</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">Network Operations Center (NOC)</h1>
                <p className="text-sm text-gray-500 max-w-3xl leading-relaxed">
                    An ISP/carrier NOC provides 24/7 fault, configuration, performance, and security management
                    for backbone/metro networks spanning 50 000+ managed devices, staffed by 20–40 Tier 1/2/3
                    engineers with NMS/SNMP/gNMI/NetFlow tooling, video wall visualization, and ITIL/eTOM-aligned
                    incident management processes.
                </p>
            </header>

            <S t="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-400 leading-relaxed">
                    Stakeholders: ISP/carrier executives (SLA governance), MSPs (multi-tenant operations),
                    network engineers (Tier 1 triage, Tier 2 diagnostics, Tier 3 architecture/RCA), vendor
                    support teams (Cisco TAC, Juniper JTAC), and customer-facing teams. Business capabilities:
                    FCAPS (Fault, Configuration, Accounting, Performance, Security) per ITU-T M.3000.
                </p>
                <T h={['Standard', 'Scope']} rows={REGS} />
            </S>

            <S t="2. High-Level Design" id="design">
                <Pre>{`
┌─────────────────────────────────────────────────────────────────┐
│                     NOC FACILITY LAYOUT                         │
│  ┌────────────────────────────────────┐  ┌──────────────────┐  │
│  │         MAIN OPERATIONS FLOOR       │  │    WAR ROOM      │  │
│  │  ┌─────────────────────────────┐   │  │   Major Incident │  │
│  │  │      VIDEO WALL 3×6          │   │  │   12-seat conf   │  │
│  │  │    Network topology map      │   │  │   Bridge comms   │  │
│  │  │    Alarm dashboard           │   │  └──────────────────┘  │
│  │  │    Traffic weathermap        │   │                        │
│  │  └─────────────────────────────┘   │  ┌──────────────────┐  │
│  │                                     │  │  T3 Engineering  │  │
│  │  T1 ▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪  (15 seats) │  │  RCA / Lab       │  │
│  │  T2 ▪▪▪▪▪▪▪▪▪▪  (10 seats)       │  │  OTDR / Config   │  │
│  │  T3 ▪▪▪▪▪  (5 seats)              │  └──────────────────┘  │
│  └────────────────────────────────────┘                        │
├─────────────────────────────────────────────────────────────────┤
│  SERVER ROOM   NMS Cluster │ Ticketing │ sFlow │ NetFlow │ OOB │
│  UPS 100 kVA N+1 │ Gen 750 kW │ CRAC ×4 │ Console Server     │
└─────────────────────────────────────────────────────────────────┘`}</Pre>
            </S>

            <S t="3. Detailed Technical Description" id="tech">
                <h3 className="text-sm font-semibold text-white">3.1 NMS Platform</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    Fault management: SNMP v2c/v3 trap receiver, alarm correlation, root cause analysis (RCA).
                    Performance: gNMI streaming telemetry (OpenConfig YANG models), 10–60 s polling intervals.
                    Configuration: NETCONF/YANG push, config backup/diff, compliance auditing. Platforms:
                    SolarWinds Orion, OpenNMS, Nagios/Zabbix, LibreNMS, Nokia NSP.
                </p>
                <h3 className="text-sm font-semibold text-white mt-4">3.2 Traffic Analysis</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    sFlow/NetFlow/IPFIX collectors for per-flow analytics. Traffic engineering via BGP-LS,
                    RSVP-TE, or segment routing (SR-MPLS/SRv6). Weathermap visualization (MRTG/Weathermap,
                    Grafana). DDoS detection via flow anomaly + Arbor/Kentik integration. Capacity planning
                    from 95th-percentile utilization trending.
                </p>
                <h3 className="text-sm font-semibold text-white mt-4">3.3 ITSM / Incident Management</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    ITIL v4 aligned: incident → problem → change management. Ticketing (ServiceNow, BMC Remedy)
                    with bi-directional NMS integration. SLA tracking per customer circuit. Escalation matrix:
                    Tier 1 (&lt;15 min), Tier 2 (&lt;1 hr), Tier 3 (&lt;4 hr), vendor TAC (&lt;8 hr). On-call rotation,
                    PagerDuty/OpsGenie alerting.
                </p>
                <h3 className="text-sm font-semibold text-white mt-4">3.4 Out-of-Band Management</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    Dedicated OOB network: 48-port console servers at each POP, cellular 4G/5G failover,
                    satellite backup for remote/submarine sites. Separate management VRF from production.
                    SSH jump hosts with session recording (Teleport/CyberArk).
                </p>
                <h3 className="text-sm font-semibold text-white mt-4">3.5 Timing & Synchronization</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    GPS-disciplined grandmaster clocks (1PPS/10 MHz). IEEE 1588 PTP for sub-µs synchronization
                    across transport equipment. NTP stratum 1 servers for router/switch timing. Critical for
                    SONET/SDH, 5G fronthaul, and log correlation accuracy.
                </p>
            </S>

            <S t="4. Process Diagrams" id="process">
                <Pre>{`
  FCAPS MODEL:
  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐
  │   FAULT   │ │  CONFIG   │ │ ACCOUNTING│ │   PERF    │ │ SECURITY  │
  │ SNMP Trap │ │ NETCONF   │ │ RADIUS    │ │ gNMI/prom │ │ ACL/FW    │
  │ Alarm Mgr │ │ Backup    │ │ IP Acct   │ │ sFlow     │ │ TACACS+   │
  │ RCA       │ │ Rollback  │ │ Billing   │ │ Trending  │ │ IDS/IPS   │
  └─────┬─────┘ └─────┬─────┘ └─────┬─────┘ └─────┬─────┘ └─────┬─────┘
        └──────────────┴──────────────┴──────────────┴──────────────┘
                                    │
                              NMS Platform
                         ┌──────────────────┐
                         │  OpenNMS/Orion   │
                         │  50K+ devices    │
                         │  gNMI + SNMP     │
                         └──────────────────┘`}</Pre>
                <Pre>{`
  INCIDENT LIFECYCLE (ITIL v4):
  Detection ──▶ Triage ──▶ Diagnose ──▶ Resolve ──▶ Close ──▶ PIR
  NMS Alert     T1 <15m   T2 Diag      Fix/workaround         RCA
  SNMP Trap     Ticket    Escalate     Config push            Report
  Customer      Priority  T3 RCA       Vendor TAC             SLA`}</Pre>
            </S>

            <S t="5. Bill of Materials" id="bom">
                <p className="text-[11px] text-gray-600 mb-2">ISP/carrier NOC managing 50K+ network elements, 24/7 staffed.</p>
                <T h={['Equipment', 'Spec', 'Qty', 'Purpose']} rows={BOM} />
            </S>

            <S t="6. Purdue Model Mapping" id="purdue">
                <T h={['Level', 'Components', 'Protocols']} rows={PURDUE} />
                <p className="text-[11px] text-gray-600 mt-2">OOB management network as separate L1 control plane; production traffic never traverses NOC LAN.</p>
            </S>

            <S t="7. Communication Protocols" id="protocols">
                <T h={['Protocol', 'Purpose', 'Details']} rows={PROTOCOLS} />
            </S>

            <S t="8–9. Supporting Systems & Data Flow" id="dataflow">
                <Pre>{`
┌─────────────────────────────────────────────────────────────┐
│ TIER 5  ENTERPRISE     Customer Portal, SLA Reports, CRM   │
│                         REST API · on-demand                 │
├─────────────────────────────────────────────────────────────┤
│ TIER 4  SERVICE MGMT   ITSM (ServiceNow), Change/Problem   │
│                         REST, bi-directional NMS · events    │
├─────────────────────────────────────────────────────────────┤
│ TIER 3  NMS PLATFORM   Fault/Perf/Config, Alarm Correlat.  │
│                         SNMP v3, gNMI · 10–60 s poll         │
├─────────────────────────────────────────────────────────────┤
│ TIER 2  TRAFFIC ENG    sFlow/NetFlow, BGP-LS, SR-MPLS      │
│                         IPFIX, Weathermap · 5 s sample       │
├─────────────────────────────────────────────────────────────┤
│ TIER 1  DEVICE OOB     Console servers, SSH jump, cellular  │
│                         Serial/SSH · on-demand               │
├─────────────────────────────────────────────────────────────┤
│ TIER 0  NETWORK INFRA  Routers, switches, DWDM, fiber      │
│                         Physical layer, photonics            │
└─────────────────────────────────────────────────────────────┘`}</Pre>
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
                        { label: 'SOC', href: '/wiki/information-technology/soc', color: '#EF4444' },
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
                        <td className="px-3 py-2 text-[#3B82F6] font-medium whitespace-nowrap">{r[0]}</td>
                        {r.slice(1).map((c, i) => <td key={i} className="px-3 py-2">{c}</td>)}
                    </tr>
                ))}</tbody>
            </table>
        </div>
    );
}
