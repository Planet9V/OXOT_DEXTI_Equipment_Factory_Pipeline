import { GoogleGenerativeAI } from '@google/generative-ai';
import crypto from 'crypto';
import * as pca from './pca-sparql';
import { EquipmentCard, PipelineRun, PipelineStage, StageStatus, LogEntry } from './types';
import * as storage from './storage';
import { getSector, getSubSector, getFacilityType } from './sectors-data';

/**
 * ISA/DEXPI tag prefix mapping.
 *
 * Maps ComponentClass names to ISA-standard instrument/equipment tag prefixes.
 * Includes both legacy names and official DEXPI 2.0 ComponentClass names so
 * the pipeline resolves tags correctly regardless of which name is used.
 */
const ISA_TAG_PREFIX: Record<string, string> = {
  // Rotating equipment
  Pump: 'P', CentrifugalPump: 'P', Compressor: 'C', CentrifugalCompressor: 'C',
  Turbine: 'T', SteamTurbine: 'ST', GasTurbine: 'GT', Fan: 'FN', Blower: 'BL',
  Agitator: 'AG', Centrifuge: 'CF', Conveyor: 'CNV', Mixer: 'MX',

  // Static equipment
  PressureVessel: 'V', Vessel: 'V', Tank: 'TK', StorageTank: 'TK',
  Column: 'COL', ProcessColumn: 'COL', Reactor: 'R', Drum: 'D',
  Separator: 'SEP', Filter: 'FL', Scrubber: 'SCR', Silo: 'SI',
  Thickener: 'TH', Clarifier: 'CL', Autoclave: 'AC',

  // Heat transfer
  HeatExchanger: 'E', ShellTubeHeatExchanger: 'E', AirCooledHeatExchanger: 'E',
  Boiler: 'BLR', Furnace: 'H', Heater: 'H', Condenser: 'CND', Cooler: 'CLR',
  Evaporator: 'EV', CoolingTower: 'CT', Dryer: 'DR', Deaerator: 'DA', Kiln: 'KN',

  // Electrical
  Generator: 'G', ElectricGenerator: 'G', Motor: 'M', Transformer: 'XF',
  Switchgear: 'SWG', CircuitBreaker: 'CB', UPS: 'UPS', VFD: 'VFD',
  Electrolyzer: 'EL',

  // Piping
  ControlValve: 'CV', ShutoffValve: 'XV', SafetyValve: 'PSV', GateValve: 'GV',
  Pipe: 'PIPE', FlareStack: 'FLR', Strainer: 'STR', Cyclone: 'CY',

  // Instrumentation
  Transmitter: 'TT', Analyzer: 'AT', FlowMeter: 'FE', GasAnalyzer: 'AT',
  LevelIndicator: 'LI',
};

