/**
 * Hyperscale Data Center Reference Architecture — Deep Dive.
 * @module wiki/information-technology/hyperscale-dc/page
 */
export const metadata = {
    title: 'Hyperscale Data Center Reference Architecture — Wiki',
    description: 'TOGAF reference architecture for 50-200+ MW hyperscale data center campus.',
};

const C = '#06B6D4';

const REGS = [
    ['Uptime Tier III/IV', 'Concurrent maintainability (III) / fault tolerance (IV) topology'],
    ['TIA-942-B', 'Telecommunications infrastructure standard for data centers'],
    ['ASHRAE TC 9.9', 'Thermal guidelines for data processing environments (5th ed.)'],
    ['NFPA 75/76', 'Fire protection for IT equipment / telecom facilities'],
    ['ISO 27001', 'Information security management system (ISMS) certification'],
    ['SOC 2 Type II', 'Trust services criteria — security, availability, confidentiality'],
    ['LEED / Green Globes', 'Sustainable building and operations certification'],
];

const BOM = [
    ['MV Switchgear', '34.5 kV, 4-panel', '4', 'Utility-to-transformer dist.'],
    ['Step-Down Transformer', '138/13.8 kV, 20 MVA', '8', 'Per data hall feed'],
    ['Diesel Generator', '2.5 MW, N+1 array', '40', 'ATS transfer, 72 hr fuel'],
    ['DRUPS / Static UPS', '6 MVA, 2N module', '8', 'Hall-level backup'],
    ['Bus Duct', '4 kV, 5 kA, 5 km total', '5 km', 'Power distribution runs'],
    ['RPP (Remote Power Panel)', '500 kW each', '250', 'Row-level distribution'],
    ['Rack PDU (Metered)', '20 kW/rack, C13/C19', '2 500', 'Per-rack telemetry'],
    ['Centrifugal Chiller', '1 000 ton, water-cooled', '20', 'N+1 cooling plant'],
    ['Cooling Tower', '1 000 ton evaporative', '20', 'Heat rejection'],
    ['CRAH Unit', '50 ton, precision air', '100', 'Hot aisle containment'],
    ['Spine Switch', '51.2 Tbps, 400G ports', '48', 'Fabric core (Clos)'],
    ['Leaf / ToR Switch', '12.8 Tbps, 400G ports', '200', 'Rack access layer'],
    ['DWDM System', '96-ch C-band, 400G ZR+', '4', 'Inter-hall optics'],
    ['SmartNIC / DPU', 'Per server offload', '5 000', 'RDMA / congestion ctrl'],
    ['CCTV Camera', '4K IP, AI analytics', '250', 'Perimeter + corridors'],
    ['VESDA Detector', 'Aspirating, per zone', '500', 'Very early smoke'],
    ['Clean Agent Cylinder', '1 000 lb Novec 1230', '80', 'Hall suppression'],
    ['Environmental Sensor', 'Temp/humidity, rack-level', '10 000', 'DCIM telemetry'],
    ['DCIM Server', 'Management cluster', '20 RU', 'Workload orchestration'],
    ['Battery Storage', '5 MWh Li-ion module', '10', 'Peak shaving / grid'],
    ['Mantrap Assembly', 'Biometric, 5-factor', '8', 'Entry points'],
];

const PURDUE = [
    ['L4 Enterprise', 'Cloud portal, billing, capacity planning', 'REST API, OAuth2, gRPC'],
    ['L3.5 DMZ', 'API gateway, WAF, DCIM proxy', 'TLS 1.3, firewall, bastion'],
    ['L3 Operations', 'DCIM, workload orchestrator, AI placement', 'Redfish, SNMP v3, IPMI'],
    ['L2 Supervisory', 'BMS, EPMS, chiller SCADA', 'BACnet/IP, Modbus TCP'],
    ['L1 Control', 'PDU, CRAC, ATS, generator PLC', 'SNMP, IPMI/BMC, Redfish'],
    ['L0 Process', 'Servers, racks, optics, SSD/HDD', 'PCIe, NVMe-oF, CXL'],
];

