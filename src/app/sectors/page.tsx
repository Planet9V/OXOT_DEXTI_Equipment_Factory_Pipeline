'use client';

/**
 * Critical Infrastructure Sectors Page.
 *
 * Displays all 16 CISA sectors with Lucide icons, equipment counts,
 * sub-sector drill-down, and facility/equipment details. Fetches live
 * data from /api/sectors with Memgraph fallback.
 *
 * @module sectors/page
 */

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FlaskConical, Zap, Heart, Landmark, Atom, Factory, Droplets,
  Siren, Building, Cpu, Truck, Wheat, Radio, Building2, Waves,
  Shield, ChevronDown, ChevronRight, Plus, X, Search,
  type LucideIcon,
} from 'lucide-react';

/** Map from icon name string (stored in sector data) → Lucide component. */
const ICON_MAP: Record<string, LucideIcon> = {
  FlaskConical, Zap, Heart, Landmark, Atom, Factory, Droplets,
  Siren, Building, Cpu, Truck, Wheat, Radio, Building2, Waves, Shield,
};

interface Equipment {
  componentClass: string;
  displayName: string;
  category: string;
  typicalQuantity: { min: number; max: number };
}
interface Facility {
  code: string;
  name: string;
  description: string;
  equipment: Equipment[];
}
interface SubSector {
  code: string;
  name: string;
  description: string;
  facilities: Facility[];
}
interface Sector {
  code: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  subSectors: SubSector[];
  equipmentCount: number;
  vendorCount: number;
}

/** Category badge colors. */
const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  rotating: { bg: 'rgba(139,92,246,0.15)', text: '#A78BFA' },
  static: { bg: 'rgba(6,182,212,0.15)', text: '#22D3EE' },
  'heat-transfer': { bg: 'rgba(245,158,11,0.15)', text: '#FBBF24' },
  electrical: { bg: 'rgba(59,130,246,0.15)', text: '#60A5FA' },
  piping: { bg: 'rgba(16,185,129,0.15)', text: '#34D399' },
  instrumentation: { bg: 'rgba(236,72,153,0.15)', text: '#F472B6' },
};

/**
 * Renders the appropriate Lucide icon for a sector.
 *
 * @param iconName - Lucide component name from sector data
 * @param color - Sector brand color
 */
function SectorIcon({ iconName, color }: { iconName: string; color: string }) {
  const Icon = ICON_MAP[iconName];
  if (!Icon) return <span className="text-lg">🏭</span>;
  return <Icon className="w-5 h-5" style={{ color }} strokeWidth={1.5} />;
}

