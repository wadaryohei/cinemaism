<template>
  <li>
    <router-link :to="`/movie/${props.viewData.id}`" class="movie-link">
      <img :src="`${props.viewData.posterPath}`" :alt="props.viewData.originalTitle">
    </router-link>
    <h2 class="movie-title">{{ props.viewData.originalTitle }}</h2>
    <span class="movie-release-date">({{ props.viewData.releaseDate }})</span>
  </li>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { MovieSearchType, MovieRecommendType } from '@/datas/MovieData'

// ================================
// Props
// ================================
export type MovieListProps = {
  viewData: MovieSearchType | MovieRecommendType;
}

// ================================
// Component
// ================================
export default defineComponent({
  name: 'MovieList',
  props: ['viewData'],
  setup (props: MovieListProps) {
    return {
      props
    }
  }
})
</script>

<style lang="scss" scoped>

.movie-link {
  display: block;
  box-shadow: 0 5px 20px rgba(0,0,0,0.5);
}

.movie-title {
  color: #fff;
  margin-top: 5px;
  font-size: 1.4rem;
  font-weight: 800;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.movie-release-date {
  color: #929292;
}
</style>
