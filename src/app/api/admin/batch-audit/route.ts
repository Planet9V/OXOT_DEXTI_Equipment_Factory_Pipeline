import { NextResponse } from 'next/server';
import { getPipelineV2 } from '@/lib/agents/pipeline-v2';
import path from 'path';
import fs from 'fs/promises';

/**
 * POST /api/admin/batch-audit
 * 
 * Process a chunk of the audit list.
 * Body: { offset: number, limit: number, dryRun?: boolean }
 */
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const offset = body.offset || 0;
        const limit = body.limit || 10;
        const dryRun = body.dryRun === true;

        // 1. Read and Parse Markdown File
        const filePath = path.join(process.cwd(), 'src/app/wiki/docs/equipment_to_be_initially_processed_2026_2_13.md');
        const fileContent = await fs.readFile(filePath, 'utf-8');

        const lines = fileContent.split('\n');
        // Skip header (2 lines) and empty lines
        const dataLines = lines.slice(2).filter(line => line.trim().startsWith('|'));

        // Parse items
        const allItems = dataLines.map(line => {
            // | Short Name | ID | Industry | Type | ...
            const parts = line.split('|').map(s => s.trim());
            // parts[0] is empty (before first |), parts[1] is Short Name, parts[4] is Type
            const tag = parts[1];
            const equipmentClass = parts[4];
            const industry = parts[3]; // Hint? NUCL, CHEM etc.

            return { tag, equipmentClass, industry };
        }).filter(item => item.tag && item.equipmentClass && item.tag !== 'Short Name' && !item.tag.includes('---'));

        // 2. Slice Chunk
        const chunk = allItems.slice(offset, offset + limit);

        if (chunk.length === 0) {
            return NextResponse.json({ message: 'No more items', count: 0 });
        }

        if (dryRun) {
            return NextResponse.json({
                message: 'Dry run',
                count: chunk.length,
                sample: chunk.slice(0, 3)
            });
        }

        // 3. Submit Batch to Pipeline
        const pipeline = getPipelineV2();

        // Map to PipelineV2BatchParams items
        const batchItems = chunk.map(item => ({
            equipmentClass: item.equipmentClass,
            tag: item.tag
        }));

        const runId = await pipeline.submitBatchRun({
            items: batchItems,
            sectorHint: 'Reference Standards', // FORCE GENERIC
            minQualityScore: 80
        });

        return NextResponse.json({
            success: true,
            runId,
            count: chunk.length,
            offset,
            limit,
            items: batchItems.map(i => `${i.equipmentClass} (${i.tag})`)
        });

    } catch (error) {
        console.error('Batch audit error:', error);
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}
