/**
 * DEXPI 2.0 XML Schema Reference — Wiki Page.
 *
 * Interactive reference showing the Proteus XML schema structure used
 * for DEXPI 2.0 equipment data interchange.
 *
 * @module wiki/dexpi/xml-schema/page
 */

export const metadata = {
    title: 'XML Schema Reference — DEXPI Wiki',
    description: 'Interactive reference for the DEXPI 2.0 Proteus XML schema structure with code examples.',
};

const SCHEMA_ELEMENTS = [
    {
        name: 'PlantModel',
        level: 0,
        description: 'Root element. Contains all plant equipment, piping, and instrumentation.',
        attributes: [
            { name: 'xmlns', value: 'http://sandbox.dexpi.org/xml', required: true },
            { name: 'SchemaVersion', value: '3.2.0', required: true },
            { name: 'OriginatingSystem', value: 'e.g. OXOT Equipment Factory', required: true },
            { name: 'Date', value: 'YYYY-MM-DD', required: true },
            { name: 'Time', value: 'HH:MM:SS', required: true },
        ],
    },
    {
        name: 'Equipment',
        level: 1,
        description: 'Represents a single piece of equipment with DEXPI ComponentClass and URI.',
        attributes: [
            { name: 'ID', value: 'Unique identifier', required: true },
            { name: 'ComponentClass', value: 'e.g. ShellTubeHeatExchanger', required: true },
            { name: 'ComponentClassURI', value: 'POSC Caesar RDL URI', required: true },
            { name: 'TagName', value: 'ISA tag (e.g. E-101)', required: true },
            { name: 'ComponentName', value: 'Human-readable name', required: false },
            { name: 'StockNumber', value: 'Catalog reference', required: false },
        ],
    },
    {
        name: 'GenericAttributes',
        level: 2,
        description: 'Container for typed attribute sets (specifications, conditions, materials).',
        attributes: [
            { name: 'Set', value: 'Attribute set name', required: true },
        ],
    },
    {
        name: 'GenericAttribute',
        level: 3,
        description: 'Single typed attribute with name, value, and optional units.',
        attributes: [
            { name: 'Name', value: 'Attribute name', required: true },
            { name: 'Value', value: 'Attribute value', required: true },
            { name: 'Units', value: 'Engineering units', required: false },
            { name: 'Source', value: 'Data source reference', required: false },
        ],
    },
    {
        name: 'Nozzle',
        level: 2,
        description: 'Connection point on equipment for piping/instrumentation attachment.',
        attributes: [
            { name: 'ID', value: 'Unique nozzle identifier', required: true },
            { name: 'TagName', value: 'Nozzle tag (e.g. N1)', required: true },
        ],
    },
];

const ATTRIBUTE_SETS = [
    {
        name: 'DexpiEquipmentAttributes',
        description: 'Equipment-specific design parameters.',
        examples: ['ShellDiameter', 'TubeCount', 'HeatDuty', 'Capacity', 'Speed', 'Power'],
    },
    {
        name: 'OperatingConditions',
        description: 'Process operating and design conditions.',
        examples: ['DesignPressure', 'OperatingPressure', 'DesignTemperature', 'OperatingTemperature', 'FlowRate'],
    },
    {
        name: 'MaterialSpecification',
        description: 'Material of construction references.',
        examples: ['Material_body', 'Material_internals', 'Material_gaskets', 'Material_bolting'],
    },
    {
        name: 'StandardsConformance',
        description: 'Applicable engineering standards and codes.',
        examples: ['ConformsTo (API 660)', 'ConformsTo (ASME VIII)', 'ConformsTo (TEMA R)'],
    },
    {
        name: 'ManufacturerInfo',
        description: 'Manufacturer and vendor information.',
        examples: ['Manufacturer', 'Model', 'PartNumber', 'CatalogURL'],
    },
    {
        name: 'NozzleAttributes',
        description: 'Nozzle connection specifications.',
        examples: ['NominalDiameter', 'PressureRating', 'FacingType', 'Service'],
    },
    {
        name: 'OXOTMetadata',
        description: 'OXOT Equipment Factory extension metadata.',
        examples: ['Version', 'Source', 'ValidationScore', 'ContentHash'],
    },
];

