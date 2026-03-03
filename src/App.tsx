import { useState } from 'react';
import './App.css';
import { trackerCard } from './sandbox/trackerBasics';
import { projects } from "./data/projects";
import { countByStatus } from "./utils/projectUtils";
import { ProjectDashboard } from "./components/ProjectDashboard";
import HelperComponent from "./helpers/HelperComponent";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="min-h-dvh bg-slate-50">
      {/* Sprint 4 UI */}
      <div className="mx-auto w-full max-w-5xl p-4">
        <h1 className="text-2xl font-bold text-slate-900">Time Tracker</h1>
        <p className="mt-1 text-sm text-slate-600">Sprint 4: DOM Selection & Manipulation</p>
      </div>

      <ProjectDashboard />

      {/* Sprint 3 UI / Legacy Section */}
      <div className="mx-auto w-full max-w-5xl p-4 space-y-6">
        <div className="bg-blue-100 border-4 border-blue-500 rounded-lg p-8">
          <HelperComponent />
          <h1 className="text-xl font-bold mt-4">MyFirstVite + TypeScript</h1>
          
          <button 
            onClick={() => setCount((c) => c + 1)}
            className="mt-6 px-8 py-4 bg-blue-500 text-white rounded-lg"
          >
            count is {count}
          </button>
        </div>

        <div className="p-6 bg-green-100 border-4 border-green-500 rounded-lg">
          <h2 className="font-bold">Summary</h2>
          <ul className="list-disc ml-5">
            <li>Planned: {countByStatus(projects, "draft")}</li>
            <li>Active: {countByStatus(projects, "active")}</li>
            <li>Blocked: {countByStatus(projects, "paused")}</li>
            <li>Done: {countByStatus(projects, "completed")}</li>
          </ul>
        </div>

        <div className="mt-10 text-gray-600 text-xs">
          <pre>{JSON.stringify(trackerCard, null, 2)}</pre>
        </div>
      </div>
    </main>
  );
}
