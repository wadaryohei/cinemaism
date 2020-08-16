<template>
  <div class="overlay"></div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

// ================================
// Component
// ================================
export default defineComponent({
  name: 'Overlay'
})
</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 1);
}
</style>
