
export default {
  namespaced: true,

  state: {
    pageCount: 1
  },

  mutations: {
    getPreviewPage (state) {
      state.pageCount--
      localStorage.setItem('pageCount', JSON.stringify(state.pageCount))
      state.pageCount = JSON.parse(localStorage.getItem('pageCount'))
    },

    getNextPage (state) {
      state.pageCount++
      localStorage.setItem('pageCount', JSON.stringify(state.pageCount))
      state.pageCount = JSON.parse(localStorage.getItem('pageCount'))
    }
  }
}
