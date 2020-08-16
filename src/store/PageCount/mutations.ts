import { MutationTree } from 'vuex'
import { PageCountState } from '@/store/PageCount/types'

const mutations: MutationTree<PageCountState> = {
  /**
   * ページ遷移のアクション
   */
  gotoPage: (state: PageCountState, targetPageCount: number) => {
    state.count = targetPageCount
  }
}

export default mutations
