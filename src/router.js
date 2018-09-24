import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Archive from './views/Archive.vue';
import Post from './views/Post.vue';
import Page from './views/Page.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: Page,
      meta: { slug : "about" }
    },
    {
      path: '/archive',
      name: 'archive',
      component: Archive
    },
    {
      path: '/contact',
      name: 'contact',
      component: Page,
      meta: { slug : "contact" }
    },
    {
      path: '/post',
      name: 'post-home',
      component: Archive
    },
    {
      path: '/post/:slug',
      name: 'post',
      component: Post
    },
    {
      path: '/resume',
      name: 'resume',
      component: Page,
      meta: { slug : "resume" }
    },
    {
      path: '*', 
      redirect: '/' 
    }
  ]
})
