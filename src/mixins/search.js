export default {
  data () {
    return {
      inputWord: '',
      movies: {}
    }
  },

  methods: {
    getMovieInfo () {
      let url = `https://api.themoviedb.org/3/search/movie?api_key=${this.getApiKey}&query=${this.inputWord}`
      this.$axios.get(url)
        .then((res) => {
          this.movies = res.data.results
        })
        .catch((err) => {
          console.log(err + 'Don\'t get the movie info from API')
        })
    }
  },

  computed: {
    getApiKey () {
      return process.env.VUE_APP_API_KEY
    }
  },

  watch: {
    /**
     * @see https://router.vuejs.org/guide/advanced/data-fetching.html#fetching-after-navigation
     * ルートが変更されたらこのメソッドを再び呼び出すためにwatchで監視
     */
    '$route': 'getMovieInfo'
  }
}
