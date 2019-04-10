<template>
  <div>
    <inputWord></inputWord>
    <div v-if="movies.length === 0">
      <p class="movies-empty">
        「{{ $route.query.q }}」は存在しませんでした。<br />再度検索してください。
      </p>
    </div>
    <ul v-else class="l-row">
      <transition-group name="movie-lists">
      <li class="l-grid-6 movie-lists" v-for="movie in movies" :key="movie.id" v-cloak>
          <router-link :to="{ name : 'movie', params : { id: movie.id } }" class="movie-link">
            <img v-if="movie.poster_path === null" src="../assets/default_image.png" :alt="movie.original_title">
            <img v-else :src="'http://image.tmdb.org/t/p/w300/' + movie.poster_path" :alt="movie.original_title">
          </router-link>
          <h2 class="movie-title">{{ movie.original_title }}</h2>
          <span class="movie-release-date" v-if="movie.release_date">({{ movie.release_date.slice(0, 4) }})</span>
      </li>
      </transition-group>
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
    this.fetchData()
  },

  watch: {
    /**
     * @see https://router.vuejs.org/guide/advanced/data-fetching.html#fetching-after-navigation
     * ルートが変更されたらこのメソッドを再び呼び出すためにwatchで監視
     */
    '$route': 'fetchData'
  },

  computed: {
    /**
     * API_KEYを返すゲッター
     */
    getApiKey () {
      return process.env.VUE_APP_API_KEY
    }
  },

  methods: {
    /**
     * routeから受け取ったqueryの値をもとにAPIを叩く
     */
    fetchData () {
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

.movie-lists-enter-active,
.movie-lists-leave-active {
  opacity: 1;
  transform: translateY(0);
  transition: .5s ease;
}

.movie-lists-enter,
.movie-lists-leave-to {
  opacity: 0;
  transform: translateY(10px);
  transition: .5s ease;
}

.movie-lists {
  margin-top: 30px;
}

.movie-link {
  display: block;
}

.movie-title {
  color: #fff;
  margin-top: 5px;
  font-size: 1.4rem;
  font-weight: 800;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.movie-release-date {
  color: #929292;
}

.movies-empty {
  text-align: center;
  color: #fff;
}

</style>
