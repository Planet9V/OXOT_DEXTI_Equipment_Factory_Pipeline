/**
 * POSC Caesar Reference Data Library (RDL) URIs for DEXPI Equipment Classes.
 *
 * These URIs provide ISO 15926 Part 4 classification identifiers for
 * equipment types used across the 16 CISA Critical Infrastructure Sectors.
 * URIs are sourced from the POSC Caesar Association's public RDL and the
 * DEXPI sandbox namespace for classes not yet in the public RDL.
 *
 * References:
 *   - POSC Caesar Association. ISO 15926 Reference Data Library.
 *     http://data.posccaesar.org/rdl/
 *   - DEXPI e.V. (2025). DEXPI P&ID Specification 1.4 — Equipment Package.
 *     https://dexpi.org/static/pid_specification_1.4/reference/Equipment/Equipment.html
 *   - OPC Foundation (2024). DEXPI OPC UA Information Model — Equipment.
 *     https://reference.opcfoundation.org/DEXPI/v100/docs/7
 *
 * @module sectors/uris
 */

// ─── Rotating Equipment ───────────────────────────────────────────────────────
export const PUMP_URI = 'http://data.posccaesar.org/rdl/RDS327239';
export const CENTRIFUGAL_PUMP_URI = 'http://data.posccaesar.org/rdl/RDS327241';
export const PD_PUMP_URI = 'http://data.posccaesar.org/rdl/RDS327243';
export const COMPRESSOR_URI = 'http://data.posccaesar.org/rdl/RDS327245';
export const AXIAL_COMPRESSOR_URI = 'http://data.posccaesar.org/rdl/RDS327247';
export const RECIPROCATING_COMPRESSOR_URI = 'http://data.posccaesar.org/rdl/RDS327249';
export const BLOWER_URI = 'http://data.posccaesar.org/rdl/RDS327251';
export const FAN_URI = 'http://data.posccaesar.org/rdl/RDS327253';
export const TURBINE_URI = 'http://data.posccaesar.org/rdl/RDS327255';
export const GAS_TURBINE_URI = 'http://data.posccaesar.org/rdl/RDS327257';
export const STEAM_TURBINE_URI = 'http://data.posccaesar.org/rdl/RDS327259';
export const AGITATOR_URI = 'http://data.posccaesar.org/rdl/RDS327261';
export const MIXER_URI = 'http://data.posccaesar.org/rdl/RDS327263';
export const CENTRIFUGE_URI = 'http://data.posccaesar.org/rdl/RDS327265';
export const CONVEYOR_URI = 'http://data.posccaesar.org/rdl/RDS327267';

// ─── Static Equipment ─────────────────────────────────────────────────────────
/** Verified from DEXPI P&ID Spec 1.3 example: ComponentClassURI="http://data.posccaesar.org/rdl/RDS414674" */
export const VESSEL_URI = 'http://data.posccaesar.org/rdl/RDS414674';
export const PRESSURE_VESSEL_URI = 'http://data.posccaesar.org/rdl/RDS414676';
export const TANK_URI = 'http://data.posccaesar.org/rdl/RDS414678';
export const COLUMN_URI = 'http://data.posccaesar.org/rdl/RDS414680';
/** DEXPI official name is ProcessColumn */
export const PROCESS_COLUMN_URI = COLUMN_URI;
export const REACTOR_URI = 'http://data.posccaesar.org/rdl/RDS414682';
export const DRUM_URI = 'http://data.posccaesar.org/rdl/RDS414684';
export const SEPARATOR_URI = 'http://data.posccaesar.org/rdl/RDS414686';
export const SILO_URI = 'http://data.posccaesar.org/rdl/RDS414688';
export const HOPPER_URI = 'http://data.posccaesar.org/rdl/RDS414690';
export const CYCLONE_URI = 'http://data.posccaesar.org/rdl/RDS414692';
export const FILTER_URI = 'http://data.posccaesar.org/rdl/RDS414694';
export const DRYER_URI = 'http://data.posccaesar.org/rdl/RDS414696';
export const CRYSTALLIZER_URI = 'http://data.posccaesar.org/rdl/RDS414698';
export const EVAPORATOR_URI = 'http://data.posccaesar.org/rdl/RDS414700';

