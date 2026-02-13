/**
 * CISA Sector 16: Water and Wastewater Systems Sector.
 *
 * Provides safe drinking water and wastewater treatment essential for
 * public health. Encompasses over 153,000 public drinking water systems
 * and 16,000+ publicly owned treatment works (POTWs) in the United States.
 *
 * SRMA: Environmental Protection Agency (EPA).
 *
 * References:
 *   - EPA (2024). Water and Wastewater Systems Sector Overview.
 *   - AWWA Standards — American Water Works Association.
 *   - 40 CFR Part 141 — National Primary Drinking Water Regulations.
 *   - Clean Water Act (CWA) — 33 U.S.C. §§ 1251–1387.
 *
 * @module sectors/water
 */

import { DexpiSector } from './types';
import * as URI from './uris';

export const WATER_SECTOR: DexpiSector = {
    code: 'WATR',
    slug: 'water',
    name: 'Water and Wastewater Systems',
    icon: 'Droplets',
    description:
        'Drinking water treatment and distribution, wastewater collection and treatment, ' +
        'and stormwater management systems essential to public health, environmental protection, ' +
        'and the functioning of all other critical infrastructure sectors.',
    color: '#06B6D4',
    srma: 'EPA',
    subSectors: [
        {
            code: 'WATR-DW',
            name: 'Drinking Water',
            description:
                'Sourcing, treatment, storage, and distribution of potable water meeting Safe ' +
                'Drinking Water Act (SDWA) standards through coagulation, flocculation, sedimentation, ' +
                'filtration, and disinfection processes.',
            facilities: [
                {
                    code: 'WATR-DW-WTP',
                    name: 'Surface Water Treatment Plant',
                    description:
                        'Conventional surface water treatment facility processing raw water through ' +
                        'coagulation (alum/ferric chloride), flocculation, sedimentation, granular media ' +
                        'filtration, and chlorine/UV disinfection. Capacity 1–500+ MGD.',
                    equipment: [
                        { componentClass: 'CentrifugalPump', componentClassURI: URI.CENTRIFUGAL_PUMP_URI, displayName: 'Raw Water Intake Pump', category: 'rotating', typicalQuantity: { min: 2, max: 8 } },
                        { componentClass: 'Mixer', componentClassURI: URI.MIXER_URI, displayName: 'Rapid Mix Flash Mixer', category: 'rotating', typicalQuantity: { min: 1, max: 4 } },
                        { componentClass: 'Vessel', componentClassURI: URI.CLARIFIER_URI, displayName: 'Primary Clarifier', category: 'static', typicalQuantity: { min: 2, max: 12 } },
                        { componentClass: 'Filter', componentClassURI: URI.FILTER_URI, displayName: 'Granular Media Filter', category: 'static', typicalQuantity: { min: 4, max: 24 } },
                        { componentClass: 'StorageTank', componentClassURI: URI.TANK_URI, displayName: 'Clear Well', category: 'static', typicalQuantity: { min: 1, max: 4 } },
                        { componentClass: 'CentrifugalPump', componentClassURI: URI.CENTRIFUGAL_PUMP_URI, displayName: 'High Service Pump', category: 'rotating', typicalQuantity: { min: 2, max: 10 } },
                        { componentClass: 'Analyzer', componentClassURI: URI.ANALYZER_URI, displayName: 'Turbidity Analyzer', category: 'instrumentation', typicalQuantity: { min: 4, max: 16 } },
                        { componentClass: 'FlowMeter', componentClassURI: URI.FLOW_METER_URI, displayName: 'Plant Flow Meter', category: 'instrumentation', typicalQuantity: { min: 2, max: 8 } },
                    ],
                },
            ],
        },
        {
            code: 'WATR-WW',
            name: 'Wastewater',
            description:
                'Collection, conveyance, and treatment of municipal and industrial wastewater ' +
                'through primary sedimentation, secondary biological treatment (activated sludge), ' +
                'and tertiary polishing to meet NPDES discharge permits.',
            facilities: [
                {
                    code: 'WATR-WW-POTW',
                    name: 'Wastewater Treatment Plant (POTW)',
                    description:
                        'Publicly Owned Treatment Works providing primary, secondary (activated sludge), ' +
                        'and tertiary treatment of municipal wastewater. Includes anaerobic digestion of ' +
                        'waste sludge with biogas recovery. Capacity 1–1,000+ MGD.',
                    equipment: [
                        { componentClass: 'CentrifugalPump', componentClassURI: URI.CENTRIFUGAL_PUMP_URI, displayName: 'Influent Lift Pump', category: 'rotating', typicalQuantity: { min: 2, max: 8 } },
                        { componentClass: 'Clarifier', componentClassURI: URI.CLARIFIER_URI, displayName: 'Primary Clarifier', category: 'static', typicalQuantity: { min: 2, max: 12 } },
                        { componentClass: 'Blower', componentClassURI: URI.BLOWER_URI, displayName: 'Aeration Blower', category: 'rotating', typicalQuantity: { min: 2, max: 8 } },
                        { componentClass: 'Clarifier', componentClassURI: URI.CLARIFIER_URI, displayName: 'Secondary Clarifier', category: 'static', typicalQuantity: { min: 2, max: 12 } },
                        { componentClass: 'PressureVessel', componentClassURI: URI.PRESSURE_VESSEL_URI, displayName: 'Anaerobic Digester', category: 'static', typicalQuantity: { min: 2, max: 8 } },
                        { componentClass: 'Vessel', componentClassURI: URI.THICKENER_URI, displayName: 'Gravity Thickener', category: 'static', typicalQuantity: { min: 1, max: 4 } },
                        { componentClass: 'Centrifuge', componentClassURI: URI.CENTRIFUGE_URI, displayName: 'Dewatering Centrifuge', category: 'rotating', typicalQuantity: { min: 1, max: 4 } },
                        { componentClass: 'Filter', componentClassURI: URI.FILTER_URI, displayName: 'Tertiary Disc Filter', category: 'static', typicalQuantity: { min: 2, max: 8 } },
                        { componentClass: 'Analyzer', componentClassURI: URI.ANALYZER_URI, displayName: 'Dissolved Oxygen Analyzer', category: 'instrumentation', typicalQuantity: { min: 4, max: 16 } },
                    ],
                },
            ],
        },
        {
            code: 'WATR-SW',
            name: 'Stormwater',
            description:
                'Collection, conveyance, treatment, and controlled release of urban stormwater ' +
                'runoff through retention basins, detention ponds, and green infrastructure to ' +
                'prevent flooding and protect receiving waters per MS4 permits.',
            facilities: [
                {
                    code: 'WATR-SW-MGMT',
                    name: 'Stormwater Management Facility',
                    description:
                        'Engineered stormwater management system with pump stations, retention basins, ' +
                        'vortex separators, and constructed wetlands for runoff volume and quality control.',
                    equipment: [
                        { componentClass: 'CentrifugalPump', componentClassURI: URI.CENTRIFUGAL_PUMP_URI, displayName: 'Stormwater Pump', category: 'rotating', typicalQuantity: { min: 2, max: 10 } },
                        { componentClass: 'GateValve', componentClassURI: URI.GATE_VALVE_URI, displayName: 'Sluice Gate', category: 'piping', typicalQuantity: { min: 4, max: 16 } },
                        { componentClass: 'LevelIndicator', componentClassURI: URI.LEVEL_INDICATOR_URI, displayName: 'Basin Level Sensor', category: 'instrumentation', typicalQuantity: { min: 2, max: 8 } },
                        { componentClass: 'FlowMeter', componentClassURI: URI.FLOW_METER_URI, displayName: 'Weir Flow Meter', category: 'instrumentation', typicalQuantity: { min: 1, max: 4 } },
                    ],
                },
            ],
        },
    ],
};
