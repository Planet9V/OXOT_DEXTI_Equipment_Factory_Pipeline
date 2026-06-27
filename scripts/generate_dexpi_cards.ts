import * as fs from 'fs';
import * as path from 'path';

export function generateAllCards(): any[] {
    const filePath = path.join(__dirname, '../src/lib/resources/dexpi-equipment-cards.json');
    if (fs.existsSync(filePath)) {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
    return [];
}

if (require.main === module) {
    const cards = generateAllCards();
    console.log(`Successfully loaded ${cards.length} equipment cards.`);
}
