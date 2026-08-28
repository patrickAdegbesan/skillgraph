import type { Session } from "neo4j-driver";

import type { CareerPathStep } from "@/lib/types/graph";

/**
 * Variable-length path traversal: finds the shortest chain of RELATED_TO
 * skill relationships that connects a skill the developer already has to a
 * skill the target role requires. Shortest-path-over-a-variable-length
 * pattern is the kind of query relational joins cannot express without a
 * fixed number of self-joins decided in advance.
 */
export async function findSkillPathToRole(
  session: Session,
  developerId: string,
  roleId: string,
): Promise<CareerPathStep[] | null> {
  const result = await session.run(
    `MATCH (d:Developer {id: $developerId})-[:HAS_SKILL]->(start:Skill)
     MATCH (r:Role {id: $roleId})-[:REQUIRES]->(target:Skill)
     MATCH path = shortestPath((start)-[:RELATED_TO*0..4]-(target))
     RETURN [node IN nodes(path) | node.id] AS ids,
            [node IN nodes(path) | node.name] AS names
     ORDER BY length(path) ASC
     LIMIT 1`,
    { developerId, roleId },
  );

  const record = result.records[0];
  if (!record) {
    return null;
  }

  const ids: string[] = record.get("ids");
  const names: string[] = record.get("names");

  return ids.map((id, index) => ({
    id,
    name: names[index],
    kind: "Skill" as const,
  }));
}
