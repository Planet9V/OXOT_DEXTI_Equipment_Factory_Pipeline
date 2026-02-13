/**
 * Reference Defaults Registry.
 *
 * Industry-standard generic reference variables per equipment category.
 * The generator agent uses these as baseline values and varies them
 * realistically. The audit agent uses the ranges to flag implausible values.
 *
 * @module agents/reference-defaults
 */

/* ─── Types ─────────────────────────────────────────────────────────────── */

/** Numeric range for plausibility checking. */
export interface NumberRange {
    /** Minimum plausible value. */
    min: number;
    /** Maximum plausible value. */
    max: number;
    /** Default/typical value. */
    typical: number;
    /** Engineering unit. */
    unit: string;
}

/** Reference specification with value, unit, and plausible range. */
export interface ReferenceSpec {
    /** Default/typical value. */
    value: string | number;
    /** Engineering unit (SI preferred). */
    unit: string;
    /** Plausible numeric range (if applicable). */
    range?: [number, number];
}

/** Standard operating condition ranges. */
export interface ConditionDefaults {
    /** Design pressure range. */
    designPressure: NumberRange;
    /** Operating pressure range. */
    operatingPressure: NumberRange;
    /** Design temperature range. */
    designTemperature: NumberRange;
    /** Operating temperature range. */
    operatingTemperature: NumberRange;
    /** Flow rate range (if applicable). */
    flowRate?: NumberRange;
}

/** Standard nozzle template. */
export interface NozzleTemplate {
    /** Nozzle identifier pattern (e.g. "N1", "N2"). */
    id: string;
    /** Typical size (e.g. "6\" 150#"). */
    size: string;
    /** Typical pressure rating (e.g. "150#", "300#"). */
    rating: string;
    /** Typical flange facing. */
    facing: string;
    /** Service description (e.g. "Inlet", "Outlet"). */
    service: string;
}

/** Complete reference defaults for an equipment category. */
export interface ReferenceDefaults {
    /** Category display name. */
    category: string;
    /** Typical specifications with ranges. */
    specifications: Record<string, ReferenceSpec>;
    /** Standard operating condition ranges. */
    operatingConditions: ConditionDefaults;
    /** Default materials of construction. */
    materials: {
        body: string;
        internals: string;
        gaskets: string;
        bolting: string;
    };
    /** Applicable industry standards. */
    standards: string[];
    /** Major manufacturers. */
    manufacturers: string[];
    /** Standard nozzle configuration template. */
    nozzleTemplate: NozzleTemplate[];
}

/* ─── Equipment Class → Category Mapping ────────────────────────────────── */

const CLASS_TO_CATEGORY: Record<string, string> = {
    // Pumps
    Pump: 'Pump', CentrifugalPump: 'Pump', PositiveDisplacementPump: 'Pump',
    ReciprocatingPump: 'Pump', DiaphragmPump: 'Pump', GearPump: 'Pump',
    // Compressors
    Compressor: 'Compressor', CentrifugalCompressor: 'Compressor',
    ReciprocatingCompressor: 'Compressor', ScrewCompressor: 'Compressor',
    Fan: 'Compressor', Blower: 'Compressor',
    // Vessels
    PressureVessel: 'Vessel', Vessel: 'Vessel', Tank: 'Vessel',
    StorageTank: 'Vessel', Drum: 'Vessel', Separator: 'Vessel',
    Silo: 'Vessel', Accumulator: 'Vessel',
    // Heat Exchangers
    HeatExchanger: 'HeatExchanger', ShellTubeHeatExchanger: 'HeatExchanger',
    AirCooledHeatExchanger: 'HeatExchanger', PlateHeatExchanger: 'HeatExchanger',
    Condenser: 'HeatExchanger', Cooler: 'HeatExchanger', Reboiler: 'HeatExchanger',
    // Columns
    Column: 'Column', ProcessColumn: 'Column', DistillationColumn: 'Column',
    AbsorptionColumn: 'Column', StripperColumn: 'Column',
    // Reactors
    Reactor: 'Reactor', Furnace: 'Reactor', Heater: 'Reactor', Boiler: 'Reactor',
    // Valves
    ControlValve: 'Valve', ShutoffValve: 'Valve', SafetyValve: 'Valve',
    GateValve: 'Valve', GlobeValve: 'Valve', ButterflyValve: 'Valve',
    CheckValve: 'Valve', BallValve: 'Valve',
    // Instruments
    Transmitter: 'Instrument', Analyzer: 'Instrument', FlowMeter: 'Instrument',
    LevelGauge: 'Instrument', PressureGauge: 'Instrument',
    // Rotating
    Turbine: 'Turbine', SteamTurbine: 'Turbine', GasTurbine: 'Turbine',
    Generator: 'Turbine', ElectricGenerator: 'Turbine', Motor: 'Turbine',
    Transformer: 'Turbine',
    // Miscellaneous
    Agitator: 'MiscMechanical', Centrifuge: 'MiscMechanical',
    Conveyor: 'MiscMechanical', Mixer: 'MiscMechanical',
    Filter: 'MiscMechanical', Scrubber: 'MiscMechanical',
};

