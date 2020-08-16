<template>
  <PopularContainer />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import PopularContainer from '@/containers/Popular/PopularContainer.vue'

// ================================
// Component
// ================================
export default defineComponent({
  name: 'Popular',
  components: { PopularContainer }
})
</script>
