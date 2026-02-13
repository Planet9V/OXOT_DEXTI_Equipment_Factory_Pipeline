/**
 * CISA Sector 12: Healthcare and Public Health Sector.
 *
 * Encompasses direct patient healthcare delivery, health insurance, pharmaceuticals,
 * biotechnology, blood supply, medical devices, and laboratory services protecting
 * all Americans from health emergencies, whether natural or man-made.
 *
 * SRMA: Department of Health and Human Services (HHS).
 *
 * References:
 *   - HHS (2024). Healthcare and Public Health Sector-Specific Plan.
 *   - CMS Conditions of Participation — 42 CFR Part 482.
 *   - FDA 21 CFR Parts 210/211/820 — cGMP for Drugs and Devices.
 *   - ASHRAE 170 — Ventilation of Health Care Facilities.
 *
 * @module sectors/healthcare
 */

import { DexpiSector } from './types';
import * as URI from './uris';

export const HEALTHCARE_SECTOR: DexpiSector = {
    code: 'HLTH',
    slug: 'healthcare',
    name: 'Healthcare and Public Health',
    icon: 'Heart',
    description:
        'Hospitals, clinics, pharmaceutical manufacturing, biotechnology, medical devices, ' +
        'blood supply chains, diagnostic laboratories, and health insurance systems critical ' +
        'to national public health security and pandemic preparedness.',
    color: '#EF4444',
    srma: 'HHS',
    subSectors: [
        {
            code: 'HLTH-DC',
            name: 'Direct Patient Care',
            description:
                'Hospitals, clinics, nursing facilities, ambulatory surgery centers, and public ' +
                'health departments providing direct medical care to patients.',
            facilities: [
                {
                    code: 'HLTH-DC-HOSP',
                    name: 'Acute Care Hospital',
                    description:
                        'Full-service acute care facility with emergency department, surgical suites, ICUs, ' +
                        'medical/surgical floors, imaging, laboratory, pharmacy, and central plant utilities.',
                    equipment: [
                        { componentClass: 'Boiler', componentClassURI: URI.BOILER_URI, displayName: 'Central Plant Steam Boiler', category: 'heat-transfer', typicalQuantity: { min: 2, max: 6 } },
                        { componentClass: 'CentrifugalPump', componentClassURI: URI.CENTRIFUGAL_PUMP_URI, displayName: 'Chilled Water Pump', category: 'rotating', typicalQuantity: { min: 4, max: 12 } },
                        { componentClass: 'CoolingTower', componentClassURI: URI.COOLING_TOWER_URI, displayName: 'Cooling Tower', category: 'heat-transfer', typicalQuantity: { min: 2, max: 6 } },
                        { componentClass: 'Compressor', componentClassURI: URI.COMPRESSOR_URI, displayName: 'Medical Air Compressor', category: 'rotating', typicalQuantity: { min: 2, max: 4 } },
                        { componentClass: 'ElectricGenerator', componentClassURI: URI.ELECTRIC_GENERATOR_URI, displayName: 'Emergency Diesel Generator', category: 'electrical', typicalQuantity: { min: 2, max: 6 } },
                        { componentClass: 'UPS', componentClassURI: URI.UPS_URI, displayName: 'Critical Systems UPS', category: 'electrical', typicalQuantity: { min: 4, max: 12 } },
                        { componentClass: 'Switchgear', componentClassURI: URI.SWITCHGEAR_URI, displayName: 'Main Distribution Switchgear', category: 'electrical', typicalQuantity: { min: 2, max: 6 } },
                        { componentClass: 'Fan', componentClassURI: URI.FAN_URI, displayName: 'AHU Supply Fan', category: 'rotating', typicalQuantity: { min: 10, max: 40 } },
                        { componentClass: 'StorageTank', componentClassURI: URI.TANK_URI, displayName: 'Medical Gas Bulk Tank', category: 'static', typicalQuantity: { min: 2, max: 6 } },
                    ],
                },
            ],
        },
        {
            code: 'HLTH-PH',
            name: 'Pharmaceuticals and Biotechnology',
            description:
                'Drug manufacturing, vaccine production, biologic manufacturing (monoclonal ' +
                'antibodies, cell/gene therapy), and pharmaceutical distribution.',
            facilities: [
                {
                    code: 'HLTH-PH-BIO',
                    name: 'Biopharmaceutical Manufacturing Facility',
                    description:
                        'cGMP biologics production facility with upstream cell culture (bioreactors), ' +
                        'downstream purification (chromatography, ultrafiltration), and aseptic fill/finish ' +
                        'in ISO 5/7 cleanroom environments.',
                    equipment: [
                        { componentClass: 'Reactor', componentClassURI: URI.REACTOR_URI, displayName: 'Single-Use Bioreactor (SUB)', category: 'static', typicalQuantity: { min: 4, max: 20 } },
                        { componentClass: 'ProcessColumn', componentClassURI: URI.PROCESS_COLUMN_URI, displayName: 'Protein A Chromatography Column', category: 'static', typicalQuantity: { min: 2, max: 8 } },
                        { componentClass: 'Filter', componentClassURI: URI.FILTER_URI, displayName: 'Viral Filtration Unit', category: 'static', typicalQuantity: { min: 2, max: 8 } },
                        { componentClass: 'CentrifugalPump', componentClassURI: URI.CENTRIFUGAL_PUMP_URI, displayName: 'Peristaltic Process Pump', category: 'rotating', typicalQuantity: { min: 6, max: 20 } },
                        { componentClass: 'ShellTubeHeatExchanger', componentClassURI: URI.SHELL_TUBE_HX_URI, displayName: 'WFI Heat Exchanger', category: 'heat-transfer', typicalQuantity: { min: 2, max: 6 } },
                        { componentClass: 'StorageTank', componentClassURI: URI.TANK_URI, displayName: 'WFI Storage Tank', category: 'static', typicalQuantity: { min: 2, max: 6 } },
                        { componentClass: 'Autoclave', componentClassURI: URI.AUTOCLAVE_URI, displayName: 'SIP/CIP Autoclave', category: 'static', typicalQuantity: { min: 2, max: 6 } },
                    ],
                },
            ],
        },
        {
            code: 'HLTH-BS',
            name: 'Blood Supply',
            description:
                'Blood collection, testing, component separation, storage, and distribution ' +
                'networks ensuring adequate supply for transfusion medicine.',
            facilities: [
                {
                    code: 'HLTH-BS-CTR',
                    name: 'Blood Processing Center',
                    description:
                        'Regional blood center performing whole blood collection, component separation ' +
                        '(red cells, platelets, plasma via centrifugation), pathogen testing, and storage.',
                    equipment: [
                        { componentClass: 'Centrifuge', componentClassURI: URI.CENTRIFUGE_URI, displayName: 'Blood Component Centrifuge', category: 'rotating', typicalQuantity: { min: 4, max: 16 } },
                        { componentClass: 'Compressor', componentClassURI: URI.COMPRESSOR_URI, displayName: 'Walk-In Freezer Compressor', category: 'rotating', typicalQuantity: { min: 2, max: 6 } },
                        { componentClass: 'ElectricGenerator', componentClassURI: URI.ELECTRIC_GENERATOR_URI, displayName: 'Emergency Generator', category: 'electrical', typicalQuantity: { min: 1, max: 2 } },
                        { componentClass: 'UPS', componentClassURI: URI.UPS_URI, displayName: 'LIMS Server UPS', category: 'electrical', typicalQuantity: { min: 1, max: 4 } },
                    ],
                },
            ],
        },
        {
            code: 'HLTH-MD',
            name: 'Medical Devices',
            description:
                'Manufacturing, sterilization, and distribution of medical devices including ' +
                'implants, diagnostic equipment, surgical instruments, and in-vitro diagnostics ' +
                'under FDA 21 CFR Part 820 Quality System Regulation.',
            facilities: [
                {
                    code: 'HLTH-MD-MFG',
                    name: 'Medical Device Manufacturing Facility',
                    description:
                        'ISO 13485 certified cleanroom manufacturing for Class II/III medical devices ' +
                        'with injection molding, precision machining, and EtO/gamma sterilization.',
                    equipment: [
                        { componentClass: 'Autoclave', componentClassURI: URI.AUTOCLAVE_URI, displayName: 'EtO Sterilizer', category: 'static', typicalQuantity: { min: 2, max: 8 } },
                        { componentClass: 'Compressor', componentClassURI: URI.COMPRESSOR_URI, displayName: 'Clean Compressed Air', category: 'rotating', typicalQuantity: { min: 2, max: 6 } },
                        { componentClass: 'Fan', componentClassURI: URI.FAN_URI, displayName: 'Cleanroom HVAC Fan', category: 'rotating', typicalQuantity: { min: 6, max: 20 } },
                        { componentClass: 'Filter', componentClassURI: URI.FILTER_URI, displayName: 'HEPA Filter Bank', category: 'static', typicalQuantity: { min: 10, max: 50 } },
                    ],
                },
            ],
        },
        {
            code: 'HLTH-LB',
            name: 'Laboratories',
            description:
                'Clinical diagnostic laboratories, public health testing laboratories, and ' +
                'BSL-2/3/4 research laboratories performing disease surveillance and response.',
            facilities: [
                {
                    code: 'HLTH-LB-BSL3',
                    name: 'BSL-3 Biocontainment Laboratory',
                    description:
                        'Biosafety Level 3 laboratory with directional airflow (negative pressure), HEPA ' +
                        'filtration, chemical shower decontamination, and autoclave pass-throughs for safe ' +
                        'handling of pathogens causing serious or lethal disease.',
                    equipment: [
                        { componentClass: 'Fan', componentClassURI: URI.FAN_URI, displayName: 'Exhaust HEPA Fan', category: 'rotating', typicalQuantity: { min: 4, max: 12 } },
                        { componentClass: 'Filter', componentClassURI: URI.FILTER_URI, displayName: 'HEPA Filter Housing', category: 'static', typicalQuantity: { min: 4, max: 16 } },
                        { componentClass: 'Autoclave', componentClassURI: URI.AUTOCLAVE_URI, displayName: 'Pass-Through Autoclave', category: 'static', typicalQuantity: { min: 1, max: 4 } },
                        { componentClass: 'ElectricGenerator', componentClassURI: URI.ELECTRIC_GENERATOR_URI, displayName: 'Emergency Generator', category: 'electrical', typicalQuantity: { min: 1, max: 2 } },
                        { componentClass: 'UPS', componentClassURI: URI.UPS_URI, displayName: 'BSC/Freezer UPS', category: 'electrical', typicalQuantity: { min: 2, max: 8 } },
                    ],
                },
                {
                    code: 'HLTH-LB-CLIN',
                    name: 'Clinical Diagnostic Laboratory',
                    description:
                        'High-throughput reference laboratory (50 000+ tests/day) with total laboratory ' +
                        'automation (TLA) track, chemistry/hematology/molecular analyzers, MALDI-TOF ' +
                        'microbiology, and LIS/middleware integration under CLIA and CAP.',
                    equipment: [
                        { componentClass: 'Centrifuge', componentClassURI: URI.CENTRIFUGE_URI, displayName: 'Specimen Centrifuge', category: 'rotating', typicalQuantity: { min: 6, max: 20 } },
                        { componentClass: 'Compressor', componentClassURI: URI.COMPRESSOR_URI, displayName: 'Pneumatic Tube Compressor', category: 'rotating', typicalQuantity: { min: 2, max: 6 } },
                        { componentClass: 'UPS', componentClassURI: URI.UPS_URI, displayName: 'LIS Server UPS', category: 'electrical', typicalQuantity: { min: 2, max: 8 } },
                        { componentClass: 'Fan', componentClassURI: URI.FAN_URI, displayName: 'Fume Hood Exhaust Fan', category: 'rotating', typicalQuantity: { min: 4, max: 12 } },
                        { componentClass: 'Filter', componentClassURI: URI.FILTER_URI, displayName: 'Molecular Lab HEPA Filter', category: 'static', typicalQuantity: { min: 4, max: 16 } },
                    ],
                },
            ],
        },
    ],
};
