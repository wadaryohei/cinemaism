<template>
  <figure class="movieinfo-poster">
    <img :src="`${props.posterPath}`" :alt="props.alt">
  </figure>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

// ================================
// Props
// ================================
export type MovieInfoPosterProps = {
  posterPath: string;
  alt: string;
}

// ================================
// Component
// ================================
export default defineComponent({
  name: 'MovieInfoPoster',
  props: ['posterPath', 'alt'],
  setup (props: MovieInfoPosterProps) {
    return {
      props
    }
  }
})
</script>

<style lang="scss" scoped>
.movieinfo-poster {
  width: 130px;

  &-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: 1s ease;
    transition-delay: .2s;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
    transform: translateY(20px);
    transition-delay: .2s;
  }
}
</style>
