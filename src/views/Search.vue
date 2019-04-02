<template>
  <div>
    <h1>Searchです</h1>
    <inputWord></inputWord>
    <ul>
      <li class="movie-lists" v-for="(movie, index) in movies" :key="index">
        <p>{{ movie.id }}</p>
          <router-link :to="{ name : 'movie-info', params : { id: movie.id } }">
            <img with="200px" height="auto" :src="'http://image.tmdb.org/t/p/w300/' + movie.poster_path" :alt="movie.original_title">
          </router-link>
      </li>
    </ul>
  </div>
</template>

<script>

import inputWord from '@/components/InputWord'

export default {
  name: 'Search',

  components: {
    inputWord
  },

  data () {
    return {
      movies: {},
      inputWord: ''
    }
  },

  created () {
    this.getMovieInfo()
  },

  watch: {
    /**
     * @see https://router.vuejs.org/guide/advanced/data-fetching.html#fetching-after-navigation
     * ルートが変更されたらこのメソッドを再び呼び出すためにwatchで監視
     */
    '$route': 'getMovieInfo'
  },

  computed: {
    getApiKey () {
      return process.env.VUE_APP_API_KEY
    }
  },

  methods: {
    getMovieInfo () {
      console.log(this.$route.query.q)
      this.$axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${this.getApiKey}&query=${this.$route.query.q}`)
        .then((res) => {
          this.movies = res.data.results
        })
        .catch((err) => {
          console.log(err + 'Don\'t get the movie info from API')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
