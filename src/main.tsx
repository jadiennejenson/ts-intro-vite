import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

//temp for testing

import { ProjectService } from './services/ProjectService'; import { projects } from './data/projects';

import "./style.css";
import type { Entity } from "./domain/entities";
import { EntityCard } from "./ui/EntityCard";

const entities: Entity[] = [
  {
    kind: "project",
    id: "p1",
    name: "Website Redesign",
    status: "active",
    budgetUsd: 12000,
  },
  {
    kind: "task",
    id: "t1",
    name: "Build landing page",
    projectId: "p1",
    dueDateIso: "2026-01-15",
    completed: false,
  },
  {
    kind: "member",
    id: "m1",
    name: "Avery",
    role: "dev",
    availability: "full-time",
  },
];

const app = document.querySelector<HTMLDivElement>("#app");
if (!app) throw new Error("Missing #app element");

app.className = "min-h-screen bg-slate-50 p-6";

const container = document.createElement("div");
container.className = "grid gap-4 md:grid-cols-2";

for (const e of entities) {
  container.append(EntityCard(e));
}

app.append(container);

//const svc = new ProjectService(projects); 
//console.log('ProjectService count:', svc.count()); 
//console.log('ProjectService getAll:', svc.getAll());

// When you call a method on an instance, `this` refers to that instance.

const svc = new ProjectService(projects);
svc.filterByStatus('active');
// Inside filterByStatus, `this` === svc
// So `this.projects` === svc.projects

// You can create multiple instances, each with their own state:
const svc1 = new ProjectService(projects.slice(0, 3)); 
const svc2 = new ProjectService(projects.slice(3));

const svc3 = new ProjectService(projects); 
const fn = svc3.count; //This is just a reference to the count function, 
// not bound to any instance.
console.log(fn()); // 3 console.log('svc2 count:', svc2.count()); // 3 

console.log(svc1.count()); // 2
console.log(svc2.count()); // 1
// svc1.projects and svc2.projects are completely separate arrays.
// `this` in svc1.count() refers to svc1.
// `this` in svc2.count() refers to svc2.

const serviceTest4 = new ProjectService(projects);
  serviceTest4.add({
    id: 'hacked', name: 'Rogue Project',
    status: 'active', clientName: 'Nobody',
    client: undefined
  });
console.log('After mutation, serviceTest4 count:', serviceTest4.count()); // 7 (unexpected) console.log
// ('Original projects array length:', projects.length); // 6 (unexpected side effect)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
