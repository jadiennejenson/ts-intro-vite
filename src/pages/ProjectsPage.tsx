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
    <div className="w-full px-6 mb-12">
      <div className="w-full px-6 mb-12">
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
            {/* FIX 4: Match values to the StatusFilter type */}
            <option value="All">All Projects</option>
            <option value="Active">Active</option>
            <option value="Blocked">Blocked</option>
            <option value="Planned">Planned</option>
            <option value="Done">Done</option>
          </select>
        </div>
      </div>

      <div className="w-full px-6 mb-12">
        {/* FIX 5: Pass filteredProjects to the dashboard */}
        <ProjectDashboard projects={filteredProjects}/>
      </div>
    </div>
  );
}