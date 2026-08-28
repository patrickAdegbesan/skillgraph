# SkillGraph runs as a real Node.js server on Cloud Run: every route under
# /api executes server-side and opens a Bolt connection to CognoDB, so this
# is deliberately not a static export.
#
# CognoDB credentials are NEVER baked into this image. They are injected at
# runtime from Secret Manager. See .dockerignore, which excludes .env*.

# Base image is parameterized so a network without Docker Hub access can
# build via a mirror, e.g.
#   --build-arg NODE_IMAGE=mirror.gcr.io/library/node:20-alpine
ARG NODE_IMAGE=node:20-alpine

# ---- deps ----------------------------------------------------------------
FROM ${NODE_IMAGE} AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---- build ---------------------------------------------------------------
FROM ${NODE_IMAGE} AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---- run -----------------------------------------------------------------
FROM ${NODE_IMAGE} AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# standalone/server.js does not serve public/ or .next/static itself, so both
# are copied in alongside it (see the Next.js `output` docs).
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

# Cloud Run injects PORT (8080) and requires binding 0.0.0.0.
ENV PORT=8080
ENV HOSTNAME=0.0.0.0
EXPOSE 8080

CMD ["node", "server.js"]
