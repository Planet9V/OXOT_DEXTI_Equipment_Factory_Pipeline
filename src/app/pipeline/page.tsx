'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface StageStatus { name: string; status: string; startedAt?: string; completedAt?: string; message?: string }
interface LogEntry { timestamp: string; level: string; stage: string; message: string }
interface PipelineRun {
  id: string; sector: string; subSector: string; facility: string; equipmentClass: string;
  quantity: number; status: string; stages: StageStatus[]; createdAt: string; completedAt?: string;
  results: { generated: number; validated: number; stored: number; duplicatesSkipped: number };
  logs: LogEntry[];
}

interface Sector { code: string; name: string; icon: string; subSectors: { code: string; name: string; facilities: { code: string; name: string; equipment: { componentClass: string; displayName: string }[] }[] }[] }

const STAGE_ICONS: Record<string, string> = { research: '🔍', generate: '⚙️', validate: '✅', catalog: '📋', store: '💾' };
const STATUS_COLORS: Record<string, string> = { pending: 'bg-white/[0.06]', running: 'bg-accent-500 animate-pulse', completed: 'bg-green-600', failed: 'bg-red-600', skipped: 'bg-gray-600' };

export default function PipelinePage() {
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [runs, setRuns] = useState<PipelineRun[]>([]);
  const [activeRun, setActiveRun] = useState<PipelineRun | null>(null);
  const [form, setForm] = useState({ sector: '', subSector: '', facility: '', equipmentClass: '', quantity: 5 });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/sectors').then(r => r.json()).then(d => setSectors(d.data || []));
    loadRuns();
  }, []);

  async function loadRuns() {
    const res = await fetch('/api/pipeline');
    const data = await res.json();
    setRuns(data.data || []);
  }

  // Poll active run
  useEffect(() => {
    if (!activeRun || activeRun.status === 'completed' || activeRun.status === 'failed' || activeRun.status === 'cancelled') return;
    const interval = setInterval(async () => {
      const res = await fetch(`/api/pipeline/${activeRun.id}`);
      const data = await res.json();
      if (data.data) {
        setActiveRun(data.data);
        if (data.data.status === 'completed' || data.data.status === 'failed') {
          loadRuns();
        }
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [activeRun]);

  const selectedSector = sectors.find(s => s.code === form.sector);
  const selectedSub = selectedSector?.subSectors.find(s => s.code === form.subSector);
  const selectedFac = selectedSub?.facilities.find(f => f.code === form.facility);

  async function submitRun() {
    if (!form.sector || !form.subSector || !form.facility || !form.equipmentClass) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/pipeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.data?.runId) {
        const runRes = await fetch(`/api/pipeline/${data.data.runId}`);
        const runData = await runRes.json();
        setActiveRun(runData.data);
      }
    } catch {} finally { setSubmitting(false); }
  }

  async function cancelRun(runId: string) {
    await fetch(`/api/pipeline/${runId}`, { method: 'DELETE' });
    if (activeRun?.id === runId) {
      const res = await fetch(`/api/pipeline/${runId}`);
      const data = await res.json();
      setActiveRun(data.data);
    }
    loadRuns();
  }

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-white mb-6 font-heading">AI Equipment Pipeline</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Submit Form */}
          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-4 font-heading">Generate Equipment Cards</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Sector</label>
                <select className="input" value={form.sector} onChange={e => setForm({ ...form, sector: e.target.value, subSector: '', facility: '', equipmentClass: '' })}>
                  <option value="">Select sector...</option>
                  {sectors.map(s => <option key={s.code} value={s.code}>{s.icon} {s.code} — {s.name}</option>)}
                </select>
              </div>
              {selectedSector && (
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Sub-Sector</label>
                  <select className="input" value={form.subSector} onChange={e => setForm({ ...form, subSector: e.target.value, facility: '', equipmentClass: '' })}>
                    <option value="">Select sub-sector...</option>
                    {selectedSector.subSectors.map(s => <option key={s.code} value={s.code}>{s.code} — {s.name}</option>)}
                  </select>
                </div>
              )}
              {selectedSub && (
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Facility</label>
                  <select className="input" value={form.facility} onChange={e => setForm({ ...form, facility: e.target.value, equipmentClass: '' })}>
                    <option value="">Select facility...</option>
                    {selectedSub.facilities.map(f => <option key={f.code} value={f.code}>{f.code} — {f.name}</option>)}
                  </select>
                </div>
              )}
              {selectedFac && (
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Equipment Class</label>
                  <select className="input" value={form.equipmentClass} onChange={e => setForm({ ...form, equipmentClass: e.target.value })}>
                    <option value="">Select equipment...</option>
                    {selectedFac.equipment.map(eq => <option key={eq.componentClass} value={eq.componentClass}>{eq.displayName} ({eq.componentClass})</option>)}
                  </select>
                </div>
              )}
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Quantity</label>
                <input type="number" className="input" min={1} max={20} value={form.quantity} onChange={e => setForm({ ...form, quantity: Number(e.target.value) })} />
              </div>
              <button onClick={submitRun} disabled={submitting || !form.equipmentClass} className="btn-primary w-full">
                {submitting ? 'Submitting...' : 'Run Pipeline'}
              </button>
            </div>
          </div>

          {/* Active Run */}
          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-4 font-heading">
              {activeRun ? `Run: ${activeRun.id.slice(0, 8)}...` : 'Pipeline Status'}
            </h3>
            {activeRun ? (
              <div>
                {/* Stage Progress */}
                <div className="flex items-center gap-2 mb-4">
                  {activeRun.stages.map((stage, i) => (
                    <div key={stage.name} className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${STATUS_COLORS[stage.status] || 'bg-white/[0.06]'}`}>
                        {STAGE_ICONS[stage.name]}
                      </div>
                      {i < activeRun.stages.length - 1 && (
                        <div className={`w-8 h-0.5 ${stage.status === 'completed' ? 'bg-green-600' : 'bg-white/[0.06]'}`} />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`badge ${activeRun.status === 'completed' ? 'badge-green' : activeRun.status === 'running' ? 'badge-blue' : activeRun.status === 'failed' ? 'badge-red' : 'badge-yellow'}`}>
                    {activeRun.status}
                  </span>
                  <span className="text-xs text-gray-400">{activeRun.equipmentClass} × {activeRun.quantity}</span>
                  {activeRun.status === 'running' && (
                    <button onClick={() => cancelRun(activeRun.id)} className="btn-danger text-xs ml-auto">Cancel</button>
                  )}
                </div>
                {/* Results */}
                {activeRun.results.stored > 0 && (
                  <div className="grid grid-cols-4 gap-2 mb-3 text-center">
                    <div className="p-2 bg-white/[0.03] rounded"><div className="text-lg font-bold text-accent-500">{activeRun.results.generated}</div><div className="text-xs text-gray-500">Generated</div></div>
                    <div className="p-2 bg-white/[0.03] rounded"><div className="text-lg font-bold text-green-400">{activeRun.results.validated}</div><div className="text-xs text-gray-500">Validated</div></div>
                    <div className="p-2 bg-white/[0.03] rounded"><div className="text-lg font-bold text-purple-400">{activeRun.results.stored}</div><div className="text-xs text-gray-500">Stored</div></div>
                    <div className="p-2 bg-white/[0.03] rounded"><div className="text-lg font-bold text-yellow-400">{activeRun.results.duplicatesSkipped}</div><div className="text-xs text-gray-500">Skipped</div></div>
                  </div>
                )}
                {/* Logs */}
                <div className="bg-[#050507] rounded-lg p-3 max-h-64 overflow-y-auto font-mono text-xs">
                  {activeRun.logs.slice(-20).map((log, i) => (
                    <div key={i} className={`py-0.5 ${log.level === 'error' ? 'text-red-400' : log.level === 'warn' ? 'text-yellow-400' : 'text-gray-400'}`}>
                      <span className="text-gray-600">[{log.stage}]</span> {log.message}
                    </div>
                  ))}
                  {activeRun.logs.length === 0 && <div className="text-gray-600">Waiting for logs...</div>}
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">Submit a pipeline run to see progress here</div>
            )}
          </div>
        </div>

        {/* History */}
        {runs.length > 0 && (
          <div className="card mt-6">
            <h3 className="text-lg font-semibold text-white mb-4 font-heading">Run History</h3>
            <div className="space-y-2">
              {runs.slice(0, 10).map(run => (
                <div key={run.id} onClick={() => setActiveRun(run)} className="flex items-center justify-between p-3 bg-white/[0.03] rounded-lg cursor-pointer hover:bg-white/[0.05]">
                  <div className="flex items-center gap-3">
                    <span className={`badge ${run.status === 'completed' ? 'badge-green' : run.status === 'failed' ? 'badge-red' : 'badge-yellow'}`}>{run.status}</span>
                    <span className="text-sm text-white">{run.equipmentClass} × {run.quantity}</span>
                    <span className="text-xs text-gray-500">{run.sector}/{run.subSector}/{run.facility}</span>
                  </div>
                  <div className="text-xs text-gray-500">{run.results.stored} stored · {new Date(run.createdAt).toLocaleDateString()}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
