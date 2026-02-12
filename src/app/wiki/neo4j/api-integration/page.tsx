/**
 * Neo4j API Integration Wiki Page.
 *
 * Documents Next.js API route patterns for Neo4j CRUD, singleton pattern,
 * query builders, GraphQL, auth, testing, and production deployment.
 *
 * @module wiki/neo4j/api-integration/page
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

export default function ApiIntegrationPage() {
    return (
        <div className="max-w-4xl space-y-12">
            <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <a href="/wiki/neo4j" className="hover:text-[#018BFF] transition-colors">Neo4j</a>
                    <span>/</span>
                    <span className="text-gray-300">API Integration</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">🔌 API Integration</h1>
                <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
                    Patterns for integrating Neo4j with Next.js API routes — CRUD operations, singleton driver,
                    dynamic query builders, GraphQL, auth, testing, and production deployment.
                </p>
            </div>

            {/* CRUD Routes */}
            <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-white">CRUD API Route Patterns</h2>
                <CodeBlock title="GET — Read with pagination" code={`// src/app/api/equipment/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getDriver } from '@/lib/neo4j';
import { int } from 'neo4j-driver';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '50');
  const category = searchParams.get('category');

  const driver = getDriver();
  const session = driver.session();
  try {
    const result = await session.executeRead(tx =>
      tx.run(\`
        MATCH (e:Equipment)
        WHERE $category IS NULL OR e.category = $category
        RETURN e
        ORDER BY e.displayName
        SKIP $skip LIMIT $limit
      \`, {
        category,
        skip: int((page - 1) * limit),
        limit: int(limit),
      })
    );

    const items = result.records.map(r => r.get('e').properties);
    return NextResponse.json({ items, page, limit });
  } finally {
    await session.close();
  }
}`} />
                <CodeBlock title="POST — Create" code={`export async function POST(request: NextRequest) {
  const body = await request.json();
  const { tag, displayName, category, facilityCode } = body;

  const driver = getDriver();
  const session = driver.session();
  try {
    const result = await session.executeWrite(tx =>
      tx.run(\`
        MATCH (f:Facility {code: $facilityCode})
        CREATE (e:Equipment {
          tag: $tag,
          displayName: $displayName,
          category: $category,
          created_at: datetime()
        })
        MERGE (f)-[:CONTAINS_EQUIPMENT]->(e)
        RETURN e
      \`, { tag, displayName, category, facilityCode })
    );

    const created = result.records[0]?.get('e').properties;
    return NextResponse.json(created, { status: 201 });
  } finally {
    await session.close();
  }
}`} />
                <CodeBlock title="PATCH — Update" code={`// src/app/api/equipment/[tag]/route.ts
export async function PATCH(
  request: NextRequest,
  { params }: { params: { tag: string } }
) {
  const updates = await request.json();
  const driver = getDriver();
  const session = driver.session();
  try {
    const result = await session.executeWrite(tx =>
      tx.run(\`
        MATCH (e:Equipment {tag: $tag})
        SET e += $updates, e.updated_at = datetime()
        RETURN e
      \`, { tag: params.tag, updates })
    );
    const updated = result.records[0]?.get('e').properties;
    if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(updated);
  } finally {
    await session.close();
  }
}`} />
                <CodeBlock title="DELETE — Remove with cascade" code={`export async function DELETE(
  request: NextRequest,
  { params }: { params: { tag: string } }
) {
  const driver = getDriver();
  const session = driver.session();
  try {
    await session.executeWrite(tx =>
      tx.run('MATCH (e:Equipment {tag: $tag}) DETACH DELETE e', { tag: params.tag })
    );
    return NextResponse.json({ deleted: true });
  } finally {
    await session.close();
  }
}`} />
            </section>

            {/* Dynamic Query Builder */}
            <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-white">Dynamic Query Builder</h2>
                <CodeBlock title="Parameterized query builder" code={`interface QueryFilter {
  category?: string;
  sector?: string;
  searchTerm?: string;
}

function buildEquipmentQuery(filter: QueryFilter) {
  const where: string[] = [];
  const params: Record<string, unknown> = {};

  if (filter.category) {
    where.push('e.category = $category');
    params.category = filter.category;
  }
  if (filter.sector) {
    where.push('s.code = $sector');
    params.sector = filter.sector;
  }
  if (filter.searchTerm) {
    where.push('toLower(e.displayName) CONTAINS toLower($search)');
    params.search = filter.searchTerm;
  }

  const whereClause = where.length > 0 ? \`WHERE \${where.join(' AND ')}\` : '';
  const cypher = \`
    MATCH (s:Sector)-[:HAS_SUBSECTOR]->(ss:SubSector)
          -[:HAS_FACILITY]->(f:Facility)
          -[:CONTAINS_EQUIPMENT]->(e:Equipment)
    \${whereClause}
    RETURN e, f.name AS facility, s.code AS sector
  \`;
  return { cypher, params };
}`} />
            </section>

            {/* GraphQL */}
            <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-white">GraphQL Integration</h2>
                <CodeBlock title="@neo4j/graphql auto-generation" code={`import { Neo4jGraphQL } from '@neo4j/graphql';
import { ApolloServer } from '@apollo/server';

const typeDefs = \`
  type Equipment {
    tag: String!
    displayName: String
    category: String!
    facility: Facility! @relationship(type: "CONTAINS_EQUIPMENT", direction: IN)
  }
  type Facility {
    code: String!
    name: String!
    equipment: [Equipment!]! @relationship(type: "CONTAINS_EQUIPMENT", direction: OUT)
  }
\`;

const neoSchema = new Neo4jGraphQL({ typeDefs, driver: getDriver() });
const schema = await neoSchema.getSchema();
const server = new ApolloServer({ schema });`} />
            </section>

            {/* Auth */}
            <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-white">Authentication & RBAC</h2>
                <CodeBlock title="NextAuth.js + Neo4j role-based access" code={`import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userRole = session.user?.role;
  if (!['admin', 'editor'].includes(userRole)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Proceed with Neo4j write operation
  const driver = getDriver();
  const dbSession = driver.session({
    database: process.env.NEO4J_DATABASE || 'neo4j',
  });
  // ... execute query
}`} />
            </section>

            {/* Testing */}
            <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-white">Testing</h2>
                <CodeBlock title="Integration test with Testcontainers" code={`import { GenericContainer, StartedTestContainer } from 'testcontainers';
import neo4j, { Driver } from 'neo4j-driver';

let container: StartedTestContainer;
let driver: Driver;

beforeAll(async () => {
  container = await new GenericContainer('neo4j:5')
    .withExposedPorts(7687)
    .withEnvironment({ NEO4J_AUTH: 'none' })
    .start();

  const port = container.getMappedPort(7687);
  driver = neo4j.driver(\`bolt://localhost:\${port}\`);
}, 60000);

afterAll(async () => {
  await driver.close();
  await container.stop();
});

test('creates equipment node', async () => {
  const session = driver.session();
  await session.executeWrite(tx =>
    tx.run('CREATE (e:Equipment {tag: "TEST_001", category: "Pump"})')
  );
  const result = await session.executeRead(tx =>
    tx.run('MATCH (e:Equipment {tag: "TEST_001"}) RETURN e')
  );
  expect(result.records).toHaveLength(1);
  await session.close();
});`} />
            </section>

            {/* Health Check */}
            <section className="space-y-4">
                <h2 className="text-xl font-heading font-semibold text-white">Production Health Checks</h2>
                <CodeBlock title="API health endpoint" code={`// src/app/api/health/route.ts
export async function GET() {
  const driver = getDriver();
  try {
    const info = await driver.getServerInfo();
    return NextResponse.json({
      status: 'healthy',
      neo4j: {
        address: info.address,
        protocolVersion: info.protocolVersion,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { status: 'unhealthy', error: (error as Error).message },
      { status: 503 }
    );
  }
}`} />
            </section>

            {/* References */}
            <section className="space-y-3">
                <h2 className="text-xl font-heading font-semibold text-white">References</h2>
                <div className="space-y-2 text-xs text-gray-500">
                    <p>Neo4j, Inc. (2026). <em>@neo4j/graphql</em>. <a href="https://neo4j.com/docs/graphql/current/" className="text-[#018BFF] hover:underline" target="_blank" rel="noopener noreferrer">neo4j.com/docs/graphql</a></p>
                    <p>Vercel. (2026). <em>Next.js API Routes</em>. <a href="https://nextjs.org/docs/app/building-your-application/routing/route-handlers" className="text-[#018BFF] hover:underline" target="_blank" rel="noopener noreferrer">nextjs.org/docs</a></p>
                </div>
            </section>

            <section className="border-t border-white/[0.06] pt-6 space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">Backlinks</h3>
                <div className="flex flex-wrap gap-2">
                    {[
                        { href: '/wiki/neo4j', label: 'Neo4j Overview' },
                        { href: '/wiki/neo4j/javascript-driver', label: 'JavaScript Driver' },
                        { href: '/wiki/neo4j/example-queries', label: 'Example Queries' },
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
