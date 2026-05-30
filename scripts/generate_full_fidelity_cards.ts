
import * as fs from 'fs';
import * as path from 'path';
import { loadEnvConfig } from '@next/env';
import { DexpiAgent } from '../src/lib/agents/agent';

// Load environment variables from .env.local, .env, etc.
loadEnvConfig(process.cwd());

// Define types based on registry structure
interface RegistryItem {
    type: string;
    category: string;
    tags: string[];
    description: string;
}

interface Registry {
    sector: string;
    subSector: string;
    equipment: RegistryItem[];
}

async function main() {
    console.log('Starting Full-Fidelity DEXPI Card Generation...');

    // 1. Load Registry
    const registryPath = path.join(process.cwd(), 'oil_and_gas_equipment_registry.json');
    if (!fs.existsSync(registryPath)) {
        console.error(`Registry not found at: ${registryPath}`);
        process.exit(1);
    }

    const registryData: Registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));
    const equipmentTypes = registryData.equipment.map(e => e.type);

    console.log(`Found ${equipmentTypes.length} equipment types in registry.`);

    // 2. Check Limit
    const limitEnv = process.env.LIMIT;
    let limit = equipmentTypes.length;
    if (limitEnv) {
        const parsedLimit = parseInt(limitEnv, 10);
        if (!isNaN(parsedLimit)) {
            limit = parsedLimit;
            console.log(`LIMIT set to ${limit}. Processing first ${limit} items.`);
        }
    }

    const typesToProcess = equipmentTypes.slice(0, limit);

    // 3. Initialize Agent
    const agent = new DexpiAgent();
    // Test connection? Maybe skip for speed, assuming environment is set.

    const generatedCards: any[] = [];
    const outputDir = path.join(process.cwd(), 'src/lib/resources');
    const outputPath = path.join(outputDir, 'dexpi-equipment-cards.json');

    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // 4. Generate Cards
    for (const [index, type] of typesToProcess.entries()) {
        console.log(`[${index + 1}/${typesToProcess.length}] Generating card for: ${type}...`);
        try {
            const card = await agent.generateFullFidelityCard(type);

            // Basic validation: check if card has tags or componentClass
            if (card && (card as any).tag) {
                generatedCards.push(card);
                console.log(`  > Success: ${(card as any).tag}`);
            } else {
                console.warn(`  > Warning: Agent returned invalid or empty card for ${type}`);
            }
        } catch (error) {
            console.error(`  > Error generating for ${type}:`, error);
        }
    }

    // 5. Save Results
    fs.writeFileSync(outputPath, JSON.stringify(generatedCards, null, 2));
    console.log(`\nGeneration Complete.`);
    console.log(`Saved ${generatedCards.length} cards to: ${outputPath}`);
}

// Execute
if (require.main === module) {
    main().catch(err => {
        console.error('Fatal error:', err);
        process.exit(1);
    });
}
