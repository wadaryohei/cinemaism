<template>
  <div>
    <div v-if="movies.length === 0">
      <p class="movies-empty">
        「{{ $route.query.q }}」は存在しませんでした。<br />再度検索してください。
      </p>
    </div>
    <transition-group v-else mode="out-in" tag="ul" name="movie-lists" class="l-row movie-list">
      <li class="l-grid-4 movie-lists" :class="`movies-lists-${index + 1}`" v-for="(movie, index) in movies" :key="movie.id">
          <router-link :to="{ name : 'movie', params : { id: movie.id } }" class="movie-link">
            <img v-if="movie.poster_path === null" src="../assets/default_image.png" :alt="movie.original_title">
            <img v-else :src="'http://image.tmdb.org/t/p/w300' + movie.poster_path" :alt="movie.original_title">
          </router-link>
          <h2 class="movie-title">{{ movie.original_title }}</h2>
          <span class="movie-release-date" v-if="movie.release_date">({{ movie.release_date.slice(0, 4) }})</span>
      </li>
    </transition-group>
  </div>
</template>

<script>

export default {
  name: 'Search',

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
      return 'ja'
    }
  }
}
</script>
<style lang="scss" scoped>

@for $i from 1 through 20 {
  .movie-lists-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: .4s ease;

    &.movies-lists-#{$i} {
      transition-delay: #{50ms * $i}
    }
  }
}

.movie-lists-enter,
.movie-lists-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.movie-lists {
  margin-top: 30px;

  @include max(767) {
    @include l-grid(6);
  }
}

.movie-link {
  display: block;
  box-shadow: 0 5px 20px rgba(0,0,0,0.5);
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
