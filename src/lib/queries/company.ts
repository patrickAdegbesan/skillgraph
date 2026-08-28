import type { Session } from "neo4j-driver";

import type { CompanyNode } from "@/lib/types/graph";

export async function getCompaniesOfferingRole(
  session: Session,
  roleId: string,
): Promise<CompanyNode[]> {
  const result = await session.run(
    `MATCH (c:Company)-[:OFFERS]->(:Role {id: $roleId})
     RETURN c.id AS id, c.name AS name, c.industry AS industry
     ORDER BY c.name`,
    { roleId },
  );

  return result.records.map((record) => ({
    id: record.get("id"),
    name: record.get("name"),
    industry: record.get("industry"),
  }));
}
