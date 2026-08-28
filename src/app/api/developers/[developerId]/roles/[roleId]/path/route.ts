import { parseId } from "@/lib/http/params";
import { apiSuccess, badRequest, handleApiErrors, notFound } from "@/lib/http/response";
import {
  getCareerPathToRole,
  getDeveloperProfile,
  getRoleProfile,
} from "@/lib/services/careerService";

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

    const role = await getRoleProfile(parsedRoleId.id);
    if (!role) {
      return notFound("Role not found.");
    }

    // A missing path is a legitimate outcome (no RELATED_TO chain within the
    // bound exists yet), not an error — reported as found: false, not 404/500.
    const path = await getCareerPathToRole(parsedDeveloperId.id, parsedRoleId.id);
    return apiSuccess({ found: path !== null, path });
  });
}
