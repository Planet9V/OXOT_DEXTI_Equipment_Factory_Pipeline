/**
 * Equipment-First Architecture Tests.
 *
 * Tests for standalone equipment CRUD, facility assignment,
 * and unassigned equipment listing.
 *
 * @module tests/equipment-standalone
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

// ─── Mocks ─────────────────────────────────────────────────────────────────

const mockRunQuery = jest.fn();
const mockRunWrite = jest.fn();

jest.mock('../src/lib/memgraph', () => ({
    runQuery: (...args: any[]) => mockRunQuery(...args),
    runWrite: (...args: any[]) => mockRunWrite(...args),
    runBatchWrite: jest.fn().mockResolvedValue({ successCount: 0, failureCount: 0, errors: [] }),
    testConnection: jest.fn().mockResolvedValue(true),
    getCircuitBreakerState: jest.fn().mockReturnValue({ state: 'CLOSED', failureCount: 0 }),
}));

// Mock sectors module (required by graph-schema import)
jest.mock('../src/lib/sectors', () => ({
    getAllSectors: jest.fn().mockReturnValue([]),
}));

import {
    createEquipmentStandalone,
    getEquipmentById,
    updateEquipmentNode,
    deleteEquipmentById,
    assignEquipmentToFacility,
    removeEquipmentFromFacility,
    listAllEquipment,
} from '../src/lib/graph-schema';

// ─── Helpers ───────────────────────────────────────────────────────────────

/** Creates a mock Memgraph record with get() method. */
function mockRecord(data: Record<string, any>) {
    return { get: (key: string) => data[key] };
}

// ─── Tests ─────────────────────────────────────────────────────────────────

describe('Standalone Equipment CRUD', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockRunQuery.mockResolvedValue([]);
        mockRunWrite.mockResolvedValue([]);
    });

    test('createEquipmentStandalone generates UUID and writes to graph', async () => {
        const id = await createEquipmentStandalone({
            tag: 'TF-101',
            componentClass: 'Transformer',
            componentClassURI: 'http://data.posccaesar.org/rdl/RDS1234',
            displayName: 'Power Transformer',
            category: 'electrical',
        });

        expect(id).toBeTruthy();
        expect(typeof id).toBe('string');
        // Should have called runWrite with MERGE
        expect(mockRunWrite).toHaveBeenCalledWith(
            expect.stringContaining('MERGE (e:Equipment:TaggedPlantItem {id: $id})'),
            expect.objectContaining({
                tag: 'TF-101',
                componentClass: 'Transformer',
                displayName: 'Power Transformer',
                category: 'electrical',
            }),
        );
    });

    test('createEquipmentStandalone uses provided ID', async () => {
        const id = await createEquipmentStandalone({
            id: 'custom-uuid-123',
            tag: 'P-001',
            componentClass: 'Pump',
            componentClassURI: 'http://data.posccaesar.org/rdl/RDS5678',
            displayName: 'Cooling Pump',
            category: 'rotating',
        });

        expect(id).toBe('custom-uuid-123');
        expect(mockRunWrite).toHaveBeenCalledWith(
            expect.any(String),
            expect.objectContaining({ id: 'custom-uuid-123' }),
        );
    });

    test('createEquipmentStandalone does NOT require facility', async () => {
        await createEquipmentStandalone({
            tag: 'V-001',
            componentClass: 'Vessel',
            componentClassURI: 'http://data.posccaesar.org/rdl/RDS9999',
            displayName: 'Pressure Vessel',
            category: 'static',
        });

        // Should only call runWrite once (no assignEquipmentToFacility call)
        expect(mockRunWrite).toHaveBeenCalledTimes(1);
    });

    test('createEquipmentStandalone auto-assigns when facility provided', async () => {
        // Mock the assignment query to return success
        mockRunWrite
            .mockResolvedValueOnce([]) // initial create
            .mockResolvedValueOnce([mockRecord({ eid: 'test-id' })]); // assignment

        await createEquipmentStandalone({
            tag: 'TF-102',
            componentClass: 'Transformer',
            componentClassURI: 'http://data.posccaesar.org/rdl/RDS1234',
            displayName: 'Distribution Transformer',
            category: 'electrical',
            facility: 'ENER-EG-TRAN',
        });

        // Should call runWrite twice: create + assignment
        expect(mockRunWrite).toHaveBeenCalledTimes(2);
        expect(mockRunWrite).toHaveBeenCalledWith(
            expect.stringContaining('MERGE (e)-[:ASSIGNED_TO]->(f)'),
            expect.objectContaining({ facilityCode: 'ENER-EG-TRAN' }),
        );
    });
});

