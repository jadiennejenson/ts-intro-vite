import type { ID, Task, TeamMember } from "../models/entities";

export type WithId = { id: ID };

export function updateById<T extends WithId>(
  items: T[],
  id: ID,
  patch: Partial<Omit<T, "id">>
): T[] {
  return items.map((item) => {
    if (item.id !== id) return item;
    return { ...item, ...patch };
  });
}

export function findById<T extends WithId>(items: T[], id: ID): T | undefined {
  return items.find((item) => item.id === id);
}

export function demoFindById(): void {
  const tasks: Task[] = [
    { id: "t1", projectId: "p1", title: "Plan sprint", done: false, priority: "high" },
    { id: "t2", projectId: "p1", title: "Implement UI", done: false, priority: "medium" },
  ];

  const members: TeamMember[] = [
    { id: "u1", fullName: "Avery Chen", role: "pm", assignedProjectIds: ["p1"] },
    { id: "u2", fullName: "Riley Patel", role: "dev", assignedProjectIds: ["p1", "p2"] },
  ];

  const foundTask = findById(tasks, "t2");
  if (foundTask) {
    console.log("Found task title:", foundTask.title);
  } else {
    console.log("Task not found");
  }

  const foundMember = findById(members, "u1");
  console.log("Found member name:", foundMember?.fullName ?? "Missing");
}

// Generic function: T is a placeholder for "whatever type you call me with"
export function identity<T>(value: T): T {
  return value;
}


export function demoIdentity(): void {
  const task: Task = {
    id: "t1",
    projectId: "p1",
    title: "Set up Tailwind styles",
    done: false,
    priority: "medium",
  };

  const result = identity(task);

  // Because of generics, result is inferred as Task (not any)
  console.log("identity<Task> result title:", result.title);
}