<template>
  <input
    class="search"
    type="text"
    placeholder="映画のタイトルを検索する"
    v-model.trim="search.inputWord.value"
    @keydown.enter="search.searchMovie($event.keyCode)"
    ref="input"
    />
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'
import { UseSearchComposition } from '@/composition/UseSearchComposition'

// ================================
// Component
// ================================
export default defineComponent({
  name: 'InputWord',
  setup (props, context: SetupContext) {
    const search = UseSearchComposition(context)
    return {
      search
    }
  }
})
</script>

<style lang="scss" scoped>
.search {
  &::placeholder {
    color: #fff;
  }

  &::-webkit-search-cancel-button {
    position:relative;
    right: 15px;
  }
}
</style>
