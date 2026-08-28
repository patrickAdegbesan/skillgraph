import type { Session } from "neo4j-driver";

import type { RequiredSkill, RoleMatchRaw, RoleNode, SkillGapEntry } from "@/lib/types/graph";

export async function getRoleById(session: Session, roleId: string): Promise<RoleNode | null> {
  const result = await session.run(
    `MATCH (r:Role {id: $roleId})
     RETURN r.id AS id, r.title AS title, r.seniority AS seniority`,
    { roleId },
  );

  const record = result.records[0];
  if (!record) {
    return null;
  }

  return {
    id: record.get("id"),
    title: record.get("title"),
    seniority: record.get("seniority"),
  };
}

export async function getRoleRequirements(
  session: Session,
  roleId: string,
): Promise<RequiredSkill[]> {
  const result = await session.run(
    `MATCH (r:Role {id: $roleId})-[req:REQUIRES]->(s:Skill)
     RETURN s.id AS id, s.name AS name, s.category AS category,
            req.minimumLevel AS minimumLevel, req.importance AS importance
     ORDER BY req.importance, s.name`,
    { roleId },
  );

  return result.records.map((record) => ({
    id: record.get("id"),
    name: record.get("name"),
    category: record.get("category"),
    minimumLevel: record.get("minimumLevel"),
    importance: record.get("importance"),
  }));
}

/**
 * Multi-hop match: for each Role, count how many of its REQUIRES skills
 * the developer already HAS_SKILL, ranked by best match first. This is
 * the kind of "score by shared neighbours across two relationship types"
 * query that is awkward to express as relational joins/aggregations.
 */
export async function getMatchingRolesForDeveloper(
  session: Session,
  developerId: string,
): Promise<RoleMatchRaw[]> {
  const result = await session.run(
    `MATCH (r:Role)-[:REQUIRES]->(required:Skill)
     OPTIONAL MATCH (d:Developer {id: $developerId})-[:HAS_SKILL]->(required)
     WITH r, required, d IS NOT NULL AS hasSkill
     WITH r,
          count(required) AS requiredSkillCount,
          sum(CASE WHEN hasSkill THEN 1 ELSE 0 END) AS matchedSkillCount,
          collect(CASE WHEN hasSkill THEN {id: required.id, name: required.name} END) AS matchedSkillsRaw
     RETURN r.id AS id, r.title AS title, r.seniority AS seniority,
            matchedSkillCount, requiredSkillCount,
            [s IN matchedSkillsRaw WHERE s IS NOT NULL] AS matchedSkills
     ORDER BY matchedSkillCount DESC, requiredSkillCount ASC, r.title ASC`,
    { developerId },
  );

  return result.records.map((record) => ({
    id: record.get("id"),
    title: record.get("title"),
    seniority: record.get("seniority"),
    matchedSkillCount: record.get("matchedSkillCount").toNumber(),
    requiredSkillCount: record.get("requiredSkillCount").toNumber(),
    matchedSkills: record.get("matchedSkills"),
  }));
}

/**
 * Skills a role requires that the developer does not already have.
 *
 * Uses OPTIONAL MATCH + IS NULL (the same anti-join idiom as
 * getMatchingRolesForDeveloper) rather than a `NOT (...)` pattern predicate:
 * CognoDB evaluates pattern-existence predicates in a WHERE clause as false
 * instead of matching them, which silently reported every required skill as
 * missing.
 */
export async function getSkillGapForRole(
  session: Session,
  developerId: string,
  roleId: string,
): Promise<SkillGapEntry[]> {
  const result = await session.run(
    `MATCH (r:Role {id: $roleId})-[req:REQUIRES]->(s:Skill)
     OPTIONAL MATCH (d:Developer {id: $developerId})-[:HAS_SKILL]->(s)
     WITH s, req, d
     WHERE d IS NULL
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
