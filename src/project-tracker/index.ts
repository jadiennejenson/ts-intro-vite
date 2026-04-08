export { sampleProjects } from "./sampleData";
export {
  isNonEmptyString,
  isValidEstimateHours,
  isProjectStatus,
  validateProject
} from "./validation";
//the purpose of the functions in validation.ts is to check if the data we receive (e.g., from a form or an API) is valid and can be safely used as a Project object in our application. 
// These functions help ensure that the data conforms to the expected types and formats, which helps prevent bugs and errors when we try to use the data later on.
//barriel file src/project-tracker/index.ts, we are re-exporting the types defined in types.ts so that other parts of our application can import them from a single location. 
//This makes it easier to manage our imports and keeps our code organized. By exporting these types, we can use them in other files to ensure type safety when working with projects and their related data.
export type { Project, ProjectStatus, StatusFilter, ProjectTrackerState } from "./types";