/* ─── Reference Defaults Registry ───────────────────────────────────────── */

/**
 * Industry-standard reference defaults per equipment category.
 *
 * Values are generic/typical — intended as baselines for the generator
 * and plausibility bounds for the audit agent.
 */
export const REFERENCE_DEFAULTS: Record<string, ReferenceDefaults> = {
    Pump: {
        category: 'Pump',
        specifications: {
            capacity: { value: 150, unit: 'm³/h', range: [1, 5000] },
            head: { value: 75, unit: 'm', range: [5, 500] },
            power: { value: 45, unit: 'kW', range: [0.5, 2000] },
            speed: { value: 2950, unit: 'rpm', range: [500, 3600] },
            efficiency: { value: 78, unit: '%', range: [40, 95] },
            npshRequired: { value: 3.5, unit: 'm', range: [0.5, 15] },
            impellerDiameter: { value: 250, unit: 'mm', range: [50, 800] },
        },
        operatingConditions: {
            designPressure: { min: 5, max: 150, typical: 25, unit: 'barg' },
            operatingPressure: { min: 2, max: 100, typical: 15, unit: 'barg' },
            designTemperature: { min: -29, max: 400, typical: 150, unit: '°C' },
            operatingTemperature: { min: -10, max: 350, typical: 80, unit: '°C' },
            flowRate: { min: 1, max: 5000, typical: 150, unit: 'm³/h' },
        },
        materials: {
            body: 'Carbon Steel SA-216 WCB',
            internals: 'SS 316',
            gaskets: 'Spiral Wound SS/Graphite',
            bolting: 'SA-193 B7 / SA-194 2H',
        },
        standards: [
            'API 610 (Centrifugal Pumps)',
            'ASME B73.1 (Chemical Pumps)',
            'ISO 5199 (Technical Specifications)',
            'API 682 (Mechanical Seals)',
            'NEMA MG-1 (Motors)',
        ],
        manufacturers: [
            'Sulzer', 'Flowserve', 'KSB', 'Grundfos',
            'ITT Goulds', 'Pentair', 'Ebara',
        ],
        nozzleTemplate: [
            { id: 'N1', size: '6"', rating: '150#', facing: 'RF', service: 'Suction' },
            { id: 'N2', size: '4"', rating: '150#', facing: 'RF', service: 'Discharge' },
            { id: 'N3', size: '1"', rating: '150#', facing: 'RF', service: 'Drain' },
            { id: 'N4', size: '3/4"', rating: '150#', facing: 'RF', service: 'Vent' },
        ],
    },

    Compressor: {
        category: 'Compressor',
        specifications: {
            capacity: { value: 5000, unit: 'Nm³/h', range: [100, 500000] },
            dischargeP: { value: 35, unit: 'barg', range: [2, 400] },
            suctionP: { value: 2, unit: 'barg', range: [0.1, 100] },
            power: { value: 500, unit: 'kW', range: [10, 50000] },
            speed: { value: 10000, unit: 'rpm', range: [900, 25000] },
            compressionRatio: { value: 3.5, unit: '-', range: [1.2, 12] },
            polytropicEfficiency: { value: 82, unit: '%', range: [60, 92] },
        },
        operatingConditions: {
            designPressure: { min: 5, max: 450, typical: 45, unit: 'barg' },
            operatingPressure: { min: 2, max: 400, typical: 35, unit: 'barg' },
            designTemperature: { min: -50, max: 300, typical: 180, unit: '°C' },
            operatingTemperature: { min: -40, max: 250, typical: 150, unit: '°C' },
            flowRate: { min: 100, max: 500000, typical: 5000, unit: 'Nm³/h' },
        },
        materials: {
            body: 'Carbon Steel SA-516 Gr.70',
            internals: 'SS 410 / Inconel 718',
            gaskets: 'Spiral Wound SS/Graphite',
            bolting: 'SA-193 B7 / SA-194 2H',
        },
        standards: [
            'API 617 (Centrifugal Compressors)',
            'API 618 (Reciprocating Compressors)',
            'API 619 (Screw Compressors)',
            'ASME PTC 10 (Performance Testing)',
            'ISO 10439 (Process Compressors)',
        ],
        manufacturers: [
            'Siemens Energy', 'Atlas Copco', 'GE Oil & Gas',
            'MAN Energy Solutions', 'Dresser-Rand', 'Hitachi',
        ],
        nozzleTemplate: [
            { id: 'N1', size: '12"', rating: '300#', facing: 'RF', service: 'Suction' },
            { id: 'N2', size: '8"', rating: '600#', facing: 'RF', service: 'Discharge' },
            { id: 'N3', size: '2"', rating: '300#', facing: 'RF', service: 'Drain' },
        ],
    },

    Vessel: {
        category: 'Vessel',
        specifications: {
            volume: { value: 50, unit: 'm³', range: [0.1, 10000] },
            diameter: { value: 2000, unit: 'mm', range: [300, 8000] },
            tangentLength: { value: 5000, unit: 'mm', range: [500, 30000] },
            wallThickness: { value: 18, unit: 'mm', range: [3, 100] },
            corrosionAllowance: { value: 3, unit: 'mm', range: [1, 6] },
            weight: { value: 8500, unit: 'kg', range: [50, 500000] },
        },
        operatingConditions: {
            designPressure: { min: -1, max: 300, typical: 15, unit: 'barg' },
            operatingPressure: { min: -1, max: 250, typical: 10, unit: 'barg' },
            designTemperature: { min: -50, max: 550, typical: 200, unit: '°C' },
            operatingTemperature: { min: -40, max: 500, typical: 150, unit: '°C' },
        },
        materials: {
            body: 'Carbon Steel SA-516 Gr.70',
            internals: 'SS 316L',
            gaskets: 'Spiral Wound SS/Graphite',
            bolting: 'SA-193 B7 / SA-194 2H',
        },
        standards: [
            'ASME Section VIII Div.1 (Pressure Vessels)',
            'ASME Section VIII Div.2 (Alternative Rules)',
            'API 510 (Inspection)',
            'PD 5500 (BS Pressure Vessels)',
            'EN 13445 (Unfired Pressure Vessels)',
        ],
        manufacturers: [
            'Yokogawa', 'TechnipFMC', 'Larsen & Toubro',
            'Doosan Heavy Industries', 'Chart Industries', 'CIMC Enric',
        ],
        nozzleTemplate: [
            { id: 'N1', size: '8"', rating: '150#', facing: 'RF', service: 'Inlet' },
            { id: 'N2', size: '6"', rating: '150#', facing: 'RF', service: 'Outlet' },
            { id: 'N3', size: '2"', rating: '150#', facing: 'RF', service: 'Drain' },
            { id: 'N4', size: '1"', rating: '150#', facing: 'RF', service: 'Vent' },
            { id: 'N5', size: '24"', rating: '150#', facing: 'RF', service: 'Manway' },
        ],
    },

    HeatExchanger: {
        category: 'HeatExchanger',
        specifications: {
            duty: { value: 5000, unit: 'kW', range: [10, 100000] },
            area: { value: 200, unit: 'm²', range: [1, 5000] },
            temaType: { value: 'BEM', unit: '-' },
            shellDiameter: { value: 900, unit: 'mm', range: [150, 3000] },
            tubeLength: { value: 6000, unit: 'mm', range: [1500, 12000] },
            tubeOD: { value: 25.4, unit: 'mm', range: [12.7, 50.8] },
            tubePitch: { value: 31.75, unit: 'mm', range: [15.88, 63.5] },
            numberOfTubes: { value: 250, unit: '-', range: [10, 5000] },
            uFactor: { value: 500, unit: 'W/m²·K', range: [50, 5000] },
        },
        operatingConditions: {
            designPressure: { min: 2, max: 200, typical: 25, unit: 'barg' },
            operatingPressure: { min: 1, max: 150, typical: 15, unit: 'barg' },
            designTemperature: { min: -50, max: 500, typical: 250, unit: '°C' },
            operatingTemperature: { min: -40, max: 450, typical: 200, unit: '°C' },
        },
        materials: {
            body: 'Carbon Steel SA-516 Gr.70 (Shell)',
            internals: 'SS 316L (Tubes)',
            gaskets: 'Spiral Wound SS/Graphite',
            bolting: 'SA-193 B7 / SA-194 2H',
        },
        standards: [
            'TEMA (Tubular Exchanger Manufacturers Association)',
            'ASME Section VIII Div.1',
            'API 660 (Shell & Tube Heat Exchangers)',
            'API 661 (Air-Cooled Heat Exchangers)',
            'HTRI (Heat Transfer Research)',
        ],
        manufacturers: [
            'Alfa Laval', 'GEA Group', 'SPX Flow',
            'Kelvion', 'Hisaka Works', 'Tranter',
        ],
        nozzleTemplate: [
            { id: 'S1', size: '8"', rating: '150#', facing: 'RF', service: 'Shell Inlet' },
            { id: 'S2', size: '8"', rating: '150#', facing: 'RF', service: 'Shell Outlet' },
            { id: 'T1', size: '6"', rating: '150#', facing: 'RF', service: 'Tube Inlet' },
            { id: 'T2', size: '6"', rating: '150#', facing: 'RF', service: 'Tube Outlet' },
        ],
    },

    Column: {
        category: 'Column',
        specifications: {
            diameter: { value: 2500, unit: 'mm', range: [300, 12000] },
            height: { value: 30000, unit: 'mm', range: [3000, 80000] },
            numberOfTrays: { value: 40, unit: '-', range: [5, 120] },
            traySpacing: { value: 600, unit: 'mm', range: [300, 900] },
            trayType: { value: 'Sieve', unit: '-' },
            refluxRatio: { value: 1.5, unit: '-', range: [0.5, 10] },
            numberOfPasses: { value: 2, unit: '-', range: [1, 4] },
        },
        operatingConditions: {
            designPressure: { min: -1, max: 50, typical: 5, unit: 'barg' },
            operatingPressure: { min: -1, max: 40, typical: 3, unit: 'barg' },
            designTemperature: { min: -50, max: 400, typical: 250, unit: '°C' },
            operatingTemperature: { min: -40, max: 380, typical: 200, unit: '°C' },
        },
        materials: {
            body: 'Carbon Steel SA-516 Gr.70',
            internals: 'SS 410 (Trays)',
            gaskets: 'Spiral Wound SS/Graphite',
            bolting: 'SA-193 B7 / SA-194 2H',
        },
        standards: [
            'ASME Section VIII Div.1',
            'API 2000 (Venting)',
            'ASME/ANSI B16.5 (Flanges)',
            'FRI (Fractionation Research)',
            'GPSA Engineering Data Book',
        ],
        manufacturers: [
            'Koch-Glitsch', 'Sulzer Chemtech', 'RVT Process Equipment',
            'MTE Group', 'Montz', 'HAT International',
        ],
        nozzleTemplate: [
            { id: 'N1', size: '12"', rating: '150#', facing: 'RF', service: 'Feed' },
            { id: 'N2', size: '10"', rating: '150#', facing: 'RF', service: 'Overhead Vapor' },
            { id: 'N3', size: '8"', rating: '150#', facing: 'RF', service: 'Bottoms' },
            { id: 'N4', size: '6"', rating: '150#', facing: 'RF', service: 'Reflux Return' },
        ],
    },

    Reactor: {
        category: 'Reactor',
        specifications: {
            volume: { value: 20, unit: 'm³', range: [0.1, 1000] },
            diameter: { value: 2000, unit: 'mm', range: [300, 6000] },
            catalystVolume: { value: 10, unit: 'm³', range: [0.05, 500] },
            bedHeight: { value: 3000, unit: 'mm', range: [500, 15000] },
            residenceTime: { value: 30, unit: 'min', range: [1, 480] },
            conversionRate: { value: 95, unit: '%', range: [50, 99.9] },
        },
        operatingConditions: {
            designPressure: { min: -1, max: 350, typical: 50, unit: 'barg' },
            operatingPressure: { min: -1, max: 300, typical: 40, unit: 'barg' },
            designTemperature: { min: -50, max: 900, typical: 450, unit: '°C' },
            operatingTemperature: { min: -40, max: 850, typical: 400, unit: '°C' },
        },
        materials: {
            body: 'SA-387 Gr.22 CL.2 (Cr-Mo)',
            internals: 'SS 321H / Inconel 625',
            gaskets: 'RTJ (Ring Type Joint)',
            bolting: 'SA-193 B16 / SA-194 4',
        },
        standards: [
            'ASME Section VIII Div.2',
            'API 660 (Reactor Design)',
            'NACE MR0175 (Sour Service)',
            'ASME PTC 4 (Fired Heaters)',
            'WRC Bulletin 107 (Local Stresses)',
        ],
        manufacturers: [
            'Haldor Topsoe', 'Johnson Matthey', 'BASF',
            'Axens', 'Honeywell UOP', 'ThyssenKrupp',
        ],
        nozzleTemplate: [
            { id: 'N1', size: '10"', rating: '600#', facing: 'RTJ', service: 'Feed Inlet' },
            { id: 'N2', size: '10"', rating: '600#', facing: 'RTJ', service: 'Product Outlet' },
            { id: 'N3', size: '4"', rating: '600#', facing: 'RTJ', service: 'Catalyst Loading' },
            { id: 'N4', size: '6"', rating: '600#', facing: 'RTJ', service: 'Thermowell' },
        ],
    },

    Valve: {
        category: 'Valve',
        specifications: {
            size: { value: 6, unit: 'inch', range: [0.5, 60] },
            pressureClass: { value: 300, unit: '#', range: [150, 2500] },
            cv: { value: 200, unit: '-', range: [0.1, 10000] },
            rangeability: { value: 50, unit: ':1', range: [10, 200] },
            leakageClass: { value: 'IV', unit: '-' },
            actuatorType: { value: 'Pneumatic Diaphragm', unit: '-' },
        },
        operatingConditions: {
            designPressure: { min: 2, max: 420, typical: 50, unit: 'barg' },
            operatingPressure: { min: 1, max: 400, typical: 40, unit: 'barg' },
            designTemperature: { min: -196, max: 815, typical: 200, unit: '°C' },
            operatingTemperature: { min: -150, max: 750, typical: 150, unit: '°C' },
        },
        materials: {
            body: 'Carbon Steel A216 WCB',
            internals: 'SS 316 / Stellite 6',
            gaskets: 'PTFE / Graphite',
            bolting: 'SA-193 B7 / SA-194 2H',
        },
        standards: [
            'ISA-75.01 (Control Valve Sizing)',
            'IEC 61131 (Safety Valves)',
            'API 6D (Pipeline Valves)',
            'ASME B16.34 (Valves—Flanged)',
            'API 526 (Safety Relief Valves)',
        ],
        manufacturers: [
            'Emerson (Fisher)', 'Flowserve (Valtek)', 'IMI CCI',
            'Metso Neles', 'Cameron (Schlumberger)', 'Rotork',
        ],
        nozzleTemplate: [
            { id: 'N1', size: '6"', rating: '300#', facing: 'RF', service: 'Inlet' },
            { id: 'N2', size: '6"', rating: '300#', facing: 'RF', service: 'Outlet' },
        ],
    },

    Instrument: {
        category: 'Instrument',
        specifications: {
            rangeMin: { value: 0, unit: 'varies', range: [-1000, 0] },
            rangeMax: { value: 100, unit: 'varies', range: [0, 10000] },
            accuracy: { value: 0.1, unit: '%FS', range: [0.01, 2] },
            outputSignal: { value: '4-20 mA', unit: '-' },
            protocol: { value: 'HART', unit: '-' },
            sil: { value: 2, unit: '-', range: [1, 3] },
            processConnection: { value: '1/2" NPT', unit: '-' },
        },
        operatingConditions: {
            designPressure: { min: 0, max: 700, typical: 100, unit: 'barg' },
            operatingPressure: { min: 0, max: 600, typical: 50, unit: 'barg' },
            designTemperature: { min: -200, max: 600, typical: 200, unit: '°C' },
            operatingTemperature: { min: -150, max: 500, typical: 100, unit: '°C' },
        },
        materials: {
            body: 'SS 316L',
            internals: 'Hastelloy C-276',
            gaskets: 'Viton / PTFE',
            bolting: 'SS 316',
        },
        standards: [
            'IEC 61511 (SIS)',
            'ISA-84 (Safety Instrumented Systems)',
            'IEC 62443 (Cybersecurity)',
            'NAMUR NE 43 (Signal Levels)',
            'API 551 (Process Measurement)',
        ],
        manufacturers: [
            'Emerson (Rosemount)', 'Endress+Hauser', 'Siemens',
            'Yokogawa', 'ABB', 'Honeywell',
        ],
        nozzleTemplate: [
            { id: 'N1', size: '1/2" NPT', rating: '-', facing: 'Threaded', service: 'Process Connection' },
        ],
    },

    Turbine: {
        category: 'Turbine',
        specifications: {
            power: { value: 5000, unit: 'kW', range: [10, 500000] },
            speed: { value: 3000, unit: 'rpm', range: [750, 15000] },
            efficiency: { value: 85, unit: '%', range: [30, 98] },
            voltage: { value: 11000, unit: 'V', range: [400, 35000] },
            frequency: { value: 50, unit: 'Hz', range: [50, 60] },
            coolingType: { value: 'Air-Cooled', unit: '-' },
        },
        operatingConditions: {
            designPressure: { min: 0, max: 200, typical: 100, unit: 'barg' },
            operatingPressure: { min: 0, max: 170, typical: 80, unit: 'barg' },
            designTemperature: { min: 0, max: 600, typical: 540, unit: '°C' },
            operatingTemperature: { min: 0, max: 565, typical: 510, unit: '°C' },
        },
        materials: {
            body: 'Carbon Steel / Cr-Mo Steel',
            internals: 'Inconel 718 / Nimonic 80A',
            gaskets: 'Metallic Spiral Wound',
            bolting: 'SA-193 B16 / SA-194 4',
        },
        standards: [
            'API 611 (Steam Turbines)',
            'API 612 (Special-Purpose Steam Turbines)',
            'NEMA MG-1 (Motors/Generators)',
            'IEEE C50.13 (Synchronous Generators)',
            'IEC 60034 (Rotating Electrical Machines)',
        ],
        manufacturers: [
            'Siemens Energy', 'GE Power', 'Mitsubishi Power',
            'Doosan', 'MAN Energy Solutions', 'Elliott Group',
        ],
        nozzleTemplate: [
            { id: 'N1', size: '12"', rating: '600#', facing: 'RF', service: 'Steam Inlet' },
            { id: 'N2', size: '24"', rating: '150#', facing: 'RF', service: 'Exhaust' },
        ],
    },

    MiscMechanical: {
        category: 'MiscMechanical',
        specifications: {
            capacity: { value: 100, unit: 'm³/h', range: [0.1, 10000] },
            power: { value: 50, unit: 'kW', range: [0.5, 5000] },
            speed: { value: 1500, unit: 'rpm', range: [10, 3600] },
            efficiency: { value: 75, unit: '%', range: [30, 95] },
        },
        operatingConditions: {
            designPressure: { min: -1, max: 50, typical: 10, unit: 'barg' },
            operatingPressure: { min: -1, max: 40, typical: 5, unit: 'barg' },
            designTemperature: { min: -50, max: 300, typical: 100, unit: '°C' },
            operatingTemperature: { min: -40, max: 250, typical: 80, unit: '°C' },
        },
        materials: {
            body: 'Carbon Steel',
            internals: 'SS 304/316',
            gaskets: 'Spiral Wound',
            bolting: 'SA-193 B7',
        },
        standards: [
            'ASME Section VIII Div.1',
            'API 560',
            'ISO 9001 (Quality Management)',
        ],
        manufacturers: [
            'Alfa Laval', 'SPX Flow', 'GEA Group',
        ],
        nozzleTemplate: [
            { id: 'N1', size: '6"', rating: '150#', facing: 'RF', service: 'Inlet' },
            { id: 'N2', size: '4"', rating: '150#', facing: 'RF', service: 'Outlet' },
        ],
    },
};

