export type EntityType = "project" | "task" | "member";

export type Id = string;

export type BaseEntity = {
  id: Id;
  createdAt: number; // epoch ms
  entityType: EntityType;
};

export type Project = BaseEntity & {
  entityType: "project";
  name: string;
  description: string;
  dueDate: string; // ISO date string (YYYY-MM-DD)
};

export type TaskStatus = "todo" | "in_progress" | "done";

export type Task = BaseEntity & {
  entityType: "task";
  projectId: Id;
  title: string;
  status: TaskStatus;
  assigneeId?: Id;
};

export type MemberRole = "pm" | "dev" | "designer";

export type TeamMember = BaseEntity & {
  entityType: "member";
  fullName: string;
  role: MemberRole;
  email: string;
};

export type Entity = Project | Task | TeamMember;

// Helpful mapped type: given an entityType, get the corresponding type
export type EntityByType = {
  project: Project;
  task: Task;
  member: TeamMember;
};