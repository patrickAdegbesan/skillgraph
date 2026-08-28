import { withReadSession } from "@/lib/db/session";

export const runtime = "nodejs";

const HEALTH_QUERY = "RETURN $status AS status";

export async function GET() {
  try {
    const databaseStatus = await withReadSession(async (session) => {
      const result = await session.run(HEALTH_QUERY, { status: "reachable" });
      return result.records[0]?.get("status");
    });

    if (databaseStatus !== "reachable") {
      throw new Error("CognoDB returned an unexpected health-check response.");
    }

    return Response.json({
      status: "ok",
      database: "reachable",
    });
  } catch {
    return Response.json(
      {
        status: "error",
        database: "unreachable",
        message: "We couldn't reach SkillGraph right now. Please try again.",
      },
      { status: 503 },
    );
  }
}