const SUPPORT = [
    ['Physical Security', 'Mantrap, biometric, 200+ CCTV AI analytics, 24/7 NOC/SOC', 'ISO 27001 Annex A'],
    ['Fire Detection', 'VESDA aspirating sensors per zone, Xtralis ICAM arrays', 'NFPA 75/76'],
    ['Fire Suppression', 'Novec 1230 clean agent, cylinders per data hall', 'NFPA 2001, FM-200'],
    ['Hot/Cold Contain.', 'Physical barriers, blanking panels, variable fan drives', 'ASHRAE TC 9.9'],
    ['Liquid Cooling', 'Direct-to-chip for GPU/AI, immersion (2-phase) for HPC', '> 100 kW/rack'],
    ['BMS/SCADA', 'Building management: HVAC, lighting, access, elevator', 'BACnet/IP, Niagara 4'],
];

const SUSTAIN = [
    ['PUE', 'Power Usage Effectiveness', 'Target 1.10–1.30 via free cooling'],
    ['WUE', 'Water Usage Effectiveness', 'Air-side economizer > evaporative'],
    ['CUE', 'Carbon Usage Effectiveness', '100% renewable PPA target'],
    ['Battery Storage', 'MWh-scale Li-ion', 'Peak shaving, grid services'],
    ['Waste Heat', 'District heating reuse', 'Northern European campuses'],
];

const REFS = [
    'Uptime Institute. (2023). Tier Standard: Topology (4th ed.). Uptime Institute.',
    'TIA. (2017). TIA-942-B: Telecommunications Infrastructure Standard for DCs. TIA.',
    'ASHRAE. (2021). TC 9.9: Thermal Guidelines for Data Processing Environments. ASHRAE.',
    'NFPA. (2020). NFPA 75: Standard for Protection of IT Equipment. NFPA.',
    'ISO. (2022). ISO/IEC 27001:2022 Information Security Management. ISO.',
    'Radovanovic, N., et al. (2021). Per-PDU power forecasting in hyperscale DC. IEEE.',
    'Colangelo, M., et al. (2025). Grid-interactive hyperscale strategies. IEEE.',
    'Tarraga-Moreno, A., et al. (2025). Optical interconnects for AI hyperscale. Optica.',
];

