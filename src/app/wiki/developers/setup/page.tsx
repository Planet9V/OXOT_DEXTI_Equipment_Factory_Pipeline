/**
 * Developer Environment Setup Guide.
 *
 * Step-by-step instructions for initializing the DEXTI development environment,
 * configuring Docker containers, and setting up API keys.
 *
 * @module wiki/developers/setup/page
 */

'use client';

import {
    Terminal,
    Settings,
    Download,
    Play,
    Database
} from 'lucide-react';

export default function SetupPage() {
    const lastUpdated = new Date().toISOString().split('T')[0];

    return (
        <article className="max-w-4xl mx-auto space-y-12">

            {/* ── Header ───────────────────────────────────────────────────────── */}
            <header className="space-y-4 border-b border-white/[0.08] pb-8">
                <div className="flex items-center gap-3 text-oxot-orange mb-2">
                    <Settings className="w-6 h-6" />
                    <span className="text-xs font-mono uppercase tracking-widest">Environment / Setup</span>
                </div>
                <h1 className="text-4xl font-heading font-bold text-white">
                    Installation & Setup
                </h1>
                <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
                    Get the DEXTI Equipment Factory running locally in under 10 minutes.
                </p>
                <div className="flex items-center gap-4 text-xs font-mono text-gray-500 pt-2">
                    <span>v2.1.0</span>
                    <span>•</span>
                    <span>Last Updated: {lastUpdated}</span>
                </div>
            </header>

            {/* ── Prerequisites ────────────────────────────────────────────────── */}
            <section className="space-y-6">
                <h2 className="text-2xl font-heading font-bold text-white">Prerequisites</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { label: 'Docker Desktop', ver: 'v4.20+', req: 'Required for Neo4j & Potree' },
                        { label: 'Node.js', ver: 'v18.17+', req: 'LTS Required (Next.js 14)' },
                        { label: 'Python', ver: '3.10+', req: 'Required for Extraction Pipeline' },
                        { label: 'Google Cloud Key', ver: 'Gemini', req: 'Optional (for Speed Mode)' },
                    ].map((item) => (
                        <li key={item.label} className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.01]">
                            <div className="flex justify-between items-start mb-1">
                                <span className="font-bold text-white">{item.label}</span>
                                <span className="text-xs font-mono text-oxot-orange bg-oxot-orange/10 px-2 py-0.5 rounded">
                                    {item.ver}
                                </span>
                            </div>
                            <p className="text-xs text-gray-400">{item.req}</p>
                        </li>
                    ))}
                </ul>
            </section>

            {/* ── Installation Steps ──────────────────────────────────────────── */}
            <section className="space-y-8">
                <h2 className="text-2xl font-heading font-bold text-white">Step-by-Step Installation</h2>

                {/* Step 1: Clone */}
                <div className="space-y-3">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <span className="w-6 h-6 rounded bg-gray-700 flex items-center justify-center text-xs">1</span>
                        Clone Repository
                    </h3>
                    <div className="p-4 rounded-lg bg-black border border-white/[0.1] font-mono text-sm text-gray-300">
                        git clone https://github.com/oxot/dexti-factory.git<br />
                        cd dexti-factory
                    </div>
                </div>

                {/* Step 2: Env Vars */}
                <div className="space-y-3">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <span className="w-6 h-6 rounded bg-gray-700 flex items-center justify-center text-xs">2</span>
                        Configure Environment
                    </h3>
                    <p className="text-sm text-gray-400">
                        Create a <code className="text-oxot-orange">.env.local</code> file in the root directory.
                    </p>
                    <div className="p-4 rounded-lg bg-black border border-white/[0.1] font-mono text-xs text-gray-300 overflow-x-auto">
                        <pre>{`# Database (Neo4j)
NEO_URL=bolt://localhost:7687
NEO_USER=neo4j
NEO_PASS=password

# External APIs
PERPLEXITY_API_KEY=pplx-...
GOOGLE_API_KEY=AIza... (Required for Vision Pipeline)

# App Config
NEXT_PUBLIC_APP_URL=http://localhost:3000`}</pre>
                    </div>
                </div>

                {/* Step 3: Infrastructure */}
                <div className="space-y-3">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <span className="w-6 h-6 rounded bg-gray-700 flex items-center justify-center text-xs">3</span>
                        Start Infrastructure
                    </h3>
                    <div className="p-4 rounded-lg bg-black border border-white/[0.1] font-mono text-sm text-gray-300">
                        docker-compose up -d
                    </div>
                    <p className="text-xs text-gray-500 flex items-center gap-2">
                        <Database className="w-3 h-3" />
                        Verifies Neo4j is running at localhost:7474
                    </p>
                </div>

                {/* Step 4: Run App */}
                <div className="space-y-3">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <span className="w-6 h-6 rounded bg-gray-700 flex items-center justify-center text-xs">4</span>
                        Start Development Server
                    </h3>
                    <div className="p-4 rounded-lg bg-black border border-white/[0.1] font-mono text-sm text-gray-300">
                        npm install<br />
                        npm run dev
                    </div>
                    <p className="text-xs text-gray-500 flex items-center gap-2">
                        <Play className="w-3 h-3 text-green-400" />
                        App will be live at http://localhost:3000
                    </p>
                </div>
            </section>

        </article>
    );
}
