<template>
  <BaseLayout>
    <div slot="main" v-if="presenter.datas()">
      <!-- 取得したデータが存在しない場合 -->
      <div v-if="presenter.datas().viewDatas().isExistsResponseData">
        <p class="empty">
          「{{ presenter.datas().viewDatas().queryWordData }}」は存在しませんでした。<br />再度検索してください。
        </p>
      </div>

      <!-- 取得したデータが存在する場合 -->
      <transition-group
        v-if="!fetch.loading.value"
        tag="ul"
        name="movie-list"
        :class="{'movie-list': (fetch.loading.value)}"
        appear
        out-in
      >
        <MovieList
          class="movie-lists"
          v-for="viewData in presenter.datas().viewDatas().fetchData"
          :key="viewData.id"
          :viewData="viewData"
        />
      </transition-group>

      <!-- ページネーション -->
      <Pagination :pagination="pagination" />
    </div>
  </BaseLayout>
</template>

<script lang="ts">
import { defineComponent, SetupContext, watch, onMounted } from '@vue/composition-api'
import BaseLayout from '@/components/_shared/BaseLayout.vue'
import MovieList from '@/components/MovieList/MovieList.vue'
import Pagination from '@/components/Pagination/Pagination.vue'
import { UseFetchDataComposition } from '@/composition/UseFetchDataComposition'
import { UseVuexComposition } from '@/composition/UseVuexComposition'
import { UseAPIComposition } from '@/composition/UseAPIComposition'
import { UseSearchComposition } from '@/composition/UseSearchComposition'
import { UsePresenterComposition } from '@/composition/UsePresenterComposition'
import { UsePaginationComposition } from '@/composition/UsePaginationComposition'
import { UseSearchPresenter, SearchPresenter } from '@/containers/Search/UseSearchPresenter'

// ================================
// Component
// ================================
export default defineComponent({
  name: 'PopularContainer',
  components: { BaseLayout, MovieList, Pagination },
  setup (props, context: SetupContext) {
    const vuex = UseVuexComposition(context)
    const pageNumber = vuex.stores('getters', 'pageCount/pageCountGetters')
    const API = UseAPIComposition()
    const fetch = UseFetchDataComposition(context)
    const search = UseSearchComposition(context)
    const pagination = UsePaginationComposition(context)
    const presenter = UsePresenterComposition()

    /**
     * Movie情報を取得するFetchの初期化処理
     */
    async function initFetch (pageNumber: string | (string | null)[]) {
      fetch.loading.value = true
      const fetchDatas = await fetch.fetchMovieSearchData(API.APIPathPopular(pageNumber))
      const searchPresenter = UseSearchPresenter(fetchDatas, fetch.responseDataCount(), pageNumber)
      await presenter.presenterDatas<SearchPresenter>(searchPresenter)
      fetch.loading.value = false
      window.scrollTo(0, 0)
    }

    // ================================
    // LifeCycle
    // ================================
    onMounted(async () => {
      await initFetch(pageNumber)
    })

    // ================================
    // Watch
    // ================================
    /**
     * @memo watchのやり方の情報が少ないのでナレッジ共有しておきたい
     */
    watch(() => context.root.$route, async (newRoute) => {
      await initFetch(newRoute.query.page)
    })

    return {
      API,
      fetch,
      search,
      pagination,
      presenter
    }
  }
})
</script>

<style lang="scss" scoped>
.empty {
  text-align: center;
  color: #fff;
}

.movie-list {
  @include l-row;
  &-enter,
  &-leave-to {
    opacity: 0;
    transform: translateY(20px);
    transition: .4s ease;
  }

  &-leave,
  &-enter-to {
    opacity: 1;
    transform: translateY(0);
    transition: .8s ease;

    @for $i from 1 through 20 {
      &:nth-of-type(#{$i}) {
        transition-delay: #{50ms * $i};
      }
    }
  }
}

.movie-lists {
  @include l-grid(4);
  margin-top: 30px;

  @include max(767) {
    @include l-grid(6);
  }
}

.pagination-wrapper {
  margin-top: 32px;
  padding: 30px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid hsla(0,0%,100%,.3);
}

</style>
