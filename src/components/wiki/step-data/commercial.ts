/**
 * Commercial Facilities Sector Step Data.
 *
 * Populates the 4-tab SectorStepViewer with Commercial Facilities sector
 * architecture content, derived from the TOGAF reference architecture and
 * the COMMERCIAL_SECTOR data model.
 *
 * @module components/wiki/step-data/commercial
 */

import { type SectorStepData, type SectorSummary } from '../SectorStepViewer';
import { COMMERCIAL_SECTOR } from '@/lib/sectors/infrastructure';

/**
 * Builds the complete step viewer data for the Commercial Facilities sector.
 *
 * @returns SectorStepData populated with Commercial Facilities architecture,
 *          sub-sectors, facilities, and equipment catalogs.
 */
export function getCommercialStepData(): SectorStepData {
    return {
        name: COMMERCIAL_SECTOR.name,
        code: COMMERCIAL_SECTOR.code,
        color: COMMERCIAL_SECTOR.color,
        srma: COMMERCIAL_SECTOR.srma,

        /* ── Tab 1: Architecture Vision (TOGAF Phase A–B) ───────────────── */
        architectureVision: {
            profile: [
                { label: 'PPD-21 Classification', value: 'CISA Sector 02 — Commercial Facilities' },
                { label: 'SRMA', value: 'Department of Homeland Security (CISA)' },
                {
                    label: 'Sub-Sectors',
                    value: `${COMMERCIAL_SECTOR.subSectors.length} sub-sectors · ${COMMERCIAL_SECTOR.subSectors.reduce((a, s) => a + s.facilities.length, 0)} facility types`,
                },
                {
                    label: 'Equipment Classes',
                    value: `${COMMERCIAL_SECTOR.subSectors.reduce((a, s) => a + s.facilities.reduce((b, f) => b + f.equipment.length, 0), 0)} DEXPI 2.0 types`,
                },
                { label: 'Sector Interdependencies', value: 'Energy, Water, Communications, Transportation' },
                { label: 'Regulatory Framework', value: 'NFPA 101, IBC, ADA, OSHA, state fire codes' },
            ],
            businessArchitecture: [
                {
                    title: 'Value Chain Analysis',
                    body: 'Venue design & construction → MEP commissioning → Event/operations management → Guest services & revenue generation → Facility maintenance & lifecycle management. Smart building platforms integrate BMS, access control, POS, and crowd analytics.',
                },
                {
                    title: 'Stakeholder Map',
                    body: 'Property owners/REITs, facility management companies (CBRE, JLL), event promoters (Live Nation), hospitality chains (Marriott, Hilton), gaming commissions, AHJs (fire marshals), insurance underwriters, and DHS/CISA.',
                },
                {
                    title: 'Architecture Principles',
                    body: 'Life-safety-first design per NFPA 101 Life Safety Code. Layered physical security (CPTED, PSIM). BACnet/IP building automation with DDC controllers. Redundant power (N+1 generators) for critical venues.',
                },
                {
                    title: 'Key Standards',
                    body: 'NFPA 101/72/13, IBC 2021, ASHRAE 90.1/62.1, UL 2900 (cybersecurity), BACnet (ASHRAE 135), ONVIF (security cameras), OSDP (access control), ASIS SPC.1 (physical security).',
                },
            ],
            threatLandscape: {
                headline: 'Threat Landscape',
                items: [
                    'Mass casualty events at soft-target venues (stadiums, hotels, convention centers)',
                    'BMS/IoT compromise enabling HVAC manipulation or fire suppression disabling',
                    'Point-of-sale malware and payment card skimming operations',
                    'Physical security system bypass (camera blinding, credential cloning)',
                    'Insider threat from transient workforce with temporary access credentials',
                ],
                bottomLine: 'DHS designates commercial facilities as highest-volume soft target sector',
            },
        },

        /* ── Tab 2: Reference Architecture (TOGAF Phase C–D) ────────────── */
        referenceArchitecture: {
            informationSystems: [
                {
                    title: 'Purdue Model (L0–L5)',
                    body: 'L0: Sensors (occupancy, smoke, flow, temperature). L1: DDC controllers, fire alarm panels, VFDs. L2: BMS/SCADA head-end, security HMI. L3: Energy management, PSIM, CMMS. L3.5: IT/OT DMZ, data gateway. L4/L5: Property management, POS/PMS, cloud analytics.',
                },
                {
                    title: 'Building Zones',
                    body: 'Zone 1 (Life Safety): Fire alarm, sprinkler, emergency lighting, PA/VA. Zone 2 (BMS): HVAC, chiller, boiler, elevator. Zone 3 (Security): CCTV, access control, intrusion detection. Zone 4 (IT): POS, PMS, Wi-Fi, digital signage. Conduits enforce VLAN segmentation.',
                },
                {
                    title: 'Data Flow Patterns',
                    body: 'BACnet/IP for HVAC control loops. ONVIF/RTSP for video surveillance. OSDP for access control readers. Modbus TCP for power metering. MQTT/REST for IoT sensor telemetry. SIA DC-07 for alarm monitoring to central station.',
                },
            ],
            technologyArchitecture: [
                {
                    title: 'Protocol Stack',
                    body: 'Application: BACnet, LonWorks, KNX, ONVIF. Transport: Modbus TCP, BACnet/IP, MQTT. Network: TCP/IP over managed switches. Link: Ethernet, RS-485, PoE. Physical: Cat6A, fiber backbone, wireless (Wi-Fi 6E, BLE).',
                },
                {
                    title: 'Network Architecture',
                    body: 'Converged IP backbone with VLAN segmentation: OT-BMS, OT-Security, IT-Guest, IT-Corporate. PoE+ for cameras and access control. Redundant core switches with spanning tree. SD-WAN for multi-property management.',
                },
                {
                    title: 'Infrastructure Systems',
                    body: 'Central plant: chillers (500–2000 ton), boilers, cooling towers, AHUs. Electrical: switchgear, transformers, emergency generators, UPS. Fire: wet/dry sprinkler, clean agent, smoke management. Vertical transport: elevators, escalators.',
                },
            ],
            engineeringValue: {
                headline: 'Digital Twin Coverage',
                items: [
                    'DEXPI 2.0 equipment model: building systems mapped to ASHRAE/NFPA equipment classes',
                    'Purdue Level coverage: L0 (sensors) through L4 (property management) with BACnet model',
                    'Life safety compliance: NFPA 72/101 zone mapping, egress capacity calculation',
                    'Energy management: ASHRAE 90.1 baseline, demand response participation readiness',
                    'Security integration: CPTED analysis, camera coverage mapping, access control zones',
                ],
                bottomLine: '4 sub-sectors · 4 facility archetypes · Full BMS/security/life-safety stack',
            },
        },

        /* ── Tabs 3 & 4: Sub-sectors (from data model) ──────────────────── */
        subSectors: COMMERCIAL_SECTOR.subSectors.map(sub => ({
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
 * Returns a lightweight summary of the Commercial sector for the hub page.
 */
export function getCommercialSummary(): SectorSummary {
    const data = getCommercialStepData();
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
