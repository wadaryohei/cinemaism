<template>
  <h2 class="movieinfo-originaltitle">{{ props.originalTitle }}
    <span class="movieinfo-releasedate">({{ props.releaseDate }})</span>
  </h2>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

// ================================
// Props
// ================================
export type MovieInfoHeadingProps = {
  originalTitle: string;
  releaseDate: string;
}

// ================================
// Component
// ================================
export default defineComponent({
  name: 'MovieInfoHeading',
  props: ['originalTitle', 'releaseDate'],
  setup (props: MovieInfoHeadingProps) {
    return {
      props
    }
  }
})
</script>

<style lang="scss" scoped>
.movieinfo-heading {
  &-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: 1s ease;
    transition-delay: .4s;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
    transform: translateY(20px);
  }
}

.movieinfo-originaltitle {
  color: #fff;
  font-size: 1.4rem;
  font-weight: 800;
  word-break: break-all;
}

.movieinfo-releasedate {
  color: #929292;
}
</style>
