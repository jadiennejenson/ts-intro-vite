import { useState, useEffect } from "react";

interface Timer {
  id: string;
  name: string;
  seconds: number;
  isRunning: boolean;
}

export default function Tracker() {
  const [timers, setTimers] = useState<Timer[]>([
    { id: "1", name: "Billing Integration", seconds: 0, isRunning: false },
    { id: "2", name: "API Development", seconds: 0, isRunning: false },
  ]);

  // Update running timers every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) =>
        prev.map((t) => (t.isRunning ? { ...t, seconds: t.seconds + 1 } : t))
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleTimer = (id: string) => {
    setTimers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isRunning: !t.isRunning } : t))
    );
  };

  const formatTime = (totalSec: number) => {
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-white p-12 flex flex-col items-center">
      {/* 1. The Header from your Image */}
      <header className="text-center mb-16">
        <h1 className="text-8xl font-black text-slate-900 tracking-tight mb-4">
          Time Tracker
        </h1>
        <p className="text-2xl text-slate-500 font-medium">
          Sprint 4: DOM Selection & Manipulation
        </p>
      </header>

      {/* 2. Functional Timers */}
      <div className="w-full max-w-3xl space-y-4">
        {timers.map((timer) => (
          <div key={timer.id} className="flex items-center justify-between p-6 border rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div>
              <h3 className="text-xl font-bold text-slate-800">{timer.name}</h3>
              <p className="text-slate-400 font-mono text-sm">ID: {timer.id}</p>
            </div>
            
            <div className="flex items-center gap-8">
              <span className="text-3xl font-mono font-bold text-slate-700">
                {formatTime(timer.seconds)}
              </span>
              <button
                onClick={() => toggleTimer(timer.id)}
                className={`px-6 py-2 rounded-lg font-bold transition-colors ${
                  timer.isRunning 
                  ? "bg-red-100 text-red-600 hover:bg-red-200" 
                  : "bg-slate-900 text-white hover:bg-slate-800"
                }`}
              >
                {timer.isRunning ? "Stop" : "Start"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}