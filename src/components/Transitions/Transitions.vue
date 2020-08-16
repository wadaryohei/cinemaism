<template>
  <transition appear>
    <slot></slot>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

// ================================
// Props
// ================================
export type TransitionsProps = {
  name: string;
  tag: string;
}

// ================================
// Component
// ================================
export default defineComponent({
  name: 'Transitions'
})
</script>
