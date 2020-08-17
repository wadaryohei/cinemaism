<template>
  <div id="app">
    <ScrollTop>
      <Wrapper>
        <router-view />
      </Wrapper>
    </ScrollTop>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Wrapper from '@/components/Wrapper/Wrapper.vue'
import ScrollTop from '@/components/ScrollTop/ScrollTop.vue'

export default defineComponent({
  name: 'App',
  components: { Wrapper, ScrollTop }
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
</style>
