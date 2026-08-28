import type { Session } from "neo4j-driver";

import type { RoleMatch, SkillGapEntry } from "@/lib/types/graph";

/**
 * Multi-hop match: for each Role, count how many of its REQUIRES skills
 * the developer already HAS_SKILL, ranked by best match first. This is
 * the kind of "score by shared neighbours across two relationship types"
 * query that is awkward to express as relational joins/aggregations.
 */
export async function getMatchingRolesForDeveloper(
  session: Session,
  developerId: string,
): Promise<RoleMatch[]> {
  const result = await session.run(
    `MATCH (r:Role)-[:REQUIRES]->(required:Skill)
     OPTIONAL MATCH (d:Developer {id: $developerId})-[:HAS_SKILL]->(required)
     WITH r, count(required) AS requiredSkillCount, count(d) AS matchedSkillCount
     RETURN r.id AS id, r.title AS title, r.seniority AS seniority,
            matchedSkillCount, requiredSkillCount
     ORDER BY matchedSkillCount DESC, requiredSkillCount ASC`,
    { developerId },
  );

  return result.records.map((record) => ({
    id: record.get("id"),
    title: record.get("title"),
    seniority: record.get("seniority"),
    matchedSkillCount: record.get("matchedSkillCount").toNumber(),
    requiredSkillCount: record.get("requiredSkillCount").toNumber(),
  }));
}

export async function getSkillGapForRole(
  session: Session,
  developerId: string,
  roleId: string,
): Promise<SkillGapEntry[]> {
  const result = await session.run(
    `MATCH (r:Role {id: $roleId})-[req:REQUIRES]->(s:Skill)
     WHERE NOT (:Developer {id: $developerId})-[:HAS_SKILL]->(s)
     RETURN s.id AS id, s.name AS name, s.category AS category,
            req.minimumLevel AS minimumLevel, req.importance AS importance
     ORDER BY req.importance, s.name`,
    { developerId, roleId },
  );

  return result.records.map((record) => ({
    id: record.get("id"),
    name: record.get("name"),
    category: record.get("category"),
    minimumLevel: record.get("minimumLevel"),
    importance: record.get("importance"),
  }));
}
