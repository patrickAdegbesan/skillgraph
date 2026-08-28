import type { Session } from "neo4j-driver";

import type { DeveloperSkill, SkillNode } from "@/lib/types/graph";

export async function getDeveloperSkills(
  session: Session,
  developerId: string,
): Promise<DeveloperSkill[]> {
  const result = await session.run(
    `MATCH (d:Developer {id: $developerId})-[r:HAS_SKILL]->(s:Skill)
     RETURN s.id AS id, s.name AS name, s.category AS category,
            r.level AS level, r.years AS years
     ORDER BY s.name`,
    { developerId },
  );

  return result.records.map((record) => ({
    id: record.get("id"),
    name: record.get("name"),
    category: record.get("category"),
    level: record.get("level"),
    years: record.get("years"),
  }));
}

/**
 * Two-hop traversal: Developer -[:BUILT]-> Project -[:USES]-> Skill.
 * Surfaces skills a developer has practical exposure to through their
 * projects, even when there is no direct HAS_SKILL relationship.
 */
export async function getSkillsInferredFromProjects(
  session: Session,
  developerId: string,
): Promise<SkillNode[]> {
  const result = await session.run(
    `MATCH (d:Developer {id: $developerId})-[:BUILT]->(:Project)-[:USES]->(s:Skill)
     RETURN DISTINCT s.id AS id, s.name AS name, s.category AS category
     ORDER BY s.name`,
    { developerId },
  );

  return result.records.map((record) => ({
    id: record.get("id"),
    name: record.get("name"),
    category: record.get("category"),
  }));
}
