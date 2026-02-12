/**
 * DEXPI Equipment Classes — Wiki Page.
 *
 * Shows the full equipment taxonomy with POSC Caesar URIs, organized by category.
 *
 * @module wiki/dexpi/equipment-classes/page
 */

import { SECTORS } from '@/lib/sectors';
import type { EquipmentCategory } from '@/lib/sectors/types';

export const metadata = {
    title: 'Equipment Classes — DEXPI Wiki',
    description: 'Complete DEXPI 2.0 equipment class taxonomy with POSC Caesar Reference Data Library URIs.',
};

/** Equipment class definition for the table. */
interface EqClass {
    componentClass: string;
    displayName: string;
    category: string;
    uri: string;
    description: string;
}

/** 
 * Static descriptions for known equipment classes. 
 * Fallback used when dynamically building the list from SECTORS.
 */
const CLASS_DESCRIPTIONS: Record<string, string> = {
    PressureVessel: 'Closed container designed to hold fluids at pressures substantially different from ambient.',
    ProcessColumn: 'Vertical vessel with internals (trays, packing) for mass transfer separation processes.',
    Reactor: 'Vessel in which chemical reactions are carried out, including CSTR, PFR, and batch types.',
    StorageTank: 'Atmospheric or low-pressure vessel for liquid, gas, or solid storage.',
    Separator: 'Vessel for separating mixtures by gravity, centrifugal force, or coalescence.',
    Filter: 'Device for removing solid particles from a fluid stream.',
    Clarifier: 'Large basin for gravity settling of suspended solids from liquid.',
    Scrubber: 'Device for removing pollutants from gas streams by contact with a scrubbing liquid.',
    Silo: 'Bulk storage structure for granular or powdered materials.',
    Thickener: 'Large-diameter settling device for concentrating slurries.',
    Autoclave: 'Pressure vessel for processes requiring elevated temperature and pressure (sterilization, curing).',
    CentrifugalPump: 'Dynamic pump using impeller rotation to move fluids through centrifugal force.',
    Compressor: 'Machine for increasing gas pressure through mechanical work (centrifugal, reciprocating, screw).',
    Fan: 'Rotary machine for moving gas at relatively low pressure differential.',
    Blower: 'Positive-displacement or centrifugal machine for moderate-pressure gas service.',
    Turbine: 'Rotary engine extracting energy from a fluid flow (hydraulic, steam, gas).',
    SteamTurbine: 'Turbine driven by high-pressure steam expanding through nozzle/blade stages.',
    GasTurbine: 'Combustion turbine burning fuel-gas mixture in a Brayton cycle.',
    Agitator: 'Rotating impeller/paddle assembly for mixing fluids in vessels.',
    Centrifuge: 'High-speed rotating device for separating materials by density difference.',
    Conveyor: 'Continuous mechanical transport system (belt, screw, bucket, chain).',
    ShellTubeHeatExchanger: 'Most common heat exchanger type with tubes inside a cylindrical shell, per TEMA standards.',
    AirCooledHeatExchanger: 'Fin-fan cooler using ambient air as cooling medium.',
    Boiler: 'Fired or heat-recovery steam generator producing steam from feedwater.',
    Heater: 'Directly-fired heater for raising process fluid temperature (official DEXPI class).',
    Condenser: 'Heat exchanger condensing vapor to liquid by removing latent heat.',
    Evaporator: 'Heat exchanger vaporizing liquid by adding heat, for concentration or phase change.',
    CoolingTower: 'Structure for rejecting process heat to atmosphere via evaporative cooling.',
    Cooler: 'Heat exchanger specifically for cooling a process stream.',
    Dryer: 'Equipment for removing moisture from solid materials.',
    Deaerator: 'Device for removing dissolved gases from boiler feedwater.',
    Kiln: 'High-temperature thermal processing chamber for calcination, clinker, or ceramics.',
    Transformer: 'Static electromagnetic device for voltage transformation.',
    Motor: 'Machine converting electrical energy to mechanical rotation.',
    ElectricGenerator: 'Machine converting mechanical energy to electrical power.',
    Switchgear: 'Assembly of circuit breakers, disconnects, and bus bars for power distribution.',
    UPS: 'Battery-backed power supply providing uninterrupted power during outages.',
    VFD: 'Variable Frequency Drive',
    Electrolyzer: 'Device using electricity to drive non-spontaneous chemical reactions (e.g., water/brine electrolysis).',
    CircuitBreaker: 'Switching device for interrupting fault currents and isolating circuits.',
    ControlValve: 'Final control element modulating fluid flow in response to a control signal.',
    SafetyValve: 'Pressure Relief / Safety Valve',
    GateValve: 'Isolation valve using a flat gate to start/stop flow (not for throttling).',
    FlareStack: 'Elevated combustion device for safe disposal of excess hydrocarbon gases.',
    Strainer: 'In-line device with a perforated basket for capturing debris from flowing fluid.',
    Cyclone: 'Conical device using centrifugal force for separation of particles from gas or liquid.',
    FlowMeter: 'Instrument measuring volumetric or mass flow rate (Coriolis, ultrasonic, orifice, turbine).',
    GasAnalyzer: 'Online analytical instrument measuring gas composition (IR, paramagnetic, electrochemical).',
    LevelIndicator: 'Instrument measuring liquid level in vessels (radar, ultrasonic, float, DP).',
    Mixer: 'Device for blending fluids through mechanical agitation or static elements.',
};

