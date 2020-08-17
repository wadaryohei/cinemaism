<template>
  <BaseLayout>
    <div slot="main" v-if="presenter.datas()">
      <section v-if="fetch.loading.value">
        <Loading message="Loading..." />
      </section>

      <section v-if="!fetch.loading.value">
        <div>
          <Modal v-if="modal.showModal()" message="保存しました" @close="modal.closeModal()" />

          <MovieInfoBg :backdropPath="presenter.datas().viewDatas().fetchMovieDatas.backdropPath" />
          <article class="movie-wrapper">
            <div class="movieinfo-backdrop-wrapper">
              <transition name="movieinfo-backdrop" :class="{'movieinfo-backdrop': (fetch.loading.value)}" tag="div" appear>
                <MovieInfoBackDrop :backdropPath="presenter.datas().viewDatas().fetchMovieDatas.backdropPath" />
              </transition>

              <transition name="movieinfo-link" :class="{'movieinfo-link': (fetch.loading.value)}" tag="div" appear>
                <MovieInfoLink
                  :homepage="presenter.datas().viewDatas().fetchMovieDatas.homepage"
                  :video="presenter.datas().viewDatas().fetchVideoDatas"
                />
              </transition>
            </div>

            <div class="movieinfo-wrapper">
              <section class="movieinfo-section">
                <div class="movieinfo-poster-wrapper">
                  <transition name="movieinfo-poster" :class="{'movieinfo-poster': (fetch.loading.value)}" tag="div" appear>
                    <MovieInfoPoster
                      :posterPath="presenter.datas().viewDatas().fetchMovieDatas.posterPath"
                      :alt="presenter.datas().viewDatas().fetchMovieDatas.originalTitle"
                    />
                  </transition>
                </div>

                <div class="movieinfo-heading-wrapper">
                  <transition name="movieinfo-heading" :class="{'movieinfo-heading': (fetch.loading.value)}" tag="div" appear>
                    <MovieInfoHeading
                      :originalTitle="presenter.datas().viewDatas().fetchMovieDatas.originalTitle"
                      :releaseDate="presenter.datas().viewDatas().fetchMovieDatas.releaseDate"
                    />
                  </transition>

                  <transition name="movieinfo-genre" :class="{'movieinfo-genre': (fetch.loading.value)}" tag="div" appear>
                    <MovieInfoGenre :genres="presenter.datas().viewDatas().fetchMovieDatas.genres" />
                  </transition>

                  <transition name="movieinfo-average" :class="{'movieinfo-average': (fetch.loading.value)}" tag="div" appear>
                    <MovieInfoAverage :voteAverage="presenter.datas().viewDatas().fetchMovieDatas.voteAverage" />
                  </transition>
                </div>
              </section>

              <section>
                <div class="movieinfo-overview-wrapper">
                  <transition name="movieinfo-overview" :class="{'movieinfo-overview': (fetch.loading.value)}" tag="div" appear v-if="presenter.datas().viewDatas().fetchMovieDatas.overview">
                    <MovieInfoOverView :overview="presenter.datas().viewDatas().fetchMovieDatas.overview" />
                  </transition>
                </div>
              </section>

              <section>
                <div class="movieinfo-save-wrapper">
                  <transition name="movieinfo-save" :class="{'movieinfo-save': (fetch.loading.value)}" tag="div" appear>
                    <MovieInfoSave
                      :modal="modal"
                      :storage="storage"
                      :viewDatas="presenter.datas().viewDatas().fetchMovieDatas"
                    />
                  </transition>
                </div>
              </section>

              <section v-if="presenter.datas().viewDatas().fetchRecommendDatas">
                <div class="movieinfo-recommendation-wrapper">
                  <div class="movieinfo-recommendation">
                    <MovieInfoRecommendation
                      :fetch="fetch"
                      :recommends="presenter.datas().viewDatas().fetchRecommendDatas"
                    />
                  </div>
                </div>
              </section>
            </div>
          </article>
        </div>
      </section>
    </div>
  </BaseLayout>
</template>

