# SkillGraph

SkillGraph is a graph-powered career and skill path explorer. It will help people understand how their skills and projects connect to roles, career paths, and companies using CognoDB relationships.

## Current development status

Phase 1 (foundation) is complete and the live CognoDB connection has been verified. Phase 2 — the graph data model, realistic seed data, an idempotent seed script, and the foundational query layer — is the next implementation phase.

New contributors and AI coding agents should read [PROJECT_HANDOFF.md](PROJECT_HANDOFF.md) first. It documents the assessment requirements, the graph model, the phase plan, the secrets policy, and the rules for continuing this project.

Phase 1 established the application foundation:

- Next.js App Router with TypeScript
- Tailwind CSS and ESLint
- validated server-side CognoDB configuration
- lazy Neo4j driver initialization for CognoDB over Bolt
- a read-session helper that always closes sessions
- a parameterized database health check at `GET /api/health`

Graph modeling, seed data, product queries, and the final interface are intentionally reserved for later phases.

## Tech stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- CognoDB
- Official Neo4j JavaScript driver
- Zod

## Run locally

Prerequisites:

- Node.js 20 or newer
- A running CognoDB instance

Install dependencies:

```bash
npm install
```

Create your private local environment file:

```bash
cp .env.example .env.local
```

Replace the placeholder values in `.env.local` with the connection details from your CognoDB instance. Do not commit that file.

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The database health endpoint is available at [http://localhost:3000/api/health](http://localhost:3000/api/health).

## Environment variables

| Variable | Purpose |
| --- | --- |
| `COGNODB_URI` | CognoDB Bolt connection URI |
| `COGNODB_USERNAME` | CognoDB username |
| `COGNODB_PASSWORD` | CognoDB password |

These variables are read only by server-side code. They do not use the `NEXT_PUBLIC_` prefix and are therefore not included in browser bundles.

## Health endpoint

`GET /api/health` opens a read session and runs this parameterized openCypher query:

```cypher
RETURN $status AS status
```

When CognoDB is reachable, the endpoint returns HTTP `200`. Missing configuration, authentication failures, and connection errors return HTTP `503` with a safe user-facing message. Raw database errors are never returned to the client.

## Verification

```bash
npm run lint
npm run typecheck
npm run build
```

The complete graph model, seed instructions, query explanations, screenshots, hosted demo, and screen-recording details will be documented as their implementation phases are completed.
