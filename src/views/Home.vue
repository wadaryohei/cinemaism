<template>
  <div>
    <div v-if="isLocalStorage">
      <button @click="removeAllStorage()">一括で削除する</button>
      <ul>
        <li class="movie-lists" v-for="(currentStorage, index) in currentStorages" :key="index">
          <p>{{ currentStorage.id }}</p>
            <router-link :to="{ name : 'movie', params : { id: currentStorage.id }}">
              <img with="200px" height="auto" :src="'http://image.tmdb.org/t/p/w300/' + currentStorage.poster_path" :alt="currentStorage.original_title">
            </router-link>
            <button @click="removeStorage(index)">削除する</button>
        </li>
      </ul>
    </div>

    <div v-else>
      <inputWord></inputWord>
    </div>
  </div>
</template>

<script>

import inputWord from '@/components/InputWord'

export default {
  name: 'home',

  components: {
    inputWord
  },

  data () {
    return {
      movies: {},
      currentStorages: [],
      currentStoragesId: []
    }
  },

  created () {
    /**
     * localStorageがnullでなければcurrentStorageに配列で入れる
     */
    if (localStorage.getItem('movies') !== null) {
      this.currentStorages = JSON.parse(localStorage.getItem('movies'))
    }
  },

  methods: {
    /**
     * localStorageを配列に戻して削除してからlocalStorageに戻す
     */
    removeStorage (index) {
      this.currentStorages = JSON.parse(localStorage.getItem('movies'))
      this.currentStoragesId = JSON.parse(localStorage.getItem('moviesId'))

      this.currentStorages.splice(index, 1)
      this.currentStoragesId.splice(index, 1)

      localStorage.setItem('movies', JSON.stringify(this.currentStorages))
      localStorage.setItem('moviesId', JSON.stringify(this.currentStoragesId))

      alert('削除しました')
    },

    removeAllStorage () {
      localStorage.clear()
      alert('すべて削除しました')
      this.$router.go({ name: 'home' })
    }
  },

  computed: {
    /**
     * localStorageの要素が0かどうか調べる
     */
    isLocalStorage () {
      if (this.currentStorages.length === 0) {
        localStorage.clear()
        return false
      }
      return true
    }
  }
}
</script>
