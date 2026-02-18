import { projects } from "../data/projects";
import { formatDueDate } from "../utils/projectUtils";
import { findProjectById } from "../utils/projectUtils";


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
//the map function creates a new array by applying a transformation to 
// each element of the filtered array.
//this causes the type to widen back to TrackerCard, 
// since we're not guaranteed to have daysleft on all cards.
// We can also map to a different shape if we want to, 
// since this is a new array.


  .map((t) => ({
    id: t.id,
    heading: t.heading,
    status: t.status,
    dueDate: t.dueDate,
    pointsLabel: `${t.daysleft || 0} days left`,
  }));


const openPointsTotal: number = trackerCards
//the filter function creates a new array containing only the 
// elements of trackerCards that satisfy the condition t.status === "open".
  .filter((t) => t.status === "open")


  .reduce((sum, t) => sum + (t.daysleft || 0), 0);

console.log("openCards", openCards);
console.log("openPointsTotal", openPointsTotal); 

const p3 = findProjectById(projects, "p3");
if (p3) {
  console.log("Found p3:", p3.name, p3.status, p3.dueDate);
} else {
  console.log("p3 not found (unexpected in sample data)");
}


function TrackerCard() {
  //the return statement defines the JSX that will be rendered by this component. 
  // It includes two sections: one for all projects and another for active projects. 
  // Each section maps over the respective array of tracker cards and renders a list item for each card, displaying its heading, due date, and status.
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
