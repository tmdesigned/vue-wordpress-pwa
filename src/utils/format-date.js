const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

// Formats an ISO date string as "Month D, YYYY". Returns '' for invalid input.
export function formatDate(value) {
  const date = new Date(value)
  if (isNaN(date.getTime())) return ''
  return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}
