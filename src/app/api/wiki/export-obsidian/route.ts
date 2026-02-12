/**
 * Obsidian Export API Endpoint.
 *
 * POST /api/wiki/export-obsidian
 * Body: { slug: "energy/smart-homes" }
 *
 * Reads the TSX source file for the given wiki page slug,
 * runs the 3-agent Obsidian export pipeline, and returns
 * the validated Markdown for download.
 *
 * @module api/wiki/export-obsidian/route
 */

import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';
import { runObsidianExportPipeline } from '@/lib/agents/obsidian/pipeline';

/**
 * Handles POST requests for Obsidian export.
 *
 * @param request - The incoming POST request with { slug }.
 * @returns JSON response with markdown, filename, audit results, and timing.
 */
export async function POST(request: Request): Promise<NextResponse> {
    try {
        const body = await request.json();
        const slug = body?.slug;

        if (!slug || typeof slug !== 'string') {
            return NextResponse.json(
                { error: 'Missing or invalid "slug" in request body.' },
                { status: 400 },
            );
        }

        // Sanitize slug to prevent path traversal
        const sanitizedSlug = slug.replace(/\.\./g, '').replace(/[^a-zA-Z0-9/-]/g, '');

        // Resolve the TSX file path
        const tsxPath = path.join(
            process.cwd(),
            'src',
            'app',
            'wiki',
            sanitizedSlug,
            'page.tsx',
        );

        // Read the TSX source
        let tsxSource: string;
        try {
            tsxSource = await readFile(tsxPath, 'utf-8');
        } catch {
            return NextResponse.json(
                {
                    error: `Wiki page not found: ${sanitizedSlug}`,
                    detail: `No page.tsx at: ${tsxPath}`,
                },
                { status: 404 },
            );
        }

        // Run the 3-agent pipeline
        const urlPath = `/wiki/${sanitizedSlug}`;
        const result = await runObsidianExportPipeline({
            slug: sanitizedSlug,
            tsxSource,
            urlPath,
        });

        return NextResponse.json({
            markdown: result.markdown,
            filename: result.filename,
            audit: result.audit,
            timing: result.timing,
        });
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error(`[export-obsidian] Pipeline error: ${message}`);

        return NextResponse.json(
            {
                error: 'Obsidian export pipeline failed.',
                detail: message,
            },
            { status: 500 },
        );
    }
}
