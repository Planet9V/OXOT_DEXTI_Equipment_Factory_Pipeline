/**
 * DEXPI Data Model — Wiki Page.
 *
 * Comprehensive reference of the DEXPI 2.0 data model: node types,
 * relationships, property schemas, and how they map to Memgraph/Neo4j.
 *
 * @module wiki/dexpi/data-model/page
 */

export const metadata = {
    title: 'Data Model — DEXPI Wiki',
    description:
        'DEXPI 2.0 data model reference: TaggedPlantItem hierarchy, relationships, property schemas, and graph mapping.',
};

/** Node type definitions for the data model. */
const NODE_TYPES = [
    {
        label: 'Equipment',
        tag: ':Equipment:TaggedPlantItem',
        color: '#FF6B00',
        description:
            'Physical process plant equipment identified by an ISA tag (e.g. P-101, E-201). Central node type in the graph — every equipment card lives here.',
        properties: [
            { name: 'id', type: 'string', description: 'UUID primary key' },
            { name: 'tag', type: 'string', description: 'ISA tag number (e.g. P-101)' },
            { name: 'componentClass', type: 'string', description: 'DEXPI class name (e.g. CentrifugalPump)' },
            { name: 'componentClassURI', type: 'string', description: 'POSC Caesar RDL URI' },
            { name: 'displayName', type: 'string', description: 'Human-readable name' },
            { name: 'category', type: 'string', description: 'rotating | static | instrumentation | electrical | piping' },
            { name: 'description', type: 'string', description: 'Technical description' },
            { name: 'sector', type: 'string', description: 'CISA sector code (e.g. CHEM)' },
            { name: 'subSector', type: 'string', description: 'Sub-sector code (e.g. CHEM-BC)' },
            { name: 'source', type: 'string', description: 'Data provenance: manual | ai-generated | dexpi-verified' },
            { name: 'validationScore', type: 'number', description: '0-100 quality score from QualityGateAgent' },
            { name: 'card', type: 'string', description: 'Full JSON equipment card (denormalized)' },
        ],
    },
    {
        label: 'Sector',
        tag: ':Sector',
        color: '#8B5CF6',
        description:
            'One of the 16 CISA Critical Infrastructure Sectors defined by PPD-21. Top-level organizational node.',
        properties: [
            { name: 'code', type: 'string', description: 'Sector code (e.g. CHEM, ENER, TRAN)' },
            { name: 'name', type: 'string', description: 'Full name (e.g. Chemical)' },
            { name: 'description', type: 'string', description: 'Sector scope description' },
        ],
    },
    {
        label: 'SubSector',
        tag: ':SubSector',
        color: '#06B6D4',
        description:
            'Subdivision of a CISA sector (e.g. Basic Chemicals under Chemical). Groups related facility types.',
        properties: [
            { name: 'code', type: 'string', description: 'Sub-sector code (e.g. CHEM-BC)' },
            { name: 'name', type: 'string', description: 'Full name (e.g. Basic Chemicals)' },
            { name: 'description', type: 'string', description: 'Sub-sector scope' },
        ],
    },
    {
        label: 'Facility',
        tag: ':Facility',
        color: '#10B981',
        description:
            'Physical plant or installation type (e.g. Petrochemical Complex, Ammonia Plant). Contains equipment assignments.',
        properties: [
            { name: 'code', type: 'string', description: 'Facility code (e.g. CHEM-BC-PETRO)' },
            { name: 'name', type: 'string', description: 'Full name (e.g. Petrochemical Complex)' },
        ],
    },
    {
        label: 'Vendor',
        tag: ':Vendor',
        color: '#F59E0B',
        description:
            'Equipment manufacturer or supplier. Linked to equipment nodes via MANUFACTURED_BY relationships.',
        properties: [
            { name: 'name', type: 'string', description: 'Company name (e.g. Siemens, ABB, Yokogawa)' },
            { name: 'country', type: 'string', description: 'Country of origin' },
        ],
    },
];

