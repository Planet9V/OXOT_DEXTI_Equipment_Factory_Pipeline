'use client';

/**
 * Critical Infrastructure Sectors Overview Hub.
 *
 * Displays all 16 CISA sectors with a horizontal icon nav bar for quick
 * navigation, and full-detail overview cards for each sector.
 *
 * @module sectors/page
 */

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Activity, Database, ShieldCheck, LayoutGrid, ChevronRight } from 'lucide-react';
import {
  FlaskConical, Zap, Heart, Landmark, Atom, Factory, Droplets,
  Siren, Building, Cpu, Truck, Wheat, Radio, Building2, Waves, Shield,
} from 'lucide-react';
import { getSectorSummary } from '@/components/wiki/step-data';
import SectorOverviewCard from '@/components/sectors/SectorOverviewCard';
import Link from 'next/link';

/** Lucide icon lookup by name */
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
  subSectors: any[];
  equipmentCount: number;
  vendorCount: number;
}

export default function SectorsPage() {
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const sectorRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => { loadSectors(); }, []);

  /** Fetches sectors from API. */
  async function loadSectors() {
    setLoading(true);
    try {
      const res = await fetch('/api/sectors');
      const data = await res.json();
      setSectors(data.data || []);
    } catch (err) {
      console.error('[sectors] Load failed:', err);
    } finally {
      setLoading(false);
    }
  }

  /** Scroll to a sector card when clicking its icon in the nav bar. */
  function scrollToSector(code: string) {
    const el = sectorRefs.current.get(code);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  /** Filtered sectors based on search. */
  const filtered = sectors.filter(s =>
    !search ||
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.code.toLowerCase().includes(search.toLowerCase()) ||
    s.description.toLowerCase().includes(search.toLowerCase())
  );

  /** Global analytics. */
  const totalEquipment = sectors.reduce((sum, s) => sum + (s.equipmentCount || 0), 0);
  const totalSubSectors = sectors.reduce((sum, s) => sum + (s.subSectors?.length || 0), 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-white/[0.05] border-t-accent-500 rounded-full animate-spin" />
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Initialising Sovereign Matrix...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-10">

        {/* ── Sovereign Header ────────────────────────────────────────────── */}
        <header className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-accent-500 font-mono text-[10px] uppercase tracking-[0.3em]"
          >
            <span className="w-12 h-[1px] bg-accent-500/50" />
            Global Infrastructure Intelligence Hub
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="space-y-4 max-w-3xl">
              <h1 className="text-5xl font-bold text-white font-heading tracking-tight leading-none">
                Critical Infrastructure <span className="text-gray-600 block sm:inline">Sectors</span>
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed font-light">
                Secure architectural mapping of the 16 cross-cutting lifeline sectors.
                Synchronizing <span className="text-white font-medium">TOGAF Layering</span> with
                <span className="text-white font-medium"> DEXPI 2.0</span> equipment standards and
                <span className="text-white font-medium"> Physical Asset Graphs</span>.
              </p>
            </div>

            {/* Global Metrics Bar */}
            <div className="flex items-center gap-8 bg-white/[0.02] border border-white/[0.05] p-6 rounded-2xl backdrop-blur-xl">
              <div className="space-y-1">
                <span className="text-[10px] text-gray-600 uppercase font-mono tracking-wider flex items-center gap-2">
                  <Database className="w-3 h-3" /> Data Nodes
                </span>
                <div className="text-2xl font-bold text-white font-heading">{totalEquipment.toLocaleString()}</div>
              </div>
              <div className="w-px h-10 bg-white/[0.08]" />
              <div className="space-y-1">
                <span className="text-[10px] text-gray-600 uppercase font-mono tracking-wider flex items-center gap-2">
                  <LayoutGrid className="w-3 h-3" /> Sub-Sectors
                </span>
                <div className="text-2xl font-bold text-white font-heading">{totalSubSectors}</div>
              </div>
              <div className="w-px h-10 bg-white/[0.08]" />
              <div className="space-y-1">
                <span className="text-[10px] text-gray-600 uppercase font-mono tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-3 h-3" /> Sectors
                </span>
                <div className="text-2xl font-bold text-white font-heading">{sectors.length}</div>
              </div>
            </div>
          </div>
        </header>

        {/* ── Sector Icon Nav Bar ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4"
        >
          <div className="flex items-center justify-between gap-2 overflow-x-auto">
            {sectors.map((sector) => {
              const Icon = ICON_MAP[sector.icon] || Factory;
              return (
                <motion.button
                  key={sector.code}
                  onClick={() => scrollToSector(sector.code)}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative flex flex-col items-center gap-1.5 px-2 py-2 rounded-xl transition-colors duration-200 hover:bg-white/[0.05] flex-shrink-0 min-w-[52px]"
                  title={sector.name}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:shadow-lg"
                    style={{
                      background: `${sector.color}15`,
                      border: `1px solid ${sector.color}25`,
                    }}
                  >
                    <Icon className="w-5 h-5 transition-colors duration-200" style={{ color: sector.color }} strokeWidth={1.5} />
                  </div>
                  <span className="text-[8px] font-mono text-gray-600 group-hover:text-gray-300 transition-colors duration-200 text-center leading-tight whitespace-nowrap max-w-[56px] truncate">
                    {sector.code}
                  </span>
                  {/* Hover tooltip */}
                  <div className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md bg-gray-900 border border-white/[0.1] text-[10px] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-xl z-10">
                    {sector.name}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Search */}
        <div className="flex items-center gap-4 pt-2 border-t border-white/[0.05]">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-accent-500 transition-colors" />
            <input
              type="text"
              placeholder="Filter sovereign assets by name, code, or description..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-gray-600 focus:border-accent-500/40 focus:ring-1 focus:ring-accent-500/20 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* ── Sector Cards ─────────────────────────────────────────────────── */}
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((sector, i) => {
              const summary = getSectorSummary(sector.code);

              return (
                <motion.div
                  key={sector.code}
                  ref={(el) => { if (el) sectorRefs.current.set(sector.code, el); }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                >
                  {summary ? (
                    <SectorOverviewCard sector={sector} summary={summary} />
                  ) : (
                    /* Fallback card for sectors without step-data summaries */
                    <FallbackSectorCard sector={sector} />
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="py-24 text-center space-y-4 bg-white/[0.02] border border-dashed border-white/[0.1] rounded-3xl">
              <div className="w-16 h-16 bg-white/[0.03] rounded-full flex items-center justify-center mx-auto">
                <Search className="w-6 h-6 text-gray-600" />
              </div>
              <div className="space-y-1">
                <h3 className="text-white font-medium">No assets matching criteria</h3>
                <p className="text-gray-500 text-sm">Synchronise search parameters and try again.</p>
              </div>
              <button
                onClick={() => setSearch('')}
                className="text-accent-500 text-xs font-mono uppercase tracking-widest hover:text-accent-400 transition-colors"
              >
                Reset Search Matrix
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="pt-12 flex items-center justify-between border-t border-white/[0.05]">
          <div className="flex items-center gap-4 text-gray-600 font-mono text-[9px] uppercase tracking-widest">
            <Activity className="w-3 h-3 animate-pulse text-green-500" />
            Live Network Status: Operational
          </div>
          <div className="text-gray-600 font-mono text-[9px] uppercase tracking-widest">
            DEXTI-OXOT-CONDUCTOR v4.6.2 // Academic Dark Standard
          </div>
        </footer>
      </div>
    </div>
  );
}


/**
 * Fallback card for sectors without full step-data summaries.
 * Shows sector identity, description, and sub-sector list.
 */
function FallbackSectorCard({ sector }: { sector: Sector }) {
  const Icon = ICON_MAP[sector.icon] || Factory;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group relative rounded-2xl border border-white/[0.06] bg-[#0A0A0A] overflow-hidden transition-all duration-500"
    >
      <div className="relative p-6 lg:p-8 flex flex-col lg:flex-row gap-8 lg:items-center">
        {/* Left: Identity */}
        <div className="lg:w-1/4 flex items-center gap-5">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110 flex-shrink-0"
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
              {sector.code}
            </p>
          </div>
        </div>

        {/* Center: Description */}
        <div className="lg:w-1/2">
          <p className="text-sm text-gray-400 leading-relaxed">{sector.description}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {sector.subSectors?.map((sub: any, i: number) => (
              <span
                key={i}
                className="px-2.5 py-1.5 rounded-lg text-[10px] font-medium border border-white/[0.06] text-gray-400"
              >
                {sub.name}
              </span>
            ))}
          </div>
        </div>

        {/* Right: CTA */}
        <div className="lg:w-1/4 flex flex-col items-end gap-3">
          <div className="flex items-center gap-6">
            <div className="space-y-0.5 text-right">
              <span className="text-[10px] text-gray-600 block uppercase font-mono">Equipment</span>
              <span className="text-lg font-bold font-heading text-white">{sector.equipmentCount}</span>
            </div>
            <div className="w-px h-8 bg-white/[0.06]" />
            <div className="space-y-0.5 text-right">
              <span className="text-[10px] text-gray-600 block uppercase font-mono">Sub-Sectors</span>
              <span className="text-lg font-bold font-heading text-white">{sector.subSectors?.length || 0}</span>
            </div>
          </div>
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

      {/* Bottom color bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 transition-all duration-500 group-hover:h-1.5"
        style={{ background: `linear-gradient(90deg, transparent, ${sector.color}, transparent)` }}
      />
    </motion.div>
  );
}
