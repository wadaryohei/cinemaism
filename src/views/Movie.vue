<template>
  <div>
    <h2>ムービーの詳細画面です : {{ $route.params.id }}</h2>
    <p>
      {{ moviesInfo.original_title }}
    </p>
    <p>
      {{ moviesInfo.overview }}
    </p>

    <img :src="'http://image.tmdb.org/t/p/w300/' + moviesInfo.poster_path" :alt="moviesInfo.original_title">

    <button @click="pushMovieStorage()">保存</button>
  </div>
</template>

<script>

export default {
  name: 'Movie',

  data () {
    return {
      moviesInfo: {},
      moviesInfoLists: []
    }
  },

  created () {
    this.initMoviesInfo()
  },

  methods: {
    initMoviesInfo () {
      let id = this.$route.params.id
      this.$axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.getApiKey}`)
        .then((res) => {
          this.moviesInfo = res.data
        })
        .catch((error) => {
          // 取得できなかった場合のエラー処理が必要
          console.log(error + 'Don\'t get moviesinfo.')
        })
    },

    pushMovieStorage () {
      if (localStorage.getItem('moviesInfo') === null) {
        this.moviesInfoLists.push(this.moviesInfo)
        localStorage.setItem('moviesInfo', JSON.stringify(this.moviesInfoLists))
      } else {
        let currentStorage = JSON.parse(localStorage.getItem('moviesInfo'))
        currentStorage.push(this.moviesInfo)
        localStorage.setItem('moviesInfo', JSON.stringify(currentStorage))
      }

      alert('保存しました')
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
