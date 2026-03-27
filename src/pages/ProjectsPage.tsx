import { useState } from "react";
import { ProjectDashboard } from '../components/ProjectDashboard';
import { AddProjectForm } from "../components/AddProjectForm";
import type { Project, ProjectStatus } from "../project-tracker";

// 1. Ensure StatusFilter includes the correct casing for ProjectStatus
type StatusFilter = ProjectStatus | 'all';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([
    { id: "1", name: "Billing Integration", client: "", status: "Active" },
    { id: "2", name: "Client Onboarding", client: "", status: "Done" },
    { id: "3", name: "API Development", client: "", status: "Planned" },
    { id: "4", name: "User Authentication", client: "", status: "Active" },
    { id: "5", name: "Database Optimization", client: "", status: "Done" }
  ]);

  const [filter, setFilter] = useState<StatusFilter>('all');

  const addProject = (newProject: Omit<Project, "id">) => {
    // Generate a unique ID (Date.now() is safer than length for deletions)
    const projectWithId: Project = { ...newProject, id: `p${Date.now()}` };
    setProjects(prev => [...prev, projectWithId]);
  };

  // 3. Updated logic: Use exact string matching to match your type/data
  const filteredProjects = projects.filter((project) => {
    if (filter === 'all') return true;
    return project.status === filter;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-5xl mx-auto px-4 mb-12">
        {/* FIX: Properly pass state and handlers to the form */}
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
            // FIX: Cast target value to StatusFilter
            onChange={(e) => setFilter(e.target.value as StatusFilter)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm"
          >
            <option value="all">All Projects</option>
            {/* FIX: Match values to the ProjectStatus type casing */}
            <option value="Active">Active</option>
            <option value="Blocked">Blocked</option>
            <option value="Planned">Planned</option>
            <option value="Done">Done</option>
          </select>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4">
        <ProjectDashboard projects={filteredProjects} />
      </div>
    </div>
  );
}