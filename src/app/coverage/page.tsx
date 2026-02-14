'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface CoverageReport {
  sector: string; subSector: string; facility: string;
  expectedTypes: string[]; existingTypes: string[]; missingTypes: string[];
  coveragePercent: number;
}

interface CoverageSummary { totalExpected: number; totalExisting: number; overallCoverage: number; totalFacilities: number }

export default function CoveragePage() {
  const [reports, setReports] = useState<CoverageReport[]>([]);
  const [summary, setSummary] = useState<CoverageSummary>({ totalExpected: 0, totalExisting: 0, overallCoverage: 0, totalFacilities: 0 });
  const [sectors, setSectors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sectorFilter, setSectorFilter] = useState('');

  useEffect(() => {
    fetch('/api/sectors').then(r => r.json()).then(d => setSectors(d.data || []));
  }, []);

  useEffect(() => { loadCoverage(); }, [sectorFilter]);

  async function loadCoverage() {
    setLoading(true);
    try {
      const params = sectorFilter ? `?sector=${sectorFilter}` : '';
      const res = await fetch(`/api/coverage${params}`);
      const data = await res.json();
      setReports(data.data?.reports || []);
      setSummary(data.data?.summary || { totalExpected: 0, totalExisting: 0, overallCoverage: 0, totalFacilities: 0 });
    } catch { } finally { setLoading(false); }
  }

  const coverageColor = (pct: number) => pct >= 80 ? 'text-green-400' : pct >= 50 ? 'text-yellow-400' : pct > 0 ? 'text-orange-400' : 'text-red-400';
  const barColor = (pct: number) => pct >= 80 ? 'bg-green-500' : pct >= 50 ? 'bg-yellow-500' : pct > 0 ? 'bg-orange-500' : 'bg-red-500';

  // Group by sector
  const grouped = reports.reduce<Record<string, CoverageReport[]>>((acc, r) => {
    (acc[r.sector] = acc[r.sector] || []).push(r);
    return acc;
  }, {});

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white font-heading">Equipment Coverage Analysis</h2>
            <p className="text-gray-400 text-sm">Gap analysis across sectors and facilities</p>
          </div>
          <select className="input w-64" value={sectorFilter} onChange={e => setSectorFilter(e.target.value)}>
            <option value="">All Sectors</option>
            {sectors.map(s => <option key={s.code} value={s.code}>{s.code} — {s.name}</option>)}
          </select>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="card text-center">
            <div className={`text-3xl font-bold ${coverageColor(summary.overallCoverage)}`}>{summary.overallCoverage}%</div>
            <div className="text-sm text-gray-400">Overall Sector Coverage</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-accent-500">{summary.totalFacilities}</div>
            <div className="text-sm text-gray-400">Reference Facilities</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-green-400">{summary.totalExisting}</div>
            <div className="text-sm text-gray-400">Total Equipment</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-red-400">{summary.totalExpected - summary.totalExisting}</div>
            <div className="text-sm text-gray-400">Missing Types</div>
          </div>
        </div>

        {loading ? (
          <div className="text-center text-gray-400 py-8">Analyzing coverage...</div>
        ) : (
          <div className="space-y-6">
            {Object.entries(grouped).map(([sector, sectorReports]) => {
              const sectorExpected = sectorReports.reduce((s, r) => s + r.expectedTypes.length, 0);
              const sectorExisting = sectorReports.reduce((s, r) => s + r.existingTypes.length, 0);
              const sectorPct = sectorExpected > 0 ? Math.round((sectorExisting / sectorExpected) * 100) : 0;
              return (
                <div key={sector} className="card">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white font-heading">{sector}</h3>
                    <div className="flex items-center gap-3">
                      <div className="w-32 bg-white/[0.06] rounded-full h-2">
                        <div className={`h-2 rounded-full ${barColor(sectorPct)}`} style={{ width: `${sectorPct}%` }} />
                      </div>
                      <span className={`text-sm font-bold ${coverageColor(sectorPct)}`}>{sectorPct}%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {sectorReports.map((report, i) => (
                      <div key={i} className="flex items-center gap-3 p-2 bg-white/[0.02] rounded">
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-gray-300 truncate">{report.subSector} / {report.facility}</div>
                          {report.missingTypes.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {report.missingTypes.slice(0, 5).map(t => <span key={t} className="badge-red text-xs">{t}</span>)}
                              {report.missingTypes.length > 5 && <span className="text-xs text-gray-500">+{report.missingTypes.length - 5}</span>}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-white/[0.06] rounded-full h-1.5">
                            <div className={`h-1.5 rounded-full ${barColor(report.coveragePercent)}`} style={{ width: `${report.coveragePercent}%` }} />
                          </div>
                          <span className={`text-xs font-bold w-10 text-right ${coverageColor(report.coveragePercent)}`}>{report.coveragePercent}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}
