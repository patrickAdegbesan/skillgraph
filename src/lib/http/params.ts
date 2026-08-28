import { z } from "zod";

const idSchema = z
  .string()
  .trim()
  .min(1)
  .max(200)
  .regex(/^[a-z0-9-]+$/, "must be a lowercase, hyphenated identifier");

export function parseId(value: string): { success: true; id: string } | { success: false } {
  const result = idSchema.safeParse(value);
  if (!result.success) {
    return { success: false };
  }
  return { success: true, id: result.data };
}
