import { withReadSession } from "@/lib/db/session";
import { getCompaniesOfferingRole } from "@/lib/queries/company";
import { findSkillPathToRole } from "@/lib/queries/careerPath";
import { getDeveloperSkills, getSkillsInferredFromProjects } from "@/lib/queries/developer";
import { getMatchingRolesForDeveloper, getSkillGapForRole } from "@/lib/queries/role";
import type {
  CareerPathStep,
  CompanyNode,
  DeveloperSkill,
  RoleMatch,
  SkillGapEntry,
  SkillNode,
} from "@/lib/types/graph";

export function getDeveloperSkillProfile(developerId: string): Promise<DeveloperSkill[]> {
  return withReadSession((session) => getDeveloperSkills(session, developerId));
}

export function getDeveloperProjectSkills(developerId: string): Promise<SkillNode[]> {
  return withReadSession((session) => getSkillsInferredFromProjects(session, developerId));
}

export function getMatchingRoles(developerId: string): Promise<RoleMatch[]> {
  return withReadSession((session) => getMatchingRolesForDeveloper(session, developerId));
}

export function getRoleSkillGap(developerId: string, roleId: string): Promise<SkillGapEntry[]> {
  return withReadSession((session) => getSkillGapForRole(session, developerId, roleId));
}

export function getCompaniesForRole(roleId: string): Promise<CompanyNode[]> {
  return withReadSession((session) => getCompaniesOfferingRole(session, roleId));
}

export function getCareerPathToRole(
  developerId: string,
  roleId: string,
): Promise<CareerPathStep[] | null> {
  return withReadSession((session) => findSkillPathToRole(session, developerId, roleId));
}
