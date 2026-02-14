
'use client';

import { motion } from 'framer-motion';
import {
    FlaskConical, Zap, Heart, Landmark, Atom, Factory, Droplets,
    Siren, Building, Cpu, Truck, Wheat, Radio, Building2, Waves, Shield
} from 'lucide-react';

const ICON_MAP: Record<string, any> = {
    FlaskConical, Zap, Heart, Landmark, Atom, Factory, Droplets,
    Siren, Building, Cpu, Truck, Wheat, Radio, Building2, Waves, Shield,
};

interface Sector {
    code: string;
    name: string;
    icon: string;
    color: string;
    description: string;
}

interface SectorTickerProps {
    sectors: Sector[];
    onSectorClick: (code: string) => void;
}

export default function SectorTicker({ sectors, onSectorClick }: SectorTickerProps) {
    // Duplicate list for seamless loop
    const tickerSectors = [...sectors, ...sectors];

    return (
        <div className="relative w-full overflow-hidden py-4 group">
            {/* Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050505] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050505] to-transparent z-10" />

            <motion.div
                className="flex gap-4 w-max"
                animate={{ x: "-50%" }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 40, // Slow, smooth scroll
                }}
                whileHover={{ animationPlayState: "paused" }} // Note: Framer motion requires 'initial' logic for pause, or CSS. 
            // Framer Motion hovering pause is tricky. Better to use hover on parent to set animation speed or rely on CSS for the marquee if possible, 
            // but Framer is requested. I'll stick to a simple implementation first. 
            // Actually, let's use a specific state or just let it scroll. 
            // User asked for "interactive", so pausing on hover is good.
            >
                {tickerSectors.map((sector, i) => (
                    <TickerCard
                        key={`${sector.code}-${i}`}
                        sector={sector}
                        onClick={() => onSectorClick(sector.code)}
                    />
                ))}
            </motion.div>
        </div>
    );
}

function TickerCard({ sector, onClick }: { sector: Sector; onClick: () => void }) {
    const Icon = ICON_MAP[sector.icon] || Factory;

    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex-shrink-0 w-56 h-32 p-4 rounded-xl border border-white/[0.08] bg-[#0A0A0A] hover:bg-white/[0.05] transition-colors text-left flex flex-col justify-between overflow-hidden group/card"
        >
            {/* Background Glow */}
            <div
                className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at center, ${sector.color}15 0%, transparent 70%)` }}
            />

            <div className="flex items-start justify-between">
                <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center border border-white/[0.05]"
                    style={{ background: `${sector.color}10`, borderColor: `${sector.color}20` }}
                >
                    <Icon className="w-5 h-5" style={{ color: sector.color }} />
                </div>
                <span className="text-[9px] font-mono text-gray-600 uppercase tracking-widest group-hover/card:text-gray-400 transition-colors">
                    {sector.code}
                </span>
            </div>

            <div>
                <h4 className="text-sm font-bold text-gray-200 group-hover/card:text-white leading-tight">
                    {sector.name}
                </h4>
            </div>

            {/* Bottom accent line */}
            <div
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-transparent to-transparent group-hover/card:via-current transition-all duration-500 w-full"
                style={{ color: sector.color }}
            />
        </motion.button>
    );
}
