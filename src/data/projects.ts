import type { Project } from "../models/project";

export const projects: Project[] = [
  {
    id: "p-1001",
    name: "Client Onboarding Flow",
    status: "active",
    dueDate: "2025-02-15",
    tags: ["frontend", "ux"],
    notes: "Waiting on final copy from marketing."
  },
  {
    id: "p-1002",
    name: "Billing Integration",
    status: "blocked",
    tags: ["backend", "payments"]
    // dueDate is optional, so we can omit it for now
  },
  {
    id: "p-1003",
    name: "QA Automation Setup",
    status: "planned",
    dueDate: "2025-03-01",
    tags: ["devops"]
  },
  {
    id: "p-1004",
    name: "Mobile App Redesign",
    status: "active",
    dueDate: "2025-04-30",
    tags: ["mobile", "design"],
    notes: "Kickoff meeting scheduled for next week."
  },
  {
    id: "p-1005",
    name: "Data Migration to New Warehouse",
    status: "completed",
    dueDate: "2025-01-20",
    tags: ["data", "backend"],
    notes: "Migration completed successfully with zero downtime."
  }

];

// Try a deliberate mistake (then fix it):
// projects.push({ id: "p-9999", name: "Bad Project", status: "in-progress", tags: [] });
//                                     ^ TypeScript will reject "in-progress" because it's not in ProjectStatus