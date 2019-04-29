<template>
  <div>
    <div v-if="load">
      <Loading></Loading>
    </div>

    <div v-else>
      <div v-if="movies.backdrop_path"
        class="movies-bg"
        :style="{ 'backgroundImage': 'url(https://image.tmdb.org/t/p/w1400_and_h450_face/' + movies.backdrop_path + ')'}"
      >
      </div>

      <article class="movies-article">
        <transition name="movies-backdrop" appear tag="div" class="movies-backdrop">
          <div class="movies-backdrop-wrapper">
          <div v-if="movies.backdrop_path"
            class="movies-backdrop-image"
            :style="{ 'backgroundImage': 'url(https://image.tmdb.org/t/p/w500/' + movies.backdrop_path + ')'}"
            >
          </div>
          <div v-else class="movies-backdrop-image"></div>
            <ul class="movies-info-link">
              <li class="movies-info-link-listsin" v-if="movies.homepage">
                <a :href="movies.homepage" target="_blank">
                  <i class="fas fa-link"></i>
                </a>
              </li>
              <li class="movies-info-link-listsin" v-if="moviesVideos">
                <a :href="`https://www.youtube.com/watch?v=${moviesVideos.key}`" target="_blank">
                  <i class="fab fa-youtube"></i>
                </a>
              </li>
            </ul>
          </div>
        </transition>
        <div class="movies-info-wrapper">
          <div class="movies-info">
            <transition name="movies-poster" appear tag="div">
              <figure class="movies-info-poster">
                <img v-if="movies.poster_path"
                  :src="'https://image.tmdb.org/t/p/w300/' + movies.poster_path"
                  :alt="movies.original_title"
                >
              </figure>
            </transition>

            <div class="movies-info-block">
              <transition name="movies-title" appear tag="div">
                <h2 class="movies-original-title" v-if="movies.original_title">{{ movies.original_title }}
                  <span class="movies-release-date" v-if="movies.release_date">({{ getMovieReleaseDate }})</span>
                </h2>
              </transition>

              <transition name="movies-genre" appear tag="div">
                <ul class="movies-genre-list" v-if="movies.genres">
                  <li class="movies-genre-listin" v-for="(genre, index) in movies.genres" :key="index">
                    {{ genre.name }}
                  </li>
                </ul>
              </transition>

              <transition name="movies-average" appear tag="div">
                <p class="movies-average" v-if="movies.vote_average"><i class="fas fa-star"></i> {{ movies.vote_average }}</p>
              </transition>
            </div>
          </div>

          <div class="l-grid-12 movies-overview" v-if="movies.overview">
            <transition name="movies-overview-header" appear tag="div">
              <h3 class="movies-overview-header">作品詳細</h3>
            </transition>

            <transition name="movies-overview-lead" appear tag="div">
              <p class="movies-overview-lead">{{ movies.overview }}</p>
            </transition>
          </div>

          <div class="movies-save-wrapper">
            <button
              class="movies-save"
              :class="{disabled: hasLocalStorageMoviesId.disabled || hasCurrentId}"
              :disabled="hasLocalStorageMoviesId.disabled || hasCurrentId"
              @click="pushMovieStorage()"
            >{{ hasLocalStorageMoviesId.text }}</button>
          </div>

          <div class="l-grid-12 movies-recommendations" v-if="moviesReconmmendations.length > 0">
            <transition name="movies-recommendations-header" appear tag="div">
              <h3 class="movies-recommendations-header">あなたにオススメの作品</h3>
            </transition>

            <transition-group name="movies-recommendations-list" appear tag="ul" class="movies-recommendations-list">
              <li class="l-grid-4 movies-recommendations-listin" v-for="movieReconmmendations in moviesReconmmendations" :key="movieReconmmendations.id">
                <router-link :to="{ name : 'movie', params : { id: movieReconmmendations.id } }">
                  <figure class="">
                    <img v-if="movieReconmmendations.poster_path"
                      :src="'https://image.tmdb.org/t/p/w300/' + movieReconmmendations.poster_path"
                      :alt="movieReconmmendations.original_title"
                    >
                  </figure>
                </router-link>
                <h2 class="movies-recommendations-title" v-if="movieReconmmendations.original_title">{{ movieReconmmendations.original_title }}</h2>
              </li>
            </transition-group>
          </div>
        </div>
      </article>

      <Modal v-if="showModal" message="保存しました" @close="showModal = false"></Modal>
    </div>
  </div>
</template>

<script>

