/**
 * SectorStepViewer — 4-step tabbed sector architecture viewer.
 *
 * Main container component that orchestrates the step-through experience
 * for each CISA sector. Renders 4 tabs:
 *   1. Architecture Vision (TOGAF Phase A–B)
 *   2. Reference Architecture (TOGAF Phase C–D)
 *   3. Sub-Sectors & Assets (interactive grid)
 *   4. Facility Builder (drag-and-drop playground)
 *
 * Tabs 1–2 use a 3-column layout matching the acquisitions page pattern.
 * Tabs 3–4 use full-width interactive layouts (Option B: Progressive Complexity).
 *
 * @module components/wiki/SectorStepViewer
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectorStepBar, { type StepDefinition } from './SectorStepBar';
import SubSectorGrid from './SubSectorGrid';
import FacilityCanvas from './FacilityCanvas';

/* ─── Types ────────────────────────────────────────────────────────────────── */

/** Architecture Vision tab content (Tab 1). */
export interface ArchitectureVisionContent {
    /** Sector profile items (left column). */
    profile: { label: string; value: string }[];
    /** Business architecture items (center column). */
    businessArchitecture: { title: string; body: string }[];
    /** OXOT threat intelligence items (right column). */
    threatLandscape: {
        headline: string;
        items: string[];
        bottomLine: string;
    };
}

/** Reference Architecture tab content (Tab 2). */
export interface ReferenceArchitectureContent {
    /** Information systems items (left column). */
    informationSystems: { title: string; body: string }[];
    /** Technology architecture items (center column). */
    technologyArchitecture: { title: string; body: string }[];
    /** OXOT engineering value (right column). */
    engineeringValue: {
        headline: string;
        items: string[];
        bottomLine: string;
    };
}

/** Sub-sector definition for Tabs 3 and 4. */
interface SubSectorData {
    code: string;
    name: string;
    description: string;
    facilities: {
        code: string;
        name: string;
        description: string;
        equipment: {
            componentClass: string;
            displayName: string;
            category: string;
            typicalQuantity: { min: number; max: number };
        }[];
    }[];
}

/** Full sector data for the step viewer. */
export interface SectorStepData {
    /** Sector name. */
    name: string;
    /** Sector code (e.g., 'ENER'). */
    code: string;
    /** Sector accent color. */
    color: string;
    /** SRMA agency. */
    srma: string;
    /** Tab 1 content. */
    architectureVision: ArchitectureVisionContent;
    /** Tab 2 content. */
    referenceArchitecture: ReferenceArchitectureContent;
    /** Sub-sectors data (used by Tabs 3 and 4). */
    subSectors: SubSectorData[];
}

/* ─── Step Definitions ─────────────────────────────────────────────────────── */

const STEPS: StepDefinition[] = [
    { icon: '🏛️', title: 'Architecture Vision', subtitle: 'TOGAF Phase A–B' },
    { icon: '⚙️', title: 'Reference Architecture', subtitle: 'TOGAF Phase C–D' },
    { icon: '📋', title: 'Sub-Sectors & Assets', subtitle: 'Operational Inventory' },
    { icon: '🔧', title: 'Facility Builder', subtitle: 'Interactive Lab' },
];

/* ─── Component ────────────────────────────────────────────────────────────── */

interface SectorStepViewerProps {
    /** Complete sector data for populating all 4 tabs. */
    data: SectorStepData;
}

/**
 * 4-step tabbed sector architecture viewer.
 *
 * Renders an interactive step-through experience for exploring a CISA sector's
 * architecture, technology stack, assets, and facility blueprints.
 *
 * @param props - SectorStepViewerProps
 * @returns Full-featured step viewer component.
 */
