import * as fs from 'fs';
import * as path from 'path';
import { DexpiAgent } from '../src/lib/agents/agent';

async function generateFullFidelityCards() {
    console.log('=== Full-Fidelity DEXPI Cards Generator ===');

    if (!process.env.OPENROUTER_API_KEY) {
        console.error('Error: OPENROUTER_API_KEY environment variable is missing.');
        process.exit(1);
    }

    const agent = new DexpiAgent({
        temperature: 0.2, // Low temperature for more deterministic/factual output
    });

    const registryPath = path.join(process.cwd(), 'oil_and_gas_equipment_registry.json');
    if (!fs.existsSync(registryPath)) {
        console.error(`Error: Registry file not found at ${registryPath}`);
        process.exit(1);
    }

    const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));
    if (!registry.equipment || !Array.isArray(registry.equipment)) {
        console.error('Error: Invalid registry format. Expected an "equipment" array.');
        process.exit(1);
    }

    const equipmentTypes = registry.equipment;
    console.log(`Loaded ${equipmentTypes.length} equipment types from registry.`);

    const outputCards: any[] = [];
    const batchSize = 5;

    for (let i = 0; i < equipmentTypes.length; i += batchSize) {
        const batch = equipmentTypes.slice(i, i + batchSize);
        console.log(`\nProcessing batch ${Math.floor(i / batchSize) + 1} of ${Math.ceil(equipmentTypes.length / batchSize)}...`);
        console.log(`Types: ${batch.map((t: any) => t.type).join(', ')}`);

        try {
            const generatedBatch = await agent.generateReferenceCards(batch);

            if (generatedBatch && generatedBatch.length > 0) {
                console.log(`  Successfully generated ${generatedBatch.length} cards.`);
                outputCards.push(...generatedBatch);
            } else {
                console.warn('  Warning: Generated batch was empty or invalid JSON.');
            }
        } catch (error) {
            console.error(`  Error processing batch starting at index ${i}:`, error);
        }

        // Add a small delay between batches to respect rate limits
        if (i + batchSize < equipmentTypes.length) {
            console.log('  Waiting 2 seconds before next batch...');
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }

    const outputDir = path.join(process.cwd(), 'src', 'lib', 'resources');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, 'full_fidelity_cards.json');
    fs.writeFileSync(outputPath, JSON.stringify(outputCards, null, 2));

    console.log(`\n=== Generation Complete ===`);
    console.log(`Successfully generated a total of ${outputCards.length} full-fidelity cards.`);
    console.log(`Saved to: ${outputPath}`);
}

// Execute if run directly
if (require.main === module) {
    generateFullFidelityCards().catch(error => {
        console.error('Fatal error during execution:', error);
        process.exit(1);
    });
}
