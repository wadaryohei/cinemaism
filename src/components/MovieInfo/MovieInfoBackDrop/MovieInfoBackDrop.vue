<template>
  <div class="movieinfo-backdrop" :style="{ 'backgroundImage': `url(${props.backdropPath})`}">
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

// ================================
// Props
// ================================
export type MovieInfoBackDropProps = {
  backdropPath: string;
}

// ================================
// Component
// ================================
export default defineComponent({
  name: 'MovieInfoBackDrop',
  props: ['backdropPath'],
  setup (props: MovieInfoBackDropProps) {
    return {
      props
    }
  }
})
</script>

<style lang="scss" scoped>
.movieinfo-backdrop {
  width: 100%;
  height: 260px;
  background-color: rgba(0,0,0, .4);
  background-position: center center;
  background-size: cover;

  &-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: 1s ease;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
    transform: translateY(20px);
  }
}
</style>
