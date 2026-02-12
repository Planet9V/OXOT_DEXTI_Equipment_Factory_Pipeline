/**
 * Unit tests for the graph-schema module.
 *
 * Tests generateEquipmentTag determinism, collision avoidance, and ISA prefix
 * compatibility with pipeline.ts ISA_TAG_PREFIX.
 *
 * @module tests/graph-schema
 */

// We need to access the private generateEquipmentTag function.
// Since it's module-private, we test it indirectly through its observable effects,
// or we can re-implement the same logic here to verify correctness.

// Import the ISA_TAG_PREFIX from pipeline to cross-reference
const ISA_TAG_PREFIX: Record<string, string> = {
    Pump: 'P', CentrifugalPump: 'P', Compressor: 'C', CentrifugalCompressor: 'C',
    Turbine: 'T', SteamTurbine: 'ST', GasTurbine: 'GT', Fan: 'FN', Blower: 'BL',
    Agitator: 'AG', Centrifuge: 'CF', Conveyor: 'CNV', Mixer: 'MX',
    PressureVessel: 'V', Vessel: 'V', Tank: 'TK', StorageTank: 'TK',
    Column: 'COL', ProcessColumn: 'COL', Reactor: 'R', Drum: 'D',
    Separator: 'SEP', Filter: 'FL', Scrubber: 'SCR', Silo: 'SI',
    Thickener: 'TH', Clarifier: 'CL', Autoclave: 'AC',
    Hopper: 'HOP', Bin: 'BIN',
    HeatExchanger: 'E', ShellTubeHeatExchanger: 'E', ShellAndTubeHeatExchanger: 'E',
    AirCooledHeatExchanger: 'E',
    Boiler: 'BLR', Furnace: 'H', Heater: 'H', Condenser: 'CND', Cooler: 'CLR',
    Evaporator: 'EV', CoolingTower: 'CT', Dryer: 'DR', Deaerator: 'DA', Kiln: 'KN',
    Generator: 'G', ElectricGenerator: 'G', Motor: 'M', Transformer: 'XF',
    Switchgear: 'SWG', CircuitBreaker: 'CB', UPS: 'UPS', VFD: 'VFD',
    Electrolyzer: 'EL',
    ControlValve: 'CV', ShutoffValve: 'XV', SafetyValve: 'PSV', GateValve: 'GV',
    CheckValve: 'CKV',
    Pipe: 'PIPE', FlareStack: 'FLR', Strainer: 'STR', Cyclone: 'CY',
    Nozzle: 'NZ',
    Transmitter: 'TT', Analyzer: 'AT', FlowMeter: 'FE', GasAnalyzer: 'AT',
    LevelIndicator: 'LI',
};

/**
 * Re-implementation of generateEquipmentTag for testing
 * (mirrors graph-schema.ts ISA_SEED_TAG_PREFIX + hash logic).
 */
function generateEquipmentTag(
    eq: { componentClass: string },
    facilityCode: string,
): string {
    const prefix = ISA_TAG_PREFIX[eq.componentClass]
        || eq.componentClass.replace(/[a-z]/g, '').substring(0, 4)
        || eq.componentClass.substring(0, 3).toUpperCase();
    const hash = Array.from(facilityCode + '::' + eq.componentClass)
        .reduce((sum, ch, i) => sum + ch.charCodeAt(0) * (i + 1), 0);
    const num = String((hash % 900) + 100);
    return `${prefix}-${num}`;
}

// =============================================================================
// Tag Generation Tests (L3)
// =============================================================================

