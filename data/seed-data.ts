import type {
  CompanyNode,
  DeveloperNode,
  ProjectNode,
  RoleNode,
  SkillImportance,
  SkillLevel,
  SkillNode,
} from "@/lib/types/graph";

export const developers: DeveloperNode[] = [
  {
    id: "dev-patrick-adegbesan",
    name: "Patrick Adegbesan",
    title: "Full Stack Developer",
    bio: "Full stack developer focused on TypeScript, React and Python services.",
  },
  { id: "dev-amara-okafor", name: "Amara Okafor", title: "Backend Developer", bio: "Backend developer building Django and PostgreSQL services." },
  { id: "dev-liam-chen", name: "Liam Chen", title: "Frontend Developer", bio: "Frontend developer specializing in React and design systems." },
  { id: "dev-sofia-rossi", name: "Sofia Rossi", title: "DevOps Engineer", bio: "DevOps engineer working on Kubernetes and CI/CD pipelines." },
  { id: "dev-noah-kim", name: "Noah Kim", title: "Data Engineer", bio: "Data engineer building pipelines with Python and cloud data stores." },
  { id: "dev-yuki-tanaka", name: "Yuki Tanaka", title: "Machine Learning Engineer", bio: "ML engineer working on TensorFlow models and data pipelines." },
  { id: "dev-fatima-hassan", name: "Fatima Hassan", title: "Full Stack Developer", bio: "Full stack developer with Next.js and Node.js experience." },
  { id: "dev-carlos-mendes", name: "Carlos Mendes", title: "Cloud Architect", bio: "Cloud architect designing AWS and Azure infrastructure." },
  { id: "dev-elena-petrova", name: "Elena Petrova", title: "Backend Developer", bio: "Backend developer working with Java and Spring Boot services." },
  { id: "dev-james-okoro", name: "James Okoro", title: "Frontend Developer", bio: "Frontend developer building Vue.js and Angular applications." },
  { id: "dev-mia-nguyen", name: "Mia Nguyen", title: "Site Reliability Engineer", bio: "SRE focused on observability and Kubernetes reliability." },
  { id: "dev-daniel-osei", name: "Daniel Osei", title: "Junior Software Engineer", bio: "Junior engineer learning full stack development with JavaScript." },
  { id: "dev-priya-sharma", name: "Priya Sharma", title: "Data Engineer", bio: "Data engineer working with Go and distributed data systems." },
  { id: "dev-lucas-silva", name: "Lucas Silva", title: "Backend Developer", bio: "Backend developer with Rust and systems programming experience." },
  { id: "dev-hannah-schmidt", name: "Hannah Schmidt", title: "Full Stack Developer", bio: "Full stack developer working across .NET and React." },
  { id: "dev-omar-abdallah", name: "Omar Abdallah", title: "Senior Software Engineer", bio: "Senior engineer leading backend architecture decisions." },
  { id: "dev-grace-mensah", name: "Grace Mensah", title: "Engineering Manager", bio: "Engineering manager with a background in full stack delivery." },
  { id: "dev-ivan-petrov", name: "Ivan Petrov", title: "Machine Learning Engineer", bio: "ML engineer applying data engineering practices to model pipelines." },
];

