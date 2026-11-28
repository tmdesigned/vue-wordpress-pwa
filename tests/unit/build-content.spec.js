const { toPost, toPage, buildPosts } = require('../../scripts/build-content')

describe('build-content', () => {
  describe('toPost', () => {
    it('parses frontmatter and renders markdown', () => {
      const post = toPost({
        file: 'hello.md',
        data: { title: 'Hello', date: '2024-03-01', excerpt: 'Hi', image: 'img.png', tags: ['a'] },
        body: '# Heading\n\nSome **bold** text.'
      })
      expect(post.title).toBe('Hello')
      expect(post.excerpt).toBe('Hi')
      expect(post.featured_image).toBe('img.png')
      expect(post.tags).toEqual(['a'])
      expect(post.content).toContain('<h1')
      expect(post.content).toContain('<strong>bold</strong>')
    })

    it('falls back to the filename for slug and title', () => {
      const post = toPost({ file: 'my-post.md', data: {}, body: '' })
      expect(post.slug).toBe('my-post')
      expect(post.title).toBe('my-post')
    })

    it('prefers an explicit slug over the filename', () => {
      const post = toPost({ file: 'file.md', data: { slug: 'custom' }, body: '' })
      expect(post.slug).toBe('custom')
    })

    it('returns an empty date for invalid input', () => {
      expect(toPost({ file: 'a.md', data: { date: 'not a date' }, body: '' }).date).toBe('')
      expect(toPost({ file: 'a.md', data: {}, body: '' }).date).toBe('')
    })

    it('marks drafts', () => {
      expect(toPost({ file: 'a.md', data: { draft: true }, body: '' }).draft).toBe(true)
      expect(toPost({ file: 'a.md', data: {}, body: '' }).draft).toBe(false)
    })
  })

  describe('toPage', () => {
    it('uses slug fallback and renders markdown', () => {
      const page = toPage({ file: 'about.md', data: {}, body: 'Text' })
      expect(page.slug).toBe('about')
      expect(page.title).toBe('about')
      expect(page.content).toContain('<p>Text</p>')
    })
  })

  describe('buildPosts', () => {
    const entries = [
      { file: 'old.md', data: { title: 'Old', date: '2020-01-01' }, body: '' },
      { file: 'new.md', data: { title: 'New', date: '2024-06-01' }, body: '' },
      { file: 'mid.md', data: { title: 'Mid', date: '2022-05-05' }, body: '' },
      { file: 'draft.md', data: { title: 'Draft', date: '2025-01-01', draft: true }, body: '' }
    ]

    it('excludes drafts', () => {
      const titles = buildPosts(entries).map((p) => p.title)
      expect(titles).not.toContain('Draft')
    })

    it('sorts posts newest first', () => {
      const titles = buildPosts(entries).map((p) => p.title)
      expect(titles).toEqual(['New', 'Mid', 'Old'])
    })
  })
})