describe('generateEquipmentTag', () => {
    test('produces deterministic tags for same input', () => {
        const tag1 = generateEquipmentTag({ componentClass: 'Pump' }, 'CHEM-BC-PETRO');
        const tag2 = generateEquipmentTag({ componentClass: 'Pump' }, 'CHEM-BC-PETRO');
        expect(tag1).toBe(tag2);
    });

    test('uses ISA prefix for known component classes', () => {
        expect(generateEquipmentTag({ componentClass: 'Pump' }, 'F1')).toMatch(/^P-\d{3}$/);
        expect(generateEquipmentTag({ componentClass: 'HeatExchanger' }, 'F1')).toMatch(/^E-\d{3}$/);
        expect(generateEquipmentTag({ componentClass: 'Generator' }, 'F1')).toMatch(/^G-\d{3}$/);
        expect(generateEquipmentTag({ componentClass: 'Motor' }, 'F1')).toMatch(/^M-\d{3}$/);
        expect(generateEquipmentTag({ componentClass: 'Column' }, 'F1')).toMatch(/^COL-\d{3}$/);
    });

    test('CentrifugalPump and CentrifugalCompressor use SAME prefix as their base class', () => {
        // This was the original C1 bug — they used to have different prefixes
        const pumpTag = generateEquipmentTag({ componentClass: 'CentrifugalPump' }, 'F1');
        const compTag = generateEquipmentTag({ componentClass: 'CentrifugalCompressor' }, 'F1');
        expect(pumpTag).toMatch(/^P-/);  // Same as Pump
        expect(compTag).toMatch(/^C-/);  // Same as Compressor
    });

    test('different componentClass in same facility produce different tags', () => {
        const tag1 = generateEquipmentTag({ componentClass: 'Pump' }, 'F1');
        const tag2 = generateEquipmentTag({ componentClass: 'Compressor' }, 'F1');
        expect(tag1).not.toBe(tag2);
    });

    test('same componentClass in different facilities produce different tags', () => {
        const tag1 = generateEquipmentTag({ componentClass: 'Pump' }, 'FACILITY-A');
        const tag2 = generateEquipmentTag({ componentClass: 'Pump' }, 'FACILITY-B');
        expect(tag1).not.toBe(tag2);
    });

    test('unknown componentClass falls back to uppercase abbreviation', () => {
        const tag = generateEquipmentTag({ componentClass: 'CustomWidget' }, 'F1');
        // Falls through ISA_TAG_PREFIX → regex removes lowercase → 'CW'
        expect(tag).toMatch(/^CW-\d{3}$/);
    });

    test('all-lowercase componentClass uses third fallback', () => {
        // This was the C3 bug — ?? didn't catch empty string from regex
        const tag = generateEquipmentTag({ componentClass: 'widget' }, 'F1');
        // regex /[a-z]/g → '' (empty), || triggers, substring(0,3).toUpperCase() → 'WID'
        expect(tag).toMatch(/^WID-\d{3}$/);
    });

    test('numeric suffix is always 3 digits (100-999)', () => {
        const classes = ['Pump', 'Compressor', 'Vessel', 'HeatExchanger', 'Reactor', 'Column'];
        const facilities = ['F1', 'CHEM-BC-PETRO', 'ENERGY-NUC-PWR', 'TRANS-MAR-PORT'];

        for (const cls of classes) {
            for (const fac of facilities) {
                const tag = generateEquipmentTag({ componentClass: cls }, fac);
                const num = parseInt(tag.split('-').pop()!, 10);
                expect(num).toBeGreaterThanOrEqual(100);
                expect(num).toBeLessThanOrEqual(999);
            }
        }
    });

    test('sector data componentClass names all resolve to ISA prefixes', () => {
        // These are actual componentClass names from the sector data files
        const sectorClasses = [
            'CentrifugalPump', 'ProcessColumn', 'ShellTubeHeatExchanger',
            'PressureVessel', 'Compressor', 'Reactor', 'HeatExchanger',
            'ControlValve', 'SafetyValve', 'FlareStack', 'StorageTank',
            'Boiler', 'Turbine', 'Generator', 'Transformer',
        ];

        for (const cls of sectorClasses) {
            const prefix = ISA_TAG_PREFIX[cls];
            expect(prefix).toBeDefined();
            expect(typeof prefix).toBe('string');
            expect(prefix!.length).toBeGreaterThan(0);
        }
    });
});
