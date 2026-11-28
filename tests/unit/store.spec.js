import { createStore } from '@/store'

const makePosts = (count) =>
  Array.from({ length: count }, (_, i) => ({
    slug: `post-${i + 1}`,
    title: `Post ${i + 1}`,
    date: new Date(Date.UTC(2024, 0, 30 - i)).toISOString()
  }))

describe('store getters', () => {
  const posts = makePosts(7)
  const store = createStore({ posts, pages: [] })

  describe('postPage', () => {
    it('returns the first page slice', () => {
      const slugs = store.getters.postPage(1, 3).map((p) => p.slug)
      expect(slugs).toEqual(['post-1', 'post-2', 'post-3'])
    })

    it('returns later pages', () => {
      const slugs = store.getters.postPage(2, 3).map((p) => p.slug)
      expect(slugs).toEqual(['post-4', 'post-5', 'post-6'])
    })

    it('returns a partial final page', () => {
      const slugs = store.getters.postPage(3, 3).map((p) => p.slug)
      expect(slugs).toEqual(['post-7'])
    })

    it('returns an empty array past the end', () => {
      expect(store.getters.postPage(10, 3)).toEqual([])
    })
  })

  describe('postIndex', () => {
    it('returns the index of a known slug', () => {
      expect(store.getters.postIndex('post-1')).toBe(0)
      expect(store.getters.postIndex('post-5')).toBe(4)
    })

    it('returns null for an unknown slug', () => {
      expect(store.getters.postIndex('missing')).toBeNull()
    })
  })

  describe('postListingBySlug', () => {
    it('returns the post for a known slug', () => {
      expect(store.getters.postListingBySlug('post-3').title).toBe('Post 3')
    })

    it('returns null for an unknown slug', () => {
      expect(store.getters.postListingBySlug('missing')).toBeNull()
    })
  })

  it('exposes totalPosts', () => {
    expect(store.getters.totalPosts).toBe(7)
  })
})
