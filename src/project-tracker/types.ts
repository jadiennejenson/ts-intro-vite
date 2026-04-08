export type ProjectStatus = "planned" | "active" | "done";

export interface Project {
  id: string;
  name: string;
  owner: string;
  status: ProjectStatus;//status: "planned" | "active" | "done"; // Use a union type for status
  /** Estimated effort in hours */
  estimateHours: number;
  /** Optional notes (can be missing) */
  notes?: string;
}
//interface Project {
//  id: string;
//  name: string;
//  owner: string;
//  status: "planned" | "active" | "done"; // Use a union type for status
//  estimateHours: number; // Estimated effort in hours
//  notes?: string; // Optional notes (can be missing)
//}
// Define a type for the status filter, which can be a specific status or "all"
// This allows us to filter projects by their status or show all projects regardless of status
//the interface can define the possible values for the status filter, which can be either a specific project status or "all" to indicate no filtering
export type StatusFilter = ProjectStatus | "all";

export interface ProjectTrackerState {
  projects: Project[];
  statusFilter: StatusFilter;
  selectedProjectId: string | null;
}

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus; // Use the enum here
}