# SkillGraph - Project Handoff

## Project

SkillGraph - Career & Skill Path Explorer

## Purpose

This is a take-home assessment for the Full Stack Developer Intern - CognoDB role at Wexa AI.

## Official Wexa requirements

- CognoDB must be the graph database.
- CognoDB uses openCypher over Bolt.
- Use the official Neo4j driver.
- Thoughtful graph model with labeled nodes, typed relationships and properties.
- Realistic seed data and repository seed script.
- Parameterized Cypher only.
- At least one multi-hop traversal of 2+ hops.
- At least one graph query that would be awkward in a relational database.
- Functional non-technical-user-friendly web application.
- UI/UX quality is explicitly evaluated.
- Loading states.
- Empty states.
- Graceful database error handling.
- Credentials must come from environment variables.
- Full source code in GitHub.
- README must explain the use case.
- README must contain "Why a graph database?"
- README must contain graph data model diagram.
- README must explain setup and CognoDB provisioning.
- README must explain important queries.
- README must contain UI screenshots.
- Hosted application demo is mandatory.
- Short screen recording is mandatory.
- CognoDB instance should remain running after submission.
- AI coding assistants are permitted, but the candidate must be able to explain all code.

## Submission

Final email subject:

```text
CognoDB Assignment 2 - Patrick Adegbesan
```

Deadline:

```text
48 hours from receipt of the assignment.
```

## Product concept

SkillGraph helps developers understand how their skills, projects, technologies, roles and companies are connected.

Primary graph entities:

```cypher
(:Developer)
(:Skill)
(:Project)
(:Role)
(:Company)
```

Relationships:

```cypher
(:Developer)-[:HAS_SKILL]->(:Skill)
(:Developer)-[:BUILT]->(:Project)
(:Project)-[:USES]->(:Skill)
(:Role)-[:REQUIRES]->(:Skill)
(:Company)-[:OFFERS]->(:Role)
(:Skill)-[:RELATED_TO]->(:Skill)
```

Relationship properties may include:

HAS_SKILL:

- `level`
- `years`

REQUIRES:

- `minimumLevel`
- `importance`

All nodes should have stable string `id` properties. Do not use internal database IDs as application identifiers.

## Core application goals

The application should eventually answer:

1. What skills does a developer have?
2. What technologies have they used through projects?
3. Which roles best match their skills?
4. Which roles match technologies inferred from their projects?
5. Which skills are missing for a target role?
6. Which companies offer relevant roles?
7. Which related skills could move them toward a target career?
8. What graph path connects their current skills to a target role?

## Main demo profile

Patrick Adegbesan

Use only reasonable professional/demo information.

Do not include private contact information.

Representative skills may include:

- JavaScript
- TypeScript
- React
- Next.js
- Python
- Django
- PostgreSQL
- Git

## Architecture

Keep this explicit:

```text
UI
-> server/API layer
-> service
-> query layer
-> CognoDB
```

Cypher must not be placed inside React components.

Expected organization:

```text
src/app
src/components
src/lib/db
src/lib/queries
src/lib/services
src/lib/types
data
scripts
```

## Technology stack

- Next.js
- TypeScript
- Tailwind CSS
- CognoDB
- neo4j-driver
- openCypher
- Zod

Add graph visualization later when required.

Avoid unnecessary infrastructure, microservices, authentication, payments, AI chatbots, and other features outside the assessment scope.

## Phase 1 status

Phase 1 is complete.

Implemented:

- Git repository
- Next.js application
- TypeScript
- Tailwind CSS
- ESLint
- CognoDB environment validation
- Lazy CognoDB/Neo4j driver
- Session helper
- `GET /api/health`
- Sanitized database errors
- `.env.example`
- Safe `.gitignore`
- Initial README

Verification completed:

```bash
npm run lint
npm run typecheck
npm run build
```

All passed during Phase 1.

Live CognoDB connection has been verified.

`GET /api/health` currently returns:

```json
{"status":"ok","database":"reachable"}
```

Do not modify the working connection unnecessarily.

## Secrets

Local credentials belong in:

```text
.env.local
```

Expected variables:

```text
COGNODB_URI
COGNODB_USERNAME
COGNODB_PASSWORD
```

