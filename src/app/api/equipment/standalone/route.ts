/**
 * Standalone Equipment API Route.
 *
 * POST /api/equipment/standalone — Create a standalone equipment record (no facility required).
 * GET  /api/equipment/standalone — List/search all equipment with filters.
 *
 * @module api/equipment/standalone
 */

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import * as schema from '@/lib/graph-schema';

/**
 * POST /api/equipment/standalone
 *
 * Creates a standalone equipment record in Memgraph.
 * No facility is required — equipment exists independently.
 *
 * Body: { tag, componentClass, componentClassURI, displayName, category, ... }
 */
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        if (!body.tag || !body.componentClass || !body.componentClassURI || !body.displayName || !body.category) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Required fields: tag, componentClass, componentClassURI, displayName, category',
                    timestamp: new Date().toISOString(),
                },
                { status: 400 },
            );
        }

        const id = await schema.createEquipmentStandalone({
            id: body.id || crypto.randomUUID(),
            tag: body.tag,
            componentClass: body.componentClass,
            componentClassURI: body.componentClassURI,
            displayName: body.displayName,
            category: body.category,
            description: body.description,
            sector: body.sector,
            subSector: body.subSector,
            facility: body.facility, // optional — will auto-assign if provided
            metadata: body.metadata,
            specifications: body.specifications,
            operatingConditions: body.operatingConditions,
            materials: body.materials,
            standards: body.standards,
            manufacturers: body.manufacturers,
        });

        const created = await schema.getEquipmentById(id);
        return NextResponse.json(
            { success: true, data: created, timestamp: new Date().toISOString() },
            { status: 201 },
        );
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        return NextResponse.json(
            { success: false, error: msg, timestamp: new Date().toISOString() },
            { status: 500 },
        );
    }
}

/**
 * GET /api/equipment/standalone
 *
 * Lists/searches equipment with filters.
 *
 * Query params:
 * - componentClass, category, sector, subSector, facility, source
 * - q (text search term for displayName/tag)
 * - unassigned (if "true", only returns unassigned equipment)
 * - page, pageSize
 */
export async function GET(req: NextRequest) {
    try {
        const url = req.nextUrl;
        const filter = {
            componentClass: url.searchParams.get('componentClass') || undefined,
            category: url.searchParams.get('category') || undefined,
            sector: url.searchParams.get('sector') || undefined,
            subSector: url.searchParams.get('subSector') || undefined,
            facility: url.searchParams.get('facility') || undefined,
            source: url.searchParams.get('source') || undefined,
            searchTerm: url.searchParams.get('q') || undefined,
            minValidationScore: url.searchParams.get('minScore')
                ? Number(url.searchParams.get('minScore'))
                : undefined,
        };
        const unassignedOnly = url.searchParams.get('unassigned') === 'true';
        const page = Number(url.searchParams.get('page')) || 1;
        const pageSize = Math.min(Number(url.searchParams.get('pageSize')) || 50, 200);

        const result = await schema.searchEquipmentNodes(filter, page, pageSize);

        // If unassigned filter, post-filter (graph search handles the rest)
        let items = result.items;
        if (unassignedOnly) {
            const allUnassigned = await schema.listAllEquipment(true);
            const unassignedIds = new Set(allUnassigned.map((e: any) => e.id));
            items = items.filter((e: any) => unassignedIds.has(e.id));
        }

        return NextResponse.json({
            success: true,
            data: { items, total: result.total, page, pageSize },
            timestamp: new Date().toISOString(),
        });
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        return NextResponse.json(
            { success: false, error: msg, timestamp: new Date().toISOString() },
            { status: 500 },
        );
    }
}
