# =============================================================================
# DEXPI Equipment Factory — Next.js Production Image
#
# This Dockerfile builds a clean Next.js standalone server.
# Memgraph runs as a separate service via docker-compose.yml.
# =============================================================================
FROM node:20-slim AS deps

WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# -- Build Stage ---------------------------------------------------------------
FROM node:20-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# -- Production Stage ----------------------------------------------------------
FROM node:20-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV DATA_DIR=/data
ENV PORT=3000
ENV MEMGRAPH_HOST=memgraph
ENV MEMGRAPH_PORT=7687

# Install wget for healthcheck
RUN apt-get update && apt-get install -y --no-install-recommends wget \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Create app user
RUN groupadd --system --gid 1001 nodejs \
    && useradd --system --uid 1001 --gid nodejs nextjs

# Create data directories
RUN mkdir -p /data/sectors /data/pipeline-runs /data/exports \
    && chown -R nextjs:nodejs /data

# Copy built app
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
