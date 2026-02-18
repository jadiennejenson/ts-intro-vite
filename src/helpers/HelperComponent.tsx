import { formatTaskLabel, sumHours, formatAssignee, formatStatus, summarizeTask, getTaskHours, type Task } from './helpers'

// Example usage of the helper functions. 
// This code demonstrates how to use the various helpers defined in the 
// helpers module to perform common operations related to tasks and projects.
console.log('Total hours (should be 6):', sumHours([1, 2, 3]))
console.log(formatTaskLabel('Fix login bug', 'Website Redesign'))
console.log(formatAssignee())
console.log(formatAssignee('  Sam  '))
console.log(formatStatus())
console.log(formatStatus('done'))

// Example of using the summarizeTask helper with a list of tasks. 
// This demonstrates how the helper combines multiple pieces of information into a single summary string for each task.
const tasks: Task[] = [
  { name: 'Fix login bug', project: 'Website Redesign', hours: 2.5, assignee: 'Sam', status: 'done' },
  { name: 'Write status report', project: 'Website Redesign', assignee: undefined, status: 'open' },
  { name: 'Plan sprint', project: 'Internal', hours: 1 }
]

// Loop through the tasks and log their summaries to the console.
for (const t of tasks) {
  console.log(summarizeTask(t))
}

// Calculate the total hours from the tasks using the getTaskHours helper to safely extract hours, 
// even if some tasks are missing that information.
const total = sumHours(tasks.map(getTaskHours))
console.log('Total tracked hours:', total)

// This is a simple React component that serves as a placeholder to indicate that the helpers module is loaded.
function Helpers() {
    return <div>Helpers Module Loaded - Check Console for Output</div>
}

// Export the Helpers component as the default export of this module.
export default Helpers