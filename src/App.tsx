import { useState } from 'react'
import './App.css'
/* import viteLogo from '/vite.svg'
import reactLogo from '../src/assets/react.svg' */
import "./sandbox/trackerBasics"
import { trackerCard } from './sandbox/trackerBasics'
import { projects } from "./data/projects";
import { countByStatus, formatDueDate, getProjectsByStatus } from "./utils/projectUtils";
import type { ProjectStatus } from "./models/project";
import { formatProjectRecord, type ProjectRecord } from "./models/project.ts";
import { validateProject } from "./project-tracker";
import HelperComponent from "./helpers/HelperComponent";


const projectA = { name: "Project A", status: "active" as ProjectStatus };

function statusLabelIf(status: ProjectStatus): string {
  if (status === "active") return "Active";
  if (status === "paused") return "Blocked";
  if (status === "completed") return "Done";
  return "Draft";
}

function statusLabelSwitch(status: ProjectStatus): string {
  switch (status) {
    case "active": return "Active";
    case "paused": return "Blocked";
    case "completed": return "Done";
    default: return "Draft";
  }
}

function canEditProject(status: ProjectStatus): boolean {
  return status === "active" || status === "draft";
}

const lines = [
  `Project: ${projectA.name}`,
  `Status (if): ${statusLabelIf(projectA.status)}`,
  `Status (switch): ${statusLabelSwitch(projectA.status)}`,
  `Can edit? ${canEditProject(projectA.status)}`,
];

const records: ProjectRecord[] = [
  { id: "p10", name: "Brand Refresh", status: "draft", lastEditedAt: "2025-12-31" },
  { id: "p12", name: "SEO Audit", status: "paused", pauseReason: "Waiting on content" },
  { id: "p13", name: "Landing Page", status: "completed", completedAt: "2025-12-15" },
];

const sampleProjects = [
  { id: "p10", name: "Brand Refresh", status: "draft", lastEditedAt: "2025-12-31" },
  { id: "p11", name: "Client Portal", status: "active", days: 14 },
  { id: "p12", name: "SEO Audit", status: "paused", pauseReason: "Waiting on content" },
  { id: "p13", name: "Landing Page", status: "completed", completedAt: "2025-12-15" },
];

for (const r of records) {
  lines.push(formatProjectRecord(r));
}

console.log("--- Validating sampleProjects ---");
for (const p of sampleProjects) {
  const result = validateProject(p);
  console.log(p.id, result.ok ? "OK" : result);
}

console.log("--- Validating intentionally bad input ---");
const badInput: unknown = {
  id: "", // invalid
  name: "  ", // invalid
  owner: 42, // invalid type
  status: "in-progress", // not allowed
  estimateHours: -5, // invalid
  notes: "" // invalid when provided
};

const badResult = validateProject(badInput);
console.log(badResult);

const titlesViaFor: string[] = [];
//inital value, check the if condition, then increment
// 1) for loop: the classic way to iterate with an index
for (let i = 0; i < projects.length; i++) {
  titlesViaFor.push(projects[i].name);
}

// 2) forEach: also iterates, but typically used for side effects
const titlesViaForEach: string[] = [];
projects.forEach((project) => {
  titlesViaForEach.push(project.name);
});

console.log("titlesViaFor", titlesViaFor);
console.log("titlesViaForEach", titlesViaForEach);

function App() {
  const [count, setCount] = useState(0)
   const active = getProjectsByStatus(projects, "active");

  return (
    <>
      <div className="bg-blue-100 border-4 border-blue-500 rounded-lg p-8">
          <HelperComponent />
{/*         <div className="flex justify-center gap-8 mb-8">
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="h-40 p-3 hover:drop-shadow-lg transition" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="h-40 p-3 hover:drop-shadow-lg transition" alt="React logo" />
          </a>
        </div> */}

        <br></br>

 {       <h1>MyFirstVite + TypeScript: Deployed with Vercel 🚀</h1>

      /*  <br></br>
        <p className="text-center bg-gray-300">If you can read this on the live site, continuous deployment is working.</p> */}
        
        <button 
          onClick={() => setCount((count) => count + 1)}
          className="mt-6 px-8 py-4 text-lg font-semibold bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          count is {count}
        </button>
        <p>Welcome to the onboarding project!
          You're using Vite, TypeScript, and Git to get ready for real work.
        </p>
      </div>
      <div className="mt-10 text-center text-gray-600">
        <p>{JSON.stringify(trackerCard, null, 2)}</p>
      </div>
      <div className="mt-10 p-6 bg-green-100 border-4 border-green-500 rounded-lg">
<section style={{ marginTop: 3 }}>
        <h2>Summary</h2>
        <ul>
          <li>Planned: {countByStatus(projects, "draft")}</li>
          <li>Active: {countByStatus(projects, "active")}</li>
          <li>Blocked: {countByStatus(projects, "paused")}</li>
          <li>Done: {countByStatus(projects, "completed")}</li>
        </ul>
      </section>

  {/*     <section style={{ marginTop: 3 }}>
        <h2>Active Projects</h2>
        <ul>
          {active.map((project) => (
            <li key={project.id}>
              <strong>{project.name}</strong> — Due: {formatDueDate(project)} — Tags: {project.tags.join(", ")}
            </li>
          ))}
        </ul>
      </section> */}
      </div>
{/*       <div>
        `<pre>${lines.join("\n")}</pre>`
      </div> */}
    </>
  );
}



export default App;
