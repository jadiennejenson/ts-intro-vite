import { useState } from 'react'
import './App.css'
import viteLogo from '/vite.svg'
import reactLogo from '../src/assets/react.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="bg-blue-100 border-4 border-blue-500 rounded-lg p-8">
      <div className="flex justify-center gap-8 mb-8">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="h-40 p-3 hover:drop-shadow-lg transition" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="h-40 p-3 hover:drop-shadow-lg transition" alt="React logo" />
        </a>
      </div>

      <br></br>

      <h1>Vite + TypeScript: Deployed with Vercel 🚀</h1>

      <br></br>
      <p className="text-center bg-gray-300">If you can read this on the live site, continuous deployment is working.</p>
      
      <button 
        onClick={() => setCount((count) => count + 1)}
        className="mt-6 px-8 py-4 text-lg font-semibold bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        count is {count}
      </button>
    </div>
  );
}

export default App;
