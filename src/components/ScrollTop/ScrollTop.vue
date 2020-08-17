<template>
  <div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api'

// ================================
// Component
// ================================
export default defineComponent({
  name: 'ScrollTop',
  setup () {
    onMounted(() => {
      window.scrollTo(0, 0)
    })
  }
})
</script>
