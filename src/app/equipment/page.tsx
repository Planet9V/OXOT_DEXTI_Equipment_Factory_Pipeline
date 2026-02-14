'use client';

/**
 * Equipment Library — Interactive Equipment Browser.
 *
 * Displays real equipment data from Memgraph with cascading Sector/SubSector/
 * Facility filters, dual Card/List views, expandable tabbed detail panels
 * with SVG icons, 3D image placeholders, vendor variations, and
 * upstream/downstream connection context.
 *
 * @module equipment/page
 */

import { useEffect, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface EquipmentCard {
  id: string;
  tag: string;
  componentClass: string;
  componentClassURI?: string;
  displayName: string;
  category: string;
  description: string;
  sector: string;
  subSector: string;
  facility: string;
  facilityCode?: string;
  specifications?: Record<string, { value: string | number; unit?: string; source?: string }>;
  operatingConditions?: Record<string, number | string | undefined>;
  materials?: Record<string, string | undefined>;
  standards?: string[];
  manufacturers?: string[];
  nozzles?: { id: string; size: string; rating: string; facing: string; service: string }[];
  metadata?: {
    version?: number;
    validationScore?: number;
    source?: string;
    createdAt?: string;
    updatedAt?: string;
    contentHash?: string;
  };
}

interface PaginatedResult {
  items: EquipmentCard[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

interface SectorData {
  code: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  subSectors: {
    code: string;
    name: string;
    description: string;
    facilities: { code: string; name: string; description: string }[];
  }[];
}

interface VendorVariation {
  vendor: string;
  model: string;
  partNumber: string;
  software: string;
  accentColor: string;
  badgeClass: string;
  specs: Record<string, string>;
  differentials: string[];
}

interface ConnectedEquipment {
  direction: 'upstream' | 'downstream';
  tag: string;
  name: string;
  componentClass: string;
  connection: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CATEGORY_LABELS: Record<string, string> = {
  rotating: 'Rotating',
  static: 'Static',
  'heat-transfer': 'Heat Transfer',
  instrumentation: 'Instruments',
  electrical: 'Electrical',
  piping: 'Piping',
};

const CATEGORY_COLORS: Record<string, string> = {
  rotating: 'badge-blue',
  static: 'badge-green',
  'heat-transfer': 'badge-orange',
  instrumentation: 'badge-yellow',
  electrical: 'badge-purple',
  piping: 'badge-red',
};

const PAGE_SIZES = [10, 25, 50];

/** Placeholder vendor variations */
const MOCK_VENDOR_VARIATIONS: VendorVariation[] = [
  {
    vendor: 'Siemens',
    model: 'SINAMICS G120',
    partNumber: '6SL3210-1KE21-7UP1',
    software: 'TIA Portal v18, SIMATIC STEP 7, WinCC OA',
    accentColor: '#009999',
    badgeClass: 'badge-blue',
    specs: { Protocol: 'PROFINET IO', Enclosure: 'IP55', Voltage: '380–480 V', Certification: 'IECEx / ATEX Zone 2' },
    differentials: ['Integrated safety SIL 3', 'Energy-optimized vector control', 'Built-in EMC filter Class A'],
  },
  {
    vendor: 'Rockwell Automation',
    model: 'PowerFlex 755T',
    partNumber: '20G41BD040AA0NNNNN',
    software: 'Studio 5000 Logix Designer, FactoryTalk Optix',
    accentColor: '#cc0000',
    badgeClass: 'badge-red',
    specs: { Protocol: 'EtherNet/IP CIP', Enclosure: 'IP20 / NEMA 1', Voltage: '380–480 V', Certification: 'UL Listed, CE Mark' },
    differentials: ['Predictive diagnostics via FactoryTalk Analytics', 'Common DC bus support', 'TotalFORCE technology'],
  },
  {
    vendor: 'ABB',
    model: 'ACS880-01',
    partNumber: '3AUA0000147806',
    software: 'ABB Ability™ Digital, Drive Composer Pro 2.x',
    accentColor: '#ff000f',
    badgeClass: 'badge-red',
    specs: { Protocol: 'PROFIBUS DP-V1', Enclosure: 'IP21 / UL Type 1', Voltage: '380–480 V', Certification: 'DNV-GL Marine, SIL 2' },
    differentials: ['Direct torque control (DTC)', 'Adaptive programming via IEC 61131-3', 'Coated boards for corrosive environments'],
  },
];

/**
 * Mock upstream/downstream connections — placeholder until graph relationships
 * are built out with real CONTAINS_EQUIPMENT edges.
 */
const MOCK_CONNECTIONS: ConnectedEquipment[] = [
  { direction: 'upstream', tag: 'V-101', name: 'Feed Vessel', componentClass: 'PressureVessel', connection: 'Suction nozzle N1 → 8" pipe' },
  { direction: 'upstream', tag: 'FCV-101', name: 'Flow Control Valve', componentClass: 'ControlValve', connection: 'Upstream isolation via globe valve' },
  { direction: 'downstream', tag: 'E-201', name: 'Heat Exchanger', componentClass: 'ShellAndTubeHeatExchanger', connection: 'Discharge nozzle N2 → 6" pipe' },
  { direction: 'downstream', tag: 'TI-101', name: 'Temperature Indicator', componentClass: 'TemperatureTransmitter', connection: 'Thermowell on discharge line' },
];

// ---------------------------------------------------------------------------
// SVG Equipment Icons by category
// ---------------------------------------------------------------------------

function EquipmentIcon({ category, size = 48 }: { category: string; size?: number }) {
  const s = size;
  const stroke = 'rgba(255,107,0,0.6)';
  const fill = 'rgba(255,107,0,0.08)';
  switch (category) {
    case 'rotating':
      return (
        <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="18" stroke={stroke} strokeWidth="1.5" fill={fill} />
          <path d="M24 6 C30 18, 36 18, 42 24 C36 30, 30 30, 24 42 C18 30, 12 30, 6 24 C12 18, 18 18, 24 6Z" stroke={stroke} strokeWidth="1" fill="rgba(255,107,0,0.15)" />
          <circle cx="24" cy="24" r="4" fill={stroke} />
        </svg>
      );
    case 'static':
      return (
        <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
          <rect x="12" y="6" width="24" height="36" rx="4" stroke={stroke} strokeWidth="1.5" fill={fill} />
          <line x1="12" y1="14" x2="36" y2="14" stroke={stroke} strokeWidth="1" opacity="0.5" />
          <line x1="12" y1="34" x2="36" y2="34" stroke={stroke} strokeWidth="1" opacity="0.5" />
          <circle cx="24" cy="24" r="6" stroke={stroke} strokeWidth="1" fill="rgba(255,107,0,0.1)" />
        </svg>
      );
    case 'heat-transfer':
      return (
        <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
          <ellipse cx="24" cy="24" rx="20" ry="12" stroke={stroke} strokeWidth="1.5" fill={fill} />
          <path d="M10 18 Q17 12 24 18 Q31 24 38 18" stroke={stroke} strokeWidth="1" fill="none" />
          <path d="M10 24 Q17 18 24 24 Q31 30 38 24" stroke={stroke} strokeWidth="1" fill="none" />
          <path d="M10 30 Q17 24 24 30 Q31 36 38 30" stroke={stroke} strokeWidth="1" fill="none" />
        </svg>
      );
    case 'instrumentation':
      return (
        <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="18" stroke={stroke} strokeWidth="1.5" fill={fill} />
          <path d="M15 30 L24 12 L33 30" stroke={stroke} strokeWidth="1.5" fill="none" />
          <line x1="24" y1="30" x2="24" y2="38" stroke={stroke} strokeWidth="1.5" />
          <circle cx="24" cy="12" r="2" fill={stroke} />
        </svg>
      );
    case 'electrical':
      return (
        <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
          <rect x="8" y="10" width="32" height="28" rx="3" stroke={stroke} strokeWidth="1.5" fill={fill} />
          <path d="M22 16 L18 26 H26 L22 36" stroke={stroke} strokeWidth="2" fill="none" strokeLinejoin="round" />
        </svg>
      );
    case 'piping':
      return (
        <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
          <path d="M6 20 H18 V28 H30 V20 H42" stroke={stroke} strokeWidth="2" fill="none" strokeLinejoin="round" />
          <circle cx="24" cy="24" r="5" stroke={stroke} strokeWidth="1.5" fill={fill} />
          <line x1="24" y1="19" x2="24" y2="29" stroke={stroke} strokeWidth="1" />
          <line x1="19" y1="24" x2="29" y2="24" stroke={stroke} strokeWidth="1" />
        </svg>
      );
    default:
      return (
        <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
          <rect x="8" y="8" width="32" height="32" rx="6" stroke={stroke} strokeWidth="1.5" fill={fill} />
          <circle cx="24" cy="24" r="8" stroke={stroke} strokeWidth="1" fill="rgba(255,107,0,0.1)" />
        </svg>
      );
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function safe<T>(val: T | undefined | null, fallback: T): T {
  return val ?? fallback;
}

function getCategoryLabel(code: string): string {
  return CATEGORY_LABELS[code] || code.charAt(0).toUpperCase() + code.slice(1);
}

function getCategoryBadge(code: string): string {
  return CATEGORY_COLORS[code] || 'badge-blue';
}

function scoreColor(score: number): string {
  if (score >= 70) return 'text-green-400';
  if (score >= 40) return 'text-yellow-400';
  return 'text-red-400';
}

function scoreBar(score: number): { width: string; bg: string } {
  if (score >= 70) return { width: `${score}%`, bg: 'bg-green-500/30' };
  if (score >= 40) return { width: `${score}%`, bg: 'bg-yellow-500/30' };
  return { width: `${Math.max(score, 5)}%`, bg: 'bg-red-500/30' };
}

function getScore(card: EquipmentCard): number {
  return card.metadata?.validationScore ?? 0;
}

function getSource(card: EquipmentCard): string {
  return card.metadata?.source ?? 'unknown';
}

function getVersion(card: EquipmentCard): number {
  return card.metadata?.version ?? 1;
}

function getCreatedAt(card: EquipmentCard): string {
  return card.metadata?.createdAt ?? '';
}

function getUpdatedAt(card: EquipmentCard): string {
  return card.metadata?.updatedAt ?? '';
}

// ---------------------------------------------------------------------------
// Equipment 3D Image Placeholder
// ---------------------------------------------------------------------------

function Equipment3DPlaceholder({ componentClass, category }: { componentClass: string; category: string }) {
  return (
    <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-gradient-to-br from-white/[0.02] to-white/[0.05] border border-white/[0.06] flex items-center justify-center">
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'linear-gradient(rgba(255,107,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,0,0.1) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }} />
      {/* Icon */}
      <div className="relative z-10 flex flex-col items-center gap-2">
        <EquipmentIcon category={category} size={64} />
        <span className="text-[10px] text-gray-600 font-mono">{componentClass}</span>
        <span className="text-[9px] text-gray-700 italic">3D model — coming soon</span>
      </div>
      {/* Corner label */}
      <div className="absolute top-2 right-2 text-[9px] text-gray-600 font-mono bg-black/30 px-1.5 py-0.5 rounded">
        OXOT DEXTI
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Compact Equipment Card (Grid View)
// ---------------------------------------------------------------------------

function CompactCard({
  card,
  isExpanded,
  onToggle,
}: {
  card: EquipmentCard;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const score = getScore(card);
  const bar = scoreBar(score);

  return (
    <motion.div layout="position" className="glass-card overflow-hidden cursor-pointer group" onClick={onToggle}>
      {/* Score bar at top */}
      <div className="h-1 w-full bg-white/[0.03] relative">
        <div className={`h-full ${bar.bg} transition-all`} style={{ width: bar.width }} />
      </div>

      <div className="p-4">
        {/* Header row: icon + text */}
        <div className="flex items-start gap-3 mb-2">
          <div className="flex-shrink-0 mt-0.5">
            <EquipmentIcon category={card.category} size={32} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-mono text-sm font-semibold text-white truncate">{card.tag}</div>
            <div className="text-xs text-gray-400 truncate mt-0.5">{card.displayName}</div>
          </div>
          <span className={`${getCategoryBadge(card.category)} text-[10px] flex-shrink-0`}>
            {getCategoryLabel(card.category)}
          </span>
        </div>

        {/* Component class */}
        <div className="text-[11px] text-gray-500 truncate mb-2">{card.componentClass}</div>

        {/* Footer */}
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-gray-600 truncate max-w-[60%]">
            {card.sector} / {card.subSector}
          </span>
          <span className={`font-mono font-semibold ${scoreColor(score)}`}>{score}%</span>
        </div>

        {/* Expand indicator */}
        <div className="flex justify-center mt-2">
          <motion.span
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="text-gray-600 group-hover:text-gray-400 transition-colors text-xs"
          >
            ▼
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Detail Tabs: Overview | Specifications | Variations
// ---------------------------------------------------------------------------

type DetailTab = 'overview' | 'specs' | 'variations';

function DetailPanel({ card }: { card: EquipmentCard }) {
  const [tab, setTab] = useState<DetailTab>('overview');

  const specs = card.specifications || {};
  const oc = card.operatingConditions || {};
  const mat = card.materials || {};
  const standards = card.standards || [];
  const manufacturers = card.manufacturers || [];
  const nozzles = card.nozzles || [];
  const score = getScore(card);

  const tabs: { key: DetailTab; label: string }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'specs', label: 'Specifications' },
    { key: 'variations', label: 'Variations' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="col-span-full"
      onClick={e => e.stopPropagation()}
    >
      <div className="glass-card-accent p-0 mx-0 mb-2 overflow-hidden">
        {/* ─── Card Header ─── */}
        <div className="p-5 pb-0">
          <div className="flex flex-wrap items-start gap-4">
            {/* Icon + Identity */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <EquipmentIcon category={card.category} size={48} />
              <div className="min-w-0">
                <h3 className="text-lg font-semibold text-white font-heading truncate">
                  {card.tag} — {card.displayName}
                </h3>
                <div className="flex flex-wrap items-center gap-2 mt-1 text-xs">
                  <span className={getCategoryBadge(card.category)}>{getCategoryLabel(card.category)}</span>
                  <span className="text-gray-500">|</span>
                  <span className="text-gray-400">{card.componentClass}</span>
                  <span className="text-gray-500">|</span>
                  <span className="text-gray-400">{card.sector} → {card.subSector} → {card.facility}</span>
                  <span className="text-gray-500">|</span>
                  <span className={`font-mono ${scoreColor(score)}`}>Score: {score}%</span>
                  <span className="badge-purple text-[10px]">{getSource(card)}</span>
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-600 flex-shrink-0">
              v{getVersion(card)} · {getUpdatedAt(card) ? new Date(getUpdatedAt(card)).toLocaleDateString() : '—'}
            </div>
          </div>

          {/* ─── Tab Bar ─── */}
          <div className="flex gap-1 mt-4 border-b border-white/[0.06]">
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-4 py-2 text-xs font-medium transition-all relative ${tab === t.key
                    ? 'text-orange-400'
                    : 'text-gray-500 hover:text-gray-300'
                  }`}
              >
                {t.label}
                {tab === t.key && (
                  <motion.div
                    layoutId="detailTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
                  />
                )}
                {t.key === 'variations' && (
                  <span className="badge-orange text-[9px] ml-1.5">3</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ─── Tab Content ─── */}
        <div className="p-5">
          <AnimatePresence mode="wait">
            {/* ═══ OVERVIEW TAB ═══ */}
            {tab === 'overview' && (
              <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  {/* Left: 3D Image + 2D Icon */}
                  <div className="space-y-3">
                    <Equipment3DPlaceholder componentClass={card.componentClass} category={card.category} />
                    <div className="flex items-center gap-3 glass-card p-3">
                      <EquipmentIcon category={card.category} size={36} />
                      <div>
                        <div className="text-[10px] text-gray-500 uppercase font-heading">2D Symbol</div>
                        <div className="text-xs text-gray-400">{card.componentClass}</div>
                      </div>
                    </div>
                  </div>

                  {/* Center: Description + DEXTI Attributes */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-semibold text-gray-400 uppercase mb-2 font-heading">Description &amp; Usage Context</h4>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        {card.description || 'No description available. Run the pipeline to generate a detailed description for this equipment.'}
                      </p>
                    </div>

                    {/* DEXTI Attributes */}
                    <div>
                      <h4 className="text-xs font-semibold text-gray-400 uppercase mb-2 font-heading">DEXTI Attributes</h4>
                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between py-1 border-b border-white/[0.04]">
                          <span className="text-gray-500">Tag</span>
                          <span className="text-white font-mono">{card.tag}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/[0.04]">
                          <span className="text-gray-500">Component Class</span>
                          <span className="text-gray-200">{card.componentClass}</span>
                        </div>
                        {card.componentClassURI && (
                          <div className="flex justify-between py-1 border-b border-white/[0.04]">
                            <span className="text-gray-500">PCA URI</span>
                            <span className="text-gray-400 font-mono text-[10px] truncate ml-4 max-w-[200px]">{card.componentClassURI}</span>
                          </div>
                        )}
                        <div className="flex justify-between py-1 border-b border-white/[0.04]">
                          <span className="text-gray-500">Category</span>
                          <span className={getCategoryBadge(card.category) + ' text-[10px]'}>{getCategoryLabel(card.category)}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/[0.04]">
                          <span className="text-gray-500">Sector</span>
                          <span className="text-gray-200">{card.sector}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/[0.04]">
                          <span className="text-gray-500">Sub-Sector</span>
                          <span className="text-gray-200">{card.subSector}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/[0.04]">
                          <span className="text-gray-500">Facility</span>
                          <span className="text-gray-200">{card.facility}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/[0.04]">
                          <span className="text-gray-500">Validation Score</span>
                          <span className={`font-mono font-semibold ${scoreColor(score)}`}>{score}%</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-gray-500">Source</span>
                          <span className="badge-purple text-[10px]">{getSource(card)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Standards + Manufacturers */}
                    {(standards.length > 0 || manufacturers.length > 0) && (
                      <div className="flex flex-wrap gap-4">
                        {standards.length > 0 && (
                          <div>
                            <h4 className="text-[10px] text-gray-500 uppercase mb-1 font-heading">Standards</h4>
                            <div className="flex flex-wrap gap-1">
                              {standards.map(s => <span key={s} className="badge-blue text-[10px]">{s}</span>)}
                            </div>
                          </div>
                        )}
                        {manufacturers.length > 0 && (
                          <div>
                            <h4 className="text-[10px] text-gray-500 uppercase mb-1 font-heading">Manufacturers</h4>
                            <div className="flex flex-wrap gap-1">
                              {manufacturers.map(m => <span key={m} className="badge-purple text-[10px]">{m}</span>)}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Right: Upstream/Downstream Connections */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-semibold text-gray-400 uppercase mb-2 font-heading">
                        Connected Equipment
                        <span className="text-[9px] text-gray-600 normal-case italic ml-2">placeholder</span>
                      </h4>
                      <div className="space-y-2">
                        <div className="text-[10px] text-gray-500 uppercase font-heading mb-1">↑ Upstream</div>
                        {MOCK_CONNECTIONS.filter(c => c.direction === 'upstream').map(c => (
                          <div key={c.tag} className="glass-card p-3 text-xs">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-mono text-white font-semibold">{c.tag}</span>
                              <span className="text-gray-500">{c.componentClass}</span>
                            </div>
                            <div className="text-gray-400">{c.name}</div>
                            <div className="text-[10px] text-gray-600 mt-1">{c.connection}</div>
                          </div>
                        ))}

                        <div className="text-[10px] text-gray-500 uppercase font-heading mb-1 mt-3">↓ Downstream</div>
                        {MOCK_CONNECTIONS.filter(c => c.direction === 'downstream').map(c => (
                          <div key={c.tag} className="glass-card p-3 text-xs">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-mono text-white font-semibold">{c.tag}</span>
                              <span className="text-gray-500">{c.componentClass}</span>
                            </div>
                            <div className="text-gray-400">{c.name}</div>
                            <div className="text-[10px] text-gray-600 mt-1">{c.connection}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Nozzles */}
                    {nozzles.length > 0 && (
                      <div>
                        <h4 className="text-[10px] text-gray-500 uppercase mb-1 font-heading">Nozzles / Connections</h4>
                        <div className="space-y-1">
                          {nozzles.map(n => (
                            <div key={n.id} className="flex justify-between text-[10px] py-0.5 border-b border-white/[0.04]">
                              <span className="text-gray-400">{n.id}: {n.service}</span>
                              <span className="text-gray-300 font-mono">{n.size} {n.rating}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Created/Updated footer */}
                <div className="text-xs text-gray-600 pt-3 mt-4 border-t border-white/[0.04] flex gap-4">
                  {getCreatedAt(card) && <span>Created: {new Date(getCreatedAt(card)).toLocaleDateString()}</span>}
                  {getUpdatedAt(card) && <span>Updated: {new Date(getUpdatedAt(card)).toLocaleDateString()}</span>}
                  {card.metadata?.contentHash && <span className="font-mono">Hash: {card.metadata.contentHash.slice(0, 12)}…</span>}
                </div>
              </motion.div>
            )}

            {/* ═══ SPECIFICATIONS TAB ═══ */}
            {tab === 'specs' && (
              <motion.div key="specs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {/* Specifications */}
                  <div>
                    <h4 className="text-xs font-semibold text-gray-400 uppercase mb-3 font-heading">Specifications</h4>
                    {Object.keys(specs).length > 0 ? (
                      <div className="space-y-1">
                        {Object.entries(specs).map(([key, spec]) => (
                          <div key={key} className="flex justify-between text-xs py-1.5 border-b border-white/[0.04]">
                            <span className="text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <span className="text-gray-200 font-mono">
                              {spec?.value ?? '—'}{spec?.unit ? ` ${spec.unit}` : ''}
                              {spec?.source && <span className="text-gray-600 ml-1 text-[10px]">({spec.source})</span>}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-600 italic">No specifications recorded</p>
                    )}
                  </div>

                  {/* Operating Conditions */}
                  <div>
                    <h4 className="text-xs font-semibold text-gray-400 uppercase mb-3 font-heading">Operating Conditions</h4>
                    {Object.keys(oc).length > 0 ? (
                      <div className="space-y-1">
                        {Object.entries(oc)
                          .filter(([k]) => k !== 'units')
                          .map(([key, val]) => (
                            <div key={key} className="flex justify-between text-xs py-1.5 border-b border-white/[0.04]">
                              <span className="text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                              <span className="text-gray-200 font-mono">{val ?? '—'}</span>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-600 italic">No operating conditions recorded</p>
                    )}
                  </div>

                  {/* Materials */}
                  <div>
                    <h4 className="text-xs font-semibold text-gray-400 uppercase mb-3 font-heading">Materials of Construction</h4>
                    {Object.values(mat).some(Boolean) ? (
                      <div className="space-y-1">
                        {Object.entries(mat)
                          .filter(([, v]) => v)
                          .map(([key, val]) => (
                            <div key={key} className="flex justify-between text-xs py-1.5 border-b border-white/[0.04]">
                              <span className="text-gray-500 capitalize">{key}</span>
                              <span className="text-gray-200">{val}</span>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-600 italic">No materials recorded</p>
                    )}

                    {/* Nozzle Schedule */}
                    {nozzles.length > 0 && (
                      <div className="mt-5">
                        <h4 className="text-xs font-semibold text-gray-400 uppercase mb-3 font-heading">Nozzle Schedule</h4>
                        <div className="space-y-1">
                          {nozzles.map(n => (
                            <div key={n.id} className="flex justify-between text-xs py-1.5 border-b border-white/[0.04]">
                              <span className="text-gray-400">{n.id} — {n.service}</span>
                              <span className="text-gray-300 font-mono">{n.size} {n.rating} {n.facing}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ═══ VARIATIONS TAB ═══ */}
            {tab === 'variations' && (
              <motion.div key="variations" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                <div className="flex items-center gap-2 mb-4">
                  <h4 className="text-xs font-semibold text-gray-400 uppercase font-heading">Vendor Variations</h4>
                  <span className="text-[9px] text-gray-600 italic">placeholder data — will be generated by the variation pipeline</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {MOCK_VENDOR_VARIATIONS.map(v => (
                    <div key={v.vendor} className="glass-card p-0 overflow-hidden">
                      {/* Vendor accent bar */}
                      <div className="h-1" style={{ background: `linear-gradient(90deg, ${v.accentColor}, transparent)` }} />

                      <div className="p-4">
                        {/* Vendor header */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-semibold text-white font-heading">{v.vendor}</span>
                          <span className={`${v.badgeClass} text-[10px]`}>{v.model}</span>
                        </div>

                        <div className="text-xs text-gray-500 mb-3 font-mono">{v.partNumber}</div>

                        {/* Software Stack */}
                        <div className="mb-3">
                          <span className="text-[10px] text-gray-500 uppercase font-heading">Software Stack</span>
                          <p className="text-xs text-gray-400 mt-1 leading-relaxed">{v.software}</p>
                        </div>

                        {/* Specs table */}
                        <div className="mb-3">
                          <span className="text-[10px] text-gray-500 uppercase font-heading">Hardware Specifications</span>
                          <div className="space-y-0.5 mt-1">
                            {Object.entries(v.specs).map(([k, val]) => (
                              <div key={k} className="flex justify-between text-[10px] py-0.5">
                                <span className="text-gray-500">{k}</span>
                                <span className="text-gray-300 font-mono">{val}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Differentials */}
                        <div>
                          <span className="text-[10px] text-gray-500 uppercase font-heading">Differentials</span>
                          <ul className="mt-1 space-y-1">
                            {v.differentials.map((d, i) => (
                              <li key={i} className="text-[10px] text-gray-400 flex items-start gap-1.5">
                                <span className="mt-0.5" style={{ color: v.accentColor }}>•</span>
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// List View Row
// ---------------------------------------------------------------------------

function ListRow({
  card,
  isExpanded,
  onToggle,
}: {
  card: EquipmentCard;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const score = getScore(card);

  return (
    <>
      <tr
        onClick={onToggle}
        className="cursor-pointer hover:bg-white/[0.03] transition-colors border-b border-white/[0.04]"
      >
        <td className="py-2.5 px-3">
          <div className="flex items-center gap-2">
            <EquipmentIcon category={card.category} size={20} />
            <span className="font-mono text-sm text-white font-semibold">{card.tag}</span>
          </div>
        </td>
        <td className="py-2.5 px-3 text-sm text-gray-300 max-w-[200px] truncate">{card.displayName}</td>
        <td className="py-2.5 px-3 text-xs text-gray-400">{card.componentClass}</td>
        <td className="py-2.5 px-3">
          <span className={`${getCategoryBadge(card.category)} text-[10px]`}>{getCategoryLabel(card.category)}</span>
        </td>
        <td className="py-2.5 px-3 text-xs text-gray-500">{card.sector}</td>
        <td className="py-2.5 px-3 text-xs text-gray-500">{card.facility}</td>
        <td className="py-2.5 px-3">
          <span className={`font-mono text-xs font-semibold ${scoreColor(score)}`}>{score}%</span>
        </td>
        <td className="py-2.5 px-3 text-xs text-gray-600">{getSource(card)}</td>
        <td className="py-2.5 px-3">
          <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} className="text-gray-600 text-xs inline-block">▼</motion.span>
        </td>
      </tr>
      <AnimatePresence>
        {isExpanded && (
          <tr>
            <td colSpan={9} className="p-0">
              <DetailPanel card={card} />
            </td>
          </tr>
        )}
      </AnimatePresence>
    </>
  );
}

// ---------------------------------------------------------------------------
// Main Page Component
// ---------------------------------------------------------------------------

export default function EquipmentPage() {
  // Data state
  const [result, setResult] = useState<PaginatedResult>({
    items: [], total: 0, page: 1, pageSize: 10, totalPages: 0,
  });
  const [sectors, setSectors] = useState<SectorData[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter state
  const [search, setSearch] = useState('');
  const [sectorFilter, setSectorFilter] = useState('');
  const [subSectorFilter, setSubSectorFilter] = useState('');
  const [facilityFilter, setFacilityFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // View state
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Cascading dropdown data
  const selectedSector = useMemo(() => sectors.find(s => s.code === sectorFilter), [sectors, sectorFilter]);
  const subSectors = useMemo(() => selectedSector?.subSectors || [], [selectedSector]);
  const selectedSubSector = useMemo(() => subSectors.find(ss => ss.code === subSectorFilter), [subSectors, subSectorFilter]);
  const facilities = useMemo(() => selectedSubSector?.facilities || [], [selectedSubSector]);

  // Load sectors on mount
  useEffect(() => {
    fetch('/api/sectors')
      .then(r => r.json())
      .then(d => setSectors(d.data || []))
      .catch(() => { });
  }, []);

  // Reset cascading filters
  useEffect(() => { setSubSectorFilter(''); setFacilityFilter(''); }, [sectorFilter]);
  useEffect(() => { setFacilityFilter(''); }, [subSectorFilter]);

  // Fetch equipment
  const loadEquipment = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set('searchTerm', search);
    if (sectorFilter) params.set('sector', sectorFilter);
    if (subSectorFilter) params.set('subSector', subSectorFilter);
    if (facilityFilter) params.set('facility', facilityFilter);
    if (categoryFilter) params.set('category', categoryFilter);
    params.set('page', String(page));
    params.set('pageSize', String(pageSize));

    try {
      const res = await fetch(`/api/equipment?${params}`);
      const data = await res.json();
      if (data.success && data.data) {
        setResult(data.data);
      } else {
        setResult({ items: [], total: 0, page: 1, pageSize, totalPages: 0 });
      }
    } catch {
      setResult({ items: [], total: 0, page: 1, pageSize, totalPages: 0 });
    } finally {
      setLoading(false);
    }
  }, [search, sectorFilter, subSectorFilter, facilityFilter, categoryFilter, page, pageSize]);

  useEffect(() => { loadEquipment(); }, [loadEquipment]);
  useEffect(() => { setPage(1); }, [search, sectorFilter, subSectorFilter, facilityFilter, categoryFilter, pageSize]);

  const toggleExpand = (id: string) => setExpandedId(prev => (prev === id ? null : id));
  const activeFilters = [search, sectorFilter, subSectorFilter, facilityFilter, categoryFilter].filter(Boolean).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="section-bg min-h-screen"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ─── Header ─── */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white font-heading">Equipment Library</h1>
            <p className="text-gray-400 text-sm mt-1">
              {loading ? (
                <span className="animate-pulse">Loading equipment from Memgraph…</span>
              ) : (
                <>
                  <span className="text-white font-semibold">{result.total}</span> equipment cards
                  {activeFilters > 0 && (
                    <span className="text-orange-400 ml-2">({activeFilters} filter{activeFilters > 1 ? 's' : ''} active)</span>
                  )}
                </>
              )}
            </p>
          </div>

          {/* View toggle + page size */}
          <div className="flex items-center gap-3">
            <div className="flex rounded-lg overflow-hidden border border-white/[0.08]">
              <button
                onClick={() => setViewMode('card')}
                className={`px-3 py-1.5 text-xs font-medium transition-all ${viewMode === 'card' ? 'bg-orange-600/20 text-orange-400' : 'text-gray-500 hover:text-gray-300'} border-r border-white/[0.08]`}
              >
                ▦ Cards
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 text-xs font-medium transition-all ${viewMode === 'list' ? 'bg-orange-600/20 text-orange-400' : 'text-gray-500 hover:text-gray-300'}`}
              >
                ☰ List
              </button>
            </div>
            <select className="input text-xs !w-auto !py-1.5 !px-2" value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
              {PAGE_SIZES.map(s => <option key={s} value={s}>{s} per page</option>)}
            </select>
          </div>
        </div>

        {/* ─── Filter Bar ─── */}
        <div className="glass-card p-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            <div className="lg:col-span-2">
              <input className="input text-sm" placeholder="Search by tag, name, or class…" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <select className="input text-sm" value={sectorFilter} onChange={e => setSectorFilter(e.target.value)}>
              <option value="">All Sectors</option>
              {sectors.map(s => <option key={s.code} value={s.code}>{s.code} — {s.name}</option>)}
            </select>
            <select className="input text-sm" value={subSectorFilter} onChange={e => setSubSectorFilter(e.target.value)} disabled={!sectorFilter}>
              <option value="">{sectorFilter ? 'All Sub-Sectors' : '— Select Sector —'}</option>
              {subSectors.map(ss => <option key={ss.code} value={ss.code}>{ss.code} — {ss.name}</option>)}
            </select>
            <select className="input text-sm" value={facilityFilter} onChange={e => setFacilityFilter(e.target.value)} disabled={!subSectorFilter}>
              <option value="">{subSectorFilter ? 'All Facilities' : '— Select Sub-Sector —'}</option>
              {facilities.map(f => <option key={f.code} value={f.code}>{f.code} — {f.name}</option>)}
            </select>
            <select className="input text-sm" value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
              <option value="">All Categories</option>
              {Object.entries(CATEGORY_LABELS).map(([code, label]) => <option key={code} value={code}>{label}</option>)}
            </select>
          </div>

          {/* Active filter chips */}
          {activeFilters > 0 && (
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/[0.04]">
              <span className="text-[10px] text-gray-600 uppercase">Active:</span>
              {search && <span className="badge-orange text-[10px]">Search: &quot;{search}&quot;</span>}
              {sectorFilter && <span className="badge-blue text-[10px]">Sector: {sectorFilter}</span>}
              {subSectorFilter && <span className="badge-blue text-[10px]">Sub: {subSectorFilter}</span>}
              {facilityFilter && <span className="badge-green text-[10px]">Facility: {facilityFilter}</span>}
              {categoryFilter && <span className="badge-purple text-[10px]">{getCategoryLabel(categoryFilter)}</span>}
              <button
                onClick={() => { setSearch(''); setSectorFilter(''); setSubSectorFilter(''); setFacilityFilter(''); setCategoryFilter(''); }}
                className="text-[10px] text-gray-500 hover:text-red-400 transition-colors ml-auto"
              >
                Clear all ✕
              </button>
            </div>
          )}
        </div>

        {/* ─── Results ─── */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin mx-auto mb-3" />
              <p className="text-gray-500 text-sm">Querying Memgraph…</p>
            </div>
          </div>
        ) : result.items.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <div className="text-4xl mb-3 opacity-30">🔍</div>
            <h3 className="text-lg font-semibold text-gray-300 font-heading mb-1">No Equipment Found</h3>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              {activeFilters > 0
                ? 'Try adjusting your filters or clearing them to see all equipment.'
                : 'Use the Pipeline to generate equipment cards, or check that Memgraph is running.'}
            </p>
          </div>
        ) : viewMode === 'card' ? (
          /* ─── Card Grid ─── */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {result.items.map(card => (
              <div key={card.id} className="contents">
                <CompactCard card={card} isExpanded={expandedId === card.id} onToggle={() => toggleExpand(card.id)} />
                <AnimatePresence>
                  {expandedId === card.id && <DetailPanel card={card} />}
                </AnimatePresence>
              </div>
            ))}
          </div>
        ) : (
          /* ─── List View ─── */
          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/[0.08] text-xs text-gray-500 uppercase">
                    <th className="py-3 px-3 font-heading">Tag</th>
                    <th className="py-3 px-3 font-heading">Name</th>
                    <th className="py-3 px-3 font-heading">Class</th>
                    <th className="py-3 px-3 font-heading">Category</th>
                    <th className="py-3 px-3 font-heading">Sector</th>
                    <th className="py-3 px-3 font-heading">Facility</th>
                    <th className="py-3 px-3 font-heading">Score</th>
                    <th className="py-3 px-3 font-heading">Source</th>
                    <th className="py-3 px-3 w-8"></th>
                  </tr>
                </thead>
                <tbody>
                  {result.items.map(card => (
                    <ListRow key={card.id} card={card} isExpanded={expandedId === card.id} onToggle={() => toggleExpand(card.id)} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ─── Pagination ─── */}
        {result.totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <p className="text-xs text-gray-500">
              Showing {((page - 1) * pageSize) + 1}–{Math.min(page * pageSize, result.total)} of {result.total}
            </p>
            <div className="flex items-center gap-2">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1} className="btn-ghost text-xs !px-3 !py-1.5">← Prev</button>
              {Array.from({ length: Math.min(result.totalPages, 7) }, (_, i) => {
                let pageNum: number;
                if (result.totalPages <= 7) pageNum = i + 1;
                else if (page <= 4) pageNum = i + 1;
                else if (page >= result.totalPages - 3) pageNum = result.totalPages - 6 + i;
                else pageNum = page - 3 + i;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${page === pageNum ? 'bg-orange-600/20 text-orange-400 border border-orange-500/30' : 'text-gray-500 hover:text-white hover:bg-white/[0.05]'}`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button onClick={() => setPage(p => Math.min(result.totalPages, p + 1))} disabled={page >= result.totalPages} className="btn-ghost text-xs !px-3 !py-1.5">Next →</button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
