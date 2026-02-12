/**
 * PCA SPARQL Utility — Test Suite.
 */
import { searchEquipmentClass, validateClassUri } from '../src/lib/pca-sparql';

// Mock global fetch
const mockFetch = jest.fn();
(global as any).fetch = mockFetch;

describe('pca-sparql utility', () => {
    beforeEach(() => {
        mockFetch.mockClear();
    });

    test('searchEquipmentClass uses text:query and returns results', async () => {
        const mockResponse: any = {
            results: {
                bindings: [
                    {
                        subject: { value: 'http://data.posccaesar.org/rdl/RDS327239' },
                        label: { value: 'PUMP' },
                        score: { value: '10.5' },
                    },
                ],
            },
        };

        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });

        const results = await searchEquipmentClass('pump');

        expect(results).toHaveLength(1);
        expect(results[0].label).toBe('PUMP');
        expect(results[0].uri).toContain('RDS327239');
        // The query is URI-encoded in the URL params
        expect(mockFetch).toHaveBeenCalledWith(
            expect.stringContaining('text%3Aquery'),
            expect.any(Object)
        );
    });

    test('validateClassUri returns label for existing URI', async () => {
        const mockResponse: any = {
            results: {
                bindings: [
                    { label: { value: 'CENTRIFUGAL PUMP' } },
                ],
            },
        };

        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });

        const label = await validateClassUri('http://data.posccaesar.org/rdl/RDS432584');
        expect(label).toBe('CENTRIFUGAL PUMP');
    });

    test('retries on failure', async () => {
        mockFetch.mockReset();
        mockFetch
            .mockRejectedValueOnce(new Error('Network error'))
            .mockResolvedValueOnce({
                ok: true,
                json: async () => ({ results: { bindings: [] } }),
            });

        await searchEquipmentClass('test');
        expect(mockFetch.mock.calls.length).toBeGreaterThanOrEqual(2);
    });
});
