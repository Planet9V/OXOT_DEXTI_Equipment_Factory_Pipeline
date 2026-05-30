import * as fs from 'fs';
import * as path from 'path';

const SECTOR_CODE = 'WATR';
const SUB_SECTOR_CODE = 'WATR-DW';

interface RegistryItem {
    type: string;
    category: string;
    tags: string[];
    description: string;
}

const equipmentList: RegistryItem[] = [
    // Core Process - Pumping & Intake
    { type: "Raw Water Intake Pump", category: "rotating", tags: ["PUMP", "KINETIC", "INTAKE"], description: "Large centrifugal or vertical turbine pump for drawing water from the source." },
    { type: "Low Service Pump", category: "rotating", tags: ["PUMP", "KINETIC", "TRANSFER"], description: "Pump used to lift water to the treatment plant headworks." },
    { type: "High Service Pump", category: "rotating", tags: ["PUMP", "KINETIC", "DISTRIBUTION"], description: "High-pressure pump for delivering treated water to the distribution system." },
    { type: "Backwash Pump", category: "rotating", tags: ["PUMP", "KINETIC", "CLEANING"], description: "Pump dedicated to supplying water for filter backwashing." },
    { type: "Sludge Pump", category: "rotating", tags: ["PUMP", "PD", "SLUDGE"], description: "Positive displacement or centrifugal pump for handling sludge." },
    { type: "Sump Pump", category: "rotating", tags: ["PUMP", "KINETIC", "DRAINAGE"], description: "Submersible pump for removing accumulated water from sumps." },

    // Core Process - Screening & Pre-treatment
    { type: "Bar Screen", category: "static", tags: ["SCREEN", "INTAKE", "MECHANICAL"], description: "Mechanical screen for removing large debris from raw water." },
    { type: "Fine Screen", category: "static", tags: ["SCREEN", "INTAKE", "MECHANICAL"], description: "Screen with small openings for removing finer particles." },
    { type: "Microstrainer", category: "rotating", tags: ["SCREEN", "FILTRATION", "ALGAE"], description: "Rotating drum screen with fine mesh for algae and plankton removal." },
    { type: "Grit Chamber", category: "static", tags: ["VESSEL", "SEPARATION", "GRIT"], description: "Basin designed to settle out heavy inorganic particles." },

    // Core Process - Coagulation & Flocculation
    { type: "Rapid Mix Flash Mixer", category: "rotating", tags: ["MIXER", "AGITATION", "COAGULATION"], description: "High-speed mixer for dispersing coagulants into raw water." },
    { type: "Flocculator (Vertical Turbine)", category: "rotating", tags: ["MIXER", "AGITATION", "FLOCCULATION"], description: "Slow-speed vertical mixer for promoting floc growth." },
    { type: "Flocculator (Horizontal Paddle)", category: "rotating", tags: ["MIXER", "AGITATION", "FLOCCULATION"], description: "Horizontal paddle wheel mixer for gentle agitation." },
    { type: "Static Mixer", category: "static", tags: ["MIXER", "INLINE", "COAGULATION"], description: "In-line mixing device with stationary elements." },

    // Core Process - Clarification
    { type: "Circular Primary Clarifier", category: "static", tags: ["CLARIFIER", "SEDIMENTATION", "CIRCULAR"], description: "Circular tank for settling flocculated solids." },
    { type: "Rectangular Primary Clarifier", category: "static", tags: ["CLARIFIER", "SEDIMENTATION", "RECTANGULAR"], description: "Rectangular basin for sedimentation with chain and flight collectors." },
    { type: "Lamella Inclined Plate Settler", category: "static", tags: ["CLARIFIER", "SEDIMENTATION", "COMPACT"], description: "Clarifier using inclined plates to increase effective settling area." },
    { type: "Sludge Collector (Chain & Flight)", category: "rotating", tags: ["MECHANISM", "SLUDGE", "COLLECTION"], description: "Mechanism for scraping sludge from the bottom of rectangular tanks." },
    { type: "Sludge Collector (Circular Scraper)", category: "rotating", tags: ["MECHANISM", "SLUDGE", "COLLECTION"], description: "Rotating scraper arm for circular clarifiers." },
    { type: "Dissolved Air Flotation (DAF) Unit", category: "static", tags: ["CLARIFIER", "FLOTATION", "ALGAE"], description: "Tank using microbubbles to float light solids to the surface." },

    // Core Process - Filtration
    { type: "Gravity Sand Filter", category: "static", tags: ["FILTER", "MEDIA", "GRAVITY"], description: "Concrete basin filter using sand media and gravity flow." },
    { type: "Pressure Sand Filter", category: "static", tags: ["FILTER", "MEDIA", "PRESSURE"], description: "Enclosed vessel filter operating under pressure." },
    { type: "Multimedia Filter", category: "static", tags: ["FILTER", "MEDIA", "ANTHRACITE"], description: "Filter using layers of anthracite, sand, and garnet." },
    { type: "Granular Activated Carbon (GAC) Contactor", category: "static", tags: ["FILTER", "ADSORPTION", "GAC"], description: "Vessel containing GAC for removing organics and taste/odor." },
    { type: "Membrane Filter Rack (MF/UF)", category: "static", tags: ["MEMBRANE", "FILTRATION", "SKID"], description: "Skid-mounted microfiltration or ultrafiltration modules." },
    { type: "Reverse Osmosis (RO) Skid", category: "static", tags: ["MEMBRANE", "DESALINATION", "SKID"], description: "High-pressure skid for removing dissolved salts." },
    { type: "Cartridge Filter Housing", category: "static", tags: ["FILTER", "POLISHING", "HOUSING"], description: "Housing for disposable filter cartridges." },
    { type: "Air Scour Blower", category: "rotating", tags: ["BLOWER", "CLEANING", "BACKWASH"], description: "Blower providing air for scouring filter media during backwash." },

    // Core Process - Disinfection & Chemical
    { type: "Chlorine Gas Chlorinator", category: "static", tags: ["DOSING", "DISINFECTION", "GAS"], description: "Vacuum regulator and ejector system for chlorine gas dosing." },
    { type: "Sodium Hypochlorite Metering Pump", category: "rotating", tags: ["PUMP", "DOSING", "LIQUID"], description: "Diaphragm pump for dosing liquid bleach." },
    { type: "Ozone Generator", category: "static", tags: ["GENERATOR", "DISINFECTION", "OXIDATION"], description: "Equipment for generating ozone gas on-site." },
    { type: "UV Disinfection Reactor", category: "static", tags: ["REACTOR", "DISINFECTION", "UV"], description: "Chamber with UV lamps for inactivating pathogens." },
    { type: "Polymer Dosing System", category: "static", tags: ["SKID", "DOSING", "FLOCCULANT"], description: "Automated system for preparing and dosing polymer solutions." },
    { type: "Lime Silo", category: "static", tags: ["STORAGE", "SOLIDS", "CHEMICAL"], description: "Silo for bulk storage of lime for pH adjustment." },
    { type: "Alum Storage Tank", category: "static", tags: ["TANK", "STORAGE", "CHEMICAL"], description: "Tank for storing liquid aluminum sulfate coagulant." },
    { type: "Ammonia Feed System", category: "static", tags: ["DOSING", "DISINFECTION", "CHLORAMINE"], description: "System for dosing ammonia to form chloramines." },

    // Storage & Residuals
    { type: "Clearwell / Contact Tank", category: "static", tags: ["TANK", "STORAGE", "CONTACT"], description: "Large underground tank for chlorine contact time and finished water storage." },
    { type: "Elevated Storage Tank", category: "static", tags: ["TANK", "STORAGE", "DISTRIBUTION"], description: "Water tower for maintaining system pressure." },
    { type: "Ground Storage Tank", category: "static", tags: ["TANK", "STORAGE", "DISTRIBUTION"], description: "Large cylindrical tank for potable water storage." },
    { type: "Hydropneumatic Tank", category: "static", tags: ["TANK", "PRESSURE", "SURGE"], description: "Pressurized tank containing water and air to control pump cycling." },
    { type: "Sludge Thickener (Gravity)", category: "static", tags: ["THICKENER", "SLUDGE", "GRAVITY"], description: "Tank for concentrating sludge by settling." },
    { type: "Sludge Dewatering Centrifuge", category: "rotating", tags: ["CENTRIFUGE", "DEWATERING", "SLUDGE"], description: "High-speed centrifuge for removing water from sludge." },
    { type: "Belt Filter Press", category: "rotating", tags: ["PRESS", "DEWATERING", "SLUDGE"], description: "Machine using belts and rollers to dewater sludge." },
    { type: "Plate and Frame Filter Press", category: "static", tags: ["PRESS", "DEWATERING", "BATCH"], description: "Pressure filter for producing high-solids sludge cake." },

    // Piping & Valves
    { type: "Gate Valve", category: "piping", tags: ["VALVE", "ISOLATION", "ON_OFF"], description: "Valve with a gate wedge for isolation service." },
    { type: "Butterfly Valve", category: "piping", tags: ["VALVE", "ISOLATION", "CONTROL"], description: "Quarter-turn valve suitable for large pipes." },
    { type: "Plug Valve", category: "piping", tags: ["VALVE", "ISOLATION", "SLUDGE"], description: "Valve with a cylindrical or conical plug, good for sludge." },
    { type: "Check Valve", category: "piping", tags: ["VALVE", "NON_RETURN", "FLOW"], description: "Valve preventing backflow." },
    { type: "Air Release Valve", category: "piping", tags: ["VALVE", "AIR", "VENT"], description: "Valve for releasing accumulated air from pipelines." },
    { type: "Pressure Reducing Valve (PRV)", category: "piping", tags: ["VALVE", "CONTROL", "PRESSURE"], description: "Valve that automatically reduces downstream pressure." },
    { type: "Altitude Valve", category: "piping", tags: ["VALVE", "CONTROL", "LEVEL"], description: "Valve controlling water level in tanks." },

    // Instrumentation
    { type: "Magnetic Flow Meter", category: "instrumentation", tags: ["METER", "FLOW", "MAG"], description: "Flow meter for conductive liquids." },
    { type: "Ultrasonic Flow Meter", category: "instrumentation", tags: ["METER", "FLOW", "CLAMP_ON"], description: "Non-intrusive flow meter using ultrasonic waves." },
    { type: "Ultrasonic Level Transmitter", category: "instrumentation", tags: ["LEVEL", "NON_CONTACT", "SENSOR"], description: "Non-contact level sensor." },
    { type: "Submersible Level Transducer", category: "instrumentation", tags: ["LEVEL", "HYDROSTATIC", "SENSOR"], description: "Pressure sensor submerged in the liquid." },
    { type: "Turbidity Meter", category: "instrumentation", tags: ["ANALYZER", "QUALITY", "OPTICAL"], description: "Instrument measuring water clarity." },
    { type: "pH/ORP Analyzer", category: "instrumentation", tags: ["ANALYZER", "QUALITY", "ELECTROCHEMICAL"], description: "Analyzer for pH and Oxidation-Reduction Potential." },
    { type: "Residual Chlorine Analyzer", category: "instrumentation", tags: ["ANALYZER", "QUALITY", "DISINFECTION"], description: "Analyzer monitoring chlorine levels." },
    { type: "Particle Counter", category: "instrumentation", tags: ["ANALYZER", "QUALITY", "FILTRATION"], description: "Instrument counting suspended particles." },

    // Electrical
    { type: "Motor Control Center (MCC)", category: "electrical", tags: ["POWER", "CONTROL", "PANEL"], description: "Assembly of motor starters and controls." },
    { type: "Variable Frequency Drive (VFD)", category: "electrical", tags: ["DRIVE", "SPEED", "CONTROL"], description: "Device for controlling motor speed." },
    { type: "Diesel Generator Set", category: "electrical", tags: ["POWER", "BACKUP", "GENERATOR"], description: "Standby power source." },
    { type: "Main Switchgear", category: "electrical", tags: ["POWER", "DISTRIBUTION", "HV"], description: "Main power distribution equipment." },
    { type: "Transformer", category: "electrical", tags: ["POWER", "VOLTAGE", "DISTRIBUTION"], description: "Step-down transformer for plant power." }
];

const registry = {
    sector: SECTOR_CODE,
    subSector: SUB_SECTOR_CODE,
    equipment: equipmentList
};

const outputPath = path.join(__dirname, '../src/lib/resources/water_registry.json');

// Ensure directory exists
const dir = path.dirname(outputPath);
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(registry, null, 2));

console.log(`Successfully generated water registry with ${equipmentList.length} items at: ${outputPath}`);
