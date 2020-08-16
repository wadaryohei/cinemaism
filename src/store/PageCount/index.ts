import { Module } from 'vuex'
import { PageCountState } from '@/store/PageCount/types'
import { RootState } from '@/store/types'
import mutations from './mutations'
import getters from './getters'

const state: PageCountState = {
  count: 1
}

export const pageCount: Module<PageCountState, RootState> = {
  namespaced: true,
  state,
  mutations,
  getters
}
