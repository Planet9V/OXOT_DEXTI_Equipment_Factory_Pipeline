/**
 * Cypher Query Language Wiki Page.
 *
 * Comprehensive guide to Neo4j Cypher syntax covering node/relationship
 * operations, querying, aggregation, indexing, pagination, paths, strings,
 * subqueries, UNWIND, and Neo4j 5.x changes.
 *
 * @module wiki/neo4j/cypher-guide/page
 */

/** Code block component. */
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

/** Section component. */
function Section({ id, num, title, children }: { id: string; num: string; title: string; children: React.ReactNode }) {
    return (
        <section id={id} className="space-y-4 scroll-mt-20">
            <h2 className="text-xl font-heading font-semibold text-white">
                <span className="text-[#018BFF] font-mono mr-2">{num}</span>{title}
            </h2>
            {children}
        </section>
    );
}

/** 4.x vs 5.x comparison. */
const VERSION_CHANGES = [
    { feature: 'Constraints', v4: 'CREATE CONSTRAINT ... ASSERT', v5: 'CREATE CONSTRAINT ... REQUIRE' },
    { feature: 'Indexes', v4: 'CREATE INDEX ON :Label(prop)', v5: 'CREATE INDEX ... FOR (n:Label) ON (n.prop)' },
    { feature: 'Subqueries', v4: 'Limited CALL {}', v5: 'Full subquery + EXISTS {}' },
    { feature: 'Deprecated', v4: 'ASSERT ... IS UNIQUE', v5: 'REQUIRE ... IS UNIQUE' },
    { feature: 'New Features', v4: '—', v5: 'Parallel runtime, vector indexes, improved full-text' },
];

