/**
 * Dynamic Sector Wiki Page.
 *
 * Renders a comprehensive wiki article for a single CISA sector, including:
 *  - Sector overview and SRMA info
 *  - Sub-sector navigation cards
 *  - Facility deep-dives with equipment tables
 *  - Equipment category distribution chart
 *
 * @module wiki/sectors/[code]/page
 */

import { SECTORS } from '@/lib/sectors';
import type { DexpiSector, DexpiSubSector, DexpiFacilityType, EquipmentCategory } from '@/lib/sectors/types';
import { notFound } from 'next/navigation';

/** Category colors for equipment badges. */
const CATEGORY_COLORS: Record<EquipmentCategory, string> = {
    static: '#06B6D4',
    rotating: '#8B5CF6',
    'heat-transfer': '#F59E0B',
    electrical: '#3B82F6',
    piping: '#10B981',
    instrumentation: '#EC4899',
};

/** Category icons. */
const CATEGORY_ICONS: Record<EquipmentCategory, string> = {
    static: '🏗️',
    rotating: '⚙️',
    'heat-transfer': '🔥',
    electrical: '⚡',
    piping: '🔧',
    instrumentation: '📊',
};

export function generateStaticParams() {
    return SECTORS.map((s) => ({ code: s.code }));
}

export function generateMetadata({ params }: { params: { code: string } }) {
    const sector = SECTORS.find((s) => s.code === params.code);
    if (!sector) return { title: 'Sector Not Found' };
    return {
        title: `${sector.name} — DEXPI Wiki`,
        description: sector.description,
    };
}

