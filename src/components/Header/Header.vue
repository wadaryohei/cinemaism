<template>
  <header>
    <Inbox />
    <Heading :route="route" />
    <Bars :nav="nav" />
    <Nav
      :class="{open: nav.activeMenu()}"
      :viewDatas="NavListDatas"
      :activeMenu="nav.activeMenu"
      :toggleMenu="nav.toggleMenu"
     />
    <Overlay
      v-if="nav.activeMenu()"
      :activeMenu="nav.activeMenu"
      :toggleMenu="nav.toggleMenu"
    />
  </header>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'
import Nav from '@/components/Nav/Nav.vue'
import Inbox from '@/components/Header/Inbox/Inbox.vue'
import Heading from '@/components/Header/Heading/Heading.vue'
import Bars from '@/components/Header/Bars/Bars.vue'
import Overlay from '@/components/Overlay/Overlay.vue'
import { UseNavComposition } from '@/composition/UseNavComposition'
import { UseRouteComposition } from '@/composition/UseRouteComposition'
import { UseStorageComposition } from '@/composition/UseStorageComposition'
import { UseVuexComposition } from '@/composition/UseVuexComposition'
import { NavListDatas } from '@/model/NavListDatas'

// ================================
// Component
// ================================
export default defineComponent({
  name: 'Header',
  components: { Nav, Inbox, Heading, Bars, Overlay },
  setup (props, context: SetupContext) {
    const nav = UseNavComposition()
    const vuex = UseVuexComposition(context)
    const storage = UseStorageComposition(context)
    const route = UseRouteComposition(context)
    return {
      nav, storage, vuex, route, NavListDatas
    }
  }
})
</script>
