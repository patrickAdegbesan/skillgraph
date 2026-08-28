import type { Session } from "neo4j-driver";

const NODE_LABELS = ["Developer", "Skill", "Project", "Role", "Company"] as const;

export async function ensureSchema(session: Session): Promise<void> {
  for (const label of NODE_LABELS) {
    await session.run(
      `CREATE CONSTRAINT ${label.toLowerCase()}_id_unique IF NOT EXISTS
       FOR (n:${label}) REQUIRE n.id IS UNIQUE`,
    );
  }
}
