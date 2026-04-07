import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Tracker from './pages/Tracker';
import ProjectsPage from './pages/ProjectsPage';
import  Render  from  './pages/Render'

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
    <Router>
      <nav className="p-4 bg-slate-100 flex gap-4 w-full shrink-0">
        <div className="max-w-5xl mx-auto flex gap-4 w-full justify-center"> 
          <Link to="/">Home</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/tracker">Tracker</Link>
          <Link to="/render">Render</Link>
        </div>
      </nav>

      {/* This main tag expands to fill all remaining vertical space */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/render" element={<Render />} />
        </Routes>
      </main>
    </Router>
  </div>
  );
}