<template>
  <div>
    <input type="search" v-model.trim="inputWord" placeholder="Enter keywords" @keydown.enter="getMovieInfo">
  </div>
</template>

<script>
export default {
  name: 'InputWord',

  data () {
    return {
      inputWord: ''
    }
  },

  methods: {
    /**
     * 検索ボックスの値をrouter先にqueryで渡して遷移する
     */
    getMovieInfo (event) {
      if (event.keyCode !== 13) return
      // @see https://router.vuejs.org/ja/guide/essentials/navigation.html
      this.$router.push({ name: 'search', query: { q: this.inputWord } })
    }
  }
}
</script>
