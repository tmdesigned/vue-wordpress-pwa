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
    scrollSpy.mockClear()

    wrapper.vm.nextPage()

    expect(wrapper.vm.currentPage).toBe(2)
    expect(scrollSpy).toHaveBeenCalledWith({ top: 0, behavior: 'auto' })
  })

  it('scrolls to the top when moving to the previous page', () => {
    const wrapper = mountArchive()
    wrapper.vm.nextPage()
    scrollSpy.mockClear()

    wrapper.vm.prevPage()

    expect(wrapper.vm.currentPage).toBe(1)
    expect(scrollSpy).toHaveBeenCalledWith({ top: 0, behavior: 'auto' })
  })

  it('does not scroll when next is unavailable on the last page', () => {
    const wrapper = mountArchive()
    wrapper.vm.nextPage()
    wrapper.vm.nextPage()
    scrollSpy.mockClear()

    wrapper.vm.nextPage()

    expect(wrapper.vm.currentPage).toBe(3)
    expect(scrollSpy).not.toHaveBeenCalled()
  })
})
