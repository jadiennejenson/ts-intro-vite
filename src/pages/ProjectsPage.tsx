/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { ProjectDashboard } from "../components/ProjectDashboard";
import { AddProjectForm } from "../components/AddProjectForm";
import type { Project, ProjectStatus } from "../project-tracker";

// 1. Add the StatusFilter type here
type StatusFilter = ProjectStatus | 'all';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([
  { id: "1", name: "Billing Integration", client: "", status: "Active" }, // Capital 'A'
  { id: "2", name: "Client Onboarding", client: "", status: "Done" },    // Use 'Done' or 'Completed'
]);

  // 2. Add state to track the current filter
  const [filter, setFilter] = useState<StatusFilter>('all');

  const addProject = (newProject: Omit<Project, "id">) => {
    const projectWithId = { ...newProject, id: `p${projects.length + 1}` };
    setProjects([...projects, projectWithId]);
  };

  // 3. Logic to filter the projects based on selection
  const filteredProjects = projects.filter((project) => {
    if (filter === 'all') return true;
    return project.status.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-5xl mx-auto px-4 mb-12">
        {/* Pass the filter state and setter to the form/header component */}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        <AddProjectForm onAdd={addProject} count={0} currentFilter={undefined} onFilterChange={function (_filter: StatusFilter): void {
          throw new Error("Function not implemented.");
        } } />
        <div className="mt-6">
          <label htmlFor="statusFilter" className="mr-2 text-sm font-medium text-slate-700">Filter by status:</label>
          <select
            id="statusFilter"
            value={filter}
            onChange={(e) => setFilter(e.target.value as StatusFilter)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
          >
            <option value="all">All</option>
            <option value="Active">Active</option>
            <option value="Blocked">Blocked</option>
            <option value="Planned">Planned</option>
            <option value="Done">Done</option>
          </select>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4">
        {/* 4. Pass the FILTERED list to the Dashboard */}
        <ProjectDashboard projects={filteredProjects} />
      </div>
    </div>
  );
}
