import * as fs from 'fs';
import * as path from 'path';

const SECTOR_CODE = 'WATR';
const SUB_SECTOR_CODE = 'WATR-ALL';

interface RegistryItem {
    type: string;
    category: string;
    tags: string[];
    description: string;
}

const equipmentList: RegistryItem[] = [
    // Core Process - Headworks & Screening
    { type: "Bar Screen (Coarse)", category: "static", tags: ["SCREEN", "HEADWORKS", "MECHANICAL"], description: "Mechanical bar screen for removing large debris from influent wastewater." },
    { type: "Fine Screen (Drum)", category: "rotating", tags: ["SCREEN", "HEADWORKS", "MECHANICAL"], description: "Rotating drum screen for removing fine solids." },
    { type: "Grit Chamber (Vortex)", category: "static", tags: ["SEPARATION", "GRIT", "VORTEX"], description: "Vortex grit removal system to separate sand and grit." },
    { type: "Grit Classifier", category: "rotating", tags: ["SEPARATION", "GRIT", "CONVEYOR"], description: "Screw conveyor system for washing and dewatering grit." },
    { type: "Parshall Flume", category: "static", tags: ["FLOW", "HEADWORKS", "MEASUREMENT"], description: "Open channel flow metering structure." },

    // Core Process - Clarification & Sedimentation
    { type: "Primary Clarifier (Circular)", category: "static", tags: ["CLARIFIER", "SEDIMENTATION", "PRIMARY"], description: "Circular tank with scraper mechanism for settling solids." },
    { type: "Secondary Clarifier (Rectangular)", category: "static", tags: ["CLARIFIER", "SEDIMENTATION", "SECONDARY"], description: "Rectangular basin with chain and flight sludge collector." },
    { type: "Lamella Plate Settler", category: "static", tags: ["CLARIFIER", "SEDIMENTATION", "COMPACT"], description: "Inclined plate settler for high-rate clarification." },
    { type: "Dissolved Air Flotation (DAF)", category: "static", tags: ["THICKENING", "FLOTATION", "CLARIFICATION"], description: "Tank using micro-bubbles to float solids to the surface." },
    { type: "Scum Skimmer", category: "rotating", tags: ["CLARIFIER", "SKIMMER", "MECHANICAL"], description: "Mechanism for removing floating scum from clarifier surface." },

    // Core Process - Biological Treatment
    { type: "Aeration Basin (Diffused Air)", category: "static", tags: ["BIOREACTOR", "AERATION", "ACTIVATED_SLUDGE"], description: "Tank with fine bubble diffusers for biological treatment." },
    { type: "Surface Aerator", category: "rotating", tags: ["AERATOR", "BIOREACTOR", "MECHANICAL"], description: "Floating or fixed mechanical aerator for surface agitation." },
    { type: "Trickling Filter", category: "static", tags: ["BIOREACTOR", "FIXED_FILM", "ATTACHED_GROWTH"], description: "Bed of media over which wastewater is distributed for treatment." },
    { type: "Rotating Biological Contactor (RBC)", category: "rotating", tags: ["BIOREACTOR", "FIXED_FILM", "ROTATING"], description: "Series of rotating discs partially submerged in wastewater." },
    { type: "Membrane Bioreactor (MBR)", category: "static", tags: ["BIOREACTOR", "MEMBRANE", "FILTRATION"], description: "Biological treatment combined with membrane filtration." },
    { type: "Sequencing Batch Reactor (SBR)", category: "static", tags: ["BIOREACTOR", "BATCH", "ACTIVATED_SLUDGE"], description: "Single tank system for fill, react, settle, and decant steps." },

    // Core Process - Filtration
    { type: "Rapid Sand Filter", category: "static", tags: ["FILTER", "GRAVITY", "MEDIA"], description: "Gravity filter using sand and anthracite media." },
    { type: "Pressure Filter", category: "static", tags: ["FILTER", "PRESSURE", "MEDIA"], description: "Enclosed vessel filter operating under pressure." },
    { type: "Disc Filter", category: "rotating", tags: ["FILTER", "TERTIARY", "CLOTH"], description: "Rotating cloth disc filter for tertiary filtration." },
    { type: "Ultrafiltration Skid", category: "static", tags: ["FILTER", "MEMBRANE", "UF"], description: "Skid-mounted ultrafiltration membrane system." },
    { type: "Reverse Osmosis Skid", category: "static", tags: ["FILTER", "MEMBRANE", "RO"], description: "Skid-mounted reverse osmosis system for desalination or reuse." },

    // Core Process - Disinfection
    { type: "Chlorine Contact Basin", category: "static", tags: ["DISINFECTION", "CHLORINE", "CONTACT"], description: "Baffled tank for providing contact time with chlorine." },
    { type: "UV Disinfection System (Open Channel)", category: "static", tags: ["DISINFECTION", "UV", "LIGHT"], description: "Banks of UV lamps submerged in an open channel." },
    { type: "UV Reactor (Closed Vessel)", category: "static", tags: ["DISINFECTION", "UV", "PRESSURE"], description: "Enclosed UV reactor for pressurized flow." },
    { type: "Ozone Generator", category: "static", tags: ["DISINFECTION", "OZONE", "GENERATION"], description: "Equipment for generating ozone gas for disinfection." },
    { type: "Sodium Hypochlorite Generator", category: "static", tags: ["GENERATOR", "CHLORINE", "ELECTROLYSIS"], description: "On-site generation of hypochlorite from brine." },

    // Sludge Handling
    { type: "Anaerobic Digester", category: "static", tags: ["DIGESTER", "SLUDGE", "BIOGAS"], description: "Sealed tank for anaerobic decomposition of sludge." },
    { type: "Aerobic Digester", category: "static", tags: ["DIGESTER", "SLUDGE", "AERATION"], description: "Aerated tank for stabilizing sludge." },
    { type: "Gravity Thickener", category: "static", tags: ["THICKENER", "SLUDGE", "GRAVITY"], description: "Tank for thickening sludge by gravity settling." },
    { type: "Belt Filter Press", category: "rotating", tags: ["DEWATERING", "SLUDGE", "PRESS"], description: "Continuous belt press for dewatering sludge." },
    { type: "Centrifuge (Dewatering)", category: "rotating", tags: ["DEWATERING", "SLUDGE", "CENTRIFUGE"], description: "High-speed centrifuge for sludge dewatering." },
    { type: "Screw Press", category: "rotating", tags: ["DEWATERING", "SLUDGE", "SCREW"], description: "Slow-speed screw press for sludge dewatering." },
    { type: "Sludge Dryer", category: "heat-transfer", tags: ["DRYER", "SLUDGE", "THERMAL"], description: "Thermal drying system to produce Class A biosolids." },

    // Pumps & Blowers
    { type: "Centrifugal Pump (End Suction)", category: "rotating", tags: ["PUMP", "WATER", "KINETIC"], description: "Standard end-suction centrifugal pump." },
    { type: "Vertical Turbine Pump", category: "rotating", tags: ["PUMP", "WATER", "VERTICAL"], description: "Vertical pump for wet wells or clear wells." },
    { type: "Submersible Pump", category: "rotating", tags: ["PUMP", "WASTEWATER", "SUBMERSIBLE"], description: "Pump designed to operate submerged in fluid." },
    { type: "Progressive Cavity Pump", category: "rotating", tags: ["PUMP", "SLUDGE", "PD"], description: "Positive displacement pump for viscous sludge." },
    { type: "Peristaltic Pump", category: "rotating", tags: ["PUMP", "CHEMICAL", "METERING"], description: "Hose pump for chemical dosing." },
    { type: "Positive Displacement Blower", category: "rotating", tags: ["BLOWER", "AERATION", "PD"], description: "Rotary lobe blower for aeration air supply." },
    { type: "Turbo Blower", category: "rotating", tags: ["BLOWER", "AERATION", "HIGH_SPEED"], description: "High-speed centrifugal blower with air bearings." },
    { type: "Air Compressor", category: "rotating", tags: ["COMPRESSOR", "UTILITY", "PNEUMATIC"], description: "Compressor for instrument air or pneumatic tools." },

    // Valves & Gates
    { type: "Gate Valve (Resilient Seat)", category: "piping", tags: ["VALVE", "ISOLATION", "WATER"], description: "Isolation valve with a rubber-encapsulated wedge." },
    { type: "Butterfly Valve", category: "piping", tags: ["VALVE", "ISOLATION", "CONTROL"], description: "Quarter-turn valve for flow control or isolation." },
    { type: "Plug Valve (Eccentric)", category: "piping", tags: ["VALVE", "ISOLATION", "SLUDGE"], description: "Valve with eccentric plug, suitable for sludge." },
    { type: "Check Valve (Swing)", category: "piping", tags: ["VALVE", "NON_RETURN", "Swing"], description: "Valve preventing backflow." },
    { type: "Air Release Valve", category: "piping", tags: ["VALVE", "AIR", "PROTECTION"], description: "Valve to release accumulated air from pipelines." },
    { type: "Sluice Gate", category: "piping", tags: ["GATE", "ISOLATION", "FLOW_CONTROL"], description: "Vertical sliding gate for channel isolation." },
    { type: "Slide Gate", category: "piping", tags: ["GATE", "ISOLATION", "ALUMINUM"], description: "Lighter duty gate for open channels." },
    { type: "Telescoping Valve", category: "piping", tags: ["VALVE", "SLUDGE", "DRAW_OFF"], description: "Adjustable slip pipe for sludge draw-off." },

    // Chemical Systems
    { type: "Chemical Storage Tank (FRP)", category: "static", tags: ["TANK", "STORAGE", "CHEMICAL"], description: "Fiberglass reinforced plastic tank for chemical storage." },
    { type: "Chemical Storage Tank (Poly)", category: "static", tags: ["TANK", "STORAGE", "POLY"], description: "Polyethylene tank for chemical storage." },
    { type: "Lime Silo", category: "static", tags: ["SILO", "STORAGE", "SOLIDS"], description: "Silo for storing dry lime or soda ash." },
    { type: "Polymer Blending Unit", category: "static", tags: ["MIXER", "CHEMICAL", "POLYMER"], description: "Skid for wetting and activating dry or emulsion polymer." },
    { type: "Static Mixer", category: "static", tags: ["MIXER", "INLINE", "STATIC"], description: "In-line mixing device with no moving parts." },

    // Instrumentation
    { type: "Magnetic Flow Meter", category: "instrumentation", tags: ["METER", "FLOW", "CONDUCTIVE"], description: "Electromagnetic flow meter for conductive liquids." },
    { type: "Ultrasonic Level Sensor", category: "instrumentation", tags: ["LEVEL", "NON_CONTACT", "ULTRASONIC"], description: "Non-contact level measurement." },
    { type: "Submersible Level Transducer", category: "instrumentation", tags: ["LEVEL", "HYDROSTATIC", "SUBMERSIBLE"], description: "Pressure sensor for level measurement in wells." },
    { type: "Dissolved Oxygen Probe", category: "instrumentation", tags: ["ANALYZER", "DO", "AERATION"], description: "Sensor for measuring dissolved oxygen concentration." },
    { type: "pH Sensor", category: "instrumentation", tags: ["ANALYZER", "PH", "QUALITY"], description: "Sensor for measuring pH." },
    { type: "Turbidity Meter", category: "instrumentation", tags: ["ANALYZER", "TURBIDITY", "QUALITY"], description: "Instrument for measuring water clarity." },
    { type: "Chlorine Residual Analyzer", category: "instrumentation", tags: ["ANALYZER", "CHLORINE", "DISINFECTION"], description: "Analyzer for free or total chlorine residual." },
    { type: "Total Suspended Solids (TSS) Probe", category: "instrumentation", tags: ["ANALYZER", "SOLIDS", "QUALITY"], description: "Probe for measuring suspended solids concentration." },

    // Electrical
    { type: "Induction Motor (TEFC)", category: "electrical", tags: ["MOTOR", "DRIVE", "AC"], description: "Totally Enclosed Fan Cooled AC motor." },
    { type: "Submersible Motor", category: "electrical", tags: ["MOTOR", "DRIVE", "SUBMERSIBLE"], description: "Motor designed for submerged operation." },
    { type: "Variable Frequency Drive (VFD)", category: "electrical", tags: ["DRIVE", "CONTROL", "SPEED"], description: "Controller for adjusting motor speed." },
    { type: "Motor Control Center (MCC)", category: "electrical", tags: ["POWER", "CONTROL", "DISTRIBUTION"], description: "Assembly of motor starters and controls." },
    { type: "Switchgear (Medium Voltage)", category: "electrical", tags: ["POWER", "DISTRIBUTION", "HV"], description: "Main power distribution equipment." },
    { type: "Emergency Diesel Generator", category: "electrical", tags: ["POWER", "GENERATOR", "BACKUP"], description: "Backup power source for critical loads." },
    { type: "Automatic Transfer Switch (ATS)", category: "electrical", tags: ["POWER", "SWITCH", "TRANSFER"], description: "Switch for transferring load between utility and generator." }
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
