import { Module } from 'vuex'
import { InboxState } from '@/store/Inbox/types'
import { RootState } from '@/store/types'
import mutations from './mutations'
import getters from './getters'

const state: InboxState = {
  count: 0
}

export const inbox: Module<InboxState, RootState> = {
  namespaced: true,
  state,
  mutations,
  getters
}
