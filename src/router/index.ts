import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  { path: '/', name: 'Home', component: () => import(/* webpackChunkName: "home" */ '../views/Home/Home.vue') },
  { path: '/search', name: 'Search', component: () => import(/* webpackChunkName: "search" */ '../views/Search/Search.vue') },
  { path: '/popular', name: 'Popular', component: () => import(/* webpackChunkName: "popular" */ '../views/Popular/Popular.vue') },
  { path: '/movie/:id', name: 'Movie', component: () => import(/* webpackChunkName: "movie" */ '../views/Movie/Movie.vue') },
  { path: '/about', name: 'About', component: () => import(/* webpackChunkName: "about" */ '../views/About/About.vue') }
  /**
   * @memo Routing Sample
   */
  // {
  //   path: '/example',
  //   name: 'example',
  //   // route level code-splitting
  //   // this generates a separate chunk (example.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "example" */ '../views/Example/Example.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
