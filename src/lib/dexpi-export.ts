/**
 * DEXPI 2.0 XML Export Module.
 *
 * Converts EquipmentCard JSON objects to DEXPI 2.0 compliant XML following
 * the Proteus schema specification. Produces valid XML that conforms to the
 * DEXPI P&ID Specification 1.3 equipment element structure.
 *
 * Key features:
 * - Single equipment card → XML element conversion
 * - Batch facility export with proper PlantModel wrapper
 * - Full GenericAttributes support (specifications, operating conditions)
 * - Nozzle sub-element generation
 * - Material and standard reference linking
 * - XML escaping and pretty-printing
 *
 * @module dexpi-export
 */

import { EquipmentCard, NozzleSpec } from './types';

// ─── Constants ────────────────────────────────────────────────────────────────

/** DEXPI Proteus XML namespace. */
const DEXPI_NS = 'http://sandbox.dexpi.org/xml';

/** Proteus schema version aligned with DEXPI P&ID Spec 1.3. */
const SCHEMA_VERSION = '3.2.0';

/** Originating system identifier. */
const ORIGINATING_SYSTEM = 'OXOT DEXPI Equipment Factory v1.0';

// ─── XML Utilities ────────────────────────────────────────────────────────────

/**
 * Escapes special XML characters in a string value.
 *
 * @param str - The raw string to escape.
 * @returns XML-safe string with all 5 predefined entities replaced.
 */
