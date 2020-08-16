<template>
  <img :src="props.src" :alt="props.alt">
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

// ================================
// Props
// ================================
export type LogoProps = {
  src: string;
  alt: string;
}

// ================================
// Component
// ================================
export default defineComponent({
  name: 'Logo',
  props: ['src', 'alt'],
  setup (props: LogoProps) {
    return {
      props
    }
  }
})
</script>
