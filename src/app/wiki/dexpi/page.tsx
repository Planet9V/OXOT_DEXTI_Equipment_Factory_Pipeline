/**
 * DEXPI 2.0 Standard — Wiki Overview Page.
 *
 * Comprehensive article on the DEXPI (Data Exchange in the Process Industry)
 * standard, covering its history, purpose, data model, and organizational backing.
 *
 * @module wiki/dexpi/page
 */

export const metadata = {
    title: 'DEXPI 2.0 Standard — Wiki',
    description: 'Comprehensive overview of the DEXPI 2.0 specification for data exchange in the process industry.',
};

export default function DexpiOverviewPage() {
    return (
        <article className="max-w-4xl space-y-10 wiki-article">
            {/* Title */}
            <header className="space-y-3">
                <span className="text-xs font-mono text-[#FF6B00]">DEXPI 2.0</span>
                <h1 className="text-3xl font-heading font-bold text-white">
                    Data Exchange in the Process Industry
                </h1>
                <p className="text-gray-400 text-base leading-relaxed">
                    DEXPI is the international standardization initiative for exchanging engineering data
                    in the process industries. Version 2.0, published in October 2025, introduces the
                    unified DEXPI XML schema replacing the legacy ProteusXml format, supporting P&ID,
                    PFD, and BFD diagram types.
                </p>
            </header>

            {/* Infobox */}
            <div className="rounded-xl border border-white/[0.06] p-5 space-y-3" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <h2 className="text-sm font-heading font-semibold text-white">Quick Facts</h2>
                <dl className="grid grid-cols-2 gap-y-2 gap-x-6 text-xs">
                    {[
                        ['Full Name', 'Data Exchange in the Process Industry'],
                        ['Current Version', '2.0 (October 2025)'],
                        ['Previous Format', 'ProteusXml'],
                        ['New Format', 'DEXPI XML'],
                        ['Reference Data', 'POSC Caesar Reference Data Library (RDL)'],
                        ['Ontology', 'OWL-based DEXPI ontology'],
                        ['Diagram Types', 'P&ID, PFD, BFD'],
                        ['Founded', '2011'],
                        ['Organization', 'DEXPI Initiative (dexpi.org)'],
                        ['Key Members', 'BASF, Bayer, Covestro, Evonik, Linde, Siemens, AVEVA, Hexagon'],
                    ].map(([label, value]) => (
                        <div key={label}>
                            <dt className="text-gray-500">{label}</dt>
                            <dd className="text-gray-300 font-medium">{value}</dd>
                        </div>
                    ))}
                </dl>
            </div>

            {/* History */}
            <Section title="History & Purpose" id="history">
                <p>
                    The DEXPI initiative was founded in 2011 by a consortium of major chemical and
                    engineering companies to address the fragmentation of data exchange formats for
                    process engineering documents. Prior to DEXPI, P&ID data exchange relied on
                    vendor-specific formats, ISO 15926 mappings, and the ProteusXml format maintained
                    by the Fiatech consortium.
                </p>
                <p>
                    Version 1.x of the DEXPI specification formalized the P&ID data model using the
                    ProteusXml schema, establishing equipment, piping, instrumentation, and process
                    connection primitives. DEXPI 2.0 (Oct 2025) introduced:
                </p>
                <ul>
                    <li><strong>DEXPI XML</strong> — a new schema replacing ProteusXml with improved namespacing and extensibility</li>
                    <li><strong>Unified specification</strong> — merging P&ID, PFD, and BFD data models into a single document</li>
                    <li><strong>POSC Caesar RDL integration</strong> — each equipment class mapped to a URI in the POSC Caesar Reference Data Library</li>
                    <li><strong>OWL ontology</strong> — machine-readable knowledge representation for semantic interoperability</li>
                    <li><strong>Backward compatibility</strong> — ProteusXml documents remain valid input</li>
                </ul>
            </Section>

            {/* Data Model */}
            <Section title="Data Model Overview" id="data-model">
                <p>
                    The DEXPI data model is centered on the concept of a <code>TaggedPlantItem</code>,
                    which is any identifiable engineered item in a process plant with a unique tag number.
                    The hierarchy extends through several key abstractions:
                </p>
                <div className="rounded-lg border border-white/[0.06] p-4 font-mono text-xs text-gray-400 space-y-1" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <pre>{`TaggedPlantItem (root)
├── Equipment
│   ├── RotatingEquipment (Pump, Compressor, Fan, Turbine, Agitator, Centrifuge)
│   ├── StaticEquipment (Vessel, Column, Reactor, Tank, HeatExchanger, Boiler, Filter)
│   ├── ElectricalEquipment (Transformer, Motor, Generator, Switchgear, UPS, VFD)
│   └── PackagedEquipment (Autoclave, Kiln, Electrolyzer, Dryer, Conveyor)
├── PipingComponent
│   ├── Valve (ControlValve, SafetyValve, GateValve, BallValve, CheckValve)
│   ├── FittingComponent (Elbow, Tee, Reducer, Flange, Gasket)
│   └── InLineComponent (Strainer, FlowMeter, Orifice, FlameArrester)
├── InstrumentComponent
│   ├── FieldInstrument (PT, TT, FT, LT, AT)
│   ├── ControlSystem (DCS, PLC, SIS)
│   └── Analyzer (GasAnalyzer, LiquidAnalyzer)
└── ProcessConnection (Nozzle, Port, ProcessLine, SignalLine)`}</pre>
                </div>
                <p>
                    Each node in the hierarchy is assigned a <strong>ComponentClass</strong> (string identifier)
                    and a <strong>ComponentClassURI</strong> (POSC Caesar RDL URI) enabling unambiguous
                    identification across vendor tools.
                </p>
            </Section>

            {/* POSC Caesar */}
            <Section title="POSC Caesar Reference Data Library" id="posc-caesar">
                <p>
                    The POSC Caesar Association maintains the Reference Data Library (RDL), a shared
                    ontology of process industry concepts. Each DEXPI equipment class is mapped to an
                    RDL URI of the form:
                </p>
                <code className="block bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-2 text-xs text-gray-400 font-mono">
                    http://data.posccaesar.org/rdl/RDS[number]
                </code>
                <p>
                    This enables interoperability between CAD/CAE tools (AVEVA E3D, Hexagon SmartPlant,
                    Siemens Comos), ERP systems, and asset management platforms by providing a common
                    vocabulary for equipment types.
                </p>
            </Section>

            {/* Related Standards */}
            <Section title="Related Standards" id="related">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                        { std: 'ISO 15926', desc: 'Integration of lifecycle data for process plants' },
                        { std: 'ISO 10303 (STEP)', desc: 'Product data exchange using STEP AP' },
                        { std: 'IEC 62424', desc: 'Representation of process control engineering' },
                        { std: 'ISA-5.1', desc: 'Instrumentation symbols and identification' },
                        { std: 'PIP PIC001', desc: 'Piping and instrument diagram documentation criteria' },
                        { std: 'ISA-88', desc: 'Batch process control (S88)' },
                    ].map(({ std, desc }) => (
                        <div
                            key={std}
                            className="rounded-lg border border-white/[0.06] p-3"
                            style={{ background: 'rgba(255,255,255,0.02)' }}
                        >
                            <span className="text-xs font-mono text-[#FF6B00]">{std}</span>
                            <p className="text-xs text-gray-400 mt-1">{desc}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Links */}
            <Section title="Wiki Sections" id="sections">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                        { href: '/wiki/dexpi/equipment-classes', label: 'Equipment Classes', desc: 'Full DEXPI equipment taxonomy with POSC Caesar URIs' },
                        { href: '/wiki/dexpi/data-model', label: 'Data Model', desc: 'Detailed hierarchy and relationship types' },
                        { href: '/wiki/dexpi/xml-schema', label: 'DEXPI XML Schema', desc: 'Schema structure and migration from ProteusXml' },
                        { href: '/wiki/dexpi/standards', label: 'Related Standards', desc: 'ISO 15926, IEC 62424, ISA-5.1, and more' },
                        { href: '/wiki/pipeline', label: 'AI Pipeline V2', desc: '6-stage specialist agent pipeline for equipment generation' },
                        { href: '/wiki/neo4j', label: 'Graph Database', desc: 'Neo4j / Memgraph graph storage documentation' },
                    ].map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="group rounded-lg border border-white/[0.06] p-4 hover:border-white/[0.12] transition-colors"
                            style={{ background: 'rgba(255,255,255,0.02)' }}
                        >
                            <h3 className="text-sm font-semibold text-white group-hover:text-[#FF6B00] transition-colors">
                                {link.label}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">{link.desc}</p>
                        </a>
                    ))}
                </div>
            </Section>
        </article>
    );
}

/** Reusable section component. */
function Section({
    title,
    id,
    children,
}: {
    title: string;
    id: string;
    children: React.ReactNode;
}) {
    return (
        <section id={id} className="space-y-4">
            <h2 className="text-xl font-heading font-semibold text-white">{title}</h2>
            <div className="text-sm text-gray-400 leading-relaxed space-y-3">{children}</div>
        </section>
    );
}
