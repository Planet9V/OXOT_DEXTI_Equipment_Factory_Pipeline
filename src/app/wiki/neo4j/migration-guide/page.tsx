/**
 * Migration from Memgraph Wiki Page.
 *
 * Guide for migrating the OXOT DEXPI Equipment Factory Pipeline
 * from Memgraph to Neo4j 5.x.
 *
 * @module wiki/neo4j/migration-guide/page
 */

function CodeBlock({ title, code }: { title?: string; code: string }) {
    return (
        <div className="rounded-lg border border-white/[0.06] overflow-hidden" style={{ background: 'rgba(0,0,0,0.3)' }}>
            {title && (
                <div className="px-4 py-2 border-b border-white/[0.06]">
                    <span className="text-[10px] font-mono text-gray-500">{title}</span>
                </div>
            )}
            <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
                <code className="text-gray-300 font-mono text-[13px]">{code}</code>
            </pre>
        </div>
    );
}

const SYNTAX_DIFFS = [
    { feature: 'CREATE INDEX', memgraph: 'CREATE INDEX ON :Person(name);', neo4j: 'CREATE INDEX person_name IF NOT EXISTS\nFOR (n:Person) ON (n.name);' },
    { feature: 'UNIQUE CONSTRAINT', memgraph: 'CREATE CONSTRAINT ON (n:Person)\nASSERT n.id IS UNIQUE;', neo4j: 'CREATE CONSTRAINT person_id IF NOT EXISTS\nFOR (n:Person) REQUIRE n.id IS UNIQUE;' },
    { feature: 'Window Functions', memgraph: 'count(*) OVER () AS total;', neo4j: 'Not native. Use two-query approach.' },
    { feature: 'Integer Params', memgraph: '{ count: 42 }', neo4j: '{ count: neo4j.int(42) }' },
];

const CHECKLIST = [
    { step: '1', title: 'Preparation', items: ['Test queries in Neo4j Browser', 'Update driver config bolt:// → neo4j://', 'Add neo4j.int() for integer params'] },
    { step: '2', title: 'Schema', items: ['Create constraints with REQUIRE', 'Create indexes with named syntax', 'Add full-text indexes'] },
    { step: '3', title: 'Data Migration', items: ['Export Memgraph → CSV', 'LOAD CSV into Neo4j', 'Validate counts match'] },
    { step: '4', title: 'Driver Code', items: ['Use executeRead/executeWrite', 'Wrap SKIP/LIMIT with neo4j.int()', 'Handle Integer return values'] },
    { step: '5', title: 'Go-Live', items: ['Switch to Neo4j-only reads/writes', 'Monitor with EXPLAIN/PROFILE', 'Drop Memgraph after validation'] },
    { step: '6', title: 'Rollback', items: ['Keep Memgraph running during transition', 'Revert driver URI if needed'] },
];

