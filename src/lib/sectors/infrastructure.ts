/**
 * CISA Sectors: Communications, Commercial Facilities, Dams, Defense Industrial Base.
 *
 * This module consolidates four CISA sectors whose physical equipment profiles
 * are primarily electrical and infrastructure-support oriented rather than
 * process-industry focused.
 *
 * @module sectors/infrastructure
 */

import { DexpiSector } from './types';
import * as URI from './uris';

/** CISA Sector 03: Communications. SRMA: DHS/CISA. */
export const COMMUNICATIONS_SECTOR: DexpiSector = {
    code: 'COMU',
    slug: 'communications',
    name: 'Communications',
    icon: 'Radio',
    description:
        'Wireline, wireless, satellite, cable, and broadcasting infrastructure providing the ' +
        'backbone for voice, data, and video communications essential to national security, ' +
        'emergency response, and economic activity.',
    color: '#3B82F6',
    srma: 'DHS/CISA',
    subSectors: [
        {
            code: 'COMU-WR',
            name: 'Wireline',
            description: 'Landline telephone networks, fiber optic backbone, and internet exchange points.',
            facilities: [{
                code: 'COMU-WR-CO',
                name: 'Central Office / Internet Exchange',
                description: 'Telecommunications central office housing optical line terminals, routers, and network switches with redundant power and cooling.',
                equipment: [
                    { componentClass: 'ElectricGenerator', componentClassURI: URI.ELECTRIC_GENERATOR_URI, displayName: 'Diesel Backup Generator', category: 'electrical', typicalQuantity: { min: 2, max: 6 } },
                    { componentClass: 'UPS', componentClassURI: URI.UPS_URI, displayName: '-48V DC Rectifier/UPS', category: 'electrical', typicalQuantity: { min: 4, max: 16 } },
                    { componentClass: 'CoolingTower', componentClassURI: URI.COOLING_TOWER_URI, displayName: 'Precision Cooling Unit', category: 'heat-transfer', typicalQuantity: { min: 2, max: 8 } },
                    { componentClass: 'Transformer', componentClassURI: URI.TRANSFORMER_URI, displayName: 'Utility Transformer', category: 'electrical', typicalQuantity: { min: 1, max: 4 } },
                ],
            }],
        },
        {
            code: 'COMU-WL',
            name: 'Wireless',
            description: 'Cellular networks (4G LTE, 5G NR), microwave backhaul, and mobile infrastructure.',
            facilities: [{
                code: 'COMU-WL-CELL',
                name: 'Cell Tower Site',
                description: 'Macro cell site with radio units, baseband processing, battery backup, and fiber/microwave backhaul.',
                equipment: [
                    { componentClass: 'ElectricGenerator', componentClassURI: URI.ELECTRIC_GENERATOR_URI, displayName: 'Portable Diesel Generator', category: 'electrical', typicalQuantity: { min: 0, max: 1 } },
                    { componentClass: 'UPS', componentClassURI: URI.UPS_URI, displayName: 'Battery Backup System', category: 'electrical', typicalQuantity: { min: 1, max: 2 } },
                    { componentClass: 'Transformer', componentClassURI: URI.TRANSFORMER_URI, displayName: 'Pad-Mount Transformer', category: 'electrical', typicalQuantity: { min: 1, max: 1 } },
                ],
            }],
        },
        {
            code: 'COMU-ST',
            name: 'Satellite',
            description: 'Ground station earth terminals, satellite operations centers, and gateway facilities.',
            facilities: [{
                code: 'COMU-ST-GND',
                name: 'Satellite Ground Station',
                description: 'Earth station with steerable parabolic antennas, LNA/BUC electronics, and tracking systems.',
                equipment: [
                    { componentClass: 'ElectricGenerator', componentClassURI: URI.ELECTRIC_GENERATOR_URI, displayName: 'Backup Generator', category: 'electrical', typicalQuantity: { min: 1, max: 3 } },
                    { componentClass: 'UPS', componentClassURI: URI.UPS_URI, displayName: 'Critical Systems UPS', category: 'electrical', typicalQuantity: { min: 2, max: 6 } },
                    { componentClass: 'Motor', componentClassURI: URI.MOTOR_URI, displayName: 'Antenna Positioner Motor', category: 'electrical', typicalQuantity: { min: 2, max: 10 } },
                    { componentClass: 'CoolingTower', componentClassURI: URI.COOLING_TOWER_URI, displayName: 'Equipment Room Cooling', category: 'heat-transfer', typicalQuantity: { min: 1, max: 4 } },
                ],
            }],
        },
        {
            code: 'COMU-CB',
            name: 'Cable and Broadcasting',
            description: 'Cable TV headends, broadcast transmitters, and content distribution networks.',
            facilities: [{
                code: 'COMU-CB-HEAD',
                name: 'Cable Headend / Broadcast Transmitter',
                description: 'Cable television headend or broadcast transmission facility with satellite receive, signal processing, and high-power RF transmission.',
                equipment: [
                    { componentClass: 'ElectricGenerator', componentClassURI: URI.ELECTRIC_GENERATOR_URI, displayName: 'Emergency Generator', category: 'electrical', typicalQuantity: { min: 1, max: 3 } },
                    { componentClass: 'UPS', componentClassURI: URI.UPS_URI, displayName: 'Broadcast UPS', category: 'electrical', typicalQuantity: { min: 2, max: 6 } },
                    { componentClass: 'CoolingTower', componentClassURI: URI.COOLING_TOWER_URI, displayName: 'Transmitter Cooling', category: 'heat-transfer', typicalQuantity: { min: 1, max: 3 } },
                    { componentClass: 'Transformer', componentClassURI: URI.TRANSFORMER_URI, displayName: 'HV Power Transformer', category: 'electrical', typicalQuantity: { min: 1, max: 2 } },
                ],
            }],
        },
    ],
};

