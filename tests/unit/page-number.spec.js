import { parsePageNumber, pageCount } from '@/utils/page-number.js'

describe('parsePageNumber', () => {
  it('accepts a page within range', () => {
    expect(parsePageNumber('3', 5)).toBe(3)
    expect(parsePageNumber(1, 5)).toBe(1)
    expect(parsePageNumber(5, 5)).toBe(5)
  })

  it('trims surrounding whitespace', () => {
    expect(parsePageNumber(' 2 ', 5)).toBe(2)
  })

  it('rejects out of range pages', () => {
    expect(parsePageNumber('0', 5)).toBeNull()
    expect(parsePageNumber('6', 5)).toBeNull()
    expect(parsePageNumber('-1', 5)).toBeNull()
  })

  it('rejects non-integer input', () => {
    expect(parsePageNumber('', 5)).toBeNull()
    expect(parsePageNumber('abc', 5)).toBeNull()
    expect(parsePageNumber('2.5', 5)).toBeNull()
  })

  it('returns null when there are no pages', () => {
    expect(parsePageNumber('1', 0)).toBeNull()
  })
})

describe('pageCount', () => {
  it('rounds up partial pages', () => {
    expect(pageCount(12, 5)).toBe(3)
    expect(pageCount(10, 5)).toBe(2)
  })

  it('returns at least one page', () => {
    expect(pageCount(0, 5)).toBe(1)
  })
})
