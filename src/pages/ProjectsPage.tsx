import { useState, useMemo, useEffect } from "react"; // Added this
import type { Project } from "../models/project";
import { projects as initialProjects } from "../data/projects";
import { AddProjectForm } from "../components/AddProjectForm";
import { ProjectDashboard } from "../components/ProjectDashboard";
import { ProjectDetailPanel } from "../components/ProjectDetailPanel";

 // Define this type here for simplicity

const STATUS_OPTIONS: (Project["status"] | "all")[] = ["all", "active", "completed", "on-hold"];

export function ProjectsPage() {
  const [statusFilter, setStatusFilter] = useState<Project["status"] | "all">("all");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  // Derive filtered list
  const filteredProjects = useMemo(() => {
    return statusFilter === "all" 
      ? projects 
      : projects.filter((p) => p.status === statusFilter);
  }, [projects, statusFilter]);

  // ... (Keep your existing selectedProject and useEffect logic) ...

useEffect(() => {
  // If the currently selected project isn't in the filtered list, deselect it
  const isStillVisible = filteredProjects.some(p => p.id === selectedProjectId);
  if (selectedProjectId && !isStillVisible) {
    setSelectedProjectId(null);
  }
}, [filteredProjects, selectedProjectId]);
  
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Project Management</h1>

        {/* 2. ADD FILTER UI */}
        <div className="flex items-center gap-2">
          <label htmlFor="status-filter" className="text-sm font-medium text-slate-600">
            Filter by:
          </label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm shadow-sm focus:border-blue-500 focus:outline-none"
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <AddProjectForm onAdd={handleAddProject} />
          </div>
          
          {/* Dashboard now receives the filtered list */}
          <ProjectDashboard
            projects={filteredProjects}
            selectedId={selectedProjectId}
            onProjectClick={setSelectedProjectId}
          />
        </div>

        <aside className="space-y-6">
          <ProjectDetailPanel projectId={selectedProjectId} projects={projects} />
          
          {selectedProject && (
            <div className="rounded border p-4 shadow-sm">
              <h2 className="font-bold">{selectedProject.name} Details</h2>
              <p className="text-sm text-slate-600 capitalize">Status: {selectedProject.status}</p>
              <button 
                onClick={() => setSelectedProjectId(null)}
                className="mt-2 text-sm text-blue-600 hover:underline"
              >
                Close
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}