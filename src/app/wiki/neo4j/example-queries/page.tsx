/**
 * Neo4j Example Queries Wiki Page.
 *
 * Ready-to-use Cypher queries for the DEXPI equipment hierarchy covering
 * hierarchy, search, aggregation, analytics, mutation, reporting, and import.
 *
 * @module wiki/neo4j/example-queries/page
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

export default function ExampleQueriesPage() {
    return (
        <div className="max-w-4xl space-y-12">
            <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <a href="/wiki/neo4j" className="hover:text-[#018BFF] transition-colors">Neo4j</a>
                    <span>/</span>
                    <span className="text-gray-300">Example Queries</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">📋 Example Queries</h1>
                <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
                    Production-ready Cypher queries for the DEXPI Equipment Factory —
                    hierarchy traversal, search, aggregation, analytics, mutation, and import/export.
                </p>
            </div>

            {/* TOC */}
            <div className="rounded-xl border border-white/[0.06] p-5" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <h3 className="text-sm font-semibold text-gray-400 mb-3">On This Page</h3>
                <div className="grid grid-cols-2 gap-1.5 text-sm">
                    {[
                        { id: 'hierarchy', label: '01 — Hierarchy Queries' },
                        { id: 'search', label: '02 — Search' },
                        { id: 'aggregation', label: '03 — Aggregation' },
                        { id: 'analytics', label: '04 — Graph Analytics' },
                        { id: 'mutation', label: '05 — Data Mutation' },
                        { id: 'reporting', label: '06 — Reporting' },
                        { id: 'import', label: '07 — Import/Export' },
                        { id: 'tuning', label: '08 — Performance Tuning' },
                    ].map((item) => (
                        <a key={item.id} href={'#' + item.id} className="text-gray-500 hover:text-[#018BFF] transition-colors">
                            {item.label}
                        </a>
                    ))}
                </div>
            </div>

            {/* 01 Hierarchy */}
            <Section id="hierarchy" num="01" title="Hierarchy Queries">
                <CodeBlock title="Full equipment tree" code={`MATCH (s:Sector)-[:HAS_SUBSECTOR]->(ss:SubSector)
      -[:HAS_FACILITY]->(f:Facility)
      -[:CONTAINS_EQUIPMENT]->(e:Equipment)
RETURN s.name AS sector, ss.name AS subSector,
       f.name AS facility, collect(e.displayName) AS equipment
ORDER BY s.name, ss.name, f.name`} />
                <CodeBlock title="Equipment count per sector" code={`MATCH (s:Sector)-[:HAS_SUBSECTOR]->(ss:SubSector)
      -[:HAS_FACILITY]->(f:Facility)
      -[:CONTAINS_EQUIPMENT]->(e:Equipment)
RETURN s.code AS sector, s.name AS name,
       count(DISTINCT f) AS facilities,
       count(e) AS totalEquipment
ORDER BY totalEquipment DESC`} />
                <CodeBlock title="Drill-down: sector → facilities → equipment" code={`MATCH (s:Sector {code: $sectorCode})
      -[:HAS_SUBSECTOR]->(ss:SubSector)
      -[:HAS_FACILITY]->(f:Facility)
OPTIONAL MATCH (f)-[:CONTAINS_EQUIPMENT]->(e:Equipment)
RETURN s.name AS sector, ss.name AS subSector,
       f.name AS facility, f.code AS facilityCode,
       count(e) AS equipmentCount
ORDER BY ss.name, f.name`} />
            </Section>

            {/* 02 Search */}
            <Section id="search" num="02" title="Search">
                <CodeBlock title="Full-text search with scoring" code={`CALL db.index.fulltext.queryNodes("equipment_search", $searchTerm)
YIELD node AS e, score
RETURN e.tag, e.displayName, e.category, score
ORDER BY score DESC
LIMIT 20`} />
                <CodeBlock title="Filter by category + sector" code={`MATCH (s:Sector)-[:HAS_SUBSECTOR]->(ss:SubSector)
      -[:HAS_FACILITY]->(f:Facility)
      -[:CONTAINS_EQUIPMENT]->(e:Equipment)
WHERE ($category IS NULL OR e.category = $category)
  AND ($sector IS NULL OR s.code = $sector)
  AND ($search IS NULL OR toLower(e.displayName) CONTAINS toLower($search))
RETURN e.tag, e.displayName, e.category, s.code AS sector, f.name AS facility
ORDER BY e.displayName
SKIP $skip LIMIT $limit`} />
                <CodeBlock title="Fuzzy search with APOC" code={`MATCH (e:Equipment)
WHERE apoc.text.fuzzyMatch(e.displayName, $searchTerm)
RETURN e.tag, e.displayName,
       apoc.text.levenshteinSimilarity(e.displayName, $searchTerm) AS similarity
ORDER BY similarity DESC
LIMIT 10`} />
            </Section>

            {/* 03 Aggregation */}
            <Section id="aggregation" num="03" title="Aggregation">
                <CodeBlock title="Count by category" code={`MATCH (e:Equipment)
RETURN e.category AS category,
       count(e) AS count
ORDER BY count DESC`} />
                <CodeBlock title="Top manufacturers" code={`MATCH (e:Equipment)
WHERE e.specifications.manufacturer IS NOT NULL
RETURN e.specifications.manufacturer AS manufacturer,
       count(e) AS equipmentCount,
       collect(DISTINCT e.category) AS categories
ORDER BY equipmentCount DESC
LIMIT 10`} />
                <CodeBlock title="Coverage analysis" code={`MATCH (s:Sector)
OPTIONAL MATCH (s)-[:HAS_SUBSECTOR]->(ss:SubSector)
                -[:HAS_FACILITY]->(f:Facility)
                -[:CONTAINS_EQUIPMENT]->(e:Equipment)
WITH s, count(DISTINCT ss) AS subSectors,
     count(DISTINCT f) AS facilities,
     count(e) AS equipment
RETURN s.code, s.name, subSectors, facilities, equipment,
       CASE WHEN equipment > 0 THEN 'Active' ELSE 'Empty' END AS status
ORDER BY equipment DESC`} />
            </Section>

            {/* 04 Analytics */}
            <Section id="analytics" num="04" title="Graph Analytics">
                <CodeBlock title="Find similar equipment (shared facilities)" code={`MATCH (e1:Equipment {tag: $tag})
      <-[:CONTAINS_EQUIPMENT]-(f:Facility)
      -[:CONTAINS_EQUIPMENT]->(e2:Equipment)
WHERE e1 <> e2 AND e1.category = e2.category
RETURN e2.tag, e2.displayName, f.name AS sharedFacility,
       e2.specifications AS specs
ORDER BY e2.displayName`} />
                <CodeBlock title="Equipment clusters by facility" code={`MATCH (f:Facility)-[:CONTAINS_EQUIPMENT]->(e:Equipment)
WITH f, count(e) AS equipCount, collect(e.category) AS categories
WHERE equipCount > 5
RETURN f.name, f.code, equipCount,
       [cat IN categories | cat] AS categoryTypes
ORDER BY equipCount DESC`} />
            </Section>

            {/* 05 Mutation */}
            <Section id="mutation" num="05" title="Data Mutation">
                <CodeBlock title="Batch create equipment" code={`UNWIND $equipment AS eq
MATCH (f:Facility {code: eq.facilityCode})
MERGE (e:Equipment {tag: eq.tag})
ON CREATE SET
  e.displayName = eq.displayName,
  e.category = eq.category,
  e.componentClass = eq.componentClass,
  e.specifications = eq.specifications,
  e.created_at = datetime()
MERGE (f)-[:CONTAINS_EQUIPMENT]->(e)
RETURN count(e) AS created`} />
                <CodeBlock title="Move equipment between facilities" code={`MATCH (e:Equipment {tag: $tag})<-[old:CONTAINS_EQUIPMENT]-(oldF:Facility)
MATCH (newF:Facility {code: $newFacilityCode})
DELETE old
CREATE (newF)-[:CONTAINS_EQUIPMENT {transferred: datetime()}]->(e)
SET e.updated_at = datetime()
RETURN e.tag, oldF.name AS from, newF.name AS to`} />
                <CodeBlock title="Cascade delete sector" code={`MATCH (s:Sector {code: $code})-[:HAS_SUBSECTOR]->(ss:SubSector)
      -[:HAS_FACILITY]->(f:Facility)-[:CONTAINS_EQUIPMENT]->(e:Equipment)
DETACH DELETE e, f, ss, s
RETURN count(*) AS nodesDeleted`} />
            </Section>

            {/* 06 Reporting */}
            <Section id="reporting" num="06" title="Reporting">
                <CodeBlock title="Dashboard statistics" code={`MATCH (s:Sector) WITH count(s) AS sectors
MATCH (ss:SubSector) WITH sectors, count(ss) AS subSectors
MATCH (f:Facility) WITH sectors, subSectors, count(f) AS facilities
MATCH (e:Equipment) WITH sectors, subSectors, facilities, count(e) AS equipment
RETURN sectors, subSectors, facilities, equipment`} />
                <CodeBlock title="Recent activity" code={`MATCH (e:Equipment)
WHERE e.created_at > datetime() - duration('P7D')
RETURN e.tag, e.displayName, e.category, e.created_at
ORDER BY e.created_at DESC
LIMIT 20`} />
            </Section>

            {/* 07 Import/Export */}
            <Section id="import" num="07" title="Import / Export">
                <CodeBlock title="LOAD CSV" code={`LOAD CSV WITH HEADERS FROM 'file:///equipment.csv' AS row
CALL {
  WITH row
  MATCH (f:Facility {code: row.facility_code})
  MERGE (e:Equipment {tag: row.tag})
  SET e.displayName = row.name, e.category = row.category
  MERGE (f)-[:CONTAINS_EQUIPMENT]->(e)
} IN TRANSACTIONS OF 500 ROWS
RETURN count(*) AS imported`} />
                <CodeBlock title="APOC JSON export" code={`CALL apoc.export.json.all("export.json", {});
// Or selective export
CALL apoc.export.json.query(
  "MATCH (e:Equipment) RETURN e",
  "equipment.json", {}
);`} />
            </Section>

            {/* 08 Performance */}
            <Section id="tuning" num="08" title="Performance Tuning">
                <CodeBlock title="EXPLAIN — View query plan" code={`EXPLAIN
MATCH (s:Sector {code: "CHEM"})
      -[:HAS_SUBSECTOR]->(ss)-[:HAS_FACILITY]->(f)
      -[:CONTAINS_EQUIPMENT]->(e:Equipment {category: "Pump"})
RETURN e.displayName`} />
                <CodeBlock title="PROFILE — Execute + metrics" code={`PROFILE
MATCH (e:Equipment)
WHERE e.category = "Pump"
RETURN e.tag, e.displayName
ORDER BY e.displayName
LIMIT 100`} />
                <CodeBlock title="Verify index usage" code={`// Check indexes exist
SHOW INDEXES YIELD name, labelsOrTypes, properties, type
RETURN *;

// Check constraints
SHOW CONSTRAINTS YIELD name, labelsOrTypes, properties, type
RETURN *;`} />
                <div className="rounded-lg border border-[#018BFF]/20 bg-[#018BFF]/5 p-4 text-sm text-gray-300">
                    <strong className="text-[#018BFF]">💡 Tip:</strong> Always check PROFILE output for
                    {' "'}NodeByLabelScan{'"'} — if present, an index is missing. Add a RANGE or TEXT index
                    on the filtered property.
                </div>
            </Section>

            {/* References */}
            <section className="space-y-3">
                <h2 className="text-xl font-heading font-semibold text-white">References</h2>
                <div className="space-y-2 text-xs text-gray-500">
                    <p>Neo4j, Inc. (2026). <em>Cypher Manual</em>. <a href="https://neo4j.com/docs/cypher-manual/current/" className="text-[#018BFF] hover:underline" target="_blank" rel="noopener noreferrer">neo4j.com/docs/cypher-manual</a></p>
                    <p>Neo4j, Inc. (2026). <em>APOC Documentation</em>. <a href="https://neo4j.com/labs/apoc/5/" className="text-[#018BFF] hover:underline" target="_blank" rel="noopener noreferrer">neo4j.com/labs/apoc</a></p>
                </div>
            </section>

            <section className="border-t border-white/[0.06] pt-6 space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">Backlinks</h3>
                <div className="flex flex-wrap gap-2">
                    {[
                        { href: '/wiki/neo4j', label: 'Neo4j Overview' },
                        { href: '/wiki/neo4j/cypher-guide', label: 'Cypher Guide' },
                        { href: '/wiki/neo4j/api-integration', label: 'API Integration' },
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
