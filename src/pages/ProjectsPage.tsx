import { useState } from "react";
import { ProjectDashboard } from "../components/ProjectDashboard";
import { AddProjectForm } from "../components/AddProjectForm";
import type { Project } from "../project-tracker";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([
    { id: "1", name: "Billing Integration", clientName: "Thor", status: "active" },
  ]);

  const addProject = (newProject: Omit<Project, "id">) => {
    const projectWithId = { ...newProject, id: Math.random().toString(36).substr(2, 9) };
    setProjects([...projects, projectWithId]);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      {/* Header & Form Section (Matches your latest image) */}
      <div className="max-w-5xl mx-auto px-4 mb-12">
        <AddProjectForm onAdd={addProject} count={projects.length} />
      </div>

      {/* Dashboard Section (Matches your previous image) */}
      <div className="max-w-2xl mx-auto px-4">
        <ProjectDashboard projects={projects} />
      </div>
    </div>
  );
}
