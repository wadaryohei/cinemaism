<template>
  <div>
    <input class="searchbox" type="search" v-model.trim="inputWord" placeholder="映画のタイトルを検索する" @keydown.enter="getMovieInfo">
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

<style lang="scss" scoped>
.searchbox {
  position: fixed;
  bottom: 40px;
  right: 40px;
  z-index: 3;
  border: none;
  outline: none;
  padding: 0 0 0 20px;
  border-radius: 30px;
  width: 250px;
  height: 48px;
  transform: scale(1);
  font-size: 1.2rem;
  letter-spacing: .1rem;
  background-color: #1db954;
  color: #fff;
  &::placeholder {
    color: #fff;
  }

  &::-webkit-search-cancel-button {
    position:relative;
    right: 15px;
  }
}
</style>