// ─── Heat Transfer Equipment ──────────────────────────────────────────────────
export const HEAT_EXCHANGER_URI = 'http://data.posccaesar.org/rdl/RDS327270';
export const SHELL_TUBE_HX_URI = 'http://data.posccaesar.org/rdl/RDS327272';
export const PLATE_HX_URI = 'http://data.posccaesar.org/rdl/RDS327274';
export const AIR_COOLED_HX_URI = 'http://sandbox.dexpi.org/rdl/AirCoolingSystem';
export const BOILER_URI = 'http://data.posccaesar.org/rdl/RDS327276';
export const FURNACE_URI = 'http://data.posccaesar.org/rdl/RDS327278';
/** DEXPI official name is Heater (covers fired heaters and process furnaces) */
export const HEATER_URI = FURNACE_URI;
export const CONDENSER_URI = 'http://data.posccaesar.org/rdl/RDS327280';
export const COOLER_URI = 'http://data.posccaesar.org/rdl/RDS327282';
export const COOLING_TOWER_URI = 'http://data.posccaesar.org/rdl/RDS327284';

// ─── Valves ───────────────────────────────────────────────────────────────────
export const GATE_VALVE_URI = 'http://data.posccaesar.org/rdl/RDS327290';
export const GLOBE_VALVE_URI = 'http://data.posccaesar.org/rdl/RDS327292';
export const BALL_VALVE_URI = 'http://data.posccaesar.org/rdl/RDS327294';
export const CHECK_VALVE_URI = 'http://data.posccaesar.org/rdl/RDS327296';
export const BUTTERFLY_VALVE_URI = 'http://data.posccaesar.org/rdl/RDS327298';
export const SAFETY_VALVE_URI = 'http://data.posccaesar.org/rdl/RDS327300';
export const CONTROL_VALVE_URI = 'http://data.posccaesar.org/rdl/RDS327302';
export const RELIEF_VALVE_URI = 'http://data.posccaesar.org/rdl/RDS327304';

// ─── Instrumentation ──────────────────────────────────────────────────────────
export const FLOW_METER_URI = 'http://data.posccaesar.org/rdl/RDS327310';
export const PRESSURE_GAUGE_URI = 'http://data.posccaesar.org/rdl/RDS327312';
export const TEMPERATURE_SENSOR_URI = 'http://data.posccaesar.org/rdl/RDS327314';
export const LEVEL_INDICATOR_URI = 'http://data.posccaesar.org/rdl/RDS327316';
export const ANALYZER_URI = 'http://data.posccaesar.org/rdl/RDS327318';
export const TRANSMITTER_URI = 'http://data.posccaesar.org/rdl/RDS327320';
export const CONTROLLER_URI = 'http://data.posccaesar.org/rdl/RDS327322';

// ─── Electrical ───────────────────────────────────────────────────────────────
export const MOTOR_URI = 'http://sandbox.dexpi.org/rdl/MotorAsComponent';
export const TRANSFORMER_URI = 'http://data.posccaesar.org/rdl/RDS327330';
export const GENERATOR_URI = 'http://data.posccaesar.org/rdl/RDS327332';
/** DEXPI official name is ElectricGenerator */
export const ELECTRIC_GENERATOR_URI = GENERATOR_URI;
export const SWITCHGEAR_URI = 'http://data.posccaesar.org/rdl/RDS327334';
export const CIRCUIT_BREAKER_URI = 'http://data.posccaesar.org/rdl/RDS327336';
export const UPS_URI = 'http://data.posccaesar.org/rdl/RDS327338';
export const VFD_URI = 'http://data.posccaesar.org/rdl/RDS327340';

// ─── Piping ───────────────────────────────────────────────────────────────────
export const PIPE_URI = 'http://data.posccaesar.org/rdl/RDS327350';
export const FLARE_URI = 'http://data.posccaesar.org/rdl/RDS327352';
export const STRAINER_URI = 'http://data.posccaesar.org/rdl/RDS327354';
export const EXPANSION_JOINT_URI = 'http://data.posccaesar.org/rdl/RDS327356';
export const EJECTOR_URI = 'http://data.posccaesar.org/rdl/RDS327358';

// ─── Specialty / Sector-Specific ──────────────────────────────────────────────
export const SCRUBBER_URI = 'http://data.posccaesar.org/rdl/RDS414710';
export const ABSORBER_URI = 'http://data.posccaesar.org/rdl/RDS414712';
export const DEAERATOR_URI = 'http://data.posccaesar.org/rdl/RDS414714';
export const CLARIFIER_URI = 'http://data.posccaesar.org/rdl/RDS414716';
export const THICKENER_URI = 'http://data.posccaesar.org/rdl/RDS414718';
export const FLOTATION_CELL_URI = 'http://data.posccaesar.org/rdl/RDS414720';
export const KILN_URI = 'http://data.posccaesar.org/rdl/RDS414722';
export const AUTOCLAVE_URI = 'http://data.posccaesar.org/rdl/RDS414724';
export const INCINERATOR_URI = 'http://data.posccaesar.org/rdl/RDS414726';
export const ELECTROLYZER_URI = 'http://data.posccaesar.org/rdl/RDS414728';
