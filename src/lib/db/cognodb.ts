import neo4j, { type Driver } from "neo4j-driver";

import { getCognoDbEnvironment } from "@/lib/env";

let driver: Driver | undefined;

export function getCognoDbDriver(): Driver {
  if (driver) {
    return driver;
  }

  const environment = getCognoDbEnvironment();

  driver = neo4j.driver(
    environment.COGNODB_URI,
    neo4j.auth.basic(
      environment.COGNODB_USERNAME,
      environment.COGNODB_PASSWORD,
    ),
    {
      connectionTimeout: 8_000,
    },
  );

  return driver;
}
