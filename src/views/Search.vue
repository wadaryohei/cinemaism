<template>
  <div>
    <input type="search" v-model.trim="inputWord" placeholder="keyword enter">
      <button @click="getMovieInfo()">検索</button>
      <p>{{ inputWord }}</p>
      <ul>
        <li class="movie-lists" v-for="(movie, index) in movies" :key="index">
          <p>{{ movie.id }}</p>
            <router-link :to="{ name : 'movie-info', params : { id: movie.id }}">
              <img with="200px" height="auto" :src="'http://image.tmdb.org/t/p/w300/' + movie.poster_path" :alt="movie.original_title">
            </router-link>
        </li>
      </ul>
  </div>
</template>

<script>
import search from '@/mixins/search'

export default {
  name: 'Search',

  mixins: [
    search
  ],

  created () {
    console.log(process.env.VUE_APP_API_KEY)
  }
}
</script>

<style lang="scss" scoped>
</style>
