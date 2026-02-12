/**
 * Pipeline V2 — AI Agent Architecture Wiki Page.
 *
 * Documents the specialist agent pipeline, its 6-step deterministic flow,
 * the 5 specialist agents, audit logging, and API usage.
 *
 * @module wiki/pipeline/page
 */

export const metadata = {
    title: 'AI Pipeline V2 — Wiki',
    description:
        'Pipeline V2 specialist agent architecture: ResearchAgent, ComplianceAgent, EnrichmentAgent, QualityGateAgent, and GraphWriterAgent.',
};

/** Pipeline stages. */
const STAGES = [
    {
        name: 'Research',
        agent: 'ResearchAgent',
        icon: '🔍',
        color: '#8B5CF6',
        description:
            'Gathers equipment specifications, manufacturers, and engineering standards via Perplexity Sonar API, PCA SPARQL endpoint, and AI-driven web research. Runs 3 data sources in parallel.',
        inputs: ['Sector code', 'Sub-sector code', 'Facility code', 'Equipment class'],
        outputs: ['ResearchReport with specifications, manufacturers, standards, webSources, cveRisks'],
    },
    {
        name: 'Generate',
        agent: 'Coordinator LLM',
        icon: '⚙️',
        color: '#FF6B00',
        description:
            'Uses the research report to generate N equipment cards via structured LLM output. Each card includes ISA tag, DEXPI ComponentClass, design specs, operating conditions, and materials of construction.',
        inputs: ['ResearchReport', 'Quantity (1-20)'],
        outputs: ['Array of EquipmentCard JSON objects'],
    },
    {
        name: 'Compliance',
        agent: 'ComplianceAgent',
        icon: '📋',
        color: '#06B6D4',
        description:
            'Validates each card against 13 deterministic DEXPI compliance rules: required fields, tag format, URI validation, sector mapping, quantity ranges, and category classification.',
        inputs: ['EquipmentCard[]'],
        outputs: ['ComplianceReport with pass/fail per rule, overall compliance %'],
    },
    {
        name: 'Enrichment',
        agent: 'EnrichmentAgent',
        icon: '✨',
        color: '#F59E0B',
        description:
            'Deterministically backfills missing fields: auto-generates tags, maps ComponentClassURIs from the POSC Caesar registry, normalizes categories, converts units, and stamps metadata.',
        inputs: ['EquipmentCard[] (post-compliance)'],
        outputs: ['Enriched EquipmentCard[] with all required fields populated'],
    },
    {
        name: 'Quality Gate',
        agent: 'QualityGateAgent',
        icon: '✅',
        color: '#10B981',
        description:
            'Scores each card on a 10-dimension rubric (10 points each, 100 max): completeness, tag format, URI validity, specs depth, standards coverage, category accuracy, operating conditions, materials, manufacturers, and metadata integrity.',
        inputs: ['Enriched EquipmentCard[]', 'Threshold (default: 70)'],
        outputs: ['Scored cards, approved/rejected status, detailed dimension breakdown'],
    },
    {
        name: 'Graph Write',
        agent: 'GraphWriterAgent',
        icon: '💾',
        color: '#3B82F6',
        description:
            'Writes approved cards to Memgraph with deduplication (by tag + facility), creates Equipment nodes with full properties, and establishes ASSIGNED_TO relationships to Facility nodes. Verifies each write with a read-back query.',
        inputs: ['Approved EquipmentCard[]'],
        outputs: ['WriteReport with created/updated/skipped counts, verification status'],
    },
];

/** Quality Gate scoring dimensions. */
const SCORING_DIMENSIONS = [
    { name: 'Completeness', weight: 10, description: 'All required fields present' },
    { name: 'Tag Format', weight: 10, description: 'ISA-compliant tag (e.g. P-101)' },
    { name: 'URI Validity', weight: 10, description: 'Valid POSC Caesar RDL URI' },
    { name: 'Specifications', weight: 10, description: 'Design specs with units' },
    { name: 'Standards', weight: 10, description: 'Applicable standards referenced' },
    { name: 'Category', weight: 10, description: 'Correct category classification' },
    { name: 'Operating Conditions', weight: 10, description: 'Pressure, temperature, flow' },
    { name: 'Materials', weight: 10, description: 'Materials of construction listed' },
    { name: 'Manufacturers', weight: 10, description: 'At least 1 manufacturer' },
    { name: 'Metadata', weight: 10, description: 'Version, source, timestamps' },
];

