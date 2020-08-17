<template>
  <div>
    <transition name="movieinfo-recommendationheader" tag="div" appear>
      <h3 class="movieinfo-recommendationheader">あなたにオススメの作品</h3>
    </transition>
    <transition-group
      tag="ul"
      name="movieinfo-recommendationlist"
      :class="{'movieinfo-recommendationlist': (fetch.loading.value)}"
      out-in
      appear
    >
      <MovieList
        class="movieinfo-recommendationlists"
        v-for="recommend in props.recommends"
        :key="recommend.id"
        :viewData="recommend"
      />
    </transition-group>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import MovieList from '@/components/MovieList/MovieList.vue'
import { MovieRecommendType } from '@/datas/MovieData'

// ================================
// Props
// ================================
export type MovieInfoRecommendationProps = {
  recommends: MovieRecommendType[];
}

// ================================
// Component
// ================================
export default defineComponent({
  name: 'MovieInfoRecommendation',
  components: { MovieList },
  props: ['recommends', 'fetch'],
  setup (props: MovieInfoRecommendationProps) {
    return {
      props
    }
  }
})
</script>

<style lang="scss" scoped>
.movieinfo-recommendationheader {
  color: #fff;
  font-size: 1.4rem;
  font-weight: 800;
  padding: 0 10px;
  margin-bottom: 10px;
  word-break: break-all;

  &-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: 1s ease;
    transition-delay: 1.4s;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
    transform: translateY(20px);
  }
}

.movieinfo-recommendationlist {
  @include l-row;

  &-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: 1s ease;
    transition-delay: 1.8s;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
    transform: translateY(20px);
  }
}

.movieinfo-recommendationlists {
  @include l-grid(4);
  margin-bottom: 24px;

  @include max(767) {
    @include l-grid(6);
  }
}
</style>
