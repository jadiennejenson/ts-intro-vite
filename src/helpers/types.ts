// Discriminated union types for mixed entity storage
export type ProjectStatus = "planned" | "active" | "done";

export interface Project {
  id: string;
  kind: "project";
  createdAt: number;
  name: string;
  status: ProjectStatus;
  description?: string;
}

export interface Task {
  id: string;
  kind: "task";
  createdAt: number;
  projectId: string;
  title: string;
  completed: boolean;
}

export interface TeamMember {
  id: string;
  kind: "member";
  createdAt: number;
  fullName: string;
  role: "pm" | "dev" | "design";
  email?: string;
}

// Discriminated union type
export type AnyEntity = Project | Task | TeamMember;