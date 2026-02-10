'use client';

import { useEffect, useState, useCallback } from 'react';

interface EquipmentCard {
  id: string; tag: string; componentClass: string; displayName: string; category: string;
  description: string; sector: string; subSector: string; facility: string;
  specifications: Record<string, { value: string | number; unit?: string }>;
  standards: string[]; manufacturers: string[];
  metadata: { version: number; validationScore: number; source: string; createdAt: string; updatedAt: string };
}

interface PaginatedResult { items: EquipmentCard[]; total: number; page: number; pageSize: number; totalPages: number }

const CATEGORIES = ['', 'rotating', 'static', 'instrumentation', 'electrical', 'piping'];

export default function EquipmentPage() {
  const [result, setResult] = useState<PaginatedResult>({ items: [], total: 0, page: 1, pageSize: 50, totalPages: 0 });
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sector, setSector] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<EquipmentCard | null>(null);

  const loadEquipment = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set('q', search);
    if (category) params.set('category', category);
    if (sector) params.set('sector', sector);
    params.set('page', String(page));
    params.set('pageSize', '50');
    try {
      const res = await fetch(`/api/equipment?${params}`);
      const data = await res.json();
      setResult(data.data || { items: [], total: 0, page: 1, pageSize: 50, totalPages: 0 });
    } catch {} finally { setLoading(false); }
  }, [search, category, sector, page]);

  useEffect(() => { loadEquipment(); }, [loadEquipment]);

  async function deleteCard(card: EquipmentCard) {
    if (!confirm(`Delete ${card.tag}?`)) return;
    await fetch(`/api/equipment/${card.sector}/${card.subSector}/${card.facility}/${card.tag}`, { method: 'DELETE' });
    loadEquipment();
    if (selected?.id === card.id) setSelected(null);
  }

  const categoryColor: Record<string, string> = {
    rotating: 'badge-blue', static: 'badge-green', instrumentation: 'badge-yellow', electrical: 'badge-purple', piping: 'badge-red',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Equipment Library</h2>
        <p className="text-gray-400 text-sm">{result.total} equipment cards</p>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input className="input" placeholder="Search equipment..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
          <select className="input" value={category} onChange={e => { setCategory(e.target.value); setPage(1); }}>
            <option value="">All Categories</option>
            {CATEGORIES.filter(Boolean).map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <input className="input" placeholder="Sector code (e.g. ENER)" value={sector} onChange={e => { setSector(e.target.value); setPage(1); }} />
          <button onClick={loadEquipment} className="btn-primary">Search</button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Equipment List */}
        <div className="flex-1">
          {loading ? (
            <div className="text-center text-gray-400 py-8">Loading equipment...</div>
          ) : result.items.length === 0 ? (
            <div className="text-center text-gray-400 py-8">No equipment found. Use the Pipeline to generate equipment cards.</div>
          ) : (
            <>
              <div className="space-y-2">
                {result.items.map(card => (
                  <div key={card.id} onClick={() => setSelected(card)} className={`card cursor-pointer flex items-center justify-between py-3 ${selected?.id === card.id ? 'border-blue-500' : ''}`}>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-mono text-sm font-semibold text-white">{card.tag}</div>
                        <div className="text-xs text-gray-400">{card.displayName}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={categoryColor[card.category] || 'badge-blue'}>{card.category}</span>
                      <span className="text-xs text-gray-500">{card.sector}/{card.subSector}</span>
                      <span className="text-xs text-gray-500">v{card.metadata.version}</span>
                      <span className={`text-xs ${card.metadata.validationScore >= 70 ? 'text-green-400' : card.metadata.validationScore >= 40 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {card.metadata.validationScore}%
                      </span>
                      <button onClick={e => { e.stopPropagation(); deleteCard(card); }} className="text-gray-500 hover:text-red-400 text-xs ml-2">&#x2715;</button>
                    </div>
                  </div>
                ))}
              </div>
              {result.totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                  <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1} className="btn-secondary text-sm">&larr; Prev</button>
                  <span className="text-sm text-gray-400 py-2">Page {page} of {result.totalPages}</span>
                  <button onClick={() => setPage(p => Math.min(result.totalPages, p + 1))} disabled={page >= result.totalPages} className="btn-secondary text-sm">Next &rarr;</button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Detail Panel */}
        {selected && (
          <div className="w-96 card sticky top-20 self-start max-h-[calc(100vh-120px)] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white font-mono">{selected.tag}</h3>
              <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-white">&#x2715;</button>
            </div>
            <div className="space-y-3 text-sm">
              <div><span className="text-gray-500">Name:</span> <span className="text-white">{selected.displayName}</span></div>
              <div><span className="text-gray-500">Class:</span> <span className="text-white">{selected.componentClass}</span></div>
              <div><span className="text-gray-500">Category:</span> <span className={categoryColor[selected.category] || ''}>{selected.category}</span></div>
              <div><span className="text-gray-500">Location:</span> <span className="text-white">{selected.sector} / {selected.subSector} / {selected.facility}</span></div>
              <div><span className="text-gray-500">Source:</span> <span className="text-white">{selected.metadata.source}</span></div>
              <div><span className="text-gray-500">Score:</span> <span className="text-white">{selected.metadata.validationScore}%</span></div>
              <p className="text-gray-400">{selected.description}</p>

              {Object.keys(selected.specifications).length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-400 uppercase mb-1">Specifications</h4>
                  {Object.entries(selected.specifications).map(([key, spec]) => (
                    <div key={key} className="flex justify-between text-xs py-0.5">
                      <span className="text-gray-500">{key}</span>
                      <span className="text-gray-200">{spec.value}{spec.unit ? ` ${spec.unit}` : ''}</span>
                    </div>
                  ))}
                </div>
              )}

              {selected.standards.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-400 uppercase mb-1">Standards</h4>
                  <div className="flex flex-wrap gap-1">{selected.standards.map(s => <span key={s} className="badge-blue text-xs">{s}</span>)}</div>
                </div>
              )}

              {selected.manufacturers.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-400 uppercase mb-1">Manufacturers</h4>
                  <div className="flex flex-wrap gap-1">{selected.manufacturers.map(m => <span key={m} className="badge-purple text-xs">{m}</span>)}</div>
                </div>
              )}

              <div className="text-xs text-gray-600 pt-2 border-t border-gray-800">
                Created: {new Date(selected.metadata.createdAt).toLocaleDateString()} &middot; Updated: {new Date(selected.metadata.updatedAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
