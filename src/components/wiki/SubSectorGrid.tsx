/**
 * SubSectorGrid — Expandable sub-sector card grid.
 *
 * Displays sub-sectors as interactive cards in a responsive grid.
 * Clicking a card expands it to reveal facility types and equipment
 * catalogs. Used in Tab 3 of the SectorStepViewer.
 *
 * @module components/wiki/SubSectorGrid
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EquipmentCard from './EquipmentCard';

/** Equipment type definition. */
interface Equipment {
    componentClass: string;
    displayName: string;
    category: string;
    typicalQuantity: { min: number; max: number };
}

/** Facility type definition. */
interface Facility {
    code: string;
    name: string;
    description: string;
    equipment: Equipment[];
}

/** Sub-sector definition. */
interface SubSector {
    code: string;
    name: string;
    description: string;
    facilities: Facility[];
}

interface SubSectorGridProps {
    /** Array of sub-sectors to display. */
    subSectors: SubSector[];
    /** Sector accent color. */
    accentColor?: string;
}

/**
 * Expandable grid of sub-sector cards with nested facility and equipment views.
 *
 * @param props - SubSectorGridProps
 * @returns Interactive grid component for exploring sector assets.
 */
export default function SubSectorGrid({
    subSectors,
    accentColor = '#FF6B00',
}: SubSectorGridProps) {
    const [expandedCode, setExpandedCode] = useState<string | null>(null);
    const [selectedFacility, setSelectedFacility] = useState<string | null>(null);

    const expandedSubSector = subSectors.find(s => s.code === expandedCode);
    const selectedFac = expandedSubSector?.facilities.find(f => f.code === selectedFacility);

    /**
     * Computes total equipment count across all facilities in a sub-sector.
     *
     * @param sub - The sub-sector to count equipment for.
     * @returns Total unique equipment types.
     */
    const countEquipment = (sub: SubSector): number =>
        sub.facilities.reduce((acc, f) => acc + f.equipment.length, 0);

    return (
        <div className="space-y-4">
            {/* Sub-sector cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {subSectors.map(sub => {
                    const isExpanded = expandedCode === sub.code;
                    return (
                        <button
                            key={sub.code}
                            onClick={() => {
                                setExpandedCode(isExpanded ? null : sub.code);
                                setSelectedFacility(null);
                            }}
                            className={`
                                text-left p-4 rounded-xl border transition-all duration-300
                                ${isExpanded
                                    ? 'border-[var(--accent)] bg-[var(--accent)]/[0.08]'
                                    : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1]'
                                }
                            `}
                            style={{ '--accent': accentColor } as React.CSSProperties}
                        >
                            <h4 className={`text-sm font-semibold mb-1 ${isExpanded ? 'text-white' : 'text-gray-300'}`}>
                                {sub.name}
                            </h4>
                            <p className="text-[10px] text-gray-500 line-clamp-2 mb-2">{sub.description}</p>
                            <div className="flex gap-3 text-[10px] font-mono text-gray-600">
                                <span>{sub.facilities.length} facilities</span>
                                <span>{countEquipment(sub)} equipment</span>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Expanded detail panel */}
            <AnimatePresence mode="wait">
                {expandedSubSector && (
                    <motion.div
                        key={expandedSubSector.code}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div
                            className="rounded-xl border p-6 space-y-5"
                            style={{
                                borderColor: `${accentColor}30`,
                                background: `${accentColor}05`,
                            }}
                        >
                            {/* Sub-sector header */}
                            <div>
                                <h3 className="text-lg font-semibold text-white">{expandedSubSector.name}</h3>
                                <p className="text-sm text-gray-400 mt-1">{expandedSubSector.description}</p>
                            </div>

                            {/* Facility cards */}
                            <div>
                                <h4 className="text-[10px] font-mono font-semibold uppercase tracking-widest text-gray-500 mb-3">
                                    Facility Types
                                </h4>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                    {expandedSubSector.facilities.map(fac => (
                                        <button
                                            key={fac.code}
                                            onClick={() => setSelectedFacility(
                                                selectedFacility === fac.code ? null : fac.code
                                            )}
                                            className={`
                                                text-left p-3 rounded-lg border text-xs transition-all
                                                ${selectedFacility === fac.code
                                                    ? 'border-white/20 bg-white/[0.06] text-white'
                                                    : 'border-white/[0.06] bg-white/[0.02] text-gray-400 hover:text-gray-200'
                                                }
                                            `}
                                        >
                                            <span className="font-medium block truncate">{fac.name}</span>
                                            <span className="text-[10px] text-gray-600 font-mono">
                                                {fac.equipment.length} types
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Equipment catalog for selected facility */}
                            <AnimatePresence mode="wait">
                                {selectedFac && (
                                    <motion.div
                                        key={selectedFac.code}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <h4 className="text-[10px] font-mono font-semibold uppercase tracking-widest text-gray-500 mb-3">
                                            Equipment — {selectedFac.name}
                                        </h4>
                                        <p className="text-xs text-gray-500 mb-3">{selectedFac.description}</p>
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                            {selectedFac.equipment.map(eq => (
                                                <EquipmentCard
                                                    key={eq.componentClass}
                                                    componentClass={eq.componentClass}
                                                    displayName={eq.displayName}
                                                    category={eq.category}
                                                    typicalQuantity={eq.typicalQuantity}
                                                />
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