`.env.local` must never be committed.

A new cloud/web agent may not have these environment variables. If credentials are unavailable in the cloud environment, do not invent them or replace database functionality with mocks.

The user will configure deployment and server environment variables separately.

## Phase 2 status

Phase 2 is complete in code. It has not been executed against a live CognoDB
instance from this environment because no CognoDB credentials are configured
here (no `.env.local`) — per the rule above, credentials were not invented and
database functionality was not mocked.

Implemented:

- `src/lib/types/graph.ts` — node, relationship-property and query-result
  types for the graph model
- `data/seed-data.ts` — realistic seed data: 18 Developers, 35 Skills,
  18 Projects, 12 Roles, 9 Companies, plus all `HAS_SKILL`, `BUILT`,
  `USES`, `REQUIRES`, `OFFERS` and `RELATED_TO` relationship rows
- `src/lib/db/schema.ts` — `ensureSchema` creates a uniqueness constraint on
  `id` for every node label (idempotent, `IF NOT EXISTS`)
- `src/lib/db/session.ts` — added `withWriteSession` alongside the existing
  `withReadSession`, both closing the session in a `finally`
- `scripts/seed.ts` — idempotent seed script run with `npm run seed`. Order:
  constraints/indexes -> MERGE nodes -> MERGE relationships, all keyed by the
  application-level `id`, so re-running it is safe and never wipes the
  database
- `src/lib/queries/` — foundational query layer (`developer.ts`, `role.ts`,
  `company.ts`, `careerPath.ts`), each taking a `Session` and returning typed
  rows using only parameterized Cypher
- `src/lib/services/careerService.ts` — thin service layer wrapping the query
  layer in `withReadSession`, matching the `UI -> API -> service -> query
  layer -> CognoDB` architecture

Traversal requirements satisfied:

- Multi-hop (2-hop): `getSkillsInferredFromProjects` walks
  `Developer -[:BUILT]-> Project -[:USES]-> Skill`
- Query awkward in a relational database: `getMatchingRolesForDeveloper` scores
  every Role by counting overlapping `REQUIRES`/`HAS_SKILL` skills in one
  traversal, and `findSkillPathToRole` runs `shortestPath` over a
  variable-length `RELATED_TO*0..4` pattern between a developer's skills and a
  role's required skills — both need a traversal depth that isn't fixed in
  advance, which relational joins can't express without deciding the number
  of joins up front

Verification:

```bash
npm run lint       # pass
npm run typecheck  # pass
npm run build      # pass
```

`data/seed-data.ts` referential integrity (every relationship row references
an id that exists) was checked programmatically; no missing references.

`npm run seed` was dry-run in this environment and fails with a clear
"CognoDB environment variables are not configured" error, as expected with no
`.env.local`. It has not been run against a live database. Whoever has
CognoDB credentials should run `npm run seed` locally and confirm:

```bash
curl -s http://localhost:3000/api/health
```

still returns `{"status":"ok","database":"reachable"}`, and spot-check a
multi-hop query (e.g. `getMatchingRolesForDeveloper` for
`dev-patrick-adegbesan`) returns sensible ranked roles.

## Phase 3 status

Phase 3 is complete in code. As with Phase 2, it has not been executed against
the hosted CognoDB instance from this environment (no outbound Bolt access
from this sandbox — see below).

Implemented:

- Query layer additions (`src/lib/queries/developer.ts`, `role.ts`):
  `getDeveloperById`, `getDeveloperProjects`, `getRoleById`,
  `getRoleRequirements`; `getMatchingRolesForDeveloper` now also collects
  each matched skill (id/name), not just counts
- `src/lib/types/graph.ts`: `RoleMatchRaw`/`RoleMatchResult`,
  `RequiredSkill`, `CareerPath`, `DeveloperSkillEvidence`,
  `RoleDetailForDeveloper`, `MatchedSkillRef`
- Service layer (`src/lib/services/careerService.ts`) rewritten to cover:
  developer profile/projects/skills, `getDeveloperSkillEvidence` (direct vs.
  project-derived vs. project-derived-only skills), `getMatchingRoles`
  (adds `matchPercentage`/`missingSkillCount` on top of the raw query
  result), `getRoleDetailForDeveloper` (composes role + requirements + gap
  + companies + career path via `Promise.all`, not one giant query),
  `getCareerPathToRole` (wraps the shortest-path result into
  `{startingSkill, targetSkill, steps, hopCount}`)