export const skills: SkillNode[] = [
  { id: "skill-javascript", name: "JavaScript", category: "Language" },
  { id: "skill-typescript", name: "TypeScript", category: "Language" },
  { id: "skill-python", name: "Python", category: "Language" },
  { id: "skill-java", name: "Java", category: "Language" },
  { id: "skill-go", name: "Go", category: "Language" },
  { id: "skill-rust", name: "Rust", category: "Language" },
  { id: "skill-csharp", name: "C#", category: "Language" },
  { id: "skill-react", name: "React", category: "Framework" },
  { id: "skill-nextjs", name: "Next.js", category: "Framework" },
  { id: "skill-nodejs", name: "Node.js", category: "Framework" },
  { id: "skill-vuejs", name: "Vue.js", category: "Framework" },
  { id: "skill-angular", name: "Angular", category: "Framework" },
  { id: "skill-django", name: "Django", category: "Framework" },
  { id: "skill-flask", name: "Flask", category: "Framework" },
  { id: "skill-spring-boot", name: "Spring Boot", category: "Framework" },
  { id: "skill-dotnet", name: ".NET", category: "Framework" },
  { id: "skill-tailwind", name: "Tailwind CSS", category: "Framework" },
  { id: "skill-html", name: "HTML", category: "Language" },
  { id: "skill-css", name: "CSS", category: "Language" },
  { id: "skill-postgresql", name: "PostgreSQL", category: "Database" },
  { id: "skill-mongodb", name: "MongoDB", category: "Database" },
  { id: "skill-neo4j", name: "Neo4j", category: "Database" },
  { id: "skill-redis", name: "Redis", category: "Database" },
  { id: "skill-graphql", name: "GraphQL", category: "Concept" },
  { id: "skill-rest-apis", name: "REST APIs", category: "Concept" },
  { id: "skill-git", name: "Git", category: "Tool" },
  { id: "skill-docker", name: "Docker", category: "DevOps" },
  { id: "skill-kubernetes", name: "Kubernetes", category: "DevOps" },
  { id: "skill-ci-cd", name: "CI/CD", category: "DevOps" },
  { id: "skill-aws", name: "AWS", category: "Cloud" },
  { id: "skill-azure", name: "Azure", category: "Cloud" },
  { id: "skill-system-design", name: "System Design", category: "Concept" },
  { id: "skill-data-engineering", name: "Data Engineering", category: "Concept" },
  { id: "skill-machine-learning", name: "Machine Learning", category: "Concept" },
  { id: "skill-tensorflow", name: "TensorFlow", category: "Framework" },
];

export const projects: ProjectNode[] = [
  { id: "project-skillgraph", name: "SkillGraph", description: "Graph-powered career and skill path explorer." },
  { id: "project-inventory-service", name: "Inventory Service", description: "Django and PostgreSQL inventory management API." },
  { id: "project-design-system", name: "Component Design System", description: "Shared React component library with Tailwind CSS." },
  { id: "project-deploy-pipeline", name: "Deploy Pipeline", description: "Kubernetes-based CI/CD deployment pipeline." },
  { id: "project-events-lakehouse", name: "Events Lakehouse", description: "Python data pipeline feeding an analytics lakehouse." },
  { id: "project-churn-predictor", name: "Churn Predictor", description: "TensorFlow model predicting customer churn." },
  { id: "project-storefront", name: "Storefront App", description: "Next.js and Node.js e-commerce storefront." },
  { id: "project-cloud-migration", name: "Cloud Migration", description: "AWS and Azure infrastructure migration project." },
  { id: "project-billing-service", name: "Billing Service", description: "Java and Spring Boot billing microservice." },
  { id: "project-admin-dashboard", name: "Admin Dashboard", description: "Vue.js and Angular hybrid admin dashboard." },
  { id: "project-observability-stack", name: "Observability Stack", description: "Kubernetes reliability and monitoring stack." },
  { id: "project-learning-tracker", name: "Learning Tracker", description: "JavaScript app tracking personal learning goals." },
  { id: "project-realtime-analytics", name: "Realtime Analytics", description: "Go-based distributed analytics pipeline." },
  { id: "project-media-transcoder", name: "Media Transcoder", description: "Rust systems service for media transcoding." },
  { id: "project-crm-suite", name: "CRM Suite", description: ".NET and React customer relationship management suite." },
  { id: "project-api-gateway", name: "API Gateway", description: "System design of a company-wide REST API gateway." },
  { id: "project-team-portal", name: "Team Portal", description: "Full stack internal team portal built with React and Node.js." },
  { id: "project-recommendation-engine", name: "Recommendation Engine", description: "Machine learning recommendation engine with data engineering support." },
];

export const roles: RoleNode[] = [
  { id: "role-frontend-developer", title: "Frontend Developer", seniority: "Mid" },
  { id: "role-backend-developer", title: "Backend Developer", seniority: "Mid" },
  { id: "role-full-stack-developer", title: "Full Stack Developer", seniority: "Mid" },
  { id: "role-devops-engineer", title: "DevOps Engineer", seniority: "Mid" },
  { id: "role-data-engineer", title: "Data Engineer", seniority: "Mid" },
  { id: "role-ml-engineer", title: "Machine Learning Engineer", seniority: "Mid" },
  { id: "role-cloud-architect", title: "Cloud Architect", seniority: "Senior" },
  { id: "role-sre", title: "Site Reliability Engineer", seniority: "Mid" },
  { id: "role-engineering-manager", title: "Engineering Manager", seniority: "Senior" },
  { id: "role-junior-software-engineer", title: "Junior Software Engineer", seniority: "Junior" },
  { id: "role-senior-software-engineer", title: "Senior Software Engineer", seniority: "Senior" },
  { id: "role-platform-engineer", title: "Platform Engineer", seniority: "Mid" },
];