/** CISA Sector 02: Commercial Facilities. SRMA: DHS/CISA. */
export const COMMERCIAL_SECTOR: DexpiSector = {
    code: 'COMM',
    slug: 'commercial-facilities',
    name: 'Commercial Facilities',
    icon: 'Building2',
    description:
        'Entertainment, gaming, lodging, outdoor events, public assembly, real estate, retail, ' +
        'and sports venues encompassing sites that draw large crowds and are generally open to ' +
        'the public, making them inherently vulnerable to attack.',
    color: '#F97316',
    srma: 'DHS/CISA',
    subSectors: [
        {
            code: 'COMM-EN', name: 'Entertainment and Media',
            description: 'Theme parks, museums, movie studios, convention centers.',
            facilities: [{
                code: 'COMM-EN-CONV', name: 'Convention Center', description: 'Large exhibition hall with HVAC, fire suppression, and emergency power systems.',
                equipment: [
                    { componentClass: 'Boiler', componentClassURI: URI.BOILER_URI, displayName: 'HVAC Boiler', category: 'heat-transfer', typicalQuantity: { min: 2, max: 6 } },
                    { componentClass: 'CoolingTower', componentClassURI: URI.COOLING_TOWER_URI, displayName: 'Cooling Tower', category: 'heat-transfer', typicalQuantity: { min: 2, max: 8 } },
                    { componentClass: 'ElectricGenerator', componentClassURI: URI.ELECTRIC_GENERATOR_URI, displayName: 'Emergency Generator', category: 'electrical', typicalQuantity: { min: 2, max: 6 } },
                    { componentClass: 'CentrifugalPump', componentClassURI: URI.CENTRIFUGAL_PUMP_URI, displayName: 'Fire Pump', category: 'rotating', typicalQuantity: { min: 1, max: 3 } },
                ],
            }],
        },
        {
            code: 'COMM-GM', name: 'Gaming',
            description: 'Casinos, racetracks, and gaming establishments.',
            facilities: [{
                code: 'COMM-GM-CAS', name: 'Casino Resort', description: 'Major casino complex with extensive electrical, HVAC, and security infrastructure.',
                equipment: [
                    { componentClass: 'ElectricGenerator', componentClassURI: URI.ELECTRIC_GENERATOR_URI, displayName: 'Backup Generator', category: 'electrical', typicalQuantity: { min: 4, max: 12 } },
                    { componentClass: 'UPS', componentClassURI: URI.UPS_URI, displayName: 'Gaming Floor UPS', category: 'electrical', typicalQuantity: { min: 6, max: 20 } },
                    { componentClass: 'CoolingTower', componentClassURI: URI.COOLING_TOWER_URI, displayName: 'Central Plant Cooling', category: 'heat-transfer', typicalQuantity: { min: 2, max: 8 } },
                ],
            }],
        },
        {
            code: 'COMM-LO', name: 'Lodging',
            description: 'Hotels, motels, and resorts.',
            facilities: [{
                code: 'COMM-LO-HTL', name: 'High-Rise Hotel', description: 'Multi-story hotel with central plant, fire suppression, and elevator systems.',
                equipment: [
                    { componentClass: 'Boiler', componentClassURI: URI.BOILER_URI, displayName: 'Central Boiler', category: 'heat-transfer', typicalQuantity: { min: 2, max: 4 } },
                    { componentClass: 'CentrifugalPump', componentClassURI: URI.CENTRIFUGAL_PUMP_URI, displayName: 'Domestic Water Booster Pump', category: 'rotating', typicalQuantity: { min: 2, max: 6 } },
                    { componentClass: 'ElectricGenerator', componentClassURI: URI.ELECTRIC_GENERATOR_URI, displayName: 'Life Safety Generator', category: 'electrical', typicalQuantity: { min: 1, max: 2 } },
                ],
            }],
        },
        {
            code: 'COMM-PA', name: 'Public Assembly',
            description: 'Arenas, stadiums, performing arts venues, and houses of worship.',
            facilities: [{
                code: 'COMM-PA-STAD', name: 'Sports Stadium', description: 'Major sports venue (30,000–80,000+ capacity) with extensive power, HVAC, and life safety systems.',
                equipment: [
                    { componentClass: 'Transformer', componentClassURI: URI.TRANSFORMER_URI, displayName: 'Substation Transformer', category: 'electrical', typicalQuantity: { min: 4, max: 12 } },
                    { componentClass: 'ElectricGenerator', componentClassURI: URI.ELECTRIC_GENERATOR_URI, displayName: 'Emergency Generator', category: 'electrical', typicalQuantity: { min: 2, max: 8 } },
                    { componentClass: 'CentrifugalPump', componentClassURI: URI.CENTRIFUGAL_PUMP_URI, displayName: 'Fire Pump', category: 'rotating', typicalQuantity: { min: 2, max: 4 } },
                    { componentClass: 'CoolingTower', componentClassURI: URI.COOLING_TOWER_URI, displayName: 'Cooling Tower', category: 'heat-transfer', typicalQuantity: { min: 2, max: 8 } },
                ],
            }],
        },
        {
            code: 'COMM-RE', name: 'Real Estate',
            description: 'Office buildings, condominiums, and mixed-use commercial properties.',
            facilities: [{
                code: 'COMM-RE-OFC', name: 'Class A Office Tower', description: 'Modern high-rise office with advanced BMS, redundant power, and LEED-certified mechanical systems.',
                equipment: [
                    { componentClass: 'Boiler', componentClassURI: URI.BOILER_URI, displayName: 'Condensing Boiler', category: 'heat-transfer', typicalQuantity: { min: 2, max: 6 } },
                    { componentClass: 'CoolingTower', componentClassURI: URI.COOLING_TOWER_URI, displayName: 'Cooling Tower', category: 'heat-transfer', typicalQuantity: { min: 2, max: 6 } },
                    { componentClass: 'CentrifugalPump', componentClassURI: URI.CENTRIFUGAL_PUMP_URI, displayName: 'Chilled Water Pump', category: 'rotating', typicalQuantity: { min: 4, max: 12 } },
                    { componentClass: 'ElectricGenerator', componentClassURI: URI.ELECTRIC_GENERATOR_URI, displayName: 'Standby Generator', category: 'electrical', typicalQuantity: { min: 1, max: 4 } },
                    { componentClass: 'Switchgear', componentClassURI: URI.SWITCHGEAR_URI, displayName: 'Main Switchgear', category: 'electrical', typicalQuantity: { min: 2, max: 4 } },
                ],
            }],
        },
        {
            code: 'COMM-RT', name: 'Retail',
            description: 'Shopping malls, retail centers, and large-format retailers.',
            facilities: [{
                code: 'COMM-RT-MALL', name: 'Regional Shopping Center', description: 'Enclosed shopping mall with central HVAC, fire suppression, and parking infrastructure.',
                equipment: [
                    { componentClass: 'Boiler', componentClassURI: URI.BOILER_URI, displayName: 'Central Heating Plant', category: 'heat-transfer', typicalQuantity: { min: 2, max: 6 } },
                    { componentClass: 'CoolingTower', componentClassURI: URI.COOLING_TOWER_URI, displayName: 'Rooftop Cooling Tower', category: 'heat-transfer', typicalQuantity: { min: 2, max: 8 } },
                    { componentClass: 'ElectricGenerator', componentClassURI: URI.ELECTRIC_GENERATOR_URI, displayName: 'Emergency Generator', category: 'electrical', typicalQuantity: { min: 1, max: 4 } },
                ],
            }],
        },
    ],
};

