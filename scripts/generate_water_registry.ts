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
    // Primary/Intake
    { type: "Seawater Intake Pump", category: "rotating", tags: ["PUMP", "VERTICAL_TURBINE", "INTAKE"], description: "Vertical turbine pump for drawing raw seawater into the plant." },
    { type: "Raw Water Lift Pump", category: "rotating", tags: ["PUMP", "LIFT", "INTAKE"], description: "Large centrifugal pump for lifting raw water from natural sources." },
    { type: "Mechanical Bar Screen", category: "static", tags: ["SCREEN", "COARSE_FILTRATION", "HEADWORKS"], description: "Coarse automated screen to remove large debris from influent water." },
    { type: "Fine Screen", category: "static", tags: ["SCREEN", "FINE_FILTRATION", "HEADWORKS"], description: "Automated screen to remove smaller particulate matter." },
    { type: "Grit Chamber", category: "static", tags: ["VESSEL", "SEPARATION", "HEADWORKS"], description: "Chamber designed to slow flow and allow heavy grit and sand to settle." },
    { type: "Grit Classifier", category: "rotating", tags: ["SEPARATOR", "SOLIDS", "HEADWORKS"], description: "Mechanical device to wash and separate grit from organic matter." },

    // Coagulation/Flocculation/Clarification
    { type: "Rapid Mix Flash Mixer", category: "rotating", tags: ["MIXER", "AGITATION", "COAGULATION"], description: "High-speed mixer used to rapidly disperse coagulant chemicals into raw water." },
    { type: "Flocculation Mixer", category: "rotating", tags: ["MIXER", "AGITATION", "FLOCCULATION"], description: "Low-speed mixer used to promote the aggregation of floc particles." },
    { type: "Primary Clarifier", category: "static", tags: ["VESSEL", "SETTLING", "CLARIFICATION"], description: "Large circular or rectangular tank for settling out suspended solids." },
    { type: "Dissolved Air Flotation (DAF) Unit", category: "static", tags: ["VESSEL", "SEPARATION", "CLARIFICATION"], description: "System that removes suspended matter by injecting fine air bubbles that float solids to the surface." },
    { type: "Tube Settler", category: "static", tags: ["SETTLER", "CLARIFICATION", "ENHANCEMENT"], description: "Inclined tubes installed in clarifiers to increase settling capacity." },
    { type: "Lamella Plate Clarifier", category: "static", tags: ["CLARIFIER", "SETTLING", "COMPACT"], description: "Compact clarifier using inclined plates to increase settling area." },
    { type: "Sludge Scraper Mechanism", category: "rotating", tags: ["MECHANISM", "SLUDGE", "CLARIFICATION"], description: "Rotating bridge and scraper arms to collect settled sludge from clarifier bottoms." },

    // Filtration & Membranes
    { type: "Granular Media Filter", category: "static", tags: ["FILTER", "MEDIA", "FILTRATION"], description: "Gravity or pressure filter using sand, anthracite, or multimedia." },
    { type: "Cartridge Filter Housing", category: "static", tags: ["FILTER", "CARTRIDGE", "PRE_TREATMENT"], description: "Housing containing multiple filter cartridges for fine particulate removal." },
    { type: "Ultrafiltration (UF) Skid", category: "static", tags: ["MEMBRANE", "FILTRATION", "UF"], description: "Skid containing UF membrane modules for removal of fine particles and pathogens." },
    { type: "Microfiltration (MF) Skid", category: "static", tags: ["MEMBRANE", "FILTRATION", "MF"], description: "Skid containing MF membrane modules for particle and biological removal." },
    { type: "Reverse Osmosis (RO) Pressure Vessel", category: "static", tags: ["MEMBRANE", "HOUSING", "RO"], description: "Fiberglass or steel housing containing spiral-wound RO membrane elements." },
    { type: "High-Pressure RO Feed Pump", category: "rotating", tags: ["PUMP", "HIGH_PRESSURE", "RO"], description: "Multi-stage centrifugal pump to overcome osmotic pressure for RO processes." },
    { type: "Energy Recovery Device (Isobaric)", category: "rotating", tags: ["RECOVERY", "PRESSURE", "RO"], description: "Device transferring pressure from RO reject stream to feed stream." },
    { type: "Energy Recovery Turbine", category: "rotating", tags: ["TURBINE", "RECOVERY", "RO"], description: "Turbine driven by high-pressure concentrate to recover energy." },

    // Biological Treatment
    { type: "Aeration Blower (Turbo)", category: "rotating", tags: ["BLOWER", "AERATION", "CENTRIFUGAL"], description: "High-speed turbo blower supplying air to aeration basins." },
    { type: "Aeration Blower (Positive Displacement)", category: "rotating", tags: ["BLOWER", "AERATION", "PD"], description: "Roots-type blower for constant volume air supply." },
    { type: "Fine Bubble Diffuser", category: "static", tags: ["DIFFUSER", "AERATION", "BIOLOGICAL"], description: "Submerged aeration device creating fine bubbles for high oxygen transfer efficiency." },
    { type: "Surface Aerator", category: "rotating", tags: ["AERATOR", "MECHANICAL", "BIOLOGICAL"], description: "Mechanical device floating or mounted on the surface to mix and aerate wastewater." },
    { type: "Trickling Filter", category: "static", tags: ["FILTER", "BIOLOGICAL", "ATTACHED_GROWTH"], description: "Bed of media over which wastewater is distributed to support biofilm growth." },
    { type: "Membrane Bioreactor (MBR) Module", category: "static", tags: ["MEMBRANE", "BIOREACTOR", "FILTRATION"], description: "Submerged membrane module combining biological treatment and solid-liquid separation." },
    { type: "Return Activated Sludge (RAS) Pump", category: "rotating", tags: ["PUMP", "SLUDGE", "BIOLOGICAL"], description: "Pump to return settled biological sludge from clarifier to aeration basin." },
    { type: "Waste Activated Sludge (WAS) Pump", category: "rotating", tags: ["PUMP", "SLUDGE", "BIOLOGICAL"], description: "Pump to remove excess biological sludge from the system." },
    { type: "Anaerobic Digester", category: "static", tags: ["VESSEL", "DIGESTION", "SLUDGE"], description: "Large heated tank for anaerobic breakdown of organic sludge, producing biogas." },
    { type: "Digester Gas Mixing Draft Tube", category: "static", tags: ["MIXER", "GAS", "DIGESTER"], description: "Tube using recirculated biogas to mix anaerobic digester contents." },

    // Disinfection & Chemical
    { type: "UV Disinfection Bank", category: "static", tags: ["DISINFECTION", "UV", "TREATMENT"], description: "Channel or vessel containing ultraviolet lamps to inactivate pathogens." },
    { type: "Ozone Generator", category: "static", tags: ["GENERATOR", "OZONE", "DISINFECTION"], description: "System generating ozone gas for powerful oxidation and disinfection." },
    { type: "Ozone Contactor", category: "static", tags: ["VESSEL", "OZONE", "CONTACT"], description: "Baffled tank where ozone is dissolved into the water stream." },
    { type: "Chlorine Contact Basin", category: "static", tags: ["VESSEL", "CHLORINE", "CONTACT"], description: "Baffled basin providing necessary residence time for chlorine disinfection." },
    { type: "Chemical Dosing Pump", category: "rotating", tags: ["PUMP", "DOSING", "CHEMICAL"], description: "Small, precise positive displacement pump for adding treatment chemicals." },
    { type: "Chlorinator / Gas Feed System", category: "static", tags: ["DOSING", "CHLORINE", "GAS"], description: "Vacuum-operated system to safely dose chlorine gas into water." },
    { type: "Sodium Hypochlorite Generator", category: "static", tags: ["GENERATOR", "CHEMICAL", "ON_SITE"], description: "System that generates sodium hypochlorite on-site from salt and electricity." },
    { type: "Remineralization Limestone Contactor", category: "static", tags: ["VESSEL", "MINERAL", "POST_TREATMENT"], description: "Vessel containing limestone to add hardness and alkalinity to product water." },
    { type: "Static Mixer", category: "static", tags: ["MIXER", "INLINE", "CHEMICAL"], description: "In-line piping component with stationary baffles for rapid chemical mixing." },

    // Sludge Handling
    { type: "Gravity Thickener", category: "static", tags: ["VESSEL", "SLUDGE", "THICKENING"], description: "Tank designed to concentrate thin sludge by gravity settling." },
    { type: "Dissolved Air Flotation (DAF) Thickener", category: "static", tags: ["VESSEL", "SLUDGE", "THICKENING"], description: "DAF unit specifically optimized for thickening waste activated sludge." },
    { type: "Sludge Dewatering Centrifuge", category: "rotating", tags: ["CENTRIFUGE", "DEWATERING", "SLUDGE"], description: "High-speed decanter centrifuge for producing dry sludge cake." },
    { type: "Belt Filter Press", category: "rotating", tags: ["PRESS", "DEWATERING", "SLUDGE"], description: "Machine using tensioned belts to squeeze water from conditioned sludge." },
    { type: "Filter Press (Plate and Frame)", category: "static", tags: ["PRESS", "DEWATERING", "SLUDGE"], description: "Batch operation press using plates to form high-solids sludge cake." },
    { type: "Sludge Dryer", category: "heat-transfer", tags: ["DRYER", "THERMAL", "SLUDGE"], description: "Thermal equipment to reduce moisture content and volume of dewatered sludge." },
    { type: "Progressive Cavity Sludge Pump", category: "rotating", tags: ["PUMP", "PD", "SLUDGE"], description: "Positive displacement pump ideal for moving viscous, high-solids sludge." },

    // Support/Transfer
    { type: "Product Water Transfer Pump", category: "rotating", tags: ["PUMP", "TRANSFER", "DISTRIBUTION"], description: "Centrifugal pump to move treated water to storage or distribution." },
    { type: "Booster Pump Station", category: "rotating", tags: ["PUMP", "BOOSTER", "DISTRIBUTION"], description: "Pump assembly to maintain pressure in the distribution network." },
    { type: "Surge Tank", category: "static", tags: ["VESSEL", "SURGE", "PROTECTION"], description: "Tank designed to absorb hydraulic transients (water hammer) in pipelines." },
    { type: "Elevated Storage Tank", category: "static", tags: ["TANK", "STORAGE", "DISTRIBUTION"], description: "Water tower providing gravity pressure and buffer storage." },
    { type: "Ground Storage Reservoir", category: "static", tags: ["TANK", "STORAGE", "DISTRIBUTION"], description: "Large ground-level tank for storing treated potable water." },
    { type: "Clear Well", category: "static", tags: ["VESSEL", "STORAGE", "TREATMENT"], description: "Storage tank at the WTP holding treated water before distribution." },

    // Valves
    { type: "Sluice Gate", category: "piping", tags: ["VALVE", "GATE", "CHANNEL"], description: "Large sliding gate to control water flow in open channels or pipes." },
    { type: "Butterfly Valve (AWWA)", category: "piping", tags: ["VALVE", "ISOLATION", "LARGE_BORE"], description: "Quarter-turn valve meeting AWWA standards for water service." },
    { type: "Air Release Valve", category: "piping", tags: ["VALVE", "AIR", "PIPING"], description: "Valve designed to automatically vent accumulated air from pipelines." },
    { type: "Check Valve (Swing or Non-Slam)", category: "piping", tags: ["VALVE", "NON_RETURN", "PUMP"], description: "Valve preventing backflow, essential on pump discharge lines." },
    { type: "Pressure Reducing Valve (PRV)", category: "piping", tags: ["VALVE", "CONTROL", "PRESSURE"], description: "Automatic control valve to reduce higher inlet pressure to a steady lower downstream pressure." },

    // Instrumentation
    { type: "Turbidity Analyzer", category: "instrumentation", tags: ["ANALYZER", "WATER_QUALITY", "OPTICAL"], description: "Instrument measuring the cloudiness of water (suspended particulates)." },
    { type: "Free Chlorine Analyzer", category: "instrumentation", tags: ["ANALYZER", "WATER_QUALITY", "CHEMICAL"], description: "Online instrument continuously measuring residual chlorine." },
    { type: "Dissolved Oxygen (DO) Sensor", category: "instrumentation", tags: ["SENSOR", "WATER_QUALITY", "BIOLOGICAL"], description: "Sensor measuring oxygen levels in aeration basins for process control." },
    { type: "Magnetic Flow Meter", category: "instrumentation", tags: ["METER", "FLOW", "ELECTROMAGNETIC"], description: "Inline meter measuring flow rate of conductive liquids (water/wastewater) with no moving parts." },
    { type: "Ultrasonic Level Sensor", category: "instrumentation", tags: ["SENSOR", "LEVEL", "NON_CONTACT"], description: "Non-contact sensor for monitoring levels in tanks, channels, or flumes." },
    { type: "pH / ORP Analyzer", category: "instrumentation", tags: ["ANALYZER", "WATER_QUALITY", "ELECTROCHEMICAL"], description: "Instrument for measuring acidity/alkalinity and oxidation-reduction potential." },

    // Electrical
    { type: "Induction Motor", category: "electrical", tags: ["MOTOR", "DRIVE", "AC"], description: "Standard AC electric motor for driving pumps and fans." },
    { type: "Variable Frequency Drive (VFD)", category: "electrical", tags: ["DRIVE", "CONTROL", "SPEED"], description: "Device for controlling motor speed and torque." },
    { type: "Switchgear (MV/LV)", category: "electrical", tags: ["POWER", "DISTRIBUTION", "SAFETY"], description: "Combination of disconnects, fuses, and breakers." },
    { type: "Transformer", category: "electrical", tags: ["POWER", "VOLTAGE", "DISTRIBUTION"], description: "Static electrical device for changing voltage levels." },
    { type: "Uninterruptible Power Supply (UPS)", category: "electrical", tags: ["POWER", "BACKUP", "CRITICAL"], description: "Battery backup system for critical controls." }
];

const registry = {
    sector: SECTOR_CODE,
    subSector: SUB_SECTOR_CODE,
    equipment: equipmentList
};

const outputPath = path.join(__dirname, '../src/lib/resources/water_registry.json');

const dir = path.dirname(outputPath);
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(registry, null, 2));

console.log(`Successfully generated water registry with ${equipmentList.length} items at: ${outputPath}`);