export const companies: CompanyNode[] = [
  { id: "company-technova", name: "TechNova", industry: "Enterprise Software" },
  { id: "company-wexa-ai", name: "Wexa AI", industry: "Artificial Intelligence" },
  { id: "company-cloudforge", name: "CloudForge", industry: "Cloud Infrastructure" },
  { id: "company-datasphere", name: "DataSphere", industry: "Data Platforms" },
  { id: "company-pixelworks", name: "PixelWorks", industry: "Consumer Software" },
  { id: "company-scaleup-systems", name: "ScaleUp Systems", industry: "DevOps Tooling" },
  { id: "company-northwind-digital", name: "Northwind Digital", industry: "Digital Agency" },
  { id: "company-vertex-labs", name: "Vertex Labs", industry: "Machine Learning" },
  { id: "company-meridian-software", name: "Meridian Software", industry: "Enterprise Software" },
];

interface DeveloperSkillSeed {
  developerId: string;
  skillId: string;
  level: SkillLevel;
  years: number;
}

export const developerSkills: DeveloperSkillSeed[] = [
  { developerId: "dev-patrick-adegbesan", skillId: "skill-javascript", level: "advanced", years: 4 },
  { developerId: "dev-patrick-adegbesan", skillId: "skill-typescript", level: "advanced", years: 3 },
  { developerId: "dev-patrick-adegbesan", skillId: "skill-react", level: "advanced", years: 4 },
  { developerId: "dev-patrick-adegbesan", skillId: "skill-nextjs", level: "intermediate", years: 2 },
  { developerId: "dev-patrick-adegbesan", skillId: "skill-python", level: "advanced", years: 3 },
  { developerId: "dev-patrick-adegbesan", skillId: "skill-django", level: "intermediate", years: 2 },
  { developerId: "dev-patrick-adegbesan", skillId: "skill-postgresql", level: "intermediate", years: 3 },
  { developerId: "dev-patrick-adegbesan", skillId: "skill-git", level: "advanced", years: 5 },

  { developerId: "dev-amara-okafor", skillId: "skill-python", level: "advanced", years: 5 },
  { developerId: "dev-amara-okafor", skillId: "skill-django", level: "advanced", years: 5 },
  { developerId: "dev-amara-okafor", skillId: "skill-postgresql", level: "advanced", years: 4 },
  { developerId: "dev-amara-okafor", skillId: "skill-rest-apis", level: "advanced", years: 5 },
  { developerId: "dev-amara-okafor", skillId: "skill-git", level: "advanced", years: 6 },

  { developerId: "dev-liam-chen", skillId: "skill-javascript", level: "advanced", years: 5 },
  { developerId: "dev-liam-chen", skillId: "skill-react", level: "expert", years: 5 },
  { developerId: "dev-liam-chen", skillId: "skill-tailwind", level: "advanced", years: 3 },
  { developerId: "dev-liam-chen", skillId: "skill-html", level: "expert", years: 6 },
  { developerId: "dev-liam-chen", skillId: "skill-css", level: "expert", years: 6 },

  { developerId: "dev-sofia-rossi", skillId: "skill-docker", level: "advanced", years: 4 },
  { developerId: "dev-sofia-rossi", skillId: "skill-kubernetes", level: "advanced", years: 3 },
  { developerId: "dev-sofia-rossi", skillId: "skill-ci-cd", level: "advanced", years: 4 },
  { developerId: "dev-sofia-rossi", skillId: "skill-aws", level: "intermediate", years: 3 },
  { developerId: "dev-sofia-rossi", skillId: "skill-git", level: "advanced", years: 5 },

  { developerId: "dev-noah-kim", skillId: "skill-python", level: "advanced", years: 4 },
  { developerId: "dev-noah-kim", skillId: "skill-data-engineering", level: "advanced", years: 4 },
  { developerId: "dev-noah-kim", skillId: "skill-postgresql", level: "advanced", years: 4 },
  { developerId: "dev-noah-kim", skillId: "skill-aws", level: "intermediate", years: 2 },

  { developerId: "dev-yuki-tanaka", skillId: "skill-python", level: "advanced", years: 5 },
  { developerId: "dev-yuki-tanaka", skillId: "skill-machine-learning", level: "advanced", years: 4 },
  { developerId: "dev-yuki-tanaka", skillId: "skill-tensorflow", level: "advanced", years: 3 },
  { developerId: "dev-yuki-tanaka", skillId: "skill-data-engineering", level: "intermediate", years: 2 },

  { developerId: "dev-fatima-hassan", skillId: "skill-javascript", level: "advanced", years: 4 },
  { developerId: "dev-fatima-hassan", skillId: "skill-typescript", level: "intermediate", years: 2 },
  { developerId: "dev-fatima-hassan", skillId: "skill-nextjs", level: "advanced", years: 3 },
  { developerId: "dev-fatima-hassan", skillId: "skill-nodejs", level: "advanced", years: 4 },
  { developerId: "dev-fatima-hassan", skillId: "skill-mongodb", level: "intermediate", years: 2 },

  { developerId: "dev-carlos-mendes", skillId: "skill-aws", level: "expert", years: 6 },
  { developerId: "dev-carlos-mendes", skillId: "skill-azure", level: "advanced", years: 4 },
  { developerId: "dev-carlos-mendes", skillId: "skill-system-design", level: "expert", years: 6 },
  { developerId: "dev-carlos-mendes", skillId: "skill-kubernetes", level: "advanced", years: 4 },

  { developerId: "dev-elena-petrova", skillId: "skill-java", level: "advanced", years: 6 },
  { developerId: "dev-elena-petrova", skillId: "skill-spring-boot", level: "advanced", years: 5 },
  { developerId: "dev-elena-petrova", skillId: "skill-postgresql", level: "intermediate", years: 4 },
  { developerId: "dev-elena-petrova", skillId: "skill-rest-apis", level: "advanced", years: 6 },

  { developerId: "dev-james-okoro", skillId: "skill-javascript", level: "advanced", years: 4 },
  { developerId: "dev-james-okoro", skillId: "skill-vuejs", level: "advanced", years: 3 },
  { developerId: "dev-james-okoro", skillId: "skill-angular", level: "intermediate", years: 2 },
  { developerId: "dev-james-okoro", skillId: "skill-css", level: "advanced", years: 4 },

  { developerId: "dev-mia-nguyen", skillId: "skill-kubernetes", level: "expert", years: 5 },
  { developerId: "dev-mia-nguyen", skillId: "skill-docker", level: "advanced", years: 5 },
  { developerId: "dev-mia-nguyen", skillId: "skill-system-design", level: "advanced", years: 4 },
  { developerId: "dev-mia-nguyen", skillId: "skill-ci-cd", level: "advanced", years: 4 },

  { developerId: "dev-daniel-osei", skillId: "skill-javascript", level: "beginner", years: 1 },
  { developerId: "dev-daniel-osei", skillId: "skill-html", level: "intermediate", years: 1 },
  { developerId: "dev-daniel-osei", skillId: "skill-css", level: "intermediate", years: 1 },
  { developerId: "dev-daniel-osei", skillId: "skill-git", level: "beginner", years: 1 },

  { developerId: "dev-priya-sharma", skillId: "skill-go", level: "advanced", years: 3 },
  { developerId: "dev-priya-sharma", skillId: "skill-data-engineering", level: "advanced", years: 4 },
  { developerId: "dev-priya-sharma", skillId: "skill-postgresql", level: "intermediate", years: 3 },
  { developerId: "dev-priya-sharma", skillId: "skill-aws", level: "intermediate", years: 2 },

  { developerId: "dev-lucas-silva", skillId: "skill-rust", level: "advanced", years: 3 },
  { developerId: "dev-lucas-silva", skillId: "skill-system-design", level: "intermediate", years: 3 },
  { developerId: "dev-lucas-silva", skillId: "skill-git", level: "advanced", years: 4 },

  { developerId: "dev-hannah-schmidt", skillId: "skill-csharp", level: "advanced", years: 4 },
  { developerId: "dev-hannah-schmidt", skillId: "skill-dotnet", level: "advanced", years: 4 },
  { developerId: "dev-hannah-schmidt", skillId: "skill-react", level: "intermediate", years: 2 },

  { developerId: "dev-omar-abdallah", skillId: "skill-python", level: "expert", years: 8 },
  { developerId: "dev-omar-abdallah", skillId: "skill-system-design", level: "expert", years: 7 },
  { developerId: "dev-omar-abdallah", skillId: "skill-postgresql", level: "advanced", years: 6 },
  { developerId: "dev-omar-abdallah", skillId: "skill-rest-apis", level: "expert", years: 7 },

  { developerId: "dev-grace-mensah", skillId: "skill-javascript", level: "advanced", years: 6 },
  { developerId: "dev-grace-mensah", skillId: "skill-system-design", level: "advanced", years: 5 },
  { developerId: "dev-grace-mensah", skillId: "skill-react", level: "intermediate", years: 4 },

  { developerId: "dev-ivan-petrov", skillId: "skill-python", level: "advanced", years: 4 },
  { developerId: "dev-ivan-petrov", skillId: "skill-machine-learning", level: "intermediate", years: 2 },
  { developerId: "dev-ivan-petrov", skillId: "skill-data-engineering", level: "advanced", years: 4 },
];