export default function SectorsPage() {
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [newSector, setNewSector] = useState({ code: '', name: '', description: '' });

  useEffect(() => { loadSectors(); }, []);

  /** Fetches sectors from API. */
  async function loadSectors() {
    setLoading(true);
    try {
      const res = await fetch('/api/sectors');
      const data = await res.json();
      setSectors(data.data || []);
    } catch {
      // Network failure — sectors remain empty
    } finally {
      setLoading(false);
    }
  }

  /** Toggles expansion of a sector card. */
  function toggle(code: string) {
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(code) ? next.delete(code) : next.add(code);
      return next;
    });
  }

  /** Creates a new sector. */
  async function createSector() {
    if (!newSector.code || !newSector.name) return;
    try {
      await fetch('/api/sectors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSector),
      });
    } catch (err) {
      console.error('[sectors] Create failed:', err);
    }
    setNewSector({ code: '', name: '', description: '' });
    setShowCreate(false);
    loadSectors();
  }

  /** Deletes a sector. */
  async function deleteSector(code: string) {
    if (!confirm(`Delete sector ${code} and all its contents?`)) return;
    try {
      await fetch(`/api/sectors/${code}`, { method: 'DELETE' });
    } catch (err) {
      console.error('[sectors] Delete failed:', err);
    }
    loadSectors();
  }

  /** Filtered sectors based on search. */
  const filtered = sectors.filter(s =>
    !search ||
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.code.toLowerCase().includes(search.toLowerCase()) ||
    s.description.toLowerCase().includes(search.toLowerCase())
  );

  /** Total stats. */
  const totalEquipment = sectors.reduce((sum, s) => sum + (s.equipmentCount || 0), 0);
  const totalSubSectors = sectors.reduce((sum, s) => sum + (s.subSectors?.length || 0), 0);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="inline-flex items-center gap-3 text-gray-400">
          <div className="w-5 h-5 border-2 border-gray-600 border-t-accent-500 rounded-full animate-spin" />
          Loading sectors...
        </div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white font-heading">
              Critical Infrastructure Sectors
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              {sectors.length} sectors · {totalSubSectors} sub-sectors · {totalEquipment} equipment types
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search sectors..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 pr-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-gray-500 focus:border-accent-500/40 focus:outline-none transition-colors w-56"
              />
            </div>
            <button
              onClick={() => setShowCreate(!showCreate)}
              className="btn-primary flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> New Sector
            </button>
          </div>
        </div>

        {/* Create Form */}
        {showCreate && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="card overflow-hidden"
          >
            <h3 className="text-lg font-semibold text-white mb-3 font-heading">Create New Sector</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                className="input"
                placeholder="Code (e.g. ENER)"
                value={newSector.code}
                onChange={e => setNewSector({ ...newSector, code: e.target.value })}
              />
              <input
                className="input"
                placeholder="Name"
                value={newSector.name}
                onChange={e => setNewSector({ ...newSector, name: e.target.value })}
              />
              <input
                className="input"
                placeholder="Description"
                value={newSector.description}
                onChange={e => setNewSector({ ...newSector, description: e.target.value })}
              />
            </div>
            <div className="flex gap-2 mt-3">
              <button onClick={createSector} className="btn-primary">Create</button>
              <button onClick={() => setShowCreate(false)} className="btn-secondary">Cancel</button>
            </div>
          </motion.div>
        )}

        {/* Sector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map((sector, i) => {
            const isOpen = expanded.has(sector.code);
            const facCount = sector.subSectors?.reduce((n, s) => n + (s.facilities?.length || 0), 0) || 0;

            return (
              <motion.div
                key={sector.code}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03, duration: 0.35 }}
                className="rounded-xl border border-white/[0.06] overflow-hidden hover:border-white/[0.12] transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.02)' }}
              >
                {/* Card Header */}
                <div
                  className="p-4 cursor-pointer select-none"
                  onClick={() => toggle(sector.code)}
                >
                  <div className="flex items-center gap-3">
                    {/* Icon */}
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${sector.color || '#6366F1'}15` }}
                    >
                      <SectorIcon iconName={sector.icon} color={sector.color || '#6366F1'} />
                    </div>

                    {/* Title & Description */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-semibold text-white font-heading truncate">
                          {sector.name}
                        </h3>
                        <span className="text-[10px] font-mono text-gray-500 flex-shrink-0">
                          {sector.code}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 truncate mt-0.5">
                        {sector.description}
                      </p>
                    </div>

                    {/* Stats & Actions */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="text-right hidden sm:block">
                        <div className="text-sm font-heading font-bold" style={{ color: sector.color || '#6366F1' }}>
                          {sector.equipmentCount || 0}
                        </div>
                        <div className="text-[10px] text-gray-500">equipment</div>
                      </div>
                      <button
                        onClick={e => { e.stopPropagation(); deleteSector(sector.code); }}
                        className="p-1 rounded hover:bg-red-500/10 text-gray-600 hover:text-red-400 transition-colors"
                        title="Delete sector"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                      {isOpen
                        ? <ChevronDown className="w-4 h-4 text-gray-500" />
                        : <ChevronRight className="w-4 h-4 text-gray-500" />
                      }
                    </div>
                  </div>

                  {/* Mini stats */}
                  <div className="flex items-center gap-3 mt-2 ml-[52px] text-[10px] text-gray-500">
                    <span>{sector.subSectors?.length || 0} sub-sectors</span>
                    <span className="w-px h-3 bg-white/[0.06]" />
                    <span>{facCount} facilities</span>
                    <span className="w-px h-3 bg-white/[0.06]" />
                    <span>{sector.equipmentCount || 0} equipment</span>
                  </div>
                </div>

                {/* Expanded Content */}
                {isOpen && sector.subSectors && (
                  <div className="border-t border-white/[0.06] p-4 space-y-4">
                    {sector.subSectors.map(sub => (
                      <div key={sub.code} className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-1 h-6 rounded-full" style={{ background: sector.color || '#6366F1' }} />
                          <div>
                            <h4 className="text-sm font-medium text-gray-200 font-heading">
                              {sub.name}
                            </h4>
                            <span className="text-[10px] font-mono text-gray-600">{sub.code}</span>
                          </div>
                        </div>
                        {sub.description && (
                          <p className="text-xs text-gray-500 ml-3">{sub.description}</p>
                        )}
                        <div className="space-y-2 ml-3">
                          {sub.facilities.map(fac => (
                            <div
                              key={fac.code}
                              className="rounded-lg border border-white/[0.04] p-3"
                              style={{ background: 'rgba(255,255,255,0.015)' }}
                            >
                              <div className="flex items-center justify-between mb-1.5">
                                <div>
                                  <span className="text-xs font-medium text-gray-300">
                                    {fac.name}
                                  </span>
                                  <span className="text-[10px] font-mono text-gray-600 ml-2">
                                    {fac.code}
                                  </span>
                                </div>
                                <span className="text-[10px] text-gray-500">
                                  {fac.equipment.length} types
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {fac.equipment.slice(0, 8).map(eq => {
                                  const cat = CATEGORY_COLORS[eq.category] || CATEGORY_COLORS.static;
                                  return (
                                    <span
                                      key={eq.componentClass}
                                      className="text-[10px] px-1.5 py-0.5 rounded"
                                      style={{ background: cat.bg, color: cat.text }}
                                    >
                                      {eq.displayName}
                                    </span>
                                  );
                                })}
                                {fac.equipment.length > 8 && (
                                  <span className="text-[10px] text-gray-500 px-1.5 py-0.5">
                                    +{fac.equipment.length - 8} more
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                    {/* Wiki link */}
                    <a
                      href={`/wiki/sectors/${sector.code}`}
                      className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md border border-white/[0.06] text-gray-400 hover:text-white hover:border-white/[0.15] transition-colors"
                    >
                      View full wiki article →
                    </a>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && !loading && (
          <div className="text-center py-12 text-gray-500">
            {search ? `No sectors matching "${search}"` : 'No sectors loaded'}
          </div>
        )}
      </div>
    </motion.div>
  );
}
