import Vue from 'vue'
import Vuex from 'vuex'
import page from '@/stores/page'
import inbox from '@/stores/inbox'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    page,
    inbox
  }
})
