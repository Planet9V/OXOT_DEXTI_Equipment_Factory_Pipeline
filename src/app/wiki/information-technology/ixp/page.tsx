/**
 * Internet Exchange Point (IXP) Reference Architecture — Deep Dive.
 * @module wiki/information-technology/ixp/page
 */
export const metadata = {
    title: 'Internet Exchange Point Reference Architecture — Wiki',
    description: 'TOGAF reference architecture for IXP: L2 peering fabric, route servers, RPKI, 400G ZR+.',
};

const C = '#10B981';

const REGS = [
    ['Euro-IX', 'IXP best practices, switch wishlist, operational standards'],
    ['PeeringDB', 'Peering database coordination, member automation API'],
    ['MANRS', 'Mutually Agreed Norms for Routing Security — 4 actions'],
    ['RFC 4271', 'BGP-4: Border Gateway Protocol specification'],
    ['RFC 7948', 'IXP Peering LAN route server design guidelines'],
    ['RFC 7999', 'Blackhole community for remotely triggered blackholing'],
    ['IEEE 802.1Q', 'VLAN tagging for fabric segmentation'],
];

const BOM = [
    ['Core Switch (Plane A)', 'Arista 7280R3, 400G chassis', '2', 'Dual-plane fabric core'],
    ['Core Switch (Plane B)', 'Arista 7280R3, 400G chassis', '2', 'Redundant plane'],
    ['Edge Director', 'Juniper QFX10000 modular', '8', 'Member peering ports'],
    ['Route Server', 'Nokia 7750 SR-s, BIRD/OpenBGPd', '2', 'RS pair, active/standby'],
    ['400G ZR+ Transceiver', 'QSFP-DD coherent DWDM', '200', 'Inter-PoP optics'],
    ['100G SR4 QSFP28', 'Short-reach multi-mode', '1 000', 'Member uplinks'],
    ['MTP/MPO Patch Panel', '100G/400G fiber cross-connect', '500', 'MMR structured cabling'],
    ['DWDM Mux/Demux', '96-ch C-band, dark fiber', '2', 'Inter-site DWDM'],
    ['400G Line Card', '48-port expansion modules', '20', 'Switch port growth'],
    ['CRAC Unit', '100 kW precision cooling, N+1', '4', 'IXP switch room'],
    ['Dual-Feed PDU', '48VDC/208VAC, A/B power', '2 racks', 'Redundant power'],
    ['sFlow/IPFIX Probe', 'Monitoring tap per plane', '10', 'Traffic analytics'],
    ['LACP 100G Port', 'Member LAG-capable SFP-DD', '500', 'Peering ports'],
    ['EVPN-VXLAN Gateway', 'Multi-PoP L2 extension', '4', 'Distributed IXP'],
    ['RPKI Validator', 'Routinator / FORT', '2', 'ROV per route server'],
    ['PeeringDB Server', 'API automation, member sync', '1', 'Peering DB integration'],
    ['Grafana/MRTG Stack', 'Bandwidth visualization', '2', 'sFlow + Prometheus'],
    ['Looking Glass Server', 'Public BGP query web portal', '4', 'Per RS + per PoP'],
    ['Quarantine Switch', 'New/untrusted member VLAN', '4', 'Isolation segment'],
    ['1U Member Router', 'Rackmount colo space', '100', 'Member-side peering'],
];

const PURDUE = [
    ['L4 Enterprise', 'PeeringDB portal, member billing, MANRS compliance', 'REST API, HTTPS'],
    ['L3.5 DMZ', 'Looking glass, public BGP query, API gateway', 'BGP communites, TLS'],
    ['L3 Operations', 'Route servers (BIRD), RPKI/ROV, IRR filtering', 'BGP-4, BMP (RFC 7854)'],
    ['L2 Supervisory', 'sFlow/IPFIX monitoring, Grafana dashboards, MRTG', 'sFlow, SNMP v3'],
    ['L1 Control', 'Switching fabric, LACP LAGs, VLAN tagging 802.1Q', 'gNMI/OpenConfig, YANG'],
    ['L0 Process', 'Fiber cross-connects, DWDM optics, MTP/MPO panels', 'Physical layer, photonics'],
];

const REFS = [
    'IETF. (2006). RFC 4271: A Border Gateway Protocol 4 (BGP-4). IETF.',
    'IETF. (2016). RFC 7854: BGP Monitoring Protocol (BMP). IETF.',
    'IETF. (2016). RFC 7999: Blackhole Community. IETF.',
    'Euro-IX. (2023). IXP Wishlist: Switch and Security Recommendations. Euro-IX.',
    'MANRS. (2023). Mutually Agreed Norms for Routing Security. Internet Society.',
    'NSRC. (2021). Internet Exchange Point Design. NSRC Workshop.',
    'Catchpoint. (2023). Network Admin Guide to IXP Architecture. Catchpoint.',
    'Internet Society. (2020). Explainer: What is an IXP? Internet Society.',
];

