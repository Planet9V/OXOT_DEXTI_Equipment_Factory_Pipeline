/**
 * Dams Sector Step Data.
 *
 * Populates the 4-tab SectorStepViewer with Dams sector architecture
 * content, derived from the TOGAF reference architecture and the
 * DAMS_SECTOR data model.
 *
 * @module components/wiki/step-data/dams
 */

import { type SectorStepData } from '../SectorStepViewer';
import { DAMS_SECTOR } from '@/lib/sectors/infrastructure';

/**
 * Builds the complete step viewer data for the Dams sector.
 *
 * @returns SectorStepData populated with Dams sector architecture,
 *          sub-sectors, facilities, and equipment catalogs.
 */
export function getDamsStepData(): SectorStepData {
    return {
        name: DAMS_SECTOR.name,
        code: DAMS_SECTOR.code,
        color: DAMS_SECTOR.color,
        srma: DAMS_SECTOR.srma,

        /* ── Tab 1: Architecture Vision (TOGAF Phase A–B) ───────────────── */
        architectureVision: {
            profile: [
                { label: 'PPD-21 Classification', value: 'CISA Sector 05 — Dams' },
                { label: 'SRMA', value: 'Department of Homeland Security (CISA)' },
                {
                    label: 'Sub-Sectors',
                    value: `${DAMS_SECTOR.subSectors.length} sub-sectors · ${DAMS_SECTOR.subSectors.reduce((a, s) => a + s.facilities.length, 0)} facility types`,
                },
                {
                    label: 'Equipment Classes',
                    value: `${DAMS_SECTOR.subSectors.reduce((a, s) => a + s.facilities.reduce((b, f) => b + f.equipment.length, 0), 0)} DEXPI 2.0 types`,
                },
                { label: 'Sector Interdependencies', value: 'Energy, Water, Agriculture, Transportation' },
                { label: 'Regulatory Framework', value: 'FERC, USACE, USBR, NID, state dam safety programs' },
            ],
            businessArchitecture: [
                {
                    title: 'Value Chain Analysis',
                    body: 'Watershed management → Reservoir operation & flood control → Hydroelectric generation → Irrigation & water supply → Navigation lock operation → Recreation management. Multi-purpose dams serve 2–5 functions simultaneously within a single impoundment structure.',
                },
                {
                    title: 'Stakeholder Map',
                    body: 'FERC (hydroelectric licensing), U.S. Army Corps of Engineers (flood control), Bureau of Reclamation (irrigation), state dam safety programs, power marketing agencies (BPA, WAPA), local water districts, and downstream communities.',
                },
                {
                    title: 'Architecture Principles',
                    body: 'Dam safety above all: instrumentation-driven monitoring (piezometers, inclinometers, seepage weirs). Defense-in-depth for SCADA controlling spillway gates and turbine governors. Fail-safe gate operation with redundant power and manual overrides.',
                },
                {
                    title: 'Key Standards',
                    body: 'FERC Engineering Guidelines, FEMA P-93/P-94 (dam safety), ICOLD Bulletins, USACE ER 1110-2-1156, IEEE 1010 (hydro), NERC CIP (BES generators), IEC 62443, NIST SP 800-82.',
                },
            ],
            threatLandscape: {
                headline: 'Threat Landscape',
                items: [
                    'Remote SCADA compromise enabling unauthorized spillway gate operation',
                    'Upstream dam failure cascading downstream (domino failure scenario)',
                    'Seismic events causing liquefaction of embankment dam foundations',
                    'Insider manipulation of reservoir levels or gate control parameters',
                    'Climate change: extreme precipitation events exceeding design PMF/PMF inflow',
                ],
                bottomLine: '91,000+ NID dams; 15,600+ classified as high-hazard-potential',
            },
        },

        /* ── Tab 2: Reference Architecture (TOGAF Phase C–D) ────────────── */
        referenceArchitecture: {
            informationSystems: [
                {
                    title: 'Purdue Model (L0–L5)',
                    body: 'L0: Piezometers, seepage weirs, seismic sensors, level gauges. L1: Gate actuator PLCs, turbine governors, protection relays. L2: Dam SCADA HMI, powerhouse DCS. L3: Safety monitoring (DSMS), historian, hydrology forecast. L3.5: DMZ with data diode. L4/L5: Enterprise (FERC reporting, energy market, dam safety portal).',
                },
                {
                    title: 'ISA/IEC 62443 Zones',
                    body: 'Zone 1 (Safety-Critical): Spillway gate controls, flood gates, penstock valves. Zone 2 (Generation): Turbine governors, excitation systems, GSU transformers. Zone 3 (Monitoring): DSMS, piezometer data, seismic monitoring. Zone 4 (Enterprise): FERC compliance, market operations. Conduits enforce air-gap between safety and enterprise.',
                },
                {
                    title: 'Data Flow Patterns',
                    body: 'Piezometric data → dam safety monitoring system (hourly). Gate position → SCADA historian (real-time). Turbine MW/MVAR → EMS/SCADA (sub-second). Hydrological forecast → reservoir operations model (daily). Seismic acceleration → alarm system (event-driven).',
                },
            ],
            technologyArchitecture: [
                {
                    title: 'Protocol Stack',
                    body: 'Application: IEC 61850 (hydro), IEEE C37.118 (synchrophasor). Transport: DNP3, Modbus TCP, IEC 60870-5-104. Network: TCP/IP, RS-485, fiber backbone. Physical: Fiber optic, hardwired 4-20mA, vibrating-wire (piezometers), seismic accelerometers.',
                },
                {
                    title: 'Network Architecture',
                    body: 'Powerhouse LAN (redundant fiber ring), dam instrumentation network (RS-485/fiber), SCADA WAN (VPN/MPLS to dispatch center), remote access via jump server in DMZ. PRP/HSR for protection-critical paths.',
                },
                {
                    title: 'Mechanical Systems',
                    body: 'Spillway gates (radial/crest/roller), penstock/intake valves, Francis/Kaplan/Pelton turbines, synchronous generators (10–800 MW), step-up transformers, draft tube systems, fish passage facilities, navigation locks with miter gates.',
                },
            ],
            engineeringValue: {
                headline: 'Digital Twin Coverage',
                items: [
                    'DEXPI 2.0 equipment model: hydro-mechanical and electrical equipment classes mapped',
                    'Purdue Level coverage: L0 (dam instrumentation) through L4 (FERC reporting)',
                    'Dam safety compliance: FEMA P-93 risk assessment, EAP zone mapping',
                    'Hydrologic modeling: PMF inflow, spillway capacity, reservoir routing',
                    'Structural health: piezometric trend analysis, seepage monitoring, settlement tracking',
                ],
                bottomLine: '4 sub-sectors · 4 facility archetypes · Full dam safety + hydro generation stack',
            },
        },

        /* ── Tabs 3 & 4: Sub-sectors (from data model) ──────────────────── */
        subSectors: DAMS_SECTOR.subSectors.map(sub => ({
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
