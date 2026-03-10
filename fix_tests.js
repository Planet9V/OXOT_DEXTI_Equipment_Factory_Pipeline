const fs = require('fs');
let newContent = fs.readFileSync('tests/agent.test.ts', 'utf8');

const mockTests = `
    test('generateEquipmentRegistry uses theSurveyor persona and parses JSON', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: async () => ({
                id: 'test-id',
                choices: [{
                    message: {
                        content: '\`\`\`json\\n{ "sector": "ENER", "subSector": "OG", "equipment": [{"type": "Pump"}] }\\n\`\`\`'
                    }
                }],
                usage: { total_tokens: 100 }
            })
        });

        const registry = await agent.generateEquipmentRegistry('Oil & Gas', 'ENER', 'OG');
        expect(registry.sector).toBe('ENER');
        expect(registry.subSector).toBe('OG');
        expect(Array.isArray(registry.equipment)).toBe(true);

        const fetchCall = mockFetch.mock.calls[0];
        const fetchBody = JSON.parse(fetchCall[1].body);
        expect(fetchBody.messages[0].content).toContain('The Surveyor');
        expect(fetchBody.messages[0].content).toContain('Oil & Gas');
        expect(fetchBody.messages[0].content).toContain('ENER');
    });

    test('generateReferenceCards uses theEngineer persona and parses JSON array', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: async () => ({
                id: 'test-id',
                choices: [{
                    message: {
                        content: '\`\`\`json\\n[ { "tag": "Generic-PUMP-001", "name": "Centrifugal Pump" } ]\\n\`\`\`'
                    }
                }],
                usage: { total_tokens: 100 }
            })
        });

        const cards = await agent.generateReferenceCards(['Centrifugal Pump']);
        expect(cards).toHaveLength(1);
        expect(cards[0].tag).toBe('Generic-PUMP-001');

        const fetchCall = mockFetch.mock.calls[0];
        const fetchBody = JSON.parse(fetchCall[1].body);
        expect(fetchBody.messages[0].content).toContain('The Engineer');
        expect(fetchBody.messages[0].content).toContain('- Centrifugal Pump');
    });
`;

const testsAnchor = "    test('findVendorVariations returns real vendor list', async () => {";
if (newContent.includes(testsAnchor)) {
    newContent = newContent.replace(testsAnchor, mockTests + "\n" + testsAnchor);
    fs.writeFileSync('tests/agent.test.ts', newContent);
    console.log("Patched agent.test.ts successfully.");
} else {
    console.log("Anchor not found in tests/agent.test.ts");
}
