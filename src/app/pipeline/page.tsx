'use client';

/**
 * Equipment Card Factory — Pipeline Page.
 *
 * Users input equipment names (type, paste, or CSV upload) and the system:
 * 1. Checks the database for existing cards
 * 2. Shows existing vs missing split
 * 3. Runs the 6-stage V2 pipeline for missing items
 * 4. Stores generated DEXPI 2.0-compliant cards
 *
 * @module app/pipeline/page
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Types ─────────────────────────────────────────────────────────────── */

interface V2StageStatus {
  status: string;
  startedAt?: string;
  completedAt?: string;
  message?: string;
}

interface PipelineRun {
  runId: string;
  status: string;
  params: {
    sector: string;
    subSector: string;
    facility: string;
    equipmentClass: string;
    quantity: number;
  };
  stages: Record<string, V2StageStatus>;
  results: {
    researched: boolean;
    generated: number;
    validated: number;
    enriched: number;
    approved: number;
    written: number;
    duplicatesSkipped: number;
    averageScore: number;
  };
  createdAt: string;
  completedAt?: string;
}

interface ExistingItem {
  name: string;
  id: string;
  tag: string;
  componentClass: string;
  displayName: string;
}

interface BatchCheckResult {
  existing: ExistingItem[];
  missing: string[];
  total: number;
  existingCount: number;
  missingCount: number;
}

type WizardStep = 'input' | 'check' | 'running' | 'complete';

/* ─── Constants ──────────────────────────────────────────────────────────── */

const STAGE_ORDER = ['research', 'generate', 'validate', 'enrich', 'quality-gate', 'write'] as const;
const STAGE_LABELS: Record<string, string> = {
  research: 'Research',
  generate: 'Generate',
  validate: 'Validate',
  enrich: 'Enrich',
  'quality-gate': 'Quality',
  write: 'Store',
};
const STAGE_ICONS: Record<string, string> = {
  research: '🔍',
  generate: '⚙️',
  validate: '✅',
  enrich: '🧬',
  'quality-gate': '🛡️',
  write: '💾',
};
const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-white/[0.06]',
  running: 'bg-orange-500/80 animate-pulse',
  completed: 'bg-green-600',
  failed: 'bg-red-600',
  skipped: 'bg-gray-700',
};

/* ─── Helpers ────────────────────────────────────────────────────────────── */

/**
 * Parses raw text into equipment names.
 * Splits on commas, newlines, semicolons, and pipes.
 *
 * @param raw - Raw text input.
 * @returns Deduplicated, trimmed equipment names.
 */
function parseEquipmentNames(raw: string): string[] {
  return [...new Set(
    raw
      .split(/[,;\n|]+/)
      .map(s => s.trim())
      .filter(s => s.length > 0)
  )];
}

/**
 * Parses CSV file content into equipment names.
 * Takes the first column from each row.
 *
 * @param content - CSV file text content.
 * @returns Deduplicated equipment names.
 */
