import { useState } from "react";
import { ProjectDashboard } from '../components/ProjectDashboard';
import { AddProjectForm } from "../components/AddProjectForm";
import type { Project, ProjectStatus } from "../project-tracker";

// FIX 1: Match the casing ("All") used in AddProjectForm.tsx
export type StatusFilter = ProjectStatus | 'All';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([
    { id: "1", name: "Billing Integration", client: "Thor", status: "Active" },
    { id: "2", name: "Client Onboarding", client: "Loki", status: "Done" },
    { id: "3", name: "API Development", client: "Odin", status: "Planned" },
    { id: "4", name: "User Authentication", client: "Freya", status: "Active" },
    { id: "5", name: "Database Optimization", client: "Heimdall", status: "Done" }
  ]);

  // FIX 2: Initialize with capital "All"
  const [filter, setFilter] = useState<StatusFilter>('All');

  const addProject = (projectData: Omit<Project, "id">) => {
    const newProject: Project = { 
      ...projectData, 
      id: Date.now().toString() 
    };
    setProjects(prev => [...prev, newProject]);
  };

  const filteredProjects = projects.filter((project) => {
    // FIX 3: Match capital "All"
    if (filter === 'All') return true;
    return project.status === filter;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 xl:px-8">
      <div className="mx-auto flex w-full max-w-7xl xl:max-w-screen-xl 2xl:max-w-screen-2xl flex-col gap-8 xl:gap-12">
        <div className="grid gap-6 xl:grid-cols-2">
          <AddProjectForm onAdd={addProject} count={filteredProjects.length} />

          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Project filter</h2>
                <p className="text-sm text-slate-500">Keep the list small and easy to scan.</p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <label htmlFor="statusFilter" className="text-sm font-medium text-slate-700">
                  Filter by status
                </label>

                <select
                  id="statusFilter"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as StatusFilter)}
                  className="w-full max-w-xs rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm"
                >
                  <option value="All">All Projects</option>
                  <option value="Active">Active</option>
                  <option value="Blocked">Blocked</option>
                  <option value="Planned">Planned</option>
                  <option value="Done">Done</option>
                </select>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                Showing <span className="font-semibold text-slate-900">{filteredProjects.length}</span> project{filteredProjects.length === 1 ? "" : "s"}.
              </div>
            </div>
          </section>
        </div>

        <ProjectDashboard projects={filteredProjects} />
      </div>
    </div>
  );
}