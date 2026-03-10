const fs = require('fs');
const content = fs.readFileSync('src/lib/agents/agent.ts', 'utf8');

const generateRegistryMethod = `    /**
     * Generates a comprehensive equipment registry for a specific sector using the surveyor persona.
     *
     * @param sectorName - The name of the sector (e.g., "Oil & Gas").
     * @param sectorCode - The sector code (e.g., "ENER").
     * @param subSectorCode - The sub-sector code (e.g., "OG").
     * @returns A parsed JSON registry containing equipment types.
     */
    async generateEquipmentRegistry(sectorName: string, sectorCode: string, subSectorCode: string): Promise<Record<string, unknown>> {
        let prompt = PERSONAS.theSurveyor;
        prompt = prompt.replace('\\[SECTOR NAME\\]', sectorName)
                       .replace('\\[SECTOR_CODE\\]', sectorCode)
                       .replace('\\[SUB_SECTOR_CODE\\]', subSectorCode);

        const result = await this.chat(
            [{ role: 'user', content: prompt }],
            'theSurveyor'
        );

        try {
            const jsonMatch = result.content.match(/\\{[\\s\\S]*\\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
        } catch {
            console.warn('[agent] Failed to parse equipment registry JSON');
        }

        return {
            sector: sectorCode,
            subSector: subSectorCode,
            equipment: []
        };
    }
`;

const anchor = "    /**\n     * Analyse equipment coverage for a facility.";

if (content.includes(anchor)) {
    const newContent = content.replace(anchor, generateRegistryMethod + "\n" + anchor);
    fs.writeFileSync('src/lib/agents/agent.ts', newContent);
    console.log("Successfully added generateEquipmentRegistry");
} else {
    console.log("Failed to find anchor for generateEquipmentRegistry");
}
