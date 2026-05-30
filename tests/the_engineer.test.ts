/* eslint-disable @typescript-eslint/no-explicit-any */

import { DexpiAgent } from '../src/lib/agents/agent';
import { chatWithTools } from '../src/lib/agents/openrouter-client';

// Mock the openrouter-client
jest.mock('../src/lib/agents/openrouter-client', () => ({
    chatWithTools: jest.fn(),
    testOpenRouterConnection: jest.fn().mockResolvedValue(true),
}));

describe('The Engineer Persona', () => {
    let agent: DexpiAgent;

    beforeEach(() => {
        agent = new DexpiAgent();
        jest.clearAllMocks();
    });

    test('should invoke chatWithTools with the correct system prompt and return JSON', async () => {
        const equipmentType = 'Centrifugal Pump';

        const mockCard = {
            tag: 'Generic-PUMP-001',
            name: 'Centrifugal Process Pump',
            componentClass: 'CentrifugalPump',
            dexpiType: 'CentrifugalPump',
            rdlUri: 'http://posccaesar.org/rdl/RDS334252',
            description: 'API 610 centrifugal pump',
            operatingConditions: {
                pressureMax: { value: 40, unit: 'bar', source: 'API 610' }
            },
            materials: {
                casing: 'ASTM A216 WCB'
            },
            nozzles: [
                { id: 'N1', name: 'Suction', service: 'Inlet', size: 'DN150' }
            ],
            standards: ['API 610']
        };

        // Mock chatWithTools to return the JSON object
        (chatWithTools as jest.Mock).mockResolvedValue({
            response: {
                choices: [
                    {
                        message: {
                            content: JSON.stringify(mockCard),
                        },
                    },
                ],
            },
            toolTraces: [],
        });

        const userMessage = `Generate a Full-Fidelity DEXPI 2.0 equipment card for: ${equipmentType}`;
        const result = await agent.chat(
            [{ role: 'user', content: userMessage }],
            'theEngineer'
        );

        // Verify the response is correct
        expect(JSON.parse(result.content)).toEqual(mockCard);

        // Verify the prompt contained the correct system prompt
        const calls = (chatWithTools as jest.Mock).mock.calls;
        const messages = calls[0][0];

        // Check System Prompt
        const systemMessage = messages.find((m: any) => m.role === 'system');
        expect(systemMessage.content).toContain('The Engineer');
        expect(systemMessage.content).toContain('Full-Fidelity');
        expect(systemMessage.content).toContain('Schema Requirement');
        expect(systemMessage.content).toContain('ASTM A216 Gr. WCB');

        // Check User Message
        const userMsg = messages.find((m: any) => m.role === 'user');
        expect(userMsg.content).toBe(userMessage);
    });
});
