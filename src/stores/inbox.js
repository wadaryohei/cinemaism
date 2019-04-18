
export default {
  namespaced: true,

  state: {
    inboxCount: 0
  },

  mutations: {
    countStorages (state, storage) {
      state.inboxCount = storage.length
    }
  }
}
