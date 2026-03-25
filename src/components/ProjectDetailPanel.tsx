import type { Project } from "../project-tracker";

type ProjectDetailPanelProps = {
  projectId: string | null;
  projects: Project[];
};

export function ProjectDetailPanel({ projectId, projects }: ProjectDetailPanelProps) {
  const project = projects.find((p) => p.id === projectId);
  
  if (!projectId) {
    return <div className="text-center py-10 text-slate-500">Select a project to view details.</div>;
  }

  // 2. Handle "Project ID exists but isn't in the list"
  if (!project) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold text-slate-900 color-slate-900">Project not found</h2>
        <p className="mt-2 text-sm text-slate-600">The selected project does not exist.</p>
      </div>
    );
  }

  // 3. Return the actual project UI
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">{project.name}</h2>
      {/* Render other project details here */}
    </div>
  );
};