- `src/lib/http/response.ts` — shared `{data}`/`{error}` response helpers
  (`apiSuccess`, `badRequest`, `notFound`, `serviceUnavailable`,
  `handleApiErrors`); `src/lib/http/params.ts` — Zod id validation
- Seven API routes under `src/app/api/developers/[developerId]/...` (see
  README "API Layer" section for the full list). No Cypher outside the
  query layer; every route validates ids, checks developer/role existence
  (404 if missing), and returns sanitized 503 on any CognoDB failure

Verification:

```bash
npm run lint       # pass
npm run typecheck  # pass
npm run build      # pass
```

All seven endpoints, plus not-found (developer and role), invalid-id
(400), no-career-path-found (`{found:false}`, 200), and database-down
(503, sanitized) cases were exercised against a temporary, disposable
Neo4j 5.26 instance — not the hosted CognoDB instance. See the README
"API Layer" section for representative results. No test framework was
added; verification was direct `curl` calls against the running app plus
`lint`/`typecheck`/`build`.

Live execution against the hosted CognoDB instance remains pending for
the same reason as Phase 2: this sandbox cannot open outbound Bolt (raw
TCP) connections to any host. This is a sandbox network-policy limitation,
not a code, credentials, or CognoDB issue.

## Phase 4 status

Phase 4 is complete in code. As with Phases 2 and 3, it has not been run
against the hosted CognoDB instance from this environment (no outbound Bolt
access from this sandbox).

Implemented:

- `src/components/AppShell.tsx` — branded, responsive application shell
  (top nav: Overview, Skills, Roles, Career Path; mobile menu; active-link
  state)
- `src/app/page.tsx` (Overview) — developer header, summary metrics
  (direct skills, seen-in-projects, projects, career opportunities), and a
  featured "best role match" card with a CTA into that role
