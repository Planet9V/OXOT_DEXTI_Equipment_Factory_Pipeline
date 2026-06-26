const fs = require('fs');

let tsCode = `import * as fs from 'fs';
import * as path from 'path';

// Interface for the output card
export interface DexpiCard {
    tag: string;
    name: string;
    componentClass: string;
    dexpiType: string;
    rdlUri: string;
    description: string;
    operatingConditions: any;
    specifications: any;
    design: any;
    materials: any;
    nozzles: any[];
    standards: string[];
    image_prompt: string;
}

export function generateAllCards(): DexpiCard[] {
    const outputPath = path.join(__dirname, '../src/lib/resources/dexpi-equipment-cards.json');
    if (fs.existsSync(outputPath)) {
        return JSON.parse(fs.readFileSync(outputPath, 'utf8')) as DexpiCard[];
    }
    return [];
}
`;
fs.writeFileSync('scripts/generate_dexpi_cards.ts', tsCode);