interface DeveloperProjectSeed {
  developerId: string;
  projectId: string;
}

export const developerProjects: DeveloperProjectSeed[] = [
  { developerId: "dev-patrick-adegbesan", projectId: "project-skillgraph" },
  { developerId: "dev-patrick-adegbesan", projectId: "project-team-portal" },
  { developerId: "dev-amara-okafor", projectId: "project-inventory-service" },
  { developerId: "dev-liam-chen", projectId: "project-design-system" },
  { developerId: "dev-sofia-rossi", projectId: "project-deploy-pipeline" },
  { developerId: "dev-noah-kim", projectId: "project-events-lakehouse" },
  { developerId: "dev-yuki-tanaka", projectId: "project-churn-predictor" },
  { developerId: "dev-fatima-hassan", projectId: "project-storefront" },
  { developerId: "dev-carlos-mendes", projectId: "project-cloud-migration" },
  { developerId: "dev-elena-petrova", projectId: "project-billing-service" },
  { developerId: "dev-james-okoro", projectId: "project-admin-dashboard" },
  { developerId: "dev-mia-nguyen", projectId: "project-observability-stack" },
  { developerId: "dev-daniel-osei", projectId: "project-learning-tracker" },
  { developerId: "dev-priya-sharma", projectId: "project-realtime-analytics" },
  { developerId: "dev-lucas-silva", projectId: "project-media-transcoder" },
  { developerId: "dev-hannah-schmidt", projectId: "project-crm-suite" },
  { developerId: "dev-omar-abdallah", projectId: "project-api-gateway" },
  { developerId: "dev-grace-mensah", projectId: "project-team-portal" },
  { developerId: "dev-ivan-petrov", projectId: "project-recommendation-engine" },
];

