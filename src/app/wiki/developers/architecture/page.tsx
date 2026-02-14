/**
 * System Architecture Documentation.
 *
 * Technical overview of the DEXTI Equipment Factory, covering the frontend stack,
 * database integration, and key design patterns.
 *
 * @module wiki/developers/architecture/page
 */

'use client';

import {
    Layers,
    Box,
    Database,
    Layout,
    Code
} from 'lucide-react';

export default function ArchitecturePage() {
    const lastUpdated = new Date().toISOString().split('T')[0];

    return (
        <article className="max-w-5xl mx-auto space-y-12">

            {/* ── Header ───────────────────────────────────────────────────────── */}
            <header className="space-y-4 border-b border-white/[0.08] pb-8">
                <div className="flex items-center gap-3 text-oxot-orange mb-2">
                    <Layers className="w-6 h-6" />
                    <span className="text-xs font-mono uppercase tracking-widest">System Internals</span>
                </div>
                <h1 className="text-4xl font-heading font-bold text-white">
                    Application Architecture
                </h1>
                <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
                    A Next.js 14 application backed by Neo4j, designed for high-fidelity
                    digital twin modeling and sector-based knowledge management.
                </p>
                <div className="flex items-center gap-4 text-xs font-mono text-gray-500 pt-2">
                    <span>v2.1.0</span>
                    <span>•</span>
                    <span>Last Updated: {lastUpdated}</span>
                </div>
            </header>

            {/* ── High-Level Diagram ───────────────────────────────────────────── */}
            <section className="space-y-6">
                <h2 className="text-2xl font-heading font-bold text-white">Stack Overview</h2>
                <div className="p-6 rounded-xl border border-white/[0.06] bg-[#0d1117] overflow-x-auto">
                    <pre className="font-mono text-xs text-gray-400 leading-normal">{`
┌──────────────────────┐       ┌──────────────────────┐       ┌──────────────────────┐
│       Frontend       │       │      API Layer       │       │    Data Persistence  │
│  (Next.js 14 App)    │       │  (Next.js API Routes)│       │    (Dockerized DBs)  │
│                      │       │                      │       │                      │
│  ┌────────────────┐  │  JSON │  ┌────────────────┐  │ Bolt  │  ┌────────────────┐  │
│  │ React Server   │  │◄─────▶│  │ Graph Driver   │  │◄─────▶│  │ Neo4j Graph DB │  │
│  │ Components     │  │       │  │ (neo4j-driver) │  │       │  │ (Nodes/Rel)    │  │
│  └────────────────┘  │       │  └────────────────┘  │       │  └────────────────┘  │
│          ▲           │       │          ▲           │       │                      │
│          │           │       │          │           │       │  ┌────────────────┐  │
│  ┌────────────────┐  │       │  ┌────────────────┐  │ HTTP  │  │ Potree Server  │  │
│  │ Tailwind CSS   │  │       │  │ AI Agents      │  │◄─────▶│  │ (Point Clouds) │  │
│  │ (Shadcn UI)    │  │       │  │ (LangChain)    │  │       │  └────────────────┘  │
│  └────────────────┘  │       │  └────────────────┘  │       │                      │
└──────────────────────┘       └──────────────────────┘       └──────────────────────┘
                    `}</pre>
                </div>
            </section>

            {/* ── Key Technologies ─────────────────────────────────────────────── */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    {
                        title: 'Next.js 14 App Router',
                        icon: Layout,
                        desc: 'Server-side rendering by default. Layouts used for persistent UI (Wiki Sidebar).',
                        tech: 'React 18'
                    },
                    {
                        title: 'Neo4j Graph Database',
                        icon: Database,
                        desc: 'Native graph storage for Sector -> Facility -> Equipment relationships.',
                        tech: 'Cypher Query Language'
                    },
                    {
                        title: 'Tailwind CSS',
                        icon: Box,
                        desc: 'Utility-first styling with a custom design system token set (OXOT Orange/Teal).',
                        tech: 'PostCSS'
                    },
                    {
                        title: 'Sector Data Model',
                        icon: Code,
                        desc: 'Static configuration in `src/lib/sectors` defining the 16 CISA sectors.',
                        tech: 'TypeScript'
                    },
                ].map((item) => (
                    <div key={item.title} className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.01]">
                        <div className="flex items-center gap-3 mb-3">
                            <item.icon className="w-5 h-5 text-oxot-orange" />
                            <h3 className="font-bold text-white">{item.title}</h3>
                        </div>
                        <p className="text-sm text-gray-400 mb-3 h-10">{item.desc}</p>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono bg-white/[0.05] px-2 py-1 rounded text-gray-300">
                                {item.tech}
                            </span>
                        </div>
                    </div>
                ))}
            </section>

            {/* ── Directory Structure ─────────────────────────────────────────── */}
            <section className="space-y-6">
                <h2 className="text-2xl font-heading font-bold text-white">Project Structure</h2>
                <div className="p-6 rounded-xl border border-white/[0.06] bg-[#0d1117] overflow-x-auto font-mono text-xs text-gray-400">
                    <pre>{`src/
├── app/
│   ├── api/            # API Routes (Agents, Graph)
│   ├── wiki/           # Documentation subsystem
│   │   ├── developers/ # Developer Hub (You are here)
│   │   ├── pipeline/   # AI Pipeline Dashboard
│   │   └── sectors/    # Dynamic Sector Pages
│   └── layout.tsx      # Root Layout
├── components/         # Reusable UI Components
├── lib/
│   ├── neo4j.ts        # Database Driver Singleton
│   └── sectors.ts      # Static Data Definitions
└── types/              # TypeScript Interfaces`}</pre>
                </div>
            </section>

        </article>
    );
}
