import { formatTaskLabel, sumHours, formatAssignee, formatStatus, summarizeTask, getTaskHours, type Task } from './helpers'

console.log('Total hours (should be 6):', sumHours([1, 2, 3]))
console.log(formatTaskLabel('Fix login bug', 'Website Redesign'))
console.log(formatAssignee())
console.log(formatAssignee('  Sam  '))
console.log(formatStatus())
console.log(formatStatus('done'))


const tasks: Task[] = [
  { name: 'Fix login bug', project: 'Website Redesign', hours: 2.5, assignee: 'Sam', status: 'done' },
  { name: 'Write status report', project: 'Website Redesign', assignee: undefined, status: 'open' },
  { name: 'Plan sprint', project: 'Internal', hours: 1 }
]

for (const t of tasks) {
  console.log(summarizeTask(t))
}

const total = sumHours(tasks.map(getTaskHours))
console.log('Total tracked hours:', total)

function Helpers() {
    return <div>Helpers Module Loaded - Check Console for Output</div>
}

export default Helpers