/** Relationship definitions. */
const RELATIONSHIPS = [
    {
        type: 'BELONGS_TO',
        from: 'SubSector',
        to: 'Sector',
        description: 'Links a sub-sector to its parent sector.',
        cardinality: 'Many → One',
    },
    {
        type: 'PART_OF',
        from: 'Facility',
        to: 'SubSector',
        description: 'Links a facility to its parent sub-sector.',
        cardinality: 'Many → One',
    },
    {
        type: 'ASSIGNED_TO',
        from: 'Equipment',
        to: 'Facility',
        description: 'Assigns an equipment item to a facility.',
        cardinality: 'Many → One',
    },
    {
        type: 'MANUFACTURED_BY',
        from: 'Equipment',
        to: 'Vendor',
        description: 'Links equipment to its manufacturer.',
        cardinality: 'Many → Many',
    },
    {
        type: 'CONNECTED_TO',
        from: 'Equipment',
        to: 'Equipment',
        description: 'Process connection between equipment items (pipe, signal line).',
        cardinality: 'Many → Many',
        properties: ['connectionType: pipe | signal | electrical', 'lineNumber: string'],
    },
    {
        type: 'HAS_NOZZLE',
        from: 'Equipment',
        to: 'Nozzle',
        description: 'Physical nozzle/port on equipment for piping connections.',
        cardinality: 'One → Many',
        properties: ['nozzleTag: string', 'nominalDiameter: string', 'pressureRating: string'],
    },
];

/** Equipment category taxonomy. */
const CATEGORY_TAXONOMY = [
    {
        category: 'Rotating Equipment',
        code: 'rotating',
        color: '#8B5CF6',
        examples: ['CentrifugalPump', 'Compressor', 'Fan', 'Turbine', 'Agitator', 'Centrifuge'],
        description: 'Equipment with moving parts that convert energy through rotation.',
    },
    {
        category: 'Static Equipment',
        code: 'static',
        color: '#06B6D4',
        examples: ['PressureVessel', 'Column', 'Reactor', 'StorageTank', 'HeatExchanger', 'Boiler', 'Filter'],
        description: 'Fixed equipment without primary moving parts for containment, separation, or heat transfer.',
    },
    {
        category: 'Instrumentation & Control',
        code: 'instrumentation',
        color: '#EC4899',
        examples: ['PressureTransmitter', 'TemperatureTransmitter', 'FlowMeter', 'LevelIndicator', 'ControlValve'],
        description: 'Field instruments and control elements for process measurement and regulation.',
    },
    {
        category: 'Electrical Systems',
        code: 'electrical',
        color: '#3B82F6',
        examples: ['Transformer', 'Motor', 'Generator', 'Switchgear', 'UPS', 'VFD'],
        description: 'Power distribution, conversion, and drive equipment.',
    },
    {
        category: 'Piping & Valves',
        code: 'piping',
        color: '#10B981',
        examples: ['GateValve', 'BallValve', 'CheckValve', 'SafetyValve', 'Strainer', 'FlameArrester'],
        description: 'In-line components for flow control, isolation, and protection.',
    },
];

