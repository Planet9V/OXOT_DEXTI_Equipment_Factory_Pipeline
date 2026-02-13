/**
 * Transportation Sector Step Data.
 *
 * @module components/wiki/step-data/transportation
 */

import { type SectorStepData } from '../SectorStepViewer';
import { TRANSPORTATION_SECTOR } from '@/lib/sectors/transportation';

/**
 * Builds the complete step viewer data for the Transportation sector.
 *
 * @returns SectorStepData for Transportation Systems.
 */
export function getTransportationStepData(): SectorStepData {
    return {
        name: TRANSPORTATION_SECTOR.name,
        code: TRANSPORTATION_SECTOR.code,
        color: TRANSPORTATION_SECTOR.color,
        srma: TRANSPORTATION_SECTOR.srma,

        architectureVision: {
            profile: [
                { label: 'PPD-21 Classification', value: 'CISA Sector 15 — Transportation Systems' },
                { label: 'SRMA', value: 'DHS / Department of Transportation (DOT)' },
                {
                    label: 'Sub-Sectors',
                    value: `${TRANSPORTATION_SECTOR.subSectors.length} sub-sectors · ${TRANSPORTATION_SECTOR.subSectors.reduce((a, s) => a + s.facilities.length, 0)} facility types`,
                },
                {
                    label: 'Equipment Classes',
                    value: `${TRANSPORTATION_SECTOR.subSectors.reduce((a, s) => a + s.facilities.reduce((b, f) => b + f.equipment.length, 0), 0)} DEXPI 2.0 types`,
                },
                { label: 'Sector Interdependencies', value: 'Energy, Communications, IT, Chemical, Water' },
                { label: 'Regulatory Framework', value: 'TSA SD, 49 CFR, FAA, FRA, USCG MTSA, FMCSA' },
            ],
            businessArchitecture: [
                {
                    title: 'Value Chain Analysis',
                    body: 'Aviation (ATC, airport ops) → Maritime (ports, vessel traffic) → Rail (freight, passenger, signal) → Highway/motor carrier → Pipeline (gas/liquid) → Public transit (metro, bus). Multimodal interchanges.',
                },
                {
                    title: 'Stakeholder Map',
                    body: 'TSA, DOT, FAA, FRA, FMCSA, USCG, AASHTO, AAR, ACI-NA, port authorities, transit agencies (WMATA, MTA, BART), OEMs (Wabtec, Siemens Mobility, Alstom).',
                },
                {
                    title: 'Architecture Principles',
                    body: 'Fail-safe signaling per CENELEC EN 50126/50128/50129. Positive train control (PTC) per 49 CFR 236. ICAO/EUROCONTROL standards for ATC. ISPS Code for port security.',
                },
                {
                    title: 'Key Standards',
                    body: 'TSA Security Directives (SD), 49 CFR 236 (PTC), CENELEC EN 50126/8/9, IEC 62278/80, ARINC 653/664, DO-178C (avionics), NIST SP 800-82, ISO 27001.',
                },
            ],
            threatLandscape: {
                headline: 'Threat Landscape',
                items: [
                    'APTs targeting rail signaling (PTC) and maritime navigation (AIS spoofing)',
                    'Ransomware disrupting port operations, airline ticketing, and transit fare systems',
                    'GPS/GNSS jamming and spoofing affecting aviation, maritime, and autonomous vehicles',
                    'Airport SCADA attacks: baggage handling, HVAC, fuel systems, runway lighting',
                    'Supply chain: compromised embedded controllers in signaling and ATC systems',
                ],
                bottomLine: 'TSA Security Directives now mandate cyber plans for rail, aviation, and pipeline',
            },
        },

        referenceArchitecture: {
            informationSystems: [
                {
                    title: 'Purdue Model (L0–L5)',
                    body: 'L0: Track circuits, axle counters, switches, signals, ADS-B transponders. L1: Signal controllers, interlocking relays, PLC-based wayside units. L2: CTC/SCADA, ATC radar processing. L3: Dispatch center, TMS, ATC center. L3.5: DMZ. L4/L5: Reservation, scheduling, enterprise.',
                },
                {
                    title: 'Safety Integrity Levels',
                    body: 'SIL 4: Rail signaling (interlocking, ATP). SIL 3: Level crossings, PTC enforcement. SIL 2: Station platform screen doors. Aviation: DAL A–E per DO-178C. Maritime: IEC 61162 bridge equipment.',
                },
                {
                    title: 'Data Flow Patterns',
                    body: 'Rail: Balise → onboard ATP → RBC (ERTMS). Aviation: Radar → ATC FDPS → SWIM. Maritime: AIS → VTS → port community system. Highway: ITS detectors → TMC → traveler info (NTCIP).',
                },
            ],
            technologyArchitecture: [
                {
                    title: 'Protocol Stack',
                    body: 'Application: ERTMS/ETCS, ADS-B, AIS, NTCIP. Transport: railway-specific (Euroradio, GSM-R/FRMCS), TCP/IP. Network: fiber backbone, LTE/5G trackside, VHF/UHF (aviation). Physical: track circuits, fiber, copper, wireless.',
                },
                {
                    title: 'Network Architecture',
                    body: 'Rail: wayside fiber backbone → station Ethernet → onboard consist network. Aviation: ATC center → radar/nav aids → aircraft datalinks. Maritime: port OT network → VTS → shore-to-ship. All: dual-redundant core with geographic diversity.',
                },
                {
                    title: 'Control Systems',
                    body: 'Rail: Siemens Westrace/Trackguard, Alstom Smartlock, Hitachi ATOS. Aviation: Thales TopSky, Raytheon STARS, Leidos TFDM. Maritime: Kongsberg VTS, Wärtsilä SAM. Transit: ATC/ATO systems (Thales SelTrac, Siemens Trainguard).',
                },
            ],
            engineeringValue: {
                headline: 'Digital Twin Coverage',
                items: [
                    'DEXPI 2.0 model: signaling equipment, PTC, ATC, port cranes, tunnel ventilation',
                    'SIL 4 safety case modeling per CENELEC EN 50129 for signal interlocking',
                    'TSA SD compliance: automated assessment of cyber security measures',
                    'Multimodal threat propagation: cross-sector attack chain analysis',
                    'Graph ontology: CVE ↔ transport equipment ↔ operational disruption modeling',
                ],
                bottomLine: '91% equipment coverage · 7 facility archetypes · Full signaling model',
            },
        },

        subSectors: TRANSPORTATION_SECTOR.subSectors.map(sub => ({
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
