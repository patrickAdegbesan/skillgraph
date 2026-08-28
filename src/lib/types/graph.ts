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

export interface RoleMatch extends RoleNode {
  matchedSkillCount: number;
  requiredSkillCount: number;
}

export interface SkillGapEntry extends SkillNode {
  minimumLevel: SkillLevel;
  importance: SkillImportance;
}

export interface CareerPathStep {
  id: string;
  name: string;
  kind: "Skill" | "Role";
}
