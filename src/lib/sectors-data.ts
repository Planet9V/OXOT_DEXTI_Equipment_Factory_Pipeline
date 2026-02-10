// DEXPI 2.0 Equipment Factory Pipeline — 16 CISA Sector Definitions
// POSC Caesar RDL URIs for DEXPI component class mapping

import type { DexpiSector, DexpiSubSector, DexpiFacilityType } from "./types";

// ─── RDL URI Constants ────────────────────────────────────────────────────────

const PUMP_URI = "http://data.posccaesar.org/rdl/RDS327889";
const HEAT_EXCHANGER_URI = "http://data.posccaesar.org/rdl/RDS327893";
const PRESSURE_VESSEL_URI = "http://data.posccaesar.org/rdl/RDS327891";
const TANK_URI = "http://data.posccaesar.org/rdl/RDS327895";
const CONTROL_VALVE_URI = "http://data.posccaesar.org/rdl/RDS327897";
const SHUTOFF_VALVE_URI = "http://data.posccaesar.org/rdl/RDS327899";
const COMPRESSOR_URI = "http://data.posccaesar.org/rdl/RDS327901";
const TURBINE_URI = "http://data.posccaesar.org/rdl/RDS327903";
const GENERATOR_URI = "http://data.posccaesar.org/rdl/RDS327905";
const MOTOR_URI = "http://data.posccaesar.org/rdl/RDS327907";
const TRANSMITTER_URI = "http://data.posccaesar.org/rdl/RDS327909";
const ANALYZER_URI = "http://data.posccaesar.org/rdl/RDS327911";
const SAFETY_VALVE_URI = "http://data.posccaesar.org/rdl/RDS327913";
const FILTER_URI = "http://data.posccaesar.org/rdl/RDS327915";
const COLUMN_URI = "http://data.posccaesar.org/rdl/RDS327917";
const REACTOR_URI = "http://data.posccaesar.org/rdl/RDS327919";
const BOILER_URI = "http://data.posccaesar.org/rdl/RDS327921";
const CONDENSER_URI = "http://data.posccaesar.org/rdl/RDS327923";
const COOLER_URI = "http://data.posccaesar.org/rdl/RDS327925";
const FAN_URI = "http://data.posccaesar.org/rdl/RDS327927";
const AGITATOR_URI = "http://data.posccaesar.org/rdl/RDS327929";
const CONVEYOR_URI = "http://data.posccaesar.org/rdl/RDS327931";
const TRANSFORMER_URI = "http://data.posccaesar.org/rdl/RDS327933";
const BREAKER_URI = "http://data.posccaesar.org/rdl/RDS327935";
const PIPE_URI = "http://data.posccaesar.org/rdl/RDS327937";
const FLARE_URI = "http://data.posccaesar.org/rdl/RDS327939";

// ─── Sector Definitions ───────────────────────────────────────────────────────

