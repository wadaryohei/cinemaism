import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { RootState } from './types'
import { inbox } from './Inbox'
import { pageCount } from './PageCount'

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  state: {
    version: '1.0.0'
  },
  modules: {
    inbox,
    pageCount
  }
}

export default new Vuex.Store<RootState>(store)
