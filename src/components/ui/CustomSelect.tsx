'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Custom styled select dropdown matching the DEXTI glass-card design system.
 *
 * Replaces native `<select>` with a fully styled dropdown panel, keyboard
 * navigation, and smooth animations. Aligns with the dark glass theme.
 */

export interface SelectOption {
    value: string;
    label: string;
    icon?: string;
    sublabel?: string;
}

interface CustomSelectProps {
    /** Currently selected value */
    value: string;
    /** Callback when option is selected */
    onChange: (value: string) => void;
    /** Available options */
    options: SelectOption[];
    /** Placeholder text when no value selected */
    placeholder?: string;
    /** Label displayed above the select */
    label?: string;
    /** Disable the select */
    disabled?: boolean;
}

export default function CustomSelect({
    value,
    onChange,
    options,
    placeholder = 'Select...',
    label,
    disabled = false,
}: CustomSelectProps) {
    const [open, setOpen] = useState(false);
    const [focusIdx, setFocusIdx] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const selected = options.find(o => o.value === value);

    // Close on outside click
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    // Scroll focused item into view
    useEffect(() => {
        if (open && focusIdx >= 0 && listRef.current) {
            const items = listRef.current.querySelectorAll('[data-option]');
            items[focusIdx]?.scrollIntoView({ block: 'nearest' });
        }
    }, [focusIdx, open]);

    function handleKeyDown(e: React.KeyboardEvent) {
        if (disabled) return;

        if (!open && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown')) {
            e.preventDefault();
            setOpen(true);
            setFocusIdx(0);
            return;
        }

        if (!open) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setFocusIdx(prev => Math.min(prev + 1, options.length - 1));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setFocusIdx(prev => Math.max(prev - 1, 0));
                break;
            case 'Enter':
            case ' ':
                e.preventDefault();
                if (focusIdx >= 0 && focusIdx < options.length) {
                    onChange(options[focusIdx].value);
                    setOpen(false);
                }
                break;
            case 'Escape':
                e.preventDefault();
                setOpen(false);
                break;
        }
    }

    function selectOption(opt: SelectOption) {
        onChange(opt.value);
        setOpen(false);
    }

    return (
        <div ref={containerRef} className="relative">
            {label && (
                <label className="text-xs text-gray-400 mb-1.5 block font-medium tracking-wide uppercase">
                    {label}
                </label>
            )}
            <button
                type="button"
                disabled={disabled}
                onClick={() => !disabled && setOpen(!open)}
                onKeyDown={handleKeyDown}
                className={`
          w-full flex items-center justify-between gap-2 px-4 py-3 rounded-lg text-left
          transition-all duration-200 cursor-pointer
          ${disabled
                        ? 'opacity-40 cursor-not-allowed bg-white/[0.02] border border-white/[0.04]'
                        : open
                            ? 'bg-white/[0.06] border border-accent-500/50 shadow-[0_0_0_3px_rgba(255,107,0,0.1)]'
                            : 'bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] hover:border-white/[0.12]'
                    }
        `}
                role="combobox"
                aria-expanded={open}
                aria-haspopup="listbox"
            >
                {selected ? (
                    <span className="flex items-center gap-2 text-gray-100 truncate">
                        {selected.icon && <span className="text-base">{selected.icon}</span>}
                        <span className="truncate">{selected.label}</span>
                    </span>
                ) : (
                    <span className="text-gray-500">{placeholder}</span>
                )}
                <svg
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 flex-shrink-0 ${open ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            <AnimatePresence>
                {open && options.length > 0 && (
                    <motion.div
                        ref={listRef}
                        role="listbox"
                        initial={{ opacity: 0, y: -4, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.98 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="
              absolute z-50 w-full mt-1.5 py-1.5 rounded-xl overflow-hidden
              max-h-64 overflow-y-auto
              border border-white/[0.1]
              shadow-[0_16px_48px_rgba(0,0,0,0.6)]
            "
                        style={{
                            background: 'rgba(15, 17, 23, 0.98)',
                            backdropFilter: 'blur(24px)',
                            WebkitBackdropFilter: 'blur(24px)',
                        }}
                    >
                        {options.map((opt, i) => {
                            const isSelected = opt.value === value;
                            const isFocused = i === focusIdx;

                            return (
                                <div
                                    key={opt.value}
                                    data-option
                                    role="option"
                                    aria-selected={isSelected}
                                    onClick={() => selectOption(opt)}
                                    onMouseEnter={() => setFocusIdx(i)}
                                    className={`
                    flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors duration-100
                    ${isSelected
                                            ? 'bg-accent-500/10 text-accent-500'
                                            : isFocused
                                                ? 'bg-white/[0.06] text-white'
                                                : 'text-gray-300 hover:bg-white/[0.04]'
                                        }
                  `}
                                >
                                    {opt.icon && <span className="text-base flex-shrink-0">{opt.icon}</span>}
                                    <div className="min-w-0 flex-1">
                                        <div className={`truncate text-sm ${isSelected ? 'font-medium' : ''}`}>{opt.label}</div>
                                        {opt.sublabel && (
                                            <div className="text-[11px] text-gray-500 truncate mt-0.5">{opt.sublabel}</div>
                                        )}
                                    </div>
                                    {isSelected && (
                                        <svg className="w-4 h-4 text-accent-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