export default function CypherGuidePage() {
    return (
        <div className="max-w-4xl space-y-12">
            {/* Hero */}
            <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <a href="/wiki/neo4j" className="hover:text-[#018BFF] transition-colors">Neo4j</a>
                    <span>/</span>
                    <span className="text-gray-300">Cypher Query Language</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">⚡ Cypher Query Language</h1>
                <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
                    Complete reference for Neo4j 5.x Cypher syntax — from basic CRUD to advanced path queries,
                    subqueries, and batch operations.
                </p>
            </div>

            {/* TOC */}
            <div className="rounded-xl border border-white/[0.06] p-5" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <h3 className="text-sm font-semibold text-gray-400 mb-3">On This Page</h3>
                <div className="grid grid-cols-2 gap-1.5 text-sm">
                    {[
                        { id: 'nodes', label: '01 — Node Operations' },
                        { id: 'relationships', label: '02 — Relationships' },
                        { id: 'querying', label: '03 — Querying' },
                        { id: 'aggregation', label: '04 — Aggregation' },
                        { id: 'indexing', label: '05 — Indexing' },
                        { id: 'pagination', label: '06 — Pagination' },
                        { id: 'paths', label: '07 — Path Queries' },
                        { id: 'strings', label: '08 — String Ops' },
                        { id: 'subqueries', label: '09 — Subqueries' },
                        { id: 'unwind', label: '10 — UNWIND' },
                        { id: 'changes', label: '11 — 5.x Changes' },
                    ].map((item) => (
                        <a key={item.id} href={'#' + item.id} className="text-gray-500 hover:text-[#018BFF] transition-colors">
                            {item.label}
                        </a>
                    ))}
                </div>
            </div>

            {/* 01 Node Operations */}
            <Section id="nodes" num="01" title="Node Operations">
                <CodeBlock title="CREATE — Create new nodes" code={`CREATE (p:Person {name: 'Alice', age: 30})
RETURN p`} />
                <CodeBlock title="MERGE — Create if not exists" code={`MERGE (p:Person {name: 'Bob'})
SET p.age = 25
RETURN p`} />
                <CodeBlock title="SET — Update properties/labels" code={`MATCH (p:Person {name: 'Alice'})
SET p.email = 'alice@example.com', p:Employee
RETURN p`} />
                <CodeBlock title="REMOVE — Delete properties/labels" code={`MATCH (p:Person {name: 'Bob'})
REMOVE p.age, p:Employee
RETURN p`} />
                <CodeBlock title="DELETE — Remove nodes" code={`MATCH (p:Person {name: 'Charlie'})
DETACH DELETE p`} />
            </Section>

            {/* 02 Relationships */}
            <Section id="relationships" num="02" title="Relationship Operations">
                <CodeBlock title="Create typed relationship with properties" code={`MATCH (a:Person {name: 'Alice'}), (b:Person {name: 'Bob'})
CREATE (a)-[:FRIENDS_WITH {since: 2023}]->(b)
RETURN a, b`} />
                <p className="text-sm text-gray-400 leading-relaxed">
                    Direction matters: <code className="text-[#018BFF]">{'->'}</code> outgoing,{' '}
                    <code className="text-[#018BFF]">{'<-'}</code> incoming,{' '}
                    <code className="text-[#018BFF]">{'-[]-'}</code> any direction.
                </p>
                <CodeBlock title="MERGE relationship (idempotent)" code={`MATCH (a:Person {name: 'Alice'}), (b:Person {name: 'Bob'})
MERGE (a)-[r:FRIENDS_WITH]->(b)
SET r.strength = 8
RETURN a, r, b`} />
            </Section>

            {/* 03 Querying */}
            <Section id="querying" num="03" title="Querying (MATCH, WHERE, WITH)">
                <CodeBlock title="MATCH with WHERE" code={`MATCH (p:Person)-[:LIVES_IN]->(c:City)
WHERE p.age > 25 AND c.name STARTS WITH 'New'
RETURN p.name, c.name`} />
                <CodeBlock title="OPTIONAL MATCH (null if no match)" code={`MATCH (p:Person)
OPTIONAL MATCH (p)-[:WORKS_AT]->(company:Company)
RETURN p.name, company.name`} />
                <CodeBlock title="WITH — Chain filters between clauses" code={`MATCH (p:Person)-[:FRIENDS_WITH]->(friend:Person)
WHERE p.age > 30
WITH p, count(friend) AS friendCount
WHERE friendCount > 5
RETURN p.name, friendCount`} />
            </Section>

            {/* 04 Aggregation */}
            <Section id="aggregation" num="04" title="Aggregation">
                <CodeBlock title="count, collect, avg, min, max, DISTINCT" code={`MATCH (p:Person)-[:PURCHASED]->(product:Product)
RETURN p.name,
       count(DISTINCT product) AS uniqueProducts,
       count(*) AS totalPurchases,
       collect(product.name) AS productList,
       avg(product.price) AS avgPrice,
       min(product.price) AS cheapest,
       max(product.price) AS mostExpensive
ORDER BY avgPrice DESC`} />
            </Section>

            {/* 05 Indexing */}
            <Section id="indexing" num="05" title="Indexing & Constraints">
                <CodeBlock title="Property index" code={`CREATE INDEX person_name IF NOT EXISTS
FOR (p:Person) ON (p.name);`} />
                <CodeBlock title="Composite index" code={`CREATE INDEX person_name_age IF NOT EXISTS
FOR (p:Person) ON (p.name, p.age);`} />
                <CodeBlock title="Uniqueness constraint" code={`CREATE CONSTRAINT person_name_unique IF NOT EXISTS
FOR (p:Person) REQUIRE p.name IS UNIQUE;`} />
                <CodeBlock title="Full-text index" code={`CALL db.index.fulltext.createNodeIndex(
  'personSearch',
  ['Person'],
  ['name', 'email']
);

// Query full-text
CALL db.index.fulltext.queryNodes('personSearch', 'alice')
YIELD node, score
RETURN node, score;`} />
                <CodeBlock title="Show all indexes/constraints" code={`SHOW INDEXES;
SHOW CONSTRAINTS;`} />
            </Section>

            {/* 06 Pagination */}
            <Section id="pagination" num="06" title="Pagination (SKIP / LIMIT)">
                <CodeBlock title="Parameterized pagination" code={`MATCH (p:Person)
RETURN p.name
ORDER BY p.name
SKIP $offset
LIMIT $limit`} />
                <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-4 text-sm text-gray-300">
                    <strong className="text-yellow-400">⚠ Critical:</strong> When using the JavaScript driver,
                    always pass SKIP/LIMIT as <code className="text-[#018BFF]">neo4j.int()</code> to avoid
                    {' "'}Limit must be integer{'"'} errors. See the{' '}
                    <a href="/wiki/neo4j/javascript-driver" className="text-[#018BFF] hover:underline">JavaScript Driver</a> page.
                </div>
            </Section>

            {/* 07 Paths */}
            <Section id="paths" num="07" title="Path Queries">
                <CodeBlock title="Variable-length path" code={`MATCH p = (a:Person {name: 'Alice'})
      -[:FRIENDS_WITH*1..3]-
      (b:Person)
WHERE a <> b
RETURN b.name, length(p) AS distance`} />
                <CodeBlock title="shortestPath" code={`MATCH path = shortestPath(
  (a:Person {name: 'Alice'})-[:FRIENDS_WITH*]-(b:Person {name: 'Bob'})
)
RETURN path`} />
                <CodeBlock title="allShortestPaths" code={`MATCH paths = allShortestPaths(
  (a:Person {name: 'Alice'})-[:FRIENDS_WITH*]-(b:Person {name: 'Bob'})
)
RETURN paths`} />
            </Section>

            {/* 08 Strings */}
            <Section id="strings" num="08" title="String Operations">
                <CodeBlock title="CONTAINS, STARTS WITH, regex, toLower" code={`MATCH (p:Person)
WHERE toLower(p.name) CONTAINS 'ali'
   OR p.email ENDS WITH '@company.com'
   OR p.name =~ 'A.*e.*'
RETURN p.name,
       toUpper(p.name) AS upperName,
       substring(p.name, 0, 3) AS shortName`} />
            </Section>

            {/* 09 Subqueries */}
            <Section id="subqueries" num="09" title="Subqueries">
                <CodeBlock title="CALL {} subquery" code={`MATCH (manager:Person)
CALL {
  WITH manager
  MATCH (manager)-[:MANAGES]->(employee:Person)
  RETURN employee.name AS empName, employee.age AS empAge
  ORDER BY empAge DESC
  LIMIT 3
}
RETURN manager.name, collect(empName) AS topEmployees`} />
                <CodeBlock title="EXISTS {} pattern existence" code={`MATCH (p:Person)
WHERE EXISTS {
  MATCH (p)-[:FRIENDS_WITH*2..3]-(friend:Person)
  WHERE friend.age > 40
}
RETURN p.name`} />
            </Section>

            {/* 10 UNWIND */}
            <Section id="unwind" num="10" title="UNWIND — Batch Operations">
                <CodeBlock title="Batch create from list" code={`UNWIND [
  {name: 'Diana', age: 28},
  {name: 'Eve', age: 32}
] AS personData
CREATE (p:Person)
SET p = personData
RETURN p`} />
                <CodeBlock title="Import relationships" code={`MATCH (p:Person {name: 'Alice'})
WITH p, [
  {friend: 'Bob', since: 2023},
  {friend: 'Charlie', since: 2022}
] AS friendList
UNWIND friendList AS f
MATCH (friend:Person {name: f.friend})
CREATE (p)-[:FRIENDS_WITH {since: f.since}]->(friend)`} />
            </Section>

            {/* 11 Version Changes */}
            <Section id="changes" num="11" title="Neo4j 5.x vs 4.x Changes">
                <div className="rounded-xl border border-white/[0.06] overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/[0.06]">
                                <th className="text-left px-4 py-3 text-gray-400 font-medium">Feature</th>
                                <th className="text-left px-4 py-3 text-gray-500 font-medium">Neo4j 4.x</th>
                                <th className="text-left px-4 py-3 text-[#018BFF] font-medium">Neo4j 5.x</th>
                            </tr>
                        </thead>
                        <tbody>
                            {VERSION_CHANGES.map((row, i) => (
                                <tr key={row.feature} className={i < VERSION_CHANGES.length - 1 ? 'border-b border-white/[0.04]' : ''}>
                                    <td className="px-4 py-2.5 text-white font-medium">{row.feature}</td>
                                    <td className="px-4 py-2.5 text-gray-500 font-mono text-xs">{row.v4}</td>
                                    <td className="px-4 py-2.5 text-gray-300 font-mono text-xs">{row.v5}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <CodeBlock title="Migration example (4.x → 5.x)" code={`// 4.x (deprecated)
CREATE CONSTRAINT ON (p:Person) ASSERT p.name IS UNIQUE;

// 5.x (current)
CREATE CONSTRAINT person_name IF NOT EXISTS
FOR (p:Person) REQUIRE p.name IS UNIQUE;`} />
            </Section>

            {/* References */}
            <section className="space-y-3">
                <h2 className="text-xl font-heading font-semibold text-white">References</h2>
                <div className="space-y-2 text-xs text-gray-500">
                    <p>
                        Neo4j, Inc. (2026). <em>Cypher Manual</em>. Retrieved February 12, 2026, from{' '}
                        <a href="https://neo4j.com/docs/cypher-manual/current/" className="text-[#018BFF] hover:underline" target="_blank" rel="noopener noreferrer">
                            https://neo4j.com/docs/cypher-manual/current/
                        </a>
                    </p>
                    <p>
                        Learn X in Y Minutes. (2026). <em>Cypher</em>. Retrieved February 12, 2026, from{' '}
                        <a href="https://learnxinyminutes.com/cypher/" className="text-[#018BFF] hover:underline" target="_blank" rel="noopener noreferrer">
                            https://learnxinyminutes.com/cypher/
                        </a>
                    </p>
                </div>
            </section>

            {/* Backlinks */}
            <section className="border-t border-white/[0.06] pt-6 space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">Backlinks</h3>
                <div className="flex flex-wrap gap-2">
                    {[
                        { href: '/wiki/neo4j', label: 'Neo4j Overview' },
                        { href: '/wiki/neo4j/data-model', label: 'Data Model & Schema' },
                        { href: '/wiki/neo4j/example-queries', label: 'Example Queries' },
                        { href: '/wiki/neo4j/migration-guide', label: 'Migration Guide' },
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
