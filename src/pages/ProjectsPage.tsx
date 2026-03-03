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
      <h1 className="text-2xl font-semibold text-slate-900">Projects</h1>

      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setStatusFilter('all')}
          className={`px-4 py-2 rounded ${statusFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-slate-200'}`}
        >
          All
        </button>
        <button
          onClick={() => setStatusFilter('active')}
          className={`px-4 py-2 rounded ${statusFilter === 'active' ? 'bg-blue-600 text-white' : 'bg-slate-200'}`}
        >
          Active
        </button>
        <button
          onClick={() => setStatusFilter('completed')}
          className={`px-4 py-2 rounded ${statusFilter === 'completed' ? 'bg-blue-600 text-white' : 'bg-slate-200'}`}
        >
          Completed
        </button>
      </div>

      <ProjectDashboard projects={visibleProjects} />

      <p className="mt-4 text-sm text-slate-600">
        Current filter: <span className="font-medium">{statusFilter}</span>
      </p>
    </div>
  );
}