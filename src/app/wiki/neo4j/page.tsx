/**
 * Neo4j Overview Wiki Page.
 *
 * Hub page for Neo4j graph database documentation, covering architecture,
 * key features, and links to detailed sub-pages. Serves as the entry point
 * for the Memgraph-to-Neo4j migration knowledge base.
 *
 * @module wiki/neo4j/page
 */

/** Neo4j sub-topic cards for navigation. */
const NEO4J_TOPICS = [
    {
        title: 'Docker Setup',
        description:
            'Complete docker-compose.yml configuration with APOC/GDS plugins, volumes, health checks, and dev vs production settings.',
        href: '/wiki/neo4j/docker-setup',
        icon: '🐳',
        color: '#2496ED',
    },
    {
        title: 'Cypher Query Language',
        description:
            'Comprehensive guide to Cypher syntax — MATCH, CREATE, MERGE, aggregation, indexing, path queries, and Neo4j 5.x changes.',
        href: '/wiki/neo4j/cypher-guide',
        icon: '⚡',
        color: '#4C8EDA',
    },
    {
        title: 'Data Model & Schema',
        description:
            'Node labels, constraints, index types (RANGE, TEXT, FULL-TEXT, COMPOSITE), batch import patterns, and JSON property storage.',
        href: '/wiki/neo4j/data-model',
        icon: '🔷',
        color: '#8B5CF6',
    },
    {
        title: 'Migration from Memgraph',
        description:
            'Step-by-step migration guide with Cypher syntax diffs, driver changes, data export/import, and live migration checklist.',
        href: '/wiki/neo4j/migration-guide',
        icon: '🔄',
        color: '#F59E0B',
    },
    {
        title: 'JavaScript Driver',
        description:
            'neo4j-driver 5.x setup, integer handling with neo4j.int(), TypeScript types, circuit breaker, and retry patterns.',
        href: '/wiki/neo4j/javascript-driver',
        icon: '📦',
        color: '#10B981',
    },
    {
        title: 'API Integration',
        description:
            'Next.js API routes for CRUD, singleton pattern, query builders, GraphQL integration, auth, and testing.',
        href: '/wiki/neo4j/api-integration',
        icon: '🔌',
        color: '#EC4899',
    },
    {
        title: 'Example Queries',
        description:
            'Ready-to-use Cypher for hierarchy traversal, full-text search, aggregation, graph analytics, and batch operations.',
        href: '/wiki/neo4j/example-queries',
        icon: '📋',
        color: '#06B6D4',
    },
];

/** Key differences between Memgraph and Neo4j. */
const COMPARISON_ROWS = [
    { feature: 'License', memgraph: 'BSL 1.1 (source-available)', neo4j: 'GPL v3 (Community) / Commercial (Enterprise)' },
    { feature: 'Storage', memgraph: 'In-memory first', neo4j: 'Disk-based with page cache' },
    { feature: 'Protocol', memgraph: 'Bolt (port 7687)', neo4j: 'Bolt + HTTP (7687 + 7474)' },
    { feature: 'Index Types', memgraph: 'Label + property', neo4j: 'RANGE, TEXT, POINT, FULL-TEXT, COMPOSITE, LOOKUP' },
    { feature: 'Constraints', memgraph: 'UNIQUE only', neo4j: 'UNIQUE, NODE KEY, EXISTENCE, RELATIONSHIP' },
    { feature: 'APOC', memgraph: 'MAGE (limited)', neo4j: 'Full APOC + GDS library' },
    { feature: 'Window Functions', memgraph: 'Supported (OVER())', neo4j: 'Not native (use APOC)' },
    { feature: 'Clustering', memgraph: 'Single-node', neo4j: 'Causal clustering + routing' },
    { feature: 'Browser UI', memgraph: 'Memgraph Lab', neo4j: 'Neo4j Browser (port 7474)' },
    { feature: 'Cloud', memgraph: 'Memgraph Cloud', neo4j: 'Neo4j Aura (free tier available)' },
];

