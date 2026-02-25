
import fs from 'fs';
import path from 'path';
import { DexpiAgent } from '../src/lib/agents/agent';

// Define the Registry type structure
interface RegistryItem {
    type: string;
    description: string;
    category?: string;
    tags?: string[];
}

interface Registry {
    sector: string;
    subSector: string;
    equipment: RegistryItem[];
}

async function main() {
    console.log('Starting full fidelity card generation...');

    // Verify API Key
    if (!process.env.OPENROUTER_API_KEY) {
        console.warn('WARNING: OPENROUTER_API_KEY is not set. Generation may fail or return mock data.');
    }

    const registryPath = path.join(process.cwd(), 'oil_and_gas_equipment_registry.json');
    if (!fs.existsSync(registryPath)) {
        console.error(`Registry file not found at ${registryPath}`);
        process.exit(1);
    }

    const registryContent = fs.readFileSync(registryPath, 'utf-8');
    let registry: Registry;
    try {
        registry = JSON.parse(registryContent);
    } catch (e) {
        console.error('Failed to parse registry JSON:', e);
        process.exit(1);
    }

    const equipmentList = registry.equipment;
    if (!equipmentList || equipmentList.length === 0) {
        console.error('No equipment found in registry.');
        process.exit(1);
    }

    const agent = new DexpiAgent();
    const outputDir = path.join(process.cwd(), 'src', 'lib', 'resources');
    const outputPath = path.join(outputDir, 'full_fidelity_cards.json');

    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const fullFidelityCards: any[] = [];

    console.log(`Found ${equipmentList.length} equipment types to process.`);

    for (const [index, item] of equipmentList.entries()) {
        console.log(`[${index + 1}/${equipmentList.length}] Generating card for: ${item.type}...`);

        try {
            const prompt = `Generate a Full-Fidelity DEXPI 2.0 equipment card for: ${item.type}. Description: ${item.description}`;

            // "theEngineer" is expected to return a JSON array of objects.
            const response = await agent.chat(
                [{ role: 'user', content: prompt }],
                'theEngineer'
            );

            // Extract JSON from the response
            // The response might contain markdown code blocks ```json ... ```
            const jsonMatch = response.content.match(/\[\s*\{[\s\S]*\}\s*\]/);
            // Or sometimes it might be just the array, or wrapped in object if the agent deviates
            // The regex above looks for [ { ... } ]

            if (jsonMatch) {
                try {
                    const cards = JSON.parse(jsonMatch[0]);
                    if (Array.isArray(cards)) {
                        fullFidelityCards.push(...cards);
                        console.log(`  -> Successfully generated ${cards.length} card(s).`);
                    } else {
                         console.warn(`  -> Response for ${item.type} was not an array.`);
                    }
                } catch (jsonErr) {
                     console.warn(`  -> Failed to parse extracted JSON for ${item.type}.`);
                }
            } else {
                // Try simpler match if the first one failed (e.g. just brackets)
                 const simpleMatch = response.content.match(/\[[\s\S]*\]/);
                 if (simpleMatch) {
                    try {
                        const cards = JSON.parse(simpleMatch[0]);
                        if (Array.isArray(cards)) {
                            fullFidelityCards.push(...cards);
                             console.log(`  -> Successfully generated ${cards.length} card(s) (simple match).`);
                        }
                    } catch (e) {
                        console.warn(`  -> Failed to parse JSON for ${item.type}.`);
                    }
                 } else {
                    console.warn(`  -> No JSON array found in response for ${item.type}.`);
                 }
            }
        } catch (error) {
            console.error(`  -> Error generating card for ${item.type}:`, error);
        }
    }

    fs.writeFileSync(outputPath, JSON.stringify(fullFidelityCards, null, 2));
    console.log(`Generation complete. Wrote ${fullFidelityCards.length} cards to ${outputPath}`);
}

main().catch(console.error);
