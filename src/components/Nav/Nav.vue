<template>
  <div class="nav-wrapper">
    <nav class="nav" @click.self="props.toggleMenu()">
      <Logo class="nav-logo" :src="`${require('../../assets/nav_logo.png')}`" alt="CINEMAISM" />
      <NavList class="nav-list" :viewDatas="props.viewDatas" :activeMenu="props.activeMenu()" />
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import NavList from '@/components/Nav/NavList/NavList.vue'
import Logo from '@/components/Nav/Logo/Logo.vue'
import { NavListType } from '@/model/NavListDatas'

// ================================
// Props
// ================================
export type NavProps = {
  viewDatas: NavListType[];
  activeMenu: boolean;
  toggleMenu: boolean;
}

// ================================
// Component
// ================================
export default defineComponent({
  name: 'Nav',
  components: { Logo, NavList },
  props: ['viewDatas', 'activeMenu', 'toggleMenu'],
  setup (props: NavProps) {
    return {
      props
    }
  }
})
</script>

<style lang="scss" scoped>
.nav-wrapper {
  width: 300px;
  height: 100vh;
  position: fixed;
  z-index: 1;
  top: 0;
  right: 0;
  overflow: hidden;
  transition: .4s cubic-bezier(.785,.135,.15,.86);
  transform: translateX(300px);
  background-color: rgba(0,0,0,.9);

  &.open {
    transition: .4s cubic-bezier(.785,.135,.15,.86);
    transform: translateX(0);
  }
}

.nav {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 4rem;
}

.nav-logo {
  flex-shrink: 0;
  max-width: 100%;
}

.nav-list {
  width: 100%;
  border-top: 1px solid rgba(255,255,255,.2);
}
</style>
