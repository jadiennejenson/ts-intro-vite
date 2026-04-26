import { useState, useEffect } from "react";
import type { AnyEntity, Project, Task, TeamMember } from "../helpers/types";
import { updateEntity } from "../helpers/entityHelpers";
import { loadEntities, saveEntities, splitEntities } from "../helpers/storage";
import { isProject, isTask, isTeamMember } from "../helpers/typeGuards";

export default function Generics() {
  const [entities, setEntities] = useState<AnyEntity[]>([]);

  // Seed data if empty on component mount
  useEffect(() => {
    const existing = loadEntities();
    if (existing.length > 0) {
      return;
    }

    const now = Date.now();

    const project: Project = {
      id: "p1",
      kind: "project",
      createdAt: now,
      name: "Capstone Planning",
      status: "active",
      description: "Sprint 7 work",
    };

    const task: Task = {
      id: "t1",
      kind: "task",
      createdAt: now,
      projectId: "p1",
      title: "Add utility types",
      completed: false,
    };

    const member: TeamMember = {
      id: "m1",
      kind: "member",
      createdAt: now,
      fullName: "Sam Rivera",
      role: "dev",
      email: "sam@example.com",
    };

    const initialEntities = [project, task, member];
    saveEntities(initialEntities);
  }, []);

  const handleAction = (id: string, action: string) => {
    const current = loadEntities();
    const found = current.find((x) => x.id === id);
    if (!found) return;

    let updated: AnyEntity = found;

    // Runtime narrowing first (type guard), then type-safe patching (utility types).
    if (action === "project-done" && isProject(found)) {
      updated = updateEntity(found, { status: "done" });
    } else if (action === "task-toggle" && isTask(found)) {
      updated = updateEntity(found, { completed: !found.completed });
    } else if (action === "member-promote" && isTeamMember(found)) {
      updated = updateEntity(found, { role: "pm" });
    } else {
      // If action doesn't match entity kind, we do nothing safely.
      return;
    }

    const next = current.map((x) => (x.id === id ? updated : x));
    saveEntities(next);
    setEntities(next);
  };

  const { projects, tasks, members } = splitEntities(entities);

  return (
    <div className="flex flex-col gap-8 p-4 sm:p-12 bg-slate-50 min-h-screen w-full">
      <div className="w-full max-w-4xl xl:max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-800 mb-4">
          Advanced Generics Demo
        </h1>
        <p className="text-slate-600 mb-8">
          This page demonstrates advanced TypeScript patterns: discriminated unions, type guards,
          utility types, and runtime type safety with mixed entity storage.
        </p>

        {/* Projects Section */}
        <div className="mb-8 bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Projects</h2>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id} className="flex items-center justify-between p-3 bg-slate-50 rounded">
                <span className="text-slate-700">
                  {project.name} ({project.status})
                  {project.description && <span className="text-sm text-slate-500 ml-2">— {project.description}</span>}
                </span>
                {project.status !== "done" && (
                  <button
                    onClick={() => handleAction(project.id, "project-done")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    Mark Done
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tasks Section */}
        <div className="mb-8 bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Tasks</h2>
          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-slate-50 rounded">
                <span className={`text-slate-700 ${task.completed ? 'line-through text-slate-500' : ''}`}>
                  {task.title} ({task.completed ? "done" : "open"})
                </span>
                <button
                  onClick={() => handleAction(task.id, "task-toggle")}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  Toggle Complete
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Team Members Section */}
        <div className="mb-8 bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Team Members</h2>
          <div className="space-y-3">
            {members.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-3 bg-slate-50 rounded">
                <span className="text-slate-700">
                  {member.fullName} ({member.role})
                  {member.email && <span className="text-sm text-slate-500 ml-2">— {member.email}</span>}
                </span>
                {member.role !== "pm" && (
                  <button
                    onClick={() => handleAction(member.id, "member-promote")}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    Promote to PM
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Technical Details */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded">
          <h3 className="text-lg font-semibold text-slate-800 mb-3">Advanced TypeScript Patterns Demonstrated:</h3>
          <ul className="space-y-2 text-slate-700">
            <li><strong>Discriminated Unions:</strong> <code className="bg-slate-200 px-2 py-1 rounded text-sm">AnyEntity = Project | Task | TeamMember</code></li>
            <li><strong>Type Guards:</strong> Runtime type checking with <code className="bg-slate-200 px-2 py-1 rounded text-sm">isProject()</code>, <code className="bg-slate-200 px-2 py-1 rounded text-sm">isTask()</code>, <code className="bg-slate-200 px-2 py-1 rounded text-sm">isTeamMember()</code></li>
            <li><strong>Utility Types:</strong> <code className="bg-slate-200 px-2 py-1 rounded text-sm">EntityPatch&lt;T&gt;</code> for safe partial updates</li>
            <li><strong>Generic Constraints:</strong> Type-safe entity updates with <code className="bg-slate-200 px-2 py-1 rounded text-sm">updateEntity()</code></li>
            <li><strong>Persistent Storage:</strong> Mixed entity arrays stored in localStorage with validation</li>
          </ul>
        </div>

        {/* Generic Functions Section */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Generic Functions Demo</h2>
          <p className="text-slate-600 mb-6">
            These functions demonstrate TypeScript generic patterns: function overloads, generic constraints, and type-safe transformations.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Function Overloads Demo */}
            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="font-semibold text-slate-800 mb-2">Function Overloads</h3>
              <div className="text-sm text-slate-600 font-mono bg-slate-800 text-orange-300 p-3 rounded">
{`function getEntityById<T extends AnyEntity>(
  entities: T[], id: string
): T | undefined;
function getEntityById(
  entities: AnyEntity[], id: string
): AnyEntity | undefined;
function getEntityById(
  entities: AnyEntity[], id: string
): AnyEntity | undefined {
  return entities.find(e => e.id === id);
}`}
              </div>
              <div className="mt-3 p-3 bg-orange-50 rounded">
                <p className="text-sm text-slate-700">
                  Result: {(() => {
                    const found = getEntityById(entities, "p1");
                    return found ? (found.kind === "project" ? (found as Project).name : "not a project") : "not found";
                  })()}
                </p>
              </div>
            </div>

            {/* Generic Filter Demo */}
            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="font-semibold text-slate-800 mb-2">Generic Filter Function</h3>
              <div className="text-sm text-slate-600 font-mono bg-slate-800 text-orange-300 p-3 rounded">
{`function filterByKind<T extends AnyEntity>(
  entities: T[], 
  kind: T["kind"]
): T[] {
  return entities.filter(e => e.kind === kind);
}

// Usage with type inference
const activeProjects = filterByKind(entities, "project");`}
              </div>
              <div className="mt-3 p-3 bg-orange-50 rounded">
                <p className="text-sm text-slate-700">
                  Projects found: {filterByKind(entities, "project").length}
                </p>
              </div>
            </div>

            {/* Generic Mapper Demo */}
            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="font-semibold text-slate-800 mb-2">Generic Mapper</h3>
              <div className="text-sm text-slate-600 font-mono bg-slate-800 text-orange-300 p-3 rounded">
{`function mapEntities<T extends AnyEntity, K>(
  entities: T[],
  selector: (e: T) => K
): K[] {
  return entities.map(selector);
}

// Extract names from any entity type
const names = mapEntities(entities, e => e.id);`}
              </div>
              <div className="mt-3 p-3 bg-orange-50 rounded">
                <p className="text-sm text-slate-700">
                  Entity IDs: {mapEntities(entities, e => e.id).join(", ") || "none"}
                </p>
              </div>
            </div>

            {/* Generic Reducer Demo */}
            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="font-semibold text-slate-800 mb-2">Generic Reducer</h3>
              <div className="text-sm text-slate-600 font-mono bg-slate-800 text-orange-300 p-3 rounded">
{`function groupByKind<T extends AnyEntity>(
  entities: T[]
): Record<string, T[]> {
  return entities.reduce((acc, entity) => {
    const key = entity.kind;
    (acc[key] ??= []).push(entity);
    return acc;
  }, {} as Record<string, T[]>);
}`}
              </div>
              <div className="mt-3 p-3 bg-orange-50 rounded">
                <p className="text-sm text-slate-700">
                  Groups: {Object.keys(groupByKind(entities)).join(", ") || "none"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper functions defined outside component to demonstrate generic patterns

// Function overloads - different return types based on input
function getEntityById<T extends AnyEntity>(entities: T[], id: string): T | undefined;
function getEntityById(entities: AnyEntity[], id: string): AnyEntity | undefined;
function getEntityById(entities: AnyEntity[], id: string): AnyEntity | undefined {
  return entities.find((e) => e.id === id);
}

// Generic filter function with constraint
function filterByKind<T extends AnyEntity>(entities: T[], kind: T["kind"]): T[] {
  return entities.filter((e) => e.kind === kind);
}

// Generic mapper with callback
function mapEntities<T extends AnyEntity, K>(entities: T[], selector: (e: T) => K): K[] {
  return entities.map(selector);
}

// Generic reducer to group entities
function groupByKind<T extends AnyEntity>(entities: T[]): Record<string, T[]> {
  return entities.reduce((acc, entity) => {
    const key = entity.kind;
    (acc[key] ??= []).push(entity);
    return acc;
  }, {} as Record<string, T[]>);
}