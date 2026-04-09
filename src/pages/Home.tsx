import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    /* 1. Use w-full and px-4 to prevent content from hitting the edges on mobile */
    <div className="flex flex-col items-center gap-8 p-4 sm:p-12 bg-slate-50 min-h-screen w-full">
      
      {/* 2. Blue Vite Box: Uses w-full to grow, but max-w-4xl on large screens and max-w-6xl on xl screens */}
      <div className="w-full max-w-4xl xl:max-w-6xl bg-blue-50 border-4 border-blue-400 rounded-xl p-6 sm:p-12 text-center shadow-sm">
        <p className="text-xs sm:text-sm text-slate-600 mb-4 font-medium">
          Helpers Module Loaded - Check Console for Output
        </p>
        
        {/* 3. Text scales with screen size (text-4xl on mobile, text-6xl on desktop) */}
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-800 mb-8 leading-tight">
          MyFirstVite + <br className="hidden sm:block" /> TypeScript
        </h1>
        
        <button 
          onClick={() => setCount(c => c + 1)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all active:scale-95"
        >
          count is {count}
        </button>
      </div>

      {/* 4. Green Summary Box: Follows the same responsive width pattern */}
      <div className="w-full max-w-4xl xl:max-w-6xl bg-green-50 border-4 border-green-500 rounded-xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-center font-bold text-slate-800 text-xl mb-4 underline decoration-green-300 underline-offset-4">
          Summary
        </h2>
        <ul className="space-y-2 max-w-[200px] mx-auto">
           {/* Custom bullet style to match your original image exactly */}
           <li className="flex items-center gap-4 text-slate-700 font-medium">
             <span className="h-2 w-2 rounded-full bg-slate-800 shrink-0" /> Planned: 0
           </li>
           <li className="flex items-center gap-4 text-slate-700 font-medium">
             <span className="h-2 w-2 rounded-full bg-slate-800 shrink-0" /> Active: 1
           </li>
           <li className="flex items-center gap-4 text-slate-700 font-medium">
             <span className="h-2 w-2 rounded-full bg-slate-800 shrink-0" /> Blocked: 0
           </li>
           <li className="flex items-center gap-4 text-slate-700 font-medium">
             <span className="h-2 w-2 rounded-full bg-slate-800 shrink-0" /> Done: 0
           </li>
        </ul>
      </div>
    </div>
  );
}