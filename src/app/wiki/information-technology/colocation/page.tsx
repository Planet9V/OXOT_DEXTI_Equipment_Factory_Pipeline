/**
 * Enterprise Colocation Facility Reference Architecture — Deep Dive.
 * @module wiki/information-technology/colocation/page
 */
export const metadata = {
    title: 'Colocation Facility Reference Architecture — Wiki',
    description: 'TOGAF reference architecture for Tier III multi-tenant colocation data center.',
};

const C = '#F97316';

const REGS = [
    ['Uptime Tier III/IV', 'Concurrent maintainability (III) / fault tolerance (IV)'],
    ['TIA-942-B', 'Telecommunications infrastructure standard for data centers'],
    ['SOC 2 Type II', 'Trust services criteria — security, availability, confidentiality'],
    ['ISO 27001', 'Information security management system (ISMS)'],
    ['PCI DSS 4.0', 'Payment card industry data security standard'],
    ['HIPAA', 'Health data protection for healthcare tenants'],
    ['SSAE 18', 'SOC reporting standard (successor to SSAE 16)'],
];

const BOM = [
    ['MV Switchgear', '5 MVA, N+1 redundant', '2', 'Utility feed switching'],
    ['ATS (Transfer Switch)', '1 600 A automatic', '4', 'Generator transfer'],
    ['Static UPS', '750 kVA, N+1', '8', 'Power conditioning'],
    ['Diesel Generator', '1.5 MW, Tier III rated', '4', 'Backup power, 72 hr fuel'],
    ['Fuel Tank', '50K gal, double-wall', '4', '72 hr autonomy'],
    ['STS (Static Transfer)', '1 000 A', '8', 'UPS bypass switching'],
    ['RPP (Remote Power Panel)', '400 A', '16', 'Row-level power dist.'],
    ['Metered Rack PDU', '30 kW, C13/C19', '400', 'Per-rack tenant billing'],
    ['Centrifugal Chiller', '500 ton, N+1', '6', 'Chilled water plant'],
    ['CRAH Unit', '30 ton in-row', '40', 'Precision air handling'],
    ['MMR Cabinet', '42U carrier-neutral', '20', 'Cross-connect hub'],
    ['Fiber Patch Panel', '144-port LC/MTP', '100', 'Structured cabling'],
    ['Cable Tray', 'Ladder rack, 5 km total', '5 km', 'Cabling pathways'],
    ['Security Mantrap', 'Biometric 5-factor', '4', 'Access control'],
    ['VESDA Detector', 'Aspirating per zone', '200', 'Very early smoke'],
    ['Pre-action Sprinkler', 'Dry pipe, facility-wide', '1 system', 'Fire suppression'],
    ['NOC/SOC Console', '24/7 staffed position', '10', 'Monitoring'],
    ['Tenant Cage', '200–1 000 sq ft lockable', '50', 'Secure enclosures'],
    ['Rack Frame', '42U seismic-rated', '1 000', 'Cabinet mounting'],
    ['BMS / SCADA', 'Facility management system', '1 system', 'HVAC/elec/fire'],
];

const PURDUE = [
    ['L4 Enterprise', 'Tenant portal, billing/CRM, SLA reporting', 'REST API, OAuth2'],
    ['L3.5 DMZ', 'Cross-connect portal, firewall at demarcation', 'TLS 1.3, WAF'],
    ['L3 Operations', 'BMS/SCADA, NOC dashboard, capacity planning', 'BACnet/IP, SNMP v3'],
    ['L2 Supervisory', 'RPP controllers, CRAH automation, UPS monitoring', 'Modbus TCP, BACnet'],
    ['L1 Control', 'PDUs, environmental sensors, ATS controllers', 'SNMP, IPMI/BMC'],
    ['L0 Process', 'Tenant servers/compute, storage, networking equipment', 'PCIe, Ethernet'],
];

const REFS = [
    'Uptime Institute. (2023). Tier Standard: Topology (4th ed.). Uptime Institute.',
    'TIA. (2017). TIA-942-B: Telecommunications Infrastructure Standard for DCs. TIA.',
    'AICPA. (2022). SOC 2 Type II: Trust Services Criteria. AICPA.',
    'ISO. (2022). ISO/IEC 27001:2022 Information Security Management. ISO.',
    'PCI SSC. (2024). PCI DSS v4.0.1. PCI Security Standards Council.',
    'NFPA. (2020). NFPA 75: Standard for Protection of IT Equipment. NFPA.',
    'ASHRAE. (2021). TC 9.9: Thermal Guidelines for Data Processing. ASHRAE.',
    'IEC. (2018). IEC 62443-3-3: System Security Requirements. IEC.',
];