import Modal from '@/components/Modal'
import Loading from '@/components/Loading'
import { mapState } from 'vuex'

const moviesSaveStatus = {
  saved: {
    disabled: true,
    text: 'INBOXを表示する'
  },
  dontSaved: {
    disabled: false,
    text: 'INBOXに追加する'
  }
}

export default {
  name: 'Movie',

  components: {
    Modal,
    Loading
  },

  data () {
    return {
      movies: {},
      moviesVideos: {},
      moviesReconmmendations: {},
      hasCurrentId: false,
      showModal: false
    }
  },

  created () {
    this.fetchData()
    this.fetchDataVideos()
    this.fetchDataReconmmendations()
    this.$store.commit('page/loaded')
  },

  methods: {
    /**
     * paramsで受けとったidをもとにAPIを叩く
     */
    fetchData () {
      let id = this.$route.params.id
      this.$axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.getApiKey}&language=${this.getLanguage}`)
        .then((res) => {
          this.movies = res.data
        })
        .catch((error) => {
          // 取得できなかった場合のエラー処理が必要
          console.log(error + 'Don\'t get moviesinfo.')
        })
    },

    /**
     * paramsで受けとったidをもとにトレーラー情報を取得する
     */
    fetchDataVideos () {
      let id = this.$route.params.id
      this.$axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${this.getApiKey}`)
        .then((res) => {
          this.moviesVideos = res.data.results[0]
        })
        .catch((error) => {
          console.log(error + 'Don\'t get movies videos.')
        })
    },

    /**
     * paramsで受けとったidをもとにレコメンド情報を取得する
     */
    fetchDataReconmmendations () {
      let id = this.$route.params.id
      this.$axios.get(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${this.getApiKey}`)
        .then((res) => {
          this.moviesReconmmendations = res.data.results
        })
        .catch((error) => {
          console.log(error + 'Don\'t get movies videos.')
        })
    },

    /**
     * localStorageにMovieを保存
     */
    pushMovieStorage () {
      let movies = []
      // もしlocalStorageがnullなら普通にlocalStorageに保存
      if (localStorage.getItem('movies') === null) {
        movies.push(this.movies)
        localStorage.setItem('movies', JSON.stringify(movies))
        this.$store.commit('inbox/countStorages', movies)
      } else {
      // すでにlocalStorageに存在するなら配列に戻してから保存する
        let currentStorage = JSON.parse(localStorage.getItem('movies'))
        currentStorage.push(this.movies)
        localStorage.setItem('movies', JSON.stringify(currentStorage))
        this.$store.commit('inbox/countStorages', currentStorage)
      }
      this.hasCurrentId = true
      this.showModal = true
    }
  },

  computed: {
    /**
     * ロードの状態を取得
     */
    ...mapState({
      load: state => state.page.load
    }),

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
      return process.env.VUE_APP_API_LANGUAGE
    },

    /**
     * 日付けをyyyyだけに切り出して返す
     */
    getMovieReleaseDate () {
      if (this.movies.release_date) {
        return this.movies.release_date.slice(0, 4)
      }
      return ''
    },

    /**
     * localStorageに保存されているMovieIDかチェックして存在するなら保存できない
     */
    hasLocalStorageMoviesId () {
      let paramsId = Number(this.$route.params.id)
      let currentStorage = JSON.parse(localStorage.getItem('movies'))
      if (currentStorage === null) return moviesSaveStatus.dontSaved

      let hasCurrentStorageId = currentStorage.some(movies => {
        return paramsId === movies.id
      })

      return hasCurrentStorageId ? moviesSaveStatus.saved : moviesSaveStatus.dontSaved
    }
  },

  watch: {
    /**
     * @see https://router.vuejs.org/guide/advanced/data-fetching.html#fetching-after-navigation
     * ルートが変更されたらこのメソッドを再び呼び出すためにwatchで監視
     */
    '$route' () {
      this.fetchData()
      this.fetchDataReconmmendations()
      this.hasCurrentId = false
    }
  }
}
</script>

<style lang="scss" scoped>
.movies-bg {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  filter: blur(5px);
  transform: translate3d(0, 0, 0);
  top: 0;
  left: 0;
  z-index: 0;

  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: rgba(0,0,0, .3);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
  }
}

.movies-article {
  position: relative;
  z-index: 1;
  box-shadow: 0 5px 20px rgba(0,0,0,0.5);
}

.movies-backdrop-wrapper {
  position: relative;
}

.movies-info-link {
  position: absolute;
  bottom: 0;
  right: 10px;
  z-index: 100;
  padding: .6rem;
}

.movies-info-link-listsin {
  display: inline-block;
  a {
    color: #fff;
    font-size: 2rem;

    &:last-child {
      margin-left: 1rem;
    }
  }
}

.movies-backdrop-image {
  width: 100%;
  height: 260px;
  background-color: rgba(0,0,0, .4);
}

.movies-info-wrapper {
  background-color: #191414;
  border-bottom: solid 3px #1db954;
  padding: 10px 0 30px;
}

.movies-info {
  position: relative;
  min-height: 125px;
}

.movies-info-poster {
  position: absolute;
  top: -70px;
  left: 10px;
  width: 130px;
}

.movies-info-block {
   margin: 0 10px 0 150px;
}

.movies-genre-list {
  display: flex;
  flex-wrap: wrap;
  font-size: 1.3rem;
  color: #aaa;
  margin-top: 10px;
}

.movies-genre-listin {
  margin-right: 5px;

  &::after {
    content: ',';
  }

  &:last-child:after {
    content: '';
  }
}

.movies-original-title {
  color: #fff;
  font-size: 1.4rem;
  font-weight: 800;
  word-break: break-all;
}

.movies-release-date {
  color: #929292;
}

.movies-average {
  font-weight: 800;
  font-size: .8rem;
  line-height: 2;
  background-color: #222;
  color: #fff;
  border-radius: 30px;
  display: inline-block;
  padding: 2.5px 20px 4px;
  margin-top: 10px;
  color: #ffcc00;
}

.movies-overview {
  color: #fff;
  padding-top: 20px;
}

.movies-overview-header {
  color: #fff;
  font-size: 1.4rem;
  font-weight: 800;
  margin-bottom: 10px;
  word-break: break-all;
}

.movies-overview-lead {
  font-weight: 800;
  font-size: 1.2rem;
  line-height: 1.6;
}

.movies-recommendations-header {
  color: #fff;
  font-size: 1.4rem;
  font-weight: 800;
  margin-bottom: 10px;
  word-break: break-all;
}

.movies-recommendations {
  margin-top: 30px;
}

.movies-recommendations-list {
  margin: 0 -10px;
}

.movies-recommendations-listin {
  margin-top: 20px;

  &:first-child,
  &:nth-child(2),
  &:nth-child(3) {
    margin-top: 0;
  }

  @include max(767) {
    &:nth-child(3) {
      margin-top: 20px;
    }

    @include l-grid(6)
  }
}

.movies-recommendations-title {
  color: #fff;
  margin-top: 5px;
  font-size: 1.4rem;
  font-weight: 800;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.movies-save-wrapper {
  position: fixed;
  bottom: 40px;
  right: 40px;
  z-index: 3;

  @include max(1015) {
    position: static;
    text-align: center;
    margin-top: 20px;
    width: 100%;
  }
}

.movies-save {
  border: none;
  outline: none;
  padding: 0 20px;
  border-radius: 30px;
  width: 250px;
  height: 48px;
  font-size: 1.2rem;
  letter-spacing: .1rem;
  background-color: #1db954;
  color: #fff;
  cursor: pointer;
  transition: .1s ease;

  &:hover {
    transition: .1s ease;
    background-color: #1db954;
  }

  &.disabled {
    background-color: #333333;
    opacity: .6;
    cursor: default;
  }
}

.movies-backdrop-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: 1s ease;
}

.movies-backdrop-enter,
.movies-backdrop-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.movies-poster-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: .4s ease;
  transition-delay: .2s;
}

.movies-poster-enter,
.movies-poster-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.movies-title-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: .4s ease;
  transition-delay: .4s;
}

.movies-title-enter,
.movies-title-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.movies-genre-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: .4s ease;
  transition-delay: .6s;
}

.movies-genre-enter,
.movies-genre-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.movies-average-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: .4s ease;
  transition-delay: .8s;
}

.movies-average-enter,
.movies-average-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.movies-overview-header-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: .4s ease;
  transition-delay: 1s;
}

.movies-overview-header-enter,
.movies-overview-header-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.movies-overview-lead-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: .4s ease;
  transition-delay: 1.2s;
}

.movies-overview-lead-enter,
.movies-overview-lead-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.movies-recommendations-header-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: .4s ease;
  transition-delay: 1.4s;
}

.movies-recommendations-header-enter,
.movies-recommendations-header-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.movies-recommendations-list-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: .4s ease;
  transition-delay: 1.6s;
}

.movies-recommendations-list-enter,
.movies-recommendations-list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

</style>
