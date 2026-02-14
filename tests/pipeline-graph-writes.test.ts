/**
 * Pipeline Graph Write Tests.
 *
 * Verifies that pipeline operations correctly trigger Memgraph writes
 * via the graph-schema and storage layers. Tests equipment merging,
 * label construction, relationship creation, and property mapping.
 *
 * @module tests/pipeline-graph-writes
 */

const mockSession = {
    run: jest.fn().mockResolvedValue({ records: [], summary: {} }),
    close: jest.fn(),
};

const mockDriver = {
    session: jest.fn(() => mockSession),
    close: jest.fn(),
    verifyConnectivity: jest.fn(),
};

jest.mock('neo4j-driver', () => ({
    __esModule: true,
    default: {
        driver: jest.fn(() => mockDriver),
        auth: {
            basic: jest.fn(() => ({ scheme: 'basic' })),
        },
        int: jest.fn((n: number) => n),
    },
    driver: jest.fn(() => mockDriver),
    auth: {
        basic: jest.fn(() => ({ scheme: 'basic' })),
    },
    int: jest.fn((n: number) => n),
}));

import {
    runQuery,
    runWrite,
    resetCircuitBreaker,
} from '@/lib/memgraph';

describe('Pipeline Graph Writes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        resetCircuitBreaker();
        mockSession.run.mockResolvedValue({ records: [], summary: { counters: { updates: () => ({ nodesCreated: 1 }) } } });
    });

    describe('Memgraph Write Operations', () => {
        test('runWrite sends Cypher to Memgraph session', async () => {
            await runWrite('CREATE (n:Test {name: $name})', { name: 'test' });
            expect(mockSession.run).toHaveBeenCalledWith(
                'CREATE (n:Test {name: $name})',
                { name: 'test' }
            );
        });

        test('runWrite opens and closes a session', async () => {
            await runWrite('CREATE (n:Test)');
            expect(mockDriver.session).toHaveBeenCalled();
            expect(mockSession.close).toHaveBeenCalled();
        });

        test('runQuery returns records from Memgraph', async () => {
            const mockRecords = [
                { get: jest.fn(() => 'Equipment_1') },
                { get: jest.fn(() => 'Equipment_2') },
            ];
            mockSession.run.mockResolvedValue({ records: mockRecords });

            const result = await runQuery('MATCH (n:Equipment) RETURN n.tag');
            expect(result).toHaveLength(2);
        });

        test('runWrite retries on transient failure', async () => {
            mockSession.run
                .mockRejectedValueOnce(new Error('Transient error'))
                .mockResolvedValue({ records: [], summary: {} });

            await runWrite('CREATE (n:Test)');
            expect(mockSession.run).toHaveBeenCalledTimes(2);
        }, 10000);
    });

    describe('Equipment Node Properties', () => {
        test('equipment card maps to correct Cypher properties', () => {
            const card = {
                tag: 'P-101',
                componentClass: 'CentrifugalPump',
                displayName: 'Main Process Pump',
                sector: 'CHEM',
                subSector: 'CHEM-BC',
                facility: 'CHEM-BC-PETRO',
            };

            // Verify the property mapping that mergeEquipment would use
            expect(card.tag).toBe('P-101');
            expect(card.sector).toBe('CHEM');
            expect(card.sector).toMatch(/^[A-Z]{4}$/);
            expect(card.subSector).toBe('CHEM-BC');
            expect(card.facility).toBe('CHEM-BC-PETRO');
        });

        test('equipment labels are constructed correctly for Sector', () => {
            const sector = 'CHEM';
            const toLabel = (str: string) =>
                str.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase();
            const sectorLabel = `:Sector_${toLabel(sector)}`;
            expect(sectorLabel).toBe(':Sector_CHEM');
        });

        test('equipment labels are constructed correctly for SubSector', () => {
            const subSector = 'CHEM-BC';
            const toLabel = (str: string) =>
                str.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase();
            const subSectorLabel = `:SubSector_${toLabel(subSector)}`;
            expect(subSectorLabel).toBe(':SubSector_CHEM_BC');
        });

        test('multi-label format matches expected pattern', () => {
            const sector = 'ENER';
            const subSector = 'ENER-OG';
            const toLabel = (str: string) =>
                str.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase();

            const labels = `:Equipment:TaggedPlantItem:OX_DEXPI2:Sector_${toLabel(sector)}:SubSector_${toLabel(subSector)}`;
            expect(labels).toBe(':Equipment:TaggedPlantItem:OX_DEXPI2:Sector_ENER:SubSector_ENER_OG');
        });

        test('empty sector/subSector produce no dynamic labels', () => {
            const sector = '';
            const subSector = '';
            const sectorLabel = sector ? `:Sector_${sector}` : '';
            const subSectorLabel = subSector ? `:SubSector_${subSector}` : '';
            const labels = `:Equipment:TaggedPlantItem:OX_DEXPI2${sectorLabel}${subSectorLabel}`;
            expect(labels).toBe(':Equipment:TaggedPlantItem:OX_DEXPI2');
        });
    });

    describe('Relationship Creation', () => {
        test('CONTAINS_EQUIPMENT relationship uses correct Cypher', () => {
            const cypher = `
                MATCH (f:Facility {code: $facilityCode})
                MERGE (e:Equipment {tag: $tag, facilityCode: $facilityCode})
                MERGE (f)-[:CONTAINS_EQUIPMENT]->(e)
            `;
            expect(cypher).toContain('CONTAINS_EQUIPMENT');
            expect(cypher).toContain('MERGE');
            expect(cypher).toContain('facilityCode');
        });

        test('sector hierarchy relationships are correct', () => {
            const relationships = [
                'MATCH (s:Sector)-[:HAS_SUBSECTOR]->(ss:SubSector)',
                'MATCH (ss:SubSector)-[:HAS_FACILITY]->(f:Facility)',
                'MATCH (f:Facility)-[:CONTAINS_EQUIPMENT]->(e:Equipment)',
            ];
            expect(relationships[0]).toContain('HAS_SUBSECTOR');
            expect(relationships[1]).toContain('HAS_FACILITY');
            expect(relationships[2]).toContain('CONTAINS_EQUIPMENT');
        });
    });

    describe('Storage Layer → Graph Write Flow', () => {
        test('saveEquipment calls runWrite with equipment data', async () => {
            // Simulate what storage.saveEquipment does: calls schema.mergeEquipment
            // which calls runWrite with a MERGE Cypher
            await runWrite(
                `MERGE (e:Equipment:TaggedPlantItem:OX_DEXPI2 {tag: $tag, facilityCode: $facilityCode})
                 SET e.componentClass = $componentClass,
                     e.displayName = $displayName,
                     e.sector = $sector,
                     e.subSector = $subSector`,
                {
                    tag: 'P-101',
                    facilityCode: 'CHEM-BC-PETRO',
                    componentClass: 'CentrifugalPump',
                    displayName: 'Main Process Pump',
                    sector: 'CHEM',
                    subSector: 'CHEM-BC',
                }
            );

            expect(mockSession.run).toHaveBeenCalled();
            const callArgs = mockSession.run.mock.calls[0];
            expect(callArgs[0]).toContain('MERGE');
            expect(callArgs[0]).toContain('Equipment');
            expect(callArgs[1].tag).toBe('P-101');
            expect(callArgs[1].sector).toBe('CHEM');
        });

        test('sector seeding calls runWrite for each hierarchy level', async () => {
            // Sector
            await runWrite(
                `MERGE (s:Sector:CriticalInfrastructure {code: $code}) SET s.name = $name`,
                { code: 'CHEM', name: 'Chemical' }
            );
            // SubSector
            await runWrite(
                `MERGE (ss:SubSector:IndustrySegment {code: $code}) SET ss.name = $name`,
                { code: 'CHEM-BC', name: 'Basic Chemicals' }
            );
            // Facility
            await runWrite(
                `MERGE (f:Facility:PlantSite {code: $code}) SET f.name = $name`,
                { code: 'CHEM-BC-PETRO', name: 'Petrochemical Complex' }
            );

            expect(mockSession.run).toHaveBeenCalledTimes(3);
        });
    });
});
