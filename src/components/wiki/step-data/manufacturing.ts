/**
 * Critical Manufacturing Sector Step Data.
 *
 * @module components/wiki/step-data/manufacturing
 */

import { type SectorStepData } from '../SectorStepViewer';
import { MANUFACTURING_SECTOR } from '@/lib/sectors/manufacturing';

/**
 * Builds the complete step viewer data for the Critical Manufacturing sector.
 *
 * @returns SectorStepData for Critical Manufacturing.
 */
export function getManufacturingStepData(): SectorStepData {
    return {
        name: MANUFACTURING_SECTOR.name,
        code: MANUFACTURING_SECTOR.code,
        color: MANUFACTURING_SECTOR.color,
        srma: MANUFACTURING_SECTOR.srma,

        architectureVision: {
            profile: [
                { label: 'PPD-21 Classification', value: 'CISA Sector 04 — Critical Manufacturing' },
                { label: 'SRMA', value: 'Department of Homeland Security (DHS/CISA)' },
                {
                    label: 'Sub-Sectors',
                    value: `${MANUFACTURING_SECTOR.subSectors.length} sub-sectors · ${MANUFACTURING_SECTOR.subSectors.reduce((a, s) => a + s.facilities.length, 0)} facility types`,
                },
                {
                    label: 'Equipment Classes',
                    value: `${MANUFACTURING_SECTOR.subSectors.reduce((a, s) => a + s.facilities.reduce((b, f) => b + f.equipment.length, 0), 0)} DEXPI 2.0 types`,
                },
                { label: 'Sector Interdependencies', value: 'Energy, Transportation, Chemical, IT, Defense' },
                { label: 'Regulatory Framework', value: 'OSHA, EPA, NIST MEP, ITAR/EAR, ISO 9001/14001' },
            ],
            businessArchitecture: [
                {
                    title: 'Value Chain Analysis',
                    body: 'Raw materials → Primary metals (steel, aluminum) → Machinery and engine manufacturing → Electrical equipment → Transportation equipment (automotive, aerospace) → Finished goods. Discrete and process manufacturing.',
                },
                {
                    title: 'Stakeholder Map',
                    body: 'NAM (National Association of Manufacturers), NIST MEP, DOD (ITAR), OEMs (GM, Boeing, Caterpillar, John Deere), automation vendors (Rockwell, Siemens, Fanuc, ABB).',
                },
                {
                    title: 'Architecture Principles',
                    body: 'ISA-95 enterprise-control integration. CNC and robotics with real-time deterministic control. MES-driven production scheduling. Industry 4.0 / IIoT edge computing architecture.',
                },
                {
                    title: 'Key Standards',
                    body: 'ISA-95, IEC 62443, NIST SP 800-82, ISO 9001, AS9100 (aerospace), IATF 16949 (automotive), MTConnect, OPC UA, ANSI/RIA R15.06 (robotics safety).',
                },
            ],
            threatLandscape: {
                headline: 'Threat Landscape',
                items: [
                    'Nation-state IP theft targeting defense and aerospace manufacturing systems',
                    'Ransomware shutting down MES/ERP and halting production lines',
                    'CNC machine manipulation via G-code injection for sabotage or quality defects',
                    'Robotics exploitation: unauthorized trajectory changes, safety zone bypass',
                    'Supply chain: counterfeit components, firmware tampering in PLCs and drives',
                ],
                bottomLine: 'Manufacturing accounts for 25% of all ICS-targeted ransomware incidents',
            },
        },

        referenceArchitecture: {
            informationSystems: [
                {
                    title: 'Purdue Model (L0–L5)',
                    body: 'L0: Sensors, actuators, servo drives, vision systems. L1: PLCs, CNC controllers, robot controllers. L2: HMI, SCADA, cell controllers. L3: MES, historian, quality management (QMS). L3.5: DMZ. L4/L5: ERP (SAP), PLM (Siemens Teamcenter), SCM.',
                },
                {
                    title: 'ISA/IEC 62443 Zones',
                    body: 'Zone 1 (Safety): E-stop circuits, light curtains, safety PLCs (SIL 3). Zone 2 (Control): CNC, robot controllers, PLCs, VFDs. Zone 3 (Supervision): MES, SCADA, QMS. Zone 4 (Enterprise): ERP, PLM, CAD/CAM.',
                },
                {
                    title: 'Data Flow Patterns',
                    body: 'ISA-95 B2MML: ERP → MES work orders. MTConnect: CNC → monitoring. OPC UA: PLC → historian. Vision: camera → quality inspection AI. CAD/CAM → CNC post-processor → G-code download.',
                },
            ],
            technologyArchitecture: [
                {
                    title: 'Protocol Stack',
                    body: 'Application: OPC UA, MTConnect, EtherNet/IP, PROFINET. Transport: TCP/IP, TSN (Time-Sensitive Networking). Network: Industrial Ethernet, PROFINET IRT, EtherCAT. Physical: Cat6A/fiber, industrial connectors (M12).',
                },
                {
                    title: 'Network Architecture',
                    body: 'Cell-level switches per manufacturing cell. Plant backbone with managed Layer 3 switches. TSN for deterministic motion control. Edge computing gateways for IIoT analytics. DMZ with OPC UA aggregation server.',
                },
                {
                    title: 'Control Systems',
                    body: 'PLCs (Rockwell ControlLogix, Siemens S7-1500, Beckhoff TwinCAT), CNC (Fanuc, Siemens SINUMERIK, Haas), Robots (FANUC, ABB, KUKA), MES (Siemens SIMATIC IT, Rockwell Plex, DELMIA Apriso).',
                },
            ],
            engineeringValue: {
                headline: 'Digital Twin Coverage',
                items: [
                    'DEXPI 2.0 equipment model: CNC, robot cells, conveyors, presses, furnaces, AGV/AMR',
                    'ISA-95 Level 3 MES integration: work order → cell → equipment mapping',
                    'MTConnect streaming: real-time machine utilization and OEE calculation',
                    'Robotic cell safety zone modeling per ANSI/RIA R15.06',
                    'Graph ontology: CVE ↔ CNC firmware ↔ production impact analysis',
                ],
                bottomLine: '93% equipment coverage · 5 facility archetypes · Full ISA-95 modeling',
            },
        },

        subSectors: MANUFACTURING_SECTOR.subSectors.map(sub => ({
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
