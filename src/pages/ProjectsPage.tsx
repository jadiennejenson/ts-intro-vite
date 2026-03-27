import { useState } from "react";
import { ProjectDashboard } from '../components/ProjectDashboard';
import { AddProjectForm } from "../components/AddProjectForm";
import type { Project, ProjectStatus } from "../project-tracker";

// FIX 1: Add 'export' so AddProjectForm can import this type
export type StatusFilter = ProjectStatus | 'all';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([
    { id: "1", name: "Billing Integration", client: "Thor", status: "Active" },
    { id: "2", name: "Client Onboarding", client: "Loki", status: "Done" },
    { id: "3", name: "API Development", client: "Odin", status: "Planned" },
    { id: "4", name: "User Authentication", client: "Freya", status: "Active" },
    { id: "5", name: "Database Optimization", client: "Heimdall", status: "Done" }
  ]);

  const [filter, setFilter] = useState<StatusFilter>('all');

  // FIX 2: Explicitly define the return object to satisfy the Project interface
  const addProject = (projectData: Omit<Project, "id">) => {
    const newProject: Project = { 
      ...projectData, 
      id: Date.now().toString() 
    };
    setProjects(prev => [...prev, newProject]);
  };

  const filteredProjects = projects.filter((project) => {
    if (filter === 'all') return true;
    return project.status === filter;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-5xl mx-auto px-4 mb-12">
        <AddProjectForm 
          onAdd={addProject} 
          count={filteredProjects.length} 
          currentFilter={filter}
          onFilterChange={(newFilter) => setFilter(newFilter)} 
        />
        
        <div className="mt-6 flex items-center gap-3">
          <label htmlFor="statusFilter" className="text-sm font-medium text-slate-700">
            Filter by status:
          </label>
          <select
            id="statusFilter"
            value={filter}
            onChange={(e) => setFilter(e.target.value as StatusFilter)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm"
          >
            <option value="all">All Projects</option>
            <option value="Active">Active</option>
            <option value="Blocked">Blocked</option>
            <option value="Planned">Planned</option>
            <option value="Done">Done</option>
          </select>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4">
        {/* FIX 3: Pass the filtered projects to the dashboard instead of the full list */}
        <ProjectDashboard projects={filteredProjects}/>
      </div>
    </div>
  );
}