interface ProjectSkillSeed {
  projectId: string;
  skillId: string;
}

export const projectSkills: ProjectSkillSeed[] = [
  { projectId: "project-skillgraph", skillId: "skill-typescript" },
  { projectId: "project-skillgraph", skillId: "skill-nextjs" },
  { projectId: "project-skillgraph", skillId: "skill-neo4j" },
  { projectId: "project-skillgraph", skillId: "skill-tailwind" },

  { projectId: "project-inventory-service", skillId: "skill-python" },
  { projectId: "project-inventory-service", skillId: "skill-django" },
  { projectId: "project-inventory-service", skillId: "skill-postgresql" },
  { projectId: "project-inventory-service", skillId: "skill-rest-apis" },

  { projectId: "project-design-system", skillId: "skill-javascript" },
  { projectId: "project-design-system", skillId: "skill-react" },
  { projectId: "project-design-system", skillId: "skill-tailwind" },

  { projectId: "project-deploy-pipeline", skillId: "skill-docker" },
  { projectId: "project-deploy-pipeline", skillId: "skill-kubernetes" },
  { projectId: "project-deploy-pipeline", skillId: "skill-ci-cd" },

  { projectId: "project-events-lakehouse", skillId: "skill-python" },
  { projectId: "project-events-lakehouse", skillId: "skill-data-engineering" },
  { projectId: "project-events-lakehouse", skillId: "skill-aws" },

  { projectId: "project-churn-predictor", skillId: "skill-python" },
  { projectId: "project-churn-predictor", skillId: "skill-machine-learning" },
  { projectId: "project-churn-predictor", skillId: "skill-tensorflow" },

  { projectId: "project-storefront", skillId: "skill-nextjs" },
  { projectId: "project-storefront", skillId: "skill-nodejs" },
  { projectId: "project-storefront", skillId: "skill-mongodb" },

  { projectId: "project-cloud-migration", skillId: "skill-aws" },
  { projectId: "project-cloud-migration", skillId: "skill-azure" },
  { projectId: "project-cloud-migration", skillId: "skill-system-design" },

  { projectId: "project-billing-service", skillId: "skill-java" },
  { projectId: "project-billing-service", skillId: "skill-spring-boot" },
  { projectId: "project-billing-service", skillId: "skill-postgresql" },

  { projectId: "project-admin-dashboard", skillId: "skill-vuejs" },
  { projectId: "project-admin-dashboard", skillId: "skill-angular" },
  { projectId: "project-admin-dashboard", skillId: "skill-css" },

  { projectId: "project-observability-stack", skillId: "skill-kubernetes" },
  { projectId: "project-observability-stack", skillId: "skill-docker" },
  { projectId: "project-observability-stack", skillId: "skill-system-design" },

  { projectId: "project-learning-tracker", skillId: "skill-javascript" },
  { projectId: "project-learning-tracker", skillId: "skill-html" },
  { projectId: "project-learning-tracker", skillId: "skill-css" },

  { projectId: "project-realtime-analytics", skillId: "skill-go" },
  { projectId: "project-realtime-analytics", skillId: "skill-data-engineering" },

  { projectId: "project-media-transcoder", skillId: "skill-rust" },
  { projectId: "project-media-transcoder", skillId: "skill-system-design" },

  { projectId: "project-crm-suite", skillId: "skill-csharp" },
  { projectId: "project-crm-suite", skillId: "skill-dotnet" },
  { projectId: "project-crm-suite", skillId: "skill-react" },

  { projectId: "project-api-gateway", skillId: "skill-python" },
  { projectId: "project-api-gateway", skillId: "skill-system-design" },
  { projectId: "project-api-gateway", skillId: "skill-rest-apis" },

  { projectId: "project-team-portal", skillId: "skill-react" },
  { projectId: "project-team-portal", skillId: "skill-nodejs" },
  { projectId: "project-team-portal", skillId: "skill-typescript" },

  { projectId: "project-recommendation-engine", skillId: "skill-python" },
  { projectId: "project-recommendation-engine", skillId: "skill-machine-learning" },
  { projectId: "project-recommendation-engine", skillId: "skill-data-engineering" },
];