export default function Neo4jOverviewPage() {
    return (
        <div className="max-w-5xl space-y-12">
            {/* Hero */}
            <div className="space-y-3">
                <div className="flex items-center gap-3 mb-1">
                    <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold text-white"
                        style={{ background: 'linear-gradient(135deg, #018BFF, #4C8EDA)' }}
                    >
                        ⬡
                    </div>
                    <h1 className="text-3xl font-heading font-bold text-white">
                        Neo4j Graph Database
                    </h1>
                </div>
                <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
                    Comprehensive documentation for integrating{' '}
                    <span className="text-[#018BFF] font-medium">Neo4j 5.x</span> into the OXOT
                    DEXPI Equipment Factory Pipeline. Covers Docker setup, Cypher queries, data
                    modeling, migration from Memgraph, the JavaScript driver, API integration, and
                    production-ready example queries.
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                    { label: 'Neo4j Version', value: '5.x', color: '#018BFF' },
                    { label: 'Protocol', value: 'Bolt', color: '#4C8EDA' },
                    { label: 'Wiki Pages', value: '8', color: '#8B5CF6' },
                    { label: 'Driver', value: 'v5.x', color: '#10B981' },
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

            {/* Why Neo4j */}
            <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-white">Why Neo4j?</h2>
                <div
                    className="rounded-xl border border-white/[0.06] p-6 space-y-3"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <p className="text-sm text-gray-400 leading-relaxed">
                        The OXOT Equipment Factory Pipeline is migrating from{' '}
                        <span className="text-white font-medium">Memgraph</span> to{' '}
                        <span className="text-[#018BFF] font-medium">Neo4j 5.x</span> for several
                        strategic advantages:
                    </p>
                    <ul className="space-y-2 text-sm text-gray-400">
                        {[
                            'Rich index ecosystem — RANGE, TEXT, POINT, FULL-TEXT, COMPOSITE, and LOOKUP indexes for diverse query patterns',
                            'Full constraint support — UNIQUE, NODE KEY, PROPERTY EXISTENCE, and RELATIONSHIP PROPERTY EXISTENCE',
                            'APOC + Graph Data Science — 450+ procedures for data transformation, graph algorithms, and ML integration',
                            'Neo4j Browser — Built-in web UI on port 7474 for visual graph exploration and query debugging',
                            'Causal clustering — Enterprise-grade HA with routing protocol for read scaling',
                            'Mature ecosystem — Official drivers for JS/TS, Python, Java, .NET with TypeScript-first support',
                            'Neo4j Aura — Managed cloud offering with free tier and automated backups',
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                                <span className="text-[#018BFF] mt-0.5">▸</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Topic Cards */}
            <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-white">Documentation</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {NEO4J_TOPICS.map((topic) => (
                        <a
                            key={topic.href}
                            href={topic.href}
                            className="group rounded-xl border border-white/[0.06] p-5 hover:border-white/[0.12] transition-all duration-300"
                            style={{ background: 'rgba(255,255,255,0.02)' }}
                        >
                            <div className="flex items-start gap-3">
                                <span className="text-2xl">{topic.icon}</span>
                                <div>
                                    <h3 className="text-sm font-semibold text-white group-hover:text-[#018BFF] transition-colors">
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

            {/* Comparison Table */}
            <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-white">
                    Memgraph vs Neo4j — Quick Comparison
                </h2>
                <div
                    className="rounded-xl border border-white/[0.06] overflow-hidden"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/[0.06]">
                                <th className="text-left px-4 py-3 text-gray-400 font-medium">Feature</th>
                                <th className="text-left px-4 py-3 text-gray-400 font-medium">Memgraph</th>
                                <th className="text-left px-4 py-3 text-[#018BFF] font-medium">Neo4j 5.x</th>
                            </tr>
                        </thead>
                        <tbody>
                            {COMPARISON_ROWS.map((row, i) => (
                                <tr
                                    key={row.feature}
                                    className={i < COMPARISON_ROWS.length - 1 ? 'border-b border-white/[0.04]' : ''}
                                >
                                    <td className="px-4 py-2.5 text-white font-medium">{row.feature}</td>
                                    <td className="px-4 py-2.5 text-gray-500">{row.memgraph}</td>
                                    <td className="px-4 py-2.5 text-gray-300">{row.neo4j}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* References */}
            <section className="space-y-3">
                <h2 className="text-xl font-heading font-semibold text-white">References</h2>
                <div className="space-y-2 text-xs text-gray-500">
                    <p>
                        Neo4j, Inc. (2026). <em>Neo4j Graph Database Documentation</em>. Retrieved February 12, 2026, from{' '}
                        <a href="https://neo4j.com/docs/" className="text-[#018BFF] hover:underline" target="_blank" rel="noopener noreferrer">
                            https://neo4j.com/docs/
                        </a>
                    </p>
                    <p>
                        Neo4j, Inc. (2026). <em>Neo4j JavaScript Driver</em>. GitHub. Retrieved February 12, 2026, from{' '}
                        <a href="https://github.com/neo4j/neo4j-javascript-driver" className="text-[#018BFF] hover:underline" target="_blank" rel="noopener noreferrer">
                            https://github.com/neo4j/neo4j-javascript-driver
                        </a>
                    </p>
                    <p>
                        Docker, Inc. (2026). <em>Official Neo4j Docker Image</em>. Docker Hub. Retrieved February 12, 2026, from{' '}
                        <a href="https://hub.docker.com/_/neo4j" className="text-[#018BFF] hover:underline" target="_blank" rel="noopener noreferrer">
                            https://hub.docker.com/_/neo4j
                        </a>
                    </p>
                    <p>
                        Memgraph Ltd. (2026). <em>Differences in Cypher Implementations</em>. Memgraph Docs. Retrieved February 12, 2026, from{' '}
                        <a href="https://memgraph.com/docs/querying/differences-in-cypher-implementations" className="text-[#018BFF] hover:underline" target="_blank" rel="noopener noreferrer">
                            https://memgraph.com/docs/querying/differences-in-cypher-implementations
                        </a>
                    </p>
                </div>
            </section>

            {/* Backlinks */}
            <section className="border-t border-white/[0.06] pt-6 space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">Backlinks</h3>
                <div className="flex flex-wrap gap-2">
                    {[
                        { href: '/wiki', label: 'Wiki Home' },
                        { href: '/wiki/dexpi', label: 'DEXPI 2.0 Standard' },
                        { href: '/wiki/dexpi/data-model', label: 'DEXPI Data Model' },
                        { href: '/wiki/pipeline', label: 'AI Pipeline V2' },
                        { href: '/dashboard', label: 'Dashboard' },
                        { href: '/equipment', label: 'Equipment' },
                    ].map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-xs px-2.5 py-1 rounded-md border border-white/[0.06] text-gray-400 hover:text-[#018BFF] hover:border-[#018BFF]/20 transition-colors"
                        >
                            ← {link.label}
                        </a>
                    ))}
                </div>
            </section>
        </div>
    );
}
