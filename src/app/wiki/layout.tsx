/**
 * Wiki Layout.
 *
 * Provides a shared layout for all wiki pages, including a collapsible sidebar
 * with sector-grouped navigation, breadcrumb navigation, and backlinks panel.
 * Uses Radix Collapsible + Framer Motion for smooth, accessible expand/collapse.
 *
 * @module wiki/layout
 */

'use client';

import { useState, useMemo, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import * as Collapsible from '@radix-ui/react-collapsible';
import { ChevronDown, Home, Search, BookOpen, Database, Activity, Terminal } from 'lucide-react';
import { SECTORS } from '@/lib/sectors';
import ExportToObsidian from '@/components/wiki/ExportToObsidian';

/** Simple Typewriter Effect for Subtitle */
const TypewriterSubtitle = ({ text }: { text: string }) => {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayText(prev => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(timer);
            }
        }, 50);
        return () => clearInterval(timer);
    }, [text]);

    return (
        <span className="text-[9px] text-gray-500 font-mono tracking-widest uppercase truncate">
            {displayText}<span className="animate-pulse text-oxot-orange">_</span>
        </span>
    );
};

/* ─── Navigation Data ──────────────────────────────────────────────────────── */

/** Non-collapsible top-level nav groups (always visible). */
const WIKI_NAV_FIXED = [
    {
        title: 'Platform',
        links: [
            { href: '/wiki', label: 'Wiki Home', icon: Home },
            { href: '/wiki/dexpi', label: 'DEXPI 2.0 Standard', icon: BookOpen },
            { href: '/wiki/pipeline', label: 'AI Pipeline', icon: Activity },
            { href: '/wiki/neo4j', label: 'Neo4j Graph', icon: Database },
        ],
    },
];

/** Collapsible sector deep-dive groups generated from Data Source. */
const SECTOR_NAV_GROUPS = SECTORS.map(sector => ({
    title: `${sector.name} Sector`,
    pathPrefix: `/wiki/sectors/${sector.code}`,
    slugPrefix: sector.slug ? `/wiki/${sector.slug}` : undefined,
    links: [
        ...(sector.slug ? [{
            href: `/wiki/${sector.slug}`,
            label: '📄 Reference Architecture'
        }] : []),
        {
            href: `/wiki/sectors/${sector.code}`,
            label: 'Sector Hub'
        },
        ...sector.subSectors.map(sub => ({
            href: `/wiki/sectors/${sector.code}#${sub.code}`,
            label: sub.name
        }))
    ]
}));

/* ─── Breadcrumb Label Map ─────────────────────────────────────────────────── */

/** Friendly labels for known path segments. */
const BREADCRUMB_LABELS: Record<string, string> = {
    wiki: 'Wiki',
    energy: 'Energy',
    nuclear: 'Nuclear',
    chemical: 'Chemical',
    transportation: 'Transportation',
    'food-agriculture': 'Food & Ag',
    'critical-manufacturing': 'Critical Mfg',
    communications: 'Comms',
    'commercial-facilities': 'Commercial',
    water: 'Water',
    'information-technology': 'IT',
    healthcare: 'Healthcare',
    dexpi: 'DEXPI',
    neo4j: 'Neo4j',
    pipeline: 'Pipeline',
    defense: 'Defense',
    'financial-services': 'Financial Services',
    'emergency-services': 'Emergency Services',
    dams: 'Dams',
    'hydroelectric-dam': 'Hydroelectric Dam',
    'levee-system': 'Levee System',
    'navigation-lock': 'Navigation Lock',
    'irrigation-diversion': 'Irrigation Diversion',
    'tailings-facility': 'Tailings Facility',
};

/* ─── Collapsible Section Component ────────────────────────────────────────── */

/**
 * A collapsible sidebar group styled to match OXOT Public (NIS2).
 *
 * @param title - Section header text
 * @param links - Array of nav links
 * @param pathPrefix - Prefix to check active state
 */
