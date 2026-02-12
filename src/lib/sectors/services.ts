/**
 * CISA Sectors: Emergency Services, Government Facilities, Information Technology.
 *
 * Three sectors whose critical assets are primarily facility-level
 * infrastructure (HVAC, power, life safety) rather than process equipment.
 *
 * @module sectors/services
 */

import { DexpiSector } from './types';
import * as URI from './uris';

/** CISA Sector 07: Emergency Services. SRMA: DHS/FEMA. */
export const EMERGENCY_SECTOR: DexpiSector = {
    code: 'EMER',
    name: 'Emergency Services',
    icon: 'Siren',
    description:
        'Law enforcement, fire and rescue services, emergency medical services, emergency ' +
        'management agencies, and public works departments providing immediate response ' +
        'to emergencies and natural disasters.',
    color: '#DC2626',
    srma: 'DHS/FEMA',
    subSectors: [
        {
            code: 'EMER-LE', name: 'Law Enforcement',
            description: 'Federal, state, and local police departments, correctional facilities, and federal investigative agencies.',
            facilities: [{
                code: 'EMER-LE-911', name: '911 / Emergency Communications Center', description: 'PSAP (Public Safety Answering Point) with redundant communications, CAD systems, and backup power.',
                equipment: [
                    { componentClass: 'ElectricGenerator', componentClassURI: URI.ELECTRIC_GENERATOR_URI, displayName: 'Emergency Generator', category: 'electrical', typicalQuantity: { min: 2, max: 4 } },
                    { componentClass: 'UPS', componentClassURI: URI.UPS_URI, displayName: 'Critical Systems UPS', category: 'electrical', typicalQuantity: { min: 4, max: 12 } },
                    { componentClass: 'CoolingTower', componentClassURI: URI.COOLING_TOWER_URI, displayName: 'Server Room Cooling', category: 'heat-transfer', typicalQuantity: { min: 1, max: 4 } },
                ],
            }],
        },
        {
            code: 'EMER-FR', name: 'Fire and Rescue',
            description: 'Fire departments, hazmat teams, urban search and rescue (USAR) teams.',
            facilities: [{
                code: 'EMER-FR-STA', name: 'Fire Station', description: 'Fire/rescue station with apparatus bays, living quarters, and equipment maintenance areas.',
                equipment: [
                    { componentClass: 'ElectricGenerator', componentClassURI: URI.ELECTRIC_GENERATOR_URI, displayName: 'Standby Generator', category: 'electrical', typicalQuantity: { min: 1, max: 2 } },
                    { componentClass: 'Compressor', componentClassURI: URI.COMPRESSOR_URI, displayName: 'SCBA Cascade Compressor', category: 'rotating', typicalQuantity: { min: 1, max: 2 } },
                    { componentClass: 'Boiler', componentClassURI: URI.BOILER_URI, displayName: 'Building Boiler', category: 'heat-transfer', typicalQuantity: { min: 1, max: 2 } },
                ],
            }],
        },
        {
            code: 'EMER-EM', name: 'Emergency Management',
            description: 'EOCs (Emergency Operations Centers), FEMA regional offices, and state/local OEMs.',
            facilities: [{
                code: 'EMER-EM-EOC', name: 'Emergency Operations Center (EOC)', description: 'Hardened facility for coordinating emergency response with redundant communications and extended autonomous operations.',
                equipment: [
                    { componentClass: 'ElectricGenerator', componentClassURI: URI.ELECTRIC_GENERATOR_URI, displayName: 'Diesel Generator (72hr fuel)', category: 'electrical', typicalQuantity: { min: 2, max: 4 } },
                    { componentClass: 'UPS', componentClassURI: URI.UPS_URI, displayName: 'Data/Comm UPS', category: 'electrical', typicalQuantity: { min: 4, max: 12 } },
                    { componentClass: 'StorageTank', componentClassURI: URI.TANK_URI, displayName: 'Fuel Storage Tank', category: 'static', typicalQuantity: { min: 1, max: 4 } },
                    { componentClass: 'Fan', componentClassURI: URI.FAN_URI, displayName: 'CBRN Filtration Fan', category: 'rotating', typicalQuantity: { min: 2, max: 6 } },
                ],
            }],
        },
        {
            code: 'EMER-EMS', name: 'Emergency Medical Services',
            description: 'Ambulance services, aeromedical transport, paramedic operations.',
            facilities: [{
                code: 'EMER-EMS-BASE', name: 'EMS Base Station', description: 'Ambulance base with vehicle maintenance bays, medical supply storage, and dispatch.',
                equipment: [
                    { componentClass: 'ElectricGenerator', componentClassURI: URI.ELECTRIC_GENERATOR_URI, displayName: 'Backup Generator', category: 'electrical', typicalQuantity: { min: 1, max: 2 } },
                    { componentClass: 'Compressor', componentClassURI: URI.COMPRESSOR_URI, displayName: 'Medical Oxygen Compressor', category: 'rotating', typicalQuantity: { min: 1, max: 2 } },
                ],
            }],
        },
    ],
};

