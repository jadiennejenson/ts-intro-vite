import { useRef } from "react";
import type { Project } from "../models/project";

export type ProjectDashboardProps = {
  projects: Project[];
};

//This function component renders a dashboard of projects and includes an input to find a project by its id. 
// When the "Find & focus" button is clicked, it highlights the corresponding project row and focuses the "Details" button within that row. 
// It uses refs to access the DOM elements for the container and input field, and it manipulates classes to apply the highlight effect.
export function ProjectDashboard(props: ProjectDashboardProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const idInputRef = useRef<HTMLInputElement | null>(null);

// This helper function clears any existing highlights from project rows before applying a new highlight to the selected row.
  function clearHighlights(root: HTMLElement) {
    const highlighted = root.querySelectorAll<HTMLElement>("[data-role='project-row'].bg-amber-50");
    highlighted.forEach((el) => {
      el.classList.remove("bg-amber-50", "ring-1", "ring-amber-300");
    });
  }

  // This function handles the logic for finding a project row by its id when the button is clicked.
  function handleFindById(): void {
    const root = containerRef.current;
    if (!root) return;

// Get the trimmed id from the input field. If it's empty, log a warning and exit.
// This function 
    const id = idInputRef.current?.value.trim();
    if (!id) {
      console.warn("Type a project id first.");
      return;
    }

// Use a data attribute selector to find the project row with the matching id. 
// If not found, log a warning and exit.
    const row = root.querySelector<HTMLElement>(`[data-project-id='${id}']`);
    if (!row) {
      console.warn("No row found for id:", id);
      return;
    }

// Clear any existing highlights, then add highlight classes to the found row and scroll it into view.
    clearHighlights(root);
    row.classList.add("bg-amber-50", "ring-1", "ring-amber-300");
    row.scrollIntoView({ behavior: "smooth", block: "center" });

// Finally, find the "Details" button within the highlighted row and focus it.
    const detailsBtn = row.querySelector<HTMLButtonElement>("[data-role='details-button']");
    detailsBtn?.focus();
  }

// The component returns a section containing a header with an input and button for finding projects, and a list of project rows. 
// Each row displays the project name and a "Details" button, and is marked with data attributes for selection.
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

{/* This part renders the list of projects. Each project is displayed in a row with its name and a "Details" button.--> */}
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