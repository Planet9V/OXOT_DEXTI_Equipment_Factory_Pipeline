/**
 * PCA Reference Data Library (RDL) SPARQL Utility.
 *
 * Provides functions to query the POSC Caesar Association (PCA) SPARQL
 * endpoint for equipment class validation and discovery.
 *
 * @module lib/pca-sparql
 */

const PCA_SPARQL_ENDPOINT = 'https://data.posccaesar.org/rdl/sparql';

/** Standard SPARQL prefixes for PCA RDL. */
const PREFIXES = `
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX rdl: <http://data.posccaesar.org/rdl/>
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX owl: <http://www.w3.org/2002/07/owl#>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  PREFIX text: <http://jena.apache.org/text#>
`;

export interface PcaClassMatch {
    uri: string;
    label: string;
    score?: number;
}

/**
 * Searches the PCA RDL for equipment classes matching a search term.
 * Uses Jena full-text search if available, falling back to label filtering.
 *
 * @param term - The search term (e.g. "pump", "exchanger").
 * @returns Promise resolving to a list of matching classes.
 */
export async function searchEquipmentClass(term: string): Promise<PcaClassMatch[]> {
    try {
        // Try Jena text query first as it's much faster/more accurate on PCA endpoint
        const query = `
      ${PREFIXES}
      SELECT ?subject ?score ?label
      WHERE {
        (?subject ?score ?label) text:query ("${term}*") .
      }
      ORDER BY DESC(?score)
      LIMIT 10
    `;

        const result = await runSparqlQuery(query);
        if (result && result.results?.bindings?.length > 0) {
            return result.results.bindings.map((b: any) => ({
                uri: b.subject.value,
                label: b.label.value,
                score: parseFloat(b.score.value),
            }));
        }

        // Fallback: Simple rdfs:label regex filter
        const fallbackQuery = `
      ${PREFIXES}
      SELECT ?uri ?label
      WHERE {
        ?uri rdfs:label ?label .
        FILTER(CONTAINS(LCASE(?label), "${term.toLowerCase()}"))
      }
      LIMIT 10
    `;
        const fallbackResult = await runSparqlQuery(fallbackQuery);
        return (fallbackResult.results?.bindings || []).map((b: any) => ({
            uri: b.uri.value,
            label: b.label.value,
        }));

    } catch (err) {
        console.error('PCA SPARQL Search Error:', err);
        return [];
    }
}

/**
 * Validates if a specific URI exists in the PCA RDL and returns its label.
 *
 * @param uri - The PCA RDL URI to validate.
 * @returns Promise resolving to the label if found, or null.
 */
export async function validateClassUri(uri: string): Promise<string | null> {
    const query = `
    ${PREFIXES}
    SELECT ?label
    WHERE {
      <${uri}> rdfs:label ?label .
    }
    LIMIT 1
  `;

    try {
        const result = await runSparqlQuery(query);
        return result.results?.bindings[0]?.label?.value || null;
    } catch (err) {
        console.error('PCA SPARQL URI Validation Error:', err);
        return null;
    }
}

/**
 * Internal helper to execute a SPARQL query against the PCA endpoint.
 * Retries up to 3 times as specified in Rule 6.
 */
async function runSparqlQuery(query: string, retries = 3): Promise<any> {
    const params = new URLSearchParams({
        query,
        output: 'json',
    });

    const url = `${PCA_SPARQL_ENDPOINT}?${params.toString()}`;

    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: { Accept: 'application/sparql-results+json' },
            });

            if (!response.ok) {
                throw new Error(`SPARQL Query Failed: ${response.statusText}`);
            }

            return await response.json();
        } catch (err) {
            if (i === retries - 1) throw err;
            // Exponential backoff
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
        }
    }
}
