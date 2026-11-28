import { formatDate } from '@/utils/format-date'

describe('formatDate', () => {
  it('formats a valid ISO date as "Month D, YYYY"', () => {
    // Local-time constructor avoids timezone shifts in the assertion.
    const iso = new Date(2024, 2, 5).toISOString()
    expect(formatDate(iso)).toBe('March 5, 2024')
  })

  it('returns an empty string for invalid input', () => {
    expect(formatDate('not a date')).toBe('')
  })

  it('returns an empty string for empty input', () => {
    expect(formatDate('')).toBe('')
    expect(formatDate(undefined)).toBe('')
  })
})
