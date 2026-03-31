export function sumHours(hours: number[]): number {

  // This function takes an array of numbers representing hours and returns their total sum.
  // The reduce method iterates through the array, adding each hour to a running total, starting from 0.
  // We start at 0 so even an empty array returns 0 (not undefined)
  return hours.reduce((total, h) => total + h, 0)
}