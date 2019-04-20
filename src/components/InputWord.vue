<template>
  <div>
    <input
      class="searchbox"
      type="text"
      placeholder="映画のタイトルを検索する"
      v-model.trim="inputWord"
      @keydown.enter="getMovieInfo"
      ref="input"
    >
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

  watch: {
    /**
     * @see https://router.vuejs.org/guide/advanced/data-fetching.html#fetching-after-navigation
     * ルートが変更されたらこのメソッドを再び呼び出すためにwatchで監視
     */
    '$route': 'getMovieInfo'
  },

  methods: {
    /**
     * 検索ボックスの値をrouter先にqueryで渡して遷移する
     */
    getMovieInfo (event) {
      if (event.keyCode !== 13) return
      // @see https://router.vuejs.org/ja/guide/essentials/navigation.html
      this.$router.push({ name: 'search', query: { q: this.inputWord } })
      this.$store.commit('page/loading')
      this.$refs.input.blur()
    }
  }
}
</script>

<style lang="scss" scoped>
.searchbox {
  position: fixed;
  bottom: 40px;
  right: 40px;
  z-index: 0;
  border: none;
  outline: none;
  padding: 15px 13px;
  line-height: 1.5;
  border-radius: 30px;
  width: 250px;
  transform: scale(.9);
  font-size: 1.6rem;
  letter-spacing: .1rem;
  background-color: #1db954;
  color: #fff;

  @include max(767) {
    right: 50%;
    transform: translateX(50%);
  }

  &::placeholder {
    color: #fff;
  }

  &::-webkit-search-cancel-button {
    position:relative;
    right: 15px;
  }
}
</style>