/* ─── Lookup Function ───────────────────────────────────────────────────── */

/**
 * Returns reference defaults for a given equipment class.
 *
 * Maps the equipment class name to a category, then returns the
 * category defaults. Falls back to `MiscMechanical` if no match.
 *
 * @param componentClass - DEXPI 2.0 component class name.
 * @returns Reference defaults for the category.
 */
export function getDefaults(componentClass: string): ReferenceDefaults {
    const category = CLASS_TO_CATEGORY[componentClass];
    if (category && REFERENCE_DEFAULTS[category]) {
        return REFERENCE_DEFAULTS[category];
    }

    // Fuzzy match: try partial match against keys
    const lc = componentClass.toLowerCase();
    for (const [key, cat] of Object.entries(CLASS_TO_CATEGORY)) {
        if (lc.includes(key.toLowerCase()) || key.toLowerCase().includes(lc)) {
            if (REFERENCE_DEFAULTS[cat]) {
                return REFERENCE_DEFAULTS[cat];
            }
        }
    }

    return REFERENCE_DEFAULTS['MiscMechanical'];
}

/**
 * Returns all supported equipment categories.
 *
 * @returns Array of category names.
 */
export function getCategories(): string[] {
    return Object.keys(REFERENCE_DEFAULTS);
}

/**
 * Checks if a value is within the plausible range for a reference spec.
 *
 * @param value - The value to check.
 * @param spec - The reference specification with range.
 * @returns True if within range (or no range defined), false otherwise.
 */
