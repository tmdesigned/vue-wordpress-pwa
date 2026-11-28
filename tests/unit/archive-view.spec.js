import { normalizeArchiveView, nextArchiveView } from '@/utils/archive-view.js'

describe('normalizeArchiveView', () => {
  it('keeps known views', () => {
    expect(normalizeArchiveView('list')).toBe('list')
    expect(normalizeArchiveView('gallery')).toBe('gallery')
  })

  it('falls back to list for unknown values', () => {
    expect(normalizeArchiveView('grid')).toBe('list')
    expect(normalizeArchiveView(undefined)).toBe('list')
    expect(normalizeArchiveView(null)).toBe('list')
  })
})

describe('nextArchiveView', () => {
  it('toggles between list and gallery', () => {
    expect(nextArchiveView('list')).toBe('gallery')
    expect(nextArchiveView('gallery')).toBe('list')
  })

  it('treats an unknown value as list and toggles to gallery', () => {
    expect(nextArchiveView('nope')).toBe('gallery')
  })
})
