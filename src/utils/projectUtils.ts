// src/utils/projectUtils.ts
import type { Project, ProjectStatus, } from "../models/project";


export function getProjectsByStatus(
  projects: Project[],
  status: ProjectStatus
): Project[] {
  return projects.filter((p) => p.status === status);
}

export function countByStatus(
  projects: Project[],
  status: ProjectStatus
): number {
  return getProjectsByStatus(projects, status).length;
}

export function formatDueDate(project: Project): string {
  // Optional property: we must handle the "missing" case
  if (!project.dueDate) return "No due date";
  return project.dueDate;
}
export function upcomingDeadlines(projects: Project[]): Project[] {
  // Business rule: only projects that actually have a due date belong here
  return projects.filter((p) => p.dueDate !== undefined);
}

export function printDueDateUnsafe(project: Project): string {
  // Deliberate optional-property mistake (uncomment to see the error):
  // return project.dueDate.toUpperCase();
  // Error: Object is possibly 'undefined'.

  // Correct approach:
  return project.dueDate ? project.dueDate.toUpperCase() : "NO DUE DATE";
}

// Arrow function + explicit return type.
// Returns undefined if not found.
export const findProjectById = (
  projects: Project[],
  id: string
): Project | undefined => {
  return projects.find((p) => p.id === id);
};

const toTime = (isoDate: string): number => new Date(isoDate).getTime();

// Converts an ISO date string like "2025-10-01" into a number for comparison.
// Returns NaN if the date string is invalid.
export const listOverdueProjects = (
  projects: Project[],
  asOf: Date = new Date()
): Project[] => {
  const asOfTime = asOf.getTime();

  return projects.filter((p) => {
    // Type narrowing: if dueDate is missing, this is not overdue.
    if (!p.dueDate) return false;

    const dueTime = toTime(p.dueDate);
    // Basic error handling: ignore invalid dates rather than crashing.
    if (Number.isNaN(dueTime)) return false;

    return dueTime < asOfTime && p.status !== "done";
  });
};