describe('Equipment Retrieval', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('getEquipmentById returns card with assignments', async () => {
        const card = { id: 'eq-1', tag: 'TF-101', componentClass: 'Transformer' };
        mockRunQuery.mockResolvedValueOnce([
            mockRecord({ card: JSON.stringify(card), facilities: ['FAC-1', 'FAC-2'] }),
        ]);

        const result = await getEquipmentById('eq-1');
        expect(result).toBeTruthy();
        expect(result.id).toBe('eq-1');
        expect(result.assignments).toEqual(['FAC-1', 'FAC-2']);
    });

    test('getEquipmentById returns null for missing equipment', async () => {
        mockRunQuery.mockResolvedValueOnce([]);
        const result = await getEquipmentById('nonexistent');
        expect(result).toBeNull();
    });
});

describe('Equipment Update', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('updateEquipmentNode merges updates with existing card', async () => {
        const existing = { id: 'eq-1', tag: 'TF-101', componentClass: 'Transformer', displayName: 'Old Name' };
        mockRunQuery.mockResolvedValueOnce([
            mockRecord({ card: JSON.stringify(existing), facilities: [] }),
        ]);
        mockRunWrite.mockResolvedValueOnce([]);

        const success = await updateEquipmentNode('eq-1', { displayName: 'New Name' });
        expect(success).toBe(true);
        expect(mockRunWrite).toHaveBeenCalledWith(
            expect.any(String),
            expect.objectContaining({ displayName: 'New Name', tag: 'TF-101' }),
        );
    });

    test('updateEquipmentNode returns false for missing equipment', async () => {
        mockRunQuery.mockResolvedValueOnce([]);
        const success = await updateEquipmentNode('nonexistent', { displayName: 'X' });
        expect(success).toBe(false);
        expect(mockRunWrite).not.toHaveBeenCalled();
    });
});

describe('Equipment Delete', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('deleteEquipmentById detach-deletes with children', async () => {
        mockRunWrite.mockResolvedValueOnce([]);
        await deleteEquipmentById('eq-1');
        expect(mockRunWrite).toHaveBeenCalledWith(
            expect.stringContaining('DETACH DELETE e, child'),
            expect.objectContaining({ id: 'eq-1' }),
        );
    });
});

describe('Facility Assignment', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('assignEquipmentToFacility creates ASSIGNED_TO relationship', async () => {
        mockRunWrite.mockResolvedValueOnce([mockRecord({ eid: 'eq-1' })]);
        const success = await assignEquipmentToFacility('eq-1', 'FAC-1');
        expect(success).toBe(true);
        expect(mockRunWrite).toHaveBeenCalledWith(
            expect.stringContaining('MERGE (e)-[:ASSIGNED_TO]->(f)'),
            expect.objectContaining({ equipmentId: 'eq-1', facilityCode: 'FAC-1' }),
        );
    });

    test('assignEquipmentToFacility returns false when not found', async () => {
        mockRunWrite.mockResolvedValueOnce([]);
        const success = await assignEquipmentToFacility('missing', 'FAC-1');
        expect(success).toBe(false);
    });

    test('removeEquipmentFromFacility deletes relationship only', async () => {
        mockRunWrite.mockResolvedValueOnce([mockRecord({ eid: 'eq-1' })]);
        const removed = await removeEquipmentFromFacility('eq-1', 'FAC-1');
        expect(removed).toBe(true);
        expect(mockRunWrite).toHaveBeenCalledWith(
            expect.stringContaining('DELETE r'),
            expect.objectContaining({ equipmentId: 'eq-1', facilityCode: 'FAC-1' }),
        );
    });

    test('removeEquipmentFromFacility returns false when no relationship', async () => {
        mockRunWrite.mockResolvedValueOnce([]);
        const removed = await removeEquipmentFromFacility('eq-1', 'FAC-UNKNOWN');
        expect(removed).toBe(false);
    });
});

describe('listAllEquipment', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('returns all equipment', async () => {
        const cards = [
            { id: 'eq-1', tag: 'TF-101' },
            { id: 'eq-2', tag: 'P-001' },
        ];
        mockRunQuery.mockResolvedValueOnce(
            cards.map(c => mockRecord({ card: JSON.stringify(c) })),
        );

        const result = await listAllEquipment(false);
        expect(result).toHaveLength(2);
        expect(result[0].tag).toBe('TF-101');
    });

    test('filters unassigned only', async () => {
        mockRunQuery.mockResolvedValueOnce([
            mockRecord({ card: JSON.stringify({ id: 'eq-3', tag: 'V-001' }) }),
        ]);

        const result = await listAllEquipment(true);
        expect(result).toHaveLength(1);
        // Query should include WHERE NOT clause
        expect(mockRunQuery).toHaveBeenCalledWith(
            expect.stringContaining('WHERE NOT (e)-[:ASSIGNED_TO]'),
            expect.any(Object),
        );
    });

    test('handles corrupted JSON gracefully', async () => {
        mockRunQuery.mockResolvedValueOnce([
            mockRecord({ card: 'invalid-json' }),
            mockRecord({ card: JSON.stringify({ id: 'eq-4', tag: 'OK' }) }),
        ]);

        const result = await listAllEquipment(false);
        expect(result).toHaveLength(1);
        expect(result[0].tag).toBe('OK');
    });
});
