import * as fs from 'fs';
import * as path from 'path';
import { DexpiAgent } from '../src/lib/agents/agent';

async function generateCards() {
    const registryPath = path.join(__dirname, '../oil_and_gas_equipment_registry.json');
    const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));

    const agent = new DexpiAgent({ temperature: 0.1 });

    const batchSize = 5;
    const cards: any[] = [];
    const equipmentList = registry.equipment;

    console.log(`Starting full-fidelity generation for ${equipmentList.length} items...`);

    for (let i = 0; i < equipmentList.length; i += batchSize) {
        const batch = equipmentList.slice(i, i + batchSize);
        console.log(`Processing batch ${i / batchSize + 1} (${batch.length} items)...`);

        const typeListStr = batch.map((eq: any) => `- ${eq.type} (${eq.category})`).join('\n');

        const prompt = `Generate Full-Fidelity DEXPI 2.0 equipment cards for the following list of equipment types:
${typeListStr}

Use the schema provided in your system instructions. Ensure NOZZLES and MATERIALS are present.`;

        try {
            const response = await agent.chat(
                [{ role: 'user', content: prompt }],
                'theEngineer'
            );

            const jsonMatch = response.content.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
                const parsedCards = JSON.parse(jsonMatch[0]);
                cards.push(...parsedCards);
                console.log(`Batch processed. Total cards so far: ${cards.length}`);
            } else {
                console.warn(`Could not parse JSON for batch starting at index ${i}`);
            }
        } catch (error) {
            console.error(`Error processing batch starting at index ${i}:`, error);
        }
    }

    const resourcesDir = path.join(__dirname, '../src/lib/resources');
    if (!fs.existsSync(resourcesDir)) {
        fs.mkdirSync(resourcesDir, { recursive: true });
    }

    const outputPath = path.join(resourcesDir, 'full_fidelity_cards.json');
    fs.writeFileSync(outputPath, JSON.stringify(cards, null, 2), 'utf-8');
    console.log(`Saved ${cards.length} full-fidelity cards to ${outputPath}`);
}

generateCards().catch(console.error);