export default function PipelineWikiPage() {
    return (
        <article className="max-w-4xl space-y-10 wiki-article">
            {/* Header */}
            <header className="space-y-3">
                <span className="text-xs font-mono text-[#FF6B00]">PIPELINE V2</span>
                <h1 className="text-3xl font-heading font-bold text-white">
                    AI Equipment Pipeline
                </h1>
                <p className="text-gray-400 text-base leading-relaxed">
                    Pipeline V2 is a 6-stage deterministic pipeline that orchestrates 5 specialist
                    AI agents to research, generate, validate, enrich, score, and store DEXPI
                    equipment cards. Each stage produces structured output consumed by the next,
                    with a full audit trail logged in JSONL format.
                </p>
            </header>

            {/* Architecture Overview */}
            <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-white">Architecture</h2>
                <div
                    className="rounded-xl border border-white/[0.06] p-5 font-mono text-xs text-gray-400"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre>{`┌─────────────────────────────────────────────────────────────────┐
│                    Pipeline V2 Orchestrator                     │
│                                                                 │
│  ┌──────────┐  ┌──────────┐  ┌────────────┐  ┌──────────────┐  │
│  │ Research  │→│ Generate  │→│ Compliance  │→│  Enrichment   │  │
│  │  Agent    │  │   LLM    │  │   Agent    │  │    Agent      │  │
│  └──────────┘  └──────────┘  └────────────┘  └──────────────┘  │
│                                                    │            │
│                              ┌────────────┐  ┌─────▼──────────┐ │
│                              │ Graph Write │←│  Quality Gate  │ │
│                              │   Agent     │  │    Agent       │ │
│                              └────────────┘  └────────────────┘ │
│                                                                 │
│  ┌────────────────────────┐  ┌────────────────────────────────┐ │
│  │  Audit Logger (JSONL)  │  │  Memgraph (Equipment Graph)   │ │
│  └────────────────────────┘  └────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘`}</pre>
                </div>
            </section>

            {/* Pipeline Stages */}
            <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-white">Pipeline Stages</h2>
                <p className="text-sm text-gray-400">
                    Each stage is executed sequentially. If a stage fails, the pipeline halts and logs
                    the error. Cancellation is supported at any point between stages.
                </p>
                <div className="space-y-4">
                    {STAGES.map((stage, i) => (
                        <div
                            key={stage.name}
                            className="rounded-xl border border-white/[0.06] p-5"
                            style={{ background: 'rgba(255,255,255,0.02)' }}
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div
                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
                                    style={{ background: `${stage.color}20` }}
                                >
                                    {stage.icon}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-mono text-gray-500">
                                            Stage {i + 1}
                                        </span>
                                    </div>
                                    <h3 className="text-sm font-heading font-semibold text-white">
                                        {stage.name}
                                    </h3>
                                </div>
                                <span
                                    className="ml-auto text-[10px] px-2 py-0.5 rounded-full border"
                                    style={{ borderColor: `${stage.color}40`, color: stage.color }}
                                >
                                    {stage.agent}
                                </span>
                            </div>
                            <p className="text-xs text-gray-400 mb-3 leading-relaxed">
                                {stage.description}
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <span className="text-[10px] text-gray-500 uppercase tracking-wider">
                                        Inputs
                                    </span>
                                    <ul className="mt-1 space-y-0.5">
                                        {stage.inputs.map((input) => (
                                            <li
                                                key={input}
                                                className="text-[11px] text-gray-400 flex items-center gap-1.5"
                                            >
                                                <span className="w-1 h-1 rounded-full bg-gray-600" />
                                                {input}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <span className="text-[10px] text-gray-500 uppercase tracking-wider">
                                        Outputs
                                    </span>
                                    <ul className="mt-1 space-y-0.5">
                                        {stage.outputs.map((output) => (
                                            <li
                                                key={output}
                                                className="text-[11px] text-gray-400 flex items-center gap-1.5"
                                            >
                                                <span className="w-1 h-1 rounded-full" style={{ background: stage.color }} />
                                                {output}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Quality Gate Rubric */}
            <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-white">Quality Gate Scoring Rubric</h2>
                <p className="text-sm text-gray-400">
                    The QualityGateAgent scores each equipment card on 10 dimensions, each worth 10
                    points, for a maximum score of 100. Cards below the threshold (default: 70) are
                    rejected. See the{' '}
                    <a href="/wiki/dexpi/equipment-classes" className="text-[#FF6B00] hover:underline">
                        Equipment Classes
                    </a>{' '}
                    page for what constitutes a valid card.
                </p>
                <div className="rounded-xl border border-white/[0.06] overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <table className="w-full text-xs">
                        <thead>
                            <tr className="border-b border-white/[0.06] text-gray-500">
                                <th className="text-left px-5 py-2.5 font-medium">Dimension</th>
                                <th className="text-center px-3 py-2.5 font-medium">Weight</th>
                                <th className="text-left px-3 py-2.5 font-medium">Criteria</th>
                            </tr>
                        </thead>
                        <tbody>
                            {SCORING_DIMENSIONS.map((dim) => (
                                <tr key={dim.name} className="border-b border-white/[0.03]">
                                    <td className="px-5 py-2 text-gray-300 font-medium">{dim.name}</td>
                                    <td className="px-3 py-2 text-center">
                                        <span className="text-[#10B981] font-mono">{dim.weight}</span>
                                    </td>
                                    <td className="px-3 py-2 text-gray-400">{dim.description}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="border-t border-white/[0.06]">
                                <td className="px-5 py-2.5 text-white font-semibold">Total</td>
                                <td className="px-3 py-2.5 text-center text-[#10B981] font-mono font-bold">100</td>
                                <td className="px-3 py-2.5 text-gray-400">Default threshold: 70</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </section>

            {/* API Usage */}
            <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-white">API Reference</h2>
                <p className="text-sm text-gray-400">
                    Pipeline V2 is accessible via the REST API at{' '}
                    <code className="text-[#FF6B00] text-xs">/api/agents/pipeline</code>.
                </p>
                <div className="space-y-3">
                    {[
                        {
                            method: 'POST',
                            path: '/api/agents/pipeline',
                            description: 'Submit a new pipeline run',
                            body: `{
  "sector": "CHEM",
  "subSector": "CHEM-BC",
  "facility": "CHEM-BC-PETRO",
  "equipmentClass": "CentrifugalPump",
  "quantity": 5
}`,
                        },
                        {
                            method: 'GET',
                            path: '/api/agents/pipeline',
                            description: 'List all pipeline runs',
                            body: null,
                        },
                        {
                            method: 'GET',
                            path: '/api/agents/pipeline?runId=<uuid>',
                            description: 'Get status of a specific run',
                            body: null,
                        },
                        {
                            method: 'DELETE',
                            path: '/api/agents/pipeline?runId=<uuid>',
                            description: 'Cancel a running pipeline',
                            body: null,
                        },
                    ].map((endpoint) => (
                        <div
                            key={`${endpoint.method} ${endpoint.path}`}
                            className="rounded-lg border border-white/[0.06] p-4"
                            style={{ background: 'rgba(255,255,255,0.02)' }}
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <span
                                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${endpoint.method === 'POST'
                                            ? 'bg-green-500/20 text-green-400'
                                            : endpoint.method === 'DELETE'
                                                ? 'bg-red-500/20 text-red-400'
                                                : 'bg-blue-500/20 text-blue-400'
                                        }`}
                                >
                                    {endpoint.method}
                                </span>
                                <code className="text-xs text-gray-300 font-mono">{endpoint.path}</code>
                            </div>
                            <p className="text-xs text-gray-400">{endpoint.description}</p>
                            {endpoint.body && (
                                <div
                                    className="mt-2 rounded border border-white/[0.04] p-3 font-mono text-[11px] text-gray-500 overflow-x-auto"
                                    style={{ background: 'rgba(0,0,0,0.3)' }}
                                >
                                    <pre>{endpoint.body}</pre>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Audit Logging */}
            <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-white">Audit Logging</h2>
                <p className="text-sm text-gray-400">
                    Every pipeline action is recorded in an immutable, hash-chained JSONL audit log.
                    Each entry includes a SHA-256 hash of the previous entry, forming a tamper-evident
                    chain. Logs are stored at <code className="text-xs text-gray-300">/data/audit/</code>.
                </p>
                <div
                    className="rounded-lg border border-white/[0.06] p-4 font-mono text-[11px] text-gray-500 overflow-x-auto"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                    <pre>{`{
  "timestamp": "2026-02-12T10:30:00.000Z",
  "runId": "a1b2c3d4-...",
  "agent": "QualityGateAgent",
  "action": "score_card",
  "input": { "tag": "P-101", "equipmentClass": "CentrifugalPump" },
  "output": { "score": 92, "approved": true },
  "prevHash": "sha256:7f83b1657ff1fc53b92dc..."
}`}</pre>
                </div>
            </section>

            {/* See Also */}
            <section className="space-y-3">
                <h2 className="text-xl font-heading font-semibold text-white">See Also</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                        { href: '/wiki/dexpi/data-model', label: 'Data Model', desc: 'Graph schema and node types' },
                        { href: '/wiki/dexpi/equipment-classes', label: 'Equipment Classes', desc: 'Full DEXPI taxonomy' },
                        { href: '/wiki/dexpi/standards', label: 'Engineering Standards', desc: 'API, ASME, IEC reference' },
                        { href: '/wiki/neo4j', label: 'Graph Database', desc: 'Memgraph/Neo4j documentation' },
                        { href: '/pipeline', label: 'Run Pipeline', desc: 'Open the pipeline UI to generate equipment' },
                        { href: '/equipment', label: 'Equipment Library', desc: 'Browse and search all equipment cards' },
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
