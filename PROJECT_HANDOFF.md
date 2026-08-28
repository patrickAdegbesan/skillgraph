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

## Phase 2

Phase 2 is the next implementation phase.

It consists of:

- Graph data model
- Realistic seed data
- Idempotent seed script
- CognoDB-supported constraints/indexes
- Foundational query layer
- Verified multi-hop traversal

Target seed data approximately:

- 15-20 Developers
- 30-40 Skills
- 15-20 Projects
- 10-15 Roles
- 8-10 Companies

Relationship quality matters more than quantity.

Seed data must produce meaningful traversal results.

Create:

```bash
npm run seed
```

Prefer this workflow:

```text
constraints/indexes
-> MERGE nodes
-> MERGE relationships
-> deterministic SET operations
```

Do not automatically wipe the database.

## Phase 3

Core graph functionality:

- Role matching
- Skill gaps
- Project-derived skill matching
- Companies
- Career-path traversal
- Related skill discovery
- Graceful query errors

## Phase 4

Frontend:

- Polished application shell
- Dashboard
- Developer profile
- Role views
- Career Path Explorer
- Relationship visualization

## Phase 5

Polish:

- Responsive design
- Skeleton loading
- Empty states
- Error states
- Accessibility
- Restrained motion
- Visual polish

## Phase 6

Submission:

- Lint
- Typecheck
- Build
- Testing
- Security review
- Final README
- Architecture diagram
- Screenshots
- Hosted deployment
- Short screen recording
- Final GitHub repository
- Submission email

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
