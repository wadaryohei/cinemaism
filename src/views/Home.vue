<template>

  <div>
    <div v-if="isLocalStorage">
      <ul class="l-row">
        <li class="l-grid-12 movie-lists" v-for="(currentStorage, index) in currentStorages" :key="index" v-cloak>
            <router-link :to="{ name : 'movie', params : { id: currentStorage.id }}" class="movie-link">
              <img class="movie-images" :src="'https://image.tmdb.org/t/p/w500/' + currentStorage.backdrop_path" :alt="currentStorage.original_title">
            </router-link>
            <div class="movie-title-wrapper">
              <h2 class="movie-title">{{ currentStorage.original_title }}</h2>
            </div>

            <div class="movie-remove-btn-wrapper" @click="removeStorage(index)">
              <i class="movie-remove-btn far fa-check-circle"></i>
            </div>
        </li>
      </ul>
      <button class="movie-removeAll-btn" @click="removeAllStorage()">一括で削除する</button>
      <inputWord></inputWord>
    </div>

    <div v-else>
      <img class="about-image" src="../assets/movie_01.png" alt="">
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

<style lang="scss" scoped>

.movie-lists {
  width: 100%;
  height: 100%;
  position: relative;
}

.movie-remove-btn-wrapper {
  position: absolute;
  top: 10px;
  left: 20px;
  z-index: 1;
}

.movie-remove-btn {
  position: relative;
  z-index: 1;
  color: #fff;
  font-size: 3rem;
  cursor: pointer;
  transition: .4s ease;

  &:hover {
    transition: .2s ease;
    color: #1db954;
  }
}

.movie-removeAll-btn {
  border: none;
  outline: none;
  display: block;
  width: 100%;
  padding: 10px 0;
  cursor: pointer;
  background-color: #191414;
  color: #fff;
}

.movie-link {
  display: block;
}

.movie-images {
  height: 130px;
  object-fit: cover;
}

.movie-title-wrapper {
  position: absolute;
  z-index: 1;
  bottom: 10px;
  right: 15px;
  width: 80%;
}

.movie-title {
  color: #fff;
  margin-top: 5px;
  font-size: 1.4rem;
  font-weight: 800;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: right;
}
</style>
