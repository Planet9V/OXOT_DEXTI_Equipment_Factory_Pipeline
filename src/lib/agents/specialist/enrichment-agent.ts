/**
 * Enrichment Specialist Agent.
 *
 * Auto-fills missing fields on equipment cards using PCA RDL, ISA standards,
 * and research data. Operates deterministically — same input always produces
 * same output.
 *
 * @module agents/specialist/enrichment-agent
 */

import { BaseSpecialist } from './base-specialist';
import * as pca from '../../pca-sparql';
import type { ResearchReport } from '../types';
import type { EquipmentCard } from '../../types';

/* ─── ISA Tag Prefix Map ────────────────────────────────────────────────── */

const ISA_TAG_PREFIX: Record<string, string> = {
    Pump: 'P', CentrifugalPump: 'P', Compressor: 'C', CentrifugalCompressor: 'C',
    Turbine: 'T', SteamTurbine: 'ST', GasTurbine: 'GT', Fan: 'FN', Blower: 'BL',
    Agitator: 'AG', Centrifuge: 'CF', Conveyor: 'CNV', Mixer: 'MX',
    PressureVessel: 'V', Vessel: 'V', Tank: 'TK', StorageTank: 'TK',
    Column: 'COL', ProcessColumn: 'COL', Reactor: 'R', Drum: 'D',
    Separator: 'SEP', Filter: 'FL', Scrubber: 'SCR', Silo: 'SI',
    HeatExchanger: 'E', ShellTubeHeatExchanger: 'E', AirCooledHeatExchanger: 'E',
    Boiler: 'BLR', Furnace: 'H', Heater: 'H', Condenser: 'CND', Cooler: 'CLR',
    Generator: 'G', ElectricGenerator: 'G', Motor: 'M', Transformer: 'XF',
    ControlValve: 'CV', ShutoffValve: 'XV', SafetyValve: 'PSV', GateValve: 'GV',
    Transmitter: 'TT', Analyzer: 'AT', FlowMeter: 'FE',
};

/* ─── Types ─────────────────────────────────────────────────────────────── */

/** Input for the enrichment agent. */
export interface EnrichmentInput {
    /** Equipment card to enrich. */
    card: EquipmentCard;
    /** Research report with reference data. */
    research: ResearchReport;
}

/* ─── Enrichment Agent ──────────────────────────────────────────────────── */

/**
 * Enrichment specialist agent.
 *
 * Fills missing fields on equipment cards using PCA RDL lookups,
 * ISA tag assignment, and research data backfill. Deterministic —
 * no LLM calls, purely rule-based enrichment.
 */
export class EnrichmentAgent extends BaseSpecialist<EnrichmentInput, EquipmentCard> {
    constructor() {
        super({
            agentId: 'enrichment-agent',
            displayName: 'Enrichment Agent',
            systemPrompt: '', // Not used — no LLM calls
            tools: [],
            toolHandlers: {},
        });
    }

    /**
     * Enriches an equipment card with missing data.
     *
     * @param input - Card and research data.
     * @param runId - Pipeline run identifier.
     * @returns Enriched equipment card.
     */
    async execute(input: EnrichmentInput, runId: string): Promise<EquipmentCard> {
        const { card, research } = input;
        const enriched = { ...card };
        let enrichments = 0;

        // 1. Resolve missing componentClassURI from PCA RDL
        if (!enriched.componentClassURI || !enriched.componentClassURI.startsWith('http')) {
            if (research.pcaUri) {
                enriched.componentClassURI = research.pcaUri;
                enrichments++;
            } else {
                try {
                    const matches = await pca.searchEquipmentClass(enriched.componentClass);
                    if (matches.length > 0) {
                        enriched.componentClassURI = matches[0].uri;
                        enrichments++;
                    }
                } catch {
                    // PCA unavailable — skip
                }
            }
        }

        // 2. Fix tag prefix using ISA-5.1 standard
        const expectedPrefix = ISA_TAG_PREFIX[enriched.componentClass];
        if (expectedPrefix && !enriched.tag.startsWith(expectedPrefix)) {
            const tagNum = enriched.tag.replace(/^[A-Z]+-/, '');
            enriched.tag = `${expectedPrefix}-${tagNum}`;
            enrichments++;
        }

        // 3. Backfill materials from research
        if (!enriched.materials?.body && research.materials?.body) {
            enriched.materials = {
                ...enriched.materials,
                body: research.materials.body,
                internals: research.materials.internals || enriched.materials?.internals || '',
                gaskets: research.materials.gaskets || enriched.materials?.gaskets || '',
                bolting: research.materials.bolting || enriched.materials?.bolting || '',
            };
            enrichments++;
        }

        // 4. Backfill standards from research
        if ((enriched.standards || []).length < 2 && research.standards.length > 0) {
            const existing = new Set(enriched.standards || []);
            for (const std of research.standards) {
                if (!existing.has(std)) {
                    enriched.standards = [...(enriched.standards || []), std];
                    existing.add(std);
                }
            }
            enrichments++;
        }

        // 5. Backfill manufacturers from research
        if ((enriched.manufacturers || []).length < 2 && research.manufacturers.length > 0) {
            const existing = new Set(enriched.manufacturers || []);
            for (const mfg of research.manufacturers) {
                if (!existing.has(mfg)) {
                    enriched.manufacturers = [...(enriched.manufacturers || []), mfg];
                    existing.add(mfg);
                }
            }
            enrichments++;
        }

        // 6. Backfill nozzles from research
        if ((enriched.nozzles || []).length === 0 && research.nozzleConfigs.length > 0) {
            enriched.nozzles = research.nozzleConfigs.map((nc) => ({
                id: nc.id,
                size: nc.size,
                rating: nc.rating,
                facing: 'RF',
                service: nc.service,
            }));
            enrichments++;
        }

        // 7. Ensure description is substantive
        if (!enriched.description || enriched.description.length < 20) {
            enriched.description = `${enriched.displayName} — ${enriched.componentClass} equipment for ${enriched.sector}/${enriched.subSector}/${enriched.facility}. ${(enriched.standards || []).slice(0, 3).join(', ')}`;
            enrichments++;
        }

        // 8. Set metadata source if enriched
        if (enrichments > 0) {
            enriched.metadata = {
                ...enriched.metadata,
                updatedAt: new Date().toISOString(),
            };
        }

        console.log(`[enrichment-agent] Run ${runId}: ${enriched.tag} — ${enrichments} enrichments applied`);
        return enriched;
    }
}
