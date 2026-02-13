/**
 * Nuclear Sector Step Data.
 *
 * @module components/wiki/step-data/nuclear
 */

import { type SectorStepData, type SectorSummary } from '../SectorStepViewer';
import { NUCLEAR_SECTOR } from '@/lib/sectors/nuclear';

/**
 * Builds the complete step viewer data for the Nuclear sector.
 *
 * @returns SectorStepData for Nuclear Reactors, Materials, and Waste.
 */
export function getNuclearStepData(): SectorStepData {
    return {
        name: NUCLEAR_SECTOR.name,
        code: NUCLEAR_SECTOR.code,
        color: NUCLEAR_SECTOR.color,
        srma: NUCLEAR_SECTOR.srma,

        architectureVision: {
            profile: [
                { label: 'PPD-21 Classification', value: 'CISA Sector 14 — Nuclear Reactors, Materials, and Waste' },
                { label: 'SRMA', value: 'DHS / Nuclear Regulatory Commission (NRC)' },
                {
                    label: 'Sub-Sectors',
                    value: `${NUCLEAR_SECTOR.subSectors.length} sub-sectors · ${NUCLEAR_SECTOR.subSectors.reduce((a, s) => a + s.facilities.length, 0)} facility types`,
                },
                {
                    label: 'Equipment Classes',
                    value: `${NUCLEAR_SECTOR.subSectors.reduce((a, s) => a + s.facilities.reduce((b, f) => b + f.equipment.length, 0), 0)} DEXPI 2.0 types`,
                },
                { label: 'Sector Interdependencies', value: 'Energy, Transportation, Water, Healthcare' },
                { label: 'Regulatory Framework', value: '10 CFR 73.54, NRC RG 5.71, NEI 08-09, IAEA NSS' },
            ],
            businessArchitecture: [
                {
                    title: 'Value Chain Analysis',
                    body: 'Uranium mining/milling → Conversion → Enrichment (gaseous diffusion/centrifuge) → Fuel fabrication → Reactor operations (PWR/BWR) → Spent fuel storage (wet/dry) → Reprocessing or permanent disposal.',
                },
                {
                    title: 'Stakeholder Map',
                    body: 'NRC, DOE, NEI (Nuclear Energy Institute), INPO, WANO, reactor operators (Exelon, Duke, EDF), OEMs (Westinghouse, GE-Hitachi, Framatome), national laboratories (INL, ORNL, SNL).',
                },
                {
                    title: 'Architecture Principles',
                    body: 'Safety-grade (1E) vs non-safety digital systems. Defense-in-depth with independent protection layers. Deterministic and probabilistic safety analysis. Air-gap isolation for safety-critical I&C.',
                },
                {
                    title: 'Key Standards',
                    body: '10 CFR 73.54 (cyber security), NRC RG 5.71, IEEE 603/7-4.3.2, IEC 61513, IEC 62138, IEC 61226, NEI 08-09 (CSP template), IAEA NSS-17/33-T.',
                },
            ],
            threatLandscape: {
                headline: 'Threat Landscape',
                items: [
                    'State-sponsored sabotage targeting nuclear safety I&C systems',
                    'Stuxnet-class attacks: centrifuge manipulation via PLC code injection',
                    'Insider threat: privileged access to safety parameter display systems',
                    'Supply chain: counterfeit safety-grade components (1E qualification)',
                    'Physical security integration: CCTV, access control, vehicle barriers',
                ],
                bottomLine: 'NRC requires cyber security plans per 10 CFR 73.54 for all licensees',
            },
        },

        referenceArchitecture: {
            informationSystems: [
                {
                    title: 'Purdue Model (L0–L5)',
                    body: 'L0: Neutron flux detectors, RTDs, pressure transmitters, containment monitors. L1: Safety PLCs (1E-qualified), RPS, ESFAS. L2: Main control room panels, HMI, plant computer. L3: Plant data network, historian, outage management. L3.5: DMZ (air-gapped). L4/L5: Corporate IT.',
                },
                {
                    title: 'NRC Cyber Security Zones',
                    body: 'Level 4 (Safety): RPS, ESFAS — air-gapped. Level 3 (Important-to-Safety): non-safety control. Level 2 (Support): business network, historian. Level 1 (External): corporate, internet. Critical Digital Assets (CDAs) classified per NEI 10-04.',
                },
                {
                    title: 'Data Flow Patterns',
                    body: 'Safety: hardwired/qualified data links (fiber) with one-way data diodes. Non-safety: OPC UA with deterministic scheduling. Outage mgmt: work order → tagout → LOTO integration. NRC reporting: LERs, condition reports, Part 21 defect reports.',
                },
            ],
            technologyArchitecture: [
                {
                    title: 'Protocol Stack',
                    body: 'Application: qualified datalinks, OPC UA (non-safety). Transport: safety-qualified fiber optic, Ethernet. Network: isolated safety networks, dual-redundant plant Ethernet. Physical: Category 1E cables, qualified connectors, seismic-rated enclosures.',
                },
                {
                    title: 'Network Architecture',
                    body: 'Complete air-gap between safety and non-safety networks. Data diodes (Waterfall, Owl) for safety-to-corporate data flow. Dual-redundant plant information network. Dedicated security monitoring network.',
                },
                {
                    title: 'Control Systems',
                    body: 'Safety I&C: AREVA TELEPERM XS, Westinghouse Common Q, NuScale MELTAC. Non-safety DCS: Emerson Ovation, Siemens T3000, Foxboro. Radiation monitoring: Mirion, Canberra, Thermo Fisher.',
                },
            ],
            engineeringValue: {
                headline: 'Digital Twin Coverage',
                items: [
                    'DEXPI 2.0 model: reactor vessel, steam generators, turbine island, containment systems',
                    'Safety system mapping: RPS, ESFAS, containment isolation with trip setpoint verification',
                    '10 CFR 73.54 compliance: CDA inventory and cyber attack surface analysis',
                    'NEI 08-09 CSP alignment: defensive architecture template per NRC requirements',
                    'Graph ontology: CVE ↔ CDA ↔ safety function impact analysis',
                ],
                bottomLine: '88% equipment coverage · 7 facility archetypes · Safety I&C modeling',
            },
        },

        subSectors: NUCLEAR_SECTOR.subSectors.map(sub => ({
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
 * Returns a lightweight summary of the Nuclear sector for the hub page.
 */
export function getNuclearSummary(): SectorSummary {
    const data = getNuclearStepData();
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
