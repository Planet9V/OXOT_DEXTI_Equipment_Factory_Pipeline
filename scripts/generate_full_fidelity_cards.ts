import * as fs from 'fs';
import * as path from 'path';
import { DexpiAgent } from '../src/lib/agents/agent';

async function main() {
    console.log('[generator] Starting Full-Fidelity DEXPI Cards generation...');

    // Ensure OpenRouter API key exists
    if (!process.env.OPENROUTER_API_KEY) {
        console.error('[generator] Missing OPENROUTER_API_KEY environment variable.');
        process.exit(1);
    }

    const agent = new DexpiAgent();
    const registryPath = path.join(__dirname, '..', 'oil_and_gas_equipment_registry.json');
    const outputPath = path.join(__dirname, '..', 'src', 'lib', 'resources', 'full_fidelity_cards.json');

    if (!fs.existsSync(registryPath)) {
        console.error(`[generator] Input registry not found at ${registryPath}`);
        process.exit(1);
    }

    // Read the registry
    const registryData = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
    const equipmentList = registryData.equipment || [];
    console.log(`[generator] Loaded ${equipmentList.length} equipment types from registry.`);

    // Read existing output if available
    let existingCards: any[] = [];
    if (fs.existsSync(outputPath)) {
        try {
            existingCards = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
            console.log(`[generator] Loaded ${existingCards.length} existing cards.`);
        } catch {
            console.log(`[generator] Could not read existing output, starting fresh.`);
        }
    }

    // Process in batches
    const BATCH_SIZE = 5;
    const itemsToProcess = equipmentList.slice(existingCards.length);

    for (let i = 0; i < itemsToProcess.length; i += BATCH_SIZE) {
        const batch = itemsToProcess.slice(i, i + BATCH_SIZE);
        const batchJson = JSON.stringify(batch, null, 2);

        console.log(`\n[generator] Processing batch ${i / BATCH_SIZE + 1} (${batch.length} items)...`);

        try {
            const response = await agent.chat(
                [{ role: 'user', content: 'Generate full-fidelity DEXPI 2.0 cards for the provided reference equipment list.' }],
                'theEngineer',
                { referenceEquipment: batchJson }
            );

            // Extract JSON array
            const match = response.content.match(/\[[\s\S]*\]/);
            if (match) {
                const parsedBatch = JSON.parse(match[0]);
                if (Array.isArray(parsedBatch)) {
                    existingCards.push(...parsedBatch);

                    // Save incrementally
                    fs.writeFileSync(outputPath, JSON.stringify(existingCards, null, 2));
                    console.log(`[generator] Successfully generated ${parsedBatch.length} cards. Total: ${existingCards.length}`);
                } else {
                    console.warn(`[generator] Parsed JSON is not an array. Skipping batch.`);
                }
            } else {
                console.warn(`[generator] Failed to find JSON array in response. Raw response:\n${response.content}`);
            }
        } catch (err) {
            console.error(`[generator] Failed to process batch:`, err);
        }
    }

    console.log(`\n[generator] Done! Generated ${existingCards.length} total cards.`);
}

if (require.main === module) {
    main().catch(console.error);
}
