export type ProjectStatus = "planned" |"blocked" | "draft" | "active" | "paused" | "done" | "completed";

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
  // These are the “completeness” fields we’ll validate
  ownerEmail?: string;
  estimatedHours?: number; // important: 0 is a valid number, but it's falsy
  description?: string;

}

export const projects: Project[] = [
 {
    id: "p1",
    name: "Client onboarding flow",
    status: "draft",
    ownerEmail: "pm@company.com",
    estimatedHours: 12,
    description: "Define steps and screens",
    tags: [],
  },{
    id: "p2",
    name: "Bug bash",
    status: "active",
    ownerEmail: "qa@company.com",
    estimatedHours: 0, // intentionally 0 to test truthiness pitfalls
    description: "One-day bug cleanup",
    tags: [],
  },{
    id: "p3",
    name: "New landing page",
    status: "blocked",
    estimatedHours: 8,
    description: "Waiting on brand assets",
    tags: [],
  }
];

console.log("Loaded projects:", projects);

const allowedStatuses = ["planned", "blocked", "draft", "active", "paused", "done", "completed"] as const;

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
    case "planned":
      return "Planned (upcoming)";
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

export type DraftProject = {
  id: string;
  name: string;
  status: "draft";
  lastEditedAt: string;
};

export type ActiveProject = {
  id: string;
  name: string;
  status: "active";
  etaDays: number;
  daysLeft?: number; // optional, can be calculated from dueDate if available
  days: number;
};

export type PausedProject = {
  id: string;
  name: string;
  status: "paused";
  pauseReason: string;
  
};

export type CompletedProject = {
  id: string;
  name: string;
  status: "completed";
  completedAt: string;
};

export type ProjectRecord =
  | DraftProject
  | ActiveProject
  | PausedProject
  | CompletedProject;

export function formatProjectRecord(p: ProjectRecord): string {
  switch (p.status) {
    case "draft":
      return `${p.name} (Draft) — last edited ${p.lastEditedAt}`;
    case "active":
      return `${p.name} (Active) — ETA ${p.etaDays} days`;
    case "paused":
      return `${p.name} (Paused) — reason: ${p.pauseReason}`;
    case "completed":
      return `${p.name} (Completed) — done on ${p.completedAt}`;
  }
}

type NextAction =
  | "Fix missing info"
  | "Start project"
  | "Unblock project"
  | "Submit for review"
  | "Archive"
  | "No action";

function hasRequiredInfo(p: Project): boolean {
  // For the tracker, assume these are required to move forward:
  // - ownerEmail must be a non-empty string
  // - estimatedHours must be a number (0 is allowed, but null/undefined is not)
  // - description must be a non-empty string

  const hasOwner = typeof p.ownerEmail === "string" && p.ownerEmail.trim().length > 0;
  const hasEstimate = p.estimatedHours != null; // true for 0, false for null/undefined
  const hasDescription = typeof p.description === "string" && p.description.trim().length > 0;

  return hasOwner && hasEstimate && hasDescription;
}

function getNextAction(p: Project): NextAction {
  // Priority rule: if required info is missing, we can't proceed.
  if (!hasRequiredInfo(p)) {
    return "Fix missing info";
  }

  // Status-based routing after data is known-good
  if (p.status === "draft") {
    return "Start project";
  } else if (p.status === "blocked") {
    return "Unblock project";
  } else if (p.status === "active") {
    return "Submit for review";
  } else if (p.status === "paused") {
    return "Archive";
  } else if (p.status === "done" || p.status === "completed") {
    return "No action";
  }

  // We shouldn't get here because status is a union type,
  // but returning something keeps the function total.
  return "No action";
}

for (const p of projects) {
  console.log(`[${p.id}] ${p.name} ->`, getNextAction(p));
}

function demoTruthiness() {
  const values = ["", "hello", 0, 5, null, undefined, NaN, [], {}, "0"];

  for (const v of values) {
    // Stringify carefully so you can “see” values like NaN and empty string
    const label = typeof v === "string" ? `"${v}"` : String(v);
    console.log(label.padEnd(12), "=>", v ? "truthy" : "falsy");
  }

  // Safe patterns
  const hours = 0;
  console.log("hours is missing?", hours == null); // false
  console.log("hours is falsy?", !hours); // true (this is why naive checks break)

  const email = "   ";
  console.log("email provided?", typeof email === "string" && email.trim().length > 0);
}

demoTruthiness();
function getStatusLabel(p: Project): string {
  // Simple mapping based on one condition
  return p.status === "blocked" ? "Blocked (needs attention)" : `Status: ${p.status}`;
}

function shouldShowWarning(p: Project): boolean {
  // Another simple condition: warn if missing info OR blocked
  return !hasRequiredInfo(p) ? true : p.status === "blocked";
}

for (const p of projects) {
  console.log(
    `[${p.id}] label=`,
    getStatusLabel(p),
    "warning=",
    shouldShowWarning(p)
  );
}