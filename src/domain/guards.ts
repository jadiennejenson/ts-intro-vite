import type { Entity, Project, Task, TeamMember } from "./types";

export function isProject(e: Entity): e is Project {
  return e.entityType === "project";
}

export function isTask(e: Entity): e is Task {
  return e.entityType === "task";
}

export function isMember(e: Entity): e is TeamMember {
  return e.entityType === "member";
}