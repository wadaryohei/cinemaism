<template>
  <div>
    <div v-if="movies.length === 0">
      <p class="movies-empty">
        「{{ $route.query.q }}」は存在しませんでした。<br />再度検索してください。
      </p>
    </div>

    <movie-lists v-else :movies="movies"></movie-lists>

    <div class="pagination-wrapper">
      <span v-if="pageCount !== 1" class="pagination pagination-preview" @click="PreviewPage()">← PREVIEW</span>
      <span class="pagination pagination-next" @click="NextPage()">NEXT →</span>
    </div>
  </div>
</template>

<script>

import MovieLists from '@/components/MovieLists'

export default {
  name: 'Popular',

  components: {
    MovieLists
  },

  data () {
    return {
      movies: {},
      pageCount: 1
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
      if (JSON.parse(localStorage.getItem('pageCount')) === null) {
        this.pageCount = 1
      } else {
        this.pageCount = JSON.parse(localStorage.getItem('pageCount'))
      }

      this.$axios.get(`https://api.themoviedb.org/3/movie/popular?page=${this.pageCount}&api_key=${this.getApiKey}`)
        .then((res) => {
          this.movies = res.data.results
        })
        .catch((err) => {
          console.log(err + 'Don\'t get the movie info from API')
        })
    },

    /**
     * ページを戻ったときの処理
     */
    PreviewPage () {
      this.pageCount--
      localStorage.setItem('pageCount', JSON.stringify(this.pageCount))
      this.$router.push({ name: 'popular', query: { page: this.pageCount } })
    },

    /**
     * ページを進んだときの処理
     */
    NextPage () {
      this.pageCount++
      localStorage.setItem('pageCount', JSON.stringify(this.pageCount))
      this.$router.push({ name: 'popular', query: { page: this.pageCount } })
    }
  },

  computed: {
    /**
     * API_KEYを返すゲッター
     */
    getApiKey () {
      return process.env.VUE_APP_API_KEY
    }
  }
}
</script>

<style lang="scss" scoped>

.movie-lists-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: .4s ease;
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

.pagination-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(255,255,255,.3);
  margin-top: 3rem;
}

.pagination {
  margin-top: 2rem;
  font-size: 1.4rem;
  color: #fff;
  display: block;
  text-align: center;
}

.pagination-preview {
  width: 50%;
  text-align: left;
  cursor: pointer;
}

.pagination-next {
  color: #1db954;
  width: 50%;
  text-align: right;
  cursor: pointer;
}

</style>
