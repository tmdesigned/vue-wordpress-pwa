/**
 * @jest-environment jsdom
 */
import Vue from 'vue'
import Vuex from 'vuex'
import { mount } from '@vue/test-utils'
import Archive from '@/views/Archive.vue'
import { createStoreOptions } from '@/store'

Vue.use(Vuex)

// 12 posts with a 5-per-page archive gives 3 pages.
const posts = Array.from({ length: 12 }, (_, i) => ({
  slug: `post-${i + 1}`,
  title: `Post ${i + 1}`,
  date: new Date(Date.UTC(2024, 0, 30 - i)).toISOString(),
  excerpt: '',
  featured_image: ''
}))

function mountArchive () {
  const store = new Vuex.Store(createStoreOptions({ posts, pages: [] }))
  return mount(Archive, {
    store,
    stubs: ['router-link']
  })
}

describe('Archive pagination', () => {
  let scrollSpy

  beforeEach(() => {
    scrollSpy = jest.spyOn(window, 'scrollTo').mockImplementation(() => {})
  })

  afterEach(() => {
    scrollSpy.mockRestore()
  })

  it('scrolls to the top when moving to the next page', () => {
    const wrapper = mountArchive()
    wrapper.vm.toggleView() // list view pages
    scrollSpy.mockClear()

    wrapper.vm.nextPage()

    expect(wrapper.vm.currentPage).toBe(2)
    expect(scrollSpy).toHaveBeenCalledWith({ top: 0, behavior: 'auto' })
  })

  it('scrolls to the top when moving to the previous page', () => {
    const wrapper = mountArchive()
    wrapper.vm.toggleView() // list view pages
    wrapper.vm.nextPage()
    scrollSpy.mockClear()

    wrapper.vm.prevPage()

    expect(wrapper.vm.currentPage).toBe(1)
    expect(scrollSpy).toHaveBeenCalledWith({ top: 0, behavior: 'auto' })
  })

  it('jumps to a valid page number entered in the jump form', async () => {
    const wrapper = mountArchive()
    wrapper.vm.toggleView() // list view pages; gallery is the default
    await wrapper.vm.$nextTick()
    scrollSpy.mockClear()

    wrapper.find('#archive-jump-input').setValue('2')
    await wrapper.find('form.archive-jump').trigger('submit')

    expect(wrapper.vm.currentPage).toBe(2)
    expect(scrollSpy).toHaveBeenCalledWith({ top: 0, behavior: 'auto' })
  })

  it('ignores an out-of-range page number in the jump form', async () => {
    const wrapper = mountArchive()
    wrapper.vm.toggleView()
    await wrapper.vm.$nextTick()

    wrapper.find('#archive-jump-input').setValue('99')
    await wrapper.find('form.archive-jump').trigger('submit')

    expect(wrapper.vm.currentPage).toBe(1)
  })

  it('toggles between gallery (default) and list view', async () => {
    const wrapper = mountArchive()
    expect(wrapper.vm.viewMode).toBe('gallery')
    expect(wrapper.find('ul.post-gallery').exists()).toBe(true)

    wrapper.vm.toggleView()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.viewMode).toBe('list')
    expect(wrapper.find('ul.post-gallery').exists()).toBe(false)

    wrapper.vm.toggleView()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.viewMode).toBe('gallery')
    expect(wrapper.find('ul.post-gallery').exists()).toBe(true)
  })

  it('shows 10 posts per page in list view and all posts in gallery', async () => {
    const wrapper = mountArchive()
    // 12 test posts: gallery loads all of them on one page
    expect(wrapper.vm.postsToShow.length).toBe(12)
    expect(wrapper.vm.pageCount).toBe(1)

    wrapper.vm.toggleView()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.postsPerPage).toBe(10)
    expect(wrapper.vm.postsToShow.length).toBe(10)
    expect(wrapper.vm.pageCount).toBe(2)
  })

  it('does not scroll when next is unavailable on the last page', () => {
    const wrapper = mountArchive()
    wrapper.vm.toggleView() // list view pages: 12 posts at 10 per page = 2 pages
    wrapper.vm.nextPage()
    scrollSpy.mockClear()

    wrapper.vm.nextPage()

    expect(wrapper.vm.currentPage).toBe(2)
    expect(scrollSpy).not.toHaveBeenCalled()
  })
})
