 
// Adjust this import path to where your Project type is defined.
import type { Project } from "../project-tracker";



type ProjectDetailPanelProps = {
  projectId: string | null;
  projects: Project[];
};

export function ProjectDetailPanel({ projectId, projects }: ProjectDetailPanelProps) {
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold text-slate-900">Project not found</h2>
        <p className="mt-2 text-sm text-slate-600">The selected project does not exist.</p>
      </div>
    );
  }

};