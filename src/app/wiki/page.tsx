/**
 * Wiki Home Page.
 *
 * Landing page for the knowledge wiki, showing an overview of DEXPI 2.0,
 * the 16 CISA sectors, and quick links to drill into specific topics.
 *
 * @module wiki/page
 */

import { SECTORS } from '@/lib/sectors';

/** DEXPI topic cards. */
const DEXPI_TOPICS = [
    {
        title: 'DEXPI 2.0 Standard',
        description: 'Data Exchange in the Process Industry — the ISO-class schema for P&ID, PFD, and BFD engineering data.',
        href: '/wiki/dexpi',
        icon: '📐',
        color: '#FF6B00',
    },
    {
        title: 'Equipment Classes',
        description: 'Complete taxonomy of DEXPI equipment with POSC Caesar RDL URIs and hierarchical classification.',
        href: '/wiki/dexpi/equipment-classes',
        icon: '⚙️',
        color: '#8B5CF6',
    },
    {
        title: 'Data Model',
        description: 'TaggedPlantItem hierarchy, Nozzle connections, SignalLine instrumentation, and PipingNetworkSystem.',
        href: '/wiki/dexpi/data-model',
        icon: '🔗',
        color: '#06B6D4',
    },
    {
        title: 'XML Schema',
        description: 'DEXPI XML specification replacing ProteusXml for interoperable data exchange.',
        href: '/wiki/dexpi/xml-schema',
        icon: '📄',
        color: '#10B981',
    },
];

/** Sector color mapping. */
const SECTOR_COLORS: Record<string, string> = {};
SECTORS.forEach((s) => { SECTOR_COLORS[s.code] = s.color; });

