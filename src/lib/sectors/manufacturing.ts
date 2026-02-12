/**
 * CISA Sector 04: Critical Manufacturing Sector.
 *
 * Encompasses industries that are essential to the economic prosperity and
 * continuity of the United States government and its defense infrastructure.
 * A direct attack on or disruption of certain elements of manufacturing
 * could disrupt essential functions at the national level.
 *
 * SRMA: Department of Homeland Security / CISA.
 *
 * References:
 *   - CISA (2024). Critical Manufacturing Sector-Specific Plan.
 *   - NAICS Codes 331, 332, 333, 335, 336 — U.S. Census Bureau.
 *   - OSHA 29 CFR 1910 — General Industry Standards.
 *
 * @module sectors/manufacturing
 */

import { DexpiSector } from './types';
import * as URI from './uris';

export const MANUFACTURING_SECTOR: DexpiSector = {
    code: 'CMAN',
    name: 'Critical Manufacturing',
    icon: 'Factory',
    description:
        'Primary metals manufacturing, machinery manufacturing, electrical equipment and ' +
        'component manufacturing, and transportation equipment manufacturing. These industries ' +
        'produce essential materials and products for defense, energy, and national infrastructure.',
    color: '#6366F1',
    srma: 'DHS/CISA',
    subSectors: [
        {
            code: 'CMAN-PM',
            name: 'Primary Metals',
            description:
                'Smelting, refining, and rolling of ferrous (iron, steel) and non-ferrous (aluminum, ' +
                'copper, titanium) metals from ore, scrap, or ingots into semi-finished products.',
            facilities: [
                {
                    code: 'CMAN-PM-STEEL',
                    name: 'Integrated Steel Mill',
                    description:
                        'Full-cycle steelmaking facility with blast furnace (BF) ironmaking, basic oxygen ' +
                        'furnace (BOF) steelmaking, continuous casting, and hot/cold rolling mills producing ' +
                        'flat and long products. Capacity 2–10+ MTPA.',
                    equipment: [
                        { componentClass: 'Furnace', componentClassURI: URI.FURNACE_URI, displayName: 'Blast Furnace', category: 'heat-transfer', typicalQuantity: { min: 1, max: 3 } },
                        { componentClass: 'PressureVessel', componentClassURI: URI.PRESSURE_VESSEL_URI, displayName: 'Basic Oxygen Furnace (BOF)', category: 'static', typicalQuantity: { min: 1, max: 3 } },
                        { componentClass: 'Blower', componentClassURI: URI.BLOWER_URI, displayName: 'Hot Blast Stove Blower', category: 'rotating', typicalQuantity: { min: 2, max: 6 } },
                        { componentClass: 'CentrifugalPump', componentClassURI: URI.CENTRIFUGAL_PUMP_URI, displayName: 'Cooling Water Pump', category: 'rotating', typicalQuantity: { min: 10, max: 30 } },
                        { componentClass: 'Conveyor', componentClassURI: URI.CONVEYOR_URI, displayName: 'Raw Material Conveyor', category: 'rotating', typicalQuantity: { min: 6, max: 20 } },
                        { componentClass: 'Motor', componentClassURI: URI.MOTOR_URI, displayName: 'Rolling Mill Drive Motor', category: 'electrical', typicalQuantity: { min: 4, max: 16 } },
                        { componentClass: 'Transformer', componentClassURI: URI.TRANSFORMER_URI, displayName: 'Arc Furnace Transformer', category: 'electrical', typicalQuantity: { min: 1, max: 4 } },
                        { componentClass: 'Scrubber', componentClassURI: URI.SCRUBBER_URI, displayName: 'Gas Cleaning Scrubber', category: 'static', typicalQuantity: { min: 2, max: 6 } },
                        { componentClass: 'CoolingTower', componentClassURI: URI.COOLING_TOWER_URI, displayName: 'Process Cooling Tower', category: 'heat-transfer', typicalQuantity: { min: 2, max: 8 } },
                    ],
                },
                {
                    code: 'CMAN-PM-ALUM',
                    name: 'Aluminum Smelter',
                    description:
                        'Hall-Héroult electrolytic reduction of alumina to aluminum metal in carbon-lined ' +
                        'pots at ~960°C. Requires large, low-cost electricity supply (13–16 kWh/kg Al).',
                    equipment: [
                        { componentClass: 'Electrolyzer', componentClassURI: URI.ELECTROLYZER_URI, displayName: 'Electrolytic Pot (Reduction Cell)', category: 'electrical', typicalQuantity: { min: 100, max: 500 } },
                        { componentClass: 'Furnace', componentClassURI: URI.FURNACE_URI, displayName: 'Anode Baking Furnace', category: 'heat-transfer', typicalQuantity: { min: 1, max: 4 } },
                        { componentClass: 'Transformer', componentClassURI: URI.TRANSFORMER_URI, displayName: 'Potline Rectifier Transformer', category: 'electrical', typicalQuantity: { min: 2, max: 8 } },
                        { componentClass: 'Scrubber', componentClassURI: URI.SCRUBBER_URI, displayName: 'Fume Treatment Center (FTC)', category: 'static', typicalQuantity: { min: 2, max: 6 } },
                        { componentClass: 'Kiln', componentClassURI: URI.KILN_URI, displayName: 'Calcination Kiln', category: 'heat-transfer', typicalQuantity: { min: 1, max: 2 } },
                    ],
                },
            ],
        },
        {
            code: 'CMAN-MA',
            name: 'Machinery Manufacturing',
            description:
                'Production of engines, turbines, metalworking machinery, HVAC equipment, and ' +
                'industrial machinery for agriculture, construction, and mining (NAICS 333).',
            facilities: [
                {
                    code: 'CMAN-MA-HEAVY',
                    name: 'Heavy Equipment Manufacturing Plant',
                    description:
                        'Large-scale manufacturing facility for earth-moving, mining, and construction ' +
                        'equipment with CNC machining centers, robotic welding, and paint/assembly lines.',
                    equipment: [
                        { componentClass: 'Motor', componentClassURI: URI.MOTOR_URI, displayName: 'CNC Spindle Motor', category: 'electrical', typicalQuantity: { min: 20, max: 100 } },
                        { componentClass: 'Compressor', componentClassURI: URI.COMPRESSOR_URI, displayName: 'Compressed Air System', category: 'rotating', typicalQuantity: { min: 2, max: 8 } },
                        { componentClass: 'Boiler', componentClassURI: URI.BOILER_URI, displayName: 'Paint Booth Heating Boiler', category: 'heat-transfer', typicalQuantity: { min: 1, max: 3 } },
                        { componentClass: 'CentrifugalPump', componentClassURI: URI.CENTRIFUGAL_PUMP_URI, displayName: 'Coolant Pump', category: 'rotating', typicalQuantity: { min: 10, max: 40 } },
                        { componentClass: 'Conveyor', componentClassURI: URI.CONVEYOR_URI, displayName: 'Assembly Line Conveyor', category: 'rotating', typicalQuantity: { min: 4, max: 16 } },
                    ],
                },
            ],
        },
        {
            code: 'CMAN-EE',
            name: 'Electrical Equipment',
            description:
                'Manufacturing of transformers, electric motors, generators, switchgear, batteries, ' +
                'and electronic components (NAICS 335).',
            facilities: [
                {
                    code: 'CMAN-EE-TRANS',
                    name: 'Power Transformer Factory',
                    description:
                        'Specialized manufacturing facility for large power transformers (LPTs) including ' +
                        'core winding, insulation assembly, vacuum treatment, and oil filling in clean-room ' +
                        'conditions. Critical supply chain for the bulk electric system.',
                    equipment: [
                        { componentClass: 'Furnace', componentClassURI: URI.FURNACE_URI, displayName: 'Core Annealing Oven', category: 'heat-transfer', typicalQuantity: { min: 1, max: 3 } },
                        { componentClass: 'PressureVessel', componentClassURI: URI.PRESSURE_VESSEL_URI, displayName: 'Vacuum Drying Chamber', category: 'static', typicalQuantity: { min: 1, max: 3 } },
                        { componentClass: 'StorageTank', componentClassURI: URI.TANK_URI, displayName: 'Transformer Oil Tank', category: 'static', typicalQuantity: { min: 2, max: 8 } },
                        { componentClass: 'CentrifugalPump', componentClassURI: URI.CENTRIFUGAL_PUMP_URI, displayName: 'Oil Fill Pump', category: 'rotating', typicalQuantity: { min: 2, max: 6 } },
                    ],
                },
            ],
        },
        {
            code: 'CMAN-TE',
            name: 'Transportation Equipment',
            description:
                'Manufacturing of motor vehicles, aerospace products, ships, railroad rolling stock, ' +
                'and military vehicles (NAICS 336).',
            facilities: [
                {
                    code: 'CMAN-TE-AERO',
                    name: 'Aerospace Manufacturing Facility',
                    description:
                        'Aircraft final assembly and component manufacturing facility with composite ' +
                        'layup, autoclave curing, CNC machining, and systems integration bays.',
                    equipment: [
                        { componentClass: 'Autoclave', componentClassURI: URI.AUTOCLAVE_URI, displayName: 'Composite Curing Autoclave', category: 'static', typicalQuantity: { min: 1, max: 4 } },
                        { componentClass: 'Compressor', componentClassURI: URI.COMPRESSOR_URI, displayName: 'Plant Air Compressor', category: 'rotating', typicalQuantity: { min: 2, max: 6 } },
                        { componentClass: 'CoolingTower', componentClassURI: URI.COOLING_TOWER_URI, displayName: 'Process Cooling Tower', category: 'heat-transfer', typicalQuantity: { min: 1, max: 3 } },
                        { componentClass: 'Filter', componentClassURI: URI.FILTER_URI, displayName: 'Clean Room HEPA Filter', category: 'static', typicalQuantity: { min: 20, max: 100 } },
                        { componentClass: 'Motor', componentClassURI: URI.MOTOR_URI, displayName: 'CNC Machine Motor', category: 'electrical', typicalQuantity: { min: 10, max: 50 } },
                    ],
                },
            ],
        },
    ],
};
