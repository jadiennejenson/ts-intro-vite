import React, { useEffect, useRef } from "react";
import type { Project } from "../models/project";

export type ProjectDashboardProps = {
  projects: Project[];
};

export function ProjectDashboard({ projects }: ProjectDashboardProps): React.JSX.Element {
  // 1. Unified Refs
  const containerRef = useRef<HTMLElement | null>(null);
  const idInputRef = useRef<HTMLInputElement | null>(null);

  // 2. Logic for Finding and Highlighting Rows
  function clearHighlights(root: HTMLElement) {
    const highlighted = root.querySelectorAll<HTMLElement>("[data-role='project-row'].bg-amber-50");
    highlighted.forEach((el) => {
      el.classList.remove("bg-amber-50", "ring-1", "ring-amber-300");
    });
  }

  function handleFindById(): void {
    const root = containerRef.current;
    const id = idInputRef.current?.value.trim();

    if (!root || !id) {
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

  // 3. Combined useEffect for logging both Cards and Rows
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    // Log the Grid Cards
    const cards = root.querySelectorAll<HTMLElement>("[data-project-card]");
    cards.forEach((card) => {
      console.log("Card Data:", { 
        id: card.dataset.id, 
        status: card.dataset.status 
      });
    });

    // Log the List Rows
    const rows = root.querySelectorAll<HTMLElement>("[data-role='project-row']");
    rows.forEach((row) => {
      const title = row.querySelector(".truncate")?.textContent?.trim();
      console.log("Found Row:", { id: row.dataset.projectId, title });
    });
  }, [projects]);

  return (
    <section ref={containerRef} className="mx-auto w-full max-w-5xl p-6" aria-label="Project dashboard">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Project Dashboard</h1>
        <p className="text-sm text-slate-600">Find by ID and focus row.</p>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            ref={idInputRef}
            type="text"
            placeholder="Enter project id (e.g., p1)"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
          <button
            type="button"
            onClick={handleFindById}
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Find & focus
          </button>
        </div>
      </header>

      {/* Grid Version */}
      <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2">
        {projects.map((p) => (
          <article
            key={`card-${p.id}`}
            data-project-card
            data-id={p.id}
            data-status={p.status}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-slate-900">{p.name}</h2>
            <p className="mt-1 text-sm text-slate-600">Status: {p.status}</p>
          </article>
        ))}
      </div>

      {/* List Version */}
      <ul className="divide-y divide-slate-100 rounded-lg border border-slate-200 bg-white shadow-sm">
        {projects.map((p) => (
          <li
            key={`row-${p.id}`}
            data-role="project-row"
            data-project-id={p.id}
            className="flex items-center justify-between gap-3 px-4 py-3 transition-colors"
          >
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-slate-900">{p.name}</div>
              <div className="text-xs text-slate-400">ID: {p.id}</div>
            </div>

            <button
              type="button"
              data-role="details-button"
              className="shrink-0 rounded-md border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50 focus:ring-2 focus:ring-slate-400 outline-none"
            >
              Details
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