<script lang="ts">
import { defineComponent, SetupContext, watch, onMounted } from '@vue/composition-api'
import BaseLayout from '@/components/_shared/BaseLayout.vue'
import Modal from '@/components/Modal/Modal.vue'
import Loading from '@/components/Loading/Loading.vue'
import MovieInfoBg from '@/components/MovieInfo/MovieInfoBg/MovieInfoBg.vue'
import MovieInfoLink from '@/components/MovieInfo/MovieInfoLink/MovieInfoLink.vue'
import MovieInfoBackDrop from '@/components/MovieInfo/MovieInfoBackDrop/MovieInfoBackDrop.vue'
import MovieInfoPoster from '@/components/MovieInfo/MovieInfoPoster/MovieInfoPoster.vue'
import MovieInfoHeading from '@/components/MovieInfo/MovieInfoHeading/MovieInfoHeading.vue'
import MovieInfoGenre from '@/components/MovieInfo/MovieInfoGenre/MovieInfoGenre.vue'
import MovieInfoAverage from '@/components/MovieInfo/MovieInfoAverage/MovieInfoAverage.vue'
import MovieInfoOverView from '@/components/MovieInfo/MovieInfoOverView/MovieInfoOverView.vue'
import MovieInfoRecommendation from '@/components/MovieInfo/MovieInfoRecommendation/MovieInfoRecommendation.vue'
import MovieList from '@/components/MovieList/MovieList.vue'
import MovieInfoSave from '@/components/MovieInfo/MovieInfoSave/MovieInfoSave.vue'
import { UseAPIComposition } from '@/composition/UseAPIComposition'
import { UseFetchDataComposition } from '@/composition/UseFetchDataComposition'
import { UseStorageComposition } from '@/composition/UseStorageComposition'
import { UseModalComposition } from '@/composition/UseModalComposition'
import { UsePresenterComposition } from '@/composition/UsePresenterComposition'
import { UseMoviePresenter, MoviePresenter } from '@/containers/Movie/UseMoviePresenter'

// ================================
// Component
// ================================
export default defineComponent({
  name: 'MovieContainer',
  components: {
    BaseLayout,
    MovieInfoAverage,
    MovieInfoBackDrop,
    MovieInfoBg,
    MovieInfoGenre,
    MovieInfoHeading,
    MovieInfoLink,
    MovieInfoOverView,
    MovieInfoPoster,
    MovieInfoRecommendation,
    MovieInfoSave,
    MovieList,
    Modal,
    Loading
  },
  setup (props, context: SetupContext) {
    const paramsId = context.root.$route.params.id
    const API = UseAPIComposition()
    const fetch = UseFetchDataComposition(context)
    const storage = UseStorageComposition(context)
    const modal = UseModalComposition()
    const presenter = UsePresenterComposition()

    /**
     * Movie情報を取得するFetchの初期化処理
     */
    async function initFetch (paramsId: string): Promise<void> {
      fetch.loading.value = true
      const fetchMovieDatas = await fetch.fetchMovieSelectedData(API.APIPathMovie(paramsId))
      const fetchVideoDatas = await fetch.fetchMovieVideosData(API.APIPathVideos(paramsId))
      const fetchRecommendDatas = await fetch.fetchMovieRecommendData(API.APIPathRecommendations(paramsId))
      const moviePresenter = UseMoviePresenter(fetchMovieDatas, fetchVideoDatas, fetchRecommendDatas)
      await presenter.presenterDatas<MoviePresenter>(moviePresenter)
      fetch.loading.value = false
      window.scrollTo(0, 0)
    }

    // ================================
    // LifeCycle
    // ================================
    onMounted(async () => {
      await initFetch(paramsId)
    })

    // ================================
    // Watch
    // ================================
    watch(() => context.root.$route, async (newRoute) => {
      await initFetch(newRoute.params.id)
    })

    return {
      API,
      paramsId,
      fetch,
      presenter,
      storage,
      modal
    }
  }
})
</script>

<style lang="scss" scoped>
.movieinfo-section {
  display: flex;
  position: relative;
}

.movie-wrapper {
  position: relative;
  z-index: 1;
  box-shadow: 0 5px 20px rgba(0,0,0,0.5);
}

.movieinfo-wrapper {
  background-color: #191414;
  border-bottom: solid 3px #1db954;
  padding: 10px 10px 30px;
}

.movieinfo-backdrop-wrapper {
  position: relative;
}

.movieinfo-poster-wrapper {
  position: absolute;
  top: -70px;
}

.movieinfo-heading-wrapper {
  position: absolute;
  left: 140px;
}

.movieinfo-overview-wrapper {
  padding-top: 160px;
}

.movieinfo-recommendation-wrapper {
  margin-top: 30px;
  margin-right: -10px;
  margin-left: -10px;
}

.movieinfo-save-wrapper {
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

</style>
