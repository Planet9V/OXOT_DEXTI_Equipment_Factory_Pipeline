/**
 * Defense Industrial Base Sector Step Data.
 *
 * Populates the 4-tab SectorStepViewer with Defense Industrial Base sector
 * architecture content, derived from the TOGAF reference architecture and
 * the DEFENSE_SECTOR data model.
 *
 * @module components/wiki/step-data/defense
 */

import { type SectorStepData } from '../SectorStepViewer';
import { DEFENSE_SECTOR } from '@/lib/sectors/infrastructure';

/**
 * Builds the complete step viewer data for the Defense Industrial Base sector.
 *
 * @returns SectorStepData populated with Defense sector architecture,
 *          sub-sectors, facilities, and equipment catalogs.
 */
export function getDefenseStepData(): SectorStepData {
    return {
        name: DEFENSE_SECTOR.name,
        code: DEFENSE_SECTOR.code,
        color: DEFENSE_SECTOR.color,
        srma: DEFENSE_SECTOR.srma,

        /* ── Tab 1: Architecture Vision (TOGAF Phase A–B) ───────────────── */
        architectureVision: {
            profile: [
                { label: 'PPD-21 Classification', value: 'CISA Sector 06 — Defense Industrial Base' },
                { label: 'SRMA', value: 'Department of Defense (DoD)' },
                {
                    label: 'Sub-Sectors',
                    value: `${DEFENSE_SECTOR.subSectors.length} sub-sectors · ${DEFENSE_SECTOR.subSectors.reduce((a, s) => a + s.facilities.length, 0)} facility types`,
                },
                {
                    label: 'Equipment Classes',
                    value: `${DEFENSE_SECTOR.subSectors.reduce((a, s) => a + s.facilities.reduce((b, f) => b + f.equipment.length, 0), 0)} DEXPI 2.0 types`,
                },
                { label: 'Sector Interdependencies', value: 'Energy, Communications, IT, Transportation, Manufacturing' },
                { label: 'Regulatory Framework', value: 'ITAR, EAR, DFARS 252.204-7012, CMMC 2.0, NIST SP 800-171' },
            ],
            businessArchitecture: [
                {
                    title: 'Value Chain Analysis',
                    body: 'R&D and prototyping → Prime contractor manufacturing (platforms, systems) → Sub-tier component fabrication → Test and evaluation → Depot maintenance and sustainment → Demilitarization and disposal. Defense supply chains span 250,000+ companies across all tiers.',
                },
                {
                    title: 'Stakeholder Map',
                    body: 'DoD (Army, Navy, Air Force, DARPA), prime contractors (Lockheed Martin, RTX, Northrop Grumman, Boeing, GD), sub-tier suppliers, DCMA (contract administration), DCSA (security clearances), CISA, and allied nation defense ministries.',
                },
                {
                    title: 'Architecture Principles',
                    body: 'CMMC 2.0 maturity model for cybersecurity. Defense-in-depth for CUI/ITAR data enclaves. Cross-domain solutions for classified-to-unclassified interfaces. Supply chain risk management (SCRM) per NIST SP 800-161.',
                },
                {
                    title: 'Key Standards',
                    body: 'NIST SP 800-171/172 (CUI protection), CMMC 2.0, DFARS 252.204-7012, ITAR (22 CFR 120-130), EAR (15 CFR 730-774), MIL-STD-882E (safety), AS9100D (aerospace QMS), NIST SP 800-53 (federal systems).',
                },
            ],
            threatLandscape: {
                headline: 'Threat Landscape',
                items: [
                    'Nation-state APTs targeting CUI and classified design data (APT10, APT41, Lazarus)',
                    'Supply chain infiltration through sub-tier component counterfeit and tampering',
                    'Insider threats from cleared personnel with access to weapons system data',
                    'IP theft via compromised engineering workstations and PLM/PDM systems',
                    'OT compromise of CNC machines and test equipment to degrade weapons quality',
                ],
                bottomLine: 'DoD reports $600B+ annual losses from IP theft across the defense industrial base',
            },
        },

        /* ── Tab 2: Reference Architecture (TOGAF Phase C–D) ────────────── */
        referenceArchitecture: {
            informationSystems: [
                {
                    title: 'Purdue Model (L0–L5)',
                    body: 'L0: CNC sensors, metrology instruments, test fixtures. L1: CNC machine controllers, robot arms, welding systems. L2: Cell controllers, HMI, work cell SCADA. L3: MES, PLM, QMS, ERP shop floor. L3.5: CUI enclave DMZ, cross-domain solution. L4/L5: Enterprise ERP, prime contractor portals, DoD DIBNET.',
                },
                {
                    title: 'Security Enclaves',
                    body: 'CUI Enclave: NIST 800-171 compliant network for controlled unclassified information. Classified Enclave: DCSA-accredited space with TEMPEST shielding. OT Network: Air-gapped or data-diode-connected manufacturing floor. Enterprise IT: Standard corporate network with CMMC L2 controls.',
                },
                {
                    title: 'Data Flow Patterns',
                    body: 'CAD/CAM files → encrypted transfer to CNC (CUI enclave). Test data → QMS → prime contractor portal. Supply chain data → SCRM system → DIBNET reporting. Cleared personnel → DCSA e-QIP → continuous vetting. Vulnerability data → ACAS scan → POA&M tracking.',
                },
            ],
            technologyArchitecture: [
                {
                    title: 'Protocol Stack',
                    body: 'Application: MTConnect, OPC UA, STEP AP 203/214, IGES. Transport: TCP/TLS, IPsec VPN. Network: Ethernet, 802.11 (WPA3-Enterprise). Link: Fiber, Cat6A, serial RS-232 (legacy CNC). Physical: TEMPEST-rated cabling, shielded enclosures, Faraday rooms.',
                },
                {
                    title: 'Network Architecture',
                    body: 'Segmented by classification: air-gapped classified, CUI enclave with FIPS 140-3 encryption, OT manufacturing network, corporate IT. Cross-domain solutions (CDS) for controlled data transfer. SIEM aggregation across all enclaves. Zero-trust micro-segmentation.',
                },
                {
                    title: 'Manufacturing Systems',
                    body: '5-axis CNC machining centers, additive manufacturing (L-PBF, DED), composite layup (AFP/ATL), non-destructive testing (CT, ultrasonic, radiographic), environmental testing (vibration, thermal vacuum, EMI/EMC), ballistic testing ranges.',
                },
            ],
            engineeringValue: {
                headline: 'Digital Twin Coverage',
                items: [
                    'DEXPI 2.0 equipment model: defense manufacturing equipment classes mapped',
                    'Purdue Level coverage: L0 (sensors) through L4 (DoD enterprise) with CUI enclave model',
                    'CMMC compliance mapping: 110 practices across 14 domains with evidence collection',
                    'Supply chain risk: SCRM scoring, CFIUS screening, counterfeit detection',
                    'Threat modeling: MITRE ATT&CK for ICS mapped to defense manufacturing scenarios',
                ],
                bottomLine: '4 sub-sectors · 4 facility archetypes · Full CUI/classified enclave model',
            },
        },

        /* ── Tabs 3 & 4: Sub-sectors (from data model) ──────────────────── */
        subSectors: DEFENSE_SECTOR.subSectors.map(sub => ({
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
