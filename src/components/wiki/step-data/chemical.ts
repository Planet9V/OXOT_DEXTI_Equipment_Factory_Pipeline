/**
 * Chemical Sector Step Data.
 *
 * Populates the 4-tab SectorStepViewer with Chemical sector architecture
 * content, extracted from TOGAF reference architecture and CHEMICAL_SECTOR data.
 *
 * @module components/wiki/step-data/chemical
 */

import { type SectorStepData, type SectorSummary } from '../SectorStepViewer';
import { CHEMICAL_SECTOR } from '@/lib/sectors/chemical';

/**
 * Builds the complete step viewer data for the Chemical sector.
 *
 * @returns SectorStepData for Chemical sector.
 */
export function getChemicalStepData(): SectorStepData {
    return {
        name: CHEMICAL_SECTOR.name,
        code: CHEMICAL_SECTOR.code,
        color: CHEMICAL_SECTOR.color,
        srma: CHEMICAL_SECTOR.srma,

        architectureVision: {
            profile: [
                { label: 'PPD-21 Classification', value: 'CISA Sector 01 — Chemical' },
                { label: 'SRMA', value: 'Department of Homeland Security (DHS/CISA)' },
                {
                    label: 'Sub-Sectors',
                    value: `${CHEMICAL_SECTOR.subSectors.length} sub-sectors · ${CHEMICAL_SECTOR.subSectors.reduce((a, s) => a + s.facilities.length, 0)} facility types`,
                },
                {
                    label: 'Equipment Classes',
                    value: `${CHEMICAL_SECTOR.subSectors.reduce((a, s) => a + s.facilities.reduce((b, f) => b + f.equipment.length, 0), 0)} DEXPI 2.0 types`,
                },
                { label: 'Sector Interdependencies', value: 'Energy, Water, Transportation, Healthcare' },
                { label: 'Regulatory Framework', value: 'CFATS, EPA RMP, OSHA PSM, TSCA, RCRA' },
            ],
            businessArchitecture: [
                {
                    title: 'Value Chain Analysis',
                    body: 'Raw material extraction → Primary processing (cracking, reforming) → Intermediate synthesis → Specialty/fine chemical production → Formulation & blending → Packaging & distribution. Continuous and batch process modalities.',
                },
                {
                    title: 'Stakeholder Map',
                    body: 'ACC (American Chemistry Council), EPA, OSHA, DHS/CISA (CFATS), state DEQs, chemical OEMs (BASF, Dow, DuPont), SIS integrators (Honeywell, Emerson, Yokogawa).',
                },
                {
                    title: 'Architecture Principles',
                    body: 'Safety Instrumented Systems (SIS) per IEC 61511 with SIL-rated protection layers. Defense-in-depth per IEC 62443. ISA-95/88 batch and continuous control models.',
                },
                {
                    title: 'Key Standards',
                    body: 'IEC 61511, IEC 61508, IEC 62443, ISA-88, ISA-95, API 2350, NFPA 30/45/70, ANSI/ISA-18.2 (alarm management), ISA-84 (SIS).',
                },
            ],
            threatLandscape: {
                headline: 'Threat Landscape',
                items: [
                    'State-sponsored attacks on DCS/SIS (TRITON/TRISIS targeting Schneider Triconex)',
                    'Ransomware disrupting batch operations and safety system HMIs',
                    'Insider threats with access to recipe/formulation intellectual property',
                    'Supply chain attacks on PLCs and analyzers via firmware updates',
                    'Physical-cyber: HAZOP scenario manipulation via compromised controllers',
                ],
                bottomLine: 'CFATS Top-Screen threshold: 300+ chemicals of interest (COI)',
            },
        },

        referenceArchitecture: {
            informationSystems: [
                {
                    title: 'Purdue Model (L0–L5)',
                    body: 'L0: Analyzers, sensors, actuators, valves. L1: PLCs, SIS controllers (1oo2D, 2oo3). L2: DCS, batch engine, HMI. L3: MES, historian, LIMS. L3.5: DMZ. L4/L5: ERP (SAP PP-PI), supply chain, regulatory reporting.',
                },
                {
                    title: 'ISA/IEC 62443 Zones',
                    body: 'Zone 1 (Safety): SIS/ESD independent from BPCS. Zone 2 (Control): DCS, PLCs, field instruments. Zone 3 (Supervision): MES, LIMS, historians. Zone 4 (Enterprise): ERP, logistics, compliance.',
                },
                {
                    title: 'Data Flow Patterns',
                    body: 'Continuous: 4–20mA / HART to DCS → OPC UA to historian. Batch: ISA-88 recipe → sequencer → procedure execution. LIMS integration via OPC, HL7, or REST APIs. Regulatory: EPA TRI/RMP electronic reporting.',
                },
            ],
            technologyArchitecture: [
                {
                    title: 'Protocol Stack',
                    body: 'Application: OPC UA/DA, ISA-88 batch. Transport: HART/WirelessHART, FOUNDATION Fieldbus, Profibus PA. Network: Ethernet/IP, PROFINET, Modbus TCP. Physical: 4–20mA, RS-485, fiber, IS barriers.',
                },
                {
                    title: 'Network Architecture',
                    body: 'Dual-redundant DCS networks (HSR/PRP). Separate SIS network physically isolated. Plant-wide Ethernet backbone with managed switches. VLAN segmentation per unit operation.',
                },
                {
                    title: 'Control Systems',
                    body: 'DCS (Honeywell Experion, Emerson DeltaV, Yokogawa CENTUM VP), SIS (Triconex, HIMA, Honeywell SIS), analyzers (gas chromatographs, pH, conductivity), MES (Emerson Syncade, Siemens SIMATIC IT).',
                },
            ],
            engineeringValue: {
                headline: 'Digital Twin Coverage',
                items: [
                    'DEXPI 2.0 equipment model: reactors, columns, heat exchangers, separators mapped per P&ID',
                    'SIL verification: SIS loop modeling with PFDavg calculations per IEC 61511',
                    'ISA-88 batch recipe → equipment mapping for procedural control validation',
                    'CFATS COI tracking: chemical inventory vs. DHS screening threshold quantities',
                    'Graph ontology: CVE ↔ CWE ↔ CAPEC for chemical-specific ICS vulnerabilities',
                ],
                bottomLine: '95% equipment coverage · 6 facility archetypes · Full SIS modeling',
            },
        },

        subSectors: CHEMICAL_SECTOR.subSectors.map(sub => ({
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
 * Returns a lightweight summary of the Chemical sector for the hub page.
 */
export function getChemicalSummary(): SectorSummary {
    const data = getChemicalStepData();
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