export function escapeXml(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

/**
 * Generates an XML attribute string from key-value pairs.
 * Omits entries with null/undefined values.
 *
 * @param attrs - Record of attribute name → value pairs.
 * @returns Formatted attribute string (e.g., `key1="val1" key2="val2"`).
 */
function formatAttrs(attrs: Record<string, string | number | undefined | null>): string {
    return Object.entries(attrs)
        .filter(([, v]) => v != null && v !== '')
        .map(([k, v]) => `${k}="${escapeXml(String(v))}"`)
        .join(' ');
}

/**
 * Indents each line of a multi-line string by a given depth.
 *
 * @param content - The string content to indent.
 * @param depth - Number of 2-space indentation levels.
 * @returns Indented string.
 */
function indent(content: string, depth: number): string {
    const prefix = '  '.repeat(depth);
    return content
        .split('\n')
        .map((line) => (line.trim() ? `${prefix}${line}` : ''))
        .join('\n');
}

// ─── Nozzle Export ────────────────────────────────────────────────────────────

/**
 * Converts a NozzleSpec to a DEXPI `<Nozzle>` XML element.
 *
 * @param nozzle - The nozzle specification object.
 * @returns XML string for the Nozzle element.
 */
export function nozzleToXml(nozzle: NozzleSpec): string {
    const attrs = formatAttrs({
        ID: nozzle.id,
        TagName: nozzle.id,
    });

    const genericAttrs = [
        nozzle.size ? `<GenericAttribute Name="NominalDiameter" Value="${escapeXml(nozzle.size)}" />` : '',
        nozzle.rating ? `<GenericAttribute Name="PressureRating" Value="${escapeXml(nozzle.rating)}" />` : '',
        nozzle.facing ? `<GenericAttribute Name="FacingType" Value="${escapeXml(nozzle.facing)}" />` : '',
        nozzle.service ? `<GenericAttribute Name="Service" Value="${escapeXml(nozzle.service)}" />` : '',
    ].filter(Boolean);

    if (genericAttrs.length === 0) {
        return `<Nozzle ${attrs} />`;
    }

    return [
        `<Nozzle ${attrs}>`,
        `  <GenericAttributes Set="NozzleAttributes">`,
        ...genericAttrs.map((a) => `    ${a}`),
        `  </GenericAttributes>`,
        `</Nozzle>`,
    ].join('\n');
}

// ─── Equipment Export ─────────────────────────────────────────────────────────

/**
 * Converts a single EquipmentCard to a DEXPI `<Equipment>` XML element.
 *
 * Produces a fully-formed Equipment element with:
 * - ComponentClass and ComponentClassURI attributes
 * - GenericAttributes for specifications
 * - GenericAttributes for operating conditions
 * - Material references
 * - Standard conformance references
 * - Nozzle sub-elements
 *
 * @param card - The EquipmentCard to convert.
 * @returns XML string for the Equipment element.
 */
export function equipmentToXml(card: EquipmentCard): string {
    const equipAttrs = formatAttrs({
        ID: card.id,
        ComponentClass: card.componentClass,
        ComponentClassURI: card.componentClassURI,
        TagName: card.tag,
        ComponentName: card.displayName,
        StockNumber: '',
    });

    const lines: string[] = [];
    lines.push(`<Equipment ${equipAttrs}>`);

    // ── Specification Attributes ──
    const specEntries = Object.entries(card.specifications);
    if (specEntries.length > 0) {
        lines.push(`  <GenericAttributes Set="DexpiEquipmentAttributes">`);
        for (const [name, spec] of specEntries) {
            const attrParts = formatAttrs({
                Name: name,
                Value: String(spec.value),
                Units: spec.unit,
                Source: spec.source,
            });
            lines.push(`    <GenericAttribute ${attrParts} />`);
        }
        lines.push(`  </GenericAttributes>`);
    }

    // ── Operating Conditions ──
    const opCond = card.operatingConditions;
    const opCondLines: string[] = [];

    if (opCond.designPressure != null) {
        opCondLines.push(
            `    <GenericAttribute ${formatAttrs({
                Name: 'DesignPressure',
                Value: String(opCond.designPressure),
                Units: opCond.units?.designPressure ?? 'psig',
            })} />`,
        );
    }
    if (opCond.operatingPressure != null) {
        opCondLines.push(
            `    <GenericAttribute ${formatAttrs({
                Name: 'OperatingPressure',
                Value: String(opCond.operatingPressure),
                Units: opCond.units?.operatingPressure ?? 'psig',
            })} />`,
        );
    }
    if (opCond.designTemperature != null) {
        opCondLines.push(
            `    <GenericAttribute ${formatAttrs({
                Name: 'DesignTemperature',
                Value: String(opCond.designTemperature),
                Units: opCond.units?.designTemperature ?? '°F',
            })} />`,
        );
    }
    if (opCond.operatingTemperature != null) {
        opCondLines.push(
            `    <GenericAttribute ${formatAttrs({
                Name: 'OperatingTemperature',
                Value: String(opCond.operatingTemperature),
                Units: opCond.units?.operatingTemperature ?? '°F',
            })} />`,
        );
    }
    if (opCond.flowRate != null) {
        opCondLines.push(
            `    <GenericAttribute ${formatAttrs({
                Name: 'FlowRate',
                Value: String(opCond.flowRate),
                Units: opCond.units?.flowRate ?? 'gpm',
            })} />`,
        );
    }

    if (opCondLines.length > 0) {
        lines.push(`  <GenericAttributes Set="OperatingConditions">`);
        lines.push(...opCondLines);
        lines.push(`  </GenericAttributes>`);
    }

    // ── Materials ──
    const materialEntries = Object.entries(card.materials).filter(
        ([, v]) => v != null && v !== '',
    );
    if (materialEntries.length > 0) {
        lines.push(`  <GenericAttributes Set="MaterialSpecification">`);
        for (const [usage, material] of materialEntries) {
            lines.push(
                `    <GenericAttribute ${formatAttrs({
                    Name: `Material_${usage}`,
                    Value: material!,
                })} />`,
            );
        }
        lines.push(`  </GenericAttributes>`);
    }

    // ── Standards Conformance ──
    if (card.standards.length > 0) {
        lines.push(`  <GenericAttributes Set="StandardsConformance">`);
        for (const std of card.standards) {
            lines.push(
                `    <GenericAttribute ${formatAttrs({
                    Name: 'ConformsTo',
                    Value: std,
                })} />`,
            );
        }
        lines.push(`  </GenericAttributes>`);
    }

    // ── Manufacturers ──
    if (card.manufacturers.length > 0) {
        lines.push(`  <GenericAttributes Set="ManufacturerInfo">`);
        for (const mfr of card.manufacturers) {
            lines.push(
                `    <GenericAttribute ${formatAttrs({
                    Name: 'Manufacturer',
                    Value: mfr,
                })} />`,
            );
        }
        lines.push(`  </GenericAttributes>`);
    }

    // ── Nozzles ──
    for (const nozzle of card.nozzles) {
        lines.push(indent(nozzleToXml(nozzle), 1));
    }

    // ── Metadata (as DEXPI extension) ──
    lines.push(`  <GenericAttributes Set="OXOTMetadata">`);
    lines.push(
        `    <GenericAttribute ${formatAttrs({
            Name: 'Version',
            Value: String(card.metadata.version),
        })} />`,
    );
    lines.push(
        `    <GenericAttribute ${formatAttrs({
            Name: 'Source',
            Value: card.metadata.source,
        })} />`,
    );
    lines.push(
        `    <GenericAttribute ${formatAttrs({
            Name: 'ValidationScore',
            Value: String(card.metadata.validationScore),
        })} />`,
    );
    lines.push(
        `    <GenericAttribute ${formatAttrs({
            Name: 'ContentHash',
            Value: card.metadata.contentHash,
        })} />`,
    );
    lines.push(`  </GenericAttributes>`);

    lines.push(`</Equipment>`);

    return lines.join('\n');
}

// ─── PlantModel Wrapper ───────────────────────────────────────────────────────

/**
 * Options for generating a PlantModel XML document.
 */
export interface PlantModelOptions {
    /** Facility code for the export. */
    facilityCode: string;
    /** Sector code. */
    sectorCode: string;
    /** Sub-sector code. */
    subSectorCode: string;
    /** Optional override for the date string (ISO format). */
    date?: string;
    /** Optional override for the time string (HH:MM:SS). */
    time?: string;
}

/**
 * Wraps an array of EquipmentCard objects in a complete DEXPI `<PlantModel>` XML document.
 *
 * Produces a standalone XML document with:
 * - XML declaration with UTF-8 encoding
 * - PlantModel root element with DEXPI namespace
 * - Schema version and originating system metadata
 * - All equipment elements as children
 *
 * @param cards - Array of EquipmentCard objects to include.
 * @param options - PlantModel configuration options.
 * @returns Complete XML document string.
 */
export function cardsToPlantModelXml(
    cards: EquipmentCard[],
    options: PlantModelOptions,
): string {
    const now = new Date();
    const dateStr = options.date ?? now.toISOString().split('T')[0];
    const timeStr = options.time ?? now.toISOString().split('T')[1].split('.')[0];

    const plantModelAttrs = formatAttrs({
        xmlns: DEXPI_NS,
        SchemaVersion: SCHEMA_VERSION,
        OriginatingSystem: ORIGINATING_SYSTEM,
        Date: dateStr,
        Time: timeStr,
        Sector: options.sectorCode,
        SubSector: options.subSectorCode,
        Facility: options.facilityCode,
    });

    const equipmentXml = cards
        .map((card) => indent(equipmentToXml(card), 1))
        .join('\n\n');

    return [
        `<?xml version="1.0" encoding="UTF-8"?>`,
        `<!--`,
        `  DEXPI 2.0 Equipment Export`,
        `  Generated by: ${ORIGINATING_SYSTEM}`,
        `  Facility: ${options.facilityCode}`,
        `  Sector: ${options.sectorCode} / ${options.subSectorCode}`,
        `  Date: ${dateStr} ${timeStr}`,
        `  Equipment Count: ${cards.length}`,
        `-->`,
        `<PlantModel ${plantModelAttrs}>`,
        equipmentXml,
        `</PlantModel>`,
    ].join('\n');
}

// ─── JSON Export ──────────────────────────────────────────────────────────────

/**
 * Formats an array of EquipmentCards as a structured JSON export.
 *
 * Adds export metadata (timestamp, counts, facility info) around the cards array.
 *
 * @param cards - Array of EquipmentCard objects.
 * @param options - Export options for metadata.
 * @returns Formatted JSON string.
 */
export function cardsToJsonExport(
    cards: EquipmentCard[],
    options: PlantModelOptions,
): string {
    const exportData = {
        exportMetadata: {
            format: 'DEXPI-JSON',
            version: '1.0.0',
            originatingSystem: ORIGINATING_SYSTEM,
            exportDate: new Date().toISOString(),
            facility: options.facilityCode,
            sector: options.sectorCode,
            subSector: options.subSectorCode,
            equipmentCount: cards.length,
            categories: [...new Set(cards.map((c) => c.category))],
        },
        equipment: cards,
    };

    return JSON.stringify(exportData, null, 2);
}

// ─── Validation ───────────────────────────────────────────────────────────────

/**
 * Validates that an EquipmentCard has the minimum required fields for XML export.
 *
 * @param card - The card to validate.
 * @returns Object with `valid` boolean and optional `errors` array.
 */
export function validateForExport(card: EquipmentCard): {
    valid: boolean;
    errors: string[];
} {
    const errors: string[] = [];

    if (!card.id) errors.push('Missing required field: id');
    if (!card.tag) errors.push('Missing required field: tag');
    if (!card.componentClass) errors.push('Missing required field: componentClass');
    if (!card.componentClassURI) errors.push('Missing required field: componentClassURI');
    if (!card.displayName) errors.push('Missing required field: displayName');
    if (!card.sector) errors.push('Missing required field: sector');
    if (!card.subSector) errors.push('Missing required field: subSector');
    if (!card.facility) errors.push('Missing required field: facility');

    // Validate URI format
    if (card.componentClassURI && !card.componentClassURI.startsWith('http')) {
        errors.push(`Invalid ComponentClassURI format: ${card.componentClassURI}`);
    }

    // Validate nozzles
    for (const nozzle of card.nozzles) {
        if (!nozzle.id) errors.push(`Nozzle missing required field: id`);
    }

    return { valid: errors.length === 0, errors };
}

/**
 * Summary statistics for an export batch.
 */
export interface ExportSummary {
    /** Total number of cards processed. */
    totalCards: number;
    /** Number of cards that passed validation. */
    validCards: number;
    /** Number of cards that failed validation. */
    invalidCards: number;
    /** Breakdown by equipment category. */
    byCategory: Record<string, number>;
    /** Breakdown by component class. */
    byComponentClass: Record<string, number>;
    /** Validation errors grouped by card ID. */
    validationErrors: Record<string, string[]>;
}

/**
 * Generates an export summary for a batch of equipment cards.
 *
 * @param cards - Array of EquipmentCard objects to summarize.
 * @returns Export summary with counts and breakdowns.
 */
export function getExportSummary(cards: EquipmentCard[]): ExportSummary {
    const byCategory: Record<string, number> = {};
    const byComponentClass: Record<string, number> = {};
    const validationErrors: Record<string, string[]> = {};
    let validCards = 0;
    let invalidCards = 0;

    for (const card of cards) {
        // Category counts
        byCategory[card.category] = (byCategory[card.category] || 0) + 1;

        // Component class counts
        byComponentClass[card.componentClass] =
            (byComponentClass[card.componentClass] || 0) + 1;

        // Validation
        const result = validateForExport(card);
        if (result.valid) {
            validCards++;
        } else {
            invalidCards++;
            validationErrors[card.id || card.tag || 'unknown'] = result.errors;
        }
    }

    return {
        totalCards: cards.length,
        validCards,
        invalidCards,
        byCategory,
        byComponentClass,
        validationErrors,
    };
}
