
import { ProcurementAgent } from '../src/lib/agents/specialist/procurement-agent';
import { EquipmentCard } from '../src/lib/types';
import * as openRouter from '../src/lib/agents/openrouter-client';

// Mock OpenRouter
jest.mock('../src/lib/agents/openrouter-client', () => ({
    chatWithTools: jest.fn(),
}));

// Mock AuditLogger
jest.mock('../src/lib/agents/audit-logger', () => {
    const mockLog = jest.fn().mockResolvedValue({});
    return {
        getAuditLogger: jest.fn().mockReturnValue({
            log: mockLog,
        }),
        AuditLogger: jest.fn().mockImplementation(() => ({
            log: mockLog,
        })),
    };
});

describe('ProcurementAgent', () => {
    let agent: ProcurementAgent;

    beforeEach(() => {
        jest.clearAllMocks();
        agent = new ProcurementAgent();
    });

    it('should successfully find vendor variations', async () => {
        const mockEquipment = {
            id: '123',
            tag: 'P-101',
            componentClass: 'Centrifugal Pump',
            specifications: {},
        } as unknown as EquipmentCard;

        const mockVariations = [
            {
                vendor: 'Siemens',
                model: 'Simotics SD',
                referenceId: 'P-101',
                description: 'Severe duty motor',
                differentiators: ['High efficiency'],
                specifications: { power: '15kW' },
                documents: [{ title: 'Datasheet', url: 'http://siemens.com' }]
            }
        ];

        // Setup mock response
        (openRouter.chatWithTools as jest.Mock).mockResolvedValue({
            response: {
                choices: [
                    {
                        message: {
                            content: JSON.stringify(mockVariations),
                            tool_calls: []
                        }
                    }
                ]
            },
            toolTraces: []
        });

        const result = await agent.execute({ equipment: mockEquipment }, 'test-run-id');

        expect(result).toHaveLength(1);
        expect(result[0].vendor).toBe('Siemens');
        expect(result[0].referenceId).toBe('P-101');
        expect(openRouter.chatWithTools).toHaveBeenCalledTimes(1);
    });

});
