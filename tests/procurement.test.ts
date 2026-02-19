/* eslint-disable @typescript-eslint/no-explicit-any */

import { DexpiAgent } from '../src/lib/agents/agent';
import { chatWithTools } from '../src/lib/agents/openrouter-client';
import type { VendorVariation } from '../src/lib/agents/types';

// Mock the openrouter-client
jest.mock('../src/lib/agents/openrouter-client', () => ({
    chatWithTools: jest.fn(),
    testOpenRouterConnection: jest.fn().mockResolvedValue(true),
}));

describe('Procurement Officer Persona', () => {
    let agent: DexpiAgent;

    beforeEach(() => {
        agent = new DexpiAgent();
        jest.clearAllMocks();
    });

    test('should return vendor variations when a valid JSON response is received', async () => {
        const referenceEquipment = {
            tag: 'P-101',
            componentClass: 'Centrifugal Pump',
            specifications: {
                flowRate: '100 m3/h',
                head: '50 m',
            },
        };

        const mockVariations: VendorVariation[] = [
            {
                vendor: 'Siemens',
                model: 'Simotics',
                referenceId: 'P-101',
                description: 'High efficiency pump motor',
                differentiators: ['IE4 Efficiency', 'Digital Twin ready'],
                specifications: { power: '45 kW' },
                documents: [{ title: 'Datasheet', url: 'https://siemens.com/datasheet' }],
            },
            {
                vendor: 'Flowserve',
                model: 'Mark 3',
                referenceId: 'P-101',
                description: 'Chemical process pump',
                differentiators: ['ASME B73.1', 'SealSentry technology'],
                specifications: { impeller: '250mm' },
                documents: [{ title: 'Manual', url: 'https://flowserve.com/manual' }],
            },
        ];

        // Mock chatWithTools to return the JSON array string
        (chatWithTools as jest.Mock).mockResolvedValue({
            response: {
                choices: [
                    {
                        message: {
                            content: JSON.stringify(mockVariations),
                        },
                    },
                ],
            },
            toolTraces: [],
        });

        const result = await agent.findVendorVariations(referenceEquipment);

        expect(result).toHaveLength(2);
        expect(result[0].vendor).toBe('Siemens');
        expect(result[1].model).toBe('Mark 3');

        // Verify the prompt contained the reference equipment
        const calls = (chatWithTools as jest.Mock).mock.calls;
        const messages = calls[0][0];
        const userMessage = messages.find((m: any) => m.role === 'user');
        expect(userMessage.content).toContain('P-101');
        expect(userMessage.content).toContain('Centrifugal Pump');
        expect(userMessage.content).toContain('For each model (e.g., Siemens, ABB, Rockwell, Emerson, Flowserve)');

        // Verify system prompt is for procurement officer
        const systemMessage = messages.find((m: any) => m.role === 'system');
        expect(systemMessage.content).toContain('The Procurement Officer');
    });

    test('should return empty array when response parsing fails', async () => {
        const referenceEquipment = { tag: 'T-200' };

        (chatWithTools as jest.Mock).mockResolvedValue({
            response: {
                choices: [
                    {
                        message: {
                            content: 'Here are some models but not in JSON format...',
                        },
                    },
                ],
            },
            toolTraces: [],
        });

        const result = await agent.findVendorVariations(referenceEquipment);
        expect(result).toEqual([]);
    });
});
