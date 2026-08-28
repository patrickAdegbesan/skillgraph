import { parseId } from "@/lib/http/params";
import { apiSuccess, badRequest, handleApiErrors, notFound } from "@/lib/http/response";
import { getDeveloperProfile, getRoleDetailForDeveloper } from "@/lib/services/careerService";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ developerId: string; roleId: string }> },
) {
  const { developerId, roleId } = await params;
  const parsedDeveloperId = parseId(developerId);
  const parsedRoleId = parseId(roleId);
  if (!parsedDeveloperId.success || !parsedRoleId.success) {
    return badRequest("Invalid developer or role id.");
  }

  return handleApiErrors(async () => {
    const developer = await getDeveloperProfile(parsedDeveloperId.id);
    if (!developer) {
      return notFound("Developer not found.");
    }

    const detail = await getRoleDetailForDeveloper(parsedDeveloperId.id, parsedRoleId.id);
    if (!detail) {
      return notFound("Role not found.");
    }

    return apiSuccess(detail);
  });
}