export const SECTORS: DexpiSector[] = [
  // ━━━ 1. ENERGY ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    code: "ENER",
    name: "Energy",
    icon: "Zap",
    description: "Electric power generation, oil and gas, renewable energy systems",
    color: "#F59E0B",
    subSectors: [
      {
        code: "ENER-OG",
        name: "Oil & Gas",
        description: "Upstream, midstream, and downstream petroleum operations",
        facilities: [
          {
            code: "ENER-OG-REF",
            name: "Petroleum Refinery",
            description: "Crude oil processing and refined product manufacturing",
            equipment: [
              { componentClass: "CentrifugalPump", componentClassURI: PUMP_URI, displayName: "Centrifugal Pump", category: "rotating", typicalQuantity: { min: 50, max: 200 } },
              { componentClass: "ShellTubeHeatExchanger", componentClassURI: HEAT_EXCHANGER_URI, displayName: "Shell & Tube Heat Exchanger", category: "static", typicalQuantity: { min: 30, max: 120 } },
              { componentClass: "DistillationColumn", componentClassURI: COLUMN_URI, displayName: "Distillation Column", category: "static", typicalQuantity: { min: 5, max: 20 } },
              { componentClass: "PressureVessel", componentClassURI: PRESSURE_VESSEL_URI, displayName: "Pressure Vessel", category: "static", typicalQuantity: { min: 20, max: 80 } },
              { componentClass: "ControlValve", componentClassURI: CONTROL_VALVE_URI, displayName: "Control Valve", category: "instrumentation", typicalQuantity: { min: 200, max: 800 } },
              { componentClass: "SafetyReliefValve", componentClassURI: SAFETY_VALVE_URI, displayName: "Safety Relief Valve", category: "instrumentation", typicalQuantity: { min: 50, max: 200 } },
              { componentClass: "Compressor", componentClassURI: COMPRESSOR_URI, displayName: "Gas Compressor", category: "rotating", typicalQuantity: { min: 5, max: 20 } },
              { componentClass: "FlareStack", componentClassURI: FLARE_URI, displayName: "Flare Stack", category: "static", typicalQuantity: { min: 1, max: 4 } },
            ],
          },
          {
            code: "ENER-OG-GAS",
            name: "Gas Processing Plant",
            description: "Natural gas separation, treatment, and NGL recovery",
            equipment: [
              { componentClass: "Compressor", componentClassURI: COMPRESSOR_URI, displayName: "Gas Compressor", category: "rotating", typicalQuantity: { min: 8, max: 30 } },
              { componentClass: "AbsorptionColumn", componentClassURI: COLUMN_URI, displayName: "Absorption Column", category: "static", typicalQuantity: { min: 3, max: 10 } },
              { componentClass: "AirCooledHeatExchanger", componentClassURI: COOLER_URI, displayName: "Air-Cooled Exchanger", category: "static", typicalQuantity: { min: 10, max: 40 } },
              { componentClass: "PressureVessel", componentClassURI: PRESSURE_VESSEL_URI, displayName: "Separator Vessel", category: "static", typicalQuantity: { min: 10, max: 30 } },
              { componentClass: "ControlValve", componentClassURI: CONTROL_VALVE_URI, displayName: "Control Valve", category: "instrumentation", typicalQuantity: { min: 100, max: 400 } },
              { componentClass: "GasAnalyzer", componentClassURI: ANALYZER_URI, displayName: "Gas Analyzer", category: "instrumentation", typicalQuantity: { min: 10, max: 40 } },
            ],
          },
        ],
      },
      {
        code: "ENER-PG",
        name: "Power Generation",
        description: "Fossil fuel and renewable electricity generation",
        facilities: [
          {
            code: "ENER-PG-CCGT",
            name: "Combined Cycle Gas Turbine",
            description: "Natural gas-fired combined cycle power plant",
            equipment: [
              { componentClass: "GasTurbine", componentClassURI: TURBINE_URI, displayName: "Gas Turbine", category: "rotating", typicalQuantity: { min: 1, max: 4 } },
              { componentClass: "SteamTurbine", componentClassURI: TURBINE_URI, displayName: "Steam Turbine", category: "rotating", typicalQuantity: { min: 1, max: 2 } },
              { componentClass: "Generator", componentClassURI: GENERATOR_URI, displayName: "Generator", category: "electrical", typicalQuantity: { min: 2, max: 6 } },
              { componentClass: "HRSG", componentClassURI: BOILER_URI, displayName: "Heat Recovery Steam Generator", category: "static", typicalQuantity: { min: 1, max: 4 } },
              { componentClass: "Condenser", componentClassURI: CONDENSER_URI, displayName: "Surface Condenser", category: "static", typicalQuantity: { min: 1, max: 2 } },
              { componentClass: "Transformer", componentClassURI: TRANSFORMER_URI, displayName: "Step-Up Transformer", category: "electrical", typicalQuantity: { min: 2, max: 6 } },
              { componentClass: "BoilerFeedPump", componentClassURI: PUMP_URI, displayName: "Boiler Feed Pump", category: "rotating", typicalQuantity: { min: 2, max: 6 } },
            ],
          },
          {
            code: "ENER-PG-COAL",
            name: "Coal-Fired Power Plant",
            description: "Pulverized coal steam electric generating station",
            equipment: [
              { componentClass: "Boiler", componentClassURI: BOILER_URI, displayName: "Pulverized Coal Boiler", category: "static", typicalQuantity: { min: 1, max: 2 } },
              { componentClass: "SteamTurbine", componentClassURI: TURBINE_URI, displayName: "Steam Turbine", category: "rotating", typicalQuantity: { min: 1, max: 2 } },
              { componentClass: "Generator", componentClassURI: GENERATOR_URI, displayName: "Generator", category: "electrical", typicalQuantity: { min: 1, max: 2 } },
              { componentClass: "InducedDraftFan", componentClassURI: FAN_URI, displayName: "Induced Draft Fan", category: "rotating", typicalQuantity: { min: 2, max: 4 } },
              { componentClass: "ForcedDraftFan", componentClassURI: FAN_URI, displayName: "Forced Draft Fan", category: "rotating", typicalQuantity: { min: 2, max: 4 } },
              { componentClass: "Conveyor", componentClassURI: CONVEYOR_URI, displayName: "Coal Conveyor", category: "rotating", typicalQuantity: { min: 4, max: 12 } },
            ],
          },
        ],
      },
      {
        code: "ENER-RN",
        name: "Renewable Energy",
        description: "Wind, solar, and battery energy storage systems",
        facilities: [
          {
            code: "ENER-RN-WIND",
            name: "Wind Farm",
            description: "Utility-scale onshore or offshore wind generation",
            equipment: [
              { componentClass: "WindTurbine", componentClassURI: TURBINE_URI, displayName: "Wind Turbine Generator", category: "rotating", typicalQuantity: { min: 20, max: 200 } },
              { componentClass: "Transformer", componentClassURI: TRANSFORMER_URI, displayName: "Pad-Mount Transformer", category: "electrical", typicalQuantity: { min: 20, max: 200 } },
              { componentClass: "CircuitBreaker", componentClassURI: BREAKER_URI, displayName: "Medium Voltage Breaker", category: "electrical", typicalQuantity: { min: 20, max: 200 } },
              { componentClass: "MainTransformer", componentClassURI: TRANSFORMER_URI, displayName: "Main Power Transformer", category: "electrical", typicalQuantity: { min: 1, max: 4 } },
            ],
          },
        ],
      },
    ],
  },

  // ━━━ 2. WATER ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    code: "WATR",
    name: "Water & Wastewater",
    icon: "Droplets",
    description: "Drinking water systems, wastewater treatment, and stormwater",
    color: "#3B82F6",
    subSectors: [
      {
        code: "WATR-DW",
        name: "Drinking Water",
        description: "Public water supply and treatment systems",
        facilities: [
          {
            code: "WATR-DW-WTP",
            name: "Water Treatment Plant",
            description: "Surface water or groundwater treatment for potable supply",
            equipment: [
              { componentClass: "CentrifugalPump", componentClassURI: PUMP_URI, displayName: "Raw Water Pump", category: "rotating", typicalQuantity: { min: 3, max: 10 } },
              { componentClass: "HighServicePump", componentClassURI: PUMP_URI, displayName: "High-Service Pump", category: "rotating", typicalQuantity: { min: 3, max: 8 } },
              { componentClass: "ChemicalFeedPump", componentClassURI: PUMP_URI, displayName: "Chemical Feed Pump", category: "rotating", typicalQuantity: { min: 6, max: 20 } },
              { componentClass: "Filter", componentClassURI: FILTER_URI, displayName: "Gravity Sand Filter", category: "static", typicalQuantity: { min: 4, max: 16 } },
              { componentClass: "StorageTank", componentClassURI: TANK_URI, displayName: "Clearwell", category: "static", typicalQuantity: { min: 1, max: 4 } },
              { componentClass: "Analyzer", componentClassURI: ANALYZER_URI, displayName: "Turbidity Analyzer", category: "instrumentation", typicalQuantity: { min: 4, max: 16 } },
              { componentClass: "ControlValve", componentClassURI: CONTROL_VALVE_URI, displayName: "Butterfly Valve", category: "instrumentation", typicalQuantity: { min: 20, max: 60 } },
            ],
          },
        ],
      },
      {
        code: "WATR-WW",
        name: "Wastewater",
        description: "Municipal and industrial wastewater treatment",
        facilities: [
          {
            code: "WATR-WW-WWTP",
            name: "Wastewater Treatment Plant",
            description: "Activated sludge secondary treatment facility",
            equipment: [
              { componentClass: "InfluentPump", componentClassURI: PUMP_URI, displayName: "Influent Pump", category: "rotating", typicalQuantity: { min: 3, max: 8 } },
              { componentClass: "Blower", componentClassURI: FAN_URI, displayName: "Aeration Blower", category: "rotating", typicalQuantity: { min: 3, max: 8 } },
              { componentClass: "SludgePump", componentClassURI: PUMP_URI, displayName: "Return Activated Sludge Pump", category: "rotating", typicalQuantity: { min: 2, max: 6 } },
              { componentClass: "Agitator", componentClassURI: AGITATOR_URI, displayName: "Digester Mixer", category: "rotating", typicalQuantity: { min: 2, max: 6 } },
              { componentClass: "DissolvedOxygenAnalyzer", componentClassURI: ANALYZER_URI, displayName: "DO Analyzer", category: "instrumentation", typicalQuantity: { min: 4, max: 12 } },
              { componentClass: "UVDisinfection", componentClassURI: PRESSURE_VESSEL_URI, displayName: "UV Disinfection Unit", category: "static", typicalQuantity: { min: 1, max: 4 } },
            ],
          },
          {
            code: "WATR-WW-LIFT",
            name: "Lift Station",
            description: "Sewage pumping and conveyance station",
            equipment: [
              { componentClass: "SubmersiblePump", componentClassURI: PUMP_URI, displayName: "Submersible Sewage Pump", category: "rotating", typicalQuantity: { min: 2, max: 4 } },
              { componentClass: "CheckValve", componentClassURI: SHUTOFF_VALVE_URI, displayName: "Check Valve", category: "piping", typicalQuantity: { min: 2, max: 4 } },
              { componentClass: "LevelTransmitter", componentClassURI: TRANSMITTER_URI, displayName: "Level Transmitter", category: "instrumentation", typicalQuantity: { min: 2, max: 4 } },
              { componentClass: "Motor", componentClassURI: MOTOR_URI, displayName: "Pump Motor", category: "electrical", typicalQuantity: { min: 2, max: 4 } },
            ],
          },
        ],
      },
    ],
  },

  // ━━━ 3. NUCLEAR ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    code: "NUCL",
    name: "Nuclear Reactors, Materials & Waste",
    icon: "Atom",
    description: "Nuclear power plants, research reactors, fuel cycle facilities",
    color: "#8B5CF6",
    subSectors: [
      {
        code: "NUCL-PP",
        name: "Nuclear Power Plants",
        description: "Commercial nuclear electricity generation",
        facilities: [
          {
            code: "NUCL-PP-PWR",
            name: "Pressurized Water Reactor",
            description: "PWR nuclear steam supply system and balance of plant",
            equipment: [
              { componentClass: "ReactorPressureVessel", componentClassURI: REACTOR_URI, displayName: "Reactor Pressure Vessel", category: "static", typicalQuantity: { min: 1, max: 1 } },
              { componentClass: "SteamGenerator", componentClassURI: HEAT_EXCHANGER_URI, displayName: "Steam Generator", category: "static", typicalQuantity: { min: 2, max: 4 } },
              { componentClass: "ReactorCoolantPump", componentClassURI: PUMP_URI, displayName: "Reactor Coolant Pump", category: "rotating", typicalQuantity: { min: 2, max: 4 } },
              { componentClass: "Pressurizer", componentClassURI: PRESSURE_VESSEL_URI, displayName: "Pressurizer", category: "static", typicalQuantity: { min: 1, max: 1 } },
              { componentClass: "SteamTurbine", componentClassURI: TURBINE_URI, displayName: "Main Steam Turbine", category: "rotating", typicalQuantity: { min: 1, max: 1 } },
              { componentClass: "Generator", componentClassURI: GENERATOR_URI, displayName: "Main Generator", category: "electrical", typicalQuantity: { min: 1, max: 1 } },
              { componentClass: "SafetyInjectionPump", componentClassURI: PUMP_URI, displayName: "Safety Injection Pump", category: "rotating", typicalQuantity: { min: 2, max: 4 } },
              { componentClass: "ContainmentSpray", componentClassURI: PUMP_URI, displayName: "Containment Spray Pump", category: "rotating", typicalQuantity: { min: 2, max: 2 } },
            ],
          },
          {
            code: "NUCL-PP-BWR",
            name: "Boiling Water Reactor",
            description: "BWR direct-cycle nuclear power plant",
            equipment: [
              { componentClass: "ReactorPressureVessel", componentClassURI: REACTOR_URI, displayName: "Reactor Vessel", category: "static", typicalQuantity: { min: 1, max: 1 } },
              { componentClass: "RecirculationPump", componentClassURI: PUMP_URI, displayName: "Recirculation Pump", category: "rotating", typicalQuantity: { min: 2, max: 2 } },
              { componentClass: "SteamTurbine", componentClassURI: TURBINE_URI, displayName: "HP/LP Turbine Set", category: "rotating", typicalQuantity: { min: 1, max: 1 } },
              { componentClass: "Condenser", componentClassURI: CONDENSER_URI, displayName: "Main Condenser", category: "static", typicalQuantity: { min: 1, max: 1 } },
              { componentClass: "FeedwaterPump", componentClassURI: PUMP_URI, displayName: "Reactor Feed Pump", category: "rotating", typicalQuantity: { min: 3, max: 3 } },
              { componentClass: "Generator", componentClassURI: GENERATOR_URI, displayName: "Main Generator", category: "electrical", typicalQuantity: { min: 1, max: 1 } },
            ],
          },
        ],
      },
      {
        code: "NUCL-FC",
        name: "Fuel Cycle",
        description: "Nuclear fuel fabrication, enrichment, and waste storage",
        facilities: [
          {
            code: "NUCL-FC-SFP",
            name: "Spent Fuel Storage",
            description: "Wet and dry spent fuel storage facility",
            equipment: [
              { componentClass: "SpentFuelPool", componentClassURI: TANK_URI, displayName: "Spent Fuel Pool", category: "static", typicalQuantity: { min: 1, max: 2 } },
              { componentClass: "CoolingPump", componentClassURI: PUMP_URI, displayName: "SFP Cooling Pump", category: "rotating", typicalQuantity: { min: 2, max: 4 } },
              { componentClass: "HeatExchanger", componentClassURI: HEAT_EXCHANGER_URI, displayName: "SFP Heat Exchanger", category: "static", typicalQuantity: { min: 2, max: 4 } },
              { componentClass: "RadiationMonitor", componentClassURI: ANALYZER_URI, displayName: "Area Radiation Monitor", category: "instrumentation", typicalQuantity: { min: 8, max: 20 } },
            ],
          },
        ],
      },
    ],
  },

  // ━━━ 4. CHEMICAL ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    code: "CHEM",
    name: "Chemical",
    icon: "FlaskConical",
    description: "Basic chemicals, specialty chemicals, and pharmaceutical manufacturing",
    color: "#EF4444",
    subSectors: [
      {
        code: "CHEM-BC",
        name: "Basic Chemicals",
        description: "Petrochemicals, industrial gases, commodity chemicals",
        facilities: [
          {
            code: "CHEM-BC-CRACK",
            name: "Steam Cracker",
            description: "Ethylene/propylene production via thermal cracking",
            equipment: [
              { componentClass: "CrackingFurnace", componentClassURI: BOILER_URI, displayName: "Cracking Furnace", category: "static", typicalQuantity: { min: 4, max: 12 } },
              { componentClass: "QuenchColumn", componentClassURI: COLUMN_URI, displayName: "Quench Tower", category: "static", typicalQuantity: { min: 1, max: 2 } },
              { componentClass: "CryogenicSeparator", componentClassURI: COLUMN_URI, displayName: "Demethanizer Column", category: "static", typicalQuantity: { min: 1, max: 2 } },
              { componentClass: "Compressor", componentClassURI: COMPRESSOR_URI, displayName: "Cracked Gas Compressor", category: "rotating", typicalQuantity: { min: 3, max: 6 } },
              { componentClass: "HeatExchanger", componentClassURI: HEAT_EXCHANGER_URI, displayName: "Transfer Line Exchanger", category: "static", typicalQuantity: { min: 4, max: 12 } },
              { componentClass: "ControlValve", componentClassURI: CONTROL_VALVE_URI, displayName: "Control Valve", category: "instrumentation", typicalQuantity: { min: 150, max: 500 } },
            ],
          },
          {
            code: "CHEM-BC-NH3",
            name: "Ammonia Plant",
            description: "Synthetic ammonia production via Haber-Bosch process",
            equipment: [
              { componentClass: "SynthesisReactor", componentClassURI: REACTOR_URI, displayName: "Ammonia Synthesis Converter", category: "static", typicalQuantity: { min: 1, max: 2 } },
              { componentClass: "SynGasCompressor", componentClassURI: COMPRESSOR_URI, displayName: "Synthesis Gas Compressor", category: "rotating", typicalQuantity: { min: 1, max: 2 } },
              { componentClass: "Reformer", componentClassURI: BOILER_URI, displayName: "Primary Reformer", category: "static", typicalQuantity: { min: 1, max: 1 } },
              { componentClass: "CO2Absorber", componentClassURI: COLUMN_URI, displayName: "CO2 Absorber", category: "static", typicalQuantity: { min: 1, max: 2 } },
              { componentClass: "Methanator", componentClassURI: REACTOR_URI, displayName: "Methanator", category: "static", typicalQuantity: { min: 1, max: 1 } },
              { componentClass: "AmmoniaStorage", componentClassURI: TANK_URI, displayName: "Ammonia Storage Tank", category: "static", typicalQuantity: { min: 1, max: 3 } },
            ],
          },
        ],
      },
      {
        code: "CHEM-SC",
        name: "Specialty Chemicals",
        description: "Fine chemicals, catalysts, and performance chemicals",
        facilities: [
          {
            code: "CHEM-SC-BATCH",
            name: "Batch Reactor Plant",
            description: "Multi-purpose batch chemical production facility",
            equipment: [
              { componentClass: "BatchReactor", componentClassURI: REACTOR_URI, displayName: "Jacketed Batch Reactor", category: "static", typicalQuantity: { min: 4, max: 12 } },
              { componentClass: "Agitator", componentClassURI: AGITATOR_URI, displayName: "Reactor Agitator", category: "rotating", typicalQuantity: { min: 4, max: 12 } },
              { componentClass: "Condenser", componentClassURI: CONDENSER_URI, displayName: "Reflux Condenser", category: "static", typicalQuantity: { min: 4, max: 12 } },
              { componentClass: "Filter", componentClassURI: FILTER_URI, displayName: "Pressure Filter", category: "static", typicalQuantity: { min: 2, max: 6 } },
              { componentClass: "TransferPump", componentClassURI: PUMP_URI, displayName: "Process Transfer Pump", category: "rotating", typicalQuantity: { min: 6, max: 20 } },
            ],
          },
        ],
      },
    ],
  },

  // ━━━ 5. CRITICAL MANUFACTURING ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    code: "CMAN",
    name: "Critical Manufacturing",
    icon: "Factory",
    description: "Primary metals, machinery, electrical equipment, transportation equipment",
    color: "#6B7280",
    subSectors: [
      {
        code: "CMAN-PM",
        name: "Primary Metals",
        description: "Steel, aluminum, and specialty metals production",
        facilities: [
          {
            code: "CMAN-PM-STEEL",
            name: "Integrated Steel Mill",
            description: "Blast furnace and basic oxygen steelmaking",
            equipment: [
              { componentClass: "BlastFurnace", componentClassURI: BOILER_URI, displayName: "Blast Furnace", category: "static", typicalQuantity: { min: 1, max: 3 } },
              { componentClass: "BasicOxygenFurnace", componentClassURI: REACTOR_URI, displayName: "BOF Converter", category: "static", typicalQuantity: { min: 1, max: 3 } },
              { componentClass: "ContinuousCaster", componentClassURI: CONVEYOR_URI, displayName: "Continuous Caster", category: "rotating", typicalQuantity: { min: 1, max: 3 } },
              { componentClass: "HotStripMill", componentClassURI: CONVEYOR_URI, displayName: "Hot Strip Mill", category: "rotating", typicalQuantity: { min: 1, max: 2 } },
              { componentClass: "Blower", componentClassURI: FAN_URI, displayName: "Blast Furnace Blower", category: "rotating", typicalQuantity: { min: 2, max: 4 } },
              { componentClass: "CoolingWaterPump", componentClassURI: PUMP_URI, displayName: "Cooling Water Pump", category: "rotating", typicalQuantity: { min: 6, max: 20 } },
            ],
          },
        ],
      },
      {
        code: "CMAN-AU",
        name: "Automotive Manufacturing",
        description: "Vehicle assembly and component manufacturing",
        facilities: [
          {
            code: "CMAN-AU-ASSY",
            name: "Vehicle Assembly Plant",
            description: "Final vehicle assembly and paint operations",
            equipment: [
              { componentClass: "Conveyor", componentClassURI: CONVEYOR_URI, displayName: "Assembly Line Conveyor", category: "rotating", typicalQuantity: { min: 20, max: 60 } },
              { componentClass: "PaintBooth", componentClassURI: PRESSURE_VESSEL_URI, displayName: "Paint Spray Booth", category: "static", typicalQuantity: { min: 4, max: 12 } },
              { componentClass: "AirCompressor", componentClassURI: COMPRESSOR_URI, displayName: "Plant Air Compressor", category: "rotating", typicalQuantity: { min: 4, max: 10 } },
              { componentClass: "Transformer", componentClassURI: TRANSFORMER_URI, displayName: "Distribution Transformer", category: "electrical", typicalQuantity: { min: 6, max: 20 } },
              { componentClass: "Motor", componentClassURI: MOTOR_URI, displayName: "Drive Motor", category: "electrical", typicalQuantity: { min: 50, max: 200 } },
              { componentClass: "Fan", componentClassURI: FAN_URI, displayName: "Ventilation Fan", category: "rotating", typicalQuantity: { min: 20, max: 60 } },
            ],
          },
          {
            code: "CMAN-AU-ENG",
            name: "Engine Plant",
            description: "Internal combustion engine machining and assembly",
            equipment: [
              { componentClass: "CNCMachine", componentClassURI: MOTOR_URI, displayName: "CNC Machining Center", category: "rotating", typicalQuantity: { min: 20, max: 80 } },
              { componentClass: "CoolantPump", componentClassURI: PUMP_URI, displayName: "Coolant Circulation Pump", category: "rotating", typicalQuantity: { min: 10, max: 40 } },
              { componentClass: "HydraulicUnit", componentClassURI: PUMP_URI, displayName: "Hydraulic Power Unit", category: "rotating", typicalQuantity: { min: 10, max: 30 } },
              { componentClass: "Filter", componentClassURI: FILTER_URI, displayName: "Coolant Filter", category: "static", typicalQuantity: { min: 10, max: 40 } },
            ],
          },
        ],
      },
    ],
  },

  // ━━━ 6. HEALTHCARE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    code: "HLTH",
    name: "Healthcare & Public Health",
    icon: "HeartPulse",
    description: "Hospitals, pharmaceutical manufacturing, medical device production",
    color: "#EC4899",
    subSectors: [
      {
        code: "HLTH-HP",
        name: "Hospitals & Patient Care",
        description: "Acute care, specialty care, and ambulatory facilities",
        facilities: [
          {
            code: "HLTH-HP-HOSP",
            name: "Hospital Complex",
            description: "Full-service acute care hospital with critical systems",
            equipment: [
              { componentClass: "Chiller", componentClassURI: COOLER_URI, displayName: "Centrifugal Chiller", category: "rotating", typicalQuantity: { min: 2, max: 6 } },
              { componentClass: "Boiler", componentClassURI: BOILER_URI, displayName: "Steam Boiler", category: "static", typicalQuantity: { min: 2, max: 4 } },
              { componentClass: "AirHandler", componentClassURI: FAN_URI, displayName: "Air Handling Unit", category: "rotating", typicalQuantity: { min: 10, max: 40 } },
              { componentClass: "Generator", componentClassURI: GENERATOR_URI, displayName: "Emergency Generator", category: "electrical", typicalQuantity: { min: 2, max: 4 } },
              { componentClass: "Transformer", componentClassURI: TRANSFORMER_URI, displayName: "Utility Transformer", category: "electrical", typicalQuantity: { min: 2, max: 6 } },
              { componentClass: "MedicalAirCompressor", componentClassURI: COMPRESSOR_URI, displayName: "Medical Air Compressor", category: "rotating", typicalQuantity: { min: 2, max: 4 } },
            ],
          },
        ],
      },
      {
        code: "HLTH-PH",
        name: "Pharmaceutical Manufacturing",
        description: "Drug substance and drug product manufacturing",
        facilities: [
          {
            code: "HLTH-PH-API",
            name: "API Manufacturing",
            description: "Active pharmaceutical ingredient synthesis and purification",
            equipment: [
              { componentClass: "GlassLinedReactor", componentClassURI: REACTOR_URI, displayName: "Glass-Lined Reactor", category: "static", typicalQuantity: { min: 6, max: 20 } },
              { componentClass: "Centrifuge", componentClassURI: FILTER_URI, displayName: "Peeler Centrifuge", category: "rotating", typicalQuantity: { min: 3, max: 10 } },
              { componentClass: "Dryer", componentClassURI: HEAT_EXCHANGER_URI, displayName: "Vacuum Tray Dryer", category: "static", typicalQuantity: { min: 2, max: 8 } },
              { componentClass: "Agitator", componentClassURI: AGITATOR_URI, displayName: "Reactor Agitator", category: "rotating", typicalQuantity: { min: 6, max: 20 } },
              { componentClass: "PurifiedWaterSystem", componentClassURI: FILTER_URI, displayName: "WFI Generation System", category: "static", typicalQuantity: { min: 1, max: 2 } },
              { componentClass: "ProcessPump", componentClassURI: PUMP_URI, displayName: "Diaphragm Pump", category: "rotating", typicalQuantity: { min: 10, max: 30 } },
            ],
          },
        ],
      },
    ],
  },

  // ━━━ 7. TRANSPORTATION ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    code: "TRAN",
    name: "Transportation Systems",
    icon: "Plane",
    description: "Aviation, maritime, rail, and highway infrastructure",
    color: "#0EA5E9",
    subSectors: [
      {
        code: "TRAN-AV",
        name: "Aviation",
        description: "Airports, air traffic control, and aviation fuel systems",
        facilities: [
          {
            code: "TRAN-AV-ARPT",
            name: "Airport Terminal Complex",
            description: "Passenger terminal with baggage, HVAC, and fuel systems",
            equipment: [
              { componentClass: "BaggageConveyor", componentClassURI: CONVEYOR_URI, displayName: "Baggage Handling Conveyor", category: "rotating", typicalQuantity: { min: 20, max: 80 } },
              { componentClass: "Chiller", componentClassURI: COOLER_URI, displayName: "Central Chiller", category: "rotating", typicalQuantity: { min: 4, max: 10 } },
              { componentClass: "Generator", componentClassURI: GENERATOR_URI, displayName: "Standby Generator", category: "electrical", typicalQuantity: { min: 2, max: 6 } },
              { componentClass: "FuelPump", componentClassURI: PUMP_URI, displayName: "Jet Fuel Transfer Pump", category: "rotating", typicalQuantity: { min: 4, max: 12 } },
              { componentClass: "FuelFilter", componentClassURI: FILTER_URI, displayName: "Fuel Filter Separator", category: "static", typicalQuantity: { min: 4, max: 12 } },
              { componentClass: "Transformer", componentClassURI: TRANSFORMER_URI, displayName: "Main Substation Transformer", category: "electrical", typicalQuantity: { min: 2, max: 6 } },
            ],
          },
        ],
      },
      {
        code: "TRAN-MR",
        name: "Maritime",
        description: "Ports, terminals, and maritime navigation systems",
        facilities: [
          {
            code: "TRAN-MR-PORT",
            name: "Container Port Terminal",
            description: "Intermodal container handling and cargo operations",
            equipment: [
              { componentClass: "GantryCrane", componentClassURI: MOTOR_URI, displayName: "Ship-to-Shore Gantry Crane", category: "rotating", typicalQuantity: { min: 4, max: 12 } },
              { componentClass: "RTGCrane", componentClassURI: MOTOR_URI, displayName: "Rubber-Tired Gantry Crane", category: "rotating", typicalQuantity: { min: 8, max: 30 } },
              { componentClass: "Generator", componentClassURI: GENERATOR_URI, displayName: "Shore Power Generator", category: "electrical", typicalQuantity: { min: 2, max: 6 } },
              { componentClass: "Transformer", componentClassURI: TRANSFORMER_URI, displayName: "Port Substation Transformer", category: "electrical", typicalQuantity: { min: 2, max: 8 } },
              { componentClass: "FirePump", componentClassURI: PUMP_URI, displayName: "Fire Water Pump", category: "rotating", typicalQuantity: { min: 2, max: 4 } },
            ],
          },
        ],
      },
      {
        code: "TRAN-RL",
        name: "Rail Systems",
        description: "Freight and passenger rail infrastructure",
        facilities: [
          {
            code: "TRAN-RL-YARD",
            name: "Rail Marshalling Yard",
            description: "Classification yard with hump and switching systems",
            equipment: [
              { componentClass: "Compressor", componentClassURI: COMPRESSOR_URI, displayName: "Brake Air Compressor", category: "rotating", typicalQuantity: { min: 4, max: 10 } },
              { componentClass: "Transformer", componentClassURI: TRANSFORMER_URI, displayName: "Traction Power Transformer", category: "electrical", typicalQuantity: { min: 2, max: 8 } },
              { componentClass: "CircuitBreaker", componentClassURI: BREAKER_URI, displayName: "HV Circuit Breaker", category: "electrical", typicalQuantity: { min: 4, max: 16 } },
              { componentClass: "FuelPump", componentClassURI: PUMP_URI, displayName: "Diesel Fuel Pump", category: "rotating", typicalQuantity: { min: 2, max: 6 } },
            ],
          },
        ],
      },
    ],
  },

  // ━━━ 8. DAMS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    code: "DAMS",
    name: "Dams",
    icon: "Waves",
    description: "Hydroelectric dams, navigation locks, levees, and flood control",
    color: "#14B8A6",
    subSectors: [
      {
        code: "DAMS-HY",
        name: "Hydroelectric",
        description: "Hydropower generation and water impoundment",
        facilities: [
          {
            code: "DAMS-HY-GRAV",
            name: "Gravity Dam Powerhouse",
            description: "Conventional hydroelectric dam with generation",
            equipment: [
              { componentClass: "FrancisTurbine", componentClassURI: TURBINE_URI, displayName: "Francis Turbine", category: "rotating", typicalQuantity: { min: 1, max: 6 } },
              { componentClass: "Generator", componentClassURI: GENERATOR_URI, displayName: "Hydro Generator", category: "electrical", typicalQuantity: { min: 1, max: 6 } },
              { componentClass: "GovernorValve", componentClassURI: CONTROL_VALVE_URI, displayName: "Wicket Gate", category: "instrumentation", typicalQuantity: { min: 16, max: 24 } },
              { componentClass: "Transformer", componentClassURI: TRANSFORMER_URI, displayName: "Main Power Transformer", category: "electrical", typicalQuantity: { min: 1, max: 6 } },
              { componentClass: "CoolingPump", componentClassURI: PUMP_URI, displayName: "Bearing Cooling Pump", category: "rotating", typicalQuantity: { min: 2, max: 6 } },
              { componentClass: "GateHoist", componentClassURI: MOTOR_URI, displayName: "Spillway Gate Hoist", category: "rotating", typicalQuantity: { min: 2, max: 8 } },
            ],
          },
        ],
      },
      {
        code: "DAMS-NV",
        name: "Navigation",
        description: "Lock and dam navigation systems",
        facilities: [
          {
            code: "DAMS-NV-LOCK",
            name: "Navigation Lock",
            description: "River lock chamber with filling/emptying systems",
            equipment: [
              { componentClass: "LockGateMotor", componentClassURI: MOTOR_URI, displayName: "Lock Gate Motor", category: "electrical", typicalQuantity: { min: 4, max: 8 } },
              { componentClass: "FillValve", componentClassURI: CONTROL_VALVE_URI, displayName: "Filling Valve", category: "instrumentation", typicalQuantity: { min: 4, max: 8 } },
              { componentClass: "DeWateringPump", componentClassURI: PUMP_URI, displayName: "Dewatering Pump", category: "rotating", typicalQuantity: { min: 2, max: 4 } },
              { componentClass: "Generator", componentClassURI: GENERATOR_URI, displayName: "Emergency Generator", category: "electrical", typicalQuantity: { min: 1, max: 2 } },
            ],
          },
        ],
      },
    ],
  },

  // ━━━ 9. FOOD & AGRICULTURE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    code: "FOOD",
    name: "Food & Agriculture",
    icon: "Wheat",
    description: "Food production, processing, storage, and distribution",
    color: "#84CC16",
    subSectors: [
      {
        code: "FOOD-PR",
        name: "Food Processing",
        description: "Industrial food manufacturing and packaging",
        facilities: [
          {
            code: "FOOD-PR-DAIRY",
            name: "Dairy Processing Plant",
            description: "Milk pasteurization, separation, and product manufacturing",
            equipment: [
              { componentClass: "Pasteurizer", componentClassURI: HEAT_EXCHANGER_URI, displayName: "HTST Pasteurizer", category: "static", typicalQuantity: { min: 2, max: 6 } },
              { componentClass: "Separator", componentClassURI: FILTER_URI, displayName: "Cream Separator", category: "rotating", typicalQuantity: { min: 2, max: 4 } },
              { componentClass: "Homogenizer", componentClassURI: PUMP_URI, displayName: "Homogenizer", category: "rotating", typicalQuantity: { min: 2, max: 4 } },
              { componentClass: "CIPSystem", componentClassURI: PUMP_URI, displayName: "CIP Skid", category: "rotating", typicalQuantity: { min: 2, max: 6 } },
              { componentClass: "StorageTank", componentClassURI: TANK_URI, displayName: "Silo Tank", category: "static", typicalQuantity: { min: 4, max: 12 } },
              { componentClass: "Chiller", componentClassURI: COOLER_URI, displayName: "Glycol Chiller", category: "rotating", typicalQuantity: { min: 2, max: 4 } },
            ],
          },
        ],
      },
      {
        code: "FOOD-CC",
        name: "Cold Chain",
        description: "Refrigerated storage and distribution",
        facilities: [
          {
            code: "FOOD-CC-WARE",
            name: "Cold Storage Warehouse",
            description: "Refrigerated and frozen goods storage facility",
            equipment: [
              { componentClass: "AmmoniCompressor", componentClassURI: COMPRESSOR_URI, displayName: "Ammonia Screw Compressor", category: "rotating", typicalQuantity: { min: 3, max: 8 } },
              { componentClass: "Condenser", componentClassURI: CONDENSER_URI, displayName: "Evaporative Condenser", category: "static", typicalQuantity: { min: 2, max: 6 } },
              { componentClass: "Evaporator", componentClassURI: COOLER_URI, displayName: "Unit Cooler / Evaporator", category: "static", typicalQuantity: { min: 6, max: 20 } },
              { componentClass: "AmmoniaPump", componentClassURI: PUMP_URI, displayName: "Ammonia Liquid Pump", category: "rotating", typicalQuantity: { min: 2, max: 6 } },
              { componentClass: "Generator", componentClassURI: GENERATOR_URI, displayName: "Emergency Generator", category: "electrical", typicalQuantity: { min: 1, max: 2 } },
            ],
          },
        ],
      },
    ],
  },

  // ━━━ 10. FINANCIAL SERVICES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    code: "FINA",
    name: "Financial Services",
    icon: "Landmark",
    description: "Banking, securities exchanges, and financial data centers",
    color: "#059669",
    subSectors: [
      {
        code: "FINA-DC",
        name: "Data Centers",
        description: "Financial data processing and trading infrastructure",
        facilities: [
          {
            code: "FINA-DC-TIER4",
            name: "Tier IV Data Center",
            description: "Fault-tolerant financial data center with 2N redundancy",
            equipment: [
              { componentClass: "Chiller", componentClassURI: COOLER_URI, displayName: "Centrifugal Chiller", category: "rotating", typicalQuantity: { min: 4, max: 12 } },
              { componentClass: "UPS", componentClassURI: TRANSFORMER_URI, displayName: "Rotary UPS", category: "electrical", typicalQuantity: { min: 4, max: 12 } },
              { componentClass: "Generator", componentClassURI: GENERATOR_URI, displayName: "Diesel Generator", category: "electrical", typicalQuantity: { min: 4, max: 12 } },
              { componentClass: "CRAC", componentClassURI: FAN_URI, displayName: "Computer Room Air Conditioner", category: "rotating", typicalQuantity: { min: 20, max: 60 } },
              { componentClass: "Transformer", componentClassURI: TRANSFORMER_URI, displayName: "PDU Transformer", category: "electrical", typicalQuantity: { min: 8, max: 30 } },
              { componentClass: "Pump", componentClassURI: PUMP_URI, displayName: "Chilled Water Pump", category: "rotating", typicalQuantity: { min: 4, max: 12 } },
            ],
          },
        ],
      },
      {
        code: "FINA-EX",
        name: "Exchanges",
        description: "Securities and commodities trading venues",
        facilities: [
          {
            code: "FINA-EX-TRADE",
            name: "Trading Floor Facility",
            description: "Securities exchange trading floor and matching engine",
            equipment: [
              { componentClass: "UPS", componentClassURI: TRANSFORMER_URI, displayName: "Online UPS System", category: "electrical", typicalQuantity: { min: 2, max: 6 } },
              { componentClass: "Generator", componentClassURI: GENERATOR_URI, displayName: "Emergency Generator", category: "electrical", typicalQuantity: { min: 2, max: 4 } },
              { componentClass: "Chiller", componentClassURI: COOLER_URI, displayName: "Precision Chiller", category: "rotating", typicalQuantity: { min: 2, max: 6 } },
              { componentClass: "AirHandler", componentClassURI: FAN_URI, displayName: "Precision Air Handler", category: "rotating", typicalQuantity: { min: 4, max: 12 } },
            ],
          },
        ],
      },
    ],
  },

  // ━━━ 11. DEFENSE INDUSTRIAL BASE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    code: "DEFN",
    name: "Defense Industrial Base",
    icon: "Shield",
    description: "Military weapons systems, aerospace, shipbuilding, and defense electronics",
    color: "#475569",
    subSectors: [
      {
        code: "DEFN-AE",
        name: "Aerospace & Defense",
        description: "Military aircraft, missile, and space vehicle production",
        facilities: [
          {
            code: "DEFN-AE-MFAB",
            name: "Aerospace Manufacturing Facility",
            description: "Military aircraft assembly and composite fabrication",
            equipment: [
              { componentClass: "Autoclave", componentClassURI: PRESSURE_VESSEL_URI, displayName: "Composite Autoclave", category: "static", typicalQuantity: { min: 1, max: 4 } },
              { componentClass: "CleanRoomAHU", componentClassURI: FAN_URI, displayName: "Cleanroom AHU", category: "rotating", typicalQuantity: { min: 4, max: 12 } },
              { componentClass: "Compressor", componentClassURI: COMPRESSOR_URI, displayName: "Instrument Air Compressor", category: "rotating", typicalQuantity: { min: 2, max: 6 } },
              { componentClass: "Crane", componentClassURI: MOTOR_URI, displayName: "Overhead Bridge Crane", category: "rotating", typicalQuantity: { min: 4, max: 10 } },
              { componentClass: "Generator", componentClassURI: GENERATOR_URI, displayName: "Backup Generator", category: "electrical", typicalQuantity: { min: 2, max: 4 } },
            ],
          },
        ],
      },
      {
        code: "DEFN-SB",
        name: "Shipbuilding",
        description: "Naval vessel construction and repair",
        facilities: [
          {
            code: "DEFN-SB-DRYD",
            name: "Dry Dock Facility",
            description: "Naval vessel construction and overhaul dry dock",
            equipment: [
              { componentClass: "DockPump", componentClassURI: PUMP_URI, displayName: "Dry Dock Dewatering Pump", category: "rotating", typicalQuantity: { min: 4, max: 8 } },
              { componentClass: "Crane", componentClassURI: MOTOR_URI, displayName: "Gantry Crane", category: "rotating", typicalQuantity: { min: 2, max: 6 } },
              { componentClass: "Compressor", componentClassURI: COMPRESSOR_URI, displayName: "Shipyard Air Compressor", category: "rotating", typicalQuantity: { min: 4, max: 10 } },
              { componentClass: "Transformer", componentClassURI: TRANSFORMER_URI, displayName: "Shore Power Transformer", category: "electrical", typicalQuantity: { min: 2, max: 6 } },
              { componentClass: "Generator", componentClassURI: GENERATOR_URI, displayName: "Mobile Generator", category: "electrical", typicalQuantity: { min: 4, max: 8 } },
            ],
          },
        ],
      },
    ],
  },

  // ━━━ 12. EMERGENCY SERVICES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    code: "EMER",
    name: "Emergency Services",
    icon: "Siren",
    description: "Law enforcement, fire services, EMS, and emergency management",
    color: "#DC2626",
    subSectors: [
      {
        code: "EMER-FS",
        name: "Fire Services",
        description: "Fire suppression, prevention, and hazmat response",
        facilities: [
          {
            code: "EMER-FS-STAT",
            name: "Fire Station",
            description: "Fire and emergency response station with apparatus",
            equipment: [
              { componentClass: "Generator", componentClassURI: GENERATOR_URI, displayName: "Emergency Generator", category: "electrical", typicalQuantity: { min: 1, max: 2 } },
              { componentClass: "AirCompressor", componentClassURI: COMPRESSOR_URI, displayName: "SCBA Fill Compressor", category: "rotating", typicalQuantity: { min: 1, max: 2 } },
              { componentClass: "ExhaustSystem", componentClassURI: FAN_URI, displayName: "Vehicle Exhaust Extraction", category: "rotating", typicalQuantity: { min: 2, max: 6 } },
              { componentClass: "Transformer", componentClassURI: TRANSFORMER_URI, displayName: "Service Transformer", category: "electrical", typicalQuantity: { min: 1, max: 1 } },
            ],
          },
        ],
      },
      {
        code: "EMER-EM",
        name: "Emergency Management",
        description: "Emergency operations centers and 911 dispatch",
        facilities: [
          {
            code: "EMER-EM-PSAP",
            name: "Public Safety Answering Point",
            description: "911 dispatch center with redundant communications",
            equipment: [
              { componentClass: "UPS", componentClassURI: TRANSFORMER_URI, displayName: "Online UPS", category: "electrical", typicalQuantity: { min: 2, max: 4 } },
              { componentClass: "Generator", componentClassURI: GENERATOR_URI, displayName: "Diesel Generator", category: "electrical", typicalQuantity: { min: 1, max: 2 } },
              { componentClass: "HVAC", componentClassURI: FAN_URI, displayName: "Precision HVAC Unit", category: "rotating", typicalQuantity: { min: 2, max: 4 } },
              { componentClass: "Transformer", componentClassURI: TRANSFORMER_URI, displayName: "Isolation Transformer", category: "electrical", typicalQuantity: { min: 1, max: 2 } },
            ],
          },
        ],
      },
    ],
  },

  // ━━━ 13. GOVERNMENT FACILITIES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    code: "GOVT",
    name: "Government Facilities",
    icon: "Building2",
    description: "Federal buildings, courthouses, military installations",
    color: "#1D4ED8",
    subSectors: [
      {
        code: "GOVT-FED",
        name: "Federal Facilities",
        description: "Federal government buildings and installations",
        facilities: [
          {
            code: "GOVT-FED-CAMP",
            name: "Federal Campus",
            description: "Multi-building federal government campus with central plant",
            equipment: [
              { componentClass: "Chiller", componentClassURI: COOLER_URI, displayName: "Centrifugal Chiller", category: "rotating", typicalQuantity: { min: 2, max: 6 } },
              { componentClass: "Boiler", componentClassURI: BOILER_URI, displayName: "Hot Water Boiler", category: "static", typicalQuantity: { min: 2, max: 4 } },
              { componentClass: "Pump", componentClassURI: PUMP_URI, displayName: "Chilled Water Pump", category: "rotating", typicalQuantity: { min: 4, max: 8 } },
              { componentClass: "AirHandler", componentClassURI: FAN_URI, displayName: "Air Handling Unit", category: "rotating", typicalQuantity: { min: 10, max: 30 } },
              { componentClass: "Generator", componentClassURI: GENERATOR_URI, displayName: "Emergency Generator", category: "electrical", typicalQuantity: { min: 2, max: 4 } },
              { componentClass: "Transformer", componentClassURI: TRANSFORMER_URI, displayName: "Pad-Mount Transformer", category: "electrical", typicalQuantity: { min: 4, max: 10 } },
            ],
          },
        ],
      },
      {
        code: "GOVT-ML",
        name: "Military Installations",
        description: "Military bases, depots, and arsenals",
        facilities: [
          {
            code: "GOVT-ML-BASE",
            name: "Military Base",
            description: "Active military installation with airfield and utilities",
            equipment: [
              { componentClass: "Generator", componentClassURI: GENERATOR_URI, displayName: "Prime Power Generator", category: "electrical", typicalQuantity: { min: 4, max: 10 } },
              { componentClass: "FuelPump", componentClassURI: PUMP_URI, displayName: "Aviation Fuel Pump", category: "rotating", typicalQuantity: { min: 4, max: 10 } },
              { componentClass: "StorageTank", componentClassURI: TANK_URI, displayName: "Fuel Storage Tank", category: "static", typicalQuantity: { min: 4, max: 12 } },
              { componentClass: "Boiler", componentClassURI: BOILER_URI, displayName: "Central Heating Boiler", category: "static", typicalQuantity: { min: 2, max: 6 } },
              { componentClass: "Transformer", componentClassURI: TRANSFORMER_URI, displayName: "Distribution Transformer", category: "electrical", typicalQuantity: { min: 10, max: 30 } },
            ],
          },
        ],
      },
    ],
  },

  // ━━━ 14. COMMERCIAL FACILITIES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    code: "COMM",
    name: "Commercial Facilities",
    icon: "Store",
    description: "Hotels, convention centers, stadiums, casinos, and theme parks",
    color: "#F97316",
    subSectors: [
      {
        code: "COMM-EN",
        name: "Entertainment & Assembly",
        description: "Sports venues, casinos, theme parks, and convention centers",
        facilities: [
          {
            code: "COMM-EN-ARENA",
            name: "Sports Arena / Stadium",
            description: "Large-capacity indoor/outdoor entertainment venue",
            equipment: [
              { componentClass: "Chiller", componentClassURI: COOLER_URI, displayName: "Central Plant Chiller", category: "rotating", typicalQuantity: { min: 4, max: 8 } },
              { componentClass: "Boiler", componentClassURI: BOILER_URI, displayName: "Condensing Boiler", category: "static", typicalQuantity: { min: 2, max: 4 } },
              { componentClass: "AirHandler", componentClassURI: FAN_URI, displayName: "Large AHU", category: "rotating", typicalQuantity: { min: 10, max: 30 } },
              { componentClass: "Generator", componentClassURI: GENERATOR_URI, displayName: "Emergency Generator", category: "electrical", typicalQuantity: { min: 2, max: 4 } },
              { componentClass: "Transformer", componentClassURI: TRANSFORMER_URI, displayName: "Utility Transformer", category: "electrical", typicalQuantity: { min: 4, max: 10 } },
              { componentClass: "FirePump", componentClassURI: PUMP_URI, displayName: "Fire Pump", category: "rotating", typicalQuantity: { min: 2, max: 4 } },
            ],
          },
          {
            code: "COMM-EN-CASINO",
            name: "Casino Resort",
            description: "Gaming resort with hotel, convention, and entertainment",
            equipment: [
              { componentClass: "Chiller", componentClassURI: COOLER_URI, displayName: "Central Chiller", category: "rotating", typicalQuantity: { min: 4, max: 12 } },
              { componentClass: "Generator", componentClassURI: GENERATOR_URI, displayName: "Standby Generator", category: "electrical", typicalQuantity: { min: 4, max: 8 } },
              { componentClass: "UPS", componentClassURI: TRANSFORMER_URI, displayName: "Gaming Floor UPS", category: "electrical", typicalQuantity: { min: 4, max: 12 } },
              { componentClass: "AirHandler", componentClassURI: FAN_URI, displayName: "Smoke Management AHU", category: "rotating", typicalQuantity: { min: 10, max: 30 } },
              { componentClass: "Pump", componentClassURI: PUMP_URI, displayName: "Chilled Water Pump", category: "rotating", typicalQuantity: { min: 4, max: 12 } },
            ],
          },
        ],
      },
      {
        code: "COMM-LG",
        name: "Lodging",
        description: "Hotels, resorts, and conference centers",
        facilities: [
          {
            code: "COMM-LG-HOTEL",
            name: "High-Rise Hotel",
            description: "Full-service high-rise hotel with central mechanical plant",
            equipment: [
              { componentClass: "Chiller", componentClassURI: COOLER_URI, displayName: "Water-Cooled Chiller", category: "rotating", typicalQuantity: { min: 2, max: 4 } },
              { componentClass: "Boiler", componentClassURI: BOILER_URI, displayName: "Domestic Hot Water Boiler", category: "static", typicalQuantity: { min: 2, max: 4 } },
              { componentClass: "Elevator", componentClassURI: MOTOR_URI, displayName: "Traction Elevator", category: "rotating", typicalQuantity: { min: 4, max: 12 } },
              { componentClass: "Generator", componentClassURI: GENERATOR_URI, displayName: "Life Safety Generator", category: "electrical", typicalQuantity: { min: 1, max: 2 } },
              { componentClass: "Pump", componentClassURI: PUMP_URI, displayName: "Booster Pump", category: "rotating", typicalQuantity: { min: 2, max: 4 } },
            ],
          },
        ],
      },
    ],
  },

  // ━━━ 15. COMMUNICATIONS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    code: "COMU",
    name: "Communications",
    icon: "Radio",
    description: "Telecommunications, broadcasting, and internet infrastructure",
    color: "#7C3AED",
    subSectors: [
      {
        code: "COMU-TC",
        name: "Telecommunications",
        description: "Wireline and wireless communications infrastructure",
        facilities: [
          {
            code: "COMU-TC-CO",
            name: "Central Office",
            description: "Telecommunications switching and routing center",
            equipment: [
              { componentClass: "UPS", componentClassURI: TRANSFORMER_URI, displayName: "DC Power Plant / UPS", category: "electrical", typicalQuantity: { min: 4, max: 12 } },
              { componentClass: "Generator", componentClassURI: GENERATOR_URI, displayName: "Standby Diesel Generator", category: "electrical", typicalQuantity: { min: 2, max: 4 } },
              { componentClass: "HVAC", componentClassURI: FAN_URI, displayName: "Precision Cooling Unit", category: "rotating", typicalQuantity: { min: 6, max: 20 } },
              { componentClass: "Transformer", componentClassURI: TRANSFORMER_URI, displayName: "Utility Transformer", category: "electrical", typicalQuantity: { min: 1, max: 2 } },
              { componentClass: "FireSuppression", componentClassURI: PRESSURE_VESSEL_URI, displayName: "FM-200 Fire Suppression", category: "static", typicalQuantity: { min: 2, max: 6 } },
            ],
          },
        ],
      },
      {
        code: "COMU-BC",
        name: "Broadcasting",
        description: "Television, radio, and satellite broadcasting",
        facilities: [
          {
            code: "COMU-BC-TOWER",
            name: "Broadcast Tower Site",
            description: "Radio/TV transmission tower with power and cooling",
            equipment: [
              { componentClass: "Generator", componentClassURI: GENERATOR_URI, displayName: "Standby Generator", category: "electrical", typicalQuantity: { min: 1, max: 2 } },
              { componentClass: "UPS", componentClassURI: TRANSFORMER_URI, displayName: "Transmitter UPS", category: "electrical", typicalQuantity: { min: 1, max: 2 } },
              { componentClass: "HVAC", componentClassURI: FAN_URI, displayName: "Transmitter Cooling Unit", category: "rotating", typicalQuantity: { min: 2, max: 4 } },
              { componentClass: "Transformer", componentClassURI: TRANSFORMER_URI, displayName: "Step-Up Transformer", category: "electrical", typicalQuantity: { min: 1, max: 2 } },
            ],
          },
        ],
      },
    ],
  },

  // ━━━ 16. INFORMATION TECHNOLOGY ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    code: "ITEC",
    name: "Information Technology",
    icon: "Server",
    description: "Internet infrastructure, cloud data centers, DNS root servers",
    color: "#4F46E5",
    subSectors: [
      {
        code: "ITEC-DC",
        name: "Data Centers",
        description: "Cloud and colocation data center infrastructure",
        facilities: [
          {
            code: "ITEC-DC-HYPER",
            name: "Hyperscale Data Center",
            description: "Large-scale cloud computing data center (50+ MW)",
            equipment: [
              { componentClass: "Chiller", componentClassURI: COOLER_URI, displayName: "Chiller Plant", category: "rotating", typicalQuantity: { min: 8, max: 30 } },
              { componentClass: "CoolingTower", componentClassURI: CONDENSER_URI, displayName: "Cooling Tower", category: "static", typicalQuantity: { min: 4, max: 16 } },
              { componentClass: "Generator", componentClassURI: GENERATOR_URI, displayName: "Diesel Rotary UPS", category: "electrical", typicalQuantity: { min: 20, max: 60 } },
              { componentClass: "Transformer", componentClassURI: TRANSFORMER_URI, displayName: "Medium Voltage Transformer", category: "electrical", typicalQuantity: { min: 10, max: 40 } },
              { componentClass: "Pump", componentClassURI: PUMP_URI, displayName: "Chilled Water Pump", category: "rotating", typicalQuantity: { min: 8, max: 30 } },
              { componentClass: "CircuitBreaker", componentClassURI: BREAKER_URI, displayName: "MV Switchgear", category: "electrical", typicalQuantity: { min: 20, max: 80 } },
              { componentClass: "Fan", componentClassURI: FAN_URI, displayName: "Hot Aisle Containment Fan", category: "rotating", typicalQuantity: { min: 50, max: 200 } },
            ],
          },
        ],
      },
      {
        code: "ITEC-IX",
        name: "Internet Exchange",
        description: "Internet exchange points and DNS infrastructure",
        facilities: [
          {
            code: "ITEC-IX-IXP",
            name: "Internet Exchange Point",
            description: "Peering facility for ISP interconnection",
            equipment: [
              { componentClass: "UPS", componentClassURI: TRANSFORMER_URI, displayName: "Modular UPS", category: "electrical", typicalQuantity: { min: 4, max: 8 } },
              { componentClass: "Generator", componentClassURI: GENERATOR_URI, displayName: "Backup Generator", category: "electrical", typicalQuantity: { min: 2, max: 4 } },
              { componentClass: "CRAC", componentClassURI: FAN_URI, displayName: "In-Row Cooling Unit", category: "rotating", typicalQuantity: { min: 8, max: 20 } },
              { componentClass: "Transformer", componentClassURI: TRANSFORMER_URI, displayName: "PDU Transformer", category: "electrical", typicalQuantity: { min: 4, max: 12 } },
            ],
          },
        ],
      },
    ],
  },
];

