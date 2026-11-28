import Vue from 'vue'
import Vuex from 'vuex'
import content from '@/content/content.json'

Vue.use(Vuex)

// Posts and pages are generated at build time from content/ (see scripts/build-content.js).
export function createStoreOptions (data = content) {
  const postsBySlug = {}
  data.posts.forEach((post) => { postsBySlug[post.slug] = post })
  const pagesBySlug = {}
  data.pages.forEach((page) => { pagesBySlug[page.slug] = page })

  return {
    state: {
      numberOfPosts: data.posts.length,
      posts: postsBySlug, // dictionary keyed on slug
      pages: pagesBySlug, // dictionary keyed on slug
      postsByDate: data.posts, // array, newest first
      postsLoaded: true
    },
    getters: {
      postsLoaded: (state) => state.postsLoaded,
      totalPosts: (state) => state.numberOfPosts,
      posts: (state) => state.posts,
      postPage: (state) => (page, perPage) => {
        const offset = (page - 1) * perPage
        const to = Math.min(page * perPage, state.postsByDate.length)
        return state.postsByDate.slice(offset, to)
      },
      postIndex: (state) => (slug) => {
        for (let i = 0; i < state.postsByDate.length; i++) {
          if (state.postsByDate[i].slug === slug) return i
        }
        return null
      },
      postListingBySlug: (state) => (slug) => {
        for (let i = 0; i < state.postsByDate.length; i++) {
          if (state.postsByDate[i].slug === slug) return state.postsByDate[i]
        }
        return null
      }
    },
    mutations: {},
    actions: {}
  }
}

export function createStore (data = content) {
  return new Vuex.Store(createStoreOptions(data))
}

export default createStore()
