/**
 * Water Sector Step Data.
 *
 * @module components/wiki/step-data/water
 */

import { type SectorStepData, type SectorSummary } from '../SectorStepViewer';
import { WATER_SECTOR } from '@/lib/sectors/water';

/**
 * Builds the complete step viewer data for the Water sector.
 *
 * @returns SectorStepData for Water and Wastewater Systems.
 */
export function getWaterStepData(): SectorStepData {
    return {
        name: WATER_SECTOR.name,
        code: WATER_SECTOR.code,
        color: WATER_SECTOR.color,
        srma: WATER_SECTOR.srma,

        architectureVision: {
            profile: [
                { label: 'PPD-21 Classification', value: 'CISA Sector 16 — Water and Wastewater Systems' },
                { label: 'SRMA', value: 'Environmental Protection Agency (EPA)' },
                {
                    label: 'Sub-Sectors',
                    value: `${WATER_SECTOR.subSectors.length} sub-sectors · ${WATER_SECTOR.subSectors.reduce((a, s) => a + s.facilities.length, 0)} facility types`,
                },
                {
                    label: 'Equipment Classes',
                    value: `${WATER_SECTOR.subSectors.reduce((a, s) => a + s.facilities.reduce((b, f) => b + f.equipment.length, 0), 0)} DEXPI 2.0 types`,
                },
                { label: 'Sector Interdependencies', value: 'Energy, Chemical, Transportation, Dams' },
                { label: 'Regulatory Framework', value: 'SDWA, CWA, AWIA 2018, EPA WIIN Act, NIST CSF' },
            ],
            businessArchitecture: [
                {
                    title: 'Value Chain Analysis',
                    body: 'Source water intake → Treatment (coagulation, flocculation, sedimentation, filtration, disinfection) → Storage → Distribution → Consumer delivery → Wastewater collection → WWTP treatment → Effluent discharge/reuse.',
                },
                {
                    title: 'Stakeholder Map',
                    body: 'EPA, AWWA (American Water Works Association), state primacy agencies, municipal utilities, investor-owned utilities, CISA, WaterISAC, equipment OEMs (Xylem, Hach, SUEZ, Veolia).',
                },
                {
                    title: 'Architecture Principles',
                    body: 'SCADA-centric with RTU-based remote sites. Redundant communication paths (radio, cellular, fiber). Chemical dosing under closed-loop control. AWIA 2018 risk/resilience mandate.',
                },
                {
                    title: 'Key Standards',
                    body: 'AWWA J100 (risk management), NIST SP 800-82, IEC 62443, AWWA G430 (cybersecurity), EPA SDWA compliance, 40 CFR (wastewater discharge permits).',
                },
            ],
            threatLandscape: {
                headline: 'Threat Landscape',
                items: [
                    'APTs targeting SCADA/HMI at water treatment plants (Oldsmar FL incident, 2021)',
                    'Ransomware disrupting billing systems and SCADA historians',
                    'Chemical dosing attacks: sodium hydroxide, chlorine injection levels',
                    'Insecure remote access: VNC/RDP exposed on small/medium utilities',
                    'Supply chain: compromised PLC firmware from OEM update channels',
                ],
                bottomLine: 'EPA mandates AWIA risk assessments for systems serving 3,300+ people',
            },
        },

        referenceArchitecture: {
            informationSystems: [
                {
                    title: 'Purdue Model (L0–L5)',
                    body: 'L0: Flow meters, pH probes, turbidimeters, chlorine analyzers. L1: RTUs, PLCs (Allen-Bradley, Schneider). L2: HMI, local SCADA. L3: Central SCADA, historian, CMMS, GIS. L3.5: DMZ. L4/L5: Enterprise IT, billing (CIS), regulatory reporting.',
                },
                {
                    title: 'ISA/IEC 62443 Zones',
                    body: 'Zone 1 (Safety): Chemical feed interlocks, high-level shutoffs. Zone 2 (Control): PLCs, RTUs, VFDs. Zone 3 (Supervision): SCADA master station, historian. Zone 4 (Enterprise): GIS, CMMS, billing, customer portal.',
                },
                {
                    title: 'Data Flow Patterns',
                    body: 'Process: 4–20mA → RTU → SCADA (DNP3/Modbus). Telemetry: radio (900MHz), cellular, fiber backhaul. GIS/hydraulic model integration. LCRR compliance reporting. Consumer confidence reports.',
                },
            ],
            technologyArchitecture: [
                {
                    title: 'Protocol Stack',
                    body: 'Application: DNP3 over TCP/IP, Modbus TCP, OPC UA. Transport: Serial (RS-232/485), Ethernet. Network: Licensed radio (VHF/UHF, 900MHz), cellular (4G/LTE), fiber. Physical: twisted pair, coax, fiber, wireless.',
                },
                {
                    title: 'Network Architecture',
                    body: 'Hub-and-spoke: central SCADA master → remote RTU sites via radio/cellular WAN. Distribution system monitoring via AMI mesh network. Pump station networks on separate VLANs. Backup dial-up or satellite links.',
                },
                {
                    title: 'Control Systems',
                    body: 'SCADA (GE iFIX, Ignition, VTScada, Wonderware), PLCs (Allen-Bradley CompactLogix, Schneider M340), RTUs (Motorola ACE3600, Schneider SCADAPack), analyzers (Hach, YSI, Endress+Hauser).',
                },
            ],
            engineeringValue: {
                headline: 'Digital Twin Coverage',
                items: [
                    'DEXPI 2.0 mapping: pumps, valves, chemical feed systems, clarifiers, filters, disinfection',
                    'Hydraulic model integration: pressure zones, fire flow, system demand profiles',
                    'AWIA compliance: automated risk/resilience assessment per EPA requirements',
                    'AMI/SCADA convergence: smart meter → distribution SCADA correlation',
                    'Graph ontology: CVE ↔ RTU/PLC firmware ↔ vendor advisory tracking',
                ],
                bottomLine: '90% equipment coverage · 5 facility archetypes · Full SCADA modeling',
            },
        },

        subSectors: WATER_SECTOR.subSectors.map(sub => ({
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
 * Returns a lightweight summary of the Water sector for the hub page.
 */
export function getWaterSummary(): SectorSummary {
    const data = getWaterStepData();
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
