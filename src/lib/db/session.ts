import neo4j, { type Session } from "neo4j-driver";

import { getCognoDbDriver } from "@/lib/db/cognodb";

export async function withReadSession<T>(
  work: (session: Session) => Promise<T>,
): Promise<T> {
  const session = getCognoDbDriver().session({
    defaultAccessMode: neo4j.session.READ,
  });

  try {
    return await work(session);
  } finally {
    await session.close();
  }
}

export async function withWriteSession<T>(
  work: (session: Session) => Promise<T>,
): Promise<T> {
  const session = getCognoDbDriver().session({
    defaultAccessMode: neo4j.session.WRITE,
  });

  try {
    return await work(session);
  } finally {
    await session.close();
  }
}