export function isWithinRange(value: number, spec: ReferenceSpec): boolean {
    if (!spec.range) return true;
    return value >= spec.range[0] && value <= spec.range[1];
}

/**
 * Checks if operating conditions are within plausible ranges.
 *
 * @param conditions - The operating conditions to check.
 * @param defaults - The reference defaults for the category.
 * @returns Array of out-of-range findings.
 */
export function checkConditionRanges(
    conditions: Record<string, number | undefined>,
    defaults: ReferenceDefaults,
): Array<{ field: string; value: number; range: NumberRange; message: string }> {
    const findings: Array<{ field: string; value: number; range: NumberRange; message: string }> = [];
    const oc = defaults.operatingConditions;

    const checks: Array<[string, number | undefined, NumberRange]> = [
        ['designPressure', conditions.designPressure, oc.designPressure],
        ['operatingPressure', conditions.operatingPressure, oc.operatingPressure],
        ['designTemperature', conditions.designTemperature, oc.designTemperature],
        ['operatingTemperature', conditions.operatingTemperature, oc.operatingTemperature],
    ];

    if (oc.flowRate && conditions.flowRate != null) {
        checks.push(['flowRate', conditions.flowRate, oc.flowRate]);
    }

    for (const [field, value, range] of checks) {
        if (value == null) continue;
        if (value < range.min || value > range.max) {
            findings.push({
                field,
                value,
                range,
                message: `${field} = ${value} ${range.unit} is outside plausible range [${range.min}, ${range.max}]`,
            });
        }
    }

    return findings;
}
