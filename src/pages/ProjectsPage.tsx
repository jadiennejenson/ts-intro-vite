import { useState, useMemo } from "react";
import { AddProjectForm } from "../components/AddProjectForm";
import { ProjectDashboard } from "../components/ProjectDashboard";
import type { Project } from "../models/project";

export default function ProjectsPage() {
  // Global state for all projects
  const [projects, setProjects] = useState<Project[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("All");

  // Filtering logic for the "Status" dropdown in the header
  const filteredProjects = useMemo(() => {
    if (filterStatus === "All") return projects;
    return projects.filter((p) => p.status.toLowerCase() === filterStatus.toLowerCase());
  }, [projects, filterStatus]);

  const handleAdd = (newProject: Project) => {
    setProjects((prev) => [...prev, newProject]);
  };

  const handleDelete = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <main className="mx-auto max-w-5xl space-y-8 p-6">
      {/* 1. Header with Status Filter */}
      <header className="flex items-center justify-between rounded-lg border bg-white p-4 shadow-sm">
        <div>
          <h1 className="text-xl font-bold">Projects</h1>
          <p className="text-xs text-slate-500">Filter projects by status.</p>
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm font-medium">
            Status
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded border p-1"
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Planned">Planned</option>
              <option value="Blocked">Blocked</option>
            </select>
          </label>
          <span className="text-sm text-slate-600">Showing {filteredProjects.length} projects</span>
          <button onClick={() => setProjects([])} className="text-sm font-medium text-blue-600">Clear</button>
        </div>
      </header>

      {/* 2. Add Project Form */}
      <AddProjectForm onAdd={handleAdd} />

      {/* 3. Project Dashboard */}
      <ProjectDashboard 
        projects={filteredProjects} 
        onDeleteProject={handleDelete}
        selectedProjectId={null}
        onProjectClick={() => {}} 
      />
    </main>
  );
}
