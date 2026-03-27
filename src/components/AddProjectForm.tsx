import { useState } from "react";
import type { Project, ProjectStatus } from "../project-tracker";

// FIX 1: Define StatusFilter locally or import from your types file. 
// Importing types FROM a Page component often causes circular dependency errors.
export type StatusFilter = ProjectStatus | "All";

export interface AddProjectFormProps {
  onAdd: (project: Omit<Project, 'id'>) => void;
  count: number;
  currentFilter: StatusFilter;
  onFilterChange: (filter: StatusFilter) => void;
}

// FIX 2: Destructure all required props defined in the Interface.
// If you don't use count/filter here, you still need to include them or make them optional in the interface.
export function AddProjectForm({ 
  onAdd,
  count }: AddProjectFormProps) {
  
  const [name, setName] = useState("My project");
  const [client, setClient] = useState("Thor");
  const [status, setStatus] = useState<ProjectStatus>("Active");

  const handleSubmit = (e: React.FormEvent) => {
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
      {/* UI logic using the props if needed */}
      <div className="flex justify-between items-center mb-6">
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

        <div className="flex items-center gap-4 pt-2">
          <button 
            type="submit"
            className="bg-[#0f172a] text-white px-6 py-2 rounded-md font-medium hover:bg-slate-800 transition-colors"
          >
            Add project
          </button>
        </div>
      </form>
    </div>
  );
}