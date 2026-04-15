import "./style.css";
import type { Entity } from "../domain/entities";
import { renderEntityCard } from "../ui/renderEntityCard";

export default function Unions() {

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
  container.append(renderEntityCard(e));
}

app.append(container);

 const data = ['Item 1', 'Item 2'];
return (
  <div>
    {data.map((text, i) => (
      <div key={i}>{text}</div> // ✅ This is a ReactNode
    ))}
  </div>
);
}