export default function ColocationPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <header className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]" style={{ background: C }} />
                    <span className="text-xs font-mono text-gray-500">ITEC · CL-COLO · Cloud & Data Centers</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">Enterprise Colocation Facility</h1>
                <p className="text-sm text-gray-500 max-w-3xl leading-relaxed">
                    A Tier III colocation facility (5 MW) provides carrier-neutral, multi-tenant data center
                    space with shared power/cooling infrastructure, meet-me room (MMR) for diverse interconnection,
                    5-factor physical security, and 99.999 % uptime SLA — serving retail/wholesale tenants
                    from enterprise to cloud/hybrid workloads.
                </p>
            </header>

            <S t="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-400 leading-relaxed">
                    Stakeholders: colocation provider (facility operator), retail/wholesale tenants (enterprises
                    leasing cages/cabinets), carriers/ISPs (providing diverse connectivity via MMR), compliance
                    auditors (SOC 2, PCI, HIPAA). Business capabilities: managed hosting, interconnection,
                    disaster recovery, hybrid cloud on-ramp.
                </p>
                <T h={['Standard', 'Scope']} rows={REGS} />
            </S>

            <S t="2. High-Level Design" id="design">
                <Pre>{`
┌─────────────────────────────────────────────────────────────────┐
│                    COLOCATION FACILITY (5 MW)                    │
│                                                                  │
│  ┌──────────────────────┐  ┌──────────────────────────────┐    │
│  │   MEET-ME ROOM (MMR) │  │     DATA HALL                 │    │
│  │   Carrier-Neutral    │  │  ┌─────┐ ┌─────┐ ┌─────┐     │    │
│  │   20× 42U cabinets   │  │  │Cage │ │Cage │ │Cage │ ... │    │
│  │   Fiber patch panels │  │  │ A   │ │ B   │ │ C   │     │    │
│  │   ISP / IX peering   │  │  │200sf│ │500sf│ │1000 │     │    │
│  └──────────┬───────────┘  │  └──┬──┘ └──┬──┘ └──┬──┘     │    │
│       Cross-│-Connect      │     │       │       │         │    │
│       Fiber │ / Cu         │  ═══╧═══════╧═══════╧═══      │    │
│       ──────┘              │  Hot Aisle Containment (HAC)   │    │
│                            │  CRAH In-row × 40              │    │
│                            └──────────────────────────────┘    │
├─────────────────────────────────────────────────────────────────┤
│  POWER CHAIN                                                     │
│  Utility ──▶ MV SW ──▶ ATS ──▶ UPS 750kVA ──▶ STS ──▶ RPP     │
│  13.8kV     Gear      Gen      N+1             Bypass   400A    │
│              │        1.5MW                             │       │
│              │                                   Metered PDU    │
│              │                                   30kW/rack      │
├─────────────────────────────────────────────────────────────────┤
│  NOC/SOC (24/7) │ BMS/SCADA │ VESDA │ Pre-action Sprinkler    │
└─────────────────────────────────────────────────────────────────┘`}</Pre>
            </S>

            <S t="3. Detailed Technical Description" id="tech">
                <h3 className="text-sm font-semibold text-white">3.1 Power Architecture</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    Dual utility feeds (13.8–34.5 kV) into MV switchgear for fault isolation. Static UPS
                    modules (300–750 kVA, N+1) with VRLA batteries (10–15 min bridge). Diesel generators
                    (1–3 MW, 72 hr fuel, N+1) via static transfer switches (STS). RPPs and metered rack PDUs
                    (20–30 kW/rack, C19/C13) with per-circuit billing. Target: 99.999 % uptime.
                </p>
                <h3 className="text-sm font-semibold text-white mt-4">3.2 Cooling</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    Central chilled water plant (200–1 000 ton, N+1 chillers). CRAH in-row/perimeter units
                    with hot aisle containment (HAC). Rear-door heat exchangers for high-density zones.
                    PUE &lt;1.4 target. Density support: 20–30 kW/rack standard.
                </p>
                <h3 className="text-sm font-semibold text-white mt-4">3.3 Interconnection & MMR</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    Carrier-neutral MMR hosts ISP/carrier PoPs, IXP access (DE-CIX, Equinix IX), and
                    cloud on-ramps (AWS Direct Connect, Azure ExpressRoute, GCP Interconnect). Fiber patch
                    panels (LC/MTP, 10G-400G), copper (Cat6A) cross-connects. Structured cabling via
                    ladder rack trays. Tenant demarcation at metered PDU/cage boundary.
                </p>
                <h3 className="text-sm font-semibold text-white mt-4">3.4 Physical Security</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    5-factor authentication (badge/PIN/biometric/retina/voice) at mantraps. 24/7 NOC/SOC
                    staffing. VESDA aspirating smoke detection. Pre-action dry-pipe suppression (holds water
                    until confirmed fire). CCTV with AI analytics. Escort for visitors.
                </p>
                <h3 className="text-sm font-semibold text-white mt-4">3.5 Compliance & SLA</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    99.999 % uptime SLA with graduated credits (5–100 % monthly fee). SOC 2 Type II annual
                    reports. PCI DSS 4.0 attestation for payment-processing tenants. HIPAA BAA for healthcare.
                    SSAE 18 compliance for financial services tenants.
                </p>
            </S>

            <S t="4. Process Diagrams" id="process">
                <Pre>{`
  TENANT PROVISIONING:
  Contract ──▶ Cage/Cabinet ──▶ Power Whip ──▶ Cross-Connect ──▶ Active
  SLA sign     Assign space     PDU + RPP      MMR fiber/Cu      Monitor
               Security PIN     UPS circuit    ISP/IX connect    BMS feed`}</Pre>
                <Pre>{`
  POWER CHAIN:
  Utility 13.8kV ──▶ MV SW ──▶ ATS ──▶ UPS 750kVA ──▶ STS ──▶ RPP
                      Gear     Gen N+1   VRLA 15 min   Bypass   400A
                               1.5 MW                          │
                                                        Metered PDU
                                                        30 kW/rack ──▶ Tenant`}</Pre>
            </S>

            <S t="5. Bill of Materials" id="bom">
                <p className="text-[11px] text-gray-600 mb-2">Tier III, 5 MW colocation facility, 1 000 racks.</p>
                <T h={['Equipment', 'Spec', 'Qty', 'Purpose']} rows={BOM} />
            </S>

            <S t="6. Purdue Model Mapping" id="purdue">
                <T h={['Level', 'Components', 'Protocols']} rows={PURDUE} />
                <p className="text-[11px] text-gray-600 mt-2">Tenant demarcation at L1/L2 (PDU/cabling handoff) with DMZ at MMR cross-connects.</p>
            </S>

            <S t="7–8. Supporting Systems & SLA Structure" id="support">
                <T h={['System', 'Description', 'Standard']} rows={[
                    ['VESDA', 'Very early smoke detection, aspirating per zone', 'NFPA 75/76'],
                    ['Pre-action Sprinkler', 'Dry pipe, water held until double confirmation', 'NFPA 13'],
                    ['BMS/SCADA', 'HVAC, electrical, fire alarm integration', 'BACnet/IP, Niagara'],
                    ['Environmental', 'Temp/humidity sensors per rack, DCIM telemetry', 'ASHRAE TC 9.9'],
                    ['Generator Fuel', '72 hr autonomy, dual-wall tank, spill containment', 'EPA UST'],
                    ['SLA Monitoring', '99.999% uptime, credits 5-100%, portal dashboard', 'SOC 2 / SSAE 18'],
                ]} />
            </S>

            <S t="9. Data Flow Architecture" id="dataflow">
                <Pre>{`
┌─────────────────────────────────────────────────────────────┐
│ TIER 4  ENTERPRISE     Tenant Portal, Billing, SLA Reports  │
│                         REST API, OAuth2 · on-demand         │
├─────────────────────────────────────────────────────────────┤
│ TIER 3  OPERATIONS     BMS/NOC, Capacity Planning, DCIM     │
│                         BACnet/IP, SNMP v3 · 30 s poll       │
├─────────────────────────────────────────────────────────────┤
│ TIER 2  SUPERVISORY    UPS, Chiller SCADA, ATS Monitor       │
│                         Modbus TCP, BACnet · 1 s update      │
├─────────────────────────────────────────────────────────────┤
│ TIER 1  CONTROL        PDU, CRAH, Environmental Sensors      │
│                         SNMP, IPMI · 100 ms poll             │
├─────────────────────────────────────────────────────────────┤
│ TIER 0  TENANT EQUIP   Servers, Switches, Storage (tenant)   │
│                         Tenant-owned, demarcated at PDU      │
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
                        { label: 'Hyperscale DC', href: '/wiki/information-technology/hyperscale-dc', color: '#06B6D4' },
                        { label: 'IXP', href: '/wiki/information-technology/ixp', color: '#10B981' },
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
                        <td className="px-3 py-2 text-[#F97316] font-medium whitespace-nowrap">{r[0]}</td>
                        {r.slice(1).map((c, i) => <td key={i} className="px-3 py-2">{c}</td>)}
                    </tr>
                ))}</tbody>
            </table>
        </div>
    );
}