export class DexpiPipeline {
  private runs: Map<string, PipelineRun> = new Map();
  private ai: GoogleGenerativeAI;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error('GEMINI_API_KEY environment variable required');
    this.ai = new GoogleGenerativeAI(apiKey);
  }

  async submitRun(params: {
    sector: string;
    subSector: string;
    facility: string;
    equipmentClass: string;
    quantity: number;
  }): Promise<string> {
    const runId = crypto.randomUUID();
    const run: PipelineRun = {
      id: runId,
      ...params,
      status: 'queued',
      stages: [
        { name: 'research', status: 'pending' },
        { name: 'generate', status: 'pending' },
        { name: 'validate', status: 'pending' },
        { name: 'catalog', status: 'pending' },
        { name: 'store', status: 'pending' },
      ],
      createdAt: new Date().toISOString(),
      results: { generated: 0, validated: 0, stored: 0, duplicatesSkipped: 0 },
      logs: [],
    };
    this.runs.set(runId, run);
    await storage.savePipelineRun(run);

    // Run pipeline asynchronously
    this.executePipeline(run).catch(err => {
      run.status = 'failed';
      this.addLog(run, 'error', 'system', `Pipeline failed: ${err.message}`);
      storage.savePipelineRun(run);
    });

    return runId;
  }

  getRunStatus(runId: string): PipelineRun | undefined {
    return this.runs.get(runId);
  }

  getRunHistory(): PipelineRun[] {
    return Array.from(this.runs.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  cancelRun(runId: string): boolean {
    const run = this.runs.get(runId);
    if (!run || run.status !== 'running') return false;
    run.status = 'cancelled';
    this.addLog(run, 'warn', 'system', 'Pipeline cancelled by user');
    storage.savePipelineRun(run);
    return true;
  }

  private addLog(run: PipelineRun, level: LogEntry['level'], stage: LogEntry['stage'], message: string) {
    run.logs.push({ timestamp: new Date().toISOString(), level, stage, message });
  }

  private setStageStatus(run: PipelineRun, stageName: PipelineStage, status: StageStatus['status'], message?: string) {
    const stage = run.stages.find(s => s.name === stageName);
    if (!stage) return;
    stage.status = status;
    if (status === 'running') stage.startedAt = new Date().toISOString();
    if (status === 'completed' || status === 'failed') stage.completedAt = new Date().toISOString();
    if (message) stage.message = message;
  }

  private async aiCall(prompt: string, retries = 3): Promise<string> {
    const model = this.ai.getGenerativeModel({ model: 'gemini-2.0-flash' });
    for (let i = 0; i < retries; i++) {
      try {
        const result = await model.generateContent(prompt);
        return result.response.text();
      } catch (err: any) {
        if (i === retries - 1) throw err;
        await new Promise(r => setTimeout(r, 2000 * (i + 1)));
      }
    }
    throw new Error('AI call failed after retries');
  }

  private isCancelled(run: PipelineRun): boolean {
    return (run as { status: string }).status === 'cancelled';
  }

  private async executePipeline(run: PipelineRun): Promise<void> {
    run.status = 'running';
    this.addLog(run, 'info', 'system', `Pipeline started for ${run.equipmentClass} in ${run.sector}/${run.subSector}/${run.facility}`);

    // Stage 1: Research
    this.setStageStatus(run, 'research', 'running');
    this.addLog(run, 'info', 'research', 'Researching equipment specifications...');
    const researchData = await this.stageResearch(run);
    this.setStageStatus(run, 'research', 'completed', `Found specs for ${run.equipmentClass}`);
    await storage.savePipelineRun(run);

    if (this.isCancelled(run)) return;

    // Stage 2: Generate
    this.setStageStatus(run, 'generate', 'running');
    this.addLog(run, 'info', 'generate', `Generating ${run.quantity} equipment cards...`);
    const cards = await this.stageGenerate(run, researchData);
    run.results.generated = cards.length;
    this.setStageStatus(run, 'generate', 'completed', `Generated ${cards.length} cards`);
    await storage.savePipelineRun(run);

    if (this.isCancelled(run)) return;

    // Stage 3: Validate
    this.setStageStatus(run, 'validate', 'running');
    this.addLog(run, 'info', 'validate', 'Validating equipment cards...');
    const validCards = await this.stageValidate(run, cards);
    
    // Calculate aggregate validation metrics
    const totalScore = validCards.reduce((s, c) => s + c.metadata.validationScore, 0);
    run.results.validated = validCards.length;
    run.results.averageScore = validCards.length > 0 ? Math.round(totalScore / validCards.length) : 0;
    run.results.verifiedCount = validCards.filter(c => c.metadata.source === 'dexpi-verified').length;

    this.setStageStatus(run, 'validate', 'completed', `${validCards.length}/${cards.length} passed validation (Avg Score: ${run.results.averageScore}%)`);
    await storage.savePipelineRun(run);

    if (this.isCancelled(run)) return;

    // Stage 4: Catalog
    this.setStageStatus(run, 'catalog', 'running');
    this.addLog(run, 'info', 'catalog', 'Cataloging and deduplicating...');
    const cataloged = await this.stageCatalog(run, validCards);
    this.setStageStatus(run, 'catalog', 'completed', `${cataloged.length} unique cards cataloged`);
    await storage.savePipelineRun(run);

    if (this.isCancelled(run)) return;

    // Stage 5: Store
    this.setStageStatus(run, 'store', 'running');
    this.addLog(run, 'info', 'store', 'Storing equipment cards to filesystem...');
    const stored = await this.stageStore(run, cataloged);
    run.results.stored = stored;
    this.setStageStatus(run, 'store', 'completed', `${stored} cards stored`);

    run.status = 'completed';
    run.completedAt = new Date().toISOString();
    this.addLog(run, 'info', 'system', `Pipeline completed: ${stored} cards stored, ${run.results.duplicatesSkipped} duplicates skipped`);
    await storage.savePipelineRun(run);
  }

  private async stageResearch(run: PipelineRun): Promise<string> {
    const sector = getSector(run.sector);
    const sectorName = sector?.name || run.sector;

    const prompt = `You are a process engineering expert. Research and provide detailed technical specifications for ${run.equipmentClass} equipment used in ${sectorName} - ${run.subSector} - ${run.facility}.

Include for each equipment type:
1. Typical design pressure and temperature ranges
2. Common materials of construction (body, internals, gaskets)
3. Standard sizes and capacities
4. Major manufacturers (at least 3)
5. Applicable standards (ASME, API, ISO, etc.)
6. Common nozzle configurations
7. Operating conditions

Return as structured JSON with these fields:
{
  "equipmentClass": "${run.equipmentClass}",
  "typicalSpecs": { ... },
  "manufacturers": [...],
  "standards": [...],
  "nozzleConfigs": [...],
  "materials": { ... }
}`;

    return await this.aiCall(prompt);
  }

  private async stageGenerate(run: PipelineRun, researchData: string): Promise<EquipmentCard[]> {
    const cards: EquipmentCard[] = [];
    const prefix = ISA_TAG_PREFIX[run.equipmentClass] || run.equipmentClass.slice(0, 2).toUpperCase();
    const batchSize = 3;

    for (let i = 0; i < run.quantity; i += batchSize) {
      if (this.isCancelled(run)) break;
      const count = Math.min(batchSize, run.quantity - i);
      const startNum = 101 + i;

      const prompt = `Based on this research data:
${researchData}

Generate exactly ${count} unique DEXPI 2.0 equipment cards as a JSON array. Each card should be realistic and unique (different sizes, configurations, or services).

Tag format: ${prefix}-${startNum} through ${prefix}-${startNum + count - 1}

Each card must follow this exact JSON schema:
{
  "tag": "${prefix}-${startNum}",
  "componentClass": "${run.equipmentClass}",
  "componentClassURI": "http://data.posccaesar.org/rdl/...",
  "displayName": "descriptive name",
  "category": "rotating|static|instrumentation|electrical|piping",
  "description": "detailed description of this specific equipment instance",
  "specifications": {
    "type": { "value": "...", "unit": "" },
    "capacity": { "value": 0, "unit": "..." },
    "power": { "value": 0, "unit": "kW" }
  },
  "operatingConditions": {
    "designPressure": 0, "operatingPressure": 0,
    "designTemperature": 0, "operatingTemperature": 0,
    "flowRate": 0,
    "units": { "pressure": "barg", "temperature": "C", "flow": "m3/h" }
  },
  "materials": { "body": "...", "internals": "...", "gaskets": "...", "bolting": "..." },
  "standards": ["ASME ...", "API ..."],
  "manufacturers": ["...", "...", "..."],
  "nozzles": [
    { "id": "N1", "size": "6\\"", "rating": "150#", "facing": "RF", "service": "..." }
  ]
}

Return ONLY a valid JSON array, no markdown.`;

      try {
        const response = await this.aiCall(prompt);
        const cleaned = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        const parsed = JSON.parse(cleaned);
        const batch = Array.isArray(parsed) ? parsed : [parsed];

        for (const raw of batch) {
          const card: EquipmentCard = {
            id: crypto.randomUUID(),
            tag: raw.tag || `${prefix}-${startNum + cards.length}`,
            componentClass: raw.componentClass || run.equipmentClass,
            componentClassURI: raw.componentClassURI || '',
            displayName: raw.displayName || `${run.equipmentClass} ${prefix}-${startNum + cards.length}`,
            category: raw.category || 'static',
            description: raw.description || '',
            sector: run.sector,
            subSector: run.subSector,
            facility: run.facility,
            specifications: raw.specifications || {},
            operatingConditions: raw.operatingConditions || {},
            materials: raw.materials || {},
            standards: raw.standards || [],
            manufacturers: raw.manufacturers || [],
            nozzles: (raw.nozzles || []).map((n: any) => ({
              id: n.id || crypto.randomUUID().slice(0, 8),
              size: n.size || '',
              rating: n.rating || '',
              facing: n.facing || 'RF',
              service: n.service || '',
            })),
            metadata: {
              version: 1,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              createdBy: 'ai-pipeline',
              contentHash: '',
              validationScore: 0,
              source: 'ai-generated',
            },
          };
          cards.push(card);
        }
        this.addLog(run, 'info', 'generate', `Batch ${Math.floor(i / batchSize) + 1}: generated ${batch.length} cards`);
      } catch (err: any) {
        this.addLog(run, 'warn', 'generate', `Batch ${Math.floor(i / batchSize) + 1} failed: ${err.message}`);
      }
    }

    return cards;
  }

  private async stageValidate(run: PipelineRun, cards: EquipmentCard[]): Promise<EquipmentCard[]> {
    const valid: EquipmentCard[] = [];

    for (const card of cards) {
      let score = 0;
      let maxScore = 0;

      // Check tag format
      maxScore += 10;
      if (/^[A-Z]{1,4}-\d{3,4}[A-Z]?$/.test(card.tag)) score += 10;

      // Check componentClass present
      maxScore += 10;
      if (card.componentClass) score += 10;

      // Check description quality
      maxScore += 10;
      if (card.description && card.description.length > 20) score += 10;
      else if (card.description) score += 5;
      else {
        this.addLog(run, 'warn', 'validate', `${card.tag}: missing or short description`);
      }

      // Check URI format and live verify with PCA
      maxScore += 20;
      if (card.componentClassURI && /^http:\/\/(data\.posccaesar.org|sandbox\.dexpi\.org)\/rdl\//.test(card.componentClassURI)) {
        score += 10;

        // High-fidelity live check
        try {
          const pcaLabel = await pca.validateClassUri(card.componentClassURI);
          if (pcaLabel) {
            score += 10;
            card.metadata.source = 'dexpi-verified';
            this.addLog(run, 'info', 'validate', `✅ Validated URI against PCA RDL: ${pcaLabel}`);
          } else {
            this.addLog(run, 'warn', 'validate', `⚠️ URI not found in PCA RDL: ${card.componentClassURI}`);
          }
        } catch (err) {
          this.addLog(run, 'error', 'validate', `❌ PCA connection error: ${err instanceof Error ? err.message : String(err)}`);
        }
      }

      // Check specifications populated
      maxScore += 15;
      const specCount = Object.keys(card.specifications).length;
      if (specCount >= 5) score += 15;
      else if (specCount >= 3) score += 10;
      else if (specCount >= 1) score += 5;

      // Check operating conditions
      maxScore += 15;
      const oc = card.operatingConditions;
      if (oc.designPressure && oc.operatingPressure) {
        score += 8;
        // Plausibility: design >= operating
        if (oc.designPressure >= oc.operatingPressure) score += 7;
        else this.addLog(run, 'warn', 'validate', `${card.tag}: design pressure < operating pressure`);
      }

      // Check materials
      maxScore += 10;
      const matCount = Object.values(card.materials).filter(Boolean).length;
      if (matCount >= 3) score += 10;
      else if (matCount >= 1) score += 5;

      // Check standards
      maxScore += 10;
      if (card.standards.length >= 2) score += 10;
      else if (card.standards.length >= 1) score += 5;

      // Check manufacturers
      maxScore += 10;
      if (card.manufacturers.length >= 2) score += 10;
      else if (card.manufacturers.length >= 1) score += 5;

      // Check nozzles
      maxScore += 10;
      if (card.nozzles.length >= 2) score += 10;
      else if (card.nozzles.length >= 1) score += 5;

      const finalScore = Math.round((score / maxScore) * 100);
      card.metadata.validationScore = finalScore;

      if (finalScore >= 40) {
        valid.push(card);
        this.addLog(run, 'info', 'validate', `${card.tag}: score ${finalScore}/100 - PASS`);
      } else {
        this.addLog(run, 'warn', 'validate', `${card.tag}: score ${finalScore}/100 - FAIL (below 40)`);
      }
    }

    return valid;
  }

  private async stageCatalog(run: PipelineRun, cards: EquipmentCard[]): Promise<EquipmentCard[]> {
    const unique: EquipmentCard[] = [];
    const existing = await storage.listEquipment(run.sector, run.subSector, run.facility);
    const existingTags = new Set(existing.map(e => e.tag));

    for (const card of cards) {
      // Check for duplicate tag
      if (existingTags.has(card.tag)) {
        // Try suffix A-Z
        let found = false;
        for (let c = 65; c <= 90; c++) {
          const newTag = `${card.tag}${String.fromCharCode(c)}`;
          if (!existingTags.has(newTag) && !unique.find(u => u.tag === newTag)) {
            card.tag = newTag;
            found = true;
            this.addLog(run, 'info', 'catalog', `Renamed duplicate to ${newTag}`);
            break;
          }
        }
        if (!found) {
          run.results.duplicatesSkipped++;
          this.addLog(run, 'warn', 'catalog', `Skipped duplicate: ${card.tag} (all suffixes taken)`);
          continue;
        }
      }

      // Check content hash for near-duplicates
      const hash = crypto.createHash('sha256')
        .update(JSON.stringify({ class: card.componentClass, specs: card.specifications, materials: card.materials }))
        .digest('hex').slice(0, 16);

      const hashExists = existing.find(e => e.metadata.contentHash === hash) || unique.find(u => u.metadata.contentHash === hash);
      if (hashExists) {
        run.results.duplicatesSkipped++;
        this.addLog(run, 'info', 'catalog', `Skipped near-duplicate: ${card.tag} (content hash match)`);
        continue;
      }

      card.metadata.contentHash = hash;
      unique.push(card);
    }

    return unique;
  }

  private async stageStore(run: PipelineRun, cards: EquipmentCard[]): Promise<number> {
    let stored = 0;

    // Ensure facility directory exists
    await storage.createFacility(
      run.sector, run.subSector, run.facility,
      run.facility, `${run.facility} facility`
    ).catch(() => { });

    for (const card of cards) {
      try {
        await storage.saveEquipment(card);
        stored++;
        this.addLog(run, 'info', 'store', `Stored ${card.tag} (${card.displayName})`);
      } catch (err: any) {
        this.addLog(run, 'error', 'store', `Failed to store ${card.tag}: ${err.message}`);
      }
    }

    return stored;
  }
}

// Singleton
let pipelineInstance: DexpiPipeline | null = null;

export function getPipeline(): DexpiPipeline {
  if (!pipelineInstance) {
    pipelineInstance = new DexpiPipeline();
  }
  return pipelineInstance;
}