export default function MigrationGuidePage() {
    return (
        <div className="max-w-4xl space-y-12">
            <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <a href="/wiki/neo4j" className="hover:text-[#018BFF] transition-colors">Neo4j</a>
                    <span>/</span>
                    <span className="text-gray-300">Migration from Memgraph</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">🔄 Migration from Memgraph</h1>
                <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
                    Step-by-step guide for migrating from <span className="text-white font-medium">Memgraph</span> to{' '}
                    <span className="text-[#018BFF] font-medium">Neo4j 5.x</span> — Cypher diffs, driver changes,
                    data export/import, and a live migration checklist.
                </p>
            </div>

            {/* Syntax Diffs */}
            <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-white">Cypher Syntax Differences</h2>
                {SYNTAX_DIFFS.map((diff) => (
                    <div key={diff.feature} className="rounded-xl border border-white/[0.06] overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)' }}>
                        <div className="px-4 py-2 border-b border-white/[0.06]">
                            <span className="text-sm font-semibold text-white">{diff.feature}</span>
                        </div>
                        <div className="grid grid-cols-2 divide-x divide-white/[0.06]">
                            <div className="p-4">
                                <div className="text-[10px] text-gray-600 mb-2 uppercase tracking-wider">Memgraph</div>
                                <pre className="text-[12px] font-mono text-gray-500 whitespace-pre-wrap">{diff.memgraph}</pre>
                            </div>
                            <div className="p-4">
                                <div className="text-[10px] text-[#018BFF] mb-2 uppercase tracking-wider">Neo4j 5.x</div>
                                <pre className="text-[12px] font-mono text-gray-300 whitespace-pre-wrap">{diff.neo4j}</pre>
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            {/* Driver Changes */}
            <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-white">Driver Configuration Changes</h2>
                <CodeBlock title="Memgraph → Neo4j driver" code={`// BEFORE (Memgraph)
const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('memgraph', ''));
const session = driver.session();
const result = await session.run(query, { limit: 50 });

// AFTER (Neo4j 5.x)
import neo4j, { int } from 'neo4j-driver';
const driver = neo4j.driver('neo4j://localhost:7687', neo4j.auth.basic('neo4j', 'password'));
const session = driver.session();
const result = await session.executeRead(tx =>
  tx.run(query, { limit: int(50) })
);`} />
                <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4 text-sm text-gray-300">
                    <strong className="text-red-400">🚨 Critical:</strong> Always use{' '}
                    <code className="text-[#018BFF]">neo4j.int()</code> for SKIP/LIMIT params. Plain JS numbers
                    cause {'"'}Limit must be integer{'"'} errors in Neo4j.
                </div>
            </section>

            {/* Data Migration */}
            <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-white">Data Migration</h2>
                <CodeBlock title="Export from Memgraph" code={`MATCH (n) RETURN labels(n) AS labels, properties(n) AS props;
MATCH (a)-[r]->(b) RETURN id(a), type(r), properties(r), id(b);`} />
                <CodeBlock title="Import into Neo4j" code={`LOAD CSV WITH HEADERS FROM 'file:///equipment.csv' AS row
CALL {
  WITH row
  MATCH (f:Facility {code: row.facility_code})
  MERGE (e:Equipment {tag: row.tag})
  SET e.displayName = row.displayName, e.category = row.category
  MERGE (f)-[:CONTAINS_EQUIPMENT]->(e)
} IN TRANSACTIONS OF 500 ROWS;`} />
                <CodeBlock title="Validate migration" code={`MATCH (n) RETURN labels(n) AS label, count(n) AS count ORDER BY label;
MATCH ()-[r]->() RETURN type(r), count(r);`} />
            </section>

            {/* Performance Comparison */}
            <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-white">Performance Comparison</h2>
                <div className="rounded-xl border border-white/[0.06] overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/[0.06]">
                                <th className="text-left px-4 py-3 text-gray-400 font-medium">Aspect</th>
                                <th className="text-left px-4 py-3 text-gray-400 font-medium">Memgraph</th>
                                <th className="text-left px-4 py-3 text-[#018BFF] font-medium">Neo4j 5.x</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { a: 'Storage', m: 'In-memory (fast reads)', n: 'Disk + page cache (durable)' },
                                { a: 'Planner', m: 'Basic cost-based', n: 'Pipelining + cost-based' },
                                { a: 'ACID', m: 'Analytical mode disables', n: 'Full ACID always on' },
                                { a: 'Concurrency', m: 'Single-instance', n: 'Clustered routing, read replicas' },
                                { a: 'Import', m: '6x faster in analytical', n: 'Transactional, batched' },
                            ].map((row, i) => (
                                <tr key={row.a} className={i < 4 ? 'border-b border-white/[0.04]' : ''}>
                                    <td className="px-4 py-2.5 text-white font-medium">{row.a}</td>
                                    <td className="px-4 py-2.5 text-gray-500">{row.m}</td>
                                    <td className="px-4 py-2.5 text-gray-300">{row.n}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Checklist */}
            <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-white">Migration Checklist</h2>
                <div className="space-y-4">
                    {CHECKLIST.map((phase) => (
                        <div key={phase.step} className="rounded-xl border border-white/[0.06] p-5" style={{ background: 'rgba(255,255,255,0.02)' }}>
                            <h3 className="text-sm font-semibold text-white mb-3">
                                <span className="text-[#018BFF] font-mono mr-2">Step {phase.step}</span>{phase.title}
                            </h3>
                            <ul className="space-y-1.5">
                                {phase.items.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                                        <span className="text-gray-600 mt-0.5">☐</span><span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* References */}
            <section className="space-y-3">
                <h2 className="text-xl font-heading font-semibold text-white">References</h2>
                <div className="space-y-2 text-xs text-gray-500">
                    <p>Memgraph Ltd. (2026). <em>Differences in Cypher Implementations</em>. <a href="https://memgraph.com/docs/querying/differences-in-cypher-implementations" className="text-[#018BFF] hover:underline" target="_blank" rel="noopener noreferrer">memgraph.com/docs</a></p>
                    <p>Memgraph Ltd. (2026). <em>Data Migration Best Practices</em>. <a href="https://memgraph.com/docs/data-migration/best-practices" className="text-[#018BFF] hover:underline" target="_blank" rel="noopener noreferrer">memgraph.com/docs</a></p>
                </div>
            </section>

            <section className="border-t border-white/[0.06] pt-6 space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">Backlinks</h3>
                <div className="flex flex-wrap gap-2">
                    {[
                        { href: '/wiki/neo4j', label: 'Neo4j Overview' },
                        { href: '/wiki/neo4j/docker-setup', label: 'Docker Setup' },
                        { href: '/wiki/neo4j/javascript-driver', label: 'JavaScript Driver' },
                        { href: '/wiki/neo4j/data-model', label: 'Data Model & Schema' },
                    ].map((link) => (
                        <a key={link.href} href={link.href} className="text-xs px-2.5 py-1 rounded-md border border-white/[0.06] text-gray-400 hover:text-[#018BFF] hover:border-[#018BFF]/20 transition-colors">
                            ← {link.label}
                        </a>
                    ))}
                </div>
            </section>
        </div>
    );
}
