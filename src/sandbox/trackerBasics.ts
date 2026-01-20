// src/trackerBasics.ts

// A project ID should not change once created
const projectId = "PRJ-101";
const ownerEmail: string = "sam@company.com";
const maxCollaborators: number = 10;
const isArchived: boolean = false;

// These values might change as the project evolves
let projectName = "Website Redesign";
let taskCount = 3;
let isActive = true;

let lastSyncedAt: Date | undefined = undefined;

// A value that is intentionally empty (e.g., no description provided)
let projectDescription: string | null = null;

let foo

let completedTasks = 1;
completedTasks = completedTasks + 1; // OK

// When starting "empty", annotate your intent
let priority: "low" | "medium" | "high" = "medium";
priority = "high"; // OK
// priority = "urgent"; // ❌ Error: Type '"urgent"' is not assignable to type '"low" | "medium" | "high"'.



console.log({ projectId, projectName, taskCount, isActive });
console.log({ ownerEmail, maxCollaborators, isArchived, lastSyncedAt, projectDescription });
console.log({ completedTasks, priority });
// Try this on purpose (then undo it):
// projectId = "PRJ-999"; // ❌ Error: Cannot assign to 'projectId' because it is a constant.

// Tracker-style calculations
const totalTasks: number = 12;
const doneTasks: number = 5;

const percentComplete: number = Math.round((doneTasks / totalTasks) * 100);
const statusLabel: string = isActive ? "Active" : "Paused";

const summaryLine: string = `${projectName} (${statusLabel}) - ${percentComplete}% complete`;
console.log(summaryLine);

export const trackerCard = {
  projectId,
  projectName,
  taskCount,
  isActive,
  priority,
};
