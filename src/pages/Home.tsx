import { useState } from "react";
// Optional: Install lucide-react for icons: npm install lucide-react
import { Layout, CheckCircle, Play, AlertCircle, Calendar } from "lucide-react";

export default function Home() {
  const [count, setCount] = useState(0);

  const stats = [
    { label: "Planned", value: 0, icon: <Calendar className="text-blue-500" />, color: "bg-blue-50" },
    { label: "Active", value: 1, icon: <Play className="text-green-500" />, color: "bg-green-50" },
    { label: "Blocked", value: 0, icon: <AlertCircle className="text-red-500" />, color: "bg-red-50" },
    { label: "Done", value: 0, icon: <CheckCircle className="text-purple-500" />, color: "bg-purple-50" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 w-full pb-12">
      {/* 1. HERO SECTION */}
      <section className="bg-white border-b border-slate-200 py-16 px-4 mb-8">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-blue-600 uppercase bg-blue-100 rounded-full">
            Vite + TypeScript + Tailwind
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight">
            Project <span className="text-blue-600">Workspace</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Manage your development sprints, track progress, and organize team tasks in one central dashboard.
          </p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => setCount(c => c + 1)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center gap-2"
            >
              Increment Counter: {count}
            </button>
          </div>
        </div>
      </section>

      {/* 2. STATS GRID (Replaces the Green Summary Box) */}
      <main className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-6">
          <Layout className="text-slate-400" size={24} />
          <h2 className="text-2xl font-bold text-slate-800">Project Summary</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                {stat.icon}
              </div>
              <p className="text-slate-500 font-medium mb-1">{stat.label}</p>
              <h3 className="text-3xl font-bold text-slate-900">{stat.value}</h3>
            </div>
          ))}
        </div>

        {/* 3. HELPERS INFO */}
        <div className="mt-12 p-4 bg-slate-800 rounded-xl flex items-center justify-between">
          <p className="text-slate-300 text-sm">
            <span className="text-green-400 font-mono mr-2">●</span> 
            Helpers Module Active
          </p>
          <button className="text-xs text-slate-400 hover:text-white underline">
            Check Console
          </button>
        </div>
      </main>
    </div>
  );
}