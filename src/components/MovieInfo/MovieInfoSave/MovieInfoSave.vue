<template>
  <button
    class="movieinfo-save"
    :class="{disabled: props.storage.isExistsMovies().disabled}"
    :disabled="props.storage.isExistsMovies().disabled"
    @click="props.storage.saveStorage(viewDatas, props.modal)"
  >
    {{ storage.isExistsMovies().text }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { ModalComposition } from '@/composition/UseModalComposition'
import { StorageComposition } from '@/composition/UseStorageComposition'
import { MovieSelectedType } from '@/datas/MovieData'

// ================================
// Props
// ================================
export type MovieInfoSaveProps = {
  modal: ModalComposition;
  storage: StorageComposition;
  viewDatas: MovieSelectedType;
}

// ================================
// Component
// ================================
export default defineComponent({
  name: 'MovieInfoSave',
  props: ['modal', 'storage', 'viewDatas'],
  setup (props: MovieInfoSaveProps) {
    return {
      props
    }
  }
})
</script>

<style lang="scss" scoped>
.movieinfo-save {
  border: none;
  outline: none;
  padding: 0 20px;
  border-radius: 30px;
  width: 250px;
  height: 48px;
  font-size: 1.2rem;
  letter-spacing: .1rem;
  background-color: #1db954;
  color: #fff;
  cursor: pointer;
  transition: .1s ease;

  &-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: 1s ease;
    transition-delay: 1.2s;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
    transform: translateY(20px);
  }

  &:hover {
    transition: .1s ease;
    background-color: #1db954;
  }

  &.disabled {
    background-color: #333333;
    opacity: .6;
    cursor: default;
  }
}
</style>
