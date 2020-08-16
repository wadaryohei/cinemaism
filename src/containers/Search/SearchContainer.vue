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
        tag="ul"
        name="movie-list"
        out-in
        appear
      >
        <MovieList
          class="movie-lists"
          v-for="viewData in presenter.datas().viewDatas().fetchData"
          :key="viewData.id"
          :viewData="viewData"
        />
      </transition-group>
    </div>
  </BaseLayout>
</template>

<script lang="ts">
import { defineComponent, SetupContext, watch, onMounted } from '@vue/composition-api'
import BaseLayout from '@/components/_shared/BaseLayout.vue'
import MovieList from '@/components/MovieList/MovieList.vue'
import { UseFetchDataComposition } from '@/composition/UseFetchDataComposition'
import { UseAPIComposition } from '@/composition/UseAPIComposition'
import { UseSearchComposition } from '@/composition/UseSearchComposition'
import { UsePresenterComposition } from '@/composition/UsePresenterComposition'
import { UseSearchPresenter, SearchPresenter } from '@/containers/Search/UseSearchPresenter'

// ================================
// Component
// ================================
export default defineComponent({
  name: 'SearchContainer',
  components: { BaseLayout, MovieList },
  setup (props, context: SetupContext) {
    const query = context.root.$route.query.q
    const API = UseAPIComposition()
    const fetch = UseFetchDataComposition(context)
    const search = UseSearchComposition(context)
    const presenter = UsePresenterComposition()

    /**
     * Movie情報を取得するFetchの初期化処理
     */
    async function initFetch (query: string | (string | null)[]) {
      const fetchDatas = await fetch.fetchMovieSearchData(API.APIPath('search', query))
      const searchPresenter = UseSearchPresenter(fetchDatas, fetch.responseDataCount(), query)
      await presenter.presenterDatas<SearchPresenter>(searchPresenter)
    }

    // ================================
    // LifeCycle
    // ================================
    onMounted(async () => {
      await initFetch(query)
    })

    // ================================
    // Watch
    // ================================
    watch(() => context.root.$route, async (newRoute) => {
      await initFetch(newRoute.query.q)
      window.scrollTo(0, 0)
    })

    return {
      API,
      fetch,
      search,
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

</style>
