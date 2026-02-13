/**
 * Healthcare Sector Step Data.
 *
 * @module components/wiki/step-data/healthcare
 */

import { type SectorStepData } from '../SectorStepViewer';
import { HEALTHCARE_SECTOR } from '@/lib/sectors/healthcare';

/**
 * Builds the complete step viewer data for the Healthcare sector.
 *
 * @returns SectorStepData for Healthcare and Public Health.
 */
export function getHealthcareStepData(): SectorStepData {
    return {
        name: HEALTHCARE_SECTOR.name,
        code: HEALTHCARE_SECTOR.code,
        color: HEALTHCARE_SECTOR.color,
        srma: HEALTHCARE_SECTOR.srma,

        architectureVision: {
            profile: [
                { label: 'PPD-21 Classification', value: 'CISA Sector 12 — Healthcare and Public Health' },
                { label: 'SRMA', value: 'Department of Health and Human Services (HHS)' },
                {
                    label: 'Sub-Sectors',
                    value: `${HEALTHCARE_SECTOR.subSectors.length} sub-sectors · ${HEALTHCARE_SECTOR.subSectors.reduce((a, s) => a + s.facilities.length, 0)} facility types`,
                },
                {
                    label: 'Equipment Classes',
                    value: `${HEALTHCARE_SECTOR.subSectors.reduce((a, s) => a + s.facilities.reduce((b, f) => b + f.equipment.length, 0), 0)} DEXPI 2.0 types`,
                },
                { label: 'Sector Interdependencies', value: 'IT, Communications, Energy, Water, Chemical' },
                { label: 'Regulatory Framework', value: 'HIPAA, FDA 510(k)/PMA, HITECH, Joint Commission, NIST CSF HPH' },
            ],
            businessArchitecture: [
                {
                    title: 'Value Chain Analysis',
                    body: 'Pharmaceutical R&D → Manufacturing (API synthesis, formulation, fill-finish) → Medical device manufacturing → Hospital/clinic operations → Laboratory services → Blood/tissue banking → Public health surveillance.',
                },
                {
                    title: 'Stakeholder Map',
                    body: 'HHS, FDA, CDC, CMS, HC3 (Health Sector Cybersecurity Coordination Center), H-ISAC, pharma (Pfizer, J&J, Roche), device OEMs (Siemens Healthineers, GE Healthcare, Medtronic), hospital networks (HCA, Kaiser).',
                },
                {
                    title: 'Architecture Principles',
                    body: 'HIPAA Security Rule as baseline. Zero-trust for clinical networks. Medical device micro-segmentation. GxP (Good Manufacturing Practice) for pharma/biotech. FDA premarket cybersecurity guidance for IoMT.',
                },
                {
                    title: 'Key Standards',
                    body: 'HIPAA 45 CFR 164, NIST SP 800-66, IEC 80001-1, FDA premarket guidance, AAMI TIR57, HL7 FHIR, DICOM, IEC 62443 for pharma OT, 21 CFR Part 11 (electronic records).',
                },
            ],
            threatLandscape: {
                headline: 'Threat Landscape',
                items: [
                    'Ransomware targeting hospital EHR/EMR systems (Change Healthcare, Ascension attacks)',
                    'Medical device exploitation: infusion pumps, ventilators, imaging systems',
                    'Pharma IP theft: compound data, clinical trial results, manufacturing processes',
                    'BSL-3/4 lab systems: HVAC/BMS manipulation affecting containment integrity',
                    'Blood bank: cold chain disruption, donor database compromise, inventory manipulation',
                ],
                bottomLine: 'HC3 reports healthcare is #1 ransomware target globally since 2020',
            },
        },

        referenceArchitecture: {
            informationSystems: [
                {
                    title: 'Clinical Systems Architecture',
                    body: 'EHR/EMR (Epic, Cerner/Oracle Health). PACS/RIS for imaging (DICOM). Clinical lab (LIS). Pharmacy (automated dispensing). Nurse call and real-time location (RTLS). Telehealth/RPM platforms.',
                },
                {
                    title: 'Security Zones',
                    body: 'Zone 1 (Clinical): Life-critical medical devices — ventilators, infusion pumps, AEDs. Zone 2 (Biomedical): PACS, lab analyzers, imaging modalities. Zone 3 (Clinical IT): EHR, pharmacy, nurse call. Zone 4 (Enterprise): billing, HR, email, internet.',
                },
                {
                    title: 'Data Flow Patterns',
                    body: 'Clinical: HL7 v2/FHIR for ADT, orders, results. Imaging: DICOM from modality → PACS → viewer. Pharma: GAMP 5 validation data flows, batch records (MES). Public health: syndromic surveillance to CDC BioSense. Lab: LOINC-coded results via HL7.',
                },
            ],
            technologyArchitecture: [
                {
                    title: 'Protocol Stack',
                    body: 'Application: HL7 v2/FHIR, DICOM, IHE profiles, NCPDP (pharmacy). Transport: TCP/IP, MLLP (HL7), HTTPS/REST (FHIR). Network: hospital Wi-Fi (802.11ax), clinical VLAN, BioMed VLAN. Physical: Cat6A, fiber backbone, medical-grade power.',
                },
                {
                    title: 'Network Architecture',
                    body: 'Three-zone hospital network: clinical, biomedical, enterprise. Medical device micro-segmentation via NAC. Wireless: high-density 802.11ax for clinical devices. Pharma cleanroom: isolated OT network for GMP manufacturing. Telehealth: SD-WAN to remote clinics.',
                },
                {
                    title: 'Systems & Devices',
                    body: 'EHR (Epic, Oracle Health), imaging (Siemens MAGNETOM, GE Revolution CT), lab (Roche cobas, Abbott Alinity), infusion (BD Alaris, Baxter Sigma), BMS (Siemens Desigo, Johnson Controls), pharma DCS (Emerson DeltaV, Siemens PCS 7).',
                },
            ],
            engineeringValue: {
                headline: 'Digital Twin Coverage',
                items: [
                    'DEXPI 2.0 model: pharma reactors, bioreactors, lyophilizers, autoclaves, clean utilities',
                    'Medical device inventory: CVE ↔ SBOM ↔ FDA advisory tracking for IoMT',
                    'BSL-3 containment modeling: HVAC zones, pressure cascades, decontamination systems',
                    'Blood bank cold chain: refrigerator → transport → transfusion temperature tracking',
                    'Graph ontology: CVE ↔ medical device ↔ patient safety impact scoring',
                ],
                bottomLine: '87% equipment coverage · 5 facility archetypes · Full IoMT modeling',
            },
        },

        subSectors: HEALTHCARE_SECTOR.subSectors.map(sub => ({
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
