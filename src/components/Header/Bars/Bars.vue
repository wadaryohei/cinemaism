<template>
  <p class="bars" @click="props.nav.toggleMenu()"><i class="fas fa-bars"></i></p>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { NavComposition } from '@/composition/UseNavComposition'

// ================================
// Props
// ================================
export type BarsProps = {
  nav: NavComposition;
}

// ================================
// Component
// ================================
export default defineComponent({
  name: 'Bars',
  props: ['nav'],
  setup (props: BarsProps) {
    return {
      props
    }
  }
})
</script>

<style lang="scss" scoped>
.bars {
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 3;
  font-size: 2rem;
  cursor: pointer;
}
</style>
