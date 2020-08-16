<template>
  <div class="top-image" :style="{ backgroundImage: `url(${props.viewDatas.bgSrc})` }">
    <img class="top-logo" :src="props.viewDatas.src" :alt="props.viewDatas.alt" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { defaultImageType } from '@/containers/Home/ViewDatas'

// ================================
// Props
// ================================
export type HeadingProps = {
  viewDatas: defaultImageType;
}

// ================================
// Component
// ================================
export default defineComponent({
  name: 'Hero',
  props: ['viewDatas'],
  setup (props: HeadingProps) {
    return {
      props
    }
  }
})
</script>
<style lang="scss" scoped>
.top-image {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}

.top-logo {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 0;
  transform: translate(-50%, -50%);
  width: 25%;

  @include max(767) {
    width: 40%;
  }
}
</style>
