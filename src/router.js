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
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: loadVIew('About')
    },
    { path: '/search', name: 'search', component: loadVIew('Search') },
    { path: '/movie/:id', name: 'movie', component: loadVIew('Movie') }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 1, y: 0 }
    }
  }
})