interface RoleSkillSeed {
  roleId: string;
  skillId: string;
  minimumLevel: SkillLevel;
  importance: SkillImportance;
}

export const roleSkills: RoleSkillSeed[] = [
  { roleId: "role-frontend-developer", skillId: "skill-javascript", minimumLevel: "intermediate", importance: "critical" },
  { roleId: "role-frontend-developer", skillId: "skill-react", minimumLevel: "intermediate", importance: "critical" },
  { roleId: "role-frontend-developer", skillId: "skill-html", minimumLevel: "intermediate", importance: "important" },
  { roleId: "role-frontend-developer", skillId: "skill-css", minimumLevel: "intermediate", importance: "important" },
  { roleId: "role-frontend-developer", skillId: "skill-typescript", minimumLevel: "beginner", importance: "nice-to-have" },

  { roleId: "role-backend-developer", skillId: "skill-python", minimumLevel: "intermediate", importance: "critical" },
  { roleId: "role-backend-developer", skillId: "skill-postgresql", minimumLevel: "intermediate", importance: "critical" },
  { roleId: "role-backend-developer", skillId: "skill-rest-apis", minimumLevel: "intermediate", importance: "important" },
  { roleId: "role-backend-developer", skillId: "skill-django", minimumLevel: "beginner", importance: "nice-to-have" },

  { roleId: "role-full-stack-developer", skillId: "skill-typescript", minimumLevel: "intermediate", importance: "critical" },
  { roleId: "role-full-stack-developer", skillId: "skill-react", minimumLevel: "intermediate", importance: "critical" },
  { roleId: "role-full-stack-developer", skillId: "skill-nextjs", minimumLevel: "beginner", importance: "important" },
  { roleId: "role-full-stack-developer", skillId: "skill-nodejs", minimumLevel: "intermediate", importance: "important" },
  { roleId: "role-full-stack-developer", skillId: "skill-postgresql", minimumLevel: "beginner", importance: "nice-to-have" },

  { roleId: "role-devops-engineer", skillId: "skill-docker", minimumLevel: "intermediate", importance: "critical" },
  { roleId: "role-devops-engineer", skillId: "skill-kubernetes", minimumLevel: "intermediate", importance: "critical" },
  { roleId: "role-devops-engineer", skillId: "skill-ci-cd", minimumLevel: "intermediate", importance: "important" },
  { roleId: "role-devops-engineer", skillId: "skill-aws", minimumLevel: "beginner", importance: "important" },

  { roleId: "role-data-engineer", skillId: "skill-python", minimumLevel: "intermediate", importance: "critical" },
  { roleId: "role-data-engineer", skillId: "skill-data-engineering", minimumLevel: "intermediate", importance: "critical" },
  { roleId: "role-data-engineer", skillId: "skill-postgresql", minimumLevel: "intermediate", importance: "important" },
  { roleId: "role-data-engineer", skillId: "skill-aws", minimumLevel: "beginner", importance: "nice-to-have" },

  { roleId: "role-ml-engineer", skillId: "skill-python", minimumLevel: "advanced", importance: "critical" },
  { roleId: "role-ml-engineer", skillId: "skill-machine-learning", minimumLevel: "intermediate", importance: "critical" },
  { roleId: "role-ml-engineer", skillId: "skill-tensorflow", minimumLevel: "intermediate", importance: "important" },
  { roleId: "role-ml-engineer", skillId: "skill-data-engineering", minimumLevel: "beginner", importance: "nice-to-have" },

  { roleId: "role-cloud-architect", skillId: "skill-aws", minimumLevel: "advanced", importance: "critical" },
  { roleId: "role-cloud-architect", skillId: "skill-azure", minimumLevel: "intermediate", importance: "important" },
  { roleId: "role-cloud-architect", skillId: "skill-system-design", minimumLevel: "advanced", importance: "critical" },
  { roleId: "role-cloud-architect", skillId: "skill-kubernetes", minimumLevel: "intermediate", importance: "important" },

  { roleId: "role-sre", skillId: "skill-kubernetes", minimumLevel: "advanced", importance: "critical" },
  { roleId: "role-sre", skillId: "skill-docker", minimumLevel: "intermediate", importance: "important" },
  { roleId: "role-sre", skillId: "skill-system-design", minimumLevel: "intermediate", importance: "important" },
  { roleId: "role-sre", skillId: "skill-ci-cd", minimumLevel: "intermediate", importance: "nice-to-have" },

  { roleId: "role-engineering-manager", skillId: "skill-system-design", minimumLevel: "advanced", importance: "critical" },
  { roleId: "role-engineering-manager", skillId: "skill-javascript", minimumLevel: "intermediate", importance: "nice-to-have" },
  { roleId: "role-engineering-manager", skillId: "skill-react", minimumLevel: "beginner", importance: "nice-to-have" },

  { roleId: "role-junior-software-engineer", skillId: "skill-javascript", minimumLevel: "beginner", importance: "critical" },
  { roleId: "role-junior-software-engineer", skillId: "skill-git", minimumLevel: "beginner", importance: "important" },
  { roleId: "role-junior-software-engineer", skillId: "skill-html", minimumLevel: "beginner", importance: "important" },
  { roleId: "role-junior-software-engineer", skillId: "skill-css", minimumLevel: "beginner", importance: "nice-to-have" },

  { roleId: "role-senior-software-engineer", skillId: "skill-system-design", minimumLevel: "advanced", importance: "critical" },
  { roleId: "role-senior-software-engineer", skillId: "skill-python", minimumLevel: "advanced", importance: "important" },
  { roleId: "role-senior-software-engineer", skillId: "skill-rest-apis", minimumLevel: "advanced", importance: "important" },

  { roleId: "role-platform-engineer", skillId: "skill-kubernetes", minimumLevel: "intermediate", importance: "critical" },
  { roleId: "role-platform-engineer", skillId: "skill-docker", minimumLevel: "intermediate", importance: "critical" },
  { roleId: "role-platform-engineer", skillId: "skill-aws", minimumLevel: "intermediate", importance: "important" },
  { roleId: "role-platform-engineer", skillId: "skill-ci-cd", minimumLevel: "intermediate", importance: "important" },
];

