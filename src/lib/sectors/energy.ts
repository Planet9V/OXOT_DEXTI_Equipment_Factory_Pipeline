/**
 * CISA Sector 08: Energy Sector.
 *
 * The Energy Sector encompasses the production, refining, storage, and
 * distribution of oil, gas, and electric power. It provides the essential
 * foundation upon which all other critical infrastructure sectors depend.
 *
 * SRMA: Department of Energy (DOE).
 *
 * References:
 *   - DOE (2024). Energy Sector-Specific Plan.
 *   - NERC CIP Standards — Critical Infrastructure Protection for the Bulk Electric System.
 *   - API Standards (610, 650, 661, 670) — American Petroleum Institute.
 *   - NFPA 70 — National Electrical Code.
 *
 * @module sectors/energy
 */

import { DexpiSector } from './types';
import * as URI from './uris';

export const ENERGY_SECTOR: DexpiSector = {
    code: 'ENER',
    slug: 'energy',
    name: 'Energy',
    icon: 'Zap',
    description:
        'Electric power generation and distribution, petroleum refining and pipelines, ' +
        'natural gas processing and transmission. The Energy Sector provides the foundational ' +
        'infrastructure enabling the functioning of all other critical infrastructure sectors.',
    color: '#F59E0B',
    srma: 'DOE',
    subSectors: [
        {
            code: 'ENER-EL',
            name: 'Electricity',
            description:
                'Generation, transmission, and distribution of electric power from fossil fuel, ' +
                'nuclear, hydroelectric, and renewable sources across the bulk electric system ' +
                'regulated by NERC reliability standards and FERC oversight.',
            facilities: [
                {
                    code: 'ENER-EL-CCGT',
                    name: 'Combined Cycle Gas Turbine Power Plant',
                    description:
                        'High-efficiency (55–62% thermal efficiency) power generation facility combining ' +
                        'a gas turbine (Brayton cycle) with a heat recovery steam generator (HRSG) and ' +
                        'steam turbine (Rankine cycle). Typical capacity 200–1,200 MW.',
                    equipment: [
                        { componentClass: 'GasTurbine', componentClassURI: URI.GAS_TURBINE_URI, displayName: 'Gas Turbine Generator', category: 'rotating', typicalQuantity: { min: 1, max: 4 } },
                        { componentClass: 'SteamTurbine', componentClassURI: URI.STEAM_TURBINE_URI, displayName: 'Steam Turbine Generator', category: 'rotating', typicalQuantity: { min: 1, max: 2 } },
                        { componentClass: 'Boiler', componentClassURI: URI.BOILER_URI, displayName: 'Heat Recovery Steam Generator', category: 'heat-transfer', typicalQuantity: { min: 1, max: 4 } },
                        { componentClass: 'ElectricGenerator', componentClassURI: URI.ELECTRIC_GENERATOR_URI, displayName: 'Synchronous Generator', category: 'electrical', typicalQuantity: { min: 2, max: 6 } },
                        { componentClass: 'Transformer', componentClassURI: URI.TRANSFORMER_URI, displayName: 'Step-Up Transformer', category: 'electrical', typicalQuantity: { min: 2, max: 6 } },
                        { componentClass: 'Condenser', componentClassURI: URI.CONDENSER_URI, displayName: 'Surface Condenser', category: 'heat-transfer', typicalQuantity: { min: 1, max: 2 } },
                        { componentClass: 'CoolingTower', componentClassURI: URI.COOLING_TOWER_URI, displayName: 'Cooling Tower', category: 'heat-transfer', typicalQuantity: { min: 1, max: 4 } },
                        { componentClass: 'CentrifugalPump', componentClassURI: URI.CENTRIFUGAL_PUMP_URI, displayName: 'Boiler Feed Pump', category: 'rotating', typicalQuantity: { min: 2, max: 6 } },
                        { componentClass: 'Deaerator', componentClassURI: URI.DEAERATOR_URI, displayName: 'Deaerator', category: 'static', typicalQuantity: { min: 1, max: 2 } },
                        { componentClass: 'Switchgear', componentClassURI: URI.SWITCHGEAR_URI, displayName: 'HV Switchgear', category: 'electrical', typicalQuantity: { min: 2, max: 8 } },
                    ],
                },
                {
                    code: 'ENER-EL-COAL',
                    name: 'Coal-Fired Power Station',
                    description:
                        'Pulverized coal combustion generating station burning bituminous or sub-bituminous ' +
                        'coal in water-wall boilers to produce superheated steam driving turbine generators. ' +
                        'Includes emissions control: selective catalytic reduction (SCR), flue gas desulfurization ' +
                        '(FGD), and electrostatic precipitator (ESP). Typical capacity 200–1,500 MW.',
                    equipment: [
                        { componentClass: 'Boiler', componentClassURI: URI.BOILER_URI, displayName: 'Pulverized Coal Boiler', category: 'heat-transfer', typicalQuantity: { min: 1, max: 4 } },
                        { componentClass: 'SteamTurbine', componentClassURI: URI.STEAM_TURBINE_URI, displayName: 'Steam Turbine (HP/IP/LP)', category: 'rotating', typicalQuantity: { min: 1, max: 3 } },
                        { componentClass: 'ElectricGenerator', componentClassURI: URI.ELECTRIC_GENERATOR_URI, displayName: 'Turbo Generator', category: 'electrical', typicalQuantity: { min: 1, max: 3 } },
                        { componentClass: 'Scrubber', componentClassURI: URI.SCRUBBER_URI, displayName: 'FGD Scrubber', category: 'static', typicalQuantity: { min: 1, max: 2 } },
                        { componentClass: 'Fan', componentClassURI: URI.FAN_URI, displayName: 'Induced Draft Fan', category: 'rotating', typicalQuantity: { min: 2, max: 6 } },
                        { componentClass: 'Conveyor', componentClassURI: URI.CONVEYOR_URI, displayName: 'Coal Conveyor System', category: 'rotating', typicalQuantity: { min: 4, max: 12 } },
                        { componentClass: 'CentrifugalPump', componentClassURI: URI.CENTRIFUGAL_PUMP_URI, displayName: 'Boiler Feed Pump', category: 'rotating', typicalQuantity: { min: 2, max: 6 } },
                        { componentClass: 'CoolingTower', componentClassURI: URI.COOLING_TOWER_URI, displayName: 'Cooling Tower', category: 'heat-transfer', typicalQuantity: { min: 1, max: 4 } },
                        { componentClass: 'Silo', componentClassURI: URI.SILO_URI, displayName: 'Coal Silo', category: 'static', typicalQuantity: { min: 2, max: 8 } },
                    ],
                },
                {
                    code: 'ENER-EL-SOLAR',
                    name: 'Solar Photovoltaic Farm',
                    description:
                        'Utility-scale solar PV installation with DC-to-AC inverters, tracker-mounted ' +
                        'panels, and grid interconnection transformers. Capacity 10–500+ MW. Often co-located ' +
                        'with battery energy storage systems (BESS).',
                    equipment: [
                        { componentClass: 'Transformer', componentClassURI: URI.TRANSFORMER_URI, displayName: 'Pad-Mount Transformer', category: 'electrical', typicalQuantity: { min: 10, max: 100 } },
                        { componentClass: 'Switchgear', componentClassURI: URI.SWITCHGEAR_URI, displayName: 'MV Switchgear', category: 'electrical', typicalQuantity: { min: 2, max: 10 } },
                        { componentClass: 'CircuitBreaker', componentClassURI: URI.CIRCUIT_BREAKER_URI, displayName: 'HV Circuit Breaker', category: 'electrical', typicalQuantity: { min: 2, max: 8 } },
                        { componentClass: 'UPS', componentClassURI: URI.UPS_URI, displayName: 'Station Battery UPS', category: 'electrical', typicalQuantity: { min: 1, max: 2 } },
                    ],
                },
            ],
        },
        {
            code: 'ENER-OG',
            name: 'Oil',
            description:
                'Upstream exploration and production, midstream pipeline transport and storage, ' +
                'and downstream refining of crude oil into fuels, lubricants, and petrochemical feedstocks.',
            facilities: [
                {
                    code: 'ENER-OG-REF',
                    name: 'Petroleum Refinery',
                    description:
                        'Integrated crude oil processing facility with atmospheric and vacuum distillation, ' +
                        'fluid catalytic cracking (FCC), hydrocracking, catalytic reforming, alkylation, ' +
                        'and hydrotreating units. Produces gasoline, diesel, jet fuel, LPG, and coke. ' +
                        'Typical capacity 100,000–600,000 bbl/day.',
                    equipment: [
                        { componentClass: 'ProcessColumn', componentClassURI: URI.PROCESS_COLUMN_URI, displayName: 'Atmospheric Distillation Column', category: 'static', typicalQuantity: { min: 1, max: 3 } },
                        { componentClass: 'ProcessColumn', componentClassURI: URI.PROCESS_COLUMN_URI, displayName: 'Vacuum Distillation Column', category: 'static', typicalQuantity: { min: 1, max: 2 } },
                        { componentClass: 'Reactor', componentClassURI: URI.REACTOR_URI, displayName: 'FCC Reactor/Regenerator', category: 'static', typicalQuantity: { min: 1, max: 2 } },
                        { componentClass: 'Reactor', componentClassURI: URI.REACTOR_URI, displayName: 'Hydrocracker Reactor', category: 'static', typicalQuantity: { min: 2, max: 6 } },
                        { componentClass: 'Furnace', componentClassURI: URI.FURNACE_URI, displayName: 'Crude Heater', category: 'heat-transfer', typicalQuantity: { min: 2, max: 8 } },
                        { componentClass: 'HeatExchanger', componentClassURI: URI.SHELL_TUBE_HX_URI, displayName: 'Crude Preheat Exchanger', category: 'heat-transfer', typicalQuantity: { min: 20, max: 100 } },
                        { componentClass: 'HeatExchanger', componentClassURI: URI.AIR_COOLED_HX_URI, displayName: 'Air Fin Cooler', category: 'heat-transfer', typicalQuantity: { min: 10, max: 50 } },
                        { componentClass: 'CentrifugalPump', componentClassURI: URI.CENTRIFUGAL_PUMP_URI, displayName: 'Process Pump', category: 'rotating', typicalQuantity: { min: 50, max: 200 } },
                        { componentClass: 'CentrifugalCompressor', componentClassURI: URI.COMPRESSOR_URI, displayName: 'Wet Gas Compressor', category: 'rotating', typicalQuantity: { min: 3, max: 10 } },
                        { componentClass: 'StorageTank', componentClassURI: URI.TANK_URI, displayName: 'Floating Roof Tank', category: 'static', typicalQuantity: { min: 20, max: 80 } },
                        { componentClass: 'FlareStack', componentClassURI: URI.FLARE_URI, displayName: 'Elevated Flare', category: 'piping', typicalQuantity: { min: 1, max: 4 } },
                        { componentClass: 'SafetyValve', componentClassURI: URI.SAFETY_VALVE_URI, displayName: 'Relief Valve', category: 'piping', typicalQuantity: { min: 100, max: 400 } },
                    ],
                },
                {
                    code: 'ENER-OG-PIPE',
                    name: 'Oil Pipeline Terminal',
                    description:
                        'Crude oil and refined products pipeline pumping station and storage terminal ' +
                        'with custody transfer metering, pig launching/receiving, and tank farm.',
                    equipment: [
                        { componentClass: 'CentrifugalPump', componentClassURI: URI.CENTRIFUGAL_PUMP_URI, displayName: 'Main Line Pump', category: 'rotating', typicalQuantity: { min: 3, max: 8 } },
                        { componentClass: 'Motor', componentClassURI: URI.MOTOR_URI, displayName: 'Pump Drive Motor', category: 'electrical', typicalQuantity: { min: 3, max: 8 } },
                        { componentClass: 'VFD', componentClassURI: URI.VFD_URI, displayName: 'Variable Frequency Drive', category: 'electrical', typicalQuantity: { min: 1, max: 4 } },
                        { componentClass: 'StorageTank', componentClassURI: URI.TANK_URI, displayName: 'Crude Storage Tank', category: 'static', typicalQuantity: { min: 4, max: 20 } },
                        { componentClass: 'FlowMeter', componentClassURI: URI.FLOW_METER_URI, displayName: 'Custody Transfer Meter', category: 'instrumentation', typicalQuantity: { min: 2, max: 8 } },
                        { componentClass: 'Strainer', componentClassURI: URI.STRAINER_URI, displayName: 'Pipeline Strainer', category: 'piping', typicalQuantity: { min: 2, max: 6 } },
                    ],
                },
            ],
        },
        {
            code: 'ENER-NG',
            name: 'Natural Gas',
            description:
                'Natural gas production, processing, pipeline transmission, underground storage, ' +
                'and local distribution. Includes LNG liquefaction and regasification terminals.',
            facilities: [
                {
                    code: 'ENER-NG-PROC',
                    name: 'Gas Processing Plant',
                    description:
                        'Natural gas treating and NGL recovery facility removing impurities (H₂S, CO₂, ' +
                        'water) via amine treating, glycol dehydration, and turboexpander cryogenic ' +
                        'separation of ethane, propane, and butane fractions.',
                    equipment: [
                        { componentClass: 'ProcessColumn', componentClassURI: URI.PROCESS_COLUMN_URI, displayName: 'Amine Absorber', category: 'static', typicalQuantity: { min: 1, max: 3 } },
                        { componentClass: 'ProcessColumn', componentClassURI: URI.PROCESS_COLUMN_URI, displayName: 'Amine Regenerator', category: 'static', typicalQuantity: { min: 1, max: 2 } },
                        { componentClass: 'ProcessColumn', componentClassURI: URI.PROCESS_COLUMN_URI, displayName: 'Demethanizer', category: 'static', typicalQuantity: { min: 1, max: 2 } },
                        { componentClass: 'CentrifugalCompressor', componentClassURI: URI.COMPRESSOR_URI, displayName: 'Residue Gas Compressor', category: 'rotating', typicalQuantity: { min: 2, max: 6 } },
                        { componentClass: 'Turbine', componentClassURI: URI.TURBINE_URI, displayName: 'Turboexpander', category: 'rotating', typicalQuantity: { min: 1, max: 3 } },
                        { componentClass: 'ShellTubeHeatExchanger', componentClassURI: URI.SHELL_TUBE_HX_URI, displayName: 'Gas-Gas Exchanger', category: 'heat-transfer', typicalQuantity: { min: 6, max: 20 } },
                        { componentClass: 'Separator', componentClassURI: URI.SEPARATOR_URI, displayName: 'Inlet Separator', category: 'static', typicalQuantity: { min: 2, max: 6 } },
                        { componentClass: 'GasAnalyzer', componentClassURI: URI.ANALYZER_URI, displayName: 'H₂S/CO₂ Analyzer', category: 'instrumentation', typicalQuantity: { min: 4, max: 12 } },
                    ],
                },
                {
                    code: 'ENER-NG-LNG',
                    name: 'LNG Liquefaction Terminal',
                    description:
                        'Large-scale natural gas liquefaction facility cooling gas to −162°C via ' +
                        'mixed refrigerant (C3MR) or cascade processes. Includes LNG storage tanks ' +
                        'and marine loading arms. Typical capacity 5–25 MTPA.',
                    equipment: [
                        { componentClass: 'CentrifugalCompressor', componentClassURI: URI.COMPRESSOR_URI, displayName: 'Refrigerant Compressor', category: 'rotating', typicalQuantity: { min: 3, max: 8 } },
                        { componentClass: 'GasTurbine', componentClassURI: URI.GAS_TURBINE_URI, displayName: 'Compressor Drive Turbine', category: 'rotating', typicalQuantity: { min: 2, max: 6 } },
                        { componentClass: 'ShellTubeHeatExchanger', componentClassURI: URI.SHELL_TUBE_HX_URI, displayName: 'Main Cryogenic Exchanger', category: 'heat-transfer', typicalQuantity: { min: 2, max: 6 } },
                        { componentClass: 'StorageTank', componentClassURI: URI.TANK_URI, displayName: 'LNG Storage Tank (Full Containment)', category: 'static', typicalQuantity: { min: 2, max: 8 } },
                        { componentClass: 'CentrifugalPump', componentClassURI: URI.CENTRIFUGAL_PUMP_URI, displayName: 'LNG Loading Pump', category: 'rotating', typicalQuantity: { min: 2, max: 6 } },
                        { componentClass: 'FlareStack', componentClassURI: URI.FLARE_URI, displayName: 'Marine Flare', category: 'piping', typicalQuantity: { min: 1, max: 2 } },
                    ],
                },
            ],
        },
    ],
};