/** CISA Sector 11: Government Facilities. SRMA: DHS/GSA. */
export const GOVERNMENT_SECTOR: DexpiSector = {
    code: 'GOVT',
    name: 'Government Facilities',
    icon: 'Building',
    description:
        'Federal, state, local, and tribal government buildings including courthouses, ' +
        'embassies, national laboratories, education facilities, and national monuments.',
    color: '#64748B',
    srma: 'DHS/GSA',
    subSectors: [
        {
            code: 'GOVT-FB', name: 'Federal Buildings',
            description: 'Courthouses, federal office buildings, embassies, and national laboratories.',
            facilities: [{
                code: 'GOVT-FB-LAB', name: 'National Laboratory', description: 'DOE national laboratory complex with research reactors, accelerators, computing centers, and office space.',
                equipment: [
                    { componentClass: 'ElectricGenerator', componentClassURI: URI.ELECTRIC_GENERATOR_URI, displayName: 'Facility Generator', category: 'electrical', typicalQuantity: { min: 4, max: 16 } },
                    { componentClass: 'UPS', componentClassURI: URI.UPS_URI, displayName: 'Research Equipment UPS', category: 'electrical', typicalQuantity: { min: 10, max: 40 } },
                    { componentClass: 'CoolingTower', componentClassURI: URI.COOLING_TOWER_URI, displayName: 'Central Plant Cooling', category: 'heat-transfer', typicalQuantity: { min: 4, max: 16 } },
                    { componentClass: 'Boiler', componentClassURI: URI.BOILER_URI, displayName: 'Steam Distribution Boiler', category: 'heat-transfer', typicalQuantity: { min: 2, max: 8 } },
                    { componentClass: 'Switchgear', componentClassURI: URI.SWITCHGEAR_URI, displayName: 'Main Distribution Switchgear', category: 'electrical', typicalQuantity: { min: 4, max: 12 } },
                ],
            }],
        },
        {
            code: 'GOVT-SL', name: 'State and Local Government',
            description: 'State capitols, city halls, county courthouses, and municipal buildings.',
            facilities: [{
                code: 'GOVT-SL-CITY', name: 'City Hall / Municipal Complex', description: 'Municipal government complex with offices, council chambers, and critical IT infrastructure.',
                equipment: [
                    { componentClass: 'ElectricGenerator', componentClassURI: URI.ELECTRIC_GENERATOR_URI, displayName: 'Standby Generator', category: 'electrical', typicalQuantity: { min: 1, max: 3 } },
                    { componentClass: 'Boiler', componentClassURI: URI.BOILER_URI, displayName: 'HVAC Boiler', category: 'heat-transfer', typicalQuantity: { min: 1, max: 3 } },
                    { componentClass: 'UPS', componentClassURI: URI.UPS_URI, displayName: 'Server Room UPS', category: 'electrical', typicalQuantity: { min: 1, max: 4 } },
                ],
            }],
        },
        {
            code: 'GOVT-ED', name: 'Education Facilities',
            description: 'Public K-12 schools, universities, and research institutions.',
            facilities: [{
                code: 'GOVT-ED-UNIV', name: 'University Campus', description: 'Large research university with central utility plant, research labs, and campus-wide infrastructure.',
                equipment: [
                    { componentClass: 'Boiler', componentClassURI: URI.BOILER_URI, displayName: 'Campus Steam Boiler', category: 'heat-transfer', typicalQuantity: { min: 2, max: 8 } },
                    { componentClass: 'CoolingTower', componentClassURI: URI.COOLING_TOWER_URI, displayName: 'Central Plant Cooling Tower', category: 'heat-transfer', typicalQuantity: { min: 2, max: 8 } },
                    { componentClass: 'CentrifugalPump', componentClassURI: URI.CENTRIFUGAL_PUMP_URI, displayName: 'Chilled Water Distribution Pump', category: 'rotating', typicalQuantity: { min: 4, max: 12 } },
                    { componentClass: 'ElectricGenerator', componentClassURI: URI.ELECTRIC_GENERATOR_URI, displayName: 'Emergency Generator', category: 'electrical', typicalQuantity: { min: 2, max: 8 } },
                ],
            }],
        },
        {
            code: 'GOVT-NM', name: 'National Monuments and Icons',
            description: 'National monuments, memorials, and symbolic structures.',
            facilities: [{
                code: 'GOVT-NM-MON', name: 'National Monument / Memorial', description: 'Significant national landmark with visitor facilities, security, and preservation systems.',
                equipment: [
                    { componentClass: 'CentrifugalPump', componentClassURI: URI.CENTRIFUGAL_PUMP_URI, displayName: 'Fountain/Water Feature Pump', category: 'rotating', typicalQuantity: { min: 1, max: 6 } },
                    { componentClass: 'ElectricGenerator', componentClassURI: URI.ELECTRIC_GENERATOR_URI, displayName: 'Emergency Power Generator', category: 'electrical', typicalQuantity: { min: 1, max: 2 } },
                ],
            }],
        },
    ],
};

