import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAnalytics from 'vue-analytics'
import '@/model/_shared/fontAwesome.js'
import '@/assets/sass/style.scss'

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
