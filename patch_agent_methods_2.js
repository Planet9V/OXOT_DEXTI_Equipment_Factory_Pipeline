const fs = require('fs');
const content = fs.readFileSync('src/lib/agents/agent.ts', 'utf8');

const generateReferenceCardsMethod = `    /**
     * Generates Full-Fidelity DEXPI 2.0 equipment reference cards using the engineer persona.
     *
     * @param equipmentTypes - An array of equipment type names to process.
     * @returns A parsed JSON array of equipment cards.
     */
    async generateReferenceCards(equipmentTypes: string[]): Promise<Record<string, unknown>[]> {
        const typesList = equipmentTypes.map(t => \`- \${t}\`).join('\\n');

        let prompt = PERSONAS.theEngineer;
        prompt = prompt.replace('\\[LIST_OF_TYPES_FROM_REGISTRY\\]', typesList);

        const result = await this.chat(
            [{ role: 'user', content: prompt }],
            'theEngineer'
        );

        try {
            const jsonMatch = result.content.match(/\\[[\\s\\S]*\\]/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
        } catch {
            console.warn('[agent] Failed to parse reference cards JSON array');
        }

        return [];
    }
`;

const anchor = "    /**\n     * Analyse equipment coverage for a facility.";

if (content.includes(anchor)) {
    const newContent = content.replace(anchor, generateReferenceCardsMethod + "\n" + anchor);
    fs.writeFileSync('src/lib/agents/agent.ts', newContent);
    console.log("Successfully added generateReferenceCards");
} else {
    console.log("Failed to find anchor for generateReferenceCards");
}
