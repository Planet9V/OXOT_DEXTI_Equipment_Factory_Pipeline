/**
 * Equipment Assignment API Route.
 *
 * POST   /api/equipment/by-id/[id]/assign — Assign equipment to a facility.
 * DELETE /api/equipment/by-id/[id]/assign — Remove equipment from a facility.
 *
 * @module api/equipment/by-id/[id]/assign
 */

import { NextRequest, NextResponse } from 'next/server';
import * as schema from '@/lib/graph-schema';

interface RouteParams {
    params: Promise<{ id: string }>;
}

/**
 * POST /api/equipment/by-id/:id/assign
 *
 * Assigns equipment to a facility (many-to-many, idempotent).
 * Body: { facilityCode: "TRAN-AV-ARPT" }
 */
export async function POST(req: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const { facilityCode } = await req.json();

        if (!facilityCode) {
            return NextResponse.json(
                { success: false, error: 'facilityCode is required', timestamp: new Date().toISOString() },
                { status: 400 },
            );
        }

        const success = await schema.assignEquipmentToFacility(id, facilityCode);
        if (!success) {
            return NextResponse.json(
                {
                    success: false,
                    error: `Equipment '${id}' or Facility '${facilityCode}' not found`,
                    timestamp: new Date().toISOString(),
                },
                { status: 404 },
            );
        }

        const equipment = await schema.getEquipmentById(id);
        return NextResponse.json({
            success: true,
            data: equipment,
            message: `Equipment ${id} assigned to facility ${facilityCode}`,
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
 * DELETE /api/equipment/by-id/:id/assign
 *
 * Removes equipment from a facility (does NOT delete the equipment).
 * Body: { facilityCode: "TRAN-AV-ARPT" }
 */
export async function DELETE(req: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const { facilityCode } = await req.json();

        if (!facilityCode) {
            return NextResponse.json(
                { success: false, error: 'facilityCode is required', timestamp: new Date().toISOString() },
                { status: 400 },
            );
        }

        const removed = await schema.removeEquipmentFromFacility(id, facilityCode);
        if (!removed) {
            return NextResponse.json(
                {
                    success: false,
                    error: `No assignment found between '${id}' and '${facilityCode}'`,
                    timestamp: new Date().toISOString(),
                },
                { status: 404 },
            );
        }

        const equipment = await schema.getEquipmentById(id);
        return NextResponse.json({
            success: true,
            data: equipment,
            message: `Equipment ${id} removed from facility ${facilityCode}`,
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
