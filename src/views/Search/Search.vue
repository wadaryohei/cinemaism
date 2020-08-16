<template>
  <SearchContainer />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import SearchContainer from '@/containers/Search/SearchContainer.vue'

// ================================
// Component
// ================================
export default defineComponent({
  name: 'Search',
  components: { SearchContainer }
})
</script>
