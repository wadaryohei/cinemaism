<template>
  <div id="app">
      <ScrollTop />
      <div class="l-container l-wrapper">
        <Overlay v-if="nav.isMenuActive" />
        <router-view />
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Overlay from '@/components/Overlay/Overlay.vue'
import ScrollTop from '@/components/ScrollTop/ScrollTop.vue'
import { UseNavComposition } from '@/composition/UseNavComposition'

export default defineComponent({
  name: 'App',
  components: { Overlay, ScrollTop },
  setup () {
    const nav = UseNavComposition()
    return {
      nav
    }
  }
})
</script>

<style lang="scss">
body {
  background-color: #191414;
}

#app {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    background-image: url('./assets/bg.png');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }
}

.l-wrapper {
  padding: 160px 0 120px 0;
  position: relative;

  @include max(1015) {
    padding: 120px 0;
  }
}

</style>