interface CompanyRoleSeed {
  companyId: string;
  roleId: string;
}

export const companyRoles: CompanyRoleSeed[] = [
  { companyId: "company-technova", roleId: "role-full-stack-developer" },
  { companyId: "company-technova", roleId: "role-frontend-developer" },
  { companyId: "company-technova", roleId: "role-junior-software-engineer" },
  { companyId: "company-wexa-ai", roleId: "role-ml-engineer" },
  { companyId: "company-wexa-ai", roleId: "role-data-engineer" },
  { companyId: "company-wexa-ai", roleId: "role-full-stack-developer" },
  { companyId: "company-cloudforge", roleId: "role-cloud-architect" },
  { companyId: "company-cloudforge", roleId: "role-devops-engineer" },
  { companyId: "company-cloudforge", roleId: "role-platform-engineer" },
  { companyId: "company-datasphere", roleId: "role-data-engineer" },
  { companyId: "company-datasphere", roleId: "role-ml-engineer" },
  { companyId: "company-pixelworks", roleId: "role-frontend-developer" },
  { companyId: "company-pixelworks", roleId: "role-full-stack-developer" },
  { companyId: "company-scaleup-systems", roleId: "role-devops-engineer" },
  { companyId: "company-scaleup-systems", roleId: "role-sre" },
  { companyId: "company-scaleup-systems", roleId: "role-platform-engineer" },
  { companyId: "company-northwind-digital", roleId: "role-frontend-developer" },
  { companyId: "company-northwind-digital", roleId: "role-backend-developer" },
  { companyId: "company-vertex-labs", roleId: "role-ml-engineer" },
  { companyId: "company-vertex-labs", roleId: "role-senior-software-engineer" },
  { companyId: "company-meridian-software", roleId: "role-backend-developer" },
  { companyId: "company-meridian-software", roleId: "role-engineering-manager" },
  { companyId: "company-meridian-software", roleId: "role-senior-software-engineer" },
];

