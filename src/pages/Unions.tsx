import { useState } from "react";
import type { Entity } from "../domain/entities";


export default function Unions() {
  const entities: Entity[] = [
    { kind: "project", id: "p1", name: "Website Redesign", status: "active", budgetUsd: 12000 },
    { kind: "task", id: "t1", name: "Build landing page", projectId: "p1", dueDateIso: "2026-01-15", completed: false },
    { kind: "member", id: "m1", name: "Avery", role: "dev", availability: "full-time" },
  ];

const [filter, setFilter] = useState<Entity["kind"] | "all">("all");


// Filter the list based on the button clicked
const filteredEntities = filter === "all" 
  ? entities 
  : entities.filter(e => e.kind === filter);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <h1 className="text-2xl font-bold mb-4 text-slate-800">Unions</h1>
      <div className="flex gap-4 mb-6">
        <button 
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg ${filter === "all" ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-700"}`}
        >
          All
        </button>
        <button 
          onClick={() => setFilter("project")}
          className={`px-4 py-2 rounded-lg ${filter === "project" ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-700"}`}
        >
          Projects
        </button>
        <button 
          onClick={() => setFilter("task")}
          className={`px-4 py-2 rounded-lg ${filter === "task" ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-700"}`}
        >
          Tasks
        </button>
        <button 
          onClick={() => setFilter("member")}
          className={`px-4 py-2 rounded-lg ${filter === "member" ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-700"}`}
        >
          Members
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredEntities.map((e) => (
  <div key={e.id} className="border p-4 rounded-xl bg-white shadow-sm flex flex-col justify-between">
    <div>
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-slate-900">{e.name}</h3>
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
          e.kind === 'project' ? 'bg-blue-100 text-blue-700' :
          e.kind === 'task' ? 'bg-orange-100 text-orange-700' :
          'bg-purple-100 text-purple-700'
        }`}>
          {e.kind}
        </span>
      </div>
      
      <p className="text-sm text-slate-500">
        {e.kind === "project" && `💼 Budget: $${e.budgetUsd.toLocaleString()}`}
        {e.kind === "task" && `📅 Due: ${e.dueDateIso}`}
        {e.kind === "member" && `🛠️ Role: ${e.role}`}
      </p>
    </div>

    {/* Type-Specific Buttons */}
    <div className="mt-4 pt-4 border-t border-slate-50">
      {e.kind === "task" && (
        <button className="text-xs font-bold text-green-600 hover:underline">Mark Complete</button>
      )}
      {e.kind === "project" && (
        <button className="text-xs font-bold text-blue-600 hover:underline">View Roadmap</button>
      )}
      {e.kind === "member" && (
        <button className="text-xs font-bold text-purple-600 hover:underline">Assign Task</button>
      )}
    </div>
  </div>
))}
      </div>
    </div>
  );
}