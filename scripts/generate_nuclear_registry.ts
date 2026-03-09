import * as fs from 'fs';
import * as path from 'path';

const SECTOR_CODE = 'NUCL';
const SUB_SECTOR_CODE = 'NUCL-ALL';

const equipmentList = [
    // Core Process - Primary Loop & Reactor
    { type: "Reactor Pressure Vessel (RPV)", category: "static", tags: ["VESSEL", "NUCLEAR", "PRIMARY"], description: "Thick-walled cylindrical vessel containing the nuclear reactor core and coolant." },
    { type: "Steam Generator (U-Tube)", category: "heat-transfer", tags: ["HX", "STEAM", "PRIMARY"], description: "Large heat exchanger transferring heat from primary to secondary coolant to produce steam." },
    { type: "Reactor Coolant Pump (RCP)", category: "rotating", tags: ["PUMP", "KINETIC", "PRIMARY"], description: "Large vertical shaft pump circulating water through the reactor core." },
    { type: "Pressurizer", category: "static", tags: ["VESSEL", "PRESSURE", "PRIMARY"], description: "Vessel equipped with heaters and sprays to maintain and control primary system pressure." },
    { type: "Control Rod Drive Mechanism (CRDM)", category: "mechanical", tags: ["ACTUATOR", "SAFETY", "REACTIVITY"], description: "Electromagnetic mechanism used to position control rods within the reactor core." },

    // Core Process - Emergency Core Cooling System (ECCS)
    { type: "High Pressure Coolant Injection (HPCI) Pump", category: "rotating", tags: ["PUMP", "SAFETY", "HIGH_PRESSURE"], description: "Multi-stage centrifugal pump for emergency makeup at high reactor pressures." },
    { type: "Low Pressure Coolant Injection (LPCI) Pump", category: "rotating", tags: ["PUMP", "SAFETY", "LOW_PRESSURE"], description: "High-volume centrifugal pump for flooding the core at lower pressures." },
    { type: "Core Spray Pump", category: "rotating", tags: ["PUMP", "SAFETY", "SPRAY"], description: "Pump used to spray cooling water directly over the fuel assemblies." },
    { type: "Residual Heat Removal (RHR) Heat Exchanger", category: "heat-transfer", tags: ["HX", "SAFETY", "COOLING"], description: "Exchanger used to remove decay heat from the reactor core during shutdown." },
    { type: "RHR Pump", category: "rotating", tags: ["PUMP", "SAFETY", "CIRCULATION"], description: "Pump circulating coolant through the RHR heat exchanger." },
    { type: "Accumulator Tank", category: "static", tags: ["VESSEL", "SAFETY", "STORAGE"], description: "Pressurized tank containing borated water for rapid passive injection." },

    // Chemical and Volume Control System (CVCS)
    { type: "Charging Pump", category: "rotating", tags: ["PUMP", "CVCS", "HIGH_PRESSURE"], description: "Positive displacement or centrifugal pump for primary coolant makeup." },
    { type: "Letdown Heat Exchanger", category: "heat-transfer", tags: ["HX", "CVCS", "COOLING"], description: "Cools primary coolant extracted for purification." },
    { type: "Regenerative Heat Exchanger", category: "heat-transfer", tags: ["HX", "CVCS", "RECUPERATOR"], description: "Exchanges heat between letdown flow and charging flow." },
    { type: "Volume Control Tank (VCT)", category: "static", tags: ["TANK", "CVCS", "SURGE"], description: "Surge tank for the primary coolant system makeup." },
    { type: "Boric Acid Transfer Pump", category: "rotating", tags: ["PUMP", "CVCS", "CHEMICAL"], description: "Transfers concentrated boric acid for reactivity control." },
    { type: "Mixed Bed Demineralizer", category: "static", tags: ["FILTER", "CVCS", "ION_EXCHANGE"], description: "Vessel containing ion exchange resins to purify primary coolant." },

    // Secondary System (Balance of Plant)
    { type: "High Pressure Turbine", category: "rotating", tags: ["TURBINE", "STEAM", "HP"], description: "First stage steam turbine driven directly by main steam." },
    { type: "Moisture Separator Reheater (MSR)", category: "heat-transfer", tags: ["VESSEL", "STEAM", "CONDITIONING"], description: "Removes moisture and reheats steam between high and low pressure turbines." },
    { type: "Low Pressure Turbine", category: "rotating", tags: ["TURBINE", "STEAM", "LP"], description: "Final stage steam turbines exhausting to the main condenser." },
    { type: "Main Condenser", category: "heat-transfer", tags: ["HX", "STEAM", "CONDENSATION"], description: "Massive heat exchanger condensing turbine exhaust steam back to liquid." },
    { type: "Condensate Extraction Pump", category: "rotating", tags: ["PUMP", "FEEDWATER", "LP"], description: "Removes condensed water from the condenser hotwell." },
    { type: "Main Feedwater Pump", category: "rotating", tags: ["PUMP", "FEEDWATER", "HP"], description: "High pressure pump returning feedwater to the steam generators or RPV." },
    { type: "Feedwater Heater (Closed)", category: "heat-transfer", tags: ["HX", "FEEDWATER", "PREHEAT"], description: "Shell and tube exchanger preheating feedwater using turbine extraction steam." },

    // Cooling Water Systems
    { type: "Circulating Water Pump", category: "rotating", tags: ["PUMP", "COOLING", "HIGH_FLOW"], description: "Massive vertical pump supplying cooling water to the main condenser." },
    { type: "Service Water Pump", category: "rotating", tags: ["PUMP", "COOLING", "SAFETY"], description: "Supplies cooling water to essential plant components and safety systems." },
    { type: "Cooling Tower", category: "heat-transfer", tags: ["COOLING", "ENVIRONMENT", "HEAT_SINK"], description: "Structure for rejecting waste heat to the atmosphere." },

    // HVAC and Containment
    { type: "Containment Spray Pump", category: "rotating", tags: ["PUMP", "SAFETY", "CONTAINMENT"], description: "Sprays water into containment to reduce pressure and scrub fission products." },
    { type: "Containment Fan Cooler", category: "rotating", tags: ["FAN", "HVAC", "CONTAINMENT"], description: "Large fan and cooling coil unit to maintain containment temperature." },
    { type: "HEPA Filter Unit", category: "static", tags: ["FILTER", "HVAC", "FILTRATION"], description: "High-efficiency particulate air filter for radioactive exhaust." },
    { type: "Charcoal Adsorber", category: "static", tags: ["FILTER", "HVAC", "IODINE"], description: "Filter unit for removing radioactive iodine from exhaust air." },

    // Waste Management & Storage
    { type: "Spent Fuel Pool Cooling Pump", category: "rotating", tags: ["PUMP", "COOLING", "SPENT_FUEL"], description: "Circulates water through the spent fuel pool to remove decay heat." },
    { type: "Spent Fuel Pool Heat Exchanger", category: "heat-transfer", tags: ["HX", "COOLING", "SPENT_FUEL"], description: "Removes heat from the spent fuel pool water." },
    { type: "Liquid Radwaste Processing Skid", category: "static", tags: ["PACKAGE", "RADWASTE", "PROCESSING"], description: "Integrated system of filters and demineralizers for treating liquid waste." },
    { type: "Dry Storage Cask", category: "static", tags: ["VESSEL", "STORAGE", "SPENT_FUEL"], description: "Heavily shielded container for long-term dry storage of spent fuel." },

    // Valves
    { type: "Main Steam Isolation Valve (MSIV)", category: "piping", tags: ["VALVE", "ISOLATION", "SAFETY"], description: "Large, fast-acting valve to isolate the main steam line in an emergency." },
    { type: "Pressurizer Power Operated Relief Valve (PORV)", category: "piping", tags: ["VALVE", "RELIEF", "PRIMARY"], description: "Pilot-operated valve for precise control of primary system pressure." },
    { type: "Pressurizer Safety Valve", category: "piping", tags: ["VALVE", "SAFETY", "PRIMARY"], description: "Spring-loaded safety valve for primary system overpressure protection." },
    { type: "Feedwater Isolation Valve", category: "piping", tags: ["VALVE", "ISOLATION", "FEEDWATER"], description: "Valve to rapidly isolate feedwater flow to the steam generators." },
    { type: "Containment Isolation Valve", category: "piping", tags: ["VALVE", "ISOLATION", "CONTAINMENT"], description: "Valve designed to automatically close and seal the containment boundary." },

    // Instrumentation & Control
    { type: "Ex-Core Neutron Flux Detector", category: "instrumentation", tags: ["SENSOR", "NUCLEAR", "FLUX"], description: "Detects neutron flux outside the reactor vessel for power monitoring." },
    { type: "In-Core Thermocouple", category: "instrumentation", tags: ["SENSOR", "TEMPERATURE", "CORE"], description: "Measures temperature directly within the reactor core assemblies." },
    { type: "Reactor Coolant Flow Transmitter", category: "instrumentation", tags: ["SENSOR", "FLOW", "PRIMARY"], description: "High-precision differential pressure transmitter for primary flow." },
    { type: "Pressurizer Level Transmitter", category: "instrumentation", tags: ["SENSOR", "LEVEL", "PRIMARY"], description: "Measures the water level in the pressurizer for inventory control." },
    { type: "Radiation Monitoring System (RMS) Detector", category: "instrumentation", tags: ["SENSOR", "RADIATION", "SAFETY"], description: "Monitors radiation levels in plant areas and process streams." },

    // Electrical
    { type: "Emergency Diesel Generator (EDG)", category: "electrical", tags: ["GENERATOR", "POWER", "SAFETY"], description: "Large diesel generator providing backup power to safety systems." },
    { type: "Main Generator", category: "electrical", tags: ["GENERATOR", "POWER", "OUTPUT"], description: "Synchronous AC generator driven by the main steam turbine." },
    { type: "Station Blackout (SBO) Generator", category: "electrical", tags: ["GENERATOR", "POWER", "BACKUP"], description: "Additional power source available if all offsite and emergency power is lost." },
    { type: "Vital AC Inverter", category: "electrical", tags: ["POWER", "DC_AC", "INSTRUMENTATION"], description: "Converts battery DC to clean AC power for essential instrumentation." },
    { type: "Safety-Related Switchgear (4.16kV)", category: "electrical", tags: ["POWER", "DISTRIBUTION", "SAFETY"], description: "Medium voltage distribution equipment for safety-related motors." },
    { type: "Station Battery Bank (125V DC)", category: "electrical", tags: ["POWER", "DC", "STORAGE"], description: "Large battery bank providing uninterrupted DC power to controls." },
    { type: "Main Power Transformer", category: "electrical", tags: ["TRANSFORMER", "POWER", "GRID"], description: "Steps up generator output voltage for transmission." },
    { type: "Unit Auxiliary Transformer", category: "electrical", tags: ["TRANSFORMER", "POWER", "HOUSE_LOAD"], description: "Provides power to plant equipment from the main generator output." }
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
