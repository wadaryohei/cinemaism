import { MutationTree } from 'vuex'
import { InboxState } from '@/store/Inbox/types'

const mutations: MutationTree<InboxState> = {
  countStorages: (state: InboxState, storageCount: number) => {
    state.count = storageCount
  }
}

export default mutations
