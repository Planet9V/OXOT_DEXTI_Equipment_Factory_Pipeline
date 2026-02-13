/**
 * Government Facilities Sector Step Data.
 *
 * Populates the 4-tab SectorStepViewer with Government Facilities sector
 * architecture content, derived from the TOGAF reference architecture
 * and the GOVERNMENT_SECTOR data model.
 *
 * @module components/wiki/step-data/government
 */

import { type SectorStepData } from '../SectorStepViewer';
import { GOVERNMENT_SECTOR } from '@/lib/sectors/services';

/**
 * Builds the complete step viewer data for the Government Facilities sector.
 *
 * @returns SectorStepData populated with Government Facilities architecture,
 *          sub-sectors, facilities, and equipment catalogs.
 */
export function getGovernmentStepData(): SectorStepData {
    return {
        name: GOVERNMENT_SECTOR.name,
        code: GOVERNMENT_SECTOR.code,
        color: GOVERNMENT_SECTOR.color,
        srma: GOVERNMENT_SECTOR.srma,

        /* ── Tab 1: Architecture Vision (TOGAF Phase A–B) ───────────────── */
        architectureVision: {
            profile: [
                { label: 'PPD-21 Classification', value: 'CISA Sector 09 — Government Facilities' },
                { label: 'SRMA', value: 'DHS (CISA) & General Services Administration (GSA)' },
                {
                    label: 'Sub-Sectors',
                    value: `${GOVERNMENT_SECTOR.subSectors.length} sub-sectors · ${GOVERNMENT_SECTOR.subSectors.reduce((a, s) => a + s.facilities.length, 0)} facility types`,
                },
                {
                    label: 'Equipment Classes',
                    value: `${GOVERNMENT_SECTOR.subSectors.reduce((a, s) => a + s.facilities.reduce((b, f) => b + f.equipment.length, 0), 0)} DEXPI 2.0 types`,
                },
                { label: 'Sector Interdependencies', value: 'Energy, Water, Communications, IT, Transportation' },
                { label: 'Regulatory Framework', value: 'FISMA, FedRAMP, HSPD-12, ISC, NIST SP 800-53' },
            ],
            businessArchitecture: [
                {
                    title: 'Value Chain Analysis',
                    body: 'Facility acquisition (GSA/DoD) → Design & construction (LEED/ISC standards) → Operations & maintenance → Physical security & access control → IT/OT convergence → Decommissioning. Federal portfolio: 400,000+ buildings, 3.4 billion sq ft.',
                },
                {
                    title: 'Stakeholder Map',
                    body: 'GSA (civilian buildings), DoD (military installations), DOE (national laboratories), FBI/Secret Service (law enforcement), ISC (Interagency Security Committee), CISA, state/local government facility managers, and tribal authorities.',
                },
                {
                    title: 'Architecture Principles',
                    body: 'ISC facility security levels (FSL I–V) drive physical protection requirements. FISMA/NIST RMF for IT systems. FedRAMP for cloud services. HSPD-12/PIV for identity management. Antiterrorism/force protection (AT/FP) for DoD facilities.',
                },
                {
                    title: 'Key Standards',
                    body: 'NIST SP 800-53/171, FISMA, FedRAMP, ISC Design Criteria, UFC 4-010-01 (AT/FP), HSPD-12 (PIV), GSA P100, ASHRAE 189.1, LEED v4.1, ICD 705 (SCIFs), TEMPEST/CNSSAM standards.',
                },
            ],
            threatLandscape: {
                headline: 'Threat Landscape',
                items: [
                    'Vehicle-borne IED attacks and active shooter scenarios at government buildings',
                    'State-sponsored cyber intrusions targeting classified networks and PII',
                    'Insider threat from cleared/privileged personnel with physical and logical access',
                    'BMS/HVAC exploitation for chem/bio agent distribution or data exfiltration',
                    'Social engineering targeting government employees for credential harvesting',
                ],
                bottomLine: 'DHS rates federal facilities as high-value targets requiring ISC FSL III–V protection',
            },
        },

        /* ── Tab 2: Reference Architecture (TOGAF Phase C–D) ────────────── */
        referenceArchitecture: {
            informationSystems: [
                {
                    title: 'Purdue Model (L0–L5)',
                    body: 'L0: HVAC sensors, access control readers, CCTV cameras, CBRN detectors. L1: DDC controllers, fire alarm panels, elevator controllers. L2: BMS operator workstations, PSIM command center. L3: CMMS, energy management, security operations center. L3.5: IT/OT DMZ, HBSS boundary. L4/L5: Federal IT (TIC, CDM, .gov cloud, JWICS/SIPRNet/NIPRNet).',
                },
                {
                    title: 'Security Enclaves',
                    body: 'Unclassified (NIPRNet/public-facing): TIC 3.0 protected. CUI Enclave: NIST 800-171 controls. Classified (SIPRNet): DISA-accredited. TS/SCI (JWICS): ICD 705 SCIF standards. Building OT: Air-gapped BMS/HVAC/fire. Physical Security: PSIM/PACS on dedicated VLAN.',
                },
                {
                    title: 'Data Flow Patterns',
                    body: 'PIV badge tap → PACS → audit log. BMS telemetry → historian → GSA energy dashboard. CCTV → NVR → PSIM analytics. CDM sensors → CISA dashboard. Incident reports → NIST IR workflow. Classified data → cross-domain solution → unclassified summary.',
                },
            ],
            technologyArchitecture: [
                {
                    title: 'Protocol Stack',
                    body: 'Application: BACnet/SC (BMS), ONVIF (CCTV), OSDP (access control), SAML/OIDC (identity). Transport: TLS 1.3, IPsec, Modbus TCP. Network: IPv6 (USGv6), MPLS (WAN). Physical: Fiber, Cat6A, PoE++, PIV smartcard (FIPS 201).',
                },
                {
                    title: 'Network Architecture',
                    body: 'TIC 3.0 architecture with MTIPS/TICAP gateways. CDM program sensors on all endpoints. SD-WAN for campus connectivity. Dedicated OT network for BMS (VLAN-segmented). TEMPEST-shielded areas for classified processing. Zero-trust architecture per EO 14028.',
                },
                {
                    title: 'Facility Systems',
                    body: 'Central plant (chillers, boilers, generators), PACS (turnstiles, mantraps, barriers), CCTV (PTZ, analytics), fire alarm/suppression, elevator monitoring, parking management, mail screening (X-ray, trace detection), CBRN sensors.',
                },
            ],
            engineeringValue: {
                headline: 'Digital Twin Coverage',
                items: [
                    'DEXPI 2.0 equipment model: federal building systems mapped to GSA P100 specifications',
                    'Purdue Level coverage: L0 (sensors) through L4 (federal IT/TIC) with enclave segmentation',
                    'ISC compliance: FSL assessment, blast standoff calculation, progressive collapse analysis',
                    'Energy optimization: GSA portfolio-wide benchmarking, ASHRAE 36 sequence verification',
                    'Physical security: PACS topology, camera coverage analysis, ISC countermeasure mapping',
                ],
                bottomLine: '4 sub-sectors · 4 facility archetypes · Full FISMA/ISC/HSPD-12 stack',
            },
        },

        /* ── Tabs 3 & 4: Sub-sectors (from data model) ──────────────────── */
        subSectors: GOVERNMENT_SECTOR.subSectors.map(sub => ({
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
