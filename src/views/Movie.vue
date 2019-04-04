<template>
  <div>
    <h2>ムービーの詳細画面です : {{ $route.params.id }}</h2>
    <p>
      {{ movies.original_title }}
    </p>
    <p>
      {{ movies.overview }}
    </p>

    <img :src="'http://image.tmdb.org/t/p/w300/' + movies.poster_path" :alt="movies.original_title">
    <button :disabled="hasLocalStorageMoviesId || hasCurrentId" @click="pushMovieStorage()">保存</button>
  </div>
</template>

<script>

export default {
  name: 'Movie',

  data () {
    return {
      movies: {},
      moviesList: [],
      moviesId: [],
      hasCurrentId: false
    }
  },

  created () {
    this.fetchData()
  },

  methods: {
    /**
     * paramsで受けとったidをもとにAPIを叩く
     */
    fetchData () {
      let id = this.$route.params.id
      this.$axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.getApiKey}`)
        .then((res) => {
          this.movies = res.data
        })
        .catch((error) => {
          // 取得できなかった場合のエラー処理が必要
          console.log(error + 'Don\'t get moviesinfo.')
        })
    },

    /**
     * localStorageにMovieを保存
     */
    pushMovieStorage () {
      // もしnullなら普通にlocalStorageに保存
      if (localStorage.getItem('movies') === null) {
        this.moviesList.push(this.movies)
        localStorage.setItem('movies', JSON.stringify(this.moviesList))

        this.moviesId.push(this.$route.params.id)
        localStorage.setItem('moviesId', JSON.stringify(this.moviesId))
      } else {
        // すでにlocalStorageに存在するなら配列に戻してから保存する
        let currentStorage = JSON.parse(localStorage.getItem('movies'))
        let currentStorageId = JSON.parse(localStorage.getItem('moviesId'))

        currentStorage.push(this.movies)
        currentStorageId.push(this.$route.params.id)

        localStorage.setItem('movies', JSON.stringify(currentStorage))
        localStorage.setItem('moviesId', JSON.stringify(currentStorageId))
      }

      this.hasCurrentId = true
      alert('保存しました')
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
     * localStorageに保存されているMovieIDかチェックして存在するなら保存できない
     */
    hasLocalStorageMoviesId () {
      let paramsId = Number(this.$route.params.id)
      let currentStorageId = JSON.parse(localStorage.getItem('moviesId'))

      if (currentStorageId === null) return

      let hasCurrentStorageId = currentStorageId.some(id => {
        return paramsId === id
      })
      // return hasCurrentStorageId ? true : falseと同じ
      return !!hasCurrentStorageId
    }
  }
}
</script>
