import type { Session } from "neo4j-driver";

import { closeCognoDbDriver } from "@/lib/db/cognodb";
import { ensureSchema } from "@/lib/db/schema";
import { withWriteSession } from "@/lib/db/session";
import {
  companies,
  companyRoles,
  developerProjects,
  developerSkills,
  developers,
  projectSkills,
  projects,
  roleSkills,
  roles,
  skillRelations,
  skills,
} from "../data/seed-data";

async function mergeNodes<T extends { id: string }>(
  session: Session,
  label: string,
  nodes: T[],
): Promise<void> {
  await session.run(
    `UNWIND $nodes AS node
     MERGE (n:${label} {id: node.id})
     SET n += node`,
    { nodes },
  );
  console.log(`  ${nodes.length} ${label} nodes merged`);
}

async function seedDeveloperSkills(session: Session): Promise<void> {
  await session.run(
    `UNWIND $rows AS row
     MATCH (d:Developer {id: row.developerId})
     MATCH (s:Skill {id: row.skillId})
     MERGE (d)-[r:HAS_SKILL]->(s)
     SET r.level = row.level, r.years = row.years`,
    { rows: developerSkills },
  );
  console.log(`  ${developerSkills.length} HAS_SKILL relationships merged`);
}

async function seedDeveloperProjects(session: Session): Promise<void> {
  await session.run(
    `UNWIND $rows AS row
     MATCH (d:Developer {id: row.developerId})
     MATCH (p:Project {id: row.projectId})
     MERGE (d)-[:BUILT]->(p)`,
    { rows: developerProjects },
  );
  console.log(`  ${developerProjects.length} BUILT relationships merged`);
}

async function seedProjectSkills(session: Session): Promise<void> {
  await session.run(
    `UNWIND $rows AS row
     MATCH (p:Project {id: row.projectId})
     MATCH (s:Skill {id: row.skillId})
     MERGE (p)-[:USES]->(s)`,
    { rows: projectSkills },
  );
  console.log(`  ${projectSkills.length} USES relationships merged`);
}

async function seedRoleSkills(session: Session): Promise<void> {
  await session.run(
    `UNWIND $rows AS row
     MATCH (r:Role {id: row.roleId})
     MATCH (s:Skill {id: row.skillId})
     MERGE (r)-[req:REQUIRES]->(s)
     SET req.minimumLevel = row.minimumLevel, req.importance = row.importance`,
    { rows: roleSkills },
  );
  console.log(`  ${roleSkills.length} REQUIRES relationships merged`);
}

async function seedCompanyRoles(session: Session): Promise<void> {
  await session.run(
    `UNWIND $rows AS row
     MATCH (c:Company {id: row.companyId})
     MATCH (r:Role {id: row.roleId})
     MERGE (c)-[:OFFERS]->(r)`,
    { rows: companyRoles },
  );
  console.log(`  ${companyRoles.length} OFFERS relationships merged`);
}

async function seedSkillRelations(session: Session): Promise<void> {
  await session.run(
    `UNWIND $rows AS row
     MATCH (from:Skill {id: row.fromSkillId})
     MATCH (to:Skill {id: row.toSkillId})
     MERGE (from)-[:RELATED_TO]->(to)`,
    { rows: skillRelations },
  );
  console.log(`  ${skillRelations.length} RELATED_TO relationships merged`);
}

async function seed(): Promise<void> {
  await withWriteSession(async (session) => {
    console.log("Ensuring constraints/indexes...");
    await ensureSchema(session);

    console.log("Merging nodes...");
    await mergeNodes(session, "Developer", developers);
    await mergeNodes(session, "Skill", skills);
    await mergeNodes(session, "Project", projects);
    await mergeNodes(session, "Role", roles);
    await mergeNodes(session, "Company", companies);

    console.log("Merging relationships...");
    await seedDeveloperSkills(session);
    await seedDeveloperProjects(session);
    await seedProjectSkills(session);
    await seedRoleSkills(session);
    await seedCompanyRoles(session);
    await seedSkillRelations(session);
  });

  console.log("Seed complete.");
}

seed()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await closeCognoDbDriver();
  });
