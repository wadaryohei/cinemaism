<template>
  <div>
    <transition name="movieinfo-overviewheader" tag="div" appear>
      <h3 class="movieinfo-overviewheader">作品詳細</h3>
    </transition>

    <transition name="movieinfo-overviewlead" tag="div" appear>
      <p class="movieinfo-overviewlead">
        {{ props.overview }}
      </p>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

// ================================
// Props
// ================================
export type MovieInfoOverViewProps = {
  overview: string;
}

// ================================
// Component
// ================================
export default defineComponent({
  name: 'MovieInfoOverView',
  props: ['overview'],
  setup (props: MovieInfoOverViewProps) {
    return {
      props
    }
  }
})
</script>

<style lang="scss" scoped>
.movieinfo-overview {
  &-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: 1s ease;
    transition-delay: 1s;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
    transform: translateY(20px);
  }
}
.movieinfo-overviewheader {
  color: #fff;
  font-size: 1.4rem;
  font-weight: 800;
  margin-bottom: 10px;
  word-break: break-all;
}

.movieinfo-overviewlead {
  color: #fff;
  font-weight: 800;
  font-size: 1.2rem;
  line-height: 1.6;
}
</style>
