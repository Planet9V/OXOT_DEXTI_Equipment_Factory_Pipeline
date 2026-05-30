import * as fs from 'fs';
import * as path from 'path';
import { getAgent } from '../src/lib/agents/agent';

async function generateFullFidelityCards() {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
        console.error('Error: OPENROUTER_API_KEY is not set.');
        process.exit(1);
    }

    const registryPath = path.join(__dirname, '../oil_and_gas_equipment_registry.json');
    let registryData;

    try {
        const fileContent = fs.readFileSync(registryPath, 'utf-8');
        registryData = JSON.parse(fileContent);
    } catch (error) {
        console.error('Failed to read or parse registry file:', error);
        process.exit(1);
    }

    const equipmentList = registryData.equipment;
    if (!equipmentList || !Array.isArray(equipmentList)) {
        console.error('Registry file does not contain a valid "equipment" array.');
        process.exit(1);
    }

    const agent = getAgent();
    const batchSize = 5;
    const allCards: any[] = [];

    console.log(`Generating full-fidelity cards for ${equipmentList.length} equipment types in batches of ${batchSize}...`);

    for (let i = 0; i < equipmentList.length; i += batchSize) {
        const batch = equipmentList.slice(i, i + batchSize);
        console.log(`\nProcessing batch ${Math.floor(i / batchSize) + 1} of ${Math.ceil(equipmentList.length / batchSize)} (${batch.length} items)...`);

        try {
            const batchCards = await agent.generateFullFidelityCards(batch);
            if (batchCards && batchCards.length > 0) {
                allCards.push(...batchCards);
                console.log(`Successfully generated ${batchCards.length} cards for this batch.`);
            } else {
                console.warn(`No valid cards returned for this batch.`);
            }
        } catch (error) {
            console.error(`Error generating cards for batch starting at index ${i}:`, error);
        }

        // Add a small delay between batches to respect rate limits
        if (i + batchSize < equipmentList.length) {
            console.log('Waiting for 2 seconds before next batch...');
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }

    const outputDir = path.join(__dirname, '../src/lib/resources');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, 'full_fidelity_cards.json');
    fs.writeFileSync(outputPath, JSON.stringify(allCards, null, 2));

    console.log(`\nGeneration complete. ${allCards.length} full-fidelity cards saved to ${outputPath}`);
}

if (require.main === module) {
    generateFullFidelityCards();
}
