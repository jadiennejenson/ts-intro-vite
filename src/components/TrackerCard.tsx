import { projects } from "../data/projects";
import { formatDueDate } from "../utils/projectUtils";


type TrackerCard = {
  id: string;
  heading: string; // formatted title
  status: string;
  pointsLabel: string;
  dueDate: string;
  daysleft?: number; // optional, only for active projects
};

const trackerCards: TrackerCard[] = projects.map((project): TrackerCard => {
  return {
    id: project.id,
    heading: project.name.toUpperCase(),
    status: project.status,
    pointsLabel: "",
    dueDate: formatDueDate(project),
  };
});

const activeProjects: TrackerCard[] = trackerCards.filter((card) => card.status === "active");

console.log("trackerCards", trackerCards);

// Notice: original data is unchanged
console.log("original projects still intact", projects);

const openCards: TrackerCard[] = trackerCards
  .filter((t) => t.status === "open")
  .map((t) => ({
    id: t.id,
    heading: t.heading,
    status: t.status,
    dueDate: t.dueDate,
    pointsLabel: `${t.daysleft || 0} days left`,
  }));

const openPointsTotal: number = trackerCards
  .filter((t) => t.status === "open")
  .reduce((sum, t) => sum + (t.daysleft || 0), 0);

console.log("openCards", openCards);
console.log("openPointsTotal", openPointsTotal); 

function TrackerCard() {
  return (
    <section style={{ marginTop: 3 }}>
      <h2>All Projects</h2>
      <ul>
        {trackerCards.map((card) => (
          <li key={card.id}>
            <strong>{card.heading}</strong> — Due: {card.dueDate} — 
            Status: {card.status === "completed" ? "Completed" : "In Progress"} 
          </li>
        ))}
      </ul>
      <h2>Active Projects</h2>
      <ul>
        {activeProjects.map((card) => (
          <li key={card.id}>
            <strong>{card.heading}</strong> — Due: {card.dueDate} — 
            Status: {card.status === "completed" ? "Completed" : "In Progress"} 
          </li>
        ))}
      </ul>
    </section>
  );
}
