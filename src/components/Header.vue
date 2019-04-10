<template>
  <header class="header">
    <p class="header-router-name" v-if="routerName">{{ routerName.toUpperCase() }}</p>
  </header>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    routerName () {
      return this.$route.name === 'home' ? 'INBOX' : this.$route.name
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  text-align: center;
  padding: 20px 0;
  color: #fff;
  background-image: linear-gradient(-180deg,#000 -20%,transparent 120%);
}

.header-router-name {
  letter-spacing: 1rem;
}

</style>
