'use client';

import { motion } from 'framer-motion';
import { ChevronRight, Shield, Activity, Landmark, Target, Info } from 'lucide-react';
import Link from 'next/link';
import { type SectorSummary } from '@/components/wiki/SectorStepViewer';
import {
    FlaskConical, Zap, Heart, Atom, Factory, Droplets, Siren,
    Building, Cpu, Truck, Wheat, Radio, Building2, Waves,
} from 'lucide-react';

const ICON_MAP: Record<string, any> = {
    FlaskConical, Zap, Heart, Landmark, Atom, Factory, Droplets,
    Siren, Building, Cpu, Truck, Wheat, Radio, Building2, Waves, Shield,
};

interface Sector {
    code: string;
    slug: string;
    name: string;
    icon: string;
    color: string;
    description: string;
    equipmentCount: number;
}

interface SectorOverviewCardProps {
    sector: Sector;
    summary: SectorSummary;
}

export default function SectorOverviewCard({ sector, summary }: SectorOverviewCardProps) {
    const Icon = ICON_MAP[sector.icon] || Factory;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4, borderColor: `${sector.color}40` }}
            className="group relative rounded-2xl border border-white/[0.06] bg-[#0A0A0A] overflow-hidden transition-all duration-500"
        >
            {/* Dynamic Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern
                            id={`pattern-${sector.code}`}
                            x="0"
                            y="0"
                            width="40"
                            height="40"
                            patternUnits="userSpaceOnUse"
                            patternTransform="rotate(45)"
                        >
                            <rect width="100%" height="100%" fill="none" />
                            <path
                                d="M0 20 L40 20 M20 0 L20 40"
                                stroke={sector.color}
                                strokeWidth="0.5"
                                fill="none"
                            />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#pattern-${sector.code})`} />
                </svg>
            </div>

            <div className="relative p-6 lg:p-8 flex flex-col lg:flex-row gap-8 lg:items-stretch">
                {/* Left: Branding & Metrics */}
                <div className="lg:w-1/4 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                        <div
                            className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110"
                            style={{
                                background: `${sector.color}20`,
                                boxShadow: `0 0 20px ${sector.color}10`,
                                border: `1px solid ${sector.color}30`,
                            }}
                        >
                            <Icon className="w-7 h-7" style={{ color: sector.color }} strokeWidth={1.5} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white font-heading tracking-tight leading-tight">
                                {sector.name}
                            </h3>
                            <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-1">
                                {sector.code} · SRMA: {summary.profile.find(p => p.label === 'SRMA')?.value || 'TBD'}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 border-t border-white/[0.04] pt-6">
                        <div className="space-y-0.5">
                            <span className="text-[10px] text-gray-600 block uppercase font-mono">Equipment</span>
                            <span className="text-lg font-bold font-heading text-white">{sector.equipmentCount}</span>
                        </div>
                        <div className="w-px h-8 bg-white/[0.06]" />
                        <div className="space-y-0.5">
                            <span className="text-[10px] text-gray-600 block uppercase font-mono">Facilities</span>
                            <span className="text-lg font-bold font-heading text-white">
                                {summary.subSectors.reduce((acc, s) => acc + (s as any).facilities?.length || 0, 0) || summary.subSectors.length}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Center: Intelligence Layers */}
                <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Sector Profile Blurs */}
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-mono font-semibold text-gray-500 flex items-center gap-2 uppercase tracking-widest">
                            <Info className="w-3 h-3" /> Sector Profile
                        </h4>
                        <div className="grid grid-cols-1 gap-2">
                            {summary.profile.slice(0, 4).map((p, i) => (
                                <div key={i} className="flex justify-between items-center bg-white/[0.02] border border-white/[0.04] p-2 rounded-lg group-hover:bg-white/[0.04] transition-colors">
                                    <span className="text-[10px] text-gray-500">{p.label}</span>
                                    <span className="text-[10px] font-medium text-gray-300 text-right max-w-[120px] truncate">{p.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Business Arch Blurb */}
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-mono font-semibold text-gray-500 flex items-center gap-2 uppercase tracking-widest">
                            <Target className="w-3 h-3" /> Business Architecture
                        </h4>
                        <div className="bg-white/[0.02] border border-white/[0.04] p-3 rounded-xl min-h-[100px] flex flex-col justify-between">
                            <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-4 italic">
                                "{summary.businessBlurb}"
                            </p>
                            <Link
                                href={`/wiki/${sector.slug}`}
                                className="text-[11px] text-accent-500 hover:text-accent-400 font-medium flex items-center gap-1 mt-2"
                            >
                                View full TOGAF Reference <ChevronRight className="w-3 h-3" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Right: Asset Drill-down */}
                <div className="lg:w-1/4 flex flex-col justify-between">
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-mono font-semibold text-gray-500 flex items-center gap-2 uppercase tracking-widest">
                            <Shield className="w-3 h-3" /> Sub-Sectors
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {summary.subSectors.map((sub, i) => (
                                <Link
                                    key={i}
                                    href={`/wiki/${sector.slug}#sub-${sub.code}`}
                                    className="px-2.5 py-1.5 rounded-lg text-[10px] font-medium transition-all duration-300 border border-white/[0.06] hover:border-white/[0.2] hover:bg-white/[0.04] text-gray-400 hover:text-white"
                                >
                                    {sub.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="pt-6">
                        <Link
                            href={`/wiki/${sector.slug}`}
                            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-white/[0.04] border border-white/[0.1] text-xs font-semibold text-white hover:bg-white/[0.08] hover:border-white/[0.2] transition-all duration-300"
                        >
                            Enter Reference Architecture Hub
                            <div className="w-5 h-5 rounded-full bg-white/[0.1] flex items-center justify-center">
                                <ChevronRight className="w-3 h-3" />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Hover state gradient effect */}
            <div
                className="absolute bottom-0 left-0 right-0 h-1 transition-all duration-500 group-hover:h-1.5"
                style={{ background: `linear-gradient(90deg, transparent, ${sector.color}, transparent)` }}
            />
        </motion.div>
    );
}
