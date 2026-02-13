/**
 * FacilityCanvas — P&ID playground canvas with drag-and-drop.
 *
 * Displays a programmatically generated SVG schematic of a selected
 * facility type, showing equipment placement and flow connections.
 * Includes a sidebar equipment library with HTML5 DnD for building
 * custom facility layouts.
 *
 * @module components/wiki/FacilityCanvas
 */

'use client';

import { useState, useCallback, useRef } from 'react';
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

/** Sub-sector with facilities. */
interface SubSector {
    code: string;
    name: string;
    description: string;
    facilities: Facility[];
}

/** Dropped equipment on canvas. */
interface CanvasItem {
    id: string;
    componentClass: string;
    displayName: string;
    category: string;
    x: number;
    y: number;
}

/** Category colors for SVG rendering. */
const CATEGORY_COLORS: Record<string, string> = {
    rotating: '#3B82F6',
    static: '#6B7280',
    'heat-transfer': '#EF4444',
    instrumentation: '#8B5CF6',
    electrical: '#F59E0B',
    piping: '#10B981',
};

interface FacilityCanvasProps {
    /** All sub-sectors with their facilities. */
    subSectors: SubSector[];
    /** Sector accent color. */
    accentColor?: string;
}

/**
 * Interactive facility P&ID playground with equipment library and canvas.
 *
 * @param props - FacilityCanvasProps
 * @returns Split-layout component with equipment sidebar and SVG canvas.
 */
export default function FacilityCanvas({
    subSectors,
    accentColor = '#FF6B00',
}: FacilityCanvasProps) {
    const allFacilities = subSectors.flatMap(s => s.facilities);
    const [selectedFacilityCode, setSelectedFacilityCode] = useState<string>(
        allFacilities[0]?.code || ''
    );
    const [canvasItems, setCanvasItems] = useState<CanvasItem[]>([]);
    const [libraryFilter, setLibraryFilter] = useState<string>('all');
    const canvasRef = useRef<HTMLDivElement>(null);

    const selectedFacility = allFacilities.find(f => f.code === selectedFacilityCode);

    /**
     * Handles dropping an equipment item onto the canvas.
     *
     * @param e - The drag event.
     */
    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        try {
            const data = JSON.parse(e.dataTransfer.getData('application/json'));
            const rect = canvasRef.current?.getBoundingClientRect();
            if (!rect) return;

            const item: CanvasItem = {
                id: `${data.componentClass}-${Date.now()}`,
                componentClass: data.componentClass,
                displayName: data.displayName,
                category: data.category,
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
            setCanvasItems(prev => [...prev, item]);
        } catch {
            // Invalid drag data — ignore
        }
    }, []);

    /**
     * Allows drag over the canvas drop zone.
     *
     * @param e - The drag event.
     */
    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    }, []);

    /**
     * Resets the canvas and clears all dropped items.
     */
    const handleReset = () => setCanvasItems([]);

    /** All unique equipment across all facilities for the library. */
    const allEquipment = selectedFacility?.equipment || [];
    const categories = ['all', ...Array.from(new Set(allEquipment.map(e => e.category)))];
    const filteredEquipment = libraryFilter === 'all'
        ? allEquipment
        : allEquipment.filter(e => e.category === libraryFilter);

    return (
        <div className="space-y-4">
            {/* Facility selector bar */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {allFacilities.slice(0, 12).map(fac => (
                    <button
                        key={fac.code}
                        onClick={() => {
                            setSelectedFacilityCode(fac.code);
                            setCanvasItems([]);
                        }}
                        className={`
                            whitespace-nowrap px-3 py-2 rounded-lg border text-xs font-medium
                            transition-all flex-shrink-0
                            ${fac.code === selectedFacilityCode
                                ? 'border-white/20 bg-white/[0.08] text-white'
                                : 'border-white/[0.06] bg-white/[0.02] text-gray-500 hover:text-gray-300'
                            }
                        `}
                    >
                        {fac.name}
                    </button>
                ))}
            </div>

            {/* Facility description */}
            {selectedFacility && (
                <p className="text-xs text-gray-500 leading-relaxed">{selectedFacility.description}</p>
            )}

            {/* Split layout: Library + Canvas */}
            <div className="flex gap-4" style={{ minHeight: 480 }}>
                {/* Equipment library sidebar */}
                <div
                    className="w-64 flex-shrink-0 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 space-y-3 overflow-y-auto"
                    style={{ maxHeight: 480 }}
                >
                    <div className="flex items-center justify-between">
                        <h4
                            className="text-[10px] font-mono font-semibold uppercase tracking-widest"
                            style={{ color: accentColor }}
                        >
                            DEXPI 2.0 Library
                        </h4>
                        <span className="text-[10px] text-gray-600 font-mono">
                            {filteredEquipment.length} items
                        </span>
                    </div>

                    {/* Category tabs */}
                    <div className="flex flex-wrap gap-1">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setLibraryFilter(cat)}
                                className={`
                                    text-[10px] px-2 py-1 rounded-full border transition-all capitalize
                                    ${libraryFilter === cat
                                        ? 'border-white/20 bg-white/[0.08] text-white font-medium'
                                        : 'border-white/[0.06] text-gray-600 hover:text-gray-400'
                                    }
                                `}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Equipment cards */}
                    <div className="space-y-1.5">
                        {filteredEquipment.map(eq => (
                            <EquipmentCard
                                key={eq.componentClass}
                                componentClass={eq.componentClass}
                                displayName={eq.displayName}
                                category={eq.category}
                                draggable
                                compact
                            />
                        ))}
                    </div>
                </div>

                {/* Canvas area */}
                <div className="flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="text-[10px] font-mono font-semibold uppercase tracking-widest text-gray-500">
                            P&ID Playground
                        </h4>
                        <div className="flex gap-2">
                            <span className="text-[10px] text-gray-600 font-mono">
                                {canvasItems.length} placed
                            </span>
                            <button
                                onClick={handleReset}
                                className="text-[10px] text-gray-500 hover:text-gray-300 font-mono transition-colors"
                            >
                                Reset
                            </button>
                        </div>
                    </div>

                    <div
                        ref={canvasRef}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        className="flex-1 rounded-xl border border-dashed border-white/[0.08] bg-black/40 relative overflow-hidden"
                        style={{ minHeight: 400 }}
                    >
                        {/* Grid background */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                            <defs>
                                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.3" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#grid)" />
                        </svg>

                        {/* Placed items */}
                        <AnimatePresence>
                            {canvasItems.map(item => (
                                <motion.div
                                    key={item.id}
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    className="absolute"
                                    style={{ left: item.x - 40, top: item.y - 20 }}
                                >
                                    <div
                                        className="px-3 py-2 rounded-lg border text-[10px] font-mono whitespace-nowrap select-none"
                                        style={{
                                            borderColor: CATEGORY_COLORS[item.category] || '#6B7280',
                                            background: `${CATEGORY_COLORS[item.category] || '#6B7280'}15`,
                                            color: CATEGORY_COLORS[item.category] || '#6B7280',
                                        }}
                                    >
                                        {item.displayName}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {/* Empty state */}
                        {canvasItems.length === 0 && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <p className="text-gray-600 text-sm mb-1">Drag equipment from the library</p>
                                    <p className="text-gray-700 text-xs">Build your facility layout</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
