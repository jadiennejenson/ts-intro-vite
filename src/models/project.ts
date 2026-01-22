export type ProjectStatus = "blocked" | "draft" | "active" | "paused" | "done" | "completed";

export type StatusInput = ProjectStatus | string | null | undefined;

export interface Project {
  /** A stable identifier we never want to accidentally change */
  readonly id: string;

  /** Human-friendly name shown in the UI */
  name: string;

  /** Current workflow status */
  status: ProjectStatus;

  /** ISO date string (e.g., 2025-01-15). Optional because not all projects have a deadline yet. */
  dueDate?: string;

  /** Tags are a list, so we use an array type */
  tags: string[];

  /** Optional free-form notes */
  notes?: string;
}

const allowedStatuses: readonly ProjectStatus[] = [
  "draft",
  "active",
  "paused",
  "completed",
] as const;


export function normalizeStatus(input: StatusInput): ProjectStatus | null {
  // Handle null/undefined early
  if (input == null) return null;

  // If it's already a ProjectStatus, it's safe.
  // But at runtime it's still just a string, so we validate with a list.
  if (typeof input === "string") {
    const trimmed = input.trim().toLowerCase();
    if ((allowedStatuses as readonly string[]).includes(trimmed)) {
      return trimmed as ProjectStatus;
    }
  }

  return null;
}

// Removed duplicate Project type declaration

export const projectA: Project = {
  id: "p1",
  name: "Client Website Redesign",
  status: "active",
  tags: [], // Add tags as an empty array or with relevant strings
};

// ❌ Intentionally wrong to demonstrate safety:
export const projectB: Project = {
  id: "p2",
  name: "Mobile App",
  // @ts-expect-error - "archived" is not part of ProjectStatus
  status: "archived",
};

export function statusLabelIf(status: ProjectStatus): string {
  if (status === "draft") return "Draft (not visible to client)";
  if (status === "active") return "Active (in progress)";
  if (status === "paused") return "Paused (waiting)";
  // By process of elimination, TypeScript can infer this is "completed"
  return "Completed (delivered)";
}

function assertNever(value: never): never {
  throw new Error("Unhandled case: " + value);
}

export function statusLabelSwitch(status: ProjectStatus): string {
  switch (status) {
    case "draft":
      return "Draft (not visible to client)";
    case "active":
      return "Active (in progress)";
    case "paused":
      return "Paused (waiting)";
    case "blocked":
      return "Blocked (on hold)";
    case "done":
      return "Done (finished)";
    case "completed":
      return "Completed (delivered)";
    default:
      // If you add a new status to ProjectStatus and forget to handle it,
      // TypeScript will error here because `status` won't be `never` anymore.
      return assertNever(status);
  }
}

export function canEditProject(status: ProjectStatus): boolean {
  // Client story rule example: completed projects are read-only.
  return status !== "completed";
}