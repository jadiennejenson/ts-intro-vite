import { useState } from 'react';
import { projects } from '../data/projects';
import {ProjectDashboard} from '../components/ProjectDashboard';
import type { ProjectStatus } from '../models/project';

type StatusFilter = ProjectStatus | 'all';

export default function ProjectsPage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const visibleProjects =
    statusFilter === 'all'
      ? projects
      : projects.filter((p) => p.status === statusFilter);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Projects</h1>
          <p className="mt-1 text-sm text-slate-600">
            Filter projects by status.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label
            htmlFor="statusFilter"
            className="text-sm font-medium text-slate-700"
          >
            Status
          </label>

          <select
            id="statusFilter"
            className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900"
            value={statusFilter}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setStatusFilter(e.target.value as StatusFilter);
            }}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="on-hold">On Hold</option>
          </select>
        </div>
      </div>

            <button
            type="button"
            className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm font-medium text-slate-800 hover:bg-slate-50"
            onClick={() => {
              setStatusFilter('all');
            }}
          >
            Clear
          </button>

      <p className="mt-4 text-sm text-slate-600">
        Showing <span className="font-medium">{visibleProjects.length}</span> of{' '}
        <span className="font-medium">{projects.length}</span> projects
      </p>

      <div className="mt-4">
        <ProjectDashboard projects={visibleProjects} />
      </div>
    </div>
  );
}