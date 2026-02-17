import { useEffect, useRef } from "react";
import type { Project } from "../models/project";

export type ProjectDashboardProps = {
  projects: Project[];
};

export function ProjectDashboard(props: ProjectDashboardProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
    const root = containerRef.current;
     if (!root) return;
    if (!root) {
      console.warn("ProjectDashboard: containerRef is not set yet.");
      return;
    }
    console.log("ProjectDashboard mounted. Root element:", root);
  }, []);

  return (
    <section
      ref={containerRef}
      className="mx-auto w-full max-w-5xl p-4"
      aria-label="Project dashboard"
    >
      <header className="mb-4">
        <h2 className="text-xl font-semibold text-slate-900">Project Dashboard</h2>
        <p className="text-sm text-slate-600">
          This component will demonstrate DOM selection using a ref-scoped container.
        </p>
      </header>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <p className="text-sm text-slate-700">
          Projects loaded: <span className="font-medium">{props.projects.length}</span>
        </p>
      </div>
    </section>
  );
}