import * as fs from 'fs';
import * as path from 'path';
import { getAgent } from '../src/lib/agents/agent';
import * as dotenv from 'dotenv';

dotenv.config();

const REGISTRY_PATH = path.join(__dirname, '../oil_and_gas_equipment_registry.json');
const OUTPUT_PATH = path.join(__dirname, '../src/lib/resources/full_fidelity_cards.json');
const BATCH_SIZE = 5;

async function generateFullFidelityCards() {
    if (!process.env.OPENROUTER_API_KEY) {
        console.warn('[WARN] OPENROUTER_API_KEY is not set. Skipping live card generation.');
        return;
    }

    if (!fs.existsSync(REGISTRY_PATH)) {
        console.error(`[ERROR] Registry not found at ${REGISTRY_PATH}`);
        process.exit(1);
    }

    const registryData = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf-8'));
    const equipmentTypes = registryData.equipment;

    if (!Array.isArray(equipmentTypes) || equipmentTypes.length === 0) {
        console.error('[ERROR] Invalid or empty registry equipment types array.');
        process.exit(1);
    }

    const agent = getAgent();
    const allCards: Record<string, unknown>[] = [];

    console.log(`Starting Full-Fidelity Generation for ${equipmentTypes.length} types...`);

    for (let i = 0; i < equipmentTypes.length; i += BATCH_SIZE) {
        const batch = equipmentTypes.slice(i, i + BATCH_SIZE);
        console.log(`Processing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(equipmentTypes.length / BATCH_SIZE)}...`);

        try {
            const batchCards = await agent.generateFullFidelityCards(batch);
            if (Array.isArray(batchCards) && batchCards.length > 0) {
                allCards.push(...batchCards);
                console.log(`Successfully generated ${batchCards.length} cards in this batch.`);
            } else {
                console.warn(`[WARN] No valid cards returned for batch ${Math.floor(i / BATCH_SIZE) + 1}`);
            }
        } catch (error) {
            console.error(`[ERROR] Failed to generate cards for batch ${Math.floor(i / BATCH_SIZE) + 1}:`, error);
        }

        // Output incremental saves just in case
        const outputDir = path.dirname(OUTPUT_PATH);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        fs.writeFileSync(OUTPUT_PATH, JSON.stringify(allCards, null, 2));

        // Sleep to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    console.log(`Generation complete. Total cards generated: ${allCards.length}`);
    console.log(`Saved to ${OUTPUT_PATH}`);
}

if (require.main === module) {
    generateFullFidelityCards()
        .then(() => process.exit(0))
        .catch((err) => {
            console.error(err);
            process.exit(1);
        });
}
