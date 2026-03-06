import { useEffect, useMemo, useState } from "react";
import type { Project } from "../models/project";
import { projects as initialProjects } from "../data/projects";
import { AddProjectForm } from "../components/AddProjectForm";
import { ProjectDashboard } from "../components/ProjectDashboard";

export function ProjectsPage() {
  const [statusFilter, setStatusFilter] = useState<Project["status"] | "all">("all");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  // Find the actual project object based on the ID
  const selectedProject = useMemo(() => 
    projects.find(p => p.id === selectedProjectId), 
  [projects, selectedProjectId]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // Only clear if something is actually selected
      if (e.key === "Escape" && selectedProjectId) {
        setSelectedProjectId(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedProjectId]); // Add dependency for clarity

  const filteredProjects = useMemo(() => {
    return statusFilter === "all" 
      ? projects 
      : projects.filter((p) => p.status === statusFilter);
  }, [projects, statusFilter]);

  function handleAddProject(project: Project) {
    setProjects((prev) => [...prev, project]);
    setSelectedProjectId(project.id);
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      {/* ... header and filter code ... */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <AddProjectForm onAdd={handleAddProject} />
          </div>
          <ProjectDashboard
            projects={filteredProjects}
            selectedId={selectedProjectId} // Pass this down!
            onProjectClick={setSelectedProjectId}
          />
        </div>
        
        {/* Example usage of the selected ID */}
        <aside>
          {selectedProject ? (
            <div className="p-4 border rounded">
              <h2 className="font-bold">{selectedProject.name} Details</h2>
              <button onClick={() => setSelectedProjectId(null)}>Close</button>
            </div>
          ) : (
            <p className="text-slate-500">Select a project to see details.</p>
          )}
        </aside>
      </div>
    </div>
  );
}