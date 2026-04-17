import type { Entity } from "../domain/entities";


export default function Unions() {
  const entities: Entity[] = [
    { kind: "project", id: "p1", name: "Website Redesign", status: "active", budgetUsd: 12000 },
    { kind: "task", id: "t1", name: "Build landing page", projectId: "p1", dueDateIso: "2026-01-15", completed: false },
    { kind: "member", id: "m1", name: "Avery", role: "dev", availability: "full-time" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <h1 className="text-2xl font-bold mb-4 text-slate-800">Unions</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {entities.map((e) => (
          <div key={e.id} className="rounded border border-slate-300 bg-white p-4 shadow-sm flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{e.name}</h3>
              <span className="text-xs uppercase tracking-wide rounded bg-slate-100 px-2 py-1 text-slate-700">
                {e.kind}
              </span>
            </div>
            <div className="text-sm text-slate-700">
              {e.kind === "project" && `Status: ${e.status} • Budget: $${e.budgetUsd}`}
              {e.kind === "task" && `Due: ${e.dueDateIso} • Completed: ${e.completed}`}
              {e.kind === "member" && `Role: ${e.role} • Availability: ${e.availability}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}