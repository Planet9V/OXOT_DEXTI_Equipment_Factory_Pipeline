/**
 * CISA Sector 14: Nuclear Reactors, Materials, and Waste Sector.
 *
 * Encompasses civilian nuclear power reactors, research and test reactors,
 * nuclear fuel cycle facilities (enrichment, fabrication, reprocessing),
 * and radioactive waste management. Regulated by the Nuclear Regulatory
 * Commission (NRC) under 10 CFR Parts 50/52/70/72.
 *
 * SRMA: Department of Homeland Security / Nuclear Regulatory Commission (NRC).
 *
 * References:
 *   - NRC (2024). Nuclear Reactor Oversight Program.
 *   - 10 CFR Part 50 — Domestic Licensing of Production and Utilization Facilities.
 *   - 10 CFR Part 72 — Licensing Requirements for ISFSI and MRS.
 *   - IAEA Safety Standards Series — SSR-2/1 Rev.1.
 *
 * @module sectors/nuclear
 */

import { DexpiSector } from './types';
import * as URI from './uris';

export const NUCLEAR_SECTOR: DexpiSector = {
    code: 'NUCL',
    name: 'Nuclear Reactors, Materials, and Waste',
    icon: 'Atom',
    description:
        'Civilian nuclear power reactor operations, nuclear fuel cycle facilities (enrichment, ' +
        'fabrication), research reactors, medical and industrial radioactive materials, and ' +
        'radioactive waste storage and disposal regulated by the NRC.',
    color: '#10B981',
    srma: 'DHS/NRC',
    subSectors: [
        {
            code: 'NUCL-PR',
            name: 'Power Reactors',
            description:
                'Commercial nuclear power plants generating baseload electricity through ' +
                'controlled nuclear fission (PWR and BWR designs) per NRC 10 CFR Part 50/52 ' +
                'licensing. The U.S. operates 92 active commercial reactors.',
            facilities: [
                {
                    code: 'NUCL-PR-PWR',
                    name: 'Pressurized Water Reactor (PWR) Plant',
                    description:
                        'Two-loop PWR generating station with pressurizer maintaining primary loop at ' +
                        '~2,250 psia and ~315°C. Primary coolant transfers heat via steam generators to ' +
                        'the secondary loop driving the turbine generator. Capacity 800–1,400 MWe.',
                    equipment: [
                        { componentClass: 'PressureVessel', componentClassURI: URI.PRESSURE_VESSEL_URI, displayName: 'Reactor Pressure Vessel', category: 'static', typicalQuantity: { min: 1, max: 1 } },
                        { componentClass: 'SteamTurbine', componentClassURI: URI.STEAM_TURBINE_URI, displayName: 'Steam Turbine (HP/LP)', category: 'rotating', typicalQuantity: { min: 1, max: 2 } },
                        { componentClass: 'ElectricGenerator', componentClassURI: URI.ELECTRIC_GENERATOR_URI, displayName: 'Turbo Generator', category: 'electrical', typicalQuantity: { min: 1, max: 1 } },
                        { componentClass: 'HeatExchanger', componentClassURI: URI.SHELL_TUBE_HX_URI, displayName: 'Steam Generator (U-Tube)', category: 'heat-transfer', typicalQuantity: { min: 2, max: 4 } },
                        { componentClass: 'PressureVessel', componentClassURI: URI.PRESSURE_VESSEL_URI, displayName: 'Pressurizer', category: 'static', typicalQuantity: { min: 1, max: 1 } },
                        { componentClass: 'CentrifugalPump', componentClassURI: URI.CENTRIFUGAL_PUMP_URI, displayName: 'Reactor Coolant Pump', category: 'rotating', typicalQuantity: { min: 2, max: 4 } },
                        { componentClass: 'Condenser', componentClassURI: URI.CONDENSER_URI, displayName: 'Main Condenser', category: 'heat-transfer', typicalQuantity: { min: 1, max: 1 } },
                        { componentClass: 'CoolingTower', componentClassURI: URI.COOLING_TOWER_URI, displayName: 'Natural Draft Cooling Tower', category: 'heat-transfer', typicalQuantity: { min: 1, max: 2 } },
                        { componentClass: 'CentrifugalPump', componentClassURI: URI.CENTRIFUGAL_PUMP_URI, displayName: 'ECCS Safety Injection Pump', category: 'rotating', typicalQuantity: { min: 2, max: 4 } },
                        { componentClass: 'StorageTank', componentClassURI: URI.TANK_URI, displayName: 'Refueling Water Storage Tank', category: 'static', typicalQuantity: { min: 1, max: 2 } },
                        { componentClass: 'Transformer', componentClassURI: URI.TRANSFORMER_URI, displayName: 'Main Power Transformer', category: 'electrical', typicalQuantity: { min: 1, max: 3 } },
                    ],
                },
            ],
        },
        {
            code: 'NUCL-RR',
            name: 'Research Reactors',
            description:
                'University and national laboratory research reactors for neutron science, ' +
                'medical isotope production (Mo-99/Tc-99m), and materials testing. Typically ' +
                '1–20 MWth, pool-type or TRIGA designs.',
            facilities: [
                {
                    code: 'NUCL-RR-POOL',
                    name: 'Pool-Type Research Reactor',
                    description:
                        'Open-pool research reactor with fuel assemblies submerged in light water for ' +
                        'neutron beam experiments and isotope irradiation. Licensed under 10 CFR Part 50.',
                    equipment: [
                        { componentClass: 'PressureVessel', componentClassURI: URI.PRESSURE_VESSEL_URI, displayName: 'Reactor Pool/Vessel', category: 'static', typicalQuantity: { min: 1, max: 1 } },
                        { componentClass: 'CentrifugalPump', componentClassURI: URI.CENTRIFUGAL_PUMP_URI, displayName: 'Pool Cooling Pump', category: 'rotating', typicalQuantity: { min: 2, max: 4 } },
                        { componentClass: 'ShellTubeHeatExchanger', componentClassURI: URI.SHELL_TUBE_HX_URI, displayName: 'Pool Heat Exchanger', category: 'heat-transfer', typicalQuantity: { min: 1, max: 2 } },
                        { componentClass: 'Filter', componentClassURI: URI.FILTER_URI, displayName: 'Water Purification Ion Exchanger', category: 'static', typicalQuantity: { min: 1, max: 3 } },
                    ],
                },
            ],
        },
        {
            code: 'NUCL-NM',
            name: 'Nuclear Materials',
            description:
                'Uranium enrichment, nuclear fuel fabrication, and transportation of special ' +
                'nuclear materials (SNM) under NRC 10 CFR Part 70 licensing.',
            facilities: [
                {
                    code: 'NUCL-NM-ENRICH',
                    name: 'Uranium Enrichment Facility',
                    description:
                        'Gas centrifuge uranium enrichment plant separating U-235 from U-238 in UF₆ gas ' +
                        'through cascade centrifuges producing low-enriched uranium (LEU, 3–5% U-235) ' +
                        'for commercial reactor fuel.',
                    equipment: [
                        { componentClass: 'Centrifuge', componentClassURI: URI.CENTRIFUGE_URI, displayName: 'Gas Centrifuge', category: 'rotating', typicalQuantity: { min: 1000, max: 10000 } },
                        { componentClass: 'Compressor', componentClassURI: URI.COMPRESSOR_URI, displayName: 'UF₆ Feed Compressor', category: 'rotating', typicalQuantity: { min: 2, max: 6 } },
                        { componentClass: 'PressureVessel', componentClassURI: URI.PRESSURE_VESSEL_URI, displayName: 'UF₆ Cylinder/Container', category: 'static', typicalQuantity: { min: 50, max: 500 } },
                        { componentClass: 'Autoclave', componentClassURI: URI.AUTOCLAVE_URI, displayName: 'UF₆ Feed Autoclave', category: 'static', typicalQuantity: { min: 2, max: 8 } },
                    ],
                },
            ],
        },
        {
            code: 'NUCL-RW',
            name: 'Radioactive Waste',
            description:
                'Interim storage, transport, and permanent disposal of low-level (LLW), ' +
                'high-level (HLW), and transuranic (TRU) radioactive waste under NRC ' +
                '10 CFR Part 61/72 and DOE Order 435.1.',
            facilities: [
                {
                    code: 'NUCL-RW-ISFSI',
                    name: 'Independent Spent Fuel Storage Installation (ISFSI)',
                    description:
                        'Dry cask spent nuclear fuel storage facility licensed under 10 CFR Part 72. ' +
                        'Spent fuel assemblies stored in sealed metal canisters within concrete ' +
                        'overpacks on a reinforced concrete pad.',
                    equipment: [
                        { componentClass: 'PressureVessel', componentClassURI: URI.PRESSURE_VESSEL_URI, displayName: 'Dry Storage Cask', category: 'static', typicalQuantity: { min: 10, max: 200 } },
                        { componentClass: 'CentrifugalPump', componentClassURI: URI.CENTRIFUGAL_PUMP_URI, displayName: 'Transfer Canal Pump', category: 'rotating', typicalQuantity: { min: 1, max: 4 } },
                        { componentClass: 'Analyzer', componentClassURI: URI.ANALYZER_URI, displayName: 'Radiation Monitor', category: 'instrumentation', typicalQuantity: { min: 4, max: 16 } },
                    ],
                },
            ],
        },
    ],
};
