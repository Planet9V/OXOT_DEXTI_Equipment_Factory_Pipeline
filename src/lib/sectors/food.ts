/**
 * CISA Sector 10: Food and Agriculture Sector.
 *
 * The Food and Agriculture Sector is almost entirely privately owned and
 * composed of an estimated 2.1 million farms, 935,000+ restaurants, and
 * more than 200,000 registered food manufacturing, processing, and storage
 * facilities. The sector accounts for roughly one-fifth of U.S. economic activity.
 *
 * SRMA: U.S. Department of Agriculture (USDA) and Department of Health
 * and Human Services (HHS/FDA).
 *
 * References:
 *   - USDA (2024). Food and Agriculture Sector-Specific Plan.
 *   - FDA 21 CFR Part 117 — Current Good Manufacturing Practice, Hazard Analysis,
 *     and Risk-Based Preventive Controls for Human Food.
 *   - FSMA — Food Safety Modernization Act (2011).
 *
 * @module sectors/food
 */

import { DexpiSector } from './types';
import * as URI from './uris';

export const FOOD_SECTOR: DexpiSector = {
    code: 'FOOD',
    name: 'Food and Agriculture',
    icon: 'Wheat',
    description:
        'Agriculture production, animal husbandry, food processing and manufacturing, ' +
        'cold chain logistics, and food distribution networks feeding over 330 million Americans.',
    color: '#84CC16',
    srma: 'USDA/HHS',
    subSectors: [
        {
            code: 'FOOD-AG',
            name: 'Agriculture and Farming',
            description:
                'Crop production, irrigation systems, greenhouse operations, and precision agriculture ' +
                'technology supporting domestic food and fiber supply.',
            facilities: [
                {
                    code: 'FOOD-AG-GRAIN',
                    name: 'Grain Elevator and Storage Complex',
                    description:
                        'Grain receiving, drying, storage, and shipping facility with concrete silos, ' +
                        'bucket elevators, aeration systems, and rail/truck loadout. Capacity 500K–10M+ bushels.',
                    equipment: [
                        { componentClass: 'Conveyor', componentClassURI: URI.CONVEYOR_URI, displayName: 'Bucket Elevator', category: 'rotating', typicalQuantity: { min: 4, max: 16 } },
                        { componentClass: 'Silo', componentClassURI: URI.SILO_URI, displayName: 'Concrete Grain Silo', category: 'static', typicalQuantity: { min: 6, max: 40 } },
                        { componentClass: 'Fan', componentClassURI: URI.FAN_URI, displayName: 'Grain Aeration Fan', category: 'rotating', typicalQuantity: { min: 6, max: 40 } },
                        { componentClass: 'Dryer', componentClassURI: URI.DRYER_URI, displayName: 'Grain Dryer (Mixed-Flow)', category: 'heat-transfer', typicalQuantity: { min: 1, max: 4 } },
                        { componentClass: 'Motor', componentClassURI: URI.MOTOR_URI, displayName: 'Conveyor Drive Motor', category: 'electrical', typicalQuantity: { min: 8, max: 30 } },
                    ],
                },
            ],
        },
        {
            code: 'FOOD-AN',
            name: 'Animal Agriculture',
            description:
                'Livestock operations, poultry houses, aquaculture, feedlots, and veterinary ' +
                'pharmaceutical facilities.',
            facilities: [
                {
                    code: 'FOOD-AN-DAIR',
                    name: 'Commercial Dairy Farm',
                    description:
                        'Large-scale dairy operation (1,000–10,000+ head) with rotary milking parlors, ' +
                        'milk cooling/storage tanks, manure digestion, and feed mixing systems.',
                    equipment: [
                        { componentClass: 'CentrifugalPump', componentClassURI: URI.CENTRIFUGAL_PUMP_URI, displayName: 'Milk Transfer Pump', category: 'rotating', typicalQuantity: { min: 4, max: 12 } },
                        { componentClass: 'StorageTank', componentClassURI: URI.TANK_URI, displayName: 'Bulk Milk Cooler/Tank', category: 'static', typicalQuantity: { min: 2, max: 6 } },
                        { componentClass: 'Mixer', componentClassURI: URI.MIXER_URI, displayName: 'TMR Feed Mixer', category: 'rotating', typicalQuantity: { min: 1, max: 4 } },
                        { componentClass: 'PressureVessel', componentClassURI: URI.PRESSURE_VESSEL_URI, displayName: 'Anaerobic Digester', category: 'static', typicalQuantity: { min: 1, max: 3 } },
                        { componentClass: 'ElectricGenerator', componentClassURI: URI.ELECTRIC_GENERATOR_URI, displayName: 'Biogas Generator', category: 'electrical', typicalQuantity: { min: 1, max: 2 } },
                    ],
                },
            ],
        },
        {
            code: 'FOOD-FP',
            name: 'Food Processing',
            description:
                'Meatpacking, dairy processing, beverage manufacturing, grain milling, and prepared ' +
                'food manufacturing under FSMA/HACCP regulatory frameworks.',
            facilities: [
                {
                    code: 'FOOD-FP-MEAT',
                    name: 'Meatpacking Plant',
                    description:
                        'USDA-inspected slaughter and fabrication facility with kill floor, carcass chilling, ' +
                        'cutting/deboning, packaging, and cold storage. Capacity 1,000–6,000+ head/day.',
                    equipment: [
                        { componentClass: 'Compressor', componentClassURI: URI.COMPRESSOR_URI, displayName: 'Ammonia Refrigeration Compressor', category: 'rotating', typicalQuantity: { min: 4, max: 12 } },
                        { componentClass: 'Condenser', componentClassURI: URI.CONDENSER_URI, displayName: 'Evaporative Condenser', category: 'heat-transfer', typicalQuantity: { min: 2, max: 8 } },
                        { componentClass: 'Boiler', componentClassURI: URI.BOILER_URI, displayName: 'Process Steam Boiler', category: 'heat-transfer', typicalQuantity: { min: 1, max: 4 } },
                        { componentClass: 'CentrifugalPump', componentClassURI: URI.CENTRIFUGAL_PUMP_URI, displayName: 'CIP Pump', category: 'rotating', typicalQuantity: { min: 4, max: 16 } },
                        { componentClass: 'Conveyor', componentClassURI: URI.CONVEYOR_URI, displayName: 'Processing Line Conveyor', category: 'rotating', typicalQuantity: { min: 10, max: 40 } },
                        { componentClass: 'StorageTank', componentClassURI: URI.TANK_URI, displayName: 'Wastewater Equalization Tank', category: 'static', typicalQuantity: { min: 1, max: 4 } },
                    ],
                },
            ],
        },
        {
            code: 'FOOD-FD',
            name: 'Food Distribution',
            description:
                'Cold chain logistics, grocery distribution warehouses, food service distributors, ' +
                'and retail food establishments maintaining the farm-to-fork supply chain.',
            facilities: [
                {
                    code: 'FOOD-FD-COLD',
                    name: 'Cold Storage Distribution Center',
                    description:
                        'Temperature-controlled warehouse (-20°F to 40°F) for perishable food storage ' +
                        'and distribution with multi-temperature zones, rapid dock levelers, and automated ' +
                        'storage/retrieval systems (AS/RS).',
                    equipment: [
                        { componentClass: 'Compressor', componentClassURI: URI.COMPRESSOR_URI, displayName: 'Refrigeration Screw Compressor', category: 'rotating', typicalQuantity: { min: 4, max: 12 } },
                        { componentClass: 'Condenser', componentClassURI: URI.CONDENSER_URI, displayName: 'Rooftop Condenser', category: 'heat-transfer', typicalQuantity: { min: 4, max: 12 } },
                        { componentClass: 'Fan', componentClassURI: URI.FAN_URI, displayName: 'Evaporator Fan', category: 'rotating', typicalQuantity: { min: 10, max: 40 } },
                        { componentClass: 'ElectricGenerator', componentClassURI: URI.ELECTRIC_GENERATOR_URI, displayName: 'Emergency Generator', category: 'electrical', typicalQuantity: { min: 1, max: 4 } },
                        { componentClass: 'Conveyor', componentClassURI: URI.CONVEYOR_URI, displayName: 'AS/RS Conveyor', category: 'rotating', typicalQuantity: { min: 6, max: 30 } },
                    ],
                },
            ],
        },
    ],
};
