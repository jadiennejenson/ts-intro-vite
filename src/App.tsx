import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home'; // 1. Import your Home component
import ProjectsPage from './pages/ProjectsPage';

export default function App() {
  return (
    <Router>
      <nav className="p-4 bg-slate-100 flex gap-4 w-full">
        <div className="max-w-5xl mx-auto flex gap-4 w-full"> 
          <Link to="/">Home</Link> {/* 2. Changed /Home to / to match the route */}
          <Link to="/projects">Projects</Link>
          <Link to="/tracker">Tracker</Link>
          <Link to="/help">Help</Link>
        </div>
      </nav>

      <Routes>
        {/* 3. Render the actual Home component here */}
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/tracker" element={<>Tracker</>} />
        <Route path="/help" element={<>Help</>} />
      </Routes>
    </Router>
  );
}