export default function DataModelPage() {
    return (
        <article className="max-w-4xl space-y-10 wiki-article">
            {/* Header */}
            <header className="space-y-3">
                <span className="text-xs font-mono text-[#FF6B00]">DEXPI 2.0</span>
                <h1 className="text-3xl font-heading font-bold text-white">Data Model</h1>
                <p className="text-gray-400 text-base leading-relaxed">
                    The DEXPI Equipment Factory data model maps the DEXPI 2.0 specification onto a
                    labeled property graph stored in{' '}
                    <a href="/wiki/neo4j" className="text-[#018BFF] hover:underline">Memgraph</a>.
                    Equipment, sectors, facilities, and vendors form a hierarchical graph that supports
                    traversal queries, full-text search, and analytics.
                </p>
            </header>

            {/* Graph Structure Overview */}
            <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-white">Graph Structure</h2>
                <div
                    className="rounded-xl border border-white/[0.06] p-5 font-mono text-xs text-gray-400"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre>{`Sector ← BELONGS_TO ← SubSector ← PART_OF ← Facility
                                                        ↑
                                              ASSIGNED_TO │
                                                        │
                               Vendor ← MANUFACTURED_BY ← Equipment → HAS_NOZZLE → Nozzle
                                                        │
                                              CONNECTED_TO │
                                                        ↓
                                                    Equipment`}</pre>
                </div>
                <p className="text-sm text-gray-400">
                    The graph follows a strict hierarchy: <strong>Sector → SubSector → Facility → Equipment</strong>.
                    Cross-cutting relationships (CONNECTED_TO, MANUFACTURED_BY) add the mesh connectivity
                    that makes graph queries powerful.
                </p>
            </section>

            {/* Node Types */}
            <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-white">Node Types</h2>
                <p className="text-sm text-gray-400">
                    Each node type carries specific labels and properties. The Equipment node is the
                    most complex, holding the full DEXPI card as denormalized JSON.
                </p>
                <div className="space-y-4">
                    {NODE_TYPES.map((node) => (
                        <div
                            key={node.label}
                            className="rounded-xl border border-white/[0.06] p-5"
                            style={{ background: 'rgba(255,255,255,0.02)' }}
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ background: node.color }}
                                />
                                <h3 className="text-sm font-heading font-semibold text-white">
                                    {node.label}
                                </h3>
                                <code className="text-[10px] text-gray-500 ml-auto font-mono">
                                    {node.tag}
                                </code>
                            </div>
                            <p className="text-xs text-gray-400 mb-3">{node.description}</p>
                            <table className="w-full text-xs">
                                <thead>
                                    <tr className="text-gray-500 border-b border-white/[0.06]">
                                        <th className="text-left py-1.5 pr-4 font-medium">Property</th>
                                        <th className="text-left py-1.5 pr-4 font-medium">Type</th>
                                        <th className="text-left py-1.5 font-medium">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {node.properties.map((prop) => (
                                        <tr key={prop.name} className="border-b border-white/[0.03]">
                                            <td className="py-1.5 pr-4 font-mono text-[#FF6B00]">{prop.name}</td>
                                            <td className="py-1.5 pr-4 text-gray-500">{prop.type}</td>
                                            <td className="py-1.5 text-gray-400">{prop.description}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            </section>

            {/* Relationships */}
            <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-white">Relationships</h2>
                <p className="text-sm text-gray-400">
                    Relationships encode the hierarchy and connectivity of the plant model.
                    All relationships are directed and most follow the hierarchy downward.
                </p>
                <div className="space-y-3">
                    {RELATIONSHIPS.map((rel) => (
                        <div
                            key={rel.type}
                            className="rounded-lg border border-white/[0.06] p-4"
                            style={{ background: 'rgba(255,255,255,0.02)' }}
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <code className="text-xs font-mono text-[#FF6B00]">{rel.type}</code>
                                <span className="text-[10px] text-gray-500">
                                    ({rel.from}) → ({rel.to})
                                </span>
                                <span className="text-[10px] text-gray-600 ml-auto">{rel.cardinality}</span>
                            </div>
                            <p className="text-xs text-gray-400">{rel.description}</p>
                            {rel.properties && (
                                <div className="mt-2 flex flex-wrap gap-1.5">
                                    {rel.properties.map((p) => (
                                        <span
                                            key={p}
                                            className="text-[10px] px-1.5 py-0.5 rounded border border-white/[0.06] text-gray-500 font-mono"
                                        >
                                            {p}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Equipment Categories */}
            <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-white">Equipment Categories</h2>
                <p className="text-sm text-gray-400">
                    Equipment nodes are classified into five categories based on their physical
                    characteristics and function. See{' '}
                    <a href="/wiki/dexpi/equipment-classes" className="text-[#FF6B00] hover:underline">
                        Equipment Classes
                    </a>{' '}
                    for the complete taxonomy with POSC Caesar URIs.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {CATEGORY_TAXONOMY.map((cat) => (
                        <div
                            key={cat.code}
                            className="rounded-xl border border-white/[0.06] p-4"
                            style={{ background: 'rgba(255,255,255,0.02)' }}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 rounded-full" style={{ background: cat.color }} />
                                <h3 className="text-sm font-semibold text-white">{cat.category}</h3>
                            </div>
                            <p className="text-xs text-gray-400 mb-2">{cat.description}</p>
                            <div className="flex flex-wrap gap-1">
                                {cat.examples.map((ex) => (
                                    <span
                                        key={ex}
                                        className="text-[10px] px-1.5 py-0.5 rounded border border-white/[0.06] text-gray-500"
                                    >
                                        {ex}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Cypher Examples */}
            <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-white">Query Examples</h2>
                <p className="text-sm text-gray-400">
                    The graph model enables powerful traversal queries. See the{' '}
                    <a href="/wiki/neo4j/cypher-guide" className="text-[#018BFF] hover:underline">
                        Cypher Guide
                    </a>{' '}
                    and{' '}
                    <a href="/wiki/neo4j/example-queries" className="text-[#018BFF] hover:underline">
                        Example Queries
                    </a>{' '}
                    for comprehensive usage.
                </p>
                {[
                    {
                        title: 'All equipment in a sector',
                        query: `MATCH (e:Equipment)-[:ASSIGNED_TO]->(f:Facility)-[:PART_OF]->(ss:SubSector)-[:BELONGS_TO]->(s:Sector {code: 'CHEM'})
RETURN e.tag, e.displayName, f.name, ss.name
ORDER BY e.tag`,
                    },
                    {
                        title: 'Equipment with validation score ≥ 90',
                        query: `MATCH (e:Equipment)
WHERE e.validationScore >= 90
RETURN e.tag, e.componentClass, e.validationScore
ORDER BY e.validationScore DESC`,
                    },
                    {
                        title: 'Sector coverage summary',
                        query: `MATCH (s:Sector)<-[:BELONGS_TO]-(ss:SubSector)<-[:PART_OF]-(f:Facility)
OPTIONAL MATCH (f)<-[:ASSIGNED_TO]-(e:Equipment)
RETURN s.code, s.name, count(DISTINCT f) AS facilities, count(e) AS equipment
ORDER BY s.code`,
                    },
                ].map((example) => (
                    <div key={example.title} className="space-y-1">
                        <h3 className="text-xs font-semibold text-gray-300">{example.title}</h3>
                        <div
                            className="rounded-lg border border-white/[0.06] p-3 font-mono text-xs text-gray-400 overflow-x-auto"
                            style={{ background: 'rgba(255,255,255,0.02)' }}
                        >
                            <pre>{example.query}</pre>
                        </div>
                    </div>
                ))}
            </section>

            {/* See Also */}
            <section className="space-y-3">
                <h2 className="text-xl font-heading font-semibold text-white">See Also</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                        { href: '/wiki/dexpi', label: 'DEXPI 2.0 Standard', desc: 'Overview of the specification and its history' },
                        { href: '/wiki/dexpi/equipment-classes', label: 'Equipment Classes', desc: 'Full taxonomy with POSC Caesar URIs' },
                        { href: '/wiki/dexpi/xml-schema', label: 'DEXPI XML Schema', desc: 'XML interchange format reference' },
                        { href: '/wiki/neo4j/data-model', label: 'Neo4j Graph Schema', desc: 'Cypher schema definitions and constraints' },
                        { href: '/wiki/pipeline', label: 'AI Pipeline', desc: 'How Pipeline V2 agents create and validate equipment' },
                        { href: '/wiki/dexpi/standards', label: 'Engineering Standards', desc: 'API, ASME, TEMA, IEC, ISA reference' },
                    ].map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="group rounded-lg border border-white/[0.06] p-3 hover:border-white/[0.12] transition-colors"
                            style={{ background: 'rgba(255,255,255,0.02)' }}
                        >
                            <h3 className="text-sm font-semibold text-white group-hover:text-[#FF6B00] transition-colors">
                                {link.label}
                            </h3>
                            <p className="text-xs text-gray-500 mt-0.5">{link.desc}</p>
                        </a>
                    ))}
                </div>
            </section>
        </article>
    );
}
