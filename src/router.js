import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

/**
 *
 * @param {String} view
 * @see https://qiita.com/hshota28/items/765cf903f055754f7557#dynamic-import
 */
function loadVIew (view) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    { path: '/about', name: 'about', component: loadVIew('About') },
    { path: '/search', name: 'search', component: loadVIew('Search') },
    { path: '/popular', name: 'popular', component: loadVIew('Popular') },
    { path: '/movie/:id', name: 'movie', component: loadVIew('Movie') }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
