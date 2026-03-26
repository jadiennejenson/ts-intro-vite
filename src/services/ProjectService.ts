import type { Project, ProjectStatus} from "../models/project";

export class ProjectService {
  // The projects array is the class's internal state.
  // We'll make it private in Topic 4 — for now, keep it simple.
  private projects: Project[];

  /**
   * Constructor: runs once when you create a new instance.
   * @param initial - Starting list of projects (defaults to empty)
   */

  // We use a constructor to initialize the service with an optional list of projects.
  //project data is often fetched from an API, so starting with an empty array is common.
  constructor(initial: Project[] = []) {
    // Make a copy so we don't accidentally mutate the original array.
    this.projects = [...initial];//makes a shallow copy of the initial array to ensure that the service has its own copy of the projects data. 
    // This prevents unintended side effects if the original array is modified elsewhere in the code.

  }

  /** Get all projects. */
  public getAll(): Project[] {
    return this.projects;
  }

  /** Get the count of projects. */
  public count = (): number => this.projects.length;

  public filterByStatus(status: ProjectStatus | 'all'): Project[] {
    if (status === 'all') return this.getAll();
    return this.projects.filter(p => p.status === status);
  }

  /** Find a project by ID. Returns undefined if not found. */
  findById(id: string): Project | undefined {
    return this.projects.find(p => p.id === id);
  }

  /** Add a new project. Returns the added project. */
  public add(project: Project): Project {
    this.projects = [...this.projects, project];
    return project;
  }

  /** Remove a project by ID. Returns true if found and removed. */
  public remove(id: string): boolean {
    const before = this.projects.length;
    this.projects = this.projects.filter(p => p.id !== id);
    return this.projects.length < before;
  }
}

// Usage:
// const service = new ProjectService(initialData);
// console.log(service.count()); // 6
// console.log(service.getAll()); // [...projects]