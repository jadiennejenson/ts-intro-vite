import type { Entity } from "../domain/entities";

// ✅ Must be 'export default' to match your App.tsx import
// ✅ Must use ({ entity }) to destructure props
export default function EntityCard({ entity }: { entity: Entity }) {
  // ✅ Must return JSX (parentheses), NOT document.createElement
  return (
    <div className="rounded border border-slate-300 bg-white p-4 shadow-sm flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{entity?.name || "No Name"}</h3>
        <span className="text-xs uppercase tracking-wide rounded bg-slate-100 px-2 py-1 text-slate-700">
          {entity?.kind}
        </span>
      </div>

      <div className="text-sm text-slate-700">
        {entity?.kind === "project" && (
          <span>Status: {entity.status} • Budget: ${entity.budgetUsd}</span>
        )}
        
        {entity?.kind === "task" && (
          <span>Due: {entity.dueDateIso} • Completed: {entity.completed ? "Yes" : "No"}</span>
        )}
        
        {entity?.kind === "member" && (
          <span>Role: {entity.role} • Availability: {entity.availability}</span>
        )}
      </div>
    </div>
  );
}