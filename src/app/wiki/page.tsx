/**
 * DEXTI Equipment Factory - Wiki Home
 *
 * Functional Dashboard Layout replacing the previous Marketing/Hero style.
 * Provides direct access to 16 CISA Sectors, Equipment Search, and key resources.
 *
 * @module wiki/page
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SECTORS } from '@/lib/sectors';
import {
    Search,
    ArrowRight,
    Database,
    FileJson,
    Settings,
    Layers,
    Activity
} from 'lucide-react';

export default function WikiHomePage() {
    const [searchQuery, setSearchQuery] = useState('');

    // Filter sectors based on search
    const filteredSectors = SECTORS.filter(sector =>
        sector.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sector.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sector.subSectors.some(sub => sub.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="max-w-7xl mx-auto space-y-12 pb-20 pt-8">

            {/* ── Header & Search ──────────────────────────────────────────────── */}
            <header className="space-y-8 text-center max-w-3xl mx-auto">
                <div className="space-y-2">
                    <h1 className="text-3xl font-heading font-bold text-white">
                        DEXTI Equipment Factory
                    </h1>
                    <p className="text-gray-400 text-sm max-w-xl mx-auto">
                        Centralized knowledge base for Critical Infrastructure Digital Twins.
                        Access equipment specifications, L0/L1/L2 models, and reference architectures.
                    </p>
                </div>

                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-500 group-focus-within:text-oxot-orange transition-colors" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search sectors, equipment, or standards (e.g. 'Pumps', 'Energy', 'API 610')..."
                        className="block w-full pl-11 pr-4 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-oxot-orange/50 focus:bg-white/[0.05] focus:ring-1 focus:ring-oxot-orange/50 transition-all font-mono"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </header>

            {/* ── Quick Resources ──────────────────────────────────────────────── */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Equipment Pipeline', icon: Database, href: '/pipeline', color: 'text-oxot-orange' },
                    { label: 'DEXPI Standards', icon: FileJson, href: '/wiki/dexpi/standards', color: 'text-oxot-teal' },
                    { label: 'Graph Schema', icon: Activity, href: '/wiki/neo4j/data-model', color: 'text-blue-400' },
                    { label: 'System Settings', icon: Settings, href: '/settings', color: 'text-gray-400' },
                ].map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className="flex items-center gap-3 p-4 rounded-xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/[0.08] transition-all group"
                    >
                        <item.icon className={`h-5 w-5 ${item.color}`} />
                        <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                            {item.label}
                        </span>
                    </Link>
                ))}
            </div>

            {/* ── Sectors Grid ─────────────────────────────────────────────────── */}
            <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                    <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <Layers className="h-4 w-4 text-oxot-orange" />
                        CISA Critical Infrastructure Sectors
                    </h2>
                    <span className="text-xs text-gray-500 font-mono">
                        {filteredSectors.length} Sectors Available
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredSectors.map((sector) => (
                        <Link
                            key={sector.code}
                            href={sector.slug ? `/wiki/${sector.slug}` : `/wiki/sectors/${sector.code}`}
                            className="group relative flex flex-col p-5 rounded-xl border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/[0.12] transition-all duration-300"
                        >
                            {/* Color Accent */}
                            <div
                                className="absolute top-0 left-0 w-1 h-full rounded-l-xl opacity-50 group-hover:opacity-100 transition-opacity"
                                style={{ background: sector.color }}
                            />

                            <div className="flex justify-between items-start mb-3 pl-2">
                                <div className="p-2 rounded-lg bg-white/[0.05] text-xl">
                                    {/* Using emoji as icon since lucide icons aren't in data source directly yet */}
                                    {/* In a real app, map icon string to Lucide component */}
                                    <span>⚡</span>
                                </div>
                                <span className="text-[10px] font-mono text-gray-600 border border-white/[0.06] px-1.5 py-0.5 rounded">
                                    {sector.code}
                                </span>
                            </div>

                            <div className="pl-2 space-y-1 flex-1">
                                <h3 className="text-sm font-bold text-gray-200 group-hover:text-white transition-colors">
                                    {sector.name}
                                </h3>
                                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                                    {sector.description}
                                </p>
                            </div>

                            <div className="mt-4 pl-2 pt-3 border-t border-white/[0.04] flex items-center justify-between">
                                <span className="text-[10px] text-gray-500 font-mono">
                                    {sector.subSectors.length} Subsectors
                                </span>
                                <ArrowRight className="h-3 w-3 text-gray-600 group-hover:text-oxot-orange transition-colors -translate-x-1 group-hover:translate-x-0" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* ── Empty State ──────────────────────────────────────────────────── */}
            {filteredSectors.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                    <p>No sectors found matching "{searchQuery}"</p>
                </div>
            )}

        </div>
    );
}
