/**
 * Graph Writer Specialist Agent.
 *
 * Writes approved equipment cards to the Neo4j/Memgraph knowledge graph
 * using the existing graph-schema functions. Performs deduplication and
 * read-back verification to ensure data integrity.
 *
 * @module agents/specialist/graph-writer-agent
 */

import crypto from 'crypto';
import { BaseSpecialist } from './base-specialist';
import * as schema from '../../graph-schema';
import type { WriteReport } from '../types';
import type { EquipmentCard } from '../../types';

/* ─── Graph Writer Agent ────────────────────────────────────────────────── */

/** Input for the graph writer agent. */
export interface GraphWriterInput {
    /** Equipment cards to write. */
    cards: EquipmentCard[];
    /** Whether to verify writes by reading back. */
    verify?: boolean;
}

/**
 * Graph Writer specialist agent.
 *
 * Writes equipment cards to the knowledge graph using `createEquipmentStandalone`.
 * Deduplicates by content hash and verifies writes by read-back.
 * Fully deterministic — no LLM calls.
 */
export class GraphWriterAgent extends BaseSpecialist<GraphWriterInput, WriteReport> {
    constructor() {
        super({
            agentId: 'graph-writer-agent',
            displayName: 'Graph Writer Agent',
            systemPrompt: '', // Not used — direct graph operations
            tools: [],
            toolHandlers: {},
        });
    }

    /**
     * Writes equipment cards to the knowledge graph.
     *
     * @param input - Cards to write and verification flag.
     * @param runId - Pipeline run identifier.
     * @returns Write report with counts and verification status.
     */
    async execute(input: GraphWriterInput, runId: string): Promise<WriteReport> {
        const { cards, verify = true } = input;
        const equipmentIds: string[] = [];
        let nodesCreated = 0;
        let relationshipsCreated = 0;
        let duplicatesSkipped = 0;
        let verified = true;

        for (const card of cards) {
            // Compute content hash for deduplication
            const contentHash = crypto.createHash('sha256')
                .update(JSON.stringify({
                    componentClass: card.componentClass,
                    specifications: card.specifications,
                    materials: card.materials,
                    tag: card.tag,
                }))
                .digest('hex')
                .slice(0, 16);

            // Check for existing equipment with same tag
            try {
                const facilityCode = card.facility || '';
                const existing = await schema.getEquipmentNode(card.tag, facilityCode);
                if (existing) {
                    // Check if content is identical
                    const existingCard = existing as { card?: string; id?: string };

                    if (existingCard.card) {
                        try {
                            const existingData = JSON.parse(existingCard.card as string);
                            const existingHash = crypto.createHash('sha256')
                                .update(JSON.stringify({
                                    componentClass: existingData.componentClass,
                                    specifications: existingData.specifications,
                                    materials: existingData.materials,
                                    tag: existingData.tag,
                                }))
                                .digest('hex')
                                .slice(0, 16);

                            if (existingHash === contentHash) {
                                duplicatesSkipped++;
                                console.log(`[graph-writer] Run ${runId}: Skipped duplicate ${card.tag}`);
                                continue;
                            }
                        } catch {
                            // Can't parse existing card — proceed with write
                        }
                    }
                }
            } catch {
                // No existing equipment — proceed with write
            }

            // Write equipment to graph
            try {
                const id = await schema.createEquipmentStandalone({
                    tag: card.tag,
                    componentClass: card.componentClass,
                    componentClassURI: card.componentClassURI,
                    displayName: card.displayName,
                    category: card.category,
                    description: card.description,
                    sector: card.sector,
                    subSector: card.subSector,
                    facility: card.facility,
                    metadata: {
                        source: 'pipeline-v2',
                        validationScore: card.metadata.validationScore,
                        contentHash,
                    },
                    specifications: card.specifications,
                    materials: card.materials,
                    standards: card.standards,
                    manufacturers: card.manufacturers,
                });

                equipmentIds.push(id);
                nodesCreated++;

                // Facility assignment creates a relationship
                if (card.facility) {
                    relationshipsCreated++;
                }

                // Verify write by reading back
                if (verify) {
                    try {
                        const readBack = await schema.getEquipmentById(id);
                        if (!readBack) {
                            console.warn(`[graph-writer] Run ${runId}: Verification failed for ${card.tag} (id: ${id})`);
                            verified = false;
                        }
                    } catch (err) {
                        console.warn(`[graph-writer] Run ${runId}: Read-back error for ${card.tag}: ${err instanceof Error ? err.message : String(err)}`);
                        verified = false;
                    }
                }

                console.log(`[graph-writer] Run ${runId}: Written ${card.tag} (id: ${id})`);
            } catch (err) {
                console.error(`[graph-writer] Run ${runId}: Failed to write ${card.tag}: ${err instanceof Error ? err.message : String(err)}`);
                throw err;
            }
        }

        const report: WriteReport = {
            nodesCreated,
            relationshipsCreated,
            duplicatesSkipped,
            equipmentIds,
            verified,
        };

        console.log(`[graph-writer] Run ${runId}: ${nodesCreated} nodes, ${relationshipsCreated} relationships, ${duplicatesSkipped} skipped`);
        return report;
    }
}