/** CISA Sector 05: Dams. SRMA: DHS/CISA. */
export const DAMS_SECTOR: DexpiSector = {
    code: 'DAMS',
    slug: 'dams',
    name: 'Dams',
    icon: 'Waves',
    description:
        'Hydroelectric dams, flood control structures, navigation locks, irrigation dams, ' +
        'mine tailings impoundments, levees, and hurricane barriers. Over 91,000 dams in ' +
        'the National Inventory of Dams (NID).',
    color: '#0EA5E9',
    srma: 'DHS/CISA',
    subSectors: [
        {
            code: 'DAMS-HY', name: 'Hydroelectric',
            description: 'Dams with integrated hydroelectric power generation facilities.',
            facilities: [{
                code: 'DAMS-HY-LRG', name: 'Large Hydroelectric Dam', description: 'Major hydroelectric dam with Kaplan or Francis turbines, penstocks, spillways, and fish passage.',
                equipment: [
                    { componentClass: 'Turbine', componentClassURI: URI.TURBINE_URI, displayName: 'Hydraulic Turbine (Francis/Kaplan)', category: 'rotating', typicalQuantity: { min: 2, max: 12 } },
                    { componentClass: 'ElectricGenerator', componentClassURI: URI.ELECTRIC_GENERATOR_URI, displayName: 'Synchronous Generator', category: 'electrical', typicalQuantity: { min: 2, max: 12 } },
                    { componentClass: 'Transformer', componentClassURI: URI.TRANSFORMER_URI, displayName: 'Step-Up Transformer', category: 'electrical', typicalQuantity: { min: 2, max: 12 } },
                    { componentClass: 'GateValve', componentClassURI: URI.GATE_VALVE_URI, displayName: 'Intake Gate', category: 'piping', typicalQuantity: { min: 2, max: 12 } },
                    { componentClass: 'CentrifugalPump', componentClassURI: URI.CENTRIFUGAL_PUMP_URI, displayName: 'Drainage/Unwatering Pump', category: 'rotating', typicalQuantity: { min: 2, max: 8 } },
                    { componentClass: 'Switchgear', componentClassURI: URI.SWITCHGEAR_URI, displayName: 'HV Switchgear', category: 'electrical', typicalQuantity: { min: 2, max: 8 } },
                ],
            }],
        },
        {
            code: 'DAMS-FC', name: 'Flood Control',
            description: 'Flood control dams, levees, hurricane barriers, and diversion structures.',
            facilities: [{
                code: 'DAMS-FC-LEV', name: 'Levee System and Pump Station', description: 'Engineered levee with interior drainage pump stations, closure structures, and monitoring.',
                equipment: [
                    { componentClass: 'CentrifugalPump', componentClassURI: URI.CENTRIFUGAL_PUMP_URI, displayName: 'Stormwater Pump', category: 'rotating', typicalQuantity: { min: 4, max: 20 } },
                    { componentClass: 'Motor', componentClassURI: URI.MOTOR_URI, displayName: 'Pump Drive Motor', category: 'electrical', typicalQuantity: { min: 4, max: 20 } },
                    { componentClass: 'ElectricGenerator', componentClassURI: URI.ELECTRIC_GENERATOR_URI, displayName: 'Emergency Diesel Generator', category: 'electrical', typicalQuantity: { min: 2, max: 8 } },
                    { componentClass: 'GateValve', componentClassURI: URI.GATE_VALVE_URI, displayName: 'Floodgate/Closure Structure', category: 'piping', typicalQuantity: { min: 2, max: 10 } },
                ],
            }],
        },
        {
            code: 'DAMS-NV', name: 'Navigation Locks',
            description: 'Lock and dam structures enabling river navigation on inland waterways.',
            facilities: [{
                code: 'DAMS-NV-LOCK', name: 'Navigation Lock', description: 'Lock chamber with miter gates, filling/emptying valves, and guide walls for vessel transit.',
                equipment: [
                    { componentClass: 'Motor', componentClassURI: URI.MOTOR_URI, displayName: 'Miter Gate Operating Motor', category: 'electrical', typicalQuantity: { min: 2, max: 8 } },
                    { componentClass: 'GateValve', componentClassURI: URI.GATE_VALVE_URI, displayName: 'Lock Filling Valve', category: 'piping', typicalQuantity: { min: 4, max: 12 } },
                    { componentClass: 'CentrifugalPump', componentClassURI: URI.CENTRIFUGAL_PUMP_URI, displayName: 'Dewatering Pump', category: 'rotating', typicalQuantity: { min: 2, max: 6 } },
                    { componentClass: 'ElectricGenerator', componentClassURI: URI.ELECTRIC_GENERATOR_URI, displayName: 'Standby Generator', category: 'electrical', typicalQuantity: { min: 1, max: 2 } },
                ],
            }],
        },
        {
            code: 'DAMS-IR', name: 'Irrigation',
            description: 'Irrigation dams and distribution canal systems for agricultural water supply.',
            facilities: [{
                code: 'DAMS-IR-DIV', name: 'Irrigation Diversion Dam', description: 'Low-head diversion structure with canal headworks, radial gates, and fish screens.',
                equipment: [
                    { componentClass: 'GateValve', componentClassURI: URI.GATE_VALVE_URI, displayName: 'Radial Gate', category: 'piping', typicalQuantity: { min: 2, max: 8 } },
                    { componentClass: 'CentrifugalPump', componentClassURI: URI.CENTRIFUGAL_PUMP_URI, displayName: 'Canal Lift Pump', category: 'rotating', typicalQuantity: { min: 2, max: 10 } },
                    { componentClass: 'FlowMeter', componentClassURI: URI.FLOW_METER_URI, displayName: 'Canal Flow Meter', category: 'instrumentation', typicalQuantity: { min: 2, max: 8 } },
                ],
            }],
        },
        {
            code: 'DAMS-TL', name: 'Mine Tailings and Levees',
            description: 'Mine tailings dams, tailings storage facilities, and industrial levees.',
            facilities: [{
                code: 'DAMS-TL-TAIL', name: 'Tailings Storage Facility', description: 'Engineered tailings dam retaining mining waste with seepage collection, decant towers, and monitoring.',
                equipment: [
                    { componentClass: 'CentrifugalPump', componentClassURI: URI.CENTRIFUGAL_PUMP_URI, displayName: 'Tailings Delivery Pump', category: 'rotating', typicalQuantity: { min: 4, max: 12 } },
                    { componentClass: 'Thickener', componentClassURI: URI.THICKENER_URI, displayName: 'Paste Thickener', category: 'static', typicalQuantity: { min: 1, max: 4 } },
                    { componentClass: 'Cyclone', componentClassURI: URI.CYCLONE_URI, displayName: 'Hydrocyclone', category: 'static', typicalQuantity: { min: 2, max: 8 } },
                    { componentClass: 'LevelIndicator', componentClassURI: URI.LEVEL_INDICATOR_URI, displayName: 'Pond Level Monitor', category: 'instrumentation', typicalQuantity: { min: 2, max: 8 } },
                ],
            }],
        },
    ],
};

