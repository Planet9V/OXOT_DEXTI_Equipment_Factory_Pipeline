/**
 * Wiki Layout.
 *
 * Provides a shared layout for all wiki pages, including a sidebar TOC,
 * breadcrumb navigation, and backlinks panel. Uses the existing dark
 * glassmorphism design system.
 *
 * @module wiki/layout
 */

'use client';

import { usePathname } from 'next/navigation';
import { SECTORS } from '@/lib/sectors';
import ExportToObsidian from '@/components/wiki/ExportToObsidian';

/** Sidebar navigation sections for the wiki. */
const WIKI_NAV_BASE = [
    {
        title: 'Overview',
        links: [
            { href: '/wiki', label: 'Wiki Home' },
            { href: '/wiki/dexpi', label: 'DEXPI 2.0 Standard' },
        ],
    },
    {
        title: 'DEXPI 2.0 Topics',
        links: [
            { href: '/wiki/dexpi', label: 'DEXPI 2.0 Overview' },
            { href: '/wiki/dexpi/data-model', label: 'Data Model' },
            { href: '/wiki/dexpi/equipment-classes', label: 'Equipment Classes' },
            { href: '/wiki/dexpi/xml-schema', label: 'DEXPI XML Schema' },
            { href: '/wiki/dexpi/standards', label: 'Related Standards' },
        ],
    },
    {
        title: 'AI Pipeline',
        links: [
            { href: '/wiki/pipeline', label: 'Pipeline V2 Overview' },
        ],
    },
    {
        title: 'Neo4j Graph Database',
        links: [
            { href: '/wiki/neo4j', label: 'Neo4j Overview' },
            { href: '/wiki/neo4j/docker-setup', label: 'Docker Setup' },
            { href: '/wiki/neo4j/cypher-guide', label: 'Cypher Query Language' },
            { href: '/wiki/neo4j/data-model', label: 'Data Model & Schema' },
            { href: '/wiki/neo4j/migration-guide', label: 'Migration from Memgraph' },
            { href: '/wiki/neo4j/javascript-driver', label: 'JavaScript Driver' },
            { href: '/wiki/neo4j/api-integration', label: 'API Integration' },
            { href: '/wiki/neo4j/example-queries', label: 'Example Queries' },
        ],
    },
    {
        title: 'Energy Sector Deep Dives',
        links: [
            { href: '/wiki/energy', label: 'Energy Sector Hub' },
            { href: '/wiki/energy/transmission', label: 'Transmission (230–765 kV)' },
            { href: '/wiki/energy/distribution', label: 'Distribution (4–34.5 kV)' },
            { href: '/wiki/energy/distribution-points', label: 'Distribution Points' },
            { href: '/wiki/energy/microgrids', label: 'Microgrids (1–20 MW)' },
            { href: '/wiki/energy/smart-homes', label: 'Smart Homes' },
            { href: '/wiki/energy/bess', label: 'BESS (10–100 MW)' },
            { href: '/wiki/energy/vpp-derms', label: 'VPP / DERMS' },
        ],
    },
];

export default function WikiLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    /** Build full navigation including dynamic sectors. */
    const wikiNav = [
        ...WIKI_NAV_BASE,
        {
            title: 'Critical Infrastructure Sectors',
            links: SECTORS.map((s, i) => ({
                href: `/wiki/sectors/${s.code}`,
                label: `${String(i + 1).padStart(2, '0')} — ${s.name}`,
            })),
        },
    ];

    /** Generate breadcrumb from path. */
    const breadcrumbs = pathname
        .split('/')
        .filter(Boolean)
        .map((seg, i, arr) => ({
            label: seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, ' '),
            href: '/' + arr.slice(0, i + 1).join('/'),
            active: i === arr.length - 1,
        }));

    return (
        <div className="max-w-[1600px] mx-auto flex gap-0 min-h-[calc(100vh-8rem)]">
            {/* Sidebar */}
            <aside className="w-64 flex-shrink-0 border-r border-white/[0.06] overflow-y-auto sticky top-16 h-[calc(100vh-4rem)] hidden lg:block">
                <div className="p-4 space-y-6">
                    <div className="flex items-center gap-2 px-2 mb-4">
                        <div
                            className="w-6 h-6 rounded flex items-center justify-center text-[9px] font-bold text-white"
                            style={{ background: 'linear-gradient(135deg, #FF6B00, #ea580c)' }}
                        >
                            W
                        </div>
                        <span className="text-sm font-heading font-semibold text-white">Wiki</span>
                    </div>

                    {wikiNav.map((section) => (
                        <div key={section.title}>
                            <h3 className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 px-2 mb-2">
                                {section.title}
                            </h3>
                            <ul className="space-y-0.5">
                                {section.links.map((link) => {
                                    const isActive = pathname === link.href;
                                    return (
                                        <li key={link.href}>
                                            <a
                                                href={link.href}
                                                className={`block px-2 py-1.5 rounded-md text-sm transition-colors duration-150 ${isActive
                                                    ? 'bg-[#FF6B00]/10 text-[#FF6B00] font-medium'
                                                    : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                                                    }`}
                                            >
                                                {link.label}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </div>
            </aside>

            {/* Main wiki content area */}
            <div className="flex-1 min-w-0">
                {/* Breadcrumbs */}
                <div className="border-b border-white/[0.06] px-6 py-3 flex items-center justify-between">
                    <nav className="flex items-center gap-1.5 text-sm">
                        {breadcrumbs.map((crumb, i) => (
                            <span key={crumb.href} className="flex items-center gap-1.5">
                                {i > 0 && <span className="text-gray-600">/</span>}
                                {crumb.active ? (
                                    <span className="text-gray-300">{crumb.label}</span>
                                ) : (
                                    <a href={crumb.href} className="text-gray-500 hover:text-[#FF6B00] transition-colors">
                                        {crumb.label}
                                    </a>
                                )}
                            </span>
                        ))}
                    </nav>
                    <ExportToObsidian />
                </div>

                {/* Page content */}
                <div className="p-6 lg:p-8">{children}</div>
            </div>
        </div>
    );
}
