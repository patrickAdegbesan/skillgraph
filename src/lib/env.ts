import { z } from "zod";

const cognoDbEnvironmentSchema = z.object({
  COGNODB_URI: z.string().trim().min(1),
  COGNODB_USERNAME: z.string().trim().min(1),
  COGNODB_PASSWORD: z.string().min(1),
});

export type CognoDbEnvironment = z.infer<typeof cognoDbEnvironmentSchema>;

let validatedEnvironment: CognoDbEnvironment | undefined;

export function getCognoDbEnvironment(): CognoDbEnvironment {
  if (validatedEnvironment) {
    return validatedEnvironment;
  }

  const result = cognoDbEnvironmentSchema.safeParse({
    COGNODB_URI: process.env.COGNODB_URI,
    COGNODB_USERNAME: process.env.COGNODB_USERNAME,
    COGNODB_PASSWORD: process.env.COGNODB_PASSWORD,
  });

  if (!result.success) {
    throw new Error("CognoDB environment variables are not configured.");
  }

  validatedEnvironment = result.data;
  return validatedEnvironment;
}