/** CISA Sector 13: Information Technology. SRMA: DHS/CISA. */
export const IT_SECTOR: DexpiSector = {
    code: 'ITEC',
    name: 'Information Technology',
    icon: 'Cpu',
    description:
        'Hardware manufacturing, software development, IT services, internet services, and ' +
        'cloud computing infrastructure providing the digital backbone for all sectors.',
    color: '#8B5CF6',
    srma: 'DHS/CISA',
    subSectors: [
        {
            code: 'ITEC-HW', name: 'Hardware Manufacturing',
            description: 'Semiconductor fabrication, server/PC assembly, and networking equipment manufacturing.',
            facilities: [{
                code: 'ITEC-HW-FAB', name: 'Semiconductor Fabrication Plant (Fab)', description: 'Advanced semiconductor foundry with ISO 1-4 cleanrooms, photolithography, CMP, etching, and ion implantation.',
                equipment: [
                    { componentClass: 'Fan', componentClassURI: URI.FAN_URI, displayName: 'Clean Room Fan Filter Unit', category: 'rotating', typicalQuantity: { min: 100, max: 1000 } },
                    { componentClass: 'CentrifugalPump', componentClassURI: URI.CENTRIFUGAL_PUMP_URI, displayName: 'UPW Distribution Pump', category: 'rotating', typicalQuantity: { min: 10, max: 40 } },
                    { componentClass: 'CoolingTower', componentClassURI: URI.COOLING_TOWER_URI, displayName: 'Process Cooling Tower', category: 'heat-transfer', typicalQuantity: { min: 4, max: 16 } },
                    { componentClass: 'Compressor', componentClassURI: URI.COMPRESSOR_URI, displayName: 'Bulk Gas Compressor', category: 'rotating', typicalQuantity: { min: 4, max: 12 } },
                    { componentClass: 'Scrubber', componentClassURI: URI.SCRUBBER_URI, displayName: 'Exhaust Gas Scrubber', category: 'static', typicalQuantity: { min: 4, max: 16 } },
                    { componentClass: 'ElectricGenerator', componentClassURI: URI.ELECTRIC_GENERATOR_URI, displayName: 'Emergency Generator', category: 'electrical', typicalQuantity: { min: 4, max: 12 } },
                    { componentClass: 'UPS', componentClassURI: URI.UPS_URI, displayName: 'Tool Power UPS', category: 'electrical', typicalQuantity: { min: 10, max: 40 } },
                    { componentClass: 'Transformer', componentClassURI: URI.TRANSFORMER_URI, displayName: 'Substation Transformer', category: 'electrical', typicalQuantity: { min: 4, max: 12 } },
                ],
            }],
        },
        {
            code: 'ITEC-CL', name: 'Cloud and Data Centers',
            description: 'Hyperscale data centers, colocation facilities, and edge computing.',
            facilities: [{
                code: 'ITEC-CL-HYPER', name: 'Hyperscale Data Center', description: 'Large-scale cloud data center (50+ MW) with modular design, free cooling, and 2N power redundancy.',
                equipment: [
                    { componentClass: 'ElectricGenerator', componentClassURI: URI.ELECTRIC_GENERATOR_URI, displayName: 'Diesel Rotary UPS/Generator', category: 'electrical', typicalQuantity: { min: 20, max: 80 } },
                    { componentClass: 'UPS', componentClassURI: URI.UPS_URI, displayName: 'Modular UPS', category: 'electrical', typicalQuantity: { min: 20, max: 80 } },
                    { componentClass: 'CoolingTower', componentClassURI: URI.COOLING_TOWER_URI, displayName: 'Evaporative Cooling Tower', category: 'heat-transfer', typicalQuantity: { min: 10, max: 40 } },
                    { componentClass: 'CentrifugalPump', componentClassURI: URI.CENTRIFUGAL_PUMP_URI, displayName: 'Chilled Water Pump', category: 'rotating', typicalQuantity: { min: 10, max: 40 } },
                    { componentClass: 'Transformer', componentClassURI: URI.TRANSFORMER_URI, displayName: 'Medium Voltage Transformer', category: 'electrical', typicalQuantity: { min: 10, max: 40 } },
                    { componentClass: 'Switchgear', componentClassURI: URI.SWITCHGEAR_URI, displayName: 'ATS/Switchgear', category: 'electrical', typicalQuantity: { min: 10, max: 40 } },
                ],
            }],
        },
        {
            code: 'ITEC-SW', name: 'Software and IT Services',
            description: 'Software development, managed IT services, cybersecurity operations.',
            facilities: [{
                code: 'ITEC-SW-SOC', name: 'Security Operations Center (SOC)', description: 'Cybersecurity operations facility with 24/7 monitoring, redundant connectivity, and hardened physical security.',
                equipment: [
                    { componentClass: 'ElectricGenerator', componentClassURI: URI.ELECTRIC_GENERATOR_URI, displayName: 'Backup Generator', category: 'electrical', typicalQuantity: { min: 1, max: 4 } },
                    { componentClass: 'UPS', componentClassURI: URI.UPS_URI, displayName: 'Critical Systems UPS', category: 'electrical', typicalQuantity: { min: 4, max: 12 } },
                    { componentClass: 'CoolingTower', componentClassURI: URI.COOLING_TOWER_URI, displayName: 'Precision Cooling', category: 'heat-transfer', typicalQuantity: { min: 1, max: 4 } },
                ],
            }],
        },
    ],
};
