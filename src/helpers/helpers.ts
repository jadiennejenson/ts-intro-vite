// src/helpers.ts
export function sumHours(hours: number[]): number {
  // We start at 0 so even an empty array returns 0 (not undefined)
  return hours.reduce((total, h) => total + h, 0)
}
