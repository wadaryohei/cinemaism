<template>
  <AboutContainer />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import AboutContainer from '@/containers/About/AboutContainer.vue'

// ================================
// Component
// ================================
export default defineComponent({
  name: 'About',
  components: { AboutContainer }
})
</script>