const EXAMPLE_XML = `<?xml version="1.0" encoding="UTF-8"?>
<PlantModel
  xmlns="http://sandbox.dexpi.org/xml"
  SchemaVersion="3.2.0"
  OriginatingSystem="OXOT DEXPI Equipment Factory v1.0"
  Date="2026-02-11"
  Time="12:00:00"
  Sector="ENER"
  SubSector="OIL_GAS"
  Facility="REFINERY">

  <Equipment
    ID="eq-001"
    ComponentClass="ShellTubeHeatExchanger"
    ComponentClassURI="http://data.posccaesar.org/rdl/RDS304199"
    TagName="E-101"
    ComponentName="Feed/Effluent Exchanger">

    <GenericAttributes Set="DexpiEquipmentAttributes">
      <GenericAttribute Name="ShellDiameter"
        Value="36" Units="in" Source="API 660" />
      <GenericAttribute Name="TubeCount"
        Value="240" Units="tubes" />
      <GenericAttribute Name="HeatDuty"
        Value="15.2" Units="MMBtu/hr" />
    </GenericAttributes>

    <GenericAttributes Set="OperatingConditions">
      <GenericAttribute Name="DesignPressure"
        Value="150" Units="psig" />
      <GenericAttribute Name="DesignTemperature"
        Value="750" Units="°F" />
    </GenericAttributes>

    <GenericAttributes Set="MaterialSpecification">
      <GenericAttribute Name="Material_body"
        Value="316L Stainless Steel" />
      <GenericAttribute Name="Material_internals"
        Value="Inconel 625" />
    </GenericAttributes>

    <GenericAttributes Set="StandardsConformance">
      <GenericAttribute Name="ConformsTo"
        Value="API 660" />
      <GenericAttribute Name="ConformsTo"
        Value="ASME Section VIII Div. 1" />
      <GenericAttribute Name="ConformsTo"
        Value="TEMA Class R" />
    </GenericAttributes>

    <Nozzle ID="N1" TagName="N1">
      <GenericAttributes Set="NozzleAttributes">
        <GenericAttribute Name="NominalDiameter"
          Value="4 in" />
        <GenericAttribute Name="PressureRating"
          Value="150#" />
        <GenericAttribute Name="FacingType"
          Value="Raised Face" />
        <GenericAttribute Name="Service"
          Value="Process Inlet" />
      </GenericAttributes>
    </Nozzle>

  </Equipment>

</PlantModel>`;

