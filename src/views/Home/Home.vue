<template>
  <HomeContainer />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import HomeContainer from '@/containers/Home/HomeContainer.vue'

// ================================
// Component
// ================================
export default defineComponent({
  name: 'Home',
  components: { HomeContainer }
})
</script>