export default function SectorStepViewer({ data }: SectorStepViewerProps) {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <div className="space-y-6">
            {/* Step header */}
            <div className="space-y-1">
                <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">
                    {data.code} · {data.srma}
                </span>
                <h2 className="text-2xl font-heading font-bold text-white">
                    The Anatomy of{' '}
                    <span style={{ color: data.color }}>{data.name}</span>
                </h2>
                <p className="text-sm text-gray-400 max-w-2xl">
                    Explore the {data.name} sector through four progressive layers — from strategic
                    architecture vision to hands-on facility engineering.
                </p>
            </div>

            {/* Step bar */}
            <SectorStepBar
                steps={STEPS}
                activeStep={activeStep}
                onStepChange={setActiveStep}
                accentColor={data.color}
            />

            {/* Content area */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                >
                    {/* Step content header */}
                    <div
                        className="rounded-t-xl border border-b-0 border-white/[0.06] px-6 py-5 flex items-center justify-between"
                        style={{ background: `${data.color}08` }}
                    >
                        <div className="flex items-center gap-4">
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                                style={{ background: `${data.color}20` }}
                            >
                                {STEPS[activeStep].icon}
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white">
                                    {activeStep + 1}. {STEPS[activeStep].title}
                                </h3>
                                <p className="text-xs text-gray-500">{STEPS[activeStep].subtitle}</p>
                            </div>
                        </div>
                    </div>

                    {/* Step content body */}
                    <div
                        className="rounded-b-xl border border-white/[0.06] p-6"
                        style={{ background: 'rgba(255,255,255,0.015)' }}
                    >
                        {activeStep === 0 && (
                            <TabArchitectureVision
                                content={data.architectureVision}
                                accentColor={data.color}
                            />
                        )}
                        {activeStep === 1 && (
                            <TabReferenceArchitecture
                                content={data.referenceArchitecture}
                                accentColor={data.color}
                            />
                        )}
                        {activeStep === 2 && (
                            <SubSectorGrid
                                subSectors={data.subSectors}
                                accentColor={data.color}
                            />
                        )}
                        {activeStep === 3 && (
                            <FacilityCanvas
                                subSectors={data.subSectors}
                                accentColor={data.color}
                            />
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

/* ─── Tab 1: Architecture Vision (3-column) ──────────────────────────────── */

/**
 * Renders the Architecture Vision tab with 3-column layout.
 *
 * @param props - Content and accent color.
 * @returns 3-column layout for TOGAF Phase A–B.
 */
function TabArchitectureVision({
    content,
    accentColor,
}: {
    content: ArchitectureVisionContent;
    accentColor: string;
}) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column: Sector Profile */}
            <div className="space-y-4">
                <h4 className="text-[10px] font-mono font-semibold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                    <span>📊</span> Sector Profile
                </h4>
                <div className="space-y-3">
                    {content.profile.map((item, i) => (
                        <div
                            key={i}
                            className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3"
                        >
                            <span className="text-[10px] text-gray-600 block mb-0.5">{item.label}</span>
                            <span className="text-sm text-gray-300">{item.value}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Center column: Business Architecture */}
            <div className="space-y-4">
                <h4 className="text-[10px] font-mono font-semibold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                    <span>📄</span> Business Architecture
                </h4>
                <div className="space-y-3">
                    {content.businessArchitecture.map((item, i) => (
                        <div
                            key={i}
                            className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3"
                        >
                            <h5 className="text-xs font-semibold text-white mb-1">{item.title}</h5>
                            <p className="text-[11px] text-gray-400 leading-relaxed">{item.body}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right column: OXOT Intelligence */}
            <div className="space-y-4">
                <h4 className="text-[10px] font-mono font-semibold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                    <span>🔶</span> OXOT Intelligence
                </h4>
                <div
                    className="rounded-xl border p-4 space-y-3"
                    style={{
                        borderColor: `${accentColor}40`,
                        background: `${accentColor}08`,
                    }}
                >
                    <h5
                        className="text-xs font-semibold uppercase tracking-wider"
                        style={{ color: accentColor }}
                    >
                        ⚠ {content.threatLandscape.headline}
                    </h5>
                    <ul className="space-y-1.5">
                        {content.threatLandscape.items.map((item, i) => (
                            <li key={i} className="text-[11px] text-gray-300 flex items-start gap-2">
                                <span className="text-gray-600 mt-0.5">•</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                    <div
                        className="text-xs font-semibold pt-2 border-t"
                        style={{ borderColor: `${accentColor}30`, color: accentColor }}
                    >
                        {content.threatLandscape.bottomLine}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─── Tab 2: Reference Architecture (3-column) ──────────────────────────── */

/**
 * Renders the Reference Architecture tab with 3-column layout.
 *
 * @param props - Content and accent color.
 * @returns 3-column layout for TOGAF Phase C–D.
 */
function TabReferenceArchitecture({
    content,
    accentColor,
}: {
    content: ReferenceArchitectureContent;
    accentColor: string;
}) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column: Information Systems */}
            <div className="space-y-4">
                <h4 className="text-[10px] font-mono font-semibold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                    <span>🔗</span> Information Systems
                </h4>
                <div className="space-y-3">
                    {content.informationSystems.map((item, i) => (
                        <div
                            key={i}
                            className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3"
                        >
                            <h5 className="text-xs font-semibold text-white mb-1">{item.title}</h5>
                            <p className="text-[11px] text-gray-400 leading-relaxed">{item.body}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Center column: Technology Architecture */}
            <div className="space-y-4">
                <h4 className="text-[10px] font-mono font-semibold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                    <span>🛠️</span> Technology Architecture
                </h4>
                <div className="space-y-3">
                    {content.technologyArchitecture.map((item, i) => (
                        <div
                            key={i}
                            className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3"
                        >
                            <h5 className="text-xs font-semibold text-white mb-1">{item.title}</h5>
                            <p className="text-[11px] text-gray-400 leading-relaxed">{item.body}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right column: OXOT Engineering */}
            <div className="space-y-4">
                <h4 className="text-[10px] font-mono font-semibold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                    <span>🔶</span> OXOT Engineering
                </h4>
                <div
                    className="rounded-xl border p-4 space-y-3"
                    style={{
                        borderColor: `${accentColor}40`,
                        background: `${accentColor}08`,
                    }}
                >
                    <h5
                        className="text-xs font-semibold uppercase tracking-wider"
                        style={{ color: accentColor }}
                    >
                        🎯 {content.engineeringValue.headline}
                    </h5>
                    <ul className="space-y-1.5">
                        {content.engineeringValue.items.map((item, i) => (
                            <li key={i} className="text-[11px] text-gray-300 flex items-start gap-2">
                                <span className="text-gray-600 mt-0.5">•</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                    <div
                        className="text-xs font-semibold pt-2 border-t"
                        style={{ borderColor: `${accentColor}30`, color: accentColor }}
                    >
                        {content.engineeringValue.bottomLine}
                    </div>
                </div>
            </div>
        </div>
    );
}
