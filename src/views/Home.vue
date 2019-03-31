<template>
  <div>
    <div v-if="isLocalStorage">
      <ul>
        <li class="movie-lists" v-for="(currentStorage, index) in currentStorages" :key="index">
          <p>{{ currentStorage.id }}</p>
            <router-link :to="{ name : 'movie-info', params : { id: currentStorage.id }}">
              <img with="200px" height="auto" :src="'http://image.tmdb.org/t/p/w300/' + currentStorage.poster_path" :alt="currentStorage.original_title">
            </router-link>
            <button @click="removeStorage(index)">削除する</button>
        </li>
      </ul>
    </div>

    <div v-else>
      <input type="search" v-model.trim="inputWord" placeholder="keyword enter">
      <button @click="getMovieInfo()">検索</button>
      <ul>
        <li class="movie-lists" v-for="(movie, index) in movies" :key="index">
          <p>{{ movie.id }}</p>
            <router-link :to="{ name : 'movie-info', params : { id: movie.id }}">
              <img with="200px" height="auto" :src="'http://image.tmdb.org/t/p/w300/' + movie.poster_path" :alt="movie.original_title">
            </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import search from '@/mixins/search'

export default {
  name: 'home',

  mixins: [
    search
  ],

  data () {
    return {
      currentStorages: []
    }
  },

  created () {
    if (localStorage.getItem('moviesInfo') !== null) {
      this.currentStorages = JSON.parse(localStorage.getItem('moviesInfo'))
      return
    }
    return false
  },

  computed: {
    isLocalStorage () {
      if (this.currentStorages.length === 0) {
        localStorage.clear()
        return false
      }
      return true
    }
  },

  methods: {
    removeStorage (index) {
      this.currentStorages = JSON.parse(localStorage.getItem('moviesInfo'))
      this.currentStorages.splice(index, 1)
      console.log(this.currentStorages.length)
      localStorage.setItem('moviesInfo', JSON.stringify(this.currentStorages))
      alert('削除しました')
    }
  }
}
</script>
