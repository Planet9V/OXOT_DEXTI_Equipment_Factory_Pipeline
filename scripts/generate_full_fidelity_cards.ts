import fs from 'fs';
import path from 'path';
import { getAgent } from '../src/lib/agents/agent';

const REGISTRY_PATH = path.join(process.cwd(), 'oil_and_gas_equipment_registry.json');
const OUTPUT_PATH = path.join(process.cwd(), 'src/lib/resources/full_fidelity_cards.json');
const BATCH_SIZE = 5;

async function main() {
    if (!fs.existsSync(REGISTRY_PATH)) {
        console.error(`Registry file not found at ${REGISTRY_PATH}`);
        process.exit(1);
    }

    const registryContent = fs.readFileSync(REGISTRY_PATH, 'utf-8');
    const registry = JSON.parse(registryContent);
    const equipmentList = registry.equipment;

    if (!Array.isArray(equipmentList)) {
        console.error('Invalid registry format: equipment is not an array');
        process.exit(1);
    }

    console.log(`Found ${equipmentList.length} equipment types to process.`);

    const agent = getAgent();
    // Ensure API key is present
    if (!process.env.OPENROUTER_API_KEY) {
        console.warn('OPENROUTER_API_KEY is not set. This script requires a valid API key to generate content.');
        // We might want to exit here if we strictly require the key,
        // but for now let's let it try (it might mock if configured so in some environments, though the agent uses fetch directly).
    }

    let allCards: any[] = [];

    // Process in batches
    for (let i = 0; i < equipmentList.length; i += BATCH_SIZE) {
        const batch = equipmentList.slice(i, i + BATCH_SIZE);
        console.log(`Processing batch ${Math.floor(i / BATCH_SIZE) + 1} / ${Math.ceil(equipmentList.length / BATCH_SIZE)}...`);

        const prompt = `Task: Generate **Full-Fidelity** DEXPI 2.0 equipment cards for the following list of equipment types:
${JSON.stringify(batch, null, 2)}

For each item, generate a JSON object that is **100% compliant** with the DEXPI 2.0 Schema. Do NOT produce simplified or partial records.`;

        try {
            const response = await agent.chat(
                [{ role: 'user', content: prompt }],
                'theEngineer'
            );

            // Attempt to parse JSON from the response
            // We look for the first '[' and the last ']' to extract the array
            const jsonMatch = response.content.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
                try {
                    const batchCards = JSON.parse(jsonMatch[0]);
                    if (Array.isArray(batchCards)) {
                        allCards = allCards.concat(batchCards);
                        console.log(`Generated ${batchCards.length} cards in this batch.`);
                    } else {
                        console.warn('Parsed JSON is not an array.');
                    }
                } catch (parseError) {
                    console.warn('Failed to parse JSON content:', parseError);
                }
            } else {
                console.warn('Could not find JSON array in response. Response start:', response.content.slice(0, 100));
            }

        } catch (error) {
            console.error(`Error processing batch ${i}:`, error);
        }

        // Wait a bit to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    // Write output
    const outputDir = path.dirname(OUTPUT_PATH);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(allCards, null, 2));
    console.log(`Saved ${allCards.length} full-fidelity cards to ${OUTPUT_PATH}`);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
