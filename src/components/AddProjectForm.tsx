import { useState, type FormEvent } from "react";
import type { Project, ProjectStatus } from "../project-tracker";

export interface AddProjectFormProps {
  onAdd: (project: Omit<Project, 'id'>) => void;
  count: number;
}

export function AddProjectForm({ onAdd, count }: AddProjectFormProps) {
  
  const [name, setName] = useState("My project");
  const [client, setClient] = useState("Thor");
  const [status, setStatus] = useState<ProjectStatus>("Active");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    onAdd({
      name,
      client,
      status
    });

    setName("");
    setClient("");
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-bold">Add Project</h2>
        <span className="text-sm text-slate-500">Total: {count}</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2">Project name</label>
          <input
            type="text"
            className="w-full p-2 border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Client name</label>
          <input
            type="text"
            className="w-full p-2 border border-slate-200 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            value={client}
            onChange={(e) => setClient(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Status</label>
          <select
            className="w-full p-2 border border-slate-200 rounded-md bg-white outline-none focus:ring-2 focus:ring-blue-500"
            value={status}
            onChange={(e) => setStatus(e.target.value as ProjectStatus)}
          >
            <option value="Active">Active</option>
            <option value="Blocked">Blocked</option>
            <option value="Planned">Planned</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <div className="flex flex-col items-stretch gap-4 pt-2 sm:flex-row sm:justify-end">
          <button
            type="submit"
            className="rounded-md bg-slate-900 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800"
          >
            Add project
          </button>
        </div>
      </form>
    </div>
  );
}