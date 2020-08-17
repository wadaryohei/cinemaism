<template>
  <div
    class="overlay"
    :class="{'active': (props.activeMenu)}"
    @click="props.toggleMenu()"
  >
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

// ================================
// Type
// ================================
export type OverlayProps = {
  activeMenu: boolean;
}

// ================================
// Component
// ================================
export default defineComponent({
  name: 'Overlay',
  props: ['activeMenu', 'toggleMenu'],
  setup (props: OverlayProps) {
    return {
      props
    }
  }
})
</script>

<style lang="scss" scoped>
.overlay {
  position: absolute;
  top: 0;
  left: -1;
  width: 100vw;
  height: 100vh;
  opacity: 0;
  background-color: rgba(0, 0, 0, 1);
  transition: .4s cubic-bezier(.785,.135,.15,.86);

  &.active {
    opacity: .8;
    transition: .4s cubic-bezier(.785,.135,.15,.86);
  }
}
</style>
