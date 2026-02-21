import * as fs from 'fs';
import * as path from 'path';

const SECTOR_CODE = 'NUCL';
const SUB_SECTOR_CODE = 'NUCL-ALL';

interface RegistryItem {
    type: string;
    category: string;
    tags: string[];
    description: string;
}

const equipmentList: RegistryItem[] = [
    // Core Process - Reactor & Vessels (PWR)
    { type: "Reactor Pressure Vessel (PWR)", category: "static", tags: ["REACTOR", "VESSEL", "NUCLEAR"], description: "Thick-walled cylindrical vessel containing the nuclear fuel core and coolant." },
    { type: "Steam Generator (U-Tube)", category: "heat-transfer", tags: ["HX", "NUCLEAR", "STEAM"], description: "Heat exchanger transferring heat from primary to secondary loop to generate steam." },
    { type: "Pressurizer", category: "static", tags: ["VESSEL", "PRESSURE_CONTROL", "PWR"], description: "Vessel maintaining primary circuit pressure via heaters and spray." },
    { type: "Reactor Coolant Pump (RCP)", category: "rotating", tags: ["PUMP", "KINETIC", "PRIMARY"], description: "Large vertical pump circulating primary coolant through the reactor core." },
    { type: "Control Rod Drive Mechanism (CRDM)", category: "static", tags: ["CONTROL", "SAFETY", "REACTIVITY"], description: "Electro-mechanical device for inserting/withdrawing control rods." },
    { type: "Fuel Assembly (PWR)", category: "static", tags: ["FUEL", "CORE", "ZIRCALOY"], description: "Bundle of fuel rods containing uranium dioxide pellets." },
    { type: "Accumulator Tank (ECCS)", category: "static", tags: ["TANK", "SAFETY", "INJECTION"], description: "Pressurized tank for passive injection of borated water during LOCA." },

    // Core Process - Reactor & Vessels (BWR)
    { type: "Reactor Pressure Vessel (BWR)", category: "static", tags: ["REACTOR", "VESSEL", "BOILING"], description: "Vessel where coolant boils directly in the core to produce steam." },
    { type: "Jet Pump Assembly", category: "static", tags: ["PUMP", "STATIC", "CIRCULATION"], description: "Internal pump using driving flow to circulate coolant in BWRs." },
    { type: "Steam Separator", category: "static", tags: ["SEPARATOR", "STEAM", "INTERNAL"], description: "Device removing moisture from steam leaving the core." },
    { type: "Steam Dryer", category: "static", tags: ["DRYER", "STEAM", "INTERNAL"], description: "Device removing remaining moisture before steam exits vessel." },
    { type: "Recirculation Pump", category: "rotating", tags: ["PUMP", "KINETIC", "BWR"], description: "External pump driving the jet pumps for core flow control." },

    // Core Process - Balance of Plant (Steam Cycle)
    { type: "Steam Turbine (High Pressure)", category: "rotating", tags: ["TURBINE", "STEAM", "GENERATION"], description: "Turbine stage receiving main steam from steam generators/reactor." },
    { type: "Steam Turbine (Low Pressure)", category: "rotating", tags: ["TURBINE", "STEAM", "GENERATION"], description: "Large turbine stage exhausting to the condenser." },
    { type: "Moisture Separator Reheater (MSR)", category: "heat-transfer", tags: ["HX", "SEPARATOR", "EFFICIENCY"], description: "Vessel drying and reheating steam between HP and LP turbines." },
    { type: "Main Condenser", category: "heat-transfer", tags: ["HX", "VACUUM", "CONDENSING"], description: "Large heat exchanger condensing turbine exhaust steam." },
    { type: "Condensate Extraction Pump", category: "rotating", tags: ["PUMP", "KINETIC", "CONDENSATE"], description: "Pump moving water from condenser hotwell to purification system." },
    { type: "Feedwater Heater (Low Pressure)", category: "heat-transfer", tags: ["HX", "FEEDWATER", "EFFICIENCY"], description: "Shell and tube exchanger preheating condensate." },
    { type: "Deaerator", category: "static", tags: ["VESSEL", "DEAERATION", "FEEDWATER"], description: "Vessel removing dissolved oxygen from feedwater." },
    { type: "Feedwater Heater (High Pressure)", category: "heat-transfer", tags: ["HX", "FEEDWATER", "EFFICIENCY"], description: "Exchanger heating feedwater before it enters steam generators." },
    { type: "Main Feedwater Pump (Turbine Driven)", category: "rotating", tags: ["PUMP", "KINETIC", "FEEDWATER"], description: "High capacity pump driven by steam turbine." },
    { type: "Main Feedwater Pump (Motor Driven)", category: "rotating", tags: ["PUMP", "KINETIC", "STARTUP"], description: "Motor driven pump for startup and backup." },
    { type: "Heater Drain Pump", category: "rotating", tags: ["PUMP", "KINETIC", "DRAINS"], description: "Pump returning heater condensate to the feedwater stream." },
    { type: "Main Generator", category: "electrical", tags: ["GENERATOR", "POWER", "ELECTRICAL"], description: "Synchronous generator converting mechanical energy to electricity." },

    // Safety Systems
    { type: "High Pressure Safety Injection Pump", category: "rotating", tags: ["PUMP", "SAFETY", "ECCS"], description: "Pump for high pressure coolant injection during small break LOCA." },
    { type: "Low Pressure Safety Injection Pump", category: "rotating", tags: ["PUMP", "SAFETY", "RHR"], description: "High flow pump for large break LOCA and shutdown cooling." },
    { type: "Containment Spray Pump", category: "rotating", tags: ["PUMP", "SAFETY", "CONTAINMENT"], description: "Pump spraying water to reduce containment pressure and scrub iodine." },
    { type: "Refueling Water Storage Tank (RWST)", category: "static", tags: ["TANK", "STORAGE", "BORATED"], description: "Large tank storing borated water for refueling and safety injection." },
    { type: "Boric Acid Tank", category: "static", tags: ["TANK", "STORAGE", "CHEMICAL"], description: "Tank storing concentrated boric acid solution." },
    { type: "Emergency Diesel Generator (EDG)", category: "rotating", tags: ["GENERATOR", "BACKUP", "SAFETY"], description: "Diesel generator providing power to safety buses during LOOP." },
    { type: "Containment Air Cooler", category: "heat-transfer", tags: ["HX", "COOLING", "CONTAINMENT"], description: "Fan cooler unit maintaining containment temperature." },
    { type: "Hydrogen Recombiner", category: "static", tags: ["PROCESS", "SAFETY", "HYDROGEN"], description: "Device removing hydrogen gas from containment post-accident." },

    // Auxiliary Systems
    { type: "Component Cooling Water Pump", category: "rotating", tags: ["PUMP", "COOLING", "AUXILIARY"], description: "Pump circulating closed-loop cooling water to plant components." },
    { type: "Service Water Pump", category: "rotating", tags: ["PUMP", "COOLING", "INTAKE"], description: "Pump taking water from the ultimate heat sink (river/ocean)." },
    { type: "Spent Fuel Pool Cooling Pump", category: "rotating", tags: ["PUMP", "COOLING", "FUEL"], description: "Pump circulating water through the spent fuel pool heat exchanger." },
    { type: "Spent Fuel Pool Heat Exchanger", category: "heat-transfer", tags: ["HX", "COOLING", "FUEL"], description: "Exchanger removing decay heat from spent fuel pool water." },
    { type: "Charging Pump (CVCS)", category: "rotating", tags: ["PUMP", "CONTROL", "INJECTION"], description: "High head pump for volume control and seal injection." },
    { type: "Letdown Heat Exchanger", category: "heat-transfer", tags: ["HX", "COOLING", "CVCS"], description: "Exchanger cooling reactor coolant diverted for purification." },
    { type: "Volume Control Tank", category: "static", tags: ["TANK", "CONTROL", "CVCS"], description: "Surge tank for the chemical and volume control system." },
    { type: "Demineralizer (Ion Exchanger)", category: "static", tags: ["FILTER", "PURIFICATION", "CHEMISTRY"], description: "Vessel containing resin for water purification." },
    { type: "Boric Acid Transfer Pump", category: "rotating", tags: ["PUMP", "TRANSFER", "CHEMICAL"], description: "Pump moving boric acid solution." },

    // Waste & Fuel Handling
    { type: "Spent Fuel Pool", category: "static", tags: ["POOL", "STORAGE", "FUEL"], description: "Water-filled pool for storage and cooling of discharged fuel assemblies." },
    { type: "Dry Cask Storage Container", category: "static", tags: ["CASK", "STORAGE", "SHIELDING"], description: "Concrete/steel overpack for long-term dry storage of spent fuel." },
    { type: "Radwaste Evaporator", category: "heat-transfer", tags: ["EVAPORATOR", "WASTE", "VOLUME_REDUCTION"], description: "Evaporator for concentrating liquid radioactive waste." },
    { type: "Fuel Transfer Canal", category: "static", tags: ["STRUCTURE", "TRANSFER", "FUEL"], description: "Water-filled channel connecting reactor and fuel building." },
    { type: "Polar Crane", category: "rotating", tags: ["CRANE", "LIFTING", "CONTAINMENT"], description: "Overhead crane inside containment for lifting heavy components." },

    // Valves
    { type: "Main Steam Isolation Valve (MSIV)", category: "piping", tags: ["VALVE", "ISOLATION", "SAFETY"], description: "Fast-closing valve to isolate steam generators." },
    { type: "Pressurizer Relief Valve (PORV)", category: "piping", tags: ["VALVE", "RELIEF", "CONTROL"], description: "Power-operated relief valve for pressure control." },
    { type: "Main Steam Safety Valve (MSSV)", category: "piping", tags: ["VALVE", "SAFETY", "CODE"], description: "Spring-loaded safety valve on steam lines." },
    { type: "Feedwater Isolation Valve", category: "piping", tags: ["VALVE", "ISOLATION", "SAFETY"], description: "Valve to isolate feedwater flow to steam generators." },
    { type: "Containment Isolation Valve", category: "piping", tags: ["VALVE", "ISOLATION", "BOUNDARY"], description: "Valve closing penetrations through the containment wall." },
    { type: "Turbine Bypass Valve", category: "piping", tags: ["VALVE", "CONTROL", "DUMP"], description: "Valve dumping steam to condenser during load rejection." },

    // Instrumentation
    { type: "Ex-Core Neutron Flux Detector", category: "instrumentation", tags: ["SENSOR", "NEUTRON", "POWER"], description: "Detector outside vessel measuring reactor power level." },
    { type: "In-Core Neutron Flux Detector", category: "instrumentation", tags: ["SENSOR", "NEUTRON", "MAPPING"], description: "Detector inside core for flux mapping." },
    { type: "Reactor Vessel Level Monitoring System", category: "instrumentation", tags: ["SENSOR", "LEVEL", "SAFETY"], description: "System monitoring coolant level in the vessel." },
    { type: "Rod Position Indicator", category: "instrumentation", tags: ["SENSOR", "POSITION", "CONTROL"], description: "Sensor indicating the position of control rods." },
    { type: "Core Exit Thermocouple", category: "instrumentation", tags: ["SENSOR", "TEMPERATURE", "SAFETY"], description: "Thermocouple measuring coolant temperature at core outlet." },
    { type: "Process Radiation Monitor", category: "instrumentation", tags: ["SENSOR", "RADIATION", "PROCESS"], description: "Monitor measuring radioactivity in fluid streams." },
    { type: "Area Radiation Monitor", category: "instrumentation", tags: ["SENSOR", "RADIATION", "SAFETY"], description: "Monitor measuring ambient radiation levels." },
    { type: "Loose Parts Monitoring System", category: "instrumentation", tags: ["SENSOR", "ACOUSTIC", "DIAGNOSTIC"], description: "Acoustic system detecting loose metal parts in the primary system." },

    // Electrical
    { type: "Main Transformer", category: "electrical", tags: ["TRANSFORMER", "HV", "TRANSMISSION"], description: "Step-up transformer connecting generator to the grid." },
    { type: "Unit Auxiliary Transformer", category: "electrical", tags: ["TRANSFORMER", "HV", "HOUSE_LOAD"], description: "Transformer supplying plant loads during operation." },
    { type: "Startup Transformer", category: "electrical", tags: ["TRANSFORMER", "HV", "STARTUP"], description: "Transformer supplying plant loads from offsite power." },
    { type: "4160V Switchgear", category: "electrical", tags: ["SWITCHGEAR", "MV", "DISTRIBUTION"], description: "Medium voltage distribution for large motors." },
    { type: "480V Load Center", category: "electrical", tags: ["SWITCHGEAR", "LV", "DISTRIBUTION"], description: "Low voltage distribution center." },
    { type: "Motor Control Center (MCC)", category: "electrical", tags: ["MCC", "LV", "CONTROL"], description: "Assembly for controlling multiple low voltage motors." },
    { type: "125V DC Battery Bank", category: "electrical", tags: ["BATTERY", "DC", "SAFETY"], description: "Battery system for critical control and safety power." },
    { type: "Inverter", category: "electrical", tags: ["INVERTER", "AC", "UPS"], description: "Device converting DC battery power to AC for instruments." }
];

const registry = {
    sector: SECTOR_CODE,
    subSector: SUB_SECTOR_CODE,
    equipment: equipmentList
};

const outputPath = path.join(__dirname, '../src/lib/resources/nuclear_registry.json');

// Ensure directory exists
const dir = path.dirname(outputPath);
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(registry, null, 2));

console.log(`Successfully generated nuclear registry with ${equipmentList.length} items at: ${outputPath}`);