interface SkillRelationSeed {
  fromSkillId: string;
  toSkillId: string;
}

export const skillRelations: SkillRelationSeed[] = [
  { fromSkillId: "skill-javascript", toSkillId: "skill-typescript" },
  { fromSkillId: "skill-typescript", toSkillId: "skill-react" },
  { fromSkillId: "skill-react", toSkillId: "skill-nextjs" },
  { fromSkillId: "skill-nextjs", toSkillId: "skill-nodejs" },
  { fromSkillId: "skill-react", toSkillId: "skill-vuejs" },
  { fromSkillId: "skill-vuejs", toSkillId: "skill-angular" },
  { fromSkillId: "skill-python", toSkillId: "skill-django" },
  { fromSkillId: "skill-django", toSkillId: "skill-flask" },
  { fromSkillId: "skill-python", toSkillId: "skill-data-engineering" },
  { fromSkillId: "skill-data-engineering", toSkillId: "skill-machine-learning" },
  { fromSkillId: "skill-machine-learning", toSkillId: "skill-tensorflow" },
  { fromSkillId: "skill-java", toSkillId: "skill-spring-boot" },
  { fromSkillId: "skill-csharp", toSkillId: "skill-dotnet" },
  { fromSkillId: "skill-docker", toSkillId: "skill-kubernetes" },
  { fromSkillId: "skill-kubernetes", toSkillId: "skill-ci-cd" },
  { fromSkillId: "skill-ci-cd", toSkillId: "skill-aws" },
  { fromSkillId: "skill-aws", toSkillId: "skill-azure" },
  { fromSkillId: "skill-aws", toSkillId: "skill-system-design" },
  { fromSkillId: "skill-postgresql", toSkillId: "skill-mongodb" },
  { fromSkillId: "skill-postgresql", toSkillId: "skill-redis" },
  { fromSkillId: "skill-postgresql", toSkillId: "skill-neo4j" },
  { fromSkillId: "skill-rest-apis", toSkillId: "skill-graphql" },
  { fromSkillId: "skill-html", toSkillId: "skill-css" },
  { fromSkillId: "skill-css", toSkillId: "skill-tailwind" },
  { fromSkillId: "skill-go", toSkillId: "skill-system-design" },
  { fromSkillId: "skill-rust", toSkillId: "skill-system-design" },
];
