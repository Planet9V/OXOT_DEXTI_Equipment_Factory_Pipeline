import * as fs from 'fs';
import * as path from 'path';

const SECTOR_CODE = 'CHEM';
const SUB_SECTOR_CODE = 'CHEM-ALL';

interface RegistryItem {
    type: string;
    category: string;
    tags: string[];
    description: string;
}

const equipmentList: RegistryItem[] = [
    // Core Process - Reaction
    { type: "Continuous Stirred Tank Reactor (CSTR)", category: "static", tags: ["REACTOR", "VESSEL", "KINETIC"], description: "Continuous flow vessel with agitation for liquid-phase reactions." },
    { type: "Plug Flow Reactor (PFR)", category: "static", tags: ["REACTOR", "VESSEL", "KINETIC"], description: "Tubular reactor with no axial mixing, used for gas or liquid phase reactions." },
    { type: "Batch Reactor", category: "static", tags: ["REACTOR", "VESSEL", "BATCH"], description: "Closed vessel for batch processing with heating/cooling jacket and agitator." },
    { type: "Fluidized Bed Reactor", category: "static", tags: ["REACTOR", "VESSEL", "FLUIDIZED"], description: "Reactor where solid catalyst particles are suspended by upward gas flow." },
    { type: "Fixed Bed Reactor", category: "static", tags: ["REACTOR", "VESSEL", "CATALYTIC"], description: "Reactor containing a stationary bed of solid catalyst pellets." },
    { type: "Fermenter", category: "static", tags: ["BIOREACTOR", "VESSEL", "BIOTECH"], description: "Sterile vessel for microbial fermentation processes." },
    { type: "Autoclave", category: "static", tags: ["VESSEL", "HIGH_PRESSURE", "STERILIZATION"], description: "High-pressure vessel for sterilization or hydrothermal synthesis." },
    { type: "Glass-Lined Reactor", category: "static", tags: ["REACTOR", "VESSEL", "CORROSION_RESISTANT"], description: "Steel reactor with glass lining for handling corrosive chemicals." },

    // Core Process - Separation
    { type: "Distillation Column", category: "static", tags: ["COLUMN", "SEPARATION", "THERMAL"], description: "Vertical vessel with trays or packing for separating liquid mixtures by boiling point." },
    { type: "Absorption Column", category: "static", tags: ["COLUMN", "SEPARATION", "MASS_TRANSFER"], description: "Column for transferring components from a gas stream into a liquid solvent." },
    { type: "Stripping Column", category: "static", tags: ["COLUMN", "SEPARATION", "MASS_TRANSFER"], description: "Column for removing volatile components from a liquid stream using a gas." },
    { type: "Extraction Column", category: "static", tags: ["COLUMN", "SEPARATION", "LIQUID_LIQUID"], description: "Column for liquid-liquid extraction based on solubility differences." },
    { type: "Flash Drum", category: "static", tags: ["VESSEL", "SEPARATION", "PHASE_CHANGE"], description: "Vessel for separating vapor and liquid phases after a pressure drop." },
    { type: "Decanter", category: "static", tags: ["VESSEL", "SEPARATION", "GRAVITY"], description: "Horizontal vessel for separating immiscible liquids by gravity." },
    { type: "Cyclone Separator", category: "static", tags: ["SEPARATOR", "SOLID_GAS", "CENTRIFUGAL"], description: "Device using centrifugal force to separate particles from a gas stream." },
    { type: "Centrifuge (Decanter)", category: "rotating", tags: ["CENTRIFUGE", "SEPARATION", "SOLID_LIQUID"], description: "Horizontal scroll centrifuge for continuous solid-liquid separation." },
    { type: "Centrifuge (Disc Stack)", category: "rotating", tags: ["CENTRIFUGE", "SEPARATION", "LIQUID_LIQUID"], description: "High-speed vertical centrifuge for clarifying liquids or separating emulsions." },
    { type: "Filter Press", category: "static", tags: ["FILTER", "SEPARATION", "SOLID_LIQUID"], description: "Pressure filter using plate and frame assembly for dewatering slurries." },
    { type: "Rotary Drum Vacuum Filter", category: "rotating", tags: ["FILTER", "SEPARATION", "VACUUM"], description: "Continuous filter using a rotating drum under vacuum to separate solids." },
    { type: "Bag Filter Housing", category: "static", tags: ["FILTER", "SEPARATION", "PARTICULATE"], description: "Vessel containing filter bags for removing particles from liquid streams." },
    { type: "Membrane Skid (RO/UF)", category: "static", tags: ["MEMBRANE", "SEPARATION", "FILTRATION"], description: "Skid-mounted reverse osmosis or ultrafiltration system." },
    { type: "Scrubber (Wet)", category: "static", tags: ["SCRUBBER", "EMISSIONS", "ABSORPTION"], description: "Device using liquid spray to remove pollutants from exhaust gas." },

    // Core Process - Heat Transfer
    { type: "Shell & Tube Heat Exchanger", category: "heat-transfer", tags: ["HX", "THERMAL", "TEMA"], description: "Classic heat exchanger with a bundle of tubes inside a cylindrical shell." },
    { type: "Plate & Frame Heat Exchanger", category: "heat-transfer", tags: ["HX", "THERMAL", "COMPACT"], description: "High-efficiency exchanger using gasketed metal plates." },
    { type: "Air Cooled Heat Exchanger", category: "heat-transfer", tags: ["HX", "THERMAL", "COOLER"], description: "Fin-fan cooler using ambient air to cool process fluids." },
    { type: "Spiral Heat Exchanger", category: "heat-transfer", tags: ["HX", "THERMAL", "FOULING"], description: "Compact exchanger with spiral channels, good for slurries and fouling fluids." },
    { type: "Double Pipe Heat Exchanger", category: "heat-transfer", tags: ["HX", "THERMAL", "HAIRPIN"], description: "Simple pipe-in-pipe exchanger for small duties or high pressures." },
    { type: "Reboiler (Kettle)", category: "heat-transfer", tags: ["HX", "THERMAL", "BOILER"], description: "Shell and tube exchanger used to generate vapor for distillation columns." },
    { type: "Condenser", category: "heat-transfer", tags: ["HX", "THERMAL", "PHASE_CHANGE"], description: "Exchanger for condensing vapors into liquid." },
    { type: "Evaporator (Falling Film)", category: "heat-transfer", tags: ["EVAPORATOR", "THERMAL", "CONCENTRATION"], description: "Vertical shell and tube exchanger for concentrating solutions." },
    { type: "Cooling Tower", category: "heat-transfer", tags: ["COOLING", "WATER", "EVAPORATIVE"], description: "Structure for rejecting heat from cooling water to the atmosphere." },
    { type: "Furnace / Fired Heater", category: "heat-transfer", tags: ["HEATER", "COMBUSTION", "THERMAL"], description: "Direct-fired heater for high-temperature process heating." },

    // Core Process - Drying & Solids
    { type: "Spray Dryer", category: "heat-transfer", tags: ["DRYER", "SOLIDS", "POWDER"], description: "Dryer that atomizes liquid feed into hot gas to produce powder." },
    { type: "Fluid Bed Dryer", category: "heat-transfer", tags: ["DRYER", "SOLIDS", "FLUIDIZED"], description: "Dryer where solids are fluidized by hot air for uniform drying." },
    { type: "Rotary Dryer", category: "rotating", tags: ["DRYER", "SOLIDS", "TUMBLING"], description: "Rotating cylinder used to dry bulk solids." },
    { type: "Ribbon Blender", category: "rotating", tags: ["MIXER", "SOLIDS", "BATCH"], description: "Horizontal trough mixer with helical ribbon agitator for powders." },
    { type: "Screw Conveyor", category: "rotating", tags: ["CONVEYOR", "SOLIDS", "TRANSPORT"], description: "Helical screw for moving bulk materials." },
    { type: "Pneumatic Conveying System", category: "static", tags: ["CONVEYOR", "SOLIDS", "AIR"], description: "System for transporting powders using air pressure or vacuum." },
    { type: "Rotary Valve (Airlock)", category: "rotating", tags: ["VALVE", "SOLIDS", "METERING"], description: "Device for feeding solids into or out of pressurized systems." },
    { type: "Silo", category: "static", tags: ["STORAGE", "SOLIDS", "BULK"], description: "Large vertical container for bulk solid storage." },

    // Rotating Equipment - Pumps & Compressors
    { type: "Centrifugal Pump (OH1)", category: "rotating", tags: ["PUMP", "KINETIC", "API610"], description: "Standard overhung end-suction pump." },
    { type: "Centrifugal Pump (BB2)", category: "rotating", tags: ["PUMP", "KINETIC", "API610"], description: "Between-bearings radial split pump for higher pressures." },
    { type: "Positive Displacement Pump (Gear)", category: "rotating", tags: ["PUMP", "PD", "VISCOUS"], description: "Gear pump for handling viscous fluids." },
    { type: "Positive Displacement Pump (Diaphragm)", category: "rotating", tags: ["PUMP", "PD", "METERING"], description: "Reciprocating diaphragm pump, often air-operated (AODD)." },
    { type: "Screw Pump", category: "rotating", tags: ["PUMP", "PD", "MULTIPHASE"], description: "Pump using intermeshing screws, good for multiphase fluids." },
    { type: "Centrifugal Compressor", category: "rotating", tags: ["COMPRESSOR", "KINETIC", "GAS"], description: "Dynamic compressor for high flow gas compression." },
    { type: "Reciprocating Compressor", category: "rotating", tags: ["COMPRESSOR", "PD", "HIGH_PRESSURE"], description: "Piston compressor for high pressure gas applications." },
    { type: "Screw Compressor", category: "rotating", tags: ["COMPRESSOR", "PD", "ROTARY"], description: "Rotary positive displacement compressor." },
    { type: "Liquid Ring Vacuum Pump", category: "rotating", tags: ["PUMP", "VACUUM", "WET"], description: "Pump using a liquid ring to generate vacuum." },
    { type: "Agitator / Mixer", category: "rotating", tags: ["MIXER", "AGITATION", "VESSEL"], description: "Top or side entry mixer for tank agitation." },

    // Piping & Valves
    { type: "Control Valve (Globe)", category: "piping", tags: ["VALVE", "CONTROL", "THROTTLING"], description: "Globe valve with actuator for precise flow control." },
    { type: "Ball Valve", category: "piping", tags: ["VALVE", "ISOLATION", "ON_OFF"], description: "Quarter-turn valve for tight shutoff." },
    { type: "Butterfly Valve", category: "piping", tags: ["VALVE", "ISOLATION", "LARGE_BORE"], description: "Compact quarter-turn valve for large lines." },
    { type: "Safety Relief Valve (PSV)", category: "piping", tags: ["VALVE", "SAFETY", "PRESSURE"], description: "Valve designed to open at a set pressure to protect equipment." },
    { type: "Check Valve", category: "piping", tags: ["VALVE", "NON_RETURN", "FLOW"], description: "Valve allowing flow in only one direction." },
    { type: "Rupture Disc", category: "piping", tags: ["SAFETY", "PRESSURE", "DISPOSABLE"], description: "Non-reclosing pressure relief device." },
    { type: "Steam Trap", category: "piping", tags: ["TRAP", "STEAM", "CONDENSATE"], description: "Device to discharge condensate while holding back steam." },
    { type: "Strainers (Y/Basket)", category: "piping", tags: ["FILTER", "PIPING", "PROTECTION"], description: "In-line filter to remove debris from piping." },

    // Instrumentation
    { type: "Coriolis Flow Meter", category: "instrumentation", tags: ["METER", "FLOW", "MASS"], description: "Direct mass flow meter measuring fluid density and flow." },
    { type: "Magnetic Flow Meter", category: "instrumentation", tags: ["METER", "FLOW", "CONDUCTIVE"], description: "Flow meter for conductive liquids with no moving parts." },
    { type: "Vortex Flow Meter", category: "instrumentation", tags: ["METER", "FLOW", "VORTEX"], description: "Flow meter using vortex shedding principle." },
    { type: "Radar Level Transmitter", category: "instrumentation", tags: ["LEVEL", "RADAR", "NON_CONTACT"], description: "Non-contact level measurement using radar waves." },
    { type: "Differential Pressure Transmitter", category: "instrumentation", tags: ["PRESSURE", "LEVEL", "FLOW"], description: "Versatile instrument measuring pressure difference." },
    { type: "Temperature Transmitter (RTD/TC)", category: "instrumentation", tags: ["TEMPERATURE", "SENSOR", "PROCESS"], description: "Device converting temperature sensor signal to 4-20mA." },
    { type: "pH Analyzer", category: "instrumentation", tags: ["ANALYZER", "LIQUID", "QUALITY"], description: "Online analyzer for measuring acidity/alkalinity." },
    { type: "Gas Chromatograph", category: "instrumentation", tags: ["ANALYZER", "GAS", "COMPOSITION"], description: "Analyzer for separating and measuring chemical components." },

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

const outputPath = path.join(__dirname, '../src/lib/resources/chemical_registry.json');

// Ensure directory exists (redundant if handled by plan, but safe)
const dir = path.dirname(outputPath);
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(registry, null, 2));

console.log(`Successfully generated chemical registry with ${equipmentList.length} items at: ${outputPath}`);
