import { useState } from "react";
import { ProjectDashboard } from "../components/ProjectDashboard";
import { AddProjectForm } from "../components/AddProjectForm";
import type { Project, ProjectStatus } from "../project-tracker";

// 1. Add the StatusFilter type here
type StatusFilter = ProjectStatus | 'all';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([
    { id: "1", name: "Billing Integration", client: "", status: "active" },
    { id: "2", name: "Client Onboarding", client: "", status: "completed" },
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
        <AddProjectForm 
          onAdd={addProject} 
          count={filteredProjects.length} 
          currentFilter={filter}
          onFilterChange={setFilter}
        />
      </div>

      <div className="max-w-2xl mx-auto px-4">
        {/* 4. Pass the FILTERED list to the Dashboard */}
        <ProjectDashboard projects={filteredProjects} />
      </div>
    </div>
  );
}
