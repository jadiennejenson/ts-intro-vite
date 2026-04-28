import { createCrudStore } from "./createCrudStore";
import type { Project, Task, TeamMember } from "../domain/types";

export function makeId(prefix: string) {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

const now = Date.now();
//our initial seed data for the stores, which can be modified or expanded as needed. 
// This provides a starting point for testing and development.
const seedProjects: Project[] = [
  {
    id: "project_alpha",
    createdAt: now,
    entityType: "project",
    name: "Alpha Launch",
    description: "Ship MVP to stakeholders",
    dueDate: "2026-02-15",
  },
];

const seedMembers: TeamMember[] = [
  {
    id: "member_jen",
    createdAt: now,
    entityType: "member",
    fullName: "Jen Park",
    role: "pm",
    email: "jen@example.com",
  },
  {
    id: "member_mo",
    createdAt: now,
    entityType: "member",
    fullName: "Mo Rivera",
    role: "dev",
    email: "mo@example.com",
  },
];

const seedTasks: Task[] = [
  {
    id: "task_1",
    createdAt: now,
    entityType: "task",
    projectId: "project_alpha",
    title: "Set up repo and CI",
    status: "in_progress",
    assigneeId: "member_mo",
  },
];

export const projectStore = createCrudStore<Project>(seedProjects);
export const taskStore = createCrudStore<Task>(seedTasks);
export const memberStore = createCrudStore<TeamMember>(seedMembers);