function parseCSV(content: string): string[] {
  const lines = content.split('\n').filter(l => l.trim());
  const names: string[] = [];
  for (const line of lines) {
    // Skip header rows that look like column names
    const first = line.split(',')[0].trim().replace(/^["']|["']$/g, '');
    if (first && !/^(equipment|name|item|type|class|#)/i.test(first)) {
      names.push(first);
    }
  }
  return [...new Set(names)];
}

/* ─── Component ──────────────────────────────────────────────────────────── */

export default function PipelinePage() {
  // Wizard state
  const [step, setStep] = useState<WizardStep>('input');
  const [inputText, setInputText] = useState('');
  const [equipmentNames, setEquipmentNames] = useState<string[]>([]);
  const [sectorHint, setSectorHint] = useState('');
  const [checkResult, setCheckResult] = useState<BatchCheckResult | null>(null);
  const [checking, setChecking] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  // Pipeline state
  const [activeRun, setActiveRun] = useState<PipelineRun | null>(null);
  const [runs, setRuns] = useState<PipelineRun[]>([]);

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load run history on mount
  useEffect(() => {
    loadRuns();
  }, []);

  /** Loads V2 run history. */
  async function loadRuns() {
    try {
      const res = await fetch('/api/agents/pipeline');
      const data = await res.json();
      setRuns(data.runs || []);
    } catch {
      console.error('[pipeline] Failed to load runs');
    }
  }

  /** Poll active run status. */
  useEffect(() => {
    if (!activeRun || ['completed', 'failed', 'cancelled'].includes(activeRun.status)) return;
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/agents/pipeline?runId=${activeRun.runId}`);
        const data = await res.json();
        if (data.run) {
          setActiveRun(data.run);
          if (['completed', 'failed'].includes(data.run.status)) {
            setStep('complete');
            loadRuns();
          }
        }
      } catch {
        console.error('[pipeline] Poll error');
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [activeRun]);

  /** Add chip from input text. */
  const addFromInput = useCallback(() => {
    const names = parseEquipmentNames(inputText);
    if (names.length > 0) {
      setEquipmentNames(prev => [...new Set([...prev, ...names])]);
      setInputText('');
    }
  }, [inputText]);

  /** Remove a chip. */
  function removeChip(name: string) {
    setEquipmentNames(prev => prev.filter(n => n !== name));
  }

  /** Handle file upload (CSV or TXT). */
  function handleFileUpload(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const names = file.name.endsWith('.csv') ? parseCSV(text) : parseEquipmentNames(text);
      setEquipmentNames(prev => [...new Set([...prev, ...names])]);
    };
    reader.readAsText(file);
  }

  /** Handle drag and drop. */
  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    files.forEach(f => {
      if (f.name.endsWith('.csv') || f.name.endsWith('.txt')) {
        handleFileUpload(f);
      }
    });
  }

  /** Step 1 → 2: Check database for existing equipment. */
  async function checkEquipment() {
    if (equipmentNames.length === 0) return;
    setChecking(true);
    try {
      const res = await fetch('/api/pipeline/batch-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: equipmentNames }),
      });
      const data = await res.json();
      if (data.success) {
        setCheckResult(data.data);
        setStep('check');
      }
    } catch (err) {
      console.error('[pipeline] Batch check failed:', err);
    } finally {
      setChecking(false);
    }
  }

  /** Step 2 → 3: Submit batch pipeline run for missing items. */
  async function submitBatchRun() {
    if (!checkResult || checkResult.missing.length === 0) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/agents/pipeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          equipmentNames: checkResult.missing,
          sectorHint: sectorHint || undefined,
        }),
      });
      const data = await res.json();
      if (data.success && data.runId) {
        // Fetch the initial run state
        const runRes = await fetch(`/api/agents/pipeline?runId=${data.runId}`);
        const runData = await runRes.json();
        setActiveRun(runData.run || {
          runId: data.runId, status: 'queued',
          params: { sector: 'STANDALONE', subSector: 'STANDALONE', facility: 'STANDALONE', equipmentClass: checkResult.missing[0], quantity: checkResult.missing.length },
          stages: {}, results: { researched: false, generated: 0, validated: 0, enriched: 0, approved: 0, written: 0, duplicatesSkipped: 0, averageScore: 0 },
          createdAt: new Date().toISOString(),
        });
        setStep('running');
      }
    } catch (err) {
      console.error('[pipeline] Submit failed:', err);
    } finally {
      setSubmitting(false);
    }
  }

  /** Cancel a run. */
  async function cancelRun(runId: string) {
    await fetch(`/api/agents/pipeline?runId=${runId}`, { method: 'DELETE' });
    if (activeRun?.runId === runId) {
      const res = await fetch(`/api/agents/pipeline?runId=${runId}`);
      const data = await res.json();
      setActiveRun(data.run || null);
    }
    loadRuns();
  }

  /** Reset wizard to start over. */
  function resetWizard() {
    setStep('input');
    setEquipmentNames([]);
    setInputText('');
    setCheckResult(null);
    setActiveRun(null);
    setSectorHint('');
  }

  /** Get ordered stages array. */
  function getStagesArray(stages: Record<string, V2StageStatus>) {
    return STAGE_ORDER.map(name => ({
      name,
      label: STAGE_LABELS[name],
      status: stages[name]?.status || 'pending',
      message: stages[name]?.message,
    }));
  }

  /* ─── Render ──────────────────────────────────────────────────────────── */

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Header ───────────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white font-heading">
              Equipment Card Factory
              <span className="text-xs text-orange-500 font-normal ml-2">DEXPI 2.0</span>
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Input equipment names → Check database → Generate DEXPI 2.0 compliant cards
            </p>
          </div>
          {step !== 'input' && (
            <button onClick={resetWizard} className="text-sm text-gray-400 hover:text-white transition-colors">
              ← Start Over
            </button>
          )}
        </div>

        {/* ── Wizard Steps Indicator ─────────────────────────── */}
        <div className="flex items-center gap-2 mb-8">
          {(['input', 'check', 'running', 'complete'] as WizardStep[]).map((s, i) => (
            <div key={s} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
                ${step === s ? 'bg-orange-500 text-white scale-110' :
                  (['input', 'check', 'running', 'complete'].indexOf(step) > i ? 'bg-green-600 text-white' : 'bg-white/[0.06] text-gray-500')}`}>
                {['input', 'check', 'running', 'complete'].indexOf(step) > i ? '✓' : i + 1}
              </div>
              {i < 3 && <div className={`w-12 h-0.5 ${['input', 'check', 'running', 'complete'].indexOf(step) > i ? 'bg-green-600' : 'bg-white/[0.06]'}`} />}
            </div>
          ))}
          <span className="text-xs text-gray-500 ml-2">
            {step === 'input' ? 'Input Equipment' : step === 'check' ? 'Review Results' : step === 'running' ? 'Pipeline Running' : 'Complete'}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* ── Main Panel (3/5) ──────────────────────────────── */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">

              {/* ── STEP 1: Input ─────────────────────────────── */}
              {step === 'input' && (
                <motion.div key="input" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="card">
                  <h3 className="text-lg font-semibold text-white mb-1 font-heading">Enter Equipment</h3>
                  <p className="text-xs text-gray-500 mb-5">Type names, paste a list, or upload a CSV file</p>

                  {/* Text Input + Add */}
                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      className="input flex-1"
                      placeholder="e.g. Centrifugal Pump, Heat Exchanger, Pressure Vessel..."
                      value={inputText}
                      onChange={e => setInputText(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addFromInput(); } }}
                    />
                    <button onClick={addFromInput} disabled={!inputText.trim()} className="btn-primary px-4 whitespace-nowrap">
                      + Add
                    </button>
                  </div>

                  {/* File Drop Zone */}
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center mb-4 transition-all cursor-pointer
                      ${dragOver ? 'border-orange-500 bg-orange-500/5' : 'border-white/[0.08] hover:border-white/[0.15]'}`}
                    onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".csv,.txt"
                      className="hidden"
                      onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file);
                      }}
                    />
                    <div className="text-2xl mb-2">📄</div>
                    <p className="text-sm text-gray-400">
                      {dragOver ? 'Drop file here...' : 'Drop a CSV or TXT file here, or click to browse'}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">Accepts .csv and .txt files</p>
                  </div>

                  {/* Sector Hint (Optional) */}
                  <div className="mb-4">
                    <label className="text-xs text-gray-400 mb-1.5 block font-medium tracking-wide uppercase">
                      Sector Hint <span className="text-gray-600">(optional — improves research accuracy)</span>
                    </label>
                    <input
                      type="text"
                      className="input"
                      placeholder="e.g. Chemical, Energy, Water..."
                      value={sectorHint}
                      onChange={e => setSectorHint(e.target.value)}
                    />
                  </div>

                  {/* Equipment Chips */}
                  {equipmentNames.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                          Equipment List ({equipmentNames.length})
                        </span>
                        <button onClick={() => setEquipmentNames([])} className="text-xs text-red-400 hover:text-red-300 transition-colors">
                          Clear All
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <AnimatePresence>
                          {equipmentNames.map(name => (
                            <motion.span
                              key={name}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.06] rounded-full text-sm text-white border border-white/[0.08]"
                            >
                              {name}
                              <button onClick={() => removeChip(name)} className="text-gray-500 hover:text-red-400 transition-colors text-lg leading-none">×</button>
                            </motion.span>
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>
                  )}

                  {/* Check & Generate Button */}
                  <button
                    onClick={checkEquipment}
                    disabled={equipmentNames.length === 0 || checking}
                    className="btn-primary w-full text-base py-3"
                  >
                    {checking ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="animate-spin">⏳</span> Checking database...
                      </span>
                    ) : (
                      `🔍 Check ${equipmentNames.length} item${equipmentNames.length !== 1 ? 's' : ''} in Database`
                    )}
                  </button>
                </motion.div>
              )}

              {/* ── STEP 2: Check Results ─────────────────────── */}
              {step === 'check' && checkResult && (
                <motion.div key="check" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="card">
                  <h3 className="text-lg font-semibold text-white mb-1 font-heading">Database Check Results</h3>
                  <p className="text-xs text-gray-500 mb-5">
                    {checkResult.total} items checked · {checkResult.existingCount} found · {checkResult.missingCount} need generation
                  </p>

                  {/* Existing Items */}
                  {checkResult.existing.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-green-400 mb-2 flex items-center gap-1.5">
                        <span>✅</span> Already in Database ({checkResult.existing.length})
                      </h4>
                      <div className="space-y-1.5">
                        {checkResult.existing.map(item => (
                          <div key={item.id} className="flex items-center justify-between p-2.5 bg-green-900/10 border border-green-800/20 rounded-lg">
                            <div>
                              <span className="text-sm text-white">{item.displayName || item.name}</span>
                              <span className="text-xs text-gray-500 ml-2">{item.tag}</span>
                            </div>
                            <span className="text-xs text-green-500 font-mono">{item.componentClass}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Missing Items */}
                  {checkResult.missing.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-orange-400 mb-2 flex items-center gap-1.5">
                        <span>🔨</span> Will Be Generated ({checkResult.missing.length})
                      </h4>
                      <div className="space-y-1.5">
                        {checkResult.missing.map(name => (
                          <div key={name} className="flex items-center p-2.5 bg-orange-900/10 border border-orange-800/20 rounded-lg">
                            <span className="text-sm text-white">{name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3 mt-5">
                    <button onClick={() => setStep('input')} className="btn-ghost flex-1">
                      ← Edit List
                    </button>
                    {checkResult.missing.length > 0 ? (
                      <button onClick={submitBatchRun} disabled={submitting} className="btn-primary flex-1 text-base py-3">
                        {submitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <span className="animate-spin">⏳</span> Submitting...
                          </span>
                        ) : (
                          `🚀 Generate ${checkResult.missing.length} Card${checkResult.missing.length !== 1 ? 's' : ''}`
                        )}
                      </button>
                    ) : (
                      <button onClick={resetWizard} className="btn-primary flex-1 py-3">
                        ✅ All items exist — Done
                      </button>
                    )}
                  </div>
                </motion.div>
              )}

              {/* ── STEP 3: Pipeline Running ──────────────────── */}
              {(step === 'running' || step === 'complete') && activeRun && (
                <motion.div key="running" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="card">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white font-heading">
                      {activeRun.status === 'completed' ? '✅ Pipeline Complete' :
                        activeRun.status === 'failed' ? '❌ Pipeline Failed' :
                          '⚡ Pipeline Running'}
                    </h3>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium
                      ${activeRun.status === 'completed' ? 'bg-green-900/30 text-green-400 border border-green-800/30' :
                        activeRun.status === 'running' ? 'bg-orange-900/30 text-orange-400 border border-orange-800/30' :
                          activeRun.status === 'failed' ? 'bg-red-900/30 text-red-400 border border-red-800/30' :
                            'bg-white/[0.06] text-gray-400'}`}>
                      {activeRun.status}
                    </span>
                  </div>

                  {/* Stage Progress */}
                  <div className="flex items-center gap-1 mb-5">
                    {getStagesArray(activeRun.stages).map((stage, i) => (
                      <div key={stage.name} className="flex items-center flex-1">
                        <div className="flex flex-col items-center flex-1">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-lg mb-1 ${STATUS_COLORS[stage.status] || 'bg-white/[0.06]'}`}
                            title={`${stage.label}: ${stage.status}${stage.message ? ` — ${stage.message}` : ''}`}
                          >
                            {STAGE_ICONS[stage.name]}
                          </div>
                          <span className="text-[10px] text-gray-500 uppercase tracking-tight">{stage.label}</span>
                        </div>
                        {i < STAGE_ORDER.length - 1 && (
                          <div className={`w-full h-0.5 -mt-4 ${stage.status === 'completed' ? 'bg-green-600' : 'bg-white/[0.06]'}`} />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Result Metrics */}
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    <div className="p-3 bg-white/[0.03] rounded-lg text-center">
                      <div className="text-xl font-bold text-orange-400">{activeRun.results.generated}</div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-tight">Generated</div>
                    </div>
                    <div className="p-3 bg-white/[0.03] rounded-lg text-center">
                      <div className="text-xl font-bold text-green-400">{activeRun.results.averageScore ?? 0}%</div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-tight">Avg Score</div>
                    </div>
                    <div className="p-3 bg-white/[0.03] rounded-lg text-center">
                      <div className="text-xl font-bold text-purple-400">{activeRun.results.approved}</div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-tight">Approved</div>
                    </div>
                    <div className="p-3 bg-white/[0.03] rounded-lg text-center">
                      <div className="text-xl font-bold text-blue-400">{activeRun.results.written}</div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-tight">Stored</div>
                    </div>
                  </div>

                  {/* Live Log */}
                  <div className="bg-[#050507] rounded-lg p-3 max-h-64 overflow-y-auto font-mono text-xs">
                    {getStagesArray(activeRun.stages)
                      .filter(s => s.message || s.status !== 'pending')
                      .map((stage, i) => (
                        <div key={i} className={`py-0.5 ${stage.status === 'failed' ? 'text-red-400' :
                            stage.status === 'running' ? 'text-yellow-400' :
                              stage.status === 'completed' ? 'text-green-400' :
                                'text-gray-500'}`}>
                          <span className="text-gray-600">[{stage.label}]</span> {stage.message || stage.status}
                        </div>
                      ))}
                    {getStagesArray(activeRun.stages).every(s => s.status === 'pending') && (
                      <div className="text-gray-600">Waiting for pipeline to start...</div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-4">
                    {activeRun.status === 'running' && (
                      <button onClick={() => cancelRun(activeRun.runId)} className="btn-ghost text-red-400 border-red-800/30 hover:bg-red-900/20">
                        Cancel Run
                      </button>
                    )}
                    {['completed', 'failed', 'cancelled'].includes(activeRun.status) && (
                      <button onClick={resetWizard} className="btn-primary flex-1 py-3">
                        🔄 Start New Batch
                      </button>
                    )}
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* ── Side Panel (2/5) ─────────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Quick Stats */}
            <div className="card">
              <h3 className="text-sm font-semibold text-white mb-3 font-heading uppercase tracking-wide">Factory Stats</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-white/[0.03] rounded-lg text-center">
                  <div className="text-2xl font-bold text-orange-400">{equipmentNames.length}</div>
                  <div className="text-[10px] text-gray-500 uppercase">Queue</div>
                </div>
                <div className="p-3 bg-white/[0.03] rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-400">{runs.filter(r => r.status === 'completed').length}</div>
                  <div className="text-[10px] text-gray-500 uppercase">Runs Done</div>
                </div>
              </div>
            </div>

            {/* Run History */}
            <div className="card">
              <h3 className="text-sm font-semibold text-white mb-3 font-heading uppercase tracking-wide">Run History</h3>
              {runs.length > 0 ? (
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {runs.slice(0, 10).map(run => (
                    <div
                      key={run.runId}
                      onClick={() => { setActiveRun(run); setStep(run.status === 'completed' || run.status === 'failed' ? 'complete' : 'running'); }}
                      className="flex items-center justify-between p-2.5 bg-white/[0.03] rounded-lg cursor-pointer hover:bg-white/[0.05] transition-colors"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${run.status === 'completed' ? 'bg-green-500' :
                            run.status === 'failed' ? 'bg-red-500' :
                              run.status === 'running' ? 'bg-orange-500 animate-pulse' :
                                'bg-gray-500'}`}
                        />
                        <span className="text-sm text-white truncate">{run.params.equipmentClass}</span>
                      </div>
                      <div className="text-[10px] text-gray-500 whitespace-nowrap ml-2">
                        {run.results.written}w · {new Date(run.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-600 text-center py-4">No runs yet</p>
              )}
            </div>

            {/* Help */}
            <div className="card">
              <h3 className="text-sm font-semibold text-white mb-3 font-heading uppercase tracking-wide">How It Works</h3>
              <div className="space-y-3 text-xs text-gray-400">
                <div className="flex gap-2">
                  <span className="text-orange-500 font-bold flex-shrink-0">1.</span>
                  <span>Enter equipment names — type them, paste a comma-separated list, or upload a CSV file</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-orange-500 font-bold flex-shrink-0">2.</span>
                  <span>We check the database to see which already exist and which are new</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-orange-500 font-bold flex-shrink-0">3.</span>
                  <span>The AI pipeline researches, generates, validates, enriches, and stores DEXPI 2.0-compliant equipment cards</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-orange-500 font-bold flex-shrink-0">4.</span>
                  <span>Cards are stored for later use and can be assigned to facilities</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}
