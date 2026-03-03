import { useEffect, useMemo, useState } from "react";
// import the dashboard component from its actual location
// adjust the path below if your component lives elsewhere
import {ProjectDashboard} from "../components/ProjectDashboard";
import type { Project } from "../models/project";

type StatusFilter = "all" | "active" | "archived";

const ProjectsPage = () => {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Replace with your real project data source
  const projects = useMemo<Project[]>(() => [], []);

  const filteredProjects = useMemo(() => {
    if (statusFilter === "all") return projects;
    return projects.filter((p) => p.status === statusFilter);
  }, [projects, statusFilter]);

  const selectedProject = useMemo(() => {
    if (!selectedProjectId) return undefined;
    return projects.find((p) => p.id === selectedProjectId);
  }, [projects, selectedProjectId]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProjectId(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <main className="mx-auto w-full max-w-3xl p-6">
      <div className="flex items-end justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>

        <label className="flex flex-col gap-1 text-sm text-gray-700">
          <span>Status</span>
          <select
            className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>
        </label>
      </div>

      <div className="mt-6">
        <ProjectDashboard
          projects={filteredProjects}
        />
      </div>

      <section className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
        <h3 className="text-sm font-semibold text-gray-900">Selected Project</h3>

        {selectedProject ? (
          <div className="mt-2">
            <div className="text-base font-medium text-gray-900">
              {selectedProject.name}
            </div>
            <div className="mt-1 text-sm font-mono text-gray-600">
              id: {selectedProject.id}
            </div>
            <p className="mt-3 text-xs text-gray-500">
              Press Escape to clear the selection.
            </p>
          </div>
        ) : (
          <p className="mt-2 text-sm text-gray-600">No project selected.</p>
        )}
      </section>
    </main>
  );
};

export default ProjectsPage;