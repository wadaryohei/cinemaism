import { GetterTree } from 'vuex'
import { InboxState } from '@/store/Inbox/types'
import { RootState } from '@/store/types'

const getters: GetterTree<InboxState, RootState> = {
  countGetters: (state: InboxState): number => {
    return state.count
  }
}

export default getters