export default function XmlSchemaPage() {
    return (
        <article className="max-w-5xl space-y-10">
            <header className="space-y-3">
                <span className="text-xs font-mono text-[#FF6B00]">SCHEMA</span>
                <h1 className="text-3xl font-heading font-bold text-white">
                    DEXPI 2.0 XML Schema
                </h1>
                <p className="text-gray-400 text-base leading-relaxed">
                    Reference for the <strong className="text-white">Proteus XML</strong>{' '}
                    schema structure used by DEXPI 2.0 for equipment data interchange.
                    All exports from the Equipment Factory conform to this schema.
                </p>
            </header>

            {/* ── Element Hierarchy ── */}
            <section className="space-y-3">
                <h2 className="text-lg font-heading font-semibold text-white flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-400" />
                    Element Hierarchy
                </h2>

                <div
                    className="rounded-xl border border-white/[0.06] overflow-hidden"
                    style={{ background: 'rgba(255,255,255,0.015)' }}
                >
                    {SCHEMA_ELEMENTS.map((el) => (
                        <div
                            key={el.name}
                            className="border-b border-white/[0.03] p-4 hover:bg-white/[0.02] transition-colors"
                            style={{ paddingLeft: `${el.level * 24 + 16}px` }}
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs text-gray-600">{'<'}</span>
                                <code className="text-sm font-mono text-cyan-400 font-bold">
                                    {el.name}
                                </code>
                                <span className="text-xs text-gray-600">{'>'}</span>
                            </div>
                            <p className="text-xs text-gray-500 mb-2">{el.description}</p>
                            <div className="flex flex-wrap gap-1.5">
                                {el.attributes.map((attr) => (
                                    <span
                                        key={attr.name}
                                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${attr.required
                                            ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                                            : 'bg-white/[0.04] text-gray-500'
                                            }`}
                                    >
                                        {attr.name}
                                        {attr.required && (
                                            <span className="text-red-400 ml-0.5">*</span>
                                        )}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── GenericAttribute Sets ── */}
            <section className="space-y-3">
                <h2 className="text-lg font-heading font-semibold text-white flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                    GenericAttribute Sets
                    <span className="text-xs text-gray-500 font-normal">
                        ({ATTRIBUTE_SETS.length})
                    </span>
                </h2>

                <div className="grid gap-3 md:grid-cols-2">
                    {ATTRIBUTE_SETS.map((set) => (
                        <div
                            key={set.name}
                            className="rounded-xl border border-white/[0.06] p-4"
                            style={{ background: 'rgba(255,255,255,0.015)' }}
                        >
                            <code className="text-xs font-mono text-amber-400 font-bold">
                                {set.name}
                            </code>
                            <p className="text-xs text-gray-500 mt-1 mb-2">
                                {set.description}
                            </p>
                            <div className="flex flex-wrap gap-1">
                                {set.examples.map((ex) => (
                                    <span
                                        key={ex}
                                        className="text-[9px] text-gray-600 bg-white/[0.04] px-1.5 py-0.5 rounded font-mono"
                                    >
                                        {ex}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Example XML ── */}
            <section className="space-y-3">
                <h2 className="text-lg font-heading font-semibold text-white flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    Complete Example
                </h2>
                <p className="text-xs text-gray-500">
                    Full PlantModel export for a Shell &amp; Tube Heat Exchanger with specifications,
                    operating conditions, materials, standards, and nozzle connection.
                </p>
                <div
                    className="rounded-xl border border-white/[0.06] overflow-hidden"
                    style={{ background: 'rgba(0,0,0,0.3)' }}
                >
                    <div className="flex items-center gap-2 px-4 py-2 border-b border-white/[0.06]">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-[10px] text-gray-600 ml-2 font-mono">
                            ENER-OIL_GAS-REFINERY-dexpi-export.xml
                        </span>
                    </div>
                    <pre className="p-4 text-[11px] font-mono text-gray-300 overflow-x-auto leading-relaxed">
                        <code>{EXAMPLE_XML}</code>
                    </pre>
                </div>
            </section>

            {/* ── API Usage ── */}
            <section className="space-y-3">
                <h2 className="text-lg font-heading font-semibold text-white flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-violet-400" />
                    Export API
                </h2>
                <div
                    className="rounded-xl border border-white/[0.06] p-4 space-y-3"
                    style={{ background: 'rgba(255,255,255,0.015)' }}
                >
                    <div>
                        <code className="text-xs font-mono text-emerald-400">
                            GET
                        </code>
                        <code className="text-xs font-mono text-gray-400 ml-2">
                            /api/equipment/export?sector=ENER&amp;subSector=OIL_GAS&amp;facility=REFINERY&amp;format=xml
                        </code>
                    </div>
                    <p className="text-xs text-gray-500">
                        Returns all equipment for the specified facility as DEXPI 2.0 XML.
                        Set <code className="text-gray-400">format=json</code> for structured JSON export.
                    </p>
                    <div className="space-y-1.5">
                        <div className="text-[10px] text-gray-600">Response Headers:</div>
                        <div className="flex flex-wrap gap-2">
                            {[
                                'Content-Type: application/xml',
                                'X-DEXPI-Schema-Version: 3.2.0',
                                'X-Equipment-Count: N',
                                'Content-Disposition: attachment',
                            ].map((h) => (
                                <code
                                    key={h}
                                    className="text-[9px] font-mono text-gray-500 bg-white/[0.04] px-1.5 py-0.5 rounded"
                                >
                                    {h}
                                </code>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            {/* See Also / Backlinks */}
            <section className="border-t border-white/[0.06] pt-6 space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">See Also</h3>
                <div className="flex flex-wrap gap-2">
                    {[
                        { href: '/wiki/dexpi', label: 'DEXPI 2.0 Overview' },
                        { href: '/wiki/dexpi/data-model', label: 'Data Model' },
                        { href: '/wiki/dexpi/equipment-classes', label: 'Equipment Classes' },
                        { href: '/wiki/dexpi/standards', label: 'Engineering Standards' },
                        { href: '/wiki/pipeline', label: 'AI Pipeline' },
                    ].map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-xs px-2.5 py-1 rounded-md border border-white/[0.06] text-gray-400 hover:text-[#FF6B00] hover:border-[#FF6B00]/20 transition-colors"
                        >
                            ← {link.label}
                        </a>
                    ))}
                </div>
            </section>
        </article>
    );
}
