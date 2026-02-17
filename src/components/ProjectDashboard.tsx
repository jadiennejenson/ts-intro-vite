import { useRef } from "react";
import type { Project } from "../models/project";

export type ProjectDashboardProps = {
  projects: Project[];
};

export function ProjectDashboard(props: ProjectDashboardProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const idInputRef = useRef<HTMLInputElement | null>(null);

  function clearHighlights(root: HTMLElement) {
    const highlighted = root.querySelectorAll<HTMLElement>("[data-role='project-row'].bg-amber-50");
    highlighted.forEach((el) => {
      el.classList.remove("bg-amber-50", "ring-1", "ring-amber-300");
    });
  }

  function handleFindById(): void {
    const root = containerRef.current;
    if (!root) return;

    const id = idInputRef.current?.value.trim();
    if (!id) {
      console.warn("Type a project id first.");
      return;
    }

    const row = root.querySelector<HTMLElement>(`[data-project-id='${id}']`);
    if (!row) {
      console.warn("No row found for id:", id);
      return;
    }

    clearHighlights(root);
    row.classList.add("bg-amber-50", "ring-1", "ring-amber-300");
    row.scrollIntoView({ behavior: "smooth", block: "center" });

    const detailsBtn = row.querySelector<HTMLButtonElement>("[data-role='details-button']");
    detailsBtn?.focus();
  }

  return (
    <section ref={containerRef} className="mx-auto w-full max-w-5xl p-4" aria-label="Project dashboard">
      <header className="mb-4">
        <h2 className="text-xl font-semibold text-slate-900">Project Dashboard</h2>
        <p className="text-sm text-slate-600">Mini challenge: select by project id and focus a button.</p>

        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            ref={idInputRef}
            type="text"
            placeholder="Enter project id (example: p1)"
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 sm:max-w-xs"
          />
          <button
            type="button"
            onClick={handleFindById}
            className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Find & focus
          </button>
        </div>
      </header>

      <ul className="divide-y divide-slate-100 rounded-lg border border-slate-200 bg-white">
        {props.projects.map((p) => (
          <li
            key={p.id}
            data-role="project-row"
            data-project-id={p.id}
            className="flex items-center justify-between gap-3 px-4 py-3"
          >
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-slate-900">{p.name}</div>
            </div>

            <button
              type="button"
              data-role="details-button"
              className="shrink-0 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              Details
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}