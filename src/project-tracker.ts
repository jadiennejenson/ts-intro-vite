export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold';
  // Add any other fields your project needs
}

export type Projects = Project[];

// Example utility function to check if a project is active
export function isProjectActive(project: Project): boolean {
  return project.status === 'active';
}

// Example utility function to check if a project can be edited
export function canEditProject(project: Project): boolean {
  return project.status !== 'completed';
}

// Example utility function to check if a project is overdue (assuming we have a dueDate field)
export function isProjectOverdue(project: Project): boolean {
  if (!('dueDate' in project)) {
    return false; // If there's no due date, we can't say it's overdue
  }

  const today = new Date();
  const dueDate = new Date((project as { dueDate: string }).dueDate); // Type assertion since dueDate is not in the base Project type

  return today > dueDate;
}
