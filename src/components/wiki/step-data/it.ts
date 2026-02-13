/**
 * Information Technology Sector Step Data.
 *
 * Populates the 4-tab SectorStepViewer with IT sector architecture
 * content, derived from the TOGAF reference architecture and the
 * IT_SECTOR data model.
 *
 * @module components/wiki/step-data/it
 */

import { type SectorStepData } from '../SectorStepViewer';
import { IT_SECTOR } from '@/lib/sectors/services';

/**
 * Builds the complete step viewer data for the Information Technology sector.
 *
 * @returns SectorStepData populated with IT sector architecture,
 *          sub-sectors, facilities, and equipment catalogs.
 */
export function getITStepData(): SectorStepData {
    return {
        name: IT_SECTOR.name,
        code: IT_SECTOR.code,
        color: IT_SECTOR.color,
        srma: IT_SECTOR.srma,

        /* ── Tab 1: Architecture Vision (TOGAF Phase A–B) ───────────────── */
        architectureVision: {
            profile: [
                { label: 'PPD-21 Classification', value: 'CISA Sector 14 — Information Technology' },
                { label: 'SRMA', value: 'Department of Homeland Security (CISA)' },
                {
                    label: 'Sub-Sectors',
                    value: `${IT_SECTOR.subSectors.length} sub-sectors · ${IT_SECTOR.subSectors.reduce((a, s) => a + s.facilities.length, 0)} facility types`,
                },
                {
                    label: 'Equipment Classes',
                    value: `${IT_SECTOR.subSectors.reduce((a, s) => a + s.facilities.reduce((b, f) => b + f.equipment.length, 0), 0)} DEXPI 2.0 types`,
                },
                { label: 'Sector Interdependencies', value: 'Communications, Energy, Financial Services, Government' },
                { label: 'Regulatory Framework', value: 'NIST CSF, SOC 2, ISO 27001, SSAE 18, PCI DSS' },
            ],
            businessArchitecture: [
                {
                    title: 'Value Chain Analysis',
                    body: 'Silicon fabrication → Hardware manufacturing (servers, networking, storage) → Software development → Cloud/hosting services → Managed security services → End-user IT services. The IT sector provides the backbone infrastructure for all other CISA sectors.',
                },
                {
                    title: 'Stakeholder Map',
                    body: 'Hyperscalers (AWS, Azure, GCP), semiconductor fabs (TSMC, Intel, Samsung), IXP operators (Equinix, DE-CIX), CDN providers (Cloudflare, Akamai), SOC/MSSP providers, DNS operators (Verisign, ICANN), and CISA/NSA/FBI for cyber threat intelligence.',
                },
                {
                    title: 'Architecture Principles',
                    body: 'Uptime Institute Tier III/IV for data centers (99.982–99.995%). Defense-in-depth with zero-trust architecture. N+1/2N redundancy for power and cooling. Hot/warm/cold disaster recovery tiers. SBOM and supply chain integrity per EO 14028.',
                },
                {
                    title: 'Key Standards',
                    body: 'TIA-942-B (data centers), Uptime Institute Tier Standard, ASHRAE TC 9.9 (thermal), EN 50600 (DC infrastructure), NIST SP 800-53/171, SOC 2 Type II, ISO 27001/27017/27018, PCI DSS 4.0, SSAE 18.',
                },
            ],
            threatLandscape: {
                headline: 'Threat Landscape',
                items: [
                    'Supply chain attacks: SolarWinds-class compromise of software update mechanisms',
                    'Zero-day exploitation of hypervisor/firmware for cloud tenant escape',
                    'BGP hijacking and DNS poisoning affecting global routing infrastructure',
                    'Ransomware targeting managed service providers (MSPs) for downstream access',
                    'Hardware supply chain: counterfeit components and firmware implants in servers/networking',
                ],
                bottomLine: 'CISA designates IT as a cross-cutting lifeline sector enabling all other critical infrastructure',
            },
        },

        /* ── Tab 2: Reference Architecture (TOGAF Phase C–D) ────────────── */
        referenceArchitecture: {
            informationSystems: [
                {
                    title: 'Purdue Model (L0–L5)',
                    body: 'L0: Environmental sensors (temp, humidity, airflow, leak detection). L1: PDU controllers, CRAC/CRAH units, UPS, generator ATS. L2: DCIM platform, BMS, EPMS (electrical power monitoring). L3: Cloud orchestration, SDN controller, SIEM/SOC. L3.5: DMZ, WAF, DDoS mitigation. L4/L5: Customer portals, billing, capacity planning, NOC/SOC.',
                },
                {
                    title: 'Data Center Zones',
                    body: 'Zone 1 (White Space): Server racks, TOR switches, structured cabling. Zone 2 (Grey Space): Power distribution (UPS, STS, PDU), cooling (CRAH, chiller). Zone 3 (Meet-Me Room): Cross-connects, carrier hand-offs, IXP peering. Zone 4 (NOC/SOC): Monitoring, incident response, capacity management.',
                },
                {
                    title: 'Data Flow Patterns',
                    body: 'North-south: Client → load balancer → app tier → database. East-west: VM-to-VM within fabric (VXLAN/EVPN). Management: IPMI/iLO/iDRAC → out-of-band management network. Telemetry: SNMP/gNMI/streaming from switches → monitoring stack (Prometheus/Grafana).',
                },
            ],
            technologyArchitecture: [
                {
                    title: 'Protocol Stack',
                    body: 'Application: HTTPS, gRPC, GraphQL, AMQP, Kafka. Transport: TCP/QUIC, TLS 1.3, RDMA (RoCEv2). Network: BGP, OSPF, VXLAN/EVPN, Segment Routing. Link: 100/400/800GbE, InfiniBand HDR. Physical: SMF-28e+, MPO/MTP, DAC/AOC, liquid cooling manifolds.',
                },
                {
                    title: 'Network Architecture',
                    body: 'Spine-leaf (Clos) fabric with ECMP load balancing. Disaggregated switches (SONiC/DENT). DCI (data center interconnect) via DWDM. SDN overlay with VXLAN/EVPN for multi-tenancy. SmartNIC offload for encryption and micro-segmentation.',
                },
                {
                    title: 'Infrastructure Systems',
                    body: 'Power: utility feed (N+1), diesel rotary UPS, 2N PDU, busway distribution. Cooling: rear-door heat exchangers, in-row CRAH, chilled water (7-12°C), free cooling economizer, liquid-to-chip (direct-to-chip). Fire: VESDA early warning, Novec 1230 clean agent.',
                },
            ],
            engineeringValue: {
                headline: 'Digital Twin Coverage',
                items: [
                    'DEXPI 2.0 equipment model: data center equipment classes (server, switch, PDU, CRAH)',
                    'Purdue Level coverage: L0 (sensors) through L4 (NOC/SOC) with DCIM integration',
                    'Capacity planning: power density (kW/rack), PUE optimization, stranded capacity analysis',
                    'Resilience modeling: Uptime Tier topology verification, MTBF/MTTR simulation',
                    'Threat surface: rack-level micro-segmentation, east-west traffic flow analysis',
                ],
                bottomLine: '6 sub-sectors · 6 facility archetypes · Full data center + semiconductor + SOC stack',
            },
        },

        /* ── Tabs 3 & 4: Sub-sectors (from data model) ──────────────────── */
        subSectors: IT_SECTOR.subSectors.map(sub => ({
            code: sub.code,
            name: sub.name,
            description: sub.description,
            facilities: sub.facilities.map(fac => ({
                code: fac.code,
                name: fac.name,
                description: fac.description,
                equipment: fac.equipment.map(eq => ({
                    componentClass: eq.componentClass,
                    displayName: eq.displayName,
                    category: eq.category,
                    typicalQuantity: eq.typicalQuantity,
                })),
            })),
        })),
    };
}
