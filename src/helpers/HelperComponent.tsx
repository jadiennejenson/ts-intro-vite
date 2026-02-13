import { formatTaskLabel, sumHours, formatAssignee, formatStatus } from './helpers'

console.log('Total hours (should be 6):', sumHours([1, 2, 3]))
console.log(formatTaskLabel('Fix login bug', 'Website Redesign'))
console.log(formatAssignee())
console.log(formatAssignee('  Sam  '))
console.log(formatStatus())
console.log(formatStatus('done'))

function Helpers() {
    return <div>Helpers Module Loaded - Check Console for Output</div>
}

export default Helpers