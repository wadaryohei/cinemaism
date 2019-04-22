<template>
  <div id="app">
    <Header></Header>
      <div class="l-container l-wrapper">
        <router-view/>
      </div>
    <InputWord v-if="showInput"></InputWord>
  </div>
</template>

<script>

import Header from '@/components/Header'
import InputWord from '@/components/InputWord'

export default {
  name: 'App',

  components: {
    Header,
    InputWord
  },

  computed: {
    showInput () {
      console.log(this.$route.name)
      if (this.$route.name !== 'about' || this.$route.name !== 'movie') {
        return false
      }
      return true
    }
  }
}
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
