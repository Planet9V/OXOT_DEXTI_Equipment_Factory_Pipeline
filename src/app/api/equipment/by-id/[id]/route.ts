/**
 * Equipment by ID API Route.
 *
 * GET    /api/equipment/by-id/[id] — Retrieve equipment by UUID (with assignments).
 * PUT    /api/equipment/by-id/[id] — Update equipment properties.
 * DELETE /api/equipment/by-id/[id] — Delete equipment node entirely.
 *
 * @module api/equipment/by-id/[id]
 */

import { NextRequest, NextResponse } from 'next/server';
import * as schema from '@/lib/graph-schema';

interface RouteParams {
    params: Promise<{ id: string }>;
}

/**
 * GET /api/equipment/by-id/:id
 *
 * Retrieves a single equipment record by UUID, including facility assignments.
 */
export async function GET(_req: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const equipment = await schema.getEquipmentById(id);
        if (!equipment) {
            return NextResponse.json(
                { success: false, error: 'Equipment not found', timestamp: new Date().toISOString() },
                { status: 404 },
            );
        }
        return NextResponse.json({
            success: true,
            data: equipment,
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

/**
 * PUT /api/equipment/by-id/:id
 *
 * Updates an existing equipment record's properties.
 * Body: partial equipment data (any DEXPI 2.0 fields to update).
 */
export async function PUT(req: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const updates = await req.json();
        const success = await schema.updateEquipmentNode(id, updates);
        if (!success) {
            return NextResponse.json(
                { success: false, error: 'Equipment not found', timestamp: new Date().toISOString() },
                { status: 404 },
            );
        }
        const updated = await schema.getEquipmentById(id);
        return NextResponse.json({
            success: true,
            data: updated,
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

/**
 * DELETE /api/equipment/by-id/:id
 *
 * Deletes an equipment node and all its child components (nozzles, vendor variations).
 */
export async function DELETE(_req: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const existing = await schema.getEquipmentById(id);
        if (!existing) {
            return NextResponse.json(
                { success: false, error: 'Equipment not found', timestamp: new Date().toISOString() },
                { status: 404 },
            );
        }
        await schema.deleteEquipmentById(id);
        return NextResponse.json({
            success: true,
            message: `Equipment ${id} deleted`,
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
