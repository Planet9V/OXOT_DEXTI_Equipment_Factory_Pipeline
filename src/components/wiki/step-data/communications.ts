/**
 * Communications Sector Step Data.
 *
 * Populates the 4-tab SectorStepViewer with Communications sector architecture
 * content, derived from the TOGAF reference architecture and the
 * COMMUNICATIONS_SECTOR data model.
 *
 * @module components/wiki/step-data/communications
 */

import { type SectorStepData, type SectorSummary } from '../SectorStepViewer';
import { COMMUNICATIONS_SECTOR } from '@/lib/sectors/infrastructure';

/**
 * Builds the complete step viewer data for the Communications sector.
 *
 * @returns SectorStepData populated with Communications sector architecture,
 *          sub-sectors, facilities, and equipment catalogs.
 */
export function getCommunicationsStepData(): SectorStepData {
    return {
        name: COMMUNICATIONS_SECTOR.name,
        code: COMMUNICATIONS_SECTOR.code,
        color: COMMUNICATIONS_SECTOR.color,
        srma: COMMUNICATIONS_SECTOR.srma,

        /* ── Tab 1: Architecture Vision (TOGAF Phase A–B) ───────────────── */
        architectureVision: {
            profile: [
                { label: 'PPD-21 Classification', value: 'CISA Sector 03 — Communications' },
                { label: 'SRMA', value: 'Department of Homeland Security (CISA)' },
                {
                    label: 'Sub-Sectors',
                    value: `${COMMUNICATIONS_SECTOR.subSectors.length} sub-sectors · ${COMMUNICATIONS_SECTOR.subSectors.reduce((a, s) => a + s.facilities.length, 0)} facility types`,
                },
                {
                    label: 'Equipment Classes',
                    value: `${COMMUNICATIONS_SECTOR.subSectors.reduce((a, s) => a + s.facilities.reduce((b, f) => b + f.equipment.length, 0), 0)} DEXPI 2.0 types`,
                },
                { label: 'Sector Interdependencies', value: 'Energy, IT, Transportation, Emergency Services' },
                { label: 'Regulatory Framework', value: 'FCC, NTIA, NIST, CALEA, E911' },
            ],
            businessArchitecture: [
                {
                    title: 'Value Chain Analysis',
                    body: 'Content/data origination → Core/backbone transport (DWDM, MPLS) → Metro aggregation → Last-mile access (fiber, wireless, cable) → Customer premises. 5G/LTE provides wireless overlay; satellite delivers global backhaul and direct-to-device services.',
                },
                {
                    title: 'Stakeholder Map',
                    body: 'Tier 1 carriers (AT&T, Verizon, Lumen), cable MSOs (Comcast, Charter), wireless MNOs, tower companies (Crown Castle, AMT), satellite operators (Starlink, SES), ISPs, NCTC, FCC, NTIA, and state PUCs.',
                },
                {
                    title: 'Architecture Principles',
                    body: 'Five-nines availability (99.999%) for voice services. Geographic redundancy with SONET/SDH ring protection and MPLS fast-reroute. Defense-in-depth for signaling (SS7/SIP) and management planes. FCC E911 location accuracy mandates.',
                },
                {
                    title: 'Key Standards',
                    body: 'ITU-T G.984 (GPON), 3GPP 5G NR (Rel. 17), DOCSIS 4.0, MEF 3.0, ATIS NRSC, IEEE 802.3 (Ethernet), TIA-942 (data centers), NIST SP 800-183 (IoT), CALEA (lawful intercept).',
                },
            ],
            threatLandscape: {
                headline: 'Threat Landscape',
                items: [
                    'SS7/Diameter signaling exploitation for call interception and tracking',
                    'BGP hijacking redirecting internet traffic through adversary networks',
                    'Fiber cut / physical infrastructure attacks on undersea cables and COs',
                    'SIM-swap and mobile identity fraud across MNO platforms',
                    'DNS amplification and DDoS against DNS infrastructure (>3 Tbps recorded)',
                ],
                bottomLine: 'CISA rates Communications as Tier 1 critical infrastructure dependency',
            },
        },

        /* ── Tab 2: Reference Architecture (TOGAF Phase C–D) ────────────── */
        referenceArchitecture: {
            informationSystems: [
                {
                    title: 'Purdue Model (L0–L5)',
                    body: 'L0: Fiber optic transceivers, antennas, coax plant. L1: SONET/DWDM mux, RF transmitters, rectifiers. L2: DSLAM, OLT, BTS/gNB controllers. L3: Network management (NOC), OSS/BSs. L3.5: Service provider DMZ. L4/L5: Enterprise BSS, billing, CRM, regulatory.',
                },
                {
                    title: 'ISA/IEC 62443 Zones',
                    body: 'Zone 1 (Transport): DWDM, SONET ADMs, fiber plants. Zone 2 (Access): OLTs, DSLAMs, cell sites. Zone 3 (Service): Core routers, CDN, IMS/VoLTE. Zone 4 (Enterprise): BSS, OSS, billing. Conduits enforce strict ACLs between management and data planes.',
                },
                {
                    title: 'Data Flow Patterns',
                    body: 'User-plane traffic: GTP-U tunnels over backhaul. Control-plane: NGAP/NAS signaling in 5G core. Management: SNMP/NETCONF/YANG for NMS. Billing: CDR/xDR → mediation → rating engine → invoice. E911: HELD/PIDF-LO location data to PSAP.',
                },
            ],
            technologyArchitecture: [
                {
                    title: 'Protocol Stack',
                    body: 'Application: SIP, H.323, MGCP, XMPP. Transport: RTP/RTCP, QUIC, TCP/TLS. Network: MPLS, BGP, OSPF/IS-IS, GTP. Link: Ethernet, DOCSIS, PON (GPON/XGS-PON). Physical: Fiber (SMF/MMF), 5G NR mmWave/sub-6, Coax, Satellite Ka/Ku-band.',
                },
                {
                    title: 'Network Architecture',
                    body: 'Long-haul backbone (DWDM 400G), metro aggregation (ROADMs), access rings (GPON/XGS-PON), 5G RAN (CU/DU/RU), ORAN disaggregated architecture. SDN/NFV for core network functions (UPF, SMF, AMF). CDN edge caches for content delivery.',
                },
                {
                    title: 'Infrastructure Systems',
                    body: 'Central office: -48V DC plant, diesel generators, HVAC/CRAC. Cell sites: RRH/RU, antenna systems, backup batteries (8hr). Cable headend: CMTS/CCAP, RF combiners, node optics. Satellite: ground stations (LNA, BUC, tracking antennas).',
                },
            ],
            engineeringValue: {
                headline: 'Digital Twin Coverage',
                items: [
                    'DEXPI 2.0 equipment model: telecom-adapted classes for active/passive network elements',
                    'Purdue Level coverage: L0 (physical plant) through L4 (BSS/OSS) with signaling model',
                    'FCC compliance mapping: E911 location, CALEA intercept points, spectrum license tracking',
                    'Network topology: fiber route, RF propagation, and capacity modeling',
                    'Threat graph: BGP prefix ↔ AS path ↔ peering point ↔ undersea cable vulnerability chain',
                ],
                bottomLine: '4 sub-sectors · 4 facility archetypes · Full 5G/fiber/cable/satellite stack',
            },
        },

        /* ── Tabs 3 & 4: Sub-sectors (from data model) ──────────────────── */
        subSectors: COMMUNICATIONS_SECTOR.subSectors.map(sub => ({
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

/**
 * Returns a lightweight summary of the Communications sector for the hub page.
 */
export function getCommunicationsSummary(): SectorSummary {
    const data = getCommunicationsStepData();
    return {
        profile: data.architectureVision.profile,
        businessBlurb: data.architectureVision.businessArchitecture[0]?.body || '',
        subSectors: data.subSectors.map(s => ({
            code: s.code,
            name: s.name,
            description: s.description,
        })),
    };
}
