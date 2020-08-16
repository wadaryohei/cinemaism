<template>
  <p class="movieinfo-average">
    <i class="fas fa-star"></i>
    {{ props.voteAverage }}
  </p>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

// ================================
// Props
// ================================
export type MovieInfoAverageProps = {
  voteAverage: string;
}

// ================================
// Component
// ================================
export default defineComponent({
  name: 'MovieInfoAverage',
  props: ['voteAverage'],
  setup (props: MovieInfoAverageProps) {
    return {
      props
    }
  }
})
</script>

<style lang="scss" scoped>
.movieinfo-average {
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

  &-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: 1s ease;
    transition-delay: .8s;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
    transform: translateY(20px);
  }
}
</style>
