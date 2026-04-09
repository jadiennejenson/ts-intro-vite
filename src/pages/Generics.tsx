import { useMemo } from "react";
import { DataManager } from "../data/DataManager";
import type { Project, Task, TeamMember } from "../models/entities";

export default function Generics() {
  // Create DataManager instances as generic containers for different types
  const { projects, tasks, team } = useMemo(() => {
    const projects = new DataManager<Project>();
    const tasks = new DataManager<Task>();
    const team = new DataManager<TeamMember>();

    // Add sample project data
    projects.add({ id: "p1", name: "Website Redesign", status: "active" });
    projects.add({ id: "p2", name: "Mobile MVP", status: "planned" });

    // Add sample task data
    tasks.add({ id: "t1", projectId: "p1", title: "Create wireframes", done: false, priority: "high" });
    tasks.add({ id: "t2", projectId: "p1", title: "Design mockups", done: true, priority: "medium" });

    // Add sample team member data
    team.add({ id: "u1", fullName: "Avery Chen", role: "pm", assignedProjectIds: ["p1", "p2"] });
    team.add({ id: "u2", fullName: "Jordan Smith", role: "dev", assignedProjectIds: ["p1"] });

    return { projects, tasks, team };
  }, []);

  return (
    <div className="flex flex-col gap-8 p-4 sm:p-12 bg-slate-50 min-h-screen w-full">
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-800 mb-4">
          Generic DataManager Demo
        </h1>
        <p className="text-slate-600 mb-8">
          This page demonstrates TypeScript generics using a{" "}
          <code className="bg-slate-200 px-2 py-1 rounded">DataManager&lt;T&gt;</code> class
          that works with any type: Project, Task, and TeamMember.
        </p>

        {/* Projects Section */}
        <div className="mb-8 bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Projects</h2>
          <pre className="bg-slate-100 p-4 rounded overflow-auto text-xs sm:text-sm text-slate-700">
            {JSON.stringify(projects.getAll(), null, 2)}
          </pre>
        </div>

        {/* Tasks Section */}
        <div className="mb-8 bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Tasks</h2>
          <pre className="bg-slate-100 p-4 rounded overflow-auto text-xs sm:text-sm text-slate-700">
            {JSON.stringify(tasks.getAll(), null, 2)}
          </pre>
        </div>

        {/* Team Members Section */}
        <div className="mb-8 bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Team Members</h2>
          <pre className="bg-slate-100 p-4 rounded overflow-auto text-xs sm:text-sm text-slate-700">
            {JSON.stringify(team.getAll(), null, 2)}
          </pre>
        </div>

        {/* Info Note */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded">
          <p className="text-slate-700">
            <strong>💡 Note:</strong> Uncomment the intentional type error below in your code to see TypeScript protecting you:
          </p>
          <code className="block bg-slate-200 p-3 mt-2 rounded text-xs sm:text-sm text-red-700">
            {/* tasks.add({{ id: "p3", name: "Not a Task", status: "done" }}); */}
          </code>
        </div>
      </div>
    </div>
  );
}
