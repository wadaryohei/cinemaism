<template>
  <ul class="movieinfo-genrelist">
    <li
      class="movieinfo-genrelists"
      v-for="(genre, index) in props.genres"
      :key="index">
        {{ genre.name }}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

// ================================
// Props
// ================================
export type MovieInfoGenreProps = {
  genres: string[];
}

// ================================
// Component
// ================================
export default defineComponent({
  name: 'MovieInfoGenre',
  props: ['genres'],
  setup (props: MovieInfoGenreProps) {
    return {
      props
    }
  }
})
</script>

<style lang="scss" scoped>
.movieinfo-genre {
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
.movieinfo-genrelist {
  display: flex;
  flex-wrap: wrap;
  font-size: 1.2rem;
  color: #aaa;
  margin-top: 10px;
  transition-delay: .6s;
}

.movieinfo-genrelists {
  margin-right: 5px;

  &::after {
    content: ',';
  }

  &:last-child:after {
    content: '';
  }
}
</style>
