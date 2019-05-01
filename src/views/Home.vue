<template>
  <div>
    <div v-if="isLocalStorage">

      <Modal v-if="showModal" message="削除しますか？" @close="showModal = false">
        <div slot="footer" class="modal-footer">
          <button @click="showModal = false">Cancel</button>
          <button @click="removeStorage()">Delete</button>
        </div>
      </Modal>

      <ul class="l-row">
        <li class="l-grid-12 movie-lists" v-for="(currentStorage, index) in currentStorages" :key="index">
            <router-link :to="{ name : 'movie', params : { id: currentStorage.id }}" class="movie-link">
              <img v-if="currentStorage.backdrop_path === null" class="movie-images" src="../assets/default_image_back.png" :alt="currentStorage.original_title">
              <img v-else class="movie-images" :src="'https://image.tmdb.org/t/p/original' + currentStorage.backdrop_path" :alt="currentStorage.original_title">
            </router-link>
            <div class="movie-title-wrapper">
              <h2 class="movie-title">{{ currentStorage.original_title }}</h2>
            </div>

            <div class="movie-remove-btn-wrapper" @click="openModal(index)">
              <i class="movie-remove-btn far fa-check-circle"></i>
            </div>
        </li>
      </ul>
      <button class="movie-removeAll-btn" @click="removeAllStorage()">一括で削除する</button>
    </div>

    <div class="movie-about-image" v-else>
      <img class="movie-about-logo" src="../assets/logo.png" alt="logo">
    </div>
  </div>
</template>

<script>

import Modal from '@/components/Modal'

export default {
  name: 'home',

  components: {
    Modal
  },

  data () {
    return {
      movies: {},
      currentStorages: [],
      showModal: false,
      modalIndex: 0
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
    removeStorage () {
      this.currentStorages = JSON.parse(localStorage.getItem('movies'))
      this.currentStorages.splice(this.modalIndex, 1)
      localStorage.setItem('movies', JSON.stringify(this.currentStorages))
      this.$router.go({ name: 'home' })
    },

    /**
     * localStorageを全削除する
     */
    removeAllStorage () {
      localStorage.clear()
      alert('すべて削除しました')
      this.$router.go({ name: 'home' })
    },

    /**
     * moviesのインデックスを取得してモーダルを開く
     */
    openModal (index) {
      this.modalIndex = index
      this.showModal = true
    }
  },

  computed: {
    /**
     * languageを返すゲッター
     */
    getLanguage () {
      return process.env.VUE_APP_API_LANGUAGE
    },

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

.movie-about-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background-image: url('../assets/movie_01.png');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}

.movie-about-logo {
  position: absolute;
  z-index: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 25%;

  @include max(767) {
    width: 40%;
  }
}

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
  z-index: 0;
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

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    margin-top: 20px;
    border: none;
    outline: none;
    padding: 10px 30px;
    cursor: pointer;

    &:first-child {
      background: transparent;
      border: solid 1px #eee;
      color: #eee;
      margin-right: 5px;
    }

    &:last-child {
      background-color: #1db954;
      border: solid 1px #1db954;
      color: #fff;
    }
  }
}

</style>
