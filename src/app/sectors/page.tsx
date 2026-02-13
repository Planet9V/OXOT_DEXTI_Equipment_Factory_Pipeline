'use client';

/**
 * Critical Infrastructure Sectors Overview Hub.
 * 
 * A high-fidelity, data-driven dashboard displaying all 16 CISA sectors.
 * Pulls architectural summaries (Profile, Business Arch, Sub-Sectors) 
 * directly from the codified step-data layer to provide a unified 
 * sovereign intelligence view.
 *
 * @module sectors/page
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Activity, Database, ShieldCheck, LayoutGrid } from 'lucide-react';
import { getSectorSummary } from '@/components/wiki/step-data';
import SectorOverviewCard from '@/components/sectors/SectorOverviewCard';

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">

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

          {/* Search & Utility Bar */}
          <div className="flex items-center gap-4 pt-4 border-t border-white/[0.05]">
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
        </header>

        {/* ── Sovereign Feed ──────────────────────────────────────────────── */}
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((sector, i) => {
              const summary = getSectorSummary(sector.code);
              if (!summary) return null;

              return (
                <motion.div
                  key={sector.code}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                >
                  <SectorOverviewCard sector={sector} summary={summary} />
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

        {/* Footer info */}
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
