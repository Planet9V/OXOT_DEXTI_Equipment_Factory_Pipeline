// DEXPI 2.0 Equipment Factory Pipeline — Core Types

export type EquipmentCategory = "rotating" | "static" | "instrumentation" | "electrical" | "piping";

export interface DexpiEquipmentType {
  componentClass: string;
  componentClassURI: string;
  displayName: string;
  category: EquipmentCategory;
  typicalQuantity: { min: number; max: number };
}

export interface DexpiFacilityType {
  code: string;
  name: string;
  description: string;
  equipment: DexpiEquipmentType[];
}

export interface DexpiSubSector {
  code: string;
  name: string;
  description: string;
  facilities: DexpiFacilityType[];
}

export interface DexpiSector {
  code: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  subSectors: DexpiSubSector[];
}

// Equipment card stored as JSON
export interface EquipmentCard {
  id: string;
  tag: string;
  componentClass: string;
  componentClassURI: string;
  displayName: string;
  category: EquipmentCategory;
  description: string;
  sector: string;
  subSector: string;
  facility: string;
  specifications: Record<string, SpecValue>;
  operatingConditions: {
    designPressure?: number;
    operatingPressure?: number;
    designTemperature?: number;
    operatingTemperature?: number;
    flowRate?: number;
    units?: Record<string, string>;
  };
  materials: {
    body?: string;
    internals?: string;
    gaskets?: string;
    bolting?: string;
  };
  standards: string[];
  manufacturers: string[];
  nozzles: NozzleSpec[];
  metadata: {
    version: number;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    contentHash: string;
    validationScore: number;
    source: "manual" | "ai-generated" | "imported" | "vendor";
  };
}

export interface SpecValue {
  value: string | number | boolean;
  unit?: string;
  source?: string;
}

export interface NozzleSpec {
  id: string;
  size: string;
  rating: string;
  facing: string;
  service: string;
}

// Vendor variation extends base equipment
export interface VendorVariation {
  id: string;
  baseEquipmentId: string;
  manufacturer: string;
  model: string;
  partNumber?: string;
  catalogUrl?: string;
  specifications: Record<string, SpecValue>;
  differentials: string[];  // what differs from base
  metadata: {
    version: number;
    createdAt: string;
    updatedAt: string;
  };
}

// Pipeline types
export type PipelineStage = "research" | "generate" | "validate" | "catalog" | "store";

export interface PipelineRun {
  id: string;
  sector: string;
  subSector: string;
  facility: string;
  equipmentClass: string;
  quantity: number;
  status: "queued" | "running" | "completed" | "failed" | "cancelled";
  stages: StageStatus[];
  createdAt: string;
  completedAt?: string;
  results: {
    generated: number;
    validated: number;
    stored: number;
    duplicatesSkipped: number;
  };
  logs: LogEntry[];
}

export interface StageStatus {
  name: PipelineStage;
  status: "pending" | "running" | "completed" | "failed" | "skipped";
  startedAt?: string;
  completedAt?: string;
  message?: string;
}

export interface LogEntry {
  timestamp: string;
  level: "info" | "warn" | "error" | "debug";
  stage: PipelineStage | "system";
  message: string;
}

// Directory structure info
export interface DirectoryInfo {
  path: string;
  name: string;
  type: "sector" | "subsector" | "facility";
  children: DirectoryInfo[];
  equipmentCount: number;
  vendorCount: number;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

// Search/filter types
export interface EquipmentFilter {
  sector?: string;
  subSector?: string;
  facility?: string;
  category?: EquipmentCategory;
  componentClass?: string;
  searchTerm?: string;
  source?: string;
  minValidationScore?: number;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Coverage/gap analysis
export interface CoverageReport {
  sector: string;
  subSector: string;
  facility: string;
  expectedTypes: string[];
  existingTypes: string[];
  missingTypes: string[];
  coveragePercent: number;
}
