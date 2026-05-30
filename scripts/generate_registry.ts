import * as fs from 'fs';
import * as path from 'path';
import { DexpiAgent } from '../src/lib/agents/agent';
import { AgentContext } from '../src/lib/agents/types';

async function main() {
    console.log('Initializing DexpiAgent...');
    const agent = new DexpiAgent();

    const context: AgentContext = {
        sectorName: 'Chemical',
        sectorCode: 'CHEM',
        subSectorCode: 'ALL'
    };

    console.log(`Generating equipment registry for ${context.sectorName}...`);
    const registry = await agent.generateEquipmentRegistry(context);

    if (registry) {
        const outPath = path.join(__dirname, '..', 'chemical_registry.json');
        fs.writeFileSync(outPath, JSON.stringify(registry, null, 2));
        console.log(`Successfully generated registry and saved to ${outPath}`);
    } else {
        console.error('Failed to generate equipment registry.');
    }
}

main().catch(console.error);