/** Derived equipment classes from ground-truth SECTORS constant. */
function getDerivedEquipmentClasses(): EqClass[] {
    const classMap = new Map<string, EqClass>();

    for (const sector of SECTORS) {
        for (const sub of sector.subSectors) {
            for (const fac of sub.facilities) {
                for (const eq of fac.equipment) {
                    if (!classMap.has(eq.componentClass)) {
                        classMap.set(eq.componentClass, {
                            componentClass: eq.componentClass,
                            displayName: eq.displayName,
                            category: eq.category.charAt(0).toUpperCase() + eq.category.slice(1).replace('-', ' '),
                            uri: eq.componentClassURI,
                            description: CLASS_DESCRIPTIONS[eq.componentClass] || `Standard DEXPI class for ${eq.displayName}.`,
                        });
                    }
                }
            }
        }
    }

    return Array.from(classMap.values()).sort((a, b) => a.componentClass.localeCompare(b.componentClass));
}

const CATEGORY_COLORS: Record<string, string> = {
    Static: '#06B6D4',
    Rotating: '#8B5CF6',
    'Heat transfer': '#F59E0B',
    Electrical: '#3B82F6',
    Piping: '#10B981',
    Instrumentation: '#EC4899',
};

export default function EquipmentClassesPage() {
    const equipmentClasses = getDerivedEquipmentClasses();
    const grouped: Record<string, EqClass[]> = {};

    for (const c of equipmentClasses) {
        if (!grouped[c.category]) grouped[c.category] = [];
        grouped[c.category].push(c);
    }

    return (
        <article className="max-w-5xl space-y-10">
            <header className="space-y-3">
                <span className="text-xs font-mono text-[#FF6B00]">DEXPI 2.0</span>
                <h1 className="text-3xl font-heading font-bold text-white">Equipment Classes</h1>
                <p className="text-gray-400 text-base leading-relaxed">
                    Complete taxonomy of <strong className="text-white">{equipmentClasses.length}</strong>{' '}
                    DEXPI 2.0 equipment classes organized by category. Each class is derived from the core
                    CISA sector models and carries a unique POSC Caesar Reference Data Library (RDL) URI.
                </p>
            </header>

            {/* Summary stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {Object.entries(grouped).map(([cat, items]) => (
                    <div
                        key={cat}
                        className="rounded-xl border border-white/[0.06] p-3 text-center"
                        style={{ background: 'rgba(255,255,255,0.02)' }}
                    >
                        <div className="text-xl font-heading font-bold" style={{ color: CATEGORY_COLORS[cat] || '#94a3b8' }}>
                            {items.length}
                        </div>
                        <div className="text-[10px] text-gray-500 mt-0.5">{cat}</div>
                    </div>
                ))}
            </div>

            {/* Category tables */}
            {Object.entries(grouped).map(([category, items]) => (
                <section key={category} className="space-y-3">
                    <h2 className="text-lg font-heading font-semibold text-white flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ background: CATEGORY_COLORS[category] || '#94a3b8' }} />
                        {category} Equipment
                        <span className="text-xs text-gray-500 font-normal">({items.length})</span>
                    </h2>

                    <div className="rounded-xl border border-white/[0.06] overflow-hidden" style={{ background: 'rgba(255,255,255,0.015)' }}>
                        <table className="w-full text-xs">
                            <thead>
                                <tr className="border-b border-white/[0.06] text-gray-500">
                                    <th className="text-left px-4 py-2.5 font-medium">Display Name</th>
                                    <th className="text-left px-3 py-2.5 font-medium">Component Class</th>
                                    <th className="text-left px-3 py-2.5 font-medium hidden lg:table-cell">Description</th>
                                    <th className="text-left px-4 py-2.5 font-medium">RDL URI</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((eq) => (
                                    <tr
                                        key={eq.componentClass}
                                        className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
                                    >
                                        <td className="px-4 py-2.5 text-gray-300 font-medium">{eq.displayName}</td>
                                        <td className="px-3 py-2.5">
                                            <code className="text-[10px] text-gray-500 bg-white/[0.04] px-1.5 py-0.5 rounded font-mono">
                                                {eq.componentClass}
                                            </code>
                                        </td>
                                        <td className="px-3 py-2.5 text-gray-500 hidden lg:table-cell max-w-xs">
                                            {eq.description}
                                        </td>
                                        <td className="px-4 py-2.5">
                                            <code className="text-[9px] text-gray-600 font-mono break-all">
                                                {eq.uri}
                                            </code>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            ))}
            {/* See Also / Backlinks */}
            <section className="border-t border-white/[0.06] pt-6 space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">See Also</h3>
                <div className="flex flex-wrap gap-2">
                    {[
                        { href: '/wiki/dexpi', label: 'DEXPI 2.0 Overview' },
                        { href: '/wiki/dexpi/data-model', label: 'Data Model' },
                        { href: '/wiki/dexpi/standards', label: 'Engineering Standards' },
                        { href: '/wiki/dexpi/xml-schema', label: 'XML Schema' },
                        { href: '/wiki/pipeline', label: 'AI Pipeline' },
                        { href: '/equipment', label: 'Equipment Library' },
                    ].map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-xs px-2.5 py-1 rounded-md border border-white/[0.06] text-gray-400 hover:text-[#FF6B00] hover:border-[#FF6B00]/20 transition-colors"
                        >
                            ← {link.label}
                        </a>
                    ))}
                </div>
            </section>
        </article>
    );
}