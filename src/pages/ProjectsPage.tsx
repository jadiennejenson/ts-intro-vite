import { useMemo, useState } from "react";
import {ProjectDashboard} from "../components/ProjectDashboard";
import type { Project } from "../models/project";

type StatusFilter = "all" | "active" | "archived";

const ProjectsPage = () => {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  // Replace with your real project data source
  const projects = useMemo<Project[]>(() => [], []);

  const filteredProjects = useMemo(() => {
    if (statusFilter === "all") return projects;
    return projects.filter((p) => p.status === statusFilter);
  }, [projects, statusFilter]);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-slate-900">Projects</h1>

        {/* Your existing status filter UI likely lives here */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-slate-700" htmlFor="statusFilter">
            Status
          </label>
          <select
            id="statusFilter"
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
          >
            <option value="all">All</option>
            <option value="planned">Planned</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <ProjectDashboard
        projects={filteredProjects}
      />
    </div>
  );
};

export default ProjectsPage;