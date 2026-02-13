/**
 * CISA Sector 15: Transportation Systems Sector.
 *
 * The Transportation Systems Sector consists of seven key subsystems:
 * Aviation, Highway/Motor Carrier, Maritime, Mass Transit/Passenger Rail,
 * Pipeline Systems, Freight Rail, and Postal/Shipping. These systems move
 * people and goods across ~4 million miles of roadways, 25,000+ miles of
 * waterways, 140,000 miles of railroad, 600,000+ bridges, and 300+ ports.
 *
 * SRMA: DHS / Department of Transportation (DOT).
 *
 * References:
 *   - DOT (2024). Transportation Systems Sector-Specific Plan.
 *   - FAA Order 6850.2B — Visual Guidance Lighting Systems.
 *   - 49 CFR — Transportation Regulations.
 *   - ASCE Report Card for America's Infrastructure (2024).
 *
 * @module sectors/transportation
 */

import { DexpiSector } from './types';
import * as URI from './uris';

export const TRANSPORTATION_SECTOR: DexpiSector = {
    code: 'TRAN',
    slug: 'transportation',
    name: 'Transportation Systems',
    icon: 'Truck',
    description:
        'Aviation, highway infrastructure, maritime ports, mass transit, freight rail, ' +
        'pipeline systems, and postal/shipping networks enabling the movement of people ' +
        'and goods essential to national security and economic prosperity.',
    color: '#EC4899',
    srma: 'DHS/DOT',
    subSectors: [
        {
            code: 'TRAN-AV',
            name: 'Aviation',
            description:
                'Commercial and general aviation airports, air traffic control systems, airline ' +
                'operations, and aircraft maintenance facilities regulated by the FAA.',
            facilities: [
                {
                    code: 'TRAN-AV-ARPT',
                    name: 'Commercial Airport',
                    description:
                        'FAA-certified commercial airport with passenger terminals, runways, taxiways, ' +
                        'fuel farms, baggage handling, and ground support equipment (GSE) infrastructure.',
                    equipment: [
                        { componentClass: 'CentrifugalPump', componentClassURI: URI.CENTRIFUGAL_PUMP_URI, displayName: 'Jet Fuel Transfer Pump', category: 'rotating', typicalQuantity: { min: 4, max: 16 } },
                        { componentClass: 'StorageTank', componentClassURI: URI.TANK_URI, displayName: 'Aviation Fuel Tank', category: 'static', typicalQuantity: { min: 4, max: 20 } },
                        { componentClass: 'Filter', componentClassURI: URI.FILTER_URI, displayName: 'Fuel Filter/Water Separator', category: 'static', typicalQuantity: { min: 4, max: 16 } },
                        { componentClass: 'Transformer', componentClassURI: URI.TRANSFORMER_URI, displayName: 'Substation Transformer', category: 'electrical', typicalQuantity: { min: 2, max: 8 } },
                        { componentClass: 'ElectricGenerator', componentClassURI: URI.ELECTRIC_GENERATOR_URI, displayName: 'Emergency Diesel Generator', category: 'electrical', typicalQuantity: { min: 2, max: 6 } },
                        { componentClass: 'Boiler', componentClassURI: URI.BOILER_URI, displayName: 'Terminal HVAC Boiler', category: 'heat-transfer', typicalQuantity: { min: 2, max: 8 } },
                    ],
                },
            ],
        },
        {
            code: 'TRAN-MR',
            name: 'Maritime',
            description:
                'Seaports, inland waterways, vessel operations, and marine terminals handling ' +
                'containerized, bulk, and liquid cargo under MTSA and Coast Guard oversight.',
            facilities: [
                {
                    code: 'TRAN-MR-PORT',
                    name: 'Container Port Terminal',
                    description:
                        'Deep-water container port with ship-to-shore gantry cranes, rubber-tired gantry ' +
                        '(RTG) cranes, terminal tractors, reefer plug infrastructure, and customs processing.',
                    equipment: [
                        { componentClass: 'Motor', componentClassURI: URI.MOTOR_URI, displayName: 'Gantry Crane Hoist Motor', category: 'electrical', typicalQuantity: { min: 8, max: 40 } },
                        { componentClass: 'ElectricGenerator', componentClassURI: URI.ELECTRIC_GENERATOR_URI, displayName: 'Shore Power Generator', category: 'electrical', typicalQuantity: { min: 2, max: 8 } },
                        { componentClass: 'Transformer', componentClassURI: URI.TRANSFORMER_URI, displayName: 'Reefer Power Transformer', category: 'electrical', typicalQuantity: { min: 4, max: 20 } },
                        { componentClass: 'CentrifugalPump', componentClassURI: URI.CENTRIFUGAL_PUMP_URI, displayName: 'Ballast Water Pump', category: 'rotating', typicalQuantity: { min: 2, max: 8 } },
                    ],
                },
            ],
        },
        {
            code: 'TRAN-MT',
            name: 'Mass Transit and Passenger Rail',
            description:
                'Urban mass transit systems (subway, light rail, bus rapid transit), commuter ' +
                'rail, and intercity passenger rail (Amtrak) regulated by FTA and FRA.',
            facilities: [
                {
                    code: 'TRAN-MT-METRO',
                    name: 'Metro Rail System',
                    description:
                        'Urban heavy rail rapid transit system with underground and elevated stations, ' +
                        'third-rail or overhead catenary traction power, and automated signaling.',
                    equipment: [
                        { componentClass: 'Transformer', componentClassURI: URI.TRANSFORMER_URI, displayName: 'Traction Power Rectifier Transformer', category: 'electrical', typicalQuantity: { min: 10, max: 60 } },
                        { componentClass: 'Switchgear', componentClassURI: URI.SWITCHGEAR_URI, displayName: 'DC Switchgear', category: 'electrical', typicalQuantity: { min: 10, max: 60 } },
                        { componentClass: 'Fan', componentClassURI: URI.FAN_URI, displayName: 'Tunnel Ventilation Fan', category: 'rotating', typicalQuantity: { min: 10, max: 50 } },
                        { componentClass: 'CentrifugalPump', componentClassURI: URI.CENTRIFUGAL_PUMP_URI, displayName: 'Station Sump Pump', category: 'rotating', typicalQuantity: { min: 10, max: 60 } },
                        { componentClass: 'UPS', componentClassURI: URI.UPS_URI, displayName: 'Signaling UPS', category: 'electrical', typicalQuantity: { min: 10, max: 40 } },
                    ],
                },
            ],
        },
        {
            code: 'TRAN-PL',
            name: 'Pipeline Systems',
            description:
                'Hazardous liquid and natural gas pipeline networks regulated by PHMSA, including ' +
                'transmission pipelines, gathering lines, and distribution mains.',
            facilities: [
                {
                    code: 'TRAN-PL-COMP',
                    name: 'Gas Pipeline Compressor Station',
                    description:
                        'Natural gas pipeline compressor station maintaining line pressure for long-distance ' +
                        'transmission. Spaced 40–100 miles apart with gas turbine or electric motor driven compressors.',
                    equipment: [
                        { componentClass: 'CentrifugalCompressor', componentClassURI: URI.COMPRESSOR_URI, displayName: 'Pipeline Compressor', category: 'rotating', typicalQuantity: { min: 2, max: 6 } },
                        { componentClass: 'GasTurbine', componentClassURI: URI.GAS_TURBINE_URI, displayName: 'Compressor Drive Turbine', category: 'rotating', typicalQuantity: { min: 2, max: 6 } },
                        { componentClass: 'Separator', componentClassURI: URI.SEPARATOR_URI, displayName: 'Scrubber/Separator', category: 'static', typicalQuantity: { min: 2, max: 4 } },
                        { componentClass: 'Cooler', componentClassURI: URI.COOLER_URI, displayName: 'Aftercooler', category: 'heat-transfer', typicalQuantity: { min: 2, max: 6 } },
                        { componentClass: 'ControlValve', componentClassURI: URI.CONTROL_VALVE_URI, displayName: 'Station Control Valve', category: 'piping', typicalQuantity: { min: 4, max: 16 } },
                    ],
                },
            ],
        },
        {
            code: 'TRAN-RL',
            name: 'Freight Rail',
            description:
                'Freight railroad networks, classification yards, intermodal facilities, and ' +
                'locomotive maintenance depots operated by Class I, II, and III railroads.',
            facilities: [
                {
                    code: 'TRAN-RL-YARD',
                    name: 'Classification Yard',
                    description:
                        'Hump-type freight car classification yard sorting railcars by destination using ' +
                        'gravity, retarders, and automated switching for train makeup.',
                    equipment: [
                        { componentClass: 'Motor', componentClassURI: URI.MOTOR_URI, displayName: 'Retarder Motor', category: 'electrical', typicalQuantity: { min: 10, max: 40 } },
                        { componentClass: 'Compressor', componentClassURI: URI.COMPRESSOR_URI, displayName: 'Yard Air Compressor', category: 'rotating', typicalQuantity: { min: 2, max: 6 } },
                        { componentClass: 'ElectricGenerator', componentClassURI: URI.ELECTRIC_GENERATOR_URI, displayName: 'Yard Lighting Generator', category: 'electrical', typicalQuantity: { min: 1, max: 4 } },
                    ],
                },
            ],
        },
        {
            code: 'TRAN-HW',
            name: 'Highway and Motor Carrier',
            description:
                'Interstate highway system, bridges, tunnels, truck terminals, and motor carrier ' +
                'operations regulated by FMCSA.',
            facilities: [
                {
                    code: 'TRAN-HW-TUN',
                    name: 'Highway Tunnel',
                    description:
                        'Major vehicular tunnel with jet-fan longitudinal ventilation, fire suppression, ' +
                        'SCADA-controlled traffic management, and emergency egress systems.',
                    equipment: [
                        { componentClass: 'Fan', componentClassURI: URI.FAN_URI, displayName: 'Jet Ventilation Fan', category: 'rotating', typicalQuantity: { min: 10, max: 60 } },
                        { componentClass: 'CentrifugalPump', componentClassURI: URI.CENTRIFUGAL_PUMP_URI, displayName: 'Fire Suppression Pump', category: 'rotating', typicalQuantity: { min: 2, max: 6 } },
                        { componentClass: 'Transformer', componentClassURI: URI.TRANSFORMER_URI, displayName: 'Lighting Transformer', category: 'electrical', typicalQuantity: { min: 2, max: 8 } },
                        { componentClass: 'ElectricGenerator', componentClassURI: URI.ELECTRIC_GENERATOR_URI, displayName: 'Emergency Generator', category: 'electrical', typicalQuantity: { min: 1, max: 4 } },
                    ],
                },
            ],
        },
        {
            code: 'TRAN-PS',
            name: 'Postal and Shipping',
            description:
                'National postal service, express carriers, and package delivery networks ' +
                'providing essential logistics and supply chain connectivity.',
            facilities: [
                {
                    code: 'TRAN-PS-SORT',
                    name: 'Regional Sorting Facility',
                    description:
                        'High-speed automated mail and parcel sorting center with conveyor networks, ' +
                        'optical character recognition (OCR), and robotic singulation systems.',
                    equipment: [
                        { componentClass: 'Conveyor', componentClassURI: URI.CONVEYOR_URI, displayName: 'Sorting Conveyor', category: 'rotating', typicalQuantity: { min: 20, max: 100 } },
                        { componentClass: 'Motor', componentClassURI: URI.MOTOR_URI, displayName: 'Conveyor Drive Motor', category: 'electrical', typicalQuantity: { min: 20, max: 100 } },
                        { componentClass: 'Compressor', componentClassURI: URI.COMPRESSOR_URI, displayName: 'Pneumatic System Compressor', category: 'rotating', typicalQuantity: { min: 2, max: 6 } },
                    ],
                },
            ],
        },
    ],
};
