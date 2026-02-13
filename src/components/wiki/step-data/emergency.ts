/**
 * Emergency Services Sector Step Data.
 *
 * Populates the 4-tab SectorStepViewer with Emergency Services sector
 * architecture content, derived from the TOGAF reference architecture
 * and the EMERGENCY_SECTOR data model.
 *
 * @module components/wiki/step-data/emergency
 */

import { type SectorStepData, type SectorSummary } from '../SectorStepViewer';
import { EMERGENCY_SECTOR } from '@/lib/sectors/services';

/**
 * Builds the complete step viewer data for the Emergency Services sector.
 *
 * @returns SectorStepData populated with Emergency Services architecture,
 *          sub-sectors, facilities, and equipment catalogs.
 */
export function getEmergencyStepData(): SectorStepData {
    return {
        name: EMERGENCY_SECTOR.name,
        code: EMERGENCY_SECTOR.code,
        color: EMERGENCY_SECTOR.color,
        srma: EMERGENCY_SECTOR.srma,

        /* ── Tab 1: Architecture Vision (TOGAF Phase A–B) ───────────────── */
        architectureVision: {
            profile: [
                { label: 'PPD-21 Classification', value: 'CISA Sector 07 — Emergency Services' },
                { label: 'SRMA', value: 'Department of Homeland Security (CISA)' },
                {
                    label: 'Sub-Sectors',
                    value: `${EMERGENCY_SECTOR.subSectors.length} sub-sectors · ${EMERGENCY_SECTOR.subSectors.reduce((a, s) => a + s.facilities.length, 0)} facility types`,
                },
                {
                    label: 'Equipment Classes',
                    value: `${EMERGENCY_SECTOR.subSectors.reduce((a, s) => a + s.facilities.reduce((b, f) => b + f.equipment.length, 0), 0)} DEXPI 2.0 types`,
                },
                { label: 'Sector Interdependencies', value: 'Communications, Energy, Transportation, Healthcare' },
                { label: 'Regulatory Framework', value: 'NFPA 1221/1801, FCC Part 90, NIMS/ICS, SAFECOM' },
            ],
            businessArchitecture: [
                {
                    title: 'Value Chain Analysis',
                    body: 'Prevention & preparedness → Detection & alerting (911/NG911) → Dispatch & resource allocation (CAD) → Response & on-scene operations → Recovery & after-action review. Mutual aid agreements extend capacity across jurisdictions.',
                },
                {
                    title: 'Stakeholder Map',
                    body: 'Fire departments (36,000+ US), law enforcement agencies (18,000+), EMS providers (21,000+), 911 PSAPs (6,500+), emergency management agencies (state/local), FEMA, SAFECOM, NPSTC, and FirstNet Authority.',
                },
                {
                    title: 'Architecture Principles',
                    body: 'Life-safety response within golden hour windows. Mission-critical voice: 99.999% availability on P25/FirstNet. Interoperability across disciplines (fire, law, EMS) and jurisdictions. NIMS/ICS command structure for multi-agency coordination.',
                },
                {
                    title: 'Key Standards',
                    body: 'NFPA 1221 (dispatch centers), NFPA 1801 (thermal imaging), P25 (APCO/TIA-102), FirstNet (Band 14), NENA i3 (NG911), CJIS Security Policy, NIMS, SAFECOM Interoperability Continuum.',
                },
            ],
            threatLandscape: {
                headline: 'Threat Landscape',
                items: [
                    'NG911/PSAP system compromise: TDoS (telephony denial-of-service) and swatting attacks',
                    'CAD system ransomware disrupting dispatch and resource tracking',
                    'P25 radio interception and jamming during active incidents',
                    'Body-worn camera and RMS data exfiltration (CJIS-sensitive)',
                    'GPS spoofing affecting apparatus routing and AVL systems',
                ],
                bottomLine: 'CISA rates Emergency Services as foundational to all other sector resilience',
            },
        },

        /* ── Tab 2: Reference Architecture (TOGAF Phase C–D) ────────────── */
        referenceArchitecture: {
            informationSystems: [
                {
                    title: 'Purdue Model (L0–L5)',
                    body: 'L0: Sensors (smoke detectors, seismic, weather, gunshot detection). L1: Fire alarm panels, traffic preemption, radio base stations. L2: CAD workstations, dispatch consoles, mapping displays. L3: RMS, CAD server, NG911 ESRP, GIS. L3.5: CJIS DMZ, FirstNet gateway. L4/L5: Enterprise (HR, fleet management, analytics, mutual aid portals).',
                },
                {
                    title: 'Operational Zones',
                    body: 'Zone 1 (Field): Mobile radios, MDTs, BWCs, apparatus sensors. Zone 2 (Dispatch): PSAP consoles, CAD, ANI/ALI, mapping. Zone 3 (Station): Alerting systems, BAI, SCBA fill, apparatus bay. Zone 4 (Enterprise): RMS, training records, fleet, CJIS. Conduits enforce CJIS Security Policy segmentation.',
                },
                {
                    title: 'Data Flow Patterns',
                    body: '911 call → NG911 ESInet → PSAP → CAD dispatch → MDT/radio. AVL GPS → CAD (real-time). BWC video → evidence.com/DEMS (post-incident). CAD → NFIRS/NIBRS reporting. Mutual aid → CAD-to-CAD via NIEM/CAP.',
                },
            ],
            technologyArchitecture: [
                {
                    title: 'Protocol Stack',
                    body: 'Application: NENA i3 (SIP/PIDF-LO), CAP (alerting), NIEM (data exchange). Transport: P25 ISSI/CSSI, FirstNet LTE Band 14, TETRA. Network: IP/MPLS, ESInet, RoIP. Physical: VHF/UHF (150/450 MHz), 700/800 MHz, Band 14 (758-768 MHz), microwave backhaul.',
                },
                {
                    title: 'Network Architecture',
                    body: 'P25 Phase II trunked radio (TDMA), FirstNet LTE overlay (MCPTT), ESInet for NG911 call routing, station alerting IP network, inter-agency ISSI bridges. Simulcast for wide-area coverage, tower-site redundancy with generator/battery backup.',
                },
                {
                    title: 'Mission-Critical Systems',
                    body: 'CAD (computer-aided dispatch), RMS (records management), NG911 PSAP, P25 radio infrastructure, FirstNet MCPTT, station alerting, SCBA fill systems, mobile data terminals, body-worn cameras, drone/UAS platforms, thermal imaging cameras.',
                },
            ],
            engineeringValue: {
                headline: 'Digital Twin Coverage',
                items: [
                    'DEXPI 2.0 equipment model: public safety equipment classes (apparatus, radio, PSAP)',
                    'Purdue Level coverage: L0 (field sensors) through L4 (enterprise RMS) with CJIS compliance',
                    'Radio coverage modeling: P25 propagation, FirstNet Band 14, in-building penetration',
                    'Response time modeling: AVL-based apparatus routing, station coverage analysis',
                    'Interoperability matrix: P25 ISSI/CSSI talkgroup mapping across agencies',
                ],
                bottomLine: '4 sub-sectors · 4 facility archetypes · Full P25/FirstNet/NG911 stack',
            },
        },

        /* ── Tabs 3 & 4: Sub-sectors (from data model) ──────────────────── */
        subSectors: EMERGENCY_SECTOR.subSectors.map(sub => ({
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
 * Returns a lightweight summary of the Emergency sector for the hub page.
 */
export function getEmergencySummary(): SectorSummary {
    const data = getEmergencyStepData();
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
