<template>
  <div class="inbox">
    <a class="inbox-link" href="/">
      <span class="inbox-number">{{ vuex.stores('getters', 'inbox/countGetters') }}</span>
      <i class="fas fa-inbox"></i>
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'
import { UseVuexComposition } from '@/composition/UseVuexComposition'

// ================================
// Component
// ================================
export default defineComponent({
  name: 'Inbox',
  setup (props, context: SetupContext) {
    const vuex = UseVuexComposition(context)
    return {
      vuex
    }
  }
})
</script>

<style lang="scss" scoped>
.inbox {
  position: absolute;
  top: 15px;
  left: 15px;
  font-size: 2rem;
}

.inbox-link {
  color: #fff;
}

.inbox-number {
  position: absolute;
  top: -5px;
  left: -2px;
  background: #e91e63;
  width: 15px;
  line-height: 15px;
  border-radius: 50%;
  font-size: 1rem;
  text-align: center;
}

</style>
