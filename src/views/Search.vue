<template>
  <div>
    <div v-if="movies.length === 0">
      <p class="movies-empty">
        「{{ $route.query.q }}」は存在しませんでした。<br />再度検索してください。
      </p>
    </div>

    <movie-lists v-else :movies="movies"></movie-lists>

  </div>
</template>

<script>

import MovieLists from '@/components/MovieLists'

export default {
  name: 'Search',

  components: {
    MovieLists
  },

  data () {
    return {
      movies: {}
    }
  },

  created () {
    this.fetchData()
  },

  watch: {
    /**
     * @see https://router.vuejs.org/guide/advanced/data-fetching.html#fetching-after-navigation
     * ルートが変更されたらこのメソッドを再び呼び出すためにwatchで監視
     */
    '$route': 'fetchData'
  },

  methods: {
    /**
     * routeから受け取ったqueryの値をもとにAPIを叩く
     */
    fetchData () {
      this.$axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${this.getApiKey}&query=${this.$route.query.q}&language=${this.getLanguage}`)
        .then((res) => {
          this.movies = res.data.results
        })
        .catch((err) => {
          console.log(err + 'Don\'t get the movies info from API')
        })
    }
  },

  computed: {
    /**
     * API_KEYを返すゲッター
     */
    getApiKey () {
      return process.env.VUE_APP_API_KEY
    },

    /**
     * languageを返すゲッター
     */
    getLanguage () {
      return process.env.VUE_APP_API_LANGUAGE
    }
  }
}
</script>
<style lang="scss" scoped>

.movies-empty {
  text-align: center;
  color: #fff;
}

</style>
