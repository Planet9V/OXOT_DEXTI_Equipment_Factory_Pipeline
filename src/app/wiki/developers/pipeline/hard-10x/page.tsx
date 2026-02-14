/**
 * "Hard 10x" Extraction Pipeline Documentation.
 *
 * Details the V3 architecture focused on high-fidelity PDF extraction using
 * State-of-the-Art (SOTA) vision models and agentic auditing.
 *
 * @module wiki/developers/pipeline/hard-10x/page
 */

'use client';

import {
    Cpu,
    ShieldCheck,
    Zap,
    Server,
    FileText,
    AlertTriangle
} from 'lucide-react';

export default function Hard10xPipelinePage() {
    const lastUpdated = new Date().toISOString().split('T')[0];

    return (
        <article className="max-w-5xl mx-auto space-y-12">

            {/* ── Header ───────────────────────────────────────────────────────── */}
            <header className="space-y-4 border-b border-white/[0.08] pb-8">
                <div className="flex items-center gap-3 text-oxot-orange mb-2">
                    <Cpu className="w-6 h-6" />
                    <span className="text-xs font-mono uppercase tracking-widest">Pipeline / V3 Extraction</span>
                </div>
                <h1 className="text-4xl font-heading font-bold text-white">
                    "Hard 10x" Extraction Architecture
                </h1>
                <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
                    A Swarm-based, agentic pipeline designed to achieve 10/10 extraction quality
                    by replacing legacy OCR with SOTA Vision Models (Marker/Surya) and Gemini 3.0 Pro.
                </p>
                <div className="flex items-center gap-4 text-xs font-mono text-gray-500 pt-2">
                    <span>v3.0.0-beta</span>
                    <span>•</span>
                    <span>Last Updated: {lastUpdated}</span>
                </div>
            </header>

            {/* ── Core Concept ─────────────────────────────────────────────────── */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h2 className="text-2xl font-heading font-bold text-white">The Quality Imperative</h2>
                    <p className="text-gray-400 leading-relaxed">
                        Traditional OCR (Tesseract) fails on complex engineering documents—tables break,
                        diagrams are ignored, and semantic hierarchy is lost.
                    </p>
                    <p className="text-gray-400 leading-relaxed">
                        The <strong>"Hard 10x"</strong> initiative pivots to <strong>Vision-First</strong> extraction.
                        Instead of reading text characters, we use Deep Learning models to "see" the page layout,
                        identifying tables, headers, and figures before extraction.
                    </p>
                </div>
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-4">
                    <h3 className="font-bold text-white flex items-center gap-2">
                        <Zap className="w-5 h-5 text-oxot-orange" />
                        Technological Shift
                    </h3>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3 text-sm text-gray-300">
                            <span className="text-red-400">❌ V1/V2 (Legacy)</span>
                            <span>Tesseract OCR + Regex heuristics. Fast but brittle.</span>
                        </li>
                        <li className="flex items-start gap-3 text-sm text-gray-300">
                            <span className="text-green-400">✅ V3 (Hard 10x)</span>
                            <span>Marker (Surya/YOLO) or Gemini 3.0 Vision. Slow/Costly but perfect.</span>
                        </li>
                    </ul>
                </div>
            </section>

            {/* ── Architecture Diagram ─────────────────────────────────────────── */}
            <section className="space-y-6">
                <h2 className="text-2xl font-heading font-bold text-white">Swarm Architecture</h2>
                <div className="p-6 rounded-xl border border-white/[0.06] bg-[#0d1117] overflow-x-auto">
                    <pre className="font-mono text-xs text-gray-400 leading-normal">{`
┌───────────────────────────────────────────────────────────────────────────────┐
│                           Swarm Controller (Batch)                            │
│                       (orchestrates the entire fleet)                         │
└───────┬───────────────────────────────────────────────────────────────┬───────┘
        │                                                               │
        ▼                                                               ▼
┌───────────────────────────────┐                       ┌───────────────────────────────┐
│       1. Extraction Agent     │                       │        2. Auditor Agent       │
│     (The "Heavy Lifter")      │                       │     (The "Hard-to-Please")    │
│                               │                       │                               │
│  [ Strategy A: Local cpu ]    │                       │  Criteria:                    │
│  • Tool: Marker (Surya/YOLO)  │                       │  • Table Integrity Check      │
│  • Hardware: CPU (Slow)       │──────────────────────▶│  • Garbage Ratio < 5%         │
│                               │    Markdown File      │  • Heading Hierarchy (H1>H2)  │
│  [ Strategy B: Cloud API ]    │                       │                               │
│  • Tool: Gemini 3.0 Vision    │                       │  Action:                      │
│  • Hardware: Google TPU       │                       │  • PASS -> Save to Graph      │
│                               │                       │  • FAIL -> Retry / Quarantine │
└───────────────────────────────┘                       └───────────────────────────────┘
                    `}</pre>
                </div>
            </section>

            {/* ── Component Deep Dive ──────────────────────────────────────────── */}
            <section className="space-y-8">
                <h2 className="text-2xl font-heading font-bold text-white">Component Deep Dive</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Swarm Controller */}
                    <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.01]">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                            <Server className="w-5 h-5 text-blue-400" />
                        </div>
                        <h3 className="font-bold text-white mb-2">Swarm Controller</h3>
                        <p className="text-sm text-gray-400 mb-4 h-20">
                            The batch orchestrator (`swarm_batch.py`) scans directories, deduplicates files by MD5,
                            and assigns them to agent workers.
                        </p>
                        <code className="text-xs bg-black/30 px-2 py-1 rounded text-blue-300">
                            src: /convert/swarm_batch.py
                        </code>
                    </div>

                    {/* Marker Agent */}
                    <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.01]">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                            <FileText className="w-5 h-5 text-purple-400" />
                        </div>
                        <h3 className="font-bold text-white mb-2">Marker / Vision Agent</h3>
                        <p className="text-sm text-gray-400 mb-4 h-20">
                            Uses semantic analysis to convert PDF to Markdown. Detects equations, tables,
                            and code blocks with high precision.
                        </p>
                        <code className="text-xs bg-black/30 px-2 py-1 rounded text-purple-300">
                            tool: marker-pdf / google-genai
                        </code>
                    </div>

                    {/* Auditor Agent */}
                    <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.01]">
                        <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center mb-4">
                            <ShieldCheck className="w-5 h-5 text-red-400" />
                        </div>
                        <h3 className="font-bold text-white mb-2">Auditor Agent</h3>
                        <p className="text-sm text-gray-400 mb-4 h-20">
                            A rigorous, logic-based critic. It parses the output Markdown and applies
                            strict quality heuristics to reject failures.
                        </p>
                        <code className="text-xs bg-black/30 px-2 py-1 rounded text-red-300">
                            src: /convert/auditor.py
                        </code>
                    </div>
                </div>
            </section>

            {/* ── Operational Status ──────────────────────────────────────────── */}
            <section className="p-6 rounded-xl border border-yellow-500/20 bg-yellow-500/5">
                <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-yellow-500/10 text-yellow-400">
                        <AlertTriangle className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white mb-2">Operational Note: CPU vs API</h3>
                        <div className="space-y-2 text-sm text-gray-400 max-w-3xl">
                            <p>
                                <strong>Local CPU Mode (Marker):</strong> Free but extremely slow (~15 mins/file).
                                Recommended only for small batches or offline privacy.
                            </p>
                            <p>
                                <strong>Gemini Vision Mode:</strong> Fast (~10s/file) but requires an API Key.
                                Recommended for the full 206-file dataset.
                            </p>
                        </div>
                        <div className="mt-4 p-3 rounded bg-black/30 font-mono text-xs text-yellow-200">
                            export GOOGLE_API_KEY="AIza..."
                        </div>
                    </div>
                </div>
            </section>

        </article>
    );
}
