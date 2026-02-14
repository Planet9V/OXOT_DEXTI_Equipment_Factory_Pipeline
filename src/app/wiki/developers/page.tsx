/**
 * Developer Hub Dashboard.
 *
 * Central landing page for all developer-facing documentation, including
 * setup guides, architecture diagrams, pipeline internals, and troubleshooting.
 *
 * @module wiki/developers/page
 */

'use client';

import Link from 'next/link';
import {
    Terminal,
    Settings,
    Cpu,
    Layers,
    AlertTriangle,
    GitBranch,
    Database,
    Code,
    ArrowRight
} from 'lucide-react';

export default function DeveloperHubPage() {
    const lastUpdated = new Date().toISOString().split('T')[0];

    return (
        <article className="max-w-6xl mx-auto space-y-12">

            {/* ── Header ───────────────────────────────────────────────────────── */}
            <header className="space-y-4 border-b border-white/[0.08] pb-8">
                <div className="flex items-center gap-3 text-oxot-orange mb-2">
                    <Terminal className="w-6 h-6" />
                    <span className="text-xs font-mono uppercase tracking-widest">DevOps & Engineering</span>
                </div>
                <h1 className="text-4xl font-heading font-bold text-white">
                    Developer Hub
                </h1>
                <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
                    The central knowledge base for building, maintaining, and extending the
                    DEXTI Equipment Factory.
                </p>
                <div className="flex items-center gap-4 text-xs font-mono text-gray-500 pt-2">
                    <span>v2.1.0</span>
                    <span>•</span>
                    <span>Last Updated: {lastUpdated}</span>
                </div>
            </header>

            {/* ── Quick Access ─────────────────────────────────────────────────── */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    {
                        label: 'Hard 10x Pipeline',
                        desc: 'SOTA Vision Models & Swarm Architecture',
                        href: '/wiki/developers/pipeline/hard-10x',
                        icon: Cpu,
                        color: 'text-[#FF6B00]',
                        bg: 'bg-[#FF6B00]/10',
                        border: 'border-[#FF6B00]/20'
                    },
                    {
                        label: 'Environment Setup',
                        desc: 'Docker, Node, & API Keys',
                        href: '/wiki/developers/setup',
                        icon: Settings,
                        color: 'text-blue-400',
                        bg: 'bg-blue-400/10',
                        border: 'border-blue-400/20'
                    },
                    {
                        label: 'System Architecture',
                        desc: 'Next.js, Neo4j, & Agents',
                        href: '/wiki/developers/architecture',
                        icon: Layers,
                        color: 'text-purple-400',
                        bg: 'bg-purple-400/10',
                        border: 'border-purple-400/20'
                    },
                ].map((card) => (
                    <Link
                        key={card.href}
                        href={card.href}
                        className={`group p-6 rounded-2xl border ${card.border} bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 relative overflow-hidden`}
                    >
                        <div className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity`}>
                            <card.icon className="w-24 h-24" />
                        </div>
                        <div className="relative z-10 space-y-4">
                            <div className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center`}>
                                <card.icon className={`w-6 h-6 ${card.color}`} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-oxot-orange transition-colors">
                                    {card.label}
                                </h3>
                                <p className="text-sm text-gray-400">
                                    {card.desc}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-mono text-gray-500 group-hover:text-white transition-colors">
                                <span>Read Docs</span>
                                <ArrowRight className="w-3 h-3" />
                            </div>
                        </div>
                    </Link>
                ))}
            </section>

            {/* ── Documentation Categories ─────────────────────────────────────── */}
            <section className="space-y-6">
                <h2 className="text-xl font-heading font-semibold text-white flex items-center gap-3">
                    <BookOpenIcon className="w-5 h-5 text-gray-500" />
                    Documentation Domains
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Pipeline Engineering */}
                    <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.01]">
                        <div className="flex items-center gap-3 mb-4">
                            <Cpu className="w-5 h-5 text-oxot-orange" />
                            <h3 className="font-bold text-white">Pipeline Engineering</h3>
                        </div>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/wiki/developers/pipeline/hard-10x" className="group flex items-center justify-between text-sm text-gray-400 hover:text-white transition-colors">
                                    <span>"Hard 10x" Extraction (Marker/Swarm)</span>
                                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/wiki/pipeline" className="group flex items-center justify-between text-sm text-gray-400 hover:text-white transition-colors">
                                    <span>V2 Agent Orchestration (DEXPI)</span>
                                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/wiki/developers/pipeline/api-reference" className="group flex items-center justify-between text-sm text-gray-400 hover:text-white transition-colors">
                                    <span>Pipeline Command API</span>
                                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Infrastructure */}
                    <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.01]">
                        <div className="flex items-center gap-3 mb-4">
                            <Database className="w-5 h-5 text-blue-400" />
                            <h3 className="font-bold text-white">Infrastructure</h3>
                        </div>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/wiki/neo4j/data-model" className="group flex items-center justify-between text-sm text-gray-400 hover:text-white transition-colors">
                                    <span>Graph Schema & Data Model</span>
                                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/wiki/developers/setup" className="group flex items-center justify-between text-sm text-gray-400 hover:text-white transition-colors">
                                    <span>Docker & Deployment</span>
                                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/settings" className="group flex items-center justify-between text-sm text-gray-400 hover:text-white transition-colors">
                                    <span>Environment Configuration</span>
                                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* ── Troubleshooting ─────────────────────────────────────────────── */}
            <section className="p-6 rounded-xl border border-red-500/20 bg-red-500/5">
                <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-red-500/10 text-red-400">
                        <AlertTriangle className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white mb-2">Troubleshooting & Logs</h3>
                        <p className="text-sm text-gray-400 mb-4 max-w-2xl">
                            Encountering issues with the pipeline or graph database? Check the troubleshooting
                            guide for common error codes, log locations, and recovery procedures.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Link
                                href="/wiki/developers/troubleshooting"
                                className="px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-xs font-mono text-red-400 hover:bg-red-500/20 transition-colors"
                            >
                                View Troubleshooting Guide
                            </Link>
                            <Link
                                href="/wiki/developers/logs"
                                className="px-4 py-2 rounded-lg bg-white/[0.05] border border-white/[0.1] text-xs font-mono text-gray-300 hover:bg-white/[0.1] transition-colors"
                            >
                                Access System Logs
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </article>
    );
}

// Icon Helper
function BookOpenIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
    );
}
