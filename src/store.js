import Vue from 'vue'
import Vuex from 'vuex'
import page from '@/store/page'
import inbox from '@/store/inbox'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    page,
    inbox
  }
})
