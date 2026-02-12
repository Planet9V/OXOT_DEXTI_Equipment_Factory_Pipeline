/**
 * Neo4j Data Model & Schema Wiki Page.
 *
 * Documents Neo4j schema design for the DEXPI equipment hierarchy including
 * constraints, index types, batch import, JSON properties, and APOC procedures.
 *
 * @module wiki/neo4j/data-model/page
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
function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
    return (
        <section id={id} className="space-y-4 scroll-mt-20">
            <h2 className="text-xl font-heading font-semibold text-white">{title}</h2>
            {children}
        </section>
    );
}

/** Index types for the comparison table. */
const INDEX_TYPES = [
    { type: 'RANGE', use: 'Numeric comparisons, equality', example: 'e.tag, f.code' },
    { type: 'TEXT', use: 'Substring, prefix searches', example: 'e.displayName, e.description' },
    { type: 'POINT', use: 'Geospatial distance queries', example: 'f.location' },
    { type: 'FULL-TEXT', use: 'Multi-property search, scoring', example: 'Equipment [tag, name, category]' },
    { type: 'COMPOSITE', use: 'Multi-property lookups', example: 'e.category + e.componentClass' },
    { type: 'LOOKUP', use: 'Label/type scanning (auto)', example: 'All node labels' },
];

