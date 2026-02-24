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
    // Core Process - Reactor & Primary Coolant
    { type: "Reactor Pressure Vessel (PWR)", category: "static", tags: ["VESSEL", "REACTOR", "PRIMARY_LOOP"], description: "Thick-walled steel vessel containing the nuclear fuel core and reactor coolant." },
    { type: "Reactor Pressure Vessel (BWR)", category: "static", tags: ["VESSEL", "REACTOR", "PRIMARY_LOOP"], description: "Vessel containing fuel and steam separators/dryers for boiling water reactors." },
    { type: "Steam Generator (U-Tube)", category: "heat-transfer", tags: ["HX", "PRIMARY_LOOP", "STEAM"], description: "Vertical shell-and-tube heat exchanger generating steam from primary coolant heat." },
    { type: "Steam Generator (Once-Through)", category: "heat-transfer", tags: ["HX", "PRIMARY_LOOP", "STEAM"], description: "Straight-tube heat exchanger where primary coolant flows counter-current to feedwater." },
    { type: "Pressurizer", category: "static", tags: ["VESSEL", "PRIMARY_LOOP", "PRESSURE_CONTROL"], description: "Vessel maintaining primary circuit pressure via heaters and spray." },
    { type: "Reactor Coolant Pump", category: "rotating", tags: ["PUMP", "PRIMARY_LOOP", "KINETIC"], description: "High-capacity pump circulating coolant through the reactor core." },
    { type: "Control Rod Drive Mechanism", category: "rotating", tags: ["ACTUATOR", "CONTROL", "SAFETY"], description: "Electro-mechanical device for inserting/withdrawing control rods." },
    { type: "Fuel Assembly", category: "static", tags: ["CORE", "FUEL", "FISSILE"], description: "Bundle of fuel rods containing uranium dioxide pellets." },
    { type: "Main Steam Isolation Valve (MSIV)", category: "piping", tags: ["VALVE", "ISOLATION", "SAFETY"], description: "Fast-closing valve to isolate the containment in case of a steam line break." },
    { type: "Pressurizer Relief Tank", category: "static", tags: ["VESSEL", "RELIEF", "PRIMARY_LOOP"], description: "Tank that collects steam discharged from pressurizer relief valves." },

    // Turbine Island - Secondary Loop
    { type: "Steam Turbine (High Pressure)", category: "rotating", tags: ["TURBINE", "POWER_GEN", "STEAM"], description: "First stage turbine expanding high-pressure steam from steam generators." },
    { type: "Steam Turbine (Low Pressure)", category: "rotating", tags: ["TURBINE", "POWER_GEN", "STEAM"], description: "Large turbine extracting remaining energy from steam before condensation." },
    { type: "Moisture Separator Reheater (MSR)", category: "heat-transfer", tags: ["HX", "STEAM", "EFFICIENCY"], description: "Vessel removing moisture and reheating steam between HP and LP turbines." },
    { type: "Main Condenser", category: "heat-transfer", tags: ["HX", "CONDENSING", "VACUUM"], description: "Large heat exchanger condensing turbine exhaust steam into water." },
    { type: "Condensate Pump", category: "rotating", tags: ["PUMP", "SECONDARY_LOOP", "KINETIC"], description: "Pump returning condensed water from the condenser to the feedwater system." },
    { type: "Main Feedwater Pump", category: "rotating", tags: ["PUMP", "SECONDARY_LOOP", "HIGH_PRESSURE"], description: "High-pressure pump supplying water to steam generators." },
    { type: "Feedwater Heater (Low Pressure)", category: "heat-transfer", tags: ["HX", "FEEDWATER", "EFFICIENCY"], description: "Heat exchanger preheating feedwater using turbine extraction steam." },
    { type: "Feedwater Heater (High Pressure)", category: "heat-transfer", tags: ["HX", "FEEDWATER", "EFFICIENCY"], description: "Final stage heater before feedwater enters the steam generator." },
    { type: "Condensate Polisher", category: "static", tags: ["FILTER", "DEMINERALIZER", "PURIFICATION"], description: "Ion exchange system removing impurities from condensate." },
    { type: "Turbine Bypass Valve", category: "piping", tags: ["VALVE", "CONTROL", "STEAM"], description: "Valve dumping steam directly to the condenser during load rejection." },

    // Safety Systems
    { type: "High Pressure Safety Injection Pump", category: "rotating", tags: ["PUMP", "ECCS", "SAFETY"], description: "Pump injecting borated water into the reactor at high pressure during accidents." },
    { type: "Low Pressure Safety Injection Pump (RHR)", category: "rotating", tags: ["PUMP", "ECCS", "RHR"], description: "High-flow pump for decay heat removal and low-pressure injection." },
    { type: "Containment Spray Pump", category: "rotating", tags: ["PUMP", "CONTAINMENT", "SAFETY"], description: "Pump spraying water into containment to reduce pressure and scrub fission products." },
    { type: "Auxiliary Feedwater Pump (Motor)", category: "rotating", tags: ["PUMP", "AFW", "SAFETY"], description: "Electric pump supplying water to SGs when main feedwater is lost." },
    { type: "Auxiliary Feedwater Pump (Turbine)", category: "rotating", tags: ["PUMP", "AFW", "SAFETY"], description: "Steam-driven pump supplying water to SGs during station blackout." },
    { type: "Residual Heat Removal Heat Exchanger", category: "heat-transfer", tags: ["HX", "RHR", "SAFETY"], description: "Heat exchanger cooling the reactor coolant during shutdown." },
    { type: "Safety Injection Accumulator", category: "static", tags: ["VESSEL", "ECCS", "PASSIVE"], description: "Pressurized tank passively injecting borated water during large break LOCA." },
    { type: "Containment Air Cooler", category: "heat-transfer", tags: ["HX", "CONTAINMENT", "COOLING"], description: "Fan-coil unit removing heat from the containment atmosphere." },
    { type: "Hydrogen Recombiner", category: "static", tags: ["SAFETY", "CONTAINMENT", "CONTROL"], description: "Device removing hydrogen gas from containment to prevent explosion." },
    { type: "Main Steam Safety Valve (MSSV)", category: "piping", tags: ["VALVE", "RELIEF", "SAFETY"], description: "Spring-loaded valve protecting steam generators from overpressure." },

    // Auxiliary & Support Systems
    { type: "Component Cooling Water Pump", category: "rotating", tags: ["PUMP", "COOLING", "AUXILIARY"], description: "Pump circulating clean water to cool safety-related equipment." },
    { type: "Component Cooling Water Heat Exchanger", category: "heat-transfer", tags: ["HX", "COOLING", "AUXILIARY"], description: "Exchanger transferring heat from CCW system to service water." },
    { type: "Service Water Pump", category: "rotating", tags: ["PUMP", "COOLING", "RAW_WATER"], description: "Pump taking water from the ultimate heat sink (river/ocean)." },
    { type: "Chemical and Volume Control Tank", category: "static", tags: ["VESSEL", "CVCS", "INVENTORY"], description: "Tank acting as a surge volume for the reactor coolant system." },
    { type: "Charging Pump", category: "rotating", tags: ["PUMP", "CVCS", "MAKEUP"], description: "High-head pump returning purified coolant to the primary loop." },
    { type: "Letdown Heat Exchanger", category: "heat-transfer", tags: ["HX", "CVCS", "COOLING"], description: "Exchanger cooling reactor coolant before purification." },
    { type: "Mixed Bed Demineralizer", category: "static", tags: ["FILTER", "CVCS", "PURIFICATION"], description: "Ion exchanger removing ionic impurities from reactor coolant." },
    { type: "Boric Acid Storage Tank", category: "static", tags: ["VESSEL", "REACTIVITY", "STORAGE"], description: "Tank storing concentrated boric acid for reactivity control." },
    { type: "Refueling Water Storage Tank (RWST)", category: "static", tags: ["TANK", "ECCS", "STORAGE"], description: "Large tank holding borated water for refueling and safety injection." },
    { type: "Spent Fuel Pool Cooling Pump", category: "rotating", tags: ["PUMP", "SFP", "COOLING"], description: "Pump circulating water to cool stored spent fuel assemblies." },

    // Electrical Power
    { type: "Emergency Diesel Generator", category: "electrical", tags: ["GENERATOR", "BACKUP", "SAFETY"], description: "Diesel engine generator supplying power to safety buses during loss of offsite power." },
    { type: "Main Power Transformer", category: "electrical", tags: ["TRANSFORMER", "HV", "GRID"], description: "Step-up transformer connecting the generator to the transmission grid." },
    { type: "Startup Transformer", category: "electrical", tags: ["TRANSFORMER", "HV", "AUXILIARY"], description: "Transformer supplying plant loads during startup and shutdown." },
    { type: "Station Battery Bank (Class 1E)", category: "electrical", tags: ["BATTERY", "DC", "SAFETY"], description: "Lead-acid batteries providing DC power to critical controls and inverters." },
    { type: "Inverter (Class 1E)", category: "electrical", tags: ["INVERTER", "AC", "UPS"], description: "Device converting DC battery power to AC for vital instrument buses." },
    { type: "Medium Voltage Switchgear", category: "electrical", tags: ["SWITCHGEAR", "DISTRIBUTION", "POWER"], description: "Breakers and busbars distributing 4kV/6.9kV power to large motors." },
    { type: "Motor Control Center (MCC)", category: "electrical", tags: ["MCC", "DISTRIBUTION", "LV"], description: "Assembly of starters and breakers for low-voltage motors." },

    // Fuel Handling & Waste
    { type: "Refueling Machine", category: "rotating", tags: ["CRANE", "HANDLING", "FUEL"], description: "Gantry crane aimed at moving fuel assemblies within the reactor cavity." },
    { type: "Fuel Transfer Upender", category: "rotating", tags: ["HANDLING", "FUEL", "TRANSFER"], description: "Mechanism pivoting fuel assemblies between vertical and horizontal positions." },
    { type: "Spent Fuel Storage Cask (Dry)", category: "static", tags: ["CONTAINER", "WASTE", "STORAGE"], description: "Concrete and steel cask for long-term dry storage of spent fuel." },
    { type: "Radwaste Evaporator", category: "heat-transfer", tags: ["EVAPORATOR", "WASTE", "VOLUME_REDUCTION"], description: "Evaporator concentrating liquid radioactive waste." },
    { type: "High Integrity Container (HIC)", category: "static", tags: ["CONTAINER", "WASTE", "DISPOSAL"], description: "Container for dewatered resins and filters." },

    // Instrumentation & Others
    { type: "Area Radiation Monitor", category: "instrumentation", tags: ["SENSOR", "RADIATION", "SAFETY"], description: "Detector measuring ambient radiation levels in plant areas." },
    { type: "Process Radiation Monitor", category: "instrumentation", tags: ["SENSOR", "RADIATION", "PROCESS"], description: "Monitor measuring radioactivity in fluid streams (e.g., steam line)." },
    { type: "Polar Crane", category: "rotating", tags: ["CRANE", "LIFTING", "CONTAINMENT"], description: "Circular crane inside containment for lifting heavy components." },
    { type: "Personnel Air Lock", category: "static", tags: ["DOOR", "CONTAINMENT", "ACCESS"], description: "Double-door chamber allowing personnel entry while maintaining containment integrity." },
    { type: "Equipment Hatch", category: "static", tags: ["DOOR", "CONTAINMENT", "ACCESS"], description: "Large opening for moving equipment in/out of containment." },
    { type: "HEPA Filter Unit", category: "static", tags: ["FILTER", "HVAC", "SAFETY"], description: "High-efficiency particulate air filter for removing radioactive particles." },
    { type: "Charcoal Adsorber Unit", category: "static", tags: ["FILTER", "HVAC", "IODINE"], description: "Activated charcoal filter for removing radioactive iodine from air." }
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
