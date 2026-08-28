import { withReadSession } from "@/lib/db/session";
import { getCompaniesOfferingRole } from "@/lib/queries/company";
import { findSkillPathToRole } from "@/lib/queries/careerPath";
import {
  getDeveloperById,
  getDeveloperProjects,
  getDeveloperSkills,
  getSkillsInferredFromProjects,
} from "@/lib/queries/developer";
import {
  getMatchingRolesForDeveloper,
  getRoleById,
  getRoleRequirements,
  getSkillGapForRole,
} from "@/lib/queries/role";
import type {
  CareerPath,
  CompanyNode,
  DeveloperNode,
  DeveloperSkill,
  DeveloperSkillEvidence,
  ProjectNode,
  RequiredSkill,
  RoleDetailForDeveloper,
  RoleMatchResult,
  RoleNode,
} from "@/lib/types/graph";

export function getDeveloperProfile(developerId: string): Promise<DeveloperNode | null> {
  return withReadSession((session) => getDeveloperById(session, developerId));
}

export function getDeveloperProjectList(developerId: string): Promise<ProjectNode[]> {
  return withReadSession((session) => getDeveloperProjects(session, developerId));
}

export function getDeveloperSkillProfile(developerId: string): Promise<DeveloperSkill[]> {
  return withReadSession((session) => getDeveloperSkills(session, developerId));
}

/**
 * Distinguishes skills a developer has declared (directSkills) from skills
 * only evidenced through project work (projectDerivedSkills). Project
 * evidence is never converted into a HAS_SKILL relationship — it is
 * evidence of exposure, not a claim of proficiency.
 */
export async function getDeveloperSkillEvidence(
  developerId: string,
): Promise<DeveloperSkillEvidence> {
  const [directSkills, projectDerivedSkills] = await Promise.all([
    withReadSession((session) => getDeveloperSkills(session, developerId)),
    withReadSession((session) => getSkillsInferredFromProjects(session, developerId)),
  ]);

  const directSkillIds = new Set(directSkills.map((skill) => skill.id));
  const projectDerivedOnlySkills = projectDerivedSkills.filter(
    (skill) => !directSkillIds.has(skill.id),
  );

  return { directSkills, projectDerivedSkills, projectDerivedOnlySkills };
}

function toMatchPercentage(matchedSkillCount: number, requiredSkillCount: number): number {
  if (requiredSkillCount === 0) {
    return 0;
  }
  return Math.round((matchedSkillCount / requiredSkillCount) * 100);
}

export async function getMatchingRoles(developerId: string): Promise<RoleMatchResult[]> {
  const roles = await withReadSession((session) =>
    getMatchingRolesForDeveloper(session, developerId),
  );

  return roles.map((role) => ({
    ...role,
    matchPercentage: toMatchPercentage(role.matchedSkillCount, role.requiredSkillCount),
    missingSkillCount: role.requiredSkillCount - role.matchedSkillCount,
  }));
}

export function getRoleProfile(roleId: string): Promise<RoleNode | null> {
  return withReadSession((session) => getRoleById(session, roleId));
}

export function getRoleRequiredSkills(roleId: string): Promise<RequiredSkill[]> {
  return withReadSession((session) => getRoleRequirements(session, roleId));
}

export function getCompaniesForRole(roleId: string): Promise<CompanyNode[]> {
  return withReadSession((session) => getCompaniesOfferingRole(session, roleId));
}

export async function getCareerPathToRole(
  developerId: string,
  roleId: string,
): Promise<CareerPath | null> {
  const steps = await withReadSession((session) =>
    findSkillPathToRole(session, developerId, roleId),
  );

  if (!steps || steps.length === 0) {
    return null;
  }

  return {
    startingSkill: steps[0],
    targetSkill: steps[steps.length - 1],
    steps,
    hopCount: steps.length - 1,
  };
}

/**
 * Composes the focused queries above into a single role-detail view for a
 * developer, rather than one large Cypher query. Returns null when the role
 * itself does not exist; the caller is responsible for checking the
 * developer exists separately.
 */
export async function getRoleDetailForDeveloper(
  developerId: string,
  roleId: string,
): Promise<RoleDetailForDeveloper | null> {
  const role = await getRoleProfile(roleId);
  if (!role) {
    return null;
  }

  const [requiredSkills, missingSkills, companies, careerPath, developerSkills] =
    await Promise.all([
      getRoleRequiredSkills(roleId),
      withReadSession((session) => getSkillGapForRole(session, developerId, roleId)),
      getCompaniesForRole(roleId),
      getCareerPathToRole(developerId, roleId),
      getDeveloperSkillProfile(developerId),
    ]);

  const developerSkillIds = new Set(developerSkills.map((skill) => skill.id));
  const missingSkillIds = new Set(missingSkills.map((skill) => skill.id));
  const matchedSkills = requiredSkills
    .filter((skill) => !missingSkillIds.has(skill.id) && developerSkillIds.has(skill.id))
    .map((skill) => ({ id: skill.id, name: skill.name }));

  return {
    role,
    requiredSkills,
    matchedSkills,
    missingSkills,
    matchPercentage: toMatchPercentage(matchedSkills.length, requiredSkills.length),
    companies,
    careerPath,
  };
}
