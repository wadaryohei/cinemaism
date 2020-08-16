import { GetterTree } from 'vuex'
import { PageCountState } from '@/store/PageCount/types'
import { RootState } from '@/store/types'

const getters: GetterTree<PageCountState, RootState> = {
  pageCountGetters: (state: PageCountState): number => {
    return state.count
  }
}

export default getters
