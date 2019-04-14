<template>
  <aside class="sidebar">
    hogehoge
  </aside>
</template>

<script>
export default {
  name: 'SideMenu',
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  width: 300px;
  height: 100vh;
  background-color: rgba(0,0,0,.9);
  position: absolute;
  top: 0;
  right: 0;
  z-index: 3;
  overflow: hidden;
  transition: .4s cubic-bezier(.785,.135,.15,.86);
  transform: translateX(300px);

  &.open {
    transition: .4s cubic-bezier(.785,.135,.15,.86);
    transform: translateX(0);
  }
}
</style>
