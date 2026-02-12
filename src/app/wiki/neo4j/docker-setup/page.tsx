/**
 * Neo4j Docker Setup Wiki Page.
 *
 * Complete guide to running Neo4j 5.x via Docker for local development and
 * production, including docker-compose configuration, APOC/GDS plugins,
 * backup/restore, security, and Aura comparison.
 *
 * @module wiki/neo4j/docker-setup/page
 */

/** Code block component for consistent styling. */
function CodeBlock({ title, language, code }: { title?: string; language: string; code: string }) {
    return (
        <div className="rounded-lg border border-white/[0.06] overflow-hidden" style={{ background: 'rgba(0,0,0,0.3)' }}>
            {title && (
                <div className="px-4 py-2 border-b border-white/[0.06] flex items-center justify-between">
                    <span className="text-[10px] font-mono text-gray-500">{title}</span>
                    <span className="text-[9px] font-mono text-gray-600 uppercase">{language}</span>
                </div>
            )}
            <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
                <code className="text-gray-300 font-mono text-[13px]">{code}</code>
            </pre>
        </div>
    );
}

/** Section wrapper with anchor. */
function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
    return (
        <section id={id} className="space-y-4 scroll-mt-20">
            <h2 className="text-xl font-heading font-semibold text-white">{title}</h2>
            {children}
        </section>
    );
}

/** Dev vs Production config comparison. */
const CONFIG_COMPARISON = [
    { setting: 'Heap Initial', dev: '512m', prod: '2G–8G (50–75% of RAM)' },
    { setting: 'Heap Max', dev: '1G', prod: '8G+' },
    { setting: 'Page Cache', dev: '512m', prod: '4G+ (match data size)' },
    { setting: 'Auth', dev: 'neo4j/devpassword or none', prod: 'Strong password + TLS' },
    { setting: 'APOC/GDS', dev: 'Unrestricted', prod: 'Restrict to admin roles' },
    { setting: 'CSV Import', dev: 'Allowed from file URLs', prod: 'Disabled' },
    { setting: 'Restart Policy', dev: 'unless-stopped', prod: 'always + healthcheck' },
    { setting: 'Memory Limit', dev: '2G', prod: '16G+' },
];

/** Aura vs Self-Hosted comparison. */
const AURA_COMPARISON = [
    { feature: 'Setup', aura: 'Console signup, instant DB', selfHosted: 'docker compose up (full control)' },
    { feature: 'Scaling', aura: 'Auto-scale, HA included', selfHosted: 'Manual clustering (Enterprise)' },
    { feature: 'Plugins', aura: 'APOC/GDS pre-installed', selfHosted: 'Via NEO4J_PLUGINS env var' },
    { feature: 'Cost', aura: '$0 (hobby) to $100+/mo', selfHosted: 'Free (Community Edition)' },
    { feature: 'Backup', aura: 'Automated, 30-day retention', selfHosted: 'Manual neo4j-admin dump' },
    { feature: 'Security', aura: 'TLS enforced, RBAC, VPC', selfHosted: 'Configurable TLS/auth' },
    { feature: 'Best For', aura: 'Quick prototyping, managed prod', selfHosted: 'Local dev, custom infra' },
];

