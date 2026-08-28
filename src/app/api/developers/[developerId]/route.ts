import { parseId } from "@/lib/http/params";
import { apiSuccess, badRequest, handleApiErrors, notFound } from "@/lib/http/response";
import { getDeveloperProfile } from "@/lib/services/careerService";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ developerId: string }> },
) {
  const { developerId } = await params;
  const parsedId = parseId(developerId);
  if (!parsedId.success) {
    return badRequest("Invalid developer id.");
  }

  return handleApiErrors(async () => {
    const developer = await getDeveloperProfile(parsedId.id);
    if (!developer) {
      return notFound("Developer not found.");
    }
    return apiSuccess(developer);
  });
}
