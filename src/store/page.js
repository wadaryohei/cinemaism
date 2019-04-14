
export default {
  namespaced: true,

  state: {
    load: false
  },

  mutations: {
    loading (state) {
      state.load = true
    },

    loaded (state) {
      state.load = false
    }
  }
}
