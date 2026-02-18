// This file contains various helper functions that can be used across the app to perform common operations related to tasks and projects.
// It includes functions for summing hours, formatting task labels, assignee names, and status, as well as summarizing tasks into a readable format.
export function sumHours(hours: number[]): number {

  // This function takes an array of numbers representing hours and returns their total sum.
  // The reduce method iterates through the array, adding each hour to a running total, starting from 0.
  // We start at 0 so even an empty array returns 0 (not undefined)
  return hours.reduce((total, h) => total + h, 0)
}

// This helper function formats a task label by combining the project name and task name into a single string for display purposes.
export const formatTaskLabel = (taskName: string, projectName: string): string => {
  return `${projectName}: ${taskName}`
}

// This helper function formats the assignee name for display. 
// If no name is provided, it returns "Unassigned". 
// If a name is provided, it trims any extra whitespace and returns a string indicating who the task is assigned to.
export const formatAssignee = (assigneeName?: string): string => {
  if (assigneeName === undefined) {
    return 'Unassigned'
  }

  // Optional: trim to prevent weird spacing in labels
  const clean = assigneeName.trim()
  return clean.length === 0 ? 'Unassigned' : `Assigned to ${clean}`
}

// This helper function formats the status of a task for display. 
// It normalizes the input status string and returns a more user-friendly version of it. 
// If the status is not recognized, it defaults to "Open".
export const formatStatus = (status: string = 'open'): string => {
  // Normalize casing for display
  const clean = status.trim().toLowerCase()

  //if the if statement is true, it returns the value and exits the function. If not, it continues to the next condition.
  if (clean === 'in_progress') return 'In Progress'

// This part checks for the "done" status and returns "Done" if it matches.
  if (clean === 'done') return 'Done'

  // This part checks for the "blocked" status and returns "Blocked" if it matches.
  if (clean === 'blocked') return 'Blocked'

  // Default to "Open" for any unrecognized status, including "open"
  return 'Open'
}

// src/helpers.ts
// This file is meant to hold various helper functions that can be used across the app.
export type Task = {
  name: string
  project: string
  hours?: number
  assignee?: string
  status?: string
}

// This function safely extracts the hours from a task, defaulting to 0 if the hours property is missing.
export function getTaskHours(task: Task): number {
  // Default missing hours to 0 to keep totals stable
  return task.hours ?? 0
}

//this is an example of a more complex helper that combines multiple pieces of information into a single summary string for a task. 
// It uses the formatStatus and formatAssignee helpers to create a readable summary of the task's key details.

export function summarizeTask(task: Task): string {

  //this part constructs the base label with the project and task name, then conditionally adds status, assignee, 
  // and hours information if available.
  const base = `${task.project}: ${task.name}`

  //this part checks if the task has a status and formats it using the formatStatus helper. 
  // If there is no status, it simply leaves that part out.
  const statusPart = task.status ? ` [${formatStatus(task.status)}]` : ''
  
  //this part formats the assignee information using the formatAssignee helper, which handles both assigned and unassigned cases.
  const assigneePart = ` — ${formatAssignee(task.assignee)}`

  //this part retrieves the hours for the task using the getTaskHours helper, which defaults to 0 if hours are missing, and formats it for display.
  const hoursPart = ` — ${getTaskHours(task)}h`

  // Finally, we concatenate all the parts together to create the full summary string for the task.
  return base + statusPart + assigneePart + hoursPart
}

// (uses formatStatus + formatAssignee from earlier steps)