// ─── Helper Functions ─────────────────────────────────────────────────────────

export function getSector(code: string): DexpiSector | undefined {
  return SECTORS.find((s) => s.code === code);
}

export function getSubSector(sectorCode: string, subCode: string): DexpiSubSector | undefined {
  const sector = getSector(sectorCode);
  if (!sector) return undefined;
  return sector.subSectors.find((ss) => ss.code === subCode);
}

export function getFacilityType(
  sectorCode: string,
  subCode: string,
  facilityCode: string,
): DexpiFacilityType | undefined {
  const subSector = getSubSector(sectorCode, subCode);
  if (!subSector) return undefined;
  return subSector.facilities.find((f) => f.code === facilityCode);
}

export function getAllSectors(): DexpiSector[] {
  return SECTORS;
}

export function getCoverageStats(): {
  sectors: number;
  subSectors: number;
  facilities: number;
  equipmentTypes: number;
} {
  let subSectors = 0;
  let facilities = 0;
  let equipmentTypes = 0;

  for (const sector of SECTORS) {
    subSectors += sector.subSectors.length;
    for (const sub of sector.subSectors) {
      facilities += sub.facilities.length;
      for (const fac of sub.facilities) {
        equipmentTypes += fac.equipment.length;
      }
    }
  }

  return {
    sectors: SECTORS.length,
    subSectors,
    facilities,
    equipmentTypes,
  };
}
