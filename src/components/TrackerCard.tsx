import { projects } from "../data/projects";
import { formatDueDate } from "../utils/projectUtils";

type TrackerCard = {
  id: string;
  heading: string; // formatted title
  isDone: boolean;
  pointsLabel: string;
  dueDate: string;
};

const trackerCards: TrackerCard[] = projects.map((project): TrackerCard => {
  return {
    id: project.id,
    heading: project.name.toUpperCase(),
    isDone: project.status === "completed",
    pointsLabel: "",
    dueDate: formatDueDate(project),
  };
});

console.log("trackerCards", trackerCards);

// Notice: original data is unchanged
console.log("original projects still intact", projects);

function TrackerCard() {
  return (
    <section style={{ marginTop: 3 }}>
      <h2>Active Projects</h2>
      <ul>
        {trackerCards.map((card) => (
          <li key={card.id}>
            <strong>{card.heading}</strong> — Due: {card.dueDate} — 
            Status: {card.isDone ? "Completed" : "In Progress"} 
          </li>
        ))}
      </ul>
    </section>
  );
}
