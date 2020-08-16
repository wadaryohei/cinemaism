import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import App from './App.vue'
import router from './router'
import store from './store'
import axios, { AxiosStatic } from 'axios'
import VueAnalytics from 'vue-analytics'
import '@/fontAwesome.js'
import '@/assets/sass/style.scss'

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosStatic;
  }
}
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(VueCompositionAPI)
Vue.use(VueAnalytics, {
  id: process.env.VUE_APP_API_GOOGLE_ANALYTICS,
  router
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
