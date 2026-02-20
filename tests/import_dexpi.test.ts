
import { importDexpiEquipment } from '../scripts/import_dexpi_equipment';
import { runBatchWrite } from '../src/lib/memgraph';
import fs from 'fs';

// Mock dependencies
jest.mock('../src/lib/memgraph', () => ({
    runBatchWrite: jest.fn(),
    closeDriver: jest.fn(),
}));

jest.mock('fs');

describe('DEXPI Equipment Import Script', () => {
    const mockCards = [
        {
            tag: 'TEST-001',
            name: 'Test Pump',
            componentClass: 'Pump',
            dexpiType: 'CentrifugalPump',
            rdlUri: 'http://example.com/pump',
            description: 'Test Description',
            operatingConditions: { pressure: { value: 10, unit: 'bar' } },
            specifications: { power: { value: 5, unit: 'kW' } },
            design: { weight: { value: 100, unit: 'kg' } },
            materials: { casing: 'Steel' },
            nozzles: [{ id: 'N1' }],
            standards: ['API 610'],
            image_prompt: 'Test Image',
        },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        // Mock fs.existsSync to return true
        (fs.existsSync as jest.Mock).mockReturnValue(true);
        // Mock fs.readFileSync to return mock JSON
        (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockCards));
        // Mock runBatchWrite to return success
        (runBatchWrite as jest.Mock).mockResolvedValue({ processed: 1, failed: 0, errors: [] });
    });

    it('should read JSON and call runBatchWrite with transformed data', async () => {
        await importDexpiEquipment();

        expect(fs.readFileSync).toHaveBeenCalledWith(
            expect.stringContaining('dexpi-equipment-cards.json'),
            'utf-8'
        );

        expect(runBatchWrite).toHaveBeenCalledTimes(1);
        const [cypher, batch] = (runBatchWrite as jest.Mock).mock.calls[0];

        expect(cypher).toContain('MERGE (e:Equipment {tag: row.tag})');
        expect(cypher).toContain('e:DexpiReference');
        expect(cypher).toContain('e.operatingConditions = row.operatingConditions');

        expect(batch).toHaveLength(1);
        const item = batch[0];
        expect(item.tag).toBe('TEST-001');
        // Verify JSON stringification
        expect(item.operatingConditions).toBe(JSON.stringify(mockCards[0].operatingConditions));
        expect(item.specifications).toBe(JSON.stringify(mockCards[0].specifications));
        expect(item.standards).toEqual(['API 610']);
    });
});
