
import fs from 'fs';
import path from 'path';
import { runBatchWrite, closeDriver } from '../src/lib/memgraph';

// Interface matching the JSON data
interface DexpiCard {
    tag: string;
    name: string;
    componentClass: string;
    dexpiType: string;
    rdlUri: string;
    description: string;
    operatingConditions: object;
    specifications: object;
    design: object;
    materials: object;
    nozzles: object[];
    standards: string[];
    image_prompt: string;
}

const CARDS_FILE = path.join(process.cwd(), 'src', 'lib', 'resources', 'dexpi-equipment-cards.json');

export async function importDexpiEquipment() {
    console.log('=== DEXPI Equipment Import Script ===');

    if (!fs.existsSync(CARDS_FILE)) {
        console.error(`Error: File not found: ${CARDS_FILE}`);
        throw new Error(`File not found: ${CARDS_FILE}`);
    }

    const cards: DexpiCard[] = JSON.parse(fs.readFileSync(CARDS_FILE, 'utf-8'));
    console.log(`Loaded ${cards.length} cards from JSON.`);

    // Transform for Cypher storage (flatten complex objects to JSON strings)
    const batch = cards.map(card => ({
        tag: card.tag,
        name: card.name,
        componentClass: card.componentClass,
        dexpiType: card.dexpiType,
        rdlUri: card.rdlUri,
        description: card.description,
        operatingConditions: JSON.stringify(card.operatingConditions),
        specifications: JSON.stringify(card.specifications),
        design: JSON.stringify(card.design),
        materials: JSON.stringify(card.materials),
        nozzles: JSON.stringify(card.nozzles),
        standards: card.standards, // Arrays of strings are fine in Memgraph
        image_prompt: card.image_prompt,
        importedAt: new Date().toISOString()
    }));

    const cypher = `
        MERGE (e:Equipment {tag: row.tag})
        ON CREATE SET
            e:DexpiReference,
            e.name = row.name,
            e.componentClass = row.componentClass,
            e.dexpiType = row.dexpiType,
            e.rdlUri = row.rdlUri,
            e.description = row.description,
            e.operatingConditions = row.operatingConditions,
            e.specifications = row.specifications,
            e.design = row.design,
            e.materials = row.materials,
            e.nozzles = row.nozzles,
            e.standards = row.standards,
            e.image_prompt = row.image_prompt,
            e.importedAt = row.importedAt
        ON MATCH SET
            e:DexpiReference,
            e.name = row.name,
            e.componentClass = row.componentClass,
            e.dexpiType = row.dexpiType,
            e.rdlUri = row.rdlUri,
            e.description = row.description,
            e.operatingConditions = row.operatingConditions,
            e.specifications = row.specifications,
            e.design = row.design,
            e.materials = row.materials,
            e.nozzles = row.nozzles,
            e.standards = row.standards,
            e.image_prompt = row.image_prompt,
            e.importedAt = row.importedAt
    `;

    try {
        const result = await runBatchWrite(cypher, batch);
        console.log(`\nImport Complete!`);
        console.log(`Processed: ${result.processed}`);
        console.log(`Failed: ${result.failed}`);

        if (result.errors.length > 0) {
            console.error('\nErrors encountered:');
            result.errors.forEach(err => console.error(` - ${err.message}`));
        }
        return result;

    } catch (err: unknown) {
        console.error('Fatal error during import:', err);
        throw err;
    } finally {
        await closeDriver();
    }
}

if (require.main === module) {
    importDexpiEquipment().catch(() => process.exit(1));
}
