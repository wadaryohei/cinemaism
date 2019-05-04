import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAnalytics from 'vue-analytics'

require('@/fontAwesome.js')
require('@/assets/sass/style.scss')

Vue.prototype.$axios = axios

Vue.use(VueAnalytics, {
  id: process.env.VUE_APP_API_GOOGLE_ANALYTICS,
  router
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
