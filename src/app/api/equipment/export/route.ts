/**
 * Equipment Export API Route.
 *
 * Exports all equipment for a given facility in either DEXPI 2.0 XML format
 * or structured JSON. The XML output conforms to the Proteus schema structure
 * as defined by the DEXPI P&ID Specification 1.3.
 *
 * @route GET /api/equipment/export
 * @query sector - Sector code (e.g., "ENER")
 * @query subSector - Sub-sector code (e.g., "OIL_GAS")
 * @query facility - Facility code (e.g., "REFINERY")
 * @query format - Export format: "xml" (default) or "json"
 *
 * @module api/equipment/export
 */

import { NextRequest, NextResponse } from 'next/server';
import * as storage from '@/lib/storage';
import {
    cardsToPlantModelXml,
    cardsToJsonExport,
    getExportSummary,
    validateForExport,
} from '@/lib/dexpi-export';

/**
 * Handles GET requests for equipment export.
 *
 * @param request - The incoming Next.js request.
 * @returns DEXPI XML or JSON response with appropriate headers.
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const sector = searchParams.get('sector');
        const subSector = searchParams.get('subSector');
        const facility = searchParams.get('facility');
        const format = searchParams.get('format') || 'xml';

        // ── Parameter Validation ──
        if (!sector || !subSector || !facility) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Missing required query parameters: sector, subSector, facility',
                    timestamp: new Date().toISOString(),
                },
                { status: 400 },
            );
        }

        if (!['xml', 'json'].includes(format)) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Invalid format. Supported formats: xml, json',
                    timestamp: new Date().toISOString(),
                },
                { status: 400 },
            );
        }

        // ── Load Equipment ──
        const cards = await storage.listEquipment(sector, subSector, facility);

        if (cards.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: `No equipment found for ${sector}/${subSector}/${facility}`,
                    timestamp: new Date().toISOString(),
                },
                { status: 404 },
            );
        }

        // ── Validate Cards ──
        const validCards = cards.filter((card) => validateForExport(card).valid);
        const summary = getExportSummary(cards);

        const exportOptions = {
            facilityCode: facility,
            sectorCode: sector,
            subSectorCode: subSector,
        };

        // ── XML Export ──
        if (format === 'xml') {
            const xml = cardsToPlantModelXml(validCards, exportOptions);
            const filename = `${sector}-${subSector}-${facility}-dexpi-export.xml`;

            return new NextResponse(xml, {
                status: 200,
                headers: {
                    'Content-Type': 'application/xml; charset=utf-8',
                    'Content-Disposition': `attachment; filename="${filename}"`,
                    'X-DEXPI-Schema-Version': '3.2.0',
                    'X-Equipment-Count': String(validCards.length),
                    'X-Export-Timestamp': new Date().toISOString(),
                },
            });
        }

        // ── JSON Export ──
        const json = cardsToJsonExport(validCards, exportOptions);
        const filename = `${sector}-${subSector}-${facility}-dexpi-export.json`;

        return new NextResponse(json, {
            status: 200,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Disposition': `attachment; filename="${filename}"`,
                'X-Equipment-Count': String(validCards.length),
                'X-Export-Timestamp': new Date().toISOString(),
            },
        });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        console.error('[api/equipment/export] Export failed:', message);

        return NextResponse.json(
            {
                success: false,
                error: `Export failed: ${message}`,
                timestamp: new Date().toISOString(),
            },
            { status: 500 },
        );
    }
}

/**
 * Handles POST requests for equipment export with custom card data.
 *
 * Allows clients to submit an array of EquipmentCard objects directly for
 * conversion to DEXPI XML, without requiring them to be stored first.
 *
 * @param request - The incoming Next.js request with cards in body.
 * @returns DEXPI XML or JSON response.
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { cards, format = 'xml', sector = 'CUSTOM', subSector = 'CUSTOM', facility = 'ADHOC' } = body;

        if (!Array.isArray(cards) || cards.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Request body must contain a non-empty "cards" array',
                    timestamp: new Date().toISOString(),
                },
                { status: 400 },
            );
        }

        const summary = getExportSummary(cards);
        const validCards = cards.filter((card: unknown) => {
            try {
                return validateForExport(card as Parameters<typeof validateForExport>[0]).valid;
            } catch {
                return false;
            }
        });

        const exportOptions = {
            facilityCode: facility,
            sectorCode: sector,
            subSectorCode: subSector,
        };

        if (format === 'xml') {
            const xml = cardsToPlantModelXml(validCards, exportOptions);
            return new NextResponse(xml, {
                status: 200,
                headers: {
                    'Content-Type': 'application/xml; charset=utf-8',
                    'X-DEXPI-Schema-Version': '3.2.0',
                    'X-Equipment-Count': String(validCards.length),
                    'X-Validation-Errors': String(summary.invalidCards),
                },
            });
        }

        // JSON format
        return NextResponse.json({
            success: true,
            data: {
                export: JSON.parse(cardsToJsonExport(validCards, exportOptions)),
                summary,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        console.error('[api/equipment/export] POST export failed:', message);

        return NextResponse.json(
            {
                success: false,
                error: `Export failed: ${message}`,
                timestamp: new Date().toISOString(),
            },
            { status: 500 },
        );
    }
}