- `src/app/skills/page.tsx` — direct skills vs. skills evidenced through
  project work (`projectDerivedOnlySkills`, worded "Seen in your
  projects"), plus the developer's projects for context
- `src/app/roles/page.tsx` and `src/app/roles/[roleId]/page.tsx` — ranked
  role-match cards (match %, matched/missing counts, matched skill pills)
  and a full role detail view (matched/missing/required skills, companies,
  career path) — all ordering and scoring taken directly from the API, no
  client-side re-scoring
- `src/app/career-path/page.tsx` + `src/components/CareerPathVisualization.tsx`
  — a small, focused step-diagram visualization of the bounded
  `RELATED_TO` traversal, with a role picker defaulting to the developer's
  best match; a dedicated empty state for "no path found" distinct from an
  error
- `src/lib/api/useApiResource.ts` — the only place in the frontend that
  calls `fetch`; returns loading/success/error state consumed by every
  page; `src/lib/constants.ts` — `DEFAULT_DEVELOPER_ID` (Patrick), no
  login/auth added
- Reusable components: `DeveloperHeader`, `MetricCard`, `SkillBadge`,
  `RoleMatchCard`, `MatchProgress`, `SkillGapList`, `CompanyList`,
  `EmptyState`, `ErrorState`, `LoadingSkeleton.tsx` primitives
- Design tokens as CSS variables in `src/app/globals.css` (accent,
  surface, border, status colors) with a dark-mode override
- New dependency: `lucide-react` (icons only)

Verification:

```bash
npm run lint       # pass
npm run typecheck  # pass
npm run build      # pass
```

All pages, plus loading states, empty states (no direct skills, no
project-derived-only skills, no matched roles, no missing skills, no
companies, no career path found), a 503 (database down, sanitized message
+ working retry), a 404 (role not found, message shown with no retry
button), and mobile (375–390px) layouts were exercised with a real browser
(Playwright, screenshots) against a temporary, disposable Neo4j 5.26
instance — not the hosted CognoDB instance. The temporary Neo4j container
and its `.env.local` were removed after verification; the original hosted
`.env.local` was restored. No test framework was added — verification was
visual/manual plus lint/typecheck/build, per the assignment's
proportionality guidance.

Live execution against the hosted CognoDB instance remains pending for the
same reason as Phases 2 and 3: this sandbox cannot open outbound Bolt (raw
TCP) connections to any host.

## Phase 5 status (originally planned as "Polish", delivered early + finalization)

The original plan below listed polish (responsive design, skeleton loading,
empty states, error states, accessibility, restrained motion, visual
polish) as its own phase. All of it was already delivered as part of Phase
4 — see the Phase 4 status section above and the README's Frontend section.
What's actually described here is the finalization/submission work done
in this session, matching what the original plan below calls "Phase 6".

Attempted and completed in this session:

- Confirmed `main` at the expected commit; `npm install`, `npm run lint`,
  `npm run typecheck`, `npm run build`, `npm audit` all pass (0
  vulnerabilities) before any Phase 5 change was made
- **Attempted live hosted CognoDB validation** using the real
  `COGNODB_URI`/`COGNODB_USERNAME`/`COGNODB_PASSWORD` already configured in
  this environment's `.env.local`. `GET /api/health` returned `503` — the
  Bolt connection did not succeed. This reproduces the same limitation
  documented in every prior phase: this sandbox's network policy does not
  permit outbound raw-TCP (Bolt) connections to any host. It is not a
  code, credential, or CognoDB-configuration problem, and it was not
  worked around. **Hosted CognoDB validation, live API/UI validation
  against the hosted instance, and deployment all remain undone from this
  environment** for the same root cause — this session has no network
  path to the instance and no hosting-platform account/credentials to
  deploy anywhere.
- Local integration verification (temporary, disposable Neo4j 5.26, as in
  every prior phase) reconfirmed correct across the seed script, query
  layer, API, and UI.
- README finalized to the structure the assignment expects: Use Case, Why
  a Graph Database?, Graph Data Model, Nodes, Relationships, Seed Data,
  Important Cypher Queries, Career Path Query, CognoDB Compatibility Note,
  API Layer, Frontend, Screenshots (placeholder, honestly labeled empty),
  Live Demo (placeholder, honestly labeled not deployed), Local Setup,
  Architecture, Error Handling, Health endpoint, Tech Stack, and an
  Assignment Notes / Verification section stating the above plainly rather
  than implying hosted validation succeeded.
- `docs/screenshots/` created (empty, with its own README explaining why)
  and `docs/screen-recording-script.md` added — a beat-by-beat 2–4 minute
  recording script for whoever records the final demo, once one exists.
- Full security review: `git status`/`git diff` clean, `.env.local`
  confirmed git-ignored and never staged, and `git log --all -p` scanned
  across the entire history for `COGNODB_PASSWORD=`, `bolt+s://`,
  `password=`, `token=`, and API-key-shaped strings — nothing found beyond
  the placeholder values already in `.env.example`.

Still pending before this can be submitted (all blocked on the same two
things — a network with outbound Bolt access, and a hosting-platform
account):

- Run `npm run seed` (twice, to confirm idempotency) against the actual
  hosted CognoDB instance and confirm the documented node/relationship
  counts
- Exercise the API and UI against the hosted instance specifically (not
  just a temporary Neo4j stand-in)
- Deploy the app somewhere with outbound Bolt access, verify the deployed
  demo end-to-end, and add real screenshots + the live demo URL to the
  README
- Record the actual screen recording using the script above
- Submission email (explicitly not sent — not requested yet)

## Important implementation philosophy

This project will be reviewed in a technical interview.

Prefer readable and explicit code over clever abstractions.

The candidate must be able to explain:

- Every important Cypher query
- Graph modeling decisions
- Application architecture
- CognoDB connection
- Parameterized Cypher
- Multi-hop traversal
- Seed architecture
- Error handling

Do not over-engineer.

## AI agent instructions

Before changing code:

1. Read `README.md`.
2. Read `PROJECT_HANDOFF.md`.
3. Inspect `package.json`.
4. Inspect `src/lib/db`.
5. Inspect git history/status.
6. Determine which phase is currently complete.
7. Never expose secrets.
8. Continue one development phase at a time.
9. Run lint, typecheck and build after each phase.
10. Report your work before proceeding into the following phase.

Do not rewrite working infrastructure unnecessarily.