/** CISA Sector 06: Defense Industrial Base. SRMA: DoD. */
export const DEFENSE_SECTOR: DexpiSector = {
    code: 'DEFN',
    slug: 'defense',
    name: 'Defense Industrial Base',
    icon: 'Shield',
    description:
        'The worldwide industrial complex that enables research, development, design, production, ' +
        'delivery, and maintenance of military weapons systems, subsystems, and components to ' +
        'meet U.S. military requirements.',
    color: '#475569',
    srma: 'DoD',
    subSectors: [
        {
            code: 'DEFN-AE', name: 'Aerospace',
            description: 'Military aircraft, missile systems, and spacecraft manufacturing.',
            facilities: [{
                code: 'DEFN-AE-FASM', name: 'Fighter Aircraft Final Assembly', description: 'Secure final assembly line for military aircraft with composite fabrication, systems integration, and flight test.',
                equipment: [
                    { componentClass: 'Autoclave', componentClassURI: URI.AUTOCLAVE_URI, displayName: 'Composite Autoclave', category: 'static', typicalQuantity: { min: 2, max: 6 } },
                    { componentClass: 'Compressor', componentClassURI: URI.COMPRESSOR_URI, displayName: 'Clean Room Air Compressor', category: 'rotating', typicalQuantity: { min: 2, max: 8 } },
                    { componentClass: 'CoolingTower', componentClassURI: URI.COOLING_TOWER_URI, displayName: 'Process Cooling Tower', category: 'heat-transfer', typicalQuantity: { min: 1, max: 4 } },
                    { componentClass: 'ElectricGenerator', componentClassURI: URI.ELECTRIC_GENERATOR_URI, displayName: 'Emergency Generator', category: 'electrical', typicalQuantity: { min: 2, max: 6 } },
                    { componentClass: 'Motor', componentClassURI: URI.MOTOR_URI, displayName: 'CNC Machine Motor', category: 'electrical', typicalQuantity: { min: 20, max: 100 } },
                ],
            }],
        },
        {
            code: 'DEFN-SH', name: 'Shipbuilding',
            description: 'Naval vessel construction and repair (aircraft carriers, submarines, destroyers).',
            facilities: [{
                code: 'DEFN-SH-YARD', name: 'Naval Shipyard', description: 'Major naval shipyard with dry docks, cranes, steel fabrication, and nuclear propulsion work.',
                equipment: [
                    { componentClass: 'Motor', componentClassURI: URI.MOTOR_URI, displayName: 'Gantry Crane Motor', category: 'electrical', typicalQuantity: { min: 10, max: 40 } },
                    { componentClass: 'CentrifugalPump', componentClassURI: URI.CENTRIFUGAL_PUMP_URI, displayName: 'Dry Dock Pump', category: 'rotating', typicalQuantity: { min: 4, max: 16 } },
                    { componentClass: 'Compressor', componentClassURI: URI.COMPRESSOR_URI, displayName: 'Shop Air Compressor', category: 'rotating', typicalQuantity: { min: 4, max: 12 } },
                    { componentClass: 'ElectricGenerator', componentClassURI: URI.ELECTRIC_GENERATOR_URI, displayName: 'Shore Power Generator', category: 'electrical', typicalQuantity: { min: 2, max: 8 } },
                    { componentClass: 'Furnace', componentClassURI: URI.FURNACE_URI, displayName: 'Heat Treatment Furnace', category: 'heat-transfer', typicalQuantity: { min: 2, max: 6 } },
                ],
            }],
        },
        {
            code: 'DEFN-GS', name: 'Ground Systems',
            description: 'Armored vehicles, artillery, small arms, and ammunition manufacturing.',
            facilities: [{
                code: 'DEFN-GS-TANK', name: 'Armored Vehicle Assembly Plant', description: 'Heavy vehicle production facility with armor welding, turret assembly, and vehicle testing.',
                equipment: [
                    { componentClass: 'Motor', componentClassURI: URI.MOTOR_URI, displayName: 'Robotic Welder Motor', category: 'electrical', typicalQuantity: { min: 10, max: 40 } },
                    { componentClass: 'Compressor', componentClassURI: URI.COMPRESSOR_URI, displayName: 'Shop Air System', category: 'rotating', typicalQuantity: { min: 2, max: 8 } },
                    { componentClass: 'Conveyor', componentClassURI: URI.CONVEYOR_URI, displayName: 'Assembly Conveyor', category: 'rotating', typicalQuantity: { min: 4, max: 12 } },
                    { componentClass: 'Furnace', componentClassURI: URI.FURNACE_URI, displayName: 'Paint Curing Oven', category: 'heat-transfer', typicalQuantity: { min: 1, max: 3 } },
                ],
            }],
        },
        {
            code: 'DEFN-EL', name: 'Defense Electronics',
            description: 'Radar, electronic warfare, C4ISR systems, and secure communications equipment.',
            facilities: [{
                code: 'DEFN-EL-FAB', name: 'Defense Electronics Fabrication Facility', description: 'ITAR-controlled electronics manufacturing with PCB assembly, RF testing, and TEMPEST shielding.',
                equipment: [
                    { componentClass: 'Compressor', componentClassURI: URI.COMPRESSOR_URI, displayName: 'Clean Dry Air System', category: 'rotating', typicalQuantity: { min: 1, max: 4 } },
                    { componentClass: 'Fan', componentClassURI: URI.FAN_URI, displayName: 'Clean Room Fan Filter Unit', category: 'rotating', typicalQuantity: { min: 10, max: 40 } },
                    { componentClass: 'UPS', componentClassURI: URI.UPS_URI, displayName: 'Test Lab UPS', category: 'electrical', typicalQuantity: { min: 4, max: 12 } },
                    { componentClass: 'ElectricGenerator', componentClassURI: URI.ELECTRIC_GENERATOR_URI, displayName: 'Emergency Generator', category: 'electrical', typicalQuantity: { min: 1, max: 3 } },
                ],
            }],
        },
    ],
};
