
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

    test('should generate full fidelity card when valid JSON is returned', async () => {
        const equipmentType = 'Centrifugal Pump';

        const mockCard = {
            tag: 'Generic-PUMP-001',
            name: 'Standard Centrifugal Pump',
            componentClass: 'CentrifugalPump',
            dexpiType: 'CentrifugalPump',
            rdlUri: 'http://data.posccaesar.org/rdl/RDS123456',
            description: 'A pump.',
            operatingConditions: { pressureMax: { value: 10, unit: 'bar' } },
            specifications: { power: { value: 50, unit: 'kW' } },
            design: { weight: { value: 500, unit: 'kg' } },
            materials: { casing: 'ASTM A216 WCB' },
            nozzles: [{ id: 'N1', name: 'Suction' }],
            standards: ['API 610'],
            image_prompt: 'A pump image',
        };

        // Mock chatWithTools to return the JSON object string
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

        const result = await agent.generateFullFidelityCard(equipmentType);

        expect(result).toEqual(mockCard);

        // Verify the prompt contained the equipment type
        const calls = (chatWithTools as jest.Mock).mock.calls;
        const messages = calls[0][0];
        const userMessage = messages.find((m: any) => m.role === 'user');
        expect(userMessage.content).toContain(equipmentType);
        expect(userMessage.content).toContain('Task: Generate a Full-Fidelity DEXPI 2.0 equipment card');

        // Verify system prompt is for The Engineer
        const systemMessage = messages.find((m: any) => m.role === 'system');
        expect(systemMessage.content).toContain('The Engineer');
    });

    test('should handle array response and return first item', async () => {
        const equipmentType = 'Valve';
        const mockCards = [{ tag: 'V-001' }];

        (chatWithTools as jest.Mock).mockResolvedValue({
            response: {
                choices: [
                    {
                        message: {
                            content: JSON.stringify(mockCards),
                        },
                    },
                ],
            },
            toolTraces: [],
        });

        const result = await agent.generateFullFidelityCard(equipmentType);
        expect(result).toEqual(mockCards[0]);
    });

    test('should return empty object on parsing failure', async () => {
        const equipmentType = 'FailedType';

        (chatWithTools as jest.Mock).mockResolvedValue({
            response: {
                choices: [
                    {
                        message: {
                            content: 'Invalid JSON here',
                        },
                    },
                ],
            },
            toolTraces: [],
        });

        const result = await agent.generateFullFidelityCard(equipmentType);
        expect(result).toEqual({});
    });
});