export default function DataModelPage() {
    return (
        <div className="max-w-4xl space-y-12">
            {/* Hero */}
            <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <a href="/wiki/neo4j" className="hover:text-[#018BFF] transition-colors">Neo4j</a>
                    <span>/</span>
                    <span className="text-gray-300">Data Model & Schema</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">🔷 Data Model & Schema</h1>
                <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
                    Schema design for the DEXPI Equipment Factory — node labels, constraints, index types,
                    batch import patterns, JSON properties, and APOC procedures for the{' '}
                    <span className="text-white font-medium">Sector → SubSector → Facility → Equipment</span> hierarchy.
                </p>
            </div>

            {/* Schema Diagram */}
            <Section id="schema" title="Schema Overview">
                <div className="rounded-xl border border-white/[0.06] p-6" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <div className="font-mono text-sm text-gray-300 space-y-2">
                        <div className="flex items-center gap-3">
                            <span className="inline-block w-24 text-center py-1.5 rounded bg-[#FF6B00]/10 text-[#FF6B00] border border-[#FF6B00]/20">Sector</span>
                            <span className="text-gray-500">—[:HAS_SUBSECTOR]→</span>
                            <span className="inline-block w-24 text-center py-1.5 rounded bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/20">SubSector</span>
                            <span className="text-gray-500">—[:HAS_FACILITY]→</span>
                            <span className="inline-block w-24 text-center py-1.5 rounded bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/20">Facility</span>
                            <span className="text-gray-500">—[:CONTAINS_EQUIPMENT]→</span>
                            <span className="inline-block w-24 text-center py-1.5 rounded bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20">Equipment</span>
                        </div>
                        <div className="pl-[480px] text-gray-500 text-xs">
                            ←[:ASSIGNED_TO]— Equipment
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                        { label: 'Sector', props: 'code, name, description', color: '#FF6B00' },
                        { label: 'SubSector', props: 'code, name', color: '#8B5CF6' },
                        { label: 'Facility', props: 'code, name, type', color: '#06B6D4' },
                        { label: 'Equipment', props: 'tag, displayName, category, componentClass, specifications', color: '#10B981' },
                    ].map((node) => (
                        <div key={node.label} className="rounded-lg border border-white/[0.06] p-3" style={{ background: 'rgba(255,255,255,0.02)' }}>
                            <div className="text-sm font-semibold mb-1" style={{ color: node.color }}>{node.label}</div>
                            <div className="text-[11px] text-gray-500 font-mono">{node.props}</div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Constraints */}
            <Section id="constraints" title="Constraints">
                <p className="text-sm text-gray-400">Neo4j 5.x supports four constraint types for data integrity.</p>
                <CodeBlock title="UNIQUE constraints" code={`CREATE CONSTRAINT sector_code_unique IF NOT EXISTS
FOR (s:Sector) REQUIRE s.code IS UNIQUE;

CREATE CONSTRAINT subsector_code_unique IF NOT EXISTS
FOR (ss:SubSector) REQUIRE ss.code IS UNIQUE;

CREATE CONSTRAINT facility_code_unique IF NOT EXISTS
FOR (f:Facility) REQUIRE f.code IS UNIQUE;

CREATE CONSTRAINT equipment_tag_unique IF NOT EXISTS
FOR (e:Equipment) REQUIRE e.tag IS UNIQUE;`} />
                <CodeBlock title="EXISTENCE constraints" code={`CREATE CONSTRAINT sector_name_exists IF NOT EXISTS
FOR (s:Sector) REQUIRE s.name IS NOT NULL;

CREATE CONSTRAINT equipment_category_exists IF NOT EXISTS
FOR (e:Equipment) REQUIRE e.category IS NOT NULL;`} />
                <CodeBlock title="NODE KEY (composite uniqueness)" code={`CREATE CONSTRAINT facility_key IF NOT EXISTS
FOR (f:Facility) REQUIRE (f.code, f.subsector_id) IS NODE KEY;`} />
                <CodeBlock title="Relationship property existence" code={`CREATE CONSTRAINT assignment_date_exists IF NOT EXISTS
FOR ()-[r:ASSIGNED_TO]-() REQUIRE r.assigned_date IS NOT NULL;`} />
            </Section>

            {/* Index Types */}
            <Section id="indexes" title="Index Types">
                <div className="rounded-xl border border-white/[0.06] overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/[0.06]">
                                <th className="text-left px-4 py-3 text-[#018BFF] font-medium">Type</th>
                                <th className="text-left px-4 py-3 text-gray-400 font-medium">Use Case</th>
                                <th className="text-left px-4 py-3 text-gray-400 font-medium">Example</th>
                            </tr>
                        </thead>
                        <tbody>
                            {INDEX_TYPES.map((row, i) => (
                                <tr key={row.type} className={i < INDEX_TYPES.length - 1 ? 'border-b border-white/[0.04]' : ''}>
                                    <td className="px-4 py-2.5 text-white font-mono text-xs">{row.type}</td>
                                    <td className="px-4 py-2.5 text-gray-400">{row.use}</td>
                                    <td className="px-4 py-2.5 text-gray-500 font-mono text-xs">{row.example}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <CodeBlock title="Full-text search index" code={`CALL db.index.fulltext.createNodeIndex(
  "equipment_search",
  ["Equipment"],
  ["displayName", "description", "tag", "category"],
  {analyzer: "standard"}
);

// Query the full-text index
CALL db.index.fulltext.queryNodes("equipment_search", "pump OR critical")
YIELD node, score
RETURN node, score;`} />
                <CodeBlock title="Composite + Text indexes" code={`CREATE INDEX equipment_category_class IF NOT EXISTS
FOR (e:Equipment) ON (e.category, e.componentClass);

CREATE TEXT INDEX equipment_displayname IF NOT EXISTS
FOR (e:Equipment) ON (e.displayName);`} />
            </Section>

            {/* Query Profiling */}
            <Section id="profiling" title="Query Profiling">
                <CodeBlock title="EXPLAIN (plan only)" code={`EXPLAIN
MATCH (s:Sector {code: "CHEM"})
     -[:HAS_SUBSECTOR]->(ss:SubSector)
     -[:HAS_FACILITY]->(f:Facility)
     -[:CONTAINS_EQUIPMENT]->(e:Equipment)
WHERE e.category = "Pump"
RETURN s, ss, f, e;`} />
                <CodeBlock title="PROFILE (execute + metrics)" code={`PROFILE
MATCH (s:Sector {code: "CHEM"})
     -[:HAS_SUBSECTOR]->(ss:SubSector)
     -[:HAS_FACILITY]->(f:Facility)
     -[:CONTAINS_EQUIPMENT]->(e:Equipment {category: "Pump"})
RETURN e.displayName, e.specifications;`} />
            </Section>

            {/* Batch Import */}
            <Section id="batch" title="Batch Import Patterns">
                <CodeBlock title="UNWIND — Import sectors" code={`UNWIND [
  {code: "CHEM", name: "Chemical", description: "Chemical Manufacturing"},
  {code: "ENRG", name: "Energy", description: "Energy Generation"},
  {code: "WATR", name: "Water", description: "Water Systems"}
] AS sector_data
MERGE (s:Sector {code: sector_data.code})
ON CREATE SET
  s.name = sector_data.name,
  s.description = sector_data.description,
  s.created_at = datetime()
RETURN COUNT(s) AS sectors_created;`} />
                <CodeBlock title="UNWIND — Import hierarchy" code={`UNWIND [
  {sector_code: "CHEM", code: "CHEM_PHARMA", name: "Pharmaceutical"},
  {sector_code: "CHEM", code: "CHEM_PETRO", name: "Petrochemical"},
  {sector_code: "ENRG", code: "ELEC_GRID", name: "Electric Grid"}
] AS subsector_data
MATCH (s:Sector {code: subsector_data.sector_code})
MERGE (ss:SubSector {code: subsector_data.code})
ON CREATE SET ss.name = subsector_data.name
MERGE (s)-[:HAS_SUBSECTOR]->(ss)
RETURN COUNT(ss) AS subsectors_created;`} />
                <CodeBlock title="CALL {} IN TRANSACTIONS (large batch)" code={`// Process 10,000 records in batches of 500
LOAD CSV WITH HEADERS FROM 'file:///equipment.csv' AS row
CALL {
  WITH row
  MATCH (f:Facility {code: row.facility_code})
  MERGE (e:Equipment {tag: row.tag})
  ON CREATE SET
    e.displayName = row.displayName,
    e.category = row.category,
    e.componentClass = row.componentClass,
    e.created_at = datetime()
  MERGE (f)-[:CONTAINS_EQUIPMENT]->(e)
} IN TRANSACTIONS OF 500 ROWS
RETURN count(*) AS imported;`} />
            </Section>

            {/* JSON Properties */}
            <Section id="json" title="JSON Property Storage">
                <p className="text-sm text-gray-400">Neo4j natively supports map/object properties — use for equipment specifications.</p>
                <CodeBlock title="Store specifications as nested map" code={`CREATE (e:Equipment {
  tag: "PUMP_NY_001",
  displayName: "Main Circulation Pump",
  category: "Pump",
  specifications: {
    pressure_rating_psi: 150,
    flow_rate_gpm: 500,
    power_hp: 75,
    materials: {body: "Ductile Iron", seals: "Viton"},
    certifications: ["ISO9001", "ASME", "API"]
  }
});`} />
                <CodeBlock title="Query nested properties" code={`MATCH (e:Equipment)
WHERE e.specifications.pressure_rating_psi > 100
  AND "ASME" IN e.specifications.certifications
RETURN e.displayName, e.specifications.pressure_rating_psi;`} />
                <CodeBlock title="Update nested properties" code={`MATCH (e:Equipment {tag: "PUMP_NY_001"})
SET e.specifications.maintenance = {
  last_service: datetime(),
  next_due: datetime() + duration("P6M"),
  service_interval_hours: 2000
}
RETURN e.specifications;`} />
            </Section>

            {/* APOC */}
            <Section id="apoc" title="APOC Procedures">
                <CodeBlock title="apoc.meta.schema — Full schema analysis" code={`CALL apoc.meta.schema()
YIELD value
RETURN value;`} />
                <CodeBlock title="apoc.create.node — Dynamic node creation" code={`MATCH (f:Facility {code: "FAC_NY_001"})
WITH f, {
  tag: "SENSOR_NY_001",
  displayName: "Temperature Sensor",
  category: "Sensor"
} AS props
CALL apoc.create.node(["Equipment", "CriticalAsset"], props)
YIELD node
MERGE (f)-[:CONTAINS_EQUIPMENT]->(node)
RETURN node;`} />
                <CodeBlock title="apoc.periodic.iterate — Batch update" code={`CALL apoc.periodic.iterate(
  "MATCH (e:Equipment) RETURN e",
  "SET e.specifications.last_audit = datetime()
   SET e.specifications.audit_status = 'PENDING'",
  {batchSize: 1000, parallel: true}
);`} />
            </Section>

            {/* Complete Schema */}
            <Section id="complete" title="Complete Production Schema">
                <CodeBlock title="Full setup for DEXPI Equipment Factory" code={`// ===== CONSTRAINTS =====
CREATE CONSTRAINT sector_code FOR (s:Sector) REQUIRE s.code IS UNIQUE;
CREATE CONSTRAINT subsector_code FOR (ss:SubSector) REQUIRE ss.code IS UNIQUE;
CREATE CONSTRAINT facility_code FOR (f:Facility) REQUIRE f.code IS UNIQUE;
CREATE CONSTRAINT equipment_tag FOR (e:Equipment) REQUIRE e.tag IS UNIQUE;
CREATE CONSTRAINT sector_name_exists FOR (s:Sector) REQUIRE s.name IS NOT NULL;
CREATE CONSTRAINT equipment_category_exists FOR (e:Equipment) REQUIRE e.category IS NOT NULL;

// ===== INDEXES =====
CREATE INDEX sector_code FOR (s:Sector) ON (s.code);
CREATE INDEX subsector_code FOR (ss:SubSector) ON (ss.code);
CREATE INDEX facility_code FOR (f:Facility) ON (f.code);
CREATE INDEX equipment_tag FOR (e:Equipment) ON (e.tag);
CREATE INDEX equipment_category FOR (e:Equipment) ON (e.category);
CREATE TEXT INDEX equipment_displayname FOR (e:Equipment) ON (e.displayName);

CALL db.index.fulltext.createNodeIndex(
  "equipment_search",
  ["Equipment"],
  ["displayName", "description", "tag", "category"]
);

// ===== VERIFICATION =====
CALL db.schema.visualization();
SHOW CONSTRAINTS;
SHOW INDEXES;`} />
            </Section>

            {/* References */}
            <section className="space-y-3">
                <h2 className="text-xl font-heading font-semibold text-white">References</h2>
                <div className="space-y-2 text-xs text-gray-500">
                    <p>
                        Byteridge. (2026). <em>Unlocking the Power of Neo4j</em>. Retrieved February 12, 2026, from{' '}
                        <a href="https://byteridge.com/industry-insights/unlocking-the-power-of-neo4j-a-comprehensive-guide-to-graph-databases/" className="text-[#018BFF] hover:underline" target="_blank" rel="noopener noreferrer">
                            https://byteridge.com/industry-insights/unlocking-the-power-of-neo4j/
                        </a>
                    </p>
                    <p>
                        Graphable AI. (2026). <em>Graph Database Schema Design</em>. Retrieved February 12, 2026, from{' '}
                        <a href="https://graphable.ai/events/graph-database-schema-design/" className="text-[#018BFF] hover:underline" target="_blank" rel="noopener noreferrer">
                            https://graphable.ai/events/graph-database-schema-design/
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
                        { href: '/wiki/neo4j/cypher-guide', label: 'Cypher Guide' },
                        { href: '/wiki/neo4j/example-queries', label: 'Example Queries' },
                        { href: '/wiki/neo4j/migration-guide', label: 'Migration Guide' },
                        { href: '/wiki/dexpi/data-model', label: 'DEXPI Data Model' },
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
