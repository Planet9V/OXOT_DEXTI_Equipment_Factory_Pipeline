/**
 * Equipment Categories API Route.
 *
 * GET /api/equipment/categories — Returns distinct equipment categories from Memgraph.
 *
 * @module api/equipment/categories
 */

import { NextResponse } from 'next/server';
import { runQuery } from '@/lib/memgraph';

/**
 * GET /api/equipment/categories
 *
 * Queries Memgraph for all distinct equipment category values.
 * Falls back to a default set when the database is unavailable.
 */
export async function GET() {
    const ts = new Date().toISOString();

    try {
        const records = await runQuery(
            `MATCH (e:Equipment) WHERE e.category IS NOT NULL
             RETURN DISTINCT e.category AS category ORDER BY category`,
        );
        const categories = records.map((r) => r.get('category') as string);

        if (categories.length > 0) {
            return NextResponse.json({
                success: true,
                data: categories,
                source: 'graph',
                timestamp: ts,
            });
        }

        // No equipment in DB yet — return known defaults
        return NextResponse.json({
            success: true,
            data: ['rotating', 'static', 'instrumentation', 'electrical', 'piping'],
            source: 'defaults',
            timestamp: ts,
        });
    } catch {
        // Memgraph offline — return defaults
        return NextResponse.json({
            success: true,
            data: ['rotating', 'static', 'instrumentation', 'electrical', 'piping'],
            source: 'defaults',
            timestamp: ts,
        });
    }
}
