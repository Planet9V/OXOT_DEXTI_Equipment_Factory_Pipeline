/**
 * Troubleshooting & Support Guide.
 *
 * Common issues, error codes, and log locations for the DEXTI Equipment Factory.
 *
 * @module wiki/developers/troubleshooting/page
 */

'use client';

import {
    AlertTriangle,
    Terminal,
    FileText,
    HelpCircle
} from 'lucide-react';

export default function TroubleshootingPage() {
    const lastUpdated = new Date().toISOString().split('T')[0];

    return (
        <article className="max-w-4xl mx-auto space-y-12">

            {/* ── Header ───────────────────────────────────────────────────────── */}
            <header className="space-y-4 border-b border-white/[0.08] pb-8">
                <div className="flex items-center gap-3 text-red-400 mb-2">
                    <AlertTriangle className="w-6 h-6" />
                    <span className="text-xs font-mono uppercase tracking-widest">Support / Troubleshooting</span>
                </div>
                <h1 className="text-4xl font-heading font-bold text-white">
                    Troubleshooting Guide
                </h1>
                <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
                    Diagnose and resolve common issues with the Extraction Pipeline,
                    Graph Database, and Frontend Application.
                </p>
                <div className="flex items-center gap-4 text-xs font-mono text-gray-500 pt-2">
                    <span>v1.0.0</span>
                    <span>•</span>
                    <span>Last Updated: {lastUpdated}</span>
                </div>
            </header>

            {/* ── Log Locations ────────────────────────────────────────────────── */}
            <section className="space-y-6">
                <h2 className="text-2xl font-heading font-bold text-white">System Logs</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        {
                            sys: 'Extraction Pipeline',
                            path: 'convert/output3/_SWARM_REPORT.md',
                            desc: 'Batch process status and per-file results.'
                        },
                        {
                            sys: 'Next.js App',
                            path: 'terminal stdout',
                            desc: 'Runtime errors and API route logs.'
                        },
                        {
                            sys: 'Neo4j Database',
                            path: 'docker logs neo4j',
                            desc: 'Database connection and query errors.'
                        },
                        {
                            sys: 'Marker Agent',
                            path: 'convert/marker.log',
                            desc: 'Detailed computer vision inference logs.'
                        },
                    ].map((log) => (
                        <div key={log.sys} className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.01]">
                            <h3 className="font-bold text-white mb-1">{log.sys}</h3>
                            <code className="text-xs bg-black/30 px-2 py-1 rounded text-red-300 block w-fit mb-2">
                                {log.path}
                            </code>
                            <p className="text-xs text-gray-400">{log.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Common Errors ───────────────────────────────────────────────── */}
            <section className="space-y-8">
                <h2 className="text-2xl font-heading font-bold text-white">Common Errors</h2>

                {/* Marker Failures */}
                <div className="space-y-3">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-oxot-orange" />
                        Marker Agent: "No Text Found"
                    </h3>
                    <div className="p-4 rounded-lg bg-black border border-white/[0.1] text-sm text-gray-300">
                        <p className="mb-2"><strong>Cause:</strong> PDF relies solely on images without an OCR layer.</p>
                        <p><strong>Fix:</strong> Switch Swarm Controller to <code className="text-green-400">FORCE_OCR=True</code> or use Gemini Vision mode.</p>
                    </div>
                </div>

                {/* Neo4j Connection */}
                <div className="space-y-3">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <DatabaseIcon className="w-4 h-4 text-blue-400" />
                        Neo4j: "Connection Refused"
                    </h3>
                    <div className="p-4 rounded-lg bg-black border border-white/[0.1] text-sm text-gray-300">
                        <p className="mb-2"><strong>Cause:</strong> Docker container is stopped or port 7687 is blocked.</p>
                        <p><strong>Fix:</strong> Run <code className="text-green-400">docker-compose up -d</code> and check <code className="text-green-400">docker ps</code>.</p>
                    </div>
                </div>

                {/* Gemini API */}
                <div className="space-y-3">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <ZapIcon className="w-4 h-4 text-yellow-400" />
                        Gemini: "403 Forbidden / Missing API Key"
                    </h3>
                    <div className="p-4 rounded-lg bg-black border border-white/[0.1] text-sm text-gray-300">
                        <p className="mb-2"><strong>Cause:</strong> The <code className="text-yellow-400">GOOGLE_API_KEY</code> environment variable is missing.</p>
                        <p><strong>Fix:</strong> Export the key in your terminal or add it to <code className="text-yellow-400">.env.local</code>.</p>
                    </div>
                </div>
            </section>
        </article>
    );
}

// Icon Helpers
function DatabaseIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>
    )
}

function ZapIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
    )
}
