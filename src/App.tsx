import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Tracker from './pages/Tracker';
import ProjectsPage from './pages/ProjectsPage';
import { Render } from './pages/Render'
import Generics from './pages/Generics';
import StoreManager from './pages/StoreManager';
import './App.css';

import Unions from './pages/Unions';
import "./index.css";

// ✅ Import the Unions PAGE, not the individual card


export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <nav className="p-4 bg-slate-800 flex items-center justify-between w-full shrink-0">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <span className="text-white font-semibold text-lg hidden sm:block">ProjectTracker</span>
          </div>
          
          {/* Hamburger Menu Button */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          
          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex gap-4 ml-6"> 
            <Link to="/" className="text-slate-300 hover:text-white transition-colors text-sm">Home</Link>
            <Link to="/projects" className="text-slate-300 hover:text-white transition-colors text-sm">Projects</Link>
            <Link to="/tracker" className="text-slate-300 hover:text-white transition-colors text-sm">Tracker</Link>
            <Link to="/render" className="text-slate-300 hover:text-white transition-colors text-sm">Render</Link>
            <Link to="/generics" className="text-slate-300 hover:text-white transition-colors text-sm">Generics</Link>
            <Link to="/unions" className="text-slate-300 hover:text-white transition-colors text-sm">Unions</Link>
            <Link to="/stores" className="text-slate-300 hover:text-white transition-colors text-sm">Stores</Link>
          </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-800 border-t border-slate-700">
            <div className="flex flex-col p-4 gap-2">
              <Link to="/" className="text-slate-300 hover:text-white transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/projects" className="text-slate-300 hover:text-white transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Projects</Link>
              <Link to="/tracker" className="text-slate-300 hover:text-white transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Tracker</Link>
              <Link to="/render" className="text-slate-300 hover:text-white transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Render</Link>
              <Link to="/generics" className="text-slate-300 hover:text-white transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Generics</Link>
              <Link to="/unions" className="text-slate-300 hover:text-white transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Unions</Link>
              <Link to="/stores" className="text-slate-300 hover:text-white transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Stores</Link>
            </div>
          </div>
        )}

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/tracker" element={<Tracker />} />
            <Route path="/render" element={<Render />} />
            <Route path="/generics" element={<Generics />} />
            {/* ✅ Point the route to the Unions component */}
            <Route path="/unions" element={<Unions />} />
            <Route path="/stores" element={<StoreManager />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}