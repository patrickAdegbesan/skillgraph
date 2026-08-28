export interface DeveloperNode {
  id: string;
  name: string;
  title: string;
  bio: string;
}

export interface SkillNode {
  id: string;
  name: string;
  category: string;
}

export interface ProjectNode {
  id: string;
  name: string;
  description: string;
}

export interface RoleNode {
  id: string;
  title: string;
  seniority: string;
}

export interface CompanyNode {
  id: string;
  name: string;
  industry: string;
}

export type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";
export type SkillImportance = "nice-to-have" | "important" | "critical";

export interface HasSkillProperties {
  level: SkillLevel;
  years: number;
}

export interface RequiresProperties {
  minimumLevel: SkillLevel;
  importance: SkillImportance;
}

export interface DeveloperSkill extends SkillNode {
  level: SkillLevel;
  years: number;
}

export interface MatchedSkillRef {
  id: string;
  name: string;
}

export interface RoleMatchRaw extends RoleNode {
  matchedSkillCount: number;
  requiredSkillCount: number;
  matchedSkills: MatchedSkillRef[];
}

export interface RoleMatchResult extends RoleMatchRaw {
  matchPercentage: number;
  missingSkillCount: number;
}

export interface RequiredSkill extends SkillNode {
  minimumLevel: SkillLevel;
  importance: SkillImportance;
}

export type SkillGapEntry = RequiredSkill;

export interface CareerPathStep {
  id: string;
  name: string;
  kind: "Skill" | "Role";
}

export interface CareerPath {
  startingSkill: CareerPathStep;
  targetSkill: CareerPathStep;
  steps: CareerPathStep[];
  hopCount: number;
}

export interface DeveloperSkillEvidence {
  directSkills: DeveloperSkill[];
  projectDerivedSkills: SkillNode[];
  projectDerivedOnlySkills: SkillNode[];
}

export interface RoleDetailForDeveloper {
  role: RoleNode;
  requiredSkills: RequiredSkill[];
  matchedSkills: MatchedSkillRef[];
  missingSkills: RequiredSkill[];
  matchPercentage: number;
  companies: CompanyNode[];
  careerPath: CareerPath | null;
}