export default function SectorWikiPage({ params }: { params: { code: string } }) {
    const sector = SECTORS.find((s) => s.code === params.code);
    if (!sector) notFound();
    const sectorIndex = SECTORS.indexOf(sector) + 1;

    /** Aggregate equipment categories across the entire sector. */
    const categoryTotals: Record<EquipmentCategory, number> = {
        static: 0, rotating: 0, 'heat-transfer': 0, electrical: 0, piping: 0, instrumentation: 0,
    };
    sector.subSectors.forEach((sub) =>
        sub.facilities.forEach((fac) =>
            fac.equipment.forEach((eq) => {
                categoryTotals[eq.category]++;
            }),
        ),
    );
    const maxCategory = Math.max(...Object.values(categoryTotals), 1);

    const totalFacilities = sector.subSectors.reduce(
        (n, sub) => n + sub.facilities.length, 0,
    );
    const totalEquipment = sector.subSectors.reduce(
        (n, sub) => n + sub.facilities.reduce((m, fac) => m + fac.equipment.length, 0), 0,
    );

    return (
        <div className="max-w-5xl space-y-10">
            {/* Header */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div
                        className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-[#050507]"
                        style={{ background: sector.color }}
                    />
                    <span className="text-xs font-mono text-gray-500">
                        CISA Sector {String(sectorIndex).padStart(2, '0')} · {sector.code}
                    </span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">{sector.name}</h1>
                <p className="text-gray-400 text-base leading-relaxed max-w-3xl">{sector.description}</p>

                {/* Meta info */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1.5">
                        <span className="text-gray-600">SRMA:</span>
                        <span className="text-gray-300 font-medium">{sector.srma}</span>
                    </span>
                    <span className="w-px h-3 bg-white/[0.08]" />
                    <span>{sector.subSectors.length} sub-sectors</span>
                    <span className="w-px h-3 bg-white/[0.08]" />
                    <span>{totalFacilities} facility types</span>
                    <span className="w-px h-3 bg-white/[0.08]" />
                    <span>{totalEquipment} equipment types</span>
                </div>
            </div>

            {/* Equipment Category Distribution */}
            <section className="space-y-3 rounded-xl border border-white/[0.06] p-5" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <h2 className="text-sm font-heading font-semibold text-white">Equipment Category Distribution</h2>
                <div className="space-y-2">
                    {(Object.entries(categoryTotals) as [EquipmentCategory, number][])
                        .filter(([, count]) => count > 0)
                        .sort(([, a], [, b]) => b - a)
                        .map(([cat, count]) => (
                            <div key={cat} className="flex items-center gap-3">
                                <span className="text-base w-6 text-center">{CATEGORY_ICONS[cat]}</span>
                                <span className="text-xs text-gray-400 w-28 capitalize">{cat.replace('-', ' ')}</span>
                                <div className="flex-1 h-5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
                                    <div
                                        className="h-full rounded-full transition-all duration-500"
                                        style={{
                                            width: `${(count / maxCategory) * 100}%`,
                                            background: `${CATEGORY_COLORS[cat]}60`,
                                            borderRight: `2px solid ${CATEGORY_COLORS[cat]}`,
                                        }}
                                    />
                                </div>
                                <span className="text-xs font-mono text-gray-400 w-8 text-right">{count}</span>
                            </div>
                        ))}
                </div>
            </section>

            {/* Energy deep-dive backlinks (ENER sector only) */}
            {sector.code === 'ENER' && (
                <section className="space-y-3 rounded-xl border border-[#F59E0B]/20 p-5" style={{ background: 'rgba(245,158,11,0.04)' }}>
                    <h2 className="text-sm font-heading font-semibold text-white flex items-center gap-2">
                        <span className="text-[#F59E0B]">⚡</span> Energy Sector Deep Dives
                    </h2>
                    <p className="text-xs text-gray-500">
                        Comprehensive TOGAF reference architectures for each facility layer in the electricity value chain.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                        {[
                            { href: '/wiki/energy', label: 'Energy Sector Hub', color: '#F59E0B' },
                            { href: '/wiki/energy/transmission', label: 'Transmission (230–765 kV)', color: '#F59E0B' },
                            { href: '/wiki/energy/distribution', label: 'Distribution (4–34.5 kV)', color: '#3B82F6' },
                            { href: '/wiki/energy/distribution-points', label: 'Distribution Points', color: '#10B981' },
                            { href: '/wiki/energy/microgrids', label: 'Microgrids (1–20 MW)', color: '#8B5CF6' },
                            { href: '/wiki/energy/smart-homes', label: 'Smart Homes', color: '#06B6D4' },
                            { href: '/wiki/energy/bess', label: 'BESS (10–100 MW)', color: '#EF4444' },
                            { href: '/wiki/energy/vpp-derms', label: 'VPP / DERMS', color: '#EC4899' },
                        ].map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-xs px-3 py-2 rounded-lg border transition-colors hover:bg-white/[0.04]"
                                style={{ borderColor: `${link.color}30`, color: link.color }}
                            >
                                {link.label} →
                            </a>
                        ))}
                    </div>
                </section>
            )}

            {/* Sub-Sectors */}
            {sector.subSectors.map((subSector, subIdx) => (
                <SubSectorSection
                    key={subSector.code}
                    subSector={subSector}
                    sectorColor={sector.color}
                    subIndex={subIdx + 1}
                />
            ))}
        </div>
    );
}

/** Sub-sector heading + facility cards. */
function SubSectorSection({
    subSector,
    sectorColor,
    subIndex,
}: {
    subSector: DexpiSubSector;
    sectorColor: string;
    subIndex: number;
}) {
    return (
        <section className="space-y-6">
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-8 rounded-full" style={{ background: sectorColor }} />
                    <div>
                        <span className="text-[10px] text-gray-500 font-mono block">{subSector.code}</span>
                        <h2 className="text-xl font-heading font-semibold text-white">{subSector.name}</h2>
                    </div>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed ml-4">{subSector.description}</p>
            </div>

            {/* Facility cards */}
            <div className="space-y-4 ml-4">
                {subSector.facilities.map((facility) => (
                    <FacilityCard key={facility.code} facility={facility} sectorColor={sectorColor} />
                ))}
            </div>
        </section>
    );
}

/** Individual facility card with equipment table. */
function FacilityCard({
    facility,
    sectorColor,
}: {
    facility: DexpiFacilityType;
    sectorColor: string;
}) {
    return (
        <div className="rounded-xl border border-white/[0.06] overflow-hidden" style={{ background: 'rgba(255,255,255,0.015)' }}>
            {/* Facility header */}
            <div className="px-5 py-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] text-gray-500 font-mono">{facility.code}</span>
                </div>
                <h3 className="text-base font-semibold text-white">{facility.name}</h3>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">{facility.description}</p>
            </div>

            {/* Equipment table */}
            <div className="overflow-x-auto">
                <table className="w-full text-xs">
                    <thead>
                        <tr className="border-b border-white/[0.06] text-gray-500">
                            <th className="text-left px-5 py-2 font-medium">Equipment</th>
                            <th className="text-left px-3 py-2 font-medium">DEXPI Class</th>
                            <th className="text-left px-3 py-2 font-medium">Category</th>
                            <th className="text-right px-3 py-2 font-medium">Typical Qty</th>
                            <th className="text-right px-5 py-2 font-medium">Est. Total Units</th>
                        </tr>
                    </thead>
                    <tbody>
                        {facility.equipment.map((eq, i) => (
                            <tr
                                key={`${eq.componentClass}-${i}`}
                                className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
                            >
                                <td className="px-5 py-2.5 text-gray-300 font-medium">{eq.displayName}</td>
                                <td className="px-3 py-2.5">
                                    <code className="text-[10px] text-gray-500 bg-white/[0.04] px-1.5 py-0.5 rounded font-mono">
                                        {eq.componentClass}
                                    </code>
                                </td>
                                <td className="px-3 py-2.5">
                                    <span
                                        className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full capitalize"
                                        style={{
                                            background: `${CATEGORY_COLORS[eq.category]}15`,
                                            color: CATEGORY_COLORS[eq.category],
                                        }}
                                    >
                                        <span>{CATEGORY_ICONS[eq.category]}</span>
                                        {eq.category.replace('-', ' ')}
                                    </span>
                                </td>
                                <td className="px-3 py-2.5 text-right text-gray-500 font-mono">
                                    {eq.typicalQuantity.min}–{eq.typicalQuantity.max}
                                </td>
                                <td className="px-5 py-2.5 text-right text-emerald-500/80 font-mono font-medium">
                                    {Math.round(eq.typicalQuantity.min * 1.5 * 322 / 50)} {/* Approx scale factor */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer stats */}
            <div className="px-5 py-3 border-t border-white/[0.04] flex items-center gap-4 text-[10px] text-gray-500">
                <span>{facility.equipment.length} equipment types</span>
                <span>·</span>
                <span>
                    {facility.equipment.reduce((n, eq) => n + eq.typicalQuantity.min, 0)}–
                    {facility.equipment.reduce((n, eq) => n + eq.typicalQuantity.max, 0)} total units per facility
                </span>
            </div>
        </div>
    );
}
