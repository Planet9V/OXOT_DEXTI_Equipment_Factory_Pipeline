/**
 * Agent API Route.
 *
 * POST /api/agent — Handles chat requests to the AI Application Assistant.
 * Supports single-persona chat and multi-persona expert consultation.
 *
 * Request body:
 * {
 *   "messages": [{ "role": "user", "content": "..." }],
 *   "persona": "coordinator" | "processEngineer" | "standardsExpert" | "safetyAnalyst" | "qualityReviewer",
 *   "mode": "chat" | "consult" | "research" | "review",
 *   "context": { "sector": "...", "subSector": "...", "facility": "...", "equipmentClass": "..." },
 *   "params": { /* mode-specific params * / }
 * }
 *
 * @module api/agent
 */

import { NextResponse } from 'next/server';
import { getAgent } from '@/lib/agents/agent';
import * as schema from '@/lib/graph-schema';
import type { ChatMessage, AgentContext, PersonaName } from '@/lib/agents/types';

/** Request body shape. */
interface AgentRequest {
    messages?: ChatMessage[];
    persona?: PersonaName;
    mode?: 'chat' | 'consult' | 'research' | 'review' | 'coverage' | 'create';
    context?: AgentContext;
    params?: Record<string, unknown>;
}

/**
 * POST /api/agent
 *
 * Processes AI agent requests with multiple modes:
 * - chat: Single persona conversation
 * - consult: Parallel multi-persona expert consultation
 * - research: Structured equipment research
 * - review: Equipment card quality review
 * - coverage: Gap analysis for a facility
 */
export async function POST(request: Request) {
    try {
        const body = (await request.json()) as AgentRequest;
        const agent = getAgent();
        const mode = body.mode || 'chat';

        switch (mode) {
            case 'chat': {
                const messages = body.messages || [];
                if (messages.length === 0) {
                    return NextResponse.json(
                        { error: 'messages array is required for chat mode' },
                        { status: 400 },
                    );
                }
                const response = await agent.chat(messages, body.persona, body.context);
                return NextResponse.json({
                    success: true,
                    mode: 'chat',
                    response,
                    timestamp: new Date().toISOString(),
                });
            }

            case 'consult': {
                const query = body.messages?.[0]?.content;
                if (!query) {
                    return NextResponse.json(
                        { error: 'At least one user message is required for consult mode' },
                        { status: 400 },
                    );
                }
                const personas = body.params?.personas as PersonaName[] | undefined;
                const results = await agent.consultExperts(query, personas, body.context);
                return NextResponse.json({
                    success: true,
                    mode: 'consult',
                    experts: results,
                    timestamp: new Date().toISOString(),
                });
            }

            case 'research': {
                const params = body.params || {};
                if (!params.equipmentClass) {
                    return NextResponse.json(
                        { error: 'params.equipmentClass is required for research mode' },
                        { status: 400 },
                    );
                }
                const result = await agent.researchEquipment({
                    sector: String(params.sector || body.context?.sector || ''),
                    subSector: String(params.subSector || body.context?.subSector || ''),
                    facility: String(params.facility || body.context?.facility || ''),
                    equipmentClass: String(params.equipmentClass),
                });
                return NextResponse.json({
                    success: true,
                    mode: 'research',
                    result,
                    timestamp: new Date().toISOString(),
                });
            }

            case 'review': {
                const card = body.params?.card as Record<string, unknown> | undefined;
                if (!card) {
                    return NextResponse.json(
                        { error: 'params.card is required for review mode' },
                        { status: 400 },
                    );
                }
                const result = await agent.reviewEquipmentCard(card);
                return NextResponse.json({
                    success: true,
                    mode: 'review',
                    result,
                    timestamp: new Date().toISOString(),
                });
            }

            case 'coverage': {
                const facility = String(body.params?.facility || '');
                const sectorCode = String(body.params?.sectorCode || body.context?.sector || '');
                if (!facility) {
                    return NextResponse.json(
                        { error: 'params.facility is required for coverage mode' },
                        { status: 400 },
                    );
                }
                const result = await agent.analyzeCoverage(facility, sectorCode);
                return NextResponse.json({
                    success: true,
                    mode: 'coverage',
                    result,
                    timestamp: new Date().toISOString(),
                });
            }

            case 'create': {
                const cParams = body.params || {};
                if (!cParams.equipmentClass) {
                    return NextResponse.json(
                        { error: 'params.equipmentClass is required for create mode' },
                        { status: 400 },
                    );
                }
                // Step 1: Research the equipment class using the AI agent
                const research = await agent.researchEquipment({
                    sector: String(cParams.sector || body.context?.sector || ''),
                    subSector: String(cParams.subSector || body.context?.subSector || ''),
                    facility: String(cParams.facility || body.context?.facility || ''),
                    equipmentClass: String(cParams.equipmentClass),
                });

                // Step 2: Build an ISA tag
                const prefix = String(cParams.equipmentClass).substring(0, 2).toUpperCase();
                const tagNum = Math.floor(Math.random() * 900) + 100;
                const tag = `${prefix}-${tagNum}`;

                // Step 3: Create standalone equipment in Memgraph
                const componentClassURI = String(
                    cParams.componentClassURI || research.specifications?.componentClassURI || '',
                );
                const id = await schema.createEquipmentStandalone({
                    tag,
                    componentClass: String(cParams.equipmentClass),
                    componentClassURI,
                    displayName: String(cParams.displayName || cParams.equipmentClass),
                    category: String(cParams.category || 'static'),
                    description: String(cParams.description || `AI-researched ${cParams.equipmentClass}`),
                    sector: String(cParams.sector || ''),
                    subSector: String(cParams.subSector || ''),
                    facility: String(cParams.facility || ''),
                    metadata: { source: 'ai-agent', validationScore: 75 },
                    specifications: research.specifications,
                    manufacturers: research.manufacturers,
                    standards: research.standards,
                });

                const created = await schema.getEquipmentById(id);
                return NextResponse.json({
                    success: true,
                    mode: 'create',
                    equipment: created,
                    research,
                    timestamp: new Date().toISOString(),
                });
            }

            default:
                return NextResponse.json(
                    { error: `Unknown mode: ${mode}` },
                    { status: 400 },
                );
        }
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        console.error('[api/agent] Error:', message);
        return NextResponse.json(
            { error: message, timestamp: new Date().toISOString() },
            { status: 500 },
        );
    }
}

/**
 * GET /api/agent
 *
 * Returns agent status, available personas, and tools.
 */
export async function GET() {
    const agent = getAgent();

    let connected = false;
    try {
        connected = await agent.testConnection();
    } catch {
        connected = false;
    }

    return NextResponse.json({
        status: connected ? 'ready' : 'disconnected',
        model: process.env.OPENROUTER_MODEL || 'moonshotai/kimi-k2.5',
        personas: agent.getPersonas(),
        tools: [
            'query_memgraph',
            'search_equipment',
            'validate_class_uri',
            'search_standards',
            'search_web',
            'search_news',
            'lookup_cve',
            'lookup_chemical',
        ],
        modes: ['chat', 'consult', 'research', 'review', 'coverage', 'create'],
        timestamp: new Date().toISOString(),
    });
}