export default function WikiHomePage() {
    const totalSubs = SECTORS.reduce((n, s) => n + s.subSectors.length, 0);
    const totalFacs = SECTORS.reduce(
        (n, s) => n + s.subSectors.reduce((m, sub) => m + sub.facilities.length, 0),
        0,
    );

    return (
        <div className="max-w-5xl space-y-12">
            {/* Hero */}
            <div className="space-y-3">
                <h1 className="text-3xl font-heading font-bold text-white">
                    DEXPI Equipment Factory Wiki
                </h1>
                <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
                    Comprehensive knowledge base covering the{' '}
                    <span className="text-[#FF6B00] font-medium">DEXPI 2.0</span> standard and all{' '}
                    <span className="text-white font-medium">16 CISA Critical Infrastructure Sectors</span>{' '}
                    defined by Presidential Policy Directive 21 (PPD-21). Discover equipment taxonomies,
                    process flows, facility types, and regulatory frameworks.
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                    { label: 'CISA Sectors', value: '16', color: '#FF6B00' },
                    { label: 'Sub-Sectors', value: String(totalSubs), color: '#8B5CF6' },
                    { label: 'Facility Types', value: String(totalFacs), color: '#06B6D4' },
                    { label: 'DEXPI Standard', value: 'v2.0', color: '#10B981' },
                ].map((stat) => (
                    <div
                        key={stat.label}
                        className="rounded-xl border border-white/[0.06] p-4"
                        style={{ background: 'rgba(255,255,255,0.02)' }}
                    >
                        <div className="text-2xl font-heading font-bold" style={{ color: stat.color }}>
                            {stat.value}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* DEXPI Topics */}
            <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-white">DEXPI 2.0 Topics</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {DEXPI_TOPICS.map((topic) => (
                        <a
                            key={topic.href}
                            href={topic.href}
                            className="group rounded-xl border border-white/[0.06] p-5 hover:border-white/[0.12] transition-all duration-300"
                            style={{ background: 'rgba(255,255,255,0.02)' }}
                        >
                            <div className="flex items-start gap-3">
                                <span className="text-2xl">{topic.icon}</span>
                                <div>
                                    <h3 className="text-sm font-semibold text-white group-hover:text-[#FF6B00] transition-colors">
                                        {topic.title}
                                    </h3>
                                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                                        {topic.description}
                                    </p>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </section>

            {/* Neo4j */}
            <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-white">Neo4j Graph Database</h2>
                <a
                    href="/wiki/neo4j"
                    className="group flex items-start gap-4 rounded-xl border border-white/[0.06] p-5 hover:border-[#018BFF]/20 transition-all duration-300"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold text-white flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #018BFF, #4C8EDA)' }}
                    >
                        ⬡
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-white group-hover:text-[#018BFF] transition-colors">
                            Neo4j Migration Wiki
                        </h3>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed max-w-xl">
                            Complete documentation for Neo4j 5.x — Docker setup, Cypher queries,
                            data modeling, Memgraph migration guide, JavaScript driver, API integration,
                            and production-ready example queries.
                        </p>
                        <div className="flex gap-2 mt-2">
                            {['Docker', 'Cypher', 'Driver', 'API', 'Queries'].map((tag) => (
                                <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded border border-[#018BFF]/20 text-[#018BFF]">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </a>
            </section>

            {/* AI Pipeline */}
            <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-white">AI Pipeline</h2>
                <a
                    href="/wiki/pipeline"
                    className="group flex items-start gap-4 rounded-xl border border-white/[0.06] p-5 hover:border-[#FF6B00]/20 transition-all duration-300"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold text-white flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #FF6B00, #ea580c)' }}
                    >
                        🤖
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-white group-hover:text-[#FF6B00] transition-colors">
                            Pipeline V2 — Specialist Agents
                        </h3>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed max-w-xl">
                            6-stage deterministic pipeline with 5 specialist AI agents: ResearchAgent,
                            ComplianceAgent, EnrichmentAgent, QualityGateAgent, and GraphWriterAgent.
                            Full audit trail, quality scoring, and graph persistence.
                        </p>
                        <div className="flex gap-2 mt-2">
                            {['Research', 'Compliance', 'Enrichment', 'Quality', 'Graph'].map((tag) => (
                                <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded border border-[#FF6B00]/20 text-[#FF6B00]">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </a>
            </section>

            {/* Energy Sector Deep Dives */}
            <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-white">Energy Sector Deep Dives</h2>
                <p className="text-sm text-gray-500">
                    Detailed TOGAF reference architectures for 7 energy facility types — from 765 kV transmission
                    substations to behind-the-meter smart homes.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {[
                        { href: '/wiki/energy', label: 'Energy Sector Hub', icon: '⚡', color: '#F59E0B', desc: 'Overview of the electricity value chain from generation to consumption' },
                        { href: '/wiki/energy/transmission', label: 'Transmission (230–765 kV)', icon: '🔌', color: '#F59E0B', desc: 'HV substations, breaker-and-a-half bus, IEC 61850 automation' },
                        { href: '/wiki/energy/distribution', label: 'Distribution (4–34.5 kV)', icon: '🏗️', color: '#3B82F6', desc: 'MV substations, FLISR automation, Volt-VAR optimization' },
                        { href: '/wiki/energy/distribution-points', label: 'Distribution Points', icon: '📍', color: '#10B981', desc: 'Last-mile transformers, DTM monitoring, service delivery' },
                        { href: '/wiki/energy/microgrids', label: 'Microgrids (1–20 MW)', icon: '🏘️', color: '#8B5CF6', desc: 'Islanding, black start, DER portfolio, grid-forming inverters' },
                        { href: '/wiki/energy/smart-homes', label: 'Smart Homes', icon: '🏠', color: '#06B6D4', desc: 'Smart meter hub, HEMS, TOU optimization, V2H/V2G' },
                        { href: '/wiki/energy/bess', label: 'BESS (10–100 MW)', icon: '🔋', color: '#EF4444', desc: 'Utility-scale LFP storage, PCS, thermal management, fire safety' },
                        { href: '/wiki/energy/vpp-derms', label: 'VPP / DERMS', icon: '🌐', color: '#EC4899', desc: 'DER aggregation, market participation, FERC Order 2222' },
                    ].map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="group rounded-xl border border-white/[0.06] p-4 hover:border-white/[0.12] transition-all duration-300"
                            style={{ background: 'rgba(255,255,255,0.02)' }}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-lg">{item.icon}</span>
                                <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                            </div>
                            <h3 className="text-sm font-semibold text-white group-hover:text-[#FF6B00] transition-colors">
                                {item.label}
                            </h3>
                            <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">{item.desc}</p>
                        </a>
                    ))}
                </div>
            </section>

            {/* Sector Grid */}
            <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-white">
                    Critical Infrastructure Sectors
                </h2>
                <p className="text-sm text-gray-500">
                    All 16 sectors from Presidential Policy Directive 21, each with detailed sub-sectors,
                    facility types, and DEXPI-aligned equipment definitions.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {SECTORS.map((sector, i) => (
                        <a
                            key={sector.code}
                            href={`/wiki/sectors/${sector.code}`}
                            className="group rounded-xl border border-white/[0.06] p-4 hover:border-white/[0.12] transition-all duration-300"
                            style={{ background: 'rgba(255,255,255,0.02)' }}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <div
                                    className="w-2 h-2 rounded-full"
                                    style={{ background: sector.color }}
                                />
                                <span className="text-[10px] text-gray-500 font-mono">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                            </div>
                            <h3 className="text-sm font-semibold text-white group-hover:text-[#FF6B00] transition-colors">
                                {sector.name}
                            </h3>
                            <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">
                                {sector.description.substring(0, 100)}…
                            </p>
                            <div className="flex items-center gap-2 mt-2 text-[10px] text-gray-600">
                                <span>{sector.subSectors.length} sub-sectors</span>
                                <span>·</span>
                                <span>
                                    {sector.subSectors.reduce((n, sub) => n + sub.facilities.length, 0)} facilities
                                </span>
                            </div>
                        </a>
                    ))}
                </div>
            </section>
        </div>
    );
}