function CollapsibleSectorGroup({
    title,
    links,
    pathPrefix,
    pathname,
    isActive,
}: {
    title: string;
    links: { href: string; label: string }[];
    pathPrefix: string;
    pathname: string;
    isActive: boolean;
}) {
    const [isOpen, setIsOpen] = useState(isActive);

    // Removed auto-expand useEffect to allowing manual collapsing


    return (
        <Collapsible.Root open={isOpen} onOpenChange={setIsOpen} className="border-b border-white/[0.04]">
            <Collapsible.Trigger
                className="flex items-center gap-2 w-full px-4 py-3 text-left
                           hover:bg-white/[0.02] transition-colors duration-150 group"
            >
                <span className={`text-[10px] font-mono uppercase tracking-wider flex-1 transition-colors ${isActive ? 'text-oxot-orange font-bold' : 'text-gray-500 group-hover:text-gray-300'
                    }`}>
                    {title}
                </span>
                <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${isActive ? 'text-oxot-orange' : 'text-gray-600 group-hover:text-gray-400'
                        }`}
                />
            </Collapsible.Trigger>

            <Collapsible.Content forceMount asChild>
                <AnimatePresence initial={false}>
                    {isOpen && (
                        <motion.div
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden bg-black/20"
                        >
                            <ul className="pb-2">
                                {links.map((link) => {
                                    const linkIsActive = pathname === link.href;
                                    return (
                                        <li key={link.href}>
                                            <a
                                                href={link.href}
                                                className={`block pl-4 pr-3 py-1.5 text-[12px] transition-all duration-150 border-l-[3px] ${linkIsActive
                                                    ? 'border-oxot-orange bg-oxot-orange/10 text-white font-medium'
                                                    : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-700'
                                                    }`}
                                            >
                                                {link.label}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Collapsible.Content>
        </Collapsible.Root>
    );
}

/* ─── Layout Component ─────────────────────────────────────────────────────── */

export default function WikiLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const breadcrumbs = useMemo(() =>
        pathname
            .split('/')
            .filter(Boolean)
            .map((seg, i, arr) => ({
                label: BREADCRUMB_LABELS[seg]
                    || seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, ' '),
                href: '/' + arr.slice(0, i + 1).join('/'),
                active: i === arr.length - 1,
            })),
        [pathname]
    );

    return (
        <div className="max-w-[1920px] mx-auto flex min-h-screen bg-oxot-bg-primary text-gray-300">
            {/* ── Sidebar ──────────────────────────────────────────────── */}
            <aside className="w-64 flex-shrink-0 border-r border-white/[0.08] bg-oxot-bg-secondary sticky top-0 h-screen overflow-y-auto hidden lg:flex flex-col z-20">
                {/* Wiki Header Removed: Using Root Layout Branding */}


                <div className="flex-1 py-4 space-y-6">
                    {/* Fixed Nav */}
                    <div>
                        <div className="px-4 mb-2">
                            <h3 className="text-[10px] font-mono font-semibold uppercase tracking-widest text-gray-600">
                                Platform
                            </h3>
                        </div>
                        <ul className="space-y-0.5">
                            {WIKI_NAV_FIXED[0].links.map((link) => {
                                const isActive = pathname === link.href;
                                const Icon = link.icon;
                                return (
                                    <li key={link.href}>
                                        <a
                                            href={link.href}
                                            className={`flex items-center gap-3 px-4 py-2 text-[13px] border-l-[3px] transition-all duration-150 ${isActive
                                                ? 'border-oxot-orange bg-oxot-orange/10 text-white font-medium'
                                                : 'border-transparent text-gray-400 hover:text-white hover:bg-white/[0.03]'
                                                }`}
                                        >
                                            <Icon className={`w-4 h-4 ${isActive ? 'text-oxot-orange' : 'text-gray-500'}`} />
                                            {link.label}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Sector Navigation (Collapsible) */}
                    <div>
                        <div className="px-4 mb-2 flex items-center gap-2">
                            <h3 className="text-[10px] font-mono font-semibold uppercase tracking-widest text-gray-600">
                                Sectors
                            </h3>
                            <div className="h-px flex-1 bg-white/[0.06]" />
                        </div>
                        <div className="space-y-0">
                            {SECTOR_NAV_GROUPS.map((group) => (
                                <CollapsibleSectorGroup
                                    key={group.title}
                                    title={group.title}
                                    links={group.links}
                                    pathPrefix={group.pathPrefix}
                                    pathname={pathname}
                                    isActive={pathname.startsWith(group.pathPrefix) || (!!group.slugPrefix && pathname.startsWith(group.slugPrefix))}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </aside>

            {/* ── Main wiki content area ────────────────────────────────── */}
            <div className="flex-1 min-w-0 flex flex-col">
                {/* Breadcrumbs / Header */}
                <div className="h-16 border-b border-white/[0.08] bg-oxot-bg-primary/80 backdrop-blur-md sticky top-0 z-10 px-6 lg:px-8 flex items-center justify-between">
                    <nav className="flex items-center gap-2 text-sm overflow-hidden whitespace-nowrap mask-linear-fade">
                        <Terminal className="w-4 h-4 text-oxot-orange/80 mr-1" />
                        <a href="/wiki" className="text-gray-500 hover:text-oxot-orange transition-colors">
                            root
                        </a>
                        <span className="text-gray-700">/</span>
                        {breadcrumbs.map((crumb, i) => (
                            <div key={crumb.href} className="flex items-center gap-2">
                                {crumb.active ? (
                                    <span className="text-white font-medium bg-white/5 px-2 py-0.5 rounded text-xs">
                                        {crumb.label}
                                    </span>
                                ) : (
                                    <a href={crumb.href} className="text-gray-500 hover:text-oxot-orange transition-colors">
                                        {crumb.label}
                                    </a>
                                )}
                                {i < breadcrumbs.length - 1 && <span className="text-gray-700">/</span>}
                            </div>
                        ))}
                    </nav>
                    <ExportToObsidian />
                </div>

                {/* Page content */}
                <main className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full">
                    {children}
                </main>
            </div>
        </div>
    );
}