export default function IxpPage() {
    return (
        <div className="max-w-5xl space-y-10">
            <header className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]" style={{ background: C }} />
                    <span className="text-xs font-mono text-gray-500">ITEC · CL-IXP · Cloud & Data Centers</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">Internet Exchange Point (IXP)</h1>
                <p className="text-sm text-gray-500 max-w-3xl leading-relaxed">
                    An IXP provides a shared Layer 2 Ethernet peering fabric where 500+ member networks
                    exchange traffic directly via BGP, reducing transit costs, lowering latency to sub-1 ms
                    RTT, and keeping local traffic local — operated at 10+ Tbps peak with RPKI/ROV route
                    validation and MANRS compliance.
                </p>
            </header>

            <S t="1. TOGAF Business Architecture" id="togaf">
                <p className="text-sm text-gray-400 leading-relaxed">
                    Stakeholders: ISPs (Tier 2/3), CDNs (Cloudflare, Akamai), cloud providers (AWS, GCP, Azure),
                    enterprise networks, IXP operator (neutral third party), route server operator, MANRS/Euro-IX
                    peering community. Business capabilities: peering (eBGP sessions), traffic exchange (localization),
                    latency reduction (direct L2 connectivity).
                </p>
                <T h={['Standard', 'Scope']} rows={REGS} />
            </S>

            <S t="2. High-Level Design" id="design">
                <Pre>{`
┌─────────────────────────────────────────────────────────────────┐
│                     IXP FABRIC ARCHITECTURE                     │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              PEERING LAN (Layer 2 Ethernet)               │   │
│  │  ┌──────────┐         ┌──────────┐         ┌──────────┐  │   │
│  │  │ PLANE A  │ ═══════ │ ROUTE    │ ═══════ │ PLANE B  │  │   │
│  │  │ 400G     │  LACP   │ SERVER   │  LACP   │ 400G     │  │   │
│  │  │ Arista   │         │ BIRD RS  │         │ Arista   │  │   │
│  │  └────┬─────┘         │ RPKI/ROV │         └────┬─────┘  │   │
│  │       │               └──────────┘              │        │   │
│  │  ┌────┴─────────────────────────────────────────┴────┐   │   │
│  │  │              MEMBER PORTS (100G-400G)               │   │   │
│  │  │  ISP-A │ CDN-B │ Cloud-C │ Enterprise-D │ ISP-E    │   │   │
│  │  └────────────────────────────────────────────────────┘   │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  VLAN SEGMENTS:  [Peering LAN]  [Quarantine]  [Services]        │
│  MMR: Meet-Me Room w/ carrier cross-connects + MTP/MPO panels   │
└─────────────────────────────────────────────────────────────────┘`}</Pre>
            </S>

            <S t="3. Detailed Technical Description" id="tech">
                <h3 className="text-sm font-semibold text-white">3.1 Switching Fabric</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    Dual-plane resiliency: Arista/Juniper/Nokia 100G-400G switches with MLAG/ECMP/LACP for LAGs.
                    Flat L2 or EVPN-VXLAN for multi-site L2 extension. Fiber SFPs enable 1G-to-400G upgrades.
                    Per Euro-IX security wishlist: hardened management plane, ACL-protected control plane.
                </p>
                <h3 className="text-sm font-semibold text-white mt-4">3.2 Route Servers</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    RS pair (active/standby) runs BIRD 2 or OpenBGPd for eBGP to all members. Private ASN,
                    next-hop-self. RPKI/ROV (RFC 7999) for route origin validation, IRR filtering, max-prefix
                    limits, and BGP communities for policy control. Backend routed link for public looking glass.
                </p>
                <h3 className="text-sm font-semibold text-white mt-4">3.3 Optical Transport</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    DWDM 96-channel C-band with coherent 400G ZR+ transceivers over dark fiber rings. MTP/MPO
                    patch panels for high-density cross-connects in meet-me room. Fiber management: LC/MTP
                    connectors, splice trays, bend-insensitive SMF.
                </p>
                <h3 className="text-sm font-semibold text-white mt-4">3.4 Power & Cooling</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    Dual-feed A/B power (48 VDC or 208 VAC). N+1 CRAC precision cooling for DC-grade uptime.
                    Switch rooms at 18–27 °C per ASHRAE envelope. UPS per rack with battery bridge.
                </p>
                <h3 className="text-sm font-semibold text-white mt-4">3.5 Monitoring & Compliance</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    sFlow/IPFIX for sampled flow analysis, MRTG/Grafana for bandwidth visualization, PeeringDB
                    API for member DB sync, looking glass (public BGP query), SNMP v3/gNMI for device telemetry,
                    and MANRS compliance dashboards tracking all 4 MANRS actions.
                </p>
            </S>

            <S t="4. Process Diagrams" id="process">
                <Pre>{`
  BGP PEERING FLOW:
  Member Router ──▶ 100G/400G Port ──▶ Switch Fabric ──▶ Route Server
  eBGP session       LACP LAG            Plane A+B        BIRD/RS
  Prefix announce    802.1Q VLAN         Flat L2          RPKI/ROV
                                                          IRR check
                                                          │
                     ┌──────────────────────────────────── ┘
                     ▼
  Route Server ──▶ All Members ──▶ Best-Path Selection ──▶ Traffic
  Advertise           eBGP recv     AS-path / community    Exchange`}</Pre>
                <Pre>{`
  DISTRIBUTED IXP (Multi-PoP):
  PoP A ══ DWDM 400G ZR+ ══ PoP B ══ DWDM 400G ZR+ ══ PoP C
  Switch    Dark Fiber Ring   Switch    Dark Fiber Ring   Switch
  Plane     96-ch C-band      Plane     96-ch C-band     Plane
  RS-A      EVPN-VXLAN        RS-B      EVPN-VXLAN       RS-C`}</Pre>
            </S>

            <S t="5. Bill of Materials" id="bom">
                <p className="text-[11px] text-gray-600 mb-2">Medium-large IXP: 500+ members, 10+ Tbps peak throughput.</p>
                <T h={['Equipment', 'Spec', 'Qty', 'Purpose']} rows={BOM} />
            </S>

            <S t="6. Purdue Model Mapping" id="purdue">
                <T h={['Level', 'Components', 'Protocols']} rows={PURDUE} />
            </S>

            <S t="7. Communication Protocols" id="protocols">
                <T h={['Protocol', 'Purpose', 'Details']} rows={[
                    ['BGP-4 (RFC 4271)', 'Core eBGP for prefix exchange', 'Multiprotocol, best-path via AS-path/communities'],
                    ['BMP (RFC 7854)', 'Route server BGP telemetry', 'Pre/post-policy RIB monitoring'],
                    ['RPKI', 'Certificate-based prefix validation', 'Routinator/FORT, ROA objects, ROV'],
                    ['sFlow', 'Sampled flow export for analytics', 'Packet sampling, counter polling'],
                    ['SNMP v3', 'Device polling with auth/encryption', 'MIB-II, interface counters'],
                    ['gNMI/OpenConfig', 'Model-driven streaming telemetry', 'YANG-based, gRPC transport'],
                ]} />
            </S>

            <S t="8–9. Supporting Systems & Data Flow" id="supporting">
                <Pre>{`
┌─────────────────────────────────────────────────────────────┐
│ TIER 4  GOVERNANCE     MANRS Dashboard, Euro-IX Compliance  │
│                         Policy automation · quarterly        │
├─────────────────────────────────────────────────────────────┤
│ TIER 3  OPERATIONS     PeeringDB Sync, Looking Glass        │
│                         REST API, BGP query · on-demand      │
├─────────────────────────────────────────────────────────────┤
│ TIER 2  MONITORING     sFlow/Grafana, MRTG Weathermap       │
│                         sFlow, IPFIX · 5 s sample            │
├─────────────────────────────────────────────────────────────┤
│ TIER 1  ROUTING        Route Servers, RPKI Validators       │
│                         BGP, BMP · BGP convergence           │
├─────────────────────────────────────────────────────────────┤
│ TIER 0  PHYSICAL       Switches, DWDM Optics, MMR Panels   │
│                         Ethernet, Photonics · line rate      │
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
                        { label: 'Colocation', href: '/wiki/information-technology/colocation', color: '#F97316' },
                        { label: 'Hyperscale DC', href: '/wiki/information-technology/hyperscale-dc', color: '#06B6D4' },
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
                        <td className="px-3 py-2 text-[#10B981] font-medium whitespace-nowrap">{r[0]}</td>
                        {r.slice(1).map((c, i) => <td key={i} className="px-3 py-2">{c}</td>)}
                    </tr>
                ))}</tbody>
            </table>
        </div>
    );
}