export default function DockerSetupPage() {
    return (
        <div className="max-w-4xl space-y-12">
            {/* Hero */}
            <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <a href="/wiki/neo4j" className="hover:text-[#018BFF] transition-colors">Neo4j</a>
                    <span>/</span>
                    <span className="text-gray-300">Docker Setup</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">
                    🐳 Docker Setup
                </h1>
                <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
                    Run Neo4j 5.x locally via Docker with APOC and Graph Data Science plugins,
                    persistent volumes, health checks, and production-ready configuration.
                </p>
            </div>

            {/* Table of Contents */}
            <div className="rounded-xl border border-white/[0.06] p-5" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <h3 className="text-sm font-semibold text-gray-400 mb-3">On This Page</h3>
                <ul className="space-y-1.5 text-sm">
                    {[
                        { id: 'docker-compose', label: 'Docker Compose Configuration' },
                        { id: 'plugins', label: 'APOC & GDS Plugins' },
                        { id: 'backup', label: 'Backup & Restore' },
                        { id: 'security', label: 'Security Setup' },
                        { id: 'config', label: 'Dev vs Production Config' },
                        { id: 'aura', label: 'Aura vs Self-Hosted' },
                    ].map((item) => (
                        <li key={item.id}>
                            <a href={'#' + item.id} className="text-gray-500 hover:text-[#018BFF] transition-colors">
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Docker Compose */}
            <Section id="docker-compose" title="Docker Compose Configuration">
                <p className="text-sm text-gray-400 leading-relaxed">
                    The official <code className="text-[#018BFF]">neo4j:5</code> image from Docker Hub includes the
                    Neo4j 5.x database engine, HTTP browser on port <strong className="text-white">7474</strong>,
                    and Bolt protocol on port <strong className="text-white">7687</strong>.
                </p>
                <CodeBlock
                    title="docker-compose.yml"
                    language="yaml"
                    code={`version: "3.8"
services:
  neo4j:
    image: neo4j:5
    container_name: neo4j-dev
    restart: unless-stopped
    ports:
      - "7474:7474"  # HTTP Browser
      - "7687:7687"  # Bolt Protocol
    environment:
      # Authentication (min 8 chars)
      NEO4J_AUTH: neo4j/s3cureP@ssw0rd123
      # Plugins: APOC + Graph Data Science
      NEO4J_PLUGINS: '["apoc","graph-data-science"]'
      # Memory configuration
      NEO4J_dbms_memory_heap_initial__size: 512m
      NEO4J_dbms_memory_heap_max__size: 1G
      NEO4J_dbms_memory_pagecache_size: 512m
      # Allow APOC/GDS procedures
      NEO4J_dbms_security_procedures_unrestricted: apoc.*,gds.*
      # Dev: allow file imports
      NEO4J_dbms_security_allow__csv_import__from__file__urls: "true"
    volumes:
      - neo4j_data:/data
      - neo4j_logs:/logs
      - neo4j_import:/import
      - neo4j_plugins:/plugins
    healthcheck:
      test: ["CMD", "neo4j", "status"]
      interval: 15s
      timeout: 10s
      retries: 5
    deploy:
      resources:
        limits:
          memory: 2G

volumes:
  neo4j_data:
  neo4j_logs:
  neo4j_import:
  neo4j_plugins:`}
                />
                <div className="rounded-lg border border-[#018BFF]/20 bg-[#018BFF]/5 p-4 text-sm text-gray-300">
                    <strong className="text-[#018BFF]">Quick Start:</strong>{' '}
                    <code className="text-gray-300">docker compose up -d</code> then open{' '}
                    <code className="text-[#018BFF]">http://localhost:7474</code> and log in with{' '}
                    <code className="text-gray-300">neo4j / s3cureP@ssw0rd123</code>.
                </div>
            </Section>

            {/* Plugins */}
            <Section id="plugins" title="APOC & GDS Plugins">
                <p className="text-sm text-gray-400 leading-relaxed">
                    Set <code className="text-[#018BFF]">NEO4J_PLUGINS</code> to auto-download plugins on first
                    startup. Add <code className="text-[#018BFF]">NEO4J_dbms_security_procedures_unrestricted</code>{' '}
                    to allow execution.
                </p>
                <CodeBlock
                    title="Verify plugins"
                    language="cypher"
                    code={`// Verify APOC is installed
CALL apoc.help("apoc");

// Verify GDS is installed
CALL gds.version();

// List all available procedures
SHOW PROCEDURES YIELD name
WHERE name STARTS WITH 'apoc' OR name STARTS WITH 'gds'
RETURN name ORDER BY name;`}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="rounded-lg border border-white/[0.06] p-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
                        <h4 className="text-sm font-semibold text-white mb-2">APOC (450+ procedures)</h4>
                        <ul className="text-xs text-gray-500 space-y-1">
                            <li>• Data import/export (CSV, JSON, GraphML)</li>
                            <li>• Schema management & refactoring</li>
                            <li>• Text similarity & string operations</li>
                            <li>• Batch processing (periodic.iterate)</li>
                            <li>• Meta-schema analysis</li>
                        </ul>
                    </div>
                    <div className="rounded-lg border border-white/[0.06] p-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
                        <h4 className="text-sm font-semibold text-white mb-2">GDS (Graph Data Science)</h4>
                        <ul className="text-xs text-gray-500 space-y-1">
                            <li>• PageRank, Betweenness Centrality</li>
                            <li>• Community detection (Louvain, LPA)</li>
                            <li>• Node similarity & link prediction</li>
                            <li>• Shortest paths, Dijkstra, A*</li>
                            <li>• Graph embeddings (node2vec)</li>
                        </ul>
                    </div>
                </div>
            </Section>

            {/* Backup & Restore */}
            <Section id="backup" title="Backup & Restore">
                <p className="text-sm text-gray-400 leading-relaxed">
                    Use <code className="text-[#018BFF]">neo4j-admin</code> inside the container. Stop the database
                    first for Community Edition.
                </p>
                <CodeBlock
                    title="Dump database"
                    language="bash"
                    code={`# Create a dump of the 'neo4j' database
docker exec neo4j neo4j-admin database dump neo4j \\
  --to-path=/data/backups/

# Copy dump to host
docker cp neo4j:/data/backups/ ./backups/`}
                />
                <CodeBlock
                    title="Restore from dump"
                    language="bash"
                    code={`# Copy dump into container
docker cp ./backups/neo4j.dump neo4j:/data/backups/

# Stop database, load dump, restart
docker exec neo4j neo4j stop
docker exec neo4j neo4j-admin database load neo4j \\
  --from-path=/data/backups/ \\
  --overwrite-destination=true
docker restart neo4j`}
                />
            </Section>

            {/* Security */}
            <Section id="security" title="Security Setup">
                <CodeBlock
                    title="User & role management (Cypher)"
                    language="cypher"
                    code={`// Create a new user
CREATE USER alice SET PASSWORD 'securepass123' CHANGE NOT REQUIRED;

// Assign roles
GRANT ROLE reader TO alice;
GRANT ROLE publisher TO alice;

// List all users and roles
SHOW USERS;
SHOW ROLES;

// Disable auth for development only
// Set NEO4J_AUTH=none in docker-compose.yml`}
                />
                <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-4 text-sm text-gray-300">
                    <strong className="text-yellow-400">⚠ Warning:</strong> Never use{' '}
                    <code>NEO4J_AUTH=none</code> in production. Always set a strong password with 8+
                    characters and enable TLS for Bolt connections.
                </div>
            </Section>

            {/* Dev vs Prod Config */}
            <Section id="config" title="Development vs Production Configuration">
                <div className="rounded-xl border border-white/[0.06] overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/[0.06]">
                                <th className="text-left px-4 py-3 text-gray-400 font-medium">Setting</th>
                                <th className="text-left px-4 py-3 text-gray-400 font-medium">Development</th>
                                <th className="text-left px-4 py-3 text-[#018BFF] font-medium">Production</th>
                            </tr>
                        </thead>
                        <tbody>
                            {CONFIG_COMPARISON.map((row, i) => (
                                <tr key={row.setting} className={i < CONFIG_COMPARISON.length - 1 ? 'border-b border-white/[0.04]' : ''}>
                                    <td className="px-4 py-2.5 text-white font-medium">{row.setting}</td>
                                    <td className="px-4 py-2.5 text-gray-500 font-mono text-xs">{row.dev}</td>
                                    <td className="px-4 py-2.5 text-gray-300 font-mono text-xs">{row.prod}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* Aura vs Self-Hosted */}
            <Section id="aura" title="Neo4j Aura vs Self-Hosted">
                <div className="rounded-xl border border-white/[0.06] overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/[0.06]">
                                <th className="text-left px-4 py-3 text-gray-400 font-medium">Feature</th>
                                <th className="text-left px-4 py-3 text-gray-400 font-medium">Aura (Cloud)</th>
                                <th className="text-left px-4 py-3 text-[#018BFF] font-medium">Self-Hosted Docker</th>
                            </tr>
                        </thead>
                        <tbody>
                            {AURA_COMPARISON.map((row, i) => (
                                <tr key={row.feature} className={i < AURA_COMPARISON.length - 1 ? 'border-b border-white/[0.04]' : ''}>
                                    <td className="px-4 py-2.5 text-white font-medium">{row.feature}</td>
                                    <td className="px-4 py-2.5 text-gray-500">{row.aura}</td>
                                    <td className="px-4 py-2.5 text-gray-300">{row.selfHosted}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Section>

            {/* References */}
            <section className="space-y-3">
                <h2 className="text-xl font-heading font-semibold text-white">References</h2>
                <div className="space-y-2 text-xs text-gray-500">
                    <p>
                        Docker, Inc. (2026). <em>Official Neo4j Docker Image</em>. Docker Hub. Retrieved February 12, 2026, from{' '}
                        <a href="https://hub.docker.com/_/neo4j" className="text-[#018BFF] hover:underline" target="_blank" rel="noopener noreferrer">
                            https://hub.docker.com/_/neo4j
                        </a>
                    </p>
                    <p>
                        OneUptime. (2026, February 8). <em>How to Run Neo4j in Docker for Graph Databases</em>. Retrieved February 12, 2026, from{' '}
                        <a href="https://oneuptime.com/blog/post/2026-02-08-how-to-run-neo4j-in-docker-for-graph-databases/view" className="text-[#018BFF] hover:underline" target="_blank" rel="noopener noreferrer">
                            https://oneuptime.com/blog/post/2026-02-08-how-to-run-neo4j-in-docker-for-graph-databases/view
                        </a>
                    </p>
                    <p>
                        Neo4j, Inc. (2026). <em>Neo4j Operations Manual — Docker</em>. Retrieved February 12, 2026, from{' '}
                        <a href="https://neo4j.com/docs/operations-manual/current/docker/" className="text-[#018BFF] hover:underline" target="_blank" rel="noopener noreferrer">
                            https://neo4j.com/docs/operations-manual/current/docker/
                        </a>
                    </p>
                </div>
            </section>

            {/* Backlinks */}
            <section className="border-t border-white/[0.06] pt-6 space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">Backlinks</h3>
                <div className="flex flex-wrap gap-2">
                    {[
                        { href: '/wiki/neo4j', label: 'Neo4j Overview' },
                        { href: '/wiki/neo4j/migration-guide', label: 'Migration Guide' },
                        { href: '/wiki/neo4j/javascript-driver', label: 'JavaScript Driver' },
                    ].map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-xs px-2.5 py-1 rounded-md border border-white/[0.06] text-gray-400 hover:text-[#018BFF] hover:border-[#018BFF]/20 transition-colors"
                        >
                            ← {link.label}
                        </a>
                    ))}
                </div>
            </section>
        </div>
    );
}
