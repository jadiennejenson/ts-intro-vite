// Adjust this import path to where your Project type is defined.
import type { Project } from "../types";
import { Modal } from "./Modal";
import { ProjectDashboard } from "./ProjectDashboard";
import { ProjectFilterBar } from "./ProjectFilterBar"; // Added this
import { AddProjectForm } from "./AddProjectForm";


type ProjectDetailPanelProps = {
  projectId: string | null;
  projects: Project[];
};

export function ProjectDetailPanel({ projectId, projects }: ProjectDetailPanelProps) {
  const project = projects.find((p) => p.id === projectId);

  // ... existing state (statusFilter, selectedProjectId, projects)

  const handleClose = () => setSelectedProjectId(null);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      {/* 1. Filter Bar */}
      <div className="mb-6">
        <ProjectFilterBar 
          value={statusFilter}
          count={filteredProjects.length} 
          onChange={setStatusFilter} 
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="mb-6">
          <AddProjectForm onAdd={handleAddProject} />
        </div>
        
        {/* 2. Dashboard triggers selection on click */}
        <ProjectDashboard
          projects={filteredProjects}
          selectedId={selectedProjectId}
          onProjectClick={setSelectedProjectId}
        />
      </div>

      {/* 3. THE MODAL */}
      <Modal 
        isOpen={selectedProjectId !== null} 
        onClose={handleClose}
        title="Project Details"
      >
        <ProjectDetailPanel 
          projectId={selectedProjectId} 
          projects={projects} 
        />
        <div className="mt-6 flex justify-end">
          <button 
            onClick={handleClose}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            Done
          </button>
        </div>
      </Modal>
    </div>
  );
}