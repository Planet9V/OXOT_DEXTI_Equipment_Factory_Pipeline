import fs from 'fs';
import path from 'path';

export function generateAllCards() {
    const filePath = path.resolve(__dirname, '../src/lib/resources/dexpi-equipment-cards.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}
