import { DexpiAgent } from '../src/lib/agents/agent';
import { VendorVariation } from '../src/lib/agents/types';

// Mock the chat method
jest.mock('../src/lib/agents/agent', () => {
    const originalModule = jest.requireActual('../src/lib/agents/agent');
    return {
        ...originalModule,
        DexpiAgent: class extends originalModule.DexpiAgent {
            async chat(messages: any[], persona: string) {
                if (persona === 'procurementOfficer') {
                    const mockResponse: VendorVariation[] = [
                        {
                            vendor: "Siemens",
                            model: "Simotics SD",
                            referenceId: "P-101A",
                            description: "Severe Duty Motor for pumps",
                            differentiators: ["IE4 Efficiency", "Cast Iron Frame"],
                            specifications: { "power": "200kW" },
                            documents: [{ title: "Datasheet", url: "http://siemens.com" }]
                        },
                        {
                            vendor: "ABB",
                            model: "M3BP",
                            referenceId: "P-101A",
                            description: "Process performance motor",
                            differentiators: ["Robust design", "Global support"],
                            specifications: { "power": "200kW" },
                            documents: [{ title: "Catalog", url: "http://abb.com" }]
                        },
                        {
                            vendor: "WEG",
                            model: "W22",
                            referenceId: "P-101A",
                            description: "High efficiency industrial motor",
                            differentiators: ["Cooling system", "Low vibration"],
                            specifications: { "power": "200kW" },
                            documents: [{ title: "Brochure", url: "http://weg.net" }]
                        }
                    ];
                    return {
                        content: JSON.stringify(mockResponse),
                        toolTraces: [],
                        model: 'mock-model',
                        usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 }
                    };
                }
                return { content: '', toolTraces: [], model: 'mock', usage: undefined };
            }
        }
    };
});

describe('Procurement Officer Persona', () => {
    let agent: DexpiAgent;

    beforeEach(() => {
        agent = new DexpiAgent();
    });

    it('should find vendor variations correctly', async () => {
        const referenceEquipment = {
            tag: "P-101A",
            componentClass: "CentrifugalPump",
            displayName: "Boiler Feed Pump"
        };

        const variations = await agent.findVendorVariations(referenceEquipment);

        expect(variations).toHaveLength(3);
        expect(variations[0].vendor).toBe("Siemens");
        expect(variations[1].model).toBe("M3BP");
        expect(variations[2].differentiators).toContain("Low vibration");
    });
});
