<template>
  <ul class="movieinfo-link">
    <li v-if="props.homepage" class="movieinfo-links">
      <a :href="props.homepage" target="_blank">
        <i class="fas fa-link"></i>
      </a>
    </li>
    <li v-if="props.video" class="movieinfo-links">
      <a :href="props.video" target="_blank">
        <i class="fab fa-youtube"></i>
      </a>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

// ================================
// Props
// ================================
export type MovieInfoLinkProps = {
  homepage: string;
  video: string;
}

// ================================
// Component
// ================================
export default defineComponent({
  name: 'MovieInfoLink',
  props: ['homepage', 'video'],
  setup (props: MovieInfoLinkProps) {
    return {
      props
    }
  }
})
</script>

<style lang="scss" scoped>
.movieinfo-link {
  position: absolute;
  bottom: 0;
  right: 10px;
  z-index: 100;
  padding: .6rem;

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

.movieinfo-links {
  display: inline-block;
  a {
    color: #fff;
    font-size: 2rem;

    &:last-child {
      margin-left: 1rem;
    }
  }
}
</style>
