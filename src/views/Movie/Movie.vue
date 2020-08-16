<template>
  <MovieContainer />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import MovieContainer from '@/containers/Movie/MovieContainer.vue'

// ================================
// Component
// ================================
export default defineComponent({
  name: 'Movie',
  components: { MovieContainer }
})
</script>
