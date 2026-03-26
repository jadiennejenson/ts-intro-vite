import { useState } from "react";
import type { Project, ProjectStatus } from "../project-tracker";
import type { StatusFilter } from "../pages/ProjectsPage";

interface AddProjectFormProps {
  onAdd: (project: Omit<Project, 'id'>) => void;
  count: number;
  currentFilter: StatusFilter;
  onFilterChange: (filter: StatusFilter) => void;
}

export function AddProjectForm({ onAdd }: AddProjectFormProps) {
  // 1. Controlled Input State
  const [name, setName] = useState("My project");
  const [client, setClient] = useState("Thor");
  const [status, setStatus] = useState<ProjectStatus>("Active");

  // 2. Form Submission Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Call the parent's add function
    onAdd({
      name,
      client,
      status
    });

    // Optional: Reset form to defaults after adding
    setName("");
    setClient("");
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
      <h2 className="text-lg font-bold mb-6">Add Project</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Project Name Input */}
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

        {/* Client Name Input */}
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

        {/* Status Dropdown */}
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

        {/* Action Row */}
        <div className="flex items-center gap-4 pt-2">
          <button 
            type="submit"
            className="bg-[#0f172a] text-white px-6 py-2 rounded-md font-medium hover:bg-slate-800 transition-colors"
          >
            Add project
          </button>
          <p className="text-slate-400 text-sm italic">
            Tip: Press Enter to submit when focused in a field.
          </p>
        </div>
      </form>
    </div>
  );
}