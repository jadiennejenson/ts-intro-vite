/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import './App.css';
import { projects } from "./data/projects";
import { ProjectDashboard } from "./components/ProjectDashboard";
import HelperComponent from "./helpers/HelperComponent";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="min-h-dvh bg-slate-50">

      <ProjectDashboard projects={projects} selectedProjectId={null} onProjectClick={function (_id: string): void {
        throw new Error('Function not implemented.');
      } } />

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

      </div>

      
    </main>
  );
}
