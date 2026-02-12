/**
 * Neo4j JavaScript Driver Wiki Page.
 *
 * Documents neo4j-driver 5.x setup, integer handling, TypeScript types,
 * sessions, transactions, error handling, and circuit breaker patterns.
 *
 * @module wiki/neo4j/javascript-driver/page
 */

function CodeBlock({ title, code }: { title?: string; code: string }) {
    return (
        <div className="rounded-lg border border-white/[0.06] overflow-hidden" style={{ background: 'rgba(0,0,0,0.3)' }}>
            {title && (
                <div className="px-4 py-2 border-b border-white/[0.06]">
                    <span className="text-[10px] font-mono text-gray-500">{title}</span>
                </div>
            )}
            <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
                <code className="text-gray-300 font-mono text-[13px]">{code}</code>
            </pre>
        </div>
    );
}

export default function JavaScriptDriverPage() {
    return (
        <div className="max-w-4xl space-y-12">
            <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <a href="/wiki/neo4j" className="hover:text-[#018BFF] transition-colors">Neo4j</a>
                    <span>/</span>
                    <span className="text-gray-300">JavaScript Driver</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">📦 JavaScript Driver</h1>
                <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
                    Complete guide to <code className="text-[#018BFF]">neo4j-driver</code> v5.x for TypeScript/Next.js —
                    singleton setup, integer handling, sessions, transactions, error handling, and circuit breaker.
                </p>
            </div>

            {/* Installation */}
            <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-white">Installation & Setup</h2>
                <CodeBlock title="Install" code={`npm install neo4j-driver`} />
                <CodeBlock title="Singleton driver (Next.js)" code={`// src/lib/neo4j.ts
import neo4j, { Driver } from 'neo4j-driver';

declare global {
  var __neo4j_driver: Driver | undefined;
}

export function getDriver(): Driver {
  if (!globalThis.__neo4j_driver) {
    globalThis.__neo4j_driver = neo4j.driver(
      process.env.NEO4J_URI || 'neo4j://localhost:7687',
      neo4j.auth.basic(
        process.env.NEO4J_USER || 'neo4j',
        process.env.NEO4J_PASSWORD || 'password'
      ),
      {
        maxConnectionPoolSize: 50,
        connectionAcquisitionTimeout: 30000,
        maxTransactionRetryTime: 15000,
      }
    );
  }
  return globalThis.__neo4j_driver;
}`} />
                <div className="rounded-xl border border-white/[0.06] overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/[0.06]">
                                <th className="text-left px-4 py-3 text-gray-400 font-medium">URI Scheme</th>
                                <th className="text-left px-4 py-3 text-gray-400 font-medium">Use Case</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { scheme: 'neo4j://', use: 'Routing protocol (recommended for clusters)' },
                                { scheme: 'neo4j+s://', use: 'Routing + TLS (production)' },
                                { scheme: 'bolt://', use: 'Direct connection (single instance)' },
                                { scheme: 'bolt+s://', use: 'Direct + TLS' },
                            ].map((r, i) => (
                                <tr key={r.scheme} className={i < 3 ? 'border-b border-white/[0.04]' : ''}>
                                    <td className="px-4 py-2.5 text-[#018BFF] font-mono text-xs">{r.scheme}</td>
                                    <td className="px-4 py-2.5 text-gray-400">{r.use}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Integer Handling */}
            <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-white">Integer Handling (Critical)</h2>
                <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4 text-sm text-gray-300">
                    <strong className="text-red-400">🚨 Critical Bug Prevention:</strong> Neo4j uses 64-bit integers
                    internally. JavaScript numbers are 64-bit floats with only 53 bits of integer precision.
                    Always use <code className="text-[#018BFF]">neo4j.int()</code> for SKIP, LIMIT, and any
                    integer parameters.
                </div>
                <CodeBlock title="neo4j.int() — Required for SKIP/LIMIT" code={`import neo4j, { int, Integer } from 'neo4j-driver';

// ✅ CORRECT — wrapping with neo4j.int()
const params = {
  skip: int(Math.floor((page - 1) * pageSize)),
  limit: int(Math.floor(pageSize)),
  threshold: int(100),
};
await session.run(
  'MATCH (n) RETURN n SKIP $skip LIMIT $limit', params
);

// ❌ WRONG — plain JavaScript number
const bad = { skip: 0, limit: 50 };
// Error: "Limit must be an integer"`} />
                <CodeBlock title="Safe conversion from Neo4j Integer → JS number" code={`import neo4j, { Integer } from 'neo4j-driver';

function toNumber(val: Integer | number | bigint): number {
  if (neo4j.isInteger(val)) {
    return (val as Integer).toNumber();
  }
  return Number(val);
}

// Usage in result handling
const count = toNumber(record.get('count'));`} />
            </section>

            {/* Sessions & Transactions */}
            <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-white">Sessions & Transactions</h2>
                <CodeBlock title="Read vs Write sessions" code={`const driver = getDriver();

// READ transaction (routed to followers in cluster)
const session = driver.session({ defaultAccessMode: neo4j.session.READ });
const result = await session.executeRead(tx =>
  tx.run('MATCH (e:Equipment) WHERE e.category = $cat RETURN e', { cat: 'Pump' })
);
await session.close();

// WRITE transaction (routed to leader)
const writeSession = driver.session({ defaultAccessMode: neo4j.session.WRITE });
await writeSession.executeWrite(tx =>
  tx.run('CREATE (e:Equipment {tag: $tag, category: $cat})',
    { tag: 'PUMP_001', cat: 'Pump' })
);
await writeSession.close();`} />
                <CodeBlock title="Explicit transaction (multi-statement)" code={`const session = driver.session();
const tx = session.beginTransaction();
try {
  await tx.run('CREATE (a:Node {id: 1})');
  await tx.run('CREATE (b:Node {id: 2})');
  await tx.run('MATCH (a {id: 1}), (b {id: 2}) CREATE (a)-[:LINKED]->(b)');
  await tx.commit();
} catch (err) {
  await tx.rollback();
  throw err;
} finally {
  await session.close();
}`} />
            </section>

            {/* Result Handling */}
            <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-white">Result Handling</h2>
                <CodeBlock title="Processing query results" code={`const result = await session.executeRead(tx =>
  tx.run('MATCH (e:Equipment) RETURN e LIMIT 10')
);

// Iterate records
const items = result.records.map(record => {
  const node = record.get('e');
  return {
    id: node.identity.toString(),
    labels: node.labels,
    tag: node.properties.tag,
    category: node.properties.category,
    specs: node.properties.specifications,
  };
});

// Summary info
const summary = result.summary;
console.log('Query type:', summary.queryType);
console.log('Nodes created:', summary.counters.updates().nodesCreated);`} />
            </section>

            {/* Error Handling */}
            <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-white">Error Handling & Retry</h2>
                <CodeBlock title="Retry with exponential backoff" code={`import { Neo4jError } from 'neo4j-driver';

async function runWithRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 1000
): Promise<T> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (error instanceof Neo4jError) {
        // Transient errors are retryable
        if (error.code?.includes('TransientError') && attempt < maxRetries) {
          const delay = baseDelay * Math.pow(2, attempt);
          console.warn(\`Retry \${attempt + 1}/\${maxRetries} in \${delay}ms\`);
          await new Promise(r => setTimeout(r, delay));
          continue;
        }
      }
      throw error;
    }
  }
  throw new Error('Max retries exceeded');
}`} />
            </section>

            {/* TypeScript Types */}
            <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-white">TypeScript Types</h2>
                <CodeBlock title="Key driver types" code={`import {
  Driver,
  Session,
  Transaction,
  ManagedTransaction,
  Result,
  Record,
  Node,
  Relationship,
  Path,
  Integer,
  int,
} from 'neo4j-driver';

// Type-safe query helper
async function query<T>(
  cypher: string,
  params: Record<string, unknown>,
  mapper: (record: Record) => T
): Promise<T[]> {
  const session = getDriver().session();
  try {
    const result = await session.executeRead(tx => tx.run(cypher, params));
    return result.records.map(mapper);
  } finally {
    await session.close();
  }
}`} />
            </section>

            {/* Circuit Breaker */}
            <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-white">Circuit Breaker Pattern</h2>
                <CodeBlock title="Production-grade circuit breaker" code={`class Neo4jCircuitBreaker {
  private failures = 0;
  private lastFailure = 0;
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';

  constructor(
    private threshold = 5,
    private resetTimeout = 30000
  ) {}

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailure > this.resetTimeout) {
        this.state = 'HALF_OPEN';
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }
    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess() {
    this.failures = 0;
    this.state = 'CLOSED';
  }

  private onFailure() {
    this.failures++;
    this.lastFailure = Date.now();
    if (this.failures >= this.threshold) {
      this.state = 'OPEN';
    }
  }
}`} />
            </section>

            {/* References */}
            <section className="space-y-3">
                <h2 className="text-xl font-heading font-semibold text-white">References</h2>
                <div className="space-y-2 text-xs text-gray-500">
                    <p>Neo4j, Inc. (2026). <em>JavaScript Driver Manual</em>. <a href="https://neo4j.com/docs/javascript-manual/current/" className="text-[#018BFF] hover:underline" target="_blank" rel="noopener noreferrer">neo4j.com/docs/javascript-manual</a></p>
                    <p>Neo4j. (2026). <em>neo4j-javascript-driver</em>. GitHub. <a href="https://github.com/neo4j/neo4j-javascript-driver" className="text-[#018BFF] hover:underline" target="_blank" rel="noopener noreferrer">github.com/neo4j/neo4j-javascript-driver</a></p>
                </div>
            </section>

            <section className="border-t border-white/[0.06] pt-6 space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">Backlinks</h3>
                <div className="flex flex-wrap gap-2">
                    {[
                        { href: '/wiki/neo4j', label: 'Neo4j Overview' },
                        { href: '/wiki/neo4j/migration-guide', label: 'Migration Guide' },
                        { href: '/wiki/neo4j/api-integration', label: 'API Integration' },
                    ].map((link) => (
                        <a key={link.href} href={link.href} className="text-xs px-2.5 py-1 rounded-md border border-white/[0.06] text-gray-400 hover:text-[#018BFF] hover:border-[#018BFF]/20 transition-colors">
                            ← {link.label}
                        </a>
                    ))}
                </div>
            </section>
        </div>
    );
}
