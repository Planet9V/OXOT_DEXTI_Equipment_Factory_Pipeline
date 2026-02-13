/**
 * SectorStepBar — Horizontal step navigation bar.
 *
 * Replicates the acquisitions page step-through pattern:
 * 4 clickable buttons with icon, title, subtitle, and active/completed states.
 *
 * @module components/wiki/SectorStepBar
 */

'use client';

import { motion } from 'framer-motion';

/** Step definition for the navigation bar. */
export interface StepDefinition {
    /** Step icon (emoji or icon component). */
    icon: string;
    /** Step title. */
    title: string;
    /** Subtitle shown below the title. */
    subtitle: string;
}

interface SectorStepBarProps {
    /** Array of exactly 4 step definitions. */
    steps: StepDefinition[];
    /** Currently active step index (0-based). */
    activeStep: number;
    /** Callback when a step is clicked. */
    onStepChange: (index: number) => void;
    /** Sector accent color (hex). */
    accentColor?: string;
}

/**
 * Horizontal 4-step navigation bar matching the acquisitions page pattern.
 *
 * @param props - SectorStepBarProps
 * @returns A horizontal bar of 4 clickable step buttons.
 */
export default function SectorStepBar({
    steps,
    activeStep,
    onStepChange,
    accentColor = '#FF6B00',
}: SectorStepBarProps) {
    return (
        <div className="grid grid-cols-4 gap-2">
            {steps.map((step, index) => {
                const isActive = index === activeStep;
                const isCompleted = index < activeStep;

                return (
                    <button
                        key={step.title}
                        onClick={() => onStepChange(index)}
                        className={`
                            relative flex items-center gap-3 px-4 py-4 rounded-xl
                            border transition-all duration-300 text-left
                            ${isActive
                                ? 'border-[var(--accent)] bg-[var(--accent)]/[0.08]'
                                : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1]'
                            }
                        `}
                        style={{
                            '--accent': accentColor,
                        } as React.CSSProperties}
                    >
                        {/* Active glow */}
                        {isActive && (
                            <motion.div
                                layoutId="step-active-glow"
                                className="absolute inset-0 rounded-xl pointer-events-none"
                                style={{
                                    boxShadow: `0 0 30px ${accentColor}15, inset 0 0 20px ${accentColor}08`,
                                }}
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            />
                        )}

                        {/* Icon */}
                        <div
                            className={`
                                w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0
                                transition-colors duration-300
                                ${isActive
                                    ? 'text-white'
                                    : isCompleted
                                        ? 'text-green-400'
                                        : 'text-gray-500'
                                }
                            `}
                            style={isActive ? {
                                background: `linear-gradient(135deg, ${accentColor}40, ${accentColor}20)`,
                            } : {
                                background: 'rgba(255,255,255,0.04)',
                            }}
                        >
                            {isCompleted ? '✓' : step.icon}
                        </div>

                        {/* Text */}
                        <div className="min-w-0">
                            <span
                                className={`
                                    text-sm font-semibold block truncate transition-colors
                                    ${isActive ? 'text-white' : 'text-gray-400'}
                                `}
                            >
                                {step.title}
                            </span>
                            <span
                                className={`
                                    text-[10px] font-mono block truncate transition-colors
                                    ${isActive ? '' : 'text-gray-600'}
                                `}
                                style={isActive ? { color: accentColor } : undefined}
                            >
                                {step.subtitle}
                            </span>
                        </div>
                    </button>
                );
            })}
        </div>
    );
}
