/**
 * CISA Sector 01: Chemical Sector.
 *
 * The Chemical Sector converts raw materials into more than 70,000 diverse
 * products through chemical reactions, separation, and formulation processes.
 * These products are essential feedstocks for virtually every other critical
 * infrastructure sector, from agriculture to defense.
 *
 * SRMA: Department of Homeland Security / Cybersecurity and Infrastructure
 * Security Agency (DHS/CISA).
 *
 * References:
 *   - CISA (2024). Chemical Sector Overview.
 *   - American Chemistry Council (2024). Industry Profile.
 *   - OSHA 29 CFR 1910.119 — Process Safety Management of Highly Hazardous Chemicals.
 *
 * @module sectors/chemical
 */

import { DexpiSector } from './types';
import * as URI from './uris';

export const CHEMICAL_SECTOR: DexpiSector = {
    code: 'CHEM',
    slug: 'chemical',
    name: 'Chemical',
    icon: 'FlaskConical',
    description:
        'Manufacturing, storage, distribution, and use of potentially dangerous chemicals. ' +
        'Encompasses basic chemicals, specialty chemicals, agricultural chemicals, pharmaceuticals, ' +
        'and consumer products essential to economic security and public health.',
    color: '#8B5CF6',
    srma: 'DHS/CISA',
    subSectors: [
        {
            code: 'CHEM-BC',
            name: 'Basic Chemicals',
            description:
                'Large-volume commodity chemical production including petrochemicals, industrial gases, ' +
                'acids, alkalis, and organic/inorganic intermediates via continuous processes such as ' +
                'cracking, reforming, oxidation, and chlor-alkali electrolysis.',
            facilities: [
                {
                    code: 'CHEM-BC-PETRO',
                    name: 'Petrochemical Complex',
                    description:
                        'Integrated petrochemical facility producing ethylene, propylene, butadiene, and ' +
                        'aromatics (benzene, toluene, xylene) through steam cracking of naphtha or ethane. ' +
                        'Downstream units polymerize olefins into polyethylene, polypropylene, and synthetic rubbers.',
                    equipment: [
                        { componentClass: 'Furnace', componentClassURI: URI.FURNACE_URI, displayName: 'Steam Cracking Furnace', category: 'heat-transfer', typicalQuantity: { min: 4, max: 12 } },
                        { componentClass: 'CentrifugalCompressor', componentClassURI: URI.COMPRESSOR_URI, displayName: 'Cracked Gas Compressor', category: 'rotating', typicalQuantity: { min: 3, max: 8 } },
                        { componentClass: 'ProcessColumn', componentClassURI: URI.COLUMN_URI, displayName: 'Fractionation Column', category: 'static', typicalQuantity: { min: 6, max: 20 } },
                        { componentClass: 'ShellTubeHeatExchanger', componentClassURI: URI.SHELL_TUBE_HX_URI, displayName: 'Transfer Line Exchanger', category: 'heat-transfer', typicalQuantity: { min: 20, max: 80 } },
                        { componentClass: 'CentrifugalPump', componentClassURI: URI.CENTRIFUGAL_PUMP_URI, displayName: 'Process Pump', category: 'rotating', typicalQuantity: { min: 30, max: 120 } },
                        { componentClass: 'PressureVessel', componentClassURI: URI.PRESSURE_VESSEL_URI, displayName: 'Quench Tower', category: 'static', typicalQuantity: { min: 2, max: 6 } },
                        { componentClass: 'Reactor', componentClassURI: URI.REACTOR_URI, displayName: 'Polymerization Reactor', category: 'static', typicalQuantity: { min: 2, max: 10 } },
                        { componentClass: 'StorageTank', componentClassURI: URI.TANK_URI, displayName: 'Product Storage Tank', category: 'static', typicalQuantity: { min: 10, max: 40 } },
                        { componentClass: 'FlareStack', componentClassURI: URI.FLARE_URI, displayName: 'Emergency Flare System', category: 'piping', typicalQuantity: { min: 1, max: 3 } },
                        { componentClass: 'ControlValve', componentClassURI: URI.CONTROL_VALVE_URI, displayName: 'Control Valve', category: 'piping', typicalQuantity: { min: 100, max: 500 } },
                        { componentClass: 'SafetyValve', componentClassURI: URI.SAFETY_VALVE_URI, displayName: 'Pressure Safety Valve', category: 'piping', typicalQuantity: { min: 50, max: 200 } },
                        { componentClass: 'GasAnalyzer', componentClassURI: URI.ANALYZER_URI, displayName: 'Online Gas Analyzer', category: 'instrumentation', typicalQuantity: { min: 10, max: 40 } },
                    ],
                },
                {
                    code: 'CHEM-BC-CHLOR',
                    name: 'Chlor-Alkali Plant',
                    description:
                        'Electrolysis of brine (sodium chloride solution) to produce chlorine gas, ' +
                        'caustic soda (NaOH), and hydrogen gas. Modern facilities use membrane cell ' +
                        'technology per Euro Chlor Best Available Techniques (BAT).',
                    equipment: [
                        { componentClass: 'Electrolyzer', componentClassURI: URI.ELECTROLYZER_URI, displayName: 'Membrane Electrolyzer', category: 'electrical', typicalQuantity: { min: 20, max: 100 } },
                        { componentClass: 'Transformer', componentClassURI: URI.TRANSFORMER_URI, displayName: 'Rectifier Transformer', category: 'electrical', typicalQuantity: { min: 4, max: 12 } },
                        { componentClass: 'Compressor', componentClassURI: URI.COMPRESSOR_URI, displayName: 'Chlorine Compressor', category: 'rotating', typicalQuantity: { min: 2, max: 6 } },
                        { componentClass: 'Evaporator', componentClassURI: URI.EVAPORATOR_URI, displayName: 'Caustic Evaporator', category: 'heat-transfer', typicalQuantity: { min: 3, max: 8 } },
                        { componentClass: 'StorageTank', componentClassURI: URI.TANK_URI, displayName: 'Chlorine Storage Sphere', category: 'static', typicalQuantity: { min: 2, max: 6 } },
                        { componentClass: 'Scrubber', componentClassURI: URI.SCRUBBER_URI, displayName: 'Chlorine Scrubber', category: 'static', typicalQuantity: { min: 2, max: 4 } },
                        { componentClass: 'CentrifugalPump', componentClassURI: URI.CENTRIFUGAL_PUMP_URI, displayName: 'Brine Feed Pump', category: 'rotating', typicalQuantity: { min: 4, max: 12 } },
                        { componentClass: 'Filter', componentClassURI: URI.FILTER_URI, displayName: 'Brine Purification Filter', category: 'static', typicalQuantity: { min: 4, max: 10 } },
                    ],
                },
            ],
        },
        {
            code: 'CHEM-SC',
            name: 'Specialty Chemicals',
            description:
                'High-value, low-volume chemical products including adhesives, catalysts, coatings, ' +
                'electronic chemicals, surfactants, and performance additives manufactured through ' +
                'batch and semi-batch processes with stringent quality control.',
            facilities: [
                {
                    code: 'CHEM-SC-BATCH',
                    name: 'Batch Chemical Manufacturing Facility',
                    description:
                        'Multi-purpose batch processing plant producing specialty chemicals through ' +
                        'synthesis, purification, and formulation in glass-lined or stainless steel reactors ' +
                        'with programmable recipe control (ISA-88 batch standard).',
                    equipment: [
                        { componentClass: 'Reactor', componentClassURI: URI.REACTOR_URI, displayName: 'Glass-Lined Batch Reactor', category: 'static', typicalQuantity: { min: 4, max: 20 } },
                        { componentClass: 'Agitator', componentClassURI: URI.AGITATOR_URI, displayName: 'Reactor Agitator', category: 'rotating', typicalQuantity: { min: 4, max: 20 } },
                        { componentClass: 'Condenser', componentClassURI: URI.CONDENSER_URI, displayName: 'Reflux Condenser', category: 'heat-transfer', typicalQuantity: { min: 4, max: 16 } },
                        { componentClass: 'Filter', componentClassURI: URI.FILTER_URI, displayName: 'Pressure Filter', category: 'static', typicalQuantity: { min: 2, max: 8 } },
                        { componentClass: 'Dryer', componentClassURI: URI.DRYER_URI, displayName: 'Vacuum Tray Dryer', category: 'heat-transfer', typicalQuantity: { min: 2, max: 6 } },
                        { componentClass: 'Centrifuge', componentClassURI: URI.CENTRIFUGE_URI, displayName: 'Basket Centrifuge', category: 'rotating', typicalQuantity: { min: 2, max: 8 } },
                        { componentClass: 'PressureVessel', componentClassURI: URI.PRESSURE_VESSEL_URI, displayName: 'Intermediate Storage Vessel', category: 'static', typicalQuantity: { min: 6, max: 20 } },
                    ],
                },
            ],
        },
        {
            code: 'CHEM-AG',
            name: 'Agricultural Chemicals',
            description:
                'Production of fertilizers (nitrogen, phosphate, potash), herbicides, insecticides, ' +
                'fungicides, and plant growth regulators supporting global food security.',
            facilities: [
                {
                    code: 'CHEM-AG-FERT',
                    name: 'Ammonia & Fertilizer Complex',
                    description:
                        'Integrated facility producing anhydrous ammonia via the Haber-Bosch process ' +
                        '(catalytic reaction of nitrogen and hydrogen at 150–300 atm, 400–500°C), with ' +
                        'downstream urea, ammonium nitrate, and NPK granulation plants.',
                    equipment: [
                        { componentClass: 'Reactor', componentClassURI: URI.REACTOR_URI, displayName: 'Ammonia Synthesis Converter', category: 'static', typicalQuantity: { min: 1, max: 3 } },
                        { componentClass: 'CentrifugalCompressor', componentClassURI: URI.COMPRESSOR_URI, displayName: 'Synthesis Gas Compressor', category: 'rotating', typicalQuantity: { min: 2, max: 6 } },
                        { componentClass: 'SteamTurbine', componentClassURI: URI.STEAM_TURBINE_URI, displayName: 'Compressor Drive Turbine', category: 'rotating', typicalQuantity: { min: 2, max: 4 } },
                        { componentClass: 'ShellTubeHeatExchanger', componentClassURI: URI.SHELL_TUBE_HX_URI, displayName: 'Waste Heat Boiler', category: 'heat-transfer', typicalQuantity: { min: 4, max: 12 } },
                        { componentClass: 'ProcessColumn', componentClassURI: URI.PROCESS_COLUMN_URI, displayName: 'CO₂ Absorber Column', category: 'static', typicalQuantity: { min: 2, max: 4 } },
                        { componentClass: 'StorageTank', componentClassURI: URI.TANK_URI, displayName: 'Ammonia Storage Sphere', category: 'static', typicalQuantity: { min: 2, max: 6 } },
                        { componentClass: 'Reactor', componentClassURI: URI.REACTOR_URI, displayName: 'Urea Synthesis Reactor', category: 'static', typicalQuantity: { min: 1, max: 2 } },
                        { componentClass: 'Evaporator', componentClassURI: URI.EVAPORATOR_URI, displayName: 'Urea Evaporator', category: 'heat-transfer', typicalQuantity: { min: 2, max: 4 } },
                    ],
                },
            ],
        },
        {
            code: 'CHEM-PH',
            name: 'Pharmaceuticals',
            description:
                'Manufacturing of active pharmaceutical ingredients (APIs), biologics, and finished ' +
                'dosage forms under current Good Manufacturing Practice (cGMP) standards per FDA 21 CFR ' +
                'Parts 210/211 and EU GMP Annex 1.',
            facilities: [
                {
                    code: 'CHEM-PH-API',
                    name: 'API Manufacturing Plant',
                    description:
                        'cGMP-compliant facility for synthesis, purification, and drying of active ' +
                        'pharmaceutical ingredients through multi-step organic chemistry in controlled ' +
                        'cleanroom environments with validated HVAC and water-for-injection (WFI) systems.',
                    equipment: [
                        { componentClass: 'Reactor', componentClassURI: URI.REACTOR_URI, displayName: 'cGMP Reactor (Hastelloy)', category: 'static', typicalQuantity: { min: 6, max: 30 } },
                        { componentClass: 'Centrifuge', componentClassURI: URI.CENTRIFUGE_URI, displayName: 'Peeler Centrifuge', category: 'rotating', typicalQuantity: { min: 2, max: 10 } },
                        { componentClass: 'Dryer', componentClassURI: URI.DRYER_URI, displayName: 'Conical Vacuum Dryer', category: 'heat-transfer', typicalQuantity: { min: 2, max: 8 } },
                        { componentClass: 'ProcessColumn', componentClassURI: URI.PROCESS_COLUMN_URI, displayName: 'Chromatography Column', category: 'static', typicalQuantity: { min: 2, max: 6 } },
                        { componentClass: 'Filter', componentClassURI: URI.FILTER_URI, displayName: 'Sterile Filter (0.2μm)', category: 'static', typicalQuantity: { min: 4, max: 20 } },
                        { componentClass: 'Autoclave', componentClassURI: URI.AUTOCLAVE_URI, displayName: 'SIP/CIP Autoclave', category: 'static', typicalQuantity: { min: 2, max: 6 } },
                    ],
                },
            ],
        },
        {
            code: 'CHEM-CP',
            name: 'Consumer Products',
            description:
                'Formulation and packaging of household chemicals, cleaning agents, personal care ' +
                'products, paints, and coatings for commercial and residential use.',
            facilities: [
                {
                    code: 'CHEM-CP-FORM',
                    name: 'Consumer Chemical Formulation Plant',
                    description:
                        'High-speed formulation, blending, and packaging facility for consumer cleaning ' +
                        'products, detergents, and personal care items with automated filling lines.',
                    equipment: [
                        { componentClass: 'Mixer', componentClassURI: URI.MIXER_URI, displayName: 'High-Shear Mixer', category: 'rotating', typicalQuantity: { min: 4, max: 16 } },
                        { componentClass: 'StorageTank', componentClassURI: URI.TANK_URI, displayName: 'Raw Material Tank', category: 'static', typicalQuantity: { min: 10, max: 40 } },
                        { componentClass: 'CentrifugalPump', componentClassURI: URI.CENTRIFUGAL_PUMP_URI, displayName: 'Transfer Pump', category: 'rotating', typicalQuantity: { min: 8, max: 30 } },
                        { componentClass: 'Filter', componentClassURI: URI.FILTER_URI, displayName: 'Product Filter', category: 'static', typicalQuantity: { min: 4, max: 12 } },
                        { componentClass: 'ShellTubeHeatExchanger', componentClassURI: URI.SHELL_TUBE_HX_URI, displayName: 'Process Heater', category: 'heat-transfer', typicalQuantity: { min: 2, max: 8 } },
                    ],
                },
            ],
        },
    ],
};
