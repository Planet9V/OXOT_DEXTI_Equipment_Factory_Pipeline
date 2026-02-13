/**
 * EquipmentCard — DEXPI 2.0 equipment card component.
 *
 * Displays a single equipment type with its DEXPI classification,
 * category color coding, and optional HTML5 drag-and-drop support.
 *
 * @module components/wiki/EquipmentCard
 */

'use client';

import React, { useCallback } from 'react';

/** Category icons and colors for visual classification. */
const CATEGORY_STYLES: Record<string, { icon: string; color: string }> = {
    rotating: { icon: '🔄', color: '#3B82F6' },
    static: { icon: '🏗️', color: '#6B7280' },
    'heat-transfer': { icon: '🔥', color: '#EF4444' },
    instrumentation: { icon: '📡', color: '#8B5CF6' },
    electrical: { icon: '⚡', color: '#F59E0B' },
    piping: { icon: '🔗', color: '#10B981' },
};

interface EquipmentCardProps {
    /** DEXPI component class name. */
    componentClass: string;
    /** Human-readable display name. */
    displayName: string;
    /** Equipment category (rotating, static, etc.). */
    category: string;
    /** Typical quantity range in facility. */
    typicalQuantity?: { min: number; max: number };
    /** Whether the card should be draggable. */
    draggable?: boolean;
    /** Compact mode for sidebar display. */
    compact?: boolean;
}

/**
 * DEXPI 2.0 equipment card with drag-and-drop support.
 *
 * @param props - EquipmentCardProps
 * @returns Styled card element representing a DEXPI equipment type.
 */
export default function EquipmentCard({
    componentClass,
    displayName,
    category,
    typicalQuantity,
    draggable = false,
    compact = false,
}: EquipmentCardProps) {
    const style = CATEGORY_STYLES[category] || { icon: '📦', color: '#6B7280' };

    const handleDragStart = useCallback(
        (e: React.DragEvent) => {
            e.dataTransfer.setData(
                'application/json',
                JSON.stringify({ componentClass, displayName, category })
            );
            e.dataTransfer.effectAllowed = 'copy';
        },
        [componentClass, displayName, category]
    );

    if (compact) {
        return (
            <div
                draggable={draggable}
                onDragStart={draggable ? handleDragStart : undefined}
                className={`
                    flex items-center gap-2 px-3 py-2 rounded-lg
                    border border-white/[0.06] bg-white/[0.02]
                    hover:bg-white/[0.05] hover:border-white/[0.1]
                    transition-all duration-200 group
                    ${draggable ? 'cursor-grab active:cursor-grabbing' : ''}
                `}
            >
                <span className="text-sm">{style.icon}</span>
                <span className="text-xs text-gray-300 truncate flex-1">{displayName}</span>
                {draggable && (
                    <span className="text-[10px] text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        drag
                    </span>
                )}
            </div>
        );
    }

    return (
        <div
            draggable={draggable}
            onDragStart={draggable ? handleDragStart : undefined}
            className={`
                rounded-xl border border-white/[0.06] p-4
                bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1]
                transition-all duration-300 group
                ${draggable ? 'cursor-grab active:cursor-grabbing' : ''}
            `}
        >
            <div className="flex items-start justify-between mb-2">
                <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                    style={{ background: `${style.color}20` }}
                >
                    {style.icon}
                </div>
                <span
                    className="text-[10px] font-mono px-1.5 py-0.5 rounded border"
                    style={{ borderColor: `${style.color}30`, color: style.color }}
                >
                    {category}
                </span>
            </div>
            <h4 className="text-sm font-semibold text-white mb-0.5">{displayName}</h4>
            <p className="text-[10px] font-mono text-gray-500">{componentClass}</p>
            {typicalQuantity && (
                <p className="text-[10px] text-gray-600 mt-1">
                    Qty: {typicalQuantity.min}–{typicalQuantity.max} per facility
                </p>
            )}
        </div>
    );
}
