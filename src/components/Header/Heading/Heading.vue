<template>
  <h1 class="heading" v-if="props.route.routeName()">{{ props.route.routeName().toUpperCase() }}</h1>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { RouteComposition } from '@/composition/UseRouteComposition'

// ================================
// Props
// ================================
export type HeadingProps = {
  route: RouteComposition;
}

// ================================
// Component
// ================================
export default defineComponent({
  name: 'Heading',
  props: ['route'],
  setup (props: HeadingProps) {
    return {
      props
    }
  }
})
</script>

<style lang="scss" scoped>
.heading {
  text-align: center;
  line-height: 60px;
  font-size: 1.4rem;
  letter-spacing: 1rem;
}
</style>
