/**
 * Batch Equipment Check API Route.
 *
 * POST /api/pipeline/batch-check — Checks which equipment names already
 * exist in Memgraph and which need to be generated.
 *
 * @module api/pipeline/batch-check
 */

import { NextRequest, NextResponse } from 'next/server';
import * as schema from '@/lib/graph-schema';

interface BatchCheckRequest {
    /** List of equipment names to check. */
    items: string[];
}

interface ExistingItem {
    /** Original input name. */
    name: string;
    /** Equipment ID in the graph. */
    id: string;
    /** Equipment tag. */
    tag: string;
    /** Component class. */
    componentClass: string;
    /** Display name. */
    displayName: string;
}

/**
 * POST /api/pipeline/batch-check
 *
 * Accepts a list of equipment names and returns which already exist in
 * the graph database vs which are missing and need generation.
 *
 * Body: { items: string[] }
 * Response: { existing: ExistingItem[], missing: string[] }
 */
export async function POST(req: NextRequest) {
    try {
        const body: BatchCheckRequest = await req.json();

        if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Required: items (non-empty array of equipment names)',
                    timestamp: new Date().toISOString(),
                },
                { status: 400 },
            );
        }

        // Deduplicate and clean input
        const cleaned = [...new Set(
            body.items
                .map(s => s.trim())
                .filter(s => s.length > 0),
        )];

        const existing: ExistingItem[] = [];
        const missing: string[] = [];

        for (const name of cleaned) {
            try {
                // Search by displayName or componentClass match
                const result = await schema.searchEquipmentNodes(
                    { searchTerm: name },
                    1,
                    5,
                );

                // Check for exact or close match
                const match = result.items.find((item: any) =>
                    item.displayName?.toLowerCase() === name.toLowerCase() ||
                    item.componentClass?.toLowerCase() === name.toLowerCase() ||
                    item.tag?.toLowerCase() === name.toLowerCase()
                );

                if (match) {
                    existing.push({
                        name,
                        id: match.id,
                        tag: match.tag,
                        componentClass: match.componentClass,
                        displayName: match.displayName,
                    });
                } else {
                    missing.push(name);
                }
            } catch (err) {
                // If search fails for one item, treat as missing
                console.warn(`[batch-check] Search failed for "${name}":`, err);
                missing.push(name);
            }
        }

        return NextResponse.json({
            success: true,
            data: {
                existing,
                missing,
                total: cleaned.length,
                existingCount: existing.length,
                missingCount: missing.length,
            },
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
