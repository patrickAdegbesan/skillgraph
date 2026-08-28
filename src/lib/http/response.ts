export type ApiErrorCode = "BAD_REQUEST" | "NOT_FOUND" | "SERVICE_UNAVAILABLE";

export function apiSuccess<T>(data: T, init?: { status?: number }): Response {
  return Response.json({ data }, { status: init?.status ?? 200 });
}

export function apiError(code: ApiErrorCode, message: string, status: number): Response {
  return Response.json({ error: { code, message } }, { status });
}

export function badRequest(message: string): Response {
  return apiError("BAD_REQUEST", message, 400);
}

export function notFound(message: string): Response {
  return apiError("NOT_FOUND", message, 404);
}

/**
 * Catches CognoDB connectivity/driver failures and returns a sanitized
 * response. Raw errors (which may carry connection strings or driver
 * internals) are logged server-side only, never sent to the client.
 */
export function serviceUnavailable(error: unknown): Response {
  console.error("SkillGraph service error:", error);
  return apiError(
    "SERVICE_UNAVAILABLE",
    "SkillGraph is temporarily unavailable. Please try again shortly.",
    503,
  );
}

/**
 * Runs a route handler body and converts any thrown error (CognoDB
 * connectivity/driver failures) into a sanitized 503 response, so route
 * handlers never need their own try/catch around service calls.
 */
export async function handleApiErrors(work: () => Promise<Response>): Promise<Response> {
  try {
    return await work();
  } catch (error) {
    return serviceUnavailable(error);
  }
}
