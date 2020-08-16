<template>
  <div class="movieinfo-bg" :style="{ 'backgroundImage': `url(${props.backdropPath})`}"></div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

// ================================
// Props
// ================================
export type MovieInfoBgProps = {
  backdropPath: string;
}

// ================================
// Component
// ================================
export default defineComponent({
  name: 'MovieInfoBg',
  props: ['backdropPath'],
  setup (props: MovieInfoBgProps) {
    return {
      props
    }
  }
})
</script>

<style lang="scss" scoped>
.movieinfo-bg {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100vh;
  filter: blur(5px);
  transform: translate3d(0, 0, 0);

  &::after {
    content: '';
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: rgba(0,0,0, .3);
    width: 100%;
    height: 100%;
  }
}
</style>