export default function HyperscaleDcPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <header className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]" style={{ background: C }} />
                    <span className="text-xs font-mono text-gray-500">ITEC · CL-HYPER · Cloud & Data Centers</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">Hyperscale Data Center</h1>
                <p className="text-sm text-gray-500 max-w-3xl leading-relaxed">
                    A hyperscale data center campus (50–200+ MW) houses thousands of racks across multiple
                    data halls, powered by 2N-redundant utility feeds, backed by diesel generator arrays,
                    cooled to PUE &lt; 1.3 with liquid cooling for AI/HPC, and interconnected by 400G
                    spine-leaf fabrics — all managed by DCIM and AI-driven workload orchestration.
                </p>
            </header>

            <S t="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-400 leading-relaxed">
                    Stakeholders: cloud providers (AWS, Azure, GCP), colo operators, utilities (grid-interactive),
                    local planning authorities (site permits, water rights), equipment OEMs (Schneider, Vertiv,
                    Eaton). Business capabilities: compute (GPU/TPU clusters), storage (NVMe/CXL pools),
                    network (multi-Tb/s fabrics), security (redundancy + predictive maintenance).
                </p>
                <T h={['Standard', 'Scope']} rows={REGS} />
            </S>

            <S t="2. High-Level Design" id="design">
                <p className="text-sm text-gray-400 leading-relaxed">
                    Campus: multiple 20 MW data halls, each 1 000–2 000 racks. 2N/2(N+1) power topology:
                    utility substation (34.5–138 kV) → MV switchgear → transformers → generator arrays
                    (20–80 × 2–3 MW) → ATS → UPS → bus duct → RPP → rack PDU. Cooling combines free-air
                    economizers, evaporative, hot/cold aisle containment, rear-door HX, and direct-to-chip
                    liquid cooling for AI racks at &gt;100 kW/rack.
                </p>
                <Pre>{`
┌─────────────────────────────────────────────────────────────────┐
│                     HYPERSCALE CAMPUS                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │  DATA HALL A │  │  DATA HALL B │  │  DATA HALL C │ ... N      │
│  │  20 MW       │  │  20 MW       │  │  20 MW       │            │
│  │  2000 racks  │  │  2000 racks  │  │  2000 racks  │            │
│  │              │  │              │  │              │            │
│  │ ┌──────────┐ │  │ ┌──────────┐ │  │ ┌──────────┐ │            │
│  │ │Spine-Leaf│ │  │ │Spine-Leaf│ │  │ │Spine-Leaf│ │            │
│  │ │400G Clos │ │  │ │400G Clos │ │  │ │400G Clos │ │            │
│  │ └──────────┘ │  │ └──────────┘ │  │ └──────────┘ │            │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘            │
│    DWDM ╧══════════════════╧══════════════════╧═══ 400G ZR+     │
├─────────────────────────────────────────────────────────────────┤
│  UTILITY YARD                                                    │
│  ┌─────────┐ ┌───────────┐ ┌────────────┐ ┌────────────────┐   │
│  │Substation│ │Gen Arrays│ │Chiller Plant│ │Cooling Towers │   │
│  │34.5-138kV│ │40×2.5 MW │ │20×1000 ton │ │20 evaporative │   │
│  └─────────┘ └───────────┘ └────────────┘ └────────────────┘   │
└─────────────────────────────────────────────────────────────────┘`}</Pre>
            </S>

            <S t="3. Detailed Technical Description" id="tech">
                <h3 className="text-sm font-semibold text-white">3.1 Power Train</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    Utility feed 10–100+ MW via 34.5–138 kV substation. MV switchgear with redundant bus coupling.
                    Generator arrays 20–80 × 2–3 MW diesel with 72-hr fuel capacity and ATS transfer in &lt;10 s.
                    DRUPS or static UPS (6 MVA modules, 2N). Bus duct distribution, RPP per row, metered rack PDU
                    with sub-5% MAPE power forecasting per-PDU telemetry.
                </p>
                <h3 className="text-sm font-semibold text-white mt-4">3.2 Cooling Plant</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    Centrifugal chillers (500–2 000 ton), N+1 cooling towers, CRAHs (in-row/overhead), hot aisle
                    containment with blanking panels. PUE 1.10–1.30 achieved via free-air economizers
                    (max economizer hours by climate zone). Liquid cooling: direct-to-chip (warm water) for
                    GPU racks &gt;80 kW, 2-phase immersion for HPC at &gt;100 kW/rack.
                </p>
                <h3 className="text-sm font-semibold text-white mt-4">3.3 Network Fabric</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    Spine-leaf Clos topology: 51.2 Tbps spine switches, 12.8 Tbps ToR switches, 25–400 Gbps
                    per-rack uplinks scaling to 800G Ethernet. DWDM (96-channel C-band) with coherent 400G ZR+
                    for inter-hall connectivity. BGP/ECMP for equal-cost multipath, VXLAN/EVPN overlays.
                    SmartNIC/DPU for congestion control and RDMA offload (TB/s per device).
                </p>
                <h3 className="text-sm font-semibold text-white mt-4">3.4 Physical Security</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    5-factor authentication at mantraps, 200+ 4K AI-analytics cameras, VESDA aspirating smoke
                    detection, Novec 1230 clean agent suppression, 24/7 NOC/SOC staffing. Perimeter: bollards,
                    K-rated fencing, vehicle barriers, guard house.
                </p>
                <h3 className="text-sm font-semibold text-white mt-4">3.5 DCIM & Monitoring</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    DCIM platform integrates BMS, EPMS, and 10 000+ environmental sensors. AI workload placement
                    optimizes power/cooling. Predictive maintenance via ML on vibration/thermal data. SNMP v3,
                    Redfish, IPMI/BMC telemetry aggregated into Grafana/Prometheus dashboards.
                </p>
            </S>

            <S t="4. Process Diagrams" id="process">
                <Pre>{`
  POWER TRAIN:
  Utility 138kV ──▶ MV SW ──▶ Xfmr ──▶ Gen Array ──▶ ATS ──▶ UPS
                     Gear     20 MVA    40×2.5 MW            6 MVA
                                                              │
                                        ┌─────────────────────┘
                                        ▼
                              Bus Duct ──▶ RPP ──▶ Rack PDU ──▶ Server
                              4kV/5kA     500kW    20 kW       GPU/CPU`}</Pre>
                <Pre>{`
  COOLING LOOP:
  Chiller ──▶ CHW Loop ──▶ CRAH ──▶ Cold Aisle ──▶ Rack ──▶ Hot Aisle
  1000 ton    7/12°C        In-Row   18-27°C        Load     35-45°C
                                                              │
  Cooling Tower ◀── Condenser ◀── Chiller Return ◀────────────┘`}</Pre>
                <Pre>{`
  NETWORK FABRIC:
  Server ──▶ SmartNIC ──▶ Leaf (ToR) ──▶ Spine ──▶ DWDM ──▶ Hall B
  GPU/CPU    DPU          12.8 Tbps      51.2 Tbps 400G ZR+
             RDMA         VXLAN/EVPN     BGP/ECMP  96-ch`}</Pre>
            </S>

            <S t="5. Bill of Materials" id="bom">
                <p className="text-[11px] text-gray-600 mb-2">Scaled for a 50 MW campus, multiple halls, 2N redundancy, PUE ~1.2.</p>
                <T h={['Equipment', 'Spec', 'Qty', 'Rating']} rows={BOM} />
            </S>

            <S t="6. Purdue Model Mapping" id="purdue">
                <T h={['Level', 'Components', 'Protocols']} rows={PURDUE} />
                <p className="text-[11px] text-gray-600 mt-2">DMZ at L3.5 isolates IT fabric (VXLAN/BGP) from OT protocols (SNMPv3, Modbus).</p>
            </S>

            <S t="7. Supporting Systems" id="support">
                <T h={['System', 'Description', 'Standard']} rows={SUPPORT} />
            </S>

            <S t="8. Sustainability & Efficiency" id="sustain">
                <T h={['Metric', 'Description', 'Target']} rows={SUSTAIN} />
            </S>

            <S t="9. Data Flow Architecture" id="dataflow">
                <Pre>{`
┌────────────────────────────────────────────────────────────┐
│ TIER 5  ENTERPRISE       Cloud Portal, Billing, Analytics  │
│                           REST/gRPC · customer-facing       │
├────────────────────────────────────────────────────────────┤
│ TIER 4  ORCHESTRATION    Workload Placement, Kubernetes    │
│                           gRPC, Borg/Omega · 10 s cycle    │
├────────────────────────────────────────────────────────────┤
│ TIER 3  DCIM / BMS       DCIM, EPMS, Predictive Maint.    │
│                           Redfish, SNMP v3 · 30 s poll     │
├────────────────────────────────────────────────────────────┤
│ TIER 2  SUPERVISORY      Chiller SCADA, Generator PLC     │
│                           BACnet/IP, Modbus TCP · 1 s      │
├────────────────────────────────────────────────────────────┤
│ TIER 1  CONTROL          PDU, ATS, CRAC, UPS controller   │
│                           IPMI/BMC, Redfish · 100 ms       │
├────────────────────────────────────────────────────────────┤
│ TIER 0  PROCESS          Servers, racks, optics, storage   │
│                           PCIe, NVMe-oF, CXL · µs          │
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
                        { label: 'Colocation Facility', href: '/wiki/information-technology/colocation', color: '#F97316' },
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
                        <td className="px-3 py-2 text-[#06B6D4] font-medium whitespace-nowrap">{r[0]}</td>
                        {r.slice(1).map((c, i) => <td key={i} className="px-3 py-2">{c}</td>)}
                    </tr>
                ))}</tbody>
            </table>
        </div>
    );
}
