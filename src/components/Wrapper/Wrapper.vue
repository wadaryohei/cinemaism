<template>
  <div class="l-container l-wrapper">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

// ================================
// Component
// ================================
export default defineComponent({
  name: 'Wrapper'
})
</script>

<style lang="scss">
.l-wrapper {
  padding: 160px 0 120px 0;
  position: relative;

  @include max(1015) {
    padding: 120px 0;
  }
}
</style>
