/**
 * Quality Gate Specialist Agent.
 *
 * Final production-quality checkpoint before equipment cards are written to
 * the knowledge graph. Scores cards across 10 dimensions and rejects any
 * that fall below the threshold.
 *
 * @module agents/specialist/quality-gate-agent
 */

import { BaseSpecialist } from './base-specialist';
import type { QualityReport } from '../types';
import type { EquipmentCard } from '../../types';

/* ─── Quality Dimensions ────────────────────────────────────────────────── */

/** A single quality dimension with scoring logic. */
interface QualityDimension {
    /** Dimension name. */
    name: string;
    /** Maximum score for this dimension. */
    maxScore: number;
    /** Scoring function. */
    score: (card: EquipmentCard) => number;
}

/**
 * 10-dimension quality scoring rubric.
 *
 * Each dimension independently scores 0–maxScore. The final score is
 * the weighted percentage of maximum possible points.
 */
const QUALITY_DIMENSIONS: QualityDimension[] = [
    {
        name: 'tag',
        maxScore: 10,
        score: (card) => {
            if (/^[A-Z]{1,4}-\d{3,4}[A-Z]?$/.test(card.tag)) return 10;
            if (card.tag && card.tag.length > 0) return 3;
            return 0;
        },
    },
    {
        name: 'componentClassURI',
        maxScore: 15,
        score: (card) => {
            if (!card.componentClassURI) return 0;
            if (/^http:\/\/(data\.posccaesar\.org|sandbox\.dexpi\.org)\/rdl\//.test(card.componentClassURI)) return 15;
            if (card.componentClassURI.startsWith('http')) return 5;
            return 0;
        },
    },
    {
        name: 'description',
        maxScore: 10,
        score: (card) => {
            if (!card.description) return 0;
            if (card.description.length >= 50) return 10;
            if (card.description.length >= 20) return 7;
            return 3;
        },
    },
    {
        name: 'specifications',
        maxScore: 15,
        score: (card) => {
            const count = Object.keys(card.specifications || {}).length;
            if (count >= 5) return 15;
            if (count >= 3) return 10;
            if (count >= 1) return 5;
            return 0;
        },
    },
    {
        name: 'operatingConditions',
        maxScore: 15,
        score: (card) => {
            const oc = card.operatingConditions || {};
            let s = 0;
            if (oc.designPressure != null) s += 4;
            if (oc.operatingPressure != null) s += 4;
            if (oc.designTemperature != null) s += 3;
            if (oc.operatingTemperature != null) s += 2;
            if (oc.flowRate != null) s += 2;
            return Math.min(s, 15);
        },
    },
    {
        name: 'materials',
        maxScore: 10,
        score: (card) => {
            const mats = Object.values(card.materials || {}).filter(Boolean);
            if (mats.length >= 3) return 10;
            if (mats.length >= 2) return 7;
            if (mats.length >= 1) return 4;
            return 0;
        },
    },
    {
        name: 'standards',
        maxScore: 10,
        score: (card) => {
            const count = (card.standards || []).length;
            if (count >= 3) return 10;
            if (count >= 2) return 7;
            if (count >= 1) return 4;
            return 0;
        },
    },
    {
        name: 'manufacturers',
        maxScore: 8,
        score: (card) => {
            const count = (card.manufacturers || []).length;
            if (count >= 3) return 8;
            if (count >= 2) return 6;
            if (count >= 1) return 3;
            return 0;
        },
    },
    {
        name: 'nozzles',
        maxScore: 5,
        score: (card) => {
            const count = (card.nozzles || []).length;
            if (count >= 2) return 5;
            if (count >= 1) return 3;
            return 0;
        },
    },
    {
        name: 'metadata',
        maxScore: 2,
        score: (card) => {
            let s = 0;
            if (card.metadata?.version > 0) s += 1;
            if (card.metadata?.createdAt) s += 1;
            return s;
        },
    },
];

/* ─── Quality Gate Agent ────────────────────────────────────────────────── */

/** Input for the quality gate agent. */
export interface QualityGateInput {
    /** Equipment card to evaluate. */
    card: EquipmentCard;
    /** Minimum score to approve (default: 80). */
    minScore?: number;
}

/**
 * Quality Gate specialist agent.
 *
 * Scores equipment cards across 10 dimensions and approves or rejects
 * based on a configurable threshold. Fully deterministic — no LLM calls.
 */
export class QualityGateAgent extends BaseSpecialist<QualityGateInput, QualityReport> {
    constructor() {
        super({
            agentId: 'quality-gate-agent',
            displayName: 'Quality Gate Agent',
            systemPrompt: '', // Not used — deterministic scoring
            tools: [],
            toolHandlers: {},
        });
    }

    /**
     * Evaluates an equipment card against the 10-dimension quality rubric.
     *
     * @param input - Card and minimum score threshold.
     * @param runId - Pipeline run identifier.
     * @returns Quality report with per-dimension scores.
     */
    async execute(input: QualityGateInput, runId: string): Promise<QualityReport> {
        const { card, minScore = 80 } = input;

        const dimensions: Record<string, number> = {};
        let totalEarned = 0;
        let totalMax = 0;
        const rejectionReasons: string[] = [];
        const suggestions: string[] = [];

        for (const dim of QUALITY_DIMENSIONS) {
            const earned = dim.score(card);
            dimensions[dim.name] = Math.round((earned / dim.maxScore) * 100);
            totalEarned += earned;
            totalMax += dim.maxScore;

            if (earned < dim.maxScore * 0.5) {
                rejectionReasons.push(`${dim.name}: scored ${earned}/${dim.maxScore} (below 50%)`);
            }
            if (earned < dim.maxScore) {
                suggestions.push(`${dim.name}: improve from ${earned}/${dim.maxScore}`);
            }
        }

        const score = totalMax > 0 ? Math.round((totalEarned / totalMax) * 100) : 0;
        const approved = score >= minScore && rejectionReasons.length === 0;

        if (score < minScore) {
            rejectionReasons.unshift(`Overall score ${score} is below minimum threshold ${minScore}`);
        }

        const report: QualityReport = {
            score,
            approved,
            rejectionReasons: approved ? [] : rejectionReasons,
            suggestions,
            dimensions,
        };

        console.log(`[quality-gate-agent] Run ${runId}: ${card.tag} — score ${score}/100, approved=${approved}`);
        return report;
    }
}
