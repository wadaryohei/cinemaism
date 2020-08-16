<template>
  <div>
    <Header class="l-header" />
    <main>
      <slot name="main" class="l-main"></slot>
    </main>
    <InputWord v-if="router.showInput()" class="l-search"></InputWord>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'
import Header from '@/components/Header/Header.vue'
import InputWord from '@/components/InputWord/InputWord.vue'
import { UseRouteComposition } from '@/composition/UseRouteComposition'

export default defineComponent({
  name: 'BaseLayout',
  components: { Header, InputWord },
  setup (props, context: SetupContext) {
    const router = UseRouteComposition(context)
    return {
      router
    }
  }
})
</script>

<style lang="scss" scoped>
.l-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  z-index: 2;
  color: #fff;
  background-image: linear-gradient(-180deg,#000 -20%,transparent 120%);
}

.l-search {
  position: fixed;
  bottom: 40px;
  right: 40px;
  z-index: 1;
  border: none;
  outline: none;
  padding: 15px 13px;
  line-height: 1.5;
  border-radius: 30px;
  width: 250px;
  transform: scale(.9);
  font-size: 1.6rem;
  letter-spacing: .1rem;
  background-color: #1db954;
  color: #fff;

  @include max(767) {
    right: 50%;
    transform: translateX(50%);
  }
}
</style>
