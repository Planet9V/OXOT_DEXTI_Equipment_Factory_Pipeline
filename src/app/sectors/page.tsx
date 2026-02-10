'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Equipment { componentClass: string; displayName: string; category: string; typicalQuantity: { min: number; max: number } }
interface Facility { code: string; name: string; description: string; equipment: Equipment[] }
interface SubSector { code: string; name: string; description: string; facilities: Facility[] }
interface Sector { code: string; name: string; icon: string; description: string; color: string; subSectors: SubSector[]; equipmentCount: number; vendorCount: number }

export default function SectorsPage() {
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newSector, setNewSector] = useState({ code: '', name: '', description: '' });

  useEffect(() => { loadSectors(); }, []);

  async function loadSectors() {
    setLoading(true);
    try {
      const res = await fetch('/api/sectors');
      const data = await res.json();
      setSectors(data.data || []);
    } catch {} finally { setLoading(false); }
  }

  function toggle(code: string) {
    setExpanded(prev => { const n = new Set(prev); n.has(code) ? n.delete(code) : n.add(code); return n; });
  }

  async function createSector() {
    if (!newSector.code || !newSector.name) return;
    await fetch('/api/sectors', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newSector) });
    setNewSector({ code: '', name: '', description: '' });
    setShowCreate(false);
    loadSectors();
  }

  async function deleteSector(code: string) {
    if (!confirm(`Delete sector ${code} and all its contents?`)) return;
    await fetch(`/api/sectors/${code}`, { method: 'DELETE' });
    loadSectors();
  }

  if (loading) return <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-400">Loading sectors...</div>;

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white font-heading">Critical Infrastructure Sectors</h2>
            <p className="text-gray-400 text-sm">{sectors.length} sectors defined</p>
          </div>
          <button onClick={() => setShowCreate(!showCreate)} className="btn-primary">+ New Sector</button>
        </div>

        {showCreate && (
          <div className="card mb-6">
            <h3 className="text-lg font-semibold text-white mb-3 font-heading">Create New Sector</h3>
            <div className="grid grid-cols-3 gap-3">
              <input className="input" placeholder="Code (e.g. ENER)" value={newSector.code} onChange={e => setNewSector({ ...newSector, code: e.target.value })} />
              <input className="input" placeholder="Name" value={newSector.name} onChange={e => setNewSector({ ...newSector, name: e.target.value })} />
              <input className="input" placeholder="Description" value={newSector.description} onChange={e => setNewSector({ ...newSector, description: e.target.value })} />
            </div>
            <div className="flex gap-2 mt-3">
              <button onClick={createSector} className="btn-primary">Create</button>
              <button onClick={() => setShowCreate(false)} className="btn-secondary">Cancel</button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {sectors.map(sector => (
            <div key={sector.code} className="card">
              <div className="flex items-center justify-between cursor-pointer" onClick={() => toggle(sector.code)}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{sector.icon}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-white font-heading">{sector.code} — {sector.name}</h3>
                    <p className="text-xs text-gray-400">{sector.subSectors?.length || 0} sub-sectors · {sector.equipmentCount || 0} equipment</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="badge-blue">{sector.equipmentCount || 0}</span>
                  <button onClick={e => { e.stopPropagation(); deleteSector(sector.code); }} className="text-gray-500 hover:text-red-400 text-xs">&#x2715;</button>
                  <span className="text-gray-500">{expanded.has(sector.code) ? '\u25BC' : '\u25B6'}</span>
                </div>
              </div>
              {expanded.has(sector.code) && sector.subSectors && (
                <div className="mt-4 space-y-3 border-t border-white/[0.06] pt-4">
                  {sector.subSectors.map(sub => (
                    <div key={sub.code} className="pl-4">
                      <h4 className="text-sm font-medium text-gray-200 font-heading">{sub.code} — {sub.name}</h4>
                      <p className="text-xs text-gray-500 mb-2">{sub.description}</p>
                      <div className="grid grid-cols-1 gap-2">
                        {sub.facilities.map(fac => (
                          <div key={fac.code} className="pl-4 p-2 bg-white/[0.02] rounded">
                            <div className="text-xs font-medium text-gray-300">{fac.code} — {fac.name}</div>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {fac.equipment.slice(0, 6).map(eq => (
                                <span key={eq.componentClass} className={`text-xs px-1.5 py-0.5 rounded ${eq.category === 'rotating' ? 'bg-accent-900/20 text-accent-400' : eq.category === 'static' ? 'bg-green-900/30 text-green-300' : eq.category === 'instrumentation' ? 'bg-yellow-900/30 text-yellow-300' : eq.category === 'electrical' ? 'bg-purple-900/30 text-purple-300' : 'bg-white/[0.06] text-gray-300'}`}>
                                  {eq.displayName}
                                </span>
                              ))}
                              {fac.equipment.length > 6 && <span className="text-xs text-gray-500">+{fac.equipment.length - 6} more</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
